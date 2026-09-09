import { experienceCanonical } from '../home/experience/config.ts'
import { experienceRegistry, type ExperienceOptions } from '../home/experience/registry.ts'
import { readDraftPayload } from './experience-draft.ts'

export type PortraitExperiment = ExperienceOptions['portrait']
export type ComparisonPatch = Partial<ExperienceOptions & { dev: boolean }>
const owned = ['dev', 'worksExperience', 'works', 'portrait', 'magnet', 'compare', 'all', 'points', 'janggu', 'type', 'color', 'study']

/** Normal URLs never consume a saved draft. Only explicit dev/legacy comparison opts into overrides. */
export function readComparison(search: string, local: boolean, saved?: string | null) {
  const q = new URLSearchParams(search), disabled = q.get('dev') === '0'
  const legacy = q.has('compare') || q.has('all'), enabled = !disabled && (q.get('dev') === '1' || legacy)
  const draft = readDraftPayload(saved), options: ExperienceOptions = { ...experienceCanonical, ...(enabled ? draft.options : {}) }
  const ignored: string[] = []
  if (enabled) {
    if (q.get('all') === 'a') { options.points = false; options.janggu = false; options.type = false }
    if (q.get('all') === 'b') { options.points = true; options.janggu = true; options.type = true }
    for (const key of ['portrait', 'color'] as const) {
      const value = q.get(key)
      if (value === null) continue
      if ((experienceRegistry[key].allowedValues as readonly string[]).includes(value)) Object.assign(options, { [key]: value })
      else ignored.push(key)
    }
    const worksKey = q.has('worksExperience') ? 'worksExperience' : 'works'
    if (q.has(worksKey)) {
      const value = q.get(worksKey)
      if (value === 'current' || value === 'z-depth' || value === 'wave-path' || value === 'stack-flow') options.worksLayout = value
      else ignored.push(worksKey)
    }
    if (q.has('magnet')) {
      const value = q.get('magnet')
      if (value === 'on' || value === 'off') options.magnet = value === 'on'
      else ignored.push('magnet')
    }
    for (const key of ['points', 'janggu', 'type'] as const) {
      const value = q.get(key)
      if (value === null || (key === 'type' && ['albums', 'performances'].includes(value))) continue
      if (value === 'a' || value === 'b') options[key] = value === 'b'
      else ignored.push(key)
    }
  }
  return { ...options, enabled, available: local || enabled, open: enabled, legacy,
    study: enabled && q.get('study') === 'type', draftStatus: draft.status, ignored }
}
export type ComparisonSettings = ReturnType<typeof readComparison>

/** Explicit off values must remain in the URL, otherwise canonical/draft values would reappear. */
export function comparisonSearch(search: string, patch: ComparisonPatch) {
  const q = new URLSearchParams(search), current = readComparison(search, true)
  if (q.has('all') && ['points', 'janggu', 'type', 'color'].some(key => key in patch)) {
    q.delete('all'); if (current.enabled) q.set('dev', '1')
    for (const key of ['points', 'janggu', 'type'] as const) q.set(key, current[key] ? 'b' : 'a')
  }
  for (const [key, value] of Object.entries(patch)) {
    if (key === 'dev') q.set(key, value ? '1' : '0')
    else if (key === 'worksLayout') { q.delete('works'); q.set('worksExperience', String(value)) }
    else if (key === 'magnet') q.set(key, value ? 'on' : 'off')
    else if (key === 'portrait' || key === 'color') q.set(key, String(value))
    else q.set(key, value ? 'b' : 'a')
  }
  return q.toString()
}
export function resetComparison(search: string, exit = false) {
  const q = new URLSearchParams(search)
  for (const key of owned) {
    if (key === 'type' && ['albums', 'performances'].includes(q.get(key) ?? '')) continue
    q.delete(key)
  }
  q.set('dev', exit ? '0' : '1'); return q.toString()
}
export function comparisonAddress(href: string, settings: ComparisonSettings) {
  const url = new URL(href)
  if (url.pathname.replace(/\/$/, '').endsWith('/works')) {
    url.search = comparisonSearch(url.search, { dev: true, worksLayout: settings.worksLayout })
    return url.href
  }
  url.search = comparisonSearch(url.search, { dev: true, worksLayout: settings.worksLayout, portrait: settings.portrait, magnet: settings.magnet,
    points: settings.points, janggu: settings.janggu, type: settings.type, color: settings.color })
  return url.href
}
