# Two-point Signature Contract

2026-09-09 / user-approved sitewide identity, WORKS A locally implemented, future pages unimplemented.

**같은 두 존재, 다른 페이지 choreography.** HOME은 기존 canonical owner를 유지한다.
공통 identity의 코드 owner는 `src/signature/two-point-contract.ts`이며 HOME runtime의 재작성/대체가 아니다.

| Identity | HOME-derived color | Character |
|---|---|---|
| HAEGEUM POINT / 해금점 | Electric Violet `#6334E5` | 긴 곡선, 유연한 연속 response |
| JANGGU POINT / 장구점 | Lacquer `#A33D36` | 구조적 경로, 더 짧고 무게 있는 방향 전환 |

HOME 후기 owner `src/home/works-motion.ts`, `src/interaction-prototype/tuning.ts`,
`src/sound/contact-motion.ts`에서 색·scale·response를 감사했다. HOME 초기 Bronze 쌍은 별도 승인 scene state다.
작품에서 가져온 atmosphere, Outro의 surface palette와 두 점의 identity를 혼동하지 않는다.

- Headless tapered tail: base 2.2 CSS px, taper .15–2.2px, 기준 history 2000ms. 큰 head/glow/halo를 붙이지 않는다.
- Delta-time exponential response: Haegeum 5.5, Janggu 11. 경로 전환은 실제 outgoing position에서 이어진다.
- Exact path/clock/camera/scene choreography는 각 페이지 owner가 소유한다. 범용 scene engine으로 통합하지 않는다.
- DOM 정보·탐색을 대체하지 않는 decoration: aria-hidden, 비포커스, pointer-events:none.
- Reduced motion: 움직임/잔상/pulse 대신 안정적인 두 marker. Desktop10×4.2 / mobile8×3.6 CSS px.
- 페이지 마지막 가시 영역까지 두 identity를 남긴다. hidden/offscreen/modal의 runtime sleep은 영구 exit와 다르다.
  Observer/RAF/timer/canvas 및 events는 unmount에서 정리한다.

## 현재 WORKS A 적용

Perspective depth의 현재/다음 작품 geometry를 읽어 서로 비대칭인 관계를 만든다. 작품을 직접 끌지 않는다.
Archive 진입 후 같은 position/phase에서 속도를 낮추고 외곽 ambient로 이동한다. Hover/focus는 경로를 약하게
구부리는 힘만 주며 row/cursor에 붙이지 않는다. 실제 archive 마지막까지 opacity0/displaynone/영구 offscreen exit 없음.
HOME의 renderer와 scene-specific paths를 가져오거나 변경하지 않는다. B/C는 이번 적용 대상이 아니다.

## Future page roles — 문서 계약, 구현/품질 승인 아님

| Page | 두 점의 역할 |
|---|---|
| WORKS | 작품 흐름 / Archive guide |
| ALBUMS | package / material orbit |
| ALBUM DETAIL / PERFORMANCE DETAIL | object / shared transition anchor |
| PERFORMANCES | timeline / stage tension |
| MEDIA | contact sheet guide |
| ABOUT | 조용한 identity ambient |
| CONTACT | 거의 정적인 closing |

Legacy detail href는 개발용 사실/reference 연결이며 최종 V2 detail architecture가 아니다.
다른 페이지 구현, HOME 변경, Canonical WORKS 승격은 별도 사용자 범위가 필요하다.
