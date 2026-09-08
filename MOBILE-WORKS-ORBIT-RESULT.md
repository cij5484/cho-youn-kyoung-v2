# Mobile 04 free trails — 2026-09-08

## 1. What changed

모바일 Works 그리드에서만 루프를 중단하던 조건을 제거했다. 화면에 보이는 그리드 영역을 기준으로
좌우·상하 이동 범위를 정해 이미지 사이를 자유롭게 흐르게 했다. 두 헤드 없는 Violet/Lacquer 꼬리,
05–08 연속성, 세로 스크롤, reduced motion은 유지한다. 모바일 hover는 추가하지 않는다. 좁은 화면의 첫 큰 이미지가 한 색상을 오래 가리지 않도록 모바일 04만 이미지 뒤 가림을 제외한다.

## 2. Files

`src/home/works-motion.ts`, `tests/home.spec.ts`, HOME/Motion canonical, HANDOFF,
본 결과와 `evidence/mobile-works-orbit/`. 이전 미커밋 작업을 보존했다. 의존성/자산/라우트 변경 없음.

## 3. Validation

**Fast PASS / Chromium·WebKit HOME·interaction 62 PASS**. 아래 로그에 기록한다. 320·390px 각각 그리드 위/아래에서
두 색상 Canvas 픽셀이 실제로 존재하고 좌표가 시간에 따라 움직이는지 검사했다. 05–08, 메뉴,
reduced motion, 링크 및 가로 넘침 검사도 유지했다. 브라우저 캡처를 실제로 확인했다.

- [Fast](evidence/mobile-works-orbit/fast.txt)
- [HOME / interaction](evidence/mobile-works-orbit/home.txt)

초기 검사에서 320px 두 엔진 모두 한 색상이 이미지 뒤에 가려지는 문제가 확인됐다. 해당 모바일 가림을 수정했으며 초기 실패 로그를 보존한다.

## 4. Result

모바일 04 누락 수정 완료 / LOCAL REVIEW READY / STOP. 사용자 시각 승인은 별도다.
Commit/push/deploy 없음. 직전 배포 작업의 Full Gate 실패를 변경하거나 우회하지 않았다.

## 5. Limits

Native Safari 및 실제 휴대폰 QA는 이번에 수행하지 않았다. 모바일 DPR ≤1.25, 이력 ≤180개 제한을 유지한다.
롤백은 `.checkpoints/mobile-works-orbit/`의 직전 파일을 기준으로 이 수정만 되돌린다.

## 6. Preview

[로컬 HOME](http://127.0.0.1:4180/) · [320px](evidence/mobile-works-orbit/320.png) · [390px](evidence/mobile-works-orbit/390.png).
캡처는 Chromium viewport 검증이며 실기기 증거가 아니다.

## 7. Next

모바일 04의 자유 궤적을 시각 검토한다. 다음 작업이나 배포는 자동 진행하지 않는다. **STOP.**
