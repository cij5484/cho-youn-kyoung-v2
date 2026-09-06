import preview from './assets/hanbeomsu-jungjungmori-preview.m4a'

export interface SoundSource {
  src: string | null
  duration: number
  title: { ko: string; en: string }
  status: 'preview-authorized' | 'not-yet-approved' | 'unavailable'
}

// User selected Han Beom-su Ryu Jungjungmori and delegated highlight selection.
// 02:46–03:04 is a signal-ranked candidate; final listening selection remains REVIEW READY.
export const homeSoundSource: SoundSource = {
  src: preview, duration: 18, status: 'preview-authorized',
  title: { ko: '한범수류 해금산조 · 중중모리', en: 'Han Beom-su Ryu Haegeum Sanjo · Jungjungmori' },
}

export function playableSource(source: Pick<SoundSource, 'src' | 'status'>) {
  return source.status === 'preview-authorized' ? source.src : null
}
