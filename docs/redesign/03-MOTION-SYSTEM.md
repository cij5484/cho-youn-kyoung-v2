# CHO YOUN KYOUNG WEBSITE V2
## 03 — MOTION SYSTEM

**Version:** 1.6\
**Status:** Approved Motion Baseline  
**Parents:** `00-MASTER-PLAN.md`, `02-DESIGN-SYSTEM.md`  
**Motion Direction:** Quiet Motion / Physical Response

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

**Quiet Motion / Physical Response**

The site should not constantly animate by itself.
It should feel alive and physical when the user scrolls, points, drags, swipes, opens, or rotates.

---

# 2. PRIORITY

1. Interaction quality
2. Responsiveness
3. Visual clarity
4. Artistic expression
5. Technical novelty

**Motion and 3D may be ambitious, but they must never degrade responsiveness, scrolling, input latency, or mobile usability. When visual ambition conflicts with interaction quality, interaction quality wins.**

---

# 3. EXPERIENCE VS READING ZONES

## EXPERIENCE ZONES
Stronger motion allowed:
- HOME Hero
- Haegeum sequence
- Selected Works
- 3D Album
- Works → Detail transition

HOME V2.1 Performance teaser is a quiet contrast zone after the Album Object peak, not another strong-motion zone. Sound and About are deliberate pauses. The intensity sequence is 5 / 4.5 / 3 / 4 / 5 / 2.5 / 2 / 3; these are perceptual emphases, not mandatory movement amplitudes. See 04 §2 for experience budgets.

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

Image:
- clip/mask
- slight scale correction
- subtle opacity

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

Hover should be minimal and precise.

Use 1–2 effects, not many at once.

---

# 16. WORK DETAIL TRANSITION — STRONG

Album and Performance Detail entry may use a strong cinematic shared-element transition.

Concept:
`Work preview → artwork/image expansion → reposition → Detail Hero`

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

Example:
- `3D-01 geometry verified`
- `3D-02 textures verified`
- `3D-03 camera verified`
- `3D-04 drag verified`
- `3D-05 inertia verified`
- `3D-06 mobile verified`
- `3D-07 performance verified`

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

`Concept → Motion Intent → Prototype → Interaction Test → Performance Test → Integration → Regression Test`

Do not add animation as decoration after the page is “finished.”

---

# 38. REFERENCE RESEARCH

When an interaction/section needs better ideas or practical verification, research real production references.

Potential sources:
- Awwwards
- design studio case studies
- museum / artist / editorial websites
- browser API documentation
- Three.js / R3F official docs/examples

The purpose is to learn real-world practice, not copy visuals.

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

---

# 46. FINAL MOTION PRINCIPLE

The visitor should not think:

“There are many animations.”

The visitor should feel:

**“This page has depth, weight, rhythm, and response.”**
