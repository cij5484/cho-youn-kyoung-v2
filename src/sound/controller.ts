import { alignSoundFrame } from './focus-frame.ts'
import { createBowChoreographyEngine } from './bow-engine.ts'
import { bindAudioFeatures } from '../audio/features.ts'
import type { BowPresetName } from './tuning-presets.ts'
import type { ContactActivity, ContactTrail, ContactViolet, SoundVisual } from './contact-motion.ts'
import { playableSource, type SoundSource } from './source.ts'

export type PlaybackPhase = 'idle' | 'loading' | 'playing' | 'buffering' | 'paused' | 'ended' | 'error' | 'unavailable'
export interface PlaybackState { phase: PlaybackPhase; seconds: number; duration: number; analysisAvailable: boolean }

// Route-scoped controller. Media events own playback state; the analyser never invents a clock.
export function createSoundController(root: HTMLElement, media: HTMLAudioElement, source: Pick<SoundSource, 'src' | 'status' | 'duration' | 'trackId' | 'sourceSha256' | 'features'>, update: (state: PlaybackState) => void) {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)')
  const panel = root.querySelector<HTMLElement>('.sound-surface')!
  const engine = createBowChoreographyEngine(root, [...root.querySelectorAll<HTMLElement>('.poster-lines .tension-line')], () => innerWidth < 640, bindAudioFeatures(source.features, source))
  let context: AudioContext | null = null, analyser: AnalyserNode | null = null, node: MediaElementAudioSourceNode | null = null
  let suspension: Promise<void> | null = null
  let alignment: AbortController | null = null
  let primer: { token: number; muted: boolean; position: number } | null = null
  const src=playableSource(source)
  let phase: PlaybackPhase = src ? 'idle' : 'unavailable', hasPlayed=false
  let desired = false, disposed = false, visible = false, intent = 0, frame = 0, previous = 0, lastDraw = 0
  let timeout = 0, analysisAvailable = typeof AudioContext !== 'undefined', frames = 0
  let lineUnsettled = false, contactFrames = 0
  const samples = new Float32Array(1024), removers: (() => void)[] = []
  function emit() {
    if (disposed) return
    root.dataset.audioState = phase
    update({ phase, seconds: primer ? 0 : media.currentTime, duration: Number.isFinite(media.duration) ? media.duration : source.duration, analysisAvailable })
  }
  function change(next: PlaybackPhase) { phase = next; if(next==='playing')hasPlayed=true; emit() }
  const eligible = () => visible && !document.hidden && root.dataset.soundReady === 'true'
  const visualStill = () => reduced.matches || root.dataset.soundStatic === 'true'
  const stopClock = () => { window.clearTimeout(timeout); timeout = 0 }
  function cancelFrame() { if (frame) cancelAnimationFrame(frame); frame=0; previous=0; lastDraw=0 }
  function request() { if (!frame && analyser && eligible() && !visualStill()) frame=requestAnimationFrame(paint) }
  function paint(now: number) {
    frame=0
    if (!eligible() || visualStill() || disposed) { engine.reset(); root.dataset.audioEnergy='0'; return }
    const dt=previous ? Math.min(50,now-previous) : 16.67; previous=now
    const playing=phase==='playing' && !media.paused && !media.seeking && context?.state==='running'
    // Keep the approved micro-friction at ~30Hz; interpolate smooth bow travel on every display frame.
    if (!lastDraw || now-lastDraw >= 30) {
      const analysisDt=lastDraw ? Math.min(80,now-lastDraw) : 33; lastDraw=now
      if (playing && analyser) analyser.getFloatTimeDomainData(samples)
      const signal=playing && analyser ? samples : null
      const result=engine.sample(signal,analysisDt,media.currentTime); lineUnsettled=result.unsettled
      root.dataset.audioEnergy=result.energy.toFixed(4); root.dataset.analysisFrames=String(++frames)
    }
    const contactUnsettled=engine.paint(playing,dt)
    if (contactUnsettled) root.dataset.contactFrames=String(++contactFrames)
    if (playing && analyser || lineUnsettled || contactUnsettled) request()
    else { previous=0; lastDraw=0 }
  }
  function pause(next: PlaybackPhase = 'paused') {
    const position=primer?.position ?? media.currentTime
    desired=false; intent++; alignment?.abort(); alignment=null; stopClock(); media.pause()
    if(primer){media.muted=primer.muted;primer=null}
    // Commit the native media position before suspending its Web Audio destination.
    // WebKit can otherwise roll its buffered playback clock back when the graph stops.
    if (next==='paused' && media.readyState>0 && !media.seeking) media.currentTime=position
    if (context && context.state !== 'closed' && !suspension) {
      const pending=context.suspend()
      suspension=pending
      void pending.then(()=>{if(suspension===pending)suspension=null},error=>{
        if(suspension===pending)suspension=null
        reportError(error)
      })
    }
    change(next); request()
  }
  function unavailableView() {
    if (eligible()) return
    if (desired || !media.paused) pause()
    cancelFrame(); engine.reset(); root.dataset.audioEnergy='0'
  }
  function contextState() {
    if (!context || disposed) return
    root.dataset.audioContext=context.state
    if (context.state==='running' && !primer && desired && !media.paused && !media.seeking && media.readyState>=3) { stopClock(); change('playing'); request() }
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
    const focus = !hasPlayed || media.ended || !!media.error
    const token=++intent; desired=true; change('loading')
    prepare()
    if (media.ended || media.error) {
      hasPlayed=false
      // A completed excerpt is already buffered. Only a failed source needs a fresh load.
      if (media.error) media.load()
      media.currentTime=0
    }
    timeout=window.setTimeout(()=>{ if(token===intent && desired && ['loading','buffering'].includes(phase)) pause('error') },12000)
    try {
      // Unlock BOTH native media and Web Audio in the original gesture. The inaudible
      // primer is rewound before unmuting; alignment consumes no audible excerpt.
      if (focus) {
        const abort = new AbortController(); alignment=abort
        const position=media.currentTime, prime={token,muted:media.muted,position}; primer=prime
        media.muted=true
        const landing=alignSoundFrame(root,abort.signal)
        void landing.then(aligned=>{if(!aligned&&!disposed&&token===intent)pause()})
        try {
          await Promise.all([context?.resume(),media.play()])
          if (disposed || token!==intent) return
          const aligned=await landing
          if (disposed || token!==intent) return
          if (!aligned) { pause(); return }
          // Keep the unlocked media running silently while aligning, then rewind it.
          // Pausing and immediately replaying this WebKit destination can stall its clock.
          media.currentTime=position
          if (media.seeking) await new Promise<void>(resolve=>{
            const finish=()=>{
              media.removeEventListener('seeked',finish)
              abort.signal.removeEventListener('abort',finish)
              resolve()
            }
            media.addEventListener('seeked',finish,{once:true})
            abort.signal.addEventListener('abort',finish,{once:true})
            if (abort.signal.aborted || !media.seeking) finish()
          })
        } finally { abort.abort(); if(primer===prime){primer=null;media.muted=prime.muted} if(alignment===abort)alignment=null }
      } else await Promise.all([context?.resume(),media.play()])
      if (disposed || token!==intent) return
      if (!eligible()) { pause(); return }
      if (!media.paused && (!context || context.state==='running')) { stopClock(); change('playing'); request() }
    } catch {
      if (!disposed && token===intent) pause('error')
    }
  }
  function listen(type: string, fn: () => void) { media.addEventListener(type,fn); removers.push(()=>media.removeEventListener(type,fn)) }
  listen('playing',()=>{
    if (primer) return
    if (!desired || !eligible()) { media.pause(); return }
    if (!media.paused && !media.seeking && (!context || context.state==='running')) { stopClock(); change('playing'); request() }
  })
  // Old queued events may arrive after another activation, especially in WebKit. Reconcile actual media state.
  listen('pause',()=>{ if (!primer && desired && media.paused && !media.ended) pause() })
  listen('waiting',()=>{ if(!primer && desired){change(hasPlayed?'buffering':'loading'); request(); stopClock(); timeout=window.setTimeout(()=>{if(desired && ['loading','buffering'].includes(phase))pause('error')},12000)} })
  listen('seeking',()=>{ if(!primer && desired)change('buffering');request() })
  listen('seeked',()=>{ if(primer)return; if(desired && !media.paused && media.readyState>=3){change('playing');request()}else emit() })
  listen('ended',()=>pause('ended'))
  listen('error',()=>pause('error'))
  listen('loadedmetadata',emit); listen('timeupdate',emit); listen('durationchange',emit)
  const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;unavailableView()}, {threshold:0})
  observer.observe(panel)
  const mutation=new MutationObserver(unavailableView); mutation.observe(root,{attributes:true,attributeFilter:['data-sound-ready']})
  const preference=()=>{cancelFrame();engine.reset();root.dataset.audioEnergy='0';if(!reduced.matches)request()}
  reduced.addEventListener('change',preference)
  document.addEventListener('visibilitychange',unavailableView)
  root.dataset.audioState=phase; root.dataset.audioContext='not-created'; root.dataset.audioEnergy='0'; root.dataset.analysisFrames='0'
  return {
    setVisual(visual: SoundVisual, trail: ContactTrail, activity: ContactActivity, violet: ContactViolet, preset: BowPresetName) { engine.configure(visual,trail,activity,violet,preset) },
    toggle() { if(desired || !media.paused)pause();else void play() },
    destroy() {
      disposed=true; desired=false; intent++; alignment?.abort(); alignment=null; stopClock(); cancelFrame(); observer.disconnect(); mutation.disconnect()
      reduced.removeEventListener('change',preference); document.removeEventListener('visibilitychange',unavailableView)
      removers.forEach(fn=>fn()); media.pause()
      if(primer){media.muted=primer.muted;primer=null}
      const release=()=>{node?.disconnect();analyser?.disconnect();media.removeAttribute('src');media.load()}
      if(context){
        const closingContext=context
        closingContext.removeEventListener('statechange',contextState)
        // A pending WebKit suspend still owns the destination. Let it settle before closing
        // or detaching the graph/media; racing these operations can leave it unclosed.
        const close=async()=>{
          try { await suspension }
          finally {
            try { if(closingContext.state!=='closed')await closingContext.close() }
            finally { release() }
          }
        }
        void close().catch(error=>reportError(error))
      } else release()
      engine.destroy()
    },
  }
}
