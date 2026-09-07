export type TrailPoint = {x:number;y:number}
export type TrailSample = TrailPoint & {z:number;time:number}

/** Shared by the approved SVG bow ribbon and the Canvas instrument trails. */
export function trailNormal(a:TrailPoint,b:TrailPoint) {
  const length=Math.max(.001,Math.hypot(b.x-a.x,b.y-a.y))
  return {x:-(b.y-a.y)/length,y:(b.x-a.x)/length}
}
export function trailEdge(point:TrailPoint,normal:TrailPoint,halfWidth:number) {
  return {x:point.x+normal.x*halfWidth,y:point.y+normal.y*halfWidth}
}
// Component-wise monotone Hermite tangents pass through real samples without overshooting a hit/turn.
const tangent=(a:number,b:number,c:number)=>{
  const left=b-a,right=c-b
  return left*right<=0?0:Math.sign(left)*Math.min(Math.abs((left+right)/2),3*Math.abs(left),3*Math.abs(right))
}
function interpolate(a:number,b:number,c:number,d:number,t:number) {
  const t2=t*t,t3=t2*t
  return (2*t3-3*t2+1)*b+(t3-2*t2+t)*tangent(a,b,c)+(-2*t3+3*t2)*c+(t3-t2)*tangent(b,c,d)
}

/** Reusable allocation; subdivision is visual geometry, never a replacement audio/event clock. */
export function createTrailSampler(capacity=4096) {
  const points:TrailSample[]=Array.from({length:capacity},()=>({x:0,y:0,z:0,time:0}))
  return {points,count:0,resample(source:readonly TrailSample[],maxStep=2){
    this.count=0
    if(!source.length)return
    Object.assign(points[this.count++],source[0])
    for(let i=0;i<source.length-1;i++){
      const a=source[Math.max(0,i-1)],b=source[i],c=source[i+1],d=source[Math.min(source.length-1,i+2)]
      const reserve=source.length-i-2,steps=Math.max(1,Math.min(32,capacity-this.count-reserve,Math.ceil(Math.hypot(c.x-b.x,c.y-b.y)*1.5/maxStep)))
      for(let j=1;j<=steps&&this.count<capacity;j++){
        const t=j/steps,p=points[this.count++]
        p.x=interpolate(a.x,b.x,c.x,d.x,t);p.y=interpolate(a.y,b.y,c.y,d.y,t)
        p.z=b.z+(c.z-b.z)*t;p.time=b.time+(c.time-b.time)*t
      }
    }
  }}
}
