# CHO YOUN KYOUNG WEBSITE V2
## 09 — PERFORMANCE DETAIL

**Version:** 1.2\
**Status:** Approved PERFORMANCE DETAIL Baseline  
**Parents:** `00-MASTER-PLAN.md`, `02-DESIGN-SYSTEM.md`, `03-MOTION-SYSTEM.md`, `04-HOME.md`, `05-WORKS.md`, `08-PERFORMANCES.md`  
**Page Role:** Performance Record + Editorial Storytelling

## 2026-09-11 — three local signature variants

Subsequent user authorization promotes these three variants unchanged to the GitHub Pages development preview
through PR/merge. `development-preview` enables the same runtime and emits all three direct route HTML inputs.
The local-only statements below describe the implementation pass before that delivery authorization.

The latest authorized local study adds two records to the same `PerformanceRecord` schema and common
`PerformanceRecordPage` template. `variant` selects a reusable motion owner, never a performance-specific page:

- `svg-mask`: 풀고, 엮다 — existing paired-band fullscreen chapters remain unchanged.
- `dual-flow`: 산조길, 둘 — two opposing phase-offset text flows and circular poster motifs surround the
  synchronized central chapters, then resolve to a stable paired composition at the printed archive.
- `time-path`: 해금, 시대를 잇다 — native scrolling moves an object along a responsive cubic SVG through the
  actual six program years; the final interval opens the entire connected chronology.

