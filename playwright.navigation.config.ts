import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests', testMatch: 'navigation.spec.ts',
  fullyParallel: true, workers: 2, timeout: 30_000, retries: 0,
  outputDir: 'test-results/navigation',
  reporter: [['list'], ['json', { outputFile: 'test-results/navigation-results.json' }]],
  use: { baseURL: 'http://127.0.0.1:4176', headless: true, screenshot: 'only-on-failure', trace: 'retain-on-failure' },
  webServer: { command: 'npm run dev:navigation', url: 'http://127.0.0.1:4176', reuseExistingServer: false, timeout: 15_000 },
})
