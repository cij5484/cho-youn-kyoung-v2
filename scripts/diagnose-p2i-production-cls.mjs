/* global window, document */
import { chromium } from '@playwright/test'
import { writeFileSync } from 'node:fs'
const browser = await chromium.launch(), results = []
try {
  for (const path of ['/', '/works', '/en/works']) {
    const context = await browser.newContext({ viewport: { width: 390, height: 1000 } }), page = await context.newPage()
    await page.addInitScript(() => {
      window.shifts = []
      new PerformanceObserver(list => { for (const entry of list.getEntries()) if (!entry.hadRecentInput) window.shifts.push({ value: entry.value, sources: entry.sources.map(s => ({ node: s.node?.className, previous: s.previousRect, current: s.currentRect })) }) }).observe({ type: 'layout-shift', buffered: true })
    })
    await page.route('**/*.woff2', async route => { await new Promise(r => setTimeout(r, 1200)); await route.continue() })
    const response = await page.goto(`http://127.0.0.1:4173${path}`, { waitUntil: 'networkidle' })
    await page.evaluate(() => document.fonts.ready); await page.waitForTimeout(100)
    results.push({ path, status: response.status(), ...await page.evaluate(() => ({ shifts: window.shifts, cls: window.shifts.reduce((sum, e) => sum + e.value, 0), hasLabMasthead: !!document.querySelector('.lab-masthead'), hasComparison: !!document.querySelector('.sound-comparison') })) })
    await context.close()
  }
} finally { await browser.close() }
writeFileSync('evidence/p2i-closeout/production-cls.json', JSON.stringify({ scope: 'Current neutral production artifacts; does not claim future HOME font behavior', results }, null, 2) + '\n')
console.log(results)
