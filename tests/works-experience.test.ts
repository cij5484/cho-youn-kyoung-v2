import test from 'node:test'
import assert from 'node:assert/strict'
import { experienceCanonical, createDraft, createPromotion, validateDraft, validateExperienceOptions,
  validatePromotion, applyPromotion } from '../src/home/experience/config.ts'
import { readComparison, comparisonSearch, comparisonAddress, resetComparison } from '../src/experience-prototype/comparison-settings.ts'
import { readDraftPayload } from '../src/experience-prototype/experience-draft.ts'

const candidateDraft = JSON.stringify(createDraft({ ...experienceCanonical, worksLayout: 'atmospheric-depth', portrait: 'straight', magnet: false }))
const oldHomeOptions = { portrait: 'straight', magnet: false, points: false, janggu: true, type: false, color: 'rust' }
const oldHomeDraft = () => ({ schemaVersion: 1, kind: 'experience-draft', options: { ...oldHomeOptions } })

test('normal WORKS and dev=0 ignore candidate URLs and saved selections without changing canonical HOME', () => {
  for (const query of ['', '?worksExperience=atmospheric-depth&type=albums', '?dev=0&worksExperience=atmospheric-depth&portrait=off&magnet=off&all=a']) {
    const state = readComparison(query, false, candidateDraft)
    assert.equal(state.worksLayout, 'current')
    assert.equal(state.enabled, false)
    assert.equal(state.portrait, experienceCanonical.portrait)
    assert.equal(state.magnet, experienceCanonical.magnet)
    assert.equal(state.points, experienceCanonical.points)
  }
  assert.equal(readComparison('', true, candidateDraft).worksLayout, 'current')
})

test('WORKS development precedence is URL, then saved draft, then current canonical', () => {
  const saved = readComparison('?dev=1&type=albums', false, candidateDraft)
  assert.equal(saved.worksLayout, 'atmospheric-depth')
  assert.equal(saved.portrait, 'straight'); assert.equal(saved.magnet, false)
  assert.equal(saved.ignored.includes('type'), false)
  const currentOverride = readComparison('?dev=1&worksExperience=current', false, candidateDraft)
  assert.equal(currentOverride.worksLayout, 'current')
  assert.equal(currentOverride.portrait, 'straight')
  const explicit = readComparison('?dev=1&worksExperience=atmospheric-depth', false, JSON.stringify(oldHomeDraft()))
  assert.equal(explicit.worksLayout, 'atmospheric-depth')
  assert.equal(explicit.type, false); assert.equal(explicit.color, 'rust')
  assert.equal(readComparison('?dev=1', false).worksLayout, 'current')
})

test('WORKS compare/change/reset preserve project base, locale, archive filter, unrelated query and hash', () => {
  const source = 'https://cij5484.github.io/cho-youn-kyoung-v2/en/works/?type=performances&campaign=return#chronological-index'
  const selected = readComparison('?dev=1&worksExperience=atmospheric-depth', false)
  const copied = new URL(comparisonAddress(source, selected))
  assert.equal(copied.pathname, '/cho-youn-kyoung-v2/en/works/')
  assert.equal(copied.hash, '#chronological-index')
  assert.equal(copied.searchParams.get('type'), 'performances')
  assert.equal(copied.searchParams.get('campaign'), 'return')
  assert.equal(copied.searchParams.get('worksExperience'), 'atmospheric-depth')
  assert.equal(copied.searchParams.has('worksLayout'), false)
  assert.equal(copied.searchParams.has('portrait'), false)
  assert.equal(readComparison(copied.search, false).worksLayout, 'atmospheric-depth')
  const changed = new URLSearchParams(comparisonSearch(copied.search, { worksLayout: 'current' }))
  assert.equal(changed.get('type'), 'performances'); assert.equal(changed.get('worksExperience'), 'current')
  for (const filter of ['albums', 'performances']) {
    const exited = new URLSearchParams(resetComparison(`?dev=1&worksExperience=atmospheric-depth&type=${filter}&campaign=return`, true))
    assert.equal(exited.get('dev'), '0'); assert.equal(exited.get('type'), filter)
    assert.equal(exited.has('worksExperience'), false); assert.equal(exited.get('campaign'), 'return')
    assert.equal(readComparison(exited.toString(), false, candidateDraft).worksLayout, 'current')
  }
  assert.equal(new URLSearchParams(resetComparison('?dev=1&type=a')).has('type'), false)
})

