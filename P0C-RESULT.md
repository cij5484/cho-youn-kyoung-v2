# P0C — Real GitHub Pages Deployment / Routing Verification

2026-09-05 · **COMPLETE · Architecture Decision: APPROVE — React Router + Static Prerender**

## 1. What was changed

Initialized an independent V2 Git repository, created the requested public GitHub repository, and deployed only the
existing neutral prerender fixtures. Added a reproducible Actions pipeline, deterministic file-placement contracts,
deployment SHA/file hashes and separate live-host Playwright verification. Updated planning state after the gate passed.
No actual HOME/Design System/content/audio/3D/motion/i18n implementation or legacy migration was added.

Implementation/config files: .gitignore, .gitattributes, .github/workflows/pages.yml, config/build.ts, package.json,
eslint.config.js, tsconfig.node.json, playwright.config.ts, playwright.pages.config.ts, scripts/package-static.mjs,
scripts/static-layout.mjs, tests/static-layout.test.mjs and tests/pages/live.spec.ts.
Package versions/lockfile remain unchanged from P0B. No new application dependency was required.

Generated build/dist/node_modules, browser temporary reports, local caches/checkpoints, environment files and the
duplicate planning ZIP are excluded from Git. The original ZIP and local checkpoint files remain on disk.
Planning documents and source code are included; curated evidence is included separately from temporary test output.

## 2. Repository / commit information

