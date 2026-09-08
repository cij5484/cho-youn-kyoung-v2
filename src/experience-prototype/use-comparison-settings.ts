import { useSyncExternalStore } from 'react'
import { readComparison } from './comparison-settings.ts'
import { draftSnapshot, subscribeDraft } from './experience-draft.ts'

const serverSnapshot = () => null
export function useComparisonSettings(search: string, local: boolean) {
  const saved = useSyncExternalStore(subscribeDraft, draftSnapshot, serverSnapshot)
  return readComparison(search, local, saved)
}
