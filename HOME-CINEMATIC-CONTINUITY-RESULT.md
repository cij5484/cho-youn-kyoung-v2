# HOME Cinematic Continuity / Depth Pass — 2026-09-08

**IMPLEMENTED / REVIEW READY.** This is a visual development/preview pass, not self-granted visual quality approval.
Baseline and rollback: main `d98aaa6444b472537bfd5d1e549f864635930a85`; branch `codex/home-cinematic-continuity`.
The earlier interaction pass was first committed as `7c3a231`, delivered through PR #9, pulled from main and inspected
in the actual 4180 browser runtime. PR #9 Fast checks and Preview run `34190400938` passed.

## Changes and decisions

| Scene / boundary | Actual implementation |
|---|---|
| SOUND → Works | Preserved one-shot LISTEN alignment/audio ordering and rightward strand collapse. Existing two-color material feeds the next scene. |
| Works | One foreground work; the next work is a clipped plane in depth. Desktop uses different approach/retreat depths; mobile keeps shallow depth and large images. Each integer work position has a short scroll-distance hold. Travel: 120svh desktop / 150svh mobile. |
| Works → Album | A short, narrow edge from the actual last work asset travels between measured outgoing work and incoming album bounds. It requests that background only when used; no extra initial image preload. |
| Album | Reflection/shadow and source-derived contextual color lag the actual object pose, then settle. Existing touch split, mouse controls, retained object identity and 920ms exchange remain. The previous blurred shadow is replaced by a gradient. |
| Album → Stage | The actual outgoing ambient RGB/direction briefly carries into the dark surface and yields before the poster/date threshold. |
| Performance | Verified 9/22 `풀고, 엮다` stays fixed. 09 and 22 align with the aperture boundary; the fully open image/date hold occupies .24–.39 of the shared sequence. |
| Performance → Artist | The existing single DOM frame/seam carries the handoff. No new independent fade or scene reset. |
| Artist | The two faces hold at a 47.6% split over .82–.91, then continue to the retained 68% endpoint. Photographs/seam and typography have different, very small DOM translations. Existing crops remain independently authored. |
| Artist → Outro | A brief measured seam afterimage narrows into the name space. The pair gathers at two authored endpoints, holds, then resolves as the remaining tails withdraw. |

The same Violet/Lacquer pair is an object guide, not a cursor follower. It is subordinate around the album and appears
briefly at stage/portrait boundary cues. Full poster and held identity compositions clear the pair and stop its loop.
Reverse scroll uses the same state/geometry. Quiet moments use scroll-distance plateaus, never input locks or forced waits.

**Not adopted:** silhouette Occlusion Typography (no cutout asset and a risk to facial readability), scroll-velocity
placement/inertia, new WebGL or a motion library. The portrait depth is photograph/mask/type plane separation;
it does not fabricate segmented anatomy. Existing canonical reference principles were applied without a new research tour.

**FUTURE only:** HOME→Album/Performance Detail shared transitions. Stable content, object, front/back and image
identity attributes are provided; destination pages, snapshots and route transition code are not implemented.

## Files and cleanup

- `src/home/depth-queue.ts`, `works-motion.ts`, `closing-orbit.ts`, `SelectedWorks.tsx`: queue, thresholds, selective
  cues and final pair trajectory; removed obsolete artist figure-eight/cursor target and duplicate clamp/smooth helpers.
- `SceneAfterimages.tsx`, `continuity.css`, `HomeClosing.tsx`: brief source-material transfers with no idle animation loop.
- `album-motion.ts`, `album-light.ts`, `album-depth.css`, `AlbumObjectStage.tsx`: one pose/light RAF owner, finite
  damping, source-derived tones, exchange depth and stable identities. Superseded shadow/exchange rules removed from `home.css`.
- `stage-artist-motion.ts`, `stage-depth.css`, `StageArtistSequence.tsx`, `PerformanceScene.tsx`, `ArtistScene.tsx`:
  date geometry, composition holds, small depth and source identity; old date baseline declarations consolidated.
- HOME, Motion, Interaction Glossary, implementation plan, Task Protocol and HANDOFF: current behavior reconciled
  with recent user decisions; historical reports retained. Glossary 51→61 terms.
- HOME config and targeted HOME/album/stage tests. No package, lockfile, workflow or original asset changes.

## Validation and device scope

Final fixed-source HOME integration: **89 passed, 1 platform-specific skip (3.5 minutes)** across Chromium/WebKit.
The skipped case is Chromium CDP native-touch injection on WebKit; Chromium executes it successfully. Type-check,
lint, root and development Preview builds pass; Album light math has **4 passing contracts**. Runtime coverage includes 320/390/tablet/
desktop, one-shot SOUND/audio ordering, actual Chromium touch injection for horizontal rotation/vertical scrolling,
work focus geometry, reverse stage/seam motion, keyboard/menu/locale, reduced motion and idle/offscreen owners.

The initial integration run identified two issues: a never-exposed decorative lazy image could indefinitely delay the
old all-image decode check; runtime now requests its background only during the handoff. WebKit viewport subtraction
differed by about 0.0005 CSS px in an exact float equality assertion; the browser test now compares painted-pixel
positions, while the pure timeline test still checks exact threshold equality. No suite timeout was raised or existing
test skipped to hide a failure. Chromium CDP touch injection remains explicitly unavailable on WebKit.

The idle-loop probe also initially sampled before native scroll/scene settlement. Its synchronization now matches
actual geometry, target and rendered progress before observing inactivity; repeated Chromium/WebKit runs pass 6/6.
A short 120-frame native-scroll forward/reverse probe at 390px and 1440px observed p95 frame intervals of 16.7ms,
maxima of 16.8ms / 33.3ms respectively, zero observed 50ms main-thread long tasks and no horizontal overflow.
This is a local Chromium browser measurement, not physical-phone GPU/thermal proof or a release performance score.

Full Release Gate was not run, as requested. Prior Linux WebKit Release failures are not claimed resolved by this pass.
Screenshots/diagnostic logs stay in ignored `.checkpoints/continuity/`; the user reviews the live preview, not an evidence deck.
Physical iPhone/Android, native Safari, sustained thermal behavior and final Retina portraits remain unverified here.
The existing 1023×1537 hanbok source and official 9/22 poster limitations remain; no real stage photograph or new
high-resolution portrait was invented. No source masters were edited or replaced.

## Delivery and next boundary

The user explicitly authorizes this pass's PR → main merge → existing automatic Pages Preview → public URL smoke.
The delivering PR and final response record the exact merged SHA and workflow result, avoiding a circular SHA inside
its own commit. Public preview: https://cij5484.github.io/cho-youn-kyoung-v2/ . Preview delivery does not approve final
release quality. Recommended next action is user visual review of the whole continuity pass; no next scene starts.

**REPORT → STOP → USER APPROVAL.**
