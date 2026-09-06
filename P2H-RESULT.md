# P2H — SOUND Refinement, Native Safari / Device QA & Freeze Bundle

2026-09-07 · **IMPLEMENTED / LOCALLY VERIFIED / REVIEW READY / FREEZE CANDIDATE / STOP**

P2G 결과 승인은 반영했고 SOUND의 REVIEW READY 상태를 유지했다. 이번 결과는 품질 freeze 후보이며,
최종 청각·시각 판단을 사용자 대신 승인하지 않는다. 한 bundle의 여섯 subtask만 수행했다.
WORKS·다음 HOME Scene·3D·public HOME·배포로 진행하지 않았다.

## 1. Audio selection verdict

**한범수류 중중모리 02:46–03:04 / 18초 유지.** 실제 음원·derivative byte/hash를 보존했다.
도입 에너지 지연은 0ms, 짧은 구간 RMS p10/p90 간격은 약 13.18dB이며 마지막 1초는 구간 평균보다 조용하다.
기존 25ms entry / 280ms release와 원래 gain을 유지했다. [신호 감사](evidence/p2h/audio-review.json).

이는 신호 분석에 근거한 유지 판단이다. 장단의 맺음·bowing character·첫 청취의 감흥을 실제로 청취해
검증했다고 주장하지 않는다. 사용자 청각 피드백은 아직 받지 못했다. Native Safari에서는 실제 media
재생 상태와 시간 진행을 확인했으며, 이것도 음악적 품질 판정과 구분한다.

## 2. Alternative candidate

없음. 더 우수하다고 청각적으로 확정한 후보가 없으므로 대안을 임의로 만들거나 음원을 교체하지 않았다.
동일 derivative: 434,470 bytes, 48kHz stereo AAC. 기존 원본/master와 asset reference 유지.

## 3. Line-motion refinements

- raw waveform 값 대신 보간한 국소 sample 차이를 사용해 DC/큰 파형 이동을 억제하고 마찰 질감을 만든다.
- pressure가 일찍 포화되어 에너지 증가는 큰 진폭보다 density/instability 변화로 읽힌다.
- 최대 변위 경계 ±0.62px desktop / ±0.34px mobile, 양 끝 고정, 128/64 point budget 유지.
- energy attack 85ms / release 65ms, 공간 추종 35ms / pause damping 55ms. 0ms interruption에서 현재 path 보존.
- pause/end는 정확한 straight path로 안정화 후 scheduling 중단. 긴 pause 후에는 stale frame time을 사용하지 않는다.
- Replay는 기존 buffer와 AudioContext/analyser를 재사용한다. 실제 오류일 때만 source를 다시 load한다.
- idle hover의 line translate를 제거해 클릭 직후 선이 되돌아가는 작은 reset을 없앴다. 가짜 oscillator 없음.

## 4. SOUND composition refinements

큰 LISTEN과 Ivory 여백, editorial index의 기존 방향 유지. Desktop control의 오른쪽 끝을 line endpoint와 정렬했다.
실제 Safari에서 발견한 italic 끝 글자 clipping과 focus outline clipping을 해결했다. 세로 mask는 유지하면서
가로 glyph overhang을 허용하고, reveal 완료 후 surface clip을 해제한다. 장식·pill·glow·추가색 없음.
320px에서는 caption/credit을 세로로 쌓고 16px 간격을 둔다. 390px의 독립된 두-column 구성은 유지한다.

## 5. Haegeum → SOUND continuity

승인된 P2F 155svh와 P2G의 뒤이은 80svh release, 같은 두 line holder, 비례 aperture와 type mask를 보존했다.
새 scene 경계나 controller를 만들지 않았다. Full→대각선 pair→수평 pair의 중간 상태와 reverse/rapid regression을
확인했다. 기존 initial Hero는 1440×1000에서 우측 scrollbar 16px 제외 **차이 0 pixel**.
기존 `src/hero`, `src/navigation`, `src/haegeum`와 이미지 자산은 byte 단위로 유지했다.

## 6. Safari QA

실제 Mac Safari 앱에서 native scroll/release, LISTEN, 실제 재생·시간 진행, pause, 자연 종료, Replay,
Option-Tab/Return 및 온전한 focus outline을 확인했다. REPLAY 후 00:07에서 pause와 RESUME 표시를 확인했다.
그 뒤 Resume를 실행했으나 Mac 잠금으로 후속 관찰을 할 수 없었다.

따라서 **PARTIALLY VERIFIED**: native Resume settlement·MENU/Esc·reverse-return·OS reduced motion은 미완료다.
CUA가 거부한 `Space` key 이름은 도구 입력 오류였고 실제 앱에 전달되지 않았다. Return으로 검증했으며,
Space/나머지 계약은 Chromium/WebKit 자동 검사와 구분한다. [실제 QA 기록](evidence/p2h/safari-device-qa.md).

## 7. Physical device QA

실제 iPhone/Android가 연결되어 있지 않았고 사용자의 manual 결과도 받지 못했다.
Tap latency·autoplay restriction·gesture·짧은 사용 중 열/stutter는 **future non-blocking QA**.
390/320 browser emulation은 실기기 검증으로 표기하지 않는다.

