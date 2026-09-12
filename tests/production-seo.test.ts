import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import test from 'node:test'
import { productionSite } from '../config/public-site.ts'
import { publicPages } from '../src/seo/content.ts'
import {
  aliasPaths, escapeHtml, legacyHashPath, metadataHtml, metadataTags,
  pageMetadata, primaryPaths, publicPage, robotsText, serializeJsonLd, sitemapXml,
} from '../src/seo/metadata.ts'
import type { SeoEnvironment } from '../src/seo/metadata.ts'
import { atmosphericCatalog } from '../src/works/candidates/atmospheric-catalog.ts'

const production: SeoEnvironment = { production: true, origin: productionSite.origin, base: '/' }
const preview: SeoEnvironment = { production: false, origin: 'https://cij5484.github.io', base: '/cho-youn-kyoung-v2/' }
const readJson = (path: string) => JSON.parse(readFileSync(new URL(path, import.meta.url), 'utf8'))

test('public metadata covers six entry/general pages and seven real detail pages with unique copy and existing assets', () => {
  assert.equal(publicPages.length, 13)
  assert.equal(new Set(primaryPaths).size, 13)
  assert.equal(new Set(publicPages.map(page => page.title)).size, 13)
  assert.equal(new Set(publicPages.map(page => page.description)).size, 13)
  assert.deepEqual(publicPages.filter(page => !page.structured).map(page => page.path).sort(), [
    '/', '/immersive/', '/immersive/about/', '/immersive/contact/', '/immersive/media/', '/immersive/works/',
  ])
  for (const page of publicPages) {
    assert.ok(page.title.trim(), page.path)
    assert.ok(page.description.trim(), page.path)
    assert.ok(page.image.alt.trim(), page.path)
    assert.match(page.image.source, /^src\//)
    assert.ok(existsSync(new URL(`../${page.image.source}`, import.meta.url)), page.image.source)
  }
})

test('Event metadata matches the current performance records without inventing event or ticket facts', () => {
  const records = [readJson('../src/performance-detail/performance-record.json'), ...readJson('../src/performance-detail/performance-variants.json')]
  const events = publicPages.filter(page => page.structured?.['@type'] === 'Event')
  assert.equal(events.length, 3)
  for (const record of records) {
    const page = publicPage(`/immersive/performance/${record.slug}/`)!
    const data = page.structured!
    assert.equal(data.name, record.title)
    assert.equal(data.startDate, `${record.date}T${record.time}:00+09:00`)
    assert.deepEqual(data.location, { '@type': 'Place', name: record.venue, address: record.address })
    assert.deepEqual(data.performer, { '@type': 'Person', name: '조윤경', '@id': `${productionSite.origin}/#person` })
    assert.ok(page.title.includes(record.subtitle))
    assert.ok(page.description.includes(record.venue))
    for (const work of record.program) assert.ok(page.description.includes(work.title), work.title)
    for (const unknown of ['endDate', 'offers', 'eventStatus', 'organizer']) assert.ok(!(unknown in data), unknown)
  }
})

test('MusicAlbum metadata covers all four presented albums and preserves release-date precision', () => {
  const albums = atmosphericCatalog.filter(record => record.type === 'album')
  assert.equal(albums.length, 4)
  assert.equal(publicPages.filter(page => page.structured?.['@type'] === 'MusicAlbum').length, 4)
  for (const record of albums) {
    const page = publicPage(`/immersive/album/${record.id.slice('album:'.length)}/`)!
    assert.equal(page.structured?.name, record.title)
    assert.deepEqual(page.structured?.byArtist, { '@type': 'Person', name: '조윤경', '@id': `${productionSite.origin}/#person` })
    assert.equal(page.structured?.datePublished, record.date && record.releaseState !== 'announced' ? record.date : undefined)
    assert.ok(!('offers' in page.structured!))
  }
})

test('Classic and unprefixed semantic aliases share the exact Immersive canonical while entry stays self-canonical', () => {
  assert.equal(pageMetadata('/', production).canonical, `${productionSite.origin}/`)
  assert.equal(pageMetadata('/classic/', production).canonical, `${productionSite.origin}/immersive/`)
  assert.equal(new Set(aliasPaths).size, aliasPaths.length)
  for (const page of publicPages.filter(item => item.path.startsWith('/immersive/'))) {
    const suffix = page.path.slice('/immersive'.length)
    assert.equal(publicPage(`/classic${suffix}`), page)
    assert.equal(pageMetadata(`/classic${suffix}`, production).canonical, `${productionSite.origin}${page.path}`)
    assert.ok(aliasPaths.includes(`/classic${suffix}`))
    if (suffix !== '/') {
      assert.equal(publicPage(suffix), page)
      assert.ok(aliasPaths.includes(suffix))
    }
  }
  for (const alias of ['/performance/', '/classic/performance/']) {
    assert.equal(publicPage(alias)?.path, '/immersive/works/')
  }
  assert.equal(aliasPaths.filter(path => path.startsWith('/classic/album/') || path.startsWith('/classic/performance/') && path !== '/classic/performance/').length, 7)
  // The caller supplies URL.pathname, so experimental query/hash state cannot enter canonical URLs.
  const location = new URL('https://choyounkyoung.com/classic/works/?dev=1#archive')
  assert.equal(pageMetadata(location.pathname, production).canonical, `${productionSite.origin}/immersive/works/`)
})

test('fixtures, internal implementations, nonexistent detail pages and unauthored English pages stay excluded', () => {
  for (const path of [
    '/classic-app/', '/classic-app/about/', '/fixtures/', '/preview/', '/labs/', '/en/',
    '/immersive/en/', '/classic/en/about/', '/immersive/album/test-album/',
    '/performance/test-performance/', '/immersive/performance/not-a-record/', '/404.html',
  ]) {
    const meta = pageMetadata(path, production)
    assert.equal(publicPage(path), undefined, path)
    assert.equal(meta.robots, 'noindex, nofollow', path)
    assert.equal(meta.canonical, undefined, path)
    assert.equal(meta.jsonLd, undefined, path)
  }
})

test('Project Pages preview metadata has project-base URLs, no indexing and no production structured data', () => {
  for (const page of publicPages) {
    const meta = pageMetadata(page.path, preview)
    assert.equal(meta.robots, 'noindex, nofollow')
    assert.equal(meta.jsonLd, undefined)
    assert.equal(meta.canonical, `${preview.origin}${preview.base}${page.path.slice(1)}`)
    assert.ok(meta.image?.startsWith(`${preview.origin}${preview.base}assets/social/`))
    assert.ok(!metadataHtml(page.path, preview).includes(productionSite.origin))
  }
  assert.equal(robotsText(false), 'User-agent: *\nDisallow: /\n')
})

test('production sitemap contains exactly the canonical public URL set and robots preserve explicit exclusions', () => {
  const xml = sitemapXml()
  const urls = Array.from(xml.matchAll(/<loc>([^<]+)<\/loc>/g), match => match[1])
  assert.deepEqual(urls, primaryPaths.map(path => `${productionSite.origin}${path}`))
  assert.equal(new Set(urls).size, 13)
  for (const url of urls) assert.ok(!/\/(?:classic|classic-app|fixtures|preview|labs|assets|en)\//.test(url), url)
  const robots = robotsText(true)
  assert.ok(robots.includes('Allow: /\n'))
  for (const path of ['/classic-app/', '/fixtures/', '/preview/', '/labs/', '/en/']) assert.ok(robots.includes(`Disallow: ${path}\n`))
  assert.ok(robots.includes(`Sitemap: ${productionSite.origin}/sitemap.xml\n`))
  // Classic wrappers must remain crawlable to expose their semantic canonical.
  assert.ok(!robots.includes('Disallow: /classic/\n'))
})

test('all public pages expose consistent social metadata and only factual page-specific structured graphs', () => {
  for (const page of publicPages) {
    const meta = metadataTags(page.path, production)
    assert.equal(meta.robots, 'index, follow')
    const tag = (key: string) => meta.tags.find(item => item.attributes.name === key || item.attributes.property === key)?.attributes.content
    assert.equal(tag('og:title'), page.title)
    assert.equal(tag('twitter:title'), page.title)
    assert.equal(tag('og:description'), page.description)
    assert.equal(tag('twitter:description'), page.description)
    assert.equal(tag('og:image'), meta.image)
    assert.equal(tag('twitter:image'), meta.image)
    assert.equal(meta.tags.filter(item => item.attributes.rel === 'canonical').length, 1)
    if (page.structured) {
      assert.ok(meta.jsonLd?.['@graph'].some(item => item['@type'] === page.structured?.['@type']))
    }
  }
  const graph = pageMetadata('/', production).jsonLd?.['@graph'] ?? []
  assert.equal(graph.filter(item => item['@type'] === 'Person').length, 1)
  assert.equal(graph.filter(item => item['@type'] === 'WebSite').length, 1)
  assert.ok(!graph.some(item => item['@type'] === 'MusicGroup'))
})

test('JSON-LD and HTML escaping preserve text without allowing markup termination', () => {
  const original = { description: '</script><script>alert("x")</script> & 한국어', title: "'quoted'" }
  const serialized = serializeJsonLd(original)
  assert.ok(!serialized.includes('<'))
  assert.ok(serialized.includes('\\u003c/script>'))
  assert.deepEqual(JSON.parse(serialized), original)
  assert.equal(escapeHtml('<tag key="x">\'&'), '&lt;tag key=&quot;x&quot;&gt;&#39;&amp;')
})

test('known V1 hash bookmarks bridge to real semantic pages; unknown bookmarks are not redirected', () => {
  assert.equal(legacyHashPath('#/'), '/immersive/')
  assert.equal(legacyHashPath('#/performance'), '/immersive/works/')
  assert.equal(legacyHashPath('#/performance/'), '/immersive/works/')
  for (const page of publicPages.filter(item => item.path.startsWith('/immersive/') && item.path !== '/immersive/')) {
    const oldPath = page.path.slice('/immersive'.length)
    assert.equal(legacyHashPath(`#${oldPath}`), page.path)
    assert.equal(legacyHashPath(`#${oldPath}?from=old#chapter`), page.path)
  }
  for (const hash of ['', '#sound-entry', '#/not-real/', '#/album/private-draft/', '#/en/about/']) {
    assert.equal(legacyHashPath(hash), undefined, hash)
  }
})
