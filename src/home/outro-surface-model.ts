const clamp = (value: number) => Math.max(0, Math.min(1, value))
const smooth = (value: number) => { const t = clamp(value); return t * t * (3 - 2 * t) }

export function wetEnvelope(age: number, duration = 6, expansion = 1.5) {
  // An input event can be stamped after this frame's RAF timestamp; that stain is just born.
  const elapsed = Math.max(0, age), life = Math.max(.001, duration), growthTime = Math.max(.001, Math.min(expansion, life * .65))
  const growth = smooth(elapsed / growthTime), holdUntil = growthTime + Math.min(.65, life * .12)
  const dry = smooth((elapsed - holdUntil) / Math.max(.001, life - holdUntil))
  // A concentrated small birth opens into fibres before the broad region slowly dries.
  return { opacity: smooth(elapsed / .14) * (1 - growth * .12) * (1 - dry),
    spread: .18 + growth * .82 + smooth((elapsed - growthTime) / Math.max(.001, life - growthTime)) * .055 }
}

export const wetFieldTiming = { colorCycle: 36, mobileLife: 6, entryQuiet: 850, scrollQuiet: 280, interval: 3000, regionLimit: 2 } as const
export const desktopWetTiming = { interval: 1100, travel: 56, regionLimit: 3, life: 6, pendingLife: 1100 } as const
const wetTones = [[99, 52, 229], [173, 140, 84], [163, 61, 54]] as const

export type WetSource = 'pointer' | 'points' | 'tap'
export type WetStainProfile = { radius: number; strength: number; life: number; expansion: number; turn: number; warmth: number }

/** Stable per-region variation; neither frame rate nor subsequent pointer samples reroll it. */
function stainVariation(seed: number, channel: number) {
  let value = Math.imul((seed + 1) ^ Math.imul(channel + 1, 0x9e3779b9), 0x85ebca6b)
  value = Math.imul(value ^ value >>> 13, 0xc2b2ae35)
  return ((value ^ value >>> 16) >>> 0) / 0xffffffff * 2 - 1
}

export function wetStainProfile(source: WetSource, speed: number, seed: number): WetStainProfile {
  const desktop = source === 'pointer', energy = clamp(speed)
  const radius = desktop ? (96 + energy * 30) * .6 : (source === 'tap' ? 42 : 47 + energy * 15) * .675
  const strength = desktop ? (.12 + energy * .025) * 1.9 : (source === 'tap' ? .15 : .135) * 2
  return { radius: radius * (1 + stainVariation(seed, 0) * .2), strength: strength * (1 + stainVariation(seed, 1) * .12),
    life: (desktop ? desktopWetTiming.life : wetFieldTiming.mobileLife) * (1 + stainVariation(seed, 2) * .15),
    expansion: 1.5 + stainVariation(seed, 3) * .2, turn: stainVariation(seed, 4) * .45, warmth: stainVariation(seed, 5) }
}

export function outroInputSource(finePointer: boolean, mobileLayout: boolean, reduced: boolean) {
  return reduced ? 'static' : finePointer && !mobileLayout ? 'pointer' : 'points'
}

/** A full slow Violet → Bronze → Lacquer cycle is independent of pointer/stain frequency. */
export function wetColorAt(seconds: number): readonly [number, number, number] {
  const cycle = ((seconds / wetFieldTiming.colorCycle) % 1 + 1) % 1, phase = cycle * wetTones.length
  const index = Math.floor(phase), t = phase - index, mix = t * t * (3 - 2 * t)
  return wetTones[index].map((value, channel) => value + (wetTones[(index + 1) % wetTones.length][channel] - value) * mix) as [number, number, number]
}

/** A small pigment-temperature bias preserves the shared phase instead of selecting a new hue. */
export function wetStainColor(seconds: number, warmth: number): readonly [number, number, number] {
  const temperature = Math.max(-1, Math.min(1, warmth)), offsets = [10, 4, -7]
  return wetColorAt(seconds).map((value, channel) => Math.max(0, Math.min(255, value + offsets[channel] * temperature))) as [number, number, number]
}

type AutonomousWetInput = { now: number; enteredAt: number; lastScroll: number; lastStain: number; regions: number; visible: boolean; reduced: boolean; touching: boolean }
export function autonomousWetBlock(input: AutonomousWetInput) {
  if (!input.visible) return 'hidden'
  if (input.reduced) return 'reduced'
  if (input.touching) return 'touch'
  if (input.now - input.enteredAt < wetFieldTiming.entryQuiet) return 'entry'
  if (input.now - input.lastScroll < wetFieldTiming.scrollQuiet) return 'scroll'
  if (input.regions >= wetFieldTiming.regionLimit) return 'regions'
  if (input.now - input.lastStain < wetFieldTiming.interval) return 'interval'
  return 'ready'
}
export function autonomousWetReady(input: AutonomousWetInput) {
  return autonomousWetBlock(input) === 'ready'
}

/** Only a changed native scroll position advances the quiet clock. Style writes are not input. */
export function wetScrollActivity(previous: { position: number; at: number }, position: number, now: number) {
  return Math.abs(position - previous.position) > .25 ? { position, at: now } : previous
}

/** Pointer samples can arrive at any frequency; one retained representative blooms on this clock. */
export function desktopWetReady(input: { now: number; lastStain: number; travel: number; sampledAt: number; regions: number }) {
  return input.now - input.lastStain >= desktopWetTiming.interval && input.travel >= desktopWetTiming.travel
    && input.now - input.sampledAt <= desktopWetTiming.pendingLife && input.regions < desktopWetTiming.regionLimit
}

export function blankTapIsWet(duration: number, distance: number, interactive: boolean, contacts = 1) {
  return !interactive && contacts === 1 && duration >= 0 && duration <= 280 && distance <= 8
}

export function gentleGlyph(pose: GlyphPose, strength = .28): GlyphPose {
  return { x: pose.x * strength, y: pose.y * strength, turn: pose.turn * strength, stretch: 1 + (pose.stretch - 1) * strength }
}

export interface GlyphPose { x: number; y: number; turn: number; stretch: number }
export const restingGlyph: GlyphPose = { x: 0, y: 0, turn: 0, stretch: 1 }

/** Only the closest letters receive small tension; neither the word box nor other copy moves. */
export function outroGlyphTarget(dx: number, dy: number, radius: number): GlyphPose {
  const amount = Math.pow(clamp(1 - Math.hypot(dx, dy) / Math.max(1, radius)), 2)
  if (!amount) return restingGlyph
  return { x: dx / radius * amount * 3.2, y: (-1.9 + dy / radius) * amount,
    turn: dx / radius * amount * -.65, stretch: 1 + amount * .004 }
}

export function outroCanvasScale(width: number, height: number, dpr: number) {
  return Math.min(Math.max(1, dpr), 1.25, Math.sqrt(1_100_000 / Math.max(1, width * height)))
}
