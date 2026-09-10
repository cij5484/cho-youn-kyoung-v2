# CHO YOUN KYOUNG WEBSITE V2
## 07 — ALBUM DETAIL

**Version:** 1.3\
**Status:** Approved ALBUM DETAIL Baseline  
**Parents:** `00-MASTER-PLAN.md`, `02-DESIGN-SYSTEM.md`, `03-MOTION-SYSTEM.md`, `04-HOME.md`, `06-ALBUMS.md`  
**Page Role:** Physical Album Experience + Editorial Listening Archive

## 2026-09-10 — LOCAL autonomous exhibition study / REVIEW READY

User authorized a new concept and implementation, independent of legacy layout/function order.
Owner: `src/album-detail`; localhost routes `/album/:slug/` in the existing 4180 development shell.
Concept: “한 장의 종이에서, 한 줄의 소리로.” Oversized type and one paper object → explicit OPEN →
printed editorial layers/reader → dark listening scene → people → another record → WORKS.
Native scroll/CSS perspective/WAAPI retain a selected cover across DOM route slots; this is a shared-image
handoff, not a persistent WebGPU renderer. No new dependencies or Blender execution in this pass.
HOME is unchanged. WORKS links use the study only on localhost; public-reference destinations remain elsewhere.
Haegeum/Janggu identity reuses the two-point contract; chapter paths are Album-owned, with static reduced motion.
Four albums now connect authentic CD labels, 40 booklet pages and 29 user-controlled audio tracks from the
legacy public sources (asset manifest). Han Beom-su has no dedicated interior photograph in that source;
its booklet artwork supplies the interior, rather than claiming documentary package accuracy.
The user-supplied repeat-02 tray GLB loads only on OPEN, rendered on demand inside the existing CSS-folding
package; its neutral disc is hidden under the authentic DOM CD label. This is a local prototype, not Tray Lab approval.
Desktop composition is bounded to 1440–1640px; booklet mouse tilt/lift is stronger, with mobile layout retained.
The server draft, public audio approval and production record publication remain unchanged. Editorial lines are V2 study copy.
Sources investigated: supplied Codrops persistent transitions (2026-06-30), cinematic scroll (2025-11-19),
Santamaria world (2026-04-28), shader reveal (2025-10-08), Palmer/Flip (2025-09-01), layered zoom (2025-10-29),
mood gallery (2026-03-09), and actual scene/lifecycle sources in biazo/codrops-animate-shaders-with-gsap,
VishankSharma/iphone-cinematic-showcase, jawadhaider0024/jawad-portfolio-v2 and Mayanshh/portfolio.
Only principles were reinterpreted; no reference branding, layout, assets or source code was copied.
Validation: type/lint/development Preview build and focused fatal-runtime inspection. No release/visual-quality approval,
PR, push, merge or deployment. Rollback only this study folder and its explicit development/WORKS entry diff.

### 2026-09-10 user revision — global album audio / LOCAL implementation

The user explicitly superseded the route-scoped audio policy below: Album playback and its mini player now
belong to the persistent local application shell (`src/audio/global-playback.ts`, `GlobalAudioPlayer.tsx`).
Internal navigation preserves the same media element, position and volume. New track selection replaces the source;
close/ended/error releases the signature, while pause retains quiet motion near the player's separate progress track.
`src/signature/audio-handoff.ts` borrows actual page point positions, velocities and available trail history;
the page paths keep running as return targets. `AudioSignature.tsx` steers those states without a coordinate reset.
Reduced motion uses stable markers. HOME04 layout, ribbon and choreography remain unchanged.
`instrument-response.ts` reuses the existing feature binding and percussion pulse: live harmonic/sustained bands
drive Haegeum, bass/body attack plus broadband flux drives Janggu. This estimates characteristics from the mixed
recording; it does not isolate instrument stems. Existing precomputed HOME data is blended only for the matched
Han Beom-su Jungjungmori original's 166–184 second interval, never reused across unrelated tracks.
The source R2 response lacks CORS permission. A restricted localhost Vite audio proxy enables live analysis;
no remote CORS configuration, bulk audio migration, production routing or deployment is part of this change.
Selecting the separate HOME preview pauses the global record to avoid overlapping recordings.

