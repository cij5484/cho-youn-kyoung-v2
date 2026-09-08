# CHO YOUN KYOUNG WEBSITE V2
## 08 — PERFORMANCES

**Version:** 1.2\
**Status:** Approved PERFORMANCES Baseline  
**Parents:** `00-MASTER-PLAN.md`, `02-DESIGN-SYSTEM.md`, `03-MOTION-SYSTEM.md`, `04-HOME.md`, `05-WORKS.md`  
**Page Role:** Cinematic Timeline Archive

## 2026-09-08 연구 반영 — 다음 구현 후보

Cinematic Timeline Archive와 UPCOMING/ARCHIVE의 단일 페이지 구조를 유지한다.
현재 `/performances/`는 **route fixture**다. HOME의 **2026.09.22 〈풀고, 엮다〉** 대표 콘텐츠는 보존하되
HOME projection만으로 정식 공연 record의 공개 상태를 결정하지 않는다.

- **목적 / 첫 화면:** 대표 공연 title/date/venue를 먼저 읽고 정확한 연도 Index로 바로 탐색한다.
  상세 접근 전에 HOME Stage Aperture를 다시 감상하도록 요구하지 않는다.
- **대표 기법:** desktop의 한 Stage Window가 공연 행의 선택에 따라 실제 image를 이어 보여준다.
  Obys의 작품-색인 관계와 PHOTOYOSHI의 overview→focus 원리; hover와 keyboard focus가 대응한다.
- **자산 / 모바일:** 9/22 official poster는 있으나 해당 무대 documentary photo는 확인되지 않았다.
  poster의 고유 비율을 존중한다. 모바일은 날짜→큰 inline image→제목/장소의 세로 timeline이며
  desktop 고정 창을 축소하지 않는다.
- **다음 단위:** 승인 항목으로 PERFORMANCES year index/Stage Window와 mobile inline 탐색.
  클릭한 현재 asset을 detail 첫 이미지로 유지하며 공개 record 정리가 필요하면 publication owner를 먼저 분리한다.

