import { test } from 'node:test'
import assert from 'node:assert/strict'
import { initializeAnalytics } from '../src/seo/analytics.ts'

test('GA4 is production/top-frame only and initializes once without manual page views', () => {
  const scripts: { id?: string; src?: string }[] = []
  const frame = {}
  const pageLocation = { origin: 'http://localhost:4185' }
  const analyticsWindow = { self: frame, top: frame, dataLayer: [] as IArguments[] }
  Object.assign(globalThis, {
    window: analyticsWindow,
    location: pageLocation,
    document: {
      getElementById: (id: string) => scripts.find(script => script.id === id),
      createElement: () => ({}),
      head: { append: (script: object) => scripts.push(script) },
    },
  })
  initializeAnalytics(true)
  pageLocation.origin = 'https://choyounkyoung.com'
  initializeAnalytics(false)
  analyticsWindow.top = {}
  initializeAnalytics(true)
  assert.equal(scripts.length, 0)
  assert.equal(analyticsWindow.dataLayer.length, 0)
  analyticsWindow.top = frame
  initializeAnalytics(true)
  initializeAnalytics(true)
  assert.equal(scripts.length, 1)
  assert.match(scripts[0].src!, /id=G-BTYPR6K7NY$/)
  assert.deepEqual(analyticsWindow.dataLayer.map(command => Array.from(command).slice(0, 1)), [['js'], ['config']])
  assert.equal(analyticsWindow.dataLayer[1][1], 'G-BTYPR6K7NY')
})
