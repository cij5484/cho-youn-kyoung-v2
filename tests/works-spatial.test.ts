import test from 'node:test'
import assert from 'node:assert/strict'
import { Quaternion, Vector3 } from 'three'
import { worksCatalog } from '../src/works/catalog.ts'
import { dampValue, focusedPlacement, nearestPlacements, spatialCursor, spatialPlacements, spatialPose, spatialTimeline, spatialTuning } from '../src/works/spatial/model.ts'

const placements = spatialPlacements(worksCatalog.map(record => record.type))

test('all six verified records occupy two phase-separated category strands', () => {
  assert.equal(placements.length, 6)
  const album = placements.find(item => item.type === 'album')!
  const performance = placements.find(item => item.type === 'performance')!
  assert.equal(performance.phase - album.phase, Math.PI)
  const a = spatialPose(album, .6, 0, false)
  const b = spatialPose(performance, .6, 0, false)
  assert.ok(Math.abs(a.position.x + b.position.x) < .000001)
  assert.ok(Math.abs(a.position.z + b.position.z) < .000001)
  assert.equal(new Set(placements.map(item => item.focusAngle)).size, 6)
})

test('curve basis is orthonormal, orientation changes in real space, and focus becomes readable', () => {
  const item = placements[0]
  const focus = spatialPose(item, item.focusAngle, 0, false)
  const side = spatialPose(item, item.focusAngle + Math.PI / 2, 0, false)
  const back = spatialPose(item, item.focusAngle + Math.PI, 0, false)
  assert.ok(Math.abs(side.radial.dot(side.tangent)) < 1e-8)
  assert.ok(Math.abs(side.radial.dot(side.up)) < 1e-8)
  assert.ok(Math.abs(side.up.length() - 1) < 1e-8)
  assert.ok(focus.quaternion.angleTo(new Quaternion()) < .02)
  assert.ok(focus.quaternion.angleTo(side.quaternion) > 1)
  assert.ok(focus.quaternion.angleTo(back.quaternion) > 2.8)
  const normal = new Vector3(0, 0, 1).applyQuaternion(side.quaternion)
  assert.ok(Math.abs(normal.x) > .9)
})

test('forward and reverse sampling have finite normalized quaternions without 180 degree flips', () => {
  for (const mobile of [false, true]) {
    for (const item of placements) {
      let previous: Quaternion | null = null
      for (let tick = 0; tick <= 1000; tick += 1) {
        const angle = tick / 1000 * 10 - 1
        const pose = spatialPose(item, angle, 0, mobile)
        const reverse = spatialPose(item, angle, 0, mobile)
        assert.ok([...pose.position.toArray(), ...pose.quaternion.toArray()].every(Number.isFinite))
        assert.ok(Math.abs(pose.quaternion.length() - 1) < 1e-8)
        assert.ok(pose.quaternion.angleTo(reverse.quaternion) < 1e-7)
        if (previous) assert.ok(previous.angleTo(pose.quaternion) < .08)
        previous = pose.quaternion
      }
    }
  }
})

test('scroll resolution reduces true depth into two compact readable columns and retains focus access', () => {
  const timeline = spatialTimeline(1, placements)
  assert.equal(timeline.resolution, 1)
  for (const item of placements) {
    const pose = spatialPose(item, timeline.angle, 1, false, 25)
    assert.equal(pose.position.z, 0)
    assert.ok(pose.quaternion.angleTo(new Quaternion()) < 1e-7)
    assert.ok(pose.scale < 1.8)
    assert.equal(focusedPlacement(item.focusAngle, placements), item.index)
    assert.equal(nearestPlacements(item.focusAngle, placements).length, 3)
  }
  assert.equal(spatialTimeline(-10, placements).angle, 0)
  assert.equal(spatialTimeline(10, placements).resolution, 1)
})

test('damping is bounded without overshoot and camera/DPR budgets stay authored per viewport', () => {
  let value = 0
  for (let step = 0; step < 200; step += 1) { value = dampValue(value, 1, 1 / 60); assert.ok(value >= 0 && value <= 1) }
  assert.ok(value > .9999)
  value = dampValue(value, 0, 1 / 60)
  assert.ok(value > 0 && value < 1)
  assert.ok(spatialTuning.mobile.radius < spatialTuning.desktop.radius / 2)
  assert.equal(spatialTuning.mobile.dpr, 1.25)
  assert.equal(spatialTuning.desktop.dpr, 1.5)
  assert.ok(spatialTuning.desktop.fov >= 35 && spatialTuning.desktop.fov <= 45)
})

test('mobile active plate stays inside the viewing arc while distant plates retreat without miniature fragments', () => {
  const last = spatialTimeline(.8, placements).angle
  for (let tick = 0; tick <= 1000; tick += 1) {
    const angle = last * tick / 1000
    const cursor = spatialCursor(angle, placements)
    const active = placements[focusedPlacement(angle, placements)]
    const pose = spatialPose(active, angle, 0, true, 0, cursor)
    assert.ok(Math.abs(pose.position.y) < .4)
    assert.equal(pose.visibility, 1)
    assert.ok(pose.quaternion.angleTo(new Quaternion()) < .7)
    for (const item of placements) {
      const other = spatialPose(item, angle, 0, true, 0, cursor)
      if (Math.abs(item.order - cursor) > 1.63) assert.equal(other.visibility, 0)
      assert.equal(other.scale, item.type === 'album' ? spatialTuning.mobile.albumWidth : spatialTuning.mobile.posterWidth)
    }
  }
})

test('mobile authored cursor has continuous orientation through every irregular focus interval', () => {
  for (const item of placements) {
    let previous: Quaternion | null = null
    for (let tick = 0; tick <= 1000; tick += 1) {
      const angle = spatialTimeline(.8, placements).angle * tick / 1000
      const pose = spatialPose(item, angle, 0, true, 0, spatialCursor(angle, placements))
      if (previous) assert.ok(previous.angleTo(pose.quaternion) < .1)
      previous = pose.quaternion
    }
  }
})
