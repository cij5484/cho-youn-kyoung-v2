# P1A — Content / Data Schema Contract

2026-09-06 · P1A contract / P1C mapping approved; P1D registers one actual private KO draft. No public content or page implementation.
This document owns content addition policy; executable types are in [src/content](../../../src/content/models.ts).
It extends, and does not replace, the [P0D Locale Contract](LOCALE-METADATA-CONTRACT.md).

## Ownership and files

| File | Responsibility |
|---|---|
| [shared.ts](../../../src/content/shared.ts) | Stable identity, authored locale edition/provenance/review, date precision, publication, links and common copy |
| [assets.ts](../../../src/content/assets.ts) | Master/runtime references, image use/mobile crop/alt, honest audio availability, downloads/archive references |
| [models.ts](../../../src/content/models.ts) | Five separate domains, flat career entries and catalog; no giant optional-everything record |
| [validation.ts](../../../src/content/validation.ts) | Typed-data semantic checks: IDs/slugs, refs, dates, publication, copy, visuals and audio source |
| [catalog.ts](../../../src/content/catalog.ts) | Public indexes, direct related records, semantic detail routes/prerender paths and day-level event period |
| [fixtures.ts](../../../src/content/fixtures.ts) | Fabricated examples only: one record per domain and one additional album/performance/media/press |
| [records/ji-young-hee-sanjo.server.ts](../../../src/content/records/ji-young-hee-sanjo.server.ts) | P1C-mapped actual KO draft and its provisional cover source reference; no runtime asset |
| [registry.server.ts](../../../src/content/registry.server.ts) | Explicit real-record registration, separate from fixtures; raw source registry must not enter client data |
| [draft tests](../../../tests/draft-content.test.ts), [artifact checks](../../../tests/assert-draft-artifacts.ts) | Approved mapping parity, public/locale exclusion and complete emitted client/static output checks |
| [content tests](../../../tests/content-contract.test.ts), [compile tests](../../../tests/content-types.test.ts) | Positive/negative growth and contract regression; invalid type examples must remain compile errors |

Content facts, media references and `presentation` are separate. Shared fields compose each domain,
not a per-work React component or a schema containing CSS/camera/lighting values. Profile career entries
are a flat ID-owned collection instead of a deeply nested CV. Separate Person/CMS/graph systems are not built.

## Identity, required fields and domain ownership

Stable IDs are namespaced (`album:...`, `performance:...`, `media:...`, `press:...`, `profile:...`);
relations discriminate `kind` and matching ID. IDs do not change when titles/translations change.
Slug is separate, lowercase ASCII kebab-case, unique within its domain; it must not be inferred from titles
on every build. Existing public slug changes require a separately approved compatibility policy.
The `/album/:id` and `/performance/:id` route parameter names stay unchanged; their values will be public slugs.

All records require kind/id/slug/publication and KO edition with a title. EN is optional. Album/Performance
also require summary for metadata; Press summary is optional. Types in models.ts are the full field list.

| Domain | Required domain fields / supported optional content |
|---|---|
| Album | Musical category, release status/date precision, ordered tracks, credits, cover; supports subtitle/story/artist note, measured duration, source availability, product number, package/mobile visuals, booklet pages + download, streaming links, related records and 3D/geometry/display references |
| Performance | Category, event date/status, locale venue, program/cast arrays, visualMode; supports subtitle/location/note/quote/program notes, collaborator biographies, hero/secondary/mobile visuals, poster/leaflet/gallery/videos/downloads/tickets/related |
| Media | Date precision, category, discriminated source and aspect ratio; YouTube has source.videoId + required poster, local video has video asset ref + poster, image/portrait has ImageUse; common copy/featured/related fields |
| Press | Date precision, outlet, external URL, source language; title and optional summary/featured/relations. Source language is separate from authored KO/EN display copy. Press stays in MEDIA's lower Editorial Index, no new press detail route |
| Profile/About | Short introduction, full biography, selected performance refs and portraits; current role optional. Flat career entries cover milestone, education, appointment and award, with organization/detail/date/selection fields |

