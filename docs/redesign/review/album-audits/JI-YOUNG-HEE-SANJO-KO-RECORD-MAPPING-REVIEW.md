# P1C — Ji Young-hee Ryu Album KO Record Mapping Review

**Status: REVIEW READY — 문서 매핑 검토 완료, 사용자 결과 승인 전.**
검토 기준 시각: `2026-09-05T14:55:55Z` / 2026-09-05 KST. 완료일: 2026-09-06 KST.
대상: **조윤경 해금산조 – 지영희류** 한 건.
이 문서의 후보는 application catalog에 등록되지 않았다.

## 1. Bounded task card

| 항목 | 이번 단위 |
|---|---|
| Task | 사용자 지정 **P1C — Ji Young-hee Ryu Album KO Record Mapping Review** |
| Objective | P1B 확인 사실을 현 P1A 필드에 대응시키고 KO 초안·출처·보류 항목·후속 입력을 검토 가능하게 만든다 |
| Inputs | [P1B 감사](JI-YOUNG-HEE-SANJO-SOURCE-AUDIT.md), [P1B 측정 기록](../../../../evidence/p1b/ji-young-hee-sanjo-source-audit.json), 아래 canonical owners, 현재 사용자 지시 |
| Scope | 이 문서, [P1C 결과](../../../../P1C-RESULT.md), [검증 기록](../../../../evidence/p1c/ji-young-hee-sanjo-ko-mapping-review.json), HANDOFF·구현 계획·Task Protocol의 P1C 상태 연결 — 총 6개 파일 |
| Validation | 출처·필드 대응, 문서 후보의 타입/semantic 검증, draft 공개 제외, 미승인 공개 거부, local links, 기존 코드/감사/체크박스/기획 보존 |
| Completion gate | 대응표·구체적인 KO 후보·미제공 정책·gap별 blocking point와 검증 결과를 보고하면 REVIEW READY. 사용자 승인/공개/품질 승인을 뜻하지 않는다 |
| Baseline / rollback | `07661e5b6061c6a46f9c4205a7737d3ab4b92c81`. 변경 전 3개 문서는 ignored `.checkpoints/p1c-before-07661e5/`에 보관. 신규 3개 파일과 이번 문서 diff만 되돌리며 다른 작업을 보존 |
| Exclusions / STOP | production/draft runtime record 등록, schema/validator/template/route 수정, asset 복사·편집·승격, 음원 요청/재생, 번역판 제작, Blender/3D, legacy 변경, commit/push/deploy, P1D 실행 |

현 구조는 **facts / assets / presentation 분리**, `Album` + `Edition` + `AssetRecord`와 data-only route adapter다.
실제 React Router route/prerender는 여전히 18개 neutral fixture를 사용한다. 이 검토는 그 연결을 바꾸지 않는다.
계획상 P1A→P1B 뒤의 이번 한 단위를 사용자가 P1C로 명시했다. 과거 문서의 “P1B 시작 전”은 당시 경계이며
현재 P1C 지시와 [HANDOFF](../../../../CODEX-HANDOFF.md)가 현 상태를 정한다. Mac setup 문서 정리는 이번 범위 밖이다.

## 2. Canonical owners and source boundary

- [AGENTS](../../../../AGENTS.md), [HANDOFF](../../../../CODEX-HANDOFF.md), [MASTER](../../00-MASTER-PLAN.md) §§10–13, 28–29, 38–39, 43–44.
- [Album Index](../../06-ALBUMS.md), [Album Detail](../../07-ALBUM-DETAIL.md) §§25–26, 32–35, [Migration QA](../../14-MIGRATION-QA.md) §§2–3, 11, 21.
- [Content Contract](../CONTENT-SCHEMA-CONTRACT.md), [Locale Contract](../LOCALE-METADATA-CONTRACT.md), [P1A result](../../../../P1A-RESULT.md), [Plan](../V2-IMPLEMENTATION-PLAN.md), [Task Protocol](../IMPLEMENTATION-TASK-PROTOCOL.md).
- Executable owners: [models](../../../../src/content/models.ts), [shared](../../../../src/content/shared.ts), [assets](../../../../src/content/assets.ts), [validation](../../../../src/content/validation.ts), [catalog](../../../../src/content/catalog.ts).

