# P1B — 조윤경 해금산조 – 지영희류 Source Audit

감사일: 2026-09-05 KST. **AUDIT COMPLETE / REVIEW READY — STOP.**
판정: **READY WITH NON-BLOCKING GAPS** — 단일 KO record의 후속 작업을 설계할 사실·참조는 확보했다.
공개 release, EN edition, 3D production 또는 실제 migration이 승인/완료됐다는 뜻은 아니다.

## Scope / source ledger

목표는 한 앨범의 사실·출처·파일·누락·충돌을 구분하는 것이다. runtime record, schema, component,
asset 자체는 변경하지 않았다. 다른 앨범의 사실 감사, 복사/최적화/생성/편집, Blender, 배포는 제외한다.
산출물은 이 문서, 측정 evidence 및 HANDOFF의 상태 연결뿐이다. rollback은 이번 문서 변경만 되돌리며
기준 V2 commit `159133c3fec42d2c9c09e900482aa3e137fcee07`와 기존 기획을 보존한다.

우선순위는 V2 canonical planning → 사용자 확정 정보 → 승인 자료 → legacy factual data → old UI다.
판매처는 최신 공개 상태를 보조 확인하는 외부 자료이며 사용자 정정을 덮어쓰지 않는다.

| Ref | 확인한 source / 범위 | 신뢰·사용 경계 |
|---|---|---|
| V1 | [MASTER](../../00-MASTER-PLAN.md) §§10–13, 28, 38–39; [Legacy audit](../../01-CURRENT-SITE-AUDIT.md) §5 | 영구 slug 유지 후보, 사실 검증과 asset 선택 원칙. 이 앨범의 독립적인 approved metadata record는 V2에서 발견되지 않음 |
| V2 | [Album Index](../../06-ALBUMS.md), [Album Detail](../../07-ALBUM-DETAIL.md), [Migration QA](../../14-MIGRATION-QA.md), [Content Contract](../CONTENT-SCHEMA-CONTRACT.md), [Plan](../V2-IMPLEMENTATION-PLAN.md) PHASE 1, [Protocol](../IMPLEMENTATION-TASK-PROTOCOL.md), [P1A 결과](../../../../P1A-RESULT.md) | 모델·locale·lifecycle·Tray/STOP 계약. 예시 credits는 이 앨범의 사실 source가 아님 |
| U1 | 이번 사용자의 P1B 대상 지정 | 한글 앨범명과 단일 앨범 범위 확정 |
| U2 | 이번 대화: 9월 8일 발매 예정 확인 질문에 “확정됬다” | 2026-09-08 발매일 확정. 함께 물었던 다른 항목은 U3/U4로 별도 확인 |
| U3 | 이번 대화: 녹음·믹싱·마스터링 최종 표기 → “떨기나무” | 판매처 EUM SOUND보다 우선하는 정본 |
| U4 | 이번 대화: 현재 legacy 앨범 artwork → “최종 인쇄본과 동일” | 인쇄 artwork source의 최종본 여부 확인. V2 crop·텍스처 품질이나 별도 공개 사용 승인을 자동 부여하지 않음 |
| L1 | Legacy `src/data/albums.ts:346–429` | ID, 제목, 2026/coming-soon, 6 tracks, URLs, credits, 7 viewer refs. snapshot 아래 명시 |
| L2 | Legacy `docs/ALBUM-WORKFLOW.md` §§미등록 정보와 재생 검수 경계; `docs/ASSET-OPTIMIZATION-PLAN.md` §3 | 과거 releaseDate/streaming/PDF 미등록과 PNG→WebP 이력. 오래된 수치보다 현재 파일 측정 우선 |
| L3 | Legacy `src/components/album/packageGeometry.ts:6–28`, `src/components/hero/album/AlbumPackage3D.tsx:12`, `src/components/album/detail/AlbumDetailExperience3D.tsx` | 171/3000 비율과 모델 단위. 제조사 실측으로 사용 금지 |
| L4 | Legacy `src/components/album/detail/useAlbumAudio.ts:109–143` | source 없는 silent timer와 playable:true는 old UI 동작일 뿐 음원 사실이 아님 |
| L5 | Legacy `src/data/profile.ts:306`, media.ts / press.ts / performances.ts의 대상명·ID 검색 | 2023 관련 공연 이름 후보. 다른 앨범/공연 전체 감사는 하지 않음 |
| A | 아래 F의 15개 파일 전부 직접 열람·decode·측정 | U4로 최종 인쇄 자료임을 확인. 각 파일 SHA-256은 evidence에 기록 |
| W1 | [YES24 해당 상품](https://m.yes24.com/goods/detail/196025221), 2026-09-05 열람 | 9월 8일/예약판매, 6 tracks, 연주자·producer·distribution, EUM SOUND 표기 및 소개문 존재 확인. 판매처 오류 가능 |
| W2 | [MDN media crossOrigin](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/crossOrigin) | audio HTTP 응답과 브라우저 CORS 재생을 구분하는 기술 근거 |
| N1 | L1의 6개 R2 URL에 제한된 Range GET, 2026-09-05 21:17 KST | 실제 응답/부분 ID3 header 증거. 전체 음원 다운로드·청취·배포·권리 검증 아님 |

Legacy 읽기 전용 snapshot: `C:\cho-youn-kyoung`, main,
`239d18056d8b3df2cf9a5fd5509f897f85ed70ad`. 시작 시 clean. 원격 production 변경 없음.
L 계열 경로는 이 checkout 기준이며 재현 가능한 파일 목록/측정은
[evidence](../../../../evidence/p1b/ji-young-hee-sanjo-source-audit.json)에 보존한다.
V2 public에는 technical `spike/path-check.svg`만 있으며 실제 앨범 자산은 이관되지 않았다.
Legacy의 대상 앨범 디렉터리는 숨김/비추적 파일까지 조사했다. 최상위 artwork 디렉터리의 파일명 조사에서도
대상 앨범 master는 발견하지 못했다. 사용자의 다른 디스크/외부 저장소 전체를 검색한 것은 아니다.

상태 의미: **CONFIRMED**는 지정 source 또는 사용자로 확인한 사실, **LEGACY ONLY**는 legacy에만 존재,
**UNVERIFIED**는 정본/현재 상태 미검증, **CONFLICT**는 다른 표기 공존이다. Artwork에서 읽힌 표기와
실제 웹 서비스의 공개 승인, 인물의 현재 직함을 혼동하지 않는다.

## A. Canonical candidate record — 문서상의 후보, 등록 안 함

| 항목 | 후보 / 판단 | Source |
|---|---|---|
| kind / category | album / sanjo; Jeongak 아님 | U1, A front/track list |
| stable ID 후보 | `album:ji-young-hee-ryu-haegeum-sanjo-2026` | V2 namespace + L1 identity 조합. 아직 확정 ID 등록 안 함 |
| permanent slug 후보 | `ji-young-hee-ryu-haegeum-sanjo-2026` | L1 + V1 기존 ID 보존 원칙 |
| KO route 후보 | `/album/ji-young-hee-ryu-haegeum-sanjo-2026` | V2 contract. 실제 route 생성 안 함 |
| EN route 조건부 후보 | `/en/album/ji-young-hee-ryu-haegeum-sanjo-2026` | EN authored/reviewed edition 없으면 route/hreflang 미생성 |
| KO title | 조윤경 해금산조 – 지영희류 | CONFIRMED U1, A front/spine. 구두점은 사용자 지정 표기를 후보 정본으로 유지 |
| EN title | `CHO YOUN KYOUNG / HAEGEUM SANJO / Ji Young-hee Ryu` | CONFIRMED A front/P1. `/`는 인쇄 줄바꿈 설명용이며 새 title 문자 아님 |
| Artist | 조윤경 / Cho Youn Kyoung | CONFIRMED V1, A front/P5, W1. 인쇄에서는 대문자 |
| release | upcoming / day `2026-09-08` | CONFIRMED U2. 오늘 2026-09-05에는 released 아님 |
| publication | UNVERIFIED; 후속 이관 시 명시적 공개 지시가 없으면 draft | 제작·발매 일정과 V2 페이지 publication은 별도 |
| locale 입력 경계 | KO 원문 source 있음; structured copy 및 review 완료 전 draft. EN 제목만으로 EN edition 완성 처리 금지 | V2, I |

## B. Confirmed facts

| 사실 | 확인 값 | 근거 / 적용 경계 |
|---|---|---|
| 연주 / 분류 | 해금 조윤경, 지영희류 해금산조; 긴산조 + 짧은산조 | U1, A front/P2/P3/P5, W1 |
| release year/date | 2026 / 2026-09-08 | U2, W1. artwork의 ©2026만으로 발매일을 추론한 것이 아님 |
| Producer | 조윤경 / Cho Youn Kyoung | A back + W1 |
| Recording | 떨기나무 | U3 + A back; W1의 EUM SOUND는 채택하지 않음 |
| Mixing | 떨기나무 | U3 + A back |
| Mastering | 떨기나무 | U3 + A back |
| Distribution | 조은뮤직 / Joeun Music | A back의 Distribution 및 하단 표기, W1 |
| Design | Soul.P | A back + L1 + W1. 사이트 HOME의 Sou.P 서명과 동일 표기로 임의 교정하지 않음 |
| Percussion | 장구 이영섭 | A P6 + W1. W1에 Lee Youngsub 표기 있으나 공식 EN 이름의 사용자 review는 미확인 |
| Product number | JEC-0528 | A spine에서 직접 판독; L1 별도 필드는 없음 |
| Barcode | 8809051667901 | A back 직접 판독. EAN-13 check digit 1 계산 일치; 별도 스캐너 판독/벡터 파일 확인 아님 |
| Copyright/label | artwork에 ℗&© 2026 CHO YOUN KYOUNG 및 Joeun Music 유통 표기·로고 존재 | A back. 별도 원반 제작 label 법인/계약 또는 웹 권리 범위를 추정하지 않음 |
| 구성 | 6 tracks; 인쇄 표기 합계 42:55 | A back + L1, 합산 2,575초. audio 실측 총길이 아님 |
| Public story source | 긴/짧은산조의 전승·음색 차이와 두 해금 사용을 설명하는 KO 원문 있음 | A P2–P4. 이 문서는 원문을 새로 쓰거나 전체 전사하지 않음 |

## C. Unverified facts

- V2 페이지의 최초 publication 시점과 asset별 공개 사용 승인 기록.
- 녹음 날짜·장소, 담당 엔지니어 개인명, 마스터 버전 및 digital release 시각/지역/플랫폼 일정.
- title track 지정 여부. 첫 곡을 title track으로 추정하지 않는다.
- track별 공식 영문 제목; 파일명 로마자 표기는 official English가 아니다.
- 이영섭의 공식 EN 표기 review; producer/기술 credit EN 정본. 떨기나무와 EUM SOUND의 관계는 확인되지 않았다.
- 별도의 label 법인명, ISRC, 다운로드·스트리밍 공개 권리. barcode는 확인됐지만 이를 ISBN으로 저장하지 않는다.
- 고해상도 제작 master/칼선, 원본 사진·벡터 logo/barcode, booklet PDF의 외부 보관 위치.
- 새 단일 KO record의 최종 summary/story 필드 선택·전사 review. 원문 존재와 구조화된 authored/reviewed data는 다르다.

## D. Conflicts / source differences

| 항목 | 차이 | 판정 / 조치 |
|---|---|---|
| 기술 credits | A back/L1 떨기나무 ↔ W1 EUM SOUND | **RESOLVED FOR V2** U3: 떨기나무. 판매처 표기는 그대로 관찰 기록; 외부 수정/연락하지 않음 |
| 날짜 | L1은 coming-soon + 정확한 날짜 없음 ↔ W1 2026-09-08 | U2로 날짜 확정. 과거 데이터의 누락 보완이며 오늘 released로 바뀌는 것은 아님 |
| EN Ryu 표기 | front/P1/L1 `Ryu` ↔ CD 하단 `Ryua` | **CONFLICT**. 실제 최종 인쇄본 표기의 차이. 역사적 CD 이미지의 원형 보존과 V2용 교정 파생본 중 선택 필요; 이번 작업에서 수정 안 함 |
| 아티스트 약력 | P5는 現 단원·前 수석, W1은 현재 해금수석 | **CONFLICT / current bio UNVERIFIED**. P5는 인쇄 archive로 보존 가능하나 이를 현재 artist profile copy로 승격하지 않음 |
| track 제목 길이 | A/L1은 짧은 장단명; W1은 유파/긴산조 접두어 포함 | 표시 범위 차이. 순서·시간은 일치하며 KO canonical 축약/완전 제목 정책은 다음 record 작업에서 명시 |
| geometry | L3 기본 front/back은 정사각 모델; 실제 front/back image는 서로 다른 비정사각 비율 | old UI 값이 실물 치수라는 근거 없음. V2로 복사하지 않고 H의 실측 요청 |
| source 경로/크기 | L2 과거 PNG 7–8MB 설명 ↔ 현재 15 WebP, 4,558,698 bytes | L2 후반에 2026-08-31 PNG 제거 기록. 현재 파일 측정 우선; 없는 PNG/master를 있다고 기재하지 않음 |

## E. Track audit

KO 제목/시간 source는 **A back + L1**, W1의 6곡/시간도 일치한다.
모든 EN track title은 **missing / officially reviewed source 미확인**. 아래 URL은 원본 legacy 참조이며 V2에 등록하지 않았다.

| # | KO 인쇄 제목 | 인쇄 duration | Audio reference | Source availability / public state | Title track |
|---|---|---|---|---|---|
| 01 | 진양 | 12:51 | [01_jinyang.mp3](https://pub-dd5041e867ea448a9d025ebe26192631.r2.dev/jiyounghee/01_jinyang.mp3) | N1 206 / audio/mpeg / ID3; 공개 HTTP 접근 가능, V2 승인·전체 재생 미검증 | UNVERIFIED |
| 02 | 중모리 | 09:49 | [02_jungmori.mp3](https://pub-dd5041e867ea448a9d025ebe26192631.r2.dev/jiyounghee/02_jungmori.mp3) | N1 206 / audio/mpeg / ID3; 같은 경계 | UNVERIFIED |
| 03 | 중중모리 | 03:06 | [03_jungjungmori.mp3](https://pub-dd5041e867ea448a9d025ebe26192631.r2.dev/jiyounghee/03_jungjungmori.mp3) | N1 206 / audio/mpeg / ID3; 같은 경계 | UNVERIFIED |
| 04 | 굿거리 | 02:20 | [04_gutgeori.mp3](https://pub-dd5041e867ea448a9d025ebe26192631.r2.dev/jiyounghee/04_gutgeori.mp3) | N1 206 / audio/mpeg / ID3; 같은 경계 | UNVERIFIED |
| 05 | 자진모리 | 02:43 | [05_jajinmori.mp3](https://pub-dd5041e867ea448a9d025ebe26192631.r2.dev/jiyounghee/05_jajinmori.mp3) | N1 206 / audio/mpeg / ID3; 같은 경계 | UNVERIFIED |
| 06 | 짧은산조 | 12:06 | [06_short-sanjo.mp3](https://pub-dd5041e867ea448a9d025ebe26192631.r2.dev/jiyounghee/06_short-sanjo.mp3) | N1 206 / audio/mpeg / ID3; 같은 경계 | UNVERIFIED |

N1은 Range `bytes=0-65535` 요청 후 첫 chunk만 읽고 취소했다. 파일 전체를 저장하지 않았다.
응답에 Accept-Ranges: bytes가 있고, V2 preview Origin을 보냈을 때 Access-Control-Allow-Origin은 6개 모두 없었다.
이는 브라우저에서 CORS가 필요한 요청을 별도 검증해야 한다는 신호다. 일반 media의 no-cors 동작과
crossOrigin 지정 동작은 다르므로 HTTP 검사만으로 모든 재생이 실패한다고 단정하지 않는다(W2).
청취·decode duration·seek·정확한 곡 연결·모바일·Web Audio/CORS는 후속 Audio gate다.
당장 V2 플레이어용 approved playable로 승격하지 않으며, 원본/권리/재생 gate 미통과 시 unavailable로 표현한다.
L4의 fake timer는 감사 사실과 무관하고 V2 이관 금지다. MP3 URL의 존재는 음반 발매/유통 공개 증거가 아니다.

## F. Asset inventory — 실제 존재하는 15개 이미지

Base source path: `C:\cho-youn-kyoung\public\assets\albums\ji-young-hee-ryu-haegeum-sanjo-2026\`.
아래 경로는 이 base에 결합한다. 전부 WebP runtime/viewer 파생본이고 제작 master가 아니다.
모두 파일 decode 성공. 픽셀 크기는 실측이며 **DPI metadata는 모두 없음**; 이를 300dpi 또는 mm 실측으로 해석하지 않는다.
`opaque`는 RGB/alpha 채널 없음. CD만 RGBA alpha extrema 0–255다. 합계 **4,558,698 bytes**.

| source path | px / bytes | Alpha | 현재 확인 내용 / intended role | V2 lifecycle 후보 |
|---|---|---|---|---|
| web/front.webp | 2048×1834 / 251940 | opaque | 패키지 앞면, cover 및 front base-color 후보; non-square | provisional |
| web/back.webp | 2048×1814 / 369468 | opaque | 뒤판, tracks/credits/copyright/barcode/유통 logo; back texture | provisional |
| web/spine.webp | 117×2048 / 23158 | opaque | 책등, JEC-0528/제목/logo; 방향과 두께 실측 필요 | provisional |
| web/interior-booklet.webp | 1703×1515 / 406498 | opaque | 왼쪽 속판 인쇄 무늬 후보; booklet page 자체와 별개 | provisional |
| web/interior-tray.webp | 1703×1515 / 610498 | opaque | 원형 감사문이 인쇄된 속판. **투명 tray 사진/geometry가 아님** | provisional |
| web/cd-label.webp | 1366×1366 / 168512 | 0–255 | CD 인쇄면·중앙홀/외곽 투명; Ryua 표기 차이와 외곽 계단 현상 | provisional; 교정된 신작 texture 용도는 아래 G 참조 |
| web/home-hero-desktop.webp | 2560×1440 / 109032 | opaque | 종이/선 분위기 배경. 기존 HOME composition을 V2로 계승하지 않음 | provisional |
| web/home-hero-mobile.webp | 1440×2560 / 88682 | opaque | 세로형 분위기 배경 후보. 별도 mobile artwork/crop 승인은 없음 | provisional |
| viewer/booklet-01.webp | 1573×1491 / 725154 | opaque | P1 표지 / booklet-cover texture 후보 | provisional |
| viewer/booklet-02.webp | 1573×1491 / 326114 | opaque | P2 유파/전승 개요 KO 본문 | provisional |
| viewer/booklet-03.webp | 1573×1491 / 315844 | opaque | P3 긴산조와 짧은산조 KO 설명 | provisional |
| viewer/booklet-04.webp | 1574×1488 / 344928 | opaque | P4 ALBUM NOTE, 본문은 KO; 두 해금/음색 선택 | provisional |
| viewer/booklet-05.webp | 1574×1488 / 292732 | opaque | P5 연주자 사진/KO 약력, EN 이름. 현재 약력과 분리 | provisional |
| viewer/booklet-06.webp | 1573×1491 / 256038 | opaque | P6 장구 이영섭 사진/KO 소개 | provisional |
| viewer/booklet-07.webp | 1573×1490 / 270100 | opaque | P7 지영희 소개/website QR. QR decode나 역사 문장 검증은 안 함 | provisional |

### 없는 항목 / embedded-only

- 제작 원본 PNG/PSD/AI/인쇄 PDF, 전체 펼침 칼선, 재단/bleed 없는 고해상도 master: 현재 조사 범위에서 **MISSING**.
- booklet PDF/downloadUrl: L1 등록 없음, 대상 폴더에도 없음. 기존 7 images는 7개의 viewer 단위이며
  실제 종이의 총 페이지 수·뒷면·접착면까지 전부라는 결론은 내리지 않는다.
- barcode와 Joeun Music logo: back/spine에 embedded; 별도 투명/벡터 자산 없음. 추출·재작성하지 않았다.
- Streaming artwork: front는 후보지만 비정사각; 배급용 정사각 고해상도 artwork나 플랫폼 확정 URL 미확인.
- Mobile cover crop: 별도 파일/구도 승인 없음. 세로 HOME 배경이 cover crop을 대신하지 않는다.
- Normal/roughness/displacement maps, CD 반사면·투명 hub·tray 실물 사진, 위/아래/힌지/접착부 사진: **MISSING**.
- Source/master를 V2에 복사하지 않았다. 후속 등록에서도 absolute private source 경로는 공개 runtime 데이터에 넣지 않는다.

## G. Asset lifecycle / production readiness

현재 후보 **15 provisional / 0 approved**. 파일 존재나 U4의 최종 인쇄본 확인은 V2의 용도별 품질 승인과 다르다.
provisional은 후보 원본을 교체 가능하게 쓰는 상태이며 무조건 버려야 한다는 뜻은 아니다.

- Front/back/booklet은 현재 파일로 source 확인과 visual prototype 검토를 계속할 수 있다. 확대 가독성,
  texel density, aspect ratio, 모바일 crop 및 공개 용도 검토 후 해당 hash/역할에 대해서만 approved로 승격한다.
- CD의 `Ryua`는 최종 인쇄 자료에 실제 있는 표기다. 역사적 인쇄물 기록으로 원형을 유지하는 선택과
  교정된 V2 texture를 만드는 선택을 구분한다. **새 교정 texture가 필요한 용도라면 기존 CD는 replace-required**로
  분리하고 source를 요청한다. 이번 감사에서 원본을 몰래 교정하거나 원형 기록을 금지하지 않는다.
- 현시점 코드 schema나 asset registry의 lifecycle을 실제로 변경하지 않았다. 위 상태는 용도 검토를 위한 audit 후보다.
- 분위기 배경은 AI/editorial 후보를 허용하되 기존 파일의 생성 여부를 시각만으로 판정하지 않는다.
  인물/공연/사실 archive 자료는 authentic source를 유지하고 생성물로 대체해 기록처럼 보이게 하지 않는다.
- P5/P6의 인물 사진을 별도 공식 portrait로 잘라 쓰는 것은 별도 source·권리·crop 검토 대상이다.
  인쇄 페이지 자체를 기록하는 것과 홈페이지 artist identity image 승인도 별개다.

## H. 3D readiness — PARTIAL

READY = 해당 목적의 제작 입력이 확인됨, PARTIAL = 시각 source가 있으나 실측/물성/면 배정 검증 부족,
MISSING = 조사 범위에 입력 없음. **전체 3D 판정은 PARTIAL**, production 제작 착수 입력은 아직 부족하다.

| 입력 | 판정 | 근거 / 부족한 점 |
|---|---|---|
| Front texture | PARTIAL | 2048×1834, 원본 비율을 보존할 실측·crop 경계 필요 |
| Back texture | PARTIAL | 2048×1814, front와 비율 차이. 의도/재단 차이 확인 |
| Spine | PARTIAL | 이미지와 117/2048 비율 존재. L3의 171/3000은 같은 계열 비율이지 mm 두께가 아님 |
| Inside panels | PARTIAL | 두 flat artwork 존재. 내부 면 배정, hinge/접착 여백, 회전 방향 확인 필요 |
| CD face | PARTIAL | alpha 이미지 존재. 인쇄 표기 차이/경계 품질/인쇄 반경, 실제 hub/뒷면 자료 필요 |
| Booklet cover | PARTIAL | P1 있음. 두께·제본·내지 순서·뒷표지/접착면 확인 필요 |
| Physical dimensions / package thickness | MISSING | 이 앨범의 제조사 칼선/실측값 없음. legacy 정규화 수치나 다른 앨범의 141×125mm 등을 이식하지 않음 |
| Tray reference | MISSING | interior-tray.webp는 인쇄면. 투명 판·원형 recess·hub·support·lip·CD seating height의 실제 참조 없음 |
| Missing surfaces / angles | MISSING | 위/아래/옆/힌지/뒤집힌 열린 상태, CD 뒷면/받침 구조와 종이 단면 |

Blender 실행·채택 결정·geometry 작성 없음. 향후 mandatory Blender Capability Spike와 Tray Lab gate 유지.
CAD 사출물 복제 대신 자연스러운 투명 CD tray 인식이 목표지만, 없는 표면/치수를 old UI 숫자로 확정하지 않는다.

## I. Locale readiness

여기서 authored는 출처가 있는 문구, reviewed는 해당 범위의 확인 증거가 있는 상태다. 모든 locale field가
P1A Edition으로 입력됐다는 뜻은 아니며, metadata/alt/summary 없는 EN route를 자동 발행하지 않는다.

| Copy | KO | EN | 다음 사용 경계 |
|---|---|---|---|
| Album title / artist | authored / reviewed: U1 + U4/V1 | authored 인쇄 제목/이름 있음, U4로 인쇄본 일치 확인 | EN page summary·alt·review는 별도 |
| Release date / 기술 credits | reviewed: U2/U3 | 날짜는 공유 fact, 기술 credit 공식 EN은 missing | EUM SOUND를 번역으로 자동 채택 금지 |
| Track titles | authored 인쇄/legacy 일치, U4 | missing | 파일명으로 번역 생성 금지 |
| Album story / artist note | authored: P2–P4 + U4. 웹용 전사/필드 검토는 draft 단계 필요 | missing | ALBUM NOTE라는 영문 heading이 EN 본문을 의미하지 않음 |
| Producer / distribution / design | authored 인쇄·W1 상호 확인 | 일부 영문 명칭 존재, record edition review 미등록 | 이름 표기는 확인된 source만 유지 |
| Percussion / collaborator bio | authored: P6 + U4 | W1 Lee Youngsub만 존재, 공식 review UNVERIFIED; bio missing | 협연자 EN 확정 자료 요청 |
| Artist bio | authored archive P5; 현재 직함은 CONFLICT | 전체 copy missing | 인쇄 archive와 현재 소개 분리 |
| Image alt / mobile copy | legacy의 일반 page-number alt는 LEGACY ONLY; V2 authored alt는 draft/missing | missing | 실사용 이미지를 선택할 때 작성·review |
| SEO summary/description | legacy 한 줄 설명/판매처 소개가 후보, 최종 V2 copy는 draft/missing | missing | 자동 번역·판매처 전체 복사로 완료 처리 금지 |

EN 미완성은 KO record의 존재를 막지 않는다. eligible EN edition이 없으면 EN route/hreflang을 만들지 않고
language switch는 같은 KO 앨범에 머무르며 unavailable을 제공한다. 이번 감사는 새 번역을 작성하지 않았다.

## J. Related-content candidates — 등록 안 함

| 종류 | 후보 / source | 상태 |
|---|---|---|
| Performance | 2023 산조길, 하나－지영희류 해금산조 (L5 profile.ts:306) | LEGACY ONLY. 공연 ID/정확한 날짜·장소/이 음반과의 직접 관계 미확정 |
| Media | 이 앨범을 명시한 항목은 legacy media.ts 대상명/ID 검색에서 없음 | UNVERIFIED; 아티스트 일반 영상은 자동 연결하지 않음 |
| Press | 이 앨범을 명시한 항목은 legacy press.ts 대상명/ID 검색에서 없음 | W1은 판매처이지 press review가 아님. 다른 유파 공연 기사를 잘못 연결하지 않음 |
| Album | L1 다음 레코드인 한범수류 앨범과 기존 adjacent UI 연결 | 같은 아티스트의 discography 후보일 뿐 curated relation 승인 아님. 그 앨범의 사실 감사/등록은 안 함 |

## K. Missing information / blocking boundary

핵심 날짜·기술 credits·인쇄본 여부는 U2–U4로 해소됐다. 남은 gap을 종류별로 구분한다.

- **단일 KO record 초안 이관:** 필수 title/category/date/cover 참조와 tracks/credits source가 있어 작업 가능.
  publication과 locale review를 임의로 approved/published로 채우지 않는다.
- **공개 product release 전:** 선택한 runtime asset/KO summary·alt·publication의 명시적 검토,
  CD `Ryu/Ryua` 사용 정책, 최신 소개에 쓸 직함, audio 공개 범위·재생 gate가 필요하다.
  선택하지 않는 선택적 CD reader/audio/bio/PDF는 unavailable/미제공으로 남길 수 있다.
- **EN 공개 전:** authored/reviewed title·summary·필요한 중첩 copy/alt와 이름 정본 필요. KO 작업을 막지는 않음.
- **3D 제작 전:** 이 앨범 실측·면 배정·tray/두께/숨은 면 reference 필요. generic old model값은 대체 source가 아님.

## L. User information / asset requests

아래는 요청 목록이며 업로드·편집·작업 착수 승인을 의미하지 않는다. 이미 확인된 U2–U4를 다시 묻지 않는다.

| 요청 / 시점 | 무엇·왜 / 최소 요구사항 | 현재 P1B 또는 후속 작업 영향 | 나중 교체 |
|---|---|---|---|
| REQUIRED BEFORE 3D | 최종 인쇄 칼선/제작 PDF 또는 자를 댄 실물 사진. 앞·뒤·책등 W/H, 닫힌 두께, 종이/트레이/CD/북클릿 두께를 mm로 확인 | 감사 완료와 KO 초안은 가능; 정확한 package production 입력 부족 | 참조/measurement profile로 교체 가능, 이미 만든 geometry에는 재검증 필요 |
| REQUIRED BEFORE TRAY LAB PRODUCTION | CD를 뺀 열린 tray 정면·사선·옆면, CD 장착 높이/허브/립/지지부와 hinge·위/아래 사진. 반사를 읽을 수 있는 조명, 과도한 보정 없이 촬영 | H의 MISSING 해소용. Blender/Tray 착수는 별도 승인 | 가능, 구조 변경 시 owner geometry gate 다시 검토 |
| RECOMMENDED BEFORE VISUAL PROTOTYPE | 앞/뒤/책등/속판/북클릿 고해상도 무손실 원본과 trim/bleed 표시. 기존 WebP보다 실제 디테일이 많고 최대 표시 크기에서 글씨가 선명할 것; 단순 업스케일 불필요 | 현재 파일로 provisional 구성 검토 가능; 확대 품질 승인 전 원본 유리 | content/asset refs로 교체, 비율·crop·alt 재검토 |
| BEFORE CD PUBLIC USE | 최종 인쇄 CD의 Ryua를 archive 그대로 보존할지, 교정한 V2 파생 artwork를 쓸지 결정. 후자면 승인된 Ryu 원본과 깨끗한 alpha edge | 일반 KO record를 막지 않음; 교정 texture 공개에는 replace-required | 가능. 이번 단계에서 image edit 안 함 |
| BEFORE AUDIO ENABLEMENT | 현재 6 MP3의 곡 연결·master version·인쇄 duration, 전체/미리듣기 허용 범위와 서비스 URL 정책 확인 | audit에는 충분; 공개 player는 source/브라우저 gate 전 unavailable 가능 | registry 교체 가능, 재생·CORS·seek 검증 필요 |
| BEFORE EN PUBLICATION | 공식 track EN, collaborator EN, KO story의 authored/reviewed EN와 reviewer 정보 | KO 초안은 계속 가능; EN route만 미제공 | locale edition만 교체/추가 |
| BEFORE CURRENT BIO USE | 현재 직함을 확인한 짧은 공식 약력 | 인쇄 booklet archive와 KO album 기본 사실에는 비차단; 현재 profile 소개에만 필요 | copy 참조/edition 수정 |
| OPTIONAL DOWNLOAD / STREAMING | 실제 booklet PDF와 다운로드 승인, 공식 플랫폼 앨범 URL, 정사각 streaming artwork. PDF는 페이지 순서·텍스트 가독성 확인 | 없으면 다운로드/streaming 기능 미제공. 발매일 확정과 별개 | ref 추가로 가능 |
| OPTIONAL LOGO/BARCODE / MOBILE | 해당 음반용 승인 벡터/투명 로고·barcode 원본, mobile cover crop 가이드 | embedded 인쇄판으로 prototype은 가능. 별도 추출/생성 안 함 | asset/use 참조로 가능 |

## M. Migration readiness

**READY WITH NON-BLOCKING GAPS.**

이유: 사용자 확정 title/date/기술 credits, 최종 인쇄본 source, 6 tracks/시간, producer·장구·product number·barcode,
사용 가능한 cover reference 후보가 있다. 누락 EN·PDF·3D·streaming/title-track 지정은 최소 KO record의 필수 입력이 아니다.
다만 이 판정은 **단일 KO record의 제한된 후속 작업 준비도**다. V2 publication과 locale review/asset approval은
그 작업에서 명시적으로 결정해야 하며, 결정 전 draft를 유지한다. 전체 공개 앨범 경험 또는 3D가 READY인 것은 아니다.

추천 다음 단위는 **Single Album KO Record Mapping Review**: 이 감사의 확인값을 P1A 필드에 어떻게 매핑할지,
summary 원문 범위·alt·draft/publication·미제공 기능을 한 앨범만 대상으로 검토한다. 실제 data 이관은 그 범위가
명시적으로 승인된 뒤 진행한다. P1C나 다음 구현 단위의 이름·범위를 이 문서로 자동 확정하지 않는다.

## Validation / files / STOP

- 15/15 이미지 decode·dimensions/format/alpha/bytes/SHA-256 및 시각 열람 완료; 실제 자산 수정·복사 없음.
- 6/6 URL HTTP 206, audio/mpeg, Range, ID3 부분 header 확인. 청취/전체 decode/브라우저/모바일 검증 아님.
- 인쇄 6 duration 합계 42:55와 EAN-13 check digit 계산 확인; metadata fact review와 물리 품질 승인 구분.
- 사용자 U2–U4를 반영해 source 충돌 처리. 판매처 검색 결과가 없다는 사실을 미발매 증거로 사용하지 않음.
  추가 Aladin 상세 조회는 도구 접근 실패; 이를 성공적인 corroboration으로 계산하지 않는다.
- 감사/HANDOFF의 local link 47개, A–M 필수 항목, 15개 측정값/경로, source SHA-256 불변,
  HANDOFF 체크박스 207개 보존, 변경 범위 3개 파일 및 legacy HEAD/clean 상태 검증 통과. 코드 변경이 없는 문서 감사이므로
  npm install/type-check/lint/build/CI/browser suite는 실행하지 않는다. commit/push/deploy도 이 작업에 포함하지 않는다.
- 변경 파일: 이 문서, [measurement evidence](../../../../evidence/p1b/ji-young-hee-sanjo-source-audit.json),
  [CODEX-HANDOFF](../../../../CODEX-HANDOFF.md)의 P1B status/pointer.

**STOP. 실제 album record 등록, asset migration, P1C 및 다음 Phase를 시작하지 않았다.**