Empty arrays represent genuinely absent sections; unknown duration/date is not a fake zero or invented fact.
Schema support does not mean an optional reader/player/3D/UI feature has been implemented.

## Publication, chronology and ordering

`publication.status` is independent from release/event/media status:

| Publication | Public-index / detail-route policy |
|---|---|
| draft | Excluded, even if some copy is reviewed |
| scheduled | Eligible only when publishAt is at/before the explicitly provided build instant; timestamp must include timezone |
| published | Eligible, with reviewed authored KO |
| archived | Remains public; preserves archival information/URLs |
| unavailable | Excluded; do not use this to hide an album merely because audio is unavailable |

Public records without reviewed KO fail validation rather than publish an English-only page. Domain states
do not override publication: Album release uses upcoming/released/unavailable. Performance event uses
scheduled/cancelled/postponed. `performancePeriod()` derives upcoming/past for an explicitly supplied local
calendar day (the event/end day remains upcoming through that day); partial dates yield undetermined.
Cancellation/postponement retains its explicit label. This is a day-level policy, not an exact live-event clock.

P1D's **private draft** means excluded from website public selectors, routes, metadata and deployed client/static
output. It is not confidential storage: this repository is public, and source/docs can be read after a push.
Do not put private masters, credentials or other confidential data into source records.

Dates preserve unknown/year/month/day precision; `contentYear()` derives the year without fabricating a month/day.
Time is optional and carries localStart + timeZone; precise-date validation is required when used. No Date.now()
is hidden in selectors. A consumer supplies the same build instant for generated HTML and hydration; scheduling
requires an explicit rebuild later, not a browser-only publishing timer or a new automation in P1A.

`contentIndex()` sorts explicit presentation.order then stable ID. Featured is independent. It does not invent
chronological precision; a future chronology UI uses the date contract with its separately reviewed display policy.

## Locale and metadata

`Edition<T>` reuses P0D's source/status union and adds sourceRef/author plus required reviewer/reviewedAt
for reviewed content. Authored drafts and machine-assisted drafts can be retained but are not public translations.
Only authored + reviewed is eligible. Neutral fixture reviewer/source names prove shape, not real human content review.

Review is edition-level, avoiding a huge per-field translation-state tree. Every translatable field is inside
a KO/EN edition (including track/program/credit/alt/download labels). Optional-field absence is explicit undefined;
`localizedField(copy, lang, key)` reports available/missing/unreviewed and never substitutes Korean text into EN.
Templates must use eligible edition/field selection for nested copy; do not blindly dump draft objects into UI.
Changing any authored field invalidates that edition's review operationally; schema types cannot police human edits.

Missing/draft EN has no route/hreflang. P0D language switching stays on the same Korean item with unavailable,
never HOME. A reviewed EN edition may omit optional sections rather than silently borrow Korean text. Public
visuals require reviewed, nonempty alt for every published record language. No real translation was authored here.

Album/Performance metadata defaults to localized title/summary, with optional title/description overrides.
Canonical, lang, reciprocal hreflang/x-default and basic OG come from existing P0D helpers. Overrides cannot
change URL identity. Rich OG image/body/template integration remains a later owner task, not final SEO copy.

## Assets and relationships

Asset records contain IDs/kinds, optional opaque masterRef and optional optimized runtime URL/MIME/size/dimensions.
They also require one `lifecycle` field; no separate asset workflow/state system is introduced.
Master refs identify a controlled inventory; never embed private filesystem paths, secrets, binaries or base64 data.
Production source/master storage is not implemented. Relative runtime paths are public-root-relative, without a
leading slash; consumers prepend central deployment base. Absolute HTTPS CDN URLs stay absolute. Protocol,
path traversal, reference kind, positive sizes and public visual runtime existence are checked structurally.
Local file existence is checked for the actual neutral image fixture; production files/network/MIME claims need
source-specific validation at migration/release. This semantic checker does not fetch remote URLs.

