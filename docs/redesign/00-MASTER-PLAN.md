# CHO YOUN KYOUNG WEBSITE V2
## 00 — REDESIGN MASTER PLAN

**Version:** 1.18\
**Status:** Approved Planning Baseline — P1C/P1D approved and delivered; P2A visually approved and delivered; P2B Bold QUALITY APPROVED FOR HERO INTEGRATION / FROZEN; enlarged bounded-task policy retained; HOME/product visual approval pending\
**Legacy Repository:** `cij5484/cho-youn-kyoung`  
**Target Repository:** `cij5484/cho-youn-kyoung-v2`  
**Final Production Domain:** `https://choyounkyoung.com`  
**Planning / Art Direction:** ChatGPT + User  
**Implementation:** Codex App

---

# 1. PROJECT DEFINITION

Cho Youn Kyoung Website V2는 기존 홈페이지의 부분 리뉴얼이 아니다.

기존 홈페이지에서 검증된 콘텐츠, 데이터, 이미지, 앨범 자료, 공연 자료, 음원 URL, 영상 링크, 3D 관련 기술적 노하우를 활용하되 프론트엔드 경험과 디자인 시스템은 처음부터 새롭게 구축한다.

기존 사이트는 V2 개발 기간 동안 계속 운영한다.

V2는 별도의 Public GitHub Repository에서 완전히 독립적으로 개발한다.

V2가 최종 QA를 통과한 이후에만 기존 `choyounkyoung.com`을 새 프로젝트로 전환한다.

---

# 2. CORE OBJECTIVE

2026-09-06 사용자 추가 기준: **BOLD, CURATED, PURPOSEFUL.** 처음 방문자가 “우와, 홈페이지 정말 잘
만들었다”라고 느끼는 수준을 최우선 시각 목표로 둔다. 효과 수를 최소화하는 방향으로 restraint를
해석하지 않는다. 명확한 목적과 visual quality가 있는 expressive / experimental interaction을 적극 검토한다.
기억할 만한 character가 중요한 움직임마다 있어야 하며 사용성·모바일 성능·접근성 계약은 함께 지킨다.

목표는 단순히 “예쁜 연주자 홈페이지”가 아니다.

조윤경이라는 해금 연주자의 음악 세계를 웹을 통해 경험하게 만드는 다음 세 가지 역할을 동시에 수행한다.

- Digital Artist Archive
- Interactive Portfolio
- Official Artist Website

사이트는 두 가지 축을 동시에 만족해야 한다.

## EXPERIENCE
방문자가 조윤경의 음악, 작품, 이미지, 움직임과 분위기를 감각적으로 경험한다.

## INFORMATION
공연, 앨범, 프로필, 약력, 프로그램, 출연진, 음원, 영상, 기사 등의 정보를 빠르고 정확하게 찾을 수 있다.

시각적 경험 때문에 정보 접근성을 희생하지 않는다.
정보 전달 때문에 예술적 경험을 포기하지 않는다.

---

# 3. CORE DESIGN PHILOSOPHY

## TRADITION IN MOTION

이 문구는 반드시 화면에 노출해야 하는 슬로건이 아니라 프로젝트의 디자인 철학이다.

전통을 직접적으로 장식하기보다 전통음악 안의 선, 호흡, 여백, 울림, 리듬, 반복, 절제, 긴장과 이완을 현대적인 웹 디자인 언어로 변환한다.

**전통을 장식하지 않는다. 전통 안의 구조와 움직임을 디자인한다.**

---

# 4. PRIMARY VISUAL LANGUAGE

## LINE
해금의 두 현, 활의 궤적, 악보의 구조, 연주의 흐름을 의미한다.

## SPACE
정악의 절제와 한국 음악의 여백을 의미한다.

## RESONANCE
해금의 울림과 음의 확산을 의미한다.

## MOTION
움직임은 장식이 아니라 음악적 호흡과 사용자의 입력에 대한 반응이어야 한다.

---

# 5. DESIGN KEYWORDS

Contemporary  
Korean  
Restrained  
Elegant  
Cinematic  
Tactile  
Rhythmic  
Editorial  
Immersive  
Precise

---

# 6. REFERENCE POLICY

2026-09-06 Reference Adoption Policy: 고품질 사이트의 navigation, typography hover, image reveal, scroll
choreography, layout transformation, shared transition, cursor, spatial composition, gallery의 검증된 원리와
structural idea를 적극 연구·도입한다. 초기 V2부터 좋은 reference의 강점을 학습하고 구현할 수 있다.
Exact layout / visual composition / timing values, original assets, branding, source code는 복제하지 않는다.
Ivory editorial language, 해금, 두 현/활, tension/resonance, album objects, photography, typography로 재해석한다.
필요하면 REFINED vs BOLD를 비교하며, 처음부터 안전하게 축소하기보다 과감한 prototype에서 불필요한
요소를 visual review로 덜어낸다. 이것은 아래 특정 reference의 직접 복제 금지를 완화하는 허가가 아니다.

특정 사이트를 복제하지 않는다.

