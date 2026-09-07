# P2K — three interaction comparisons

2026-09-07 · **Current refinement / visual review pending**. Runtime/code were rechecked on port 4180 before edits; historical evidence describes the prior revision. This is the single implementation/tuning
owner for the authorized P2K bundle, not a new production direction. Current approval is in
[HANDOFF](../../../CODEX-HANDOFF.md); completed validation belongs to [P2K result](../../../P2K-RESULT.md).
P2F and P2I freezes remain the A references. P2J HOME_SIGNATURE response remains independently REVIEW READY.
All three experiments live in `labs/interaction`; public HOME, routing, content and existing scene assets are unchanged.

## Comparison entry and scope

`npm.cmd run dev:interaction` → `http://127.0.0.1:4180/` (all B candidates).
`?all=a` selects all A. The Lab dock independently selects HOME, Janggu and action typography without
replacing the native media element. `?points=a`, `?janggu=a`, `?type=a`, `?color=burnt|rust|lacquer`
initialize specific comparisons. `/en` uses the existing authored fixture labels. Other navigation destinations
are neutral route fixtures, not new pages. The separate typography study demonstrates PLAY/PAUSE/RESUME/REPLAY;
the actual SOUND action retains LISTEN/PAUSE/RESUME/REPLAY/RETRY and honest loading/failed states.

## HOME — persistent points

The A guide transforms a fixed length/angle pair through images whose string axes, crop and visible spans differ.
That broad editorial guide can imply an invented string on the photograph; the P2F approval is not retracted.
B starts as **abstract spatial motifs**, then converges onto authored visible source spans. Color reads the existing
`--color-accent: #9A8164`; Electric Violet remains the primary SOUND signature.

`model.ts` describes deterministic X/Y/Z curves. Perspective projects X/Y; depth changes ribbon thickness/opacity while the head stays below 1px; there
are no random particles, geometry-text, glow or new raster assets. The DOM retains its sharp typography.
Two fixed Canvas surfaces render back/front path segments. The rear surface subtracts glyph-shaped masks using
the live DOM's font, tracking and position; the foreground surface passes over letters. This is an equivalent
DOM/Canvas hybrid, not a claim that a WebGL scene or native depth buffer was implemented.

| Approach | Fit / tradeoff | P2K decision |
|---|---|---|
| DOM/CSS points + DOM trails | Easy markers, costly trail nodes and less controllable glyph occlusion | Not chosen |
| WebGL + glyph stencil/text atlas | Native depth, appropriate for larger populations; atlas synchronization/context lifecycle/dependency cost | Considered, not executed/adopted |
| Perspective math + Canvas path histories + DOM glyph mask | Two points need little geometry; fixed nodes, no dependency, keeps real DOM text | Implemented candidate; font-mask edge fit still needs native Safari/DPR review |

FREE MOTION → HAEGEUM APPROACH → STRING PROXIMITY → LOCK-ON use the existing 155/235 share of the same native
scroll timeline; no additional pinned distance. `alignment.ts` owns normalized source spans for portrait head,
actual playing image and disclosed AI full image. `sourceToStage` maps through rendered image geometry,
object-fit/object-position and current crop transforms. The two endpoints settle at different heights along
their respective strings so closely spaced strings do not merge into one dot. Cross-string orbits shrink to zero at lock; a small smooth movement continues along each photographed span.
HOME trail history is now 1800ms (previously 520ms), with a .65px desktop head at .16 opacity. Bronze is unchanged.
The generated full reference proves only visual fit, not authentic string geometry. No extra long string is drawn
over a photograph. Playing spans below the hand avoid claiming an occluded string is visible.

The B continuation delegates the original timeline, then owns only the SOUND line placement. Points first
approach the left edge and then sweep right, progressively revealing the same line holders that the analyser uses.
Point positions, fading actual path history and line reveal use the same release signal. Reverse scroll reverses
the narrative; the decorative phase is not randomized/reset. The A continuation remains unchanged.

## Janggu — secondary candidate

