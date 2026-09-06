# P2H — SOUND refinement evidence

2026-09-07 · **REVIEW READY / FREEZE CANDIDATE / STOP**. No next scene or deployment.
[Full report](../../P2H-RESULT.md), [canonical guide](../../docs/redesign/review/HOME-SOUND-EXPERIENCE.md).

## Review in the browser

`npm run dev:sound` → http://127.0.0.1:4179/ (KO), `/en/` (EN). Development-only / noindex.
These captures used temporary 4180 to keep the test server's 4179 available. Scroll from the approved Hero through
Full Haegeum into SOUND, or use SCROLL TO SHIFT; choose LISTEN to start the actual fragment. No autoplay.

[Retained 18-second audio](../../src/sound/assets/hanbeomsu-jungjungmori-preview.m4a),
[signal/auditory limits](audio-review.json), [native/device observations](safari-device-qa.md).
No substitute clip was created. Critical listening of identity, beginning and musical ending remains user review.

## Visual states

| Evidence | Files |
|---|---|
| Initial Hero / Full, preserved | [Initial](desktop-initial.png), [Full](desktop-full.png), [zero-pixel comparison](initial-comparison.json) |
| Continuous release | [Early](desktop-release-early.png), [Middle](desktop-release-mid.png), [Late](desktop-release-late.png) |
| SOUND desktop | [Idle](desktop-idle.png), [type hover](desktop-hover.png), [playing](desktop-playing.png), [damping](desktop-damping.png), [paused](desktop-paused.png), [end](desktop-completed.png) |
| Width coverage | [1920](wide-idle.png), [1366 laptop](laptop-idle.png), [768 tablet](tablet-idle.png) |
| Independent 390 | [Full](mobile-390-full.png), [release](mobile-390-release.png), [idle](mobile-390-idle.png), [playing](mobile-390-playing.png), [EN](mobile-en-idle.png) |
| 320 fallback | [Full](mobile-320-full.png), [release](mobile-320-release.png), [stacked caption](mobile-320-idle.png), [playing](mobile-320-playing.png) |
| Reduced / text | [Desktop](reduced-desktop.png), [playing](reduced-desktop-playing.png), [mobile](reduced-mobile.png), [mobile playing](reduced-mobile-playing.png), [200% text](text-200.png) |
| Automated WebKit | [Release](webkit-release.png), [idle](webkit-idle.png), [playing](webkit-playing.png) |
| Actual native Safari | [Release](safari-release.png), [full focus / italic mask](safari-keyboard-focus.png), [playing](safari-playing.png), [pause](safari-paused.png), [end](safari-completed.png), [replay](safari-replay.png) |

[Capture dimensions/progress/media state](capture-states.json). Static screenshots do not prove motion or music quality.
Safari baseline files deliberately record P2G before the fix; final focus screenshot shows the P2H correction.

## Real-time recordings

- [Desktop 1440×1000](desktop-real-time.webm): Full→SOUND, hover, LISTEN, pause/damping, resume, natural end,
  replay and reverse/offscreen pause. [Mobile 390×844](mobile-real-time.webm): independent composition and playback cycle.
- Unedited real-time **silent screen recordings**, produced by Playwright with actual media playback. No audio
  track is present; listen using the Lab or linked AAC. These are not physical-phone or native-Safari video.
- [Timeline](video-timeline.json), [decoded video verification](video-verification.json), [damping samples](damping.json).

## Validation and limitations

[Full gate](full-gate.txt), [58 Sound results](sound-test-results.json), [hash/scope/public-output verification](verification.json),
[performance](performance.json), [Lab build guard](lab-build-guard.txt), [noindex](lab-visibility.json).
Full: 38 Node +255 browser. Type/lint/schema/locale/private/public-route/prerender regression included.

Actual Safari playback/pause/end/replay/focus was observed; Mac locking prevented remaining native checks.
Physical phones, VoiceOver/TalkBack, actual OS reduced motion and thermal remain future QA. Chromium/WebKit
measurements and mobile emulation do not certify those devices. Original audio/images and frozen owners remain intact.
User final auditory/refined visual judgment is needed for QUALITY APPROVED / FROZEN; this result stops at review ready.
