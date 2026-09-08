# HOME refinement — 2026-09-08

Base: main `83e80b1`. Local uncommitted refinement / REVIEW READY / STOP.
User scope: SOUND exit, returned tails, stronger album pointer response, minimal visible copy.

## 1. What was changed

- SOUND 두 줄의 왼쪽 끝만 오른쪽으로 수축한다. handoff 0–60%에서 오른쪽 끝과 높이를 유지하고,
  60–100%에서 작품 궤도로 연결한다. 역스크롤은 같은 좌표식을 역으로 따른다.
- 돌아온 두 궤적은 Electric Violet `#6334E5` / Lacquer `#A33D36`으로 유지한다.
  원형 헤드를 삭제하고 꼬리 이력은 430ms → 2000ms, 최대 360샘플로 확대했다. 기존 Hero/SOUND 마커는 별도 소유다.
- 앨범은 기본 자세 기준 좌우 ±28° / 상하 ±20° 포인터 반응을 갖는다. 조명도 실제 각도를 따르며,
  드래그 시작 시 현재 보이는 자세를 인계하고 포인터 이탈 시 부드럽게 안정화한다.
- SOUND/Works/Album/Performance/Artist/Outro의 반복 설명을 줄였다. 곡·작품·연주자명, 연도·장소,
  청취 상태, 짧은 조작 안내, 접근성 레이블, AI/provisional 출처 표시는 유지했다.

## 2. Files changed

- `src/home/works-motion.ts`: 오른쪽 수축, 색상, 헤드 삭제, 긴 꼬리.
- `src/home/album-motion.ts`: 양축 hover, 드래그 인계, 조명.
- `src/home/{SelectedWorks,AlbumObjectStage,PerformanceScene,ArtistScene,HomeOutro}.tsx`, `src/home/home.css`:
  문구와 더 이상 쓰지 않는 스타일 정리.
- `src/sound/SoundSurface.tsx`, `src/sound/sound.css`: 설명 축약, 모바일 크레딧 배치.
- `tests/home.spec.ts`: 고정 오른쪽 끝/역스크롤/색상/헤드 부재 및 양축 hover/드래그 인계 검사 추가.
- `CODEX-HANDOFF.md`, `docs/redesign/{03-MOTION-SYSTEM,04-HOME}.md`,
  `docs/redesign/review/{V2-IMPLEMENTATION-PLAN,IMPLEMENTATION-TASK-PROTOCOL}.md`: 현재 계약·STOP 경계.
- 본 결과 및 `evidence/home-refinement-20260908/`: 검증 로그와 실제 브라우저 캡처.
- 의존성·실제 콘텐츠·원본 자산·공개 라우트 변경 없음.

## 3. Tests performed

macOS, Node 24.15.0 / npm 11.12.1, Playwright Chromium + WebKit.

| 검사 | 결과 |
|---|---|
| `gate:fast` | PASS — type/lint, Node 계약, build, locale/content/public artifact exclusion |
| `test:home` | 50 PASS — HOME 및 interaction, desktop/mobile 320·390, reduced motion, input/route cleanup |
| `test:sound` | Node 계약 PASS; browser 83 PASS / 5 FAIL |
| 실패 6개 조합 집중 검사 | 현재 1 PASS / 5 FAIL; 수정 전 `83e80b1`도 1 PASS / 동일 5 FAIL |
| `git diff --check` | PASS |
| 시각 확인 | 내부 브라우저 및 1440×1000/390×844 캡처 확인 |

SOUND 실패는 Chromium/WebKit 각각 320·390의 기존 `.contact-head` 크기 기대값 4건과
WebKit 8회 locale 이동 후 AudioContext closed 기대값 1건이다. 원래 main을 별도 detached worktree로
실행해 동일 실패를 재현했다. 테스트를 완화하거나 기존 SOUND 마커/AudioContext 소유자를 수정하지 않았다.
전체 SOUND suite 또는 Full을 PASS로 간주하지 않는다. 초기 HOME 검사 두 실패는 실제 SOUND 도착을 기다리지
않는 fixture였으며, 이미지 decode와 SOUND 완성 후 전환을 검사하도록 수정했다. 초기 type 오류는 Canvas
계측 fixture의 overloaded stroke 호출을 보존하는 방식으로 수정했다.

## 4. Result

요청한 동작은 구현 및 해당 범위 로컬 검증 완료. **REVIEW READY**, 사용자 시각 승인은 별도다.
현재 앨범은 기존 CSS 2.5D 표현이며 새로운 GLB/실제 디지팩 제조 모델의 품질 승인이 아니다.
Commit / push / PR / CI dispatch / deploy는 수행하지 않았다. 작업 트리는 검토할 변경사항을 보존한다.

## 5. Known issues

- 위 5건은 기존 SOUND QA 이슈로 별도 남긴다. 새로운 회귀로 확인된 항목은 없다.
- Native Safari 및 실제 휴대폰 QA는 이번에 수행하지 않았다. WebKit 자동 검증과 구분한다.
- 긴 꼬리는 수명 약 4.65배이며 실제 화면 길이는 이동 속도에 따라 달라진다.
- 기존 provisional 이미지/Retina 및 최종 Album 3D 자산 제한은 유지된다.
- 롤백 기준은 `83e80b1` 및 `.checkpoints/home-refinement-20260908/`; 본 묶음 파일만 되돌리고 이후 사용자 작업은 보존한다.

## 6. Screenshots / preview

[현재 HOME 미리보기](http://127.0.0.1:4180/) · [캡처/로그 목록](evidence/home-refinement-20260908/README.md).
내부 브라우저는 SOUND → Works 수축 구간에 열어 두었다. 원본 사진 변경이나 합성 캡처는 없다.

## 7. Recommended next task

먼저 현재 수축/꼬리/디지팩 반응을 시각 검토한다. 이후 별도 승인 시 기존 SOUND 모바일 마커 계약과
WebKit AudioContext 종료 검사 5건만 한 묶음으로 점검하는 것을 권장한다. 새 Scene으로 진행하지 않는다.

**STOP — 사용자 검토 대기.**
