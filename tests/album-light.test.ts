import test from 'node:test'
import assert from 'node:assert/strict'
import { advanceAlbumLight, albumLightDirection, albumLightTones, createAlbumLight } from '../src/home/album-light.ts'

const warm = albumLightTones['album:ji-young-hee-ryu-haegeum-sanjo-2026']
const cool = albumLightTones['album:yeongsan-hoesang-2026']

test('light follows actual rotation with its own lag, then stops after settling', () => {
  const light = createAlbumLight(-28, -12, warm)
  const before = light.x, target = albumLightDirection(35, -4).x
  advanceAlbumLight(light, 35, -4, warm, 1 / 60, false)
  assert.ok(light.x > before && light.x < target)
  assert.equal(light.moving, true)
  for (let i = 0; i < 300; i++) advanceAlbumLight(light, 35, -4, warm, 1 / 60, false)
  assert.equal(light.moving, false)
  assert.equal(light.energy, 0)
  assert.equal(light.x, target)
})

test('selection interpolates the actual asset tone without resetting reflection direction', () => {
  const light = createAlbumLight(-28, -12, warm)
  const x = light.x
  advanceAlbumLight(light, -28, -12, cool, 1 / 60, false)
  assert.equal(light.x, x)
  assert.ok(light.rgb.every((value, index) => value > cool[index] && value < warm[index]))
  for (let i = 0; i < 240; i++) advanceAlbumLight(light, -28, -12, cool, 1 / 60, false)
  assert.deepEqual(light.rgb, cool)
  assert.equal(light.moving, false)
})

test('reduced motion gives a static contextual tint with no delayed tail', () => {
  const light = createAlbumLight(-28, -12, warm)
  advanceAlbumLight(light, 180, 0, cool, 1 / 60, true)
  assert.deepEqual(light.rgb, cool)
  assert.equal(light.moving, false)
  assert.equal(light.energy, 0)
  assert.ok(Math.abs(light.x) < .000001)
})

test('front/back rotation and repeated full turns have bounded continuous light directions', () => {
  for (let turn = -720; turn <= 720; turn++) {
    const p = albumLightDirection(turn, 20), next = albumLightDirection(turn + 1, 20)
    assert.ok(Math.abs(p.x) <= 1 && Math.abs(p.y) <= 1)
    assert.ok(Math.abs(next.x - p.x) < .018)
  }
})
