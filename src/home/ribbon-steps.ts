/** Endpoints remain native page scroll; only travel between works is captured. */
export function nextRibbonStop(position: number, direction: number, count: number) {
  const next = Math.round(position) + direction
  return next < 0 || next >= count ? null : next
}

export function mountRibbonSteps(root: HTMLElement, sticky: HTMLElement, count: number) {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)')
  let frame = 0, start = 0, range = 1, lastWheel = 0, consumed = false, distance = 0, settle = 0
  let touch: { y: number; consumed: boolean } | undefined
  let travel: { from: number; to: number; began: number } | undefined
  function cancel() { cancelAnimationFrame(frame); clearTimeout(settle); frame = 0; travel = undefined; touch = undefined }
  function measure() {
    const nextStart = scrollY + root.getBoundingClientRect().top
    const nextRange = Math.max(1, root.offsetHeight - sticky.offsetHeight)
    if (Math.abs(nextStart-start) < 1 && Math.abs(nextRange-range) < 1) return
    const destination = travel ? Math.round((travel.to-start)/range*(count-1)) : undefined
    cancel(); start = nextStart; range = nextRange
    if (destination !== undefined) go(destination)
  }
  function eligible() {
    return !reduced.matches && !document.hidden && !document.querySelector('dialog[open]')
      && scrollY >= start - 2 && scrollY <= start + range + 2
  }
  function paint(now: number) {
    frame = 0
    if (!travel || reduced.matches || document.hidden || document.querySelector('dialog[open]')) { cancel(); return }
    const t = Math.min(1, (now - travel.began) / 950)
    const eased = t < .5 ? 4*t*t*t : 1-Math.pow(-2*t+2,3)/2
    scrollTo({ top: travel.from + (travel.to-travel.from)*eased, behavior: 'instant' })
    if (t < 1) frame = requestAnimationFrame(paint)
    else travel = undefined
  }
  function go(index: number) {
    cancel()
    if (reduced.matches) return
    start = scrollY + root.getBoundingClientRect().top
    range = Math.max(1, root.offsetHeight - sticky.offsetHeight)
    if (Math.abs(scrollY-start-range*index/(count-1)) < 1) return
    travel = { from: scrollY, to: start + range*index/(count-1), began: performance.now() }
    frame = requestAnimationFrame(paint)
  }
  function advance(direction: number) {
    if (travel) return true
    const next = nextRibbonStop((scrollY-start)/range*(count-1), direction, count)
    if (next === null) return false
    go(next); return true
  }
  function wheel(event: WheelEvent) {
    if (event.ctrlKey || !eligible() || !event.deltaY) return
    const now = performance.now(), fresh = now-lastWheel > 180
    lastWheel = now
    if (fresh) { consumed = false; distance = 0 }
    if (travel || consumed) { event.preventDefault(); consumed = true; return }
    if (nextRibbonStop((scrollY-start)/range*(count-1), Math.sign(event.deltaY), count) === null) return
    event.preventDefault()
    if (Math.sign(distance) !== Math.sign(event.deltaY)) distance = 0
    distance += event.deltaY*(event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? innerHeight : 1)
    if (Math.abs(distance) >= 12) { advance(Math.sign(distance)); consumed = true }
  }
  function touchStart(event: TouchEvent) {
    if (eligible() && event.touches.length === 1) touch = { y: event.touches[0].clientY, consumed: false }
  }
  function touchMove(event: TouchEvent) {
    if (!touch || !eligible() || event.touches.length !== 1) return
    if (travel || touch.consumed) { event.preventDefault(); return }
    const delta = touch.y-event.touches[0].clientY
    if (!delta || nextRibbonStop((scrollY-start)/range*(count-1), Math.sign(delta), count) === null) return
    // Claim the first movement before native touch scrolling commits; outward endpoints stay native.
    event.preventDefault()
    if (Math.abs(delta) < 16) return
    const gesture = touch
    if (advance(Math.sign(delta))) { event.preventDefault(); gesture.consumed = true; touch = gesture }
  }
  function touchEnd() { touch = undefined }
  function scroll() {
    if (travel) return
    clearTimeout(settle)
    if (eligible()) settle = window.setTimeout(() => go(Math.round((scrollY-start)/range*(count-1))),160)
  }
  const observer = new ResizeObserver(measure); observer.observe(root); observer.observe(sticky)
  const modal = new MutationObserver(() => { if (document.querySelector('dialog[open]')) cancel(); else scroll() })
  const dialog = document.querySelector('dialog'); if (dialog) modal.observe(dialog, { attributes:true, attributeFilter:['open'] })
  window.addEventListener('wheel',wheel,{passive:false})
  window.addEventListener('scroll',scroll,{passive:true}); window.addEventListener('resize',measure)
  sticky.addEventListener('touchstart',touchStart,{passive:true})
  sticky.addEventListener('touchmove',touchMove,{passive:false})
  sticky.addEventListener('touchend',touchEnd); sticky.addEventListener('touchcancel',touchEnd)
  document.addEventListener('visibilitychange',cancel); reduced.addEventListener('change',cancel)
  measure()
  return { go, destroy() {
    cancel(); observer.disconnect(); modal.disconnect()
    window.removeEventListener('wheel',wheel)
    window.removeEventListener('scroll',scroll); window.removeEventListener('resize',measure)
    sticky.removeEventListener('touchstart',touchStart); sticky.removeEventListener('touchmove',touchMove)
    sticky.removeEventListener('touchend',touchEnd); sticky.removeEventListener('touchcancel',touchEnd)
    document.removeEventListener('visibilitychange',cancel); reduced.removeEventListener('change',cancel)
  } }
}
