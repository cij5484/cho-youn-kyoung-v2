import { Link } from 'react-router'
import { useEffect, useRef } from 'react'
import { localizedPath, type Language } from '../routing/locale-contract.ts'
import { arrowWaveFrames, editorialWavePlan, editorialWaveTuning, glyphSettleDestination, glyphWaveFrames } from './editorial-link-wave.ts'
import './editorial-link.css'

type EditorialLinkProps = { children: string; className?: string; locale?: Language } &
  ({ to: string; href?: never } | { href: string; to?: never })

export function EditorialLink({to,href,children,className='',locale='ko'}:EditorialLinkProps){
  const anchor = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const link = anchor.current!
    const letters = [...link.querySelectorAll<HTMLElement>('.link-letter')]
    const windows = [...link.querySelectorAll<HTMLElement>('.link-letter-window')]
    const arrow = link.querySelector<HTMLElement>('.editorial-link-arrow')!
    const targets = [...letters, arrow]
    const animations = new Map<HTMLElement, Animation>()
    const reduced = matchMedia('(prefers-reduced-motion: reduce)')
    const hover = matchMedia('(hover: hover) and (pointer: fine)')
    let disposed = false
    let focused = false
    let pointerInside = false

    const cancel = (target: HTMLElement) => {
      const animation = animations.get(target)
      if (!animation) return
      animation.onfinish = null
      animation.cancel()
      animations.delete(target)
    }
    const reset = () => {
      targets.forEach(target => { cancel(target); target.style.removeProperty('transform') })
      link.dataset.waveState = 'idle'
    }
    const supported = () => !reduced.matches && typeof arrow.animate === 'function'
    const animate = (target: HTMLElement, frames: Keyframe[], duration: number, delay = 0, finish?: () => void) => {
      cancel(target)
      const animation = target.animate(frames, { duration, delay, easing: 'cubic-bezier(.22,.65,.2,1)', fill: 'both' })
      animations.set(target, animation)
      animation.onfinish = () => {
        if (disposed || animations.get(target) !== animation) return
        finish?.()
        cancel(target)
        if (!animations.size) link.dataset.waveState = pointerInside || focused ? 'held' : 'idle'
      }
    }
    const settle = () => {
      if (focused || pointerInside) return
      if (!supported()) { reset(); return }
      link.dataset.waveState = 'settling'
      targets.forEach(target => {
        const current = getComputedStyle(target).transform
        if (current === 'none') { cancel(target); return }
        const destination = target === arrow ? 'none'
          : glyphSettleDestination(new DOMMatrixReadOnly(current).m42, target.offsetHeight)
        animate(target, [{ transform: current }, { transform: destination }], editorialWaveTuning.settleDuration, 0,
          () => target.style.removeProperty('transform'))
      })
      if (!animations.size) link.dataset.waveState = 'idle'
    }
    const begin = (x: number, y: number, keyboard = false) => {
      if (!supported() || document.hidden) return
      const bounds = link.getBoundingClientRect()
      const center = (element: HTMLElement) => {
        const box = element.getBoundingClientRect()
        return { x: box.left + box.width / 2, y: box.top + box.height / 2 }
      }
      const plan = editorialWavePlan({ x, y }, windows.map(center), center(arrow))
      const position = (x - bounds.left) / Math.max(1, bounds.width)
      link.dataset.waveOrigin = keyboard ? 'focus' : position < .33 ? 'left' : position > .67 ? 'right' : 'center'
      link.dataset.waveState = 'wave'
      letters.forEach((target, index) => {
        const current = getComputedStyle(target).transform
        target.style.removeProperty('transform')
        animate(target, glyphWaveFrames(plan.glyphs[index], current), editorialWaveTuning.glyphDuration, plan.glyphs[index].delay)
      })
      const current = getComputedStyle(arrow).transform
      animate(arrow, arrowWaveFrames(current), editorialWaveTuning.arrowDuration, plan.arrowDelay,
        () => { arrow.style.transform = 'translate(3px, -2px)' })
    }
    const enter = (event: PointerEvent) => {
      if (event.pointerType === 'touch' || !hover.matches) return
      pointerInside = true
      begin(event.clientX, event.clientY)
    }
    const leave = () => { pointerInside = false; settle() }
    const focus = () => {
      focused = link.matches(':focus-visible')
      if (!focused) return
      const bounds = link.getBoundingClientRect()
      begin(bounds.left + bounds.width * editorialWaveTuning.focusOrigin, bounds.top + bounds.height / 2, true)
    }
    const blur = () => { focused = false; settle() }
    const capability = () => { link.dataset.linkMotion = supported() ? 'wave' : 'static'; reset() }
    const hidden = () => { if (document.hidden) reset() }
    const observer = new IntersectionObserver(entries => { if (!entries[0]?.isIntersecting) reset() })
    capability()
    observer.observe(link)
    link.addEventListener('pointerenter', enter)
    link.addEventListener('pointerleave', leave)
    link.addEventListener('pointercancel', leave)
    link.addEventListener('focus', focus)
    link.addEventListener('blur', blur)
    reduced.addEventListener('change', capability)
    document.addEventListener('visibilitychange', hidden)
    return () => {
      disposed = true
      reset()
      observer.disconnect()
      link.removeEventListener('pointerenter', enter)
      link.removeEventListener('pointerleave', leave)
      link.removeEventListener('pointercancel', leave)
      link.removeEventListener('focus', focus)
      link.removeEventListener('blur', blur)
      reduced.removeEventListener('change', capability)
      document.removeEventListener('visibilitychange', hidden)
    }
  }, [children])

  const content = <>
    <span className="editorial-link-copy" aria-hidden="true">{[...children].map((c,i)=><span className="link-letter-window" key={i}><span className="link-letter">{c===' '?'\u00a0':c}<span>{c===' '?'\u00a0':c}</span></span></span>)}</span>
    <span className="editorial-link-arrow" aria-hidden="true">↗</span>
  </>
  const props = { ref: anchor, className: `editorial-link ${className}`, 'aria-label': children }
  if (href !== undefined) return <a {...props} href={href}>{content}</a>
  const path=localizedPath(to,locale)
  return <Link {...props} to={path==='/'?path:`${path}/`}>{content}</Link>
}
