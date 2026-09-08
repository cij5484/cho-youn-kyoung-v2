import { measureSoundScrollGeometry, soundFocusFrame } from './scroll-geometry.ts'

/** The same authored denominator as Hero; mobile can land inside its additional end hold. */
export function soundFocusTarget(root: HTMLElement) {
  const scene = root.querySelector<HTMLElement>('.poster-scene')!
  const stage = scene.querySelector<HTMLElement>('.poster-stage')!
  const header = document.querySelector<HTMLElement>('.editorial-navigation')
  const obstruction = Math.max(0, header?.getBoundingClientRect().bottom ?? 0)
  if (root.dataset.soundStatic === 'true') {
    const panel = root.querySelector<HTMLElement>('.sound-surface')!
    return { top: scrollY + panel.getBoundingClientRect().top - obstruction, progress: 1 }
  }
  const frame = soundFocusFrame(measureSoundScrollGeometry(scene, stage), stage.offsetHeight, obstruction)
  return { top: scrollY + scene.getBoundingClientRect().top + frame.offset, progress: frame.progress }
}

/** One activation, one native smooth scroll. Direct user input cancels; no scroll listener re-snaps. */
export function alignSoundFrame(root: HTMLElement, signal: AbortSignal): Promise<boolean> {
  return new Promise(resolve => {
    const target = soundFocusTarget(root), reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
    const scene = root.querySelector<HTMLElement>('.poster-scene')!
    let frame = 0, done = false
    const started = performance.now()
    root.dataset.soundAlignment = 'aligning'
    root.dataset.soundFocusY = target.top.toFixed(2)
    function finish(success: boolean) {
      if (done) return
      done = true; cancelAnimationFrame(frame)
      window.removeEventListener('wheel', cancel); window.removeEventListener('touchstart', cancel)
      window.removeEventListener('keydown', key); signal.removeEventListener('abort', cancel)
      root.dataset.soundAlignment = success ? 'aligned' : 'cancelled'
      if (!success) scrollTo({top: scrollY, behavior: 'instant'})
      resolve(success)
    }
    function cancel() { finish(false) }
    function key(event: KeyboardEvent) { if (['ArrowDown','ArrowUp','PageDown','PageUp','Home','End','Escape',' '].includes(event.key)) cancel() }
    function tick() {
      if (signal.aborted || document.hidden || document.querySelector('dialog[open]')) return finish(false)
      const landed = Math.abs(scrollY - target.top) < Math.max(1, innerHeight * .002)
      const composed = root.dataset.soundStatic === 'true' || Math.abs(Number(scene.dataset.progress) - target.progress) < .004
      if (landed && composed) return finish(true)
      if (performance.now() - started > 2200) return finish(false)
      frame = requestAnimationFrame(tick)
    }
    if (signal.aborted) return finish(false)
    window.addEventListener('wheel', cancel, {passive:true}); window.addEventListener('touchstart', cancel, {passive:true})
    window.addEventListener('keydown', key); signal.addEventListener('abort', cancel, {once:true})
    scrollTo({top:target.top, behavior:reduced ? 'instant' : 'smooth'})
    frame = requestAnimationFrame(tick)
  })
}