Repository: [cij5484/cho-youn-kyoung-v2](https://github.com/cij5484/cho-youn-kyoung-v2), PUBLIC, main branch.
Origin: https://github.com/cij5484/cho-youn-kyoung-v2.git.

- Baseline checkpoint: f71924f — approved P0B code/planning, before P0C pipeline changes.
- Verified deployment commit: [137b3420fda15b9670e109989da54230d959966e](https://github.com/cij5484/cho-youn-kyoung-v2/commit/137b3420fda15b9670e109989da54230d959966e).
- This result/planning/evidence is recorded by the later documentation commit; it does not redeploy unchanged code.

The legacy cij5484/cho-youn-kyoung repository received no writes. Its main SHA was read before and after:
239d18056d8b3df2cf9a5fd5509f897f85ed70ad, unchanged. No legacy worktree, workflow or production setting was edited.

## 3. Deployment workflow

[pages.yml](.github/workflows/pages.yml) uses pinned official action SHAs and Ubuntu 24.04:

1. Node 24.15.0 and npm 11.12.1; npm ci --include=dev from the existing lockfile.
2. type-check, lint, three placement contracts.
3. Root production build, then project production build and automatic artifact assembly.
4. Official Pages artifact upload of build-pages-preview/static/ only.
5. Deployment to the github-pages environment.
6. Linux Chromium tests against the real URL and artifact upload of verification results.

No manual file movement, gh-pages branch, SPA rewrite, Jekyll build or custom server is needed. Code changes on main
and workflow_dispatch trigger this pipeline; documentation/evidence-only changes do not redeploy.
See [reproducible placement contract](P0C-DEPLOYMENT.md) and
[GitHub's official workflow documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

## 4. Deployment URL

**https://cij5484.github.io/cho-youn-kyoung-v2/**

Pages source is workflow; cname is null and HTTPS is enabled. No choyounkyoung.com connection, DNS or production redirect
was changed. The page remains a neutral test shell and intentionally noindex/nofollow.

## 5. GitHub Actions result

[Run 33955594780](https://github.com/cij5484/cho-youn-kyoung-v2/actions/runs/33955594780): **SUCCESS**.

| Job | UTC time | Result |
|---|---|---|
| build | 08:33:43–08:34:13 | Lockfile install, type/lint/contracts, both builds and artifact upload PASS |
| deploy | 08:34:18–08:34:30 | Pages deployment PASS |
| verify | 08:34:33–08:35:31 | Real-host 42/42 PASS and report saved |

This was a fresh Linux build from source, not an upload of a locally moved artifact.

## 6. Real route verification result

All rows use the project base. Each passed in Linux Chromium and Windows Edge.

| Logical route | Direct / hard refresh | Internal link / back / forward | JS-off HTML | Assets / metadata / lang |
|---|---|---|---|---|
| / | PASS | PASS | PASS | PASS, ko |
| /works | PASS | PASS | PASS | PASS, ko |
| /albums | PASS | PASS | PASS | PASS, ko |
| /performances | PASS | PASS | PASS | PASS, ko |
| /album/test-album | PASS | PASS | PASS | PASS, ko |
| /performance/test-performance | PASS | PASS | PASS | PASS, ko |
| /media | PASS | PASS | PASS | PASS, ko |
| /about | PASS | PASS | PASS | PASS, ko |
| /contact | PASS | PASS | PASS | PASS, ko |
| /en | PASS | PASS | PASS | PASS, en |
| /en/works | PASS | PASS | PASS | PASS, en |
| /en/album/test-album | PASS | PASS | PASS | PASS, en |
| /en/performance/test-performance | PASS | PASS | PASS | PASS, en |

Every route's title, description, canonical and document lang were checked before and after navigation. Same-document
markers proved React Link navigation did not silently reload the whole document. Valid-route browser/page/HTTP errors: none.

## 7. Direct refresh result

Every canonical directory route finishes at HTTP 200. Cache-disabled hard reload clears browser cache via Chromium CDP,
then reloads and rechecks route content/metadata. Per-route back and forward navigation also passed.

| Actual requested variant | Observed Pages behavior |
|---|---|
| /works | 301 → /works/ → 200 |
| /works/ | 200 |
| /works?test=1 | 301 → /works/?test=1 → 200 |
| /works#test | 301 → /works/#test → 200; fragment preserved in browser |
| /works?test=1#test | Query and fragment both preserved |
| /w%6Frks | 301 → decoded /works/ → 200 |

No redirect loops or broken base paths were observed. Canonical URLs omit query/fragment and use the directory slash.
These are actual Pages observations, distinct from the P0B local server's behavior.

## 8. JS-disabled result

All 13 directly requested routes render their heading, title, description, canonical, lang and public image without
JavaScript. They also survive refresh with HTTP 200. This proves independent static documents, not a blank SPA root.
No claim is made that future interactive 3D/audio can work without JavaScript; accessible content fallbacks remain required.

## 9. Real 404 / HTTP status findings

| Missing logical path | JS enabled | JS disabled | Rendered body |
|---|---|---|---|
| /not-a-real-page | HTTP 404 | HTTP 404 | GitHub Pages default 404 |
| /album/not-a-real-album | HTTP 404 | HTTP 404 | GitHub Pages default 404 |
| /performance/not-a-real-performance | HTTP 404 | HTTP 404 | GitHub Pages default 404 |
| /en/not-a-real-page | HTTP 404 | HTTP 404 | GitHub Pages default 404 |

Actual title: Page not found · GitHub Pages; h1: 404. The returned body contains no valid fixture metadata/content.
React's internal unknown link shows the neutral client 404 title/UI; refreshing that path obtains the host HTTP 404.
No universal 200 fallback hides the status. No custom product 404 design was implemented.

## 10. Asset / MIME findings

Every one of the 23 HTML/asset files matched its remote SHA256 and byte size. The 24th public file is build-info.json.

| Resource | Actual status | Actual MIME |
|---|---|---|
| JavaScript/module chunks | 200 | application/javascript; charset=utf-8 |
| CSS marker | 200 | text/css; charset=utf-8 |
| Public SVG marker | 200 | image/svg+xml |
| Prerender HTML | 200 | text/html; charset=utf-8 |
| build-info.json | 200 | application/json; charset=utf-8 |

No source maps were emitted/published. No test reports, screenshots, source/config/planning files, caches, raw server output
or SPA fallback are in the website artifact. Neutral navigation and the small SVG remain intentional test fixtures.
Published manifest/source inspection and browser checks are recorded in the evidence attachments.

Normal files returned Cache-Control: max-age=600, with ETag, Last-Modified and varying Age. The observed build Last-Modified
was 2026-09-05 08:34:23 GMT. Avoid treating a cached HTTP 200 as proof of a new build: check build-info.json's full commit,
then its file hashes. Live tests use the expected SHA, no-cache/query identity polling, and every remote file hash.
Arbitrary multi-release CDN behavior was not tested; the pipeline will detect old/mixed content instead of silently passing it.

## 11. Subpath file-placement analysis

Official React Router 8.3.1 produces HTML under client/cho-youn-kyoung-v2/... while JS/CSS and public files stay under client/.
GitHub adds the repository prefix to artifact-root URLs. Therefore publishing raw client/ would misplace the HTML.

The versioned build script copies route output with exactly that leading directory removed, retains assets/public files,
and excludes unused fallback/private build artifacts. It writes a deterministic SHA/file manifest. HTML bytes are unchanged.
This runs inside the build in CI and locally; no person moves files. The mapping is sorted and rejects missing routes,
collisions, unsafe paths, unknown layouts and emitted maps. Synthetic new KO/EN nested slugs passed under both bases.

It is a small, explicit project-owned adapter over official output, not a first-party Pages adapter. Its tradeoff is ongoing
contract testing when Router/Vite output changes. Current evidence supports long-term maintainability; no brittle renderer
patch is required. Future valid slugs must be enumerated in prerender, but route depth/count needs no manual copy rule.
The disposable fixture catalog will need route-pattern/content-inventory separation when multiple real slugs are introduced.

For / base, no prefix stripping occurs; root production builds passed locally and in CI. The same packager remains useful
for validation/manifest generation. Actual custom-domain cutover remains a separately approved later task.
Full mapping and upgrade failure policy: [P0C-DEPLOYMENT.md](P0C-DEPLOYMENT.md).

## 12. Automated test result

| Suite | Environment | Result |
|---|---|---|
| Placement contracts | Local Node and Linux CI Node | 3/3 PASS in each |
| Existing P0B regression | Local strict root/subpath hosts, Edge | 34/34 PASS, 16.3s |
| Live Pages suite | Linux CI Chromium | 42/42 PASS, 19.5s, no retries |
| Live Pages suite | Windows Edge 152.0.4191.62 | 42/42 PASS, 26.4s, no retries |

type-check, lint and both production builds passed locally and in CI. The first actual Actions run succeeded.
Full temporary reports are outside Git/Pages; [curated JSON and screenshots](evidence/p0c/README.md) are retained in the repository.
The real neutral screen and JS-disabled default 404 screenshots were visually inspected.

## 13. Architecture Decision: APPROVE

**React Router + Static Prerender: APPROVE.**

Clean URL, direct refresh, real 404, subpath, static HTML, metadata/lang foundation and CI reproducibility are demonstrated
on the actual host. Root migration mapping and route-growth placement contracts are demonstrated locally/at build time.
The packager is explicit, reproducible and checked; no host recovery hack is needed. See the
[11-criterion decision record](docs/redesign/review/ROUTING-ARCHITECTURE-DECISION.md).

This approves the architecture specified by the P0C gate, not complete i18n, content/SEO or product quality.

## 14. Known risks

- Framework upgrades must recheck output layout, all route documents and the placement adapter; unknown output fails closed.
- Every public content slug must be enumerated; future loaders/.data/resource routes require a representative additional contract.
- Full EN catalog, translations, reciprocal hreflang, final OG/SEO copy and production domain remain unfinished.
- Product 404 design and exhaustive case/malformed encoding/index.html alias behavior are not claimed complete.
- Current tests cover Chromium-family browsers; mobile/Safari/3D/audio behavior is outside this task.
- Pages cache may retain old content; use deployment SHA/hash evidence. Full CI artifacts expire after 14 days; curated evidence remains.
- The neutral preview intentionally remains noindex and has only test route labels/public marker.

## 15. Planning documents updated

Updated routing decision/current state in CODEX-HANDOFF.md, MASTER v1.7, Migration QA v1.2,
IMPLEMENTATION-TASK-PROTOCOL v1.1, V2-IMPLEMENTATION-PLAN v1.2, HANDOFF-AUDIT v1.2 and PLANNING-REVISION-LOG v1.2.
Added ROUTING-ARCHITECTURE-DECISION.md. README, P0C checklist and deployment contract now point to the completed evidence.
Existing design/function requirements, canonical PHASE 0–14, audio/Tray/Sou.P/accessibility policies and STOP rules remain.
P0A/P0B reports preserve their historical state; they are not rewritten as if they contained real-host proof.

## 16. Recommended next bounded task

**P0D — KO/EN route mapping and metadata/canonical/hreflang contract using neutral fixtures**, subject to explicit approval.
No actual page design or full content translation in that proposed task; split further if it cannot remain bounded.
P0D, P0E, P0F and all later phases have not started.

**STOP. Wait for explicit user approval before the next implementation unit.**
