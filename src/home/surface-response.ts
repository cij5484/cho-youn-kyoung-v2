import { useEffect, type RefObject } from 'react'

export const surfaceTuning = { response: 7.5, settle: .001 } as const

/** Shared light/depth input. Display cadence is independent of pointer sampling. */
export function useSurfaceResponse(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const element = ref.current!, fine = matchMedia('(hover: hover) and (pointer: fine)'), reduced = matchMedia('(prefers-reduced-motion: reduce)')
    let x = 0, y = 0, tx = 0, ty = 0, frame = 0, last = 0, visible = false, disposed = false
    function paint(now: number) {
      frame = 0
      const amount = reduced.matches ? 1 : 1 - Math.exp(-surfaceTuning.response * Math.min(.05, (now - (last || now - 16)) / 1000)); last = now
      x += (tx - x) * amount; y += (ty - y) * amount
      element.style.setProperty('--surface-x', x.toFixed(4)); element.style.setProperty('--surface-y', y.toFixed(4))
      element.style.setProperty('--light-x', `${(50 + x * 40).toFixed(2)}%`); element.style.setProperty('--light-y', `${(45 + y * 35).toFixed(2)}%`)
      element.dataset.surface = Math.abs(x) + Math.abs(y) > .01 ? 'responding' : 'rest'
      if (Math.abs(tx - x) + Math.abs(ty - y) > surfaceTuning.settle) request()
    }
    function request() { if (!frame && visible && !disposed && !document.hidden) frame = requestAnimationFrame(paint) }
    function move(event: PointerEvent) {
      if (!fine.matches || reduced.matches || document.querySelector('dialog[open]')) return
      const box = element.getBoundingClientRect()
      tx = Math.max(-1, Math.min(1, (event.clientX - box.left) / box.width * 2 - 1)); ty = Math.max(-1, Math.min(1, (event.clientY - box.top) / box.height * 2 - 1)); request()
    }
    function reset() { tx = 0; ty = 0; request() }
    function visibility() { if (document.hidden) { if (frame) cancelAnimationFrame(frame); frame = 0 } else { last = 0; reset() } }
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (visible) { last = 0; request() } else { if (frame) cancelAnimationFrame(frame); frame = 0; tx = 0; ty = 0 } })
    observer.observe(element); element.addEventListener('pointermove', move); element.addEventListener('pointerleave', reset)
    reduced.addEventListener('change', reset); document.addEventListener('visibilitychange', visibility)
    return () => { disposed = true; if (frame) cancelAnimationFrame(frame); observer.disconnect(); element.removeEventListener('pointermove', move); element.removeEventListener('pointerleave', reset); reduced.removeEventListener('change', reset); document.removeEventListener('visibilitychange', visibility) }
  }, [ref])
}
