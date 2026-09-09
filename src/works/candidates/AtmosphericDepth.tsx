import { useEffect, useRef, useState } from 'react'
import { worksCatalog, workDate } from '../catalog.ts'
import { workImages } from '../assets.ts'
import './atmospheric.css'

/** A owns camera, shader, input response and lifecycle independently. */
export function AtmosphericDepth() {
  const root = useRef<HTMLElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const canvasHost = useRef<HTMLDivElement>(null)
  const [state, setState] = useState<'loading' | 'ready' | 'fallback'>('loading')
  const [reason, setReason] = useState('')
  const [focus, setFocus] = useState(0)
  const [archive, setArchive] = useState(false)
  const active = worksCatalog[focus]

  useEffect(() => {
    const reduced = matchMedia('(prefers-reduced-motion: reduce)')
    const mobile = matchMedia('(max-width: 700px)')
    let disposed = false
    let generation = 0
    let engine: { dispose: () => void } | null = null
    let currentCanvas: HTMLCanvasElement | null = null
    const release = () => { engine?.dispose(); engine = null; currentCanvas?.remove(); currentCanvas = null }
    const start = async () => {
      const attempt = ++generation
      release()
      if (reduced.matches) { setState('fallback'); setReason('reduced-motion'); return }
      setState('loading'); setReason('')
      try {
        const { createAtmosphericEngine } = await import('./atmospheric-engine.ts')
        if (disposed || attempt !== generation || !root.current || !stage.current || !canvasHost.current) return
        currentCanvas = document.createElement('canvas')
        currentCanvas.className = 'atmospheric-canvas'; currentCanvas.setAttribute('aria-hidden', 'true')
        canvasHost.current.append(currentCanvas)
        engine = createAtmosphericEngine({
          canvas: currentCanvas, root: root.current, stage: stage.current,
          region: root.current.closest<HTMLElement>('.works-prototype-host') ?? root.current,
          images: workImages, mobile: mobile.matches,
          onReady: () => { if (!disposed && generation === attempt) setState('ready') },
          onFocus: (index, resolved) => { if (!disposed && generation === attempt) { setFocus(index); setArchive(resolved) } },
          onFailure: failure => { if (!disposed && generation === attempt) { setState('fallback'); setReason(failure) } },
        })
      } catch {
        if (!disposed && generation === attempt) { release(); setState('fallback'); setReason('engine-unavailable') }
      }
    }
    const restart = () => { void start() }
    void start()
    reduced.addEventListener('change', restart); mobile.addEventListener('change', restart)
    return () => { disposed = true; generation++; reduced.removeEventListener('change', restart); mobile.removeEventListener('change', restart); release() }
  }, [])

  return <section ref={root} className="atmospheric-depth" data-state={state} data-static={state === 'fallback' ? 'true' : undefined}
    data-fallback-reason={reason || undefined} aria-labelledby="atmospheric-title">
    <div ref={stage} className="atmospheric-stage">
      <div ref={canvasHost} className="atmospheric-canvas-host" aria-hidden="true" />
      <header className="atmospheric-heading">
        <p lang="en">CHO YOUN KYOUNG</p>
        <h1 id="atmospheric-title" lang="en">Works<span aria-hidden="true">.</span></h1>
      </header>
      {state === 'fallback' ? <div className="atmospheric-static">
        <img src={workImages.yeongsan.src} width={workImages.yeongsan.width} height={workImages.yeongsan.height} alt="조윤경 해금정악 — 영산회상 음반 표지" />
        <p>음반과 무대의 기록</p>
      </div> : <div className="atmospheric-caption" data-archive={archive}>
        <p className="atmospheric-type" lang="en">{archive ? 'RECORDINGS / PERFORMANCES' : active.type === 'album' ? 'RECORDING' : 'PERFORMANCE'}</p>
        <h2>{archive ? '음반과 무대의 기록' : active.title}</h2>
        {!archive && <p className="atmospheric-date">{workDate(active)}</p>}
        {!archive && <a className="atmospheric-record" href={active.referenceUrl} aria-label={`${active.title} — 기존 사이트에서 기록 보기`}>기록 보기 <span aria-hidden="true">↗</span></a>}
      </div>}
      <span className="atmospheric-count" aria-hidden="true">{String(focus + 1).padStart(2, '0')}<span>/</span>06</span>
      <a className="atmospheric-index" href="#works-compact-archive"><span lang="en">INDEX</span><span aria-hidden="true">↘</span></a>
    </div>
  </section>
}
