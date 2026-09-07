# Implementation Task Protocol — mandatory bounded work

Revision 1.26 · 2026-09-07 · P2I SOUND QUALITY APPROVED / FROZEN; classified QA gaps remain / STOP; enlarged coherent bundle and terminal STOP retained.
Canonical roadmap: PHASE 0–14. This catalog does not authorize execution.

## Binding workflow

**PLAN → 4–6 TIGHTLY RELATED SUBTASKS → FULL VALIDATION → REPORT → STOP → USER APPROVAL**

The latest user revision on 2026-09-06 enlarges the previous bundle about 2×. A coherent bundle contains 4–6
strongly related subtasks, aiming for a fully verifiable result in roughly 120–180 minutes.
Do not fill time artificially or drop checks to fit a deadline. Approval of the concrete bundle authorizes its stated subtasks;
do not introduce intermediate approval pauses. Plan their sequence, file/behavior scope, inputs, acceptance checks,
full validation and rollback before edits. FULL VALIDATION covers all applicable checks, including Fast/Full below.
Do not mix unrelated subsystems, or combine visual design, 3D and content migration to increase volume.
Existing small queue entries can be bundled only under these constraints. Cross-Phase automation, whole HOME,
multiple unrelated pages, cross-owner 3D edits and skipping quality/freeze gates remain prohibited. Architecture
changes need separate approval; major 3D remains in smaller units. Unexpected complexity or a direction choice
requires STOP. User visual approval is required before proceeding to the next major scene.

Every implementation bundle requires explicit user approval. Overall direction approval, a completed test, a proposed next task, or a phase title does not authorize the next bundle. Never execute several phases, several pages, the whole HOME, or multiple 3D subsystems automatically in one long session. A bundle can still require a split if its file/behavior scope becomes too broad.

Before starting, state: task ID, one objective, bounded file/behavior scope, input dependencies, validation, completion gate, rollback and exclusions. Use an isolated checkpoint/commit after implementation is authorized. No repository or commit is created by this document.

When tests fail, fix only the approved task's owner subsystem. If the fix expands scope, stop and report the new bounded task needed. Do not turn an unsuccessful spike into an unapproved framework migration.

## Result report — user fields first, seven by default

Use explicit user-requested report fields when supplied (P1D has 12; P2A has 17; original P2B has 13; final P2B refinement has 16; P2B freeze/delivery has 6). Otherwise use:

1. **What was changed** — behavior and purpose.
2. **Files changed** — actual paths and roles, including an empty list if none.
3. **Tests performed** — passed/failed/not run with relevant environment.
4. **Result** — goal achieved or blocked; Functional Complete and Quality Approved separately for 3D.
5. **Known issues** — unresolved facts, risks and scope limits.
6. **Screenshots / preview location if applicable** — actual verified artifact/location; otherwise N/A.
7. **Recommended next task** — proposed single task, not permission.

**STOP after the report. Wait for explicit user approval.**

## CI quality gates and delivery contract — P0E canonical guide

This section owns current local/CI/delivery policy. P0A–D reports and P0C-DEPLOYMENT.md remain historical
evidence; their former automatic-main-push deployment behavior is superseded here. The routing, locale,
canonical/hreflang/lang and deterministic file-placement contracts themselves are unchanged.

### Local commands and gate ownership

Use Node 24.15.0 / npm 11.12.1 and the committed lockfile. Fresh install: `npm.cmd ci --include=dev`.
Do not install dependencies again for every small task if the tested lockfile/environment is unchanged.

| Gate | Command / owner | Required work |
|---|---|---|
| Fast | `npm.cmd run gate:fast` | type-check → lint → locale/metadata, navigation and content unit contracts → placement contracts → root production build/prerender/placement → `test:content:visibility` and `test:design-system:artifacts` on that fresh artifact |
| Full | `npm.cmd run gate:full` | Fast → project subpath build/prerender/placement → 84 route/browser cases over both strict static hosts → 11 development-only Design System Lab cases → 26 canonical Bold Editorial Navigation Lab cases → 44 single-B Hero cases (22 Chromium / 22 WebKit) → 32 Haegeum cases (16 each engine) → 74 Sound cases (37 each engine), preceded by 6 SOUND motion contracts |
| Live deployment | `npm.cmd run test:pages` with actual `EXPECTED_DEPLOY_SHA` | 18-route JS on/off metadata, refresh/history, variants, actual HTTP 404, artifact identity/hash/MIME/cache |
| Workflow configuration | actionlint 1.7.12 | YAML, expressions, reusable workflow input/job wiring; Linux also checks embedded shell |

Individual commands remain available: type-check, lint, test:locale, test:content, test:placement, build,
build:pages-preview, test:spike. `check` remains the historical type/lint/root-build convenience command;
it is not the complete Fast gate. Root and project builds must run sequentially because they share typegen/cache.
Local Full defaults to installed Edge; Linux CI installs the pinned Playwright package's Chromium. The current Mac
uses the same installed Chromium with `CI=1` and the pinned Node/npm environment, without changing assertions.
`test:content` includes the real draft regression; `test:content:visibility` checks root client/static output after build.
Full checks both artifacts and real draft KO/EN 404/metadata exclusion, font base/MIME and Lab exclusion.
The separate Lab suite uses pinned Playwright Chromium on all platforms; prepare it once if missing.
`test:design-system` owns port 4175 and rejects an already running manual Lab server. Test assertions
are the same. No reduced route sample or retry was introduced to hide failures.

Fast runs on every branch push and PR, including documents, through ci.yml → reusable quality-gates.yml.
It never installs a browser, uploads a Pages artifact or deploys. This small unconditional gate avoids
missing/pending checks on documentation-only PRs. A branch push plus an open PR can create two Fast runs;
concurrency cancels superseded runs on the same event ref. No repository ruleset is silently changed.

Full runs through an explicit pages.yml workflow_dispatch. It repeats Fast on that exact revision,
then checks both static bases, all 84 route/browser cases and five Lab suites (11 foundation + 26 navigation + 44 Hero + 32 Haegeum + 74 Sound). A failed type/lint/unit/build/placement/browser
step fails the job; upload/deploy depend on that success. Full without deployment retains test evidence
but never uploads the special Pages artifact. Only successful Full with deploy=true uploads static/.

The previous P0D local browser run was about 56 seconds before browser installation/CI provisioning.
Keeping it out of every push provides a small Fast gate while every requested deployment still runs it.
Actual P0E timings/results are recorded in [P0E result](../../../P0E-RESULT.md), not treated as fixed budgets.

