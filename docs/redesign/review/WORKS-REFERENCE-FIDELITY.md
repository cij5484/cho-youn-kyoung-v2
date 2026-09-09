# WORKS — Reference Fidelity / 2026-09-09

구현 전에 작성한 체크리스트 + 구현 후 관찰 기록. Baseline main `1cbc274`; Helix와 PR #17 A/B/C는 사용자 **REJECTED / SUPERSEDED**.
OBSERVED=직접 browser 조작, VERIFIED=제작자 글/source, ADAPTATION=V2의 설계 판단이다.
세 트랙은 독립 Chromium에서 reference scroll/pointer/resize를 확인했다. Native Safari/실제 휴대폰 증거가 아니다.
같은 renderer의 pose만 바꾸지 않는다. 공유 범위는 실제6개 catalog/assets, archive, navigation, Draft/Promotion이다.

## A · 공간 깊이 / Atmospheric Depth

- **REFERENCE:** [글](https://tympanus.net/codrops/2026/03/09/building-a-scroll-reactive-3d-gallery-with-three-js-velocity-and-mood-based-backgrounds/), [Demo](https://tympanus.net/Tutorials/DepthGallery/), [Source](https://github.com/houmahani/codrops-depth-gallery/).
- **OBSERVED:** 1440→390, pointer/wheel/reverse/touch. 이미지가 앞으로 통과하고 다음 이미지와 겹친다.
  warm field가 blue/pink mood로 바뀌며 역방향에서도 이전 분위기로 돌아온다. Demo는 scrollY=0이고 reduced에도 움직인다.
- **VERIFIED TECHNIQUE:** 고정 plane Z 사이로 camera Z 이동. Signed velocity는 drift, 속도 크기는 tilt/scale breath,
  pointer는 parallax. 별도 background shader의 palette/soft fields/grain. DOM label도 depth identity를 따른다.
- **ESSENTIAL INGREDIENTS:** [x] 실제 corridor/occlusion [x] 작품별 mood [x] spatial shader [x] pointer parallax
  [x] signed drift [x] velocity breath [x] focus/periphery [x] damping [x] 별도 mobile depth.
- **V2 ADAPTATION:** camera로 공간을 지나며 얇은 image plane와 넓은 Ivory light volume의 관계를 보여준다.
  원본 artwork 색은 보존하고 주변 분위기·거리·명확도로 깊이를 읽게 한다.
- **WHAT WE WILL NOT COPY:** 꽃/branding/layout/timing/source, trail/particles, scroll hijack, 상시 RAF.
  MIT 확인했으나 직접 코드 재사용 없음. Trail은 핵심 공간보다 강한 별도 서사라 제외한다.
- **ENGINE CHOICE:** 독립 Three PerspectiveCamera + image planes + 별도 GLSL atmosphere.
- **MOBILE STRATEGY:** 얕은 previous/current/next, 별도 focal frame; native vertical scroll / RM 정적 archive.
- **PERFORMANCE RISK:** full-screen shader와 texture upload. DPR≤1.25 mobile/1.5 desktop, texture longest-edge
  1024/1600 이하, 최대6개. Settled/offscreen/hidden sleep, context loss fallback, 전환 시 완전 dispose.

## B · 이미지 회전 / Image Rotations

- **REFERENCE:** [글](https://tympanus.net/codrops/2026/06/18/exploring-3d-image-rotations-on-scroll/), [Demo / Variations 1–5](https://tympanus.net/Development/RotatingOnScrollAnimations/), [Source](https://github.com/codrops/RotatingOnScrollAnimations).
- **OBSERVED:** Demo 1–5를 각각 scroll/pointer로 확인하고 2/4/5는 390px로 resize했다.
  1의 X 회전, 2의 더 큰 tumble/Z, 3의 darkening, 4의 Y sweep, 5의 중앙 hold가 서로 다르다.
  Pointer 자체는 작품을 움직이지 않는다. 모바일 reference는 같은 구조의 축소에 가깝다.
- **VERIFIED TECHNIQUE:** 5개 source 모두 DOM/CSS perspective + GSAP ScrollTrigger/Lenis. 비선형 rotation,
  Z/scale/brightness 조합. Variation4 velocity는 blur/saturation에 연결되며 rotation driver라고 추정하지 않는다.
  Variation5는 중앙 hold와 X/Z 회전을 조합한다.
- **ESSENTIAL INGREDIENTS:** [x] 서로 다른 입·출구 rotation [x] authored XYZ [x] 실제 perspective/Z
  [x] 비선형 mapping [x] velocity cue [x] readable focus [x] 재퇴장 [x] mobile grammar. Circular orbit 없음.
- **V2 ADAPTATION:** Album의 measured turn과 Performance의 강한 sweep를 다른 motion family로 저작한다.
  Artwork가 읽히는 구간에는 rotation/filter를 안정시키고 입·퇴장에서 공간을 가른다.
- **WHAT WE WILL NOT COPY:** source/인물사진/red-black branding/exact layout/timing, Lenis input 소유권.
  MIT를 확인했으나 직접 재사용 없이 원리를 재구현한다. Artwork saturation 변형은 제외하고 속도 반응은 bounded blur/depth로 번역한다.
- **ENGINE CHOICE:** 독립 DOM CSS 3D + native scroll + demand RAF. Three/GSAP/Lenis를 추가할 시각적 필요 없음.
- **MOBILE STRATEGY:** 한 작품 중심의 강한 위·아래 entrance/exit; metadata와 scroll 입력은 DOM/native.
- **PERFORMANCE RISK:** composited layer/filter 비용. 보이는 주변 작품만 강화, blur cap, offscreen/hidden/settled stop,
  cleanup 시 styles/listeners/RAF 회수. RM은 정적 실제 image/link.

## C · WebGL 에디토리얼 / DOM–WebGL Editorial

- **REFERENCE:** [글](https://tympanus.net/codrops/2026/02/02/building-a-scroll-revealed-webgl-gallery-with-gsap-three-js-astro-and-barba-js/), [Demo](https://pixelimageeffect.pages.dev/), [Source](https://github.com/J0SUKE/gsap-threejs-codrops).
- **OBSERVED:** Desktop1440/1120 scroll/pointer/resize에서 DOM 이미지 위치의 cell material reveal을 확인했다.
  실제 보이는 이미지 클릭으로 `/2/`에 이동했고 같은 `/assets/2.webp`가 347×521→1068×760으로 이어졌다.
  resize 직후 자동 click scroll 충돌도 있었으나 visible-coordinate 클릭은 성공했다.
  390px에서는 가로 overflow 없이 동작하지만 65–182px 이미지와 큰 여백은 V2 모바일에 채택하지 않는다.
- **VERIFIED TECHNIQUE:** DOM bounds→plane scale/position, aspect-correct UV, uProgress에 따른 cell/image 전환.
  공통 ticker로 smooth scroll/WebGL 동기화. Barba/Flip detail은 선택한 실제 image DOM을 새 parent로 옮긴다.
- **ESSENTIAL INGREDIENTS:** [x] DOM 의미 구조 [x] 정확한 plane sync [x] scroll shader material reveal
  [x] typography/image 관계 [x] selected identity adapter [x] mobile DOM usability [x] 실패 시 DOM [x] resize/reverse sync.
- **V2 ADAPTATION:** 비대칭 editorial flow가 레이아웃을 소유하고 WebGL이 gallery 전용 surface opening을 더한다.
  Ordered cell/strip reconstruction을 사용하며 HOME Hanji를 복사하지 않는다. 실제 record/image/rect/reveal 상태는
  future Detail handoff에 전달 가능하게 남기고 현재 실제 legacy 링크로 접근한다.
- **WHAT WE WILL NOT COPY:** source/사진/layout/copy/exact mask/timing. README는 MIT를 표기하나 LICENSE 파일 미확인(API license:null),
  직접 재사용 없음. Astro/Barba/ScrollSmoother·새 Detail 페이지는 범위와 native scroll 계약 때문에 제외한다.
- **ENGINE CHOICE:** 독립 DOM editorial grid + orthographic pixel-space Three/GLSL overlay.
- **MOBILE STRATEGY:** 자연스러운 vertical DOM flow 위에 가벼운 shader enhancement; 실패/RM에도 실제 gallery.
- **PERFORMANCE RISK:** DOM 측정/GPU geometry 동기화와 texture 비용. ResizeObserver, scroll dirty render,
  bounded DPR/texture budget, offscreen/hidden stop, dispose. DOM fallback은 shader 성공 전 숨기지 않는다.

## Implementation review — REVIEW READY / NOT PROMOTED

체크는 아래 관찰·기술 확인을 마친 범위이며 사용자 시각 승인과 구분한다.

| 후보 | Preview에서 실제로 보이는 essential | 코드/상태 확인과 남은 한계 |
|---|---|---|
| A | 큰 앞 작품과 작은 뒤 작품의 겹침, camera passage, warm/cool light field, pointer 깊이 반응. Mobile은 제목·캡션 사이에 완전한 작품 비율을 보호한다. | 실제 입력으로 pointer X .63, positive drift .06 / reverse negative drift, breath .085를 확인. Header 뒤 opaque canvas의 Chromium 합성 띠는 실제 렌더 영역을 header 아래로 측정해 해결. 320/390도 확인. |
| B | 화면 위·아래를 가르는 서로 다른 X tumble/Y sweep, edge-on과 readable focus의 대비. Mobile도 강한 회전을 유지하되 한 작품 중심 vertical handoff. | DOM perspective/translateZ, 비선형 hold, bounded velocity cue; canvas 0. 부가 blur가 signature가 아니라 입·퇴장 회전이 signature다. |
| C | 비대칭 editorial spread와 cell/column이 사진으로 조립되는 표면. Mobile은 작은 thumbnail 배치 대신 큰 세로 이미지·제목 흐름. | Scroll/resize 후 plane/DOM 크기 오차 <1 CSS px, 실제 링크 선택에 record/image/rect/reveal 전달. 실제 새 Detail shared transition은 만들지 않았고 adapter만 준비했다. |

각 후보의 artwork 원색·비율·실제6개 기록은 동일하다. A/B는260svh 핵심 travel, C는 자연 DOM 흐름으로
1440px 약2.6viewport / 390px 약3.1viewport travel이다. 작은 화면에서6개 작품을 읽을 크기로 유지하기 위한 차이다.

### Lean validation

- `type-check`, `lint`, WORKS 모델/catalog/설정26개, 비교·승격 설정17개, 실제 `build:development-preview` PASS.
- Chromium / software WebGL 1440·390: A/B/C load, shader/texture, forward/reverse, native CDP touch scroll,
  reduced on/off 복귀, overflow 없음, Compact Archive6/음반3 filter, 정상 URL·현재 배포값 복원 PASS.
- 실제 한국어 radio 전환 C→B→C→A→B: old DOM/snapshot 제거, old WebGL context lost, canvas0/1,
  같은 scrollY301 유지. 비선택 engine 실행 없음. Settled/offscreen RAF 정지, visibilitychange 계약 시뮬레이션 PASS.
- A/C context loss·WebGL unavailable fallback; C compile 오류 주입은 실제 compiler log를 보존하고 즉시
  texture0/RAF0/canvas0으로 회수하며 DOM6개를 표시. Pending decode가 engine을 되살리지 않는다.
- Full Release Gate/전체 HOME E2E/broad browser matrix 미실행. 새 dependency 없음.
  Three 공용 chunk 약513kB(minified)의 기존 build warning은 유지; B는 그 chunk를 요구하지 않는다.
- 실제 Safari/휴대폰 GPU·장시간 발열은 확인하지 않았다. 자동화는 실기기 품질 인증이 아니다.

### Selection boundary

공통 Canonical은 `current`, 후보는 신규 ID로만 opt-in. 이전 Draft 후보만 current로 이관하고 HOME 선택을 보존한다.
각 엔진 종료 후 다음 엔진을 mount한다. Lean technical validation → PR/main/Pages → 공개 확인 → REPORT → STOP.
시각 승인/Canonical 승격은 사용자 선택 이후 별도다.
