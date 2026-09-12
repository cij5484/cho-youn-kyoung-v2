const clamp = (value: number) => Math.max(0, Math.min(1, value))
const smooth = (value: number) => { const t = clamp(value); return t * t * (3 - 2 * t) }

/** Only these positions are resting places; the last stop is the archive. */
export function worksHelixStop(index: number, count: number) {
  return index <= 0 ? 0 : index >= count ? 1 : .1 + .73 * index / Math.max(1, count - 1)
}
export function nearestWorksHelixStop(progress: number, count: number) {
  let nearest = 0
  for (let i = 1; i <= count; i++) {
    if (Math.abs(worksHelixStop(i, count) - progress) < Math.abs(worksHelixStop(nearest, count) - progress)) nearest = i
  }
  return nearest
}

/** One reversible scroll clock: unfold, visit every work, then join the archive. */
export function worksHelixTimeline(progress: number, count: number) {
  const cursor = clamp((progress - .1) / .73) * Math.max(0, count - 1)
  return { cursor, unfold: smooth(progress / .1), assembly: smooth((progress - .83) / .17), focus: Math.round(cursor) }
}

/** Cylindrical, radially facing cards, with the current work at the front of the helix. */
export function worksHelixPose(index: number, count: number, cursor: number, width: number, height: number, unfold: number) {
  const spread = clamp(unfold)
  const distance = index - Math.max(0, Math.min(Math.max(0, count - 1), cursor))
  const theta = distance * 1.65
  const radius = Math.min(width * .48, height * .54)
  const emphasis = Math.exp(-distance * distance * 2.7)
  const focusScale = Math.min(width * (width < 1000 ? .58 : .30) / 200, height * .57 / 300)
  // Adjacent pieces appear on the orbit, but distant turns cannot project through the reading plane.
  const visibility = 1 - smooth((Math.abs(distance) - .55) / .65)
  return {
    x: Math.sin(theta) * radius * spread,
    y: distance * Math.min(height * .23, width * .33) * spread,
    z: (Math.cos(theta) - 1) * radius * spread,
    rotationY: theta * 180 / Math.PI * spread,
    rotationZ: -Math.sin(theta) * 3 * spread,
    scale: focusScale * (.66 + .34 * emphasis),
    opacity: (index === 0 ? 1 - spread : 0) + visibility * spread,
    emphasis,
  }
}
