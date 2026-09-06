# HOME Sound — Full Haegeum → LISTEN

2026-09-06 · P2G · **REVIEW READY / STOP**. User visual/auditory selection remains pending.
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

P2G is one 120–180 minute coherent bundle, with six related subtasks: approved delivery → source audit → spatial
release/composition → real media/live response → mobile/accessibility/lifecycle → Full/evidence/report/STOP.
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
shorter pair, its own LISTEN placement and a compact lower caption composition. Captions and state use P2A's
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
request becomes an honest retry state. End settles the pair, replay starts actual media from zero, pause/resume
keeps actual position. Before suspension the controller commits the native media position, preventing the
observed WebKit buffered-clock rollback. Internal/native seeks are reconciled even though HOME exposes no seek widget.

## Bowed-string response and cost

The original line holders receive two small SVG paths only inside the Sound owner. 1024 live time-domain samples
provide RMS and sampled friction. Higher energy increases sampling density and fine instability. Endpoints remain
anchored; maximum displacement is about ±.62px desktop / ±.34px mobile. No equalizer, large sine wave, beat bounce,
canvas/GPU scene, precomputed fake clock or React per-frame updates.

Visual analysis targets 30Hz. Coarse media events update React status/time; frame work uses refs/local data and DOM
path attributes. Pause/end energy decays with a 58ms response constant and settles to the exact original straight
path, then stops scheduling. Reduced/fallback layouts keep static lines while real listening remains available.
Pointer micro-response is secondary and limited to idle hover. There is no audio request or AudioContext before
activation (Vite's tiny `?import` URL module is JavaScript, not an audio payload).

Offscreen/reverse or hidden-document states pause audio, suspend the context and stop visual work; returning does
not autoplay. Route departure/source replacement removes media src, aborts loading, disconnects nodes, closes the
context and removes observers/listeners/SVGs. Missing Web Audio can retain actual playback with an explicit static
visual. No new runtime or development dependency was added; macOS afconvert was used only to prepare the excerpt.

## References

The visual principle is carried from the user's approved P2F and P2B, rather than copying an external composition.
Technical references checked: [W3C Web Audio media-source/analysis contract](https://www.w3.org/TR/webaudio/#MediaElementAudioSourceNode),
[HTML play promise/media state](https://html.spec.whatwg.org/multipage/media.html#dom-media-play-dev),
[MDN media source](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/createMediaElementSource),
[time-domain samples](https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/getFloatTimeDomainData),
[context suspension](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/suspend).
These inform actual-state control and resource lifetime; no source code, branding or exact timing is copied.

## Validation / terminal gate

Final Full passed: **38 Node + 247 browser** (84 route, 11 foundation, 26 navigation, 44 Hero,
32 Haegeum, 50 Sound; the Sound cases split 25 Chromium / 25 WebKit). Type/lint, private content/schema/locale,
root/project build/prerender/metadata/404, actionlint, Lab build rejection/noindex and public exclusion passed.
Existing public payload is unchanged. The approved initial Hero has zero differing pixels at 1440×1000,
excluding the right 16px scrollbar. Original portrait/instrument masters and runtime image hashes are preserved.

[Result](../../../P2G-RESULT.md), [screenshots/videos](../../../evidence/p2g/README.md),
[validation and file hashes](../../../evidence/p2g/verification.json), [performance](../../../evidence/p2g/performance.json).
The local unthrottled Chromium sample observed no idle/settled/offscreen visual frames; about 30Hz analysis
during actual playback, p95 frame interval 16.8ms and no long task. This is not phone/thermal or field CWV approval.

Native Mac Safari could not be operated because the Mac was locked. WebKit automation is separate evidence;
physical phones, VoiceOver/TalkBack and long-session device checks remain open. The 18-second fragment's
phrasing/ending, release aperture/type simultaneity and actual-device perception of subpixel friction remain review items.
P2G is local/uncommitted; no P2G push or deployment. SOUND is **REVIEW READY**, not QUALITY APPROVED.
P2F remains **QUALITY APPROVED / FROZEN**. **REPORT → STOP → USER APPROVAL**; no next scene is authorized.
