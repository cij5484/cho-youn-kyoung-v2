import type { AssetRecord, AssetRef, ArchiveItems, Download, ImageUse, PlayableSource } from './assets.ts'
import type { ContentDate, ContentRef, Copy, ListingPresentation, Locales, RecordBase } from './shared.ts'

export type MusicalCategory = 'sanjo' | 'jeongak' | 'contemporary' | 'mixed' | 'other'
// User-approved P1A naming: Detail's *-led labels are descriptive aliases, not extra enum members.
export type PerformanceVisualMode = 'photo' | 'poster' | 'video-still' | 'editorial' | 'typography'

export interface Track {
  readonly id: string
  readonly number: number
  readonly content: Locales<{ readonly title: string; readonly note?: string }>
  readonly durationSeconds?: number
  readonly source: PlayableSource
}
export interface Credit {
  readonly id: string
  readonly content: Locales<{ readonly name: string; readonly role: string; readonly biography?: string }>
  readonly portrait?: ImageUse
}
export interface AlbumCopy extends Copy { readonly summary: string; readonly story?: string; readonly artistNote?: string }
export interface Album extends RecordBase<'album', AlbumCopy> {
  readonly category: MusicalCategory
  readonly release: { readonly status: 'upcoming' | 'released' | 'unavailable'; readonly date: ContentDate }
  readonly productNumber?: string
  readonly tracks: readonly Track[]
  readonly credits: readonly Credit[]
  readonly booklet?: { readonly pages: readonly ImageUse[]; readonly download?: Download }
  readonly presentation: ListingPresentation & {
    readonly cover: ImageUse
    readonly packageVisuals?: readonly ImageUse[]
    readonly object3d?: { readonly asset: AssetRef<'model3d'>; readonly geometryProfileRef?: string; readonly displayProfileRef?: string }
  }
}
export interface PerformanceCopy extends Copy {
  readonly summary: string
  readonly venue: string
  readonly location?: string
  readonly artistNote?: string
  readonly pullQuote?: string
  readonly programNotes?: string
}
export interface ProgramItem {
  readonly id: string
  readonly content: Locales<{ readonly title: string; readonly note?: string; readonly composer?: string }>
  readonly durationSeconds?: number
}
export interface Performance extends RecordBase<'performance', PerformanceCopy> {
  readonly category: MusicalCategory
  readonly event: {
    readonly status: 'scheduled' | 'cancelled' | 'postponed'
    readonly date: ContentDate
    readonly endDate?: string
    readonly time?: { readonly localStart: string; readonly timeZone: string }
  }
  readonly program: readonly ProgramItem[]
  readonly cast: readonly Credit[]
  readonly archive?: ArchiveItems
  readonly presentation: ListingPresentation & {
    readonly visualMode: PerformanceVisualMode
    readonly hero?: ImageUse
    readonly secondaryVisual?: ImageUse
  }
}
interface MediaBase extends RecordBase<'media', Copy> {
  readonly date: ContentDate
  readonly category: 'film' | 'performance' | 'portrait'
  readonly presentation: ListingPresentation & { readonly aspectRatio: { readonly width: number; readonly height: number } }
}
export type Media = MediaBase & (
  | { readonly type: 'youtube'; readonly source: { readonly videoId: string }; readonly poster: ImageUse }
  | { readonly type: 'video'; readonly source: AssetRef<'video'>; readonly poster: ImageUse }
  | { readonly type: 'image'; readonly source: ImageUse }
)
export interface Press extends RecordBase<'press', Copy> {
  readonly date: ContentDate
  readonly outlet: string
  readonly url: string
  readonly language: string
  readonly presentation?: ListingPresentation
}
export interface ProfileCopy extends Copy {
  readonly shortIntroduction: string
  readonly biography: string
  readonly currentRole?: string
}
export interface Profile extends RecordBase<'profile', ProfileCopy> {
  readonly selectedPerformances: readonly ContentRef<'performance'>[]
  readonly portraits: readonly ImageUse[]
  readonly presentation?: ListingPresentation
}
// Flat entries keep CV growth out of a monolithic profile object; profile owns them by stable ID.
export interface CareerEntry {
  readonly id: string
  readonly profileId: `profile:${string}`
  readonly kind: 'milestone' | 'education' | 'appointment' | 'award'
  readonly date: ContentDate
  readonly endDate?: ContentDate
  readonly content: Locales<{ readonly title: string; readonly organization?: string; readonly description?: string }>
  readonly presentation?: ListingPresentation
}
export type ContentRecord = Album | Performance | Media | Press | Profile
export interface ContentCatalog {
  readonly albums: readonly Album[]
  readonly performances: readonly Performance[]
  readonly media: readonly Media[]
  readonly press: readonly Press[]
  readonly profiles: readonly Profile[]
  readonly career: readonly CareerEntry[]
  readonly assets: readonly AssetRecord[]
}
