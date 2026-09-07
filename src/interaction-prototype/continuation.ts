import { soundContinuation, HAEGEUM_SHARE } from '../sound/continuation.ts'
import type { HeroContinuation } from '../hero/useHeroMotion.ts'
import { clamp } from './tuning.ts'
/** Only the Lab's B opts in. The frozen A timeline and the actual line holders remain reusable. */
export const spatialContinuation:HeroContinuation={...soundContinuation,paint(scene,stage,p,still){
  soundContinuation.paint(scene,stage,p,still)
  const release=clamp((p-HAEGEUM_SHARE)/(1-HAEGEUM_SHARE))
  if(release<=0||still)return
  const width=stage.clientWidth,height=stage.clientHeight,small=width<640
  scene.querySelectorAll<HTMLElement>('.tension-line').forEach((line,i)=>{
    line.style.left=`${width*(small?.075:.065)}px`;line.style.top=`${height*(small?.37:.425)+i*(small?13:19)}px`
    line.style.width=`${width*(small?.85:.87)}px`;line.style.transform='rotate(0deg)'
  })
}}
