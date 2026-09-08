import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router'
import type { Language } from '../../routing/locale-contract.ts'
import { workImages } from '../assets.ts'
import { chronologicalWorks, filterWorks, readWorksFilter, workDate, worksCatalog } from '../catalog.ts'
import type { WorksFilter } from '../catalog.ts'
import type { SpatialSceneController } from './scene.ts'
import './spatial.css'

const filters: { value: WorksFilter; label: string; accessible: string }[] = [
  { value: 'all', label: 'ALL', accessible: '전체 작업' },
  { value: 'albums', label: 'ALBUMS', accessible: '음반' },
  { value: 'performances', label: 'PERFORMANCES', accessible: '공연' },
]

/** Opt-in development candidate. Canonical WorksPage and its catalog are untouched. */
export function SpatialWorksPage({ locale = 'ko' }: { locale?: Language }) {
  const stage = useRef<HTMLDivElement>(null)
  const region = useRef<HTMLDivElement>(null)
  const canvasHost = useRef<HTMLDivElement>(null)
  const [state, setState] = useState<'loading' | 'ready' | 'fallback'>('loading')
  const [reason, setReason] = useState('')
  const [focus, setFocus] = useState(0)
  const [resolving, setResolving] = useState(false)
  const [search, setSearch] = useSearchParams()
  const filter = readWorksFilter(search.get('type'))
  const records = chronologicalWorks(filterWorks(filter))
  const active = worksCatalog[focus]

  useEffect(() => {
    let disposed = false
    let generation = 0
    let controller: SpatialSceneController | null = null
    let currentCanvas: HTMLCanvasElement | null = null
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const release = () => {
      controller?.dispose()
      controller = null
      currentCanvas?.remove()
      currentCanvas = null
    }
    const start = async () => {
      const current = ++generation
      release()
      if (reduced.matches) { setState('fallback'); setReason('reduced-motion'); return }
      setState('loading')
      setReason('')
      let createSpatialScene: typeof import('./scene.ts')['createSpatialScene']
      try { ({ createSpatialScene } = await import('./scene.ts')) }
      catch {
        if (!disposed && current === generation) { setState('fallback'); setReason('scene-unavailable') }
        return
      }
      if (disposed || current !== generation || !canvasHost.current || !stage.current || !region.current) return
      // A disposed WebGL renderer deliberately loses its context. A fresh canvas
      // gives reduced-motion toggles and Strict Mode restarts a new GPU owner.
      currentCanvas = document.createElement('canvas')
      currentCanvas.className = 'works-spatial-canvas'
      currentCanvas.setAttribute('aria-hidden', 'true')
      canvasHost.current.append(currentCanvas)
      controller = createSpatialScene({
        canvas: currentCanvas, stage: stage.current, region: region.current, records: worksCatalog, images: workImages,
        onFocus: (index, resolution) => { if (!disposed && current === generation) { setFocus(index); setResolving(resolution) } },
        onStatus: (status, failure) => { if (!disposed && current === generation) { setState(status); setReason(failure ?? '') } },
      })
    }
    const change = () => { void start() }
    void start()
    reduced.addEventListener('change', change)
    return () => { disposed = true; generation += 1; reduced.removeEventListener('change', change); release() }
  }, [])

  const changeFilter = (next: WorksFilter) => {
    const query = new URLSearchParams(search)
    if (next === 'all') query.delete('type')
    else query.set('type', next)
    setSearch(query, { preventScrollReset: true })
  }

  return <section className="spatial-works" data-works-layout="spatial-helix" data-state={state} data-fallback-reason={reason} lang="ko" aria-labelledby="spatial-works-title">
    <noscript><style>{`.spatial-works[data-state] .spatial-scroll{block-size:320px}.spatial-works[data-state] .spatial-stage{position:relative;block-size:320px}.spatial-works .spatial-index-jump{visibility:hidden}`}</style></noscript>
    <div className="spatial-scroll" ref={region}>
      <div className="spatial-stage" ref={stage} data-state={state} data-render-state="loading" data-focus={active.id}>
        <div ref={canvasHost} className="works-spatial-canvas-host" aria-hidden="true" />
        <header className="spatial-heading">
          <p lang="en">CHO YOUN KYOUNG / WORKS</p>
          <h1 id="spatial-works-title" lang="en">Works<span aria-hidden="true">.</span></h1>
          <p className="spatial-worlds" lang="en">Albums <span aria-hidden="true">/</span> Performances</p>
        </header>
        <div className="spatial-focus-copy" data-resolving={resolving} aria-live="off">
          <p className="spatial-focus-category" lang="en">{resolving ? 'ONE ARCHIVE' : active.type === 'album' ? 'RECORDING' : 'PERFORMANCE'}</p>
          <h2 key={resolving ? 'archive' : active.id}>{resolving ? '음반과 무대의 기록' : active.title}</h2>
          <p className="spatial-focus-meta">{resolving ? '2020 — 2026' : workDate(active)}</p>
          {!resolving && <a href={active.referenceUrl} className="spatial-record-action" aria-label={`${active.title} — 기존 사이트에서 기록 보기`}>기록 보기 <span aria-hidden="true">↗</span></a>}
        </div>
        <a className="spatial-index-jump" href="#spatial-index">INDEX <span aria-hidden="true">06 ↘</span></a>
        <span className="spatial-position" aria-hidden="true">{String(focus + 1).padStart(2, '0')} / 06</span>
      </div>
    </div>
    <section className="spatial-index" id="spatial-index" aria-labelledby="spatial-index-title" tabIndex={-1}>
      <div className="spatial-index-heading"><h2 id="spatial-index-title" lang="en">Archive</h2><span>연도별 기록</span></div>
      {locale === 'en' && <p className="spatial-locale-note" lang="en">English translation is unavailable. Showing the original Korean records.</p>}
      <div className="spatial-filters" role="group" aria-label="작업 종류">
        {filters.map(item => <button type="button" key={item.value} aria-pressed={filter === item.value}
          aria-label={`${item.accessible} ${filterWorks(item.value).length}건`} onClick={() => changeFilter(item.value)}>
          <span lang="en">{item.label}</span><span aria-hidden="true">{filterWorks(item.value).length}</span>
        </button>)}
      </div>
      <p className="spatial-announcement" role="status">{records.length}개의 기록</p>
      <ol className="spatial-records" data-filter={filter}>
        {records.map(record => {
          const image = workImages[record.image]
          return <li key={record.id} data-work-id={record.id} data-kind={record.type}>
            <a href={record.referenceUrl} aria-label={`${record.title} — 기존 사이트에서 기록 보기`}>
              <span className="spatial-thumb"><img src={image.src} width={image.width} height={image.height} loading="lazy" alt="" /></span>
              <time dateTime={record.date ?? String(record.year)}>{workDate(record)}</time>
              <span className="spatial-record-name">{record.title}<small>{record.venue ?? (record.releaseState === 'announced' ? '발매 예정' : '')}</small></span>
              <span className="spatial-record-kind" lang="en">{record.type === 'album' ? 'ALBUM' : 'PERFORMANCE'}</span>
              <span className="spatial-record-arrow" aria-hidden="true">↗</span>
            </a>
          </li>
        })}
      </ol>
      <p className="spatial-source-note">상세 기록은 기존 사이트에서 열립니다.</p>
    </section>
  </section>
}