test('promotion copies the WORKS candidate explicitly but does not promote it by selection or copying', () => {
  const before = JSON.stringify(experienceCanonical)
  const selected = readComparison('?dev=1&worksExperience=atmospheric-depth', false)
  const payload = createPromotion(selected)
  assert.equal(payload.options.worksLayout, 'atmospheric-depth')
  assert.equal(payload.options.portrait, experienceCanonical.portrait)
  assert.equal(payload.options.magnet, experienceCanonical.magnet)
  assert.deepEqual(validatePromotion(JSON.parse(JSON.stringify(payload))), payload)
  const current = { schemaVersion: 1, kind: 'experience-canonical', options: { ...experienceCanonical } }
  const result = applyPromotion(current, payload)
  assert.deepEqual(result.changes, [{ key: 'worksLayout', from: 'current', to: 'atmospheric-depth' }])
  assert.equal(result.next.options.worksLayout, 'atmospheric-depth')
  assert.equal(current.options.worksLayout, 'current')
  assert.equal(JSON.stringify(experienceCanonical), before)
  assert.equal(readComparison('', false, candidateDraft).worksLayout, 'current')
})

test('only the exact complete historical six-key v1 draft migrates, preserving HOME choices and its input', () => {
  const old = oldHomeDraft(), before = JSON.stringify(old)
  const migrated = validateDraft(old)
  assert.deepEqual(migrated.options, { ...oldHomeOptions, worksLayout: 'current' })
  assert.equal(JSON.stringify(old), before)
  assert.equal(readDraftPayload(before).status, 'valid')
  const missing = oldHomeDraft() as { schemaVersion: number; kind: string; options: Record<string, unknown> }
  delete missing.options.color
  assert.throws(() => validateDraft(missing))
  assert.throws(() => validateDraft({ ...oldHomeDraft(), options: { ...oldHomeOptions, debug: true } }))
  assert.throws(() => validateDraft({ ...oldHomeDraft(), schemaVersion: 2 }))
  assert.throws(() => validateDraft({ ...oldHomeDraft(), options: { ...oldHomeOptions, worksLayout: undefined } }))
  assert.throws(() => validateDraft({ ...oldHomeDraft(), options: { ...oldHomeOptions, works: 'atmospheric-depth' } }))
})

test('invalid layout values cannot enter stored, promoted or URL-derived runtime state', () => {
  const invalidOptions = { ...experienceCanonical, worksLayout: 'flat-billboards' }
  assert.throws(() => validateExperienceOptions(invalidOptions))
  assert.throws(() => validateDraft({ schemaVersion: 1, kind: 'experience-draft', options: invalidOptions }))
  const promotion = createPromotion(experienceCanonical)
  assert.throws(() => validatePromotion({ ...promotion, options: { ...promotion.options, worksLayout: 'flat-billboards' } }))
  const state = readComparison('?dev=1&worksExperience=flat-billboards', false, candidateDraft)
  assert.equal(state.worksLayout, 'atmospheric-depth')
  assert.deepEqual(state.ignored, ['worksExperience'])
  const rejected = readComparison('?dev=1', false, JSON.stringify({ schemaVersion: 1, kind: 'experience-draft', options: invalidOptions }))
  assert.equal(rejected.draftStatus, 'invalid'); assert.equal(rejected.worksLayout, 'current')
})


test('every visually rejected draft retires without losing HOME choices or reviving through URL/promotion', () => {
  for (const worksLayout of ['spatial-helix', 'z-depth', 'wave-path', 'stack-flow']) {
  const old = { schemaVersion: 1, kind: 'experience-draft', options: { ...oldHomeOptions, worksLayout } }
  const before = JSON.stringify(old)
  const next = validateDraft(old)
  assert.deepEqual(next.options, { ...oldHomeOptions, worksLayout: 'current' })
  assert.equal(JSON.stringify(old), before)
  assert.equal(readComparison(`?dev=1&worksExperience=${worksLayout}`, false, before).worksLayout, 'current')
  assert.throws(() => validatePromotion({ schemaVersion: 1, kind: 'experience-promotion', options: { portrait: 'hanji', magnet: true, worksLayout } }))
  }
})

test('all three candidates round-trip through URL, Draft and promotion with identical canonical isolation', () => {
  for (const worksLayout of ['atmospheric-depth', 'image-rotations', 'webgl-editorial'] as const) {
    const options = { ...experienceCanonical, worksLayout }
    const url = comparisonSearch('?type=albums&works=spatial-helix', { worksLayout, dev: true })
    assert.equal(new URLSearchParams(url).has('works'), false)
    assert.equal(readComparison(url, false).worksLayout, worksLayout)
    assert.equal(readComparison('?dev=1', false, JSON.stringify(createDraft(options))).worksLayout, worksLayout)
    assert.equal(createPromotion(options).options.worksLayout, worksLayout)
    assert.equal(readComparison('?dev=0', false, JSON.stringify(createDraft(options))).worksLayout, 'current')
  }
})
