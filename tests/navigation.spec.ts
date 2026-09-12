import { expect, test, type Page } from '@playwright/test'
import { buildTargets } from '../config/build.ts'

async function ready(page: Page, path = '/') {
  const response = await page.goto(path)
  expect(response?.headers()['x-robots-tag']).toBe('noindex, nofollow')
  await expect(page.getByRole('button', { name: 'MENU', exact: true })).toBeVisible()
  await page.evaluate(() => document.fonts.ready)
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow')
  await expect(page.locator('link[rel="canonical"], link[hreflang], meta[property^="og:"]')).toHaveCount(0)
}
async function openMenu(page: Page) {
  await page.getByRole('button', { name: 'MENU', exact: true }).click()
  await expect(page.locator('dialog')).toHaveAttribute('data-phase', 'open')
}
async function reflow(page: Page) {
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  const dialogOpen = await page.locator('dialog').evaluate(el => (el as HTMLDialogElement).open)
  const controls = await page.locator(dialogOpen ? 'dialog[open] a, dialog[open] button' : 'header a, header button').all()
  for (const control of controls) {
    const box = (await control.boundingBox())!
    expect(box.width).toBeGreaterThanOrEqual(44); expect(box.height).toBeGreaterThanOrEqual(44)
    expect(box.x).toBeGreaterThanOrEqual(0)
    expect(box.x + box.width).toBeLessThanOrEqual(await page.evaluate(() => innerWidth))
  }
}
async function freezeReveal(page: Page, time: number) {
  return page.locator('dialog').evaluate((el, at) => {
    const tracks = el.getAnimations({ subtree: true }).filter(a => a.id === 'editorial-menu-reveal')
    for (const track of tracks) { track.pause(); track.currentTime = at }
    return tracks.map(track => ({ duration: track.effect!.getTiming().duration, time: track.currentTime }))
  }, time)
}

for (const [name, width, height] of [
  ['small-mobile', 320, 800], ['mobile', 390, 844], ['tablet', 768, 1024],
  ['tablet-landscape', 1024, 768], ['desktop', 1440, 1000], ['wide', 1920, 1080],
] as const) {
  test(`bold ${name}: artist plus MENU only, stable scroll and opened menu`, async ({ browser }, info) => {
    const context = await browser.newContext({ baseURL: 'http://127.0.0.1:4176', viewport: { width, height }, hasTouch: width < 1120, isMobile: width < 1120 })
    const page = await context.newPage()
    const errors: string[] = []; page.on('pageerror', error => errors.push(error.message))
    await ready(page)
    await expect(page.locator('header nav, header .nav-languages, [data-editorial-item]')).toHaveCount(0)
    await expect(page.locator('header a')).toHaveCount(1)
    await reflow(page)
    const before = await page.locator('header').boundingBox()
    await page.screenshot({ path: info.outputPath(`bold-${name}-initial.png`) })
    await page.evaluate(() => scrollTo(0, innerHeight + 20))
    expect(await page.locator('header').boundingBox()).toEqual(before)
    const scroll = await page.evaluate(() => scrollY)
    await openMenu(page)
    await reflow(page)
    await page.screenshot({ path: info.outputPath(`bold-${name}-opened.png`) })
    if (width < 1120) {
      expect(await page.evaluate(() => matchMedia('(hover: hover)').matches)).toBe(false)
      await expect(page.locator('.menu-item-label').nth(1)).toHaveCSS('transform', 'none')
      await expect(page.locator('.menu-item-label').nth(1)).toHaveCSS('opacity', '1')
      for (const letter of await page.locator('.menu-letter').all()) await expect(letter).toHaveCSS('transform', 'none')
    }
    await page.getByRole('button', { name: '메뉴 닫기' }).click()
    await expect(page.locator('dialog')).not.toBeVisible()
    expect(await page.evaluate(() => scrollY)).toBe(scroll)
    await page.mouse.wheel(0, 180)
    await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(scroll)
    expect(errors).toEqual([])
    await context.close()
  })
}

