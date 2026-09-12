import { defineConfig } from '@playwright/test'
export default defineConfig({testDir:'./tests',testMatch:'interaction.spec.ts',
  projects:[{name:'chromium',use:{browserName:'chromium'}},{name:'webkit',use:{browserName:'webkit'}}],
  workers:1,timeout:30_000,retries:0,outputDir:'test-results/interaction',
  reporter:[['list'],['json',{outputFile:'test-results/interaction-results.json'}]],
  use:{baseURL:'http://127.0.0.1:4180',headless:true,trace:'retain-on-failure',screenshot:'only-on-failure'},
  webServer:{command:'vite --config vite.interaction-test.config.ts',url:'http://127.0.0.1:4180',reuseExistingServer:false,timeout:15000}})
