# P2D — Bold Cropped Hero Refinement & Device QA Bundle

2026-09-06 · **REVIEW READY / STOP**. P2C **B — Bold Cropped** is user-approved canonical visual direction.
This refinement's final visual approval, source/Retina approval and physical-phone QA remain separate.
P2B remains **QUALITY APPROVED FOR HERO INTEGRATION / FROZEN**. No next HOME task was started.

## 1. Final B refinements

Selected B alone is implemented in reusable `src/hero`, with an explicit continuation anchor. The development
Lab mounts it on KO/EN roots and retains neutral destination fixtures. A/C are preserved as immutable
[P2C comparison evidence](P2C-RESULT.md); there is no composition prop, query reader or user-facing chooser.
Earlier `?study=a/c` links show B. No actual production HOME/public route is connected.

One approved bundle: A source/type/crop/mobile → B motion/navigation/resilience → C device/Full/evidence/docs.
Rollback is the 250-file pre-P2D working snapshot under ignored `.checkpoints/p2d-before/`, based on
`d81bdbe0e18310abdd6c89f90682afde9716217d`. Preserve pre-existing P2C and earlier reports/evidence on rollback.

## 2. Typography tuning

Cormorant Garamond / P2A tokens preserved. CHO/YOUN/KYOUNG have separate tracking and row offsets. Desktop
name size follows both width and stable viewport height; visible glyph bounds are tested through scroll at
320/390/1920. The photograph begins at 26.5%, with exactly aligned Ink back / Ivory front type clipping.
CHO and KYOUNG keep deliberate left-edge cuts. One semantic h1 and hidden decorative duplicates preserve identity.

## 3. Portrait / crop tuning and additional source audit

The confirmed **attachment 3→7** pair remains. Desktop initial crop holds the large shoulder/profile and crown
at the frame edge; the instrument crop preserves the Haegeum axis. Wide and mobile have separate positioning.
Four unchanged WebPs moved from `labs/hero/assets` to `src/hero/assets`; full pair 577,116 B, small pair 240,864 B.
No source enlargement, retouch, mirror, synthetic pose, silhouette mask or original overwrite.

The user-supplied `/Users/joon/Downloads/gpt 보정` contains **42 second-pass retouched PNGs**. All were read and
visually audited using normal Finder working copies after direct reads stalled. Every image is 1023×1537 or
1024×1536, approximately 1.57MP. **No higher-resolution replacement was found.** (23)/(24) are useful Haegeum
back-view alternatives; (47) is a strong shoulder close-up facing the opposite direction. None improves the
selected pair's resolution or warrants replacing the approved composition. (18)/(20) are other-scene references
only. [Inventory/contact sheet](evidence/p2d/README.md) and [source audit](docs/redesign/review/HOME-HERO-ASSET-READINESS.md).
Larger, least-cropped originals of previous attachments 3 and 7 remain requested for final Retina sign-off.

## 4. Scroll continuity and two-line motif

Native scroll with 90ms settling follows actual scene/stage geometry using stable viewport units. Fast jumps
cross a fully closed photographic aperture frame before the next pose reopens. Reverse input immediately changes
the target and restores photo 3; there is no forced scroll, snap, timed dwell or opaque pose crossfade.
The photo/type clipping shares a 55/45 aperture axis. Type/photo/two hairlines have distinct depth rates.
Desktop lines span a more intentional 10%–94% at about −10°; mobile places them lower at about −14°.
Line spacing tightens slightly at closure. This two-photo handover is not the full Hero→Haegeum transition.

Late secondary download cannot swap a stationary portrait: exchange arms after returning to the initial portion.
Failed secondary stays on 3. Failed primary leaves readable Ink identity and menu. RAF settles to zero at rest,
is cancelled while hidden and cleaned on route changes; no permanent ticker or motion dependency.

## 5. Navigation integration

P2B source is byte-identical to the approved snapshot. Its Bold Letter Slip X+3 / Y±7, 300ms / 20ms stagger,
500ms MENU-origin diagonal Ivory reveal, 400ms reverse close, mask trigger, index emphasis and no selected
underline are preserved. Hero-local transparent surface and Ink MENU balance the photograph. No extra vertical
navigation, hover-open, header morph or runtime motion-mode choice. Existing KO/EN counterpart behavior remains.
The Lab EN-root normalization mismatch was fixed; production routing/content helpers were unchanged.

## 6. Mobile composition

Independent 390px composition: photo field 14%–100% wide / 15%–88% high, type 31/30/24vw with separate positions,
lower two-line crossing, quiet labels and 44px navigation targets. 320px retains the name and instrument without
horizontal page overflow. No pointer depth on touch. At 200% text with a wrapped header, reading order replaces
the fixed poster. Six tested sizes: 320×568, 390×844, 768×1024, 1024×768, 1440×1000, 1920×1080.