test('trigger hover, opening intermediate, fully opened and item hover visual evidence', async ({ page }, info) => {
  await page.setViewportSize({ width: 1440, height: 1000 })
  await ready(page)
  const trigger = page.getByRole('button', { name: 'MENU', exact: true })
  await trigger.hover()
  await expect(trigger.locator('.trigger-copy')).toHaveCSS('transform', 'matrix(1, 0, 0, 1, 3, 0)')
  await expect(trigger).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)')
  await page.screenshot({ path: info.outputPath('trigger-hover.png') })
  await trigger.click()
  const tracks = await freezeReveal(page, 180)
  expect(tracks).toHaveLength(13)
  expect(tracks.every(track => track.duration === 680 && track.time === 180)).toBe(true)
  const keys = await page.locator('.menu-key').evaluateAll(items => items.map(el => getComputedStyle(el).transform))
  expect(new Set(keys).size).toBeGreaterThan(1)
  await expect(page.locator('.menu-content')).toHaveAttribute('inert', '')
  await page.screenshot({ path: info.outputPath('opening-180ms.png') })
  await page.locator('dialog').evaluate(el => el.getAnimations({ subtree: true }).filter(a => a.id === 'editorial-menu-reveal').forEach(a => a.play()))
  await expect(page.locator('dialog')).toHaveAttribute('data-phase', 'open')
  await page.mouse.move(5, 900)
  await page.screenshot({ path: info.outputPath('fully-opened.png') })
  await page.getByRole('link', { name: 'WORKS', exact: true }).hover()
  await expect(page.locator('.menu-item-label').nth(1).locator('.menu-letter').first()).toHaveCSS('transform', 'matrix(1, 0, 0, 1, 3, 7)')
  await expect(page.locator('.menu-item-label').nth(1)).toHaveCSS('color', 'rgb(23, 23, 21)')
  await expect(page.locator('.menu-item-label').nth(2)).toHaveCSS('opacity', '1')
  const contrast = await page.locator('dialog .menu-item-label, dialog .nav-index, dialog .menu-toggle, dialog .nav-languages a').evaluateAll(elements => {
    const rgb = (text: string) => text.match(/[\d.]+/g)!.slice(0, 3).map(Number)
    const luminance = (channels: number[]) => channels.map(v => v / 255).map(v => v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4)
      .reduce((sum, v, i) => sum + v * [.2126, .7152, .0722][i], 0)
    return elements.map(el => {
      const material = getComputedStyle(el.closest('.menu-key')!).backgroundColor
      const alpha = Number(material.match(/[\d.]+/g)?.[3] ?? 1)
      // Worst case behind the translucent ivory is black, not the uncomposited tint color.
      const background = rgb(material).map(channel => channel * alpha)
      const style = getComputedStyle(el), opacity = Number(style.opacity)
      const foreground = rgb(style.color).map((value, i) => value * opacity + background[i] * (1 - opacity))
      const a = luminance(foreground), b = luminance(background)
      return { ratio: (Math.max(a, b) + .05) / (Math.min(a, b) + .05), minimum: parseFloat(style.fontSize) >= 24 ? 3 : 4.5 }
    })
  })
  for (const item of contrast) expect(item.ratio).toBeGreaterThanOrEqual(item.minimum)
  await page.screenshot({ path: info.outputPath('menu-item-hover.png') })
  await page.getByRole('link', { name: 'MEDIA', exact: true }).hover()
  await expect(page.locator('.menu-item-label').nth(2).locator('.menu-letter').last()).toHaveCSS('transform', 'matrix(1, 0, 0, 1, 3, 7)')
  await page.screenshot({ path: info.outputPath('media-letter-slip.png') })
  await page.getByRole('button', { name: '메뉴 닫기' }).hover()
  await expect(page.locator('dialog .trigger-copy')).toHaveCSS('transform', 'matrix(1, 0, 0, 1, 3, 0)')
  await page.screenshot({ path: info.outputPath('close-trigger-hover.png') })
  await info.attach('reveal-timeline', { body: JSON.stringify({ duration: 680, evidenceTime: 180, keys, tracks, contrast }), contentType: 'application/json' })
})

test(`bold: opening and closing reverse at the current time without visual resets`, async ({ page }, info) => {
  await ready(page)
  await page.getByRole('button', { name: 'MENU', exact: true }).click()
  await freezeReveal(page, 210)
  const reverse = () => page.locator('dialog').evaluate(el => {
    const tracks = el.getAnimations({ subtree: true }).filter(a => a.id === 'editorial-menu-reveal')
    const keys = [...el.querySelectorAll('.menu-key')]
    const before = { time: tracks[0].currentTime, transforms: keys.map(key => getComputedStyle(key).transform) }
    el.querySelector<HTMLButtonElement>('.menu-toggle')!.click()
    return { before, after: { time: tracks[0].currentTime, transforms: keys.map(key => getComputedStyle(key).transform) }, rates: tracks.map(a => a.playbackRate) }
  })
  const closing = await reverse()
  expect(closing.after).toEqual(closing.before); expect(closing.rates.every(rate => rate === -1.3)).toBe(true)
  await freezeReveal(page, 150)
  await expect(page.locator('dialog')).toHaveAttribute('data-phase', 'closing')
  await page.screenshot({ path: info.outputPath(`bold-closing-150ms.png`) })
  const opening = await reverse()
  expect(opening.after).toEqual(opening.before); expect(opening.rates.every(rate => rate === 1)).toBe(true)
  await expect(page.locator('dialog')).toHaveAttribute('data-phase', 'open')
  expect(await page.locator('dialog').evaluate(el => el.getAnimations({ subtree: true }).filter(a => a.id === 'editorial-menu-reveal').length)).toBe(0)
  await info.attach('interrupt-continuity', { body: JSON.stringify({ closing, opening }), contentType: 'application/json' })
})

