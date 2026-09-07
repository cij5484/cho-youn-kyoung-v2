import { useLayoutEffect, useRef } from 'react'
import { sharedGlyphs } from './model.ts'
import { interactionTuning } from './tuning.ts'

/** The real button owns the accessible label. Each moving letter has a stationary vertical mask. */
export function GlyphLabel({word}:{word:string}) {
  const ref=useRef<HTMLSpanElement>(null), previous=useRef(''), serial=useRef(0)
  useLayoutEffect(()=>{
    const root=ref.current!, tune=interactionTuning.typography, reduced=matchMedia('(prefers-reduced-motion: reduce)')
    const update=(animate:boolean)=>{
      const revision=++serial.current
      // Active slots first; interrupted exits remain available for reuse after the current word.
      const old=[...root.querySelectorAll<HTMLElement>('.state-glyph')].sort((a,b)=>
        Number(a.dataset.exiting==='true')-Number(b.dataset.exiting==='true')||Number(a.dataset.slot)-Number(b.dataset.slot))
      const snapshots=old.map(el=>({x:getComputedStyle(el).transform,y:getComputedStyle(el.firstElementChild!).transform}))
      old.forEach(el=>[...el.getAnimations(),...el.firstElementChild!.getAnimations()].forEach(a=>a.cancel()))
      const matches=sharedGlyphs(old.map(el=>el.dataset.char).join(''),word)
      const measure=document.createElement('span');measure.className='glyph-measure';measure.textContent=word;root.append(measure)
      const rect=measure.getBoundingClientRect(), text=measure.firstChild!, range=document.createRange()
      const slots=[...word].map((char,i)=>{range.setStart(text,i);range.setEnd(text,i+1);return {char,x:range.getBoundingClientRect().left-rect.left}})
      root.style.width=`${rect.width}px`;measure.remove()
      root.dataset.word=word;root.dataset.shared=String(matches.length)
      const fontSize=parseFloat(getComputedStyle(root).fontSize), used=new Set(matches.map(m=>m.from))
      const run=(el:HTMLElement,frames:Keyframe[],delay:number,duration:number,done?:()=>void)=>{
        if(!animate||reduced.matches){Object.assign(el.style,frames.at(-1));done?.();return}
        const animation=el.animate(frames,{duration,delay,fill:'both',easing:'cubic-bezier(.3,.05,.2,1)'})
        animation.onfinish=()=>{if(serial.current!==revision)return;Object.assign(el.style,frames.at(-1));animation.cancel();done?.()}
      }
      old.forEach((el,i)=>{
        if(used.has(i))return
        el.dataset.exiting='true';el.style.transform=snapshots[i].x
        const motion=el.firstElementChild as HTMLElement,delay=Math.min(i*tune.stagger*.65,90)
        run(motion,[{transform:snapshots[i].y},{transform:`translateY(${tune.maskDirection*115}%)`}],delay,210,()=>el.remove())
      })
      slots.forEach(({char,x},i)=>{
        const match=matches.find(m=>m.to===i), el=match?old[match.from]:document.createElement('span')
        if(!match){
          el.className='state-glyph';el.dataset.char=char
          const motion=document.createElement('span'),inner=document.createElement('span')
          motion.className='glyph-motion';inner.className='glyph-inner';inner.textContent=char
          motion.append(inner);el.append(motion);root.append(el)
        }
        el.dataset.exiting='false';el.dataset.slot=String(i)
        el.style.setProperty('--glyph-drift',`${(i%2?1:-1)*tune.baselineDrift}px`)
        el.style.setProperty('--glyph-hover-delay',`${i*12}ms`)
        const motion=el.firstElementChild as HTMLElement,delay=(match?0:tune.entryDelay)+i*tune.stagger
        const duration=Math.max(220,tune.duration-delay),endX=`translateX(${x}px)`
        const midX=`translateX(${x+tune.trackingShift*fontSize*i}px)`
        run(el,[{transform:match?snapshots[match.from].x:endX},{transform:midX,offset:.58},{transform:endX}],delay,duration)
        run(motion,[{transform:match?snapshots[match.from].y:`translateY(${-tune.maskDirection*115}%)`},
          {transform:`translateY(${(i%2?1:-1)*tune.baselineDrift}px)`,offset:.78},{transform:'translateY(0px)'}],delay,duration)
      })
      previous.current=word
    }
    update(previous.current!=='')
    const settle=()=>update(false)
    window.addEventListener('resize',settle);reduced.addEventListener('change',settle)
    document.fonts.addEventListener('loadingdone',settle)
    return()=>{window.removeEventListener('resize',settle);reduced.removeEventListener('change',settle);document.fonts.removeEventListener('loadingdone',settle)}
  },[word])
  return <span ref={ref} className="glyph-label" aria-hidden="true" lang="en" />
}
