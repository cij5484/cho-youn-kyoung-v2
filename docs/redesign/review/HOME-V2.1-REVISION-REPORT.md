# HOME V2.1 — Art Direction Revision Report

2026-09-05 · **Documentation revision complete / STOP.**
Baseline: `cb7605f` (P0D PR #1 merged). Only the current user's document revision was executed.
No HOME visual implementation or quality gate has been completed by this revision.

## 1. What was updated

Raised the HOME quality goal to a digital artwork in its own right, with a strong impression in approximately
the first five seconds. Quality comes from typography, photography, crop, composition, depth, whitespace,
interaction timing, transition continuity and physical response. More effects are not the acceptance criterion.
The visual direction remains Contemporary Editorial / Ivory — Static Color, Dynamic Composition.

The existing HOME specification is expanded and reconciled in place, not replaced by a shorter brief.
Its scene details, seven boundaries, keyboard/drag alternatives, reduced motion, source-truth audio,
asset requirements, 3D/Tray/Continuity gates, Sou.P discovery behavior and STOP rules remain.

## 2. Files changed

All paths are relative to `C:/choyounkyoung-v2/`.

| File | Revision / ownership |
|---|---|
| docs/redesign/00-MASTER-PLAN.md | 1.9; goal, reference rationale, canonical HOME summary |
| docs/redesign/02-DESIGN-SYSTEM.md | 1.3; poster scale/crop/depth, two lines, editorial surface, gate |
| docs/redesign/03-MOTION-SYSTEM.md | 1.6; intensity, continuous transition, two-line behavior, static idle |
| docs/redesign/04-HOME.md | 2.1; canonical narrative, all scene updates, quality gate and rationale |
| docs/redesign/11-RESPONSIVE.md | 1.2; independent mobile poster, gestures, crop/depth and budget interpretation |
| docs/redesign/12-PERFORMANCE.md | 1.2; first viewport loading, live object count, idle/offscreen and scroll cost |
| CODEX-HANDOFF.md | 1.2; expanded HOME checklist and document-only STOP state |
| docs/redesign/review/V2-IMPLEMENTATION-PLAN.md | 1.4; HOME design/motion/mobile/asset/QA planning only |
| docs/redesign/review/HANDOFF-AUDIT.md | 1.4; matching HOME checklist wording and scoped audit addendum |
| docs/redesign/review/PLANNING-REVISION-LOG.md | 1.4; old→new changes, retained history and approval boundary |
| docs/redesign/review/HOME-V2.1-REVISION-REPORT.md | New; this reviewable result |

## 3. HOME V2.1 canonical summary

**ARTIST → INSTRUMENT → SOUND → WORK → OBJECT → STAGE → ARTIST → NAME**

| Scene | Intensity | Approximate experience | V2.1 role |
|---|---|---|---|
| 01 HERO | 5/5 | 100–120vh | Moving Editorial Poster; first visual peak |
| 02 HAEGEUM | 4.5/5 | 120–160vh | Hero elements continuously become instrument composition |
| 03 SOUND | 3/5 | 70–90vh | Static pause; explicit LISTEN, 10–20-second fragment |
| 04 SELECTED WORKS | 4/5 | 100–130vh | 4–5 works on a long asymmetric editorial surface |
| 05 ALBUM OBJECT | 5/5 | 110–140vh | Second major peak; physical collectible/exhibition objects |
| 06 PERFORMANCE | 2.5/5 | 80–100vh | First major Dark Stage change, with less movement |
| 07 ABOUT | 2/5 | 80–100vh | Ivory; first clear face, 2–3 sentences, no full CV |
| 08 OUTRO | 3/5 | 80–100vh | Name/two-line resolution; one primary CTA and Sou.P |

**STRONG → STRONG → QUIET → ACTIVE → PEAK → QUIET → QUIET → RESOLVE.**
These ranges are prototype experience budgets, not fixed CSS heights, mandatory dwell times or pin spacers.
Exact values remain subject to real typography/crop/device and reduced-motion review.

## 4. Previous HOME spec → V2.1 changes

| Previous wording/direction | V2.1 revision / retained requirement |
|---|---|
| Premium authored artist HOME | Digital artwork; first viewport must stand alone as an art poster |
| Large three-line name and asymmetric portrait | Name is graphic structure at roughly 55–65% viewport height; no generic title + photo completion |
| Portrait right visual region 55–65% | Refined to 58–62%; overflow crop permitted, based on real optical layout |
| Side/back portrait treated as approved source | Purple hanbok side/back family is the approved candidate direction; exact file/crop/quality still unverified |
| 1–2 depth crossings | Preserved and made a dominant, precisely authored part of the poster |
| One connecting Haegeum line | Two-line structural motif; one strand may still lead guides/Works axis |
| RESONATOR third stage | RESONANCE narrative label, with resonator/body/surface imagery retained |
| Haegeum 4/5; Performance 2/5 | 4.5/5 and 2.5/5, while Performance remains a quiet pause |
| Hero continuity guidance without travel budget | Explicit element mapping and preferred overlapping 1.2–1.6 viewport travel |
| Asymmetric drag rail | Long editorial surface; optional desktop wheel, mobile vertical-first, no equal cards/repeated hover |
| Three-album collection; one-object fallback | Three albums remain selectable; one high-quality live object becomes preferred when three impair quality |
| Clear front-facing About | First clear front-facing or clear 3/4 reveal in Ivory; short introduction retained |
| Name and final hairline | Initial oversized name/two-line identity returns resolved; one primary CTA retained |
| Functional/Quality distinction emphasized for 3D | Extended to Hero and major HOME scenes, with explicit mobile visual review |

## 5. Hero quality gate

The first viewport must work alone as an art poster. Review all twelve criteria in HOME §24:
intentional typography hierarchy; authored crop; precise overlap; no generic portfolio template;
no SaaS-style cards; no repeated fade-up; no excessive rounded UI; no unnecessary visual effect;
no animation for animation's sake; responsive and interruptible motion; and equivalent mobile
art-direction attention, together with the standalone-poster criterion.

Later evidence must include desktop/mobile first-frame screenshots, the first approximately five seconds,
forward/reverse/interrupted Hero→Haegeum travel, reduced-motion/static composition, actual source/crop
and font/viewport identity. Functional Complete and Quality Approved are recorded separately, with explicit
user review. This task defines the gate; it does not claim to have passed it.

## 6. Hero → Haegeum transition contract

Typography changes spacing/depth/position; portrait changes crop/depth; two lines become structural
guides; Haegeum imagery progressively dominates. Stages remain HEAD/PEG → STRINGS/BOW → RESONANCE →
FULL HAEGEUM, with only the current minimal keyword visible.

Default behavior must feel like one changing scene, not Hero fading out and another section fading in.
Use native continuous scroll, no snap, no long forced pin; reverse and interruption retain the current
state. The 1.2–1.6 viewport transition overlaps Scene 02's 120–160vh budget rather than adding a second
cinematic length. This budget interpretation avoids an accidental doubled sequence and remains tunable
at the later prototype task. Reduced-motion crop/fade/static alternatives remain explicitly valid.

## 7. Mobile-specific changes

Retain CHO / YOUN / KYOUNG with independently recomposed type, more aggressive authored crop,
touch-safe editorial nav, lighter scroll depth, no pointer-only dependency and fewer costly layers.
Do not shrink desktop crossings or apply its percentages as fixed mobile geometry. Request a separate
crop/source when necessary. Vertical page scroll > tap > intentional horizontal gesture > free 3D
manipulation. The mobile first viewport receives the same visual-review attention as desktop.

## 8. Any conflicts discovered

Resolved within the user's revision; no new implementation authorization was needed:

- One-line wording versus two-line motif: the pair is canonical, with a leading strand preserving prior guide/axis roles.
- Prior portrait percentage versus new percentage: 58–62% is the portrait visual zone; 55–65% now refers to name height, not another portrait rule.
- RESONATOR versus RESONANCE: narrative name updated; the physical resonator subject remains.
- Three live objects versus quality priority: album count and live-render count are separate; one-object switching is preferred when needed.
- Motion's strong Performance teaser category versus quiet Scene 06: the HOME teaser is now explicitly the quiet post-peak contrast zone.
- Generic active parallax/auto-rotation guidance versus subtle Hero/static album idle: HOME-specific limits take priority; line parallax translation is not audio vibration amplitude.
- No crossfade versus reduced motion: continuous transformation is the default; the existing accessible static/crop/fade fallback is retained.
- Transition and Scene 02 ranges: recorded as overlapping prototype budgets, not cumulative pin lengths.

No routing/locale/SEO architecture conflict was introduced. Reference principles came from the user's
text; no new external reference review or attribution to unseen site behavior is claimed.

## 9. Any asset needs discovered

These are requirements identified from the revised composition, not findings that existing files failed inspection.
No image was opened, edited, generated, moved or migrated in this documentation task.

| Asset / requirement | Status and blocking point |
|---|---|
| Purple hanbok side/back/partial-face original | Exact candidate file, final-scale resolution and mask edges need review; required before final Hero crop/mask quality approval |
| Mobile portrait source or crop | Separate framing may be necessary; request a suitable original if desktop material cannot support the poster; blocks mobile Hero approval when inadequate |
| Instrument-revealing 3/4 back portrait | Preserve the Hero-to-instrument bridge without an early clear-face reveal; confirm source compatibility at composition review |
| Clear front/3/4 portrait for Scene 07 | Distinct identity payoff; source/crop review before About scene visual approval |
| Haegeum macro/full imagery | Existing beige full-instrument planning baseline retained; head/peg, strings/bow, resonator detail sharpness still unverified at target scale |
| Representative audio | Exact track/timecode, playable source and 10–20-second selection remain required before listening implementation approval |
| Selected works / albums / performance | Strong 4–5 work images, three albums' approved package artwork/dimensions and one cinematic stage image remain existing later gates |

Documents can proceed with these candidate roles. Final visual work must request missing/weak sources
with an exact need and blocking point rather than quietly compromise. No asset upload is required to finish this revision.

## 10. Documents intentionally not changed

- ROUTING-ARCHITECTURE-DECISION.md and LOCALE-METADATA-CONTRACT.md; their approved decisions remain intact.
- Implementation Task Protocol; its existing one-task/test/report/STOP/approval rule remains binding.
- P0A/B/C/D results, deployment/verification checklists, prior evidence and README; historical delivery/verification records were not relabeled.
- Other page specs (Works, Albums, Album Detail, Performances, Performance Detail, ABOUT/MEDIA/CONTACT), Current Site Audit, Accessibility and Migration QA: their functional contracts remain valid; this revision is HOME-specific.
- MASTER routing/base/locale sections and Implementation Plan routing/locale sections were preserved, despite HOME edits elsewhere in the same files.
- All application code, CSS, assets, dependencies/lockfile, workflow and configuration.

Only document consistency checks are appropriate here: retained sections/checklist items, changed-path scope,
local Markdown links, old/new HOME wording and protected routing/locale sections. No npm install, build,
lint, browser/product tests, visual prototype, image inspection, deployment or PR/merge was performed.

Completed document checks: 11 Markdown files changed, no broken local links, no code/asset changes,
24 protected sections unchanged (including routing/locale, color/font, audio, Sou.P and 3D continuity),
207 HANDOFF items with completion marks unchanged, 17 numbered plan sections retained, and all 25 original
HOME sections retained plus new §26 rationale. Git whitespace check passed. These results prove document
scope/consistency only, not visual quality or runtime behavior.

## 11. Recommended next bounded task

After the user reviews this document revision, **P0E — connect locale checks to the existing delivery
workflow and review that workflow's reproducibility** remains the next foundation unit. It requires explicit
approval and must not include HOME design/code, asset migration, 3D/motion or P0F. HOME asset/crop suitability
is a separately bounded future review before visual composition approval, not automatic work now.

**STOP. P0E has not started. Wait for explicit user approval.**
