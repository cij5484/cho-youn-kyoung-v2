# Release Gate WORKS scope cleanup

2026-09-14 · LOCAL ONLY, uncommitted cleanup of `02732b1`, compared with baseline `3745b04`.
Original commits and investigation evidence are preserved. Original workspace is untouched.

## Original two failures

Run34704758157 failed the old album filter click in both neutral hosts (78 pass / 2 fail).
Framework `src/routes/works.tsx → WorksPage` is a six-record infrastructure fixture, not the
shipped EditionApp WORKS. Its toolbar focus handler scrolls between pointerdown and pointerup,
causing click interception/missed activation. Production instead renders AtmosphericArchive,
with seven records (four albums, three performances). Do not alter production to match the old UI.

## Retained scope and files

- `tests/routing-spike.spec.ts`: retain neutral metadata/hydration/history checks; move obsolete
  filter UX coverage to the actual built production WORKS, rather than deleting the requirement.
- `tests/production-works.spec.ts`: independent exact IDs, ALL7/ALBUM4/PERFORMANCE3, pressed state,
  URL, refresh/history and detail destinations, desktop mouse/mobile touch on Chromium/WebKit.
- `playwright.production-works.config.ts`, `scripts/static-spike-server.mjs`, `tsconfig.node.json`:
  serve/isolate the real artifact and type-check the new test configuration.
- `package.json`, `.github/workflows/quality-gates.yml`: execute replacement WORKS coverage in
  Full with its required actual artifact build and existing pinned Classic dependency. No preview
  delivery changes. The unrelated addition of general SEO/legacy artifact checks to Full is removed;
  their existing production-artifact invocation is unchanged. Full is not executed in this cleanup.
- `src/works/candidates/works-helix-motion.ts`: only runtime change retained. Actual built-product
  filtering exposed a mobile WebKit ResizeObserver write/measure feedback error. Coalesce observer
  measurement outside its delivery and cancel on disposal. Filtered desktop reload also exposed
  absent fallback targets after the preview removes original work IDs; use stable catalog sequence.
  These are geometry/lifecycle fixes, not filter semantics or visual/motion tuning.
- This report records the narrowed scope and evidence boundary.

## Removed from this change

Restore Navigation runtime (`EditorialNavigation.tsx`, `menu-reveal.ts`) and `tests/navigation.spec.ts`;
SOUND `controller.ts`; `tests/interaction.spec.ts`, its Playwright change and new Vite test config;
and the global `IMPLEMENTATION-TASK-PROTOCOL.md` addition. Remove the Vite test config include while
retaining the production WORKS config include in tsconfig.

Those changes came from later Lab investigations, not the original two WORKS failures. Navigation
focus and SOUND playback failures were reproduced in their Labs, but were not established by a
production-build reproduction in this pass. Removal is scope control, not a claim that these issues
are resolved or harmless. Their original evidence and implementations remain in `02732b1` history.

## Evidence and STOP

Before cleanup, built production WORKS passed12/12 cases (four projects repeated three times),
including strict page-error checks after the retained runtime corrections. These are automated
browser/emulated-mobile checks, not native Safari or physical-phone evidence.
This cleanup performs diff/file consistency checks only: no new browser suite, build or Full Gate.
There is no ALL PASS claim for this narrowed branch. Later Navigation/SOUND/interaction failures
remain separate unresolved gate work. No commit/push/main merge/deploy/domain/DNS/SEO changes.
