import { useEffect, useId, useRef, type CSSProperties } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { timePathCheckpoint, timePathFrame, timePathGeometry } from './time-path.ts'

type TimeProgram = { year?: number; title: string; composer?: string; note?: string; shortNote?: string; instrumentation?: string }

/** One native scroll clock moves the object, drawn line, year navigation and editorial reading. */
export function TimePathProgram({ program }: { program: TimeProgram[] }) {
  const root = useRef<HTMLElement>(null)
  const uid = useId().replaceAll(':', '')
  const initial = timePathGeometry(1000, 600, program.length, false)

  useEffect(() => {
    if (!root.current || program.length < 2) return
    const owner = root.current
    gsap.registerPlugin(ScrollTrigger)
    const svg = owner.querySelector<SVGSVGElement>('.performance-time-map')!
    const paths = [...svg.querySelectorAll<SVGPathElement>('[data-time-segment]')]
    const line = svg.querySelector<SVGPathElement>('.performance-time-line')!
    const ink = svg.querySelector<SVGPathElement>('.performance-time-ink')!
    const object = svg.querySelector<SVGGElement>('.performance-time-object')!
    const landmarks = [...svg.querySelectorAll<SVGGElement>('.performance-time-landmark')]
    const entries = [...owner.querySelectorAll<HTMLElement>('.performance-time-entry')]
    const buttons = [...owner.querySelectorAll<HTMLButtonElement>('[data-time-year]')]
    const media = gsap.matchMedia()
    media.add('(prefers-reduced-motion: no-preference)', () => {
      owner.dataset.motion = 'active'
      let lengths: number[] = [], total = 1, width = 1000, height = 600, progress = 0
      function render(value: number) {
        progress = value
        const frame = timePathFrame(value, program.length)
        const distance = lengths[frame.segment] * frame.along
        const point = paths[frame.segment].getPointAtLength(distance)
        const before = paths[frame.segment].getPointAtLength(Math.max(0, distance - 1))
        const after = paths[frame.segment].getPointAtLength(Math.min(lengths[frame.segment], distance + 1))
        const angle = Math.atan2(after.y - before.y, after.x - before.x) * 180 / Math.PI
        object.setAttribute('transform', `translate(${point.x} ${point.y}) rotate(${angle})`)
        const drawn = lengths.slice(0, frame.segment).reduce((sum, length) => sum + length, 0) + distance
        ink.style.strokeDashoffset = String(total - drawn)
        const zoom = 1 + (owner.clientWidth < 700 ? 1.15 : .65) * (1 - frame.overview)
        const viewWidth = width / zoom, viewHeight = height / zoom
        const x = Math.max(0, Math.min(width - viewWidth, point.x - viewWidth * .5))
        const y = Math.max(0, Math.min(height - viewHeight, point.y - viewHeight * .5))
        svg.setAttribute('viewBox', `${x} ${y} ${viewWidth} ${viewHeight}`)
        owner.dataset.overview = String(frame.overview > .65)
        owner.style.setProperty('--time-overview', String(frame.overview))
        entries.forEach((entry, index) => {
          const visible = index === frame.active || frame.overview > .65
          entry.dataset.active = String(index === frame.active)
          entry.setAttribute('aria-hidden', String(!visible))
        })
        buttons.forEach((button, index) => {
          if (index === frame.active) button.setAttribute('aria-current', 'step')
          else button.removeAttribute('aria-current')
        })
        landmarks.forEach((landmark, index) => { landmark.dataset.active = String(index <= frame.active) })
      }
      function measure() {
        width = Math.max(1, svg.clientWidth)
        height = Math.max(1, svg.clientHeight)
        const geometry = timePathGeometry(width, height, program.length, owner!.clientWidth < 700)
        geometry.segments.forEach((d, index) => paths[index].setAttribute('d', d))
        line.setAttribute('d', geometry.path); ink.setAttribute('d', geometry.path)
        lengths = paths.map(path => path.getTotalLength())
        total = lengths.reduce((sum, length) => sum + length, 0)
        ink.style.strokeDasharray = String(total)
        geometry.anchors.forEach((point, index) => landmarks[index].setAttribute('transform', `translate(${point.x} ${point.y})`))
        render(progress)
      }
      measure()
      const trigger = ScrollTrigger.create({ trigger: owner, start: 'top 70px', end: 'bottom bottom', invalidateOnRefresh: true,
        onUpdate: self => render(self.progress), onRefresh: self => { progress = self.progress; measure() },
      })
      function navigate(event: Event) {
        const index = Number((event.currentTarget as HTMLButtonElement).dataset.timeYear)
        window.scrollTo({ top: trigger.start + (trigger.end - trigger.start) * timePathCheckpoint(index, program.length), behavior: 'instant' })
        render(timePathCheckpoint(index, program.length))
      }
      buttons.forEach(button => button.addEventListener('click', navigate))
      const observer = new ResizeObserver(measure)
      observer.observe(svg)
      return () => {
        observer.disconnect(); trigger.kill()
        buttons.forEach(button => { button.removeEventListener('click', navigate); button.removeAttribute('aria-current') })
        owner.dataset.motion = 'static'; delete owner.dataset.overview
        owner.style.removeProperty('--time-overview')
        entries.forEach(entry => { delete entry.dataset.active; entry.removeAttribute('aria-hidden') })
        svg.setAttribute('viewBox', `0 0 ${width} ${height}`)
        ink.style.strokeDashoffset = '0'
      }
    })
    return () => media.revert()
  // Only the program identity changes this owner, never a scroll frame.
  }, [program])

  return <section ref={root} id="performance-program" className="performance-time-path" data-motion="static" style={{ '--time-count': program.length } as CSSProperties} aria-labelledby={`${uid}-title`}>
    <div className="performance-time-stage">
      <header className="performance-time-header"><p className="performance-kicker">PROGRAM</p><h2 id={`${uid}-title`}>곡목</h2></header>
      <nav className="performance-time-nav" aria-label="프로그램 연도">{program.map((work, index) => <button key={`${work.year}-${work.title}`} type="button" data-time-year={index} onClick={() => {
        if (root.current?.dataset.motion !== 'active') root.current?.querySelectorAll('.performance-time-entry')[index]?.scrollIntoView({ block: 'center', behavior: 'instant' })
      }}>{work.year ?? String(index + 1).padStart(2, '0')}</button>)}</nav>
      <svg className="performance-time-map" viewBox="0 0 1000 600" aria-hidden="true">
        <defs>{initial.segments.map((d, index) => <path key={index} d={d} data-time-segment/>)}</defs>
        <path className="performance-time-line" d={initial.path} fill="none" vectorEffect="non-scaling-stroke"/>
        <path className="performance-time-ink" d={initial.path} fill="none" vectorEffect="non-scaling-stroke"/>
        {program.map((work, index) => <g key={`${work.year}-${work.title}`} className="performance-time-landmark" transform={`translate(${initial.anchors[index].x} ${initial.anchors[index].y})`}>
          <circle r="3"/><text x="0" y="-18" textAnchor="middle">{work.year}</text>
        </g>)}
        <g className="performance-time-object" transform={`translate(${initial.anchors[0]?.x ?? 0} ${initial.anchors[0]?.y ?? 0})`}><circle r="9"/><path d="M -20 0 H 20" fill="none" vectorEffect="non-scaling-stroke"/></g>
      </svg>
      <div className="performance-time-readings">{program.map(work => <article className="performance-time-entry" key={`${work.year}-${work.title}`}>
        <p className="performance-time-year">{work.year}</p><h3>{work.title}</h3>
        {work.composer && <p className="performance-time-composer">작곡 {work.composer}</p>}
        {(work.shortNote ?? work.note) && <p className="performance-time-note">{work.shortNote ?? work.note}</p>}
        {work.instrumentation && <p className="performance-time-instrumentation">{work.instrumentation}</p>}
      </article>)}</div>
    </div>
  </section>
}
