import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import records from './media-records.json'
import { mountMediaLoom } from './media-unwoven'
import { mediaFilmScrollState } from './media-loom-model'
import './media.css'

type Film = typeof records.videos[number]
type Selection = { film: Film; origin: HTMLButtonElement }
const featured = records.videos.find(film => film.featured)!
const films = records.videos.filter(film => film.format !== 'archive')
const archives = records.videos.filter(film => film.format === 'archive')

function FilmFocus({ selection, onClose }: { selection: Selection; onClose: () => void }) {
  const { film, origin } = selection
  const dialog = useRef<HTMLDialogElement>(null), frame = useRef<HTMLDivElement>(null)
  const animation = useRef<gsap.core.Timeline | null>(null)
  const closing = useRef(false)
  const [playing, setPlaying] = useState(false)
  useLayoutEffect(() => {
    const element = dialog.current!, object = frame.current!
    const overflow = document.body.style.overflow
    element.showModal()
    document.body.style.overflow = 'hidden'
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const from = origin.getBoundingClientRect(), to = object.getBoundingClientRect()
      // GridToFullPreview uses an ivory cross over the image, closing its two seams.
      animation.current = gsap.timeline().fromTo(object, {
        x: from.left - to.left, y: from.top - to.top,
        scaleX: from.width / to.width, scaleY: from.height / to.height,
      }, { x: 0, y: 0, scaleX: 1, scaleY: 1, duration: .65, ease: 'power3.inOut' })
        .fromTo(element.querySelectorAll('.media-focus-seam'), { scale: 1 }, { scale: 0, duration: .55, ease: 'power3.inOut' }, .1)
        .fromTo(element.querySelectorAll('.media-focus-copy'), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: .3 }, .35)
    }
    const otherAudio = (event: Event) => { if (event.target instanceof HTMLAudioElement) setPlaying(false) }
    document.addEventListener('play', otherAudio, true)
    return () => {
      animation.current?.kill()
      document.removeEventListener('play', otherAudio, true)
      document.body.style.overflow = overflow
      element.close()
      if (origin.isConnected) origin.focus({ preventScroll: true })
    }
  }, [origin])
  const close = () => {
    if (closing.current) return
    closing.current = true
    setPlaying(false)
    animation.current?.kill()
    if (matchMedia('(prefers-reduced-motion: reduce)').matches || !origin.isConnected) { onClose(); return }
    const object = frame.current!, from = object.getBoundingClientRect(), to = origin.getBoundingClientRect()
    animation.current = gsap.timeline({ onComplete: onClose }).to(object,
      to.bottom > 0 && to.top < innerHeight
        ? { x: `+=${to.left - from.left}`, y: `+=${to.top - from.top}`, scaleX: to.width / object.offsetWidth, scaleY: to.height / object.offsetHeight, duration: .38, ease: 'power3.inOut' }
        : { opacity: 0, duration: .2 })
  }
  return <dialog ref={dialog} className="media-focus" aria-labelledby="media-focus-title" onCancel={event => { event.preventDefault(); close() }}>
    <header className="media-focus-copy"><span>CHO YOUN KYOUNG / FILM</span><button type="button" onClick={close} aria-label="영상 닫기">닫기 <span aria-hidden="true">×</span></button></header>
    <div className="media-focus-frame" ref={frame} style={{ '--film-aspect': film.aspect } as CSSProperties}>
      <img src={film.poster} alt=""/>
      {playing ? <iframe title={film.title} src={`https://www.youtube-nocookie.com/embed/${film.youtubeId}?autoplay=1&rel=0`} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen referrerPolicy="strict-origin-when-cross-origin"/> : <button className="media-play" type="button" onClick={() => {
        document.querySelectorAll('audio').forEach(audio => audio.pause())
        setPlaying(true)
      }}><span aria-hidden="true">▷</span> 재생</button>}
      <i className="media-focus-seam media-focus-seam-x" aria-hidden="true"/><i className="media-focus-seam media-focus-seam-y" aria-hidden="true"/>
    </div>
    <footer className="media-focus-copy"><div><h2 id="media-focus-title">{film.title}</h2><p>{film.description}</p></div><a href={`https://www.youtube.com/watch?v=${film.youtubeId}`} target="_blank" rel="noopener noreferrer">{playing ? '재생되지 않으면 YouTube에서 보기' : 'YouTube에서 보기'}<span className="media-sr"> (새 창)</span></a></footer>
  </dialog>
}

