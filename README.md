# Cho Youn Kyoung Website V2

P0E에서 승인된 KO/EN routing·metadata 계약을 CI와 명시적 delivery 절차에 연결했습니다. React + TypeScript + Vite 기반의
18개 neutral test route에 P2A production CSS foundation을 적용했습니다. **현재 개발 HOME 전체는 `npm run dev:interaction` → [4180](http://127.0.0.1:4180/)에서 확인합니다.**
Hero → Haegeum → SOUND → Works → Album Object → Performance → Artist → Name이 연결됐습니다.
공개 build는 아직 18개 neutral route이며, 새 HOME의 production route 편입·공식 번역·콘텐츠 공개 승인은 별도입니다.
**React Router + Static Prerender APPROVE / HOME V2.1 문서 승인 / P0F documentation / AGENTS canonical APPROVED.**

[P0D 결과](P0D-RESULT.md), [언어·metadata 계약](docs/redesign/review/LOCALE-METADATA-CONTRACT.md),
[검증 증거](evidence/p0d/README.md). P0D는 PR #1로 머지됐습니다. 현재 CI/delivery 정본은
[Task Protocol의 CI/delivery 절](docs/redesign/review/IMPLEMENTATION-TASK-PROTOCOL.md), 실행 결과는 [P0E 결과](P0E-RESULT.md)입니다.

Preview: [GitHub Pages](https://cij5484.github.io/cho-youn-kyoung-v2/). 최신 배포 SHA/실제 CI 결과는 P0E 결과에서 확인합니다.
[P0C 당시 배포·검증 결과](P0C-RESULT.md), [변경되지 않은 파일 배치 설명 / 과거 pipeline](P0C-DEPLOYMENT.md).
**Push/merge는 더 이상 자동 배포하지 않습니다. 수동 Full gate의 deploy 기본값은 false입니다.**

P1A는 content schema/neutral fixture/route adapter를 검증했습니다. P1C 매핑 승인 후 P1D에서 지영희류 KO record
한 건을 실제 content layer의 비공개 draft로 등록했습니다. [Content Schema Contract](docs/redesign/review/CONTENT-SCHEMA-CONTRACT.md)와
[P1D 결과](P1D-RESULT.md)를 따릅니다. 현재 페이지·18개 prerender route는 그대로이며 실제 template 연결은 미구현입니다.

## 프로젝트 문서 시작점

이 README는 개발자용 setup·명령·구조 안내입니다. Agent의 작업 지침과 문서 선택 지도는
[root AGENTS.md](AGENTS.md), 현재 상태·승인 경계는 [CODEX-HANDOFF.md](CODEX-HANDOFF.md),
이번 문서 연결 결과는 [P0F 결과](P0F-RESULT.md)에 있습니다. 채팅 기억 대신 repository 문서를 기준으로 삼습니다.
Blender는 아직 채택/실행되지 않았습니다. 필수 capability spike와 high-priority Haegeum 3D 실험은
[Motion의 미래 3D gate](docs/redesign/03-MOTION-SYSTEM.md#blender-capability-spike)에 기록된 후속 과제입니다.

## 실행 환경

Node.js 24.x / npm 11.x. 직접 의존성은 exact version과 lockfile로 고정합니다.
새 설치는 `npm.cmd ci --include=dev`입니다. route suite의 로컬 기본은 Microsoft Edge이고 Design System Lab suite는 Playwright Chromium입니다. Chromium이 없는 환경에서는 최초 한 번 `npx playwright install chromium`으로 준비합니다.

## 개발 실행

```powershell
Set-Location 'C:\choyounkyoung-v2'
npm.cmd ci --include=dev
npm.cmd run dev
```

Project Pages base의 dev 실행은 `npm.cmd run dev:pages-preview`입니다.
터미널에 표시된 주소로 접속하고 Ctrl+C로 종료합니다.
개발 서버의 fallback은 정적 호스팅 검증의 근거가 아닙니다.

## 검증 및 정적 preview

```powershell
npm.cmd run type-check
npm.cmd run lint
npm.cmd run test:locale
npm.cmd run test:navigation:contract
npm.cmd run test:content
npm.cmd run test:placement
npm.cmd run build
npm.cmd run test:content:visibility
npm.cmd run test:design-system:artifacts
npm.cmd run build:pages-preview
npm.cmd run test:spike
npm.cmd run test:design-system
npm.cmd run test:navigation
npm.cmd run test:hero
npm.cmd run test:haegeum
npm.cmd run test:sound
```

`check`는 type-check/lint/root build만 실행합니다. 전체 로컬 계약 검증은 위 명령들을 포함하는 `gate:full`입니다.
두 build는 같은 framework typegen/cache를 사용하므로 순서대로 실행합니다.

일반 코드 확인은 `npm.cmd run gate:fast`, routing/metadata/CI 변경의 전체 확인은
`npm.cmd run gate:full`을 사용합니다. Fast는 위의 첫 아홉 명령, Full은 위 전체 명령입니다.
Push/PR마다 Fast + workflow syntax 검사를 수행하고, 브라우저 설치와 84 route + 11 foundation + 26 navigation + 44 Hero + 32 Haegeum + 58 Sound Full은 명시적 수동 실행과 배포 전에 수행합니다.
Linux CI는 Chromium, 기본 로컬 설정은 Edge입니다. 이 Mac에서는 기존 Chromium을 `CI=1`로 선택해 같은 assertion을 실행합니다.
macOS/Linux 명령은 `npm.cmd` 대신 `npm`을 사용합니다. Node 24.x/npm 11.x 요구사항은 동일합니다.

| 명령 | 산출물 / 확인 주소 |
|---|---|
| build | build-root/static/ |
| build:pages-preview | build-pages-preview/static/ |
| preview | http://127.0.0.1:4173/ |
| preview:pages-preview | http://127.0.0.1:4174/cho-youn-kyoung-v2/ |
| test:spike | 두 strict static server를 자동 시작·종료, playwright-report/index.html |

preview 서버는 실제 파일과 directory index만 제공합니다. 알 수 없는 주소에는 HTTP 404를 반환하며
SPA fallback을 적용하지 않습니다. 두 preview 포트가 사용 중이면 기존 프로세스를 재사용하지 않습니다.
이 작업 종료 시 서버는 중지되어 있습니다. 주소를 열려면 해당 preview 명령을 먼저 실행합니다.

## Base와 공식 prerender

`config/build.ts`가 base, 출력 위치, canonical 예시 origin, preview port의 단일 설정입니다.
`react-router.config.ts`의 basename과 Vite base는 이를 공유합니다.
Pages origin은 V2 preview 실제 주소입니다. root origin만 `.invalid` 테스트 값으로 유지하며, noindex는 neutral preview용입니다. 운영 도메인은 연결하지 않았습니다.

React Router Framework의 공식 `ssr:false + prerender`를 사용합니다.
8.3.1의 raw subpath output은 HTML과 assets의 디렉터리 기준이 다르므로
`scripts/package-static.mjs`가 **파일 내용을 수정하지 않고** static/으로 배치합니다.
client/는 원본 증거, static/은 검증 대상 artifact입니다. client/를 그대로 Pages publish root로 사용하지 않습니다.
공식 renderer나 의존성 코드를 패치하지 않았습니다. 이 배치 단계는 프로젝트 소유 코드로,
framework 출력 구조가 바뀌면 재검증해야 합니다.

SPA fallback은 raw client/에만 보존하고 static/과 Pages 배포물에서는 제외합니다. unknown request는 실제 호스트 404입니다.
`build-info.json`은 배포 SHA와 공개 파일 해시를 기록합니다. `EXPECTED_DEPLOY_SHA`를 지정한 `npm.cmd run test:pages`로 실제 Pages를 재검증합니다.
Live suite는 18-route metadata 계약을 검사하므로 실제 배포된 동일 계약의 SHA로 실행해야 합니다.
로컬 dirty build의 commit 값은 기준 HEAD이며 소스 동일성 증거가 아닙니다.
로컬/CI 모두 `npm.cmd run test:placement`로 파일 배치 계약을 검사합니다.
server/는 build 과정의 중간 결과이며 Pages에 필요한 runtime server가 아닙니다.
P0A의 이전 dist/와 dist-pages-preview/는 보존된 과거 산출물이며 현재 검증 대상이 아닙니다.

## 구조

```text
config/build.ts                두 base의 중앙 설정
react-router.config.ts        official prerender / basename / route discovery
src/root.tsx                  document / lang / framework entry
src/routes.ts                 최소 route config
src/routes/                   공통 테스트 shell, unknown 404 화면
src/routing/locale-contract.ts KO/EN pairing, switch 결과, authored 상태, metadata 계약
src/content/records/*.server.ts 실제 content record (현재 지영희류 private KO draft 한 건)
src/content/registry.server.ts 실제 record/asset reference의 명시적 등록, client import 금지
src/spike/                    경로 fixture, URL 및 테스트 metadata
src/styles/foundation.css     production font/token/base/type/layout 진입점
src/styles/spike.css          기존 비시각 CSS 로딩 확인 marker
labs/design-system/           별도 dev-only HTML/CSS specimen, production route 등록 없음
public/licenses/              세 font family의 원본 OFL notice
public/spike/path-check.svg   새로 만든 16px 경로 검증 fixture
scripts/                      CLI 실행, 정적 artifact 배치, 검증용 서버
tests/                        84개 route + 11개 Lab browser, locale/content/placement + artifact 검증
docs/redesign/                기존 기획·review 문서 보존
```

P0A의 나머지 빈 source/public 경계 폴더는 보존합니다. 기본 client/server entry는
React Router가 제공하며 커스텀 renderer를 만들지 않았습니다.

## 결과 및 승인 경계

- [P0C 실제 Pages 결과](P0C-RESULT.md), [최종 architecture 결정](docs/redesign/review/ROUTING-ARCHITECTURE-DECISION.md)
- [P0B 결과와 architecture 비교 — 당시 조건부 판정 기록](P0B-RESULT.md)
- [P0C 실제 Pages 검증 체크리스트 — 실행 결과 반영](P0C-VERIFICATION-CHECKLIST.md)
- P0B checkpoint/이전 코드: 로컬 전용 `P0B-CHECKPOINT.json` / `.checkpoints/p0b-before/` (새 clone에 포함되지 않음). 공유 이력은 위 P0B 결과를 참조합니다.
- [P0A 결과 — 과거 기록 보존](P0A-RESULT.md)
- [작업 분할·STOP 규칙](docs/redesign/review/IMPLEMENTATION-TASK-PROTOCOL.md)
- [기획 MASTER](docs/redesign/00-MASTER-PLAN.md), [기존 HANDOFF](CODEX-HANDOFF.md)

P0B까지 기획·review 원본 21개를 보존했습니다. P0C에서는 사용자 지시대로 관련 planning 상태만 architecture APPROVE로 갱신했습니다.
P0A–D 결과는 당시 기록으로 보존합니다. 현재 delivery 상태는 HANDOFF를, 과거 배포 증거는 P0E 결과를 따릅니다.
모든 push는 Fast 검사만 하며 문서 변경 때문에 배포할 필요는 없습니다. 실제 preview 배포는 사용자 승인 범위에서
pages.yml을 deploy=true와 승인된 full SHA로 명시적으로 실행합니다. main SHA와 실제 배포 SHA를 구분합니다.
**P2A visual 승인·7714907 main push·Fast CI 34004955387 성공. P2B Bold 시각 승인: QUALITY APPROVED FOR HERO INTEGRATION / FROZEN. P2B 보고 후 STOP; HOME/P2C 자동 진행 없음.**

## 실제 콘텐츠 추가 절차

승인된 source audit와 mapping을 바탕으로 `src/content/records/<identity>.server.ts`에 해당 domain 타입의 record를
작성하고 `src/content/registry.server.ts`에 등록합니다. 테스트용 `fixtures.ts`와 실제 자료는 분리합니다.
public 화면·metadata에서 raw registry를 직접 import/serialize하지 않습니다. 공개 경로는 별도 승인된 integration에서
`catalog.ts`의 public selectors와 명시적 build instant를 통해 구성합니다. 등록만으로 페이지가 생기지 않습니다.

P1D의 private는 사이트 공개 제외 상태이며 공개 Git 저장소의 비밀 저장 기능은 아닙니다. draft publication,
미검토 locale, provisional source-only cover를 유지하고 공개용 runtime 파일·EN·review를 임의로 채우지 않습니다.
`test:content`는 실제 draft와 기존 public fixture를 함께 검증합니다. `test:content:visibility`는 **fresh root build 후**
전체 client/static의 HTML·JS·manifest에 초안 내용이 없는지 검사하며 Fast에 포함됩니다. Full은 Project Pages artifact와
실제 KO/EN unknown route 및 metadata 제외도 확인합니다. 자세한 기준은 Content Schema Contract를 따릅니다.


## Design System foundation / 개발용 Lab

[Foundation guide](docs/redesign/review/DESIGN-SYSTEM-FOUNDATION.md)와 [P2A 결과](P2A-RESULT.md)를 따릅니다.
`src/styles/foundation.css`를 root에서 한 번 import하며 fonts/tokens/base/typography/layout을 공유합니다.
세 Fontsource variable asset package만 추가했고 runtime UI/motion library는 없습니다.

```sh
npm run dev:design-system
```

`http://127.0.0.1:4175/`에서 색상·KO/EN 글자·grid·lines·actions·Ivory/Dark Stage를 확인합니다.
HTML stylesheet link로 foundation을 직접 로드합니다. 이 별도 Vite config는 localhost/noindex 전용이며 build를 거부합니다.
production router/SEO/catalog에는 등록하지 않습니다. 정적 두 base에서 Lab 주소는 404입니다.
`npm run test:design-system`은 자체 Lab 서버를 시작·종료하므로 포트 4175의 수동 dev 서버를 먼저 종료합니다.
P2A 전용 Lab은 실제 HOME이나 최종 template이 아닙니다.


## Editorial Navigation / 개발용 Lab

현재 P2B Refinement는 [navigation guide](docs/redesign/review/EDITORIAL-NAVIGATION-PROTOTYPE.md)와 [freeze 결과](P2B-FREEZE-RESULT.md)를 따릅니다. 최초 P2B·refinement·Letter Slip 비교 결과/이미지/영상은 과거 검토 기록입니다.

```sh
npm run dev:navigation
# http://127.0.0.1:4176/
npm run test:navigation:contract
npm run test:navigation
```

초기 화면은 artist name + MENU입니다. 초기 세로 링크/scroll morph는 사용자 정정으로 취소했습니다.
Canonical Bold만 실행합니다: Letter Slip X +3px / Y ±7px / 300ms / 20ms stagger, MENU-origin diagonal Ivory reveal 500ms, reverse close 400ms, MENU/CLOSE mask, selected underline 없이 index 강조. Hover만으로 열지 않습니다. Refined는 기존 Lab/evidence의 PNG·영상·보고서로만 보존하고 선택 버튼·prop·query 분기는 제거했습니다. KO/EN semantic counterpart와 reduced-motion 계약을 유지합니다.
기존 foundation Lab은 4175입니다. Full 검증 전에 수동 4175/4176/4177 서버를 종료하세요. 테스트는 자체 서버를 실행합니다.
세 Lab 모두 production route/prerender/metadata에 등록되지 않으며 별도 Vite build를 거부합니다.
Full은 38 Node + 84 route + 11 foundation + 26 canonical Bold navigation + 44 Hero cases (Chromium 22 + WebKit 22)를 포함합니다. 사용자가 commit/main push/Fast CI 확인을 승인했으며 최종 delivery 보고와 해당 SHA의 GitHub run이 push/CI 결과를 기록합니다. 배포는 이 작업의 범위가 아닙니다. P2C에서 B를 선택했고 P2D에서 아래 단일 Hero를 다듬었습니다. 실제 Mac Safari smoke와 물리적 휴대폰 QA는 구분해 보고합니다.


## HOME Hero / 단일 Bold Cropped Lab

[P2C 비교 이력](P2C-RESULT.md), [P2D 결과](P2D-RESULT.md), [Hero guide](docs/redesign/review/HOME-HERO-VISUAL-PROTOTYPE.md),
[자산 감사](docs/redesign/review/HOME-HERO-ASSET-READINESS.md)를 따릅니다.

```sh
npm run dev:hero
# http://127.0.0.1:4177/ 또는 /en/
npm run test:hero
# 브라우저가 없을 때 한 번: npx playwright install chromium webkit
```

**P2D APPROVED**. Composition **APPROVED**; Bold Cropped visual direction **APPROVED**; motion / interaction **LOCALLY VERIFIED**; portrait assets **PROVISIONAL**; final Retina quality **PENDING HIGH-RES SOURCE**.
The current approximately 1024×1536 pair does not block subsequent authorized HOME work. When larger originals of attachments 3 and 7 arrive, replace their asset references and repeat Hero Retina QA. Physical-mobile and final HOME QA remain separate.
`src/hero`의 단일 B를 개발 Lab에서만 사용합니다. A/C는 원래 screenshot/video/result evidence로 보존하며
query·prop·UI 선택 분기가 없습니다. 이전 `?study=a/c` URL도 B를 표시합니다. 사진은 승인된 첨부 3→7과
동일한 WebP 4개입니다. 추가 폴더 42장은 모두 약 1.57MP이며 큰 원본 대체물은 없었습니다.

Full은 Chromium/WebKit 각 22 Hero case를 포함합니다. Safari Mac smoke와 실제 휴대폰 검증은 별개입니다.
수동 서버를 종료해야 테스트가 자체 4177 서버를 시작합니다. localhost-only / noindex / 별도 build 금지.
public HOME, 번역 콘텐츠, 다음 scene, content migration, 3D, commit/push/deploy는 이번에 수행하지 않습니다.
최종 시각 승인·큰 원본·물리적 휴대폰 QA를 남기고 **STOP**합니다.


### P2E — Hero → Haegeum development prototype

P2D `d758ee1` main push 및 [Fast CI 34026552008](https://github.com/cij5484/cho-youn-kyoung-v2/actions/runs/34026552008) 성공.
[연속 변형 guide](docs/redesign/review/HOME-HAEGEUM-TRANSITION-PROTOTYPE.md), [결과](P2E-RESULT.md), [시각 증거](evidence/p2e/README.md).

```sh
npm run dev:haegeum
# http://127.0.0.1:4178/ 또는 /en/
npm run test:haegeum
```

동일 Hero stage 안에서 HEAD/PEG → STRINGS/BOW → RESONANCE → FULL HAEGEUM으로 이어집니다.
155svh native travel, 별도 mobile 구성과 정적 reduced-motion sequence. 베이지 final reference는 사용자가
AI 생성으로 확인한 임시 editorial 자산이며 화면·alt·문서에서 공개합니다. 실제 실물/구조 자료로 취급하지 않습니다.
Full은 기존 165 browser +26 Haegeum =191 browser와 38 Node를 검사합니다. 포트 4178 수동 서버는 테스트 전에 종료합니다.
Lab-only, noindex, build 차단, public HOME·content·SOUND·다음 scene·3D·배포 없음. **P2E 시각 방향 승인**. main delivery/Fast/clean 확인 후 P2F refinement·quality·device QA만 승인되었으며, 완료 후 STOP합니다.


### P2F — Hero → Haegeum refinement / quality review

P2E는 feature `0873b75` / CI `c73a3be` main push 및 [Fast CI 34029859649](https://github.com/cij5484/cho-youn-kyoung-v2/actions/runs/34029859649) 성공으로 delivery 완료했습니다.
같은 `npm run dev:haegeum` / **http://127.0.0.1:4178/** 에서 P2F를 검토합니다.
울림통 크롭이 전체 해금으로 펼쳐지는 pullback·mask, 독립 mobile과 자산 교체 설정을 보완했습니다.
Full: 38 Node +197 browser. [결과](P2F-RESULT.md), [시각 증거/영상](evidence/p2f/README.md),
[실제 Safari 검증 한계](evidence/p2f/safari-device-qa.md).
사용자가 P2F 시각 결과를 승인했습니다: **QUALITY APPROVED / FROZEN**. 기존 결과·evidence는 당시 기록을 보존합니다.
실제 Safari motion 미검증은 future QA로 남기며, 원본/Retina·휴대폰·VoiceOver·열 검증은 non-blocking입니다.
P2F는 `b5c6aa0`로 main delivery했고 exact-SHA Fast CI 34032488461이 성공했습니다. P2G는 아래 SOUND 한 장면까지 구현하고 STOP합니다. 배포는 하지 않습니다.

### P2G / P2H — HOME Sound refinement / REVIEW READY

```sh
npm run dev:sound
npm run test:sound
```

[Sound preview](http://127.0.0.1:4179/) · [English counterpart](http://127.0.0.1:4179/en/).
기존 Hero/Haegeum을 지나면 같은 두 선이 수평의 SOUND 공간으로 이어집니다. LISTEN을 선택해야
한범수류 중중모리 **02:46–03:04 / 18초** 후보가 재생됩니다. 자동 재생은 없고 PAUSE / RESUME / REPLAY를 제공합니다.
사용자가 곡과 하이라이트 선택을 위임했습니다. P2G/P2H 당시 남아 있던 최종 구간·SOUND 시각 검토는 이후 P2I closeout에서 승인됐습니다.

`src/sound`의 미리듣기는 Lab에서만 사용합니다. 434,470-byte AAC 한 건이며 원본은 수정하지 않았습니다.
noindex / Lab build 차단 / public artifact 제외를 유지합니다. 실제 content record나 production HOME은 추가하지 않았습니다.
[구현 정본](docs/redesign/review/HOME-SOUND-EXPERIENCE.md), [결과](P2G-RESULT.md), [시각·영상 증거](evidence/p2g/README.md).
P2G 결과는 승인되어 `dab4617`에 보존했습니다. P2H는 같은 SOUND만 다듬었습니다: 마찰 밀도·damping,
buffered replay, 320px caption, Safari focus/type-mask 보완. Full 38 Node +255 browser (Sound 58) 검증.
실제 Safari 재생·pause·end·replay·focus는 확인했으나 Mac 잠금으로 나머지 native QA는 미완료입니다.
[현재 결과](P2H-RESULT.md), [현재 증거](evidence/p2h/README.md). Commit/main push/Fast CI는 이번에 승인된 delivery이며
정확한 결과는 완료 보고를 따릅니다. 배포 없음. **REVIEW READY / FREEZE CANDIDATE → STOP → 사용자 승인**.


### P2I — SOUND Bow Contact Choreography (development only)

Start `npm.cmd run dev:sound`. [Canonical B2 / LONG 460ms / Electric Violet](http://127.0.0.1:4179/) has no comparison UI. Development comparisons: [A · line only](http://127.0.0.1:4179/?compare=a),
[B1 · medium](http://127.0.0.1:4179/?compare=b&activity=medium), or
[B2 · bold / Electric Violet / LONG](http://127.0.0.1:4179/?compare=b).
The Lab panel changes activity, four trail histories and three Violets at the same playback position.
LISTEN is explicit. B2 is the approved production direction; the public HOME remains unimplemented.
[Historical closeout / QA classification](P2I-CLOSEOUT-RESULT.md) distinguishes the P2I SOUND freeze from the then-red Windows Full gate. P2J below closes the foundation owner.

[Revised comparison contract](docs/redesign/review/SOUND-BOW-CONTACT-COMPARISON.md),
[current result](P2I-CHOREOGRAPHY-RESULT.md), [videos / evidence](evidence/p2i-choreography/README.md).
[Original P2I result](P2I-RESULT.md) and [bronze evidence](evidence/p2i/README.md) remain historical.

Validation: `npm.cmd run test:sound:contract`, `npm.cmd run test:sound`, `npm.cmd run gate:full`.
Stop the manual 4179 server before browser tests/Full; the test runner owns that port.
`capture-sound-choreography.mjs` records the historical P2I evidence path; preserve those recordings. Use P2J's capture command below for the current response.
Videos are real-time SILENT browser recordings; use the Lab for listening with synchronized visuals.
Windows Playwright WebKit's missing AudioContext cannot certify analyser motion or native Mac Safari behavior.

Learning: [INTERACTION-GLOSSARY](docs/redesign/INTERACTION-GLOSSARY.md) explains current/future interaction terms.
It is a human reference, not agent instructions. Official V2 experience principles live in
[MASTER §3.1](docs/redesign/00-MASTER-PLAN.md#v2-experience-principles).

### P2J — Font CLS closeout / shared feature-driven bow response

SOUND의 **B2 / LONG 460ms / Electric Violet** 구성은 QUALITY APPROVED / FROZEN입니다.
P2J는 같은 시각 방향에서 `HOME_SIGNATURE`의 반응을 더 민감하게 만들었습니다. 새로운 속도감의 시청·청취
승인은 별도 리뷰 사항입니다. [현재 결과](P2J-RESULT.md), [영상·측정·QA](evidence/p2j/README.md).

```sh
npm run extract:audio -- scripts/audio/home-manifest.json
npm run test:sound:contract
node scripts/verify-p2j-font-cls.mjs
node scripts/capture-p2j-response.mjs
npm run gate:full
```

추출과 browser 검증/촬영은 `npx playwright install chromium webkit`가 필요합니다. Fast는 browser 설치
없이 새 feature/motion Node 계약도 검사합니다. 추출은 명시적 manifest만 읽고, 현재 18초에 대한 작은
25Hz JSON을 만듭니다. 전체 album batch나 콘텐츠 migration은 실행하지 않았습니다.
촬영 명령은 자체 서버(4193)를 열고 닫습니다. Full 및 다른 browser suite와 측정을 동시에 실행하지 마세요.
Font 검증은 자체 4186 서버를 사용합니다. 수동 4179 Lab은 Full 실행 전에 종료합니다.

`npm run dev:sound` 후 [현재 반응](http://127.0.0.1:4179/)을 열고 LISTEN을 선택하세요.
개발 비교: [동결된 B2 response](http://127.0.0.1:4179/?compare=b&response=b2),
[HOME_SIGNATURE](http://127.0.0.1:4179/?compare=b&response=signature).
Response 선택은 동일한 재생 위치/graph를 유지합니다. 기본 entry와 production-facing API에는 비교 UI가 없습니다.
모든 조정/추출/향후 Album 연결의 정본은 [기존 SOUND 계약](docs/redesign/review/SOUND-BOW-CONTACT-COMPARISON.md)입니다.
실제 Safari·휴대폰·VoiceOver·thermal 증거는 자동 WebKit/모바일 에뮬레이션과 구분합니다.
배포 없음. **REPORT → STOP → 사용자 승인**; WORKS/다음 HOME Scene은 시작하지 않습니다.


### P2K — Spatial / Janggu / Typography comparison Lab

이번 세 실험은 사용자 시각 선택을 위한 후보입니다. P2F/P2I의 기존 승인은 유지하며 새로운 B를 자동으로
production 정본으로 바꾸지 않습니다. [비교 계약](docs/redesign/review/P2K-INTERACTION-PROTOTYPES.md),
[결과](P2K-RESULT.md), [정상 속도 영상·증거](evidence/p2k/README.md).

```sh
npm run dev:interaction
npm run test:interaction:contract
npm run test:interaction
node scripts/extract-p2k-percussion.mjs
node scripts/capture-p2k.mjs
npm run gate:full
```

[현재 HOME](http://127.0.0.1:4180/), [기존 A/B 설정](http://127.0.0.1:4180/?compare=1), [모두 A](http://127.0.0.1:4180/?all=a).
접속하려면 먼저 dev:interaction 서버가 실행 중이어야 합니다. 기본 HOME에는 비교 dock이 없고, 명시적 query에서만
기존 비교 설정을 한글로 표시합니다. 영어 fixture는 /en이며 후반부 KO source에는 명시적 `lang=ko`를 유지합니다.
타이포그래피 단독 비교는 [명시적 study](http://127.0.0.1:4180/?study=type)에만 있습니다. 실제 18초 음원
재생은 LISTEN으로 시작합니다. 영상 파일은 화면만 기록한 무음이며, 원래 재생 속도입니다.

추가 dependency 없음. Fast는 Node 계약을, `test:interaction`은 기존 24개 Chromium/WebKit case를 검사합니다.
테스트는 4180, 촬영은 4195를 사용합니다. 수동 4179/4180 서버는 Full 전에 종료하고 browser suite와 촬영을
동시에 실행하지 마세요. 기존 촬영 명령과 evidence/p2k는 역사적 revision용이며 현재 검증으로 덮어쓰지 않습니다.
Production export는 차단되어 있고 실제 Pages 배포나 public HOME 편입은 하지 않습니다. **STOP → 사용자 승인.**

### 현재 HOME 후반부 검증

`npm run test:home`은 4180 서버를 직접 시작·종료하며 HOME smoke와 기존 상호작용을 함께 검사합니다.
수동 4180 서버를 먼저 종료하세요. 이 명령은 screenshot/video/trace를 생성하지 않습니다.
실제 자산 출처·hash·provisional 상태는 `src/home/assets/manifest.json`, 선택 데이터는 `src/home/content.ts`가 소유합니다.
새 장면에 A/B는 추가하지 않았습니다. 최종 시각 선택, 실물 디바이스 및 공개 route 통합은 별도 작업입니다.
