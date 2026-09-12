import { useCallback, useLayoutEffect, useRef, useState, type CSSProperties } from 'react'
import { gsap } from 'gsap'
import { portraits } from './about-data'
import { portraitHelix } from './portrait-flow-model'

function PortraitFocus({ index, origin, onClose }: { index: number; origin: HTMLButtonElement; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null), frame = useRef<HTMLImageElement>(null)
  const animation = useRef<gsap.core.Tween | null>(null), closing = useRef(false)
  const portrait = portraits[index]
  useLayoutEffect(() => {
    const element = dialog.current!, image = frame.current!
    element.showModal()
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const from = origin.getBoundingClientRect(), to = image.getBoundingClientRect()
      animation.current = gsap.fromTo(image, { x: from.x - to.x, y: from.y - to.y, scaleX: from.width / to.width, scaleY: from.height / to.height },
        { x: 0, y: 0, scaleX: 1, scaleY: 1, duration: .5, ease: 'power3.inOut' })
    }
    return () => {
      animation.current?.kill(); element.close()
      if (origin.isConnected) origin.focus({ preventScroll: true })
    }
  }, [origin])
  const close = () => {
    if (closing.current) return
    closing.current = true; animation.current?.kill()
    if (matchMedia('(prefers-reduced-motion: reduce)').matches || !origin.isConnected) { onClose(); return }
    const image = frame.current!, from = image.getBoundingClientRect(), to = origin.getBoundingClientRect()
    animation.current = gsap.to(image, { x: `+=${to.x - from.x}`, y: `+=${to.y - from.y}`,
      scaleX: to.width / image.offsetWidth, scaleY: to.height / image.offsetHeight, duration: .35, ease: 'power3.inOut', onComplete: onClose })
  }
  return <dialog className="about-photo-focus" ref={dialog} aria-label={`사진 ${index + 1} 크게 보기`} onCancel={event => { event.preventDefault(); event.stopPropagation(); close() }}>
    <button type="button" className="about-photo-close" onClick={close} aria-label="사진 닫기">사진 닫기 <span aria-hidden="true">×</span></button>
    <img ref={frame} src={portrait.src} alt={portrait.alt} style={{ '--portrait-aspect': portrait.aspect } as CSSProperties}/>
  </dialog>
}

