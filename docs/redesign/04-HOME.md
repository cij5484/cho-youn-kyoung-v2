# CHO YOUN KYOUNG WEBSITE V2
## 04 — HOME

**Version:** 2.1\
**Status:** HOME V2.1 Art Direction — navigation and BOLD/CURATED/PURPOSEFUL policy 2026-09-06; visual implementation/quality approval pending\
**Parents:** `00-MASTER-PLAN.md`, `02-DESIGN-SYSTEM.md`, `03-MOTION-SYSTEM.md`  
**Art Direction:** Contemporary Editorial / Ivory  
**Narrative Structure:** ARTIST → INSTRUMENT → SOUND → WORK → OBJECT → STAGE → ARTIST → NAME

---

# 1. HOME OBJECTIVE

HOME is not a conventional landing page.

It is the primary authored experience of the V2 website.

**V2.1 raises the bar from a well-made contemporary artist homepage to a HOME that feels like one of Cho Youn Kyoung’s digital artworks.** Within approximately the first five seconds, the visitor should feel “우와, 홈페이지 진짜 잘 만들었다.” This is a first-impression quality goal, not a five-second loading/entrance timer or a reason to delay access.

Quality comes from typography, photography, crop, composition, depth, whitespace, interaction timing, transition continuity and physical response. More effects are not the solution. Contemporary Editorial / Ivory and **Static Color, Dynamic Composition** remain canonical.

The visitor should progressively understand:

1. there is a distinctive artist here,
2. the artist’s instrument is the haegeum,
3. the instrument becomes sound,
4. the sound becomes works,
5. the works become physical albums and performance records,
6. all of those works belong to Cho Youn Kyoung.

HOME must feel cinematic and carefully authored while preserving normal navigation, readable information architecture, and fast interaction.

---

# 2. HOME RHYTHM

Do not make every scene equally intense.

V2.1 canonical rhythm and approximate experience budgets:

| Scene | Narrative | Intensity | Approximate length | Role |
|---|---|---|---|---|
| 01 HERO | ARTIST | 5/5 | 100–120vh | First-five-seconds peak; Moving Editorial Poster |
| 02 HAEGEUM | INSTRUMENT | 4.5/5 | 120–160vh | Continuous transformation from Hero |
| 03 SOUND | SOUND / LISTEN | 3/5 | 70–90vh | Quiet pause; explicit optional listening |
| 04 SELECTED WORKS | WORK | 4/5 | 100–130vh | Long asymmetric editorial surface, 4–5 works |
| 05 ALBUM OBJECT | OBJECT | 5/5 | 110–140vh | Second major visual peak; collectible objects |
| 06 PERFORMANCE | STAGE | 2.5/5 | 80–100vh | First major Ivory → Dark Stage change; restrained motion |
| 07 ABOUT | ARTIST | 2/5 | 80–100vh | Ivory; first clear face; short introduction |
| 08 OUTRO | NAME | 3/5 | 80–100vh | Name/two-line resolution; Sou.P signature |

**STRONG → STRONG → QUIET → ACTIVE → PEAK → QUIET → QUIET → RESOLVE**

These are experience/scroll budgets for later prototype review, not fixed CSS heights, forced dwell times or added pin spacers. Intensity means perceived emphasis, not animation quantity or amplitude. Scene 02's 120–160vh and the 01→02 transition's 1.2–1.6 viewport range describe an overlapping continuous journey, not two mandatory durations to add together. Adjust at real typography, viewport and mobile/reduced-motion review; do not stretch sparse content to fill a target.

This rhythm is mandatory design guidance.

The user should not feel that every scroll requires another interaction.

---

# 3. GLOBAL HOME RULES

- Native document scrolling.
- No aggressive scroll-jacking.
- No separate decorative intro/loading screen.
- Strong motion only where it creates narrative value.
- Reading moments must remain quiet.
- Existing legacy visuals are not automatically reusable.
- New assets may be created/generated/requested when they improve quality.
- Desktop and mobile may use different compositions while preserving the same narrative.
- All heavy 3D must pass the 3D Lab, Quality Gate, and State Continuity Gate before production integration.

---

# 4. SCENE 01 — HERO / ARTIST MYSTERY

