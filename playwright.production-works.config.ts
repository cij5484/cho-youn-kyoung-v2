import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests', testMatch: 'production-works.spec.ts',
  workers: 1, retries: 0, timeout: 30_000,
  outputDir: 'test-results/production-works',
  reporter: [['list'], ['json', { outputFile: 'test-results/production-works/results.json' }]],
  use: { baseURL: 'http://127.0.0.1:4192', headless: true, trace: 'retain-on-failure', screenshot: 'only-on-failure' },
  projects: ['chromium', 'webkit'].flatMap(browserName => [
    { name: `${browserName}-desktop`, use: { browserName: browserName as 'chromium' | 'webkit', viewport: { width: 1440, height: 1000 } } },
    { name: `${browserName}-mobile`, use: { browserName: browserName as 'chromium' | 'webkit', viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true } },
  ]),
  webServer: { command: 'node scripts/static-spike-server.mjs production 4192', url: 'http://127.0.0.1:4192/', reuseExistingServer: false, timeout: 15_000 },
})
