# P2G — Full Haegeum → HOME Sound

2026-09-06 · **SOUND REVIEW READY / STOP** · P2F **QUALITY APPROVED / FROZEN & DELIVERED**

[결과 보고](../../P2G-RESULT.md) · [구현 정본](../../docs/redesign/review/HOME-SOUND-EXPERIENCE.md) ·
[검증/파일 해시](verification.json) · [P2F delivery receipt](delivery-p2f.json)

[로컬 preview](http://127.0.0.1:4179/)에서 Hero/Haegeum을 지나 LISTEN을 선택합니다.
[EN counterpart](http://127.0.0.1:4179/en/)도 같은 경로 계약을 사용합니다. Lab이며 배포되지 않았습니다.

## 음원

사용자가 선택한 **한범수류 해금산조 · 중중모리**, 조윤경 / 해금.
원본 **02:46–03:04 / 18초** 후보입니다. 실제 연주 녹음이며 합성 테스트 음원을 사용하지 않습니다.
앞 3초에 비해 에너지가 약 2.78배 상승하는 구간을 신호 분석으로 선택했습니다.
최종 음악적 호흡·마무리와 “가장 극적인 부분”의 청각적 판단은 사용자 검토가 남아 있습니다.

[18초 AAC 미리듣기](../../src/sound/assets/hanbeomsu-jungjungmori-preview.m4a) ·
[출처/승인/인코딩 감사](audio-audit.json) · [후보 구간 분석](audio-analysis.json)

## 실제 속도 영상

- [Desktop 1440×1000, 30.48초](desktop-real-time.webm): Full→Sound, LISTEN hover, 재생, PAUSE/damping,
  RESUME, 자연 종료, REPLAY, reverse/offscreen pause, 돌아와도 자동 재생하지 않는 상태.
- [Mobile 390×844, 26.56초](mobile-real-time.webm): 별도 composition, Full→Sound, 실제 재생, pause/resume와 자연 종료.
- [시간·실제 media 상태](video-timeline.json), [영상 decode 확인](video-verification.json).

두 영상은 편집·속도 변경 없는 Playwright 화면 녹화이며 **음성 트랙은 없습니다**.
영상 촬영 중 실제 음원/분석은 실행했습니다. 소리는 Lab 또는 위 AAC에서 듣습니다.
모바일 영상은 viewport/touch emulation이며 물리적 휴대폰 촬영이 아닙니다.

## Desktop

| 상태 | 증거 |
|---|---|
| 승인된 Hero / Full | [Initial](desktop-initial.png), [Full Haegeum](desktop-full.png), [초기 픽셀 비교: 차이 0](initial-comparison.json) |
| 공간 전환 | [Early](desktop-release-early.png), [Middle](desktop-release-mid.png), [Late](desktop-release-late.png) |
| SOUND idle / hover | [Idle](desktop-idle.png), [LISTEN hover](desktop-hover.png) |
| 실제 재생 / 정지 | [Playing](desktop-playing.png), [Damping](desktop-damping.png), [Paused](desktop-paused.png), [실제 에너지/경로](damping.json) |
| 자연 종료 | [Completed / REPLAY](desktop-completed.png) |
| 화면 폭 | [1920](wide-idle.png), [1366 laptop](laptop-idle.png), [768 tablet](tablet-idle.png) |

## Mobile / fallback / WebKit

| 상태 | 증거 |
|---|---|
| 390 | [Full](mobile-390-full.png), [Release](mobile-390-release.png), [Idle](mobile-390-idle.png), [Playing](mobile-390-playing.png) |
| 320 | [Full](mobile-320-full.png), [Release](mobile-320-release.png), [Idle](mobile-320-idle.png), [Playing](mobile-320-playing.png) |
| English mobile | [EN idle](mobile-en-idle.png) |
| Reduced desktop | [Static](reduced-desktop.png), [실제 재생 / static pair](reduced-desktop-playing.png) |
| Reduced mobile | [Static](reduced-mobile.png), [실제 재생 / static pair](reduced-mobile-playing.png) |
| 320 / 200% text | [읽기 순서와 control reflow](text-200.png) |
| WebKit desktop | [Release](webkit-release.png), [Idle](webkit-idle.png), [Playing](webkit-playing.png) |

[Capture viewport / scroll / media state](capture-states.json).
Reduced/text 이미지는 Sound region 캡처이며 일반 viewport 이미지와 구분합니다.
선의 반응은 거의 직선인 subpixel 변화이므로 정지 사진보다 영상과 실제 재생에서 검토합니다.

## QA 범위와 남은 검토

[로컬 성능](performance.json) · [Safari / 실제 기기 범위](safari-device-qa.md).
현재 Mac 잠금으로 native Safari 검증을 진행하지 못했습니다. 자동화 WebKit을 Safari 실기기 통과로 표시하지 않습니다.
물리적 휴대폰, VoiceOver/TalkBack, 장시간 발열/배터리는 후속 QA입니다.

시각적으로는 Full image의 좁아지는 aperture와 LISTEN entry의 동시성이 충분히 자연스러운지,
거의 직선인 음원 반응이 실제 기기에서 충분히 느껴지는지, 320의 조밀한 크레딧이 적절한지 검토합니다.
P2F의 provisional 사진/AI reference/Retina 원본 교체는 기존의 non-blocking item으로 유지합니다.
SOUND의 시각·청각 승인을 새로 주장하지 않습니다. **REPORT → STOP → USER APPROVAL**.
