import { index, route, type RouteConfig } from '@react-router/dev/routes'
import { siteRoutes } from './routing/site-catalog'

export default [
  ...siteRoutes.map(({ id, pattern }) => pattern === '/'
    ? index('routes/spike.tsx', { id })
    : route(pattern.slice(1), id === 'ko-works' ? 'routes/works.tsx' : 'routes/spike.tsx', { id })),
  route('*', 'routes/not-found.tsx'),
] satisfies RouteConfig
