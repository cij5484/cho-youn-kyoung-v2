import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests', testMatch: 'sound.spec.ts',
  projects: [{ name: 'chromium', use: { browserName: 'chromium' } }, { name: 'webkit', use: { browserName: 'webkit' } }],
  fullyParallel: true, workers: 2, timeout: 30_000, retries: 0,
  outputDir: 'test-results/sound',
  reporter: [['list'], ['json', { outputFile: 'test-results/sound-results.json' }]],
  use: { baseURL: 'http://127.0.0.1:4179', headless: true, screenshot: 'only-on-failure', trace: 'retain-on-failure' },
  webServer: { command: 'npm run dev:sound', url: 'http://127.0.0.1:4179', reuseExistingServer: false, timeout: 15_000 },
})
