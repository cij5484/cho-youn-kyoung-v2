import { useCallback, useLayoutEffect, useRef, useState, type CSSProperties } from 'react'
import { gsap } from 'gsap'
import { portraits } from './about-data'
import { portraitFrontTurn, portraitHelix, portraitSignature } from './portrait-flow-model'
import { twoPointContract } from '../signature/two-point-contract'

function PortraitFocus({ index, origin, onClose }: { index: number; origin: HTMLButtonElement; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null), frame = useRef<HTMLDivElement>(null), original = useRef<HTMLImageElement>(null)
  const animation = useRef<gsap.core.Timeline | null>(null), closing = useRef(false)
  const [decoded, setDecoded] = useState(false)
  const portrait = portraits[index]
  useLayoutEffect(() => {
    const element = dialog.current!, image = frame.current!
    element.showModal()
    let alive = true
    // The already-visible thumbnail carries the motion even on a cold original-image request.
    original.current!.decode().then(() => { if (alive) setDecoded(true) }).catch(() => {})
    const visibility = origin.style.visibility
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const from = origin.getBoundingClientRect(), to = image.getBoundingClientRect()
      animation.current = gsap.timeline({ defaults: { duration: .65, ease: 'power3.inOut' } })
        .fromTo(image, { x: from.x - to.x, y: from.y - to.y, scaleX: from.width / to.width, scaleY: from.height / to.height },
          { x: 0, y: 0, scaleX: 1, scaleY: 1 }, 0)
        .to(element, { '--focus-shade': .9 }, 0)
    } else element.style.setProperty('--focus-shade', '.9')
    origin.style.setProperty('visibility', 'hidden')
    return () => {
      alive = false; animation.current?.kill(); element.close(); origin.style.setProperty('visibility', visibility)
      if (origin.isConnected) origin.focus({ preventScroll: true })
    }
  }, [origin])
  const close = () => {
    if (closing.current) return
    closing.current = true; animation.current?.kill()
    if (matchMedia('(prefers-reduced-motion: reduce)').matches || !origin.isConnected) { onClose(); return }
    const image = frame.current!, from = image.getBoundingClientRect(), to = origin.getBoundingClientRect()
    animation.current = gsap.timeline({ defaults: { duration: .5, ease: 'power3.inOut' }, onComplete: onClose })
      .to(image, { x: `+=${to.x - from.x}`, y: `+=${to.y - from.y}`,
        scaleX: to.width / image.offsetWidth, scaleY: to.height / image.offsetHeight }, 0)
      .to(dialog.current, { '--focus-shade': 0 }, 0)
  }
  return <dialog className="about-photo-focus" ref={dialog} aria-label={`사진 ${index + 1} 크게 보기`} onCancel={event => { event.preventDefault(); event.stopPropagation(); close() }}>
    <button type="button" className="about-photo-close" onClick={close} aria-label="사진 닫기">사진 닫기 <span aria-hidden="true">×</span></button>
    <div ref={frame} className="about-photo-frame" style={{ '--portrait-aspect': portrait.aspect } as CSSProperties}>
      <img src={portrait.thumbnail} alt={portrait.alt}/>
      <img ref={original} className="about-photo-original" src={portrait.src} alt="" aria-hidden="true" style={{ opacity: decoded ? 1 : 0 }}/>
    </div>
  </dialog>
}

