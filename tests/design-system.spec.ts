import { expect, test, type Page } from '@playwright/test'

async function observeLoading(page: Page) {
  await page.addInitScript(() => {
    const data = { cls: 0, lcp: 0 }
    Object.assign(window, { labMetrics: data })
    new PerformanceObserver(list => {
      for (const entry of list.getEntries()) {
        const shift = entry as PerformanceEntry & { hadRecentInput: boolean; value: number }
        if (!shift.hadRecentInput) data.cls += shift.value
      }
    }).observe({ type: 'layout-shift', buffered: true })
    new PerformanceObserver(list => {
      for (const entry of list.getEntries()) data.lcp = entry.startTime
    }).observe({ type: 'largest-contentful-paint', buffered: true })
  })
}

async function metrics(page: Page) {
  return page.evaluate(() => {
    const fonts = performance.getEntriesByType('resource').filter(r => r.name.includes('.woff2')) as PerformanceResourceTiming[]
    const data = (window as unknown as { labMetrics: { cls: number; lcp: number } }).labMetrics
    return { ...data, width: innerWidth, scrollWidth: document.documentElement.scrollWidth,
      fontRequests: fonts.length, fontBytes: fonts.reduce((sum, font) => sum + font.decodedBodySize, 0),
      fontOrigins: [...new Set(fonts.map(font => new URL(font.name).origin))],
      loadedFamilies: [...new Set([...document.fonts].filter(font => font.status === 'loaded').map(font => font.family))] }
  })
}

async function expectReadable(page: Page) {
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  await expect(page.locator('[data-font="body"]')).toBeVisible()
  await expect(page.locator('[data-font="korean"]')).toBeVisible()
  for (const control of await page.locator('.text-action').all()) {
    if (await control.evaluate(el => el.classList.contains('skip-link'))) continue
    const box = await control.boundingBox()
    expect(box?.height).toBeGreaterThanOrEqual(44)
    expect(box?.width).toBeGreaterThanOrEqual(44)
  }
}

for (const [name, width, height] of [
  ['desktop', 1440, 1000], ['mobile', 390, 844], ['small-mobile', 320, 800],
  ['tablet', 768, 1024], ['wide', 1920, 1080],
] as const) {
  test(`${name}: actual fonts, readable reflow, palette and visual evidence`, async ({ browser }, info) => {
    const context = await browser.newContext({ baseURL: 'http://127.0.0.1:4175', viewport: { width, height }, hasTouch: width < 960 })
    const page = await context.newPage()
    const errors: string[] = []
    page.on('pageerror', error => errors.push(error.message))
    await observeLoading(page)
    const response = await page.goto('/')
    expect(response?.headers()['x-robots-tag']).toBe('noindex, nofollow')
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow')
    await expect(page.locator('link[rel="canonical"], link[hreflang], meta[property^="og:"]')).toHaveCount(0)
    await page.evaluate(() => document.fonts.ready)
    await expectReadable(page)
    const columns = await page.locator('.editorial-grid').first().evaluate(el => getComputedStyle(el).gridTemplateColumns.split(' ').length)
    expect(columns).toBe(width < 960 ? 4 : 12)
    const contrast = await page.locator('[data-contrast]').evaluateAll(elements => {
      const luminance = (color: string) => {
        const channels = color.match(/[\d.]+/g)!.slice(0, 3).map(v => Number(v) / 255)
          .map(v => v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4)
        return channels[0] * .2126 + channels[1] * .7152 + channels[2] * .0722
      }
      return elements.map(el => {
        let parent: Element | null = el
        while (parent && getComputedStyle(parent).backgroundColor === 'rgba(0, 0, 0, 0)') parent = parent.parentElement
        const foreground = luminance(getComputedStyle(el).color)
        const background = luminance(getComputedStyle(parent!).backgroundColor)
        return { role: el.getAttribute('data-contrast'), ratio: (Math.max(foreground, background) + .05) / (Math.min(foreground, background) + .05), opacity: getComputedStyle(el).opacity }
      })
    })
    for (const sample of contrast) { expect(sample.ratio).toBeGreaterThanOrEqual(4.5); expect(sample.opacity).toBe('1') }
    const loading = await metrics(page)
    expect(loading.loadedFamilies.sort()).toEqual(['Cormorant Garamond Variable', 'Noto Sans KR Variable', 'Noto Serif KR Variable'])
    expect(loading.fontOrigins).toEqual(['http://127.0.0.1:4175'])
    expect(loading.fontBytes).toBeLessThan(500 * 1024)
    expect(errors).toEqual([])
    await page.screenshot({ path: info.outputPath(`${name}-first.png`) })
    await page.screenshot({ path: info.outputPath(`${name}-full.png`), fullPage: true })
    await info.attach('design-metrics', { body: JSON.stringify({ loading, contrast }), contentType: 'application/json' })
    await context.close()
  })
}

