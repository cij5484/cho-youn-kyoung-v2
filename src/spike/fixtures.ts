import { languages, localizedPath, normalizePath, routePair, type Language, type SemanticRoute } from '../routing/locale-contract.ts'

export interface SpikeRoute {
  id: string
  key: string
  path: string
  pattern: string
  name: string
  lang: Language
}

// Neutral metadata fixtures only. These are not real content or translations.
const definitions = [
  { key: 'home', koPath: '/', pattern: '/', name: 'HOME' },
  { key: 'works', koPath: '/works', pattern: '/works', name: 'WORKS' },
  { key: 'albums', koPath: '/albums', pattern: '/albums', name: 'ALBUMS' },
  { key: 'performances', koPath: '/performances', pattern: '/performances', name: 'PERFORMANCES' },
  { key: 'album', koPath: '/album/test-album', pattern: '/album/:id', name: 'ALBUM TEST' },
  { key: 'performance', koPath: '/performance/test-performance', pattern: '/performance/:id', name: 'PERFORMANCE TEST' },
  { key: 'media', koPath: '/media', pattern: '/media', name: 'MEDIA' },
  { key: 'about', koPath: '/about', pattern: '/about', name: 'ABOUT' },
  { key: 'contact', koPath: '/contact', pattern: '/contact', name: 'CONTACT' },
] as const

export const spikeCatalog: SemanticRoute[] = definitions.map(({ key, koPath, name }) => ({
  key, koPath,
  content: {
    ko: { source: 'authored', status: 'reviewed', value: {
      title: `${name} (ko) | P0B`, description: `Routing spike: ${koPath} [ko]. Test metadata only.`,
    } },
    en: { source: 'authored', status: 'reviewed', value: {
      title: `${name} (en) | P0B`, description: `Routing spike: ${localizedPath(koPath, 'en')} [en]. Test metadata only.`,
    } },
  },
}))

export const spikeRoutes: SpikeRoute[] = languages.flatMap((lang) => definitions.flatMap((definition, index) => {
  const path = routePair(spikeCatalog[index])[lang]
  return path ? [{ id: `${lang}-${definition.key}`, key: definition.key, path,
    pattern: localizedPath(definition.pattern, lang), name: definition.name, lang }] : []
}))

export function findSpikeRoute(pathname: string) {
  return spikeRoutes.find(({ path }) => path === normalizePath(pathname))
}
