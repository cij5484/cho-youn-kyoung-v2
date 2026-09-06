# P2B Refinement — Editorial Menu Reveal

2026-09-06 · IMPLEMENTED / VERIFIED LOCALLY / REVIEW READY — visual approval pending.
REPORT → STOP → USER APPROVAL.

## PLAN / authorized correction

The user corrected the initial navigation to artist name at top left + MENU at top right. The former initial-link
scroll morph requirement is canceled. No initial vertical navigation or replacement morph system is authorized.
The original P2B result and evidence are historical; this refinement supersedes that behavior, not its locale/data contracts.

- A: retain the two-element header across widths; refine trigger hover/focus and remove canceled morph behavior.
- B: prototype a 420ms native editorial panel/hairline/item-mask reveal with restrained stagger and reversible interruption.
- C: preserve keyboard/Esc/focus/locale/reduced-motion/responsive behavior; collect five requested visual states and run Full regression.
- Scope: navigation component/styles/reveal controller, neutral Lab copy, navigation browser tests, current canonical pointers and this result/evidence. No dependency, production route/content/HOME/3D change.
- Inputs: approved P2A foundation, existing P0D model, current menu and user's corrected initial structure. No additional assets needed.
- Gate: type/lint/locale/content/placement, both static builds/exclusion/route tests, P2A Lab, focused navigation motion/interrupt/focus/touch tests and actual visual inspection.
- Rollback: exact 161-file pre-refinement working snapshot in ignored `.checkpoints/p2b-refinement-before/`; HEAD remains P2A `771490731afd42f1be133685dbfe3d63ebf23568`. Restore only refinement edits, preserving the previous uncommitted P2B bundle and its historical evidence.
- STOP: report evidence, tests and remaining visual concerns; no P2C/HOME execution, commit/push/deployment.

## Result / corrected structure

Initial navigation is artist name + MENU at every width. There is no initial left-side navigation list. The former
desktop link morph, scroll progress state, geometry observer and breakpoint-dependent header swapping were removed.
Header spacing and position remain stable during native scrolling. No new scroll morph or HOME composition was added.
Design §16, HOME's navigation paragraph and Responsive §16 now reflect the explicit correction; unrelated Hero requirements remain.

## MENU / CLOSE trigger

The trigger text shifts **3px** on fine-pointer hover or keyboard focus, transitions from the readable secondary tone
to Ink, and grows a short **24px** hairline. The symbol moves **1px** vertically; no hover rotation, background pill,
glow or bounce. P2A's **180ms** action timing is reused.

MENU and CLOSE occupy the same footprint. On actual opening the text changes through a small mask/window and
the plus turns **45°** into a cross. The dialog control stays at the upper-right location, providing a visible close
action throughout entry and a reopen action during exit.

## Panel opening / closing

The native **420ms** reveal opens the Canvas surface with a top-down clip, draws entry/row hairlines and reveals
menu items inside individual masks. Item start offsets are **12.6ms apart / 50.4ms total**, with the final item ready
at 420ms. Footer controls reveal later. This is a surface-and-mask transition, not a single opacity fade.

All 15 native animation tracks share one sampled time. Close reverses the same track; reopen during close reverses
again from its current geometry. Tests recorded identical time/clip immediately before and after reversal, with
playback rates switching between −1 and +1. No timeout queue or per-frame JS loop is used. Finished tracks are canceled;
CSS owns the settled open state. Route/history activation cancels motion and closes immediately to focus destination content.

Repeated Escape during entry initially exposed the browser's forced second-close path. The final implementation
handles Escape at keydown, retains native cancel fallback and restores scroll/focus after the reverse completes.
That failure was corrected without weakening the regression assertion.

## Menu items / mobile

Desktop fine-pointer hover uses a **5px** label shift, muted→Ink tone and a growing thin lower rule (**240ms**).
Other large labels receive only .94 opacity; small index labels retain full opacity. Browser contrast checks include
that hover state: large text remains above 3:1 and small labels/controls above 4.5:1. Current route uses a separate
underline and aria-current.

Mobile excludes the desktop hover/de-emphasis rules. Tap tone/hairline, opening motion and keyboard focus convey
the same language, with all controls at least 44×44px. Focus uses only a 2px item shift on non-hover devices.
320px, 390px, tablet, desktop/wide, 200% text and short landscape remain usable; long labels wrap and dialog content
scrolls vertically with the top controls reachable. Fresh opening resets dialog scroll; resizing preserves the same modal/focus.

## Preserved behavior

