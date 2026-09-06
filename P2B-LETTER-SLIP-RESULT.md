# P2B Navigation Refinement — Letter Slip / Refined–Bold Comparison

2026-09-06 · IMPLEMENTED / VERIFIED LOCALLY / REVIEW READY · 사용자 visual approval 대기.
현재 구현 정본: [navigation guide](docs/redesign/review/EDITORIAL-NAVIGATION-PROTOTYPE.md).
전체 검증·파일 hash·시각 증거: [navigation.json](evidence/p2b-letter-slip/navigation.json).

한 bounded task로 PLAN → A selected/Letter Slip/trigger → B reveal/close/input continuity → C 관련 정본·전체 검증
→ REPORT → STOP을 수행했다. 진행 중 추가된 사용자 지시 **BOLD, CURATED, PURPOSEFUL**를 같은 P2B 범위에
반영해 Refined를 보존하고 Bold 대안을 추가했다. HOME/WORKS/PERFORMANCE 구현으로 확장하지 않았다.

시작 전 기존 검증 hash 171개를 확인하고, 작업 트리 172개 파일을
`.checkpoints/p2b-letter-slip-before/baseline.json` 및 `files/`에 복사했다. Rollback은 이번 변경 파일만 복구하며
이전 P2B의 미커밋 작업·결과·증거를 보존한다. 이전 [P2B](P2B-RESULT.md)와
[첫 Refinement](P2B-REFINEMENT-RESULT.md)는 해당 시점의 역사적 보고서다.

## 1. Selected state revision

Selected/hover의 추가 underline을 제거했다. HOME 또는 현재 WORKS ancestor는 Ink + display weight 500,
index weight 600으로 표시한다. Row마다 structural hairline 한 개를 유지한다. `aria-current=page/location`은
그대로다. 하단 KO/EN의 현재 언어 underline은 별도 utility 상태로 유지한다.

## 2. Letter Slip implementation

문자별 교대 대각선 이동이 primary interaction이다. 랜덤·rotation·bounce·elastic·blur·glow는 없다.

| 항목 | Refined | Bold — 현재 제안안 |
|---|---|---|
| X / Y | +2px / ±5px | +3px / ±7px |
| 문자 duration | 280ms | 300ms |
| 문자 stagger | 20ms | 20ms |
| CONTACT 마지막 문자 완료 | 400ms | 420ms |
| Pointer leave | 전체 문자 280ms baseline 복귀 | 전체 문자 300ms baseline 복귀 |

같은 문자 위치는 매번 같은 이동을 사용한다. Link hit area와 행 geometry는 고정한다. CSS transition이 현재
pose에서 이어져 빠른 hover/leave도 정확히 원위치로 돌아간다. 문자 span은 시각용 aria-hidden이며, link는
분리되지 않은 accessible name과 영어 lang을 유지한다. 200% text에서도 줄바꿈으로 접근 가능하다.

## 3. Secondary hover choice

Index의 2px 이동과 Ink 반응만 보조로 채택했다. 기존 전체 단어 5px 이동, 추가 긴 hover line,
다른 항목 opacity 저하는 제거했다. Two-string resonance marker는 이번 조합에서 별도 구현하지 않았다.
Letter Slip이 이미 리듬을 제공하며 structural separator와 새로운 marker가 경쟁할 이유가 없다고 판단했다.

## 4. MENU/CLOSE trigger interaction

180ms 동안 text +3px, tracking .01→.035em, Ink tone, 두 stroke의 .72 scale 및 한 stroke −1px 반응을 묶었다.
실제 opening에서는 고정 text mask 안에서 MENU→CLOSE가 이어지고 +가 45° 회전해 ×가 된다.
Hover rotation, generic underline, pill, glow, bounce는 없다. Hover/focus만으로 열리지 않는다.
Desktop click/Enter/Space, mobile tap이 opening 입력이다. CLOSE는 같은 footprint와 문법을 사용한다.

## 5. Opening choreography

Refined는 기존 Canvas 면이 위에서 아래로 열린다. Bold는 P2A의 밝은 Ivory Surface가 MENU 쪽에서 사선 경계로
열리고, hairline도 오른쪽에서 들어오며 typography는 mask 안에서 16px 대각선 경로를 따른다. 글자를 skew하지
않는다. Desktop의 예약 scrollbar gutter도 열린 면과 같은 색으로 맞춰 가장자리 잔여 띠를 제거했다.

