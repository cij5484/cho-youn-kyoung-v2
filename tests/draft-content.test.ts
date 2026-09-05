import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'
import { buildTargets } from '../config/build.ts'
import { contentIndex, contentPrerenderPaths, contentRouteCatalog, publishedRecords, relatedRecords } from '../src/content/catalog.ts'
import { growthCatalog, albumFixture, fixtureAsOf } from '../src/content/fixtures.ts'
import { contentCatalog } from '../src/content/registry.server.ts'
import { jiYoungHeeSanjoDraft } from '../src/content/records/ji-young-hee-sanjo.server.ts'
import type { Album, ContentCatalog } from '../src/content/models.ts'
import { localizedField } from '../src/content/shared.ts'
import { validateCatalog } from '../src/content/validation.ts'
import { resolveLanguageSwitch, routeMetadata } from '../src/routing/locale-contract.ts'
import { spikeCatalog, spikeRoutes } from '../src/spike/fixtures.ts'

const draft: Album = jiYoungHeeSanjoDraft

test('registered source preserves the approved P1C mapping without adding another real record', () => {
  const document = readFileSync(new URL('../docs/redesign/review/album-audits/JI-YOUNG-HEE-SANJO-KO-RECORD-MAPPING-REVIEW.md', import.meta.url), 'utf8')
  const json = document.match(/<!-- P1C_DOCUMENT_CANDIDATE_START -->\s*```json\n([\s\S]*?)\n```/)
  assert.ok(json, 'Approved mapping must remain traceable')
  assert.deepEqual(contentCatalog, JSON.parse(json[1]))
  assert.deepEqual(validateCatalog(contentCatalog, fixtureAsOf), [])
})

test('registered private draft stays outside every public selector before and after release', () => {
  for (const asOf of [fixtureAsOf, '2026-09-08T00:00:00+09:00', '2027-01-01T00:00:00Z']) {
    assert.deepEqual(publishedRecords(contentCatalog, asOf), [])
    assert.deepEqual(contentIndex(contentCatalog, 'album', asOf), [])
    assert.deepEqual(contentRouteCatalog(contentCatalog, asOf), [])
    assert.deepEqual(contentPrerenderPaths(contentCatalog, asOf), [])
  }
  const released: ContentCatalog = { ...contentCatalog, albums: [{ ...draft, release: { ...draft.release, status: 'released' } }] }
  assert.deepEqual(contentPrerenderPaths(released, fixtureAsOf), [])
})

test('registered draft does not alter mixed public indexes, related works or route metadata', () => {
  // Existing fabricated public controls prove that exclusion does not empty valid public content.
  const mixed: ContentCatalog = { ...growthCatalog,
    albums: [...growthCatalog.albums, draft], assets: [...growthCatalog.assets, ...contentCatalog.assets] }
  assert.deepEqual(publishedRecords(mixed, fixtureAsOf), publishedRecords(growthCatalog, fixtureAsOf))
  assert.deepEqual(contentRouteCatalog(mixed, fixtureAsOf), contentRouteCatalog(growthCatalog, fixtureAsOf))
  const relatedSource: Album = { ...albumFixture, related: [...albumFixture.related, { kind: 'album', id: draft.id }] }
  assert.deepEqual(relatedRecords(mixed, relatedSource, fixtureAsOf), relatedRecords(growthCatalog, albumFixture, fixtureAsOf))
  assert.deepEqual(contentIndex(mixed, 'album', fixtureAsOf), contentIndex(growthCatalog, 'album', fixtureAsOf))
})

test('KO stays unreviewed and all nested EN editions stay missing after mapping approval', () => {
  for (const copy of [draft.content, ...draft.tracks.map(t => t.content)]) {
    assert.deepEqual(localizedField(copy, 'ko', 'title'), { status: 'unreviewed' })
    assert.deepEqual(localizedField(copy, 'en', 'title'), { status: 'missing' })
  }
  for (const credit of draft.credits) {
    assert.deepEqual(localizedField(credit.content, 'ko', 'name'), { status: 'unreviewed' })
    assert.deepEqual(localizedField(credit.content, 'en', 'name'), { status: 'missing' })
  }
  assert.equal(draft.presentation.cover.alt.ko.status, 'draft')
  assert.equal(draft.presentation.cover.alt.en, undefined)
})

test('draft KO and EN paths receive no identity, canonical, hreflang or OpenGraph at either base', () => {
  const routes = contentRouteCatalog(contentCatalog, fixtureAsOf)
  for (const target of Object.values(buildTargets)) {
    const site = { base: target.base, origin: target.canonicalOrigin }
    for (const path of [`/album/${draft.slug}`, `/en/album/${draft.slug}`]) {
      assert.equal(routeMetadata(path, routes, site), undefined)
      assert.equal(routeMetadata(path, spikeCatalog, site), undefined)
      assert.deepEqual(resolveLanguageSwitch(path, 'en', routes), { status: 'unknown-route', to: null })
      assert.equal(spikeRoutes.some(route => route.path === path), false)
    }
  }
})

test('publication-only promotion is rejected without silently filling review or cover runtime', () => {
  const invalid: ContentCatalog = { ...contentCatalog, albums: [{ ...draft, publication: { status: 'published' } }] }
  assert.match(validateCatalog(invalid, fixtureAsOf).join('\n'), /public content needs reviewed KO/)
  assert.match(validateCatalog(invalid, fixtureAsOf).join('\n'), /runtime source required/)
  assert.throws(() => contentRouteCatalog(invalid, fixtureAsOf), /public content needs reviewed KO/)
  assert.equal(draft.publication.status, 'draft')
})
