# Phase 5B-1 — Release Gate WORKS scope resolution

2026-09-13 · In progress on isolated `codex/phase5b1-release-gate`, baseline main `3745b04`.
Pending Phase5B staging/SEO edits remain in the original worktree and are not included here.
No domain/DNS/production variable/V1 changes. No SEO, design or motion tuning.

## Cause and scope

Full run34704758157 failed the same old filter click in two neutral hosts (78 pass / 2 fail).
`playwright.config.ts` serves Framework output built from `src/routes/works.tsx → WorksPage`.
This old six-record page is not reachable from the shipped EditionApp renderer: even its clean
`/works/` alias mounts `InteractionLab → WorksExperience → AtmosphericDepth → AtmosphericArchive`.
The latter has seven public records (four albums, three performances) and semantic V2 detail links.

Old `WorksPage` toolbar focus unconditionally instant-scrolls to the convergence endpoint when outside
archive state. Mouse focus between pointerdown and pointerup can move the button under the click.
CI trace recorded repeated click interception by the moving image/portal and the unchanged all filter.
This is an old fixture focus/scroll defect exposed by stale product-scope coverage, not a current
production filter failure. The old fixture is retained for base-path, prerender, metadata, hydration,
locale exclusion, history and HTTP404 infrastructure tests; it does not own current product UX.

## Replacement coverage

The two existing hydrated WORKS tests keep navigation, back/forward, metadata and same-document checks.
Only the retired product-filter portion moves to `production-works.spec.ts` running against the actual
`build:production` artifact, not dev fixtures. Chromium and WebKit each exercise desktop mouse and
390px mobile touch: ALL7 / ALBUM4 / PERFORMANCE3, independent exact visible IDs, pressed state, status,
query, semantic detail links, hard refresh and browser back/forward. Hidden/inert desktop/mobile mirrors
are deliberately not counted as visible results. No forced clicks, added retries or longer timeouts.
Full now builds the actual root artifact from the pinned independent Classic source and runs artifact
checks plus these product tests in addition to all existing browser suites. Preview delivery is unchanged.

## Actual product lifecycle defect

All filter-result assertions initially passed, but WebKit mobile reported ResizeObserver undelivered
notifications. The helix observes the archive paper while its measure callback writes ancestor height
via --archive-overflow in the same observation delivery. Filtering changes paper height and triggers
that feedback. Only observer-triggered measuring is deferred/coalesced into requestAnimationFrame,
with disposal cancellation; initial geometry, all motion values and visual composition remain intact.
The error assertion remains strict; no catch/filter/suppression was added.
Deferred measurement also exposed the desktop preview's intentional removal of original-row work IDs.
On filtered reload the absent preview record and removed fallback ID produced a null geometry target.
Original slots now use their unchanged catalog data-sequence, independent of visible transition IDs.
Both fixes stay within measurement/lifecycle; filters, layout and motion tuning are unchanged.

## Additional failures exposed by the complete rerun

Run34705836727 passed all80 routing cases and all11 Design System cases, then reached Navigation,
which the original failed run had never reached. Its six failures had two causes: stale test assumptions
(CLOSE no longer belongs to an ivory menu-key; the modal intentionally hides the retained external
trigger from accessible role queries), and an actual focus-restoration race. Native dialog.close()
tries restoring focus before React unhides the external MENU. The controller now retains its opener
and restores focus in a cancellable next-frame callback after closed state commits. Reopening and
disposal cancel it; deliberate focus elsewhere is preserved and route dismissal does not request it.
No navigation style, animation timing or reversal changes. Contrast thresholds remain unchanged;
the test now calculates CLOSE against the neutral Lab canvas and its actual difference blend mode.
The retained DOM trigger's expanded state is checked separately from its modal visibility.
Local Navigation26/26 passes, including interruption, reduced motion, route focus and dismissal focus.

## Validation and boundary

Actual production WORKS passed all12 local cases (four browser/viewport projects repeated three times).
Complete Linux release results will be recorded after rerun. Browser projects are automation/emulation, not physical
phone or native Safari QA. Full green authorizes reporting and STOP, not custom-domain cutover.
