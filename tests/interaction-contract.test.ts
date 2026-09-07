import assert from 'node:assert/strict'
import { test } from 'node:test'
import { freePoint, project, pointAt, hitDisplacement, createJangguOrbit, jangguPoint, PathHistory, sharedGlyphs } from '../src/interaction-prototype/model.ts'
import { interactionTuning as tuning } from '../src/interaction-prototype/tuning.ts'
import { createTrailSampler, trailNormal, trailEdge } from '../src/motion/trail-geometry.ts'
test('two projected trajectories stay bounded, change depth and preserve frame-independent position',()=>{
  for(const width of [320,390,1440])for(let i=0;i<2;i++){
    const points=Array.from({length:1200},(_,n)=>project(freePoint(n/60,i),width,1000))
    assert.ok(points.every(p=>p.x>=0&&p.x<=width&&p.y>0&&p.y<1000))
    assert.ok(Math.min(...points.map(p=>p.z))<-.25&&Math.max(...points.map(p=>p.z))>.25)
    // Depth remains in projection/trails; the refined head must not swell into a circular protagonist.
    assert.ok(points.every(p=>p.radius<1));assert.equal(Math.max(...points.map(p=>p.radius)),Math.min(...points.map(p=>p.radius)))
    assert.ok(points.slice(1).every((p,n)=>Math.hypot(p.x-points[n].x,p.y-points[n].y)<20))
  }
})
test('lock-on is exact and independent of decorative time',()=>{
  const target={x:718,y:417,z:0}
  for(const time of [0,1,5,100])for(let i=0;i<2;i++){
    const p=pointAt(time,i,1,target,1440,1000);assert.equal(p.x,target.x);assert.equal(p.y,target.y);assert.equal(p.z,0)
  }
})
test('a Janggu hit changes y only, is always upward and returns smoothly',()=>{
  let min=0
  for(let i=0;i<1000;i++){
    const offset=hitDisplacement(i/1000);assert.ok(offset<=0);min=Math.min(min,offset)
  }
  assert.ok(Math.abs(min+tuning.janggu.jumpHeight)<.1)
  assert.equal(hitDisplacement(0),0);assert.ok(Math.abs(hitDisplacement(1.6))<.01)
  assert.ok(Math.abs(hitDisplacement(.0001))<.001)
})
test('playing orbit widens and accelerates continuously, pause returns smoothly, head stays fixed',()=>{
  const orbit=createJangguOrbit();let previous=jangguPoint(0,0,1440,1000),state={phase:0,activity:0}
  const travel=[0,0,0]
  for(let i=0;i<1800;i++){
    const segment=Math.floor(i/600);state=orbit.advance(1/120,segment===1)
    const point=jangguPoint(state.phase,state.activity,1440,1000),step=Math.abs(point.x-previous.x)
    assert.ok(step<10);assert.ok(point.x>0&&point.x<1440);assert.equal(point.radius,previous.radius)
    travel[segment]+=step;previous=point
  }
  assert.ok(travel[1]>travel[0]*2);assert.ok(state.activity<.001)
})

test('long trail retains its time window at both 60Hz and 240Hz with bounded samples',()=>{
  for(const hz of [60,240])for(const mobile of [false,true]){
    const h=new PathHistory(mobile?tuning.home.historyMobile:tuning.home.historyDesktop),sampleHz=mobile?tuning.home.sampleHzMobile:tuning.home.sampleHzDesktop
    for(let i=0;i<=hz*4;i++)h.add({x:i/hz,y:0,z:0,radius:.65},i/hz,1/sampleHz)
    const times:number[]=[];h.each(p=>times.push(p.time))
    assert.ok(times.at(-1)!-times[0]>=tuning.home.trailMs/1000);assert.ok(h.count<=h.values.length)
  }
})

test('trail allocation stays bounded and visits actual history chronologically',()=>{
  const h=new PathHistory(36)
  for(let i=0;i<10000;i++)h.add({x:i,y:i/2,z:0,radius:3},i/60)
  const values:number[]=[];h.each(p=>values.push(p.x));assert.equal(h.values.length,36);assert.equal(h.count,36)
  assert.deepEqual(values,Array.from({length:36},(_,i)=>9964+i));h.clear();assert.equal(h.count,0)
})
test('shared glyphs are unique, retain duplicates and exact slots, and never invent characters',()=>{
  for(const a of ['PLAY','PAUSE','RESUME','REPLAY','LISTEN','RETRY','AAAA'])for(const b of ['PLAY','PAUSE','RESUME','REPLAY','AAAA']){
    const matches=sharedGlyphs(a,b);assert.equal(new Set(matches.map(m=>m.from)).size,matches.length);assert.equal(new Set(matches.map(m=>m.to)).size,matches.length)
    for(const m of matches){assert.equal(a[m.from],m.char);assert.equal(b[m.to],m.char)}
    for(let i=0;i<Math.min(a.length,b.length);i++)if(a[i]===b[i])assert.ok(matches.some(m=>m.from===i&&m.to===i))
    const possible=[...new Set(a+b)].reduce((n,c)=>n+Math.min([...a].filter(v=>v===c).length,[...b].filter(v=>v===c).length),0)
    assert.equal(matches.length,possible)
  }
})

test('ribbon geometry preserves the approved bow edge math and smooths rapid jumps without overshoot',()=>{
  const a={x:5,y:15},b={x:45,y:-10},normal=trailNormal(a,b),edge=trailEdge(a,normal,1.6),length=Math.hypot(b.x-a.x,b.y-a.y)
  assert.equal(edge.x,a.x-(b.y-a.y)/length*1.6);assert.equal(edge.y,a.y+(b.x-a.x)/length*1.6)
  const sampler=createTrailSampler(),source=[{x:0,y:0,z:0,time:0},{x:15,y:-43,z:.1,time:1/30},{x:30,y:-20,z:0,time:2/30},{x:45,y:0,z:-.1,time:3/30}]
  sampler.resample(source,2);const points=sampler.points.slice(0,sampler.count)
  assert.ok(points.length>source.length*4)
  for(const p of source)assert.ok(points.some(v=>Math.hypot(v.x-p.x,v.y-p.y)<1e-9))
  for(let i=1;i<points.length;i++){
    assert.ok(Math.hypot(points[i].x-points[i-1].x,points[i].y-points[i-1].y)<3)
    assert.ok(points[i].y>=-43&&points[i].y<=0);assert.ok(points[i].time>=points[i-1].time)
  }
})
