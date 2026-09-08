import { useRef, type CSSProperties, type ReactNode } from 'react'
import { homeAlbums, contentPath, type AlbumPresentation } from './content.ts'
import { albumObjectTuning, useAlbumMotion } from './album-motion.ts'
import { EditorialLink } from './EditorialLink.tsx'

export interface AlbumObjectAdapterProps { album: AlbumPresentation }

/** Replace this renderer with a GLB adapter later; the stage owns selection, pose and navigation. */
export function PaperAlbumObject({ album }: AlbumObjectAdapterProps) {
  return <div className="paper-album" style={{ '--album-aspect': album.aspect } as CSSProperties} data-renderer="paper-2.5d" aria-hidden="true">
    <div className="album-face album-front"><img src={album.front} alt="" draggable="false" loading="lazy"/></div>
    <div className="album-face album-back"><img src={album.back} alt="" draggable="false" loading="lazy"/></div>
    <div className="album-spine"><img src={album.spine} alt="" draggable="false" loading="lazy"/></div>
    <div className="album-page-edge"/><div className="album-top-edge"/><div className="album-bottom-edge"/>
  </div>
}

export function AlbumObjectStage({ selected, onSelect, locale, renderObject = props => <PaperAlbumObject {...props}/> }: {
  selected: number; onSelect: (index: number) => void; locale: 'ko' | 'en'
  renderObject?: (props: AlbumObjectAdapterProps) => ReactNode
}) {
  const album = homeAlbums[selected], surface = useRef<HTMLDivElement>(null), turn = useAlbumMotion(surface)
  return <section id="album-object" className="album-object-scene" data-home-scene="05" aria-labelledby="album-object-heading">
    <header className="album-scene-title"><div><p className="section-index">05 — THE ALBUM</p><h2 id="album-object-heading" lang="en">Sound, <em>held.</em></h2></div></header>
    <div className="album-presentation" data-selected-album={album.reference.id} style={{'--exchange-duration':`${albumObjectTuning.exchangeDuration}ms`} as CSSProperties}>
      <div className="album-object-shadow" aria-hidden="true"/>
      <div ref={surface} className="album-object-surface" role="group" tabIndex={0} aria-label={`${album.title.ko.value} 입체 표지`} aria-describedby="album-object-hint">
        {homeAlbums.map((item,index)=>{const offset=((index-selected+4)%3)-1;return <div key={item.reference.id} className="album-exchange-slot" data-active={index===selected} style={{'--slot-offset':offset} as CSSProperties}><div className="album-object-pose">{renderObject({album:item})}</div></div>})}
      </div>
      <div className="album-handling"><p id="album-object-hint" className="album-object-hint">드래그 · ← →</p><div className="album-side-controls" aria-label="앨범 면 선택"><button type="button" onClick={() => turn.current(0)}>앞면</button><span aria-hidden="true">/</span><button type="button" onClick={() => turn.current(180)}>뒷면</button></div></div>
    </div>
    <div className="album-selection">
      <div className="album-current" aria-live="polite"><span>{album.number} / 03 — {album.category}</span><h3 lang="ko">{album.title.ko.value}</h3></div>
      <div className="album-selector" aria-label="앨범 선택">{homeAlbums.map((item, index) => <button type="button" key={item.reference.id} aria-pressed={index === selected} aria-label={item.title.ko.value} onClick={() => onSelect(index)}><span className="album-selector-image"><img src={item.front} alt="" width="96" height="86" loading="lazy"/></span><span>{item.number}</span></button>)}</div>
      <EditorialLink to={contentPath(album)} locale={locale}>앨범 자세히 보기</EditorialLink>
    </div>
    <div className="album-stage-threshold" aria-hidden="true"><span>Recorded.</span><span>Then, <em>live.</em> ↘</span></div>
  </section>
}