- Semantic header/nav/list/link/button/dialog, skip link, keyboard focus outlines and Tab/Shift+Tab wrapping.
- Native modal background isolation. During mask entry/exit, item content is inert and the visible close/reopen control remains usable.
- Escape and explicit Close restore MENU focus. Previous document overflow and document scroll position are restored.
- Root/project basename, KO/EN detail counterpart IDs, clean switch path, refresh/history, active ancestor and missing/draft EN policy.
- Reduced motion uses immediate open/closed states, suppresses spatial hover offsets and preserves information/focus/tone/line.
- Live preference changes settle to the requested endpoint. Missing Web Animations and blocked fonts retain functional fallback.
- No real translated edition, private content publication, production route, dependency or motion library was added.

## Visual evidence

All captures are unedited browser screenshots from the final Full run. Intermediate frames pause the actual native
timeline at the stated time for inspection; they are not real-time video.

| Requested state | Evidence |
|---|---|
| MENU trigger hover | [Trigger hover](evidence/p2b-refinement/trigger-hover.png) |
| Opening intermediate | [180ms opening](evidence/p2b-refinement/opening-180ms.png) |
| Fully opened | [Desktop open](evidence/p2b-refinement/fully-opened.png) |
| Menu-item hover | [WORKS hover](evidence/p2b-refinement/menu-item-hover.png) |
| Mobile opened | [390px open](evidence/p2b-refinement/mobile-opened.png) |

Additional: [CLOSE hover](evidence/p2b-refinement/close-trigger-hover.png),
[reverse close at 150ms](evidence/p2b-refinement/closing-150ms.png), [320px open](evidence/p2b-refinement/small-mobile-opened.png).
Preview: `npm run dev:navigation` → [localhost Lab](http://127.0.0.1:4176/).

## Tests / regression

Final `CI=1 npm exec --yes --package=node@24.15.0 --package=npm@11.12.1 -- npm run gate:full`: **PASS**.

- Node **38**: locale 8, navigation model 4, content/schema 21, placement 3, private artifact 1, design/artifact 1.
- Browser **115**: unchanged strict static route suite 84 + P2A foundation 11 + revised navigation 20. No failed/skipped/flaky cases or retries.
- Type-check and zero-warning lint; root/project build/prerender; workflow actionlint 1.7.12: PASS.
- Both artifacts retain **18 routes / 284 files**. Root JS/CSS **324,591 / 170,068 bytes**; project **326,277 / 174,875 bytes**. Production payload delta **0 bytes**.
- Development Lab remains excluded from complete client/static output and returns strict production 404 under both bases. Separate Lab build guard rejects production build as intended.
- Actual private KO draft, schema/locale eligibility, historical P1/P2A/P2B evidence and lockfile remain unchanged.
- Original navigation tests' locale/focus/fallback assertions were adapted to opening the same menu on desktop/mobile. Canceled morph assertions were replaced with the corrected artist + MENU / stable-scroll contract; resize now preserves one modal instead of swapping navigation modes.
- Scope/document audit preserves 207 HANDOFF checkboxes, existing numbered sections and unrelated files; the old ignored README P0B checkpoint link remains the sole pre-existing missing local link.

Exact hashes, test report times, contrast/continuity samples and file scope: [refinement evidence](evidence/p2b-refinement/menu-reveal.json).
Local full log: `.checkpoints/p2b-refinement-before/full-gate.log`. Browser JSON: `test-results/`.

## Files and delivery

Runtime prototype: [component](src/navigation/EditorialNavigation.tsx), [styles](src/navigation/navigation.css),
[new native reveal controller](src/navigation/menu-reveal.ts). Only the [Lab copy](labs/navigation/NavigationLab.tsx)
and [navigation browser suite](tests/navigation.spec.ts) change outside that component owner.

Current docs: HANDOFF, README, MASTER, Design, HOME navigation, Responsive, implementation Plan/Protocol,
foundation/content validation counts and [navigation guide](docs/redesign/review/EDITORIAL-NAVIGATION-PROTOTYPE.md).
This report and `evidence/p2b-refinement/` record the refinement. Original P2B result/evidence remain historical and intact.
Existing P2B workflow/package/TS config changes are preserved without further changes; dependencies and lockfile are unchanged.

HEAD stays P2A `771490731afd42f1be133685dbfe3d63ebf23568`. P2B/refinement remain **local and uncommitted**;
no push, cloud CI dispatch, preview deployment or domain action was performed.

## Remaining visual concerns / next boundary

The 420ms pace, mask height and restrained stagger are ready for user visual review. A paused intermediate frame
cannot convey the pace as well as interacting with the Lab. The actual Hero/portrait is absent, so final header surface,
spacing and reveal contrast with that composition are deferred to the separately authorized P2C review.
Chromium/touch emulation was tested; real iPhone/Android/Safari, screen-reader output and hardware frame pacing
remain NOT TESTED. Green checks do not constitute user visual approval.

Next step is user review of this refinement, not another implementation task.
**REPORT → STOP → USER APPROVAL. P2C / HOME Hero has not started.**
