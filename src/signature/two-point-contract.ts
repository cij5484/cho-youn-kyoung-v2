/**
 * Site signature identity, audited against the existing HOME owners:
 * home/works-motion.ts (pair hue, headless 2.2px tail, 5.5 / 11 response),
 * interaction-prototype/tuning.ts (different instrument characters), and
 * sound/contact-motion.ts (approved Electric Violet / static marker scale).
 *
 * HOME keeps its own implementation. Page paths, clocks, intensity and choreography
 * are deliberately not shared: same two presences, different page-specific roles.
 */
export const twoPointContract = {
  version: 1,
  order: ['haegeum', 'janggu'],
  points: {
    haegeum: { name: 'Haegeum Point', color: '#6334E5', response: 5.5, character: 'flexible / sustained / curved' },
    janggu: { name: 'Janggu Point', color: '#A33D36', response: 11, character: 'measured / weighted / shorter turns' },
  },
  moving: {
    head: 'none', trailWidth: 2.2, widthRange: [.15, 2.2], trailMs: 2000,
    opacity: .76, fadeExponent: 1.15,
  },
  static: {
    desktop: { width: 10, height: 4.2 }, mobile: { width: 8, height: 3.6 }, opacity: .9,
  },
  accessibility: {
    decorative: true, ariaHidden: true, interceptsInput: false,
    reducedMotion: 'two stable markers; no paths, trails, pulse or ambient clock',
    visibility: 'retain both identities through the final visible page; suspend while hidden or outside the page',
  },
} as const

export type SignaturePointId = typeof twoPointContract.order[number]

/** Continuous target following; callers retain positions when changing page phases. */
export function signatureEase(current: number, target: number, seconds: number, response: number) {
  return current + (target - current) * (1 - Math.exp(-response * Math.max(0, Math.min(.1, seconds))))
}
