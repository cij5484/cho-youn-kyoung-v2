import { Euler, Quaternion, Vector3 } from 'three'
import { worksCatalog } from '../../catalog.ts'
import type { WorkPose, WorksLayout } from '../variant.ts'

const clamp = (value: number) => Math.max(0, Math.min(1, value))
const smooth = (value: number) => { const t = clamp(value); return t * t * (3 - 2 * t) }
const mix = (a: number, b: number, t: number) => a + (b - a) * t
const vector = (values: readonly number[]) => new Vector3(values[0], values[1], values[2])
const rotation = (x: number, y: number, z: number) => new Quaternion().setFromEuler(new Euler(x, y, z, 'YXZ'))

export const stackFlowTuning = { firstFocus: .14, focusStep: .124, resolveStart: .8 } as const

// Unequal offsets, normal directions and paper edges form one sculptural group, not a parallel deck.
const desktopCluster = [
  [-.35, .12, .55], [.94, .55, -.32], [-1.14, -.45, -.72],
  [.69, -.93, -1.08], [-.58, 1.04, -1.5], [1.48, -.12, -1.86],
].map(vector)
const mobileCluster = [
  [-.1, .12, 0], [.48, .46, -.42], [-.48, -.39, -.79],
  [.32, -.64, -1.13], [-.29, .69, -1.46], [.51, -.04, -1.79],
].map(vector)
const clusterRotations = [
  rotation(-.06, -.17, -.14), rotation(.17, .38, .22), rotation(-.16, -.41, -.24),
  rotation(.14, -.22, .33), rotation(-.12, .29, -.29), rotation(.2, .46, -.06),
]
const desktopFocus = [
  [-1.1, .16, .72], [.72, .08, .48], [-.68, -.16, .42],
  [.93, .17, .65], [-.8, .03, .58], [.42, -.08, .44],
].map(vector)
const mobileFocus = [
  [.1, .12, 0], [-.1, -.06, 0], [.12, .05, 0],
  [-.08, .1, 0], [.08, .02, 0], [-.1, .08, 0],
].map(vector)
// An open, asymmetric current across the page. There is no closed orbit or category helix.
const desktopFlow = [
  [-3.5, 1.3, -1.55], [-2.08, 1.8, -2.14], [-.08, 1.66, -2.45],
  [1.91, 1.1, -2.2], [3.26, -.2, -1.8], [2.2, -1.28, -1.5],
].map(vector)
const flowRotations = [
  rotation(.2, -.43, -.31), rotation(-.12, -.26, -.12), rotation(.17, .36, .16),
  rotation(-.22, .45, .26), rotation(.19, -.29, .13), rotation(-.13, -.38, -.2),
]
const tones = [
  [.69, .65, .57], [.66, .59, .44], [.63, .52, .47],
  [.57, .6, .58], [.63, .56, .45], [.59, .5, .54],
] as const
const ranks = { album: 0, performance: 0 }
const archiveRows = worksCatalog.map(work => ranks[work.type]++)

function curve(a: Vector3, b: Vector3, c: Vector3, d: Vector3, t: number) {
  const u = 1 - t
  return a.clone().multiplyScalar(u * u * u).addScaledVector(b, 3 * u * u * t)
    .addScaledVector(c, 3 * u * t * t).addScaledVector(d, t * t * t)
}

function pose(index: number, p: number, mobile: boolean, velocity: number, resolution: number): WorkPose {
  const work = worksCatalog[index], local = (p - stackFlowTuning.firstFocus) / stackFlowTuning.focusStep - index
  const unpack = smooth(p / .19), arrival = smooth((local + 1) / .72), departure = smooth((local - .3) / 1.3)
  const cluster = (mobile ? mobileCluster : desktopCluster)[index]
  const focus = (mobile ? mobileFocus : desktopFocus)[index]
  // Remaining papers gather below the mobile focus; desktop keeps an offset material cluster.
  const waiting = mobile
    ? new Vector3(cluster.x * .54, -1.49 + cluster.y * .27, -1.48 - index * .14)
    : new Vector3(cluster.x * .8 + .94, cluster.y * .82 - .3, cluster.z - .55)
  const start = cluster.clone().lerp(waiting, unpack)
  const lift = mobile ? new Vector3(start.x * .45 - .22, start.y + .57, start.z + .35)
    : new Vector3(start.x - .65, start.y + .44, start.z + .68)
  const approach = focus.clone().add(new Vector3(mobile ? .23 : .54, mobile ? -.38 : -.35, mobile ? -.25 : -.34))
  let position = curve(start, lift, approach, focus, arrival)
  const readable = rotation(0, mobile ? .015 : -.025, mobile ? -.015 : .018)
  const quaternion = clusterRotations[index].clone().slerp(readable, arrival)
  const flow = mobile
    ? new Vector3((index % 3 - 1) * .3, 1.78 + index * .08, -1.52 - index * .15)
    : desktopFlow[index]
  if (departure > 0) {
    const release = focus.clone().add(new Vector3(mobile ? -.48 : -.72, mobile ? .6 : .34, -.18))
    const bend = flow.clone().add(new Vector3(mobile ? .46 : .52, mobile ? -.45 : -.2, .3))
    position = curve(focus, release, bend, flow, departure)
    quaternion.slerp(flowRotations[index], departure)
  }
  const bank = Math.max(-.028, Math.min(.028, velocity * .014)) * (1 - arrival + departure) * (1 - resolution)
  quaternion.multiply(rotation(0, 0, bank))
  const focusWidth = mobile ? work.type === 'album' ? 1.74 : 1.55 : work.type === 'album' ? 3.52 : 3.02
  let scale = focusWidth * mix(mix(.84, 1, arrival), mobile ? .81 : .63, departure)
  const proximity = 1 - smooth((Math.abs(local) - 1.15) / .85)
  let opacity = mobile ? mix(1, proximity, unpack) : mix(1, .83, departure)
  const destination = new Vector3(work.type === 'album' ? -1 : 1, 0, 0)
  destination.x *= mobile ? .75 : 2.4
  destination.y = (1 - archiveRows[index]) * (mobile ? 1.2 : 1.6)
  position.lerp(destination, resolution)
  quaternion.slerp(new Quaternion(), resolution)
  scale = mix(scale, mobile ? .5 : 1, resolution)
  opacity = mix(opacity, 1, resolution)
  return { position, quaternion: quaternion.normalize(), scale, opacity }
}

const stackFlow: WorksLayout = {
  id: 'stack-flow',
  hover: { depth: .2, pitch: .03, yaw: .025 },
  sample(progress, mobile, velocity) {
    const p = clamp(progress), resolution = smooth((p - stackFlowTuning.resolveStart) / (1 - stackFlowTuning.resolveStart))
    const cursor = Math.max(0, Math.min(5, (p - stackFlowTuning.firstFocus) / stackFlowTuning.focusStep))
    const lower = Math.floor(cursor), upper = Math.min(5, lower + 1), blend = smooth(cursor - lower)
    return {
      poses: worksCatalog.map((_, index) => pose(index, p, mobile, velocity, resolution)),
      focus: Math.round(cursor), resolution,
      ambient: tones[lower].map((value, channel) => mix(value, tones[upper][channel], blend)) as [number, number, number],
    }
  },
}

export default stackFlow
