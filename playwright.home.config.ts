import { defineConfig } from '@playwright/test'
import interaction from './playwright.interaction.config.ts'

// The current HOME lives in the 4180 development composition; no image/video evidence is generated.
export default defineConfig({ ...interaction, testMatch: ['home.spec.ts','home-pass.spec.ts','home-continuity.spec.ts','album-continuity.spec.ts','stage-continuity.spec.ts','interaction.spec.ts'],
  outputDir: 'test-results/home', reporter: [['list']],
  use: { ...interaction.use, trace: 'off', screenshot: 'off', video: 'off' },
})
