import { workImages } from '../assets.ts'
import jiYoungHee from '../../home/assets/ji-young-hee-front.webp'
import yeongsanMobile from '../assets/yeongsan-front-mobile.webp'
import pyeongjoMobile from '../assets/pyeongjo-front-mobile.webp'
import hanBeomSuMobile from '../assets/han-beom-su-front-mobile.webp'
import pulgoMobile from '../assets/pulgo-yeokda-poster-mobile.webp'
import sanjoMobile from '../assets/sanjo-poster-mobile.webp'
import recitalMobile from '../assets/haegeum-recital-poster-mobile.webp'
import jiYoungHeeMobile from '../assets/ji-young-hee-front-mobile.webp'
import type { AtmosphericImage } from './atmospheric-catalog.ts'

export const atmosphericImages: Record<AtmosphericImage, { src: string; mobileSrc: string; width: number; height: number }> = {
  yeongsan: { ...workImages.yeongsan, mobileSrc: yeongsanMobile },
  pyeongjo: { ...workImages.pyeongjo, mobileSrc: pyeongjoMobile },
  hanBeomSu: { ...workImages.hanBeomSu, mobileSrc: hanBeomSuMobile },
  pulgo: { ...workImages.pulgo, mobileSrc: pulgoMobile },
  sanjo: { ...workImages.sanjo, mobileSrc: sanjoMobile },
  recital: { ...workImages.recital, mobileSrc: recitalMobile },
  jiYoungHee: { src: jiYoungHee, mobileSrc: jiYoungHeeMobile, width: 2048, height: 1834 },
}
