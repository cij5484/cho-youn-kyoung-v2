import test from 'node:test'
import assert from 'node:assert/strict'
import { atmosphericCatalog, filterAtmosphericWorks } from '../src/works/candidates/atmospheric-catalog.ts'
import { worksCatalog } from '../src/works/catalog.ts'
const count = atmosphericCatalog.length

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
