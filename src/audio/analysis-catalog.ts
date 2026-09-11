import recordings from './recordings.json' with { type: 'json' }
import { validAudioFeatures, type AudioFeatureData } from './features.ts'

export type AnalysisIdentity = { trackId: string; sourceSha256: string; source: string; path: string }
export type AnalysisPair = {
  features: AudioFeatureData
  percussion: { version: 'p2k-percussion-candidates/2'; trackId: string; sourceSha256: string; duration: number;
    hits: { time: number; score: number; flatness: number }[] }
}

const albumFolders: Record<string, string> = {
  'ji-young-hee-ryu-haegeum-sanjo-2026': 'jiyounghee',
  'yeongsan-hoesang-2026': 'yeongsan',
  'pyeongjo-hoesang-2026': 'pyeongjo',
  'han-beom-su-haegeum-sanjo-2020': 'hanbeomsu',
}
const identities: AnalysisIdentity[] = recordings.map(record => ({ path: record.path, source: record.source,
  sourceSha256: record.sha256, trackId: `album:${record.path.replace(/\.mp3$/, '').replace('/', ':')}` }))

/** Album order and the original source must both match; similarly named tracks in another album are unrelated. */
export function resolveAlbumAnalysis(slug: string, index: number, source: string): AnalysisIdentity | null {
  const folder = Object.hasOwn(albumFolders, slug) ? albumFolders[slug] : null
  if (!folder || !Number.isSafeInteger(index) || index < 0) return null
  const identity = identities.filter(item => item.path.startsWith(`${folder}/`))[index]
  return identity?.source === source ? identity : null
}

export function validateAnalysisPair(features: unknown, percussion: unknown, identity: AnalysisIdentity): AnalysisPair | null {
  const expected = identities.find(item => item.path === identity.path)
  if (!expected || expected.source !== identity.source || expected.trackId !== identity.trackId || expected.sourceSha256 !== identity.sourceSha256) return null
  if (!validAudioFeatures(features) || features.trackId !== identity.trackId || features.sourceSha256 !== identity.sourceSha256 ||
    !percussion || typeof percussion !== 'object') return null
  const data = percussion as Partial<AnalysisPair['percussion']>
  if (data.version !== 'p2k-percussion-candidates/2' || data.trackId !== identity.trackId || data.sourceSha256 !== identity.sourceSha256 ||
    data.duration !== features.duration || !Array.isArray(data.hits)) return null
  const hits = data.hits
  if (!hits.every((hit, index) => hit && typeof hit === 'object' && Number.isFinite(hit.time) && hit.time >= 0 && hit.time < features.duration &&
    Number.isFinite(hit.score) && hit.score >= 0 && hit.score <= 1 && Number.isFinite(hit.flatness) && hit.flatness >= 0 && hit.flatness <= 1 &&
    (!index || hit.time > hits[index - 1].time))) return null
  return { features, percussion: data as AnalysisPair['percussion'] }
}
