# P2K evidence — local comparison, REVIEW READY

2026-09-07 · Baseline `930441982ff6e50a1a2f8af6f22910215f6af071`.
[27-field result](../../P2K-RESULT.md), [single prototype owner](../../docs/redesign/review/P2K-INTERACTION-PROTOTYPES.md).
Existing P2F/P2I visual freezes remain. New B choices are not QUALITY APPROVED/FROZEN/canonical before user selection.
No public HOME, next scene, dependency change, commit/main push or deployment.

## Normal-speed A/B videos

These are **silent real-time screen recordings**. Actual sound is available through LISTEN in the live Lab.
Each covers Hero motion, convergence, SOUND entry, the real 18-second playback, replay/pause and text comparisons.
Lab comparison controls may overlay part of a heading; they are development tooling, not final UI.

| Viewport | A — current lines / Haegeum only / whole word | B — spatial / Janggu / shared glyph |
|---|---|---|
| 1440×1000 | [Desktop A](1440-a-realtime-silent.webm) | [Desktop B](1440-b-realtime-silent.webm) |
| 390×844 emulation | [Mobile A](390-a-realtime-silent.webm) | [Mobile B](390-b-realtime-silent.webm) |

Representative B: [desktop hero](1440-b-hero.png), [lock](1440-b-lock.png), [playing](1440-b-playing.png),
[mobile hero](390-b-hero.png), [lock](390-b-lock.png), [playing](390-b-playing.png), [typography](390-b-type.png).
Pigment candidates: [Lacquer #824438](color-lacquer.png), [Burnt #96553F](color-burnt.png), [Rust #703C32](color-rust.png).
All A/B PNGs remain beside the videos. Existing P2I/P2J evidence was preserved.

## Validation and measurements

- [Full log](full-gate.txt), [verification / source hashes](verification.json), [files changed](files-changed.json),
  [documentation links](document-links.json).
- Full PASS: **65 unique Node contracts +307 browser cases**, zero skipped/unexpected/flaky. Root and project
  artifacts exclude this Lab. Seven `full-*-results.json` files retain raw browser reports.
- [Motion metrics](motion-metrics.json): Windows Chromium, sequential unthrottled development captures.
  B desktop idle p95 .6ms / playback .4ms; mobile idle .6ms / playback .7ms. B scrolling callback p95 at most
  3.4ms across recorded stages; frame callback interval p95 ~16.8ms. B raw shifts/long tasks 0 in these runs.
  Costs exclude GPU/thermal; mobile emulation is not a physical device.
- [Scroll shift diagnosis](scroll-shift-diagnosis.json): unchanged Sound default and P2K A both record about .241
  raw layout-shift sum during scripted scroll, primarily original line placement. B records 0. This is separate
  from font-loading CLS and the final production CWV metric; public HOME still excludes these modules. A's video
  also records one 101ms listening long task; no measurement was removed to produce a greener comparison.
- [Percussion analysis](percussion-analysis.json): FFT band/flatness evidence and pre-feedback candidates.
  Nominal feature cadence 100Hz (22,050Hz /221-sample hop ≈99.774Hz). Runtime uses actual native media timestamps.
- [User hit review](user-hit-review.json): approximately 0s, 3–4s, 9s and 14–15s. Five existing candidates cover
  four user-confirmed regions; remaining candidates are estimates, not verified instrument labels.

Initial test failures were narrow authoring/harness errors: a numeric -0 assertion, an ambiguous MENU selector,
an offscreen test that left part of the scene visible, and a missing canonical trailing slash in a test locator.
The implementation returns exact zero at attack onset; selectors/actual offscreen stimulus were corrected.
No existing assertion, timing threshold, route behavior or frozen source was weakened. Final Full has no retries/skips.

Windows WebKit lacks AudioContext. New P2K coverage distinguishes static Haegeum from explicitly disclosed
precomputed Janggu candidates synchronized to real media playback. It is not native Safari visual/VoiceOver proof.
Real phones, native Safari new motion, assistive technology, high-resolution authentic source replacement and
sustained thermal testing remain open. No confirmed blocking regression in this scoped prototype.

Reproduce: `npm.cmd run gate:full`; `node scripts/capture-p2k.mjs` (4195); `node scripts/diagnose-p2k-scroll-shifts.mjs`
(4196). Run browsers sequentially; stop manual 4179/4180 servers before Full. `npm.cmd run dev:interaction`
opens 4180 for user review. **REPORT → STOP → USER APPROVAL.**