아래의 U1–U4, A, L1, W1은 **P1B source ledger의 식별자**다. 이번에 사용자 확인이나 원본 검사를 다시 했다는 뜻이 아니다.
P1B의 title/발매일/떨기나무/final-print 확인을 그대로 보존한다. 원본 artwork, 판매처, 음원 URL은 이번에 재조회하지 않았다.
문서 검토 기준과 source snapshot은 위 시각/commit으로 고정한다. 이후 날짜가 달라지면 발매 상태를 별도 확인한다.

| 구분 | 의미 |
|---|---|
| CONFIRMED SOURCE | P1B에 확인 근거가 보존된 값. 같은 질문을 사용자에게 반복하지 않는다 |
| P1C DRAFT | 그 사실을 구조화하거나 새로 제안한 문구/ID/역할 표기. 아직 edition review/등록 완료가 아니다 |
| DEFERRED | 현재 후보에서 생략하지만 source ledger/요구사항은 보존하는 항목 |
| UNSUPPORTED FIELD | 현재 타입에 전용 필드가 없음. 임의 필드 추가나 다른 필드로의 오입력을 하지 않는다 |

## 3. Identity, facts and publication mapping

| P1A field / logical output | 후보 값 | 근거·판정 |
|---|---|---|
| `kind` | `album` | P1B A / U1 |
| `id` | `album:ji-young-hee-ryu-haegeum-sanjo-2026` | P1B stable ID 후보 + P1A namespace. P1C 추천, 등록 안 함 |
| `slug` | `ji-young-hee-ryu-haegeum-sanjo-2026` | L1 permanent ID 보존. 제목/번역 변경으로 재생성하지 않음 |
| 미래 KO logical path | `/album/ji-young-hee-ryu-haegeum-sanjo-2026` | P1A adapter가 공개 eligible record에서 파생. 저장 필드/현재 route가 아님 |
| `category` | `sanjo` | U1 / A. 유파명은 별도 enum/visualMode로 추가하지 않음 |
| `release.date` | `{ "precision": "day", "value": "2026-09-08" }` | U2 CONFIRMED SOURCE. 판매처 날짜를 새로 추정하지 않음 |
| `release.status` | `upcoming` | 위 검토 기준 시각에서의 후보. 9월 8일 도래만으로 publication/오디오/배포를 자동 변경하지 않음 |
| `publication` | `{ "status": "draft" }` | 이번 작업은 매핑 검토. 발매일을 `publishAt`으로 복사하거나 `published`로 채우지 않음 |
| `productNumber` | `JEC-0528` | P1B A spine 판독 |
| `content.ko.value.title` | `조윤경 해금산조 – 지영희류` | U1 그대로, 대시/띄어쓰기 보존 |
| `content.ko.value.summary` | 아래 §4의 짧은 사실 기반 초안 | P1C DRAFT; 웹 편집문/metadata 검토 필요 |
| `content.en` | 생략 | 인쇄 EN 제목만으로 전체 EN edition을 만들지 않음 |
| 연주자 | `credits`의 해금 / 조윤경 | `Album.artist`는 없으며 새 Person schema를 만들지 않음 |
| `related`, `links` | 생략 | P1B J의 후보는 관계 확정 전. 판매처를 streaming/press로 오분류하지 않음 |

## 4. KO copy, provenance and review

추천 summary 초안:

> 해금 연주자 조윤경의 지영희류 해금산조 음반. 긴산조와 짧은산조를 여섯 트랙에 담았다.

근거는 P1B B의 연주/분류/구성이다. 판매처 소개문을 복사하지 않았고, 녹음 과정·연주 평가·현재 직함을 새로 주장하지 않는다.
발매 상태는 별도 `release`에서 다루므로 소개문에 시점에 따라 낡는 “발매 예정”을 넣지 않는다.

