# CHO YOUN KYOUNG WEBSITE V2
## 10 — ABOUT / MEDIA / CONTACT

**Version:** 1.2\
**Status:** Approved Baseline  
**Parents:** `00-MASTER-PLAN.md`, `02-DESIGN-SYSTEM.md`, `03-MOTION-SYSTEM.md`, `04-HOME.md`  
**Page Roles:** Editorial Biography / Visual Media Archive / Official Contact Endpoint

## 2026-09-08 연구 반영 — 정보 우선의 세 페이지

2026-09-12 사용자 PR/merge 승인으로 Pages development preview의 ABOUT은 실제 portrait biography와
회전 가능한 3D helix gallery로 대체한다. 사진 확대 닫기와 나선 Close는 별도 단계이며 오른쪽 사진열로 복귀한다.
[현재 ABOUT owner](review/ABOUT-PORTRAIT-GALLERY.md)를 참조한다. 아래 fixture 설명은 release/EN 및
아직 승격하지 않은 MEDIA/CONTACT에 해당한다.

현재 `/about/`, `/media/`, `/contact/`는 **route fixture**다. HOME의 프로필 링크나 새 opt-in 구성이
이 페이지들의 구현 완료를 뜻하지 않는다. 세부 적용·자산·다음 단위는
[연구 §4.6](review/EXPERIENCE-PROTOTYPE-RESEARCH.md#46-media--about--contact--기본-방향)을 참조한다.

| 페이지 | 목적·대표 기법 | 모바일 / 다음 구현 단위 |
|---|---|---|
| ABOUT | 인물과 예술적 위치를 읽는다. 실제 portrait의 여백과 중요한 연도가 같은 축으로 이어지는 editorial biography. Lesse의 역할→근거→연락 원리를 적용하며 HOME 번짐을 반복하지 않는다. | 초상 다음에 읽는 문장·선택 이력·전체 CV. 정확한 사실/KO·EN 상태·portrait 원본 확인 후 ABOUT 1페이지 prototype. |
| MEDIA | 영상·사진·press를 발견한다. 선택한 실제 poster가 같은 자리의 player 공간으로 펼쳐진다. PHOTOYOSHI의 overview→focus를 영상에 맞게 변형한다. | 세로 feed와 큰 inline player. 승인 영상 1개·poster/자막 상태로 시작; 명시적 Play 때만 player 로드. |
| CONTACT | 공식 연락을 빠르게 마친다. 실제 email이 복사 완료 문구로 잠깐 재조판되는 작은 응답. | 긴 주소 줄바꿈·44px actions·focus/live status. 검증된 email의 Mailto/Copy와 실패 fallback 1단위. form/server는 추가하지 않는다. |

**사용자 제공 최신 ABOUT 프로필 — 2026-09-08 사실 기준:**

- 조윤경 / **Cho Youn Kyoung** · 해금 연주자
- **현재:** 국립부산국악원 기악단 **단원**. 현직에 해금 수석/Principal/Chief를 쓰지 않는다.
- 한양대학교 음악학박사(D.M.A.)
- 국가무형유산 「종묘제례악」 이수자
- 제27회 온나라국악경연대회 해금부문 금상
- ABOUT 경력에 우리음악앙상블 새.생(new.生) 동인 포함
- **과거 경력:** 前 국립부산국악원 기악단 수석 역임

현재 역할→핵심 약력→biography→전체 CV의 위계를 만든다. HOME compact profile은 핵심만 사용하고
ABOUT에서는 과거 직책과 동인 경력을 구분한다. 공식 EN은 별도 검토하며 사실 기반 문장을 임의 창작하지 않는다.
연구 제안은 후속 시각 후보이고, 이전 승인 baseline·콘텐츠 보호 규칙은 유지한다.

---

# PART I — ABOUT

# 1. ABOUT OBJECTIVE

ABOUT must not repeat HOME Scene 07.

HOME reveals:
- who Cho Youn Kyoung is

ABOUT explains:
- how she became the artist she is
- what defines her artistic position
- which career milestones matter
- how her visual archive supports that narrative

Core concept:

## Editorial Biography + Career Archive

The page should feel like a publication, not a résumé page.

---

# 2. ABOUT STRUCTURE

Approved flow:

```text
ABOUT HERO
→ INTRO STATEMENT
→ BIOGRAPHY
→ SELECTED MILESTONES
→ FULL CAREER / PROFILE INDEX
→ PORTRAIT ARCHIVE
→ CONTACT PATH
```

---

# 3. ABOUT HERO

Approved:

## Large Name + Different Portrait + One-Line Artist Statement

Do not reuse the exact HOME portrait composition.

Use a different portrait set or crop.

Possible structure:

```text
CHO
YOUN
KYOUNG

A HAEGEUM ARTIST
BETWEEN TRADITION AND THE PRESENT.

[ DIFFERENT PORTRAIT ]
```

The exact statement will be refined later.

---

# 4. ABOUT HERO RULE

Avoid:
- repeating the same front-facing HOME portrait
- fullscreen beauty-style portrait with no context
- collage overload
- long biography in the Hero

Use:
- large typography
- one distinct portrait
- strong negative space
- restrained motion

---

# 5. BIOGRAPHY

Approved:

## Large Intro Statement + Readable Body

Structure:

```text
LARGE STATEMENT

        biography paragraph
        biography paragraph
        biography paragraph
```

The large statement acts as an editorial anchor.

The body remains readable and factual.

Do not fragment the biography into animation-heavy pieces.

---

# 6. CAREER PRESENTATION

Approved:

## Selected Milestones + Full CV / Career Index

Top:
- key positions
- degrees
- awards
- representative milestones

Lower:
- accurate full profile/career index

This provides both:
- visual hierarchy
- factual completeness

Do not show the entire CV as one giant timeline from the top.

---

# 7. SELECTED MILESTONES

Use a limited number of high-value facts.

Possible categories:

- current artistic position
- major degree
- major award
- major album/performance milestone
- selected teaching/academic role if relevant

Presentation should remain editorial, not badge-based.

---

# 8. FULL CAREER INDEX

The Full Career area should be precise and easy to scan.

Possible fields:

```text
YEAR
ROLE / EVENT
ORGANIZATION
DETAIL
```

Do not over-design factual career information.

---

# 9. PORTRAIT ARCHIVE

Approved:

## Loose Editorial Portrait Archive

Use:
- different portrait sizes
- varied crop
- generous whitespace
- multiple eras / costumes / visual identities
- controlled irregular rhythm

Do not use:
- generic equal gallery cards
- endless horizontal loop as the default
- every image at full-screen height

---

# 10. PORTRAIT VIEWER

Click/tap may open a larger viewer.

Requirements:
- next / previous
- keyboard support
- close
- mobile swipe optional
- accessible alt text

The viewer remains secondary to the page.

---

# 11. ABOUT EASTER EGG

Approved:

## One Small Hidden Delight

Possible:
- subtle annotation on a specific portrait
- hidden year/caption
- small line response
- tiny personal note

Do not turn ABOUT into a game.

The delight must remain optional to discover and non-intrusive. This is a separate ABOUT Delight, not a reuse of Sou.P. Sou.P is reserved for HOME Outro / Footer as its creator signature. Do not weaken that signature by repeating its credit/Easter Egg here.

---

# 12. ABOUT MOBILE

Use a vertical editorial composition.

Do not shrink desktop asymmetry directly.

Mobile priorities:
- clear portrait
- readable biography
- milestone hierarchy
- easy career scanning
- portrait archive with controlled density

---

# 13. ABOUT ASSET REQUIREMENTS

Current portrait assets are sufficient for planning.

Before production:
- select strongest Hero portrait
- select distinct archive set
- verify mobile crops
- request higher-resolution originals if needed
- request new portrait only if it materially improves the page

Do not force repeated use of the same image set.

---

# 14. ABOUT ACCEPTANCE CRITERIA

ABOUT is approved when:

- it does not feel like HOME repeated
- biography is readable
- career information is trustworthy
- selected milestones are visually strong
- full career remains easy to verify
- portrait archive feels curated
- one small delight exists without distracting from content

---

# PART II — MEDIA

# 15. MEDIA OBJECTIVE

MEDIA is not a YouTube playlist page.

It is a visual archive for:

- performance films
- selected videos
- portraits/images
- special media
- press references

Core concept:

## Featured Film + Visual Media Archive

---

# 16. CURRENT MEDIA SOURCE STRATEGY

Current production media is primarily YouTube-linked.

V2 should continue to use YouTube as the primary public video distribution source unless a future requirement justifies otherwise.

The website should not store large video masters in the repository by default.

Preferred architecture:

```text
YouTube = delivery / hosting
V2 = art-directed presentation
```

Do not visually expose a grid of raw YouTube embeds as the default experience.

---

# 17. YOUTUBE LOADING STRATEGY

Approved:

## Poster First, Player on Demand

Before playback:
- custom poster frame
- V2 typography
- V2 hover/motion language

After explicit user action:
- load/activate the YouTube player

Benefits:
- faster initial page
- less platform visual intrusion
- better art direction control
- fewer simultaneous iframe costs

No autoplay audio.

---

# 18. MEDIA CONTENT GROWTH RULE

Current video inventory is limited.

This is not a design problem.

The page must support growth over time without requiring a redesign.

Initial page may contain:
- one Featured Film
- several selected videos
- portraits/images
- special archive
- Press index

Do not artificially fill the page with weak media.

---

# 19. MEDIA STRUCTURE

Approved:

```text
FEATURED MEDIA
→ VISUAL MEDIA ARCHIVE
→ OPTIONAL FILTER
→ PRESS INDEX
```

The archive should feel continuous rather than divided into large boxed category sections.

---

# 20. FEATURED MEDIA

Approved:

## Strong Poster Frame + Explicit Playback

Use one representative film/video.

Click/tap:
- frame expands or activates naturally
- player loads
- sound begins only after user action

Do not use a raw YouTube iframe as the Hero.

---

# 21. MEDIA ARCHIVE

Approved:

## Film-led Editorial Grid

Allow different media formats to coexist:

- wide video still
- portrait image
- vertical clip poster
- large featured frame
- image sequence

Do not force all media into a uniform card ratio.

---

# 22. MEDIA PLAYBACK

Approved:

## Inline Expansion Player

The selected media expands in place where practical.

The user should remain within the archive context.

Fallback:
- fullscreen/modal player
- direct YouTube link only when necessary

Do not default to opening a new browser tab.

---

# 23. MEDIA HOVER

Approved:

## Quiet Poster Response

Use:
- subtle crop
- small scale
- restrained motion

Do not autoplay full previews on every hover.

If a short preview asset becomes available later, it may be tested selectively.

---

# 24. PHOTO / VIDEO RELATIONSHIP

Approved:

Photo and video may coexist in the same visual archive.

Do not force separate VIDEO and PHOTO pages.

The visual format itself should signal media type.

---

# 25. MEDIA FILTER

Approved potential filter:

```text
ALL
FILM
PERFORMANCE
PORTRAIT
```

Important:

**The filter should only be visible when the content volume justifies it.**

With a small archive, hide it.

Do not show empty or nearly empty categories for design symmetry.

---

# 26. MEDIA DATA MODEL

The media system should support growth without code changes.

Conceptual fields:

```ts
{
  id,
  kind,
  title,
  year,
  category,
  youtubeId?,
  url?,
  poster?,
  featured?,
  relatedPerformanceId?
}
```

Do not hard-code media items into page layout logic.

---

# 27. POSTER FRAME POLICY

For important videos, create/select intentional poster frames.

Possible sources:
- strong video frame
- edited still
- performance poster
- new editorial image

Do not rely blindly on auto-generated YouTube thumbnails.

When future performance videos are uploaded, review:
- best poster frame
- Hero candidate quality
- archive priority
- relationship to Performance Detail

---

# 28. FUTURE VIDEO WORKFLOW

When new videos are edited/uploaded:

1. add YouTube URL / ID
2. choose or create poster frame
3. classify:
   - Featured
   - Archive
   - Performance-linked
4. review desktop/mobile crop
5. connect to Performance Detail if relevant

The page architecture should not require code restructuring for this workflow.

---

# 29. PRESS — APPROVED POSITION

Approved:

## PRESS remains inside MEDIA as a quiet lower Editorial Index

Do not make PRESS a major visual category at the top.

Do not create a separate PRESS page at the current scale.

Do not remove PRESS entirely.

---

# 30. PRESS INDEX

Suggested structure:

```text
PRESS

2026   OUTLET       ARTICLE TITLE →
2025   OUTLET       ARTICLE TITLE →
```

Use:
- year
- outlet
- title
- external link

Optional:
- category

Do not over-style article rows.

---

# 31. PRESS INTERACTION

Simple editorial response:
- underline
- line
- small text shift

Do not create heavy visual previews unless press content volume later justifies it.

---

# 32. MEDIA MOBILE

Approved:

## Vertical Media Feed + Featured Video + Mixed Ratio

Use:
- Featured poster first
- full-width primary video frames
- mixed one/two-column images
- tap → inline player
- minimal autoplay behavior

Do not build a swipe-heavy media experience.

---

# 33. MEDIA PERFORMANCE

Requirements:

- poster-first loading
- lazy-load offscreen images
- defer YouTube iframe creation until needed
- destroy/suspend inactive players
- responsive poster assets
- avoid multiple simultaneous video decodes

---

# 34. MEDIA ACCESSIBILITY

Requirements:
- clear play labels
- keyboard playback activation
- meaningful poster alt text
- YouTube iframe title
- visible focus
- no autoplay audio
- external press links labeled clearly

---

# 35. MEDIA ASSET REQUIREMENTS

Current media is sufficient for initial planning.

Future recommended assets:
- edited performance videos
- intentional poster frames
- higher-quality performance stills
- portraits
- verified press links

These are not currently blocking.

Proactively request them when they materially improve MEDIA or Performance Detail.

---

# 36. MEDIA ACCEPTANCE CRITERIA

MEDIA is approved when:

- it does not look like a YouTube playlist
- one Featured Film feels intentional
- archive supports mixed media
- limited content still looks confident
- future video growth is easy
- YouTube loads only when useful
- Press remains accessible without interrupting the visual flow

---

# PART III — CONTACT

# 37. CONTACT OBJECTIVE

CONTACT is the official communication endpoint and a quiet ending space.

It should not feel like:
- corporate support
- SaaS lead generation
- a form-heavy business page

Core concept:

## Oversized Contact Typography + Minimal Information

---

# 38. CONTACT COMPOSITION

Approved:

```text
CONTACT

FOR PERFORMANCE
COLLABORATION
AND INQUIRIES

email@example.com

INSTAGRAM ↗
YOUTUBE ↗
```

Use:
- large Cormorant Garamond
- generous Ivory space
- precise small Sans metadata

The exact English/Korean copy will be refined later.

---

# 39. CONTACT FORM

Approved default:

## No contact form

Use direct contact channels.

Reasons:
- lower technical overhead
- no spam/backend burden
- more appropriate for an artist website
- cleaner visual identity

A form may be reconsidered only if real operational need appears later.

---

# 40. EMAIL ACTION

Approved:

## MAILTO + COPY EMAIL

Provide:
- direct email action
- copy-to-clipboard action

The user should not be forced to rely on a configured desktop mail client.

Copy feedback should be subtle and clear.

---

# 41. SOCIAL LINKS

Approved:

Use only real active official channels.

Primary:
- Instagram
- YouTube

Do not display inactive social icons for completeness.

Do not embed a live Instagram feed by default.

---

# 42. CONTACT MOTION

Approved:

## Almost Static

This is intentionally quieter than the rest of the site.

Allowed:
- restrained text reveal
- tiny hover response
- line/underline

Do not add another major Easter Egg or complex pointer interaction here.

---

# 43. CONTACT MOBILE

Approved:

## Large CONTACT Typography + Vertical Contact Actions

Requirements:
- large tap targets
- clear Copy Email
- social links stacked/readable
- minimal visual clutter

Do not shrink a desktop horizontal footer structure.

---

# 44. CONTACT KO / EN

Korean:
`/contact`

English:
`/en/contact`

The language switch should preserve the Contact route.

Contact address itself remains unchanged unless regional contact details are later added.

---

# 45. CONTACT ACCESSIBILITY

Requirements:
- semantic address/contact area
- mailto link
- copy button with accessible feedback
- visible focus
- social labels
- external-link indication where appropriate

---

# 46. CONTACT ACCEPTANCE CRITERIA

CONTACT is approved when:

- it feels calm and intentional
- contact details are immediately usable
- no form is required
- email can be copied easily
- only active official social channels are shown
- the page does not compete with the rest of the site for visual spectacle

---

# 47. GLOBAL LEGACY RULE

ABOUT, MEDIA, and CONTACT must not inherit old layouts merely because they exist.

Legacy may provide:
- biography data
- career data
- image sources
- YouTube IDs
- press URLs
- contact/social URLs

Presentation must be redesigned for V2.

---

# 48. GLOBAL ASSET RULE

Do not design around weak assets silently.

If a better:
- portrait
- video still
- poster frame
- press source
- social link
- biography source

would materially improve the result, request it proactively.

---

# 49. FINAL PRINCIPLES

## ABOUT
**Understand the artist.**

## MEDIA
**Watch and discover the artist's moving image archive.**

## CONTACT
**Reach the artist without friction.**

The three pages should remain quieter than HOME and major Work Detail experiences, while still feeling unmistakably part of the same V2 world.
