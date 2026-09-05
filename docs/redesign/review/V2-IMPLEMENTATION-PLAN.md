# Cho Youn Kyoung Website V2 — 검토 및 구현 제안

검토일: 2026-09-06 · Revision 1.10 · 상태: **P1C 결과 승인 / 확대된 bounded bundle 정책 승인 / P1D private KO draft integration REVIEW READY**. HOME V2.1 및 P0 routing/locale/CI 계약은 유지한다. 현재 결과·승인 경계는 [HANDOFF](../../../CODEX-HANDOFF.md)를 따른다.

현재 정본은 갱신된 MASTER의 PHASE 0–14다. React Router + Static Prerender는 사용자가 지정한 P0C 실제 Pages gate 통과로 확정했다. P0D neutral locale/hreflang 계약은 두 base에서 통과했고 실제 번역·제품 구현과 운영 SEO는 별도 gate다. 이 문서는 실제 구현 승인이 아니다.

## 1. Understanding Summary

V2는 조윤경의 음악을 경험하는 Digital Artist Archive이자 공식 정보 사이트다. 기존 프로젝트를 고치는 것이 아니라 새로운 프런트엔드를 만든다. 검증된 사실·원본 작품·진짜 기록·유용한 알고리즘만 개별 심사를 거쳐 사용한다.

아트 디렉션은 Contemporary Editorial / Ivory. LINE, SPACE, RESONANCE를 자연스러운 스크롤과 물리적 입력 반응으로 연결한다. 영문 디스플레이 Cormorant Garamond, 한글 디스플레이 Noto Serif KR, 본문 Noto Sans KR를 유지한다. 작품 원색은 보존하고 UI 색은 절제한다.

| 공간 | 역할과 핵심 경험 |
|---|---|
| HOME | Artist → Instrument → Sound → Works → Album Object → Stage → Artist Reveal → Name의 8장면. 강약과 7개 장면 경계를 함께 설계 |
| WORKS | 비대칭 Album/Performance 입구 + Editorial Grid + 정확한 시간순 Index |
| ALBUMS | SANJO/JEONGAK 두 장으로 구성된 물성 있는 전시. 승인된 3D 원천으로 만든 정지 렌더 중심 |
| ALBUM DETAIL | 닫힌 패키지 → 명시적 OPEN → Booklet/CD → DOM Reader/Player → Story/Tracks/Booklet/Credits/Related |
| PERFORMANCES | Upcoming/Archive를 한 페이지에서 탐색. Desktop Stage Window, Mobile Inline Timeline |
| PERFORMANCE DETAIL | 공통 의미 구조 + 통제된 시각 변형. Artist Note/Program/Cast/Archive/Related |
| ABOUT / MEDIA / CONTACT | 읽기 좋은 Biography/CV, Poster-first 영상·Press, Mailto/Copy Email 중심 연락 |

모바일은 독립 구성과 실기기 검증 우선이다. 3D는 핵심 경험이지만 정보 접근의 관문이 되어서는 안 된다. Functional Complete와 Quality Approved를 구분한다.

초기 작업에서 15개 기획 문서를 `docs/redesign/`, HANDOFF를 루트에 배치했다. 이번 사용자 승인에 따라 필요한 기획 원문과 HANDOFF를 갱신했으며 역사적 원본은 ZIP에 보존한다. 변경 내역은 [Planning Revision Log](PLANNING-REVISION-LOG.md)에 기록한다. 이 초기 문서 작업 이후 개별 승인된 P0A–C에서 기반 코드·의존성·V2 저장소·실제 Pages 배포를 완료했다. 최신 근거는 [Architecture Decision](ROUTING-ARCHITECTURE-DECISION.md)과 [P0C 결과](../../../P0C-RESULT.md)에 있다.

## 2. Document Consistency Audit

기획 00–14와 HANDOFF를 대조하고, 사용자 수정 1–9를 관련 원문에 반영했다. **[HANDOFF 전수 감사](HANDOFF-AUDIT.md)는 현재 207개 체크박스(기존 187 + 이번 승인 계약 20)를 각각 대조한다.**

현재 커버리지: **Covered 205 / Ambiguous 2 / Missing 0 / Conflict 0**. 당시 Ambiguous 2개는 같은 visualMode/variant 명명이었다. P1A 사용자 확인으로 해결했다. 기존 수치는 역사적 감사 baseline이며 제품 품질 승인으로 확장하지 않는다. Covered는 문서 반영 상태이며 구현·시험 완료가 아니다.

### 이전 이슈의 최종 처리

| ID | 현재 상태 | 근거 및 반영 |
|---|---|---|
| C1 | Resolved / Covered | MASTER §35와 HANDOFF §21을 PHASE 0–14 정본으로 갱신. 0–12는 ZIP의 과거 계획 |
| C2 | Resolved / Covered | MASTER §43, 03 §20, 07 §13–14·44, HANDOFF: 별도 Tray Lab 필수. perceptual CD plastic gate 통과 전 package Quality Approved 금지 |
| A1 | Resolved — P1A user clarification | visualMode = photo/poster/video-still/editorial/typography; *-led는 설명 대응, sanjo/jeongak은 musical category. Content Schema Contract 참조 |
| A2 | Resolved / Covered | MASTER §37, 02 §26, 03 §40, 04 §18, 10 §11: Sou.P는 HOME Outro/Footer만, ABOUT는 별도 작은 Delight |
| A3 | Resolved / Covered | MASTER §44, 07 §21·30: 같은 Album Detail 내부만 유지, 다른 route로 이동 시 종료. global player 금지 |
| A4 | Contract Covered / capability NOT TESTED | 07 §26·31, 11/12/13/14: 모바일 volume 요구 유지. P0 또는 Audio spike 후 capability UX/fallback 보고, 억지 우회 금지 |
| A5 | Open input — P2/P3 자산 승인 전 | 승인 시안/지정 사진/트레이 참조의 정확한 파일은 아직 미확인. P0A skeleton 차단 사유는 아님 |
| A6 | Interpretation documented | 예술 의도는 목적, 사용성/접근성/성능은 품질 gate로 적용. 기능을 제거하는 승인으로 해석하지 않음 |
| A7 | Resolved / calculated | 02 §3에 #6D6962 accessible muted text 추가. Canvas 4.8024:1 / Surface 5.1429:1. #77736C의 적절한 장식/큰 글자 용도 보존 |
| R1 | APPROVED — P0C real-host gate passed | React Router Framework + static prerender + 검증된 파일 배치. 실제 Pages/CI와 root build 증명; neutral locale/hreflang는 P0D 로컬 검증 완료 |
| R2 | Covered | 실제 playable source가 없으면 unavailable/disabled/coming soon. legacy silent clock 및 false playing 금지 |
| R3 | Covered | MASTER §43, HANDOFF §25, Task Protocol에 1개 작업→검증→7항목 보고→STOP→명시 승인 계약 반영 |

대비 계산은 불투명 sRGB 선형 luminance 공식으로 수행했으며 일반 텍스트 4.5:1 이상 기준을 적용했다. 실제 화면의 배경/투명도/상태는 구현 때 재확인한다. [W3C Contrast Minimum](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)

### 초기 누락 요구의 보완 상태 — 정책은 기록, 실제 시험은 미실시

| ID | 판정 | 누락 | 계획에 보완할 내용 / 결정 시점 |
|---|---|---|---|
| M1 | Architecture APPROVED / locale release gate pending | Pages clean URL·응답 코드·SEO 출력 계약 | P0C 요청 13 route와 HTTP/HTML/metadata gate 통과. 전체 EN/hreflang fixture는 P0D 로컬 검증 완료; 실제 SEO 콘텐츠/번역은 후속 검증 |
| M2 | Covered in plan / execution pending | 번역 미완료/미확정 콘텐츠 공개 정책 | KO/EN 검토 상태 분리, 최종 EN 미완료면 출시 게이트 보류. P1 |
| M3 | Covered in plan / execution pending | 정량 성능 예산, 측정 조건, 승인 담당 | §11의 잠정 예산을 P0–3 실험으로 확정. P12까지 미루지 않음 |
| M4 | Covered / test pending | 오디오·영상·HOME sample 소유권 및 오류 | route-local owner, same-route 유지와 route-exit 종료, truthful source states, CORS/volume spike. P3 |
| M5 | Covered in plan / execution pending | 중단·연속 클릭·뒤로가기·화면회전·context loss의 3D 전이 규칙 | 스냅샷 전달, 중단 정책, gesture cancel, fallback. P3 Lab |
| M6 | Covered in plan / execution pending | 이미지형 북클릿/포스터의 동등 텍스트와 구체적 접근성 목표 | WCAG 2.2 AA 목표, 검토된 텍스트/대본/자막 현황, zoom/reader focus. P1·P7 |
| M7 | Covered in plan / execution pending | 출처/웹 공개권한/제작 원본과 런타임 분리의 필드 및 관리 책임 | Asset manifest와 사용자 승인 상태. private 자료는 public repo 제외. P1 |
| M8 | Covered in plan / execution pending | 이전 공개 파일 URL·별칭과 전체 링크 호환 목록 | hash 상세 외 legacy /performance 별칭 및 공개 PDF/이미지 링크 목록. P1·P14 |
| M9 | Covered in plan / execution pending | 정적 사이트의 Upcoming 날짜 경과 처리 | 날짜 정밀도/timezone/status와 재빌드 운영 규칙. P1·P8 |
| M10 | Covered in plan / execution pending | preview 검색 노출, 도메인 인계 순서, 지속 preview 운영 | noindex, production metadata 분리, Pages 소유권·HTTPS 확인, rollback artifact. P0·P14 |
| M11 | Covered in plan / execution pending | 필터/스크롤/뷰어 상태의 URL·히스토리 계약 | 필터 query와 back 복원, reader overlay의 back/close, locale 이동 시 동등 위치. P3·P5·P7 |

HOME Scene 02 영문 키워드와 KO 기본 route는 충돌하지 않는다. 시각적 키워드의 언어 규칙이며, 필요한 한국어 접근성 설명은 별도로 제공한다. WORKS 최신순과 ALBUMS 음악별 묶음 역시 페이지 목적이 달라 양립한다. Ivory와 제한적인 Dark Stage도 승인된 관계다.