추천 cover alt 초안:

> 조윤경 해금산조 – 지영희류 음반 패키지 앞면

P1B F의 front 역할만 설명한다. 이번에 이미지를 보지 않고 색상·인물 자세·장식을 추가하지 않았다.
실제 사용할 crop/이미지와 함께 최종 alt를 검토한다.

| Copy field | 이번 후보 | 이후 조건 |
|---|---|---|
| `summary` | 위 두 문장 | 사용자의 문구/내용 검토 후 해당 edition의 출처·author·review를 실제 근거로 기록 |
| `story` | 생략 | P1B가 확인한 booklet P2–P3 원문을 확보·전사·검토한 뒤, Album Detail의 2–4 짧은 문단으로 편집 검토 |
| `artistNote` | 생략 | booklet P4 ALBUM NOTE 원문의 발화 주체/문구를 확인. 원문 없이 1인칭 작가노트를 만들지 않음 |
| `subtitle`, `description`, `seo` | 생략 | 중복 문구/추측 SEO를 추가하지 않음. 미래 기본 metadata는 검토된 title/summary 사용 |
| credit `biography`, `portrait` | 생략 | 현재 직함 충돌과 별도 사진 crop/용도 검토를 앨범 필수 사실에 섞지 않음 |
| 모든 `en` edition | 생략 | 정식 영문 트랙·credit·summary·alt 검토는 EN 공개 전 별도 단위 |

아래 문서 후보는 Codex가 조합한 검토용 자료이므로 **모든 edition을 `source: machine-assisted`, `status: draft`**로 표시한다.
개별 인쇄 사실의 CONFIRMED SOURCE 상태가 취소되는 것은 아니다. 구조화된 edition에 사람의 authored/reviewed 근거를
임의로 부여하지 않기 위한 구분이다. `provenance.author`는 실제 P1C 작업 주체 `Codex (P1C mapping draft)`이며
`sourceRef`는 이 문서와 P1B 항목으로 이어지는 아래 식별자다. `review` 객체/가짜 reviewer/검토 날짜는 넣지 않는다.

| `sourceRef` | 해석 |
|---|---|
| `p1c:ji-young-hee-sanjo:ko-copy` | 이 절 summary + P1B U1/B의 제목·구성 |
| `p1c:ji-young-hee-sanjo:track-01` … `track-06` | §5의 각 행 + P1B E / evidence `printedTracks` |
| `p1c:ji-young-hee-sanjo:credit-*` | §6의 해당 stable ID 행 + 그 출처 |
| `p1c:ji-young-hee-sanjo:cover-alt` | 위 alt 초안 + P1B F의 front 설명 |
| `p1b:ji-young-hee-sanjo:web-front` | §7의 측정 hash를 가진 source inventory 항목. 실제 master 저장소의 존재를 주장하지 않음 |

P1C 매핑 결과 승인, edition 검토 완료, asset 용도 승인, publication 및 배포는 각각 다르다.
후속 작업이 승인되어도 초안 문구를 자동으로 authored/reviewed로 바꾸지 않는다.

## 5. Tracks and printed duration boundary

제목 정책은 **인쇄된 짧은 장단명 그대로**다. 앨범 제목이 유파 맥락을 제공하며 판매처의 긴 접두어를 중복하지 않는다.
stable track ID는 영문 공식 제목이 아닌 내부 식별자다. 최초 등록 후 번호/제목이 바뀌어도 ID를 자동 재생성하지 않는다.

| number | proposed `id` | `content.ko.value.title` | 인쇄 표기 | 산술 환산 초 — 감사용 |
|---|---|---|---|---|
| 1 | `jyh-2026-track-01` | 진양 | 12:51 | 771 |
| 2 | `jyh-2026-track-02` | 중모리 | 09:49 | 589 |
| 3 | `jyh-2026-track-03` | 중중모리 | 03:06 | 186 |
| 4 | `jyh-2026-track-04` | 굿거리 | 02:20 | 140 |
| 5 | `jyh-2026-track-05` | 자진모리 | 02:43 | 163 |
| 6 | `jyh-2026-track-06` | 짧은산조 | 12:06 | 726 |

