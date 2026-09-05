# CHO YOUN KYOUNG WEBSITE V2
## 02 — DESIGN SYSTEM

**Version:** 1.2  
**Status:** Approved Design Baseline  
**Parent:** `00-MASTER-PLAN.md`  
**Art Direction:** Contemporary Editorial / Ivory

---

# 1. DESIGN DIRECTION

## CONTEMPORARY EDITORIAL / IVORY

전체 사이트는 하나의 일관된 Ivory world를 유지한다.

작품마다 UI 배경색을 크게 바꾸는 방식은 사용하지 않는다.

변화는 photography, typography, composition, scale, spacing, crop, motion, 3D, editorial rhythm으로 만든다.

**Static Color, Dynamic Composition.**

---

# 2. VISUAL CHARACTER

Desired:
- quiet
- refined
- premium
- artistic
- contemporary
- restrained
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

About:
- more static editorial portrait

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

Small uppercase Sans.

Active state can use:
- thin underline
- accent
- line

Header must not dominate the Hero.

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

Desktop: drag  
Mobile: swipe

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

Approved HOME Art Direction V1 is a visual reference for:
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

Actual layout will be defined in `04-HOME.md`.

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
