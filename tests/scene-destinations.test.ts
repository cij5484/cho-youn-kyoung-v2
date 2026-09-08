import test from 'node:test'
import assert from 'node:assert/strict'
import { homeSceneIndex, sceneDestinationFrames, sceneFrameTop, sceneJumpState } from '../src/home/scene-destinations.ts'

test('revisit index maps only the seven existing scenes in their actual order', () => {
  assert.deepEqual(homeSceneIndex.map(scene => scene.id), ['hero','haegeum','sound','works','album','performance','artist'])
  assert.deepEqual(homeSceneIndex.map(scene => scene.number), ['01','02','03','04','05','06','07'])
  assert.equal(new Set(homeSceneIndex.map(scene => scene.id)).size, 7)
})

test('existing viewing frames preserve section geometry and the restored first-work ribbon', () => {
  assert.equal(sceneFrameTop(3000, 1550, sceneDestinationFrames.haegeum), 4519)
  assert.equal(sceneFrameTop(8000, 2300, sceneDestinationFrames.performance), 8724.5)
  assert.equal(sceneFrameTop(8000, 2300, sceneDestinationFrames.artist), 10024)
  assert.equal(sceneFrameTop(5000, 900, sceneDestinationFrames.works), 5000)
  assert.ok(sceneDestinationFrames.performance >= .24 && sceneDestinationFrames.performance <= .39)
  assert.ok(sceneDestinationFrames.artist >= .85 && sceneDestinationFrames.artist < .91)
})

test('static or incomplete geometry never adds a negative travel or overshoots its section', () => {
  assert.equal(sceneFrameTop(8000, -200, .88), 8000)
  assert.equal(sceneFrameTop(8000, 1000, 1.4), 9000)
  assert.equal(sceneFrameTop(8000, 1000, -.4), 8000)
})

test('fresh input cancels immediately, arrival requires settled movement, and the owner is finite', () => {
  assert.equal(sceneJumpState(100, 20, 0, true), 'cancelled')
  assert.equal(sceneJumpState(0, 20, 0), 'moving')
  assert.equal(sceneJumpState(1, 500, 85), 'arrived')
  assert.equal(sceneJumpState(100, 2700, 100), 'cancelled')
})