근거: P1B E / A back / L1 / evidence `printedTracks`. 합계 **2,575초 = 42:55**, 실제 음원 decode 결과가 아니다.

**`durationSeconds`는 이번 후보에서 생략한다.** 현재 Content Contract는 measured duration을 지원한다고 명시하지만
P1B 증거는 printed duration이다. 타입/validator의 양수 검사는 측정 출처를 증명하지 않는다. 인쇄 시간을 실측 시간으로
승격하지 않고 이 표에 보존한다. 실제 길이를 검증하거나, 인쇄 길이의 저장 의미/출처를 별도 계약 검토로 결정한 뒤 사용한다.
이 차이는 KO draft를 막지 않으며 최종 트랙 시간 표시 전에 해소한다. 이번에 schema를 확장하지 않는다.

모든 `source` 후보: `{ "status": "unavailable", "reason": "V2 공개 음원 범위와 실제 재생 검증이 완료되지 않았습니다." }`.
`unavailable`은 파일 부재나 미래 재생 불가능의 판정이 아니다. 현재 V2 기능 상태이며 재생 일정을 약속하지 않는다.
P1B의 6개 MP3 URL은 감사에 보존하고 이번 후보의 audio asset/runtime에는 등록하지 않는다.
HTTP 206은 곡 연결·전체 길이·청취·CORS·seek·모바일·공개 범위의 증거가 아니다. 타이머/playing 상태를 만들지 않는다.
title track 지정과 track note는 미확정이므로 생략한다.

## 6. Credits mapping

`Credit.content.ko.value`의 `name`/`role`로 매핑한다. 이름은 확인값이며 한국어 역할 표기와 표시 순서는 P1C 추천 초안이다.
타입은 같은 이름을 여러 role 행에 쓰는 것을 허용한다. 아래 8개 행으로 녹음·믹싱·마스터링을 각각 추적한다.

| proposed `id` | `name` | `role` | Source |
|---|---|---|---|
| `jyh-2026-credit-haegeum` | 조윤경 | 해금 | P1B B / U1 / A front·P5 |
| `jyh-2026-credit-janggu` | 이영섭 | 장구 | P1B B / A P6 |
| `jyh-2026-credit-producer` | 조윤경 | 프로듀싱 | P1B B / A back / W1 |
| `jyh-2026-credit-recording` | 떨기나무 | 녹음 | U3 우선. EUM SOUND로 치환하지 않음 |
| `jyh-2026-credit-mixing` | 떨기나무 | 믹싱 | U3 |
| `jyh-2026-credit-mastering` | 떨기나무 | 마스터링 | U3 |
| `jyh-2026-credit-distribution` | 조은뮤직 | 유통 | P1B B / A back |
| `jyh-2026-credit-design` | Soul.P | 디자인 | P1B B / A back / L1. HOME의 Sou.P 표기로 교정하지 않음 |

이영섭 영문명, 떨기나무 영문명, 엔지니어 개인명, 현재 직함은 추정하지 않는다. 인쇄 album credit과 사이트 제작자 서명은 별개다.

## 7. Minimal asset reference and deferred features

최소 KO draft의 필수 `presentation.cover`에 **front 한 건**만 참조하는 안이다. P1B의 15개 후보를 일괄 등록하지 않는다.