export function PortraitGallery({ selection, onClose }: {
  selection: { index: number; origin: HTMLButtonElement }; onClose: () => void
}) {
  const dialog = useRef<HTMLDialogElement>(null), scene = useRef<HTMLDivElement>(null)
  const closeAction = useRef<() => void>(() => {})
  const focusAction = useRef<(index: number) => void>(() => {})
  const [selected, select] = useState<{ index: number; origin: HTMLButtonElement } | null>(null)
  const closePhoto = useCallback(() => select(null), [])

  useLayoutEffect(() => {
    const element = dialog.current!, stage = scene.current!
    const cards = [...stage.querySelectorAll<HTMLButtonElement>('.about-gallery-card')]
    const setPoses = cards.map(card => gsap.quickSetter(card, 'css'))
    const owner = selection.origin.closest<HTMLElement>('.about-scroll')!
    const originals = [...owner.querySelectorAll<HTMLElement>('.about-portrait')]
    const reduced = matchMedia('(prefers-reduced-motion: reduce)')
    const overflow = document.body.style.overflow, gutter = document.documentElement.style.scrollbarGutter
    document.documentElement.style.scrollbarGutter = 'stable'
    document.body.style.overflow = 'hidden'
    element.showModal()
    let width = stage.clientWidth, height = stage.clientHeight
    let phase: 'opening' | 'helix' | 'closing' = 'opening'
    let motion: gsap.core.Timeline | undefined
    const rotation = { turn: .4 }
    let coast: gsap.core.Tween | undefined
    let aligning: number | null = null, idleSpeed = 0, photoOpen = false
    let pointer: { id: number; startX: number; x: number; time: number; velocity: number; dragged: boolean } | null = null
    const ribbons = [...stage.querySelectorAll<HTMLElement>('.about-gallery-signature')]
    let signatureTime = 0
    const renderSignature = (_time: number, delta: number) => {
      if (document.hidden || element.querySelector('.about-photo-focus[open]')) return
      if (!reduced.matches) {
        const dt = Math.min(delta, 50) / 1000
        signatureTime += dt
        if (phase === 'helix' && !pointer && aligning === null && !coast?.isActive()) {
          idleSpeed += (.12 - idleSpeed) * (1 - Math.exp(-dt * 3))
          rotation.turn += idleSpeed * dt
          renderRotation()
        }
      }
      ribbons.forEach((ribbon, index) => {
        const instrument = Math.floor(index / 48), segment = index % 48
        const fresh = (segment + 1) / 48
        const age = (1 - fresh) * twoPointContract.moving.trailMs / 1000
        const from = portraitSignature(signatureTime - age, instrument, width, height, rotation.turn)
        const to = portraitSignature(signatureTime - age + 2 / 48, instrument, width, height, rotation.turn)
        const dx = to.x - from.x, dy = to.y - from.y, dz = to.z - from.z
        ribbon.style.transform = `translate3d(${from.x}px,${from.y}px,${from.z}px) rotateZ(${Math.atan2(dy, dx)}rad) rotateY(${-Math.atan2(dz, Math.hypot(dx, dy))}rad)`
        ribbon.style.width = `${reduced.matches ? 8 : Math.hypot(dx, dy, dz) + .5}px`
      })
    }
    const signatureVisibility = () => {
      gsap.ticker.remove(renderSignature)
      const focused = Boolean(element.querySelector('.about-photo-focus[open]'))
      if (photoOpen && !focused) aligning = null
      photoOpen = focused
      const paused = document.hidden || focused
      idleSpeed = 0
      if (coast && coast.progress() < 1) coast.paused(paused)
      if (motion && motion.progress() < 1) motion.paused(document.hidden)
      if (paused) return
      renderSignature(0, 0)
      if (!reduced.matches) gsap.ticker.add(renderSignature)
    }
    const focusObserver = new MutationObserver(signatureVisibility)
    focusObserver.observe(element, { childList: true, subtree: true, attributes: true, attributeFilter: ['open'] })
    document.addEventListener('visibilitychange', signatureVisibility)
    const signatureMotion = () => {
      ribbons.forEach((ribbon, index) => {
        const segment = index % 48, fresh = (segment + 1) / 48
        ribbon.style.height = `${reduced.matches ? 3.6 : Math.max(.15, twoPointContract.moving.trailWidth * fresh)}px`
        ribbon.style.opacity = String(reduced.matches ? Number(segment === 47) * .7 : fresh ** twoPointContract.moving.fadeExponent * .68)
      })
      signatureVisibility()
    }
    reduced.addEventListener('change', signatureMotion)
    signatureMotion()
    let suppressClick = false
    function pose(index: number) {
      const target = portraitHelix(index, cards.length, width, height, rotation.turn)
      // Keep every photo face readable/selectable while preserving the helix's XYZ depth.
      return { ...target, rotationY: 60 * Math.sin(target.rotationY * Math.PI / 180), rotationX: -5,
        scale: Math.min(width * (width < 700 ? .24 : .15) / 200, height * .19 * portraits[index].aspect / 200) }
    }
    function renderRotation() { setPoses.forEach((set, index) => set(pose(index))); if (reduced.matches) renderSignature(0, 0) }
    const stopRotation = () => {
      coast?.kill(); coast = undefined; aligning = null; idleSpeed = 0
      if (pointer && stage.hasPointerCapture(pointer.id)) stage.releasePointerCapture(pointer.id)
      pointer = null; delete stage.dataset.dragging
    }
    const focusPortrait = (index: number) => {
      if (phase !== 'helix') return
      stopRotation(); aligning = index
      const turn = portraitFrontTurn(index, cards.length, rotation.turn)
      const expand = () => { renderRotation(); select({ index, origin: cards[index] }) }
      if (reduced.matches) { rotation.turn = turn; expand(); return }
      coast = gsap.to(rotation, { turn, duration: .65, ease: 'power3.inOut', paused: document.hidden, onUpdate: renderRotation, onComplete: expand })
    }
    focusAction.current = focusPortrait
    const down = (event: PointerEvent) => {
      if (phase !== 'helix' || !event.isPrimary || event.button !== 0 || pointer) return
      stopRotation(); suppressClick = false
      pointer = { id: event.pointerId, startX: event.clientX, x: event.clientX, time: event.timeStamp, velocity: 0, dragged: false }
    }
    const move = (event: PointerEvent) => {
      if (!pointer || pointer.id !== event.pointerId) return
      if (!pointer.dragged && Math.abs(event.clientX - pointer.startX) < 6) return
      pointer.dragged = true; suppressClick = true; stage.dataset.dragging = 'true'
      stage.setPointerCapture(event.pointerId)
      const delta = (event.clientX - pointer.x) / width * Math.PI * 2
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
    motion = gsap.timeline({ onComplete: () => { phase = 'helix'; element.dataset.phase = phase } })
    cards.forEach((card, index) => motion!.to(card, { ...pose(index), duration: reduced.matches ? 0 : .9, ease: 'power3.inOut' }, reduced.matches ? 0 : index * .014))

    closeAction.current = () => {
      if (phase === 'closing') return
      stopRotation()
      phase = 'closing'; element.dataset.phase = phase; motion?.kill()
      motion = gsap.timeline({ onComplete: onClose })
      cards.forEach((card, index) => motion!.to(card, { ...source(index), duration: reduced.matches ? 0 : .65, ease: 'power3.inOut' }, 0))
    }
    const resize = new ResizeObserver(() => {
      const nextWidth = stage.clientWidth, nextHeight = stage.clientHeight
      if (nextWidth === width && nextHeight === height) return
      width = nextWidth; height = nextHeight
      const pendingFocus = aligning
      stopRotation()
      if (phase === 'closing') { onClose(); return }
      motion?.kill(); motion = undefined; cards.forEach((card, index) => gsap.set(card, pose(index)))
      phase = 'helix'; element.dataset.phase = phase
      if (pendingFocus !== null && !element.querySelector('.about-photo-focus[open]')) focusPortrait(pendingFocus)
      else if (reduced.matches) renderSignature(0, 0)
    })
    resize.observe(stage)
    const reduce = () => {
      if (!reduced.matches) return
      const pendingFocus = aligning
      stopRotation()
      if (phase === 'closing') { motion?.kill(); motion = undefined; onClose(); return }
      if (phase === 'opening') { motion?.kill(); motion = undefined; cards.forEach((card, index) => gsap.set(card, pose(index))); phase = 'helix'; element.dataset.phase = phase }
      if (pendingFocus !== null && !element.querySelector('.about-photo-focus[open]')) focusPortrait(pendingFocus)
    }
    reduced.addEventListener('change', reduce)
    return () => {
      gsap.ticker.remove(renderSignature); focusObserver.disconnect()
      document.removeEventListener('visibilitychange', signatureVisibility); reduced.removeEventListener('change', signatureMotion)
      stopRotation()
      stage.removeEventListener('pointerdown', down)
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
      window.removeEventListener('pointercancel', up)
      window.removeEventListener('blur', stopRotation)
      stage.removeEventListener('click', click, true)
      stage.removeEventListener('keydown', key)
      resize.disconnect(); reduced.removeEventListener('change', reduce); motion?.kill(); motion = undefined; element.close()
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
      {twoPointContract.order.flatMap(id => Array.from({ length: 48 }, (_, index) => <i key={`${id}-${index}`} aria-hidden="true" className="about-gallery-signature" style={{ background: twoPointContract.points[id].color }}/>))}
      {portraits.map((portrait, index) => <button type="button" className="about-gallery-card" key={portrait.src} style={{ '--portrait-aspect': portrait.aspect } as CSSProperties}
        aria-label={`사진 ${index + 1} 크게 보기`} onClick={() => focusAction.current(index)}>
        <img src={portrait.thumbnail} alt={portrait.alt} draggable={false} decoding="async"/>
      </button>)}
    </div>
    <p className="about-gallery-hint">드래그해 회전 · 사진을 눌러 확대</p>
    {selected !== null && <PortraitFocus index={selected.index} origin={selected.origin} onClose={closePhoto}/>}
  </dialog>
}
