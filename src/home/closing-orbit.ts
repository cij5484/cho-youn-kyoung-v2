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
export function outroOrbit(box: OrbitBox, phase: number, _progress: number, strand=0): OrbitPoint {
  // Incommensurate drifts keep the inherited pair alive even at the page's final scroll position.
  // They are independent of the pointer, with no final destination or short looping ellipse.
  const drift=phase+strand*.63
  return {x:box.left+box.width*(.5+Math.cos(drift*.913)*.31+Math.sin(drift*1.617+.8)*.075),
    y:box.top+box.height*(.5+Math.sin(drift*.687)*.34+Math.cos(drift*1.313+.3)*.075),
    z:Math.sin(drift*1.123)*.72+Math.cos(drift*.479)*.28}
}
