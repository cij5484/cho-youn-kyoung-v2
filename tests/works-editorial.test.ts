import test from 'node:test'
import assert from 'node:assert/strict'
import { editorialPlane, editorialReveal, editorialTextureSize } from '../src/works/candidates/editorial-engine.ts'

test('pixel-space plane projects back to the exact authored DOM rect before and after resize', () => {
  for (const viewport of [{ width: 1440, height: 900 }, { width: 390, height: 844 }, { width: 320, height: 568 }]) {
    for (const rect of [{ left: 24, top: 140, width: 280, height: 396 }, { left: 240.5, top: -173.125, width: 408.75, height: 362.765625 }]) {
      const plane = editorialPlane(rect, viewport)
      assert.equal(plane.x + viewport.width / 2 - plane.width / 2, rect.left)
      assert.equal(viewport.height / 2 - plane.y - plane.height / 2, rect.top)
      assert.equal(plane.width, rect.width)
      assert.equal(plane.height, rect.height)
    }
  }
})

test('native scroll reveal has a readable full-image interval and returns through the same states in reverse', () => {
  const tops = [900, 820, 700, 500, 250, 0, -200]
  const forward = tops.map(top => editorialReveal(top, 520, 900))
  assert.equal(forward[0], 0)
  assert.equal(forward.at(-1), 1)
  assert.equal(editorialReveal(250, 520, 900), 1)
  assert.ok(forward.some(value => value > .2 && value < .8))
  assert.deepEqual([...tops].reverse().map(top => editorialReveal(top, 520, 900)), [...forward].reverse())
  for (let index = 1; index < forward.length; index++) assert.ok(forward[index] >= forward[index - 1])
  assert.equal(editorialReveal(0, 0, 900), 0)
})

test('GPU upload respects desktop/mobile longest-edge budgets without upscaling or changing portrait identity', () => {
  for (const mobile of [false, true]) {
    const limit = mobile ? 1024 : 1600
    for (const dimensions of [[1555, 2200], [1600, 1420], [390, 844]]) {
      const [width, height] = dimensions
      const size = editorialTextureSize(width, height, mobile)
      assert.ok(Math.max(size.width, size.height) <= limit)
      assert.ok(size.width <= width && size.height <= height)
      assert.ok(Math.abs(size.width / size.height - width / height) < .002)
    }
  }
})
