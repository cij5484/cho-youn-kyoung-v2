/// <reference lib="dom" />
import { createHash } from 'node:crypto'
import { expect, test, type APIResponse, type Page, type TestInfo } from '@playwright/test'
import { buildTargets } from '../../config/build.ts'
import type { SpikeRoute } from '../../src/spike/fixtures.ts'
import { siteRoutes } from '../../src/routing/site-catalog.ts'
import { expectLocaleMetadata } from '../metadata-assertions.ts'

const target = buildTargets.pagesPreview
const atBase = (path: string, slash = true) => target.base + (path === '/' ? '' : path.slice(1) + (slash ? '/' : ''))

async function attach(info: TestInfo, name: string, value: unknown) {
  await info.attach(name, { body: JSON.stringify(value, null, 2), contentType: 'application/json' })
}

function responseRecord(response: APIResponse) {
  const headers = response.headers()
  return { url: response.url(), status: response.status(), type: headers['content-type'],
    cacheControl: headers['cache-control'], etag: headers.etag, age: headers.age,
    lastModified: headers['last-modified'], location: headers.location, server: headers.server }
}

async function metadata(page: Page, fixture: SpikeRoute) {
  const actualWorks = fixture.key === 'works'
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(actualWorks ? 'Works.' : `${fixture.name} (${fixture.lang})`)
  await expect(page).toHaveTitle(actualWorks ? 'WORKS — 조윤경' : `${fixture.name} (${fixture.lang}) | P0B`)
  await expect(page.locator('html')).toHaveAttribute('lang', fixture.lang)
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', actualWorks ? '조윤경의 음반과 공연 기록.' : `Routing spike: ${fixture.path} [${fixture.lang}]. Test metadata only.`)
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `${target.canonicalOrigin}${atBase(fixture.path)}`)
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow')
  await expectLocaleMetadata(page, fixture, target.canonicalOrigin, target.base)
}

