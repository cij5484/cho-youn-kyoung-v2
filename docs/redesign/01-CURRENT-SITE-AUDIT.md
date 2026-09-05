# CHO YOUN KYOUNG WEBSITE V2
## 01 — CURRENT SITE AUDIT

**Version:** 1.1  
**Status:** Approved Audit Baseline  
**Legacy Repository:** `cij5484/cho-youn-kyoung`  
**Audit Principle:** Legacy site is a content and knowledge source, not a frontend foundation.

---

# 1. EXECUTIVE CONCLUSION

기존 사이트에는 두 종류의 가치가 공존한다.

## HIGH-VALUE ASSETS
구조화된 콘텐츠, 정리된 media asset, album package resource, performance archive, profile photo, press data, audio reference, asset-management documentation, Three.js/R3F technical knowledge.

## LEGACY IMPLEMENTATION
page-specific CSS, work-specific hero rule, dedicated performance pages, increasingly complex 3D component, HashRouter routing.

V2 전략:

**Preserve the information.  
Preserve the assets.  
Preserve useful technical knowledge.  
Rebuild the experience.**

---

# 2. CURRENT TECHNOLOGY

Legacy stack:

- React
- TypeScript
- Vite
- React Router
- Three.js
- React Three Fiber
- Noto Sans KR
- Noto Serif KR

기술 스택 자체는 V2에서도 적합하다.

**Do not change frameworks merely for the sake of starting fresh.**

---

# 3. ROUTING

Legacy uses `HashRouter`.

V2는 clean URL로 변경한다.

기존 `/#/...` 링크는 production migration 시 compatibility layer로 보호한다.

---

# 4. HIGH-VALUE DATA

중요 파일:

- `src/data/albums.ts`
- `src/data/performances.ts`
- `src/data/profile.ts`
- `src/data/media.ts`
- `src/data/press.ts`
- `src/data/site.ts`

콘텐츠와 UI가 분리된 data-driven 접근은 유지한다.

---

# 5. ALBUM DATA

`albums.ts`는 핵심 migration asset이다.

이미 지원하는 항목:

- album ID
- Korean / English title
- year
- release status/date
- description
- cover/CD label
- tracks/durations
- track credits
- web audio URL
- participants/credits
- booklet
- streaming links
- media/downloads
- 3D package textures
- package proportions
- desktop/mobile backgrounds
- detail experience config

Current IDs:

- `yeongsan-hoesang-2026`
- `pyeongjo-hoesang-2026`
- `ji-young-hee-ryu-haegeum-sanjo-2026`
- `han-beom-su-haegeum-sanjo-2020`

IDs are strong candidates for permanent slugs.

**Legacy data is a source, not automatically the final authority.**

---

# 6. PERFORMANCE DATA

`performances.ts`도 중요한 migration asset이다.

지원 정보:

- ID
- title/subtitle
- date
- venue/address
- performer
- hero asset
- artist note
- introduction
- program structure/notes
- instrumentation
- collaborators/biographies
- ticket/seating/age restriction
- poster/leaflet archive
- Home Hero config

---

# 7. PERFORMANCE ARCHITECTURE PROBLEM

현재 일부 performance는 ID 기준으로 dedicated page component로 분기한다.

V2에서는:

`Performance Content + Optional Visual Variant + Reusable Detail Systems`

구조를 사용한다.

---

# 8. PROFILE / MEDIA / PRESS / SITE

`profile.ts`:
- profile/gallery
- alt/ARIA
- crop metadata
- biography data

`media.ts`:
- video/external/local media structure

`press.ts`:
- outlet/date/title/canonical URL/category

`site.ts`:
- artist/site/contact/social/meta/navigation

데이터는 검증 후 재사용하고 UI는 rebuild한다.

---

# 9. HOME HERO DATA

기존 `homeHeroSlides.ts` rotating architecture는 V2 HOME 구조로 사용하지 않는다.

V2 HOME은 scene-based editorial experience다.

---

# 10. ASSET ORGANIZATION

기존 asset structure principle은 유용하다.

