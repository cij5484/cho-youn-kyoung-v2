# CHO YOUN KYOUNG WEBSITE V2
## 12 — PERFORMANCE

**Version:** 1.2\
**Status:** Approved Performance Baseline  
**Parent:** `00-MASTER-PLAN.md`

---

# 1. PERFORMANCE OBJECTIVE

V2 may look visually ambitious, but it must feel immediate.

Performance is part of the art direction.

A visually beautiful page that stutters, delays interaction, overheats mobile devices, or leaks GPU resources is not approved.

---

# 2. PERFORMANCE PRIORITY

1. Input responsiveness
2. Scroll stability
3. Visual continuity
4. Media loading
5. 3D fidelity
6. Decorative complexity

When a visual effect harms interaction quality, reduce the effect.

---

# 3. CORE WEB VITALS

Monitor current Core Web Vitals and practical user-perceived metrics.

Pay particular attention to:

- LCP
- INP
- CLS

Also inspect:
- long tasks
- frame drops
- image decode cost
- JavaScript execution
- GPU pressure
- memory growth

Do not optimize only for Lighthouse score.

---

# 4. HERO LOADING

Hero must appear quickly.

Use:
- responsive image sources
- intentional preload of true Hero asset
- optimized font loading
- avoid blocking decorative assets

Do not preload every large image on the page.

HOME V2.1 first-five-seconds impact comes from the first viewport composition and prompt photography/type presentation, not a five-second preloader, forced entrance or early WebGL initialization. Keep the existing media/font/loading and responsiveness priorities. A weak final-scale portrait must trigger an asset request, not an unbounded image download or more effects.

---

# 5. FONT LOADING

Use real production fonts efficiently.

Avoid:
- unnecessary weight variants
- large unused font subsets
- multiple redundant font families

Prevent layout shift where practical.

---

# 6. IMAGE POLICY

Use:
- AVIF/WebP where appropriate
- responsive `srcset`
- appropriate dimensions
- intentional crop assets

Do not ship print-resolution images to mobile browsers.

---

# 7. VIDEO POLICY

YouTube/video players should load on demand where possible.

Use:
- poster frame first
- lazy/deferred iframe creation
- one active primary player
- pause/suspend inactive players

Do not initialize many video embeds at page load.

---

# 8. AUDIO POLICY

Audio files may remain external/CDN-hosted.

Requirements:
- no autoplay
- preload only appropriate metadata/audio range
- player remains responsive
- no actual playable source means unavailable/disabled/coming soon, never a silent preview clock
- album playback persists only inside its Album Detail route; stop/release on different-route navigation
- no global cross-site persistent player
- mobile programmatic volume requires a real capability spike; report fallback if unsupported
- visualization work remains lightweight

Do not decode/analyze every track before the user needs it.

P2G HOME uses one same-origin 434,470-byte AAC excerpt, with `preload="none"` and no media URL or AudioContext
until explicit activation. Analysis runs only while visible playback or its short damping needs it; reduced
motion stays static. Offscreen/hidden state pauses media and suspends the context; route/source departure
removes the source, closes/disconnects the graph and removes observers, listeners and paths. No dependency is
added. P2H replays the buffered excerpt without another media load or analyser creation; only a failed source
reloads. Eight route returns close each old context and preserve exactly one audio element/two paths per current
scene. This bounded resource regression is not an exhaustive heap-leak certification.
[Sound evidence](review/HOME-SOUND-EXPERIENCE.md) distinguishes local measurements from phone/thermal QA.

---

# 9. 3D LAB PERFORMANCE

Every major 3D experience must be profiled in isolation before page integration.

For HOME V2.1, compare three simultaneous live album objects against one high-quality live object plus album switching. If the former weakens visual quality, mobile performance or interaction, prefer the latter while retaining all three album choices. Do not lower physical-object quality just to maintain live object count. This decision requires future Lab evidence; no profiling was performed in this documentation task.

Measure:
- frame stability
- input latency
- memory
- texture count
- geometry count
- render calls
- DPR sensitivity
- mobile behavior

---

# 10. 3D QUALITY TIERS

Support:

- HIGH
- MEDIUM
- LOW
- STATIC FALLBACK

Tier changes may affect:

- DPR
- shadow resolution
- reflection/environment quality
- texture resolution
- lighting complexity
- effect count

Core interaction semantics should remain consistent where possible.

---

# 11. ADAPTIVE DPR

