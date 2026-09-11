import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/** Paired rectangles, bottom to top; the Codrops horizontal-blinds geometry. */
export const blindFrames = Array.from({ length: 60 }, (_, index) => {
  const center = 1 - (Math.floor(index / 2) + .5) / 30
  return { fromY: center, y: index % 2 === 0 ? center - 1 / 60 : center, height: 1 / 60 + .0001 }
})

/** Source mechanics: Hiro-kiii/Scroll-Transition, js/script.js (MIT).
 * Native scroll supplies progress; no wheel interception or second scroll clock.
 */
export function mountPerformanceMask(owner: HTMLElement) {
  // Router's deferred scroll reset must not seed the scrub with the outgoing WORKS scroll.
  // Preserve explicit fragment entry; ordinary detail entry starts at its shared poster.
  if (!window.location.hash) window.scrollTo({ top: 0, behavior: 'instant' })
  gsap.registerPlugin(ScrollTrigger)
  const stage = owner.querySelector<HTMLElement>('.performance-scroll-stage')!
  const scenes = [...owner.querySelectorAll<HTMLElement>('[data-performance-scene]')]
  const links = [...owner.querySelectorAll<HTMLAnchorElement>('[data-chapter-link]')]
  const media = gsap.matchMedia()
  media.add('(prefers-reduced-motion: no-preference)', () => {
    owner.dataset.mask = 'ready'
    const copy = scenes.map(scene => scene.querySelector<HTMLElement>('[data-scene-copy]'))
    const anchors = scenes.map(scene => [...scene.querySelectorAll<HTMLElement>('[data-album-anchor]')]
      .map(element => ({ element, kind: element.dataset.albumAnchor! })))
    function activate(index: number) {
      scenes.forEach((scene, i) => { scene.inert = i !== index })
      anchors.forEach((items, i) => items.forEach(({ element, kind }) => {
        if (i === index) element.dataset.albumAnchor = kind
        else delete element.dataset.albumAnchor
      }))
    }
    const timeline = gsap.timeline({ scrollTrigger: {
      trigger: stage, start: 'top 70px', end: 'bottom bottom', scrub: .65,
      invalidateOnRefresh: true,
    } })
    const arrivals = [0]
    timeline.addLabel('chapter-0', 0).to({}, { duration: .25 })
    scenes.slice(1).forEach((scene, offset) => {
      const index = offset + 1
      const rects = [...owner.querySelectorAll<SVGRectElement>(`[data-mask-for="${scene.id}"] rect`)]
      gsap.set(rects, { attr: { y: (i: number) => blindFrames[i].fromY, height: 0 } })
      if (copy[index]) gsap.set(copy[index], { clipPath: 'inset(100% 0% 0% 0%)', y: 40 })
      const start = timeline.duration()
      if (copy[index - 1]) timeline.to(copy[index - 1], {
        clipPath: 'inset(0% 0% 100% 0%)', y: -30, duration: .65, ease: 'power2.inOut',
      }, start)
      timeline.to(rects, {
        attr: { y: (i: number) => blindFrames[i].y, height: (i: number) => blindFrames[i].height },
        duration: .5, ease: 'power3.out', stagger: { each: .02, from: 'start' },
      }, start + .12)
      const open = timeline.duration()
      if (copy[index]) timeline.to(copy[index], {
        clipPath: 'inset(0% 0% 0% 0%)', y: 0, duration: .8, ease: 'expo.out',
      }, open - .3)
      arrivals.push(start + .12 + .9)
      timeline.addLabel(`chapter-${index}`).to({}, { duration: .25 })
    })
    let active = -1
    timeline.eventCallback('onUpdate', () => {
      const time = timeline.time()
      const index = arrivals.reduce((current, arrival, i) => time >= arrival ? i : current, 0)
      if (index === active) return
      active = index
      owner.dataset.chapter = String(index + 1)
      activate(index)
      links.forEach((link, i) => {
        if (i === index) link.setAttribute('aria-current', 'step')
        else link.removeAttribute('aria-current')
      })
    })
    activate(0)
    owner.dataset.chapter = '1'
    links[0]?.setAttribute('aria-current', 'step')
    function navigate(event: Event) {
      event.preventDefault()
      const target = event.currentTarget as HTMLAnchorElement
      const index = scenes.findIndex(scene => `#${scene.id}` === target.hash)
      const trigger = timeline.scrollTrigger
      if (index < 0 || !trigger) return
      const time = timeline.labels[`chapter-${index}`]
      window.scrollTo({ top: trigger.start + (trigger.end - trigger.start) * time / timeline.duration(), behavior: 'instant' })
      // Chapter links are explicit navigation, so settle immediately for keyboard focus.
      trigger.getTween()?.progress(1)
      timeline.time(time)
      scenes[index].focus({ preventScroll: true })
    }
    links.forEach(link => link.addEventListener('click', navigate))
    ScrollTrigger.refresh()
    return () => {
      links.forEach(link => link.removeEventListener('click', navigate))
      scenes.forEach(scene => { scene.inert = false })
      anchors.flat().forEach(({ element, kind }) => { element.dataset.albumAnchor = kind })
      links.forEach(link => link.removeAttribute('aria-current'))
      delete owner.dataset.mask; delete owner.dataset.chapter
    }
  })
  return () => media.revert()
}