주요 참고 방향:

- Son Daven — 전통문화를 현대적 인터랙션 언어로 재해석
- Siena Film Foundation — 작품 자체가 사이트 구조가 되는 방식
- Lando Norris — 개인을 하나의 브랜드 세계로 구축
- Floema — 강한 브랜드 경험과 정보 접근성의 균형
- Bruno Simon — 홈페이지 자체가 경험이 되는 철학

특정 섹션이나 인터랙션을 설계할 때 더 나은 판단을 위해 추가 레퍼런스 조사가 필요하면 적극적으로 조사한다.

**Reference research should be problem-driven, not decorative.**

V2.1에는 사용자가 최근 검토에서 전달한 원칙을 반영한다: immersive artist world, confident editorial typography, work-first identity, gallery/archive restraint, strong first viewport, elegant presentation 안의 깊은 콘텐츠. 이번 문서 작업에서 해당 사이트들을 새로 조사했다는 뜻은 아니다. Layout/animation/type composition/source code/unique interaction을 직접 복제하지 않는다. 독자성은 해금·두 현/활·tension/resonance·physical albums·Sanjo/Jeongak materiality·조윤경 photography에서 만든다.

분석 기준:

- What is the interaction?
- Why does it work?
- What problem does it solve?
- How expensive is it to implement and maintain?
- How does it behave on mobile?
- Is it appropriate for Cho Youn Kyoung?

---

# 7. PROFESSIONAL PRACTICE RULE

사용자는 웹디자인·프론트엔드 개발의 초보자일 수 있으므로, 사용자 요청을 무조건 그대로 구현하지 않는다.

**If a user instruction conflicts with professional web practice, maintainability, performance, accessibility, mobile usability, or the approved architecture, explain the conflict and recommend the professional approach before implementation.**

단기적으로 쉬운 방식보다 유지보수 가능한 실무 방식을 우선한다.

AI가 만들기 쉬운 방식이 아니라 좋은 제품을 만드는 방식을 선택한다.

작업 과정과 판단 설명은 사용자에게 한국어로 전달한다.

Codex용 기술 명세에서 영어가 더 정확하면 영어를 사용한다.

---

# 8. WHAT THIS WEBSITE MUST NOT BECOME

- 전통문양·한지·붓글씨를 무분별하게 쓰는 전형적인 국악 홈페이지
- 예쁘지만 정보를 찾기 어려운 실험 사이트
- 기술을 과시하기 위한 3D 데모
- 항상 모든 것이 움직이는 피로한 사이트
- 앨범과 공연을 동일한 카드 UI로 반복하는 일반 포트폴리오
- Desktop을 단순 축소한 Mobile
- 페이지마다 서로 다른 animation 규칙
- 작품 추가 때마다 전용 CSS patch와 전용 page component가 계속 늘어나는 구조

---

# 9. PROJECT STRATEGY

V2는 새로운 독립 저장소에서 구축한다.

- Legacy: `cij5484/cho-youn-kyoung`
- V2: `cij5484/cho-youn-kyoung-v2`

기존 프로젝트는 운영 사이트와 콘텐츠/자산/기술 참고 자료원으로 유지한다.

---

# 10. MIGRATION PRINCIPLE

**Nothing is copied because it exists.**

기존 프로젝트의 모든 항목은 다음 질문을 통과해야 한다.

## CONTENT
- Is it accurate?
- Is it current?
- Is it required in V2?

## ASSET
- Will V2 actually display or distribute it?
- Is it appropriate for web runtime or download?

## CODE
- Does the same problem still exist in V2?
- Is the code compatible with the new architecture?

## DESIGN
- Does it belong to the new art direction?

통과한 항목만 V2로 가져온다.

---

# 11. CONTENT / ASSET / PRESENTATION SEPARATION

V2에서는 다음 세 영역을 분리한다.

## CONTENT
사실 정보: 제목, 날짜, 장소, 트랙, 크레딧, 출연진, 약력 등.

## ASSET
실제 미디어: cover, booklet, poster, portrait, audio, video 등.

## PRESENTATION
어떻게 보여줄지에 대한 정보: selected status, visual theme, accent, layout variant, interaction treatment 등.

**Factual content must not be tightly coupled to a specific HOME or page implementation.**

---

# 12. LEGACY DATA TO MIGRATE AFTER VERIFICATION

- `albums.ts`
- `performances.ts`
- `profile.ts`
- `media.ts`
- `press.ts`
- `site.ts`

기존 album/performance ID는 가능한 한 영구 slug로 유지한다.

---

# 13. DATA VALIDATION

V2 이동 전 다음을 최신 확정 정보와 대조한다.

- 공식 한글/영문 제목
- 발매 상태 및 발매일
- 트랙명과 길이
- 연주자 이름 및 공식 영문 이름
- Producer / Recording / Mixing / Mastering / Distribution / Design
- 공연 날짜 / 제목 / 장소 / 프로그램 / 출연진
- 약력
- 외부 URL

---

# 14. INFORMATION ARCHITECTURE

