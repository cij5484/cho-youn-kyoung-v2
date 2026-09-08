# HOME Sound — Full Haegeum → LISTEN

2026-09-07 · P2H baseline preserved; **P2I B2 / LONG 460ms / Electric Violet visually APPROVED**. Final quality and QA classification: [closeout](../../../P2I-CLOSEOUT-RESULT.md).
Owners: [HOME §§7–8](../04-HOME.md), [Motion §45](../03-MOTION-SYSTEM.md), [Responsive §7](../11-RESPONSIVE.md),
[Accessibility §§9–11](../13-ACCESSIBILITY.md), [Performance §8](../12-PERFORMANCE.md),
[Task Protocol](IMPLEMENTATION-TASK-PROTOCOL.md).

## Approved starting point and delivery

The user approved P2F without special visual problems: **HERO → HAEGEUM: QUALITY APPROVED / FROZEN**.
Commit `b5c6aa053a38bdb1dafbcbeb724890f26ae334cf` delivered 68 files to main. Exact-SHA
[Fast CI 34032488461](https://github.com/cij5484/cho-youn-kyoung-v2/actions/runs/34032488461) succeeded.
Local Fast passed. The previously reviewed Full 38 Node + 197 browser result and 67 change / 49 evidence hashes
were verified; Full was not rerun solely for delivery. Clean main/origin was verified before SOUND.
[Receipt / committed files](../../../evidence/p2g/delivery-p2f.json).

Historical P2F report/evidence retain their recorded pending-review decision. This later explicit user approval
supersedes that decision. Native Safari settlement remains honestly unverified future QA. Portrait/Retina,
authentic instrument macros/full source, physical iPhone/Android, VoiceOver and long-session/thermal checks are
non-blocking for the approved composition/motion. They are not reported as completed.

## Scope and implementation boundary

P2G created the approved review baseline. P2H is one 120–180 minute coherent bundle with six related subtasks:
P2G preservation → retained audio audit → line/composition refinement → native/device QA → lifecycle/Full/evidence
→ documentation/delivery/report/STOP. P2G is preserved in logical commit `dab4617`; its report/evidence stay historical.
No WORKS, other page, Album/Haegeum3D, Blender, next scene, production domain or deployment.

`src/sound` contains reusable source, native continuation, surface and route-scoped audio/line controllers.
`labs/sound` mounts them only in a development-only, noindex, build-rejected Lab on 4179. There is no production
HOME mount, source-mode picker or competing composition. Frozen P2B and Hero code remain unchanged.
`HaegeumExperience` gains optional continuation/class/anchor props through its existing `HeroContinuation`
contract; the standalone P2F defaults, imagery, 155svh choreography and CSS remain unchanged.

## Full → Sound release

The P2F 155svh journey keeps the same physical scroll budget. Only the following 80svh is new. A scoped adapter
maps the existing native controller to both budgets, with no new scroll handler, wheel interception or motion
library. The Full photograph keeps its proportions while its aperture closes toward the string axis. HAEGEUM
releases through its own type mask. The same two original line holders move outward into the horizontal field.
Cartesian endpoint interpolation keeps the whole pair inside the viewport even during rapid input/reversal.
No image crossfade, line replacement, intermediate reset or unrelated new section entrance.

The Sound surface overlaps that shared sticky stage; after the release it flows out with native scrolling.
The skip anchor lives outside the temporarily inert surface and compensates for existing navigation scroll
padding. Reduced motion, enlarged text and failed instrument imagery instead preserve semantic document order:
ARTIST → four instrument perspectives → optional SOUND. The static Sound pair is part of that reading fallback.

Desktop: wide pair, asymmetrical large serif LISTEN to the right, quiet editorial index and short caption to the
left. Intensity 3/5: the previous huge imagery resolves into Ivory negative space. Mobile 390/320 has a higher,
shorter pair, its own LISTEN placement and a compact lower caption composition. P2H aligns the desktop control
with the pair’s right endpoint and stacks the caption at 320px, preserving the 390px two-column arrangement. Captions and state use P2A's
micro token; no pills, play circle, glass, glow or extra color.

## Actual source and selection

[Audio audit](../../../evidence/p2g/audio-audit.json), [signal analysis](../../../evidence/p2g/audio-analysis.json).
V2 initially had no local audio. Read-only legacy data listed 29 URLs. Four representative URLs had successful
curl HEAD responses; initial Python HEAD 403 responses are recorded separately. Existence is not publication
approval, and those four were not all browser-decoded or auditioned.

The user replied to the track/timecode/website-preview question:
“한범수류 중중모리 하이라이트 부분... 네가 판단해봐. 가장 극적인 부분”. This authorizes the requested
Han Beom-su Ryu Jungjungmori HOME excerpt candidate and delegates highlight selection. Other tracks remain
NOT YET APPROVED. Exact auditory selection stays REVIEW READY until the user hears it.

Chosen candidate: **02:46–03:04 / 18 seconds**, from the legacy-listed 4:38.756 recording. An 18s window analysis
ranked the sharp rise from the preceding 3s breathing space, sustained RMS/spectral activity and a softer end.
Mean RMS rises about 2.78× over the preceding 3s. This is signal-informed editorial selection, not a claim of
expert listening comparison or verified musical cadence. Final phrasing/expressiveness is an auditory review item.

A separate 434,470-byte 48kHz stereo AAC derivative preserves source level, with 25ms click-safe entry and 280ms
release. Full 11.15MB 320kbps source stays unchanged in the ignored checkpoint. No synthetic music or silent
clock is used. The 18.000s container can expose 18.048s in Chromium due AAC frame padding; UI uses actual media time.
The source's HEAD had no CORS allow-origin header; a same-origin short derivative avoids depending on that
external analyser contract. Real media time and nonzero live analyser samples were observed in Chromium/WebKit.

`source.ts` is the single source/status/title/duration owner. A source must be `preview-authorized` with a URL to
activate. `not-yet-approved` and `unavailable` remain disabled even when a URL exists. Actual component/motion
logic does not need rewriting for another approved fragment. Larger/cleaner audio master is optional; the current
requested fragment is usable. Do not migrate album records or all tracks merely to add this sample.

## Interaction and state

LISTEN is a semantic button. A vertical type-mask echo/italic response and tiny arrow displacement provide
hover/focus character; mobile uses tap/focus without a hover dependency. PAUSE, RESUME, REPLAY and RETRY remain
in the same focusable control. State text/live announcement and a small actual-time readout make movement optional.
No seek/volume/mute/track-list UI belongs to this 18s HOME excerpt; Album Detail's full-player requirements remain.

Media starts only in the explicit activation handler. `play()` and `AudioContext.resume()` are invoked before
awaiting either. Real events and current media/context state own playing/loading/buffering/paused/ended/error.
Queued stale events cannot override a later user intent. Loading can be cancelled; a 12s unsuccessful pending
request becomes an honest retry state. End settles the pair; replay reuses the buffered media from zero (only a failed source reloads). Pause/resume
keeps actual position. Before suspension the controller commits the native media position, preventing the
observed WebKit buffered-clock rollback. Internal/native seeks are reconciled even though HOME exposes no seek widget.

## Bowed-string response and cost

The original line holders receive two small SVG paths only inside the Sound owner. 1024 live time-domain samples
provide RMS and interpolated local sample differences for friction. A saturating pressure envelope prevents
large raw waveform drift; DC input remains straight. Higher energy increases sampling density and fine instability. Endpoints remain
anchored; maximum displacement is about ±.62px desktop / ±.34px mobile. No equalizer, large sine wave, beat bounce,
canvas/GPU scene, precomputed fake clock or React per-frame updates.

Visual analysis targets 30Hz. Coarse media events update React status/time; frame work uses refs/local data and DOM
path attributes. Energy uses an 85ms attack / 65ms release; spatial following is 35ms during play and 55ms toward straight on
pause/end. A zero-time interruption preserves the current path. The pair settles exactly, then stops scheduling.
The visual clock is cleared at settlement so a long pause does not cause a stale-time jump on resume. Reduced/fallback layouts keep static lines while real listening remains available.
The type-mask hover/focus carries the pointer response; the line itself does not translate on hover.
After entry, the surface clip is removed so keyboard focus is not cut off. The italic mask permits horizontal
glyph overhang while retaining vertical reveal clipping, verified in actual Mac Safari. There is no audio request or AudioContext before
activation (Vite's tiny `?import` URL module is JavaScript, not an audio payload).

Offscreen/reverse or hidden-document states pause audio, suspend the context and stop visual work; returning does
not autoplay. Route departure/source replacement removes media src, aborts loading, disconnects nodes, closes the
context and removes observers/listeners/SVGs. The 2026-09-08 deployment-blocker fix waits for an in-flight
`AudioContext.suspend()` before closing the destination and disconnecting/resetting its graph/media. Audio pauses
and observers/listeners/animation stop immediately on departure; pending suspension cannot race destruction.
Suspend/close failures are reported rather than silently swallowed. Repeated native-context route returns and
a deliberately held suspension verify both eventual closure and operation order. Missing Web Audio can retain actual playback with an explicit static
visual. No new runtime or development dependency was added; macOS afconvert was used only to prepare the excerpt.

## References

The visual principle is carried from the user's approved P2F and P2B, rather than copying an external composition.
Technical references checked: [W3C Web Audio media-source/analysis contract](https://www.w3.org/TR/webaudio/#MediaElementAudioSourceNode),
[HTML play promise/media state](https://html.spec.whatwg.org/multipage/media.html#dom-media-play-dev),
[MDN media source](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/createMediaElementSource),
[time-domain samples](https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/getFloatTimeDomainData),
[context suspension](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/suspend).
These inform actual-state control and resource lifetime; no source code, branding or exact timing is copied.

## P2H audio review

The exact 434,470-byte derivative and original master are unchanged. No alternative is proposed or substituted.
[Current signal review](../../../evidence/p2h/audio-review.json) finds energy at the start, approximately 13.18dB
between the 10th/90th percentile short-window RMS, and a quieter end. These measurements support retaining the
candidate, not a claim of critical audition, verified cadence or bowed-string musical identity. The decoded
lossy source contains 30 near-full-scale samples; that alone does not prove audible clipping. An optional
lossless master and user listening check can resolve this later. The existing 25ms/280ms edge treatment remains.

## Validation / terminal gate

P2H Full: **38 Node + 255 browser** (84 route, 11 foundation, 26 navigation, 44 Hero, 32 Haegeum,
58 Sound: 29 Chromium / 29 WebKit). The added regressions cover buffered replay, DC rejection/local friction and
interruption damping, 320px KO/EN state readability, and repeated route resource teardown. Keyboard focus also
requires the settled surface clip to be absent. No assertions were relaxed and no dependency was added.
Type/lint, private content/schema/locale, root/project build/prerender/metadata/404, actionlint, Lab build rejection,
noindex and public exclusion remain required. Frozen Hero/Haegeum/navigation/assets and historical evidence are preserved.

[Result](../../../P2H-RESULT.md), [visual/audio evidence](../../../evidence/p2h/README.md),
[verification](../../../evidence/p2h/verification.json), [performance](../../../evidence/p2h/performance.json).
Local measurements are development-browser samples, not field CWV or thermal certification. Idle, settled pause
and offscreen states stop visual work; no media payload or context exists before activation. Route/source teardown
closes contexts and removes media nodes, observers, handlers and SVGs. No claim of exhaustive memory-leak proof.

[Native/device QA](../../../evidence/p2h/safari-device-qa.md): actual Mac Safari verified initial/Full release,
LISTEN, advancing playback, pause, natural end, Replay and Option-Tab/Return with a visible full focus outline.
The Mac locked before post-resume, menu/reverse and native reduced-motion completion. Those remain explicitly
partial; automated WebKit is separate. Physical phones, VoiceOver/TalkBack and sustained thermal QA remain future.

P2G’s result is user approved while SOUND remains **REVIEW READY / FREEZE CANDIDATE**. Final auditory and
refined visual judgment require user review; this document does not self-grant QUALITY APPROVED / FROZEN.
P2G `dab4617` and P2H `7e1bd37` are delivered to main; exact-SHA Fast CI 34056689232 SUCCESS.
Clean main/origin was verified before this documentation receipt. [Delivery / files](../../../evidence/p2h/delivery.json).
No deployment. P2F remains **QUALITY APPROVED / FROZEN**. **REPORT → STOP → USER APPROVAL**.
No WORKS or next scene is authorized.


## P2I — canonical choreography / closeout

B2 Bold / LONG 460ms / Electric Violet #6334E5 is the user-selected production direction.
**Strings vibrate. Bow flows. / 현은 떨고, 활은 흐른다.** The single smooth contact and tapered recent path are
separate from the strings' micro vibration. The [existing SOUND contract](SOUND-BOW-CONTACT-COMPARISON.md)
owns tuning and Lab-only alternatives. One native graph/rAF, ~30Hz analysis and display-frame bow interpolation
remain; the approved source and frozen Hero/Haegeum are preserved. Public HOME remains unimplemented.
[Closeout result](../../../P2I-CLOSEOUT-RESULT.md) owns quality status and non-blocking QA gaps;
[original choreography evidence](../../../evidence/p2i-choreography/README.md) remains historical visual evidence.

## P2J — scalable response refinement

SOUND visual freeze remains B2 / LONG 460ms / Electric Violet. P2J adds a shared feature-driven bow engine,
25Hz offline data and HOME_SIGNATURE tuning for the same excerpt. Native media activation/currentTime and
route cleanup remain authoritative. Pitch is disabled for the mixed recording; no beat-primary driver or manual
timestamp choreography is added. The [existing SOUND contract](SOUND-BOW-CONTACT-COMPARISON.md#p2j--shared-engine--feature-data--preset-contract)
owns extraction, mapping, preset values and future Album-track adapter boundaries; it is not duplicated here.
[P2J result](../../../P2J-RESULT.md) owns current validation/response comparison. New responsiveness awaits visual
review; the prior SOUND quality approval is preserved. Public HOME and the next scene remain outside this task.

## 2026-09-08 one-shot listening frame

Latest user instruction revises the historical “immediate audible playback” sequence: gesture unlock first, alignment,
then audible playback. `focus-frame.ts` lands just before the shared stage unpins, using its actual scroll denominator
and header clearance. Native media is briefly primed muted and restored to its starting time before audible play;
this preserves Safari's media activation requirement and the complete excerpt. Loading is truthful, no fake playing
clock. Abort/destroy cancels alignment; direct wheel/touch/key input wins. Pause/resume and offscreen lifecycle stay
route-scoped. Reduced motion performs an instant static-panel alignment. No other SOUND visual tuning changes.
