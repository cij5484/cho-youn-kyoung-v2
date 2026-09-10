import { useState } from 'react'
import { experienceCanonical, createPromotion } from '../home/experience/config.ts'
import { experienceKeys, experienceRegistry, experienceLabel } from '../home/experience/registry.ts'
import { comparisonAddress, type ComparisonPatch, type ComparisonSettings } from './comparison-settings.ts'
import './development-comparison.css'
export function DevelopmentComparison({ scope = 'home', settings, onChange, onJump, onReset, onLoad, onExit, onClose, saveMessage }: {
  scope?: 'home' | 'works'; settings: ComparisonSettings; onChange: (patch: ComparisonPatch) => void; onJump: (scene: 'sound' | 'performance' | 'artist') => void;
  onReset: () => void; onLoad: () => void; onExit: () => void; onClose: () => void; saveMessage: string
}) {
  const [copyMessage, setCopyMessage] = useState(''), [copyFallback, setCopyFallback] = useState('')
  async function copy(promotion = false) {
    const candidate = scope === 'works' ? { ...experienceCanonical, worksLayout: settings.worksLayout } : { ...settings, worksLayout: experienceCanonical.worksLayout }
    const payload = promotion ? JSON.stringify(createPromotion(candidate), null, 2) : comparisonAddress(location.href, settings)
    try { await navigator.clipboard.writeText(payload); setCopyMessage(promotion ? '배포 후보 설정을 복사했습니다. 실제 승격과 배포는 별도입니다.' : '비교 주소를 복사했습니다.'); setCopyFallback('') }
    catch { setCopyMessage('아래 내용을 선택해 복사해 주세요.'); setCopyFallback(payload) }
  }
  return <aside className="development-comparison" id="development-comparison" aria-label="개발 비교" lang="ko">
    <header><h2>개발 비교</h2><button type="button" onClick={onClose} aria-label="개발 비교 접기">접기 −</button></header>
    <p className="development-note">일반 화면은 현재 배포값을 사용합니다. 개발 선택은 이 브라우저에 저장되며, URL에 지정한 값이 우선합니다.</p>
    <table className="development-values"><caption>현재 배포값과 개발 선택</caption><thead><tr><th scope="col">항목</th><th scope="col">현재 배포</th><th scope="col">개발 선택</th></tr></thead><tbody>{experienceKeys.filter(key => scope === 'works' ? key === 'worksLayout' : key !== 'worksLayout').map(key => <tr key={key} data-changed={settings[key] !== experienceCanonical[key]}>
      <th scope="row">{experienceRegistry[key].label}<small>{experienceRegistry[key].promotable ? '승격 가능' : '비교 전용'}</small></th>
      <td>{experienceLabel(key, experienceCanonical[key])}</td><td>{experienceLabel(key, settings[key])}{settings[key] !== experienceCanonical[key] && <strong>다름</strong>}</td>
    </tr>)}</tbody></table>
    {scope === 'works' ? null : <>
    <fieldset><legend>07 사진 전환</legend><div className="development-choices development-portrait-choices">{([['off', '이전 분할'], ['straight', '직선 방식'], ['hanji', '한지 번짐']] as const).map(([mode, label]) => <label key={mode}><input type="radio" name="portrait-experiment" checked={settings.portrait === mode} onChange={() => onChange({ portrait: mode })}/><span>{label}</span></label>)}</div>
      <p>한지·직선 방식은 한복 100%와 동일한 간략 프로필로 마무리됩니다.</p>
    </fieldset>
    <fieldset><legend>장면 자동 정렬</legend><div className="development-choices">{([false, true] as const).map(value => <label key={String(value)}><input type="radio" name="scene-magnet" checked={settings.magnet === value} onChange={() => onChange({ magnet: value })}/><span>{value ? '켜기' : '끄기'}</span></label>)}</div><p>03·06 가까이에서 스크롤이 잦아들면 살짝 정렬합니다.</p></fieldset>
    <nav className="development-jumps" aria-label="비교할 장면 이동"><button type="button" onClick={() => onJump('sound')}>03 소리로 이동</button><button type="button" onClick={() => onJump('performance')}>06 공연으로 이동</button><button type="button" onClick={() => onJump('artist')}>07 연주자로 이동</button></nav>
    <details className="development-legacy p2k-comparison"><summary>기존 상호작용 비교</summary>
      <p>아래 네 항목은 비교·저장할 수 있지만, 이번 배포 후보에는 포함하지 않습니다.</p>
      <fieldset><legend>홈의 두 점</legend><label><input type="radio" name="points" checked={!settings.points} onChange={() => onChange({ points: false })}/>고정된 두 선</label><label><input type="radio" name="points" checked={settings.points} onChange={() => onChange({ points: true })}/>공간을 흐르는 두 점</label></fieldset>
      <fieldset><legend>소리의 응답</legend><label><input type="radio" name="janggu" checked={!settings.janggu} onChange={() => onChange({ janggu: false })}/>해금만</label><label><input type="radio" name="janggu" checked={settings.janggu} onChange={() => onChange({ janggu: true })}/>해금과 장구</label></fieldset>
      <label className="development-color">장구 색상<select value={settings.color} onChange={event => onChange({ color: event.target.value as ComparisonSettings['color'] })}><option value="lacquer">옻빛 붉은색</option><option value="burnt">구운 주홍색</option><option value="rust">짙은 적갈색</option></select></label>
      <fieldset><legend>재생 버튼 글자</legend><label><input type="radio" name="type" checked={!settings.type} onChange={() => onChange({ type: false })}/>단어 단위 전환</label><label><input type="radio" name="type" checked={settings.type} onChange={() => onChange({ type: true })}/>글자 재조립</label></fieldset>
      <p>재생 위치를 유지합니다.</p>
    </details>
    </>}
    <footer><button type="button" onClick={onLoad}>저장값 불러오기</button><button type="button" onClick={onReset}>현재 배포값으로 초기화</button><button type="button" onClick={() => void copy()}>비교 주소 복사</button><button type="button" onClick={() => void copy(true)}>배포 후보 설정 복사</button><button type="button" onClick={onExit}>개발 비교 종료</button></footer>
    <p role="status">{copyMessage || saveMessage || (settings.draftStatus === 'invalid' ? '저장된 설정 형식이 맞지 않아 무시했습니다.' : settings.draftStatus === 'valid' ? '저장된 개발 선택이 있습니다. URL 설정이 우선합니다.' : '선택을 바꾸면 자동 저장됩니다.')}</p>
    {settings.ignored.length > 0 && <p className="development-note">허용하지 않은 URL 값은 무시했습니다: {settings.ignored.join(', ')}</p>}
    {copyFallback && <textarea rows={5} className="development-copy-address" aria-label="복사할 설정 또는 주소" readOnly value={copyFallback} onFocus={event => event.currentTarget.select()}/>}
  </aside>
}
