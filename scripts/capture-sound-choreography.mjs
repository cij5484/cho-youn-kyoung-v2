// Run against an already running Sound Lab. Recordings are SILENT Playwright screen videos.
/* global window, document, requestAnimationFrame, scrollTo */
import { chromium, expect } from '@playwright/test'
import { mkdir, writeFile } from 'node:fs/promises'

const directory = 'evidence/p2i-choreography', baseURL = process.env.SOUND_LAB_URL ?? 'http://127.0.0.1:4179'
await mkdir(directory, { recursive: true })
const browser = await chromium.launch()
const results = []
try {
  for (const viewport of [{ width: 1440, height: 1000 }, { width: 390, height: 844 }]) {
    for (const variant of ['a', 'b1', 'b2']) {
      const id = `${viewport.width}-${variant}`
      const context = await browser.newContext({ viewport, baseURL, recordVideo: { dir: '.checkpoints/p2i-choreography/videos', size: viewport }, hasTouch: viewport.width < 640, isMobile: viewport.width < 640 })
      const page = await context.newPage(), errors = []
      page.on('pageerror', error => errors.push(error.message))
      await page.addInitScript(() => {
        window.p2iCost = { raf: 0, durations: [], intervals: [], longTasks: [], shifts: 0, prior: 0 }
        const original = requestAnimationFrame
        window.requestAnimationFrame = cb => original(time => {
          const c = window.p2iCost, start = performance.now()
          if (c.prior && time !== c.prior) c.intervals.push(time - c.prior)
          c.prior = time; c.raf++; cb(time); c.durations.push(performance.now() - start)
        })
        new PerformanceObserver(list => window.p2iCost.longTasks.push(...list.getEntries().map(e => e.duration))).observe({ type: 'longtask', buffered: true })
        new PerformanceObserver(list => { for (const e of list.getEntries()) if (!e.hadRecentInput) window.p2iCost.shifts += e.value }).observe({ type: 'layout-shift', buffered: true })
      })
      await page.goto(`/?compare=${variant==='a'?'a':'b'}&activity=${variant==='b1'?'medium':'bold'}&diagnostics=1`); await page.waitForLoadState('networkidle')
      await page.evaluate(async () => { await document.fonts.ready; await Promise.all([...document.images].map(i => i.decode().catch(() => {}))) })
      await page.locator('.sound-comparison').evaluate(el => { el.style.visibility = 'hidden' })
      await page.screenshot({ path: `${directory}/${id}-hero.png` })
      await page.locator('.sound-comparison').evaluate(el => { el.style.visibility = '' })
      await page.evaluate(() => { const s = document.querySelector('.poster-scene'); scrollTo(0, s.offsetTop + s.offsetHeight - s.querySelector('.poster-stage').offsetHeight) })
      await expect.poll(() => page.locator('.poster-scene').evaluate(e => e.dataset.progress === e.dataset.targetProgress)).toBe(true)
      const root = page.locator('.sound-experience'), stages = []
      async function measure(name, ms) {
        const initial = Number(await root.getAttribute('data-analysis-frames'))
        await page.evaluate(() => { window.p2iCost = { raf: 0, durations: [], intervals: [], longTasks: [], shifts: 0, prior: 0 } })
        await page.waitForTimeout(ms)
        stages.push(await page.evaluate(({ name, initial }) => {
          const c = window.p2iCost, r = document.querySelector('.sound-experience')
          const p95 = a => a.length ? [...a].sort((a, b) => a - b)[Math.floor((a.length - 1) * .95)] : null
          return { name, rafCallbacks: c.raf, visualUpdates: Number(r.dataset.analysisFrames) - initial, frameIntervalP95: p95(c.intervals), callbackP95: p95(c.durations), longTasks: c.longTasks, layoutShift: c.shifts, phase: r.dataset.audioState, contactFrames:Number(r.dataset.contactFrames||0), contactNodes:document.querySelector('.bow-contact')?.children.length||0 }
        }, { name, initial }))
      }
      await measure('idle', 800)
      await page.locator('.listen-trigger').click(); await expect(root).toHaveAttribute('data-audio-state', 'playing')
      await measure('playing', 4500)
      await page.screenshot({ path: `${directory}/${id}-playing.png` })
      if (variant !== 'a') {
        const area = await page.locator('.bow-contact').evaluate(el => ({ x: Math.max(0,Number(el.dataset.x) - 140), y: Math.max(0,Number(el.dataset.y) - 150), width: 280, height: 230 }))
        await page.screenshot({ path: `${directory}/${id}-contact-detail.png`, clip: area })
      }
      await page.waitForTimeout(1700)
      await page.locator('.listen-trigger').click(); await expect(root).toHaveAttribute('data-audio-state', 'paused')
      await expect(root).toHaveAttribute('data-audio-energy', '0.0000')
      await page.waitForTimeout(1100); await measure('settled-pause', 800)
      await page.screenshot({ path: `${directory}/${id}-paused.png` })
      await page.locator('.listen-trigger').click(); await expect(root).toHaveAttribute('data-audio-state', 'playing')
      await page.waitForTimeout(1700)
      await expect(root).toHaveAttribute('data-audio-state','ended',{timeout:23000})
      await page.waitForTimeout(1100);await page.screenshot({path:directory+'/'+id+'-ended.png'})
      await page.locator('.listen-trigger').click();await expect(root).toHaveAttribute('data-audio-state','playing')
      await page.waitForTimeout(1800)
      await page.evaluate(() => scrollTo(0, 0)); await expect(root).toHaveAttribute('data-audio-state', 'paused')
      await page.waitForTimeout(900); await measure('offscreen', 800)
      const video = page.video(); await context.close(); await video.saveAs(`${directory}/${id}-comparison-silent.webm`)
      results.push({ viewport, variant, errors, stages })
    }
  }
  for (const fixture of [
    { width: 320, height: 568, name: '320-en-b', path: '/en/?compare=b' },
    { width: 768, height: 1024, name: '768-b', path: '/?compare=b' },
    { width: 1920, height: 1080, name: '1920-b', path: '/?compare=b' },
    { width: 1440, height: 1000, name: '1440-editorial', path: '/?compare=b&violet=editorial', video: true },
    { width: 1440, height: 1000, name: '1440-ink', path: '/?compare=b&violet=ink', video: true },
    { width: 1440, height: 1000, name: '1440-extra-long', path: '/?compare=b&tail=extra-long', video: true },
    { width: 390, height: 844, name: '390-b-reduced', path: '/?compare=b', reduced: true },
  ]) {
    const viewport = { width: fixture.width, height: fixture.height }
    const context = await browser.newContext({ viewport, baseURL, reducedMotion: fixture.reduced ? 'reduce' : 'no-preference', ...(fixture.video ? { recordVideo: { dir: '.checkpoints/p2i-choreography/videos', size: viewport } } : {}) })
    const page = await context.newPage()
    await page.goto(`${fixture.path}&diagnostics=1`); await page.waitForLoadState('networkidle')
    await page.evaluate(async () => { await document.fonts.ready; await Promise.all([...document.images].map(i => i.decode().catch(() => {}))) })
    if (fixture.reduced) await page.locator('.listen-trigger').scrollIntoViewIfNeeded()
    else {
      await page.evaluate(() => { const s = document.querySelector('.poster-scene'); scrollTo(0, s.offsetTop + s.offsetHeight - s.querySelector('.poster-stage').offsetHeight) })
      await expect.poll(() => page.locator('.poster-scene').evaluate(e => e.dataset.progress === e.dataset.targetProgress)).toBe(true)
    }
    await page.locator('.listen-trigger').click(); await expect(page.locator('.sound-experience')).toHaveAttribute('data-audio-state', 'playing')
    await page.waitForTimeout(2600); await page.screenshot({ path: `${directory}/${fixture.name}.png` })
    if (fixture.video) await page.waitForTimeout(3500)
    const video = page.video(); await context.close()
    if (video) await video.saveAs(`${directory}/${fixture.name}-silent.webm`)
  }
  await writeFile(`${directory}/performance.json`, JSON.stringify({ environment: 'Windows headless Chromium; local development, unthrottled. Mobile emulation, not physical hardware. Sequential A/B samples, not a field performance guarantee.', browser: browser.version(), results }, null, 2) + '\n')
} finally { await browser.close() }
