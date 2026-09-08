import type { Config } from '@react-router/dev/config'
import { getBuildTarget } from './config/build.ts'
import { siteRoutes } from './src/routing/site-catalog.ts'

const target = getBuildTarget(process.env.P0B_TARGET)

export default {
  appDirectory: 'src',
  basename: target.base,
  buildDirectory: target.directory,
  ssr: false,
  prerender: siteRoutes.map(({ path }) => path),
  // A static host has no runtime /__manifest endpoint.
  routeDiscovery: { mode: 'initial' },
} satisfies Config
