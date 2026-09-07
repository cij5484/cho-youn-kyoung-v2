/* global OfflineAudioContext */
import { chromium } from '@playwright/test'
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { percussionFeatures } from './audio/percussion-features.mjs'
const input='src/sound/assets/hanbeomsu-jungjungmori-preview.m4a',bytes=readFileSync(input),browser=await chromium.launch()
try {
  const page=await browser.newPage(),pcm=await page.evaluate(async base64=>{
    const context=new OfflineAudioContext(1,1,22050),buffer=await context.decodeAudioData(Uint8Array.from(atob(base64),c=>c.charCodeAt(0)).buffer)
    const samples=new Float32Array(buffer.length)
    for(let c=0;c<buffer.numberOfChannels;c++){const data=buffer.getChannelData(c);for(let i=0;i<samples.length;i++)samples[i]+=data[i]/buffer.numberOfChannels}
    return {samples:[...samples],sampleRate:buffer.sampleRate,duration:buffer.duration}
  },bytes.toString('base64'))
  const {hits,frames}=percussionFeatures(pcm.samples,pcm.sampleRate)
  const data={version:'p2k-percussion-candidates/2',trackId:'home-hanbeomsu-jungjungmori-preview',sourceSha256:createHash('sha256').update(bytes).digest('hex'),duration:pcm.duration,method:'60–240Hz bass AND 240–700Hz body onset + 2–7kHz flux/flatness; no high-only trigger; mixed-source estimate, NOT verified Janggu labels',hits}
  writeFileSync('src/interaction-prototype/percussion.json',JSON.stringify(data)+'\n')
  // Prior review evidence is immutable; regeneration diagnostics belong to the ignored local cache.
  mkdirSync('.checkpoints',{recursive:true})
  writeFileSync('.checkpoints/p2k-percussion-current.json',JSON.stringify({...data,decoder:browser.version(),sampleRate:pcm.sampleRate,frameRate:pcm.sampleRate/Math.round(pcm.sampleRate/100),frames},null,2)+'\n')
  console.log(JSON.stringify({candidates:hits.length,conservative:hits.filter(h=>h.score>=.76).length,hits},null,2))
} finally {await browser.close()}
