import { test } from 'node:test'
import assert from 'node:assert/strict'
import { staticLayout } from '../scripts/static-layout.mjs'
import { buildTargets } from '../config/build.ts'

const routePaths = ['/', '/works', '/album/new-test-slug', '/en/album/new-test-slug']
const publicFiles = new Set(['spike/marker.svg'])

for (const target of Object.values(buildTargets)) {
  test(`stable mapping with future nested slugs at ${target.base}`, () => {
    const prefix = target.base.slice(1)
    const routes = routePaths.map((path) => `${prefix}${path === '/' ? '' : `${path.slice(1)}/`}index.html`)
    const sources = [...routes, 'assets/chunk.js', 'spike/marker.svg', '.vite/manifest.json',
      prefix ? 'index.html' : '__spa-fallback.html']
    const options = { base: target.base, publicFiles, routePaths }
    const mapped = staticLayout(sources, options)
    assert.deepEqual([...mapped], [...staticLayout([...sources].reverse(), options)])
    assert.equal(mapped.get('album/new-test-slug/index.html'), `${prefix}album/new-test-slug/index.html`)
    assert.equal(mapped.get('en/album/new-test-slug/index.html'), `${prefix}en/album/new-test-slug/index.html`)
    assert.equal(mapped.get('assets/chunk.js'), 'assets/chunk.js')
    assert.equal(mapped.size, routes.length + 2)
    assert.throws(() => staticLayout(sources.filter((path) => path !== routes[1]), options), /Missing prerender/)
  })
}

test('reject collisions, unexpected upstream output, maps and unsafe paths', () => {
  const base = buildTargets.pagesPreview.base
  const prefix = base.slice(1)
  const options = { base, publicFiles, routePaths: [] }
  assert.throws(() => staticLayout(['assets/a.js', `${prefix}assets/a.js`], options), /collision/)
  assert.throws(() => staticLayout(['works/index.html'], options), /Unrecognized/)
  assert.throws(() => staticLayout(['assets/a.js.map'], options), /source map/)
  assert.throws(() => staticLayout(['../index.html'], options), /Unsafe/)
  assert.throws(() => staticLayout([`${prefix}build-info.json`], options), /collision/)
})