기본 구조:

- HOME
- WORKS
  - PERFORMANCES
  - ALBUMS
- MEDIA
- ABOUT
- CONTACT

상세 route:

- `/album/:id`
- `/performance/:id`

세부 index route는 후속 IA 문서에서 확정한다.

---

# 15. ROUTING POLICY

**Do not use HashRouter in V2.**

목표는 clean URL이다.

예:

- `/`
- `/works`
- `/albums`
- `/performances`
- `/album/:id`
- `/performance/:id`
- `/media`
- `/about`
- `/contact`

---

# 16. LEGACY HASH URL COMPATIBILITY

기존 공유 URL 보호를 위해 production migration 시 작은 compatibility layer를 제공한다.

예:

`/#/album/example` → `/album/example`

`/#/performance/example` → `/performance/example`

**The compatibility layer must not force V2 to keep HashRouter.**

---

# 17. GITHUB PAGES DEVELOPMENT STRATEGY

개발 기간 동안 GitHub Pages를 preview environment로 사용한다.

예상 개발 URL:

`https://cij5484.github.io/cho-youn-kyoung-v2/`

최종 production:

`https://choyounkyoung.com/`

---

# 18. BASE PATH POLICY

GitHub Project Pages의 repository subpath를 지원해야 한다.

**Do not hard-code `/cho-youn-kyoung-v2/` throughout the application.**

Vite base / asset URL strategy에서 중앙 관리한다.

Production custom domain으로 전환할 때 `/`로 쉽게 변경 가능해야 한다.

---

# 19. SPA FALLBACK

초기 SPA fallback 문제의 현재 해결은 APPROVED static prerender + deterministic file placement다. GitHub Pages direct URL/refresh는 각 valid route의 정적 HTML로 제공하며 unknown request의 실제 HTTP 404를 보존한다. 모든 경로를 200으로 복구하는 fallback은 배포하지 않는다.

Acceptance:

- `/album/:id`
- `/performance/:id`
- `/about`
- `/media`
- `/contact`

직접 입력 및 새로고침이 정상 동작해야 한다.

**Do not reintroduce HashRouter as a shortcut.**

---

# 20. HOME STRATEGY

HOME은 사이트 소개 페이지가 아니라 V2의 핵심 작품이다.

**HOME Art Direction V2.1 — documentation revision only.** 목표를 “잘 만들어진 현대적인 아티스트 홈페이지”에서 “HOME 자체가 조윤경의 하나의 디지털 작품처럼 느껴지는 홈페이지”로 상향한다. 첫 약 5초의 인상은 “우와, 홈페이지 진짜 잘 만들었다.”여야 하며, 이는 대기/로딩 시간을 뜻하지 않는다. Typography, photography, crop, composition, depth, whitespace, interaction timing, transition continuity, physical response로 품질을 만든다. 효과 수를 늘리는 것이 목표가 아니다.

Contemporary Editorial / Ivory, Static Color, Dynamic Composition 및 **ARTIST → INSTRUMENT → SOUND → WORK → OBJECT → STAGE → ARTIST → NAME**을 유지한다. 정본 세부 계약은 [04 HOME V2.1](04-HOME.md)이다.

- Rhythm: STRONG → STRONG → QUIET → ACTIVE → PEAK → QUIET → QUIET → RESOLVE. 강도/길이는 04 §2의 8-scene 표를 따른다.
- Hero: Moving Editorial Poster. 세 줄 이름은 viewport 높이 약 55–65%까지 허용하는 graphic structure이며 실제 font metric/breakpoint로 조정한다. Portrait는 desktop 오른쪽 58–62% visual zone, purple hanbok side/back/partial-face 후보, 정교한 1–2개 depth intersection. Nav는 composition에서 compact header로 변형된다.
- 두 가는 선은 Hero→Haegeum→Sound→Selected Works→Outro의 구조적 motif다. Bowed-string tension/resonance를 거의 straight한 micro vibration/density/damping으로 표현한다.
- Hero→Haegeum은 요소의 spacing/depth/crop/position이 이어지는 변형이다. 1.2–1.6 viewport를 Scene 02 예산과 겹쳐 검토하고 snap/긴 강제 pin을 사용하지 않는다.
- SOUND는 조용한 LISTEN, 10–20초 대표 fragment, explicit playback only. Selected Works는 4–5작의 긴 asymmetric editorial surface다.
- Album Object는 두 번째 peak. 세 2026 앨범을 유지하되 동시 live 3개가 품질을 해치면 한 고품질 object + switching을 우선한다. Idle은 안정적/정적이다.
- Performance는 첫 큰 Dark Stage 전환이지만 움직임은 줄인다. About은 Ivory로 돌아와 처음 명확한 front/clear 3/4 portrait와 2–3문장. Outro는 이름/두 선의 resolve, EXPLORE ALL WORKS 한 primary CTA, 기존 Sou.P secret.
- Mobile은 더 과감한 crop과 typography 재구성, 독립 depth 판단, lighter scroll parallax, touch-safe nav, vertical-first gesture와 감소한 WebGL 비용을 사용한다.
- Functional Complete만으로 Hero/주요 Scene을 승인하지 않는다. 04 §24의 poster screenshot·crop/type/mask·interruptibility·동등한 mobile attention gate와 사용자 시각 승인이 필요하다. 이번 문서 작업에서 시각 gate를 통과한 것은 아니다.