test('keyboard focus, native disclosure and reset remain operable', async ({ page }) => {
  await page.goto('/')
  await page.keyboard.press('Tab')
  await expect(page.locator('.skip-link')).toBeFocused()
  await expect(page.locator('.skip-link')).toHaveCSS('outline-style', 'solid')
  await page.keyboard.press('Enter')
  await expect(page.locator('main')).toBeFocused()
  await page.locator('#sample-text').fill('편집한 입력')
  await page.getByRole('button', { name: '값 초기화' }).focus()
  await page.keyboard.press('Enter')
  await expect(page.locator('#sample-text')).toHaveValue('여백과 울림')
  await expect(page.getByRole('button', { name: '사용 불가' })).toBeDisabled()
  await page.locator('summary').focus()
  await page.keyboard.press('Enter')
  await expect(page.locator('details')).toHaveAttribute('open', '')
  const darkLink = page.locator('.dark-stage a')
  await darkLink.focus()
  await expect(darkLink).toHaveCSS('outline-width', '2px')
  await expect(darkLink).toHaveCSS('outline-color', 'rgb(244, 240, 232)')
})

test('reduced motion keeps all specimens and removes action transitions', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  await page.evaluate(() => document.fonts.ready)
  await expectReadable(page)
  await expect(page.locator('.dark-stage a')).toHaveCSS('transition-duration', '0s')
  expect(await page.evaluate(() => document.getAnimations().length)).toBe(0)
  await expect(page.locator('.two-line')).toHaveCount(3)
})

for (const width of [390, 1440]) {
  test(`delayed fonts at ${width}px: readable fallback and bounded layout shift`, async ({ page }, info) => {
    await page.setViewportSize({ width, height: 1000 })
    await observeLoading(page)
    await page.route('**/*.woff2', async route => {
      await new Promise(resolve => setTimeout(resolve, 1200))
      await route.continue()
    })
    await page.goto('/', { waitUntil: 'domcontentloaded' })
    await expect(page.locator('[data-font="display"]')).toBeVisible()
    await expectReadable(page)
    await page.evaluate(() => document.fonts.ready)
    await page.waitForTimeout(100)
    const loading = await metrics(page)
    expect(loading.cls).toBeLessThan(.1)
    await info.attach('delayed-font-metrics', { body: JSON.stringify(loading), contentType: 'application/json' })
  })
}

test('unavailable fonts retain readable mobile content and controls', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 })
  await page.route('**/*.woff2', route => route.abort())
  await page.goto('/')
  await page.evaluate(() => document.fonts.ready)
  await expectReadable(page)
  expect(await page.evaluate(() => [...document.fonts].filter(font => font.status === 'loaded').length)).toBe(0)
  await page.getByRole('button', { name: '값 초기화' }).focus()
  await expect(page.getByRole('button', { name: '값 초기화' })).toHaveCSS('outline-width', '2px')
})

test('200 percent text and long KO/EN copy reflow at narrow width', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  await page.evaluate(() => {
    document.documentElement.style.fontSize = '200%'
    document.querySelector('[data-font="korean"]')!.textContent = '아주 긴 한글 제목도 작은 화면 안에서 읽을 수 있어야 합니다'
    document.querySelector('.lab-body-en p.type-body')!.textContent = 'https://example.invalid/' + 'long-record-identity-'.repeat(12)
  })
  await expectReadable(page)
})
