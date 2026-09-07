# P2K — Spatial Points / Janggu / Typography 결과

2026-09-07 · **IMPLEMENTED / VERIFIED LOCALLY / REVIEW READY / STOP**

사용자 시각 선택을 위한 세 가지 비교입니다. 새로운 B를 QUALITY APPROVED / FROZEN / FINAL CANONICAL로
선언하지 않습니다. P2F와 P2I의 기존 시각 승인은 보존합니다. A/B 모두 현재 P2J HOME_SIGNATURE 반응을
사용하므로, 그 반응에 대한 별도 청취 승인 상태도 그대로입니다.

[비교 Lab](http://127.0.0.1:4180/) · [전체 A](http://127.0.0.1:4180/?all=a) ·
[단일 구현/튜닝 소유 문서](docs/redesign/review/P2K-INTERACTION-PROTOTYPES.md) · [증거 목록](evidence/p2k/README.md)

1. **HOME current-line problem analysis** — 기존 pair는 길이·각도의 편집용 guide입니다. 사진별 실제 현과
   crop이 달라 전환 중 가짜 현을 덧그린 인상이 생길 수 있습니다. A는 기존 승인 기준으로 보존했습니다.
2. **Two Spatial Points implementation** — 별도 Lab B에서 두 점이 자유롭게 움직이다가 현에 수렴합니다.
   DOM 타이포그래피와 두 Canvas를 조합했으며, 새 사진이나 해금 3D 모델은 만들지 않았습니다.
3. **Point color** — 기존 Bronze `#9A8164`, 중앙 CSS token에서 읽습니다. SOUND Violet과 역할이 다릅니다.
4. **3D/depth strategy** — 결정적인 X/Y/Z 궤적을 원근 투영합니다. 앞/뒤 깊이에 따라 점 크기가 변합니다.
   초기 desktop 반경 3.5–8px, mobile 약 72%. WebGL/stencil 방식과 비용을 비교한 뒤 Canvas 후보를 구현했습니다.
5. **Typography occlusion strategy** — 뒤쪽 Canvas에 실제 DOM 폰트·tracking·위치로 만든 glyph mask를 적용하고,
   앞쪽 Canvas는 글자 위를 통과합니다. 글자 자체는 선명한 DOM입니다. Native Safari/DPR mask 경계는 후속 검토입니다.
6. **Convergence → string lock-on** — FREE → GUIDED → ORBIT → LOCK. 세 이미지의 source 좌표를 각각 관리하며
   렌더링된 crop/transform에 매핑합니다. 점은 실제 보이는 현의 서로 다른 높이에 정착하고 orbit은 0으로 줄어듭니다.
   Full 이미지는 명시된 AI reference에 대한 시각 정렬이며, 실제 악기 구조 증거가 아닙니다.
7. **SOUND entry sweep** — 같은 점이 왼쪽으로 접근한 뒤 오른쪽으로 sweep하며 기존 SOUND line holder를
   드러냅니다. 같은 release 진행값을 사용하고 역스크롤도 연결됩니다. 기존 155+80svh 길이는 유지했습니다.
8. **Janggu marker design** — Violet bow보다 작은 secondary counterpoint입니다. 기존 bow 엔진/시각 값은
   수정하지 않았으며, idle orbit은 재생 여부를 표시하지 않는 장식 움직임입니다.
9. **Janggu color candidates** — Lacquer `#824438`, Burnt `#96553F`, Rust `#703C32`. 현재 Lab 초기값은
   Lacquer이며 최종 색상 선택은 사용자에게 남깁니다. 전역 palette에 추가하지 않았습니다.
10. **Janggu helix/orbit** — 두 현의 축을 따라 왕복하면서 반경 15px의 작은 궤도를 감쌉니다. Mobile 반경은
    65%, 깊이에 따른 크기 변화는 작습니다. Violet의 주인공 역할을 유지합니다.
11. **Janggu hit detection** — 기존 18초 음원에서 60–240Hz 저역과 2–7kHz flux/flatness를 분석한 보수적
    타격 후보입니다. 16개 중 14개가 문턱을 통과합니다. 사용자가 들은 약 0초/3–4초/9초/14–15초에 기존 후보
    0.3007/3.2574·4.0391/9.0705/14.8636이 있습니다. 시간표를 추가하지 않았습니다. 나머지 후보의 장구 정체는 미확정입니다.
12. **Janggu upward response** — 타격은 위쪽 위치만 바꿉니다. 43px desktop 후보, 55ms attack 상수/140ms
    return 상수, 약 100ms에 최고점. 연속 타격은 현재 복귀 궤적에 더해집니다. 크기·색·밝기·glow/pulse 변화는 없습니다.
13. **Janggu trail** — 실제 이동 이력의 210ms 짧은 taper/fade. Bow LONG 460ms보다 간결합니다. 고정 ring buffer를 사용합니다.
14. **Typography transition** — 실제 SOUND 버튼의 상태 변화와 독립 비교 study에 A/B를 연결했습니다.
    B는 전체 430ms, 24ms stagger, 미세 tracking 열림/정착, hover ±3px 후보입니다.
15. **Shared-glyph behavior** — 중복 글자까지 일대일 대응하고 같은 DOM node를 유지합니다. 나가는/들어오는
    글자는 개별 mask를 통과합니다. 빠르게 다시 누르면 실제 현재 위치부터 이어지고 마지막 단어로 정착합니다.
16. **Hover reference research** — MERSI, Pell Mell, Arnaud Rocca, Joseph Santamaria의 제작자 글을 중심으로
    조사했습니다. 4WIDE 일부 자료, Trionn/Obys site text도 확인했으나 모든 사이트의 hover를 직접 관찰했다고
    주장하지 않습니다. Shader.se 접근 실패와 조사 깊이 차이는 [조사 표](docs/redesign/review/P2K-INTERACTION-PROTOTYPES.md)에 기록했습니다.
17. **Reference principles adopted** — 마스크의 공유 진행값, 공통 객체/글자의 유지, 작은 효과의 일관된 리듬,
    현재 상태를 이어받는 재전환, mobile별 비용 조절입니다. 원본 코드·브랜딩·정확한 구성/타이밍을 복사하지 않았습니다.
18. **Desktop/mobile** — 1440×1000 및 390×844 정상 속도 A/B 영상, 320/390px 브라우저 검사. 기존 6개 폭의
    SOUND 회귀도 통과했습니다. Mobile은 에뮬레이션이며 실제 휴대폰 검증은 아닙니다.
19. **Performance** — B의 rAF callback p95: desktop idle .6ms / 재생 .4ms, mobile idle .6ms / 재생 .7ms.
    B 스크롤 구간의 최대 단계 p95는 3.4ms, rAF interval p95 약 16.8ms. B 촬영 구간에서 raw layout shift와 long task는 0.
    Canvas는 2개, history 최대 184 desktop/96 mobile. GPU/발열 측정은 아닙니다. A의 스크롤 raw shift는 아래 QA 구분을 봅니다.
20. **Accessibility/reduced motion** — glyph/Canvas는 aria-hidden, 실제 버튼 이름과 상태 알림은 유지합니다.
    Keyboard, reduced motion, modal/화면 밖 정지, route teardown을 검사했습니다. Web Audio 미지원 시 해금은 정적이며,
    장구는 실제 미디어 시각에서 사전 후보를 쓴다고 Lab에 명확히 표시합니다. 자동재생/가짜 playhead는 없습니다.
21. **Files changed** — `src/interaction-prototype`, `labs/interaction`, 내부 SOUND의 opt-in label/fallback/continuation
    접점, P2K tests/scripts/config, 기존 gate의 새 검사 등록, canonical 문서 및 `evidence/p2k`입니다.
    [전체 파일 목록](evidence/p2k/files-changed.json). 기존 Hero/Haegeum/navigation 코드, bow 엔진, 음원/사진 bytes, lockfile/워크플로는 유지했습니다.
22. **Dependencies changed** — 추가/변경 없음. 이미 설치된 fft.js와 Playwright, native Canvas/WAAPI를 사용합니다.
23. **Tests** — `gate:full` PASS. type-check/lint, root/project build, 고유 Node 계약 **65**, browser **307**:
    routing 84 / foundation 11 / navigation 26 / Hero 44 / Haegeum 32 / SOUND 88 / P2K 22. Skip/flaky/failure 0.
    Sound 명령 내부의 Node 18건은 재실행되지만 고유 개수에 중복 계산하지 않습니다. [원본 로그](evidence/p2k/full-gate.txt), [검증 기록](evidence/p2k/verification.json).
24. **Visual/video evidence** — [Desktop A](evidence/p2k/1440-a-realtime-silent.webm) / [Desktop B](evidence/p2k/1440-b-realtime-silent.webm),
    [Mobile A](evidence/p2k/390-a-realtime-silent.webm) / [Mobile B](evidence/p2k/390-b-realtime-silent.webm).
    정상 속도의 **무음 화면 녹화**입니다. 실제 음악과 함께 보려면 Lab에서 LISTEN을 선택합니다. 영상에는 스크롤/전체 18초/재생 상태/타이포그래피 비교가 있습니다.
25. **Codex recommendation for each comparison** — HOME은 **B**: 가짜 현을 덧그리는 인상을 줄이고 이름·사진의
    공간 관계를 만듭니다. SOUND는 **B + Lacquer 후보**: Violet을 방해하지 않는 리듬층입니다. Typography는 **B**:
    단어 재조립의 성격과 reverse 대응이 더 명확합니다. 모두 추천이며 최종 선택/동결은 아닙니다.
26. **Remaining concerns** — 실제 Safari/휴대폰/VoiceOver/thermal, 원본 Retina 사진과 실제 full 악기 사진,
    glyph-mask 경계, 장구의 나머지 9개 활성 후보 식별/정확한 onset은 추가 검토입니다. 공개 사이트에는 아직 들어가지 않습니다.
    Working tree는 `codex/p2k-interaction-prototypes`의 검토용 미커밋 변경입니다. 이번 요청에는 commit/push/deploy가 없어 수행하지 않았습니다.
27. **Recommended next step** — 세 A/B와 장구 색을 사용자가 선택한 뒤, 선택된 후보만 한 번의 bounded
    refinement/closeout으로 정리하는 것을 권합니다. 다음 HOME Scene/WORKS/다른 page는 시작하지 않았습니다.

QA 구분: A 스크롤 중 raw layout-shift 합계 약 .241은 기존 SOUND 기본 화면에서도 동일하게 재현되며,
주 원인은 기존 `.tension-line`의 위치/크기 변경입니다. P2K B는 해당 진단에서 0입니다. 이 합계는 새 Font CLS
regression 또는 최종 production Core Web Vitals 수치가 아닙니다. 재생 중 shift는 A/B 모두 0이었고, Full의
기존 Font CLS gate도 통과했습니다. A 촬영의 일회성 101ms long task도 원본 측정에 남겼습니다.
[진단](evidence/p2k/scroll-shift-diagnosis.json)과 [원본 모션 측정](evidence/p2k/motion-metrics.json)을 숨기거나 완화하지 않았습니다.

**STOP. 사용자 시각 선택 전 새 후보를 동결하거나 다음 작업을 시작하지 않습니다.**