ImageUse adds usage role, authored alt, aspect ratio, separate mobile asset and/or normalized crop rectangle.
The tiny existing path-check SVG is a technical fixture, not a usable artist photo or a quality-approved asset.
YouTube stores an 11-character identity and poster separately, not iframe HTML. The fabricated fixture ID is not
claimed to be an available video and is never loaded. Future local video is type-supported, not hosted here.

Tracks distinguish playable (typed audio ref with runtime source required) from unavailable/coming-soon with
reason. No actual audio fixture exists and no simulated elapsed time/player is added. Structural source presence
does not prove audible playback/CORS; actual sources need the separately approved Audio gate.
Future 3D refs may point to an identified unbuilt master without runtime output; this does not approve a pipeline,
make a model exist, or bypass the mandatory Blender/Tray Labs.

Relations are direct ID refs. Album↔Performance, Performance↔Media/Press and Album↔Media are supported by the
same small contract. `relatedRecords()` excludes nonpublic targets; dangling/wrong-kind refs fail validation.
There is no inferred reciprocal graph, CMS or recommendation engine. Curate both directions explicitly if needed.

### Asset Lifecycle Policy

Real assets are preferred. When suitable material is missing, AI-generated or temporary editorial assets may
serve prototypes or production candidates. Every asset explicitly records its current state:

| lifecycle | Use and approval boundary |
|---|---|
| provisional | Usable in current prototype work; replaceable when better real material arrives. A production candidate, not production approval |
| approved | Production use approved for the reviewed source and intended use; replacement remains possible |
| replace-required | Structure/design validation only; must be replaced before public product use |

`isAssetApprovedForProduction()` answers approval status only. Source authenticity, rights, intended use,
runtime availability and quality still need review. `validateCatalog()` checks lifecycle values but intentionally
allows prototype records: its public-index eligibility is not a production release gate. Both P1A assets are
`replace-required`, never implicitly approved by a passing test. No production content consumer or release gate
is wired in P1A; the future integration must check assets actually used (including mobile variants/downloads)
before public product release. Existing explicitly neutral P0 routing previews remain unchanged.

Official portraits, artist identity images, documentary performance photographs and factual archive imagery
prioritize authentic material. Never present an AI-generated image as a real performance/documentary record.
Abstract backgrounds, atmospheric visuals, textures, conceptual editorial images and decorative supporting
visuals actively allow AI/editorial candidates. Record source/generation facts in the inventory identified by
`masterRef` and its review evidence; lifecycle describes approval, not origin or a claim of authenticity.

Replace assets through the registry's master/runtime reference or a content AssetRef, normally without changing
component code. Recheck crop, alt, dimensions and intended use when replacing; previous approval does not transfer
automatically to a new source. Mark a new candidate provisional or replace-required until explicitly approved.
When better originals, crops, shooting angles or resolution materially improve quality, request them from the
user with the reason and blocking point (MASTER §38), instead of hiding the limitation behind a workaround.

## User-approved visualMode naming resolution

P1A clarification was explicitly approved by the user:

- Stored visualMode: **photo | poster | video-still | editorial | typography**, matching Index §6.
- Detail's photo-led → photo, poster-led → poster, media-led → video-still are descriptive names only;
  editorial/typography retain their names. media-led does not force live/autoplay video.
- sanjo/jeongak belong to musical category, never visualMode. MASTER's older variant examples are conceptual
  history, not a competing field. Its generic minimal label is not silently converted to typography.
- Future mode additions require a bounded contract review. No per-ID mode/component or CSS exceptions.

## Route/prerender integration boundary

`contentRouteCatalog(catalog, asOf)` validates data and emits P0D SemanticRoute entries for public albums and
performances. `contentPrerenderPaths()` derives actual KO/eligible EN URLs through routePair, with no /ko/base
hardcoding. The resulting string[] is suitable for the existing explicit React Router prerender list.
Metadata and language-switch tests use the unmodified P0D functions at both root and Project Pages origins.

