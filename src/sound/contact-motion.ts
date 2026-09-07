import type { AudioFeatureFrame } from '../audio/features.ts'
import { tuningPresets, type BowTuningPreset } from './tuning-presets.ts'
export type SoundVisual = 'line-only' | 'bow-contact'
export type ContactTrail = 'short' | 'medium' | 'long' | 'extra-long'
export type ContactActivity = 'medium' | 'bold'
export type ContactViolet = 'editorial' | 'electric' | 'ink'

// User-approved SOUND direction. Alternative profiles are authoring/Lab tools, never public UI.
export const soundDirection = { visual: 'bow-contact', activity: 'bold', trail: 'long', violet: 'electric', preset: 'HOME_SIGNATURE' } as const

// Central SOUND tuning. Durations are milliseconds; ranges use shared string geometry.
// Keep marker movement smooth: audio gain drives envelopes, never waveform coordinates.
export const contactTuning = {
  colors: { editorial: '#6038C8', electric: '#6334E5', ink: '#492580' },
  desktop: { width: 10, height: 4.2, historySamples: 96, upper: 92, lower: 30, upperFraction: .22, lowerFraction: .05, historyScale: 1 },
  mobile: { width: 8, height: 3.6, historySamples: 64, upper: 60, lower: 20, upperFraction: .14, lowerFraction: .05, historyScale: .82 },
  activity: { medium: { speed: .7, range: .72 }, bold: { speed: 1, range: 1 } },
  trail: {
    short: { historyMs: 140, opacity: .52, width: 2.4 },
    medium: { historyMs: 280, opacity: .62, width: 2.8 },
    long: { historyMs: 460, opacity: .72, width: 3.2 },
    'extra-long': { historyMs: 720, opacity: .72, width: 3.2 },
  },
  horizontal: { center: .5, range: .34 },
  marker: { opacity: 1, staticOpacity: .9 },
  violetStrength: 1, // Alpha multiplier for marker + trail; retains approved solid hue.
  trailPersistence: 1, // Multiplies preset history; "longer tail" does not rewrite choreography.
  history: { base: .85, activityGain: .15, fadeExponent: 1.3 },
  bands: 12, audioGain: 5, entryMs: 150, dampingMs: 100,
} as const

// Exact critically damped follower: preserve position AND velocity when a target changes.
function follower(value: number, ms: number) {
  let velocity = 0
  return (target: number, dt: number, response = ms) => {
    if (dt === 0) return value
    const omega = 2 / response, offset = value - target, c = velocity + omega * offset, decay = Math.exp(-omega * dt)
    value = target + (offset + c * dt) * decay
    velocity = (velocity - omega * c * dt) * decay
    return value
  }
}

