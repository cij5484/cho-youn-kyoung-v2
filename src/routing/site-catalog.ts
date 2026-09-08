import { spikeCatalog, spikeRoutes } from '../spike/fixtures.ts'
import { routePair, type SemanticRoute } from './locale-contract.ts'

// Actual page metadata replaces its neutral fixture; untranslated EN stays unavailable.
export const worksRoute: SemanticRoute = {
  key: 'works', koPath: '/works', content: {
    ko: { source: 'authored', status: 'reviewed', value: {
      title: 'WORKS — 조윤경', description: '조윤경의 음반과 공연 기록.',
    } },
  },
}
export const siteCatalog: SemanticRoute[] = spikeCatalog.map(route => route.key === 'works' ? worksRoute : route)
export const siteRoutes = spikeRoutes.filter(route => {
  const record = siteCatalog.find(item => item.key === route.key)
  return record && routePair(record)[route.lang] === route.path
})
