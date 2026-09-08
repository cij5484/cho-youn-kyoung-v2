# Cho Youn Kyoung Official Website V2 — agent operating map

This is a clean implementation in `C:\choyounkyoung-v2`, repository
`cij5484/cho-youn-kyoung-v2`. It is not a legacy redesign/reskin. Communicate with the user in Korean.
Repository documentation is the canonical project knowledge; chat history and model memory are not
the source of truth. Follow current explicit user instructions and reconcile authorized revisions in
the owning document. If an unresolved conflict would change an approved contract, report it before changing it.

## Read in this order

1. This AGENTS.md: operating rules and navigation.
2. [CODEX-HANDOFF.md](CODEX-HANDOFF.md): current status, evidence, approval boundary and specification catalog.
3. [MASTER](docs/redesign/00-MASTER-PLAN.md): philosophy, non-negotiable requirements and canonical PHASE 0–14.
4. The page/system specifications relevant to the current task, using the map below and HANDOFF §1.
5. [Active implementation plan](docs/redesign/review/V2-IMPLEMENTATION-PLAN.md), the applicable completed result
   linked by HANDOFF, and [Task Protocol](docs/redesign/review/IMPLEMENTATION-TASK-PROTOCOL.md).

Read the relevant canonical documents accurately; do not reload every specification on every small task.
Reuse already-read context only while its revision remains current. The hierarchy above is a reading order,
not permission to override a specific contract with a broad summary. Historical result reports describe their
recorded revision; current status lives in HANDOFF, delivery policy in Task Protocol, technical decisions in ADRs.

| Task area | Canonical owner / additional reading |
|---|---|
| Art direction / HOME | [Design](docs/redesign/02-DESIGN-SYSTEM.md), [HOME V2.1](docs/redesign/04-HOME.md) |
| Motion / 3D / future asset pipeline | [Motion](docs/redesign/03-MOTION-SYSTEM.md) §§20–27, 42–48; [Album Detail](docs/redesign/07-ALBUM-DETAIL.md) §§10–15, 44 |
| Other pages | HANDOFF §1 links each page specification (WORKS, ALBUMS, PERFORMANCES, detail, ABOUT/MEDIA/CONTACT) |
| Mobile / quality | [Responsive](docs/redesign/11-RESPONSIVE.md), [Performance](docs/redesign/12-PERFORMANCE.md), [Accessibility](docs/redesign/13-ACCESSIBILITY.md) |
| Hero / Haegeum prototype | [Approved Hero guide](docs/redesign/review/HOME-HERO-VISUAL-PROTOTYPE.md), [continuous transition guide](docs/redesign/review/HOME-HAEGEUM-TRANSITION-PROTOTYPE.md); real-photo and generated-editorial provenance stay distinct |
| HOME Sound | [Full → Sound / native audio guide](docs/redesign/review/HOME-SOUND-EXPERIENCE.md); minimal HOME controls and source approval remain distinct from Album Detail |
| Navigation prototype | [Editorial Navigation guide](docs/redesign/review/EDITORIAL-NAVIGATION-PROTOTYPE.md); P2A foundation; P0D locale contract |
| Routing / locale | [Routing ADR](docs/redesign/review/ROUTING-ARCHITECTURE-DECISION.md), [Locale Metadata Contract](docs/redesign/review/LOCALE-METADATA-CONTRACT.md) |
| Content / assets / release | [Content Schema Contract](docs/redesign/review/CONTENT-SCHEMA-CONTRACT.md); MASTER §§10–13, 28–29, 38–39; [Legacy audit](docs/redesign/01-CURRENT-SITE-AUDIT.md), [Migration QA](docs/redesign/14-MIGRATION-QA.md) |
| Commands / CI / delivery | [README](README.md) for human setup; Task Protocol for gates, commit/push/deploy, evidence and failure handling |
| Status / change history | HANDOFF §26; [Revision Log](docs/redesign/review/PLANNING-REVISION-LOG.md); completed `P0*-RESULT.md` reports |

