import assert from 'node:assert/strict'
import { test } from 'node:test'
import { existsSync } from 'node:fs'
import { isAssetApprovedForProduction, type AssetRecord } from '../src/content/assets.ts'
import { buildTargets } from '../config/build.ts'
import { contentIndex, contentPrerenderPaths, contentRouteCatalog, performancePeriod, relatedRecords } from '../src/content/catalog.ts'
import { albumFixture, fixtureAsOf, fixtureLocales, growthCatalog, neutralCatalog, performanceFixture, reviewedFixture } from '../src/content/fixtures.ts'
import { contentYear, localizedField, type Edition } from '../src/content/shared.ts'
import type { Album, ContentCatalog } from '../src/content/models.ts'
import { validateCatalog } from '../src/content/validation.ts'
import { resolveLanguageSwitch, routeMetadata } from '../src/routing/locale-contract.ts'

function withAlbum(album: Album): ContentCatalog { return { ...neutralCatalog, albums: [album] } }
function fails(catalog: ContentCatalog, pattern: RegExp) {
  assert.match(validateCatalog(catalog, fixtureAsOf).join('\n'), pattern)
  assert.throws(() => contentPrerenderPaths(catalog, fixtureAsOf), pattern)
}

test('five neutral domains and the data-only growth catalog satisfy semantic contracts', () => {
  assert.deepEqual(validateCatalog(neutralCatalog, fixtureAsOf), [])
  assert.deepEqual(validateCatalog(growthCatalog, fixtureAsOf), [])
  for (const asset of neutralCatalog.assets) {
    if ('runtime' in asset) assert.ok(existsSync(new URL(`../public/${asset.runtime.url}`, import.meta.url)))
  }
  assert.equal(albumFixture.tracks[0].source.status, 'coming-soon')
  assert.equal('durationSeconds' in albumFixture.tracks[0], false)
})

test('adding one album/performance/media/press changes only data indexes and detail path instances', () => {
  for (const kind of ['album', 'performance', 'media', 'press'] as const) {
    assert.equal(contentIndex(neutralCatalog, kind, fixtureAsOf).length, 1)
    assert.equal(contentIndex(growthCatalog, kind, fixtureAsOf).length, 2)
  }
  assert.deepEqual(contentPrerenderPaths(neutralCatalog, fixtureAsOf), [
    '/album/neutral-album-a', '/en/album/neutral-album-a', '/performance/neutral-performance-a', '/en/performance/neutral-performance-a',
  ])
  const grown = contentPrerenderPaths(growthCatalog, fixtureAsOf)
  assert.equal(grown.length, 7)
  assert.ok(grown.includes('/album/neutral-album-b'))
  assert.ok(!grown.includes('/en/album/neutral-album-b'))
  assert.ok(grown.includes('/en/performance/neutral-performance-b'))
  assert.ok(grown.every((p) => /^\/(en\/)?(album|performance)\/[a-z0-9-]+$/.test(p)))
  assert.deepEqual(contentIndex(growthCatalog, 'press', fixtureAsOf).map((r) => r.id), ['press:fixture-a', 'press:fixture-b'])
})

for (const target of Object.values(buildTargets)) {
  test(`generated routes reuse P0D canonical/hreflang/identity for ${target.base}`, () => {
    const routes = contentRouteCatalog(growthCatalog, fixtureAsOf)
    const site = { origin: target.canonicalOrigin, base: target.base }
    for (const path of contentPrerenderPaths(growthCatalog, fixtureAsOf)) {
      const metadata = routeMetadata(path, routes, site)!
      assert.equal(metadata.canonical, `${site.origin}${site.base}${path.slice(1)}/`)
      assert.equal(metadata.lang, path.startsWith('/en/') ? 'en' : 'ko')
      const pair = resolveLanguageSwitch(path, path.startsWith('/en/') ? 'ko' : 'en', routes)
      if (pair.status === 'available') assert.deepEqual(routeMetadata(pair.to, routes, site)!.hreflang, metadata.hreflang)
      assert.equal(metadata.hreflang.find((link) => link.lang === 'x-default')?.href, `${site.origin}${site.base}${path.replace(/^\/en/, '').slice(1)}/`)
    }
    assert.deepEqual(resolveLanguageSwitch('/album/neutral-album-b', 'en', routes), {
      status: 'unavailable', to: '/album/neutral-album-b', lang: 'ko', reason: 'translation-unavailable',
    })
    assert.equal(routeMetadata('/en/album/neutral-album-b', routes, site), undefined)
    assert.equal(routeMetadata('/album/missing', routes, site), undefined)
  })
}

