# P2I Choreography — visual / validation evidence

2026-09-07 · Windows Chromium 153.0.8010.12 · local development Lab · REVIEW READY WITH QA GAPS.

## Real-time video comparison

These are SILENT, real-time Playwright browser recordings, not fabricated animation renders. Each full comparison
shows actual native playback, a busy excerpt, pause/damping, resume, natural end, replay and reverse/offscreen pause.
Recordings are 25fps; display-frame scheduling is measured separately. Use the live Lab for actual synchronized listening.

| Variant | Desktop 1440×1000 | Mobile emulation 390×844 |
|---|---|---|
| A line-only | [Video](1440-a-comparison-silent.webm) | [Video](390-a-comparison-silent.webm) |
| B1 medium + LONG | [Video](1440-b1-comparison-silent.webm) | [Video](390-b1-comparison-silent.webm) |
| B2 bold + Electric/LONG | [Video](1440-b2-comparison-silent.webm) | [Video](390-b2-comparison-silent.webm) |

Additional active-video studies: [Editorial Violet](1440-editorial-silent.webm), [Ink Violet](1440-ink-silent.webm),
[EXTRA_LONG experiment](1440-extra-long-silent.webm). Electric is in B2. All three are comparison candidates.

35 screenshots supplement the 9 videos. Start with [desktop B2](1440-b2-playing.png),
[mobile B2](390-b2-playing.png), [320px EN](320-en-b.png), [768px](768-b.png), [1920px](1920-b.png),
[reduced motion](390-b-reduced.png). Hero A/B1/B2 capture hashes match per viewport after hiding the Lab panel.
The same earlier Hero/Haegeum assets and sources remain unchanged.

## Reproduce and inspect

1. Start npm.cmd run dev:sound.
2. Run node scripts/capture-sound-choreography.mjs in another terminal. Optional SOUND_LAB_URL changes the local port.
3. Stop the manual server before npm.cmd run test:sound or gate:full; browser suites own their ports/output folders.
4. Run suites sequentially. The first concurrent run's trace-file collision is preserved in sound-initial-concurrent.*;
   it is not silently converted into an application failure or a successful run.

[Performance](performance.json) measures isolated sequential sessions, not the concurrent test run.
A/B2 callback p95 desktop .3/.8ms; mobile .2/.6ms. Sampled frame interval p95 ~16.7ms.
Idle, settled pause and offscreen rAF=0. No sampled long tasks, layout shifts or page errors.
No physical-phone/thermal, total GPU-time, VoiceOver or native Mac Safari claim.
[Color calculation](violet-contrast.json) distinguishes solid swatches from faded decorative paths.

## Validation records

- [Full gate log](full-gate.txt): Fast and root/project build pass; 84 routes pass; existing Design System delayed-font CLS fails.
- [Routing report](routing-results.json) / [Design report](design-system-results.json).
- [Final sequential Sound log](sound-tests.txt) / [report](sound-results.json): current definitive Sound counts in the result.
- [Original concurrent run](sound-initial-concurrent.txt) / [report](sound-initial-concurrent.json): includes trace ENOENT interference, retained as history.
- [Verification / file manifest](verification.json): final status, source hashes and preserved-owner audit.
- [Current result](../../P2I-CHOREOGRAPHY-RESULT.md), [canonical comparison contract](../../docs/redesign/review/SOUND-BOW-CONTACT-COMPARISON.md).

The original [P2I bronze evidence](../p2i/README.md) and result remain unchanged. No commit, push or deployment.
**STOP / user visual review required.**