## 7. Safari / device QA

**Actual Mac Safari 26.6.2 / macOS 26.6.2:** initial poster, menu, first-scroll photo 7, reverse photo 3, keyboard
skip/MENU focus outline, Return open, Option+Tab to HOME, Esc and post-close MENU focus restoration observed via
native UI. Native screenshots are embedded in the task. [Detailed device record](evidence/p2d/safari-device-qa.md).

**Automated:** Chromium and WebKit 26.6 run the same 22 Hero cases; mobile/DPR2 screenshots are emulation.
Mac WebKit uses Option+Tab for link traversal, preserving all focus assertions, following
[Apple's documented preference behavior](https://developer.apple.com/documentation/webkit/wkpreferences/tabfocuseslinks).
No system preference was changed. Physical iPhone/iPad/Android, touch hardware, mobile Safari address-bar gestures,
VoiceOver, older Safari and prolonged thermal/GPU behavior were not verified. Desktop Safari is not phone QA.

## 8. Reduced motion

Complete static photo-3 poster, without sticky extension, pointer depth or source exchange. Preference changes
apply live. Navigation retains immediate reduced-motion states. Font/image failure and text reflow remain readable.
The immediate first frame is preserved; the broader HOME short masked entrance remains an unresolved later
integration detail, not claimed complete by this refinement.

## 9. Visual evidence / preview

[Evidence index](evidence/p2d/README.md): desktop/wide/DPR2, 390/320, tablet, pointer, aperture, first scroll,
menu, 200% text, reduced and WebKit captures; a **16.2-second normal-speed 1440×1000 / 25fps video**; all 42 source
candidates and provenance. Local preview: `http://127.0.0.1:4177/` or `/en/`.
P2C comparison evidence and frozen P2B/P2A files remain unchanged.

## 10. Tests / build / scope

**Full PASS:** type-check, zero-warning lint, 38 Node locale/content/navigation/placement/artifact contracts,
both root/project builds with 18 prerendered routes each, 84 route/browser cases, 11 foundation, 26 frozen
navigation and **44 Hero** cases (22 Chromium + 22 WebKit). [Log](evidence/p2d/full-gate.txt),
[Hero results](evidence/p2d/hero-test-results.json). Actionlint PASS; separate Hero build rejected by its explicit guard.

Hero coverage preserves B's six widths, glyph separation, independent depth, forward/reverse exchange, reduced
motion, keyboard/trap/Esc/restore, 200% text, locale, primary/secondary/font failure, late download, rapid jumps,
viewport changes, idle RAF and no variant chooser. Duplicate A/C assertions retired with explicit selection,
not to conceal failures. An initial EN-root failure exposed the normalization mismatch and was fixed. A reverse
closed-frame assertion was corrected to accept the exchange occurring on the fully closed frame itself; it still
requires zero aperture. Mac WebKit traversal was aligned with the native modifier; no assertion was skipped.

Production raw-client/static Hero and private-draft exclusion PASS; 284 public manifest files per target,
root JS/CSS 324,591 / 170,068 B and project JS/CSS 326,277 / 174,875 B: **zero payload delta** from P2C.
Local unthrottled Chromium diagnostic: idle RAF 0, 241 frame samples, p95 approximately 16.8ms, interaction long
tasks 0. This is development diagnosis, not production CWV or real-device performance approval.

Files: `src/hero/{BoldHero.tsx,useHeroMotion.ts,motion.ts,hero.css,assets/*}`; `labs/hero` simplified; previous Lab
motion hook retired; Hero test/config, artifact exclusions, Full CI WebKit install, current HOME/HANDOFF/AGENTS/
README/plan/protocol/guide/source-audit docs, this report and `evidence/p2d`. Dependency manifests/lockfile are
unchanged relative to the pre-P2D snapshot. [Verification manifest](evidence/p2d/hero-refinement.json) owns hashes,
precise P2D file changes, preserved baseline, document links and checklist integrity.

## 11. Remaining concerns

- Larger originals of the selected 3/7 pair are needed before final wide/Retina detail approval; no artificial upscale.
- Physical-phone/mobile Safari, VoiceOver/assistive technology, prolonged device performance and older Safari QA.
- User visual review of this precise type/crop/line/scroll tuning; final HOME entrance/scene composition remains open.
- P2C/P2D remain an uncommitted local review diff. No commit, push, remote CI run or deployment performed in P2D.

## 12. Recommended freeze / delivery status

**Keep B's canonical direction frozen; mark this refinement REVIEW READY / LOCALLY VERIFIED, not final
production QUALITY APPROVED.** Request the larger selected originals and complete physical-phone/source QA
before final-quality freeze. A separately approved final source/device QA and delivery bundle is the next
recommendation. No full Hero→Haegeum or other HOME scene begins automatically.

**REPORT → STOP → USER APPROVAL.**
