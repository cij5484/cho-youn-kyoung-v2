import type { Language } from '../routing/locale-contract.ts'
import { WorksPrototype } from './WorksPrototype.tsx'

/** Approved WORKS experience. Old comparison URLs cannot select a retired renderer. */
export function WorksExperience({ locale = 'ko' }: { locale?: Language }) {
  return <div data-works-layout="atmospheric-depth"><WorksPrototype locale={locale} id="atmospheric-depth"/></div>
}
