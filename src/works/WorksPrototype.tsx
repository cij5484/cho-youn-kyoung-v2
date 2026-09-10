import { Component, lazy, Suspense, type ReactNode } from 'react'
import type { Language } from '../routing/locale-contract.ts'
import { CompactArchive } from './CompactArchive.tsx'
import './works-prototype.css'

const AtmosphericDepth = lazy(() => import('./candidates/AtmosphericDepth.tsx').then(module => ({ default: module.AtmosphericDepth })))

function FailedCandidate() {
  return <header className="works-prototype-failed"><h1>Works.</h1><p role="status">연출을 불러오지 못했습니다. 아래 작업 목록에서 모든 기록을 볼 수 있습니다.</p><a href="#works-compact-archive">Archive ↘</a></header>
}
function ArchiveFallback({ locale, failed = false }: { locale: Language; failed?: boolean }) {
  return <>
    <div className="works-prototype-host" data-works-prototype="atmospheric-depth" data-engine-state={failed ? 'failed' : 'loading'}>
      {failed ? <FailedCandidate/> : <div className="works-prototype-loading" role="status">WORKS 연출을 불러오는 중…</div>}
    </div>
    <CompactArchive locale={locale}/>
  </>
}
class EngineBoundary extends Component<{ children: ReactNode; locale: Language }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  render() { return this.state.failed ? <ArchiveFallback locale={this.props.locale} failed/> : this.props.children }
}

export function WorksPrototype({ locale }: { locale: Language }) {
  return <EngineBoundary locale={locale}>
    <Suspense fallback={<ArchiveFallback locale={locale}/>}>
      <div className="works-prototype-host" data-works-prototype="atmospheric-depth" data-engine-state="mounted">
        <AtmosphericDepth/>
      </div>
    </Suspense>
  </EngineBoundary>
}
