import type { ContentCatalog } from './models.ts'
import { jiYoungHeeSanjoCover, jiYoungHeeSanjoDraft } from './records/ji-young-hee-sanjo.server.ts'

// Actual source records, separate from fabricated fixtures. Never send this raw catalog to a client.
// Public consumers must use catalog.ts selectors with an explicit build instant.
// P1D registers one nonpublic draft; the neutral app's route/prerender catalog is unchanged.
export const contentCatalog = {
  albums: [jiYoungHeeSanjoDraft],
  performances: [], media: [], press: [], profiles: [], career: [],
  assets: [jiYoungHeeSanjoCover],
} as const satisfies ContentCatalog
