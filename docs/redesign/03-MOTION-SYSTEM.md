# CHO YOUN KYOUNG WEBSITE V2
## 03 — MOTION SYSTEM

**Version:** 1.15\
**Status:** Approved Motion Baseline / frozen upstream directions preserved; 2026-09-08 cinematic continuity and depth implemented in development HOME; validation, delivery and new visual approval are separate HANDOFF states\
**Parents:** `00-MASTER-PLAN.md`, `02-DESIGN-SYSTEM.md`  
**Motion Direction:** Meaningful Motion / Physical Response

---

# 1. MOTION PHILOSOPHY

Motion is not decoration.

It should create:
- depth
- hierarchy
- continuity
- physical response
- musical rhythm
- spatial understanding

**Meaningful Motion / Physical Response**

**BOLD, CURATED, PURPOSEFUL** is the current art/motion criterion. The primary visual ambition is a memorable
first-visit “wow, this site is beautifully made” response. Important movement should have character; animation
quantity is not a quality measure. Use expressive/contemporary motion while protecting input, mobile and accessibility.

2026-09-06 user clarification: do not use meaningless animation. This is not a directive to use as little
animation as possible. Clear scene meaning, navigation, spatial transitions and object relationships justify
bold, contemporary and experimental motion. Do not make V2 timid by default; each movement needs a precise
visual or interaction role. Quiet zones remain intentional contrasts within that larger rhythm.

The site should not constantly animate by itself.
It should feel alive and physical when the user scrolls, points, drags, swipes, opens, or rotates.

---

