import { Euler, Quaternion, Vector3 } from 'three'
import { worksCatalog } from '../../catalog.ts'
import type { WorkImage } from '../../catalog.ts'
import type { WorksLayout } from '../variant.ts'

const clamp = (value: number) => Math.max(0, Math.min(1, value))
const smooth = (value: number) => { const t = clamp(value); return t * t * (3 - 2 * t) }
const mix = (from: number, to: number, amount: number) => from + (to - from) * amount
const identity = new Quaternion()
const rollAxis = new Vector3(0, 0, 1)
const ivory = [.957, .941, .910] as const

// Authored from the actual covers/posters: slate, ochre, ink, porcelain,
// sage and smoked amber. These are already diluted light temperatures.
const tones: Record<WorkImage, readonly [number, number, number]> = {
  yeongsan: [.921, .931, .937],
  pulgo: [.973, .926, .842],
  sanjo: [.915, .935, .955],
  pyeongjo: [.956, .941, .957],
  hanBeomSu: [.907, .947, .917],
  recital: [.957, .919, .868],
}

// Each work has its own approach and exit direction. No shared circle, orbit
// or alternating left/right track: the next surface is already inside the room.
const anchors = [
  { x: -2.3, y: .52, exitX: -3.2, exitY: .75, pitch: -.11, yaw: -.40, roll: .025 },
  { x: 2.85, y: .78, exitX: 3.4, exitY: -.55, pitch: .09, yaw: .42, roll: -.035 },
  { x: -2.72, y: -.58, exitX: -3.0, exitY: -1.05, pitch: .045, yaw: -.46, roll: .055 },
  { x: 2.12, y: -1.04, exitX: 3.2, exitY: .75, pitch: -.10, yaw: .33, roll: -.045 },
  { x: .85, y: 1.05, exitX: -2.6, exitY: 1.18, pitch: .075, yaw: .25, roll: .028 },
  { x: -2.45, y: .65, exitX: 2.85, exitY: -.9, pitch: -.045, yaw: -.37, roll: -.05 },
] as const
const ranks = { album: 0, performance: 0 }
const archiveSlots = worksCatalog.map(record => ({ column: record.type === 'album' ? -1 : 1, row: ranks[record.type]++ }))

function corridorCursor(progress: number) {
  const travel = clamp(progress / .8)
  // Arrive at the final focus with zero speed before the depth flattens.
  if (travel <= .88) return travel * (worksCatalog.length - 1)
  const u = (travel - .88) / .12
  return (.88 + .12 * (u + u * u - u * u * u)) * (worksCatalog.length - 1)
}

/** Actual perspective travel through offset surfaces. Size remains constant
 * during the corridor; apparent enlargement comes from Z, not scale pulsing. */
const zDepth: WorksLayout = {
  id: 'z-depth',
  hover: { depth: .12, pitch: -.012, yaw: .018 },
  sample(progress, mobile, velocity) {
    const p = clamp(progress)
    const cursor = corridorCursor(p)
    const resolution = smooth((p - .8) / .2)
    const poses = worksCatalog.map((record, index) => {
      const anchor = anchors[index]
      const distance = index - cursor
      const ahead = Math.max(0, distance)
      const passed = Math.max(0, -distance)
      const near = Math.exp(-Math.pow(distance / .69, 4))
      const approach = smooth(ahead / 1.16)
      const depart = smooth(passed / 1.28)
      let position: Vector3
      let opacity: number

      if (mobile) {
        // An independently composed, shallow vertical corridor. Previous and
        // next occupy the margins of the current surface, never a tiny gallery.
        position = new Vector3(
          anchor.x * .042 + anchor.x * .09 * Math.tanh(distance),
          -1.46 * Math.tanh(distance * .65),
          .18 - 1.85 * distance * distance / (.8 + Math.abs(distance)),
        )
        opacity = 1 - smooth((Math.abs(distance) - 1.12) / .74)
      } else {
        position = new Vector3(
          mix(anchor.x * .065, anchor.x, approach) + anchor.exitX * depart,
          mix(anchor.y * .12, anchor.y, approach) + anchor.exitY * depart,
          .55 - ahead * 2.3 - passed * 1.45 - depart * .55,
        )
        // Keep a small group of real surfaces in the room, without making all
        // six equal-priority cards or leaving finished works at the camera.
        opacity = (1 - smooth((ahead - 3.05) / 1.2)) * (1 - smooth((passed - 1.1) / 1.8))
      }

      const orientation = new Quaternion().setFromEuler(new Euler(anchor.pitch, anchor.yaw, anchor.roll))
      const exit = new Quaternion().setFromEuler(new Euler(-anchor.pitch * .8, -Math.sign(anchor.exitX) * .62, anchor.roll * -1.6))
      orientation.slerp(exit, depart).slerp(identity, near * .93)
      const bank = Math.max(-.026, Math.min(.026, velocity * .014)) * (1 - near * .85) * (1 - resolution)
      orientation.multiply(new Quaternion().setFromAxisAngle(rollAxis, bank))

      const slot = archiveSlots[index]
      const archive = new Vector3(slot.column * (mobile ? .75 : 2.4), (1 - slot.row) * (mobile ? 1.2 : 1.6), 0)
      position.lerp(archive, resolution)
      orientation.slerp(identity, resolution).normalize()
      const width = mobile ? (record.type === 'album' ? 1.76 : 1.56) : (record.type === 'album' ? 3.55 : 3.02)
      return { position, quaternion: orientation, scale: mix(width, mobile ? .5 : 1, resolution), opacity: mix(opacity, 1, resolution) }
    })

    // Overlapping temperature weights avoid a color cut when the DOM title
    // advances. The shell uses this only as contextual ambient light.
    const ambient: [number, number, number] = [0, 0, 0]
    let total = 0
    worksCatalog.forEach((record, index) => {
      const weight = Math.exp(-Math.pow((index - cursor) / .94, 2))
      total += weight
      tones[record.image].forEach((value, channel) => { ambient[channel] += value * weight })
    })
    ambient.forEach((value, channel) => { ambient[channel] = mix(value / total, ivory[channel], resolution) })
    return { poses, focus: Math.min(worksCatalog.length - 1, Math.round(cursor)), resolution, ambient }
  },
}

export default zDepth
