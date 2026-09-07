import { sampleAudioFeatures, type AudioFeatureData } from '../audio/features.ts'
import { createBowContact } from './bow-contact.ts'
import { createLineResponse } from './line-response.ts'

/** Shared visual owner. The host owns native media state/time, scheduling and route lifecycle. */
export function createBowChoreographyEngine(root: HTMLElement, holders: HTMLElement[], mobile: () => boolean, features: AudioFeatureData | null) {
  const strings = createLineResponse(holders, mobile), bow = createBowContact(root, holders, mobile)
  root.dataset.audioFeatures = features ? features.trackId : 'live-only'
  root.dataset.audioFeatureTime = 'inactive'
  return {
    configure: bow.configure,
    sample(samples: Float32Array<ArrayBuffer> | null, dt: number, currentTime: number) {
      const frame = samples && features ? sampleAudioFeatures(features, currentTime) : null
      root.dataset.audioFeatureTime = frame ? currentTime.toFixed(3) : 'inactive'
      bow.sample(samples, dt, frame)
      return strings.paint(samples, dt, false)
    },
    paint: bow.paint,
    reset() { strings.reset(); bow.reset(); root.dataset.audioFeatureTime = 'inactive' },
    destroy() { strings.destroy(); bow.destroy() },
  }
}
