import { useEffect, type RefObject } from 'react'
const clamp=(n:number)=>Math.max(0,Math.min(1,n))
const ease=(p:number,a:number,b:number)=>{const t=clamp((p-a)/(b-a));return t*t*(3-2*t)}

/** A reversible native-scroll timeline; the aperture's right boundary becomes the portrait seam. */
export function stageArtistFrame(p:number) {
  const opening=ease(p,0,.24), handoff=ease(p,.43,.64), portrait=ease(p,.67,.96)
  return {opening,handoff,portrait,seam:handoff<1 ? (1-handoff)*(50+opening*50) : portrait*68}
}
export function useStageArtistMotion(ref:RefObject<HTMLDivElement|null>) {
  useEffect(()=>{
    const root=ref.current!, sticky=root.querySelector<HTMLElement>('.stage-artist-sticky')!
    const performanceScene=root.querySelector<HTMLElement>('.performance-scene')!, artist=root.querySelector<HTMLElement>('.artist-scene')!
    const navigation=document.querySelector<HTMLElement>('.editorial-navigation')
    const reduced=matchMedia('(prefers-reduced-motion: reduce)')
    let frame=0,last=0,p=0,initialized=false,disposed=false
    function paint(now:number){
      frame=0;if(disposed)return
      const box=root.getBoundingClientRect(),travel=Math.max(1,root.offsetHeight-sticky.offsetHeight)
      const target=clamp(-box.top/travel), dt=Math.min(.05,(now-(last||now-16))/1000);last=now
      if(!initialized||reduced.matches||box.bottom<0||box.top>innerHeight){p=target;initialized=true}
      else p+=(target-p)*(1-Math.exp(-dt*14))
      if(Math.abs(target-p)<.0001)p=target
      const f=stageArtistFrame(p), still=reduced.matches
      root.dataset.sequenceTarget=target.toFixed(4);root.dataset.sequenceProgress=p.toFixed(4);root.dataset.stageOpening=f.opening.toFixed(4)
      root.dataset.identityHandoff=f.handoff.toFixed(4);root.dataset.portraitReveal=f.portrait.toFixed(4)
      root.dataset.sequenceState=still?'static':p<.43?'stage':p<.64?'handoff':'artist'
      for(const [key,value] of Object.entries(f))root.style.setProperty(`--${key}`,value.toFixed(5))
      root.style.setProperty('--stage-exposure', (still?1:ease(p,.04,.2)).toFixed(4))
      root.style.setProperty('--stage-copy-exit', (still?0:ease(p,.39,.54)).toFixed(4))
      root.style.setProperty('--artist-copy-entry',(still?1:ease(p,.55,.69)).toFixed(4))
      performanceScene.inert=!still&&p>.57;artist.inert=!still&&p<.57
      const top=navigation?.getBoundingClientRect().bottom??64
      const dark=still?Number(performanceScene.getBoundingClientRect().top<top&&performanceScene.getBoundingClientRect().bottom>top):ease(top-box.top,0,Math.max(80,top))*(1-f.handoff)*Number(box.bottom>top)
      // Switch the authored contrast pair together; interpolating both creates illegible mid-gray UI.
      navigation?.style.setProperty('--home-nav-dark',String(Number(dark>.5)));navigation?.setAttribute('data-home-dark',String(dark>.5))
      if(p!==target)request()
    }
    function request(){if(!disposed&&!frame&&!document.hidden)frame=requestAnimationFrame(paint)}
    function seek(){if(location.hash==='#artist'&&!reduced.matches)scrollTo({top:scrollY+root.getBoundingClientRect().top+(root.offsetHeight-sticky.offsetHeight)*.73,behavior:'instant'})}
    const resize=new ResizeObserver(request);resize.observe(root);resize.observe(sticky)
    window.addEventListener('scroll',request,{passive:true});window.addEventListener('resize',request);window.addEventListener('hashchange',seek)
    reduced.addEventListener('change',request);document.addEventListener('visibilitychange',request);request()
    return()=>{disposed=true;cancelAnimationFrame(frame);resize.disconnect();window.removeEventListener('scroll',request);window.removeEventListener('resize',request);window.removeEventListener('hashchange',seek);reduced.removeEventListener('change',request);document.removeEventListener('visibilitychange',request);navigation?.style.removeProperty('--home-nav-dark')}
  },[ref])
}
