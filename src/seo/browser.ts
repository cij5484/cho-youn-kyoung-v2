import { productionSite } from '../../config/public-site.ts'
import { metadataTags, serializeJsonLd } from './metadata.ts'

/** One head owner for ENTRY, iframe-shell navigation and React Router transitions. */
export function updateSiteMetadata() {
  const base = import.meta.env.BASE_URL.replace(/immersive\/$/, '')
  const path = `/${location.pathname.slice(base.length)}`
  const production = import.meta.env.MODE === 'public-site'
  const meta = metadataTags(path, { production, origin: production ? productionSite.origin : location.origin, base })
  document.title = meta.title
  document.head.querySelectorAll('[data-site-seo], meta[name="description"], meta[name="robots"], link[rel="canonical"], meta[property^="og:"], meta[name^="twitter:"]').forEach(node => node.remove())
  for (const { tag, attributes } of meta.tags) {
    const element = document.createElement(tag)
    element.dataset.siteSeo = ''
    for (const [name, value] of Object.entries(attributes)) element.setAttribute(name, value)
    document.head.append(element)
  }
  if (meta.jsonLd) {
    const element = document.createElement('script')
    element.type = 'application/ld+json'; element.dataset.siteSeo = ''
    element.textContent = serializeJsonLd(meta.jsonLd)
    document.head.append(element)
  }
}
