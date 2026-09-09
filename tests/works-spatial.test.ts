import test from 'node:test'
import assert from 'node:assert/strict'
import { dampValue, spatialTuning } from '../src/works/spatial/model.ts'

test('shared native-scroll damping never overshoots forward or reverse and settles', () => {
  for (const target of [0, .3, 1]) {
    let value = target === 0 ? 1 : 0
    for (let step = 0; step < 200; step++) {
      const previous = value
      value = dampValue(value, target, 1 / 60)
      assert.ok(value >= Math.min(previous, target) && value <= Math.max(previous, target))
    }
    assert.ok(Math.abs(value - target) < 1e-6)
  }
})

test('all candidates share authored lens and DPR budgets', () => {
  assert.equal(spatialTuning.desktop.fov, 38)
  assert.equal(spatialTuning.mobile.fov, 40)
  assert.equal(spatialTuning.desktop.dpr, 1.5)
  assert.equal(spatialTuning.mobile.dpr, 1.25)
})
