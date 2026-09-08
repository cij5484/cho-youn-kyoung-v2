import { useRef, useState } from 'react'
import { SelectedWorks } from './SelectedWorks.tsx'
import { AlbumObjectStage } from './AlbumObjectStage.tsx'
import { PerformanceScene } from './PerformanceScene.tsx'
import { ArtistScene } from './ArtistScene.tsx'
import { HomeOutro } from './HomeOutro.tsx'
import { useHomeClosingMotion } from './motion.ts'
import { homeAlbums, stagePerformances, type HomeWork } from './content.ts'
import './home.css'

export function HomeClosing({ locale }: { locale: 'ko' | 'en' }) {
  const root = useRef<HTMLDivElement>(null), [album, setAlbum] = useState(0), [performance, setPerformance] = useState(0)
  useHomeClosingMotion(root)
  function select(work: HomeWork) {
    if (work.reference.kind === 'album') { const index = homeAlbums.findIndex(a => a.reference.id === work.reference.id); if (index >= 0) setAlbum(index) }
    else { const index = stagePerformances.findIndex(p => p.reference.id === work.reference.id); if (index >= 0) setPerformance(index) }
  }
  return <div ref={root} className="home-closing" lang="ko" data-prototype="HOME_CLOSING_DEVELOPMENT_ONLY">
    <canvas className="works-motif works-motif-back" aria-hidden="true"/>
    <canvas className="works-motif works-motif-front" aria-hidden="true"/>
    <SelectedWorks onSelect={select}/><AlbumObjectStage selected={album} onSelect={setAlbum} locale={locale}/>
    <PerformanceScene selected={performance} locale={locale}/><ArtistScene locale={locale}/><HomeOutro locale={locale}/>
  </div>
}