The Violet bow remains B2 Bold / LONG 460ms / Electric Violet #6334E5. P2K adds a smaller red-brown marker:
Lacquer **#A33D36**, Burnt **#AF4837**, Rust **#8F332F**. These are unapproved visual candidates, not global tokens.
The compact helix moves smoothly between horizontal ends, orbiting the two-line field with subtle perspective.
Its 620ms tapered ribbon is actual movement history. Idle orbit is explicitly decorative; it never claims playback.
Native playing state smoothly increases integrated phase speed from .36 to 1.12 rad/s and horizontal range from .29 to .43.
A critically damped activity blend preserves position/velocity on play/pause; jump height stays 43px with a 45ms attack constant.
The head is 1.05px with .28 opacity; the red ribbon carries the visual weight.

Only **upward displacement** responds to a hit. No hit-related radius, brightness, color, glow or pulse change.
A zero-position/zero-velocity attack envelope returns smoothly; up to 12 bounded overlapping envelopes preserve
the returning position across close hits. Perspective scale is independent of the hit input.

The new, separate feature asset is generated from the unchanged approved 18s excerpt by
`node scripts/extract-p2k-percussion.mjs`. Existing P2J bow features and extraction contract remain intact.
A 2048-sample Hann FFT at about 100Hz now requires 60–240Hz bass AND 240–700Hz body attack alongside
2–7kHz positive flux/flatness, local prominence and 180ms spacing. A high-only noisy transient no longer qualifies.
The current /2 asset contains 13 candidates, 10 above .76, compared with the historical 16/14. Fewer triggers do not
prove better instrument precision: the extra low/body requirement and synthetic high-only rejection are the evidence.
The user's four approximate regions remain covered at .2907, 4.0391, 9.0705 and 14.8536 seconds. The 3.2473 candidate
is retained below threshold; no timestamp whitelist was introduced. Remaining labels/onset accuracy require listening.
This remains a **mixed-source percussive estimate**, not verified Janggu identification or source separation.
The prior [user review](../../../evidence/p2k/user-hit-review.json) and original extraction evidence remain unchanged.
Regeneration writes runtime percussion.json and ignored `.checkpoints/p2k-percussion-current.json`, never the old evidence.

Feature identity/SHA/duration must match. Only native `media.currentTime`, actual playing/ready state and forward
increments under 200ms can trigger a hit. Pauses, seeks, errors and offscreen exits cannot accumulate missed events.
There is no second AudioContext, upload, autoplay or simulated playhead. Without Web Audio, the original bow/strings
stay static and the Lab explicitly discloses that Janggu uses precomputed candidates during real playback. Reduced
motion disables both decorative orbit and reactive displacement while preserving native listening.

## Typography — shared glyphs and cascade

`GlyphLabel` is opt-in through the internal SOUND surface's action-label slot; the canonical SoundExperience API
retains its existing defaults. A real button supplies the accessible action name; decorative glyphs are aria-hidden.
Matching is one-to-one, preserves duplicates, gives exact slots priority, then pairs remaining occurrences in order.
Shared DOM nodes stay visible and glide. Unmatched outgoing/incoming glyphs leave/enter individual masks. WAAPI
reads each interrupted glyph's current presentation before cancellation; no stale timeout restores an earlier word.
Finished exits are removed. Reduced motion/font-load/resize settle directly to readable text.

Current total 480ms (including stagger), stagger 32ms, incoming phase delay 68ms, alternate hover baseline ±3px,
subtle .018em tracking opening, upward exit/downward entry. Masks stay vertically stationary while inner glyphs move;
shared outer glyphs glide horizontally. The prior early reveal keyframes and moving clip-path implementation are removed. The inner hover transform is separate from the state animation so pointer leave
reverses from its current position, including while a word changes. This is smaller than the frozen MENU ±7px family.
No whole-site hover rewrite, visual language switcher, new copy or navigation animation was implemented.

## Central tuning and resource ownership

All motion candidates are in [tuning.ts](../../../src/interaction-prototype/tuning.ts), source alignment in
[alignment.ts](../../../src/interaction-prototype/alignment.ts). HOME speed/depth/scale/curvature/convergence/lock/
trail; Janggu speed/radius/travel/jump/return/history/opacity/sensitivity/colors; typography duration/stagger/drift/
tracking/mask direction can be adjusted without rebuilding choreography. Existing Violet controls remain in their
[SOUND owner](SOUND-BOW-CONTACT-COMPARISON.md).

