# P0F — AGENTS.md / Project Knowledge Wiring

2026-09-05 · Documentation implemented / VERIFIED (document scope) / APPROVED as canonical by the user.
Scope: repository knowledge and agent instructions only. No next phase is started.
Baseline/rollback reference: `93bc87878cbd77d8f203d636b0c1f7657411c746`; original edited documents are
also preserved in ignored `.checkpoints/p0f-before-93bc878/`. Restore only this task's documents if needed;
do not reset unrelated user work. The original documentation turn created no commit, push, PR or deployment. The user subsequently approved P0F as canonical and explicitly authorized delivery only: one logical commit, V2 main push and Fast CI confirmation. No deployment or next task is authorized. Delivery SHA/run/result are reported separately after completion.

## 1. What was changed

Created a root operating map and connected the existing document owners. Recorded required future
Blender investigation and high-priority Haegeum 3D knowledge, resolved conflicting prior guidance,
and distinguished approved direction from implementation, evidence and quality approval.

New files: [AGENTS.md](AGENTS.md), this result.
Existing documents updated:

- [CODEX-HANDOFF.md](CODEX-HANDOFF.md): selected reading, complete specification catalog, status vocabulary/matrix and current STOP.
- [README.md](README.md): human onboarding links and current task status; setup commands retained.
- [MASTER](docs/redesign/00-MASTER-PLAN.md): repository knowledge hierarchy, future 3D gates and current foundation status.
- [Motion](docs/redesign/03-MOTION-SYSTEM.md): canonical future Blender/Haegeum sections; consistent subsystem IDs.
- [Album Detail](docs/redesign/07-ALBUM-DETAIL.md): evidence-based geometry selection; Tray requirements preserved.
- [Implementation Plan](docs/redesign/review/V2-IMPLEMENTATION-PLAN.md): future gates, current P0F status and next bounded proposal.
- [Task Protocol](docs/redesign/review/IMPLEMENTATION-TASK-PROTOCOL.md): P0F task card and separate BLENDER-01A–E future units.
- [Routing ADR](docs/redesign/review/ROUTING-ARCHITECTURE-DECISION.md) and [Locale Contract](docs/redesign/review/LOCALE-METADATA-CONTRACT.md): status/history annotations only; contracts unchanged.
- [HANDOFF Audit](docs/redesign/review/HANDOFF-AUDIT.md) and [Revision Log](docs/redesign/review/PLANNING-REVISION-LOG.md): targeted consistency findings and revision trail.

No application, configuration, workflow, dependency, test, runtime asset or HOME design source changed.

## 2. AGENTS.md structure

Identity/source of truth → reading order and task map → bounded work/status distinctions → legacy,
visual/mobile/asset rules → 3D gates/future work → approved routing/locale/CI delivery.
It summarizes operating constraints and links to owners; it does not copy scene specifications or a full plan.

## 3. Canonical document map

AGENTS is the agent entry point. HANDOFF owns current status and the 15-spec catalog. MASTER owns
philosophy and PHASE 0–14. Relevant page/system specs own requirements; ADR/Locale Contract own technical
decisions. The active Plan orders work, Task Protocol owns STOP/CI/delivery, and completed results/Revision
Log preserve scoped history. README owns human setup/commands. Chat/model memory is not project truth.
Explicit new user decisions are reconciled in these owners; historical reports do not override current policy.

## 4. Codex operating rules

Read AGENTS → HANDOFF → MASTER → relevant specs → active plan/result/protocol, reusing unchanged context
without rereading every spec. State objective/scope/inputs/checks/rollback, do one bounded task, test/report,
STOP and wait for approval. New implementation needs its own approval. Existing authorized work does not
need repeated permission. Status vocabulary separates APPROVED, IMPLEMENTED, VERIFIED, QUALITY APPROVED,
FUTURE EXPERIMENT, OPTIONAL and the specific downstream gate that is BLOCKING.

## 5. Legacy non-inheritance rules

Legacy remains an operating reference/content source. No default CSS/layout/composition/animation/camera/
lighting/3D presentation/per-ID components/patch copy. Only verified facts, approved authentic assets,
physical dimensions and selected algorithms/lessons may be reused after fit review. No legacy changes.

## 6. Mobile / visual quality rules

Contemporary Editorial / Ivory, Static Color, Dynamic Composition and Moving Editorial Poster remain.
Mobile/Desktop are first-class, with recomposed type/crops, vertical scroll priority, touch, real-device
and thermal/performance evidence. Functional Complete is not Quality Approved for Hero, major motion,
3D, Album Detail or responsive composition. Request materially better sources with reasons and blocking
timing; do not hide poor input quality with patches. No current asset or visual quality was tested here.

## 7. 3D rules

