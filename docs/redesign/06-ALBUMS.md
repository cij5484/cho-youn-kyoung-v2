# CHO YOUN KYOUNG WEBSITE V2
## 06 — ALBUMS

**Version:** 1.1\
**Status:** Approved ALBUMS Baseline  
**Parents:** `00-MASTER-PLAN.md`, `02-DESIGN-SYSTEM.md`, `03-MOTION-SYSTEM.md`, `04-HOME.md`, `05-WORKS.md`  
**Page Role:** Digital Discography Exhibition

## 2026-09-08 연구 반영 — 다음 구현 후보

Discography Exhibition과 SANJO/JEONGAK grouping을 유지한다. 현재 `/albums/`는 **route fixture**다.
HOME의 앨범 projection과 cover 자료는 정식 archive 공개나 production 3D source 완료를 뜻하지 않는다.

- **목적 / 첫 화면:** 음악 grouping, 실제 cover/package, 작품명·연도·발매 상태를 읽는 전시.
  상세보다 조용하고 탐색 가능한 장면을 만든다.
- **대표 기법:** 선택한 음반 표면이 상세의 닫힌 음반 첫 장면으로 이어진다. Joffrey Spitzer의
  동일 대상 geometry 원리를 참고하되 목록마다 live canvas를 만들지 않는다.
- **자산 / 모바일:** production 3D still이 없으면 진짜 cover의 shared-image가 우선이다.
  모바일은 충분히 큰 한 음반씩 세로 chapter로 감상하며 추가 sticky SANJO/JEONGAK switch는 두지 않는다.
- **다음 단위:** ALBUMS 2D exhibition과 cover→한 detail entry 비교. 정확한 still→live handoff,
  실제 package 규격·renderer source와 3D 품질 gate는 기존 계약대로 별도다.

