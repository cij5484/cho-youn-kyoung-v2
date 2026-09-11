import test from 'node:test'
import assert from 'node:assert/strict'
import { wetColorAt, wetEnvelope, wetStainColor, wetStainProfile, type WetSource } from '../src/home/outro-surface-model.ts'

test('a small wet birth expands, holds its presence, and dries continuously without a reset', () => {
  for (const seed of [0, 1, 7, 38, 107]) {
    const profile = wetStainProfile('points', .5, seed)
    const envelope = (age: number) => wetEnvelope(age, profile.life, profile.expansion)
    assert.deepEqual(envelope(-.006), envelope(0))
    assert.equal(envelope(0).spread, .18)
    assert.equal(envelope(0).opacity, 0)
    assert.ok(envelope(.15).opacity > .9)
    assert.ok(envelope(profile.expansion / 2).spread > .5)
    assert.equal(envelope(profile.expansion).spread, 1)
    assert.equal(envelope(profile.expansion).opacity, envelope(profile.expansion + .6).opacity)
    let previous = envelope(0)
    for (let age = .016; age < profile.life + .016; age += .016) {
      const current = envelope(age)
      assert.ok(current.spread >= previous.spread)
      assert.ok(current.opacity >= 0 && current.opacity <= 1)
      assert.ok(Math.abs(current.spread - previous.spread) < .02)
      if (age > profile.expansion + .65) assert.ok(current.opacity <= previous.opacity)
      previous = current
    }
    assert.equal(envelope(profile.life).opacity, 0)
    assert.equal(envelope(profile.life + 10).opacity, 0)
  }
})

test('each stain retains deterministic bounded size, life, strength and angle variation', () => {
  const seen = new Set<number>()
  for (const source of ['pointer', 'points', 'tap'] as WetSource[]) for (const speed of [0, .5, 1]) for (let seed = 0; seed < 200; seed++) {
    const profile = wetStainProfile(source, speed, seed)
    assert.deepEqual(profile, wetStainProfile(source, speed, seed))
    const desktop = source === 'pointer'
    const baseRadius = desktop ? (96 + speed * 30) * .6 : (source === 'tap' ? 42 : 47 + speed * 15) * .675
    const baseStrength = desktop ? (.12 + speed * .025) * 1.9 : (source === 'tap' ? .15 : .135) * 2
    assert.ok(profile.radius >= baseRadius * .8 && profile.radius <= baseRadius * 1.2)
    assert.ok(profile.strength >= baseStrength * .88 && profile.strength <= baseStrength * 1.12)
    assert.ok(profile.life >= 5.1 && profile.life <= 6.9)
    assert.ok(profile.expansion >= 1.3 && profile.expansion <= 1.7)
    assert.ok(Math.abs(profile.turn) <= .45 && Math.abs(profile.warmth) <= 1)
    seen.add(profile.radius)
  }
  assert.ok(seen.size > 1000)
})

test('small warm/cool biases follow the same continuous 36-second phase, never a random palette choice', () => {
  for (let time = 0; time <= 36; time += .4) for (const warmth of [-1, -.25, 0, .7, 1]) {
    const base = wetColorAt(time), color = wetStainColor(time, warmth), next = wetStainColor(time + .0167, warmth)
    for (const [channel, bound] of [10, 4, 7].entries()) {
      assert.ok(Math.abs(color[channel] - base[channel]) <= bound + 1e-9)
      assert.ok(Math.abs(next[channel] - color[channel]) < .37)
    }
  }
  assert.deepEqual(wetStainColor(36, .8), wetStainColor(0, .8))
  assert.deepEqual(wetStainColor(0, 0), wetColorAt(0))
})
