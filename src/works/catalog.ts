export type WorkType = 'album' | 'performance'
export type WorksFilter = 'all' | 'albums' | 'performances'
export type WorkImage = 'yeongsan' | 'pyeongjo' | 'hanBeomSu' | 'pulgo' | 'sanjo' | 'recital'

export type WorkRecord = {
  id: string
  type: WorkType
  title: string
  year: number
  date?: string
  venue?: string
  releaseState?: 'announced' | 'released'
  image: WorkImage
  referenceUrl: string
  presentation: {
    emphasis: 'portal' | 'major' | 'standard'
    placement: 'left' | 'right'
    aspect: 'package' | 'poster'
  }
}

// Independent public-reference projection, never the HOME selection or V2 private catalog.
// The complete 4-album / 3-performance legacy source was audited at the pinned revision.
// One album is deliberately excluded because its V2 publication state is private.
// See source-manifest.json. Original-site references are not V2 detail routes.
export const worksCatalog = [
  {
    id: 'album:yeongsan-hoesang-2026', type: 'album',
    title: '조윤경 해금정악 – 영산회상', year: 2026, releaseState: 'announced',
    image: 'yeongsan', referenceUrl: 'https://choyounkyoung.com/#/album/yeongsan-hoesang-2026',
    presentation: { emphasis: 'portal', placement: 'left', aspect: 'package' },
  },
  {
    id: 'performance:haegeum-jeongak-2026-09-22', type: 'performance',
    title: '풀고, 엮다', year: 2026, date: '2026-09-22', venue: '국립부산국악원 예지당',
    image: 'pulgo', referenceUrl: 'https://choyounkyoung.com/#/performance/haegeum-jeongak-2026-09-22',
    presentation: { emphasis: 'portal', placement: 'right', aspect: 'poster' },
  },
  {
    id: 'performance:sanjo-gil-2026-08-16', type: 'performance',
    title: '산조길, 둘', year: 2026, date: '2026-08-16', venue: '해운대문화회관 고운홀',
    image: 'sanjo', referenceUrl: 'https://choyounkyoung.com/#/performance/sanjo-gil-2026-08-16',
    presentation: { emphasis: 'major', placement: 'left', aspect: 'poster' },
  },
  {
    id: 'album:pyeongjo-hoesang-2026', type: 'album',
    title: '조윤경 해금정악 – 평조회상', year: 2026, releaseState: 'announced',
    image: 'pyeongjo', referenceUrl: 'https://choyounkyoung.com/#/album/pyeongjo-hoesang-2026',
    presentation: { emphasis: 'standard', placement: 'right', aspect: 'package' },
  },
  {
    id: 'album:han-beom-su-haegeum-sanjo-2020', type: 'album',
    title: '조윤경 해금산조－한범수류', year: 2020, date: '2020-11-19', releaseState: 'released',
    image: 'hanBeomSu', referenceUrl: 'https://choyounkyoung.com/#/album/han-beom-su-haegeum-sanjo-2020',
    presentation: { emphasis: 'standard', placement: 'left', aspect: 'package' },
  },
  {
    id: 'performance:haegeum-2026-08-02', type: 'performance',
    title: '해금, 시대를 잇다', year: 2026, date: '2026-08-02', venue: '향사아트센터',
    image: 'recital', referenceUrl: 'https://choyounkyoung.com/#/performance/haegeum-2026-08-02',
    presentation: { emphasis: 'major', placement: 'right', aspect: 'poster' },
  },
] as const satisfies readonly WorkRecord[]

export function readWorksFilter(value: string | null): WorksFilter {
  return value === 'albums' || value === 'performances' ? value : 'all'
}

export function filterWorks(filter: WorksFilter, records: readonly WorkRecord[] = worksCatalog): readonly WorkRecord[] {
  if (filter === 'all') return records
  return records.filter(record => record.type === (filter === 'albums' ? 'album' : 'performance'))
}

export function chronologicalWorks(records: readonly WorkRecord[]): WorkRecord[] {
  // Unknown month/day remain year-only, after dated records of that year.
  return [...records].sort((a, b) => b.year - a.year || (b.date ?? '').localeCompare(a.date ?? '') || a.title.localeCompare(b.title, 'ko'))
}

export function workDate(record: WorkRecord): string {
  return record.date?.replaceAll('-', '.') ?? String(record.year)
}
