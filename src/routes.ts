import { index, route, type RouteConfig } from '@react-router/dev/routes'
import { spikeRoutes } from './spike/fixtures'

export default [
  ...spikeRoutes.map(({ id, pattern }) => pattern === '/'
    ? index('routes/spike.tsx', { id })
    : route(pattern.slice(1), 'routes/spike.tsx', { id })),
  route('*', 'routes/not-found.tsx'),
] satisfies RouteConfig
