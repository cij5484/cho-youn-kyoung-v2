# ABOUT portrait gallery — 2026-09-12 delivery

Current refinement: the gallery's Violet/Lacquer trails use the same cylindrical XYZ coordinates as the portraits,
with independent continuous travel and shared drag rotation. Native 3D depth puts them between the photos rather
than above the dialog. Focused photos/hidden tabs pause the trails; reduced motion retains two static markers.
The shared signature colors and two-second tapered tail remain. This refinement and accumulated Phase 2A fixes
are authorized for PR/main/Pages delivery; previous scope notes below record the earlier ABOUT-only delivery.

User authorized PR and merge of the reviewed ABOUT revision. Baseline `c603782`.
The Pages development preview now serves this same ABOUT owner. MEDIA/CONTACT local prototypes and
development comparison tools are not part of this delivery. Release fixtures and official EN remain separate.

One authentic portrait with an Open button unfolds twelve portraits into CSS 3D helix positions, then gathers
them into a fixed right column. Biography, newest-first milestones, recitals, albums and readable career sections
scroll independently. Existing optimized portraits are Vite imports, with no private source paths or generated imagery.

Every column photo reopens the helix and enlarges that exact photo. Closing the photo leaves the helix available;
outer Close gathers it back to the column. Native dialogs preserve scroll lock and restore focus. Horizontal Pointer
Events drag/swipe rotates the helix with bounded GSAP deceleration; a 6px threshold distinguishes drag from selection.
The drag hit surface sits behind the rear photos. Arrow keys also rotate. Reduced motion omits inertia and entrance
motion. Resize, cancel, blur, close and unmount stop active manipulation/tweens.

References studied: three.js CSS3D periodic table helix coordinates and Codrops Thumbnail Flow MotionPath mechanics.
The implementation uses existing GSAP and native CSS perspective; no additional dependency or renderer.
HOME changes only the Sou.P greeting to “사랑하는 소울이와 하울이 아빠”, preserving its reveal and signature.

Local checks: types, scoped lint, helix/column and periodic-rotation tests, development-preview build and browser
drag → photo focus → helix → column smoke. Delivery requires existing Fast CI and automatic Pages workflow.
Physical touchscreen/Safari and formal visual Quality Approval are not claimed. Rollback: revert this delivery diff.
