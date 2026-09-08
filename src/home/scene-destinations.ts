import { soundFocusTarget } from '../sound/focus-frame.ts'

export const homeSceneIndex = [
  { id: 'hero', number: '01', label: '처음' },
  { id: 'haegeum', number: '02', label: '해금' },
  { id: 'sound', number: '03', label: '소리' },
  { id: 'works', number: '04', label: '작품' },
  { id: 'album', number: '05', label: '음반' },
  { id: 'performance', number: '06', label: '공연' },
  { id: 'artist', number: '07', label: '연주자' },
] as const
export type HomeSceneDestination = typeof homeSceneIndex[number]['id']

/** Values identify existing viewing frames. They never write the scene's own timeline. */
export const sceneDestinationFrames = { haegeum: .98, works: 0, performance: .315, artist: .88 } as const
export function sceneFrameTop(origin: number, travel: number, progress: number) {
  return origin + Math.max(0, travel) * Math.min(1, Math.max(0, progress))
}
export function sceneJumpState(distance: number, elapsed: number, stableFor: number, cancelled = false) {
  if (cancelled) return 'cancelled'
  if (Math.abs(distance) <= 2 && stableFor >= 80) return 'arrived'
  return elapsed > 2600 ? 'cancelled' : 'moving'
}

type Destination = { top: number; focus: HTMLElement }
const topOf = (element: HTMLElement) => scrollY + element.getBoundingClientRect().top

export function getSceneDestination(scene: HomeSceneDestination, host: ParentNode = document): Destination | null {
  const header = document.querySelector<HTMLElement>('.editorial-navigation')
  const clearance = Math.max(0, header?.getBoundingClientRect().bottom ?? 0)
  const poster = host.querySelector<HTMLElement>('.poster-scene')
  const staticScene = poster?.dataset.motion === 'reduced'
  const ordinary = (element: HTMLElement | null, focus = element): Destination | null => element && focus
    ? { top: Math.max(0, topOf(element) - clearance), focus } : null
  if (scene === 'hero') return poster ? { top: Math.max(0, topOf(poster)), focus: poster.querySelector<HTMLElement>('#artist-name') ?? poster } : null
  if (scene === 'haegeum') {
    if (!poster) return null
    if (staticScene) return ordinary(poster.querySelector<HTMLElement>('.instrument-static'))
    const stage = poster.querySelector<HTMLElement>('.poster-stage')
    const soundRegion = host.querySelector<HTMLElement>('.sound-region')
    if (!stage) return null
    // The SOUND region starts at the end of Haegeum's existing 155svh travel. Measuring it
    // preserves the real shared denominator, including short/mobile viewports.
    const travel = soundRegion?.offsetTop ?? poster.offsetHeight - stage.offsetHeight
    return { top: sceneFrameTop(topOf(poster), travel, sceneDestinationFrames.haegeum), focus: poster.querySelector<HTMLElement>('.instrument-static h2') ?? poster }
  }
  if (scene === 'sound') {
    const sound = host.querySelector<HTMLElement>('.sound-experience')
    if (!sound?.querySelector('.poster-scene .poster-stage')) return null
    // Deliberately no audio controller, LISTEN activation, or AudioContext call.
    return { top: soundFocusTarget(sound).top, focus: sound.querySelector<HTMLElement>('#sound-title') ?? sound }
  }
  if (scene === 'works') {
    const works = host.querySelector<HTMLElement>('#selected-works')
    if (!works) return null
    const focus = works.querySelector<HTMLElement>('#works-heading') ?? works
    return staticScene ? ordinary(works, focus) : { top: topOf(works), focus }
  }
  if (scene === 'album') {
    const album = host.querySelector<HTMLElement>('#album-object'), surface = album?.querySelector<HTMLElement>('.album-object-surface')
    if (!album || !surface) return null
    const usable = Math.max(1, innerHeight - clearance)
    // Center the actual interactive surface below navigation; preserve selected album and pose.
    return { top: Math.max(topOf(album) - clearance, topOf(surface) + surface.offsetHeight / 2 - (clearance + usable / 2)), focus: surface }
  }
  const sequence = host.querySelector<HTMLElement>('.stage-artist-sequence')
  const sticky = sequence?.querySelector<HTMLElement>('.stage-artist-sticky')
  if (!sequence || !sticky) return null
  const section = sequence.querySelector<HTMLElement>(scene === 'performance' ? '.performance-scene' : '.artist-scene')
  if (!section) return null
  const labelled = section.getAttribute('aria-labelledby')
  const focus = (labelled ? document.getElementById(labelled) : null) ?? section
  if (sequence.dataset.sequenceState === 'static') return ordinary(section, focus)
  return { top: sceneFrameTop(topOf(sequence), sequence.offsetHeight - sticky.offsetHeight, sceneDestinationFrames[scene]), focus }
}

