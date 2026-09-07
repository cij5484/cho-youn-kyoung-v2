# SOUND Bow Contact Comparison — current choreography contract

Revision 4 · 2026-09-07 · **B2 visual direction QUALITY APPROVED / FROZEN; P2J feature-driven response implemented for review**.
The latest integrated instruction supersedes the small bronze/short-tail direction. This existing document is
revised in place to avoid duplicate canonical contracts. [Original result](../../../P2I-RESULT.md) and
[original evidence](../../../evidence/p2i/README.md) preserve that earlier experiment. Current evidence is in
[P2I choreography result](../../../P2I-CHOREOGRAPHY-RESULT.md). The user selected B2 + LONG + Electric Violet. [Closeout result](../../../P2I-CLOSEOUT-RESULT.md) owns the final quality decision and QA classifications.

## Physical model and scope

**“Strings vibrate. Bow flows.” / “현은 떨고, 활은 흐른다.”**

**Two strings = micro vibration / tension / resonance. One bow marker = smooth directional travel.
Trail = its recent trajectory. Fast does not mean jittery.**

The two lines retain P2H local-friction rendering and ±0.62px desktop / ±0.34px mobile displacement.
The bow never uses raw waveform coordinates, random walking, trembling, sparks or repeated echo points.
Mixed recording features abstract musical energy; they do not recover the real performer's bow position,
direction or speed. This is physically inspired editorial choreography, not a physical simulation.

The same authentic 02:46–03:04 / 18-second excerpt, explicit LISTEN and truthful native audio states remain.
Hero/Haegeum modules, their shared line holders and the 235svh journey are preserved. Work is only the SOUND Lab;
no public HOME, WORKS, following scene, production adaptive UI, entry ritual, Blender or 3D implementation.

## B2 reference mapping (preserved Lab comparison)

`src/sound/contact-motion.ts` is the central owner of activity, Violet and history tuning.

| Signal/state | Motion role |
|---|---|
| Short RMS energy, rejected DC/silence | Smoothed bow activity and visibility; speed rises with energy |
| Sample-difference roughness | Friction intensity input to speed; never a positional shake |
| Smoothed energy change | Transient/dynamic input to rate; no frame-level impulse position |
| 700ms sustained envelope | Range and slow phrase travel |
| Critically damped rate follower | Keeps velocity continuous when music or B1/B2 targets change |
| Integrated sweep phase + cosine turns | Smooth up/down motion with brief turning points, no triangle hard flip |
| Slower integrated phrase phase | Broad left/right contact zone with bounded range; no random drift |
| Pause/end/buffering | Short deceleration + fade, then stops the clock; re-entry inherits outgoing state |

Analysis and line response stay about 30Hz. The bow advances at display cadence using the **same controller rAF**.
No per-frame React state, additional loop, graph, source picker or audio restart for A/B/activity/trail/color changes.
Elapsed time is bounded for delayed frames; no catch-up teleport after a hidden tab. Angle uses the nearest equivalent
ellipse axis and a small smoothing time, so reversing direction does not flip a directional arrow.

Desktop head is 10×4.2 CSS px, mobile 8×3.6. Horizontal range is up to ±34% of shared line width, scaled by
activity/sustain; the actual excerpt is less than this upper bound. Vertical bounds use shared line geometry:
`upper=min(92px, lineY×.22)`, `lower=min(30px, lineY×.05)` on desktop;
mobile `upper=min(60px, lineY×.14)`, `lower=min(20px, lineY×.05)`.
The asymmetric sweep reserves space for LISTEN below. B1 scales range to .72 and speed to .7 of B2.
The initial ramp grows from the center smoothly; changes preserve phase and filtered state.

## Trail and color tuning

| History setting | Desktop nominal history | Role |
|---|---:|---|
| SHORT | 140ms | Brief path comparison |
| MEDIUM | 280ms | Intermediate |
| LONG | 460ms | **Current canonical default** |
| EXTRA_LONG | 720ms | Explicit experiment, not preferred default |

P2J HOME_SIGNATURE keeps history duration constant, with the retained `.82` mobile scale (377.2ms).
Only B2_REFERENCE retains the previous `.85 + .15×activity` factor. Stored history has hard caps
96 desktop / 64 mobile samples. At typical 60Hz, LONG uses about 28/23 visible samples. A fixed 12 age-band SVG
ribbon progressively tapers width and opacity; one ellipse marks the current contact. No blur, glow or particles.
History is actual chronological path, so it follows turns rather than pointing along an invented straight comet tail.
Longer/shorter tail requests normally change these four central tokens, not component architecture.

