import { isPublished } from '../routing/locale-contract.ts'
import type { AssetRef, ImageUse } from './assets.ts'
import type { ContentCatalog, ContentRecord } from './models.ts'
import { isPublic, validContentDate, validDay, validInstant, type Locales } from './shared.ts'

export function allRecords(catalog: ContentCatalog): readonly ContentRecord[] {
  return [...catalog.albums, ...catalog.performances, ...catalog.media, ...catalog.press, ...catalog.profiles]
}
export function recordImages(record: ContentRecord): readonly ImageUse[] {
  switch (record.kind) {
    case 'album': return [record.presentation.cover, ...record.presentation.packageVisuals ?? [], ...record.booklet?.pages ?? [],
      ...record.credits.flatMap((credit) => credit.portrait ? [credit.portrait] : [])]
    case 'performance': return [record.presentation.hero, record.presentation.secondaryVisual, record.archive?.poster,
      record.archive?.leaflet, ...record.archive?.gallery ?? [], ...record.cast.map((credit) => credit.portrait)].filter((item): item is ImageUse => !!item)
    case 'media': return [record.type === 'image' ? record.source : record.poster]
    case 'profile': return record.portraits
    case 'press': return []
  }
}
export function recordReferences(record: ContentRecord) {
  return [...record.related ?? [],
    ...(record.kind === 'performance' ? record.archive?.videos ?? [] : []),
    ...(record.kind === 'profile' ? record.selectedPerformances : [])]
}
function httpsUrl(value: string): boolean {
  try { const url = new URL(value); return url.protocol === 'https:' && !url.username && !url.password } catch { return false }
}
export function runtimeUrl(value: string): boolean {
  return httpsUrl(value) || /^(?:[a-zA-Z0-9_-]+\/)*[a-zA-Z0-9_.-]+$/.test(value)
    && !value.split('/').some((segment) => segment === '.' || segment === '..')
}