test('draft/machine-assisted/missing EN never becomes a route or Korean field fallback', () => {
  for (const source of ['authored', 'machine-assisted'] as const) {
    const draft: Edition<Album['content']['ko']['value']> = { source, status: 'draft', value: albumFixture.content.ko.value,
      provenance: { author: 'fixture', sourceRef: 'fixture:draft' } }
    const album: Album = { ...albumFixture, content: { ...albumFixture.content, en: draft } }
    assert.equal(contentPrerenderPaths(withAlbum(album), fixtureAsOf).some((p) => p === '/en/album/neutral-album-a'), false)
    assert.deepEqual(localizedField(album.content, 'en', 'title'), { status: 'unreviewed' })
  }
  const copy = { ko: reviewedFixture({ title: 'KO', note: 'KO-only note' }), en: reviewedFixture({ title: 'EN' }) }
  assert.deepEqual(localizedField<{ title: string; note?: string }, 'note'>(copy, 'en', 'note'), { status: 'missing' })
})

test('publication timing is explicit; archived stays public, release and event status do not publish drafts', () => {
  for (const status of ['draft', 'unavailable'] as const) {
    assert.ok(!contentPrerenderPaths(withAlbum({ ...albumFixture, publication: { status } }), fixtureAsOf).some((p) => p.startsWith('/album/')))
  }
  assert.equal(contentPrerenderPaths(withAlbum({ ...albumFixture, publication: { status: 'archived' } }), fixtureAsOf).length, 4)
  const scheduled = withAlbum({ ...albumFixture, publication: { status: 'scheduled', publishAt: '2026-09-06T00:00:00Z' } })
  assert.equal(contentPrerenderPaths(scheduled, fixtureAsOf).length, 2)
  assert.equal(contentPrerenderPaths(scheduled, '2026-09-06T00:00:00Z').length, 4)
  assert.throws(() => contentPrerenderPaths(neutralCatalog, '2026-09-05'), /build instant/)
  fails(withAlbum({ ...albumFixture, publication: { status: 'scheduled', publishAt: '2026-02-30T00:00:00Z' } }), /invalid schedule/)
})

test('date precision and event chronology never invent month/day or a wall clock', () => {
  assert.equal(contentYear(albumFixture.release.date), 2027)
  assert.equal(contentYear({ precision: 'unknown' }), undefined)
  assert.equal(performancePeriod(performanceFixture, '2027-01-02'), 'upcoming')
  assert.equal(performancePeriod(performanceFixture, '2027-01-03'), 'past')
  assert.equal(performancePeriod({ ...performanceFixture, event: { status: 'scheduled', date: { precision: 'year', value: 2027 } } }, '2027-12-31'), 'undetermined')
  assert.equal(performancePeriod({ ...performanceFixture, event: { ...performanceFixture.event, status: 'cancelled' } }, '2027-01-01'), 'cancelled')
  fails(withAlbum({ ...albumFixture, release: { status: 'released', date: { precision: 'day', value: '2026-02-30' } } }), /invalid release date/)
})

test('stable IDs, unique slugs and referential integrity fail before a prerender list can escape', () => {
  fails({ ...neutralCatalog, albums: [albumFixture, albumFixture] }, /Duplicate content ID/)
  fails({ ...neutralCatalog, albums: [albumFixture, { ...albumFixture, id: 'album:other' }] }, /duplicate slug/)
  fails(withAlbum({ ...albumFixture, slug: '../unsafe' }), /invalid slug/)
  fails(withAlbum({ ...albumFixture, related: [{ kind: 'performance', id: 'performance:missing' }] }), /dangling/)
  fails({ ...neutralCatalog, career: [{ ...neutralCatalog.career[0], profileId: 'profile:missing' }] }, /dangling profile/)
})

test('related data uses public IDs, preserves cross-domain relationships and does not expose drafts', () => {
  assert.deepEqual(relatedRecords(neutralCatalog, albumFixture, fixtureAsOf).map((r) => r.kind), ['performance', 'media'])
  const catalog: ContentCatalog = { ...neutralCatalog, media: [{ ...neutralCatalog.media[0], publication: { status: 'draft' } }] }
  assert.deepEqual(relatedRecords(catalog, albumFixture, fixtureAsOf).map((r) => r.kind), ['performance'])
})