## Purpose

Create immediate visual impact and establish Cho Youn Kyoung as a contemporary artist before explaining the instrument in detail.

## Narrative Role

The visitor should think:

> “Who is this artist?”

before:

> “This is a haegeum artist.”

## Composition

Approved:

- Warm Ivory background
- Oversized `CHO / YOUN / KYOUNG`
- Three-line English display typography
- Asymmetric large portrait
- Portrait is composed around the right 58–62% visual zone on desktop; this is an optical composition guide, not a rigid two-column width. Cropping beyond the viewport is allowed.
- Intentional empty grid columns
- Artist name + MENU trigger integrated into the Hero composition; final scroll behavior reviewed with the Hero
- Two extremely thin structural lines
- Controlled depth and subtle parallax

**MOVING EDITORIAL POSTER** is the canonical Hero direction. The first viewport must work as an independent art poster/editorial artwork, not merely a large headline next to a portrait. The three-line CHO / YOUN / KYOUNG name is graphic structure: allow roughly 55–65% of viewport height for the overall name composition, tuned by breakpoint and actual type metrics. This height guide is distinct from the portrait’s right-side visual zone.

## Navigation

User correction, 2026-09-06:
- initial state is CHO YOUN KYOUNG at top left + MENU trigger at top right
- there is no separate left-side vertical navigation in the initial frame
- the former initial-link → compact-header morph requirement is canceled
- menu links appear within the opened editorial panel; P2B Bold trigger/panel/item motion is QUALITY APPROVED FOR HERO INTEGRATION / FROZEN; Refined is archived Lab/evidence only. Preserve canonical Bold tuning until actual Hero composition review; Safari real-device and final HOME QA remain open
- do not add a replacement navigation morph before actual Hero composition

P2C will judge any small continuous spacing/scale/surface change of these same two header elements with the real Hero.
That future judgment is not authorization to implement HOME/P2C in the refinement. Keep navigation readable and discoverable.

## Portrait Sequence

Start with a side/back or partial-face close-up. The approved candidate family is the existing purple hanbok portrait set, especially side/back close-ups. The exact file and final desktop/mobile crops are not yet selected or quality-approved.

The face should not be immediately presented as a full frontal identity shot.

On initial scroll, preserve the planned progression toward a 3/4 back portrait where the haegeum becomes more visible. A clear frontal/clear 3/4 identity reveal belongs to Scene 07; this earlier instrument reveal must not use up that later payoff.

**Do not use a click/drag puzzle to reveal the artist.**

The reveal must be intuitive and scroll-driven.

## Typography Layering

Typography and portrait may cross in depth.

Approved:
- only 1–2 precise front/back crossings
- some letters may appear behind the subject, others in front

Do not repeatedly switch z-depth across every line.

The mask must respect face, silhouette, clothing, and portrait crop. At most 1–2 very precise intersections should define the composition; avoid the impression of text simply pasted on top of a photograph.

If the layering is not precise enough, simplify rather than accepting a mediocre mask.

## Parallax Layers

Suggested:
1. background
2. two-line motif
3. portrait
4. typography
5. small foreground detail

Use controlled depth, not wobble.

## Entrance

- Hero background appears immediately
- no decorative preloader
- typography reveals with a short masked rise
- portrait crop opens subtly
- after entrance, the page becomes quiet until user input

## Mobile

Recompose vertically.

Historical vertical-stack study — not the V2.1 canonical composition or sufficient evidence of completion:
```text
CHO
YOUN
KYOUNG

[ PORTRAIT ]

HAEGEUM ARTIST
```

No pointer parallax.

Use lighter scroll-based depth only. Recompose the same three-line name with a more aggressive authored crop, touch-safe editorial navigation and fewer layers. Do not scale down desktop depth crossings; choose mobile intersections independently, including none when that gives a stronger poster. Mobile receives the same first-viewport quality gate.

## Reduced Motion

- remove strong parallax
- use simple mask/fade
- preserve typography/portrait hierarchy

## Asset Requirements

The purple hanbok side/back set is sufficient as a planning candidate, not proof of final-scale quality. No source resolution/crop or masking inspection was performed in this documentation revision.