for (const width of [390, 1440]) test(`${width}: keyboard trap, visible focus, Esc reverse and restore`, async ({ page }) => {
  await page.setViewportSize({ width, height: 1000 })
  await ready(page)
  await page.keyboard.press('Tab')
  await expect(page.getByRole('link', { name: '본문으로 이동' })).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(page.locator('main')).toBeFocused()
  const trigger = page.getByRole('button', { name: 'MENU', exact: true })
  await trigger.focus(); await page.keyboard.press('Enter')
  await expect(page.locator('dialog')).toHaveAttribute('data-phase', 'open')
  const close = page.getByRole('button', { name: '메뉴 닫기' })
  await expect(close).toBeFocused(); await expect(close).toHaveCSS('outline-style', 'solid')
  await expect(trigger).toHaveAttribute('aria-expanded', 'true')
  for (let i = 0; i < 12; i++) {
    await page.keyboard.press('Tab')
    expect(await page.evaluate(() => !!document.activeElement?.closest('dialog'))).toBe(true)
  }
  await close.focus(); await page.keyboard.press('Shift+Tab')
  await expect(page.getByRole('link', { name: 'CONTACT', exact: true })).toBeFocused()
  await page.keyboard.press('Escape')
  await expect(page.locator('dialog')).not.toBeVisible()
  await expect(trigger).toBeFocused(); await expect(trigger).toHaveAttribute('aria-expanded', 'false')
  expect(await page.evaluate(() => document.documentElement.style.overflow)).toBe('')
})

for (const [name, base] of Object.entries(buildTargets).map(([name, target]) => [name, target.base])) {
  test(`${name}: same detail counterpart, active section, clean path, history and refresh`, async ({ page }) => {
    await ready(page, `${base}album/test-album/?source=lab#sample`)
    await openMenu(page)
    await expect(page.locator('a[aria-current="location"] .menu-item-label')).toHaveText('WORKS')
    await expect(page.getByRole('link', { name: 'English', exact: true })).toHaveAttribute('href', `${base}en/album/test-album/`)
    await page.getByRole('link', { name: 'English', exact: true }).click()
    await expect(page).toHaveURL(`http://127.0.0.1:4176${base}en/album/test-album/`)
    await expect(page.locator('html')).toHaveAttribute('lang', 'en')
    await expect(page.locator('main')).toBeFocused(); await expect(page.locator('dialog')).not.toBeVisible()
    await page.reload(); await page.goBack(); await expect(page.locator('html')).toHaveAttribute('lang', 'ko')
    await page.goForward(); await expect(page.locator('html')).toHaveAttribute('lang', 'en')
    await openMenu(page)
    await page.getByRole('link', { name: 'CONTACT', exact: true }).click()
    await expect(page).toHaveURL(`http://127.0.0.1:4176${base}en/contact/`)
    await openMenu(page)
    await expect(page.locator('.menu-links a[aria-current="page"] .menu-item-label')).toHaveText('CONTACT')
  })
}

test('mobile performance counterpart and page activation close immediately, then focus main', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await ready(page, '/performance/test-performance/'); await openMenu(page)
  await page.getByRole('link', { name: 'English', exact: true }).click()
  await expect(page).toHaveURL(/\/en\/performance\/test-performance\/$/)
  await expect(page.locator('dialog')).not.toBeVisible(); await expect(page.locator('main')).toBeFocused()
  await openMenu(page); await page.getByRole('link', { name: 'MEDIA', exact: true }).click()
  await expect(page).toHaveURL(/\/en\/media\/$/); await expect(page.locator('main')).toBeFocused()
})

test('missing/draft English is unavailable without a fabricated destination', async ({ page }) => {
  for (const scenario of ['missing', 'draft', 'machine']) {
    await ready(page, `/album/test-album/?translation=${scenario}`); await openMenu(page)
    await expect(page.getByRole('button', { name: 'English — translation unavailable' })).toBeDisabled()
    await expect(page.getByRole('button', { name: 'English — translation unavailable' })).toHaveAttribute('title', 'English translation unavailable')
    await expect(page.getByRole('link', { name: 'English', exact: true })).toHaveCount(0)
    await expect(page.locator('html')).toHaveAttribute('lang', 'ko')
  }
})

