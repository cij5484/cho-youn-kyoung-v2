import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { counterpartPath, editionHref, editionRoute } from '../src/entry/mode-routing.ts'

test('only root is ENTRY; both modes and old deep bookmarks stay direct', () => {
  assert.deepEqual(editionRoute('/'), { mode: null, path: '/' })
  for (const base of ['/', '/cho-youn-kyoung-v2/']) {
    assert.deepEqual(editionRoute(base, base), { mode: null, path: '/' })
    assert.deepEqual(editionRoute(`${base}about/`, base), { mode: 'immersive', path: '/about/' })
    for (const mode of ['classic', 'immersive'] as const) {
    for (const path of ['/', '/works/', '/media/', '/about/', '/contact/', '/album/yeongsan-hoesang-2026/', '/performance/haegeum-2026-08-02/']) {
      assert.deepEqual(editionRoute(editionHref(mode, path, base), base), { mode, path })
      assert.equal(counterpartPath(path), path)
    }
  }
  }
  assert.deepEqual(editionRoute('/about/'), { mode: 'immersive', path: '/about/' })
  assert.equal(counterpartPath('/en/about/'), '/')
  assert.equal(counterpartPath('/local-lab/'), '/')
})

test('ENTRY is shared by local and published previews; sculpture and HOME remain lazy', () => {
  const source = (path: string) => readFileSync(new URL(path, import.meta.url), 'utf8')
  assert.match(source('../labs/interaction/main.tsx'), /EditionApp/)
  assert.match(source('../preview/main.tsx'), /EditionApp/)
  assert.match(source('../src/entry/EntryScreen.tsx'), /lazy\(\(\) => import\('\.\/EntrySculpture.tsx'\)\)/)
  assert.match(source('../src/entry/EditionApp.tsx'), /const loadImmersive = \(\) => import/)
  assert.match(source('../src/entry/EntrySculpture.tsx'), /portraits\.map/)
})

test('ENTRY uses the HOME pair tail identity without changing the HOME owner', () => {
  const source = readFileSync(new URL('../src/entry/EntryScreen.tsx', import.meta.url), 'utf8')
  assert.match(source, /twoPointContract/)
  for (const property of ['trailMs', 'trailWidth', 'fadeExponent', 'widthRange']) assert.ok(source.includes(`moving.${property}`))
  assert.match(source, /createTrailSampler/)
  assert.doesNotMatch(source, /stroke="#|stroke-width|<path/)
})
