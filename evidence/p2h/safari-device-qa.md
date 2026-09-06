# P2H — native Safari and device QA

2026-09-07, current Mac, actual Safari application; ordinary CUA accessibility actions/screenshots.
Development Sound Lab on temporary port 4180. This is separate from headless Playwright WebKit.

## Observed in native Safari

- Initial Hero, native vertical scroll, Full→Sound release and ready LISTEN surface.
- Explicit activation produced actual PAUSE state, advancing media clock and Safari's audible-tab indicator.
- Option-Tab focused the semantic LISTEN control under the current Safari keyboard preference. Return activated it.
- A persistent entry clip initially cut off the focus outline. P2H removes that clip when the surface is ready.
  The final screenshot shows the entire outline. The italic terminal glyph also now fits its horizontal mask.
- Natural end reached REPLAY / 00:18 with stable lines; Return replayed buffered audio and the clock advanced to 00:07.
- Return paused at 00:07; RESUME and the stable pair were observed with the same position.
- Resume was invoked, but the subsequent observation failed because macOS had locked. Resume settlement is
  therefore not counted as a completed native Safari check.
- No obvious large waveform or layout jump was observed in the captured playing state. A still screenshot
  is not proof of frame pacing, audible musical quality or sustained-session performance.

## Automation limitations, honestly separated

The CUA key name `Space` was rejected by the tool before sending a key. Return was used successfully;
this is not an application Space-key failure. Space behavior is covered by the separate browser tests.
The CUA server subsequently reported “Mac is locked and automatic unlock could not unlock it.” No private
browser bridge, AppleScript, WebDriver or fabricated manual evidence was used to bypass that limit.

Native MENU/Esc coexistence, reverse-return pause, post-resume settlement and actual OS reduced-motion preference
remain **NOT COMPLETED**. Their automated Chromium/WebKit checks are engine evidence only. Native Safari QA is
**PARTIALLY VERIFIED**, never a full device sign-off. See `safari-*.png` and the captured accessibility deltas.
The two `safari-baseline-*` images show P2G before refinement; the other captures show the P2H Lab.

No attached physical iPhone/Android was available to this run and no manual phone result was received.
Tap latency on actual hardware, autoplay restrictions, vertical gestures, short-session heat/stutter,
VoiceOver/TalkBack and native reduced motion remain non-blocking future device QA. Browser mobile emulation
and local start-latency measurements do not substitute for those results.

## Auditory boundary

Actual media playback and native state progression were observed. No captured audio or critical listening
comparison was performed by the agent. The retained excerpt's musical identity, bowing expressiveness and
phrase ending remain a user auditory review item; numerical source analysis does not establish those qualities.
