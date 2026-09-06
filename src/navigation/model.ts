import { findPublishedRoute, languageOfPath, localizedPath, normalizePath, resolveLanguageSwitch, routePair, type SemanticRoute } from '../routing/locale-contract.ts'

const sections = ['home', 'works', 'media', 'about', 'contact'] as const

export function navigationModel(pathname: string, catalog: readonly SemanticRoute[]) {
  const lang = languageOfPath(pathname)
  const match = findPublishedRoute(pathname, catalog)
  const section = match && (['albums', 'performances', 'album', 'performance'].includes(match.route.key) ? 'works' : match.route.key)
  return {
    lang,
    home: localizedPath('/', lang),
    links: sections.flatMap(key => {
      const record = catalog.find(route => route.key === key)
      const to = record && routePair(record)[lang]
      return to ? [{ key, label: key.toUpperCase(), to, current: section === key,
        exact: normalizePath(pathname) === to }] : []
    }),
    languages: (['ko', 'en'] as const).map(language => ({ language, ...resolveLanguageSwitch(pathname, language, catalog) })),
  }
}