Before final implementation, verify:
- source resolution
- mobile crop
- masking edge quality
- tonal compatibility with Ivory background

If the candidate is missing or fails final-scale resolution, crop or masking quality, request the appropriate original or dedicated mobile asset before final visual approval. Do not quietly compromise, over-enlarge or substitute an unrelated image to call the Hero finished.

## Acceptance Criteria

- Immediate first-frame quality
- Artist identity feels contemporary, not generic
- No obvious template-like split layout
- Typography masking is precise
- Scroll reveal into the next scene is continuous
- Mobile composition is intentionally redesigned

## Do Not

- generic “name left / portrait right” split without editorial treatment
- face-dominant beauty-style close-up on the first frame
- complex user puzzle before content appears
- decorative loading intro
- excessive front/back text masking

---

# 5. TRANSITION 01 → 02

The Hero's two-line motif is the structural bridge into the haegeum scene.

The normal-motion contract is one scene transforming into the next, not Hero fade-out followed by an unrelated Haegeum fade-in:

| Outgoing anchor | Continuous change | Incoming role |
|---|---|---|
| CHO / YOUN / KYOUNG | spacing, depth and position change | typography gives space to the instrument |
| Portrait | authored crop and depth evolve | artist/instrument connection stays legible |
| Two extremely thin lines | alignment, tension and guiding role evolve | instrument structural guides |
| Haegeum imagery | progressively occupies the frame | HEAD/PEG → STRINGS/BOW → RESONANCE → FULL HAEGEUM |

Review approximately 1.2–1.6 viewport of continuous travel, within/overlapping the Scene 02 experience budget. Do not append an extra long pinned cinematic sequence. Native scroll remains reversible and interruptible: reversing, stopping or skipping scroll must settle at the corresponding current composition without a reset or forced playback. No snap-scrolling or mandatory interaction to proceed.

Reduced-motion or unsupported-motion fallback may use the existing restrained crop/fade/static sequence while preserving anchors, ordering and information. That explicit accessibility fallback is not permission to substitute a generic crossfade for the default direction.

The portrait and typography move at different scroll rates.

The haegeum begins to appear before Scene 01 feels fully detached.

Avoid:
- hard section cut
- simple crossfade between unrelated screens
- abrupt background/color switch

The transition must feel like the artist image is giving way to the instrument.

---

# 6. SCENE 02 — HAEGEUM / INSTRUMENT

## Purpose

Reveal the haegeum as a physical, tactile, contemporary visual object.

## Narrative Role

Move from artist mystery to instrument identity.

## Structure

Approved 4-stage continuous sequence:

1. `HEAD / PEG`
2. `STRINGS / BOW`
3. `RESONANCE` — expressed through resonator/body material and surface imagery (the former RESONATOR subject remains)
4. `FULL HAEGEUM`

## Visual Method

Hybrid:

- actual photography
- deliberate crops
- cutout elements where useful
- line animation
- subtle parallax
- mask transitions

Do not present it as an educational diagram or gallery slideshow.

## Text

English keywords only.

Examples:
- `LINE`
- `TENSION`
- `RESONANCE`
- `HAEGEUM`

These words are visual design elements, not explanatory copy.

Do not add Korean helper labels in this scene.

Do not add long instrument-history text. Reveal only the keyword relevant to the current stage; never show LINE / TENSION / RESONANCE / HAEGEUM all at once.

## Continuous Line

Two extremely thin lines form one continuous structural motif across all four stages. One strand may temporarily lead the guide or Works-axis role; it remains part of the pair, not a replacement one-line system.

The line may begin as an abstract editorial rule and progressively become associated with:

- string
- bow
- vibration
- resonance

The pair must maintain narrative continuity across the sequence and retain the bowed-string behavior in §26 / 03 §45. Most of its visible length stays nearly straight.

## Final Reveal

Use the current beige-background full haegeum image as the planning/final-reveal baseline.

The final full instrument should feel like the previous details resolve into one object.

## Scroll

Continuous natural scroll.

No fullscreen snap.

## Mobile

Reduce simultaneous layers.

Keep:
- sequence
- key detail crops
- line continuity
- full instrument reveal

## Reduced Motion

- line becomes mostly static
- use simple crop/fade
- preserve 4-stage narrative

