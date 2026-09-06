# P2B — Editorial Navigation Prototype Bundle

2026-09-06 · IMPLEMENTED / VERIFIED LOCALLY / REVIEW READY — visual approval pending.
One authorized bundle; REPORT → STOP → USER APPROVAL.

## Task card / PLAN

- Objective: validate editorial desktop navigation, its continuous compact state and an independent mobile menu alongside a future HOME V2.1 poster.
- A: shared semantic navigation model/component and native scroll transformation.
- B: independent mobile dialog, keyboard/focus/locale behavior in a neutral development-only Lab.
- C: responsive visual review, accessibility and complete Fast/Full regression, minimal owner documentation.
- Inputs: approved P2A foundation; P0D locale contract and neutral fixtures; Design §16/25, HOME §4, Motion, Responsive and Accessibility baselines.
- Files: src/navigation, labs/navigation, isolated Vite/Playwright config, tests, package gate scripts/workflow, current owner/status docs and evidence/p2b. Production route/layout/content modules and P2A tokens stay unchanged.
- Gates: types/lint, semantic navigation unit cases, content/schema/locale/placement, fresh root/project artifacts, route/metadata/404 regression, P2A Lab regression, navigation responsive/keyboard/touch/reduced-motion/history cases, actionlint and source-scope checks.
- Acceptance: one persistent desktop navigation transforms continuously; independently composed mobile menu works with keyboard/touch; semantic counterpart identity preserved; production output excludes prototype; actual screenshots reviewed. Functional completion does not imply user visual approval.
- Baseline/rollback: approved/delivered P2A `771490731afd42f1be133685dbfe3d63ebf23568`, ignored `.checkpoints/p2b-before-7714907/baseline.json`. Restore only this bundle's diff, preserving approval history and unrelated work.
- Excluded: HOME Hero/portrait/Haegeum/Selected Works, 3D/Blender, actual content migration/translation, production domain/deployment and P2C execution.

## Delivery prerequisite

