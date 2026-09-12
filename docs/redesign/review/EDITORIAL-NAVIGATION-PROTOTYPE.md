# P2B — Editorial Navigation / Letter Slip Integration

## 2026-09-12 local revision — adaptive header / compact piano menu

Explicit user revision supersedes the historical full-screen plane, INDEX heading/rule, footer signature
and 500ms entry below. The shared header is transparent with difference compositing; its text responds to
the scene beneath without the old HOME/Haegeum paper strip. The menu keeps a native modal dialog,
but its visible box is at most400px wide and only as tall as its contents (viewport-height overflow remains scrollable).
The existing artist name stays in the page header; the modal contains only the right-hand close control.

Header control paper, top edition/language preferences and five page rows each enter from the right on
independent offsets/durations. A680ms common reversible clock uses a fast-start/soft-finish cubic easing;
close reverses the current poses at1.3× speed. There is no separately switched header fill or html background.
INDEX, its rule, footer artist name and the redundant untranslated-English paragraph are removed; disabled
language controls retain their accessible reason. Routes, native modal semantics, focus trap/return, Escape,
route cleanup, background-motion pause signal and reduced-motion fallback remain.

Local only; no delivery. Existing source snapshots are kept in ignored `.checkpoints/compact-menu-before`.
Type-check, changed-scope lint, eight route/model checks and actual development-preview build passed.
Navigation/Home browser specifications now express the new visual contract; that full browser suite was
not run. Focused desktop/mobile CUA verification owns this local pass. Historical approval below does not
automatically grant visual approval to the new composition.
The built390×844 viewport showed a351×430px menu, with all five destinations and top preferences visible.
Shift+Tab wrapped from Close to CONTACT; repeated Escape completed dismissal and restored document overflow.
CONTACT navigation closed the modal and released scroll lock; no runtime errors were recorded.

