# Implementation Task Protocol — mandatory bounded work

Revision 1.0 · 2026-09-05 · Approved user stop rule reflected · PLAN ONLY.
Canonical roadmap: PHASE 0–14. This catalog does not authorize execution.

## Binding workflow

**PLAN → ONE BOUNDED TASK → TEST / VALIDATE → REPORT RESULT → STOP → WAIT FOR USER APPROVAL → NEXT TASK**

Every implementation unit requires explicit user approval. Overall direction approval, a completed test, a proposed next task, or a phase title does not authorize the next unit. Never execute several phases, several pages, the whole HOME, or multiple 3D subsystems automatically in one long session. A small task can still require another split if its file/behavior scope becomes too broad.

Before starting, state: task ID, one objective, bounded file/behavior scope, input dependencies, validation, completion gate, rollback and exclusions. Use an isolated checkpoint/commit after implementation is authorized. No repository or commit is created by this document.

When tests fail, fix only the approved task's owner subsystem. If the fix expands scope, stop and report the new bounded task needed. Do not turn an unsuccessful spike into an unapproved framework migration.

## Required seven-field result report

1. **What was changed** — behavior and purpose.
2. **Files changed** — actual paths and roles, including an empty list if none.
3. **Tests performed** — passed/failed/not run with relevant environment.
4. **Result** — goal achieved or blocked; Functional Complete and Quality Approved separately for 3D.
5. **Known issues** — unresolved facts, risks and scope limits.
6. **Screenshots / preview location if applicable** — actual verified artifact/location; otherwise N/A.
7. **Recommended next task** — proposed single task, not permission.

**STOP after the report. Wait for explicit user approval.**

## PHASE 0 — individually approved units

The common setup is React/TypeScript/Vite. React Router static prerender stays a replaceable spike candidate until its matrix passes. App-path names below are proposed file scope, not files already created.

| Unit | One objective / bounded work | Expected file scope | Validation and acceptance | Rollback / STOP |
|---|---|---|---|---|
| P0A — Project skeleton / base configuration | Minimal project and centrally defined preview base / root config; placeholder shell only. No real page design, audio or 3D | package/lockfile, TS/Vite config, minimal entry and shell, small deployment config | type/lint/build, minimal local shell and correct emitted asset prefixes; no product page implementation | Revert only new skeleton/config to pre-task checkpoint. **STOP for P0B approval** |
| P0B — Routing + Pages deployment spike | Prove a replaceable candidate on actual Project Pages using small KO/EN sample routes and known/unknown path; bootstrap minimal test deployment only | isolated spike route config, minimal sample routes, small Pages bootstrap workflow and spike evidence | actual /cho-youn-kyoung-v2/ preview loads, direct sample/detail and 404 observations; initial per-route metadata/root-mode output evidence | Preserve result log; revert spike/bootstrapping without affecting legacy. **STOP for P0C approval** |
| P0C — Clean URL / refresh / 404 | Expand deployment proof to all KO route shapes, direct URL, refresh, trailing slash, query and valid/unknown behavior | spike route fixtures/manifest, fallback handling, route checks and evidence only | every KO row in routing matrix passes, correct valid-vs-404 responses, no HashRouter, no wrong asset base | Revert only route-verification unit. **STOP for P0D approval** |
| P0D — KO / EN route architecture | Prove equivalent locale paths, metadata/canonical/hreflang and root/subpath parity; report architecture decision | locale/path mapping, metadata fixture/output checks, consolidated spike ADR | every KO/EN route in both modes passes; known responses and metadata independently checked; prerender passes or remains unconfirmed with failure report | No framework freeze on partial success. **STOP for user review of architecture decision and next task** |
| P0E — Deployment workflow | Convert the proven bootstrap into reproducible preview delivery/CI; architecture decision must be accepted first | workflow, build artifact checks, environment/base settings and run guide | reproducible install from lockfile, build/type/lint, Pages artifact + route smoke; no operating-domain change | Restore previous tested deployment/workflow. **STOP for P0F approval** |
| P0F — AGENTS.md / documentation wiring | Wire approved contracts and local run/check/stop guidance for future work | AGENTS.md, README/task links and existing planning docs only | document paths/commands match actual foundation; stop rule and next-unit policy discoverable | Revert documentation only. **STOP; P1 requires a separate bounded proposal and approval** |

