import { useRef } from 'react'
import { HaegeumExperience } from '../haegeum/HaegeumExperience.tsx'
import { soundContinuation } from './continuation.ts'
import { SoundSurface } from './SoundSurface.tsx'
import { homeSoundSource, type SoundSource } from './source.ts'
import type { ContactActivity, ContactTrail, ContactViolet, SoundVisual } from './contact-motion.ts'

/** Internal surface shared by the frozen integration API and the development comparison adapter. */
export function SoundComposition({ locale = 'ko', source = homeSoundSource, visual, trail, activity, violet }: { locale?: 'ko' | 'en'; source?: SoundSource; visual: SoundVisual; trail: ContactTrail; activity: ContactActivity; violet: ContactViolet }) {
  const root = useRef<HTMLDivElement>(null)
  return <div ref={root} className="sound-experience" data-sound-ready="false" data-sound-static="false">
    <HaegeumExperience continuation={soundContinuation} continuationId="sound-entry" className="continues-to-sound" />
    <section className="sound-region" aria-labelledby="sound-title">
      <div id="sound-entry" className="sound-anchor" tabIndex={-1} />
      <SoundSurface key={JSON.stringify([source.src,source.status,source.duration])} root={root} locale={locale} source={source} visual={visual} trail={trail} activity={activity} violet={violet} />
    </section>
  </div>
}
