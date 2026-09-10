import { worksCatalog, type WorkRecord, type WorksFilter, type WorkImage } from '../catalog.ts'

export type AtmosphericImage = WorkImage | 'jiYoungHee'
export type AtmosphericRecord = Omit<WorkRecord, 'image'> & { image: AtmosphericImage }

// User-requested local A presentation, 2026-09-09. The server-only P1D record remains private.
// Minimal facts and official derivative already audited by HOME/P1C; no draft content import.
const records: AtmosphericRecord[] = [
  { id: 'album:ji-young-hee-ryu-haegeum-sanjo-2026', type: 'album',
    title: '조윤경 해금산조 – 지영희류', year: 2026, date: '2026-09-08',
    image: 'jiYoungHee', referenceUrl: 'https://choyounkyoung.com/#/album/ji-young-hee-ryu-haegeum-sanjo-2026',
    presentation: { emphasis: 'major', placement: 'left', aspect: 'package' } },
  ...worksCatalog.map(record => ({ ...record, title: record.title.replace('산조－', '산조 – ') })),
]
// Group first, then descending known dates; year-only dates retain their precision.
export const atmosphericCatalog: readonly AtmosphericRecord[] = records.sort((a, b) =>
  Number(a.type === 'album') - Number(b.type === 'album') || b.year - a.year ||
  (b.date ?? '').localeCompare(a.date ?? ''))

export function filterAtmosphericWorks(filter: WorksFilter) {
  return filter === 'all' ? atmosphericCatalog
    : atmosphericCatalog.filter(record => record.type === (filter === 'albums' ? 'album' : 'performance'))
}
