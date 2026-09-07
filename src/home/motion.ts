import type { RefObject } from 'react'
import { useEffect } from 'react'

const clamp=(n:number)=>Math.max(0,Math.min(1,n))
const smooth=(n:number)=>{const p=clamp(n);return p*p*(3-2*p)}

/** One native-scroll coordinator for the closing scenes. No wheel interception or per-frame React state. */
export function useHomeClosingMotion(ref:RefObject<HTMLElement|null>){
  useEffect(()=>{
    const root=ref.current!,reduced=matchMedia('(prefers-reduced-motion: reduce)'),mobile=matchMedia('(max-width: 639px)')
    const scenes=[...root.querySelectorAll<HTMLElement>('[data-home-scene]')],works=root.querySelector<HTMLElement>('.works-board')!
    const items=[...works.querySelectorAll<HTMLElement>('.selected-work')],navigation=document.querySelector<HTMLElement>('.editorial-navigation')
    const stage=root.querySelector<HTMLElement>('.performance-scene')!
    const first=scenes[0],axis=root.querySelector<SVGSVGElement>('.works-axis')!,strands=[...axis.querySelectorAll('path')]
    const sound=document.querySelector<HTMLElement>('.sound-experience'),source=sound?.querySelector<HTMLElement>('.line-one')
    let frame=0,disposed=false
    function layout(){
      const width=works.clientWidth,height=works.clientHeight
      works.style.setProperty('--works-image-limit',`${Math.max(100,height*.49-46)}px`)
      items.forEach((item,i)=>{
        item.style.setProperty('--cluster-x',`${width*.5-item.offsetLeft-item.offsetWidth/2}px`)
        item.style.setProperty('--cluster-y',`${height*.44-item.offsetTop-item.offsetHeight*.45}px`)
        item.style.setProperty('--cluster-angle',`${[-12,8,-5,14,-9][i]}deg`)
      });request()
    }
    function paint(){
      frame=0;if(disposed)return
      const vh=innerHeight,still=reduced.matches
      scenes.forEach(scene=>{
        const rect=scene.getBoundingClientRect(),entry=smooth((vh-rect.top)/(vh*.78))
        const pinned=scene.dataset.pin==='true'&&!mobile.matches
        const progress=still?1:pinned?smooth(-rect.top/Math.max(1,rect.height-vh)):entry
        scene.style.setProperty('--scene-p',progress.toFixed(4));scene.style.setProperty('--scene-entry',still?'1':entry.toFixed(4))
        scene.dataset.inView=String(rect.bottom>0&&rect.top<vh)
      })
      // Inherit the real outgoing string position. One strand becomes the works axis, the other recedes.
      const firstRect=first.getBoundingClientRect(),handoff=clamp((vh-firstRect.top)/vh)
      const active=!still&&sound?.dataset.soundStatic!=='true'&&firstRect.top<vh&&firstRect.bottom>0
      if(active&&source){
        const from=source.getBoundingClientRect(),to=works.getBoundingClientRect(),p=handoff
        const y=from.top+(to.top-20-from.top)*p,x1=from.left+(to.left-from.left)*p,x2=from.right+(to.right-from.right)*p
        const arrival=clamp(p/.12),resolve=smooth(Number(first.style.getPropertyValue('--scene-p'))/.5)
        axis.style.opacity=String(arrival*(1-resolve)*.72)
        strands[0].setAttribute('d',`M${x1.toFixed(2)},${y.toFixed(2)} H${x2.toFixed(2)}`)
        strands[1].setAttribute('d',`M${x1.toFixed(2)},${(y+(mobile.matches?13:19)).toFixed(2)} H${x2.toFixed(2)}`)
        strands[1].style.opacity=String(1-smooth(p))
        sound!.style.setProperty('--home-line-handoff',String(arrival))
      }else{axis.style.opacity='0';sound?.style.setProperty('--home-line-handoff',firstRect.top>=vh?'0':'1')}
      root.dataset.lineHandoff=handoff.toFixed(3)
      const rect=stage.getBoundingClientRect(),navHeight=navigation?.offsetHeight??64
      const dark=smooth((navHeight-rect.top)/Math.max(80,navHeight))*smooth((rect.bottom-navHeight)/Math.max(80,navHeight))
      navigation?.style.setProperty('--home-nav-dark',dark.toFixed(4));navigation?.setAttribute('data-home-dark',String(dark>.5))
      root.dataset.motion=still?'reduced':'ready'
    }
    function request(){if(!frame&&!disposed)frame=requestAnimationFrame(paint)}
    const observer=new ResizeObserver(layout);observer.observe(works)
    window.addEventListener('scroll',request,{passive:true});window.addEventListener('resize',layout);reduced.addEventListener('change',request)
    document.fonts.addEventListener('loadingdone',layout);layout()
    return()=>{disposed=true;if(frame)cancelAnimationFrame(frame);observer.disconnect();window.removeEventListener('scroll',request);window.removeEventListener('resize',layout);reduced.removeEventListener('change',request);document.fonts.removeEventListener('loadingdone',layout);navigation?.style.removeProperty('--home-nav-dark');navigation?.removeAttribute('data-home-dark');sound?.style.removeProperty('--home-line-handoff')}
  },[ref])
}