Sequence: trigger/symbol → surface → INDEX/hairline → 5개 typography mask → artist/locale.
16개의 native Web Animations track을 하나의 timeline으로 제어한다. Refined 480ms / Bold 500ms,
행 간 stagger는 28.8ms / 30ms다. 단순 전체 opacity fade로 대체하지 않았다.

Lab 기본 제안은 **Bold**다. 중립 study 영역의 Refined / Bold 버튼으로 비교할 수 있다. 색상·타입 scale·grid는
P2A를 사용하며 두 안의 composition/input contract를 공유한다. 시각적 최종 선택은 사용자 검토 전이다.

## 6. Closing choreography

두 안 모두 완전히 열린 상태에서 400ms에 닫힌다. Refined −1.2 / Bold −1.25 playback rate로 동일 timeline을
되돌린다. 더 빠른 dismissal을 채택하되, 별도 easing을 중첩하지 않았다. 빠른 open→close→reopen은 모든 track의
현재 time/pose를 이어받으며 queue나 endpoint reset이 없다. 중간 reversal의 currentTime/clip 동일성을 검사했다.
완료 시 effect를 취소하고 원래 overflow·MENU focus를 복원한다. Route/locale 이동은 exit를 기다리지 않고 즉시 처리한다.

## 7. Mobile translation

Touch에서는 Letter Slip과 index 이동이 실행되지 않는다. Tap tone, selected/index 강조, opening choreography,
visible focus로 정체성을 전달한다. 44×44px 이상 target, vertical scroll, sticky Close, Esc/focus trap/restore를 유지한다.
두 안 모두 320×800, 390×844, 768×1024, 1024×768, 1440×1000, 1920×1080에서 검증했다.
Short landscape와 320px 200% text, resize 중 focus도 확인했다. 실제 모바일 기기 검증을 대신하는 주장은 아니다.

## 8. Reduced-motion behavior

Per-character movement/stagger, tracking 확장, 큰 reveal을 없애고 즉시 명확한 open/closed 상태를 제공한다.
Ink·selected weight·index·focus는 유지한다. 실행 중 preference 변경도 원하는 endpoint로 정리하며,
WAAPI 미지원·font 차단 상황에서도 목적지 이동이 된다. Bold에서도 동일 계약을 추가 검증했다.

## 9. References researched

2026-09-06 원문을 확인했다. 특정 사이트의 코드·이미지·branding을 가져오지 않았다.