## 8. Accessibility

이름 있는 semantic button과 LISTEN/PAUSE/RESUME/REPLAY 상태, 실제 time, polite announcement 유지.
Keyboard activation/focus, MENU/Esc restore, counterpart route cleanup, 320px/200% text, live reduced preference,
이미지/Web Audio/source 실패 fallback을 검증했다. Reduced motion은 ARTIST→HAEGEUM→SOUND 정적 의미 구조와
실제 청취 상태를 보존하며 두 선은 움직이지 않는다. Native VoiceOver/TalkBack은 미검증.

## 9. Performance

초기 audio payload 0 / AudioContext 미생성 / src 없음. 재생 중 약 30Hz visual analysis.
로컬 Chromium 4초 샘플의 frame interval p95: desktop 16.7ms / mobile emulation 16.8ms, long task 0,
측정 구간의 비의도 layout shift 0. 대기·pause 안정화 후·offscreen에서 RAF/analysis 모두 0.
Click→playing event 단일 샘플 135.3ms desktop / 46.5ms mobile emulation: 네트워크/실기기 지연 보증이 아니다.

8회 KO/EN route return에서 기존 모든 context가 closed, 현재 audio 1개/SVG 2개로 유지됨을 양 엔진에서 확인했다.
Observer/listener/RAF/media source/node teardown 유지. 완전한 heap leak 부재나 thermal/field CWV 인증을 주장하지 않는다.
[측정 원자료](evidence/p2h/performance.json). Dependencies 변경 없음; production JS/CSS 증가 0 bytes.

## 10. Tests

**Full PASS: 38 Node +255 browser**, Sound 58개(Chromium 29 / WebKit 29), retry/flaky/skipped 0.
Type-check, lint, content/schema/locale/private draft exclusion, root/project build/prerender/route/metadata/404,
foundation/navigation/Hero/Haegeum regression, actionlint, Lab build rejection/noindex/public exclusion 포함.
추가 검사: buffered replay, DC/friction/interruption damping, 320 KO/EN 상태 배치, 8회 resource teardown.

개발 중 국소 friction 테스트의 module import 경로가 Lab root와 달라 두 엔진에서 실패했다.
실제 로드된 module URL을 사용하도록 테스트 fixture를 수정했고, 해당 2개와 최종 Full 모두 통과했다.
애플리케이션 조건이나 assertion을 완화하지 않았다. [최종 log](evidence/p2h/full-gate.txt),
[검증·변경 파일 manifest](evidence/p2h/verification.json), [Sound 결과](evidence/p2h/sound-test-results.json).

## 11. Visual/audio evidence

[증거 인덱스](evidence/p2h/README.md): desktop 1440/1920/1366, tablet 768, mobile 390/320, EN,
reduced/text reflow, native Safari, 실시간 desktop/mobile 동영상. 동영상은 Playwright의 **무음 화면 녹화**이며
음악이 녹음됐다고 표시하지 않는다. 실제 음원은 Lab LISTEN 또는 [18초 파일](src/sound/assets/hanbeomsu-jungjungmori-preview.m4a).
Preview: `npm run dev:sound` → **http://127.0.0.1:4179/** (noindex development-only). 증거 촬영은 임시 4180 사용.

## 12. Remaining non-blocking QA

Native Safari 미완료 항목, 실제 iPhone/Android·VoiceOver/TalkBack·thermal, 기존 provisional instrument/Hero source와 Retina.
압축 원본 decode에서 near-full-scale sample 30개가 있으나 이것만으로 audible clipping을 확정할 수 없다.
향후 lossless master는 선택 가능한 품질 입력이다. 현재 후보 때문에 다음에 승인될 작업을 자동으로 막지는 않는다.
단 실제 청각과 refined visual 판단은 최종 SOUND quality label을 위한 사용자 review 항목으로 남긴다.

## 13. SOUND status

**REVIEW READY / FREEZE CANDIDATE.** 구현·기능·연속성·반응형 자동 검증 통과, native Safari 일부 실제 확인.
본 작업에서 QUALITY APPROVED / FROZEN을 자가 승인하지 않았다. P2F의 기존 승인/freeze는 유지한다.

## 14. Commit / CI status

P2G approved review baseline: **`dab4617`**, 83 files. P2H는 해당 baseline 위의 독립적인 logical commit으로 정리한다.
사용자가 main push/Fast CI/clean 확인을 명시적으로 승인했다. 이 보고서는 검증 시점 snapshot이며,
정확한 P2H SHA와 원격 CI 결과는 완료 보고와 후속 delivery receipt에서 기록한다. 배포는 수행하지 않는다.

## 15. Recommended next bounded task

**SOUND Auditory Review & Remaining Native/Device Closeout**: 현재 구간 청취, refined visual 확인,
Safari 잔여/사용 가능한 phone QA와 freeze 결정만 묶는 후속 후보. 별도 승인 전에는 시작하지 않는다.

**REPORT → STOP → USER APPROVAL.** WORKS 또는 다음 HOME Scene으로 진행하지 않는다.
