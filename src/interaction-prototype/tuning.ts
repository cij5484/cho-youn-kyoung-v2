/** P2K Lab candidates, never production defaults. Units are seconds, px and normalized scene space. */
export const interactionTuning = {
  home: { speed: .78, depth: .32, perspective: 1.8, headRadius: .65, headOpacity: .16,
    curvature: .17, convergence: 1.3, lockStart: .88, lockEnd: .98,
    trailMs: 1800, trailOpacity: .76, trailWidth: [1.2, 3.8] as const,
    sampleHzDesktop: 30, sampleHzMobile: 24, historyDesktop: 64, historyMobile: 48 },
  janggu: { idleSpeed: .36, playingSpeed: 1.12, radius: 15, idleRange: .29, playingRange: .43, depth: .13,
    activityResponse: .32, headRadius: 1.05, headOpacity: .28,
    jumpHeight: 43, jumpAttack: .045, returnDamping: .14, trailMs: 620,
    trailOpacity: .84, trailWidth: [1.6, 3.6] as const, sensitivity: .76,
    historyDesktop: 192, historyMobile: 128,
    colors: { lacquer: '#A33D36', burnt: '#AF4837', rust: '#8F332F' } },
  typography: { duration: 480, stagger: 32, entryDelay: 68, baselineDrift: 3, trackingShift: .018, maskDirection: -1 },
}
export type JangguColor = keyof typeof interactionTuning.janggu.colors
export const clamp = (v: number, lo = 0, hi = 1) => Math.max(lo, Math.min(hi, v))
export const mix = (a: number, b: number, p: number) => a + (b-a)*p
export function smooth(v: number, a = 0, b = 1) { const t=clamp((v-a)/(b-a)); return t*t*(3-2*t) }