Dedicated Labs precede pages. Geometry → Materials → Camera → Lighting → individual Interaction →
Performance → Integration, with freezes and separate task approvals. Patch chains require root-cause work
from the last verified checkpoint. Relevant pose, velocities, camera/target, material/opacity/selection
must remain continuous. Mandatory Tray Lab still targets transparent CD plastic perception: plate/recess/
hub/support/lip/seating/material/light; no package Quality Approved before its gate.

## 8. Blender Capability Spike status

REQUIRED BEFORE RELEVANT 3D PRODUCTION / NOT EXECUTED; Blender adoption undecided.
[Motion §47](docs/redesign/03-MOTION-SYSTEM.md#blender-capability-spike) owns local/bpy/deterministic geometry/
.blend/GLB/material/coordinate/R3F/browser/size/mobile/repeatability evidence and APPROVE/REVISE/REJECT.
Task Protocol splits it into separately approved BLENDER-01A–E. A successful spike makes Blender-authored
Tray/Digipak/Booklet/Disc active candidates; simple geometry remains valid when better suited.
No Blender command, installation, asset creation or R3F consumer was executed/created in P0F.

## 9. Haegeum 3D future experiment status

FUTURE EXPERIMENT / HIGH PRIORITY / NOT IMPLEMENTED / NOT BLOCKING FIRST RELEASE.
[Motion §48](docs/redesign/03-MOTION-SYSTEM.md#haegeum-3d-experiment) preserves real structural components,
all 11 educational/visual uses, bow/contact/friction/vibration/tension/damping/resonance research and
reusable master → web/mobile/pre-render possibilities. Separate from HOME's existing scene/Secret;
not disposable decoration, not a Haegeum game, and no preemptive game complexity in V2.

## 10. CI / delivery wiring

P0E is unchanged: Fast on push/PR, explicit Full, deployment default false and exact approved SHA/main,
then live verification. README commands and Task Protocol remain the owners. No weakened tests or
workflow changes. No npm/build/browser/CI rerun for this documentation-only task; P0E evidence is historical,
not rebranded as P0F verification. The original turn stopped before publication. The subsequent explicit delivery approval covers commit/main push/Fast CI only; no preview deployment.

## 11. Documentation links verified

Validated 36 repository Markdown documents: 403 existing local link targets, including 14 anchors, resolve;
all 18 npm command references in AGENTS/README/Protocol match package.json. AGENTS is 104 lines / 1,128 words.
All new/edited document links resolve. The complete 15-spec catalog is reachable from HANDOFF, and the
operating map identifies the owners for HOME/mobile, routing/locale, delivery and future 3D work.

The audit also found three **pre-existing historical P0A source links** to files no longer present:
`index.html`, `src/main.tsx`, `src/app/App.tsx`. The P0A report is unchanged and remains explicitly historical;
these are not current implementation paths or new broken links. Do not restore obsolete source to fix them.
They remain recorded here as historical navigation limitations, not silently counted as passing links.

Preserved all 207 HANDOFF checkbox texts, 17 numbered Plan sections, 45 MASTER sections and 52 Album
Detail sections. Motion retains its 46 original sections and adds §§47–48. Documentation-only scope and
whitespace checks pass; no application/workflow/test/configuration change. Local detailed audit output is
in ignored `.checkpoints/p0f-document-check.json`; this report is the durable summary.
External reference sites, Blender availability, device capability and live Pages are not revalidated in P0F.

## 12. Any conflicts found

- HANDOFF required reading all specs every task: replaced with the user's selective canonical reading order; catalog preserved.
- Tray/Plan mandated procedural first and Blender only after failure: revised per user instruction to investigate first and compare evidence.
- Motion commit examples conflicted with Task Protocol's 3D IDs: aligned with the canonical IDs.
- Current MASTER/ADR/locale implied P0E was pending or P0C was the only live artifact: current annotations link P0E evidence; historical results retained.
- No required Blender gate or durable Haegeum roadmap detail existed: added under existing Motion/Plan/Protocol owners.

No unresolved contract conflict remains within this documentation scope. The three unchanged historical
P0A source links above are a known navigation limitation. Future Blender/device/source feasibility remains
untested; documentation coverage is not technical verification or quality approval.

## 13. Any unnecessary duplication removed

Replaced the mandatory all-doc reread instruction with selected reading. Full specifications, 207 checklist
items and prior result reports remain. Added no separate 3D guide, duplicate CI policy or memory store:
Motion owns future 3D semantics, Protocol owns task boundaries, HANDOFF owns status, AGENTS links them.
Short cross-document pointers are intentional; no design/function requirement was deleted or condensed away.

## 14. Recommended next bounded task

P0F result is approved. With new explicit task approval only: **P1A — Content/Data Schema Contract**,
using neutral fixtures to establish content/asset/presentation separation, stable IDs and authored/reviewed
KO/EN fields. No real content/asset migration, Design System or page implementation in that proposal.
No next task is started. **STOP and wait for explicit user approval.**
