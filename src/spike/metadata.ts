import type { MetaDescriptor } from 'react-router'
import { routeMetadata } from '../routing/locale-contract'
import { spikeCatalog } from './fixtures'
import { logicalPath, siteLocation } from './paths'

export function spikeMetadata(pathname: string): MetaDescriptor[] {
  const metadata = routeMetadata(logicalPath(pathname), spikeCatalog, siteLocation)
  return [
    { title: metadata?.title ?? '404 | P0B' },
    { name: 'description', content: metadata?.description ?? 'Unknown routing spike path.' },
    { name: 'robots', content: 'noindex, nofollow' },
    ...(metadata ? [
      { tagName: 'link', rel: 'canonical', href: metadata.canonical } as const,
      ...metadata.hreflang.map(({ lang, href }) => ({ tagName: 'link', rel: 'alternate', hrefLang: lang, href } as const)),
      { property: 'og:type', content: metadata.openGraph.type },
      { property: 'og:title', content: metadata.openGraph.title },
      { property: 'og:description', content: metadata.openGraph.description },
      { property: 'og:url', content: metadata.openGraph.url },
      ...(metadata.openGraph.image ? [{ property: 'og:image', content: metadata.openGraph.image }] : []),
    ] : []),
  ]
}
