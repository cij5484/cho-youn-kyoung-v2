# P1D — Ji Young-hee Ryu KO Draft Integration Bundle

2026-09-06 KST · **IMPLEMENTED / VERIFIED LOCALLY / REVIEW READY — 결과 승인 전, STOP.**

## Task card / PLAN

| 항목 | 승인된 범위 |
|---|---|
| Objective | P1C 승인 매핑 그대로 앨범 한 건을 실제 content layer의 비공개 draft로 등록하고 공개 제외 및 추가 workflow를 검증 |
| A | `records/*.server.ts`의 한 앨범/cover source reference와 `registry.server.ts` 등록. 기존 neutral fixtures와 분리 |
| B | real-record/schema/locale/public selector 검증, root/project HTML·JS·manifest 제외, KO/EN direct/client 404·metadata 회귀 |
| C | Content Contract/README의 실제 추가 절차, AGENTS/MASTER/HANDOFF/Plan/Protocol의 사용자 승인 bundle 규칙·현재 상태 보완 |
| Input | 승인된 P1C 매핑/evidence, P1B 확인 사실, P1A schema/locale/delivery 계약과 이번 사용자 지시 |
| Scope | source 2개, 새 테스트/검증 helper 3개 및 기존 route suite, package scripts, 직접 관련 문서·결과/evidence. 다른 앨범/자산 파일/페이지는 제외 |
| Completion | 모든 요청 검사·양쪽 base 회귀 통과, private 범위/누락/파일·commit 상태를 12항목으로 보고한 뒤 STOP |
| Baseline / rollback | 승인된 P1C 문서 checkpoint `306d75758a3634396ed95313aa3a72952fc52203`; `.checkpoints/p1d-before-306d757/`의 hash/기존 artifact 기록. 이번 P1D diff만 되돌리고 P1C는 보존 |
| Delivery | 사용자 허용 범위에서 검증 후 논리적 로컬 commit 가능. push/배포는 실행하지 않음 |
| Exclusions | 다른 앨범, 공개 전환, EN 전체, Design System, HOME, 3D/Blender, 다음 Phase 자동 진행 |

기존보다 약 2.5–3배 큰, 2–3개 강결합 subtask / 약 60–90분 검증 가능 분량의 bundle 정책을 적용한다.
한 콘텐츠 owner의 등록→공개 제외→workflow 검토를 묶으며, 내부 A/B/C 사이의 승인 재요청은 없다.
전체 결과를 보고한 뒤 다음 bundle 승인을 기다린다. 목표 시간은 불필요하게 채우지 않는다.

## 1. What was changed

P1C 문서 후보를 실제 서버 전용 source registry에 등록했다. public consumer는 기존 `catalog.ts` selector를
사용하며 초안과 raw asset inventory를 브라우저에 전달하지 않는다. root Fast gate에 artifact 공개 제외 검사를
추가했고 Full에는 두 base의 실제 draft URL/metadata 회귀를 추가했다. 기존 schema/locale/router 구현은 유지했다.

## 2. Record location

- [ji-young-hee-sanjo.server.ts](src/content/records/ji-young-hee-sanjo.server.ts): 한 앨범과 cover inventory reference.
- [registry.server.ts](src/content/registry.server.ts): 실제 content catalog의 명시적 등록 지점.
- [P1C mapping](docs/redesign/review/album-audits/JI-YOUNG-HEE-SANJO-KO-RECORD-MAPPING-REVIEW.md): 승인된 필드·출처·문구 기준. 기존 원본과 evidence는 수정하지 않았다.

## 3. Publication / private state

`publication.status = draft`. 16개 KO edition은 모두 `machine-assisted / draft`; review 객체/EN edition 없음.
release는 확인 날짜 `2026-09-08`, 현재 저장 상태 `upcoming`; 발매일 도래 또는 release 변경만으로 웹 공개되지 않는다.
여기서 private는 **사이트의 public catalog/route/배포 artifact에서 제외**를 의미한다. 공개 GitHub repository의
source/docs에 있는 값을 비밀로 저장하거나 인증으로 보호한다는 뜻은 아니다. 비공개 원본/개인 경로/음원 credential 없음.

## 4. Fields populated

