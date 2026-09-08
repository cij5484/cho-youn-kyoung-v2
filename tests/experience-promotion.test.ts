import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { experienceCanonical, createDraft, createPromotion, validateDraft, validatePromotion, applyPromotion } from '../src/home/experience/config.ts'
import { readDraftPayload } from '../src/experience-prototype/experience-draft.ts'
import { experienceKeys, promotableKeys } from '../src/home/experience/registry.ts'

const current = { schemaVersion: 1, kind: 'experience-canonical', options: experienceCanonical }
test('drafts store only versioned, complete runtime options and reject inspection or transient state', () => {
  const draft = createDraft(experienceCanonical)
  assert.deepEqual(Object.keys(draft), ['schemaVersion', 'kind', 'options'])
  assert.deepEqual(Object.keys(draft.options), experienceKeys)
  assert.throws(() => validateDraft({ ...draft, scrollPosition: 200 }))
  assert.throws(() => validateDraft({ ...draft, schemaVersion: '1' }))
  assert.throws(() => validateDraft({ ...draft, options: { ...draft.options, panel: true } }))
  assert.throws(() => validateDraft({ ...draft, options: { portrait: 'hanji' } }))
  assert.equal(readDraftPayload('{bad json').status, 'invalid')
  assert.equal(readDraftPayload(JSON.stringify(draft)).status, 'valid')
})
test('promotion registry admits only actual authorized variant keys, never legacy/debug/panel flags', () => {
  assert.deepEqual(promotableKeys, ['portrait', 'magnet', 'worksLayout'])
  const payload = createPromotion({ ...experienceCanonical, points: false, color: 'rust', portrait: 'straight' })
  assert.deepEqual(Object.keys(payload.options), ['portrait', 'magnet', 'worksLayout'])
  for (const key of ['points', 'janggu', 'type', 'color', 'dev', 'debug', 'panel', 'study', 'diagnostics', 'outro']) {
    assert.throws(() => validatePromotion({ ...payload, options: { ...payload.options, [key]: true } }), key)
  }
  assert.throws(() => validatePromotion({ ...payload, schemaVersion: 2 }))
  assert.throws(() => validatePromotion({ ...payload, options: { portrait: 'fluid', magnet: true } }))
})
test('promotion is deterministic, returns a small explicit diff and preserves all non-promoted values', () => {
  const preset = createPromotion({ ...experienceCanonical, portrait: 'straight', magnet: false, points: false })
  const first = applyPromotion(current, preset), repeated = applyPromotion(current, JSON.parse(JSON.stringify(preset)))
  assert.deepEqual(first, repeated)
  assert.deepEqual(first.changes, [{ key: 'portrait', from: 'hanji', to: 'straight' }, { key: 'magnet', from: true, to: false }])
  assert.equal(first.next.options.points, true); assert.equal(first.next.options.color, 'lacquer')
  assert.equal(experienceCanonical.portrait, 'hanji')
  assert.deepEqual(applyPromotion(first.next, preset).changes, [])
})
test('CLI check validates the copied JSON and prints the actual diff without rewriting canonical', async () => {
  const owner = new URL('../src/home/experience/canonical.json', import.meta.url)
  const before = await readFile(owner, 'utf8')
  const preset = JSON.stringify(createPromotion({ ...experienceCanonical, portrait: 'straight', magnet: false }))
  const output = execFileSync(process.execPath, [fileURLToPath(new URL('../scripts/experience-promote.mjs', import.meta.url)), preset, '--check'], { encoding: 'utf8' })
  assert.match(output, /portrait: "hanji" → "straight"/)
  assert.match(output, /magnet: true → false/)
  assert.equal(await readFile(owner, 'utf8'), before)
})
