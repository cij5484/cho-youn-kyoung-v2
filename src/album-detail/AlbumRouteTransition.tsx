import { useEffect, useEffectEvent } from 'react'
import { useNavigate } from 'react-router'
import { localAlbumStudy } from './album-navigation.ts'

type Entry = { href: string; src: string; bounds: { x: number; y: number; width: number; height: number } }

/** One image survives the route swap; its two slots, not hardcoded layouts, own the endpoints. */
export function AlbumRouteTransition() {
  const navigate = useNavigate()
  const go = useEffectEvent((href: string) => navigate(href))
  useEffect(() => {
    if (!localAlbumStudy()) return
    let overlay: HTMLImageElement | null = null, animation: Animation | null = null
    let generation = 0, origin = { y: 0, slug: '', href: '/works/' }
    const clear = () => { animation?.cancel(); animation = null; overlay?.remove(); overlay = null }
    async function enter({ href, src, bounds }: Entry) {
      const attempt = ++generation
      clear()
      const returning = href.startsWith('/works')
      if (location.pathname.replace(/\/$/, '') === '/works') origin = { y: scrollY, slug: href.split('/')[2], href: location.pathname + location.search }
      const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
      if (!reduced && (!returning || origin.slug) && src && bounds.width > 0 && bounds.y < innerHeight && bounds.y + bounds.height > 0) {
        overlay = document.createElement('img')
        overlay.src = src; overlay.alt = ''; overlay.setAttribute('aria-hidden', 'true')
        Object.assign(overlay.style, { position: 'fixed', zIndex: '900', pointerEvents: 'none', objectFit: 'contain',
          left: `${bounds.x}px`, top: `${bounds.y}px`, width: `${bounds.width}px`, height: `${bounds.height}px`, margin: '0' })
        document.body.append(overlay)
      }
      go(returning ? origin.href : href)
      if (returning && !origin.slug) return
      // Destination may be lazy: keep the actual selected image while its slot mounts.
      let destination: DOMRect | null = null
      const deadline = performance.now() + 2400
      while (attempt === generation && performance.now() < deadline) {
        await new Promise(requestAnimationFrame)
        if (returning) {
          const spatial = document.querySelector<HTMLElement>('.atmospheric-depth')
          if (!spatial || !['ready', 'fallback'].includes(spatial.dataset.state ?? '')) continue
          scrollTo({ top: origin.y, behavior: 'instant' })
          await new Promise(requestAnimationFrame)
          const row = document.querySelector(`[data-work-id="album:${origin.slug}"] img`)
          if (Number(spatial.dataset.resolution ?? 0) > .9 && row) destination = row.getBoundingClientRect()
          else {
            if (origin.slug && row?.closest<HTMLElement>('[data-sequence]')?.dataset.sequence !== spatial.dataset.focus) continue
            const { focusX, focusY, focusWidth, focusHeight } = spatial.dataset
            if (focusWidth) destination = new DOMRect(Number(focusX) - Number(focusWidth) / 2, Number(focusY) - Number(focusHeight) / 2, Number(focusWidth), Number(focusHeight))
          }
        } else {
          const image = document.querySelector<HTMLImageElement>('[data-album-cover]')
          if (!image) continue
          if (!image.complete) continue
          scrollTo({ top: 0, behavior: 'instant' })
          destination = image.getBoundingClientRect()
        }
        if (destination) break
      }
      if (attempt !== generation) return
      if (overlay && destination) {
        animation = overlay.animate([
          { left: `${bounds.x}px`, top: `${bounds.y}px`, width: `${bounds.width}px`, height: `${bounds.height}px`, opacity: 1 },
          { left: `${destination.x}px`, top: `${destination.y}px`, width: `${destination.width}px`, height: `${destination.height}px`, opacity: 1, offset: .88 },
          { left: `${destination.x}px`, top: `${destination.y}px`, width: `${destination.width}px`, height: `${destination.height}px`, opacity: 0 },
        ], { duration: 950, easing: 'cubic-bezier(.22,.75,.16,1)', fill: 'forwards' })
        await animation.finished.catch(() => {})
      }
      if (attempt === generation) clear()
    }
    const request = (event: Event) => { event.preventDefault(); void enter((event as CustomEvent<Entry>).detail) }
    const click = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      const link = (event.target as Element).closest<HTMLAnchorElement>('a[data-album-link], a[data-album-return], a[href^="/album/"]')
      if (!link || link.target === '_blank') return
      const href = link.getAttribute('href')!
      if (!href.startsWith('/album/') && !link.hasAttribute('data-album-return')) return
      event.preventDefault()
      const image = link.querySelector<HTMLImageElement>('img') ?? document.querySelector<HTMLImageElement>('[data-album-cover]')
      const spatial = link.closest<HTMLElement>('.atmospheric-depth')
      let bounds = image?.getBoundingClientRect() ?? new DOMRect()
      let src = image?.currentSrc ?? ''
      if (spatial && link.classList.contains('atmospheric-record')) {
        const index = spatial.dataset.focus
        const thumb = document.querySelector<HTMLImageElement>(`[data-sequence="${index}"] img`)
        src = thumb?.currentSrc ?? thumb?.src ?? ''
        bounds = new DOMRect(Number(spatial.dataset.focusX) - Number(spatial.dataset.focusWidth) / 2,
          Number(spatial.dataset.focusY) - Number(spatial.dataset.focusHeight) / 2, Number(spatial.dataset.focusWidth), Number(spatial.dataset.focusHeight))
      }
      void enter({ href, src, bounds })
    }
    const cancel = () => { generation++; clear() }
    document.addEventListener('click', click)
    window.addEventListener('album-entry', request); window.addEventListener('popstate', cancel)
    return () => { cancel(); document.removeEventListener('click', click); window.removeEventListener('album-entry', request); window.removeEventListener('popstate', cancel) }
  }, [])
  return null
}
