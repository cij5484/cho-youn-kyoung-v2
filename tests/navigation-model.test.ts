import assert from 'node:assert/strict'
import { test } from 'node:test'
import { navigationModel } from '../src/navigation/model.ts'
import { spikeCatalog, spikeRoutes } from '../src/spike/fixtures.ts'
import { publicUrl, type SemanticRoute } from '../src/routing/locale-contract.ts'
import { buildTargets } from '../config/build.ts'

test('all 18 identities retain five sections and exact counterpart under both bases', () => {
  for (const fixture of spikeRoutes) {
    const model = navigationModel(`${fixture.path}?filter=sample#section`, spikeCatalog)
    assert.equal(model.lang, fixture.lang)
    assert.equal(model.links.length, 5)
    assert.equal(model.links.filter(link => link.current).length, 1)
    for (const item of model.languages) {
      assert.equal(item.status, 'available')
      if (item.status !== 'available') throw Error('Expected counterpart')
      assert.equal(item.to, spikeRoutes.find(route => route.key === fixture.key && route.lang === item.language)!.path)
      for (const target of Object.values(buildTargets)) {
        const url = publicUrl(item.to, { origin: target.canonicalOrigin, base: target.base })
        assert.equal(url.split(target.base).length - 1 >= 1, true)
        assert.equal(new URL(url).search, '')
        assert.equal(new URL(url).hash, '')
      }
    }
  }
})

test('WORKS remains the active ancestor for album/performance indexes and details', () => {
  for (const path of ['/albums', '/performances', '/album/test-album', '/performance/test-performance', '/en/album/test-album']) {
    const link = navigationModel(path, spikeCatalog).links.find(item => item.current)!
    assert.equal(link.key, 'works'); assert.equal(link.exact, false)
  }
})

test('missing, authored draft and machine draft EN stay on the same KO record', () => {
  for (const source of ['missing', 'authored', 'machine-assisted'] as const) {
    const catalog: SemanticRoute[] = spikeCatalog.map(record => ({ ...record, content: {
      ko: record.content.ko, en: source === 'missing' ? undefined : { source, status: 'draft', value: record.content.en!.value },
    } }))
    const model = navigationModel('/album/test-album', catalog)
    assert.deepEqual(model.languages[1], { language: 'en', status: 'unavailable', to: '/album/test-album', lang: 'ko', reason: 'translation-unavailable' })
  }
})

test('unknown/private paths have no fabricated current link or counterpart', () => {
  for (const path of ['/unknown', '/en/unknown', '/album/ji-young-hee-sanjo']) {
    const model = navigationModel(path, spikeCatalog)
    assert.equal(model.links.some(link => link.current), false)
    assert.ok(model.languages.every(item => item.status === 'unknown-route' && item.to === null))
  }
})
