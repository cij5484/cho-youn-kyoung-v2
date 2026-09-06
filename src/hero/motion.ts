export const HERO_EXCHANGE_START = .12
export const HERO_EXCHANGE_END = .88
export const HERO_EXCHANGE_MIDPOINT = .5
export const clampProgress = (value: number) => Math.max(0, Math.min(1, value))

export function posterState(progress: number, exchange = true) {
  const phase = exchange ? clampProgress((progress - HERO_EXCHANGE_START) / (HERO_EXCHANGE_END - HERO_EXCHANGE_START)) : 0
  return { aperture: 1 - Math.sin(Math.PI * phase) ** 4, next: phase > .5 ? 1 : 0 }
}

export function followProgress(current: number, target: number, elapsed: number) {
  let next = current + (target - current) * (1 - Math.exp(-elapsed / 90))
  if (Math.abs(next - target) < .0001) next = target
  // Even a large wheel/keyboard jump receives one fully closed frame before the pose changes.
  if ((current < .5 && next > .5) || (current > .5 && next < .5)) return HERO_EXCHANGE_MIDPOINT
  return next
}
