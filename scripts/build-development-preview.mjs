import { createHash } from 'node:crypto'
import { execFileSync } from 'node:child_process'
import { mkdir, writeFile, readFile, copyFile } from 'node:fs/promises'
import { dirname, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { build } from 'vite'
import { buildClassic } from './prepare-entry-classic.mjs'
import { classicBridge } from './entry-classic-server.ts'
import { buildTargets } from '../config/build.ts'
import { siteRoutes } from '../src/routing/site-catalog.ts'
import { atmosphericCatalog } from '../src/works/candidates/atmospheric-catalog.ts'
import { performanceStudySlugs } from '../src/performance-detail/performance-navigation.ts'

const repository = fileURLToPath(new URL('..', import.meta.url))
const inputRoot = resolve(repository, '.checkpoints/development-preview-input')
const output = resolve(repository, 'build-development-preview')
const entry = resolve(repository, 'preview/main.tsx')
const input = {}
const albumRoutes = atmosphericCatalog.filter(record => record.type === 'album').map(record => ({ id: record.id, path: `/album/${record.id.slice(6)}`, lang: 'ko' }))
const performanceRoutes = performanceStudySlugs.map(slug => ({ id: `performance:${slug}`, path: `/performance/${slug}`, lang: 'ko' }))
const routes = [...siteRoutes, ...albumRoutes, ...performanceRoutes]
const editionRoutes = routes.flatMap(route => ['classic', 'immersive'].map(mode => ({
  ...route, id: `${mode}:${route.id}`, path: `/${mode}${route.path === '/' ? '' : route.path}`,
})))
for (const route of [...routes, ...editionRoutes]) {
  const html = resolve(inputRoot, route.path === '/' ? 'index.html' : `${route.path.slice(1)}/index.html`)
  await mkdir(dirname(html), { recursive: true })
  const script = relative(dirname(html), entry).replaceAll('\\', '/')
  await writeFile(html, `<!doctype html>
<html lang="${route.lang}"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"><meta name="robots" content="noindex, nofollow"><title>Cho Youn Kyoung — V2 Development Preview</title></head><body><div id="root"></div><script type="module" src="${script}"></script></body></html>`)
  input[route.id] = html
}
// Multi-page build inputs preserve known direct URLs. No copied output or catch-all 200 fallback.
await build({ configFile: false, mode: 'development-preview', root: inputRoot, base: buildTargets.pagesPreview.base, publicDir: false,
  define: { 'import.meta.env.BASE_URL': JSON.stringify(`${buildTargets.pagesPreview.base}immersive/`) },
  build: { outDir: output, emptyOutDir: true, rollupOptions: { input } },
})
// Classic remains an independent, pinned build; only its output receives the parent URL bridge.
const classicOutput = resolve(output, 'classic-app')
buildClassic({ output: classicOutput, base: `${buildTargets.pagesPreview.base}classic-app/`, pinned: true })
const classicHtml = resolve(classicOutput, 'index.html')
await writeFile(classicHtml, (await readFile(classicHtml, 'utf8')).replace('</head>', `<script>${classicBridge([buildTargets.pagesPreview.canonicalOrigin])}</script></head>`))
const commit = process.env.BUILD_SHA || execFileSync('git', ['rev-parse', 'HEAD'], { cwd: repository, encoding: 'utf8' }).trim()
await writeFile(resolve(output, 'build-info.json'), JSON.stringify({ commit, mode: 'development-preview', base: buildTargets.pagesPreview.base }) + '\n')
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
