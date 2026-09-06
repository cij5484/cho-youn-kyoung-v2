# P2C — HOME Hero & Bold Navigation Visual Prototype Bundle

2026-09-06 · **VISUAL DIRECTION CANDIDATES READY FOR USER SELECTION / STOP**

사용자가 확정한 **첨부 3번 → 7번**으로 A/B/C를 실제 브라우저에서 비교할 수 있게 구현했다.
추천은 **B → C → A**다. 최종 선택이나 HOME quality approval을 대신하지 않는다.
P2B는 **QUALITY APPROVED FOR HERO INTEGRATION / FROZEN**을 유지한다.

Task: A 자산 감사·3안 → B mobile/depth/first-scroll/Bold navigation → C Full 검증·evidence·보고 → STOP.
기준점 `d81bdbe0e18310abdd6c89f90682afde9716217d`. 기존 asset-gate 보고와 사용자 작업은 보존했다.
Rollback은 `.checkpoints/p2c-before-d81bdbe/`와 `.checkpoints/p2c-assets-received/`의 파일/hash를 기준으로
이번 bundle의 파일/hunk만 되돌리는 방식이다. 전체 reset이나 legacy 수정은 하지 않았다.

## 1. Assets inspected

기존 35장 legacy 감사 후, 이번에 제공된 보라 한복 7장을 native dimensions/hash/시각 기준으로 확인했다.
역할 1은 첨부 **1번**(후속 scene용 전신 뒷모습), 역할 2/3은 사용자가 확정한 **3번/7번**이다.
1번과 나머지 대안은 runtime에 넣지 않았다. [전체 감사](docs/redesign/review/HOME-HERO-ASSET-READINESS.md),
[provenance](evidence/p2c/provided-portraits.json).

## 2. Asset readiness / requests

3번 **1023×1537**, 7번 **1024×1536**. 현재 비교 시안에 사용할 수 있는 authentic input이다.
제공 PNG를 camera master라고 부르지 않는다. 7개 원본과 별도 보존본의 hash를 확인하며 수정/덮어쓰기하지 않았다.
WebP full pair 577,116 B, 640px pair 240,864 B를 별도로 만들었다. 색/인물/의상 수정이나 AI 생성은 없다.
최종 큰 화면·DPR2 이미지 승인을 위해 3/7의 더 큰 uncropped 원본이 필요하다. 현재 비교를 막는 요청은 아니다.
투명 mask는 없으며, 머리카락을 거칠게 지우지 않고 정확한 사진 창 경계로 구성했다.

## 3. Prototype A — Canonical Editorial

