# Planning Revision Log — 2026-09-05

Revision 1.8 · **P1A result APPROVED / Asset Lifecycle Policy and delivery authorized / STOP before P1B**.

## P1A approval — Asset Lifecycle Policy / delivery follow-up

- 사용자가 P1A 결과를 승인하고 lifecycle 정책 보완, 검증, logical commit/main push/Fast CI 확인을 명시적으로 승인했다. 배포와 P1B는 포함하지 않는다.
- AssetRecord에 필수 lifecycle 하나만 추가했다. provisional/approved/replace-required와 생산 사용 승인 판별 helper를 두고 기술 fixture는 replace-required로 명시했다. origin enum, 별도 state workflow 또는 release consumer는 만들지 않았다.
- 실제 자료 우선, AI/editorial 후보 허용, documentary 오인 금지, 참조 기반 교체와 더 좋은 원본 요청의 정본은 [Content Schema Contract](CONTENT-SCHEMA-CONTRACT.md#asset-lifecycle-policy)다. MASTER §28과 AGENTS는 이를 연결한다.
- 후속 검증은 [P1A result](../../../P1A-RESULT.md)와 [evidence](../../../evidence/p1a/results.json), commit/push 후 결과는 Git history 및 해당 SHA의 Fast Actions run으로 확인한다. 아래 초기 검증 이력은 보존한다.

## Historical P1A — initial local review result

- P0F delivery b3c12d8 / Fast CI 33962909498 SUCCESS를 확인한 뒤 별도로 승인된 P1A만 실행했다.
- shared/assets/models 타입, 5개 domain neutral fixture와 growth, semantic validator, public index/related refs 및 기존 P0D SemanticRoute 어댑터를 추가했다.
- 사용자가 visualMode 정본과 Detail 설명 이름 대응/음악 분류 분리를 명시적으로 승인했다. MASTER/Detail/Plan/Audit에 대응을 기록했으며 임의 명칭 결정이 아니다.
- TypeScript strict/satisfies/readonly와 negative compile 10개; runtime content test 13, locale 8, placement 3 및 root/project build/기존 browser 80 통과. 새 dependency/Zod/CMS 없음.
- 기존 Fast gate에 test:content를 추가했다. workflow, route config/catalog, locale helper, static packager, page source와 lockfile은 변경하지 않았다. Schema→경로 가능성은 adapter proof이며 새 data HTML이 생성됐다는 의미가 아니다.
- 정본 [Content Schema Contract](CONTENT-SCHEMA-CONTRACT.md), [P1A result](../../../P1A-RESULT.md), [evidence](../../../evidence/p1a/results.json)로 연결한다. 실제 migration/asset/SEO/3D/Blender/audio/디자인/배포/legacy/P1B는 미수행.
- 현재 local REVIEW READY. commit/push/배포하지 않았으며 보고 후 STOP한다.

## Historical P0F canonical approval / delivery authorization

- 사용자가 P0F 결과와 documentation/AGENTS 상태를 canonical로 승인했다. 이번 후속 작업은 P0F 문서만 하나의 logical commit으로 V2 main에 push하고 Fast CI를 확인하는 delivery다.
- 링크/범위 재확인: Markdown 13개만 변경, 정상 local link 403개/anchor 14개, 기존 P0A 역사적 경로 3개 외 새 문제 없음. 코드/workflow/dependency 변경 없음. P1A·배포·legacy 변경은 승인 범위 밖이다.

## Historical P0F preparation — documentation only

- Repository documentation을 canonical knowledge로 지정했다. root AGENTS는 운영 지도, HANDOFF는 현재 상태/catalog, MASTER는 철학/PHASE 0–14, page/system spec은 상세 계약, Task Protocol은 작업/CI/delivery, README는 사람용 실행 안내다.
- HANDOFF의 매번 read ALL 요구를 AGENTS→HANDOFF→MASTER→관련 spec→현재 plan/result/protocol의 선택 읽기로 바꿨다. 기존 15개 spec catalog와 207개 체크박스는 보존했다.
- Motion §47에 필수 미래 Blender Capability Spike를 기록했다. 실제 local/bpy/.blend/GLB/material/좌표/R3F/browser/size/mobile/repeatability 증거 후 APPROVE/REVISE/REJECT; 현재 NOT EXECUTED / adoption undecided다. Task Protocol BLENDER-01A–E는 각 별도 승인/STOP 단위다.
- Motion §48에 HIGH PRIORITY Haegeum 3D master·구조·11개 활용·bowed-string 연구·web/mobile/pre-render 파생 pipeline을 보존했다. 첫 release를 막지 않으며 기존 HOME scene/Secret이나 game project로 바꾸지 않았다.
- Album Detail §10과 Plan §9의 procedural-first/Blender-only-after-failure 제한을 최신 사용자 지시로 대체했다. 단순 geometry 후보, mandatory perceptual Tray gate와 continuity/freeze는 유지했다.
- Motion의 과거 commit 예시 ID를 Task Protocol과 맞췄다. MASTER/ADR/locale의 오래된 P0E 미착수·P0C-only 배포 문장을 현재 상태와 구분했고 과거 검증 기록은 보존했다.
- APPROVED / IMPLEMENTED / VERIFIED / QUALITY APPROVED / FUTURE EXPERIMENT / OPTIONAL / BLOCKING 정의와 현재 상태의 정본을 HANDOFF §26에 뒀다.
- 새 파일은 AGENTS.md와 [P0F result](../../../P0F-RESULT.md)뿐이다. 상세 3D 안내나 delivery guide를 별도 복제하지 않았다. P0E CI/commands/source/architecture, HOME 상세 art direction은 변경하지 않았다.
- 문서 링크/anchor/범위/상태 검토만 수행한다. Blender 설치·실행, 3D/Tray/Haegeum 제작, npm/build/browser/배포, content/asset migration 및 다음 Phase 없음. P0F는 로컬 검토 상태이며 새 commit/push/deploy를 실행하지 않았다.

## Historical P0E completion record

## P0E CI Quality Gates + Delivery Contract

- CI code/배포 SHA ea146f629cc2f0de89ed540b0b0747757f4a8011. Fast 33960545431 성공(28s), Full/deploy/live 33960594951 성공. Linux browser 80/80, 실제 Pages 52/52, 공개 manifest 18 routes/28 files가 CI artifact와 일치한다.
- 결과/evidence를 후속 문서 commit으로 저장한다. 해당 push는 Fast만 실행하며 preview를 재배포하지 않는다. main 문서 SHA와 실제 배포 SHA를 구분한다.
- 공식 Pages Action의 Node 20 → forced Node 24 annotation은 알려진 upstream 유지보수 사항이다. Gate 실패는 없었다. P0F는 시작하지 않았다.

- P0D는 이미 cb7605f/PR #1로 머지됐다. 승인된 HOME V2.1 문서는 별도 bb8460e commit으로 보존했다.
- Fast push/PR → reusable quality gates; 수동 Full/deploy=false 기본; exact SHA와 main/ref guard 뒤에만 preview delivery.
- 기존 type/lint, locale 8, placement 3, root/project build, local browser 80, live Pages 계약을 연결했다. Architecture/locale/source/static packager는 변경하지 않았다.
- Delivery 상태, publication 승인 범위, 실패 처리와 evidence 위치의 정본은 기존 Task Protocol에 추가했다. README/HANDOFF/Plan은 이를 링크한다.
- [P0E result](../../../P0E-RESULT.md)에서 실제 실행 결과/commit/CI URL을 기록한다. 새 visual/runtime dependency, HOME/3D/audio/asset/production/legacy/P0F 작업 없음.

## Historical HOME V2.1 documentation revision

## HOME V2.1 art-direction revision — documentation only

- User request: raise HOME from a contemporary artist homepage to a digital artwork; retain Contemporary Editorial / Ivory and Static Color, Dynamic Composition. All eight narrative scenes and prior detailed requirements remain.
- HOME v1.1 → v2.1 is the canonical scene specification. MASTER v1.9, Design v1.3, Motion v1.6, Responsive v1.2, Performance v1.2, HANDOFF revision 1.2, Plan/Audit/this log v1.4 carry only the related art-direction/quality/STOP changes.
- Hero becomes Moving Editorial Poster: first ~5-second impression, three-line name at roughly 55–65% viewport height, desktop portrait zone refined 55–65% → 58–62%, purple hanbok side/back/partial-face candidate, 1–2 precise depth crossings, transforming editorial navigation.
- Old single connecting line is now the two-line structural system; a strand may still lead the guide/Works axis. RESONATOR imagery remains within the RESONANCE stage. Haegeum 4 → 4.5/5 and Performance 2 → 2.5/5; full approximate scene lengths are in HOME §2.
- Hero→Haegeum is continuous composition transformation, with 1.2–1.6 viewport reviewed as overlapping Scene 02's 120–160vh, not extra pin length. Native scroll/reverse/interrupt and reduced-motion fallback are retained.
- SOUND is the 10–20s explicit-LISTEN pause; Selected Works is one asymmetric surface; Album Object preserves three album choices but prioritizes one high-quality live object with switching when simultaneous three-object quality suffers. Idle stays stable/static.
- Quiet Dark Performance → Ivory clear front/3/4 About → name/two-line Outro resolution preserves the Sou.P signature and its exact existing discovery rules.
- Added Hero/major-scene Visual Quality Gate, independent mobile art direction and asset needs. Functional completion cannot stand in for Quality Approved.
- References are the user's supplied review principles; no new reference-site inspection or source-image quality verification is claimed.
- [HOME V2.1 revision report](HOME-V2.1-REVISION-REPORT.md) records old→new mapping, resolved conflicts, asset needs, preserved documents and scope checks.
- No web source/CSS/React/assets/dependencies/animation/3D/deployment/PR or P0E work. P0C/P0D architecture, locale/canonical/hreflang contracts and historical evidence are unchanged. Document changes remain local for review.
- **STOP after this report. P0E needs a new explicit approval.**

## Historical revision 1.3 — P0D locale contract

## P0D locale contract revision

- P0D만 승인·실행했다. KO 기본/EN prefix의 9쌍, 자기 canonical, reciprocal ko/en/x-default, html lang, OG 최소 계약을 중앙화했다.
- 번역 부재/초안은 같은 KO 콘텐츠 + unavailable이다. EN을 위장하거나 HOME으로 보내지 않는다. authored/reviewed 경계를 최소 타입으로 기록했다.
- root/project 각각 18 HTML, Edge 80/80, locale 8/8, placement 3/3, type-check/lint/build 통과.
- [Locale Metadata Contract](LOCALE-METADATA-CONTRACT.md), [P0D result](../../../P0D-RESULT.md), [evidence](../../../evidence/p0d/README.md)를 추가했다. MASTER v1.8, Migration QA v1.3, HANDOFF, Plan/Audit v1.3, Protocol v1.2, ADR와 README 상태를 갱신했다.
- P0D는 uncommitted/unpushed 로컬 변경이다. P0C 배포/42개 live test 기록을 새 검증으로 재사용하지 않는다. workflow/file placement, 운영 도메인과 legacy는 변경하지 않았다.
- 제품 요구·207개 checklist·17개 plan 절을 보존했다. 실제 출시 SEO 체크는 미완료, 검증된 spike 체크만 완료다.
- 현재 STOP: P0D 완료. 다음 권장은 P0E delivery-check wiring이며 명시적 승인 전 시작하지 않는다.

## Historical revision 1.2 — P0C real Pages gate

## P0C architecture decision revision

- 최신 P0C 승인이 V2 저장소 생성·연결, CI/Pages 배포, 실제 13-route 검증과 architecture 판정을 명시적으로 포함했다.
- 배포 SHA: 137b3420fda15b9670e109989da54230d959966e. Actions run 33955594780 build/deploy/verify 모두 성공.
- 실제 Pages: Linux Chromium 42/42, Windows Edge 42/42. 원본 HTML/asset 23개와 배포 manifest hash 일치.
- MASTER v1.7, Migration QA v1.2, HANDOFF, Implementation Plan v1.2, Audit v1.2, Task Protocol v1.1의 후보/미착수 상태를 해당 검증 범위에 맞게 갱신했다.
- [Routing Architecture Decision](ROUTING-ARCHITECTURE-DECISION.md), [P0C 결과](../../../P0C-RESULT.md), [배포/배치 계약](../../../P0C-DEPLOYMENT.md)에 근거와 유지보수 조건을 기록했다.
- 전체 locale/hreflang, 제품 디자인/콘텐츠, audio/mobile/3D, 운영 도메인 gate는 완료로 표시하지 않았다. 기존 디자인/기능 요구를 삭제하거나 축약하지 않았다.
- P0A/P0B 결과와 아래 초기 문서 감사는 당시 기록으로 보존한다. 현재 STOP 지점은 P0C 완료이며, P0D에는 별도 승인이 필요하다.

## Historical revision 1.1 — planning-only snapshot

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

## 2026-09-07 — P2I integrated choreography / experience-principles revision

Latest integrated user instruction takes precedence over overlapping earlier attachments. MASTER §3.1 is the single
owner of eight experience principles; §6 owns active reference adoption boundaries. Motion §45 distinguishes
micro-vibrating strings from smooth bow travel. HOME permits the stronger explicit-listening candidate; Design
limits Violet to SOUND. The existing comparison contract is revised in place, retaining earlier result/evidence.
INTERACTION-GLOSSARY is a 29-term human learning reference, not new agent instructions. WORKS/filmstrip/adaptive
navigation/entry ritual/Blender/3D are not implemented. [Current result](../../../P2I-CHOREOGRAPHY-RESULT.md) owns checks,
known gaps and STOP; approved philosophy does not imply a selected production SOUND or quality freeze.

## 2026-09-07 — P2I selected direction / QA closeout

The user selected B2 Bold + LONG 460ms + Electric Violet #6334E5. HOME/Motion/SOUND now record the production
direction and “Strings vibrate. Bow flows.”; alternatives stay Lab/evidence only. MASTER §2 records artist
recognition, brand, performance promotion and professional credibility as the purpose of impact. The eight
principles retain their single canonical owner; glossary status now reflects the implemented/approved direction.
[Closeout result](../../../P2I-CLOSEOUT-RESULT.md) owns QUALITY APPROVED / FROZEN, classified non-blocking
Windows CLS/WebKit gaps and delivery. Full remains red; no test relaxation, deployment or next scene.
Prior reports and evidence are preserved rather than rewritten with later approvals.

P2I implementation delivered to V2 main as `b86fb4e`; exact-SHA Fast CI 34081883375 SUCCESS and clean main/origin
verified. [Receipt / committed files](../../../evidence/p2i-closeout/delivery.json). No deployment or next scene.