Hero → Artist Note → Program → Performers → Archive → Related stays shared. The two added records use
verified legacy facts/notes and actual optimized portraits/leaflets in `performance-variants.json`; asset provenance
is in `source-manifest.json`. Local WORKS and Related links resolve all three studies. The shared link helper changes
only Performance eligibility; Album runtime, HOME and Audio are unchanged. No deployment or production promotion.
Source mechanics and lean evidence: [reference study](review/REFERENCE-INTERACTION-RD.md#two-additional-performance-signatures).

## 2026-09-11 — 풀고, 엮다 local prototype

One local study uses the common `src/performance-detail/PerformanceDetail.tsx` template and
`performance-record.json` data at `/performance/haegeum-jeongak-2026-09-22/` on localhost in dev mode.
Published preview and the neutral production routes remain unchanged. This is IMPLEMENTED / LOCAL PROTOTYPE,
not visual quality approval. Existing uncommitted audio work is preserved separately.

- WORKS uses its existing official full-frame poster and the existing shared image transition owner, extended
  to the one local performance record. Original poster proportions are preserved.
- Latest authorized R&D replaces the ordinary section flow with four fullscreen chapters: official poster/facts →
  Artist Note + numbered Program → real performer portraits → authentic printed Archive. Missing record fields omit
  their sections. No invented live photos/video, generated images, or event-specific CSS.
- Text is selected from the legacy performance data for this exact event; no legacy layout or styling is inherited.
  The collaborator chapter excludes the recital artist and opens each of the four collaborators' verified profiles
  from their portrait. Decorative CTA/caption copy is removed; chapter labels state their content directly.
  Mobile assigns the remaining first-screen height to the poster and uses readable 12px visit information.
  Decorative arrows are removed. The footer explicitly returns to the expanded WORKS Archive, including when
  the detail was opened directly. The selected poster's entry staging is owned by the shared transition's
  Performance branch; the existing Album entry behavior is unchanged.
  Archive uses two full-frame leaflet derivatives with provenance in `src/performance-detail/source-manifest.json`.
  Phase 4 (2026-09-12) restores the V1 full program notes in the existing text reader, including the solo work’s historical paragraph. Its source context remains distinct from the artist note; no invented reconciliation. See [restoration audit](review/V1-CONTENT-RESTORATION.md).
- Existing navigation and `AlbumSignaturePair` anchor/handoff contract are reused. Native dialog provides full-size
  printed material viewing, keyboard navigation and zoom, plus complete text reading on compact screens.
  Native scroll drives the sticky scene sequence; reduced motion retains ordinary readable sections.
- Current motion reference is the actual SVGMaskScrollTransition source, with GSAP explicitly authorized.
  [Reference interaction study](review/REFERENCE-INTERACTION-RD.md) records source mechanics, local boundaries and
  the related global/WORKS studies. Earlier shared-element/editorial references remain historical inputs.

## 2026-09-08 연구 반영 — 다음 구현 후보

Common Semantic Structure + Visual Variant를 유지한다. 현재 상세 URL은 **neutral fixture**이며,
실제 공연 record 공개와 아래 template 구현은 아직 별도 작업이다.

- **목적 / 첫 화면:** 목록에서 선택한 실제 poster/photo와 title/date/venue를 이어받아 공연 기록을 읽는다.
  poster의 인쇄 비율·글자를 보존하며 다른 사진으로 갑자기 교체하지 않는다.
- **대표 기법:** program 순서의 번호·선이 다음 note/photo를 정렬하는 **editorial score**가 된다.
  Joffrey Spitzer의 shared image와 Lesse의 명확한 정보 경로를 참고한다. HOME의 무대 개방은 반복하지 않는다.
- **우선순위 / 모바일:** artist note→program→cast→실제 archive→related. 없는 내용은 블록을 생략한다.
  모바일 caption/program은 사진 바깥의 DOM으로 읽고 poster는 tap viewer에서 확대한다.
- **다음 단위:** 실제 승인 공연 1건의 poster-led common template와 목록→detail identity.
  정확한 program/cast/note·이미지 권한·영상/자막이 입력이다. event별 React page나 CSS 분기를 만들지 않는다.

자료 부족 시 대안·back 복원·정보 순서와 적용 원리는 [연구 §4.5](review/EXPERIENCE-PROTOTYPE-RESEARCH.md#45-performance-detail--공연의-프로그램이-편집된-기록이-됨)를 참조한다.
기법 채택은 구현·시각 승인·가상의 공연 자료 제작을 허용하지 않는다.

---

# 1. PERFORMANCE DETAIL OBJECTIVE

Performance Detail is not a generic event detail page.

It is a permanent artistic record of a specific performance.

The page must combine:

- performance identity
- artist intent
- program structure
- performers
- photography
- video
- poster / leaflet
- archive materials
- related performance navigation

without creating a new custom page architecture for every performance.

---

# 2. CORE ARCHITECTURE

Approved:

## Common Semantic Structure + Visual Variant

Every performance uses the same semantic content model.

The presentation may vary through controlled visual variants.

Conceptual variants may include (descriptive labels, not stored enum values):

```text
photo-led
poster-led
editorial
typography
media-led
```

P1A user-approved naming: stored visualMode follows Index §6: photo | poster | video-still | editorial | typography.
photo-led → photo, poster-led → poster, media-led → video-still are descriptive aliases; editorial/typography are unchanged.
Musical sanjo/jeongak category is separate. See [Content Schema Contract](review/CONTENT-SCHEMA-CONTRACT.md).

Do not create a dedicated React page component for each performance ID.

Do not create per-performance CSS architecture.

---

# 3. SEMANTIC CONTENT MODEL

The common model may include:

- title
- subtitle
- date
- venue
- location
- status
- introduction
- artist note
- program
- program notes
- performers
- collaborator biographies
- duration
- ticket/seating/age information
- photos
- videos
- poster
- leaflet
- downloads
- related works

Not every performance must provide every field.

Missing content should remove the section cleanly.

---

# 4. VISUAL VARIANT PRINCIPLE

A visual variant controls presentation, not factual structure.

Variants may affect:

- Hero composition
- image ratio
- typography placement
- section rhythm
- archive composition
- decorative line treatment
- motion intensity

Variants must not require duplicated page logic.

---

# 5. DETAIL ENTRY CONTINUITY

Approved:

## PERFORMANCES Stage Visual → Detail Hero

The visual currently visible in the PERFORMANCES Stage Window becomes the Detail Hero anchor.

Examples:

```text
Photo → Hero Photo
Poster → Hero Poster Composition
Editorial Artwork → Hero Editorial Visual
Typography → Hero Typography
Video Still → Hero Media Frame
```

Do not replace the selected visual with an unrelated image immediately after navigation.

---

# 6. HERO INFORMATION

Hero minimum:

- title
- date
- venue
- optional category/subtitle

Keep initial copy concise.

Do not place the full program, full cast, or long artist note in the Hero.

---

# 7. HERO VISUAL MODE

Hero may use:

- authentic performance photo
- poster
- authentic video still
- editorial artwork
- typography composition

The strongest honest representation wins.

Photo is not automatically superior to poster.

Poster is not automatically secondary.

---

# 8. HERO MOTION

Use a restrained cinematic transition from the listing.

Possible:
- mask expansion
- crop continuation
- scale/reposition
- subtle depth

Avoid:
- arbitrary curtain/wipe unique to Performance Detail
- unrelated fullscreen effects
- long input lock

The transition family must remain consistent with the wider V2 system.

---

# 9. FIRST CONTENT AFTER HERO

Approved:

## Artist Note / Meaning of the Performance First

The page should first explain why the performance matters.

Recommended flow:

```text
HERO
→ ARTIST NOTE
→ PROGRAM
→ PERFORMERS
→ ARCHIVE
→ RELATED PERFORMANCE
```

Do not begin immediately with dense program data unless a specific performance has no meaningful artist note.

---

# 10. ARTIST NOTE

Approved:

## Large Pull Quote + Short Editorial Body

Use:
- one strong excerpt or statement
- 2–4 short paragraphs
- generous whitespace

Do not create a long academic article on HOME-like entry pages.

Longer archival copy may be available further down if necessary.

---

# 11. PROGRAM — EDITORIAL SCORE

Approved:

Program should feel like a visual score rather than a list of cards.

Possible structure:

```text
01
작품명
시대 / 구성 / 작곡가 또는 전승 정보

02
작품명
...
```

Use:

- numbering
- vertical rhythm
- line system
- typography hierarchy
- restrained metadata

---

# 12. PROGRAM MOTION

Approved:

As the user scrolls through the Program:

- current work gains slight emphasis
- title contrast may increase
- line may strengthen
- numbering may shift subtly
- optional supporting image/texture may respond softly

Do not make every work a fullscreen animated scene.

Do not use heavy accordion interaction as the default.

---

# 13. PROGRAM NOTES

Program notes should remain readable.

Use:
- contained reading width
- Korean/English content according to locale
- clear relationship between work title and note

Do not force long program notes into interactive overlays.

---

# 14. PERFORMERS / CAST

Approved:

## Editorial Cast

Prioritize:

- name
- role / instrument
- concise relationship to performance

Use portrait photography only when:

- the person is a major collaborator
- image quality is strong
- the photo materially improves the section

Do not create a portrait card for every performer.

---

# 15. CAST LAYOUT

Possible hierarchy:

```text
HAEGEUM
Cho Youn Kyoung

PERCUSSION
Lee Youngsub

SPECIAL GUEST
...
```

Use typography and whitespace as the primary system.

Portraits are optional emphasis, not mandatory structure.

---

# 16. CAST ASSET QUALITY

If collaborator photography is weak:

- use typography-only treatment
- request a better portrait if it materially improves the page
- do not enlarge a poor image

Do not lower visual quality to force equal portrait coverage.

---

# 17. ARCHIVE — UNIFIED RECORD SECTION

Approved:

## One Editorial Archive Section

Combine:

- Photo
- Video
- Poster
- Leaflet
- Downloads

into one coherent archival world.

Do not make every media type a separate CMS-looking section.

---

# 18. ARCHIVE ADAPTATION

The Archive must adapt to available assets.

Examples:

```text
Photo + Video + Poster + Leaflet
Photo + Poster
Poster + Leaflet
Video + Poster
Typography + Poster
```

Missing media types should disappear cleanly.

Do not show empty placeholders.

---

# 19. PERFORMANCE PHOTOGRAPHY

Approved:

## Editorial Gallery

Use varying image scales and positions.

Possible:
- one large hero-scale image
- smaller detail image
- wide image
- portrait crop
- quiet whitespace

Do not use a generic equal-thumbnail 3-column grid as the default.

---

# 20. GALLERY MOTION

Keep gallery movement restrained.

Possible:
- subtle reveal
- slight depth
- crop shift

Do not introduce another horizontal drag gallery by default.

HOME and WORKS already use drag as a stronger interaction language.

---

# 21. VIDEO

Approved:

## One Primary Video

If multiple videos exist:

- choose one primary video
- present it large
- keep additional videos as smaller archive links/items

Do not render a wall of equal YouTube embeds.

---

# 22. VIDEO PLAYER PRINCIPLE

Use a clean intentional player presentation.

Requirements:
- user-initiated playback
- poster frame / preview
- accessible controls
- no surprise autoplay audio

The player must feel part of the archive rather than an embedded third-party block dropped into the page.

---

# 23. POSTER / LEAFLET

Approved:

## Printed Matter as Editorial Object

Poster and leaflet are not merely download links.

Present them like physical design artifacts.

Possible:
- flat-lay composition
- poster + leaflet spread
- close-up crop
- shadow/depth
- paper edge
- print-scale relationship

---

# 24. POSTER / LEAFLET ASSET CREATION

If existing preview images are weak:

- create a new mockup
- create a new neutral background
- render a new editorial flat-lay
- use original print files where appropriate

Do not inherit old website mockups merely because they exist.

The original artwork remains authoritative.

---

# 25. DOWNLOADS

Downloads may include:

- poster PDF
- leaflet PDF
- program PDF
- archival document

Only expose files that are intended for public distribution.

Downloads remain secondary to the custom web experience.

---

# 26. ARCHIVAL AUTHENTICITY

Authentic performance documentation must remain distinguishable from newly created editorial visuals.

Do not generate fake documentary performance images and present them as historical record.

New visuals are allowed as design interpretation, not evidence.

---

# 27. VISUAL ASSET FALLBACK

When no strong live performance photo exists:

Preferred order may include:

1. official poster
2. authentic video still
3. new editorial artwork
4. typography composition

The best honest representation should be used.

Do not force a weak photo to full-screen scale.

---

# 28. MOBILE STRUCTURE

Approved:

## Honest Vertical Editorial Flow

Mobile order:

```text
HERO
→ ARTIST NOTE
→ PROGRAM
→ CAST
→ ARCHIVE
→ RELATED
```

Do not shrink desktop compositions blindly.

---

# 29. MOBILE HERO

Use one strong primary visual.

Keep:
- title
- date
- venue

close to the visual.

Avoid:
- tiny overlay text on complex imagery
- desktop-style side-by-side layout
- heavy parallax

---

# 30. MOBILE PROGRAM

Use a vertical structure.

Each work:
- title
- number
- metadata
- optional short note

No horizontal program navigation.

No accordion unless long content genuinely requires it.

---

# 31. MOBILE CAST

Use:
- vertical typography
- optional portrait only where valuable

Do not create a dense portrait grid.

---

# 32. MOBILE ARCHIVE

Use vertical scrolling.

Photography:
- mixed full-width / two-column where readable

Video:
- full width

Poster / Leaflet:
- scroll-first presentation

Do not require swipe galleries for core archive access.

---

# 33. MOBILE POSTER / LEAFLET

If printed matter requires detailed viewing:

- tap to enlarge
- allow zoom
- keep download optional

Do not make the user pinch tiny inline layouts.

---

# 34. MOBILE PERFORMANCE

Keep interaction lighter than desktop.

Avoid:
- large sticky visual stages
- cursor-derived effects
- complex cross-media hover behavior

Preserve:
- strong typography
- image quality
- clean transition
- archive richness

---

# 35. RELATED PERFORMANCE

Page ending should offer:

- previous performance
- next performance

or one strongly related performance if chronology does not fit.

Do not repeat the entire PERFORMANCES archive.

---

# 36. RELATED TRANSITION

Related performance navigation should use the same visual continuity family where possible.

Keep it faster than the initial detail entry.

---

# 37. VISUAL VARIANT EXAMPLES

Possible controlled variants:

## PHOTO-LED
Hero and archive driven by authentic photography.

## POSTER-LED
Poster language drives Hero composition and archive framing.

## EDITORIAL
Newly created visual identity extends the performance concept.

## TYPOGRAPHY
Strong title/date/grid composition when visual assets are limited.

## MEDIA-LED
Video still or performance film becomes the primary Hero anchor.

These are presentation strategies, not separate page templates.

---

# 38. VARIANT IMPLEMENTATION RULE

Avoid:

```text
if performance.id === ...
  render SpecialPage
```

Prefer:

```text
PerformanceDetail
  + semantic content
  + visualMode
  + small controlled presentation options
```

Do not add custom CSS branches for every new performance.

---

# 39. PERFORMANCE-SPECIFIC CUSTOM SECTIONS

Default policy:

No custom section.

Exception:

A truly unique performance artifact or requirement may justify one reusable optional module.

Before adding:
- prove the module cannot fit existing structure
- make it reusable if possible
- document why it exists

Do not create one-off modules casually.

---

# 40. KO / EN

All factual and editorial content must support the approved language architecture.

Korean default:
`/performance/:id`

English:
`/en/performance/:id`

Official titles, names, program terminology, and traditional-music terms must use reviewed translations.

Do not use automatic translation as final public copy.

---

# 41. ASSET AUDIT

Before production, audit each performance detail record:

```text
Hero Visual
Artist Note
Program
Program Notes
Cast
Cast Photos
Performance Photos
Video
Poster
Leaflet
Downloads
KO Copy
EN Copy
```

Classify each:

```text
READY
WEAK
MISSING
NOT APPLICABLE
```

---

# 42. ASSET REQUEST RULE

Proactively request better material if it materially improves:

- Hero quality
- archive authenticity
- poster/leaflet presentation
- cast quality
- mobile crop
- English accuracy

Tell the user:
- whether work can continue
- what exact asset is needed
- why
- required vs optional
- when it becomes blocking

---

# 43. PERFORMANCE / LOADING

Use:

- responsive images
- lazy loading
- video poster frames
- deferred secondary media
- intentional preload of the incoming Hero visual

Do not load every full-resolution gallery image immediately.

---

# 44. REDUCED MOTION

When reduced motion is enabled:

- Hero transition simplifies
- Program emphasis remains mostly typographic
- gallery parallax removed
- printed matter remains static
- navigation remains immediate

Content hierarchy must remain intact.

---

# 45. ACCESSIBILITY

Requirements:

- semantic headings
- meaningful date markup
- readable program structure
- keyboard-accessible archive
- video controls
- alt text
- downloadable asset labels
- visible focus
- secondary visuals not hover-only
- reduced-motion support

---

# 46. LEGACY POLICY

Legacy Performance Detail pages are reference sources only.

May reuse after verification:

- content
- archive files
- program data
- authentic images
- video links
- downloads

Do not reuse automatically:

- page-specific layout
- special-page architecture
- CSS
- old Hero
- old visual theme
- old motion values

V2 must be newly composed.

---

# 47. ACCEPTANCE CRITERIA

Performance Detail is approved when:

- listing-to-detail visual continuity feels intentional
- Hero reflects the strongest honest performance identity
- Artist Note gives emotional context before data density
- Program is readable and visually distinctive
- Cast remains elegant even with uneven portrait availability
- Archive adapts cleanly to missing media
- photos feel editorial, not CMS-grid-like
- one main video is emphasized
- poster/leaflet feel like design artifacts
- mobile is deliberately recomposed
- new performances can be added without new page components
- factual archive trust is preserved

---

# 48. DO

- use one semantic architecture
- use visual variants
- preserve continuity
- keep Program readable
- curate one primary video
- treat printed matter as artifacts
- request better source material when needed
- use typography when imagery is weak

---

# 49. DO NOT

- create dedicated page components per performance
- hard-code performance IDs into layout logic
- build portrait cards for every cast member
- use fake documentary imagery
- dump equal YouTube embeds
- create generic gallery grids by default
- force weak assets into large Hero usage
- copy legacy visual themes without review

---

# 50. FINAL PERFORMANCE DETAIL PRINCIPLE

Performance Detail should feel like:

**A performance remembered with the visual care of a publication, and the factual reliability of an archive.**
