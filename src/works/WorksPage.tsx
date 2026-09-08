import { useEffect, useLayoutEffect, useRef } from 'react'
import { useSearchParams } from 'react-router'
import type { CSSProperties, RefObject } from 'react'
import type { Language } from '../routing/locale-contract.ts'
import { workImages } from './assets.ts'
import { chronologicalWorks, filterWorks, readWorksFilter, workDate, worksCatalog } from './catalog.ts'
import type { WorkRecord, WorksFilter } from './catalog.ts'
import { portalProgress, reflowTransform } from './motion.ts'
import type { LayoutBox } from './motion.ts'
import './works.css'

const filters: { value: WorksFilter; label: string; accessible: string }[] = [
  { value: 'all', label: 'ALL', accessible: '전체 작업' },
  { value: 'albums', label: 'ALBUMS', accessible: '음반' },
  { value: 'performances', label: 'PERFORMANCES', accessible: '공연' },
]

function measureCards(node: HTMLElement): Map<string, LayoutBox> {
  return new Map(Array.from(node.querySelectorAll<HTMLElement>('[data-work-id]')).map(card => {
    const rect = card.getBoundingClientRect()
    return [card.dataset.workId!, { left: rect.left + window.scrollX, top: rect.top + window.scrollY, width: rect.width, height: rect.height }]
  }))
}

function useArchiveMotion(root: RefObject<HTMLElement | null>, filter: WorksFilter) {
  const previous = useRef(new Map<string, LayoutBox>())
  const animations = useRef<Animation[]>([])
  const capture = () => {
    if (root.current) previous.current = measureCards(root.current)
  }

  useEffect(() => {
    // Browser Back/Forward uses the same query state and starts from the currently
    // rendered layout, including an interrupted reflow, before React commits it.
    const snapshot = () => {
      if (root.current) previous.current = measureCards(root.current)
    }
    window.addEventListener('popstate', snapshot)
    return () => window.removeEventListener('popstate', snapshot)
  }, [root])

  useLayoutEffect(() => {
    const node = root.current
    if (!node) return
    const before = previous.current
    animations.current.forEach(animation => animation.cancel())
    animations.current = []
    const after = measureCards(node)
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && before.size) {
      node.querySelectorAll<HTMLElement>('[data-work-id]').forEach(card => {
        const from = before.get(card.dataset.workId!)
        const to = after.get(card.dataset.workId!)!
        const animation = card.animate(from ? [
          { transform: reflowTransform(from, to) },
          { transform: 'none' },
        ] : [
          { transform: 'translateY(24px)', clipPath: 'inset(0 0 12% 0)' },
          { transform: 'none', clipPath: 'inset(0)' },
        ], { duration: 430, easing: 'cubic-bezier(.2,.7,.2,1)' })
        animations.current.push(animation)
      })
    }
    previous.current = after
    return () => {
      animations.current.forEach(animation => animation.cancel())
      animations.current = []
    }
  }, [filter, root])
  useEffect(() => {
    const node = root.current
    if (!node) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0
    let start = 0
    let last = ''
    const paint = () => {
      frame = 0
      const progress = reduced.matches || filter !== 'all' ? 1 : portalProgress(window.scrollY, start, window.innerHeight)
      const value = progress.toFixed(4)
      if (value === last) return
      last = value
      node.style.setProperty('--archive-progress', value)
      node.dataset.archivePhase = progress < .01 ? 'portal' : progress > .99 ? 'archive' : 'reorganizing'
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(paint) }
    const resize = () => {
      start = Math.max(0, node.getBoundingClientRect().top + window.scrollY + 36)
      schedule()
    }
    const motionChange = () => {
      if (reduced.matches) animations.current.forEach(animation => animation.cancel())
      schedule()
    }
    resize()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', resize)
    reduced.addEventListener('change', motionChange)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', resize)
      reduced.removeEventListener('change', motionChange)
    }
  }, [filter, root])
  return capture
}