export default function MediaPrototype() {
  const loom = useRef<HTMLDivElement>(null)
  const renderer = useRef<ReturnType<typeof mountMediaLoom> | null>(null)
  const scroll = useRef<ScrollTrigger | null>(null)
  const [active, setActive] = useState(featured)
  const [selection, select] = useState<Selection | null>(null)
  useEffect(() => {
    renderer.current = mountMediaLoom({ host: loom.current!, source: featured.poster, aspect: featured.aspect, sources: films.map(film => film.poster) })
    gsap.registerPlugin(ScrollTrigger)
    let current = 0
    const media = gsap.matchMedia()
    media.add('(prefers-reduced-motion: no-preference)', () => {
      scroll.current = ScrollTrigger.create({ trigger: loom.current!.closest('.media-featured-scroll'),
        start: 'top 70px', end: 'bottom bottom', onUpdate: self => {
          const state = mediaFilmScrollState(self.progress, films.length)
          const from = films[state.from], to = films[state.to]
          renderer.current?.scrub(from.poster, to.poster, from.aspect + (to.aspect - from.aspect) * state.mix, state.value)
          if (state.index !== current) { current = state.index; setActive(films[current]) }
        } })
      return () => { scroll.current = null }
    })
    return () => { media.revert(); renderer.current?.dispose(); renderer.current = null }
  }, [])
  return <article className="media-page">
    <header className="media-hero"><div><p className="media-eyebrow">CHO YOUN KYOUNG</p><h1>Media<span>.</span></h1></div><p className="media-hero-index">{String(records.videos.length).padStart(2, '0')} FILMS<br/>{String(records.press.length).padStart(2, '0')} PRESS</p></header>
    <section className="media-featured-scroll" aria-labelledby="media-featured-title">
      <div className="media-featured-stage">
        <div className="media-section-label"><span>01 / FILMS</span><span>{active.year}</span></div>
        <div className="media-loom" ref={loom} style={{ '--film-aspect': active.aspect } as CSSProperties}>
          <img className="media-loom-fallback" src={active.poster} alt={`${active.title} 공연 장면`} fetchPriority="high"/>
          <button className="media-featured-open" type="button" aria-label={`${active.title} 영상 보기`} onClick={event => select({ film: active, origin: event.currentTarget })}><span>영상 보기 <span aria-hidden="true">▷</span></span></button>
        </div>
        <div className="media-featured-caption" aria-live="polite"><h2 id="media-featured-title">{active.title}</h2><p>{active.subtitle}</p></div>
        <nav className="media-film-selector" aria-label="공연 영상 선택">{films.map((film, index) => <button key={film.id} type="button" aria-pressed={active.id === film.id} onClick={() => {
          if (active.id === film.id) return
          if (scroll.current) {
            window.scrollTo({ top: scroll.current.start + (scroll.current.end - scroll.current.start) * index / Math.max(1, films.length - 1), behavior: 'smooth' })
          } else { setActive(film); renderer.current?.scrub(film.poster, film.poster, film.aspect) }
        }}><span>{String(index + 1).padStart(2, '0')}</span><span>{film.title}</span></button>)}</nav>
      </div>
    </section>
    <section className="media-special" aria-labelledby="media-special-title">
      <header className="media-section-heading"><p className="media-eyebrow">02 / ARCHIVE</p><h2 id="media-special-title">Special Archive<span>.</span></h2></header>
      <div className="media-archive-layout">{archives.map(film => <figure className="media-film" key={film.id}>
        <button type="button" aria-label={`${film.title} 영상 보기`} onClick={event => select({ film, origin: event.currentTarget })} style={{ aspectRatio: film.aspect }}><img src={film.poster} alt={`${film.title} 영상 장면`} loading="lazy"/><span className="media-film-open">영상 보기 <span aria-hidden="true">▷</span></span></button>
        <figcaption><div className="media-film-meta"><span>SPECIAL ARCHIVE</span><span>{film.year}</span></div><h3>{film.title}</h3><p>{film.subtitle}</p><p className="media-archive-note">{film.description}</p></figcaption>
      </figure>)}</div>
    </section>
    <section className="media-press" aria-labelledby="media-press-title">
      <header className="media-section-heading"><p className="media-eyebrow">03 / IN PRINT</p><h2 id="media-press-title">Press Index<span>.</span></h2></header>
      <ol>{records.press.map(article => <li key={article.id}><a href={article.url} target="_blank" rel="noopener noreferrer"><time dateTime={article.publishedDate}>{article.publishedDate.slice(0, 4)}</time><span className="media-press-outlet">{article.outlet}</span><span className="media-press-title">{article.title}</span><span className="media-press-read">{article.category === 'LISTING' ? '공연 안내' : '기사 읽기'}<span className="media-sr"> (새 창)</span></span></a></li>)}</ol>
    </section>
    {selection && <FilmFocus selection={selection} onClose={() => select(null)}/>}
  </article>
}
