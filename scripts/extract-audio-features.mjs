/* global OfflineAudioContext */
import { chromium } from '@playwright/test'
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { createHash } from 'node:crypto'
import { extractFeatures } from './audio/extract-features.mjs'
import { validAudioFeatures } from '../src/audio/features.ts'

// Explicit manifest input keeps private masters and unapproved album batches out of accidental discovery.
const manifestPath = process.argv[2]
if (!manifestPath) throw new Error('Usage: node scripts/extract-audio-features.mjs <manifest.json>')
const manifest = JSON.parse(readFileSync(manifestPath, 'utf8')), outputs = [], ids = new Set(), destinations = new Set()
if (!Array.isArray(manifest.tracks) || !manifest.tracks.length) throw new Error('Manifest requires tracks')
const inputs = new Set(manifest.tracks.map(track => resolve(track.input)))
for (const track of manifest.tracks) {
  if (!track.trackId || !track.input || !track.output || ids.has(track.trackId) || destinations.has(resolve(track.output))) throw new Error('Unique trackId/input/output required')
  if (inputs.has(resolve(track.output))) throw new Error('Output must not replace any source audio')
  ids.add(track.trackId); destinations.add(resolve(track.output))
}
const browser = await chromium.launch()
try {
  const page = await browser.newPage()
  for (const track of manifest.tracks) {
    const bytes = readFileSync(track.input), sourceSha256 = createHash('sha256').update(bytes).digest('hex')
    const started = performance.now()
    // Pinned local Chromium decoder supports the current AAC excerpt; nothing is uploaded or played aloud.
    const decoded = await page.evaluate(async encoded => {
      const context = new OfflineAudioContext(1, 1, 22050)
      const buffer = await context.decodeAudioData(Uint8Array.from(atob(encoded), c => c.charCodeAt(0)).buffer)
      const mono = new Float32Array(buffer.length)
      for (let channel = 0; channel < buffer.numberOfChannels; channel++) {
        const samples = buffer.getChannelData(channel)
        for (let i=0; i<mono.length; i++) mono[i] += samples[i] / buffer.numberOfChannels
      }
      return { sampleRate: buffer.sampleRate, samples: [...mono] }
    }, bytes.toString('base64'))
    const data = extractFeatures(decoded.samples, decoded.sampleRate, { trackId: track.trackId, sourceSha256 })
    if (!validAudioFeatures(data)) throw new Error(`Invalid features: ${track.trackId}`)
    const json = JSON.stringify(data)+'\n'
    mkdirSync(dirname(resolve(track.output)), {recursive:true}); writeFileSync(track.output,json)
    outputs.push({trackId:track.trackId,input:track.input,output:track.output,sourceSha256,featureSha256:createHash('sha256').update(json).digest('hex'),audioBytes:bytes.length,featureBytes:Buffer.byteLength(json),frames:data.energy.length,onsets:data.onsets.filter(n=>n>0).length,duration:data.duration,elapsedMs:Math.round(performance.now()-started),decoder:`Chromium ${browser.version()}`})
  }
} finally { await browser.close() }
console.log(JSON.stringify(outputs,null,2))
