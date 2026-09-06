# P2A — Design System Foundation

2026-09-06 · IMPLEMENTED / VERIFIED LOCALLY / visual review pending.
Art-direction owner: [02 Design System](../02-DESIGN-SYSTEM.md). HOME remains [V2.1](../04-HOME.md).
This is the production CSS foundation and its development specimen, not a HOME composition or final page template.

## Ownership and entry

Import [foundation.css](../../../src/styles/foundation.css) once. It imports the three fonts, then
[tokens](../../../src/styles/tokens.css), [base](../../../src/styles/base.css),
[typography](../../../src/styles/typography.css) and [layout](../../../src/styles/layout.css).
[root.tsx](../../../src/root.tsx) already imports it for both production targets; its viewport permits safe-area insets.
Neutral fixture routes and content eligibility remain unchanged. CSS classes are opt-in roles, not React components.

## Fonts and readable roles

| Role | Font / size token | Behavior |
|---|---|---|
| `.type-display` | Cormorant Garamond / `--display-xl` | 400, .95 line-height, -.02em tracking; general display, not a Hero ceiling |
| `.type-display-ko` | Noto Serif KR / `--display-ko` | 400, 1.4 line-height; keep Korean words where possible, emergency wrap |
| `.type-body`, `.type-lead` | Noto Sans KR / `--body`, `--body-large` | 1.8 line-height, legible mixed KO/EN paragraphs |
| `.type-ui` / `.text-action` | Noto Sans KR / `--ui` | Compact UI; actions retain 44px targets |
| `.type-metadata` | Noto Sans KR / `--metadata` | 13px at default root size; accessible secondary color, opacity 1 |
| `.type-micro` | Noto Sans KR / `--micro` | 12px at default root size; accessible secondary color |

`.label-caps` is for short English labels, not Korean sentences. `.numerals` requests lining/tabular numerals.
Display L/M and heading tokens are available without adding a component/type-scale framework. Fluid formulas
combine rem and viewport units; the general XL minimum was optically reduced to 3.25rem for 320px reflow.
Large text still wraps under text enlargement. No fixed height or clipping is used to mask a font mismatch.

Pinned assets: `@fontsource-variable/cormorant-garamond`, `@fontsource-variable/noto-serif-kr`,
`@fontsource-variable/noto-sans-kr`, each **5.3.0**. These packages contain CSS/WOFF2, with no JS runtime
or transitive dependencies. Fontsource identifies the three families as OFL-1.1. Original notices are distributed in
[public/licenses](../../../public/licenses). No Google font service/CDN request is made at runtime.