| Field | 추천 후보 / 근거 |
|---|---|
| `presentation.cover.asset` | `{ "id": "asset:jyh-2026-cover-front", "kind": "image" }` |
| `presentation.cover.role` | `cover` |
| `presentation.cover.alt` | §4의 KO draft, EN 생략 |
| `presentation.cover.aspectRatio` | `{ "width": 2048, "height": 1834 }` — source pixel 비율, 실물 mm/최종 crop 아님 |
| `AssetRecord.id` / `kind` | 위 참조와 같은 ID / `image` |
| `AssetRecord.lifecycle` | `provisional` — P1B 0 approved 상태 보존 |
| `AssetRecord.masterRef` | `p1b:ji-young-hee-sanjo:web-front` — 파생 WebP inventory의 opaque identity, 고해상도 master 존재 주장 아님 |
| `AssetRecord.runtime` | 생략. 파일을 가져오거나 제공 URL을 결정하지 않았음 |
| P1B source identity | `web/front.webp`, 2048×1834, 251,940 bytes, WebP RGB |
| P1B SHA-256 | `c21f884f8a1a1dc12f65de7d31483d515136ccb8e08ad0ecbeb5c47087906890` |

위 크기/hash는 P1B 측정 기록의 재사용이다. 실제 원본 파일을 이번 Mac에서 다시 측정한 결과가 아니다.
draft에서 runtime 없는 참조는 현 validator로 표현 가능하다. 미래 공개용 consumer는 runtime 실재·용도·lifecycle을 확인해야 한다.
`validateCatalog()`의 통과만으로 asset이 approved가 되지 않는다.

| 항목 | 이번 최소 후보 / 후속 조건 |
|---|---|
| mobile asset/crop | 생략. 실제 front를 검토한 뒤 결정; 임의 정사각 crop이나 legacy HOME 배경을 대체물로 쓰지 않음 |
| `featured`, `order` | 생략. HOME 선정/목록 순위는 이번 사실 매핑과 별개 |
| `packageVisuals`, `object3d` | 생략. 3D 실측/면 배정/Blender/Tray gate 그대로 유지 |
| `booklet` / download | 생략. P1B의 viewer 7개는 전체 물리 페이지 수 확인과 다름. 향후 이미지 순서·alt·가독성·PDF 입력 검토 |
| CD artwork | 참조 안 함. 최종 인쇄 `Ryua` 원형 보존과 교정 파생본의 선택은 CD 사용 전 결정 |
| streaming links | 생략. 확인된 플랫폼 URL이 없음 |
| related works | 생략. 인접 legacy album이나 이름이 비슷한 공연을 자동 연결하지 않음 |

이 생략은 **이번 draft의 크기 제한**이다. Album Detail의 Story/Tracks/Booklet/Credits/Related 및 3D·오디오 요구를
완료/폐기/면제 처리하지 않는다. 최종 페이지 품질과 release readiness는 별도 gate다.

## 8. Unsupported or intentionally unmapped information

| Source fact / candidate | 현 스키마 판단 / 보존 위치 |
|---|---|
| Barcode `8809051667901` | 전용 필드 없음. P1B B/evidence에 보존; `productNumber`나 ISBN에 넣지 않음 |
| Printed total 42:55 / 각 인쇄 길이 | §5에 보존. 합계 필드 추가나 `durationSeconds` 실측 위장 없음 |
| Title track | 미확정, 전용 필드 없음. 1번을 자동 지정하지 않음 |
| `℗&© 2026 CHO YOUN KYOUNG` / label | 전용 필드 없음. P1B B 보존. 유통사를 원반 제작 label로 바꾸지 않음 |
| 산조 세부 grouping / 유파 전용 필드 | 제목과 감사에서 맥락 보존. 새 genre enum/track grouping schema는 이번에 만들지 않음 |
| Physical dimensions / geometry profile | 해당 앨범 실측 없음. 이미지 비율이나 legacy model 단위를 mm로 등록하지 않음 |

현재 최소 draft는 **스키마 변경 없이 표현 가능**하다. 실측 시간과 인쇄 시간의 구분, barcode 등 선택 필드의 확장은
실제 소비 요구가 있을 때 별도 owner review로 결정한다. 필드가 없다고 확인 사실을 감사에서 삭제하지 않는다.

## 9. Document-only candidate

