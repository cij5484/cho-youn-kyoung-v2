import { useEffect, useRef, type RefObject } from 'react'
import { blendPoint, clamp, smooth, ellipse, outroOrbit } from './closing-orbit.ts'
import { createTrailSampler, type TrailSample } from '../motion/trail-geometry.ts'
import { signatureAudioHandoff } from '../signature/audio-handoff.ts'

export const worksRibbonTuning = {
  spacing: .46, depth: 210, turn: 48, response: 11,
  orbitResponse: 5.5, orbitSpeed: .65, trailMs: 2000, trailWidth: 2.2, historyLimit: 360,
  collapseEnd: .6,
  colors: ['#6334E5', '#A33D36'],
} as const

/** A short native-scroll ribbon. Its two-depth motif inherits the real outgoing SOUND strands. */
export function useWorksRibbon(ref: RefObject<HTMLElement | null>, onActive: (index: number) => void) {
  const seek = useRef<(index: number) => void>(() => {})
  useEffect(() => {
    const root = ref.current!, sticky = root.querySelector<HTMLElement>('.works-sticky')!, board = root.querySelector<HTMLElement>('.works-board')!
    const cards = [...board.querySelectorAll<HTMLElement>('.selected-work')], links = cards.map(card => card.querySelector('a')!)
    const owner = root.closest<HTMLElement>('.home-closing')!
    const canvases = [...owner.querySelectorAll<HTMLCanvasElement>('.works-motif')], contexts = canvases.map(canvas => canvas.getContext('2d'))
    const axis = root.querySelector<SVGSVGElement>('.works-axis')!, paths = [...axis.querySelectorAll('path')]
    const sound = document.querySelector<HTMLElement>('.sound-experience'), sources = [...(sound?.querySelectorAll<HTMLElement>('.tension-line') ?? [])]
    const reduced = matchMedia('(prefers-reduced-motion: reduce)'), mobile = matchMedia('(max-width:639px)'), fine = matchMedia('(hover:hover) and (pointer:fine)')
    const later = [...owner.querySelectorAll<HTMLElement>('[data-home-scene]')].slice(1)
    const album = owner.querySelector<HTMLElement>('.album-object-surface')!
    const poster = owner.querySelector<HTMLElement>('.performance-image-window img')!
    const portrait = owner.querySelector<HTMLElement>('.artist-portrait-aperture')!
    const name = owner.querySelector<HTMLElement>('#artist-heading')!
    const outro = owner.querySelector<HTMLElement>('.outro-name')!
    const sequence=owner.querySelector<HTMLElement>('.stage-artist-sequence')!
    const seam=sequence.querySelector<HTMLElement>('.shared-seam')!
    const tune = worksRibbonTuning, sampler = createTrailSampler(2048)
    const histories: TrailSample[][] = [[], []]
    const tilts = cards.map(() => ({ x: 0, y: 0 }))
    const artistOutgoing: Array<TrailSample | undefined> = [undefined, undefined]
    let frame = 0, last = 0, phase = 0, width = 0, height = 0, visible = false, disposed = false, position = 0, target = 0, active = -1
    let pointer: { x: number; y: number } | null = null, focus = -1, orbit = 0, cx = 0, cy = 0, rx = 0, ry = 0
    function audioOwnership() {
      canvases.forEach(canvas => { canvas.style.visibility = signatureAudioHandoff.isActive() ? 'hidden' : '' })
      if (!signatureAudioHandoff.isActive()) histories.forEach(history => { history.splice(0, Math.max(0, history.length - 1)) })
      request()
    }
    const unsubscribeAudio = signatureAudioHandoff.subscribe(audioOwnership)
    audioOwnership()
    function request() { if (!frame && !disposed && !document.hidden) frame = requestAnimationFrame(paint) }
    function resize() {
      width = innerWidth; height = innerHeight
      const dpr = Math.min(devicePixelRatio || 1, mobile.matches ? 1.25 : 1.75)
      canvases.forEach((canvas, i) => { canvas.width = Math.round(width * dpr); canvas.height = Math.round(Math.min(height, innerHeight * 1.2) * dpr); contexts[i]?.setTransform(dpr, 0, 0, dpr, 0, 0) })
      histories.forEach(history => { history.length = 0 }); request()
    }
    function paint(now: number) {
      frame = 0
      const section = root.getBoundingClientRect()
      visible = section.top < innerHeight && owner.getBoundingClientRect().bottom > 0
      if (!visible || reduced.matches || document.hidden || document.querySelector('dialog[open]')) { signatureAudioHandoff.remove('home-closing'); owner.dataset.orbitState='suspended'; last = 0; contexts.forEach(context=>context?.clearRect(0,0,width,height)); histories.forEach(history => { history.length = 0 }); axis.style.opacity='0'; return }
      const dt = Math.min(.04, (now - (last || now - 16)) / 1000); last = now; phase += dt * tune.orbitSpeed
      const touchLayout = mobile.matches
      const laterBoxes = later.map(scene => scene.getBoundingClientRect())
      const weights = laterBoxes.map(box => smooth((height*.85-box.top)/(height*.7)))
      const sequenceBox=sequence.getBoundingClientRect(), sequenceP=Number(sequence.dataset.sequenceProgress??0)
      weights[1]=smooth((height*.85-sequenceBox.top)/(height*.7))
      weights[2]=smooth((sequenceP-.53)/.14)*weights[1]
      const ending = clamp((height*.7-laterBoxes[3].top)/Math.max(1,laterBoxes[3].height-height*.3))
      owner.dataset.orbitScene = String(4 + weights.filter(weight => weight > .5).length)
      owner.dataset.orbitEnding = ending.toFixed(3)
      owner.dataset.orbitState='running'
      target = clamp(-section.top / Math.max(1, section.height - sticky.offsetHeight)) * (cards.length - 1)
      position += (target - position) * (1 - Math.exp(-tune.response * dt))
      if (Math.abs(target - position) < .0005) position = target
      const nextActive = Math.round(position)
      if (nextActive !== active) { active = nextActive; onActive(active); root.dataset.ribbonIndex = String(active) }
      const boardBox = board.getBoundingClientRect()
      if (section.bottom > 0) {
        cards.forEach((card, i) => {
          const offset = i - position, distance = Math.abs(offset)
          card.style.transform = touchLayout ? `translate(-50%,-50%) translate3d(${(offset * width * .94).toFixed(2)}px,${(distance * 24).toFixed(2)}px,${(-distance * 90).toFixed(2)}px) rotateY(${(-Math.max(-1, Math.min(1, offset)) * 18).toFixed(2)}deg)` : `translate(-50%,-50%) translate3d(${(offset * width * tune.spacing).toFixed(2)}px,${(distance * distance * 26).toFixed(2)}px,${(-Math.pow(distance, 1.3) * tune.depth).toFixed(2)}px) rotateY(${(-Math.max(-1.6, Math.min(1.6, offset)) * tune.turn).toFixed(2)}deg) rotateZ(${(offset * 4).toFixed(2)}deg)`
          card.style.zIndex = String(10 - Math.round(distance * 2)); card.style.setProperty('--work-distance', String(Math.min(1, distance)))
          links[i].tabIndex = i === active ? 0 : -1
          card.inert = i !== active
          card.dataset.current = String(i === active)
        })
      }
      const handoff = clamp((innerHeight - section.top) / innerHeight)
      owner.dataset.lineHandoff = handoff.toFixed(3)
      contexts.forEach(context => context?.clearRect(0, 0, width, height))
      // Keep the right endpoint fixed while the left edge travels right: the incoming sweep unwinds first.
      // Cancel only the source stage's native upward departure so the line does not fly offscreen mid-collapse.
      const collapse = smooth(handoff / tune.collapseEnd), release = smooth((handoff - tune.collapseEnd) / (1 - tune.collapseEnd))
      const transfer = clamp(handoff / .04)
      axis.style.opacity = reduced.matches || handoff >= tune.collapseEnd ? '0' : String(transfer)
      sound?.style.setProperty('--home-line-handoff', reduced.matches ? '0' : String(transfer))
      const origins = sources.map(source => { const box = source.getBoundingClientRect(); return {left:box.left,right:box.right,y:box.top + handoff * height + box.height / 2} })
      origins.forEach((origin,i) => paths[i]?.setAttribute('d', `M${(origin.left + (origin.right-origin.left)*collapse).toFixed(2)},${origin.y.toFixed(2)} H${origin.right.toFixed(2)}`))
      let hover = touchLayout ? -1 : focus
      if (!touchLayout && pointer && fine.matches) {
        let closest = 100
        cards.forEach((card, i) => {
          const box = card.querySelector('.work-image')!.getBoundingClientRect()
          const dx = Math.max(box.left - pointer!.x, 0, pointer!.x - box.right), dy = Math.max(box.top - pointer!.y, 0, pointer!.y - box.bottom)
          const distance = Math.hypot(dx, dy)
          if (distance < closest && Math.abs(i - position) < 1.3) { closest = distance; hover = i }
        })
      }
      const departure = smooth(1 - section.bottom / innerHeight)
      if (departure > .02) hover = -1
      const gathering = hover >= 0, blend = 1 - Math.exp(-tune.orbitResponse * dt)
      cards.forEach((card, i) => {
        const pointed = i === hover && pointer, box = pointed ? card.getBoundingClientRect() : null
        const tilt = tilts[i]
        tilt.x += ((box ? Math.max(-1, Math.min(1, (pointer!.x - box.left) / box.width * 2 - 1)) : 0) - tilt.x) * blend
        tilt.y += ((box ? Math.max(-1, Math.min(1, (pointer!.y - box.top) / box.height * 2 - 1)) : 0) - tilt.y) * blend
        card.style.setProperty('--work-tilt-x', tilt.x.toFixed(4)); card.style.setProperty('--work-tilt-y', tilt.y.toFixed(4))
        card.style.setProperty('--work-hover', i === hover ? '1' : '0')
      })
      orbit += ((gathering ? 1 : 0) - orbit) * blend
      const anchor = gathering ? cards[hover].querySelector('.work-image')!.getBoundingClientRect() : null
      const incoming = owner.querySelector('.album-exchange-slot[data-active="true"] .album-object-pose')?.getBoundingClientRect()
      const freeX = anchor ? anchor.left + anchor.width / 2 : width * .5
      // Touch uses a free path around the current full-size work, never a hover dependency.
      const gridTop = Math.max(96,Math.min(height-120,boardBox.top))
      const gridBottom = Math.max(gridTop+60,Math.min(height-40,boardBox.bottom))
      const freeY = touchLayout ? (gridTop+gridBottom)/2 : anchor ? anchor.top + anchor.height * .51 : boardBox.top + boardBox.height * .48
      const tx = incoming ? freeX + (incoming.left + incoming.width / 2 - freeX) * departure : freeX
      const ty = incoming ? freeY + (incoming.top + incoming.height / 2 - freeY) * departure : freeY
      if (!cx) { cx = tx; cy = ty; rx = width * .34; ry = Math.min(150, height * .16) }
      cx += (tx - cx) * blend; cy += (ty - cy) * blend
      rx += ((anchor ? anchor.width * .63 : width * .34 * (1 - departure * .35)) - rx) * blend
      ry += ((touchLayout ? (gridBottom-gridTop)*.38 : anchor ? anchor.height * .28 : Math.min(150, height * .16)) - ry) * blend
      root.dataset.motif = departure > .1 ? 'object-handoff' : orbit > .5 ? 'orbit' : 'free'
      root.dataset.orbitWork = gathering ? String(hover) : ''
      const stagePresence=weights[1]*(1-weights[3])
      const stageCue=smooth((sequenceP-.025)/.055)*(1-smooth((sequenceP-.18)/.065))
      const artistCue=smooth((sequenceP-.69)/.045)*(1-smooth((sequenceP-.81)/.05))
      const albumMoving=album.dataset.moving==='true'||album.dataset.dragging==='true'
      const albumPresence=(1-weights[0])+weights[0]*(albumMoving?.8:.28)
      const stageMotifPresence=(1-stagePresence)*albumPresence+stagePresence*Math.max(stageCue,artistCue)*.65
      const motifPresence=stageMotifPresence+(.78-stageMotifPresence)*weights[3]
      owner.dataset.motifPresence=motifPresence.toFixed(4)
      const alpha = motifPresence * smooth((handoff - .45) / .15)
      const posterBox = contexts[0] && weights[1]>0 && weights[2]<1 ? poster.getBoundingClientRect() : null
      const photoBox = contexts[0] && weights[2]>0 && weights[3]<1 ? portrait.getBoundingClientRect() : null
      const outroBox = outro.getBoundingClientRect()
      // The revisit index can make 08 taller than its name. Keep the living pair in the visible
      // paper area at the very bottom, rather than orbiting a heading that has scrolled away.
      const paperBox=outro.closest<HTMLElement>('.home-outro')!.getBoundingClientRect()
      const paperTop=Math.max(30,paperBox.top+40),paperBottom=Math.min(height-26,paperBox.bottom-20)
      const outroFlightBox={left:Math.max(20,outroBox.left),top:paperTop,width:Math.min(width-40,outroBox.width),height:Math.max(60,paperBottom-paperTop)}
      const objectBox=incoming??album.getBoundingClientRect(), seamBox=seam.getBoundingClientRect()
      const frameBox=seam.closest('.shared-image-frame')!.getBoundingClientRect()
      for (let i = 0; i < 2; i++) {
        const angle = phase + i * Math.PI, z = Math.sin(angle)
        const orbitX = cx + Math.cos(angle) * rx, orbitY = cy + Math.sin(touchLayout ? angle*1.37 : angle) * ry + Math.cos(angle) * rx * .12 * orbit
        const origin = origins[i]
        let x = origin ? origin.left + (origin.right-origin.left)*collapse + (orbitX-origin.right)*release : orbitX
        let y = origin ? origin.y + (orbitY-origin.y)*release : orbitY
        let point = {x,y,z}
        point=blendPoint(point,ellipse(objectBox,angle,.58,.49),weights[0])
        // Cues belong to the opening boundary, not the cursor. Quiet threshold frames clear them.
        const opening=Number(sequence.dataset.stageOpening??0)
        const edgeX=frameBox.left+frameBox.width*(.5+(i?1:-1)*opening*.5)
        point=blendPoint(point,{x:edgeX+Math.sin(phase*1.7)*3,y:frameBox.top+frameBox.height*(i?.78:.22),z:i?1:-1},weights[1])
        point=blendPoint(point,{x:seamBox.left+Math.sin(phase*1.7)*3,y:seamBox.top+seamBox.height*(i?.8:.2),z:i?1:-1},weights[2])
        point=blendPoint(point,outroOrbit(outroFlightBox,angle,ending,i),weights[3])
        const history = histories[i]
        // The artist's quiet hold may clear an invisible trail; keep its actual last position for 08.
        const previous=history.at(-1)??(weights[3]>0?artistOutgoing[i]:undefined), settle=1-Math.exp(-dt*9)
        if(previous && (touchLayout || weights[0]>0)) point=blendPoint(previous,point,settle)
        x=point.x;y=point.y
        owner.dataset[`orbit${i}X`]=x.toFixed(2);owner.dataset[`orbit${i}Y`]=y.toFixed(2)
        history.push({ x, y, z:point.z, time: now })
        if(weights[2]>0)artistOutgoing[i]={x,y,z:point.z,time:now}
        while (history.length > 2 && (now - history[0].time > tune.trailMs || history.length > (mobile.matches ? 180 : tune.historyLimit))) history.shift()
        if (handoff > .6) signatureAudioHandoff.publish('home-closing', i ? 'janggu' : 'haegeum', { x, y, time: now, vx: previous ? (x - previous.x) / dt : 0, vy: previous ? (y - previous.y) / dt : 0, trail: history })
        else signatureAudioHandoff.remove('home-closing')
        if (signatureAudioHandoff.isActive()) continue
        sampler.resample(history, 2)
        for (let j = 1; j < sampler.count; j++) {
          const a = sampler.points[j - 1], b = sampler.points[j], context = contexts[b.z >= 0 ? 1 : 0]
          if (!context) continue
          const age = clamp(1 - (now - (a.time + b.time) / 2) / tune.trailMs)
          context.globalAlpha = Math.pow(age, 1.15) * alpha * (.48 + orbit * .12 + weights[1]*(1-weights[2])*.28)
          context.lineWidth = Math.max(.15, tune.trailWidth * age * (.8 + b.z * .2)); context.lineCap = 'round'; context.strokeStyle = tune.colors[i]
          context.beginPath(); context.moveTo(a.x, a.y); context.lineTo(b.x, b.y); context.stroke()
        }

      }
      // Back segments disappear behind the subjects; front segments cross the same planes.
      const back=contexts[0]
      if(back){
        const masks:DOMRect[]=[]
        if(weights[0]<1 && !touchLayout) cards.forEach(card=>masks.push(card.querySelector('.work-image')!.getBoundingClientRect()))
        if(posterBox) masks.push(posterBox)
        if(photoBox) masks.push(photoBox)
        masks.forEach(box=>back.clearRect(box.left,box.top,box.width,box.height))
        for(const heading of [name,outro]){
          if(heading===name ? weights[2]===0 : weights[3]===0)continue
          back.save();back.globalCompositeOperation='destination-out';back.globalAlpha=1
          for(const word of heading.children){
            const style=getComputedStyle(word),range=document.createRange();range.selectNodeContents(word)
            const box=range.getBoundingClientRect(),text=word.textContent??''
            back.font=`${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;back.letterSpacing=style.letterSpacing
            const metrics=back.measureText(text)
            back.fillText(text,box.left,box.top+metrics.fontBoundingBoxAscent)
          }
          back.restore()
        }
      }
      if(alpha>.005||position!==target)request()
      else {owner.dataset.orbitState='quiet';last=0;histories.forEach(h=>{h.length=0})}
    }
    function scroll() {
      const box = root.getBoundingClientRect()
      if (box.top >= innerHeight) { sound?.style.setProperty('--home-line-handoff', '0'); owner.dataset.lineHandoff = '0.000'; axis.style.opacity = '0' }
      if (box.bottom <= 0) { sound?.style.setProperty('--home-line-handoff', '1'); owner.dataset.lineHandoff = '1.000'; axis.style.opacity = '0' }
      request()
    }
    seek.current = index => {
      if (reduced.matches) cards[index].scrollIntoView({ behavior: 'instant', block: 'center' })
      else { const box = root.getBoundingClientRect(); scrollTo({ top: scrollY + box.top + (box.height - sticky.offsetHeight) * index / (cards.length - 1), behavior: 'instant' }) }
      request()
    }
    function move(event: PointerEvent) { if (fine.matches) pointer = { x: event.clientX, y: event.clientY }; request() }
    function leave() { pointer = null; request() }
    function focused(event: FocusEvent) { focus = Number((event.target as HTMLElement).closest<HTMLElement>('[data-work-index]')?.dataset.workIndex ?? -1); request() }
    function blurred() { focus = -1; request() }
    function change() { if(reduced.matches)cards.forEach((card,i)=>{card.inert=false;links[i].tabIndex=0;card.style.removeProperty('transform')}); histories.forEach(history => { history.length = 0 }); request() }
    const observer = new ResizeObserver(resize); observer.observe(sticky)
    window.addEventListener('resize',resize)
    const modal = new MutationObserver(() => { last = 0; request() }); const dialog = document.querySelector('dialog'); if (dialog) modal.observe(dialog, { attributes: true, attributeFilter: ['open'] })
    const choreography=new MutationObserver(request);choreography.observe(sequence,{attributes:true,attributeFilter:['data-sequence-progress']});choreography.observe(album,{attributes:true,attributeFilter:['data-moving','data-dragging']})
    owner.addEventListener('pointermove', move); owner.addEventListener('pointerleave', leave); board.addEventListener('focusin', focused); board.addEventListener('focusout', blurred)
    window.addEventListener('scroll', scroll, { passive: true }); reduced.addEventListener('change', change); mobile.addEventListener('change', change); document.addEventListener('visibilitychange', change)
    resize()
    return () => { disposed = true; unsubscribeAudio(); signatureAudioHandoff.remove('home-closing'); if (frame) cancelAnimationFrame(frame); observer.disconnect(); choreography.disconnect(); window.removeEventListener('resize',resize); modal.disconnect(); seek.current = () => {}; owner.removeEventListener('pointermove', move); owner.removeEventListener('pointerleave', leave); board.removeEventListener('focusin', focused); board.removeEventListener('focusout', blurred); window.removeEventListener('scroll', scroll); reduced.removeEventListener('change', change); mobile.removeEventListener('change', change); document.removeEventListener('visibilitychange', change); sound?.style.removeProperty('--home-line-handoff') }
  }, [ref, onActive])
  return seek
}