test('reduced motion uses immediate accessible states and stationary hover/focus labels', async ({ page }, info) => {
  await page.emulateMedia({ reducedMotion: 'reduce' }); await ready(page); await openMenu(page)
  expect(await page.locator('dialog').evaluate(el => el.getAnimations({ subtree: true }).length)).toBe(0)
  await page.getByRole('link', { name: 'WORKS', exact: true }).hover()
  await expect(page.locator('.menu-item-label').nth(1)).toHaveCSS('transform', 'none')
  for (const letter of await page.locator('.menu-letter').all()) {
    await expect(letter).toHaveCSS('transform', 'none'); await expect(letter).toHaveCSS('transition-delay', '0s')
  }
  await page.screenshot({ path: info.outputPath('reduced-motion.png') })
  await page.keyboard.press('Escape'); await expect(page.locator('dialog')).not.toBeVisible()
  await expect(page.getByRole('button', { name: 'MENU', exact: true })).toBeFocused()
})

test('resize preserves the same modal and focus; 200% text and short landscape reflow', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 }); await ready(page); await openMenu(page)
  await page.getByRole('link', { name: 'WORKS', exact: true }).focus()
  await page.setViewportSize({ width: 1440, height: 1000 })
  await expect(page.getByRole('link', { name: 'WORKS', exact: true })).toBeFocused()
  await page.setViewportSize({ width: 320, height: 568 })
  await page.evaluate(() => document.documentElement.style.fontSize = '200%')
  await reflow(page)
  expect(await page.locator('.menu-item-mask').evaluateAll(items => items.every(el => el.scrollWidth <= el.clientWidth + 1))).toBe(true)
  await page.getByRole('link', { name: 'English', exact: true }).scrollIntoViewIfNeeded()
  await expect(page.getByRole('link', { name: 'English', exact: true })).toBeInViewport()
  await page.keyboard.press('Escape'); await expect(page.locator('dialog')).not.toBeVisible()
  await expect(page.getByRole('button', { name: 'MENU', exact: true })).toBeFocused()
  await page.setViewportSize({ width: 1440, height: 400 }); await openMenu(page); await reflow(page)
  expect(await page.locator('dialog').evaluate(el => el.scrollTop)).toBe(0)
})

test('HOME counterpart with trailing slash retains artist and MENU under both bases', async ({ page }) => {
  for (const base of ['/', buildTargets.pagesPreview.base]) {
    await ready(page, base); await openMenu(page)
    await page.getByRole('link', { name: 'English', exact: true }).click()
    await expect(page).toHaveURL(`http://127.0.0.1:4176${base}en/`)
    await page.reload(); await expect(page.locator('header nav')).toHaveCount(0)
    await openMenu(page); await page.getByRole('link', { name: '한국어', exact: true }).click()
    await expect(page).toHaveURL(`http://127.0.0.1:4176${base}`)
  }
})

test('Esc during entry reverses, repeated Esc cannot reopen, rapid reopen is stable', async ({ page }) => {
  await ready(page)
  for (let i = 0; i < 3; i++) {
    await page.getByRole('button', { name: 'MENU', exact: true }).click()
    await freezeReveal(page, 160)
    await page.keyboard.press('Tab')
    await expect(page.getByRole('button', { name: '메뉴 닫기' })).toBeFocused()
    await page.keyboard.press('Escape'); await page.keyboard.press('Escape')
    await expect(page.locator('dialog')).not.toBeVisible()
    expect(await page.evaluate(() => document.documentElement.style.overflow)).toBe('')
  }
  await openMenu(page)
})

test('live reduced-motion changes settle to the requested endpoint and release scroll', async ({ page }) => {
  await ready(page); await page.getByRole('button', { name: 'MENU', exact: true }).click()
  await freezeReveal(page, 150); await page.emulateMedia({ reducedMotion: 'reduce' })
  await expect(page.locator('dialog')).toHaveAttribute('data-phase', 'open')
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.getByRole('button', { name: '메뉴 닫기' }).click(); await freezeReveal(page, 240)
  await page.emulateMedia({ reducedMotion: 'reduce' }); await expect(page.locator('dialog')).not.toBeVisible()
  expect(await page.evaluate(() => document.documentElement.style.overflow)).toBe('')
})

