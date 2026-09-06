import head from '../hero/assets/portrait-instrument.webp'
import playing from './assets/haegeum-playing.webp'
import full from './assets/haegeum-editorial-ai.webp'

export type Point = readonly [number, number]
export interface InstrumentImage {
  src: string
  width: number
  height: number
  alt: string
  provenance: 'photograph' | 'ai-editorial'
  status: 'provisional' | 'approved'
}

// Asset-specific coordinates are normalized within the uncropped source, not physical measurements.
// Replace the full source, dimensions, landmarks and provenance here; the renderer/timeline stay unchanged.
export const instrumentAssets = {
  head: { src: head, width: 1024, height: 1536, alt: '보라 한복을 입은 조윤경 옆의 실제 해금 머리와 주아', provenance: 'photograph', status: 'provisional' } satisfies InstrumentImage,
  playing: { src: playing, width: 1024, height: 1536, alt: '조윤경이 연주하는 실제 해금의 두 현과 활이 만나는 부분', provenance: 'photograph', status: 'provisional' } satisfies InstrumentImage,
  full: { src: full, width: 1024, height: 1536, alt: '베이지 배경 해금 전체의 AI 생성 시각 참고 이미지. 실물 촬영 사진이 아님.', provenance: 'ai-editorial', status: 'provisional' } satisfies InstrumentImage,
  playingFocus: { contact: [.55, .59] as Point, body: [.714, .612] as Point },
  fullLandmarks: { body: [.53, .855] as Point, stringTop: [.405, .39] as Point, stringBottom: [.42, .86] as Point },
}

export function sourceDisclosure(image: InstrumentImage) {
  return image.provenance === 'ai-editorial' ? 'AI-GENERATED VISUAL STUDY' : image.status === 'provisional' ? 'PHOTOGRAPH · PROVISIONAL' : ''
}
