import { featuredPerformance } from './content.ts'

/** Event identity is stable; browsing another selected work cannot replace HOME's featured recital. */
export function PerformanceScene() {
  const performance = featuredPerformance
  return <section className="performance-scene dark-stage" data-home-scene="06" aria-labelledby="performance-heading">
    <p className="section-index">06 — LIVE PERFORMANCE</p>
    <time className="stage-date" dateTime="2026-09-22T19:30:00+09:00"><span>09</span><i>/</i><span>22</span></time>
    <div className="performance-caption">
      <h2 id="performance-heading">풀고, <em>엮다</em></h2>
      <p>{performance.venue}<br/>2026. 09. 22 · {performance.time}</p>
      <a className="editorial-link" href={`https://choyounkyoung.com/performance/${performance.slug}/`}>공연 보기 <span aria-hidden="true">↗</span></a>
    </div>
  </section>
}
