# HOME closing pair — 2026-09-08

Local implementation over the preceding uncommitted HOME refinement. **REVIEW READY / STOP**.

## 1. What was changed

사용자가 요청한 동일한 두 궤적을 기존 04에서 08까지 연결했다. 이전 SOUND 우측 수축, 헤드 없는
Electric Violet/Lacquer 긴 꼬리와 앨범 양축 반응, 최소 문구는 유지한다.

- 05: 두 궤적이 마우스를 중심으로 감쇠를 갖고 회전한다. 터치/포인터 부재 시 앨범 중심으로 이어진다.
- 06: 선택된 실제 공연 포스터 주변을 회전하며 앞뒤 깊이에 따라 포스터에 가려진다.
- 07: 프로필 사진과 조윤경 이름의 실제 배치 축을 따라 8자 궤도로 오간다. 모바일의 세로 배치도 따른다.
- 08: 큰 이름의 글자 앞뒤를 통과하는 투영된 깊이감. 끝에서 넓은 궤도가 하나의 대각선으로 모여 빠져나간다.
  소멸 진행에는 감쇠를 적용해 마지막 스크롤 입력에서 갑자기 잘리지 않게 했다. 역스크롤하면 다시 이어진다.
- 한 쌍의 Canvas와 공통 phase/history를 유지하고 장면별 목표 좌표를 보간한다. 새로운 헤드를 만들지 않는다.
- 메뉴/숨김/범위 밖/reduced-motion/종료 상태에서는 rAF를 멈춘다. pointer-events:none으로 조작을 차단하지 않는다.

## 2. Files changed in this bundle

- `src/home/works-motion.ts`: 기존 궤적 수명 확장, 장면 대상 보간, 깊이 마스킹, 종료/역진입.
- `src/home/closing-orbit.ts`: 마우스/포스터 타원, 배치 축을 따르는 8자 궤도, Outro 수렴·이탈 좌표.
- `src/home/HomeClosing.tsx`, `src/home/SelectedWorks.tsx`, `src/home/home.css`: 같은 두 Canvas를 HOME closing 범위로 이동.
- `tests/home.spec.ts`: 실제 Canvas 픽셀, 동일 노드 유지, 포인터 추적, 05–08, 종료/역진입, 메뉴/키보드,
  reduced motion, 320/390 모바일 검증 4개 시나리오 추가(두 엔진 총 8건).
- `CODEX-HANDOFF.md`, HOME/Motion canonical, active plan, 본 결과 및 evidence.

이전 미커밋 파일과 evidence는 보존했다. 새 의존성, 자산, 콘텐츠, 페이지, WebGL/3D 모델은 추가하지 않았다.

## 3. Tests performed

- Node 24.15.0 / npm 11.12.1, macOS.
- **gate:fast PASS**: type-check / lint / Node 계약 / production build / locale·content·Lab artifact exclusion.
- **test:home 58 PASS**, Chromium + WebKit. 이전 SOUND 진입/우측 수축, 앨범 입력, KO/EN,
  reduced motion, 모바일 동작과 후반부의 새 궤적 검사를 포함한다.
- 첫 실행 57 PASS / 1 FAIL: WebKit에서 마우스 클릭이 버튼 포커스를 주지 않아 keyboard focus restore
  기대가 실패했다. 키보드 검증을 실제 focus → Enter → Esc 흐름으로 수정했다. navigation 코드는 변경하지 않았다.
- 실제 내부 브라우저 확인과 Chromium desktop 1440×1000 / mobile 390×844 캡처.
- `git diff --check`, 문서 로컬 링크 확인 PASS.
- 별도 SOUND 전체 suite는 이번에 재실행하지 않았다. 이전 결과의 main에서도 재현된 5건은 그대로 남는다.

## 4. Result

요청한 05–08 연속 궤적 구현 및 해당 범위 로컬 검증 완료. **REVIEW READY**, 사용자 시각 승인 대기.
3D 느낌은 투영 좌표, 두 깊이 레이어, 실제 사진/글자 마스크로 표현했다. 실제 3D 모델 품질 승인이 아니다.
Commit / push / PR / CI dispatch / deploy 없음.

## 5. Known issues / limits

- Native Safari, 실제 휴대폰과 장시간 발열 QA는 수행하지 않았다. WebKit 자동 검증을 실기기 QA로 부르지 않는다.
- 사진 뒤 가림은 현재 DOM 이미지 경계 기준이다. 새로운 인물 실루엣 마스크/3D 모델은 만들지 않았다.
- 모바일은 DPR ≤1.25, 이력 ≤180개, 정적 reduced-motion 대안으로 유지한다. 궤적은 의미 전달의 필수 UI가 아니다.
- 이전 SOUND 기존 실패 5건, provisional 사진과 최종 Retina/앨범 자산 제약은 별도 항목이다.
- 롤백은 `.checkpoints/closing-orbits-before/`의 직전 수정본/patch 기준으로 이 묶음만 되돌린다.

## 6. Evidence / preview

[4180 HOME](http://127.0.0.1:4180/) · [영상·캡처·검증 목록](evidence/closing-orbits-20260908/README.md).
원본 브라우저 녹화/캡처이며 합성하거나 원본 사진을 편집하지 않았다.

## 7. Recommended next task

현재 05–08 궤도 크기와 08 소멸 동작을 먼저 시각 검토한다. 승인 후 이 변경 묶음의 전달 작업을 별도로 진행할 수 있다.
다음 Scene은 시작하지 않는다.

**STOP — 사용자 시각 검토 대기.**
