import { gsap } from 'gsap'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import { portraitHelix, portraitStrip } from './portrait-flow-model'

export function mountPortraitFlow(owner: HTMLElement) {
  gsap.registerPlugin(MotionPathPlugin)
  const stage = owner.querySelector<HTMLElement>('.about-stage')!
  const cards = [...owner.querySelectorAll<HTMLElement>('.about-portrait')]
  const chapters = [...owner.querySelectorAll<HTMLElement>('.about-chapter')]
  const button = owner.querySelector<HTMLButtonElement>('.about-open')!
  const buttons = cards.map(card => card.querySelector<HTMLButtonElement>('button')!)
  const shortcut = owner.querySelector<HTMLAnchorElement>('.about-topline a')!
  const reduced = matchMedia('(prefers-reduced-motion: reduce)')
  let state: 'idle' | 'opening' | 'open' = 'idle'
  let timeline: gsap.core.Timeline | undefined
  let active = -1, width = 0, height = 0
  owner.dataset.motion = 'active'
  owner.dataset.state = state

  const strip = (index: number) => portraitStrip(index, cards.length, width, height, Number(cards[index].style.getPropertyValue('--portrait-aspect')))
  function highlight() {
    if (state !== 'open') return
    let current = 0
    chapters.forEach((chapter, index) => { if (chapter.getBoundingClientRect().top < innerHeight * .5) current = index })
    if (current === active) return
    active = current
    cards.forEach((card, index) => { card.dataset.active = String(index === Math.round(current * (cards.length - 1) / (chapters.length - 1))) })
    owner.dataset.chapter = String(current + 1)
  }
  function finish() {
    state = 'open'; owner.dataset.state = state
    cards.forEach((card, index) => gsap.set(card, { ...strip(index), opacity: 1 }))
    buttons.forEach((control, index) => { control.disabled = false; control.setAttribute('aria-label', `사진 ${index + 1} 크게 보기`) })
    highlight()
  }
  function build(origin?: DOMRect) {
    timeline?.kill()
    const mobile = width < 700
    const bounds = origin ? stage.getBoundingClientRect() : null
    cards.forEach((card, index) => {
      buttons[index].disabled = index !== 0
      const aspect = Number(card.style.getPropertyValue('--portrait-aspect'))
      const scale = Math.min(height * (mobile ? .4 : .63) * aspect / 200, width * (mobile ? .65 : .35) / 200)
      gsap.set(card, { xPercent: -50, yPercent: -50, x: mobile ? 0 : width * .22, y: mobile ? height * .10 : 0,
        z: 0, rotationX: 0, rotationY: 0, scale: index === 0 ? scale : .1, opacity: index === 0 ? 1 : 0 })
      if (index === 0 && origin && bounds) gsap.set(card, { x: origin.x + origin.width / 2 - bounds.x - width / 2,
        y: origin.y + origin.height / 2 - bounds.y - height / 2, scale: origin.width / 200 })
    })
    timeline = gsap.timeline({ paused: true, onComplete: finish })
    cards.forEach((card, index) => {
      const aspect = Number(card.style.getPropertyValue('--portrait-aspect'))
      const scale = Math.min(width * (mobile ? .24 : .15) / 200, height * .19 * aspect / 200)
      timeline!.to(card, { ...portraitHelix(index, cards.length, width, height), scale, rotationX: -8, opacity: 1,
        duration: 1.05, ease: 'expo.out' }, index * .025)
      // A short orbital turn reveals depth and radial orientation before ordering.
      const turn = portraitHelix(index, cards.length, width, height, .65)
      const before = portraitHelix(index, cards.length, width, height).rotationY
      const rotationY = before + ((turn.rotationY - before + 540) % 360 - 180)
      timeline!.to(card, { ...turn, rotationY, duration: .65, ease: 'sine.inOut' }, 1.35)
      const target = strip(index)
      timeline!.to(card, { motionPath: { path: [{ x: target.x - width * .07, y: target.y + (index % 2 ? 22 : -22) }, { x: target.x, y: target.y }], curviness: .45 },
        z: 0, rotationY: 0, rotationX: 0, scale: target.scale, duration: .95, ease: 'power3.inOut' }, 2 + index * .018)
    })
  }
  function measure() {
    const bounds = stage.getBoundingClientRect()
    if (width === bounds.width && height === bounds.height) return
    width = bounds.width; height = bounds.height
    if (state === 'open') { cards.forEach((card, index) => gsap.set(card, strip(index))); return }
    const time = timeline?.time() ?? 0
    build()
    if (state === 'opening') timeline!.time(time).play()
  }
  function open(event?: Event) {
    if (state !== 'idle') return
    event?.stopPropagation()
    const origin = width <= 700 ? cards[0].getBoundingClientRect() : undefined
    state = 'opening'; owner.dataset.state = state
    if (origin) {
      // The flowing mobile introduction becomes the existing viewport stage without moving the photo first.
      const bounds = stage.getBoundingClientRect()
      width = bounds.width; height = bounds.height
      build(origin)
    }
    buttons.forEach(control => { control.disabled = true }); button.setAttribute('aria-expanded', 'true')
    if (reduced.matches) finish()
    else timeline!.play(0)
    chapters[0].focus({ preventScroll: true })
  }
  function skip() {
    if (state === 'idle') open()
    timeline?.pause(); finish()
  }
  function reduce() { if (reduced.matches && state === 'opening') { timeline?.pause(); finish() } }
  measure()
  const observer = new ResizeObserver(measure)
  observer.observe(stage)
  button.addEventListener('click', open)
  shortcut.addEventListener('click', skip)
  reduced.addEventListener('change', reduce)
  window.addEventListener('scroll', highlight, { passive: true })
  let anchorFrame = 0
  if (location.hash === '#about-career') {
    skip()
    anchorFrame = requestAnimationFrame(() => owner.querySelector('#about-career')?.scrollIntoView())
  }
  return () => {
    cancelAnimationFrame(anchorFrame)
    observer.disconnect(); timeline?.kill()
    button.removeEventListener('click', open); shortcut.removeEventListener('click', skip)
    reduced.removeEventListener('change', reduce); window.removeEventListener('scroll', highlight)
    buttons.forEach(control => { control.disabled = false }); button.setAttribute('aria-expanded', 'false'); button.setAttribute('aria-label', 'Open')
    gsap.set(cards, { clearProps: 'transform,opacity' })
    cards.forEach(card => delete card.dataset.active)
    owner.dataset.motion = 'static'; delete owner.dataset.state; delete owner.dataset.chapter
  }
}