test('blocked fonts and unavailable Web Animations keep the menu functional', async ({ page }) => {
  await page.route('**/*.woff2', route => route.abort())
  await page.addInitScript(() => Object.defineProperty(Element.prototype, 'animate', { value: undefined, configurable: true }))
  await page.setViewportSize({ width: 320, height: 800 }); await ready(page); await openMenu(page); await reflow(page)
  await page.getByRole('link', { name: 'WORKS', exact: true }).click()
  await expect(page).toHaveURL(/\/works\/$/); await expect(page.locator('main')).toBeFocused()
})

test('selected HOME uses type and index emphasis with one structural rule and no extra underline', async ({ page }, info) => {
  await page.setViewportSize({ width: 1440, height: 1000 }); await ready(page); await openMenu(page)
  await page.mouse.move(5, 900)
  const home = page.getByRole('link', { name: 'HOME', exact: true })
  await expect(home).toHaveAttribute('aria-current', 'page')
  await expect(home).toHaveCSS('text-decoration-line', 'none')
  await expect(home.locator('.menu-item-label')).toHaveCSS('text-decoration-line', 'none')
  await expect(home.locator('.menu-item-label')).toHaveCSS('font-weight', '500')
  await expect(home.locator('.nav-index')).toHaveCSS('font-weight', '600')
  await expect(home.locator('.nav-index')).toHaveCSS('color', 'rgb(23, 23, 21)')
  expect(await home.evaluate(el => getComputedStyle(el, '::after').content)).toBe('none')
  await expect(home.locator('.menu-row-rule')).toHaveCount(1)
  await expect(home.locator('.menu-row-rule')).toHaveCSS('height', '1px')
  await expect(page.getByRole('link', { name: 'WORKS', exact: true }).locator('.menu-item-label')).toHaveCSS('font-weight', '400')
  await page.screenshot({ path: info.outputPath('selected-home.png') })
})

test(`bold: Letter Slip alternates deterministically, preserves link geometry and returns to the exact baseline`, async ({ page }, info) => {
  await ready(page); await openMenu(page); await page.mouse.move(5, 700)
  const link = page.getByRole('link', { name: 'WORKS', exact: true }), letters = link.locator('.menu-letter')
  const baseline = await letters.evaluateAll(items => items.map(el => ({ x: el.getBoundingClientRect().x, y: el.getBoundingClientRect().y })))
  const linkBox = await link.boundingBox()
  const x = 3, y = 7
  const expected = Array.from({ length: 5 }, (_, i) => `matrix(1, 0, 0, 1, ${x}, ${i % 2 ? -y : y})`)
  for (let repeat = 0; repeat < 2; repeat++) {
    await link.hover()
    await expect.poll(() => letters.evaluateAll(items => items.map(el => getComputedStyle(el).transform))).toEqual(expected)
    expect(await link.boundingBox()).toEqual(linkBox)
    expect(await letters.evaluateAll(items => items.map(el => getComputedStyle(el).transitionDelay))).toEqual(['0s', '0.02s', '0.04s', '0.06s', '0.08s'])
    await page.mouse.move(5, 700)
    await expect.poll(() => letters.evaluateAll(items => items.map(el => getComputedStyle(el).transform))).toEqual(Array(5).fill('none'))
    expect(await letters.evaluateAll(items => items.map(el => ({ x: el.getBoundingClientRect().x, y: el.getBoundingClientRect().y })))).toEqual(baseline)
  }
  await page.getByRole('button', { name: '메뉴 닫기' }).focus()
  for (let i = 0; i < 4; i++) await page.keyboard.press('Tab')
  await expect(link).toBeFocused(); await expect(link).toHaveCSS('outline-style', 'solid')
  await expect(link).toHaveAccessibleName('WORKS')
  expect(await letters.evaluateAll(items => items.every(el => el.closest('[aria-hidden="true"]')))).toBe(true)
  await info.attach('letter-slip', { body: JSON.stringify({ motion: 'bold', x, alternatingY: [y, -y], duration: 300, stagger: 20, repeat: 2, baselineRestored: true, accessibleName: 'WORKS' }), contentType: 'application/json' })
})

test('trigger hover and focus never open the menu; rapid letter hover interruption settles cleanly', async ({ page }) => {
  await ready(page)
  const trigger = page.getByRole('button', { name: 'MENU', exact: true })
  await trigger.hover(); await expect(trigger.locator('.trigger-copy')).toHaveCSS('transform', 'matrix(1, 0, 0, 1, 3, 0)')
  await page.waitForTimeout(700) // Observe beyond the complete reveal duration: hover must never open.
  await expect(page.locator('dialog')).not.toBeVisible()
  expect(await trigger.evaluate(el => getComputedStyle(el, '::after').content)).toBe('none')
  await trigger.focus(); await expect(page.locator('dialog')).not.toBeVisible()
  await page.keyboard.press('Space'); await expect(page.locator('dialog')).toHaveAttribute('data-phase', 'open')
  const works = page.getByRole('link', { name: 'WORKS', exact: true })
  for (let i = 0; i < 3; i++) { await works.hover(); await page.mouse.move(5, 700) }
  await expect.poll(() => works.locator('.menu-letter').evaluateAll(items => items.every(el => getComputedStyle(el).transform === 'none'))).toBe(true)
  await works.click(); await expect(page).toHaveURL(/\/works\/$/); await expect(page.locator('main')).toBeFocused()
})

