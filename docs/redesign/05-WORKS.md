# CHO YOUN KYOUNG WEBSITE V2
## 05 — WORKS

**Version:** 1.3\
**Status:** First real KO WORKS implemented / REVIEW READY; baseline preserved\
**Parents:** `00-MASTER-PLAN.md`, `02-DESIGN-SYSTEM.md`, `03-MOTION-SYSTEM.md`, `04-HOME.md`  
**Page Role:** Visual Archive + Functional Archive

## 2026-09-08 실제 구현 — REVIEW READY

`src/works/WorksPage.tsx` 하나를 Framework와 Pages Preview `/works/`에서 사용한다. Album/package와
Performance/poster 비대칭 portal 두 개가 동일 DOM으로 이동·축소되며 12열 editorial archive로 이어진다.
모바일은 큰 세로 portal/1열 archive. ALL/ALBUMS/PERFORMANCES는 query 기반 reflow와 Back/Forward를 보존하며,
Chronological Index는 별도의 정확한 탐색층이다. Reduced motion은 정적 기록/필터를 유지한다.

독립 `catalog.ts`/`source-manifest.json`은 legacy main `3df8057`의 전체 음반 4건·공연 3건을 감사했다.
P1D 비공개 충돌 1건을 제외한 **음반 3건 + 공연 3건**만 최소 사실로 포함한다. HOME selection을 전체 기록으로
간주하지 않는다. 미확인 발매일은 만들지 않고 발매 예정 상태를 유지한다. 상세는 확인된 legacy `/#/album/...`,
`/#/performance/...`로 연결한다. V2는 clean URL 유지, 다른 서브페이지와 Native detail transition은 미구현이다.

영문 번역 미확보: KO만 공개하고 `/en/works/`를 생성하지 않는다. 실제 KO metadata와 ko/x-default만 출력한다.
공통 EN 메뉴에서 원문 KO WORKS로 접근 가능하며 이 페이지의 EN 언어 전환은 unavailable이다.
무대 실사진이 없는 항목은 공식 포스터를 사용한다. 새 2개 이미지는 기존 최적화본의 정확한 복사이며
master를 변경하지 않았다. 자산 provisional 상태는 유지한다. 새 페이지의 시각 품질 승인은 사용자 검토 후다.

## 2026-09-08 연구 반영 — historical plan

기존 Dual Archive + Unified Timeline baseline을 유지한다. 아래는 구현 전 `/works/` **route fixture** 시점의 계획이며
아래 후보는 구현·공개 콘텐츠·시각 승인이 아니다. HOME 04의 복원된 Desktop/Mobile ribbon은 고정한다.

- **목적 / 첫 화면:** album 1개와 performance 1개의 비대칭 입구로 작업의 두 성격을 보여주고,
  전체 Index에는 즉시 접근하게 한다. 실제 공개 승인 record만 수량과 목록에 포함한다.
- **대표 기법:** 입구의 두 대상이 자리의 연속성을 유지하며 archive의 기준 칸이 된다.
  PHOTOYOSHI의 overview→focus, Joffrey Spitzer의 동일 대상 재배치를 참고한다. Depth Queue와 HOME 잔상은 적용하지 않는다.
- **모바일:** 세로 dual intro, 큰 1열 작품과 필요한 보조 2열, 짧은 text filter. 탐색에 hover/drag를 요구하지 않는다.
- **다음 단위:** WORKS 단일 페이지의 dual intro→archive, filter/back 복원과 명시된 detail fixture 1개 연결.
  상세 이동은 향후 Framework route에서 Native shared-image를 우선 검토하며 범용 transition framework를 선행 제작하지 않는다.

