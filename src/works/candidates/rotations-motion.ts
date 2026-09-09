import { worksCatalog } from '../catalog.ts'

export interface RotationPose {
  x: number; y: number; z: number
  rx: number; ry: number; rz: number
  scale: number; opacity: number; blur: number; brightness: number
  distance: number
}
export interface RotationFrame { poses: RotationPose[]; focus: number; progress: number; resolution: number }
type Rotation = readonly [number, number, number]
const clamp = (n: number) => Math.max(0, Math.min(1, n))
const ease = (n: number) => { const t = clamp(n); return t * t * (3 - 2 * t) }
const albumIndices = worksCatalog.flatMap((record, index) => record.type === 'album' ? [index] : [])
const performanceIndices = worksCatalog.flatMap((record, index) => record.type === 'performance' ? [index] : [])
export const rotationSequence = albumIndices.flatMap((index, rank) => [index, performanceIndices[rank]])

// Each image has an authored entry and exit, rather than a randomized repeat.
// The reference's transform responsibilities are rebuilt with native CSS 3D.
const grammar: { entry: Rotation; exit: Rotation; x: number; inX: number; outX: number; inZ: number; outZ: number }[] = [
  { entry: [126, -28, -24], exit: [-116, 34, 20], x: .10, inX: -.34, outX: .40, inZ: -.30, outZ: -.24 },
  { entry: [-24, 158, -38], exit: [36, -142, 42], x: -.02, inX: .38, outX: -.39, inZ: -.39, outZ: -.28 },
  { entry: [104, -116, 44], exit: [-108, 92, -32], x: .09, inX: -.28, outX: .36, inZ: -.26, outZ: -.42 },
  { entry: [92, 62, 34], exit: [-124, -48, -28], x: .02, inX: .29, outX: -.34, inZ: -.34, outZ: -.22 },
  { entry: [-134, 30, 18], exit: [112, -36, -22], x: -.01, inX: -.32, outX: .30, inZ: -.25, outZ: -.34 },
  { entry: [30, -154, 32], exit: [-42, 146, -44], x: .06, inX: .36, outX: -.35, inZ: -.37, outZ: -.27 },
]

export function sampleRotations(progress: number, mobile: boolean, velocity = 0): RotationFrame {
  const p = clamp(progress)
  const cursor = clamp(p / .82) * 5
  const resolution = ease((p - .82) / .18)
  const speed = Math.min(1, Math.abs(velocity) / 2.4)
  const bank = Math.max(-1, Math.min(1, velocity / 2))
  const poses = worksCatalog.map((record, index) => {
    const item = grammar[index]
    const distance = rotationSequence.indexOf(index) - cursor
    const travel = ease((Math.abs(distance) - .19) / 1.08)
    const entry = distance >= 0
    const rotation = entry ? item.entry : item.exit
    let x = item.x + (entry ? item.inX : item.outX) * travel
    let y = distance * .59
    let z = (entry ? item.inZ : item.outZ) * travel
    let rx = rotation[0] * travel
    let ry = rotation[1] * travel
    let rz = rotation[2] * travel + bank * (mobile ? 2.2 : 5) * (1 - resolution)
    if (mobile) {
      // A local vertical entrance/exit. Albums pitch across the lower edge;
      // posters open on Y with a diagonal seam, without requiring touch drag.
      x = (record.type === 'album' ? -.015 : .02) + (entry ? 1 : -1) * (record.type === 'album' ? -.14 : .17) * travel
      y = distance * .94
      z *= .58
      rx *= record.type === 'album' ? .9 : .58
      ry *= record.type === 'performance' ? .87 : .7
      rz *= .72
    }
    let scale = 1 - travel * .1 + speed * .018 * (1 - travel)
    let opacity = 1 - ease((Math.abs(distance) - (mobile ? 1.02 : 1.48)) / .65)
    const rank = (record.type === 'album' ? albumIndices : performanceIndices).indexOf(index)
    const endX = (record.type === 'album' ? -1 : 1) * (mobile ? .19 : .15)
    const endY = (rank - 1) * (mobile ? .29 : .28)
    x += (endX - x) * resolution
    y += (endY - y) * resolution
    z *= 1 - resolution
    rx *= 1 - resolution
    ry *= 1 - resolution
    rz *= 1 - resolution
    scale += ((mobile ? .24 : .28) - scale) * resolution
    opacity += (1 - opacity) * ease(resolution / .7)
    return { x, y, z, rx, ry, rz, scale, opacity, distance,
      blur: speed * (mobile ? 1.4 : 3.8) * (1 - resolution), brightness: 1 - travel * .10 * (1 - resolution) }
  })
  return { poses, focus: rotationSequence[Math.round(cursor)], progress: p, resolution }
}

export function dampRotationValue(current: number, target: number, elapsed: number, rate = 12): number {
  return current + (target - current) * (1 - Math.exp(-rate * Math.max(0, Math.min(.06, elapsed))))
}
