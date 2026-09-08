import { useRef } from 'react'
import { useSearchParams } from 'react-router'
import type { PointerEvent as ReactPointerEvent } from 'react'
import type { Language } from '../routing/locale-contract.ts'
import { workImages } from './assets.ts'
import { chronologicalWorks, filterWorks, readWorksFilter, workDate, worksCatalog } from './catalog.ts'
import type { WorkRecord, WorksFilter } from './catalog.ts'
import { useWorksChoreography } from './useWorksChoreography.ts'
import './works.css'

const filters: { value: WorksFilter; label: string; accessible: string }[] = [
  { value: 'all', label: 'ALL', accessible: '전체 작업' },
  { value: 'albums', label: 'ALBUMS', accessible: '음반' },
  { value: 'performances', label: 'PERFORMANCES', accessible: '공연' },
]

function WorkCard({ record }: { record: WorkRecord }) {
  const image = workImages[record.image]
  const isPortal = record.presentation.emphasis === 'portal'
  const pointer = (event: ReactPointerEvent<HTMLAnchorElement>) => {
    if (event.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const material = event.currentTarget.querySelector<HTMLElement>('.works-image-transport')!
    const box = material.getBoundingClientRect()
    event.currentTarget.style.setProperty('--material-x', String(Math.max(-1, Math.min(1, (event.clientX - box.left) / box.width * 2 - 1))))
    event.currentTarget.style.setProperty('--material-y', String(Math.max(-1, Math.min(1, (event.clientY - box.top) / box.height * 2 - 1))))
    if (isPortal && record.type === 'performance') event.currentTarget.closest<HTMLElement>('.works-page')?.style.setProperty('--world-pointer-x', event.currentTarget.style.getPropertyValue('--material-x'))
  }
  return <li className="works-card" data-work-id={record.id} data-kind={record.type}
    data-emphasis={record.presentation.emphasis} data-placement={record.presentation.placement}>
    <article className="works-card-body">
      <a className="works-record-link" href={record.referenceUrl} aria-label={`${record.title} — 기존 사이트에서 기록 보기`}
        onPointerMove={pointer} onPointerLeave={event => {
          event.currentTarget.style.removeProperty('--material-x')
          event.currentTarget.style.removeProperty('--material-y')
          if (isPortal && record.type === 'performance') event.currentTarget.closest<HTMLElement>('.works-page')?.style.removeProperty('--world-pointer-x')
        }}
        onFocus={event => {
          const page = event.currentTarget.closest<HTMLElement>('.works-page')
          if (event.currentTarget.matches(':focus-visible') && page?.dataset.worksStage !== 'archive') {
            const end = Number(page?.dataset.convergenceEnd)
            if (Number.isFinite(end)) window.scrollTo({ top: end, behavior: 'instant' })
          }
        }}>
        <div className="works-image-slot" data-aspect={record.presentation.aspect}
          style={{ aspectRatio: `${image.width} / ${image.height}` }}>
          <div className="works-image-transport">
            <div className="works-image-material">
              <img src={image.src} width={image.width} height={image.height}
                loading={isPortal ? 'eager' : 'lazy'} decoding="async" alt={`${record.title} ${record.type === 'album' ? '음반 표지' : '공연 포스터'}`} />
            </div>
          </div>
        </div>
        <div className="works-record-caption">
          <h2 lang="ko">{record.title}</h2>
          <p><time dateTime={record.date ?? String(record.year)}>{workDate(record)}</time>
            {record.releaseState === 'announced' && <span>발매 예정</span>}
            <span className="works-caption-arrow" aria-hidden="true">↗</span>
          </p>
        </div>
      </a>
    </article>
  </li>
}

function OpeningWorlds() {
  const album = worksCatalog.find(record => record.type === 'album' && record.presentation.emphasis === 'portal')!
  const performance = worksCatalog.find(record => record.type === 'performance' && record.presentation.emphasis === 'portal')!
  const albumImage = workImages[album.image]
  const performanceImage = workImages[performance.image]
  const date = 'date' in performance ? performance.date : ''
  return <div className="works-worlds" aria-hidden="true">
    <div className="works-world-label works-world-label-album" lang="en">Albums</div>
    <div className="works-world-anchor works-world-anchor-album" data-world-anchor="album"
      style={{ aspectRatio: `${albumImage.width} / ${albumImage.height}` }} />
    <div className="works-world-anchor works-world-anchor-performance" data-world-anchor="performance"
      style={{ aspectRatio: `${performanceImage.width} / ${performanceImage.height}` }} />
    <div className="works-world-date"><span>{date.slice(5, 7)}</span><span>{date.slice(8)}</span></div>
    <div className="works-world-label works-world-label-performance" lang="en">Performances</div>
    <div className="works-world-axis" />
  </div>
}

/** Page body only: both Framework and preview routers own the same navigation/main. */
export function WorksPage({ locale = 'ko' }: { locale?: Language }) {
  const root = useRef<HTMLElement>(null)
  const [search, setSearch] = useSearchParams()
  const filter = readWorksFilter(search.get('type'))
  const records = filterWorks(filter)
  const captureLayout = useWorksChoreography(root, filter)

  const changeFilter = (next: WorksFilter) => {
    if (next === filter) return
    captureLayout()
    const query = new URLSearchParams(search)
    if (next === 'all') query.delete('type')
    else query.set('type', next)
    setSearch(query, { preventScrollReset: true })
  }

  return <section ref={root} className="works-page" aria-labelledby="works-title" lang="ko" data-filter={filter}>
    <header className="works-opening">
      <div className="works-opening-top"><span>CHO YOUN KYOUNG / ARCHIVE</span><a href="#works-index">INDEX <span aria-hidden="true">↘</span></a></div>
      <h1 id="works-title" lang="en">Works<span className="works-title-stop" aria-hidden="true">.</span></h1>
      <div className="works-opening-bottom"><p>음반과 무대, 그 사이의 기록.</p><span aria-hidden="true">2020 — 2026</span></div>
      {locale === 'en' && <p className="works-locale-note" lang="en">English translation is not available. Showing the original Korean records.</p>}
    </header>

    <OpeningWorlds />
    <div className="works-threshold" aria-hidden="true"><span lang="en">Archive</span><span className="works-threshold-rule" /></div>
    <div className="works-archive-toolbar" id="works-archive" onFocusCapture={() => {
      const page = root.current
      if (page && page.dataset.worksStage !== 'archive') {
        const end = Number(page.dataset.convergenceEnd)
        if (Number.isFinite(end)) window.scrollTo({ top: end, behavior: 'instant' })
      }
    }}>
      <div className="works-filters" role="group" aria-label="작업 종류">
        {filters.map(item => <button key={item.value} type="button" aria-pressed={filter === item.value}
          aria-label={`${item.accessible} ${filterWorks(item.value).length}건`} onClick={() => changeFilter(item.value)}>
          <span lang="en">{item.label}</span><span className="works-filter-count" aria-hidden="true">{String(filterWorks(item.value).length).padStart(2, '0')}</span>
        </button>)}
      </div>
      <span className="works-archive-descriptor" lang="en">TWO PRACTICES / ONE ARCHIVE</span>
    </div>
    <p className="works-announcement" role="status" aria-live="polite">{filters.find(item => item.value === filter)?.accessible} {records.length}건</p>

    <ul className="works-grid" aria-label="작업 이미지 목록">
      {records.map(record => <WorkCard key={record.id} record={record} />)}
    </ul>

    <section className="works-index" id="works-index" aria-labelledby="works-index-title" tabIndex={-1}>
      <div className="works-index-heading"><h2 id="works-index-title" lang="en">Index<span aria-hidden="true"> / {String(records.length).padStart(2, '0')}</span></h2><span>연도별 기록</span></div>
      <ol className="works-index-list">
        {chronologicalWorks(records).map(record => <li key={record.id}>
          <a href={record.referenceUrl} aria-label={`${record.title} — 기존 사이트에서 기록 보기`}>
            <time dateTime={record.date ?? String(record.year)}>{workDate(record)}</time>
            <span className="works-index-name">{record.title}</span>
            <span className="works-index-type" lang="en">{record.type === 'album' ? 'ALBUM' : 'PERFORMANCE'}</span>
            <span aria-hidden="true">↗</span>
          </a>
        </li>)}
      </ol>
      <p className="works-source-note">상세 기록은 기존 사이트에서 열립니다.</p>
    </section>
  </section>
}
