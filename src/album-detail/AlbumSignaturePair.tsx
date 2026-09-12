import { useEffect, useRef, useSyncExternalStore, type CSSProperties, type RefObject } from 'react'
import { createPortal } from 'react-dom'
import { signatureEase, twoPointContract } from '../signature/two-point-contract.ts'
import { signatureAudioHandoff } from '../signature/audio-handoff.ts'
import './album-signature.css'

type Sample = { x: number; y: number; time: number }
const subscribe = () => () => {}
const clamp = (n: number, low: number, high: number) => Math.max(low, Math.min(high, n))

/** Album-owned paths follow the exhibition's real objects; typography keeps its quiet centre. */
export function AlbumSignaturePair({ scope, quiet = false }: { scope: RefObject<HTMLElement | null>; quiet?: boolean }) {
  const mounted = useSyncExternalStore(subscribe, () => true, () => false)
  const layer = useRef<HTMLDivElement>(null), surface = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const owner = scope.current, element = layer.current, canvas = surface.current
    if (!mounted || !owner || !element || !canvas) return
    const ownerId = quiet ? 'editorial' : 'album'
    const context = canvas.getContext('2d'), reduced = matchMedia('(prefers-reduced-motion: reduce)')
    const mobile = matchMedia('(max-width: 700px)'), histories: Sample[][] = [[], []]
    const points = [{ x: 0, y: 0 }, { x: 0, y: 0 }]
    let frame = 0, last = 0, phase = .7, width = 1, height = 1, initialized = false, disposed = false
    let visible = false, modal = false, chapter = 'cover', cx = 0, cy = 0, rx = 1, ry = 1
    function audioOwnership() {
      element!.style.opacity = signatureAudioHandoff.isActive() ? '0' : ''
      if (!signatureAudioHandoff.isActive()) histories.forEach(history => { history.length = 0 })
    }
    const unsubscribeAudio = signatureAudioHandoff.subscribe(audioOwnership)
    audioOwnership()
    function stop() {
      cancelAnimationFrame(frame); frame = 0; last = 0
      histories.forEach(history => { history.length = 0 }); context?.clearRect(0, 0, width, height)
      element!.dataset.motion = 'sleeping'
    }
    function request() {
      const shown = visible && !document.hidden && !modal
      element!.dataset.visible = String(shown); element!.dataset.static = String(reduced.matches || !context)
      if (!shown) signatureAudioHandoff.remove(ownerId)
      else if (reduced.matches || !context) {
        const now = performance.now()
        twoPointContract.order.forEach(id => {
          const marker = element!.querySelector<HTMLElement>(`[data-signature-point="${id}"]`)!.getBoundingClientRect()
          signatureAudioHandoff.publish(ownerId, id, { x: marker.x + marker.width / 2, y: marker.y + marker.height / 2, vx: 0, vy: 0, time: now })
        })
      }
      if (!shown || reduced.matches || !context) { stop(); return }
      if (!disposed && !frame) frame = requestAnimationFrame(paint)
    }
    function measure() {
      const page = owner!.getBoundingClientRect()
      visible = page.top < height && page.bottom > 0
      const top = clamp(page.top + 20, 84, height - 30), bottom = Math.max(top, Math.min(height - 20, page.bottom - 20))
      let nearest: DOMRect | undefined, distance = Infinity
      for (const anchor of owner!.querySelectorAll<HTMLElement>('[data-album-anchor]')) {
        const box = anchor.getBoundingClientRect(), delta = Math.abs(box.top + box.height / 2 - height / 2)
        if (box.bottom > 0 && box.top < height && delta < distance) { nearest = box; distance = delta; chapter = anchor.dataset.albumAnchor! }
      }
      cx = nearest ? clamp(nearest.left + nearest.width / 2, width * .25, width * .75) : width / 2
      cy = nearest ? clamp(nearest.top + nearest.height / 2, top, bottom) : (top + bottom) / 2
      rx = Math.max(8, Math.min(nearest ? nearest.width * .56 : width * .36, cx - 14, width - cx - 14))
      ry = Math.max(4, Math.min(nearest ? nearest.height * .52 : height * .24, (bottom - top) * .38))
      cy = clamp(cy, top + ry, bottom - ry)
      element!.dataset.chapter = chapter
      element!.style.setProperty('--album-pair-static-y', `${(top + bottom) / 2}px`)
      request()
    }
    function resize() {
      width = element!.clientWidth; height = innerHeight
      const dpr = Math.min(devicePixelRatio || 1, mobile.matches ? 1.25 : 1.5)
      canvas!.width = Math.round(width * dpr); canvas!.height = Math.round(height * dpr)
      context?.setTransform(dpr, 0, 0, dpr, 0, 0); histories.forEach(history => { history.length = 0 }); measure()
    }
    function paint(now: number) {
      frame = 0
      if (disposed || document.hidden || !visible || modal || reduced.matches || !context) { stop(); return }
      const dt = last ? Math.min(.08, (now - last) / 1000) : 1 / 60
      last = now; phase += dt * .32; context.clearRect(0, 0, width, height)
      twoPointContract.order.forEach((id, index) => {
        const identity = twoPointContract.points[id], angle = phase * (index ? .83 : 1) + index * 2.7
        const text = quiet || chapter === 'story' || chapter === 'related'
        const margin = quiet ? mobile.matches ? 19 : 36 : 22
        const x = text ? (index ? width - margin : margin) + Math.sin(angle) * (quiet ? mobile.matches ? 9 : 18 : 7)
          : cx + rx * (.9 * Math.cos(angle) + .06 * Math.sin(angle * 2))
        const y = cy + ry * (.86 * Math.sin(angle) + .07 * Math.sin(angle * (index ? 2 : 1.7)))
        const point = points[index]
        const previousX = point.x, previousY = point.y
        point.x = initialized ? signatureEase(point.x, x, dt, identity.response) : x
        point.y = initialized ? signatureEase(point.y, y, dt, identity.response) : y
        const history = histories[index]
        if (!history.length || now - history[history.length - 1].time >= 1000 / 60) history.push({ ...point, time: now })
        while (history.length > 2 && (now - history[0].time > twoPointContract.moving.trailMs || history.length > 144)) history.shift()
        signatureAudioHandoff.publish(ownerId, id, { ...point, time: now, vx: initialized ? (point.x - previousX) / dt : 0, vy: initialized ? (point.y - previousY) / dt : 0, trail: history })
        if (signatureAudioHandoff.isActive()) return
        context.strokeStyle = identity.color; context.lineCap = 'round'
        for (let i = 1; i <= history.length; i++) {
          const from = history[i - 1], to = history[i] ?? { ...point, time: now }
          const fresh = clamp(1 - (now - (from.time + to.time) / 2) / twoPointContract.moving.trailMs, 0, 1)
          context.globalAlpha = fresh ** twoPointContract.moving.fadeExponent * twoPointContract.moving.opacity * (quiet ? .62 : 1)
          context.lineWidth = Math.max(twoPointContract.moving.widthRange[0], twoPointContract.moving.trailWidth * fresh)
          context.beginPath(); context.moveTo(from.x, from.y); context.lineTo(to.x, to.y); context.stroke()
        }
      })
      initialized = true; element!.dataset.motion = 'ambient'; frame = requestAnimationFrame(paint)
    }
    function dialogsChanged() { modal = Boolean(document.querySelector('dialog[open]')); request() }
    const intersection = new IntersectionObserver(measure), sizing = new ResizeObserver(resize), dialogs = new MutationObserver(dialogsChanged)
    intersection.observe(owner); sizing.observe(owner)
    dialogs.observe(document.body, { subtree: true, attributes: true, attributeFilter: ['open'], childList: true })
    window.addEventListener('scroll', measure, { passive: true }); window.addEventListener('resize', resize)
    document.addEventListener('visibilitychange', measure); reduced.addEventListener('change', measure); mobile.addEventListener('change', resize)
    modal = Boolean(document.querySelector('dialog[open]')); resize()
    return () => {
      disposed = true; stop(); intersection.disconnect(); sizing.disconnect(); dialogs.disconnect()
      unsubscribeAudio(); signatureAudioHandoff.remove(ownerId)
      window.removeEventListener('scroll', measure); window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', measure); reduced.removeEventListener('change', measure); mobile.removeEventListener('change', resize)
      canvas.width = 0; canvas.height = 0
    }
  }, [mounted, scope, quiet])
  if (!mounted) return null
  const colors = {
    '--album-pair-violet': twoPointContract.points.haegeum.color, '--album-pair-lacquer': twoPointContract.points.janggu.color,
    '--album-pair-width': `${twoPointContract.static.desktop.width}px`, '--album-pair-height': `${twoPointContract.static.desktop.height}px`,
    '--album-pair-mobile-width': `${twoPointContract.static.mobile.width}px`, '--album-pair-mobile-height': `${twoPointContract.static.mobile.height}px`,
    '--album-pair-opacity': twoPointContract.static.opacity * (quiet ? .62 : 1),
  } as CSSProperties
  return createPortal(<div ref={layer} className="album-signature-pair" data-presence={quiet ? 'quiet' : 'object'} aria-hidden="true" data-visible="false" data-static="true" style={colors}>
    <canvas ref={surface}/><i data-signature-point="haegeum"/><i data-signature-point="janggu"/>
  </div>, document.body)
}