| SOUND-only Violet | Hex | Solid contrast on Ivory #F4F0E8 |
|---|---|---:|
| Editorial | #6038C8 | 6.38:1 |
| Electric — **canonical signature** | #6334E5 | 5.86:1 |
| Ink | #492580 | 9.94:1 |

[Calculation](../../../evidence/p2i-choreography/violet-contrast.json) uses relative sRGB luminance.
These ratios apply to **solid swatches**. Fading decorative tails have lower contrast and do not carry essential state.
The strings use existing Charcoal. Global palette/Bronze and body text tokens are unchanged. The three candidates
were rendered in the browser; Electric is now user approved. Editorial/Ink remain Lab/evidence only.

## Renderer decision for this prototype

| Candidate | Fit / tradeoff | P2I outcome |
|---|---|---|
| Optimized SVG + fixed ring buffer | Crisp DPR-independent shape; shares line coordinates; fixed 13 children; bounded CPU path updates | Implemented and profiled. Current measured cost fits the small scene |
| Canvas 2D | Good for denser drawing; one surface, but needs backing-resolution handling and redraw/clear ownership | Compared as an alternative, not implemented or benchmarked against SVG |
| WebGL | Efficient large ribbons/shaders, but adds context/material/lifecycle and device fallback work for one marker | Not justified by this measured prototype; no installation |

Measured at 1440×1000 and 390×844 in Windows headless Chromium, sequential A/B sessions: B2 callback p95
0.8/0.6ms, frame interval p95 about 16.7ms; no sampled long tasks or layout shifts. Idle/settled/offscreen rAF=0.
This is callback cost on a local development build, not total GPU cost, native mobile thermal proof or a universal
60fps guarantee. [Performance data](../../../evidence/p2i-choreography/performance.json).

## Review, accessibility and evidence

A = line-only. B1 = medium movement + LONG. B2 = bold + Electric Violet + LONG. Lab controls preserve playback.
The narrow-screen panel is collapsible; its collapsed position stays outside the caption and audio hit target.
Decorative SVG is aria-hidden/non-focusable/pointer-events:none. Reduced motion uses one static contact without
trail, and retains the real named audio controls/status. Missing analyser leaves real audio and a disclosed static
line visual; it never simulates playback. Offscreen/hidden pauses and resets the overlay; route teardown removes it.

[Evidence index](../../../evidence/p2i-choreography/README.md) includes real-time **silent** browser videos of
A/B1/B2 desktop/mobile with active excerpt, pause/damping, resume, natural end, replay and reverse/offscreen.
Use the live Lab to hear actual synchronized audio. Screenshots supplement videos; they do not prove motion quality.
Windows Playwright WebKit's AudioContext capability limitation is distinct from native Mac Safari. Physical phones,
VoiceOver, Retina assets and sustained thermal QA remain explicit open evidence, not silently passed.

The user approved B2 + LONG + Electric Violet as the production direction. A/B1 and other Violets are
preserved as Lab/evidence only. `SoundExperience` exposes locale/source, never comparison props; it applies
`soundDirection` centrally. The Lab `/` and `/en` mount this API without selectors. Explicit `?compare=a`
or `?compare=b` opens the Lab-only adapter and controls. Query strings alone cannot change the canonical API.
Both production artifact builds exclude the entire Lab; the public HOME remains unimplemented.

## Central tuning contract

Owner: [contact-motion.ts](../../../src/sound/contact-motion.ts). Approved numbers are unchanged by closeout.

| Request | Configuration owner |
|---|---|
| Activity/sweep speed | `activity.bold.speed/range`; default `soundDirection.activity` |
| Marker size/opacity | `desktop/mobile.width/height`, `marker.opacity/staticOpacity` |
| Horizontal range | `horizontal.center/range` (center .5, range .34) |
| Vertical range | `desktop/mobile.upper/lower/upperFraction/lowerFraction` |
| Longer/shorter history | `trail.long.historyMs` = **460**, or `trailPersistence` = 1 multiplier |
| Trail visibility/taper | `trail.long.opacity/width`, `history.fadeExponent` |
| Mobile/history capacity | `mobile.historyScale`, `desktop/mobile.historySamples` |
| Violet strength | `violetStrength` = 1 alpha multiplier, `colors.electric` = #6334E5 |
| Audio-reactive gain | `audioGain` = 5, envelope-driven rather than positional waveform |

