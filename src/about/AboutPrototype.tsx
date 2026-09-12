import { useCallback, useLayoutEffect, useRef, useState, type CSSProperties } from 'react'
import { Link } from 'react-router'
import { portraits, biography, milestones, careerGroups, recitals, discography } from './about-data'
import { mountPortraitFlow } from './about-motion'
import { PortraitGallery } from './PortraitGallery'
import './about.css'

export default function AboutPrototype() {
  const story = useRef<HTMLElement>(null)
  const [gallery, setGallery] = useState<{ index: number; origin: HTMLButtonElement } | null>(null)
  const closeGallery = useCallback(() => setGallery(null), [])
  useLayoutEffect(() => mountPortraitFlow(story.current!), [])

  return <article className="about-page" aria-labelledby="about-title">
    <section className="about-scroll" ref={story} data-motion="static" data-gallery={gallery ? "true" : undefined} aria-label="초상과 약력">
      <div className="about-stage">
        <div className="about-topline"><span>ABOUT / CHO YOUN KYOUNG</span><a href="#about-career">전체 약력</a></div>
        <header className="about-intro">
          <p className="about-kicker">해금 연주자 / 조윤경</p>
          <h1 id="about-title">Cho Youn<br/>Kyoung<span>.</span></h1>
          <p className="about-intro-role">국립부산국악원 기악단 단원<br/>음악학박사 D.M.A.</p>
        </header>
        <div className="about-portraits" aria-label="조윤경의 초상 사진">
          {portraits.map((portrait, index) => <figure className="about-portrait" key={portrait.src} style={{ '--portrait-aspect': portrait.aspect } as CSSProperties}>
            <button type="button" className="about-open" aria-label={index === 0 ? 'Open' : `사진 ${index + 1} 크게 보기`} onClick={event => {
              if (story.current?.dataset.state === 'open') setGallery({ index, origin: event.currentTarget })
            }}>
              <img src={portrait.src} alt={portrait.alt} width={Math.round(portrait.aspect * 600)} height="600" decoding="async" fetchPriority={index === 0 ? 'high' : 'auto'}/>
              {index === 0 && <span>Open</span>}
            </button>
          </figure>)}
        </div>
      </div>
      <div className="about-chapters">
        <section className="about-chapter about-biography" id="about-biography" tabIndex={-1} aria-labelledby="about-bio-title">
          <p className="about-kicker">01 / BIOGRAPHY</p><h2 id="about-bio-title">조윤경</h2>
          {biography.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
        </section>
        <section className="about-chapter about-milestones" aria-labelledby="about-milestones-title">
          <p className="about-kicker">02 / SELECTED MILESTONES</p><h2 id="about-milestones-title">주요 기록</h2>
          <ol>{milestones.map(item => <li key={`${item.year}-${item.title}`}><span>{item.year}</span><div><h3>{item.title}</h3><p>{item.detail}</p></div></li>)}</ol>
        </section>
        <section className="about-chapter about-record-list" aria-labelledby="about-recitals-title">
          <p className="about-kicker">03 / RECITALS</p><h2 id="about-recitals-title">독주회</h2>
          <ol>{[...recitals].reverse().map(item => <li key={`${item.year}-${item.title}`}><span>{'date' in item ? item.date.replaceAll('-', '.') : item.year}</span>{'href' in item ? <Link to={item.href}>{item.title}</Link> : <span>{item.title}</span>}</li>)}</ol>
        </section>
        <section className="about-chapter about-record-list" aria-labelledby="about-albums-title">
          <p className="about-kicker">04 / ALBUMS</p><h2 id="about-albums-title">음반</h2>
          <ol>{discography.map(item => <li key={item.title}><span>{item.year}</span><Link to={item.href}>{item.title}</Link></li>)}</ol>
        </section>
        <section className="about-chapter about-career" id="about-career" aria-labelledby="about-career-title">
          <p className="about-kicker">05 / CAREER · EDUCATION · AWARDS</p><h2 id="about-career-title">약력</h2>
          <div className="about-career-groups">{careerGroups.map(group => <section key={group.title}><h3>{group.title}</h3><ul>{group.items.map(item => <li key={item}>{item}</li>)}</ul></section>)}</div>
        </section>
      </div>
    </section>
    <footer className="about-contact"><p className="about-kicker">공연 · 협업 문의</p><Link to="/contact/">Contact<span>.</span></Link></footer>
    {gallery && <PortraitGallery selection={gallery} onClose={closeGallery}/>}
  </article>
}