초기 충돌·누락 보고 후 사용자가 전체 방향과 수정 1–9를 확정했다. 요청된 정책 충돌은 해소했다. 미완료 spike/자료/세부 schema는 담당 bounded task에 남기며 실제 통과로 표기하지 않는다. 계획 승인을 구현 자동 실행 승인으로 확대하지 않는다.

## 3. Legacy Reuse / Rewrite / Discard Matrix

읽기 전용으로 `C:\cho-youn-kyoung`를 확인했다. remote는 `https://github.com/cij5484/cho-youn-kyoung.git`, branch는 `main`, HEAD는 `239d18056d8b3df2cf9a5fd5509f897f85ed70ad`, 작업 트리는 깨끗했다. 원격 fetch나 운영 배포 상태 확인은 하지 않았으므로 이것은 **현재 로컬 snapshot**의 근거다.

`src/App.tsx`에서 HashRouter와 `/performance` 별칭, `PerformanceDetailPage.tsx`에서 ID별 전용 페이지 분기를 직접 확인했다. 앨범 데이터에는 4개 기존 slug, 2026년 3작의 `coming-soon` 상태, 외부 R2 음원 URL이 있다. 이는 현재 사실로 승인된 발매 상태라는 뜻이 아니다.

| 분류 | 대상 | V2 판단 및 통과 조건 |
|---|---|---|
| migrate | albums/performances/profile/media/press/site의 사실 필드 | 출처·최신성·KO/EN·공개 승인을 확인하여 새 schema에 이동 |
| migrate | 4개 album slug와 performance slug | 영구 ID 우선 보존. 이름 번역으로 slug 변경 금지. 변경은 alias map 필수 |
| migrate | 승인 원화, 사진, booklet, poster/leaflet, 음원/YouTube/Press URL | 개별 inventory 및 품질/공개 범위 검토 후 선별 |
| reuse 후보 | 날짜·정렬·인접 작품 탐색 유틸 | DOM/legacy theme 결합 제거 가능 여부와 경계 조건 시험 |
| reuse 후보 | packageGeometry.ts | 단위·좌표·치수·중심·UV·allocation 검토. 현재 파일의 존재만 확인했으며 알고리즘 승인 전 |
| reuse 후보 | discMotion.ts / packageFade.ts / packageProfile.ts | 순수 계산/치수 지식만 후보. 상태 초기화·camera/scale 패치가 섞이면 해당 부분 rewrite |
| rewrite, 순수 로직만 후보 | renderPolicy.ts / preloadAlbumDetail.ts | V2 캐시 소유권·취소·quality·build 환경에 맞게 설계 |
| rewrite | useAlbumAudio.ts | 기존 unmount pause와 소스 없는 silent preview clock 확인. 같은 Album Detail 내부 유지·route 이탈 종료·mute 복원·실제 오류 상태·Web Audio 경계를 새로 구현. 가짜 playing/time 동작 discard |
| rewrite | PackageMaterials 및 package/detail scene | material pipeline·조명·정지 렌더 매칭·GPU lifecycle부터 V2에서 검증 |
| rewrite | Header/Home/Works/Album Detail/Performance Detail/About/Media/Contact | 새 DOM, 새 CSS cascade, 새 구성. legacy 시각 구조를 기초로 삼지 않음 |
| reuse 개념 / rewrite 파일 | Actions→Pages 배포 | 아이디어만 사용. 새 lockfile 기반 설치, preview base, prerender 산출물, 배포 권한·환경 계약 적용 |
| reuse 시험 의도 | 음원/모션/render-policy/접근성 시험 | V2 계약에 대한 독립 assertion으로 다시 작성. legacy 통과 기록을 V2 검증으로 취급하지 않음 |
| discard | HashRouter / global CSS / per-ID page branching / homeHeroSlides rotating architecture | 새 구조에 이식하지 않음 |
| discard 기본 | 과거 배경, scene composition, camera/light/motion 값, 3D monolith | V2 fit review 없이 사용 금지. 재사용 요청이 있으면 개별 근거 필요 |
| discard | 미사용 binary, 중복 master, 과거 시안, 임시 파일 | V2 런타임 repo 제외. legacy 원본을 삭제한다는 의미 아님 |

패키지 버전의 `latest` 사용도 그대로 복사하지 않는다. 새 구현 승인 후 React/R3F/Three/Router의 호환 버전을 확인해 lockfile로 고정한다. 이번에는 npm을 실행하지 않았다.

## 4. Proposed V2 Architecture

**확정 기반: React + TypeScript + Vite + React Router Framework Mode static prerender + 클라이언트 상호작용.** 최신 사용자 승인에 따른 P0C 실제 Pages gate를 통과해 APPROVE로 판정했다. 명시적 slug 열거, 파일 배치 검사, 실제 404와 배포 SHA/hash 확인을 유지한다. P0D neutral KO/EN·hreflang·metadata 계약은 로컬 통과했고 실제 번역·최종 SEO는 별도 완료 기준이다. 운영 Node 서버/API는 기본 범위에 필요하지 않으며, 실제 콘텐츠와 browser-only 3D 경계는 해당 후속 gate에서 검증한다.

