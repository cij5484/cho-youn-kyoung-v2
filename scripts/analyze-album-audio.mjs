/* global OfflineAudioContext */
import { chromium } from '@playwright/test'
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { createHash } from 'node:crypto'
import { extractFeatures } from './audio/extract-features.mjs'
import { percussionFeatures } from './audio/percussion-features.mjs'
import { validAudioFeatures } from '../src/audio/features.ts'

// Usage: node scripts/analyze-album-audio.mjs [recordings.json] [output directory]
const manifest = JSON.parse(await readFile(process.argv[2] || 'src/audio/recordings.json', 'utf8'))
const output = resolve(process.argv[3] || 'src/audio/analysis'), ids = new Set()
if (!Array.isArray(manifest) || !manifest.length) throw new Error('Expected recordings[]')
for (const track of manifest) {
  if (!/^[a-z0-9_-]+\/[a-z0-9_-]+\.mp3$/i.test(track.path) || ids.has(track.path)
    || !/^[a-f0-9]{64}$/.test(track.sha256) || !Number.isSafeInteger(track.bytes) || track.bytes <= 0
    || new URL(track.source).protocol !== 'https:') throw new Error(`Invalid or duplicate recording: ${track.path}`)
  ids.add(track.path)
}
await mkdir(output, { recursive: true })
const report = [], browser = await chromium.launch()
try {
  for (const track of manifest) {
    const stem = track.path.replace(/\.mp3$/i, ''), trackId = `album:${stem.replace('/', ':')}`
    const started = performance.now(), cache = resolve('.cache/album-audio', track.path)
    let page
    try {
      let bytes = await readFile(cache).catch(error => { if (error.code !== 'ENOENT') throw error; return null })
      const cached = Boolean(bytes)
      if (!bytes) {
        const response = await fetch(track.source, { signal: AbortSignal.timeout(120000) })
        if (!response.ok) throw new Error(`Download HTTP ${response.status}`)
        bytes = Buffer.from(await response.arrayBuffer())
      }
      const sourceSha256 = createHash('sha256').update(bytes).digest('hex')
      if (bytes.length !== track.bytes || sourceSha256 !== track.sha256) throw new Error('Source byte size / SHA-256 mismatch')
      if (!cached) { await mkdir(dirname(cache), { recursive: true }); await writeFile(cache, bytes) }
      page = await browser.newPage()
      // Same Chromium 22050Hz mono decoder as the pilot. Binary transfer avoids millions of JSON numbers.
      const decoded = await page.evaluate(async encoded => {
        const context = new OfflineAudioContext(1, 1, 22050)
        const buffer = await context.decodeAudioData(Uint8Array.from(atob(encoded), c => c.charCodeAt(0)).buffer)
        const mono = new Float32Array(buffer.length)
        for (let channel = 0; channel < buffer.numberOfChannels; channel++) {
          const samples = buffer.getChannelData(channel)
          for (let i = 0; i < mono.length; i++) mono[i] += samples[i] / buffer.numberOfChannels
        }
        const bytes = new Uint8Array(mono.buffer), pieces = []
        for (let i = 0; i < bytes.length; i += 32768) pieces.push(String.fromCharCode(...bytes.subarray(i, i + 32768)))
        return { sampleRate: buffer.sampleRate, pcm: btoa(pieces.join('')) }
      }, bytes.toString('base64'))
      await page.close(); page = null
      const binary = Buffer.from(decoded.pcm, 'base64')
      const samples = new Float32Array(binary.buffer, binary.byteOffset, binary.length / 4)
      const identity = { trackId, sourceSha256 }
      const features = extractFeatures(samples, decoded.sampleRate, identity)
      if (!validAudioFeatures(features)) throw new Error('Invalid bow features')
      const { hits } = percussionFeatures(samples, decoded.sampleRate)
      const percussion = { version: 'p2k-percussion-candidates/2', ...identity, duration: features.duration,
        method: '60–240Hz bass AND 240–700Hz body onset + 2–7kHz flux/flatness; no high-only trigger; mixed-source estimate, NOT verified Janggu labels', hits }
      if (!hits.every((hit, i) => Number.isFinite(hit.time) && hit.time >= 0 && hit.time < features.duration
        && Number.isFinite(hit.score) && hit.score >= 0 && hit.score <= 1 && Number.isFinite(hit.flatness)
        && hit.flatness >= 0 && hit.flatness <= 1 && (!i || hit.time - hits[i - 1].time >= .1799))) throw new Error('Invalid percussion candidates')
      const paths = [`${stem}.features.json`, `${stem}.percussion.json`]
      for (const [i, data] of [features, percussion].entries()) {
        const destination = resolve(output, paths[i])
        await mkdir(dirname(destination), { recursive: true })
        await writeFile(destination, JSON.stringify(data) + '\n')
        if (JSON.stringify(JSON.parse(await readFile(destination, 'utf8'))) !== JSON.stringify(data)) throw new Error('JSON round-trip mismatch')
      }
      const result = { trackId, source: track.source, sourceSha256, shaVerified: true, duration: features.duration,
        featureFrames: features.energy.length, onsets: features.onsets.filter(Boolean).length,
        percussionCandidates: hits.length, candidatesPerMinute: +(hits.length * 60 / features.duration).toFixed(2),
        outputs: paths, elapsedMs: Math.round(performance.now() - started), warnings: hits.length ? [] : ['No percussion candidates; review before visual use'] }
      report.push(result)
      console.log(`${report.length}/${manifest.length} ${trackId}: ${hits.length} candidates, SHA verified`)
    } catch (error) {
      report.push({ trackId, source: track.source, error: String(error.message) })
      console.error(`${trackId}: ${error.message}`)
    } finally { await page?.close() }
  }
} finally { await browser.close() }
await writeFile(resolve(output, 'batch-summary.json'), JSON.stringify({ decoder: `Chromium ${browser.version()}`, tracks: report }, null, 2) + '\n')
if (report.some(track => track.error)) process.exitCode = 1