## Asset Requirements

Current assets are sufficient for planning and prototype.

Recommended later enhancement if quality improves:
- peg/head macro
- string/bow intersection macro
- resonator surface macro
- left-hand/string contact
- right-hand/bow grip

New photography is not currently blocking.

If existing crops are insufficient at final scale, request dedicated detail photography rather than over-enlarging weak source material.

## Acceptance Criteria

- Scene feels like an authored visual exploration, not a product manual
- the two-line motif clearly connects all stages, with one strand allowed to lead a specific guide role
- imagery remains sharp at intended scale
- final full haegeum reveal is visually satisfying
- mobile does not become a long slideshow

## Do Not

- use casual floor/table reference photos as final hero-scale visuals
- display the multi-angle reference board as a finished scene
- force low-resolution crop enlargement
- add 3D haegeum simply for technical novelty

---

# 7. TRANSITION 02 → 03

The two-string / line motif evolves from physical instrument structure into sound representation.

The visual language should suggest:

`instrument → vibration → sound`

The transition must not feel like leaving one page and opening an audio widget.

---

# 8. SCENE 03 — MUSICAL WORLD / INTERACTIVE SOUND LANDSCAPE

## Purpose

Turn the instrument into sound.

## Narrative Role

This is the first explicit listening moment on HOME and an intentional quiet pause after two strong scenes. Its 3/5 emphasis comes from presence, not continuous animation.

## Core Experience

Approved:
- one representative sound fragment
- approximately 10–20 seconds
- explicit `LISTEN` action
- no autoplay
- no real playable source means a truthful unavailable/disabled/coming-soon state, never a running silent timer
- HOME sample playback ends when leaving HOME; it is not a global player
- two-line motif reacts subtly to audio
- short scene
- no scroll lock

## Sound Interaction

Before activation:
- scene is visually complete
- line motif is quiet/static
- `LISTEN` is clear

After activation:
- request actual playback immediately after LISTEN; only successful playback is represented as playing, with truthful pending/error/unavailable states
- line movement responds subtly
- response should feel organic, not like a generic audio visualizer
- rising energy increases restrained vibration frequency/density; falling energy increases damping/stabilization
- tension, sustained friction and subtle resonance take priority over visible amplitude; the pair stays nearly straight

Avoid:
- equalizer bars
- large waveform
- exaggerated beat animation
- sine-wave animation or exaggerated vertical oscillation

## Sound Hierarchy

HOME uses the **signature version** of the sound language.

Album Detail later uses a **functional derivative**:
- smaller
- more restrained
- player controls take priority

Do not copy the HOME scene wholesale into Album Detail.

## Custom Cursor

Desktop may use `PLAY` / `LISTEN` contextual cursor.

## Mobile

Tap to listen.

Do not trigger sound from scroll or accidental touch.

## Reduced Motion

Audio remains available.

Line response may become very subtle or static.

## Asset Requirements

Existing web audio is sufficient for prototype.

Before production, choose an exact representative excerpt and prepare a web-optimized clip if beneficial.

When needed, request:
- track
- exact timecode
- clip duration
- fade in/out preference
- source quality

## Acceptance Criteria

- user understands audio is optional
- no surprise sound
- line response feels premium and subtle
- scene remains visually complete with sound off
- scene does not become a full player page

## Do Not

- autoplay audio
- force user to stay
- use generic waveform/equalizer aesthetics
- present multiple fragment choices on HOME

---

# 9. TRANSITION 03 → 04

One strand of the two-line motif extends horizontally and becomes the Selected Works editorial exploration axis. The other can remain quiet/recede; preserve the pair’s identity for the Outro rather than inventing a new decorative system.

This is an intentional signature transition.

Narrative:

`sound line → work navigation axis`

Do not reset the visual language between scenes.

---

# 10. SCENE 04 — SELECTED WORKS

## Purpose

Show that the artist has a substantial body of work without turning HOME into an archive.

## Composition

Approved:
- one long asymmetric editorial surface, explored horizontally on desktop; the rail is an input structure, not a row of cards
- 4–5 selected works
- varying image sizes / crops / vertical positions
- large whitespace
- editorial numbering