아래 JSON은 **문서 예시 하나**이며 `ContentCatalog` shape 검토에만 사용한다. 빈 다른 domain 배열은 이 단일 앨범
검토 컨테이너의 범위다. 기존 catalog를 대체하거나 다른 작품을 삭제하라는 지시가 아니다.
실행 가능한 production module, runtime data 파일 또는 새 route를 만들지 않는다.

<!-- P1C_DOCUMENT_CANDIDATE_START -->
```json
{
  "albums": [{
    "kind": "album",
    "id": "album:ji-young-hee-ryu-haegeum-sanjo-2026",
    "slug": "ji-young-hee-ryu-haegeum-sanjo-2026",
    "publication": {"status":"draft"},
    "content": {"ko":{"source":"machine-assisted","status":"draft","value":{"title":"조윤경 해금산조 – 지영희류","summary":"해금 연주자 조윤경의 지영희류 해금산조 음반. 긴산조와 짧은산조를 여섯 트랙에 담았다."},"provenance":{"sourceRef":"p1c:ji-young-hee-sanjo:ko-copy","author":"Codex (P1C mapping draft)"}}},
    "category": "sanjo",
    "release": {"status":"upcoming","date":{"precision":"day","value":"2026-09-08"}},
    "productNumber": "JEC-0528",
    "tracks": [
      {"id":"jyh-2026-track-01","number":1,"content":{"ko":{"source":"machine-assisted","status":"draft","value":{"title":"진양"},"provenance":{"sourceRef":"p1c:ji-young-hee-sanjo:track-01","author":"Codex (P1C mapping draft)"}}},"source":{"status":"unavailable","reason":"V2 공개 음원 범위와 실제 재생 검증이 완료되지 않았습니다."}},
      {"id":"jyh-2026-track-02","number":2,"content":{"ko":{"source":"machine-assisted","status":"draft","value":{"title":"중모리"},"provenance":{"sourceRef":"p1c:ji-young-hee-sanjo:track-02","author":"Codex (P1C mapping draft)"}}},"source":{"status":"unavailable","reason":"V2 공개 음원 범위와 실제 재생 검증이 완료되지 않았습니다."}},
      {"id":"jyh-2026-track-03","number":3,"content":{"ko":{"source":"machine-assisted","status":"draft","value":{"title":"중중모리"},"provenance":{"sourceRef":"p1c:ji-young-hee-sanjo:track-03","author":"Codex (P1C mapping draft)"}}},"source":{"status":"unavailable","reason":"V2 공개 음원 범위와 실제 재생 검증이 완료되지 않았습니다."}},
      {"id":"jyh-2026-track-04","number":4,"content":{"ko":{"source":"machine-assisted","status":"draft","value":{"title":"굿거리"},"provenance":{"sourceRef":"p1c:ji-young-hee-sanjo:track-04","author":"Codex (P1C mapping draft)"}}},"source":{"status":"unavailable","reason":"V2 공개 음원 범위와 실제 재생 검증이 완료되지 않았습니다."}},
      {"id":"jyh-2026-track-05","number":5,"content":{"ko":{"source":"machine-assisted","status":"draft","value":{"title":"자진모리"},"provenance":{"sourceRef":"p1c:ji-young-hee-sanjo:track-05","author":"Codex (P1C mapping draft)"}}},"source":{"status":"unavailable","reason":"V2 공개 음원 범위와 실제 재생 검증이 완료되지 않았습니다."}},
      {"id":"jyh-2026-track-06","number":6,"content":{"ko":{"source":"machine-assisted","status":"draft","value":{"title":"짧은산조"},"provenance":{"sourceRef":"p1c:ji-young-hee-sanjo:track-06","author":"Codex (P1C mapping draft)"}}},"source":{"status":"unavailable","reason":"V2 공개 음원 범위와 실제 재생 검증이 완료되지 않았습니다."}}
    ],
    "credits": [
      {"id":"jyh-2026-credit-haegeum","content":{"ko":{"source":"machine-assisted","status":"draft","value":{"name":"조윤경","role":"해금"},"provenance":{"sourceRef":"p1c:ji-young-hee-sanjo:credit-haegeum","author":"Codex (P1C mapping draft)"}}}},
      {"id":"jyh-2026-credit-janggu","content":{"ko":{"source":"machine-assisted","status":"draft","value":{"name":"이영섭","role":"장구"},"provenance":{"sourceRef":"p1c:ji-young-hee-sanjo:credit-janggu","author":"Codex (P1C mapping draft)"}}}},
      {"id":"jyh-2026-credit-producer","content":{"ko":{"source":"machine-assisted","status":"draft","value":{"name":"조윤경","role":"프로듀싱"},"provenance":{"sourceRef":"p1c:ji-young-hee-sanjo:credit-producer","author":"Codex (P1C mapping draft)"}}}},
      {"id":"jyh-2026-credit-recording","content":{"ko":{"source":"machine-assisted","status":"draft","value":{"name":"떨기나무","role":"녹음"},"provenance":{"sourceRef":"p1c:ji-young-hee-sanjo:credit-recording","author":"Codex (P1C mapping draft)"}}}},
      {"id":"jyh-2026-credit-mixing","content":{"ko":{"source":"machine-assisted","status":"draft","value":{"name":"떨기나무","role":"믹싱"},"provenance":{"sourceRef":"p1c:ji-young-hee-sanjo:credit-mixing","author":"Codex (P1C mapping draft)"}}}},
      {"id":"jyh-2026-credit-mastering","content":{"ko":{"source":"machine-assisted","status":"draft","value":{"name":"떨기나무","role":"마스터링"},"provenance":{"sourceRef":"p1c:ji-young-hee-sanjo:credit-mastering","author":"Codex (P1C mapping draft)"}}}},
      {"id":"jyh-2026-credit-distribution","content":{"ko":{"source":"machine-assisted","status":"draft","value":{"name":"조은뮤직","role":"유통"},"provenance":{"sourceRef":"p1c:ji-young-hee-sanjo:credit-distribution","author":"Codex (P1C mapping draft)"}}}},
      {"id":"jyh-2026-credit-design","content":{"ko":{"source":"machine-assisted","status":"draft","value":{"name":"Soul.P","role":"디자인"},"provenance":{"sourceRef":"p1c:ji-young-hee-sanjo:credit-design","author":"Codex (P1C mapping draft)"}}}}
    ],
    "presentation": {"cover":{"asset":{"id":"asset:jyh-2026-cover-front","kind":"image"},"role":"cover","alt":{"ko":{"source":"machine-assisted","status":"draft","value":"조윤경 해금산조 – 지영희류 음반 패키지 앞면","provenance":{"sourceRef":"p1c:ji-young-hee-sanjo:cover-alt","author":"Codex (P1C mapping draft)"}}},"aspectRatio":{"width":2048,"height":1834}}}
  }],
  "performances": [],
  "media": [],
  "press": [],
  "profiles": [],
  "career": [],
  "assets": [{"id":"asset:jyh-2026-cover-front","kind":"image","lifecycle":"provisional","masterRef":"p1b:ji-young-hee-sanjo:web-front"}]
}
```
<!-- P1C_DOCUMENT_CANDIDATE_END -->

