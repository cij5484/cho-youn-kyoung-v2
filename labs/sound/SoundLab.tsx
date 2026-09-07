import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router'
import { EditorialNavigation } from '../../src/navigation/EditorialNavigation.tsx'
import { SoundComposition } from '../../src/sound/SoundComposition.tsx'
import { SoundExperience } from '../../src/sound/SoundExperience.tsx'
import { spikeCatalog } from '../../src/spike/fixtures.ts'
import { languageOfPath, normalizePath } from '../../src/routing/locale-contract.ts'
import type { BowPresetName } from '../../src/sound/tuning-presets.ts'
import { contactTuning, type ContactActivity, type ContactTrail, type ContactViolet, type SoundVisual } from '../../src/sound/contact-motion.ts'

export function SoundLab() {
  const location=useLocation(),main=useRef<HTMLElement>(null),first=useRef(true)
  const comparison = new URLSearchParams(location.search).has('compare')
  const [visual,setVisual]=useState<SoundVisual>(()=>new URLSearchParams(window.location.search).get('compare')==='a' ? 'line-only' : 'bow-contact')
  const [preset,setPreset]=useState<BowPresetName>(()=>new URLSearchParams(window.location.search).get('response')==='b2' ? 'B2_REFERENCE' : 'HOME_SIGNATURE')
  const [trail,setTrail]=useState<ContactTrail>(()=>{const value=new URLSearchParams(window.location.search).get('tail');return value && value in contactTuning.trail ? value as ContactTrail : 'long'})
  const [activity,setActivity]=useState<ContactActivity>(()=>new URLSearchParams(window.location.search).get('activity')==='medium' ? 'medium' : 'bold')
  const [violet,setViolet]=useState<ContactViolet>(()=>{const value=new URLSearchParams(window.location.search).get('violet');return value && value in contactTuning.colors ? value as ContactViolet : 'electric'})
  const locale=languageOfPath(location.pathname),isHome=['/','/en'].includes(normalizePath(location.pathname))
  useEffect(()=>{
    document.documentElement.lang=locale
    if(first.current){first.current=false;return}
    window.scrollTo({top:0,behavior:'instant'});main.current?.focus({preventScroll:true})
  },[location.pathname,locale])
  return <div className="hero-shell hero-lab" data-prototype="P2I_SOUND_COMPARISON_LAB_ONLY">
    <EditorialNavigation catalog={spikeCatalog} mainId="sound-main" />
    <main id="sound-main" ref={main} tabIndex={-1}>
      {isHome ? <>
        <>{comparison ? <SoundComposition key={location.pathname} locale={locale} visual={visual} trail={trail} activity={activity} violet={violet} preset={preset} /> : <SoundExperience key={location.pathname} locale={locale} />}</>
        {comparison && <details className="sound-comparison">
          <summary>P2I · {visual==='line-only' ? 'A / LINE' : activity==='bold' ? 'B2 / BOLD' : 'B1 / MEDIUM'}</summary>
          <fieldset><legend>SOUND 비교 / Comparison</legend>
            <label><input type="radio" name="sound-visual" value="line-only" checked={visual==='line-only'} onChange={()=>setVisual('line-only')} />A · Line only</label>
            <label><input type="radio" name="sound-visual" value="bow-contact" checked={visual==='bow-contact'} onChange={()=>setVisual('bow-contact')} />B · Bow contact</label>
          </fieldset>
          <div className="trail-choice"><label htmlFor="contact-preset">Response</label><select id="contact-preset" value={preset} onChange={event=>setPreset(event.target.value as BowPresetName)}><option value="B2_REFERENCE">B2 · Frozen reference</option><option value="HOME_SIGNATURE">P2J · HOME signature</option></select></div>
          <div className="trail-choice"><label htmlFor="contact-activity">Activity</label><select id="contact-activity" value={activity} disabled={visual==='line-only'} onChange={event=>setActivity(event.target.value as ContactActivity)}><option value="medium">B1 · Medium</option><option value="bold">B2 · Bold</option></select></div>
          <div className="trail-choice"><label htmlFor="contact-trail">Tail</label><select id="contact-trail" value={trail} disabled={visual==='line-only'} onChange={event=>setTrail(event.target.value as ContactTrail)}><option value="short">Short · 140ms</option><option value="medium">Medium · 280ms</option><option value="long">Long · 460ms / primary</option><option value="extra-long">Extra long · 720ms / experiment</option></select></div>
          <div className="trail-choice"><label htmlFor="contact-violet">Violet</label><select id="contact-violet" value={violet} disabled={visual==='line-only'} onChange={event=>setViolet(event.target.value as ContactViolet)}><option value="editorial">Editorial · #6038C8</option><option value="electric">Electric · #6334E5</option><option value="ink">Ink · #492580</option></select></div>
          <p>Lab only · 같은 재생 위치에서 비교합니다.</p>
        </details>}
      </> : <section className="lab-destination page-frame flow"><p className="type-micro">P2G / navigation fixture</p><h1>{location.pathname}</h1><Link to={locale==='ko' ? '/' : '/en/'}>Return to HOME study →</Link></section>}
      <footer id="sound-end" className="sound-review page-frame">
        <p className="type-micro">P2J / RESPONSE REVIEW BOUNDARY</p>
        <p>Hero → Haegeum: QUALITY APPROVED / FROZEN. SOUND: B2 / LONG 460ms / Electric Violet — QUALITY APPROVED / FROZEN.</p>
        <p>HOME_SIGNATURE response: higher sensitivity under review. Frozen B2 response remains a Lab reference.</p>
        <p>한범수류 중중모리 02:46–03:04 · 18s. Retained excerpt; native-device QA remains documented separately.</p>
        <p>Full Haegeum remains a disclosed AI editorial reference. No following HOME scene is implemented.</p>
      </footer>
    </main>
  </div>
}
