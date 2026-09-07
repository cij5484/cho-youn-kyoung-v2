import { SoundComposition } from './SoundComposition.tsx'
import { soundDirection } from './contact-motion.ts'
import { homeSoundSource, type SoundSource } from './source.ts'

/** Canonical integration API: comparison choices belong only to the development Lab. */
export function SoundExperience({ locale = 'ko', source = homeSoundSource }: { locale?: 'ko' | 'en'; source?: SoundSource }) {
  return <SoundComposition locale={locale} source={source} {...soundDirection} />
}
