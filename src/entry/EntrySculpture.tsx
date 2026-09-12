import { useEffect, useImperativeHandle, useRef, type Ref } from 'react'
import { Group, PerspectiveCamera, Scene } from 'three'
import { CSS3DObject, CSS3DRenderer } from 'three/addons/renderers/CSS3DRenderer.js'
import { portraits } from '../about/about-data.ts'
import { portraitHelix } from '../about/portrait-flow-model.ts'

export type SculptureHandle = { enter: () => Promise<void> }

/** Cylindrical targets + camera travel (CSS3D periodic-table mechanics).
 * Real photographs remain DOM images: no WebGL context or texture atlas is needed. */
export default function EntrySculpture({ active, ref }: { active: boolean; ref: Ref<SculptureHandle> }) {
  const host = useRef<HTMLDivElement>(null)
  const controller = useRef<{ active: (value: boolean) => void; enter: () => Promise<void> } | null>(null)
  useImperativeHandle(ref, () => ({ enter: () => controller.current?.enter() ?? Promise.resolve() }), [])
  useEffect(() => {
    const node = host.current!, renderer = new CSS3DRenderer(), camera = new PerspectiveCamera(42, 1, 1, 3000)
    const scene = new Scene(), group = new Group(), reduced = matchMedia('(prefers-reduced-motion: reduce)')
    scene.add(group); group.rotation.set(-.1, 0, -.14)
    node.append(renderer.domElement)
    const cards = portraits.map((portrait, index) => {
      const element = document.createElement('div'), image = document.createElement('img')
      element.className = 'entry-sculpture-card'; element.style.width = `${150 * Math.sqrt(portrait.aspect)}px`
      element.style.height = `${150 / Math.sqrt(portrait.aspect)}px`
      image.src = portrait.src; image.alt = ''; image.draggable = false; image.decoding = 'async'
      element.append(image)
      const object = new CSS3DObject(element); group.add(object)
      return { object, index, amount: 0 }
    })
    let frame = 0, previous = 0, elapsed = 0, turn = -.7, presence = 0, wanted = false
    let flight: { time: number; resolve: () => void } | null = null, width = 1, height = 1
    const pointer = { x: 0, y: 0, active: false }
    const draw = (now: number) => {
      frame = 0
      const dt = previous ? Math.min(.04, (now - previous) / 1000) : .016; previous = now
      if (wanted) elapsed += dt
      presence += ((wanted ? 1 : 0) - presence) * (1 - Math.exp(-dt * 4))
      if (!reduced.matches) turn += dt * .12 * presence
      const fit = Math.min(width / 590, height / 590, 1.5)
      group.scale.setScalar(fit)
      cards.forEach(({ object, index }, i) => {
        // The two signature points lead; photographs follow with a short ordered ripple.
        const target = wanted && (reduced.matches || elapsed > .32 + i * .055) ? 1 : 0
        cards[i].amount += (target - cards[i].amount) * (1 - Math.exp(-dt * 3.6))
        const p = reduced.matches ? target : cards[i].amount
        const destination = portraitHelix(index, cards.length, 940, 1000, turn)
        const dx = destination.x - pointer.x, dy = destination.y - pointer.y
        const localDepth = pointer.active && !reduced.matches ? Math.exp(-(dx * dx + dy * dy) / 22000) * 45 : 0
        object.position.set(destination.x * p, destination.y * p, -500 * (1 - p) + (destination.z + localDepth) * p)
        object.rotation.set(.04 * (1 - p), Math.sin(index / (cards.length - 1) * Math.PI * 3 + turn) * 1.05 * p, 0)
        object.scale.setScalar(.05 + .95 * p)
        object.element.style.opacity = String(Math.min(1, p * 1.5))
      })
      let travel = 0
      if (flight) { flight.time += dt; const p = Math.min(1, flight.time / 1.05); travel = p * p * (3 - 2 * p) }
      camera.position.set(0, 0, 1100 - travel * 1140)
      camera.rotation.set(0, 0, travel * -.025)
      renderer.render(scene, camera)
      if (flight && travel === 1) { const complete = flight.resolve; flight = null; complete(); return }
      if ((wanted || presence > .002 || flight) && !document.hidden && (!reduced.matches || flight)) frame = requestAnimationFrame(draw)
    }
    const wake = () => { if (!frame && !document.hidden) { previous = 0; frame = requestAnimationFrame(draw) } }
    const resize = () => {
      width = node.clientWidth; height = node.clientHeight
      renderer.setSize(width, height); camera.aspect = width / Math.max(1, height); camera.updateProjectionMatrix(); wake()
    }
    const move = (event: PointerEvent) => {
      const bounds = node.getBoundingClientRect(), fit = Math.min(width / 590, height / 590, 1.5)
      pointer.x = (event.clientX - bounds.x - width / 2) / fit
      pointer.y = -(event.clientY - bounds.y - height / 2) / fit; pointer.active = true
    }
    const leave = () => { pointer.active = false }
    const visibility = () => { if (document.hidden) { cancelAnimationFrame(frame); frame = 0 } else wake() }
    const observer = new ResizeObserver(resize); observer.observe(node)
    // Listen on the side: the accessible choice button is in front of the artwork.
    const side = node.closest('.entry-side')!
    side.addEventListener('pointermove', move as EventListener); side.addEventListener('pointerleave', leave)
    document.addEventListener('visibilitychange', visibility); reduced.addEventListener('change', wake)
    controller.current = {
      active(value) { wanted = value; if (!value) elapsed = 0; wake() },
      enter() { wanted = true; return new Promise<void>(resolve => { flight = { time: 0, resolve }; wake() }) },
    }
    node.dataset.portraits = String(cards.length)
    resize()
    return () => {
      cancelAnimationFrame(frame); observer.disconnect(); flight?.resolve(); controller.current = null
      side.removeEventListener('pointermove', move as EventListener); side.removeEventListener('pointerleave', leave)
      document.removeEventListener('visibilitychange', visibility); reduced.removeEventListener('change', wake)
      scene.clear(); renderer.domElement.remove()
    }
  }, [])
  useEffect(() => { controller.current?.active(active) }, [active])
  return <div ref={host} className="entry-sculpture"/>
}
