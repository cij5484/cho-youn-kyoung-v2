/// <reference types="vite/client" />
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { registerHooks } from 'node:module'
import { test } from 'node:test'
import type { AlbumExhibit } from '../src/album-detail/album-data.ts'

// Test playback ownership separately from the real analyser's media-time/race tests.
const selections: unknown[] = []
Object.assign(globalThis, { __analysisSelections: selections })
const hooks = registerHooks({ load(url, context, next) {
  if (url.endsWith('/instrument-response.ts')) return { format: 'module', shortCircuit: true,
    source: `export const createInstrumentResponse = media => ({ activate: async () => {}, reset() {}, destroy() {},
      setTrack: async identity => globalThis.__analysisSelections.push(identity), sample: () => media.currentTime })` }
  if (url.endsWith('/global-playback.ts')) return { format: 'module-typescript', shortCircuit: true,
    source: readFileSync(new URL(url), 'utf8').replaceAll('import.meta.env.MODE', "'development'") }
  return next(url, context)
} })
const { globalPlayback } = await import('../src/audio/global-playback.ts')
hooks.deregister()

test('one media element and volume survive selections; next/previous/seek and cleanup select the exact analysis', async t => {
  class MockAudio extends EventTarget {
    static instances: MockAudio[] = []
    dataset: Record<string, string> = {}; preload = ''; crossOrigin = ''; hidden = false
    currentTime = 0; duration = 100; paused = true; ended = false; readyState = 4; seeking = false
    volume = 1; muted = false; error: object | null = null
    private source = ''
    constructor() { super(); MockAudio.instances.push(this) }
    set src(value: string) { this.source = value; this.currentTime = 0 }
    get src() { return this.source }
    async play() { this.paused = false; this.ended = false; this.dispatchEvent(new Event('playing')); document.dispatchEvent(new Event('play')) }
    pause() { this.paused = true; this.dispatchEvent(new Event('pause')) }
    removeAttribute() { this.source = ''; this.currentTime = 0 }
    load() {}
    remove() {}
  }
  const doc = Object.assign(new EventTarget(), { body: { append() {} }, querySelectorAll: () => [] })
  const names = ['Audio', 'HTMLMediaElement', 'document'] as const
  const originals = names.map(name => Object.getOwnPropertyDescriptor(globalThis, name))
  names.forEach((name, i) => Object.defineProperty(globalThis, name, { configurable: true, value: i < 2 ? MockAudio : doc }))
  t.after(() => { names.forEach((name, i) => { if (originals[i]) Object.defineProperty(globalThis, name, originals[i]!); else Reflect.deleteProperty(globalThis, name) }); Reflect.deleteProperty(globalThis, '__analysisSelections') })
  const records = JSON.parse(readFileSync('src/audio/recordings.json', 'utf8')).filter((record: {path: string}) => record.path.startsWith('jiyounghee/'))
  const album = { slug: 'ji-young-hee-ryu-haegeum-sanjo-2026', tracks: records.map((record: {source: string}) => ({ audioUrl: record.source })) } as AlbumExhibit
  const unmount = globalPlayback.mount(), media = MockAudio.instances[0]
  await globalPlayback.play(album, 0)
  media.dispatchEvent(new Event('loadedmetadata'))
  globalPlayback.volume(.37); globalPlayback.seek(41.25)
  assert.equal(globalPlayback.sample(.016), 41.25)
  assert.equal(globalPlayback.snapshot().seconds, 41.25)
  const firstSelection = selections.at(-1)
  globalPlayback.toggle(); await Promise.resolve()
  globalPlayback.toggle(); await Promise.resolve()
  assert.equal(media.currentTime, 41.25); assert.equal(selections.at(-1), firstSelection, 'pause/resume does not reload or reset analysis')
  globalPlayback.next(); await Promise.resolve()
  assert.equal(globalPlayback.snapshot().index, 1); assert.equal(media.currentTime, 0)
  assert.match(JSON.stringify(selections.at(-1)), /02_jungmori/)
  media.dispatchEvent(new Event('loadedmetadata')); globalPlayback.seek(12.5); assert.equal(globalPlayback.sample(.016), 12.5)
  globalPlayback.previous(); await Promise.resolve()
  assert.equal(globalPlayback.snapshot().index, 0); assert.match(JSON.stringify(selections.at(-1)), /01_jinyang/)
  globalPlayback.previous(); await Promise.resolve()
  assert.equal(globalPlayback.snapshot().index, 5); assert.match(JSON.stringify(selections.at(-1)), /06_short-sanjo/)
  assert.equal(MockAudio.instances.length, 1); assert.equal(media.volume, .37)
  media.ended = true; media.paused = true; media.dispatchEvent(new Event('ended'))
  assert.equal(selections.at(-1), null); assert.equal(globalPlayback.snapshot().active, false)
  await globalPlayback.play(album, 5)
  assert.match(JSON.stringify(selections.at(-1)), /06_short-sanjo/)
  media.error = {}; media.dispatchEvent(new Event('error'))
  assert.equal(selections.at(-1), null); assert.equal(globalPlayback.snapshot().active, false)
  globalPlayback.close()
  assert.equal(selections.at(-1), null); assert.equal(media.dataset.sourceUrl, undefined)
  assert.equal(globalPlayback.snapshot().album, null)
  unmount()
})
