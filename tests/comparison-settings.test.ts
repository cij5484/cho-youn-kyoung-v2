import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readComparison, comparisonSearch, resetComparison, comparisonAddress } from '../src/experience-prototype/comparison-settings.ts'
import { experienceCanonical, createDraft } from '../src/home/experience/config.ts'

const saved = JSON.stringify(createDraft({ ...experienceCanonical, portrait: 'straight', magnet: false, color: 'rust' }))
test('published pages ignore every developer opt-in and saved draft', () => {
  for (const search of ['?dev=1', '?compare', '?all=a', '?all=b&study=type', '?dev=1&portrait=off&magnet=off']) {
    const state = readComparison(search, false, saved)
    assert.equal(state.enabled, false); assert.equal(state.available, false); assert.equal(state.study, false)
    for (const key of Object.keys(experienceCanonical) as (keyof typeof experienceCanonical)[]) assert.equal(state[key], experienceCanonical[key])
  }
})
test('ordinary URL and dev=0 always use canonical, while local only exposes a collapsed launcher', () => {
  for (const search of ['', '?portrait=off&magnet=off', '?dev=0&all=a&portrait=off&magnet=off']) {
    const state = readComparison(search, false, saved)
    assert.equal(state.portrait, 'hanji'); assert.equal(state.magnet, true); assert.equal(state.points, true)
    assert.equal(state.color, 'lacquer'); assert.equal(state.enabled, false)
  }
  assert.equal(readComparison('', false).available, false)
  assert.equal(readComparison('', true, saved).available, true)
  assert.equal(readComparison('', true, saved).open, false)
  assert.equal(readComparison('', true, saved).portrait, 'hanji')
})
test('explicit development URL overrides saved draft, and missing values fall back to canonical', () => {
  const draft = readComparison('?dev=1', true, saved)
  assert.equal(draft.portrait, 'straight'); assert.equal(draft.magnet, false); assert.equal(draft.color, 'rust')
  const url = readComparison('?dev=1&portrait=hanji&magnet=on', true, saved)
  assert.equal(url.portrait, 'hanji'); assert.equal(url.magnet, true); assert.equal(url.color, 'rust')
  const explicitOff = readComparison(comparisonSearch('?dev=1', { portrait: 'off', magnet: false }), true, saved)
  assert.equal(explicitOff.portrait, 'off'); assert.equal(explicitOff.magnet, false)
  const fallback = readComparison('?dev=1', true)
  assert.equal(fallback.portrait, experienceCanonical.portrait); assert.equal(fallback.magnet, experienceCanonical.magnet)
})
test('invalid saved schemas and URL values cannot enter runtime options', () => {
  const invalid = JSON.stringify({ ...JSON.parse(saved), schemaVersion: 100 })
  const state = readComparison('?dev=1&portrait=fluid&magnet=maybe&color=rainbow', true, invalid)
  assert.equal(state.draftStatus, 'invalid'); assert.equal(state.portrait, 'hanji'); assert.equal(state.magnet, true)
  assert.deepEqual(state.ignored, ['portrait', 'color', 'magnet'])
})
test('legacy comparisons remain available and preserve other choices and unrelated query', () => {
  assert.equal(readComparison('?compare', true).available, true)
  const query = comparisonSearch('?all=a&campaign=hello', { points: true })
  const state = readComparison(query, true)
  assert.equal(state.points, true); assert.equal(state.janggu, false); assert.equal(state.type, false)
  assert.equal(new URLSearchParams(query).get('campaign'), 'hello')
})
test('reset/exit preserves unrelated query, and copied preset addresses preserve locale/base/hash', () => {
  const input = '?dev=1&portrait=off&magnet=off&all=a&campaign=hello'
  const q = new URLSearchParams(resetComparison(input, true))
  assert.equal(q.get('dev'), '0'); assert.equal(q.get('campaign'), 'hello'); assert.equal(q.has('portrait'), false); assert.equal(q.has('all'), false)
  const href = 'https://cij5484.github.io/cho-youn-kyoung-v2/en/?campaign=hello#artist'
  const shared = new URL(comparisonAddress(href, readComparison(input, true)))
  assert.equal(shared.pathname, '/cho-youn-kyoung-v2/en/'); assert.equal(shared.hash, '#artist')
  assert.equal(shared.searchParams.get('portrait'), 'off'); assert.equal(shared.searchParams.get('magnet'), 'off')
  assert.equal(shared.searchParams.get('campaign'), 'hello'); assert.equal(shared.searchParams.get('dev'), '1')
})
