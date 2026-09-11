import { resolveAlbumAnalysis } from './analysis-catalog.ts'
import { useSyncExternalStore } from 'react'
import type { AlbumExhibit } from '../album-detail/album-data.ts'
import { createInstrumentResponse } from './instrument-response.ts'

type Playback = {
  album: AlbumExhibit | null; index: number; playing: boolean; active: boolean
  seconds: number; duration: number; volume: number; error: string
}
const initial: Playback = { album: null, index: 0, playing: false, active: false, seconds: 0, duration: 0, volume: 1, error: '' }
let state = initial, media: HTMLAudioElement | null = null
let audibleVolume = 1
let response: ReturnType<typeof createInstrumentResponse> | null = null, intent = 0
const listeners = new Set<() => void>()
const emit = (patch: Partial<Playback>) => { state = { ...state, ...patch }; listeners.forEach(listener => listener()) }
const subscribe = (listener: () => void) => { listeners.add(listener); return () => { listeners.delete(listener) } }
const snapshot = () => state

/** One media element belongs to the local application shell, never a pathname. */
function mount() {
  const sound = new Audio(); media = sound; sound.preload = 'none'; sound.crossOrigin = 'anonymous'
  response = createInstrumentResponse(sound)
  const update = () => emit({ seconds: sound.currentTime, duration: Number.isFinite(sound.duration) ? sound.duration : 0 })
  const playing = () => { if (!sound.paused && state.album) emit({ playing: true, active: true, error: '' }) }
  const paused = () => { if (sound.paused) emit({ playing: false }) }
  const ended = () => { void response?.setTrack(null); emit({ playing: false, active: false }) }
  const failed = () => { if (state.album && sound.error) { void response?.setTrack(null); emit({ playing: false, active: false, error: '음원을 불러오지 못했습니다. 다시 재생해주세요.' }) } }
  const volume = () => {
    if (!sound.muted && sound.volume > 0) audibleVolume = sound.volume
    emit({ volume: sound.muted ? 0 : sound.volume })
  }
  // A deliberate HOME preview activation pauses this record; never mix two recordings.
  const exclusive = (event: Event) => {
    if (!(event.target instanceof HTMLMediaElement)) return
    if (event.target === sound) document.querySelectorAll('audio').forEach(other => { if (other !== sound) other.pause() })
    else if (!sound.paused) { intent++; sound.pause() }
  }
  sound.addEventListener('playing', playing); sound.addEventListener('pause', paused); sound.addEventListener('ended', ended)
  sound.addEventListener('error', failed); sound.addEventListener('timeupdate', update); sound.addEventListener('loadedmetadata', update)
  sound.addEventListener('volumechange', volume); document.addEventListener('play', exclusive, true)
  // Attach so capture listeners and browser media controls see the permanent element.
  sound.hidden = true; sound.dataset.globalAlbumAudio = ''; document.body.append(sound)
  return () => {
    intent++; sound.pause(); sound.removeAttribute('src'); sound.load(); sound.remove()
    sound.removeEventListener('playing', playing); sound.removeEventListener('pause', paused); sound.removeEventListener('ended', ended)
    sound.removeEventListener('error', failed); sound.removeEventListener('timeupdate', update); sound.removeEventListener('loadedmetadata', update)
    sound.removeEventListener('volumechange', volume); document.removeEventListener('play', exclusive, true)
    response?.destroy(); response = null; media = null; state = initial
  }
}
async function play(album: AlbumExhibit, index: number) {
  const sound = media, source = album.tracks[index]?.audioUrl
  if (!sound || !source) return
  if (state.album?.slug === album.slug && state.index === index && !sound.paused) { intent++; sound.pause(); return }
  const token = ++intent
  if (state.album?.slug !== album.slug || state.index !== index) {
    sound.pause(); sound.dataset.sourceUrl = source
    void response?.setTrack(resolveAlbumAnalysis(album.slug, index, source))
    // Restricted same-origin dev proxy: the public R2 origin has no CORS analysis permission.
    const url = new URL(source)
    sound.src = import.meta.env.MODE === 'development-preview'
      ? `${import.meta.env.BASE_URL}audio${url.pathname}` : `/__album_audio__${url.pathname}`
    emit({ album, index, seconds: 0, duration: 0, playing: false, error: '' })
  } else if (sound.ended) { sound.currentTime = 0; void response?.setTrack(resolveAlbumAnalysis(album.slug, index, source)) }
  else if (sound.error) { void response?.setTrack(resolveAlbumAnalysis(album.slug, index, source)); sound.load() }
  try {
    // Unlock both in the original gesture. Analysis failure must not cancel native playback.
    await Promise.all([response?.activate(), sound.play()])
  } catch {
    if (token === intent && media === sound) { void response?.setTrack(null); emit({ playing: false, active: false, error: '재생하지 못했습니다. 다시 재생해주세요.' }) }
  }
}
export const globalPlayback = {
  mount, subscribe, snapshot, play,
  toggle() { if (state.album) void play(state.album, state.index) },
  next() { if (state.album) void play(state.album, (state.index + 1) % state.album.tracks.length) },
  previous() { if (state.album) void play(state.album, (state.index - 1 + state.album.tracks.length) % state.album.tracks.length) },
  seek(value: number) { if (media && state.duration) { media.currentTime = Math.max(0, Math.min(value, state.duration)); response?.reset(); emit({ seconds: media.currentTime }) } },
  volume(value: number) { if (media) { media.muted = false; media.volume = Math.max(0, Math.min(1, value)); emit({ volume: media.volume }) } },
  toggleMute() {
    if (!media) return
    if (media.muted || media.volume === 0) { media.volume = audibleVolume; media.muted = false }
    else { audibleVolume = media.volume; media.muted = true }
  },
  close() { intent++; media?.pause(); if (media) { media.removeAttribute('src'); delete media.dataset.sourceUrl; media.load() }; void response?.setTrack(null); emit({ ...initial, volume: state.volume }) },
  sample(dt: number) { return response?.sample(dt) ?? { haegeum: 0, janggu: 0, texture: 0, pitchMidi: null, pitchConfidence: 0 } },
}
export const useGlobalPlayback = () => useSyncExternalStore(subscribe, snapshot, () => initial)
