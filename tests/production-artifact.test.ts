import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { resolve } from 'node:path'
import test from 'node:test'
import { publicPages } from '../src/seo/content.ts'

const output = resolve('build-production')
const origin = 'https://choyounkyoung.com'
const albumSlugs = ['ji-young-hee-ryu-haegeum-sanjo-2026', 'yeongsan-hoesang-2026', 'pyeongjo-hoesang-2026', 'han-beom-su-haegeum-sanjo-2020']
const performanceSlugs = ['haegeum-jeongak-2026-09-22', 'sanjo-gil-2026-08-16', 'haegeum-2026-08-02']
const primary = ['/', '/immersive/', ...['works', 'about', 'media', 'contact'].map(name => `/immersive/${name}/`),
  ...albumSlugs.map(slug => `/immersive/album/${slug}/`), ...performanceSlugs.map(slug => `/immersive/performance/${slug}/`)]
const aliases = primary.filter(path => path !== '/').flatMap(path => {
  const suffix = path.slice('/immersive'.length)
  return [[`/classic${suffix}`, path], ...(suffix === '/' ? [] : [[suffix, path]])]
}).concat([['/performance/', '/immersive/works/'], ['/classic/performance/', '/immersive/works/']])
const read = (path: string) => readFileSync(resolve(output, path), 'utf8')
const htmlAt = (path: string) => read(`${path.slice(1)}index.html`)
const decode = (value: string) => value.replace(/&(?:amp|lt|gt|quot|#39);/g, entity => ({ '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#39;': "'" })[entity]!)
const tags = (html: string, tag: string): Record<string, string>[] => [...html.matchAll(new RegExp(`<${tag}\\b[^>]*>`, 'gi'))]
  .map(match => Object.fromEntries([...match[0].matchAll(/([\w:-]+)="([^"]*)"/g)].map(attribute => [attribute[1], decode(attribute[2])])))
function meta(html: string, key: string) {
  const matches = tags(html, 'meta').filter(tag => tag.name === key || tag.property === key)
  assert.equal(matches.length, 1, `Exactly one ${key}`)
  return matches[0].content
}
function canonical(html: string) {
  const links = tags(html, 'link').filter(tag => tag.rel === 'canonical')
  assert.equal(links.length, 1, 'Exactly one static canonical')
  return links[0].href
}
function assertAsset(url: string, absolute: boolean) {
  assert.ok(absolute ? url.startsWith(`${origin}/assets/`) : /^\/(?:assets|classic-app\/assets)\//.test(url), `Root-base asset: ${url}`)
  const parsed = new URL(url, origin)
  assert.equal(parsed.origin, origin)
  assert.ok(!parsed.pathname.includes('/cho-youn-kyoung-v2/'), url)
  assert.ok(statSync(resolve(output, decodeURIComponent(parsed.pathname.slice(1)))).isFile(), `Asset exists: ${url}`)
}
function assertRuntimeAssets(html: string) {
  const scripts = tags(html, 'script').filter(tag => tag.src)
  const styles = tags(html, 'link').filter(tag => tag.rel === 'stylesheet')
  assert.ok(scripts.length > 0, 'Entry scripts exist')
  assert.ok(styles.length > 0, 'Entry styles exist')
  for (const script of scripts) assertAsset(script.src, false)
  for (const style of styles) assertAsset(style.href, false)
}

test('production emits 13 uniquely described primary documents with correct static social metadata and structured data', () => {
  const titles = new Set<string>(), descriptions = new Set<string>(), canonicals = new Set<string>()
  for (const path of primary) {
    const html = htmlAt(path)
    const page = publicPages.find(page => page.path === path)!
    assert.ok(page, path)
    const titleMatches = [...html.matchAll(/<title>([^<]+)<\/title>/g)]
    assert.equal(titleMatches.length, 1, path)
    const title = decode(titleMatches[0][1])
    assert.equal(title, page.title, path)
    assert.equal(meta(html, 'description'), page.description, path)
    assert.equal(meta(html, 'robots'), 'index, follow', path)
    assert.equal(canonical(html), `${origin}${path}`, path)
    assert.equal(meta(html, 'og:url'), canonical(html))
    assert.equal(meta(html, 'og:title'), title)
    assert.equal(meta(html, 'twitter:title'), title)
    assert.equal(meta(html, 'og:description'), page.description)
    assert.equal(meta(html, 'twitter:description'), page.description)
    assert.equal(meta(html, 'og:image:alt'), page.image.alt)
    assert.equal(meta(html, 'twitter:image:alt'), page.image.alt)
    assert.equal(meta(html, 'twitter:card'), 'summary_large_image')
    assert.equal(meta(html, 'twitter:image'), meta(html, 'og:image'))
    assertAsset(meta(html, 'og:image'), true)
    assertRuntimeAssets(html)
    const ld = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(match => JSON.parse(match[1]))
    const expectedTypes = path === '/' ? ['Person', 'WebSite'] : path === '/immersive/' || path === '/immersive/about/' ? ['Person']
      : path.includes('/album/') ? ['MusicAlbum'] : path.includes('/performance/') ? ['Event'] : []
    assert.equal(ld.length, expectedTypes.length ? 1 : 0, path)
    if (ld.length) {
      assert.equal(ld[0]['@context'], 'https://schema.org')
      assert.deepEqual(ld[0]['@graph'].map((node: Record<string, unknown>) => node['@type']).sort(), expectedTypes.sort(), path)
      for (const node of ld[0]['@graph']) {
        assert.ok(node.name, path)
        assert.ok(node['@id'].startsWith(origin), path)
      }
    }
    titles.add(title); descriptions.add(page.description); canonicals.add(canonical(html))
  }
  assert.equal(titles.size, 13)
  assert.equal(descriptions.size, 13)
  assert.equal(canonicals.size, 13)
})

test('public Classic and legacy pathname aliases expose corresponding Immersive canonical without blocking crawl', () => {
  for (const [path, target] of aliases) {
    const html = htmlAt(path)
    assert.equal(canonical(html), `${origin}${target}`, path)
    assert.equal(meta(html, 'robots'), 'index, follow', path)
    assert.equal(meta(html, 'description'), meta(htmlAt(target), 'description'), path)
    assert.equal(meta(html, 'og:url'), `${origin}${target}`)
    assertAsset(meta(html, 'og:image'), true)
    assertRuntimeAssets(html)
  }
})

test('sitemap exactly matches the 13 primary URLs; fixtures and unauthored routes have no physical HTML', () => {
  const urls = [...read('sitemap.xml').matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1])
  assert.deepEqual(urls.sort(), primary.map(path => `${origin}${path}`).sort())
  assert.equal(new Set(urls).size, 13)
  const expected = [...primary, ...aliases.map(([path]) => path)].map(path => `${path.slice(1)}index.html`).concat('404.html').sort()
  const actual = readdirSync(output, { recursive: true }).filter((path): path is string => typeof path === 'string' && path.endsWith('.html') && !path.startsWith('classic-app/')).sort()
  assert.deepEqual(actual, expected)
  for (const path of ['labs', 'fixtures', 'preview', 'en', 'immersive/en', 'classic/en', 'performance/test-performance', 'immersive/album/test-album']) {
    assert.ok(!existsSync(resolve(output, path)), path)
  }
  const info = JSON.parse(read('build-info.json'))
  assert.equal(info.mode, 'public-site')
  assert.equal(info.base, '/')
})

test('404 and isolated Classic implementation have explicit noindex without misleading canonical or SPA fallback', () => {
  for (const file of ['404.html', 'classic-app/index.html']) {
    const html = read(file)
    assert.equal(meta(html, 'robots'), 'noindex, nofollow', file)
    assert.equal(tags(html, 'link').filter(tag => tag.rel === 'canonical').length, 0, file)
  }
  assert.equal(tags(read('404.html'), 'script').length, 0, 'Missing URLs retain an actual 404 document, no client redirect fallback')
  assertRuntimeAssets(read('classic-app/index.html'))
})

test('all six original PDF addresses survive domain cutover byte-for-byte from the pinned Classic build', () => {
  const sha = (data: Buffer) => createHash('sha256').update(data).digest('hex')
  for (const slug of performanceSlugs) for (const kind of ['poster', 'leaflet']) {
    const path = `assets/performances/${slug}/downloads/${kind}.pdf`
    const restored = readFileSync(resolve(output, path))
    const classic = readFileSync(resolve(output, 'classic-app', path))
    assert.equal(restored.subarray(0, 5).toString(), '%PDF-', path)
    assert.equal(sha(restored), sha(classic), path)
  }
})
