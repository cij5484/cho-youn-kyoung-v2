import test from 'node:test'
import assert from 'node:assert/strict'
import { timePathCheckpoint, timePathFrame, timePathGeometry } from '../src/performance-detail/time-path.ts'

test('six scroll checkpoints settle on their exact year and preserve both endpoints', () => {
  for (let index = 0; index < 6; index++) {
    const frame = timePathFrame(timePathCheckpoint(index, 6), 6)
    assert.equal(frame.active, index)
    assert.equal(frame.segment + frame.along, index)
  }
  assert.equal(timePathFrame(-1, 6).active, 0)
  assert.deepEqual(timePathFrame(1, 6), { segment: 4, along: 1, active: 5, overview: 1 })
  for (const mobile of [false, true]) {
    const geometry = timePathGeometry(402, 500, 6, mobile)
    assert.equal(geometry.segments.length, 5)
    assert.equal((geometry.path.match(/M /g) ?? []).length, 1)
    assert.equal((geometry.path.match(/C /g) ?? []).length, 5)
    geometry.segments.forEach((segment, index) => {
      const start = geometry.anchors[index], end = geometry.anchors[index + 1]
      assert.ok(segment.startsWith(`M ${start.x} ${start.y} C`))
      assert.ok(segment.endsWith(`${end.x} ${end.y}`))
    })
  }
})