[브라우저 A](http://127.0.0.1:4177/?study=a) · [desktop evidence](evidence/p2c/desktop-a.png).
사진의 시작선을 desktop 59% 지점에 두고, 열린 왼쪽 여백과 3행 이름을 두 군데 교차시켰다.
세 안 중 가장 안정적인 기준안이다. 다른 안보다 첫인상이 차분하다.

## 4. Prototype B — Bold Cropped

[브라우저 B](http://127.0.0.1:4177/?study=b) · [desktop evidence](evidence/p2c/desktop-b.png).
크게 당긴 어깨·옆/뒤태가 중앙 사진 면을 만들고, 이름은 viewport 가장자리를 사용한다.
가장 강한 첫인상과 보라 원단의 존재감이 추천 이유다. 의도적인 crown/edge crop이며,
넓은 화면에서는 글자 크기를 높이에도 연동해 행끼리 붙지 않게 했다.

## 5. Prototype C — Experimental Editorial

[브라우저 C](http://127.0.0.1:4177/?study=c) · [desktop evidence](evidence/p2c/desktop-c.png).
사진을 왼쪽의 좁은 창으로 옮기고, CHO → YOUN → KYOUNG의 서로 다른 크기와 시작점으로 공간을 구성했다.
B보다 여백이 강하고 인물의 노출을 절제한다. mobile에서도 이름 전체를 유지한다.

## 6. Codex recommendation ranking

**1 B / 2 C / 3 A**. B는 WOW·인물 존재감·기존 좌우분할 탈피가 가장 강하다.
C는 비대칭 편집 구도와 다음 악기 서사를 위한 여백이 장점이다. A는 승인 방향과의 비교 기준이다.
[10개 항목 비교표](docs/redesign/review/HOME-HERO-VISUAL-PROTOTYPE.md#composition-and-recommendation)를 남겼다.
이는 실제 관람객 반응을 측정한 점수가 아니라 브라우저 시안에 대한 디자인 판단이다.

## 7. Typography findings

Cormorant Garamond의 CHO / YOUN / KYOUNG를 공통으로 유지했다. 사진 창 안팎에서 Ivory/Ink가 이어진다.
A/C는 두 경계 교차, B는 과감한 대안으로 세 행이 사진 면과 관계를 맺는다. rough silhouette mask는 없다.
1920px에서 생기던 행 겹침을 수정하고 실제 glyph bounds로 검증했다. duplicate graphic layers는 aria-hidden,
semantic h1과 header identity는 유지한다. 최종 확대/사진 위 lettering 대비는 선택 후 시각 QA에 남긴다.

## 8. Portrait/crop findings

3→7은 의상·빛·방향의 연결이 좋다. 그러나 머리/어깨 위치가 같지 않아 직접 wipe하면 반쪽 자세가 붙는다.
사진 폭을 접은 뒤 같은 축에서 7번을 여는 방식으로 해결했다. 인물 회전 morph라고 주장하지 않는다.
B의 넓은 화면은 현재 1023px 원본을 확대하므로, 최종 high-DPR 선명도 승인은 유보한다.
7번의 해금 축은 desktop/mobile 첫 스크롤 endpoint에서 유지된다.

## 9. Navigation integration findings

P2B의 4개 source 파일과 canonical motion은 그대로다. Letter Slip +3px/±7px, 300ms/20ms,
MENU-origin diagonal Ivory reveal 500ms/400ms, MENU/CLOSE mask, index emphasis, no hover-open을 보존했다.
Hero 범위에서 배경을 투명하게 하고 B 위 MENU를 Ink로 바꿨다. 확대된 글자에서는 header wrap을 허용한다.
별도의 vertical navigation, motion mode, scroll morph는 만들지 않았다.
KO/EN은 현재 semantic counterpart로 이동한다. Lab의 study query는 locale 이동 시 제거되며 기본 A로 돌아온다.
번역 콘텐츠나 실제 destination page는 추가하지 않았다.

## 10. Motion prototype

사진·각 이름 행·두 선에 서로 다른 pointer/scroll rate를 적용했다. native scroll과 한 번씩 예약되는 RAF가 상태를
제어한다. aperture의 중간 닫힘에서 source만 교체하므로 opacity crossfade나 split face가 없다. 역스크롤 가능하다.
MENU가 열리면 Hero pointer depth는 정착한다. 이미지 로드 실패 시 initial을 유지한다.
첫 프레임은 바로 보이며, canonical 짧은 entrance 연출은 선택 후 다듬을 항목이다. full Hero→Haegeum은 미구현이다.

## 11. Mobile prototype

세 안 모두 별도의 crop/type/line 배치를 갖는다. 추천 B는 **390×844 / 320×568**에서 전용 구도를 검토했다.
모바일은 pointer 없이 가벼운 scroll response만 사용한다. 첫 스크롤에서 이름이 MENU/화면 끝에 닿지 않도록
desktop보다 이동량을 줄였다. 200% text + 좁은 화면에서는 읽기 순서대로 풀리는 접근성 fallback을 제공한다.
[390](evidence/p2c/mobile-b-390.png), [320](evidence/p2c/mobile-b-320.png),
[first scroll](evidence/p2c/b-mobile-first-scroll.png), [menu](evidence/p2c/b-mobile-menu-open.png).

## 12. References researched

[Codrops Image Expansion/Typography](https://tympanus.net/codrops/2024/04/02/on-scroll-expanding-image-animation-within-typography/)
기사·live demo, [Studio Size의 Exat case study](https://tympanus.net/codrops/2026/04/10/the-exat-microsite-pushing-a-typography-showcase-to-new-creative-extremes/)
의 원문을 조사했다. 조사 범위와 적용은 [guide](docs/redesign/review/HOME-HERO-VISUAL-PROTOTYPE.md#references-and-reinterpretation)에 기록했다.

## 13. Reference principles adopted

이미지와 type을 하나의 graphic structure로 다루는 원리, 가역적인 scroll state, 서로 다른 시각 밀도,
mobile 독립 번역을 채택했다. V2의 Ivory·보라 한복·두 선·tension으로 재구성했다.
원본 layout/composition/assets/branding/timing/source code를 복사하지 않았으며 reference의 motion library도 추가하지 않았다.

## 14. Performance/accessibility findings

full WebP 두 장 합계 **577KB**, 제공 PNG 대비 약 **87.4% 감소**. 작은 파생본 두 장은 **241KB**다.
서버·브라우저·원본 hash가 분리된 [local measurement](evidence/p2c/local-performance.json)를 남겼다.
240개 frame callback 표본의 p95는 약 16.8ms, 관측 구간 long task는 0이었다.
이 수치는 macOS Chromium/Vite/unthrottled 진단이며 production CWV·실기기 FPS·발열 승인이 아니다.
idle RAF 0, key/Esc/focus trap/restore/skip, 44px touch targets, live reduced-motion, 실패한 secondary image와
font fallback, 320px/200% reflow를 검증했다. Reduced motion에서는 완성된 static initial poster를 제공한다.
Safari 실기기, iPhone/Android 메모리·발열, 최종 image-over-type 대비는 후속 QA다.

## 15. Files changed

- `labs/hero/`: 3안, controller, CSS, React entry, HTML, 4 WebP derivatives.
- `vite.hero.config.ts`, `playwright.hero.config.ts`, `tests/hero.spec.ts`.
- package scripts, tsconfig app/node, ESLint coverage, Full workflow에 Hero suite 연결.
- `tests/assert-design-artifacts.ts`, `tests/routing-spike.spec.ts`: Hero와 사진의 public exclusion 회귀.
- HANDOFF/HOME/Implementation Plan/Task Protocol/README, source audit, Hero guide, 이 결과, `evidence/p2c/`.

전체 파일·hash 목록은 [evidence manifest](evidence/p2c/hero-prototype.json). 기존 `src/navigation/`, production
router/content/styles, lockfile, 과거 P2B 결과/evidence와 초기 P2C source-audit evidence는 그대로다.

## 16. Dependencies changed

**없음.** 기존 React/Vite/Playwright/CSS/native browser 기능만 사용했다. lockfile 변경 없음.
무거운 motion library, segmentation/3D/Blender, remote runtime font/image는 추가하지 않았다.

## 17. Tests

- Pinned Node **24.15.0** / npm **11.12.1**, macOS Chromium.
- **gate:full PASS**: type-check, lint, content/schema/locale/visibility, placement, root/project builds,
  **38 Node + 84 routing + 11 foundation + 26 P2B + 33 P2C browser cases**.
- **actionlint PASS**, 문서 링크 176개/anchor 8개, 원본 hash 7개, frozen P2B/기존 파일 202개 및 HANDOFF checkbox 207개 보존, `git diff --check` PASS. standalone Hero build는 명시적 guard로 거부됨을 확인했다.
- root/project 각 **18 routes / manifest public files 284개** 유지. production JS/CSS byte 증가 0. Hero Lab·사진·private draft는 client/static/prerender/metadata에 제외;
  Lab HTML/assets와 private KO/EN record는 실제 static host에서 404.
- 320/390/768/1024/1440/1920px, reduced motion, keyboard/locale/reverse scroll, image/font failure,
  200% text, 실제 글자 ink bounds의 충돌 회귀를 포함했다.

현재 작업은 **로컬 검증 및 review diff**다. P2C commit/push/원격 CI/deploy는 수행하지 않았다.
마지막 전달 baseline P2B의 `d81bdbe` / Fast CI 34015866401 SUCCESS는 별도 이력이다.

## 18. Visual evidence

동일 **1440×1000 A/B/C**, B pointer/depth, aperture intermediate, first-scroll, MENU opened,
390/320 mobile, tablet/wide, 200% text 캡처를 저장했다. [전체 manifest](evidence/p2c/hero-prototype.json).
[B 실제 속도 영상](evidence/p2c/b-desktop-realtime.webm)은 pointer → forward/reverse scroll → MENU/Letter Slip/Esc를 기록한다.
녹화 자체는 25fps이며 실행 속도를 늦추거나 animation을 정지시키지 않았다. PNG나 로컬 RAF 수치만으로
motion quality를 확정하지 않는다. 실제 브라우저와 영상을 함께 검토해야 한다.

## 19. Remaining concerns

1. 최종 A/B/C 선택은 사용자에게 남아 있다. B의 얼굴 노출/밀도와 C의 여백 중 의도에 맞는 판단이 필요하다.
2. B의 1920px/high-DPR crop은 더 큰 authentic original로 재검토해야 한다.
3. 정확한 silhouette cutout이 필요한지, 사진 창 언어를 유지할지는 선택된 방향 안에서 판단한다.
4. 선택 후 entrance, picture/type 대비, 큰 화면 crop, 실제 Safari/mobile QA가 남는다.
5. 두 사진의 aperture handover는 이번 first-scroll 범위의 후보다. 최종 Haegeum transition을 완성한 것이 아니다.

## 20. Recommended next bounded task

사용자의 **visual selection 후 별도 승인**을 전제로, **Selected Hero Direction Refinement & Device QA Bundle**을 권한다.
A 선택 구도의 고해상도 crop/type/entrance 보완 → B 그 Hero 안의 first-scroll/모바일/Safari 조합 검토 →
C 동일 기준 evidence/regression/report/STOP. full Haegeum scene이나 다음 subsystem을 함께 구현하지 않는다.

**STOP — 사용자 visual selection 및 다음 bounded task 승인 전에는 진행하지 않는다.**
