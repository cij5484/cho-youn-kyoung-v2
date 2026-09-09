# CHO YOUN KYOUNG WEBSITE V2
## CODEX HANDOFF

**Status:** WORKS A/B/C spatial candidates / REVIEW READY / NOT PROMOTED. Canonical WORKS and HOME preserved; Spatial Helix superseded. Delivery receipt in §26.\
**Revision:** 1.43 / 2026-09-09 — WORKS three-way spatial experience\
**Purpose:** Prevent planning loss, silent assumptions, and legacy regression.

**Latest delivery policy — 2026-09-08:** user stopped Linux WebKit SOUND investigation and authorized pipeline-only
separation. main push/PR merge automatically deploys development Pages preview after Fast/build; only a minimal
public URL smoke follows. `preview/main.tsx` imports the existing HOME Lab unchanged;
`build:development-preview` emits a separate noindex device-preview artifact. Full stays intact as manual `release.yml`, with no preview dependency. PR #6 merged
the Navigation/SOUND fixes as `f33a222`; local Full passed but Linux WebKit seek/replay failures in run 34184294697
remain unresolved Release Gate evidence. That pipeline task is complete. The subsequent explicit HOME interaction bundle is authorized; its scope is recorded in HOME’s dated revision.

---

# 1. REQUIRED READING ORDER

Read in order: [AGENTS.md](AGENTS.md) → this HANDOFF → [MASTER](docs/redesign/00-MASTER-PLAN.md) → the task-relevant page/system specifications → [active plan](docs/redesign/review/V2-IMPLEMENTATION-PLAN.md), applicable result and [Task Protocol](docs/redesign/review/IMPLEMENTATION-TASK-PROTOCOL.md).

Repository documentation is the project source of truth, not chat history or model memory. The user's explicit revisions are reconciled into their owning documents. This order is a navigation map, not a demand to reread every specification on every task. Reuse already-read, unchanged context; inspect the relevant owner and current revision. Historical results remain evidence for their recorded scope, not current approval instructions.

The following is the complete specification catalog; select relevant entries rather than reading all unconditionally:

1. [00-MASTER-PLAN.md](docs/redesign/00-MASTER-PLAN.md)
2. [01-CURRENT-SITE-AUDIT.md](docs/redesign/01-CURRENT-SITE-AUDIT.md)
3. [02-DESIGN-SYSTEM.md](docs/redesign/02-DESIGN-SYSTEM.md)
4. [03-MOTION-SYSTEM.md](docs/redesign/03-MOTION-SYSTEM.md)
5. [04-HOME.md](docs/redesign/04-HOME.md)
6. [05-WORKS.md](docs/redesign/05-WORKS.md)
7. [06-ALBUMS.md](docs/redesign/06-ALBUMS.md)
8. [07-ALBUM-DETAIL.md](docs/redesign/07-ALBUM-DETAIL.md)
9. [08-PERFORMANCES.md](docs/redesign/08-PERFORMANCES.md)
10. [09-PERFORMANCE-DETAIL.md](docs/redesign/09-PERFORMANCE-DETAIL.md)
11. [10-ABOUT-MEDIA-CONTACT.md](docs/redesign/10-ABOUT-MEDIA-CONTACT.md)
12. [11-RESPONSIVE.md](docs/redesign/11-RESPONSIVE.md)
13. [12-PERFORMANCE.md](docs/redesign/12-PERFORMANCE.md)
14. [13-ACCESSIBILITY.md](docs/redesign/13-ACCESSIBILITY.md)
15. [14-MIGRATION-QA.md](docs/redesign/14-MIGRATION-QA.md)

Do not implement from an isolated task prompt without this context. README owns human setup/commands; AGENTS owns agent operation; this HANDOFF owns current status.

---

# 2. BEFORE CODE

Before modifying code:

- summarize the architecture you understood
- identify conflicts/ambiguities
- identify missing assets
- identify technical risks
- map implementation phases
- propose validation checkpoints

**Do not write production code before this review is complete.**

---

# 3. NEW REPOSITORY RULE

V2 is a completely new implementation.

Target:
`cij5484/cho-youn-kyoung-v2`

Legacy:
`cij5484/cho-youn-kyoung`

Do not redesign the legacy project in place.

---

# 4. LEGACY NON-INHERITANCE CHECKLIST

[ ] No legacy CSS copied wholesale  
[ ] No HashRouter  
[ ] No work-specific global CSS patches  
[ ] No dedicated page per performance ID  
[ ] No legacy Hero copied by default  
[ ] No legacy background reused without fit review  
[ ] No legacy 3D camera/light values reused by default  
[ ] No legacy monolithic 3D detail copied wholesale  
[ ] Legacy data verified before migration  
[ ] Legacy assets individually reviewed

---

# 5. ART DIRECTION CHECKLIST

[ ] Contemporary Editorial / Ivory  
[ ] Cormorant Garamond for English display  
[ ] Noto Serif KR for Korean display  
[ ] Noto Sans KR for body/UI  
[ ] Artwork keeps original color  
[ ] UI remains restrained  
[ ] No generic rounded cards  
[ ] No glassmorphism/neumorphism  
[ ] No arbitrary gradients  
[ ] No generic SaaS buttons  
[ ] Large whitespace is intentional

---

# 6. MOBILE PRIMARY CHECKLIST

[ ] Mobile is first-class  
[ ] Mobile not desktop shrink  
[ ] Mobile Hero independently composed  
[ ] Mobile navigation independently composed  
[ ] Large typography retained  
[ ] Mobile-specific crops requested if needed  
[ ] Vertical scroll wins over 3D gestures  
[ ] Real-device testing included  
[ ] Adaptive 3D quality included  
[ ] Static fallback still looks premium

---

# 7. HOME CHECKLIST

**Current HOME canonical direction: V2.1, Moving Editorial Poster.** See [04 HOME](docs/redesign/04-HOME.md) §2/§24/§26 and [revision report](docs/redesign/review/HOME-V2.1-REVISION-REPORT.md). These are planned requirements, not completed visuals. First viewport must work as an art poster; first ~5-second impact comes from composition/type/photo/crop/depth/space/timing/physical continuity, not more effects. Name composition may occupy 55–65% viewport height; desktop portrait uses the right 58–62% visual zone. Exact crop/source needs review.

Rhythm: STRONG → STRONG → QUIET → ACTIVE → PEAK → QUIET → QUIET → RESOLVE, with intensities 5/4.5/3/4/5/2.5/2/3. Scene budgets and the overlapping 1.2–1.6 viewport Hero→Haegeum transition follow 04 §2/§5. No default unrelated crossfade, snap or long forced pin. Mobile is independently art-directed with vertical scroll > tap > intentional horizontal gesture > free 3D manipulation. Hero/major scenes require explicit Visual Quality Gate approval in addition to Functional Complete. No visual gate is passed by this document update.

[ ] Transforming Editorial Navigation  
[ ] CHO / YOUN / KYOUNG oversized Moving Editorial Poster Hero
[ ] Asymmetric portrait  
[ ] Only 1–2 precise text/portrait depth crossings  
[ ] Hero starts side/back portrait  
[ ] Scroll reveals 3/4 portrait with haegeum  
[ ] No decorative loading intro  
[ ] Haegeum 4-stage sequence  
[ ] Two-line structural motif; one strand can lead the connecting guide/Works axis
[ ] English keywords only  
[ ] Interactive Sound Landscape  
[ ] No audio autoplay  
[ ] Selected Works long asymmetric editorial surface; desktop drag/optional wheel, mobile vertical-first
[ ] 4–5 selected works  
[ ] 2026 three-album physical collection; simultaneous live object count is quality-dependent
[ ] Prefer one high-quality live object + album switching if three weaken quality; stable/static idle
[ ] Performance Dark Stage  
[ ] About first clear front-facing or clear 3/4 portrait reveal, Ivory, 2–3 sentences
[ ] Outro oversized artist name  
[ ] Sou.P Easter Egg preserved only in HOME Outro / Footer; not repeated on ABOUT

---

# 8. 3D CHECKLIST

[ ] 3D Lab exists  
[ ] Separate mandatory Tray Lab passes its gate before Album Detail package Quality Approved  
[ ] Geometry/material/camera/interaction separated  
[ ] Major tuning values centralized  
[ ] Subsystem freeze rule followed  
[ ] No compensating patch chains  
[ ] Functional Complete != Quality Approved  
[ ] State Continuity Gate implemented  
[ ] Delta-time motion  
[ ] `useFrame`/refs for fast animation state  
[ ] Adaptive DPR / quality tiers  
[ ] Offscreen render reduction  
[ ] Explicit GPU cleanup  
[ ] Mobile interaction tested  
[ ] Static/pre-render fallback

---

# 9. 3D CONTINUITY CHECKLIST

For every transition:

[ ] Previous end position == next start position  
[ ] Rotation continuity  
[ ] Scale continuity  
[ ] Velocity/angular velocity continuity where relevant  
[ ] Camera continuity  
[ ] Selection/mode continuity  
[ ] Material/opacity continuity where relevant  
[ ] No hard-coded reset between states

---

# 10. ALBUM DETAIL CHECKLIST

[ ] Hybrid 3D + Editorial architecture  
[ ] OPEN ALBUM explicit action  
[ ] Natural opening sequence  
[ ] Booklet + CD visible in open state  
[ ] CD tray recognizable and believable  
[ ] Tray not over-modeled unnecessarily  
[ ] 3D Booklet → 2D Reader  
[ ] Desktop spread / Mobile single page  
[ ] Zoom supported  
[ ] 3D Disc → Editorial Player  
[ ] Play/Pause/Prev/Next/Seek  
[ ] Volume + Mute  
[ ] Persistent Mini Player within the same Album Detail route only; ends on different-route navigation  
[ ] Bowed-string micro-vibration rule  
[ ] Album Story → Tracks → Booklet → Credits → Related

