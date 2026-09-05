import { Link, useLocation, type MetaArgs } from 'react-router'
import { findSpikeRoute, spikeRoutes } from '../spike/fixtures'
import { spikeMetadata } from '../spike/metadata'
import { logicalPath, publicAsset, routeHref } from '../spike/paths'
import NotFound from './not-found'

export function meta({ location }: MetaArgs) {
  return spikeMetadata(location.pathname)
}

export default function SpikeRoute() {
  const fixture = findSpikeRoute(logicalPath(useLocation().pathname))
  if (!fixture) return <NotFound />

  return (
    <main>
      <h1>{fixture.name} ({fixture.lang})</h1>
      <img src={publicAsset('spike/path-check.svg')} width="16" height="16" alt="Public asset path test" />
      <nav aria-label="Spike routes">
        <ul>
          {spikeRoutes.map(({ id, path }) => (
            <li key={id}><Link to={routeHref(path)} data-route-id={id}>{path}</Link></li>
          ))}
        </ul>
        <Link to="/missing-route/" data-testid="unknown-link">404 test</Link>
        {' | '}
        <Link to="/album/missing-album/" data-testid="unknown-album-link">Unknown album test</Link>
      </nav>
    </main>
  )
}
