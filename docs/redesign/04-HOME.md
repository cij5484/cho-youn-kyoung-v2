# CHO YOUN KYOUNG WEBSITE V2
## 04 — HOME

**Version:** 2.1\
**Status:** Hanji/Profile and 03·06 Scene Magnet selected as Canonical; slow/mobile 08 and 06 built fix implemented; delivery/visual review in HANDOFF\
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
| 04 SELECTED WORKS | WORK | 4/5 | Desktop 190svh / 90svh travel; mobile 250svh / 150svh travel | Restored five-work native-scroll ribbon; one large active image and readable ledger |
| 05 ALBUM OBJECT | OBJECT | 5/5 | 110–140vh | Second major visual peak; collectible objects |
| 06 PERFORMANCE | STAGE | Entry peak → quiet hold | Shares one 330svh sequence with 07; mobile 320svh | Stage Aperture + 09 / 22 Date Geometry; official poster resolves before the handoff |
| 07 THE ARTIST | ARTIST | Reveal → quiet hold | Same 06→07 sequence, not a second spacer | Suit / Hanbok Split Mask; subtle photo/mask/type depth and a held identity frame |
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

## Later-HOME typographic composition — current sprint direction

Letters are part of the composition, not labels distributed over spare corners. Preserve meaning while consolidating
low-priority copy. Each scene has one reading order, deliberate baselines, tracking/line-height, and a clear relationship
between its main image and text. Do not repeat oversized English banners across all scenes.

| Scene | Current hierarchy / signature |
|---|---|
| Works | One large authentic artwork first; a moderate Korean heading; one title/year/type ledger and five numbered controls on desktop and mobile. Reduced motion attaches captions to the static images. |
| Album | A short single-line serif heading gives space to the physical object; one grouped selection/metadata band. Handling instructions and face controls share a baseline. |
| Performance | Stage Aperture reveals the 9/22 official poster; separate 09 / 22 geometry aligns with the opening. Title/venue stay readable beside or below the image. No giant ON STAGE overlay. |
| Artist | One large suit/hanbok composition with a shared split seam; Cho / Youn Kyoung and 조윤경 form a separate identity group. No tilted plate, repeated banner or text across the face. |
| Outro | The largest three-line English name is the closing graphic event; invitation and signature remain grouped beneath it. |