P0B prerequisite: a target GitHub repository/Pages destination and access are needed. If absent, its **explicit future task approval** must include creating only the named V2 target repository and minimal preview setup; otherwise P0B stops at that dependency. Do not create a repo now or silently add it to P0A. P0B bootstraps the test deploy; P0E hardens it, so there is no dependency on a nonexistent later workflow.

The stop rule is already binding in MASTER/HANDOFF before AGENTS.md is created in P0F. P0F is documentation wiring, not the first activation of the rule.

### Routing/deployment spike acceptance matrix

Each cell needs a tested result and evidence. P0B samples; P0C covers KO; P0D completes locale/root coverage. Any missing cell means **architecture not yet frozen**.

| Dimension | Required cases |
|---|---|
| Deployment base | Actual GitHub Project Pages /cho-youn-kyoung-v2/; final-domain root / output served in an isolated static root-mode test |
| KO | /, /works, /albums, /performances, /album/:id, /performance/:id, /media, /about, /contact |
| EN | /en plus /en/works, /en/albums, /en/performances, /en/album/:id, /en/performance/:id, /en/media, /en/about, /en/contact |
| Entry | Direct URL, refresh, internal navigation, browser back/forward, slash/query handling |
| HTTP / failures | Valid known route versus unknown route/slug; real response code and functional error page, not just a recovered screen |
| Static document | Per-route title/description/OG and real content/skeleton appropriate to spike, lang, canonical, reciprocal hreflang |
| Paths | Assets/fonts/dynamic route resources have one correct base; CDN URLs untouched |
| Production-root distinction | Root-base URLs and final-domain metadata verified without attaching/changing the live choyounkyoung.com domain; actual DNS/HTTPS proof reserved for P14 |
| Decision | Report pass/fail/missing for every case, then architecture decision review. Never retreat to HashRouter |

P0 tests root deployment behavior without claiming actual production-domain deployment. Any root hosting behavior not reproduced by the isolated test remains a P14 live-host gate and is explicitly recorded.

### Mobile volume spike — one separate approved task

May run as a specifically approved P0 audio unit or as AUDIO-01 in P3. It is not automatic extra work inside P0B.

Goal: verify actual media volume changes, mute/unmute, playback state and CORS constraints on available iPhone Safari and Android Chrome. Record device/OS/browser, source and actual observable behavior. Property existence alone is not evidence. Unsupported programmatic control → report a capability-based UX/fallback and wait for review. Do not force a gain-node or other workaround, and do not silently drop the requirement.

If real hardware/source is not available, mark those cases NOT TESTED; do not claim the audio gate passed. This does not prevent document-only work or P0A skeleton.

## 3D — smaller owner-subsystem tasks

Labs are required. Every row is a separate review/approval boundary. A row that exceeds one clear goal must be split further.

| ID | Single objective | Owner / expected scope | Verification / next boundary |
|---|---|---|---|
| 3D-01 | Package geometry | geometry + dimensions/pivots/UV fixtures | shape/units/object center; freeze; **STOP** |
| 3D-02 | Materials/textures | material/texture mapping and role config | color space, paper/plastic, approved artwork; fixed camera/light; **STOP** |
| 3D-03 | Camera | camera/target/FOV/framing preset | desktop/mobile framing without changing geometry/material; **STOP** |
| 3D-04 | Lighting | lighting/environment preset only | believable material under fixed scene; no material compensation; **STOP** |
| 3D-05 | Drag | input capture/intent and rotation mapping | direct response, touch vertical scroll, cancel; **STOP** |
| 3D-06 | Inertia | velocity/damping and time integration | delta-time and drag→release continuity, interrupts; **STOP** |
| 3D-07 | Opening sequence | opening state/hinge sequence using frozen subsystems | actual rotated state→settle→open and close, no reset; **STOP** |
| 3D-08A | Tray geometry | isolated tray plate/recess/hub/support/lip/seating dimensions | empty + seated CD perceptual shape with fixed neutral material; **STOP** |
| 3D-08B | Tray material | clear plastic material, same geometry/camera/light | underlying print visible, not opaque gray/glass; **STOP** |
| 3D-08C | Tray lighting | lighting preset only | controlled edges/highlights and recognizable plastic; **STOP** |
| 3D-08D | Tray quality review | validation/evidence only; no mixed subsystem corrections | plate/recess/hub/support/lip/seating/material-lighting/mobile cost pass; else identify one next correction; **STOP** |
| 3D-09 | Disc release | disc motion from verified seated state | hub release→lift→clear continuity; no floating/teleport; **STOP** |
| 3D-10 | Detail transition | snapshot transfer/handoff coordinator | pose/velocity/camera/material continuity and history/cancel; **STOP** |
| 3D-11 | Booklet extraction | booklet transform/state handoff | current state→screen-plane continuity, no reader overhaul; **STOP** |
| 3D-12 | Adaptive quality | quality policy only | measured tiers/hysteresis, fixed semantics/pose; **STOP** |
| 3D-13 | Lifecycle / cleanup | resource ownership/cache cleanup only | route exit/return, replacement/context loss, memory plateau; **STOP** |
| 3D-14 | Package quality review | validation/evidence only | prior gates including mandatory Tray Lab, mobile/fallback/continuity all pass; **STOP** |

