const clamp = (value: number) => Math.max(0, Math.min(1, value))

export function wetEnvelope(age: number, duration = 1.45, attack = 0) {
  const t = clamp(age / duration), arrival = attack ? clamp(age / attack) : 1
  // An input event can be stamped after this frame's RAF timestamp; that stain is just born.
  return { opacity: Math.pow(1 - t, 1.7) * arrival * arrival * (3 - 2 * arrival), spread: 1 + Math.sin(t * Math.PI / 2) * .23 }
}

export const wetFieldTiming = { colorCycle: 72, mobileLife: 5.2, mobileAttack: .42, entryQuiet: 850, scrollQuiet: 280, interval: 1800, regionLimit: 3 } as const
export const desktopWetTiming = { interval: 580, travel: 56, regionLimit: 4, life: 3.4, attack: .38, pendingLife: 1100 } as const
const wetTones = [[99, 52, 229], [173, 140, 84], [163, 61, 54]] as const

export function outroInputSource(finePointer: boolean, mobileLayout: boolean, reduced: boolean) {
  return reduced ? 'static' : finePointer && !mobileLayout ? 'pointer' : 'points'
}

/** A full slow Violet → Bronze → Lacquer cycle is independent of pointer/stain frequency. */
export function wetColorAt(seconds: number): readonly [number, number, number] {
  const cycle = ((seconds / wetFieldTiming.colorCycle) % 1 + 1) % 1, phase = cycle * wetTones.length
  const index = Math.floor(phase), t = phase - index, mix = t * t * (3 - 2 * t)
  return wetTones[index].map((value, channel) => value + (wetTones[(index + 1) % wetTones.length][channel] - value) * mix) as [number, number, number]
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
