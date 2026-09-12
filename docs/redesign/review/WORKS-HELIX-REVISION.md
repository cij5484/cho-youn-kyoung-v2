# WORKS helix and navigation revision — 2026-09-12

LOCAL / visual review pending. Baseline main `5818f12`. No PR, push, merge or deployment in this pass.

Subsequent authorized refinement: [Phase 3B](PHASE-3B-VISUAL-POLISH.md) replaces gesture scrubbing with
front-facing stops and adds masked letter transitions. This report records the preceding implementation.

## Authorized scope

- Replace the prior WORKS opening, retaining the actual seven records, proportions, details and final archive.
- Native scroll unfolds a cylindrical CSS 3D sculpture, rotates each work forward with its brief metadata,
  then projects the same cards toward measured archive locations. Reverse scroll reverses the composition.
- Final desktop list/persistent preview and mobile thumbnail archive retain their existing content/layout.
- Detail WORKS returns go directly to `#works-compact-archive`; main-menu WORKS still starts at the opening.
- CLASSIC / IMMERSIVE switch has one owner inside MENU on desktop and mobile.
- Mobile ABOUT initial content flows top line → title/role → portrait. Small browser heights can scroll instead
  of clipping; Open starts from the actual visible portrait bounds into the unchanged helix choreography.

## Implementation

`AtmosphericDepth.tsx` now owns the CSS 3D markup. `works-helix-model.ts` defines continuous cylindrical
poses and the unfold → sequential emphasis → archive clock. `works-helix-motion.ts` coalesces native scroll
into one requested frame, caches dimensions/targets on resize, and sleeps offscreen/hidden. No rAF React
state updates, new WebGL scene, new dependencies, generated images or source audio changes.
The seven existing 1024-long-edge image derivatives serve the sculpture. Original aspect ratios are retained.
Reduced motion exposes the archive directly. INDEX and deep archive links bypass the opening.

Source studied: [three.js CSS3D periodic-table example](https://threejs.org/examples/css3d_periodictable.html)
and its [published source](https://github.com/mrdoob/three.js/blob/master/examples/css3d_periodictable.html).
The cylindrical positions, radially oriented cards and layout-target interpolation informed this work;
the page uses the project's own scroll clock, typography, color and authentic assets rather than importing
the example's controls, camera loop or visual styling. ABOUT's existing helix model provided the local reference.

The unused `atmospheric-engine.ts` and compact title-rail motion are removed; catalog tests remain and
new helix tests cover every work, continuous/reversible poses and genuine front/back depth. HOME runtime,
audio analysis and Classic build remain unchanged.

## Verification

Typecheck, changed-scope lint, eleven helix/catalog/portrait/entry tests and actual development-preview build passed.
Built-browser desktop smoke verified direct archive progress=1, detail entry and return to the same completed
archive. The shared pathname scroll-reset now respects explicit fragments instead of overwriting page-owned
anchor placement. The archive also preserves its completed position when links receive keyboard focus.
Built ABOUT checks at 416×567 and 390×844 confirmed separate topline, text and portrait bounds with natural
scrolling; Open completed to the existing portrait strip without a console error. Desktop MENU exposed both
mode links inside the dialog. These are browser viewport checks, not physical Android/iOS validation.
Mobile archive deep-link smoke reached progress=1 with all seven links available and no horizontal overflow;
the existing thumbnail-row composition is retained.
No Full Gate or physical-phone QA claim. Rollback only this local diff against `5818f12`, preserving assets
and historical evidence. Visual elegance and final approval remain with the user.
