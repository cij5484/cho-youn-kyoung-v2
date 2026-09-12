# Phase 3B — local visual polish, 2026-09-12

Local only. Preserves the preceding uncommitted WORKS/menu/archive-return/mobile-ABOUT revision.
User's explicit WORKS discrete-input and letter-transition directions override the generic no-new-feature
restriction. No push, PR, release, asset generation, content addition or SEO work.

## Changed

- WORKS retains cylindrical CSS 3D positions, with greater angular/radial/vertical spacing and no visible
  stacked posters at the initial rest. Back faces and distant turns no longer intrude into the reading plane.
- Small wheel gestures, horizontal/vertical pointer swipes, direction keys and existing numbered controls
  select complete front-facing stops. A 950ms eased transition completes each move; wheel momentum cannot
  queue several works. The native scrollbar also settles. The last stop joins the unchanged archive.
- Titles use masked, staggered letter transforms; the actual accessible heading remains a complete name.
  Kicker/date/venue/actions follow at staggered times. No random replacement text or extra frame loop.
- Sanjo-gil Artist Note lead reduced from 36.7px to 24px at the checked desktop width (284px to168px tall),
  preserving 14px body, 32.9px program and opposing Dual Flow motion. Mobile lead is20px.
- Album template removes repeated generic decorative prose in favor of existing album subtitles and
  functional section labels. Open/Close/Front/Reverse/Read booklet/Fit/Zoom labels share casing; actual
  summaries, covers, tracks, credits and object interactions stay unchanged.
- MEDIA4:3 still at1280×720 increases324×243→405×304:25% linear,56% area. Native aspect retained.
  Ribbon vertical travel fits the remaining canvas gutter;16:9 frame sizing stays unchanged.

## Checked, retained

- WORKS archive/filter/preview structure and mobile thumbnail rows; direct detail-to-archive return.
- WORKS desktop title, gutters and editorial arrangement; only the sculpture fitting/spacing changed.
- All three performance signatures; program, cast and archive structure.
- Album-specific palette, assets, object geometry, placement and timing; booklet and package controls.
- MEDIA16:9, player focus/close, Selected/Special Archive, Press and typography.
- Shared ivory/font/hairline tokens and menu mode placement; no blanket style normalization.
- HOME/ENTRY/ABOUT/CONTACT signatures and existing performance optimizations remain protected.

## Checks and rollback

Type-check, changed-scope ESLint, six WORKS/MEDIA model checks and development-preview build pass.
Built-browser mobile-sized pointer swipe settled on work02; reverse desktop drag settled on work01.
Numbered keyboard selection reached work07; onward wheel input revealed the enabled archive. Titles
settled on the matching complete accessible heading. Initial poster has opacity1 and all six behind it0.
Reverse wheel input at the archive top returned to the final work with moving=false.
ENTRY→HOME→ABOUT→CONTACT were also viewed in sequence at the mobile viewport: existing intentional
page hierarchy and shared ivory/hairline/control treatment were retained. No console errors recorded.
Existing large-chunk advisory remains. Browser checks are viewport/pointer checks, not physical-phone QA.
Current pass WORKS pre-edit copies are in ignored `.checkpoints/phase3b-before`; preserve previous local
work when reverting. Other edits are confined to performance-variants.css, AlbumDetail.tsx/album-detail.css,
MEDIA model/renderer/tests, and this documentation. User visual approval remains separate.
