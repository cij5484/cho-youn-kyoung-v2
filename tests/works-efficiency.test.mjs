// Run after npm run build:development-preview: node --test tests/works-efficiency.test.mjs
/* global document, scrollTo, requestAnimationFrame, getComputedStyle */
import test from 'node:test'
import assert from 'node:assert/strict'
import { preview } from 'vite'
import { chromium, expect } from '@playwright/test'

test('built WORKS keeps archive/reverse/filter behavior and shares the mobile image sources', async t => {
  const server = await preview({ configFile: false, base: '/cho-youn-kyoung-v2/',
    build: { outDir: 'build-development-preview' }, preview: { host: '127.0.0.1', port: 4199, strictPort: true } })
  t.after(() => new Promise(resolve => server.httpServer.close(resolve)))
  const browser = await chromium.launch()
  t.after(() => browser.close())
  const base = 'http://127.0.0.1:4199/cho-youn-kyoung-v2/'

  for (const width of [1440, 502, 390, 320]) {
    const mobile = width <= 700
    const context = await browser.newContext({ viewport: { width, height: width === 502 ? 966 : mobile ? 844 : 1000 },
      deviceScaleFactor: mobile ? 3 : 1, isMobile: mobile, hasTouch: mobile })
    const page = await context.newPage(), errors = [], images = new Set()
    page.on('pageerror', error => errors.push(error.message))
    page.on('request', request => { if (request.resourceType() === 'image') images.add(request.url()) })
    await page.goto(`${base}works/`)
    await expect(page.locator('.atmospheric-depth')).toHaveAttribute('data-state', 'ready')
    await expect(page.locator('#works-compact-archive')).toHaveCount(1)
    await expect(page.locator('[data-archive-row]')).toHaveCount(7)
    await page.evaluate(() => document.fonts.ready)
    const archive = page.locator('.atmospheric-archive')
    const visibleRecords = page.locator(mobile ? '[data-archive-row]:visible' : '[data-preview-row]:visible')
    const seek = async progress => {
      await page.locator('.atmospheric-depth').evaluate((el, p) => scrollTo(0,
        Number(el.dataset.scrollStart) + Number(el.dataset.scrollRange) * p), progress)
      await expect.poll(() => page.locator('.atmospheric-depth').evaluate((el, p) => {
        const difference = Math.abs(Number(el.dataset.progress) - p)
        // Expansion can move the native scroll anchor; continue toward the requested frame.
        if (difference > .0001) scrollTo(0, Number(el.dataset.scrollStart) + Number(el.dataset.scrollRange) * p)
        return difference
      }, progress)).toBeLessThan(.0001)
      await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))))
    }
    for (const progress of (width === 502 || width === 320 ? [1, 0, 1] : [1, .9, 0, 1])) {
      await seek(progress)
      await expect(archive).toHaveAttribute('data-index-view', 'false')
      assert.equal(await archive.evaluate(el => el.inert), progress !== 1)
      const titles = await page.locator('.atmospheric-archive-title:visible').evaluateAll(nodes => nodes.map(node => ({
        text: node.textContent, fits: node.scrollWidth <= node.clientWidth + 1,
        singleLine: getComputedStyle(node).whiteSpace === 'nowrap',
      })))
      assert.ok(titles.every(title => !title.text.startsWith('조윤경') && title.singleLine && title.fits), JSON.stringify(titles))
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth)
      assert.ok(scrollWidth <= width, `overflow: viewport=${width}, progress=${progress}, width=${scrollWidth}`)
    }
    await expect(page.locator('[data-archive-row] a').first()).toHaveAttribute('aria-label', /공연 기록 보기$/)
    const firstImage = page.locator('[data-archive-row] img').first()
    await firstImage.evaluate(img => img.decode())
    await page.getByRole('button', { name: '음반 4건', exact: true }).click()
    await expect(visibleRecords).toHaveCount(4)
    await seek(1)
    await page.getByRole('button', { name: '공연 3건', exact: true }).click()
    await expect(visibleRecords).toHaveCount(3)
    await seek(1)
    await page.goBack()
    await expect(visibleRecords).toHaveCount(4)
    await seek(1)
    await page.getByRole('button', { name: '전체 작업 7건', exact: true }).click()
    await expect(visibleRecords).toHaveCount(7)
    const source = await firstImage.evaluate(img => img.currentSrc)
    assert.equal(source.includes('-mobile-'), mobile)
    const artwork = [...images].filter(url => /(?:front|poster).*\.webp/.test(url))
    assert.equal(artwork.filter(url => url.includes('-mobile-')).length, 7, 'the helix uses the seven smaller sources')
    if (mobile) assert.equal(artwork.length, 7, 'mobile archive shares the same sources')
    assert.deepEqual(errors, [])
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await expect(page.locator('.atmospheric-depth')).toHaveAttribute('data-static', 'true')
    await expect(visibleRecords).toHaveCount(7)
    await context.close()
  }

  // A failed lazy import must retain the same seven navigable public records as the normal scene.
  const page = await browser.newPage()
  await page.route('**/assets/AtmosphericDepth-*.js', route => route.abort())
  await page.goto(`${base}works/`)
  await expect(page.locator('[data-engine-state="failed"]')).toBeVisible()
  await expect(page.locator('#works-compact-archive')).toHaveCount(1)
  await expect(page.locator('.works-compact-records li')).toHaveCount(7)
  await expect(page.locator('.works-compact-records [data-work-id="album:ji-young-hee-ryu-haegeum-sanjo-2026"] a')).toHaveAttribute('href', '/album/ji-young-hee-ryu-haegeum-sanjo-2026/')
  await page.getByRole('button', { name: '음반 4건', exact: true }).click()
  await expect(page.locator('.works-compact-records li')).toHaveCount(4)
  await page.close()
})
