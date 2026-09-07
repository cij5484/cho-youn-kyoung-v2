# P2J — foundation CLS and feature-driven bow evidence

2026-09-07. Baseline `05ce1f21488aafb3212e4abe84acce63b8f34777`, V2 repository only.
One authorized bundle; no next scene, deployment, audio/content migration or frozen Hero/Haegeum production changes.
[Result](../../P2J-RESULT.md), [canonical engine/tuning contract](../../docs/redesign/review/SOUND-BOW-CONTACT-COMPARISON.md).

## Font CLS: actual owner fixed

P2I diagnosed the P2A wrapping flex masthead: fallback 3 rows → loaded 2 rows, moving the following Lab specimen
by 35.19px. The historical baseline/evidence remain [here](../p2i-closeout/README.md).
P2J replaces only that Lab masthead's layout with explicit mobile grid rows / wide three-column grid.
No font loading settings, global token, font size, line-height, preload or production style changes.

| Current experiment | CLS |
|---|---:|
| 390px, 1200ms delayed fonts, three independent contexts | .0004472308 each |
| 390px, normal font load | .0004472308 |
| 1440px, delayed fonts | .0017975559 |
| 320px, missing fonts | 0 |
| Historical P2A/P2I 390px delayed case | .1600214061 |

The original `< .1` assertion, 1200ms fault stimulus and 100ms post-font observation remain unchanged.
[Raw CLS sources/geometry](font-cls.json), [command output](font-verification.txt),
[mobile before](font-390-before.png) / [after](font-390-delayed-after.png),
[desktop before](font-1440-before.png) / [after](font-1440-delayed-after.png),
[missing](font-320-missing-after.png). The remaining tiny text-metric shift is recorded, not rounded to zero.

## Extraction / batch / binding

[Initial extraction](extraction.json), [two-entry batch](batch-extraction.json),
[explicit reproducible batch fixture](batch-fixture-manifest.json).
The batch reuses the **same approved excerpt with two IDs**, not two newly migrated recordings.
The first output exactly matches the checked-in feature data, hash
`695283bd45af08459c9fc7215fd0d2a3117d76ca11f127c433904d8f5e0c78e0`.
The alias differs only in identity; all feature channels match. Native local AAC decoding/extraction takes about
1.3s per 18s fixture here, not an album-throughput benchmark. 25Hz / 450 frames / 68 change peaks / 6,713 bytes.
Pitch is null. Peaks are mixed-recording changes, not a claim of 68 genuine bow articulations.
[Dependency install](npm-install.txt): fft.js 4.0.4 only, development dependency, zero audit findings at installation.

## Real-time visual comparison

These are **silent**, normal-speed Playwright screen recordings. Audio was actively playing during recording;
use the live Lab to hear the unchanged excerpt. No sped-up edit or invented audio synchronization.

| Viewport | Frozen B2 response | P2J HOME_SIGNATURE |
|---|---|---|
| 1440×1000 | [video](1440-b2-realtime-silent.webm) / [still](1440-b2-playing.png) | [video](1440-signature-realtime-silent.webm) / [still](1440-signature-playing.png) |
| 390×844 | [video](390-b2-realtime-silent.webm) / [still](390-b2-playing.png) | [video](390-signature-realtime-silent.webm) / [still](390-signature-playing.png) |

The same B2 shape/color/geometry/LONG is retained. One signature has faster and broader sweeps, a longer visible
recent path, smooth turning points and no raw waveform jitter. Musical preference still needs user listening/review;
motion metrics alone cannot certify it. P2I's visual QUALITY APPROVED / FROZEN status is preserved.

| First 10s, sequential sample | B2 | Signature |
|---|---:|---:|
| Desktop mean sweep rate (cycles/s) | 1.578 | 2.216 |
| Desktop vertical reversals | 32 | 45 |
| Desktop total screen-space travel (px) | 4,041 | 8,382 |
| Desktop horizontal span (px) | 751 | 829 |
| Mobile total travel (px) | 1,783 | 3,189 |
| Mobile horizontal span (px) | 201 | 221 |
| Desktop/mobile callback p95 (ms) | .6 / .6 | .6 / .6 |
| Frame interval p95 (ms) | 16.8 / 16.7 | 16.8 / 16.7 |

