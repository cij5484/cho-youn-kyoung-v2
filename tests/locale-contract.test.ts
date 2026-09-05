import assert from 'node:assert/strict'
import { test } from 'node:test'
import { buildTargets } from '../config/build.ts'
import { spikeCatalog, spikeRoutes } from '../src/spike/fixtures.ts'
import { findPublishedRoute, languageOfPath, localizedPath, publicUrl, resolveLanguageSwitch, routeMetadata, routePair, type SemanticRoute } from '../src/routing/locale-contract.ts'

const expectedKo = ['/', '/works', '/albums', '/performances', '/album/test-album', '/performance/test-performance', '/media', '/about', '/contact']
test('all nine semantic pairs have distinct URLs and no /ko alias', () => {
  assert.deepEqual(spikeRoutes.filter((r) => r.lang === 'ko').map((r) => r.path), expectedKo)
  assert.deepEqual(spikeRoutes.filter((r) => r.lang === 'en').map((r) => r.path), expectedKo.map((path) => path === '/' ? '/en' : `/en${path}`))
  assert.equal(new Set(spikeRoutes.map((r) => r.path)).size, 18)
  for (const path of expectedKo) {
    const en = path === '/' ? '/en' : `/en${path}`
    assert.deepEqual(resolveLanguageSwitch(path, 'en', spikeCatalog), { status: 'available', to: en, lang: 'en' })
    assert.deepEqual(resolveLanguageSwitch(`${en}/?test=1#test`, 'ko', spikeCatalog), { status: 'available', to: path, lang: 'ko' })
    assert.equal(findPublishedRoute(`/ko${path}`, spikeCatalog), undefined)
  }
})

for (const target of Object.values(buildTargets)) {
  test(`self canonical and reciprocal hreflang at ${target.base}`, () => {
    const site = { origin: target.canonicalOrigin, base: target.base }
    for (const path of expectedKo) {
      const enPath = path === '/' ? '/en' : `/en${path}`
      const ko = routeMetadata(path, spikeCatalog, site)!
      const en = routeMetadata(`${enPath}/?test=1#test`, spikeCatalog, site)!
      const koUrl = site.origin + site.base + (path === '/' ? '' : `${path.slice(1)}/`)
      const enUrl = site.origin + site.base + enPath.slice(1) + '/'
      assert.equal(ko.canonical, koUrl)
      assert.equal(en.canonical, enUrl)
      assert.equal(ko.lang, 'ko')
      assert.equal(en.lang, 'en')
      assert.deepEqual(ko.hreflang, [{ lang: 'ko', href: koUrl }, { lang: 'en', href: enUrl }, { lang: 'x-default', href: koUrl }])
      assert.deepEqual(en.hreflang, ko.hreflang)
      assert.equal(en.openGraph.url, en.canonical)
    }
  })
}

for (const state of ['missing', 'authored-draft', 'machine-draft'] as const) {
  test(`${state} translation: stay on the same Korean content, never advertise an English URL`, () => {
    const ko = spikeCatalog.find((r) => r.key === 'album')!
    const content: SemanticRoute['content'] = { ko: ko.content.ko }
    if (state !== 'missing') content.en = { source: state === 'authored-draft' ? 'authored' : 'machine-assisted', status: 'draft', value: { title: 'Draft', description: 'Not public' } }
    const catalog = [{ ...ko, content }]
    assert.deepEqual(resolveLanguageSwitch(ko.koPath, 'en', catalog), { status: 'unavailable', to: '/album/test-album', lang: 'ko', reason: 'translation-unavailable' })
    assert.deepEqual(routePair(catalog[0]), { ko: '/album/test-album' })
    assert.equal(findPublishedRoute('/en/album/test-album', catalog), undefined)
    assert.equal(routeMetadata('/en/album/test-album', catalog, { origin: buildTargets.root.canonicalOrigin, base: '/' }), undefined)
    const metadata = routeMetadata(ko.koPath, catalog, { origin: buildTargets.root.canonicalOrigin, base: '/' })!
    assert.deepEqual(metadata.hreflang.map((alternate) => alternate.lang), ['ko', 'x-default'])
  })
}

test('unknown routes stay unknown and do not receive SEO identity or a HOME redirect', () => {
  for (const path of ['/ko', '/ko/works', '/en/not-real', '/album/missing', '/performance/missing']) {
    assert.deepEqual(resolveLanguageSwitch(path, 'en', spikeCatalog), { status: 'unknown-route', to: null })
    assert.equal(routeMetadata(path, spikeCatalog, { origin: buildTargets.root.canonicalOrigin, base: '/' }), undefined)
  }
  assert.equal(languageOfPath('/english'), 'ko')
  assert.equal(languageOfPath('/en/missing'), 'en')
})

test('custom-root URL configuration replaces preview origin/base without changing semantic paths', () => {
  const site = { origin: 'https://future-host.invalid', base: '/' }
  assert.equal(publicUrl('/en/works/?test=1#test', site), 'https://future-host.invalid/en/works/')
  assert.throws(() => publicUrl('/works', { ...site, origin: `${site.origin}/unexpected/` }))
  assert.throws(() => publicUrl('/works', { ...site, base: '/missing-trailing-slash' }))
  assert.throws(() => localizedPath('/ko/works', 'en'))
  assert.throws(() => localizedPath('/en/works', 'en'))
})