async function imagesAndLinks(page: Page, fixture: SpikeRoute) {
  if (fixture.key === 'works') {
    await expect(page.locator('.works-card img')).toHaveCount(6)
    await expect.poll(async () => page.locator('.works-card img').first().evaluate(image => (image as HTMLImageElement).naturalWidth)).toBeGreaterThan(1000)
    await expect(page.locator('.editorial-navigation .nav-signature')).toHaveAttribute('href', target.base)
    await expect(page.locator('.menu-links a')).toHaveCount(5)
    await expect(page.locator('a[href*="/en/works"]')).toHaveCount(0)
    await expect(page.locator('dialog button[aria-label="English — translation unavailable"]')).toBeDisabled()
    await expect(page.locator('.works-record-link')).toHaveCount(6)
    for (const href of await page.locator('.works-record-link').evaluateAll(links => links.map(link => link.getAttribute('href')))) {
      expect(href).toMatch(/^https:\/\/choyounkyoung\.com\/#\/(album|performance)\//)
    }
  } else {
    expect(await page.locator('img').evaluate(image => (image as HTMLImageElement).naturalWidth)).toBe(16)
    for (const link of siteRoutes) {
      await expect(page.locator(`[data-route-id="${link.id}"]`)).toHaveAttribute('href', atBase(link.path))
    }
  }
}

test.beforeAll(async ({ request }) => {
  // Poll identity, not a successful HTTP status alone: CDN propagation may precede fresh content.
  const expected = process.env.EXPECTED_DEPLOY_SHA
  if (!expected || !/^[a-f0-9]{40}$/.test(expected)) throw new Error('Set EXPECTED_DEPLOY_SHA to the deployed 40-character commit')
  await expect.poll(async () => {
    const response = await request.get(`${target.base}build-info.json?verify=${expected}`, {
      headers: { 'Cache-Control': 'no-cache' },
    })
    return response.status() === 200 ? (await response.json()).commit as string : `${response.status()}`
  }, { timeout: 120_000, intervals: [2000, 5000, 10_000] }).toBe(expected)
})

for (const [index, fixture] of siteRoutes.entries()) {
  test(`JS enabled ${fixture.path}: direct, hard refresh, link, back, forward`, async ({ page, context }, info) => {
    const errors: string[] = []
    page.on('pageerror', (error) => errors.push(error.message))
    page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()) })
    page.on('response', (response) => { if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`) })
    const direct = await page.goto(atBase(fixture.path, false))
    expect(direct?.status()).toBe(200)
    await metadata(page, fixture)
    const cdp = await context.newCDPSession(page)
    await cdp.send('Network.enable')
    await cdp.send('Network.clearBrowserCache')
    await cdp.send('Network.setCacheDisabled', { cacheDisabled: true })
    const refreshed = await page.reload()
    expect(refreshed?.status()).toBe(200)
    await page.waitForLoadState('networkidle')
    await metadata(page, fixture)
    await page.evaluate(() => { Object.assign(window, { p0cMarker: 'same-document' }) })
    const neighbor = fixture.key === 'works' ? siteRoutes[0] : siteRoutes[(index + 1) % siteRoutes.length]
    if (fixture.key === 'works') {
      await page.getByRole('button', { name: 'MENU', exact: true }).click()
      await expect(page.locator('dialog')).toHaveAttribute('data-phase', 'open')
      await expect(page.getByRole('button', { name: 'English — translation unavailable' })).toBeDisabled()
      await page.keyboard.press('Escape')
      await expect(page.locator('dialog')).not.toBeVisible()
      await page.getByRole('button', { name: '음반 3건', exact: true }).click()
      await expect(page.locator('.works-page')).toHaveAttribute('data-filter', 'albums')
      await expect(page.locator('.works-card[data-kind="album"]')).toHaveCount(3)
      await expect(page.locator('.works-card[data-kind="performance"]')).toHaveCount(0)
      expect(new URL(page.url()).searchParams.get('type')).toBe('albums')
      await page.goBack()
      await expect(page.locator('.works-page')).toHaveAttribute('data-filter', 'all')
      await page.goForward()
      await expect(page.locator('.works-page')).toHaveAttribute('data-filter', 'albums')
      await page.getByRole('button', { name: '전체 작업 6건', exact: true }).click()
      await expect(page.locator('.works-card')).toHaveCount(6)
      await page.locator('.editorial-navigation .nav-signature').click()
    } else {
      await page.locator(`[data-route-id="${neighbor.id}"]`).click()
    }
    await metadata(page, neighbor)
    expect(await page.evaluate(() => Reflect.get(window, 'p0cMarker'))).toBe('same-document')
    await page.goBack()
    await metadata(page, fixture)
    await page.goForward()
    await metadata(page, neighbor)
    await imagesAndLinks(page, neighbor)
    expect(await page.locator('html').evaluate((element) => getComputedStyle(element).getPropertyValue('--p0b-css-loaded').trim())).toBe('1')
    await attach(info, 'route-result', { path: fixture.path, directStatus: direct?.status(), hardRefreshStatus: refreshed?.status(),
      finalUrl: page.url(), internalNavigation: true, back: true, forward: true, errors })
    if (fixture.id === 'ko-home') await page.screenshot({ path: info.outputPath('real-pages-neutral.png'), fullPage: true })
    await cdp.detach()
    expect(errors).toEqual([])
  })
}

test.describe('JavaScript disabled', () => {
  test.use({ javaScriptEnabled: false })
  for (const fixture of siteRoutes) {
    test(`static ${fixture.path}: direct, refresh, document metadata and image`, async ({ page }, info) => {
      const direct = await page.goto(atBase(fixture.path, false))
      expect(direct?.status()).toBe(200)
      await metadata(page, fixture)
      const refreshed = await page.reload()
      expect(refreshed?.status()).toBe(200)
      await metadata(page, fixture)
      await imagesAndLinks(page, fixture)
      await attach(info, 'js-disabled', { path: fixture.path, directStatus: direct?.status(), refreshStatus: refreshed?.status(),
        finalUrl: page.url(), title: await page.title(), lang: await page.locator('html').getAttribute('lang') })
    })
  }
})

for (const suffix of ['/works', '/works/', '/works?test=1', '/works#test', '/works?test=1#test', '/w%6Frks']) {
  test(`URL variant ${suffix}`, async ({ page, request }, info) => {
    const path = `${target.base}${suffix.slice(1)}`
    const first = await request.get(path.split('#')[0], { maxRedirects: 0 })
    expect([200, 301, 302, 307, 308]).toContain(first.status())
    expect((await page.goto(path))?.status()).toBe(200)
    await metadata(page, siteRoutes[1])
    const final = new URL(page.url())
    if (suffix.includes('?')) expect(final.search).toBe('?test=1')
    if (suffix.includes('#')) expect(final.hash).toBe('#test')
    await attach(info, 'url-variant', { requested: path, first: responseRecord(first), finalUrl: final.href })
  })
}

for (const javaScriptEnabled of [true, false]) {
  test.describe(`Real HTTP 404 with JS ${javaScriptEnabled}`, () => {
    test.use({ javaScriptEnabled })
    for (const path of ['/not-a-real-page', '/album/not-a-real-album', '/performance/not-a-real-performance', '/en/not-a-real-page', '/en/works']) {
      test(path, async ({ page, request }, info) => {
        const response = await request.get(atBase(path, false))
        expect(response.status()).toBe(404)
        const navigation = await page.goto(atBase(path, false))
        expect(navigation?.status()).toBe(404)
        await expect(page.locator('h1')).toContainText('404')
        await expect(page.locator('body')).toContainText('GitHub Pages')
        expect(await response.text()).not.toContain('Routing spike:')
        await attach(info, 'real-404', { path, javaScriptEnabled, response: responseRecord(response),
          title: await page.title(), heading: await page.locator('h1').innerText() })
        if (!javaScriptEnabled && path === '/not-a-real-page') {
          await page.screenshot({ path: info.outputPath('github-404-js-disabled.png'), fullPage: true })
        }
      })
    }
  })
}

test('deployed identity, every artifact hash, MIME and cache headers', async ({ request }, info) => {
  const manifestResponse = await request.get(`${target.base}build-info.json`, { headers: { 'Cache-Control': 'no-cache' } })
  const manifest = await manifestResponse.json() as {
    commit: string; base: string; routes: string[]; files: { path: string; bytes: number; sha256: string }[]
  }
  expect(manifest.commit).toBe(process.env.EXPECTED_DEPLOY_SHA)
  expect(manifest.base).toBe(target.base)
  expect(manifest.routes).toEqual(siteRoutes.map(({ path }) => path))
  const records = [responseRecord(manifestResponse)]
  for (const file of manifest.files) {
    expect(file.path).not.toMatch(/\.map$|__spa-fallback|test-results|playwright|\.vite\/|\.gitkeep/)
    const response = await request.get(`${target.base}${file.path}`, { headers: { 'Cache-Control': 'no-cache' } })
    expect(response.status()).toBe(200)
    const bytes = await response.body()
    expect(bytes.length).toBe(file.bytes)
    expect(createHash('sha256').update(bytes).digest('hex')).toBe(file.sha256)
    const type = response.headers()['content-type'] ?? ''
    if (file.path.endsWith('.js')) expect(type).toMatch(/(?:text|application)\/javascript/)
    if (file.path.endsWith('.css')) expect(type).toContain('text/css')
    if (file.path.endsWith('.svg')) expect(type).toContain('image/svg+xml')
    if (file.path.endsWith('.html')) expect(type).toContain('text/html')
    records.push(responseRecord(response))
  }
  await attach(info, 'asset-and-cache-evidence', { manifest, responses: records })
})

test('client 404 UI is separate from document HTTP 404', async ({ page }, info) => {
  await page.goto(target.base)
  await page.waitForLoadState('networkidle')
  await page.getByTestId('unknown-link').click()
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('404')
  await expect(page).toHaveTitle('404 | P0B')
  await expect(page.locator('link[rel="canonical"]')).toHaveCount(0)
  expect((await page.reload())?.status()).toBe(404)
  await expect(page.locator('body')).toContainText('GitHub Pages')
  await attach(info, 'client-versus-document-404', { client: 'React 404 UI', refresh: 'HTTP 404, GitHub Pages default UI' })
})
