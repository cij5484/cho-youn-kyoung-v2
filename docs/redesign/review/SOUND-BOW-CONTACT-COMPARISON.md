# SOUND Bow Contact Comparison — current choreography contract

Revision 3 · 2026-09-07 · **B2 visual direction APPROVED / canonical production direction**.
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

## Motion and audio mapping

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

History duration is multiplied by `.85 + .15×activity`, and by `.82` on mobile. Stored history has hard caps
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

LONG is nominal 460ms; existing energy (.85 + .15×activity) and mobile (.82) factors remain.
A request such as “꼬리를 더 길게” changes history/persistence configuration first. The finite buffer is an
intentional cap; unusually long histories/high refresh rates require checking the cap rather than silently
claiming unlimited persistence. No component choreography rewrite is normally needed.

## Closeout QA boundary

[QA evidence](../../../evidence/p2i-closeout/README.md) distinguishes the pre-existing Windows foundation Lab
font-wrap shift, Windows WebKit AudioContext absence and media interception mismatch, and partial native Safari
coverage. Full remains red where recorded; no threshold/test was relaxed. These are non-blocking for the
explicitly approved SOUND visual freeze, not a Full/deployment waiver. Confirmed Safari regressions would block.
Philosophy belongs to [MASTER §3.1](../00-MASTER-PLAN.md#v2-experience-principles), learning terms to the
[human glossary](../INTERACTION-GLOSSARY.md). **REPORT → STOP**; no next scene is authorized.
