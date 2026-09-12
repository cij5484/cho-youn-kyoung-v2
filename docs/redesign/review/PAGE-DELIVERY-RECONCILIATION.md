# Authored pages and navigation reconciliation — 2026-09-12

User authorizes the four corrections plus delivery of all accumulated authored screens. Baseline main `c1e0cd9`.
No developer comparisons, tuning UI, private originals or caches ship. Existing Fast CI and automatic Pages remain intact.

- WORKS desktop only (1000px+, fine pointer/hover): compact title rail fades directly into the final chronological
  list + persistent image preview. It never expands into the obsolete full-width thumbnail list first. Mobile retains
  the existing expansion clock/layout. No HOME choreography change.
- Time Path: overview work cards, SVG year landmarks and top year buttons share the same exact scroll checkpoint.
  All return to the full work reading; graph landmarks support Enter/Space and enlarged hit areas. Reduced motion
  scrolls to the ordinary article. Program facts and timeline geometry are unchanged.
- Related performance/album navigation: one selected image goes directly to the new hero without a center enlargement
  detour. URL and DOM owner identity must both match before measuring. Hide duplicate images while the proxy moves,
  restore them during cancellation/cleanup, and preserve reduced-motion navigation.
- MEDIA and CONTACT: promote the existing local lazy page imports/routes to the Pages preview. MEDIA preserves
  three scroll-scrubbed films + one Special Archive + text Press Index; CONTACT preserves email/copy and kinetic type.
  The reviewed ABOUT gallery and Sou.P greeting are already on main. No new design or assets are invented for delivery.

Lean evidence: type-check and changed-scope lint pass; MEDIA tests, Time Path checkpoint test, desktop/mobile archive
  assembly test and incoming-detail identity test pass. Local browser confirms overview card/graph return, related
  performance route arrival at scroll zero with visible correct poster and removed overlay, desktop direct archive
  assembly and unchanged mobile row-expansion clock. Actual preview build includes MEDIA/CONTACT chunks.

Known pre-existing failure: `tests/works-atmospheric.test.ts` “approach/departure are continuous...” exceeds its opacity
  delta assertion. Re-running the committed baseline test against unchanged atmospheric model reproduces the same failure.
  No assertion is relaxed; this unrelated model check is not part of existing Fast CI. Physical device/visual quality
  approval and Full Release Gate are not claimed. Rollback: revert this bundle, preserving PR #26 and earlier main work.
