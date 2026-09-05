import { reactRouter } from '@react-router/dev/vite'
import { defineConfig } from 'vite'
import { getBuildTarget } from './config/build.ts'

const target = getBuildTarget(process.env.P0B_TARGET)

export default defineConfig({
  base: target.base,
  plugins: [reactRouter()],
  define: {
    'import.meta.env.VITE_SPIKE_ORIGIN': JSON.stringify(target.canonicalOrigin),
  },
})
