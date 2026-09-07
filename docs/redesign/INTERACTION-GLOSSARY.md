# INTERACTION GLOSSARY — 웹 인터랙션 학습 노트

2026-09-07 · 41 terms · **사용자를 위한 human-readable reference. Agent instruction이 아닙니다.**

영어 이름을 알면 레퍼런스를 보고 원하는 효과를 더 정확하게 이야기할 수 있습니다. 일반적인 구현 방법과
V2의 현재 구현을 구분해 읽어 주세요. **현재 Lab / 미래 후보 / 필수 spike 미실행**은 서로 다른 상태입니다.
현재 승인은 [HANDOFF](../../CODEX-HANDOFF.md), 철학은 [MASTER §3.1](00-MASTER-PLAN.md#v2-experience-principles),
SOUND 수치는 [비교 계약](review/SOUND-BOW-CONTACT-COMPARISON.md)이 소유합니다. 이 노트는 새 기능을 승인하지 않습니다.
아래의 ‘프로젝트 설명’은 이 프로젝트를 위해 정리한 용어이며 공식 API 이름이 아닙니다.
공식 기술 문서는 2026-09-07 확인했습니다. 특정 해외 사이트를 이번에 새로 분석한 목록은 아닙니다.

## 01. Pointer-Reactive Background

- 한국어: 포인터 위치에 반응하는 배경.
- 쉽게 말하면: 마우스가 움직이면 화면 뒤의 빛·이미지·깊이가 조금 달라지는 효과입니다.
- 일반 구현: pointer 좌표를 영역 안의 0–1 값으로 바꾼 뒤 보간하고 CSS transform 또는 shader 입력으로 전달합니다.
- 기술/API: Pointer Events, CSS custom properties, rAF, Canvas/WebGL.
- V2: **미래 후보**. Hero의 기존 pointer depth는 관련된 현재 Lab 사례지만, 전면 배경 shader가 구현된 것은 아닙니다.
- 참고: 프로젝트 설명; GPU 방식의 기반은 [MDN WebGL](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API).

## 02. Cursor-Reactive Shader

- 한국어: 커서 입력으로 변하는 GPU 화면 효과.
- 쉽게 말하면: 그림을 통째로 움직이는 대신 그림 표면을 물결·굴절처럼 바꿉니다.
- 일반 구현: 정규화한 포인터를 shader uniform으로 보내 픽셀의 좌표나 색 계산에 반영합니다.
- 기술/API: WebGL/GLSL 또는 WebGPU/WGSL, canvas, 입력 보간.
- V2: **미래 후보**. SOUND의 현재 SVG trail에는 shader가 없습니다.
- 참고: [MDN WebGL](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API).

## 03. Shared Transition

- 한국어: 앞뒤 화면이 같은 요소를 공유하는 전환.
- 쉽게 말하면: 앨범 표지가 사라졌다 다시 나타나는 대신, 그 표지가 커져 상세 화면의 표지가 됩니다.
- 일반 구현: 공통 ID와 시작/도착 상태를 연결하고 실제 요소 또는 snapshot의 위치·크기를 이어갑니다.
- 기술/API: CSS transforms, FLIP, [View Transition API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API).
- V2: **현재 Lab**의 Hero→Haegeum은 공유 요소를 유지하는 사례입니다. **미래 후보**인 Works→Detail route 전환과 구분합니다. 현재 native View Transition API 채택을 뜻하지 않습니다.
- 참고: 위 MDN; 프로젝트의 state continuity 계약은 [Motion §42](03-MOTION-SYSTEM.md).

## 04. Persistent Visual Anchor

- 한국어: 장면이 바뀌어도 남는 시각적 기준점.
- 쉽게 말하면: 주변이 변해도 같은 선이나 물체가 남아 ‘같은 공간에서 이어지고 있다’고 느끼게 합니다.
- 일반 구현: 요소를 공통 부모에 두고 재생성하지 않으며 transform과 상태만 연결합니다.
- 기술/API: 공유 DOM, refs, scene state, CSS mask/transform.
- V2: **현재 Lab**의 두 선이 Hero→Haegeum→SOUND로 이어집니다. Performance stage는 **미래 후보**입니다.
- 참고: 프로젝트 설명; [Haegeum 가이드](review/HOME-HAEGEUM-TRANSITION-PROTOTYPE.md).

## 05. Adaptive Contrast Navigation

- 한국어: 배경 대비에 맞춰 보이는 메뉴.
- 쉽게 말하면: 밝은 배경에서는 검은 메뉴, 어두운 무대에서는 흰 메뉴를 사용합니다.
- 일반 구현: 장면별로 저자가 검토한 light/dark/imagery theme를 지정합니다. 실시간 픽셀 분석은 필요할 때만 검토합니다.
- 기술/API: CSS variables, data attributes, scene state, IntersectionObserver.
- V2: **미래 후보 / 이번 production 미구현**. 메뉴의 기존 Bold freeze는 유지합니다.
- 참고: 프로젝트 설명; [MASTER의 ADAPTIVE UI](00-MASTER-PLAN.md#v2-experience-principles).

## 06. Hover Preview

- 한국어: 항목에 머물 때 보여 주는 미리보기.
- 쉽게 말하면: 공연 제목 위에 마우스를 올리면 그 공연의 사진이 옆에 나타납니다.
- 일반 구현: hover와 focus 상태를 같은 preview 데이터에 연결합니다. 터치는 명확한 선택/탭 대안을 둡니다.
- 기술/API: pointerenter, focus, CSS opacity/transform, 이미지 decode.
- V2: About의 typography/photography archive **미래 후보**. 현재 구현 아님.
- 참고: 프로젝트 설명; [MASTER §3.1](00-MASTER-PLAN.md#v2-experience-principles).

## 07. Scrollytelling

- 한국어: 스크롤로 전개하는 이야기.
- 쉽게 말하면: 아래로 읽는 동작이 장면의 확대·분해·전환을 진행시킵니다.
- 일반 구현: 문서 스크롤을 구간 progress로 바꾸고 장면 상태를 계산합니다. 읽기 순서와 정적 대안을 별도로 보존합니다.
- 기술/API: scroll, rAF, CSS sticky, masks; GSAP ScrollTrigger 등은 가능한 도구입니다.
- V2: **현재 Lab**의 Hero→Haegeum→SOUND. GSAP 사용 중이라는 뜻은 아닙니다.
- 참고: 프로젝트 설명; [HOME](04-HOME.md), [Motion](03-MOTION-SYSTEM.md).

## 08. Short-form Scrollytelling

- 한국어: 짧은 스크롤로 강한 인상을 남기는 이야기.
- 쉽게 말하면: 여러 번 계속 내려야만 끝나는 긴 도입부 대신 핵심 변화를 압축합니다.
- 일반 구현: 메시지와 장면 수를 먼저 정하고 필요한 최소 scroll 거리를 검토합니다. 시간을 억지로 늘리지 않습니다.
- 기술/API: scrollytelling과 동일; 거리·속도·내용 설계가 핵심입니다.
- V2: **승인된 원칙**. P2I는 기존 235svh 총 전환을 늘리지 않습니다.
- 참고: 프로젝트 설명; [MASTER §3.1](00-MASTER-PLAN.md#v2-experience-principles).

## 09. GSAP Flip

- 한국어: 레이아웃 변경 전후를 연결하는 GSAP 플러그인.
- 쉽게 말하면: 흩어진 사진을 그리드로 바꿀 때 각 사진이 어디로 이동하는지 보여 줍니다.
- 일반 구현: 처음 상태를 기록하고 최종 레이아웃을 적용한 뒤, 두 상태의 차이를 transform으로 역보정해 풀어 줍니다.
- 기술/API: GSAP Flip.getState / Flip.from; FLIP = First, Last, Invert, Play.
- V2: WORKS cluster 재배치의 **미래 후보**. 설치/채택/구현하지 않았습니다.
- 참고: [GSAP Flip 공식 문서](https://gsap.com/docs/v3/Plugins/Flip/).

## 10. Layout Reorganization

- 한국어: 요소들이 관계를 유지하며 새 배열로 정리되는 전환.
- 쉽게 말하면: 작품들이 흩어져 있다가 같은 작품끼리 정돈된 목록으로 모입니다.
- 일반 구현: 의미/ID가 같은 항목의 시작·도착 geometry를 연결합니다. 내용 순서와 포커스도 관리합니다.
- 기술/API: CSS Grid/Flex, FLIP, transform, ResizeObserver.
- V2: WORKS **미래 후보**, 이번 작업 범위 밖입니다.
- 참고: 구현 기법 예시 [GSAP Flip](https://gsap.com/docs/v3/Plugins/Flip/); 이 용어 자체는 프로젝트 설명입니다.

## 11. Filmstrip Gallery

- 한국어: 필름 띠처럼 이어지는 사진/영상 갤러리.
- 쉽게 말하면: 개별 카드 격자 대신 사진이 한 줄의 리듬으로 이어집니다.
- 일반 구현: 크기가 다른 미디어를 strip/ribbon에 배치하고 native scroll 또는 드래그와 명시적 탐색을 제공합니다.
- 기술/API: CSS flex, scroll-snap, Pointer Events; 필요 시 가상화.
- V2: MEDIA **미래 후보 / 미구현**. 모바일에서 가로 탐색이 세로 스크롤을 가로막지 않아야 합니다.
- 참고: 프로젝트 설명; [MASTER §3.1](00-MASTER-PLAN.md#v2-experience-principles).

## 12. Shader Distortion

- 한국어: shader로 이미지 표면을 왜곡하는 효과.
- 쉽게 말하면: 이미지 안의 위치를 조금 다르게 읽어 물결·굴절·늘어남을 만듭니다.
- 일반 구현: texture UV를 입력/변위 맵으로 조절합니다. 실제 사진의 기록적 의미가 훼손되지 않도록 용도를 구분합니다.
- 기술/API: fragment shader, textures, WebGL/GLSL, WebGPU/WGSL.
- V2: editorial imagery의 **미래 후보**, SOUND trail은 해당하지 않습니다.
- 참고: [MDN WebGL](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API).

## 13. WebGL

- 한국어: 브라우저에서 GPU로 2D/3D를 그리는 API.
- 쉽게 말하면: HTML 상자만으로 어려운 물체·재질·화면 효과를 GPU가 계산합니다.
- 일반 구현: canvas context에 geometry, material/shader, camera 등을 설정합니다. Three.js 같은 상위 도구도 가능합니다.
- 기술/API: WebGL, GLSL, canvas, 선택적으로 Three.js/R3F.
- V2: Album/Haegeum 3D의 **미래 후보**. 현재 SOUND는 SVG이며 WebGL을 추가하지 않았습니다.
- 참고: [MDN WebGL](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API).

## 14. WebGPU

- 한국어: 그래픽과 병렬 계산을 위한 현대적 웹 GPU API.
- 쉽게 말하면: GPU에 더 명시적으로 일을 맡기는 또 다른 방식입니다. 자동으로 더 좋은 디자인이 되지는 않습니다.
- 일반 구현: adapter/device의 사용 가능성을 확인하고 pipeline·buffer를 준비합니다. 지원 범위는 도입 시 다시 검증합니다.
- 기술/API: navigator.gpu, GPUDevice, WGSL, render/compute pipelines.
- V2: **학습·미래 검토 후보**, 채택/설치/지원 보장은 없습니다.
- 참고: [MDN WebGPU](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API).

## 15. Blender-to-Web Pipeline

- 한국어: Blender 원본을 웹용 자산으로 만드는 제작 흐름.
- 쉽게 말하면: 정교한 원본을 보관하고 브라우저가 감당할 크기의 파생 모델을 내보냅니다.
- 일반 구현: 단위·축·피벗·재질을 정리하고 glTF/GLB를 export한 뒤 브라우저에서 검증합니다. 모든 Blender 재질이 그대로 이전되지는 않습니다.
- 기술/API: Blender/bpy, glTF/GLB, 웹 viewer, 향후 선택한 renderer.
- V2: **필수 capability spike 미실행**. 관련 production 3D에 앞서 별도 승인/검증이 필요합니다.
- 참고: [공식 glTF Blender exporter](https://github.com/KhronosGroup/glTF-Blender-IO), [Motion의 pipeline 계약](03-MOTION-SYSTEM.md#blender-capability-spike).

## 16. Split Text Animation

- 한국어: 글자·단어·행을 나누어 움직이는 타이포그래피.
- 쉽게 말하면: 제목 전체가 한 번에 나오는 대신 글자나 줄이 순서대로 드러납니다.
- 일반 구현: 시각용 조각을 만들고 stagger/mask를 적용합니다. 원문 읽기, 줄바꿈, 폰트 로드와 정리를 함께 관리합니다.
- 기술/API: spans, CSS/WAAPI; GSAP SplitText도 가능한 도구입니다.
- V2: **현재 Lab**의 navigation letter motion과 관련됩니다. GSAP SplitText를 설치했다는 뜻은 아닙니다.
- 참고: [GSAP SplitText](https://gsap.com/docs/v3/Plugins/SplitText/).

## 17. Letter Slip

- 한국어: 글자들이 살짝 엇갈려 미끄러지는 표현.
- 쉽게 말하면: 글자마다 짧은 차이를 두어 제목에 방향감과 리듬을 줍니다.
- 일반 구현: 글자별 transform/mask와 간격을 설계하되, 클릭 중단·역전·reduced motion을 검증합니다.
- 기술/API: CSS transforms, character spans, WAAPI 또는 animation controller.
- V2: **현재 Bold navigation Lab / 통합용 QUALITY APPROVED / FROZEN**. 이 작업에서 다시 조정하지 않습니다.
- 참고: 프로젝트의 표현 이름; [Editorial Navigation 가이드](review/EDITORIAL-NAVIGATION-PROTOTYPE.md).

## 18. Motion Trail

- 한국어: 최근 이동 경로를 남기는 궤적.
- 쉽게 말하면: 여러 점을 뿌리는 대신 한 물체가 지나온 길을 점차 가늘고 흐리게 보여 줍니다.
- 일반 구현: 시간순 위치를 유한 history buffer에 보관하고 나이에 따라 폭·불투명도를 줄여 연결합니다.
- 기술/API: SVG path, Canvas2D 또는 GPU ribbon; ring buffer, rAF.
- V2: **P2I 시각 승인 / B2 LONG 460ms 정본**. 한 marker + 12개 고정 SVG age-band paths. 길이·persistence·opacity를 중앙 설정하며 다른 preset은 Lab 비교용입니다.
- 참고: 프로젝트 설명; [SOUND 비교 계약](review/SOUND-BOW-CONTACT-COMPARISON.md).

## 19. Bow Contact Choreography

- 한국어: 활의 접촉·이동 에너지를 추상화한 시각 안무.
- 쉽게 말하면: 현은 잘게 떨고, 하나의 보라색 접점은 활처럼 매끄럽게 왕복합니다.
- 일반 구현: 실제 음원의 envelope를 속도·범위에 연결하고 별도의 연속 경로를 만듭니다. 녹음에서 실제 활 위치를 측정했다는 뜻은 아닙니다.
- 기술/API: Web Audio analyser, envelope filters, smooth trajectory, SVG history.
- V2: **P2I B2 / Electric Violet #6334E5 시각 승인**. “현은 떨고, 활은 흐른다.” 다른 장면의 일반 oscillator 규칙으로 확대하지 않습니다.
- 참고: 프로젝트의 물리적 추상화; [Motion §45](03-MOTION-SYSTEM.md), [비교 계약](review/SOUND-BOW-CONTACT-COMPARISON.md).

## 20. Smooth Trajectory

- 한국어: 튀지 않고 이어지는 이동 경로.
- 쉽게 말하면: 빨리 움직여도 ‘덜덜 떠는 점’이 아닌 부드러운 선을 따라갑니다.
- 일반 구현: 연속 곡선과 시간 기반 보간을 사용합니다. raw audio 값을 좌표로 직접 넣지 않습니다.
- 기술/API: spline/analytical curve, rAF, critically damped follower.
- V2: **현재 구현 / 승인된 SOUND 방향**은 cosine sweep과 느린 phrase envelope를 사용합니다. 현의 진동에는 이 큰 곡선을 적용하지 않습니다.
- 참고: 프로젝트 수학/구현 설명; [contact-motion.ts](../../src/sound/contact-motion.ts).

## 21. Velocity Continuity

- 한국어: 이동 속도·방향 변화가 끊기지 않는 성질.
- 쉽게 말하면: 왕복 끝에서 순간 반대로 튀지 않고 감속한 뒤 다시 출발합니다.
- 일반 구현: 위치뿐 아니라 속도를 보존합니다. 곡선의 접선과 속도 필터를 연결하고 중단/재개 시 초기화하지 않습니다.
- 기술/API: motion state, critically damped filters, 미분/적분, curve tangents.
- V2: **현재 P2J 계약 테스트**가 onset/flux 급변, 빠른 방향 전환, zero-time 재개와 60/120Hz 차이를 검사합니다. 위치만 같아도 속도가 끊기면 연속적이지 않습니다.
- 참고: 프로젝트 설명; [운동 테스트](../../tests/sound-choreography.test.ts).

## 22. Spatial Transformation

- 한국어: 화면 속 공간 관계가 변하는 전환.
- 쉽게 말하면: 가까이 보던 악기의 일부에서 전체 악기를 보는 공간으로 이동합니다.
- 일반 구현: 위치·크기·crop·mask 또는 camera를 일관된 좌표계에서 연결합니다.
- 기술/API: CSS transform, mask, shared scene coordinates; 3D는 camera/target.
- V2: **현재 Haegeum Lab**의 부위→전체, **미래 WORKS** 재배치 후보.
- 참고: 프로젝트 설명; [Haegeum 가이드](review/HOME-HAEGEUM-TRANSITION-PROTOTYPE.md).

## 23. Selective Rendering

- 한국어: 필요한 장면만 갱신하는 방식.
- 쉽게 말하면: 보이지 않는 장면까지 계속 그려 배터리를 쓰지 않습니다.
- 일반 구현: 화면 교차·탭 숨김·reduced motion·settlement 상태를 보고 frame scheduling을 멈춥니다. 일반 UI의 읽기 상태는 유지합니다.
- 기술/API: [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API), Page Visibility, request/cancelAnimationFrame.
- V2: **현재 SOUND Lab**의 offscreen pause / frame cancellation. 지속 thermal QA 완료를 뜻하지 않습니다.
- 참고: 위 MDN와 [SOUND controller](../../src/sound/controller.ts).

## 24. Preloading

- 한국어: 곧 필요한 자원을 미리 요청하기.
- 쉽게 말하면: 바로 보여 줄 중요한 이미지를 늦게 발견하지 않도록 준비합니다.
- 일반 구현: 정말 필요한 자원에 한해 preload 힌트와 타입을 정확히 지정합니다. 모든 자원을 미리 받으면 오히려 경쟁이 생깁니다.
- 기술/API: link rel=preload, as/type, 이미지 decode; 오디오 preload 속성은 별도 정책입니다.
- V2: entry ritual은 **미래 후보**. 현재 SOUND 음원은 사용자 선택 전 preload하지 않습니다.
- 참고: [MDN preload](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/rel/preload).

## 25. Lazy Loading

- 한국어: 지금 필요하지 않은 자원을 나중에 불러오기.
- 쉽게 말하면: 아직 열지 않은 앨범이나 화면 아래의 자료까지 처음부터 모두 가져오지 않습니다.
- 일반 구현: 중요 경로 밖의 이미지/모듈을 실제 필요 시 요청합니다. 곧 필요한 것을 지나치게 늦춰 보이지 않게 만들면 안 됩니다.
- 기술/API: loading=lazy, dynamic import, IntersectionObserver.
- V2: **현재 SOUND**는 explicit LISTEN에서 음원을 연결합니다. 향후 페이지/3D 분리 로딩은 각 작업에서 검증합니다.
- 참고: [MDN lazy loading](https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/Lazy_loading).

## 26. Entry Ritual

- 한국어: 실제 대기 시간을 활용하는 짧은 진입 경험.
- 쉽게 말하면: 꼭 필요한 준비 시간에 작품의 세계관을 소개하되, 준비가 끝나면 바로 들여보냅니다.
- 일반 구현: 실제 준비 상태와 진입을 연결합니다. 고정 최소 지연이나 가짜 진행률을 만들지 않습니다.
- 기술/API: 자원 준비 Promise, font/image readiness, UI state.
- V2: **승인된 철학 / 구현은 미래 후보**. 재치 있는 해금 loading-copy 목록은 MASTER에만 둡니다.
- 참고: 프로젝트 설명; [MASTER §3.1](00-MASTER-PLAN.md#v2-experience-principles).

## 27. Session-Aware Preloader

- 한국어: 같은 방문 세션인지 고려하는 로딩 경험.
- 쉽게 말하면: 처음 들어올 때와 방금 다시 돌아왔을 때의 인사를 다르게 할 수 있습니다.
- 일반 구현: 세션 기록과 실제 자원 준비 상태를 따로 관리합니다. 기록이 있어도 자원이 준비됐다고 가정하지 않습니다.
- 기술/API: sessionStorage, 실제 load/decode 상태, storage 실패 대안.
- V2: **미래 후보**, 방문 추적/영구 사용자 프로필을 만들라는 요구가 아닙니다.
- 참고: [MDN sessionStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage).

## 28. Interpolation / Lerp

- 한국어: 두 값 사이를 계산하는 보간 / 선형 보간.
- 쉽게 말하면: 시작 0과 끝 10의 중간 정도를 5로 계산하는 방법입니다.
- 일반 구현: lerp(a,b,t)=a+(b-a)t. 매 프레임 같은 비율을 적용하면 화면 주사율에 따라 달라질 수 있어 dt를 고려합니다. 속도 연속성이 필요하면 더 적합한 follower를 선택합니다.
- 기술/API: JavaScript 수학, 시간 기반 easing, rAF.
- V2: **현재 motion 모델**은 단순 위치 lerp만 쓰지 않고 속도를 가진 follower로 급변을 완화합니다.
- 참고: 프로젝트 수학 설명; [contact-motion.ts](../../src/sound/contact-motion.ts).

## 29. Motion Continuity

- 한국어: 움직임의 전체 상태가 다음 동작으로 이어지는 성질.
- 쉽게 말하면: 드래그하던 물체를 놓았을 때 처음 자리로 돌아갔다가 다시 출발하지 않습니다.
- 일반 구현: 위치·속도·방향·opacity·선택·camera 등 필요한 outgoing state를 다음 애니메이션의 입력으로 넘깁니다.
- 기술/API: refs/state machines, animation interruption; [Web Animations API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API)는 가능한 도구 중 하나입니다.
- V2: **현재 SOUND**의 pause damping/resume와 공유 두 선, **향후 3D**의 drag→inertia→detail 계약.
- 참고: 프로젝트 정본 [Motion §42](03-MOTION-SYSTEM.md). 프레임워크 하나를 채택했다고 자동으로 확보되는 품질은 아닙니다.

## 30. Feature-Driven Choreography

- 한국어: 음악 특징을 바탕으로 만드는 안무.
- 쉽게 말하면: 특정 곡의 5초에는 위로, 8초에는 아래로라고 적는 대신 음악의 변화가 같은 엔진을 움직입니다.
- 일반 구현: 에너지·onset·음색 변화 등을 정규화하고 위치가 아닌 속도·범위의 목표에 매핑합니다.
- 기술/API: 공유 motion model, 시간 보간, tuning preset.
- V2: **현재 P2J 구현. HOME_SIGNATURE는 같은 엔진의 설정이며 수동 timestamp 안무가 아닙니다.**
- 참고: 프로젝트 모델 설명; [P2J 구현 계약](review/SOUND-BOW-CONTACT-COMPARISON.md#p2j--shared-engine--feature-data--preset-contract).

## 31. Audio Feature Extraction

- 한국어: 음원에서 움직임에 쓸 특징을 추출.
- 쉽게 말하면: 음악 전체 파형에서 크기와 변화 같은 작은 요약값을 뽑는 과정입니다.
- 일반 구현: PCM을 작은 창으로 나눠 RMS나 주파수 변화를 계산합니다. 요약값이 연주자의 실제 활 위치를 의미하지는 않습니다.
- 기술/API: PCM, Hann window, FFT, JSON.
- V2: **현재 18초 음원을 25Hz 특징 데이터로 변환했습니다. 장구와 해금을 분리한 것은 아닙니다.**
- 참고: 프로젝트 모델 설명; [P2J 구현 계약](review/SOUND-BOW-CONTACT-COMPARISON.md#p2j--shared-engine--feature-data--preset-contract).

## 32. Offline Feature Extraction

- 한국어: 재생 전에 수행하는 특징 분석.
- 쉽게 말하면: 손님이 웹사이트를 열기 전에 음원을 미리 분석해 둡니다.
- 일반 구현: 로컬 작업 도구가 승인된 파일을 decode하고 작은 feature asset을 생성합니다.
- 기술/API: OfflineAudioContext.decodeAudioData, fft.js.
- V2: **현재 로컬 Chromium과 개발용 fft.js를 사용합니다. 클라우드 업로드나 재생 중 FFT는 추가하지 않았습니다.**
- 참고: 프로젝트 모델 설명; [P2J 구현 계약](review/SOUND-BOW-CONTACT-COMPARISON.md#p2j--shared-engine--feature-data--preset-contract).

## 33. Batch Processing

- 한국어: 여러 파일을 같은 규칙으로 순차 처리.
- 쉽게 말하면: 곡마다 코드를 쓰지 않고 목록에 적은 파일에 같은 분석을 반복합니다.
- 일반 구현: 명시적 manifest의 track ID·input·output을 검증하고 결과를 각각 저장합니다.
- 기술/API: CLI, manifest, SHA-256, 순차 처리.
- V2: **작은 manifest prototype입니다. 전체 앨범 migration이나 수십 곡 성능 검증은 아직 하지 않았습니다.**
- 참고: 프로젝트 모델 설명; [P2J 구현 계약](review/SOUND-BOW-CONTACT-COMPARISON.md#p2j--shared-engine--feature-data--preset-contract).

## 34. Onset Detection

- 한국어: 소리가 새롭게 시작하거나 두드러지는 순간 찾기.
- 쉽게 말하면: 새 음이 시작되는 느낌을 활의 가속에 연결하는 단서입니다.
- 일반 구현: 에너지/스펙트럼 변화의 국소 peak를 찾고 가까운 중복 검출을 억제합니다.
- 기술/API: positive spectral flux, peak detection.
- V2: **현재 onset은 가속을 높입니다. 실제 해금 활 articulation을 식별하거나 장구 소리를 완전히 배제하는 기술은 아닙니다.**
- 참고: 프로젝트 모델 설명; [P2J 구현 계약](review/SOUND-BOW-CONTACT-COMPARISON.md#p2j--shared-engine--feature-data--preset-contract).

## 35. Spectral Flux

- 한국어: 주파수 구성의 변화량.
- 쉽게 말하면: 음량이 같아도 음색이 변하면 음악이 달라졌다는 것을 알아차립니다.
- 일반 구현: 인접 분석 창의 스펙트럼 증가분을 합산합니다. 음량 변화량과 구분합니다.
- 기술/API: STFT, positive log-amplitude flux.
- V2: **현재 flux는 sweep 속도·방향 전환 빈도와 범위에 영향을 줍니다. 파형을 좌표에 직접 넣지 않습니다.**
- 참고: 프로젝트 모델 설명; [P2J 구현 계약](review/SOUND-BOW-CONTACT-COMPARISON.md#p2j--shared-engine--feature-data--preset-contract).

## 36. Pitch Contour

- 한국어: 시간에 따른 음높이의 부드러운 윤곽.
- 쉽게 말하면: 음 하나마다 점이 계단처럼 튀는 대신 전체 음높이 흐름이 평균 위치에 조금 영향을 줍니다.
- 일반 구현: 신뢰도가 높은 voiced 구간만 보간하고 낮은 신뢰도 구간은 사용하지 않습니다.
- 기술/API: MIDI-valued contour, confidence gate, damped follower.
- V2: **확장 계약만 준비됐습니다. 현재 혼합 음원은 pitchContour=null, influence=0으로 비활성화합니다.**
- 참고: 프로젝트 모델 설명; [P2J 구현 계약](review/SOUND-BOW-CONTACT-COMPARISON.md#p2j--shared-engine--feature-data--preset-contract).

## 37. Energy Envelope

- 한국어: 음의 세기가 변화하는 윤곽.
- 쉽게 말하면: 음악이 힘을 얻으면 활의 움직임도 더 살아나게 하는 신호입니다.
- 일반 구현: 짧은 구간 RMS를 측정하고 압축/정규화한 뒤 부드럽게 연결합니다.
- 기술/API: RMS, log compression, attack/release.
- V2: **현재 offline energy와 12% live envelope를 결합해 속도·범위·trail 존재감을 조절합니다.**
- 참고: 프로젝트 모델 설명; [P2J 구현 계약](review/SOUND-BOW-CONTACT-COMPARISON.md#p2j--shared-engine--feature-data--preset-contract).

## 38. Phrase Envelope

- 한국어: 조금 긴 호흡으로 보는 음악의 윤곽.
- 쉽게 말하면: 짧은 소리 하나보다 몇 순간 이어지는 흐름을 보고 좌우 이동을 조절합니다.
- 일반 구현: 빠른 에너지 변화를 느린 저역 통과 envelope로 정리합니다. 의미론적 악구 분할과는 다릅니다.
- 기술/API: slow envelope, 시간 기반 smoothing.
- V2: **현재 650ms envelope를 사용합니다. 악보를 읽어 악구 경계를 판정하는 기능은 아닙니다.**
- 참고: 프로젝트 모델 설명; [P2J 구현 계약](review/SOUND-BOW-CONTACT-COMPARISON.md#p2j--shared-engine--feature-data--preset-contract).

## 39. Attack / Release Smoothing

- 한국어: 올라갈 때와 내려갈 때의 반응 속도를 나누는 완화.
- 쉽게 말하면: 음악이 강해지면 재빠르게, 잦아들면 조금 더 부드럽게 따라갑니다.
- 일반 구현: 상승과 하강에 다른 시간 상수를 사용하고 속도 follower와 결합합니다.
- 기술/API: exponential smoothing, critically damped follower.
- V2: **현재 HOME_SIGNATURE는 attack 18ms / release 180ms입니다. 이 숫자가 브라우저 전체의 실제 오디오 지연을 뜻하지는 않습니다.**
- 참고: 프로젝트 모델 설명; [P2J 구현 계약](review/SOUND-BOW-CONTACT-COMPARISON.md#p2j--shared-engine--feature-data--preset-contract).

## 40. Hybrid Audio Analysis

- 한국어: 사전 분석과 실시간 반응을 함께 사용.
- 쉽게 말하면: 미리 읽어 둔 음악 지도에 현재 재생 상황을 보탭니다.
- 일반 구현: precomputed feature를 native media.currentTime으로 읽고 가벼운 live RMS와 playback state를 결합합니다.
- 기술/API: feature asset, HTMLMediaElement, Web Audio.
- V2: **현재 18초에서 구현했습니다. Web Audio가 없으면 기존의 명시적 static fallback과 실제 음원 재생을 유지합니다.**
- 참고: 프로젝트 모델 설명; [P2J 구현 계약](review/SOUND-BOW-CONTACT-COMPARISON.md#p2j--shared-engine--feature-data--preset-contract).

## 41. Acceleration Impulse

- 한국어: 위치 대신 가속에 주는 짧은 자극.
- 쉽게 말하면: 새 소리가 나면 활을 순간이동시키지 않고 현재 방향에서 빠르게 힘을 더합니다.
- 일반 구현: event strength가 속도 목표를 올리고 연속 follower가 실제 속도를 바꿉니다.
- 기술/API: onset envelope, integrated velocity.
- V2: **현재 onset 반응입니다. 방향은 부드러운 turning point를 통과하고 marker 자체에는 jitter를 넣지 않습니다.**
- 참고: 프로젝트 모델 설명; [P2J 구현 계약](review/SOUND-BOW-CONTACT-COMPARISON.md#p2j--shared-engine--feature-data--preset-contract).