ID/영구 slug, KO 제목/summary, sanjo category, 발매일/상태, `JEC-0528`, 6개 트랙의 ID/번호/KO 제목/unavailable 상태,
8개 credit의 ID/name/role, cover reference/KO alt/source pixel ratio, provenance와 provisional lifecycle.
떨기나무, Soul.P 및 기존 인쇄 확인값을 그대로 유지했다. 원본 copy의 reviewed 승격은 하지 않았다.

## 5. Draft / missing fields

summary/alt/credit 역할 문구는 초안이다. EN/story/artistNote/booklet/CD/3D/streaming/related/mobile crop은 생략.
실측 근거 없는 `durationSeconds`는 생략하고 인쇄 시간은 P1C에 보존. barcode/label/title-track 등 전용 필드 없는
사실은 감사 기록에 남긴다. cover runtime URL/파일은 없으며 공개 승인도 없다.

## 6. Public exclusion verification

**PASS.** 기존 source validator로 전체 registry가 유효하고, public record/index/route/prerender 결과는 빈 배열이다.
발매일 이전·당일·이후에도 제외되며 release 상태만 바꿔도 공개되지 않는다. 기존 public fixture와 섞어도 public 목록과
관계·경로는 그대로 유지된다. publication만 published로 바꾸면 reviewed KO 및 public cover runtime 요구에 실패한다.

두 base에서 KO/EN 모두 metadata가 없고 language switch는 unknown-route다. 실제 static HTTP는 404,
앱 내부 history 이동은 404 화면/제목과 canonical·hreflang·OpenGraph 없음으로 검증했다.
전체 client 30개 + static 29개 파일을 base별로 검사했다(합계 118개 파일 검사; 중복 artifact 포함).
초안 ID/slug/title/summary/product number/asset/sourceRef의 원문·URL/Unicode escape 표기가 포함되지 않았다.

## 7. Route / prerender effect

**변경 없음.** 두 base 모두 기존 neutral route 18개 / HTML 18개를 유지한다. 실제 draft KO/EN HTML은 0개다.
등록 전 artifact와 비교해 각 base의 공개 파일 28개가 모두 동일한 SHA-256을 유지했다. build-info의 기준 commit은
P1C checkpoint 306d757이며, 최종 P1D commit 직전 working tree에서 검증했다. source 동일성은 아래 evidence의 파일 hash로 구분한다.
라우터·prerender config·fixture catalog·metadata 구현·static packager를 수정하지 않았다.

## 8. Content workflow findings

fixtures는 가상 검증 자료다. 실제 record는 별도 `records/*.server.ts`에 두고 `registry.server.ts`에 명시적으로
추가한다. 원본 registry를 `root`/route component/metadata/client module에서 직접 import하거나 serialize하지 않는다.
미래 공개 integration은 별도 승인된 server/build consumer가 같은 build instant로 public selectors를 적용한 결과만 사용한다.
현재 18개 neutral route wiring은 유지하며 실제 template integration 완료로 표시하지 않는다.

출처·상태·asset 참조를 기존 schema로 표현할 수 있어 새 의존성/CMS/publication enum/validator 정책 변경은 필요하지 않았다.
`.server.ts` 경계는 설치된 React Router의 client-import rejection 규칙과 맞으며, 생성 artifact 검사는 실제 내용 유출도 검사한다.
전체 source가 공개되지 않는지는 홈페이지에서 보이지 않는 것만으로 판정할 수 없어 HTML 외 JS/raw fallback도 검사한다.

## 9. Tests

| 검사 | 결과 |
|---|---|
| type-check / lint | PASS / 최종 0 warnings |
| content/schema + actual draft regression | 21/21 PASS (기존 15 + 신규 6) |
| locale contract | 8/8 PASS |
| static placement | 3/3 PASS |
| fresh root artifact visibility | 1/1 PASS |
| root + Project Pages builds | PASS / 각 18개 route |
| browser regression | 82/82 PASS (기존 80 + 신규 2), skipped/flaky/failure 0, 23.9초 |
| source/document scope + links | PASS: 16개 변경 범위, 기존 99개 파일 hash 유지, 로컬 링크 167개/anchor 11개 확인, 신규 broken link 0 |