Do not use equal-sized generic cards.

## Content

Each work shows only:
- title
- type
- year

No summary paragraph on HOME.

## Interaction

Desktop:
- direct drag and optional wheel exploration within the surface
- wheel support must not hijack normal vertical page travel; direction/bounds hand control back to the document
- inertia
- soft settle / restrained snap
- custom cursor `DRAG`

Mobile:
- vertical-first composition; horizontal swipe only where necessary and intentional
- vertical page scroll must remain reliable; keep tap/link and non-drag alternatives

## Detail Entry

Strong shared-image transition.

The selected image/artwork should expand/reposition into the detail Hero where possible.

Fallback:
- transform + opacity transition

Navigation must remain functional without shared transition support. Match image/object character to its Detail Hero; do not mechanically repeat the same hover animation across every work.

## Accessibility

Provide non-drag alternatives:
- previous/next
- keyboard navigation
- focusable work links

## Asset Requirements

Selected works must use the strongest available artwork/performance imagery.

Do not choose a work simply because an asset already exists.

If a selected work lacks a V2-quality image, request or create a better asset.

## Acceptance Criteria

- feels like editorial exploration, not ecommerce carousel
- 4–5 works feel substantial but not crowded
- drag is immediate
- mobile swipe does not steal vertical scroll
- detail transition is coherent

## Do Not

- equal cards
- long descriptions
- 6–8+ works
- freeform canvas that harms discoverability

---

# 11. TRANSITION 04 → 05

Selected Works should resolve into a more focused physical-object experience.

Reduce lateral exploration and increase object focus.

The transition should prepare the visitor for 3D rather than abruptly spawning a WebGL scene.

---

# 12. SCENE 05 — ALBUM OBJECT / 3D COLLECTION

## Purpose

Present the 2026 albums as physical artworks.

## Core Composition

Approved primary concept:
- three 2026 albums as the content collection; simultaneous live WebGL count is not a requirement
- one coherent physical collectible/exhibition-object collection
- Ivory environment
- sculptural grouping
- selected album comes forward
- unselected albums recede
- selected album is the focused manipulation target
- stable, mostly static default pose in the Ivory exhibition space; no perpetual idle rotation

V2.1 prioritizes the perceptual quality of a physical object over displaying three live objects. Approach gives a subtle response and ROTATE cue, intentional drag explores the object, and selection brings it forward. This describes the experience, not a requirement to drag before selecting; tap/keyboard detail access remains available. The full continuity sequence below still governs supported state transitions.

## Interaction

Desktop:
- hover indicates `ROTATE`
- drag rotates selected album
- natural inertia

Mobile:
- touch rotation only if scroll behavior remains reliable
- adaptive quality mandatory

## Detail Transition

Selected album moves forward toward the camera and transitions into Album Detail.

This is one of the primary “wow” interactions of V2.

## 3D State Continuity Gate

Mandatory.

The sequence:

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

must behave as one continuous physical event.

The incoming state must inherit the outgoing state wherever relevant:

- position
- rotation
- scale
- angular velocity
- camera
- selection
- material/opacity
- lighting where animated

Do not stitch independent animations that reset values between stages.

## 3D Development

Mandatory workflow:

`3D Lab → Geometry → Materials/Textures → Camera/Scene → Interaction → Performance → Integration`

Each verified subsystem is frozen.

Do not modify one subsystem to compensate for a problem owned by another subsystem.

## No Compensating Patches

If fixes form a patch chain, stop and identify the root cause.

## Functional Complete vs Quality Approved

The 3D scene is not production-ready merely because it works.

It must be **Quality Approved** before final HOME integration.

## Legacy 3D Policy

Existing 3D is reference knowledge only until reviewed.

Do not reuse:
- camera values
- light values
- interaction values
- scene composition
- transition model

merely because they already exist.

Reuse geometry/math/logic only after compatibility review.

## Fallback

If the three-object collection cannot maintain required visual quality, performance, or mobile usability:

**Prefer one high-quality 3D album object with album switching whenever three simultaneous live objects weaken visual quality, mobile performance or interaction quality.** All three albums remain selectable; this is the preferred quality-preserving presentation under those conditions, not an inferior emergency version.

This fallback is approved.

