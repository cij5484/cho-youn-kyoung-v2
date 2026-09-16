# ENTRY — Classic / Immersive

## 2026-09-16 — Classic restoration and adaptive mode control (local)

User authorized restoring the existing Classic shelves and physical booklet fixes, while explicitly retaining
the deployed `239d180` soft, curved paper turn. Classic `3df8057` contains the missing PR141–143 changes;
the new local Classic follow-up combines their paired paper leaves with the original 48-segment curl,
outer-edge delay and 720ms turn. P1/P2 remain two faces of one leaf. This is not approval of a stiffer rigid turn.

The embedded mode control inherits Classic's existing navigation palette, including light and dark HOME
scenes and album/performance headers. Its current mode is marked by a short underline, not faded text.
Desktop navigation aligns all controls centrally in 44px targets; the separator is a short, subtle rule.
Mobile retains the control inside its existing dark menu. No live pixel sampling or new dependency.

Scope: independent Classic booklet/header CSS, embedded bridge, Classic revision pin and this handoff.
Rollback: revert these local follow-ups in their owning repositories; previous V2 baseline is `0d89af6`.
Publication is a separate next step: publish the Classic commit first, then the V2 revision that pins it.
The operating domain and GitHub deployment settings are unchanged. Visual acceptance remains user-owned.

Local Classic pin: `60c217bdf8b611bcc308fa2cdb82950de3595b22` (includes soft-turn checkpoint `2dc207c`).
The workflow checkout and build guard use the same revision. Both Classic follow-ups are local commits,
not yet available to GitHub CI; publish them before requesting a V2 remote build.

Checks completed on Windows / Node 24.15.0: both repositories' TypeScript checks, changed TypeScript ESLint,
Classic's 25 album model checks (including the original curve samples at 180/360/540ms, both directions and
flat endpoints), three V2 entry contracts, injected bridge syntax and the actual combined production-mode
local build. Existing large-chunk warnings remain. No Full Release Gate or physical-device test was run.

Chrome on the local built artifact: grouped shelves; light/dark HOME navigation; 820px single-line brand;
390×844 dark mobile menu; WORKS → Ji Young-hee album → OPEN → BOOKLET → P2/P3 → P4/P5 → P6/P7 → return →
reopen at P2/P3; mobile P2 → P3 → P4 → reverse → return; counterpart mode switch to the same Immersive album.
The desktop label centres differ by 0.32px (previously about 14px), and the mode text is fully opaque.
No browser error was recorded in this focused pass. This is interaction sanity, not motion-quality approval.
Review at `http://127.0.0.1:4185/classic/` while `node scripts/static-spike-server.mjs production` is running.

2026-09-12 · ENTRY-01 · baseline main `597cca9` · PR / main / Pages delivery authorized; visual review pending.
User opened the previously future Edition Gate for ENTRY and mode routing, then authorized delivery of the current screen with HOME-matched Immersive tails.

## Runtime boundary

- `labs/interaction/main.tsx` mounts `src/entry/EditionApp.tsx`. Public `preview/main.tsx` mounts the same owner.
- `/` selects a mode, without a saved-choice redirect. Existing unprefixed deep links normalize directly to `/immersive/...`.
- Immersive uses the existing application with BrowserRouter basename `/immersive` and Vite base `/immersive/`.
  Router links and existing native `appHref`/`appRoute` share that base. HOME, Audio, Album and page runtime files are untouched.
- Classic remains an independent repository/build. Its fresh build is written only to ignored `.cache/entry-classic`.
  `entry-classic-server.ts` serves it read-only on loopback 4181; a response-only bridge isolates its existing HashRouter in an iframe.
  The visible parent URL stays `/classic/...`. The parent owns history; source/origin-checked messages sync route changes and Back.
- The small mode switch maps the same supported work/page pathname; unsupported local/locale destinations return the other HOME.
  Phase 2A local bug fix: on mobile, Immersive places this control inside the common MENU.
  Classic places it inside its mobile menu and at the end of its desktop navigation, using the existing
  embedded-build bridge; its separate top bar is removed. The operating V1 source is unchanged.
  Immersive desktop and mobile both keep the switch inside MENU. The separate floating switch is removed.
  A mode switch loads the other document, disposing the outgoing app/audio rather than leaving a hidden player running.
- Pages compiles explicit ENTRY, Classic, Immersive and old deep-link HTML inputs. Vite asset base stays the project base;
  runtime BASE_URL includes `immersive/` so existing V2 link/audio contracts need no owner changes.
- CI checks out clean Classic SHA `239d18056d8b3df2cf9a5fd5509f897f85ed70ad` and builds it independently under `classic-app/`.
  The iframe uses this same-origin static output; the validated bridge is injected only into build HTML.
  Audio is copied to `immersive/audio/`; no localhost destination or development comparison UI is published.
- Operating domain, legacy source and dependencies are unchanged. No auto-selection persistence.

## Reference mechanics and composition