Only normal variable faces are imported; italic families and duplicate per-weight files are not loaded.
The package CSS uses `unicode-range` and `font-display: swap`; the browser fetches the subsets needed by actual text.
This follows [Fontsource variable imports](https://fontsource.org/docs/getting-started/variable) and
[subset delivery](https://fontsource.org/docs/getting-started/subsets).

Fallback stacks use Georgia/serif for English, Batang/serif for Korean display, and Apple SD Gothic Neo /
Malgun Gothic / sans-serif for body. Explicit line-height and wrap rules preserve readable layout while loading.
No unmeasured metric override or preload of all fonts is used. Delayed/missing-font checks are part of the Lab suite;
other OS font metrics and real-device rendering remain later QA inputs.

The complete emitted font repertoire is **253 WOFF2 files / 9,896,644 bytes per artifact**. That is storage, not
an initial request budget. The tested specimen requests 17 files / 394,560 bytes (about 385 KiB) after all text is
visited by checks. Root CSS is 170,068 bytes raw / 51,750 bytes in a local gzip reference calculation.
Re-evaluate real-page font subsets/preloads with its final copy and LCP element; do not claim Lab localhost timings
as production Core Web Vitals. Never trim Korean coverage to this specimen's characters to fake a small font budget.

## Palette and contrast

All nine canonical palette values are retained. `--color-muted` (#77736C) and accent are decorative;
small readable copy uses `--text-secondary` → `--color-muted-text` (#6D6962) at opacity 1.
Dark Stage is an explicit `.dark-stage` region, not a site-wide OS theme. It uses Canvas primary text and Hairline
secondary text, with muted decorative lines and a Canvas focus outline.

Measured browser colors: secondary on Canvas **4.8024:1**, Surface **5.1429:1**, Dark Stage **12.0633:1**.
The minimum applies to each rendered state/background, not the token name. Low-contrast hairlines are decorative;
they must not be the only essential input boundary or state indicator. See [Accessibility §15](../13-ACCESSIBILITY.md).

## Layout and responsive use

- `.page-frame`: safe-aware gutter, canonical `clamp(24px, 4vw, 72px)`; no global max-width container.
- `.editorial-grid`: 4 columns first, 12 from 60rem. The one boundary is where two specimens and empty columns
  can coexist. It is a foundation grid change, not a universal device or HOME composition breakpoint.
- `.grid-item`: `--column-mobile` and `--column-wide` set independent CSS grid placement; defaults span all columns.
  Preserve DOM/reading order. Intentional empty columns and edge-aligned text are allowed.
- `.reading-measure`: 64ch English measure / 38rem Korean maximum, always bounded by available width.
- `.full-bleed`: direct child of `.page-frame`, cancels safe-aware gutters without 100vw scrollbar overflow.
- `.overlap-plane`: isolated same-cell layering. `.breakout`: explicitly bounded negative inline margins through
  `--breakout-start` / `--breakout-end`; its owner must verify bounds at every viewport.
- `.flow`, `.section-space`: shared vertical rhythm. The ten canonical 8–160px steps use rem, plus fluid
  section spacing, grid gap and body/display sizes. They do not force empty scene heights.
- `--viewport-stable` / `--viewport-live`: vh fallback, svh/dvh enhancement. Stable body minimum, native scroll,
  safe-area-aware gutters and bottom inset support; no gesture handler or viewport JS.

Example for a later, explicitly authorized composition:

```html
<div class="page-frame">
  <div class="editorial-grid">
    <article class="grid-item reading-measure" style="--column-mobile: 1 / -1; --column-wide: 2 / 8">
      <!-- approved semantic content -->
    </article>
  </div>
</div>
```

## Base interactions, lines and accessibility

Base CSS supplies box sizing, document/text defaults, media sizing, link underlines, unfilled buttons,
native form semantics, selection and visible 2px keyboard focus with a 4px offset. No outline removal, gradients,
generic shadow/radius system, pill control, generic fade-up, cursor, navigation or animation framework is added.

Inline prose links keep normal line flow. `.text-action` is the explicit standalone 44×44px minimum action role;
native buttons, summary and inputs have a 44px minimum height. Keep practical target separation in actual layouts.
Disabled actions remain labeled/readable; active state must not depend only on color.

`.hairline` / `.two-line` are restrained 1px rules; the pair has a 6px gap and no animation/audio meaning.
Use `aria-hidden="true"` when decorative. The Lab's overlapping blank plane is a geometry specimen, not album artwork.

Reduced motion zeros action transitions, removes repeated animation and restores auto scrolling while retaining content.
Only a 180ms underline-offset response exists in this task. Later motion owners still need their own static fallback;
these base rules do not satisfy any HOME/3D motion gate. Forced-color focus uses the system Highlight color.

## Development Lab and verification

Run `npm run dev:design-system` under the pinned Node/npm versions; open `http://127.0.0.1:4175/`.
The [Lab HTML](../../../labs/design-system/index.html) uses the same production CSS through a render-blocking link.
Its [arrangement](../../../labs/design-system/lab.css) belongs only to the specimen, not to production.
[vite.lab.config.ts](../../../vite.lab.config.ts) binds localhost, disables public-directory copying, sets noindex/nofollow,
and rejects `vite build` for this config. No Lab route is added to React Router or prerender/locale/SEO catalogs.
Production artifact scanning covers raw client and static output; direct Lab URLs return strict 404 under both bases.

`gate:fast` adds a fresh-root font/license/Lab exclusion check after P1D's private draft check.
`gate:full` adds Project Pages, 84 route/browser cases and the 11-case Lab suite. The reusable CI Full workflow runs
the same Lab step after browser installation; Fast still installs no browser and performs no deployment.
`test:design-system` runs the isolated Lab checks. Stop any manually running port-4175 Lab before that suite; the
suite owns and stops its test server so a stale page cannot pass as the current source.

Checks cover five viewport widths (320/390/768/1440/1920), fonts, actual rendered contrast, overflow, keyboard,
44px controls, reduced motion, 1.2s delayed fonts, blocked fonts and 200% text with long KO/EN copy.
Desktop/mobile screenshots and exact results are in [P2A result](../../../P2A-RESULT.md).
Browser emulation is not real iPhone/Android/Safari hardware QA or final visual approval.

**STOP after P2A report. HOME Hero, P2B and later phases require explicit authorization.**