Reference review was brief and secondary to current-code work. Existing [P2K reference principles](review/P2K-INTERACTION-PROTOTYPES.md)
remain the research owner. Additional primary-site DOM/CSS inspection on 2026-09-07 considered
[Obys](https://obys.agency/), [DIA](https://www.dia.studio/) and [Bureau Borsche](https://bureauborsche.com/).
DIA's compact navigation changes at narrow widths; Bureau Borsche groups consistently sized index text separately from
large project media. These support compact secondary information and image-led hierarchy. Obys' main presentation is
canvas-based, so its extracted HTML does not establish rendered type scale or animation quality; the existing continuity
reference remains inspiration, not newly verified visual evidence. No exact layout, code, media or branding was copied.

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
- User-selected P2C **B — Bold Cropped** supersedes the earlier A 58–62% optical guide: a central/right photograph begins around 26.5% in the refined desktop composition and fills the edge. Preserve the strong crop; breakpoint geometry belongs to the selected Hero guide.
- Intentional empty grid columns
- Artist name + MENU trigger integrated into the Hero composition; final scroll behavior reviewed with the Hero
- Two extremely thin structural lines
- Controlled depth and subtle parallax

**MOVING EDITORIAL POSTER** is the canonical Hero direction. The first viewport must work as an independent art poster/editorial artwork, not merely a large headline next to a portrait. The three-line CHO / YOUN / KYOUNG name is graphic structure: B uses a larger three-row graphic field, with size constrained by both width and stable viewport height and precision measured from actual glyphs. The former 55–65% name-height guide is a historical A reference, not a requirement to shrink approved B.

## Navigation

User correction, 2026-09-06:
- initial state is CHO YOUN KYOUNG at top left + MENU trigger at top right
- there is no separate left-side vertical navigation in the initial frame
- the former initial-link → compact-header morph requirement is canceled
- menu links appear within the opened editorial panel; P2B Bold trigger/panel/item motion is QUALITY APPROVED FOR HERO INTEGRATION / FROZEN; Refined is archived Lab/evidence only. Preserve canonical Bold tuning until actual Hero composition review; Safari real-device and final HOME QA remain open
- do not add a replacement navigation morph before actual Hero composition

P2C selected B; P2D keeps these same two elements with a transparent surface and Ink trigger, preserving frozen Bold motion. Actual Mac Safari smoke QA is recorded in the P2D result; physical mobile and final HOME QA remain open. No separate header morph is introduced.

## Portrait Sequence

Start with a side/back or partial-face close-up. The approved candidate family is the existing purple hanbok portrait set, especially side/back close-ups. The user confirmed attachment 3→7 and selected B. Final high-resolution source and refinement quality approval remain separate.

The face should not be immediately presented as a full frontal identity shot.

On initial scroll, preserve the planned progression toward a 3/4 back portrait where the haegeum becomes more visible. A clear frontal/clear 3/4 identity reveal belongs to Scene 07; this earlier instrument reveal must not use up that later payoff.

**Do not use a click/drag puzzle to reveal the artist.**

The reveal must be intuitive and scroll-driven.

## Typography Layering

Typography and portrait may cross in depth.

Approved:
- the original A used 1–2 precise crossings; approved B instead uses one consistent photographic boundary across its three-line type field
- some letters may appear behind the subject, others in front

Do not repeatedly switch z-depth across every line.

B uses identical type geometry on both sides of one photographic aperture, not arbitrary per-letter depth switches or a claimed silhouette cutout. Respect face, clothing and crop; retain the approved three-line field while keeping the aperture boundary exact.

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

The user supplied seven authentic purple-hanbok PNGs and explicitly confirmed attachment **3 → 7** for the initial and first-scroll portraits. Native dimensions are 1023×1537 and 1024×1536; these support the P2C comparison but do not establish final large/high-DPR quality.

P2C, 2026-09-06: **B — Bold Cropped is APPROVED AS THE CANONICAL HOME HERO VISUAL DIRECTION**. A/C remain [comparison evidence](../../P2C-RESULT.md), not runtime choices. [Hero guide](review/HOME-HERO-VISUAL-PROTOTYPE.md), [source audit](review/HOME-HERO-ASSET-READINESS.md) and [P2D result](../../P2D-RESULT.md) own the selected refinement. P2B remains frozen. `src/hero` is reusable source mounted only by the development Lab; production HOME remains unimplemented. The further 42-file folder contains no higher-resolution replacement. P2D result is now user approved. Composition **APPROVED**; Bold Cropped visual direction **APPROVED**; motion / interaction **LOCALLY VERIFIED**; portrait assets **PROVISIONAL**; final Retina quality **PENDING HIGH-RES SOURCE**. The current approximately 1024×1536 pair does not block subsequent authorized HOME work. When larger originals of attachments 3 and 7 arrive, replace their asset references and repeat Hero Retina QA. Physical-mobile and final HOME QA remain separate. Delivery is authorized before the separately bounded P2E transition prototype; no subsequent scene is authorized.

The Lab uses a photographic aperture with matching type clipping, without claiming a transparent silhouette mask. The photographic aperture closes then reopens to the instrument portrait under direct, reversible scroll; the selected B alone runs that handover; A/C survive as historical evidence. P2D adds settled native scroll and a guaranteed closed crossing frame for rapid forward/reverse input. Input-driven motion is tested; the canonical short entrance remains a later selected-direction refinement. No full Hero→Haegeum scene is implemented.

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

P2E [development prototype](review/HOME-HAEGEUM-TRANSITION-PROTOTYPE.md) implements one shared stage and 155svh travel including the Hero exit, with separately authored mobile and a static four-stage fallback. Local verification is complete and the user approved this canonical visual direction. P2E delivery succeeded. P2F refines the same choreography into a body-anchored full-object pullback and independently framed mobile climax. The user subsequently approved P2F: **QUALITY APPROVED / FROZEN**. Native Safari motion remains unverified future QA; provisional sources/Retina, physical phones, VoiceOver and thermal checks are non-blocking. Public HOME is still unimplemented. P2G completed Full→SOUND and its result is approved; P2H refines only SOUND through REVIEW READY / FREEZE CANDIDATE and STOP.

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

P2E source clarification: the user supplied that reference and explicitly confirmed it is **AI generated**. It is used only as a visibly disclosed **PROVISIONAL EDITORIAL STUDY**, not a documentary photograph or verified physical geometry. Real supplied photo (37) validates the bow/resonator relationship; attachment 7 supplies head/peg continuity. Request authentic isolated full-instrument and macro sources before final photographic/structural sign-off. The multiview sheet is reference only. See the [source audit and requests](review/HOME-HAEGEUM-TRANSITION-PROTOTYPE.md#source-audit-and-requests).

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

P2G's [Sound Lab](review/HOME-SOUND-EXPERIENCE.md) retains the approved P2F 155svh journey and adds
80svh of release: the Full image closes a proportional aperture toward its string axis, its own typography
mask releases, and the original two lines extend into a horizontal listening field. The Sound surface shares
the stage before native scrolling carries it out. No crossfade/reset or new scroll controller is introduced.

---

# 8. SCENE 03 — MUSICAL WORLD / INTERACTIVE SOUND LANDSCAPE

## Purpose

Turn the instrument into sound.

## Narrative Role

This is the first explicit listening moment on HOME. The 3/5 quiet composition remains the pre-activation baseline. The user-approved P2I B2 direction makes explicit listening a stronger smooth bow signature. The scene stays short and optional. Experience principles are owned by [MASTER §3.1](00-MASTER-PLAN.md#v2-experience-principles).

P2G implements this single scene only in a development Lab: asymmetrical large LISTEN, Ivory negative space,
a short caption and real optional audio. The user selected Han Beom-su Ryu Jungjungmori and delegated the
dramatic excerpt choice; 02:46–03:04 (18 seconds) is the signal-informed candidate. Exact auditory selection
and SOUND visual quality remain REVIEW READY. P2G result is approved; P2H retains the audio and continuous release,
refines local friction/damping, buffers replay, aligns the desktop type and stacks 320px captions. Native Safari
verified playback/pause/end/replay/focus with the entry mask removed at readiness; other native checks remain partial.
That P2H freeze-candidate judgment is historical; P2I visual selection is now approved. No album record or public route is added.

P2I canonical production direction is **B2 Bold / LONG 460ms / Electric Violet #6334E5**.
**“Strings vibrate. Bow flows.” / “현은 떨고, 활은 흐른다.”** The two Charcoal strings retain micro vibration,
tension and resonance; the marker sweeps smoothly with velocity continuity. Its tapered/fading trail is recent
bow history. No jitter is applied to the marker. A/B1/other Violets remain development comparisons only.
[SOUND contract](review/SOUND-BOW-CONTACT-COMPARISON.md) owns exact tuning and Lab/integration boundaries;
[closeout](../../P2I-CLOSEOUT-RESULT.md) owns the quality/QA decision. This selects the production direction;
public HOME integration and any next scene still require their own authorized task.

P2J keeps this visual direction and improves responsiveness through the same shared bow engine plus
HOME_SIGNATURE tuning and 25Hz offline features. Energy, onset and spectral changes drive smooth acceleration,
range and turns; pitch stays disabled for the mixed recording. LONG remains 460ms with stable history duration.
The [SOUND contract](review/SOUND-BOW-CONTACT-COMPARISON.md#p2j--shared-engine--feature-data--preset-contract)
owns exact implementation and future per-track reuse; no HOME-specific timestamp script or new scene is added.

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
- unlock media/Web Audio inside the LISTEN gesture, prime inaudibly, align once to the canonical SOUND frame, then start audible playback; only successful audible playback is represented as playing, with truthful pending/error/unavailable states
- manual wheel/touch/navigation input cancels alignment; RESUME does not re-snap; reduced motion uses the static panel anchor
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

The current development composition reverses the line reveal: each left endpoint contracts toward its fixed right
endpoint before the pair releases into spatial motion. Do not pull both ends toward an orbiting point. The exit guide
compensates for the outgoing stage moving upward, so the contraction remains visible. Reverse scroll restores it.
The returned pair keeps Haegeum Electric Violet and Janggu Lacquer consistently: no circular heads, only long tapered
trails through free motion, work-focused front/back orbit and the remaining HOME scenes through 08. Reduced motion remains static.

This is an intentional signature transition.

Narrative:

`SOUND strands → rightward contraction → two headless trails → work → album → aperture cue → seam cue → typographic resolution`

Do not reset the visual language between scenes.

---

# 10. SCENE 04 — SELECTED WORKS

## Purpose

Show that the artist has a substantial body of work without turning HOME into an archive.

## Composition

Current user-directed baseline restoration (`d98aaa6444b472537bfd5d1e549f864635930a85`):
- five large image planes on the existing spatial ribbon, with one work clearly exposed at a time
- 4–5 selected works
- authentic aspect ratios, spatial depth and varied proportions
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
- brief sticky composition (190svh scene, 90svh travel); no wheel interception or drag requirement
- native scroll moves the existing ribbon continuously; the cinematic pass's added interval holds and next-edge clipping are removed
- five labelled buttons expose any work, and its central link remains keyboard reachable
- near-pointer/focus gathers the pair around the artwork, with front/back depth and continuous release to free motion
- pointer also tilts the artwork surface; recent paths use the shared trail resampler, not discrete dots
- height-aware image sizing keeps the main image clear of the heading and the single caption ledger

Mobile:
- restored independently composed sticky ribbon (250svh scene, 150svh travel), with one large image and readable title/year/type
- existing mobile spacing/depth/rotation; no new Depth Queue clipping or hover requirement
- native vertical scroll and five labelled selectors expose every work; direct tap follows the same content identity

## Detail Entry

Current HOME selection keeps the album content identity when entering Album Object. The featured 9/22 performance
links to its fixed HOME stage; other performances retain their own existing official-site detail links. Album-face and
featured-performance DOM attributes expose stable content/asset identity. Actual HOME→Detail shared transitions remain **FUTURE**;
these identity hooks do not implement route animation, destination snapshots or new detail pages.

The selected image/artwork should expand/reposition into the detail Hero where possible.

Fallback:
- transform + opacity transition

Navigation must remain functional without shared transition support. Match image/object character to its Detail Hero; do not mechanically repeat the same hover animation across every work.

## Accessibility

Keep keyboard-accessible selection buttons and the active work link on desktop and mobile. Reduced motion alone exposes
all work links in an ordinary readable grid, with captions attached to each image. No drag is required.

## Asset Requirements

Selected works must use the strongest available artwork/performance imagery.

Do not choose a work simply because an asset already exists.

If a selected work lacks a V2-quality image, request or create a better asset.

## Acceptance Criteria

- feels like editorial exploration, not ecommerce carousel
- 4–5 works feel substantial but not crowded
- native scroll immediately advances the short ribbon
- touch does not steal vertical scroll
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

The point pair leaves the restored ribbon toward the actual incoming object's measured location and subsides as the
album takes focus. Selecting a work retains its content identity. The cinematic pass's additional last-work plane-edge
afterimage is removed with the 04 selective revert. This boundary does not add a cross-route shared transition or
claim final geometry approval; the separate Album→Stage light and Artist→Outro seam afterimages remain.

---

# 12. SCENE 05 — ALBUM OBJECT / 3D COLLECTION

**Current sprint implementation:** three retained lightweight CSS volumes with one active manipulation target. Actual
front/back/spine artwork, connected perspective through all volume ancestors, edge depth, directional light, drag/inertia,
two-axis pointer response (horizontal ±28°, vertical ±20° around the existing pose) and explicit front/back/keyboard controls. Selection produces a 920ms spatial entrance/exit; rapid changes
continue from the browser's current interpolated transforms instead of resetting a timer or pose. Scene selection/pose
is separate from the `PaperAlbumObject` render adapter. Replacing that adapter with a future GLB does not require rewriting
the scene. This is presentation geometry, not a manufacturing model or a waiver of Blender/Tray/Album Detail quality gates.

Light Memory now follows the actual rendered turn/tilt with slower direction and color damping than the object.
Its transient tones are derived from the three retained cover derivatives, not new brand colors. Reflection, ambient
surface and shadow settle without an independent idle loop. Object exchange adds a depth retreat/approach while
preserving the existing input owner, pose and interruption behavior. The initial three-quarter pose and explicit
front/back controls offer composed resting states; drag release does not force a new orientation snap.

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

V2.1 prioritizes the perceptual quality of a physical object over displaying three live objects. Pointer position gives a clear two-axis response, intentional drag explores the object, and selection brings it forward. This describes the experience, not a requirement to drag before selecting; tap/keyboard detail access remains available. The full continuity sequence below still governs supported state transitions.

## Interaction

Desktop:
- pointer position tilts/turns the selected album; short drag/arrow-key instruction remains visible
- drag inherits the actual rendered hover pose; pointer leave settles without a jump
- drag rotates selected album
- natural inertia

Mobile:
- touch rotation only if scroll behavior remains reliable
- adaptive quality mandatory

## Detail Transition — FUTURE / NOT IMPLEMENTED

The future selected album should move forward toward the camera and continue into Album Detail. Current HOME
provides stable object/front/back identities only; it does not implement this route transition.

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

After direct object manipulation, let the object settle before the stage opening gains emphasis.

Move from:
`physical object → residual light → stage opening → settled performance composition`

The dark Performance scene changes the visual language from object manipulation to stage presence. A short clipped
light afterimage inherits the selected album's actual ambient RGB/direction as the dark surface enters. It yields before
the poster threshold frame; it is not a persistent glow or a new performance color palette. No extra input is required.

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

Current Stage Aperture + Date Geometry direction:
- a central slit opens into the large official poster surface; crop/scale follow the same native-scroll timeline
- 09 and 22 move from offset positions into a separated date structure; their thin boundary grows with the opening
- date, title and venue do not cover the poster; mobile places the date above and grouped metadata below the image
- pointer position shifts contextual stage light and shallow poster depth; touch remains scroll-driven
- the opened image/date composition holds before exit, without a timer or wheel lock
- two-point tension cues appear briefly at the aperture edges and yield at the complete composition

Do not add another drag rail or active 3D interaction here.

## Visual Role

This is HOME’s first major Ivory → Dark Stage tone change and its primary dark contrast moment. The opening is a
signature event, followed by a quiet, readable threshold frame. The older uniform 2.5/5 motion description does not
limit the user-authorized aperture; impact comes from opening/settlement, not perpetual movement.

It must not become a second permanent color system.

## Mobile

Use the independently authored aperture proportions, date above and title/venue below. Retain a legible single image
and native vertical scroll; do not simulate a mobile pointer spotlight.

## Reduced Motion

Expose the fixed event information and intact poster in normal document order. Remove depth, aperture travel and
decorative cues; readable content does not depend on reaching a scroll progress.

## Asset Requirements

Use the strongest performance image, not simply the newest or easiest asset.

The current fixed event is **2026-09-22 `<풀고, 엮다>`**, 19:30, 국립부산국악원 예지당. Use its official gold
poster and existing official-site detail link. Other Works selections cannot replace the featured event. The former
8/2 feature is superseded; do not relabel its asset. No authenticated 9/22 stage photograph is available in this
composition, so the present surface is poster artwork, not documentary performance photography.

If the chosen performance lacks a strong hero image, request another source or create a better visual treatment.

## Acceptance Criteria

- strong contrast after Album 3D
- atmosphere without interaction fatigue
- performance feels live/cinematic
- the opening and quiet threshold are clearly intentional

---

# 15. TRANSITION 06 → 07

Move from Dark Stage back to Ivory.

The transition should feel like leaving the performance space and meeting the artist directly.

The existing shared image frame moves from the poster composition into the portrait composition. Its aperture's
right boundary wipes to the suit portrait, then becomes the boundary revealing the hanbok. This is one DOM seam
and one reversible native-scroll timeline, not two section transitions or a facial morph between different photographs.
Ivory opens with the same handoff and retains large whitespace. Navigation switches its authored foreground/background
contrast pair together at the stage boundary; it does not interpolate through illegible middle grays or retune Bold MENU.

---

# 16. SCENE 07 — ABOUT / ARTIST REVEAL

## Purpose

Reveal the person behind the instrument, recordings, and performances.

## Narrative Role

This is the first comparatively clear identity reveal: front-facing or clear 3/4. Hero’s side/back/partial-face approach gives this quiet return to Ivory its purpose.

Do not continue hiding the face here.

## Composition

Default composition (new opt-in comparison requirements are in the dated Experience Prototype revision below):
- one large suit/hanbok portrait composition, using the two distinct real photographic poses
- suit initially dominant; hanbok enters through a moving split mask
- grouped Cho / Youn Kyoung and 조윤경 identity, with a short `연주자 소개` link
- no tilted photographic plate, CV, scattered introduction or text over the face

No CV timeline on HOME.

## Motion

Default Split Mask + subtle DOM 2.5D direction (not the new comparison endpoints):
- the neutral-pointer hanbok split holds at 47.6% over sequence progress .82–.91 before continuing to the retained 68% endpoint
- intact photo planes and their seam share small translations; the name group moves at a smaller, opposite depth
- fine-pointer movement adds bounded split/light response; mobile uses only a small scroll-driven crop/depth shift
- the final frame contracts slightly toward the outgoing seam; reverse scroll follows the same geometry

This is photo/mask/type plane separation, **not** a foreground-subject cutout or face reconstruction. Occlusion
Typography was considered but is **NOT ADOPTED in this pass**: the retained photographs have no silhouette cutout,
and placing type across them would compete with the identity. It remains OPTIONAL for a future asset-backed review.

## Background

Return to Ivory.

## Mobile

Keep a large portrait above the grouped identity, with independent suit/hanbok crop and eye-height tuning.

Do not shrink a desktop two-column block blindly.

## Asset Requirements

The suit photo and user-supplied purple hanbok photo have separate identities and provenance. The optimized hanbok
derivative retains the supplied 1023×1537 source's resolution limit; a larger original is still useful for final Retina
QA. Preserve the distinct frontal/profile poses and source files; no invented documentary detail or facial reconstruction.

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

The Artist scene reaches the closing surface through the existing native sequence. No detached seam/line follows
the portrait into 08. The same headless Violet/Lacquer pair continues from its retained position and phase;
neither a second motif engine nor a portrait ghost is introduced. Hanji's completed photograph keeps its scale/crop
through its short viewing window, without a second camera emphasis.

---

# 18. SCENE 08 — OUTRO / FOOTER

## Purpose

Close the HOME narrative with a living interactive surface, one primary continuation CTA and a secondary internal scene revisit index.

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

Only nearby glyphs respond subtly to pointer tension; do not move, tilt or distort the whole name.

This scene should breathe.

## Persistent two-point life / Interactive Closing Surface

2026-09-08 사용자 요청: **08에서도 두 점은 끝나지 않는다.** 07의 현재 위치와 phase를 이어받아
자유롭게 움직인다. 마지막 gather/withdrawal/spawn을 제거하고 Violet/Lacquer의 headless trail과
글자 앞뒤 관계를 유지한다. Cursor follower가 아니며 offscreen/hidden/menu에서 멈추고 reduced-motion은
정적으로 단순화한다. 과거 endpoint로 모여 사라지는 기록은 현재 계약이 아니다.

**Interactive Closing Surface:** Ivory 종이 아래의 transient Violet/Lacquer/Bronze가 pointer 주변에서만
불규칙한 섬유 경계와 짧은 흔적으로 나타나고 다시 마른다. 전체 화면 tint/무작위 rainbow/원형 spotlight가
아니다. 사진이나 글자 자체를 흘리는 fluid도 아니다. 큰 이름은 가까운 glyph만 미세하게 반응하고
정보/CTA/Scene Index는 변형하지 않는다. Surface와 큰 이름은 같은 Outro input owner를 사용한다.

**Scene Revisit Index:** 01 처음 / 02 해금 / 03 소리 / 04 작품 / 05 음반 / 06 공연 / 07 연주자.
Desktop typography list와 고정 preview zone, 모바일 `장면 다시 보기` disclosure. 한 번의 클릭/tap으로
기존 canonical frame으로 돌아간다. SOUND는 자동재생하지 않고, 명시 이동이 Scene Magnet보다 우선한다.
새 입력이 오면 smooth jump를 취소한다. Global MENU와 구분하고 04 ribbon 동작은 바꾸지 않는다.

기존 큰 이름·한 개의 주 CTA·Sou.P 명시적 reveal·저작권을 유지한다. 새 동작은 IMPLEMENTED /
REVIEW READY이며 사용자 시각 승인과 별개다. [이번 결과](review/HOME-OUTRO-INTERACTION.md)가
실제 파일·검증·참고 원리·전달 상태를 기록한다. 새 콘텐츠/자산/정식 페이지 등록은 없다.

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

Keep the Easter Egg discoverable without turning it into a large feature. Scene revisit uses a compact vertical disclosure with 44px targets and one-tap navigation; hover imagery is supplementary.

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

The pair is structural, not decoration: Hero composition → Haegeum guides → Sound response → Selected Works axis → Outro persistent life. A strand can change emphasis without losing the two-string/bow identity. Do not force it to animate or appear prominently in every scene; Performance and About retain their quiet roles.

Haegeum is a bowed-string instrument. Preserve micro vibration, vibration density, tension, damping, sustained friction and subtle resonance; lines remain mostly straight. No large waveform, equalizer bounce, sine-wave animation or exaggerated vertical oscillation. Scroll-only visual changes are not evidence of playing audio.

The user's recent reference-review principles are adopted as design rationale: immersive artist-world feeling, confident editorial typography, work-first personal identity, gallery/archive restraint, strong first viewport, and content depth behind elegant presentation. These are user-supplied principles, not claims of a new site-by-site reference audit in this task.

Derive an independent visual identity from Haegeum, two strings/bow, tension/resonance, physical album objects, Sanjo/Jeongak materiality and Cho Youn Kyoung photography. Do not directly copy any reference site's layout, animation, type composition, source code or unique interaction. Earlier Art Direction V1 remains historical context; V2.1 is the current HOME direction, not permission to discard the retained detailed requirements.

This is documentation only. No HOME/React/CSS, image manipulation, asset migration, audio/motion/3D, dependency change, deployment or P0E work is authorized by this revision. See [revision report](review/HOME-V2.1-REVISION-REPORT.md) for conflicts, asset needs and the STOP boundary.


## P2K — same scenes, alternative motion vocabulary under review

The user authorized one comparative Lab bundle; it does not advance the HOME narrative. The approved two-line
Hero→Haegeum and Violet SOUND remain A references. B tests two abstract Bronze spatial points, image-specific
string convergence and left-to-right SOUND handoff; secondary Janggu counterpoint and shared-glyph action text
remain unapproved visual candidates. [Single P2K owner](review/P2K-INTERACTION-PROTOTYPES.md) contains tuning,
source alignment/provenance, reference research and comparison behavior. No next Scene or public HOME integration.

## 2026-09-08 visible-copy refinement

Keep section identity, artist/work names, year/venue, audio source/state, short controls, accessible labels and asset
provenance. Remove repeated explanatory/poetic paragraphs in SOUND, Works, Album, Performance, Artist and Outro.
Shorten CTAs to their action. This is a presentation-copy pass, not a content-record migration or automatic EN translation.

## 2026-09-08 continuous closing-pair revision — historical implementation

This records the earlier pair extension. The cinematic continuity revision below supersedes the cursor orbit,
full-scene Performance/Artist orbits, mobile grid and long diagonal exit described here. Do not restore them.

The user explicitly extends the same pair through the existing 05–08 scenes. Keep Electric Violet/Lacquer,
headless tapered trails and the preceding rightward SOUND contraction. Do not recreate/reset the pair per scene.

- 05 THE ALBUM: damped orbit around the fine pointer; touch/no-pointer uses the album center.
- 06 LIVE PERFORMANCE: orbit around the actual current poster with front/back occlusion.
- 07 THE ARTIST: figure-eight around the profile photograph and Korean name, aligned to their responsive layout.
- 08 AN OPEN END: projected depth through the actual glyphs; gather/diagonal exit at the bottom; reversible.

These are one shared decorative motion owner, not independent scene rebuilds or a new 3D asset subsystem.
Canvas cannot intercept input. Mobile preserves vertical scroll with capped resolution/history; reduced motion
hides decorative orbital motion while all content/controls remain available. Native Safari/phone QA remains distinct.

Mobile 04 follow-up: the pair is also active throughout the native Works image grid. Its free horizontal/vertical
path uses the currently visible board area rather than the center of the whole tall grid, and continues into 05.
Mobile 04 excludes image occlusion so its large first image cannot hide one trail for an extended interval.
No mobile hover/scroll capture is added; headless colors, 2-second trails and reduced-motion suspension remain.

## 2026-09-08 HOME interaction pass — preceding baseline

This preceding pass established SOUND alignment, mobile scrolling/touch and the shared frame. The following
cinematic pass retains those contracts and refines depth, thresholds and selective motif timing.

This later explicit user bundle supersedes the prior mobile gallery, selectable 8/2 stage and tilted Artist plate.
Scope: SOUND usability, mobile Works/Album input, and one continuous Performance→Artist sequence. Hero/Haegeum
visual tuning and the approved SOUND response remain unchanged. Local review precedes any delivery approval.

- LISTEN unlocks native media/Web Audio within its gesture, primes inaudibly without consuming the excerpt,
  aligns once to the final in-pin SOUND frame, then starts audible playback. Geometry uses the same stage/travel
  denominator as Hero, with header clearance. User wheel/touch/navigation cancellation yields immediately;
  RESUME does not re-snap. Reduced motion aligns instantly to the readable static panel.
- Mobile Works uses the same five-step scroll ribbon with independently authored spacing, depth and 250svh total
  section height (150svh travel). One large active image plus title/year/type, native vertical scroll and keyboard
  selectors. Only reduced motion uses the static grid; decorative trails remain on touch.
- Album interaction uses a stable input surface (`pan-y pinch-zoom`) instead of transformed child faces as targets.
  A 4px horizontal touch threshold claims rotation; vertical intent remains browser scrolling. Live pose is inherited,
  touch tracks directly, release momentum is bounded and reduced motion has explicit face buttons/keyboard access.
- HOME's featured event is permanently 2026-09-22 `<풀고, 엮다>`, 19:30, 국립부산국악원 예지당. It uses that
  event's official gold poster, not a documentary stage photograph. The working event CTA goes to its existing
  official-site detail; V2 archive publication remains separate. Other work selections cannot overwrite this feature.
- 06→07 shares one sticky image frame and one DOM seam. Aperture opens, poster resolves, its right boundary wipes
  to the suit portrait, then turns into the scroll/pointer-driven hanbok split. No independent section reset/crossfade.
  Native scroll reverses the same geometry. Mobile has its own portrait proportions, date and metadata placement.
- The supplied hanbok portrait is a separate optimized derivative with original SHA/provenance in the HOME manifest.
  Suit and hanbok eyes/crops are authored separately; the photos' distinct angles are retained, not reconstructed.
- In that revision the existing two-color trail pair yielded throughout 06/07; the later cinematic pass permits only
  brief aperture/seam cues before returning in 08.
  Reduced motion exposes the event and both portraits as static content. No animation library or 3D renderer added.

## 2026-09-08 HOME cinematic continuity / depth pass — current implementation

**IMPLEMENTED in the development composition; visual approval, validation and delivery are separate HANDOFF states.**
The current runtime and this revision supersede conflicting earlier sprint descriptions. No new HOME scene,
Detail page, audio engine, navigation motion or Hero/Haegeum redesign is part of this pass.

**Subsequent user correction — 04 selective revert:** restore Selected Works to the start-of-pass baseline
`d98aaa6444b472537bfd5d1e549f864635930a85`. The Depth Queue, added interval thresholds, next-edge clipping,
new mobile queue tuning and Works→Album plane afterimage are **REVERTED / NOT ACTIVE**. Retain the other scenes'
cinematic refinements below. Historical pass results describe their recorded revision, not the current 04 runtime.

### Continuity principles and actual signatures

- **Scene Afterimage:** a brief piece of the outgoing material becomes the next scene's input. `SceneAfterimages.tsx`
  carries the selected album's RGB/light direction into the stage. The detached Artist→Outro edge and the new
  Works plane transfer are removed. The retained light is short and clipped, not a blurred ghost.
- **Z-depth Transition:** retained album objects exchange in depth; Works retains its pre-pass ribbon transforms.
  CSS perspective/transforms provide the spatial relation without a new WebGL renderer. Shared geometry is
  preferred over a reset; opacity only bounds an edge/light lifetime rather than serving as the complete transition.
- **Threshold Moment:** movement → complete composition → short settle → handoff. Holds are authored scroll
  distance or natural motion settlement, never timed scroll locks. Fast input may pass through; reverse remains native.
- **Persistent Two-Point Narrative:** the same headless Violet/Lacquer trail owner changes its role and may disappear.
  Works exposes free/work-relative guidance; Album follows the object, not the cursor; 06/07 show short tension cues;
  complete stage/portrait frames are quiet; Outro keeps the pair alive without final gathering or withdrawal.

| Scene | Current threshold and continuation |
|---|---|
| SOUND | Retained geometry-based LISTEN alignment, immediate gesture unlock and audible playback near alignment; no retuning in this pass |
| Works | Pre-pass native-scroll ribbon restored; active-image alignment and labelled selectors remain, with no added .13/.87 interval hold or next-edge clipping |
| Album | Existing three-quarter/front/back pose and bounded release settle; light follows more slowly, then its rAF stops. No new forced orientation snap |
| Performance | Aperture opens over shared progress 0–.24; date/poster hold before the .43–.64 seam handoff |
| Artist | Hanbok split reaches 47.6% at .82 and holds to .91, then continues to 68%; the final .955–1 interval gently withdraws the frame |
| Outro | Inherited phase/position and ongoing bounded flight through the visible paper area; no finite endpoint or withdrawal |

### Type, color and input boundaries

**Large Type ≠ Visual Impact.** 09 / 22 has an aperture-linked alignment role, while Artist's name stays readable
beside/below the portrait. The image and typography do not compete for the face or poster. Artist's small photo/mask/type
depth is DOM 2.5D only; no silhouette segmentation or image warping was added. **Occlusion Typography remains OPTIONAL /
NOT ADOPTED**, and **Scroll Velocity Response is NOT ADOPTED**. Scroll position remains the content-state source.

Permanent palette remains compact. Album Light Memory uses the actual cover-derived RGB means; Performance's warm
light and Artist's faint violet response remain asset-related, temporary ambience. No neon/bloom or added branded colors.

Mobile preserves native scroll, large work images and the prior horizontal album-drag / vertical page-scroll contract.
It reduces depth and uses scroll-driven Artist movement instead of a simulated pointer. Reduced motion presents all
works, fixed poster/date and a stable dual portrait; decorative afterimages/cues are hidden, and album contextual light
settles immediately. It does not replace the narrative with a sequence of opacity fades.

Motion owners stop after settlement or when their content is offscreen/hidden as applicable. The pair also stops during
quiet stage/artist thresholds and at Outro completion; afterimages schedule only on relevant geometry/state changes.
No sustained phone/thermal or native Safari quality claim follows from these implementation rules.

### Future Detail boundary

Stable album object/front/back identities and the featured performance content/image identity are present.
**HOME → Album Detail Shared Element** and **HOME → Performance Detail Shared Element remain FUTURE / NOT IMPLEMENTED**.
No destination snapshot, route-transition handler or new detail route was added. These hooks preserve identity for a
separately authorized transition, while current links and local selection retain their existing behavior.

## 2026-09-08 Experience Prototype — historical comparison, superseded by promotion below

**기본 화면:** main `150529b`의 복원된 04 Desktop/Mobile ribbon을 고정한다. 새 Depth Queue, mask,
감상 hold, 잔상, Scene Magnet을 04에 추가하지 않는다. Hero/Haegeum/SOUND, 앨범 조작/교체와
2026.09.22 `<풀고, 엮다>` 콘텐츠는 유지한다. 아래는 기본 HOME의 시각 승인이나 확정 적용이 아니다.

**07 비교 요구:** 직선 / 한지 번짐 모두 100% 정장 → 100% 한복. 전환 완료는 scene 퇴장이 아니며
완성된 사진과 프로필의 감상 구간을 확보한다. 역스크롤도 같은 모양을 되짚는다. 기존 68% 제한은
기본 화면의 역사적 tuning일 뿐 새 후보에 적용하지 않는다. 사진은 실제 suit/hanbok을 그대로 사용하며
기울기·얼굴 왜곡·가짜 사진·실루엣 재생성을 추가하지 않는다. 두 후보는 같은 진행도와 프로필로 비교한다.

**간략 프로필:** 조윤경 / Cho Youn Kyoung → 해금 연주자 → 국립부산국악원 기악단 **단원**,
한양대학교 음악학박사(D.M.A.), 국가무형유산 「종묘제례악」 이수자,
제27회 온나라국악경연대회 해금부문 금상 → 전체 프로필 보기. 현재 수석이 아니다.
`前 국립부산국악원 기악단 수석 역임`과 새.생 동인은 ABOUT 계획에서 별도 구분한다.
현재 활성 V2에 잘못된 현직 문구는 발견되지 않았다. ABOUT 목적지는 여전히 임시 route fixture다.
모바일은 위 사진/아래 프로필의 별도 구성이며 읽는 정보는 DOM에 남긴다.

**03/06 실험:** 기존 완성 구도/감상 구간을 이용한 약한 장면 자동 정렬. 기본 OFF이며,
LISTEN과 직접 이동/키보드/메뉴가 우선한다. 입력·관성 종료 후 가까울 때만 안착하고 새로운 입력으로
즉시 취소한다. 시간 강제 감상이나 scroll lock이 아니다. 구체 계약은 [Motion §50](03-MOTION-SYSTEM.md#50-opt-in-experience-prototypes--user-selection-pending).

**접근:** 로컬은 접힌 `개발 비교` 버튼, 공개 Preview는 `?dev=1`. 일반 공개 주소는 패널/새 실험 OFF.
`?dev=0` / 종료는 후보를 해제한다. 기존 `?compare` / `?all`은 호환한다. 사용자 선택 대기 후보를
cleanup으로 삭제하지 않는다. URL은 보안 장치가 아니며 개인정보/비공개 자산을 담지 않는다.
비교 주소·추천·검증은 [통합 연구/결과 §7](review/EXPERIENCE-PROTOTYPE-RESEARCH.md#7-home-비교-실험-결과)에만 기록한다.


## 2026-09-08 Canonical promotion / HOME fixes

사용자 선택으로 07 **Hanji Wet Reveal + Compact Profile**, 03/06 **Scene Magnet**을 일반 Preview에 승격한다.
정식 owner는 `src/home/experience`; `DevelopmentTools`는 선택 UI만 담당한다. 일반 URL/`dev=0`은 Canonical,
`dev=1`은 URL → 저장 Draft → Canonical이다. [승격 절차](review/EXPERIENCE-PROMOTION.md).
한복 100% 완료 후 scale/crop 고정과 .825–.955 Viewing Window를 보존한다. 04 ribbon은 그대로다.

06의 built-only 지연 표시 원인은 fetch/base/timeline이 아니라 `.dark-stage`와 copy overlay의 동일 specificity
배경 충돌이었다. sequence 안의 copy overlay만 명시적으로 투명하게 하고, 포스터 한 장만 낮은 fetch priority로
미리 decode한다. aperture/07 handoff 타이밍과 9/22 콘텐츠는 변경하지 않는다.

08 기존 wet shape·Ivory 회복·glyph·두 점·Hover·Scene Index를 유지한다. 색은 stain 개수와 무관한 72초 clock에서
Violet→Bronze→Lacquer를 연속 보간한다. Mobile은 별도 cursor 없이 실제 두 점을 source로 공유 surface를 사용한다.
850ms quiet entry, 280ms scroll settlement, 최소 1.8초 생성 간격, 동시 최대 3개, 5.2초 decay. 빈 공간의
280ms/8px 이내 tap만 보조 반응하고 scroll/link/multitouch를 가로채지 않는다. Reduced motion에서는 번짐과
근처 glyph 반응을 끄고 이름·링크·Index를 유지한다. 새 08 strength/cadence는 REVIEW READY이며 기기 QA와 구별한다.


## 2026-09-08 Outro response tuning — REVIEW READY

08 surface owner만 변경한다. 640px 미만 mobile composition은 fine pointer가 있어도 실제 두 점을 source로
사용한다. 390px fine-pointer baseline에서 points가 움직여도 pointer source 때문에 자동 번짐이 0인 문제를
재현했다. Touch emulation baseline에서는 생성됐으므로 실제 휴대폰 전체 원인 검증으로 확대하지 않는다.

Root style mutation은 geometry 갱신, 실제 point 좌표 갱신은 scheduler wake만 담당한다. Quiet time은 visible
surface의 passive native scroll listener가 실제 scrollY 이동에만 갱신한다. 스크롤하지 않는 동안 지속적인
style 변경이 있어도 자동 번짐이 생성됨을 확인한다. 입력 종료/숨김/reduced/unmount에서 owner를 정리한다.

Desktop pointer 추적과 stain 생성 clock을 분리한다. 580ms / 56px을 기준으로 한 호흡의 대표 위치 하나만
채택하며 동시 최대 4개, 3.4초 wet/dry, .38초 arrival로 넓게 퍼질 시간을 준다. 72초 색 phase, fibre shape,
Ivory 회복, glyph와 두 점 동작은 그대로다. Mobile의 최대 3개 / 5.2초 life / 1.8초 interval, blank tap과
native scroll 우선권도 유지한다. 다른 HOME scene과 Canonical/Draft 시스템은 이번 범위에서 변경하지 않는다.


## 2026-09-08 Wet Field visibility — stronger / wider / slower

이번 추가 pass는 08 surface/model만 다룬다. Desktop 기본 반경은 (96–126)×2.4px, Mobile autonomous는
(47–62)×2.7px이며 region별 ±20% 변화를 고정한다. 실제 profile 범위는 Desktop 약184–363px,
Mobile 약102–201px다. Strength는 Desktop .228–.2755, Mobile .27에 각각 ±12%. Blank tap은
약91–136px의 작은 반경과 .30±12% strength를 사용한다. 화면 전체를 일괄 tint하지 않고 실제 source 주변만 적신다.

Birth는 반경18%에서 시작해 1.3–1.7초 확장, .65초 hold, 총5.1–6.9초 안에 완전히 건조한다.
Seed로 radius/life/strength/angle을 한 번 정하며 frame마다 다시 뽑지 않는다. 색은 기존72초
Violet→Bronze→Lacquer에 동행하고 작은 고정 warm/cool 편차만 허용한다. Palette 무작위 선택은 없다.

Desktop 580ms/56px/최대4개, Mobile1.8초/최대3개와 actual-scroll quiet ownership, point source,
blank tap, reduced motion, glyph와 기존 two-point choreography를 보존한다. 1440/390 브라우저에서
확장 후 실제 Canvas paint와 육안 가시성을 확인하며 물리 휴대폰의 장기 QA로 확대해 주장하지 않는다.

## 2026-09-08 Mobile cinematic pacing — viewing distance only

사용자의 후속 지시에 따라 모바일 ≤639px / motion enabled에서만 감상 거리를 늘린다.
Native vertical scroll과 브라우저 관성이 입력의 주인이며 Desktop wheel/마우스 감각은 그대로다.
`mobile-pacing.css`의 명시적 opt-in과 `sound/scroll-geometry.ts`가 이 작은 범위의 owner다.

| Scene | 변경 | 보존 |
|---|---|---|
| 03 SOUND | 기존235svh 전개 뒤 완성 프레임55svh 추가 | Hero155 + SOUND80svh의 기존 절대 위치/곡선 |
| 04 SELECTED WORKS | section250→340svh, sticky travel150→240svh | 이전 ribbon 배치·크롭·transform·작품 순서 |
| 05 ALBUM | 기존 약991px 일반 흐름 유지(390×844 실측) | touch drag와 페이지 스크롤 |
| 06 PERFORMANCE / 07 ARTIST | 공용 section320→440svh, sticky travel220→340svh | aperture/Hanji/Viewing Window의 상대 진행도와 구도 |

03의 실제 section은390svh이며 원래335svh보다55svh 길다. 새 거리에서 progress=1을 유지한다.
LISTEN·Revisit·Scene Magnet은 동일 helper로 hold 중앙에 도착한다. 고정 픽셀 보정이나 매번 재정렬은 없다.
04는 작품별 이동 거리가37.5→60svh, 06 stage hold33→51svh, 07 완성된 한복 구간28.6→44.2svh로 늘어난다.
05는 sticky가 없어서 높이만 늘리면 하단 공백이 생기므로 이번 pacing에서 변경하지 않는다.

390×844 Chromium의 native touch 입력 기준 baseline short/medium/strong/reverse 이동은
약196/420/785/−330px였다. 이 측정에서는 한 gesture가 여러 major scene을 소실시키는 상황까지
재현하지 못했지만, 완성 SOUND가40px이고 07 Viewing Window가241px에 불과한 짧은 geometry는 확인했다.
새 geometry에서도 관성 거리를 강제로 줄이지 않는다. 물리 iPhone/iOS 관성을 검증했다고 주장하지 않는다.
같은 시작 위치·입력으로 변경 후 약195/426/783/−329px를 관찰했다. Medium은 관성 종료 뒤7px를
hold 중앙에 settle했다. 손가락을550ms 유지하는 동안 이동0px, release 후 약390ms부터 settle,
새 touch에서 controller 취소와 compositor의 진행 중 frame 이후 정지를 확인했다. 두 프레임 사이의
native compositor 이동을 입력을 가로채서 없애려 하지 않는다. 전체HOME E2E/Full Gate는 실행하지 않는다.

기존 Scene Magnet의 held finger 차단, 입력360ms/실제scroll200ms quiet, rapid crossing 제외,
새 touch 즉시 취소를 유지한다. 충분히 조용하고 Threshold Frame 가까울 때만 작은 settle을 허용한다.
`touchmove.preventDefault`, delta scaling, hard snap, mandatory hold, 새 scroll engine은 추가하지 않는다.
Reduced motion에는 새 height/hold가 적용되지 않고 기존 정적인 구조를 유지한다.


## 2026-09-11 — 08 refined wet field (user-authorized)

08 한지 번짐 반경을 모든 입력에서 이전의 25%로 축소한다 (사용자 추가 요청: 더 확실히 작게). Desktop 발생 간격은 580→2400ms,
Mobile autonomous는 1800→6000ms, 동시 영역 상한은 각각 4→2 / 3→1로 줄인다.
Mobile tap에도 같은 6초 간격을 적용해 연속 입력으로 빈도 제한을 우회하지 않는다.
색상 전체 순환은 72→36초로 단축하되 기존 smoothstep 보간과 Violet/Bronze/Lacquer를 유지한다.
번짐 성장·건조·농도, glyph 반응, 두 점 궤적과 reduced motion은 유지한다.
PR/merge 및 자동 development Pages 배포는 사용자 요청 범위. 시각적 우아함의 최종 판단은 사용자 확인이다.
