# MEDIA full-page prototype — 2026-09-12

Current revision: user authorized this completed MEDIA screen for PR/main/Pages delivery, together with CONTACT.
The DEV + localhost restriction on the page import/route is removed; development comparison tools remain excluded.
The implementation and its assets are unchanged. Local-only statements and build exclusion checks below are historical.

Status: IMPLEMENTED LOCAL ONLY; main c603782 baseline. No PR, push, merge, deploy, or Quality Approval.
Preview: http://127.0.0.1:4180/media/ (`npm.cmd run dev:interaction`).

## Revision — merged Films and Special Archive

User revision merges sections 01 and 02 into one selectable Films stage using the same Unwoven ribbon mechanics. The three performance videos share one canvas; `자유를 잃은 새` moves to its own Special Archive. Superseded Selected grid selectors are removed.

Added [뉴스컬처, 2026-09-07](https://www.nc.press/news/articleView.html?idxno=625856), [K스피릿, 2026-09-06](https://www.ikoreanspirit.com/news/articleView.html?idxno=87134), and [문화포털 공연 안내](https://www.culture.go.kr/localperform/amateur/perform/view.do?menuNo=400015&pblprfrSn=3239). News dates use each page's `article:published_time`. Culture Portal has no publication date: store only the confirmed year 2026 and label 공연 안내, not 기사 읽기.

Revision checks: type-check, changed-scope lint, three media tests and actual development-preview build pass. Local browser checks selected 4:3 aspect restoration and rapid 03→01 selection cancellation. Previous YouTube playback limitation remains unchanged.

## Scope and references

- [Unwoven](https://tympanus.net/Development/Unwoven/) / [actual geometry and shader source](https://github.com/clementgrellier/unwoven/blob/main/index.html): independent horizontal strips with shared image UVs, segmented ribbon deformation, per-thread escape, rim thinning and paper bleaching. MEDIA uses one actual film still, 26 strips, 24 segments, finite reversible scroll unravel/re-form. No infinite carousel, generated fallback image, or automatic drift.
- [GridToFullPreview](https://tympanus.net/Tutorials/GridToFullPreview/) / [actual timeline](https://github.com/gwen-bo/codrops-grid-to-preview/blob/main/src/js/product-preview.js): background-colored crossed seams close over the same image during focus expansion. The reference is not a FLIP implementation. MEDIA combines this seam mechanic with measured origin-to-focus frame geometry; native dialog preserves focus/Escape semantics.
- V2 ivory tokens, native scrolling, existing Three.js and GSAP; no dependencies added.

## Actual assets and extension

Source: operating legacy `src/data/media.ts` and `src/data/press.ts`, read-only. Titles/years checked against YouTube oEmbed where supplied; all four remote thumbnails returned HTTP 200 with CORS support. No media masters or downloaded thumbnails added to the repository.

| Film | YouTube ID | Poster | Placement |
|---|---|---|---|
| 한범수류 해금산조 (2020) | utanK8NrLxA | 1280×720 | Films, initial selection |
| 조윤경 제6회 해금 독주회 (2020) | bxdfMQT4Bi4 | 480×360 | Films, 4:3 |
| 강태홍류 산조중주 | fIw-DL7Fisg | 1280×720 | Films, 360° film; year omitted |
| 자유를 잃은 새 (2005) | ubp2ClVdMYI | 1280×720 | Special Archive |

`src/media/media-records.json` owns four videos and twelve press entries. Non-archive videos populate the unified Films selector; archive records appear only in Special Archive. The sixth recital retains its verified low-resolution 4:3 thumbnail when selected. Press stays text-only, latest first. This pass does not certify every old external article's current availability.

## Runtime contract

`InteractionLab` lazy-loads MEDIA only for DEV + localhost `/media/`. Published development-preview builds exclude the import and all MEDIA prototype data. No developer comparison UI is added. Other routes and their runtime owners remain unchanged.

`MediaPrototype` renders data; `mountMediaLoom` owns its one canvas and directly sampled ribbon state; the page owns one film-selection ScrollTrigger. The complete actual image remains the fallback until a successful texture draw. Rendering is on-demand with DPR capped at 1.5; geometry/texture/renderer, observers and scroll trigger are disposed on unmount. Reduced motion has a static image and ordinary short page flow; WebGL/texture failure keeps the same still and usable film action.

The Films selector changes the one ribbon frame: the current image unravels, the next texture replaces it at peak tear, and the same ribbons reform. Section scroll position continuously controls ribbon tear, adjacent-image blending and frame aspect through 01→02→03. There is no timed selection tween: stopping scroll freezes the exact composition, and reversing retraces it. Selector buttons scroll to the full-image checkpoints. The three section posters are retained as GPU textures and disposed on unmount. Reduced-motion and failed-texture paths update the real static poster. Clicking 영상 보기 opens that current film in a native dialog. Only explicit 재생 mounts a single youtube-nocookie iframe. That action pauses native page audio; native audio resuming removes the iframe. Close/Escape immediately removes the iframe, returns the image toward its source, restores scrolling and trigger focus. Route unmount cleans up the dialog and animation. The external YouTube link remains available if embedding cannot load. No auto-resume of background audio.

## Lean validation

- `npm.cmd run type-check`: pass.
- Changed-scope ESLint: pass.
- `node --test tests/media-loom.test.ts tests/media-records.test.ts`: 3 pass. Complete UV endpoints, reversible finite deformation, mobile/desktop frame bounds, unique actual video IDs and ordered HTTPS press records.
- `npm.cmd run build:development-preview`: pass; existing Three.js chunk-size warning. MEDIA is deliberately absent from this published-mode output.
- Local browser: 1498×966 and 402×966; canvas ready/unwoven state, real posters, mobile Selected/Press layout, zero iframe before Play, one after explicit Play, Escape cleanup to zero iframe, scrolling/focus restored. No fatal application errors observed. Browser emulation is not physical-device or visual approval.
- Embedded YouTube remained blank in the in-app browser despite a correct iframe URL and HTTP 200 endpoint. Actual video playback is not claimed verified. The direct YouTube action remains visible; the app's focus/open/close behavior is verified independently.
- Menu navigation out to ABOUT removed the MEDIA canvas/dialog and restored body overflow; browser Back remounted MEDIA. The final local MEDIA tab remains open with temporary viewport overrides reset.

Rollback: remove `src/media/`, its two tests and the MEDIA-only lazy route insertion; revert this pass's two canonical status additions. No shared HOME/Audio/Album/WORKS/Performance changes to unwind.


Scroll-scrub revision: type-check, changed lint, four media tests and preview build pass. Local browser held --loom-progress at 0.6364840150208444 across an idle interval; upward scroll changed it to 0.18121032076736043. No fatal runtime errors. This supersedes the earlier threshold-triggered transition.
