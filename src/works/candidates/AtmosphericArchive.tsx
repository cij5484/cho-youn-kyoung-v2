import { useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router'
import type { Language } from '../../routing/locale-contract.ts'
import { atmosphericImages as workImages } from './atmospheric-assets.ts'
import { readWorksFilter, workDate, type WorksFilter } from '../catalog.ts'
import { atmosphericCatalog as worksCatalog, filterAtmosphericWorks as filterWorks } from './atmospheric-catalog.ts'
import { mountAtmosphericArchive } from './atmospheric-archive-motion.ts'
import './atmospheric-archive.css'

const filters = [ ['all', 'ALL', '전체 작업'], ['albums', 'ALBUMS', '음반'], ['performances', 'PERFORMANCES', '공연'] ] as const

/** A's final chapter is this actual navigable archive, rather than a duplicate miniature grid. */
export function AtmosphericArchive({ locale = 'ko' }: { locale?: Language }) {
  const root = useRef<HTMLElement>(null)
  const [search, setSearch] = useSearchParams()
  const filter = readWorksFilter(search.get('type'))
  const records = worksCatalog

  useEffect(() => {
    if (root.current) return mountAtmosphericArchive(root.current)
  }, [filter])

  const changeFilter = (next: WorksFilter) => {
    if (next === filter) return
    const query = new URLSearchParams(search)
    if (next === 'all') query.delete('type')
    else query.set('type', next)
    setSearch(query, { preventScrollReset: true })
  }

  return <section ref={root} id="works-compact-archive" className="atmospheric-archive"
    aria-labelledby="atmospheric-archive-title" tabIndex={-1} lang="ko">
    <div className="atmospheric-archive-inner">
      <header className="atmospheric-archive-heading">
        <h2 id="atmospheric-archive-title" lang="en">Archive<span aria-hidden="true">.</span></h2>
        <div className="atmospheric-archive-filters" role="group" aria-label="작업 종류">
          {filters.map(([value, label, accessible]) => <button type="button" key={value}
            aria-pressed={filter === value} aria-label={`${accessible} ${filterWorks(value).length}건`}
            onClick={() => changeFilter(value)}><span lang="en">{label}</span><span aria-hidden="true">{filterWorks(value).length}</span></button>)}
        </div>
      </header>
      {locale === 'en' && <p className="atmospheric-archive-note" lang="en">English translation is unavailable. Showing the original Korean records.</p>}
      <p className="atmospheric-archive-status" role="status">{filterWorks(filter).length}개의 기록</p>
      <ol className="atmospheric-archive-records">{records.map(record => {
        const image = workImages[record.image]
        const index = worksCatalog.findIndex(candidate => candidate.id === record.id)
        return <li key={record.id} className="atmospheric-archive-row" data-archive-row=""
          data-group-start={index > 0 && records[index - 1].type !== record.type} data-work-id={record.id} data-kind={record.type} data-sequence={index}
          data-filtered={filter !== 'all' && record.type !== (filter === 'albums' ? 'album' : 'performance')}>
          <a className="atmospheric-archive-link" href={record.referenceUrl}
            onClick={event => {
              if (Number(root.current?.dataset.indexExpansion ?? 1) >= .999) return
              const spatial = root.current?.closest<HTMLElement>('.atmospheric-depth')
              if (!spatial) return
              event.preventDefault()
              const progress = (index + .37 - .18) / (worksCatalog.length - .54) * .86
              window.scrollTo({ top: Number(spatial.dataset.scrollStart ?? 0) + progress * Number(spatial.dataset.scrollRange ?? 1),
                behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })
            }}
            aria-label={`${record.title} — 기존 사이트에서 기록 보기`}>
            <span className="atmospheric-archive-rule" aria-hidden="true" />
            <span className="atmospheric-archive-index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
            <span className="atmospheric-archive-slot" data-archive-slot="">
              <span className="atmospheric-archive-aperture"><img src={image.src} width={image.width} height={image.height}
                loading="lazy" decoding="async" alt="" /></span>
            </span>
            <time className="atmospheric-archive-date" dateTime={record.date ?? String(record.year)}>{workDate(record)}</time>
            <span className="atmospheric-archive-name">
              <span className="atmospheric-archive-title" aria-label={record.title}>
                {record.title}
              </span>
              {record.venue ? <span className="atmospheric-archive-detail">{record.venue}</span>
                : record.releaseState === 'announced' ? <span className="atmospheric-archive-detail">발매 예정</span> : null}
            </span>
            <span className="atmospheric-archive-kind" lang="en">{record.type === 'album' ? 'ALBUM' : 'PERFORMANCE'}</span>
            <span className="atmospheric-archive-arrow" aria-hidden="true">↗</span>
          </a>
        </li>
      })}</ol>
      <p className="atmospheric-archive-note">상세 기록은 기존 사이트에서 열립니다.</p>
    </div>
  </section>
}
