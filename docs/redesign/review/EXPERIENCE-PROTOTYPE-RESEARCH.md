# EXPERIENCE PROTOTYPE / SUBPAGE RESEARCH

2026-09-08 · **연구 완료 / 설계 후보 / 시각 선택 대기**

이 문서는 이번 HOME 비교 실험과 후속 서브페이지 연구의 단일 기록이다. 연구에서 채택한 **원리**는
페이지 구현·공개 콘텐츠 승인·QUALITY APPROVED를 뜻하지 않는다. 실제 시작 SHA와 전달 결과는
[HANDOFF §26](../../../CODEX-HANDOFF.md#26-current-handoff-state)이 소유한다.

## 1. 현재 코드에서 확인한 경계

- `src/navigation/model.ts`의 상위 메뉴는 **HOME / WORKS / MEDIA / ABOUT / CONTACT**다.
  `albums`, `performances`, `album`, `performance`에서는 WORKS를 현재 영역으로 표시한다.
- `src/spike/fixtures.ts`에는 `/works/`, `/albums/`, `/performances/`, `/album/:id/`,
  `/performance/:id/`, `/media/`, `/about/`, `/contact/`의 KO/EN 계약이 있다. 실제 검증 레코드는
  `test-album`, `test-performance`이며, `src/routes/spike.tsx`는 여전히 **neutral routing fixture**다.
- 개발 Pages의 `preview/main.tsx`는 Declarative `BrowserRouter`와 `InteractionLab`을 사용한다.
  HOME 외 목적지는 임시 route fixture다. ABOUT 링크를 열 수 있다는 사실이 ABOUT 완성을 뜻하지 않는다.
- 정식 기반은 React Router **8.3.1 Framework + static prerender**다. 현재 `src/root.tsx`에는
  `ScrollRestoration`이 없다. Native shared transition도 아직 구현되지 않았다.
- `src/home/content.ts`의 3개 앨범·2개 공연은 **HOME selection projection**이다.
  별도 정식 content catalog를 공개하는 동작이 아니다. P1D 지영희류 record는 private draft다.
  후속 목록에 HOME 배열을 그대로 꽂아 공개 archive라고 부르지 않는다.
- HOME 04는 선택 복원한 Desktop/Mobile ribbon을 고정한다. 아래 WORKS 연구는 **별도 URL의
  서브페이지**에만 해당한다. Depth Queue·HOME 작품 잔상·04 자석 재도입은 이번 범위에서 제외한다.

## 2. 조사 방법과 확인 수준

MASTER §6, Motion §38, P2K reference 표를 먼저 읽었다. 그중 이번 문제와 직접 연결되는 Obys,
Arnaud Rocca, Trionn을 다시 확인하고, 새로운 사이트는 PHOTOYOSHI, Joffrey Spitzer,
Lesse Studio **3개**로 한정했다. 이름이 나온 모든 사이트를 전수 검증한 것은 아니다.

**직접 관찰**은 별도 Chromium 세션에서 확인한 DOM/조작/화면이다. **제작자 확인**은 본인이 작성한
사례 설명을 읽은 것이다. 아래의 V2 적용·모바일 대안·비용 평가는 그 근거로 도출한 **설계 판단**이다.
사이트 외형으로 라이브러리를 추정하지 않았다. 외부 코드·사진·음원은 복사하지 않았다.
레퍼런스 확인은 짧게 수행했으며 네이티브 모바일·전체 접근성·사이트 성능을 검증한 기록이 아니다.

### 2.1 기존 레퍼런스 재확인

| 사례 / 확인 URL | 실제 확인과 쉬운 원리 | V2 적용·변형·모바일·자산·비용 | 판정 |
|---|---|---|---|
| [Obys](https://obys.agency/) | 현재 DOM에서 작품별 이름·분류·순번과 `/work/...`의 실제 detail 링크를 확인했다. 이번 짧은 확인에서는 hover/페이지 전환의 전체 동작을 판정하지 않았다. **작품의 이미지와 정확한 색인이 하나의 탐색 체계를 이룬다**는 정보 관계를 참고한다. | WORKS·PERFORMANCES: 제목/연도/종류가 이미지와 같은 record를 가리키게 한다. Obys의 화면 배치·분류·브랜드는 가져오지 않는다. 모바일은 hover preview 대신 각 항목의 실제 이미지와 텍스트를 함께 제공한다. 승인 cover/poster가 필요하며 DOM 색인 부담은 낮다. | **정보 원리 채택**. 특정 shared geometry나 라이브러리 사용은 이 확인만으로 단정하지 않음. |
| [Arnaud Rocca 제작자 글](https://tympanus.net/codrops/2026/03/31/arnaud-roccas-portfolio-from-a-gsap-powered-motion-system-to-fluid-webgl/) / [사이트](https://arnaudrocca.fr/) | 제작자가 fluid density를 이미지 mask/distortion에 쓰는 구조, refresh-rate에 독립적인 감쇠, split-text 정리, hover와 focus의 대응을 설명한다. 이 패스에서 live fluid를 직접 조작한 것은 아니다. **이미지 자체보다 두 이미지 사이의 경계를 움직일 수 있다.** | 07 번짐·ABOUT 후보: mask 원리만 참고하고 얼굴 픽셀의 위치는 보존한다. 실시간 물 계산 대신 동일 scroll progress에 같은 젖음 분포를 재생한다. 모바일은 낮은 mask 해상도/정적 대안. 실제 suit/hanbok 원본이 필요하며 live fluid의 다중 GPU buffer 비용은 지불하지 않는다. | **mask 원리 채택**, 실제 fluid simulation·사진 왜곡은 **이번 제외**. |
| [Trionn About](https://trionn.com/about) / [Trionn 제작자 설명](https://tympanus.net/codrops/2026/07/15/the-architecture-behind-trionn-coordinating-gsap-three-js-lenis-and-web-audio/) | live DOM의 Work/Services/About/Contact와 명시적 sound control은 확인했다. 초기 ritual/cookie UI가 있어서 About 장면 전체 시각 동작은 검증하지 않았다. 제작자 글은 GSAP·Three.js·Lenis·Web Audio의 조율을 명시한다. **여러 효과도 하나의 입력·상태 소유권 아래에서 움직여야 한다.** | 현재 HOME 실험의 입력 우선순위·cleanup 연구에만 반영한다. 전역 scroll/audio architecture나 studio 연출은 복제하지 않는다. 모바일은 native vertical scroll과 사용자 재생이 우선. 새 자산 불필요; 새 rendering stack을 옮기면 비용이 크다. | **상태 소유권 원리 채택**, 전체 기술 stack·진입 ritual 차용은 **제외**. |

HAOQI.DESIGN, The Spark, Shader.se, Podium 등은 이전 방향 목록으로 유지한다. 이번에 해당 사이트의
전체 장면이나 기술 stack을 새로 확인했다고 표기하지 않는다. 이름의 권위로 새 구현을 승인하지 않는다.

### 2.2 새 레퍼런스 3개

| 사례 / 확인 URL | 실제 확인한 장면·동작 / 쉬운 원리 | 차용·V2 변형 | 모바일·실제 자산·부담 | 판정 |
|---|---|---|---|---|
| **PHOTOYOSHI — Takamitsu Motoyoshi** / [실제 사이트](https://photoyoshi.com/) / [Garden Eight 제작자 사례](https://tympanus.net/codrops/2025/03/17/case-study-motoyoshi-takamitsu/) | 직접 FullMode 버튼을 조작해 큰 사진이 이어지는 상태를 확인했다. Work/About, 사진 분류, GridMode/FullMode가 존재한다. 제작자는 index↔expanded 전환과 필름에서 얻은 시각 원리, Three.js/GSAP/Barba 사용을 명시한다. **전체를 찾는 보기와 한 작품을 감상하는 보기를 오갈 때 같은 사진이 기준점으로 남는다.** | WORKS·MEDIA·상세 gallery: 색인에서 선택한 실제 이미지를 감상 면으로 연결한다. V2의 Ivory, cover/poster 고유 비율과 DOM caption으로 재해석한다. 곡선 사진 띠·무한 가로 이동·무작위 순서·viewfinder distortion은 복제하지 않는다. | 모바일은 유한한 세로 목록→선택 이미지 확대. hover가 없어도 제목/날짜 제공. 실제 사진/영상 poster·권한·alt 필요. DOM shared image는 중간 부담, 무한 WebGL gallery는 높은 메모리/입력 비용. | **overview↔focus 원리 채택**. 해당 사이트 방식의 infinite/WebGL gallery는 **제외**. |
| **Joffrey Spitzer** / [실제 사이트](https://joffreyspitzer.com/) / [제작자 사례](https://tympanus.net/codrops/2026/02/18/joffrey-spitzer-portfolio-a-minimalist-astro-gsap-build-with-reveals-flip-transitions-and-subtle-motion/) | 직접 Grid/List 버튼을 눌러 작품들이 여백 있는 grid로 재배치되는 화면을 확인했다. 실제 case 링크도 있다. 제작자가 목록→detail 및 About 링크→title의 Flip 전환과 GSAP/Swup을 설명한다. **새 내용을 덮는 대신 현재 보던 물체의 자리와 크기를 다음 화면까지 이어준다.** | WORKS layout reflow, ALBUMS/공연 목록→detail의 선택 이미지 연속성. V2에서는 native View Transition을 먼저 검토하고 모든 메뉴 글자를 강제로 Hero로 키우지 않는다. 개별 화면의 layout·타이밍·소스는 차용하지 않는다. | 모바일은 세로 읽기 순서 유지, 빠른 이미지 이동을 줄이고 같은 대상만 연결. 동일 asset ID의 thumbnail/detail source 필요. snapshot/DOM transform은 중간 부담; 여러 이미지 Flip·거대 layer는 지양. | **shared image 원리 채택**. 별도 layout toggle은 **후보**이며 HOME 04에는 적용하지 않음. |
| **Lesse Studio** / [사이트](https://lessestudio.com/) / [About](https://lessestudio.com/about) / [제작자 사례](https://tympanus.net/codrops/2026/06/05/the-making-of-the-new-lesse-studio-website-clarity-performance-and-intentionality/) | live DOM에서 소개→핵심 정보→values→문의와 명확한 상위 메뉴를 확인했다. 짧은 About 화면 확인은 100% loading overlay가 남아 **최종 시각 settlement는 미확인**이다. 제작자는 정보 접근을 개선한 재편과 필요한 페이지에만 motion을 싣는 선택을 설명한다. **분위기는 남기되 방문 목적까지의 길은 짧게 만든다.** | ABOUT의 현직→선택 약력→전체 CV, CONTACT의 즉시 연락으로 적용한다. 기업 통계·services·quote form은 가져오지 않는다. 기존 V2 Mailto/Copy Email과 아티스트 사실을 사용한다. | 모바일은 한 축의 읽는 문장·충분한 행간. 검토된 프로필/공식 연락처 필요. DOM 중심으로 부담 낮음. 제작자의 서버 수치는 V2 성능 근거로 쓰지 않으며 Svelte 전환도 제안하지 않는다. | **정보 우선 원리 채택**. loading ritual·form·기술 stack 차용은 **제외**. |

## 3. 정보구조 — 상위 메뉴 5개 유지

**확정 유지:** HOME / WORKS / MEDIA / ABOUT / CONTACT. ALBUMS/PERFORMANCES를 새 상위 메뉴로
늘릴 이유는 현재 규모에서 없다. URL은 기존 locale/route 계약을 유지한다. 목록과 상세의 의미상 소속이
WORKS라는 뜻이며 `/works/albums/` 같은 새 경로를 뜻하지 않는다.

| 상위 영역 | 내부 탐색 | 역할 / 분류 |
|---|---|---|
| WORKS `/works/` | ALL / ALBUMS / PERFORMANCES 필터, 전체 Index, 각 독립 목록 바로가기 | 전체 작업을 가로질러 비교. HOME 04의 확대 복제 금지. |
| WORKS → ALBUMS `/albums/` | SANJO / JEONGAK의 두 편집 chapter → `/album/:id/` | 음악적 grouping. 모든 앨범을 live 3D로 늘어놓지 않음. |
| WORKS → PERFORMANCES `/performances/` | UPCOMING / ARCHIVE, year index → `/performance/:id/` | 시점과 실제 공연 기록. 같은 페이지 안에서 과거/예정 구분. |
| MEDIA `/media/` | 실제 수량에 맞춘 영상·사진·하단 Press Index | 시청/열람 목적. 비어 있는 category나 별도 PRESS 상위 메뉴는 만들지 않음. |
| ABOUT `/about/` | 소개·선택 이력·전체 CV·portrait archive | 현재와 과거 직책을 분리한 읽기 중심. |
| CONTACT `/contact/` | 이메일 열기·주소 복사·검증된 official links | 짧은 종료 지점. 별도 문의 서버/폼은 현재 baseline에 없음. |

KO는 unprefixed, EN은 `/en/...`; counterpart는 같은 semantic route를 사용한다. 공식 EN 문장이
없으면 영어 fixture를 번역 완료로 세지 않는다. 필터/연도/정렬은 URL query와 back 복원을 설계하되
새 query 계약 확정·코드는 해당 페이지 구현 단위에서만 추가한다.

## 4. 페이지별 다음 설계

아래는 기존 canonical baseline을 좁혀 만든 **후속 구현 후보**다. 현재 페이지를 만들거나 archive를
공개한 것이 아니다. 첫 구현 전 factual catalog/publication/asset lifecycle을 해당 owner에서 확인한다.

### 4.1 WORKS — 두 작업 세계가 하나의 색인으로 펼쳐짐

- **목적 / 첫 화면:** 전체 작업의 성격과 범위를 파악한다. Ivory editorial grid 위에 실제 album
  1개와 performance 1개가 서로 다른 비율·위치로 놓이고, ALBUMS / PERFORMANCES와 전체 Index
  바로가기가 처음부터 읽힌다. 실제 공개 수량만 표시한다.
- **대표 연출:** 두 큰 대상이 자신의 위치를 유지하며 archive의 첫 두 기준 칸이 된다.
  짧은 native scroll로 탐색 구조가 펼쳐지고, 사용자는 펼침을 기다리지 않고 Index로 갈 수 있다.
  PHOTOYOSHI의 overview/focus와 Joffrey의 동일 대상 재배치가 원리다. HOME ribbon·Depth Queue는 재사용하지 않는다.
- **우선순위:** 제목/연도/유형·이미지 → ALL/ALBUMS/PERFORMANCES → 정확한 Index → 상세.
  featured 크기는 presentation metadata로 제한하고 per-record CSS를 만들지 않는다.
- **이동:** 클릭한 cover/poster를 같은 detail 첫 이미지로 연결. 이미지가 준비되지 않았어도
  페이지 정보 접근은 진행한다. back은 필터·선택 item·스크롤을 복원한다.
- **자산 / 모바일:** 공개 승인 record와 cover/poster가 필요하다. 모바일은 세로 dual intro와
  큰 1열 작품, 적합한 보조 항목만 2열로 사용한다. 필터는 짧은 text controls; drag/hover 필수 금지.
- **다음 단위:** WORKS 단일 페이지의 dual intro→archive + filter/back + 한 detail fixture 연결.
  페이지 전체 data migration이나 HOME 수정과 묶지 않는다. 공유 이동은 fixture로 명시한다.

### 4.2 ALBUMS — 음반의 물성을 비교하는 전시

- **목적 / 첫 화면:** 어떤 음반이 있고 어느 음악에 속하는지 비교한다. SANJO 첫 chapter와
  대표 cover/package 1개, 작품명·음악 종류·발매 사실을 보여준다. JEONGAK은 다음 chapter로 자연스럽게 이어진다.
- **대표 연출:** 전시장처럼 놓인 한 음반을 고르면, 그 표면·윤곽이 상세의 닫힌 음반 첫 장면이 된다.
  Joffrey의 shared geometry를 정지 작품→감상 대상으로 변형한다. 목록에서는 과도한 회전·다중 canvas를 쓰지 않는다.
- **우선순위:** 음악 grouping → cover/title/year/status → 상세 진입. 스토리·모든 트랙·player는 상세에서 제공한다.
- **이동:** 원래 승인 방향은 production 3D에서 만든 동일 카메라의 still→live다.
  그 source가 없으면 진짜 cover의 shared-image로 시작한다. 준비되지 않은 3D를 완성된 것처럼 연결하지 않는다.
- **자산 / 모바일:** front/back/spine은 HOME에 있지만 production 3D 렌더가 아니다.
  검토된 package 규격·renderer source·동일 crop still이 필요하다. 모바일은 1개씩 충분히 큰 세로 전시,
  chapter heading으로 탐색한다. SANJO/JEONGAK용 추가 sticky switch는 만들지 않는다.
- **다음 단위:** 승인 자료를 사용한 ALBUMS 2D exhibition + cover→한 detail entry 비교.
  live 3D 품질 gate는 별도. 없는 음반을 더미로 늘려 전시 밀도를 채우지 않는다.

### 4.3 PERFORMANCES — 날짜를 읽으면 무대가 따라옴

- **목적 / 첫 화면:** 가장 관련 있는 공연을 보고 날짜·장소를 찾는다. 현재 HOME 대표는
  **2026.09.22 〈풀고, 엮다〉**다. 동일 공연을 선택하더라도 서브페이지에서 HOME Stage Aperture를 다시 강요하지 않는다.
- **대표 연출:** desktop의 한 Stage Window가 연도/공연 행의 선택에 맞춰 실제 poster/photo로
  공간적으로 갱신된다. 년도와 정확한 제목은 움직이지 않는 탐색 기준이다. Obys의 record-index 관계,
  PHOTOYOSHI의 overview→focus를 공연 chronology로 변형한다.
- **우선순위:** upcoming title/date/venue와 가능한 ticket action → 연도 Index → archive → detail.
  focus도 hover와 같은 stage 선택을 제공하며 click 한 번으로 이동한다. 만료 공연의 예매를 자동 추정하지 않는다.
- **이동:** 선택된 **현재 asset**이 detail hero에 남는다. poster를 눌렀는데 관계없는 사진이 처음에 뜨지 않는다.
  `photo / poster / video-still / editorial / typography`의 기존 visualMode만 사용한다.
- **자산 / 모바일:** 9/22 official poster는 있지만 해당 무대 documentary photo는 확인되지 않았다.
  모바일은 날짜→큰 inline image→제목/장소의 세로 timeline. desktop sticky stage를 좁혀 고정하지 않는다.
  자료가 없으면 날짜·타이포 구성이 완결된 상태이며 이미지가 있는 척 하지 않는다.
- **다음 단위:** PERFORMANCES 한 페이지의 실제 승인 항목으로 year index/Stage Window와 mobile inline
  검증. 9/22 공개 content record 정리가 필요하면 그 publication owner를 먼저 별도 처리한다.

### 4.4 Album Detail — 물건을 열고 음악을 읽음

- **목적 / 첫 화면:** 음반의 제작 의도·음악·인쇄물을 깊게 감상한다. 제목/종류/연도와 닫힌 package,
  명확한 OPEN action이 첫 화면의 중심이다. 트랙/정보로 바로 가는 DOM 경로는 3D 성공 여부와 무관하게 존재한다.
- **대표 연출:** **현재 사용자가 돌려 놓은 상태**에서 패키지가 열리고 booklet/disc가 DOM reader/player로
  연결된다. Joffrey의 동일 물체 연속성을 package narrative로 재해석한다. WebGL 도입을 이 연구로 승인하지 않는다.
- **우선순위:** 사용자가 선택한 OPEN 또는 정보 접근 → story → 실제 tracks/player → booklet → credits → related.
  HOME 18초 sample을 전체 앨범 재생권이나 player 완료로 확장하지 않는다.
- **이동:** still→live 일치가 증명될 때만 live handoff. 실패하면 실제 cover/읽는 콘텐츠를 유지한다.
  booklet overlay 안에서는 오디오 연속성, 다른 route로 나가면 종료한다. 관련 앨범은 명시적 data reference만 사용한다.
- **자산 / 모바일:** 치수·cover textures·tray/disc/booklet 실제 자료·공개 음원/track metadata·credits가 필요하다.
  Blender capability/Tray Lab/geometry/material gates는 미완료다. 모바일은 horizontal object intent만 회전,
  세로 스크롤 우선; 정적 cover+reader/player도 동일 정보를 제공한다.
- **다음 단위:** 실제 1개 album의 **DOM editorial detail + source-availability 검토**가 먼저.
  3D는 owner별 Lab 후 통합한다. 한 bounded task로 모든 package·player·reader를 만들지 않는다.

### 4.5 Performance Detail — 공연의 프로그램이 편집된 기록이 됨

- **목적 / 첫 화면:** 공연의 정체성과 실제 기록을 확인한다. 목록에서 선택한 image와 title/date/venue를
  그대로 이어받는다. poster는 원래 인쇄 비율과 글자를 보존하며 backdrop cover로 자르지 않는다.
- **대표 연출:** 작품의 **program 순서가 읽기 위한 악보 같은 세로 구조**가 된다.
  장/곡의 번호와 선이 다음 글·사진의 정렬축으로 이어지며, 첫 image는 archive에서 다시 온전히 열어볼 수 있다.
  shared-image 원리는 Joffrey, 정보 경로의 명확함은 Lesse를 참고한다. HOME 무대 개방을 반복하지 않는다.
- **우선순위:** title/date/venue/status와 유효한 ticket link → artist note → program → 출연자 →
  사진/영상/포스터/leaflet → 관련 공연. 없는 note·영상·출연자를 생성하지 않고 해당 블록을 뺀다.
- **이동:** 이전 목록의 year/filter/back 위치 유지. related는 명시적 reference, 모든 공연은 하나의 semantic template와
  검증된 visualMode로 표시한다. 새로운 event별 React page/enum/CSS는 만들지 않는다.
- **자산 / 모바일:** 정확한 program/cast/note, poster의 읽을 수 있는 원본, 촬영권/credit, 영상·자막 상태 필요.
  모바일은 program·caption을 사진 바깥의 DOM으로 읽고, poster는 tap viewer에서 확대한다.
  긴 pinned gallery나 필수 horizontal drag는 없다.
- **다음 단위:** 한 실제 승인 performance의 **poster-led detail + 목록→detail identity**.
  photo가 없는 상태도 완결시킨다. 9/22 record 미공개 상태는 fixture와 명확히 구별한다.

### 4.6 MEDIA / ABOUT / CONTACT — 기본 방향

| 페이지 | 목적·첫 화면·대표 연출 | 우선순위 / 다음 경로 | 실제 입력·모바일 / 다음 단위 |
|---|---|---|---|
| MEDIA | 보고 들을 콘텐츠 발견. 실제 대표 영상의 한 poster frame과 제목/종류. **선택 poster가 같은 자리에서 player 공간으로 펼쳐짐**. PHOTOYOSHI의 overview→focus 원리를 영상에 적용. | 명시적 Play → 관련 영상/사진 → 하단 Press Index. player는 필요할 때만 불러오고 related Album/Performance로 연결. 자동 sound/여러 iframe 금지. | 승인 URL·poster·날짜·권한·자막/대본 현황. 모바일은 세로 feed와 큰 inline player. 다음은 대표 영상 1개+archive loading/keyboard·실제 source 검토. |
| ABOUT | 인물·예술적 위치·이력 이해. HOME과 다른 crop의 실제 portrait, **Cho Youn Kyoung** 이름과 짧은 소개. **사진 여백과 중요한 연도가 같은 정렬축으로 이어지는 editorial biography**. Lesse의 역할→근거→연락과 Arnaud의 readable DOM/focus 원리. | 현재 역할 → 선택 약력 → 읽는 biography → full CV → portrait archive → CONTACT. HOME의 번짐을 페이지 전체에 반복하지 않음. | 검토된 KO profile, 별도 EN review, 충분한 portrait originals·사진별 시기/credit. 모바일은 초상 다음에 읽는 문장, 연도는 짧은 column. 다음은 사실 검토+ABOUT editorial 1페이지 prototype. |
| CONTACT | 공식 연락. 읽기 쉬운 email과 inquiry 목적이 첫 화면에 있음. **실제 주소가 복사 완료 문구로 잠깐 재조판되는 작은 마무리**. Lesse의 짧은 문의 경로만 참고. | Mailto / Copy Email → 검증된 official links. HOME로 돌아가는 보조 링크. form/추가 서버 없음. | 현재 승인된 공식 주소·링크 필요. 모바일에서 긴 주소 줄바꿈/44px action/focus/live status. 다음은 CONTACT DOM 1페이지와 clipboard 실패 fallback. |

**사용자 제공 최신 프로필 — 사실 입력, 2026-09-08:**

- 조윤경 / **Cho Youn Kyoung** · 해금 연주자
- **현재:** 국립부산국악원 기악단 **단원**
- 한양대학교 음악학박사(D.M.A.)
- 국가무형유산 「종묘제례악」 이수자
- 제27회 온나라국악경연대회 해금부문 금상
- ABOUT의 별도 경력: 우리음악앙상블 새.생(new.生) 동인
- ABOUT의 **과거** 경력: 前 국립부산국악원 기악단 수석 역임

현직에 해금 수석/Principal/Chief를 붙이지 않는다. 이 자료는 사용자가 제공한 사실이며 이번 web research가
독립적으로 모든 이력을 증명한 것은 아니다. 과거 결과 보고서를 현재 프로필로 일괄 수정하지 않는다.

## 5. 페이지 이동 연구 — Native 우선, 현재 Preview에 framework를 만들지 않음

### 5.1 선택 비교

| 방식 | 현재 구조와의 적합성 | 얻는 것 / 책임·비용 | 판단 |
|---|---|---|---|
| **React Router + Native View Transition** | 정식 Framework route에 가장 단순하다. `Link viewTransition` / `useViewTransitionState`의 지원 모드는 Framework/Data. 현재 Preview의 Declarative BrowserRouter에 prop만 더하면 해결된다고 보지 않는다. | 선택된 image와 title의 browser snapshot을 연결; 이미지 준비·unique name·focus·history는 앱이 설계. 기본 root crossfade에 맡기지 않고 선택 image만 연결. 큰 snapshot의 메모리 비용은 남음. | **향후 1순위 후보**. Framework 목록/detail 1쌍에서 검증 후 사용. |
| **DOM shared-element / FLIP overlay** | declarative Preview에서도 직접 만들 수 있지만 현재 두 route의 layout·navigation commit·취소를 직접 조율해야 함. | 자유로운 snapshot clone/geometry. 스크롤 좌표/회전/폰트/이미지 decode/중복 accessible content/overlay cleanup 책임 증가. | **조건부 후보**. Native로 부족한 실제 한계를 확인한 한쌍에만. 범용 helper 선행 구축 금지. |
| **Persistent graphics surface** | 이미 양쪽에 live 3D가 있을 때만 비교 가치. 현재 subpage fixture를 위해 전역 canvas를 만들 이유 없음. | pose·camera·material·velocity를 실제로 이어갈 수 있으나 route 수명과 GPU resource/context loss/memory가 결합됨. | **미래 조건부** Album live object handoff. 전체 사이트 WebGL/WebGPU 재작성 제외. |

근거: [React Router 8.3.1 View Transitions](https://reactrouter.com/how-to/view-transitions),
설치된 `node_modules/react-router/dist/development/lib/dom/lib.d.ts`의 `LinkProps.viewTransition`
지원 모드 및 `lib/components.js`의 RouterProvider interruption 처리도 읽었다.
Native API가 CSS/layout/state 준비를 대신 해결하거나 3D 속도를 보존해 주는 것은 아니다.

**이번 결정:** 연구로 충분하다. 실제 공개 detail이 아직 없으므로 route fixture를 꾸미는 이동 시제품,
새 transition framework/hook, router 전환 코드는 이번에 추가하지 않는다.

### 5.2 동일 자산의 계약

기존 `ContentRef`의 `kind/id`, image `AssetRef.id`, 필요시 `front/poster/portrait` 역할을 조합한다.
파일명·배열 위치·번역 title·빌드 후 hash URL은 identity가 아니다. HOME projection의 id가 같아도
정식 record의 공개 여부는 따로 검증한다. **공개하지 않은 draft로 이동 경로를 만들지 않는다.**

같은 asset의 다른 responsive derivative는 함께 매칭할 수 있지만 `object-fit`, crop/focal point,
aspect-ratio를 명시한다. outgoing/incoming에 같은 semantic image를 사용한다. poster→다른 공연 사진은
shared element로 위장하지 않는다. 한 snapshot에 같은 `view-transition-name`이 두 개면 안 된다.
여러 곳에 반복된 album 중 **클릭한 visible instance만** 참여시키고 종료/취소 시 이름을 지운다.
[MDN의 unique-name 및 snapshot 계약](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API/Using)

### 5.3 정상 동작과 실패 처리 — 후속 작은 시제품의 기준

| 상황 | V2에서 지킬 동작 |
|---|---|
| 일반 click/tap | 현재 image 상태를 출발점으로 삼고 detail의 실제 첫 이미지가 준비될 때 연결. 클릭 전에 모든 gallery 이미지를 preload하지 않음. 명시적 navigation이 HOME magnet보다 우선. |
| 이미지 늦음·실패 | 알려진 image 크기로 layout을 먼저 확보. 선택된 derivative의 `decode()`만 다루며 실패/취소 시 title·정보·실제 fallback으로 보통 이동. 전체 body image Promise를 기다리는 input lock 금지. [MDN decode](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/decode) |
| 데이터 오류·404 | 404/error UI를 정상 보여주고 animation만 생략. animation 실패를 content 성공으로 간주하지 않음. prerender/HTTP status 계약 유지. |
| 상세 URL 직접 방문·새 탭 | incoming thumbnail이 없으므로 detail의 완성된 첫 layout을 즉시 표시. source DOM·history state가 필수여서는 안 됨. Cmd/Ctrl click·링크 복사·새 탭 동작 보존. |
| Back/Forward | 같은 history entry의 목록 filter/year/scroll을 복원. Framework root에 단일 `ScrollRestoration` 검토; 기본 `location.key` 기준으로 출발. POP 때 top 강제 이동/Scene Magnet/entrance 재생 금지. 대상이 없으면 안전한 목록 위치. [React Router ScrollRestoration](https://reactrouter.com/api/components/ScrollRestoration) |
| 빠른 연속 click | latest navigation 우선. router의 request cancellation과 별개로 이전 이미지 준비 Promise/일시 이름/overlay가 새 route를 덮지 않게 소유권 확인. 임의 long click lock 금지. [React Router race handling](https://reactrouter.com/explanation/race-conditions) |
| transition 취소 | animation 취소는 navigation 취소가 아님. `skipTransition()`은 view update를 실행하므로 route state를 되돌리는 수단으로 사용하지 않는다. 종료/중단 모두 임시 resources를 정리. [MDN skipTransition](https://developer.mozilla.org/en-US/docs/Web/API/ViewTransition/skipTransition) |
| title·focus | 새 문서 title/lang/heading은 실제 콘텐츠로 갱신. 새 PUSH에서는 h1 또는 main으로 `preventScroll` focus와 짧은 route announcement를 검토. POP은 돌아온 item 우선. clone은 장식, 읽는 본문은 단일 DOM. Router가 UI focus를 자동 설계하지 않는다. [React Router accessibility](https://reactrouter.com/how-to/accessibility) |
| mobile·pinch·reduced motion | 작은 화면에는 이미지 1개만 snapshot. 가로 gesture 요구 없음. reduced에서는 shared zoom을 생략하고 최종 layout·focus·정보를 그대로 제공. gesture 동안 강제 framing을 하지 않음. |
| API 미지원·snapshot 실패 | feature detection 후 같은 Link의 정상 route 이동. animation 때문에 목적지가 사라지지 않음. 지원 브라우저의 현재 버전 표만으로 실기기 검증을 주장하지 않음. [MDN API fallback](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API/Using) |

특정 효과를 위해 router와 native API의 navigation 소유권을 이중화하지 않는다. 필요한 대응은 실제
목록/detail 한쌍이 생긴 시점에 그 모듈 안에서 구현하고, 검증된 다음에만 공통화를 검토한다.

## 6. 후속 작업 추천과 명시적 제외

먼저 사용자가 이번 HOME의 사진 전환·장면 정렬을 선택한다. 그 다음 서브페이지 첫 구현 후보는
**WORKS — Dual Archive + Functional Index Prototype**다. 실제 승인 가능한 최소 자료를 선택하고
필터/모바일/native scroll/back의 한 탐색 경험을 만든다. HOME 04와 분리한다.

Album Detail는 높은 경험 강도를 유지하지만 실제 3D source/Tray·reader/player 소유 gate가 필요하므로
첫 서브페이지에 모든 3D를 한꺼번에 끌어오지 않는다. 공연 detail은 현재 실제 poster가 있어
**poster-led common template**부터 정직한 결과를 만들 수 있다. 자산이 추가되면 같은 semantic model의
사진 영역을 확장한다.

이번 제외: 서브페이지 실제 구현·publication 전환·새 음원/사진 생성·공용 transition framework·HOME 04 변경·
실시간 fluid simulation·전체 WebGL/GPU 전환. Edition Gate/Classic 조사·구현은 이 연구의 범위가 아니다.

## 7. HOME 비교 실험 결과

**IMPLEMENTED / 최소 기술 확인 완료 / 사용자 시각 선택 대기.** 기본 HOME 확정안이 아니다.
시작 main `150529b4c1b9a7e1c4fa306ebe0abdbf51246cdb`는 clean/origin과 일치했다. 세 독립 트랙과
메인 통합으로 진행했고 보호된 `src/home`/Hero/SOUND/Navigation/기존 interaction owner는 변경하지 않았다.

### 직접 비교

- [한지 번짐 + 장면 자동 정렬](https://cij5484.github.io/cho-youn-kyoung-v2/?dev=1&portrait=hanji&magnet=on)
- [직선 방식 + 장면 자동 정렬](https://cij5484.github.io/cho-youn-kyoung-v2/?dev=1&portrait=straight&magnet=on)
- [기본 화면](https://cij5484.github.io/cho-youn-kyoung-v2/?dev=0)

패널의 **07 연주자로 이동**은 완성 사진/프로필 감상 위치로 간다. 위로 조금 되돌려 두 사진의
전환을 보고 같은 위치에서 직선/한지를 바꿀 수 있다. 03/06 버튼은 각 완성 구도로 이동한다.
자동 정렬은 켜기/끄기로 별도 비교하며, 직접 이동 직후에는 사용자가 선택한 위치를 우선한다.
새 스크롤로 기준 주변을 천천히 지나며 체감을 비교한다. 종료하면 기본 화면과 기존 동작으로 돌아간다.
일반 공개 URL에는 패널과 새 효과가 없고, 로컬에는 접힌 버튼만 있다. `?dev=1`은 인증 수단이 아니다.

### 구현 결정

| 영역 | 실제 구현과 경계 |
|---|---|
| 비교 도구 | 기존 Lab 패널을 재사용한 한국어 도구. URL이 상태를 소유하고 `compare/all`을 호환. pathname/locale/hash/무관한 query 보존. reset/exit/복사, 03/06/07 직접 이동. 패널/Artist/Magnet 별도 lazy chunk. |
| 07 직선 | 동일 사진과 프로필을 공유하는 CSS clipping 후보. photo progress 0=정장, 1=한복이며 기존 포인터의 68% 제한을 상속하지 않는다. |
| 07 한지 | 192×288의 고정된 젖음 순서 지도 → Canvas alpha → CSS mask. 섬유 방향의 불규칙한 연결 영역이 진행도에 따라 드러난다. 사진 좌표를 왜곡하지 않고 검은 overlay를 쓰지 않는다. |
| 끝점/감상 | shared sequence .655–.825에서 사진 전환, .825–.955는 한복100%/프로필 감상 후 기존 퇴장. 역스크롤도 동일한 순서 지도. 한지에서는 무대 seam이 젖음의 출발로 이어진 뒤 숨는다. |
| 모바일/정보 | 위 사진과 아래 DOM 프로필을 별도로 배치. 현재 단원과 네 핵심 약력, ABOUT 링크. 390px에서 프로필 전체가 화면 안에 들어옴. 실제 번역을 만들지 않아 EN 경로의 새 약력은 `lang=ko`로 구분한다. |
| 03/06 자석 | 기존 SOUND 기준 위치와 06 .315를 사용. 기존 완성구도 구간은 충분해 core timeline을 수정하지 않음. 근처 .16/.14 viewport 범위, 입력360ms/실제스크롤200ms 조용해진 뒤 native smooth settle. 빠른 방문/취소는 해당 근처를 벗어날 때까지 재흡착하지 않음. |
| 입력/정리 | LISTEN·메뉴·앵커·history·키보드·패널 입력 우선, held/multi touch·pinch·selection·hidden에서 개입하지 않음. cleanup은 rAF/timer/observer/listener/Canvas/portal/속성을 정리. 기본 OFF는 새 효과 연산 없음. |
| 대안 | mask/Canvas 사용 불가 시 직선 + 실제사진/DOM 프로필. reduced는 정적인 한복100%/프로필, 자석 비활성. 오류를 사진 삭제나 가짜 시계 재생으로 감추지 않음. |

**기술 비교:** 단순 CSS/SVG는 가벼운 직선 fallback에 적합하다. noise WebGL은 그래픽 context/실패/
모바일 리소스 관리 부담이 늘고, 실시간 fluid는 진행 이력 때문에 reverse 결정성이 어려워 이번에는
제외했다. 작은 고정 Canvas alpha field가 현재 실제 사진/스크롤 구조에 충분하여 하나만 구현했다.
마스크는 보이는 진행도 변화에서만 만들며 180단계로 제한한다. 새 asset·dependency·router·workflow는 없다.

**추천:** 한지 번짐을 우선 비교할 것을 추천한다. 실제 초상을 그대로 둔 채 두 정체성이 유기적으로
이어지는 차이를 만들기 때문이다. 직선은 비교 기준으로 보존한다. Scene Magnet은 03/06에서만 약하게
검토하고 기본 적용 여부는 사용자 체감 뒤 결정한다. 이 추천은 시각 품질 승인이나 기본값 변경이 아니다.

### Lean validation / 확인한 범위

- Node24 타입/컴파일 PASS; 변경 영역 lint PASS; 실제 `build:development-preview` PASS.
- 작은 단위 모델 **11/11 PASS**: 사진 끝점/마스크 결정성·역방향 3, 자석 근접/빠른 입력/취소/settlement 5,
  비교 URL/기본값/초기화·복사 3. 전체 HOME/Full suite는 실행하지 않음.
- 최소 Chromium desktop 통합: opt-in 적용, 정확한 사진0/1, 동일 위치에서 mode 선택, 실제 audio DOM/재생
  위치 유지, reset/exit 리소스 해제, legacy all=a 호환, 입력 우선과 LISTEN 실제 시작, 치명적 runtime 오류 없음.
- 별도 자석 smoke: SOUND/06 안착, 진행 중 wheel 취소 및 재흡착 없음, cleanup/reduced 확인.
  통합 후 패널 내부 스크롤이 자석을 깨우지 않고 명시 입력으로 처리되는지 추가 확인.
- 실제 빌드 artifact: 일반 주소에 패널/새 효과/무거운 experiment chunk 요청 없음. 명시 비교 URL은
  한국어 패널과 선택값 활성. 390×844 touch emulation에서 완성 한복/프로필 전체 노출과 가로 overflow 없음.
  reduced static/자석 OFF, mask capability fallback, copied URL과 audio 위치 보존 확인.
- 임시 smoke의 즉시 radio 체크는 URL/router commit 완료를 기다리도록 조정했다. 중간 위치의 byte 단위
  mask 비교는 native scroll 정수 반올림으로 서로 다른 progress를 비교하던 probe 문제였다. 결정성은
  작은 동일-progress 단위 테스트에서 검증하고 browser는 기능/끝점 중심으로 제한했다.
- 보호 범위 diff: `src/home`(04 포함), Hero/SOUND/Navigation/기존 interaction owner, 의존성, Preview entry,
  workflow 변경 없음. 새 CSS는 comparison attribute 아래로 한정. 문서 링크/범위 확인.
- Full Release Gate, 전체 HOME/E2E, 64장 baseline 비교, 여러 browser/width 조합과 증빙 묶음은 하지 않음.
  기존 Fast CI와 main 자동 Pages workflow를 그대로 사용. 배포 exact SHA/공개 URL 최소 확인은 전달 PR과 최종 보고에 기록.

**남은 실제 제한:** 한지의 세련됨/crop/프로필 위계와 자석 체감은 사용자 선택 대기. 실제 iPhone/Android,
native Safari, 확대/thermal/장시간 GPU 품질은 이번에 검증하지 않았다. 기존 1023×1537 한복 source의
Retina 한계와 공식 공연 poster(실제 공연 사진 아님)를 유지한다. ABOUT/상세는 fixture이며 서브페이지
계획이 실제 공개 콘텐츠를 등록한 것은 아니다. Edition Gate는 FUTURE 원칙 외 모두 제외했다.

**전달 / STOP:** 한 논리적 PR로 main merge 후 기존 자동 Preview 배포. 새 시각안을 기본 승인으로
기록하지 않는다. 사용자의 사진 후보·프로필·자석 선택 후 다음 단위를 별도 승인받는다.
