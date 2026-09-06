# P2F — Hero → Haegeum Refinement, Quality Gate & Device QA Bundle

2026-09-06 · **IMPLEMENTED / LOCALLY VERIFIED / REVIEW READY / STOP**.
P2E direction remains user-approved and canonical. P2F visual approval is pending. Unqualified **QUALITY APPROVED /
FROZEN is not assigned**, because native Safari motion settlement has not been verified.
[Guide](docs/redesign/review/HOME-HAEGEUM-TRANSITION-PROTOTYPE.md), [evidence](evidence/p2f/README.md),
[verification manifest](evidence/p2f/verification.json).

## 1. P2E delivery / commit / CI

The 72 reviewed P2E change hashes and 40 evidence hashes matched the approved result. A 340-file snapshot was
preserved before approval-state edits. No unrelated working change or scope problem was found.
Feature/evidence: `0873b75` — `feat: deliver approved Hero to Haegeum visual direction` (72 files).
CI wiring: `c73a3becac3702845d8c410e7ced94789d41ee62` — `ci: include Haegeum Lab regression in Full gate` (1 file).
Both pushed to main; [Fast CI 34029859649](https://github.com/cij5484/cho-youn-kyoung-v2/actions/runs/34029859649)
SUCCESS at the exact final SHA. Local Fast passed; existing reviewed Full (38 Node +191 browser) was hash verified,
not falsely reported as rerun for delivery. Clean main/origin was checked before starting P2F.
[Delivery receipt and exact committed file list](evidence/p2f/delivery-p2e.json). No deployment.

## 2. Timing refinements

The same **155svh native travel**, including Hero exit and the 3→7 closed-aperture exchange, remains.
Head arrival extends to .40; bow opens through .575; the playing photograph continues focal/scale movement into
resonance rather than freezing at a frame. Final resolution starts .795: outgoing crop contracts by .895,
incoming mask finishes .955, pullback settles .975. Type entry/exit has its own short masks and differing vertical
rates. These are normalized scroll positions, not autoplay seconds. No added pin, forced dwell or scroll handler.

## 3. Continuity refinements

The same stage, portrait plane and line pair persist. Artist rows retain their different exit rates; the portrait
narrows as the head becomes the focus. Desktop head crop moves down 7% of stage height to clear the MENU paper.
Head/bow overlap and the shared playing photograph preserve spatial continuity. Reverse and large jumps resolve
from current progress without a scene reset. The initial 1440×1000 poster still differs from approved P2D by **0 pixels**
(excluding the rightmost 16px scrollbar strip). Frozen navigation and Hero CSS/assets are unchanged.

## 4. Full Haegeum climax

The old sideways exchange of photographic panels is replaced by a **resonator-anchored pullback**. The outgoing
real resonator crop contracts around the same visual anchor from which the full frame opens upward/outward.
The full source pulls back **2.7×→1× desktop / 2.1×→1× mobile**, then settles after its mask. HAEGEUM descends
into the space above the body. A complete instrument resolves the preceding detail scale and tension.
Real purple photography → beige AI imagery remains a disclosed provisional material difference, not a claim that
these sources depict identical physical geometry.

## 5. Two-line refinement

One existing pair bridges Hero → peg/string axis → bow direction → resonator → full string axis.
The last alignment uses normalized source landmarks and the currently revealed image boundary, preventing a
long stray guide above the opening. No new line system, fake vibration or simulated sound. Final type/body/line
positions remain reversible and share the same current progress.

## 6. Desktop QA

Chromium and WebKit cover 1440×1000, 1920×1080, 1366×768 standard laptop, plus 1024×768 and 768×1024.
Checked all stages, current-word fit, photo/type balance, initial preservation, header coexistence, no horizontal
overflow, reverse exact settled state, rapid full/back input, closed photographic exchange, MENU interruption,
scroll lock/unlock and keyboard focus restoration. Desktop photo/type/line masks share their framing.
Local Chromium performance: 313 frames, median 16.7ms, p95 16.7ms / max 16.8ms, 0 interaction long tasks, 0 idle RAF.
Unthrottled local diagnostic, not production CWV or sustained physical-device performance approval.

## 7. Mobile QA

390px retains independent focal targets, crop rectangles, line coordinates and upper typography; 320px is
separately checked. Full pullback is lighter (2.1×) and final image fits above the **actual bottom index with
16px clearance**, capped at 71% of stage height. A regression checks >8px clearance in both engines after layout
rounding. No wheel interception, horizontal input requirement or blocked vertical scroll. 200% text switches
into readable document order. Screenshots/video use mobile viewport and touch-capability emulation, not a phone.

## 8. Safari QA

Actual installed Mac Safari **26.6.2** on macOS **26.6.2** loaded P2F in a fresh tab and separate native window;
initial poster, semantic hierarchy and source disclosure were observed. Native CUA pointer/scroll repeatedly
returned `noWindowsAvailable`; keyboard changed scroll/dialog state, but completed motion/menu/restore settlement
could not be reliably established. The cause is unconfirmed. **Native Safari motion/focus/reduced QA remains OPEN**;
it is not reported as passed or as a confirmed code defect. No OS/browser preference was changed.
[Detailed native coverage and closeout steps](evidence/p2f/safari-device-qa.md). Automated WebKit is separate evidence.
No actual iPhone/Android/VoiceOver/thermal walkthrough was performed.

## 9. Provisional asset status

No master or runtime image pixels changed. Full Haegeum: user-confirmed AI, visibly **PROVISIONAL EDITORIAL**;
head/peg, strings/bow and resonator: authentic supplied photo crops with provisional detail resolution.
Hero 3/7 final Retina source remains pending. All are non-blocking for this refinement and its review/freeze decision.

`src/haegeum/assets.ts` now owns full reference/dimensions/alt/provenance and body/string landmarks. Replacement
uses source aspect ratio; component and timeline need no rewrite. The regression replaces only configuration
with a neutral 1200×2400 fixture, verifying aspect, updated alt and removed AI disclosure. This is test evidence,
not a fabricated documentary photograph. Disclosure starts with the first visible AI aperture, before FULL text.
[Capture/orientation/minimum-resolution requirements](docs/redesign/review/HOME-HAEGEUM-TRANSITION-PROTOTYPE.md#p2f-asset-lifecycle-and-replacement-contract)
include a preferred real full source around 3600×5400 for the enlarged opening, real contact/body macros and crop room.

## 10. Reduced-motion result

Chromium/WebKit preference and live preference changes preserve **ARTIST → LINE → TENSION → RESONANCE → HAEGEUM**
in semantic document order, with static crops and explicit source alt/disclosure. No sticky sequence or parallax.
Failed/late continuation imagery uses the same accessible fallback. Native Safari OS-preference behavior remains
unverified; this distinction does not disappear because engine tests pass.

## 11. Tests

Final Full gate: **PASS — 38 Node +197 browser**: 84 routing +11 foundation +26 frozen navigation +44 Hero +32
Haegeum (16 Chromium /16 WebKit). Type-check, lint, schema/locale/private-draft exclusion, both static builds,
route/prerender regression and public Lab/asset exclusion pass. Actionlint and Lab build rejection checked separately.
No dependencies/package-lock changes. Root/project payloads remain unchanged; no public HOME or content registration.

New coverage: laptop viewport, menu interruption at full pullback, source-only replacement/provenance and mobile
image/index clearance. During iteration, a CSSOM serialization assertion was changed to measure <.01px aspect
error rather than an overprecise ratio. The new clearance test then exposed insufficient mobile spacing; the
renderer now fits against the actual index position. Final assertions pass without retries or skipped cases.
[Full log](evidence/p2f/full-gate.txt), [Haegeum results](evidence/p2f/haegeum-test-results.json).

## 12. Visual evidence

Preview: **http://127.0.0.1:4178/** (`npm run dev:haegeum`); `/en/` retains existing counterpart routing.
[Evidence index](evidence/p2f/README.md): desktop initial/exit/head/bow/resonance/three full-entry moments/final/menu,
wide/laptop/tablet, mobile390/320, static reduced and 200% text, WebKit and normal-speed forward/reverse videos.
[Desktop video](evidence/p2f/desktop-realtime.webm) and [mobile viewport video](evidence/p2f/mobile-realtime.webm)
are ~16.4 seconds, include native wheel input and MENU, and are labelled separately from physical-device QA.

## 13. Remaining non-blocking issues

- Authentic full-instrument and dedicated head/contact/resonator macros; current wide body detail is visibly soft.
- Real/AI background/material handover remains provisional until authentic replacement and crop review.
- Larger unchanged portrait 3/7 masters and final Retina check.
- Actual iPhone/Android touch/chrome behavior, VoiceOver output and sustained thermal performance.

These explicit non-blockers are distinct from **native Safari closeout and the user's P2F visual approval**, which
remain open quality gates before an unqualified freeze. Do not infer final photographic quality from motion approval.

## 14. Quality decision

**REVIEW READY / FUNCTIONALLY VERIFIED LOCALLY.** Browser evidence supports a strong refined composition:
continuous anchors, preserved initial B, authored mobile, body-to-whole resolution and reversible motion.
**QUALITY APPROVED / FROZEN is not declared.** Final user visual review and a reliable foreground native Safari
walkthrough are still needed; available provisional assets alone do not block the candidate.
P2F changes stay local/uncommitted for this review. Only the approved P2E changes were committed/pushed.

## 15. Recommended next bounded task / STOP

Recommend **P2F Closeout — Foreground Safari QA, Visual Freeze & Delivery** after user approval:
complete actual Safari/keyboard/reduced-motion checks in a reliably visible window, resolve only this owner if a
defect is confirmed, record the final quality decision, then perform explicitly authorized logical delivery/CI.
This recommendation does not start that task or require unavailable high-resolution/phone assets first.

No SOUND, WORKS, Album 3D, Performance/About, Blender/Haegeum model, content migration, production domain,
full HOME or next scene was implemented. **REPORT → STOP → USER APPROVAL.**
