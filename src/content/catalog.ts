import { isPublished, routePair, type LocalizedContent, type MetadataCopy, type SemanticRoute } from '../routing/locale-contract.ts'
import type { ContentCatalog, ContentRecord, Performance } from './models.ts'
import { isPublic, validDay, type ContentKind, type Edition } from './shared.ts'
import { allRecords, recordReferences, validateCatalog } from './validation.ts'

export function publishedRecords(catalog: ContentCatalog, asOf: string): readonly ContentRecord[] {
  const errors = validateCatalog(catalog, asOf)
  if (errors.length) throw new Error(errors.join('\n'))
  return allRecords(catalog).filter((record) => isPublic(record.publication, asOf) && isPublished(record.content.ko))
}
export function contentIndex(catalog: ContentCatalog, kind: ContentKind, asOf: string) {
  return publishedRecords(catalog, asOf).filter((record) => record.kind === kind)
    .sort((a, b) => (a.presentation?.order ?? Number.MAX_SAFE_INTEGER) - (b.presentation?.order ?? Number.MAX_SAFE_INTEGER)
      || (a.id < b.id ? -1 : a.id > b.id ? 1 : 0))
}
// Direct references only; no inferred reciprocal graph or hidden recommendations.
export function relatedRecords(catalog: ContentCatalog, record: ContentRecord, asOf: string) {
  const ids = new Set(recordReferences(record).map((ref) => ref.id))
  return publishedRecords(catalog, asOf).filter((candidate) => ids.has(candidate.id))
}
function metadataEdition(edition: Edition<{ readonly title: string; readonly summary: string; readonly seo?: { readonly title?: string; readonly description?: string } }>): LocalizedContent<MetadataCopy> {
  return { ...edition, value: { title: edition.value.seo?.title ?? edition.value.title,
    description: edition.value.seo?.description ?? edition.value.summary } }
}
// Adapter output can feed the existing P0D helpers and React Router prerender array.
// P1A deliberately does not replace the current P0 neutral route catalog or page templates.
export function contentRouteCatalog(catalog: ContentCatalog, asOf: string): SemanticRoute[] {
  return publishedRecords(catalog, asOf).filter((record) => record.kind === 'album' || record.kind === 'performance')
    .map((record) => ({ key: record.id, koPath: `/${record.kind}/${record.slug}`, content: {
      ko: metadataEdition(record.content.ko),
      ...(record.content.en ? { en: metadataEdition(record.content.en) } : {}),
    } }))
}
export function contentPrerenderPaths(catalog: ContentCatalog, asOf: string): string[] {
  return contentRouteCatalog(catalog, asOf).flatMap((record) => Object.values(routePair(record)))
}
export function performancePeriod(performance: Performance, asOfDay: string) {
  if (!validDay(asOfDay)) throw new Error('An explicit calendar date is required')
  if (performance.event.status !== 'scheduled') return performance.event.status
  if (performance.event.date.precision !== 'day') return 'undetermined'
  return (performance.event.endDate ?? performance.event.date.value) < asOfDay ? 'past' : 'upcoming'
}
