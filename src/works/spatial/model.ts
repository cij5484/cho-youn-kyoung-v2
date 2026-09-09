/** Shared lens and damping only; candidate choreography belongs to its lazy module. */
export const spatialTuning = {
  desktop: { cameraZ: 14, fov: 38, dpr: 1.5 },
  mobile: { cameraZ: 10, fov: 40, dpr: 1.25 },
} as const
export const clamp01 = (value: number) => Math.max(0, Math.min(1, value))
export function dampValue(current: number, target: number, elapsedSeconds: number, speed = 11): number {
  return current + (target - current) * (1 - Math.exp(-speed * Math.max(0, Math.min(.06, elapsedSeconds))))
}
