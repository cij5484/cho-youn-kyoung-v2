import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { extractFeatures } from '../scripts/audio/extract-features.mjs'
import { validAudioFeatures, bindAudioFeatures, sampleAudioFeatures } from '../src/audio/features.ts'

const identity = { trackId:'neutral-contract', sourceSha256:'a'.repeat(64) }
const tone = (seconds=3, changing=false) => Float32Array.from({length:22050*seconds},(_,i)=>{
  const t=i/22050, hz=changing && t>=1.5 ? 880 : 440
  return .15*Math.sin(2*Math.PI*hz*t)*Math.min(1,t*20,(seconds-t)*20)
})
const fixture = () => extractFeatures(tone(),22050,identity)

test('feature contract rejects malformed and stale data; binding cannot silently use another track',()=>{
  const data=fixture();assert.ok(validAudioFeatures(data))
  for(const bad of [null,{}, {...data,trackId:7}, {...data,analysisVersion:'next'}, {...data,featureRate:0},
    {...data,duration:Infinity}, {...data,energy:[0]}, {...data,onsets:data.onsets.map(()=>NaN)},
    {...data,spectralFlux:data.spectralFlux.map(()=>1001)}, {...data,pitchContour:{}}, {...data,sourceSha256:'wrong'}])assert.equal(validAudioFeatures(bad),false)
  const expected={...identity,duration:3}
  assert.equal(bindAudioFeatures(data,expected),data)
  for(const change of [{trackId:'other'},{sourceSha256:'b'.repeat(64)},{duration:4}])assert.equal(bindAudioFeatures(data,{...expected,...change}),null)
})

test('absolute media time interpolates bounded features, including seeks and replay; no accumulated events',()=>{
  const d=fixture();d.energy[0]=0;d.energy[1]=1000;d.onsets[0]=0;d.onsets[1]=1000
  assert.equal(sampleAudioFeatures(d,.02).energy,.5);assert.equal(sampleAudioFeatures(d,.02).onset,.5)
  const start=sampleAudioFeatures(d,0);sampleAudioFeatures(d,2.5);assert.deepEqual(sampleAudioFeatures(d,0),start)
  for(const seconds of [-1,NaN,Infinity,3,500])assert.deepEqual(sampleAudioFeatures(d,seconds),{energy:0,onset:0,spectralFlux:0,phrase:0,pitchMidi:null,pitchConfidence:0})
})

test('pitch only interpolates adjacent reliable voiced frames; mixed recording has pitch disabled',()=>{
  const d=fixture(),n=d.energy.length
  assert.equal(d.pitchContour,null)
  d.pitchContour={midi:Array(n).fill(60),confidence:Array(n).fill(950)};d.pitchContour.midi[1]=72
  assert.ok(validAudioFeatures(d));assert.equal(sampleAudioFeatures(d,.02).pitchMidi,66)
  d.pitchContour.confidence[1]=700;assert.equal(sampleAudioFeatures(d,.02).pitchMidi,null)
})

test('offline extraction is deterministic and independent of track identity; silence does not invent onsets',()=>{
  const a=fixture(),b=fixture();assert.deepEqual(a,b)
  assert.deepEqual(extractFeatures(tone(),22050,{...identity,trackId:'another'}).energy,a.energy)
  const silent=extractFeatures(new Float32Array(22050),22050,identity)
  for(const name of ['energy','onsets','spectralFlux','phraseEnvelope'])assert.ok(silent[name].every(n=>n===0))
  assert.throws(()=>extractFeatures(tone(),0,identity));assert.throws(()=>extractFeatures(tone(),22050,identity,0))
})

test('same-level timbre change produces flux and an onset distinct from energy and a beat grid',()=>{
  const calm=fixture(),change=extractFeatures(tone(3,true),22050,identity),region=(a)=>a.slice(35,42)
  assert.ok(Math.max(...region(change.spectralFlux))>Math.max(...region(calm.spectralFlux))+.15*1000)
  assert.ok(region(change.onsets).some(n=>n>0));assert.ok(region(calm.onsets).every(n=>n===0))
  assert.ok(Math.abs(change.energy[39]-calm.energy[39])<20)
  assert.ok(change.onsets.filter(Boolean).length<5)
})

test('checked-in feature identity matches the approved audio bytes and remains small',()=>{
  const source=readFileSync('src/sound/assets/hanbeomsu-jungjungmori-preview.m4a')
  const json=readFileSync('src/sound/assets/hanbeomsu-jungjungmori.features.json'),d=JSON.parse(json)
  assert.ok(validAudioFeatures(d));assert.equal(d.sourceSha256,createHash('sha256').update(source).digest('hex'))
  assert.equal(d.featureRate,25);assert.equal(d.energy.length,450);assert.equal(d.pitchContour,null)
  assert.ok(json.length<source.length*.03);assert.ok(bindAudioFeatures(d,{trackId:d.trackId,sourceSha256:d.sourceSha256,duration:18}))
})
