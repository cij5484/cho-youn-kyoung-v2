export type SoundScrollGeometry = { travel: number; hold: number }

/** A mobile end hold adds physical space after the unchanged 155 + 80svh timeline. */
export function soundScrollGeometry(actualTravel: number, haegeumOffset: number, mobilePacing: boolean): SoundScrollGeometry {
  const actual = Math.max(1, actualTravel)
  if (!mobilePacing || !Number.isFinite(haegeumOffset) || haegeumOffset <= 0) return { travel: actual, hold: 0 }
  const travel = Math.min(actual, haegeumOffset * 235 / 155)
  return { travel, hold: actual - travel }
}

export function measureSoundScrollGeometry(scene: HTMLElement, stage: HTMLElement): SoundScrollGeometry {
  const actualTravel = scene.offsetHeight - stage.offsetHeight
  // CSS explicitly opts in only at the mobile breakpoint with motion enabled.
  // An absent marker keeps every existing desktop/Lab destination and denominator unchanged.
  const mobilePacing = getComputedStyle(scene).getPropertyValue('--sound-mobile-pacing').trim() === '1'
  if (!mobilePacing) return soundScrollGeometry(actualTravel, 0, false)
  const region = scene.parentElement?.querySelector<HTMLElement>('.sound-region')
  return soundScrollGeometry(actualTravel, region?.offsetTop ?? 0, true)
}

/** LISTEN, Revisit and SceneMagnet share one canonical landing; this never starts audio. */
export function soundFocusFrame(geometry: SoundScrollGeometry, stageHeight: number, obstruction: number) {
  if (geometry.hold > 0) return { offset: geometry.travel + geometry.hold / 2, progress: 1 }
  const margin = Math.min(stageHeight * .015, Math.max(0, stageHeight * .37 - obstruction) * .08)
  return { offset: geometry.travel - margin, progress: 1 - margin / geometry.travel }
}
