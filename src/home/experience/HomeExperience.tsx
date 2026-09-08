import { Component, Suspense, lazy, type ReactNode } from 'react'
import { experienceCanonical } from './config.ts'
import type { ExperienceOptions } from './registry.ts'

const Artist = lazy(() => import('./ArtistExperience.tsx').then(module => ({ default: module.ArtistExperience })))
const Magnet = lazy(() => import('./SceneMagnet.tsx').then(module => ({ default: module.SceneMagnet })))

class ExperienceBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  render() { return this.state.failed ? null : this.props.children }
}

/** Canonical effects belong to HOME. The development panel only chooses optional overrides. */
export function HomeExperience({ host, locale, options = experienceCanonical }: {
  host: HTMLElement | null; locale: 'ko' | 'en'; options?: Pick<ExperienceOptions, 'portrait' | 'magnet'>
}) {
  if (!host) return null
  return <>
    {options.portrait !== 'off' && <ExperienceBoundary key={`artist:${options.portrait}`}><Suspense fallback={null}>
      <Artist host={host} mode={options.portrait} locale={locale}/>
    </Suspense></ExperienceBoundary>}
    {options.magnet && <ExperienceBoundary key="magnet"><Suspense fallback={null}><Magnet host={host}/></Suspense></ExperienceBoundary>}
  </>
}
