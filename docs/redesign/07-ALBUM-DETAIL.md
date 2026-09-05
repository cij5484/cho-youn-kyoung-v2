# CHO YOUN KYOUNG WEBSITE V2
## 07 — ALBUM DETAIL

**Version:** 1.2\
**Status:** Approved ALBUM DETAIL Baseline  
**Parents:** `00-MASTER-PLAN.md`, `02-DESIGN-SYSTEM.md`, `03-MOTION-SYSTEM.md`, `04-HOME.md`, `06-ALBUMS.md`  
**Page Role:** Physical Album Experience + Editorial Listening Archive

---

# 1. ALBUM DETAIL OBJECTIVE

Album Detail is one of the highest-quality pages in V2.

It must combine:

- physical album presence
- live 3D interaction
- listening
- booklet reading
- album story
- credits
- related works

without forcing every function into a single monolithic 3D mode.

Core principle:

**3D is used for physicality.  
HTML/DOM is used for reading and information.**

---

# 2. APPROVED PAGE ARCHITECTURE

Approved:

## Hybrid Object Narrative + Editorial Detail

The top of the page is a continuous 3D object experience.

The lower page becomes a quiet editorial reading/listening experience.

Conceptual flow:

```text
ALBUMS pre-render
→ LIVE 3D CLOSED PACKAGE
→ OPEN PACKAGE
→ BOOKLET + DISC REVEAL
→ ALBUM STORY
→ TRACKS / PLAYER
→ DIGITAL BOOKLET
→ CREDITS
→ RELATED WORKS
```

Do not rebuild the legacy all-in-one 3D mode architecture.

---

# 3. ENTRY FROM ALBUMS

Preferred:

**Production 3D-derived pre-render → matched live 3D handoff**

The live object should begin from the same visual state as the listing object where possible.

Match:
- perspective
- camera
- FOV
- rotation
- scale
- position
- lighting
- material tone

Fallback hierarchy:

1. precise 2D → live 3D handoff
2. shared image transition
3. simple route transition

Never preserve an imperfect handoff for technical ambition.

---

# 4. CLOSED PACKAGE HERO

First-screen information is intentionally minimal.

Approved:

- Album title
- Type
- Year
- `OPEN ALBUM →`

The 3D package is the primary visual subject.

Do not place:
- full tracklist
- long description
- large credits
- streaming link clusters

on the initial Hero.

---

# 5. CLOSED PACKAGE INTERACTION

Desktop:
- drag to rotate
- natural inertia
- contextual `ROTATE`
- stable object center

Mobile:
- rotation only within the object interaction area
- vertical page scrolling has priority unless horizontal rotation intent is clearly established

Reduced motion:
- no auto movement
- drag may remain if comfortable
- simplified transitions

---

# 6. OPEN ALBUM INPUT

Approved:

## Explicit `OPEN ALBUM` action

Do not auto-open on scroll by default.

Do not require the user to perform a physical swipe gesture to open the cover.

The action must be clear and intentional.

---

# 7. OPENING SEQUENCE

Approved:

**Natural physical opening**

Sequence concept:

```text
CURRENT USER ROTATION
→ rotational velocity settles
→ object/camera framing stabilizes
→ cover hinge begins
→ package fully opens
→ booklet + disc are visible
```

The opening must begin from the user's actual current object state.

Do not reset the album to a hard-coded pose before opening unless the reorientation itself is smoothly animated and visually justified.

---

# 8. OPENING STATE CONTINUITY

Mandatory.

The end of each stage must equal the beginning of the next stage.

Continuity may include:

- position
- rotation
- scale
- angular velocity
- camera
- target
- cover hinge angle
- tray state
- booklet state
- disc state
- material/opacity state
- selection state

No visible state jumps are accepted.

---

# 9. OPEN STAGE

Approved:

## Booklet + CD visible simultaneously

The user sees:
- booklet
- CD
- tray
- package interior

Possible contextual hints:
- `READ BOOKLET`
- `LISTEN`

Do not automatically force the user into Booklet or Player mode.

---