export function PortraitGallery({ selection, onClose }: {
  selection: { index: number; origin: HTMLButtonElement }; onClose: () => void
}) {
  const dialog = useRef<HTMLDialogElement>(null), scene = useRef<HTMLDivElement>(null)
  const closeAction = useRef<() => void>(() => {})
  const [selected, select] = useState<{ index: number; origin: HTMLButtonElement } | null>(null)
  const closePhoto = useCallback(() => select(null), [])

  useLayoutEffect(() => {
    const element = dialog.current!, stage = scene.current!
    const cards = [...stage.querySelectorAll<HTMLButtonElement>('.about-gallery-card')]
    const owner = selection.origin.closest<HTMLElement>('.about-scroll')!
    const originals = [...owner.querySelectorAll<HTMLElement>('.about-portrait')]
    const reduced = matchMedia('(prefers-reduced-motion: reduce)')
    const overflow = document.body.style.overflow, gutter = document.documentElement.style.scrollbarGutter
    document.documentElement.style.scrollbarGutter = 'stable'
    document.body.style.overflow = 'hidden'
    element.showModal()
    let phase: 'opening' | 'helix' | 'closing' = 'opening'
    let motion: gsap.core.Timeline
    const rotation = { turn: .4 }
    let coast: gsap.core.Tween | undefined
    let pointer: { id: number; startX: number; x: number; time: number; velocity: number; dragged: boolean } | null = null
    let suppressClick = false
    function pose(index: number) {
      const width = stage.clientWidth, height = stage.clientHeight
      const target = portraitHelix(index, cards.length, width, height, rotation.turn)
      // Keep every photo face readable/selectable while preserving the helix's XYZ depth.
      return { ...target, rotationY: 60 * Math.sin(target.rotationY * Math.PI / 180), rotationX: -5,
        scale: Math.min(width * (width < 700 ? .24 : .15) / 200, height * .19 * portraits[index].aspect / 200) }
    }
    const renderRotation = () => cards.forEach((card, index) => gsap.set(card, pose(index)))
    const stopRotation = () => {
      coast?.kill()
      if (pointer && stage.hasPointerCapture(pointer.id)) stage.releasePointerCapture(pointer.id)
      pointer = null; delete stage.dataset.dragging
    }
    const down = (event: PointerEvent) => {
      if (phase !== 'helix' || !event.isPrimary || event.button !== 0 || pointer) return
      coast?.kill(); suppressClick = false
      pointer = { id: event.pointerId, startX: event.clientX, x: event.clientX, time: event.timeStamp, velocity: 0, dragged: false }
    }
    const move = (event: PointerEvent) => {
      if (!pointer || pointer.id !== event.pointerId) return
      if (!pointer.dragged && Math.abs(event.clientX - pointer.startX) < 6) return
      pointer.dragged = true; suppressClick = true; stage.dataset.dragging = 'true'
      stage.setPointerCapture(event.pointerId)
      const delta = (event.clientX - pointer.x) / stage.clientWidth * Math.PI * 2
      pointer.velocity = Math.max(-.012, Math.min(.012, delta / Math.max(8, event.timeStamp - pointer.time)))
      pointer.x = event.clientX; pointer.time = event.timeStamp
      rotation.turn += delta; renderRotation()
    }
    const up = (event: PointerEvent) => {
      if (!pointer || pointer.id !== event.pointerId) return
      const velocity = pointer.dragged && event.timeStamp - pointer.time < 100 ? pointer.velocity : 0
      stopRotation()
      if (event.type === 'pointerup' && !reduced.matches && velocity) {
        coast = gsap.to(rotation, { turn: rotation.turn + velocity * 180, duration: .65, ease: 'power3.out', onUpdate: renderRotation })
      }
    }
    const click = (event: MouseEvent) => {
      coast?.kill()
      if (suppressClick && event.detail !== 0) { event.preventDefault(); event.stopPropagation() }
      suppressClick = false
    }
    const key = (event: KeyboardEvent) => {
      if (phase !== 'helix' || !['ArrowLeft', 'ArrowRight'].includes(event.key)) return
      event.preventDefault(); stopRotation()
      rotation.turn += event.key === 'ArrowRight' ? .25 : -.25; renderRotation()
    }
    stage.addEventListener('pointerdown', down)
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
    window.addEventListener('pointercancel', up)
    window.addEventListener('blur', stopRotation)
    stage.addEventListener('click', click, true)
    stage.addEventListener('keydown', key)
    function source(index: number) {
      const from = originals[index].getBoundingClientRect(), bounds = stage.getBoundingClientRect()
      return { x: from.x + from.width / 2 - bounds.x - bounds.width / 2,
        y: from.y + from.height / 2 - bounds.y - bounds.height / 2,
        z: 0, rotationX: 0, rotationY: 0, scale: from.width / 200 }
    }
    cards.forEach((card, index) => gsap.set(card, { xPercent: -50, yPercent: -50, ...source(index) }))
    motion = gsap.timeline({ onComplete: () => { phase = 'helix'; element.dataset.phase = phase; select({ index: selection.index, origin: cards[selection.index] }) } })
    cards.forEach((card, index) => motion.to(card, { ...pose(index), duration: reduced.matches ? 0 : .9, ease: 'power3.inOut' }, reduced.matches ? 0 : index * .014))

    closeAction.current = () => {
      if (phase === 'closing') return
      stopRotation()
      phase = 'closing'; element.dataset.phase = phase; motion.kill()
      motion = gsap.timeline({ onComplete: onClose })
      cards.forEach((card, index) => motion.to(card, { ...source(index), duration: reduced.matches ? 0 : .65, ease: 'power3.inOut' }, 0))
    }
    let lastWidth = stage.clientWidth, lastHeight = stage.clientHeight
    const resize = new ResizeObserver(() => {
      if (stage.clientWidth === lastWidth && stage.clientHeight === lastHeight) return
      lastWidth = stage.clientWidth; lastHeight = stage.clientHeight
      stopRotation()
      if (phase === 'closing') { onClose(); return }
      motion.kill(); cards.forEach((card, index) => gsap.set(card, pose(index)))
      if (phase === 'opening') select({ index: selection.index, origin: cards[selection.index] })
      phase = 'helix'; element.dataset.phase = phase
    })
    resize.observe(stage)
    const reduce = () => {
      if (!reduced.matches) return
      stopRotation()
      if (phase === 'closing') { motion.kill(); onClose(); return }
      if (phase === 'opening') { motion.kill(); cards.forEach((card, index) => gsap.set(card, pose(index))); phase = 'helix'; element.dataset.phase = phase; select({ index: selection.index, origin: cards[selection.index] }) }
    }
    reduced.addEventListener('change', reduce)
    return () => {
      stopRotation()
      stage.removeEventListener('pointerdown', down)
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
      window.removeEventListener('pointercancel', up)
      window.removeEventListener('blur', stopRotation)
      stage.removeEventListener('click', click, true)
      stage.removeEventListener('keydown', key)
      resize.disconnect(); reduced.removeEventListener('change', reduce); motion.kill(); element.close()
      document.body.style.overflow = overflow; document.documentElement.style.scrollbarGutter = gutter
      // Wait for React to reveal the strip after removing the modal.
      requestAnimationFrame(() => {
        if (selection.origin.isConnected && !document.querySelector('.about-gallery[open]')) selection.origin.focus({ preventScroll: true })
      })
    }
  }, [selection, onClose])

  return <dialog className="about-gallery" ref={dialog} data-phase="opening" aria-label="초상 나선 갤러리" onCancel={event => { event.preventDefault(); event.stopPropagation(); closeAction.current() }}>
    <header><span>PORTRAITS / CHO YOUN KYOUNG</span><button type="button" onClick={() => closeAction.current()} aria-label="Close — 나선 닫기">Close</button></header>
    <div className="about-gallery-scene" ref={scene}>
      {portraits.map((portrait, index) => <button type="button" className="about-gallery-card" key={portrait.src} style={{ '--portrait-aspect': portrait.aspect } as CSSProperties}
        aria-label={`사진 ${index + 1} 크게 보기`} onClick={event => { if (dialog.current?.dataset.phase === 'helix') select({ index, origin: event.currentTarget }) }}>
        <img src={portrait.src} alt={portrait.alt} draggable={false}/>
      </button>)}
    </div>
    <p className="about-gallery-hint">드래그해 회전 · 사진을 눌러 확대</p>
    {selected !== null && <PortraitFocus index={selected.index} origin={selected.origin} onClose={closePhoto}/>}
  </dialog>
}
