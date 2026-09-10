import { bindAudioFeatures, sampleAudioFeatures } from './features.ts'
import { homeSoundSource } from '../sound/source.ts'
import { tuningPresets } from '../sound/tuning-presets.ts'
import { hitDisplacement } from '../interaction-prototype/model.ts'
import { interactionTuning } from '../interaction-prototype/tuning.ts'
import percussion from '../interaction-prototype/percussion.json'

const original = 'https://pub-dd5041e867ea448a9d025ebe26192631.r2.dev/hanbeomsu/04_long-sanjo_jungjungmori.mp3'
const clamp = (value: number) => Math.max(0, Math.min(1, value))
const ease = (value: number, target: number, dt: number, seconds: number) => value + (target - value) * (1 - Math.exp(-dt / seconds))
const knownFeatures = percussion.trackId === homeSoundSource.trackId && percussion.sourceSha256 === homeSoundSource.sourceSha256 &&
  Math.abs(percussion.duration - homeSoundSource.duration) < .1 ? bindAudioFeatures(homeSoundSource.features, homeSoundSource) : null

/** One analyser for the permanent media element. No clock/RAF or playback ownership here.
 * Mixed spectra estimate sustained bow and percussive attacks; they do NOT isolate instruments.
 * The authored HOME excerpt is also a mixed-source estimate, only valid at its original timecode. */
