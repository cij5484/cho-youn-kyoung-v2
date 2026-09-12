import test from 'node:test'
import assert from 'node:assert/strict'
import { nearestWorksHelixStop, worksHelixStop, worksHelixPose, worksHelixTimeline } from '../src/works/candidates/works-helix-model.ts'

test('the reversible scroll clock visits every identity before assembling the archive', () => {
  assert.deepEqual(worksHelixTimeline(-1, 7), { cursor: 0, unfold: 0, assembly: 0, focus: 0 })
  assert.deepEqual(worksHelixTimeline(2, 7), { cursor: 6, unfold: 1, assembly: 1, focus: 6 })
  for (let i = 0; i < 7; i++) {
    const state = worksHelixTimeline(.1 + .73 * i / 6, 7)
    assert.ok(Math.abs(state.cursor - i) < 1e-12)
    assert.equal(state.focus, i)
    assert.equal(state.unfold, 1)
    assert.equal(state.assembly, 0)
  }
  for (const boundary of [.1, .83]) {
    const before = worksHelixTimeline(boundary - 1e-7, 7)
    const after = worksHelixTimeline(boundary + 1e-7, 7)
    for (const key of ['cursor', 'unfold', 'assembly'] as const) assert.ok(Math.abs(after[key] - before[key]) < 1e-5)
  }
  assert.equal(worksHelixTimeline(.5, 1).cursor, 0)
})

test('each selected work faces front while its neighbors occupy genuine cylindrical depth', () => {
  for (const [width, height] of [[363, 970], [390, 844], [1440, 900]]) {
    for (let focus = 0; focus < 7; focus++) {
      const pose = worksHelixPose(focus, 7, focus, width, height, 1)
      assert.equal(pose.x, 0); assert.equal(pose.y, 0); assert.equal(pose.rotationY, 0)
      assert.equal(pose.emphasis, 1); assert.equal(pose.opacity, 1)
      assert.equal(pose.z, 0)
      const others = Array.from({ length: 7 }, (_, i) => worksHelixPose(i, 7, focus, width, height, 1))
      assert.ok(others.some(p => p.z < 0))
      assert.ok(others.some(p => Math.abs(p.rotationY) > 90))
      assert.equal(others.filter(p => p.emphasis === 1).length, 1)
    }
    for (let step = 0; step <= 100; step++) {
      const state = worksHelixTimeline(step / 100, 7)
      for (let i = 0; i < 7; i++) {
        const pose = worksHelixPose(i, 7, state.cursor, width, height, state.unfold)
        assert.ok(Object.values(pose).every(Number.isFinite))
        assert.ok(pose.scale > 0 && pose.opacity >= 0 && pose.opacity <= 1)
        const adjacent = worksHelixPose(i, 7, state.cursor + 1e-7, width, height, state.unfold)
        for (const key of ['x', 'y', 'z', 'rotationY', 'scale'] as const) assert.ok(Math.abs(pose[key] - adjacent[key]) < .001)
      }
    }
  }
})

test('gesture destinations settle only at front-facing works or the archive', () => {
  for (let i = 0; i <= 7; i++) {
    const p = worksHelixStop(i, 7)
    assert.equal(nearestWorksHelixStop(p,7), i)
    const state = worksHelixTimeline(p,7)
    assert.ok(Math.abs(state.cursor - Math.min(i,6)) < 1e-10)
  }
  for (let i = 1; i < 7; i++) assert.equal(worksHelixPose(i,7,0,390,844,0).opacity,0)
  assert.equal(worksHelixStop(-1,7),0)
  assert.equal(worksHelixStop(8,7),1)
})
