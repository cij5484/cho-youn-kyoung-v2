import { useEffect, useRef } from 'react'
import { clamp, smooth } from './closing-orbit.ts'
const envelope=(p:number)=>smooth(p/.13)*(1-smooth((p-.76)/.24))

/** Brief material transfers, measured from the actual outgoing/incoming objects. No perpetual loop. */
export function SceneAfterimages() {
  const ref=useRef<HTMLDivElement>(null)
  useEffect(()=>{
    const root=ref.current!, home=root.closest<HTMLElement>('.home-closing')!
    const album=home.querySelector<HTMLElement>('.album-object-scene')!
    const sequence=home.querySelector<HTMLElement>('.stage-artist-sequence')!
    const light=root.querySelector<HTMLElement>('.album-stage-afterimage')!
    const reduced=matchMedia('(prefers-reduced-motion: reduce)')
    let frame=0,disposed=false
    function paint(){
      frame=0;if(disposed)return
      const hidden=reduced.matches||document.hidden||!!document.querySelector('dialog[open]')
      if(hidden){root.dataset.afterimage='suspended';light.style.opacity='0';return}
      const vh=innerHeight, stageBox=sequence.getBoundingClientRect()
      const lightP=clamp((vh*.85-stageBox.top)/(vh*.75))
      const lightAlpha=envelope(lightP)
      light.style.opacity=String(lightAlpha*.4)
      root.dataset.afterimage=lightAlpha>0?'album-light':'quiet'
      if(lightAlpha>0){
        light.style.setProperty('--memory-rgb',album.style.getPropertyValue('--album-memory-rgb')||'163 148 125')
        light.style.setProperty('--memory-x',album.style.getPropertyValue('--album-memory-x')||'0')
        light.style.setProperty('--memory-y',album.style.getPropertyValue('--album-memory-y')||'0')
        light.style.top=`${Math.max(0,stageBox.top).toFixed(2)}px`;light.style.setProperty('--transfer',String(lightP))
      }
    }
    function request(){if(!disposed&&!frame)frame=requestAnimationFrame(paint)}
    const size=new ResizeObserver(request);size.observe(home)
    const change=new MutationObserver(request),dialog=document.querySelector('dialog')
    if(dialog)change.observe(dialog,{attributes:true,attributeFilter:['open']})
    change.observe(sequence,{attributes:true,attributeFilter:['data-sequence-progress']})
    window.addEventListener('scroll',request,{passive:true});window.addEventListener('resize',request)
    reduced.addEventListener('change',request);document.addEventListener('visibilitychange',request);request()
    return()=>{disposed=true;cancelAnimationFrame(frame);size.disconnect();change.disconnect();window.removeEventListener('scroll',request);window.removeEventListener('resize',request);reduced.removeEventListener('change',request);document.removeEventListener('visibilitychange',request)}
  },[])
  return <div ref={ref} className="scene-afterimages" aria-hidden="true">
    <div className="album-stage-afterimage"/>
  </div>
}
