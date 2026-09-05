# CHO YOUN KYOUNG WEBSITE V2
## 14 — MIGRATION / QA

**Version:** 1.3\
**Status:** Approved Migration & QA Baseline  
**Parent:** `00-MASTER-PLAN.md`

---

# 1. MIGRATION OBJECTIVE

V2 must launch without breaking:

- factual accuracy
- existing useful URLs
- public assets
- search visibility
- direct route access
- media links
- mobile behavior
- rollback safety

Migration is a controlled production cutover, not a final-minute deploy.

---

# 2. LEGACY CONTENT AUDIT

Before migration verify:

- album titles
- English titles
- release status/date
- track names/durations
- credits
- performer names
- performance titles
- dates
- venues
- program notes
- profile/career
- press links
- social/contact URLs

Legacy data is not automatically authoritative.

---

# 3. ASSET MIGRATION

For every asset classify:

```text
MIGRATE
REPLACE
REGENERATE
REQUEST NEW
EXCLUDE
```

Do not migrate full legacy folders blindly.

---

# 4. LEGACY VISUAL REVIEW

Legacy visual assets must pass V2 fit review.

Do not migrate:
- outdated backgrounds
- old visual patches
- old screenshots
- old 3D scene styling

unless independently approved.

---

# 5. ROUTING

V2 uses clean routes. React Router + Static Prerender is APPROVED after the P0C real Pages gate; see [architecture decision](review/ROUTING-ARCHITECTURE-DECISION.md). HashRouter remains forbidden. P0C verified its 13 requested neutral routes on real Pages. P0D subsequently verified all 18 KO/EN neutral routes locally at both bases, including reciprocal hreflang, self-canonical, lang and OG. See [locale contract](review/LOCALE-METADATA-CONTRACT.md). The P0D artifact is not deployed; actual authored-content and production-domain checks below remain release requirements. Test Project Pages subpath `/cho-youn-kyoung-v2/` and final-domain root `/`, direct navigation/refresh, valid route versus 404, per-route metadata, canonical and hreflang for all routes below. P0 tests root-mode without switching the operating domain; actual custom-domain/HTTPS proof belongs to PHASE 14.

Verify direct navigation and refresh for:

- `/`
- `/works`
- `/albums`
- `/performances`
- `/album/:id`
- `/performance/:id`
- `/media`
- `/about`
- `/contact`
- `/en/...`

---

# 6. LEGACY HASH COMPATIBILITY

Production migration must handle old links such as:

`/#/album/...`
`/#/performance/...`

Normalize/redirect to clean routes.

Do not keep HashRouter.

---

# 7. GITHUB PAGES PREVIEW

Before custom-domain cutover verify project-subpath deployment.

Check:
- base path
- assets
- direct route fallback
- refresh behavior
- language routes

---

# 8. CUSTOM DOMAIN CUTOVER

Before switching `choyounkyoung.com`:

- V2 preview approved
- SSL/HTTPS ready
- DNS plan confirmed
- production base path set correctly
- canonical URLs updated
- sitemap updated
- robots reviewed

---

# 9. ROLLBACK PLAN

Keep legacy production recoverable during initial cutover.

Document:
- previous deployment reference
- DNS rollback
- repository/source rollback
- known stable version

Do not delete legacy site immediately after launch.

---

# 10. SEO

Verify:

- title
- meta description
- canonical
- Open Graph
- share image
- sitemap
- robots
- structured data where useful
- hreflang for KO/EN

---

# 11. KO / EN QA

For every public route verify:

- Korean route
- English equivalent
- language switch
- equivalent content
- official names/titles
- no accidental machine translation
- correct `lang`

---

# 12. LINK QA

Check:

- internal links
- YouTube
- Instagram
- press URLs
- downloadable PDFs
- audio URLs
- related work navigation
- previous/next

No broken links accepted.

---

# 13. MOBILE QA

Mobile is primary QA priority.

Test:

- Hero
- navigation
- language switch
- Selected Works
- 3D rotate/scroll conflict
- Album open
- booklet
- audio player
- volume
- Performance timeline
- Media player
- Contact copy

---

# 14. BROWSER QA

At minimum review current major versions of:

- Chrome
- Safari
- Edge
- mobile Safari
- Chrome Android

Fallback behavior must be acceptable where advanced APIs differ.

---

# 15. 3D QA

For every 3D flow verify:

- initial state
- drag
- inertia
- open
- close
- selection
- detail transition
- mandatory separate Tray Lab Quality Gate before package Quality Approved (perceptual transparent CD plastic, not CAD fidelity)
- disc
- booklet
- route exit
- route return
- reduced motion
- low-quality tier
- static fallback

---

# 16. 3D CONTINUITY QA

For every transition boundary compare:

- outgoing final transform
- incoming initial transform
- velocity
- camera
- material
- lighting
- selected state

No visible jumps accepted.

---

# 17. AUDIO QA

Verify:

- play/pause
- previous/next
- seek
- current time
- duration
- volume
- mute/unmute
- volume persistence across tracks within the same Album Detail route
- actual mobile programmatic-volume capability and reviewed fallback when unsupported
- track change
- mini player accessible during Tracks/Reader/Credits/editorial/internal 3D-DOM transitions
- same-route booklet playback continuity
- termination on different-route navigation (including other album/HOME/WORKS/MEDIA/ABOUT and locale pathname change)
- route exit/return cleanup, no cross-route/global playback and no return autoplay
- absent playable source shows unavailable/disabled/coming soon; no false playback clock

---

# 18. MEDIA QA

Verify:

- poster-first behavior
- lazy YouTube load
- one active player
- player cleanup
- external links
- mobile playback

---

# 19. ACCESSIBILITY QA

Run:

- keyboard walkthrough
- focus review
- reduced-motion review
- screen-reader spot checks
- touch target review
- contrast review

---

# 20. PERFORMANCE QA

Review:

- LCP
- INP
- CLS
- long tasks
- 3D frame stability
- memory growth
- mobile thermal behavior
- offscreen suspension
- lazy loading

---

# 21. CONTENT QA

Check:
- spelling
- date format
- bilingual consistency
- performer names
- album credits
- performance titles
- age/ticket rules
- downloadable file labels

---

# 22. VISUAL QA

Review each page at:

- wide desktop
- laptop
- tablet
- small mobile
- large mobile

Check:
- crop
- type wrapping
- overlap
- mask edges
- line alignment
- sticky elements
- bottom players
- safe areas

---

# 23. FINAL RELEASE GATE

Production cutover occurs only when:

- build/lint pass
- route QA pass
- mobile QA pass
- 3D Quality Gate pass
- accessibility pass
- content validation pass
- SEO pass
- rollback plan exists

---

# 24. POST-LAUNCH

After launch:
- monitor broken links
- monitor user/device issues
- verify indexing
- verify analytics if used
- keep rollback available for initial period
- fix regressions through normal versioned releases

---

# 25. FINAL MIGRATION PRINCIPLE

**Do not launch because the new site is finished. Launch because the new site is verified.**

# 26. BOUNDED IMPLEMENTATION AND QA

Canonical roadmap is PHASE 0–14. Each implementation or QA/fix unit follows 00 §43: PLAN → ONE BOUNDED TASK → TEST / VALIDATE → REPORT RESULT → STOP → WAIT FOR USER APPROVAL → NEXT TASK. Report the seven required fields. A phase-wide QA list is coverage, not permission to implement/fix several pages or 3D subsystems in one run. Escalate scope changes instead of continuing automatically.
