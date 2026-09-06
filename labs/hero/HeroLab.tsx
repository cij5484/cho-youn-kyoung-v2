import { useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router'
import { EditorialNavigation } from '../../src/navigation/EditorialNavigation.tsx'
import { BoldHero } from '../../src/hero/BoldHero.tsx'
import { spikeCatalog } from '../../src/spike/fixtures.ts'
import { languageOfPath, normalizePath } from '../../src/routing/locale-contract.ts'

export function HeroLab() {
  const location = useLocation(), main = useRef<HTMLElement>(null), first = useRef(true)
  const ko = languageOfPath(location.pathname) === 'ko'
  const isHome = ['/', '/en'].includes(normalizePath(location.pathname))
  useEffect(() => {
    document.documentElement.lang = ko ? 'ko' : 'en'
    if (first.current) { first.current = false; return }
    window.scrollTo({ top: 0, behavior: 'instant' }); main.current?.focus({ preventScroll: true })
  }, [location.key, ko])
  return <div className="hero-shell hero-lab" data-prototype="P2D_HERO_LAB_ONLY">
    <EditorialNavigation catalog={spikeCatalog} mainId="hero-main" />
    <main id="hero-main" ref={main} tabIndex={-1}>
      {isHome ? <BoldHero key={location.key} continuationId="hero-boundary" /> : <section className="lab-destination page-frame flow">
        <p className="type-micro">P2D / navigation destination fixture</p><h1>{location.pathname}</h1>
        <p>This neutral fixture checks routing and focus. No destination page is implemented here.</p>
        <Link className="text-action" to={ko ? '/' : '/en/'}>Return to the portrait →</Link>
      </section>}
      <section id="hero-boundary" className="hero-review page-frame" aria-labelledby="review-title">
        <p className="type-micro label-caps">P2D / BOLD CROPPED</p>
        <h2 id="review-title">One direction.<br />A closer look.</h2>
        <p className="type-metadata">Selected B refinement. This neutral boundary ends the Hero QA area.</p>
        <p className="type-metadata">Original A/C remain comparison evidence. No runtime composition selector.</p>
      </section>
    </main>
  </div>
}