Do not keep a weak three-object experience for conceptual purity.

## Adaptive Quality

Support:
- High
- Medium
- Low
- Static fallback

## Asset Requirements

Before production 3D approval, verify for each album:
- front
- back
- spine
- CD
- booklet where shown
- exact package dimensions
- final approved artwork
- texture resolution

Request missing material before compensating with invented geometry or low-quality textures.

## Acceptance Criteria

- stable object centers
- accurate rotation
- natural inertia
- no visible state jumps
- coherent camera/light behavior
- high-quality textures
- smooth desktop/mobile interaction
- no scroll conflict
- route exit/return cleanup
- fallback looks intentional

## Do Not

- directly paste the legacy 3D monolith
- accept 90% visual quality
- patch state discontinuities
- keep three objects if performance is compromised
- add Easter Egg behavior before core 3D passes Quality Gate

---

# 13. TRANSITION 05 → 06

The site must intentionally reduce motion after the 3D peak.

Move from:
`physical interaction → still stage atmosphere`

The dark Performance scene should feel like a breath after the technical/interactive climax.

Avoid another high-intensity transition.

---

# 14. SCENE 06 — PERFORMANCE / DARK CINEMATIC STAGE

## Purpose

Express live performance atmosphere.

## Composition

Approved:
- Dark Cinematic Stage
- one featured performance only
- one strong large performance image
- title/date/venue
- minimal CTA

## Motion

Almost static.

Allowed:
- subtle depth/parallax
- tiny image movement
- restrained text reveal

The stillness is intentional.

Do not add another drag rail or active 3D interaction here.

## Visual Role

This is HOME’s first major Ivory → Dark Stage tone change and its primary dark contrast moment. At 2.5/5 it must feel quieter after the Album Object peak, even though the tonal contrast is strong.

It must not become a second permanent color system.

## Mobile

Use a strong image crop and simple vertical hierarchy.

## Reduced Motion

Can be nearly identical to default.

## Asset Requirements

Use the strongest performance image, not simply the newest or easiest asset.

If the chosen performance lacks a strong hero image, request another source or create a better visual treatment.

## Acceptance Criteria

- strong contrast after Album 3D
- atmosphere without interaction fatigue
- performance feels live/cinematic
- minimal motion is clearly intentional

---

# 15. TRANSITION 06 → 07

Move from Dark Stage back to Ivory.

The transition should feel like leaving the performance space and meeting the artist directly.

Do not use a flashy wipe.

Prefer:
- controlled tonal transition
- quiet mask reveal
- large whitespace

---

# 16. SCENE 07 — ABOUT / ARTIST REVEAL

## Purpose

Reveal the person behind the instrument, recordings, and performances.

## Narrative Role

This is the first comparatively clear identity reveal: front-facing or clear 3/4. Hero’s side/back/partial-face approach gives this quiet return to Ivory its purpose.

Do not continue hiding the face here.

## Composition

Approved:
- one strong front-facing or clear 3/4 portrait
- large scale
- 2–3 sentence artist introduction
- role/position only if concise
- `VIEW FULL PROFILE →`

No CV timeline on HOME.

## Motion

Approved:
- quiet portrait mask reveal
- subtle parallax
- restrained text reveal

## Background

Return to Ivory.

## Mobile

Portrait first or portrait/text interleave based on crop quality.

Do not shrink a desktop two-column block blindly.

## Asset Requirements

Current assets are sufficient for planning.

Before production, review the front-facing or clear 3/4 portrait quality and its distinction from the earlier partial-face Hero.

If a new portrait would materially improve the final emotional payoff, proactively request it.

## Acceptance Criteria

- clear identity payoff after earlier mystery
- calm after Performance
- no over-animation
- text remains short
- clear path to full About

## Do Not

- keep hiding the face
- add a career timeline
- add a gallery drag
- reuse Hero portrait without a strong reason

---

# 17. TRANSITION 07 → 08

The About scene should dissolve into closure rather than introduce new information.

The line motif reappears in its simplest editorial form.

---

# 18. SCENE 08 — OUTRO / FOOTER

## Purpose

Close the HOME narrative and provide one clear continuation path.

## Composition

