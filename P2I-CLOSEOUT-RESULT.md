# P2I Closeout — QA Gap Classification, Visual Freeze & Delivery

2026-09-07 · 사용자 승인: B2 Bold / LONG 460ms / Electric Violet #6334E5.
**SOUND QUALITY APPROVED / FROZEN. Full gate는 FAIL이며, 아래 분류는 배포 면제가 아니다.**

## 1. Final selected configuration

**B2 — Bold Activity · LONG / 460ms · Electric Violet #6334E5.**
“Strings vibrate. Bow flows.” / “현은 떨고, 활은 흐른다.” 현의 micro vibration·장력·공명과
활 접점의 smooth trajectory·velocity continuity·directional sweep를 분리한다. Marker에는 jitter를
주지 않고, trail은 실제 최근 위치 이력을 가늘고 흐리게 연결한다.

`src/sound/contact-motion.ts`가 activity, size, opacity, 수평·수직 range, history/persistence/opacity,
Violet strength와 audio gain의 정본이다. LONG 명목 460ms와 기존 mobile/energy 보정은 그대로 유지했다.
“꼬리를 더 길게”는 history/persistence config 조정으로 시작하며 choreography 재작성은 필요하지 않다.
유한 buffer를 넘는 길이·주사율은 별도 확인한다. [정확한 tuning map](docs/redesign/review/SOUND-BOW-CONTACT-COMPARISON.md).

## 2. B2 visual freeze status

사용자의 시각 승인으로 **canonical production direction / FROZEN**. 승인된 경로·색·수치는 유지했다.
`SoundExperience`는 locale/source만 받으며 central `soundDirection`을 적용한다. 내부 `SoundComposition`을
공유하는 Lab adapter만 대안을 받는다. Lab `/`와 `/en`은 선택 UI 없이 B2를 표시하고, `?compare=a|b`는
개발 비교 화면을 연다. A/B1/다른 Violet 및 예전 bronze 결과는 Lab/evidence에 보존했다.
두 production build에는 Lab·SOUND·비교 UI가 포함되지 않는다. Public HOME integration은 아직 미구현이다.

## 3. Font CLS failure classification

**P2A부터 존재한 실제 개발 Lab flex-wrap shift; P2I regression 아님.** P2A `7714907`과 현재의
foundation 9파일 및 테스트/config가 동일하다. 동일 Windows 조건에서 각 3회 CLS **.1600214060**을
재현했다. Noto Sans KR 로딩으로 masthead 마지막 label이 3번째 줄에서 2번째 줄로 이동하고, main이
**35.1875px** 위로 이동한다. 이는 실제 shift이며 단순 timing flake/거짓 observer 값이 아니다.
현재 neutral production 390px 지연-font CLS는 `/` 0, `/works` .00011539, `/en/works` 0이다.

**SOUND freeze에 NON-BLOCKING / foundation owner QA OPEN**. `< .1` 테스트·폰트·CSS는 그대로다.
Full은 이 항목에서 계속 FAIL한다. 미래 HOME의 font 안정성까지 검증됐다는 의미는 아니다.
[재현/hash/rectangles 및 원인 분류](evidence/p2i-closeout/README.md).

## 4. Windows WebKit failure classification

기존 21/37과 동일한 16개 실패: **12개는 AudioContext/analysis/graph 미지원**, **4개는 media fault
interception 불일치**다. 현재 canonical 진입 2개를 추가해 Windows WebKit **23/39**, Chromium **39/39**.
기존 assertion을 삭제·완화·skip하지 않았다.

실측에서 Windows WebKit media 요청은 `NSPlayer … WMFSDK`로 서버에 도달하고 Playwright `page.route`
차단 callback은 0회다. 따라서 차단됐다고 가정한 기존 오류/지연 테스트에서 실제 음원이 재생됐다.
별도 서버가 실제 HTTP404, 12초 초과 응답 지연, cancel 후 bytes 도착을 만들면 양쪽 엔진에서
error/paused/time 0을 확인한다. 유효 음원은 실제 clock이 진행되고, analyser 미지원은 static fallback을
표시한다. **Windows 포트 capability 및 harness 문제**로 분류하며 가짜 analyser/재생을 넣지 않았다.
[실제 HTTP 진단](evidence/p2i-closeout/webkit-http-diagnosis.json).

## 5. Actual Safari relevance

