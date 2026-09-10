import { appRoute } from '../album-detail/album-navigation.ts'
import { useEffect, useEffectEvent, useRef, useState, type CSSProperties } from 'react'
import { createPortal } from 'react-dom'
import { Link, useNavigate } from 'react-router'
import { globalPlayback, useGlobalPlayback } from './global-playback.ts'
import { AudioSignature } from './AudioSignature.tsx'
import './global-player.css'

const two = (n: number) => String(n).padStart(2, '0')
const clock = (n: number) => `${Math.floor(n / 60)}:${two(Math.floor(n % 60))}`

export function GlobalAudioPlayer() {
  const { album, index: track, playing, seconds: time, duration, volume, error } = useGlobalPlayback()
  const [volumeOpen, setVolumeOpen] = useState(false)
  const volumeControl = useRef<HTMLDivElement>(null)
  const navigate = useNavigate(), go = useEffectEvent((href: string) => navigate(href))
  useEffect(() => globalPlayback.mount(), [])
  useEffect(() => {
    // Existing cover handoffs and Router links preventDefault first; preserve them.
    const click = (event: MouseEvent) => {
      if (!globalPlayback.snapshot().album || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return
      const link = (event.target as Element).closest<HTMLAnchorElement>('a[href]')
      if (!link || link.hasAttribute('download') || link.target && link.target !== '_self') return
      const url = new URL(link.href)
      if (url.origin !== location.origin || url.pathname === location.pathname) return
      const route = appRoute(url.href)
      if (!route) return
      event.preventDefault(); go(route)
    }
    document.addEventListener('click', click)
    return () => document.removeEventListener('click', click)
  }, [])
  useEffect(() => {
    if (!volumeOpen) return
    const dismiss = (event: globalThis.PointerEvent) => { if (!volumeControl.current?.contains(event.target as Node)) setVolumeOpen(false) }
    document.addEventListener('pointerdown', dismiss)
    return () => document.removeEventListener('pointerdown', dismiss)
  }, [volumeOpen])
  return <><AudioSignature/>{createPortal(<>
    {album && <aside className="album-mini-player" data-playing={playing} aria-label="앨범 플레이어">
      <button onClick={() => globalPlayback.toggle()} aria-label={playing ? '일시정지' : '재생'}>{playing ? 'Ⅱ' : '▶'}</button>
      <Link to={`/album/${album.slug}/`} className="album-mini-title" aria-label={`${album.subtitle} 앨범 보기`}><span>{album.subtitle}</span><strong>{two(track + 1)} {album.tracks[track].title}</strong></Link>
      <div className="album-mini-seek">
      <div ref={volumeControl} className="album-volume" onPointerEnter={event => { if (event.pointerType === 'mouse') setVolumeOpen(true) }}
        onPointerLeave={event => { if (event.pointerType === 'mouse' && !event.buttons) setVolumeOpen(false) }}
        onFocus={event => { if (!event.currentTarget.contains(event.relatedTarget)) setVolumeOpen(true) }}
        onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setVolumeOpen(false) }}
        onKeyDown={event => { if (event.key === 'Escape') { event.stopPropagation(); setVolumeOpen(false); volumeControl.current?.querySelector('button')?.focus() } }}>
        <button aria-label={volume === 0 ? '음소거 해제' : `음소거, 현재 음량 ${Math.round(volume * 100)}%`} aria-expanded={volumeOpen} aria-controls="album-volume-panel" onClick={() => { globalPlayback.toggleMute(); setVolumeOpen(true) }}>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M11 5 6 9H3v6h3l5 4Z"/>
            {volume === 0 ? <path d="m16 9 5 6m0-6-5 6"/> : <><path d="M15 8a6 6 0 0 1 0 8"/>{volume > .5 && <path d="M18 5a10 10 0 0 1 0 14"/>}</>}
          </svg>
        </button>
        {volumeOpen && <div id="album-volume-panel" className="album-volume-panel" style={{ '--volume-fill': `${volume * 100}%` } as CSSProperties}>
          <input type="range" min="0" max="1" step=".01" value={volume} aria-label="음량" aria-orientation="vertical" aria-valuetext={`${Math.round(volume * 100)}%`}
            onChange={event => globalPlayback.volume(Number(event.target.value))}/>
        </div>}
      </div>
      <input type="range" min="0" max={duration || 1} step=".1" value={Math.min(time, duration || 1)} disabled={!duration} data-global-audio-progress aria-label="재생 위치" aria-valuetext={clock(time)}
        style={{ '--seek-fill': `${duration > 0 ? Math.min(100, time / duration * 100) : 0}%` } as CSSProperties}
        onChange={event => globalPlayback.seek(Number(event.target.value))}/>
      </div>
      <span className="album-mini-time">{clock(time)} / {clock(duration)}</span><button onClick={() => globalPlayback.next()} aria-label="다음 트랙">→</button>
      <button onClick={() => { globalPlayback.close(); setVolumeOpen(false) }} aria-label="플레이어 닫기">×</button>
      {error && <p className="global-audio-error" role="status">{error}</p>}
    </aside>}
  </>, document.body)}</>
}
