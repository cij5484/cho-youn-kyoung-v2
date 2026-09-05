# CHO YOUN KYOUNG WEBSITE V2
## 04 — HOME

**Version:** 1.1  
**Status:** Approved HOME Baseline  
**Parents:** `00-MASTER-PLAN.md`, `02-DESIGN-SYSTEM.md`, `03-MOTION-SYSTEM.md`  
**Art Direction:** Contemporary Editorial / Ivory  
**Narrative Structure:** Artist → Instrument → Sound → Works → Album Object → Performance → Artist Reveal → Closure

---

# 1. HOME OBJECTIVE

HOME is not a conventional landing page.

It is the primary authored experience of the V2 website.

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

Approved intensity:

```text
01 HERO             ★★★★★
02 HAEGEUM          ★★★★☆
03 SOUND            ★★★☆☆
04 SELECTED WORKS   ★★★★☆
05 ALBUM 3D         ★★★★★
06 PERFORMANCE      ★★☆☆☆
07 ABOUT            ★★☆☆☆
08 OUTRO            ★★★☆☆
```

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
- Portrait occupies roughly the right 55–65% visual region, but avoid a rigid 50/50 split
- Intentional empty grid columns
- Transforming Editorial Navigation integrated into the Hero composition

## Navigation

Initial Hero state:
- navigation items are positioned as part of the editorial composition
- navigation remains clearly readable and discoverable

After scroll:
- navigation transforms into a compact functional header

Do not implement a standard fixed header from the first frame unless required as a fallback.

## Portrait Sequence

Start with the approved side/back close-up portrait.

The face should not be immediately presented as a full frontal identity shot.

On initial scroll, naturally transition toward the approved 3/4 back portrait where the haegeum becomes more visible.

**Do not use a click/drag puzzle to reveal the artist.**

The reveal must be intuitive and scroll-driven.

## Typography Layering

Typography and portrait may cross in depth.

Approved:
- only 1–2 precise front/back crossings
- some letters may appear behind the subject, others in front

Do not repeatedly switch z-depth across every line.

The mask must respect face, silhouette, clothing, and portrait crop.

If the layering is not precise enough, simplify rather than accepting a mediocre mask.

## Parallax Layers

Suggested:
1. background
2. fine line
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

Possible direction:
```text
CHO
YOUN
KYOUNG

[ PORTRAIT ]

HAEGEUM ARTIST
```

No pointer parallax.

Use scroll-based depth only.

## Reduced Motion

- remove strong parallax
- use simple mask/fade
- preserve typography/portrait hierarchy

## Asset Requirements

Current portrait assets are sufficient for planning.

Before final implementation, verify:
- source resolution
- mobile crop
- masking edge quality
- tonal compatibility with Ivory background

If better source material materially improves the Hero, request it.

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

The Hero line motif should become the visual bridge into the haegeum scene.

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
3. `RESONATOR`
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

Do not add long instrument-history text.

## Continuous Line

One primary line visually connects all four stages.

The line may begin as an abstract editorial rule and progressively become associated with:

- string
- bow
- vibration
- resonance

The line must maintain narrative continuity across the sequence.

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
- one line clearly connects all stages
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

This is the first explicit listening moment on HOME.

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
- sound begins immediately
- line movement responds subtly
- response should feel organic, not like a generic audio visualizer

Avoid:
- equalizer bars
- large waveform
- exaggerated beat animation

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

One sound line extends horizontally and becomes the axis of the Selected Works drag rail.

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
- asymmetric horizontal drag rail
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
- direct drag
- inertia
- soft settle / restrained snap
- custom cursor `DRAG`

Mobile:
- swipe
- vertical page scroll must remain reliable

## Detail Entry

Strong shared-image transition.

The selected image/artwork should expand/reposition into the detail Hero where possible.

Fallback:
- transform + opacity transition

Navigation must remain functional without shared transition support.

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
- three 2026 albums
- one 3D collection
- Ivory environment
- sculptural grouping
- selected album comes forward
- unselected albums recede
- selected album becomes rotatable

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

**Fallback to one high-quality 3D album object that swaps between albums.**

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

This is HOME’s primary dark contrast moment.

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

This is the first clear frontal identity reveal.

Do not continue hiding the face here.

## Composition

Approved:
- one strong front-facing portrait
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

Before production, review front-facing portrait quality.

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

The two-line motif resolves into a final simple hairline under/near the artist name.

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
