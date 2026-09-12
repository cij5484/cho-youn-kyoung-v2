import { useEffect, useEffectEvent } from 'react'
import { useNavigate } from 'react-router'
import { localAlbumStudy, appRoute, isLocalDetailRoute, detailDestinationMatches } from './album-navigation.ts'

type Entry = { href: string; src: string; bounds: { x: number; y: number; width: number; height: number }; source?: HTMLImageElement }

/** One image survives the route swap; its two slots, not hardcoded layouts, own the endpoints. */
export function AlbumRouteTransition() {
  const navigate = useNavigate()
  const go = useEffectEvent((href: string) => navigate(href))
  useEffect(() => {
    if (!localAlbumStudy()) return
    let overlay: HTMLImageElement | null = null, animation: Animation | null = null
    let sheet: HTMLDivElement | null = null
    const hiddenImages = new Map<HTMLImageElement, string>()
    const hide = (image: HTMLImageElement) => {
      if (!hiddenImages.has(image)) hiddenImages.set(image, image.style.visibility)
      image.style.visibility = 'hidden'
    }
    const entryAnimations: Animation[] = []
    let generation = 0, origin = { y: 0, slug: '', kind: 'album', href: '/works/' }
    const clear = () => {
      animation?.cancel(); animation = null; overlay?.remove(); overlay = null
      entryAnimations.splice(0).forEach(item => item.cancel())
      sheet?.remove(); sheet = null
      hiddenImages.forEach((visibility, image) => { image.style.visibility = visibility }); hiddenImages.clear()
    }
    async function enter({ href, src, bounds, source }: Entry) {
      const route = appRoute(href)
      if (!route) return
      const attempt = ++generation
      clear()
      const returning = route.startsWith('/works')
      const archiveReturn = route === '/works/#works-compact-archive'
      const performanceEntry = route.startsWith('/performance/')
      const detailToDetail = isLocalDetailRoute(appRoute(location.pathname)) && isLocalDetailRoute(route)
      let start = bounds
      if (appRoute(location.pathname)?.replace(/\/$/, '') === '/works') origin = { y: scrollY, slug: route.split('/')[2], kind: route.split('/')[1], href: appRoute(location.pathname + location.search)! }
      const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
      if (!reduced && (!returning || origin.slug) && src && bounds.width > 0 && bounds.y < innerHeight && bounds.y + bounds.height > 0) {
        overlay = document.createElement('img')
        overlay.src = src; overlay.alt = ''; overlay.setAttribute('aria-hidden', 'true')
        Object.assign(overlay.style, { position: 'fixed', zIndex: '900', pointerEvents: 'none', objectFit: 'contain',
          left: `${bounds.x}px`, top: `${bounds.y}px`, width: `${bounds.width}px`, height: `${bounds.height}px`, margin: '0' })
        document.body.append(overlay)
        if (source) hide(source)
      }
      if (detailToDetail && overlay) {
        // Related works travel directly from their selected thumbnail to the new hero.
        sheet = document.createElement('div')
        sheet.setAttribute('aria-hidden', 'true')
        Object.assign(sheet.style, { position: 'fixed', inset: '0', zIndex: '899', background: 'var(--color-canvas, #f4f0e8)', pointerEvents: 'auto' })
        document.body.append(sheet)
        entryAnimations.push(sheet.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 160, fill: 'forwards' }))
      }
      if (performanceEntry && overlay && !detailToDetail) {
        // ImageToGrid's large-image-to-measured-slot staging: preserve the poster ratio throughout.
        const ratio = bounds.width / bounds.height
        const width = Math.min(innerWidth - 40, innerHeight * .8 * ratio), height = width / ratio
        start = { x: (innerWidth - width) / 2, y: (innerHeight - height) / 2, width, height }
        sheet = document.createElement('div')
        sheet.setAttribute('aria-hidden', 'true')
        Object.assign(sheet.style, { position: 'fixed', inset: '0', zIndex: '899', background: 'var(--color-canvas, #f4f0e8)', pointerEvents: 'auto' })
        document.body.append(sheet)
        entryAnimations.push(sheet.animate([
          { clipPath: 'polygon(0 100%,100% 85%,100% 100%,0 100%)' },
          { clipPath: 'polygon(0 0,100% 0,100% 100%,0 100%)' },
        ], { duration: 360, easing: 'cubic-bezier(.65,0,.25,1)', fill: 'forwards' }))
        animation = overlay.animate([
          { transform: 'translate(0,0) scale(1)', transformOrigin: 'top left' },
          { transform: `translate(${start.x - bounds.x}px,${start.y - bounds.y}px) scale(${width / bounds.width})`, transformOrigin: 'top left' },
        ], { duration: 360, easing: 'cubic-bezier(.65,0,.25,1)', fill: 'forwards' })
        await animation.finished.catch(() => {})
        if (attempt !== generation) return
        Object.assign(overlay.style, { left: `${start.x}px`, top: `${start.y}px`, width: `${width}px`, height: `${height}px` })
        animation.cancel(); animation = null
      }
      go(returning && !archiveReturn ? origin.href : route)
      if (returning && !origin.slug && !archiveReturn) return
      // Destination may be lazy: keep the actual selected image while its slot mounts.
      let destination: DOMRect | null = null
      const deadline = performance.now() + 2400
      while (attempt === generation && performance.now() < deadline) {
        await new Promise(requestAnimationFrame)
        if (returning) {
          const spatial = document.querySelector<HTMLElement>('.atmospheric-depth')
          if (!spatial || !['ready', 'fallback'].includes(spatial.dataset.state ?? '')) continue
          if (archiveReturn) {
            const archive = spatial.querySelector<HTMLElement>('#works-compact-archive')
            if (!archive) continue
            const fallback = spatial.dataset.state === 'fallback'
            const top = fallback ? archive.getBoundingClientRect().top + scrollY
              : Number(spatial.dataset.scrollStart) + Number(spatial.dataset.scrollRange) * .985
            if (!Number.isFinite(top)) continue
            scrollTo({ top, behavior: 'instant' })
            if (!fallback && Number(archive.dataset.indexExpansion ?? 0) < .999) continue
            archive.focus({ preventScroll: true })
            break
          }
          scrollTo({ top: origin.y, behavior: 'instant' })
          await new Promise(requestAnimationFrame)
          const row = document.querySelector(`[data-work-id="${origin.kind}:${origin.slug}"] img`)
          if (Number(spatial.dataset.resolution ?? 0) > .9 && row) destination = row.getBoundingClientRect()
          else {
            if (origin.slug && row?.closest<HTMLElement>('[data-sequence]')?.dataset.sequence !== spatial.dataset.focus) continue
            const { focusX, focusY, focusWidth, focusHeight } = spatial.dataset
            if (focusWidth) destination = new DOMRect(Number(focusX) - Number(focusWidth) / 2, Number(focusY) - Number(focusHeight) / 2, Number(focusWidth), Number(focusHeight))
          }
        } else {
          // Router navigation is asynchronous: never measure the outgoing detail's hero.
          const requested = route.split(/[?#]/)[0].replace(/\/$/, '')
          const current = appRoute(location.pathname)?.replace(/\/$/, '')
          if (current !== requested) continue
          const owner = document.querySelector<HTMLElement>(`[data-detail-route="${CSS.escape(requested)}"]`)
          if (!detailDestinationMatches(route, current ?? null, owner?.dataset.detailRoute)) continue
          const image = owner?.querySelector<HTMLImageElement>('[data-album-cover], [data-performance-poster]')
          if (!image) continue
          if (!image.complete || !image.naturalWidth) continue
          if (overlay) hide(image)
          scrollTo({ top: 0, behavior: 'instant' })
          await new Promise(requestAnimationFrame)
          if (attempt !== generation) return
          if (!image.isConnected) continue
          destination = image.getBoundingClientRect()
          if (performanceEntry && overlay) {
            owner!.querySelectorAll('.performance-hero-copy, .performance-visit').forEach(copy => entryAnimations.push(copy.animate([
              { clipPath: 'inset(0 0 100% 0)', transform: 'translateY(24px)' },
              { clipPath: 'inset(0 0 0% 0)', transform: 'translateY(0)' },
            ], { duration: 600, easing: 'cubic-bezier(.16,1,.3,1)' })))
          }
        }
        if (destination) break
      }
      if (attempt !== generation) return
      if (overlay && destination) {
        if (sheet) entryAnimations.push(sheet.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 420, fill: 'forwards' }))
        animation = overlay.animate([
          { left: `${start.x}px`, top: `${start.y}px`, width: `${start.width}px`, height: `${start.height}px`, opacity: 1 },
          { left: `${destination.x}px`, top: `${destination.y}px`, width: `${destination.width}px`, height: `${destination.height}px`, opacity: 1, offset: .88 },
          { left: `${destination.x}px`, top: `${destination.y}px`, width: `${destination.width}px`, height: `${destination.height}px`, opacity: performanceEntry ? 1 : 0 },
        ], { duration: performanceEntry || detailToDetail ? 620 : 950, easing: 'cubic-bezier(.22,.75,.16,1)', fill: 'forwards' })
        await animation.finished.catch(() => {})
      }
      if (attempt === generation) clear()
    }
    const request = (event: Event) => { event.preventDefault(); void enter((event as CustomEvent<Entry>).detail) }
    const click = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      const link = (event.target as Element).closest<HTMLAnchorElement>('a[href]')
      if (!link || link.hasAttribute('download') || link.target && link.target !== '_self') return
      const href = link.getAttribute('href')!
      if (!isLocalDetailRoute(appRoute(href)) && !link.hasAttribute('data-album-return') && !link.hasAttribute('data-performance-archive-return')) return
      event.preventDefault()
      const image = link.querySelector<HTMLImageElement>('img') ?? document.querySelector<HTMLImageElement>('[data-album-cover], [data-performance-poster]')
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
      void enter({ href, src, bounds, source: image ?? undefined })
    }
    const cancel = () => { generation++; clear() }
    const escape = (event: KeyboardEvent) => { if (event.key === 'Escape' && sheet) cancel() }
    document.addEventListener('click', click)
    window.addEventListener('album-entry', request); window.addEventListener('popstate', cancel)
    window.addEventListener('keydown', escape)
    return () => { cancel(); document.removeEventListener('click', click); window.removeEventListener('album-entry', request); window.removeEventListener('popstate', cancel); window.removeEventListener('keydown', escape) }
  }, [])
  return null
}
