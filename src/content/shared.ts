import { isPublished, type Language, type LocalizedContent } from '../routing/locale-contract.ts'

export type ContentKind = 'album' | 'performance' | 'media' | 'press' | 'profile'
export type ContentId<K extends ContentKind = ContentKind> = `${K}:${string}`
export type ContentRef<K extends ContentKind = ContentKind> = { [P in K]: { readonly kind: P; readonly id: ContentId<P> } }[K]
export interface Provenance { readonly sourceRef: string; readonly author: string }
export type Edition<T> = Readonly<LocalizedContent<T> & (
  | { status: 'draft'; provenance: Provenance }
  | { status: 'reviewed'; provenance: Provenance; review: { readonly reviewer: string; readonly reviewedAt: string } }
)>
export interface Locales<T> { readonly ko: Edition<T>; readonly en?: Edition<T> }

// Review applies to the entire authored edition. Missing optional fields never fall back to KO silently.
export function localizedField<T, K extends keyof T>(copy: Locales<T>, lang: Language, field: K) {
  const edition = copy[lang]
  if (!edition || edition.value[field] === undefined) return { status: 'missing' as const }
  if (!isPublished(edition)) return { status: 'unreviewed' as const }
  return { status: 'available' as const, value: edition.value[field] }
}

export type ContentDate =
  | { readonly precision: 'unknown' }
  | { readonly precision: 'year'; readonly value: number }
  | { readonly precision: 'month' | 'day'; readonly value: string }

// Publication is independent from album release, event chronology and media availability.
export type Publication =
  | { readonly status: 'draft' | 'published' | 'archived' | 'unavailable' }
  | { readonly status: 'scheduled'; readonly publishAt: string }

export interface Copy {
  readonly title: string
  readonly summary?: string
  readonly subtitle?: string
  readonly description?: string
  readonly seo?: { readonly title?: string; readonly description?: string }
}
export interface ExternalLink {
  readonly role: 'official' | 'streaming' | 'ticket' | 'reference'
  readonly url: string
  readonly label: Locales<string>
}
export interface ListingPresentation { readonly featured?: boolean; readonly order?: number }
export interface RecordBase<K extends ContentKind, T extends Copy> {
  readonly kind: K
  readonly id: ContentId<K>
  readonly slug: string
  readonly publication: Publication
  readonly content: Locales<T>
  readonly related?: readonly ContentRef[]
  readonly links?: readonly ExternalLink[]
}

export function validDay(value: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(value) && Number.isFinite(Date.parse(`${value}T00:00:00Z`))
    && new Date(`${value}T00:00:00Z`).toISOString().slice(0, 10) === value
}
export function validInstant(value: string): boolean {
  return /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/.test(value)
    && validDay(value.slice(0, 10)) && Number.isFinite(Date.parse(value))
}
export function validContentDate(date: ContentDate): boolean {
  switch (date.precision) {
    case 'unknown': return true
    case 'year': return Number.isInteger(date.value) && date.value >= 1000 && date.value <= 9999
    case 'month': return /^\d{4}-(?:0[1-9]|1[0-2])$/.test(date.value)
    case 'day': return validDay(date.value)
  }
}
export function contentYear(date: ContentDate): number | undefined {
  return date.precision === 'unknown' ? undefined : date.precision === 'year' ? date.value : Number(date.value.slice(0, 4))
}
export function isPublic(publication: Publication, asOf: string): boolean {
  if (!validInstant(asOf)) throw new Error('An explicit build instant with timezone is required')
  if (publication.status === 'scheduled') {
    if (!validInstant(publication.publishAt)) throw new Error('Invalid publication timestamp')
    return Date.parse(publication.publishAt) <= Date.parse(asOf)
  }
  return publication.status === 'published' || publication.status === 'archived'
}
