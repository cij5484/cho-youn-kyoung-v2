import { useLayoutEffect, useRef, type CSSProperties } from 'react'
import { useLocation } from 'react-router'
import { workDate } from '../catalog.ts'
import { atmosphericCatalog as worksCatalog } from './atmospheric-catalog.ts'
import { atmosphericImages as workImages } from './atmospheric-assets.ts'
import { AtmosphericArchive } from './AtmosphericArchive.tsx'
import { WorksSignaturePair } from './WorksSignaturePair.tsx'
import { mountWorksHelix } from './works-helix-motion.ts'
import { albumStudyHref } from '../../album-detail/album-navigation.ts'
import './atmospheric.css'

/** Scroll owns one reversible CSS 3D sculpture and its handoff to the actual archive. */
export function AtmosphericDepth() {
  const scope = useRef<HTMLDivElement>(null), root = useRef<HTMLElement>(null)
  const location = useLocation()
  useLayoutEffect(() => mountWorksHelix(root.current!), [])
  return <div ref={scope} className="atmospheric-experience">
    <section ref={root} className="atmospheric-depth works-helix" data-state="ready" aria-labelledby="atmospheric-title">
      <div className="atmospheric-stage">
        <header className="atmospheric-heading"><p>CHO YOUN KYOUNG</p><h1 id="atmospheric-title">Works<span>.</span></h1></header>
        <div className="works-helix-space" aria-hidden="true">
          {worksCatalog.map((work, index) => {
            const asset = workImages[work.image]
            return <figure className="works-helix-card" key={work.id} data-work-id={work.id}>
              <img src={asset.mobileSrc} width={asset.width} height={asset.height} alt="" decoding="async" loading={index ? 'lazy' : 'eager'}/>
            </figure>
          })}
        </div>
        <div className="works-helix-captions">
          {worksCatalog.map((work, index) => {
            const title = work.title.replace(/^조윤경\s+/, '')
            let letter = 0
            return <div className="works-helix-caption" key={work.id} data-caption-index={index}>
            <p className="works-helix-kicker">{String(index + 1).padStart(2, '0')} / {work.type === 'album' ? 'RECORDING' : 'PERFORMANCE'}</p>
            <h2 aria-label={title}>{title.split(' ').map((word, wordIndex) => <span className="works-title-word" aria-hidden="true" key={wordIndex}>
              {wordIndex > 0 && ' '}{Array.from(word).map((char, charIndex) => <span className="works-letter-mask" key={charIndex}>
                <span className="works-letter" style={{ '--letter': Math.min(letter++, 12) } as CSSProperties}>{char}</span>
              </span>)}
            </span>)}</h2>
            <p className="works-helix-meta">{workDate(work)}<span>{work.venue ?? (work.releaseState === 'announced' ? '발매 예정' : '')}</span></p>
            <a href={albumStudyHref(work)} data-helix-entry-index={index} aria-label={`${work.title} — 기록 보기`}>기록 보기</a>
          </div>})}
        </div>
        <nav className="works-helix-steps" aria-label="작품 선택">{worksCatalog.map((work, index) =>
          <button key={work.id} type="button" data-helix-step={index} aria-label={work.title}>{String(index + 1).padStart(2, '0')}</button>)}</nav>
        <a className="atmospheric-index" href="#works-compact-archive">INDEX</a>
      </div>
      <AtmosphericArchive locale={location.pathname.startsWith('/en') ? 'en' : 'ko'}/>
    </section>
    <WorksSignaturePair scope={scope}/>
  </div>
}
