export interface LinkWavePoint { x: number; y: number }
export interface LinkGlyphWave { delay: number; strength: number; tilt: number }

export const editorialWaveTuning = {
  glyphDuration: 360,
  arrowDuration: 320,
  settleDuration: 140,
  delayPerPixel: .52,
  maximumDelay: 165,
  focusOrigin: .12,
} as const

/** Arrival comes from measured glyph centers, not character order or text direction. */
export function editorialWavePlan(origin: LinkWavePoint, centers: readonly LinkWavePoint[], arrow: LinkWavePoint) {
  const distance = (point: LinkWavePoint) => Math.hypot(point.x - origin.x, point.y - origin.y)
  const distances = centers.map(distance)
  const farthest = Math.max(1, ...distances)
  const delay = (value: number) => Math.min(editorialWaveTuning.maximumDelay, value * editorialWaveTuning.delayPerPixel)
  const glyphs: LinkGlyphWave[] = distances.map((value, index) => {
    const strength = .6 + .4 * (1 - value / farthest)
    return { delay: delay(value), strength, tilt: (centers[index].x < origin.x ? -1 : 1) * 1.8 * strength }
  })
  return {
    glyphs,
    // The arrow completes the same disturbance after it has crossed the word.
    arrowDelay: Math.max(delay(distance(arrow)), ...glyphs.map(glyph => glyph.delay), 0) + 24,
  }
}

export function glyphWaveFrames(glyph: LinkGlyphWave, from = 'none'): Keyframe[] {
  return [
    { transform: from, offset: 0 },
    { transform: `translateY(${1.1 * glyph.strength}px) rotate(${-glyph.tilt * .35}deg) scaleY(.96)`, offset: .17 },
    { transform: `translateY(-54%) rotate(${glyph.tilt}deg) scaleY(${1 + .025 * glyph.strength})`, offset: .53 },
    { transform: 'translateY(-100%) rotate(0deg) scaleY(1)', offset: 1 },
  ]
}

export function arrowWaveFrames(from = 'none'): Keyframe[] {
  return [
    { transform: from, offset: 0 },
    { transform: 'translate(-1px, 1px) rotate(-4deg) scale(.96)', offset: .2 },
    { transform: 'translate(6px, -3px) rotate(5deg) scaleX(1.04)', offset: .66 },
    { transform: 'translate(3px, -2px) rotate(0deg) scale(1)', offset: 1 },
  ]
}

/** A cut-off rolling glyph settles to its nearest identical copy, never reverses the full wave. */
export function glyphSettleDestination(translationY: number, height: number) {
  return height > 0 && translationY < -height / 2 ? 'translateY(-100%)' : 'translateY(0)'
}
