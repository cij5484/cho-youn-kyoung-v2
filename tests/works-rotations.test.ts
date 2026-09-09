import test from 'node:test'
import assert from 'node:assert/strict'
import { worksCatalog } from '../src/works/catalog.ts'
import { dampRotationValue, rotationSequence, sampleRotations } from '../src/works/candidates/rotations-motion.ts'

test('each real record has a clean held focus between an expressive entrance and exit', () => {
  assert.equal(new Set(rotationSequence).size, worksCatalog.length)
  const grammars = new Set<string>()
  rotationSequence.forEach((index, order) => {
    const focused = sampleRotations(order / 5 * .82, false).poses[index]
    assert.ok(Math.abs(focused.rx) + Math.abs(focused.ry) + Math.abs(focused.rz) < 1e-8)
    assert.equal(focused.blur, 0)
    assert.equal(focused.brightness, 1)
    assert.ok(Math.abs(focused.scale - 1) < 1e-8)
    for (const direction of [-1, 1]) {
      const position = Math.max(0, Math.min(5, order + direction * .15))
      const held = sampleRotations(position / 5 * .82, false).poses[index]
      assert.ok(Math.abs(held.rx) + Math.abs(held.ry) + Math.abs(held.rz) < 1e-7)
    }
    const entrance = sampleRotations(Math.max(0, order - 1.25) / 5 * .82, false).poses[index]
    const exit = sampleRotations(Math.min(5, order + 1.25) / 5 * .82, false).poses[index]
    const expressive = order > 0 ? entrance : exit
    assert.ok(Math.max(Math.abs(expressive.rx), Math.abs(expressive.ry)) > 85)
    assert.ok(expressive.z < -.15)
    grammars.add([entrance.rx, entrance.ry, exit.rx, exit.ry].join(','))
  })
  assert.equal(grammars.size, 6)
})

test('normal and reversed scroll have deterministic continuous 3-axis poses', () => {
  for (const mobile of [false, true]) {
    let previous = sampleRotations(0, mobile)
    for (let tick = 1; tick <= 2000; tick += 1) {
      const current = sampleRotations(tick / 2000, mobile)
      assert.deepEqual(current, sampleRotations(tick / 2000, mobile))
      current.poses.forEach((pose, index) => {
        assert.ok(Object.values(pose).every(Number.isFinite))
        assert.ok(pose.opacity >= 0 && pose.opacity <= 1)
        for (const axis of ['rx', 'ry', 'rz'] as const) assert.ok(Math.abs(pose[axis] - previous.poses[index][axis]) < 2)
        assert.ok(Math.abs(pose.y - previous.poses[index].y) < .04)
      })
      previous = current
    }
  }
})

test('mobile is a local vertical composition with large distinct family rotations', () => {
  for (let tick = 0; tick <= 820; tick += 1) {
    const frame = sampleRotations(tick / 1000, true)
    const active = frame.poses[frame.focus]
    assert.ok(Math.abs(active.x) < .08)
    assert.ok(Math.abs(active.y) < .471)
    assert.equal(active.opacity, 1)
    assert.ok(frame.poses.filter(pose => pose.opacity > .01).length <= 4)
  }
  const albumEntrance = sampleRotations(0, true).poses[3]
  const posterEntrance = sampleRotations(0, true).poses[1]
  assert.ok(Math.abs(albumEntrance.rx) > 70)
  assert.ok(Math.abs(posterEntrance.ry) > 85)
})

test('velocity breath remains transient and bounded, preserving clean settled artwork', () => {
  for (const mobile of [false, true]) {
    const fast = sampleRotations(.35, mobile, 100)
    assert.ok(fast.poses.every(pose => pose.blur <= (mobile ? 1.4 : 3.8)))
    const settled = sampleRotations(.35, mobile, 0)
    assert.ok(settled.poses.every(pose => pose.blur === 0))
    assert.equal(fast.focus, settled.focus)
  }
  let speed = 1
  for (let step = 0; step < 120; step += 1) speed = dampRotationValue(speed, 0, 1 / 60, 15)
  assert.ok(speed >= 0 && speed < .0001)
})

test('all six original surfaces settle into a compact two-column archive handoff', () => {
  for (const mobile of [false, true]) {
    const end = sampleRotations(1, mobile, 10)
    assert.equal(end.resolution, 1)
    assert.equal(new Set(end.poses.map(pose => pose.x.toFixed(5))).size, 2)
    assert.equal(new Set(end.poses.map(pose => pose.y.toFixed(5))).size, 3)
    end.poses.forEach(pose => {
      assert.equal(pose.opacity, 1)
      assert.equal(Math.abs(pose.rx), 0)
      assert.equal(Math.abs(pose.ry), 0)
      assert.equal(Math.abs(pose.rz), 0)
      assert.equal(Math.abs(pose.z), 0)
      assert.equal(pose.blur, 0)
      assert.ok(Math.abs(pose.scale - (mobile ? .24 : .28)) < 1e-8)
    })
  }
})
