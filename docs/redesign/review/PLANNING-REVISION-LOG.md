# Planning Revision Log — 2026-09-05

Revision 1.1 · 문서 갱신 완료 / 구현 미착수.
PHASE 0 implementation ready는 P0A 개별 승인 대기 상태다.
관련 기획 원문 갱신만 승인되었으며 역사적 baseline은 기존 ZIP에 보존한다.

## 사용자 결정 1–9 반영

| 결정 | 변경 내용 / 원문 근거 |
|---|---|
| 1 ROADMAP | MASTER §35, HANDOFF §21: PHASE 0–14 정본. 과거 0–12는 이력만 유지 |
| 2 EASTER EGG | MASTER §37, Design §26, Motion §40, HOME §18, ABOUT §11: HOME Sou.P와 ABOUT 별도 Delight |
| 3 TRAY LAB | Motion §20, Album Detail §13–14·44, Migration QA: 별도 필수 Lab / perceptual transparent CD plastic / gate 전 package 승인 금지 |
| 4 AUDIO SCOPE | MASTER §44, Album Detail §21·30, 11–14: 같은 Album Detail 내부만 유지, route 이탈 종료, global player 없음 |
| 5 MUTED | Design §3, Accessibility §15: #6D6962 accessible text / Canvas 4.8024:1, Surface 5.1429:1. 기존 #77736C 역할 보존 |
| 6 ROUTING | MASTER §45, Migration QA §5, Task Protocol: prerender 후보 / P0 spike 전체 matrix 후 확정 |
| 7 SOURCE TRUTH | Current Audit, Album Detail §26, Performance, QA: unavailable/disabled/coming-soon / silent clock·false playing 금지 |
| 8 MOBILE VOLUME | Album Detail §26·31, 11–14, Task Protocol: 실제 capability 검증, 제약은 fallback 보고, 억지 우회 금지 |
| 9 CHUNKING / STOP | MASTER §43, HANDOFF §25, Task Protocol: 1개 작업→검증→7항목 보고→STOP→명시 승인; P0·3D·page 단위 분할 |

## Files changed

기획 원문 11개:

- [00-MASTER-PLAN.md](../00-MASTER-PLAN.md) v1.5 → v1.6
- [01-CURRENT-SITE-AUDIT.md](../01-CURRENT-SITE-AUDIT.md) v1.0 → v1.1
- [02-DESIGN-SYSTEM.md](../02-DESIGN-SYSTEM.md) v1.1 → v1.2
- [03-MOTION-SYSTEM.md](../03-MOTION-SYSTEM.md) v1.4 → v1.5
- [04-HOME.md](../04-HOME.md) v1.0 → v1.1
- [07-ALBUM-DETAIL.md](../07-ALBUM-DETAIL.md) v1.0 → v1.1
- [10-ABOUT-MEDIA-CONTACT.md](../10-ABOUT-MEDIA-CONTACT.md) v1.0 → v1.1
- [11-RESPONSIVE.md](../11-RESPONSIVE.md) v1.0 → v1.1
- [12-PERFORMANCE.md](../12-PERFORMANCE.md) v1.0 → v1.1
- [13-ACCESSIBILITY.md](../13-ACCESSIBILITY.md) v1.0 → v1.1
- [14-MIGRATION-QA.md](../14-MIGRATION-QA.md) v1.0 → v1.1

갱신 3개:

- [CODEX-HANDOFF.md](../../../CODEX-HANDOFF.md): 상태·정본 roadmap·207항목·STOP 계약
- [HANDOFF-AUDIT.md](HANDOFF-AUDIT.md): 최신 207항목 개별 대조, Covered 205 / Ambiguous 2 / Missing 0 / Conflict 0
- [V2-IMPLEMENTATION-PLAN.md](V2-IMPLEMENTATION-PLAN.md): 기존 17절 유지, 확정 정책·후보 architecture·bounded 작업·readiness 갱신

신규 2개:

- [IMPLEMENTATION-TASK-PROTOCOL.md](IMPLEMENTATION-TASK-PROTOCOL.md): 작은 작업 단위 / 예상 파일 scope / 검증 / rollback / STOP
- 이 Planning Revision Log

총 16개 Markdown 파일만 변경/추가했다. 05/06/08/09 기획 문서는 변경하지 않았다.
기존 페이지별 디자인·기능 요구를 삭제/축약하지 않고 승인된 정책 수정 및 실행 계약을 반영했다.

## Tests / validation scope

- 대비: sRGB 선형 luminance 공식으로 두 배경에 대한 4.5:1 이상 계산 확인.
- HANDOFF: 현재 207개 체크박스와 감사표의 행 번호·문구·상태 일대일 검증.
- 구조: 최종 계획 17절, MASTER/HANDOFF/계획의 PHASE 0–14 확인.
- 보존: ZIP 기준 변경된 원문 범위·기존 numbered section 보존·비변경 문서 일치 확인.
- 링크: 로컬 Markdown 링크 대상 파일 존재 확인.
- 범위: workspace가 Markdown과 기존 ZIP만 포함하는지, .git/package.json/node_modules/앱 코드 부재 확인.
- 제품 검증: npm install, 앱 build/lint/test, routing/audio spike, 브라우저/실기기, 배포는 **NOT RUN**.

## Result / known issues / preview / next task

판정: **PHASE 0 implementation ready — P0A 단일 작업의 명시적 승인 대기**.

남은 Ambiguous 2개는 같은 visualMode/variant 상세 enum 문제이며 P1 schema task에 배정했다.
승인 참조 파일, 공식 콘텐츠/번역, real mobile capability, prerender 적합성은 각 지정 gate에서 검증한다.
P0A skeleton의 기획상 blocker는 아니며 후속 gate가 통과되었다는 의미도 아니다.

스크린샷/실행 preview: 해당 없음. 웹사이트 구현을 시작하지 않았다.
권장 다음 작업: **P0A — project skeleton / base configuration**.
현재 **STOP / 사용자 P0A 명시적 승인 대기**. 다음 task를 자동 실행하지 않는다.
