import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router'

/** New pages start at their opening; same-page filters/candidates retain their place. */
export function usePathnameScroll() {
  const { pathname, hash } = useLocation()
  const previous = useRef(pathname)
  useEffect(() => {
    if (previous.current === pathname) return
    previous.current = pathname
    // An explicit section destination is positioned by its page owner/native anchor.
    if (hash) return
    // After route effects release the menu and dispose the outgoing scene's settle.
    const frame = requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
      document.querySelector<HTMLElement>('main[tabindex="-1"]')?.focus({ preventScroll: true })
    })
    return () => cancelAnimationFrame(frame)
  }, [pathname, hash])
}
