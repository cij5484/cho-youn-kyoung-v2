import test from 'node:test'
import assert from 'node:assert/strict'
import { menuKeyTimings } from '../src/navigation/menu-reveal.ts'

test('menu keys use bounded, irregular starts and distinct travel speeds on one reversible clock', () => {
  assert.equal(menuKeyTimings.length,6)
  for (const [start,end] of menuKeyTimings) assert.ok(start >= 0 && end > start && end + .02 <= 1)
  const pages = menuKeyTimings.slice(1)
  assert.ok(pages.some(([start],i) => i > 0 && start < pages[i-1][0]))
  assert.equal(new Set(pages.map(([start,end]) => (end-start).toFixed(3))).size,5)
})
