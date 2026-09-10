import { Component, useEffect, useState, type ComponentType, type ReactNode } from 'react'
import type { Language } from '../routing/locale-contract.ts'
import type { ExperienceOptions } from '../home/experience/registry.ts'
import { CompactArchive } from './CompactArchive.tsx'
import './works-prototype.css'

export type WorksPrototypeId = Exclude<ExperienceOptions['worksLayout'], 'current'>
type Loaded = { id: WorksPrototypeId; Content?: ComponentType; failed?: boolean }

async function loadCandidate(id: WorksPrototypeId): Promise<ComponentType> {
  // Independent visual engines. Importing one never activates another.
  switch (id) {
    case 'atmospheric-depth': return (await import('./candidates/AtmosphericDepth.tsx')).AtmosphericDepth
  }
}

function FailedCandidate() {
  return <header className="works-prototype-failed"><h1>Works.</h1><p role="status">연출을 불러오지 못했습니다. 아래 작업 목록에서 모든 기록을 볼 수 있습니다.</p><a href="#works-compact-archive">Archive ↘</a></header>
}
class EngineBoundary extends Component<{ children: ReactNode; fallbackArchive?: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  render() { return this.state.failed ? <><FailedCandidate/>{this.props.fallbackArchive}</> : this.props.children }
}

export function WorksPrototype({ id, locale }: { id: WorksPrototypeId; locale: Language }) {
  const [loaded, setLoaded] = useState<Loaded | null>(null)
  useEffect(() => {
    let active = true
    void loadCandidate(id).then(Content => { if (active) setLoaded({ id, Content }) })
      .catch(() => { if (active) setLoaded({ id, failed: true }) })
    return () => { active = false }
  }, [id])
  // On a change the previous engine unmounts now, before the next module resolves.
  // Each engine owns its own effects, observers, shaders and renderer disposal.
  const current = loaded?.id === id ? loaded : null
  const Content = current?.Content
  return <>
    <div className="works-prototype-host" data-works-prototype={id} data-engine-state={current?.failed ? 'failed' : Content ? 'mounted' : 'loading'}>
      <EngineBoundary key={id} fallbackArchive={id === 'atmospheric-depth' && Content ? <CompactArchive locale={locale}/> : undefined}>{current?.failed ? <FailedCandidate/> : Content ? <Content/> : <div className="works-prototype-loading" role="status">WORKS 연출을 불러오는 중…</div>}</EngineBoundary>
    </div>
    {!(id === 'atmospheric-depth' && Content) && <CompactArchive locale={locale}/>}
  </>
}
