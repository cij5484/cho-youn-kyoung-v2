# P2G browser / device coverage

2026-09-06 · Current Mac · SOUND review evidence

| Environment | Coverage | Limit |
|---|---|---|
| Playwright Chromium | Desktop, laptop, tablet, 390/320 mobile emulation; real audio, gestures, state, reduced motion, keyboard, navigation and lifecycle | Headless automation, not physical mobile hardware |
| Playwright WebKit | Same Sound assertions, plus captured release/idle/playing frames | WebKit engine evidence, not the installed Safari app or iOS hardware |
| Installed Mac Safari | Attempted native CUA access twice | Mac locked; automatic unlock failed. User unlock clarification remained pending during this run. No P2G native Safari pass is claimed. |
| iPhone / Android | Not available to this run | Real touch, audio interruption, browser chrome, VoiceOver/TalkBack and sustained thermal QA remain future device work |

The first Full run exposed a real WebKit media-clock regression: stopping the AudioContext after pause could
roll `audio.currentTime` backward by roughly 0.1–0.3 seconds. The controller now commits the native media
position before suspending the graph. Five isolated reproductions retained the exact pause position after the
fix; focused pause/reverse/rapid/loading/visibility tests passed in both engines. No substitute UI timer is used.
This finding and its automated fix do not establish native Safari/device audio quality.

Future native checks: full-to-sound wheel/touch continuity; click-only first playback and actual audible excerpt;
pause/resume/replay; fast reversal; background/interruption and return; MENU/Esc/focus; KO/EN route departure;
reduced motion and text enlargement. Repeat on physical phones and with assistive technology when available.
Final excerpt phrasing/ending remains user auditory review. P2F's explicit QUALITY APPROVED / FROZEN status
is preserved; this uncovered device coverage is an honest non-blocking follow-up, not a reversal of that approval.
