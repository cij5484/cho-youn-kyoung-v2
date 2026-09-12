# Phase 2B — mobile performance pass

2026-09-12 · IMPLEMENTED / LOCAL ONLY. Baseline main `e22f42bff707402203187305523ca4833f857410`.
Initial pass stopped locally. Subsequent user request authorizes PR / merge / Pages delivery with the gallery
revision below. Measurements describe the original local pass; visual quality remains user-owned.

## Method and limits

Built `npm.cmd run build:development-preview` before and after changes, serving the actual minified
combined Pages artifact at local port 4192. Temporary response-only instrumentation counted rAF callbacks,
geometry reads, WebGL draws, analyser calls and long tasks over six-second windows. It is not shipped.
Samples are retained in ignored `.checkpoints/mobile-performance/`; build log is `.checkpoints/mobile-final-build.log`.
Viewport: 390 × 844, DPR 1, Windows embedded Chromium on a 120 Hz host. No physical phone, CPU throttle,
GPU trace or thermal test was available. Geometry reads are not proof of forced synchronous layout.

Occluded browser samples sometimes ran near 1 Hz despite `document.hidden=false`. Their frame timing is
excluded, notably early ENTRY/MEDIA and audio samples. Counts still describe executed work, but cannot
support an FPS improvement claim. Scroll samples are exploratory, not deterministic identical trajectories.

## Evidence and changes

| Owner | Observed waste | Change / measured result |
| --- | --- | --- |
| HOME `works-motion.ts` | Five unpointed cards measured every frame; duplicate shared-frame bounds and unused masks | Measure only pointed/used objects, share frame bounds. Stationary outro: 22,213 reads / 716 frames → 15,849 / 720, **29.0% fewer reads per frame**. Callback CPU was 916.7 → 1,074.4 ms; do not claim a CPU/FPS gain. Both samples had zero >34 ms gaps. |
| ABOUT helix | Stage dimensions read repeatedly while ribbons animate | Cache dimensions on resize, constant ribbon opacity/height set once, reuse GSAP quick setters. Final idle: **0 geometry reads**, 720 frames, max gap 8.5 ms, zero long tasks. Previous drag window: 1,872 reads / 720 frames. Different gesture/idle workloads; this is removal of the identified reads, not a matched CPU benchmark. |
| ABOUT / ENTRY images | All 12 full portraits used for small cards | Authentic derivatives, longest edge 480: **36,723,966 → 1,838,400 source pixels (-95.0%)**, **2,020,516 → 139,124 bytes (-93.1%)**. ABOUT mobile initial set (768 px hero + 11 thumbnails): 2,571,552 pixels / 198,902 bytes. Focus still loads the selected original. These are asset budgets, not measured resident memory. |
| Audio response | Every live spectrum update also ran unused waveform/YIN pitch estimation | Diagnostic pitch is explicit opt-in. Default visual output retains spectra and verified precomputed events; a runnable test compares all consumed signals with diagnostics enabled. Offline detector and all 58 analysis files are unchanged. |

HOME exploratory scrolling also fell from 16,319 to 2,292 geometry reads, but differing scroll phase coverage
makes that reduction unsuitable as a general percentage claim. HOME 04 JSX/CSS/artistic tuning are untouched.

## Additional authorized ABOUT behavior

Latest user revision: column selection opens only the helix. Selecting a photo inside it takes the shortest
angular path to face the chosen portrait forward, then expands from that card. The thumbnail remains visible
during original decode, and the frame returns to the same card on close. Idle rotation ramps gently to 0.12 rad/s; drag/inertia, selection,
photo focus, hidden document and reduced motion suspend it. Photo close keeps the helix available;
outer Close returns to the strip. Existing signature geometry, colors and tails remain.

Autorotation adds real work: final idle callback CPU was 687.2 ms / six seconds, compared with the earlier
non-autorotating drag sample's 364.3 ms. It is **not a net CPU reduction claim**. Replacing per-frame GSAP
tween construction with existing quick setters reduced the new autorotating sample from 771.6 to 687.2 ms
on this host (single samples, not a guaranteed gain). Final open/drag/close retained the composition.
Closing removed the gallery, restored scroll and reduced observed global listeners from 39 to 34;
the remaining ambient page signature is intentional. Closed sample: zero geometry reads/long tasks.

Final audio playback sample: 153 spectrum reads and **zero waveform reads**; before, every spectrum read
also made a waveform read (85/85 in the partially occluded sample). Final analysis state was `ready`,
native media time advanced, and the browser reported no runtime errors. Final six-second sample:
720 frames, max gap 8.5 ms, zero long tasks. Do not compare CPU across the differently throttled samples.

## Remaining scope checked without speculative edits

| Area | Observations / decision |
| --- | --- |
| ENTRY | Initial idle recorded zero app rAF work. CSS3D sculpture is lazy, not WebGL; reuse portrait derivatives. Active timing was occluded, so no FPS claim. |
| WORKS | Active sample: 706 frames, 1 gap >34 ms, no long task. Existing mobile DPR 1.25, texture limit 1024, demand/settled/offscreen gates and disposal retained. Offscreen sample included the transition (249 draws), so it is not proof of steady offscreen zero work. |
| Performance MASK / DUAL / TIME | Respectively 712 / 704 / 719 sampled frames; 0 / 1 / 0 gaps >34 ms, no long tasks. Only 10 / 0 / 2 geometry reads. No evidence justified changing these owners. |
| Album Detail | Scroll sample: 713 frames, one >34 ms gap, no long tasks. Tray demand rendering and disposal retained; no DPR/material/design changes. |
| MEDIA | Existing event-driven renderer, intersection gate and DPR cap retained. Occluded offscreen sample showed zero draws but is not a reliable active timing measurement. No proven bottleneck was changed here. |
| Global player / signature | Playback state and native media time preserved. No separate clock, new detector, changed JSON, reduced choreography or eager catalog loading. Closed-player sample had no analyser calls. |

This pass found removable work and asset overhead, not a reliably reproduced severe sustained mobile frame-drop
condition. Physical-device active MEDIA/ENTRY and sustained GPU/thermal profiling remain follow-ups.

## Validation and rollback

- Typecheck and changed-scope ESLint passed.
- Eleven targeted portrait/entry/audio identity, seek, cancellation and pitch-position tests passed.
- Final actual combined development-preview build passed (existing large-chunk advisory remains).
- Mobile production-preview smoke: selected photo 9 reached x=0 / rotationY≈0 before focus; closing
  retained helix, idle pose advanced, drag worked, outer Close restored the strip and body scrolling.
- No Full Release Gate, broad E2E, physical-device certification or release/visual approval is claimed.

Changed owners: `src/home/works-motion.ts`, ABOUT data/gallery/model/component and derivatives,
`src/entry/EntrySculpture.tsx`, `src/audio/instrument-response.ts`, two targeted test files and owning docs.
Derivative reproduction: `scripts/prepare-portrait-derivatives.py` (Pillow); original images remain intact.
Rollback is limited to this local diff and added derivatives; retain pre-existing assets and historical evidence.