Approved:
- oversized artist name
- minimal footer information
- one primary CTA: `EXPLORE ALL WORKS →`
- discreet Sou.P credit
- language switch
- utility links / social / copyright

## Typography

The final artist name may complete slowly as the user reaches the bottom.

Do not use aggressive pointer-driven typography here.

This scene should breathe.

## Line Resolution

The two-line motif returns in a resolved, restrained form under/near the oversized name. A strand may lead a final editorial rule while the pair’s identity remains legible; it is the completion of the initial name/line composition, not a new motif.

Narrative:

`haegeum strings → sound lines → works axis → final editorial rule`

## Sou.P Credit

Approved discreet vertical/edge credit.

Concept:
`CREATIVE DIRECTION & DESIGN — Sou.P`

Desktop:
- subtle immediate hover cue
- deliberate dwell may reveal hidden Korean personal copy
- exact dwell time remains a prototype decision

Mobile:
1. first tap reveals/opens the credit
2. second tap on `Sou.P` reveals the hidden personal message

The credit is a signature, not an advertisement. Its Sou.P Easter Egg belongs only to HOME Outro / Footer. ABOUT uses its own separate small Delight; do not repeat this credit interaction there or across other pages.

## CTA

Single primary CTA:
`EXPLORE ALL WORKS →`

Other links remain secondary.

## Mobile

Keep the Easter Egg discoverable without turning it into a large feature.

## Reduced Motion

Final typography can be static or use a minimal fade.

## Acceptance Criteria

- HOME ends as intentionally as it begins
- artist-name motif closes the narrative circle
- only one primary CTA
- Sou.P is subtle but discoverable
- Footer does not look like a generic website footer

## Do Not

- multiple competing CTA buttons
- generic multi-column corporate footer
- large promotional Sou.P branding
- new narrative content at the very end

---

# 19. GLOBAL SCENE-TO-SCENE CONTINUITY

Each transition must be explicitly designed.

Do not build eight isolated components and connect them with default margins/fades.

Required transition review:

- `01 → 02` Artist → Instrument
- `02 → 03` Instrument → Sound
- `03 → 04` Sound → Works
- `04 → 05` Works → Physical Album
- `05 → 06` Interactive Peak → Still Performance
- `06 → 07` Stage → Artist
- `07 → 08` Artist → Closure

For every boundary define:
- outgoing visual anchor
- incoming visual anchor
- shared line/image/object if any
- background continuity
- scroll timing
- motion intensity
- reduced-motion fallback

---

# 20. HOME LEGACY-ASSET RULE

HOME must not visually inherit the legacy site by accident.

**Do not ask “What can we reuse from the old HOME?”**

Ask:

**“What does the new HOME require?”**

Then verify whether a legacy asset genuinely satisfies that requirement.

If not:
- request a new photo
- create/generate a new background
- create a new graphic
- rebuild the 3D scene
- re-edit the media

Do not force old visuals into the new composition.

---

# 21. HOME ASSET REQUIREMENT POLICY

Current assets are sufficient to continue planning.

During production, ChatGPT/Codex must proactively identify missing or weak assets.

For every requested asset, tell the user:
1. whether work can continue without it,
2. why it improves the result,
3. exactly what is needed,
4. whether it is required or optional,
5. when it becomes blocking.

Do not wait until the final QA stage to discover that a Hero, 3D texture, or performance image is inadequate.

---

# 22. HOME PERFORMANCE STRATEGY

HOME contains several advanced effects, but they must not all run at full cost simultaneously.

Requirements:
- pause/reduce heavy offscreen work
- use responsive/adaptive asset loading
- lazy/preload intentionally
- prevent overlapping heavy animation systems
- profile the 3D scene separately
- avoid page-wide React state updates tied to pointer/scroll
- preserve native scroll responsiveness

---

# 23. HOME ACCESSIBILITY

- navigation remains keyboard accessible
- custom cursor is non-essential
- drag has alternatives
- sound requires explicit activation
- reduced motion supported
- shared transitions have fallback
- 3D has fallback
- all content remains reachable without completing an interaction
- focus states remain visible
- language switch remains accessible

---

# 24. HOME ACCEPTANCE SUMMARY

