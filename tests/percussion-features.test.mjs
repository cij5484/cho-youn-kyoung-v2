import assert from 'node:assert/strict'
import {test} from 'node:test'
import { readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { percussionFeatures } from '../scripts/audio/percussion-features.mjs'
test('silence and sustained Haegeum-range harmonic tone do not produce percussion candidates',()=>{
  const sr=22050
  const silence=percussionFeatures(new Float32Array(sr*2),sr)
  assert.equal(silence.hits.length,0)
  const tone=Float32Array.from({length:sr*2},(_,i)=>.2*Math.sin(2*Math.PI*880*i/sr))
  assert.equal(percussionFeatures(tone,sr).hits.length,0)
})
test('bass + broadband percussive bursts are detected conservatively, deterministically',()=>{
  const sr=22050;let seed=13
  const pcm=Float32Array.from({length:sr*2},(_,i)=>{const t=i/sr,age=t-.5;seed=(1664525*seed+1013904223)>>>0;return age>=0&&age<.3?Math.exp(-age*32)*(.5*Math.sin(2*Math.PI*120*age)+.24*(seed/2**32-.5)):0})
  const a=percussionFeatures(pcm,sr),b=percussionFeatures(pcm,sr)
  assert.deepEqual(a,b);assert.ok(a.hits.some(h=>Math.abs(h.time-.5)<.04));assert.ok(a.hits.length<=2)
})
test('bright high-only transients cannot masquerade as a low/body percussion strike',()=>{
  const sr=22050;let seed=13,prior=0
  const pcm=Float32Array.from({length:sr*2},(_,i)=>{
    const age=i/sr-.5;seed=(1664525*seed+1013904223)>>>0;const noise=seed/2**32-.5,high=noise-prior;prior=noise
    return age>=0&&age<.3?Math.exp(-age*32)*high*.3:0
  })
  assert.equal(percussionFeatures(pcm,sr).hits.length,0)
})

test('fixture is bound to retained audio bytes, sorted, and minimum-spaced; labels stay provisional',()=>{
  const data=JSON.parse(readFileSync('src/interaction-prototype/percussion.json','utf8'))
  assert.equal(data.sourceSha256,createHash('sha256').update(readFileSync('src/sound/assets/hanbeomsu-jungjungmori-preview.m4a')).digest('hex'))
  assert.match(data.method,/NOT verified Janggu/);assert.ok(data.hits.length>0&&data.hits.length<30)
  for(let i=0;i<data.hits.length;i++){assert.ok(data.hits[i].time>=0&&data.hits[i].time<data.duration);if(i)assert.ok(data.hits[i].time-data.hits[i-1].time>=.18)}
})
test('refined detector still covers user-confirmed approximate Janggu attack regions without timestamp cues',()=>{
  const pcm=JSON.parse(readFileSync('src/interaction-prototype/percussion.json','utf8'))
  const review=JSON.parse(readFileSync('evidence/p2k/user-hit-review.json','utf8'))
  for(const {label,reviewWindow:[start,end]} of review.regions)assert.ok(pcm.hits.some(hit=>hit.score>=.76&&hit.time>=start&&hit.time<=end),label)
})
