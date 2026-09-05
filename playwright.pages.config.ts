import { defineConfig } from '@playwright/test'
import { buildTargets } from './config/build.ts'

const target = buildTargets.pagesPreview

export default defineConfig({
  testDir: './tests/pages',
  outputDir: 'test-results-pages',
  fullyParallel: true,
  workers: 2,
  timeout: 60_000,
  expect: { timeout: 15_000 },
  retries: 0,
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-pages-report', open: 'never' }],
    ['json', { outputFile: 'test-results-pages/results.json' }],
  ],
  use: {
    baseURL: new URL(target.base, target.canonicalOrigin).href,
    channel: process.env.CI ? undefined : 'msedge',
    headless: true,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  // No local webServer: these tests only request the real V2 Pages origin.
})