Two Canvas DOM nodes, HOME history 64 each desktop /48 mobile, Janggu 192/128, and 12 hit envelopes.
HOME stores 30/24Hz positions with the current tip appended for rendering. **Janggu stores every rAF position**;
its ~100Hz offline audio analysis selects cues only. A bounded 4096-point reusable sampler subdivides fast spans
with monotone Hermite interpolation, passing through captured positions without overshooting a jump/turn.
Connected ribbon surfaces replace individually rounded strokes. Short joined sections interpolate alpha with gradients;
shared boundary vertices continuously taper width by age/depth. There are no point echoes, glow or particles.
`src/motion/trail-geometry.ts` shares the existing bow's normal/edge calculation, extracted without changing its math,
Violet, B2 choreography, 460ms duration or SVG age bands. HOME and Janggu use the same Canvas ribbon renderer.
The old Janggu fixed sampling cadence, segment-cap renderer, depth-sized heads and obsolete tuning keys are removed.
DPR remains capped at 2 desktop/1.5 mobile. No per-frame React state or additional AudioContext/dependency.
Hidden/modal/offscreen/reduced/static states suspend rendering and discard missed/old hit accents. This refinement
has not repeated physical-phone, native Safari, VoiceOver or thermal QA; older capture timings do not describe it.

## Reference-first research — 2026-09-07

These are primary creator articles/site reads, not an exhaustive live-site/device motion audit. No source code,
brand asset, layout or exact timing was copied. The independent match/renderer/envelope implementation above uses
native APIs and V2-specific images, colors and timing. Library stacks from references were not adopted.

| Reference / evidence | Principle understood | V2 reinterpretation |
|---|---|---|
| [MERSI / FLOT NOIR](https://tympanus.net/codrops/2026/07/27/between-print-and-digital-the-making-of-mersis-website/) | Masked image and label layers share progress; reverse and final object placement matter | One release signal for two points, line establishment and SOUND handoff |
| [Pell Mell / Gaspard Silvestre](https://tympanus.net/codrops/2026/03/27/pell-mell-crafting-a-visual-exploration-platform-with-editorial-rhythm/) | Editorial rhythm, modular native interactions and mobile composition carry identity | Small coherent effects around retained artist type; no copied simple card scale |
| [Arnaud Rocca](https://tympanus.net/codrops/2026/03/31/arnaud-roccas-portfolio-from-a-gsap-powered-motion-system-to-fluid-webgl/) | Common letters survive rather than fading whole words; cleanup prevents accumulated split DOM | Stable one-to-one glyph reuse, masked cascade, current-presentation interruption and cleanup |
| [Joseph Santamaria](https://tympanus.net/codrops/2025/11/19/how-to-build-cinematic-3d-scroll-experiences-with-gsap/) | Scroll coordinates spatial narrative and typographic layers | Existing short native timeline, two projected points; no copied particle environment/long scroll |
| [4WIDE creator article](https://tympanus.net/codrops/2026/04/23/building-4wide-turning-distortion-blur-and-motion-into-a-coherent-experience/) / [site](https://4wide.jp/) | Coherence/performance framing reviewed; article retrieval was partial | Keep distortion/blur out of this precise string/glyph study; no detailed hover claim |
| [Trionn](https://trionn.com/about), [Obys](https://obys.agency/), [Shader.se](https://shader.se/) | Shortlist/site text only; Shader retrieval failed; pointer/hover motion not independently observed | Future focused contextual-preview/spatial-hover research, no fabricated technique attribution |

The permanent hover quality questions belong once in [Motion §38](../03-MOTION-SYSTEM.md); MASTER §6 links
that owner. Contextual preview, pointer-reactive surfaces and directional/spatial hover remain researched categories,
not implemented features outside the three approved experiments.

## Validation / review boundary

Latest explicit user instruction overrides the earlier capture/Full plan for this refinement: type-check, lint,
production build, related interaction smoke and major-function regression sanity only. No new screenshots/videos,
Full gate, commit, push or deploy. Existing A/B Lab controls are in actual use and remain isolated from production;
no removed UI is restored. CLEAN AS YOU GO applies only to replaced code with verified references.
The original P2K result/evidence remains historical; current validation status is in HANDOFF.
**REPORT (the user's seven fields) → STOP → USER VISUAL REVIEW.**
