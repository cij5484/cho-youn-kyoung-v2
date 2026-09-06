import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests', testMatch: 'design-system.spec.ts',
  fullyParallel: true, workers: 2, timeout: 30_000, retries: 0,
  outputDir: 'test-results/design-system',
  reporter: [['list'], ['json', { outputFile: 'test-results/design-system-results.json' }]],
  use: { baseURL: 'http://127.0.0.1:4175', headless: true, screenshot: 'only-on-failure', trace: 'retain-on-failure' },
  webServer: { command: 'npm run dev:design-system', url: 'http://127.0.0.1:4175', reuseExistingServer: false, timeout: 15_000 },
})
