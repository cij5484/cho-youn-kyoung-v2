export type SoundVisual = 'line-only' | 'bow-contact'
export type ContactTrail = 'short' | 'medium' | 'long' | 'extra-long'
export type ContactActivity = 'medium' | 'bold'
export type ContactViolet = 'editorial' | 'electric' | 'ink'

// User-approved SOUND direction. Alternative profiles are authoring/Lab tools, never public UI.
export const soundDirection = { visual: 'bow-contact', activity: 'bold', trail: 'long', violet: 'electric' } as const

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
  return (target: number, dt: number) => {
    const omega = 2 / ms, offset = value - target, c = velocity + omega * offset, decay = Math.exp(-omega * dt)
    value = target + (offset + c * dt) * decay
    velocity = (velocity - omega * c * dt) * decay
    return value
  }
}

/** Mixed audio cannot recover the performer's actual bow position. This is an editorial abstraction. */
export function createContactMotion() {
  let sweep = .16, phrase = -.16, presence = 0, activity = 0, sustain = 0, flux = 0, previousEnergy = 0
  let energy = 0, friction = 0, rate = 0, range = 0
  const followRate = follower(0, 160), followRange = follower(0, 300)
  const ease = (from: number, to: number, dt: number, ms: number) => from + (to - from) * (1 - Math.exp(-dt / ms))
  return {
    // Analyse envelopes, never assign waveform samples directly to coordinates.
    sample(samples: Float32Array | null, dt: number) {
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
    advance(dt: number, playing: boolean, intensity: ContactActivity = 'bold') {
      const elapsed = Math.max(0, Math.min(50, dt)), active = playing && energy > .015
      activity = ease(activity, active ? energy : 0, elapsed, 90)
      sustain = ease(sustain, active ? energy : 0, elapsed, 700)
      const wantedRate = active ? (.45 + 1.45 * activity + .28 * flux + .2 * friction) * contactTuning.activity[intensity].speed : 0
      const nextRate = followRate(wantedRate, elapsed)
      // Smooth velocity integral + cosine turns: decelerate -> zero vertical velocity -> accelerate.
      sweep += (rate + nextRate) * .5 * elapsed / 1000
      phrase += (rate + nextRate) * .5 * (.06 + .04 * sustain) * elapsed / 1000
      rate = nextRate
      // Preserve outgoing range through damping and on re-entry.
      range = followRange(active ? (.64 + .36 * sustain) * contactTuning.activity[intensity].range : range, elapsed)
      const wantedPresence = active ? .82 + .18 * activity : 0
      presence = ease(presence, wantedPresence, elapsed, wantedPresence > presence ? contactTuning.entryMs : contactTuning.dampingMs)
      if (!active && presence < .002 && rate < .002) presence = 0
      return {
        vertical: -Math.cos(sweep * Math.PI * 2), lateral: Math.sin(phrase * Math.PI * 2),
        presence, activity, range, rate, phase: sweep, sustained: sustain, transient: flux,
        unsettled: presence > 0,
      }
    },
    hide() { presence = 0; energy = 0 },
  }
}