/** Mixed audio cannot recover the performer's actual bow position. This is an editorial abstraction. */
export function createContactMotion() {
  let sweep = .16, phrase = -.16, presence = 0, activity = 0, sustain = 0, flux = 0, previousEnergy = 0
  let energy = 0, friction = 0, rate = 0, range = 0, onset = 0, spectral = 0, pitch = 0
  let features: AudioFeatureFrame | null = null
  const followRate = follower(0, 160), followRange = follower(0, 300)
  const followPitch = follower(0, 500)
  const ease = (from: number, to: number, dt: number, ms: number) => from + (to - from) * (1 - Math.exp(-dt / ms))
  return {
    // Analyse envelopes, never assign waveform samples directly to coordinates.
    sample(samples: Float32Array | null, dt: number, frame: AudioFeatureFrame | null = null) {
      features = samples ? frame : null
      let power = 0, difference = 0
      if (samples) for (let i = 0; i < samples.length; i++) {
        power += samples[i] ** 2
        if (i) difference += Math.abs(samples[i] - samples[i - 1])
      }
      const rms = samples ? Math.sqrt(power / samples.length) : 0
      const roughness = samples ? difference / samples.length / Math.max(.001, rms) : 0
      energy = Math.min(1, rms * contactTuning.audioGain) * Math.min(1, roughness * 4)
      friction = ease(friction, Math.min(1, roughness * 2), dt, 150)
      flux = ease(flux, Math.min(1, Math.abs(energy - previousEnergy) * 4), dt, 180)
      previousEnergy = energy
    },
    advance(dt: number, playing: boolean, intensity: ContactActivity = 'bold', preset: BowTuningPreset = tuningPresets.B2_REFERENCE) {
      const elapsed = Math.max(0, Math.min(50, dt)), featureDriven = preset.featureDriven
      // Feature energy still requires actual active media/live samples; unavailable audio never animates.
      const drive = featureDriven && features ? features.energy * (1-preset.liveEnergyBlend) + energy * preset.liveEnergyBlend : energy
      const active = playing && drive > .015
      activity = ease(activity, active ? drive : 0, elapsed, drive > activity && active ? preset.attack : preset.release)
      sustain = ease(sustain, active ? featureDriven && features ? features.phrase : drive : 0, elapsed, preset.phraseResponse)
      onset = ease(onset, active && featureDriven ? features?.onset ?? Math.min(1,flux) : 0, elapsed, 12)
      spectral = ease(spectral, active && featureDriven ? features?.spectralFlux ?? flux : 0, elapsed, featureDriven ? preset.attack : 180)
      const baseRate = featureDriven ? .35 + preset.activityGain * activity + preset.onsetSensitivity * onset + preset.spectralFluxSensitivity * spectral : .45 + 1.45 * activity + .28 * flux + .2 * friction
      const wantedRate = active ? Math.min(preset.maxSpeed, baseRate * preset.reversalResponse) * contactTuning.activity[intensity].speed : 0
      const nextRate = followRate(wantedRate, elapsed, preset.acceleration)
      // Smooth velocity integral + cosine turns: decelerate -> zero vertical velocity -> accelerate.
      sweep += (rate + nextRate) * .5 * elapsed / 1000
      phrase += (rate + nextRate) * .5 * (preset.horizontalActivity + .04 * sustain) * elapsed / 1000
      rate = nextRate
      // Preserve outgoing range through damping and on re-entry.
      const wantedRange = featureDriven ? Math.min(1, .38 + .62 * Math.sqrt(activity) + .12 * spectral) : .64 + .36 * sustain
      range = followRange(active ? wantedRange * contactTuning.activity[intensity].range : range, elapsed, preset.rangeResponse)
      const pitchMidi = features?.pitchMidi ?? null
      const reliablePitch = featureDriven && pitchMidi !== null && (features?.pitchConfidence ?? 0) >= .85
      const pitchTarget = reliablePitch ? -Math.max(-1,Math.min(1, (pitchMidi! - preset.pitchMinMidi) / (preset.pitchMaxMidi-preset.pitchMinMidi) * 2 - 1)) * preset.pitchInfluence : 0
      pitch = followPitch(pitchTarget, elapsed)
      const wantedPresence = active ? .82 + .18 * activity : 0
      presence = ease(presence, wantedPresence, elapsed, wantedPresence > presence ? contactTuning.entryMs : contactTuning.dampingMs)
      if (!active && presence < .002 && rate < .002) presence = 0
      return {
        vertical: (-Math.cos(sweep * Math.PI * 2) * (1-Math.abs(pitch)) + pitch) * preset.verticalRange,
        lateral: Math.sin(phrase * Math.PI * 2) * preset.horizontalRange,
        presence, activity, range, rate, phase: sweep, sustained: sustain, transient: flux,
        trailEmphasis: featureDriven ? 1-preset.trailGain + preset.trailGain * activity : 1,
        onset, spectral, pitch,
        unsettled: presence > 0,
      }
    },
    hide() { presence = 0; energy = 0; features = null },
  }
}
