import { test } from 'node:test'
import assert from 'node:assert/strict'
import { createContactMotion, type ContactActivity } from '../src/sound/contact-motion.ts'
const signal=(gain:number)=>Float32Array.from({length:1024},(_,i)=>Math.sin(i*.35)*gain)
const run=(model:ReturnType<typeof createContactMotion>,gain:number,frames:number,dt=1000/60,intensity:ContactActivity='bold')=>{
  const samples=signal(gain)
  let state=model.advance(0,true,intensity)
  for(let i=0;i<frames;i++){model.sample(samples,dt);state=model.advance(dt,true,intensity)}
  return state
}
test('silence and DC produce neither bow traversal nor an invented playback response',()=>{
  for(const samples of [null,new Float32Array(1024),new Float32Array(1024).fill(.4)]){
    const model=createContactMotion(),initial=model.advance(0,false)
    for(let i=0;i<100;i++){model.sample(samples,16);model.advance(16,true)}
    assert.deepEqual(model.advance(0,true),initial)
  }
})
test('higher real signal energy increases speed/range; B1 remains an active comparison',()=>{
  const low=run(createContactMotion(),.05,180),high=run(createContactMotion(),.24,180),medium=run(createContactMotion(),.24,180,1000/60,'medium')
  assert.ok(high.rate>low.rate*1.4);assert.ok(high.range>low.range)
  assert.ok(high.rate>medium.rate*1.2);assert.ok(medium.rate>.7)
})
test('waveform polarity does not become noisy marker coordinates',()=>{
  const a=createContactMotion(),b=createContactMotion(),samples=signal(.2),inverted=samples.map(x=>-x)
  for(let i=0;i<300;i++){
    a.sample(samples,16);b.sample(i%2?inverted:samples,16)
    assert.deepEqual(a.advance(16,true),b.advance(16,true))
  }
})
test('turns decelerate continuously; sudden energy/profile changes do not teleport or flip velocity',()=>{
  const model=createContactMotion();run(model,.15,150)
  let before=model.advance(0,true),previousVelocity=0,turns=0,maxAcceleration=0
  for(let i=0;i<2500;i++){
    model.sample(signal(i>1250?.3:.15),2)
    const now=model.advance(2,true,i>1800?'medium':'bold')
    const velocity=(now.vertical-before.vertical)/.002
    if(i>1){maxAcceleration=Math.max(maxAcceleration,Math.abs(velocity-previousVelocity)/.002);if(previousVelocity*velocity<0){turns++;assert.ok(Math.abs(velocity)<.5)}}
    assert.ok(Math.abs(now.vertical-before.vertical)<.03)
    before=now;previousVelocity=velocity
  }
  assert.ok(turns>=8);assert.ok(maxAcceleration<210)
})
test('pause has finite damping, settles with no further travel, re-entry preserves position at dt=0',()=>{
  const model=createContactMotion();const before=run(model,.2,120)
  model.sample(null,0);assert.deepEqual(model.advance(0,false),before)
  let settled=before
  for(let i=0;i<120;i++)settled=model.advance(16,false)
  assert.equal(settled.presence,0);assert.equal(settled.unsettled,false)
  const reentry=model.advance(0,true);assert.deepEqual(reentry,settled)
  model.sample(signal(.2),16);const next=model.advance(16,true)
  assert.ok(Math.abs(next.vertical-settled.vertical)<.01)
})
test('trajectory remains close across 60Hz and 120Hz display cadence',()=>{
  const slow=run(createContactMotion(),.2,360,1000/60),fast=run(createContactMotion(),.2,720,1000/120)
  assert.ok(Math.abs(slow.phase-fast.phase)<.025)
  assert.ok(Math.abs(slow.range-fast.range)<.002)
})
