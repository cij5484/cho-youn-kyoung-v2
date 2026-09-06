# P2G — P2F Closeout + HOME Sound Experience Bundle

2026-09-06 · **P2F QUALITY APPROVED / FROZEN & DELIVERED · SOUND REVIEW READY / STOP**

[Preview](http://127.0.0.1:4179/) · [EN](http://127.0.0.1:4179/en/) ·
[구현 정본](docs/redesign/review/HOME-SOUND-EXPERIENCE.md) · [증거 목록](evidence/p2g/README.md) ·
[검증/변경 파일 manifest](evidence/p2g/verification.json)

1. **P2F Closeout status**

   사용자의 시각 승인을 canonical 문서에 반영했습니다. **Hero → Haegeum: QUALITY APPROVED / FROZEN**입니다.
   이전 P2F 결과와 evidence의 당시 REVIEW READY 기록은 보존했습니다. 변경 67건·evidence 49건의 해시와
   이전 Full 38 Node + 197 browser 결과를 검토했고, delivery 전 로컬 Fast를 통과했습니다.
   Provisional 사진, Retina 원본, native Safari/휴대폰/VoiceOver/thermal QA는 승인과 구분한 후속 항목입니다.

2. **P2F commit / push / CI**

   `b5c6aa053a38bdb1dafbcbeb724890f26ae334cf` — `feat: freeze approved Hero to Haegeum refinement`.
   68개 파일을 논리적인 한 commit으로 정리해 main push했습니다.
   [Exact-SHA Fast CI 34032488461 SUCCESS](https://github.com/cij5484/cho-youn-kyoung-v2/actions/runs/34032488461).
   SOUND 시작 전에 clean main/origin을 확인했습니다. [Committed files / receipt](evidence/p2g/delivery-p2f.json).
   **P2G는 로컬 변경이며 commit/push하지 않았습니다. 배포·운영 도메인 변경도 없습니다.**

3. **FULL HAEGEUM → SOUND transition**

   P2F의 155svh 진행은 유지하고 이후 80svh에서 긴장이 풀립니다. Full 사진은 비율을 유지한 채
   현 축으로 aperture가 좁아지고, HAEGEUM typography는 자신의 mask를 통해 빠져나갑니다.
   동일한 두 line holder가 수평으로 확장되면서 LISTEN의 공간이 열립니다. 기존 native continuation에
   연결했고 별도 scroll controller·wheel 가로채기·section crossfade를 만들지 않았습니다.

4. **SOUND visual composition**

   Warm Ivory 위에 넓은 두 선, 오른쪽의 큰 LISTEN, 왼쪽의 작은 03/SOUND 및 짧은 문장을 배치했습니다.
   강도는 3/5의 quiet pause입니다. P2A font/color/spacing을 사용하며 pill·원형 play widget·glass·glow를
   추가하지 않았습니다. production HOME mount나 composition 선택 UI는 없습니다.

5. **LISTEN interaction**

   클릭/탭/Enter/Space로만 재생합니다. Desktop hover/focus는 320ms type mask와 italic echo,
   3px 미세 이동 및 작은 화살표 반응을 사용합니다. Mobile은 tap/focus로 전달합니다.
   재생·정지·계속 듣기·다시 듣기를 같은 semantic button에서 제공해 focus를 유지합니다.

6. **Audio source / approval status**

   사용자가 **한범수류 중중모리**를 선택하고 가장 극적인 하이라이트의 판단을 위임했습니다.
   실제 legacy 연주 녹음 중 **02:46–03:04 / 18초**를 후보로 선정했습니다. 앞 3초보다 평균 RMS가
   약 2.78배 상승하고 에너지가 유지되는 구간이라는 신호 분석 근거가 있습니다. 음악적 호흡·장단·
   마무리를 전문적으로 청취 검증했다는 주장은 하지 않습니다. 정확한 구간의 청각적 선택은 REVIEW READY입니다.

   [AAC 후보](src/sound/assets/hanbeomsu-jungjungmori-preview.m4a)는 434,470 bytes / 48kHz stereo입니다.
   원본 level을 유지하고 25ms entry / 280ms exit만 적용한 별도 derivative입니다. 11.15MB master는
   ignored checkpoint에 보존했고 수정하지 않았습니다. [출처·승인·해시](evidence/p2g/audio-audit.json).
   다른 곡은 V2 미리듣기 승인을 추정하지 않았습니다. 합성 음원·무음의 가짜 재생 clock은 없습니다.

7. **Two-line audio response**

   실제 1024개 time-domain sample로 에너지·미세 마찰·밀도를 표현합니다. 선 끝은 고정하고 대부분
   직선을 유지하며 변위는 desktop ±0.62px / mobile ±0.34px 이내입니다. 큰 파형·equalizer·bounce·
   시간 기반의 가짜 진동을 사용하지 않습니다. React의 매 프레임 state 업데이트도 없습니다.

8. **Play / pause / end behavior**

   실제 media event/currentTime이 loading/playing/buffering/paused/ended/error 상태를 결정합니다.
   PAUSE 후 반응이 감쇠해 정확한 직선으로 돌아가고 RESUME은 실제 위치를 유지합니다.
   자연 종료 시 REPLAY가 되며 다시 듣기는 처음부터 시작합니다. 로딩 취소, 12초 timeout/RETRY,
   rapid toggle, seek, 역스크롤·화면 밖·문서 hidden·route cleanup을 검증했습니다.
   WebKit의 graph suspend 시 재생 clock rollback을 찾아 native 위치 확정으로 수정했습니다.

9. **Desktop interaction**

   1440×1000, 1920×1080, 1366×768에서 동일 line DOM과 의도한 공간 전환을 확인했습니다.
   768 tablet도 포함했습니다. Reverse/rapid/interrupted input, MENU/Esc/focus restore,
   KO/EN counterpart와 route departure 정리를 검증했습니다. 승인된 Hero 초기 프레임은 P2F와
   픽셀 차이 0입니다(1440×1000, 오른쪽 scrollbar 16px 제외).

10. **Mobile composition**

    390×844 중심으로 선을 더 높게 두고 LISTEN과 아래 크레딧을 별도로 배치했습니다.
    320×568은 단어 중간 잘림을 줄이고 12px micro text, 64px 이상 control, vertical-first scroll을
    유지합니다. Mobile sample budget/amplitude가 더 작습니다. 모두 브라우저 emulation이며
    실제 iPhone/Android 검증으로 표시하지 않습니다.

11. **Reduced-motion / accessibility**

    ARTIST → HAEGEUM 4개 figure → SOUND의 정적 읽기 순서를 유지합니다. 실제 음원은 듣되 선은
    움직이지 않습니다. Image failure / 200% text도 읽을 수 있는 reflow를 제공합니다.
    Keyboard, focus, 명확한 accessible name, polite 상태 안내를 유지했습니다. HOME의 짧은 sample에는
    최소 controls를 적용하고 Album Detail full player 계약은 보존하도록 Accessibility §9를 명확히 했습니다.
    Native Safari는 Mac 잠금 때문에 조작하지 못했습니다. 자동화 WebKit과 실제 기기 QA를
    [별도로 기록](evidence/p2g/safari-device-qa.md)했습니다. VoiceOver/TalkBack은 후속 QA입니다.

12. **Performance behavior**

    LISTEN 전 media URL/audio payload request/AudioContext가 없습니다. 재생 중 약 30Hz로 path를 갱신하고
    정지 감쇠 후·화면 밖에서는 RAF와 visual update가 0이었습니다. Context도 suspend됩니다.
    Route/source departure는 media src·node/context·observer/listener·SVG를 해제합니다.
    [로컬 Chromium 측정](evidence/p2g/performance.json): desktop/mobile 각각 4초 재생에서 121/120 visual
    updates, frame interval p95 16.8ms, long task 0. 비스로틀 개발 서버 관찰이며 CWV·실기기 발열 승인과 다릅니다.
    Production root/project JS·CSS payload 증가는 0입니다.

13. **References researched**

    시각적 원리는 사용자 승인 P2F의 공간/두 선과 P2B typography에서 이어왔습니다.
    외부 사이트의 composition을 복제하지 않았습니다. 실제 상태·분석·resource lifecycle 구현은
    [W3C Web Audio](https://www.w3.org/TR/webaudio/#MediaElementAudioSourceNode),
    [HTML media/play promise](https://html.spec.whatwg.org/multipage/media.html#dom-media-play-dev),
    [MDN time-domain analysis](https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/getFloatTimeDomainData),
    [AudioContext suspend](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/suspend)를 확인했습니다.

14. **Dependencies changed**

    추가·변경 0. package-lock과 dependencies/devDependencies는 그대로입니다.
    `dev:sound`, `test:sound`, Full gate/CI step, TypeScript/ESLint 범위만 연결했습니다.
    미리듣기 준비는 기존 macOS `afconvert`를 사용했습니다. 새 motion/audio/3D library는 없습니다.

15. **Tests**

    최종 `gate:full`: **38 Node + 247 browser PASS** — 84 route, 11 foundation, 26 navigation,
    44 Hero, 32 Haegeum, 50 Sound(Chromium 25 / WebKit 25). Type-check/lint, content/schema/locale,
    private draft exclusion, root/project build·18 routes·prerender/metadata/404와 regression을 포함합니다.
    actionlint PASS, Sound Lab build는 의도대로 거부, noindex와 public artifact exclusion PASS.
    첫 실패에서 WebKit 실제 clock 문제를 수정했고, 이후 native scroll pixel/진단값 rounding에
    맞도록 테스트의 위치 대기를 정정했습니다. 실패를 숨기거나 retry로 통과 처리하지 않았습니다.
    [검증 manifest](evidence/p2g/verification.json), [Full log](evidence/p2g/full-gate.txt),
    [Sound results](evidence/p2g/sound-test-results.json).

16. **Visual/video evidence**

    [전체 index](evidence/p2g/README.md)에 Full→Sound early/mid/late, idle/hover/playing/damping/paused/end,
    390/320, wide/laptop/tablet/EN, reduced/200% text, WebKit을 남겼습니다.
    [Desktop 30.48초](evidence/p2g/desktop-real-time.webm), [mobile 26.56초](evidence/p2g/mobile-real-time.webm)는
    편집·속도 변경 없는 화면 영상입니다. **Playwright 영상에는 음성 트랙이 없습니다.**
    실제 소리는 [Lab](http://127.0.0.1:4179/) 또는 위 AAC로 검토합니다.

17. **Remaining asset/audio requests**

    선택한 18초의 음악적 시작/끝과 강렬함에 대한 사용자 청각 검토가 남습니다.
    음원 때문에 다음 검토를 막는 기술적 gap은 없으며 더 나은 master가 있으면 선택적으로 교체할 수 있습니다.
    P2F의 큰 3/7 portrait, authentic full/head/contact/resonator asset 및 Retina QA는 기존 non-blocking
    항목입니다. Native Safari·물리적 휴대폰·assistive technology·thermal QA도 남습니다.
    시각 concern은 release aperture와 LISTEN entry의 동시성, 실제 기기에서 subpixel 반응의 체감,
    320의 조밀한 크레딧입니다. 기존 freeze를 취소하거나 임의의 새 방향을 만들지 않았습니다.

18. **SOUND quality verdict**

    **IMPLEMENTED / LOCALLY VERIFIED / REVIEW READY.** 사용자 시각·청각 승인 전 QUALITY APPROVED로
    선언하지 않습니다. P2F는 **QUALITY APPROVED / FROZEN**을 유지합니다.
    P2G source/evidence/docs는 로컬 검토 상태이며 변경 목록/해시가 manifest에 있습니다.

19. **Recommended next larger bounded task**

    사용자 검토 후 **P2H — SOUND Auditory Selection, Refinement & Device QA / Freeze Bundle**을 권장합니다.
    4–6개 연관 subtask로 구간 확정, 선택된 transition/response 조정, native Safari/가능한 기기와 접근성 QA,
    성능·회귀·freeze/delivery 검토를 묶을 수 있습니다. 이번 작업에서 시작하지 않았습니다.

**STOP. WORKS, Album 3D, Performance, About, Blender, Haegeum 3D 또는 다음 HOME Scene으로 진행하지 않습니다.**
