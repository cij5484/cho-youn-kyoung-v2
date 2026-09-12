# Phase 4 — V1 content restoration

2026-09-12 · base `b403531`. User approved PR/merge/Preview delivery on 2026-09-13. Content integration, not visual redesign or release approval.

## Source and method

- Official V1: https://choyounkyoung.com/
- Official repository snapshot: `cij5484/cho-youn-kyoung` at `3df80573060037f3e1114d7e12fd0f533fe3b528`.
- Source files: `src/data/performances.ts`, `src/data/albums.ts`.
- Restored performance text also matched the live V1 bundle `assets/index-DJSXDcMd.js`.
- Exact program identity matched across all ten works. Full notes combine original composerNote/workNote paragraphs; existing short scene text remains unchanged.

## Restored

- 풀고, 엮다: 관악영산회상 five paragraphs and 해금 상령산풀이 four paragraphs in the existing text reader. Short notes remain in data; the reader chooses fullNote instead of repeating the summary.
- 산조길, 둘: original traditional repertoire introduction and 한범수 introduction, including 1911–1984.
- 해금, 시대를 잇다: six composer introductions and original year strings; seven original paragraphs introducing creative Korean music and this recital. Existing Time Path composer names open the corresponding reader section; year/title navigation and choreography remain unchanged.
- Three performance archives: original poster and leaflet PDF links, six total. Existing image viewer, zoom and page navigation retained.
- Official venue links: 해운대문화회관 and 향사아트센터, exactly as recorded by V1.
- 영산회상 / 평조회상 albums: performer credits 해금 조윤경 and 장구 이영섭, two missing pairs only.

## Already present — retained

- All eight 산조길 / 시대를 잇다 full work notes match V1 exactly; no second fullNote copy added.
- Existing artist notes, cast biographies, dates, instrumentation, program order and current short summaries retained.
- Four albums: 29 tracks, 40 booklet pages and production/photo/design credits already represented. Image-only booklet notes remain available in the existing reader; V1 has no populated long-text detailedDescription for these four records.

## Not imported / source limits

- V1 coming-soon labels do not override newer V2 catalog decisions. Repeated bilingual credit labels, decorative copy, V1 layout and listening controls were not reintroduced.
- V1 has no official venue URL for 풀고, 엮다. No inferred 국립부산국악원 URL added.
- V1 상령산풀이 historical note mentions 평조회상 and 김계선/정재국, while its artist note describes this performance’s 관악영산회상-based treatment. Both original contexts remain; no invented reconciliation or independent musicological verification is claimed. Current explicit restoration request supersedes the earlier omission of the historical paragraph.
- No new album essay is inferred from image-only booklet content, and no duplicate Sanjo lead/introduction is added.

## Link verification

GET Range bytes 0–1023 on 2026-09-12: all six returned HTTP 206, application/pdf, and `%PDF-` magic; not HTML placeholders.

| Performance | Poster | Leaflet |
|---|---|---|
| 풀고, 엮다 | [PDF](https://choyounkyoung.com/assets/performances/haegeum-jeongak-2026-09-22/downloads/poster.pdf) | [PDF](https://choyounkyoung.com/assets/performances/haegeum-jeongak-2026-09-22/downloads/leaflet.pdf) |
| 산조길, 둘 | [PDF](https://choyounkyoung.com/assets/performances/sanjo-gil-2026-08-16/downloads/poster.pdf) | [PDF](https://choyounkyoung.com/assets/performances/sanjo-gil-2026-08-16/downloads/leaflet.pdf) |
| 해금, 시대를 잇다 | [PDF](https://choyounkyoung.com/assets/performances/haegeum-2026-08-02/downloads/poster.pdf) | [PDF](https://choyounkyoung.com/assets/performances/haegeum-2026-08-02/downloads/leaflet.pdf) |

[해운대문화회관](https://www.haeundae.go.kr/culture/index.do) and [향사아트센터](https://www.chilgokctf.or.kr/ctf/main.do): HTTP 200. Cross-origin PDFs may open the native PDF viewer; its download control remains available. This checks actual PDF response, not a full visual review of every PDF page.

## Checks / boundary

- Type-check and changed TypeScript/TSX lint passed.
- Five targeted performance model/contract tests passed; source parity checked for ten notes, eight introductions, seven lifespan strings, recital introduction and exact source URLs.
- Actual development-preview build passed, including the unchanged pinned Classic build. Initial Mac setup lacked the separate Classic checkout/cache; a local ignored checkout at the already-required `239d180` prepared it without modifying the operating V1 repository or build policy.
- Browser sanity: desktop full-note reader, 390px PDF links and existing image viewer, Time Path composer-to-reading alignment (24px inset), no reader horizontal overflow, Escape/focus restoration passed. No new browser errors after the dependency-cache/server restart. This is browser viewport testing, not physical-phone QA.
- No Full Gate, physical-device QA, commit, push, PR or deployment. SEO, canonical, sitemap, noindex and Phase 2 optimization code untouched.
- Local audit snapshots/endpoint receipts/build logs remain in ignored `.checkpoints/phase4-content/`.