- `albums/{id}/web|viewer|downloads`
- `performances/{id}/web|viewer|downloads`
- `artist/profile|gallery`
- `people/{id}`
- `brand`

원칙은 유지하되 전체 폴더를 복사하지 않는다.

---

# 11. WEB / PRINT SEPARATION

Print PDF를 background로 사용하지 않는다.
WebP viewer를 print master로 취급하지 않는다.

Runtime / Viewer / Download / Production Master를 구분한다.

---

# 12. LARGE BINARY POLICY

V2 repo는 runtime 중심으로 가볍게 유지한다.

대형 download는 object storage/CDN을 검토한다.

---

# 13. CURRENT 3D VALUE

Legacy HOME Album Package는 실제 Three.js/R3F 기반이며 다음 기술이 이미 검증/축적되어 있다.

- texture loading
- sRGB
- anisotropy
- mipmaps
- physical dimensions
- plastic/paper materials
- auto rotation
- drag
- inertia
- tilt limit
- reduced motion
- responsive DPR
- lighting/shadows
- cleanup/disposal

이 지식은 매우 가치가 높다.

---

# 14. 3D MIGRATION DECISION

HOME 3D는 reference implementation + possible logic donor.

Album Detail 3D는 기능이 풍부하지만 monolithic하므로 그대로 migration하지 않는다.

Review candidates:

- `packageGeometry.ts`
- `discMotion.ts`
- `packageFade.ts`
- `packageProfile.ts`
- `renderPolicy.ts`
- `preloadAlbumDetail.ts`
- `useAlbumAudio.ts` — logic donor only: V2 must not inherit the no-source silent preview timer. Use unavailable/disabled/coming-soon truth; same-route Album Detail persistence only, end playback on route departure.
- `PackageMaterials.tsx`

각 항목을 `reuse / rewrite / merge / discard`로 판정한다.

---

# 15. CSS AUDIT

Legacy has a large `global.css` plus many page-specific stylesheets and work-specific global rules.

**Do not copy legacy CSS into V2.**

V2 starts with a clean cascade and new token system.

---

# 16. LOGIC VS PRESENTATION

Potentially reusable logic:

- date formatting
- sorting
- navigation calculation
- audio state logic
- geometry
- motion math
- asset URL normalization

Rebuild presentation:

- Header
- Hero
- Cards
- Page layout
- Transition
- Typography
- CSS

---

# 17. DEPLOYMENT KNOWLEDGE

Legacy already has a working GitHub Actions → Pages flow.

V2 should reuse the proven deployment idea while redesigning:
- project subpath handling
- clean-route fallback
- production custom-domain switch

---

# 18. ACCESSIBILITY / SEO / TEST KNOWLEDGE

Preserve knowledge such as:
- robots/sitemap/meta
- reduced motion
- alt/ARIA
- focus restore/trap
- Escape handling
- image fallback
- behavioral tests for album interactions

Reimplement in V2 architecture.

---

# 19. MIGRATION CLASSIFICATION

## MIGRATE AFTER VERIFICATION
Content, IDs, approved artwork, booklet viewer, profile/performer photos, archive assets, audio/video/press URLs.

## REVIEW FOR LOGIC REUSE
Geometry, motion, audio, preload/render policy, utilities, accessibility patterns, deployment workflow, tests.

## REFERENCE ONLY
Legacy HOME, current Works/Header/Detail/About/Media layouts, historical workflow docs.

## DO NOT MIGRATE
Legacy CSS architecture, HashRouter, work-specific global patches, current token system, special-page proliferation, unused binaries/source candidates.

---

# 20. AUDIT VERDICT

Content quality: **Strong**  
Asset quality: **Strong**  
3D knowledge: **Very Strong**  
Current frontend reusability: **Limited**  
Current CSS reusability: **Very Low**  
Routing reusability: **Low**  
Deployment knowledge: **Strong**

---

# 21. FINAL AUDIT DECISION

V2는 completely independent frontend로 만든다.

Legacy는 개발 중 수정하지 않는다.

Codex는 두 local project를 볼 수 있지만 approved data/assets/code만 명시적으로 migration한다.

**Nothing is copied because it exists.**
