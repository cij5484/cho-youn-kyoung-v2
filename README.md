# Cho Youn Kyoung Website V2

P0E에서 승인된 KO/EN routing·metadata 계약을 CI와 명시적 delivery 절차에 연결했습니다. React + TypeScript + Vite 기반의
18개 neutral test route에 P2A production CSS foundation을 적용했습니다. 실제 HOME/template·공식 번역은 미구현이며 실제 앨범은 private draft입니다.
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
npm.cmd run test:content
npm.cmd run test:placement
npm.cmd run build
npm.cmd run test:content:visibility
npm.cmd run test:design-system:artifacts
npm.cmd run build:pages-preview
npm.cmd run test:spike
npm.cmd run test:design-system
```

`check`는 type-check/lint/root build만 실행합니다. 전체 로컬 계약 검증은 위의 열한 명령입니다.
두 build는 같은 framework typegen/cache를 사용하므로 순서대로 실행합니다.

일반 코드 확인은 `npm.cmd run gate:fast`, routing/metadata/CI 변경의 전체 확인은
`npm.cmd run gate:full`을 사용합니다. Fast는 위의 첫 여덟 명령, Full은 열한 명령 전체입니다.
Push/PR마다 Fast + workflow syntax 검사를 수행하고, 브라우저 설치/84개 route + 11개 Lab Full은 명시적 수동 실행과 배포 전에 수행합니다.
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
- [P0B checkpoint](P0B-CHECKPOINT.json), 이전 코드: .checkpoints/p0b-before/
- [P0A 결과 — 과거 기록 보존](P0A-RESULT.md)
- [작업 분할·STOP 규칙](docs/redesign/review/IMPLEMENTATION-TASK-PROTOCOL.md)
- [기획 MASTER](docs/redesign/00-MASTER-PLAN.md), [기존 HANDOFF](CODEX-HANDOFF.md)

P0B까지 기획·review 원본 21개를 보존했습니다. P0C에서는 사용자 지시대로 관련 planning 상태만 architecture APPROVE로 갱신했습니다.
P0A–D 결과는 당시 기록으로 보존합니다. 현재 delivery 상태/CI run/배포 증거는 P0E 결과를 따릅니다.
모든 push는 Fast 검사만 하며 문서 변경 때문에 배포할 필요는 없습니다. 실제 preview 배포는 사용자 승인 범위에서
pages.yml을 deploy=true와 승인된 full SHA로 명시적으로 실행합니다. main SHA와 실제 배포 SHA를 구분합니다.
**P1C/P1D 승인·main push·Fast CI 완료. 현재 P2A Design System Foundation REVIEW READY / visual 승인 대기. P2A 결과 보고 후 STOP; HOME/P2B 자동 진행 없음.**

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
