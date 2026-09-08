/** Real runtime choices only. Inspection flags and one-variant features are deliberately absent. */
export const experienceRegistry = {
  portrait: { label: '07 사진과 소개', allowedValues: ['off', 'straight', 'hanji'], promotable: true },
  magnet: { label: '03·06 장면 자동 정렬', allowedValues: [false, true], promotable: true },
  worksLayout: { label: 'WORKS 구성', allowedValues: ['current', 'spatial-helix'], promotable: true },
  points: { label: '홈의 두 점', allowedValues: [false, true], promotable: false },
  janggu: { label: '소리의 응답', allowedValues: [false, true], promotable: false },
  type: { label: '재생 버튼 글자', allowedValues: [false, true], promotable: false },
  color: { label: '장구 색상', allowedValues: ['lacquer', 'burnt', 'rust'], promotable: false },
} as const

export type ExperienceKey = keyof typeof experienceRegistry
export type ExperienceOptions = { [K in ExperienceKey]: (typeof experienceRegistry)[K]['allowedValues'][number] }
export type PromotableKey = { [K in ExperienceKey]: (typeof experienceRegistry)[K]['promotable'] extends true ? K : never }[ExperienceKey]
export type PromotionOptions = Pick<ExperienceOptions, PromotableKey>
export const experienceKeys = Object.keys(experienceRegistry) as ExperienceKey[]
export const promotableKeys = experienceKeys.filter(key => experienceRegistry[key].promotable) as PromotableKey[]

export function experienceLabel(key: ExperienceKey, value: ExperienceOptions[ExperienceKey]) {
  if (key === 'portrait') return value === 'hanji' ? '한지 번짐 + 간략 프로필' : value === 'straight' ? '직선 전환 + 간략 프로필' : '이전 분할 구성'
  if (key === 'worksLayout') return value === 'spatial-helix' ? '공간 나선 아카이브' : '현재 에디토리얼'
  if (key === 'color') return value === 'lacquer' ? '옻빛 붉은색' : value === 'burnt' ? '구운 주홍색' : '짙은 적갈색'
  if (key === 'points') return value ? '공간을 흐르는 두 점' : '고정된 두 선'
  if (key === 'janggu') return value ? '해금과 장구' : '해금만'
  if (key === 'type') return value ? '글자 재조립' : '단어 단위 전환'
  return value ? '켜기' : '끄기'
}