test('playable audio requires a runtime asset, valid track order and positive measured duration', () => {
  const playable: Album = { ...albumFixture, tracks: [{ ...albumFixture.tracks[0], source: { status: 'playable', asset: { kind: 'audio', id: 'asset:no-audio' } } }] }
  fails(withAlbum(playable), /runtime source required/)
  fails({ ...withAlbum(playable), assets: [...neutralCatalog.assets, { id: 'asset:no-audio', kind: 'audio', lifecycle: 'replace-required', masterRef: 'fixture:unavailable' }] }, /runtime source required/)
  fails(withAlbum({ ...albumFixture, tracks: [{ ...albumFixture.tracks[0], number: 2 }] }), /track order/)
  fails(withAlbum({ ...albumFixture, tracks: [{ ...albumFixture.tracks[0], durationSeconds: 0 }] }), /invalid duration/)
})

test('asset kind, runtime URL, mobile crop and public-language alt are validated', () => {
  fails({ ...neutralCatalog, assets: [{ id: 'asset:neutral-image', kind: 'audio', lifecycle: 'replace-required' }, neutralCatalog.assets[1]] }, /wrong asset/)
  fails({ ...neutralCatalog, assets: [{ ...neutralCatalog.assets[0], runtime: { url: 'javascript:alert(1)', mimeType: 'image/svg+xml' } }, neutralCatalog.assets[1]] }, /unsafe runtime URL/)
  fails(withAlbum({ ...albumFixture, presentation: { cover: { ...albumFixture.presentation.cover, mobile: { crop: { x: 0.9, y: 0, width: 0.5, height: 1 } } } } }), /invalid mobile crop/)
  fails(withAlbum({ ...albumFixture, presentation: { cover: { ...albumFixture.presentation.cover, alt: { ko: reviewedFixture('KO only') } } } }), /reviewed visual alt/)
})

test('SEO overrides change authored copy only, never canonical or alternate URLs', () => {
  const catalog = withAlbum({ ...albumFixture, content: fixtureLocales(
    { title: 'KO', summary: 'Summary', seo: { title: 'Override', description: 'Description' } },
    { title: 'EN', summary: 'English summary', seo: { title: 'English override', description: 'English description' } }) })
  const route = routeMetadata('/album/neutral-album-a', contentRouteCatalog(catalog, fixtureAsOf), { origin: 'https://example.invalid', base: '/' })!
  assert.equal(route.title, 'Override')
  assert.equal(route.description, 'Description')
  assert.equal(route.canonical, 'https://example.invalid/album/neutral-album-a/')
  assert.equal(route.hreflang.length, 3)
})

test('draft Korean metadata cannot publish an English-only detail', () => {
  fails(withAlbum({ ...albumFixture, content: { ...albumFixture.content,
    ko: { source: 'authored', status: 'draft', value: albumFixture.content.ko.value, provenance: { author: 'fixture', sourceRef: 'fixture:draft' } } } }), /reviewed KO/)
})

test('asset lifecycle is explicit and prototype eligibility does not imply production approval', () => {
  for (const lifecycle of ['provisional', 'approved', 'replace-required'] as const) {
    const asset: AssetRecord = { ...neutralCatalog.assets[0], lifecycle }
    assert.deepEqual(validateCatalog({ ...neutralCatalog, assets: [asset, neutralCatalog.assets[1]] }, fixtureAsOf), [])
    assert.equal(isAssetApprovedForProduction(asset), lifecycle === 'approved')
  }
  for (const lifecycle of [undefined, 'unknown']) {
    const asset = { ...neutralCatalog.assets[0], lifecycle } as unknown as AssetRecord
    fails({ ...neutralCatalog, assets: [asset, neutralCatalog.assets[1]] }, /invalid asset lifecycle/)
  }
  assert.ok(neutralCatalog.assets.every((asset) => asset.lifecycle === 'replace-required'))
  assert.ok(neutralCatalog.assets.every((asset) => !isAssetApprovedForProduction(asset)))
})

test('asset replacement changes the registry while content identities and route contracts stay stable', () => {
  const replacement: AssetRecord = { ...neutralCatalog.assets[0], lifecycle: 'provisional',
    masterRef: 'fixture:replacement-original', runtime: { url: 'fixtures/replacement.webp', mimeType: 'image/webp', width: 1600, height: 1600 } }
  const catalog: ContentCatalog = { ...neutralCatalog, assets: [replacement, neutralCatalog.assets[1]] }
  assert.deepEqual(validateCatalog(catalog, fixtureAsOf), [])
  assert.strictEqual(catalog.albums, neutralCatalog.albums)
  assert.equal(catalog.assets.find((asset) => asset.id === albumFixture.presentation.cover.asset.id)?.runtime?.url, 'fixtures/replacement.webp')
  assert.deepEqual(contentPrerenderPaths(catalog, fixtureAsOf), contentPrerenderPaths(neutralCatalog, fixtureAsOf))
})
