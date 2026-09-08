import { useEffect, useRef, useState } from 'react'
import hero from '../hero/assets/portrait-initial-640.webp'
import { instrumentAssets } from '../haegeum/assets.ts'
import { artistHanbok, featuredPerformance, homeAlbums, homeImage, selectedWorks } from './content.ts'
import { cancelSceneJump, homeSceneIndex, jumpToScene, type HomeSceneDestination } from './scene-destinations.ts'
import './scene-revisit.css'

const cues: Record<Exclude<HomeSceneDestination, 'sound'>, { src: string; caption: string }> = {
  hero: { src: hero, caption: '첫 인상' },
  haegeum: { src: instrumentAssets.playing.src, caption: '두 현과 활 사이' },
  works: { src: homeImage(selectedWorks[4].image).url, caption: '소리가 남긴 장면들' },
  album: { src: homeAlbums[0].front, caption: '손 안에 남는 소리' },
  performance: { src: homeImage(featuredPerformance.image).url, caption: '09.22 — 풀고, 엮다' },
  artist: { src: homeImage(artistHanbok).url, caption: '조윤경' },
}
function SceneCue({ scene }: { scene: HomeSceneDestination }) {
  const [failed, setFailed] = useState(false)
  const label = homeSceneIndex.find(item => item.id === scene)!
  return <figure className="scene-revisit-preview" data-preview={scene} aria-hidden="true">
    <div className="scene-revisit-preview-plane">
      {scene === 'sound' ? <div className="scene-revisit-sound"><span/><span/></div>
        : failed ? <span className="scene-revisit-fallback">{label.number}</span>
        : <img src={cues[scene].src} alt="" loading="lazy" decoding="async" onError={() => setFailed(true)}/>}
    </div>
    <figcaption>{scene === 'sound' ? '듣기 전의 고요' : cues[scene].caption}</figcaption>
  </figure>
}

/** Local event handlers only; the preview has a fixed place and never follows the cursor. */
export function SceneRevisitIndex() {
  const [open, setOpen] = useState(false), [scene, setScene] = useState<HomeSceneDestination>('hero')
  const trigger = useRef<HTMLButtonElement>(null), panel = useRef<HTMLDivElement>(null)
  useEffect(() => () => cancelSceneJump(), [])
  useEffect(() => {
    if (open && matchMedia('(max-width: 639px)').matches) panel.current?.querySelector<HTMLButtonElement>('button')?.focus({ preventScroll: true })
  }, [open])
  function close() { setOpen(false); trigger.current?.focus({ preventScroll: true }) }
  function jump(target: HomeSceneDestination) {
    // Keep focus outside a collapsing mobile disclosure until the destination itself receives it.
    setOpen(false)
    if (matchMedia('(max-width: 639px)').matches) trigger.current?.focus({ preventScroll: true })
    jumpToScene(target)
  }
  return <div className="scene-revisit" data-open={open} data-scene-preview={scene} onKeyDown={event => {
    if (event.key === 'Escape' && open) { event.stopPropagation(); close() }
  }}>
    <p className="scene-revisit-heading">장면 다시 보기</p>
    <button ref={trigger} className="scene-revisit-trigger" type="button" aria-expanded={open} aria-controls="scene-revisit-panel" onClick={() => open ? close() : setOpen(true)}>
      <span>장면 다시 보기</span><span aria-hidden="true">{open ? '−' : '+'}</span>
    </button>
    <div ref={panel} className="scene-revisit-panel" id="scene-revisit-panel">
      <nav className="scene-revisit-list" aria-label="홈 장면 다시 보기">
        {homeSceneIndex.map(item => <button type="button" key={item.id} data-scene-destination={item.id} onPointerEnter={event => {
          if (event.pointerType === 'mouse' || event.pointerType === 'pen') setScene(item.id)
        }} onFocus={() => setScene(item.id)} onClick={() => jump(item.id)}>
          <span className="scene-revisit-number">{item.number}</span><span className="scene-revisit-label">{item.label}</span><span className="scene-revisit-arrow" aria-hidden="true">↗</span>
        </button>)}
      </nav>
      <SceneCue key={scene} scene={scene}/>
    </div>
  </div>
}
