import type { RefObject } from 'react'
import { useEffect } from 'react'

const clamp=(n:number)=>Math.max(0,Math.min(1,n))
const smooth=(n:number)=>{const p=clamp(n);return p*p*(3-2*p)}

/** One native-scroll coordinator for the closing scenes. No wheel interception or per-frame React state. */
export function useHomeClosingMotion(ref:RefObject<HTMLElement|null>){
  useEffect(()=>{
    const root=ref.current!,reduced=matchMedia('(prefers-reduced-motion: reduce)'),mobile=matchMedia('(max-width: 639px)')
    const scenes=[...root.querySelectorAll<HTMLElement>('[data-home-scene]')],navigation=document.querySelector<HTMLElement>('.editorial-navigation')
    const stage=root.querySelector<HTMLElement>('.performance-scene')!
    let frame=0,disposed=false
    function paint(){
      frame=0;if(disposed)return
      const vh=innerHeight,still=reduced.matches
      scenes.forEach(scene=>{
        const rect=scene.getBoundingClientRect(),entry=smooth((vh-rect.top)/(vh*.78))
        const pinned=scene.dataset.pin==='true'&&!mobile.matches
        const progress=still?1:pinned?smooth(-rect.top/Math.max(1,rect.height-vh)):entry
        scene.style.setProperty('--scene-p',progress.toFixed(4));scene.style.setProperty('--scene-entry',still?'1':entry.toFixed(4))
        scene.style.setProperty('--scene-exit',still?'0':smooth((vh*.6-rect.bottom)/(vh*.6)).toFixed(4))
        scene.dataset.inView=String(rect.bottom>0&&rect.top<vh)
      })
      const rect=stage.getBoundingClientRect(),navHeight=navigation?.offsetHeight??64
      const dark=smooth((navHeight-rect.top)/Math.max(80,navHeight))*smooth((rect.bottom-navHeight)/Math.max(80,navHeight))
      navigation?.style.setProperty('--home-nav-dark',dark.toFixed(4));navigation?.setAttribute('data-home-dark',String(dark>.5))
      root.dataset.motion=still?'reduced':'ready'
    }
    function request(){if(!frame&&!disposed)frame=requestAnimationFrame(paint)}
    const observer=new ResizeObserver(request);observer.observe(root)
    window.addEventListener('scroll',request,{passive:true});window.addEventListener('resize',request);reduced.addEventListener('change',request)
    document.fonts.addEventListener('loadingdone',request);request()
    return()=>{disposed=true;if(frame)cancelAnimationFrame(frame);observer.disconnect();window.removeEventListener('scroll',request);window.removeEventListener('resize',request);reduced.removeEventListener('change',request);document.fonts.removeEventListener('loadingdone',request);navigation?.style.removeProperty('--home-nav-dark');navigation?.removeAttribute('data-home-dark')}
  },[ref])
}
