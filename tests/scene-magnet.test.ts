import test from 'node:test'
import assert from 'node:assert/strict'
import { consumeMagnet, magnetSettlement, magnetTargetAt, magnetTuning, mayAlignMagnet, visitMagnet,
  type MagnetTarget } from '../src/experience-prototype/scene-magnet-model.ts'

const sound: MagnetTarget = { scene: 'sound', top: 2300, radius: 120, leaveRadius: 260, ready: true }
const stage: MagnetTarget = { scene: 'performance', top: 8300, radius: 100, leaveRadius: 240, ready: true }
const quiet = { target: sound, visit: visitMagnet({ scene: null, consumed: false }, 'sound'), top: 2240,
  now: 1500, lastInput: 1000, lastScroll: 1200, lastRapid: 0, armed: true,
  held: false, priority: false, reduced: false, zoomed: false, hidden: false }

test('only a nearby authored scene is eligible, never a distant scene or the sections between', () => {
  assert.equal(magnetTargetAt([sound, stage], 2240), sound)
  assert.equal(magnetTargetAt([sound, stage], 8350), stage)
  assert.equal(magnetTargetAt([sound, stage], 4500), null)
  assert.equal(mayAlignMagnet(quiet), true)
  assert.equal(mayAlignMagnet({ ...quiet, top: 2300 }), false)
  assert.equal(mayAlignMagnet({ ...quiet, top: 2000 }), false)
  assert.ok(magnetTuning.performanceFrame > .24 && magnetTuning.performanceFrame < .39)
})

test('actual inertia and input must both settle; fast passes cannot become forced stops', () => {
  assert.equal(mayAlignMagnet({ ...quiet, lastInput: 1450 }), false)
  assert.equal(mayAlignMagnet({ ...quiet, lastScroll: 1450 }), false)
  assert.equal(mayAlignMagnet({ ...quiet, lastRapid: 1300 }), false)
  assert.equal(mayAlignMagnet({ ...quiet, armed: false }), false)
  assert.equal(mayAlignMagnet({ ...quiet, target: { ...sound, ready: false } }), false)
})

test('touch, pinch, keyboard/explicit destination, hidden document and reduced motion all win', () => {
  for (const key of ['held', 'priority', 'reduced', 'zoomed', 'hidden'] as const) {
    assert.equal(mayAlignMagnet({ ...quiet, [key]: true }), false, key)
  }
})

test('cancel and completed landing consume the visit until leaving and re-entering', () => {
  const consumed = consumeMagnet(quiet.visit)
  assert.equal(mayAlignMagnet({ ...quiet, visit: consumed }), false)
  const same = visitMagnet(consumed, 'sound')
  assert.equal(same.consumed, true)
  assert.equal(magnetTargetAt([sound], 2110, true), sound) // Hysteresis prevents edge oscillation.
  const left = visitMagnet(same, null), returned = visitMagnet(left, 'sound')
  assert.equal(mayAlignMagnet({ ...quiet, visit: returned }), true)
})

test('landing requires both destination and settled movement, with a finite cleanup bound', () => {
  assert.equal(magnetSettlement(1, 200, 0), 'aligning')
  assert.equal(magnetSettlement(8, 300, 100), 'aligning')
  assert.equal(magnetSettlement(1, 300, 100), 'aligned')
  assert.equal(magnetSettlement(8, magnetTuning.maximumAlignment, 100), 'cancelled')
})