---

# 11. BOWED-STRING VISUAL RULE

The haegeum is a bowed-string instrument.

[ ] No large vertical bouncing line  
[ ] No percussive equalizer behavior  
[ ] Micro-vibration prioritized  
[ ] Tension/damping/density prioritized  
[ ] Lines remain visually close to straight  
[ ] Higher energy increases density/frequency more than amplitude

---

# 12. WORKS CHECKLIST

[ ] Dual Archive + Unified Timeline  
[ ] Asymmetric Dual Portal  
[ ] HOME Hairline → WORKS Grid Line  
[ ] Editorial Visual Grid  
[ ] Chronological Index  
[ ] Featured 1–2 works  
[ ] Latest-first factual sorting  
[ ] Presentation metadata, not CSS hacks  
[ ] Mobile mixed 1/2-column layout  
[ ] Sticky text filter  
[ ] Mobile direct detail rows

---

# 13. ALBUMS CHECKLIST

[ ] Discography Exhibition  
[ ] SANJO / JEONGAK grouping  
[ ] Production-3D source pre-renders  
[ ] No full live 3D on every listing object  
[ ] Subtle lift/tilt only  
[ ] Pre-render → live 3D handoff if precise  
[ ] Simpler fallback if not precise  
[ ] Mobile vertical chapters  
[ ] No unnecessary sticky category switch

---

# 14. PERFORMANCES CHECKLIST

[ ] Cinematic Timeline Archive  
[ ] Stage Window  
[ ] visualMode system  
[ ] photo/poster/video-still/editorial/typography supported  
[ ] No fake documentary imagery  
[ ] Upcoming + Archive same page  
[ ] Strongest honest visual wins  
[ ] Mobile vertical timeline  
[ ] Shared visual transition to detail

---

# 15. PERFORMANCE DETAIL CHECKLIST

[ ] Common Semantic Structure + Visual Variant  
[ ] No per-ID special pages  
[ ] Artist Note first  
[ ] Editorial Score Program  
[ ] Cast typography-first  
[ ] Unified Archive  
[ ] One primary video  
[ ] Poster/Leaflet treated as printed artifacts  
[ ] Mobile vertical editorial flow  
[ ] Missing media removes cleanly

---

# 16. ABOUT / MEDIA / CONTACT CHECKLIST

ABOUT:
[ ] Editorial Biography + Career Archive  
[ ] Different Hero portrait from HOME  
[ ] Selected Milestones + Full CV  
[ ] Loose Portrait Archive  
[ ] Separate small ABOUT Delight; no Sou.P reuse

MEDIA:
[ ] Featured Film + Visual Archive  
[ ] YouTube as delivery source  
[ ] Poster first, player on demand  
[ ] No raw iframe grid  
[ ] Filter hidden when content is too small  
[ ] Press as lower Editorial Index

CONTACT:
[ ] Oversized typography  
[ ] No default contact form  
[ ] Mailto + Copy Email  
[ ] Instagram + YouTube only if active  
[ ] Almost static ending

---

# 17. I18N CHECKLIST

[ ] Korean default routes  
[ ] `/en/...` English routes  
[ ] No client-state-only language switching  
[ ] Official reviewed translations  
[ ] Correct language metadata  
[ ] hreflang/canonical reviewed  
[ ] Equivalent-route language switch

---

# 18. PERFORMANCE CHECKLIST

[ ] Hero loading optimized  
[ ] Responsive images  
[ ] YouTube lazy/on-demand  
[ ] Audio loading controlled  
[ ] 3D profiled in isolation  
[ ] Adaptive DPR  
[ ] Offscreen suspension  
[ ] Texture lifecycle managed  
[ ] Long-session memory test  
[ ] Route transition cost bounded  
[ ] Mobile thermal behavior considered

---

# 19. ACCESSIBILITY CHECKLIST

[ ] Semantic HTML  
[ ] Keyboard navigation  
[ ] Visible focus  
[ ] Reduced motion  
[ ] Drag alternatives  
[ ] 3D fallback  
[ ] Audio labels  
[ ] Volume accessibility  
[ ] Booklet controls  
[ ] Alt text  
[ ] Touch targets  
[ ] Screen-reader logical order  
[ ] Modal focus behavior

---

# 20. ASSET REQUEST CHECKLIST

Do not silently compromise quality.

For any weak/missing asset:

[ ] Can implementation continue?  
[ ] Why would a better asset improve quality?  
[ ] Exact requested asset defined  
[ ] Required vs optional identified  
[ ] Blocking point identified  
[ ] Request communicated to user in Korean

---

# 21. PHASE PLAN

The canonical roadmap is PHASE 0–14, synchronized with Master Plan §35. The historical 0–12 plan is superseded.

Each phase is split into bounded tasks. No phase or page set is a single automatic implementation run. Follow [Implementation Task Protocol](docs/redesign/review/IMPLEMENTATION-TASK-PROTOCOL.md).

Canonical:

PHASE 0 — Foundation  
PHASE 1 — Content/Data Foundation  
PHASE 2 — Design System  
PHASE 3 — Motion System  
PHASE 4 — HOME  
PHASE 5 — WORKS  
PHASE 6 — ALBUMS  
PHASE 7 — ALBUM DETAIL  
PHASE 8 — PERFORMANCES  
PHASE 9 — PERFORMANCE DETAIL  
PHASE 10 — ABOUT/MEDIA/CONTACT  
PHASE 11 — Responsive Refinement  
PHASE 12 — Performance Optimization  
PHASE 13 — Accessibility  
PHASE 14 — Migration/QA

---

# 22. REQUIRED CODEX PLAN OUTPUT

Before implementation, Codex must produce:

1. Architecture summary
2. File/folder proposal
3. Dependency proposal
4. Routing/Pages strategy
5. Content migration plan
6. Asset migration plan
7. 3D architecture plan
8. Motion architecture plan
9. Mobile strategy
10. Testing strategy
11. Performance strategy
12. Accessibility strategy
13. Phase-by-phase implementation plan
14. Risks / unknowns
15. Assets/questions required from user

---

# 23. CONFLICT RULE

If any current task conflicts with these documents:

**Do not silently patch around the conflict.**

Stop and report:
- conflicting instruction
- affected document
- recommended resolution

---

# 24. APPROVED REVISION CHECKLIST — DOCUMENT CONTRACT, NOT COMPLETION

[ ] Canonical roadmap PHASE 0–14; historical 0–12 superseded
[ ] HOME Outro / Footer alone owns Sou.P creator-signature Easter Egg
[ ] ABOUT has a separate small Delight without repeated Sou.P credit
[ ] Mandatory Tray Lab targets perceptual transparent CD plastic, not CAD manufacturing fidelity
[ ] Tray plate/recess/hub/support/lip/CD seating/material-lighting gate passes before package quality approval
[ ] Same Album Detail Tracks/Reader/Credits/scroll/3D-DOM changes retain controllable playback
[ ] Different-route navigation ends playback; no site-wide global player or return autoplay
[ ] Accessible muted text #6D6962 verified on Canvas/Surface; original muted tone retained in appropriate roles
[x] React Router + Static Prerender APPROVED after the P0C real GitHub Pages routing/deployment gate
[ ] Spike verifies subpath and root, all KO/EN routes, direct navigation/refresh and valid-versus-404
[x] Spike verifies per-route metadata, canonical and hreflang; no HashRouter retreat
[ ] No real playable source gives unavailable/disabled/coming-soon; no silent timer or false playing
[ ] Real mobile programmatic-volume capability tested in PHASE 0 or Audio spike
[ ] Unsupported volume gets reported capability-based UX/fallback; no forced workaround
[ ] PLAN → RELATED SUBTASKS (PARALLEL WHEN INDEPENDENT) → TASK-APPROPRIATE CHECKS → REPORT → STOP → USER APPROVAL
[ ] Each task has one goal, limited impact/file scope, immediate validation and easy rollback
[ ] PHASE 0 uses individually approved P0A–F; no automatic next unit
[ ] 3D geometry/materials/camera/lighting/drag/inertia/open/tray/disc/transition are separate reviewed units
[ ] Every task reports user-requested result fields (seven by default) and then stops
[ ] No multiple phases/pages/full HOME/several 3D subsystems in one automatic implementation run

# 25. IMPLEMENTATION CHUNKING / STOP RULE

Mandatory sequence:
PLAN → RELATED SUBTASKS (PARALLEL WHEN INDEPENDENT) → TASK-APPROPRIATE CHECKS → REPORT → STOP → USER APPROVAL.

Latest user revision 2026-09-06: enlarge the previous bundle about 2×. One approved coherent bundle may contain
4–6 tightly related subtasks, targeting a fully verifiable result in roughly 120–180
minutes. This is a planning target, not mandatory elapsed time or a reason to omit checks. No new approval is
needed between already-authorized subtasks. Architecture changes retain a separate approval gate; major 3D stays smaller. Unexpected complexity or a direction decision requires STOP. User visual approval gates the next major scene. Do not mix unrelated subsystems or visual design/3D/content migration.
For visual R&D, use Lean Visual Validation: types, changed-area lint, actual Preview build, small state tests and core smoke. No automatic Full/whole HOME matrix/evidence packs/repetition of passing checks. Existing Fast CI and manual Release Gate remain separate; Phase/3D owner boundaries remain.

