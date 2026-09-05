# P1A — Content / Data Schema Contract

2026-09-05 · P1A result APPROVED; Asset Lifecycle Policy follow-up locally VERIFIED; main delivery authorized.
P0F delivery was first confirmed: b3c12d8f9d2e89db7e2ad206e61c2dabf29d5c23,
[Fast CI 33962909498 SUCCESS](https://github.com/cij5484/cho-youn-kyoung-v2/actions/runs/33962909498).
Rollback baseline is that commit; `.checkpoints/p1a-before-b3c12d8/` records the bounded scope and original
package script. Restore only P1A files, preserving unrelated work. No P1B, migration or deployment performed.

## Approved lifecycle / delivery follow-up

- User approved the P1A result and separately authorized this minimal policy revision, validation, logical commit,
  main push and Fast CI confirmation. This report is saved before that delivery commit; the Git commit and its
  matching Actions run are the post-push receipt, reported to the user after CI and clean-tree confirmation.
- AssetRecord adds one required `lifecycle`: provisional / approved / replace-required. Source/master/runtime
  references remain the replacement mechanism; no origin enum or separate state management system was added.
- Existing neutral image/model fixtures are replace-required. `isAssetApprovedForProduction` reports approval
  only; it does not certify rights, authenticity, runtime availability or quality. A future production consumer
  must apply the contract before public product release; P1A does not connect fixtures to production pages.
- Canonical [Asset Lifecycle Policy](docs/redesign/review/CONTENT-SCHEMA-CONTRACT.md#asset-lifecycle-policy)
  records real-asset priority, AI/editorial candidates, no false documentary presentation, replacement/review
  and requests for better originals/crops/angles/resolution. MASTER and AGENTS point to that policy.
- Fresh `npm.cmd run gate:fast`: type-check PASS (12 negative compile cases), lint PASS with zero warnings,
  content 15/15, locale 8/8, placement 3/3, root production build PASS (18 prerender routes).
  Added regression covers all three lifecycle states, missing/invalid lifecycle rejection and data-only registry
  replacement preserving content/route identity. Replacement URLs in tests are fabricated and never fetched.
- The approved initial Full run below remains evidence for project build and 80 browser cases; those are not
  claimed rerun for this asset-only follow-up. Actual route/page/metadata/workflow/lockfile code is unchanged.
- All 21 P1A files are listed in the [evidence](evidence/p1a/results.json). No new dependency, actual asset or
  generated output is delivered. Post-push Fast CI checks the exact committed source; push does not deploy.

The numbered sections below preserve the initial P1A result and distinguish its earlier validation from this follow-up.

## 1. What was changed

Defined five separate domain schemas composed from shared identity/locale/date/publication/asset contracts.
Added neutral data, semantic validation, public indexes, related-record lookup and a P0D-compatible route adapter.
User explicitly approved visualMode naming clarification. No page/React/CSS/3D/audio or actual content was migrated.

## 2. Files changed

- New source: [shared.ts](src/content/shared.ts), [assets.ts](src/content/assets.ts), [models.ts](src/content/models.ts),
  [validation.ts](src/content/validation.ts), [catalog.ts](src/content/catalog.ts), [fixtures.ts](src/content/fixtures.ts).
- New tests: [content-contract.test.ts](tests/content-contract.test.ts), [content-types.test.ts](tests/content-types.test.ts).
- [package.json](package.json): test:content command and its inclusion in existing gate:fast. No new dependencies/lockfile/workflow changes.
- [Canonical content guide](docs/redesign/review/CONTENT-SCHEMA-CONTRACT.md), this report and [evidence](evidence/p1a/results.json).
- Documentation pointers/status: AGENTS, README, HANDOFF, MASTER, Performance Detail, active Plan, Task Protocol,
  HANDOFF Audit and Revision Log. Existing specifications/checklists/result history are preserved.

## 3. Shared content architecture

Namespaced stable ID differs from permanent public slug. Shared publication, date precision, reviewed locale
editions, optional links/related refs and presentation ranking compose separate domain interfaces.
Facts, asset identities and presentation choices remain independent. All five can grow as records without a per-ID component.

## 4. Album schema

Category/release/date, cover/package/mobile visuals, ordered tracks/duration/source state, localized credits,
booklet image pages/download, streaming links, product number, related works and optional 3D/geometry/display refs.
Actual fixture audio is coming-soon, with no runtime source and no simulated duration/playback.

## 5. Performance schema

Date/timezone/event status, title/subtitle/venue/location/note/quote/program notes, program/cast, hero/secondary
visual, poster/leaflet/gallery/videos/downloads/tickets/related refs. Stored visualMode is photo/poster/video-still/
editorial/typography. Detail *-led labels are descriptive aliases; sanjo/jeongak remain musical category.
This resolves the document naming ambiguity with the user's explicit reply, not an assumed decision.

## 6. Media schema

Discriminated YouTube/local-video/image source, date/year precision, aspect ratio, category, locale copy,
featured and related refs. YouTube ID is separate from its required poster. No iframe or video load is introduced.
Local video is type-supported for later use, not hosted in P1A.

## 7. Press schema

Outlet/date/title/external URL/source language, optional summary/featured and related records.
It remains an Editorial Index inside MEDIA. Adding a Press record adds no route or page component.

## 8. Profile/About schema

Short introduction/full biography/current role, selected performance refs and portrait uses; a separate flat
career collection represents milestones, education, appointments and awards without a monolithic nested profile.

## 9. Locale model

Reuses P0D authored/machine-assisted and draft/reviewed semantics, adding provenance and reviewer/timestamp.
Review applies to an authored edition. Missing optional fields and unreviewed fields are explicit helper states;
no automatic Korean substitution inside EN. Missing/draft EN emits no path/hreflang and keeps same-item KO fallback.
Fixture review labels are fabricated validation data, not official translation/biography approval.

## 10. Asset reference model

Opaque source/master identity + separate optional runtime URL/MIME/size/dimensions, kind-checked IDs,
usage role, localized alt, aspect ratio, mobile image/crop. No binaries, optimizations or real master paths.
The existing path-check SVG is the only runtime fixture asset. The future-model ref has no produced asset.

## 11. Related-content model

Simple kind+ID references support Album↔Performance, Performance↔Media/Press, Album↔Media and same-kind links.
Invalid targets fail; public related selectors omit drafts/unavailable targets. No CMS or inferred reciprocal graph.

## 12. Route/prerender integration

New adapter emits existing P0D SemanticRoute objects and clean logical prerender paths for eligible album/performance
records. Baseline 4 detail paths → growth 7 (new KO-only album + bilingual performance), using unchanged route patterns.
P0D metadata/switch helpers pass for both central origin/base configurations. Media/Press/Profile grow in aggregate indexes.

**Adapter-level proof only:** React Router config, route catalog, page templates and file placement are unchanged.
The new records were not added to actual generated page HTML. Existing 18 neutral routes per base still build and pass
P0 tests. Future template/discovery integration requires its own bounded task and generated-HTML verification.

## 13. Runtime validation decision

No new dependency. Strict TypeScript/satisfies/readonly/discriminated unions cover authored shape, initially with 10 negative
compile examples. A small typed-data semantic validator covers duplicates/slugs, refs, dates/publication, required
copy/alt, source availability and crop constraints. It is not an arbitrary JSON/CMS decoder. Zod is deferred until
a real untyped ingestion boundary justifies it; types alone would not cover cross-record integrity.

## 14. Tests performed

Initial `npm.cmd run gate:full` passed: content 13/13, existing locale 8/8 and placement 3/3, both builds and browser 80/80.
Content tests include all-domain growth, both-base metadata, missing/draft EN, publication timing, date precision,
bad IDs/slugs/relations, fake-playable rejection, assets/crops/alt and SEO overrides.
Strict compile checks reject invalid unions/refs/modes/missing required fields and readonly mutation.
One initial test fixture inferred a narrower localized type; its annotation was corrected to the domain type.
No assertion was removed or weakened. See [saved summary](evidence/p1a/results.json).
Final negative-test review isolates machine-review rejection from missing review evidence and duration failure
from track-order failure; focused type-check/content tests were rerun after strengthening those cases.
Documentation checks: 443 local targets, 14 anchors and 21 command references resolve, preserving all 207
HANDOFF checkbox texts and 17 Plan sections. The three previously recorded historical P0A source links remain.

## 15. Build/lint/type-check result

PASS for type-check, lint (zero warnings), root build and Project Pages subpath build on Windows Node 24.15.0.
New test:content is part of Fast without deleting/reordering the previous required checks. Workflow definitions and
dependency lockfile are unchanged. No remote CI run was requested for the initial uncommitted review; the approved
follow-up now includes main push and exact-commit Fast CI confirmation.

## 16. P0 regression result

Unmodified 80-case Edge suite passed in 60.1 seconds, zero failures/skips/flaky cases. Covers root/subpath, direct
access/refresh/history, JS-off static HTML, locale metadata and real local static 404. Existing 8 locale + 3 placement
contracts passed. No new live Pages/Safari/mobile result is claimed; P0E production-like evidence remains historical.

## 17. Known risks / overengineering avoided

- No real content or asset quality/provenance/network/CORS/media playability is verified by these neutral fixtures.
- Exact event-time transitions, chronological UI rules, final SEO, actual template/prerender wiring and scheduled rebuild operations remain future work.
- Review fields express a contract, not a human workflow/audit backend; future ingestion must invalidate reviews when copy changes and validate actual input.
- 3D profile/master refs are placeholders, not generated geometry or pipeline approval. No Blender/asset/audio/game work.
- No CMS, graph, duplicate locale engine, per-ID components, full JSON decoder or new library was introduced.
- Historical P0A links to three removed source files remain a previously documented navigation limitation; no obsolete source is restored.

## 18. Recommended next bounded task

**P1B — Single Album Source Audit**, after explicit approval: check one album's facts, publication state and asset
reference inventory, identify missing source/translation/permission inputs before migration. No mass migration,
page design or model work. **STOP. P1B and actual content migration have not started.**
