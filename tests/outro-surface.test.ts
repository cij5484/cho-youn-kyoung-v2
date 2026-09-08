import test from 'node:test'
import assert from 'node:assert/strict'
import { outroOrbit } from '../src/home/closing-orbit.ts'
import { outroCanvasScale, outroGlyphTarget, restingGlyph, wetEnvelope } from '../src/home/outro-surface-model.ts'

test('both inherited points remain alive at the end, without a scroll-dependent gathering position', () => {
  const box = { left: 25, top: 70, width: 960, height: 670 }
  for (const strand of [0, 1]) {
    const a = outroOrbit(box, 17, 1, strand), b = outroOrbit(box, 18, 1, strand)
    assert.ok(Math.hypot(a.x - b.x, a.y - b.y) > 20)
    assert.deepEqual(a, outroOrbit(box, 17, 0, strand))
    for (let phase = 0; phase < 100; phase += .25) {
      const p = outroOrbit(box, phase, 1, strand)
      assert.ok(p.x >= box.left && p.x <= box.left + box.width)
      assert.ok(p.y >= box.top && p.y <= box.top + box.height)
      assert.ok(Math.abs(p.z) <= 1)
    }
  }
})

test('the paper response dries completely, while nearby glyph tension stays small and local', () => {
  assert.deepEqual(wetEnvelope(-.006), wetEnvelope(0))
  assert.equal(wetEnvelope(-.006).opacity, 1)
  assert.equal(wetEnvelope(1.45).opacity, 0)
  assert.equal(wetEnvelope(30).opacity, 0)
  assert.ok(wetEnvelope(.3).opacity > wetEnvelope(.9).opacity)
  assert.deepEqual(outroGlyphTarget(205, 205, 205), restingGlyph)
  for (let x = -200; x <= 200; x += 10) for (let y = -200; y <= 200; y += 10) {
    const p = outroGlyphTarget(x, y, 205)
    assert.ok(Math.abs(p.x) < 3.3 && Math.abs(p.y) < 2.5 && Math.abs(p.turn) < .66)
    assert.ok(p.stretch >= 1 && p.stretch <= 1.004)
  }
})

test('large and high-DPR surfaces keep a fixed backing-pixel ceiling', () => {
  for (const [width, height, dpr] of [[390, 1000, 3], [1440, 1600, 2], [3840, 2600, 4]]) {
    const scale = outroCanvasScale(width, height, dpr)
    assert.ok(scale <= 1.25)
    assert.ok(width * height * scale * scale <= 1_100_001)
  }
})