Follow-up: translated keys no longer create horizontal scrollbars; horizontal overflow is clipped and
scrollbar chrome is hidden, while short-view/zoom vertical scrolling remains native. Each key uses an82%
ivory material with12px backdrop blur and65% saturation, with protected dark ink and an opaque fallback
for unsupported filters/reduced transparency. The underlying-color principle references
[Apple Materials](https://developer.apple.com/design/human-interface-guidelines/materials); no external code is copied.
Page-key starts now follow a deterministic irregular order, each with a different travel duration on the same
reversible680ms clock. Type/lint, six timing/model checks and the actual preview build passed. At320×568,
the built menu measured281×474px, all destinations fit, computed horizontal overflow was hidden and
scrollbar-width was none. Full browser-suite and physical-phone checks were not run for this follow-up.

2026-09-06 · User visually APPROVED **BOLD VERSION** · **QUALITY APPROVED FOR HERO INTEGRATION / FROZEN**.
Current result: [P2B freeze and delivery](../../../P2B-FREEZE-RESULT.md).
[Letter Slip comparison](../../../P2B-LETTER-SLIP-RESULT.md) preserves the pre-approval review.
[Original P2B](../../../P2B-RESULT.md) and [first refinement](../../../P2B-REFINEMENT-RESULT.md) reports/evidence
remain historical snapshots. Their vertical morph, item underline and whole-label slide are superseded here.

## Initial state and ownership

**CHO YOUN KYOUNG at top left + MENU at top right, at every width.** Open by click/keyboard or mobile tap;
hover and focus alone never open. There is no initial vertical-link list or scroll morph. Header geometry remains
stable while scrolling. Final spacing/scale/surface with the real Hero is a separately authorized P2C judgment.

Owners: [Design §16](../02-DESIGN-SYSTEM.md), [HOME V2.1](../04-HOME.md), [Motion](../03-MOTION-SYSTEM.md),
[Responsive](../11-RESPONSIVE.md), [Accessibility](../13-ACCESSIBILITY.md). P2A owns shared fonts, palette, grid,
spacing and focus styles through the [foundation guide](DESIGN-SYSTEM-FOUNDATION.md). No foundation tokens change.

[EditorialNavigation](../../../src/navigation/EditorialNavigation.tsx) consumes a React Router context, public semantic
`catalog` and `mainId`; there is no motion-mode prop or preset selection. Load [navigation.css](../../../src/navigation/navigation.css) after the foundation. The caller
owns destination focus/scroll. [model.ts](../../../src/navigation/model.ts) and P0D routing remain unchanged.
[NavigationLab](../../../labs/navigation/NavigationLab.tsx) is the only consumer. No production entry, content or route is added.

## Canonical Bold freeze and Refined's role

The user selected **BOLD VERSION** as P2B Navigation's canonical production direction, with status
**QUALITY APPROVED FOR HERO INTEGRATION**. This is explicit visual approval of the navigation prototype;
it does not mean Safari real-device QA or final HOME composition is complete. The production entry remains absent.

| Canonical layer | Approved direction |
|---|---|
| Surface | P2A Ivory Surface opens diagonally from MENU; hairlines enter from the right |
| Type entry | 16px diagonal within the mask, without skew/rotation |
| Letter Slip | X +3px / Y ±7px; 300ms; 20ms character stagger |
| Timing | 500ms opening / 400ms full closing; native reversible continuity |
| Selection | Ink and type/index emphasis; no selected-item underline |
| Trigger / input | MENU / CLOSE mask; click/keyboard/tap; no hover-open; reduced motion preserved |

Do not lower the approved Bold values preemptively. If navigation competes with the real Hero in a separately
authorized P2C visual prototype, tune within this canonical Bold direction from composition evidence.

**Refined is an archived Lab/evidence reference only.** The [comparison report](../../../P2B-LETTER-SLIP-RESULT.md)
and its [screenshots, recordings and measurements](../../../evidence/p2b-letter-slip/navigation.json) remain immutable.
The shared component, controller, CSS and Lab now have one Bold path. The live comparison buttons, mode prop,
preset branching and query selection were removed. Old `?motion=refined` URLs cannot select Refined; semantic
counterpart links still discard query/hash. There is no production user preference system.

## Selected state and Letter Slip

Selected HOME/section uses Ink, display weight 500 and index weight 600. `aria-current=page` marks an exact page;
`location` marks WORKS as an album/performance ancestor. One structural hairline remains under each row.
Selected and hovered links have no additional underline. Locale-current underline remains a separate utility state.

**Letter Slip** is the primary fine-pointer hover response on HOME / WORKS / MEDIA / ABOUT / CONTACT.
Characters alternate +7px / −7px on Y, with +3px X. They do not rotate. Every character has a stable position in the word;
there is no random source. CSS transform transitions use 300ms and a 20ms character stagger. CONTACT's final
character starts at 120ms and finishes at 420ms. Leave returns all characters to the exact baseline in 300ms,
without a departure stagger. Repeated enter/leave transitions start from the current browser-computed pose.
Link hit area, row height and separator geometry stay fixed. The mask includes breathing room for the glyph slip.

Split visual characters are aria-hidden; the actual link retains one unsplit accessible name and `lang=en`.
Keyboard focus uses its visible outline, Ink and index response, without requiring Letter Slip to communicate focus.
Font fallback and 200% text wrapping are checked. No per-character JS loop runs during hover.

Secondary choice: a 2px index shift plus Ink. Removed the old full-label 5px shift, extra hover rule and .94
other-item de-emphasis. A two-string marker was considered but omitted: Letter Slip already supplies the primary
rhythm and row separators supply structure. No new marker candidate or Haegeum scene is implemented.

## MENU / CLOSE trigger

The control retains one footprint. Hover/focus shifts text 3px, opens its tracking from .01em to .035em and changes
tone toward Ink. The two plus/cross strokes contract to .72 scale; one rises 1px, hinting a change of state without
hover rotation. Actual opening moves MENU to CLOSE through a fixed text mask while the plus rotates 45° to ×.
P2A's 180ms response is used for hover/focus. The previous generic short underline is removed. There is no pill,
glow, bounce or layout shift. The same geometry response applies to CLOSE; touch uses tap tone and actual opening.

## Opening and closing choreography

[menu-reveal.ts](../../../src/navigation/menu-reveal.ts) owns one native Web Animations timeline with 16 tracks, lasting 500ms.
These approved menu values do not replace the shared motion tokens.

| Layer | Start → end on opening timeline | Role |
|---|---|---|
| Trigger text / plus→cross | 0 → 210ms | Immediate response and destination state |
| Ivory Surface clip | 25 → 400ms | MENU-origin diagonal reveal |
| INDEX mask | 80 → 260ms | Establish index identity |
| Intro hairline | 80 → 330ms | Establish spatial structure from the right |
| Five item masks | first 110 → 380ms; 30ms per row; last 230 → 500ms | Sequential typography, 120ms total stagger |
| Five row rules | first 100 → 350ms; 30ms per row | Structure accompanying the index |
| Artist / locale utilities | 320 → 500ms | Finish hierarchy without delaying navigation |

Closing reverses these same tracks at −1.25 speed, taking 400ms from fully open. That shorter dismissal preserves the
same spatial order and sampled poses; separate closing easing was considered unnecessary for this prototype.
Open→close→reopen reverses every track from the same actual currentTime, without rebuilding at an endpoint.
No timeout queue, persistent will-change, motion dependency or requestAnimationFrame loop. Finished effects cancel
when CSS takes ownership. Static intermediate captures are explicitly paused samples; real-time video is separate.

## Accessibility, mobile and lifecycle

The native dialog establishes modal semantics immediately and focuses Close. Masked content stays inert until
fully revealed; Tab wraps among currently interactive controls. Close remains reachable during opening, and its
accessible action becomes Reopen during closing. Escape always requests close; repeated Escape is intercepted at
keydown to prevent a browser CloseWatcher force-close jump. Native cancel remains handled as fallback.

On completed dismissal, dialog.close restores MENU focus and the previous document overflow value. Document
scroll resumes at its retained position; fresh opening resets dialog scroll to the top. Route/locale activation
and history changes close immediately, cancel all tracks and let the Lab focus destination main. Navigation is
never delayed behind exit choreography.

Mobile uses tap tone, selected/index emphasis, visible focus and the opening sequence. Letter Slip and index
translation only apply to `(hover: hover) and (pointer: fine)`; touch does not get sticky hover movement. Controls
remain at least 44×44px, the panel scrolls vertically, and sticky top controls remain reachable. 320px, short
landscape and 200% text keep every destination reachable. Resizing preserves the same modal and focused element.

Reduced motion settles immediately to open/closed with no per-character movement, stagger, tracking expansion
or large reveal. Ink, weights, hierarchy and focus remain. A live preference change settles the requested endpoint.
Missing Web Animations also uses immediate functional states. Blocked fonts retain usable fallback text.

## KO / EN and production exclusion

P0D stays authoritative: KO unprefixed, EN `/en`, Router basename under `/` and `/cho-youn-kyoung-v2/`. Album and
performance semantic identities survive switching, history, refresh and trailing slash. Counterpart switching drops
query/hash. Missing/authored-draft/machine-draft EN stays visibly/accessibly unavailable, without fabricated hrefs
or HOME redirect. No actual translation, content edition, public metadata or publication state changes.

The Lab is localhost-only, noindex/nofollow, publicDir=false, with no canonical/OG/hreflang. Its build is rejected.
The Vite fallback is only a dev harness. Strict both-base Lab URL 404 checks and raw production/client scanning
remain mandatory. The private Ji Young-hee record stays excluded; both static builds retain 18 neutral routes.

## References and adopted principles

Read on 2026-09-06; no reference asset, layout or source code was imported.

- [Codrops: Line & Letter Hover Animations, 2023](https://tympanus.net/codrops/2023/06/16/4-exclusive-demos-slideshows-typographic-animations/):
  studied characters as a controllable typographic unit. Our alternating slopes and tuning follow the user's
  Letter Slip brief. The reference's animated lines, playful variants and GSAP dependency are not adopted.
- [Codrops: clip menu / easeReverse, 2026](https://tympanus.net/codrops/2026/04/22/a-playful-clip-menu-with-gsaps-easereverse/):
  adopted evaluating dismissal pace separately from entry and testing interruption. We use native shared-time
  reversal at 1.25×, not its random scattering, elastic motion, game styling, layout or library.
- [Codrops: grid preview / clip-path, 2025](https://tympanus.net/codrops/2025/05/27/animated-product-grid-preview-with-gsap-clip-path/):
  studied mask geometry aligned to the underlying composition. Adopted the structural surface/mask principle;
  future archive notes preserve spatial continuity, without implementing a product grid or adopting its hover-open model.

## Future directions — document only

[Motion §§1/11/15/16](../03-MOTION-SYSTEM.md) owns meaningful ambitious motion, Letter Slip, the small image-reveal
vocabulary and same-object detail continuity. [WORKS §4](../05-WORKS.md) preserves compact/scattered cluster →
scroll expansion/reorganization into archive. [PERFORMANCES §§13/14](../08-PERFORMANCES.md) preserves persistent
Stage Visual + left/index list with scroll-active and hover/focus preview, crop/mask/depth/shared movement.
These notes do not implement pages, HOME Hero, visual assets or shared-transition infrastructure. GSAP Flip may
be evaluated separately for future complex layout work; it is not a navigation dependency or adoption decision.

## Validation and STOP

Use Node 24.15.0 / npm 11.12.1: `npm run dev:navigation` at http://127.0.0.1:4176/; `npm run test:navigation`;
`npm run gate:full`. Stop manual servers before tests: foundation/navigation own 4175/4176 and refuse stale reuse.
Full includes 38 Node, 84 static route, 11 P2A foundation and 26 navigation cases. The former 35-case comparison
suite retired nine Refined-only duplicates (six widths, reversal, glyph baseline and recording) following the user's
single-direction freeze. All canonical Bold behavior, six widths, keyboard/locale/reduced motion, interruption,
selected states, exact baseline return, no hover-open and normal-speed recording remain covered. A stale Refined
URL regression proves the comparison cannot be reactivated.

[Current evidence](../../../evidence/p2b-freeze/navigation-freeze.json) records the freeze checks and preserved historical evidence.
Real-device Safari, iOS/Android, screen-reader and hardware performance remain follow-up QA. Final HOME composition
and navigation/Hero balance remain unverified. User visual approval is explicit and scoped to Hero integration;
Chromium tests alone cannot expand it. The current task authorizes commit → main push → exact-SHA Fast CI check,
not deployment. The final delivery report and GitHub run identify the delivered commit and CI outcome.

**REPORT → STOP. No HOME/P2C, WORKS/PERFORMANCE implementation or automatic next Phase.**

2026-09-12 delivery refinement: user requested rounded left ends; each existing menu key now has28px left corner radii, preserving square right attachment and the same material/timing.