Do not force high DPR on every device.

High pixel density is valuable only while stable performance is maintained.

Use controlled caps and adaptive behavior.

---

# 12. OFFSCREEN RENDERING

Heavy WebGL work should reduce or stop when:

- scene is outside viewport
- document is hidden
- route is leaving
- interaction is fully settled and demand-rendering is possible

---

# 13. ON-DEMAND RENDERING

Use demand rendering when a scene can be idle.

Continuous rendering is justified for:
- active drag
- inertia
- opening animation
- playing disc motion
- intentional auto movement

Do not keep 60fps loops alive without visible need.

HOME V2.1 Album Object idles stable/static; Sound is visually quiet without explicit playback, and Performance/About are quiet after the 3D peak. Pause offscreen work rather than running every HOME scene simultaneously.

---

# 14. R3F STATE POLICY

Fast-changing animation values should use:

- refs
- `useFrame`
- delta time

Avoid page-wide React state updates for:
- pointer position
- frame rotation
- parallax
- inertia
- audio-reactive micro-motion

---

# 15. FRAME-RATE INDEPENDENCE

Motion must use elapsed time / delta time.

Do not use fixed per-frame increments.

---

# 16. GPU RESOURCE LIFECYCLE

Explicitly manage:

- textures
- materials
- geometries
- render targets
- scenes/canvases

Route exit and asset replacement must not leak GPU resources.

---

# 17. TEXTURE BUDGET

Use the smallest texture that preserves visual quality at intended screen size.

Do not keep:
- full booklet pages
- all album interiors
- all performance imagery

resident simultaneously.

---

# 18. BOOKLET TEXTURE WINDOW

Booklet readers should load the current page/spread plus a small neighbor window.

Dispose/release distant high-resolution textures when practical.

---

# 19. PRELOAD POLICY

Preload only likely-next resources.

Examples:
- hovered/selected album detail
- active performance Hero
- next booklet page
- selected media player

Do not preload the entire site.

---

# 20. ROUTE TRANSITION COST

Page transitions must not block navigation while waiting for heavy assets indefinitely.

Use:
- bounded prewarm
- fallback state
- immediate route functionality

Do not hold the user hostage to a transition.

---

# 21. 3D CONTINUITY VS PERFORMANCE

Continuity remains mandatory, but not at any cost.

If a seamless transition requires loading a very heavy scene in advance, evaluate:
- pre-render bridge
- simplified intermediate state
- short fallback transition

Choose perceived quality over technical purity.

---

# 22. PARALLAX PERFORMANCE

Prefer:
- transform
- requestAnimationFrame
- shared scroll observers

Avoid:
- independent scroll listeners for many elements
- layout-triggering property updates
- excessive `will-change`

---

# 23. FILTER / GRID PERFORMANCE

Filtering/reflow should remain smooth as the archive grows.

Avoid:
- re-rendering unrelated page sections
- decoding all hidden images during every filter change

---

# 24. MOBILE THERMAL / BATTERY

Mobile quality must consider sustained use.

A scene that runs smoothly for five seconds but rapidly heats the device is not ideal.

Reduce:
- continuous high-DPR rendering
- unnecessary post-processing
- persistent offscreen animation

---

# 25. LONG-SESSION TEST

Test:

- repeated route changes
- repeated album opens/closes
- booklet navigation
- multiple track changes
- media playback
- 3D entry/exit

Watch for:
- memory growth
- stale audio
- duplicate canvases
- stuck event listeners

---

# 26. PRODUCTION MONITORING

After launch, monitor practical issues from:
- device/browser reports
- real-user feedback
- performance traces when regressions are suspected

Do not treat launch as the end of performance work.

---

# 27. PERFORMANCE ACCEPTANCE CRITERIA

HOME V2.1 01→02 travel should first be reviewed around 1.2–1.6 viewport within the Scene 02 budget. It is not an extra long pinned sequence. Preserve native vertical scroll and interruptibility; optional desktop wheel exploration must return control at its bounds. Mobile priority stays vertical scroll > tap > intentional horizontal gesture > free 3D manipulation.

A feature is approved only when:

- scroll remains stable
- input feels immediate
- route transitions do not hang
- no obvious frame stutter
- mobile remains usable
- memory does not continuously grow
- fallback exists
- visual quality remains intentional

---

# 28. FINAL PERFORMANCE PRINCIPLE

**The site may look expensive. It must never feel heavy.**