세부 후보와 실제 자산 한계는 [연구 §4.2](review/EXPERIENCE-PROTOTYPE-RESEARCH.md#42-albums--음반의-물성을-비교하는-전시)를 참조한다.
원리 채택은 페이지 구현·시각 승인·record publication이 아니다.

---

# 1. ALBUMS OBJECTIVE

ALBUMS is not a thumbnail archive and not another full 3D playground.

Its role is to present Cho Youn Kyoung's discography as a curated physical-artwork collection.

HOME already provides the signature 3D collection experience.

ALBUM DETAIL will provide deep live 3D interaction.

Therefore ALBUMS should emphasize:

- physicality
- curation
- musical grouping
- visual continuity
- efficient entry into detail pages

without repeating the same interaction language at full intensity.

---

# 2. CORE CONCEPT

Approved:

## Discography Exhibition

Albums should feel displayed like artworks in a quiet exhibition environment.

Primary background:
- Ivory

Primary mood:
- sculptural
- restrained
- physical
- editorial
- museum-like, not ecommerce-like

Do not present albums as equal product cards.

---

# 3. MUSICAL GROUPING

Approved grouping:

## SANJO
- Han Beom-su Ryu
- Ji Young-hee Ryu

## JEONGAK
- Pyeongjo Hoesang
- Yeongsan Hoesang

Chronology remains available through metadata.

The page is grouped by musical world rather than only release year.

---

# 4. GROUPING PRINCIPLE

The grouping should help a visitor understand the relationship between works.

Do not create visual category colors such as:

- SANJO = one UI color
- JEONGAK = another UI color

The Ivory interface remains stable.

Category identity should come from:

- typography
- spacing
- object composition
- source artwork
- chapter rhythm

---

# 5. DESKTOP EXHIBITION COMPOSITION

Use a large editorial composition rather than a rigid list.

Conceptual direction:

```text
DISCOGRAPHY

SANJO

        [ Han Beom-su package ]

                    [ Ji Young-hee package ]


JEONGAK

      [ Pyeongjo package ]

                         [ Yeongsan package ]
```

Actual layout should use the 12-column design grid.

Empty space is intentional.

---

# 6. OBJECT PRESENTATION

Approved preferred strategy:

## Production-3D Source → High-Quality Pre-render

The ALBUMS exhibition should normally display high-quality still renders derived from the same production 3D source used in Album Detail.

Do not use unrelated Photoshop mockups if the production 3D asset can generate the visual.

This enables consistent:

- perspective
- camera
- rotation
- lighting
- material tone
- scale
- package proportions

between ALBUMS and Album Detail.

---

# 7. WHY PRE-RENDER IN ALBUMS

The page should not pay full WebGL cost for every visible album object.

Pre-render objects allow:

- precise visual control
- fast loading
- stable mobile behavior
- lower GPU cost
- clearer distinction between ALBUMS and ALBUM DETAIL
- stronger perceived value when live 3D activates later

**Do not use live full-interaction 3D everywhere just because it is technically possible.**

---

# 8. CONDITION FOR PRE-RENDER → LIVE 3D HANDOFF

Approved preferred transition:

**Pre-render object → Live WebGL 3D object**

This is conditionally approved.

It must only be used if it can be executed precisely.

The pre-render and live 3D must closely match:

- camera perspective
- FOV
- rotation
- scale
- position
- lighting
- material response
- crop
- visual weight

The user should not see an obvious jump when the live 3D replaces the still.

---

# 9. HANDOFF QUALITY GATE

The transition is approved only if:

- still and live frames visually align
- loading does not expose an empty canvas
- texture pop-in is hidden or preloaded appropriately
- object scale does not jump
- camera does not reset visibly
- mobile transition remains stable
- browser history/navigation remains correct

If the handoff cannot be made visually clean:

## Fallback
Use a simpler shared-image transition.

**A simpler coherent transition is better than an ambitious but visibly imperfect handoff.**

---

# 10. INTERACTION

Approved default:

- subtle object lift
- very small tilt
- contextual `VIEW` cursor
- no continuous auto-rotation
- no full interactive rotate on the ALBUMS list

The interaction should suggest physicality without turning the page into another 3D demo.

---

# 11. TILT INTENSITY

Tilt must remain minimal.

Target impression:
- around 1–2 degrees
- enough to imply depth
- not enough to feel like a product-card gimmick

If the tilt makes the object feel unstable, remove it.

---

# 12. INFORMATION HIERARCHY

Approved minimum:

- Title
- Type
- Year
- `VIEW ALBUM →`

Optional:
- release status if materially useful

Do not show:
- full tracklist
- long album description
- full personnel
- credits
- streaming list

Those belong in Album Detail.

---

# 13. DESKTOP CHAPTER RHYTHM

SANJO and JEONGAK should feel like two chapters, not two tab panels.

Use:

- whitespace
- section title
- object arrangement
- restrained line/divider
- chronology metadata

Avoid tab UI unless future discography scale genuinely requires it.

---

# 14. DETAIL ENTRY

Approved transition family:

`Object focus → forward movement → live detail experience`

Where technically feasible:

1. selected pre-render lifts/focuses
2. surrounding content recedes
3. object grows/repositions
4. route transition begins
5. Album Detail live 3D begins from the matched framing

This transition belongs to the same overall V2 transition family but is album-specific.

---

# 15. 2D → 3D CONTINUITY PRINCIPLE

The same continuity philosophy used for 3D state transitions also applies to 2D → 3D handoff.

The final pre-render state should visually equal the initial live 3D state as closely as practical.

Do not animate toward one pose and then load a live object from another pose.

---

# 16. LEGACY 3D POLICY

Do not use legacy 3D screenshots or existing scene values merely because they already exist.

Before reuse, verify:

- geometry
- camera
- material
- lighting
- texture quality
- package dimensions
- art direction fit
- transition compatibility
- performance

If legacy scene values conflict with V2, rebuild them.

---

# 17. PRE-RENDER GENERATION POLICY

Pre-renders should be generated from the approved production 3D pipeline where possible.

Do not manually recreate each album mockup with inconsistent perspective.

Maintain a repeatable render configuration.

Conceptually centralize:

```text
AlbumRenderPreset
  camera
  rotation
  scale
  lighting
  background
  resolution
```

Album-specific overrides must remain minimal.

---

# 18. MOBILE — STRUCTURE

Approved:

## Vertical SANJO / JEONGAK Chapters

Do not shrink the desktop exhibition arrangement.

Mobile should become a deliberate vertical editorial composition.

Concept:

```text
DISCOGRAPHY

SANJO

[ Han Beom-su ]

[ Ji Young-hee ]


JEONGAK

[ Pyeongjo ]

[ Yeongsan ]
```

Spacing should remain generous.

---

# 19. MOBILE — OBJECT PRESENTATION

Approved:

## Pre-render first

Use:
- high-quality pre-render
- tiny scroll depth/parallax
- subtle tap response

Do not activate live WebGL for every album object in the mobile ALBUMS list by default.

This preserves performance and keeps live 3D special.

---

# 20. MOBILE — DETAIL HANDOFF

Approved:

**Tap → Object focus/enlarge → Live 3D Detail**

The transition should be shorter and simpler than desktop.

Requirements:
- minimal input lock
- no scroll conflict
- no blank canvas
- preload only what is justified
- fall back gracefully if live handoff is not ready

---

# 21. MOBILE — INFORMATION

Approved:

- Title
- Type
- Year

Do not add:
- full release metadata
- tracklist
- long copy

Keep the object visually dominant.

---

# 22. MOBILE — CATEGORY NAVIGATION

Approved for current discography size:

## No additional sticky SANJO / JEONGAK switch

Current album count is small enough that extra category navigation would add unnecessary UI.

Revisit only if the discography grows significantly.

---

# 23. RESPONSIVE ART DIRECTION

Desktop and mobile share:

- Ivory exhibition identity
- SANJO / JEONGAK grouping
- physical-object emphasis
- minimal information
- 2D → 3D detail language

But composition is independently designed.

Mobile is not a reduced desktop shelf.

---

# 24. REDUCED MOTION

When reduced motion is enabled:

- remove tilt
- simplify object lift
- use fade/scale for detail entry
- do not require animated 2D → 3D handoff

Live 3D remains accessible in Album Detail if appropriate, with its own reduced-motion behavior.

---

# 25. PERFORMANCE

ALBUMS should remain lighter than HOME 3D and Album Detail.

Requirements:

- optimized pre-render assets
- responsive image sizes
- no unnecessary WebGL scenes in the listing
- lazy loading after above-the-fold content
- preload detail 3D only when useful and justified
- avoid high-cost hover effects
- avoid multiple always-running animation loops

---

# 26. ASSET REQUIREMENTS

Before final production, verify for each album:

- final front artwork
- back artwork
- spine
- CD label
- booklet assets if relevant
- exact package dimensions
- texture resolution
- correct color handling
- approved title/year/type metadata

Current assets are sufficient for planning.

If any production asset is weak or incomplete, proactively request:
- higher-resolution source
- final print artwork
- corrected spine
- exact dimensions
- replacement render source

Do not invent missing physical details casually.

---

# 27. LEGACY-ASSET RULE

The legacy site may provide source material.

It does not define the V2 exhibition appearance.

Do not reuse:
- old background treatments
- old package screenshots
- old 3D composition
- old camera/light setup
- old album page layout

unless they independently pass V2 review.

---

# 28. ACCESSIBILITY

Each album object must also be a clear semantic link.

Requirements:
- visible focus state
- text label remains readable
- hover is not required
- tap targets are large enough
- screen reader gets title/type/year
- transition is optional enhancement

---

# 29. ACCEPTANCE CRITERIA

ALBUMS is approved when:

- it feels like a curated discography exhibition
- SANJO / JEONGAK grouping is immediately understandable
- it does not feel like a product grid
- it does not repeat HOME 3D interaction
- pre-renders feel physically convincing
- object hover remains subtle
- 2D → 3D handoff is visually seamless or cleanly falls back
- mobile remains fast and calm
- future album additions do not require page-specific hacks

---

# 30. DO

- preserve physicality
- use production 3D source for pre-renders
- keep interaction restrained
- keep metadata minimal
- preserve Ivory art direction
- use chapter spacing intentionally
- treat live 3D as a deeper experience

---

# 31. DO NOT

- generic album cards
- full tracklists on listing page
- four simultaneous interactive WebGL scenes
- auto-rotate every album
- fake product mockups with mismatched perspective
- reuse old 3D screenshots without review
- force an imperfect pre-render/live handoff
- add extra mobile navigation for only four albums

---

# 32. FALLBACK HIERARCHY

Preferred:
1. Precise production pre-render → live 3D handoff
2. Pre-render → shared-image transition
3. Pre-render → simple route fade

Choose the highest level that remains precise.

Never choose a more ambitious level if it lowers perceived quality.

---

# 33. FINAL ALBUMS PRINCIPLE

ALBUMS should make the visitor feel:

**“These are not thumbnails. These are physical works collected over time.”**

The listing is the exhibition.

The detail page is where the object comes alive.
