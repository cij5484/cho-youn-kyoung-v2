import { validAudioFeatures, type AudioFeatureData } from '../audio/features.ts'
import homeFeatures from './assets/hanbeomsu-jungjungmori.features.json'
import preview from './assets/hanbeomsu-jungjungmori-preview.m4a'

export interface SoundSource {
  src: string | null
  duration: number
  trackId?: string
  sourceSha256?: string
  features?: AudioFeatureData
  title: { ko: string; en: string }
  status: 'preview-authorized' | 'not-yet-approved' | 'unavailable'
}

// User selected Han Beom-su Ryu Jungjungmori and delegated highlight selection.
// Retained 02:46–03:04 excerpt, accepted through the user's P2H/P2I SOUND approval.
export const homeSoundSource: SoundSource = {
  src: preview, duration: 18, status: 'preview-authorized',
  trackId: 'home-hanbeomsu-jungjungmori-preview',
  sourceSha256: '00ae2adee523857da413aa7cb28521026bcfcc5fadde9db0e8f845cf5145708c',
  features: validAudioFeatures(homeFeatures) ? homeFeatures : undefined,
  title: { ko: '한범수류 해금산조 · 중중모리', en: 'Han Beom-su Ryu Haegeum Sanjo · Jungjungmori' },
}

export function playableSource(source: Pick<SoundSource, 'src' | 'status'>) {
  return source.status === 'preview-authorized' ? source.src : null
}
