import { createDraft, validateDraft } from '../home/experience/config.ts'
import type { ExperienceOptions } from '../home/experience/registry.ts'

export const EXPERIENCE_DRAFT_KEY = 'cyk:v2:experience-draft:v1'
export const EXPERIENCE_DRAFT_EVENT = 'cyk:experience-draft-change'
export function readDraftPayload(payload: string | null | undefined) {
  if (!payload) return { status: 'missing' as const, options: null }
  try { return { status: 'valid' as const, options: validateDraft(JSON.parse(payload)).options } }
  catch { return { status: 'invalid' as const, options: null } }
}
export function draftSnapshot(): string | null {
  if (typeof window === 'undefined') return null
  try { return window.localStorage.getItem(EXPERIENCE_DRAFT_KEY) } catch { return null }
}
export function saveExperienceDraft(options: ExperienceOptions) {
  const payload = JSON.stringify(createDraft(options))
  try {
    window.localStorage.setItem(EXPERIENCE_DRAFT_KEY, payload)
    window.dispatchEvent(new Event(EXPERIENCE_DRAFT_EVENT))
    return true
  } catch { return false }
}
export function subscribeDraft(listener: () => void) {
  function storage(event: StorageEvent) { if (event.key === EXPERIENCE_DRAFT_KEY || event.key === null) listener() }
  window.addEventListener('storage', storage); window.addEventListener(EXPERIENCE_DRAFT_EVENT, listener)
  return () => { window.removeEventListener('storage', storage); window.removeEventListener(EXPERIENCE_DRAFT_EVENT, listener) }
}
