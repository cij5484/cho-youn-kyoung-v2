import { stagePerformances, homeImage, contentPath } from './content.ts'
import { EditorialLink } from './EditorialLink.tsx'

export function PerformanceScene({ selected, locale }: { selected: number; locale: 'ko' | 'en' }) {
  const performance = stagePerformances[selected], image = homeImage(performance.image)
  return <section id="performance" className="performance-scene dark-stage" data-home-scene="06" aria-labelledby="performance-heading">
    <div className="section-kicker"><span>06 / LIVE PERFORMANCE</span><span>다시, 무대 위에서</span></div>
    <div className="performance-image-window"><img key={image.url} className="performance-poster" src={image.url} alt={image.alt} width={image.width} height={image.height} loading="lazy" decoding="async"/></div>
    <div className="performance-stage-lines" aria-hidden="true"><span/><span/></div>
    <div className="performance-title"><p className="performance-overline">소리가 지금이 되는 순간</p><h2 id="performance-heading" lang="en"><span>ON</span><em>STAGE.</em></h2></div>
    <div className="performance-caption"><p>{performance.date}<span>{performance.venue}</span></p><h3 lang="ko">{performance.title}</h3><p>{performance.subtitle}</p><EditorialLink to={contentPath(performance)} locale={locale}>공연 이야기 보기</EditorialLink></div>
    <p className="performance-source">공식 공연 포스터 / {performance.date.slice(0, 4)}</p>
    <div className="performance-exit" aria-hidden="true"><span>BEHIND THE SOUND</span><span>THE ARTIST ↓</span></div>
  </section>
}
