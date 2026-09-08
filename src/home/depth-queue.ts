import { clamp, smooth } from './closing-orbit.ts'

/** Native scroll has a short authored hold on either side of each full composition. */
export function depthQueuePosition(progress:number,count:number) {
  const raw=clamp(progress)*(count-1), index=Math.floor(raw)
  return Math.min(count-1,index+smooth((raw-index-.13)/.74))
}

/** One foreground work; its successor is an edge in depth, never a row of small cards. */
export function depthQueuePose(offset:number,width:number,mobile:boolean) {
  const distance=Math.abs(offset), next=offset>=0, span=mobile?.43:.22
  const z=-Math.pow(distance,1.12)*(mobile?340:next?650:840)
  const x=offset*width*span
  const y=distance*(mobile?16:26)
  const turn=-Math.max(-1,Math.min(1,offset))*(mobile?14:24)
  const crop=smooth(distance/(mobile?1.5:1.35))*(next?(mobile?94:100):75)
  return {
    transform:`translate(-50%,-50%) translate3d(${x.toFixed(2)}px,${y.toFixed(2)}px,${z.toFixed(2)}px) rotateY(${turn.toFixed(2)}deg)`,
    clip:`inset(0 ${next?0:crop.toFixed(2)}% 0 ${next?crop.toFixed(2):0}%)`,
    visible:distance<(mobile?2:1.5), z,
  }
}