[Raw per-frame samples / cost / states](response-comparison.json). All four captures record zero sampled long
tasks and zero layout shift during listening. Settled pause, idle and offscreen each have zero recorded rAF
callbacks. Measurements are Windows headless Chromium, local development, no throttling, with screen recording;
not total GPU cost, physical-phone thermal QA, acoustic latency or a universal performance guarantee.
LONG = 460ms (retained mobile scale .82 → 377.2ms). Duration is stable; opacity and distance respond gradually.

## Full gate and harness corrections

**Full PASS: 56 unique Node contracts + 285 browser cases**, zero skipped/flaky. SOUND repeats its 18 Node
contracts within Full. [Verification](verification.json), [full log](full-gate.txt). Browser breakdown: routes 84,
foundation 11, navigation 26, Hero 44, Haegeum 32, SOUND 88.
No Font CLS assertion/delay was loosened; no test is skipped to turn that failure green.
The old Windows failures also exposed invalid environment assumptions. Coverage is now explicit:

| Finding | Correction / honest coverage |
|---|---|
| Windows WebKit AudioContext is undefined | Assert actual native playback plus disclosed static lines, zero analysis and zero bow opacity. Supported engines retain analyser/geometry assertions. This does not certify native Safari analyser motion |
| WMF media requests bypass page.route | A test-only Vite HTTP fixture returns real 404 or holds/releases actual bytes. Error, cancel and 12s timeout are exercised by both native media backends; no browser-error mock masquerades as a server fault |
| Native Win WebKit Tab skips links in a plain HTML page | A plain-document capability assertion records this. Test skip activation, both application focus-trap boundaries, Esc restore and text scaling; first-link Tab/full natural cycle remains asserted in supported Chromium/non-Windows contexts |
| Mouse radio activation does not guarantee focus | Explicit keyboard focus + Space gives the existing retention assertion a portable precondition |
| DOMContentLoaded precedes scene mount; route click precedes new scene initialization | Wait for actual scene progress / URL / main focus before scrolling. No arbitrary new sleep or weaker scroll threshold |
| New helper initially used Playwright hidden to mean opacity 0 | Correct it to assert exact opacity 0; Playwright visibility does not mean visual opacity |

Win link-tabbing is a **remaining platform coverage gap**, not product Tab verification. Native Safari remains
separate. Product Hero/Haegeum/navigation files are unchanged. Test-only HTTP endpoints and feature/engine/Lab
markers are explicitly prohibited in both production artifacts.

Intermediate diagnostic logs/results are preserved (`sound-first*`, `sound-targeted*`, `sound-readiness*`,
`hero-focus*`, `haegeum-readiness*`). They are failed/intermediate harness revisions, not final gate results.
The earlier [P2I HTTP diagnostic](../p2i-closeout/webkit-http-diagnosis.json) remains historical evidence;
the authoritative index is its README. Current targeted feature/motion contracts: [18 checks](feature-contracts.txt).

## Reproduce and remaining boundaries

From repo root, pinned Node/npm and `npx playwright install chromium webkit`:

```sh
npm run extract:audio -- scripts/audio/home-manifest.json
npm run extract:audio -- evidence/p2j/batch-fixture-manifest.json
npm run test:sound:contract
node scripts/verify-p2j-font-cls.mjs
node scripts/capture-p2j-response.mjs
npm run gate:full
```

Run browser suites/captures sequentially; stop any manual 4179 server before Full. Outputs under `.checkpoints`
are regenerable and ignored. The feature asset, code, manifests, tests, docs and curated evidence are in Git.
Native Mac Safari new-response verification, physical phones, VoiceOver/TalkBack, Retina sources and sustained
thermal QA remain open. No claim of source separation, reliable pitch, full-album throughput or production HOME.
Implementation delivered as `e2456dd240ed0f4e4df54b536eda7e6a6727a55e`; exact-SHA
[Fast CI 34085930019](https://github.com/cij5484/cho-youn-kyoung-v2/actions/runs/34085930019) SUCCESS.
[Delivery / committed files](delivery.json) records clean main/origin before the separate documentation receipt.
No deployment. **STOP; no WORKS or next HOME Scene.**
