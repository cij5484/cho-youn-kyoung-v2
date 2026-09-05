# P0A — project skeleton / base configuration

완료일: 2026-09-05. **P0A COMPLETE / STOP / P0B 명시적 승인 대기**.
기존 기획·review·HANDOFF·ZIP은 수정하지 않았다. 계획 파일의 이전 미착수 표기는 그대로 보존하며 현재 구현 상태는 이 기록으로 구분한다.

## 1. What was changed

Legacy 구조/자산/CSS/component 복사 없이 React + TypeScript + Vite 최소 기반을 새로 작성했다.
최소 App은 제목 하나와 semantic main만 렌더링하며 CSS, 디자인, 페이지, Router, 콘텐츠, 3D, motion, audio가 없다.
개발 서버, type-check, ESLint, production build 명령과 Node/app 분리 TS 설정을 추가했다.
root /와 /cho-youn-kyoung-v2/의 asset prefix를 config/build.ts 한 곳에서 관리한다.
이것은 asset base 준비이며 clean routing/static prerender/hosting architecture 결정이 아니다.

## 2. Files changed

기존 파일 수정: **0개**. 기존 파일 **21/21 SHA-256 동일**.

새 파일:
- [package.json](package.json)
- [.gitignore](.gitignore)
- [.npmrc](.npmrc)
- [tsconfig.json](tsconfig.json)
- [tsconfig.app.json](tsconfig.app.json)
- [tsconfig.node.json](tsconfig.node.json)
- [config/build.ts](config/build.ts)
- [vite.config.ts](vite.config.ts)
- [eslint.config.js](eslint.config.js)
- [index.html](index.html)
- [src/main.tsx](src/main.tsx)
- [src/app/App.tsx](src/app/App.tsx)
- [src/components/.gitkeep](src/components/.gitkeep)
- [src/config/.gitkeep](src/config/.gitkeep)
- [src/content/.gitkeep](src/content/.gitkeep)
- [src/assets/.gitkeep](src/assets/.gitkeep)
- [src/features/.gitkeep](src/features/.gitkeep)
- [src/styles/.gitkeep](src/styles/.gitkeep)
- [public/assets/.gitkeep](public/assets/.gitkeep)
- [README.md](README.md)
- [package-lock.json](package-lock.json)
- [P0A-RESULT.md](P0A-RESULT.md)
- [P0A-CHECKPOINT.json](P0A-CHECKPOINT.json)

node_modules/, dist/, dist-pages-preview/는 설치·검증에서 생성된 출력이다.
P0A-CHECKPOINT.json에는 작업 전 해시와 새 파일/출력 목록을 기록했다.
되돌릴 때 이 범위만 확인하며 기획 문서를 삭제하거나 덮어쓰지 않는다. 실제 rollback은 수행하지 않았다.

## 3. Dependencies installed

실행 환경: Node 24.15.0 / npm 11.12.1.
직접 의존성은 exact version, 전이 의존성은 package-lock.json으로 기록한다.

| Package | Version |
|---|---|
| react | 19.2.8 |
| react-dom | 19.2.8 |
| @eslint/js | 10.0.1 |
| @types/node | 24.13.3 |
| @types/react | 19.2.18 |
| @types/react-dom | 19.2.7 |
| @vitejs/plugin-react | 6.1.1 |
| eslint | 10.10.0 |
| eslint-plugin-react-hooks | 7.1.1 |
| eslint-plugin-react-refresh | 0.5.6 |
| globals | 17.12.0 |
| typescript | 6.0.3 |
| typescript-eslint | 8.69.0 |
| vite | 8.2.2 |

Runtime은 React/React DOM 두 개다. 나머지는 개발·검증 도구다.
npm install: exit 0, 160 packages added / 161 packages audited, 0 vulnerabilities reported.
npm ls --depth=0: exit 0, 누락/invalid peer 없음.

