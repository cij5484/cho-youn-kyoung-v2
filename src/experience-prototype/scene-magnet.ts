import { soundFocusTarget } from '../sound/focus-frame.ts'
import { consumeMagnet, magnetSettlement, magnetTargetAt, magnetTuning, mayAlignMagnet, visitMagnet,
  type MagnetTarget, type MagnetVisit } from './scene-magnet-model.ts'

/** One optional native-scroll owner. No wheel interception, replacement scroll engine or idle RAF. */
export function createSceneMagnet(host: HTMLElement) {
  const sound = host.querySelector<HTMLElement>('.sound-experience')
  const sequence = host.querySelector<HTMLElement>('.stage-artist-sequence')
  const sticky = sequence?.querySelector<HTMLElement>('.stage-artist-sticky')
  const reduced = matchMedia('(prefers-reduced-motion: reduce)')
  const pointers = new Set<number>()
  let disposed = false, armed = false, touchCount = 0, frame = 0, timer = 0
  let lastInput = performance.now(), lastScroll = lastInput, lastRapid = -Infinity
  let previousScroll = scrollY, previousTime = lastInput
  let visit: MagnetVisit = { scene: null, consumed: false }
  let active: { target: MagnetTarget; started: number; lastTop: number; movedAt: number } | null = null

  function state(value: string) { host.dataset.sceneMagnet = value }
  function targets(): MagnetTarget[] {
    const result: MagnetTarget[] = []
    if (sound?.querySelector('.poster-scene .poster-stage') && sound.dataset.soundStatic !== 'true') {
      result.push({ scene: 'sound', top: soundFocusTarget(sound).top, radius: innerHeight * .16,
        leaveRadius: innerHeight * .34, ready: sound.dataset.soundReady === 'true' })
    }
    if (sequence && sticky && sequence.dataset.sequenceState !== 'static') {
      const travel = Math.max(1, sequence.offsetHeight - sticky.offsetHeight)
      result.push({ scene: 'performance', top: scrollY + sequence.getBoundingClientRect().top + travel * magnetTuning.performanceFrame,
        radius: innerHeight * .14, leaveRadius: innerHeight * .32, ready: true })
    }
    return result
  }
  function updateVisit(all = targets()) {
    visit = visitMagnet(visit, magnetTargetAt(all, scrollY, true)?.scene ?? null)
    if (visit.scene) host.dataset.magnetScene = visit.scene
    else delete host.dataset.magnetScene
  }
  function priority() {
    return !!document.querySelector('dialog[open]') || sound?.dataset.soundAlignment === 'aligning'
      || !!document.getSelection()?.toString() || !!document.activeElement?.closest('input, textarea, select, [contenteditable="true"]')
  }
  function zoomed() { return Math.abs((visualViewport?.scale ?? 1) - 1) > .01 }
  function insideComparison(event: Event) {
    return event.target instanceof Element && !!event.target.closest('.development-comparison')
  }
  function clearPending() { clearTimeout(timer); timer = 0 }
  function cancel(reason: string, consume = true) {
    clearPending()
    const owned = !!active
    active = null
    cancelAnimationFrame(frame); frame = 0
    if (consume) { updateVisit(); visit = consumeMagnet(visit) }
    // Freeze only this controller's own native animation. An explicit destination starts afterward.
    if (owned) scrollTo({ top: scrollY, behavior: 'instant' })
    state(reason)
  }
  function schedule() {
    clearPending()
    if (disposed || active || !armed || reduced.matches || document.hidden || pointers.size || touchCount) return
    const now = performance.now()
    const wait = Math.max(0, lastInput + magnetTuning.inputQuiet - now, lastScroll + magnetTuning.scrollQuiet - now)
    timer = window.setTimeout(consider, wait + 16)
  }
  function tick(now: number) {
    frame = 0
    if (!active || disposed) return
    if (priority() || reduced.matches || zoomed() || document.hidden || pointers.size || touchCount) return cancel('suspended')
    if (Math.abs(scrollY - active.lastTop) > .5) { active.lastTop = scrollY; active.movedAt = now }
    const settled = magnetSettlement(active.target.top - scrollY, now - active.started, now - active.movedAt)
    if (settled === 'cancelled') return cancel('cancelled')
    if (settled === 'aligned') {
      active = null; visit = consumeMagnet(visit); armed = false; state('aligned'); return
    }
    frame = requestAnimationFrame(tick)
  }
  function consider() {
    timer = 0
    if (disposed || active) return
    const all = targets(); updateVisit(all)
    const target = magnetTargetAt(all, scrollY), now = performance.now()
    if (!mayAlignMagnet({ target, visit, top: scrollY, now, lastInput, lastScroll, lastRapid,
      armed, held: !!pointers.size || !!touchCount, priority: priority(), reduced: reduced.matches,
      zoomed: zoomed(), hidden: document.hidden })) { state(reduced.matches ? 'reduced' : 'idle'); return }
    if (!target) return
    active = { target, started: now, lastTop: scrollY, movedAt: now }
    host.dataset.magnetTarget = target.top.toFixed(2)
    state('aligning')
    scrollTo({ top: target.top, behavior: 'smooth' })
    frame = requestAnimationFrame(tick)
  }
  function onScroll() {
    const now = performance.now(), delta = Math.abs(scrollY - previousScroll), elapsed = now - previousTime
    const speed = delta / Math.max(8, elapsed)
    lastScroll = now; previousScroll = scrollY; previousTime = now
    if (active) return
    updateVisit()
    if (speed >= magnetTuning.rapidSpeed) {
      lastRapid = now
      // A rapid crossing consumes this nearby visit, even if inertia later settles inside it.
      if (visit.scene) visit = consumeMagnet(visit)
    }
    schedule()
  }
  function onWheel(event: WheelEvent) {
    if (insideComparison(event)) { explicit(); return }
    lastInput = performance.now()
    if (active) cancel('cancelled')
    armed = !event.ctrlKey && !event.metaKey && Math.abs(event.deltaY) >= Math.abs(event.deltaX)
    if (!armed) { cancel('suspended'); return }
    schedule()
  }
  function onPointerDown(event: PointerEvent) {
    if (insideComparison(event)) { explicit(); return }
    pointers.add(event.pointerId); lastInput = performance.now()
    if (active) cancel('cancelled')
    clearPending()
    // Includes scrollbar drags and text selection; they can never arm automatic movement.
    armed = event.pointerType === 'touch' && pointers.size === 1
    if (!armed) cancel('suspended')
  }
  function onPointerUp(event: PointerEvent) {
    pointers.delete(event.pointerId); lastInput = performance.now(); schedule()
  }
  function onTouchStart(event: TouchEvent) {
    if (insideComparison(event)) { explicit(); return }
    touchCount = event.touches.length; lastInput = performance.now()
    if (active) cancel('cancelled')
    clearPending()
    if (touchCount > 1 || zoomed()) { armed = false; cancel('suspended') }
    else if (!visit.consumed) armed = true
  }
  function onTouchMove(event: TouchEvent) {
    if (insideComparison(event)) { explicit(); return }
    lastInput = performance.now()
  }
  function onTouchEnd(event: TouchEvent) {
    touchCount = event.touches.length; lastInput = performance.now(); schedule()
  }
  function explicit() {
    armed = false; lastInput = performance.now(); cancel('explicit')
  }
  function click(event: MouseEvent) {
    if ((event.target as Element | null)?.closest('a, .listen-trigger, .menu-toggle')) explicit()
  }
  function visibility() {
    if (document.hidden) { pointers.clear(); touchCount = 0; explicit() }
  }
  function preference() {
    armed = false; cancel(reduced.matches ? 'reduced' : 'idle')
  }
  function resize() { armed = false; cancel('suspended') }
  const menu = host.querySelector('dialog'), observer = new MutationObserver(() => {
    if (priority()) explicit()
  })
  if (menu) observer.observe(menu, { attributes: true, attributeFilter: ['open'] })
  if (sound) observer.observe(sound, { attributes: true, attributeFilter: ['data-sound-alignment'] })

  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('wheel', onWheel, { passive: true, capture: true })
  window.addEventListener('pointerdown', onPointerDown, { passive: true, capture: true })
  window.addEventListener('pointerup', onPointerUp, { passive: true })
  window.addEventListener('pointercancel', onPointerUp, { passive: true })
  window.addEventListener('touchstart', onTouchStart, { passive: true, capture: true })
  window.addEventListener('touchmove', onTouchMove, { passive: true })
  window.addEventListener('touchend', onTouchEnd, { passive: true })
  window.addEventListener('touchcancel', onTouchEnd, { passive: true })
  window.addEventListener('keydown', explicit, { capture: true })
  document.addEventListener('click', click, { capture: true })
  window.addEventListener('home:explicit-scroll', explicit)
  window.addEventListener('hashchange', explicit)
  window.addEventListener('popstate', explicit)
  window.addEventListener('pageshow', explicit)
  window.addEventListener('blur', explicit)
  window.addEventListener('resize', resize)
  visualViewport?.addEventListener('resize', resize)
  document.addEventListener('visibilitychange', visibility)
  reduced.addEventListener('change', preference)
  updateVisit(); state(reduced.matches ? 'reduced' : 'idle')
  return () => {
    disposed = true; armed = false; cancel('disabled', false); observer.disconnect()
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('wheel', onWheel, true)
    window.removeEventListener('pointerdown', onPointerDown, true)
    window.removeEventListener('pointerup', onPointerUp)
    window.removeEventListener('pointercancel', onPointerUp)
    window.removeEventListener('touchstart', onTouchStart, true)
    window.removeEventListener('touchmove', onTouchMove)
    window.removeEventListener('touchend', onTouchEnd)
    window.removeEventListener('touchcancel', onTouchEnd)
    window.removeEventListener('keydown', explicit, true)
    document.removeEventListener('click', click, true)
    window.removeEventListener('home:explicit-scroll', explicit)
    window.removeEventListener('hashchange', explicit)
    window.removeEventListener('popstate', explicit)
    window.removeEventListener('pageshow', explicit)
    window.removeEventListener('blur', explicit)
    window.removeEventListener('resize', resize)
    visualViewport?.removeEventListener('resize', resize)
    document.removeEventListener('visibilitychange', visibility)
    reduced.removeEventListener('change', preference)
    delete host.dataset.sceneMagnet; delete host.dataset.magnetScene; delete host.dataset.magnetTarget
  }
}
