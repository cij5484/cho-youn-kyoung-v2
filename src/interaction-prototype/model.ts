import { interactionTuning as tuning, mix, smooth } from './tuning.ts'
export type Point3 = { x: number; y: number; z: number }
export type ProjectedPoint = Point3 & { radius: number }
export function project(point: Point3, width: number, height: number): ProjectedPoint {
  const scale = tuning.home.perspective / (tuning.home.perspective-point.z)
  return { x: width*(.5+(point.x-.5)*scale), y: height*(.5+(point.y-.5)*scale), z: point.z,
    radius: tuning.home.headRadius*(width<640?.8:1) }
}
export function freePoint(time: number, index: number): Point3 {
  const t=time*tuning.home.speed+index*Math.PI
  return { x:.5+Math.cos(t)*.34, y:.49+Math.sin(t*.83+index*.6)*tuning.home.curvature,
    z:Math.sin(t+index*.4)*tuning.home.depth }
}
export function narrative(progress: number) {
  return progress<.18 ? 'FREE MOTION' : progress<.43 ? 'HAEGEUM APPROACH' : progress<tuning.home.lockStart ? 'STRING PROXIMITY' : 'LOCK-ON'
}
export function pointAt(time: number, index: number, p: number, target: Point3, w: number, h: number) {
  const free=project(freePoint(time,index),w,h)
  const attraction=Math.pow(smooth(p,.14,.54),tuning.home.convergence)
  const lock=smooth(p,tuning.home.lockStart,tuning.home.lockEnd)
  const orbit=(1-lock)*smooth(p,.24,.5), phase=time*tuning.home.speed*1.3+index*Math.PI
  return { x:mix(free.x,target.x+Math.cos(phase)*18*orbit,attraction),
    y:mix(free.y,target.y+Math.sin(phase*.8)*12*orbit,attraction),
    z:mix(free.z,Math.sin(phase)*.13*orbit,attraction),
    radius:free.radius }
}
// A hit affects y only. This smooth pulse has zero displacement/velocity at onset and asymptotic return.
export function hitDisplacement(age: number) {
  if(age<=0 || age>1.6) return 0
  const a=tuning.janggu.jumpAttack, d=tuning.janggu.returnDamping
  const peak=a*Math.log(1+2*d/a), norm=Math.pow(1-Math.exp(-peak/a),2)*Math.exp(-peak/d)
  return -tuning.janggu.jumpHeight*Math.pow(1-Math.exp(-age/a),2)*Math.exp(-age/d)/norm
}
export function jangguPoint(phase: number, activity: number, w: number, h: number): ProjectedPoint {
  const t=phase, mobile=w<640, z=Math.sin(t*3)*tuning.janggu.depth
  const perspective=1.8/(1.8-z)
  return {x:w*(.5+Math.sin(t)*mix(tuning.janggu.idleRange,tuning.janggu.playingRange,activity)),
    y:h*(mobile?.37:.425)+(mobile?6.5:9.5)+Math.cos(t*3)*tuning.janggu.radius*(mobile?.65:1)*perspective,
    z, radius:tuning.janggu.headRadius*(mobile?.8:1) }
}
/** Integrate phase; critically damp activity so play/pause changes never reset position or velocity. */
export function createJangguOrbit() {
  let phase=0,activity=0,velocity=0
  return {advance(dt:number,playing:boolean){
    const target=playing?1:0,omega=2/tuning.janggu.activityResponse,offset=activity-target
    const c=velocity+omega*offset,decay=Math.exp(-omega*dt),prior=activity
    activity=target+(offset+c*dt)*decay;velocity=(velocity-omega*c*dt)*decay
    phase+=mix(tuning.janggu.idleSpeed,tuning.janggu.playingSpeed,(prior+activity)/2)*dt
    return {phase,activity}
  }}
}
export class PathHistory {
  readonly values: (ProjectedPoint & {time:number})[]
  cursor=0; count=0
  constructor(capacity:number) { this.values=Array.from({length:capacity},()=>({x:0,y:0,z:0,radius:0,time:0})) }
  add(point:ProjectedPoint,time:number,interval=0) {
    if(this.count&&time-this.values[(this.cursor-1+this.values.length)%this.values.length].time<interval-.001)return
    Object.assign(this.values[this.cursor],point,{time});this.cursor=(this.cursor+1)%this.values.length;this.count=Math.min(this.count+1,this.values.length)
  }
  clear(){this.count=0;this.cursor=0}
  each(callback:(point:ProjectedPoint & {time:number}, index:number)=>void){for(let i=0;i<this.count;i++)callback(this.values[(this.cursor-this.count+i+this.values.length)%this.values.length],i)}
}
/** Stable one-to-one matching. Exact slots first; remaining occurrences retain source order. */
export function sharedGlyphs(from:string,to:string) {
  const matches: {from:number;to:number;char:string}[]=[], used=new Set<number>(), assigned=new Set<number>()
  const a=[...from],b=[...to]
  b.forEach((char,i)=>{if(a[i]===char){matches.push({from:i,to:i,char});used.add(i);assigned.add(i)}})
  b.forEach((char,i)=>{if(assigned.has(i))return;const j=a.findIndex((c,k)=>c===char&&!used.has(k));if(j>=0){matches.push({from:j,to:i,char});used.add(j)}})
  return matches.sort((x,y)=>x.to-y.to)
}
