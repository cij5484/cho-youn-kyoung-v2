import { createLineResponse } from './line-response.ts'
import { playableSource, type SoundSource } from './source.ts'

export type PlaybackPhase = 'idle' | 'loading' | 'playing' | 'buffering' | 'paused' | 'ended' | 'error' | 'unavailable'
export interface PlaybackState { phase: PlaybackPhase; seconds: number; duration: number; analysisAvailable: boolean }

// Route-scoped controller. Media events own playback state; the analyser never invents a clock.
export function createSoundController(root: HTMLElement, media: HTMLAudioElement, source: Pick<SoundSource, 'src' | 'status' | 'duration'>, update: (state: PlaybackState) => void) {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)')
  const panel = root.querySelector<HTMLElement>('.sound-surface')!
  const lines = createLineResponse([...root.querySelectorAll<HTMLElement>('.poster-lines .tension-line')], () => innerWidth < 640)
  let context: AudioContext | null = null, analyser: AnalyserNode | null = null, node: MediaElementAudioSourceNode | null = null
  const src=playableSource(source)
  let phase: PlaybackPhase = src ? 'idle' : 'unavailable', hasPlayed=false
  let desired = false, disposed = false, visible = false, intent = 0, frame = 0, previous = 0, lastDraw = 0
  let timeout = 0, analysisAvailable = typeof AudioContext !== 'undefined', frames = 0
  const samples = new Float32Array(1024), removers: (() => void)[] = []
  function emit() {
    if (disposed) return
    root.dataset.audioState = phase
    update({ phase, seconds: media.currentTime, duration: Number.isFinite(media.duration) ? media.duration : source.duration, analysisAvailable })
  }
  function change(next: PlaybackPhase) { phase = next; if(next==='playing')hasPlayed=true; emit() }
  const eligible = () => visible && !document.hidden && root.dataset.soundReady === 'true'
  const visualStill = () => reduced.matches || root.dataset.soundStatic === 'true'
  const stopClock = () => { window.clearTimeout(timeout); timeout = 0 }
  function cancelFrame() { if (frame) cancelAnimationFrame(frame); frame=0; previous=0; lastDraw=0 }
  function request() { if (!frame && analyser && eligible() && !visualStill()) frame=requestAnimationFrame(paint) }
  function paint(now: number) {
    frame=0
    if (!eligible() || visualStill() || disposed) { lines.reset(); root.dataset.audioEnergy='0'; return }
    //30Hz visual analysis is enough for subpixel friction; audio rendering remains browser-native.
    if (lastDraw && now-lastDraw < 30) { request(); return }
    const dt=previous ? Math.min(80,now-previous) : 33; previous=now; lastDraw=now
    const playing=phase==='playing' && !media.paused && !media.seeking && context?.state==='running'
    if (playing && analyser) analyser.getFloatTimeDomainData(samples)
    const result=lines.paint(playing && analyser ? samples : null,dt,false)
    root.dataset.audioEnergy=result.energy.toFixed(4); root.dataset.analysisFrames=String(++frames)
    if (playing && analyser || result.unsettled) request()
  }
  function pause(next: PlaybackPhase = 'paused') {
    const position=media.currentTime
    desired=false; intent++; stopClock(); media.pause()
    // Commit the native media position before suspending its Web Audio destination.
    // WebKit can otherwise roll its buffered playback clock back when the graph stops.
    if (next==='paused' && media.readyState>0 && !media.seeking) media.currentTime=position
    if (context && context.state !== 'closed') void context.suspend().catch(()=>{})
    change(next); request()
  }
  function unavailableView() {
    if (eligible()) return
    if (desired || !media.paused) pause()
    cancelFrame(); lines.reset(); root.dataset.audioEnergy='0'
  }
  function contextState() {
    if (!context || disposed) return
    root.dataset.audioContext=context.state
    if (context.state==='running' && desired && !media.paused && !media.seeking && media.readyState>=3) { stopClock(); change('playing'); request() }
    else if (phase==='playing' && context.state!=='running') pause()
  }
  function prepare() {
    if (!media.getAttribute('src')) media.src=src!
    if (context || !analysisAvailable) return
    try {
      context=new AudioContext({latencyHint:'interactive'})
      node=context.createMediaElementSource(media)
      analyser=context.createAnalyser(); analyser.fftSize=1024
      node.connect(analyser); analyser.connect(context.destination)
      context.addEventListener('statechange',contextState)
      root.dataset.audioContext=context.state
    } catch {
      // If graph setup fails after rerouting, reconnect directly so a static visual still has real audio.
      if (node && context) { node.disconnect(); node.connect(context.destination) }
      analyser=null; analysisAvailable=false
    }
  }
  async function play() {
    // Keyboard focus/scroll can precede delivery of the IntersectionObserver callback.
    const bounds=panel.getBoundingClientRect(); visible=bounds.bottom>0 && bounds.top<innerHeight
    if (!src || !eligible() || disposed) return
    const token=++intent; desired=true; change('loading')
    prepare()
    if (media.ended || media.error) { hasPlayed=false; media.load(); media.currentTime=0 }
    timeout=window.setTimeout(()=>{ if(token===intent && desired && ['loading','buffering'].includes(phase)) pause('error') },12000)
    try {
      // Both calls happen inside the explicit activation, before awaiting either promise.
      await Promise.all([context?.resume(),media.play()])
      if (disposed || token!==intent) return
      if (!eligible()) { pause(); return }
      if (!media.paused && (!context || context.state==='running')) { stopClock(); change('playing'); request() }
    } catch {
      if (!disposed && token===intent) pause('error')
    }
  }
  function listen(type: string, fn: () => void) { media.addEventListener(type,fn); removers.push(()=>media.removeEventListener(type,fn)) }
  listen('playing',()=>{
    if (!desired || !eligible()) { media.pause(); return }
    if (!media.paused && !media.seeking && (!context || context.state==='running')) { stopClock(); change('playing'); request() }
  })
  // Old queued events may arrive after another activation, especially in WebKit. Reconcile actual media state.
  listen('pause',()=>{ if (desired && media.paused && !media.ended) pause() })
  listen('waiting',()=>{ if(desired){change(hasPlayed?'buffering':'loading'); request(); stopClock(); timeout=window.setTimeout(()=>{if(desired && ['loading','buffering'].includes(phase))pause('error')},12000)} })
  listen('seeking',()=>{ if(desired)change('buffering');request() })
  listen('seeked',()=>{ if(desired && !media.paused && media.readyState>=3){change('playing');request()}else emit() })
  listen('ended',()=>pause('ended'))
  listen('error',()=>pause('error'))
  listen('loadedmetadata',emit); listen('timeupdate',emit); listen('durationchange',emit)
  const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;unavailableView()}, {threshold:0})
  observer.observe(panel)
  const mutation=new MutationObserver(unavailableView); mutation.observe(root,{attributes:true,attributeFilter:['data-sound-ready']})
  const preference=()=>{cancelFrame();lines.reset();root.dataset.audioEnergy='0';if(!reduced.matches)request()}
  reduced.addEventListener('change',preference)
  document.addEventListener('visibilitychange',unavailableView)
  root.dataset.audioState=phase; root.dataset.audioContext='not-created'; root.dataset.audioEnergy='0'; root.dataset.analysisFrames='0'
  return {
    toggle() { if(desired || !media.paused)pause();else void play() },
    destroy() {
      disposed=true; desired=false; intent++; stopClock(); cancelFrame(); observer.disconnect(); mutation.disconnect()
      reduced.removeEventListener('change',preference); document.removeEventListener('visibilitychange',unavailableView)
      removers.forEach(fn=>fn()); media.pause(); media.removeAttribute('src'); media.load()
      node?.disconnect(); analyser?.disconnect()
      if(context){context.removeEventListener('statechange',contextState);void context.close().catch(()=>{})}
      lines.destroy()
    },
  }
}
