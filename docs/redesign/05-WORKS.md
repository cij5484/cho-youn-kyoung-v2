# CHO YOUN KYOUNG WEBSITE V2
## 05 — WORKS

**Version:** 1.10\
**Status:** Atmospheric Depth APPROVED / DEFAULT; B/C retired; delivery authorized\
**Parents:** `00-MASTER-PLAN.md`, `02-DESIGN-SYSTEM.md`, `03-MOTION-SYSTEM.md`, `04-HOME.md`  
**Page Role:** Visual Archive + Functional Archive

## 2026-09-10 — approved default and delivery

User approved the current Atmospheric Depth experience as the normal WORKS page and requested removal
of B/C rather than retaining comparison versions. WORKS no longer mounts comparison controls or consumes
saved/query renderer choices. HOME selections remain unchanged. `/works/` shows the approved experience
without `dev` or `worksExperience` parameters. The server content draft remains private; the approved
seven-record public-reference projection includes Ji Young-hee and links to the existing site.

Current motion: forward enlargement with earlier fade and limited incoming overlap; the final large image
clears before archive formation. Performances precede albums, newest known dates within each group.
A native sticky title rail expands in place into compact archive rows; all thumbnails share one formation
clock. No word-fragment spacing, Project Index label, or scroll-cancelled rail positioning remains.

Local checks explicitly omitted for this delivery. Existing automatic Pages pipeline remains intact.
Earlier local-only notes below describe historical approval boundaries and are superseded by this section.

## 2026-09-09 A Atmospheric Depth refinement — local only

사용자 범위는 **A만**. 기준 `aa0a1ed`, 로컬 `codex/works-atmospheric-signature`.
B/C, Canonical `current`, HOME scene와 자산은 유지한다. PR/push/merge/Pages 배포 및 Canonical 승격은 금지된 상태다.

- 각 실제 작품에 approach → focus → viewing hold → departure를 둔다. Hold에서는 camera와 mood가 멈추고
  다음 작품 opacity는 0이다. Departure에서 다음 온도로 이동하며 역스크롤은 같은 progress를 역으로 계산한다.
  7개 작품의 Spatial section 670svh desktop / 720svh mobile: sticky travel은 각각 570/620svh, native scroll만 사용한다.
- Pigment field의 면적·밀도·warm/cool 분리를 강화한다. Ivory 전체 배경을 다른 단색으로 바꾸지 않는다.
- Shader는 viewport full bleed, image camera viewport와 DOM content frame은 **1880px** 중앙 cap.
  실제 navigation/heading/caption 사이 공간의 94% 높이 안에 native-aspect image가 들어간다.
  짧은 desktop도 같은 height fit을 사용한다. Camera approach와 retreat는 이 focus fit을 기준으로 깊이를 만든다.
- 기존 2×3 mini-grid와 후속 strip 재등장 방식을 모두 제거했다. 마지막 실제 이미지의 표면이 유지된 채
  측정된 자기 Archive slot으로 연속 이동한다. Archive를 더 일찍 같은 공간으로 들여와 이미지가 사라진 뒤
  별도 목록을 여는 간격을 없앤다. 실제 DOM image는 부드러운 mask와 얕은 depth settle로 목록에 스며든다.
  Archive는 spatial catalog 순서 01→07, filter query, 확인된 임시 legacy reference link를 유지한다.
  Row의 실제 viewport 진입이 rule → image aperture → title 2–3 fragments → date/type → index 순서를 만든다.
  페이지 끝에서는 마지막 행도 완성되며 focus/reduced-motion은 즉시 읽을 수 있는 DOM을 제공한다.
- Hover는 rule tension / thumbnail aperture / title counter-motion으로 통일한다. 두 점은 약한 주변 경로 반응을 하고
  목록 끝까지 ambient 상태로 유지한다. 두 점은 24/30Hz timer 제한 대신 native rAF로 갱신한다.
  각진 max-normalized 경로/hard clamp를 smooth harmonic 곡선과 연속 중심/반경 변화로 대체했다.
  HOME 엔진을 복사하거나 재작성하지 않았다.
  Sitewide identity와 미래 페이지 역할은 [Two-point Signature Contract](review/TWO-POINT-SIGNATURE-CONTRACT.md)가 소유한다.
- `usePathnameScroll`은 실제 pathname 변경 후 한 번만 top/focus를 정렬한다. 최초 mount/hash와 동일 pathname
  query/filter/candidate 변경에는 개입하지 않는다. InteractionLab과 Framework Root가 사용하며 Navigation은 수정하지 않는다.

지영희류 누락은 공유 public-reference projection이 과거 P1D private 계약을 따라 제외했기 때문이다.
최신 사용자 요청에 따라 **A 전용 local presentation catalog 7건(음반4/공연3)**으로 추가했다.
기존 HOME official derivative 2048×1834, 확인된 제목/날짜/legacy reference만 사용한다.
서버 private draft, 공통 public catalog6, B/C, metadata/prerender publication 상태는 유지한다.

최소 기술 확인: type-check, 변경 범위 ESLint, A model 5건, 실제 development-preview build.
내부 브라우저는 desktop/390/3440의 A 기본 구도·역스크롤·Archive/두 점만 짧게 확인한다.
Full/E2E/multi-browser/기기 QA와 배포는 하지 않는다. 시각 판단은 사용자 검토를 기다린다.

## 2026-09-09 Reference Fidelity R&D — preserved comparison baseline

