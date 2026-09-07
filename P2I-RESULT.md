# P2I — SOUND Bow Contact Marker Comparison Bundle

2026-09-07 · **IMPLEMENTED / CHROMIUM COMPARISON VERIFIED / REVIEW READY WITH QA GAPS / STOP**

비교안 제작과 Chromium의 SOUND 38개 검사는 완료했다. **Full gate는 미통과**다.
Windows에서 확인한 기존 foundation/navigation/Hero/Haegeum 검사 실패와 WebKit 음원 분석/오류 처리
검사 한계를 숨기지 않는다. Production 선택·SOUND 품질 freeze·delivery는 하지 않았다.
Baseline `ba801448497b31c78b8fb749f73f02d23b7e0799`; branch `codex/p2i-sound-bow-contact`.

## 1. Comparison A summary

P2H의 실제 샘플 기반 two-line micro-friction, density, damping과 기존 composition을 유지했다.
이번 사용자 요청에 맞춰 SOUND의 선을 기존 Charcoal `#2b2a27` / .72 opacity로 정리했다.
P2H의 선도 원래 bronze였으므로 이것은 명시적인 공통 A/B refinement다. 이전 장면의 선 색은 보존했다.
넓은 여백과 선의 긴장만으로 조용한 구조를 만드는 후보다.

## 2. Comparison B summary

같은 선 위에 작은 bronze contact와 short tail을 더했다. 선 길이의 40% 지점을 중심으로 주로 두 선
사이를 수직으로 가로지르며, 좁은 횡방향 drift만 허용한다. 음원/재생 위치를 바꾸지 않고 A/B를
전환할 수 있다. B의 최종 채택은 아직 결정하지 않았다.

## 3. Marker form choice

세로로 짧은 capsule: desktop **3.2 × 7 CSS px**, mobile **3 × 5.8 CSS px**.
반짝이는 원형 점보다 현을 스치는 짧은 접점으로 읽히도록 했다. Point/ellipse는 typed tuning에서
교체할 수 있다. Literal bow, cursor, beat note, loading indicator나 실제 활 궤적 추적이 아니다.

## 4. Color choice for marker / tail

기존 `--color-accent` **#9a8164**. 두 선은 Charcoal이고 접점/꼬리만 bronze다.
새 palette, white sparkle, gold/metallic shine, saturated accent는 없다. 최대 presence와 color strength를
분리했으며 mobile presence를 조금 높여 좁은 화면에서도 점이 사라지지 않도록 했다.

## 5. Tail / trail design

기본 후보는 **short: 최대 5.5px / 150ms history**. 한 개의 짧은 방향성 stroke와 두 개의 작고 빠르게
흐려지는 echo다. Medium **9px / 240ms**는 비교용 trial로만 제공한다. Long은 구현하지 않았다.
꼬리 방향이 바뀔 때 곡선 길이가 상한을 넘지 않도록 제어 다각형까지 제한한다. Glow/blur/filter 없음.

## 6. Adjustable tuning structure

[`contact-motion.ts`](src/sound/contact-motion.ts)의 `contactTuning`이 shape, desktop/mobile size/presence,
color strength, anchor, horizontal/vertical range, trail length/persistence/opacity/lag gain,
audio/drift gain, entry/damping을 소유한다. 정적 reduced 표현도 같은 size/color 값을 사용한다.
재생 컨트롤러를 다시 작성하지 않고 조정 가능하다. 자세한 표는 [계약](docs/redesign/review/SOUND-BOW-CONTACT-COMPARISON.md).

## 7. Audio-reactive behavior

현재 1024-sample analyser와 ~30Hz loop에 연결했다. RMS와 국소 sample 차이로 activity를 만들며,
실제 비무음 샘플이 있을 때만 traversal이 진행된다. 물리적인 활 방향을 분석했다고 주장하지 않는다.
Silence/DC/pause/buffering/end는 새 이동을 만들지 않는다. Pause/end에서 현재 위치를 보존한 채
presence/tail을 감쇠하고, resume/replay는 그 자리에서 다시 나타난다. 실제 media 시간·buffer 재사용은
P2H 그대로다. 새로운 음원이나 fake clock/oscillator, 별도 AudioContext는 없다.

## 8. Desktop findings

