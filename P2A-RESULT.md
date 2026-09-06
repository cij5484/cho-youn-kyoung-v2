# P2A — Design System Foundation Bundle

2026-09-06 KST · **IMPLEMENTED / VERIFIED LOCALLY / REVIEW READY — visual approval pending, STOP.**

## PLAN / bounded task card

| Item | Authorized boundary |
|---|---|
| Objective | Production Design System CSS foundation and a development-only specimen under Contemporary Editorial / Ivory, Static Color, Dynamic Composition |
| Baseline prerequisite | Confirm exact approved P1C `306d757` / P1D `2b544d6`, clean tree and scope; push V2 main and require successful Fast CI before implementation |
| A | Three font families, canonical palette, fluid typography/grid/spacing and semantic/accessibility base CSS |
| B | Independent local Lab, desktop/mobile reflow, hairline/two-line and real browser inspection |
| C | Relevant regression and Full checks, current canonical implementation notes, screenshots/evidence and this 17-field report |
| Inputs | AGENTS, HANDOFF, MASTER, 02 Design, 03 Motion, HOME 2.1 and revision report, 11 Responsive, 12 Performance, 13 Accessibility, active Plan/Task Protocol; current user authorization |
| Files | Five foundation CSS files + root import/viewport; Lab HTML/CSS/config; three pinned asset packages/lock/OFL notices; relevant tests/configs/scripts/one Full CI step; current docs/result/evidence |
| Risk / asset review | Korean font repertoire/storage vs actual requests; fallback/reflow; dark-stage contrast; accidental Lab/private-record output. No portrait/audio/album/Blender input needed for this foundation |
| Validation | type/lint, existing content/schema/locale/placement, both production builds, P1D and Lab public exclusion, both route hosts, Lab desktop/mobile/keyboard/reduced-motion/font failure/text zoom, actionlint, doc/scope checks |
| Rollback | Baseline `2b544d63a5079f15d1653ddb3ea59a8b4bb06ea0`, ignored `.checkpoints/p2a-before-2b544d6/` hashes/CI receipt. Revert only the P2A diff; preserve approved/delivered P1C/P1D |
| Exclusions | HOME Hero/portrait/Haegeum/Selected Works/final templates, audio/motion choreography, content migration/other albums, Album 3D/Blender, domain/deployment, automatic P2B |
| Completion | Full validation, real screenshot inspection, report all 17 user fields, then STOP / explicit user review |

The approved 2–3 related subtask / roughly 60–90 minute sizing policy is retained; no artificial time filling or
intermediate approval is required. The original P1C/P1D reports remain historical evidence and are not relabeled.

## 1. P1C/P1D push + CI result

