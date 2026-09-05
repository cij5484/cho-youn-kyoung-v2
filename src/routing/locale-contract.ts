export const languages = ['ko', 'en'] as const
export type Language = typeof languages[number]

// Machine-assisted drafts cannot become public translations without human authorship/review.
export type LocalizedContent<T> =
  | { source: 'authored'; status: 'draft' | 'reviewed'; value: T }
  | { source: 'machine-assisted'; status: 'draft'; value: T }

export interface MetadataCopy { title: string; description: string }
export interface SemanticRoute {
  key: string
  koPath: string
  content: { ko: LocalizedContent<MetadataCopy>; en?: LocalizedContent<MetadataCopy> }
}
export interface SiteLocation { origin: string; base: string }
export interface RouteMetadata extends MetadataCopy {
  lang: Language
  canonical: string
  hreflang: { lang: Language | 'x-default'; href: string }[]
  openGraph: { type: 'website' | 'article'; title: string; description: string; url: string; image?: string }
}

export function normalizePath(path: string) {
  return path.split(/[?#]/, 1)[0].replace(/\/+$/, '') || '/'
}

export function languageOfPath(path: string): Language {
  const normalized = normalizePath(path)
  return normalized === '/en' || normalized.startsWith('/en/') ? 'en' : 'ko'
}

export function localizedPath(koPath: string, lang: Language) {
  const path = normalizePath(koPath)
  if (!path.startsWith('/') || path.startsWith('//') || /^\/(?:ko|en)(?:\/|$)/.test(path)) {
    throw new Error('Expected a Korean default logical path, without a language prefix')
  }
  return lang === 'ko' ? path : `/en${path === '/' ? '' : path}`
}

export function isPublished<T>(content: LocalizedContent<T> | undefined): boolean {
  return content?.source === 'authored' && content.status === 'reviewed'
}

export function routePair(route: SemanticRoute): Partial<Record<Language, string>> {
  return Object.fromEntries(languages.filter((lang) => isPublished(route.content[lang]))
    .map((lang) => [lang, localizedPath(route.koPath, lang)]))
}

export function findPublishedRoute(path: string, catalog: readonly SemanticRoute[]) {
  const lang = languageOfPath(path)
  const route = catalog.find((entry) => routePair(entry)[lang] === normalizePath(path))
  return route ? { route, lang } : undefined
}

export type LanguageSwitchResult =
  | { status: 'available'; to: string; lang: Language }
  | { status: 'unavailable'; to: string; lang: 'ko'; reason: 'translation-unavailable' }
  | { status: 'unknown-route'; to: null }

// Router-logical paths only. The router owns basename; callers own navigation/UI.
export function resolveLanguageSwitch(path: string, requested: Language, catalog: readonly SemanticRoute[]): LanguageSwitchResult {
  const match = findPublishedRoute(path, catalog)
  if (!match) return { status: 'unknown-route', to: null }
  const pair = routePair(match.route)
  if (pair[requested]) return { status: 'available', to: pair[requested], lang: requested }
  if (pair.ko) return { status: 'unavailable', to: pair.ko, lang: 'ko', reason: 'translation-unavailable' }
  return { status: 'unknown-route', to: null }
}

export function publicUrl(path: string, site: SiteLocation) {
  const origin = new URL(site.origin)
  if (!['https:', 'http:'].includes(origin.protocol) || origin.pathname !== '/' || origin.search || origin.hash) {
    throw new Error('Site origin must contain only an HTTP(S) origin')
  }
  if (!/^\/(?:[^/?#]+\/)*$/.test(site.base)) throw new Error('Base must start and end with /')
  const logical = normalizePath(path)
  return `${origin.origin}${site.base}${logical === '/' ? '' : `${logical.slice(1)}/`}`
}

export function routeMetadata(path: string, catalog: readonly SemanticRoute[], site: SiteLocation): RouteMetadata | undefined {
  const match = findPublishedRoute(path, catalog)
  if (!match) return undefined
  const { route, lang } = match
  const copy = route.content[lang]!.value
  const pair = routePair(route)
  const canonical = publicUrl(pair[lang]!, site)
  return {
    ...copy, lang, canonical,
    hreflang: [
      ...languages.filter((language) => pair[language]).map((language) => ({ lang: language, href: publicUrl(pair[language]!, site) })),
      ...(pair.ko ? [{ lang: 'x-default' as const, href: publicUrl(pair.ko, site) }] : []),
    ],
    openGraph: { type: 'website', title: copy.title, description: copy.description, url: canonical },
  }
}