export function createInstrumentResponse(media: HTMLAudioElement) {
  let context: AudioContext | null = null, source: MediaElementAudioSourceNode | null = null, analyser: AnalyserNode | null = null
  let disposed = false, attempted = false, lastSource = '', lastTime = -1, elapsed = 0
  let haegeum = 0, janggu = 0, texture = 0, liveBow = 0, liveTexture = 0
  let bassScale = .003, bodyScale = .003, highScale = .006, hitAge = 10, hitStrength = 0
  let bassMemory = 0, bodyMemory = 0, primed = false
  const frequencies = new Float32Array(1024), prior = new Float32Array(1024)

  function reset() {
    prior.fill(0); elapsed = 0; primed = false; lastTime = -1
    bassScale = .003; bodyScale = .003; highScale = .006; bassMemory = 0; bodyMemory = 0
    hitAge = 10; hitStrength = 0; liveBow = 0; liveTexture = 0
    // Preserve the outgoing visual envelope on seek/source changes; it eases into the new signal.
  }

  function featureTime() {
    if (!knownFeatures) return -1
    const identity = media.dataset.sourceUrl || media.currentSrc || media.src
    if (identity === original && Math.abs(media.duration - 278.756) < .5) return media.currentTime - 166
    if (homeSoundSource.src && identity === new URL(homeSoundSource.src, document.baseURI).href && Math.abs(media.duration - 18) < .1) return media.currentTime
    return -1
  }

  function analyse(dt: number) {
    if (!analyser || !context) return
    analyser.getFloatFrequencyData(frequencies)
    let low = 0, body = 0, middle = 0, high = 0, lowFlux = 0, bodyFlux = 0, highFlux = 0
    let middlePower = 0, middleLog = 0, middleCount = 0, bowSum = 0, bowFlux = 0, highLog = 0, highCount = 0, thudLog = 0, thudCount = 0
    // Same bass/body/attack bands as scripts/audio/percussion-features.mjs. High-only bow noise cannot trigger a strike.
    for (let k = 1; k < frequencies.length; k++) {
      const hz = k * context.sampleRate / analyser.fftSize, magnitude = 10 ** (frequencies[k] / 20)
      const flux = Math.max(0, magnitude - prior[k]); prior[k] = magnitude
      if (hz >= 60 && hz < 240) { low += magnitude; lowFlux += flux }
      else if (hz >= 240 && hz < 2000) {
        middle += magnitude
        if (hz < 700) { body += magnitude; bodyFlux += flux }
      } else if (hz >= 2000 && hz < 7000) { high += magnitude; highFlux += flux; highLog += Math.log(magnitude + 1e-10); highCount++ }
      if (hz >= 60 && hz < 700) { thudLog += Math.log(magnitude + 1e-10); thudCount++ }
      if (hz >= 500 && hz < 4000) { middlePower += magnitude * magnitude; middleLog += Math.log(magnitude + 1e-10); middleCount++; bowSum += magnitude; bowFlux += flux }
    }
    const flatness = Math.exp(highLog / Math.max(1, highCount)) / (high / Math.max(1, highCount) + 1e-10)
    const harmonic = clamp(1 - Math.exp(middleLog / Math.max(1, middleCount)) / (Math.sqrt(middlePower / Math.max(1, middleCount)) + 1e-10))
    // Slow local scales replace the offline detector's whole-track percentile, not its instrument claim.
    bassScale = Math.max(.003, ease(bassScale, lowFlux, dt, lowFlux > bassScale ? .08 : 2))
    bodyScale = Math.max(.003, ease(bodyScale, bodyFlux, dt, bodyFlux > bodyScale ? .08 : 2))
    highScale = Math.max(.006, ease(highScale, highFlux, dt, highFlux > highScale ? .08 : 2))
    bassMemory = Math.max(lowFlux / bassScale, bassMemory * Math.exp(-dt / .055))
    bodyMemory = Math.max(bodyFlux / bodyScale, bodyMemory * Math.exp(-dt / .055))
    const attack = highFlux / highScale, total = low + middle + high + 1e-9
    const sharp = low + high > .008 && attack > .45 && flatness > .16 && bassMemory > .18 && bodyMemory > .2 &&
      (low + body) / total > .07 && low / total > .008
      ? clamp((Math.min(bassMemory, 1.5) * .25 + Math.min(bodyMemory, 1.5) * .2 + Math.min(attack, 1.8) * .55) * Math.min(1, flatness / .3)) : 0
    // A dull drum attack need not have a bright/noisy treble edge. Require a simultaneous, broad bass/body rise;
    // sustained harmonics and their small vibrato changes must not become repeated percussion triggers.
    const thudFlatness = Math.exp(thudLog / Math.max(1, thudCount)) / ((low + body) / Math.max(1, thudCount) + 1e-10)
    const thud = low + body > .012 && (low + body) / total > .25 && low / total > .045 && thudFlatness > .28 &&
      lowFlux / (low + 1e-9) > .24 && bodyFlux / (body + 1e-9) > .18
      ? clamp((Math.min(bassMemory, 1.6) * .6 + Math.min(bodyMemory, 1.6) * .4) * Math.min(1, thudFlatness / .5)) : 0
    const strike = primed ? Math.max(sharp, thud) : 0
    if (strike > .55 && hitAge > .18) { hitAge = 0; hitStrength = strike }
    // Soft compression lifts quiet bow phrases without pinning louder ones at 1 (the old fixed gain clipped).
    const bowEnergy = Math.sqrt(middlePower)
    liveBow = Math.sqrt(bowEnergy / (bowEnergy + .055)) * (.2 + .8 * harmonic) * (1 - .4 * strike)
    // Follow movement of the bow harmonics themselves: vibrato/articulation remains visible even without bright treble noise.
    liveTexture = clamp(4 * bowFlux / (bowSum + .005)) * harmonic * (1 - .5 * strike)
    primed = true
  }

  return {
    async activate() {
      if (disposed || typeof AudioContext === 'undefined') return
      if (!attempted) {
        attempted = true
        try {
          context = new AudioContext({ latencyHint: 'interactive' })
          source = context.createMediaElementSource(media)
          // Direct destination connection first: analysis setup failure never silences a valid media source.
          source.connect(context.destination)
          analyser = context.createAnalyser(); analyser.fftSize = 2048; analyser.smoothingTimeConstant = .12
          source.connect(analyser)
        } catch {
          analyser?.disconnect(); analyser = null
          if (!source && context) { void context.close().catch(() => {}); context = null }
        }
      }
      // Must be invoked in the same user gesture as media.play(). CORS permission belongs to the media URL.
      try { if (context?.state === 'suspended') await context.resume() } catch { /* Keep native playback available without analysis. */ }
    },
    sample(dtSeconds: number) {
      const dt = Number.isFinite(dtSeconds) ? Math.max(0, Math.min(.08, dtSeconds)) : 0
      const identity = media.dataset.sourceUrl || media.currentSrc || media.src
      const jumped = lastTime >= 0 && (media.currentTime < lastTime - .05 || media.currentTime - lastTime > .25)
      if (identity !== lastSource || jumped || media.seeking) { reset(); lastSource = identity }
      const previousTime = lastTime; lastTime = media.currentTime
      const playing = !media.paused && !media.ended && !media.seeking && media.readyState >= 3
      const live = playing && context?.state === 'running' && !!analyser
      hitAge += dt; elapsed += dt
      if (live && elapsed >= 1 / 30) { analyse(elapsed); elapsed = 0 }
      else if (!live) { liveBow = 0; liveTexture = 0; elapsed = 0; primed = false }

      let bowTarget = liveBow, textureTarget = liveTexture
      const seconds = playing ? featureTime() : -1
      if (knownFeatures && seconds >= 0 && seconds < knownFeatures.duration) {
        const frame = sampleAudioFeatures(knownFeatures, seconds), blend = live ? .22 : 0
        bowTarget = frame.phrase * (1 - blend) + bowTarget * blend
        textureTarget = frame.spectralFlux * (1 - blend) + textureTarget * blend
        if (previousTime >= 0 && !jumped) {
          const step = media.currentTime - previousTime
          const hit = percussion.hits.find(hit => hit.time > seconds - step && hit.time <= seconds && hit.score >= interactionTuning.janggu.sensitivity)
          if (hit) { hitAge = Math.max(0, seconds - hit.time); hitStrength = hit.score }
        }
      }
      haegeum = ease(haegeum, playing ? bowTarget : 0, dt, (bowTarget > haegeum && playing ? tuningPresets.HOME_SIGNATURE.attack : tuningPresets.HOME_SIGNATURE.release) / 1000)
      const pulse = playing ? -hitDisplacement(hitAge) / interactionTuning.janggu.jumpHeight * hitStrength : 0
      janggu = ease(janggu, clamp(pulse), dt, pulse > janggu ? .015 : .055)
      texture = ease(texture, playing ? textureTarget : 0, dt, (textureTarget > texture && playing ? tuningPresets.HOME_SIGNATURE.attack : tuningPresets.HOME_SIGNATURE.release) / 1000)
      return { haegeum, janggu, texture }
    },
    reset,
    destroy() {
      disposed = true; source?.disconnect(); analyser?.disconnect()
      if (context && context.state !== 'closed') void context.close().catch(() => {})
      context = null; source = null; analyser = null
    },
  }
}