Clean main and exact two-commit chain confirmed; 114 recorded source/document hashes matched P1D evidence.
Remote main was the expected parent `07661e5`. Pushed the two approved commits to V2 main `2b544d6`.
[Fast CI 34002461467](https://github.com/cij5484/cho-youn-kyoung-v2/actions/runs/34002461467) succeeded for the exact
SHA before P2A code changes. Workflow syntax, pinned install and Fast passed; Full/Pages upload/deployment steps were skipped as designed.
No preview deployment or production-domain change. P2A itself remains a local review diff; it is not committed or pushed.

## 2. Design tokens implemented

Five CSS files expose color roles, font families/sizes/leading/tracking, ten spacing steps, safe gutters, grid gap,
reading widths, target size, viewport units, line pair and one restrained action response.
[Foundation guide](docs/redesign/review/DESIGN-SYSTEM-FOUNDATION.md) owns the executable API and limits.
No component framework, centered universal container or HOME composition was added.

## 3. Typography implementation

Cormorant Garamond English display, Noto Serif KR Korean display, Noto Sans KR body/UI/metadata/micro.
Normal variable WOFF2 faces, pinned at 5.3.0, self-hosted with unicode-range and swap; no runtime font CDN request.
Explicit line heights and fallback/wrapping preserve readable content; no invisible-content loading intro or unmeasured font-metric override.
The general English XL minimum was adjusted to 3.25rem so the 320px specimen reflows. This does not cap a future HOME Hero.

## 4. Color implementation

All nine requested colors retained exactly. Decorative muted/accent are separated from readable secondary text.
Rendered metadata contrast: Canvas 4.8024:1 / Surface 5.1429:1 / Dark Stage 12.0633:1, opacity 1.
Dark Stage is an explicit occasional region, with accessible light text/focus and quieter decorative lines.

## 5. Grid / spacing foundation

4-column mobile / 12-column wide editorial grid; independent item placement variables, intentional empty columns,
safe-aware 24–72px clamp gutter, reading measure, full bleed, overlap and bounded breakout primitives.
8/12/16/24/32/48/64/96/128/160px spacing equivalents use rem, alongside fluid section space and gaps.
No global max-width composition or forced scene heights.

## 6. Responsive foundation

One content-driven 60rem grid boundary; mobile specimen uses vertical flow and independent placement.
Fluid rem/viewport type, safe gutters, svh/dvh enhancements with vh fallback, native scroll, media sizing,
44px actions and emergency text wrapping. Checked 320/390/768/1440/1920px and 200% text with long KO/EN copy.

## 7. Accessibility foundation

Semantic base styles, visible 2px keyboard focus / 4px offset, underlined text links, readable disabled state,
44px standalone controls, skip link, native disclosure/reset interaction, selection and forced-color focus.
Reduced motion retains every specimen and zeros action transitions. The two-line motif is decorative/static and hidden from assistive output.
Real-device/Safari/assistive-technology review remains separate; no final site-wide accessibility approval claimed.

## 8. Design System Lab

Independent Vite development entry at `http://127.0.0.1:4175/`, started with `npm run dev:design-system`.
It shows palette, KO/EN type, body/UI/metadata, lines, spacing, asymmetric/overlap/full-bleed geometry, actions,
Ivory and Dark Stage. No production router entry, canonical/hreflang/OpenGraph or public directory; robots excluded.
Attempting to build the Lab config correctly fails with its development-only guard.

## 9. Desktop visual verification

Inspected actual Chromium first viewport and full page at 1440×1000, plus 1920px regression.
The open Cormorant forms and heavier Korean strokes stay distinct but share a baseline/spacing rhythm.
Ivory is the requested light warm canvas; body/metadata remain clear. Empty columns, full bleed and restrained rules
read as a specimen rather than a card library. Dark-stage lines were reduced to the decorative muted role after inspection.

## 10. Mobile visual verification

Inspected 390×844 first viewport/full page; 320px and tablet reflow also tested.
Type, paired lines, 4-column guide, 2-column palette and vertically reordered specimen sections remain legible;
no horizontal document overflow. These are browser viewport/touch emulation results, not real handset evidence.

## 11. Files changed

- Foundation: [tokens](src/styles/tokens.css), [entry](src/styles/foundation.css), [base](src/styles/base.css),
  [typography](src/styles/typography.css), [layout](src/styles/layout.css), [root](src/root.tsx).
- Lab: [HTML](labs/design-system/index.html), [CSS](labs/design-system/lab.css), [dev config](vite.lab.config.ts).
- Tests/delivery: [artifact assertion](tests/assert-design-artifacts.ts), [Fast artifact test](tests/design-artifacts.test.ts),
  [Lab browser tests](tests/design-system.spec.ts), [route suite](tests/routing-spike.spec.ts),
  [Lab Playwright config](playwright.design-system.config.ts), [type config](tsconfig.node.json),
  [test host MIME](scripts/static-spike-server.mjs), [Full CI step](.github/workflows/quality-gates.yml).
- Packages/notices: [package](package.json), [lockfile](package-lock.json), [font licenses](public/licenses).
- Current docs: [AGENTS](AGENTS.md), [HANDOFF](CODEX-HANDOFF.md), [README](README.md),
  [MASTER](docs/redesign/00-MASTER-PLAN.md), [Design owner](docs/redesign/02-DESIGN-SYSTEM.md),
  [Plan](docs/redesign/review/V2-IMPLEMENTATION-PLAN.md), [Protocol](docs/redesign/review/IMPLEMENTATION-TASK-PROTOCOL.md),
  [Foundation guide](docs/redesign/review/DESIGN-SYSTEM-FOUNDATION.md), this result and [evidence](evidence/p2a).

## 12. Dependencies changed

Exactly three direct font-asset packages, all 5.3.0 / OFL-1.1; no transitive packages or UI/motion/JS library.
Original licenses are included in the public artifact. Existing dependency versions remain unchanged.
Pinned actionlint 1.7.12 was downloaded to an ignored checkpoint and its release checksum verified for local workflow validation.

## 13. Tests / build result

**PASS:** full `CI=1 npm run gate:full` under Node 24.15.0 / npm 11.12.1.
type-check, zero-warning lint, content/schema 21, locale 8, placement 3, P1D artifact 1, Design artifact 1:
**34 Node tests**. Root and Project Pages builds passed; **84 route/browser cases + 11 Lab cases**, with no skip/flaky/failure.
actionlint passed. Expected Lab-build rejection was checked separately. Final document links/scope/hashes are recorded in evidence.
Documentation QA: 38 changed files, 100 tracked files preserved; 211 local links / 11 anchors checked, zero new broken links.
All 207 HANDOFF checkboxes, 27 original Design sections, 45 MASTER and 17 Plan numbered sections remain intact.
README's historical missing `P0B-CHECKPOINT.json` target existed at baseline and remains outside this task's repair scope.

## 14. P0/P1 regression result

Existing 18 neutral routes under each base remain; canonical/locale/hydration/history/direct 404 behavior passes.
The P1D private draft and its original source files remain unchanged and absent from every public output.
Raw client/static artifacts contain no Lab source or route. Self-hosted fonts resolve at the correct base and return font/woff2.
Production JS changes by 20 bytes per base (viewport metadata string); no new JS behavior is introduced by the foundation.

## 15. Screenshots / preview location

- [Desktop first viewport](evidence/p2a/desktop-first.png) / [full specimen](evidence/p2a/desktop-full.png).
- [Mobile first viewport](evidence/p2a/mobile-first.png) / [full specimen](evidence/p2a/mobile-full.png).
- Local Lab: `http://127.0.0.1:4175/`; restart with the documented dev command if its process is stopped.
- [Verification evidence](evidence/p2a/design-system-foundation.json) and [baseline CI receipt](evidence/p2a/baseline-fast-ci.json).

## 16. Visual concerns discovered

Initial Lab CSS was injected after JS and caused a large unstyled-layout shift (about .84 desktop / .78 mobile).
Changed it to an HTML stylesheet link. Subsequent regular/delayed font checks remained below .1 CLS; final 1.2s-delayed
measurements were .0011 desktop / .0028 mobile. This is a local specimen measurement, not live Core Web Vitals.

The full Korean font repertoire occupies about **9.44 MiB** of artifact storage (253 files), while the checked specimen
requests about **385 KiB** of fonts. The CSS gzip reference is about **50.5 KiB**. Actual page text, font OS fallbacks,
cache/network, final LCP element and real hardware still need later measurement. No all-font preload or specimen-only
Korean character subset was used to hide that tradeoff. Hairlines are decorative and deliberately insufficient as sole input boundaries.

No portrait/crop/HOME/font-on-final-artwork quality is approved here. Visual review of the foundation belongs to the user.

## 17. Recommended next larger bounded task / STOP

Proposal only: **P2B — Editorial Navigation Prototype Bundle**. A: semantic desktop navigation specimen;
B: independently composed mobile menu with focus/keyboard/touch behavior; C: locale/link and responsive accessibility regression.
Keep it in the development review surface and settle its bounded scope after P2A visual approval.
HOME Hero composition, transforming-Hero choreography, real content migration and 3D remain outside that proposal.

**REPORT → STOP → USER APPROVAL. No HOME Hero, P2B or next Phase has been started.**
