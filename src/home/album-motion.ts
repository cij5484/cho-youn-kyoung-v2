import { useEffect, useRef, type RefObject } from 'react'

export const albumObjectTuning = {
  initialTurn: -28, initialTilt: -12, dragDegreesPerPixel: .45,
  pointerTurn: 28, pointerTilt: 20, response: 11, friction: 4.5, maxVelocity: 300,
  exchangeDuration: 920, depthRatio: .057,
} as const

/** Pose belongs to the scene, not its CSS/GLB renderer. Vertical touch scrolling always wins. */
export function useAlbumMotion(ref: RefObject<HTMLDivElement | null>) {
  const turn = useRef<(degrees: number) => void>(() => {})
  useEffect(() => {
    const element = ref.current!, reduced = matchMedia('(prefers-reduced-motion: reduce)')
    const fine = matchMedia('(hover: hover) and (pointer: fine)')
    const tune = albumObjectTuning
    let angle: number = tune.initialTurn, target = angle, tilt: number = tune.initialTilt, tiltTarget = tilt
    let hoverTurn = 0, hoverTarget = 0
    let velocity = 0, frame = 0, last = 0, visible = false, disposed = false
    let pointer: { id: number; x: number; y: number; lastX: number; time: number; dragging: boolean; rejected: boolean } | null = null
    function paint(now: number) {
      frame = 0
      const dt = Math.min(.04, Math.max(.001, (now - (last || now - 16)) / 1000)); last = now
      if (!pointer?.dragging && Math.abs(velocity) > .1) { target += velocity * dt; velocity *= Math.exp(-tune.friction * dt) }
      const settle = reduced.matches ? 1 : 1 - Math.exp(-tune.response * dt)
      angle += (target - angle) * settle; tilt += (tiltTarget - tilt) * settle
      hoverTurn += (hoverTarget - hoverTurn) * settle
      element.style.setProperty('--object-turn', `${(angle + hoverTurn).toFixed(3)}deg`)
      element.style.setProperty('--object-tilt', `${tilt.toFixed(3)}deg`)
      element.style.setProperty('--object-light', `${(50 + Math.sin((angle + hoverTurn) * Math.PI / 180) * 40).toFixed(2)}%`)
      element.style.setProperty('--object-shade', `${(.07 + Math.abs(Math.sin((angle + hoverTurn) * Math.PI / 180)) * .16).toFixed(3)}`)
      element.dataset.turn = angle.toFixed(1)
      element.dataset.pointerTurn = hoverTurn.toFixed(2)
      element.dataset.tilt = tilt.toFixed(2)
      element.dataset.moving = String(Math.abs(target - angle) > .02 || Math.abs(tiltTarget - tilt) > .02 || Math.abs(hoverTarget - hoverTurn) > .02 || Math.abs(velocity) > .1)
      if (Math.abs(target - angle) > .02 || Math.abs(tiltTarget - tilt) > .02 || Math.abs(hoverTarget - hoverTurn) > .02 || Math.abs(velocity) > .1) request()
    }
    function request() { if (!disposed && visible && !frame) frame = requestAnimationFrame(paint) }
    turn.current = degrees => { velocity = 0; target = Math.round((target - degrees) / 360) * 360 + degrees; request() }
    function down(event: PointerEvent) {
      if (event.button !== 0 || reduced.matches) return
      pointer = { id: event.pointerId, x: event.clientX, y: event.clientY, lastX: event.clientX, time: event.timeStamp, dragging: false, rejected: false }
      // Absorb the live hover pose into drag ownership; pointer-down cannot reset the visible angle.
      angle += hoverTurn; target = angle; hoverTurn = 0; hoverTarget = 0; velocity = 0
    }
    function move(event: PointerEvent) {
      if (pointer?.id === event.pointerId && !pointer.rejected) {
        const dx = event.clientX - pointer.x, dy = event.clientY - pointer.y
        if (!pointer.dragging && Math.abs(dy) > 8 && Math.abs(dy) > Math.abs(dx)) { pointer.rejected = true; return }
        if (!pointer.dragging && Math.abs(dx) > 8 && Math.abs(dx) > Math.abs(dy) * 1.2) {
          pointer.dragging = true; element.setPointerCapture(event.pointerId); element.dataset.dragging = 'true'
        }
        if (pointer.dragging) {
          const delta = (event.clientX - pointer.lastX) * tune.dragDegreesPerPixel
          target += delta
          velocity = Math.max(-tune.maxVelocity, Math.min(tune.maxVelocity, delta / Math.max(.008, (event.timeStamp - pointer.time) / 1000)))
          pointer.lastX = event.clientX; pointer.time = event.timeStamp; request(); return
        }
      }
      if (fine.matches && !reduced.matches && !pointer?.dragging) {
        const rect = element.getBoundingClientRect()
        const nx = Math.max(-1, Math.min(1, (event.clientX - rect.left) / rect.width * 2 - 1))
        const ny = Math.max(-1, Math.min(1, (event.clientY - rect.top) / rect.height * 2 - 1))
        hoverTarget = nx * tune.pointerTurn
        tiltTarget = tune.initialTilt - ny * tune.pointerTilt
        request()
      }
    }
    function release(event: PointerEvent) {
      if (pointer?.id !== event.pointerId) return
      if (event.type !== 'pointerup' || event.timeStamp - pointer.time > 100) velocity = 0
      if (element.hasPointerCapture(event.pointerId)) element.releasePointerCapture(event.pointerId)
      pointer = null; element.dataset.dragging = 'false'; request()
    }
    function leave() { hoverTarget = 0; tiltTarget = tune.initialTilt; if (pointer && !pointer.dragging) pointer = null; request() }
    function key(event: KeyboardEvent) {
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return
      event.preventDefault(); target += event.key === 'ArrowLeft' ? -35 : 35; velocity = 0; request()
    }
    function resetMotion() { velocity = 0; pointer = null; element.dataset.dragging = 'false'; tiltTarget = tune.initialTilt; hoverTarget = 0; if (reduced.matches) target = Math.round(target / 180) * 180; request() }
    const size = new ResizeObserver(() => { const pose = element.querySelector<HTMLElement>('.album-object-pose'); if (pose) element.style.setProperty('--album-depth', `${(pose.offsetWidth * tune.depthRatio).toFixed(2)}px`) })
    size.observe(element)
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) { last = 0; request() } else { if (frame) cancelAnimationFrame(frame); frame = 0; velocity = 0; pointer = null; element.dataset.dragging = 'false' }
    }, { threshold: .01 })
    observer.observe(element)
    element.addEventListener('pointerdown', down); element.addEventListener('pointermove', move)
    element.addEventListener('pointerup', release); element.addEventListener('pointercancel', release)
    element.addEventListener('lostpointercapture', release); element.addEventListener('pointerleave', leave)
    element.addEventListener('keydown', key); reduced.addEventListener('change', resetMotion)
    resetMotion()
    return () => {
      disposed = true; if (frame) cancelAnimationFrame(frame); observer.disconnect(); size.disconnect(); turn.current = () => {}
      element.removeEventListener('pointerdown', down); element.removeEventListener('pointermove', move)
      element.removeEventListener('pointerup', release); element.removeEventListener('pointercancel', release)
      element.removeEventListener('lostpointercapture', release); element.removeEventListener('pointerleave', leave)
      element.removeEventListener('keydown', key); reduced.removeEventListener('change', resetMotion)
    }
  }, [ref])
  return turn
}
