# P2I — SOUND Bow Contact Choreography + V2 Experience Principles

2026-09-07 · Latest integrated instruction · **IMPLEMENTED / REVIEW READY WITH QA GAPS / STOP**.
SOUND production selection / QUALITY APPROVED / FROZEN: **not granted**. No WORKS or following scene.

## 1. Existing marker problem analysis

기존 bronze 실험은 3.2×7px marker, 가로 ±7px, 세로 약 22px 왕복, 5.5px short tail로 제한되어
활의 이동보다 작은 떠다니는 점으로 읽혔다. 현재 사용자 지시에 따라 이를 상향했다.
이전 [P2I 결과](P2I-RESULT.md)와 [evidence](evidence/p2i/README.md)는 변경하지 않고 보존했다.
수정 전 59개 manifest hash를 확인했고 관련 문서를 포함한 63개 파일을 ignored checkpoint에 보관했다.

## 2. Bow physical-model correction

**현 = 미세 진동·장력·울림 / 활 접점 = 부드러운 이동 / trail = 최근 경로**로 분리했다.
현은 기존 P2H sample-difference 로직과 작은 변위를 그대로 사용한다. marker에 jitter, random shake,
raw waveform 좌표, 복수 echo/particle을 사용하지 않는다. 녹음에서 실제 활 위치를 복원한 모델은 아니다.

## 3. Smooth marker trajectory

한 개의 directional ellipse가 연속적인 왕복 곡선을 따른다. 실제 에너지는 부드러운 속도/범위 target으로
변환하며, 느린 phrase 이동이 접촉 영역을 넓게 좌우로 옮긴다. 분석은 약 30Hz, 접점은 같은 rAF의
display cadence에서 보간한다. per-frame React state 및 추가 audio graph는 없다.

## 4. Velocity continuity

속도와 range에 critically damped follower, phase에 속도 적분, 방향 전환에 cosine turn을 사용한다.
방향 전환은 감속→짧은 turning point→가속이며 hard flip이 없다. pause/end는 짧게 감쇠한 뒤 작업을 멈추고
resume/replay는 실제 outgoing state에서 다시 시작한다. zero-time 재개와 급격한 energy/profile 전환을 검사했다.

## 5. Vertical / horizontal range

Desktop B2는 line width의 최대 ±34%까지 좌우를 사용하고, energy/sustain으로 범위를 조절한다.
실음원 브라우저 검사는 6.5초 동안 수평 400px 이상, 위 현보다 40px 이상 위/아래 현 아래까지 이동하는지 검사한다.
세로 범위는 lineY로 계산해 버튼 공간을 보존한다. 모바일은 위쪽에 더 많은 공간을 배정하며,
320/390px에서도 눈에 보이는 이동과 독립적인 8×3.6px 접점을 유지한다.

## 6. Trail design

실제 시간순 위치를 고정 ring buffer에 기록한다. marker 가까이 선명하고 꼬리 끝으로 폭과 opacity가 줄어드는
ribbon이다. 단일 marker + 고정 12개 SVG age-band path, 총 13개 자식만 사용한다. blur/glow/particles는 없다.

## 7. Trail tunability

[contact-motion.ts](src/sound/contact-motion.ts)에 SHORT 140 / MEDIUM 280 / LONG 460 /
EXTRA_LONG 720ms를 중앙화했다. LONG이 primary candidate다. 모바일은 history×.82, 에너지에 따라
history×.85–1.0으로 조절하며 sample cap은 desktop96/mobile64다. 후속 길이 조절은 작은 token 변경으로 가능하다.

## 8. Violet candidates

| 후보 | Hex | Ivory solid contrast |
|---|---|---:|
| Editorial | #6038C8 | 6.38:1 |
| Electric — primary | #6334E5 | 5.86:1 |
| Ink | #492580 | 9.94:1 |

세 색상을 실제 browser/video에서 비교했다. 계산은 [violet-contrast.json](evidence/p2i-choreography/violet-contrast.json).
반투명 trail은 이 solid ratio보다 낮으며 필수 정보를 전달하지 않는다. SOUND-scoped 후보이며 global Bronze/token은 유지한다.

## 9. Audio-reactive mapping

Short RMS energy, friction roughness, smoothed energy change, sustained envelope를 rate/range/visibility에 연결한다.
무음·DC에는 진행하지 않는다. 침묵이 재생 상태를 위장하거나 marker가 가짜 오디오 clock이 되지 않는다.
원본은 같은 실제 02:46–03:04 / 18s preview. 입력·오류·offscreen·route 종료 정책은 유지했다.

