import { featuredPerformance } from './content.ts'
import { appHref } from '../album-detail/album-navigation.ts'
import { EditorialLink } from './EditorialLink.tsx'

/** Event identity is stable; browsing another selected work cannot replace HOME's featured recital. */
export function PerformanceScene() {
  const performance = featuredPerformance
  return <section className="performance-scene dark-stage" data-home-scene="06" data-content-id={performance.reference.id} aria-labelledby="performance-heading">
    <p className="section-index">06 — LIVE PERFORMANCE</p>
    <time className="stage-date" dateTime="2026-09-22T19:30:00+09:00" aria-label="2026년 9월 22일"><span className="stage-month">09</span><i className="stage-date-boundary" aria-hidden="true"/><span className="stage-day">22</span></time>
    <div className="performance-caption">
      <h2 id="performance-heading">풀고, <em>엮다</em></h2>
      <p>{performance.venue}<br/>2026. 09. 22 · {performance.time}</p>
      <EditorialLink href={appHref(`/performance/${performance.slug}/`)}>공연 보기</EditorialLink>
    </div>
  </section>
}
