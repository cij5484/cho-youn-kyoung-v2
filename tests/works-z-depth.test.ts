import assert from 'node:assert/strict'
import test from 'node:test'
import { Quaternion, Vector3 } from 'three'
import { worksCatalog } from '../src/works/catalog.ts'
import zDepth from '../src/works/spatial/variants/z-depth.ts'

test('all verified works become readable focus surfaces with real depth and no scale pulsing', () => {
  for (const mobile of [false, true]) {
    const seen = new Set<number>()
    for (let tick = 0; tick <= 800; tick++) {
      const frame = zDepth.sample(tick / 1000, mobile, 0)
      assert.equal(frame.poses.length, worksCatalog.length)
      seen.add(frame.focus)
      for (const [index, pose] of frame.poses.entries()) {
        assert.ok([...pose.position.toArray(), ...pose.quaternion.toArray(), pose.scale, pose.opacity].every(Number.isFinite))
        assert.ok(Math.abs(pose.quaternion.length() - 1) < 1e-8)
        assert.ok(pose.opacity >= 0 && pose.opacity <= 1)
        assert.equal(pose.scale, mobile ? (worksCatalog[index].type === 'album' ? 1.76 : 1.56) : (worksCatalog[index].type === 'album' ? 3.55 : 3.02))
      }
      assert.ok(frame.poses[frame.focus].opacity > .99)
    }
    assert.deepEqual([...seen], [0, 1, 2, 3, 4, 5])
    const incoming = zDepth.sample(.16, mobile, 0).poses[2]
    const focus = zDepth.sample(.32, mobile, 0).poses[2]
    const outgoing = zDepth.sample(.48, mobile, 0).poses[2]
    assert.ok(focus.position.z > incoming.position.z + .9)
    assert.ok(focus.position.z > outgoing.position.z + .9)
    assert.ok(focus.quaternion.angleTo(new Quaternion()) < .05)
    assert.ok(incoming.quaternion.angleTo(focus.quaternion) > .2)
    assert.ok(outgoing.position.distanceTo(focus.position) > 1)
  }
})

test('desktop starts as a layered group while mobile current stays in its authored viewing band', () => {
  const desktop = zDepth.sample(0, false, 0)
  const visible = desktop.poses.filter(pose => pose.opacity > .15)
  assert.ok(visible.length >= 3 && visible.length <= 5)
  assert.ok(Math.max(...visible.map(pose => pose.position.z)) - Math.min(...visible.map(pose => pose.position.z)) > 5)
  assert.ok(Math.max(...visible.map(pose => pose.position.x)) - Math.min(...visible.map(pose => pose.position.x)) > 4)
  for (let tick = 0; tick <= 800; tick++) {
    const frame = zDepth.sample(tick / 1000, true, 0)
    const active = frame.poses[frame.focus]
    assert.ok(Math.abs(active.position.x) <= .6)
    assert.ok(Math.abs(active.position.y) <= .5)
    assert.ok(frame.poses.filter(pose => pose.opacity > .5).length <= 3)
    for (const [index, pose] of frame.poses.entries()) {
      if (Math.abs(index - frame.focus) > 2) assert.equal(pose.opacity, 0)
      assert.ok(Math.abs(pose.position.y) <= 1.5)
    }
  }
})

test('reverse sampling retraces geometry, rotations and light without a focus or archive boundary cut', () => {
  for (const mobile of [false, true]) {
    const forward = Array.from({ length: 1001 }, (_, index) => zDepth.sample(index / 1000, mobile, 0))
    for (let tick = 1000; tick >= 0; tick--) {
      const reverse = zDepth.sample(tick / 1000, mobile, 0)
      assert.deepEqual(reverse, forward[tick])
      if (tick === 0) continue
      const previous = forward[tick - 1]
      for (const [index, pose] of reverse.poses.entries()) {
        assert.ok(pose.position.distanceTo(previous.poses[index].position) < .17)
        assert.ok(pose.quaternion.angleTo(previous.poses[index].quaternion) < .035)
        assert.ok(Math.abs(pose.opacity - previous.poses[index].opacity) < .016)
      }
      reverse.ambient.forEach((value, channel) => {
        assert.ok(value >= .8 && value <= 1)
        assert.ok(Math.abs(value - previous.ambient[channel]) < .002)
      })
    }
  }
})

test('the last fifth resolves true depth into the shared compact archive in original catalog order', () => {
  for (const mobile of [false, true]) {
    assert.equal(zDepth.sample(.8, mobile, 0).resolution, 0)
    const frame = zDepth.sample(1, mobile, 10)
    assert.equal(frame.resolution, 1)
    const ranks = { album: 0, performance: 0 }
    frame.poses.forEach((pose, index) => {
      const type = worksCatalog[index].type
      const rank = ranks[type]++
      assert.ok(pose.position.distanceTo(new Vector3((type === 'album' ? -1 : 1) * (mobile ? .75 : 2.4), (1 - rank) * (mobile ? 1.2 : 1.6), 0)) < 1e-10)
      assert.ok(pose.quaternion.angleTo(new Quaternion()) < 1e-7)
      assert.equal(pose.scale, mobile ? .5 : 1)
      assert.equal(pose.opacity, 1)
    })
    assert.deepEqual(zDepth.sample(-1, mobile, 0), zDepth.sample(0, mobile, 0))
    assert.deepEqual(zDepth.sample(2, mobile, 0), zDepth.sample(1, mobile, 0))
  }
})

test('rapid or reversed input only adds bounded banking and never changes position or ownership', () => {
  for (const mobile of [false, true]) {
    for (const progress of [0, .18, .37, .65, .83, 1]) {
      const still = zDepth.sample(progress, mobile, 0)
      for (const velocity of [-100, -.5, .5, 100]) {
        const moving = zDepth.sample(progress, mobile, velocity)
        assert.equal(moving.focus, still.focus)
        assert.deepEqual(moving.ambient, still.ambient)
        moving.poses.forEach((pose, index) => {
          assert.deepEqual(pose.position, still.poses[index].position)
          assert.ok(pose.quaternion.angleTo(still.poses[index].quaternion) < .027)
        })
      }
    }
  }
})