현재 Mac 연결은 없어 P2I를 실제 Safari에서 새로 검증하지 않았다. 이번에 읽은 [P2H native Safari
증거](evidence/p2h/safari-device-qa.md)는 실제 재생·pause·end·replay·keyboard focus를 확인했다.
Mac 잠금으로 resume settlement/menu/reverse/native reduced는 미완료다. 기존 Audio activation/error/
timeout/source 처리와 frozen scene 코드는 보존했고, 이번 변경은 contact rendering/lifecycle 연결이다.
**확인된 Safari 제품 blocker는 없음**; 새 choreography의 native Safari 증명도 아직 없음.
[Playwright 공식 설명](https://github.com/microsoft/playwright/blob/main/docs/src/browsers.md)과 같이
Windows WebKit을 branded Safari와 동일한 지원 대상으로 취급하지 않는다.

## 6. Remaining blocking / non-blocking QA

- **확인된 P2I SOUND blocking regression: 없음.**
- SOUND freeze의 명시적 non-blocking: 위 foundation CLS, Windows WebKit capability/harness,
  신규 B2 native Safari 및 남은 native lifecycle/reduced, 실제 휴대폰, VoiceOver/TalkBack, Retina, thermal.
- 독립 frozen owner Lab의 기존 Windows Hero skip-focus / Haegeum late-image fallback 결과는
  [verification](evidence/p2i-closeout/verification.json)에 별도 기록한다. 해당 코드·테스트는 변경하지 않았다.
- Full 미통과는 계속 공개하며 **배포 gate는 미충족**이다. 이 작업은 배포하지 않는다.
  실제 Safari regression이 확인되면 관련 owner의 freeze를 다시 열고 blocker로 처리한다.

## 7. SOUND final quality status

**QUALITY APPROVED / FROZEN**, 사용자가 명시한 closeout 조건에 따른 SOUND 장면 범위다.
시각 승인, 매끄러운 활/진동하는 현의 분리, 의도된 trail, Electric Violet 승인, 실제 audio lifecycle
검증과 blocker 부재를 근거로 한다. 모든 장치 또는 전체 HOME의 Quality Approved 선언이 아니다.

검증: type-check/lint, Fast 38 contracts + root build, Project Pages build, routing/locale/content/404
84 browser cases, SOUND 6 motion contracts 및 78 browser cases, Full 재실행, 별도 frozen owner suite,
actual HTTP faults, canonical desktop/mobile capture, 보존 범위·문서 링크. 정확한 결과는
[verification](evidence/p2i-closeout/verification.json), [Full log](evidence/p2i-closeout/full-gate.txt)에 남겼다.

## 8. Documents updated

MASTER §2 artist recognition 및 §3.1 기존 원칙 참조; Design의 SOUND signature color; HOME/Motion/SOUND
contract의 선택·물리 모델·중앙 tuning; INTERACTION-GLOSSARY의 실제 구현/승인 상태; AGENTS/HANDOFF/
active plan/Task Protocol/Revision Log/README 및 이 closeout report/evidence. 중복 canonical spec은 만들지 않았다.
기존 P2I/Choreography/P2H reports와 evidence는 보존했다. Runtime dependency/lockfile/workflow 변경 없음.
[파일 목록·보존 검사](evidence/p2i-closeout/verification.json).

## 9. Commit SHA

검증된 구현 및 문서를 논리적으로 commit하고 V2 main에 전달하는 범위가 승인됐다.
실제 SHA/전달 결과는 delivery 완료 시 이 절에 기록한다. 아직 이 문장만으로 push 성공을 주장하지 않는다.

## 10. CI result

로컬 Fast 통과와 원격 exact-SHA Fast CI를 구분한다. 원격 결과는 push 후 확인하여 기록한다.
Full FAIL 상태는 Fast 성공 여부와 무관하게 유지한다. 배포 없음.

## 11. Working tree status

Delivery 종료 시 main/origin 일치와 clean 상태를 확인한다. `.checkpoints`, generated builds,
node_modules, Playwright temporary traces는 commit 대상이 아니다. 필요한 코드·문서·선별 evidence는 포함한다.

## 12. Recommended next larger bounded task

**Foundation Font Loading / CLS Closeout** 한 단위: 원인 재현 → Lab masthead row 안정화 → 정상/지연/
누락 font·mobile/desktop 확인 → 원래 CLS assertion 및 production root/project 회귀 → evidence/보고/STOP.
필요하면 별도 native Safari 비교를 포함하되, frozen SOUND choreography를 임시 보정하지 않는다.
**사용자 승인 대기. WORKS / 다음 HOME Scene / 다음 Phase는 시작하지 않는다. STOP.**
