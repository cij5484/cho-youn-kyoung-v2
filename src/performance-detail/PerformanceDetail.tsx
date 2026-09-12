import { useEffect, useId, useLayoutEffect, useRef, useState, type CSSProperties } from 'react'
import { gsap } from 'gsap'
import { useLocation } from 'react-router'
import { Flip } from 'gsap/Flip'
import { performances, type PerformanceRecord } from './performance-data.ts'
import { appHref, albumStudyHref } from '../album-detail/album-navigation.ts'
import { AlbumSignaturePair } from '../album-detail/AlbumSignaturePair.tsx'
import { atmosphericCatalog } from '../works/candidates/atmospheric-catalog.ts'
import { atmosphericImages } from '../works/candidates/atmospheric-assets.ts'
import { blindFrames, mountPerformanceMask } from './performance-mask.ts'
import { mountPerformanceDualFlow } from './performance-dual-flow.ts'
import { TimePathProgram } from './TimePathProgram.tsx'
import './performance-detail.css'
import './performance-variants.css'

const number = (n: number) => String(n).padStart(2, '0')
type Profile = { person: NonNullable<PerformanceRecord['performers']>[number]; origin: HTMLImageElement | null }

export default function PerformanceDetail() {
  const { pathname } = useLocation()
  const record = performances.find(item => pathname.replace(/\/$/, '').endsWith(`/performance/${item.slug}`))
  return record ? <PerformanceRecordPage key={record.slug} record={record}/> : null
}

