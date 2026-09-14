import { updateSiteMetadata } from '../seo/browser.ts'
import { legacyHashPath } from '../seo/metadata.ts'
import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { BrowserRouter } from 'react-router'
import EntryScreen from './EntryScreen.tsx'
import { counterpartPath, editionHref, editionRoute, type Edition } from './mode-routing.ts'
import './entry.css'

const loadImmersive = () => import('../../labs/interaction/InteractionLab.tsx')
const Immersive = lazy(() => loadImmersive().then(module => ({ default: module.InteractionLab })))
const entryBase = import.meta.env.BASE_URL.replace(/immersive\/$/, '')
const classicUrl = import.meta.env.DEV ? 'http://127.0.0.1:4181/' : `${location.origin}${entryBase}classic-app/`
const classicOrigin = new URL(classicUrl).origin
const readRoute = () => editionRoute(location.pathname, entryBase)
const modeHref = (mode: Edition, path = '/') => editionHref(mode, path, entryBase)
// Normalize existing direct bookmarks before BrowserRouter reads the initial location.
const legacy = location.pathname === entryBase ? legacyHashPath(location.hash) : undefined
if (legacy) history.replaceState(null, '', `${entryBase}${legacy.slice(1)}${location.search}`)
const initialRoute = readRoute()
if (initialRoute.path.replace(/\/$/, '') === '/performance') initialRoute.path = '/works/'
if (initialRoute.mode === 'immersive' && !location.pathname.startsWith(modeHref('immersive'))) {
  history.replaceState(null, '', modeHref('immersive', initialRoute.path) + location.search + location.hash)
}

function Classic({ path }: { path: string }) {
  const frame = useRef<HTMLIFrameElement>(null)
  useEffect(() => {
    const receive = (event: MessageEvent) => {
      if (event.origin !== classicOrigin || event.source !== frame.current?.contentWindow) return
      if (event.data?.type === 'classic-mode') { location.assign(modeHref('immersive', counterpartPath(readRoute().path))); return }
      if (event.data?.type !== 'classic-route') return
      const next = event.data.path
      if (typeof next !== 'string' || !next.startsWith('/') || next.startsWith('//')) return
      if (location.pathname + location.search !== modeHref('classic', next)) {
        history[event.data.replace ? 'replaceState' : 'pushState'](null, '', modeHref('classic', next))
        updateSiteMetadata()
      }
    }
    window.addEventListener('message', receive)
    return () => window.removeEventListener('message', receive)
  }, [])
  useEffect(() => { frame.current?.contentWindow?.postMessage({ type: 'classic-navigate', path }, classicOrigin) }, [path])
  // The iframe src is fixed after mount. The bridge owns subsequent route changes.
  const [initial] = useState(path)
  return <div className="classic-shell"><iframe ref={frame} title="Classic — 조윤경 공식 홈페이지" src={`${classicUrl}#${initial.replace(/\/$/, '') || '/'}`}/></div>
}

export default function EditionApp() {
  const [route, setRoute] = useState(() => readRoute())
  const [entry, setEntry] = useState(route.mode === null)
  useEffect(() => {
    const restore = () => { const next = readRoute(); setRoute(next); setEntry(!next.mode) }
    window.addEventListener('popstate', restore)
    return () => window.removeEventListener('popstate', restore)
  }, [route.mode, route.path])
  useEffect(() => { updateSiteMetadata() }, [route, entry])
  return <>
    <div inert={entry} aria-hidden={entry || undefined}>
    {route.mode === 'immersive' && <BrowserRouter basename={import.meta.env.BASE_URL}><Suspense fallback={<div className="edition-loading" role="status">CHO YOUN KYOUNG</div>}><Immersive/></Suspense></BrowserRouter>}
    {route.mode === 'classic' && <Classic path={route.path}/>}
    </div>
    {entry && <EntryScreen href={modeHref}/>}
  </>
}
