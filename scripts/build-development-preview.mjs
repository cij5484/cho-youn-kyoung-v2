import { execFileSync } from 'node:child_process'
import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { build } from 'vite'
import { buildTargets } from '../config/build.ts'
import { spikeRoutes } from '../src/spike/fixtures.ts'

const repository = fileURLToPath(new URL('..', import.meta.url))
const inputRoot = resolve(repository, '.checkpoints/development-preview-input')
const output = resolve(repository, 'build-development-preview')
const entry = resolve(repository, 'preview/main.tsx')
const input = {}
for (const route of spikeRoutes) {
  const html = resolve(inputRoot, route.path === '/' ? 'index.html' : `${route.path.slice(1)}/index.html`)
  await mkdir(dirname(html), { recursive: true })
  const script = relative(dirname(html), entry).replaceAll('\\', '/')
  await writeFile(html, `<!doctype html>
<html lang="${route.lang}"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"><meta name="robots" content="noindex, nofollow"><title>Cho Youn Kyoung — V2 Development Preview</title></head><body><div id="root"></div><script type="module" src="${script}"></script></body></html>`)
  input[route.id] = html
}
// Multi-page build inputs preserve known direct URLs. No copied output or catch-all 200 fallback.
await build({ configFile: false, root: inputRoot, base: buildTargets.pagesPreview.base, publicDir: false,
  build: { outDir: output, emptyOutDir: true, rollupOptions: { input } },
})
const commit = process.env.BUILD_SHA || execFileSync('git', ['rev-parse', 'HEAD'], { cwd: repository, encoding: 'utf8' }).trim()
await writeFile(resolve(output, 'build-info.json'), JSON.stringify({ commit, mode: 'development-preview', base: buildTargets.pagesPreview.base }) + '\n')
await writeFile(resolve(output, '.nojekyll'), '')