## 10. Comparison A/B/Bold

[A line-only](http://127.0.0.1:4179/?compare=a),
[B1 medium](http://127.0.0.1:4179/?compare=b&activity=medium),
[B2 bold + Electric/LONG](http://127.0.0.1:4179/?compare=b).
Lab control은 같은 재생 위치에서 activity/trail/color를 바꾸며 source/context/line DOM을 다시 만들지 않는다.
A/B 선택은 비교 authorization이며 어느 안도 production 정본으로 임의 확정하지 않았다.

## 11. Desktop / Mobile

1440×1000 / 390×844 A/B1/B2 영상, 320px EN / 768px / 1920px / reduced static screenshot을 기록했다.
320/390의 입력·caption·collapsed review dock·reverse scroll·reduced motion·route cleanup을 검사한다.
Reduced motion은 static marker와 실음원 상태를 유지한다. Physical phone, VoiceOver, native Safari 새 QA는 미실행이다.

## 12. Performance

격리된 capture session에서 desktop A/B2 rAF callback p95 .3/.8ms, mobile .2/.6ms, frame interval p95 ~16.7ms.
표본 내 long task/CLS/page error=0; idle/settled/offscreen rAF=0. [측정](evidence/p2i-choreography/performance.json).
이는 dev build의 callback 비용이며 GPU 전체 시간이나 실제 모바일 발열·60fps 보장은 아니다.
SVG가 현재 작은 규모에 충분한 결과를 보여 유지했다. Canvas2D는 DPR/redraw 관리, WebGL은 graph/material/context
비용과 비교했지만 다른 renderer를 구현·벤치마크했다고 주장하지 않는다. 새 dependency 없음.

## 13. Visual / video evidence

[영상·이미지 index](evidence/p2i-choreography/README.md): 9개 실제 재생 화면 영상, 35개 screenshot.
6개 A/B1/B2 desktop/mobile 영상에는 busy passage, pause/damping, resume, natural end, replay, reverse/offscreen을 포함했다.
나머지 3개는 Editorial/Ink/EXTRA_LONG active comparison이다. 영상은 **실시간 25fps 무음 화면 기록**이다.
실제 소리와 시각의 결합 판단은 Lab에서 LISTEN으로 확인한다. 재현 스크립트:
[capture-sound-choreography.mjs](scripts/capture-sound-choreography.mjs).
Hero A/B1/B2의 screenshot hash가 viewport별 일치함을 확인한다. 이전 모듈/사진/음원 hash도 보존한다.

## 14. User recommendation

**B2 + LONG + Electric Violet을 먼저 검토**하고, 강도가 과하면 B1과 비교하는 것을 추천한다.
현재보다 과감하게 출발하는 최신 지시를 가장 잘 드러내는 후보지만 최종 선택은 사용자 visual approval 대상이다.
A는 line-only 비교 기준으로 남긴다. EXTRA_LONG은 실험 옵션으로 유지한다.

## 15. New V2 experience principles

8개 원칙의 단일 canonical owner는 [MASTER §3.1](docs/redesign/00-MASTER-PLAN.md#v2-experience-principles)이다:
CONTINUOUS IMPACT, TECHNIQUE DIVERSITY, SEAMLESS CONTINUITY, INPUT-RESPONSIVE SURFACES,
SHORT-FORM SCROLLYTELLING, ADAPTIVE UI, ENTRY RITUAL, 적극적인 REFERENCE ADOPTION POLICY.
기존 Ivory/Static Color/Dynamic Composition 및 확정 요구를 유지했다. §6은 적극적 원리 채택과 직접 복제 금지 경계를 소유한다.
미래 technique 예시는 구현/다음 장면 승인이 아니다. Entry ritual 카피는 MASTER 한 곳에 두며 가짜 delay는 금지했다.

## 16. Documents updated

MASTER(원칙/레퍼런스), Design(SOUND-scoped Violet), Motion(현/활 역할과 continuity), HOME(명시적 청취 중 signature 후보),
기존 SOUND comparison contract와 audio guide, HANDOFF, AGENTS navigation, active plan, Task Protocol, revision log, README를 갱신했다.
기존 비교 계약을 **제자리 개정**하여 별도 중복 canonical 문서를 만들지 않았다. 원본 결과/evidence는 역사로 유지한다.
코드는 src/sound, labs/sound, 관련 tests/capture에 한정한다. package.json은 SOUND contract test command만 연결하고
dependency/lockfile/workflow를 변경하지 않았다. [전체 file manifest](evidence/p2i-choreography/verification.json).

## 17. Interaction Glossary

[INTERACTION-GLOSSARY.md](docs/redesign/INTERACTION-GLOSSARY.md)를 human-readable 학습 자료로 만들었다.
각 항목은 English term, 한국어 뜻, 쉬운 설명, 구현 방식, 기술/API, V2 현재/미래 상태, 관련 source를 포함한다.
Agent instruction이 아니며 library 설치/도입 승인을 만들지 않는다. MASTER 정의를 중복하는 실행 매뉴얼도 아니다.

## 18. Glossary terms

29 terms: Pointer-Reactive Background, Cursor-Reactive Shader, Shared Transition, Persistent Visual Anchor,
Adaptive Contrast Navigation, Hover Preview, Scrollytelling, Short-form Scrollytelling, GSAP Flip,
Layout Reorganization, Filmstrip Gallery, Shader Distortion, WebGL, WebGPU, Blender-to-Web Pipeline,
Split Text Animation, Letter Slip, Motion Trail, Bow Contact Choreography, Smooth Trajectory,
Velocity Continuity, Spatial Transformation, Selective Rendering, Preloading, Lazy Loading, Entry Ritual,
Session-Aware Preloader, Interpolation / Lerp, Motion Continuity.
기술 source는 공식 MDN/GSAP/Khronos 문서와 프로젝트 가이드로 연결했다. 특정 해외 사이트의 신규 전수 분석으로 표시하지 않았다.

## 19. Tests

최종 순차 SOUND: **Chromium 37/37 PASS; Windows WebKit 21/37 PASS / 16 FAIL; 합계 58/74 PASS, skip/retry 없음.**
[최종 log](evidence/p2i-choreography/sound-tests.txt), [report](evidence/p2i-choreography/sound-results.json),
[독립 capability 확인](evidence/p2i-choreography/browser-capabilities.json). Chromium의 초기 trace ENOENT 2건은 순차 실행에서 해소됐다.

- type-check / lint / Fast: PASS (기존 38 Node contracts 및 production root build).
- SOUND 운동 contract 6: PASS. 무음/DC, energy/B1/B2, waveform polarity 비의존, velocity continuity,
  pause/re-entry, 60/120Hz cadence를 검증한다. 기존 P2I의 browser model test 하나는 이 Node 검증으로 확장했다.
- Root/project production builds: PASS. routing/static/metadata/404 84: PASS. Public build에 Lab artifact 없음.
- Full: **FAIL**. 기존 Design System 390px delayed-font CLS=0.160021406 (기준 <0.1); 10/11 PASS.
  이 때문에 후속 navigation/Hero/Haegeum suite는 이번 Full에서 도달하지 않았다. 해당 frozen source는 그대로다.
- 초기 concurrent run: 57/74 PASS, 17 FAIL. 2건은 root suite가 공유 결과 폴더를 정리하면서 Sound trace를 삭제한
  ENOENT이므로 해당 실행을 최종 application 판정에 사용하지 않는다. 원본 log/report를 보존한 뒤 순차 재실행했다.
- Windows WebKit 26.6의 AudioContext는 blank-page capability 검사에서도 undefined다. 정적/real media fallback과
  live analyser 검증을 구분한다. source-fault가 error 대신 playing으로 관찰되는 항목, stalled source timeout,
  loading 취소 시 0 대신 0.0322초 관찰 등도 남아 있다. 이들을 모두 AudioContext 탓으로 단정하지 않는다.
  Full/교차 browser quality gate는 실패 상태이며 native Safari/해당 harness 판별은 후속 owner QA가 필요하다.
- Revised documentation: 15개 문서 / local link 403개 정상, explicit MASTER principles anchor 검증.
- User auditory/visual selection, physical devices/AT/thermal and native Mac Safari updated motion: NOT VERIFIED.

## 20. Recommended next step / STOP

사용자가 A/B1/B2·Violet·trail의 시각/청각 결과를 검토한다. 승인 후 필요한 경우 SOUND selection/한정 refinement와
남은 device/quality gate를 하나의 후속 bounded task로 정한다. **WORKS / 다음 Scene을 시작하지 않는다.**
현재 작업은 local/uncommitted; 이전 P2I 작업과 함께 working tree에 있으며 push/PR/merge/deploy하지 않았다.
**REPORT → STOP → USER APPROVAL.**