1440px A/B에서 선과 큰 PAUSE/LISTEN의 위계가 유지된다. B는 작은 접점에 시선을 잠깐 모으며,
화면을 가로지르는 넓은 이동 없이 소리의 발생 지점을 암시한다. Short는 더 응축되고 medium은
잔상이 조금 더 명시적이다. 768/1920 화면도 별도 캡처했다. 이미지와 runtime 범위/연속성 검사를
근거로 한 시각 판단이며, 사용자 선호 또는 실제 음악적 bowing 품질을 대신 승인하지 않는다.

## 9. Mobile findings

320/390px에서 전용 3 × 5.8px capsule, 최대 ±4px drift, 더 높은 presence를 적용했다.
기존 LISTEN hit target과 caption 공간을 침범하지 않는다. 320px에서는 긴 EN credit을 가리지 않도록
Lab 비교 패널만 상단 오른쪽으로 배치하고 겹침 assertion을 추가했다. Scroll/reverse가 audio를 pause시키고
offscreen 작업을 멈춘다. 320 EN / 390 KO를 기록했다. 이는 browser emulation이며 실제 휴대폰 QA가 아니다.

## 10. Accessibility / reduced-motion

기존 명명된 play/pause 버튼, 실제 시간, polite state, focus-visible와 keyboard를 보존했다.
Reduced/static에서는 움직임과 꼬리 없이 정적인 접점을 제공한다. 장식 SVG는 aria-hidden /
pointer-events:none이며 필수 정보를 맡지 않는다. Lab의 radio/select는 명시적으로 label을 연결했다.
Native Safari, VoiceOver/TalkBack 및 실제 휴대폰은 이번 Windows 작업에서 검증하지 않았다.

## 11. Performance findings

[최종 A/B 원자료](evidence/p2i/performance.json): desktop/mobile을 각각 순차 측정했다.
대기·settled pause·offscreen에서는 두 후보 모두 rAF callback/analysis 0. 같은 30Hz 분석 루프를 사용하며
B가 별도 scheduler를 만들지 않는다. 최대 12개 history와 SVG 1개/자식 4개를 추가한다.
프레임 간격 p95는 A/B 16.7–16.8ms. rAF 콜백 비용 p95는 desktop A .4ms / B .6ms, mobile A .3ms / B .6ms.
측정 구간 long task/비의도 CLS는 모두 0이다. 원자료에 남긴 짧은 실측이며 field CWV/thermal 보증은 아니다.
Public JS/CSS에 이 Lab이 포함되지 않는 것을 두 base에서 검사했다. P2H 대비 public JS/CSS 증가 0 bytes
(root 324,591 / 170,068 bytes; project 326,277 / 174,875 bytes). Audio 파일과 source는 그대로다.

## 12. References researched

이번에는 외부 reference 검색을 추가하지 않았다. 사용자의 bow-contact/short-tail brief,
P2H 구현과 HOME/Motion/Accessibility/Performance canonical 계약을 입력으로 사용했다.
외부 composition, asset, timing 또는 source code를 복제하지 않았다.

## 13. Files changed

- SOUND: `SoundExperience.tsx`, `SoundSurface.tsx`, `controller.ts`, `sound.css`; 새 `contact-motion.ts`, `bow-contact.ts`.
- Lab: `labs/sound/SoundLab.tsx`, `sound.css`, `index.html`.
- 검증: `tests/sound.spec.ts`, `tests/assert-design-artifacts.ts`, 새 `scripts/capture-sound-comparison.mjs`.
- 문서: AGENTS, HANDOFF, README, HOME, Motion, Sound guide, active plan, Task Protocol,
  새 comparison contract와 이 결과. `evidence/p2i`에 선별한 화면/영상/검사 원자료.
- [정확한 파일 목록 / hash](evidence/p2i/verification.json). 수정하지 않은 frozen 코드·자산·P2H 증거
  100개는 [보존 검사](evidence/p2i/preserved-files.json)로 확인했다.

변경 문서의 로컬 파일 링크 313개는 목적 파일이 모두 존재함을 확인했다. `git diff --check`도 통과했다.

## 14. Dependencies changed

Runtime/dev dependency와 lockfile 변경 없음. 이 PC의 pinned Playwright Chromium/WebKit browser binaries를
준비했다. 새 motion/SVG/audio library, 이미지/음원 생성·이관, Blender 또는 workflow 변경은 없다.

## 15. Tests

