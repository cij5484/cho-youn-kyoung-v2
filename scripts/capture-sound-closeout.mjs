/* global document, scrollTo */
import { chromium, expect } from '@playwright/test'
import { createServer } from 'vite'
import { writeFileSync } from 'node:fs'

const server = await createServer({ configFile: 'vite.sound.config.ts', server: { port: 4191, strictPort: true } })
await server.listen()
const browser = await chromium.launch(), results = []
try {
  for (const viewport of [{ width: 1440, height: 1000 }, { width: 390, height: 844 }]) {
    const context = await browser.newContext({ viewport }), page = await context.newPage(), errors = []
    page.on('pageerror', error => errors.push(error.message))
    await page.goto('http://127.0.0.1:4191/'); await page.waitForLoadState('networkidle')
    await page.evaluate(async () => {
      await document.fonts.ready
      await Promise.all([...document.images].map(image => image.decode().catch(() => {})))
      const scene = document.querySelector('.poster-scene')
      scrollTo(0, scene.offsetTop + scene.offsetHeight - scene.querySelector('.poster-stage').offsetHeight)
    })
    await expect.poll(() => page.locator('.poster-scene').evaluate(e => e.dataset.progress === e.dataset.targetProgress)).toBe(true)
    await expect(page.locator('.sound-comparison')).toHaveCount(0)
    await page.locator('.listen-trigger').click()
    await expect(page.locator('.sound-experience')).toHaveAttribute('data-audio-state', 'playing')
    await page.waitForTimeout(4500)
    await page.screenshot({ path: `evidence/p2i-closeout/${viewport.width}-canonical-playing.png` })
    const state = await page.locator('.sound-experience').evaluate(e => ({ ...e.dataset }))
    await page.locator('.listen-trigger').click(); await page.waitForTimeout(1500)
    const frame = await page.locator('.sound-experience').getAttribute('data-contact-frames')
    await page.waitForTimeout(400)
    await expect(page.locator('.sound-experience')).toHaveAttribute('data-contact-frames', frame)
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await expect(page.locator('.sound-experience')).toHaveAttribute('data-sound-static', 'true')
    await page.locator('.sound-surface').evaluate(el => el.scrollIntoView({ block: 'start' }))
    await expect(page.locator('.sound-static-contact')).toBeInViewport()
    await page.screenshot({ path: `evidence/p2i-closeout/${viewport.width}-canonical-reduced.png` })
    results.push({ viewport, state, errors, settledContactFrames: frame })
    expect(errors).toEqual([])
    await context.close()
  }
} finally { await browser.close(); await server.close() }
writeFileSync('evidence/p2i-closeout/canonical-capture.json', JSON.stringify(results, null, 2) + '\n')
console.log(results)
