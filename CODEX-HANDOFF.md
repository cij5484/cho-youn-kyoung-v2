# CHO YOUN KYOUNG WEBSITE V2
## CODEX HANDOFF

**Status:** P0A–P0D complete (P0D local) — React Router + Static Prerender APPROVED; STOP before P0E\
**Revision:** 1.1 / 2026-09-05 user decisions 1–9 incorporated  
**Purpose:** Prevent planning loss, silent assumptions, and legacy regression.

---

# 1. REQUIRED READING ORDER

Before planning implementation, read ALL:

1. `00-MASTER-PLAN.md`
2. `01-CURRENT-SITE-AUDIT.md`
3. `02-DESIGN-SYSTEM.md`
4. `03-MOTION-SYSTEM.md`
5. `04-HOME.md`
6. `05-WORKS.md`
7. `06-ALBUMS.md`
8. `07-ALBUM-DETAIL.md`
9. `08-PERFORMANCES.md`
10. `09-PERFORMANCE-DETAIL.md`
11. `10-ABOUT-MEDIA-CONTACT.md`
12. `11-RESPONSIVE.md`
13. `12-PERFORMANCE.md`
14. `13-ACCESSIBILITY.md`
15. `14-MIGRATION-QA.md`

Do not implement from an isolated task prompt without this context.

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

[ ] Transforming Editorial Navigation  
[ ] CHO / YOUN / KYOUNG oversized Hero  
[ ] Asymmetric portrait  
[ ] Only 1–2 precise text/portrait depth crossings  
[ ] Hero starts side/back portrait  
[ ] Scroll reveals 3/4 portrait with haegeum  
[ ] No decorative loading intro  
[ ] Haegeum 4-stage sequence  
[ ] One connecting line  
[ ] English keywords only  
[ ] Interactive Sound Landscape  
[ ] No audio autoplay  
[ ] Selected Works asymmetric drag  
[ ] 4–5 selected works  
[ ] 2026 three-album 3D collection  
[ ] Approved single-object fallback  
[ ] Performance Dark Stage  
[ ] About clear front-facing portrait reveal  
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
[ ] PLAN → ONE BOUNDED TASK → TEST / VALIDATE → REPORT RESULT → STOP → WAIT FOR USER APPROVAL → NEXT TASK
[ ] Each task has one goal, limited impact/file scope, immediate validation and easy rollback
[ ] PHASE 0 uses individually approved P0A–F; no automatic next unit
[ ] 3D geometry/materials/camera/lighting/drag/inertia/open/tray/disc/transition are separate reviewed units
[ ] Every task reports all seven required result fields and then stops
[ ] No multiple phases/pages/full HOME/several 3D subsystems in one automatic implementation run

# 25. IMPLEMENTATION CHUNKING / STOP RULE

Mandatory sequence:
PLAN → ONE BOUNDED TASK → TEST / VALIDATE → REPORT RESULT → STOP → WAIT FOR USER APPROVAL → NEXT TASK.

No explicit next-task approval means STOP, even when the next task is obvious or tests passed. A broad direction/plan approval does not authorize continuous execution. A failed check permits only correction within the approved bounded scope; if another subsystem must change, report and request a new bounded approval.

Every task must have one clear objective, limited impact, explainable file scope, immediate validation and reversible checkpoint. Never implement multiple pages or the whole HOME at once. Never automatically continue across phases for hours.

Report:
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
- V2 public repository: cij5484/cho-youn-kyoung-v2. Verified deployment SHA: 137b3420fda15b9670e109989da54230d959966e.
- P0D locale/metadata contract: COMPLETE locally. 18 KO/EN fixtures per base, 80 browser + 8 locale + 3 placement tests passed. See [contract](docs/redesign/review/LOCALE-METADATA-CONTRACT.md) and [result](P0D-RESULT.md).
- P0E/P0F and actual product pages: NOT STARTED. Authored translation/content, final SEO, audio/mobile and 3D gates remain pending.
- After the P0D report, the user authorized PR publication and merge, with no additional validation. The existing main Pages workflow may deploy the merged artifact; no new deployment success is claimed here. Use its actual deployed SHA for any later live verification.
- Existing production repository/domain unchanged. See [P0C result](P0C-RESULT.md) and [architecture decision](docs/redesign/review/ROUTING-ARCHITECTURE-DECISION.md).
- Design/function requirements remain; the ZIP preserves the historical baseline.
- Checklist boxes stay unchecked until actual implementation/validation evidence exists. Document coverage lives in [HANDOFF audit](docs/redesign/review/HANDOFF-AUDIT.md).
- Current stop point: P0D contract/result/planning updated; STOP for explicit next-task approval. Recommendation: P0E delivery-check wiring on the existing pipeline, including deployment only if approved.

# 27. FINAL HANDOFF RULE

The implementation goal is not:

**“Rebuild the old site with better visuals.”**

The implementation goal is:

**“Build a new, contemporary, high-quality artist website that uses only the legacy information and assets that still deserve to survive.”**