## 10. Expected publication and locale behavior

| 조건 | 기존 계약에서의 예상 결과 |
|---|---|
| 위 draft 그대로 | semantic shape는 유효; public album index / content route catalog / prerender path 결과는 빈 배열 |
| `release.status`만 `released`로 변경 | publication draft는 그대로 제외. 발매와 웹 공개는 독립 |
| publication만 `published`로 잘못 변경 | reviewed KO와 public visual runtime 요건에 실패; 공개 selector가 오류를 전달 |
| 나중 KO의 실제 authored review·publication·asset gate와 template integration 완료, EN 없음 | KO만 공개, self canonical + ko/x-default, EN route/hreflang 없음. EN switch는 같은 KO 작품의 unavailable |
| 현재 등록되지 않은 후보 URL | 현재 앱에는 route 없음. 실제 문서 생성이나 공개 KO fallback이 생긴 것으로 설명하지 않음 |

KO edition이 공개 자격을 갖추면 공개 언어의 reviewed visual alt도 필수다.
현재 draft의 switch는 `unknown-route`다. **미래 공개 KO-only 작품**에서의 `translation-unavailable`과 구분한다.
이번 검증에서 가짜 reviewer나 승인된 실제 자산을 만들어 공개 성공 사례로 주장하지 않는다.

