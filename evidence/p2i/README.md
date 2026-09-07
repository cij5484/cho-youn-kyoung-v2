# P2I comparison evidence

2026-09-07 · **CHROMIUM COMPARISON VERIFIED / REVIEW READY WITH QA GAPS / FULL FAIL / STOP**

[Result](../../P2I-RESULT.md) · [tuning/contract](../../docs/redesign/review/SOUND-BOW-CONTACT-COMPARISON.md).
Screenshots are actual Chromium renders on Windows. Mobile images are emulation, not physical devices.
The hero-only captures temporarily hide the Lab comparison panel; playing/pause captures show it normally.
The small detail images are native screenshot crops, not the marker's actual on-page display size enlarged by code.

| View | A | B short |
|---|---|---|
| Desktop 1440 | [playing](1440-a-playing.png) · [paused](1440-a-paused.png) | [playing](1440-b-playing.png) · [paused](1440-b-paused.png) · [detail](1440-b-contact-detail.png) |
| Mobile 390 | [playing](390-a-playing.png) · [paused](390-a-paused.png) | [playing](390-b-playing.png) · [paused](390-b-paused.png) · [detail](390-b-contact-detail.png) |
| Silent desktop video | [A](1440-a-comparison-silent.webm) | [B](1440-b-comparison-silent.webm) |
| Silent mobile video | [A](390-a-comparison-silent.webm) | [B](390-b-comparison-silent.webm) |

Additional: [320 EN](320-en-b.png), [768](768-b.png), [1920](1920-b.png),
[medium trial](1440-b-medium.png), [medium silent video](1440-b-medium-silent.webm),
[reduced motion / 390](390-b-reduced.png).

All videos are **silent screen recordings**. The actual preserved excerpt is
[Han Beom-su Ryu Jungjungmori 02:46–03:04 / 18s](../../src/sound/assets/hanbeomsu-jungjungmori-preview.m4a).
Use the live Lab LISTEN action for combined auditory/visual judgment.

## Reproduce

Start `npm.cmd run dev:sound`, then `node scripts/capture-sound-comparison.mjs`.
An optional `SOUND_LAB_URL` selects another local port. The script runs sequential A/B measurements,
records playback/pause/resume/offscreen videos and captures additional viewports/trail/reduced fixtures.
It does not start the server or modify application tuning. Browser reports/caches stay ignored.

## Measurements and preservation

- [A/B performance](performance.json): actual rAF callback cost/intervals, visual counts, long tasks and CLS.
  Idle/settled pause/offscreen have zero callbacks/analysis. These are short unthrottled local samples,
  not a claim about physical mobile, battery, thermal, field CWV or all resource leaks.
- [Browser capabilities before app startup](browser-capabilities.json): current Chromium has AudioContext;
  Windows Playwright WebKit does not. Its Mac-like user-agent string is not evidence of a Mac host.
- [Frozen source/asset/history checks](preserved-files.json): 100 files unchanged against baseline;
  text CRLF normalization is distinguished from raw binary hashes.
- [Final scope/validation manifest](verification.json) identifies the uncommitted source by individual hashes.

## Tests and outstanding QA

[Full attempt](full-gate.txt) passed Fast/type/lint/38 Node/root+project build/84 route checks, then stopped
on the Design System 390px delayed-font CLS (.1600; required <.1). This is a real failed gate.
Remaining suites were invoked separately, not marked as an unbroken successful Full:

- [Navigation](test-navigation.txt): 25/26; immediate-interruption dialog visibility.
- [Hero](test-hero.txt): 42/44; WebKit skip-link focus at 320/1440.
- [Haegeum isolated run](haegeum-isolated.txt): 31/32; WebKit late imagery static fallback. The first runner
  aborted with exit -1073740791 before results; only its confirmed orphan Lab server was stopped for this run.
- [Sound](test-sound.txt): Chromium **38/38**, WebKit 23/38. WebKit cannot exercise the analyser/graph in this
  Windows build; media-fault behavior also failed and is not all attributed to AudioContext without evidence.
- [Final lint](lint-final.txt) passes, including the capture script.
- [Machine-readable cases/errors](test-results.json): 253/273 browser pass, 20 failures, no skipped/flaky/retry.

The untouched foundation/navigation/Hero/Haegeum owners were not altered to satisfy a new Windows run.
No assertion or environment capability was faked. A separate authorized Windows QA task is needed to
resolve these full-gate issues. Native Mac Safari and real-phone validation remain distinct future work.
Final 320px review-dock adjustment was followed by the [focused Chromium 9-case rerun](final-comparison-tests.txt)
including dock/caption overlap assertions; other suite results are from the full collection above.

During P2I implementation, the comparison Tail label was made explicit, asynchronous route teardown is
awaited, and the tail's control polygon is bounded (the initial endpoint-only cap could yield a 5.615px
quadratic). These fixes passed the final Chromium Sound suite. No production choice or SOUND quality freeze.
