import type { CSSProperties } from 'react'
import { contentYear } from '../content/shared.ts'
import { homeImage, selectedWorks, type HomeWork } from './content.ts'

export function SelectedWorks({onSelect}:{onSelect:(work:HomeWork)=>void}){
  return <section id="selected-works" className="works-scene" data-home-scene="04" data-pin="true" aria-labelledby="works-heading">
    <div className="works-sticky">
      <svg className="works-axis" aria-hidden="true"><path/><path/></svg>
      <div className="section-kicker"><span>04 / SELECTED WORKS</span><span>조윤경의 작품들</span></div>
      <h2 id="works-heading" className="works-heading" lang="en">A SOUND.<br/><em>A BODY OF WORK.</em></h2>
      <div className="works-board">
        {selectedWorks.map((work,i)=>{const img=homeImage(work.image);return <article className={`selected-work work-${i+1}`} key={work.reference.id} style={{'--work-order':i,'--work-aspect':img.width!/img.height!} as CSSProperties}>
          <a href={work.reference.kind==='album'?'#album-object':'#performance'} onClick={()=>onSelect(work)} aria-label={`${work.title.ko.value} ${work.reference.kind==='album'?'앨범 오브제':'공연'} 보기`}>
            <div className="work-image"><img src={img.url} width={img.width} height={img.height} alt={img.alt} loading="lazy" decoding="async"/>
              <span className="work-reveal" aria-hidden="true"><span>{work.reference.kind==='album'?'앨범을 만나다':'무대로 이어지다'}</span><i>↗</i></span>
            </div>
            <div className="work-caption"><span className="work-number">0{i+1}</span><h3 lang="ko">{work.shortTitle}</h3><span>{contentYear(work.date)} / {work.reference.kind==='album'?'음반':'공연'}</span></div>
          </a>
        </article>})}
      </div>
      <p className="works-footnote">소리는 지나가고,<br/>작품은 남습니다.</p>
    </div>
  </section>
}
