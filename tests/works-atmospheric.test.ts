import test from 'node:test'
import assert from 'node:assert/strict'
import { atmosphericDepth, atmosphericMobileFit, atmosphericTextureSize, atmosphericTimeline } from '../src/works/candidates/atmospheric-engine.ts'

test('camera travels through fixed depth layers and every real work has a clear focus', () => {
  for (const mobile of [false, true]) {
    const first = atmosphericTimeline(0, mobile)
    let previous = first.cameraZ
    for (let i = 0; i <= 5; i++) {
      const state = atmosphericTimeline(i / 5 * .82, mobile)
      assert.equal(state.focus, i)
      assert.ok(state.cameraZ <= previous)
      assert.ok(Math.abs(state.cameraZ - (-i * state.gap) - state.viewingDistance) < 1e-9)
      assert.equal(atmosphericDepth(i, state.cursor, mobile).opacity, 1)
      previous = state.cameraZ
    }
    assert.equal(atmosphericTimeline(1, mobile).resolution, 1)
    assert.equal(atmosphericTimeline(.82, mobile).resolution, 0)
  }
  assert.ok(atmosphericTimeline(0, true).gap < atmosphericTimeline(0, false).gap)
})

test('depth overlap stays continuous on reverse and passed works leave before crossing the camera', () => {
  for (const mobile of [false, true]) {
    const { viewingDistance, gap } = atmosphericTimeline(0, mobile)
    for (let index = 0; index < 6; index++) {
      let previous = atmosphericDepth(index, 0, mobile)
      for (let tick = 1; tick <= 2000; tick++) {
        const cursor = tick / 400
        const current = atmosphericDepth(index, cursor, mobile)
        assert.ok(current.opacity >= 0 && current.opacity <= 1)
        assert.ok(Math.abs(current.opacity - previous.opacity) < .006)
        if (current.opacity > .004) assert.ok(viewingDistance + current.delta * gap > 2)
        assert.deepEqual(current, atmosphericDepth(index, cursor, mobile))
        previous = current
      }
    }
    const incoming = atmosphericDepth(2, 1.5, mobile)
    const departing = atmosphericDepth(1, 1.5, mobile)
    assert.ok(incoming.opacity > .9 && departing.opacity > .9)
    assert.equal(atmosphericDepth(0, 2, mobile).opacity, 0)
  }
})

test('texture upload budgets preserve actual aspect and never upscale', () => {
  for (const mobile of [false, true]) {
    for (const [width, height] of [[1600, 1420], [1555, 2200], [1440, 2036], [1414, 2000], [300, 400]]) {
      const result = atmosphericTextureSize(width, height, mobile)
      assert.ok(Math.max(result.width, result.height) <= (mobile ? 1024 : 1600))
      assert.ok(result.width <= width && result.height <= height)
      assert.ok(Math.abs(result.width / result.height - width / height) < .0015)
    }
  }
})

test('mobile perspective keeps whole album/poster inside measured heading and caption bounds', () => {
  for (const [width, height, top, bottom] of [[375, 776, 138, 553], [305, 632, 123, 409]]) {
    for (const ratio of [.888, 1.414, 1.426]) {
      for (let distance = 3.8; distance <= 12; distance += .2) {
        const span = 2 * distance * Math.tan(43 * Math.PI / 360)
        for (const desiredY of [-.5, 0, .5]) {
          const fit = atmosphericMobileFit(1.82, ratio, desiredY, distance, width, height, top, bottom)
          const center = (1 - 2 * (fit.y - .03) / span) * height / 2
          const halfHeight = fit.width * ratio / span * height / 2
          assert.ok(center - halfHeight >= top - 1e-8)
          assert.ok(center + halfHeight <= bottom + 1e-8)
          assert.ok(fit.width / span * height <= width * .88 + 1e-8)
        }
      }
    }
  }
})
