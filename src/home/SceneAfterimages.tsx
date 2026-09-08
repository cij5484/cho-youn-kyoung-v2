import { useEffect, useRef } from 'react'
import { clamp, smooth } from './closing-orbit.ts'
import { homeImage, selectedWorks } from './content.ts'

const lastWork=selectedWorks.at(-1)!, image=homeImage(lastWork.image)
const mix=(a:number,b:number,p:number)=>a+(b-a)*p
const envelope=(p:number)=>smooth(p/.13)*(1-smooth((p-.76)/.24))

/** Brief material transfers, measured from the actual outgoing/incoming objects. No perpetual loop. */
export function SceneAfterimages() {
  const ref=useRef<HTMLDivElement>(null)
  useEffect(()=>{
    const root=ref.current!, home=root.closest<HTMLElement>('.home-closing')!
    const works=home.querySelector<HTMLElement>('.works-scene')!, album=home.querySelector<HTMLElement>('.album-object-scene')!
    const sequence=home.querySelector<HTMLElement>('.stage-artist-sequence')!, outro=home.querySelector<HTMLElement>('.outro-name')!
    const plane=root.querySelector<HTMLElement>('.work-plane-memory')!, light=root.querySelector<HTMLElement>('.album-stage-afterimage')!, edge=root.querySelector<HTMLElement>('.artist-edge-memory')!
    const reduced=matchMedia('(prefers-reduced-motion: reduce)')
    let frame=0,disposed=false
    function box(element:HTMLElement,rect:DOMRect,target:DOMRect,p:number){
      for(const [name,value] of Object.entries({left:mix(rect.left,target.left,p),top:mix(rect.top,target.top,p),width:mix(rect.width,target.width,p),height:mix(rect.height,target.height,p)}))element.style.setProperty(name,`${value.toFixed(2)}px`)
    }
    function paint(){
      frame=0;if(disposed)return
      const hidden=reduced.matches||document.hidden||!!document.querySelector('dialog[open]')
      if(hidden){root.dataset.afterimage='suspended';for(const e of [plane,light,edge])e.style.opacity='0';return}
      const vh=innerHeight, worksBox=works.getBoundingClientRect(), stageBox=sequence.getBoundingClientRect()
      const workP=clamp((vh-worksBox.bottom)/(vh*.85)), lightP=clamp((vh*.85-stageBox.top)/(vh*.75)), edgeP=clamp((vh-stageBox.bottom)/(vh*.68))
      const workAlpha=envelope(workP),lightAlpha=envelope(lightP),edgeAlpha=envelope(edgeP)
      plane.style.opacity=String(workAlpha*.58);light.style.opacity=String(lightAlpha*.4);edge.style.opacity=String(edgeAlpha*.6)
      root.dataset.afterimage=workAlpha>0?'work-plane':lightAlpha>0?'album-light':edgeAlpha>0?'artist-edge':'quiet'
      if(workAlpha>0){
        if(!plane.style.backgroundImage)plane.style.backgroundImage=`url("${image.url}")`
        const from=works.querySelector<HTMLElement>('.selected-work:last-child .work-image')!.getBoundingClientRect()
        const to=album.querySelector<HTMLElement>('.album-exchange-slot[data-active="true"] .album-object-pose')!.getBoundingClientRect()
        box(plane,from,to,smooth(workP));plane.style.setProperty('--transfer',String(workP))
      }
      if(lightAlpha>0){
        light.style.setProperty('--memory-rgb',album.style.getPropertyValue('--album-memory-rgb')||'163 148 125')
        light.style.setProperty('--memory-x',album.style.getPropertyValue('--album-memory-x')||'0')
        light.style.setProperty('--memory-y',album.style.getPropertyValue('--album-memory-y')||'0')
        light.style.top=`${Math.max(0,stageBox.top).toFixed(2)}px`;light.style.setProperty('--transfer',String(lightP))
      }
      if(edgeAlpha>0){
        const from=sequence.querySelector<HTMLElement>('.shared-seam')!.getBoundingClientRect(), name=outro.firstElementChild!.getBoundingClientRect()
        const p=smooth(edgeP)
        edge.style.left=`${mix(from.left,name.left+name.width*.84,p).toFixed(2)}px`
        edge.style.top=`${mix(from.top,name.top+name.height*.2,p).toFixed(2)}px`
        edge.style.height=`${mix(from.height,name.height*.25,p).toFixed(2)}px`
        edge.style.transform=`rotate(${(-p*12).toFixed(2)}deg)`
      }
    }
    function request(){if(!disposed&&!frame)frame=requestAnimationFrame(paint)}
    const size=new ResizeObserver(request);size.observe(home)
    const change=new MutationObserver(request),dialog=document.querySelector('dialog')
    if(dialog)change.observe(dialog,{attributes:true,attributeFilter:['open']})
    change.observe(sequence,{attributes:true,attributeFilter:['data-sequence-progress']})
    change.observe(works,{attributes:true,attributeFilter:['data-ribbon-position']})
    window.addEventListener('scroll',request,{passive:true});window.addEventListener('resize',request)
    reduced.addEventListener('change',request);document.addEventListener('visibilitychange',request);request()
    return()=>{disposed=true;cancelAnimationFrame(frame);size.disconnect();change.disconnect();window.removeEventListener('scroll',request);window.removeEventListener('resize',request);reduced.removeEventListener('change',request);document.removeEventListener('visibilitychange',request)}
  },[])
  return <div ref={ref} className="scene-afterimages" aria-hidden="true">
    <div className="work-plane-memory" data-asset-id={lastWork.image.asset.id}/>
    <div className="album-stage-afterimage"/><div className="artist-edge-memory"/>
  </div>
}