현재 scene direction:

1. Intro / Hero
2. Haegeum
3. Musical World
4. Selected Works
5. Album Object
6. Performance
7. About
8. Outro

HOME은 scene-based editorial experience로 설계한다.

기존 `homeHeroSlides.ts`의 rotating architecture는 V2 HOME 구조로 사용하지 않는다.

---

# 21. WORKS PHILOSOPHY

WORKS는 단순 목록이 아니라 작품 탐색 공간이다.

ALBUM과 PERFORMANCE를 동일 generic card component 안에 억지로 넣지 않는다.

---

# 22. PERFORMANCE VARIANT ARCHITECTURE

기존처럼 특정 performance ID마다 별도 page component를 만드는 방식을 기본 구조로 사용하지 않는다.

권장:

`Performance Content + Visual Variant + Reusable Detail Systems`

예:

- `variant: editorial`
- `variant: sanjo`
- `variant: jeongak`
- `variant: minimal`

variant는 art direction을 바꿀 수 있지만 전체 page architecture를 매번 새로 만들게 해서는 안 된다.

P1A 사용자 확인: stored visualMode는 photo / poster / video-still / editorial / typography다. 위 variant 예시는 과거 개념 설명이며 별도 stored enum이 아니다. sanjo/jeongak은 musical category로 분리하고 minimal을 자동으로 typography에 매핑하지 않는다. Detail의 *-led 설명 대응과 정본은 [Content Schema Contract](review/CONTENT-SCHEMA-CONTRACT.md)를 따른다.

---

# 23. ALBUM DETAIL PHILOSOPHY

Album Detail은 온라인 북클릿 / 디지털 전시 공간처럼 설계한다.

가능한 구성:

Cover, Title, Year, Release info, 3D Package, Album Story, Artist Note, Track List, Participants, Credits, Booklet, Photos, Listen, Related Works.

---

# 24. PERFORMANCE DETAIL PHILOSOPHY

Performance Detail은 공연 정보 페이지가 아니라 공연 기록이다.

가능한 구성:

Hero, Title, Date, Venue, Program, Performers, Artist Note, Program Notes, Photos, Video, Poster, Leaflet, Related Works.

---

# 25. GLOBAL INTERACTION SYSTEM

공통 interaction layer를 구축한다.

후보:

- Cursor
- Hover
- Drag
- Scroll Reveal
- Text Reveal
- Image Reveal
- Page Transition
- Shared Image Transition
- Media Interaction
- 3D Interaction

페이지마다 서로 다른 규칙을 만들지 않는다.

---

# 26. 3D STRATEGY

3D는 품질을 만족한다면 적극적으로 사용할 수 있다.

**3D is allowed to be ambitious, but it must never degrade scrolling, input latency, responsiveness, or mobile usability.**

핵심 대상은 Album Package이며, 다른 3D도 품질 기준을 통과하는 경우에만 사용한다.

기존 3D 구현은 reference implementation과 logic donor로 사용하되 monolith를 그대로 복사하지 않는다.

