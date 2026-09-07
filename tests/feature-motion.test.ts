import { test } from 'node:test'
import assert from 'node:assert/strict'
import { createContactMotion } from '../src/sound/contact-motion.ts'
import { tuningPresets, type BowTuningPreset } from '../src/sound/tuning-presets.ts'
import type { AudioFeatureFrame } from '../src/audio/features.ts'

const signal=Float32Array.from({length:1024},(_,i)=>Math.sin(i*.35)*.14)
const base:AudioFeatureFrame={energy:.5,onset:0,spectralFlux:0,phrase:.5,pitchMidi:null,pitchConfidence:0}
const home=tuningPresets.HOME_SIGNATURE
function run(model:ReturnType<typeof createContactMotion>,frame:AudioFeatureFrame,ms:number,dt=2,preset:BowTuningPreset=home){
  let state=model.advance(0,true,'bold',preset)
  for(let i=0;i<ms/dt;i++){model.sample(signal,dt,frame);state=model.advance(dt,true,'bold',preset)}return state
}
test('onset boosts acceleration within 60ms, with no position jump at the event boundary',()=>{
  const a=createContactMotion(),b=createContactMotion();run(a,base,1000);const before=run(b,base,1000)
  const onset={...base,onset:1};b.sample(signal,0,onset)
  assert.deepEqual(b.advance(0,true,'bold',home),before)
  const calm=run(a,base,60),hit=run(b,onset,60)
  assert.ok(hit.rate>calm.rate+.4);assert.ok(hit.rate<=home.maxSpeed)
})
test('flux increases reversal activity at constant energy; phrase broadens deterministic lateral travel',()=>{
  const calm=run(createContactMotion(),base,4000),active=run(createContactMotion(),{...base,spectralFlux:1,phrase:1},4000)
  assert.ok(active.phase>calm.phase+2);assert.ok(active.range>calm.range)
  assert.notEqual(active.lateral,calm.lateral)
  assert.deepEqual(active,run(createContactMotion(),{...base,spectralFlux:1,phrase:1},4000))
})
test('fast attack and slower release respond to energy without applying raw values to coordinates',()=>{
  const m=createContactMotion();run(m,{...base,energy:.1},1000)
  const high=run(m,{...base,energy:1},40);assert.ok(high.activity>.8)
  const release=run(m,{...base,energy:.1},40);assert.ok(release.activity>.5)
  const settled=run(m,{...base,energy:.1},1200);assert.ok(settled.activity<.2)
})
test('high sensitivity stays continuous through bursts, waveform inversion and reversals',()=>{
  const m=createContactMotion(),inverse=createContactMotion();let prior=m.advance(0,true,'bold',home),lastVelocity=0,turns=0,maxAcceleration=0
  for(let i=0;i<4000;i++){
    const frame={...base,energy:i%500<250?.9:.2,onset:i%100<20?1:0,spectralFlux:i%400<200?.8:0}
    m.sample(signal,2,frame);inverse.sample(i%2?signal.map(x=>-x):signal,2,frame)
    const now=m.advance(2,true,'bold',home);assert.deepEqual(now,inverse.advance(2,true,'bold',home))
    const velocity=(now.vertical-prior.vertical)/.002
    if(i>1){maxAcceleration=Math.max(maxAcceleration,Math.abs(velocity-lastVelocity)/.002);if(velocity*lastVelocity<0){turns++;assert.ok(Math.abs(velocity)<1)}}
    assert.ok(Math.abs(now.vertical-prior.vertical)<.045);assert.ok(now.rate<=home.maxSpeed+.01)
    prior=now;lastVelocity=velocity
  }
  assert.ok(turns>25);assert.ok(maxAcceleration<500)
})
test('pitch influence is opt-in and confidence-gated; reliable contour adds a smooth upward bias',()=>{
  const high={...base,pitchMidi:88,pitchConfidence:.95},low={...base,pitchMidi:45,pitchConfidence:.95}
  assert.deepEqual(run(createContactMotion(),high,1000),run(createContactMotion(),low,1000))
  const preset={...home,pitchInfluence:.15}
  const up=run(createContactMotion(),high,2000,2,preset),down=run(createContactMotion(),low,2000,2,preset)
  assert.ok(up.pitch<-.14);assert.ok(down.pitch>.14)
  assert.equal(run(createContactMotion(),{...high,pitchConfidence:.3},2000,2,preset).pitch,0)
})
test('pause/re-entry and seek do not teleport or replay missed events; cadence remains stable',()=>{
  const m=createContactMotion();const before=run(m,base,1000)
  m.sample(null,0,null);assert.deepEqual(m.advance(0,false,'bold',home),before)
  let stopped=before;for(let i=0;i<150;i++)stopped=m.advance(16,false,'bold',home)
  assert.equal(stopped.presence,0);assert.equal(stopped.unsettled,false)
  m.sample(signal,0,{...base,onset:1});assert.deepEqual(m.advance(0,true,'bold',home),stopped)
  const a=run(createContactMotion(),base,6000,1000/60),b=run(createContactMotion(),base,6000,1000/120)
  assert.ok(Math.abs(a.phase-b.phase)<.06);assert.ok(Math.abs(a.range-b.range)<.005)
})
