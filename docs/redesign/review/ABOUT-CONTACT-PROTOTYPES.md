# ABOUT / CONTACT reference-driven prototypes — 2026-09-12

Current delivery revision: ABOUT shipped in PR #26; the user subsequently explicitly authorized CONTACT and all other
completed authored screens for PR/main/Pages delivery. Existing LOCAL ONLY/build-exclusion notes below are historical.
Current scope and checks are recorded in [Page delivery reconciliation](PAGE-DELIVERY-RECONCILIATION.md).

IMPLEMENTED / LOCALLY VERIFIED (lean) / LOCAL ONLY. Baseline main `c603782`; existing MEDIA work preserved.
No PR, push, merge, deploy, Full Release Gate or visual Quality Approval.

## Current revision — click-to-helix, persistent portrait strip

The user supersedes the first ABOUT prototype below. CONTACT stays unchanged.

### Follow-up — selectable helix gallery

All twelve settled strip photos are native buttons. Selecting one morphs measured strip positions into the existing
responsive XYZ helix, then expands that exact photo. Two native modal dialogs separate photo focus from gallery navigation:
‘사진 닫기’ / Escape closes only the enlarged image and returns focus to its helix card; outer ‘Close’ / Escape gathers
the cards into their measured strip positions and restores the original focus and scroll position. Body scroll locking,
resize, reduced-motion and unmount cleanup belong to the gallery. A direct `#about-career` entry settles the strip first.
`PortraitGallery.tsx` owns the viewer; ABOUT component, motion button activation and scoped CSS connect it. No other runtime changes.

The open helix supports horizontal mouse drag and touch swipe through native Pointer Events, with pointer capture and a
6px click/drag threshold. A bounded GSAP coast decelerates on release; a new gesture, photo selection, Close, resize,
pointer cancellation or unmount stops it. Reduced motion keeps direct manipulation but omits coasting. Arrow keys rotate
while a card is focused. Rotation reuses the helix coordinates, preserves vertical slots and never changes biography scroll.
The periodic-rotation test covers mobile/desktop geometry; local browser drag confirms XYZ movement without opening a photo,
then a rear-depth photo remains clickable. The empty-space drag surface sits behind all cards rather than occluding them.
Type-check, scoped lint, both geometry tests and development-preview build pass; actual touch hardware was not tested.

Follow-up validation: type-check, ABOUT-only ESLint, existing runnable helix/strip geometry test and actual development-preview
build pass (existing Three.js chunk warning). Local mobile interaction confirms photo 2 → photo close → helix → photo 4 →
Escape → helix → Close → original strip, with unchanged scroll position. Desktop 1280×900 also opens photo 6 and returns
to the helix/strip. Published-mode builds continue to exclude the local ABOUT prototype. LOCAL ONLY; no physical-device or visual approval claimed.

### Entrance and biography revision

