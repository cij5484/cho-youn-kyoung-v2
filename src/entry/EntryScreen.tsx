import { lazy, Suspense, useEffect, useRef, useState, type CSSProperties } from 'react'
import portrait from '../about/assets/portrait-35.webp'
import { twoPointContract } from '../signature/two-point-contract.ts'
import { createTrailSampler, type TrailSample } from '../motion/trail-geometry.ts'
import { freePoint, project } from '../interaction-prototype/model.ts'
import { type Edition } from './mode-routing.ts'
import type { SculptureHandle } from './EntrySculpture.tsx'

const Sculpture = lazy(() => import('./EntrySculpture.tsx'))

function SignaturePoints({ active }: { active: boolean }) {
  const canvas = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    if (!active) return
    const element = canvas.current!, context = element.getContext('2d')!
    const reduced = matchMedia('(prefers-reduced-motion: reduce)')
    const { moving, points, order } = twoPointContract
    const samples: TrailSample[] = Array.from({ length: 121 }, () => ({ x: 0, y: 0, z: 0, time: 0 }))
    const sampler = createTrailSampler()
    let frame = 0, elapsed = 0, previous = 0, width = 0, height = 0
    const draw = (now: number) => {
      elapsed += previous ? Math.min(40, now - previous) : 0; previous = now
      context.clearRect(0, 0, width, height)
      order.forEach((id, index) => {
        context.strokeStyle = context.fillStyle = points[id].color
        if (reduced.matches) {
          const p = project(freePoint(0, index), width, height)
          const marker = twoPointContract.static[width < 700 ? 'mobile' : 'desktop']
          context.globalAlpha = twoPointContract.static.opacity
          context.beginPath(); context.ellipse(p.x, p.y, marker.width / 2, marker.height / 2, 0, 0, Math.PI * 2); context.fill()
          return
        }
        // Keep the ENTRY trajectory; render its history with HOME's headless, tapered tail.
        samples.forEach((sample, step) => {
          const time = elapsed - moving.trailMs * (1 - step / (samples.length - 1))
          const point = freePoint(time / 1000 * (index ? .58 : 1), index)
          Object.assign(sample, project(point, width, height), { z: point.z, time })
        })
        sampler.resample(samples, 2)
        for (let j = 1; j < sampler.count; j++) {
          const a = sampler.points[j - 1], b = sampler.points[j]
          const age = Math.max(0, 1 - (elapsed - (a.time + b.time) / 2) / moving.trailMs)
          context.globalAlpha = Math.pow(age, moving.fadeExponent) * moving.opacity
          context.lineWidth = Math.max(moving.widthRange[0], moving.trailWidth * age * (.8 + b.z * .2))
          context.lineCap = 'round'
          context.beginPath(); context.moveTo(a.x, a.y); context.lineTo(b.x, b.y); context.stroke()
        }
      })
      if (!reduced.matches && !document.hidden) frame = requestAnimationFrame(draw)
    }
    const resume = () => { cancelAnimationFrame(frame); previous = 0; if (!document.hidden) frame = requestAnimationFrame(draw) }
    const resize = new ResizeObserver(() => {
      width = element.clientWidth; height = element.clientHeight
      const dpr = Math.min(devicePixelRatio, 2)
      element.width = Math.round(width * dpr); element.height = Math.round(height * dpr)
      context.setTransform(dpr, 0, 0, dpr, 0, 0); resume()
    })
    resize.observe(element)
    document.addEventListener('visibilitychange', resume); reduced.addEventListener('change', resume)
    return () => { cancelAnimationFrame(frame); resize.disconnect(); document.removeEventListener('visibilitychange', resume); reduced.removeEventListener('change', resume) }
  }, [active])
  return <canvas ref={canvas} className="entry-signature" aria-hidden="true"/>
}