자산·visualMode·이동과 다음 단위는 [연구 §4.3](review/EXPERIENCE-PROTOTYPE-RESEARCH.md#43-performances--날짜를-읽으면-무대가-따라옴)에 정리한다.
이 기법은 후속 구현 후보이며 현재 페이지 완성·시각 승인이 아니다.

---

# 1. PERFORMANCES OBJECTIVE

PERFORMANCES is not a schedule list and not a generic grid of event cards.

Its purpose is to present live performances as a chronological artistic archive.

The page must combine:

- performance history
- current/upcoming visibility
- cinematic visual presentation
- accurate dates/venues/titles
- flexible handling of uneven source assets
- direct entry into detailed performance records

Core concept:

**Cinematic Timeline Archive**

---

# 2. WHY TIMELINE

Performance exists in time.

Chronology is therefore a meaningful structural principle rather than a decorative UI choice.

The archive should let a visitor understand:

- what is upcoming
- what happened recently
- how the artist's performance work has evolved
- which performances are major archive records

---

# 3. PAGE STRUCTURE

Approved flow:

```text
PERFORMANCES HERO
→ UPCOMING
→ CINEMATIC TIMELINE ARCHIVE
→ ALL PERFORMANCE RECORDS
→ RELATED / NEXT EXPLORATION
```

The exact lower-page archive density may evolve as the number of performances grows.

---

# 4. FIRST SCREEN / HERO

Approved:

## One Featured / Most Relevant Performance

Use one strong current or representative performance as the Hero.

Minimum visible information:

- `PERFORMANCES`
- year range or archive context
- performance title
- date
- optional venue

Example:

```text
PERFORMANCES
2026 — PRESENT

풀고, 엮다
22 SEP 2026
```

Do not use a collage of many performances on the first screen.

---

# 5. HERO VISUAL

Use the strongest available authentic visual for the selected performance.

Possible visual sources:

- live performance photo
- official poster
- high-quality video still
- newly created editorial artwork
- typography-only composition

The page must not assume that every performance has live photography.

---

# 6. PERFORMANCE VISUAL MODE — REQUIRED

Each performance may define a presentation visual mode.

Conceptual data model:

```ts
presentation: {
  visualMode: "photo" | "poster" | "video-still" | "editorial" | "typography",
  primaryAsset: "...",
  secondaryAsset?: "...",
}
```

Keep the model controlled and minimal.

Do not create one-off visual mode values per performance.

---

# 7. VISUAL MODE PRIORITY

Recommended asset priority:

1. strong authentic live-performance photograph
2. strong official poster / leaflet visual
3. strong frame extracted from authentic performance video
4. newly created editorial artwork
5. typography-only composition

This is a quality hierarchy, not a rigid mandatory order.

Choose the strongest visual that honestly represents the performance.

---

# 8. ARCHIVAL AUTHENTICITY RULE

New editorial visuals may be created when real performance imagery is absent or weak.

However:

**Do not generate a fake documentary performance photograph and present it as if it were an authentic archival record.**

AI-generated or newly designed visuals must be clearly treated as:

- editorial artwork
- graphic interpretation
- visual identity extension

not historical evidence.

The factual archive must remain trustworthy.

---

# 9. ASSET QUALITY RULE

Do not enlarge a weak performance photo merely because it exists.

If the available image cannot support the intended scale or art direction:

- use the poster
- use a video still
- create a new editorial visual
- use typography-only treatment
- request a better source asset

**Do not lower the design quality to accommodate a poor legacy image.**

---

# 10. UPCOMING / ARCHIVE STRUCTURE

Approved:

## One Page, Distinct States

Use:

- `UPCOMING`
- `ARCHIVE`

within the same PERFORMANCES page.

Do not create separate Upcoming and Past pages at the current scale.

---

# 11. UPCOMING EMPHASIS

Upcoming work should be emphasized through:

- larger title
- more whitespace
- position
- small `UPCOMING` label
- stronger visual priority

Avoid:
- giant badges
- colored booking cards
- separate SaaS-like panel
- arbitrary background color change

The Ivory visual system remains dominant.

---

# 12. TIMELINE TYPOGRAPHY

Approved:

## Large Year + Precise Performance Index

Concept:

```text
2026

09.22    풀고, 엮다
08.16    산조길, 둘
08.02    해금, 시대를 잇다
```

Use:
- large Cormorant Garamond for year
- restrained Korean serif/sans for performance metadata
- accurate date hierarchy

Do not make every date equally oversized.

---

# 13. DESKTOP STAGE WINDOW

Approved:

## One Persistent Visual Stage Window

A large visual frame remains spatially stable while the active performance changes.

2026-09-06 strengthened future direction — DOCUMENT ONLY in P2B: pair the persistent large Stage Visual with
a left/index list on desktop. Scroll-active item and hover/focus preview should drive the same stage; hover is an
enhancement, not required navigation. Preserve chronology and direct record access. Resolve competing scroll/hover
selection and independently compose mobile in the later PERFORMANCES bundle, not in navigation refinement.

The Stage Window is not limited to photography.

It may display:

- photo
- poster composition
- editorial artwork
- video still
- typography composition

Therefore it should be understood as a **Performance Visual Stage**, not merely an image container.

---

# 14. STAGE WINDOW TRANSITION

Approved:

## Mask / Crop / Depth Continuity

When the active performance changes:

- keep the Stage Window spatial anchor stable
- transition internal visual through mask/crop/depth
- move title/metadata with restrained timing
- preserve overall layout stability

Prefer crop, mask, depth and shared visual movement to a default crossfade. Keep a small vocabulary from
[Motion §11](03-MOTION-SYSTEM.md), chosen by asset type; do not invent unrelated transitions for individual records.
Work/Album/Performance → Detail should carry the same visual object and crop toward the destination (Motion §16).
These are preserved planning directions, with no runtime implementation or real asset migration in P2B.

Avoid:
- carousel slide movement
- unrelated hard cuts
- constant large-scale zoom
- random transition type per performance

---

# 15. CROSS-MEDIA TRANSITION

The Stage Window must support transitions such as:

```text
PHOTO
→ POSTER
→ EDITORIAL ARTWORK
→ TYPOGRAPHY
```

without feeling like unrelated components being swapped.

Use a common transition family.

For example:
- mask boundary
- opacity
- shared crop
- common framing
- controlled depth

---

# 16. PERFORMANCE ROW INTERACTION

Approved desktop behavior:

- subtle typography shift
- hairline response
- Stage Window synchronizes to selected/hovered performance
- contextual `VIEW` cursor

The row itself remains readable and stable.

Do not expand the whole row dramatically on hover.

---

# 17. ROW HOVER INTENSITY

Use only 1–2 effects at once.

Examples:
- title shift 2–4px
- line extends
- small metadata contrast change
- Stage Window visual change

Avoid:
- scaling the full row
- large spring effects
- distortion shader
- multiple simultaneous animations

---

# 18. PRIMARY / SECONDARY VISUAL

When both strong live photography and a poster exist:

Choose one as the Primary Visual.

Provide the other as a Secondary Action.

Examples:

- `VIEW POSTER`
- `PHOTO`
- `POSTER`

Do not automatically alternate between the two.

The user should control optional secondary viewing.

---

# 19. SECONDARY VISUAL BEHAVIOR

Desktop:
- explicit small action
- hover/tap may swap the Stage Window temporarily

Mobile:
- explicit tap action
- do not depend on hover

Do not hide a strong poster simply because a live photo exists.

Do not force the poster to be secondary if it is actually the strongest visual.

---

# 20. PRIMARY VISUAL RULE

The Primary Visual is the **best available authentic or intentionally editorial representation**.

It may be:
- photo
- poster
- video still
- editorial visual
- typography

Poster is not automatically secondary.

Photo is not automatically primary.

---

# 21. ARCHIVE SCROLL

Use natural vertical scrolling.

The timeline and Stage Window should feel coordinated, not scroll-jacked.

Do not force one wheel gesture to snap between performances.

---

# 22. ACTIVE PERFORMANCE DETECTION

Desktop may determine the active performance through:

- scroll position
- focus
- pointer hover

The implementation must avoid unstable rapid switching when two rows are near the activation boundary.

Use clear activation thresholds/hysteresis where needed.

---

# 23. PERFORMANCES → DETAIL TRANSITION

Approved:

## Current Stage Visual → Detail Hero Shared Transition

The currently visible visual should become the Detail Hero anchor.

Examples:

```text
Photo → Detail Hero Photo
Poster → Detail Hero Poster Composition
Editorial Visual → Detail Hero Editorial Visual
Typography → Detail Hero Typography
```

The transition concept is based on continuity, not asset type.

---

# 24. DETAIL TRANSITION FAMILY

Use the same broader V2 transition language as HOME/WORKS.

PERFORMANCES should use a functional cinematic version.

Do not introduce a totally unrelated curtain/wipe simply because it is a performance page.

Fallback:
- shared image transform
- opacity/transform
- normal route navigation

---

# 25. HOME / WORKS → PERFORMANCES

Entry into the PERFORMANCES index should preserve the V2 editorial language.

Possible anchors:
- performance image
- timeline line
- page hairline
- title typography

Do not require a special one-off transition if a shared V2 transition can preserve continuity.

---

# 26. MOBILE STRUCTURE

Approved:

## Vertical Timeline + Inline Visual

Do not attempt to preserve the desktop sticky Stage Window.

Concept:

```text
2026

09.22
풀고, 엮다
[ PRIMARY VISUAL ]
POSTER ↗

08.16
산조길, 둘
[ PRIMARY VISUAL ]
```

Each item becomes a self-contained editorial record.

---

# 27. MOBILE VISUAL RHYTHM

Do not turn every performance into an identical card.

Vary:
- image height
- crop
- spacing
- typography scale

within a controlled editorial system.

The timeline remains legible.

---

# 28. MOBILE INTERACTION

Approved:

- direct tap on performance → Detail
- optional explicit secondary visual action
- no hover simulation
- no mandatory swipe gallery
- no horizontal timeline

Vertical scrolling remains primary.

---

# 29. MOBILE SECONDARY POSTER / PHOTO

When a secondary visual exists:

Use a small explicit action.

Examples:
- `POSTER`
- `PHOTO`
- `VIEW POSTER`

Do not require:
- long press
- double tap
- hidden gesture

---

# 30. MOBILE DETAIL TRANSITION

Use a simplified version of the shared visual transition.

Requirements:
- short
- stable
- no long input lock
- no layout jump
- fallback available

---

# 31. TYPOGRAPHY-ONLY PERFORMANCE MODE

If no strong visual asset exists, typography-only is a valid intentional mode.

Example:

```text
22 SEP 2026

풀고,
엮다

BUSAN
```

This must look designed, not like a missing-image fallback.

Use:
- scale
- spacing
- line
- crop-like text placement
- subtle motion

---

# 32. EDITORIAL VISUAL MODE

When creating a new editorial visual:

It must derive from the performance concept.

Possible sources:
- poster language
- program concept
- instrument detail
- typography
- abstract line/resonance system
- approved generated artwork
- photographic fragments

Do not create arbitrary decorative backgrounds.

---

# 33. VIDEO-STILL MODE

If authentic performance video exists but still photography does not:

Extract/select a strong still frame.

Requirements:
- sufficient resolution
- no motion blur unless intentional
- composition suitable for desktop/mobile
- source authenticity preserved

If a frame is weak, do not force it to full-screen scale.

---

# 34. PERFORMANCE ASSET AUDIT — REQUIRED

Before production implementation, audit each performance.

For each performance record:

```text
Live Photo:        YES / NO / WEAK
Video:             YES / NO
Poster:            YES / NO
Leaflet:           YES / NO
Editorial Visual:  NEEDED / NOT NEEDED
Mobile Crop:       READY / NEEDED
Primary Mode:      photo / poster / video-still / editorial / typography
Secondary Asset:   optional
```

Do not wait until final QA to discover missing visuals.

---

# 35. ASSET REQUEST RULE

When quality would improve materially, proactively request assets from the user.

For each request, explain in Korean:

1. whether planning/implementation can continue without it
2. why it improves quality
3. exactly what is needed
4. required vs optional
5. when it becomes blocking

Possible requests:
- original performance photos
- higher-resolution poster
- performance video
- leaflet
- official program
- alternate crop/source file

---

# 36. NEW ASSET CREATION

If no existing asset fits V2:

Create or commission a new one.

Possible production paths:
- image editing
- new photography
- generated editorial artwork
- new typography composition
- motion graphic
- still extraction from video

Legacy availability must not determine V2 quality.

---

# 37. REDUCED MOTION

When reduced motion is enabled:

- Stage Window transitions simplify
- no large depth movement
- timeline remains static/readable
- Detail entry simplifies to fade/transform

All performance records remain accessible.

---

# 38. ACCESSIBILITY

Requirements:

- semantic list/timeline structure
- keyboard-accessible performance links
- focus synchronizes with Stage Window where appropriate
- secondary visual actions labeled
- dates readable to screen readers
- current/upcoming state not conveyed by color alone
- hover not required
- reduced motion supported

---

# 39. PERFORMANCE / LOADING

The page may contain many large visual assets.

Requirements:

- responsive image sources
- lazy load offscreen assets
- preload only likely next/active Stage Window content
- avoid decoding every performance image at once
- cancel/reuse pending visual loads where practical
- avoid heavy shaders for simple visual transitions
- preserve smooth timeline scrolling

---

# 40. VISUAL FALLBACK HIERARCHY

For any performance:

Preferred:

1. strong authentic photo
2. strong poster
3. strong authentic video still
4. intentionally created editorial artwork
5. typography-only composition

The hierarchy may be reordered when a lower item is clearly stronger.

The final goal is not "always use a photo."

The final goal is **use the strongest honest representation.**

---

# 41. LEGACY POLICY

Do not inherit legacy Performance layout, CSS, page-specific visual hacks, or Hero treatments merely because they exist.

Legacy content may provide:

- accurate date/title/venue data
- authentic photos
- poster/leaflet files
- video links
- program data

Every visual must still pass V2 art-direction review.

---

# 42. ACCEPTANCE CRITERIA

PERFORMANCES is approved when:

- it feels like a cinematic archive, not an event listing
- chronology is clear
- upcoming work is visible without SaaS-style UI
- Stage Window remains stable and elegant
- cross-media visual transitions feel coherent
- performances without photos still look intentional
- new editorial visuals are not mistaken for documentary records
- mobile does not imitate desktop hover/sticky behavior
- Detail transition preserves the currently viewed visual
- adding future performances does not require new page components or CSS patches

---

# 43. DO

- use chronology meaningfully
- choose the strongest honest visual
- allow poster/editorial/typography modes
- preserve archive trust
- keep Stage Window stable
- keep hover subtle
- request missing source assets early
- create better visuals when necessary

---

# 44. DO NOT

- generic performance cards
- assume every performance has live photography
- create fake documentary images
- auto-cycle photo/poster
- horizontal mobile timeline
- aggressive scroll snapping
- random transition style per performance
- per-performance page hacks
- force weak images to Hero scale
- inherit old visual treatments without review

---

# 45. FINAL PERFORMANCES PRINCIPLE

PERFORMANCES should feel like:

**A living stage at the top, and a trustworthy chronology underneath.**

The archive should preserve what happened without looking archival in the outdated sense.
