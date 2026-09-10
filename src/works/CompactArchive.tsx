import { useSearchParams } from 'react-router'
import type { Language } from '../routing/locale-contract.ts'
import { atmosphericImages as workImages } from './candidates/atmospheric-assets.ts'
import { filterAtmosphericWorks as filterWorks } from './candidates/atmospheric-catalog.ts'
import { readWorksFilter, workDate, type WorksFilter } from './catalog.ts'
import './compact-archive.css'
import { albumStudyHref, localAlbumStudy } from '../album-detail/album-navigation.ts'

const filters = [ ['all', 'ALL', '전체 작업'], ['albums', 'ALBUMS', '음반'], ['performances', 'PERFORMANCES', '공연'] ] as const

/** Actual records and keyboard/touch navigation survive any experimental rendering engine. */
export function CompactArchive({ locale = 'ko' }: { locale?: Language }) {
  const [search, setSearch] = useSearchParams()
  const filter = readWorksFilter(search.get('type'))
  const records = filterWorks(filter)
  function changeFilter(next: WorksFilter) {
    const query = new URLSearchParams(search)
    if (next === 'all') query.delete('type')
    else query.set('type', next)
    setSearch(query, { preventScrollReset: true })
  }
  return <section className="works-compact" id="works-compact-archive" aria-labelledby="works-compact-title" tabIndex={-1} lang="ko">
    <header><h2 id="works-compact-title" lang="en">Archive</h2><span>음반과 공연 기록</span></header>
    {locale === 'en' && <p className="works-compact-note" lang="en">English translation is unavailable. Showing the original Korean records.</p>}
    <div className="works-compact-filters" role="group" aria-label="작업 종류">{filters.map(([value, label, accessible]) => <button type="button" key={value} aria-pressed={filter === value}
      aria-label={`${accessible} ${filterWorks(value).length}건`} onClick={() => changeFilter(value)}><span lang="en">{label}</span><span aria-hidden="true">{filterWorks(value).length}</span></button>)}</div>
    <p className="works-compact-announcement" role="status">{records.length}개의 기록</p>
    <ol className="works-compact-records">{records.map(record => {
      const image = workImages[record.image]
      return <li key={record.id} data-work-id={record.id} data-kind={record.type}><a href={albumStudyHref(record)} aria-label={`${record.title} — 기록 보기`}>
        <span className="works-compact-thumb"><img src={image.src}
          srcSet={`${image.mobileSrc} ${Math.round(1024 * Math.min(1, image.width / image.height))}w, ${image.src} ${image.width}w`}
          sizes={`(max-width: 700px) 64px, ${image.width}px`} width={image.width} height={image.height} loading="lazy" alt=""/></span>
        <time dateTime={record.date ?? String(record.year)}>{workDate(record)}</time>
        <span className="works-compact-name">{record.title.replace(/^조윤경\s+/, '')}<small>{record.venue ?? (record.releaseState === 'announced' ? '발매 예정' : '')}</small></span>
        <span className="works-compact-kind" lang="en">{record.type === 'album' ? 'ALBUM' : 'PERFORMANCE'}</span><span className="works-compact-arrow" aria-hidden="true">↗</span>
      </a></li>
    })}</ol>
    <p className="works-compact-note">{localAlbumStudy() ? '음반은 전시로, 공연은 기존 기록으로 이어집니다.' : '상세 기록은 기존 사이트에서 열립니다.'}</p>
  </section>
}
