import { useRef } from 'react'
import { artistPortrait, homeImage } from './content.ts'
import { EditorialLink } from './EditorialLink.tsx'
import { useSurfaceResponse } from './surface-response.ts'

export function ArtistScene({ locale }: { locale: 'ko' | 'en' }) {
  const portrait = homeImage(artistPortrait), surface = useRef<HTMLElement>(null)
  useSurfaceResponse(surface)
  return <section ref={surface} id="artist" className="artist-scene" data-home-scene="07" aria-labelledby="artist-heading">
    <p className="section-index">07 — THE ARTIST</p>
    <div className="artist-composition">
      <figure className="artist-portrait"><div className="artist-portrait-mount"><div className="artist-portrait-aperture"><img src={portrait.url} width={portrait.width} height={portrait.height} alt={portrait.alt} loading="lazy" decoding="async"/></div><div className="artist-surface-light" aria-hidden="true"/></div><figcaption>CHO YOUN KYOUNG <span>HAEGEUM ARTIST</span></figcaption></figure>
      <div className="artist-copy"><p className="artist-pretitle">두 현 사이,<br/>하나의 목소리.</p><h2 id="artist-heading"><span>조</span><span>윤</span><span>경</span></h2><p className="artist-statement">해금으로 시간을 잇습니다.<br/>오래된 선율과 오늘의 감각이<br/>하나의 소리로 만나는 곳.</p><EditorialLink to="/about/" locale={locale}>연주자 이야기 보기</EditorialLink></div>
      <p className="artist-inscription" aria-hidden="true" lang="en">A voice.<br/><em>Her own.</em></p>
    </div>
  </section>
}
