import test from 'node:test'
import assert from 'node:assert/strict'
import { mediaFilmScrollState, mediaLoomFrame, mediaLoomGeometry, mediaLoomState } from '../src/media/media-loom-model.ts'

test('scroll selects all three films in both directions, including endpoints and fast jumps', () => {
  assert.deepEqual([0, .2, .34, .6, .8, 1, .5, 0].map(p => mediaFilmScrollState(p, 3).index), [0, 0, 1, 1, 2, 2, 1, 0])
  assert.equal(mediaFilmScrollState(-1, 3).index, 0)
  assert.equal(mediaFilmScrollState(2, 3).index, 2)
  assert.equal(mediaFilmScrollState(.5, 1).index, 0)
  const paused = mediaFilmScrollState(.2, 3)
  assert.ok(paused.value > 0 && paused.value < .5)
  assert.deepEqual(mediaFilmScrollState(.2, 3), paused)
  for (let step = 1; step <= 1000; step++) {
    const before = mediaFilmScrollState((step - 1) / 1000, 3), now = mediaFilmScrollState(step / 1000, 3)
    assert.ok(Math.abs(mediaLoomState(now.value).tear - mediaLoomState(before.value).tear) < .03)
  }
})

test('loom is a complete image at both endpoints and unravels reversibly between them', () => {
  assert.equal(mediaLoomState(0).tear, 0)
  assert.equal(mediaLoomState(1).tear, 0)
  assert.equal(mediaLoomState(.5).tear, 1)
  assert.equal(mediaLoomState(1).phase, 'reformed')
  for (let tick = 1; tick <= 1000; tick++) {
    const before = mediaLoomState((tick - 1) / 1000), now = mediaLoomState(tick / 1000)
    assert.ok(Math.abs(now.tear - before.tear) < .005)
    assert.ok(now.tear >= 0 && now.tear <= 1)
  }
  assert.deepEqual(mediaLoomState(-1), mediaLoomState(0))
  assert.deepEqual(mediaLoomState(2), mediaLoomState(1))
})

test('independent ribbon edges retain full-image UVs and frame fits mobile and desktop', () => {
  const data = mediaLoomGeometry(26, 24)
  assert.equal(data.position.length / 3, 26 * 2 * 25)
  assert.equal(data.index.length, 26 * 24 * 6)
  for (let row = 0; row < 26; row++) {
    const vertices = data.index.slice(row * 24 * 6, (row + 1) * 24 * 6)
    assert.ok(vertices.every(index => index >= row * 50 && index < (row + 1) * 50))
  }
  assert.equal(Math.min(...data.uv), 0)
  assert.equal(Math.max(...data.uv), 1)
  for (const [width, height] of [[402, 896], [1498, 896], [402, 380]]) {
    const frame = mediaLoomFrame(width, height, 16 / 9)
    assert.ok(frame.width * 1.08 < width && frame.height * 1.08 < height)
    assert.ok(Math.abs(frame.width / frame.height - 16 / 9) < .00001)
  }
})