선택 당시 TypeScript latest 7.0.2는 typescript-eslint 8.69.0의 peer 범위 <6.1.0 밖이었다.
지원 범위 안의 TypeScript 6.0.3을 고정했다. 강제 설치/legacy-peer-deps는 사용하지 않았다.
공식 기반 참고: [Vite](https://vite.dev/guide/), [typescript-eslint](https://typescript-eslint.io/getting-started/).
최신/peer 정보는 npm registry에서 직접 확인했다.

## 4. Project structure

```text
config/build.ts
src/
  main.tsx
  app/App.tsx
  assets/ components/ config/ content/ features/ styles/  (비어 있음)
public/assets/                                           (비어 있음)
index.html
package.json / package-lock.json
tsconfig.json / tsconfig.app.json / tsconfig.node.json
vite.config.ts / eslint.config.js
README.md / P0A-RESULT.md / P0A-CHECKPOINT.json
docs/redesign/ + CODEX-HANDOFF.md + original ZIP           (보존)
```

빈 폴더는 .gitkeep만 포함한다. 실제 CSS/콘텐츠/feature 구현은 없다.
이 src 기반은 임시 neutral source boundary이며 향후 routing framework의 파일 배치를 고정하지 않는다.

## 5. Tests performed

- npm install 결과 및 npm ls --depth=0 확인.
- npm run type-check / lint / build 수행.
- npm run build:pages-preview로 로컬 asset prefix 생성 확인.
- 일시적인 localhost Vite 서버에서 /, /src/main.tsx, /src/app/App.tsx HTTP 200 및 shell/entry 내용 확인 후 서버 종료.
- dist와 dist-pages-preview의 JS URL prefix 및 대응 파일 존재 확인.
- 기존 파일 21개의 경로·SHA-256 대조.

단순 shell이므로 구현을 복제하는 unit test나 테스트 framework는 추가하지 않았다.
실제 브라우저 렌더·실기기·clean route·404·KO/EN·배포 검증은 수행하지 않았다.

## 6. Build / lint / type-check results

| Check | Final result |
|---|---|
| npm install | PASS / exit 0 / reported vulnerabilities 0 |
| type-check | PASS / exit 0 |
| lint | PASS / exit 0 / max-warnings 0 |
| production build | PASS / exit 0 / no warnings |
| pages-preview asset build | PASS / exit 0 / no warnings |
| local server smoke | PASS / 3 endpoints HTTP 200 / server closed |
| asset prefix | PASS / root /assets/... and subpath /cho-youn-kyoung-v2/assets/... |
| protected files | PASS / 21 of 21 unchanged |

Production output: dist/index.html 0.38 kB; JS 190.49 kB / gzip 59.98 kB.
첫 build에서 Vite가 config import의 명시적 확장자를 권고했다. ./config/build.ts로 수정 후 type-check/lint/root build/preview build를 다시 통과했다. 경고를 숨기는 설정은 사용하지 않았다.

## 7. Known issues

P0A 범위 내 남은 실패/경고는 없다.
Routing/static prerender 적합성, Pages direct refresh/404, KO/EN 및 실제 deployment는 미검증이며 P0B 이후 범위다.
npm audit 0은 이번 설치 시점의 보고이며 미래 취약점이나 제품 전체 안전 보증을 뜻하지 않는다.
개발 서버는 종료했다. 로컬 실행은 README의 npm.cmd run dev를 사용한다.

## 8. Any deviations from the approved plan

기능 범위 이탈 없음. 기존 planning/review 파일 덮어쓰기 없이 새 root 실행 안내와 결과/체크포인트만 추가했다.
폴더는 src/ 아래의 최소 경계로 두었으며 제안 architecture의 세부 route/feature를 미리 구현하지 않았다.
local preview-base build는 P0A base configuration 확인만 수행했다. P0B routing/deployment spike를 시작하지 않았다.
Git 초기화, GitHub remote/repository 생성, 배포, AGENTS 최종 구성은 하지 않았다.

## 9. Recommended P0B task

P0B — 별도 승인된 routing + GitHub Pages deployment spike.
후보 Router/prerender를 작은 route fixture와 실제 Project Pages에서 조사하는 단일 작업으로 범위를 먼저 명시한다.
필요한 named V2 remote/Pages 생성은 그 P0B의 향후 명시적 승인 범위여야 한다.
현재는 후보를 설치하거나 routing을 추가하지 않는다.

**STOP. P0B를 시작하지 않았으며 사용자의 명시적 승인을 기다린다.**