P2A visual result approved by the user. The exact 38-file diff and 137 recorded hashes matched before commit/push. P2A commit `771490731afd42f1be133685dbfe3d63ebf23568` is on V2 main; [Fast CI 34004955387](https://github.com/cij5484/cho-youn-kyoung-v2/actions/runs/34004955387) succeeded. [Receipt](evidence/p2b/p2a-delivery-ci.json). No Pages deployment was dispatched.

## 1. P2A delivery / commit / push / CI result

Approved P2A was delivered unchanged as `771490731afd42f1be133685dbfe3d63ebf23568` to
`cij5484/cho-youn-kyoung-v2` main. Fast CI 34004955387 succeeded on that exact SHA. Original P2A result/evidence
retain their historical pre-approval state; current approval lives in HANDOFF and the delivery receipt above.
P2B remains an uncommitted local review diff. No P2B push, Full cloud dispatch, Pages deployment or production domain action.

## 2. Desktop initial navigation

Small uppercase HOME / WORKS / MEDIA / ABOUT / CONTACT form a left-margin vertical index. A restrained
signature and KO/EN controls sit at the upper margins. No full-width header surface, blur, pills or large wordmark
appear initially. [Desktop initial](evidence/p2b/desktop-initial.png). The blank field is a neutral Lab fixture.

## 3. Compact header transformation

The same anchor nodes spread horizontally, then gather vertically into a functional row. This order keeps click/touch
rectangles separate. Native scroll progress controls transforms; reversing returns through the same positions without
an entrance restart, DOM replacement or scroll lock. The compact boundary gains an opaque Canvas surface and thin line.
Non-HOME starts compact; `/en/` correctly preserves HOME initial behavior.
[Midpoint](evidence/p2b/desktop-midpoint.png), [compact](evidence/p2b/desktop-compact.png).

## 4. Mobile navigation

MENU ＋ opens a full-screen, scrollable native dialog: numbered vertical index, larger serif labels, hairlines,
explicit CLOSE × and bottom KO/EN. All interactive targets are at least 44×44px. Tablet uses this composition too;
enlarged text/short landscape selects it when the desktop row cannot fit. [Mobile initial](evidence/p2b/mobile-initial.png),
[390px menu](evidence/p2b/mobile-menu.png), [320px menu](evidence/p2b/small-mobile-menu.png).

## 5. KO / EN behavior

The unchanged P0D resolver controls counterpart identity and drops query/hash. React Router owns root/project
basename; album/performance IDs survive language navigation, refresh and history. WORKS is the active ancestor of
their indexes/details. Missing/authored-draft/machine-draft EN is unavailable with no href or fabricated English page.
No real translated content or metadata was created; all routes remain neutral fixtures.

## 6. Accessibility behavior

Semantic header/nav/list/link/button/dialog, skip link, visible P2A keyboard focus and aria-current underline.
Opening focuses Close; Tab/Shift+Tab wrap; native modal background is inert; Escape/Close restores MENU.
Navigation closes the dialog and focuses destination main. Breakpoint changes transfer focus to a visible equivalent.
Previous document overflow is restored on close; ordinary vertical scroll resumes at the retained position.
Reduced motion uses a static compact header immediately and responds to preference changes. Mobile open/close has
no slide, zoom or stagger. Font-blocked and 200% root-text fallbacks passed. This is not a WCAG certification or screen-reader audit.

## 7. Responsive verification

| Viewport | Composition | Verified |
|---|---|---|
| 320×800 | mobile | initial/compact/menu, bounds/targets/native scroll |
| 390×844 | mobile | initial/compact/menu, keyboard/locale/focus |
| 768×1024 | tablet vertical menu | initial/compact/menu, bounds/targets |
| 1024×768 | tablet landscape menu | initial/compact/menu, bounds/targets |
| 1440×1000 | desktop index→row | reversible geometry, stable DOM/targets/focus |
| 1920×1080 | wide index→row | initial/compact, bounds/targets |
| 320×568 + 200% text | independent menu | reflow, internal scroll, accessible last link |
| 1440×400 / enlarged desktop text | fit fallback menu | reachable controls, no overflow |

[Tablet menu](evidence/p2b/tablet-menu.png), [wide initial](evidence/p2b/wide-initial.png).
Chromium viewport/touch emulation on macOS; real iPhone/Android/Safari are NOT TESTED.

## 8. Files changed

| Files | Purpose |
|---|---|
| [EditorialNavigation.tsx](src/navigation/EditorialNavigation.tsx), [model.ts](src/navigation/model.ts), [navigation.css](src/navigation/navigation.css) | Component, P0D adapter, initial/compact/mobile styling |
| [Lab HTML](labs/navigation/index.html), [NavigationLab.tsx](labs/navigation/NavigationLab.tsx), [entry](labs/navigation/main.tsx), [Lab CSS](labs/navigation/lab.css), [Vite config](vite.navigation.config.ts) | Isolated dev consumer and neutral scroll/locale fixtures |
| [navigation-model.test.ts](tests/navigation-model.test.ts), [navigation.spec.ts](tests/navigation.spec.ts), [Playwright config](playwright.navigation.config.ts) | Semantic and actual-browser checks |
| [artifact scanner](tests/assert-design-artifacts.ts), [route regression](tests/routing-spike.spec.ts) | Both client/static marker exclusion and strict Lab URL 404 |
| [package scripts](package.json), [ESLint](eslint.config.js), [app TS config](tsconfig.app.json), [node TS config](tsconfig.node.json), [Full workflow](.github/workflows/quality-gates.yml) | Include Lab in types/lint/Fast/Full; no checks weakened |
| [AGENTS](AGENTS.md), [HANDOFF](CODEX-HANDOFF.md), [README](README.md), [MASTER](docs/redesign/00-MASTER-PLAN.md), [Design](docs/redesign/02-DESIGN-SYSTEM.md), [Plan](docs/redesign/review/V2-IMPLEMENTATION-PLAN.md), [Protocol](docs/redesign/review/IMPLEMENTATION-TASK-PROTOCOL.md) | Current approval, ownership and terminal STOP |
| [Foundation guide](docs/redesign/review/DESIGN-SYSTEM-FOUNDATION.md), [content workflow](docs/redesign/review/CONTENT-SCHEMA-CONTRACT.md), [navigation guide](docs/redesign/review/EDITORIAL-NAVIGATION-PROTOTYPE.md), this result | Minimal current validation/implementation documentation |
| [evidence JSON](evidence/p2b/navigation-prototype.json), [P2A CI receipt](evidence/p2b/p2a-delivery-ci.json), eight linked PNGs | Exact source/gate evidence and unedited browser screenshots |

Production root/routes/locale contract/content registry/record, P2A CSS/font assets and package-lock are unchanged.
All 207 HANDOFF checkboxes and original canonical numbered sections are preserved; no HOME completion boxes are claimed.

## 9. Dependencies changed

None. Existing React, React Router, Vite and Playwright are reused. No motion library, runtime asset or lockfile change.
One passive scroll listener schedules a requested frame; only cached progress and CSS variables change on scroll.
Geometry reads occur on layout/resize, not in the scroll hot path; listeners/observers/frames clean up on route/unmount.
No idle animation loop, wheel/touch interception or persistent will-change layer is added.

## 10. Tests / build result

Node **24.15.0**, npm **11.12.1**, pinned Playwright Chromium (`CI=1`) on macOS.

- Final `gate:full`: PASS — type-check, zero-warning lint, **38 Node checks** (locale 8 + navigation 4 + content 21 + placement 3 + draft artifact 1 + design/artifact 1).
- Both builds/prerender: PASS; **84** strict route/browser cases + **11** P2A Lab cases + **17** navigation cases = **112 browser cases**, zero failures/skips/retries.
- Existing actual private KO draft remains excluded from catalogs, metadata, direct/client KO/EN routes and emitted artifacts.
- P2B Lab markers/classes are absent from complete raw client/static artifacts. Both bases reject Lab URLs with HTTP 404.
- Each static output remains **18 routes / 284 files**. Root JS **324,591 B**, CSS **170,068 B**; project JS **326,277 B**, CSS **174,875 B** — all unchanged from P2A. Production navigation payload delta is **0 B**.
- actionlint **1.7.12**: PASS. Navigation Lab build is intentionally rejected with the explicit development-only guard.
- Source/document audit: approval/history/checklists/links/scope/hashes and `git diff --check` PASS; the pre-existing ignored README P0B checkpoint link remains a known baseline gap.

Corrections before final gate: native dialog Tab wrapping, font-load alignment, normalized EN HOME trailing slash,
mobile/desktop focus transfer and the test assertion for a hidden decorative index. No existing regression was removed
or relaxed. Detailed times, source hashes and unedited screenshots are in the evidence JSON; ignored Full log is
`.checkpoints/p2b-before-7714907/full-gate.log` and browser JSON reports are under `test-results/`.

## 11. Screenshots / preview location

`npm run dev:navigation` → [localhost navigation Lab](http://127.0.0.1:4176/).
The eight PNGs linked above were copied from the final browser run and visually inspected. Existing foundation Lab
remains available through `npm run dev:design-system` on 4175. Neither Lab is a production public route or deployed site.

## 12. Visual concerns

The actual Moving Editorial Poster, portrait/crop and Hero typography are intentionally absent. Their eventual
clearance, compact docking height and contrast need a separate composition review. The intermediate diagonal spread
is visible in the midpoint screenshot and requires user visual judgment. Initial and compact states are functional;
P2B is REVIEW READY, not visually approved. Hardware scroll feel, Safari/native dialog and screen-reader output
remain unverified. No Hero/portrait/3D/content migration or production-domain gate has been passed by this prototype.

## 13. Recommended next bounded task

After P2B visual approval, propose **P2C — HOME Hero Composition & Asset Readiness Review Bundle**:
confirm existing source candidates and desktop/mobile crop requirements, review first-frame composition constraints
with this navigation, then freeze one implementation input/acceptance plan. Keep it a review bundle with no Haegeum,
Selected Works, 3D or content migration. Actual Hero implementation needs its own explicitly approved scope.
This is a recommendation only; P2C/HOME has not started.

**REPORT COMPLETE → STOP → USER APPROVAL. No automatic next task or Phase.**
