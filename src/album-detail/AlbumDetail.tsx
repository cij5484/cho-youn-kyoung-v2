import { appHref } from './album-navigation.ts'
import { lazy, Suspense, useEffect, useRef, useState, type PointerEvent } from 'react'
import { albums, type AlbumExhibit } from './album-data.ts'
import { globalPlayback, useGlobalPlayback } from '../audio/global-playback.ts'
import { AlbumSignaturePair } from './AlbumSignaturePair.tsx'
import './album-detail.css'
const TraySurface = lazy(() => import('./TraySurface.tsx'))

const two = (n: number) => String(n).padStart(2, '0')
const clock = (n: number) => `${Math.floor(n / 60)}:${two(Math.floor(n % 60))}`
const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches

export default function AlbumDetail({ slug }: { slug: string }) {
  const album = albums.find(item => item.slug === slug)
  return album ? <Exhibition album={album}/> : <section className="lab-destination page-frame"><h1>앨범을 찾을 수 없습니다.</h1><a href={appHref('/works/')}>WORKS로 돌아가기 ↗</a></section>
}

function Exhibition({ album }: { album: AlbumExhibit }) {
  const root = useRef<HTMLElement>(null), reader = useRef<HTMLDialogElement>(null)
  const [open, setOpen] = useState(false), [back, setBack] = useState(false), [page, setPage] = useState(0)
  const [zoom, setZoom] = useState(false)
  const playback = useGlobalPlayback()
  const track = playback.album?.slug === album.slug ? playback.index : null
  const playing = track !== null && playback.playing, error = track !== null ? playback.error : ''
  const pointer = useRef<{ x: number; y: number } | null>(null)
  const sourceReady = album.tracks.some(item => item.audioUrl)
  const sanjo = album.title.includes('산조')
  const pages = album.booklet.length ? album.booklet : [album.front, ...(album.back ? [album.back] : [])]
  const others = albums.filter(item => item.slug !== album.slug)
  const total = album.tracks.reduce((sum, item) => { const [m, s] = item.printedDuration.split(':').map(Number); return sum + (m * 60 + s || 0) }, 0)

  useEffect(() => {
    const owner = root.current!, sections = [...owner.querySelectorAll<HTMLElement>('[data-exhibit-scene]')]
    const media = matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0
    const update = () => {
      frame = 0
      const boxes = sections.map(section => section.getBoundingClientRect())
      sections.forEach((section, i) => {
        const p = media.matches ? 1 : Math.max(0, Math.min(1, (innerHeight - boxes[i].top) / (innerHeight + boxes[i].height)))
        section.style.setProperty('--scene-progress', String(p))
      })
      const hero = boxes[0]
      owner.style.setProperty('--album-travel', String(media.matches ? 0 : Math.max(0, Math.min(1, -hero.top / (hero.height - innerHeight)))))
    }
    const request = () => { if (!frame && !document.hidden) frame = requestAnimationFrame(update) }
    const resize = new ResizeObserver(request); resize.observe(owner)
    window.addEventListener('scroll', request, { passive: true }); window.addEventListener('resize', request)
    media.addEventListener('change', request); document.addEventListener('visibilitychange', request)
    update()
    return () => {
      cancelAnimationFrame(frame); resize.disconnect(); window.removeEventListener('scroll', request); window.removeEventListener('resize', request)
      media.removeEventListener('change', request); document.removeEventListener('visibilitychange', request)
    }
  }, [])

  function play(index: number) { return globalPlayback.play(album, index) }
  function scrollToScene(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: reduced() ? 'instant' : 'smooth' })
  }
  function showPage(index: number) { setPage(index); reader.current?.showModal() }
  function tiltPaper(event: PointerEvent<HTMLButtonElement>) {
    if (event.pointerType !== 'mouse' || reduced()) return
    const box = event.currentTarget.getBoundingClientRect()
    const x = Math.max(-1, Math.min(1, (event.clientX - box.left) / box.width * 2 - 1))
    const y = Math.max(-1, Math.min(1, (event.clientY - box.top) / box.height * 2 - 1))
    event.currentTarget.style.setProperty('--paper-turn', `${x * 12}deg`)
    event.currentTarget.style.setProperty('--paper-lean', `${-y * 9}deg`)
    event.currentTarget.style.setProperty('--paper-x', `${x * 12}px`)
    event.currentTarget.style.setProperty('--paper-y', `${y * 9}px`)
    event.currentTarget.style.setProperty('--paper-light', `${(x + 1) * 50}%`)
  }
  function restPaper(event: PointerEvent<HTMLButtonElement>) {
    for (const key of ['turn', 'lean', 'x', 'y', 'light']) event.currentTarget.style.removeProperty(`--paper-${key}`)
  }

  return <article ref={root} data-detail-route={`/album/${album.slug}`} className="album-exhibition" data-mood={album.mood} data-open={open} data-playing={playing} lang="ko">
    <nav className="album-chapters" aria-label="앨범 장면">
      <a href="#album-opening">01 <span>OBJECT</span></a><a href="#album-story">02 <span>STORY</span></a>
      <a href="#album-listen">03 <span>LISTEN</span></a><a href="#album-credits">04 <span>PEOPLE</span></a>
    </nav>

    <section className="album-opening" id="album-opening" data-exhibit-scene="opening" aria-labelledby="album-title">
      <div className="album-opening-stage">
        <div className="album-air" aria-hidden="true"/>
        <div className="album-opening-composition">
        <div className="album-opening-top"><a href={appHref('/works/')} data-album-return>↖ WORKS</a><span>RECORDING / {album.year}</span></div>
        <div className="album-display-word" aria-hidden="true">{sanjo ? 'Sanjo' : 'Resonance'}<i>.</i></div>
        <div className="album-hero-copy">
          <p className="album-eyebrow">CHO YOUN KYOUNG — {sanjo ? 'HAEGEUM SANJO' : 'HAEGEUM JEONGAK'}</p>
          <h1 id="album-title"><span>조윤경 {sanjo ? '해금산조' : '해금정악'}</span>{album.subtitle}</h1>
          <p className="album-edition">{album.year}<span>{two(album.tracks.length)} TRACKS</span>{total > 0 && <span>{clock(total)}</span>}</p>
        </div>

        <div className="exhibit-object-field" data-album-anchor="cover">
          <div className="exhibit-object-light" aria-hidden="true"/>
          <div className="exhibit-package-camera">
            <div className="exhibit-package" data-back={back} role="group" aria-label={`${album.title} 패키지`} tabIndex={0}
              onKeyDown={event => { if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') { event.preventDefault(); if (album.back && !open) setBack(!back) } }}
              onPointerDown={event => { if (event.button === 0) pointer.current = { x: event.clientX, y: event.clientY } }}
              onPointerMove={event => {
                if (reduced()) return
                if (event.pointerType !== 'mouse' && !pointer.current) return
                const rect = event.currentTarget.getBoundingClientRect()
                if (pointer.current && event.pointerType !== 'mouse' && Math.abs(event.clientY - pointer.current.y) > Math.abs(event.clientX - pointer.current.x)) return
                const dx = Math.max(-1, Math.min(1, (event.clientX - rect.left) / rect.width * 2 - 1))
                const dy = Math.max(-1, Math.min(1, (event.clientY - rect.top) / rect.height * 2 - 1))
                event.currentTarget.style.setProperty('--touch-y', `${dx * 9}deg`)
                event.currentTarget.style.setProperty('--touch-x', `${-dy * 5}deg`)
              }}
              onPointerUp={() => { pointer.current = null }} onPointerCancel={() => { pointer.current = null }}
              onPointerLeave={event => { pointer.current = null; event.currentTarget.style.setProperty('--touch-x', '0deg'); event.currentTarget.style.setProperty('--touch-y', '0deg') }}>
              <div className="exhibit-package-base" inert={!open} aria-hidden={!open}>
                <div className="exhibit-package-inside">{album.trayInside && <img src={album.trayInside} alt="CD 아래 인쇄면"/>}</div>
                {open && album.trayInside && <Suspense fallback={null}><TraySurface artwork={album.trayInside}/></Suspense>}
                <button className="exhibit-package-disc" aria-label="트랙 목록으로 이동" tabIndex={open ? 0 : -1} onClick={() => scrollToScene('album-listen')}>
                  {album.disc && <img src={album.disc} alt="디스크 인쇄면"/>}
                </button>
              </div>
              <div className="exhibit-package-cover">
                <img data-album-cover src={album.front} alt={`${album.title} 음반 표지`} draggable="false" fetchPriority="high"/>
                <div className="exhibit-cover-inner">{album.inside && <img src={album.inside} alt=""/>}</div>
              </div>
              {album.back && <img className="exhibit-package-back" src={album.back} alt="음반 뒷면 인쇄물"/>}
            </div>
          </div>
          <div className="exhibit-object-handling">
            {album.back && !open && <button onClick={() => setBack(!back)} aria-label={back ? '표지 앞면 보기' : '표지 뒷면 보기'}>{back ? 'FRONT' : 'REVERSE'} ↻</button>}
            {open && <><button onClick={() => showPage(0)}>BOOKLET ↗</button><button onClick={() => scrollToScene('album-listen')}>TRACKS ↘</button></>}
          </div>
        </div>
        <div className="album-opening-bottom"><button className="album-open-action" onClick={() => { setBack(false); setOpen(!open) }} aria-expanded={open}>
          <span>{open ? 'CLOSE' : 'OPEN'} <i>ALBUM</i></span><span aria-hidden="true">{open ? '−' : '+'}</span>
        </button><p>한 장의 종이에서,<br/>한 줄의 소리로.</p><a href="#album-story" aria-label="앨범 이야기로 이동">SCROLL TO EXPLORE <span>↓</span></a></div>
        </div>
      </div>
    </section>

    <section className="album-story" id="album-story" data-exhibit-scene="story" data-album-anchor="story" aria-labelledby="album-story-title">
      <p className="album-eyebrow">02 / BETWEEN TWO STRINGS</p>
      <div className="album-story-grid"><h2 id="album-story-title">{sanjo ? <>느리게 쌓여,<br/><em>자유로워지는.</em></> : <>깊게 머물고,<br/><em>넓게 울리는.</em></>}</h2>
        <div className="album-story-note"><span className="album-twin-lines" aria-hidden="true"/><p>{album.summary}</p><p>해금의 선율과 장단 사이.<br/>표지를 열고, 소리를 따라<br/>한 장씩 들어갑니다.</p><span className="album-small-sign">{album.subtitle} · {album.year}</span></div>
      </div>
      <div className="album-paper-landscape">
        <span className="album-paper-caption">THE PRINTED RECORD <span>↘</span></span>
        <button className="album-paper-page album-paper-page-back" onPointerMove={tiltPaper} onPointerLeave={restPaper} onPointerCancel={restPaper} onClick={() => showPage(Math.min(1, pages.length - 1))} aria-label="앨범 인쇄물 크게 보기"><img src={pages[Math.min(1, pages.length - 1)]} alt="앨범 인쇄물" loading="lazy"/></button>
        <button className="album-paper-page album-paper-page-front" onPointerMove={tiltPaper} onPointerLeave={restPaper} onPointerCancel={restPaper} onClick={() => showPage(Math.min(3, pages.length - 1))} aria-label="앨범 노트 크게 보기"><img src={pages[Math.min(3, pages.length - 1)]} alt={album.booklet.length ? '북릿 앨범 노트' : '앨범 표지 인쇄물'} loading="lazy"/></button>
        <div className="album-paper-foot"><span>{album.booklet.length ? `BOOKLET / ${two(pages.length)} PAGES` : 'COVER / ARTWORK'}</span><button onClick={() => showPage(0)}>한 장씩 읽기 ↗</button></div>
      </div>
    </section>

    <section className="album-listen" id="album-listen" data-exhibit-scene="listen" aria-labelledby="album-listen-title">
      <div className="album-listen-heading"><p className="album-eyebrow">03 / THE SOUND INSIDE</p><h2 id="album-listen-title">Listen<span>.</span></h2><p>{sanjo ? '장단을 따라, 여섯 번의 숨.' : '이어지는 선율, 깊어지는 울림.'}</p></div>
      <div className="album-listen-grid">
        <div className="album-disc-scene" data-album-anchor="disc">
          <span className="album-disc-orbit" aria-hidden="true"/>
          <button className="album-listening-disc" onClick={() => sourceReady ? void play(track ?? 0) : scrollToScene('album-tracklist')} aria-label={playing ? '일시정지' : sourceReady ? '앨범 듣기' : '수록곡 보기'}>
            {album.disc && <img src={album.disc} alt={`${album.subtitle} CD 라벨`}/>}
          </button>
          <p><span>{playing ? 'NOW PLAYING' : 'THE RECORD'}</span><strong>{track === null ? album.subtitle : album.tracks[track].title}</strong></p>
        </div>
        <div className="album-tracklist" id="album-tracklist"><p className="album-track-meta"><span>{two(album.tracks.length)} TRACKS</span><span>{total > 0 ? `${clock(total)} / PRINTED RUNNING TIME` : 'TRACK INDEX'}</span></p>
          <ol>{album.tracks.map((item, index) => <li key={item.title} data-active={track === index}>
            <button onClick={() => void play(index)} disabled={!item.audioUrl} aria-label={`${two(index + 1)} ${item.title} ${track === index && playing ? '일시정지' : '재생'}`}>
              <span className="album-track-number">{two(index + 1)}</span><span className="album-track-name">{item.title}</span><span className="album-track-duration">{item.printedDuration}</span><span className="album-track-play" aria-hidden="true">{track === index && playing ? 'Ⅱ' : sourceReady ? '↗' : '—'}</span>
            </button>
          </li>)}</ol>
          {!sourceReady && <p className="album-listen-note">수록곡 안내 · 음원은 준비 중입니다.</p>}
          <p className="album-audio-error" role="status">{error}</p>
        </div>
      </div>
    </section>

    <section className="album-credits" id="album-credits" data-exhibit-scene="credits" aria-labelledby="album-credits-title">
      <p className="album-eyebrow">04 / MADE TOGETHER</p><div className="album-credits-grid"><h2 id="album-credits-title">함께 만든<br/><em>울림.</em></h2><dl>{album.credits.map(item => <div key={item.role}><dt>{item.role}</dt><dd>{item.name}</dd></div>)}</dl></div>
    </section>

    <section className="album-related" data-exhibit-scene="related" data-album-anchor="related" aria-labelledby="album-related-title">
      <div className="album-related-heading"><p className="album-eyebrow">THE EXHIBITION CONTINUES</p><h2 id="album-related-title">Another resonance<span>.</span></h2></div>
      <div className="album-related-grid">{others.map((item, index) => <a href={appHref(`/album/${item.slug}/`)} data-album-link key={item.slug}><span>{two(index + 1)} / {item.year}</span><div><img src={item.front} alt={item.title} loading="lazy"/></div><h3>{item.subtitle}<span>↗</span></h3></a>)}</div>
      <a className="album-return" href={appHref('/works/')} data-album-return><img src={album.front} alt=""/><span>BACK TO <em>WORKS</em></span><span aria-hidden="true">↗</span></a>
      <p className="album-colophon">CHO YOUN KYOUNG<span>{album.subtitle} — END OF RECORD</span></p>
    </section>

    <dialog className="album-reader" ref={reader} aria-labelledby="album-reader-title" data-zoom={zoom} onClick={event => { if (event.target === event.currentTarget) reader.current?.close() }}>
      <header><h2 id="album-reader-title">{album.subtitle} / {album.booklet.length ? 'BOOKLET' : 'ARTWORK'}</h2><button onClick={() => setZoom(!zoom)} aria-label={zoom ? '북릿 화면에 맞추기' : '북릿 확대'}>{zoom ? 'FIT' : 'ZOOM +'}</button><button onClick={() => reader.current?.close()} aria-label="북릿 닫기">CLOSE ×</button></header>
      <div className="album-reader-sheet"><img src={pages[page]} alt={`${album.subtitle} 인쇄물 ${page + 1}쪽`}/></div>
      <footer><button disabled={page === 0} onClick={() => setPage(page - 1)} aria-label="이전 쪽">←</button><span aria-live="polite">{two(page + 1)} / {two(pages.length)}</span><button disabled={page === pages.length - 1} onClick={() => setPage(page + 1)} aria-label="다음 쪽">→</button></footer>
    </dialog>
    <AlbumSignaturePair scope={root}/>
  </article>
}