상위 경험 원칙은 [MASTER §3.1](00-MASTER-PLAN.md#v2-experience-principles)이 소유한다.
구현 시 shared anchor와 실제 outgoing state, 짧은 scroll commitment, 입력별 반응 및 reduced/static 대안을
함께 평가한다. 기법 다양성을 이유로 여러 장면을 한 번에 구현하지 않는다. SOUND의 구체적인 물리 역할은 §45다.

# 2. PRIORITY

1. Interaction quality
2. Responsiveness
3. Visual clarity
4. Artistic expression
5. Technical novelty

**Motion and 3D may be ambitious, but they must never degrade responsiveness, scrolling, input latency, or mobile usability. When visual ambition conflicts with interaction quality, interaction quality wins.**

---

# 3. EXPERIENCE VS READING ZONES

Signature-moment candidates, preserved for their separately authorized owner tasks:
1. HOME Hero
2. Hero → Haegeum
3. WORKS cluster → expanded archive transformation
4. Album 3D physical interaction
5. Work / Album / Performance → Detail shared transition

Do not settle for generic fade or simple slide as their default visual direction. These are quality ambitions,
not permission to implement those pages/3D in P2B. Reduced-motion functional alternatives remain mandatory.

## EXPERIENCE ZONES
Stronger motion allowed:
- HOME Hero
- Haegeum sequence
- Selected Works
- 3D Album
- Works → Detail transition

HOME's current Performance→Artist sequence uses a strong aperture opening and split identity reveal, each followed by
a quiet composition hold. The former uniformly quiet 06/07 description is superseded by the user-authorized shared
geometry; it does not justify continuous spectacle. Sound is quiet before activation, while approved P2I B2 uses a strong
bow signature during explicit listening. About's future archive interaction is separate from HOME's Artist portrait.
See HOME §2 for current experience budgets and §49 below for implemented motion ownership.

## READING ZONES
Minimal motion:
- Biography
- Artist Note
- Program Note
- Credits
- Track info
- Contact
- Press

---

# 4. MOTION CHARACTER

Desired:
- smooth
- restrained
- tactile
- physical
- slightly slow
- precise
- responsive

Avoid:
- bouncy
- playful
- elastic
- cartoon-like
- constantly moving
- exaggerated

---

# 5. BASE TIMING

Prototype ranges:

```text
Micro Hover        160–260ms
Small UI           220–380ms
Text Reveal        550–850ms
Image Reveal       700–1100ms
Section Motion     900–1500ms
Page Transition    650–1100ms
```

These are tuning baselines, not immutable constants.

---

# 6. EASING

Suggested baseline:

```css
--ease-standard: cubic-bezier(.22, .61, .36, 1);
--ease-enter: cubic-bezier(.16, 1, .3, 1);
--ease-exit: cubic-bezier(.7, 0, .84, 0);
```

Avoid cartoon bounce/overshoot.

---

# 7. NATURAL SCROLL

Use native document scrolling by default.

**Do not use aggressive scroll-jacking.**

Smooth-scroll libraries are not a default dependency.

---

# 8. PARALLAX — ACTIVE USE

Parallax is approved and may be used actively to create depth.

However:
- do not animate every element
- layer hierarchy must be intentional
- motion amplitude must remain controlled
- motion should feel like depth, not screen wobble

Typical layers:
1. background / texture
2. fine line / decorative trace
3. artist portrait
4. typography
5. foreground detail

Prototype intensity:

```text
Background     2–6px
Portrait       6–14px
Typography     2–8px
Fine Line      8–20px
Foreground     10–24px
```

Relative depth matters more than exact pixels.

HOME V2.1 Hero uses subtle controlled depth; these generic prototype offsets are not mandatory values. Moving a whole straight line in depth is distinct from local vibration displacement: the 8–20px fine-line parallax range must not be reused as audio-wave amplitude.

---

# 9. POINTER PARALLAX

Desktop pointer parallax:
- normalize pointer around viewport center
- compute target offsets
- interpolate with requestAnimationFrame
- damp toward target
- do not update React state on every pointermove
- avoid layout property animation

---

# 10. SCROLL PARALLAX

Scroll-linked depth is allowed.

CSS Scroll-driven Animations may be used as progressive enhancement.

**Do not make essential content or navigation depend exclusively on a browser feature without a fallback.**

---

# 11. TEXT / IMAGE REVEAL

Text:
- mask/clip reveal
- short translate
- subtle stagger
- typical translate `20–40px`

Image — small canonical vocabulary, selected by asset and narrative role:

| Vocabulary | Role / candidate fit |
|---|---|
| Mask Reveal | Open a structural aperture for artwork, poster or photography |
| Crop Expand | Preserve a focal point as an editorial crop opens into a larger composition |
| Depth Enter | Establish a foreground/background relationship with controlled depth |
| Lateral Reveal | Connect adjacent positions in an index or editorial sequence |
| Shared Object Transition | Carry the same work visual into its destination, retaining position/size/crop continuity |

Do not assign an arbitrary new animation to every image or use the same fade-up everywhere. Preserve asset
meaning, focus and static/reduced-motion alternatives. These 2026-09-06 directions are planning only in P2B:
no image components, page transitions or animation framework are implemented by the navigation refinement.

Avoid stacking too many effects.

Do not use repeated fade-up reveals as the HOME narrative system. Its first viewport must already have poster quality, and default Hero→Haegeum continuity cannot be replaced by unrelated fade-out/fade-in.

---

# 12. DRAG — ACTIVE USE

Drag is a primary interaction language.

Candidates:
- Selected Works
- Album exploration
- image gallery
- 3D package
- archive exploration

Desktop:
`pointer down → direct follow → release → inertia → soft settle/snap`

Drag must feel immediate.

---

# 13. MOBILE DRAG / SWIPE

Horizontal interaction must not break vertical page scroll.

Use careful gesture direction handling and `touch-action` configuration.

Drag-only navigation is not allowed; provide keyboard or previous/next alternatives.

---

# 14. CUSTOM CURSOR — APPROVED

Use a contextual custom cursor on desktop only.

Possible labels:
- DRAG
- VIEW
- PLAY
- ROTATE
- OPEN

It is an action hint, not a decorative blob.

---

# 15. HOVER

Hover should have a clear, precise role; its restraint is not a prohibition on expressive typography.

Use 1–2 effects, not many at once.

P2B's user-approved canonical motion is **BOLD LETTER SLIP**: large navigation letters alternate small diagonal slopes,
deterministically returning to the original baseline. Frozen tuning: X +3px, Y ±7px, 300ms and 20ms
character stagger; no random, bounce, elastic, blur or distortion. Rotation is unnecessary. Letter Slip is primary;
index response may support it, while extra underline and competing resonance markers are omitted. Hover alone
never opens the menu. Touch translates identity into tap/focus/opening/selected states. Reduced motion removes
the per-character movement and stagger. Current tuning/evidence: [navigation guide](review/EDITORIAL-NAVIGATION-PROTOTYPE.md).

---

# 16. WORK DETAIL TRANSITION — STRONG

Album and Performance Detail entry may use a strong cinematic shared-element transition.

Concept:
`Work preview → artwork/image expansion → reposition → Detail Hero`

2026-09-06 future direction, DOCUMENT ONLY: Works / Album / Performance entry should preserve the same
visual object's outgoing position, size and crop as it moves toward Detail Hero. Avoid a disappearing old image
followed by an unrelated new one. Preserve navigation, focus and cancellation if enhancement is unavailable.
Complex archive reorganization/shared transitions may separately evaluate GSAP Flip for payload, actual need,
reuse and maintenance. No library adoption or page implementation is authorized by P2B.

Use browser-native View Transition API as a prototype candidate where appropriate.

**Transition must remain progressive enhancement. Navigation must work without it.**

Fallback:
- opacity
- transform
- simple reveal

General ABOUT/MEDIA/CONTACT transitions remain restrained.

---

# 17. LINE MOTION

HOME V2.1 commits to a two-line structural motif. It changes role across Hero → Haegeum → Sound → Selected Works → Outro; a leading strand may form the Works axis without discarding the pair. Use motion at selected transitions only, not continuous decoration. Apply the bowed-string rule in §45 throughout.

P2E implementation evidence: [continuous transition guide](review/HOME-HAEGEUM-TRANSITION-PROTOTYPE.md). One 155svh native timeline includes the approved Hero exit and four stages; no added motion dependency. The user approved this visual direction; P2F has locally refined this sequence after successful P2E delivery: resonator-anchored pullback, mask-led opening, persistent pair and independent keyword depth. P2F is subsequently user **QUALITY APPROVED / FROZEN**. Native Safari settlement remains unverified future QA. P2G Full→SOUND is result-approved; P2H refines that same Sound owner and ends at REVIEW READY / FREEZE CANDIDATE / STOP.

For Hero→Haegeum, map typography spacing/depth/position, portrait crop/depth, both line guides and incoming imagery into one scroll-linked composition. Stages: HEAD/PEG → STRINGS/BOW → RESONANCE (resonator imagery retained) → FULL HAEGEUM. Show only the current minimal keyword: LINE / TENSION / RESONANCE / HAEGEUM. Native continuous scroll, no snap; preferred 1.2–1.6 viewport overlaps Scene 02's 120–160vh budget, not added pin duration. Stop/reverse/interrupt must inherit the current state without jumps. Reduced-motion static/crop/fade fallback preserves sequence and anchors.

SOUND is a static pause until explicit LISTEN. During actual playback, rising energy increases restrained frequency/density; falling energy damps/stabilizes, with almost-straight lines. No autoplay, scroll-triggered sound or fabricated playing state. Selected Works supports desktop drag/optional wheel without trapping vertical scroll, and restrained work-specific hover/shared Detail Hero transitions.

---

# 18. 3D — ACTIVE BUT QUALITY-GATED

3D can be used actively if it passes quality requirements.

**3D is not restricted by quantity first; it is restricted by quality.**

Primary candidate:
- Album Package

Other 3D experiences may be added only if they remain smooth, maintainable, and meaningful.

---

# 19. 3D EXPERIENCE REQUIREMENTS

Must satisfy:
- immediate pointer/touch response
- smooth drag
- natural inertia
- correct rotation axis
- stable object center
- clean texture loading
- no intrusive pop-in
- no scroll conflict
- no noticeable mobile jank
- no memory leak
- GPU resources cleaned on lifecycle exit
- graceful fallback

---

# 20. 3D LAB — MANDATORY

Do not develop complex 3D directly inside HOME or Album Detail.

Before relevant production 3D begins, complete the separately approved
[Blender Capability Spike](#blender-capability-spike) and review its decision. This is a required
pipeline investigation, not a prior decision to use Blender. P0F records it only; no Lab or model exists yet.

Create an isolated development-only environment, e.g.:

`/lab/album-3d`

Lab contains only:
- Camera
- Lights
- Object
- Interaction
- Performance/debug information

No Header, HOME parallax, page transition, or unrelated UI.

A separate Tray Lab at `/lab/album-tray` is mandatory before Album Detail package quality approval. It targets perceptual recognition of transparent CD plastic, not CAD manufacturing fidelity. See 07 §10–15.

---

# 21. 3D DEVELOPMENT STAGES

## STAGE 1 — GEOMETRY
Validate dimensions/shape. After approval: freeze.

## STAGE 2 — MATERIAL / TEXTURE
Validate color space, texture roles, material response. After approval: freeze.

## STAGE 3 — CAMERA / SCENE
Validate camera, FOV, framing, lighting, shadow. After approval: freeze.

This stage is a category, not one implementation task: camera and lighting are separate bounded tasks with individual validation/report/STOP/approval. The same rule applies to drag versus inertia and to each other owner subsystem.

## STAGE 4 — INTERACTION
Validate drag, touch, rotation, inertia, tilt, pointer capture, scroll conflict.

## STAGE 5 — PERFORMANCE
Validate frame stability, DPR, texture memory, rendering policy, mobile, idle behavior.

## STAGE 6 — PAGE INTEGRATION
Only after Lab passes.

---

# 22. FREEZE RULE

**A verified 3D subsystem must not be modified to compensate for a problem in another subsystem.**

Examples:
- Do not alter geometry to fix layout.
- Do not alter camera to hide an interaction bug.
- Do not alter scale in several places to fix mobile crop.
- Do not alter lighting to compensate for a wrong material.

Fix the subsystem that owns the problem.

---

# 23. NO COMPENSATING PATCHES

If fixes form a chain such as:

`position patch → rotation patch → mobile scale patch → camera patch → shadow patch`

stop.

Do not add a third/fourth compensating patch.

Return to the last verified checkpoint and identify the root cause.

**Root-cause correction is mandatory for complex 3D.**

---

# 24. 3D CONFIG CENTRALIZATION

Major tuning values must be centralized conceptually:

```text
Album3DConfig
  geometry
  camera
  lighting
  motion
  interaction
  quality
```

Do not define the same parameter in CSS, JSX, and helpers independently.

---

# 25. 3D COMMIT STRATEGY

Use small verified commits.

Use the canonical IDs in [Task Protocol](review/IMPLEMENTATION-TASK-PROTOCOL.md), for example:
- `3D-01 geometry verified`
- `3D-02 materials verified`
- `3D-03 camera verified`
- `3D-04 lighting verified`
- `3D-05 drag verified`
- `3D-06 inertia verified`
- `3D-12 adaptive quality verified`

These are illustrative commit subjects, not claims that those tasks have run.

Do not change geometry, camera, light, drag, and responsive behavior in one uncontrolled commit.

---

# 26. 3D DEBUG PROTOCOL

If a bug appears after page integration:

`Issue on page → reproduce in 3D Lab → identify owner subsystem → fix there → regression test → integrate again`

Do not tune random page values until the symptom disappears.

---

# 27. R3F PERFORMANCE RULE

Fast-changing values should use:
- `useFrame`
- refs
- delta time

Avoid React `setState` every frame for rotation, drag, inertia, pointer-follow animation.

---

# 28. FRAME-RATE INDEPENDENCE

Do not use fixed per-frame increments.

Use delta-time based motion:

`rotation += speed * delta`

---

# 29. ON-DEMAND / CONTINUOUS RENDERING

If a 3D scene can idle, use demand/minimal rendering.

Where a separately approved non-HOME scene uses continuous auto-rotation, reduce work when:
- offscreen
- reduced-motion is enabled
- document is hidden

HOME V2.1 Album Object defaults to stable/static. Approach → subtle response / ROTATE → intentional drag → selection → forward focus is a physical response, not autonomous idle spectacle or a mandatory drag prerequisite. If three simultaneous live objects reduce quality, prefer one high-quality object plus album switching; retain the collection and State Continuity/Tray/Lab gates.

---

# 30. ADAPTIVE QUALITY

Quality tiers:

## HIGH
capable desktop, higher DPR, quality shadows/textures.

## MEDIUM
regular laptop/smartphone, controlled DPR/shadow/texture quality.

## LOW
simplified materials/shadows/lighting, lower DPR.

## STATIC FALLBACK
intentional high-quality static render if stable 3D is not possible.

Users do not need to know which tier they see.

---

# 31. PERFORMANCE MONITORING

3D Quality Gate should inspect:
- frame stability
- long frames
- input responsiveness
- memory growth
- texture count
- geometry count
- cleanup
- mobile thermal behavior when practical

Do not rely only on “내 컴퓨터에서는 부드럽다.”

---

# 32. REGRESSION TESTING

After every meaningful 3D change, retest:
- drag
- inertia
- mobile
- texture
- frame stability
- route exit/return
- cleanup

Add one feature at a time. After its validation and seven-field result report, STOP and wait for explicit user approval before the next task. Do not combine geometry/material/camera/light/drag/inertia changes. The mandatory task protocol is 00 §43 and review/IMPLEMENTATION-TASK-PROTOCOL.md.

---

# 33. REDUCED MOTION

Mandatory.

When `prefers-reduced-motion: reduce`:
- reduce/disable strong parallax
- remove large zoom
- stop auto 3D rotation
- simplify shared transitions
- reduce inertia
- simplify line motion
- replace complex reveal with simpler fade where appropriate

Reduced Motion must preserve art direction and content.

---

# 34. MOBILE MOTION

Mobile is recomposed, not reduced blindly.

Desktop:
- hover
- custom cursor
- pointer parallax
- drag

Mobile:
- tap
- swipe
- scroll-based depth
- lightweight 3D

No pointer parallax on mobile.

---

# 35. OFFSCREEN MOTION

Heavy offscreen motion should stop or reduce.

Use visibility/intersection-based activation where appropriate.

---

# 36. IMPLEMENTATION TECHNIQUE PRIORITY

General motion:
1. CSS transform / opacity
2. Web Animations / browser-native API
3. requestAnimationFrame
4. animation library only if justified

3D:
- React Three Fiber / Three.js

Do not mix multiple animation libraries without a clear need.

---

# 37. PROFESSIONAL WORKFLOW

Prototype strategy: when a single safe option obscures the visual potential, compare **REFINED VERSION vs BOLD
VERSION**. Prefer an expressive first candidate, then remove what lacks purpose in visual review. Differences must
be legible and tied to composition/input; stacking effects for their own sake is not the goal. P2B compared a
top-down Refined reveal with a MENU-side angled Bold reveal in its preserved review evidence. The user selected
Bold: **QUALITY APPROVED FOR HERO INTEGRATION / FROZEN**. The runtime has one canonical direction; Refined is
Lab/evidence only. Preserve 500ms opening, 400ms closing, MENU/CLOSE mask, index emphasis and no selected underline.
Do not lower Bold tuning until actual Hero coexistence provides a reason to tune within Bold. Safari real-device
QA and final HOME composition remain open; neither is implied by this scoped approval.

`Concept → Motion Intent → Prototype → Interaction Test → Performance Test → Integration → Regression Test`

Do not add animation as decoration after the page is “finished.”

---

# 38. REFERENCE RESEARCH

Actively research and adopt proven interaction principles and structural ideas: navigation, type hover, image
reveal, scroll choreography, layout transformation, shared transitions, cursors, spatial composition and galleries.
Translate them through Ivory editorial structure, Haegeum/two strings/bow, tension/resonance, album objects,
photography and typography. Do not copy exact layout, visual composition, timing values, original assets, branding
or source code. Record what was studied, adopted and independently tuned; prototype within the approved owner task.

When an interaction/section needs better ideas or practical verification, research real production references.

Potential sources:
- Awwwards
- design studio case studies
- museum / artist / editorial websites
- browser API documentation
- Three.js / R3F official docs/examples

The purpose is to learn real-world practice, not copy visuals.

**Major hover quality gate — P2K user revision (canonical owner):** Does it have distinctive character rather
than a generic template underline/scale? Does it belong to the site's motion language? Does it respond promptly
to the action? Is reverse/pointer-leave as considered as entry? Does it preserve state when interrupted?
Is it purposeful without excess? If the result is ordinary, research a better principle and prototype again
inside the authorized task. Contextual preview and pointer/spatial techniques are options, not mandatory effects
on every link. Keyboard, touch and reduced-motion information remain complete.

[P2K prototype owner](review/P2K-INTERACTION-PROTOTYPES.md) records the actual source research, two projected
points/glyph mask, secondary Janggu helix/upward-only response, and shared-glyph cascade. These are REVIEW
candidates, not newly frozen canonical motion. P2F/P2I A references and the P2J response status remain intact.

---

# 39. PROFESSIONAL OVERRIDE RULE

**If a requested implementation conflicts with professional practice, architecture, accessibility, performance, maintainability, or mobile usability, do not blindly implement it. Explain the conflict and propose the professional alternative first.**

---

# 40. DELIGHT / EASTER EGG MOTION

Easter Egg interactions belong to the same motion system and must remain subtle.

## Sou.P Secret

Scope: HOME Outro / Footer creator signature only; do not reuse on ABOUT or distribute across pages.

Desktop:
- provide a very small immediate hover response so the region feels intentionally interactive
- hidden personal copy may require deliberate dwell
- exact dwell duration is decided by usability testing; do not blindly inherit the legacy 3-second delay

Mobile:
1. first tap reveals/opens the credit state
2. second tap on `Sou.P` reveals the hidden personal message

Do not rely on hover-only behavior for touch devices.

## ABOUT Delight

A separate small portrait annotation, short personal copy or subtle line response. Never reuse Sou.P. It uses the same quiet/reduced-motion/keyboard principles and requires its own bounded review.

## Haegeum Secret

Possible motion language:
- subtle string vibration
- bow-line response
- tiny resonance movement

If sound is used, it must begin only after explicit user input.

## Album Secret

The hidden interaction must be implemented after the core 3D experience passes its Quality Gate.

**Never destabilize verified geometry, camera, drag, or performance merely to add an Easter Egg.**

---

# 41. LANGUAGE TRANSITION

Language switching should feel immediate.

Do not use a long cinematic transition simply because the rest of the site has strong motion.

Preferred:
- preserve current route equivalent
- short text/content transition if useful
- maintain scroll/focus behavior deliberately
- no unnecessary full-page loading sequence

---

# 42. 3D STATE CONTINUITY GATE — MANDATORY

3D quality is not judged only by whether each individual animation looks smooth.

The transition between animation states must also be continuous.

**The start state of every next animation must inherit the exact end state of the previous animation wherever physically or visually relevant.**

Continuity may include:

- position
- rotation
- scale
- linear velocity
- angular velocity
- camera position
- camera target
- field of view where animated
- lighting state
- material state
- opacity
- selected object
- interaction mode
- focus state

Example sequence:

```text
IDLE
→ HOVER
→ DRAG
→ RELEASE
→ INERTIA
→ SELECT
→ FORWARD FOCUS
→ DETAIL TRANSITION
```

The sequence must feel like one continuous physical event rather than separately authored animations stitched together.

Do not reset transforms, camera values, velocities, or selection state between stages unless the reset itself is intentionally animated and visually justified.

For complex sequences, use an explicit state-machine / transition-sequence model rather than unrelated event handlers that each start from hard-coded values.

## Continuity Acceptance Test

For every state boundary:

1. Capture the final visual/physical state of the outgoing animation.
2. Verify the incoming animation begins from that exact state.
3. Check for visible jumps in transform, camera, light, material, and velocity.
4. Check the transition at different interaction speeds, not only one scripted path.
5. Test desktop pointer, touch, reduced motion, and fallback paths separately where relevant.

**A 3D animation can be functionally correct and still fail the Continuity Gate.**

---

# 43. FUNCTIONAL COMPLETE VS QUALITY APPROVED

Complex 3D has two independent completion states.

HOME V2.1 extends this distinction to Hero and major scenes: functional large typography + portrait does not constitute a Moving Editorial Poster. Apply 04 §24 screenshot/crop/type/overlap/interruptibility/mobile Visual Quality Gate and explicit user review. Existing 3D quality requirements below remain unchanged.

## Functional Complete
The feature works.

## Quality Approved
The feature is visually, physically, interactively, and performantly good enough to enter production.

**Do not integrate a major 3D experience into the final HOME merely because it is functionally complete.**

Quality approval requires:

- State Continuity Gate passed
- drag/inertia quality passed
- mobile interaction passed
- performance/lifecycle passed
- visual coherence with V2 passed
- fallback passed

---

# 44. LEGACY 3D REUSE GATE

Legacy 3D code is a technical reference and possible logic donor, not a default implementation source.

Before reuse, explicitly evaluate:

- geometry correctness
- modularity
- camera model
- lighting model
- material model
- motion architecture
- lifecycle/cleanup
- mobile behavior
- adaptive quality
- reduced motion
- state continuity
- compatibility with current V2 layout and visual language

If the old implementation requires compensating patches to fit the new site, prefer rebuilding the incompatible subsystem.

**Do not preserve historical 3D behavior merely because it took time to build. Preserve only what still serves the new design.**

---

# 45. BOWED-STRING AUDIO-REACTIVE RULE — APPROVED

The haegeum is a bowed-string instrument.

Its visual sound language must not behave like percussion, plucked-string impact, or a generic equalizer.

**Avoid large vertical oscillation, bouncing, large waveform/equalizer movement or sine-wave animation.**

Prioritize:

- micro-vibration
- vibration density
- tension
- damping
- sustained friction
- subtle resonance
- fine shimmer
- restrained phase relationship between the two lines

The two-line system should remain visually close to straight lines even in energetic passages.

Higher musical energy may increase:
- vibration frequency
- density
- subtle shimmer
- response speed

without causing large-amplitude movement.

This rule applies to:

- HOME two-line motif from Hero through Haegeum, Scene 03 sound landscape, Works axis and Outro
- Album Detail track player
- same-Album-Detail-route persistent mini player visualization
- any later audio-reactive haegeum motif

The visual system should suggest sustained bow friction and string tension rather than impact.

P2G implementation: the same two Hero/Haegeum line holders become an actual analyser-driven microtexture
only after the Full→Sound release. A 1024-sample live buffer drives energy and friction at about 30 visual
updates/second, with anchored ends and displacement bounded to ±0.62px desktop / ±0.34px mobile.
Pause/end damps to the exact straight pair and stops work. Reduced motion remains static during actual audio.
No fake oscillator, equalizer, per-frame React state or idle animation. These are the current review tuning,
not a new universal timing standard. P2H uses interpolated local sample differences rather than raw waveform
amplitude: 85ms energy attack / 65ms release, 35ms point following / 55ms pause damping, saturating pressure and
higher density with rising energy. No synthetic phase/random oscillator. Paused points are retained at zero time;
settlement clears the visual clock, and buffered replay retains the same graph. The line no longer translates on
hover, avoiding a click-time reset. [Implementation/evidence](review/HOME-SOUND-EXPERIENCE.md).

P2I final canonical direction: **B2 Bold / LONG 460ms / Electric Violet #6334E5**.
**“Strings vibrate. Bow flows.” / “현은 떨고, 활은 흐른다.”**
**STRINGS = micro vibration / tension / resonance. BOW = smooth trajectory / directional sweep.
TRAIL = recent bow path. FAST != JITTERY.** The marker never receives raw waveform position, noisy trembling,
random shake or a copy of the string response. The no-large-sine-wave rule above applies to the strings;
a smooth analytical sweep is allowed for the independent bow abstraction. It is not recovered physical bow tracking.
One marker only; no echoes/particles. Smooth velocity and spatial continuity survive reversal and mode changes;
pause/end briefly decelerate and fade, then stop work. Reduced/static uses a stationary contact without trail.
The [existing SOUND comparison contract](review/SOUND-BOW-CONTACT-COMPARISON.md) owns the frozen Violet/history tuning and renderer budgets. A/B1/other colors remain Lab/evidence only. The line response and frozen Hero/Haegeum stay intact.
The user approved this production direction; SOUND closeout status and QA exceptions are in
[the closeout result](../../P2I-CLOSEOUT-RESULT.md). Public HOME integration and the next scene remain unauthorized.

P2J retains that visual freeze and establishes **BowChoreographyEngine + AudioFeatureData + TuningPreset** as
the scalable contract: offline features + live native playback response. Energy controls activity/range, onset
adds smooth acceleration, spectral flux raises directional activity, and phrase envelope guides lateral travel.
Pitch remains disabled until reliable contour evidence; beat is never the primary driver. Attack/release and
velocity-preserving turns keep fast movement smooth. No per-track timestamp script or genre animation fork.
Exact values, file/data ownership, batch boundary and LONG history are in the
[existing SOUND owner](review/SOUND-BOW-CONTACT-COMPARISON.md#p2j--shared-engine--feature-data--preset-contract).

---

# 46. FINAL MOTION PRINCIPLE

The visitor should not think:

“There are many animations.”

The visitor should feel:

**“This page has depth, weight, rhythm, and response.”**

---

<a id="blender-capability-spike"></a>

# 47. BLENDER CAPABILITY SPIKE — REQUIRED FUTURE GATE

**REQUIRED BEFORE RELEVANT 3D PRODUCTION / NOT EXECUTED.** The investigation is required;
Blender adoption is not decided. P0F only records this gate. Local availability, bpy, exports,
browser appearance and mobile performance have not been tested, and no installation/modeling is authorized.
This gate blocks choosing a production 3D asset pipeline, not unrelated content or Design System work.

Candidate pipeline to prove with a neutral, disposable fixture in a dedicated Lab:

`Codex / Astra → Blender Python / bpy → .blend master → GLB / render → React Three Fiber → Browser → Mobile performance`

Prefer reproducible scripts over GUI-only steps where practical. This diagram is a proposal, not proof of
tool access, a mandate to change the Codex model, or permission to build an album/Haegeum production asset.
Record exact versions, commands, inputs, output locations and parameters. Do not put private or large
production masters into the public runtime repository; a future storage decision follows MASTER §29.

| Evidence required | Acceptance question |
|---|---|
| Local execution / bpy | Can the identified local Blender version execute a recorded script? If unavailable, report it; do not silently install or claim support |
| Deterministic geometry / .blend save | Do repeated runs from the same declared inputs recreate dimensions, topology, pivots, names and saved master? Reload the saved result; do not assume incidental binary bytes must match |
| GLB export / material compatibility | Does export preserve the intended geometry/material subset in the web consumer? Record unsupported features and an explicit alternative; no hidden shader approximation |
| Coordinates / scale | Do units, axes, orientation, normals, pivots and measured dimensions survive export/import without compensating page scale/rotation patches? |
| R3F / browser appearance | Does a minimal isolated fixture import and render under fixed camera/light with reference screenshots? No page integration or production visual tuning |
| File size / mobile GPU | Record GLB bytes, mesh/texture cost, load behavior, frame stability and observed thermal/scroll impact on named real devices against the applicable Performance gates |
| Repeatable modification | Change one declared input, regenerate master/export, and demonstrate the intended isolated difference with a rollback checkpoint |

The spike is a queue of separately approved units in [Task Protocol](review/IMPLEMENTATION-TASK-PROTOCOL.md)
(BLENDER-01A–E), each followed by report/STOP. Export/import checks may inspect dependent behavior;
they do not authorize tuning several production subsystems at once. Missing devices or evidence are
NOT TESTED and cannot be converted into a pass. A failed check is fixed only in its approved owner task.

Final decision must cite the completed evidence and its limits:

- **APPROVE:** the tested pipeline is a viable candidate within the demonstrated scope. Reconsider Blender-authored
  CD Tray, Digipak, Booklet and Disc geometry actively; compare perceptual quality, editability, size and mobile cost
  with simple procedural geometry. No automatic adoption for every object and no waiver of Tray/continuity/quality gates.
- **REVISE:** name the missing proof or owner correction and propose one bounded follow-up. Relevant production
  pipeline adoption stays blocked; no silent completion if local execution or real-device evidence is missing.
- **REJECT:** document why the tested pipeline is unsuitable and propose a maintainable alternative. Obtain a
  separate decision on that alternative before relevant production starts; do not preserve Blender by patch chains.

Completion of the spike is not approval to integrate production 3D, start another task, or publish artifacts.
Simple geometry remains valid when evidence shows it better serves the object.

<a id="haegeum-3d-experiment"></a>

# 48. HAEGEUM 3D — HIGH-PRIORITY FUTURE EXPERIMENT

**FUTURE EXPERIMENT / HIGH PRIORITY / NOT IMPLEMENTED / NOT A FIRST-RELEASE BLOCKER.**
Preserve this in the long-term roadmap even if it develops after launch. It is a signature intellectual /
visual asset candidate, not leftover-time decoration. No model, educational UI or performance quality is approved yet.
It is separate from the existing HOME Haegeum scene and small Haegeum Secret; neither requires this model for launch.

Goal: investigate a high-quality reusable master grounded in the real instrument. Candidate structural scope:
resonator, bamboo neck/body structure, tuning pegs, two strings, bow stick, bow hair and major structural
components. Validate reference photos, multiple angles, dimensions, component relationships and terminology
with reliable authored/reviewed material before claiming anatomical or educational accuracy. Request missing
assets when they materially affect the result; do not invent hidden structure from an inadequate photograph.

Future uses to retain (each needs its own approval and quality gate):

1. Interactive Haegeum Explorer.
2. KO / EN instrument education using authored/reviewed content.
3. Clickable component names and explanations, with accessible alternatives.
4. Exploded view.
5. Rotate / zoom.
6. Macro structural views.
7. An abstract design object for HOME or ABOUT.
8. Haegeum-specific visual storytelling.
9. Sound-linked subtle physical response.
10. Bow / string interaction visualization.
11. A future educational archive.

The Haegeum is a bowed-string instrument. Any performance depiction must research bow direction,
bow/string contact, sustained friction, subtle vibration, tension, damping and resonance. Follow §45;
do not substitute a generic equalizer or exaggerated string bounce, or describe a visual approximation
as a physically verified simulation. Audio/input and animation remain separately scoped tasks.

If the Blender spike supports it, evaluate this reusable source pipeline:

`High-quality Blender Master → Web optimized asset → Mobile optimized asset → Pre-render asset`

Treat web/mobile/render outputs as traceable derivatives of an identified master, not unrelated copies
or a page-owned disposable model. Record master revision, export parameters and intended consumer;
the diagram names possible outputs, not a requirement to derive every output serially from the previous one.
Master storage, authenticity, optimization and quality gates must be reviewed before production.

This is not a Haegeum game or a game-development branch of V2. Blender scripting, modeling/procedural
knowledge, materials, rigging concepts, animation, optimization, GLB/FBX export knowledge, real-time input
and profiling may transfer to separately approved future game projects. V2 does not pre-build game
engines, rigging systems, gameplay state or FBX pipelines for that possibility.

# 49. CURRENT HOME CLOSING MOTION CONTRACT

2026-09-08 cinematic continuity / depth pass, followed by the user's 04 selective revert. This section describes the
development HOME with the start-of-pass Works ribbon restored. Album cursor orbit, full-scene poster/Artist orbits
and long diagonal Outro escape remain superseded by the retained later-scene refinements.
Historical result reports retain their original tuning and evidence. Implementation is not visual quality approval;
HANDOFF owns current approval, validation and delivery.

## 49.1 Ownership and shared material

| Owner | Current responsibility |
|---|---|
| `works-motion.ts` | Restored native-scroll ribbon transforms and active-link focus; the shared owner retains separate later-scene trail refinements |
| `album-motion.ts` / `album-light.ts` | Existing input/pose/inertia, selected-cover tone and slower light settlement; presentation adapter remains separate |
| `stage-artist-motion.ts` / `stage-depth.css` | One reversible aperture→poster→suit→hanbok timeline, date geometry, threshold holds and subtle photo/mask/type depth |
| `surface-response.ts` | Damped fine-pointer input for stage/portrait light and the small bounded split response; no face distortion |
| `SceneAfterimages.tsx` / `continuity.css` | Brief album-light and Artist-seam transfers; the new Works-edge transfer is removed |
| `closing-orbit.ts` | Shared spatial math and two authored Outro resolution endpoints; no independent scene loop |

`motion.ts` retains ordinary closing-scene entry/exit geometry. The shared stage timeline owns actual stage/header
contrast. It switches the authored foreground/background pair together; an interpolated middle-gray pair is not used.
The menu dialog and approved Bold navigation motion retain their own contracts.

**Scene Afterimage** means that a recognizable piece of outgoing material becomes the incoming scene's cue. Selected
album RGB/direction supplies a short clipped stage light; the actual Artist seam supplies a short edge toward Outro's
name. The added last-work plane edge is removed by the 04 selective revert. Retained layers never intercept
input or own layout. They use event-driven geometry/state updates, not a perpetual loop, broad blur or repeated ghosts.
SOUND's existing rightward strand contraction and the existing 06→07 shared seam remain the larger continuity anchors.

## 49.2 Works ribbon — baseline restored

The user requested 04 only to return to `d98aaa6444b472537bfd5d1e549f864635930a85`. Desktop restores 190svh total
section height / 90svh nominal travel and its existing ribbon transform: spacing .46 of viewport width, depth tuning
210px and Y-turn tuning 48°. Mobile retains the preceding authored native-scroll ribbon at 250svh / 150svh, not a
static gallery. Progress uses actual section minus sticky height, and numbered controls seek the active work.

The cinematic pass's **Depth Queue is REVERTED / NOT ACTIVE**: no additional .13/.87 interval hold, next-plane edge
clipping, new mobile queue pose or Works→Album plane afterimage. The term remains a FUTURE possibility, not the
current implementation. Existing perspective/ribbon movement, one large current image, title/year/type ledger,
pointer/focus gathering and active-link access remain. Reduced motion still restores every link/caption in a static grid.
Native touch scrolling exposes all works. No scroll-velocity-dependent content state or new motion library is added.

## 49.3 Album Light Memory and object depth

Preserve the existing 4px horizontal touch-intent threshold, `pan-y pinch-zoom`, primary-pointer capture, bounded
release, mouse drag and keyboard/front/back controls. Fine-pointer pose response remains horizontal ±28° / vertical
±20°. Pointer-down inherits the actually rendered hover pose. The selected object is not snapped to a fresh pose
by a light or album-selection change. Initial three-quarter/front/back states provide authored resting options;
free drag release settles its existing angle rather than forcing a new threshold orientation.

Light Memory derives RGB means from the three retained front-cover derivatives in `album-light.ts`. Direction uses
the rendered turn/tilt; exponential response is 3.8/s for direction and 3.1/s for tone, behind the object's 11/s pose
response. Ambient surface, reflection and shadow settle at different rates. The owner stops rAF when object and light
are settled and suspends offscreen/hidden; reduced motion settles the tint immediately without light inertia.
This is an asset-derived contextual response, not additional brand palette, bloom, a neon rim or a physical simulation.

The three retained CSS volumes exchange over the existing 920ms transition with a deeper outgoing/incoming Z path.
Visibility follows departure; 3D descendants are not flattened by parent opacity. Rapid selection continues from current
CSS transforms, while outer pose/light identity persists. The 5.7%-of-cover-width thickness remains a visual approximation,
not measured manufacturing data. This work does not waive Blender, Tray or Album Detail quality gates.

## 49.4 Stage Date Geometry and Artist depth

The fixed feature remains 2026-09-22 `<풀고, 엮다>` using its official poster, not an invented stage photo. `09` and `22`
align from offset positions as their central boundary grows with the aperture. Date/title/venue remain clear of the image.
The shared frame and its right boundary then become the suit entry and hanbok split; no second header/motion owner,
independent section fade or photographic morph is introduced.

| Shared sequence progress | Current composition |
|---|---|
| 0–.24 | Aperture opens; date geometry aligns |
| .24–.39 | Poster/date threshold holds before copy begins leaving |
| .43–.64 | Existing frame and seam carry stage→suit identity handoff |
| .67–.82 | Hanbok split approaches 47.6% of the image |
| .82–.91 | Held suit/hanbok identity composition |
| .91–.955 | Split continues to its retained 68% endpoint |
| .955–1 | Small frame retreat prepares outgoing seam afterimage |

The split percentages are neutral-pointer values; the retained fine-pointer deviation remains bounded by the
existing portrait reveal and ±5% full-reveal range. The hold does not disable that small live surface response.

Thresholds are positions in a single native-scroll timeline. The target and settled progress are observable separately;
fast or reverse scroll does not start another timed scene animation. The Artist photo and seam translate by a few pixels;
type moves at a smaller opposite depth. Mobile uses small scroll-driven vertical displacement, no fake cursor. Existing
responsive crop/scale rules remain independent of these translations. This is **DOM 2.5D photo/mask/type separation**,
not segmented foreground/background anatomy, a tilted card, face warp or a WebGL portrait.

**Occlusion Typography: OPTIONAL / NOT ADOPTED in this pass.** There is no silhouette cutout asset; the name remains
beside/below the photos instead of adding a competing overlay. **Scroll Velocity Response: OPTIONAL / NOT ADOPTED.**
Scroll position remains deterministic; no velocity-dependent content placement or extra inertia layer was added.

## 49.5 Persistent Two-Point Narrative and quiet moments

The same two depth canvases retain Violet `#6334E5` and Lacquer `#A33D36`, headless tapered trails and the monotone
resampler. SOUND strands first contract left-to-right toward their fixed right endpoints over the first 60% of the
handoff. The released pair crosses Works and follows the selected album's measured object bounds, **not the cursor**.
Album activity increases its presence; a settled object keeps it subordinate.

06 shows brief cues at the opening edges; 07 briefly shows tension at the shared seam. Full poster and held identity
frames clear the pair rather than treating it as always-visible UI. Quiet thresholds stop the trail loop after settlement;
scroll/state changes wake it. Scene weights connect targets without a new per-scene pair. The 2000ms trail history
remains bounded to 360 samples (mobile 180), with capped DPR 1.75 (mobile 1.25). Offscreen/hidden/menu states suspend
rendering. Front/back image and glyph occlusion stays separate from semantic content; mobile Works avoids image
occlusion that would hide the pair behind its large foreground image.

Outro gathers over .66–.83 toward two authored endpoints, briefly holds, then withdraws over .94–1 as the remaining
trail fades. It finishes at page end and resumes from the same model on reverse scroll. Decorative trails/afterimages
are hidden in reduced motion; the normal static content/identity remains complete.

## 49.6 Scope and future route boundary

Stable album object/front/back identities and the fixed featured-performance content/image identity preserve
future continuity inputs. **HOME→Album Detail / HOME→Performance Detail shared transitions are FUTURE /
NOT IMPLEMENTED**. No route snapshots, new detail pages, View Transition API adapter or route animation is included.

All current motion owners clean listeners/observers/frames on unmount. Meaningful native touch scroll, explicit
controls, readable reduced-motion hierarchy and the earlier one-shot SOUND focus alignment remain intact. Specific
browser/device/thermal evidence belongs to the task result; implementation rules are not proof of device quality.
No new animation/WebGL dependency, Blender work, production-domain change or next scene is implied.
