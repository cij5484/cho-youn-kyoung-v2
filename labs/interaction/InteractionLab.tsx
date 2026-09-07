import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router'
import { EditorialNavigation } from '../../src/navigation/EditorialNavigation.tsx'
import { spikeCatalog } from '../../src/spike/fixtures.ts'
import { SoundComposition } from '../../src/sound/SoundComposition.tsx'
import { GlyphLabel } from '../../src/interaction-prototype/GlyphLabel.tsx'
import { createInteractionRenderer } from '../../src/interaction-prototype/renderer.ts'
import { spatialContinuation } from '../../src/interaction-prototype/continuation.ts'
import { interactionTuning, type JangguColor } from '../../src/interaction-prototype/tuning.ts'
const cascade=(word:string)=><GlyphLabel word={word}/>
export function InteractionLab(){
  const location=useLocation(),host=useRef<HTMLDivElement>(null),renderer=useRef<ReturnType<typeof createInteractionRenderer>|null>(null)
  const query=new URLSearchParams(location.search),a=query.get('all')==='a'
  const [points,setPoints]=useState(!a&&query.get('points')!=='a'),[janggu,setJanggu]=useState(!a&&query.get('janggu')!=='a'),[type,setType]=useState(!a&&query.get('type')!=='a')
  const [color,setColor]=useState<JangguColor>(()=>{const c=query.get('color');return c&&c in interactionTuning.janggu.colors?c as JangguColor:'lacquer'})
  const [word,setWord]=useState('PLAY')
  const locale=location.pathname.startsWith('/en')?'en':'ko'
  const isHome=['/','/en','/en/'].includes(location.pathname)
  useEffect(()=>{document.documentElement.lang=locale;window.scrollTo({top:0,behavior:'instant'})},[locale])
  useEffect(()=>{if(!isHome)return;renderer.current=createInteractionRenderer(host.current!,{points:false,janggu:false,color:'lacquer'});return()=>{renderer.current?.destroy();renderer.current=null}},[location.pathname,isHome])
  useEffect(()=>{renderer.current?.configure({points,janggu,color})},[points,janggu,color,location.pathname])
  return <div ref={host} className="hero-shell hero-lab interaction-lab" data-prototype="P2K_INTERACTION_LAB_ONLY">
    <EditorialNavigation catalog={spikeCatalog} mainId="interaction-main"/>
    <main id="interaction-main" tabIndex={-1}>
      {isHome ? <>
      <SoundComposition key={location.pathname} locale={locale} visual="bow-contact" trail="long" activity="bold" violet="electric" preset="HOME_SIGNATURE" renderActionLabel={type?cascade:undefined} continuation={points?spatialContinuation:undefined} analysisFallback={janggu?(locale==='ko'?'해금은 정적 표시 · 장구는 사전 타격 추정값으로 표시합니다.':'Static Haegeum · Janggu uses precomputed percussion candidates.'):undefined}/>
      <section className="type-study page-frame" aria-label="Typography comparison">
        <p className="type-micro">P2K / TYPOGRAPHY STUDY · {word}</p>
        <div className="type-study-pair"><div><p>A / WHOLE WORD</p><button className="listen-trigger" type="button" aria-label={`A ${word}`} onClick={()=>setWord(word==='PLAY'?'PAUSE':word==='PAUSE'?'RESUME':word==='RESUME'?'REPLAY':'PLAY')}><span className="listen-mask" aria-hidden="true"><span>{word}</span><span className="listen-echo">{word}</span></span></button></div>
          <div><p>B / SHARED GLYPHS</p><button className="listen-trigger" type="button" aria-label={`B ${word}`} onClick={()=>setWord(word==='PLAY'?'PAUSE':word==='PAUSE'?'RESUME':word==='RESUME'?'REPLAY':'PLAY')}><GlyphLabel word={word}/></button></div></div>
        <div className="type-state-controls">{['PLAY','PAUSE','RESUME','REPLAY'].map(w=><button key={w} type="button" onClick={()=>setWord(w)}>{w}</button>)}</div>
        <p className="type-micro">REVIEW READY CANDIDATES · FINAL VISUAL SELECTION PENDING</p>
        <p>두 점 · 장구 · 글자 재조립 비교. 실제 장구 분리 음원이 아닌 혼합 음원의 보수적 타격 추정입니다.</p>
        <p>Full Haegeum: AI editorial reference. Real photographs remain provisional. No next scene.</p>
      </section>
      </> : <section className="lab-destination page-frame"><p>P2K / route fixture</p><h1>{location.pathname}</h1><Link to={locale==='ko'?'/':'/en'}>Return to interaction study →</Link></section>}
    </main>
    <details className="sound-comparison p2k-comparison"><summary>P2K · A/B CONTROLS</summary>
      <fieldset><legend>HOME motif</legend><label><input type="radio" name="points" checked={!points} onChange={()=>setPoints(false)}/>A · Fixed lines</label><label><input type="radio" name="points" checked={points} onChange={()=>setPoints(true)}/>B · Two spatial points</label></fieldset>
      <fieldset><legend>SOUND counterpoint</legend><label><input type="radio" name="janggu" checked={!janggu} onChange={()=>setJanggu(false)}/>A · Haegeum only</label><label><input type="radio" name="janggu" checked={janggu} onChange={()=>setJanggu(true)}/>B · Haegeum + Janggu</label></fieldset>
      <div className="trail-choice"><label htmlFor="janggu-color">Pigment</label><select id="janggu-color" value={color} onChange={e=>setColor(e.target.value as JangguColor)}>{Object.entries(interactionTuning.janggu.colors).map(([name,value])=><option key={name} value={name}>{name} · {value}</option>)}</select></div>
      <fieldset><legend>Audio action type</legend><label><input type="radio" name="type" checked={!type} onChange={()=>setType(false)}/>A · Whole word</label><label><input type="radio" name="type" checked={type} onChange={()=>setType(true)}/>B · Shared glyphs</label></fieldset>
      <p>Same media position · development only</p>
    </details>
  </div>
}