- [Sliced image tutorial](https://tympanus.net/codrops/2023/06/21/coding-the-sliced-image-hover-effect-from-quai-network/)
  / [source](https://github.com/codrops/ClipHoverEffect): repeated copies of one photograph with non-overlapping slice masks;
  alternating translation and ordered settling. Reinterpreted as seven ivory-framed portrait slices, without the reference's branding/type shuffle.
- [Hover Motion Intro](https://tympanus.net/codrops/2024/05/29/hover-motion-intro-animation/)
  / [source](https://github.com/codrops/IntroGridMotionTransition): persistent image identity during an enlarged entry.
  The same displayed Classic portrait scales from its measured rectangle while the separate Classic application prepares underneath.
- [Kinetic image mechanics](https://tympanus.net/codrops/2025/07/09/how-to-create-kinetic-image-animations-with-react-three-fiber/)
  / [source](https://github.com/DGFX/codrops-kinetic-images): tilted cylindrical arrangement with continuous angular motion.
- [CSS3D periodic table](https://threejs.org/examples/css3d_periodictable.html)
  / [source](https://github.com/mrdoob/three.js/blob/master/examples/css3d_periodictable.html): cylindrical target coordinates and perspective camera travel.
  Reuses ABOUT `portraitHelix` and all 12 optimized authentic `portraits`, displayed by installed Three CSS3DRenderer.
- [Interactive cluster](https://tympanus.net/codrops/2026/08/12/creating-an-interactive-3d-cluster-with-three-js-tsl-and-three-start/)
  / [source](https://github.com/kekkorider/codrops-tutorial-dark-cluster): spatially local pointer response.
  ENTRY applies a bounded distance-weighted depth offset near the pointer. No WebGPU/shader framework, synthetic pictures or new assets.

The initially balanced split expands its selected side. Existing HOME free-point geometry leads the Immersive reveal; `twoPointContract` owns the 2-second headless,
tapered/faded Violet and Lacquer trails, drawn with the shared trail sampler and stable reduced-motion markers;
the photographic helix follows with staggered emergence, slow rotation, then a camera move through its centre on entry.
Classic stays photographic. Mobile uses stacked 50/50 areas, first tap preview and explicit ENTER. Keyboard focus opens preview;
reduced motion removes travel/repeats and keeps mode selection/content available. Visibility and unmount release animation work.

## Loading and local execution

Entry typography is immediate. Only its one Classic portrait is available initially; the CSS3D module and ABOUT image set are imported
after Immersive preview intent. The existing V2 application and initial HOME portrait are preloaded just before entry. Classic mounts
beneath the entry and signals completion of its own initial loading screen before the portrait transition uncovers it.

1. Install dependencies in the existing separate Classic checkout, if not already installed.
2. `node scripts/prepare-entry-classic.mjs` — defaults to sibling `../cho-youn-kyoung`; `CLASSIC_REPOSITORY` may select its local path.
3. `npm.cmd run dev:interaction` — 4180 ENTRY/V2 and isolated 4181 Classic use one dev-server lifecycle.
4. Open `http://127.0.0.1:4180/`; direct examples: `/classic/about/`, `/immersive/about/`, `/immersive/works/`.

Classic build bytes stay in ignored cache. Unknown static files return 404, path containment and allowed origins are checked,
and an occupied Classic port fails clearly. The preview server must not be exposed as a production host.

## Checks and rollback

Lean checks: TypeScript, changed-scope ESLint, `node --test tests/entry-routing.test.ts`, actual local ENTRY bundle build,
and desktop/mobile browser entry, direct routes, mode switch and history smoke. No Full Gate or physical-device quality claim.
Classic server checks cover response-only injection, MIME/HEAD/CORS/path containment and single-owner history messages.

Completed: type-check, changed-scope lint, both entry routing/lazy-boundary checks and the local Vite ENTRY build pass.
Browser smoke confirms the 12 real portraits load, focus/tap preview, explicit mobile ENTER, Classic HOME after its own preload,
Immersive HOME, direct ABOUT links, counterpart switch and browser Back. No fatal parent runtime error was observed.
Classic child-history messages were exercised in the server bridge check; the in-app browser could display iframe content but
its automation could not activate inner-frame links, so an inner-link browser interaction pass is not claimed.
The existing Three bundle size warning remains; ENTRY imports it only following Immersive intent. Delivery Fast and the actual combined Pages preview build pass; pure route checks cover local/project bases and both edition destinations.

Rollback: revert the ENTRY delivery commit, restoring the previous public preview entry/build adapter and local lab mount.
HOME/page owners and the independent Classic source are unchanged.

## 2026-09-15 — direct area entry (local)
User replaces the two-step mobile preview/ENTER interaction with direct area links.
Classic and Immersive now navigate with native anchors; ENTER, its adjacent line and
the entry-only flight/preparation delay are removed. The Classic/Immersive separator remains on desktop and mobile. Fine-pointer hover previews
remain; touch does not activate the sculpture or resize the split before navigation.
Types, scoped lint, local entry build and desktop/mobile link sanity checked; actual mobile
hardware performance remains unmeasured. No deployment in this pass.

User correction 2026-09-15: first activation selects and reveals the photographic/spatial preview; a second activation of the same area follows its edition link. Selecting the other area previews that edition first. ENTER remains removed and the divider remains. Hover/focus alone does not count as the first activation.
