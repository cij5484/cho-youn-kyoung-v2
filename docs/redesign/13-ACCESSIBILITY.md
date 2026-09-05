# CHO YOUN KYOUNG WEBSITE V2
## 13 — ACCESSIBILITY

**Version:** 1.1  
**Status:** Approved Accessibility Baseline  
**Parent:** `00-MASTER-PLAN.md`

---

# 1. ACCESSIBILITY OBJECTIVE

Accessibility is not a visual compromise.

The goal is to preserve the V2 art direction while ensuring that content and navigation remain usable without:

- hover
- drag
- motion
- sound
- WebGL
- fine pointer control

---

# 2. SEMANTIC HTML

Use meaningful:

- headings
- sections
- articles
- nav
- lists
- buttons
- links
- time/date markup where useful

Do not replace semantic structure with div-only composition.

---

# 3. KEYBOARD NAVIGATION

All essential actions must be keyboard accessible.

Including:
- navigation
- filters
- work selection
- booklet navigation
- audio controls
- video playback
- language switch
- modal/viewer close

---

# 4. FOCUS

Visible focus is mandatory.

Focus style must fit the design system without becoming invisible.

Do not remove outlines without replacement.

---

# 5. DRAG ALTERNATIVES

Any drag-based interface must offer an alternative:

- previous/next controls
- keyboard arrows
- direct links
- focusable items

Drag must be enhancement, not the only access path.

---

# 6. CUSTOM CURSOR

Custom cursor is non-essential.

The default pointer/focus semantics must remain correct.

Touch users do not need a custom cursor equivalent.

---

# 7. REDUCED MOTION

Honor:

`prefers-reduced-motion: reduce`

Simplify:
- parallax
- large zoom
- shared transitions
- inertia
- line motion
- auto rotation

Do not hide content or remove hierarchy.

---

# 8. 3D FALLBACK

Every essential 3D experience requires a non-3D fallback.

Fallback may include:
- high-quality pre-render
- standard image
- semantic text controls

All factual content remains accessible without WebGL.

---

# 9. SOUND

No autoplay audio.

Audio controls must include:
- play/pause
- seek
- volume
- mute
- track navigation

Controls must have accessible names.

---

# 10. VOLUME

Volume slider requires:
- accessible label
- value communication
- keyboard control

Mute/unmute must restore understandable state. Test actual mobile programmatic volume support in P0/Audio spike. Preserve the requirement with reviewed capability-based UX/fallback when unsupported; no ineffective slider or forced workaround.

No playable source must be announced as unavailable/disabled/coming soon; never expose a false playing state. Album mini player access persists inside the same Album Detail route, including the reader, and ends on route departure.

---

# 11. AUDIO VISUALIZATION

Audio-reactive lines are decorative/assistive, not required to understand the music.

Do not communicate essential state only through line motion.

---

# 12. VIDEO

Video requires:
- explicit play control
- accessible iframe/player title
- keyboard accessibility
- captions/subtitles when available and appropriate

Do not autoplay audio.

---

# 13. BOOKLET READER

Reader must support:
- previous/next buttons
- keyboard navigation
- clear page indicator
- zoom controls
- close/back
- touch swipe as enhancement

Do not rely only on swipe.

---

# 14. IMAGE ALT TEXT

Use meaningful alt text for:
- portraits
- performance records
- album artwork
- printed materials

Decorative imagery may use empty alt.

Avoid keyword stuffing.

---

# 15. COLOR CONTRAST

Maintain sufficient contrast for:
- body copy
- labels
- metadata
- focus states
- dark-stage content

Muted colors must remain readable. Use Design System §3 `--color-muted-text: #6D6962` at opacity 1 for normal-size metadata/body on Canvas #F4F0E8 (4.8024:1) or Surface #FAF8F3 (5.1429:1). Preserve #77736C for decoration or qualifying large text only. Recheck actual rendered backgrounds/states.

---

# 16. COLOR-INDEPENDENT STATE

Do not use color alone for:
- active filter
- upcoming
- selected track
- current navigation
- error/success

Use text, underline, icon, or position too.

---

# 17. TOUCH TARGETS

Tap targets must remain practical on mobile.

Minimal visual styling does not justify tiny hit areas.

---

# 18. LANGUAGE

Each localized page should declare the correct language.

Korean and English routes must preserve:
- semantic headings
- accessible labels
- equivalent navigation

---

# 19. SCREEN READER ORDER

DOM order should remain logical even when CSS grid creates asymmetric visual layouts.

Do not create a visual order that contradicts reading order severely.

---

# 20. MODALS / VIEWERS

If modal/viewer patterns are used:
- focus moves into modal
- focus is trapped appropriately
- Escape closes
- focus returns to trigger

---

# 21. ERROR / FALLBACK STATES

If:
- WebGL fails
- image fails
- audio fails
- video fails

show a meaningful fallback.

Do not leave blank space.

---

# 22. ACCESSIBILITY ACCEPTANCE CRITERIA

A page is approved when:

- keyboard-only use is possible
- focus is visible
- no content depends on hover
- no content depends on WebGL
- audio/video controls are clear
- drag has alternatives
- reduced motion remains coherent
- mobile touch targets are usable
- language semantics are correct

---

# 23. FINAL ACCESSIBILITY PRINCIPLE

**The interaction may be optional. The content is not.**
