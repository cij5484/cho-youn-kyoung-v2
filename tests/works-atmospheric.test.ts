import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { atmosphericDepth, atmosphericFit, atmosphericTextureSize, atmosphericTimeline } from '../src/works/candidates/atmospheric-engine.ts'
import { archiveAssembly } from '../src/works/candidates/atmospheric-archive-motion.ts'

import { atmosphericCatalog, filterAtmosphericWorks } from '../src/works/candidates/atmospheric-catalog.ts'
import { worksCatalog } from '../src/works/catalog.ts'
const count = atmosphericCatalog.length

test('desktop archive reveals its final preview without an expanded thumbnail-list stage; touch stays unchanged', () => {
  let previousPreview = 0
  for (let step = 0; step <= 100; step++) {
    const expansion = step / 100
    const desktop = archiveAssembly(expansion, true)
    assert.equal(desktop.rowExpansion, 0)
    assert.ok(desktop.previewOpacity >= previousPreview)
    assert.ok(desktop.railOpacity >= 0 && desktop.railOpacity <= 1)
    previousPreview = desktop.previewOpacity
    const touch = archiveAssembly(expansion, false)
    assert.equal(touch.rowExpansion, expansion)
    assert.equal(touch.railOpacity, 1)
  }
  assert.equal(archiveAssembly(0, true).previewOpacity, 0)
  assert.equal(archiveAssembly(1, true).previewOpacity, 1)
  assert.equal(archiveAssembly(1, true).railOpacity, 0)
})

test('route curtain cannot suspend the first WORKS frame or expose a black resized buffer', () => {
  const source = readFileSync(new URL('../src/works/candidates/atmospheric-engine.ts', import.meta.url), 'utf8')
  assert.ok(source.includes("dialog[open]:not(.global-page-transition)"))
  assert.equal((source.match(/= blockingDialog\(\)/g) ?? []).length, 2, 'initial state and observer use the same rule')
  assert.match(source, /renderer\.setClearColor\(ivory, 1\)/)
  assert.match(source, /renderer\.setSize\(width, height, false\)[\s\S]*?renderer\.clear\(\)/)
})

const atWork = (index: number, local: number) => (index + local - .18) / (count - .54) * .86

test('each work has a short readable hold, stable atmosphere and subtle continuous camera travel', () => {
  for (const mobile of [false, true]) {
    for (let index = 0; index < count; index++) {
      const first = atmosphericTimeline(atWork(index, .34), mobile)
      const last = atmosphericTimeline(atWork(index, .41), mobile)
      assert.equal(first.focus, index)
      assert.equal(first.phase, 'hold')
      assert.equal(last.phase, 'hold')
      const travel = first.cameraZ - last.cameraZ
      assert.ok(travel >= 0 && travel < first.gap * .02)
      if (index < count - 1) assert.ok(travel > 0)
      assert.equal(atmosphericTimeline(atWork(index, .44), mobile).phase, 'departure')
      assert.equal(first.mood, index)
      assert.equal(last.mood, index)
      assert.equal(atmosphericDepth(index, first.cursor).opacity, 1)
      if (index < count - 1) assert.equal(atmosphericDepth(index + 1, last.cursor).opacity, 0)
    }
    assert.equal(atmosphericTimeline(.86, mobile).resolution, 0)
    assert.equal(atmosphericTimeline(1, mobile).resolution, 1)
  }
})

test('approach/departure are continuous and reversible without two competing main images', () => {
  for (let tick = 1; tick <= count * 1000; tick++) {
    const cursor = tick / 1000
    let main = 0
    for (let index = 0; index < count; index++) {
      const current = atmosphericDepth(index, cursor)
      const previous = atmosphericDepth(index, cursor - .001)
      assert.ok(current.opacity >= 0 && current.opacity <= 1)
      assert.ok(Math.abs(current.opacity - previous.opacity) < .006)
      assert.deepEqual(current, atmosphericDepth(index, cursor))
      if (current.opacity > .55) main++
    }
    assert.ok(main <= 1)
  }
  assert.equal(atmosphericDepth(0, 2).opacity, 0)
})

test('texture budgets preserve actual aspect and never upscale', () => {
  for (const mobile of [false, true]) {
    for (const [width, height] of [[1600, 1420], [1555, 2200], [1440, 2036], [1414, 2000], [300, 400]]) {
      const result = atmosphericTextureSize(width, height, mobile)
      assert.ok(Math.max(result.width, result.height) <= (mobile ? 1024 : 1600))
      assert.ok(result.width <= width && result.height <= height)
      assert.ok(Math.abs(result.width / result.height - width / height) < .0015)
    }
  }
})

test('focus fits all four edges inside measured mobile, laptop and ultrawide safe areas', () => {
  for (const [viewportWidth, height, top, bottom] of [[390, 776, 138, 553], [320, 632, 123, 409], [1366, 700, 175, 480], [3440, 1360, 190, 1140], [5120, 1360, 190, 1140]]) {
    const mobile = viewportWidth <= 700
    const width = Math.min(viewportWidth, 1880)
    const distance = mobile ? 7.7 : 10.4
    const span = 2 * distance * Math.tan((mobile ? 43 : 42) * Math.PI / 360)
    for (const ratio of [.888, 1.414, 1.426]) {
      const fit = atmosphericFit(ratio, distance, width, height, top, bottom, mobile)
      const center = (1 - 2 * fit.y / span) * height / 2
      const halfHeight = fit.width * ratio / span * height / 2
      assert.ok(center - halfHeight >= top)
      assert.ok(center + halfHeight <= bottom)
      assert.ok(fit.width / span * height <= width * .85)
    }
  }
})


test('local A includes Ji Young-hee without promoting the shared public-reference catalog', () => {
  assert.equal(count, 7)
  assert.equal(filterAtmosphericWorks('albums').length, 4)
  assert.equal(filterAtmosphericWorks('performances').length, 3)
  assert.ok(atmosphericCatalog.some(record => record.id === 'album:ji-young-hee-ryu-haegeum-sanjo-2026'))
  assert.equal(worksCatalog.length, 6)
})


test('A groups performances before albums, newest known dates first within each group', () => {
  assert.deepEqual(atmosphericCatalog.map(record => record.type), ['performance', 'performance', 'performance', 'album', 'album', 'album', 'album'])
  assert.deepEqual(filterAtmosphericWorks('performances').map(record => record.date), ['2026-09-22', '2026-08-16', '2026-08-02'])
  assert.equal(filterAtmosphericWorks('albums')[0].image, 'jiYoungHee')
  assert.equal(filterAtmosphericWorks('albums').at(-1)?.image, 'hanBeomSu')
})
