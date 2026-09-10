import { workImages } from '../assets.ts'
import jiYoungHee from '../../home/assets/ji-young-hee-front.webp'
import type { AtmosphericImage } from './atmospheric-catalog.ts'

export const atmosphericImages: Record<AtmosphericImage, { src: string; width: number; height: number }> = {
  ...workImages,
  jiYoungHee: { src: jiYoungHee, width: 2048, height: 1834 },
}
