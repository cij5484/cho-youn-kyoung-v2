export type MagnetScene = 'sound' | 'performance'
export type MagnetVisit = { scene: MagnetScene | null; consumed: boolean }
export type MagnetTarget = { scene: MagnetScene; top: number; radius: number; leaveRadius: number; ready: boolean }

/** Existing authored windows; this experiment does not change either timeline or section height. */
export const magnetTuning = {
  performanceFrame: .315, // Midpoint of the existing .24–.39 full-stage viewing window.
  inputQuiet: 360,
  scrollQuiet: 200,
  rapidQuiet: 650,
  rapidSpeed: 1.1, // CSS pixels/ms: passing through a scene must never turn into a stop.
  maximumAlignment: 1100,
} as const

export function magnetTargetAt(targets: MagnetTarget[], top: number, leaving = false) {
  return targets.filter(target => Math.abs(target.top - top) <= (leaving ? target.leaveRadius : target.radius))
    .sort((a, b) => Math.abs(a.top - top) - Math.abs(b.top - top))[0] ?? null
}

/** Cancellation and completion consume one visit. Small movements cannot immediately re-arm it. */
export function visitMagnet(visit: MagnetVisit, scene: MagnetScene | null): MagnetVisit {
  return visit.scene === scene ? visit : { scene, consumed: false }
}

export function consumeMagnet(visit: MagnetVisit): MagnetVisit {
  return { ...visit, consumed: true }
}

export function mayAlignMagnet(state: {
  target: MagnetTarget | null; visit: MagnetVisit; top: number; now: number;
  lastInput: number; lastScroll: number; lastRapid: number;
  armed: boolean; held: boolean; priority: boolean; reduced: boolean; zoomed: boolean; hidden: boolean;
}) {
  const { target } = state
  return !!target && target.ready && state.visit.scene === target.scene && !state.visit.consumed
    && state.armed && !state.held && !state.priority && !state.reduced && !state.zoomed && !state.hidden
    && Math.abs(target.top - state.top) > 2 && Math.abs(target.top - state.top) <= target.radius
    && state.now - state.lastInput >= magnetTuning.inputQuiet
    && state.now - state.lastScroll >= magnetTuning.scrollQuiet
    && state.now - state.lastRapid >= magnetTuning.rapidQuiet
}

export function magnetSettlement(distance: number, elapsed: number, stillFor: number) {
  if (Math.abs(distance) <= 2 && stillFor >= 80) return 'aligned'
  if (elapsed >= magnetTuning.maximumAlignment) return 'cancelled'
  return 'aligning'
}
