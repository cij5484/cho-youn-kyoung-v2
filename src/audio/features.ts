/** Small, versioned per-track data. Integer channels are quantized to 0..1000, not PCM. */
export interface AudioFeatureData {
  analysisVersion: 'bow-features/1'
  trackId: string
  sourceSha256: string
  sampleRate: number
  featureRate: number
  duration: number
  energy: number[]
  onsets: number[]
  spectralFlux: number[]
  phraseEnvelope: number[]
  pitchContour: { midi: number[]; confidence: number[] } | null
}
export interface AudioFeatureFrame {
  energy: number; onset: number; spectralFlux: number; phrase: number
  pitchMidi: number | null; pitchConfidence: number
}
const unit = (n: number) => Number.isInteger(n) && n >= 0 && n <= 1000

/** Invalid/stale data falls back to live analysis; it must never start or impersonate media playback. */
export function validAudioFeatures(value: unknown): value is AudioFeatureData {
  if (!value || typeof value !== 'object') return false
  const d = value as Partial<AudioFeatureData>
  if (d.analysisVersion !== 'bow-features/1' || typeof d.trackId !== 'string' || !d.trackId.trim() || typeof d.sourceSha256 !== 'string' || !/^[a-f0-9]{64}$/.test(d.sourceSha256)) return false
  if (!Number.isFinite(d.duration) || d.duration! <= 0 || !Number.isInteger(d.sampleRate) || d.sampleRate! < 8000) return false
  if (!Number.isFinite(d.featureRate) || d.featureRate! < 1 || d.featureRate! > 60) return false
  const count = Math.ceil(d.duration! * d.featureRate!)
  if (![d.energy, d.onsets, d.spectralFlux, d.phraseEnvelope].every(a => Array.isArray(a) && a.length === count && a.every(unit))) return false
  const pitch = d.pitchContour
  return pitch === null || !!pitch && Array.isArray(pitch.midi) && Array.isArray(pitch.confidence) && pitch.midi.length === count && pitch.confidence.length === count &&
    pitch.midi.every(n => Number.isFinite(n) && n >= 0 && n <= 127) && pitch.confidence.every(unit)
}

export function bindAudioFeatures(value: unknown, identity: { trackId?: string; sourceSha256?: string; duration: number }) {
  return validAudioFeatures(value) && value.trackId === identity.trackId && value.sourceSha256 === identity.sourceSha256 &&
    Math.abs(value.duration - identity.duration) <= 1 / value.featureRate ? value : null
}

/** Absolute native-media time: seeks/replay cannot accumulate missed onset events or drift a second clock. */
export function sampleAudioFeatures(data: AudioFeatureData, seconds: number): AudioFeatureFrame {
  if (!Number.isFinite(seconds) || seconds < 0 || seconds >= data.duration) return { energy: 0, onset: 0, spectralFlux: 0, phrase: 0, pitchMidi: null, pitchConfidence: 0 }
  const position = Math.min(data.energy.length - 1, seconds * data.featureRate), a = Math.floor(position), b = Math.min(a + 1, data.energy.length - 1), t = position - a
  const interpolate = (values: number[]) => (values[a] + (values[b] - values[a]) * t) / 1000
  const confidence = data.pitchContour ? interpolate(data.pitchContour.confidence) : 0
  // Never interpolate through an unvoiced/unreliable frame.
  const reliable = data.pitchContour && data.pitchContour.confidence[a] >= 850 && data.pitchContour.confidence[b] >= 850
  return {
    energy: interpolate(data.energy), onset: interpolate(data.onsets), spectralFlux: interpolate(data.spectralFlux), phrase: interpolate(data.phraseEnvelope),
    pitchMidi: reliable ? interpolate(data.pitchContour!.midi) * 1000 : null, pitchConfidence: confidence,
  }
}
