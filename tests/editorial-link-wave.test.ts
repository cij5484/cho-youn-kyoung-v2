import test from 'node:test'
import assert from 'node:assert/strict'
import { arrowWaveFrames, editorialWavePlan, editorialWaveTuning, glyphSettleDestination, glyphWaveFrames } from '../src/home/editorial-link-wave.ts'

const centers = [10, 30, 50, 70, 90].map(x => ({ x, y: 12 }))
const arrow = { x: 140, y: 12 }

test('entry position changes the first glyph: left, right, and center spread from the touch point', () => {
  const left = editorialWavePlan({ x: 0, y: 12 }, centers, arrow).glyphs
  const right = editorialWavePlan({ x: 100, y: 12 }, centers, arrow).glyphs
  const middle = editorialWavePlan({ x: 50, y: 12 }, centers, arrow).glyphs
  assert.ok(left[0].delay < left[1].delay && left[1].delay < left[4].delay)
  assert.ok(right[4].delay < right[3].delay && right[3].delay < right[0].delay)
  assert.equal(middle[2].delay, 0)
  assert.equal(middle[1].delay, middle[3].delay)
  assert.ok(middle[1].delay < middle[0].delay)
  assert.ok(left[0].strength > left[4].strength)
  assert.ok(middle[1].tilt < 0 && middle[3].tilt > 0)
})

test('arrival and tilt remain bounded for very wide links; arrow completes the same wave', () => {
  for (const x of [-600, 10, 50, 90, 800]) {
    const plan = editorialWavePlan({ x, y: 0 }, centers, arrow)
    assert.ok(plan.glyphs.every(glyph => glyph.delay <= editorialWaveTuning.maximumDelay))
    assert.ok(plan.glyphs.every(glyph => glyph.strength >= .6 && glyph.strength <= 1 && Math.abs(glyph.tilt) <= 1.8))
    assert.ok(plan.arrowDelay > Math.max(...plan.glyphs.map(glyph => glyph.delay)))
  }
})

test('interrupted glyph settles to its nearest identical copy without a full reverse', () => {
  assert.equal(glyphSettleDestination(-4, 24), 'translateY(0)')
  assert.equal(glyphSettleDestination(-19, 24), 'translateY(-100%)')
  assert.equal(glyphSettleDestination(-24, 0), 'translateY(0)')
  assert.ok(editorialWaveTuning.settleDuration < editorialWaveTuning.glyphDuration / 2)
})

test('re-entry preserves the actual first rendered transform and each wave ends in a readable state', () => {
  const plan = editorialWavePlan({ x: 20, y: 12 }, centers, arrow)
  const current = 'matrix(1, 0, 0, 1, 0, -9)'
  const glyph = glyphWaveFrames(plan.glyphs[0], current)
  const pointer = arrowWaveFrames(current)
  assert.equal(glyph[0].transform, current)
  assert.equal(pointer[0].transform, current)
  assert.equal(glyph.at(-1)?.transform, 'translateY(-100%) rotate(0deg) scaleY(1)')
  assert.equal(pointer.at(-1)?.transform, 'translate(3px, -2px) rotate(0deg) scale(1)')
})
