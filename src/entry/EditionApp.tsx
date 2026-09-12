import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react'
import { BrowserRouter, useLocation } from 'react-router'
import EntryScreen from './EntryScreen.tsx'
import { counterpartPath, editionHref, editionRoute, type Edition } from './mode-routing.ts'
import { ModeSwitch } from './ModeSwitch.tsx'
import './entry.css'

const loadImmersive = () => import('../../labs/interaction/InteractionLab.tsx')
const Immersive = lazy(() => loadImmersive().then(module => ({ default: module.InteractionLab })))
const entryBase = import.meta.env.BASE_URL.replace(/immersive\/$/, '')
const classicUrl = import.meta.env.DEV ? 'http://127.0.0.1:4181/' : `${location.origin}${entryBase}classic-app/`
const classicOrigin = new URL(classicUrl).origin
const readRoute = () => editionRoute(location.pathname, entryBase)
const modeHref = (mode: Edition, path = '/') => editionHref(mode, path, entryBase)
// Normalize existing direct bookmarks before BrowserRouter reads the initial location.
const initialRoute = readRoute()
if (initialRoute.mode === 'immersive' && !location.pathname.startsWith(modeHref('immersive'))) {
  history.replaceState(null, '', modeHref('immersive', initialRoute.path) + location.search + location.hash)
}

function ImmersiveSwitch() {
  return <ModeSwitch mode="immersive" path={useLocation().pathname}/>
}

function Classic({ path, onReady }: { path: string; onReady: (timedOut: boolean) => void }) {
  const frame = useRef<HTMLIFrameElement>(null)
  useEffect(() => {
    const receive = (event: MessageEvent) => {
      if (event.origin !== classicOrigin || event.source !== frame.current?.contentWindow) return
      if (event.data?.type === 'classic-mode') { location.assign(modeHref('immersive', counterpartPath(readRoute().path))); return }
      if (event.data?.type === 'classic-ready') { onReady(event.data.timedOut === true); return }
      if (event.data?.type !== 'classic-route') return
      const next = event.data.path
      if (typeof next !== 'string' || !next.startsWith('/') || next.startsWith('//')) return
      if (location.pathname + location.search !== modeHref('classic', next)) {
        history[event.data.replace ? 'replaceState' : 'pushState'](null, '', modeHref('classic', next))
      }
    }
    window.addEventListener('message', receive)
    return () => window.removeEventListener('message', receive)
  }, [onReady])
  useEffect(() => { frame.current?.contentWindow?.postMessage({ type: 'classic-navigate', path }, classicOrigin) }, [path])
  // The iframe src is fixed after mount. The bridge owns subsequent route changes.
  const [initial] = useState(path)
  return <div className="classic-shell"><iframe ref={frame} title="Classic — 조윤경 공식 홈페이지" src={`${classicUrl}#${initial.replace(/\/$/, '') || '/'}`}/></div>
}

export default function EditionApp() {
  const [route, setRoute] = useState(() => readRoute())
  const [entry, setEntry] = useState(route.mode === null)
  const classicReady = useRef<((timedOut: boolean) => void) | null>(null)
  const onClassicReady = useCallback((timedOut: boolean) => { classicReady.current?.(timedOut); classicReady.current = null }, [])
  useEffect(() => {
    const restore = () => { const next = readRoute(); setRoute(next); setEntry(!next.mode) }
    window.addEventListener('popstate', restore)
    return () => window.removeEventListener('popstate', restore)
  }, [route.mode, route.path])
  const prepare = async (mode: Edition, signal: AbortSignal) => {
    if (mode === 'immersive') {
      const [, image] = await Promise.all([loadImmersive(), import('../hero/assets/portrait-initial.webp')])
      const portrait = new Image(); portrait.src = image.default; await portrait.decode()
    }
    else await fetch(classicUrl, { mode: 'cors', signal }).then(response => { if (!response.ok) throw new Error('Classic preview unavailable') })
    signal.throwIfAborted()
    history.pushState(null, '', modeHref(mode))
    document.title = `CHO YOUN KYOUNG — ${mode === 'classic' ? 'Classic' : 'Immersive'}`
    const ready = mode === 'classic' ? new Promise<void>((resolve, reject) => {
      const timeout = window.setTimeout(() => classicReady.current?.(true), 16000)
      const cancel = () => { clearTimeout(timeout); classicReady.current = null; reject(signal.reason) }
      signal.addEventListener('abort', cancel, { once: true })
      classicReady.current = timedOut => {
        clearTimeout(timeout); signal.removeEventListener('abort', cancel)
        if (timedOut) reject(new Error('Classic preview did not become ready'))
        else resolve()
      }
    }) : Promise.resolve()
    setRoute({ mode, path: '/' })
    await ready
  }
  return <>
    <div inert={entry} aria-hidden={entry || undefined}>
    {route.mode === 'immersive' && <BrowserRouter basename={import.meta.env.BASE_URL}><Suspense fallback={<div className="edition-loading" role="status">CHO YOUN KYOUNG</div>}><Immersive/></Suspense><ImmersiveSwitch/></BrowserRouter>}
    {route.mode === 'classic' && <Classic path={route.path} onReady={onClassicReady}/>}
    </div>
    {entry && <EntryScreen prepare={prepare} finish={() => { setEntry(false); document.querySelector<HTMLElement>('main')?.focus({ preventScroll: true }) }}/>}
  </>
}