사용자는 Helix와 PR #17의 z-depth/wave-path/stack-flow를 시각적으로 **REJECTED / SUPERSEDED**로 판정했다.
같은 renderer/material/camera에서 pose만 바꾸는 접근은 폐기했다. 기존 scene/layout/test는 active runtime에서
제거하고 Git history에 보존한다. 일반 `/works/`와 `dev=0`의 `WorksPage` / Canonical `current`는 그대로다.

구현 전에 지정 reference의 글·demo·공개 source를 조사했다. 실제 관찰과 source 검증, V2 판단을 구분한
[WORKS Reference Fidelity](review/WORKS-REFERENCE-FIDELITY.md)가 구현 체크리스트다. 새 후보의 선택은 사용자에게 있다.

| 후보 | URL value (`?dev=1&worksExperience=`) | 독립 시각 엔진 |
|---|---|---|
| A · 공간 깊이 | `atmospheric-depth` | Three perspective camera corridor + 별도 GLSL 분위기. 작품별 mood, velocity drift/breath, pointer parallax. |
| B · 이미지 회전 | `image-rotations` | DOM/CSS 3D. 작품별 비선형 XYZ 입·퇴장, readable focus와 속도 cue. |
| C · WebGL 에디토리얼 | `webgl-editorial` | 실제 DOM editorial layout에 orthographic image plane을 동기화하는 material reveal. |

`src/works/candidates`의 각 engine/component/CSS는 독립이다. 공통은 `worksCatalog`, 실제 web derivatives,
`CompactArchive`, navigation과 Draft/Promotion뿐이다. 공유 visual sample/renderer/camera/lighting은 없다.
`WorksPrototype`은 선택 engine을 지연 로드하고 이전 component를 먼저 unmount한다. 비선택 engine은
renderer/RAF/shader animation을 소유하지 않는다. 비교 baseline의 A/B는260svh core travel, C는 자연 DOM gallery 흐름이다. A의 최신 변경은 위 refinement가 우선한다.
모두 compact thumbnail/title/date/type/filter/chronological archive에 접근한다. 새 detail page나 콘텐츠 없음.

Mobile은 A의 얕은 corridor, B의 한 작품 중심 entrance/exit, C의 읽을 크기 vertical flow로 별도 구성한다.
Native vertical scroll을 유지하며 horizontal gesture를 요구하지 않는다. Reduced motion은 실제 DOM image/link를
보존한다. WebGL shader/texture/context 실패도 DOM/compact archive에 접근 가능해야 한다.
선택 image identity는 실제 record ID와 원본 image에 묶으며 미래 Detail adapter 상태와 현재 legacy link를 구분한다.

기존 rejected Draft값은 current로 이관하고 HOME 값은 유지한다. 새 값만 선택·저장·승격 후보로 유효하다.
후보 선택이나 Preview 배포는 Canonical 승격이 아니다. Framework root route는 기존 `WorksPage`만 참조한다.
HOME scene, 원본 assets, private content, 기존 public catalog와 navigation은 변경하지 않는다.

Lean 범위: 해당 모델/설정, type/lint/actual Preview build, 작은 Desktop/Mobile load/scroll/reverse/fallback/
switch-cleanup/archive/route 검증. 사용자 시각 선택 이전에 QUALITY APPROVED를 선언하지 않는다.
Full Release Gate, 전체 HOME E2E, broad device matrix, HOME 성능 조사와 새 페이지는 범위 밖이다.

## 2026-09-08 실제 구현 — Visual Rebuild / REVIEW READY

이전 큰 neutral frame/card 중심 결과는 사용자가 시각적으로 거절했다. 아래가 현재 실제 구조이며 과거
RESULT는 해당 revision의 기록으로 보존한다. WORKS 상단 main title 위치는 변경하지 않는다.

`src/works/WorksPage.tsx` 하나를 Framework와 Pages Preview `/works/`에서 사용한다.
**DUAL WORLDS → CONVERGENCE → ARCHIVE** 세 구간을 분리한다. Opening은 grid의 큰 카드가 아니라
독립 `.works-worlds` 구도다. Album은 native cover/package의 edge·light·얕은 depth, Performance는
세로 poster plane과 09/22 date anchor로 서로 다른 성격을 갖는다. 큰 beige frame을 사용하지 않는다.

대표 visual마다 실제 이미지 DOM은 하나뿐이다. `useWorksChoreography.ts`가 opening anchor와 archive slot의
문서 좌표를 측정해 XY/scale을 이동시킨다. 필터·header clearance를 포함한 착지 frame에서 archive로 정리된다.
같은 대상의 연속성을 유지하며 새 image clone fade-in이나 heavy transition framework를 사용하지 않는다.
Native scroll을 역으로 움직이면 같은 geometry를 되짚는다. Archive는 native ratio, controlled presentation
metadata와 간결한 title/date/affordance로 구성한다. 자세한 사실은 Chronological Index가 담당한다.

Mobile은 Album → Performance 세로 world 후 짧은 convergence, 첫 두 slot의 제한적 paired accent,
이후 큰 1열 archive다. Hover/drag 없이 모두 탐색 가능하다. Desktop hover는 album surface/light와
performance plane/date 반응을 구분한다. ALL/ALBUMS/PERFORMANCES query/history reflow를 유지하며 필터 변경 시
toolbar의 viewport 위치를 보존한다. Keyboard는 landing과 focus outline을 제공하고 reduced motion/no-JS는
빈 opening scroll 공간 없이 정적 native archive와 필터/Index를 유지한다.

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
