import { createHash } from 'node:crypto'
import { execFileSync } from 'node:child_process'
import { mkdir, writeFile, readFile, copyFile } from 'node:fs/promises'
import { dirname, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { build } from 'vite'
import { buildClassic } from './prepare-entry-classic.mjs'
import { classicBridge } from './entry-classic-server.ts'
import { buildTargets } from '../config/build.ts'
import { productionSite } from '../config/public-site.ts'
import { publicPages } from '../src/seo/content.ts'
import { aliasPaths, metadataHtml, robotsText, sitemapXml, socialPath } from '../src/seo/metadata.ts'
import { siteRoutes } from '../src/routing/site-catalog.ts'
import { atmosphericCatalog } from '../src/works/candidates/atmospheric-catalog.ts'
import { performanceStudySlugs } from '../src/performance-detail/performance-navigation.ts'

const repository = fileURLToPath(new URL('..', import.meta.url))
const production = process.argv.includes('--production')
const target = production ? { base: productionSite.base, canonicalOrigin: productionSite.origin } : buildTargets.pagesPreview
const environment = { production, base: target.base, origin: target.canonicalOrigin }
const mode = production ? 'public-site' : 'development-preview'
const inputRoot = resolve(repository, `.checkpoints/${mode}-input`)
const output = resolve(repository, production ? productionSite.directory : 'build-development-preview')
const entry = resolve(repository, 'preview/main.tsx')
const input = {}
const albumRoutes = atmosphericCatalog.filter(record => record.type === 'album').map(record => ({ id: record.id, path: `/album/${record.id.slice(6)}`, lang: 'ko' }))
const performanceRoutes = performanceStudySlugs.map(slug => ({ id: `performance:${slug}`, path: `/performance/${slug}`, lang: 'ko' }))
const routes = [...siteRoutes, ...albumRoutes, ...performanceRoutes]
const editionRoutes = routes.flatMap(route => ['classic', 'immersive'].map(mode => ({
  ...route, id: `${mode}:${route.id}`, path: `/${mode}${route.path === '/' ? '' : route.path}`,
})))
const authoredRoutes = [...publicPages.map(page => page.path), ...aliasPaths].map((path, index) => ({ id: `public-${index}`, path, lang: 'ko' }))
const inputs = production ? authoredRoutes : [...routes, ...editionRoutes]
for (const route of inputs) {
  const html = resolve(inputRoot, route.path === '/' ? 'index.html' : `${route.path.slice(1)}/index.html`)
  await mkdir(dirname(html), { recursive: true })
  const script = relative(dirname(html), entry).replaceAll('\\', '/')
  await writeFile(html, `<!doctype html>
<html lang="${route.lang}"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">${metadataHtml(route.path, environment)}</head><body><div id="root"></div><script type="module" src="${script}"></script></body></html>`)
  input[route.id] = html
}
// Multi-page build inputs preserve known direct URLs. No copied output or catch-all 200 fallback.
await build({ configFile: false, mode, root: inputRoot, base: target.base, publicDir: false,
  define: { 'import.meta.env.BASE_URL': JSON.stringify(`${target.base}immersive/`) },
  build: { outDir: output, emptyOutDir: true, rollupOptions: { input } },
})
// Classic remains an independent, pinned build; only its output receives the parent URL bridge.
const classicOutput = resolve(output, 'classic-app')
buildClassic({ output: classicOutput, base: `${target.base}classic-app/`, pinned: true })
const classicHtml = resolve(classicOutput, 'index.html')
// No source edits to the independent Classic app: only the embedded output's search policy.
const classicSource = (await readFile(classicHtml, 'utf8')).replace(/<meta\b[^>]*name=["']robots["'][^>]*>/gi, '').replace(/<link\b[^>]*rel=["']canonical["'][^>]*>/gi, '')
await writeFile(classicHtml, classicSource.replace('</head>', `<meta name="robots" content="noindex, nofollow"><script>${classicBridge([target.canonicalOrigin])}</script></head>`))
// Social crawlers receive real existing assets and complete head tags without executing WebGL/React.
for (const page of publicPages) {
  const destination = resolve(output, socialPath(page))
  await mkdir(dirname(destination), { recursive: true })
  await copyFile(resolve(repository, page.image.source), destination)
}
await writeFile(resolve(output, 'robots.txt'), robotsText(production))
if (production) {
  await writeFile(resolve(output, 'sitemap.xml'), sitemapXml())
  // Preserve the six already-public V1 document URLs across the later domain transfer.
  for (const slug of performanceStudySlugs) for (const document of ['poster', 'leaflet']) {
    const path = `assets/performances/${slug}/downloads/${document}.pdf`
    await mkdir(dirname(resolve(output, path)), { recursive: true })
    await copyFile(resolve(classicOutput, path), resolve(output, path))
  }
}
// A genuine Pages 404 document, never an index.html fallback or redirect script.
await writeFile(resolve(output, '404.html'), `<!doctype html><html lang="ko"><head><meta charset="UTF-8">${metadataHtml('/404/', environment)}</head><body><h1>페이지를 찾을 수 없습니다</h1><a href="${target.base}">조윤경 홈</a></body></html>`)

const commit = process.env.BUILD_SHA || execFileSync('git', ['rev-parse', 'HEAD'], { cwd: repository, encoding: 'utf8' }).trim()
await writeFile(resolve(output, 'build-info.json'), JSON.stringify({ commit, mode, base: target.base }) + '\n')
await writeFile(resolve(output, '.nojekyll'), '')

// Same-origin recordings allow native playback and Web Audio on static Pages.
// Cache is ignored; only the pinned manifest belongs in Git.
const recordings = JSON.parse(await readFile(resolve(repository, 'src/audio/recordings.json'), 'utf8'))
await Promise.all(Array.from({ length: 4 }, async () => {
  for (let recording; (recording = recordings.pop());) {
    const cache = resolve(repository, '.cache/album-audio', recording.path)
    const valid = data => data.length === recording.bytes && createHash('sha256').update(data).digest('hex') === recording.sha256
    let data = await readFile(cache).catch(() => null)
    if (!data || !valid(data)) {
      const response = await fetch(recording.source, { signal: AbortSignal.timeout(120000) })
      if (!response.ok) throw new Error(`Recording download failed: ${response.status} ${recording.path}`)
      data = Buffer.from(await response.arrayBuffer())
      if (!valid(data)) throw new Error(`Recording integrity mismatch: ${recording.path}`)
      await mkdir(dirname(cache), { recursive: true })
      await writeFile(cache, data)
    }
    const destination = resolve(output, 'immersive/audio', recording.path)
    await mkdir(dirname(destination), { recursive: true })
    await copyFile(cache, destination)
  }
}))
