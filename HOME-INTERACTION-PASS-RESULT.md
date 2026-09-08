# HOME Interaction / Scene Refinement — 2026-09-08

**IMPLEMENTED / LOCALLY VERIFIED / REVIEW READY / STOP.** User visual approval remains separate.
Baseline: latest main `0f7620a9492e2684514623e8a17e8d25ecfb13f0`; local branch `codex/home-interaction-pass`.
Preview: http://127.0.0.1:4180/ . This bundle is uncommitted; no PR, push, merge or Pages deployment performed.

## Scope and implementation

1. **03 SOUND — one-shot playback alignment.** `focus-frame.ts` calculates the final fully extended SOUND frame
   from the actual sticky stage/travel geometry and navigation obstruction. LISTEN primes native media muted and
   resumes AudioContext inside the user gesture, pauses/restores the initial media time, and starts audible playback
   only after native smooth scrolling and the composition settle. Audio does not consume the selected introduction
   while the viewport travels. Wheel, touch, keyboard, menu, hidden document and disposal cancel this intent.
   A per-intent primer restores mute state even during slow source loading. RESUME does not snap again.
   Reduced motion uses immediate alignment and explicit playback state. The approved excerpt and visual response
   are unchanged.
2. **04 mobile — scroll-driven work handoff.** The simplified gallery branch is removed from normal motion.
   The existing desktop ribbon now has an authored mobile trajectory, large dominant work, legible title/year/type,
   and 150svh of native scroll travel. Adjacent works hand off through depth and spatial movement; inactive links
   cannot intercept focus/touch. The two colored trails remain visible around the active work. All work links become
   available in the reduced-motion static gallery.
3. **05 mobile — stable touch ownership.** Projected album faces were taking pointer hits; the untransformed
   surface now owns the interaction. `pan-y pinch-zoom` preserves native scrolling. Horizontal intent crosses a 4px
   threshold, captures the pointer and tracks at .62 degrees per pixel without touch-follow lag. Release velocity
   is attenuated, with no continuous spinning. Mouse sensitivity and two-axis hover pose are preserved; drag starts
   from the actual visible pose. Keyboard and face controls remain available.
4. **06 — 09/22 Stage Aperture.** HOME features `풀고, 엮다`, 2026-09-22 19:30, 국립부산국악원 예지당,
   verified against the existing official site's record. The official golden instrument poster is the source for
   the aperture, crop/depth and contextual stage light. Date typography anchors the negative space; the prior
   oversized ON STAGE and selectable 8/2 feature are removed. The CTA uses the actual existing detail route:
   https://choyounkyoung.com/performance/haegeum-jeongak-2026-09-22/ . This is an artwork treatment, not a stage photo.
5. **06→07 — one surface and one seam.** A single sticky frame opens from a slit, holds the performance, travels
   across the composition, and wipes into the suit portrait. Its same DOM boundary becomes the hanbok split.
   Native forward/reverse scrolling follows the same timeline. Pointer input subtly offsets the split and material
   light; mobile uses scroll as its primary input. Artist tilt and old independent scene rules are removed.
   The portraits retain their actual poses. Tablet/short laptop/mobile crops align eye heights independently.
   Reduced motion has a static 3:4 dual portrait with a readable name/link and no animated seam.
6. **Integration/cleanup.** The trail pair yields during 06/07 and returns in 08. HOME's authored light/dark navigation
   contrast pair switches together during the handoff; Navigation's approved interaction code is unchanged.
   Dead stage/artist rules, the mobile gallery animation branch, stale event selection, and the unused 8/2 HOME
   poster derivative are removed. Original assets, Hero/Haegeum and unrelated subsystems are preserved.

## Main files

- SOUND: `src/sound/controller.ts`, `src/sound/focus-frame.ts`.
- Works/Album: `src/home/works-motion.ts`, `src/home/album-motion.ts`, `src/home/SelectedWorks.tsx`.
- Shared scenes: `src/home/StageArtistSequence.tsx`, `src/home/stage-artist-motion.ts`,
  `src/home/PerformanceScene.tsx`, `src/home/ArtistScene.tsx`, `src/home/HomeClosing.tsx`, `src/home/motion.ts`.
- Composition/assets: `src/home/home.css`, `src/home/content.ts`, `src/home/assets/manifest.json` and two new WebPs.
- Tests: `tests/home-pass.spec.ts`, relevant current-contract assertions in `tests/home.spec.ts`,
  `playwright.home.config.ts`. No dependency or lockfile changes.
- Canonical revisions: HOME, Motion, SOUND guide, Task Protocol, implementation plan and HANDOFF.

## Validation

- Type-check, lint, root build: **PASS**. Development Preview build: **PASS**.
- Chromium + WebKit targeted HOME suites: **57 passed, 1 platform-specific skip**.
  The new native touch injection test uses Chromium CDP, which WebKit does not expose. It passes in Chromium;
  WebKit runs the scroll, mouse, keyboard, state and reduced-motion contracts. No existing failure was skipped.
- Repeated new interaction cases before final crop adjustments: **34 passed, 2 CDP platform skips** across two runs.
- Final responsive aperture/forward/reverse rerun: **8 passed**; reduced-motion rerun: **2 passed**.
- Audible `playing` events are asserted to occur only after alignment, with less than one second consumed.
  Cancellation, delayed source cancellation and RESUME without re-snap are covered.
- Native Chromium touch injection: first horizontal gesture rotated the object, vertical gesture scrolled the page,
  and release settled. Desktop drag, pointer surface response, menu coexistence and keyboard regressions pass.
- Browser viewport checks: 320, 390, 768, 1280×720 and 1440×900; no horizontal page overflow in the tested sequence.
  Entry/main/handoff/portrait crops and reduced-motion static identity were inspected locally.
- Temporary screenshots/logs live under ignored `.checkpoints/home-pass/`; no large evidence bundle is added.
  Full Release Gate was not rerun and its historical Linux WebKit failures are not claimed resolved.

## Assets and remaining limitations

- The supplied hanbok original is 1023×1537. Its separate derivative is 1022×1536 / 154,524 bytes; original SHA
  and derivative SHA are recorded. The source was not overwritten, enlarged or generated. Larger originals remain
  desirable for full Retina portrait review.
- The 9/22 official poster derivative is 1555×2200 / 93,206 bytes. No actual live stage photograph for this event
  was found in the available record. A real event-specific stage image can improve the photographic version later;
  an unrelated 8/2 photo was not substituted. Both added assets remain explicitly provisional for final visual QA.
- Physical iPhone/Android and native Safari device QA were not performed. Browser touch injection and automated
  WebKit are distinct evidence. Native audio gesture behavior on physical phones remains a follow-up.
- The two source portraits have different head angles/backgrounds. The seam is an editorial pairing, not a claim
  of exact photographic registration. User review should judge the moving transition and static composition.

## Reference principles

Applied the mask-as-transition-geometry principle from [Codrops](https://tympanus.net/codrops/2026/03/11/svg-mask-transitions-on-scroll-with-gsap-and-scrolltrigger/)
and image/negative-space continuity studied on [Obys](https://obys.agency/works/).
No source code, exact layout, timing or original reference assets were copied; no GSAP/WebGL library was added.

**Next boundary:** user reviews the current localhost interaction pass. Any requested refinement or delivery is a
separate instruction. No next HOME scene starts automatically. **REPORT → STOP → USER APPROVAL.**
