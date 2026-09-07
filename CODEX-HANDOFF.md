# CHO YOUN KYOUNG WEBSITE V2
## CODEX HANDOFF

**Status:** P2A visually APPROVED and delivered to V2 main; P2B Bold QUALITY APPROVED FOR HERO INTEGRATION / FROZEN and delivered; P2C B — Bold Cropped canonical direction APPROVED; P2D APPROVED & DELIVERED with provisional portraits; P2E VISUAL DIRECTION APPROVED & DELIVERED; P2F QUALITY APPROVED / FROZEN; P2F DELIVERED; P2G result APPROVED; P2H baseline preserved; P2I SOUND QUALITY APPROVED / FROZEN · B2 / LONG 460ms / Electric Violet · Full FAIL (classified non-blocking for SOUND freeze) / STOP\
**Revision:** 1.25 / 2026-09-07 — P2I visual freeze, QA gap classification and authorized delivery\
**Purpose:** Prevent planning loss, silent assumptions, and legacy regression.

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
[ ] PLAN → 4–6 TIGHTLY RELATED SUBTASKS → FULL VALIDATION → REPORT → STOP → USER APPROVAL
[ ] Each task has one goal, limited impact/file scope, immediate validation and easy rollback
[ ] PHASE 0 uses individually approved P0A–F; no automatic next unit
[ ] 3D geometry/materials/camera/lighting/drag/inertia/open/tray/disc/transition are separate reviewed units
[ ] Every task reports user-requested result fields (seven by default) and then stops
[ ] No multiple phases/pages/full HOME/several 3D subsystems in one automatic implementation run

# 25. IMPLEMENTATION CHUNKING / STOP RULE

Mandatory sequence:
PLAN → 4–6 TIGHTLY RELATED SUBTASKS → FULL VALIDATION → REPORT → STOP → USER APPROVAL.

Latest user revision 2026-09-06: enlarge the previous bundle about 2×. One approved coherent bundle may contain
4–6 tightly related subtasks, targeting a fully verifiable result in roughly 120–180
minutes. This is a planning target, not mandatory elapsed time or a reason to omit checks. No new approval is
needed between already-authorized subtasks. Architecture changes retain a separate approval gate; major 3D stays smaller. Unexpected complexity or a direction decision requires STOP. User visual approval gates the next major scene. Do not mix unrelated subsystems or visual design/3D/content migration.
Full validation covers the complete bundle and its applicable Fast/Full gates. Other Phase/3D owner boundaries remain.

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
| P2I Bow Contact Choreography | **QUALITY APPROVED / FROZEN** — user-selected B2 Bold / LONG 460ms / Electric Violet #6334E5. Strings vibrate; bow flows. Comparison UI is Lab-only. Full remains FAIL on a proven pre-existing foundation Lab CLS; Windows WebKit capability/harness gaps are non-blocking for SOUND freeze. No deployment/next scene. [Contract](docs/redesign/review/SOUND-BOW-CONTACT-COMPARISON.md), [closeout result](P2I-CLOSEOUT-RESULT.md), [historical comparison](P2I-CHOREOGRAPHY-RESULT.md). |
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


Current completed bundle: **P2I Closeout — QA Gap Classification, Visual Freeze & Delivery**.
The user approved **B2 Bold / LONG 460ms / Electric Violet #6334E5** as production direction.
**SOUND QUALITY APPROVED / FROZEN**: smooth trajectory/velocity, intentional recent-path trail, vibrating strings
separate from flowing bow, verified real-media interaction, no confirmed blocking P2I/Safari regression.
[Closeout result](P2I-CLOSEOUT-RESULT.md), [QA classification](evidence/p2i-closeout/README.md),
[canonical SOUND contract](docs/redesign/review/SOUND-BOW-CONTACT-COMPARISON.md).

Full remains **FAIL**, not green: Windows foundation Lab font-wrap CLS is pre-existing and excluded from current
public output. Windows WebKit AudioContext absence and media interception mismatch do not establish native
Safari product failures; actual HTTP404/timeout/cancel checks work. Native P2I motion, full native Safari lifecycle,
physical phones, VoiceOver/TalkBack, Retina and thermal QA remain explicit non-blocking future evidence.
Any confirmed Safari product regression reopens the affected owner. Deployment still needs Full + exact-SHA approval.

The canonical integration API has no visual-mode props; `/` in the SOUND Lab previews B2 without comparison UI.
A/B1/other colors remain explicit development comparisons and archived evidence. Public HOME is unimplemented.
MASTER §2 owns artist recognition/brand/promotion/credibility purpose; §3.1 owns the eight experience principles.
[Glossary](docs/redesign/INTERACTION-GLOSSARY.md) is a human reference, not agent instructions.
Historical [original result](P2I-RESULT.md) and [choreography result](P2I-CHOREOGRAPHY-RESULT.md) are preserved.

Delivery authorized: logical commit → V2 main push → exact-SHA Fast CI → clean working tree. The closeout report
and Git history record the outcome; push is not deployment. Recommended next bounded task is the foundation
font-loading/CLS owner closeout. **STOP; no WORKS or next HOME scene is authorized.**
