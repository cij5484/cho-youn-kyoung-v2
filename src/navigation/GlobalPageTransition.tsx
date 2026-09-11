import { useEffect, useEffectEvent, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { mountPageTransition } from './page-transition.ts'
import './page-transition.css'

export function GlobalPageTransition() {
  const location = useLocation(), navigate = useNavigate()
  const dialog = useRef<HTMLDialogElement>(null)
  const controller = useRef<ReturnType<typeof mountPageTransition> | null>(null)
  const go = useEffectEvent((path: string) => navigate(path))
  const current = useEffectEvent(() => location.pathname)
  useEffect(() => {
    if (import.meta.env.MODE !== 'development-preview' && (!import.meta.env.DEV || !/^(localhost|127\.0\.0\.1|\[::1\])$/.test(window.location.hostname))) return
    controller.current = mountPageTransition(dialog.current!, go, current)
    return () => { controller.current?.destroy(); controller.current = null }
  }, [])
  useEffect(() => { controller.current?.arrived() }, [location.key])
  return <dialog ref={dialog} className="global-page-transition" aria-label="페이지 이동" data-phase="idle">
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      <path data-transition-path/>
    </svg>
  </dialog>
}