### Explicit delivery states

| State | Meaning / allowed next step |
|---|---|
| WORKING | One approved bounded task in progress; record scope and rollback point |
| VALIDATED LOCALLY | Task-appropriate checks passed on identified source/commit; record environment and limits |
| REVIEW READY | Diff, files, tests, result, known issues, preview/evidence and next recommendation reported; STOP |
| APPROVED | User accepted the reviewed result; identify whether authorization covers commit, push, merge and/or deploy |
| COMMITTED | Logical checkpoint created locally; does not mean pushed, merged, deployed or next-task approval |
| PUSHED | Authorized remote ref updated; Fast CI may still be pending/failed; no implicit deployment |
| DEPLOYED | Pages deploy job succeeded for the approved SHA; independently label live verification pending/passed/failed |

Typical sequence: WORKING → VALIDATED LOCALLY → REVIEW READY → APPROVED → COMMITTED → PUSHED →
optional DEPLOYED. An already explicit instruction authorizing commit/push/deploy in the current task,
such as P0E, can authorize those steps after the concrete result is validated; do not ask again.
Local checkpoint commits may also be used during an authorized task. Neither a green test nor a saved
approval state authorizes the next bounded task. Do not collapse deployed and verified into one claim.

If the user explicitly skips local validation for delivery, record VALIDATION SKIPPED, not VALIDATED.
Do not disable CI or claim old results were rerun. A request to merge is not a request to dispatch preview
deployment under the new workflow. Final task reports must still end with STOP.

### Commit, push and review policy

- Read current path, branch, remote, HEAD, working changes and upstream state before publishing.
- Preserve user work, planning/review history and checkpoints. Group related work; HOME art direction
  and CI wiring are separate logical commits. Generated outputs, caches, secrets and temporary reports stay ignored.
- Code delivery normally requires Fast; routing/metadata/prerender/CI changes require Full before review-ready
  delivery, and deployment always requires Full. Use focused tests for the task before these delivery gates.
- Approval of an implementation unit is not blanket future publication/deployment permission. Follow the
  current user's explicit scope; ask only for an actually missing consequential approval after preparing the result.
- Push only the named V2 repository/ref. PR/merge or direct push must be covered by that scope. This repository
  had no branch protection when P0E was prepared, so failing CI is visible but does not technically prevent direct
  pushes/merges. Do not claim enforced branch protection or change rulesets without the requested scope.

### Preview deployment policy and commands

V2 Pages is a preview/development environment only. Production domain and legacy repository are excluded.
Automatic deployment on main push is removed. The default manual dispatch runs Full with deploy=false.
For example, after confirming the selected ref's full SHA:

```powershell
# Full verification only; this is not a deployment.
gh workflow run pages.yml --repo cij5484/cho-youn-kyoung-v2 --ref main -f deploy=false -f expected_sha=<40-character-reviewed-SHA>

# Only when the user has authorized this preview deployment:
gh workflow run pages.yml --repo cij5484/cho-youn-kyoung-v2 --ref main -f deploy=true -f expected_sha=<40-character-approved-SHA>
```

Replace the placeholders with real values; do not run them literally. Dispatch rejects a mismatched SHA.
Only refs/heads/main can deploy to the shared preview; Full-only may inspect another ref. The revision check
protects against a ref moving between review and dispatch. It does not freeze main or replace human approval.
Runs are serialized with no in-progress deployment cancellation. Only the deploy job has Pages/OIDC write
permissions. No gh-pages branch, CNAME, runtime server, SPA rewrite or manual file movement is introduced.

A checkbox is a technical guard, not proof of user approval. Never turn deploy=true on automatically just
because code was pushed or CI is green. Documentation-only work usually needs no preview delivery.
If multiple approved deployments are queued, review whether earlier ones are still desired; do not silently
replace approval with an instruction to deploy an unrelated newer revision.

### Failure handling, evidence and rollback

Never delete/relax tests or change the approved architecture to obtain a green gate. Fix only the approved
owner subsystem. If a contract itself must change, STOP and report before changing it. Do not use
continue-on-error, skip a failing requirement or silently deploy a previous artifact.

A failed predeployment gate must leave the live preview untouched. If live tests fail after a successful
deployment, report DEPLOYED / VERIFICATION FAILED, preserve evidence and investigate only within scope;
do not call it successful delivery or automatically retry through contract failures. Rollback is an explicitly
authorized V2 action, using a reviewed known-good revision with the applicable Full/identity checks. Keep
the prior live artifact until approval; never touch legacy or the operating custom domain.

Local evidence: test-results/results.json, playwright-report/index.html; live evidence:
test-results-pages/results.json and playwright-pages-report/. Logs and BUILD_SHA are in GitHub Actions.
Full and live reports are retained as separate SHA-named artifacts for 14 days. Curated results belong
under evidence/p0e/ and P0E-RESULT.md. Build-info.json records public file hashes/commit; local dirty-build
HEAD alone is not source identity. Never commit generated browser reports/build directories or secrets.

Actionlint is a validation tool only, not a runtime/visual dependency. CI downloads exact v1.7.12 from
the upstream release and checks a pinned SHA-256 before extraction. Local Windows validation used the
same version's official Windows binary in ignored .checkpoints/p0e-tools. Do not execute an unchecked
replacement when a checksum/download/config check fails.

