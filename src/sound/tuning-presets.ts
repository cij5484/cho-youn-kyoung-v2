/** Genre presets are future authored tuning, not hard-coded Sanjo/Jeongak choreography. */
export interface BowTuningPreset {
  featureDriven: boolean
  activityGain: number
  onsetSensitivity: number
  spectralFluxSensitivity: number
  pitchInfluence: number
  pitchMinMidi: number
  pitchMaxMidi: number
  horizontalRange: number
  verticalRange: number
  maxSpeed: number
  acceleration: number // milliseconds for the velocity-preserving follower
  reversalResponse: number
  attack: number
  release: number
  rangeResponse: number
  phraseResponse: number
  horizontalActivity: number
  trailGain: number
  liveEnergyBlend: number
}
export const tuningPresets = {
  HOME_SIGNATURE: {
    featureDriven: true, activityGain: 1.65, onsetSensitivity: 1.25, spectralFluxSensitivity: .7,
    pitchInfluence: 0, pitchMinMidi: 45, pitchMaxMidi: 88,
    horizontalRange: 1, verticalRange: 1, maxSpeed: 3.4, acceleration: 48, reversalResponse: 1.15,
    attack: 18, release: 180, rangeResponse: 160, phraseResponse: 650, horizontalActivity: .15,
    trailGain: .2, liveEnergyBlend: .12,
  },
  B2_REFERENCE: {
    featureDriven: false, activityGain: 1, onsetSensitivity: 0, spectralFluxSensitivity: 0,
    pitchInfluence: 0, pitchMinMidi: 45, pitchMaxMidi: 88,
    horizontalRange: 1, verticalRange: 1, maxSpeed: 3.4, acceleration: 160, reversalResponse: 1,
    attack: 90, release: 90, rangeResponse: 300, phraseResponse: 700, horizontalActivity: .06,
    trailGain: 0, liveEnergyBlend: 1,
  },
} as const satisfies Record<string, BowTuningPreset>
export type BowPresetName = keyof typeof tuningPresets
