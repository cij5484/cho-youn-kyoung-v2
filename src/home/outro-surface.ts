import { useEffect, type RefObject } from 'react'
import { createHanjiField } from '../experience-prototype/hanji-mask.ts'
import { autonomousWetReady, blankTapIsWet, gentleGlyph, outroCanvasScale, outroGlyphTarget, restingGlyph,
  wetColorAt, wetEnvelope, wetFieldTiming, type GlyphPose } from './outro-surface-model.ts'
import './outro-surface.css'

type Stain = { x: number; y: number; birth: number; radius: number; angle: number; strength: number; life: number; attack: number }
type Letter = { element: HTMLElement; x: number; y: number; pose: GlyphPose }
type PaperPoint = { x: number; y: number; clientX: number; clientY: number; speed: number; angle: number; strand: number }

/** The existing fibre shape stays unchanged. Dye is separate from this immutable alpha. */
function paperStamp() {
  const field = createHanjiField(112, 112), stamp = document.createElement('canvas')
  stamp.width = field.width; stamp.height = field.height
  const context = stamp.getContext('2d')
  if (!context) throw new Error('Paper stamp context unavailable')
  const image = context.createImageData(field.width, field.height)
  for (let y = 0; y < field.height; y++) for (let x = 0; x < field.width; x++) {
    const index = y * field.width + x, offset = index * 4, fibre = field.arrival[index]
    const nx = x / (field.width - 1) * 2 - 1, ny = y / (field.height - 1) * 2 - 1
    const angle = Math.atan2(ny, nx)
    const edge = .7 + (fibre - .5) * .42 + Math.sin(angle * 7 + fibre * 13) * .055
    const distance = Math.hypot(nx * (1 + fibre * .23), ny * (.82 + fibre * .12))
    const coverage = Math.max(0, Math.min(1, (edge - distance) / .16))
    image.data[offset] = 255; image.data[offset + 1] = 255; image.data[offset + 2] = 255
    image.data[offset + 3] = Math.round(coverage * coverage * (3 - 2 * coverage) * (.47 + fibre * .53) * 255)
  }
  context.putImageData(image, 0, 0)
  return stamp
}

