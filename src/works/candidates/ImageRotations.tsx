import { useEffect, useRef, useState } from 'react'
import { workImages } from '../assets.ts'
import { workDate, worksCatalog } from '../catalog.ts'
import { dampRotationValue, sampleRotations } from './rotations-motion.ts'
import './rotations.css'

export function ImageRotations() {
  const stage = useRef<HTMLElement>(null)
  const field = useRef<HTMLDivElement>(null)
  const [state, setState] = useState<'loading' | 'ready' | 'fallback'>('loading')
  const [staticView, setStaticView] = useState(false)
  const [focus, setFocus] = useState(0)
  const [resolution, setResolution] = useState(false)
  const active = worksCatalog[focus]

  useEffect(() => {
    const element = stage.current
    const gallery = field.current
    const host = element?.closest<HTMLElement>('.works-prototype-host')
    if (!element || !gallery || !host) return
    const links = [...gallery.querySelectorAll<HTMLAnchorElement>('.rotations-artwork')]
    const reduced = matchMedia('(prefers-reduced-motion: reduce)')
    let disposed = false
    let isStatic = reduced.matches
    let ready = false
    let failed = false
    let visible = true
    let frame = 0
    let lastTime = 0
    let progress = 0
    let target = 0
    let velocity = 0
    let focusIndex = -1
    let resolving = false
    let width = 1
    let height = 1
    let start = 0
    let range = 1
    let mobile = false
    let frames = 0
    let alignOnMeasure = true

    function wake() {
      if (!disposed && !isStatic && element!.dataset.static !== 'true' && ready && visible && !document.hidden && !frame) frame = requestAnimationFrame(render)
    }
    function render(time: number) {
      frame = 0
      if (disposed || isStatic || !visible || document.hidden) return
      const elapsed = lastTime ? Math.min(.05, (time - lastTime) / 1000) : 1 / 60
      lastTime = time
      const previous = progress
      progress = dampRotationValue(progress, target, elapsed, 13)
      if (Math.abs(progress - target) < .00001) progress = target
      velocity = dampRotationValue(velocity, (progress - previous) / elapsed, elapsed, 15)
      if (Math.abs(velocity) < .0001) velocity = 0
      const state = sampleRotations(progress, mobile, velocity)
      if (focusIndex !== state.focus) { focusIndex = state.focus; setFocus(focusIndex) }
      if (resolving !== (state.resolution > .28)) { resolving = state.resolution > .28; setResolution(resolving) }
      const moving = progress !== target || Math.abs(velocity) > .0001
      state.poses.forEach((pose, index) => {
        const link = links[index]
        link.style.transform = `translate(-50%, -50%) translate3d(${pose.x * width}px, ${pose.y * height}px, ${pose.z * width}px) rotateX(${pose.rx}deg) rotateY(${pose.ry}deg) rotateZ(${pose.rz}deg) scale(${pose.scale})`
        link.style.opacity = String(pose.opacity)
        link.style.visibility = pose.opacity < .005 ? 'hidden' : 'visible'
        link.style.filter = `blur(${pose.blur.toFixed(2)}px) brightness(${pose.brightness.toFixed(3)})`
        link.style.zIndex = String(20 - Math.round(Math.abs(pose.distance) * 3))
        link.style.willChange = moving && pose.opacity > .01 ? 'transform, filter' : 'auto'
        link.tabIndex = index === state.focus && !resolving ? 0 : -1
      })
      frames += 1
      element!.dataset.progress = progress.toFixed(5)
      element!.dataset.focus = worksCatalog[state.focus].id
      element!.dataset.renderState = moving ? 'running' : 'settled'
      element!.dataset.frames = String(frames)
      if (moving) frame = requestAnimationFrame(render)
    }
    function scroll() {
      if (isStatic) return
      target = Math.max(0, Math.min(1, (scrollY - start) / range))
      wake()
    }
    function measure() {
      if (disposed || isStatic || element!.dataset.static === 'true') return
      const rect = gallery!.getBoundingClientRect()
      width = rect.width
      height = rect.height
      mobile = matchMedia('(max-width: 700px)').matches
      start = host!.getBoundingClientRect().top + scrollY
      range = Math.max(1, host!.offsetHeight - element!.offsetHeight)
      element!.dataset.scrollStart = String(start)
      element!.dataset.scrollRange = String(range)
      element!.dataset.mobile = String(mobile)
      links.forEach((link, index) => {
        const record = worksCatalog[index]
        const image = workImages[record.image]
        const naturalRatio = image.height / image.width
        const wanted = width * (mobile ? .69 : record.type === 'album' ? .30 : .25)
        const size = Math.min(wanted, height * (mobile ? .87 : .84) / naturalRatio)
        link.style.width = `${size}px`
      })
      scroll()
      if (alignOnMeasure) {
        progress = target
        velocity = 0
        lastTime = 0
        alignOnMeasure = false
      }
    }
    function applyMode() {
      const wasStatic = isStatic
      isStatic = reduced.matches || failed
      setStaticView(isStatic)
      setState(isStatic ? 'fallback' : ready ? 'ready' : 'loading')
      if (isStatic) {
        cancelAnimationFrame(frame); frame = 0; lastTime = 0
        links.forEach(link => { link.removeAttribute('style'); link.tabIndex = 0 })
        element!.dataset.renderState = 'static'
      } else {
        if (wasStatic) alignOnMeasure = true
        measure()
        wake()
      }
    }
    function visibility() {
      if (document.hidden) { cancelAnimationFrame(frame); frame = 0; lastTime = 0; element!.dataset.renderState = 'hidden' }
      else wake()
    }
    const intersection = new IntersectionObserver(entries => {
      visible = entries.some(entry => entry.isIntersecting)
      if (!visible) { cancelAnimationFrame(frame); frame = 0; lastTime = 0; element.dataset.renderState = 'offscreen' }
      else { measure(); wake() }
    })
    const resize = new ResizeObserver(measure)
    intersection.observe(element)
    resize.observe(gallery)
    resize.observe(host)
    window.addEventListener('scroll', scroll, { passive: true })
    window.addEventListener('resize', measure)
    document.addEventListener('visibilitychange', visibility)
    reduced.addEventListener('change', applyMode)
    Object.defineProperty(element, '__worksSnapshot', { configurable: true, value: () => ({
      engine: 'dom-css3d', progress, target, velocity, frames, mobile, static: isStatic, state: sampleRotations(progress, mobile, velocity),
      artwork: links.map(link => ({ id: link.dataset.workId, transform: link.style.transform, filter: link.style.filter, visible: link.style.visibility })),
    }) })
    applyMode()
    Promise.all(links.map(link => link.querySelector('img')!.decode())).then(() => {
      if (disposed) return
      ready = true
      alignOnMeasure = true
      applyMode()
    }, () => {
      if (disposed) return
      failed = true
      applyMode()
    })
    return () => {
      disposed = true
      cancelAnimationFrame(frame)
      intersection.disconnect(); resize.disconnect()
      window.removeEventListener('scroll', scroll)
      window.removeEventListener('resize', measure)
      document.removeEventListener('visibilitychange', visibility)
      reduced.removeEventListener('change', applyMode)
      Reflect.deleteProperty(element, '__worksSnapshot')
      links.forEach(link => link.removeAttribute('style'))
    }
  }, [])

  return <section ref={stage} className="image-rotations" data-works-engine="image-rotations" data-state={state} data-static={staticView} data-render-state="loading" lang="ko" aria-labelledby="rotations-title">
    <header className="rotations-heading"><p lang="en">CHO YOUN KYOUNG / WORKS</p><h1 id="rotations-title" lang="en">Works<span aria-hidden="true">.</span></h1></header>
    <div ref={field} className="rotations-field">
      {worksCatalog.map(record => {
        const image = workImages[record.image]
        return <a key={record.id} href={record.referenceUrl} className="rotations-artwork" data-work-id={record.id} data-kind={record.type}
          aria-label={`${record.title} — 기존 사이트에서 기록 보기`} tabIndex={staticView ? 0 : -1}>
          <img src={image.src} width={image.width} height={image.height} alt={record.title} decoding="async" />
          <span className="rotations-static-caption">{record.title}<small>{workDate(record)}</small></span>
        </a>
      })}
    </div>
    <div className="rotations-copy" aria-live="off"><p className="rotations-category" lang="en">{resolution ? 'ARCHIVE' : active.type === 'album' ? 'RECORDING' : 'PERFORMANCE'}</p>
      <h2 key={resolution ? 'archive' : active.id}>{resolution ? '음반과 무대의 기록' : active.title}</h2>
      <p className="rotations-date">{resolution ? '2020 — 2026' : workDate(active)}</p>
      {!resolution && <a className="rotations-record-link" href={active.referenceUrl}>기록 보기 <span aria-hidden="true">↗</span></a>}
    </div>
    <a className="rotations-index" href="#works-compact-archive">INDEX <span aria-hidden="true">06 ↘</span></a>
    <span className="rotations-counter" aria-hidden="true">{String(focus + 1).padStart(2, '0')} / 06</span>
  </section>
}