## One bounded task, then STOP

**PLAN → RELATED SUBTASKS (PARALLEL WHEN INDEPENDENT) → TASK-APPROPRIATE CHECKS → REPORT → STOP → USER APPROVAL.**

Latest user revision 2026-09-06: size a bounded task about 2× the previous enlarged bundle.
Bundle 4–6 strongly related subtasks under one coherent objective, aiming for a reviewable, fully validated
result in roughly 120–180 minutes. This is a sizing target, not a requirement to fill time or skip applicable checks at
a deadline. Visual R&D follows the lean checks below, not an automatic whole-site validation cycle. State the subtask sequence, files, inputs, validation and rollback before edits. One approval of
that concrete bundle covers its authorized subtasks; do not pause for a new approval between its authorized subtasks.
Do not combine unrelated pages/subsystems, or mix visual design, 3D and content migration to inflate a bundle.
Architecture changes retain separate approval; major 3D subsystems remain smaller units. Unexpected complexity
or a required direction choice means STOP, not scope inflation. A major scene needs user visual approval before the next.

Before edits identify one objective, limited file/behavior scope, required inputs, validation and rollback.
Preserve user changes and existing planning/review evidence. Never execute several phases, multiple pages,
the whole HOME, or multiple 3D owner subsystems as one automatic run. A green gate or recommendation does
not authorize the next task. Use the user's requested report fields (otherwise Task Protocol's seven fields).
Validation is selected for the task: lean technical checks for visual R&D, and the unchanged Release Gate for an explicitly authorized release. Fast CI remains required for delivery.
Stop after reporting and wait for explicit approval of the next bundle. Existing task-specific authorization remains valid;
do not invent an additional approval loop for already-authorized work.

Keep APPROVED, IMPLEMENTED, VERIFIED and QUALITY APPROVED distinct; also label FUTURE EXPERIMENT,
OPTIONAL and BLOCKING with their scope. The definitions and current matrix are in HANDOFF §26.
**Functional Complete != Quality Approved**, especially for HOME Hero, major motion, 3D, Album Detail
and responsive composition. Follow visual, state, interaction, real-device and performance gates; never
claim product quality approval from a successful build or neutral fixture.

## Parallel-first and lean visual iteration

For an authorized bundle, actively delegate independent modules/research to available agents. The main agent owns
shared CSS/timeline/router/package/lockfile and common MD integration. Assign file ownership before edits; never
have agents operate the same browser session or competing build outputs. Do not install orchestration tooling.

Visual R&D checks types, changed-area lint, the actual Preview build, critical runtime errors, opt-in/reset cleanup,
exact endpoints and input cancellation. Prefer small model tests and one necessary desktop/mobile sanity pass.
Inspect command inclusion first; do not repeat already-passing checks, whole HOME/E2E, Full Release Gate, 64-frame
baseline comparisons, screenshot/video collections or broad device matrices by habit. Technical success is not a
judgment of elegance, crop, typography, motion feel or A/B preference: the user decides those in the live Preview.
Fix errors introduced by the current change; report unrelated failures separately. Keep existing Fast CI and the
manual Release Gate intact; never weaken tests, claim unperformed device QA or promote a prototype automatically.

**Current protection:** HOME 04 stays exactly on the restored `d98aaa6` ribbon within this pass baseline main `00229d3`.
Do not touch its JSX/CSS/choreography, or reintroduce Depth Queue, clips, holds, afterimages or Scene Magnet indirectly.
User selected 07 Hanji + Compact Profile and 03/06 Scene Magnet as Canonical; their formal owner is
`src/home/experience`. Normal URL and `?dev=0` use Canonical. Explicit `?dev=1` uses URL > saved Draft >
Canonical; exit disables overrides, not Canonical. See the promotion workflow. Legacy `?compare`/`?all` remain
aliases, not authentication. Never put private originals, local source paths or secrets into comparison UI.
Classic remains a separate operating repository/build. Edition Gate and any Classic path/deployment integration are
FUTURE work after the complete V2, not part of this prototype or subpage research pass.

