import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router'
import { EditorialNavigation } from '../../src/navigation/EditorialNavigation.tsx'
import { siteCatalog, siteRoutes } from '../../src/routing/site-catalog.ts'
import { WorksPage } from '../../src/works/WorksPage.tsx'
import { HomeExperience } from '../../src/home/experience/HomeExperience.tsx'
import { SoundComposition } from '../../src/sound/SoundComposition.tsx'
import { GlyphLabel } from '../../src/interaction-prototype/GlyphLabel.tsx'
import { createInteractionRenderer } from '../../src/interaction-prototype/renderer.ts'
import { spatialContinuation } from '../../src/interaction-prototype/continuation.ts'
import { useComparisonSettings } from '../../src/experience-prototype/use-comparison-settings.ts'
import { DevelopmentTools } from '../../src/experience-prototype/DevelopmentTools.tsx'
import { HomeClosing } from '../../src/home/HomeClosing.tsx'
const cascade=(word:string)=><GlyphLabel word={word}/>
export function InteractionLab(){
  const location=useLocation(),host=useRef<HTMLDivElement>(null),renderer=useRef<ReturnType<typeof createInteractionRenderer>|null>(null)
  const settings=useComparisonSettings(location.search,import.meta.env.DEV)
  const {points,janggu,type,color,study}=settings
  const [element,setElement]=useState<HTMLDivElement|null>(null)
  const attach=useCallback((node:HTMLDivElement|null)=>{host.current=node;setElement(node)},[])
  const [word,setWord]=useState('PLAY')
  const locale=location.pathname.startsWith('/en')?'en':'ko'
  const isHome=['/','/en','/en/'].includes(location.pathname)
  useEffect(()=>{document.documentElement.lang=locale;window.scrollTo({top:0,behavior:'instant'})},[locale])
  useEffect(()=>{if(!isHome)return;renderer.current=createInteractionRenderer(host.current!,{points:false,janggu:false,color:'lacquer'});return()=>{renderer.current?.destroy();renderer.current=null}},[location.pathname,isHome])
  useEffect(()=>{renderer.current?.configure({points,janggu,color})},[points,janggu,color,location.pathname])
  return <div ref={attach} className="hero-shell hero-lab interaction-lab" data-prototype="P2K_INTERACTION_LAB_ONLY">
    <EditorialNavigation catalog={siteCatalog} mainId="interaction-main"/>
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
      </> : location.pathname.replace(/\/$/, '') === '/works' ? <WorksPage locale="ko"/> : <section className="lab-destination page-frame"><p>P2K / route fixture</p><h1>{siteRoutes.some(route=>route.path===location.pathname.replace(/\/$/,'')) ? location.pathname : '404'}</h1><Link to={locale==='ko'?'/':'/en'}>Return to interaction study →</Link></section>}
    </main>
    {isHome&&<HomeExperience host={element} locale={locale} options={settings}/>}
    {isHome&&<DevelopmentTools host={element} settings={settings} locale={locale}/>}
  </div>
}
