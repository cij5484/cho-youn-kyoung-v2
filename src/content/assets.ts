import type { Locales } from './shared.ts'

export type AssetKind = 'image' | 'audio' | 'video' | 'document' | 'model3d'
export type AssetLifecycle = 'provisional' | 'approved' | 'replace-required'
export interface AssetRef<K extends AssetKind = AssetKind> { readonly id: `asset:${string}`; readonly kind: K }
export interface AssetRecord {
  readonly id: `asset:${string}`
  readonly kind: AssetKind
  readonly lifecycle: AssetLifecycle
  // Opaque identity in a controlled source inventory, never private paths/credentials or binary data.
  readonly masterRef?: string
  readonly runtime?: {
    readonly url: string
    readonly mimeType: string
    readonly bytes?: number
    readonly width?: number
    readonly height?: number
  }
}
// Approval status only; consumers must also verify the source, intended use and runtime output.
export function isAssetApprovedForProduction(asset: AssetRecord): boolean {
  return asset.lifecycle === 'approved'
}
export interface ImageUse {
  readonly asset: AssetRef<'image'>
  readonly role: 'hero' | 'cover' | 'package' | 'poster-frame' | 'portrait' | 'gallery' | 'poster' | 'leaflet' | 'booklet'
  readonly alt: Locales<string>
  readonly aspectRatio?: { readonly width: number; readonly height: number }
  readonly mobile?: {
    readonly asset?: AssetRef<'image'>
    // Normalized crop rectangle; x/y + width/height must remain inside the original image.
    readonly crop?: { readonly x: number; readonly y: number; readonly width: number; readonly height: number }
  }
}
export type PlayableSource =
  | { readonly status: 'playable'; readonly asset: AssetRef<'audio'> }
  | { readonly status: 'unavailable' | 'coming-soon'; readonly reason: string }
export interface Download { readonly asset: AssetRef<'document'>; readonly label: Locales<string> }
export interface ArchiveItems {
  readonly poster?: ImageUse
  readonly leaflet?: ImageUse
  readonly gallery?: readonly ImageUse[]
  readonly videos?: readonly { readonly kind: 'media'; readonly id: `media:${string}` }[]
  readonly downloads?: readonly Download[]
}
