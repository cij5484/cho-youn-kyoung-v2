import { nearestWorksHelixStop, worksHelixStop, worksHelixPose, worksHelixTimeline } from './works-helix-model.ts'
import { atmosphericCatalog, type AtmosphericRecord } from './atmospheric-catalog.ts'
import { atmosphericImages } from './atmospheric-assets.ts'

const clamp = (n: number) => Math.max(0, Math.min(1, n))
const ease = (n: number) => { const t = clamp(n); return t * t * (3 - 2 * t) }
const mix = (a: number, b: number, t: number) => a + (b - a) * t

export function mountWorksHelix(root: HTMLElement) {
  const stage = root.querySelector<HTMLElement>('.atmospheric-stage')!
  const archive = root.querySelector<HTMLElement>('.atmospheric-archive')!
  const paper = archive.querySelector<HTMLElement>('.atmospheric-archive-inner')!
  const cards = [...root.querySelectorAll<HTMLElement>('.works-helix-card')]
  const captions = [...root.querySelectorAll<HTMLElement>('.works-helix-caption')]
  const steps = [...root.querySelectorAll<HTMLButtonElement>('[data-helix-step]')]
  const chrome = [...stage.querySelectorAll<HTMLElement>('.atmospheric-heading,.works-helix-steps,.atmospheric-index')]
  const reduced = matchMedia('(prefers-reduced-motion: reduce)')
  const desktop = matchMedia('(min-width: 1000px) and (hover: hover) and (pointer: fine)')
  let width = 1, height = 1, start = 0, range = 1, frame = 0, visible = true, disposed = false
  let animation: { from: number; to: number; began: number } | undefined
  let stop = 0, wheelTime = 0, wheelDistance = 0, wheelConsumed = false, settleTimer = 0
  let drag: { id: number; x: number; y: number } | undefined
  let captionFocus = -1
  const progressAtScroll = () => clamp((scrollY - start) / Math.max(1, range))
  function caption(index: number) {
    if (captionFocus === index) return
    if (captionFocus >= 0) captions[captionFocus].dataset.captionState = 'out'
    captions[index].dataset.captionState = 'in'
    captionFocus = index
  }
  let targets: { x: number; y: number; scaleX: number; scaleY: number; opacity: number }[] = []
  const target = (work: AtmosphericRecord, i: number) => {
    const preview = desktop.matches && paper.querySelector<HTMLElement>('.archive-preview-image')
    const row = (preview && paper.querySelector<HTMLElement>(`.archive-preview-list [data-work-id="${work.id}"]`))
      || paper.querySelector<HTMLElement>(`.atmospheric-archive-row[data-work-id="${work.id}"] .atmospheric-archive-slot`)!
    const box = (preview && i === 0 ? preview : row).getBoundingClientRect()
    if (!box.width && targets[i]) return targets[i]
    const paperBox = paper.getBoundingClientRect()
    const image = atmosphericImages[work.image], aspect = image.width / image.height
    const fitWidth = Math.min(box.width, box.height * aspect)
    const w = preview && i !== 0 ? 22 : fitWidth
    const h = w / aspect
    return { x: box.left + (preview && i !== 0 ? 12 : box.width / 2) - width * (width < 1000 ? .5 : .43),
      y: box.top - paperBox.top + box.height / 2 - height * (width < 1000 ? .45 : .49),
      scaleX: w / 200, scaleY: h / (200 / aspect), opacity: preview && i !== 0 ? 0 : 1 }
  }
  const measure = () => {
    if (reduced.matches) { animation = undefined; clearTimeout(settleTimer) }
    width = document.documentElement.clientWidth; height = innerHeight
    root.dataset.static = String(reduced.matches)
    root.style.setProperty('--archive-overflow', `${Math.max(0, paper.offsetHeight - height)}px`)
    start = root.getBoundingClientRect().top + scrollY
    range = root.offsetHeight - Math.max(height, paper.offsetHeight)
    root.dataset.scrollStart = String(start); root.dataset.scrollRange = String(Math.max(1, range))
    targets = atmosphericCatalog.map(target)
    request()
  }
  function update(now = performance.now()) {
    frame = 0
    if (disposed || document.hidden || !visible) return
    if (animation) {
      const t = clamp((now - animation.began) / 950)
      const eased = t < .5 ? 4*t*t*t : 1 - Math.pow(-2*t+2,3)/2
      window.scrollTo({ top: start + range * mix(animation.from, animation.to, eased), behavior: 'instant' })
      if (t === 1) animation = undefined
    }
    const progress = reduced.matches ? 1 : progressAtScroll()
    const timeline = worksHelixTimeline(progress, cards.length), a = timeline.assembly
    if (!animation) caption(timeline.focus)
    root.dataset.progress = String(progress); root.dataset.focus = String(timeline.focus)
    root.dataset.resolution = String(a); root.dataset.indexExpansion = String(a)
    root.dataset.segmentPhase = a ? 'archive' : 'helix'
    const paperOpacity = ease((a - .3) / .7)
    root.style.setProperty('--works-assembly', String(paperOpacity))
    archive.inert = a < .97
    stage.inert = a > .1
    chrome.forEach(element => { element.style.opacity = String(1 - ease(a * 3)) })
    cards.forEach((card, i) => {
      const pose = worksHelixPose(i, cards.length, timeline.cursor, width, height, timeline.unfold)
      const end = targets[i]
      // One projected card becomes one flat paper target, preserving native image proportions.
      card.style.transform = `translate(-50%,-50%) translate3d(${mix(pose.x,end.x,a)}px,${mix(pose.y,end.y,a)}px,${pose.z * (1-a)}px) rotateY(${pose.rotationY * (1-a)}deg) rotateZ(${pose.rotationZ * (1-a)}deg) scale(${mix(pose.scale,end.scaleX,a)},${mix(pose.scale,end.scaleY,a)})`
      card.style.opacity = String(mix(pose.opacity, end.opacity, a) * (1 - ease((a - .82) / .18)))
      captions[i].style.opacity = String(1-ease(a*3))
      captions[i].inert = captionFocus !== i || a > .1 || Boolean(animation)
      steps[i].setAttribute('aria-current', String(timeline.focus === i))
    })
    const p = worksHelixPose(timeline.focus,cards.length,timeline.cursor,width,height,timeline.unfold)
    root.dataset.focusX = String(width*(width<1000?.5:.43)+p.x)
    root.dataset.focusY = String(height*(width<1000?.45:.49)+p.y)
    root.dataset.focusWidth = String(200*p.scale); root.dataset.focusHeight = String(280*p.scale)
    root.dataset.moving = String(Boolean(animation))
    if (animation) request()
  }
  function request() { if (!disposed && visible && !document.hidden && !frame) frame = requestAnimationFrame(update) }
  const settleArchive = () => {
    if (progressAtScroll() >= 1) return
    animation = undefined; stop = cards.length
    window.scrollTo({ top: reduced.matches ? archive.getBoundingClientRect().top + scrollY : start + Math.max(0,range), behavior: 'instant' }); update()
  }
  const anchor = () => { if (location.hash === '#works-compact-archive') settleArchive() }
  const jump = (event: MouseEvent) => {
    const node = (event.target as Element).closest<HTMLElement>('[data-helix-step],.atmospheric-index')
    if (!node) return
    event.preventDefault()
    go(node.matches('.atmospheric-index') ? cards.length : Number(node.dataset.helixStep))
  }
  function go(index: number) {
    if (animation) return
    clearTimeout(settleTimer)
    stop = Math.max(0, Math.min(cards.length, index))
    const from = progressAtScroll(), to = worksHelixStop(stop, cards.length)
    if (reduced.matches || Math.abs(from-to) < .0001) return
    animation = { from, to, began: performance.now() }
    caption(Math.min(stop,cards.length-1))
    request()
  }
  function advance(direction: number) {
    if (animation) return
    stop = nearestWorksHelixStop(progressAtScroll(), cards.length)
    go(stop + direction)
  }
  function inOpening() {
    return !reduced.matches && scrollY >= start - height*.2 && scrollY < start + range - 2
      && !document.querySelector('dialog[open]')
  }
  function wheel(event: WheelEvent) {
    const delta = Math.abs(event.deltaY) >= Math.abs(event.deltaX) ? event.deltaY : event.deltaX
    const returning = delta < 0 && Math.abs(scrollY-start-range) < 3 && !reduced.matches && !document.querySelector('dialog[open]')
    if (event.ctrlKey || (!inOpening() && !returning)) return
    if (!delta || (progressAtScroll() === 0 && delta < 0 && !animation)) return
    event.preventDefault()
    const now = performance.now(), fresh = now - wheelTime > 180
    wheelTime = now
    if (fresh) wheelConsumed = false
    if (animation || wheelConsumed) { wheelDistance = 0; wheelConsumed = true; return }
    if (fresh || Math.sign(wheelDistance) !== Math.sign(delta)) wheelDistance = 0
    wheelDistance += delta * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? height : 1)
    if (Math.abs(wheelDistance) >= 12) { advance(Math.sign(wheelDistance)); wheelDistance = 0; wheelConsumed = true }
  }
  function pointerDown(event: PointerEvent) {
    if (!event.isPrimary || event.button !== 0 || !inOpening() || (event.target as Element).closest('a,button')) return
    drag = { id: event.pointerId, x: event.clientX, y: event.clientY }
    stage.setPointerCapture(event.pointerId)
    stage.dataset.dragging = 'true'
  }
  function pointerUp(event: PointerEvent) {
    if (!drag || event.pointerId !== drag.id) return
    const x = drag.x - event.clientX, y = drag.y - event.clientY
    drag = undefined; delete stage.dataset.dragging
    if (stage.hasPointerCapture(event.pointerId)) stage.releasePointerCapture(event.pointerId)
    if (event.type === 'pointerup' && Math.max(Math.abs(x),Math.abs(y)) >= 24) advance(Math.sign(Math.abs(x) > Math.abs(y) ? x : y))
  }
  function key(event: KeyboardEvent) {
    if (!inOpening() || event.altKey || event.ctrlKey || event.metaKey) return
    const direction = ['ArrowDown','ArrowRight','PageDown'].includes(event.key) ? 1 : ['ArrowUp','ArrowLeft','PageUp'].includes(event.key) ? -1 : 0
    if (direction) { event.preventDefault(); advance(direction) }
  }
  function scroll() {
    if (animation) return
    if (root.dataset.progress === '1' && inOpening()) { go(cards.length-1); return }
    request(); clearTimeout(settleTimer)
    // Scrollbar and browser-generated scrolling also settle at a work, never between works.
    if (inOpening()) settleTimer = window.setTimeout(() => go(nearestWorksHelixStop(progressAtScroll(),cards.length)), 160)
  }
  const visibility = () => { cancelAnimationFrame(frame); frame=0; request() }
  const resize = new ResizeObserver(measure); resize.observe(paper)
  const intersection = new IntersectionObserver(entries => { visible = entries[0].isIntersecting; visibility() })
  intersection.observe(root)
  window.addEventListener('scroll',scroll,{passive:true}); window.addEventListener('resize',measure)
  window.addEventListener('wheel',wheel,{passive:false})
  stage.addEventListener('pointerdown',pointerDown); stage.addEventListener('pointerup',pointerUp); stage.addEventListener('pointercancel',pointerUp)
  root.addEventListener('keydown',key)
  window.addEventListener('hashchange',anchor); root.addEventListener('click',jump)
  archive.addEventListener('focusin',settleArchive)
  document.addEventListener('visibilitychange',visibility); reduced.addEventListener('change',measure)
  measure(); anchor(); update()
  void document.fonts.ready.then(() => { if (!disposed) { measure(); anchor() } })
  return () => {
    disposed=true; cancelAnimationFrame(frame); clearTimeout(settleTimer); resize.disconnect(); intersection.disconnect()
    window.removeEventListener('scroll',scroll); window.removeEventListener('resize',measure)
    window.removeEventListener('wheel',wheel)
    stage.removeEventListener('pointerdown',pointerDown); stage.removeEventListener('pointerup',pointerUp); stage.removeEventListener('pointercancel',pointerUp)
    root.removeEventListener('keydown',key)
    window.removeEventListener('hashchange',anchor); root.removeEventListener('click',jump)
    archive.removeEventListener('focusin',settleArchive)
    document.removeEventListener('visibilitychange',visibility); reduced.removeEventListener('change',measure)
    archive.inert=false; stage.inert=false
  }
}
