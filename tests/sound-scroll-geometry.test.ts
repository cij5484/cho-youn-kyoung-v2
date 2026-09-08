import test from 'node:test'
import assert from 'node:assert/strict'
import { soundFocusFrame, soundScrollGeometry } from '../src/sound/scroll-geometry.ts'

test('mobile adds only an end hold while Hero, Haegeum and SOUND retain their absolute scroll positions', () => {
  for (const viewport of [480, 568, 844, 926]) {
    const original = viewport * 2.35, total = viewport * 2.9
    const geometry = soundScrollGeometry(total, viewport * 1.55, true)
    assert.ok(Math.abs(geometry.travel - original) < 1e-9)
    assert.ok(Math.abs(geometry.hold - viewport * .55) < 1e-9)
    for (const position of [0, viewport * .6, viewport * 1.55, viewport * 2.222, original]) {
      assert.ok(Math.abs(position / geometry.travel - position / original) < 1e-9)
    }
    const frame = soundFocusFrame(geometry, Math.max(540, viewport), 64)
    assert.equal(frame.progress, 1)
    assert.ok(frame.offset > original && frame.offset < total)
    assert.ok(Math.abs(frame.offset - (original + viewport * .275)) < 1e-9)
    assert.equal(Math.min(1, frame.offset / geometry.travel), 1)
  }
})

test('without the explicit mobile marker every original travel and header-aware landing stays exact', () => {
  for (const actualTravel of [1300, 1983, 2350, 2700]) for (const stageHeight of [540, 844, 1080]) for (const header of [0, 64, 112, 400]) {
    const geometry = soundScrollGeometry(actualTravel, 1550, false)
    assert.deepEqual(geometry, { travel: actualTravel, hold: 0 })
    const margin = Math.min(stageHeight * .015, Math.max(0, stageHeight * .37 - header) * .08)
    assert.deepEqual(soundFocusFrame(geometry, stageHeight, header), {
      offset: actualTravel - margin, progress: 1 - margin / actualTravel,
    })
  }
})

test('missing or reduced static geometry never invents a positive hold or negative travel', () => {
  for (const marker of [0, -1, NaN]) assert.deepEqual(soundScrollGeometry(1800, marker, true), { travel: 1800, hold: 0 })
  assert.deepEqual(soundScrollGeometry(0, 1550, false), { travel: 1, hold: 0 })
  assert.deepEqual(soundScrollGeometry(0, 1550, true), { travel: 1, hold: 0 })
  assert.deepEqual(soundScrollGeometry(800, 1550, true), { travel: 800, hold: 0 })
})