User refinement: the player pair now reuses HOME's free bow path, Janggu activity clock and perspective projection
across most of the progress-bar width, with a wider vertical/depth orbit and depth-weighted trails.
This supersedes the near-straight/subtle-motion restriction in §27 for this local player signature only.
Sustained harmonic changes drive bow speed/range and fine vibration; low/body transients can trigger weighted
Janggu strikes without a treble edge. These remain mixed-recording estimates. Pause eases into a small idle orbit;
handoff, return, headless progress controls, reduced motion and the HOME choreography are preserved.
Follow-up correction: the projected orbit is centered on the progress track and smoothly bounded by the actual
mini-player frame; docked trails are clipped to that frame, including after resize. Violet remains the Haegeum
signature; progress and volume fills use warm grey `#746b5d` to keep the musical trace distinct from controls.
Both control tracks are 4px with their 44px input targets preserved. Speaker activation toggles mute/restores
the previous audible volume; hover/focus or touch activation exposes the vertical control. Haegeum articulation
now reads positive harmonic flux at 500–4000Hz with HOME's 18/180ms response; Janggu detection is unchanged.
The user subsequently authorized PR/merge for Mac continuation. The localhost-only study and audio proxy remain
available through `npm run dev:interaction`; merging does not enable the study on the static Pages site.

## 2026-09-08 연구 반영 — 다음 구현 후보

Hybrid Object Narrative + Editorial Detail을 유지한다. 현재 상세 URL은 **neutral fixture**이며
아래 내용은 완성된 player·reader·3D 또는 공개 음원 승인이 아니다.

- **목적 / 첫 화면:** 닫힌 package와 title/type/year, 명확한 OPEN action. 읽기·트랙으로 가는 DOM
  경로는 3D 로딩과 무관하게 제공한다.
- **대표 기법:** 사용자가 남긴 실제 pose에서 물건을 열고 booklet/disc를 DOM reader/player로 이어간다.
  shared geometry 원리를 package에 맞게 해석하며 새 route에 임의 기본 pose로 reset하지 않는다.
- **자산 / 모바일:** 치수·tray/disc·booklet·공개 track source·credits가 필요하다. 모바일은 horizontal
  object intent와 vertical page scroll을 분리하고 static cover+DOM 정보도 완결되게 한다.
- **다음 단위:** 실제 album 1개의 DOM editorial detail와 source-availability 검토를 먼저 수행한다.
  Blender capability, Tray Lab, geometry/material/interaction owner gate를 변경하거나 생략하지 않는다.
  live 3D handoff는 해당 source가 증명된 후 별도 통합한다.

정보·오디오 수명·이동·자료 요구의 세부 후보는 [연구 §4.4](review/EXPERIENCE-PROTOTYPE-RESEARCH.md#44-album-detail--물건을-열고-음악을-읽음)를 참조한다.
이번 연구로 정식 상세 구현이나 package QUALITY APPROVED를 부여하지 않는다.

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

User revision 2026-09-10: maintain a site-wide persistent mini player for Album playback, including internal
route changes to another album, WORKS, HOME, MEDIA, ABOUT or the locale counterpart. Tracks, reader and editorial
views read the shared playback state; page teardown must not pause or dispose its media element.

The selected recording continues until explicit pause, replacement, close, completion or a playback error.
Pause retains quiet two-point motion around the progress bar; close/completion returns the pair to the current page.
Full document reloads, external-site navigation and tab closure are outside this in-app persistence contract.
Implementation remains local-only until a separately authorized delivery task supplies production audio transport.

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
