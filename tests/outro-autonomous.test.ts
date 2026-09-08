import test from 'node:test'
import assert from 'node:assert/strict'
import { autonomousWetReady, blankTapIsWet, gentleGlyph, outroGlyphTarget, wetColorAt, wetEnvelope, wetFieldTiming } from '../src/home/outro-surface-model.ts'

test('color follows a continuous slow clock, independent of stain or input count', () => {
  assert.deepEqual(wetColorAt(0), [99, 52, 229])
  assert.deepEqual(wetColorAt(24), [173, 140, 84])
  assert.deepEqual(wetColorAt(48), [163, 61, 54])
  assert.deepEqual(wetColorAt(72), wetColorAt(0))
  for (let time = 0; time < 73; time += .1) {
    const a = wetColorAt(time), b = wetColorAt(time + .0167)
    // Largest channel span is 175; smoothstep's maximum slope is 1.5 per 24s segment.
    const maximumFrameDelta = 175 * 1.5 / (wetFieldTiming.colorCycle / 3) * .0167
    assert.ok(a.every((value, channel) => Math.abs(value - b[channel]) <= maximumFrameDelta + 1e-9))
  }
})

test('mobile waits for entry and native scroll, then caps sparse regions at three', () => {
  const ready = { now: 10000, enteredAt: 8000, lastScroll: 9000, lastStain: 8000, regions: 2, visible: true, reduced: false, touching: false }
  assert.equal(autonomousWetReady(ready), true)
  for (const patch of [{ enteredAt: 9600 }, { lastScroll: 9900 }, { lastStain: 9900 }, { regions: 3 }, { touching: true }, { reduced: true }, { visible: false }]) {
    assert.equal(autonomousWetReady({ ...ready, ...patch }), false)
  }
})

test('mobile paper expands over 1.5 seconds and is completely dry after its six-second base life', () => {
  assert.equal(wetEnvelope(0, wetFieldTiming.mobileLife).opacity, 0)
  assert.ok(wetEnvelope(.3, 6, 1.5).opacity > 0)
  assert.ok(wetEnvelope(1.5, 6, 1.5).spread > wetEnvelope(.3, 6, 1.5).spread * 2)
  assert.equal(wetEnvelope(6, 6, 1.5).opacity, 0)
  assert.equal(wetEnvelope(8, 6, 1.5).opacity, 0)
})

test('only a short stationary blank tap adds paper; scrolling or links do not', () => {
  assert.equal(blankTapIsWet(150, 3, false), true)
  assert.equal(blankTapIsWet(150, 20, false), false)
  assert.equal(blankTapIsWet(300, 3, false), false)
  assert.equal(blankTapIsWet(150, 3, true), false)
  assert.equal(blankTapIsWet(150, 3, false, 2), false)
  const normal = outroGlyphTarget(20, 10, 120), gentle = gentleGlyph(normal)
  assert.ok(Math.abs(gentle.x) < Math.abs(normal.x) && Math.abs(gentle.y) < Math.abs(normal.y))
  assert.ok(gentle.stretch < normal.stretch)
})
