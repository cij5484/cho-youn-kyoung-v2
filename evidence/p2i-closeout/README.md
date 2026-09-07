# P2I closeout — QA classification and visual freeze evidence

2026-09-07 · Windows · baseline `ba801448497b31c78b8fb749f73f02d23b7e0799`.
The user approved B2 Bold + LONG 460ms + Electric Violet #6334E5. This folder records closeout;
the prior [choreography evidence](../p2i-choreography/README.md) and [original experiment](../p2i/README.md)
retain their historical results. [Final result](../../P2I-CLOSEOUT-RESULT.md) owns the quality/delivery decision.

## Font CLS: pre-existing, real development-Lab wrap shift

Reproduction: `node scripts/diagnose-p2i-font-cls.mjs` (owns 4186). It extracts the nine P2A foundation
HTML/CSS/JS files from `7714907` into an ignored checkpoint and serves P2A/current sequentially with the
same installed dependencies. All nine LF-normalized hashes match. Three delayed-font repetitions per
revision at 390×1000 give **exactly .1600214060096154**, including the current Full rerun. Normal loading
also reproduces it. At 1440px both revisions give .0017974068573374806.

[Raw source rectangles/hashes](font-cls-diagnosis.json) identify the cause: `.lab-masthead` is wrapping flex.
When Noto Sans KR replaces the Windows fallback, its final micro label moves from a third row to the second,
lifting `main#specimen` from y140.375 to y105.1875 (−35.1875px). This single shift contributes .1595689137.
The display specimen height stays 104.875px; remaining smaller text shifts contribute .00045249.

Classification:

- **Not a P2I regression:** identical P2A source, CSS and delayed-font test; matching baseline reproduction.
- **Not a random timing flake:** three exact repeat values, and reproduction without forced delay.
- **Not a fabricated/invalid observer result:** real DOM source rectangles move.
- **Windows fallback-metric-sensitive, pre-existing Lab layout issue.** The Mac/P2H passing history does not
  invalidate this Windows observation; the fallback family differs by platform.
- **No corresponding confirmed production shift:** the masthead is Lab-only. Delayed-font 390px checks of
  current neutral production `/`, `/works`, `/en/works` yield 0, .000115390625, 0 respectively; see
  [production data](production-cls.json). This is not proof of future HOME font behavior.

The original `< .1` assertion, fonts, foundation CSS and gate ordering are unchanged. This issue is
**NON-BLOCKING for the user-approved SOUND freeze**, remains **OPEN for the foundation owner**, and still
makes Full **FAIL**. A future foundation task can stabilize masthead row allocation and remeasure it; it must
not increase the threshold or remove the test. No deployment is authorized by this classification.

The `*-font-before/after.png` names describe capture order only: Playwright screenshots can wait for fonts;
they are not certified fallback-vs-loaded image pairs. Use the observer timestamps/rectangles as causal evidence.

## Windows WebKit: platform capability plus fault-injection mismatch

Reproduction: `node scripts/diagnose-p2i-webkit.mjs` owns 4191 and a diagnostic-only HTTP middleware.
It serves the real retained 18s excerpt, with no fake media or AudioContext. [Results](webkit-http-diagnosis.json)
include native events, time, media errors, server request logs and browser interception counts.

| Scenario | Chromium | Windows WebKit |
|---|---|---|
| Valid real media | Actual playing / advancing clock | Actual playing / advancing clock |
| Playwright `page.route(...abort)` | Callback 1, server request 0, error | Callback **0**, server request **1**, actual playing |
| Actual HTTP 404 | Error, paused, time 0 | Error, paused, time 0; native media error 4 |
| Actual HTTP response withheld beyond 12s | Honest timeout/error, paused, time 0 | Honest timeout/error, paused, time 0 |
| Cancel while server withholds bytes; wait for arrival | Paused, time 0 | Paused, time 0 |

Windows WebKit's server-observed media user agent is `NSPlayer/12.00.26100.9168 WMFSDK/12.00.26100.9168`.
The observed Windows Media Foundation fetch bypasses Playwright's page-route interceptor. The previous
“failure plays anyway” tests therefore did not actually fail/hold the media request. Real server faults produce
the expected behavior. This is a **test-harness fault injection mismatch**, not evidence of invented playback.
Valid/error/timeout/cancel expectations are explicit assertions in the diagnostic script; the interception case
is a comparative observation, not a forced assumption about every platform.