관련 production 3D 이전에 **BLENDER CAPABILITY SPIKE — REQUIRED / NOT EXECUTED**를 별도 승인 단위로 수행한다. Blender 채택은 아직 미정이며 실제 bpy→.blend→GLB/render→R3F/browser→mobile 증거로 APPROVE / REVISE / REJECT를 결정한다. 상세 acceptance의 정본은 [Motion §47](03-MOTION-SYSTEM.md#blender-capability-spike), 작업 분할은 [Task Protocol](review/IMPLEMENTATION-TASK-PROTOCOL.md)이다. 성공 시 Tray/Digipak/Booklet/Disc의 Blender geometry를 적극적으로 비교하되 단순 geometry가 더 적합하면 불필요하게 Blender를 쓰지 않는다.

**Haegeum 3D — FUTURE EXPERIMENT / HIGH PRIORITY**를 장기 roadmap에 보존한다. 첫 release의 blocker는 아니며 페이지 종속 장식이 아닌 재사용 master·교육/시각 자산 후보다. 구조·11가지 활용·bowed-string 표현·master 파생물·별도 game project 경계의 정본은 [Motion §48](03-MOTION-SYSTEM.md#haegeum-3d-experiment)이다. 기존 HOME 해금 scene과 별개이며 launch 후에도 삭제하지 않는다. P0F에서는 두 항목 모두 문서만 기록한다.

---

# 27. 3D MODULARIZATION

기존 대형 3D component를 V2에 monolith로 옮기지 않는다.

개념적 분리:

- geometry
- materials
- textures
- quality
- motion
- package
- disc
- booklet
- scene/camera/lighting

**Separation of responsibility is mandatory.**

---

# 28. ASSET POLICY

기존 `public/assets` 전체를 복사하지 않는다.

절차:

`INVENTORY → SELECT → VERIFY → OPTIMIZE → MIGRATE`

V2가 실제로 사용하는 runtime asset만 새 저장소에 들어간다.

웹용, viewer용, download용, production master를 구분한다.

실제 자산을 우선하되 적합한 원본이 없으면 AI-generated / temporary editorial 자산을 prototype 또는 production candidate로 사용할 수 있다. `provisional / approved / replace-required`를 명시하고 후보와 공개 승인 상태를 혼동하지 않는다. 진위가 중요한 portrait·identity·공연 기록·사실 archive는 실제 자료를 우선하며 생성 이미지를 documentary로 오인시키지 않는다. 추상 배경·분위기·texture·conceptual editorial·장식 보조 이미지는 생성 후보를 적극 허용한다. 가장 작은 asset reference 계약과 교체/승인 기준의 정본은 [Content Schema Contract — Asset Lifecycle Policy](review/CONTENT-SCHEMA-CONTRACT.md#asset-lifecycle-policy)다. 더 좋은 원본 요청은 §38을 따른다.

---

# 29. REPOSITORY SIZE POLICY

V2 저장소를 제작 원본 창고로 사용하지 않는다.

포함:
- application code
- documentation
- runtime web assets
- 필요한 소형 public downloads

가능하면 제외:
- 대형 인쇄 master
- 중복 PDF
- 디자인 source
- 후보 시안
- 사용하지 않는 이미지
- 임시 생성 파일

대용량 음원/자료는 object storage/CDN을 우선 검토한다.

---

# 30. RESPONSIVE PHILOSOPHY

Mobile은 Desktop 축소판이 아니다.

Desktop interaction을 Mobile에서 재해석한다.

예:
- desktop drag → mobile swipe
- desktop hover → mobile tap
- desktop custom cursor → remove
- desktop high-quality 3D → optimized 3D / fallback

---

# 31. PERFORMANCE PHILOSOPHY

**보기에는 복잡하지만 구현은 가능한 한 단순하게.**

기술 선택 우선순위:

CSS → Image → Video → WebGL/3D

단, 더 복잡한 기술이 명확한 시각적·경험적 가치를 제공하면 사용한다.

---

# 32. ACCESSIBILITY

기본 요구사항:

- Semantic HTML
- Keyboard navigation
- Visible focus state
- Alt text
- ARIA where necessary
- Reduced motion
- Proper contrast
- Touch target size
- Browser back/forward
- Screen-reader compatible navigation

Hover 또는 drag만으로 핵심 콘텐츠 접근이 결정되어서는 안 된다.

---

# 33. CODEX DEVELOPMENT PRINCIPLE

**This repository is a completely new implementation of the Cho Youn Kyoung website.**

The existing `cho-youn-kyoung` project is a reference, content source, asset source, and technical knowledge source only.

Reuse verified factual content and approved runtime assets where appropriate.

Do not copy the existing CSS architecture, page layouts, visual component structure, HashRouter architecture, work-specific patches, or legacy visual hierarchy unless explicitly approved.

Do not redesign the legacy project in place.

Do not migrate a file merely because it already exists.

All implementation decisions must follow:

1. `00-MASTER-PLAN.md`
2. the relevant phase specification
3. the current task instruction

The user's latest explicit decisions take precedence when they revise this baseline. Record and reconcile such revisions; a planning approval is not implementation authorization.

If a task conflicts with the Master Plan, identify the conflict instead of silently introducing a workaround.

**Do not introduce temporary visual hacks merely to match a screenshot.**

---

# 34. CODEX CONTEXT RULE

Repository documentation is canonical; chat history/model memory is not project source of truth.
Start with [root AGENTS](../../AGENTS.md), [HANDOFF](../../CODEX-HANDOFF.md), this MASTER, relevant specs,
then the active plan/result/protocol. Read relevant current owners rather than all specs every time.
AGENTS is the operating map; HANDOFF §26 owns current status; README owns human setup; Task Protocol
owns CI/delivery/STOP. Results/Revision Log preserve scoped history and do not silently supersede contracts.

Major tasks must follow:

`MASTER PLAN + PHASE SPEC + CURRENT TASK`

Codex must not receive isolated implementation tasks without project context.

---

# 35. DEVELOPMENT ROADMAP — CANONICAL PHASE 0–14

**The only current canonical roadmap is PHASE 0–14.** The former 0–12 roadmap is historical and superseded; its feature requirements remain in the corresponding specifications.

## PHASE 0 — FOUNDATION
Bounded project/base setup, routing/deployment spike, direct URL/refresh/404 checks, KO/EN route validation, deployment workflow, AGENTS/document wiring. React Router + Static Prerender passed the real Pages P0C gate and is APPROVED; P0D established the neutral locale/metadata contract and P0E verified its CI/live integration. P0F documentation is approved as canonical; actual translations and launch SEO remain separately scoped.

## PHASE 1 — CONTENT / DATA FOUNDATION
Schemas, verified factual content, permanent IDs, translations, asset manifest and URL policy. P1A neutral schema/route adapter is locally verified; [Content Schema Contract](review/CONTENT-SCHEMA-CONTRACT.md) owns additions. Actual migration/template integration remain separate tasks.

## PHASE 2 — DESIGN SYSTEM
Typography, palette including accessible muted text, grid, spacing, layout, imagery, responsive tokens.

## PHASE 3 — MOTION SYSTEM
Shared input/motion/transition rules, audio capability spike, required Blender Capability Spike before relevant 3D production, mandatory 3D Lab and Tray Lab, subsystem freezes and quality protocol. Haegeum reusable 3D master remains a high-priority long-term experiment, not a launch blocker; no automatic execution or added phase.

## PHASE 4 — HOME
Eight scenes and their transitions, implemented one bounded scene or boundary at a time.

## PHASE 5 — WORKS
Dual Portal, editorial grid, factual chronological index, filtering and accessible exploration.

## PHASE 6 — ALBUMS
SANJO/JEONGAK exhibition, production-source pre-renders and quality-gated handoff.

## PHASE 7 — ALBUM DETAIL
Hybrid package/reader/player, mandatory Tray Lab gate, same-route audio persistence and route-exit termination.

## PHASE 8 — PERFORMANCES
Cinematic timeline, Upcoming/Archive, visualMode, desktop Stage Window and mobile inline archive.

## PHASE 9 — PERFORMANCE DETAIL
Common semantic content, controlled visual variant, Program/Cast/Archive/Related.

## PHASE 10 — ABOUT / MEDIA / CONTACT
Separate bounded tasks per page; independent ABOUT Delight, poster-first media/Press, direct contact.

## PHASE 11 — RESPONSIVE REFINEMENT
Cross-page real-device refinement; mobile design/testing begins earlier in each phase.

## PHASE 12 — PERFORMANCE OPTIMIZATION
Loading, input, frame stability, GPU lifecycle, adaptive quality and sustained mobile use.

## PHASE 13 — ACCESSIBILITY
Keyboard, focus, reduced motion, contrast, reader/media alternatives and assistive-technology checks.

## PHASE 14 — MIGRATION / QA
Integrated QA, content/SEO/link verification, controlled production cutover, rollback and post-launch checks.

A phase is a planning group, not permission to implement all of its work in one run.
The bounded-task contract in §43 and [Implementation Task Protocol](review/IMPLEMENTATION-TASK-PROTOCOL.md) is mandatory.
---

# 36. INTERNATIONALIZATION (I18N) — APPROVED

V2는 Korean / English 두 언어를 공식 지원한다.

Routing strategy:

```text
Korean default:
/
/works
/albums
/performances
/album/:id
/performance/:id
/media
/about
/contact

English:
/en
/en/works
/en/albums
/en/performances
/en/album/:id
/en/performance/:id
/en/media
/en/about
/en/contact
```

**Do not implement language switching as client-side state on a single URL only.**

Each language must have a shareable, crawlable URL.

Korean is the default language and does not use a `/ko/` prefix.

English content must be intentionally authored and reviewed. Do not depend on automatic translation for official artist content, work titles, program notes, credits, or Korean traditional music terminology.

SEO implementation must include appropriate language metadata, canonical handling, and `hreflang` where applicable.

P0D implements the [KO/EN routing and metadata contract](review/LOCALE-METADATA-CONTRACT.md) in 18 neutral fixtures. Both bases passed static/hydrated lang, self-canonical and reciprocal ko/en/x-default checks. x-default is the same Korean content URL. Missing English stays on that Korean content with unavailable state; never HOME or a fabricated English page. Actual authored translations and final SEO copy remain future work.

The language switcher should be integrated into the editorial navigation system rather than rendered as a generic boxed control.

---

# 37. EASTER EGG / DELIGHT LAYER — APPROVED

V2 includes a small, non-intrusive delight layer.

The Easter Eggs must never compete with the artist, interrupt navigation, or become promotional clutter.

Approved direction:

1. **Sou.P Secret**
   - Preserve a discreet creative credit for Sou.P only in HOME Outro / Footer as the creator signature.
   - Do not repeat the Sou.P Easter Egg on ABOUT or distribute it across page footers.
   - Desktop: hover-based discovery may reveal a personal message after a deliberate dwell.
   - Mobile: first tap opens/reveals the credit; a second tap on `Sou.P` reveals the hidden personal message.
   - The exact desktop dwell duration must be tested during interaction prototyping rather than hard-coded from the legacy site without review.

2. **Haegeum Secret**
   - A subtle hidden interaction connected to the instrument, string, bow, vibration, or sound.
   - Any audio must require explicit user input. No surprise autoplay.

3. **Album Secret**
   - A subtle discovery inside album exploration or the 3D package experience.
   - It must not increase 3D fragility or compromise performance.

4. **ABOUT Delight**
   - A separate small authored detail: portrait hidden annotation, short personal copy, or subtle line response.
   - Do not reuse Sou.P here.
   - It remains optional for visitors and independent of the HOME creator signature.

General rules:

- Easter Eggs are optional discoveries, never required to access content.
- They must work without harming keyboard, touch, or reduced-motion experiences.
- They should feel like authored details, not developer jokes.
- Do not advertise the Easter Eggs prominently.
- The approved scope is the Sou.P, Haegeum, Album, and separate ABOUT discoveries above. Keep each restrained; do not add further discoveries without explicit approval.

---

# 38. ASSET REQUIREMENT RULE — APPROVED

Do not lower the intended design quality simply because a required asset does not currently exist.

Planning and prototyping may proceed with the best available assets, but missing or suboptimal assets must be explicitly identified whenever better material would materially improve:

- visual quality
- interaction quality
- accuracy
- responsive composition
- 3D fidelity
- editorial storytelling
- accessibility
- localization
- production credibility

ChatGPT must proactively request needed material from the user rather than silently designing around the limitation.

Examples include:

- additional portrait crops
- instrument macro/detail photography
- performance photography
- poster/leaflet masters
- album front/back/spine references
- higher-resolution artwork
- video clips
- verified Korean/English copy
- official credits
- mobile-specific source images
- 3D measurement/reference photography

Each phase specification should include an **Asset Requirements** section whenever relevant.

For every requested asset, communicate clearly to the user in Korean:

1. whether the current work can continue without it,
2. why the asset would improve the result,
3. what exact shot/file/content is needed,
4. whether it is required or optional,
5. when it will become blocking if not supplied.

**Do not ask for assets merely because more assets are available. Request them only when they improve quality, accuracy, or implementation confidence.**

---

# 39. LEGACY NON-INHERITANCE RULE — APPROVED

V2 is a new website, not a visual reskin of the legacy site.

Legacy material may be used only after a deliberate fit review.

**Do not reuse a legacy background, decorative image, visual asset, layout, animation value, camera value, lighting value, 3D presentation, or page composition merely because it already exists.**

Before reusing any legacy visual or 3D material, review it against:

- current V2 art direction
- visual coherence
- quality
- responsive suitability
- architectural compatibility
- performance impact
- maintainability
- interaction continuity

If the legacy material does not fit the new design, create, generate, photograph, or request a better asset instead of forcing the old material into V2.

Legacy reuse is encouraged only for material that remains genuinely valuable, such as:

- verified factual content
- approved original artwork
- authentic photography that fits the new art direction
- performance/archive material
- audio/video source material
- physical measurements and geometry references
- technical lessons and proven algorithms
- reusable logic after architecture review

Legacy 3D must receive especially strict review.

**A working legacy 3D implementation is not automatically a valid V2 implementation.**

Reuse only if its geometry, motion model, camera system, lighting, materials, lifecycle, mobile behavior, performance strategy, and transition model fit the V2 experience. Otherwise, rebuild the relevant subsystem.

---

# 40. MOBILE PRIMARY POLICY — APPROVED

V2 is not a desktop-first website with a reduced mobile fallback.

**Mobile and Desktop must be designed as equal first-class experiences, with mobile receiving higher practical QA priority because it is likely to be the first point of entry for many visitors.**

Key rules:

- Mobile is recomposed, not scaled down.
- Mobile must preserve the visual ambition of V2.
- Large typography remains important on mobile.
- Mobile-specific crops and source assets are allowed and should be requested when they improve quality.
- Pointer-based effects are replaced with touch/scroll-native equivalents.
- Vertical scrolling has priority over drag/rotate gestures.
- 3D must be tested on real mobile devices during development, not only after desktop completion.
- Mobile 3D may use adaptive quality or static fallback, but the fallback must still look intentionally designed.
- A mobile experience that visibly stutters, overheats, blocks scrolling, or feels secondary is not acceptable.
- Responsive design decisions must be validated on real hardware where practical.

Final mobile acceptance question:

**Does the first-time mobile visitor also think, “와, 정말 잘 만들었다”?**

If not, the responsive work is not complete.

---

# 41. IMPLEMENTATION PRIORITY

1. Artistic intent
2. Usability
3. Performance
4. Accessibility
5. Maintainability
6. Technical novelty

Technical novelty alone is never sufficient justification.

---

# 42. FINAL PRINCIPLE

**Does this make Cho Youn Kyoung's music and work feel stronger?**

YES라면 발전시킨다.  
NO라면 아무리 멋진 기술이라도 사용하지 않는다.

---

# 43. IMPLEMENTATION CHUNKING / STOP RULE — MANDATORY

PLAN → SUBTASK A → SUBTASK B → SUBTASK C if tightly related → FULL VALIDATION → REPORT → STOP → USER APPROVAL.

2026-09-06 사용자 승인: 기존 작은 단위보다 약 2.5–3배 큰 bounded task를 허용한다. 한 목표/owner 안에서
강하게 연관된 2–3개 subtask를 묶어 약 60–90분 안에 검증 가능한 결과를 목표로 한다. 시간은 분량 기준이며
억지로 채우거나 검증을 생략할 마감이 아니다. 승인된 bundle 내부 A/B/C 사이에는 별도 승인을 다시 요구하지 않는다.
PLAN에 subtask 순서·파일 범위·입력·전체 검증·rollback을 제시하고, bundle 완료 후 보고/STOP/다음 승인 경계를 지킨다.
다른 subsystem 또는 시각 디자인/3D/콘텐츠 migration을 무리하게 섞지 않는다. 기존 작은 작업 큐는 bundle 설계의 재료이며,
서로 다른 3D owner의 freeze/품질 gate를 합치거나 생략하는 근거가 아니다.

Never execute multiple phases, the entire HOME, multiple pages, or several 3D subsystems in one automatic implementation run. Never continue for hours without review. Each task has one clear goal, limited impact, explainable file scope, immediate validation and a simple rollback/checkpoint. If validation fails, fix only within the approved scope or stop and report the blocker; do not expand into another subsystem.

FULL VALIDATION은 bundle에 필요한 전체 검증이며 기존 Fast/Full/배포 gate도 적용한다.
사용자가 결과 항목을 지정하면 그 형식을 따르고, 별도 지정이 없으면 다음 7항목을 보고한다:
1. What was changed
2. Files changed
3. Tests performed (distinguish passed, failed and not run)
4. Result
5. Known issues
6. Screenshots / preview location if applicable
7. Recommended next task

Then STOP and wait for explicit user approval. A recommended next task is not authorized.
Use [Implementation Task Protocol](review/IMPLEMENTATION-TASK-PROTOCOL.md) for P0A–F and smaller 3D units.
Quality and reviewability are more important than implementation speed.

# 44. ALBUM AUDIO SCOPE — APPROVED

Playback persists only within the same Album Detail route: Tracks, Booklet Reader, Credits, editorial scrolling and internal 3D/DOM transitions. A route-scoped Persistent Mini Player remains accessible.

Navigating to another route ends playback, including another album, HOME, WORKS, MEDIA or ABOUT. An optional short fade-out must not delay navigation or leave audio running on the destination. Returning never autoplays. A locale pathname change also counts as a different route; in-page anchors/reader state do not.

Do not implement a site-wide global audio player. Route-local audio state must outlive internal view switches but be stopped/released on route exit.

No real playable source means unavailable / disabled / coming soon, with truthful controls. Never inherit the legacy silent preview clock or pretend playback.

Mobile volume remains a requirement. Verify real programmatic control in P0 or the Audio spike. When unsupported, report capability-based UX/fallback and constraints; do not force a workaround or show an ineffective slider.

# 45. ROUTING / DEPLOYMENT SPIKE GATE — APPROVED

React Router Framework + ssr:false + explicit static prerender is APPROVED after the user-authorized P0C architecture gate. Actual Project Pages passed all 13 requested KO/EN fixture routes, direct/hard refresh, navigation/history, JS-off HTML, metadata/lang, real HTTP 404 and deployed asset hashes/MIME. Root-mode build/hosting was verified locally and root build runs in CI.

See [review/ROUTING-ARCHITECTURE-DECISION.md](review/ROUTING-ARCHITECTURE-DECISION.md) for the final decision and file-placement contract. The architectural decision does not mark full KO/EN content, final SEO or production-domain migration complete. P0D verified reciprocal hreflang and metadata locally; P0E subsequently passed 80 both-base browser cases and 52 actual Pages cases on ea146f6. See [P0E result](../../P0E-RESULT.md) for historical deployment identity and evidence; P0F does not redeploy. Every future public route and slug still requires static HTML and its locale/metadata contract; these remain release gates.

Actual user-approved sequence: P0B local spike, P0C real Pages/CI and architecture decision, P0D locale contract, P0E CI/delivery, then P0F documentation wiring only. P0E Fast/Full and explicit approved-SHA deployment remain the current contract. Root-mode testing must not change the operating custom domain during P0. Actual domain/HTTPS cutover is P14.

Do not fall back to HashRouter. P0A–E, P0F and P1A lifecycle/delivery completed under separate approvals.
P1B audit was delivered; P1C/P1D are approved and delivered through main 2b544d6 with successful Fast CI.
P2A visual result and delivery were approved; main 7714907 and Fast CI 34004955387 succeeded.
The user visually approved P2B Bold as the canonical production direction: QUALITY APPROVED FOR HERO INTEGRATION / FROZEN. See HANDOFF and P2B-FREEZE-RESULT. Refined is archived Lab/evidence only; Safari real-device and final HOME composition QA remain open. Motion §1 owns the user clarification: meaningful motion may be bold and experimental. WORKS/PERFORMANCES and shared-image directions are documented only; no next-page implementation is authorized.
The user corrected initial navigation to artist name + MENU, canceling the initial-link scroll morph. Final Hero/header behavior is deferred to P2C.
No HOME Hero, P2C, public record release, Blender/3D or deployment is authorized by the navigation bundle.
