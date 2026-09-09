import { useLocation } from 'react-router'
import { useComparisonSettings } from '../experience-prototype/use-comparison-settings.ts'
import { DevelopmentTools } from '../experience-prototype/DevelopmentTools.tsx'
import type { Language } from '../routing/locale-contract.ts'
import { WorksPage } from './WorksPage.tsx'
import { WorksPrototype } from './WorksPrototype.tsx'

/** Preview-only consumer. Ordinary visits retain the canonical DOM owner. */
export function WorksExperience({ locale = 'ko' }: { locale?: Language }) {
  const location = useLocation()
  const settings = useComparisonSettings(location.search, import.meta.env.DEV)
  return <div data-works-layout={settings.worksLayout}>
    {settings.worksLayout === 'current' ? <WorksPage locale={locale}/> : <WorksPrototype locale={locale} id={settings.worksLayout}/>}
    <DevelopmentTools scope="works" host={null} settings={settings} locale={locale}/>
  </div>
}
