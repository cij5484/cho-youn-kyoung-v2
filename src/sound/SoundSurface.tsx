import { useEffect, useRef, useState, type RefObject } from 'react'
import { createSoundController, type PlaybackPhase, type PlaybackState } from './controller.ts'
import { playableSource, type SoundSource } from './source.ts'
import type { BowPresetName } from './tuning-presets.ts'
import type { ContactActivity, ContactTrail, ContactViolet, SoundVisual } from './contact-motion.ts'

const labels = {
  ko: { idle:'선택해서 듣기', loading:'음원 준비 중', playing:'재생 중', buffering:'재생 준비 중', paused:'일시 정지', ended:'미리듣기 완료', error:'재생할 수 없습니다. 다시 시도해 주세요.', unavailable:'미리듣기 음원이 준비되지 않았습니다.' },
  en: { idle:'Listening is optional', loading:'Preparing audio', playing:'Playing', buffering:'Buffering', paused:'Paused', ended:'Preview complete', error:'Unable to play. Please try again.', unavailable:'Preview audio is unavailable.' },
} satisfies Record<string,Record<PlaybackPhase,string>>
const clock = (seconds: number) => `00:${Math.floor(Math.max(0,seconds)).toString().padStart(2,'0')}`

export function SoundSurface({ root, locale, source, visual, trail, activity, violet, preset }: { root: RefObject<HTMLDivElement | null>; locale: 'ko' | 'en'; source: SoundSource; visual: SoundVisual; trail: ContactTrail; activity: ContactActivity; violet: ContactViolet; preset: BowPresetName }) {
  const media=useRef<HTMLAudioElement>(null), controller=useRef<ReturnType<typeof createSoundController> | null>(null)
  const src=playableSource(source),status=source.status,duration=source.duration,trackId=source.trackId,sourceSha256=source.sourceSha256,features=source.features
  const [state,setState]=useState<PlaybackState>({phase:src ? 'idle':'unavailable',seconds:0,duration:source.duration,analysisAvailable:true})
  useEffect(()=>{controller.current=createSoundController(root.current!,media.current!,{src,status,duration,trackId,sourceSha256,features},setState);return()=>{controller.current?.destroy();controller.current=null}},[root,src,status,duration,trackId,sourceSha256,features])
  useEffect(()=>{controller.current?.setVisual(visual,trail,activity,violet,preset)},[visual,trail,activity,violet,preset,root,src,status,duration,trackId,sourceSha256,features])
  const active=['loading','playing','buffering'].includes(state.phase)
  const word=active ? 'PAUSE' : state.phase==='ended' ? 'REPLAY' : state.phase==='paused' ? 'RESUME' : state.phase==='error' ? 'RETRY' : 'LISTEN'
  const action=locale==='ko' ? active ? '미리듣기 일시 정지' : state.phase==='ended' ? '미리듣기 다시 듣기' : state.phase==='paused' ? '미리듣기 계속 듣기' : '미리듣기 재생' : active ? 'Pause preview' : state.phase==='ended' ? 'Replay preview' : state.phase==='paused' ? 'Resume preview' : 'Play preview'
  return <div className="sound-surface" data-playback={state.phase}>
    <h2 id="sound-title" className="hero-visually-hidden">{locale==='ko' ? '해금의 울림 — 선택해서 듣기' : 'The sound of Haegeum — optional listening'}</h2>
    <p className="sound-index" lang="en"><span>03</span><span>SOUND</span></p>
    <div className="sound-static-lines" aria-hidden="true"><span /><span /><i className="sound-static-contact" /></div>
    <div className="listen-composition">
      <button className="listen-trigger" type="button" onClick={()=>controller.current?.toggle()} disabled={!src} aria-label={action} aria-describedby="sound-caption sound-state">
        <span className="listen-mask" aria-hidden="true" lang="en"><span>{word}</span><span className="listen-echo">{word}</span></span>
        <span className="listen-mark" aria-hidden="true">{active ? 'Ⅱ' : '↗'}</span>
      </button>
      <p id="sound-state" className="sound-state" role="status" aria-live="polite" aria-atomic="true">{labels[locale][state.phase]}</p>
      <p className="sound-clock" aria-hidden="true">{clock(state.seconds)} <span>/</span> {clock(state.duration)}</p>
    </div>
    <div className="sound-caption" id="sound-caption">
      <p className="sound-thought">{locale==='ko' ? <>두 현 사이,<br />남는 울림.</> : <>Two strings.<br />A resonance remains.</>}</p>
      <p className="sound-credit">{source.title[locale]}<br />{locale==='ko' ? '조윤경 / 해금 · 18초 미리듣기' : 'Cho Youn Kyoung / Haegeum · 18-second excerpt'}</p>
    </div>
    {!state.analysisAvailable && <p className="sound-visual-fallback">{locale==='ko' ? '정적인 선과 함께 재생합니다.' : 'Playing with a static visual.'}</p>}
    <audio ref={media} preload="none" />
  </div>
}
