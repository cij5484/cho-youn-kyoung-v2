# Cho Youn Kyoung Website V2

P0C 실제 GitHub Pages 배포와 routing 검증까지 완료했습니다. React + TypeScript + Vite 기반의
13개 neutral test route이며 실제 사이트 디자인·콘텐츠는 없습니다.
**P0A–C 완료 / React Router + Static Prerender APPROVE / P0D 미착수.**

실제 preview: [GitHub Pages](https://cij5484.github.io/cho-youn-kyoung-v2/).
검증된 배포 commit: `137b3420fda15b9670e109989da54230d959966e`.
[배포·검증 결과](P0C-RESULT.md), [파일 배치와 CI 계약](P0C-DEPLOYMENT.md).

## 실행 환경

Node.js 24.x / npm 11.x. 직접 의존성은 exact version과 lockfile로 고정합니다.
새 설치는 `npm.cmd ci --include=dev`입니다. 브라우저 검증에는 설치된 Microsoft Edge를 사용합니다.

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
npm.cmd run build
npm.cmd run build:pages-preview
npm.cmd run test:spike
```

`check`는 type-check/lint/root build만 실행합니다. 전체 P0B 재검증은 위의 다섯 명령입니다.
두 build는 같은 framework typegen/cache를 사용하므로 순서대로 실행합니다.

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
src/spike/                    경로 fixture, URL 및 테스트 metadata
src/styles/spike.css          비시각 CSS 로딩 확인 marker
public/spike/path-check.svg   새로 만든 16px 경로 검증 fixture
scripts/                      CLI 실행, 정적 artifact 배치, 검증용 서버
tests/                        두 base의 34개 Playwright 검증
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
P0A/P0B 결과는 과거 기록으로 보존하며 최신 상태는 P0C 결과와 ADR을 따릅니다. V2 repository/remote/Pages만 생성했습니다.
문서·증거만 바뀐 commit은 재배포하지 않으므로 최신 main SHA와 `build-info.json`의 배포 코드 SHA를 구분합니다.
**보고 후 STOP. 사용자의 명시적 승인 전에는 P0D 또는 다른 구현 단위를 시작하지 않습니다.**