| 검사 | 결과 |
|---|---|
| Type-check / lint | PASS; capture script 포함 최종 lint PASS |
| Fast / Node contracts | PASS, 38/38 |
| Root + Project Pages build / routes / metadata / 404 / Lab exclusion | PASS, 84/84 browser |
| Design System | 10/11; 390px delayed-font CLS .1600, 기준 <.1 실패 |
| Navigation | 25/26; immediate interruption 중 dialog toggle visibility 실패 |
| Hero | 42/44; Windows WebKit keyboard skip-link focus 2개 실패 |
| Haegeum | 별도 실행 31/32; WebKit late imagery static fallback 실패 |
| SOUND Chromium | **38/38 PASS**, 기존 29 + P2I 9 |
| SOUND Windows WebKit | 23/38, 15 실패; AudioContext 부재/분석·graph assertion, media fault behavior 포함 |
| 전체 수집 결과 | 38 Node PASS; 273 browser 중 253 PASS / 20 FAIL; skipped/retry 없음 |
| `gate:full` | **FAIL**. Design System에서 중단; 이후 suite는 별도로 실행해 결과 수집 |

[원자료](evidence/p2i/test-results.json), [Full log](evidence/p2i/full-gate.txt),
[환경/실패 설명](evidence/p2i/README.md). 최종 320px Lab dock 보완 뒤에는 새 겹침 assertion을 포함한 P2I Chromium 9개를 다시 실행했다.
나머지 검사는 위 전체 실행의 기록을 재사용하며, 이를 모두 다시 실행했다고 표시하지 않는다.
Windows WebKit의 `AudioContext: undefined`는 앱 실행 전 빈 페이지에서도
확인했다. 이를 실제 Safari 실패/성공으로 일반화하지 않는다. Media fault 관련 실패의 정확한 플랫폼
원인까지 확정하지 않았다. 기존 Full assertions는 삭제·완화·skip하지 않았고 다른 owner를 수정하지 않았다.

개발 중 A/B label 선택과 route teardown 대기를 바로잡았다. 꼬리의 꺾인 곡선이 5.5px 제한을 약간
넘던 문제는 끝점뿐 아니라 제어 다각형까지 제한해 해결했고 최종 Chromium 검사에서 통과했다.
최초 Haegeum runner는 exit -1073740791로 중단됐다. 해당 Lab의 남은 dev process만 확인 후 정리하고
격리 재실행했으며, 최초 중단을 통과로 바꾸어 기록하지 않았다. 전체 gate는 여전히 미통과다.

## 16. Visual/video evidence

[증거 인덱스](evidence/p2i/README.md): desktop/mobile A/B, contact detail, pause, 320 EN/768/1920,
medium trial, reduced-motion과 실제 browser 화면 영상. Playwright 영상은 **무음**이다.
현재 18초 음원은 Lab의 LISTEN으로 직접 듣는다. Capture script로 재생성할 수 있다.

- [A live](http://127.0.0.1:4179/?compare=a)
- [B short live](http://127.0.0.1:4179/?compare=b)
- [B medium trial](http://127.0.0.1:4179/?compare=b&tail=medium)

## 17. Codex recommendation

**B + short tail을 다음 시각 검토의 우선 후보로 추천**한다. 작은 접점이 기존 선과 여백을 보존하면서
음악의 발생 지점을 만드는 데 도움이 된다. A는 더 고요하고 충분히 성립하는 대안이다.
Medium은 움직임 설명력이 늘지만 이번 장면의 기본 후보로 확정할 이유는 아직 없다.
이것은 추천이며 production 결정/품질 승인이 아니다. 전체 gate 미통과 상태도 별도로 남는다.

## 18. Possibility of hybrid approach

가능하다. **대기에는 A처럼 선만, 실제 재생 때만 B 접점·짧은 꼬리**라는 조합이 자연스럽다.
B의 현재 lifecycle이 이 방식을 이미 제공한다. 페이지별 또는 임의 intensity 전환 시스템은 추가하지 않았다.

## 19. Recommended next step

**사용자 A/B 시각 비교와 후보 선택** 한 단위가 다음이다. 후보 선택 후에만 해당 SOUND refinement /
freeze 범위를 정한다. 이번에 발견한 Windows baseline QA 문제는 별도 owner 작업으로 계획하며,
production/배포 품질 gate 통과로 표시하지 않는다.

새 commit/push/merge/deploy 없음. P2F 승인/freeze와 실제 음원 및 legacy는 보존했다.
**REPORT → STOP → USER APPROVAL. WORKS 또는 다음 HOME scene으로 진행하지 않는다.**
