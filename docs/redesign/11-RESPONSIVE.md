# CHO YOUN KYOUNG WEBSITE V2
## 11 — RESPONSIVE

**Version:** 1.1  
**Status:** Approved Responsive Baseline  
**Parent:** `00-MASTER-PLAN.md`  
**Primary Principle:** Mobile Primary / Recompose, Do Not Scale Down

---

# 1. RESPONSIVE OBJECTIVE

Responsive design is not a cleanup phase.

It is part of the initial composition system.

V2 must feel intentionally designed on:

- wide desktop
- desktop
- compact desktop / tablet landscape
- tablet / large mobile
- mobile

Do not design one desktop composition and shrink it.

---

# 2. MOBILE PRIMARY

Mobile is a first-class experience.

Practical QA priority is mobile-first because many first visits are likely to originate from:

- social links
- messaging apps
- poster QR / shared links
- YouTube
- Instagram
- search results

Mobile must preserve:

- strong typography
- art direction
- narrative continuity
- interaction quality
- media quality
- premium perception

---

# 3. BREAKPOINT POLICY

Use content-driven breakpoints.

Do not assume:

```text
768 = tablet
1024 = desktop
```

without testing.

Breakpoints should be introduced when:
- layout hierarchy breaks
- text becomes unreadable
- image crop becomes weak
- navigation becomes crowded
- interaction changes meaningfully

Keep the number of breakpoint tiers small and maintainable.

---

# 4. RESPONSIVE TOKENS

Use shared responsive tokens for:

- page gutters
- typography scale
- section spacing
- content width
- image size
- grid gaps

Avoid repeated one-off media-query values.

---

# 5. HOME HERO

Desktop:
- asymmetric portrait
- editorial navigation
- CHO / YOUN / KYOUNG
- pointer parallax
- precise foreground/background type masking

Mobile:
- independently recomposed portrait crop
- large stacked typography
- scroll-based depth
- no pointer parallax
- mobile-specific navigation composition

Do not reuse a desktop crop if it weakens the mobile Hero.

---

# 6. HOME HAEGEUM

Desktop:
- multi-layer crop/cutout composition
- continuous connecting line
- asymmetry

Mobile:
- vertical 4-stage sequence
- fewer simultaneous layers
- strong crop quality
- line continuity preserved

Do not force horizontal desktop geometry into mobile.

---

# 7. HOME SOUND

Desktop:
- wide two-line sound landscape

Mobile:
- compact two-line version
- tap to LISTEN
- reduced visual amplitude
- no accidental sound

The bowed-string micro-vibration rule applies equally.

---

# 8. SELECTED WORKS

Desktop:
- asymmetric horizontal drag rail

Mobile:
- swipe-compatible composition
- vertical page scroll remains primary
- no drag gesture that traps the page

If gesture intent cannot be made reliable, simplify the interaction.

---

# 9. ALBUM 3D

Desktop:
- full quality where supported

Mobile:
- adaptive DPR
- simplified shadows/reflections when needed
- reduced simultaneous 3D complexity
- static/pre-render fallback if necessary

Mobile fallback must still feel premium.

---

# 10. PERFORMANCE INDEX

Desktop:
- persistent Stage Window + timeline

Mobile:
- inline visual per performance
- vertical editorial chronology
- no sticky desktop Stage Window imitation

---

# 11. ABOUT

Desktop:
- asymmetric biography/career layouts

Mobile:
- vertical editorial reading flow
- clear milestone hierarchy
- portrait archive density reduced

---

# 12. MEDIA

Desktop:
- editorial mixed-media grid

Mobile:
- featured video first
- vertical feed
- mixed one/two-column imagery
- inline player
- no swipe-heavy archive

---

# 13. CONTACT

Desktop:
- large typography + minimal contact info

Mobile:
- vertical actions
- large tap targets
- clear copy-email interaction

---

# 14. ALBUM DETAIL MOBILE

Critical behavior:

- large 3D object area
- minimal metadata
- explicit OPEN ALBUM
- vertical scroll wins
- horizontal rotate requires clear intent
- single-page booklet reader
- pinch zoom
- same-Album-Detail-route persistent mini player; terminate playback on different-route navigation
- expandable volume control, validated on real mobile browsers in P0/Audio spike; capability-based reviewed fallback if unsupported

---

# 15. PERFORMANCE DETAIL MOBILE

Use:

```text
Hero
→ Artist Note
→ Program
→ Cast
→ Archive
→ Related
```

Keep interaction lighter than desktop.

Preserve image quality and editorial rhythm.

---

# 16. NAVIGATION

Desktop:
- Transforming Editorial Navigation → compact functional header

Mobile:
- independently designed navigation
- clear access to WORKS / MEDIA / ABOUT / CONTACT / language switch
- avoid desktop menu shrinkage

The mobile menu must not feel like an afterthought.

---

# 17. LANGUAGE SWITCH

Mobile language control must remain easy to reach.

Korean default and English equivalent route must be preserved.

Avoid tiny language controls near device edges.

---

# 18. TOUCH TARGETS

Interactive controls must have practical touch size.

Avoid:
- tiny arrows
- thin-only clickable text
- hidden gestures as the only path

Visual minimalism does not justify unusable targets.

---

# 19. GESTURE PRIORITY

Default priority:

1. vertical page scroll
2. explicit tap
3. horizontal swipe/drag
4. 3D rotation

A decorative interaction must never overpower primary navigation/scrolling.

---

# 20. RESPONSIVE ASSET POLICY

Allow dedicated assets for:

- mobile Hero
- performance crops
- media poster frames
- album pre-renders
- editorial backgrounds

Do not force one source image to serve every viewport if it weakens composition.

---

# 21. REAL DEVICE QA

Minimum practical validation should include:

- modern iPhone-class device
- modern Android-class device
- one lower/mid-tier mobile profile if possible
- desktop Chrome
- Safari where relevant

Emulation is useful but does not replace real hardware for:
- touch feel
- thermal behavior
- scroll/3D conflict
- performance perception

---

# 22. REDUCED MOTION

Responsive design must respect reduced motion at every viewport.

Do not create a mobile-only animation that ignores the global reduced-motion system.

---

# 23. RESPONSIVE ACCEPTANCE CRITERIA

Responsive work is approved when:

- mobile feels authored, not compressed
- no important crop is accidental
- navigation remains obvious
- scrolling is reliable
- 3D interaction never traps the page
- media remains fast
- typography keeps its visual impact
- tablet does not fall into an awkward halfway layout
- fallback states still look premium
- the mobile visitor can still think:

**“와, 정말 잘 만들었다.”**

---

# 24. FINAL RESPONSIVE PRINCIPLE

**Mobile is not the fallback. Mobile is one of the primary stages.**
