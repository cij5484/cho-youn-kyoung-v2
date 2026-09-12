import { productionSite } from '../../config/public-site.ts'
import { publicPages, type SeoPage } from './content.ts'

export type SeoEnvironment = { production: boolean; origin: string; base: string }
const cleanPath = (path: string) => path === '/' ? '/' : `/${path.split('/').filter(Boolean).join('/')}/`
export const primaryPaths = publicPages.map(page => page.path)
export const aliasPaths = publicPages.filter(page => page.path.startsWith('/immersive/')).flatMap(page => {
  const path = page.path.slice('/immersive'.length)
  return [`/classic${path}`, ...(path === '/' ? [] : [path])]
}).concat('/performance/', '/classic/performance/')

export function publicPage(path: string): SeoPage | undefined {
  path = cleanPath(path)
  if (path === '/performance/' || path === '/classic/performance/') path = '/immersive/works/'
  if (path.startsWith('/classic/')) path = path.replace('/classic/', '/immersive/')
  return publicPages.find(page => page.path === path)
    ?? publicPages.find(page => page.path === `/immersive${path}` && path !== '/')
}

export function socialPath(page: SeoPage) {
  return `assets/social/${page.image.source.split('/').at(-1)}`
}

export function pageMetadata(path: string, env: SeoEnvironment) {
  const page = publicPage(path)
  const absolute = (relative: string) => new URL(`${env.base}${relative.replace(/^\//, '')}`, env.origin).href
  const canonical = page ? absolute(page.path) : undefined
  const image = page ? absolute(socialPath(page)) : undefined
  const title = page?.title ?? '페이지를 찾을 수 없습니다 — 조윤경'
  const description = page?.description ?? '요청한 페이지를 찾을 수 없습니다.'
  const graph: Record<string, unknown>[] = []
  if (env.production && page) {
    if (page.path === '/' || page.path === '/immersive/' || page.path === '/immersive/about/') {
      graph.push({ '@type': 'Person', '@id': `${productionSite.origin}/#person`, name: '조윤경', alternateName: 'Cho Youn Kyoung', jobTitle: '해금 연주자', url: `${productionSite.origin}/immersive/about/`, image: absolute(socialPath(publicPages[0])) })
    }
    if (page.path === '/') graph.push({ '@type': 'WebSite', '@id': `${productionSite.origin}/#website`, name: '조윤경', alternateName: 'Cho Youn Kyoung', url: canonical, inLanguage: 'ko', about: { '@id': `${productionSite.origin}/#person` } })
    if (page.structured) graph.push({ ...page.structured, '@id': `${canonical}#record`, url: canonical, image })
  }
  return { title, description, canonical, image, imageAlt: page?.image.alt,
    robots: env.production && page ? 'index, follow' : 'noindex, nofollow',
    jsonLd: graph.length ? { '@context': 'https://schema.org', '@graph': graph } : undefined }
}

export const escapeHtml = (value: string) => value.replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]!)
export const serializeJsonLd = (value: unknown) => JSON.stringify(value).replace(/</g, '\\u003c')

// Static HTML and client route updates share one set of head tags.
export function metadataTags(path: string, env: SeoEnvironment) {
  const meta = pageMetadata(path, env)
  const tags: { tag: 'meta' | 'link'; attributes: Record<string, string> }[] = [
    { tag: 'meta', attributes: { name: 'description', content: meta.description } },
    { tag: 'meta', attributes: { name: 'robots', content: meta.robots } },
    ...Object.entries({ 'og:type': 'website', 'og:title': meta.title, 'og:description': meta.description,
      'og:locale': 'ko_KR', 'og:site_name': '조윤경', 'og:url': meta.canonical, 'og:image': meta.image, 'og:image:alt': meta.imageAlt,
    }).filter((entry): entry is [string, string] => Boolean(entry[1])).map(([property, content]) => ({ tag: 'meta' as const, attributes: { property, content } })),
    ...Object.entries({ 'twitter:card': 'summary_large_image', 'twitter:title': meta.title, 'twitter:description': meta.description,
      'twitter:image': meta.image, 'twitter:image:alt': meta.imageAlt,
    }).filter((entry): entry is [string, string] => Boolean(entry[1])).map(([name, content]) => ({ tag: 'meta' as const, attributes: { name, content } })),
  ]
  if (meta.canonical) {
    tags.push({ tag: 'link', attributes: { rel: 'canonical', href: meta.canonical } })
    // Only authored Korean is published. Never advertise untranslated fixture counterparts.
    for (const hreflang of ['ko', 'x-default']) tags.push({ tag: 'link', attributes: { rel: 'alternate', hreflang, href: meta.canonical } })
  }
  return { ...meta, tags }
}

export function metadataHtml(path: string, env: SeoEnvironment) {
  const meta = metadataTags(path, env)
  return `<title>${escapeHtml(meta.title)}</title>` + meta.tags.map(({ tag, attributes }) => `<${tag} data-site-seo ${Object.entries(attributes).map(([key, value]) => `${key}="${escapeHtml(value)}"`).join(' ')}>`).join('')
    + (meta.jsonLd ? `<script data-site-seo type="application/ld+json">${serializeJsonLd(meta.jsonLd)}</script>` : '')
}

export function robotsText(production: boolean) {
  return production ? `User-agent: *\nAllow: /\nDisallow: /classic-app/\nAllow: /classic-app/assets/*.js$\nAllow: /classic-app/assets/*.css$\nAllow: /classic-app/assets/*.woff2$\nAllow: /classic-app/assets/*.webp$\nAllow: /classic-app/assets/*.jpg$\nAllow: /classic-app/assets/*.png$\nDisallow: /labs/\nDisallow: /fixtures/\nDisallow: /preview/\nDisallow: /en/\nDisallow: /immersive/en/\nDisallow: /classic/en/\nSitemap: ${productionSite.origin}/sitemap.xml\n` : 'User-agent: *\nDisallow: /\n'
}
export function sitemapXml() {
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${primaryPaths.map(path => `<url><loc>${productionSite.origin}${escapeHtml(path)}</loc></url>`).join('')}</urlset>\n`
}

/** Only known V1 hashes. A browser bookmark bridge, never an HTTP redirect. */
export function legacyHashPath(hash: string) {
  if (!hash.startsWith('#/')) return undefined
  const path = hash.slice(1).split(/[?#]/)[0]
  if (path === '/') return '/immersive/'
  return publicPage(path)?.path
}
