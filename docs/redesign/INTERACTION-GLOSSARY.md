# INTERACTION GLOSSARY — 웹 인터랙션 학습 노트

2026-09-08 · 61 terms · **사용자를 위한 human-readable reference. Agent instruction이 아닙니다.**

영어 이름을 알면 레퍼런스를 보고 원하는 효과를 더 정확하게 이야기할 수 있습니다. 일반적인 구현 방법과
V2의 현재 구현을 구분해 읽어 주세요. **현재 Lab / 미래 후보 / 필수 spike 미실행**은 서로 다른 상태입니다.
현재 승인은 [HANDOFF](../../CODEX-HANDOFF.md), 철학은 [MASTER §3.1](00-MASTER-PLAN.md#v2-experience-principles),
SOUND 수치는 [비교 계약](review/SOUND-BOW-CONTACT-COMPARISON.md)이 소유합니다. 이 노트는 새 기능을 승인하지 않습니다.
아래의 ‘프로젝트 설명’은 이 프로젝트를 위해 정리한 용어이며 공식 API 이름이 아닙니다.
공식 기술 문서 링크의 기존 확인 기록은 2026-09-07입니다. 2026-09-08에는 현재 HOME 코드를 기준으로 V2 설명을 갱신했습니다. 새 해외 사이트/API 검증 목록이나 기능 승인 문서가 아닙니다.

## 01. Pointer-Reactive Background

- 한국어: 포인터 위치에 반응하는 배경.
- 쉽게 말하면: 마우스가 움직이면 화면 뒤의 빛·이미지·깊이가 조금 달라지는 효과입니다.
- 일반 구현: pointer 좌표를 영역 안의 0–1 값으로 바꾼 뒤 보간하고 CSS transform 또는 shader 입력으로 전달합니다.
- 기술/API: Pointer Events, CSS custom properties, rAF, Canvas/WebGL.
- V2: **현재 개발 HOME에서 구현**. Performance의 contextual light와 Artist의 photo/mask/type plane이 보간된 포인터 입력에 작게 반응합니다. 모바일은 scroll이 주 입력이며, WebGL shader나 얼굴 왜곡을 사용하지 않습니다.
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
- V2: **현재 개발 HOME**의 Hero→Haegeum과 06 Stage Aperture→07 portrait split은 공유 요소를 유지합니다. HOME→Album/Performance Detail은 **FUTURE / 미구현**이며 현재는 stable content/asset identity만 준비했습니다. Native View Transition API나 실제 route animation 채택을 뜻하지 않습니다.
- 참고: 위 MDN; 프로젝트의 state continuity 계약은 [Motion §42](03-MOTION-SYSTEM.md).

## 04. Persistent Visual Anchor

- 한국어: 장면이 바뀌어도 남는 시각적 기준점.
- 쉽게 말하면: 주변이 변해도 같은 선이나 물체가 남아 ‘같은 공간에서 이어지고 있다’고 느끼게 합니다.
- 일반 구현: 요소를 공통 부모에 두고 재생성하지 않으며 transform과 상태만 연결합니다.
- 기술/API: 공유 DOM, refs, scene state, CSS mask/transform.
- V2: **현재 개발 HOME**의 SOUND 선→headless pair→Works→Album 흐름을 유지합니다. Performance/Artist에서는 잠깐 aperture/seam cue로 나타나고 완성 프레임에서 쉬며, Outro에서 두 endpoint로 수렴한 뒤 사라집니다. 항상 노출되는 UI가 아닙니다.
- 참고: 프로젝트 설명; [Haegeum 가이드](review/HOME-HAEGEUM-TRANSITION-PROTOTYPE.md).

## 05. Adaptive Contrast Navigation

- 한국어: 배경 대비에 맞춰 보이는 메뉴.
- 쉽게 말하면: 밝은 배경에서는 검은 메뉴, 어두운 무대에서는 흰 메뉴를 사용합니다.
- 일반 구현: 장면별로 저자가 검토한 light/dark/imagery theme를 지정합니다. 실시간 픽셀 분석은 필요할 때만 검토합니다.
- 기술/API: CSS variables, data attributes, scene state, IntersectionObserver.
- V2: **현재 개발 HOME에서 구현**. 실제 무대 경계에서 저자가 정한 foreground/background 대비 쌍을 함께 전환합니다. 읽기 어려운 중간 회색으로 보간하지 않습니다. 메뉴 dialog와 Bold motion 자체는 유지합니다.
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
- V2: **현재 개발 HOME의 8장면**. Works의 짧은 sticky queue와 06→07의 공유 sticky frame이 native scroll progress를 따릅니다. 사용자 스크롤을 가로채거나 GSAP를 사용한다는 뜻은 아닙니다.
- 참고: 프로젝트 설명; [HOME](04-HOME.md), [Motion](03-MOTION-SYSTEM.md).

## 08. Short-form Scrollytelling

- 한국어: 짧은 스크롤로 강한 인상을 남기는 이야기.
- 쉽게 말하면: 여러 번 계속 내려야만 끝나는 긴 도입부 대신 핵심 변화를 압축합니다.
- 일반 구현: 메시지와 장면 수를 먼저 정하고 필요한 최소 scroll 거리를 검토합니다. 시간을 억지로 늘리지 않습니다.
- 기술/API: scrollytelling과 동일; 거리·속도·내용 설계가 핵심입니다.
- V2: **승인된 원칙**. 현재 Works는 desktop 120svh / mobile 150svh travel로 다섯 작품을 전개합니다. 구간별 짧은 정렬은 scroll 거리이며 강제 체류 시간이 아닙니다. P2I의 기존 235svh 전환은 이번 pass에서 늘리지 않았습니다.
- 참고: 프로젝트 설명; [MASTER §3.1](00-MASTER-PLAN.md#v2-experience-principles).

## 09. GSAP Flip

- 한국어: 레이아웃 변경 전후를 연결하는 GSAP 플러그인.
- 쉽게 말하면: 흩어진 사진을 그리드로 바꿀 때 각 사진이 어디로 이동하는지 보여 줍니다.
- 일반 구현: 처음 상태를 기록하고 최종 레이아웃을 적용한 뒤, 두 상태의 차이를 transform으로 역보정해 풀어 줍니다.
- 기술/API: GSAP Flip.getState / Flip.from; FLIP = First, Last, Invert, Play.
- V2: 플러그인 자체는 **미채택**. 이전 HOME Works의 cluster inversion은 리본으로 대체됐습니다. 현재 리본의 좌표 보간을 GSAP Flip 구현으로 부르지 않습니다.
- 참고: [GSAP Flip 공식 문서](https://gsap.com/docs/v3/Plugins/Flip/).

## 10. Layout Reorganization

- 한국어: 요소들이 관계를 유지하며 새 배열로 정리되는 전환.
- 쉽게 말하면: 작품들이 흩어져 있다가 같은 작품끼리 정돈된 목록으로 모입니다.
- 일반 구현: 의미/ID가 같은 항목의 시작·도착 geometry를 연결합니다. 내용 순서와 포커스도 관리합니다.
- 기술/API: CSS Grid/Flex, FLIP, transform, ResizeObserver.
- V2: 이전 HOME cluster 재배열과 일반 모바일 grid는 **대체됨**. 현재 desktop/mobile 모두 한 작품씩 전개하는 Depth Queue이며, static grid는 reduced-motion 대안으로만 남습니다.
- 참고: 구현 기법 예시 [GSAP Flip](https://gsap.com/docs/v3/Plugins/Flip/); 이 용어 자체는 프로젝트 설명입니다.

## 11. Filmstrip Gallery

- 한국어: 필름 띠처럼 이어지는 사진/영상 갤러리.
- 쉽게 말하면: 개별 카드 격자 대신 사진이 한 줄의 리듬으로 이어집니다.
- 일반 구현: 크기가 다른 미디어를 strip/ribbon에 배치하고 native scroll 또는 드래그와 명시적 탐색을 제공합니다.
- 기술/API: CSS flex, scroll-snap, Pointer Events; 필요 시 가상화.
- V2: **현재 HOME Selected Works의 출발점**. 현재는 native-scroll ribbon을 Depth Queue로 다듬어 foreground work와 다음 edge를 연결합니다. 모바일도 같은 작품 순서를 큰 이미지로 전개하며, grid 축소판이 아닙니다. MEDIA filmstrip은 별도 미래 후보입니다.
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
- V2: **P2I 시각 승인 / B2 LONG 460ms 정본**. 12개 고정 SVG age-band paths. 후속 HOME sprint는 head를 trail 폭의 작은 cap / opacity .08로 줄여 궤적을 주인공으로 만들었습니다. 중앙 history/persistence 설정은 유지합니다.
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
- V2: **현재 Haegeum Lab**의 부위→전체와 개발 HOME의 Works 깊이 교체, Stage Aperture→Artist split에 해당합니다. 전체 WORKS archive 재배치나 Detail route transition은 별도 미래 범위입니다.
- 참고: 프로젝트 설명; [Haegeum 가이드](review/HOME-HAEGEUM-TRANSITION-PROTOTYPE.md).

## 23. Selective Rendering

- 한국어: 필요한 장면만 갱신하는 방식.
- 쉽게 말하면: 보이지 않는 장면까지 계속 그려 배터리를 쓰지 않습니다.
- 일반 구현: 화면 교차·탭 숨김·reduced motion·settlement 상태를 보고 frame scheduling을 멈춥니다. 일반 UI의 읽기 상태는 유지합니다.
- 기술/API: [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API), Page Visibility, request/cancelAnimationFrame.
- V2: **현재 SOUND**의 offscreen pause/frame cancellation에 더해 HOME light/depth owner는 settlement·offscreen·hidden 조건을 관리합니다. Afterimage는 관련 geometry/state가 바뀔 때만 갱신하고, pair는 06/07 quiet frame과 Outro 끝에서 멈춥니다. 지속 thermal QA 완료를 뜻하지 않습니다.
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
- V2: **현재 SOUND** pause/resume, HOME album의 live hover→drag→bounded release 및 연속 선택, 06→07의 같은 seam이 사례입니다. **향후 Detail**로 outgoing object state를 전달하는 route 계약은 아직 구현하지 않았습니다.
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


## P2K 용어의 출발점 — 원래 Lab 기록과 현재 사용 범위

다음 용어는 P2K Lab 비교에서 출발했습니다. 그 비교의 정확한 튜닝·조사 기록은 [P2K 소유 문서](review/P2K-INTERACTION-PROTOTYPES.md)에 남습니다. 현재 HOME closing 사용은 각 항목과 [Motion §49](03-MOTION-SYSTEM.md#49-current-home-closing-motion-contract)를 함께 읽어 주세요. 이 제목이 모든 P2K 후보의 현재 승인 상태를 일괄 판정하지는 않습니다.

## 42. Two Spatial Points

- 두 개의 공간 점. 처음부터 해금 현을 그리지 않고, 이름 주변을 지나며 장면의 기억을 이어 주는 두 점입니다.
- 일반 구현: 작은 3D 위치 둘을 투영하고 시간에 따른 경로를 저장합니다.
- V2: **현재 P2K Lab 비교 B**. Bronze 두 점이며 production 정본으로 선택된 상태는 아닙니다.

## 43. Depth Choreography / Perspective Motion

- 깊이 안무. 점이 앞쪽으로 오면 커지고 뒤로 들어가면 작아져 평면 화면에 깊이를 만듭니다.
- 일반 구현: X/Y/Z 경로, camera projection, depth-based scale. 반드시 큰 3D 라이브러리가 필요한 것은 아닙니다.
- V2: **현재 Canvas pair 원근 투영**과 CSS Works/Album depth에서 사용합니다. WebGL이나 3D 해금 모델을 구현했다는 뜻은 아닙니다.

## 44. Glyph Occlusion

- 글자에 의한 가림. 뒤로 지나가는 점은 글자 획에 가려지고, 앞으로 나온 점은 글자 위를 지나갑니다.
- 일반 구현: 앞/뒤 레이어, glyph mask, stencil. 실제 글자를 3D로 만드는 방식과 다릅니다.
- V2: **현재 DOM 글자는 유지하고 뒤 Canvas에만 glyph mask를 적용**합니다. Native Safari/DPR 경계 품질은 추가 검토 사항입니다.

## 45. Scroll Convergence / Lock-on

- 스크롤 수렴과 정착. 자유롭게 움직이던 점이 점차 실제 이미지의 한 위치로 모여 듭니다.
- 일반 구현: 자유 경로에서 authored target으로 연속 보간하고 orbit을 줄여 0으로 만듭니다.
- V2: **현재 사진별 보이는 현 구간에 정착**합니다. AI full reference는 시각 정렬일 뿐 실제 악기의 치수 증거가 아닙니다.

## 46. Helix Orbit / Rhythmic Counterpoint

- 나선 궤도와 리듬의 대화. 작은 점이 두 선을 앞뒤로 감싸며 주인공의 긴 흐름에 짧은 리듬을 더합니다.
- 일반 구현: 축 방향 이동 + 작은 원운동 + 원근 크기, 짧은 실제 경로 이력.
- V2: **현재 장구 marker 후보**. Violet 해금보다 작고 적갈색이며 색 최종 선택은 아직입니다. Idle orbit은 재생 상태 표시가 아닙니다.

## 47. Percussive Transient

- 타격성 순간음. 둥글게 이어지는 음보다 갑자기 나타나는 '탁' 같은 성분을 말합니다.
- 일반 구현: 대역별 energy/positive flux/flatness와 이전 구간 비교. 혼합 음원에서 악기 식별을 보장하지 않습니다.
- V2: **보수적인 장구 후보 추정**. 사용자가 확인한 약 0초, 3–4초, 9초, 14–15초를 기존 후보가 포함합니다. 나머지 후보는 미확정입니다.

## 48. Shared Glyph Transition

- 공통 글자 유지 전환. PAUSE에서 RESUME으로 바뀔 때 함께 쓰는 글자가 사라지지 않고 새 자리로 옮겨 갑니다.
- 일반 구현: 중복을 허용하되 한 글자 노드는 한 번만 대응시키고 실제 현재 위치부터 새 위치로 이동합니다.
- V2: **현재 P2K Lab B**. 빠른 재전환에서도 이전 animation의 시작점으로 되돌리지 않습니다.

## 49. Masked Character Cascade

- 글자별 마스크 계단 전환. 떠나는 글자와 새 글자가 각자 작은 창을 통해 조금씩 다른 시각에 이동합니다.
- 일반 구현: glyph clip-path + staggered transform; 공통 글자는 별도 유지합니다.
- V2: **480ms 전체 구간 / 32ms stagger 후보**. Screen reader는 쪼갠 글자 대신 실제 버튼의 현재 동작 이름을 읽습니다.

## 50. Baseline Drift

- 기준선의 작은 어긋남. 글자를 번갈아 조금 올리고 내려 손길에 응답하는 리듬을 줍니다.
- 일반 구현: state transition과 분리한 작은 transform, leave 시 현재 위치에서 복귀.
- V2: **P2K action hover ±3px 후보**, 승인된 MENU ±7px보다 작습니다. Reduced motion에서는 움직이지 않습니다.

## 51. Presentation Adapter / 2.5D Object

- 장면의 동작과 물체를 그리는 방법을 나누는 구조입니다. 앨범을 바꿔도 회전 중이던 위치가 이어집니다.
- 현재 HOME은 실제 앞면·뒷면·책등을 CSS 입체 면에 배치합니다. 선택·회전은 scene, 외형은 교체 가능한 adapter가 소유합니다.
- 현재 세 앨범은 920ms 공간 진입/퇴장으로 교체되고, outgoing/incoming plane에 Z-depth를 사용합니다. 회전 자세와 교체 중간 위치는 이어지고, 주변 Light Memory는 선택된 표지 색과 실제 자세를 늦게 따라옵니다. 깊이는 시각적 근사이며 실물 치수 검증은 아닙니다.
- GLB로 바꿀 때 장면 전체를 다시 만들지 않기 위한 경계이며, 최종 Blender/Tray 품질 검증을 통과했다는 뜻은 아닙니다.
- 구현 계약: [Motion §49](03-MOTION-SYSTEM.md#49-current-home-closing-motion-contract).


## HOME cinematic continuity 용어 — 현재 구현 / 미채택 / FUTURE 구분

아래는 2026-09-08 현재 개발 HOME의 구현 설명입니다. 코드에 존재한다는 뜻이며 사용자 시각 승인이나
실기기 품질 보증은 아닙니다. 정확한 구현 경계는 [HOME의 현재 revision](04-HOME.md),
[Motion §49](03-MOTION-SYSTEM.md#49-current-home-closing-motion-contract), 검증/전달 상태는 HANDOFF가 소유합니다.

## 52. Scene Afterimage

- 한국어: 이전 장면의 짧은 물질적 잔상.
- 쉽게 말하면: 작품의 마지막 모서리가 앨범 공간까지 잠시 남아, 같은 공간을 지나간다고 느끼게 합니다.
- 일반 구현: outgoing geometry/asset/light를 좁은 mask 안에서 다음 anchor로 연결하고 수명을 짧게 제한합니다.
- V2: **현재 구현**. 실제 마지막 Works image edge→Album, 선택된 album RGB/light→Stage, 실제 Artist seam→Outro를 연결합니다. 긴 ghost나 blur가 아니라 짧은 edge/light이며 입력을 가로채지 않습니다.
- 코드: [SceneAfterimages.tsx](../../src/home/SceneAfterimages.tsx), [continuity.css](../../src/home/continuity.css).

## 53. Z-depth Transition

- 한국어: 앞뒤 공간을 통해 교체되는 전환.
- 쉽게 말하면: 화면이 꺼졌다 켜지는 대신 현재 이미지가 뒤로 물러나고 다음 이미지가 앞에 도착합니다.
- 일반 구현: perspective와 translateZ, scale, crop의 관계를 함께 설계합니다. WebGL은 필수가 아닙니다.
- V2: **현재 구현**. Works queue와 Album object 교체의 DOM/CSS depth에 사용합니다. 모바일은 깊이를 줄이고 한 작품을 크게 유지합니다. Route-level shared transition과는 구분합니다.
- 코드: [depth-queue.ts](../../src/home/depth-queue.ts), [album-depth.css](../../src/home/album-depth.css).

## 54. Occlusion Typography

- 한국어: 이미지 일부의 앞뒤로 나뉘는 타이포그래피.
- 쉽게 말하면: 글자 일부는 인물 뒤에, 일부는 앞에 두어 텍스트와 사진이 같은 공간에 있는 것처럼 보입니다.
- 일반 구현: 실제 subject mask와 배경/텍스트 layer를 분리하며 얼굴·가독성·정적인 composition을 먼저 검토합니다.
- V2: **OPTIONAL / 이번 pass 미채택**. 실제 silhouette cutout이 없는 현재 suit/hanbok 사진에는 추가 type overlay를 넣지 않았습니다. Glyph Occlusion(44)의 Canvas trail 가림과 다른 기법입니다.
- 기준: 큰 글자 자체가 impact는 아닙니다. 얼굴을 가리거나 split composition을 훼손하면 도입하지 않습니다.

## 55. Threshold Moment

- 한국어: 장면이 완성되어 보이는 정렬 순간.
- 쉽게 말하면: 움직이던 이미지·글자·선이 잠깐 가장 좋은 자리에 모인 뒤 다음 장면으로 넘어갑니다.
- 일반 구현: scroll 구간에 짧은 hold를 두거나 물체의 자연스러운 settlement를 이용합니다. 시간을 강제로 묶지 않습니다.
- V2: **현재 구현**. SOUND canonical frame은 이전 LISTEN snap을 유지합니다. Works에는 interval hold, Album에는 pose/light settle, Stage에는 poster/date hold, Artist에는 47.6% split hold, Outro에는 두 endpoint 수렴이 있습니다.
- 한계: .82–.91 Artist hold 등은 progress 거리이며 0.5–1초 재생을 보장하는 타이머가 아닙니다. 빠른 스크롤을 막지 않습니다.

## 56. Persistent Two-Point Narrative

- 한국어: 장면마다 역할이 달라지는 두 점의 서사.
- 쉽게 말하면: 같은 두 궤적이 작품을 안내하고, 무대 틈의 장력을 보여 주다가 마지막 이름 주변에서 정리됩니다.
- 일반 구현: 하나의 phase/history owner가 장면별 anchor와 노출 정도를 연결합니다. 필요 없는 순간에는 쉬게 합니다.
- V2: **현재 구현**. Headless Violet/Lacquer pair는 Works→object 기준 Album→짧은 aperture/seam cue→Outro endpoint로 이어집니다. Album에서 cursor를 쫓지 않고 06/07 threshold에서는 숨습니다.
- 모바일/reduced: 모바일에서는 content 앞에 과하게 나타나지 않게 줄입니다. Reduced motion은 장식 궤적을 숨기고 정적 정보와 이름을 유지합니다.
- 코드: [works-motion.ts](../../src/home/works-motion.ts), [closing-orbit.ts](../../src/home/closing-orbit.ts).

## 57. Works Depth Queue

- 한국어: 다음 작품이 깊이에서 기다리는 작품 열.
- 쉽게 말하면: 한 작품은 크게 보이고, 다음 작품은 작은 카드가 아닌 먼 모서리로 예고되다가 앞으로 다가옵니다.
- 일반 구현: 순서가 있는 plane에 relative depth/crop을 계산하고 현재 작품의 짧은 full-composition 구간을 둡니다.
- V2: **현재 desktop/mobile 구현**. 다섯 작품의 native travel은 desktop 120svh, mobile 150svh이며, 각 interval은 .13/.87 바깥에서 잠시 정렬됩니다. Active image/title/year/type와 번호 탐색을 유지합니다.
- 정적 대안: reduced motion에서는 전 작품 링크와 caption을 읽을 수 있는 grid로 바뀝니다.
- 코드: [depth-queue.ts](../../src/home/depth-queue.ts).

## 58. Album Light Memory

- 한국어: 물체보다 조금 늦게 따라오는 빛.
- 쉽게 말하면: 앨범을 돌려 놓으면 주변 반사와 색이 살짝 뒤따라 안정되는 효과입니다.
- 일반 구현: 실제 rendered pose와 asset tone을 입력으로, 물체보다 느린 direction/color damping을 사용합니다.
- V2: **현재 구현**. 세 표지 derivative의 RGB 평균을 transient tone으로 쓰며 실제 turn/tilt를 따라 reflection/ambient/shadow가 settle합니다. 정지 후 독립 idle loop를 돌리지 않습니다.
- 색 원칙: 새 브랜드 색·neon·bloom이 아닙니다. Reduced motion에서는 선택된 contextual tint를 즉시 정리합니다.
- 코드: [album-light.ts](../../src/home/album-light.ts), [album-depth.css](../../src/home/album-depth.css).

## 59. Performance Date Geometry

- 한국어: 날짜를 장면 경계와 함께 움직이는 구조로 쓰기.
- 쉽게 말하면: 09와 22가 단순 작은 날짜가 아니라 무대가 열리는 동작과 함께 제자리를 찾습니다.
- 일반 구현: 실제 date text를 semantic time 안에 두고 visual spans와 경계선만 같은 progress로 이동시킵니다.
- V2: **현재 구현**. 2026.09.22 `<풀고, 엮다>`의 09 / 22가 offset에서 정렬되고 중심 경계가 aperture와 함께 성장합니다. 그 다음 공유 frame/seam이 Artist split을 이어받습니다. 날짜 글자 자체가 얼굴 위를 가로질러 이동하는 morph는 아닙니다.
- 자산: 현재 surface는 해당 공연의 공식 poster이며 실제 공연 촬영 사진으로 설명하지 않습니다.
- 코드: [PerformanceScene.tsx](../../src/home/PerformanceScene.tsx), [stage-depth.css](../../src/home/stage-depth.css).

## 60. Subtle 2.5D Portrait Depth

- 한국어: 사진·mask·글자 사이의 작은 깊이 차이.
- 쉽게 말하면: 얼굴을 왜곡하지 않고 사진 면과 글자가 몇 픽셀 다르게 반응해 살아 있는 표면처럼 보입니다.
- 일반 구현: 독립 plane에 작은 이동 비율을 주고 responsive crop은 별도로 보존합니다. 실제 subject segmentation은 선택 사항입니다.
- V2: **현재 DOM plane 방식 구현**. Suit/hanbok photo와 seam이 작게 함께 움직이고 이름은 더 작은 반대 depth를 가집니다. 배경은 안정적이며 모바일은 작은 scroll-driven displacement만 사용합니다.
- 한계: 인물/배경을 새 silhouette로 분리하지 않았고, portrait tilt·3D 얼굴·floating person·강한 parallax를 추가하지 않았습니다.
- 코드: [stage-depth.css](../../src/home/stage-depth.css).

## 61. Scroll Velocity Response

- 한국어: 스크롤 속도를 작은 물리적 입력으로 쓰기.
- 쉽게 말하면: 빨리 넘길 때 물체가 살짝 더 늦게 따라오고 멈추면 정리되게 할 수 있습니다.
- 일반 구현: scroll position과 velocity를 구분하고 bounded response에만 속도를 사용합니다. 핵심 content 위치를 속도에 의존시키지 않습니다.
- V2: **OPTIONAL / 이번 pass 미채택**. Native position과 시간 기반 settlement를 유지했습니다. 새 velocity inertia를 넣거나 fast scroll에서 작품 선택 기준을 바꾸지 않았습니다.
- 기준: mobile jank, 위치 불안정, 멀미나 reverse discontinuity가 생기면 사용하지 않는 기법입니다.
