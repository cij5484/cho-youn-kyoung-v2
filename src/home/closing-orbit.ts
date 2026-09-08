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
export function artistOrbit(photo: OrbitBox, name: OrbitBox, phase: number): OrbitPoint {
  // The two opposite points exchange the portrait and the name along a continuous figure-eight.
  const ax=photo.left+photo.width/2, ay=photo.top+photo.height/2
  const bx=name.left+name.width/2, by=name.top+name.height/2
  const distance=Math.max(1,Math.hypot(bx-ax,by-ay)), ux=(bx-ax)/distance, uy=(by-ay)/distance
  const along=-Math.cos(phase)*(distance/2+(photo.width*Math.abs(ux)+photo.height*Math.abs(uy))*.4)
  const across=Math.sin(phase*2)*(photo.height*Math.abs(ux)+photo.width*Math.abs(uy))*.53
  return {x:(ax+bx)/2+ux*along-uy*across,y:(ay+by)/2+uy*along+ux*across,z:Math.cos(phase*2)}
}
export function outroOrbit(box: OrbitBox, phase: number, progress: number, width: number): OrbitPoint {
  const loop=ellipse(box,phase,.43,.42), gather=smooth((progress-.72)/.22), escape=smooth((progress-.9)/.1)
  // The wide typographic helix tightens into one diagonal signature stroke, then leaves the page.
  return {x:mix(loop.x,box.left+box.width*.86,gather)+escape*width*.23,
    y:mix(loop.y,box.top+box.height*.72,gather)-escape*box.height*.3,
    z:mix(Math.sin(phase*2),0,gather)}
}
