import { defineConfig } from '@playwright/test'
import { buildTargets } from './config/build.ts'

export default defineConfig({
  testDir: './tests',
  testMatch: 'routing-spike.spec.ts',
  fullyParallel: true,
  workers: 2,
  timeout: 30_000,
  retries: 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    channel: 'msedge',
    headless: true,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: Object.entries(buildTargets).map(([name, target]) => ({
    name,
    use: { baseURL: `http://127.0.0.1:${target.previewPort}${target.base}` },
  })),
  webServer: Object.entries(buildTargets).map(([name, target]) => ({
    command: `node scripts/static-spike-server.mjs ${name}`,
    url: `http://127.0.0.1:${target.previewPort}${target.base}`,
    reuseExistingServer: false,
    timeout: 15_000,
  })),
})
