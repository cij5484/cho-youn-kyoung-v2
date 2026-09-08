import {useState} from 'react'
import {comparisonAddress,type ComparisonPatch,type ComparisonSettings} from './comparison-settings.ts'
import './development-comparison.css'
export function DevelopmentComparison({settings,onChange,onJump,onReset,onExit,onClose}:{settings:ComparisonSettings;onChange:(patch:ComparisonPatch)=>void;onJump:(scene:'sound'|'performance'|'artist')=>void;onReset:()=>void;onExit:()=>void;onClose:()=>void}){
  const [copied,setCopied]=useState(false),[copyFallback,setCopyFallback]=useState('')
  async function copy(){
    const address=comparisonAddress(location.href,settings)
    try{await navigator.clipboard.writeText(address);setCopied(true);setCopyFallback('')}
    catch{setCopied(false);setCopyFallback(address)}
  }
  return <aside className="development-comparison" id="development-comparison" aria-label="개발 비교" lang="ko">
    <header><h2>개발 비교</h2><button type="button" onClick={onClose} aria-label="개발 비교 접기">접기 −</button></header>
    <p className="development-note">선택한 효과는 비교 모드에서만 적용됩니다.</p>
    <fieldset><legend>07 사진 전환</legend><div className="development-choices">{([['straight','직선 방식'],['hanji','한지 번짐']] as const).map(([mode,label])=><label key={mode}><input type="radio" name="portrait-experiment" checked={settings.portrait===mode} onChange={()=>onChange({portrait:mode})}/><span>{label}</span></label>)}</div>
      <p>{settings.portrait==='off'?'현재 기본 화면을 유지하고 있습니다.':'끝까지 내리면 한복 사진과 간략 프로필이 남습니다.'}</p>
    </fieldset>
    <fieldset><legend>장면 자동 정렬</legend><div className="development-choices">{([false,true] as const).map(value=><label key={String(value)}><input type="radio" name="scene-magnet" checked={settings.magnet===value} onChange={()=>onChange({magnet:value})}/><span>{value?'켜기':'끄기'}</span></label>)}</div><p>03·06 가까이에서 스크롤이 잦아들면 살짝 정렬합니다.</p></fieldset>
    <nav className="development-jumps" aria-label="비교할 장면 이동"><button type="button" onClick={()=>onJump('sound')}>03 소리로 이동</button><button type="button" onClick={()=>onJump('performance')}>06 공연으로 이동</button><button type="button" onClick={()=>onJump('artist')}>07 연주자로 이동</button></nav>
    <details className="development-legacy p2k-comparison"><summary>기존 상호작용 비교</summary>
      <fieldset><legend>홈의 두 점</legend><label><input type="radio" name="points" checked={!settings.points} onChange={()=>onChange({points:false})}/>고정된 두 선</label><label><input type="radio" name="points" checked={settings.points} onChange={()=>onChange({points:true})}/>공간을 흐르는 두 점</label></fieldset>
      <fieldset><legend>소리의 응답</legend><label><input type="radio" name="janggu" checked={!settings.janggu} onChange={()=>onChange({janggu:false})}/>해금만</label><label><input type="radio" name="janggu" checked={settings.janggu} onChange={()=>onChange({janggu:true})}/>해금과 장구</label></fieldset>
      <label className="development-color">장구 색상<select value={settings.color} onChange={e=>onChange({color:e.target.value as ComparisonSettings['color']})}><option value="lacquer">옻빛 붉은색</option><option value="burnt">구운 주홍색</option><option value="rust">짙은 적갈색</option></select></label>
      <fieldset><legend>재생 버튼 글자</legend><label><input type="radio" name="type" checked={!settings.type} onChange={()=>onChange({type:false})}/>단어 단위 전환</label><label><input type="radio" name="type" checked={settings.type} onChange={()=>onChange({type:true})}/>글자 재조립</label></fieldset>
      <p>재생 위치를 유지합니다.</p>
    </details>
    <footer><button type="button" onClick={onReset}>기본 상태로 초기화</button><button type="button" onClick={()=>void copy()}>비교 주소 복사</button><button type="button" onClick={onExit}>개발 비교 종료</button></footer>
    <p role="status">{copied?'비교 주소를 복사했습니다.':copyFallback?'아래 주소를 선택해 복사해 주세요.':''}</p>
    {copyFallback&&<input className="development-copy-address" aria-label="비교 주소" readOnly value={copyFallback} onFocus={e=>e.currentTarget.select()}/>}
  </aside>
}
