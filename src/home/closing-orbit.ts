/** Shared phase and viewport coordinates keep the same pair alive through every closing scene. */
export const clamp = (n: number) => Math.max(0, Math.min(1, n))
export const smooth = (n: number) => { const p = clamp(n); return p * p * (3 - 2 * p) }
const mix = (a: number, b: number, p: number) => a + (b - a) * p
export type OrbitPoint = { x: number; y: number; z: number }
export type OrbitBox = { left: number; top: number; width: number; height: number }
export function ellipse(box: OrbitBox, phase: number, radiusX = .6, radiusY = .55): OrbitPoint {
  const z = Math.sin(phase), perspective = 1 / (1 - z * .16)
  return { x: box.left + box.width / 2 + Math.cos(phase) * box.width * radiusX * perspective,
    y: box.top + box.height / 2 + Math.sin(phase) * box.height * radiusY + Math.cos(phase) * box.width * .09, z }
}
export function blendPoint(a: OrbitPoint, b: OrbitPoint, p: number): OrbitPoint {
  return { x: mix(a.x,b.x,p), y: mix(a.y,b.y,p), z: mix(a.z,b.z,p) }
}
export function outroOrbit(box: OrbitBox, phase: number, progress: number, strand=0): OrbitPoint {
  const loop=ellipse(box,phase,.43,.42), gather=smooth((progress-.66)/.17), escape=smooth((progress-.94)/.06)
  // Two authored endpoints hold briefly; their remaining tails resolve before the final withdrawal.
  return {x:mix(loop.x,box.left+box.width*(.75+strand*.06),gather)+escape*box.width*.04,
    y:mix(loop.y,box.top+box.height*(.72-strand*.035),gather)-escape*box.height*.06,
    z:mix(Math.sin(phase*2),0,gather)}
}
