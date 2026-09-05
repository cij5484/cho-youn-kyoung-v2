/// <reference lib="dom" />
import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { expect, test, type Page, type TestInfo } from '@playwright/test'
import { getBuildTarget } from '../config/build.ts'
import { spikeRoutes, type SpikeRoute } from '../src/spike/fixtures.ts'

function pathAtBase(fixture: SpikeRoute, info: TestInfo, trailingSlash = true) {
  const { base } = getBuildTarget(info.project.name)
  return base + (fixture.path === '/' ? '' : fixture.path.slice(1) + (trailingSlash ? '/' : ''))
}

async function checkMetadata(page: Page, fixture: SpikeRoute, info: TestInfo) {
  const target = getBuildTarget(info.project.name)
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(`${fixture.name} (${fixture.lang})`)
  await expect(page).toHaveTitle(`${fixture.name} (${fixture.lang}) | P0B`)
  await expect(page.locator('html')).toHaveAttribute('lang', fixture.lang)
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', `Routing spike: ${fixture.path} [${fixture.lang}]. Test metadata only.`)
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `${target.canonicalOrigin}${pathAtBase(fixture, info)}`)
  await expect(page.locator('link[hreflang]')).toHaveCount(0)
}

test.describe('Static HTML without JavaScript', () => {
  test.use({ javaScriptEnabled: false })
  for (const fixture of spikeRoutes) {
    test(`direct ${fixture.path}: HTML, metadata, links and assets`, async ({ page, request }, info) => {
      const target = getBuildTarget(info.project.name)
      const response = await page.goto(pathAtBase(fixture, info, false))
      expect(response?.status()).toBe(200)
      await checkMetadata(page, fixture, info)
      await expect(page).toHaveURL(new URL(pathAtBase(fixture, info), info.project.use.baseURL).href)
      for (const link of spikeRoutes) {
        await expect(page.locator(`[data-route-id="${link.id}"]`)).toHaveAttribute('href', pathAtBase(link, info))
      }
      const references = await page.locator('link[rel="stylesheet"], link[rel="modulepreload"], img').evaluateAll((elements) => elements.map((el) => el.getAttribute('href') ?? el.getAttribute('src') ?? ''))
      expect(references.some((url) => url.endsWith('.css'))).toBe(true)
      expect(references.some((url) => url.endsWith('.js'))).toBe(true)
      expect(references.some((url) => url.endsWith('.svg'))).toBe(true)
      for (const url of references) {
        expect(url.startsWith(target.base)).toBe(true)
        expect((await request.get(url)).status()).toBe(200)
      }
      const htmlPath = `${fixture.path === '/' ? '' : `${fixture.path.slice(1)}/`}index.html`
      const rawPath = resolve(target.directory, 'client', target.base.slice(1), htmlPath)
      const staticPath = resolve(target.directory, 'static', htmlPath)
      expect(await readFile(rawPath, 'utf8')).toBe(await readFile(staticPath, 'utf8'))
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow')
    })
  }
})

test('hydrated links, both locales, assets, history and reload', async ({ page }, info) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()) })
  page.on('response', (response) => { if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`) })
  await page.goto(pathAtBase(spikeRoutes[0], info))
  await page.waitForLoadState('networkidle')
  // A full document navigation drops this marker; genuine client navigation retains it.
  await page.evaluate(() => { Object.assign(window, { p0bDocumentMarker: 'same-document' }) })
  for (const fixture of spikeRoutes.slice(1)) {
    await page.locator(`[data-route-id="${fixture.id}"]`).click()
    await checkMetadata(page, fixture, info)
    await expect(page).toHaveURL(new URL(pathAtBase(fixture, info), info.project.use.baseURL).href)
    expect(await page.evaluate(() => Reflect.get(window, 'p0bDocumentMarker'))).toBe('same-document')
  }
  await page.goBack()
  await checkMetadata(page, spikeRoutes[11], info)
  await page.goForward()
  await checkMetadata(page, spikeRoutes[12], info)
  expect((await page.reload())?.status()).toBe(200)
  await checkMetadata(page, spikeRoutes[12], info)
  expect(await page.locator('img').evaluate((img) => (img as HTMLImageElement).naturalWidth)).toBe(16)
  expect(await page.locator('html').evaluate((el) => getComputedStyle(el).getPropertyValue('--p0b-css-loaded').trim())).toBe('1')
  await page.screenshot({ path: `test-results/${info.project.name}-neutral-shell.png`, fullPage: true })
  expect(errors).toEqual([])
})

test('strict host returns HTTP 404 for unknown routes, slugs and assets', async ({ request }, info) => {
  const { base } = getBuildTarget(info.project.name)
  for (const path of ['missing-route', 'missing-route/', 'album/missing-album/', 'performance/missing-performance/', 'en/album/missing-album/', 'en/performance/missing-performance/', 'assets/missing.js']) {
    const response = await request.get(`${base}${path}`)
    expect(response.status()).toBe(404)
    expect(await response.text()).toBe('404 Not Found')
  }
  if (base !== '/') {
    expect((await request.get('/works/')).status()).toBe(404)
    expect((await request.get('/')).status()).toBe(404)
  }
})

test('client unknown routes and slugs show 404, distinct from HTTP status', async ({ page }, info) => {
  for (const link of ['unknown-link', 'unknown-album-link']) {
    await page.goto(pathAtBase(spikeRoutes[0], info))
    await page.waitForLoadState('networkidle')
    await page.getByTestId(link).click()
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('404')
    await expect(page).toHaveTitle('404 | P0B')
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(0)
    expect((await page.reload())?.status()).toBe(404)
  }
})

test('slash redirect preserves query; canonical excludes query/hash', async ({ page, request }, info) => {
  const fixture = spikeRoutes[1]
  const direct = pathAtBase(fixture, info, false)
  const response = await request.get(`${direct}?p0b=1`, { maxRedirects: 0 })
  expect(response.status()).toBe(301)
  expect(response.headers().location).toBe(`${direct}/?p0b=1`)
  await page.goto(`${direct}?p0b=1#test`)
  await checkMetadata(page, fixture, info)
  expect(new URL(page.url()).search).toBe('?p0b=1')
  expect(new URL(page.url()).hash).toBe('#test')
})