Neutral baseline: four detail URLs; growth adds a KO-only album and bilingual performance → seven URLs,
with the same four KO/EN route patterns and no new page component. Media/Press/Profile grow as records for
the existing aggregate page contracts; P1A does not invent detail URLs for them.

**P1A proves the adapter only.** Existing spikeCatalog, routes.ts, React Router config, page components,
file-placement pipeline and the 18 deployed fixture routes are unchanged. A later specifically approved
integration must switch discovery/prerender to the full content catalog while deduplicating route patterns
from individual slugs, then verify real generated HTML/metadata on one existing neutral template. P1A does
not claim new content HTML was emitted or final data→UI integration is complete.

P1D adds the first actual draft to `registry.server.ts`; it does not replace that neutral wiring. Raw records and
their registration module use `.server.ts`, supported by the installed React Router client-import guard.
Future route/metadata integration must use an approved build/server boundary, the same explicit build instant,
and the existing public selectors; only eligible projected data may reach HTML/loader payloads/client bundles.
Do not import the raw registry into client components or serialize it wholesale. A `.server` filename is an
import boundary, not proof against accidental serialization: artifact/route exclusion tests remain required.

## Addition and validation workflow

1. Read models/shared/assets, the owning page spec, source inventory and the approved record mapping. For a neutral
   experiment use fixtures.ts. For an authorized actual record add `records/<identity>.server.ts`, validate with
   `satisfies Album` (or its domain type), then explicitly register it and its source asset references in
   `registry.server.ts`. Do not modify neutral fixtures to represent real artists, nor create a per-ID page.
2. Supply stable ID/slug/publication and domain-required fields. Keep factual and presentation choices separate.
3. Preserve the approved mapping's source/status/provenance. Mapping approval is not authored-copy review: machine-assisted
   drafts remain drafts until a separate evidenced content review. Keep missing EN absent; no generated full EN edition.
4. Reference asset IDs with explicit lifecycle; use candidates for prototypes and approved assets for public product use.
   Distinguish master/runtime/mobile/poster/alt roles and related IDs. Do not copy binaries into schema files.
5. Validate the complete registry and public indexes/related refs/route metadata with explicit build time. For a draft,
   prove exclusion before/after its release date and in a mixed public/draft catalog; publication is not deployment permission.
6. Run `type-check`, `lint`, `test:content`, `test:locale` and the applicable gates. Fast includes content/locale/placement,
   a fresh root build, then `test:content:visibility` on its complete client/static output. Full adds the project build
   and 84 route/browser cases, including draft KO/EN direct/client 404, metadata, font delivery and both-artifact exclusion; P2A adds an isolated 11-case Design System Lab suite; P2B runs 26 canonical Bold navigation Lab cases without content integration. Windows uses
   `npm.cmd run <command>`; macOS/Linux use `npm run <command>` with the required Node/npm versions.

When a later authorized edit changes approved copy/fields, update the real-record regression to the new owning review.
Keep the historical P1C mapping unchanged; do not edit an old approval artifact just to make a test pass.

The first actual record is a private draft with one source-only provisional cover: no runtime URL, asset bytes,
public route, review fabrication or field expansion is necessary. Printed track times stay in P1C until their
storage/measurement meaning is reviewed. Unsupported optional facts remain in the source audit. See
[P1D result](../../../P1D-RESULT.md) for actual scope and validation, not the older P1A route-growth fixture counts.

TypeScript strict readonly interfaces, discriminated unions and satisfies validate authored shape; compile tests
ensure invalid examples stay errors. The small runtime semantic checker handles cross-record constraints that
types cannot express. It deliberately does not decode arbitrary external JSON. Zod would be useful at an untyped
CMS/import boundary, but none exists in P1A; adding it now would duplicate contracts and a dependency without
that boundary. Revisit when such a boundary is actually approved, not as speculative infrastructure.

Historical schema proof: [P1A result](../../../P1A-RESULT.md). Current private integration: [P1D result](../../../P1D-RESULT.md).
**STOP after the approved bundle's validation/report; no automatic public release or next Phase.**
