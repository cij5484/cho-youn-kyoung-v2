import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { chronologicalWorks, filterWorks, readWorksFilter, workDate, worksCatalog } from '../src/works/catalog.ts'
import { convergenceProgress, reflowTransform, worldTransform } from '../src/works/motion.ts'

test('whole audited source projects three eligible albums and all three performances without HOME/private imports', () => {
  const manifest = JSON.parse(readFileSync(new URL('../src/works/source-manifest.json', import.meta.url), 'utf8'))
  assert.deepEqual(manifest.completeSourceCounts, { albums: 4, performances: 3 })
  assert.equal(manifest.excluded.count, 1)
  assert.equal(filterWorks('albums').length, 3)
  assert.equal(filterWorks('performances').length, 3)
  assert.equal(new Set(worksCatalog.map(record => record.id)).size, 6)
  assert.ok(!JSON.stringify(worksCatalog).includes('ji-young-hee'))
  assert.ok(worksCatalog.some(record => record.year === 2020))
  assert.ok(worksCatalog.some(record => record.id.endsWith('2026-08-02')))
  assert.ok(!readFileSync(new URL('../src/works/assets.ts', import.meta.url), 'utf8').includes('home/content'))
})

test('record links use verified original-site routes, never V2 fixture details; facts retain source precision', () => {
  for (const record of worksCatalog) {
    const url = new URL(record.referenceUrl)
    assert.equal(url.origin, 'https://choyounkyoung.com')
    assert.equal(url.pathname, '/')
    assert.ok(url.hash.startsWith(`#/${record.type}/`))
    assert.ok(!url.href.includes('test-'))
  }
  const announced = worksCatalog.filter(record => 'releaseState' in record && record.releaseState === 'announced')
  assert.equal(announced.length, 2)
  assert.ok(announced.every(record => !('date' in record) && workDate(record) === '2026'))
})

test('query filters are bounded, reversible, and chronological order does not invent dates', () => {
  assert.equal(readWorksFilter(null), 'all')
  assert.equal(readWorksFilter('unsupported'), 'all')
  assert.equal(readWorksFilter('albums'), 'albums')
  assert.equal(filterWorks('all'), worksCatalog)
  assert.ok(filterWorks('performances').every(record => record.type === 'performance'))
  const ordered = chronologicalWorks(worksCatalog)
  assert.deepEqual(ordered.slice(0, 3).map(record => record.date), ['2026-09-22', '2026-08-16', '2026-08-02'])
  assert.equal(ordered.at(-1)?.date, '2020-11-19')
  assert.equal(worksCatalog[0].image, 'yeongsan')
})

test('convergence uses actual opening/destination geometry and lands the same image exactly', () => {
  assert.equal(convergenceProgress(0, 400, 1200), 0)
  assert.equal(convergenceProgress(8000, 400, 1200), 1)
  assert.equal(convergenceProgress(800, 400, 1200), .5)
  assert.equal(convergenceProgress(400, 400, 400), 0)
  const opening = { left: 100, top: 600, width: 600, height: 530 }
  const destination = { left: 180, top: 1500, width: 400, height: 353.33 }
  assert.equal(worldTransform(opening, destination, 0), 'translate3d(-80px, -900px, 0) scale(1.5)')
  assert.equal(worldTransform(opening, destination, .5), 'translate3d(-40px, -450px, 0) scale(1.25)')
  assert.equal(worldTransform(opening, destination, 1), 'translate3d(0px, 0px, 0) scale(1)')
  assert.equal(worldTransform(opening, destination, -3), worldTransform(opening, destination, 0))
  assert.equal(worldTransform(opening, destination, 4), worldTransform(opening, destination, 1))
  assert.equal(reflowTransform({ left: 120, top: 600, width: 200, height: 300 }, { left: 20, top: 400, width: 400, height: 600 }), 'translate(100px, 200px) scale(0.5, 0.5)')
})