/** One surface/clock: pointer, inherited points and optional blank tap are different sources. */
export function useOutroSurface(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = ref.current
    if (!root) return
    const fine = matchMedia('(hover:hover) and (pointer:fine)'), reduced = matchMedia('(prefers-reduced-motion: reduce)')
    const dialog = document.querySelector<HTMLDialogElement>('.navigation-menu'), pointOwner = root.closest<HTMLElement>('.home-closing')
    const canvas = document.createElement('canvas')
    canvas.className = 'outro-wet-surface'; canvas.setAttribute('aria-hidden', 'true'); root.prepend(canvas)
    let context: CanvasRenderingContext2D | null = null, stamp: HTMLCanvasElement | null = null
    let dyed: HTMLCanvasElement | null = null, dye: CanvasRenderingContext2D | null = null
    try { context = canvas.getContext('2d') } catch { /* Graphic failure leaves DOM interactions intact. */ }
    const letters: Letter[] = [...root.querySelectorAll<HTMLElement>('[data-outro-glyph]')].map(element => ({ element, x: 0, y: 0, pose: { ...restingGlyph } }))
    const stains: Stain[] = [], contacts = new Set<number>()
    const previousPoints = new Map<number, { x: number; y: number; time: number }>()
    const colorOrigin = performance.now()
    let frame = 0, last = 0, width = 0, height = 0, disposed = false, visible = false, modalOpen = Boolean(dialog?.open)
    let pointer: { x: number; y: number } | null = null, emitted: { x: number; y: number; time: number } | null = null, stampIndex = 0
    let pointerClient: { x: number; y: number } | null = null, geometryDirty = true
    let enteredAt = colorOrigin, lastScroll = colorOrigin, lastAutonomous = -Infinity, nextStrand = 0, autonomousCount = 0, tapCount = 0
    let tap: { id: number; x: number; y: number; started: number; distance: number } | null = null
    const interactive = (target: EventTarget | null) => target instanceof Element && !!target.closest('a,button,input,select,textarea,[role="button"],[contenteditable="true"]')

    function sourceState() { root!.dataset.outroSource = reduced.matches ? 'static' : fine.matches ? 'pointer' : 'points' }
    function setGlyph(letter: Letter) {
      const p = letter.pose
      letter.element.style.setProperty('--outro-glyph-x', `${p.x.toFixed(3)}px`)
      letter.element.style.setProperty('--outro-glyph-y', `${p.y.toFixed(3)}px`)
      letter.element.style.setProperty('--outro-glyph-turn', `${p.turn.toFixed(3)}deg`)
      letter.element.style.setProperty('--outro-glyph-stretch', p.stretch.toFixed(5))
    }
    function request() { if (!disposed && visible && !document.hidden && !modalOpen && !reduced.matches && !frame) frame = requestAnimationFrame(paint) }
    function glyphGeometry(box = root!.getBoundingClientRect()) {
      for (const letter of letters) {
        const b = letter.element.getBoundingClientRect()
        letter.x = b.left - box.left + b.width / 2; letter.y = b.top - box.top + b.height / 2
      }
      geometryDirty = false
      if (pointerClient) {
        if (pointerClient.x < box.left || pointerClient.x > box.right || pointerClient.y < box.top || pointerClient.y > box.bottom) {
          pointerClient = null; pointer = null; emitted = null
        } else pointer = { x: pointerClient.x - box.left, y: pointerClient.y - box.top }
      }
    }
    function prepareStamp() {
      if (!context) return false
      if (!stamp) {
        try {
          stamp = paperStamp(); dyed = document.createElement('canvas'); dyed.width = stamp.width; dyed.height = stamp.height
          dye = dyed.getContext('2d')
          if (!dye) throw new Error('Paper dye context unavailable')
        } catch { context = null; root!.dataset.outroSurface = 'unavailable'; return false }
      }
      return true
    }
    function colorStamp(now: number) {
      if (!dye || !dyed || !stamp) return
      const color = wetColorAt((now - colorOrigin) / 1000).map(value => value.toFixed(3)).join(' ')
      dye.clearRect(0, 0, dyed.width, dyed.height); dye.globalCompositeOperation = 'source-over'; dye.drawImage(stamp, 0, 0)
      dye.globalCompositeOperation = 'source-in'; dye.fillStyle = `rgb(${color})`; dye.fillRect(0, 0, dyed.width, dyed.height)
      dye.globalCompositeOperation = 'source-over'; root!.dataset.outroColor = color
    }
    function mobilePoints(now: number): PaperPoint[] {
      if (!pointOwner || pointOwner.dataset.orbitState !== 'running' || pointOwner.dataset.orbitScene !== '8') return []
      const box = root!.getBoundingClientRect(), points: PaperPoint[] = []
      for (const strand of [0, 1]) {
        const clientX = Number(pointOwner.dataset[`orbit${strand}X`]), clientY = Number(pointOwner.dataset[`orbit${strand}Y`])
        if (!Number.isFinite(clientX) || !Number.isFinite(clientY)) continue
        const before = previousPoints.get(strand), x = clientX - box.left, y = clientY - box.top
        const speed = before ? Math.hypot(x - before.x, y - before.y) / Math.max(1, now - before.time) : 0
        const angle = before ? Math.atan2(y - before.y, x - before.x) : strand ? -.4 : .4
        previousPoints.set(strand, { x, y, time: now })
        if (x > 0 && x < width && y > 0 && y < height && clientY > 0 && clientY < innerHeight) points.push({ x, y, clientX, clientY, speed, angle, strand })
      }
      return points
    }
    function autonomous(points: PaperPoint[], now: number) {
      if (!autonomousWetReady({ now, enteredAt, lastScroll, lastStain: lastAutonomous, regions: stains.length,
        visible, reduced: reduced.matches, touching: contacts.size > 0 }) || !context) return
      const radius = Math.max(72, Math.min(125, width * .3))
      const candidates = points.filter(point => {
        const nearName = letters.some(letter => Math.hypot(point.x - letter.x, point.y - letter.y) < radius * 1.35)
        const quietPaper = point.x > width * .14 && point.x < width * .86 && point.clientY > innerHeight * .2 && point.clientY < innerHeight * .8
        return (nearName || quietPaper) && !interactive(document.elementFromPoint(point.clientX, point.clientY))
      })
      const point = candidates.find(point => point.strand === nextStrand) ?? candidates[0]
      if (!point || !prepareStamp()) return
      stains.push({ x: point.x, y: point.y, birth: now, radius: 47 + Math.min(1, point.speed / .18) * 15,
        angle: point.angle, strength: .135, life: wetFieldTiming.mobileLife, attack: wetFieldTiming.mobileAttack })
      nextStrand = 1 - point.strand; lastAutonomous = now; autonomousCount++
      root!.dataset.outroAutonomousStamps = String(autonomousCount)
    }
    function paint(now: number) {
      frame = 0
      if (!visible || document.hidden || modalOpen || reduced.matches || disposed) return
      const dt = Math.min(.04, (now - (last || now - 16)) / 1000); last = now
      if (pointerClient || geometryDirty) glyphGeometry()
      for (let i = stains.length - 1; i >= 0; i--) if (now - stains[i].birth >= stains[i].life * 1000) stains.splice(i, 1)
      const points = fine.matches ? [] : mobilePoints(now)
      if (!fine.matches) autonomous(points, now)
      context?.clearRect(0, 0, width, height)
      if (stains.length) colorStamp(now)
      for (const stain of stains) {
        const envelope = wetEnvelope((now - stain.birth) / 1000, stain.life, stain.attack)
        if (context && dyed) {
          const size = stain.radius * envelope.spread * 2
          context.save(); context.globalAlpha = envelope.opacity * stain.strength
          context.translate(stain.x, stain.y); context.rotate(stain.angle)
          context.drawImage(dyed, -size / 2, -size / 2, size, size); context.restore()
        }
      }
      let settling = false
      const radius = Math.max(90, Math.min(205, width * .17)), response = 1 - Math.exp(-dt * 12)
      const mobileSettled = now - enteredAt >= wetFieldTiming.entryQuiet && now - lastScroll >= wetFieldTiming.scrollQuiet && !contacts.size
      for (const letter of letters) {
        let target = pointer ? outroGlyphTarget(pointer.x - letter.x, pointer.y - letter.y, radius) : restingGlyph
        if (!fine.matches && mobileSettled) {
          const nearest = points.reduce<PaperPoint | null>((best, point) => !best || Math.hypot(point.x - letter.x, point.y - letter.y) < Math.hypot(best.x - letter.x, best.y - letter.y) ? point : best, null)
          if (nearest) target = gentleGlyph(outroGlyphTarget(nearest.x - letter.x, nearest.y - letter.y, Math.min(115, radius)))
        }
        for (const key of ['x', 'y', 'turn', 'stretch'] as const) {
          letter.pose[key] += (target[key] - letter.pose[key]) * response
          if (Math.abs(letter.pose[key] - target[key]) < .0003) letter.pose[key] = target[key]
          else settling = true
        }
        setGlyph(letter)
      }
      root!.dataset.outroStains = String(stains.length)
      root!.dataset.outroSurface = context ? stains.length || settling ? 'active' : 'idle' : 'unavailable'
      if (stains.length || settling) request()
      else last = 0
    }
    function suspend() {
      cancelAnimationFrame(frame); frame = 0; last = 0; pointer = null; pointerClient = null; emitted = null; stains.length = 0; tap = null; contacts.clear(); previousPoints.clear()
      context?.clearRect(0, 0, width, height)
      for (const letter of letters) { letter.pose = { ...restingGlyph }; setGlyph(letter) }
      root!.dataset.outroSurface = reduced.matches ? 'static' : context ? 'suspended' : 'unavailable'; root!.dataset.outroStains = '0'
    }
    function measure() {
      const box = root!.getBoundingClientRect(); width = box.width; height = box.height
      const scale = outroCanvasScale(width, height, devicePixelRatio || 1), enabled = !reduced.matches && context
      canvas.width = enabled ? Math.max(1, Math.round(width * scale)) : 1; canvas.height = enabled ? Math.max(1, Math.round(height * scale)) : 1
      context?.setTransform(scale, 0, 0, scale, 0, 0); glyphGeometry(box); request()
    }
    function move(event: PointerEvent) {
      if (event.pointerType === 'touch') {
        if (tap?.id === event.pointerId) tap.distance = Math.max(tap.distance, Math.hypot(event.clientX - tap.x, event.clientY - tap.y))
        return
      }
      if (!fine.matches || reduced.matches || modalOpen || !visible) return
      const box = root!.getBoundingClientRect(), now = performance.now()
      pointerClient = { x: event.clientX, y: event.clientY }; glyphGeometry(box)
      if (!pointer) return
      const distance = emitted ? Math.hypot(pointer.x - emitted.x, pointer.y - emitted.y) : Infinity
      if (distance > 9 || emitted && now - emitted.time > 65) {
        const speed = emitted ? Math.min(1, distance / Math.max(1, now - emitted.time) / 1.4) : .25
        const angle = emitted ? Math.atan2(pointer.y - emitted.y, pointer.x - emitted.x) : -.4
        if (prepareStamp()) stains.push({ ...pointer, birth: now, radius: 68 + speed * 58,
          angle: angle + Math.sin(stampIndex * 1.71) * .6, strength: .105 + speed * .04, life: 1.45, attack: 0 })
        if (stains.length > 26) stains.shift()
        stampIndex++; emitted = { ...pointer, time: now }
      }
      request()
    }
    function touchDown(event: PointerEvent) {
      if (event.pointerType !== 'touch' || fine.matches || reduced.matches || modalOpen || !visible) return
      contacts.add(event.pointerId)
      tap = contacts.size === 1 && !interactive(event.target) ? { id: event.pointerId, x: event.clientX, y: event.clientY, started: performance.now(), distance: 0 } : null
    }
    function touchUp(event: PointerEvent) {
      const now = performance.now(), candidate = tap, contactCount = contacts.size
      contacts.delete(event.pointerId); tap = null
      if (!candidate || candidate.id !== event.pointerId || fine.matches || reduced.matches || modalOpen || !visible) return
      const distance = Math.max(candidate.distance, Math.hypot(event.clientX - candidate.x, event.clientY - candidate.y))
      if (blankTapIsWet(now - candidate.started, distance, interactive(event.target), contactCount) && stains.length < wetFieldTiming.regionLimit && prepareStamp()) {
        const box = root!.getBoundingClientRect()
        stains.push({ x: event.clientX - box.left, y: event.clientY - box.top, birth: now, radius: 42, angle: -.4,
          strength: .15, life: wetFieldTiming.mobileLife, attack: wetFieldTiming.mobileAttack })
        lastAutonomous = now; tapCount++; root!.dataset.outroTapStamps = String(tapCount); request()
      }
    }
    function touchCancel(event: PointerEvent) { contacts.delete(event.pointerId); tap = null }
    function leave() { pointer = null; pointerClient = null; emitted = null; request() }
    function visibility() { if (document.hidden) suspend(); else { enteredAt = performance.now(); request() } }
    function preferences() { suspend(); enteredAt = performance.now(); sourceState(); measure() }
    const observer = new IntersectionObserver(entries => {
      const next = entries.some(entry => entry.isIntersecting)
      if (next && !visible) enteredAt = performance.now()
      visible = next
      if (visible) { measure(); request() } else suspend()
    })
    const size = new ResizeObserver(measure); size.observe(root); observer.observe(root)
    const modal = new MutationObserver(() => {
      modalOpen = Boolean(dialog?.open)
      if (modalOpen) suspend(); else { enteredAt = performance.now(); request() }
    })
    if (dialog) modal.observe(dialog, { attributes: true, attributeFilter: ['open'] })
    // Scene writes identify native scrolling; point writes supply real coordinates. Neither
    // observer changes the source timeline or adds a global scroll/pointer owner.
    const choreography = new MutationObserver(() => { lastScroll = performance.now(); geometryDirty = true; request() })
    choreography.observe(root, { attributes: true, attributeFilter: ['style'] })
    const pointMotion = new MutationObserver(() => { if (!fine.matches) request() })
    if (pointOwner) pointMotion.observe(pointOwner, { attributes: true, attributeFilter: ['data-orbit0-x','data-orbit0-y','data-orbit1-x','data-orbit1-y'] })
    root.addEventListener('pointermove', move, { passive: true }); root.addEventListener('pointerleave', leave)
    root.addEventListener('pointerdown', touchDown, { passive: true }); root.addEventListener('pointerup', touchUp, { passive: true }); root.addEventListener('pointercancel', touchCancel, { passive: true })
    document.addEventListener('visibilitychange', visibility); reduced.addEventListener('change', preferences); fine.addEventListener('change', preferences)
    const box = root.getBoundingClientRect(); visible = box.bottom > 0 && box.top < innerHeight
    root.dataset.outroAutonomousStamps = '0'; root.dataset.outroTapStamps = '0'; root.dataset.outroStains = '0'
    root.dataset.outroSurface = reduced.matches ? 'static' : context ? 'idle' : 'unavailable'; sourceState(); measure()
    if (modalOpen) suspend()
    return () => {
      disposed = true; suspend(); observer.disconnect(); size.disconnect(); modal.disconnect(); choreography.disconnect(); pointMotion.disconnect()
      root.removeEventListener('pointermove', move); root.removeEventListener('pointerleave', leave)
      root.removeEventListener('pointerdown', touchDown); root.removeEventListener('pointerup', touchUp); root.removeEventListener('pointercancel', touchCancel)
      document.removeEventListener('visibilitychange', visibility); reduced.removeEventListener('change', preferences); fine.removeEventListener('change', preferences)
      for (const letter of letters) for (const property of ['--outro-glyph-x', '--outro-glyph-y', '--outro-glyph-turn', '--outro-glyph-stretch']) letter.element.style.removeProperty(property)
      for (const resource of [stamp, dyed, canvas]) if (resource) { resource.width = 0; resource.height = 0 }
      stamp = null; dyed = null; dye = null; canvas.remove(); context = null
      for (const key of ['outroSurface','outroSource','outroStains','outroColor','outroAutonomousStamps','outroTapStamps']) delete root.dataset[key]
    }
  }, [ref])
}
