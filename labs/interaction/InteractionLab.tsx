import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router'
import { EditorialNavigation } from '../../src/navigation/EditorialNavigation.tsx'
import { spikeCatalog } from '../../src/spike/fixtures.ts'
import { SoundComposition } from '../../src/sound/SoundComposition.tsx'
import { GlyphLabel } from '../../src/interaction-prototype/GlyphLabel.tsx'
import { createInteractionRenderer } from '../../src/interaction-prototype/renderer.ts'
import { spatialContinuation } from '../../src/interaction-prototype/continuation.ts'
import { interactionTuning, type JangguColor } from '../../src/interaction-prototype/tuning.ts'
import { HomeClosing } from '../../src/home/HomeClosing.tsx'
const cascade=(word:string)=><GlyphLabel word={word}/>
export function InteractionLab(){
  const location=useLocation(),host=useRef<HTMLDivElement>(null),renderer=useRef<ReturnType<typeof createInteractionRenderer>|null>(null)
  const query=new URLSearchParams(location.search),a=query.get('all')==='a'
  const comparison=query.has('compare')||query.has('all'),study=query.get('study')==='type'
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
      <HomeClosing key={`closing:${location.pathname}`} locale={locale}/>
      {study&&<section className="type-study page-frame" aria-label="글자 전환 비교">
        <p className="type-micro">글자 전환 연구 · {word}</p>
        <div className="type-study-pair"><div><p>A / 단어 단위 전환</p><button className="listen-trigger" type="button" aria-label={`A ${word}`} onClick={()=>setWord(word==='PLAY'?'PAUSE':word==='PAUSE'?'RESUME':word==='RESUME'?'REPLAY':'PLAY')}><span className="listen-mask" aria-hidden="true"><span>{word}</span><span className="listen-echo">{word}</span></span></button></div>
          <div><p>B / 글자 재조립</p><button className="listen-trigger" type="button" aria-label={`B ${word}`} onClick={()=>setWord(word==='PLAY'?'PAUSE':word==='PAUSE'?'RESUME':word==='RESUME'?'REPLAY':'PLAY')}><GlyphLabel word={word}/></button></div></div>
        <div className="type-state-controls">{['PLAY','PAUSE','RESUME','REPLAY'].map(w=><button key={w} type="button" onClick={()=>setWord(w)}>{w}</button>)}</div>
        <p className="type-micro">개발용 비교 · 최종 선택 대기</p>
        <p>두 점 · 장구 · 글자 재조립 비교. 실제 장구 분리 음원이 아닌 혼합 음원의 보수적 타격 추정입니다.</p>
      </section>}
      </> : <section className="lab-destination page-frame"><p>P2K / route fixture</p><h1>{location.pathname}</h1><Link to={locale==='ko'?'/':'/en'}>Return to interaction study →</Link></section>}
    </main>
    {isHome&&comparison&&<details className="sound-comparison p2k-comparison"><summary>기존 상호작용 · 비교 설정</summary>
      <fieldset><legend>홈의 두 점</legend><label><input type="radio" name="points" checked={!points} onChange={()=>setPoints(false)}/>A · 고정된 두 선</label><label><input type="radio" name="points" checked={points} onChange={()=>setPoints(true)}/>B · 공간을 흐르는 두 점</label></fieldset>
      <fieldset><legend>소리의 응답</legend><label><input type="radio" name="janggu" checked={!janggu} onChange={()=>setJanggu(false)}/>A · 해금만</label><label><input type="radio" name="janggu" checked={janggu} onChange={()=>setJanggu(true)}/>B · 해금과 장구</label></fieldset>
      <div className="trail-choice"><label htmlFor="janggu-color">장구 색상</label><select id="janggu-color" value={color} onChange={e=>setColor(e.target.value as JangguColor)}>{Object.entries(interactionTuning.janggu.colors).map(([name,value])=><option key={name} value={name}>{{lacquer:'옻빛 붉은색',burnt:'구운 주홍색',rust:'짙은 적갈색'}[name]} · {value}</option>)}</select></div>
      <fieldset><legend>재생 버튼 글자</legend><label><input type="radio" name="type" checked={!type} onChange={()=>setType(false)}/>A · 단어 단위 전환</label><label><input type="radio" name="type" checked={type} onChange={()=>setType(true)}/>B · 글자 재조립</label></fieldset>
      <p>재생 위치 유지 · 개발용 비교</p>
    </details>}
  </div>
}
