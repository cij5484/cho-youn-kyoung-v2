# P2J — Foundation CLS Closeout + Scalable Audio Choreography + High-Sensitivity Bow

2026-09-07 · One authorized bundle. SOUND visual **QUALITY APPROVED / FROZEN** remains B2 Bold / LONG
460ms / Electric Violet #6334E5. New HOME_SIGNATURE responsiveness is implemented for visual/auditory review.
[Canonical contract](docs/redesign/review/SOUND-BOW-CONTACT-COMPARISON.md), [evidence index](evidence/p2j/README.md).

1. **Font CLS root cause / fix.** P2A Lab flex masthead changed 3 rows → 2 after loading fonts, moving following
   content ~35.19px. Explicit mobile grid rows / wide grid fixes topology without touching production fonts/styles.
   390px delayed CLS **.160021 → .000447**, repeated 3/3. Original threshold/stimulus/observation unchanged.
2. **Full Gate result.** **PASS: 56 unique Node contracts + 285 browser cases**, zero skipped/flaky.
   SOUND reruns its 18 Node contracts inside the Full sequence. [Verification](evidence/p2j/verification.json).
   Platform capability coverage is explicit; Full is not a native Safari or deployment certificate.
3. **Current hardcoding audit.** No marker timestamp cues, manual direction/speed/onset positions or pitch script.
   The 18-second bounds/title belong to HOME source/UI only. Old B2's limitation was live-energy information.
4. **Reusable engine assessment.** One model/renderer consumes validated data + tuning. Same audio under another
   track ID yields identical feature channels; Album playback adapter/integration remains future work.
5. **BowChoreographyEngine structure.** `bow-engine.ts` coordinates existing string response, smooth bow and trail.
   Native controller owns media lifecycle, currentTime, one graph/rAF, reduced/offscreen/route cleanup.
6. **AudioFeatureData structure.** Version, track ID, audio SHA, sample/feature rates, duration, quantized energy,
   onsets, spectral flux, phrase, nullable pitch/confidence. Wrong identity/version/shape falls back to live analysis.
7. **TuningPreset structure.** HOME_SIGNATURE plus preserved B2_REFERENCE. Activity/onset/flux/pitch, horizontal/
   vertical range, speed cap, acceleration/reversal, attack/release and trail gain stay centrally adjustable.
8. **Feature extraction prototype.** Approved 18s AAC → local Chromium decode → conventional FFT analysis →
   25Hz / 450 frames / **6,713-byte JSON**, 1.55% of audio size. Repeat output SHA is identical.
9. **Onset responsiveness.** Detected change peaks raise acceleration without changing position at dt=0.
   Model test demonstrates increased rate within 60ms; this is not measured acoustic end-to-end latency.
10. **Spectral Flux responsiveness.** Positive band-spectrum changes raise directional activity at constant energy.
    Synthetic same-level timbre-change test separates flux/onset response from a beat grid.
11. **Pitch response.** **Disabled**: mixed recording has `pitchContour:null`, influence 0. Optional reliable contour
    is confidence-gated and softly biased; no forced/unreliable pitch tracker.
12. **Energy response.** 88% offline envelope + 12% live energy controls speed, range and small trail emphasis.
    Near-silent/unavailable/paused media never gets a fabricated playback response.
13. **Attack / Release smoothing.** 18ms attack / 180ms release; velocity-preserving rate follower 48ms and range
    follower 160ms. Smooth integrated cosine reversals; no raw-waveform coordinates or marker jitter.
14. **New marker activity compared with B2.** First 10s: average sweep **1.58 → 2.22 cycles/s (~1.40×)**;
    vertical turns **32 → 45**; desktop travel **4,041 → 8,382px**. Musical preference awaits listening review.
15. **Trail behavior.** LONG 460ms retained; mobile uses existing .82 scale. History duration is stable, actual
    recent path tapers/fades, with modest smoothed opacity response. Longer tail remains a config change.
16. **Album-scale strategy.** Active track loads its own feature reference and uses this engine; no per-ID renderer,
    global player or eagerly loaded whole-album feature bundle. No album/content migration in P2J.
17. **Batch-processing strategy.** Explicit manifest, sequential local extraction, unique IDs/outputs, source
    protection and hash reporting. Two-entry same-source fixture proves batch wiring, not whole-album throughput.
18. **Performance.** Desktop/mobile callback p95 **.6ms**, frame interval p95 **16.8/16.7ms**; sampled playing CLS
    and long tasks 0, idle/settled-pause/offscreen rAF 0. Emulator/dev callback measurement excludes GPU/thermal proof.
19. **Glossary updates.** Added 12 terms (feature/extraction/offline/batch/onset/flux/pitch/energy/phrase/
    attack-release/hybrid/acceleration); updated Velocity Continuity. **41 human-reference terms** in the existing doc.
20. **Visual/video evidence.** [Desktop B2](evidence/p2j/1440-b2-realtime-silent.webm) /
    [Signature](evidence/p2j/1440-signature-realtime-silent.webm),
    [mobile B2](evidence/p2j/390-b2-realtime-silent.webm) /
    [Signature](evidence/p2j/390-signature-realtime-silent.webm). Normal-speed silent captures; live Lab provides audio.
21. **Tests.** Type/lint, 18 feature/motion contracts, root/project builds, routing/content/artifact exclusion,
    Font CLS, supported analyser/static capability branches, HTTP media faults, seek/pause/replay/offscreen,
    320/390px bounds and stable trail history. [Full log](evidence/p2j/full-gate.txt); no Font threshold relaxation.
22. **Commit / CI.** Main delivery is authorized after validation. Implementation SHA, committed files and exact-SHA
    Fast CI are recorded in the delivery receipt after push. No deployment.
23. **Remaining risks.** New response still needs user auditory/visual acceptance. Mixed features do not identify
    actual bow articulations or fully remove percussion. Pitch and full-album performance unproven. Native Safari
    new motion/full lifecycle, physical phones, assistive tech and thermal QA remain separate. Windows WebKit's
    missing AudioContext and link-tabbing policy are explicit coverage limits; supported-browser checks remain.
24. **Recommended next larger bounded task.** After response review, propose one SOUND response freeze/native
    Safari/mobile QA closeout bundle: auditory acceptance → device playback/motion → accessibility/cleanup →
    evidence/freeze decision. No automatic WORKS or next HOME scene.

Scope: foundation Lab layout, shared audio/SOUND engine/data/tuning, development comparison, bounded extraction/
HTTP-fixture/verification tooling, relevant tests, canonical docs and evidence. fft.js 4.0.4 is the only new dependency,
development-only. Frozen Hero/Haegeum/navigation implementation, real audio bytes, content, routes and workflow YAML
are unchanged. Fast gains the feature/motion Node contract command; no browser requirement is added to Fast.
Rollback baseline `05ce1f21488aafb3212e4abe84acce63b8f34777`; preserve prior evidence and unrelated changes.

**REPORT → STOP → USER APPROVAL. No deployment, WORKS or following HOME scene.**
