import { useEffect, useId } from 'react'
import { createPortal } from 'react-dom'
import { CompactArtistProfile } from './CompactArtistProfile.tsx'
import { artistExperienceFrame, createHanjiField, paintHanjiMask } from './hanji-mask.ts'
import './artist-experience.css'

export interface ArtistExperienceProps {
  host: HTMLElement
  mode: 'straight' | 'hanji'
  locale: 'ko' | 'en'
}

/** The HOME artist owner shares the established stage frame and timeline with both approved and comparison modes. */
export function ArtistExperience({ host, mode, locale }: ArtistExperienceProps) {
  const titleId = useId()
  const stage = host.matches('.stage-artist-sequence') ? host : host.querySelector<HTMLElement>('.stage-artist-sequence')
  const section = stage?.querySelector<HTMLElement>('.artist-scene')

  useEffect(() => {
    const root = host.matches('.stage-artist-sequence') ? host.closest<HTMLElement>('.stage-artist-sequence') : host.querySelector<HTMLElement>('.stage-artist-sequence')
    const artistSection = root?.querySelector<HTMLElement>('.artist-scene')
    if (!root || !artistSection) return
    const reduced = matchMedia('(prefers-reduced-motion: reduce)')
    const oldLabel = artistSection.getAttribute('aria-labelledby')
    const customProperties = ['--experience-photo', '--experience-profile', '--experience-seam', '--experience-mask']
    const oldProperties = customProperties.map(property => root.style.getPropertyValue(property))
    let disposed = false, visible = false, frame = 0, lastStep = -1
    let canvas: HTMLCanvasElement | null = null, context: CanvasRenderingContext2D | null = null
    let field: ReturnType<typeof createHanjiField> | null = null, pixels: ImageData | null = null
    let maskFailed = mode === 'hanji' && !CSS.supports('mask-image', 'linear-gradient(#000, #000)')
    root.dataset.artistExperience = mode
    artistSection.setAttribute('aria-labelledby', titleId)

    function mask(progress: number) {
      if (maskFailed || mode !== 'hanji' || reduced.matches) return
      if (progress === 0 || progress === 1) {
        root!.style.setProperty('--experience-mask', progress === 0 ? 'linear-gradient(transparent, transparent)' : 'linear-gradient(#000, #000)')
        lastStep = -1
        return
      }
      // At most 180 immutable threshold states; offscreen scenes never rasterize the field.
      const step = Math.round(progress * 180)
      if (step === lastStep) return
      try {
        if (!context) {
          canvas = document.createElement('canvas')
          context = canvas.getContext('2d')
          if (!context) throw new Error('Canvas mask unavailable')
          field = createHanjiField(); canvas.width = field.width; canvas.height = field.height
          pixels = context.createImageData(field.width, field.height)
        }
        paintHanjiMask(field!, step / 180, pixels!.data)
        context.putImageData(pixels!, 0, 0)
        root!.style.setProperty('--experience-mask', `url("${canvas!.toDataURL()}")`)
        lastStep = step
      } catch {
        // A graphics capability failure leaves real photographs and DOM profile readable.
        maskFailed = true
        root!.dataset.artistMask = 'straight-fallback'
        root!.style.removeProperty('--experience-mask')
      }
    }

    function paint() {
      frame = 0
      if (disposed || document.hidden) return
      const p = Number(root!.dataset.sequenceProgress ?? 0)
      const f = artistExperienceFrame(p), still = reduced.matches
      const reveal = still ? 1 : f.reveal
      root!.dataset.artistExperienceProgress = reveal.toFixed(5)
      root!.dataset.artistViewing = String(still || f.viewing)
      root!.dataset.artistMask = still ? 'static' : maskFailed ? 'straight-fallback' : mode
      root!.style.setProperty('--experience-photo', String(reveal))
      root!.style.setProperty('--experience-profile', String(still ? 1 : f.profile))
      root!.style.setProperty('--experience-seam', String(still ? 0 : f.seam))
      if (visible || still) mask(reveal)
    }
    function request() { if (!disposed && visible && !frame && !document.hidden) frame = requestAnimationFrame(paint) }
    function motionPreference() { lastStep = -1; paint() }
    function visibility() {
      if (document.hidden) { cancelAnimationFrame(frame); frame = 0 }
      else request()
    }
    const geometry = root.getBoundingClientRect()
    visible = geometry.bottom > 0 && geometry.top < innerHeight
    // Read the existing owner; no independent scroll interpolation, pointer state or perpetual RAF.
    const sequence = new MutationObserver(request)
    sequence.observe(root, { attributes: true, attributeFilter: ['data-sequence-progress'] })
    const intersection = new IntersectionObserver(entries => {
      visible = entries.some(entry => entry.isIntersecting)
      if (visible) request()
      else { cancelAnimationFrame(frame); frame = 0 }
    })
    intersection.observe(root)
    reduced.addEventListener('change', motionPreference)
    document.addEventListener('visibilitychange', visibility)
    paint()
    return () => {
      disposed = true; cancelAnimationFrame(frame); sequence.disconnect(); intersection.disconnect()
      reduced.removeEventListener('change', motionPreference); document.removeEventListener('visibilitychange', visibility)
      customProperties.forEach((property, index) => {
        if (oldProperties[index]) root.style.setProperty(property, oldProperties[index])
        else root.style.removeProperty(property)
      })
      delete root.dataset.artistExperience; delete root.dataset.artistExperienceProgress
      delete root.dataset.artistViewing; delete root.dataset.artistMask
      if (oldLabel === null) artistSection.removeAttribute('aria-labelledby')
      else artistSection.setAttribute('aria-labelledby', oldLabel)
      if (canvas) { canvas.width = 0; canvas.height = 0 }
      context = null; canvas = null; field = null; pixels = null
    }
  }, [host, mode, titleId])

  if (!section) return null
  return createPortal(<CompactArtistProfile titleId={titleId} locale={locale}/>, section)
}