## Current implementation and cleanup

Read current runtime/code before interpreting historical implementation status; never restore removed UI from an old plan.
**CLEAN AS YOU GO:** verify references, then remove code/CSS/selectors/flags/helpers fully superseded within the touched
subsystem. Preserve active Lab comparisons and historical evidence; do not broaden this into unrelated refactoring.

## Legacy, visuals, mobile and assets

- Legacy `cij5484/cho-youn-kyoung` is an operating site and reference/content source. Do not modify it or
  connect/change `choyounkyoung.com` without a separately explicit task. Do not inherit legacy CSS, layout,
  page composition, animation/camera values, lighting, old 3D presentation, per-ID page components or patches.
  Reuse only verified facts, approved authentic assets, physical dimensions and selected algorithms/technical
  lessons after fit review for V2 quality, architecture, performance and maintainability.
- Preserve **Contemporary Editorial / Ivory**, **Static Color, Dynamic Composition**, and HOME V2.1's
  **Moving Editorial Poster**. Avoid generic portfolio, SaaS or template composition. The detailed design
  direction is approved. P2A foundation and P2B Bold navigation retain their visual approvals. P2C Bold Cropped
  remains canonical; P2F Hero→Haegeum and P2I B2 / LONG460 / Electric Violet retain their freezes. The current
  development HOME on 4180 continues through Works, Album Object, Performance, Artist and Outro in `src/home`.
  New scenes are implemented, not self-granted QUALITY APPROVED. P2K and this sprint's exact delivery/QA are
  recorded in HANDOFF §26 and GitHub; historical reports are revision-specific. Public HOME integration remains separate.
  The current Visual Impact Sprint strengthens the later-HOME ribbon, object exchange, stage/portrait response and
  typographic hierarchy. The previous moving Violet head reduction remains unchanged. Existing upstream
  comparisons remain development-only; default HOME has no comparison dock. The eight experience principles
  live in MASTER §3.1, and INTERACTION-GLOSSARY is a human reference, not additional agent instructions.
  Authentic sources and generated editorial instrument imagery stay distinct. Hero portraits remain provisional;
  larger 3/7 originals, native Safari, physical phones, VoiceOver and sustained thermal QA remain explicit follow-ups.
  Do not lower approved Bold tuning or treat browser emulation as native-device evidence. Final approval and the
  next-task boundary are owned only by HANDOFF and current explicit user instructions.
  Read the [foundation guide](docs/redesign/review/DESIGN-SYSTEM-FOUNDATION.md) and owning visual specs; current approval is in HANDOFF.
- Current art/motion criterion: **BOLD, CURATED, PURPOSEFUL**. Aim for a memorable first-visit impression;
  restraint means purposeful curation, not minimal effects. Actively study and reinterpret proven interaction
  principles in V2's Ivory, Haegeum/two-string/bow, tension/resonance, albums, photography and typography.
  Never copy exact layouts/compositions/timings, original assets, branding or source code. When useful compare
  Refined and Bold prototypes, starting with a more expressive candidate and editing through visual review.
  MASTER §§2/6, Design §§1/2 and Motion §§1/3/37/38 own this policy. It never expands the authorized task scope.
- Mobile and Desktop are first-class. Recompose typography, crop and depth; prioritize vertical scroll,
  touch-native interaction, real-device QA and thermal/GPU behavior. Reduced motion and intentional static
  fallback must preserve information and visual care. Desktop screenshots do not prove mobile quality.
- Proactively request better originals, crops, angles, high-resolution photos, real-object references or exact
  dimensions when they materially improve quality. State what is needed, why, whether work can continue,
  and when it becomes blocking (MASTER §38). Do not hide limitations behind low-quality workarounds.
  Inventory → select → verify → optimize → migrate; no bulk legacy asset copy or large private masters in public runtime.
