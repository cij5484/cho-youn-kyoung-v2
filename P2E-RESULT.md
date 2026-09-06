# P2E — Hero → Haegeum Transition Prototype Bundle

2026-09-06 · **IMPLEMENTED / VERIFIED LOCALLY / VISUAL REVIEW PENDING / STOP**.
One approved bounded task. [Canonical guide](docs/redesign/review/HOME-HAEGEUM-TRANSITION-PROTOTYPE.md),
[evidence index](evidence/p2e/README.md), [verification manifest](evidence/p2e/verification.json).

## 1. P2D delivery / commit / CI

Approved P2C/P2D implementation and preserved evidence were reviewed and delivered in one coherent commit:
`d758ee10aceaa5fc037c82e4d3fdb108068aecea` — `feat: deliver approved Bold Cropped Hero with provisional portraits`.
87 files; exact list in [delivery receipt](evidence/p2e/delivery-p2d.json). Main push succeeded;
[Fast CI 34026552008](https://github.com/cij5484/cho-youn-kyoung-v2/actions/runs/34026552008) SUCCESS at that SHA.
Local Fast also passed. The reviewed P2D Full evidence was hash verified, not misrepresented as a new run.
Main/origin matched and working tree was clean **before starting P2E**. No deployment.

P2D recorded exactly: Composition APPROVED; Bold Cropped visual direction APPROVED; Motion/interaction LOCALLY
VERIFIED; Portrait assets PROVISIONAL; Final Retina quality PENDING HIGH-RES SOURCE. Existing 1024×1536 sources
are not a blocker for subsequent authorized HOME work. Larger 3/7 sources will trigger reference replacement/Retina QA.

## 2. Hero exit behavior

The same approved B poster DOM starts the experience. The final 1440×1000 initial capture matches P2D at **0 differing pixels**, excluding the rightmost 16px scrollbar area ([comparison](evidence/p2e/initial-comparison.json)). Photo 3→7 retains the closed-aperture exchange. CHO,
YOUN and KYOUNG then separate with different horizontal/vertical rates; the portrait field narrows, leaving
intentional space for LINE. No global Hero opacity fade or replacement header. Pointer depth settles away on exit.

## 3. Hero → Haegeum continuity

One sticky stage and one controller cover **155svh native scroll travel**, including Hero exit. No second pin,
four section scroll-snap screens, wheel interception or automatic playback. The same portrait plane, front/back
mask relationship and two line elements bridge into instrument imagery. Forward, reverse, large jumps, pause,
keyboard skip and menu interruption are tested. Intermediate photographs/type masks share their actual boundaries.

## 4. HEAD / PEG

Confirmed real photo 7 remains in the original Hero plane. The crop retains the instrument head and pegs beside
the partial face. **LINE** emerges while the guide pair reorients beside the visible strings. This is an authentic
photo crop, not an invented isolated instrument. Its native resolution remains provisional.

## 5. STRINGS / BOW

Real supplied folder photograph **(37)** exposes the actual playing contact. A horizontal photographic opening
spreads along the bow's direction as the portrait leaves. **TENSION** is the only stage keyword. Desktop uses a
broad contact field; mobile retains the bow within its vertical reading composition.

## 6. RESONANCE

The **same photo (37)** changes scale/focal point toward the resonator. The visible membrane/wood/lacquer and bow
remain connected to the preceding contact view. **RESONANCE** and the paired guide change placement. No fabricated
vibration, fake sound state or generated macro. Desktop magnification visibly exceeds this source's useful detail.

## 7. FULL HAEGEUM

The user provided the beige reference during this task and explicitly confirmed it is **AI generated**.
It is used as a **visibly labelled provisional editorial final-reveal study**, with matching alt/source documentation.
It is **not documentary photography, verified structure, measured geometry or final asset approval**. No new AI
image was generated. The multiview sheet is reference only and excluded from runtime.

The full vertical field resolves the composition; an authentic isolated photo remains requested before final
photographic/physical sign-off. This material handover is an open visual concern, not concealed as continuous real photography.

## 8. Two-line transformation

The exact same pair moves from Hero diagonal rules → near-vertical peg/string guide → horizontal bow guide →
resonator alignment → full-object alignment. Most visible length stays straight. One pair, no replacement waveform,
no continuous decorative vibration. Lines and images share scroll progress while keeping different rates.

## 9. Desktop motion

The prototype uses strong type displacement, photographic masking, focal enlargement and negative-space change.
Only the relevant keyword appears; local masks reveal/close its letters. Original B remains immediately visible.
An Ivory navigation surface rises continuously only when the moving photograph crosses the header, preserving
artist/MENU legibility without altering frozen P2B source or introducing a header morph.

Local unthrottled Chromium performance is recorded separately from videos in [metrics](evidence/p2e/local-performance.json).
313 frame samples: median/p95 16.7ms, max 16.8ms, no interaction long tasks and 0 idle RAF requests. It is diagnostic, not production CWV or sustained physical-device approval. No dependency or lockfile change.

## 10. Mobile translation

390px has independent crop rectangles, focal points/scales, line positions and keyword placement above the image.
No pointer effect or shrunken desktop front-letter mask. 320px final keyword fits; 200% text uses document order
and wrapping. Normal vertical scroll remains available. Reduced motion provides four static perspectives after
the static Hero, retaining order, alt text and AI provenance. Failed/late continuation images use that fallback.

## 11. Asset audit / requests

[Provenance](evidence/p2e/asset-provenance.json) separates real photo (37), confirmed photo 7, AI beige reference and
unverified multiview reference. Sources and previous 42-file audit were preserved; only native-size WebP derivatives
were created. New runtime photos: 315,796 B real playing image +64,914 B AI editorial reference, both 1024×1536,
Lab-only. No public asset/content record registration.

Request: authentic complete isolated instrument against a clean neutral background; head/peg macro from photo 7's
side; actual two-string/bow contact macro with horizontal room; resonator membrane/bridge and 3/4 wood surface
macro. Prefer original camera files and detail frames around 2400px+ long edge. Larger unchanged Hero 3/7 originals
remain requested independently. [Detailed capture requirements](docs/redesign/review/HOME-HAEGEUM-TRANSITION-PROTOTYPE.md#source-audit-and-requests).

## 12. References researched

[Codrops — image expansion within typography](https://tympanus.net/codrops/2024/04/02/on-scroll-expanding-image-animation-within-typography/)
informed typography yielding its occupied space to imagery.
[Codrops — layered zoom on scroll](https://tympanus.net/codrops/2025/10/29/building-a-layered-zoom-scroll-effect-with-gsap-scrollsmoother-and-scrolltrigger/)
informed shared progress, masks and depth. These principles were reinterpreted through the selected poster,
actual instrument focal points and paired guides. No exact layout, composition, timing, assets, branding or source
code was copied; their GSAP/scroll-smoothing stack was not added. Article research, not exhaustive reference-device QA.

## 13. Visual evidence / video

Preview: **http://127.0.0.1:4178/** and `/en/`; original approved Hero remains `npm run dev:hero` on 4177.
[Evidence index](evidence/p2e/README.md) covers desktop/wide/tablet, mobile390/320, every stage, intermediate masks,
menu, WebKit and static/enlarged-text views. [Desktop video](evidence/p2e/desktop-realtime.webm) and
[mobile viewport video](evidence/p2e/mobile-realtime.webm) are normal-speed recordings with native wheel and reversal.
The latter is viewport emulation, not a physical touchscreen recording.

## 14. Tests

Full gate: **PASS — 38 Node +191 browser**: 84 root/project routes +11 foundation +26 frozen navigation +44 Hero
(22 per engine) +26 Haegeum (13 per engine). Type-check, lint, locale/schema/private-draft visibility, both static
builds, no public Hero/instrument artifacts and actionlint pass. Localhost-only Lab build rejects intentionally.
[Full log](evidence/p2e/full-gate.txt), [Haegeum results](evidence/p2e/haegeum-test-results.json), [manifest](evidence/p2e/verification.json).

Tests caught and fixed mobile final-word clipping, enlarged-heading overflow and hash navigation resetting the
Lab/focus. Settled reverse checks wait for the actual target, and the idle-RAF probe excludes its own sampling loop.
Assertions were not weakened to hide failures. Existing P2D and frozen P2B regressions remain intact.

## 15. Remaining visual concerns

- Real resonator macro is visibly soft at wide scale; source replacement is necessary for final photographic quality.
- Real-purple photography → generated beige final reference changes material/background character. This is a disclosed provisional handover; final authentic imagery and user visual review must settle it.
- The 155svh four-stage pace is intentionally concentrated. Actual touch/wheel preference and narrower viewing heights need user/device review before motion freeze.
- P2E Safari native page load/accessibility structure was observed; a complete actual Safari motion walkthrough was not completed. Automated WebKit is separately identified. Physical iPhone/Android, browser chrome gestures, VoiceOver and thermal QA remain open. Historical P2D Mac Safari smoke does not close P2E's device gates.
- Hero 3/7 Retina source quality remains pending without blocking subsequent authorized HOME tasks.

## 16. Recommended next bounded task / STOP

After this visual review, recommend **P2F — Hero→Haegeum Refinement & Device QA Bundle**: tune this single
transition's pace/line/crop relationship from user feedback, integrate better authentic assets if available,
and validate actual Safari/mobile/assistive-tech behavior. Do not automatically begin SOUND or any following scene.

P2E changes remain local and uncommitted for visual review. Only approved P2D was committed/pushed; no P2E push,
deployment, production HOME, actual content migration, SOUND/WORKS/Album3D/Performance/About/Blender/model or next phase.
**REPORT → STOP → USER APPROVAL.**
