import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { Link, useLocation } from 'react-router'
import type { SemanticRoute } from '../routing/locale-contract.ts'
import { routeHref } from '../spike/paths.ts'
import { navigationModel } from './model.ts'
import { createMenuReveal, type MenuPhase } from './menu-reveal.ts'
import { ModeSwitch } from '../entry/ModeSwitch.tsx'

interface Props { catalog: readonly SemanticRoute[]; mainId: string }

export function EditorialNavigation({ catalog, mainId }: Props) {
  const location = useLocation()
  const model = navigationModel(location.pathname, catalog)
  const dialog = useRef<HTMLDialogElement>(null)
  const reveal = useRef<ReturnType<typeof createMenuReveal> | null>(null)
  const [phase, setPhase] = useState<MenuPhase>('closed')
  const ko = model.lang === 'ko'

  useEffect(() => {
    const controller = createMenuReveal(dialog.current!, setPhase)
    reveal.current = controller
    return () => { controller.destroy(); reveal.current = null }
  }, [])

  useEffect(() => {
    // Route activation/history must not wait for an exit animation or leave a modal over the new page.
    reveal.current?.closeImmediately()
  }, [location.key])

  const triggerGraphic = <>
    <span className="trigger-copy" aria-hidden="true"><span className="trigger-window"><span className="trigger-switch">
      <span lang="en">MENU</span><span lang="en">CLOSE</span>
    </span></span></span>
    <span className="trigger-symbol" aria-hidden="true"><span className="symbol-lines" /></span>
  </>

  const languageLinks = <div className="nav-languages" role="group" aria-label={ko ? '언어' : 'Language'}>
    {model.languages.map(item => item.status === 'available'
      ? <Link key={item.language} to={routeHref(item.to)} lang={item.language} hrefLang={item.language}
          aria-label={item.language === 'ko' ? '한국어' : 'English'}
          aria-current={model.lang === item.language ? 'true' : undefined}>{item.language.toUpperCase()}</Link>
      : <button key={item.language} disabled aria-label={item.language === 'en' ? 'English — translation unavailable' : '한국어 — 경로 없음'}
          title={item.status === 'unavailable' ? 'English translation unavailable' : 'Unknown route'}>{item.language.toUpperCase()}<span aria-hidden="true"> —</span></button>)}
  </div>

  return <>
    <a className="skip-link" href={`#${mainId}`}>{ko ? '본문으로 이동' : 'Skip to content'}</a>
    <header className="editorial-navigation">
      <Link className="nav-signature" to={routeHref(model.home)} aria-label={ko ? '조윤경 홈' : 'Cho Youn Kyoung home'} lang="en">CHO YOUN KYOUNG</Link>
      <button className="menu-toggle menu-trigger" aria-label="MENU" aria-haspopup="dialog" aria-expanded={phase !== 'closed'}
        aria-controls="navigation-menu" onClick={() => reveal.current?.open()}>{triggerGraphic}</button>
    </header>
    <dialog className="navigation-menu" id="navigation-menu" ref={dialog} aria-labelledby="menu-title" data-phase={phase}
      onKeyDown={event => {
        // Consume repeated Escape before the browser's CloseWatcher can force an abrupt second close.
        if (event.key === 'Escape') { event.preventDefault(); event.stopPropagation(); reveal.current?.close(); return }
        if (event.key !== 'Tab') return
        const controls = [...event.currentTarget.querySelectorAll<HTMLElement>('a[href], button:not(:disabled)')]
          .filter(element => !element.closest('[inert]') && element.getClientRects().length > 0)
        const first = controls[0], last = controls.at(-1)
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus() }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus() }
      }}
      onClose={() => { if (dialog.current?.open === false) reveal.current?.closeImmediately() }}
      onCancel={event => { event.preventDefault(); reveal.current?.close() }}>
      <div className="menu-surface" aria-hidden="true" />
      <div className="menu-top">
        <span className="nav-signature" lang="en">CHO YOUN KYOUNG</span>
        <button className="menu-toggle" onClick={() => reveal.current?.toggle()}
          aria-label={phase === 'closing' ? ko ? '메뉴 다시 열기' : 'Reopen menu' : ko ? '메뉴 닫기' : 'Close menu'}>{triggerGraphic}</button>
      </div>
      <div className="menu-content" inert={phase !== 'open'}>
        <div className="menu-intro"><div className="menu-index-mask"><h2 id="menu-title" className="type-micro" lang="en">INDEX</h2></div><span className="menu-entry-rule" aria-hidden="true" /></div>
        <nav aria-label={ko ? '주요 메뉴' : 'Primary navigation'}>
          <ul className="menu-links">
            {model.links.map((link, index) => <li key={link.key}>
              <Link to={routeHref(link.to)} lang="en" aria-label={link.label}
                aria-current={link.current ? link.exact ? 'page' : 'location' : undefined}>
                <span className="menu-item-mask"><span className="menu-item-reveal">
                  <span className="nav-index numerals" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                  <span className="menu-item-label" aria-hidden="true">{Array.from(link.label, (letter, position) =>
                    <span className="menu-letter" key={position} style={{ '--letter-order': position } as CSSProperties}>{letter}</span>)}</span>
                </span></span>
                <span className="menu-row-rule" aria-hidden="true" />
              </Link>
            </li>)}
          </ul>
        </nav>
        <div className="menu-bottom"><p className="type-micro" lang="en">CHO YOUN KYOUNG</p>{languageLinks}</div>
        <ModeSwitch mode="immersive" path={location.pathname} placement="menu"/>
        {model.languages.some(item => item.status === 'unavailable') && <p className="type-metadata">English translation unavailable.</p>}
      </div>
    </dialog>
  </>
}