No explicit next-task approval means STOP, even when the next task is obvious or tests passed. A broad direction/plan approval does not authorize continuous execution. A failed check permits only correction within the approved bounded scope; if another subsystem must change, report and request a new bounded approval.

Every task must have one clear objective, limited impact, explainable file scope, immediate validation and reversible checkpoint. Never implement multiple pages or the whole HOME at once. Never automatically continue across phases for hours.

Use the user's requested report fields; otherwise report:
1. What was changed
2. Files changed
3. Tests performed
4. Result
5. Known issues
6. Screenshots / preview location if applicable
7. Recommended next task

Then STOP and wait for explicit user approval. See Master §43 and [bounded task catalog](docs/redesign/review/IMPLEMENTATION-TASK-PROTOCOL.md).

# 26. CURRENT HANDOFF STATE

## Current WORKS Three-way Spatial Experience — 2026-09-09

Baseline origin/main `65eea3510ee6843a6d6410f059c87db0055a6f56`; branch `codex/works-three-way`.
User authorized three parallel layout modules, one shared shell, lean checks and PR→main→automatic Pages Preview.

- **A / z-depth:** authored XYZ corridor with contextual Ivory temperature; depth approach and side/back exit.
- **B / wave-path:** two open category curves, tangent quaternion/readable slerp and separated crossing depth.
- **C / stack-flow:** irregular material cluster, Bezier peel/focus and open outgoing flow.
- **Common contract:** same six assets/records, DOM focus metadata, navigation, Canvas, 250svh core travel,
  final20% common archive alignment. Separate mobile corridor/partial arc/vertical unpacking.
- **Choices:** `worksExperience` URL, `worksLayout` registry/Draft/Promotion. Korean A/B/C controls; current Canonical
  remains unchanged. Retired Helix Draft→current preserves HOME choices. No active Helix or automatic promotion.
- **Ownership:** selected module only loads; shared renderer has explicit teardown/restart and current-scroll
  initialization. DPR1.5/1.25, settled/offscreen/hidden stop, RM/context-loss/unsupported compact actual-record fallback.
- **Lean validation:** candidate models/settings, type/lint/Preview build and 1440/390 Chromium software-WebGL
  load/texture/reverse/selection/resource/fallback/archive/link checks. Actual device/Safari GPU QA remains separate.
  Full Release Gate, whole HOME E2E, broad matrix and additional research were not run.
- **Protected:** all HOME scene files, current `WorksPage`/choreography, canonical.json, original assets and catalog.
  Framework production route still imports `WorksPage`; development Preview owns candidate selection.
- **Recommendation / not selection:** C provides the clearest sculptural first impression and mobile unpacking.
  User comparison decides; A/B/C remain review candidates. Details in WORKS owner and Experience Promotion contract.

Delivery receipt (PR/main SHA/Fast/Pages/public A/B/C checks) lives on the PR and final report.
**REPORT → STOP.** No automatic promotion or next scene.

## Previous Wet Visibility / Three.js WORKS Candidate — 2026-09-08 (Helix superseded)

Baseline main/origin `4dfa554884cfdfabf4d16eaecad74334447da1f9`; branch `codex/wet-field-spatial-works`.
User explicitly authorizes two parallel tracks, direct Three.js prototype integration and lean Preview delivery.
This approval does not promote the candidate or authorize other 3D/HOME work.
The subsequent explicit mobile-pacing addition permits only authored viewing distance in 03/04/06/07;
04 ribbon composition, 05 handling and Desktop scroll behavior remain unchanged.

- **08 Canonical tuning / REVIEW READY:** 2.4× Desktop and 2.7× Mobile base radius, bounded profile variation,
  stronger fibre wetting, 1.3–1.7s growth/.65s hold/5.1–6.9s life. Existing 72s phase, emission caps, actual scroll
  quiet, source selection, blank tap, reduced motion and glyph/pair behavior preserved.
- **WORKS development candidate / NOT PROMOTED:** `worksLayout: spatial-helix`, accessible at
  `/works/?dev=1&works=spatial-helix`. Default/dev=0 retains `current`. Direct Three.js core, real thin objects,
  curve-local quaternion frames, focus slerp, native-scroll damping and Compact Archive. No CSS billboard carousel.
- **Shared choices:** existing registry/Draft/Promotion extended with one real promotable key; strict additive
  migration preserves older complete HOME drafts. Page-scoped controls preserve filters and other-page settings.
  Copying a candidate cannot promote it. Dynamic import keeps the Three scene out of ordinary HOME/current WORKS.
  Development choices mount in the Pages Preview/Lab consumer only; Framework production WORKS keeps its
  existing `WorksPage` owner. The unchanged artifact gate caught an initial shared-UI import into root;
  restoring that route boundary excludes all HOME Lab dependencies from the production artifact.
- **Mobile pacing:** original 235svh Hero/Haegeum/SOUND timeline plus a 55svh completed-SOUND hold;
  LISTEN/Revisit/Magnet share the hold midpoint. 04 section 250→340svh, shared 06/07 section 320→440svh.
  05 remains natural flow. The CSS opt-in is ≤639px with motion enabled; Desktop and reduced-motion retain
  their prior geometry. No input delta scaling, touch interception or new snapping controller.
- **Lean validation:** focused wet profiles/visibility and scene load/textures/quaternion/reverse/raycast/routes/
  fallback/cleanup at Desktop/Mobile, type/lint and actual Preview build. User decides natural 3D/visual quality.
  Mobile short/medium/strong/reverse native input, held finger, release and Magnet cancellation are checked
  separately. No Full Release Gate, broad matrix, mass evidence or unrelated SOUND investigation;
  physical-device/iOS inertia QA remains separate.
- **Protected:** HOME04 ribbon composition, all other HOME visuals, existing approved Canonical values, current WORKS DOM version,
  catalog/private boundaries, navigation and original assets. Official posters/cover derivatives remain source
  material; neutral backs are intentional since no real back assets are supplied.

Delivery receipt (PR/main SHA/Fast/Pages/focused public checks) lives on the PR and final report.
**REPORT → STOP.** No automatic promotion or next scene.

## Previous Outro Response / WORKS Visual Rebuild — 2026-09-08

Baseline main/origin `760387ee7b1941dc3004783c7212f2625e4163c9`; branch `codex/outro-works-rebuild`.
User rejected the previous WORKS visual architecture. Its historical delivery does not mean Quality Approved.
Two explicitly authorized parallel owners: 08 surface and WORKS; shared integration/documentation by main owner.

- **08 reproduced defect:** at 390px with a fine pointer the mobile composition selected `pointer`, so the
  running scene-8 pair generated no autonomous stains. Touch emulation already generated stains at baseline;
  this is not a claim to have reproduced every physical-phone failure. Mobile layout now selects `points`.
- **Scroll ownership:** root style changes invalidate geometry and point coordinate writes wake the scheduler;
  only an actual native scroll-position change updates quiet time. The passive listener exists only while
  the surface is active/visible. Unrelated continuous style writes no longer delay autonomous generation.
- **Desktop:** independent representative-sample emission, 580ms interval / 56px travel, maximum four live
  blooms, 3.4s lifetime / .38s arrival. Pointer/glyph response remains continuous; 72s color/fibre/palette unchanged.
  Mobile retains 850ms entry, 280ms real-scroll quiet, 1.8s interval, maximum three / 5.2s lifetime and blank tap.
- **WORKS rebuilt / REVIEW READY:** independent album object and vertical performance worlds converge through
  measured DOM geometry into archive slots. Each representative image exists once. Native ratios, simplified
  captions and distinct album-material/performance-plane hover replace the neutral card frame. Mobile has
  sequential worlds, a compact paired landing and then large one-column records. Filters/history, six verified
  records, links, index, KO-only routing and reduced-motion static access remain intact. Main WORKS title unchanged.
- **Lean evidence:** source-selection and quiet ownership checked at 390px both fine pointer and touch emulation;
  actual autonomous generation despite unrelated style writes, blank tap, native vertical gesture, reduced/offscreen
  cleanup and bounded desktop sweep. Focused WORKS route/convergence/filter/link/focus/mobile checks plus type,
  changed-scope lint and actual Pages build. No Full Release Gate, broad browser matrix or physical-device claim.
- **Protected:** other HOME scenes (especially 04), Canonical/Draft/Promotion, navigation and SOUND Canvas issue.
  No new assets or framework dependencies. Visual quality remains for user review.

Delivery outcome (PR, merged SHA, Fast CI, Pages and minimal public checks) is recorded on the PR and final report.
**REPORT → STOP.** No further visual pass or page is authorized by delivery.

## Previous Canonical Experience / HOME Fix / WORKS Pass — 2026-09-08

Baseline `00229d3661aab028c44abb656face602328ea8f1`, clean main/origin; branch `codex/canonical-home-works`.
User explicitly authorizes the three parallel owned tracks and Fast CI → PR → main → automatic Pages Preview.

- **Selected / Canonical:** Hanji Wet Reveal + Compact Profile and 03/06 Scene Magnet, now formal `src/home/experience`
  owners independent of DevelopmentTools. Normal URL/dev=0 use repo values; dev=1 uses URL > saved Draft > Canonical.
  [Promotion workflow](docs/redesign/review/EXPERIENCE-PROMOTION.md) documents versioned options, registry and validated CLI.
- **06 root cause / fixed:** built CSS order let the equal-specificity `.dark-stage` background paint the full-screen
  copy overlay above a decoded poster. The overlay is now explicitly transparent within this sequence; only the 06
  poster gets early low-priority fetch/decode. Content, masks, timing and Revisit destination remain unchanged.
