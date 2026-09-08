import {Component,Suspense,lazy,useState,type ReactNode} from 'react'
import {useLocation,useNavigate} from 'react-router'
import {jumpToScene} from '../home/scene-destinations.ts'
import {comparisonSearch,resetComparison,type ComparisonSettings,type ComparisonPatch} from './comparison-settings.ts'
import './development-launcher.css'
const Panel=lazy(()=>import('./DevelopmentComparison.tsx').then(m=>({default:m.DevelopmentComparison})))
const Artist=lazy(()=>import('./ArtistExperience.tsx').then(m=>({default:m.ArtistExperience})))
const Magnet=lazy(()=>import('./SceneMagnet.tsx').then(m=>({default:m.SceneMagnet})))
class ExperimentBoundary extends Component<{children:ReactNode;onReset:()=>void},{failed:boolean}>{
  state={failed:false}
  static getDerivedStateFromError(){return {failed:true}}
  render(){return this.state.failed?<div className="development-error" role="alert">비교 기능을 불러오지 못했습니다. <button type="button" onClick={this.props.onReset}>기본 화면으로 돌아가기</button></div>:this.props.children}
}
export function DevelopmentTools({host,settings,locale}:{host:HTMLElement|null;settings:ComparisonSettings;locale:'ko'|'en'}){
  const location=useLocation(),navigate=useNavigate(),[open,setOpen]=useState(settings.open)
  function update(search:string){void navigate({pathname:location.pathname,search:search?`?${search}`:'',hash:location.hash},{replace:true,preventScrollReset:true})}
  function change(patch:ComparisonPatch){update(comparisonSearch(location.search,{dev:true,...patch}))}
  function close(){setOpen(false);requestAnimationFrame(()=>document.getElementById('development-launcher')?.focus({preventScroll:true}))}
  function reset(){update(resetComparison(location.search))}
  function exit(){update(resetComparison(location.search,true));setOpen(false);document.getElementById('interaction-main')?.focus({preventScroll:true})}
  function launch(){if(!settings.enabled)reset();setOpen(true)}
  function jump(scene:'sound'|'performance'|'artist'){
    if(!host)return
    setOpen(false);document.getElementById('interaction-main')?.focus({preventScroll:true})
    jumpToScene(scene,{host})
  }
  return <>
    {settings.available&&!open&&<button type="button" id="development-launcher" className="development-launcher" aria-expanded="false" aria-controls="development-comparison" onClick={launch}>개발 비교 +</button>}
    {settings.available&&open&&<ExperimentBoundary key="panel" onReset={exit}><Suspense fallback={<p className="development-launcher" role="status">개발 비교 준비 중…</p>}><div onKeyDown={e=>{if(e.key==='Escape'&&!document.querySelector('dialog[open]')){e.stopPropagation();close()}}}><Panel settings={settings} onChange={change} onJump={jump} onReset={reset} onExit={exit} onClose={close}/></div></Suspense></ExperimentBoundary>}
    {host&&settings.portrait!=='off'&&<ExperimentBoundary key="artist" onReset={exit}><Suspense fallback={null}><Artist host={host} mode={settings.portrait} locale={locale}/></Suspense></ExperimentBoundary>}
    {host&&settings.magnet&&<ExperimentBoundary key="magnet" onReset={exit}><Suspense fallback={null}><Magnet host={host}/></Suspense></ExperimentBoundary>}
  </>
}
