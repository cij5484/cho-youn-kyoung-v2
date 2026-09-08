import { useRef } from 'react'
import { PerformanceScene } from './PerformanceScene.tsx'
import { ArtistScene } from './ArtistScene.tsx'
import { artistHanbok, artistPortrait, featuredPerformance, homeImage } from './content.ts'
import { useStageArtistMotion } from './stage-artist-motion.ts'
import { useSurfaceResponse } from './surface-response.ts'
import './stage-depth.css'

/** One persistent photographic aperture and one seam own the complete 06 → 07 handoff. */
export function StageArtistSequence({locale}:{locale:'ko'|'en'}) {
  const root=useRef<HTMLDivElement>(null), poster=homeImage(featuredPerformance.image), suit=homeImage(artistPortrait), hanbok=homeImage(artistHanbok)
  useSurfaceResponse(root); useStageArtistMotion(root)
  return <div ref={root} className="stage-artist-sequence">
    <div id="performance" className="sequence-anchor stage-anchor" tabIndex={-1}/>
    <div id="artist" className="sequence-anchor artist-anchor" tabIndex={-1}/>
    <div className="stage-artist-sticky">
      <div className="stage-ivory" aria-hidden="true"/>
      <div className="stage-ambience" aria-hidden="true"/>
      <div className="shared-image-frame">
        <figure className="performance-image-window" data-content-id={featuredPerformance.reference.id} data-asset-id={featuredPerformance.image.asset.id}><img id="home-featured-performance-image" className="performance-poster" src={poster.url} width={poster.width} height={poster.height} alt={poster.alt} loading="lazy" decoding="async"/></figure>
        <figure className="artist-portrait-aperture" data-artist-identity="cho-youn-kyoung">
          <img className="artist-suit" data-asset-id={artistPortrait.asset.id} src={suit.url} width={suit.width} height={suit.height} alt={suit.alt} loading="lazy" decoding="async"/>
          <img className="artist-hanbok" data-asset-id={artistHanbok.asset.id} src={hanbok.url} width={hanbok.width} height={hanbok.height} alt={hanbok.alt} loading="lazy" decoding="async"/>
        </figure>
        <div className="shared-seam" aria-hidden="true"/>
        <div className="stage-material-light" aria-hidden="true"/>
      </div>
      <PerformanceScene/><ArtistScene locale={locale}/>
    </div>
  </div>
}
