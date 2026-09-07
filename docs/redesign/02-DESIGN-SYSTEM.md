# CHO YOUN KYOUNG WEBSITE V2
## 02 — DESIGN SYSTEM

**Version:** 1.10\
**Status:** Approved Design Baseline / P2A visual result approved and delivered; P2B Bold QUALITY APPROVED FOR HERO INTEGRATION / FROZEN\
**Parent:** `00-MASTER-PLAN.md`  
**Art Direction:** Contemporary Editorial / Ivory

---

# 1. DESIGN DIRECTION

## CONTEMPORARY EDITORIAL / IVORY

전체 사이트는 하나의 일관된 Ivory world를 유지한다.

작품마다 UI 배경색을 크게 바꾸는 방식은 사용하지 않는다.

변화는 photography, typography, composition, scale, spacing, crop, motion, 3D, editorial rhythm으로 만든다.

**Static Color, Dynamic Composition.**

2026-09-06 art criterion: **BOLD, CURATED, PURPOSEFUL**. 첫 방문에서 높은 완성도와 기억에 남는 인상을
주는 것이 최우선 시각 목표다. Clear purpose와 visual quality를 가진 화려함·실험성을 적극 허용한다.
필요하면 Refined / Bold를 비교하며 더 과감한 초기 prototype에서 불필요한 효과를 visual review로 덜어낸다.
Ivory world와 정보 접근성은 유지한다. Reference adoption은 MASTER §6, motion signature는 Motion §3을 따른다.

---

