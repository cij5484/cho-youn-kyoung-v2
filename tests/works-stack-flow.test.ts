import test from 'node:test'
import assert from 'node:assert/strict'
import { Quaternion, Vector3 } from 'three'
import { worksCatalog } from '../src/works/catalog.ts'
import stackFlow, { stackFlowTuning } from '../src/works/spatial/variants/stack-flow.ts'

test('six catalog works begin as an unequal sculptural cluster with distinct surface normals', () => {
  for (const mobile of [false, true]) {
    const frame = stackFlow.sample(0, mobile, 0)
    assert.equal(frame.poses.length, worksCatalog.length)
    assert.equal(frame.focus, 0)
    assert.equal(frame.resolution, 0)
    assert.equal(new Set(frame.poses.map(item => item.position.z)).size, 6)
    assert.ok(frame.poses.every(item => item.opacity === 1))
    const normals = frame.poses.map(item => new Vector3(0, 0, 1).applyQuaternion(item.quaternion))
    assert.ok(normals.some((normal, index) => index > 0 && normal.angleTo(normals[0]) > .3))
    const width = Math.max(...frame.poses.map(item => item.position.x)) - Math.min(...frame.poses.map(item => item.position.x))
    assert.ok(width < (mobile ? 1.1 : 3))
  }
})

test('every work becomes readable in its own focus slot with separately authored mobile framing', () => {
  for (const mobile of [false, true]) for (let index = 0; index < worksCatalog.length; index++) {
    const progress = stackFlowTuning.firstFocus + stackFlowTuning.focusStep * index
    const frame = stackFlow.sample(progress, mobile, 0), item = frame.poses[index]
    assert.equal(frame.focus, index)
    assert.equal(item.opacity, 1)
    assert.ok(item.quaternion.angleTo(new Quaternion()) < .04)
    assert.ok(item.scale >= (mobile ? 1.45 : 2.8) && item.scale <= (mobile ? 1.8 : 3.7))
    if (mobile) {
      assert.ok(Math.abs(item.position.x) < .6 && Math.abs(item.position.y) < .5)
      assert.equal(item.position.z, 0)
      if (index > 0) assert.ok(frame.poses[index - 1].position.y > item.position.y)
      if (index < 5) assert.ok(frame.poses[index + 1].position.y < item.position.y)
    }
    const initial = stackFlow.sample(0, mobile, 0).poses[index]
    assert.ok(initial.quaternion.angleTo(item.quaternion) > .15)
  }
})

test('forward and reverse flow remain deterministic, continuous and normalized through all handoffs', () => {
  for (const mobile of [false, true]) {
    let previous = stackFlow.sample(0, mobile, 0)
    for (let tick = 1; tick <= 1000; tick++) {
      const progress = tick / 1000, frame = stackFlow.sample(progress, mobile, 0)
      for (let index = 0; index < frame.poses.length; index++) {
        const item = frame.poses[index], before = previous.poses[index]
        const reverse = stackFlow.sample(progress, mobile, 0).poses[index]
        assert.ok([...item.position.toArray(), ...item.quaternion.toArray(), item.scale, item.opacity].every(Number.isFinite))
        assert.ok(Math.abs(item.quaternion.length() - 1) < 1e-9)
        assert.ok(before.quaternion.angleTo(item.quaternion) < .025)
        assert.ok(before.position.distanceTo(item.position) < .14)
        assert.deepEqual(item.position.toArray(), reverse.position.toArray())
        assert.deepEqual(item.quaternion.toArray(), reverse.quaternion.toArray())
        assert.ok(item.opacity >= 0 && item.opacity <= 1)
      }
      assert.ok(frame.ambient.every(value => value >= 0 && value <= 1))
      previous = frame
    }
  }
})

test('the final fifth resolves all flow pieces into the same small category archive rows', () => {
  for (const mobile of [false, true]) {
    assert.equal(stackFlow.sample(.8, mobile, 0).resolution, 0)
    const frame = stackFlow.sample(1, mobile, 100), ranks = { album: 0, performance: 0 }
    assert.equal(frame.resolution, 1)
    for (let index = 0; index < worksCatalog.length; index++) {
      const item = frame.poses[index], type = worksCatalog[index].type, row = ranks[type]++
      assert.ok(Math.abs(item.position.x - (type === 'album' ? -1 : 1) * (mobile ? .75 : 2.4)) < 1e-9)
      assert.ok(Math.abs(item.position.y - (1 - row) * (mobile ? 1.2 : 1.6)) < 1e-9)
      assert.equal(item.position.z, 0)
      assert.ok(item.quaternion.angleTo(new Quaternion()) < 1e-7)
      assert.ok(Math.abs(item.scale - (mobile ? .5 : 1)) < 1e-9)
      assert.equal(item.opacity, 1)
    }
  }
})