## V2.1 Hero and major-scene Visual Quality Gate — mandatory

Functional Complete and Quality Approved are separate for Hero and major HOME scenes as well as 3D. A working large title + portrait is not completion of the Moving Editorial Poster.

Review at least:
- first viewport screenshot alone works as an art poster
- typography hierarchy and three-line composition are intentional
- portrait crop feels authored, not accidental
- image/text overlap is precise; the few depth crossings are convincing
- no generic portfolio-template feeling
- no SaaS-style cards
- no repeated fade-up pattern
- no excessive rounded UI
- no unnecessary visual effect
- no animation for animation's sake
- motion remains responsive and interruptible
- mobile composition receives equivalent art-direction attention

Evidence at the later visual-review task: desktop and independently composed mobile first-viewport screenshots; the initial approximately five seconds; forward/reverse/interruptible 01→02 travel; reduced-motion/static equivalents; actual font metrics, crop/source identity and viewport. Do not invent numeric scores to substitute for visual judgment. Record Functional Complete and Quality Approved separately, with explicit user review before advancing. No visual gate was executed or passed in this documentation revision.

The first-frame quality goal does not override loading, readable navigation, contrast, input, asset fidelity or the existing 3D/Tray/Continuity gates. If photography cannot support the scale, record the missing asset rather than claiming quality approval.

HOME is approved only when:

- first impression feels premium and distinctive
- scene rhythm does not exhaust the visitor
- every scene has a narrative purpose
- scene transitions feel authored
- 3D passes Quality + Continuity Gates
- mobile feels intentionally designed
- sound never surprises the user
- legacy assets do not dictate the new design
- missing high-quality assets are proactively requested
- the final result makes the visitor think:

**“와, 정말 잘 만들었다.”**

without sacrificing usability.

---

# 25. FINAL HOME PRINCIPLE

HOME should not feel like eight sections.

It should feel like one continuous authored journey:

**ARTIST → INSTRUMENT → SOUND → WORK → OBJECT → STAGE → ARTIST → NAME**


# 26. V2.1 STRUCTURAL MOTIF / REFERENCE RATIONALE

2026-09-06 user art/motion update: **BOLD, CURATED, PURPOSEFUL**. HOME Hero and Hero→Haegeum are signature
WOW-moment candidates alongside future WORKS reorganization, Album 3D and shared detail entry. Do not default
to generic fade/simple slide or interpret restraint as minimal effects. Start expressive and curate through visual
review; compare Refined/Bold when useful. Adopt reference interaction principles and structural ideas actively,
translated through the V2 identity; do not copy exact layouts, compositions, timing values, assets, branding or code.
MASTER §6 and Motion §§1/3/37/38 own the policy. This update is documentation only during P2B and authorizes no HOME implementation.

The pair is structural, not decoration: Hero composition → Haegeum guides → Sound response → Selected Works axis → Outro resolution. A strand can change emphasis without losing the two-string/bow identity. Do not force it to animate or appear prominently in every scene; Performance and About retain their quiet roles.

Haegeum is a bowed-string instrument. Preserve micro vibration, vibration density, tension, damping, sustained friction and subtle resonance; lines remain mostly straight. No large waveform, equalizer bounce, sine-wave animation or exaggerated vertical oscillation. Scroll-only visual changes are not evidence of playing audio.

The user's recent reference-review principles are adopted as design rationale: immersive artist-world feeling, confident editorial typography, work-first personal identity, gallery/archive restraint, strong first viewport, and content depth behind elegant presentation. These are user-supplied principles, not claims of a new site-by-site reference audit in this task.

Derive an independent visual identity from Haegeum, two strings/bow, tension/resonance, physical album objects, Sanjo/Jeongak materiality and Cho Youn Kyoung photography. Do not directly copy any reference site's layout, animation, type composition, source code or unique interaction. Earlier Art Direction V1 remains historical context; V2.1 is the current HOME direction, not permission to discard the retained detailed requirements.

This is documentation only. No HOME/React/CSS, image manipulation, asset migration, audio/motion/3D, dependency change, deployment or P0E work is authorized by this revision. See [revision report](review/HOME-V2.1-REVISION-REPORT.md) for conflicts, asset needs and the STOP boundary.
