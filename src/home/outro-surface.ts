import { useEffect, type RefObject } from 'react'
import { createHanjiField } from '../experience-prototype/hanji-mask.ts'
import { outroCanvasScale, outroGlyphTarget, restingGlyph, wetEnvelope, type GlyphPose } from './outro-surface-model.ts'
import './outro-surface.css'

type Stain = { x: number; y: number; birth: number; radius: number; angle: number; tone: number; strength: number }
type Letter = { element: HTMLElement; x: number; y: number; pose: GlyphPose }

/** Reuses only the pure paper field, never the portrait adapter, photograph or scroll timeline. */
function paperStamps() {
  const field = createHanjiField(112, 112)
  return [[99, 52, 229], [163, 61, 54], [173, 140, 84]].map(color => {
    const stamp = document.createElement('canvas'); stamp.width = field.width; stamp.height = field.height
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
      image.data[offset] = color[0]; image.data[offset + 1] = color[1]; image.data[offset + 2] = color[2]
      image.data[offset + 3] = Math.round(coverage * coverage * (3 - 2 * coverage) * (.47 + fibre * .53) * 255)
    }
    context.putImageData(image, 0, 0)
    return stamp
  })
}

/** One local pointer stream and one settling RAF own the paper response and nearby large glyphs. */
export function useOutroSurface(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = ref.current
    if (!root) return
    const fine = matchMedia('(hover:hover) and (pointer:fine)'), reduced = matchMedia('(prefers-reduced-motion: reduce)')
    const dialog = document.querySelector<HTMLDialogElement>('.navigation-menu')
    const canvas = document.createElement('canvas')
    canvas.className = 'outro-wet-surface'; canvas.setAttribute('aria-hidden', 'true'); root.prepend(canvas)
    let context: CanvasRenderingContext2D | null = null, stamps: HTMLCanvasElement[] = []
    try { context = canvas.getContext('2d') } catch { /* A graphic capability failure leaves all DOM interactions intact. */ }
    const letters: Letter[] = [...root.querySelectorAll<HTMLElement>('[data-outro-glyph]')].map(element => ({ element, x: 0, y: 0, pose: { ...restingGlyph } }))
    const stains: Stain[] = []
    let frame = 0, last = 0, width = 0, height = 0, disposed = false, visible = false, modalOpen = Boolean(dialog?.open)
    let pointer: { x: number; y: number } | null = null, emitted: { x: number; y: number; time: number } | null = null, stampIndex = 0
    let pointerClient: { x: number; y: number } | null = null
    root.dataset.outroSurface = reduced.matches ? 'static' : !fine.matches ? 'touch-static' : context ? 'idle' : 'unavailable'

    function setGlyph(letter: Letter) {
      const p = letter.pose
      letter.element.style.setProperty('--outro-glyph-x', `${p.x.toFixed(3)}px`)
      letter.element.style.setProperty('--outro-glyph-y', `${p.y.toFixed(3)}px`)
      letter.element.style.setProperty('--outro-glyph-turn', `${p.turn.toFixed(3)}deg`)
      letter.element.style.setProperty('--outro-glyph-stretch', p.stretch.toFixed(5))
    }
    function request() { if (!disposed && visible && !document.hidden && !modalOpen && fine.matches && !reduced.matches && !frame) frame = requestAnimationFrame(paint) }
    function glyphGeometry(box = root!.getBoundingClientRect()) {
      // Word entry transforms and document scroll can change after the first ResizeObserver call.
      // Read the actual current letter boxes only when input/the existing scene owner wakes us.
      for (const letter of letters) {
        const b = letter.element.getBoundingClientRect()
        letter.x = b.left - box.left + b.width / 2
        letter.y = b.top - box.top + b.height / 2
      }
      if (pointerClient) {
        if (pointerClient.x < box.left || pointerClient.x > box.right || pointerClient.y < box.top || pointerClient.y > box.bottom) {
          pointerClient = null; pointer = null; emitted = null
        } else pointer = { x: pointerClient.x - box.left, y: pointerClient.y - box.top }
      }
    }
    function paint(now: number) {
      frame = 0
      if (!visible || document.hidden || modalOpen || reduced.matches || disposed) return
      const dt = Math.min(.04, (now - (last || now - 16)) / 1000); last = now
      if (pointerClient) glyphGeometry()
      context?.clearRect(0, 0, width, height)
      for (let i = stains.length - 1; i >= 0; i--) {
        const stain = stains[i], envelope = wetEnvelope((now - stain.birth) / 1000)
        if (!envelope.opacity) { stains.splice(i, 1); continue }
        if (context && stamps.length) {
          const size = stain.radius * envelope.spread * 2
          context.save(); context.globalAlpha = envelope.opacity * stain.strength
          context.translate(stain.x, stain.y); context.rotate(stain.angle)
          context.drawImage(stamps[stain.tone], -size / 2, -size / 2, size, size)
          context.restore()
        }
      }
      let settling = false
      const radius = Math.max(90, Math.min(205, width * .17)), response = 1 - Math.exp(-dt * 12)
      for (const letter of letters) {
        const target = pointer ? outroGlyphTarget(pointer.x - letter.x, pointer.y - letter.y, radius) : restingGlyph
        for (const key of ['x', 'y', 'turn', 'stretch'] as const) {
          letter.pose[key] += (target[key] - letter.pose[key]) * response
          if (Math.abs(letter.pose[key] - target[key]) < .0003) letter.pose[key] = target[key]
          else settling = true
        }
        setGlyph(letter)
      }
      root!.dataset.outroSurface = context ? stains.length || settling ? 'active' : 'idle' : 'unavailable'
      if (stains.length || settling) request()
      else last = 0
    }
    function suspend() {
      cancelAnimationFrame(frame); frame = 0; last = 0; pointer = null; pointerClient = null; emitted = null; stains.length = 0
      context?.clearRect(0, 0, width, height)
      for (const letter of letters) { letter.pose = { ...restingGlyph }; setGlyph(letter) }
      root!.dataset.outroSurface = reduced.matches ? 'static' : !fine.matches ? 'touch-static' : context ? 'suspended' : 'unavailable'
    }
    function measure() {
      const box = root!.getBoundingClientRect(); width = box.width; height = box.height
      const scale = outroCanvasScale(width, height, devicePixelRatio || 1)
      const enabled=fine.matches&&!reduced.matches&&context
      canvas.width = enabled?Math.max(1, Math.round(width * scale)):1; canvas.height = enabled?Math.max(1, Math.round(height * scale)):1
      context?.setTransform(scale, 0, 0, scale, 0, 0)
      glyphGeometry(box)
      request()
    }
    function move(event: PointerEvent) {
      if (!fine.matches || reduced.matches || modalOpen || event.pointerType === 'touch' || !visible) return
      const box = root!.getBoundingClientRect(), now = performance.now()
      pointerClient = { x: event.clientX, y: event.clientY }
      glyphGeometry(box)
      if (!pointer) return
      const distance = emitted ? Math.hypot(pointer.x - emitted.x, pointer.y - emitted.y) : Infinity
      if (distance > 9 || emitted && now - emitted.time > 65) {
        if (context && !stamps.length) {
          try { stamps = paperStamps() } catch { context = null; root!.dataset.outroSurface = 'unavailable' }
        }
        const speed = emitted ? Math.min(1, distance / Math.max(1, now - emitted.time) / 1.4) : .25
        const angle = emitted ? Math.atan2(pointer.y - emitted.y, pointer.x - emitted.x) : -.4
        if (context) stains.push({ ...pointer, birth: now, radius: 68 + speed * 58,
          angle: angle + Math.sin(stampIndex * 1.71) * .6, tone: Math.floor(stampIndex / 5) % 3, strength: .105 + speed * .04 })
        if (stains.length > 26) stains.shift()
        stampIndex++; emitted = { ...pointer, time: now }
      }
      request()
    }
    function leave() { pointer = null; pointerClient = null; emitted = null; request() }
    function visibility() { if (document.hidden) suspend(); else request() }
    function preferences() { suspend(); measure() }
    const observer = new IntersectionObserver(entries => {
      visible = entries.some(entry => entry.isIntersecting)
      if (visible) { measure(); request() } else suspend()
    })
    const size = new ResizeObserver(measure); size.observe(root); observer.observe(root)
    const modal = new MutationObserver(() => {
      modalOpen = Boolean(dialog?.open)
      if (modalOpen) suspend(); else request()
    })
    if (dialog) modal.observe(dialog, { attributes: true, attributeFilter: ['open'] })
    // Reuse existing scene progress notifications instead of another global scroll listener/RAF.
    const choreography = new MutationObserver(() => { if (pointerClient) request() })
    choreography.observe(root, { attributes: true, attributeFilter: ['style'] })
    root.addEventListener('pointermove', move, { passive: true }); root.addEventListener('pointerleave', leave)
    document.addEventListener('visibilitychange', visibility); reduced.addEventListener('change', preferences); fine.addEventListener('change', preferences)
    const box = root.getBoundingClientRect(); visible = box.bottom > 0 && box.top < innerHeight
    measure()
    if (modalOpen) suspend()
    return () => {
      disposed = true; suspend(); observer.disconnect(); size.disconnect(); modal.disconnect(); choreography.disconnect()
      root.removeEventListener('pointermove', move); root.removeEventListener('pointerleave', leave)
      document.removeEventListener('visibilitychange', visibility); reduced.removeEventListener('change', preferences); fine.removeEventListener('change', preferences)
      for (const letter of letters) for (const property of ['--outro-glyph-x', '--outro-glyph-y', '--outro-glyph-turn', '--outro-glyph-stretch']) letter.element.style.removeProperty(property)
      stamps.forEach(stamp => { stamp.width = 0; stamp.height = 0 }); stamps = []
      canvas.width = 0; canvas.height = 0; canvas.remove(); context = null; delete root.dataset.outroSurface
    }
  }, [ref])
}