Official workflow syntax/reuse references: [GitHub workflow syntax](https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax),
[reusable workflows](https://docs.github.com/en/actions/how-tos/reuse-automations/reuse-workflows).

## PHASE 0 — individually approved units

The common setup is React/TypeScript/Vite. React Router + Static Prerender passed the latest user-authorized P0C architecture gate and is APPROVED. P0D verified the neutral locale/metadata contract locally; P0E passed its CI/live integration. Actual content/launch SEO remain future work. App-path names below are proposed file scope, not files already created.

| Unit | One objective / bounded work | Expected file scope | Validation and acceptance | Rollback / STOP |
|---|---|---|---|---|
| P0A — Project skeleton / base configuration | Minimal project and centrally defined preview base / root config; placeholder shell only. No real page design, audio or 3D | package/lockfile, TS/Vite config, minimal entry and shell, small deployment config | type/lint/build, minimal local shell and correct emitted asset prefixes; no product page implementation | Revert only new skeleton/config to pre-task checkpoint. **STOP for P0B approval** |
| P0B — Local Routing / Static Prerender Spike — COMPLETE | Latest P0B approval limited execution to local neutral route proof; no deployment | official route/prerender config, static placement, fixture tests and P0B evidence | root/project artifacts and 34 local tests passed; architecture was conditionally recommended | P0B checkpoint retained. **STOP was followed; P0C was separately approved** |
| P0C — Real GitHub Pages Deployment / Routing Verification — COMPLETE | Latest explicit approval included V2 repo creation, CI, real Pages routing and the architecture decision | V2 Git/workflow, deterministic placement, live tests, curated evidence and planning state | CI build/deploy/verify success; 42 live cases per browser environment; architecture APPROVE | Revert only V2 changes and preserve evidence. **STOP for P0D approval** |
| P0D — KO / EN routing + metadata contract — COMPLETE | Complete the locale path/metadata/canonical/hreflang contract on the approved routing foundation | locale/path mapping and metadata fixtures/checks; no actual page design or full translation migration | 18 fixtures per base; 80 browser, 8 locale and 3 placement tests passed; actual translations remain separate; P0E subsequently passed 52 live cases | One separately approved task, split further if needed. **STOP for user review and next-task approval** |
| P0E — CI Quality Gates + Delivery Contract — COMPLETE | Preserve approved P0C/P0D contracts; Fast push/PR checks and explicit Full/preview delivery | workflows, gate commands, browser config and current delivery guide; no product/architecture implementation | type/lint/locale/placement, both builds, existing routing/metadata browser tests, workflow validation and actual CI evidence in P0E result | Preserve checkpoints; reverting old workflow can re-enable auto-deploy, so review the intended trigger policy. **STOP for P0F approval** |
| P0F — AGENTS.md / Project Knowledge Wiring — APPROVED canonical | Root operating map, canonical document ownership/status, required future Blender gate and Haegeum experiment | AGENTS.md, README/HANDOFF, relevant existing planning/ADR docs and P0F result only | local links/anchors, references/commands, preserved checklist and documentation-only scope; evidence in P0F result | Baseline 93bc878 and ignored .checkpoints/p0f-before-93bc878; restore only task docs, preserve unrelated work. **P0F result approved; delivery explicitly authorized separately; STOP before P1, which needs separate approval** |

Sequence revision: the latest P0B instruction prohibited deployment; the latest P0C instruction explicitly authorized cij5484/cho-youn-kyoung-v2 creation/connection and its preview deployment. P0C completed that minimal reproducible pipeline. This authorization applies only to P0C and V2; no production/legacy changes or next-unit authorization is implied.

The stop rule was binding in MASTER/HANDOFF before P0F. [AGENTS.md](../../../AGENTS.md) now maps it to current owners; P0F is documentation wiring, not the first activation of the rule.

### Routing/deployment spike acceptance matrix

Each cell needs evidence at its owning gate. The latest P0C user instruction authorized the architecture decision from the specified 13-route real-host matrix; that gate passed and architecture is APPROVED. P0D completed the neutral locale/hreflang contract locally; P0E subsequently verified all 18 neutral routes in CI/live Pages. Real translated content is not complete. Missing release-matrix cells remain NOT TESTED and must not be relabeled complete.

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

## Required Blender Capability Spike — future separately approved units

**REQUIRED BEFORE RELEVANT 3D PRODUCTION / NOT EXECUTED.** The semantic acceptance and decision owner is
[Motion §47](../03-MOTION-SYSTEM.md#blender-capability-spike). This catalog owns task boundaries only.
These are a queue, not a single long implementation run; every row needs separate approval/report/STOP.
The spike may use a minimal neutral fixture to test the pipeline; it must not create production objects/pages.

| Unit | One objective / limited scope | Validation / checkpoint / STOP |
|---|---|---|
| BLENDER-01A — Local capability | Identify local executable/version and test minimal bpy execution; no model production or automatic installation | Record commands/version/availability. Unavailable → report missing setup; no claim of support. **STOP** |
| BLENDER-01B — Scripted master | One neutral geometry script with explicit units/parameters; deterministic rebuild and .blend save/reload | Compare dimensions/topology/pivots on repeat runs; retain input/script/master checkpoint. **STOP** |
| BLENDER-01C — Export contract | GLB/render export of the frozen fixture with fixed neutral material/camera/light | Check material subset, axes/scale/normals/pivots and output size; no compensating changes in other owners. Preserve 01B. **STOP** |
| BLENDER-01D — Browser import | Minimal isolated R3F consumer of the frozen export, no page integration | Compare browser appearance/dimensions with fixture reference; load/size evidence. Do not retune source/material/camera together. **STOP** |
| BLENDER-01E — Capability decision | Validation only: real-mobile GPU/thermal/scroll cost, repeat one declared parameter edit and evaluate evidence | Record device conditions, repeatable regeneration and rollback; APPROVE / REVISE / REJECT with limits. Missing proof → REVISE, owner correction is a new task. **STOP** |

Each unit keeps a local checkpoint of its own files and restores only those files if needed; do not erase
user work or previous evidence. 01E's prescribed parameter change is a repeatability probe, not a production
model edit or permission to correct several subsystems. No integration/adoption follows automatically.
If rejected, relevant production needs a separately reviewed alternative. Haegeum 3D remains a distinct
[high-priority future experiment](../03-MOTION-SYSTEM.md#haegeum-3d-experiment), not a first-release gate.

## 3D — smaller owner-subsystem tasks

Before relevant production rows, complete the required Blender capability decision above; Blender itself is not mandatory. Labs are required. Every row is a separate review/approval boundary. A row that exceeds one clear goal must be split further.

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

## P1A — Content / Data Schema Contract — result APPROVED

One objective: typed neutral content grows into validated indexes/relations and P0D route identities.
Scope: src/content contracts/fixtures/semantic validator/adapter, compile/data tests, package test commands and canonical docs.
Baseline b3c12d8; restore only task files, preserving unrelated work. No real content/page/template/routing architecture,
Blender/assets/audio/dependency/deployment change. Type/lint/content13/locale8/placement3/both builds/browser80 passed.
User-approved naming follows Index visualMode and separates musical category; [contract](CONTENT-SCHEMA-CONTRACT.md).
[Result](../../../P1A-RESULT.md) distinguishes adapter proof from actual data-to-page integration and records the separately authorized lifecycle/delivery follow-up. The counts above are the initial P1A gate; follow-up evidence is in the result. **Historical P1A stop: before P1B.** P1B was subsequently authorized and delivered; current state is in [HANDOFF](../../../CODEX-HANDOFF.md).

## P1C — Ji Young-hee Ryu Album KO Record Mapping Review — result APPROVED

The user explicitly named and authorized this one review unit after P1B, requiring STOP before P1D or actual
production record registration. [Review/task card](album-audits/JI-YOUNG-HEE-SANJO-KO-RECORD-MAPPING-REVIEW.md)
owns its field mapping; [result](../../../P1C-RESULT.md) and [evidence](../../../evidence/p1c/ji-young-hee-sanjo-ko-mapping-review.json)
record validation. One objective: map the existing audit to P1A KO draft fields without migration or schema changes.
Scope is six documentation/evidence files, including only status pointers in HANDOFF/Plan/this Protocol.
Baseline `07661e5`; isolated originals in ignored `.checkpoints/p1c-before-07661e5/`. Restore only this task's diff.

Validate source/field correspondence, the document-only candidate against existing types/semantic checks,
draft exclusion and invalid-publication rejection, links/anchors and unchanged runtime/P1B evidence/checklists.
No production module, new record in src, asset runtime URL, page/route/template, translation edition, audio/3D or
delivery action. Documentation-only validation does not require another Full/browser run of unchanged code.
The original seven-field report and STOP were completed; the user subsequently approved the result and separately
authorized the P1D bundle below. Historical P1C evidence remains unchanged.

## P1D — Ji Young-hee Ryu KO Draft Integration Bundle

Explicitly authorized A/B/C: (A) register the P1C-approved single KO record as a private draft in the actual content
layer; (B) prove public catalog/locale route/metadata/prerender/client-artifact exclusion with regression tests;
(C) verify the real addition workflow and minimally update its documents plus the user's task-size revision.
One content owner, no other album/EN publication/Design System/HOME/3D/Blender/next Phase. Full validation is
type-check, lint, content/schema, locale state, public exclusion, both builds, route regression and Fast-relevant checks.
Logical local commits of validated P1C/P1D work are allowed; no push/deploy is implied. Baseline `306d757`,
checkpoint in ignored `.checkpoints/p1d-before-306d757/`; restore only P1D changes and preserve approved P1C.
Task scope, files, results and the user's 12 fields are recorded in [P1D-RESULT](../../../P1D-RESULT.md).
**REPORT → STOP → USER APPROVAL** ends the whole bundle. No next bundle or Phase automatically follows.

## P2A — Design System Foundation Bundle — APPROVED / DELIVERED

The user approved P1C/P1D and explicitly authorized their baseline delivery before this one bundle.
Clean exact commits 306d757/2b544d6 and recorded hashes matched; V2 main push and Fast CI 34002461467
succeeded before P2A implementation. P2A authorizes (A) production font/palette/type/grid/base CSS,
(B) an isolated development Lab, and (C) desktop/mobile/accessibility/font/public-exclusion Full regression,
minimal current documentation and the user's 17-field report. [Result/task card](../../../P2A-RESULT.md)
and [Foundation guide](DESIGN-SYSTEM-FOUNDATION.md) own files, evidence and API.

Baseline/rollback: 2b544d63a5079f15d1653ddb3ea59a8b4bb06ea0; ignored `.checkpoints/p2a-before-2b544d6/`.
The Lab is not registered in production routes/prerender/SEO. Font assets and licenses are public foundation
assets; the P1D album remains private. After the reported STOP, the user approved P2A visually and authorized
delivery. Exact 38-file source and recorded hashes matched; commit 7714907/main push and Fast CI 34004955387
succeeded. No deployment. Original P2A result/evidence retain their recorded pre-approval state.
No HOME Hero/portrait/Haegeum/Selected Works/final templates, motion choreography, content migration,
other albums, 3D/Blender, domain work or automatic P2B. Visual review remains distinct from green tests.
**REPORT → STOP → USER APPROVAL.**

## P2B — Editorial Navigation Prototype Bundle — historical first review

User-approved P2A delivery is the prerequisite above. P2B alone authorizes (A) a desktop editorial index and
continuous compact transformation, (B) independent mobile dialog and P0D semantic language navigation in a
neutral development Lab, and (C) responsive/accessibility/Full regression and minimal current docs.
[Result/task card](../../../P2B-RESULT.md) owns the bounded file plan and 13-field report;
[Navigation guide](EDITORIAL-NAVIGATION-PROTOTYPE.md) owns component/fit/locale behavior and limitations.

Baseline/rollback: `771490731afd42f1be133685dbfe3d63ebf23568`, ignored `.checkpoints/p2b-before-7714907/`.
Restore only this bundle's diff. Production root/route/prerender/content/token modules and dependencies remain
unchanged. Fast adds four navigation unit cases and P2B artifact exclusion. Full retains 84 route and 11 P2A
Lab cases, then runs 17 navigation cases. `test:navigation` owns localhost port 4176 and refuses stale-server
reuse, like the foundation suite on 4175. No Lab production build or public metadata entry is permitted.

P2B changes remain a local review diff. No HOME Hero/portrait/Haegeum/Selected Works, 3D/Blender, real content
migration/EN edition, domain/deployment or P2C execution. Functional validation is distinct from visual approval.
**REPORT → STOP → USER APPROVAL.** A proposed next bundle is not authorization.

## P2C — HOME Hero & Bold Navigation Visual Prototype Bundle — user approved B

One user-authorized objective: three Moving Editorial Poster visual candidates ready for user selection.
A: authentic portrait audit/fit, then canonical/bold-cropped/experimental compositions with P2A typography.
B: compare the ten user criteria, recommend without selecting for the user; dedicated mobile 390/320px,
native depth and first-scroll response with frozen P2B. C: same-viewport A/B/C evidence, recommended candidate
initial/pointer/scroll/menu/mobile and normal-speed video where practical; focused checks plus Full; the user's
20 report fields; **REPORT → STOP → USER VISUAL SELECTION**. No following HOME task is automatic.

Scope: isolated `labs/hero/` with local Vite/Playwright harness if source readiness passes, its source audit,
minimal current docs and evidence. No production HOME route, Haegeum transition/scene, Sound, Works, 3D,
Blender, content migration or deployment. Inputs: exact authentic portrait, HOME V2.1/P2A and frozen P2B.
Rollback: clean `d81bdbe0e18310abdd6c89f90682afde9716217d`, 211 files saved with hashes to ignored
`.checkpoints/p2c-before-d81bdbe/`; preserve earlier reports, evidence and all frozen runtime files.

The first [asset checkpoint](../../../P2C-ASSET-READINESS-RESULT.md) is preserved as history. The user supplied
seven authentic portraits and confirmed **3→7**. [Current source audit](HOME-HERO-ASSET-READINESS.md),
[Hero guide](HOME-HERO-VISUAL-PROTOTYPE.md), [20-field result](../../../P2C-RESULT.md) and
[evidence](../../../evidence/p2c/hero-prototype.json) own the resolved input, candidates and validation.
At that report: **VISUAL DIRECTION CANDIDATES READY FOR USER SELECTION**. The user subsequently approved
P2C and selected **B — Bold Cropped**. A/C remain comparison evidence only. No P2C commit/push/deploy or next HOME task. Sources and frozen P2B files remain unchanged.
`test:hero` owns port 4177. Full includes the new Hero cases; Fast remains browser-free and never deploys.

## P2H — SOUND Refinement, Native Safari / Device QA & Freeze — REVIEW READY / STOP

The user approved P2G’s result while explicitly retaining SOUND at REVIEW READY. Only P2H was authorized.
A: verify/preserve the approved P2G bundle as `dab4617` → B: retain 02:46–03:04 and audit the original audio →
C: refine local-friction lines, damping/resume/replay and existing composition → D: actual Safari/available device QA →
E: Full, responsive/accessibility/resource/performance/evidence → F: current docs, logical commit/main push/Fast CI,
clean tree, the user’s 15-field report → STOP. No fresh approval is needed between these authorized subtasks.

Scope: `src/sound`, its Lab and related tests, current Sound/HOME/Motion/Responsive/Accessibility/Performance owners,
operating/status docs and new P2H report/evidence. Rollback: `dab4617` plus the 457-file P2H snapshot. Preserve frozen
Hero/navigation/Haegeum, original audio/images and historical P2G evidence. No new dependency/architecture.
No audio replacement without user approval, no WORKS/next scene/other page/3D/Blender/public HOME/deployment.

Validation: 38 Node +255 browser (58 Sound, split 29/29); actual Safari is partial, with explicit evidence of
play/pause/end/replay/focus and a Mac-lock limitation before native resume/menu/reverse/reduced completion.
Phone, AT, thermal and musical listening judgment remain separately recorded future checks. A technically
reviewable bundle may be delivered, but green tests do not grant the final SOUND QUALITY APPROVED / FROZEN label.
Current status: **REVIEW READY / FREEZE CANDIDATE / STOP**. Recommend only auditory/native-device closeout and a
user freeze decision. No following scene is authorized. [Result](../../../P2H-RESULT.md),
[guide](HOME-SOUND-EXPERIENCE.md), [evidence](../../../evidence/p2h/README.md).

## P2G — P2F Closeout + HOME Sound Experience — REVIEW READY / STOP

One coherent enlarged bundle: approximately 120–180 minute sizing target, six tightly related subtasks.
A: approved P2F review/delivery/Fast/clean gate → B: real audio source audit and user-delegated highlight →
C: Full→Sound spatial release/desktop composition → D: explicit media state and live bowed-string response →
E: mobile/reduced/keyboard/lifecycle → F: Full validation, evidence, 19-field report and STOP.

Delivered P2F: `b5c6aa053a38bdb1dafbcbeb724890f26ae334cf`, Fast CI 34032488461 SUCCESS.
The P2G rollback baseline is that clean commit plus the 392-file `.checkpoints/p2g-before/` snapshot.
Revert only P2G-owned changes; preserve historical evidence, masters, private records and other user work.
Scope: `src/sound`, development `labs/sound` on 4179, backward-compatible Haegeum continuation props,
Sound tests/config/Full CI wiring/artifact exclusion, relevant canonical owners, source audit and result/evidence.
No dependency, public HOME mount, album record migration, production domain or deployment. Frozen Hero/navigation
source, original Haegeum choreography/CSS/images and all prior result/evidence remain unchanged.

The user chose Han Beom-su Ryu Jungjungmori and delegated the dramatic highlight. The real 18-second
02:46–03:04 candidate is authorized for this requested HOME preview; final auditory selection remains review.
Only LISTEN / PAUSE / RESUME / REPLAY and truthful loading/error state are required in HOME; full Album controls
remain separately specified. Media and analysis start only on explicit activation, stop offscreen/on departure,
and retain actual listening with static visuals under reduced motion.

Validation: Fast + both production bases + existing 197 browser checks + 50 Sound checks in Chromium/WebKit;
workflow syntax, Lab build rejection/noindex, private/locale/route/prerender exclusion, responsive and real-time
visual evidence, lifecycle/performance measurement. Native Safari and physical phone coverage are recorded honestly.
Report the user's 19 requested fields. **P2F QUALITY APPROVED / FROZEN; SOUND REVIEW READY → STOP.**
At the original P2G report it was local/uncommitted. The user subsequently approved the result; P2H preserves it
as `dab4617` and follows the current boundary above. The original recommendation was SOUND auditory selection,
refinement and device QA/freeze. No WORKS, next scene, unrelated page or 3D follows automatically.
[Guide](HOME-SOUND-EXPERIENCE.md), [result](../../../P2G-RESULT.md), [evidence](../../../evidence/p2g/README.md).

## P2F — Hero → Haegeum Refinement, Quality Gate & Device QA — QUALITY APPROVED / FROZEN

Subsequent user approval (P2G): no special visual problems; composition/motion frozen. Portrait/Retina, authentic
macro/full replacement, phones, VoiceOver and thermal QA remain non-blocking. Native Safari settlement is still
unverified future QA, never implied passed. Historical result/evidence below are immutable. This delivery gate was completed before SOUND:
`b5c6aa0` main push, exact-SHA Fast CI 34032488461 SUCCESS and clean main/origin. [Receipt](../../../evidence/p2g/delivery-p2f.json).

Precondition fulfilled: reviewed P2E feature `0873b75` and CI `c73a3be` pushed to main; exact-SHA Fast CI 34029859649
SUCCESS; clean main/origin. No delivery problem remains. P2E direction is user-approved and canonical.
A: existing timeline/crop/mask/depth and body-to-full climax → B: independent mobile/line/type and provisional asset
configuration → C: desktop/laptop/mobile, Safari, reverse/fast/menu-interruption, reduced/failure, Full/evidence/report.
Scope: `src/haegeum`, its development Lab/related tests, current HOME/Motion/Responsive/Accessibility owners and P2F
result/evidence. Preserve initial B, frozen P2B, all historical evidence and masters. Rollback: `c73a3be` plus ignored
`.checkpoints/p2f-before/` (340-file clean snapshot). No new dependency, public HOME or following scene.

Quality criteria: continuous transformation, intentional independent mobile framing, memorable purposeful motion,
complete-object resolution, reverse/fast stability and preserved accessibility. Functional validation alone does not
grant user quality approval. Report REVIEW READY / freeze candidate with exact QA scope. Provisional images and
unavailable physical phones may remain explicitly non-blocking; never claim actual device coverage from emulation.
User requests 15 report fields. **REPORT → STOP → USER APPROVAL**; no SOUND/WORKS/3D/next scene.

## P2E — Hero → Haegeum Transition Prototype Bundle — visual approved / delivery authorized

P2D delivered as `d758ee10aceaa5fc037c82e4d3fdb108068aecea`; [Fast CI 34026552008](https://github.com/cij5484/cho-youn-kyoung-v2/actions/runs/34026552008) SUCCESS, main/origin equal and tree clean before this task.
A: authentic photo audit and reference principles. B: one native scroll composition, approved B → HEAD/PEG → STRINGS/BOW → RESONANCE → FULL HAEGEUM, shared two-line guides, separate mobile and semantic static reduced-motion. C: Full regression, Chromium/WebKit/device evidence, video and requested 16-field report → STOP.
Scope: small reusable Hero/controller extension; new Haegeum source/Lab 4178, tests/config/CI/artifact exclusion and owning docs. No public HOME or content migration, dependency, SOUND, WORKS, other pages, 3D/Blender or deployment. 1.2–1.6 viewport travel overlaps the existing Hero exit, without an additional pin sequence.
Inputs: approved P2D/Bold navigation/P2A tokens, supplied real photographs and HOME/Motion/Responsive/Accessibility contracts. Missing isolated beige full-instrument baseline and macro resolution remain explicit asset requests; no generated documentary substitute. Rollback: ignored `.checkpoints/p2e-before/`, 285-file clean delivered snapshot; preserve all prior evidence. User visual selection remains the terminal gate. Full passed 38 Node +191 browser; [result](../../../P2E-RESULT.md), [guide](HOME-HAEGEUM-TRANSITION-PROTOTYPE.md) and [evidence](../../../evidence/p2e/README.md) own findings. Supplied beige image was identified as AI generated; its provisional editorial role is visibly disclosed, without treating it as documentary. **REPORT → STOP.**

## P2D — Bold Cropped Hero Refinement & Device QA Bundle — result approved

Current approval: Composition **APPROVED**; Bold Cropped visual direction **APPROVED**; motion / interaction **LOCALLY VERIFIED**; portrait assets **PROVISIONAL**; final Retina quality **PENDING HIGH-RES SOURCE**. The current approximately 1024×1536 pair does not block subsequent authorized HOME work. When larger originals of attachments 3 and 7 arrive, replace their asset references and repeat Hero Retina QA. Physical-mobile and final HOME QA remain separate. User authorizes review, logical commits, main push and exact-SHA Fast CI before P2E. Historical scope/checks below remain evidence for the reviewed implementation. The delivery checkpoint preserves 285 files under `.checkpoints/p2d-delivery-before/`; approval edits affect current owners only, with P2C/P2D reports/evidence preserved.

User-authorized objective: refine selected B into a reusable single-direction Hero and verify its actual visual,
input and device behavior. Do not reopen A/B/C selection. A: source audit and precise type/photo/motif/mobile
refinement. B: native first-scroll/depth/reverse continuity, frozen navigation integration and failure/reduced-motion
behavior. C: six widths, desktop/mobile/DPR evidence, actual Safari where possible, Chromium/WebKit Full regression,
minimal canonical updates, the user's 12-field report, then **STOP → USER APPROVAL**.

Scope: `src/hero` (module, CSS, native controller, math, four unchanged WebPs moved from Lab), `labs/hero`, Hero
harness/tests, Hero artifact exclusion, CI's additional WebKit installation, current owning docs and `evidence/p2d`.
Inputs: user-selected B, confirmed attachment 3→7, P2A and frozen P2B. The additional 42 PNGs in the user-supplied
folder were audited as working copies; all approximately 1.57MP, no larger selected source. No substitute adopted.
Rollback: all 250 pre-P2D working files saved with hashes under ignored `.checkpoints/p2d-before/`, based on
`d81bdbe0e18310abdd6c89f90682afde9716217d`. Restore only this bundle's changes; preserve approved P2C and earlier evidence.

Validation: type/lint, all 38 Node contracts, both production builds and 84 routes, 11 foundation, 26 frozen
navigation and 44 Hero engine cases. P2C's duplicate A/C runtime cases retire with explicit B selection; B retains
all six widths, depth/aperture/reverse, failure, keyboard/locale and glyph checks. New cases cover no selector,
large-jump closed-frame continuity/idle RAF, late download, primary failure and viewport changes. WebKit on macOS
uses native Option+Tab link traversal; assertions are not relaxed. Production artifact exclusion remains required.
No new dependency, public HOME route, full Hero→Haegeum, following scene, content migration, 3D, Blender, domain,
commit/push/deploy or automatic next phase. [P2D result](../../../P2D-RESULT.md) and [evidence](../../../evidence/p2d/README.md)
separate tested environments from open high-resolution, physical-phone, accessibility and final visual QA.
**REVIEW READY is not final Quality Approved. REPORT → STOP.**

## P2B Canonical Bold Freeze & Delivery — completed delivery

User visually approved P2B and selected **BOLD VERSION** as the canonical production direction:
**QUALITY APPROVED FOR HERO INTEGRATION / FROZEN**. This approval explicitly authorizes commit, main push,
Fast CI confirmation and a clean working tree; it does not authorize deployment or P2C.

A: remove motion prop/presets/CSS branching and Lab selection, keeping the exact approved Bold visuals and input
contract. Refined stays as archived Lab PNG/video/report evidence only. B: update current canonical owners,
record the freeze and its remaining QA. C: Full validation, logical commits, main push, exact-SHA Fast CI check,
clean-tree verification, the user's six report fields, then STOP. Preserve 500ms entry / 400ms exit, Letter Slip
X +3px / Y ±7px / 300ms / 20ms stagger, diagonal Ivory reveal and MENU/CLOSE mask, index emphasis without selected
underline, no hover-open and reduced motion. Do not lower these before actual Hero review warrants tuning within Bold.

Inputs: user-approved P2B visual evidence, P2A foundation, P0D locale and current navigation guide. Scope:
`src/navigation`, navigation Lab/tests, current owning docs, preserved approved P2B code/CI/evidence delivery.
Rollback: all 203 prior evidence hashes verified, all 204 working files saved before edits in ignored
`.checkpoints/p2b-freeze-before-7714907/`, based on P2A `771490731afd42f1be133685dbfe3d63ebf23568`.
Restore only this freeze diff if needed; preserve prior approved P2B work and immutable result/evidence files.

Full passes 38 Node + 84 route + 11 foundation + 26 navigation cases, plus actionlint. Nine Refined-only duplicates
were retired with the explicit single-direction selection, not to hide failures. Canonical Bold retains all six
widths, keyboard/locale/reduced motion, lifecycle reversal, baseline return and normal-speed recording; stale
Refined query selection is also rejected. [Freeze result](../../../P2B-FREEZE-RESULT.md) and
[evidence](../../../evidence/p2b-freeze/navigation-freeze.json) identify checks and scope. Final delivery report and
matching GitHub Fast run own the post-push receipt. Safari real-device QA, hardware/screen-reader checks and final
HOME composition remain open. No HOME/P2C, content migration, 3D, domain or deploy. **REPORT → STOP.**

## P2B Navigation Refinement — Letter Slip Integration — historical comparison review

Final user consolidation, 2026-09-06: A selected type/index without underline, deterministic Letter Slip and
MENU/CLOSE response → B surface/INDEX/typography/footer choreography, interruption, mobile and reduced motion
→ C documentation-only future motion directions and BOLD/CURATED/PURPOSEFUL policy, Full validation and the 16 requested report fields → STOP.
[Historical task/result](../../../P2B-LETTER-SLIP-RESULT.md) and [guide](EDITORIAL-NAVIGATION-PROTOTYPE.md) own scope.
Before edits, 171 previous evidence hashes were verified and all 172 working files copied into the ignored
`.checkpoints/p2b-letter-slip-before/` snapshot. Roll back only this iteration's diff, preserving previous P2B work.
Full retains 38 Node, 84 static routes, 11 foundation and 35 navigation cases; real browser screenshots and a
normal-speed recordings cover both Refined and Bold variants and the requested states. The user additionally authorized this comparison within P2B; no other-page scope was opened. No hover-open, new dependency, production page/content,
HOME/P2C, WORKS/PERFORMANCE implementation, 3D/Blender, commit/push/deploy or automatic next Phase.
At that comparison checkpoint visual approval was pending. The subsequent user approval/freeze above supersedes its current status while preserving its evidence.

## P2B Refinement — Editorial Menu Reveal — historical first refinement

The user corrected the initial header to artist name + MENU and canceled vertical initial links / their scroll morph.
A: trigger hover/focus refinement; B: 350–450ms editorial surface/hairline/masked-item reveal, interruptible reverse
close and restrained item hover; C: mobile translation and existing locale/accessibility/responsive Full regression.
Do not invent a new morph system. Final header spacing/scale/surface with the real Hero belongs to P2C judgment.

[Refinement task/result](../../../P2B-REFINEMENT-RESULT.md) owns scope and evidence. Exact pre-refinement 161-file
working snapshot is in ignored `.checkpoints/p2b-refinement-before/`; HEAD remains approved P2A 7714907. Restore
only refinement edits, preserving original P2B result/evidence and unrelated working files. Full retains 38 Node,
84 static route and 11 foundation cases; 20 revised navigation cases cover the corrected contract. Retired morph
assertions are explicitly superseded by the user's correction, not removed to conceal failures.

Requested visual evidence: MENU trigger hover, opening intermediate, fully opened, menu-item hover and mobile
opened. Report tests and remaining visual concerns, then **STOP → USER APPROVAL**. No P2C/HOME, content/3D,
new dependency, commit/push or deployment. This refinement is one bounded task, not the start of a next Phase.

## Chunking the rest of PHASE 1–14

The sequence in each row is a planning queue. Under the latest 2026-09-06 revision, 4–6 strongly related entries within
one coherent objective may form an explicitly approved 120–180 minute bundle; unrelated entries remain separate. Write the task
card with actual scope, validation and rollback. REPORT → STOP → APPROVAL applies at the bundle boundary,
not between its already-authorized subtasks. A Phase title never authorizes an automatic queue run.

| Phase | Separate task queue | Typical file scope / immediate evidence |
|---|---|---|
| P1 | schema → one source/record migration → references/slugs → one asset inventory batch → translation status | data/schema/manifest only; schema/ref/source checks per batch |
| P2 | palette/contrast → typography → grid/spacing → links/focus → desktop navigation → mobile navigation | one token/component group; calculation or specimen screenshots |
| P3 | motion tokens → one gesture → one cursor → one transition → AUDIO-01 volume → truthful audio states → same-route session → one audio-line prototype → BLENDER-01A–E separately → individual production 3D tasks above | one feature/owner at a time; input/media/state test and preview |
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

## Historical planning readiness decision

**PHASE 0 implementation ready — limited to proposing/approving P0A.**
The document contracts and bounded starter task are defined; later decisions are assigned to spikes and gates.
This is not authorization to execute P0A, not proof of prerender suitability, and not approval to run P0A–F continuously.

The above readiness was the initial planning snapshot. P0F and P1A lifecycle/delivery completed; P1B audit was
subsequently delivered, and P1C/P1D are approved and delivered. P2A was subsequently visually approved and delivered. P2D result is now approved with provisional portraits. P2D is delivered and P2E subsequently visually approved. P2E delivery/main/Fast/clean-tree gate is complete. P2F is now user QUALITY APPROVED / FROZEN; remaining device/assets QA does not revoke that approval. P2G result is user approved; P2H refinement is complete through REVIEW READY / FREEZE CANDIDATE / STOP. Final auditory/refined visual selection and any next bounded task require user approval.


## Historical P2I — choreography comparison bundle (completed before visual selection)

Latest integrated instruction supersedes overlapping earlier requests; one bounded six-part sequence:
A preserve prior output → B smooth bow motion/continuous turns → C Violet/LONG A/B1/B2 comparison →
D desktop/mobile/reduced/lifecycle/performance/video validation → E canonical principles in MASTER and owner references →
F human glossary, evidence and the user's 20-field report → STOP. No repeated implementation/documentation of overlap.
Scope: src/sound, labs/sound, SOUND tests/capture command, canonical docs and evidence. Dependencies, frozen
Hero/Haegeum/navigation, source audio, global tokens, production routes and workflows are preserved.
Rollback: .checkpoints/p2i-choreography-before contains 63 baseline files including all 59 verified original P2I hashes;
HEAD ba80144 remains the Git baseline. Preserve earlier reports/evidence and unrelated user changes when reverting.
Full is attempted; failed out-of-scope owner gates are reported, not weakened. Test suites sharing test-results must
run sequentially: concurrent root/Lab runs can delete another runner's trace files. Resource measurements run separately.
No delivery, WORKS, filmstrip, adaptive navigation/entry ritual implementation, Blender, 3D or next scene authorization.
[Contract](SOUND-BOW-CONTACT-COMPARISON.md), [current result](../../../P2I-CHOREOGRAPHY-RESULT.md).

## P2I Closeout — QA Gap Classification, Visual Freeze & Delivery

The user's latest approval selects B2 Bold / LONG 460ms / Electric Violet #6334E5. One six-part authorized bundle:
1. Preserve reviewed evidence and inspect approved scope.
2. Reproduce/classify foundation Font CLS against P2A and current production output.
3. Separate Windows WebKit capabilities/fault injection from native Safari, using actual server media faults.
4. Freeze the selected direction, central tuning, Lab-only alternatives and owning documentation.
5. Sequential Fast/Full/SOUND/routing/content and relevant browser validation; keep failures visible.
6. With no confirmed blocker, logical commit/main push/Fast CI/clean tree; report then STOP.

Scope: existing SOUND and Lab integration/tuning, QA scripts/tests, canonical documentation and evidence.
No frozen scene, workflow/dependency, audio source, public route, deployment, legacy or next scene change.
Rollback before closeout: `.checkpoints/p2i-closeout-before` preserves all 127 reviewed files, including the
126 verified source hashes and original manifest. Git baseline remains `ba80144`; preserve earlier reports.
SOUND quality freeze with classified non-blocking gaps does not turn a red Full green or authorize deployment.
Report the user's 12 closeout fields from [result](../../../P2I-CLOSEOUT-RESULT.md). **STOP → USER APPROVAL**.

## P2J — Foundation CLS + scalable, responsive bow bundle

The user's P2I closeout approval preserves SOUND's B2 / LONG / Electric Violet visual freeze and authorizes one
six-part bundle: (1) diagnose/fix the actual foundation Lab CLS owner; (2) audit timestamp coupling; (3) implement
shared engine/feature/preset seams and one explicit local extraction prototype; (4) tune responsive, smooth bow
acceleration without changing the frozen visual composition; (5) sequential contracts/browser/Full plus real-time
B2 comparison evidence; (6) canonical docs/glossary, logical commit/main push/Fast CI/clean-tree receipt, report
the user's 24 fields and **STOP**. One authorization covers this sequence; no separate subtask approval loop.

Scope: foundation Lab masthead; src/audio + src/sound + Sound Lab; bounded local extraction/verification tooling;
relevant tests and owning docs. Existing Hero/Haegeum/navigation production code, content/audio bytes, routing,
legacy and deployment stay unchanged. Full restoration can repair demonstrated test readiness/capability/fault
injection assumptions; no threshold relaxation, missing assertion disguised as a pass, or artificial delay to win.
Windows WebKit capability assertions remain distinguishable from supported analyser/native Safari evidence.
Rollback baseline: clean main `05ce1f21488aafb3212e4abe84acce63b8f34777`; P2J changes are isolated on
`codex/p2j-audio-feature-engine`. Preserve prior result/evidence and unrelated user changes when reverting.
No whole-album batch, pitch/beat AI, content migration, WORKS or next scene. Full green is not deployment approval.


## P2K — Spatial points + Janggu + typography prototype bundle

The user explicitly authorizes these three related HOME/SOUND experiments as one bounded comparison bundle.
Six subtasks: reference/source geometry audit → spatial points/string alignment/SOUND handoff → conservative
Janggu helix/hits → shared-glyph action cascade → sequential contracts/browser/Full and real-time evidence →
canonical owner/glossary/result/STOP. Inputs are retained approved/provisional sources and frozen A references.
No second approval is needed between these authorized subtasks; final visual selection is still the user's.

Scope: isolated src/interaction-prototype and labs/interaction; optional internal SOUND rendering/continuation
slots with unchanged defaults; test/config/gate registration, new evidence, and current documentation owners.
Rollback baseline: clean main 930441982ff6e50a1a2f8af6f22910215f6af071; branch codex/p2k-interaction-prototypes.
Remove/revert only this bundle's diff if rejected; preserve earlier evidence and unrelated work. No assets/source
migration, new dependency, instrument 3D/Blender, WORKS, later scene, public HOME or deployment.

Fast adds nine P2K Node contracts (including the subsequent user-confirmed approximate Janggu regions). Full
adds 22 browser cases on 4180, using existing installed Chromium/WebKit. Total expected unique Node contracts:
65; browser cases: 307. The Sound command repeats its 18 Node contracts, which are not counted twice as unique.
The P0E table above records its historical evolution; package.json and current result own actual executed counts.
Capture/diagnostic browsers are sequential with Full to avoid contaminating frame metrics or shared artifacts.

End at **REVIEW READY** only after applicable checks/evidence. No final QUALITY APPROVED/FROZEN/canonical
selection, commit/main push or deployment is authorized by this prototype brief. **REPORT → STOP → USER APPROVAL.**


### P2K current refinement — latest user instruction

One bundle refines the current points/trails, Janggu and glyph transition, including the subsequent continuous-trail
request. Current runtime/code was checked before changes. Preserve its uncommitted review baseline in
`.checkpoints/p2k-refinement-before`; the shared bow geometry extraction can additionally revert to HEAD's identical
normal/edge math. No unrelated refactoring, restored obsolete UI, next scene or delivery. CLEAN AS YOU GO applies.
The user explicitly requests minimum validation (type-check, lint, build, related interaction smoke and regression
sanity), no new screenshots/videos and no commit/push/deploy. Prior Full/evidence remains historical. Report seven
fields and STOP; the user performs visual review. No additional approval loop within this authorized refinement.
