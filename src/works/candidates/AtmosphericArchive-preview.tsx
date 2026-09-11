import { useEffect, useRef, type MouseEvent } from 'react'
import { albumStudyHref, appRoute, isLocalDetailRoute, requestAlbumEntry } from '../../album-detail/album-navigation.ts'
import { workDate, type WorksFilter } from '../catalog.ts'
import { atmosphericImages } from './atmospheric-assets.ts'
import { filterAtmosphericWorks } from './atmospheric-catalog.ts'
import './atmospheric-archive-preview.css'

/** Local desktop study. The spatial index and touch archive keep their existing owner. */
export function AtmosphericArchivePreview({ filter }: { filter: WorksFilter }) {
  const root = useRef<HTMLDivElement>(null)
  const records = [...filterAtmosphericWorks(filter)].sort((a, b) =>
    b.year - a.year || (b.date ?? '').localeCompare(a.date ?? ''))
  const first = records[0]
  const image = atmosphericImages[first.image]

  const enter = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    if (!isLocalDetailRoute(appRoute(event.currentTarget.href))) return
    const visual = root.current?.querySelector<HTMLImageElement>('.archive-preview-image img')
    if (!visual) return
    const rect = visual.getBoundingClientRect()
    const aspect = Number(event.currentTarget.dataset.previewAspect ?? visual.dataset.previewAspect)
    const width = Math.min(rect.width, rect.height * aspect), height = width / aspect
    const src = event.currentTarget.dataset.previewSource ?? visual.src
    if (requestAlbumEntry(event.currentTarget.href, src, {
      x: rect.x + (rect.width - width) / 2, y: rect.y + (rect.height - height) / 2, width, height,
    })) { event.preventDefault(); event.stopPropagation() }
  }

  useEffect(() => {
    let disposed = false
    let release: (() => void) | undefined
    void import('./atmospheric-archive-preview-motion.ts').then(({ mountArchivePreview }) => {
      if (!disposed && root.current) release = mountArchivePreview(root.current)
    })
    return () => { disposed = true; release?.() }
  }, [filter])

  return <div ref={root} className="atmospheric-archive-preview" data-preview-filter={filter}>
    <ol className="archive-preview-list" aria-label="날짜순 작품 기록">{records.map((record, index) => {
      const asset = atmosphericImages[record.image]
      return <li key={record.id} data-preview-row="" data-preview-active={index === 0}>
        <a href={albumStudyHref(record)} onClick={enter} data-preview-source={asset.src}
          data-preview-aspect={asset.width / asset.height} data-preview-title={record.title}
          data-preview-date={workDate(record)} data-work-id={record.id}>
          <span className="archive-preview-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
          <span className="archive-preview-name">{record.title.replace(/^조윤경\s+/, '')}
            <span className="archive-preview-meta">{record.venue ?? (record.releaseState === 'announced' ? '발매 예정' : 'ALBUM')}</span>
          </span>
          <time dateTime={record.date ?? String(record.year)}>{workDate(record)}</time>
          <span className="archive-preview-arrow" aria-hidden="true">↗</span>
        </a>
      </li>
    })}</ol>
    <figure className="archive-preview-stage">
      <a className="archive-preview-image" href={albumStudyHref(first)} onClick={enter} aria-label={`${first.title} — 기록 보기`}>
        <img src={image.src} width={image.width} height={image.height} data-preview-aspect={image.width / image.height} alt={first.title} loading="lazy" decoding="async" />
        <div className="archive-preview-canvas" aria-hidden="true" />
      </a>
      <figcaption><span data-preview-caption="">{first.title}</span><span data-preview-year="">{workDate(first)}</span></figcaption>
    </figure>
  </div>
}