export default function EntryScreen({ prepare, finish }: { prepare: (mode: Edition, signal: AbortSignal) => Promise<void>; finish: () => void }) {
  const [active, setActive] = useState<Edition | null>(null), [loaded, setLoaded] = useState(false)
  const [entering, setEntering] = useState<Edition | null>(null), [error, setError] = useState('')
  const root = useRef<HTMLDivElement>(null), sculpture = useRef<SculptureHandle>(null)
  const running = useRef(false), alive = useRef(true), animations = useRef<Animation[]>([])
  const request = useRef<AbortController | null>(null)
  useEffect(() => { alive.current = true; const pending = animations.current; return () => { alive.current = false; request.current?.abort(); pending.forEach(animation => animation.cancel()) } }, [])
  const preview = (mode: Edition) => { if (running.current) return; setActive(mode); if (mode === 'immersive') setLoaded(true) }
  const enter = async (mode: Edition) => {
    if (running.current) return
    preview(mode); running.current = true; setEntering(mode); setError('')
    request.current = new AbortController()
    try {
      // Mount/preload the selected app beneath the current visual before travelling through it.
      await prepare(mode, request.current.signal)
      if (!alive.current) return
      const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
      if (mode === 'immersive' && sculpture.current && !reduced) await sculpture.current.enter()
      else {
        const object = root.current!.querySelector(mode === 'classic' ? '.entry-classic-portrait' : '.entry-world')!
        const bounds = object.getBoundingClientRect()
        const animation = object.animate([{ transform: 'translate(0,0) scale(1)' },
          { transform: `translate(${innerWidth / 2 - bounds.x - bounds.width / 2}px,${innerHeight / 2 - bounds.y - bounds.height / 2}px) scale(${Math.max(innerWidth / bounds.width, innerHeight / bounds.height) * 1.06})` }],
        { duration: reduced ? 0 : 850, easing: 'cubic-bezier(.65,0,.2,1)', fill: 'forwards' })
        animations.current.push(animation); await animation.finished
      }
      if (!alive.current) return
      const dissolve = root.current!.animate([{ opacity: 1 }, { opacity: 0 }], { duration: reduced ? 0 : 380, fill: 'forwards' })
      animations.current.push(dissolve); await dissolve.finished
      if (alive.current) finish()
    } catch {
      if (alive.current) { setError('화면을 준비하지 못했습니다. 다시 ENTER를 눌러 주세요.'); setEntering(null); running.current = false }
    }
  }
  const choose = (mode: Edition) => { if (matchMedia('(min-width: 700px) and (hover: hover) and (pointer: fine)').matches) void enter(mode); else preview(mode) }
  return <div ref={root} className="entry-screen" data-active={active || 'balanced'} data-entering={entering || undefined}>
    <header className="entry-header"><span>CHO YOUN KYOUNG</span><span>HAEGEUM ARTIST</span></header>
    <main className="entry-split" onPointerLeave={() => { if (!running.current && matchMedia('(hover: hover)').matches) setActive(null) }}
      onBlur={event => { if (!running.current && !event.currentTarget.contains(event.relatedTarget)) setActive(null) }}>
      {(['classic', 'immersive'] as const).map((mode, index) => <section key={mode} className={`entry-side entry-${mode}`}
        onPointerEnter={event => { if (event.pointerType === 'mouse') preview(mode) }} onFocus={() => preview(mode)} aria-label={mode === 'classic' ? 'Classic — 사진과 기록' : 'Immersive — 공간과 음악'}>
        <div className="entry-world" aria-hidden="true">
          {mode === 'classic' ? <div className="entry-classic-portrait">{Array.from({ length: 7 }, (_, slice) => <div className="entry-slice" key={slice} style={{ '--slice': slice, clipPath: `inset(0 ${Math.max(0, 100 - (slice + 1) * 100 / 7 - .15)}% 0 ${Math.max(0, slice * 100 / 7 - .15)}%)` } as CSSProperties}><img src={portrait} alt="" decoding="async"/></div>)}</div>
            : <><SignaturePoints active={active === 'immersive'}/>{loaded && <Suspense fallback={null}><Sculpture ref={sculpture} active={active === 'immersive'}/></Suspense>}</>}
        </div>
        <button className="entry-choice" onClick={() => choose(mode)} disabled={Boolean(entering)} aria-label={`${mode === 'classic' ? 'Classic' : 'Immersive'} 미리보기`} aria-pressed={active === mode}>
          <span className="entry-choice-copy"><span className="entry-number">0{index + 1}</span><span className="entry-title">{mode === 'classic' ? 'Classic' : 'Immersive'}<i>.</i></span>
          <span className="entry-description">{mode === 'classic' ? '사진과 기록' : '공간과 음악'}</span></span>
        </button>
        <button className="entry-enter" onClick={() => void enter(mode)} disabled={Boolean(entering)} tabIndex={active === mode ? 0 : -1}>ENTER <span className="entry-enter-line" aria-hidden="true"/></button>
      </section>)}
    </main>
    <footer className="entry-footer"><span>조윤경</span><span role="status">{error || (entering ? '화면을 준비하고 있습니다.' : 'SELECT AN EXPERIENCE')}</span></footer>
  </div>
}
