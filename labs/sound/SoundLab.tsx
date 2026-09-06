import { useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router'
import { EditorialNavigation } from '../../src/navigation/EditorialNavigation.tsx'
import { SoundExperience } from '../../src/sound/SoundExperience.tsx'
import { spikeCatalog } from '../../src/spike/fixtures.ts'
import { languageOfPath, normalizePath } from '../../src/routing/locale-contract.ts'

export function SoundLab() {
  const location=useLocation(),main=useRef<HTMLElement>(null),first=useRef(true)
  const locale=languageOfPath(location.pathname),isHome=['/','/en'].includes(normalizePath(location.pathname))
  useEffect(()=>{
    document.documentElement.lang=locale
    if(first.current){first.current=false;return}
    window.scrollTo({top:0,behavior:'instant'});main.current?.focus({preventScroll:true})
  },[location.pathname,locale])
  return <div className="hero-shell hero-lab" data-prototype="P2G_SOUND_LAB_ONLY">
    <EditorialNavigation catalog={spikeCatalog} mainId="sound-main" />
    <main id="sound-main" ref={main} tabIndex={-1}>
      {isHome ? <SoundExperience key={location.pathname} locale={locale} /> : <section className="lab-destination page-frame flow"><p className="type-micro">P2G / navigation fixture</p><h1>{location.pathname}</h1><Link to={locale==='ko' ? '/' : '/en/'}>Return to HOME study →</Link></section>}
      <footer id="sound-end" className="sound-review page-frame">
        <p className="type-micro">P2G / REVIEW BOUNDARY</p>
        <p>Hero → Haegeum: QUALITY APPROVED / FROZEN. SOUND: review candidate.</p>
        <p>한범수류 중중모리 02:46–03:04 · 18s. Candidate excerpt; final listening review pending.</p>
        <p>Full Haegeum remains a disclosed AI editorial reference. No following HOME scene is implemented.</p>
      </footer>
    </main>
  </div>
}
