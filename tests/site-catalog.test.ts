import assert from 'node:assert/strict'
import { test } from 'node:test'
import { siteCatalog, siteRoutes } from '../src/routing/site-catalog.ts'
import { routeMetadata, resolveLanguageSwitch } from '../src/routing/locale-contract.ts'
import { navigationModel } from '../src/navigation/model.ts'

test('actual WORKS has KO metadata and no fabricated EN route/counterpart', () => {
  assert.equal(siteRoutes.length, 17)
  assert.ok(siteRoutes.some(route => route.path === '/works'))
  assert.ok(!siteRoutes.some(route => route.path === '/en/works'))
  const metadata = routeMetadata('/works', siteCatalog, { origin: 'https://example.com', base: '/v2/' })!
  assert.equal(metadata.title, 'WORKS — 조윤경')
  assert.deepEqual(metadata.hreflang.map(link => link.lang), ['ko', 'x-default'])
  assert.equal(resolveLanguageSwitch('/works', 'en', siteCatalog).status, 'unavailable')
  assert.equal(routeMetadata('/en/works', siteCatalog, { origin: 'https://example.com', base: '/v2/' }), undefined)
})
test('English global menu can reach authored Korean WORKS without inventing translation', () => {
  assert.equal(navigationModel('/en', siteCatalog).links.find(link => link.key === 'works')?.to, '/works')
})
