import test from 'node:test'
import assert from 'node:assert/strict'
import { autonomousWetBlock, desktopWetReady, desktopWetTiming, outroInputSource, wetScrollActivity } from '../src/home/outro-surface-model.ts'

test('authored mobile layout receives real point sources even with a desktop fine pointer', () => {
  assert.equal(outroInputSource(true, true, false), 'points')
  assert.equal(outroInputSource(false, true, false), 'points')
  assert.equal(outroInputSource(false, false, false), 'points')
  assert.equal(outroInputSource(true, false, false), 'pointer')
  assert.equal(outroInputSource(true, true, true), 'static')
})

test('unchanged position cannot reset the native quiet clock, while actual scroll does', () => {
  const initial = { position: 1234, at: 1000 }
  let activity = initial
  // Scheduler/style wakes do not become scrolling, even if considered every animation frame.
  for (let now = 1000; now < 5000; now += 16) activity = wetScrollActivity(activity, 1234, now)
  assert.equal(activity, initial)
  const ready = { now: 5000, enteredAt: 1000, lastScroll: activity.at, lastStain: -2000, regions: 0, visible: true, reduced: false, touching: false }
  assert.equal(autonomousWetBlock(ready), 'ready')
  activity = wetScrollActivity(activity, 1260, 4950)
  assert.equal(autonomousWetBlock({ ...ready, lastScroll: activity.at }), 'scroll')
  assert.equal(autonomousWetBlock({ ...ready, now: 5300, lastScroll: activity.at }), 'ready')
})

test('hundreds of desktop samples produce only representative clocked blooms, capped at three', () => {
  let last = -Infinity, anchor = -1000, count = 0
  for (let now = 0; now <= 3500; now += 5) {
    const x = now * .65
    if (desktopWetReady({ now, lastStain: last, travel: x - anchor, sampledAt: now, regions: count })) {
      last = now; anchor = x; count++
    }
  }
  assert.equal(count, 3)
  assert.equal(desktopWetReady({ now: 10000, lastStain: last, travel: 500, sampledAt: 10000, regions: 3 }), false)
  assert.equal(desktopWetReady({ now: 10000, lastStain: last, travel: 30, sampledAt: 10000, regions: 1 }), false)
  assert.equal(desktopWetReady({ now: 10000, lastStain: last, travel: 500, sampledAt: 8000, regions: 1 }), false)
  assert.ok(desktopWetTiming.interval >= 1300 && desktopWetTiming.interval <= 1500)
  assert.ok(desktopWetTiming.life > 3)
})
