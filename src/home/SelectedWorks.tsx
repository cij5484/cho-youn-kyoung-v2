import { useRef, useState, type CSSProperties } from 'react'
import { contentYear } from '../content/shared.ts'
import { homeImage, selectedWorks, type HomeWork } from './content.ts'
import { useWorksRibbon } from './works-motion.ts'

export function SelectedWorks({onSelect}:{onSelect:(work:HomeWork)=>void}){
  const root = useRef<HTMLElement>(null), [active, setActive] = useState(0)
  const seek = useWorksRibbon(root, setActive), current = selectedWorks[active]
  return <section ref={root} id="selected-works" className="works-scene" data-home-scene="04" data-pin="true" aria-labelledby="works-heading">
    <div className="works-sticky">
      <svg className="works-axis" aria-hidden="true"><path/><path/></svg>
      <header className="works-header"><div><p className="section-index">04 — SELECTED WORKS</p><h2 id="works-heading">소리가 남긴 <em>장면들.</em></h2></div></header>
      <div className="works-board">
        {selectedWorks.map((work,i)=>{const img=homeImage(work.image);return <article className={`selected-work work-${i+1}`} key={work.reference.id} data-work-index={i} style={{'--work-aspect':img.width!/img.height!} as CSSProperties}>
          <a href={work.reference.kind==='album'?'#album-object':'#performance'} onClick={()=>onSelect(work)} aria-label={`${work.title.ko.value} ${work.reference.kind==='album'?'앨범 오브제':'공연'} 보기`}>
            <div className="work-image"><img src={img.url} width={img.width} height={img.height} alt={img.alt} loading="lazy" decoding="async"/>
              <span className="work-reveal" aria-hidden="true"><span>{work.reference.kind==='album'?'앨범 보기':'공연 보기'}</span><i>↗</i></span>
            </div>
            <div className="work-caption"><span>0{i+1}</span><h3 lang="ko">{work.shortTitle}</h3><span>{contentYear(work.date)} / {work.reference.kind==='album'?'음반':'공연'}</span></div>
          </a>
        </article>})}
      </div>
      <div className="works-ledger">
        <div className="works-current" aria-live="polite"><span>0{active+1} / 05</span><div><h3>{current.shortTitle}</h3><p>{contentYear(current.date)} · {current.reference.kind==='album'?'음반':'공연'}</p></div></div>
        <nav className="works-selector" aria-label="작품 리본 탐색">{selectedWorks.map((work,i)=><button type="button" key={work.reference.id} aria-label={`${work.shortTitle} 펼치기`} aria-pressed={i===active} onClick={()=>seek.current(i)}><span>0{i+1}</span></button>)}</nav>
      </div>
    </div>
  </section>
}
