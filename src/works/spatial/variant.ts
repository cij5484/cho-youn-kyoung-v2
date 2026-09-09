import type { Quaternion, Vector3 } from 'three'

export type WorksVariant = 'z-depth' | 'wave-path' | 'stack-flow'
export interface WorkPose {
  position: Vector3
  quaternion: Quaternion
  /** World-space width; the shared shell preserves each artwork's native aspect. */
  scale: number
  opacity: number
}
export interface VariantFrame {
  /** Original worksCatalog order, always six entries. */
  poses: WorkPose[]
  focus: number
  resolution: number
  /** Subtle contextual light, in normalized sRGB; no asset extraction at runtime. */
  ambient: readonly [number, number, number]
}
export interface WorksLayout {
  id: WorksVariant
  sample: (progress: number, mobile: boolean, velocity: number) => VariantFrame
  hover: { depth: number; pitch: number; yaw: number }
}
