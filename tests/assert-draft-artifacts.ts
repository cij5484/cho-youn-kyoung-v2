import assert from 'node:assert/strict'
import { readFile, readdir } from 'node:fs/promises'
import { resolve } from 'node:path'
import { getBuildTarget, type BuildTargetName } from '../config/build.ts'
import { contentCatalog } from '../src/content/registry.server.ts'
import { spikeRoutes } from '../src/spike/fixtures.ts'

async function filesBelow(directory: string, prefix = ''): Promise<string[]> {
  const entries = await readdir(resolve(directory, prefix), { withFileTypes: true })
  const groups = await Promise.all(entries.map(entry => {
    const path = `${prefix}${entry.name}`
    return entry.isDirectory() ? filesBelow(directory, `${path}/`) : Promise.resolve([path])
  }))
  return groups.flat().sort()
}

// Check the complete emitted client (including fallback) and packaged public artifact, not just visible DOM.
export async function assertDraftArtifactsExcluded(targetName: BuildTargetName) {
  const target = getBuildTarget(targetName)
  const drafts = contentCatalog.albums.filter(album => album.publication.status === 'draft')
  assert.ok(drafts.length, 'This regression requires a registered private draft')
  const needles = drafts.flatMap(album => [album.id, album.slug, album.content.ko.value.title,
    album.content.ko.value.summary, album.productNumber, album.presentation.cover.asset.id,
    album.content.ko.provenance.sourceRef])
  const markers = [...new Set(needles.flatMap(value => [value, encodeURIComponent(value),
    value.replace(/[^\u0020-\u007e]/g, char => `\\u${char.charCodeAt(0).toString(16).padStart(4, '0')}`)]))]
  const counts: Record<string, number> = {}
  for (const folder of ['client', 'static']) {
    const directory = resolve(target.directory, folder)
    const paths = await filesBelow(directory)
    counts[folder] = paths.length
    for (const path of paths) {
      assert.ok(!drafts.some(draft => path.includes(draft.slug)), `Draft output path: ${path}`)
      const bytes = await readFile(resolve(directory, path))
      for (const marker of markers) assert.ok(!bytes.includes(Buffer.from(marker)), `Draft content leaked into ${folder}/${path}`)
    }
  }
  const manifest = JSON.parse(await readFile(resolve(target.directory, 'static/build-info.json'), 'utf8'))
  assert.deepEqual(manifest.routes, spikeRoutes.map(route => route.path))
  assert.equal(manifest.routes.length, 18)
  const emitted = (await filesBelow(resolve(target.directory, 'static'))).filter(path => path.endsWith('.html')).sort()
  assert.deepEqual(emitted, spikeRoutes.map(route => route.path === '/' ? 'index.html' : `${route.path.slice(1)}/index.html`).sort())
  return { target: targetName, scannedFiles: counts, routes: manifest.routes.length, privateDraftsExcluded: drafts.length }
}