# 10. CD TRAY — CRITICAL REALISM COMPONENT

The transparent CD tray is a critical realism component.

It is not a minor accessory.

The user is not expected to model it manually.

Implementation may use:
- procedural R3F/Three.js geometry
- Blender-authored GLB
- another maintainable 3D asset workflow

depending on which produces the best perceptual quality and maintainability.

Before relevant production geometry work, complete the required
[Blender Capability Spike](03-MOTION-SYSTEM.md#blender-capability-spike) and review its APPROVE / REVISE / REJECT
decision. Blender is not yet selected or tested. A successful spike makes Blender-authored CD Tray,
Digipak, Booklet and Disc active candidates based on perceptual quality, repeatability and mobile cost.
Simple, accurate procedural geometry remains a candidate when it is the better fit; Blender need not wait
for a failed procedural attempt. This supersedes the former procedural-first / Blender-only-as-escalation rule.
The mandatory Tray Lab and all quality requirements below remain unchanged. P0F creates no tray or model.

---

# 11. CD TRAY PERCEPTUAL TARGET

The tray does not need CAD-level manufacturing fidelity.

It must be immediately recognizable as a CD tray.

Prioritize:

- thin transparent tray plate
- circular CD recess
- center hub
- four support/recess forms
- outer lip
- believable CD seating height
- edge highlights
- visible underlying print through clear plastic

Avoid unnecessary micro-detail that does not materially affect perception.

---

# 12. CD TRAY GEOMETRY / MATERIAL SEPARATION

Geometry responsibilities:

- plate
- circular recess
- hub
- hub teeth
- support structures
- edge lip

Material responsibilities:

- transmission
- IOR
- roughness
- thickness
- clearcoat/specular response
- opacity handling

Do not modify geometry to compensate for a material problem.

Do not make the plastic gray merely to make it visible.

The transparent tray should be visible primarily through light, edge, reflection, refraction, and underlying artwork.

---

# 13. TRAY LAB

Mandatory separate isolated development environment:

`/lab/album-tray`

Development sequence:

1. empty tray
2. seated CD
3. underlying printed panel
4. lighting/material
5. disc release/lift
6. integration into full package

The Tray Lab Quality Gate must pass before the whole Album Detail package can be Quality Approved. Functional completion of the package cannot bypass this gate. The target is perceptual recognition as transparent CD plastic, not CAD-level reproduction of injection-molded manufacturing details.

---

# 14. CD TRAY QUALITY GATE

Pass criteria:

- reads immediately as transparent CD tray
- plate thickness is believable
- recess is visible
- hub is convincing
- CD does not appear to float
- CD seating height is correct
- underlying print remains visible naturally
- plastic does not look like glass
- plastic does not look like opaque gray plastic
- highlights are controlled
- disc removal starts continuously from the seated state
- mobile GPU cost remains acceptable

---

# 15. TRAY ASSET STATUS

Current user-supplied reference photos are sufficient for:

- planning
- prototype modeling
- initial proportion study
- hub/recess visual study

Current work is not blocked.

Later, if final precision requires it, request:
- simple front tray photo on neutral background
- 45-degree tray photo
- hub close-up
- basic width/height/thickness measurements
- recess/hub diameter if available

Do not request these unless they materially improve the final result.

---

# 16. BOOKLET EXPERIENCE

Approved:

## 3D Booklet Extraction → 2D Reader Handoff

3D is used to communicate:
- booklet exists physically
- booklet is removed from the package

2D is used to:
- read accurately
- navigate pages
- zoom
- access content

Do not force reading into a 3D booklet view.

---

# 17. BOOKLET EXTRACTION

Concept:

```text
OPEN PACKAGE
→ select BOOKLET
→ booklet lifts from package
→ moves toward camera
→ rotates toward screen plane
→ matched handoff into 2D reader
```

The transition must preserve position/scale/orientation continuity.

If the handoff cannot be made cleanly, simplify.

---

# 18. DIGITAL BOOKLET READER

Approved:

## Near-Fullscreen Editorial Reader

Desktop:
- centered spread
- large Ivory breathing room
- minimal controls
- previous/next
- page indicator
- back/close

Mobile:
- single page
- swipe
- previous/next
- pinch zoom
- page indicator

Do not shrink desktop spread onto mobile.

---

# 19. BOOKLET PAGE TURN

Approved:

## Subtle Paper Turn / Curl

The page may bend slightly.

Do not simulate dramatic, slow, fully physical paper flapping on every turn.

Reading speed and comfort come first.

Fallback:
- simple slide/fade

---

# 20. BOOKLET ZOOM

Required.

Desktop:
- explicit zoom control and/or click-to-zoom
- wheel behavior only if it does not conflict with page navigation

Mobile:
- pinch-to-zoom

The booklet must remain readable on small screens.

---

# 21. BOOKLET AUDIO CONTINUITY

Music does not stop when the user opens the booklet inside the same Album Detail route. The reader is internal UI, not a different audio-owning route.

The Persistent Mini Player remains accessible.

Do not auto-pause audio on reader entry.

---

# 22. BOOKLET DOWNLOAD

If a public booklet PDF is available and approved for distribution:

Provide a small secondary action:

`DOWNLOAD BOOKLET ↗`

The custom reader remains the primary web experience.

Do not use the browser PDF viewer as the main reader.

---

# 23. DISC → AUDIO PLAYER

Approved:

## 3D Disc → Editorial Audio Player

Concept:

```text
CD SEATED
→ select CD
→ hub release
→ small physical lift
→ disc clears tray
→ disc moves forward
→ track interface appears
```

CD motion must begin exactly from the seated state.

---

# 24. DISC PHYSICAL CONTINUITY

The first few millimeters of disc release are more important than a dramatic free-flight animation.

Do not teleport the CD upward before starting the player animation.

The hub release / lift / clear sequence must feel continuous.

---

# 25. TRACK LIST

Approved:

## Large Editorial Track List

Each row includes:

- track number
- title
- duration

Only the active track gets expanded player information.

Avoid application-dashboard styling.

---

# 26. TRACK PLAYER CONTROLS

Required desktop controls:

- Play / Pause
- Previous Track
- Next Track
- Seek / progress
- Current Time
- Duration
- Volume Slider
- Mute / Unmute

Volume behavior:
- preserve volume across track changes within the same Album Detail route
- unmute restores prior volume
- no autoplay

Source truth:
- no valid playable source → unavailable / disabled / coming soon with a clear label
- do not advance time, spin the disc as playback, or mark playing without actual playback
- remove legacy silent preview clock behavior
- distinguish loading/buffering, play rejection and media failure from real playing

Mobile volume is required but must be capability-tested in P0 or a bounded Audio spike on real browsers. Do not infer support from the property existing. Verify actual volume changes, mute/unmute and state reporting. If unsupported, report the limitation and a capability-based UX/fallback (for example device-volume guidance with genuinely working controls). Do not force a workaround or present an ineffective slider. Any changed UX must be reviewed before implementation.

---

# 27. AUDIO-REACTIVE TWO-LINE SYSTEM

The player reuses the HOME sound language in a more functional form.

Two lines may react to the currently playing audio.

Important:

**The haegeum is a bowed-string instrument.**

Avoid:
- large vertical movement
- bounce
- percussive impact
- exaggerated waveform shapes

Prioritize:
- micro-vibration
- tension
- damping
- vibration density
- subtle shimmer
- sustained friction/resonance

The lines should remain visually close to straight.

---

# 28. AUDIO ANALYSIS STRATEGY

Preferred:

## Precomputed Motion Envelope + Live Audio Response Hybrid

Possible use:
- precomputed dynamic envelope for stable/repeatable macro behavior
- Web Audio live analysis for subtle micro-response

This approach is preferred if it improves consistency and performance.

Do not over-engineer if live analysis alone already produces the required subtle result.

---

# 29. DISC PLAYBACK MOTION

Allowed:

- playback starts → disc begins slow rotation
- pause → disc smoothly decelerates
- active player → subtle surface highlight change

Avoid:
- disc bouncing to beat
- large scale pulses
- obvious DJ-style visualizer behavior

---

# 30. PERSISTENT MINI PLAYER

Approved.

When audio continues outside the Track section **within the same Album Detail route**, show a compact persistent player.

Scope includes Tracks, Booklet Reader, Credits, editorial scrolling and internal 3D/DOM transitions. The audio session is owned by the Album Detail route and survives internal view changes.

When navigating to any different route (another album, WORKS, HOME, MEDIA, ABOUT, and other paths), end playback and release the old route's audio resources. An optional short fade-out must not block navigation or let playback continue on the destination. Cancelled navigation does not end the current session; committed departure does. A locale pathname change is a route departure; in-page anchors/reader state are internal.

No site-wide global audio player. Going back to this route does not automatically resume playback. Hide/unmount its mini player on departure. A mini player may be rendered in an overlay portal for layout, but its lifecycle remains route-scoped.

Desktop:
- thin bottom bar
- track title/number
- play/pause
- progress
- volume visible
- mute

Mobile:
- thin bottom bar
- track title/number
- play/pause
- progress
- volume icon
- tap volume icon to reveal compact volume control

The player must not cover important content.

---

# 31. MINI PLAYER VOLUME

Desktop:
- visible volume slider

Mobile:
- compact expandable volume control where actual programmatic volume control is supported
- capability-based reviewed fallback when unsupported; never a fake slider

Do not permanently occupy large mobile width with a full volume slider.

---

# 32. EDITORIAL CONTENT ORDER

Approved:

1. Album Story
2. Tracks / Player
3. Digital Booklet
4. Credits
5. Related Works

The open package provides direct access to Booklet and Listen, so the editorial order does not prevent fast access to music.

---

# 33. ALBUM STORY

Approved:

## Large statement + short editorial body

Use:
- large statement / pull quote
- 2–4 short paragraphs
- generous whitespace

Avoid:
- long academic article
- dense wall of text
- repeated cover imagery unless useful

---

# 34. TRACKS SECTION VISUAL ROLE

Music is the primary content.

The track list should feel like discography/editorial typography rather than app UI.

Use:
- strong alignment
- hairlines
- restrained active state
- two-line signature only on the active track/player

---

# 35. CREDITS

Approved:

## Typographic Credits Grid

Examples:

```text
PERFORMER        Cho Youn Kyoung
PERCUSSION       Lee Youngsub
RECORDING        ...
MIXING           ...
MASTERING        ...
DESIGN           Soul.P
```

Use small Sans typography and generous spacing.

Do not create team-member cards.

---

# 36. RELATED WORKS

Approved:

## Previous / Next Album

Use one previous and one next album where available.

Keep the visual treatment large enough to invite continued exploration.

Do not repeat the whole WORKS grid.

---

# 37. 3D → EDITORIAL TRANSITION

Approved:

The opened album does not abruptly disappear.

As the user scrolls:

- open album slowly recedes / moves upward
- motion intensity decreases
- Album Story enters
- Ivory environment remains coherent

The user should feel the page moving from physical experience into reading mode.

---

# 38. MOBILE HERO

Approved:

## Large 3D Object + Minimal Information Below

The 3D object occupies the primary upper area.

Below:
- title
- type
- year
- `OPEN ALBUM`

Do not use full-screen 3D by default if it harms scrolling.

---

# 39. MOBILE ROTATE VS SCROLL

Critical rule:

**Vertical scrolling must always win unless horizontal rotation intent is clearly established.**

Use gesture-direction detection.

Do not capture every touch drag as 3D rotation.

If reliable intent detection cannot be achieved, use a safer explicit rotate mode.

---

# 40. MOBILE OPEN

Tap `OPEN ALBUM`.

Run an automatic, mobile-specific opening sequence.

Do not require swipe-to-open.

---

# 41. MOBILE BOOKLET

Approved:

- single page
- swipe
- previous/next
- pinch zoom
- page indicator

Do not render a desktop spread at unreadable size.

---

# 42. MOBILE AUDIO PLAYER

Approved:

- persistent bottom mini player
- expandable volume control
- direct track navigation
- no autoplay
- clear tap targets

---

# 43. MOBILE 3D QUALITY

Approved:

## Adaptive live 3D

Possible tiers:

### HIGH
- live 3D
- higher DPR
- better shadows/material quality

### MEDIUM
- controlled DPR
- simplified shadow/reflection

### LOW
- simpler lighting/material
- reduced effects

### STATIC FALLBACK
- high-quality pre-render/static visual

Do not force one quality tier on all mobile devices.

---

# 44. 3D QUALITY APPROVAL

Album Detail 3D has two completion states:

## Functional Complete
Features work.

## Quality Approved
The whole experience is production-ready.

Quality Approved requires:

- State Continuity Gate passed
- CD Tray Quality Gate passed
- package opening passed
- disc removal passed
- booklet extraction passed
- mobile gesture passed
- lifecycle/memory passed
- adaptive quality passed
- fallback passed
- visual coherence with V2 passed

---

# 45. LEGACY POLICY

The existing Album Detail implementation is a technical reference.

Do not copy the monolithic legacy architecture.

Possible donors may include:

- geometry math
- disc motion concepts
- texture handling
- preload strategy
- audio logic
- render scheduling ideas
- cleanup patterns

Reuse only after architecture/quality review.

Do not preserve old camera/light/mode behavior simply because it already works.

---

# 46. ASSET REQUIREMENTS

Before production approval, verify per album:

- front artwork
- back artwork
- spine
- CD label
- booklet pages
- interior panel artwork
- exact package dimensions
- tray reference
- track audio
- Korean/English metadata
- credits
- public booklet PDF if downloadable

Current materials are sufficient for continued planning.

Request missing assets only when they become meaningful to fidelity or implementation confidence.

---

# 47. ACCESSIBILITY

Requirements:

- semantic album information
- keyboard-accessible open/read/listen actions
- Booklet previous/next buttons
- zoom controls
- audio controls labeled
- volume control labeled
- visible focus
- reduced motion
- 3D fallback
- no audio autoplay
- non-3D access to all factual content

3D is enhancement, not a content gate.

---

# 48. PERFORMANCE

Requirements:

- 3D Lab before page integration
- Tray Lab before package approval
- adaptive DPR
- offscreen render reduction
- explicit texture lifecycle
- preload only justified assets
- no unnecessary simultaneous render loops
- audio visualization should remain lightweight
- reader should not keep unused high-resolution textures resident indefinitely

---

# 49. DO

- prioritize state continuity
- separate physical interaction from reading
- keep 3D physically convincing
- keep player functional
- keep audio visualization subtle
- use real design source assets
- simplify when quality is higher through simplification
- request better source material when it materially improves fidelity

---

# 50. DO NOT

- rebuild one giant monolithic 3D mode controller
- make the user read text inside 3D
- auto-open album on scroll
- force swipe-to-open
- bounce audio lines
- make transparent tray gray to fake visibility
- accept floating CD
- patch geometry to fix material issues
- keep music controls inaccessible while scrolling
- inherit legacy scene values without review

---

# 51. ACCEPTANCE CRITERIA

Album Detail is approved when:

- listing-to-detail handoff is visually coherent
- closed package feels physical
- opening sequence is continuous
- open package clearly exposes booklet and CD
- tray reads as a believable CD tray without unnecessary over-detail
- booklet extraction → reader is seamless
- booklet remains readable on desktop/mobile
- disc release feels physical
- track player is functional and elegant
- volume/mute/seek work correctly
- two-line response reflects bowed-string behavior
- persistent player remains unobtrusive
- editorial content is calm and readable
- mobile scroll/rotate conflict is solved
- 3D passes all quality gates
- fallback experience still feels intentional

---

# 52. FINAL ALBUM DETAIL PRINCIPLE

The visitor should feel:

**“I can hold the album, open it, listen to it, read it, and understand it.”**

without feeling trapped inside a 3D demo.