경험 원칙의 정본은 [MASTER §3.1](00-MASTER-PLAN.md#v2-experience-principles)이다.
SOUND의 **Electric Violet #6334E5를 Bow Energy Signature Accent 정본**으로 승인했다.
Charcoal 현 + 같은 Violet의 단일 marker/점차 사라지는 trail; global Bronze token은 유지한다.
다른 Violet은 Lab/evidence에만 보존한다. Ivory 대비 계산·tuning은 [SOUND 계약](review/SOUND-BOW-CONTACT-COMPARISON.md)이 소유한다.
ADAPTIVE UI의 장면 대비는 위 MASTER의 authored theme 정책을 따른다. 기존 Ivory world를 임의의 색 테마로
교체한다는 의미가 아니며, 여기서 production navigation을 추가하지 않는다.

# 2. VISUAL CHARACTER

Desired:
- bold, curated, purposeful
- quiet where narrative contrast requires it
- refined
- premium
- artistic
- contemporary
- restrained through curation, not minimized effects
- readable
- image-led
- generous whitespace

Avoid:
- SaaS-style rounded cards
- large drop shadows
- pill buttons
- decorative gradients
- generic dashboard UI

---

# 3. PRIMARY COLOR PALETTE

```css
:root {
  --color-canvas: #F4F0E8;
  --color-surface: #FAF8F3;
  --color-ink: #171715;
  --color-charcoal: #2B2A27;
  --color-muted: #77736C; /* decorative / qualifying large text only */
  --color-muted-text: #6D6962; /* normal-size metadata/body on approved light backgrounds */
  --color-hairline: #D8D1C6;
  --color-accent: #9A8164;
  --color-dark-stage: #151513;
}
```

Rules:
- UI remains restrained and near-monochrome.
- Artwork keeps its original color.
- Warm Accent is used sparingly.
- Dark Stage is occasional contrast, not a second global theme.

**Artwork is allowed to carry color. Interface remains restrained.**

## Accessible muted roles — verified calculation, 2026-09-05

Keep the original warm muted tone for decoration or qualifying large text. Use `--color-muted-text: #6D6962` for normal-size metadata/body on the approved light backgrounds, at opacity 1.

| Foreground | Background | Contrast | Normal text AA ≥4.5:1 |
|---|---|---|---|
| #77736C original muted | #F4F0E8 Canvas | 4.1489:1 | Fail |
| #77736C original muted | #FAF8F3 Surface | 4.4431:1 | Fail — do not round up to a pass |
| #6D6962 accessible muted text | #F4F0E8 Canvas | 4.8024:1 | Pass |
| #6D6962 accessible muted text | #FAF8F3 Surface | 5.1429:1 | Pass |

Method: convert each 8-bit sRGB channel to 0–1, linearize with c/12.92 if c ≤0.04045, otherwise ((c+0.055)/1.055)^2.4. Relative luminance L = 0.2126R + 0.7152G + 0.0722B. Contrast = (Llighter+0.05)/(Ldarker+0.05). Computed using full precision before displaying four decimals.

[W3C contrast minimum](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) defines 4.5:1 for ordinary text and 3:1 for qualifying large text. Large text qualification must be checked by rendered size/weight; a token name alone does not qualify it.

Do not reduce opacity of the accessible text token or use it over unverified images/gradients. Dark Stage needs independently checked light text. Accent #9A8164 remains decorative/emphasis-only where appropriate; it is not a replacement for accessible normal text. Verify actual background, opacity, hover/disabled states and focus during implementation.

---

# 4. TYPOGRAPHY

Approved direction:

```text
English Display: Cormorant Garamond
Korean Display: Noto Serif KR
Body / UI: Noto Sans KR
```

Do not replace the display font merely for implementation convenience.

---

# 5. TYPE SCALE

Prototype baseline:

```css
--display-xl: clamp(5rem, 10vw, 10rem);
--display-l: clamp(3rem, 6vw, 6rem);
--display-m: clamp(2rem, 3.8vw, 4rem);
--heading: clamp(1.5rem, 2.2vw, 2.5rem);
--body-large: clamp(1.05rem, 1.3vw, 1.3rem);
--body: 1rem;
--small: 0.72rem;
```

Suggested line-height:
- Display XL: `0.82–0.9`
- Display L/M: `0.95–1`
- Body: `1.7–1.8`

실제 값은 prototype에서 optical adjustment한다.

HOME V2.1 Hero는 Moving Editorial Poster다. CHO / YOUN / KYOUNG 세 줄의 전체 composition이 viewport 높이 약 55–65%를 점유하도록 허용하되 실제 font metric/breakpoint/crop으로 조정한다. 위 general display token의 상한을 Hero의 절대 한계로 강제하지 않는다. Font family 결정은 유지하며 headline 크기만 키운 결과를 완료로 판단하지 않는다.

---

# 6. LETTER SPACING / CASE

Display serif:
`-0.02em ~ 0.01em`

Small uppercase UI / metadata:
`0.08em ~ 0.16em`

긴 문장을 모두 uppercase로 만들지 않는다.

---

# 7. GRID

Desktop: **12-column editorial grid**

Base page gutter:

```css
--page-gutter: clamp(24px, 4vw, 72px);
```

모든 section을 동일 max-width에 가두지 않는다.

## CONTAINED
Biography, Credits, Program notes 등 읽기 중심.

## FULL / NEAR FULL BLEED
Hero, Selected Works, Performance imagery, 3D Album 등 시각 중심.

Empty columns are intentional.

---

# 8. SPACING SYSTEM

```css
--space-1: 8px;
--space-2: 12px;
--space-3: 16px;
--space-4: 24px;
--space-5: 32px;
--space-6: 48px;
--space-7: 64px;
--space-8: 96px;
--space-9: 128px;
--space-10: 160px;
```

Large HOME sections:
- Desktop: `96–160px`
- Mobile: `64–96px`

Hero/immersive scenes may use viewport-specific rules.

---

# 9. IMAGE PHILOSOPHY

Photography is content, not decoration.

Rules:
- use large imagery
- almost no border-radius
- no generic card shadow
- respect original atmosphere
- deliberate crop
- editorial composition
- avoid repeating the same portrait everywhere

Default:
```css
border-radius: 0;
```

---

# 10. ARTIST PHOTOGRAPHY

Hero:
- large, high presence
- HOME V2.1: purple hanbok side/back/partial-face close-up 후보, desktop 오른쪽 약 58–62% visual zone
- viewport 밖 crop 허용; 정확한 source/crop/해상도는 추후 검토
- typography와 1–2개 정교한 front/back intersection, 단순 사진 위 text overlay 금지

About:
- more static editorial portrait
- HOME Scene 07에서 처음 clear front-facing/3/4 face를 보여준다; standalone ABOUT의 별도 portrait 구성 요구는 유지

Supporting:
- use different photo sets/angles

Treatment:
- slightly reduced saturation
- neutral white balance
- natural skin tone
- restrained contrast

Avoid artificial sepia/vintage filter.

---

# 11. PERFORMANCE PHOTOGRAPHY

Performance content may be the most cinematic visual category.

Allowed:
- monochrome
- low saturation
- stronger contrast
- wide crops
- occasional Dark Stage

---

# 12. ALBUM ARTWORK

Album package is treated as a **physical artwork object**, not a generic image card.

Possible:
- 3D
- front/back/spine
- CD
- booklet
- close-up
- real shadow
- physical rotation

Preserve original artwork color.

---

# 13. DECORATIVE GRAPHICS

Use sparingly:
- thin lines
- subtle curves
- resonance circles
- faint ink-like texture
- fine editorial rules

Do not repeat paper texture or traditional patterns as generic decoration.

---

# 14. LINE SYSTEM

Default:
```css
border-color: var(--color-hairline);
border-width: 1px;
```

Special fine lines can be visually around `0.5–1px`.

HOME V2.1의 두 extremely thin lines는 decoration이 아니라 structural motif다: Hero → Haegeum guide → Sound → Selected Works axis → Outro resolve. 한 strand가 axis를 맡을 수 있지만 pair의 정체성은 유지한다. 대부분 straight하며 tension/micro vibration/density/damping/sustained friction/subtle resonance를 표현한다. Generic curve/resonance-circle 허용은 이 pair를 큰 waveform/equalizer/sine-wave로 바꾸는 허가가 아니다. 03 §45와 04 §26을 따른다.

---

# 15. BUTTON / LINK SYSTEM

Avoid filled SaaS-style buttons by default.

Preferred:
`VIEW WORK →`

or text + underline expansion.

No pill UI by default.

---

# 16. NAVIGATION

Desktop navigation should remain concise.

Typical labels:
HOME / WORKS / MEDIA / ABOUT / CONTACT

Artist/trigger/index utilities use small uppercase Sans; opened primary links use editorial display typography.

Selected menu state uses stronger Ink, subtle display weight and corresponding index-number emphasis.
Keep horizontal row hairlines as structure. Do not add a selected underline or an extra long hover underline.

Header must not dominate the Hero.

2026-09-06 사용자 최종 통합: 초기 header는 좌상단 CHO YOUN KYOUNG + 우상단 MENU trigger다. 별도 세로 링크의 scroll morph 요구는 취소됐다. Click/keyboard/tap으로만 열며 hover-open은 금지한다. 사용자는 P2B Bold를 QUALITY APPROVED FOR HERO INTEGRATION으로 승인·freeze했다. MENU/CLOSE mask, MENU origin diagonal Ivory reveal, opening 500ms / closing 400ms, Letter Slip X +3px / Y ±7px / 300ms / 20ms stagger를 canonical 기준으로 유지한다. Refined는 Lab/evidence 이력으로만 남기며 runtime 선택 분기는 없다. 실제 Hero와 경쟁한다는 후속 visual evidence 이전에 Bold 수치를 보수적으로 낮추지 않는다. Letter Slip은 교대하는 작은 문자별 대각선 이동이며 index 반응만 보조한다. Selected/hover underline은 제거하고 row separator는 유지한다. 최종 Hero 결합과 필요한 header scroll 변화는 P2C에서 판단하며 이번에는 구현하지 않는다. Readability, focus와 touch target은 시각적 절제 때문에 희생하지 않는다. [현재 navigation guide](review/EDITORIAL-NAVIGATION-PROTOTYPE.md)가 tuning과 증거를 소유한다.

---

# 17. SECTION NUMBERING

Editorial numbering is allowed.

Examples: `01`, `02`, `03`.

Numbers may become design elements in Works, Program, Archive.

---

# 18. DARK STAGE

Use rarely.

Default candidate: Performance section.

```css
background: var(--color-dark-stage);
color: var(--color-canvas);
```

Dark areas must not destroy the Ivory identity.

HOME에서는 Scene 06 Performance가 첫 큰 Ivory→Dark Stage 전환이며, Album Object peak 다음이라 motion은 오히려 조용하다. Scene 07 About에서 Ivory로 돌아온다.

---

# 19. SELECTED WORKS

Keep the main Canvas.

Do not switch the whole UI into different colors for each work.

Use:
- artwork
- crop
- title
- scale
- hover response
- image reveal
- composition
- motion

HOME V2.1은 4–5작을 서로 다른 scale/crop/vertical placement로 놓은 하나의 긴 asymmetric editorial surface다. 동일 카드 carousel이 아니며 hover를 작품마다 기계적으로 반복하지 않는다.

Desktop: drag / optional wheel with native vertical-scroll escape.
Mobile: vertical-first; intentional horizontal interaction only where needed.

---

# 20. RESPONSIVE FOUNDATION

Desktop:
- large type
- large whitespace
- asymmetric grid
- pointer interaction
- drag
- hover

Mobile:
- strong vertical rhythm
- recomposed layout
- swipe/tap
- simplified decorative layers
- mobile-specific 3D quality

Mobile is not a scaled-down desktop.

---

# 21. MOBILE GRID

Desktop 12-column → Mobile 4-column or fluid equivalent.

Do not force desktop column relationships into narrow screens.

---

# 22. DESIGN TOKEN POLICY

Common values must be tokenized.

Avoid scattered magic numbers where a shared design value exists.

---

# 23. DO NOT INTRODUCE WITHOUT DESIGN APPROVAL

- random accent colors
- decorative gradients
- rounded cards
- generic dashboard components
- large shadows
- glassmorphism
- neumorphism
- arbitrary font families
- multiple unrelated serif fonts
- work-specific global CSS patches
- inconsistent widths
- random radius values
- default Material/Bootstrap-like buttons
- unnecessary icon libraries for simple arrows

---

# 24. ART DIRECTION REFERENCE

Earlier approved HOME Art Direction V1 remains a historical visual reference for:
- tone
- spacing
- composition
- ivory background
- serif scale
- straight photography
- line system
- album presentation
- contrast rhythm

It is **not** a pixel-perfect final layout specification.

The current canonical HOME direction is V2.1 in [04-HOME.md](04-HOME.md), which preserves and raises these principles. Typography/photography/crop/composition/depth/whitespace/timing/continuity/physical response create the digital-artwork impression. Reference principles guide independent design, not copied layout, animation, typography composition, source code or unique interaction.

Hero and major scenes require the Visual Quality Gate in 04 §24: first viewport works alone as an art poster, precise crop/type overlap, no generic template/SaaS cards/repeated fade-up/excessive rounding or unnecessary effects, responsive interruptible motion, equivalent mobile art direction. Functional completion is separate from Quality Approved. No UI or visual gate implementation is included in this document revision.

---

# 25. LANGUAGE SWITCHER VISUAL RULE

The Korean / English switcher is part of the navigation composition.

Preferred visual forms:

```text
KR / EN
KR · EN
KOR / ENG
```

The exact label is decided with the final Header/Hero composition.

Rules:

- no generic select box unless accessibility/testing requires it
- no pill-shaped language control by default
- active language must be visually clear
- keyboard focus must be visible
- language switching must preserve the equivalent route when possible
- the control must remain compact in the transformed functional header

---

# 26. SOU.P CREDIT VISUAL RULE

Creative credit should remain discreet and belong to HOME Outro / Footer only. Do not repeat the Sou.P Easter Egg on ABOUT or other page footers. ABOUT has a separate small Delight.

Concept:

```text
CREATIVE DIRECTION & DESIGN — Sou.P
```

It may use vertical or edge-oriented editorial placement if it fits the final composition.

Rules:

- small scale
- quiet contrast
- no prominent badge/logo treatment
- may include a subtle discoverability cue on hover/tap
- hidden personal copy is not visible by default
- mobile discovery preserves the two-step interaction:
  1. reveal/open credit
  2. tap `Sou.P` again to reveal the hidden message

The credit must feel like a signature, not an advertisement.

---

# 27. FINAL DESIGN PRINCIPLE

**At first the visitor notices the beauty of the site.  
Then the website disappears, and only the music and work remain.**


---

# 28. P2A PRODUCTION FOUNDATION / IMPLEMENTATION BOUNDARY

The original 27 art-direction sections remain canonical. [Design System Foundation](review/DESIGN-SYSTEM-FOUNDATION.md)
owns the CSS roles, font delivery/fallback, safe gutters, 4/12-column primitives, base/focus/touch/reduced-motion
and the development-only specimen. [P2A result](../../P2A-RESULT.md) owns validation and screenshot evidence.

The three approved families and nine palette values are retained. No HOME composition, navigation choreography,
portrait, artwork, audio reaction or 3D is implemented by this foundation. P2A subsequently received user visual approval and was delivered as 7714907.
The separately authorized [P2B Navigation Prototype](review/EDITORIAL-NAVIGATION-PROTOTYPE.md) consumes these
roles only in its isolated Lab. Bold is visually approved and frozen for Hero integration; Safari real-device QA and final HOME composition remain open. REPORT → STOP before HOME/P2C.


## P2K prototype accent roles — pending visual selection

Existing Bronze #9A8164 supplies HOME's two experimental points; Electric Violet #6334E5 remains the approved
primary Bow signature. Secondary Janggu red-brown candidates are Lab-local and not new global tokens.
[Candidate palette and hierarchy](review/P2K-INTERACTION-PROTOTYPES.md) own the comparison. No candidate is
QUALITY APPROVED/FROZEN before user review; the existing approved font and color tokens remain unchanged.
