import { useRef } from 'react'
import { stagePerformances, homeImage, contentPath } from './content.ts'
import { EditorialLink } from './EditorialLink.tsx'
import { useSurfaceResponse } from './surface-response.ts'

export function PerformanceScene({ selected, locale }: { selected: number; locale: 'ko' | 'en' }) {
  const performance = stagePerformances[selected], image = homeImage(performance.image)
  const surface = useRef<HTMLElement>(null)
  useSurfaceResponse(surface)
  return <section ref={surface} id="performance" className="performance-scene dark-stage" data-home-scene="06" aria-labelledby="performance-heading">
    <div className="performance-atmosphere" aria-hidden="true"><span/><span/><span/></div>
    <header className="performance-title"><p className="section-index">06 — LIVE PERFORMANCE</p><h2 id="performance-heading">지금, <em>이 무대.</em></h2></header>
    <div className="performance-composition">
      <figure className="performance-image-window"><img key={image.url} className="performance-poster" src={image.url} alt={image.alt} width={image.width} height={image.height} loading="lazy" decoding="async"/><figcaption>공식 공연 포스터 · {performance.date.slice(0,4)}</figcaption></figure>
      <div className="performance-caption"><p>{performance.date}<span>{performance.venue}</span></p><h3 lang="ko">{performance.title}</h3><p>{performance.subtitle}</p><EditorialLink to={contentPath(performance)} locale={locale}>공연 이야기 보기</EditorialLink></div>
      <span className="performance-margin-word" lang="en" aria-hidden="true">In the <em>presence</em><br/>of sound.</span>
    </div>
    <div className="performance-exit" aria-hidden="true"><span>그 소리의 주인공</span><span>조윤경 ↓</span></div>
  </section>
}