일반 SPA보다 초기 구조가 조금 늘지만, 공개 작품 수가 작고 clean URL·언어별 검색·공유가 중요하므로 build-time 출력이 적합하다. React Router의 `ssr:false`와 prerender는 정적 배포를 지원한다. 동적 slug는 콘텐츠에서 명시적으로 열거해야 한다. [React Router 공식 문서](https://reactrouter.com/how-to/pre-rendering)

| 경계 | 책임 |
|---|---|
| Content | 작품/인물/프로그램/크레딧/번역. UI나 3D 값 없음 |
| Assets | 파일 위치·crop·해상도·색공간·대체 텍스트·공개권한·렌더 preset ID |
| Presentation | selected/featured/visualMode/통제된 layout variant. 사실 복제 없음 |
| App shell | route, locale, navigation, focus/scroll, modal layer. global persistent audio owner 없음 |
| Features | 작품 탐색/Reader/Audio/Video/3D. Album Detail route가 내부 세션/mini player를 소유하고 이탈 시 종료 |
| Rendering | 정적 HTML/이미지 기본 상태 + hydration 이후 CSS/WAAPI/3D 강화 |

제안 폴더 구조이며 **아래 앱 폴더/파일은 아직 생성하지 않는다.**

```text
C:\choyounkyoung-v2\
  CODEX-HANDOFF.md
  docs/redesign/                 원본 00–14 + review 결과
  app/
    config/                     deployment, route, locale 정책
    routes/                     page route와 metadata/loader
    content/                    schemas, albums, performances, people, copy
    assets/                     manifest, crop/rights/preset 참조
    presentation/               curation, visualMode, 제한된 variants
    components/                 typography, navigation, 공통 제어
    features/
      home/ works/ albums/ performances/
      audio/ media/ reader/ motion/
      album3d/
        geometry/ materials/ textures/ scene/
        interaction/ motion/ quality/ lifecycle/ presets/
    styles/                     tokens, reset, base, utilities + CSS Modules
  public/assets/                승인된 runtime 자산만
  public/downloads/             승인된 소형 공개 파일만
  scripts/                      schema, route/asset 검증, 정지 렌더 생성
  tests/                        unit, behavior, routes, visual
  .github/workflows/            확인용 CI와 Pages 배포
```

| 의존성 제안 | 용도 / 선택 시점 |
|---|---|
| React/React DOM/TypeScript/Vite/React Router | P0 기반. 버전·Node 요구 사항은 시작 시 공식 호환성 확인 |
| Three.js / @react-three/fiber | P3 Lab부터 지연 로드. 페이지 기본 bundle 분리 |
| Zod 또는 동등한 schema validator | P1 빌드 시 데이터·참조 검증. 브라우저에 불필요한 validator 포함하지 않음 |
| CSS Modules + CSS tokens | 글로벌 cascade 최소화. 레거시 global stylesheet 제외 |
| Cormorant/Noto font packages 또는 허용된 self-host source | P2 서브셋·weight·라이선스 확인. 세 계열 유지 |
| Vitest / Testing Library / Playwright / axe | 해당 단계에서 유의미한 계약·동작·라우팅·접근성 확인 |
| Sharp 또는 동등한 이미지 도구 | build-time responsive 자산 처리. runtime 의존성 아님 |
| Web Audio / WAAPI / Pointer Events / IntersectionObserver | 브라우저 기본 API 우선 |
| Drei / XState / 추가 animation library | 자동 추가하지 않음. 도움이 되는 구체적 부족점이 입증될 때 선택 |

3D 상태 전이는 명시적 typed state machine으로 설계하되 외부 state-machine 라이브러리 사용 자체를 필수로 하지 않는다. CMS/DB/로그인/문의 서버/스크롤 라이브러리는 초기 범위에 추가하지 않는다.

## 5. Routing / GitHub Pages Strategy

| 배포 값 | Preview | Production |
|---|---|---|
| origin | https://cij5484.github.io | https://choyounkyoung.com |
| base | /cho-youn-kyoung-v2/ | / |
| 공개 언어 | KO 기본, EN /en | 동일 |
| 검색 노출 | noindex / production sitemap 제출 제외 | 검토 완료된 콘텐츠만 index |
| custom domain | 설정하지 않음 | P14 인계 시 설정 |

확정 설계에서는 단일 deployment config가 bundler base, router basename, asset helper, prerender path, 절대 metadata URL을 생성한다. 실제 출력은 official client/를 보존하고 deterministic packager로 static/을 구성한다. 파일 내용 변경 없이 basename prefix만 정리하며 CI/실제 Pages에서 검증했다. 도메인과 base는 분리한다. CDN 절대 URL에는 base를 붙이지 않는다. CSS url, font, texture, booklet, download, audio path까지 확인한다. Vite 역시 Project Pages에는 저장소 subpath, custom domain에는 `/` base를 안내한다. [Vite 배포 문서](https://vite.dev/guide/static-deploy.html)

검증 대상 공개 route는 `/`, `/works`, `/albums`, `/performances`, `/album/:id`, `/performance/:id`, `/media`, `/about`, `/contact`와 `/en` 및 모든 `/en/...` 대응 route다. P0C 지정 13개 neutral route의 실제 정적 출력/호스팅을 검증했다. publishable 콘텐츠에서 route manifest를 생성하고 알려진 모든 route에 대응하는 directory/index.html을 배포 산출물로 제공한다. 생성기의 base와 출력 디렉터리 조합은 P0C CI/실제 Pages에서 증명한 파일 배치 계약을 따른다. P0D는 EN 전체 경로를 포함한 18개 neutral fixture를 두 base에서 완성·검증했다. 최신 [언어/metadata 계약](LOCALE-METADATA-CONTRACT.md)을 따른다.

**404 전략:** 정상 공개 route의 직접 방문은 정적 HTML로 처리하고, unknown 경로는 실제 호스트 HTTP 404로 남긴다. 생성된 SPA fallback은 배포물에서 제외하며 JS 복구로 누락된 정상 페이지를 숨기지 않는다. P0C는 GitHub 기본 404 화면을 검증했다. 향후 별도 승인된 제품 404.html도 상태 코드 404와 base-aware 복귀 경로를 유지해야 한다. `_redirects` 같은 타 호스팅 rewrite 기능을 Pages에 있다고 가정하지 않는다. [GitHub custom 404](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-custom-404-page-for-your-github-pages-site)

P0 시험은 root/subpath × KO/EN × index/detail × 직접 방문/refresh/내부 이동/back-forward이며 실제 Pages 응답 코드와 HTML metadata/canonical/hreflang도 확인한다. 최신 사용자 지시에 따라 P0C의 실제 13-route gate로 architecture를 결정했다. [Task Protocol의 전체 matrix](IMPLEMENTATION-TASK-PROTOCOL.md) 중 neutral locale/hreflang 구현은 P0D 로컬 gate를 통과했다. 실제 번역과 P0D artifact의 실제 Pages 배포/검증은 아직 수행하지 않았다. 최종 custom domain의 `/` base와 domain metadata는 격리된 root-mode 정적 테스트로 증명하고, 실제 운영 도메인/DNS/HTTPS 인계는 P14까지 수행하지 않는다. 디렉터리 URL의 trailing slash는 호스트 정규화를 따르고 canonical·sitemap은 동일 규칙을 쓴다. slash 유무 모두 루프 없이 도달해야 한다. 모든 새 작품은 route manifest와 정적 페이지 생성이 함께 성공해야 공개된다.

Legacy compatibility는 HashRouter가 아닌 작은 URL 정규화 계층이다. 기존 `/#/album/{id}`, `/#/performance/{id}`와 기존 다른 hash route를 검증된 V2 경로로 replace한다. 실제 legacy `/performance` 별칭은 `/performances`로 매핑한다. ordinary section hash는 건드리지 않는다. query·인코딩을 안전하게 보존하고 외부 URL/알 수 없는 ID를 임의 redirect하지 않는다. URL fragment는 서버에 전달되지 않으므로 hash 호환 처리는 클라이언트에서 해야 한다. 구형 hash URL의 작품별 OG를 서버가 구분할 수 없는 한계가 있으며 새 clean URL로 공유한다.

공개 HTML별 title/description/OG/canonical/lang, 승인된 KO/EN hreflang, sitemap을 생성한다. Preview에는 noindex를 넣고 production 제출용 sitemap을 노출하지 않는 안을 권장한다. robots 차단만으로 비공개가 된다고 가정하지 않는다. 빌드 승인 시 원본 본문도 정적 HTML에 있어야 한다.

개발 preview는 V2 repo의 승인된 단일 Pages 배포로 시작한다. PR마다 별도 preview URL이 자동 생성된다고 가정하지 않는다. 최종 V2 repo를 custom domain에 연결한 뒤에도 별도 preview가 필요한지는 P14 전에 정한다. 별도 호스팅을 임의 생성하지 않는다.

## 6. Data / Content Migration Strategy

순서: **inventory → 출처 대조 → schema 변환 → 참조/URL 검증 → 사용자 콘텐츠 승인 → 공개**.

P1A executable schema/neutral growth/route adapter의 정본은 [Content Schema Contract](CONTENT-SCHEMA-CONTRACT.md)다. strict TypeScript + semantic validator이며 새 dependency/CMS는 없다. 기존 route catalog/실제 page template은 바꾸지 않았다.

| 모델 | 핵심 필드 |
|---|---|
| Album | permanent id, musical category, release status/date precision, localized title/story, ordered tracks, credits, booklet/asset refs |
| Performance | permanent id, date/time/timezone, status, locale copy, venue, program, cast, archive refs |
| Person | stable id, 검토된 KO/EN 이름, role, biography, photo refs |
| Media/Press | type, title, date/year, YouTube ID/URL, poster ref, source, related work |
| Localized copy | locale, draft/reviewed/approved, source, reviewer/date, 용어집 |
| Presentation | featured rank, selected home works, visualMode, controlled size/ratio, render preset ref |

Slug 후보는 `yeongsan-hoesang-2026`, `pyeongjo-hoesang-2026`, `ji-young-hee-ryu-haegeum-sanjo-2026`, `han-beom-su-haegeum-sanjo-2020`. 제목의 로마자 표기를 고쳐도 기존 ID를 변경하지 않는다.

날짜가 연도만 있으면 임의 월일을 만들지 않는다. 정렬은 알려진 날짜/정밀도 + 안정적인 동률 규칙으로 수행하고 featured는 별도 표시한다. 예정/취소/연기/종료와 콘텐츠 공개 상태를 구분한다. 로컬 2026 앨범의 coming-soon 값은 사용자에게 최신 여부 확인이 필요하다.

정적 Upcoming은 빌드 시점 기준 날짜를 사용하되 hydration 첫 상태와 일치시킨다. 이후 실제 날짜에 따라 클라이언트에서 보정 가능하다. 검색용 HTML도 최신이어야 하므로 예정 공연 시점 이후 재빌드를 운영 절차에 넣는다. 자동 일정 실행은 필요 시 별도 결정한다.

영문은 인간 검토를 거친 공식 콘텐츠로만 완료 처리한다. P0D 계약은 ko/en authored copy와 draft/reviewed를 구분하고 authored + reviewed만 공개한다. 미완료 EN은 공개 경로·hreflang에서 제외한다. 언어 전환 요청은 동일 콘텐츠의 Korean route를 유지하고 unavailable을 반환한다. HOME 이동이나 한국어를 EN으로 위장하는 동작은 없다. 자동 번역은 production source of truth가 아니다. 이 fallback은 전체 양언어 출시 검토를 면제하지 않으며 부분 EN 출시 scope는 별도 승인이 필요하다. locale 변경은 동일 work id를 유지한다.

빌드 검증: ID 중복, dangling refs, 미정 날짜를 확정값으로 변환한 사례, 트랙 순서/길이, 공개 필수 copy, 로컬 파일 존재, 올바른 URL protocol, 언어별 route 대응, 공개 허용 상태. 외부 링크 상태는 실제 네트워크 QA에서 따로 확인한다.

## 7. Asset Migration Strategy

`INVENTORY → SELECT → VERIFY → OPTIMIZE → MIGRATE`를 수행한다. 원본 폴더 전체 복사는 하지 않는다. 각 자산은 MIGRATE/REPLACE/REGENERATE/REQUEST NEW/EXCLUDE 및 READY/WEAK/MISSING/NOT APPLICABLE을 기록한다.

Manifest에는 source path/hash, 사실 기록/편집 이미지 구분, 용도, work id, 공개 허용, credit, 치수/색공간, desktop/mobile crop, alt/동등 텍스트, runtime URL, variant, 검토자를 포함한다. 개인 메시지나 미공개 원본이 Public repo에 실수로 들어가지 않게 공개 자산만 대상으로 한다.

웹 이미지·뷰어 고해상도·공개 다운로드·제작 master를 구분한다. print PDF를 background로 쓰지 않는다. 웹 북클릿과 공개 배포용 PDF를 구분한다. 대형 음원/영상/master는 repository에 넣지 않고 현재 외부 소스의 지속 사용 적합성을 확인한다.

HOME은 측후면 Hero, 해금이 드러나는 3/4 컷, 정면 identity reveal, 별도 ABOUT 사진의 역할을 먼저 고정한 후 실제 source를 매칭한다. 해금 매크로 crop이 의도한 크기를 견디지 못하면 추가 촬영을 요청한다. 실제 공연 자료 대신 생성한 사진을 기록처럼 사용하지 않는다.

앨범 정지 렌더는 승인된 geometry/material/camera/lighting preset에서 재생성 가능해야 한다. preset version/hash, aspect, crop, texture revision을 함께 기록해 live 3D와 맞춘다. Three/GLB 버전 변경도 렌더 재승인 사유다. 기존 package screenshot을 최종 렌더로 사용하지 않는다.

이전 공개 download URL은 별도 URL inventory로 보존 또는 호환 매핑한다. Pages는 임의 서버 redirect를 제공한다고 가정하지 않는다. 중요한 동일 URL의 공개 파일을 선별 유지하거나 향후 다른 호스팅에서 redirect가 필요하다는 결정을 기록한다.

## 8. Motion Architecture

HOME V2.1 정본은 [04 HOME](../04-HOME.md)이다. Hero는 Moving Editorial Poster이며 이름/portrait/two lines/nav의 구성에서 첫 약 5초의 digital-artwork 인상을 만든다. 8-scene intensity는 5/4.5/3/4/5/2.5/2/3, rhythm은 STRONG→STRONG→QUIET→ACTIVE→PEAK→QUIET→QUIET→RESOLVE다. Scene별 vh는 04 §2의 prototype 경험 예산이며 고정 height/강제 체류가 아니다.

Hero→Haegeum은 type spacing/depth/position, portrait crop/depth, two-line guide, instrument imagery가 한 장면처럼 변형된다. HEAD/PEG→STRINGS/BOW→RESONANCE→FULL HAEGEUM에 현재 keyword만 최소 노출한다. 1.2–1.6 viewport는 Scene 02 120–160vh와 겹쳐 검토하며 추가 pin으로 합산하지 않는다. Native continuous scroll, reverse/interrupt continuity, no snap을 지킨다. Default fade-out/fade-in 교체는 금지지만 reduced-motion의 정적/crop/fade 대안은 유지한다.

SOUND는 LISTEN 후 실제 10–20초 fragment만 재생하고 전후에는 quiet pause다. Bowed-string pair는 거의 straight하게 frequency/density/tension/damping/sustained friction/resonance로 반응한다. 한 strand가 Selected Works axis를 맡아도 two-line identity는 Outro의 name과 함께 resolve된다. 작품별 hover를 동일하게 복제하거나 fade-up을 모든 scene에 반복하지 않는다.

공유 motion token과 입력 정책을 먼저 만든다. CSS transform/opacity → WAAPI → 필요한 RAF 순서이며, 하나의 scroll/visibility 관측 체계를 공유한다. motion 값은 React state로 매 프레임 전파하지 않는다. 자연 스크롤을 유지하고 장면별 시작/끝 anchor와 강도를 명시한다.

| 시스템 | 계약 |
|---|---|
| Input/Gesture | vertical pan 우선, 방향 임계 후 horizontal drag, pointer cancel/capture 해제. drag 이후 오클릭 방지 |
| Motion preferences | reduced motion, coarse/fine pointer, visibility, quality를 독립 판단. 화면 폭만으로 입력 능력 추정 금지 |
| Cursor | fine pointer/hover 기기에만 DRAG/VIEW/PLAY/ROTATE/OPEN. 핵심 의미는 기본 링크·label에도 존재 |
| Transition coordinator | from/to route와 visual anchor, 준비 예산, 취소 token, scroll/focus 복원 관리 |
| Scene choreography | HOME 7개 경계마다 outgoing/incoming anchor, line, tone, timing, fallback 정의 |
| State snapshot | 현재 transform/velocity/camera/selection을 이어받고 새로운 목표만 바꿈 |

View Transition은 선택적 강화다. 미지원·중복 클릭·느린 texture·브라우저 back에서도 링크는 즉시 유효해야 한다. 준비가 늦으면 정지 이미지/단순 fade로 전환한다. 새 route가 정해진 뒤 오래 화면 입력을 막지 않는다. direct entry에는 이전 snapshot이 없으므로 승인된 독립 시작 pose를 사용한다.

**확정 오디오 정책:** Album Detail route에 Audio Session을 둔다. Tracks, Booklet Reader, Credits, editorial scroll, internal 3D/DOM transitions에서는 유지하고 route-local Persistent Mini Player로 제어한다. 다른 album/HOME/WORKS/MEDIA/ABOUT 등 다른 route에 이동하면 종료하고 리소스를 해제한다. 짧은 fade-out은 선택이며 경로 이동을 막거나 목적지에서 음악을 계속 재생하지 않는다. 취소된 이동은 현재 세션을 유지하고 실제 이탈이 확정되면 종료한다. locale pathname 변경도 다른 route이며 reader state/anchor 변경은 내부 동작이다. 돌아오기/새로고침은 자동 재생하지 않는다.

사이트 전체를 관통하는 global audio player는 구현하지 않는다. 같은 route의 YouTube playback이 시작되면 해당 route 음원을 pause하고 영상 종료 후 자동 재개하지 않는다. HOME sample도 HOME 이탈 시 종료한다.

각 route의 미디어 조정자가 해당 route 안에서 한 개의 audible source만 활성화한다. app shell은 route 이탈 정리 호출만 담당하고 오디오를 다른 route로 유지하지 않는다. 실제 playable source가 없으면 unavailable/disabled/coming soon을 표시하며 timer/회전/playing 상태로 재생을 가장하지 않는다. 재생 표시의 기준은 실제 media events이며, play promise 거부/buffering/error/seek 실패를 구분한다. YouTube state change와 destroy API로 활성 player와 lifecycle을 관리할 수 있다. [YouTube 공식 API](https://developers.google.com/youtube/iframe_api_reference)

AudioContext는 명시적 user gesture에서 활성화한다. 분석이 불가해도 듣기는 유지해야 한다. R2 CORS를 확인하기 전 media element를 무조건 분석 노드에 연결하지 않는다. Web Audio 사양상 CORS에 맞지 않는 미디어 소스 노드는 무음을 출력할 수 있다. [Web Audio 사양](https://www.w3.org/TR/webaudio-1.0/)

해금 선은 작은 변위 상한을 유지하며 에너지에 따라 density/frequency/shimmer/response를 조절한다. attack/release smoothing과 damping으로 sustained bow 느낌을 만든다. 사전 envelope는 track/timecode/version을 media currentTime에 연결해 seek·pause 시 틀어지지 않게 한다. 라이브 분석이 이미 충분하면 envelope 생성 시스템을 불필요하게 늘리지 않는다. HOME은 signature, 상세·mini player는 기능 위주 축약형이다.

## 9. 3D Architecture

3D Lab과 Tray Lab을 P3에 만들고 공개 빌드에서 제외한다. 복잡한 3D를 HOME 안에서 실험하지 않는다. 사용자는 Blender GUI를 직접 다룰 필요가 없도록 reproducible scripted workflow를 검토하되 실제 capability는 아직 확인하지 않았다.

관련 production 3D 전에 **BLENDER CAPABILITY SPIKE — REQUIRED / NOT EXECUTED**를 둔다. Codex/Astra → bpy → .blend master → GLB/render → R3F/browser → mobile pipeline의 상세 검증·APPROVE/REVISE/REJECT 판정 정본은 [Motion §47](../03-MOTION-SYSTEM.md#blender-capability-spike), 개별 승인 단위 BLENDER-01A–E는 [Task Protocol](IMPLEMENTATION-TASK-PROTOCOL.md)이다. Blender 채택은 미정이며 spike는 관련 production pipeline 결정을 막는 gate이지 모든 P1/P2 작업의 blocker가 아니다.

**Haegeum 3D — FUTURE EXPERIMENT / HIGH PRIORITY / 첫 release 비차단**을 장기 roadmap에 유지한다. 실제 구조를 기반으로 reusable master와 교육·시각 활용을 검토하며 상세 구성, 11가지 용도, bowed-string 연구 및 master→web/mobile/pre-render 후보는 [Motion §48](../03-MOTION-SYSTEM.md#haegeum-3d-experiment)에 보존한다. 기존 HOME 해금 scene의 대체/필수 조건이 아니며 launch 뒤에도 삭제하지 않는다. V2에 game architecture를 추가하지 않는다.

| 모듈 | 소유 값과 책임 |
|---|---|
| geometry | 치수 단위, 좌표계, pivot, hinge/hub/recess/CD seating, UV |
| materials/textures | color space, transmission, IOR, roughness, maps, texture 해상도 및 공유 소유권 |
| scene | camera/target/FOV, lighting, 환경, framing. layout 문제와 물리 치수 분리 |
| interaction | pointer/touch intent, capture, drag, select/open/read/listen 명령 |
| motion/state | pose, quaternion, linear/angular velocity, transitions와 interruption |
| quality | DPR/texture/shadow/reflection 등급, 성능 관측, 등급 hysteresis |
| lifecycle | resource refcounts/cache, 로딩 취소, disposal, context loss, route exit |
| presets | Album3DConfig와 AlbumRenderPreset. 하나의 값에 하나의 소유자 |

개발 순서: Geometry 승인·freeze → STOP → Material/Texture 승인·freeze → STOP → Camera 승인·freeze → STOP → Lighting 승인·freeze → STOP → 각 Interaction 작업 → 각 Performance/Mobile 작업 → 통합. 매 다음 작업은 명시적 승인 후 시작한다. freeze는 영구 수정 금지가 아니라 소유 모듈을 명시적으로 다시 열고 관련 gate를 재검증한다는 뜻이다.

3D 핵심 상태: IDLE → HOVER → DRAG → RELEASE → INERTIA → SELECT → FORWARD FOCUS → DETAIL TRANSITION. 별도 package flow는 CLOSED → SETTLING → OPENING → OPEN → BOOKLET EXTRACT/READER 또는 DISC RELEASE/PLAYER. 닫기/되돌리기/중단도 같은 상태 계약에 포함한다. hover/drag/selection의 관계를 무조건 한 줄 이벤트 순서로 강제하지 않고 허용 전이를 정의한다.

**State Continuity Gate:** 전이 직전 snapshot과 직후 초기 상태를 비교한다. position/rotation/scale/linear·angular velocity/camera·target·FOV/light/material·opacity/selection/focus와 hinge/tray/disc/booklet을 검사한다. quaternion 부호 차이는 같은 회전인지 각거리로 비교한다. 위치뿐 아니라 필요한 속도 연속성도 검증한다. 실제 현재 pose에서 target으로 보간하며 고정 기본값으로 reset하지 않는다.

달라지는 frame delta, 빠른 드래그 후 즉시 OPEN, inertia 중 SELECT, 연속 클릭, pointercancel, 화면회전, reduced-motion 전환, route back/forward, texture 실패, WebGL context loss를 별도로 시험한다. snapshot은 큰 texture 자체가 아니라 작은 숫자 상태와 asset/preset 식별자를 전달한다. 전환 중 canvas 두 개를 오래 겹쳐 GPU 메모리를 배로 쓰지 않는다.

HOME collection은 세 2026 앨범의 physical collectible/exhibition identity를 유지한다. V2.1은 세 개 동시 live WebGL이 visual/mobile/input 품질을 해치면 한 고품질 object + album switching을 우선한다. 세 앨범 선택은 유지하고, 안정적 live 3D가 불가능하면 의도적으로 만든 static collection을 사용한다. Idle은 stable/static이며 접근→subtle response/ROTATE→intentional drag→selection→forward focus가 연속적이어야 한다. Drag가 detail 진입 필수 조건은 아니다. 상세 정보·OPEN/READ/LISTEN은 DOM 대안으로 항상 도달한다.

Tray는 empty plate → seated CD → underlying print → material/light → release/lift → full package 순서로 확인한다. transparent plate, circular recess, hub, support forms, lip, seating height가 핵심이다. CAD 제조 수준을 목표로 하지 않는다. 필수 Blender spike 결과에 따라 Tray/Digipak/Booklet/Disc의 Blender-authored geometry와 단순 procedural geometry를 적극 비교한다. 더 적합한 단순 geometry는 유지하되 procedural 실패 후에만 Blender를 허용하는 제한은 폐기한다. geometry를 material 오류 보상에 사용하거나 회색 opacity로 투명 재질을 가장하지 않는다.

북클릿은 extraction pose를 화면 plane에 맞춘 뒤 2D reader로 넘긴다. CD는 실제 seating 높이에서 hub release → lift → clearance 순서다. 불일치한 handoff는 단순한 전환으로 바꾸되 끊긴 애니메이션을 통과시키지 않는다.

3D 활성 중 delta-time 기반 useFrame/ref를 사용하고 idle/offscreen/hidden에서는 demand 또는 정지한다. 등급은 기기명보다 측정으로 낮추고 단시간 등급 왕복을 피한다. quality 변경은 pose를 리셋하지 않는다. 공유 리소스는 다른 소비자가 사용하는 동안 dispose하지 않는다. R3F 자동 해제에만 의존하지 말고 primitive/외부 리소스의 소유자를 명시한다. [R3F disposal 문서](https://r3f.docs.pmnd.rs/api/objects)

두 개 이상의 보상 수정이 연쇄되면 마지막 검증 checkpoint로 돌아가 원인 모듈에서 재현한다. 기능 완료 보고에는 어떤 gate가 아직 미통과인지 적는다. Quality Approved는 시각·상태 연속성·입력·모바일·성능·cleanup·fallback 증거와 사용자 시각 승인을 모두 요구한다.

## 10. Mobile Primary Strategy

P2부터 실제 작은 화면 구성을 만들고 P3 Lab부터 실기기에 배포해 본다. P11은 첫 모바일 구현 단계가 아니라 전체 정교화 단계다.

| 영역 | 모바일 구성 |
|---|---|
| Hero/Nav | Moving Editorial Poster, 세 줄 이름 재구성, 더 과감한 독립 crop, touch-safe nav, lighter scroll depth. pointer parallax 없음; desktop depth crossing 축소 복제 금지 |
| Haegeum | 4단계와 two-line structural motif 유지, 동시 layer 수 축소 |
| Works | featured full width + 읽히는 범위의 2열, sticky text filter, index 직접 탭 |
| Albums | SANJO/JEONGAK 세로 chapter와 prerender, 불필요한 sticky category 없음 |
| Album detail | 큰 object + 아래 최소 정보, 명시적 OPEN, scroll 우선, 필요하면 명시적 rotate mode |
| Booklet | single page, pinch/pan + 명시적 zoom/prev/next. 확대 중 pan과 page swipe 충돌 방지 |
| Player | 같은 Album Detail 내부 mini bar. safe-area/reader 접근성 유지, 이탈 시 종료. 실제 지원 시 expandable volume, 미지원은 검토된 capability fallback |
| Performances | sticky stage 대신 record별 inline visual, tap detail, secondary poster 명시적 버튼 |
| Detail/Media/About | 수직 읽기, 적정 1/2열 image, poster-first, 긴 글·크레딧 줄바꿈 확인 |

메뉴·reader가 모달일 때만 일시적 scroll lock과 focus 제어를 사용한다. 주소창 변화, 세로/가로 전환, 큰 글꼴, safe-area, 소프트 키보드, 확대 상태를 확인한다. 폭 기반 breakpoint와 pointer/hover capability를 분리해 태블릿·터치 노트북도 처리한다.

실기기 최소 목표는 iPhone Safari, Android Chrome, 가능하면 중저가 Android다. 기기/OS/browser 버전·전원/온도·네트워크 조건을 QA 증거에 기록한다. 에뮬레이터 통과를 실기기 통과로 표기하지 않는다.

모바일 volume은 필수 요구이자 미검증 capability다. HTMLMediaElement.volume은 일부 주요 브라우저에서 제한이 보고된다. P0 또는 Audio spike에서 실제 음량 변화와 mute/unmute를 확인하며 API property 존재만으로 통과시키지 않는다. 제약이 있으면 동작하지 않는 slider나 억지 gain 우회를 구현하지 않는다. 지원 기능에 맞는 UX/기기 음량 안내 등 fallback과 미지원 범위를 먼저 보고하고 검토 후 적용한다. [MDN volume](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/volume)

## 11. Performance Strategy

다음은 **새로 제안하는 초기 예산**이며 현재 달성 결과가 아니다. 기기/측정 조건을 P0–3에서 고정하고 품질 영향과 함께 조정한다.

| 지표 | 제안 기준 / 측정 방법 |
|---|---|
| Core Web Vitals | 실제 방문 데이터가 충분하면 모바일/데스크톱 각각 p75 LCP ≤2.5s, INP ≤200ms, CLS ≤0.1 |
| 초기 JS | HOME 첫 화면 compressed transfer 250 KiB 이하 목표, 3D chunk는 포함·로드하지 않음 |
| 첫 모바일 화면 자산 | 선택된 hero crop 300 KiB 전후 목표, CSS/JS/font/이미지 초기 합계 1 MiB 이하 시작 예산 |
| 입력/프레임 | 기기 refresh에 맞춘 지속 반응. 60Hz 목표 frame 16.7ms, 저등급 30fps는 지각 품질 승인 시에만. 불안정하면 static |
| 3D texture | 초기 추정 mobile 64 MiB, desktop 128 MiB 이내를 Lab 시작 상한으로 검토. 실제 압축 파일 크기와 GPU 메모리를 구분 |
| transition prewarm | 200ms 내 준비되지 않으면 단순 bridge로 진행하는 초기안. 이미지/3D 때문에 경로 이동 무기한 대기 금지 |
| 장시간 | 20회 route 왕복·open/close·reader 전환 및 10분 혼합 사용. warm cache 안정화 후 지속 증가/중복 canvas/listener 없음 |
| offscreen/hidden | 무관한 RAF/audio visual/WebGL 작업 중단. 소리 지속과 GPU 시각화의 생명주기는 분리 |

CWV의 지표/임계값은 [web.dev 공식 설명](https://web.dev/articles/defining-core-web-vitals-thresholds)을 기준으로 한다. 사전 실험은 현장 p75 결과를 대신하지 않는다. Lighthouse 점수 하나를 gate로 쓰지 않는다.

글꼴은 필요한 weight·언어 범위만 단계적으로 가져오고 원문 glyph 누락을 확인한다. display/body metric fallback으로 CLS를 줄인다. 한글 폰트 비용이 크면 숫자 예산을 숨기지 말고 구성·subset·로딩을 조정한다.

기본 사진·DOM을 먼저 보여주고 3D는 가시성/의도에 맞춰 로드한다. hero만 우선순위를 높이고 전체 사이트 preload는 하지 않는다. reader는 현재 spread/page와 작은 이웃 window만 유지한다. 활성 영상 한 개, 선택 음원만 로드한다. 4096 RGBA texture는 mipmap 포함 약 85 MiB 수준일 수 있으므로 JPEG/WebP 파일의 작은 크기를 GPU 비용으로 착각하지 않는다.

최종 예산 초과는 기능을 숨겨 완료 처리하지 않고 어떤 효과·source가 비용을 만드는지 보고한다. 원인이 다른 subsystem인 경우 camera/scale 패치로 감추지 않는다.

## 12. Accessibility Strategy

**WCAG 2.2 AA를 검증 목표로 제안**한다. 이는 현재 적합성 인증이 아니다. 일반 텍스트 대비 4.5:1, 큰 글자 3:1, 필수 비텍스트 UI 대비, keyboard와 focus visibility를 검사한다. AA target-size 최소 24 CSS px에는 예외가 있으나 프로젝트의 편한 터치 목표는 44×44px로 둔다. [WCAG 2.2](https://www.w3.org/TR/WCAG22/)

독립된 logical DOM order, skip link, page heading, route 전환 focus 안내, locale lang, visible focus, 의미 있는 alt를 제공한다. 움직임·hover·custom cursor·3D가 없어도 모든 사실과 주요 행동에 접근 가능해야 한다. 이미지에 들어간 상세 글은 alt 한 문장만으로 대체하지 않고 검토된 동등 텍스트를 제공한다.

Reader/modal은 진입 focus, Escape, 닫기, trigger 복귀, 적절한 focus trap을 갖춘다. Mini player는 reader 사용 중에도 접근 가능한 modal 구조 안의 제어로 제공하거나 같은 세션 제어를 reader에 배치한다. 바깥을 inert로 만들고 유일한 player도 접근 불가하게 두지 않는다.

북클릿의 읽기 순서와 본문 text 대안, zoom 버튼, 이미지 확대의 pan/page-turn 분리를 검증한다. 영상 자막/대본은 확보 상태와 필요한 보완을 기록한다. 내용 특성에 따른 관련 접근성 기준을 점검한다.

reduced motion에서는 parallax/auto rotate/큰 확대를 제거하고 필요 시 즉시 상태 변경 또는 짧은 fade로 바꾼다. 정적 구성이 완결되어야 한다. Design System에 확정한 `--color-muted-text: #6D6962`는 Canvas에서 4.8024:1, Surface에서 5.1429:1이며 불투명 정상 크기 본문/metadata용이다. 기존 #77736C muted와 accent는 작은 중요 본문에 그대로 사용하지 않고 적절한 장식/큰 글자 역할을 유지한다. hairline도 필수 입력 경계라면 충분한 대비가 필요하다.

## 13. Testing / QA Strategy

테스트는 구현 이후 실행할 계획이다. 이번 문서 단계에서는 사이트 build/lint/browser/product tests를 실행하지 않았다.

| 단계/범위 | 자동 검증 | 수동·실기기·시각 검증 |
|---|---|---|
| P0 route foundation | build/type/lint, manifest, 모든 KO/EN static HTML, root/subpath path | 실제 Pages direct refresh, 상태 코드, JS 전 metadata, back/forward |
| P1 data/assets | 중복 ID, refs, 승인 필수 필드, 파일 존재, route parity | 공식 제목·발매/공연 날짜·번역·원화·공개권한 대조 |
| P2 design | 필요한 token 계산/접근성 탐지 | 한글/영문 긴 제목, crop/mask, contrast, 작은 화면/zoom |
| P3 motion/3D | state transition과 continuity 경계, dt 변화, gesture cancel, resource ownership | drag/inertia/중단/열림/트레이, 실기기 touch/thermal/fallback |
| P4–10 pages | 핵심 사용자 flow, filter/history, player events, reader controls | 각 장면/페이지 모바일·desktop 구성, 실제 출처와 내용 |
| P11–13 integration | Playwright/axe, 배포 artifact 링크, 회귀 flow | iPhone/Android, NVDA/VoiceOver spot checks, keyboard walkthrough |
| P14 release | clean production build, route/metadata/download 검사 | preview 승인, 도메인/HTTPS 검증, rollback rehearsal, 출시 후 smoke |

주요 E2E: HOME→앨범→drag 중 OPEN→CD 재생→seek/volume/mute→Booklet/Credits/내부 3D-DOM 이동에서 재생 유지→다른 route에서 playback/mini player 종료→back에서 자동 재생 없음. 다른 album·HOME·WORKS·MEDIA·ABOUT·locale pathname 이동을 각각 확인한다. 실제 source 없음은 unavailable/disabled/coming soon이며 false clock 없음. 그 외 performance secondary visual→detail, 동일 작품 KR↔EN, CONTACT copy 실패/성공을 검증한다.

오류 주입: 느린/끊긴 네트워크, texture/이미지 404, iframe unavailable, autoplay 차단, audio error, WebGL unavailable/context loss, reduced motion, empty archive/filter, 누락된 선택 자료, 오래된 alias, unknown slug.

시각 QA는 device/browser/viewport/preset/state가 같은 screenshot과 사람이 보는 motion 영상으로 판단한다. 영상 캡처만으로 물리 상태 증거를 대체하지 않는다. inverse transition과 route return도 포함한다.

HOME V2.1 Hero/주요 Scene은 Functional Complete와 Quality Approved를 분리한다. 첫 viewport screenshot만으로 art poster가 되는지, 의도적 type hierarchy/crop/정교한 overlap, generic template/SaaS cards/repeated fade-up/excessive rounding/불필요한 effect 부재, responsive·interruptible motion, 동등한 mobile art-direction attention을 04 §24로 검토한다. Desktop/mobile 첫 프레임과 첫 약 5초, 정방향/역방향/중단 transition, reduced-motion 자료로 사용자 시각 승인을 받는다. 이번 문서 revision은 이를 실행하거나 통과한 증거가 아니다.

Gate 기록 양식: 작업 ID, 기준 commit/artifact, 환경, 수행 항목, 통과/실패/미검증, 알려진 제한, Functional Complete 여부, Quality Approved 여부, 승인자. 자동 시험이 통과해도 사용자 시각 승인 없이 최종 3D Quality Approved로 표기하지 않는다.

## 14. Required User Assets / Questions

기획 작성은 지금 자료만으로 완료할 수 있다. 다음은 향후 구현을 위한 한국어 요청 목록이며 지금 모든 파일을 제출해야 한다는 뜻은 아니다. 확인되지 않은 참조를 확보 완료로 표시하지 않는다.

| 자료 | 정확히 필요한 것 / 이유 | 필수 여부 | 지금 진행 가능? / 막히는 지점 |
|---|---|---|---|
| 승인 시안 식별 | HOME V2.1 문서가 현 정본; V1 시안은 역사적 참조. Purple hanbok side/back 후보의 정확한 파일·crop·font metric을 구분 | 후보 방향은 확정, final source/crop은 미검증 | 계획 가능 / P2 시각 기준 freeze 전 |
| HOME portrait | 최종 scale을 견디는 purple hanbok side/back/partial-face 원본, 해금 포함 3/4 back, Scene 07 clear front/3/4, 독립 mobile crop | 최종 Hero용 적합한 source 필수; 없거나 약하면 타협 없이 요청, 추가 촬영은 조건부 | 문서 진행 가능 / 해당 final crop·mask 승인 전 |
| 해금 detail | head/peg, strings/bow, resonator, full instrument 원본. 필요 시 접촉부 macro | 기존 crop이 버티면 추가 촬영 선택 | 계획/시험 가능 / P4 큰 화면 crop 품질 부족 시 |
| 앨범 4종 | final front/back/spine/interior/CD label/booklet 순서와 실제 패키지 치수·타입 | 각 공개 3D에 필요한 면과 치수 필수 | rough model 가능 / P3 geometry/material freeze, P6–7 최종 승인 전 |
| Tray 참조 | 문서가 가리키는 기존 참조 위치. 필요할 때 정면/45도/hub close-up, 폭·높이·두께·직경 | 기존 자료 우선, 추가 측정 조건부 | planning 가능 / P3 인지·seating 판정 불가 시 |
| 음원·발매 정보 | 각 트랙 공개 가능한 URL/source·길이·순서, 2026 3작의 최신 발매 상태 | 공개 player/content에 필수 | UI prototype 가능 / P1 사실 승인·P7 player 승인 전 |
| HOME sound | 대표곡 + 시작/끝 timecode, 10–20초, fade 의도, 공개 사용 승인 | 최종 LISTEN에 필수 | 정적/임시 시험 가능 / P4 sound 승인 전 |
| KO/EN 문안 | 공식 제목·인명·국악 용어·story/program note·bio/credits + 검토자 | 최종 양언어 공개 필수 | KO 구조 개발 가능 / 각 페이지 최종 승인, P14 출시 차단 |
| 공연별 자료 | 실제 사진/영상/포스터/리플렛/프로그램, title/date/venue/cast | 사실 정보 필수, 사진은 대안 가능 | poster/typography prototype 가능 / P8–9 작품 승인 전 |
| 영상 poster | Featured YouTube URL/ID + 의도한 frame와 공개 상태 | 선택된 영상에 필수 | 계획 가능 / P10 media 승인 전 |
| ABOUT | HOME과 다른 portrait set, 최신 약력/직책/학력/수상, selected milestone 지정 | 사실 필수, 추가 촬영 조건부 | 레이아웃 가능 / P10 승인 전 |
| 접근성 텍스트 | booklet/포스터의 읽을 수 있는 원문, 해당 영상 자막·대본 현황 | 동등 정보 제공에 필요한 범위 필수 | 구조 개발 가능 / P7·P13 승인 전 |
| 공개 다운로드 | 배포 허용 PDF와 credit/사용 범위, 과거 유지해야 할 파일 URL | 다운로드를 제공할 경우 필수 | 없으면 optional 다운로드 생략 / P14 호환 확인 전 |
| Sou.P | HOME Outro/Footer 제작자 서명의 숨은 문장, EN 적용 여부 | 해당 delight 최종 승인에 필수 | 기본 credit 가능 / P4 delight 승인 전 |
| ABOUT Delight | 특정 portrait annotation / 짧은 개인 문구 / subtle line response 중 선택과 정확한 내용 | 별도 delight 승인에 필요, Sou.P 사용 금지 | 본문 개발 가능 / P10 별도 delight 작업 승인 전 |
| CONTACT | 공식 email, 실제 운영 Instagram/YouTube, 표기 문안 | 공개 필수 | 계획 가능 / P10 최종 승인 전 |
| 실기기 | 테스트 가능한 iPhone/Android 모델·OS, 중저가 기기 가능 여부 | 실기기 QA 증거 필수 | emulation/개발 가능 / P3 3D Quality Approved 전에 확보 |

구현 전에 결정할 질문:

1. 공개 콘텐츠와 공식 EN 문안을 누가 최종 검토하는가? 2026 앨범의 현재 발매 상태는 무엇인가?
2. 오디오 범위는 확정되어 재질문하지 않는다. 필요한 것은 실제 공개 음원과 volume spike를 수행할 기기/source 정보다.
3. ABOUT는 별도 Delight로 확정되어 Sou.P 재사용 여부를 재질문하지 않는다. 정확한 annotation/개인 문구는 해당 bounded task 전에 정한다. 07 §35의 `Soul.P`는 앨범 사실 크레딧 예시이므로 공식 원본 대조 없이 자동 교정하지 않는다.
4. 승인 시안/지정 사진/트레이 참조는 어느 파일인가? 접근 가능한 로컬 위치를 우선 받는다.
5. 공개 가능 음원 저장소와 도메인/Pages 설정을 관리할 수 있는 담당자는 누구인가? 자격증명 자체를 문서에 넣을 필요는 없다.
6. 출시 후 별도 preview와 방문 분석을 운영할 것인가? 기본 제안은 단순 유지보수와 최소 외부 의존성이다.

## 15. PHASE 0–14 Implementation Plan

단계 번호는 최신 MASTER §35와 HANDOFF §21의 **canonical PHASE 0–14**를 따른다. PHASE는 계획 그룹이며 자동 실행 단위가 아니다.
2026-09-06 사용자 개정에 따라 **PLAN → SUBTASK A → SUBTASK B → SUBTASK C if tightly related → FULL VALIDATION → REPORT → STOP → USER APPROVAL**를 따른다.
기존보다 약 2.5–3배 큰, 한 목표/owner 안의 강결합 2–3개 subtask와 약 60–90분 검증 가능 분량이 기준이다.
승인된 bundle 내부에서는 연속 수행하되 unrelated subsystem이나 시각 디자인/3D/콘텐츠 migration을 무리하게 섞지 않는다.
다음 bundle/Phase 자동 진행, 전체 HOME 및 서로 다른 3D owner gate 생략은 여전히 금지다.

[Implementation Task Protocol](IMPLEMENTATION-TASK-PROTOCOL.md)의 작은 작업 큐는 위 조건에 맞는 bundle 설계의 재료다.
파일 범위·검증·rollback을 먼저 정하고, 사용자 지정 결과 항목(이번 P1D는 12개)을 우선하며 기본값은 7항목이다. 보고 후 반드시 중지한다.

### 과거 로드맵 이력 — 현재 실행 기준 아님

| 현재 canonical PHASE 0–14 | ZIP에 보존된 과거 MASTER 0–12 |
|---|---|
| P0–5 | P0–5와 동일 |
| P6 ALBUMS + P7 ALBUM DETAIL | P6 Album Experience 분리 |
| P8 PERFORMANCES + P9 PERFORMANCE DETAIL | P7 Performance Experience 분리 |
| P10 ABOUT/MEDIA/CONTACT | P8 |
| P11 Responsive | P9 |
| P12 Performance | P10 |
| P13 Accessibility | P11 Accessibility/QA의 접근성 집중 검증 |
| P14 Migration/QA | P11 통합 QA + P12 Production Migration |

**의존성 주의:** P4 HOME의 최종 3D와 P6 pre-render는 P3에서 승인된 production 3D source에 의존한다. P7 상세 기능이 완료될 때까지 HOME 전체 개발을 막지 않되, Lab의 품질 승인 전에는 최종 HOME 3D로 통합하지 않는다. P7이 공유 source를 바꾸면 P4/P6 해당 gate와 render를 다시 확인한다.

### PHASE 0 — Foundation

현재 delivery: push/PR은 type/lint/locale/content/placement/root build 및 draft artifact 제외 Fast gate를 실행한다. Full은 두 base와 82개 browser 회귀를 검사하며 수동 deploy=false가 기본이다. 승인된 exact SHA/main의 deploy=true만 배포한다. P0E/P0F 당시 승인·검증 이력은 각 결과에 보존하고 현재 bundle은 P1D 결과를 따른다.

- 입력: **각 단위의 명시적 구현 승인**. 전체 계획 승인은 다음 구현 승인과 다르다. P0A–E는 각각 승인되어 완료됐으며 P0F 문서 결과를 보고하고 멈춘다.
- 최신 승인 이력/큐: P0A skeleton 완료 → STOP → P0B local routing spike 완료 → STOP → P0C 실제 V2 Pages/CI·routing·architecture APPROVE → STOP → P0D locale/metadata 계약 완료 → STOP → P0E CI/Full/실제 Pages 검증 완료 → STOP → P0F AGENTS/Project Knowledge Wiring canonical APPROVED. 매 화살표 사이에 명시적 승인이 필요하다.
- P0B는 사용자 지시대로 로컬 검증만 수행했다. P0C에서 cij5484/cho-youn-kyoung-v2의 생성·연결·배포가 명시적으로 승인되어 완료됐다. 기존 production repository/domain은 변경하지 않았다.
- 검증 상태: subpath/root 출력과 P0C 지정 KO/EN direct/refresh/valid-vs-404/metadata/lang gate는 통과했다. neutral locale/hreflang는 P0D 로컬 gate를 통과했다. root mode는 운영 도메인 변경 없이 시험한다. 모바일 volume/CORS는 별도 승인된 P0 Audio unit 또는 P3 AUDIO-01에서 실제 capability를 검증한다. 페이지·3D 구현을 spike에 섞지 않는다.
- 산출물: foundation ADR, 실행 안내, 실제 preview artifact, route test matrix.
- 완료 기준: 각 unit 검증·보고·STOP을 준수한다. P0C 지정 gate 통과로 architecture는 확정했지만 전체 locale/SEO, audio/3D와 생산 콘텐츠 완료를 의미하지 않는다. P0C에서 재현 가능한 lint/type/build/deploy와 실제 unknown 404/asset/metadata를 확인했다. 후속 QA는 남은 요구와 새 변경에 맞게 제한한다.
- 중단 조건: clean URL이 화면만 복구되고 정상 응답/metadata를 제공하지 못하면 후속 페이지 개발 전 출력 구조부터 수정.

### PHASE 1 — Content / Data Foundation

- 입력: legacy snapshot, 최신 사실과 공개 승인 자료.
- 작업: 6개 데이터 원천 inventory, 새 schema, slug/alias, people/credits 참조, locale 검토 상태, factual/presentation 분리, asset manifest, 날짜 정밀도·Upcoming 정책, 용어집.
- 산출물: migration ledger, per-work asset gaps, route 목록, 공개/미확정 목록.
- 완료 기준: 필수 데이터/참조 검증 통과, 미확정 사실이 명확히 표시되고 EN 완료로 위장되지 않음. 누락 자료의 blocking point 확정.

### PHASE 2 — Design System

- 입력: Ivory baseline, 승인 시안/사진 식별.
- 작업: 3개 font, display/body/metadata tokens, 읽기용 대비 token, 12열/모바일 4열 또는 fluid, spacing, image ratios, links/buttons/focus, transforming nav와 mobile menu prototype.
- 산출물: desktop/mobile 대표 composition과 UI specimen, crop/mask 방향, global CSS 경계.
- 완료 기준: 긴 한글/EN 제목·zoom·small mobile에서 읽힘. 작은 텍스트 대비와 hit target 확인. 사용자 시각 승인.

### PHASE 3 — Motion System / 3D & Tray Labs

- 입력: P1 치수/샘플 artwork, P2 visual 기준.
- 작업 3A: CSS/WAAPI tokens, native scroll, drag/swipe/cursor, route transition·취소·focus, reduced-motion, 미디어 소유권 계약.
- 작업 3B: HTML audio→volume/mute/seek→CORS/분석/YouTube arbitration을 실제 mobile에서 검증. 해금 line prototype.
- Production 3D 선행 gate: BLENDER-01A local capability → STOP → 01B scripted master → STOP → 01C export → STOP → 01D isolated R3F → STOP → 01E mobile/repeatability/decision. 현재 미실행이며 다음 task 자동 승인 아님.
- 작업 3C는 묶음 설명일 뿐 한 번에 실행 금지: 3D-01 geometry → STOP → 02 materials → STOP → 03 camera → STOP → 04 lighting → STOP. Tray는 08A geometry, 08B material, 08C lighting, 08D gate review도 별개 승인 단위다.
- 작업 3D 역시 3D-05 drag, 06 inertia, 07 opening, 09 disc release, 10 detail transition, 11 booklet extraction, 12 adaptive, 13 lifecycle, 14 quality review를 별개로 실행/검증/보고/STOP한다. 여러 subsystem 동시 수정 금지. 상세 순서와 rollback은 Task Protocol을 따른다.
- 산출물: 3D/Tray Lab, state/continuity 계약, preset, 정지 fallback, gate 증거 및 작은 checkpoints.
- 완료 기준: HOME용 collection과 P6 렌더 원천의 Quality Approved. 지원 못 하는 mobile은 승인된 fallback. P7의 상세 UI 전체 구현을 이 단계에 몰아넣지 않음.
- 중단 조건: compensating patch chain 또는 floating CD/pose jump가 남으면 원인 모듈을 다시 열고 통합 보류.

### PHASE 4 — HOME

- 입력: HOME V2.1 문서, P2 desktop/mobile poster composition 및 적합한 source, P3 승인된 동작/3D, 선택 작품/대표 음원.
- 작업 큐: 01 Moving Editorial Poster/Nav → 01→02 continuous transition → 02 해금 4단계 → 03 quiet LISTEN → 04 긴 asymmetric surface 4–5작 → 05 physical album collection(품질상 필요 시 one live object + switching) → 06 quiet Dark Stage → 07 Ivory clear front/3/4 reveal 2–3문장 → 08 name/two-line resolve/footer/Sou.P. 각 화살표는 자동 진행 승인이 아니다.
- 한 장면 또는 인접 경계의 같은 owner 안에서 강결합 2–3개 subtask를 승인된 bundle로 구현할 수 있다. 해당 범위의 desktop/mobile/reduced-motion 전체 검증 후 요청 형식으로 보고하고 STOP한다. HOME 전체나 다음 장면으로 자동 진행하지 않는다.
- 산출물: scene별 acceptance와 전환 anchor 표, desktop/mobile screenshot·motion 기록.
- 완료 기준: 04 §24의 Hero/major-scene Visual Quality Gate, 첫 프레임과 이야기 흐름 사용자 시각 승인, scroll/input 품질, no autoplay, offscreen 비용 제어. P3 미승인 3D는 최종 HOME 승인 불가. 단순 큰 이름+portrait를 Moving Editorial Poster 완료로 처리하지 않는다.

### PHASE 5 — WORKS

- 입력: P1 schema/curation, 공통 전환.
- 작업: dual portal, ALL/ALBUMS/PERFORMANCES, editorial grid, featured 1–2, newest-first index, hover/focus preview, mobile mixed grid·sticky text filter·direct rows.
- 산출물: 재사용 탐색 시스템과 작은 presentation enum, 필터 query/back 복원.
- 완료 기준: 모든 작품 직접 링크 접근, 키보드 필터, empty state, 데이터 추가만으로 갱신. ID별 CSS 없음.

### PHASE 6 — ALBUMS

- 입력: P3 승인 production render preset와 앨범별 artwork.
- 작업: SANJO/JEONGAK exhibition, repeatable pre-render, 미세 lift/tilt, 정지 이미지→live handoff 프로토타입, mobile 세로 chapter.
- 산출물: versioned render assets와 handoff alignment 증거.
- 완료 기준: 목록에 상시 WebGL 없음. perspective/FOV/pose/lighting/crop 매칭 또는 단순 transition fallback 승인. P7 완성 전에는 detail 진입 계약만 검증.

### PHASE 7 — ALBUM DETAIL

- 입력: P3 물리/동작 source, P6 handoff, booklet/audio/credits.
- 작업: closed→OPEN→동시 booklet/CD, 실제 rotation부터 opening, CD seating release, 3D booklet→2D reader, zoom/page controls, story/track/credits/related, volume/mute/seek/mini player.
- 산출물: Hybrid 상세와 fallback DOM 경로, reader focus/audio 유지 계약.
- 완료 기준: 모든 열림/닫힘·전환 continuity, tray gate, 북클릿 가독성, 오디오 실제 상태, 모바일 scroll/rotate, route exit/return cleanup. P4/P6 공유 source 영향 회귀 검증.

### PHASE 8 — PERFORMANCES

- 입력: factual dates/status, per-performance visual asset audit.
- 작업: featured/current, upcoming/archive, timeline, 단일 desktop Stage Window, photo/poster/video-still/editorial/typography, active hysteresis, secondary action, mobile inline.
- 산출물: 공통 visualMode schema와 시각 전환 계약.
- 완료 기준: 실제 기록/편집 이미지 구분, missing photo도 완성도 있는 표현, 날짜 경계/빈 upcoming, keyboard focus와 pointer 우선순위 안정.

### PHASE 9 — PERFORMANCE DETAIL

- 입력: P8 visualMode, program/note/cast/archive.
- 작업: 현재 stage visual→hero, Artist Note(있는 경우)→Editorial Score→Cast→Unified Archive→Related. poster/leaflet viewer, one primary video, 없음 상태에서 section 제거.
- 산출물: 단일 의미 구조와 재사용 가능한 소수 옵션.
- 완료 기준: per-ID page 없음, 현재 선택 시각 유지, poster 확대/동등 정보, 자료 조합별 가독성, 실제 공연 정보와 공식 EN 검토.

### PHASE 10 — ABOUT / MEDIA / CONTACT

- 입력: 최신 CV/portrait, YouTube/poster/Press, 공식 연락처.
- 작업 큐: ABOUT의 한 section씩 → 별도 ABOUT Delight → MEDIA의 한 feature씩 → CONTACT. 여러 페이지를 한 작업으로 제작하지 않는다. 각각 7항목 보고 후 STOP/승인. ABOUT는 portrait annotation/짧은 문구/subtle line의 작은 독립 Delight이며 Sou.P를 반복하지 않는다.
- 산출물: 편집형 일반 페이지 3종 및 데이터 추가 절차.
- 완료 기준: HOME portrait 구성 반복 없음, iframe은 click 후 생성, 한 active player, copy 실패 시 대체, 공식 채널만 노출, locale parity.

### PHASE 11 — Responsive Refinement

- 입력: P4–10에서 이미 mobile 확인한 페이지들.
- 작업: small/large mobile, tablet, landscape/desktop 간 연속 폭, crop, type wrapping, safe-area, menu/sticky/player 겹침, touch/pinch/scroll 정교화.
- 산출물: 실기기/viewport별 결과와 수정 목록.
- 완료 기준: 실제 iPhone/Android 주요 flow 통과. tablet 중간 폭에서도 hierarchy와 입력이 안정. 미검증 기기를 통과로 표기하지 않음.

### PHASE 12 — Performance Optimization

- 입력: 각 기능의 초기 budget/trace.
- 작업: bundle/font/image 비용, critical load, lazy/prewarm, 3D demand/adaptive, audio visual, reader window, 장시간 메모리/열·배터리 체감 검증.
- 산출물: 측정 조건·전후 trace·예산 이탈과 결정 근거.
- 완료 기준: §11 확정 예산과 입력/스크롤 기준 통과, 지속 메모리 증가 없음, fallback 시각 재확인. Lighthouse 단일 점수로 대체하지 않음.

### PHASE 13 — Accessibility

- 입력: 모든 페이지·reader·player·fallback.
- 작업: keyboard walkthrough, visible focus, headings/lang/order, contrast/zoom/targets, reduced-motion, NVDA/VoiceOver, booklet 대체 텍스트, 영상 자막/대본 상태.
- 산출물: 자동 검사 + 수동 적합성 이슈 목록과 수정 증거.
- 완료 기준: 주요 flow에 keyboard trap/가려진 focus/drag-only/WebGL-only gate 없음. 접근성 실패를 미적 취향으로 면제하지 않음.

### PHASE 14 — Migration / QA

- 입력: P0–13 증거와 사용자 preview 승인, 사실/번역/자산 공개 승인.
- 작업 14A: 최종 root/subpath·KO/EN route/response/meta/asset/link, visual/mobile/3D/audio/accessibility 전체 QA. production base·canonical/hreflang/sitemap/robots와 다운로드 호환 확인.
- 작업 14B: legacy 안정 commit·배포 산출물·Pages/custom domain/DNS 설정 snapshot, rollback 순서·책임자·되돌림 기준 문서화. 검토 가능한 production artifact 준비 후 도메인 전환 최종 승인.
- 작업 14C: 승인된 창에서 도메인 인계·HTTPS 확인·deploy, 실제 production deep URL/hash compatibility/공유/player smoke. DNS 변경 필요 여부는 기존 설정을 보고 결정.
- 작업 14D: 초기 링크·device 이슈·indexing 상태 확인과 회귀 수정. 초기 rollback 유지 기간은 최소 1–2주 제안, 담당자와 확정.
- 완료 기준: release gate 전부 통과, 실제 도메인의 deep URL·HTTPS 정상, 롤백 경로 사용 가능. legacy 즉시 삭제 금지.
- 실패 조건: 도메인/HTTPS/핵심 route/음원/모바일/3D 회귀가 발생하면 미리 정한 rollback으로 복구. 검증되지 않은 상태로 전환 완료라 보고하지 않음.

## 16. Risks / Unknowns

| 우선순위 | 위험 | 대응 / 현재 미확인 |
|---|---|---|
| 높음 | Pages clean route가 SPA 화면 복구만 되고 404/OG 문제 유지 | P0C 실제 Pages gate 및 P0E 18-route CI/live 회귀 통과. 실제 콘텐츠/최종 도메인은 P14 재검증 |
| 높음 | pre-render→live와 HOME→detail에서 camera/pose/pop-in 불일치 | 같은 preset·snapshot·bounded prewarm, 매칭 실패 시 단순 bridge |
| 높음 | 투명 tray와 3개 패키지의 GPU 비용 | Lab별 원인 분리, 중저가 실기기, 한 object/static fallback |
| 높음 | 모바일 volume 및 R2 CORS가 분석·gain·seek와 충돌 | P0 조사/P3 playback spike. 현재 endpoint의 CORS·Range·안정성 실검증은 미실시 |
| 높음 | 승인됐다는 사진/시안의 파일·최종 발매/EN 상태 미확정 | 별도 자료 목록, prototype와 production 승인 분리 |
| 높음 | reader modal에서 mini player 접근 불가 또는 route exit 후 audio 잔류 | Album Detail route-local owner, reader controls 접근, 내부 유지/외부 종료·back no autoplay 검증 |
| 중간 | 3D 리소스 공유와 cleanup의 충돌 | refcount/owner 계약, 반복 왕복/asset 교체 시험 |
| 중간 | 큰 한글 font/큰 photography/3D preload로 LCP 저하 | critical asset 제한, source별 비용 추적, static first |
| 중간 | motion 중 중복 route/resize/back가 상태 손상 | transition cancel token, actual snapshot, direct-entry path |
| 중간 | performance variant와 per-work 옵션의 무제한 증가 | 하나의 visualMode enum, 내용/표현 분리, 새 variant 도입 근거 |
| 중간 | 정적 Upcoming 정보와 오래된 외부 URL | 날짜 경계 재빌드 운영, release 전 link QA, source 기록 |
| 중간 | Public repo에 비공개 master/미확정 개인 문구 노출 | 선별 공개 자산만 이관, 비공개 자료와 런타임 분리 |
| 중간 | custom domain 인계 후 preview URL/HTTPS 준비 차질 | 호스팅/DNS 현황을 P14 전에 확인, 복구 artifact와 순서 확정 |

이번 검토는 기획 문서와 로컬 legacy 일부의 읽기 전용 조사, 공식 기술 문서 확인이다. 전체 legacy 함수/자산의 정밀 감사, 링크의 실재 유효성, CORS, GPU/모바일 성능, 실제 운영 사이트 화면은 검증하지 않았다. 문서가 말하는 기존 기술의 검증 이력을 V2 적합성으로 전환하지 않았다.

## 17. Recommendation Before Implementation

P0E 사용자 승인 범위에서 기존 architecture를 유지하고 Fast push/PR gate와 명시적 Full/preview delivery를 연결했다. P0E 실제 검증/배포 상태는 [결과](../../../P0E-RESULT.md), commit/push/deploy/STOP의 현재 정본은 [Task Protocol](IMPLEMENTATION-TASK-PROTOCOL.md) CI/delivery 절이다. 과거 이력은 보존하며 운영 지도는 [AGENTS](../../../AGENTS.md), 현재 상태는 [HANDOFF §26](../../../CODEX-HANDOFF.md#knowledge-status), 현재 bundle 결과는 [P1D](../../../P1D-RESULT.md)다.

HOME V2.1은 문서 개정으로 승인됐고 bb8460e commit으로 보존됐다. 해당 작업에서 코드/asset/motion/3D는 구현하지 않았다. [V2.1 revision report](HOME-V2.1-REVISION-REPORT.md)는 당시 STOP 기록이다. 이후 별도로 승인된 P0E만 실행하며 P0C/P0D 계약을 유지했다.

**현재 판정: React Router + Static Prerender APPROVE / P0E·P0F·P1A delivery COMPLETE / P1B audit delivered / P1C mapping APPROVED / P1D private draft bundle REVIEW READY.**

정본 로드맵, 독립 ABOUT Delight, HOME 한정 Sou.P, mandatory Tray Lab, same-route audio scope, source truth, 대비 token, volume capability 검증 정책, bounded task/STOP 계약을 반영했다. 사용자 승인 사항을 다시 미정 질문으로 남기지 않는다.

React Router + Static Prerender는 P0C 실제 Pages gate로 **APPROVE**다. Linux CI Chromium 42/42, Windows Edge 42/42, 배포 SHA/파일 hash와 MIME 검증을 완료했다. P0D는 18-route neutral locale/hreflang 계약을 별도 승인 아래 로컬에서 검증했다(80 browser, 8 locale, 3 placement). P0E에서 같은 18-route 계약의 Linux browser 80/80와 실제 Pages 52/52도 통과했다. 실제 번역/제품 QA가 완료된 것은 아니다. 자료 파일 식별, 공식 번역, 실제 기기 capability는 후속 gate에서 다룬다. visualMode 명칭은 P1A 사용자 확인과 타입/fixture로 정리했다. 이들은 P0A 최소 skeleton을 시작할 기획상 blocker는 아니다.

P1A 결과와 Asset Lifecycle Policy/main delivery는 완료됐고, 이후 P1B 단일 앨범 감사가 PR #2 / `07661e5`로 delivery됐다. 과거 P1B 제안은 실행 이력으로 전환됐다. 사용자가 다음 한 단위를 **P1C — Ji Young-hee Ryu Album KO Record Mapping Review**로 지정·승인했으며, [매핑 검토](album-audits/JI-YOUNG-HEE-SANJO-KO-RECORD-MAPPING-REVIEW.md)와 [P1C 결과](../../../P1C-RESULT.md)에 문서 후보·검증·STOP을 기록한다. 실제 record/asset/route 등록은 없다.

현재 P1A schema 결과는 승인됐다. lifecycle 보완과 delivery 검증은 [P1A 결과](../../../P1A-RESULT.md)에 별도 기록한다. 이전 완료: 기존 계획·감사·STOP 계약과 별도로 P0A 기반, P0B 로컬 spike, P0C 실제 Pages 배포/검증 및 architecture 결정, P0D neutral KO/EN 계약과 로컬 검증, P0E Fast/Full CI·preview delivery·live 검증. [P0D 결과](../../../P0D-RESULT.md)를 따른다. 과거 P0A/P0B 결과는 당시 상태 기록으로 보존한다.

P1C 승인 후 P1D에서 그 한 건만 private draft로 실제 등록하고 공개 제외·workflow·regression을 검증한다.
현재 미착수: 공개 production record/asset 전환, 실제 content→template integration, Blender spike/모델/Tray/Haegeum 3D,
공식 authored/reviewed EN과 최종 SEO, 실제 제품 디자인, audio/mobile/3D, 운영 도메인 전환. P0E preview는 이 작업에서 재배포하지 않는다.

**P1D는 등록→공개 제외→workflow 검토의 한 bundle이며, 전체 검증과 12항목 결과 보고 후 STOP한다.**
다음 bundle, 공개 전환, Design System/HOME, 3D/Blender 또는 다음 Phase로 자동 진행하지 않는다. 로컬 commit만 사용자 범위에서 허용된다.