The dependency graph overrides simple numeric ordering. Package opening can be prototyped with fixed verified parts, but no package Quality Approved before Tray Lab passes. Do not integrate a functionally complete but unapproved package into final HOME/detail. A pre-render export or page integration is another bounded task after approval, not an automatic continuation of 3D-14.

If two compensating patches suggest another owner is wrong, stop at the last verified checkpoint and propose one owner correction. Never change geometry/material/camera/light/drag together to make a screenshot match.

## Chunking the rest of PHASE 1–14

The sequence in each row is a **queue of separate tasks**, not one combined task. Before each entry, write a bounded task card with exact actual file scope, validation and rollback. Each arrow includes REPORT → STOP → APPROVAL. A whole phase request must be narrowed to its first explicit task unless the user deliberately revises this stop policy.

| Phase | Separate task queue | Typical file scope / immediate evidence |
|---|---|---|
| P1 | schema → one source/record migration → references/slugs → one asset inventory batch → translation status | data/schema/manifest only; schema/ref/source checks per batch |
| P2 | palette/contrast → typography → grid/spacing → links/focus → desktop navigation → mobile navigation | one token/component group; calculation or specimen screenshots |
| P3 | motion tokens → one gesture → one cursor → one transition → AUDIO-01 volume → truthful audio states → same-route session → one audio-line prototype → individual 3D tasks above | one feature/owner at a time; input/media/state test and preview |
| P4 | Hero static composition → Hero motion/nav → each later scene individually → each adjacent scene boundary separately | one scene or one boundary's files; desktop/mobile/reduced-motion evidence |
| P5 | dual portal → filter → editorial grid → chronology index → mobile sticky/direct entry | one archive subsystem; filter/history/keyboard behavior |
| P6 | one repeatable render preset/export task → one exhibition chapter → second chapter → handoff integration | render or chapter/transition only; frame alignment / listing screenshot |
| P7 | detail shell → approved open-stage integration → reader layout → reader zoom/controls → player controls → route-scoped mini player → one editorial section → handoff integration | one detail subsystem; focused continuity/reader/audio validation |
| P8 | timeline data/status → timeline layout → Stage Window → secondary visual → mobile inline composition | one index subsystem; chronology/active-state/touch checks |
| P9 | hero/entry → Artist Note → Program → Cast → one archive media module → Related | one page section; source/semantic/visual checks |
| P10 | ABOUT one section at a time → separate ABOUT Delight → MEDIA one feature at a time → CONTACT | no multiple pages in one task; respective copy/player/contact checks |
| P11 | one page on one defined mobile/tablet issue set → report → next page/profile | relevant page/responsive rules only; real-device evidence |
| P12 | one measured bottleneck → one owner correction → one regression confirmation | profiling or one owner change; before/after trace |
| P13 | one bounded walkthrough/page → one issue group owned by one component → retest | evidence or single component fix; keyboard/AT/contrast results |
| P14 | release route matrix → content/links → final visual/device gate → rollback rehearsal → production artifact → separately approved cutover → smoke → follow-up | validation/artifact/operation each separate; no deployment hidden in QA task |

Repeated page units must stay individually reviewable. Validation may inspect dependent behavior without authorizing changes to those dependencies. No downstream implementation begins simply because one unit passed.

## Readiness decision

**PHASE 0 implementation ready — limited to proposing/approving P0A.**
The document contracts and bounded starter task are defined; later decisions are assigned to spikes and gates.
This is not authorization to execute P0A, not proof of prerender suitability, and not approval to run P0A–F continuously.

Current action: STOP after documentation report. Wait for explicit approval of one implementation task.