- Apply the Content Schema Contract's Asset Lifecycle Policy: real assets first; AI/editorial candidates are allowed
  with explicit provisional/approved/replace-required status. Never disguise generated visuals as documentary records.

## 3D gates and future work

- Complex 3D begins in dedicated development-only Labs, not inside pages. Geometry → Materials → Camera
  → Lighting → individual Interaction tasks → Performance → Integration, with validation/freeze and STOP
  between owner tasks. Reopen only the owner of a defect. A compensating patch chain requires returning to
  the last verified checkpoint and finding the root cause, while preserving unrelated user work.
- State continuity is mandatory: Idle → Hover → Drag → Release → Inertia → Select → Forward Focus → Detail
  inherits relevant position, rotation, scale, linear/angular velocity, camera/target, material, opacity and
  selection. Next animation starts from the actual outgoing state; no unexplained reset. See Motion §42.
- [Blender Capability Spike](docs/redesign/03-MOTION-SYSTEM.md#blender-capability-spike) is **REQUIRED BEFORE
  RELEVANT 3D PRODUCTION / NOT EXECUTED**. Blender adoption is undecided: APPROVE / REVISE / REJECT only
  from spike evidence. Task Protocol splits the future spike into separately approved units. P0F permits no
  Blender execution/installation, model creation or R3F integration.
- CD Tray Lab is mandatory. Target immediate recognition as transparent CD plastic, not CAD manufacturing
  fidelity: plate, circular recess, hub, supports, lip, correct CD seating and believable material/light.
  No Album Detail package Quality Approved before its gate. After a successful Blender spike, consider
  Blender-authored Tray/Digipak/Booklet/Disc alongside simpler geometry based on fit, not implementation inertia.
- [Haegeum 3D](docs/redesign/03-MOTION-SYSTEM.md#haegeum-3d-experiment) is **FUTURE EXPERIMENT / HIGH PRIORITY**,
  not a first-release blocker or disposable decoration. Preserve reusable master/educational possibilities
  and bowed-string behavior research. It is not a Haegeum game; do not add future game architecture to V2.

## Approved foundation and delivery

- React Router + Static Prerender is APPROVED / VERIFIED for neutral fixtures. Preserve clean URLs,
  deterministic file placement, real HTTP 404 and central origin/base for root and Project Pages.
  No HashRouter, universal 200 fallback or manual output copying.
- KO uses unprefixed paths; EN uses `/en/...`; no `/ko`. Route identity, counterpart, missing-translation
  fallback, canonical, reciprocal hreflang/x-default and server/hydrated lang follow the Locale Contract.
  Official English content is authored/reviewed, not automatic translation as production truth.
- Delivery policy (user revision 2026-09-08): branch push/PR runs Fast. A main push or PR merge automatically
  runs Fast + preview build and deploys GitHub Pages development preview through `pages.yml`, followed by
  a minimal public-URL reachability check. Long browser suites do not block this preview. Full remains intact
  as manual `release.yml` with an exact SHA; it is a Release Gate, not a preview prerequisite. Keep failed
  Full results visible; preview delivery never implies release/visual quality approval. The current pipeline
  task requires Fast/build/actionlint, not another Full run. Production domain/legacy remain separately authorized.
  README/Task Protocol own commands, evidence and failure handling; never delete/relax tests to hide a failure.

Current approval/next-task boundary is in HANDOFF and the latest result. Nothing in this map authorizes a next phase.


P2K current navigation: the user authorized one local comparison bundle for spatial points, secondary Janggu
and shared-glyph typography. [P2K owner](docs/redesign/review/P2K-INTERACTION-PROTOTYPES.md) holds tuning,
reference research and source alignment; [result](P2K-RESULT.md) and HANDOFF own validation/status. Existing
P2F/P2I freezes remain A references. The new B candidates need user visual selection; no final canonical/freeze,
main delivery or next scene is implied. Preserve P2J evidence and its separate response-review status.
