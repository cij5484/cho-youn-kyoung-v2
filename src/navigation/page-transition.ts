import { gsap } from 'gsap'

export const pageTransitionTiming = { cover: .36, reveal: .48 }

/** Theodore's quadratic sheet: its centre leads, then the curved edge straightens.
 * One light surface travels upward through both phases, without a dark interstitial. */
export function pageCoverPath(progress: number, covering: boolean) {
  const t = Math.max(0, Math.min(1, progress))
  const edge = 100 * (1 - t), curve = edge - (t === 0 || t === 1 ? 0 : 50 * Math.sin(Math.PI * t))
  return `M 0 ${covering ? 100 : 0} V ${edge} Q 50 ${curve} 100 ${edge} V ${covering ? 100 : 0} Z`
}

export function transitionPage(path: string) {
  const pathname = path.split(/[?#]/)[0].replace(/\/$/, '') || '/'
  return ({ '/': 'Home', '/works': 'Works', '/media': 'Media', '/about': 'About', '/contact': 'Contact' } as Record<string, string>)[pathname]
}

/** A single curved curtain, based on codrops/Theodore's SVG cover/commit/reveal.
 * Router commits only beneath the opaque cover; no page/audio owner is remounted here. */
export function mountPageTransition(dialog: HTMLDialogElement, navigate: (path: string) => void, current: () => string) {
  const paths = [...dialog.querySelectorAll<SVGPathElement>('[data-transition-path]')]
  let timeline: gsap.core.Timeline | undefined, destination = '', frame = 0, timeout = 0
  let origin: HTMLElement | null = null, contentMotion: Animation | null = null
  const reduced = matchMedia('(prefers-reduced-motion: reduce)')
  const sweep = (covering: boolean, complete: () => void) => {
    const sequence = gsap.timeline({ onComplete: complete })
    paths.forEach(path => {
      const sample = { progress: 0 }
      path.setAttribute('d', pageCoverPath(0, covering))
      sequence.to(sample, { progress: 1, duration: covering ? pageTransitionTiming.cover : pageTransitionTiming.reveal,
        ease: covering ? 'power2.inOut' : 'power3.out', onUpdate: () => path.setAttribute('d', pageCoverPath(sample.progress, covering)),
      }, 0)
    })
    return sequence
  }
  const clear = () => {
    timeline?.kill(); timeline = undefined
    contentMotion?.cancel(); contentMotion = null
    cancelAnimationFrame(frame); clearTimeout(timeout)
    destination = ''; dialog.dataset.phase = 'idle'
    dialog.close()
  }
  const finish = () => {
    clear()
    document.querySelector<HTMLElement>('main[tabindex="-1"]')?.focus({ preventScroll: true })
  }
  const cancel = () => {
    if (!destination) return
    const committed = destination && current().replace(/\/$/, '') === destination.split(/[?#]/)[0].replace(/\/$/, '')
    clear()
    if (committed) document.querySelector<HTMLElement>('main[tabindex="-1"]')?.focus({ preventScroll: true })
    else origin?.focus({ preventScroll: true })
  }
  const arrived = () => {
    if (!destination || current().replace(/\/$/, '') !== destination.split(/[?#]/)[0].replace(/\/$/, '')) return
    clearTimeout(timeout)
    // Let the route and its layout effects commit before uncovering it.
    frame = requestAnimationFrame(() => { frame = requestAnimationFrame(() => {
      dialog.dataset.phase = 'reveal'
      // The incoming composition follows the sheet, while its own scene transforms stay untouched.
      contentMotion = document.querySelector('main')?.animate([
        { transform: 'translateY(28px)', opacity: .65 }, { transform: 'translateY(0)', opacity: 1 },
      ], { duration: 480, easing: 'cubic-bezier(.16,1,.3,1)' }) ?? null
      timeline = sweep(false, finish)
    }) })
  }
  const click = (event: MouseEvent) => {
    if (event.defaultPrevented || event.button || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[href]') : null
    if (!link || link.hasAttribute('download') || link.target && link.target !== '_self') return
    const url = new URL(link.href), base = import.meta.env.BASE_URL
    if (url.origin !== location.origin || !url.pathname.startsWith(base)) return
    const path = `/${url.pathname.slice(base.length)}`, title = transitionPage(path)
    if (!title || !transitionPage(current()) || path.replace(/\/$/, '') === current().replace(/\/$/, '') || reduced.matches) return
    event.preventDefault(); event.stopPropagation()
    if (destination) return
    origin = link; destination = `${path}${url.search}${url.hash}`
    dialog.setAttribute('aria-label', `${title} 페이지로 이동`)
    paths.forEach(path => path.setAttribute('d', pageCoverPath(0, true)))
    dialog.showModal()
    dialog.dataset.phase = 'cover'
    timeline = sweep(true, () => {
      dialog.dataset.phase = 'covered'
      navigate(destination)
      // A failed destination must never strand a modal over the site.
      timeout = window.setTimeout(finish, 4000)
    })
  }
  const escape = (event: Event) => { event.preventDefault(); cancel() }
  const blockScroll = (event: Event) => event.preventDefault()
  document.addEventListener('click', click, true)
  window.addEventListener('popstate', cancel)
  reduced.addEventListener('change', cancel)
  dialog.addEventListener('cancel', escape)
  dialog.addEventListener('wheel', blockScroll, { passive: false })
  return { arrived, destroy() {
    clear()
    document.removeEventListener('click', click, true)
    window.removeEventListener('popstate', cancel)
    reduced.removeEventListener('change', cancel)
    dialog.removeEventListener('cancel', escape)
    dialog.removeEventListener('wheel', blockScroll)
  } }
}