검증은 `gate:fast` → `build:pages-preview` → `test:spike`를 순차 수행해 Full의 모든 단계와 새 공개 제외 검사를 완료했다.
macOS / Node 24.15.0 / npm 11.12.1 / TypeScript 6.0.3 / Playwright 1.63.0 / Chromium 153.0.8010.12.
Mac의 기존 Chromium 선택에 `CI=1`을 사용했다. 새 의존성/lockfile/browser 설치, live Pages/실기기 QA는 이 bundle에서 하지 않았다.
초기 lint에서 artifact 검사 정규식의 control-character 규칙 위반 1건을 발견해 같은 검사 파일 안에서 수정했다.
기존 assertion을 지우거나 완화하지 않았고 수정 후 Fast/양쪽 build/browser가 모두 통과했다.
HANDOFF checkbox 207개의 상태와 기존 browser suite를 보존했다. checkbox 문구는 새 사용자 정책에 맞춘 2개만
바꿨으며 나머지 205개는 동일하다. MASTER 45개/Plan 17개 번호 섹션도 보존했다.

## 10. Commit / push status

- P1C 승인 문서: `306d75758a3634396ed95313aa3a72952fc52203` 로컬 commit 완료. 기존 P1C 검증/evidence 일치와 diff 검사를 확인한 뒤 저장했다.
- P1D: 이 결과는 최종 검증된 논리적 로컬 commit 직전에 저장한다. 해당 commit의 SHA는 완료 응답/Git history가 receipt다. 검증된 코드 이후 문서/증거만 마무리했으며 재빌드하지 않은 SHA를 배포 증거로 주장하지 않는다.
- push/PR/merge/remote CI dispatch/deploy 수행 없음. Fast-relevant checks는 로컬에서 실행한다.

## 11. Known gaps

인쇄 시간과 실측 길이, 실제 cover 공개 용도/파일, KO authored review, EN, P2–P4 story 원문, 음원 공개/재생·모바일,
CD 표기 정책 및 패키지/Tray 자료는 각각의 후속 gate에 남는다. 이 bundle은 공개 제품/asset/visual Quality Approved가 아니다.
private draft가 source에 등록됐다는 것과 페이지/공개 카탈로그에 노출됐다는 것을 구분한다.
README의 과거 `P0B-CHECKPOINT.json` 링크 대상 누락 1건은 baseline에도 존재하며 이번 콘텐츠 범위에서 복구하지 않았다.

## 12. Recommended next larger bounded task / STOP

제안만: **Ji Young-hee Ryu KO Copy Readiness Bundle** — 같은 앨범의 (A) 기존 summary/alt/credit 표기 검토,
(B) 읽을 수 있는 P2–P4 원문을 확보해 story/artistNote 초안 작성, (C) provenance/locale/공개 제외 회귀 검증.
입력 원문이 준비된 범위로 작업을 확정하며, 공개 전환·asset migration·디자인/3D는 섞지 않는다.

**REPORT 완료 후 STOP. 다음 bundle/Phase는 별도 사용자 승인 전 실행하지 않는다.**

## Changed files / evidence

- Source: [record](src/content/records/ji-young-hee-sanjo.server.ts), [registry](src/content/registry.server.ts).
- Validation: [draft contract](tests/draft-content.test.ts), [artifact assertion](tests/assert-draft-artifacts.ts), [Fast artifact test](tests/content-visibility.test.ts), [route suite](tests/routing-spike.spec.ts), [package scripts](package.json).
- Workflow/docs: [AGENTS](AGENTS.md), [HANDOFF](CODEX-HANDOFF.md), [README](README.md), [MASTER](docs/redesign/00-MASTER-PLAN.md), [Content Contract](docs/redesign/review/CONTENT-SCHEMA-CONTRACT.md), [Task Protocol](docs/redesign/review/IMPLEMENTATION-TASK-PROTOCOL.md), [Plan](docs/redesign/review/V2-IMPLEMENTATION-PLAN.md).
- Result/evidence: 이 파일과 [P1D evidence](evidence/p1d/ji-young-hee-sanjo-ko-draft-integration.json).

총 16개 파일. P1C 6개 파일의 prior checkpoint는 별도이며 P1D 기준부터의 변경에 중복 계산하지 않는다.
