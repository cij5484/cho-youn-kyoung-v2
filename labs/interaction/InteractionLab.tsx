import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router'
import { EditorialNavigation } from '../../src/navigation/EditorialNavigation.tsx'
import { immersiveNavigationCatalog, siteRoutes } from '../../src/routing/site-catalog.ts'
import { normalizePath, resolveLanguageSwitch } from '../../src/routing/locale-contract.ts'
import { WorksExperience } from '../../src/works/WorksExperience.tsx'
import { HomeExperience } from '../../src/home/experience/HomeExperience.tsx'
import { SoundComposition } from '../../src/sound/SoundComposition.tsx'
import { GlyphLabel } from '../../src/interaction-prototype/GlyphLabel.tsx'
import { createInteractionRenderer } from '../../src/interaction-prototype/renderer.ts'
import { spatialContinuation } from '../../src/interaction-prototype/continuation.ts'
import { useComparisonSettings } from '../../src/experience-prototype/use-comparison-settings.ts'
import { HomeClosing } from '../../src/home/HomeClosing.tsx'
import { usePathnameScroll } from '../../src/routing/use-pathname-scroll.ts'
import { AlbumRouteTransition } from '../../src/album-detail/AlbumRouteTransition.tsx'
import { localAlbumStudy } from '../../src/album-detail/album-navigation.ts'
import { isPerformanceStudyRoute } from '../../src/performance-detail/performance-navigation.ts'
import { GlobalAudioPlayer } from '../../src/audio/GlobalAudioPlayer.tsx'
import { AlbumSignaturePair } from '../../src/album-detail/AlbumSignaturePair.tsx'
const AlbumDetail = lazy(() => import('../../src/album-detail/AlbumDetail.tsx'))
const MediaPrototype = lazy(() => import('../../src/media/MediaPrototype.tsx'))
const AboutPrototype = lazy(() => import('../../src/about/AboutPrototype.tsx'))
const ContactPrototype = lazy(() => import('../../src/contact/ContactPrototype.tsx'))
const PerformanceDetail = lazy(() => import('../../src/performance-detail/PerformanceDetail.tsx'))
const DevelopmentTools = import.meta.env.DEV ? lazy(() => import('../../src/experience-prototype/DevelopmentTools.tsx').then(module => ({ default: module.DevelopmentTools }))) : null
const GlobalPageTransition = import.meta.env.DEV || import.meta.env.MODE === 'development-preview' ? lazy(() => import('../../src/navigation/GlobalPageTransition.tsx').then(module => ({ default: module.GlobalPageTransition }))) : null
const cascade=(word:string)=><GlyphLabel word={word}/>
export function InteractionLab(){
  usePathnameScroll()
  const location=useLocation(),host=useRef<HTMLDivElement>(null),renderer=useRef<ReturnType<typeof createInteractionRenderer>|null>(null)
  const settings=useComparisonSettings(location.search,import.meta.env.DEV)
  const {points,janggu,type,color,study}=settings
  const [element,setElement]=useState<HTMLDivElement|null>(null)
  const attach=useCallback((node:HTMLDivElement|null)=>{host.current=node;setElement(node)},[])
  const [word,setWord]=useState('PLAY')
  const locale=location.pathname.startsWith('/en')?'en':'ko'
  const koreanPath = normalizePath(location.pathname).replace(/^\/en(?=\/|$)/, '') || '/'
  const untranslated = locale === 'en' && resolveLanguageSwitch(koreanPath, 'en', immersiveNavigationCatalog).status === 'unavailable'
  const isHome=['/','/en','/en/'].includes(location.pathname)
  const quietSignature = ['/media', '/about', '/contact'].includes(normalizePath(location.pathname))
  const albumSlug = localAlbumStudy() ? location.pathname.match(/^\/album\/([^/]+)\/?$/)?.[1] : undefined
  useEffect(()=>{document.documentElement.lang=locale},[locale])
  useEffect(()=>{if(!isHome)return;renderer.current=createInteractionRenderer(host.current!,{points:false,janggu:false,color:'lacquer'});return()=>{renderer.current?.destroy();renderer.current=null}},[location.pathname,isHome])
  useEffect(()=>{renderer.current?.configure({points,janggu,color})},[points,janggu,color,location.pathname])
  return <div ref={attach} className="hero-shell hero-lab interaction-lab" data-prototype="P2K_INTERACTION_LAB_ONLY">
    <EditorialNavigation catalog={immersiveNavigationCatalog} mainId="interaction-main"/>
    {GlobalPageTransition && <Suspense fallback={null}><GlobalPageTransition/></Suspense>}
    <AlbumRouteTransition/>
    {localAlbumStudy() && <GlobalAudioPlayer/>}
    {quietSignature && <AlbumSignaturePair scope={host} quiet/>}
    <main id="interaction-main" tabIndex={-1}>
      {untranslated ? <section className="lab-destination page-frame"><h1>English translation unavailable.</h1><Link to={koreanPath} lang="ko">한국어 페이지 보기 →</Link></section> : isHome ? <>
      <SoundComposition key={location.pathname} locale={locale} visual="bow-contact" trail="long" activity="bold" violet="electric" preset="HOME_SIGNATURE" renderActionLabel={type?cascade:undefined} continuation={points?spatialContinuation:undefined} analysisFallback={janggu?(locale==='ko'?'해금은 정적 표시 · 장구는 사전 타격 추정값으로 표시합니다.':'Static Haegeum · Janggu uses precomputed percussion candidates.'):undefined}/>
      <HomeClosing key={`closing:${location.pathname}`} locale={locale}/>
      {import.meta.env.DEV&&study&&<section className="type-study page-frame" aria-label="글자 전환 비교">
        <p className="type-micro">글자 전환 연구 · {word}</p>
        <div className="type-study-pair"><div><p>A / 단어 단위 전환</p><button className="listen-trigger" type="button" aria-label={`A ${word}`} onClick={()=>setWord(word==='PLAY'?'PAUSE':word==='PAUSE'?'RESUME':word==='RESUME'?'REPLAY':'PLAY')}><span className="listen-mask" aria-hidden="true"><span>{word}</span><span className="listen-echo">{word}</span></span></button></div>
          <div><p>B / 글자 재조립</p><button className="listen-trigger" type="button" aria-label={`B ${word}`} onClick={()=>setWord(word==='PLAY'?'PAUSE':word==='PAUSE'?'RESUME':word==='RESUME'?'REPLAY':'PLAY')}><GlyphLabel word={word}/></button></div></div>
        <div className="type-state-controls">{['PLAY','PAUSE','RESUME','REPLAY'].map(w=><button key={w} type="button" onClick={()=>setWord(w)}>{w}</button>)}</div>
        <p className="type-micro">개발용 비교 · 최종 선택 대기</p>
        <p>두 점 · 장구 · 글자 재조립 비교. 실제 장구 분리 음원이 아닌 혼합 음원의 보수적 타격 추정입니다.</p>
      </section>}
      </> : location.pathname.replace(/\/$/, '') === '/works' ? <WorksExperience locale="ko"/> : location.pathname.replace(/\/$/, '') === '/media' ? <Suspense fallback={<section className="lab-destination page-frame" aria-busy="true">영상을 준비하고 있습니다.</section>}><MediaPrototype/></Suspense> : location.pathname.replace(/\/$/, '') === '/about' ? <Suspense fallback={<section className="lab-destination page-frame" aria-busy="true">프로필을 준비하고 있습니다.</section>}><AboutPrototype/></Suspense> : location.pathname.replace(/\/$/, '') === '/contact' ? <Suspense fallback={<section className="lab-destination page-frame" aria-busy="true">연락처를 준비하고 있습니다.</section>}><ContactPrototype/></Suspense> : isPerformanceStudyRoute(location.pathname) ? <Suspense fallback={<section className="lab-destination page-frame" aria-busy="true">공연 기록을 준비하고 있습니다.</section>}><PerformanceDetail/></Suspense> : albumSlug ? <Suspense fallback={<section className="lab-destination page-frame" aria-busy="true">앨범을 준비하고 있습니다.</section>}><AlbumDetail key={albumSlug} slug={albumSlug}/></Suspense> : <section className="lab-destination page-frame"><p>P2K / route fixture</p><h1>{siteRoutes.some(route=>route.path===location.pathname.replace(/\/$/,'')) ? location.pathname : '404'}</h1><Link to={locale==='ko'?'/':'/en'}>Return to interaction study →</Link></section>}
    </main>
    {isHome&&<HomeExperience host={element} locale={locale} options={settings}/>}
    {isHome&&DevelopmentTools&&<Suspense fallback={null}><DevelopmentTools host={element} settings={settings} locale={locale}/></Suspense>}
  </div>
}
