import { Matrix4, Quaternion, Vector3 } from 'three'
import type { WorkType } from '../catalog.ts'

export interface SpatialPlacement { index: number; type: WorkType; rank: number; parameter: number; phase: number; focusAngle: number; order: number }
export const spatialTuning = {
  spacing: 2.35,
  desktop: { radius: 3.35, pitch: .43, cameraZ: 13.8, fov: 38, albumWidth: 3.55, posterWidth: 3.05, dpr: 1.5 },
  mobile: { radius: 1.16, pitch: .74, cameraZ: 9.4, fov: 40, albumWidth: 1.8, posterWidth: 1.48, dpr: 1.25 },
  resolveStart: .8,
} as const

export const clamp01 = (value: number) => Math.max(0, Math.min(1, value))
const smooth = (value: number) => { const v = clamp01(value); return v * v * (3 - 2 * v) }

export function spatialPlacements(types: readonly WorkType[]): SpatialPlacement[] {
  const ranks = { album: 0, performance: 0 }
  const placements = types.map((type, index) => {
    const rank = ranks[type]++
    const parameter = rank * spatialTuning.spacing
    const phase = type === 'album' ? 0 : Math.PI
    return { index, type, rank, parameter, phase, focusAngle: parameter + phase, order: 0 }
  })
  ;[...placements].sort((a, b) => a.focusAngle - b.focusAngle).forEach((item, order) => { item.order = order })
  return placements
}

/** Uneven angular gaps belong to the two strands, but mobile viewing slots must
 * have even spacing so the active artwork never disappears between those gaps. */
export function spatialCursor(angle: number, placements: readonly SpatialPlacement[]): number {
  const ordered = [...placements].sort((a, b) => a.order - b.order)
  for (let index = 0; index < ordered.length - 1; index += 1) {
    const a = ordered[index]
    const b = ordered[index + 1]
    if (angle <= b.focusAngle) return index + (angle - a.focusAngle) / (b.focusAngle - a.focusAngle)
  }
  return ordered.length - 1
}

export function spatialTimeline(progress: number, placements: readonly SpatialPlacement[]) {
  const last = Math.max(...placements.map(item => item.focusAngle), 1)
  return {
    angle: clamp01(progress / spatialTuning.resolveStart) * last,
    resolution: smooth((progress - spatialTuning.resolveStart) / (1 - spatialTuning.resolveStart)),
  }
}

export function focusedPlacement(angle: number, placements: readonly SpatialPlacement[]): number {
  return [...placements].sort((a, b) => Math.abs(a.focusAngle - angle) - Math.abs(b.focusAngle - angle))[0]?.index ?? 0
}

export function nearestPlacements(angle: number, placements: readonly SpatialPlacement[]): number[] {
  return [...placements].sort((a, b) => Math.abs(a.focusAngle - angle) - Math.abs(b.focusAngle - angle)).slice(0, 3).map(item => item.index)
}

/** Two phase-separated helices. Z is the true radial face normal; the tangent
 * and binormal supply a continuously changing object basis, not a billboard. */
export function spatialPose(item: SpatialPlacement, angle: number, resolution: number, mobile: boolean, velocity = 0, cursor?: number) {
  const tuning = mobile ? spatialTuning.mobile : spatialTuning.desktop
  const parameter = item.parameter - angle
  const theta = parameter + item.phase + Math.PI / 2
  const radial = new Vector3(Math.cos(theta), 0, Math.sin(theta))
  const tangent = new Vector3(-tuning.radius * Math.sin(theta), -tuning.pitch, tuning.radius * Math.cos(theta)).normalize()
  const up = new Vector3().crossVectors(tangent, radial).normalize()
  const right = new Vector3().crossVectors(up, radial).normalize()
  const basis = new Matrix4().makeBasis(right, up, radial)
  const quaternion = new Quaternion().setFromRotationMatrix(basis).normalize()
  const delta = item.focusAngle - angle
  const slot = cursor === undefined ? delta / spatialTuning.spacing : item.order - cursor
  const readability = cursor === undefined ? Math.exp(-Math.pow(delta / .82, 4)) : 1 - smooth((Math.abs(slot) - .16) / .84)
  quaternion.slerp(new Quaternion(), readability * .96)
  const bank = Math.max(-.045, Math.min(.045, velocity * .018)) * (1 - resolution)
  quaternion.multiply(new Quaternion().setFromAxisAngle(new Vector3(0, 0, 1), bank))
  const position = radial.clone().multiplyScalar(tuning.radius)
  position.y = -tuning.pitch * parameter
  position.y += (-.12 - position.y) * readability * .79
  let visibility = 1
  if (cursor !== undefined) {
    // Preserve radial rotation while separating adjacent physical plates in Z.
    // The front artwork is always in front of the complete side/back silhouette.
    position.z += readability * (mobile ? .22 : .55) - (1 - readability) * (mobile ? 2.7 : 2.15)
    if (mobile) {
      const distance = Math.abs(slot)
      const travel = distance * .18 + Math.pow(Math.max(0, distance - .23), 1.35) * 1.45
      position.y = -.05 - Math.sign(slot) * travel
      position.x *= 1 - readability * .8
      visibility = 1 - smooth((distance - 1.08) / .55)
    }
  }

  const resolved = new Vector3(item.type === 'album' ? -2.55 : 2.55, 2.05 - item.rank * 2.05, 0)
  if (mobile) resolved.set(item.type === 'album' ? -.85 : .85, 1.55 - item.rank * 1.5, 0)
  position.lerp(resolved, resolution)
  visibility += (1 - visibility) * smooth(resolution / .65)
  quaternion.slerp(new Quaternion(), resolution)
  const width = item.type === 'album' ? tuning.albumWidth : tuning.posterWidth
  const scale = width * (1 - resolution * (mobile ? .64 : .52))
  return { position, quaternion: quaternion.normalize(), scale, visibility, readability, radial, tangent, up }
}

export function dampValue(current: number, target: number, elapsedSeconds: number, speed = 11): number {
  return current + (target - current) * (1 - Math.exp(-speed * Math.max(0, Math.min(.06, elapsedSeconds))))
}
