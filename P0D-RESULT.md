# P0D — KO / EN Routing + Metadata Contract result

2026-09-05 · **COMPLETE locally / STOP**. React Router + Static Prerender remains **APPROVE**, explicitly
confirmed by the user. Baseline `2be1162`; changes are uncommitted and unpushed. No deployment occurred.

## 1. What was changed

Centralized KO/EN path pairing, language-switch results, reviewed-content availability, canonical URLs,
reciprocal hreflang and metadata. Expanded the neutral catalog from 13 routes to all nine KO/EN pairs.
No page design, real translation/content, switch UI, 3D, motion, assets migration or P0E work was added.

## 2. Files changed

All paths below are relative to `C:/choyounkyoung-v2/`.

| File | Change |
|---|---|
| src/routing/locale-contract.ts | New reusable language, authored-content, pairing and metadata contracts |
| src/spike/fixtures.ts | Nine semantic records generate 18 published neutral routes |
| src/spike/metadata.ts | RouteMetadata → official React Router Meta adapter, hreflang/OG |
| src/spike/paths.ts | Central site adapter and pure canonical URL helper |
| src/root.tsx | Shared language detection for server/client document |
| package.json | New test:locale command; no dependency changes |
| tests/locale-contract.test.ts | Eight mapping/metadata/fallback tests |
| tests/metadata-assertions.ts | Shared independent expected URL/head assertions |
| tests/routing-spike.spec.ts | Expanded 80-case root/project static and hydrated suite |
| tests/pages/live.spec.ts | Extended next-deployment metadata assertions; not executed on old P0C artifact |
| docs/redesign/review/LOCALE-METADATA-CONTRACT.md | New canonical contract and future integration boundaries |
| docs/redesign/00-MASTER-PLAN.md | v1.8, full path list and P0D contract/status |
| docs/redesign/14-MIGRATION-QA.md | v1.3, local fixture gate versus release QA |
| docs/redesign/review/V2-IMPLEMENTATION-PLAN.md | v1.3, locale policy and next approval boundary |
| docs/redesign/review/HANDOFF-AUDIT.md | v1.3, evidence scope and spike checklist status |
| docs/redesign/review/IMPLEMENTATION-TASK-PROTOCOL.md | v1.2, P0D complete and STOP preserved |
| docs/redesign/review/ROUTING-ARCHITECTURE-DECISION.md | User confirmation and P0D addendum |
| docs/redesign/review/PLANNING-REVISION-LOG.md | v1.3; prior history preserved |
| CODEX-HANDOFF.md | P0D local complete, P0E not started |
| README.md | Current local versus live state, commands and result links |
| P0D-RESULT.md | This report |
| evidence/p0d/README.md | Evidence provenance and locations |
| evidence/p0d/verification.json | Case outcomes, source hashes and 36 document metadata extracts |
| evidence/p0d/root-neutral-shell.png | Local root screenshot |
| evidence/p0d/pagesPreview-neutral-shell.png | Local subpath screenshot |

Ignored `P0D-CHECKPOINT.json`, build outputs and temporary Playwright reports are local verification
artifacts. Existing P0A/B/C result files, evidence and planning ZIP are preserved. No package-lock,
deployment workflow, static packager, CSS, public asset, router framework config or remote changes.

## 3. KO / EN route contract

KO: `/`, `/works`, `/albums`, `/performances`, `/album/:id`, `/performance/:id`, `/media`, `/about`, `/contact`.
EN: `/en` and the corresponding `/en/...` routes. No `/ko`, locale-only React state, or browser-language redirect.
Published directory URLs have trailing slash, consistent with P0C. Only test-album/test-performance IDs exist.

## 4. Counterpart mapping design

A semantic record owns its stable Korean path and explicit ko/en editions. `routePair()` computes only
published counterparts; `resolveLanguageSwitch()` returns available/unavailable/unknown-route results.
The same album/performance ID survives both directions. Helpers return logical paths without basename;
the existing router adds the centrally configured prefix. Components contain no duplicated locale mapping.

## 5. Canonical strategy

Each page self-canonicalizes, including EN. Central origin/base remain in `config/build.ts`; the metadata
contract accepts those values. Preview URLs use the V2 project prefix once; isolated root URLs use the
existing `.invalid` fixture origin. Query/fragment are excluded. Future root/domain changes require only
central settings plus the separately approved migration gate; no production domain was connected.

## 6. Hreflang strategy

