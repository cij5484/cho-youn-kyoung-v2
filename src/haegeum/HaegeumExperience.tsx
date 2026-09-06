import { useRef } from 'react'
import { HeroPoster } from '../hero/BoldHero.tsx'
import { useHeroMotion } from '../hero/useHeroMotion.ts'
import { haegeumContinuation } from './choreography.ts'
import headPortrait from '../hero/assets/portrait-instrument.webp'
import playing from './assets/haegeum-playing.webp'
import editorial from './assets/haegeum-editorial-ai.webp'

const stages = [
  { word: 'LINE', subject: 'HEAD / PEG', image: headPortrait, alt: '보라 한복을 입은 조윤경 옆의 실제 해금 머리와 주아', crop: 'head' },
  { word: 'TENSION', subject: 'STRINGS / BOW', image: playing, alt: '조윤경이 연주하는 실제 해금의 두 현과 활이 만나는 부분', crop: 'bow' },
  { word: 'RESONANCE', subject: 'RESONANCE', image: playing, alt: '연주 사진 속 실제 해금 울림통과 목재 표면', crop: 'body' },
  { word: 'HAEGEUM', subject: 'FULL HAEGEUM', image: editorial, alt: '베이지 배경 해금 전체의 AI 생성 시각 참고 이미지. 실물 촬영 사진이 아님.', crop: 'full' },
]
export function HaegeumExperience() {
  const scene = useRef<HTMLElement>(null)
  useHeroMotion(scene, haegeumContinuation)
  const failed = () => { if (scene.current) scene.current.dataset.instrumentError = 'true' }
  return <section ref={scene} className="bold-hero poster-scene haegeum-experience" aria-labelledby="artist-name">
    <HeroPoster continuationId="haegeum-end">
      <div className="instrument-keyword keyword-back" aria-hidden="true" lang="en">{stages.map(s => <span key={s.word}>{s.word}</span>)}</div>
      <figure className="instrument-field playing-field" aria-hidden="true"><img className="playing-image" src={playing} width="1024" height="1536" alt="" onError={failed} decoding="async" /></figure>
      <figure className="instrument-field editorial-field" aria-hidden="true"><img className="editorial-image" src={editorial} width="1024" height="1536" alt="" onError={failed} decoding="async" /></figure>
      <div className="instrument-keyword keyword-front" aria-hidden="true" lang="en">{stages.map(s => <span key={s.word}>{s.word}</span>)}</div>
      <p className="instrument-index" aria-hidden="true" lang="en"><span className="stage-number">01</span><span className="stage-subject">HEAD / PEG</span></p>
      <p className="editorial-disclosure" lang="en">AI-GENERATED VISUAL STUDY</p>
      <a className="sequence-skip" href="#haegeum-end">SKIP SEQUENCE ↓</a>
    </HeroPoster>
    <div className="instrument-static" lang="en">
      <h2 className="hero-visually-hidden">Haegeum — four perspectives</h2>
      {stages.map((s, i) => <figure key={s.word} className={`static-detail static-${s.crop}`}>
        <figcaption><span className="type-micro">0{i + 1} / {s.subject}</span><h3>{s.word}</h3></figcaption>
        <div className="static-crop"><img src={s.image} alt={s.alt} lang="ko" width="1024" height="1536" /></div>
        {s.crop === 'full' && <p className="type-micro">AI-GENERATED VISUAL STUDY · PROVISIONAL</p>}
      </figure>)}
    </div>
  </section>
}