function WorkCard({ record, index }: { record: WorkRecord; index: number }) {
  const image = workImages[record.image]
  const isPortal = record.presentation.emphasis === 'portal'
  const category = record.type === 'album' ? 'ALBUMS' : 'PERFORMANCES'
  return <li className="works-card" data-work-id={record.id} data-kind={record.type}
    data-emphasis={record.presentation.emphasis} data-placement={record.presentation.placement}>
    <article className="works-card-body">
      {isPortal && <div className="works-portal-caption" aria-hidden="true">
        <span>{category}</span><span>{String(filterWorks(record.type === 'album' ? 'albums' : 'performances').length).padStart(2, '0')}</span>
      </div>}
      <a className="works-record-link" href={record.referenceUrl} aria-label={`${record.title} — 기존 사이트에서 기록 보기`}
        onPointerEnter={event => {
          if (event.pointerType === 'mouse') {
            const page = event.currentTarget.closest<HTMLElement>('.works-page')
            if (page) page.dataset.portalHover = isPortal ? record.type : ''
          }
        }}
        onPointerLeave={event => {
          const page = event.currentTarget.closest<HTMLElement>('.works-page')
          if (page) delete page.dataset.portalHover
        }}>
        <div className="works-image-surface" data-aspect={record.presentation.aspect}>
          <div className="works-image-material">
            <img src={image.src} width={image.width} height={image.height}
              loading={isPortal ? 'eager' : 'lazy'} decoding="async" alt={`${record.title} ${record.type === 'album' ? '음반 표지' : '공연 포스터'}`} />
          </div>
          <span className="works-record-visit" aria-hidden="true">기록 보기 <span>↗</span></span>
        </div>
        <div className="works-record-caption">
          <span className="works-record-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
          <div><h2 lang="ko">{record.title}</h2>
            <p className="works-record-meta"><time dateTime={record.date ?? String(record.year)}>{workDate(record)}</time>
              <span>{record.venue ?? (record.releaseState === 'announced' ? '발매 예정' : '음반')}</span>
            </p>
          </div>
          <span className="works-caption-arrow" aria-hidden="true">↗</span>
        </div>
      </a>
    </article>
  </li>
}

/** Page body only: both Framework and preview routers own the same navigation/main. */
export function WorksPage({ locale = 'ko' }: { locale?: Language }) {
  const root = useRef<HTMLElement>(null)
  const [search, setSearch] = useSearchParams()
  const filter = readWorksFilter(search.get('type'))
  const records = filterWorks(filter)
  const captureLayout = useArchiveMotion(root, filter)

  const changeFilter = (next: WorksFilter) => {
    if (next === filter) return
    captureLayout()
    const query = new URLSearchParams(search)
    if (next === 'all') query.delete('type')
    else query.set('type', next)
    setSearch(query, { preventScrollReset: true })
  }

  return <section ref={root} className="works-page" aria-labelledby="works-title" lang="ko" data-filter={filter}
    style={{ '--archive-progress': filter === 'all' ? 0 : 1 } as CSSProperties}>
    <header className="works-opening">
      <div className="works-opening-top"><span>CHO YOUN KYOUNG / ARCHIVE</span><a href="#works-index">INDEX <span aria-hidden="true">↘</span></a></div>
      <h1 id="works-title" lang="en">Works<span className="works-title-stop" aria-hidden="true">.</span></h1>
      <div className="works-opening-bottom"><p>음반과 무대, 그 사이의 기록.</p><span aria-hidden="true">2020 — 2026</span></div>
      {locale === 'en' && <p className="works-locale-note" lang="en">English translation is not available. Showing the original Korean records.</p>}
    </header>

    <div className="works-archive-toolbar" id="works-archive">
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
      {records.map(record => <WorkCard key={record.id} record={record} index={worksCatalog.findIndex(item => item.id === record.id)} />)}
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