Both bilingual pages emit the same absolute ko/en/x-default set, including self. x-default points to the
same Korean content. Only published variants appear. This follows the reciprocal/self-link guidance in
[Google Search Central](https://developers.google.com/search/docs/specialty/international/localized-versions).

## 7. Missing-translation fallback policy

Adopted the user's policy: remain on the same Korean content and return unavailable; never HOME.
Missing EN, human-authored drafts and machine-assisted drafts do not produce EN paths or alternates.
Unknown source paths return `to: null`, retaining 404 behavior. The future UI must expose the unavailable
state accessibly. Language-switch output is pathname-only; future query/anchor mappings require explicit
semantic rules. Full bilingual launch-content approval remains required.

## 8. Metadata contract

Typed title/description/lang/canonical/hreflang plus extensible OG type/title/description/url/optional image.
Official React Router Meta renders one shared adapter. Root layout uses the same locale rule before and
after hydration. Neutral P0B diagnostic labels and noindex remain; no final SEO copy was authored.
LocalizedContent separates ko/en and authored/reviewed readiness; automatic translation is not a public
source of truth. Production content/provenance schemas remain a future bounded task.

## 9. Static prerender verification

Both production builds generated 18 independent HTML entries, 36 total. Each has the correct lang,
title, description, self-canonical, reciprocal hreflang and basic OG with JavaScript disabled.
Raw framework HTML equals packaged HTML byte-for-byte. Each target has 28 public HTML/asset files plus
build-info.json. The existing packager handled five additional EN paths without modification.

## 10. Automated tests

| Suite | Result |
|---|---|
| npm.cmd run test:locale | 8/8 passed: all pairs, both bases, fallback states, unknown paths, future root |
| npm.cmd run test:placement | 3/3 passed unchanged: mapping, growth, failure guards |
| npm.cmd run test:spike -- --reporter=list,html,json | 80/80 passed; root 40, project base 40 |

Edge 152.0.4191.62 on Windows, Node 24.15.0. Browser runtime 55.7 seconds, no failures, retries or skips.
Each base has 18 JS-off document tests, 18 hydrated direct/cache-disabled refresh/counterpart/history tests,
and four retained routing regression cases. [Saved evidence](evidence/p0d/README.md),
[full browser report](playwright-report/index.html). Live suite now expects the new 18-route contract and
must be used only after an approved matching deployment, with the actual deployed SHA.

## 11. Build / lint / type-check results

All passed: `npm.cmd run type-check`, `npm.cmd run lint`, `npm.cmd run build`,
`npm.cmd run build:pages-preview`. Type-check/lint were also run after the final test additions.
No dependencies were added/updated and no install was needed. Vite/RR/React versions remain unchanged.
Playwright logged only its existing NO_COLOR/FORCE_COLOR terminal warning; no browser console or hydration errors.

## 12. P0C regression result

PASS locally for the retained contracts: clean paths, direct access, refresh, internal navigation,
back/forward, JS-off HTML, assets, base isolation, slash/query behavior and true static HTTP 404.
Client-only 404 has no canonical/hreflang/OG and refresh remains HTTP 404. `/ko` and `/ko/works` also return 404.
File placement is unchanged and all original placement tests pass. Framework, router base and CI are unchanged.

No new real GitHub Pages or Linux CI run was performed in P0D. The P0C live results remain historical
evidence, not a claim of deployed P0D success. Existing live preview still serves the 13-route P0C artifact.

## 13. Known risks

- P0D changes are local and not deployed. The updated live tests cannot pass against the old P0C artifact.
- Dirty local build-info.commit is the baseline HEAD, not a clean P0D revision. Saved source hashes identify this run.
- The model is a minimal fixture contract. Multiple real slugs, reviewed Korean prerequisites, duplicate/path checks,
  provenance/reviewer records and translation-body parity must be enforced during production schema integration.
- Safari/mobile and actual production custom-domain behavior are not newly verified. No indexing claim is made.
- No actual language switch UI or locale-specific query/anchor preservation was implemented; this is the API boundary.

## 14. Architecture / planning documents updated

Architecture stays APPROVE. MASTER, Migration QA, implementation plan, audit, protocol, ADR, revision log,
HANDOFF and README now distinguish P0D local contract completion from real translated-content/release QA.
The new locale contract is the canonical implementation reference. Original product requirements and
historical P0A/B/C evidence remain. The 207-item HANDOFF retains product SEO checks as pending and marks
only the now-tested spike metadata/hreflang checkbox complete. Plan structure remains 17 sections.

## 15. Recommended next bounded task

**P0E — wire locale validation into the existing delivery workflow and review its reproducibility.**
Do not rebuild the already-proven pipeline. If the user approves deploying this P0D fixture artifact as
part of that task, use the new deployed SHA and run the extended real-Pages suite. No design/content or
P0F work should be included. This recommendation is not authorization.

**STOP. P0E has not started. Wait for explicit user approval.**