- **08 implemented / REVIEW READY:** original wet shape, local glyph and inherited pair retained. Color uses an
  independent 72s continuous Violet/Bronze/Lacquer cycle. Mobile uses actual point coordinates, quiet entry, capped
  5.2s stains and small glyph response; scrolling/interactive taps do not create tap stains. Reduced motion is static.
- **WORKS implemented / REVIEW READY:** one `src/works/WorksPage.tsx` for Framework and Preview `/works/`. Asymmetric
  album/performance portal objects become the archive; native scroll, ALL/ALBUMS/PERFORMANCES query/history reflow
  and chronological index. Independent legacy audit: 3 albums + 3 performances; the private P1D album remains excluded.
  Only KO is published. `/en/works/` is unavailable/404; no invented translations or reciprocal EN metadata.
  Other pages remain fixtures. Global menu can reach original KO WORKS from EN; MENU motion is unchanged.
- **Lean local evidence:** type-check, changed-scope lint, actual Preview + Framework build, small choice/promotion,
  wet-field/catalog/locale contracts; root private/Lab artifact exclusions; Chromium 1440/390 built sanity for
  canonical/dev0/draft/URL precedence, visible poster + Revisit, no-zoom, pointer/actual-point/tap/scroll intent,
  reduced motion, WORKS filters/history/locale and both route owners. No Full Release Gate or physical-device claim.
- **Limits:** official posters stand in for unprovided documentary stage photos; native V2 details remain future
  work (verified external legacy SPA references). Provisional asset status stays separate from verified facts.
  Prior public SOUND Canvas non-finite-gradient issue was not investigated by this bounded task.

Delivery outcome (PR/SHA/Fast/Pages/public minimum checks) is recorded on this pass's PR and final report.
Protected 04 ribbon, existing Hero/Haegeum/05, 07 fixed photo scale/crop and removed detached edge remain intact.
**REPORT → STOP.** No next page/scene is authorized by successful delivery.

## Previous HOME Outro Interaction / Hover Pass — 2026-09-08

Start: `main == origin/main`, **`d44cf1c0df22f92d131a56d7b6b17d55d307f277`**, PR #12 delivered.
Branch: `codex/outro-interaction-hover`. User authorizes parallel owned tracks, lean checks, existing Fast CI,
PR → main merge → automatic Pages Preview and normal/comparison URL smoke. Full Release Gate is excluded.

- **08 implemented / REVIEW READY:** inherited Violet/Lacquer pair never gathers or disappears at the page end;
  irregular local wet-color field and nearby large-glyph response share one bounded Canvas/input owner.
- **Standalone HOME links:** Entry-Origin Tension Wave, coordinated arrow, prompt leave settlement, static
  reduced-motion/focus fallback and single-tap navigation. Frozen MENU/global navigation remains unchanged.
- **Scene Revisit Index:** seven current scenes, fixed desktop asset cue, mobile disclosure; shared geometry-based
  jumps also serve the development panel. SOUND jump never starts audio; new input cancels explicit smooth travel.
- **Protected:** exact 04 ribbon; existing 03/05/06/07 choreography; prior Hanji-only completed-photo scale/crop
  freeze and compact-profile viewing window. Removed the remaining detached Artist→Outro edge code, retaining
  Album→Stage light. No new page, asset, permanent palette, dependency or route system.
- **Preview review pending:** paper/color strength, local type response, link feel and index composition are user
  visual decisions. This implementation is not QUALITY APPROVED. Existing Hanji/straight and magnet choices
  remain opt-in; physical phones/native Safari are not newly verified.

Single current result and local checks: [HOME Outro Interaction](docs/redesign/review/HOME-OUTRO-INTERACTION.md).
Delivery receipt (PR/merged SHA/Fast/Pages/public smoke) is recorded on the delivering PR. **REPORT → STOP**;
no next HOME/subpage task is authorized by a green CI result.

## Previous Experience Prototype / Subpage Research — 2026-09-08 (PR #12 delivered)

Start: clean `main == origin/main`, **`150529b4c1b9a7e1c4fa306ebe0abdbf51246cdb`**, after PR #11.
Branch: `codex/experience-prototype-research`. The explicit user bundle authorizes opt-in HOME prototypes,
subpage research/docs, lean checks and PR → main merge → existing automatic Pages Preview → minimal URL smoke.
The user delegates visual judgment to their own Preview review. No Full Release Gate or next page implementation.

- **Default HOME preserved:** 04 restored ribbon and its common geometry untouched; no Depth Queue/hold/mask/
  afterimage/magnet. Hero/Haegeum/SOUND, 05 object inputs and 06 2026.09.22 `<풀고, 엮다>` retain baseline owners.
- **Implemented opt-in / selection pending:** straight vs Hanji 07 photo reveal, both exact suit→hanbok endpoints,
  completed-photo viewing window and latest compact profile; 03/06 weak Scene Magnet on/off. Current role is
  국립부산국악원 기악단 단원. The earlier 68% default is not a candidate endpoint. No factual error was found in
  current V2 role copy; Classic and historical reports were not edited.
- **Comparison entry:** local collapsed `개발 비교`; public `?dev=1`. Ordinary public URL has no panel/new effects.
  `?dev=0` or exit restores baseline, including effect/resource cleanup. Legacy compare/all links remain available.
  Query-only choices keep audio identity/time and locale/hash/unrelated parameters. Heavy modules are lazy.
