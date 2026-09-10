import { useEffect, useRef, useSyncExternalStore, type CSSProperties, type RefObject } from 'react'
import { createPortal } from 'react-dom'
import { signatureEase, twoPointContract } from '../../signature/two-point-contract.ts'
import './works-signature-pair.css'

type Point = { x: number; y: number }
type Sample = Point & { time: number }
const clamp = (n: number, low = 0, high = 1) => Math.max(low, Math.min(high, n))
const smooth = (n: number) => { const t = clamp(n); return t * t * (3 - 2 * t) }
const mix = (a: number, b: number, amount: number) => a + (b - a) * amount
const subscribeMounted = () => () => {}

/** A page-owned path: the same identities continue from spatial depth into the actual archive. */
export function WorksSignaturePair({ scope }: { scope: RefObject<HTMLElement | null> }) {
  const mounted = useSyncExternalStore(subscribeMounted, () => true, () => false)
  const layer = useRef<HTMLDivElement>(null)
  const surface = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const owner = scope.current, element = layer.current, canvas = surface.current
    if (!mounted || !owner || !element || !canvas) return
    const context = canvas.getContext('2d')
    const reduced = matchMedia('(prefers-reduced-motion: reduce)')
    const mobile = matchMedia('(max-width: 700px)')
    const histories: Sample[][] = [[], []]
    const positions: Point[] = [{ x: 0, y: 0 }, { x: 0, y: 0 }]
    let initialized = false, bridgeInitialized = false, disposed = false, visible = false, modal = false
    let frame = 0, last = 0, phase = .72, width = 1, height = 1, navBottom = 68
    let archiveMix = 0, attraction = 0, attractionY = 0, onwardMix = .025, pathProgress = 0, bridgeMix = 0
    let hoverRow: HTMLElement | null = null, focusRow: HTMLElement | null = null
    let spatial = owner.querySelector<HTMLElement>('.atmospheric-depth')
    let archive = owner.querySelector<HTMLElement>('.atmospheric-archive')
    let pageBox = owner.getBoundingClientRect(), archiveBox = archive?.getBoundingClientRect()
    let selectedBox: DOMRect | undefined
    const flight = { x: 0, y: 0, rx: 1, ry: 1 }
    const bridge = { x: 0, y: 0, ax: 0, ay: 0, bx: 0, by: 0 }

    function stop() {
      cancelAnimationFrame(frame); frame = 0; last = 0
      histories.forEach(history => { history.length = 0 })
      context?.clearRect(0, 0, width, height)
      element!.dataset.motion = 'sleeping'
    }
    function presentation() {
      const shown = visible && !document.hidden && !modal
      element!.dataset.visible = String(shown)
      element!.dataset.static = String(reduced.matches || !context)
      if (!shown || reduced.matches || !context) stop()
      return shown && !reduced.matches && Boolean(context)
    }
    function request() {
      if (disposed || frame || !presentation()) return
      frame = requestAnimationFrame(paint)
    }
    function measure() {
      // Layout is refreshed by scroll/input/resize, not queried repeatedly by the ambient clock.
      if (!spatial?.isConnected) spatial = owner!.querySelector<HTMLElement>('.atmospheric-depth')
      if (!archive?.isConnected) archive = owner!.querySelector<HTMLElement>('.atmospheric-archive')
      pageBox = owner!.getBoundingClientRect(); archiveBox = archive?.getBoundingClientRect()
      const selected = focusRow?.isConnected ? focusRow : hoverRow?.isConnected ? hoverRow : null
      selectedBox = selected?.getBoundingClientRect()
      visible = pageBox.top < innerHeight && pageBox.bottom > 0
    }
    function resize() {
      width = element!.clientWidth; height = innerHeight
      navBottom = document.querySelector('.editorial-navigation')?.getBoundingClientRect().bottom ?? 0
      const dpr = Math.min(devicePixelRatio || 1, mobile.matches ? 1.25 : 1.5)
      canvas!.width = Math.round(width * dpr); canvas!.height = Math.round(height * dpr)
      context?.setTransform(dpr, 0, 0, dpr, 0, 0)
      histories.forEach(history => { history.length = 0 })
      element!.style.setProperty('--signature-static-y', `${Math.max(navBottom + 42, height * .61)}px`)
      measure()
      request()
    }
    function readNumber(value: string | undefined, fallback: number) {
      const result = Number(value)
      return value !== undefined && Number.isFinite(result) ? result : fallback
    }
    function paint(now: number) {
      frame = 0
      if (disposed || !presentation() || !context) return
      const dt = last ? Math.min(.08, (now - last) / 1000) : 1 / 60
      last = now
      // The same archive DOM is already visible as the right Project Index. Its top edge
      // no longer means "archive entry"; the scene's expansion is the shared owner clock.
      const fallbackAmount = spatial?.dataset.state === 'fallback' && archiveBox ? smooth((height * .94 - archiveBox.top) / (height * .72)) : 0
      const amount = clamp(readNumber(spatial?.dataset.indexExpansion, fallbackAmount))
      archiveMix = signatureEase(archiveMix, amount, dt, 5.5)
      phase += dt * mix(.43, .16, archiveMix)
      const progress = clamp(readNumber(spatial?.dataset.progress, 0))
      const segment = spatial?.dataset.segmentPhase ?? 'approach'
      const fx = readNumber(spatial?.dataset.focusX, width * .5)
      const fy = readNumber(spatial?.dataset.focusY, height * .5)
      const fw = clamp(readNumber(spatial?.dataset.focusWidth, width * .36), 60, Math.min(width * .79, 980))
      const fh = clamp(readNumber(spatial?.dataset.focusHeight, height * .4), 60, height * .68)
      const nextX = readNumber(spatial?.dataset.nextX, fx)
      const nextY = readNumber(spatial?.dataset.nextY, fy)
      const indexX = readNumber(spatial?.dataset.indexX, Number.NaN)
      const indexY = readNumber(spatial?.dataset.indexY, Number.NaN)
      const hasIndex = Number.isFinite(indexX) && Number.isFinite(indexY)
      bridgeMix = signatureEase(bridgeMix, hasIndex ? (mobile.matches ? .64 : .58) : 0, dt, 3.8)
      const onward = segment === 'departure' || segment === 'approach' ? .12 : .025
      onwardMix = signatureEase(onwardMix, onward, dt, 4.2)
      pathProgress = initialized ? signatureEase(pathProgress, progress, dt, 5.5) : progress
      const margin = mobile.matches ? 12 : 24
      const top = Math.max(navBottom + 22, pageBox.top + 16)
      const bottom = Math.max(top + 30, Math.min(height - 24, pageBox.bottom - 16))
      const middleX = width / 2, middleY = (top + bottom) / 2
      const centerRangeX = width * .2, centerRangeY = (bottom - top) * .26
      const cx = middleX + centerRangeX * Math.tanh((mix(fx, nextX, onwardMix) - middleX) / centerRangeX)
      const cy = middleY + centerRangeY * Math.tanh((mix(fy, nextY, onwardMix) - middleY) / centerRangeY)
      // Fit a curved field inside its bounds instead of clipping moving coordinates at an edge.
      // The soft absolute keeps the radius continuous as its centre crosses the middle.
      const capacityX = width / 2 - margin - Math.hypot(cx - middleX, 8)
      const capacityY = (bottom - top) / 2 - Math.hypot(cy - middleY, 5)
      const radiusX = capacityX * Math.tanh((fw * .62 + (mobile.matches ? 12 : 30)) / capacityX)
      const radiusY = capacityY * Math.tanh((fh * .6 + 24) / capacityY)
      if (!initialized) Object.assign(flight, { x: cx, y: cy, rx: radiusX, ry: radiusY })
      else {
        flight.x = signatureEase(flight.x, cx, dt, 4.6); flight.y = signatureEase(flight.y, cy, dt, 4.6)
        flight.rx = signatureEase(flight.rx, radiusX, dt, 4.6); flight.ry = signatureEase(flight.ry, radiusY, dt, 4.6)
      }
      if (hasIndex) {
        // A tilted elliptical field spans the art and the space before its active title.
        // The points travel around that relationship; neither point lands on a label or drags it.
        const endX = indexX - (mobile.matches ? 18 : 34)
        const startX = mix(fx, nextX, onwardMix), startY = mix(fy, nextY, onwardMix)
        const dx = endX - startX, dy = indexY - startY, distance = Math.max(1, Math.hypot(dx, dy))
        const ux = dx / distance, uy = dy / distance
        const major = distance * .52 + fw * .09, minor = Math.min(fh * .21, mobile.matches ? 46 : 100)
        const rangeX = width * .28, rangeY = (bottom - top) * .3
        const bx = middleX + rangeX * Math.tanh(((startX + endX) / 2 - middleX) / rangeX)
        const by = middleY + rangeY * Math.tanh(((startY + indexY) / 2 - middleY) / rangeY)
        const roomX = width / 2 - margin - Math.hypot(bx - middleX, 8)
        const roomY = (bottom - top) / 2 - Math.hypot(by - middleY, 5)
        const extentX = Math.hypot(ux * major, uy * minor), extentY = Math.hypot(uy * major, ux * minor)
        // Smoothly fit the complete ellipse, with no clipped coordinates or flattened turns.
        const fit = 1 / Math.sqrt(1 + (extentX / roomX) ** 4 + (extentY / roomY) ** 4)
        const target = { x: bx, y: by, ax: ux * major * fit, ay: uy * major * fit, bx: -uy * minor * fit, by: ux * minor * fit }
        for (const key of ['x', 'y', 'ax', 'ay', 'bx', 'by'] as const) {
          bridge[key] = bridgeInitialized ? signatureEase(bridge[key], target[key], dt, 4.6) : target[key]
        }
        bridgeInitialized = true
      }
      const perimeterWidth = Math.min(width - margin * 2, 1856)
      const archiveCenterX = width / 2
      const archiveCenterY = (top + bottom) / 2
      const targetAttraction = selectedBox && selectedBox.bottom > top && selectedBox.top < bottom ? 1 : 0
      attraction = signatureEase(attraction, targetAttraction, dt, 3.1)
      if (selectedBox) attractionY = signatureEase(attractionY || middleY, clamp(selectedBox.top + selectedBox.height / 2, top, bottom), dt, 4.2)
      context.clearRect(0, 0, width, height)

      twoPointContract.order.forEach((id, index) => {
        const definition = twoPointContract.points[id]
        // Both paths are smooth harmonic curves. Their different cadence and response retain
        // Haegeum's sustained arc / Janggu's measured turns without square corners or edge plateaus.
        const a = phase * (index ? .94 : 1) + pathProgress * 7.8 + (index ? 2.58 : 0)
        const orbitX = flight.x + flight.rx * (.9 * Math.cos(a) + .07 * Math.cos(a * 2 + (index ? .9 : -.4)))
        const orbitY = flight.y + flight.ry * (.88 * Math.sin(a) + .08 * Math.sin(a * 2 + (index ? -.5 : .7)))
        const bow = Math.sin(a + (index ? .12 : -.12))
        const x = mix(orbitX, bridge.x + bridge.ax * Math.cos(a) + bridge.bx * bow, bridgeMix)
        const y = mix(orbitY, bridge.y + bridge.ay * Math.cos(a) + bridge.by * bow, bridgeMix)
        const drift = phase * (index ? .86 : 1) + index * 2.46
        let ambientX = archiveCenterX + perimeterWidth * (.42 * Math.cos(drift) + .025 * Math.sin(drift * 1.79))
        let ambientY = archiveCenterY + (bottom - top) * (.37 * Math.sin(drift * .79) + .04 * Math.cos(drift * 1.47))
        // Retain the outgoing attraction target while its strength damps after hover/focus leaves.
        ambientY = mix(ambientY, attractionY || archiveCenterY, attraction * (index ? .12 : .17))
        ambientX += (index ? -1 : 1) * attraction * Math.min(24, perimeterWidth * .025)
        const wanted = {
          x: mix(x, ambientX, archiveMix),
          y: mix(y, ambientY, archiveMix),
        }
        const point = positions[index]
        if (!initialized) { point.x = wanted.x; point.y = wanted.y }
        else {
          point.x = signatureEase(point.x, wanted.x, dt, definition.response)
          point.y = signatureEase(point.y, wanted.y, dt, definition.response)
        }
        const history = histories[index]
        // History storage is bounded independently from display refresh. The live endpoint is
        // still drawn on every rAF, including 120 Hz screens, with the full two-second tail.
        if (!history.length || now - history[history.length - 1].time >= 1000 / 60) history.push({ ...point, time: now })
        while (history.length > 2 && (now - history[0].time > twoPointContract.moving.trailMs || history.length > 144)) history.shift()
        context.strokeStyle = definition.color; context.lineCap = 'round'
        for (let i = 1; i <= history.length; i++) {
          const from = history[i - 1], to = history[i] ?? point
          const freshness = clamp(1 - (now - (from.time + (history[i]?.time ?? now)) / 2) / twoPointContract.moving.trailMs)
          context.globalAlpha = Math.pow(freshness, twoPointContract.moving.fadeExponent) * twoPointContract.moving.opacity
          context.lineWidth = Math.max(twoPointContract.moving.widthRange[0], twoPointContract.moving.trailWidth * freshness)
          context.beginPath(); context.moveTo(from.x, from.y); context.lineTo(to.x, to.y); context.stroke()
        }
        // A tiny terminal stroke is continuous with the tail, not an added circular/glowing head.
        const previous = history.at(-2)
        const dx = previous ? point.x - previous.x : 1, dy = previous ? point.y - previous.y : 0
        const length = Math.hypot(dx, dy)
        const nx = length > .001 ? dx / length : 1, ny = length > .001 ? dy / length : 0
        context.globalAlpha = twoPointContract.moving.opacity
        context.lineWidth = twoPointContract.moving.trailWidth
        context.beginPath(); context.moveTo(point.x - nx * 1.2, point.y - ny * 1.2); context.lineTo(point.x, point.y); context.stroke()
        element!.dataset[`${id}X`] = point.x.toFixed(2); element!.dataset[`${id}Y`] = point.y.toFixed(2)
      })
      initialized = true
      element!.dataset.motion = 'ambient'; element!.dataset.chapter = archiveMix > .5 ? 'archive' : segment
      element!.dataset.archiveWeight = archiveMix.toFixed(3)
      frame = requestAnimationFrame(paint)
    }
    function rowFrom(target: EventTarget | null) {
      return target instanceof Element ? target.closest<HTMLElement>('.atmospheric-archive [data-work-id]') : null
    }
    function over(event: PointerEvent) { if (event.pointerType === 'mouse') hoverRow = rowFrom(event.target); changed() }
    function out(event: PointerEvent) { hoverRow = rowFrom(event.relatedTarget); changed() }
    function focused(event: FocusEvent) { focusRow = rowFrom(event.target); changed() }
    function blurred(event: FocusEvent) { focusRow = rowFrom(event.relatedTarget); changed() }
    function changed() { measure(); if (!presentation()) return; request() }
    function dialogChanged() { modal = Boolean(document.querySelector('dialog[open]')); changed() }
    const intersection = new IntersectionObserver(changed)
    const sizing = new ResizeObserver(resize)
    const dialogs = new MutationObserver(dialogChanged)
    intersection.observe(owner); sizing.observe(owner)
    const navigation = document.querySelector('.editorial-navigation')
    if (navigation) sizing.observe(navigation)
    dialogs.observe(document.body, { subtree: true, attributes: true, attributeFilter: ['open'] })
    window.addEventListener('resize', resize); window.addEventListener('scroll', changed, { passive: true })
    document.addEventListener('visibilitychange', changed)
    owner.addEventListener('pointerover', over); owner.addEventListener('pointerout', out)
    owner.addEventListener('focusin', focused); owner.addEventListener('focusout', blurred)
    reduced.addEventListener('change', changed); mobile.addEventListener('change', resize)
    modal = Boolean(document.querySelector('dialog[open]'))
    resize()
    return () => {
      disposed = true; stop(); intersection.disconnect(); sizing.disconnect(); dialogs.disconnect()
      window.removeEventListener('resize', resize); window.removeEventListener('scroll', changed)
      document.removeEventListener('visibilitychange', changed)
      owner.removeEventListener('pointerover', over); owner.removeEventListener('pointerout', out)
      owner.removeEventListener('focusin', focused); owner.removeEventListener('focusout', blurred)
      reduced.removeEventListener('change', changed); mobile.removeEventListener('change', resize)
      canvas.width = 0; canvas.height = 0
    }
  }, [mounted, scope])

  if (!mounted) return null
  const colors = {
    '--signature-haegeum': twoPointContract.points.haegeum.color,
    '--signature-janggu': twoPointContract.points.janggu.color,
    '--signature-static-width': `${twoPointContract.static.desktop.width}px`,
    '--signature-static-height': `${twoPointContract.static.desktop.height}px`,
    '--signature-static-mobile-width': `${twoPointContract.static.mobile.width}px`,
    '--signature-static-mobile-height': `${twoPointContract.static.mobile.height}px`,
    '--signature-static-opacity': twoPointContract.static.opacity,
  } as CSSProperties
  return createPortal(<div ref={layer} className="works-signature-pair" aria-hidden="true" data-static="true" style={colors}>
    <canvas ref={surface} aria-hidden="true" />
    <i data-signature-point="haegeum" /><i data-signature-point="janggu" />
  </div>, document.body)
}
