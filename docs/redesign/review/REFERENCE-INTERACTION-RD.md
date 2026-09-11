# Reference interaction study — 2026-09-11

**Delivery revision:** the user subsequently authorized PR/merge of this current development screen unchanged.
The historical local-only boundaries below are superseded for this bundle's GitHub Pages development preview.
All three Performance direct routes, global transition and WORKS archive preview are enabled in that build mode;
production/legacy routing remains separate. This is delivery authorization, not an additional visual redesign.

Local development only, based on main `98aab89` plus preserved local work. This is a fidelity study,
not a visual approval or promotion. `npm run dev:interaction` serves port 4180.

## Performance

`/performance/haegeum-jeongak-2026-09-22/`, owned by `src/performance-detail`.
[Demo](https://tympanus.net/Tutorials/SVGMaskScrollTransition/) /
[source](https://github.com/Hiro-kiii/Scroll-Transition).
Four stacked fullscreen DOM chapters: poster/facts → note/program → performers → printed archive.
The reference's 30 paired SVG bands open from the centre, staggered bottom to top; its scrubbed
GSAP timeline, text masks and scene holds are retained. Native scrolling drives the sequence.
Feedback pass shortens the four-chapter stage from 680 to 425svh, holds to .25 and scrub to .65.
Desktop poster size now follows available viewport height. Decorative calls-to-action/captions are removed;
chapter navigation is transparent over the actual masked chapter, so its background stays continuous.
Only verified event text, official poster/leaflets and owned portraits are used. Compact reading and
printed-material dialogs retain full content; reduced motion uses ordinary readable sections.
The collaborator chapter contains Kim Seong Jun, Heo Yu Jin, Yoon Seung Hwan and Hong Se A, with the exact
event's legacy `fullBio` entries. Portrait-to-profile expansion uses native dialog and existing GSAP Flip.fit,
following the measured-image/open-content relationship in [GridZoom](https://github.com/codrops/GridZoom).
Closing returns the portrait to its measured source; reduced motion opens the readable dialog immediately.
Second feedback pass makes the mobile poster fill the measured remaining hero slot, after the title/date,
12px visit information and chapter navigation. Performance's decorative arrows are removed; names also open
profiles. The footer explicitly returns to `/works/#works-compact-archive`, waiting for the GPU's actual
INDEX scroll endpoint rather than treating the absolutely positioned archive as a native scroll anchor.
Performance entry now stages the selected poster at a larger central scale over an ivory sheet before settling
into its measured destination, with coordinated text reveals. It follows the large-image/slot/text sequencing
in [ImageToGridTransition source](https://github.com/codrops/ImageToGridTransition/blob/main/src/js/index.js).
Original aspect ratio, reduced motion and interruption cleanup remain intact. Album entries keep their prior motion.

## Global transition

From MENU, move between HOME, WORKS, MEDIA, ABOUT and CONTACT.
[Team demo](https://page-transitions-astro-barba-gsap.crnacura.workers.dev/team/) /
[source](https://github.com/Ibaliqbal/codrops-barbajs-page-transition/blob/main/src/scripts/app.js).
The Team example supplied the cover/route-commit/reveal lifecycle. The first feedback experiment's layered
ShapeOverlays sweep was rejected for its dark intermediate surface. Current mechanics use a single warm-ivory
quadratic sheet from [Theodore](https://tympanus.net/codrops/2021/11/02/svg-overlay-and-infinite-menu-background-animation/)
and its actual [source](https://github.com/codrops/Theodore/blob/main/src/js/index.js): a centre-led curved edge
straightens on full cover, then continues upward to reveal. The incoming composition follows with a 28px rise.
.36s cover + .48s release totals .84s, plus the route's two commit frames. No charcoal layer or destination word.
`src/navigation/page-transition.ts` delays React Router navigation until covered, then reveals after
the destination commit. A native top-layer dialog covers the existing navigation dialog without
changing its owner. Escape/history/reduced-motion/unmount cancel and release it. Modified clicks,
same-page links and Album/Performance shared entry remain outside this family.
MEDIA/ABOUT/CONTACT keep their existing route fixtures; this pass does not author those pages.

## WORKS archive

`/works/` → INDEX. [Reference](https://www.dondregreen.com/stories) /
[published source](https://dondre-green.netlify.app/index.js), classes DT/LT.
Desktop list/focus + persistent stage use its two-texture diagonal soft reveal, direction `(1,-1)`,
smoothness `.5`, `1s expo.out`. The source does not literally displace UVs despite its class name.
Interrupted transitions continue from the rendered composite; poster proportions remain contained.
Mobile keeps the existing inline archive; reduced motion/WebGL failure use a DOM image.
Owners: `AtmosphericArchive-preview.tsx`, `atmospheric-archive-preview-motion.ts` and its CSS.
The initial desktop stage now shares one measured 1120px central frame between DOM and GPU. Poster height
uses the open left column; title rail, caption and INDEX share the right column. Short laptop heights retain
the stacked caption safe area, and mobile composition is unchanged.

No HOME choreography, Audio analysis/player, Album internals, routing infrastructure, public release,
generated images or legacy repository changes are authorized by this study.

Validation for the initial study: type-check, changed-owner ESLint, three focused Node checks and the actual
`build:development-preview` passed. Local Chromium desktop/mobile smoke covered chapter masks,
owned portraits/print assets, text reader, archive keyboard selection and global cover/cancel cleanup.
Feedback pass: type-check, changed-owner ESLint, four focused Node checks and the actual development-preview
build passed. Existing WORKS geometry checks also passed. Local smoke confirmed menu-to-WORKS route/overlay
cleanup, the 1498px WORKS composition, the 2482px Performance poster, and profile open/Escape return. At 443px,
chapter navigation showed the actual archive background and the complete collaborator profile remained readable.
No fatal browser errors were recorded in that smoke. Native devices and visual quality approval remain separate.
Second feedback: the same type/lint/four focused checks and development-preview build passed. At 402×966,
the poster and enlarged visit information fit with chapter navigation without inner scrolling; a 375×667 check
also retained readable content. Direct Performance entry followed by its footer resolved to the expanded Archive,
with keyboard focus on the archive. Selected-poster entry completed with its temporary images/sheet removed.
The existing Three chunk-size warning remains; no Full Gate or broad browser suite was run.
The prior footer-to-WORKS opening limitation is resolved for the explicitly requested Archive footer action;
the shared Album owner keeps other return actions' existing origin behavior.

WORKS-only black-frame fix: its modal sleep guard previously included the route curtain, suspending the first
GPU frame until the curtain closed and exposing the unpainted opaque buffer. The initial guard and observer
now exclude only `.global-page-transition`; ordinary menus still pause rendering. Initialization sets an ivory
clear color and resize clears to it synchronously. Type/lint/build and the new regression check pass; local
ABOUT-menu-to-WORKS reaches ready/settled with rendered frames. The existing opacity-continuity test fails
its .006 limit; that function is byte-identical to HEAD and was not changed in this fix (6/7 checks passed).

WORKS opening composition feedback: title-rail step is 32px mobile / 36px desktop (formerly 44px), with a 6px
category break. Matching link height prevents overlapping targets; the expanded Archive retains its row sizes.
Larger Works/caption typography, a larger mobile poster and lighter ivory pigment give the original asset priority.
The poster briefly settles from 92% scale; the existing on-demand frame loop sleeps after settling. Desktop
pointer motion now produces bounded relative camera/plane movement instead of cancelling itself. Touch keeps
its authored scroll path. Existing reduced-motion fallback remains static; caption reveal is disabled there.

Additional references inspected:
- [Layer Motion Slideshow](https://tympanus.net/codrops/2019/01/24/layer-motion-slideshow/) and
  [actual TiltFx source](https://github.com/codrops/LayerMotionSlideshow/blob/master/js/demo.js): bounded pointer
  translation with separately damped layers; translated into the existing GPU owner, without new layers/dependencies.
- [SlideshowAnimations source](https://github.com/codrops/SlideshowAnimations/blob/main/js/demo1/slideshow.js):
  masked image/caption movement; a small native CSS caption reveal is used here, not its full slideshow system.

This pass: type-check, changed-owner ESLint, four focused geometry/texture/timeline/black-frame regression checks,
and actual development-preview build passed. Mobile 402×966 and desktop 1498×966 local composition inspected;
fatal browser errors: none. Existing Three chunk warning and previously documented opacity-test failure remain.
No Full Gate, delivery, HOME changes or new image assets.

## Two additional performance signatures

Both records share `PerformanceRecord` and `PerformanceRecordPage`. A data-selected `variant` mounts exactly
one signature; no performance slug occurs in choreography. The original SVG Mask owner is unchanged.

**DUAL FLOW — `/performance/sanjo-gil-2026-08-16/`**
- [Dual Wave article](https://tympanus.net/codrops/2026/01/15/building-a-scroll-driven-dual-wave-text-animation-with-gsap/)
  and [actual source](https://github.com/ValentinDBS/codrops-tutorial-text-animation/blob/main/src/dual-wave/DualWaveAnimation.js):
  item-index phase offsets, opposing signed sine fields, scroll-driven central selection. Our existing GSAP scrub
  owns smoothing, with different phase speeds for the two flows. Measured viewport bounds limit displacement.
- [Layered Zoom article](https://tympanus.net/codrops/2025/10/29/building-a-layered-zoom-scroll-effect-with-gsap-scrollsmoother-and-scrolltrigger/)
  and [source](https://github.com/joffreysp/telescope-zoom/blob/main/src/main.js): coordinated center/layer resolution.
  The final 14% reduces wave amplitude to zero and reunites the paired circular composition around the archive.
  No ScrollSmoother, wheel interception, or separate scroll clock is added. Original posters stay full-frame.

**TIME PATH — `/performance/haegeum-2026-08-02/`**
- [Responsive curved path](https://tympanus.net/codrops/2025/12/17/building-responsive-scroll-triggered-curved-path-animations-with-gsap/):
  article's embedded geometry code inspected. Its responsive cubic/control-point principle is implemented with
  native SVG path lengths/points, measured to the map on resize. The camera follows the object and opens to the
  whole curve at the end. Each segment uses its actual arc length, so unequal lengths cannot miss a year.
- [Scrollable timeline](https://tympanus.net/codrops/2022/01/03/building-a-scrollable-and-draggable-timeline-with-gsap/):
  scroll and checkpoint navigation use the same progress. Dragging is not added; native scroll and six year buttons
  cover this study. The linked CodePen source returned 403; article implementation was available and inspected.
- Exact year/title/composer: 1966 김흥교 해금과 장구를 위한 소곡; 1978 김기수 등롱; 1989 김영재 적념;
  1999 이해식 춤사리기; 2009 이정면 활의 노래; 2014 Donald Reid Womack 소리 Sori.

Verified source content is the exact two records in legacy `src/data/performances.ts`. The existing three
optimized official posters are reused. Nine selected portraits/leaflet derivatives were optimized without
crop/retouch; hashes/dimensions/provenance are recorded in `src/performance-detail/source-manifest.json`.
Unverified dates or absent admission facts are not filled in. Full original notes remain in the common reader.

Lean validation: type-check, changed-scope ESLint, five targeted data/dual-wave/path/mask tests and the actual
development-preview build pass. Local 402×966 and 1498×966 checks confirm separate signatures, chapter/year
navigation, readable program content and the final connected chronology. The development server was restarted
to clear an import-resolution cache from modules created during editing; no new fatal errors after restart.
Reduced motion is implemented through static content flow; physical devices are not claimed tested. Existing
Three bundle-size warning remains. No Full Gate, PR/push/merge/deployment; HOME/Audio/Album runtime untouched.
Rollback: remove only this variant bundle; pre-edit shared files are preserved in `.checkpoints/performance-variants-before`.