- First screen: only one authentic representative portrait is visible. Native button click/touch/Enter launches all twelve actual gallery portraits into cylindrical XYZ positions with radial Y rotation and perspective. A short orbital turn reveals depth; MotionPath waypoints then gather the same cards into one right-hand column. No 2D fan, random particles, new imagery or extra 3D dependency.
- [three.js periodic table demo](https://threejs.org/examples/css3d_periodictable.html) and [actual source](https://github.com/mrdoob/three.js/blob/dev/examples/css3d_periodictable.html) were inspected. The reference uses cylindrical helix coordinates, outward orientation and position/rotation target morphing through CSS3D objects. ABOUT implements those coordinate/rotation mechanics with CSS perspective/preserve-3d and the installed GSAP; it does not add a WebGL renderer or TrackballControls. Reference A supplies the final curved waypoint gathering.
- The finite entrance lasts approximately 3.15 seconds. After it finishes, no animation loop or scroll transform updates remain. Resize remeasures the column; native scroll only changes which portrait is emphasized. The text advances through Biography, newest-first Milestones, Recitals, Albums, then Career/Education/Awards. Long CV content remains ordinary readable document flow. The CV shortcut skips the entrance. Reduced motion immediately aligns the column; resize during entrance preserves timeline time, and unmount cancels the local timeline/observer/listeners.
- Twelve authentic portraits: prior six plus gallery 11/14/20/31/36/39, copied unchanged (additional 1,083,888 bytes; source SHA/native dimensions verified). No capture-year claims. Milestones now contain eight entries, beginning 2026.09.22 / 08.16 / 08.02, then descending years. Recitals also display newest first.
- HOME `HomeOutro.tsx`: only the existing greeting literal is replaced by **사랑하는 소울이와 하울이 아빠**. Sou.P button label, two-step reveal, JSX and state logic are unchanged. No HOME motion changes.
- Validation: type-check, changed-area ESLint, one runnable XYZ/column invariant test, actual development-preview build pass (existing Three.js chunk warning). Mobile browser shows a single initial image, click-triggered translate3d/rotation and all 12 images; after settling, all 12 transform strings remain identical across scroll. No fatal console error observed. This is browser sanity, not physical-device/visual approval.
- Changed files: ABOUT component/motion/model/CSS/data/assets/test, HOME greeting literal and owning status docs. No routing, MEDIA, CONTACT, Audio, Album or other page runtime changes in this revision. LOCAL ONLY.

The following sections record the superseded first prototype and its checks; they are historical, not the current ABOUT motion contract.

## Objective and scope

One authorized two-page bundle: authentic portrait biography for ABOUT and a brief kinetic typography endpoint for CONTACT.
Local URLs: http://127.0.0.1:4180/about/ and http://127.0.0.1:4180/contact/ (`npm.cmd run dev:interaction`).
The normal menu opens both. DEV + localhost lazy imports in `labs/interaction/InteractionLab.tsx` exclude them from published builds.
No HOME, Audio, Album, WORKS, Performance, MEDIA renderer or global transition changes. No dependency added.

## Reference mechanics

- [Thumbnail Flow article](https://tympanus.net/codrops/2026/06/04/creating-a-thumbnail-flow-animation-with-gsap-motionpath/) / [actual source](https://github.com/Ibaliqbal/codrops-motion-path-transition/blob/main/js/script.js): per-thumbnail MotionPath waypoints include x/y/scale, curved overshoot and indexed timing. The original is button-driven; this requested adaptation uses native scroll as the only clock. No reference photographs are reused.
- [Responsive Grid Flip article](https://tympanus.net/codrops/2026/01/20/animating-responsive-grid-layout-transitions-with-gsap-flip/) / [actual source](https://github.com/Ibaliqbal/grid-layout-transition/blob/main/js/script.js): measured responsive grid state, same DOM cards and Flip transforms. ABOUT captures its actual native grid with `Flip.getState` and uses `Flip.to` from the settled flow. Resize rebuilds measurements and restores scroll progress.
- [Kinetic Type reference](https://tympanus.net/Development/KineticTypePageTransition/) / [actual source](https://github.com/codrops/KineticTypePageTransition/blob/main/src/js/typeTransition.js): repeated text rows, alternating horizontal travel and staggered visibility. CONTACT retains these mechanics at restrained pointer/scroll amplitudes; no large page rotation, takeover layer or additional global transition family.

## Files and data

- `src/about/AboutPrototype.tsx`: portrait biography, milestone panels, same-card archive, readable Full Career and local Contact link.
- `src/about/about-motion.ts`, `portrait-flow-model.ts`, `about.css`: scoped GSAP MotionPath/Flip/ScrollTrigger, deterministic phase progress, responsive native grid.
- `src/about/about-data.ts`, `src/about/assets/`: verified biography, six milestones, four CV groups, eleven listed recitals and four albums. Album facts reuse the existing catalog.
- `src/contact/ContactPrototype.tsx`, `contact.css`: three typographic rows, actual email, native clipboard action and local scoped motion.
- `tests/portrait-flow.test.ts`: endpoints, exact MotionPath/Flip boundary, held progress, continuity and reverse traversal.
- `labs/interaction/InteractionLab.tsx`: two localhost-only lazy destinations; existing MEDIA guard shares the same hostname check.
- Owning status: `10-ABOUT-MEDIA-CONTACT.md` and `CODEX-HANDOFF.md`.

Five optimized authentic photographs were copied unchanged from the operating legacy site's `public/assets/artist/gallery`
(08, 16, 25, 32, 35 WebP), total 890,356 bytes, source SHA matches. The sixth portrait reuses V2
`src/home/assets/artist-portrait-960.webp`. Provenance: legacy `src/data/profile.ts` and `docs/ASSET-INVENTORY.md`.
Capture dates are unknown; image order never asserts a photographic chronology. No generation, re-encoding, private masters or image downloads.
Career facts use legacy `profile.ts` plus the latest user-confirmed V2 §10 facts: current **기악단 단원**; **前 수석** only in historical career.
Email `cykguri@naver.com` and Instagram are from legacy `src/data/site.ts`. No contact form, backend, analytics or message sending.

## Runtime and accessibility

ABOUT keeps six figures in one responsive grid. A paused MotionPath timeline first fans the stack out and then moves the
small portraits alongside biography/milestones. A second paused Flip timeline returns these same figures to their native grid.
Only the active phase writes transforms. Stop/rewind/fast scroll use the exact native scroll position, without timed auto-advance,
scroll hijacking, a separate clock or React state updates per frame. Resize and ScrollTrigger refresh rebuild the measured endpoints.
Local observers, triggers and timelines are killed on unmount. Reduced motion uses ordinary document sections and the static grid;
the complete factual biography/CV remains in the readable lower section. The visible CV shortcut skips the animated sequence.

CONTACT uses event-driven, bounded GSAP row offsets and native clipboard `writeText`. Only fulfilled copy switches the third row
to COPIED for two seconds; failure selects/focuses the visible email and announces a Korean fallback. Native mailto stays available.
Timers/listeners/tweens clean up on unmount. Reduced motion disables kinetic offsets, entrance motion and copy animation, keeping the
copy status and links usable. The layout limits display size by both viewport width and height so email/actions stay prominent.

## Lean validation and limits

- `npm.cmd run type-check`: pass.
- `npx.cmd eslint src/about src/contact labs/interaction/InteractionLab.tsx tests/portrait-flow.test.ts --max-warnings 0`: pass.
- `node --test tests/portrait-flow.test.ts`: one focused test passes.
- `npm.cmd run build:development-preview`: pass, existing Three.js 724 KB chunk warning. ABOUT/CONTACT source, CSS and copied portraits are absent from the published-mode output by design; local Vite is the actual visual preview.
- Local browser: desktop ABOUT 1498×966; CONTACT desktop 1280×720; mobile narrow view and 402×966. Six real images load; stack → biography → milestones → native grid is visible. Grid endpoint transforms return to zero. Copy success produces `data-copy="copied"`, Korean live status and COPIED text; mobile horizontal overflow is absent.
- Reverse scroll returns all six loaded portraits to the stack. ABOUT → CONTACT removes all portrait nodes, preserves normal body overflow and reports no fatal errors; browser Back remounts ABOUT. CONTACT email/actions fit within the tested 720px desktop viewport. Temporary viewport overrides are reset and both local tabs remain available.
- Native clipboard permission-denial UI, physical phones/Safari, formal accessibility and visual Quality Approval are not claimed. No broad E2E or Full Gate.

## Rollback / remaining boundary

Remove only `src/about/`, `src/contact/`, the portrait test, the two local lazy branches/imports and this pass's owning-document additions.
Keep earlier MEDIA files and route branch. No public data or deployment was changed. User visual review is the next boundary; this report does not authorize further work.
