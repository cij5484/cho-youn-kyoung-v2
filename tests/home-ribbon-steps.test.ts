import assert from 'node:assert/strict'
import test from 'node:test'
import { nextRibbonStop } from '../src/home/ribbon-steps.ts'

test('ribbon input moves one complete work and releases both section boundaries', () => {
  assert.equal(nextRibbonStop(0, -1, 5), null)
  assert.equal(nextRibbonStop(4, 1, 5), null)
  assert.equal(nextRibbonStop(0, 1, 5), 1)
  assert.equal(nextRibbonStop(4, -1, 5), 3)
  assert.equal(nextRibbonStop(1.2, 1, 5), 2)
  assert.equal(nextRibbonStop(2.8, -1, 5), 2)
})