자산·원리·정보 우선순위와 범위는 [연구 §4.1](review/EXPERIENCE-PROTOTYPE-RESEARCH.md#41-works--두-작업-세계가-하나의-색인으로-펼쳐짐),
라우터·실패 처리 기준은 [§5](review/EXPERIENCE-PROTOTYPE-RESEARCH.md#5-페이지-이동-연구--native-우선-현재-preview에-framework를-만들지-않음)를 따른다.

---

# 1. WORKS OBJECTIVE

WORKS is not an expanded copy of HOME Selected Works.

HOME is for **discovery**.

WORKS is for **exploration, comparison, and archive access**.

The page must achieve both:

- strong visual/editorial impact
- accurate and efficient archive navigation

The user should be able to understand Cho Youn Kyoung's body of work at a glance, then move naturally into Albums, Performances, or an individual detail page.

---

# 2. CORE STRUCTURE

Approved direction:

## Dual Archive + Unified Timeline

WORKS opens with two distinct content worlds:

- ALBUMS
- PERFORMANCES

Then transitions into a unified archive.

The page should not function as a simple category chooser.

---

# 3. HOME → WORKS TRANSITION

Approved:

**HOME Outro Hairline → WORKS Grid Line**

The final hairline from HOME should become the first structural grid/divider line of WORKS.

Narrative:

`HOME closure → WORKS archive structure`

This transition should preserve visual continuity between pages.

Do not use a generic full-page fade as the primary experience.

Fallback:
- short opacity/transform transition
- immediate functional navigation

---

# 4. WORKS INTRO / DUAL PORTAL

2026-09-06 future motion direction — DOCUMENT ONLY, not implemented in P2B: explore an initial compact /
scattered work cluster that expands and reorganizes with native scroll into the full editorial archive composition.
Prefer continuous spatial transformation over generic gallery fade-in. Preserve the ALBUMS/PERFORMANCES identity,
archive access and functional routes in the structure below. The later WORKS prototype must reconcile the cluster
with this dual-portal baseline and separately validate mobile, reduced motion and direct navigation. Complex layout
tools such as GSAP Flip require their own fit/payload decision; this note does not authorize implementation.

## Desktop

Approved:

### Asymmetric Dual Portal

Do not use a rigid 50/50 split.

Use the 12-column editorial grid to create two distinct visual territories.

Concept:

```text
WORKS

ALBUMS
04 RECORDINGS

                 [ Album Artwork / Object ]

                                PERFORMANCES
                                LIVE ARCHIVE

        [ Performance Image ]
```

Albums and Performances must be visually distinct through composition, not through arbitrary UI color coding.

---

# 5. CATEGORY LANGUAGE

## ALBUMS

Visual language:
- physical object
- square/package ratio
- cover/package emphasis
- measured, sculptural composition
- quieter image framing

## PERFORMANCES

Visual language:
- wide or portrait stage photography
- date/location emphasis
- cinematic crop
- live atmosphere
- stronger photographic movement where appropriate

**Do not rely on color alone to distinguish categories.**

---

# 6. PORTAL INTERACTION

Desktop:
- subtle hover response
- restrained image movement
- `VIEW` cursor where appropriate
- typography should remain stable and readable

The Portal should feel like an authored opening scene, not two giant buttons.

---

# 7. PORTAL → ARCHIVE TRANSITION

Approved:

**The two portal worlds move apart slightly and reveal the unified archive between/under them.**

Narrative:

`two practices → one body of work`

Do not require the user to choose ALBUMS or PERFORMANCES before reaching ALL WORKS.

The ALL archive must remain directly accessible.

---

# 8. FILTER

Approved filter:

```text
ALL   ALBUMS   PERFORMANCES
```

Behavior:
- smooth layout reflow
- no cartoon spring/bounce
- preserve spatial logic
- update visible archive without full page navigation

Do not use a dropdown on desktop as the primary filter.

---

# 9. VISUAL ARCHIVE GRID

Approved:

## Editorial Grid + Chronological Index

The first archive layer is a visual editorial grid.

The second archive layer is a precise chronological index.

This provides:

- visual discovery
- exact archive access

---

# 10. VISUAL GRID STRUCTURE

Approved:

### 12-column Editorial Grid

Not strict masonry.

Not uniform cards.

Use intentional whitespace.

Rows may align loosely while preserving editorial rhythm.

---

# 11. WORK EMPHASIS

Approved:

- 1–2 featured works may appear large
- remaining works use medium/small visual emphasis
- emphasis is controlled through presentation metadata

Do not let every work have a random size.

---

# 12. PRESENTATION METADATA

Do not hard-code layout rules per work in CSS.

Use presentation metadata.

Conceptual example:

```ts
presentation: {
  featured: true,
  size: "large",
  ratio: "wide",
  emphasis: "primary"
}
```

Possible controlled values:

- `size: small | medium | large`
- `ratio: square | portrait | wide`
- `emphasis: standard | featured`

The data model should remain intentionally small.

Do not create arbitrary one-off layout fields for each work.

---

# 13. IMAGE RATIO POLICY

Approved:

**Use the natural visual language of the work category.**

Albums:
- package / cover ratio
- square or physical-object composition

Performances:
- wide / portrait stage imagery
- photographic crop according to source strength

Do not force every asset into one ratio.

Do not use random ratios for visual novelty.

---

# 14. SORTING

Approved default:

**Newest first**

Featured emphasis may be curated manually.

Chronology remains the factual archive structure.

Do not fully hand-curate ordering in a way that makes the archive difficult to maintain.

---

# 15. GRID CONTENT

Each item should prioritize:

- title
- type
- year
- strong artwork/image

Avoid long descriptions in the visual grid.

Detailed copy belongs on detail pages.

---

# 16. GRID HOVER

Approved:

- image scale around 1–2% where appropriate
- subtle metadata shift
- line response
- contextual `VIEW` cursor

Use only 1–2 simultaneous effects.

Do not add shader distortion by default.

---

# 17. ALL WORKS INDEX

The lower archive section is a precise chronological index.

Suggested structure:

```text
YEAR     TITLE                              TYPE
2026     Cho Youn Kyoung Haegeum ...        ALBUM
2026     풀고, 엮다                          PERFORMANCE
...
```

The exact typographic structure is refined during prototype.

---

# 18. DESKTOP INDEX PREVIEW

Approved:

**Hover row → image preview appears nearby**

The preview should:
- remain secondary to text
- follow layout rules
- not obscure neighboring rows
- use a restrained reveal

Do not create a giant cursor-following image that makes the list hard to read.

---

# 19. INDEX INFORMATION

Minimum:

- year
- title
- type

Optional if useful:
- date
- venue
- release status

Do not overload the index.

---

# 20. DETAIL PAGE ENTRY

WORKS uses the same transition family as HOME, but faster.

Approved:

## Fast Functional Shared Transition

HOME:
- cinematic signature transition

WORKS:
- shorter, more functional transition

The family should feel related.

Do not repeat the full HOME transition duration on every archive click.

---

# 21. SHARED TRANSITION FALLBACK

When shared transition is unsupported or inappropriate:

- opacity
- transform
- normal route navigation

Navigation must never depend on transition support.

---

# 22. MOBILE — INTRO

Approved:

## Dual Portal becomes a vertical composition

Do not shrink the desktop asymmetric composition.

Mobile sequence:

- ALBUMS block
- album artwork/object
- PERFORMANCES block
- performance imagery

Each section remains visually distinct.

---

# 23. MOBILE — VISUAL GRID

Approved:

## Mixed 1-column / 2-column Editorial Layout

Featured work:
- full width

Smaller works:
- two-column where content remains readable

Concept:

```text
[ FEATURED                ]

[ ALBUM ]      [ ALBUM ]

[ PERFORMANCE              ]

[ ALBUM ]      [ WORK ]
```

Do not use a fixed two-column grid for every work.

---

# 24. MOBILE — FILTER

Approved:

## Sticky Text Filter

```text
ALL   ALBUMS   PERFORMANCES
```

The filter may remain sticky while the archive is being explored.

Requirements:
- compact
- clear active state
- no pill-style UI by default
- no generic select box unless necessary as fallback

---

# 25. MOBILE — ALL WORKS INDEX

Approved:

**Rows navigate directly to Detail.**

Because mobile has no hover, do not simulate desktop hover with a two-step interaction.

Use a small visible thumbnail with the row.

Suggested:

```text
2026   [thumb]  TITLE  TYPE
```

Tap:
- direct detail navigation

Do not require:
- first tap preview
- second tap open

---

# 26. MOBILE — TOUCH BEHAVIOR

Requirements:

- vertical scrolling remains reliable
- no accidental horizontal capture
- touch targets remain large enough
- sticky filter must not block content
- thumbnails must remain legible

---

# 27. ACCESSIBILITY

WORKS must support:

- keyboard navigation
- visible focus states
- semantic links
- filter controls with clear selected state
- archive access without hover
- reduced-motion transitions
- screen-reader-readable titles/types/years

Hover previews are enhancement only.

---

# 28. REDUCED MOTION

When reduced motion is enabled:

- no large preview movement
- no complex portal separation animation
- shared transitions simplify to fade/transform
- filter reflow remains readable and stable

The page should retain editorial quality without motion.

---

# 29. PERFORMANCE

WORKS may contain many images.

Requirements:

- responsive image sources
- intentional preload/lazy-load strategy
- do not decode/load full-size assets unnecessarily
- avoid running parallax/hover work for offscreen items
- maintain smooth filtering/reflow
- avoid page-wide React state updates on pointer movement

---

# 30. ASSET REQUIREMENTS

Current legacy content may be used as a source only after review.

For each featured/visible work, confirm:

- strongest available artwork
- sufficient resolution
- correct crop potential
- tonal fit with V2
- desktop/mobile suitability

If a selected work does not have a strong V2-quality visual, proactively request or create a better asset.

**Do not downgrade the layout to accommodate a weak legacy image.**

---

# 31. LEGACY RULE

Do not reuse the current WORKS layout, cards, CSS, or presentation architecture merely because they already exist.

Reuse only:
- verified work data
- approved original artwork
- authentic performance photography
- useful URLs/assets
- logic after architecture review

The V2 WORKS page must be newly composed.

---

# 32. ACCEPTANCE CRITERIA

WORKS is approved when:

- first screen feels editorial, not categorical
- Albums and Performances are clearly different without color gimmicks
- ALL archive is immediately reachable
- Visual Grid is expressive but still navigable
- All Works Index is precise
- filter reflow is smooth
- mobile feels intentionally redesigned
- hover is enhancement, never required
- detail entry feels connected to HOME transition language
- adding future works does not require CSS patches

---

# 33. DO

- preserve strong hierarchy
- use natural image ratios
- use 1–2 featured works
- keep factual chronology accurate
- keep presentation metadata small and controlled
- use whitespace intentionally
- support both visual browsing and exact archive lookup

---

# 34. DO NOT

- uniform ecommerce cards
- random masonry
- infinite/free canvas
- category selection gate before ALL archive
- long description copy in grid
- per-work CSS hacks
- random accent colors
- multiple heavy hover effects
- desktop hover simulation on mobile
- legacy layout inheritance

---

# 35. FINAL WORKS PRINCIPLE

WORKS should feel like:

**A curated exhibition at the top, and a trustworthy archive underneath.**

The user should be able to admire the work and also find it.
