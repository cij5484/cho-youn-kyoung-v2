import yeongsan from '../home/assets/yeongsan-front.webp'
import pyeongjo from '../home/assets/pyeongjo-front.webp'
import pulgo from '../home/assets/pulgo-yeokda-poster.webp'
import sanjo from '../home/assets/sanjo-poster.webp'
import hanBeomSu from './assets/han-beom-su-front.webp'
import recital from './assets/haegeum-recital-poster.webp'
import type { WorkImage } from './catalog.ts'

// Reuse approved web derivatives directly, without importing HOME content/private data.
export const workImages: Record<WorkImage, { src: string; width: number; height: number }> = {
  yeongsan: { src: yeongsan, width: 1600, height: 1420 },
  pyeongjo: { src: pyeongjo, width: 1600, height: 1420 },
  hanBeomSu: { src: hanBeomSu, width: 1600, height: 1420 },
  pulgo: { src: pulgo, width: 1555, height: 2200 },
  sanjo: { src: sanjo, width: 1440, height: 2036 },
  recital: { src: recital, width: 1414, height: 2000 },
}
