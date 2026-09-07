import { useEffect, useRef, type RefObject } from 'react'
import { createTrailSampler, type TrailSample } from '../motion/trail-geometry.ts'

export const worksRibbonTuning = {
  spacing: .46, depth: 210, turn: 48, response: 11,
  orbitResponse: 5.5, orbitSpeed: .65, trailMs: 430, trailWidth: 2.2,
  colors: ['#6334E5', '#9A8164'],
} as const
const clamp = (n: number) => Math.max(0, Math.min(1, n))
const smooth = (n: number) => { const p = clamp(n); return p * p * (3 - 2 * p) }

/** A short native-scroll ribbon. Its two-depth motif inherits the real outgoing SOUND strands. */
export function useWorksRibbon(ref: RefObject<HTMLElement | null>, onActive: (index: number) => void) {
  const seek = useRef<(index: number) => void>(() => {})
  useEffect(() => {
    const root = ref.current!, sticky = root.querySelector<HTMLElement>('.works-sticky')!, board = root.querySelector<HTMLElement>('.works-board')!
    const cards = [...board.querySelectorAll<HTMLElement>('.selected-work')], links = cards.map(card => card.querySelector('a')!)
    const canvases = [...root.querySelectorAll<HTMLCanvasElement>('.works-motif')], contexts = canvases.map(canvas => canvas.getContext('2d'))
    const axis = root.querySelector<SVGSVGElement>('.works-axis')!, paths = [...axis.querySelectorAll('path')]
    const sound = document.querySelector<HTMLElement>('.sound-experience'), source = sound?.querySelector<HTMLElement>('.line-one')
    const owner = root.closest<HTMLElement>('.home-closing')!, reduced = matchMedia('(prefers-reduced-motion: reduce)'), mobile = matchMedia('(max-width:639px)'), fine = matchMedia('(hover:hover) and (pointer:fine)')
    const tune = worksRibbonTuning, sampler = createTrailSampler(2048)
    const histories: TrailSample[][] = [[], []]
    const tilts = cards.map(() => ({ x: 0, y: 0 }))
    let frame = 0, last = 0, phase = 0, width = 0, height = 0, visible = false, disposed = false, position = 0, target = 0, active = -1
    let pointer: { x: number; y: number } | null = null, focus = -1, orbit = 0, cx = 0, cy = 0, rx = 0, ry = 0, layoutDirty = true
    function request() { if (!frame && !disposed && !document.hidden) frame = requestAnimationFrame(paint) }
    function resize() {
      width = innerWidth; height = innerHeight
      const dpr = Math.min(devicePixelRatio || 1, 1.75)
      canvases.forEach((canvas, i) => { canvas.width = Math.round(width * dpr); canvas.height = Math.round(Math.min(height, innerHeight * 1.2) * dpr); contexts[i]?.setTransform(dpr, 0, 0, dpr, 0, 0) })
      histories.forEach(history => { history.length = 0 }); layoutDirty = true; request()
    }
    function paint(now: number) {
      frame = 0
      const section = root.getBoundingClientRect()
      visible = section.top < innerHeight && section.bottom > 0
      if (!visible || document.hidden || document.querySelector('dialog[open]')) { last = 0; contexts.forEach(context=>context?.clearRect(0,0,width,height)); histories.forEach(history => { history.length = 0 }); axis.style.opacity='0'; return }
      const dt = Math.min(.04, (now - (last || now - 16)) / 1000); last = now; phase += dt * tune.orbitSpeed
      const grid = mobile.matches || reduced.matches
      target = clamp(-section.top / Math.max(1, section.height - innerHeight)) * (cards.length - 1)
      position += (target - position) * (1 - Math.exp(-tune.response * dt))
      if (Math.abs(target - position) < .0005) position = target
      const nextActive = Math.round(position)
      if (nextActive !== active) { active = nextActive; onActive(active); root.dataset.ribbonIndex = String(active) }
      const boardBox = board.getBoundingClientRect()
      if (!grid) {
        cards.forEach((card, i) => {
          const offset = i - position, distance = Math.abs(offset)
          card.style.transform = `translate(-50%,-50%) translate3d(${(offset * width * tune.spacing).toFixed(2)}px,${(distance * distance * 26).toFixed(2)}px,${(-Math.pow(distance, 1.3) * tune.depth).toFixed(2)}px) rotateY(${(-Math.max(-1.6, Math.min(1.6, offset)) * tune.turn).toFixed(2)}deg) rotateZ(${(offset * 4).toFixed(2)}deg)`
          card.style.zIndex = String(10 - Math.round(distance * 2)); card.style.setProperty('--work-distance', String(Math.min(1, distance)))
          links[i].tabIndex = i === active ? 0 : -1
          card.dataset.current = String(i === active)
        })
      } else if (layoutDirty) cards.forEach((card, i) => { card.style.removeProperty('transform'); card.style.removeProperty('z-index'); card.style.removeProperty('--work-distance'); links[i].tabIndex = 0 })
      layoutDirty = false
      const handoff = clamp((innerHeight - section.top) / innerHeight)
      owner.dataset.lineHandoff = handoff.toFixed(3)
      contexts.forEach(context => context?.clearRect(0, 0, width, height))
      if (grid) { axis.style.opacity = '0'; sound?.style.setProperty('--home-line-handoff', reduced.matches ? '0' : String(handoff)); return }
      let hover = focus
      if (pointer && fine.matches) {
        let closest = 100
        cards.forEach((card, i) => {
          const box = card.querySelector('.work-image')!.getBoundingClientRect()
          const dx = Math.max(box.left - pointer!.x, 0, pointer!.x - box.right), dy = Math.max(box.top - pointer!.y, 0, pointer!.y - box.bottom)
          const distance = Math.hypot(dx, dy)
          if (distance < closest && Math.abs(i - position) < 1.3) { closest = distance; hover = i }
        })
      }
      const departure = smooth(1 - section.bottom / innerHeight)
      if (departure > .02) hover = -1
      const gathering = hover >= 0, blend = 1 - Math.exp(-tune.orbitResponse * dt)
      cards.forEach((card, i) => {
        const box = card.getBoundingClientRect(), pointed = i === hover && pointer
        const tilt = tilts[i]
        tilt.x += ((pointed ? Math.max(-1, Math.min(1, (pointer!.x - box.left) / box.width * 2 - 1)) : 0) - tilt.x) * blend
        tilt.y += ((pointed ? Math.max(-1, Math.min(1, (pointer!.y - box.top) / box.height * 2 - 1)) : 0) - tilt.y) * blend
        card.style.setProperty('--work-tilt-x', tilt.x.toFixed(4)); card.style.setProperty('--work-tilt-y', tilt.y.toFixed(4))
        card.style.setProperty('--work-hover', i === hover ? '1' : '0')
      })
      orbit += ((gathering ? 1 : 0) - orbit) * blend
      const anchor = gathering ? cards[hover].querySelector('.work-image')!.getBoundingClientRect() : null
      const incoming = owner.querySelector('.album-exchange-slot[data-active="true"] .album-object-pose')?.getBoundingClientRect()
      const freeX = anchor ? anchor.left + anchor.width / 2 : width * .5
      const freeY = anchor ? anchor.top + anchor.height * .51 : boardBox.top + boardBox.height * .48
      const tx = incoming ? freeX + (incoming.left + incoming.width / 2 - freeX) * departure : freeX
      const ty = incoming ? freeY + (incoming.top + incoming.height / 2 - freeY) * departure : freeY
      if (!cx) { cx = tx; cy = ty; rx = width * .34; ry = Math.min(150, height * .16) }
      cx += (tx - cx) * blend; cy += (ty - cy) * blend
      rx += ((anchor ? anchor.width * .63 : width * .34 * (1 - departure * .35)) - rx) * blend
      ry += ((anchor ? anchor.height * .28 : Math.min(150, height * .16)) - ry) * blend
      root.dataset.motif = departure > .1 ? 'object-handoff' : orbit > .5 ? 'orbit' : 'free'
      root.dataset.orbitWork = gathering ? String(hover) : ''
      const from = source?.getBoundingClientRect(), convergence = smooth((handoff - .15) / .85)
      const alpha = smooth((handoff - .48) / .42) * (1 - smooth((departure - .65) / .35))
      axis.style.opacity = from && handoff < 1 ? String((1 - smooth((handoff - .82) / .18)) * .72) : '0'
      for (let i = 0; i < 2; i++) {
        const angle = phase + i * Math.PI, z = Math.sin(angle)
        const x = cx + Math.cos(angle) * rx, y = cy + Math.sin(angle) * ry + Math.cos(angle) * rx * .12 * orbit
        if (from) {
          const originY = from.top + i * 19, endY = y
          const x1 = from.left + (x - from.left) * convergence, x2 = from.right + (x - from.right) * convergence
          paths[i].setAttribute('d', `M${x1.toFixed(2)},${(originY + (endY - originY) * convergence).toFixed(2)} H${x2.toFixed(2)}`)
        }
        const history = histories[i]
        history.push({ x, y, z, time: now })
        while (history.length > 2 && (now - history[0].time > tune.trailMs || history.length > 72)) history.shift()
        sampler.resample(history, 2)
        for (let j = 1; j < sampler.count; j++) {
          const a = sampler.points[j - 1], b = sampler.points[j], context = contexts[b.z >= 0 ? 1 : 0]
          if (!context) continue
          const age = clamp(1 - (now - (a.time + b.time) / 2) / tune.trailMs)
          context.globalAlpha = age * age * alpha * (.3 + orbit * .22)
          context.lineWidth = Math.max(.15, tune.trailWidth * age * (.8 + b.z * .2)); context.lineCap = 'round'; context.strokeStyle = tune.colors[i]
          context.beginPath(); context.moveTo(a.x, a.y); context.lineTo(b.x, b.y); context.stroke()
        }
        const context = contexts[z >= 0 ? 1 : 0]
        if (context) { context.globalAlpha = alpha * (.6 + orbit * .25); context.fillStyle = tune.colors[i]; context.beginPath(); context.arc(x, y, 3.2 + z * .6, 0, Math.PI * 2); context.fill() }
      }
      sound?.style.setProperty('--home-line-handoff', String(clamp(handoff / .12)))
      request()
    }
    function scroll() {
      const box = root.getBoundingClientRect()
      if (box.top >= innerHeight) { sound?.style.setProperty('--home-line-handoff', '0'); owner.dataset.lineHandoff = '0.000'; axis.style.opacity = '0' }
      if (box.bottom <= 0) { sound?.style.setProperty('--home-line-handoff', '1'); owner.dataset.lineHandoff = '1.000'; axis.style.opacity = '0' }
      request()
    }
    seek.current = index => {
      if (mobile.matches || reduced.matches) cards[index].scrollIntoView({ behavior: 'instant', block: 'center' })
      else { const box = root.getBoundingClientRect(); scrollTo({ top: scrollY + box.top + (box.height - innerHeight) * index / (cards.length - 1), behavior: 'instant' }) }
      request()
    }
    function move(event: PointerEvent) { if (fine.matches) pointer = { x: event.clientX, y: event.clientY }; request() }
    function leave() { pointer = null; request() }
    function focused(event: FocusEvent) { focus = Number((event.target as HTMLElement).closest<HTMLElement>('[data-work-index]')?.dataset.workIndex ?? -1); request() }
    function blurred() { focus = -1; request() }
    function change() { layoutDirty = true; histories.forEach(history => { history.length = 0 }); request() }
    const observer = new ResizeObserver(resize); observer.observe(sticky)
    const modal = new MutationObserver(() => { last = 0; request() }); const dialog = document.querySelector('dialog'); if (dialog) modal.observe(dialog, { attributes: true, attributeFilter: ['open'] })
    root.addEventListener('pointermove', move); root.addEventListener('pointerleave', leave); board.addEventListener('focusin', focused); board.addEventListener('focusout', blurred)
    window.addEventListener('scroll', scroll, { passive: true }); reduced.addEventListener('change', change); mobile.addEventListener('change', change); document.addEventListener('visibilitychange', change)
    resize()
    return () => { disposed = true; if (frame) cancelAnimationFrame(frame); observer.disconnect(); modal.disconnect(); seek.current = () => {}; root.removeEventListener('pointermove', move); root.removeEventListener('pointerleave', leave); board.removeEventListener('focusin', focused); board.removeEventListener('focusout', blurred); window.removeEventListener('scroll', scroll); reduced.removeEventListener('change', change); mobile.removeEventListener('change', change); document.removeEventListener('visibilitychange', change); sound?.style.removeProperty('--home-line-handoff') }
  }, [ref, onActive])
  return seek
}