test(`bold: real-time browser recording preserves opening, hover return, closing and immediate interruption`, async ({ browser }, info) => {
  const context = await browser.newContext({ baseURL: 'http://127.0.0.1:4176', viewport: { width: 1440, height: 1000 }, recordVideo: { dir: info.outputPath('motion'), size: { width: 1440, height: 1000 } } })
  const page = await context.newPage(), video = page.video()!
  await ready(page); await page.waitForTimeout(350)
  await page.locator('dialog').evaluate(el => {
    const events: { phase: string; at: number }[] = []
    const observer = new MutationObserver(() => {
      const phase = (el as HTMLElement).dataset.phase!
      if (events.at(-1)?.phase !== phase) events.push({ phase, at: performance.now() })
      el.setAttribute('data-observed-timing', JSON.stringify(events))
    })
    observer.observe(el, { attributes: true, attributeFilter: ['data-phase'] })
  })
  await page.getByRole('button', { name: 'MENU', exact: true }).hover(); await page.waitForTimeout(350)
  await openMenu(page); await page.mouse.move(5, 900); await page.waitForTimeout(300)
  await page.getByRole('link', { name: 'WORKS', exact: true }).hover(); await page.waitForTimeout(500)
  await page.getByRole('link', { name: 'MEDIA', exact: true }).hover(); await page.waitForTimeout(500)
  await page.mouse.move(5, 900); await page.waitForTimeout(400)
  await page.getByRole('button', { name: '메뉴 닫기' }).hover(); await page.waitForTimeout(300)
  await page.getByRole('button', { name: '메뉴 닫기' }).click(); await expect(page.locator('dialog')).not.toBeVisible()
  await page.waitForTimeout(350)
  // Observe and activate in one browser frame. Locator.click() waits for stability, which a closing
  // trigger cannot promise; the short reverse window could finish before that automation wait resolves.
  const reversal = page.locator('dialog').evaluate(el => new Promise<{
    openingAt: number; closingAt: number; reopenedAt: number; duration: number; sameTracks: boolean
  }>((resolve, reject) => {
    const dialog = el as HTMLDialogElement
    let openingAt = 0, closingAt = 0, tracks: Animation[] = []
    let stage: 'await-opening' | 'await-closing' | 'await-reopening' = 'await-opening'
    const observe = () => {
      const current = dialog.getAnimations({ subtree: true }).filter(a => a.id === 'editorial-menu-reveal')
      const lead = current[0], time = Number(lead?.currentTime ?? 0)
      const duration = Number(lead?.effect?.getTiming().duration ?? 0)
      const phase = dialog.dataset.phase
      const fail = (message: string) => reject(new Error(message))
      if (stage === 'await-opening' && phase === 'closed') { requestAnimationFrame(observe); return }
      if (!dialog.open || !lead || !(time >= 0 && time < duration)) { fail(`Missed in-progress ${stage}: ${phase} / ${time}`); return }
      const activateVisibleToggle = () => {
        const button = dialog.querySelector<HTMLButtonElement>('.menu-toggle')!, box = button.getBoundingClientRect()
        const hit = document.elementFromPoint(box.x + box.width / 2, box.y + box.height / 2)
        if (!button.checkVisibility() || button.disabled || !hit || !button.contains(hit)) throw new Error('Reverse trigger is not visibly hit-testable')
        // Real DOM activation through the public button handler; no controller call, force click,
        // paused/seeked animation, playback-rate override or synthetic state mutation.
        button.click()
      }
      try {
        if (stage === 'await-opening' && phase === 'opening' && lead.playState === 'running' && !lead.pending && time >= duration * .3) {
          if (lead.playbackRate !== 1) throw new Error('Opening did not run forward')
          openingAt = time; tracks = current
          activateVisibleToggle()
          if (dialog.dataset.phase !== 'closing') throw new Error('Opening was not interrupted by close')
          stage = 'await-closing'
        } else if (stage === 'await-closing' && phase === 'closing' && lead.playState === 'running' && !lead.pending && time < openingAt - duration * .04) {
          if (!(lead.playbackRate < 0 && time > 0)) throw new Error('Close did not genuinely advance in reverse')
          closingAt = time
          activateVisibleToggle()
          const after = dialog.getAnimations({ subtree: true }).filter(a => a.id === 'editorial-menu-reveal')
          if (dialog.dataset.phase !== 'opening' || after.length !== tracks.length || after.some((track, i) => track !== tracks[i])) throw new Error('Reopen replaced the live timeline')
          if (Math.abs(Number(after[0].currentTime) - closingAt) > 1) throw new Error('Reopen reset the current pose')
          stage = 'await-reopening'
        } else if (stage === 'await-reopening' && phase === 'opening' && !lead.pending && time > closingAt + duration * .04) {
          if (lead.playbackRate !== 1 || lead.playState !== 'running') throw new Error('Reopen did not advance forward')
          resolve({ openingAt, closingAt, reopenedAt: time, duration, sameTracks: current.every((track, i) => track === tracks[i]) }); return
        }
      } catch (error) { reject(error); return }
      requestAnimationFrame(observe)
    }
    requestAnimationFrame(observe)
  }))
  await page.getByRole('button', { name: 'MENU', exact: true }).click()
  const interruption = await reversal
  expect(interruption.openingAt).toBeLessThan(interruption.duration)
  expect(interruption.closingAt).toBeGreaterThan(0)
  expect(interruption.closingAt).toBeLessThan(interruption.openingAt)
  expect(interruption.reopenedAt).toBeGreaterThan(interruption.closingAt)
  expect(interruption.sameTracks).toBe(true)
  await expect(page.locator('dialog')).toHaveAttribute('data-phase', 'open')
  await page.waitForTimeout(350); await page.keyboard.press('Escape'); await expect(page.locator('dialog')).not.toBeVisible()
  await page.waitForTimeout(350)
  const events: { phase: string; at: number }[] = JSON.parse((await page.locator('dialog').getAttribute('data-observed-timing'))!)
  const openedIn = events.find(event => event.phase === 'open')!.at - events.find(event => event.phase === 'opening')!.at
  const closedIn = events.find(event => event.phase === 'closed')!.at - events.find(event => event.phase === 'closing')!.at
  expect(openedIn).toBeGreaterThanOrEqual(630); expect(openedIn).toBeLessThan(1000)
  expect(closedIn).toBeGreaterThanOrEqual(480); expect(closedIn).toBeLessThan(850)
  await info.attach('real-time-events', { body: JSON.stringify({ motion: 'bold', events, openedIn, closedIn, interruption, note: 'Native browser playback at normal speed. In-progress reversals use hit-tested DOM button activation in the observation frame; normal pointer and Escape dismissal remain exercised. No paused/retimed animation in the video.' }), contentType: 'application/json' })
  await context.close()
  await video.saveAs(info.outputPath(`bold-real-time.webm`))
  await info.attach('real-time-motion', { path: info.outputPath(`bold-real-time.webm`), contentType: 'video/webm' })
})

