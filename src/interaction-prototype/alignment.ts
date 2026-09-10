import type { Point3 } from './model.ts'
import { mix, smooth } from './tuning.ts'
// Authored against the actual retained WebPs. Below-hand spans avoid pretending hidden strings are visible.
// Full is explicitly AI editorial; these coordinates express visual fit, never authentic geometry.
export const stringAlignment = {
  head: {selector:'.portrait-instrument', spans:[[[.363,.341],[.368,.410]],[[.374,.394],[.372,.423]]] },
  playing: {selector:'.playing-image', spans:[[[.682,.502],[.661,.574]],[[.687,.503],[.665,.574]]] },
  full: {selector:'.editorial-image', spans:[[[.406,.434],[.414,.79]],[[.411,.434],[.418,.79]]] },
} as const
// Maps source pixels through the image's actual rendered rect and object-fit/object-position.
function sourceFrame(img:HTMLImageElement, stage:DOMRect) {
  const rect=img.getBoundingClientRect(), css=getComputedStyle(img)
  let width=rect.width,height=rect.height,x=rect.left-stage.left,y=rect.top-stage.top
  if(css.objectFit==='cover'||css.objectFit==='contain'){
    const scale=(css.objectFit==='cover'?Math.max:Math.min)(width/img.naturalWidth,height/img.naturalHeight)
    const iw=img.naturalWidth*scale,ih=img.naturalHeight*scale
    const pos=css.objectPosition.split(' ').map(n=>parseFloat(n)/100)
    x+=(width-iw)*(pos[0]??.5);y+=(height-ih)*(pos[1]??.5);width=iw;height=ih
  }
  return {x,y,width,height}
}
export function alignedTargets(root:HTMLElement, stage:DOMRect, p:number,time:number):Point3[] {
  // The photographs move: share measurements only within this frame, never across frames.
  const frames = {
    head: sourceFrame(root.querySelector<HTMLImageElement>(stringAlignment.head.selector)!,stage),
    playing: sourceFrame(root.querySelector<HTMLImageElement>(stringAlignment.playing.selector)!,stage),
    full: sourceFrame(root.querySelector<HTMLImageElement>(stringAlignment.full.selector)!,stage),
  }
  return [0,1].map(index=>{
  const sample=(name:keyof typeof stringAlignment)=>{
    const span=stringAlignment[name].spans[index],frame=frames[name]
    // Lock constrains motion to the photographed string, rather than freezing a dot at one pixel.
    const along=.36+index*.27+Math.sin(time*.65+index)*.15
    return {x:frame.x+mix(span[0][0],span[1][0],along)*frame.width,
      y:frame.y+mix(span[0][1],span[1][1],along)*frame.height}
  }
  const head=sample('head'),playing=sample('playing'),full=sample('full'),a=smooth(p,.42,.575),b=smooth(p,.795,.975)
  return {x:mix(mix(head.x,playing.x,a),full.x,b),y:mix(mix(head.y,playing.y,a),full.y,b),z:0}
  })
}