- **Public comparisons:** [Hanji](https://cij5484.github.io/cho-youn-kyoung-v2/?dev=1&portrait=hanji&magnet=on),
  [Straight](https://cij5484.github.io/cho-youn-kyoung-v2/?dev=1&portrait=straight&magnet=on).
  Use Korean 03/06/07 jump controls; toggle automatic alignment independently. [Baseline](https://cij5484.github.io/cho-youn-kyoung-v2/?dev=0).
- **Research complete / pages not implemented:** three new verified references; current router/catalog boundary,
  page-specific plans and native-first future list/detail transition recommendation. Single evidence/result owner:
  [Experience Prototype Research](docs/redesign/review/EXPERIENCE-PROTOTYPE-RESEARCH.md). ABOUT remains a fixture.
- **Pending user decisions:** straight vs Hanji, 07 profile/crop quality, 03/06 magnet feel/adoption. Technical success
  is not QUALITY APPROVED or permission to change defaults. Physical phone/native Safari/Retina remain unverified.
- **Recommended next bounded task after selection:** WORKS — Dual Archive + Functional Index Prototype, separate
  from HOME 04. No automatic continuation.

**FUTURE / Edition Gate:** only after all V2 HOME/subpages are complete, separately design one-domain two Editions.
Classic retains its independent repository/code/CSS/dependencies/build; never mix it into V2. Actual paths,
deployment and search handling are decided then. No Classic research, gate code, domain/DNS/CNAME or SEO changes here.

Delivery uses the existing main-push Fast + Preview workflow. The delivering PR records the exact merged SHA,
Fast/Pages outcome and public smoke; §7 of the research records local lean checks. End at REPORT / STOP.

## Previous HOME cinematic continuity / depth pass — 2026-09-08 (PR #10 / #11 delivered)

The user authorized the previous interaction pass's delivery as a prerequisite: [PR #9](https://github.com/cij5484/cho-youn-kyoung-v2/pull/9)
merged as `d98aaa6`; Fast CI and automatic Pages Preview run `34190400938` succeeded. Latest main was pulled
before this pass, and the actual 4180 runtime/code was inspected. The cinematic pass was delivered by [PR #10](https://github.com/cij5484/cho-youn-kyoung-v2/pull/10) as
`e7a9473`. The user then preferred the previous 04 composition and requested a selective restoration on
`codex/restore-selected-works`: 04 returns to `d98aaa6` Desktop/Mobile ribbon geometry and timing; the Depth Queue,
added holds/clips and Works→Album plane afterimage are removed. Album Light Memory, Album→Stage light, Stage Date
Geometry, dual-portrait threshold/depth, Artist→Outro edge, selective later two-point cues and Outro resolution remain.
Shared files are patched by owning behavior, never restored wholesale. Further Works refinement needs a separate visual pass.

[Current result](HOME-CINEMATIC-CONTINUITY-RESULT.md) records checks, source limitations and delivery procedure.
Before the selective 04 restoration, fixed-source Chromium/WebKit HOME: **89 passed, one CDP-platform skip**; type-check/lint/root/Preview builds
and four light contracts pass. The idle-loop probe additionally passed six repeated browser runs. Restoration checks: **81 HOME passes / one existing platform skip**, type-check/lint/root/Preview build PASS;
64 Chromium/WebKit geometry comparisons against the original 320/390/768/1440 ribbon match. See the result.
HOME/Motion own actual choreography; the glossary describes 61 terms. Portraits, poster, audio, Hero/Haegeum and
Navigation behavior remain the current sources/contracts. No new scene, real 3D subsystem or detail route was added.
Silhouette-based Occlusion Typography and Scroll Velocity Response were not adopted. Stable identity attributes
prepare future detail handoffs without implementing them. Physical phones/native Safari/Retina remain separate QA.

The current explicit instruction authorizes targeted validation → PR/main merge → automatic Preview deployment →
public-URL smoke → REPORT/STOP. Full Release Gate is excluded; earlier unresolved Linux WebKit Release evidence
is preserved. **IMPLEMENTED / REVIEW READY** does not mean user-granted QUALITY APPROVED. No next task starts
automatically. Exact merged SHA and workflow outcome are attached to the delivering PR and final response.

## Previous HOME interaction pass — 2026-09-08 (subsequently delivered by PR #9)

Main `0f7620a` delivered the prior local work through PR #8. The current branch `codex/home-interaction-pass`
implements the latest explicitly authorized SOUND alignment, mobile scroll-driven Works, touch Album rotation,
09/22 Stage Aperture and shared suit/hanbok Artist seam. [Result](HOME-INTERACTION-PASS-RESULT.md) records files,
validation and asset limits. Type-check/lint/build/Preview build pass; targeted HOME Chromium/WebKit: 57 passed,
one Chromium-CDP-only test skipped on WebKit. Physical phones/native Safari remain unverified for these changes.
Current state: **IMPLEMENTED / LOCALLY VERIFIED / REVIEW READY / STOP**. Localhost 4180 is ready for user review.
No commit/push/merge/deploy in this bundle. Hero/Haegeum and Navigation behavior remain approved and unchanged.
The latest user instruction permits the specified minimum validation; the completed PR #8 no-validation exception
does not carry into this task. This section supersedes the historical runtime summaries below.

## Previous continuous closing-pair refinement — 2026-09-08

The latest explicit user request extends the same pair from 04 through the already implemented 05–08 scenes:
album pointer orbit → poster orbit → profile/name figure-eight → typographic depth and final exit.
Previous local rightward contraction, long headless Violet/Lacquer trails, album hover and reduced copy are preserved.
[Closing-pair result](HOME-CLOSING-ORBITS-RESULT.md) records this bounded task. The subsequent explicit mobile 04 fix
removes its early loop exit and adds a viewport-sized free image-grid path; see [mobile result](MOBILE-WORKS-ORBIT-RESULT.md). Local review only; no commit/push/deploy.
New visual judgment remains **REVIEW READY**, not self-granted QUALITY APPROVED. Report then STOP.

## Previous HOME refinement — 2026-09-08

User authorized the concrete requested fixes with “작업 시작해”. The baseline is main `83e80b1` (PR #5).
Rightward SOUND contraction, headless Violet/Lacquer 2-second trails, two-axis album pointer response and reduced
visible explanatory copy are implemented locally. [Result](HOME-REFINEMENT-20260908-RESULT.md) owns validation,
evidence and remaining review. No new scene, asset, dependency, public route, commit/push or deployment in this bundle.
Status: **IMPLEMENTED / LOCALLY VERIFIED / REVIEW READY / STOP**. User visual approval is still separate.
The September 7 unattended sprint/delivery exception below is historical and does not carry into this refinement.

## Historical HOME Visual Impact Sprint — 2026-09-07

The closing baseline merged through PR #4 / `7226dda`. The user then explicitly authorized the later-HOME Visual Impact
Sprint, including a full typographic composition refinement, minimum validation and
branch push → PR → required CI → merge to main, with a hard 21:30 KST stop. This task-specific authorization overrides
the earlier scene-by-scene approval pauses only for this sprint; it does not authorize another page or deployment.

- Current entry: `npm run dev:interaction` / http://127.0.0.1:4180/ . Hero→Haegeum→SOUND continues through a large curved
  Works ribbon and two-point orbit, spatial Album exchange, image-led dark Performance, responsive photographic Artist
  plate/Korean name and the closing English name/Sou.P. Smaller labels are consolidated into scene-specific groups.
- [HOME](docs/redesign/04-HOME.md) owns visual/content contracts; [Motion §49](docs/redesign/03-MOTION-SYSTEM.md#49-current-home-closing-motion-contract)
  owns the runtime boundaries. The previous moving-head refinement, B2 path, LONG460 and Violet are unchanged here.
- Source: three authentic 2026 album packages, two official performance posters and one portrait, all traceable/provisional.
  No generated documentary photography, full record migration, reviewed EN source, final Tray/GLB or other page was added.
- Basic entry has no comparison chrome. Existing upstream A/B choices survive only at `?compare=1`/`?all=a`; glyph study
  is explicit `?study=type`. No new A/B branches, screenshots or videos were made. Historical evidence is preserved.
- Local verification: `npm run test:home` **46 PASS** (HOME + upstream smoke, Chromium/WebKit, 320/390 reflow,
  reduced motion, image exposure, uninterrupted pose/rapid selection, point orbit/handoff, responsive light/photo,
  locale remount and adaptive navigation). The initial six failures were stale test assumptions about unexposed lazy
  images and the deliberately hidden desktop-only ledger; checks now exercise actual selection and explicitly verify
  all five mobile captions. Full was not rerun under this sprint's minimum-check instruction.
  **Fast PASS** includes type-check/lint, existing content/locale/SOUND/interaction contracts, production build and
  public artifact exclusion. A focused Canvas check also confirmed both depth layers paint, clear offscreen and hide
  under reduced motion. No screenshot/video/trace was generated; the live 4180 composition is the review surface.
  Final delivery outcome is recorded by this sprint's GitHub PR/checks and final report, not inferred from a successful build.
- New scene composition is **IMPLEMENTED**, not self-declared QUALITY APPROVED. Native Safari/phones, final visual/copy
  review, higher-resolution Hero originals and future actual stage photography remain follow-ups. No deployment.

The entries below preserve phase-specific historical approval and evidence. They do not supersede this current receipt.

- Planning direction and the user's nine revisions are incorporated.
- P0A skeleton and P0B local routing spike were individually approved and completed.
- P0C real GitHub Pages deployment/routing verification: COMPLETE; Linux Chromium 42/42 and Windows Edge 42/42 passed.
- Prerender architecture: APPROVE — React Router Framework + ssr:false + explicit prerender + deterministic static artifact placement.
- V2 public repository: cij5484/cho-youn-kyoung-v2. Original P0C deployment SHA: 137b3420fda15b9670e109989da54230d959966e. Latest verified preview SHA: ea146f629cc2f0de89ed540b0b0747757f4a8011 (P0E).
- P0D locale/metadata contract: COMPLETE; local proof below, CI/live integration also passed in P0E. 18 KO/EN fixtures per base, 80 browser + 8 locale + 3 placement tests passed. See [contract](docs/redesign/review/LOCALE-METADATA-CONTRACT.md) and [result](P0D-RESULT.md).
- P0E CI/delivery: COMPLETE; Fast run 33960545431 and Full/deploy/live run 33960594951 passed (Linux browser 80/80, real Pages 52/52). Results are recorded in [P0E result](P0E-RESULT.md). P0F documentation is now approved as canonical; actual product pages: NOT STARTED. Authored translation/content, final SEO, audio/mobile and 3D gates remain pending.
- After the P0D report, the user authorized PR publication and merge, with no additional validation. P0D merged via PR #1 / cb7605f; its historical run 33958333876 succeeded. P0E supersedes automatic-main-push deployment with explicit SHA-bound delivery.
- Existing production repository/domain unchanged. See [P0C result](P0C-RESULT.md) and [architecture decision](docs/redesign/review/ROUTING-ARCHITECTURE-DECISION.md).
- Design/function requirements remain; the ZIP preserves the historical baseline.
- Checklist boxes stay unchecked until actual implementation/validation evidence exists. Document coverage lives in [HANDOFF audit](docs/redesign/review/HANDOFF-AUDIT.md).
- HOME V2.1 documentation revision: COMPLETE; existing HOME requirements retained and quality bar raised. That HOME documentation task performed no HOME/React/CSS, image manipulation/migration, motion/3D, dependency, deployment or P0E work. Approved documents were later committed separately as bb8460e. Asset suitability and all HOME visual gates remain unverified.
- P0F — AGENTS.md / Project Knowledge Wiring: documentation implemented; document verification and scope are recorded in [P0F result](P0F-RESULT.md). Canonical/result APPROVED. A separate delivery-only instruction authorizes one logical commit, V2 main push and Fast CI confirmation; no deployment or next-phase implementation.
- P0F delivery confirmed: b3c12d8f9d2e89db7e2ad206e61c2dabf29d5c23 / Fast CI 33962909498 success, rechecked before P1A.
- P1A Content/Data Schema: IMPLEMENTED / locally VERIFIED / result APPROVED. [Contract](docs/redesign/review/CONTENT-SCHEMA-CONTRACT.md), [result](P1A-RESULT.md). Five neutral domains; data-only route adapter, no migration/template integration.
- User separately authorized minimal Asset Lifecycle Policy and P1A delivery: validate, logical commit, V2 main push, Fast CI confirmation and clean-tree check. AssetRecord.lifecycle distinguishes candidates from approved assets; no release consumer or real asset migration is implemented. The result/evidence records checks before this delivery commit; Git history and the matching Fast Actions run provide the post-push receipt.
- P1A + lifecycle delivery completed and user APPROVED: 159133c3fec42d2c9c09e900482aa3e137fcee07 / Fast CI 33965248251 SUCCESS. No new preview deployment.
- P1B — Single Album Source Audit: only 조윤경 해금산조 – 지영희류 was audited. [Audit](docs/redesign/review/album-audits/JI-YOUNG-HEE-SANJO-SOURCE-AUDIT.md) and [evidence](evidence/p1b/ji-young-hee-sanjo-source-audit.json) own the result. User confirmed 2026-09-08 release date, 떨기나무 Recording/Mixing/Mastering and artwork matching final print. Retailer differences remain traced; current release is upcoming as of 2026-09-05.
- P1B result: READY WITH NON-BLOCKING GAPS for limited KO record preparation, not public release approval. 15 provisional image candidates, 6 reachable audio URLs (partial HTTP proof only), 3D PARTIAL, full EN edition missing. Runtime/schema/assets and legacy were not modified; no migration or delivery performed by P1B.
- P1B audit delivery subsequently completed through PR #2 / `07661e5b6061c6a46f9c4205a7737d3ab4b92c81`; Fast CI 33966319721 succeeded. This receipt was checked in the preceding repository-health review; it does not authorize runtime migration or asset/publication approval.
- User explicitly authorized **P1C — Ji Young-hee Ryu Album KO Record Mapping Review** only, with STOP before P1D or production record registration. [Mapping review](docs/redesign/review/album-audits/JI-YOUNG-HEE-SANJO-KO-RECORD-MAPPING-REVIEW.md), [result](P1C-RESULT.md) and [evidence](evidence/p1c/ji-young-hee-sanjo-ko-mapping-review.json) own this unit. One document-only candidate maps confirmed facts, 6 tracks, 8 credits and one provisional cover reference; all editions/publication remain draft, no runtime asset/record or route is registered.
- P1C source boundary: printed track times are preserved in the review table and not asserted as measured `durationSeconds`; barcode and other unsupported optional facts remain in P1B. Summary/alt/role wording are review drafts. Existing date/떨기나무/final-print confirmations are not reopened. EN/audio/CD/3D/story inputs retain their separate downstream gates.
- P1C result is now explicitly APPROVED. Its original review/evidence remain the historical report, preserved in local commit `306d75758a3634396ed95313aa3a72952fc52203`; subsequently pushed during the P2A baseline gate below. Approval does not turn draft copy into authored/reviewed editions or approve public assets.
- Prior authorized bundle: **P1D — Ji Young-hee Ryu KO Draft Integration Bundle**. A: register one private KO draft in the real content layer; B: verify exclusion from public catalog/routes/prerender/metadata and emitted client data; C: minimally reconcile the addition workflow and enlarged task policy. Full validation and the user's 12-field report follow, then STOP. [P1D result/task card](P1D-RESULT.md) owns progress and evidence.
- P1D completed: [actual record](src/content/records/ji-young-hee-sanjo.server.ts) and [registry](src/content/registry.server.ts); [evidence](evidence/p1d/ji-young-hee-sanjo-ko-draft-integration.json). All fields retain P1C draft states. Both bases keep 18 neutral routes and the same 28 public files; draft KO/EN is HTTP/client 404 with no public metadata or client data. That P1D validation is preserved; the user subsequently approved its result and delivery below.
- P1D excluded other albums, public publication, full EN, Design System/HOME, 3D/Blender and next Phase. Its two local commits were then approved for the following baseline delivery gate.
- P2A baseline gate COMPLETE: clean approved P1C `306d757` / P1D `2b544d6` and 114 recorded hashes verified; V2 main pushed to `2b544d63a5079f15d1653ddb3ea59a8b4bb06ea0`; [Fast CI 34002461467](https://github.com/cij5484/cho-youn-kyoung-v2/actions/runs/34002461467) SUCCESS before implementation. No deployment.
- Prior bundle **P2A — Design System Foundation**: production CSS tokens/fonts/base/layout, isolated localhost Lab, desktop/mobile/accessibility and Full regression. [Foundation guide](docs/redesign/review/DESIGN-SYSTEM-FOUNDATION.md), [result](P2A-RESULT.md), [evidence](evidence/p2a/design-system-foundation.json). Local 34 Node checks, 84 route cases, 11 Lab cases, both builds and actionlint pass. User subsequently approved the visual result and delivery. Commit `771490731afd42f1be133685dbfe3d63ebf23568` is on V2 main; [Fast CI 34004955387](https://github.com/cij5484/cho-youn-kyoung-v2/actions/runs/34004955387) SUCCESS. Original result/evidence remain historical.
- Historical P2A scope boundary: no HOME Hero/portrait/Haegeum/Selected Works/final templates, navigation choreography, content migration, audio/3D/Blender, production domain/deploy or automatic P2B. Enlarged 2–3 related-subtask policy remains unchanged. P2B was separately authorized after P2A approval.
- Prior P2B report **Editorial Navigation Prototype**: desktop editorial→compact continuity, independent mobile dialog and P0D semantic locale links in a development-only Lab. [Guide](docs/redesign/review/EDITORIAL-NAVIGATION-PROTOTYPE.md), [result/task card](P2B-RESULT.md), [evidence](evidence/p2b/navigation-prototype.json). At that first review P2B was a local diff; production root/routes/content and dependencies remained unchanged. 38 Node checks, 84 static route cases, 11 P2A Lab cases and 17 navigation cases pass.
- User correction: initial state is artist name + MENU. Initial vertical links and their scroll morph are canceled. First **P2B Refinement — Editorial Menu Reveal** keeps these two elements across widths and adds trigger/item feedback, reversible 420ms surface/hairline/mask reveal and mobile/reduced-motion behavior. [Historical refinement result](P2B-REFINEMENT-RESULT.md), [historical refinement evidence](evidence/p2b-refinement/menu-reveal.json). Original P2B result/evidence are historical.
- Historical consolidated P2B review: **Letter Slip Integration** removes selected/hover underlines, emphasizes active type/index, adds deterministic per-character hover and refined trigger geometry, and compares Refined 480ms top-down reveal with Bold 500ms MENU-side angled surface and stronger Letter Slip; both dismiss in 400ms. That review used a Bold-default Refined/Bold comparison. [Historical result](P2B-LETTER-SLIP-RESULT.md), [historical evidence](evidence/p2b-letter-slip/navigation.json). BOLD/CURATED/PURPOSEFUL and active reference adoption are documented in AGENTS/MASTER/Design/Motion/HOME. WORKS/PERFORMANCES, image vocabulary and shared detail motion are documented only. 38 Node + 84 route + 11 foundation + 35 navigation cases; no new dependencies or production code entry.
- User subsequently visually approved **BOLD VERSION** as the canonical production direction and froze P2B: **QUALITY APPROVED FOR HERO INTEGRATION**. Letter Slip X +3px / Y ±7px / 300ms / 20ms stagger; MENU/CLOSE mask; MENU-origin diagonal Ivory reveal 500ms / reverse close 400ms; selected underline absent, index emphasis retained, no hover-open, reduced motion retained. Preserve these values until real Hero review warrants tuning within Bold. Refined survives only as immutable Lab/evidence; runtime prop/presets/CSS branches and Lab selection were removed.
- Completed **P2B Canonical Bold Freeze & Delivery**: 38 Node + 84 route + 11 foundation + 26 navigation cases pass locally; nine Refined-only duplicate cases were retired after the single-direction approval. [Freeze result](P2B-FREEZE-RESULT.md), [freeze evidence](evidence/p2b-freeze/navigation-freeze.json). User authorized commit → main push → exact-SHA Fast CI → clean-tree check. Final delivery report/GitHub run own the post-push receipt. No deployment. Safari real-device QA and final HOME composition are still open; scoped quality approval does not close those gates.
- P2B was delivered in logical commits `e96bad5`, `7d07291`, `d81bdbe0e18310abdd6c89f90682afde9716217d`; [Fast CI 34015866401](https://github.com/cij5484/cho-youn-kyoung-v2/actions/runs/34015866401) SUCCESS, remote main matched local HEAD and the tree was clean. No deployment. Original freeze result/evidence remain the pre-commit source record.
- User subsequently approved P2B and authorized only **P2C — HOME Hero & Bold Navigation Visual Prototype Bundle**. The first 35-source audit paused for the exact purple set; its [historical checkpoint](P2C-ASSET-READINESS-RESULT.md) and original evidence remain unchanged. The user then supplied seven authentic PNGs and explicitly confirmed **attachment 3 → 7** for initial/first-scroll. [Current source audit](docs/redesign/review/HOME-HERO-ASSET-READINESS.md) records dimensions, crop/mask limits, unchanged source hashes and separate WebP derivatives.
- The user subsequently approved P2C and selected **B — Bold Cropped** as HOME Hero canonical direction. A/C remain immutable comparison evidence, with no runtime chooser. This approval separately authorized **P2D — Bold Cropped Hero Refinement & Device QA Bundle** only.
- P2D puts the reusable single B module in `src/hero`, mounted only by `labs/hero`; tunes typography/crop/intersections/two lines and dedicated 390/320px composition; preserves frozen P2B; adds stable-viewport scroll, closed-frame forward/reverse exchange, late-image protection and no idle RAF. Further audit of 42 supplied retouched PNGs found no larger source; keep confirmed 3→7. [P2D result](P2D-RESULT.md), [guide](docs/redesign/review/HOME-HERO-VISUAL-PROTOTYPE.md), [evidence](evidence/p2d/README.md).
- Historical P2D review checkpoint: **REVIEW READY / STOP**. Full: 38 Node + 84 route + 11 foundation + 26 navigation + 44 Hero cases (22 Chromium / 22 WebKit). Actual Mac Safari initial/menu/scroll/reverse smoke observations are separate from engine automation. Final visual/source quality, physical iPhone/Android/VoiceOver/thermal QA and broader HOME entrance remain open. No public HOME, next scene, Haegeum transition, content migration, 3D, commit/push/deploy or automatic next task.

- Current user approval: Composition **APPROVED**; Bold Cropped visual direction **APPROVED**; motion / interaction **LOCALLY VERIFIED**; portrait assets **PROVISIONAL**; final Retina quality **PENDING HIGH-RES SOURCE**. The current approximately 1024×1536 pair does not block subsequent authorized HOME work. When larger originals of attachments 3 and 7 arrive, replace their asset references and repeat Hero Retina QA. Physical-mobile and final HOME QA remain separate. The authorized sequence was P2D delivery followed only by P2E Hero→Haegeum prototype; both scoped operations are now complete. P2E direction is approved and delivered (`0873b75` / `c73a3be`, Fast CI 34029859649 SUCCESS, clean main before P2F). P2F is now user QUALITY APPROVED / FROZEN. P2F closeout is delivered as `b5c6aa0` / Fast CI 34032488461 SUCCESS. P2G result is approved; P2H SOUND refinement is REVIEW READY / FREEZE CANDIDATE / STOP. Auditory/refined visual approval is required; no next scene is authorized.

- P2D delivery completed: `d758ee1`, [Fast CI](https://github.com/cij5484/cho-youn-kyoung-v2/actions/runs/34026552008) SUCCESS; all 87 committed files and clean starting tree recorded in [receipt](evidence/p2e/delivery-p2d.json).
- P2E completed only the Hero→Haegeum boundary/four-stage prototype. Full: 38 Node + 191 browser (84 routes, 11 foundation, 26 frozen navigation, 44 Hero, 26 Haegeum). [Guide](docs/redesign/review/HOME-HAEGEUM-TRANSITION-PROTOTYPE.md), [result](P2E-RESULT.md), [evidence](evidence/p2e/README.md). User confirmed the supplied beige image is AI generated; use is labelled provisional editorial, not documentary/geometry evidence. No SOUND or next scene. Historical P2E report/evidence are preserved; the user subsequently approved the direction and authorized delivery followed only by P2F.

<a id="knowledge-status"></a>

## Knowledge and execution status vocabulary

| Status | Meaning |
|---|---|
| APPROVED | User accepted the named direction/contract or result; say which. It does not authorize all implementation/delivery |
| IMPLEMENTED | The named code or documentation exists; this alone is not proof that it passed checks |
| VERIFIED | Identified checks passed for a named revision/environment and scope; cite evidence, distinguish historical from rerun |
| QUALITY APPROVED | Applicable visual/physical/input/mobile/performance/fallback gates and user quality review passed; Functional Complete is insufficient |
| FUTURE EXPERIMENT | Preserved investigation with no implementation/adoption claim; priority is a separate attribute |
| OPTIONAL | Not required within the stated scope; it still needs task approval and is not permission to discard a high-priority roadmap item |
| BLOCKING | An unmet condition prevents a named downstream gate, not all unrelated work |

| Subject | Current state / exact boundary |
|---|---|
| React Router + Static Prerender / locale metadata | APPROVED / IMPLEMENTED / VERIFIED for neutral fixtures through P0C/P0D/P0E; full product SEO/content is not complete |
| P0E CI/delivery | APPROVED / IMPLEMENTED / VERIFIED; historical actual run evidence in P0E result |
| HOME V2.1 | APPROVED DESIGN DIRECTION / NOT YET IMPLEMENTED / NOT QUALITY APPROVED |
| P0F knowledge wiring | APPROVED canonical / IMPLEMENTED / VERIFIED; delivery completed |
| P1A content schema | Result + lifecycle delivery APPROVED / IMPLEMENTED / VERIFIED with neutral fixtures; template integration and migration pending |
| P1B single-album source audit | Audit delivered via PR #2; core date/credit/final-print facts user confirmed; limited KO preparation READY WITH NON-BLOCKING GAPS; no actual record or asset migration |
| P1C Ji Young-hee Ryu KO mapping review | Result APPROVED; 306d757 delivered to main; original source/evidence preserved; no authored-copy or asset publication approval |
| P1D KO Draft Integration Bundle | Result APPROVED / IMPLEMENTED / VERIFIED; 2b544d6 delivered, Fast CI 34002461467 success; one private draft remains excluded |
| P2A Design System Foundation | Visual/result APPROVED; 7714907 delivered to V2 main; Fast CI 34004955387 success; no deployment |
| P2B canonical Bold navigation | User visually APPROVED / IMPLEMENTED / VERIFIED LOCALLY / **QUALITY APPROVED FOR HERO INTEGRATION / FROZEN**; one Bold runtime, archived Refined evidence, 500ms entry / 400ms exit; `d81bdbe` delivered to main, Fast CI 34015866401 SUCCESS; Safari real-device and final HOME QA remain open; P2B delivery did not implement HOME/P2C or deploy |
| P2C Hero & Bold Navigation prototype | User approved result and selected **B — Bold Cropped** as canonical; 3→7 pair retained; A/C comparison evidence only; delivered with P2D `d758ee1` |
| P2D Bold Cropped refinement / device QA | Composition **APPROVED**; Bold Cropped visual direction **APPROVED**; motion / interaction **LOCALLY VERIFIED**; portrait assets **PROVISIONAL**; final Retina quality **PENDING HIGH-RES SOURCE**. Delivered `d758ee10aceaa5fc037c82e4d3fdb108068aecea`; Fast CI 34026552008 SUCCESS, clean main/origin baseline before P2E. Public HOME remains unimplemented. |
| P2E Hero → Haegeum | **VISUAL DIRECTION APPROVED / DELIVERED**; one 155svh timeline, 26 Chromium/WebKit cases, static four-stage fallback. Real-photo macros provisional; final beige image is disclosed user-confirmed AI reference, not documentary. Delivered feature `0873b75` and CI `c73a3be`; Fast CI 34029859649 SUCCESS; no deployment. |
| P2F Hero → Haegeum refinement | **QUALITY APPROVED / FROZEN**, explicitly approved by the user. Same 155svh sequence, independent mobile and source replacement contract. Full 38 Node +197 browser previously passed. Native Safari motion/focus/reduced settlement remains unverified future QA; no claim of phone, VoiceOver or thermal verification. Provisional portrait/macro/full sources and Retina QA are non-blocking. Delivered `b5c6aa0` to main; exact-SHA Fast CI 34032488461 SUCCESS and clean main/origin were verified before SOUND. |
| P2G Full → HOME Sound | Result **APPROVED**; SOUND remains **REVIEW READY**, Lab only. Retained Han Beom-su Ryu Jungjungmori 02:46–03:04 / 18s. Preserved as logical commit `dab4617`; historical [result](P2G-RESULT.md) and [evidence](evidence/p2g/README.md) unchanged. |
| P2H Sound refinement / device QA | **IMPLEMENTED / LOCALLY VERIFIED / REVIEW READY / FREEZE CANDIDATE / STOP**. Friction-density response, continuous damping/resume, buffered replay, 320px caption and native Safari focus/type-mask fixes. Full 38 Node +255 browser, including 58 Sound. Native Safari playback/pause/end/replay/focus partially verified; Mac locked before remaining native checks. Physical phones/AT/thermal remain future. User auditory/refined visual judgment is pending; no self-granted quality freeze. [Result](P2H-RESULT.md), [guide](docs/redesign/review/HOME-SOUND-EXPERIENCE.md), [evidence](evidence/p2h/README.md). |
| P2I Bow Contact Choreography | **QUALITY APPROVED / FROZEN** — user-selected B2 Bold / LONG 460ms / Electric Violet #6334E5. Strings vibrate; bow flows. Comparison UI is Lab-only. At P2I closeout Full failed on the pre-existing foundation Lab CLS; P2J below resolves that owner and repairs explicit capability/harness coverage. No deployment/next scene. [Contract](docs/redesign/review/SOUND-BOW-CONTACT-COMPARISON.md), [closeout result](P2I-CLOSEOUT-RESULT.md), [historical comparison](P2I-CHOREOGRAPHY-RESULT.md). |
| P2J CLS / scalable responsive bow | **IMPLEMENTED / VERIFIED / RESPONSE REVIEW READY / STOP**. Prior SOUND visual freeze retained; Lab CLS fixed, shared engine/features/preset and 18s hybrid proof. Full PASS: 56 unique Node +285 browser, zero skip/flaky, explicit Windows capability limits. Native-device/new-response auditory acceptance remains separate. [Result](P2J-RESULT.md), [evidence](evidence/p2j/README.md). |
| P2K interaction prototypes | **Current refinement: IMPLEMENTED / VERIFIED LOCALLY / REVIEW READY / STOP**. Requested minimum checks PASS: type-check/lint/build, interaction contracts 13 and browser 24, locale/content/SOUND contract sanity. The original revision had Full PASS (65 unique Node +307 browser); it is historical, not a new Full claim. Three user-authorized comparisons in an isolated Lab. Existing P2F/P2I freezes retained; new spatial points, secondary Janggu and glyph cascade require user visual selection. [Owner](docs/redesign/review/P2K-INTERACTION-PROTOTYPES.md), [result](P2K-RESULT.md), [evidence](evidence/p2k/README.md). |
| Blender Capability Spike | REQUIRED BEFORE RELEVANT 3D PRODUCTION / NOT EXECUTED; Blender adoption undecided; Motion §47 owns acceptance |
| CD Tray Lab | MANDATORY / NOT IMPLEMENTED / BLOCKING Album Detail package Quality Approved until its gate passes |
| Haegeum 3D master | FUTURE EXPERIMENT / HIGH PRIORITY / NOT IMPLEMENTED; NOT BLOCKING first release, not disposable optional decoration; Motion §48 |
| Production domain / real-device product QA | Not performed by P0F; remain separately approved release/owner gates |

The required action is the Blender investigation, not mandatory Blender adoption. Its own capability APPROVE
would not Quality Approve an object. Haegeum 3D is distinct from the existing HOME Haegeum scene and Secret.
Long-term experiments stay inside the PHASE 0–14 planning framework; no unapproved Phase 15 or game architecture.

# 27. FINAL HANDOFF RULE

The implementation goal is not:

**“Rebuild the old site with better visuals.”**

The implementation goal is:

**“Build a new, contemporary, high-quality artist website that uses only the legacy information and assets that still deserve to survive.”**


P2F current evidence: [result](P2F-RESULT.md), [visual index](evidence/p2f/README.md),
[verification](evidence/p2f/verification.json), [native Safari coverage](evidence/p2f/safari-device-qa.md).
Historical completed bundle: **P2H — SOUND Refinement, Native Safari / Device QA & Freeze Bundle**. P2G result is approved and preserved as `dab4617`; its historical uncommitted wording describes its original report revision. P2G `dab4617` and P2H `7e1bd3745e601dcad4c37d0aa54038bf462f4be4` are delivered to main; exact-SHA [Fast CI 34056689232](https://github.com/cij5484/cho-youn-kyoung-v2/actions/runs/34056689232) SUCCESS, with clean main/origin verified before this documentation receipt. [Delivery receipt / files](evidence/p2h/delivery.json). SOUND remains **REVIEW READY / FREEZE CANDIDATE**, pending final auditory/refined visual judgment. Actual Safari playback/pause/end/replay/keyboard focus were observed; Mac locking left resume settlement, menu/reverse and native reduced motion incomplete. Automated WebKit and physical device QA are distinct. Recommended only after review: SOUND auditory/native-device closeout and freeze decision. No WORKS or following HOME scene is authorized. [P2H result](P2H-RESULT.md), [evidence](evidence/p2h/README.md).


Historical completed bundle: **P2I Closeout — QA Gap Classification, Visual Freeze & Delivery**.
The user approved **B2 Bold / LONG 460ms / Electric Violet #6334E5** as production direction.
**SOUND QUALITY APPROVED / FROZEN**: smooth trajectory/velocity, intentional recent-path trail, vibrating strings
separate from flowing bow, verified real-media interaction, no confirmed blocking P2I/Safari regression.
[Closeout result](P2I-CLOSEOUT-RESULT.md), [QA classification](evidence/p2i-closeout/README.md),
[canonical SOUND contract](docs/redesign/review/SOUND-BOW-CONTACT-COMPARISON.md).

At P2I closeout Full remained **FAIL**: Windows foundation Lab font-wrap CLS was pre-existing and excluded from
public output. Windows WebKit AudioContext absence and media interception mismatch do not establish native
Safari product failures; actual HTTP404/timeout/cancel checks work. Native P2I motion, full native Safari lifecycle,
physical phones, VoiceOver/TalkBack, Retina and thermal QA remain explicit non-blocking future evidence.
Any confirmed Safari product regression reopens the affected owner. Deployment still needs Full + exact-SHA approval.

The canonical integration API has no visual-mode props; `/` in the SOUND Lab previews B2 without comparison UI.
A/B1/other colors remain explicit development comparisons and archived evidence. Public HOME is unimplemented.
MASTER §2 owns artist recognition/brand/promotion/credibility purpose; §3.1 owns the eight experience principles.
[Glossary](docs/redesign/INTERACTION-GLOSSARY.md) is a human reference, not agent instructions.
Historical [original result](P2I-RESULT.md) and [choreography result](P2I-CHOREOGRAPHY-RESULT.md) are preserved.

Delivery complete: implementation `b86fb4eff88579744ebe3ded31cca55d98d20a91` pushed to V2 main;
[Fast CI 34081883375](https://github.com/cij5484/cho-youn-kyoung-v2/actions/runs/34081883375) SUCCESS.
Clean main/origin verified before the documentation receipt. [Delivery / files](evidence/p2i-closeout/delivery.json).
The receipt is a separate documentation commit; final main/Fast status is reported after its push. No deployment. That report recommended foundation
font-loading/CLS owner closeout; the separately authorized P2J below completes it. **STOP; no WORKS or next HOME scene is authorized.**

## Current P2J handoff — one completed bundle / STOP

The user approved P2I closeout and authorized only foundation CLS closeout + scalable feature-driven bow +
higher sensitivity. SOUND's B2 Bold / LONG 460ms / Electric Violet **QUALITY APPROVED / FROZEN** is retained.
P2J's new responsiveness is **IMPLEMENTED / VERIFIED / REVIEW READY**; it does not self-grant auditory approval.
[24-field result](P2J-RESULT.md), [current evidence](evidence/p2j/README.md),
[verification](evidence/p2j/verification.json), [canonical engine/data/tuning owner](docs/redesign/review/SOUND-BOW-CONTACT-COMPARISON.md).

- Foundation Lab masthead grid removes the actual row-wrap cause: delayed 390px CLS .160021 → .000447,
  three repetitions. Original .1 threshold/1200ms font stimulus/100ms observation are unchanged.
- Shared engine + validated 25Hz/6,713-byte per-track feature data + HOME_SIGNATURE; onset/flux/energy/phrase
  control smooth acceleration/range/turns. Pitch disabled. Same source, no timestamp script or genre fork.
- **Full PASS: 56 unique Node contracts + 285 browser cases**; type/lint, root/project builds and all six browser
  suites passed, zero skip/flaky. Test capability/fault/readiness fixes are explicit, not native Safari evidence.
- Windows WebKit's missing AudioContext and native link-tabbing policy remain coverage limits; actual playback,
  static fallback, HTTP faults and application focus-trap boundaries are verified. Supported analysis assertions
  remain. No frozen Hero/Haegeum/navigation product files changed.
- New response: average sweep about 1.40× B2, 32→45 vertical turns in the recorded first 10s. Callback p95 .6ms,
  no sampled listening CLS/long tasks; idle/settled/offscreen rAF 0. Videos are silent normal-speed screen captures.
- Native Safari new response/full lifecycle, physical phones, assistive technology, Retina and sustained thermal QA
  remain separate future evidence. Musical preference still needs user listening; mixed features are not bow tracking.

Delivery complete: implementation `e2456dd240ed0f4e4df54b536eda7e6a6727a55e` pushed to V2 main;
[Fast CI 34085930019](https://github.com/cij5484/cho-youn-kyoung-v2/actions/runs/34085930019) SUCCESS.
[Receipt / committed files](evidence/p2j/delivery.json) records clean main/origin before this documentation follow-up.
Its final SHA/CI is reported after push; no implementation changed after delivery and no deployment occurred.
Recommended only after review: one SOUND response acceptance/native Safari/mobile QA closeout bundle.
**STOP → USER APPROVAL. No WORKS, following HOME scene, Album migration or next Phase.**


## Current P2K handoff — one prototype bundle / STOP

Latest user scope: **Spatial Two-Point Motif + Janggu Reactive Marker + Premium Typography Transition**.
Existing P2F/P2I A references remain frozen. New B candidates do not become QUALITY APPROVED/FROZEN/final
canonical without visual selection. P2J HOME_SIGNATURE response stays separate from the prior visual approval.
[Single owner](docs/redesign/review/P2K-INTERACTION-PROTOTYPES.md), [27-field result](P2K-RESULT.md),
[normal-speed A/B videos and verification](evidence/p2k/README.md).

- Separate development Lab on 4180, no public HOME or next scene. All-A and independently selectable B modes.
- Bronze spatial points with perspective/glyph masks, actual-photo authored spans and disclosed AI full fit,
  then continuous horizontal SOUND sweep. Fixed-line A still uses its original continuation.
- Smaller Janggu orbit/compact history, upward-only accents; three unapproved red-brown candidates. Current
  mixed-source detector already covers the user's approximate 0s, 3–4s, 9s and 14–15s '탁' regions. Remaining
  candidate identity/onset precision and musical preference stay open; no manually authored cue playback.
- Shared DOM glyph/masked cascade, current-state interruption and reduced-motion fallback. The real native
  media, semantic action labels, route cleanup and frozen default behavior remain the original owners.
- New tuning has one home in src/interaction-prototype; permanent hover questions live in Motion §38,
  reference adoption in MASTER §6, and the human glossary has 50 terms. No duplicate principle document.
- Physical phones, native Safari new motion, assistive technology, Retina originals and sustained thermal QA
  are not proven by Playwright/mobile emulation. Source authenticity statuses remain unchanged.

This task authorizes local prototype review, not main push, PR/merge, deployment or the following Scene.
Recommended next step: user A/B/color/typography review; then one separately approved refinement/closeout task.
**REPORT → STOP → USER APPROVAL.**


### Latest P2K refinement receipt — current code, not historical captures

The user requested current-runtime refinement and then continuous Janggu trail quality. HOME now has a .65px head,
1800ms Bronze trail, depth in width/opacity, and continued along-string movement at lock. Janggu uses Lacquer
#A33D36 /620ms, calm idle versus smoothly accelerated playing orbit; Violet B2/LONG is unchanged. The renderer
stores every Janggu rAF position, subdivides rapid spans and fills joined gradient ribbons. Shared normal/edge math
was extracted from the approved bow without changing its calculation or tuning. Shared-glyph transitions now use
stationary vertical masks, 480ms/32ms cascade and a delayed incoming phase.

The detector requires coincident bass/body evidence plus noisy attack: 13 candidates/10 active, previously 16/14.
All four approximate user-confirmed regions remain covered; lower candidate count is not verified instrument accuracy.
Old rounded-segment rendering, per-sample Janggu cadence, head-depth scale, stale tuning/selectors and moving glyph
clip animation were removed. Existing, used Lab A/B controls remain development-only; removed UI was not restored.

Type-check/lint/build PASS; interaction contracts 13 PASS, Chromium/WebKit smoke 24 PASS; locale, content and existing
SOUND contracts PASS. No new Full/physical-device/Safari quality claim, screenshot/video, commit, push or deploy.
[Owner](docs/redesign/review/P2K-INTERACTION-PROTOTYPES.md) holds current values. Prior P2K videos/performance figures
remain immutable historical evidence and do not depict this refinement. Preview: http://127.0.0.1:4180/ .
This refinement was subsequently delivered by PR #3 (`e01aad8`). The current HOME closing authorization and state are
recorded at the start of §26; this receipt's minimum checks remain historical to the P2K revision.
