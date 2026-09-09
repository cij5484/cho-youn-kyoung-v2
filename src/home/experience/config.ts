import canonicalSource from './canonical.json' with { type: 'json' }
import { experienceKeys, experienceRegistry, promotableKeys, type ExperienceOptions, type PromotionOptions } from './registry.ts'

export const EXPERIENCE_SCHEMA_VERSION = 1 as const
export type CanonicalExperience = { schemaVersion: 1; kind: 'experience-canonical'; options: ExperienceOptions }
export type ExperienceDraft = { schemaVersion: 1; kind: 'experience-draft'; options: ExperienceOptions }
export type PromotionCandidate = { schemaVersion: 1; kind: 'experience-promotion'; options: PromotionOptions }

function record(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('설정은 JSON 객체여야 합니다.')
  return value as Record<string, unknown>
}
function exactKeys(value: Record<string, unknown>, keys: readonly string[]) {
  const unknown = Object.keys(value).filter(key => !keys.includes(key)), missing = keys.filter(key => !(key in value))
  if (unknown.length) throw new Error(`허용하지 않은 설정: ${unknown.join(', ')}`)
  if (missing.length) throw new Error(`빠진 설정: ${missing.join(', ')}`)
}
export function validateExperienceOptions(value: unknown): ExperienceOptions {
  const raw = record(value); exactKeys(raw, experienceKeys)
  for (const key of experienceKeys) {
    if (!(experienceRegistry[key].allowedValues as readonly unknown[]).includes(raw[key])) throw new Error(`허용하지 않은 ${key} 값: ${String(raw[key])}`)
  }
  return Object.fromEntries(experienceKeys.map(key => [key, raw[key]])) as ExperienceOptions
}
function envelope(value: unknown, kind: string) {
  const raw = record(value); exactKeys(raw, ['schemaVersion', 'kind', 'options'])
  if (raw.schemaVersion !== EXPERIENCE_SCHEMA_VERSION) throw new Error('지원하지 않는 experience schema version입니다.')
  if (raw.kind !== kind) throw new Error(`설정 종류가 ${kind}이어야 합니다.`)
  return raw
}
export function validateCanonical(value: unknown): CanonicalExperience {
  const raw = envelope(value, 'experience-canonical')
  return { schemaVersion: 1, kind: 'experience-canonical', options: validateExperienceOptions(raw.options) }
}
export function validateDraft(value: unknown): ExperienceDraft {
  const raw = envelope(value, 'experience-draft')
  let options = record(raw.options)
  // Additive v1 extension: preserve complete older HOME drafts without accepting arbitrary omissions.
  if (!('worksLayout' in options)) {
    exactKeys(options, experienceKeys.filter(key => key !== 'worksLayout'))
    options = { ...options, worksLayout: 'current' }
  }
  // Superseded WORKS selection retires safely without losing unrelated HOME choices.
  if (options.worksLayout === 'spatial-helix') options = { ...options, worksLayout: 'current' }
  return { schemaVersion: 1, kind: 'experience-draft', options: validateExperienceOptions(options) }
}
export function validatePromotion(value: unknown): PromotionCandidate {
  const raw = envelope(value, 'experience-promotion'), values = record(raw.options)
  exactKeys(values, promotableKeys)
  for (const key of promotableKeys) {
    if (!(experienceRegistry[key].allowedValues as readonly unknown[]).includes(values[key])) throw new Error(`허용하지 않은 ${key} 값: ${String(values[key])}`)
  }
  return { schemaVersion: 1, kind: 'experience-promotion', options: Object.fromEntries(promotableKeys.map(key => [key, values[key]])) as PromotionOptions }
}

/** This file is the only canonical runtime input. Storage and URL cannot mutate it. */
export const experienceCanonical = Object.freeze(validateCanonical(canonicalSource).options)
export function experienceOptions(values: ExperienceOptions): ExperienceOptions {
  return validateExperienceOptions(Object.fromEntries(experienceKeys.map(key => [key, values[key]])))
}
export function createDraft(values: ExperienceOptions): ExperienceDraft {
  return { schemaVersion: 1, kind: 'experience-draft', options: experienceOptions(values) }
}
export function createPromotion(values: ExperienceOptions): PromotionCandidate {
  return validatePromotion({ schemaVersion: 1, kind: 'experience-promotion', options: Object.fromEntries(promotableKeys.map(key => [key, values[key]])) })
}
export function applyPromotion(current: unknown, candidate: unknown) {
  const canonical = validateCanonical(current), promotion = validatePromotion(candidate)
  const next = validateCanonical({ ...canonical, options: { ...canonical.options, ...promotion.options } })
  const changes = promotableKeys.filter(key => canonical.options[key] !== next.options[key])
    .map(key => ({ key, from: canonical.options[key], to: next.options[key] }))
  return { next, changes }
}
