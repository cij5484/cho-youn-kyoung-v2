# P2B — Canonical Bold Freeze & Delivery

2026-09-06 · User visual approval: **QUALITY APPROVED FOR HERO INTEGRATION / FROZEN**.
Scope: one P2B delivery bundle. No HOME Hero or P2C implementation.

## 1. Final canonical motion

**BOLD VERSION** is the canonical production direction. Letter Slip remains X +3px / Y ±7px, 300ms,
20ms character stagger. Preserve the MENU/CLOSE mask, MENU-origin diagonal Ivory Surface reveal,
500ms opening / 400ms reverse closing, index emphasis and no selected-item underline. No hover-open.
Reduced motion uses immediate states without Letter Slip or reveal; input, focus and locale contracts remain intact.
Do not lower Bold tuning until actual Hero composition provides a reason to tune within this direction.

Removed the motion prop, preset branches, mode-specific CSS and live Lab comparison buttons/query selection.
Refined survives only as the immutable [comparison report](P2B-LETTER-SLIP-RESULT.md), PNG and normal-speed
video references in [historical evidence](evidence/p2b-letter-slip/navigation.json). No production preference UI.
The navigation is still consumed only by the development Lab; no production entry was added.

## 2. Files in the approved delivery

- Navigation: `src/navigation/EditorialNavigation.tsx`, `menu-reveal.ts`, `navigation.css`, `model.ts`.
- Lab: `labs/navigation/NavigationLab.tsx`, `main.tsx`, `index.html`, `lab.css`; `vite.navigation.config.ts`.
- Validation: `tests/navigation.spec.ts`, `navigation-model.test.ts`, `assert-design-artifacts.ts`,
  `routing-spike.spec.ts`; `playwright.navigation.config.ts`, `eslint.config.js`, `tsconfig.app.json`, `tsconfig.node.json`.
- CI commands/wiring: `package.json`, `.github/workflows/quality-gates.yml`. Dependencies and lockfile unchanged.
- Current docs: `AGENTS.md`, `CODEX-HANDOFF.md`, `README.md`; MASTER, Design, Motion, HOME, WORKS,
  PERFORMANCES and Responsive owners; navigation/foundation/content-schema guides, Task Protocol and implementation plan.
  Future page directions are previously approved documentation only, without page implementation.
- Reports/evidence: original P2B, first refinement and Letter Slip comparison remain unchanged; this freeze report
  and [freeze evidence](evidence/p2b-freeze/navigation-freeze.json) add five native screenshots and validation records.

The freeze evidence lists every delivered path and its hash, excluding the evidence file's own hash.
Art-direction documentation and CI wiring are separated into logical commits, as required by Task Protocol.

## 3. Commit and push receipt

The user explicitly authorized commit → V2 `main` push → exact-SHA Fast CI → clean working tree verification.
This file records the approved source and local validation before creating those commits. The final task delivery
message and matching [V2 Fast CI run](https://github.com/cij5484/cho-youn-kyoung-v2/actions/workflows/ci.yml)
record the resulting SHA, push and CI outcome. Git history identifies the commits containing this report.
No deployment is authorized or performed. Approved P2A baseline: `771490731afd42f1be133685dbfe3d63ebf23568`.

## 4. Tests and visual preservation

Full gate **PASS** on macOS arm64, Node 24.15.0 / npm 11.12.1, Playwright Chromium:
type-check, zero-warning lint, 38 Node contracts, both static builds, 84 route + 11 foundation + 26 navigation
browser cases; zero failed, skipped or flaky. Actionlint 1.7.12 passes. The Lab production build is rejected by its
explicit development-only guard. Both builds retain 18 routes and the same production JS/CSS sizes;
private Ji Young-hee content and Lab routes/markers remain excluded.

The 35-case comparison suite becomes 26 canonical cases by retiring only nine Refined duplicates
(six widths, reversal, glyph baseline, video). All Bold assertions remain, with a stale Refined URL regression.
Widths: 320, 390, 768, 1024, 1440, 1920px; additionally 200% text, short landscape, touch, keyboard trap,
focus visibility/restore, repeated Esc, interrupted close/reopen, live reduced motion and KO/EN counterparts.

Opening at 180ms, fully opened, WORKS Letter Slip and mobile opened PNGs are byte-identical to the approved
Bold evidence. The MENU trigger capture changes only the neutral study area after removing comparison controls;
its approved interaction values are unchanged. Native images were inspected. Historical reports/evidence remain
hash-identical. The new normal-speed recording test also passes; its timing is recorded in freeze evidence.
Preview: `npm run dev:navigation` → <http://127.0.0.1:4176/>. Intermediate screenshot is a paused timeline sample.

## 5. Remaining QA

Safari on real devices, iOS/Android hardware performance, actual screen-reader output and final HOME composition
remain open. **QUALITY APPROVED FOR HERO INTEGRATION** is explicit navigation visual approval; it does not
claim those later gates are complete. No new visual tuning concern was introduced by removing mode selection.
Navigation/Hero competition must be judged with the actual Hero before adjusting the approved Bold tuning.

## 6. Recommended P2C task — proposal only

**P2C — HOME Hero & Bold Navigation Visual Prototype Bundle**: compose the approved Moving Editorial Poster
Hero with frozen Bold navigation in a development prototype; validate desktop/mobile hierarchy, opening over the
Hero, minimal continuous header behavior if justified, keyboard/reduced motion and responsive performance.
Keep Haegeum transition/scene, Selected Works, 3D and content migration outside that one bundle.

**REPORT → STOP. P2C requires separate user authorization and has not started.**
