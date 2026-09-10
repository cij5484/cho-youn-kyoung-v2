/// <reference types="vite/client" />
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { registerHooks } from 'node:module'
import { test } from 'node:test'

// Let Node consume the same JSON/media imports that Vite resolves in the real response module.
const hooks = registerHooks({ load(url, context, next) {
  if (url.endsWith('.json')) return { format: 'module', source: `export default ${readFileSync(new URL(url), 'utf8')}`, shortCircuit: true }
  if (url.endsWith('.m4a')) return { format: 'module', source: `export default ${JSON.stringify(url)}`, shortCircuit: true }
  return next(url, context)
} })
const { createInstrumentResponse } = await import('../src/audio/instrument-response.ts')
hooks.deregister()

test('mixed-source response distinguishes sustained harmonics, bass/body thuds and treble noise, then decays on pause', async t => {
  let spectrum: (hz: number) => number = () => .000001
  let signal: (seconds: number) => number = () => 0
  const prior = Object.getOwnPropertyDescriptor(globalThis, 'AudioContext')
  const priorDocument = Object.getOwnPropertyDescriptor(globalThis, 'document')
  Object.defineProperty(globalThis, 'document', { configurable: true, value: { baseURI: 'http://localhost/' } })
  t.after(() => { if (priorDocument) Object.defineProperty(globalThis, 'document', priorDocument); else Reflect.deleteProperty(globalThis, 'document') })
  class MockAudioContext {
    state = 'running'; sampleRate = 48000; destination = {}
    createMediaElementSource() { return { connect() {}, disconnect() {} } }
    createAnalyser() { return { fftSize: 2048, smoothingTimeConstant: 0, disconnect() {},
      getFloatTimeDomainData(data: Float32Array) { data.forEach((_, i) => { data[i] = signal(media.currentTime + i / 48000) }) },
      getFloatFrequencyData(data: Float32Array) { data.forEach((_, i) => { data[i] = 20 * Math.log10(spectrum(i * 48000 / 2048)) }) } } }
    async close() { this.state = 'closed' }
  }
  Object.defineProperty(globalThis, 'AudioContext', { configurable: true, value: MockAudioContext })
  t.after(() => { if (prior) Object.defineProperty(globalThis, 'AudioContext', prior); else Reflect.deleteProperty(globalThis, 'AudioContext') })
  const media = { dataset: { sourceUrl: 'https://example.com/mixed.mp3' }, currentTime: 0, duration: 100, paused: false, ended: false, seeking: false, readyState: 4 }
  const response = createInstrumentResponse(media as unknown as HTMLAudioElement)
  t.after(() => response.destroy())
  await response.activate()
  const step = () => { media.currentTime += 1 / 30; return response.sample(1 / 30) }
  const settle = (frames: number) => Array.from({ length: frames }, step)
  settle(3)
  const harmonic = (gain: number) => (hz: number) => gain * Math.exp(-Math.pow((hz - Math.round(hz / 375) * 375) / 15, 2)) + .000001
  let drumFromBow = 0, quietBow = 0
  for (let i = 0; i < 120; i++) {
    spectrum = harmonic(.015 * (1 + .08 * Math.sin(i * .9)))
    const frame = step(); drumFromBow = Math.max(drumFromBow, frame.janggu); quietBow = frame.haegeum
  }
  assert.ok(quietBow > .3 && drumFromBow < .05, 'quiet, vibrating harmonics drive bow without repeated drum hits')
  spectrum = harmonic(.075)
  const loudBow = settle(60).at(-1)!.haegeum
  assert.ok(loudBow > quietBow + .15 && loudBow < .98, 'bow phrases retain dynamics instead of clipping at full response')
  spectrum = hz => hz < 2000 ? harmonic(.008)(hz) : .000001
  const soft = settle(30).at(-1)!
  spectrum = hz => hz < 2000 ? harmonic(.05)(hz) : .000001
  const articulated = step()
  assert.ok(articulated.haegeum > soft.haegeum + .2, 'a quiet bow phrase reacts within one analyser frame')
  assert.ok(articulated.texture > .5, 'harmonic articulation works without any treble noise')
  const still = settle(45).at(-1)!
  let vibrato = 0
  for (let i = 0; i < 60; i++) {
    const fundamental = 375 + 1.5 * Math.sin(i * .85)
    spectrum = hz => hz < 2000 ? .008 * Math.exp(-Math.pow((hz - Math.round(hz / fundamental) * fundamental) / 15, 2)) + .000001 : .000001
    vibrato = Math.max(vibrato, step().texture)
  }
  assert.ok(still.texture < .01 && vibrato > .15, 'quiet pitch vibration drives texture while an unchanged harmonic stays calm')
  spectrum = harmonic(.018)
  const beforeDrum = settle(45).at(-1)!
  spectrum = hz => harmonic(.018)(hz) + (hz >= 60 && hz < 4000 ? .04 * Math.exp(-(hz - 60) / 900) : 0)
  const mixedAttack = step()
  spectrum = harmonic(.018)
  const mixedTail = settle(9)
  assert.ok(Math.max(mixedAttack.janggu, ...mixedTail.map(frame => frame.janggu)) > .65, 'drum attack remains visible over a sustained bowed phrase')
  assert.ok(Math.max(mixedAttack.texture, ...mixedTail.map(frame => frame.texture)) < .12, 'broad drum energy does not become a purple articulation jolt')
  assert.ok(Math.max(...[mixedAttack, ...mixedTail].map(frame => Math.abs(frame.haegeum - beforeDrum.haegeum))) < .08, 'bow phrase remains continuous through the drum onset')
  spectrum = () => .000001; settle(60)
  spectrum = hz => hz >= 60 && hz < 700 ? .022 * Math.exp(-(hz - 60) / 500) : .000001
  const thud = step()
  spectrum = () => .000001
  const thudPeak = Math.max(thud.janggu, ...settle(9).map(frame => frame.janggu))
  assert.ok(thudPeak > .65, 'a dull bass/body strike works without a treble attack')
  settle(60)
  spectrum = hz => hz >= 2000 && hz < 7000 ? .025 : .000001
  assert.ok(Math.max(...settle(30).map(frame => frame.janggu)) < .05, 'high-only noise cannot qualify as a drum strike')
  spectrum = harmonic(.075); settle(30)
  media.paused = true
  const paused = settle(120).at(-1)!
  assert.ok(paused.haegeum < .01 && paused.janggu < .01 && paused.texture < .01, 'all audio envelopes decay on pause')
  assert.equal(paused.pitchMidi, null); assert.equal(paused.pitchConfidence, 0)
  media.paused = false
  for (const hz of [110, 220, 440, 880, 1318.51]) {
    response.reset(); signal = seconds => .16 * Math.sin(2 * Math.PI * hz * seconds)
    const pitch = settle(8).at(-1)!
    assert.ok(pitch.pitchMidi !== null && Math.abs(pitch.pitchMidi - (69 + 12 * Math.log2(hz / 440))) < .15, `fundamental ${hz} Hz remains accurate across the pitch range`)
    assert.ok(pitch.pitchConfidence >= .9)
  }
  response.reset()
  signal = seconds => .12 * Math.sin(2 * Math.PI * 220 * seconds) + .35 * Math.sin(2 * Math.PI * 440 * seconds) + .22 * Math.sin(2 * Math.PI * 660 * seconds)
  const rich = settle(8).at(-1)!
  assert.ok(rich.pitchMidi !== null && Math.abs(rich.pitchMidi - 57) < .15, 'a louder second harmonic does not replace the true fundamental')
  signal = seconds => .2 * Math.sin(2 * Math.PI * 440 * seconds)
  assert.ok(Math.abs(step().pitchMidi! - 57) < .15, 'one octave-flip frame cannot move the pitch contour')
  assert.ok(Math.abs(settle(4).at(-1)!.pitchMidi! - 69) < .15, 'a consistent real pitch leap is eventually accepted')
  let seed = 17
  signal = () => { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return (seed / 2 ** 32 - .5) * .4 }
  const unvoiced = settle(12).at(-1)!
  assert.equal(unvoiced.pitchMidi, null); assert.equal(unvoiced.pitchConfidence, 0, 'noise loses pitch confidence after the brief hold')
  response.reset(); spectrum = () => .000001; signal = () => 0; settle(3)
  spectrum = hz => hz >= 60 && hz < 700 ? .022 * Math.exp(-(hz - 60) / 500) : .000001
  signal = seconds => .25 * Math.sin(2 * Math.PI * 150 * seconds)
  assert.equal(step().pitchMidi, null, 'a detected drum onset does not acquire a tonal pitch from its ringing body')
  spectrum = () => .000001; signal = () => 0
  assert.equal(settle(8).at(-1)!.pitchMidi, null)
  spectrum = harmonic(.075); signal = seconds => .16 * Math.sin(2 * Math.PI * 440 * seconds); settle(8)
  media.paused = true
  assert.equal(step().pitchMidi, null, 'pause discards a previously confident pitch immediately')
  media.paused = false; media.seeking = true
  assert.equal(step().pitchMidi, null, 'seeking cannot reuse a pitch from the outgoing timecode')
})
