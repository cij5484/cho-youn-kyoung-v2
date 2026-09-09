import { CatmullRomCurve3, Euler, Matrix4, Quaternion, Vector3 } from 'three'
import { worksCatalog } from '../../catalog.ts'
import type { WorksLayout } from '../variant.ts'

const clamp = (value: number) => Math.max(0, Math.min(1, value))
const smooth = (value: number) => { const t = clamp(value); return t * t * (3 - 2 * t) }
const curve = (points: number[][]) => new CatmullRomCurve3(points.map(point => new Vector3(point[0], point[1], point[2])), false, 'centripetal')

// Open, authored paths: an album rises through a low bend while the performance
// cuts through a deeper upper fold. Neither path closes or repeats periodically.
const desktop = {
  album: curve([[-7.5, 1.8, -7], [-5.4, -.15, -4], [-3.4, -1.15, -1.8], [-.55, -.22, .55], [2.65, 1.25, -1.6], [4.85, 2.6, -4.4], [7.6, .85, -7.4]]),
  performance: curve([[7.2, -2.3, -7.3], [5.4, -1.2, -5.1], [3.25, -1.45, -3.9], [.55, .22, .7], [-2.4, 1.9, -3.8], [-4.7, -.6, -5.6], [-7.4, -1.85, -7.2]]),
}
const mobilePaths = {
  album: curve([[-1.4, 4.3, -4.8], [-1.1, 3, -3.2], [-.65, 1.55, -1.1], [-.12, 0, .2], [.65, -1.55, -1.7], [1, -3, -3.5], [.2, -4.5, -5]]),
  performance: curve([[1.6, 4, -5], [1.15, 2.8, -3.1], [.68, 1.5, -1.5], [.12, 0, .1], [-.6, -1.55, -1.3], [-.98, -2.9, -3.7], [-.2, -4.5, -5.2]]),
}
const albums = worksCatalog.flatMap((record, index) => record.type === 'album' ? [index] : [])
const performances = worksCatalog.flatMap((record, index) => record.type === 'performance' ? [index] : [])
const sequence = albums.flatMap((index, rank) => [index, performances[rank]])
const identities = worksCatalog.map((record, index) => ({
  type: record.type, order: sequence.indexOf(index), rank: (record.type === 'album' ? albums : performances).indexOf(index),
}))

function orientation(path: CatmullRomCurve3, t: number, mobile: boolean, direction: number) {
  const tangent = path.getTangent(t).normalize()
  // Y remains editorially upright. The face normal is derived from the actual
  // path tangent; opposite category travel has the opposite handed direction.
  const normal = mobile
    ? new Vector3(tangent.x * 1.35, -tangent.z * .35, Math.max(.34, Math.abs(tangent.y))).normalize()
    : new Vector3(-tangent.z * direction, 0, tangent.x * direction).normalize()
  const up = new Vector3(0, 1, 0).addScaledVector(normal, -normal.y).normalize()
  const right = new Vector3().crossVectors(up, normal).normalize()
  const rotation = new Quaternion().setFromRotationMatrix(new Matrix4().makeBasis(right, up, normal))
  const pitch = mobile ? tangent.z * -.12 : tangent.y * .22
  const bank = tangent.y * (mobile ? .025 : .075) * direction
  return rotation.multiply(new Quaternion().setFromEuler(new Euler(pitch, 0, bank))).normalize()
}

const wavePath: WorksLayout = {
  id: 'wave-path',
  hover: { depth: .1, pitch: -.012, yaw: .024 },
  sample(progress, mobile, velocity) {
    const travel = clamp(progress / .8)
    const cursor = travel * (sequence.length - 1)
    const resolution = smooth((progress - .8) / .2)
    const focus = sequence[Math.round(cursor)]
    const poses = identities.map(item => {
      const distance = item.order - cursor
      const absolute = Math.abs(distance)
      // Mobile shows only the local partial arc. A quieter centre gives the
      // current artwork room, while neighbours retain real size above/below it.
      const pathDistance = mobile ? Math.sign(distance) * (absolute * .25 + absolute * absolute * .75) : distance
      const t = clamp(.5 + pathDistance / (mobile ? 6 : 6.7))
      const path = (mobile ? mobilePaths : desktop)[item.type]
      const position = path.getPoint(t)
      const readable = 1 - smooth((absolute - .08) / .95)
      // The paths meet in projection, but pass through separate depth lanes.
      // Neighbouring physical plates must never cut through one another.
      const crossingLane = item.type === 'album' ? (mobile ? .3 : .6) : -.85
      const crossing = 1 - smooth((absolute - .82) / .65)
      position.z += (crossingLane - position.z) * crossing
      if (mobile) position.y -= Math.sign(distance) * smooth((absolute - .9) / .4) * 1.2
      const quaternion = orientation(path, t, mobile, item.type === 'album' ? 1 : -1)
      quaternion.slerp(new Quaternion(), readable * .94)
      quaternion.multiply(new Quaternion().setFromEuler(new Euler(0, 0, Math.max(-.045, Math.min(.045, velocity * .025)) * (1 - resolution))))
      position.z += Math.min(.12, Math.abs(velocity) * .04) * readable * (1 - resolution)
      let opacity = 1 - smooth((absolute - (mobile ? 1.1 : 2.7)) / (mobile ? .5 : 1.1))
      const focusWidth = mobile ? (item.type === 'album' ? 1.76 : 1.56) : (item.type === 'album' ? 3.55 : 3.05)
      const scale = focusWidth * (mobile ? 1 : .7 + .3 * readable)
      const destination = new Vector3(item.type === 'album' ? -2.4 : 2.4, 1.6 - item.rank * 1.6, 0)
      if (mobile) destination.set(item.type === 'album' ? -.75 : .75, 1.2 - item.rank * 1.2, 0)
      position.lerp(destination, resolution)
      quaternion.slerp(new Quaternion(), resolution)
      opacity += (1 - opacity) * smooth(resolution / .6)
      return { position, quaternion: quaternion.normalize(), scale: scale + ((mobile ? .5 : 1) - scale) * resolution, opacity }
    })
    return { poses, focus, resolution, ambient: [.84, .82, .77] }
  },
}

export default wavePath
