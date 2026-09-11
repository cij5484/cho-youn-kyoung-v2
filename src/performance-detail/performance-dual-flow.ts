import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const clamp = (n: number) => Math.max(0, Math.min(1, n))
const smooth = (n: number) => { const p = clamp(n); return p * p * (3 - 2 * p) }

/** Opposing, phase-offset sine fields; both resolve to a quiet paired composition. */
export function dualFlowPosition(progress: number, index: number, side: number) {
  const p = clamp(progress), settle = smooth((p - .86) / .14)
  const phase = index * .82 + p * Math.PI * (side === 1 ? 3.2 : -2.6) - Math.PI / 2
  return {
    x: side * (.5 + Math.sin(phase) * .5) * (1 - settle),
    y: Math.cos(phase * .7) * 22 * (1 - settle),
    settle,
  }
}

export function mountPerformanceDualFlow(owner: HTMLElement) {
  if (!location.hash) window.scrollTo({ top: 0, behavior: 'instant' })
  gsap.registerPlugin(ScrollTrigger)
  const media = gsap.matchMedia()
  media.add('(prefers-reduced-motion: no-preference)', () => {
    owner.dataset.dual = 'ready'
    const stage = owner.querySelector<HTMLElement>('.performance-scroll-stage')!
    const scenes = [...owner.querySelectorAll<HTMLElement>('[data-performance-scene]')]
    const links = [...owner.querySelectorAll<HTMLAnchorElement>('[data-chapter-link]')]
    const flows = [...owner.querySelectorAll<HTMLElement>('[data-dual-flow]')]
    const rings = [...owner.querySelectorAll<SVGGraphicsElement>('[data-dual-ring]')]
    const anchors = scenes.map(scene => [...scene.querySelectorAll<HTMLElement>('[data-album-anchor]')]
      .map(element => ({ element, kind: element.dataset.albumAnchor! })))
    let range = 0, active = -1
    const measure = () => { range = Math.min(owner.clientWidth * .17, 230) }
    measure()
    const clock = { progress: 0 }
    function draw() {
      const p = clock.progress, cursor = Math.min(scenes.length - 1, p * (scenes.length - .3))
      const index = Math.round(cursor)
      scenes.forEach((scene, i) => {
        const distance = i - cursor
        gsap.set(scene, { opacity: 1 - smooth((Math.abs(distance) - .22) / .6), y: distance * 70,
          scale: 1 - Math.min(.04, Math.abs(distance) * .04) })
      })
      flows.forEach((flow, side) => [...flow.children].forEach((item, i) => {
        const point = dualFlowPosition(p, i, side ? -1 : 1)
        gsap.set(item, { x: point.x * range, y: point.y })
      }))
      rings.forEach((ring, i) => {
        const point = dualFlowPosition(p, 2, i ? -1 : 1)
        gsap.set(ring, { x: point.x * 170, y: point.y * 2, rotation: (i ? -1 : 1) * p * 65,
          scale: 1 + Math.sin(p * Math.PI) * (i ? .16 : -.12), transformOrigin: '50% 50%' })
      })
      if (active === index) return
      active = index
      owner.dataset.chapter = String(index + 1)
      scenes.forEach((scene, i) => { scene.inert = i !== index })
      anchors.forEach((items, i) => items.forEach(({ element, kind }) => {
        if (i === index) element.dataset.albumAnchor = kind
        else delete element.dataset.albumAnchor
      }))
      links.forEach((link, i) => {
        if (i === index) link.setAttribute('aria-current', 'step')
        else link.removeAttribute('aria-current')
      })
    }
    const tween = gsap.to(clock, { progress: 1, ease: 'none', onUpdate: draw,
      scrollTrigger: { trigger: stage, start: 'top 70px', end: 'bottom bottom', scrub: .55,
        invalidateOnRefresh: true, onRefreshInit: measure } })
    function navigate(event: Event) {
      const index = scenes.findIndex(scene => `#${scene.id}` === (event.currentTarget as HTMLAnchorElement).hash)
      const trigger = tween.scrollTrigger
      if (index < 0 || !trigger) return
      event.preventDefault()
      const p = index === scenes.length - 1 ? 1 : index / (scenes.length - .3)
      window.scrollTo({ top: trigger.start + (trigger.end - trigger.start) * p, behavior: 'instant' })
      trigger.getTween()?.progress(1); tween.progress(p); draw()
      scenes[index].focus({ preventScroll: true })
    }
    links.forEach(link => link.addEventListener('click', navigate))
    draw(); ScrollTrigger.refresh()
    return () => {
      links.forEach(link => { link.removeEventListener('click', navigate); link.removeAttribute('aria-current') })
      scenes.forEach(scene => { scene.inert = false })
      anchors.flat().forEach(({ element, kind }) => { element.dataset.albumAnchor = kind })
      delete owner.dataset.dual; delete owner.dataset.chapter
    }
  })
  return () => media.revert()
}