// Semantic checks for repository-authored, TypeScript-checked data. Not a decoder for arbitrary CMS/JSON input.
export function validateCatalog(catalog: ContentCatalog, asOf: string): readonly string[] {
  const errors: string[] = []
  const check = (condition: boolean, message: string) => { if (!condition) errors.push(message) }
  if (!validInstant(asOf)) return ['Invalid explicit build instant']
  const records = allRecords(catalog)
  const byId = new Map(records.map((record) => [record.id, record]))
  const assets = new Map(catalog.assets.map((asset) => [asset.id, asset]))
  check(byId.size === records.length, 'Duplicate content ID')
  check(assets.size === catalog.assets.length, 'Duplicate asset ID')
  check(new Set(catalog.career.map((entry) => entry.id)).size === catalog.career.length, 'Duplicate career ID')
  const slugs = new Set<string>()
  function locales(copy: Locales<unknown>, label: string) {
    for (const edition of [copy.ko, copy.en]) {
      if (!edition) continue
      check(Boolean(edition.provenance.sourceRef.trim() && edition.provenance.author.trim()), `${label}: missing provenance`)
      if (edition.status === 'reviewed') {
        check(edition.source === 'authored' && Boolean(edition.review.reviewer.trim())
          && validInstant(edition.review.reviewedAt), `${label}: invalid authored review`)
      }
    }
  }
  function assetRef(ref: AssetRef, label: string, runtime = false) {
    const asset = assets.get(ref.id)
    check(asset?.kind === ref.kind, `${label}: missing/wrong asset ${ref.id}`)
    if (runtime) check(Boolean(asset?.runtime), `${label}: runtime source required`)
  }
  for (const asset of catalog.assets) {
    check(/^asset:[a-z0-9][a-z0-9-]*$/.test(asset.id), `Invalid asset ID ${asset.id}`)
    check(['provisional', 'approved', 'replace-required'].includes(asset.lifecycle), `${asset.id}: invalid asset lifecycle`)
    if (asset.runtime) {
      check(runtimeUrl(asset.runtime.url), `${asset.id}: unsafe runtime URL`)
      check(Boolean(asset.runtime.mimeType.trim()), `${asset.id}: missing MIME`)
      for (const size of [asset.runtime.bytes, asset.runtime.width, asset.runtime.height]) {
        check(size === undefined || Number.isFinite(size) && size > 0, `${asset.id}: invalid size`)
      }
    }
  }
  for (const record of records) {
    const label = record.id
    check(record.id.startsWith(`${record.kind}:`) && /^[a-z]+:[a-z0-9][a-z0-9-]*$/.test(record.id), `${label}: invalid ID`)
    check(/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(record.slug), `${label}: invalid slug`)
    const key = `${record.kind}/${record.slug}`
    check(!slugs.has(key), `${label}: duplicate slug`); slugs.add(key)
    locales(record.content, label)
    if (record.publication.status === 'scheduled') check(validInstant(record.publication.publishAt), `${label}: invalid schedule`)
    const publicRecord = (record.publication.status !== 'scheduled' || validInstant(record.publication.publishAt)) && isPublic(record.publication, asOf)
    if (publicRecord) check(isPublished(record.content.ko), `${label}: public content needs reviewed KO`)
    for (const lang of ['ko', 'en'] as const) {
      const copy = record.content[lang]
      if (copy && isPublished(copy)) {
        check(Boolean(copy.value.title.trim()), `${label}/${lang}: empty required title`)
        if (record.kind === 'album' || record.kind === 'performance') check(Boolean(copy.value.summary?.trim()), `${label}/${lang}: empty required summary`)
        if (copy.value.seo) check([copy.value.seo.title, copy.value.seo.description].every((s) => s === undefined || !!s.trim()), `${label}/${lang}: empty SEO override`)
      }
    }
    for (const ref of recordReferences(record)) check(byId.get(ref.id)?.kind === ref.kind, `${label}: dangling/wrong related ${ref.id}`)
    for (const link of record.links ?? []) { check(httpsUrl(link.url), `${label}: unsafe external URL`); locales(link.label, label) }
    if (record.presentation?.order !== undefined) check(Number.isFinite(record.presentation.order), `${label}: invalid order`)
    for (const visual of recordImages(record)) {
      assetRef(visual.asset, label, publicRecord)
      if (visual.mobile?.asset) assetRef(visual.mobile.asset, label, publicRecord)
      locales(visual.alt, label)
      for (const lang of ['ko', 'en'] as const) {
        if (publicRecord && isPublished(record.content[lang])) check(isPublished(visual.alt[lang])
          && Boolean(visual.alt[lang]?.value.trim()), `${label}/${lang}: reviewed visual alt required`)
      }
      const ratio = visual.aspectRatio
      if (ratio) check(Number.isFinite(ratio.width) && Number.isFinite(ratio.height) && ratio.width > 0 && ratio.height > 0, `${label}: invalid ratio`)
      const crop = visual.mobile?.crop
      if (crop) check([crop.x, crop.y, crop.width, crop.height].every(Number.isFinite) && crop.x >= 0 && crop.y >= 0
        && crop.width > 0 && crop.height > 0 && crop.x + crop.width <= 1 && crop.y + crop.height <= 1, `${label}: invalid mobile crop`)
    }
    if (record.kind === 'album') {
      check(validContentDate(record.release.date), `${label}: invalid release date`)
      check(new Set(record.tracks.map((track) => track.id)).size === record.tracks.length, `${label}: duplicate track ID`)
      for (const [index, track] of record.tracks.entries()) {
        check(track.number === index + 1, `${label}: track order must be contiguous`)
        check(track.durationSeconds === undefined || Number.isFinite(track.durationSeconds) && track.durationSeconds > 0, `${label}: invalid duration`)
        locales(track.content, label)
        if (track.source.status === 'playable') assetRef(track.source.asset, label, true)
        else check(Boolean(track.source.reason.trim()), `${label}: unavailable source needs reason`)
      }
      for (const credit of record.credits) locales(credit.content, label)
      if (record.booklet?.download) { assetRef(record.booklet.download.asset, label, publicRecord); locales(record.booklet.download.label, label) }
      if (record.presentation.object3d) assetRef(record.presentation.object3d.asset, label)
    } else if (record.kind === 'performance') {
      check(validContentDate(record.event.date), `${label}: invalid performance date`)
      if (record.event.endDate) check(validDay(record.event.endDate) && (record.event.date.precision !== 'day'
        || record.event.endDate >= record.event.date.value), `${label}: invalid event end date`)
      if (record.event.time) {
        check(record.event.date.precision === 'day' && /^(?:[01]\d|2[0-3]):[0-5]\d$/.test(record.event.time.localStart), `${label}: invalid local start`)
        try { new Intl.DateTimeFormat('en', { timeZone: record.event.time.timeZone }) } catch { errors.push(`${label}: invalid timezone`) }
      }
      for (const item of [...record.program, ...record.cast]) locales(item.content, label)
      for (const item of record.archive?.downloads ?? []) { assetRef(item.asset, label, publicRecord); locales(item.label, label) }
    } else if (record.kind === 'media') {
      check(validContentDate(record.date), `${label}: invalid media date`)
      const ratio = record.presentation.aspectRatio
      check(Number.isFinite(ratio.width) && Number.isFinite(ratio.height) && ratio.width > 0 && ratio.height > 0, `${label}: invalid media ratio`)
      if (record.type === 'youtube') check(/^[a-zA-Z0-9_-]{11}$/.test(record.source.videoId), `${label}: invalid YouTube identity`)
      if (record.type === 'video') assetRef(record.source, label, publicRecord)
    } else if (record.kind === 'press') {
      check(validContentDate(record.date) && httpsUrl(record.url) && Boolean(record.outlet.trim()), `${label}: invalid press source`)
    }
  }
  for (const entry of catalog.career) {
    check(byId.get(entry.profileId)?.kind === 'profile', `${entry.id}: dangling profile`)
    check(validContentDate(entry.date) && (!entry.endDate || validContentDate(entry.endDate)), `${entry.id}: invalid career date`)
    locales(entry.content, entry.id)
  }
  return errors
}
