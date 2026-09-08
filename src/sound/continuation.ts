import { haegeumContinuation } from '../haegeum/choreography.ts'
import type { HeroContinuation } from '../hero/useHeroMotion.ts'
import { measureSoundScrollGeometry } from './scroll-geometry.ts'

// P2F keeps its original155svh. Only the following80svh belongs to the release into SOUND.
export const HAEGEUM_SHARE = 155 / 235
const clamp = (n: number) => Math.min(1, Math.max(0, n))
const ease = (p: number, a = 0, b = 1) => { const t = clamp((p-a)/(b-a)); return t*t*(3-2*t) }
const mix = (a: number, b: number, t: number) => a+(b-a)*t

export const soundContinuation: HeroContinuation = {
  ...haegeumContinuation,
  timelineTravel: (scene, stage) => measureSoundScrollGeometry(scene, stage).travel,
  portraitEnd: haegeumContinuation.portraitEnd * HAEGEUM_SHARE,
  imageEntry: (haegeumContinuation.imageEntry ?? .4) * HAEGEUM_SHARE,
  pointerGain: p => haegeumContinuation.pointerGain?.(clamp(p/HAEGEUM_SHARE)) ?? 0,
  paint(scene, stage, p, still) {
    haegeumContinuation.paint(scene, stage, clamp(p/HAEGEUM_SHARE), still)
    const root = scene.parentElement!, panel = root.querySelector<HTMLElement>('.sound-surface')!
    const release = still ? 1 : clamp((p-HAEGEUM_SHARE)/(1-HAEGEUM_SHARE))
    const w = stage.clientWidth, h = stage.clientHeight, mobile = w < 640
    const opening = ease(release, .36, .84), folding = ease(release, .04, .64)
    root.style.setProperty('--sound-entry', opening.toFixed(5))
    root.style.setProperty('--sound-release', release.toFixed(5))
    root.dataset.soundReady = String(still || release >= .84)
    root.dataset.soundStatic = String(still)
    root.dataset.soundReleasing = String(!still && release > 0)
    panel.inert = !still && release < .84
    panel.setAttribute('aria-hidden', String(!still && release < .84))
    scene.style.setProperty('--sound-type-exit', ease(release, .04, .6).toFixed(5))
    // Reset every owned style on reverse; the frozen continuation painted its original values above.
    const field = scene.querySelector<HTMLElement>('.editorial-field')!
    field.style.scale = String(1-folding*.025)
    field.style.transformOrigin = '50% 50%'
    scene.querySelector<HTMLElement>('.keyword-back')!.style.translate = `0 ${(-ease(release, .04, .6)*h*.04).toFixed(3)}px`
    if (release > 0 && !still) {
      const line = scene.querySelector<HTMLElement>('.line-one')!
      const axis = parseFloat(line.style.left)/w
      // Preserve photographic proportions as the aperture narrows onto the string axis.
      field.style.transformOrigin = `${axis*100}% 43%`
      const box=field.style.clipPath.match(/[\d.]+/g)!.map(Number)
      field.style.clipPath=`inset(${box[0]}% ${mix(box[1],(1-axis)*100,folding).toFixed(5)}% ${box[2]}% ${mix(box[3],axis*100,folding).toFixed(5)}%)`
      if (folding === 1) field.style.visibility = 'hidden'
      scene.querySelector<HTMLElement>('.playing-field')!.style.visibility = 'hidden'
      scene.dataset.fullSourceVisible = String(folding < 1)
      const stretch = ease(release, .06, .94)
      scene.querySelectorAll<HTMLElement>('.tension-line').forEach((el,i) => {
        const angle = parseFloat(el.style.transform.slice(7))*Math.PI/180
        const startX = parseFloat(el.style.left), startY = parseFloat(el.style.top), length = parseFloat(el.style.width)
        const targetX = w*(mobile ? .075 : .065)
        const targetY = h*(mobile ? .37 : .425) + i*(mobile ? 13 : 19)
        // Interpolate endpoints, not length+angle: this keeps the entire pair inside the viewport.
        const x=mix(startX,targetX,stretch), y=mix(startY,targetY,stretch)
        const endX=mix(startX+Math.cos(angle)*length,targetX+w*(mobile ? .85 : .87),stretch)
        const endY=mix(startY+Math.sin(angle)*length,targetY,stretch)
        el.style.left = `${x.toFixed(3)}px`; el.style.top = `${y.toFixed(3)}px`
        el.style.width = `${Math.hypot(endX-x,endY-y).toFixed(3)}px`
        el.style.transform = `rotate(${(Math.atan2(endY-y,endX-x)*180/Math.PI).toFixed(4)}deg)`
      })
    }
  },
}