`typeof AudioContext` is `undefined` in this installed Windows WebKit port. Native media works; analysis and
graph assertions cannot succeed. The application truthfully exposes its static visual fallback. Do not simulate
an analyser, weaken the motion assertions, or claim this port demonstrates native Safari motion.

The original **21/37** comprised **12 AudioContext/analysis/graph dependent failures + 4 interception-dependent
failures** (media error, loading cancel, stalled source, B failing source). The new canonical-entry tests are
reported separately in the final verification; the original tests remain present and unrelaxed.

## Actual Safari relevance and remaining QA

[Native Safari P2H evidence](../p2h/safari-device-qa.md), reviewed during closeout, confirms actual playback,
pause, natural end, replay and keyboard focus. Mac locking interrupted resume settlement/menu/reverse/native
reduced coverage. P2H automated macOS WebKit results are separate evidence. No Mac/native Safari connection was
available for this closeout, and the new P2I choreography was **not** observed on real Safari during this run.

[Official Playwright browser documentation](https://github.com/microsoft/playwright/blob/main/docs/src/browsers.md)
states that its patched WebKit is not branded Safari, platform features/media codecs differ, and macOS is the
closest environment for Safari testing. Local request/capability observations above supply this issue's specifics.
Controller diff review shows P2I adds contact painting/configuration/reset; native activation, error, timeout,
media event handling and source identity retain P2H behavior. No confirmed actual Safari blocker was found.

Native P2I trajectory review, complete native lifecycle/reduced QA, physical iPhone/Android, VoiceOver/TalkBack,
Retina source and sustained thermal QA remain **explicit non-blocking future SOUND QA**. These are not claimed
passed. Any confirmed Safari product regression must reopen the affected SOUND owner and block release.

## Validation and reproducibility

Full and browser suites run **sequentially** because their shared `test-results` parent is cleaned by runners.
`full-gate.txt` records the final Full attempt; the initial lint issue in newly added diagnostic comments was
fixed and retained as `full-gate-initial-lint.txt`. No validation threshold or existing test was loosened.
Exact counts, unchanged-file checks and documentation links are in [verification](verification.json).
Public output remains neutral and excludes SOUND/Lab comparisons in both root and Project Pages builds.
Fast success is not Full success; main push is not deployment.


## Adjacent frozen owner regression results

The unchanged standalone Navigation/Hero/Haegeum suites were run after SOUND, sequentially: Navigation **26/26**,
Hero **42/44** (same Windows WebKit keyboard skip-focus failures at 320/1440), Haegeum **31/32** (same Windows
WebKit late-image static-fallback assertion). These are the pre-existing Windows baseline failures recorded in
[P2I original result](../../P2I-RESULT.md), not newly introduced SOUND dependencies. Their modules and tests have
no diff from `ba80144`; their standalone Labs do not mount SOUND. Their precise native-Safari relevance remains
an open owner QA item, not an assertion that these tests are all harness bugs. No frozen owner was patched.

## Canonical capture and final SOUND result

[Desktop](1440-canonical-playing.png), [mobile emulation](390-canonical-playing.png),
[desktop reduced](1440-canonical-reduced.png), [mobile reduced](390-canonical-reduced.png).
The canonical route has no comparison controls. Capture checks actual playing and settled contact-frame counts;
[raw capture](canonical-capture.json) records no page errors. Existing user-approved motion videos are preserved.
Still images do not replace motion or actual device evidence.

SOUND final: six model contracts pass; Chromium **39/39**, Windows WebKit **23/39**. All original 16 Windows
failure names match the prior run; the two new canonical KO/EN entry cases pass in both engines. Actual HTTP
valid/error/timeout/cancel assertions and missing-analyser static disclosure pass in the separate diagnostic.


## Git evidence preservation

Source/documentation staged whitespace checks pass. The unrestricted staged `diff --check` also reports 152
trailing-space/terminal-blank-line entries in captured evidence logs; raw test output is intentionally preserved,
not cleaned to suggest a different result. This is not a type/lint/test failure. Repository `.gitattributes`
normalizes text to LF on commit/clone; older raw-byte manifests describe their original pre-commit checkpoint,
while closeout source hashes explicitly use LF normalization. Binary visual evidence remains byte-preserved.
