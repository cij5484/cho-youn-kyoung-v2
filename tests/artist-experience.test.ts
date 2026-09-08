import test from 'node:test'
import assert from 'node:assert/strict'
import { artistExperienceFrame, createHanjiField, hanjiAlpha, paintHanjiMask } from '../src/experience-prototype/hanji-mask.ts'

test('both photo comparisons complete to exact suit/hanbok endpoints before the existing scene exit', () => {
  assert.equal(artistExperienceFrame(.655).reveal, 0)
  assert.equal(artistExperienceFrame(.825).reveal, 1)
  assert.equal(artistExperienceFrame(.91).reveal, 1)
  assert.equal(artistExperienceFrame(.955).reveal, 1)
  assert.equal(artistExperienceFrame(.91).viewing, true)
  assert.equal(artistExperienceFrame(.91).profile, 1)
})

test('wet arrival is deterministic, non-linear and monotonically reversible without a photo distortion', () => {
  const field = createHanjiField(36, 54), repeat = createHanjiField(36, 54)
  assert.deepEqual(field.arrival, repeat.arrival)
  assert.ok(Math.max(...field.arrival) <= 1)
  assert.ok(Math.min(...field.arrival) >= 0)
  const row = field.arrival.slice(27 * 36, 28 * 36)
  assert.ok(new Set(row.map(value => Math.round(value * 100))).size > 20)
  for (const arrival of field.arrival) {
    let last = 0
    for (let i = 0; i <= 20; i++) {
      const alpha = hanjiAlpha(arrival, i / 20)
      assert.ok(alpha >= last)
      last = alpha
    }
  }
})

test('mask endpoints cover every pixel and reverse rendering has no history or leftover seed specks', () => {
  const field = createHanjiField(24, 36), pixels = new Uint8ClampedArray(field.arrival.length * 4)
  paintHanjiMask(field, 0, pixels)
  assert.ok(pixels.filter((_, i) => i % 4 === 3).every(alpha => alpha === 0))
  paintHanjiMask(field, .43, pixels)
  const forward = pixels.slice()
  paintHanjiMask(field, 1, pixels)
  assert.ok(pixels.filter((_, i) => i % 4 === 3).every(alpha => alpha === 255))
  paintHanjiMask(field, .43, pixels)
  assert.deepEqual(pixels, forward)
  paintHanjiMask(field, 0, pixels)
  assert.ok(pixels.filter((_, i) => i % 4 === 3).every(alpha => alpha === 0))
})
