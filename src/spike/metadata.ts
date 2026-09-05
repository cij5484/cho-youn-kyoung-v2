import type { MetaDescriptor } from 'react-router'
import { findSpikeRoute } from './fixtures'
import { canonicalCandidate, logicalPath } from './paths'

export function spikeMetadata(pathname: string): MetaDescriptor[] {
  const fixture = findSpikeRoute(logicalPath(pathname))
  return [
    { title: fixture ? `${fixture.name} (${fixture.lang}) | P0B` : '404 | P0B' },
    { name: 'description', content: fixture
      ? `Routing spike: ${fixture.path} [${fixture.lang}]. Test metadata only.`
      : 'Unknown routing spike path.' },
    { name: 'robots', content: 'noindex, nofollow' },
    ...(fixture ? [{ tagName: 'link', rel: 'canonical', href: canonicalCandidate(fixture.path) } as const] : []),
  ]
}
