import assert from 'node:assert/strict'
import { test } from 'node:test'
import { readFileSync } from 'node:fs'
import { transitionPage, pageCoverPath, pageTransitionTiming } from '../src/navigation/page-transition.ts'

test('one transition family owns only the five requested page identities', () => {
  for (const [path, title] of Object.entries({ '/': 'Home', '/works/': 'Works', '/media': 'Media', '/about/': 'About', '/contact/': 'Contact' })) {
    assert.equal(transitionPage(path), title)
    assert.equal(transitionPage(`${path}?dev=1#content`), title)
  }
  for (const path of ['/album/test/', '/performance/test/', '/en/works/', '/works-other/', '/404']) assert.equal(transitionPage(path), undefined)
  const source = readFileSync(new URL('../src/navigation/page-transition.ts', import.meta.url), 'utf8')
  assert.match(source, /sweep\(true, \(\) => \{\s*dialog.dataset.phase = 'covered'\s*navigate\(destination\)/)
  assert.match(source, /if \(!title[\s\S]+reduced.matches\) return/)
  for (const event of ['popstate', 'cancel', 'wheel']) assert.ok(source.includes(`removeEventListener('${event}'`))
})

test('paper sweep closes the full viewport and completes both phases in under one second', () => {
  assert.equal(pageCoverPath(0, true), 'M 0 100 V 100 Q 50 100 100 100 V 100 Z')
  assert.equal(pageCoverPath(1, true), 'M 0 100 V 0 Q 50 0 100 0 V 100 Z')
  assert.equal(pageCoverPath(0, false), 'M 0 0 V 100 Q 50 100 100 100 V 0 Z')
  assert.equal(pageCoverPath(1, false), 'M 0 0 V 0 Q 50 0 100 0 V 0 Z')
  assert.match(pageCoverPath(.5, true), /V 50 Q 50 0 100 50/)
  assert.equal(pageCoverPath(-1, true), pageCoverPath(0, true))
  assert.equal(pageCoverPath(2, false), pageCoverPath(1, false))
  assert.ok(pageTransitionTiming.cover + pageTransitionTiming.reveal < 1)
  const style = readFileSync(new URL('../src/navigation/page-transition.css', import.meta.url), 'utf8')
  assert.doesNotMatch(style, /#292d28|nth-child/)
})
