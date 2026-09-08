import { useEffect, type RefObject } from 'react'

/** Only the featured 06 poster is prepared early; no loading gate changes the aperture timeline. */
export function usePerformancePosterReady(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = ref.current, image = root?.querySelector<HTMLImageElement>('#home-featured-performance-image')
    if (!root || !image) return
    let disposed = false, decoding = false
    root.dataset.posterReadiness = 'loading'
    async function prepare() {
      if (disposed || decoding) return
      decoding = true; root!.dataset.posterReadiness = 'decoding'
      try {
        await image!.decode()
        if (!disposed) root!.dataset.posterReadiness = image!.naturalWidth > 0 ? 'decoded' : 'unavailable'
      } catch {
        // A decode failure stays observable; the real image and its ordinary browser fallback remain.
        if (!disposed) root!.dataset.posterReadiness = 'decode-error'
      } finally { decoding = false }
    }
    function failed() { if (!disposed) root!.dataset.posterReadiness = 'unavailable' }
    image.addEventListener('load', prepare); image.addEventListener('error', failed)
    void prepare()
    return () => {
      disposed = true; image.removeEventListener('load', prepare); image.removeEventListener('error', failed)
      delete root.dataset.posterReadiness
    }
  }, [ref])
}