## 11. Remaining decisions and exact blocking points

| 시점 | 필요한 결정 / 입력 | 현재 작업·최소 draft 영향 |
|---|---|---|
| 후속 단일 draft 등록 전 | 이 매핑의 ID·KO 후보·초안 상태·생략 범위 검토 및 그 별도 작업 지시 | P1C 자체는 완료 가능. P1D/등록 실행은 아직 미승인 |
| KO 공개 전 | summary/alt/credit 역할 표기와 authored review 근거, publication 의도, 선택 cover의 실제 파일·공개 용도·크기/crop 검토 | 현재 draft 가능. 공개 전에는 필수 |
| Album Story / Artist Note 작성 전 | P2–P4의 읽을 수 있는 원문 또는 전사본. 근거 있는 발화/짧은 웹 문단으로 편집하기 위함 | 현재는 생략 가능. 실제 story/note 작성 시 필요 |
| 트랙 시간 표시 / 오디오 활성화 전 | 실제 곡·master·길이·공개 범위 및 브라우저/CORS/seek/모바일 검증; 인쇄 길이 저장 의미는 필요 시 별도 검토 | draft의 unavailable 가능. playable/실측 시간 주장 전에 필수 |
| EN 공개 전 | 공식 영문 트랙/이름/소개·alt와 검토 근거 | KO draft 비차단 |
| CD 사용 / 3D 제작 전 | Ryua 사용 정책, 이 앨범의 칼선/실측 및 tray·숨은 면 사진; Blender/Tray gate | KO draft 비차단. 해당 자산·제작 gate 전에 필수 |

이미 확정된 발매일·떨기나무·최종 인쇄본 여부는 다시 질문하지 않는다. 원본 확보/실측/사진 요청의 자세한 조건은
[P1B §L](JI-YOUNG-HEE-SANJO-SOURCE-AUDIT.md#l-user-information--asset-requests)에 보존돼 있다.
선택적 PDF/streaming/current biography의 누락은 최소 draft를 막지 않는다.

## 12. Validation, result and STOP

검증 명령·결과·범위 hash는 [P1C evidence](../../../../evidence/p1c/ji-young-hee-sanjo-ko-mapping-review.json),
일곱 항목 결과는 [P1C-RESULT](../../../../P1C-RESULT.md)에 기록한다.
문서 JSON을 추출한 ignored 검토 파일에 `satisfies ContentCatalog` 타입 검사와 기존 semantic/공개 제외 검사를 적용한다.
코드·라우팅·자산 변경이 없어 Full/브라우저/실제 Pages suite는 이번에 다시 실행하지 않는다. 이전 turn의 통과를 P1C 재실행으로 표시하지 않는다.

판정: **MAPPING REVIEW COMPLETE / REVIEW READY. 스키마 변경 없이 제한된 KO draft를 준비할 수 있다.**
publication, authored copy review, asset approval, production record, 실제 HTML/화면 및 품질 승인은 미완료다.
추천 다음 단위는 **P1D 후보 — 이 앨범의 비공개 KO draft record 한 건 등록**이며 사용자가 범위와 실행을 별도로 지정해야 한다.
P1D가 곧 공개 production 등록/route/template/asset 이관을 뜻하지 않는다.

**STOP. P1D 또는 실제 production record 등록으로 진행하지 않았다.**