LONG is nominal 460ms; HOME_SIGNATURE uses the retained mobile .82 factor without per-frame energy scaling.
A request such as “꼬리를 더 길게” changes history/persistence configuration first. The finite buffer is an
intentional cap; unusually long histories/high refresh rates require checking the cap rather than silently
claiming unlimited persistence. No component choreography rewrite is normally needed.

## P2I closeout QA boundary (historical)

[QA evidence](../../../evidence/p2i-closeout/README.md) distinguishes the pre-existing Windows foundation Lab
font-wrap shift, Windows WebKit AudioContext absence and media interception mismatch, and partial native Safari
coverage. Full remains red where recorded; no threshold/test was relaxed. These are non-blocking for the
explicitly approved SOUND visual freeze, not a Full/deployment waiver. Confirmed Safari regressions would block.
Philosophy belongs to [MASTER §3.1](../00-MASTER-PLAN.md#v2-experience-principles), learning terms to the
[human glossary](../INTERACTION-GLOSSARY.md). **REPORT → STOP**; no next scene is authorized.

## P2J — shared engine / feature data / preset contract

The canonical scalable target is **BowChoreographyEngine + AudioFeatureData + TuningPreset**, with offline
analysis plus lightweight live response. P2J proves this seam using the existing 18-second asset only.
Visual composition, Violet, marker dimensions, string friction and LONG remain frozen. More sensitive response
is implemented and tested; subjective musical approval of that new response remains the user's review.

| Owner | Responsibility / boundary |
|---|---|
| [bow-engine.ts](../../../src/sound/bow-engine.ts) | Shared strings + bow visual lifecycle, feature sampling, pause/reset/teardown. No track timestamp, genre branch or media player |
| [features.ts](../../../src/audio/features.ts) | Versioned data validation, identity/duration binding, interpolation at **native media.currentTime**; seeks/replay have no queued event backlog or second clock |
| [tuning-presets.ts](../../../src/sound/tuning-presets.ts) | HOME_SIGNATURE and preserved B2_REFERENCE. SANJO/JEONGAK are future optional tuning, not invented genre animations |
| [controller.ts](../../../src/sound/controller.ts) | Native activation/state/playhead, one AudioContext, same rAF, visibility/reduced/route cleanup; no global player |
| [source.ts](../../../src/sound/source.ts) | HOME's approved asset, identity/hash, feature reference, title and duration. This host configuration may be replaced without rewriting motion |

Hardcoding audit: the old B2 has **no timestamp cue list, manual direction/speed/onset points or pitch positions**.
Its constants are general artistic tuning; only source/UI describe 02:46–03:04 / 18s. Its limitation was information:
live energy/difference could not distinguish same-energy timbre changes well. No per-second override was added.
AudioFeatureData and preset do not depend on the HOME title/duration. Future Album Detail supplies the active track
and its authored feature reference through an adapter, preserves its route-scoped player, and destroys the engine
on track/route lifecycle boundaries. Album integration/data migration are **not implemented**.
The mathematical model and feature contract are track-independent; the current SVG adapter still consumes the
host's two line-holder positions/sizes, release readiness (`--sound-release`) and scene styling. An Album host
must supply that geometry/visibility adapter. This is a reusable two-string/bow renderer, not a drop-in renderer
for arbitrary page markup; no per-track choreography rewrite is required.

### AudioFeatureData v1

`analysisVersion: 'bow-features/1'`, `trackId`, `sourceSha256`, PCM `sampleRate`, `featureRate`, `duration`,
`energy[]`, `onsets[]`, `spectralFlux[]`, `phraseEnvelope[]`, and
`pitchContour: null | { midi: number[], confidence: number[] }`.
Uniform channel length is `ceil(duration × featureRate)`. Scalar channels/confidence are integers 0–1000;
MIDI is 0–127 when present. Current data is **25Hz / 450 frames / 6,713 bytes**, versus 434,470 audio bytes.
The last partial frame is held to duration; out-of-range/native-ended time returns silence. Valid neighboring
frames are linearly interpolated. Pitch never interpolates through an unreliable/unvoiced neighbor.

Reject invalid shape/version, wrong track/hash or duration mismatch beyond one feature frame. Use actual live
analysis as fallback, never a prerecorded fake playback clock. The feature hash identifies the **audio bytes**;
contract tests check the actual checked-in file. Re-extract and rebind after audio replacement. No runtime
download/hash of the entire track is required just to paint. Missing Web Audio keeps the existing disclosed static
visual with real native playback; precomputed data does not bypass that capability contract.

### Offline extraction and batch prototype

Run from repository root, with the pinned Node/Playwright Chromium installed:

```sh
npm run extract:audio -- scripts/audio/home-manifest.json
```

[Manifest](../../../scripts/audio/home-manifest.json) lists explicit `{ trackId, input, output }` entries.
[CLI](../../../scripts/extract-audio-features.mjs) processes one track at a time, validates unique IDs/outputs,
protects input from output replacement, records hashes/size/decoder, and writes deterministic compact JSON.
It never discovers/migrates all legacy audio. Current proof uses one authorized asset; a two-entry local fixture
checks batch behavior without registering new content. Decoder-specific rounding can vary across versions/platforms;
regenerate under the pinned toolchain and review the resulting diff. Full-length/whole-album throughput is unmeasured.

Local Chromium `OfflineAudioContext.decodeAudioData` downmixes/resamples to 22,050Hz; nothing uploads or plays aloud.
The conventional extractor uses **fft.js 4.0.4 (MIT, development only)**, a 2048-sample Hann STFT, DC removal,
RMS/log energy, positive log-amplitude spectral flux and local onset peaks (minimum 120ms spacing).
Flux emphasizes 250–3500Hz and reduces broadband transients by spectral flatness weighting. This reduces a source
of percussion dominance, but **does not separate janggu from haegeum or identify actual bow articulations**.
Onset is a musical change cue, never a recovered bow gesture. There is no beat grid or beat-primary mapping.
The current mixed recording has `pitchContour: null` / pitch influence 0; no unreliable tracker is forced into use.

Future pipeline: approved audio → explicit manifest → per-track feature asset → content/asset reference → the same
engine. Load only the selected track's features; do not bundle every album into HOME. Content schema/CMS/global
audio changes, ML, cloud analysis, beat AI and whole-album extraction are outside this task.

Implementation references: [fft.js](https://github.com/indutny/fft.js),
[decodeAudioData](https://developer.mozilla.org/en-US/docs/Web/API/BaseAudioContext/decodeAudioData),
[OfflineAudioContext](https://developer.mozilla.org/en-US/docs/Web/API/OfflineAudioContext).

### HOME_SIGNATURE mapping and user tuning

| Musical input | Current response |
|---|---|
| 88% precomputed energy + 12% live envelope | Faster rate and larger sweep range; no raw waveform position |
| Onset | Smoothed acceleration boost; never a position reset/instant direction flip |
| Positive spectral flux | Higher sweep/reversal rate and range at the same energy |
| Phrase / 650ms slow envelope | Deterministic horizontal travel; no random wandering |
| Reliable pitch (future opt-in) | Gentle vertical bias with 500ms velocity-preserving follower; currently disabled |
| Cosine sweep + integrated rate | Smooth turning point, continuous outgoing velocity |
| Activity | Small smoothed trail-opacity emphasis; recent path/history duration stays stable |

Attack **18ms**, release **180ms**, rate follower **48ms**, range follower **160ms**. Onset input smooths at 12ms;
actual end-to-end response includes the 25Hz feature sampling, about 30Hz live sampling and browser audio latency.
These are filter constants, not a claim of 18ms measured acoustic latency. Max sweep rate is **3.4 cycles/s**,
not pixels/s; geometric amplitude determines linear speed. Dt=0 preserves state exactly. Frame dt is capped at
50ms to prevent hidden-tab catch-up; markers are advanced at display cadence with no second rAF loop.

| User request | First tuning control |
|---|---|
| 더 민감하게 / 더 활발하게 | `activityGain` 1.65, `attack` 18ms / `release` 180ms |
| 새 음 변화에 더 반응하게 | `onsetSensitivity` 1.25 / `spectralFluxSensitivity` .7 |
| 덜 빠르게 / 전환을 완만하게 | `maxSpeed` 3.4, `acceleration` 48ms, `reversalResponse` 1.15 |
| 좌우/상하 범위를 조정 | preset `horizontalRange` / `verticalRange` 1; shared geometry limits remain in contactTuning |
| 음높이에 반응 | `pitchInfluence` 0; require reliable authored extraction evidence before enabling |
| 꼬리를 더 길게 / 선명하게 | `contactTuning.trail.long.historyMs` 460 / opacity .72; `trailPersistence`, preset `trailGain` .2 |

Lab comparison uses `?compare=b&response=b2` versus `?compare=b&response=signature`; the Response select preserves
the active media and graph. Production-facing `SoundExperience` still has no comparison API or user selector.
Both builds exclude the development Lab and audio fixtures; this task does not implement public HOME.
Current validation/measurement/limitations are in [P2J result](../../../P2J-RESULT.md) and
[evidence](../../../evidence/p2j/README.md). **STOP; no following scene is authorized.**
