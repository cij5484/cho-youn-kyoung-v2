import { useRef } from 'react'
import { HeroPoster } from '../hero/BoldHero.tsx'
import { useHeroMotion } from '../hero/useHeroMotion.ts'
import { haegeumContinuation } from './choreography.ts'
import { instrumentAssets, sourceDisclosure } from './assets.ts'

const { head, playing, full } = instrumentAssets
const stages = [
  { word: 'LINE', subject: 'HEAD / PEG', image: head, crop: 'head' },
  { word: 'TENSION', subject: 'STRINGS / BOW', image: playing, crop: 'bow' },
  { word: 'RESONANCE', subject: 'RESONANCE', image: { ...playing, alt: '연주 사진 속 실제 해금 울림통과 목재 표면' }, crop: 'body' },
  { word: 'HAEGEUM', subject: 'FULL HAEGEUM', image: full, crop: 'full' },
]
const disclosure = sourceDisclosure(full)
export function HaegeumExperience() {
  const scene = useRef<HTMLElement>(null)
  useHeroMotion(scene, haegeumContinuation)
  const failed = () => { if (scene.current) scene.current.dataset.instrumentError = 'true' }
  return <section ref={scene} className="bold-hero poster-scene haegeum-experience" aria-labelledby="artist-name">
    <HeroPoster continuationId="haegeum-end">
      <div className="instrument-keyword keyword-back" aria-hidden="true" lang="en">{stages.map(s => <span key={s.word}>{s.word}</span>)}</div>
      <figure className="instrument-field playing-field" aria-hidden="true"><img className="playing-image" src={playing.src} width={playing.width} height={playing.height} alt="" onError={failed} decoding="async" /></figure>
      <figure className="instrument-field editorial-field" aria-hidden="true"><img className="editorial-image" src={full.src} width={full.width} height={full.height} alt="" onError={failed} decoding="async" /></figure>
      <div className="instrument-keyword keyword-front" aria-hidden="true" lang="en">{stages.map(s => <span key={s.word}>{s.word}</span>)}</div>
      <p className="instrument-index" aria-hidden="true" lang="en"><span className="stage-number">01</span><span className="stage-subject">HEAD / PEG</span></p>
      {disclosure && <p className="editorial-disclosure" lang="en">{disclosure}</p>}
      <a className="sequence-skip" href="#haegeum-end">SKIP SEQUENCE ↓</a>
    </HeroPoster>
    <div className="instrument-static" lang="en">
      <h2 className="hero-visually-hidden">Haegeum — four perspectives</h2>
      {stages.map((s, i) => <figure key={s.word} className={`static-detail static-${s.crop}`}>
        <figcaption><span className="type-micro">0{i + 1} / {s.subject}</span><h3>{s.word}</h3></figcaption>
        <div className="static-crop"><img src={s.image.src} alt={s.image.alt} lang="ko" width={s.image.width} height={s.image.height} /></div>
        {s.crop === 'full' && disclosure && <p className="type-micro">{disclosure}{full.provenance === 'ai-editorial' && full.status === 'provisional' ? ' · PROVISIONAL' : ''}</p>}
      </figure>)}
    </div>
  </section>
}