let activeJump: (() => void) | null = null
export function cancelSceneJump() { activeJump?.() }

/** One short-lived native scroll owner shared by the public index and development panel. */
export function jumpToScene(scene: HomeSceneDestination, { host = document }: { host?: ParentNode } = {}) {
  cancelSceneJump()
  window.dispatchEvent(new CustomEvent('home:explicit-scroll'))
  const destination = getSceneDestination(scene, host)
  if (!destination) return false
  const top = Math.max(0, Math.min(destination.top, document.documentElement.scrollHeight - innerHeight))
  const started = performance.now(), reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
  let frame = 0, finished = false, previous = scrollY, movedAt = started
  const statusOwner = document.querySelector<HTMLElement>('.interaction-lab')
  if (statusOwner) { statusOwner.dataset.sceneJump = 'moving'; statusOwner.dataset.sceneJumpTarget = scene }
  function finish(success: boolean) {
    if (finished) return
    finished = true; cancelAnimationFrame(frame)
    window.removeEventListener('wheel', cancel, true); window.removeEventListener('touchstart', cancel, true)
    window.removeEventListener('pointerdown', cancel, true); window.removeEventListener('keydown', cancel, true)
    window.removeEventListener('home:explicit-scroll', cancel); window.removeEventListener('popstate', cancel)
    window.removeEventListener('hashchange', cancel); window.removeEventListener('resize', cancel)
    document.removeEventListener('visibilitychange', visibility)
    if (activeJump === cancel) activeJump = null
    if (!success) scrollTo({ top: scrollY, behavior: 'instant' })
    if (statusOwner) statusOwner.dataset.sceneJump = success ? 'arrived' : 'cancelled'
    if (success && destination) {
      const target = destination.focus, oldIndex = target.getAttribute('tabindex')
      if (oldIndex === null) target.setAttribute('tabindex', '-1')
      target.focus({ preventScroll: true })
      if (oldIndex === null) target.removeAttribute('tabindex')
    }
  }
  function cancel() { finish(false) }
  function visibility() { if (document.hidden) cancel() }
  function tick(now: number) {
    if (Math.abs(scrollY - previous) > .5) { previous = scrollY; movedAt = now }
    const result = sceneJumpState(top - scrollY, now - started, now - movedAt)
    if (result !== 'moving') return finish(result === 'arrived')
    frame = requestAnimationFrame(tick)
  }
  activeJump = cancel
  window.addEventListener('wheel', cancel, { passive: true, capture: true }); window.addEventListener('touchstart', cancel, { passive: true, capture: true })
  window.addEventListener('pointerdown', cancel, { passive: true, capture: true }); window.addEventListener('keydown', cancel, { capture: true })
  window.addEventListener('home:explicit-scroll', cancel); window.addEventListener('popstate', cancel)
  window.addEventListener('hashchange', cancel); window.addEventListener('resize', cancel)
  document.addEventListener('visibilitychange', visibility)
  scrollTo({ top, behavior: reduced ? 'instant' : 'smooth' })
  if (reduced) finish(true)
  else frame = requestAnimationFrame(tick)
  return true
}
