import { useEffect, useRef } from 'react'
import { workImages } from '../assets.ts'
import { workDate, worksCatalog } from '../catalog.ts'
import './editorial.css'

/** DOM owns layout, reading order and links. WebGL is a disposable image enhancement. */
export function WebglEditorial() {
  const root = useRef<HTMLElement>(null)
  useEffect(() => {
    const host = root.current
    if (!host) return
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let dispose: (() => void) | undefined
    let generation = 0
    let stopped = false
    const configure = async () => {
      const ownGeneration = ++generation
      dispose?.()
      dispose = undefined
      host.dataset.state = motion.matches ? 'fallback' : 'loading'
      host.dataset.static = String(motion.matches)
      host.dataset.renderState = motion.matches ? 'reduced-motion' : 'loading'
      if (motion.matches) return
      try {
        const { createEditorialEngine } = await import('./editorial-engine.ts')
        if (stopped || ownGeneration !== generation) return
        dispose = createEditorialEngine(host)
      } catch {
        if (stopped || ownGeneration !== generation) return
        host.dataset.state = 'fallback'
        host.dataset.static = 'true'
        host.dataset.renderState = 'unavailable'
      }
    }
    void configure()
    motion.addEventListener('change', configure)
    return () => {
      stopped = true
      generation++
      motion.removeEventListener('change', configure)
      dispose?.()
    }
  }, [])

  return <section ref={root} className="works-editorial" data-state="loading" data-natural="true"
    data-progress="0" data-render-state="loading" aria-labelledby="works-editorial-title" lang="ko">
    <header className="works-editorial-heading">
      <div className="works-editorial-heading-line"><span lang="en">CHO YOUN KYOUNG</span>
        <a href="#works-compact-archive" lang="en">INDEX <span aria-hidden="true">↘</span></a></div>
      <h1 id="works-editorial-title" lang="en">Collected<br /><em>resonance.</em></h1>
      <p>음반과 무대의 기록<span lang="en">2020 — 2026</span></p>
    </header>
    <ol className="works-editorial-grid">
      {worksCatalog.map((record, index) => {
        const image = workImages[record.image]
        return <li key={record.id} className="works-editorial-item" data-kind={record.type} data-position={index + 1}>
          <figure>
            <a className="works-editorial-link" href={record.referenceUrl} data-record-id={record.id}
              aria-label={`${record.title} — 기존 사이트에서 기록 보기`}>
              <div className="works-editorial-image" style={{ aspectRatio: `${image.width} / ${image.height}` }}>
                <img src={image.src} width={image.width} height={image.height} decoding="async"
                  loading={index < 2 ? 'eager' : 'lazy'}
                  alt={`${record.title} ${record.type === 'album' ? '음반 표지' : '공연 포스터'}`} />
              </div>
              <figcaption>
                <span className="works-editorial-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                <div><h2>{record.title}</h2><p><time dateTime={'date' in record ? record.date : String(record.year)}>{workDate(record)}</time>
                  <span lang="en">{record.type === 'album' ? 'ALBUM' : 'PERFORMANCE'}</span></p></div>
                <span className="works-editorial-arrow" aria-hidden="true">↗</span>
              </figcaption>
            </a>
          </figure>
        </li>
      })}
    </ol>
    <div className="works-editorial-resolution" aria-hidden="true"><span lang="en">Every sound,<br /><em>a trace.</em></span><span>↓</span></div>
  </section>
}
