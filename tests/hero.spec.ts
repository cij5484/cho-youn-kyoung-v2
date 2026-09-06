import { expect, test, type Page } from '@playwright/test'
import { readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'

async function ready(page: Page, path = '/') {
  const response = await page.goto(path)
  expect(response?.headers()['x-robots-tag']).toBe('noindex, nofollow')
  await page.evaluate(() => document.fonts.ready)
  await page.locator('.portrait').evaluateAll(imgs => Promise.all(imgs.map(img => (img as HTMLImageElement).decode())))
  await expect(page.getByRole('heading', { name: 'CHO YOUN KYOUNG', exact: true })).toHaveCount(1)
  await expect(page.locator('link[rel="canonical"], link[hreflang], meta[property^="og:"]')).toHaveCount(0)
}
async function scrollToProgress(page: Page, fraction: number) {
  await page.evaluate(f => scrollTo(0, (document.querySelector<HTMLElement>('.poster-scene')!.offsetHeight - document.querySelector<HTMLElement>('.poster-stage')!.offsetHeight) * f), fraction)
  await expect.poll(async () => Number(await page.locator('.poster-scene').getAttribute('data-progress'))).toBeCloseTo(fraction, 2)
}
const motionState = (page: Page) => page.locator('.poster-scene').evaluate(el => ({
  source: +el.style.getPropertyValue('--source-next'), aperture: +el.style.getPropertyValue('--aperture'),
  x: +el.style.getPropertyValue('--pointer-x'), y: +el.style.getPropertyValue('--pointer-y'),
}))
for (const study of ['b']) {
  for (const [width, height] of [[320, 568], [390, 844], [768, 1024], [1024, 768], [1440, 1000], [1920, 1080]]) {
    test(`${study} ${width}: independent composition, loaded portrait, touch-safe navigation and no page overflow`, async ({ browser }, info) => {
      const context = await browser.newContext({ baseURL: 'http://127.0.0.1:4177', viewport: { width, height }, hasTouch: width < 1120, isMobile: width < 1120 })
      const page = await context.newPage(), errors: string[] = []
      page.on('pageerror', e => errors.push(e.message))
      await ready(page, `/?study=${study}`)
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
      for (const control of await page.locator('header a, header button').all()) {
        const box = (await control.boundingBox())!
        expect(box.width).toBeGreaterThanOrEqual(44); expect(box.height).toBeGreaterThanOrEqual(44)
        expect(box.x).toBeGreaterThanOrEqual(0); expect(box.x + box.width).toBeLessThanOrEqual(width)
      }
      const before = await page.locator('header').boundingBox()
      await page.screenshot({ path: info.outputPath(`${study}-${width}-initial.png`) })
      if (width < 1120) {
        await page.mouse.move(width * .8, height * .7)
        expect((await motionState(page)).x).toBe(0)
      }
      await scrollToProgress(page, .9)
      await expect.poll(async () => (await motionState(page)).source).toBe(1)
      expect(await page.locator('header').boundingBox()).toEqual(before)
      await page.getByRole('button', { name: 'MENU', exact: true }).click()
      await expect(page.locator('dialog')).toHaveAttribute('data-phase', 'open')
      await expect(page.getByRole('link', { name: 'WORKS', exact: true })).toBeVisible()
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
      await page.getByRole('button', { name: '메뉴 닫기' }).click()
      await expect(page.locator('dialog')).not.toBeVisible()
      expect(errors).toEqual([])
      await context.close()
    })
  }
  test(`${study}: separate depth, reversible photographic aperture and fixed navigation`, async ({ page }, info) => {
    await page.setViewportSize({ width: 1440, height: 1000 }); await ready(page, `/?study=${study}`)
    await page.mouse.move(1150, 800)
    await expect.poll(async () => (await motionState(page)).x).toBeGreaterThan(.5)
    await page.waitForTimeout(400)
    const transforms = await page.locator('.portrait-initial, .poster-type-back .word, .line-one, .line-two').evaluateAll(els => els.map(el => getComputedStyle(el).transform))
    expect(new Set(transforms).size).toBeGreaterThanOrEqual(5)
    await page.screenshot({ path: info.outputPath('pointer-depth.png') })
    await scrollToProgress(page, .4)
    expect((await motionState(page)).aperture).toBeLessThan(.6)
    expect((await motionState(page)).source).toBe(0)
    await page.screenshot({ path: info.outputPath('aperture-intermediate.png') })
    await scrollToProgress(page, .9)
    expect((await motionState(page)).source).toBe(1); expect((await motionState(page)).aperture).toBe(1)
    await page.waitForTimeout(400)
    await page.screenshot({ path: info.outputPath('first-scroll.png') })
    await scrollToProgress(page, 0)
    expect((await motionState(page)).source).toBe(0); expect((await motionState(page)).aperture).toBe(1)
    await page.getByRole('button', { name: 'MENU', exact: true }).click()
    await expect.poll(async () => (await motionState(page)).x).toBe(0)
    await page.keyboard.press('Escape'); await expect(page.locator('dialog')).not.toBeVisible()
  })
  test(`${study}: reduced motion is a complete static poster with no sticky delay or pointer dependency`, async ({ page }, info) => {
    await page.emulateMedia({ reducedMotion: 'reduce' }); await ready(page, `/?study=${study}`)
    await expect(page.locator('.poster-scene')).toHaveAttribute('data-motion', 'reduced')
    await expect(page.locator('.poster-stage')).toHaveCSS('position', 'relative')
    await page.mouse.move(800, 600); await page.evaluate(() => scrollTo(0, 150))
    expect(await motionState(page)).toEqual({ source: 0, aperture: 1, x: 0, y: 0 })
    await page.screenshot({ path: info.outputPath('reduced.png') })
    await page.getByRole('button', { name: 'MENU', exact: true }).click()
    await expect(page.locator('dialog')).toHaveAttribute('data-phase', 'open')
    expect(await page.locator('dialog').evaluate(el => el.getAnimations({ subtree: true }).length)).toBe(0)
    await page.keyboard.press('Escape'); await expect(page.locator('dialog')).not.toBeVisible()
    await page.emulateMedia({ reducedMotion: 'no-preference' })
    await expect(page.locator('.poster-scene')).toHaveAttribute('data-motion', 'pointer-and-scroll')
  })
}
for (const width of [320, 1440]) test(`${width}: keyboard skip, focus trap, Esc restore and 200% text`, async ({ page, browserName }) => {
  const tabKey = browserName === 'webkit' && process.platform === 'darwin' ? 'Alt+Tab' : 'Tab'
  await page.setViewportSize({ width, height: 900 }); await ready(page)
  await page.keyboard.press(tabKey); await expect(page.getByRole('link', { name: '본문으로 이동' })).toBeFocused()
  await page.keyboard.press('Enter'); await expect(page.locator('main')).toBeFocused()
  const trigger = page.getByRole('button', { name: 'MENU', exact: true })
  await trigger.focus(); await page.keyboard.press('Enter')
  await expect(page.locator('dialog')).toHaveAttribute('data-phase', 'open')
  const close = page.getByRole('button', { name: '메뉴 닫기' })
  await expect(close).toBeFocused(); await expect(close).toHaveCSS('outline-style', 'solid')
  for (let i = 0; i < 12; i++) {
    await page.keyboard.press(tabKey); expect(await page.evaluate(() => !!document.activeElement?.closest('dialog'))).toBe(true)
  }
  await page.keyboard.press('Escape'); await expect(page.locator('dialog')).not.toBeVisible(); await expect(trigger).toBeFocused()
  await page.evaluate(() => { document.documentElement.style.fontSize = '200%' })
  await expect(trigger).toBeVisible()
  if (width === 320) await expect(page.locator('.poster-scene')).toHaveAttribute('data-reflow', 'true')
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
})
test('KO/EN preserve semantic destination counterpart and focus, without new content routes', async ({ page }) => {
  await ready(page)
  await page.getByRole('button', { name: 'MENU', exact: true }).click()
  await expect(page.locator('dialog')).toHaveAttribute('data-phase', 'open')
  await page.getByRole('link', { name: 'English', exact: true }).click()
  await expect(page).toHaveURL('http://127.0.0.1:4177/en/')
  await expect(page.locator('html')).toHaveAttribute('lang', 'en'); await expect(page.locator('main')).toBeFocused()
  await page.goto('/performance/test-performance/')
  await page.getByRole('button', { name: 'MENU', exact: true }).click()
  await expect(page.locator('dialog')).toHaveAttribute('data-phase', 'open')
  await expect(page.getByRole('link', { name: 'English', exact: true })).toHaveAttribute('href', '/en/performance/test-performance/')
  await page.getByRole('link', { name: 'English', exact: true }).click()
  await expect(page).toHaveURL('http://127.0.0.1:4177/en/performance/test-performance/')
  await expect(page.locator('main')).toBeFocused(); await expect(page.locator('.poster-scene')).toHaveCount(0)
})
test('failed secondary image keeps the initial authentic portrait visible through scroll', async ({ page }) => {
  await page.route(/portrait-instrument.*webp/, route => route.request().resourceType() === 'image' ? route.abort() : route.continue())
  await page.goto('/?study=b'); await page.locator('.portrait-initial').evaluate(img => (img as HTMLImageElement).decode())
  await scrollToProgress(page, .9)
  expect((await motionState(page)).source).toBe(0); expect((await motionState(page)).aperture).toBe(1)
  await expect(page.locator('.portrait-initial')).toHaveCSS('opacity', '1')
})
test('font failure preserves readable identity and menu operation', async ({ page }) => {
  await page.route(/\.woff2/, route => route.abort())
  await ready(page)
  await expect(page.getByRole('heading', { name: 'CHO YOUN KYOUNG', exact: true })).toHaveCount(1)
  await page.getByRole('button', { name: 'MENU', exact: true }).click()
  await expect(page.locator('dialog')).toHaveAttribute('data-phase', 'open')
  await page.getByRole('link', { name: 'WORKS', exact: true }).click()
  await expect(page).toHaveURL('http://127.0.0.1:4177/works/')
})
test('runtime derivatives match recorded provenance and no master is bundled in Hero Lab', () => {
  const provenance = JSON.parse(readFileSync('evidence/p2d/portrait-provenance.json', 'utf8'))
  expect(provenance.pairUserConfirmed).toEqual([3, 7])
  for (const asset of provenance.derivatives) {
    const bytes = readFileSync(asset.path)
    expect(bytes.subarray(8, 12).toString()).toBe('WEBP')
    expect(createHash('sha256').update(bytes).digest('hex')).toBe(asset.sha256)
    expect(bytes.length).toBeLessThan(350_000)
  }
})

for (const [width, height] of [[320, 568], [390, 844], [1920, 1080]]) test(`${width}: actual name glyphs remain separated from each other and navigation during scroll`, async ({ page }) => {
  await page.setViewportSize({ width, height })
  for (const study of ['b']) {
    await ready(page, `/?study=${study}`)
    for (const progress of [0, .9]) {
      await scrollToProgress(page, progress); await page.waitForTimeout(400)
      const bounds = await page.locator('.poster-type-back .word').evaluateAll(elements => elements.map(el => {
        const style = getComputedStyle(el), canvas = document.createElement('canvas'), context = canvas.getContext('2d')!
        context.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`
        context.letterSpacing = style.letterSpacing
        const metrics = context.measureText(el.textContent!), marker = document.createElement('i')
        marker.style.cssText = 'display:inline-block;width:0;height:0;vertical-align:baseline'
        el.append(marker); const baseline = marker.getBoundingClientRect().top; marker.remove()
        const box = el.getBoundingClientRect()
        return { top: baseline - metrics.actualBoundingBoxAscent, bottom: baseline + metrics.actualBoundingBoxDescent, right: box.left + metrics.actualBoundingBoxRight }
      }))
      for (let i = 1; i < bounds.length; i++) expect(bounds[i].top, `${study}: word ${i} ink overlap`).toBeGreaterThan(bounds[i - 1].bottom)
      const header = (await page.locator('header').boundingBox())!
      // The visible label, not the padded header box, is the first-row visual boundary.
      expect(bounds[0].top).toBeGreaterThan(header.y + header.height - 14)
      if (width < 640) expect(bounds[2].right).toBeLessThanOrEqual(width)
    }
  }
})

test('selection is frozen: former comparison URLs render only B with no chooser', async ({ page }) => {
  for (const path of ['/?study=a', '/?study=c', '/en/?study=refined']) {
    await ready(page, path)
    await expect(page.locator('.bold-hero')).toHaveCount(1)
    await expect(page.locator('[data-study], .study-switch, a[href*="study="], select')).toHaveCount(0)
  }
})

test('large scroll jumps and reversals exchange the portrait only through a closed rendered frame, then stop RAF', async ({ page }) => {
  await page.addInitScript(() => {
    const native = window.requestAnimationFrame.bind(window)
    const frames: { source: number; aperture: number }[] = []
    Object.assign(window, { heroFrames: frames })
    window.requestAnimationFrame = callback => native(time => {
      callback(time)
      const scene = document.querySelector<HTMLElement>('.poster-scene')
      if (scene) frames.push({ source: +scene.style.getPropertyValue('--source-next'), aperture: +scene.style.getPropertyValue('--aperture') })
    })
  })
  await ready(page)
  await scrollToProgress(page, .94)
  await scrollToProgress(page, .05)
  const frames = await page.evaluate(() => (window as unknown as { heroFrames: { source: number; aperture: number }[] }).heroFrames)
  let exchanges = 0
  for (let i = 1; i < frames.length; i++) if (frames[i].source !== frames[i - 1].source) {
    exchanges++
    expect(Math.min(frames[i - 1].aperture, frames[i].aperture), 'exchange must touch a fully closed rendered frame in either direction').toBe(0)
  }
  expect(exchanges).toBe(2)
  await page.waitForTimeout(400)
  const count = await page.evaluate(() => (window as unknown as { heroFrames: unknown[] }).heroFrames.length)
  await page.waitForTimeout(500)
  expect(await page.evaluate(() => (window as unknown as { heroFrames: unknown[] }).heroFrames.length)).toBe(count)
})

test('late secondary download waits for a return to the initial frame before arming the exchange', async ({ page }) => {
  let release!: () => void
  const held = new Promise<void>(resolve => { release = resolve })
  await page.route(/portrait-instrument.*webp/, async route => {
    if (route.request().resourceType() === 'image') await held
    await route.continue()
  })
  await page.goto('/', { waitUntil: 'domcontentloaded' })
  await page.locator('.portrait-initial').evaluate(img => (img as HTMLImageElement).decode())
  await scrollToProgress(page, .9)
  expect((await motionState(page)).source).toBe(0)
  release()
  await page.locator('.portrait-instrument').evaluate(img => (img as HTMLImageElement).decode())
  await expect(page.locator('.poster-scene')).toHaveAttribute('data-exchange', 'waiting')
  expect((await motionState(page)).aperture).toBe(1)
  await scrollToProgress(page, 0)
  await expect(page.locator('.poster-scene')).toHaveAttribute('data-exchange', 'ready')
  await scrollToProgress(page, .9)
  expect((await motionState(page)).source).toBe(1)
})

test('failed primary photo leaves readable Ink identity and functional navigation', async ({ page }) => {
  await page.route(/portrait-initial.*webp/, route => route.request().resourceType() === 'image' ? route.abort() : route.continue())
  await page.goto('/')
  await expect(page.locator('.poster-scene')).toHaveAttribute('data-image-error', 'true')
  await expect(page.locator('.poster-type-front')).toHaveCSS('visibility', 'hidden')
  await expect(page.locator('.poster-type-back')).toBeVisible()
  await page.getByRole('button', { name: 'MENU', exact: true }).click()
  await expect(page.locator('dialog')).toHaveAttribute('data-phase', 'open')
})

test('viewport changes preserve progress from the actual stage and reverse to the original poster', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 }); await ready(page)
  await scrollToProgress(page, .9)
  await page.setViewportSize({ width: 844, height: 390 })
  await expect.poll(async () => page.locator('.poster-scene').evaluate(el => {
    const scene = el as HTMLElement, stage = scene.querySelector<HTMLElement>('.poster-stage')!
    const expected = Math.min(1, Math.max(0, -scene.getBoundingClientRect().top / (scene.offsetHeight - stage.offsetHeight)))
    return Math.abs(Number(scene.dataset.progress) - expected)
  })).toBeLessThan(.005)
  await page.setViewportSize({ width: 390, height: 844 })
  await scrollToProgress(page, 0)
  expect(await motionState(page)).toEqual({ source: 0, aperture: 1, x: 0, y: 0 })
})
