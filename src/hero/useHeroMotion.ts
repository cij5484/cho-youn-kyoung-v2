import { useEffect, type RefObject } from 'react'
import { clampProgress, followProgress, HERO_EXCHANGE_START, posterState } from './motion.ts'

export function useHeroMotion(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const scene = ref.current!
    const stage = scene.querySelector<HTMLElement>('.poster-stage')!
    const header = document.querySelector<HTMLElement>('header.editorial-navigation')
    const dialog = document.querySelector<HTMLDialogElement>('dialog.navigation-menu')
    const nextImage = scene.querySelector<HTMLImageElement>('.portrait-instrument')!
    const initialImage = scene.querySelector<HTMLImageElement>('.portrait-initial')!
    const reduced = matchMedia('(prefers-reduced-motion: reduce)')
    const fine = matchMedia('(hover: hover) and (pointer: fine)')
    let frame = 0, lastTime = 0, progress = 0, pointerX = 0, pointerY = 0, targetX = 0, targetY = 0
    let exchangeArmed = false, initialized = false
    const imageReady = () => nextImage.complete && nextImage.naturalWidth > 0
    const set = (key: string, value: number) => {
      const text = value.toFixed(5)
      if (scene.style.getPropertyValue(key) !== text) scene.style.setProperty(key, text)
    }
    function request() {
      if (!frame && !document.hidden) frame = requestAnimationFrame(paint)
    }
    function paint(now: number) {
      frame = 0
      const bounds = scene.getBoundingClientRect()
      const reflow = (header?.offsetHeight ?? 0) > 112 && innerWidth < 640
      const still = reduced.matches || reflow
      // Both measurements use the same stable viewport geometry, including Safari toolbar changes.
      const target = clampProgress(-bounds.top / Math.max(1, scene.offsetHeight - stage.offsetHeight))
      const offscreen = bounds.bottom <= 0 || bounds.top >= innerHeight
      const elapsed = lastTime ? Math.min(48, now - lastTime) : 16.67
      lastTime = now
      if (!initialized) { progress = target; initialized = true }
      if (!exchangeArmed && imageReady() && target <= HERO_EXCHANGE_START) exchangeArmed = true
      // A late second image cannot unexpectedly replace the portrait under a stationary reader.
      progress = still ? 0 : offscreen ? target : followProgress(progress, target, elapsed)
      const pointerEnabled = fine.matches && !still && !dialog?.open && !offscreen
      const nextX = pointerEnabled ? targetX : 0, nextY = pointerEnabled ? targetY : 0
      const amount = still || offscreen || dialog?.open ? 1 : 1 - Math.exp(-elapsed / 105)
      pointerX += (nextX - pointerX) * amount; pointerY += (nextY - pointerY) * amount
      if (Math.abs(pointerX - nextX) < .0001) pointerX = nextX
      if (Math.abs(pointerY - nextY) < .0001) pointerY = nextY
      const state = posterState(progress, exchangeArmed && imageReady() && !still)
      set('--scroll', progress); set('--aperture', state.aperture); set('--source-next', state.next)
      set('--pointer-x', pointerX); set('--pointer-y', pointerY)
      scene.dataset.progress = progress.toFixed(5)
      scene.dataset.targetProgress = target.toFixed(5)
      scene.dataset.reflow = String(reflow)
      scene.dataset.motion = still ? 'reduced' : fine.matches ? 'pointer-and-scroll' : 'scroll-only'
      scene.dataset.exchange = exchangeArmed ? 'ready' : 'waiting'
      scene.dataset.imageError = String(initialImage.complete && !initialImage.naturalWidth)
      if (!still && !offscreen && (progress !== target || pointerX !== nextX || pointerY !== nextY)) request()
    }
    const move = (event: PointerEvent) => {
      if (!fine.matches || event.pointerType !== 'mouse') return
      targetX = (event.clientX / innerWidth - .5) * 2
      targetY = (event.clientY / innerHeight - .5) * 2
      request()
    }
    const leave = () => { targetX = 0; targetY = 0; request() }
    const visibility = () => {
      if (frame) { cancelAnimationFrame(frame); frame = 0 }
      lastTime = 0
      if (!document.hidden) request()
    }
    const observer = new MutationObserver(request)
    if (dialog) observer.observe(dialog, { attributes: true, attributeFilter: ['open'] })
    const resizeObserver = new ResizeObserver(request)
    if (header) resizeObserver.observe(header)
    resizeObserver.observe(stage)
    for (const img of [initialImage, nextImage]) { img.addEventListener('load', request); img.addEventListener('error', request) }
    window.addEventListener('scroll', request, { passive: true }); window.addEventListener('resize', request)
    scene.addEventListener('pointermove', move, { passive: true }); scene.addEventListener('pointerleave', leave)
    document.addEventListener('visibilitychange', visibility)
    reduced.addEventListener('change', request); fine.addEventListener('change', request)
    request()
    return () => {
      if (frame) cancelAnimationFrame(frame)
      observer.disconnect(); resizeObserver.disconnect()
      for (const img of [initialImage, nextImage]) { img.removeEventListener('load', request); img.removeEventListener('error', request) }
      window.removeEventListener('scroll', request); window.removeEventListener('resize', request)
      scene.removeEventListener('pointermove', move); scene.removeEventListener('pointerleave', leave)
      document.removeEventListener('visibilitychange', visibility)
      reduced.removeEventListener('change', request); fine.removeEventListener('change', request)
    }
  }, [ref])
}