test('compact piano keys open independently with unskewed type and preserved Letter Slip', async ({ page }, info) => {
  await page.setViewportSize({ width: 1440, height: 1000 }); await ready(page)
  const pageBackground = await page.locator('html').evaluate(el => getComputedStyle(el).backgroundColor)
  const trigger = page.getByRole('button', { name: 'MENU', exact: true })
  await trigger.hover(); await expect(trigger.locator('.trigger-copy')).toHaveCSS('transform', 'matrix(1, 0, 0, 1, 3, 0)')
  await expect(page.locator('dialog')).not.toBeVisible()
  await page.screenshot({ path: info.outputPath('bold-trigger-hover.png') })
  await trigger.click(); const tracks = await freezeReveal(page, 180)
  expect(tracks).toHaveLength(13); expect(tracks.every(track => track.duration === 680)).toBe(true)
  const keys = await page.locator('.menu-key').evaluateAll(items => items.map(el => getComputedStyle(el).transform))
  expect(keys).toHaveLength(6); expect(new Set(keys).size).toBeGreaterThan(1)
  await expect(page.locator('dialog')).toHaveCSS('overflow-x', 'hidden')
  await expect(page.locator('dialog')).toHaveCSS('scrollbar-width', 'none')
  await page.screenshot({ path: info.outputPath('bold-opening-180ms.png') })
  await page.locator('dialog').evaluate(el => el.getAnimations({ subtree: true }).filter(a => a.id === 'editorial-menu-reveal').forEach(a => a.play()))
  await expect(page.locator('dialog')).toHaveAttribute('data-phase', 'open')
  await page.mouse.move(5, 900); await page.screenshot({ path: info.outputPath('bold-fully-opened.png') })
  await expect(page.locator('dialog')).toHaveAccessibleName('주요 메뉴')
  await expect(page.locator('.menu-surface, .menu-intro, .menu-bottom')).toHaveCount(0)
  await expect(page.locator('dialog .nav-signature')).toHaveCount(0)
  const bounds = (await page.locator('dialog').boundingBox())!
  const headerControl = (await page.locator('dialog .menu-toggle').boundingBox())!
  expect(headerControl.y + headerControl.height).toBeLessThanOrEqual(bounds.y)
  await expect(page.locator('.menu-top')).not.toHaveClass(/menu-key/)
  expect(bounds.width).toBeLessThan(1440 / 2); expect(bounds.height).toBeLessThan(1000)
  expect(await page.locator('html').evaluate(el => getComputedStyle(el).backgroundColor)).toBe(pageBackground)
  const preferences = (await page.locator('.menu-preferences').boundingBox())!
  expect(preferences.y + preferences.height).toBeLessThanOrEqual((await page.locator('.menu-links').boundingBox())!.y)
  const home = page.getByRole('link', { name: 'HOME', exact: true })
  await expect(home.locator('.menu-item-label')).toHaveCSS('font-weight', '500')
  await expect(home.locator('.menu-item-label')).toHaveCSS('text-decoration-line', 'none')
  for (const label of ['WORKS', 'MEDIA']) {
    await page.getByRole('link', { name: label, exact: true }).hover()
    await expect(page.getByRole('link', { name: label, exact: true }).locator('.menu-letter').last()).toHaveCSS('transform', 'matrix(1, 0, 0, 1, 3, 7)')
    await page.screenshot({ path: info.outputPath(`bold-${label.toLowerCase()}-letter-slip.png`) })
  }
  await info.attach('compact-reveal', { body: JSON.stringify({ duration: 680, sampledAt: 180, tracks: tracks.length, keys, bounds, typeSkew: 0 }), contentType: 'application/json' })
})

