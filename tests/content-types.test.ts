import type { AssetRecord, AssetRef, PlayableSource } from '../src/content/assets.ts'
import type { PerformanceVisualMode, Profile } from '../src/content/models.ts'
import type { ContentRef, Edition, Publication } from '../src/content/shared.ts'
import { neutralCatalog } from '../src/content/fixtures.ts'

// Compiled by the existing strict TypeScript project. Not executed as a mutation test.
export function compileOnlyContractChecks() {
  // @ts-expect-error Asset approval must never be inferred from an omitted lifecycle.
  const missingLifecycle: AssetRecord = { id: 'asset:x', kind: 'image' }
  // @ts-expect-error Do not grow an implicit asset state system outside the contract.
  const unknownLifecycle: AssetRecord = { id: 'asset:x', kind: 'image', lifecycle: 'final' }
  // @ts-expect-error Machine output cannot be a reviewed edition.
  const machineReview: Edition<string> = { source: 'machine-assisted', status: 'reviewed', value: 'x', provenance: { sourceRef: 'fixture:x', author: 'fixture' }, review: { reviewer: 'fixture', reviewedAt: '2026-09-05T00:00:00Z' } }
  // @ts-expect-error Reviewed human copy needs provenance and reviewer evidence.
  const missingReview: Edition<string> = { source: 'authored', status: 'reviewed', value: 'x' }
  // @ts-expect-error Playable requires an audio asset; no fake playback clock.
  const silentPlayback: PlayableSource = { status: 'playable' }
  // @ts-expect-error A performance ref cannot hold an album identity.
  const wrongReference: ContentRef = { kind: 'performance', id: 'album:x' }
  // @ts-expect-error Musical category is not a display mode.
  const musicalMode: PerformanceVisualMode = 'sanjo'
  // @ts-expect-error Detail's descriptive label is not a second enum.
  const descriptiveMode: PerformanceVisualMode = 'photo-led'
  // @ts-expect-error A scheduled publication needs an explicit timestamp.
  const schedule: Publication = { status: 'scheduled' }
  // @ts-expect-error Audio cannot be used as an image asset reference.
  const image: AssetRef<'image'> = { id: 'asset:x', kind: 'audio' }
  // @ts-expect-error Profile needs a biography, not only a generic title.
  const profile: Profile['content']['ko']['value'] = { title: 'x', shortIntroduction: 'x' }
  // @ts-expect-error Canonical data arrays are readonly.
  neutralCatalog.albums.push(neutralCatalog.albums[0])
  return [missingLifecycle, unknownLifecycle, machineReview, missingReview, silentPlayback, wrongReference, musicalMode, descriptiveMode, schedule, image, profile]
}
