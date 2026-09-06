import { useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router'
import { EditorialNavigation } from '../../src/navigation/EditorialNavigation.tsx'
import { instrumentAssets } from '../../src/haegeum/assets.ts'
import { HaegeumExperience } from '../../src/haegeum/HaegeumExperience.tsx'
import { spikeCatalog } from '../../src/spike/fixtures.ts'
import { languageOfPath, normalizePath } from '../../src/routing/locale-contract.ts'

export function HaegeumLab() {
  const location = useLocation(), main = useRef<HTMLElement>(null), first = useRef(true)
  const ko = languageOfPath(location.pathname) === 'ko'
  const isHome = ['/', '/en'].includes(normalizePath(location.pathname))
  useEffect(() => {
    document.documentElement.lang = ko ? 'ko' : 'en'
    if (first.current) { first.current = false; return }
    window.scrollTo({ top: 0, behavior: 'instant' }); main.current?.focus({ preventScroll: true })
  }, [location.pathname, ko])
  return <div className="hero-shell hero-lab" data-prototype="P2E_HAEGEUM_LAB_ONLY">
    <EditorialNavigation catalog={spikeCatalog} mainId="hero-main" />
    <main id="hero-main" ref={main} tabIndex={-1}>
      {isHome ? <HaegeumExperience key={location.pathname} /> : <section className="lab-destination page-frame flow">
        <p className="type-micro">P2F / navigation destination fixture</p><h1>{location.pathname}</h1>
        <p>This neutral fixture checks routing and focus. No destination page is implemented here.</p>
        <Link className="text-action" to={ko ? '/' : '/en/'}>Return to the portrait →</Link>
      </section>}
      <section id="haegeum-end" tabIndex={-1} className="hero-review page-frame" aria-labelledby="review-title">
        <p className="type-micro label-caps">P2F / PROTOTYPE BOUNDARY</p>
        <h2 id="review-title">A world<br />between.</h2>
        <p className="type-metadata">Hero → HEAD / PEG → STRINGS / BOW → RESONANCE → FULL HAEGEUM. This boundary ends the prototype.</p>
        <p className="type-metadata">{instrumentAssets.full.provenance === 'ai-editorial' ? 'Final instrument is a user-supplied AI visual study, not a documentary photograph.' : 'Final instrument uses the reviewed photographic source.'} Authentic macro source quality remains a separate asset gate.</p>
      </section>
    </main>
  </div>
}
