# Implementation Task Protocol — mandatory bounded work

Revision 1.8 · 2026-09-06 · user-approved enlarged bundles / P1D private draft integration; explicit delivery and terminal STOP retained.
Canonical roadmap: PHASE 0–14. This catalog does not authorize execution.

## Binding workflow

**PLAN → SUBTASK A → SUBTASK B → SUBTASK C if tightly related → FULL VALIDATION → REPORT → STOP → USER APPROVAL**

The user revised task size on 2026-09-06: about 2.5–3× the former microtask baseline. A bundle contains 2–3
strongly related subtasks under one objective/owner, aiming for a fully verifiable result in roughly 60–90 minutes.
Do not fill time artificially or drop checks to fit a deadline. Approval of the concrete bundle authorizes its A/B/C;
do not introduce intermediate approval pauses. Plan their sequence, file/behavior scope, inputs, acceptance checks,
full validation and rollback before edits. FULL VALIDATION covers all applicable checks, including Fast/Full below.
Do not mix unrelated subsystems, or combine visual design, 3D and content migration to increase volume.
Existing small queue entries can be bundled only under these constraints. Cross-Phase automation, whole HOME,
multiple unrelated pages, cross-owner 3D edits and skipping quality/freeze gates remain prohibited.

Every implementation bundle requires explicit user approval. Overall direction approval, a completed test, a proposed next task, or a phase title does not authorize the next bundle. Never execute several phases, several pages, the whole HOME, or multiple 3D subsystems automatically in one long session. A bundle can still require a split if its file/behavior scope becomes too broad.

Before starting, state: task ID, one objective, bounded file/behavior scope, input dependencies, validation, completion gate, rollback and exclusions. Use an isolated checkpoint/commit after implementation is authorized. No repository or commit is created by this document.

When tests fail, fix only the approved task's owner subsystem. If the fix expands scope, stop and report the new bounded task needed. Do not turn an unsuccessful spike into an unapproved framework migration.

## Result report — user fields first, seven by default

Use explicit user-requested report fields when supplied (P1D has 12). Otherwise use:

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
| Fast | `npm.cmd run gate:fast` | type-check → lint → locale/metadata and content unit contracts → placement contracts → root production build/prerender/placement → `test:content:visibility` on that fresh artifact |
| Full | `npm.cmd run gate:full` | Fast → project subpath build/prerender/placement → 80 existing + 2 draft-exclusion browser cases over both strict static hosts |
| Live deployment | `npm.cmd run test:pages` with actual `EXPECTED_DEPLOY_SHA` | 18-route JS on/off metadata, refresh/history, variants, actual HTTP 404, artifact identity/hash/MIME/cache |
| Workflow configuration | actionlint 1.7.12 | YAML, expressions, reusable workflow input/job wiring; Linux also checks embedded shell |

Individual commands remain available: type-check, lint, test:locale, test:content, test:placement, build,
build:pages-preview, test:spike. `check` remains the historical type/lint/root-build convenience command;
it is not the complete Fast gate. Root and project builds must run sequentially because they share typegen/cache.
Local Full defaults to installed Edge; Linux CI installs the pinned Playwright package's Chromium. The current Mac
uses the same installed Chromium with `CI=1` and the pinned Node/npm environment, without changing assertions.
`test:content` includes the real draft regression; `test:content:visibility` checks root client/static output after build.
Full checks both artifacts and real draft KO/EN 404/metadata exclusion. Test assertions
are the same. No reduced route sample or retry was introduced to hide failures.

Fast runs on every branch push and PR, including documents, through ci.yml → reusable quality-gates.yml.
It never installs a browser, uploads a Pages artifact or deploys. This small unconditional gate avoids
missing/pending checks on documentation-only PRs. A branch push plus an open PR can create two Fast runs;
concurrency cancels superseded runs on the same event ref. No repository ruleset is silently changed.

Full runs through an explicit pages.yml workflow_dispatch. It repeats Fast on that exact revision,
then checks both static bases and all 82 browser cases. A failed type/lint/unit/build/placement/browser
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

## Chunking the rest of PHASE 1–14

The sequence in each row is a planning queue. Under the 2026-09-06 revision, 2–3 strongly related entries within
one owner may form an explicitly approved 60–90 minute bundle; unrelated entries remain separate. Write the task
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
subsequently delivered and P1C is approved. Current user-authorized unit is the P1D private draft integration
bundle above and in [HANDOFF](../../../CODEX-HANDOFF.md). **STOP after P1D; no public release or next Phase.**