| 원문 | 살펴본 내용 |
|---|---|
| [Codrops — Line & Letter Hover, 2023](https://tympanus.net/codrops/2023/06/16/4-exclusive-demos-slideshows-typographic-animations/) | 문자 단위의 typography hover 구성 |
| [Codrops — Clip Menu / easeReverse, 2026](https://tympanus.net/codrops/2026/04/22/a-playful-clip-menu-with-gsaps-easereverse/) | Entry와 dismissal의 속도/easing을 별도로 판단하고 interruption을 비교하는 방법 |
| [Codrops — Grid Preview / Clip-Path, 2025](https://tympanus.net/codrops/2025/05/27/animated-product-grid-preview-with-gsap-clip-path/) | 기존 composition과 mask geometry를 연결하는 원리 |

## 10. References에서 실제로 채택한 principle

문자를 독립적으로 제어하되 구조는 유지하고, entry와 dismissal pace를 별도로 판단하며, mask가 공간을 여는
역할을 갖도록 했다. Exact layout/composition/timing/assets/branding/source code를 복제하지 않았다.
Letter Slip 수치는 사용자 범위 안에서 독립적으로 조정했고, Bold의 MENU-side plane은 trigger와 공간의 관계를 표현한다.
Reference의 playful scattering, elastic, 제품 grid, hover-open, GSAP 코드는 도입하지 않았다.

새 기준과 적극적인 reference adoption, Refined/Bold 비교 전략을 AGENTS/MASTER/Design/Motion/HOME에 기록했다.
HOME Hero, Hero→Haegeum, WORKS cluster→archive, Album 3D, shared Detail entry를 signature-moment 후보로 보존했다.
WORKS cluster 확장, PERFORMANCE persistent Stage Visual + left/index, 다섯 image-reveal vocabulary,
same-object Detail transition은 **문서만 수정**했다. 향후 GSAP Flip 검토도 계획이며 현재 dependency가 아니다.

## 11. Files changed

이번 iteration은 기존 파일 20개 수정, 결과/증거 32개 추가다. 이전 P2B diff 전체와 구분한 목록이다.

| 역할 | 파일 |
|---|---|
| Navigation | [EditorialNavigation.tsx](src/navigation/EditorialNavigation.tsx), [menu-reveal.ts](src/navigation/menu-reveal.ts), [navigation.css](src/navigation/navigation.css) |
| Lab 비교 | [NavigationLab.tsx](labs/navigation/NavigationLab.tsx), [lab.css](labs/navigation/lab.css) |
| Regression / evidence capture | [navigation.spec.ts](tests/navigation.spec.ts) |
| 운영·현재 상태 | [AGENTS](AGENTS.md), [HANDOFF](CODEX-HANDOFF.md), [README](README.md), [MASTER](docs/redesign/00-MASTER-PLAN.md) |
| Art/motion 정본 | [Design](docs/redesign/02-DESIGN-SYSTEM.md), [Motion](docs/redesign/03-MOTION-SYSTEM.md), [HOME](docs/redesign/04-HOME.md), [Responsive](docs/redesign/11-RESPONSIVE.md) |
| 미래 방향만 | [WORKS](docs/redesign/05-WORKS.md), [PERFORMANCES](docs/redesign/08-PERFORMANCES.md) |
| 구현/검증 문서 | [Foundation guide](docs/redesign/review/DESIGN-SYSTEM-FOUNDATION.md), [Navigation guide](docs/redesign/review/EDITORIAL-NAVIGATION-PROTOTYPE.md), [Task Protocol](docs/redesign/review/IMPLEMENTATION-TASK-PROTOCOL.md), [Implementation Plan](docs/redesign/review/V2-IMPLEMENTATION-PLAN.md) |
| 추가 | 이 보고서, evidence/p2b-letter-slip의 PNG 28개·WebM 2개·navigation.json |

기존 파일 152개를 그대로 보존했다. Production root/routes/content/schema/locale, package/lockfile, CI workflow,
P2A foundation CSS/fonts, 이전 결과·이미지·JSON은 변경하지 않았다.

## 12. Dependencies changed

없음. CSS + native Web Animations 사용. 새 library/font/asset dependency, permanent will-change, per-frame React
state 또는 animation timer queue를 추가하지 않았다. Both-base production JS/CSS payload 증가는 0 bytes다.

## 13. Tests / regression

Node 24.15.0 / npm 11.12.1 / macOS arm64 / Playwright Chromium에서 최종 `gate:full` PASS.

| 검증 | 결과 |
|---|---|
| type-check / lint | PASS / zero warnings |
| locale/metadata, navigation model, content/schema/private draft, placement, artifact unit checks | Node 38 PASS |
| Root + Project Pages route/prerender | 84 browser PASS |
| P2A Foundation Lab | 11 browser PASS |
| P2B navigation — Refined/Bold, input, locale, responsive, motion, screenshots/video | 35 browser PASS |
| 합계 | Node 38 + browser 130; skipped/flaky/unexpected 0 |
| actionlint 1.7.12 / git diff --check | PASS |
| Navigation Lab build | 의도대로 거부: development-only |
| 문서·범위 | 새 broken link 0, HANDOFF 체크박스 207개와 기존 numbered sections 보존 |

각 base는 18 neutral routes / manifest public files 284개를 유지한다. Root JS 324,591B / CSS 170,068B,
Project JS 326,277B / CSS 174,875B로 이전 검증과 동일하다. Lab public 404, private Ji Young-hee record의
public catalog/routes/prerender/metadata/raw client exclusion을 재검증했다. KO/EN counterpart identity,
query/hash 제거, missing/draft EN unavailable, focus·history/refresh를 보존한다.

처음 추가한 focus 검사 하나는 pointer 사용 후 programmatic focus를 keyboard focus로 잘못 가정했다.
실제 Tab 순서로 수정한 뒤 통과했다. 이후 추가된 Bold 대안과 gutter 보완도 최종 Full에 포함됐다.
README의 기존 로컬 P0B checkpoint 링크 1건은 baseline 상태로 보존했으며 새 문서 오류는 아니다.
로그: `.checkpoints/p2b-letter-slip-before/full-gate.log`; 최종 hash와 timing은 navigation.json에 기록했다.

Commit/push/deploy: 이번 작업에서 모두 미수행. HEAD는 승인된 P2A `7714907`, P2B는 로컬 review diff다.
새 원격 CI 실행이나 production 배포 성공으로 표현하지 않는다.

## 14. Visual evidence location

실제 Chromium PNG 28개와 normal-speed WebM 2개다. Opening 180ms/closing 150ms PNG는 native animation을
해당 timeline 위치에 pause한 **중간 상태 표본**이다. 영상은 pause/retime/edit 없이 실제 입력으로 녹화했다.
영상에는 trigger hover, opening, WORKS/MEDIA hover와 baseline 복귀, closing, rapid reversal가 포함된다.

| 상태 | Bold | Refined |
|---|---|---|
| Closed MENU | [PNG](evidence/p2b-letter-slip/bold-closed-menu.png) | [PNG](evidence/p2b-letter-slip/refined-closed-menu.png) |
| Trigger hover | [PNG](evidence/p2b-letter-slip/bold-trigger-hover.png) | [PNG](evidence/p2b-letter-slip/refined-trigger-hover.png) |
| Opening 180ms | [PNG](evidence/p2b-letter-slip/bold-opening-180ms.png) | [PNG](evidence/p2b-letter-slip/refined-opening-180ms.png) |
| Fully open / selected HOME | [PNG](evidence/p2b-letter-slip/bold-fully-opened.png) | [selected PNG](evidence/p2b-letter-slip/refined-selected-home.png) |
| WORKS Letter Slip | [PNG](evidence/p2b-letter-slip/bold-works-letter-slip.png) | [PNG](evidence/p2b-letter-slip/refined-works-letter-slip.png) |
| MEDIA Letter Slip | [PNG](evidence/p2b-letter-slip/bold-media-letter-slip.png) | [PNG](evidence/p2b-letter-slip/refined-media-letter-slip.png) |
| Closing 150ms | [PNG](evidence/p2b-letter-slip/bold-closing-150ms.png) | [PNG](evidence/p2b-letter-slip/refined-closing-150ms.png) |
| Mobile 390px | [PNG](evidence/p2b-letter-slip/bold-mobile-opened.png) | [PNG](evidence/p2b-letter-slip/refined-mobile-opened.png) |
| Mobile 320px | [PNG](evidence/p2b-letter-slip/bold-small-mobile-opened.png) | [PNG](evidence/p2b-letter-slip/refined-small-mobile-opened.png) |
| Reduced motion | [PNG](evidence/p2b-letter-slip/bold-reduced-motion.png) | [PNG](evidence/p2b-letter-slip/refined-reduced-motion.png) |
| 실제 playback | [Bold WebM](evidence/p2b-letter-slip/bold-real-time.webm) | [Refined WebM](evidence/p2b-letter-slip/refined-real-time.webm) |

Tablet / landscape / wide 및 Refined CLOSE hover는 같은 evidence 폴더와 navigation.json에 있다.
[Bold preview](http://127.0.0.1:4176/?motion=bold) / [Refined preview](http://127.0.0.1:4176/?motion=refined).
실시간 timing은 browser phase event로도 기록했다. 영상 encoding frame rate는 기기의 렌더링 성능 보증이 아니다.

## 15. Remaining visual concerns

Bold를 제안하지만 ±7px Letter Slip의 강도와 MENU-side reveal이 최종 identity에 맞는지는 사용자 visual review가
필요하다. Refined도 같은 Lab에서 비교할 수 있다. 실제 Hero/사진이 없으므로 header surface·대비·겹침의 최종
판단은 아직 할 수 없다. HOME V2.1 quality approval로 확대 해석하지 않는다.
실제 iOS/Android/Safari, screen reader 출력 및 GPU/frame/thermal 성능은 미검증이다. Short viewport에서는
메뉴가 세로 스크롤되는 의도된 동작이다. 기능/자동 회귀 통과와 사용자 quality approval은 별개다.

## 16. Recommended next bounded task

사용자 시각 선택·승인 후 **P2B Navigation Freeze & Delivery Bundle**: 선택안 정리·navigation 문서 freeze,
최종 검증, 승인된 범위의 logical commit/push와 Fast CI 확인. 제안이며 이번에 실행하지 않았다.

**REPORT → STOP → USER APPROVAL.** HOME Hero/P2C, 다른 page implementation, 3D/Blender 또는 다음 Phase로 진행하지 않는다.
