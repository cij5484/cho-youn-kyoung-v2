import { HAEGEUM_SHARE } from '../sound/continuation.ts'
import { homeSoundSource } from '../sound/source.ts'
import { alignedTargets } from './alignment.ts'
import { createJangguOrbit, hitDisplacement, jangguPoint, narrative, PathHistory, pointAt, type ProjectedPoint } from './model.ts'
import { clamp, interactionTuning as tuning, mix, smooth, type JangguColor } from './tuning.ts'
import percussion from './percussion.json'
import { createTrailSampler, trailNormal, trailEdge, type TrailSample } from '../motion/trail-geometry.ts'
import { signatureAudioHandoff, type SignatureAudioSample } from '../signature/audio-handoff.ts'

export type Comparison = {points:boolean;janggu:boolean;color:JangguColor}
export function createInteractionRenderer(host:HTMLElement, initial:Comparison) {
  const diagnostics=new URLSearchParams(window.location.search).get('diagnostics')==='1'
  const root=host.querySelector<HTMLElement>('.sound-experience')!,scene=root.querySelector<HTMLElement>('.poster-scene')!
  const stage=scene.querySelector<HTMLElement>('.poster-stage')!,media=root.querySelector<HTMLAudioElement>('audio')!
  const dialog=host.querySelector<HTMLDialogElement>('dialog'),reduced=matchMedia('(prefers-reduced-motion: reduce)')
  const canvases=Array.from({length:2},()=>{const c=document.createElement('canvas');c.className='spatial-canvas';c.setAttribute('aria-hidden','true');stage.append(c);return c})
  const contexts=canvases.map(c=>c.getContext('2d')!)
  if(contexts.some(c=>!c)){canvases.forEach(c=>c.remove());return {configure:()=>{},destroy:()=>{}}}
  let settings=initial,frame=0,last=0,time=0,width=0,height=0,visible=true,disposed=false,paintCount=0
  let history:PathHistory[]=[],lastMedia=-1,hitAge=10,hitCount=0
  const hitAges=new Float64Array(12).fill(10);let hitCursor=0
  const jangguOrbit=createJangguOrbit(),ribbon=createTrailSampler(),sourceTrail:TrailSample[]=[]
  const validFeatures=percussion.sourceSha256===homeSoundSource.sourceSha256&&percussion.trackId===homeSoundSource.trackId&&Math.abs(percussion.duration-homeSoundSource.duration)<.1
  const color=getComputedStyle(root).getPropertyValue('--color-accent').trim()
  const audioPositions: Array<SignatureAudioSample | undefined> = []
  let audioBounds = stage.getBoundingClientRect(), audioTime = 0, audioRelease = 0
  function audioOwnership(){canvases.forEach(canvas=>{canvas.style.visibility=signatureAudioHandoff.isActive()?'hidden':''});request()}
  const unsubscribeAudio=signatureAudioHandoff.subscribe(audioOwnership)
  audioOwnership()
  function size(){
    width=stage.clientWidth;height=stage.clientHeight
    const small=width<640,dpr=Math.min(devicePixelRatio,small?1.5:2)
    canvases.forEach((c,i)=>{c.width=Math.round(width*dpr);c.height=Math.round(height*dpr);contexts[i].setTransform(dpr,0,0,dpr,0,0)})
    history=[new PathHistory(small?tuning.home.historyMobile:tuning.home.historyDesktop),new PathHistory(small?tuning.home.historyMobile:tuning.home.historyDesktop),new PathHistory(small?tuning.janggu.historyMobile:tuning.janggu.historyDesktop)]
  }
  function clear(){contexts.forEach(c=>c.clearRect(0,0,width,height));history.forEach(h=>h.clear())}
  function glyphOcclusion(){
    const ctx=contexts[0],bounds=stage.getBoundingClientRect()
    ctx.save();ctx.globalCompositeOperation='destination-out';ctx.fillStyle='#000';ctx.globalAlpha=1
    // The live DOM owns typography. Canvas uses its font metrics only as a glyph-shaped occlusion mask.
    for(const word of stage.querySelectorAll<HTMLElement>('.poster-type-back .word')){
      const rect=word.getBoundingClientRect(),css=getComputedStyle(word)
      if(rect.right<0||rect.left>width)continue
      ctx.font=`${css.fontWeight} ${css.fontSize} ${css.fontFamily}`;ctx.letterSpacing=css.letterSpacing
      const metrics=ctx.measureText(word.textContent!),ascent=metrics.fontBoundingBoxAscent,descent=metrics.fontBoundingBoxDescent
      ctx.fillText(word.textContent!,rect.left-bounds.left,rect.top-bounds.top+(rect.height-ascent-descent)/2+ascent)
    }
    ctx.restore()
  }
  function draw(point:ProjectedPoint,index:number,ink:string,opacity:number,style:typeof tuning.home|typeof tuning.janggu){
    const h=history[index]
    // Every Janggu render-frame position is recorded. Its cue data never controls trail sample cadence.
    const interval=index===2?0:1/(width<640?tuning.home.sampleHzMobile:tuning.home.sampleHzDesktop)
    h.add(point,time,interval)
    sourceTrail.length=0
    h.each(sample=>{if(time-sample.time<=style.trailMs/1000+.1)sourceTrail.push(sample)})
    if(sourceTrail.at(-1)?.time!==time)sourceTrail.push({...point,time})
    if (index === 2 || audioRelease < .94) {
      const sample={x:audioBounds.left+point.x,y:audioBounds.top+point.y,time:audioTime}, previous=audioPositions[index]
      const elapsed=previous?Math.max(.001,(audioTime-previous.time)/1000):1
      signatureAudioHandoff.publish('home-spatial',index===0?'haegeum':'janggu',{...sample,vx:previous?(sample.x-previous.x)/elapsed:0,vy:previous?(sample.y-previous.y)/elapsed:0})
      audioPositions[index]=sample
    }
    if(signatureAudioHandoff.isActive())return
    ribbon.resample(sourceTrail,width<640?2.5:2)
    const points=ribbon.points,count=ribbon.count,rgb=ink.replace('#','').match(/../g)!.map(c=>parseInt(c,16)).join(',')
    const appearance=(sample:TrailSample)=>{
      const fade=clamp(1-(time-sample.time)*1000/style.trailMs),depth=clamp((sample.z/style.depth+1)/2)
      return {alpha:opacity*style.trailOpacity*Math.pow(fade,1.15)*mix(.45,1,depth),
        half:mix(style.trailWidth[0],style.trailWidth[1],depth)*Math.pow(fade,.6)*(width<640?.8:1)/2}
    }
    const edge=(i:number,side:number)=>{
      const p=points[i],normal=trailNormal(points[Math.max(0,i-1)],points[Math.min(count-1,i+1)])
      return trailEdge(p,normal,appearance(p).half*side)
    }
    // Joined ribbon sections, not individually rounded strokes. Each short section has a continuous
    // alpha gradient and shared edge vertices; width follows depth/age continuously through every sample.
    for(let start=0;start<count-1;){
      const p=points[start],layer=p.z<0?0:1,band=Math.floor((time-p.time)*1000/style.trailMs*32)
      let end=start+1
      while(end<count-1&&Math.floor((time-points[end].time)*1000/style.trailMs*32)===band&&(points[end].z<0?0:1)===layer)end++
      const q=points[end],ctx=contexts[layer],gradient=ctx.createLinearGradient(p.x,p.y,q.x===p.x&&q.y===p.y?q.x+.001:q.x,q.y)
      gradient.addColorStop(0,`rgba(${rgb},${appearance(p).alpha})`);gradient.addColorStop(1,`rgba(${rgb},${appearance(q).alpha})`)
      ctx.globalAlpha=1;ctx.fillStyle=gradient;ctx.beginPath()
      for(let i=start;i<=end;i++){const v=edge(i,1);if(i===start)ctx.moveTo(v.x,v.y);else ctx.lineTo(v.x,v.y)}
      for(let i=end;i>=start;i--){const v=edge(i,-1);ctx.lineTo(v.x,v.y)}
      ctx.closePath();ctx.fill();start=end
    }
    const ctx=contexts[point.z<0?0:1];ctx.fillStyle=ink;ctx.globalAlpha=opacity*style.headOpacity;ctx.beginPath();ctx.arc(point.x,point.y,point.radius,0,Math.PI*2);ctx.fill()
    if(diagnostics&&index===2){root.dataset.jangguSamples=String(h.count);root.dataset.jangguRibbonPoints=String(count)}
  }
  function request(){if(!frame&&!disposed&&!document.hidden)frame=requestAnimationFrame(paint)}
  function paint(now:number){
    frame=0;const start=diagnostics?performance.now():0,rect=scene.getBoundingClientRect()
    const still=reduced.matches||root.dataset.soundStatic==='true', blocked=!visible||rect.bottom<=0||rect.top>=innerHeight||dialog?.open||document.hidden
    root.dataset.p2kActive=String(!still&&!blocked)
    if(still||blocked){signatureAudioHandoff.remove('home-spatial');last=0;lastMedia=media.currentTime;hitAges.fill(10);clear();root.style.setProperty('--p2k-line-reveal','1');return}
    const dt=last?Math.min((now-last)/1000,.05):0;last=now;time+=dt
    const p=Number(scene.dataset.progress||0),hp=clamp(p/HAEGEUM_SHARE),release=clamp((p-HAEGEUM_SHARE)/(1-HAEGEUM_SHARE))
    contexts.forEach(c=>c.clearRect(0,0,width,height))
    root.dataset.p2kStage=release>0?'SOUND SWEEP':narrative(hp)
    const sweep=smooth(release,.25,.94),opacity=1-smooth(release,.94,1)
    root.style.setProperty('--p2k-line-reveal',settings.points?String(sweep):'1')
    const bounds=stage.getBoundingClientRect()
    audioBounds=bounds;audioTime=now;audioRelease=release
    if(release>=.94)signatureAudioHandoff.remove('home-spatial','haegeum')
    if(settings.points&&opacity>0){
      const targets=alignedTargets(scene,bounds,hp,time)
      for(let i=0;i<2;i++){
        const target=targets[i],point=pointAt(time,i,hp,target,width,height)
        if(release>0){
          const y=height*(width<640?.37:.425)+i*(width<640?13:19),left=width*(width<640?.075:.065),right=width-left
          const approach=smooth(release,0,.25)
          point.x=mix(point.x,mix(left,right,sweep),approach);point.y=mix(point.y,y,approach);point.z*=1-approach
        }
        draw(point,i,color,opacity,tuning.home)
        if(diagnostics){root.dataset[`p2kPoint${i}`]=JSON.stringify(point);root.dataset[`p2kTarget${i}`]=JSON.stringify(target)}
      }
      if(hp<.36)glyphOcclusion()
    }
    if(settings.janggu&&release>=.94){
      const seconds=media.currentTime,playing=!media.paused&&!media.ended&&media.readyState>=3&&root.dataset.audioState==='playing'
      if(playing&&validFeatures&&lastMedia>=0&&seconds>=lastMedia&&seconds-lastMedia<.2){
        const hit=percussion.hits.find(hit=>hit.time>lastMedia&&hit.time<=seconds&&hit.score>=tuning.janggu.sensitivity)
        if(hit){hitAge=Math.max(0,seconds-hit.time);hitAges[hitCursor]=hitAge;hitCursor=(hitCursor+1)%hitAges.length;hitCount++}
      }
      lastMedia=seconds;hitAge+=dt
      const orbit=jangguOrbit.advance(dt,playing),point=jangguPoint(orbit.phase,orbit.activity,width,height),presence=smooth(release,.94,1)
      // Overlapping hits superpose from zero position/velocity; never restart a returning marker at the axis.
      for(let i=0;i<hitAges.length;i++){hitAges[i]+=dt;point.y+=hitDisplacement(hitAges[i])*(width<640?.7:1)}
      draw(point,2,tuning.janggu.colors[settings.color],presence,tuning.janggu)
      if(diagnostics){
        root.dataset.jangguPoint=JSON.stringify(point);root.dataset.jangguHits=String(hitCount);root.dataset.jangguHitAge=String(hitAge)
        root.dataset.jangguActivity=orbit.activity.toFixed(3);root.dataset.jangguPhase=orbit.phase.toFixed(4)
      }
    } else {lastMedia=media.currentTime;hitAge=10;hitAges.fill(10);history[2].clear()}
    if(diagnostics){
      root.dataset.p2kFrames=String(++paintCount);root.dataset.p2kCost=(performance.now()-start).toFixed(3)
      root.dataset.p2kHistory=String(history.reduce((a,h)=>a+h.count,0))
    }
    if((settings.points&&release<1)||settings.janggu&&release>=.94)request();else last=0
  }
  function configure(value:Comparison){signatureAudioHandoff.remove('home-spatial');settings=value;root.dataset.spatialPoints=String(value.points);root.dataset.janggu=String(value.janggu);root.dataset.jangguColor=value.color;history.forEach(h=>h.clear());request()}
  const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;request()});observer.observe(scene)
  const menuObserver=new MutationObserver(request);if(dialog)menuObserver.observe(dialog,{attributes:true,attributeFilter:['open']})
  const resize=new ResizeObserver(()=>{size();request()});resize.observe(stage)
  const stop=()=>{if(frame)cancelAnimationFrame(frame);frame=0;last=0;request()}
  window.addEventListener('scroll',request,{passive:true});document.addEventListener('visibilitychange',stop);reduced.addEventListener('change',stop)
  size();configure(initial)
  return {configure,destroy(){disposed=true;unsubscribeAudio();signatureAudioHandoff.remove('home-spatial');if(frame)cancelAnimationFrame(frame);observer.disconnect();menuObserver.disconnect();resize.disconnect();window.removeEventListener('scroll',request);document.removeEventListener('visibilitychange',stop);reduced.removeEventListener('change',stop);canvases.forEach(c=>c.remove());delete root.dataset.spatialPoints}}
}