test('Stale Refined URL cannot select a mode; canonical Bold preserves keyboard, counterpart and live reduced motion', async ({ page }, info) => {
  await page.setViewportSize({ width: 1440, height: 1000 }); await ready(page, '/album/test-album/?motion=refined')
  await expect(page.getByRole('button', { name: /^(Refined|Bold)$/ })).toHaveCount(0)
  await expect(page.locator('[data-menu-motion]')).toHaveCount(0)
  await expect(page.locator('dialog')).toHaveCSS('--letter-slip-distance', '7px')
  const trigger = page.getByRole('button', { name: 'MENU', exact: true })
  await trigger.focus(); await page.keyboard.press('Enter')
  await expect(page.locator('dialog')).toHaveAttribute('data-phase', 'open')
  await page.keyboard.press('Shift+Tab'); await expect(page.getByRole('link', { name: 'CONTACT', exact: true })).toBeFocused()
  await page.keyboard.press('Tab'); await expect(page.getByRole('button', { name: '메뉴 닫기' })).toBeFocused()
  await page.keyboard.press('Tab'); await expect(page.getByRole('link', { name: '한국어', exact: true })).toBeFocused()
  await expect(page.getByRole('link', { name: '한국어', exact: true })).toHaveCSS('outline-style', 'solid')
  await page.getByRole('link', { name: 'English', exact: true }).click()
  await expect(page).toHaveURL('http://127.0.0.1:4176/en/album/test-album/')
  await expect(page.locator('main')).toBeFocused(); await expect(page.locator('[data-menu-motion]')).toHaveCount(0)
  await trigger.click(); const tracks = await freezeReveal(page, 180)
  expect(tracks).toHaveLength(13); expect(tracks.every(track => track.duration === 680)).toBe(true)
  expect(new Set(await page.locator('.menu-key').evaluateAll(items => items.map(el => getComputedStyle(el).transform))).size).toBeGreaterThan(1)
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await expect(page.locator('dialog')).toHaveAttribute('data-phase', 'open')
  await page.getByRole('link', { name: 'WORKS', exact: true }).hover()
  for (const letter of await page.locator('.menu-letter').all()) await expect(letter).toHaveCSS('transform', 'none')
  expect(await page.locator('dialog').evaluate(el => el.getAnimations({ subtree: true }).length)).toBe(0)
  await page.screenshot({ path: info.outputPath('bold-reduced-motion.png') })
  await page.keyboard.press('Escape'); await expect(page.locator('dialog')).not.toBeVisible()
  await expect(trigger).toBeFocused(); expect(await page.evaluate(() => document.documentElement.style.overflow)).toBe('')
})
