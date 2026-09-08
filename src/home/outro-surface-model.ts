const clamp = (value: number) => Math.max(0, Math.min(1, value))

export function wetEnvelope(age: number) {
  const t = clamp(age / 1.45)
  // An input event can be stamped after this frame's RAF timestamp; that stain is just born.
  return { opacity: Math.pow(1 - t, 1.7), spread: 1 + Math.sin(t * Math.PI / 2) * .23 }
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
