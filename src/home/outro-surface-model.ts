const clamp = (value: number) => Math.max(0, Math.min(1, value))

export function wetEnvelope(age: number, duration = 1.45, attack = 0) {
  const t = clamp(age / duration), arrival = attack ? clamp(age / attack) : 1
  // An input event can be stamped after this frame's RAF timestamp; that stain is just born.
  return { opacity: Math.pow(1 - t, 1.7) * arrival * arrival * (3 - 2 * arrival), spread: 1 + Math.sin(t * Math.PI / 2) * .23 }
}

export const wetFieldTiming = { colorCycle: 72, mobileLife: 5.2, mobileAttack: .42, entryQuiet: 850, scrollQuiet: 280, interval: 1800, regionLimit: 3 } as const
const wetTones = [[99, 52, 229], [173, 140, 84], [163, 61, 54]] as const

/** A full slow Violet → Bronze → Lacquer cycle is independent of pointer/stain frequency. */
export function wetColorAt(seconds: number): readonly [number, number, number] {
  const cycle = ((seconds / wetFieldTiming.colorCycle) % 1 + 1) % 1, phase = cycle * wetTones.length
  const index = Math.floor(phase), t = phase - index, mix = t * t * (3 - 2 * t)
  return wetTones[index].map((value, channel) => value + (wetTones[(index + 1) % wetTones.length][channel] - value) * mix) as [number, number, number]
}

export function autonomousWetReady(input: { now: number; enteredAt: number; lastScroll: number; lastStain: number; regions: number; visible: boolean; reduced: boolean; touching: boolean }) {
  return input.visible && !input.reduced && !input.touching && input.regions < wetFieldTiming.regionLimit
    && input.now - input.enteredAt >= wetFieldTiming.entryQuiet
    && input.now - input.lastScroll >= wetFieldTiming.scrollQuiet
    && input.now - input.lastStain >= wetFieldTiming.interval
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
