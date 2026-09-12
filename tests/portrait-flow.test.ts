import test from 'node:test'
import assert from 'node:assert/strict'
import { portraitHelix, portraitStrip, portraitSignature, portraitFrontTurn } from '../src/about/portrait-flow-model.ts'

test('focus aligns every portrait frontward by the shortest turn from its actual rotation', () => {
  for (const count of [1, 12]) for (let index = 0; index < count; index++) {
    for (const turn of [-31, -Math.PI, -.4, 0, .4, Math.PI, 31]) {
      const aligned = portraitFrontTurn(index, count, turn)
      const pose = portraitHelix(index, count, 390, 729, aligned)
      assert.ok(Math.abs(aligned - turn) <= Math.PI + 1e-12)
      assert.ok(Math.abs(pose.x) < 1e-10)
      assert.ok(Math.abs(pose.z - Math.min(390 * .29, 729 * .34)) < 1e-10)
      assert.ok(Math.abs(Math.sin(pose.rotationY * Math.PI / 180)) < 1e-12)
      assert.ok(Math.abs(portraitFrontTurn(index, count, aligned) - aligned) < 1e-12)
    }
  }
})

test('portraits spread through depth and settle into one invariant vertical column', () => {
  for (const [width, height] of [[402, 896], [1498, 896]]) {
    const helix = Array.from({ length: 12 }, (_, i) => portraitHelix(i, 12, width, height))
    assert.ok(Math.min(...helix.map(p => p.z)) < -100)
    assert.ok(Math.max(...helix.map(p => p.z)) > 100)
    assert.ok(new Set(helix.map(p => Math.round(p.rotationY))).size > 6)
    for (const turn of [0, .65]) for (let i = 0; i < 12; i++) {
      const p = portraitHelix(i, 12, width, height, turn)
      const projection = 1000 / (1000 - p.z)
      assert.ok((Math.abs(p.y) + height * .19 / 2) * projection < height / 2)
    }
    const column = Array.from({ length: 12 }, (_, i) => portraitStrip(i, 12, width, height, 2 / 3))
    assert.equal(new Set(column.map(p => p.x)).size, 1)
    column.forEach((p, i) => {
      assert.equal(p.z, 0); assert.equal(p.rotationY, 0)
      assert.ok(p.scale > 0)
      if (i) assert.ok(p.y > column[i - 1].y)
      assert.ok(Math.abs(p.y) + 150 * p.scale < height / 2)
    })
    assert.deepEqual(portraitStrip(3, 12, width, height, 2 / 3), column[3])
  }
})

test('drag rotation travels around the helix without changing height and is periodic', () => {
  for (const width of [363, 1280]) for (let i = 0; i < 12; i++) {
    const initial = portraitHelix(i, 12, width, 800, .4)
    const quarter = portraitHelix(i, 12, width, 800, .4 + Math.PI / 2)
    const full = portraitHelix(i, 12, width, 800, .4 + Math.PI * 2)
    assert.equal(initial.y, quarter.y)
    assert.ok(Math.abs(initial.x - quarter.x) + Math.abs(initial.z - quarter.z) > 50)
    assert.ok(Math.abs(initial.x - full.x) < 1e-9 && Math.abs(initial.z - full.z) < 1e-9)
  }
})

test('signature weaves through front and rear depth with continuous bounded motion', () => {
  for (const width of [363, 1280]) for (const instrument of [0, 1]) {
    const points = Array.from({ length: 1200 }, (_, i) => portraitSignature(i / 60, instrument, width, 800))
    assert.ok(Math.min(...points.map(p => p.z)) < -100 && Math.max(...points.map(p => p.z)) > 100)
    points.forEach((p, i) => {
      assert.ok(Math.abs(p.y) < 800 * .3)
      if (i) assert.ok(Math.hypot(p.x - points[i - 1].x, p.y - points[i - 1].y, p.z - points[i - 1].z) < 10)
    })
    const p = points[0], rotated = portraitSignature(0, instrument, width, 800, Math.PI)
    assert.ok(Math.abs(p.x + rotated.x) < 1e-9 && Math.abs(p.z + rotated.z) < 1e-9)
  }
})
