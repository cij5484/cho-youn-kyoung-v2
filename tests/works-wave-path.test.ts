import test from 'node:test'
import assert from 'node:assert/strict'
import { Matrix3, Matrix4, Quaternion, Vector3 } from 'three'
import { OBB } from 'three/addons/math/OBB.js'
import { worksCatalog } from '../src/works/catalog.ts'
import wavePath from '../src/works/spatial/variants/wave-path.ts'

test('two wave paths retain six verified identities and focus every record', () => {
  const focused = new Set<number>()
  for (let index = 0; index <= 100; index += 1) {
    const frame = wavePath.sample(index / 100, false, 0)
    assert.equal(frame.poses.length, worksCatalog.length)
    focused.add(frame.focus)
    assert.ok(frame.ambient.every(channel => channel >= 0 && channel <= 1))
  }
  assert.equal(focused.size, 6)
  assert.equal(wavePath.id, 'wave-path')
})

test('actual 3D tangent orientations change smoothly and reverse to the same state', () => {
  for (const mobile of [false, true]) {
    let previous = wavePath.sample(0, mobile, 0)
    let change = 0
    for (let tick = 1; tick <= 1000; tick += 1) {
      const progress = tick / 1000
      const frame = wavePath.sample(progress, mobile, 0)
      const reverse = wavePath.sample(progress, mobile, 0)
      frame.poses.forEach((pose, index) => {
        assert.ok([...pose.position.toArray(), ...pose.quaternion.toArray(), pose.scale, pose.opacity].every(Number.isFinite))
        assert.ok(Math.abs(pose.quaternion.length() - 1) < 1e-8)
        assert.ok(pose.quaternion.angleTo(reverse.poses[index].quaternion) < 1e-7)
        assert.ok(pose.quaternion.angleTo(previous.poses[index].quaternion) < .12)
        assert.ok(pose.position.distanceTo(previous.poses[index].position) < .18)
        assert.ok(pose.opacity >= 0 && pose.opacity <= 1)
        change = Math.max(change, pose.quaternion.angleTo(wavePath.sample(0, mobile, 0).poses[index].quaternion))
      })
      previous = frame
    }
    assert.ok(change > .3, 'The plates must not remain camera-facing billboards.')
  }
})

test('mobile uses a visible central work with partial neighbours, never tiny fragments', () => {
  for (let tick = 0; tick <= 800; tick += 1) {
    const frame = wavePath.sample(tick / 1000, true, 0)
    const pose = frame.poses[frame.focus]
    assert.ok(Math.abs(pose.position.x) < .65)
    assert.ok(Math.abs(pose.position.y) < .56)
    assert.equal(pose.opacity, 1)
    assert.ok(pose.scale >= 1.56)
    assert.ok(pose.quaternion.angleTo(new Quaternion()) < .4)
    assert.ok(frame.poses.filter(item => item.opacity > .01).length <= 4)
  }
})

test('last twenty percent unfolds both paths into the shared compact archive coordinates', () => {
  assert.equal(wavePath.sample(.8, false, 0).resolution, 0)
  assert.ok(Math.abs(wavePath.sample(.9, false, 0).resolution - .5) < 1e-8)
  for (const mobile of [false, true]) {
    const frame = wavePath.sample(1, mobile, 0)
    const ranks = { album: 0, performance: 0 }
    frame.poses.forEach((pose, index) => {
      const type = worksCatalog[index].type
      const rank = ranks[type]++
      assert.ok(Math.abs(pose.position.x - (type === 'album' ? -1 : 1) * (mobile ? .75 : 2.4)) < 1e-8)
      assert.ok(Math.abs(pose.position.y - (mobile ? 1.2 : 1.6) * (1 - rank)) < 1e-8)
      assert.ok(Math.abs(pose.position.z) < 1e-8)
      assert.ok(pose.quaternion.angleTo(new Quaternion()) < 1e-7)
      assert.ok(Math.abs(pose.scale - (mobile ? .5 : 1)) < 1e-8)
      assert.equal(pose.opacity, 1)
    })
  }
})

test('rapid input contributes only restrained banking without changing the focus or path', () => {
  for (const velocity of [-100, -1, 1, 100]) {
    const still = wavePath.sample(.3, false, 0)
    const moving = wavePath.sample(.3, false, velocity)
    assert.equal(moving.focus, still.focus)
    moving.poses.forEach((pose, index) => {
      assert.ok(pose.quaternion.angleTo(still.poses[index].quaternion) <= .045001)
      assert.ok(pose.position.distanceTo(still.poses[index].position) <= .120001)
    })
  }
})

test('the crossing paths preserve physical clearance instead of slicing through artwork', () => {
  for (const mobile of [false, true]) {
    for (let tick = 0; tick <= 800; tick += 1) {
      const frame = wavePath.sample(tick / 1000, mobile, 0)
      const boxes = frame.poses.map((pose, index) => {
        const album = worksCatalog[index].type === 'album'
        return new OBB(pose.position, new Vector3(pose.scale / 2, pose.scale * (album ? .8875 : 1.42) / 2, pose.scale * (album ? .009 : .003) / 2),
          new Matrix3().setFromMatrix4(new Matrix4().makeRotationFromQuaternion(pose.quaternion)))
      })
      for (let a = 0; a < boxes.length; a += 1) {
        for (let b = a + 1; b < boxes.length; b += 1) {
          if (frame.poses[a].opacity > .2 && frame.poses[b].opacity > .2) {
            assert.equal(boxes[a].intersectsOBB(boxes[b]), false, `${mobile ? 'mobile' : 'desktop'} ${tick}: ${a}/${b}`)
          }
        }
      }
    }
  }
})
