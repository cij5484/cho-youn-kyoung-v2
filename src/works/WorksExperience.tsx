import { Component, lazy, Suspense, type ReactNode } from 'react'
import { useLocation } from 'react-router'
import { useComparisonSettings } from '../experience-prototype/use-comparison-settings.ts'
import { DevelopmentTools } from '../experience-prototype/DevelopmentTools.tsx'
import type { Language } from '../routing/locale-contract.ts'
import { WorksPage } from './WorksPage.tsx'

const Spatial = lazy(() => import('./spatial/SpatialWorksPage.tsx').then(module => ({ default: module.SpatialWorksPage })))
class SpatialLoadBoundary extends Component<{ children: ReactNode; locale: Language }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  render() {
    return this.state.failed ? <><p role="status" className="page-frame">공간 화면을 불러오지 못해 현재 작업 목록을 표시합니다.</p><WorksPage locale={this.props.locale}/></> : this.props.children
  }
}

/** A route-level consumer of the existing versioned choices; no separate settings store. */
export function WorksExperience({ locale = 'ko' }: { locale?: Language }) {
  const location = useLocation()
  const settings = useComparisonSettings(location.search, import.meta.env.DEV)
  return <div data-works-layout={settings.worksLayout}>
    {settings.worksLayout !== 'current' ? <SpatialLoadBoundary key="spatial" locale={locale}>
      <Suspense fallback={<p className="page-frame" role="status">공간 아카이브 준비 중…</p>}><Spatial locale={locale} variant={settings.worksLayout}/></Suspense>
    </SpatialLoadBoundary> : <WorksPage locale={locale}/>}
    <DevelopmentTools scope="works" host={null} settings={settings} locale={locale}/>
  </div>
}
