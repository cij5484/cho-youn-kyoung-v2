import { Component, Suspense, lazy, useState, type ReactNode } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { jumpToScene } from '../home/scene-destinations.ts'
import { experienceCanonical, experienceOptions } from '../home/experience/config.ts'
import { comparisonSearch, resetComparison, type ComparisonSettings, type ComparisonPatch } from './comparison-settings.ts'
import { draftSnapshot, readDraftPayload, saveExperienceDraft } from './experience-draft.ts'
import './development-launcher.css'
const Panel = lazy(() => import('./DevelopmentComparison.tsx').then(module => ({ default: module.DevelopmentComparison })))
class PanelBoundary extends Component<{ children: ReactNode; onReset: () => void }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  render() { return this.state.failed ? <div className="development-error" role="alert">비교 도구를 불러오지 못했습니다. <button type="button" onClick={this.props.onReset}>개발 비교 종료</button></div> : this.props.children }
}
/** Development UI owns drafts only; canonical HOME effects are mounted by HomeExperience. */
export function DevelopmentTools({ host, settings, scope = 'home' }: { host: HTMLElement | null; settings: ComparisonSettings; locale: 'ko' | 'en'; scope?: 'home' | 'works' }) {
  const location = useLocation(), navigate = useNavigate(), [open, setOpen] = useState(settings.open), [saveMessage, setSaveMessage] = useState('')
  function selectedQuery(options: ComparisonSettings | typeof experienceCanonical) {
    return comparisonSearch(location.search, scope === 'works' ? { worksLayout: options.worksLayout, dev: true } : { ...options, dev: true })
  }
  function mainFocus() { document.getElementById('works-main')?.focus({ preventScroll: true }); document.getElementById('interaction-main')?.focus({ preventScroll: true }) }
  function update(search: string) { void navigate({ pathname: location.pathname, search: search ? `?${search}` : '', hash: location.hash }, { replace: true, preventScrollReset: true }) }
  function change(patch: ComparisonPatch) {
    const options = experienceOptions({ ...settings, ...patch })
    const saved = saveExperienceDraft(options)
    setSaveMessage(saved ? '현재 개발 선택을 이 브라우저에 자동 저장했습니다.' : '브라우저 저장이 제한되어 있습니다. 비교 주소나 배포 후보를 복사해 보관해 주세요.')
    update(selectedQuery(options))
  }
  function close() { setOpen(false); requestAnimationFrame(() => document.getElementById('development-launcher')?.focus({ preventScroll: true })) }
  function reset() {
    const options = scope === 'works' ? experienceOptions({ ...settings, worksLayout: experienceCanonical.worksLayout }) : { ...experienceCanonical, worksLayout: settings.worksLayout }
    const saved = saveExperienceDraft(options)
    setSaveMessage(saved ? '현재 배포값으로 개발 선택과 저장값을 초기화했습니다.' : '현재 배포값으로 돌아갑니다. 브라우저 저장은 제한되어 있습니다.')
    update(scope === 'works' ? selectedQuery(options) : comparisonSearch(resetComparison(location.search), { ...experienceCanonical, dev: true }))
  }
  function load() {
    const draft = readDraftPayload(draftSnapshot())
    setSaveMessage(draft.status === 'valid' ? '저장된 개발 선택을 불러왔습니다.' : draft.status === 'invalid' ? '저장 형식이 맞지 않아 현재 배포값을 사용합니다.' : '저장된 개발 선택이 없어 현재 배포값을 사용합니다.')
    update(scope === 'works' ? selectedQuery(draft.options ?? experienceCanonical) : comparisonSearch(resetComparison(location.search), { ...(draft.options ?? experienceCanonical), dev: true }))
  }
  function exit() {
    const query = new URLSearchParams(location.search)
    query.delete('works'); query.set('dev', '0')
    update(scope === 'works' ? query.toString() : resetComparison(location.search, true)); setOpen(false); mainFocus()
  }
  function launch() { if (!settings.enabled) update(comparisonSearch(location.search, { dev: true })); setOpen(true) }
  function jump(scene: 'sound' | 'performance' | 'artist') {
    if (!host) return
    setOpen(false); document.getElementById('interaction-main')?.focus({ preventScroll: true }); jumpToScene(scene, { host })
  }
  return <>
    {settings.available && !open && <button type="button" id="development-launcher" className="development-launcher" aria-expanded="false" aria-controls="development-comparison" onClick={launch}>개발 비교 +</button>}
    {settings.available && open && <PanelBoundary key="panel" onReset={exit}><Suspense fallback={<p className="development-launcher" role="status">개발 비교 준비 중…</p>}><div onKeyDown={event => { if (event.key === 'Escape' && !document.querySelector('dialog[open]')) { event.stopPropagation(); close() } }}>
      <Panel scope={scope} settings={settings} onChange={change} onJump={jump} onReset={reset} onLoad={load} onExit={exit} onClose={close} saveMessage={saveMessage}/>
    </div></Suspense></PanelBoundary>}
  </>
}