/** One content template; each data-selected signature owns only its motion. */
export function PerformanceRecordPage({ record }: { record: PerformanceRecord }) {
  const root = useRef<HTMLElement>(null), reader = useRef<HTMLDialogElement>(null), textReader = useRef<HTMLDialogElement>(null)
  const [page, setPage] = useState(0), [zoom, setZoom] = useState(false)
  const [profile, setProfile] = useState<Profile | null>(null)
  const maskId = useId().replaceAll(':', '')
  const pages = [{ ...record.poster, label: '공식 포스터' }, ...(record.archive ?? [])]
  const related = atmosphericCatalog.filter(item => item.type === 'performance' && item.id !== `performance:${record.slug}`)
  const chapters = [
    { id: 'opening', label: '공연', show: true },
    { id: 'score', label: '글 / 곡목', show: record.artistNote?.length || record.program?.length },
    { id: 'program', label: '곡목', show: record.variant === 'time-path' && record.program?.length },
    { id: 'performers', label: '출연', show: record.performers?.length },
    { id: 'archive', label: '자료', show: pages.length },
  ].filter(chapter => chapter.show)

  useEffect(() => {
    const dispose = record.variant === 'dual-flow' ? mountPerformanceDualFlow(root.current!)
      : record.variant === 'svg-mask' ? mountPerformanceMask(root.current!) : () => {}
    return () => { dispose() }
  }, [record])

  function showText(index?: number) {
    const dialog = textReader.current!
    dialog.showModal()
    const prose = dialog.querySelector<HTMLElement>('.performance-reader-prose')!
    const section = index === undefined ? null : prose.querySelector<HTMLElement>(`[data-program-reading="${index}"]`)
    prose.scrollTop = section ? prose.scrollTop + section.getBoundingClientRect().top - prose.getBoundingClientRect().top - 24 : 0
    section?.focus({ preventScroll: true })
  }

  function show(index: number) { setPage(index); setZoom(false); reader.current?.showModal() }
  function turn(delta: number) { setPage(index => Math.max(0, Math.min(pages.length - 1, index + delta))); setZoom(false) }
  const maskStyle = (id: string): CSSProperties => ({ '--chapter-mask': `url(#${maskId}-${id})` }) as CSSProperties

  return <article ref={root} data-detail-route={`/performance/${record.slug}`} className={`performance-record performance-variant-${record.variant}`} aria-labelledby="performance-title">
    <div className="performance-scroll-stage" style={{ '--chapter-count': chapters.length } as CSSProperties}>
      <div className="performance-chapter-stack">
        {record.variant === 'dual-flow' && <div className="performance-dual-field" aria-hidden="true">
          <svg viewBox="0 0 1200 900" preserveAspectRatio="xMidYMid slice"><ellipse data-dual-ring cx="300" cy="470" rx="270" ry="310"/><ellipse data-dual-ring cx="900" cy="450" rx="290" ry="330"/></svg>
          {[0, 1].map(side => <div key={side} className={`performance-dual-words performance-dual-words-${side}`} data-dual-flow>
            {[record.title, ...(record.program?.map(work => work.title) ?? []), ...(record.performers?.map(person => person.name) ?? [])].map((word, i) => <span key={i}>{word}</span>)}
          </div>)}
        </div>}
        {record.variant === 'svg-mask' && <svg className="performance-mask-definitions" aria-hidden="true"><defs>{chapters.slice(1).map(chapter => <mask key={chapter.id} id={`${maskId}-${chapter.id}`} maskUnits="objectBoundingBox" maskContentUnits="objectBoundingBox" x="0" y="0" width="1" height="1" style={{ maskType: 'luminance' }}>
          <rect width="1" height="1" fill="black"/>
          <g data-mask-for={`performance-${chapter.id}`}>{blindFrames.map((frame, index) => <rect key={index} x="0" y={frame.fromY} width="1" height="0" fill="white" shapeRendering="crispEdges"/>)}</g>
        </mask>)}</defs></svg>}

        <section id="performance-opening" className="performance-chapter performance-hero" data-performance-scene tabIndex={-1} aria-labelledby="performance-title">
          <div className="performance-chapter-inner">
            <div className="performance-topline"><a href={appHref('/works/#works-compact-archive')} data-album-return>WORKS</a><span>01 / PERFORMANCE — {record.date.slice(0, 4)}</span></div>
            <div className="performance-hero-layout">
              <div className="performance-hero-copy" data-scene-copy>
                <p className="performance-kicker">{record.subtitle}</p>
                <h1 id="performance-title">{record.title}</h1>
                {record.repertoire && <p className="performance-repertoire">{record.repertoire}</p>}
                <div className="performance-date"><time dateTime={`${record.date}T${record.time}:00+09:00`}>{record.date.slice(5).replace('-', '.')}<span>{record.time}</span></time><p>{record.venueUrl ? <a href={record.venueUrl} target="_blank" rel="noopener noreferrer" aria-label={`${record.venue} 공식 사이트`}>{record.venue}</a> : record.venue}</p></div>
              </div>
              <figure className="performance-poster" data-album-anchor="cover" style={{ '--poster-ratio': record.poster.width / record.poster.height } as CSSProperties}>
                <button onClick={() => show(0)} aria-label="공식 포스터 크게 보기"><img data-performance-poster src={record.poster.src}
                  srcSet={`${record.poster.mobileSrc} 724w, ${record.poster.src} ${record.poster.width}w`} sizes="(max-width: 700px) calc(100vw - 40px), 580px"
                  width={record.poster.width} height={record.poster.height} alt={`${record.title} 공식 공연 포스터`} fetchPriority="high"/></button>
              </figure>
            </div>
            <div className="performance-visit"><span>{record.address}</span>{record.admission?.map(item => <span key={item}>{item}</span>)}</div>
          </div>
        </section>

        {record.artistNote?.length || record.program?.length ? <section id="performance-score" className="performance-chapter performance-score-scene" data-performance-scene tabIndex={-1} style={maskStyle('score')} aria-labelledby="performance-score-title">
          <div className="performance-chapter-inner" data-album-anchor="story">
            <p className="performance-kicker">02 / 글과 곡목</p>
            <div className="performance-score-layout" data-scene-copy>
              <div className="performance-note">
                <h2 id="performance-score-title">{record.quote ?? '글과 곡목'}{!record.quote?.endsWith('.') && <span aria-hidden="true">.</span>}</h2>
                {record.artistNote?.[0] && <p className="performance-note-excerpt">{record.artistNote[0]}</p>}
                <button className="performance-text-link" onClick={() => showText()}>글과 곡 해설 읽기</button>
              </div>
              {record.program?.length && record.variant !== 'time-path' ? <ol className="performance-score">{record.program.map((work, i) => <li key={work.title}>
                <span className="performance-score-number" aria-hidden="true">{number(i + 1)}</span><div><p className="performance-kicker">{work.subtitle}</p><h3>{work.title}</h3>
                  {work.movements && <ol className="performance-movements">{work.movements.map((movement, n) => <li key={movement}><span>{number(n + 1)}</span>{movement}</li>)}</ol>}
                  {work.instrumentation && <p className="performance-instrumentation">{work.instrumentation}</p>}
                </div>
              </li>)}</ol> : null}
            </div>
          </div>
        </section> : null}

        {record.variant === 'time-path' && record.program?.length ? <TimePathProgram program={record.program} onRead={showText}/> : null}

        {record.performers?.length ? <section id="performance-performers" className="performance-chapter performance-performers" data-performance-scene tabIndex={-1} style={maskStyle('performers')} aria-labelledby="performance-performers-title">
          <div className="performance-chapter-inner" data-album-anchor="story">
            <header className="performance-section-heading" data-scene-copy><p className="performance-kicker">03</p><h2 id="performance-performers-title">출연</h2></header>
            <div className="performance-cast">{record.performers.map((person, index) => <figure key={person.name}>
              <button className="performance-profile-trigger" onClick={event => setProfile({ person, origin: event.currentTarget.querySelector('img') })} aria-label={`${person.name} 프로필 보기`}>
                {person.portrait && <img src={person.portrait} alt={`${person.name} 프로필 사진`} loading="lazy"/>}
              </button>
              <figcaption><span>{number(index + 1)} / {person.role}</span><h3><button onClick={event => setProfile({ person, origin: event.currentTarget.closest('figure')?.querySelector('img') ?? null })} aria-label={`${person.name} 프로필 보기`}>{person.name}</button></h3></figcaption>
            </figure>)}</div>
          </div>
        </section> : null}

        <section id="performance-archive" className="performance-chapter performance-archive" data-performance-scene tabIndex={-1} style={maskStyle('archive')} aria-labelledby="performance-archive-title">
          <div className="performance-chapter-inner">
            <header className="performance-section-heading" data-scene-copy><p className="performance-kicker">04</p><h2 id="performance-archive-title">자료</h2>
              {record.downloads?.length ? <div className="performance-downloads">{record.downloads.map(file => <a key={file.href} href={file.href} target="_blank" rel="noopener noreferrer" className="performance-text-link" download>{file.label}</a>)}</div> : null}
            </header>
            <div className="performance-printed" data-album-anchor="booklet">{pages.map((item, index) => <figure key={item.src}>
              <button onClick={() => show(index)} aria-label={`${item.label} 크게 보기`}><img src={item.src} width={item.width} height={item.height} alt={`${record.title} ${item.label}`} loading="lazy"/></button>
              <figcaption><span>{number(index + 1)} / {item.label}</span><button onClick={() => show(index)}>크게 보기</button></figcaption>
            </figure>)}</div>
          </div>
        </section>

        <nav className="performance-chapters" aria-label="공연 기록 목차">{chapters.map((chapter, i) => <a key={chapter.id} href={`#performance-${chapter.id}`} data-chapter-link><span>{number(i + 1)}</span><span>{chapter.label}</span></a>)}</nav>
      </div>
    </div>

    {related.length ? <section id="performance-related" className="performance-related" data-album-anchor="related" aria-labelledby="performance-related-title">
      <header className="performance-section-heading"><h2 id="performance-related-title">관련 공연</h2></header>
      <div className="performance-related-grid">{related.map(work => <a href={albumStudyHref(work)} key={work.id}><img src={atmosphericImages[work.image].mobileSrc} width={atmosphericImages[work.image].width} height={atmosphericImages[work.image].height} alt={`${work.title} 공연 포스터`} loading="lazy"/><div><time dateTime={work.date}>{work.date?.replaceAll('-', '.')}</time><h3>{work.title}</h3><p>{work.venue}</p></div></a>)}</div>
    </section> : null}
    <footer className="performance-return"><a href={appHref('/works/#works-compact-archive')} data-performance-archive-return>모든 작품으로</a><span>CHO YOUN KYOUNG / {record.date.slice(0, 4)}</span></footer>

    {profile && <PerformerProfile {...profile} onClose={() => setProfile(null)}/>}

    <dialog ref={textReader} className="performance-text-reader" aria-labelledby="performance-text-title">
      <div className="performance-reader-toolbar"><span>ARTIST NOTE / PROGRAM</span><button onClick={() => textReader.current?.close()} autoFocus>닫기 ×</button></div>
      <div className="performance-reader-prose"><h2 id="performance-text-title">{record.quote ?? record.title}</h2>{record.artistNote?.map(paragraph => <p key={paragraph}>{paragraph}</p>)}{record.signature && <p className="performance-signature">{record.signature}</p>}
        {record.fullIntroduction?.length ? <section aria-label="공연 소개">{record.fullIntroduction.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</section> : null}
        {record.program?.map((work, index) => <section key={work.title} data-program-reading={index} tabIndex={-1}>
          <p className="performance-kicker">PROGRAM / {number(index + 1)}</p><h3>{work.title}</h3>
          {work.composer && <p>{work.composer}{work.composerYears && ` (${work.composerYears})`}</p>}
          {work.composerBio?.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
          {(work.fullNote ?? work.note?.split(/\n\s*\n/) ?? []).map(paragraph => <p key={paragraph}>{paragraph}</p>)}
          {work.instrumentation && <p className="performance-instrumentation">{work.instrumentation}</p>}
        </section>)}
      </div>
    </dialog>
    <dialog ref={reader} className="performance-reader" aria-label="공연 인쇄물 보기" onClose={() => setZoom(false)} onKeyDown={event => { if (event.key === 'ArrowRight') turn(1); if (event.key === 'ArrowLeft') turn(-1) }}>
      <div className="performance-reader-toolbar"><span>{pages[page].label} / {number(page + 1)}—{number(pages.length)}</span><button onClick={() => reader.current?.close()} autoFocus aria-label="인쇄물 닫기">닫기 ×</button></div>
      <div className="performance-reader-image" data-zoom={zoom}><button onClick={() => setZoom(value => !value)} aria-label={zoom ? '이미지 축소' : '이미지 확대'} aria-pressed={zoom}><img src={pages[page].src} alt={`${record.title} ${pages[page].label}`}/></button></div>
      <div className="performance-reader-controls"><button onClick={() => turn(-1)} disabled={page === 0}>이전</button><button onClick={() => setZoom(value => !value)}>{zoom ? '전체 보기 −' : '확대 +'}</button><button onClick={() => turn(1)} disabled={page === pages.length - 1}>다음</button></div>
    </dialog>
    {record.variant === 'svg-mask' && <AlbumSignaturePair scope={root}/>}
  </article>
}

/** GridZoom's measured image-to-content relationship, within a native modal contract. */
function PerformerProfile({ person, origin, onClose }: Profile & { onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null)
  useLayoutEffect(() => {
    const owner = dialog.current!, portrait = owner.querySelector('img'), copy = owner.querySelector('.performance-profile-copy')!
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    owner.showModal()
    gsap.registerPlugin(Flip)
    const context = gsap.context(() => {
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
      if (portrait && origin) {
        owner.dataset.moving = 'true'
        gsap.from(portrait, {
          ...Flip.fit(portrait, origin, { getVars: true, scale: true }), duration: .65, ease: 'expo.inOut', clearProps: 'transform',
          onComplete: () => { delete owner.dataset.moving },
        })
      }
      gsap.from(copy, { opacity: 0, y: 14, duration: .35, delay: .2, clearProps: 'transform,opacity' })
    }, owner)
    return () => { gsap.killTweensOf([portrait, copy]); context.revert(); document.body.style.overflow = overflow }
  }, [origin, person])

  function close() {
    const owner = dialog.current!, portrait = owner.querySelector('img'), copy = owner.querySelector('.performance-profile-copy')!
    if (!portrait || !origin?.isConnected || matchMedia('(prefers-reduced-motion: reduce)').matches) { owner.close(); return }
    gsap.killTweensOf([portrait, copy])
    owner.dataset.moving = 'true'
    gsap.to(copy, { opacity: 0, duration: .15 })
    gsap.to(portrait, { ...Flip.fit(portrait, origin, { getVars: true, scale: true }), duration: .45, ease: 'power2.inOut', onComplete: () => owner.close() })
  }

  return <dialog ref={dialog} className="performance-profile" aria-labelledby="performance-profile-name" onClose={onClose} onCancel={event => { event.preventDefault(); close() }}>
    <button className="performance-profile-close" onClick={close} autoFocus aria-label="프로필 닫기">닫기 ×</button>
    <div className="performance-profile-layout">
      {person.portrait && <img src={person.portrait} alt={`${person.name} 프로필 사진`}/>}
      <div className="performance-profile-copy"><p className="performance-kicker">{person.role}</p><h2 id="performance-profile-name">{person.name}</h2>
        {person.fullBio?.length ? <ul>{person.fullBio.map(line => <li key={line}>{line}</li>)}</ul> : null}
      </div>
    </div>
  </dialog>
}
