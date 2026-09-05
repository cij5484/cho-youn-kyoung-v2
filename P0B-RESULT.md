# P0B — Routing / Static Prerender Architecture Spike result

2026-09-05 · C:\choyounkyoung-v2

**Result: P0B local spike PASS. React Router Framework + static prerender is conditionally recommended.
Actual GitHub Pages compatibility is NOT YET VERIFIED; final architecture is NOT FROZEN. P0C NOT STARTED.**

## 1. What was changed

Replaced the P0A entry with the official React Router Framework Vite integration and 13 neutral test routes.
Added official build-time HTML generation, two centrally selected base targets, per-route test metadata,
a static artifact assembly step and repeatable browser/static-file verification. No product pages or visual design.

The current P0B user instruction explicitly excludes deployment and supersedes the earlier protocol's P0B
deployment wording for this task. Its bounded-work/STOP rules still apply. No original planning/review file was edited.

## 2. Files changed

Modified P0A files (9):

| Files | Purpose |
|---|---|
| package.json, package-lock.json | Framework/test dependencies and commands |
| config/build.ts, vite.config.ts | One base/origin/output configuration and official Router plugin |
| tsconfig.app.json, tsconfig.node.json | Framework-generated route types and test/config type checking |
| eslint.config.js, .gitignore | Route module exports and generated/checkpoint/test output boundaries |
| README.md | Current run, build, preview, verification and STOP instructions |

New implementation/test files (15):

| Files | Purpose |
|---|---|
| react-router.config.ts | ssr:false, 13 prerender paths, basename, initial route discovery |
| src/root.tsx, src/routes.ts | Document/lang and route configuration |
| src/routes/spike.tsx, src/routes/not-found.tsx | Shared neutral fixture shell and client 404 |
| src/spike/fixtures.ts, src/spike/paths.ts, src/spike/metadata.ts | Fixtures, base-safe paths and route metadata |
| src/styles/spike.css, public/spike/path-check.svg | Non-visual CSS marker and new 16px public path-test SVG |
| scripts/router.mjs, scripts/package-static.mjs, scripts/static-spike-server.mjs | CLI target propagation, artifact assembly and strict local static server |
| playwright.config.ts, tests/routing-spike.spec.ts | Root/subpath verification matrix |

Retired from the live source tree (3): index.html, src/main.tsx, src/app/App.tsx.
The official root.tsx and default framework entries replace their responsibility. Their bytes, plus all 9 modified
P0A files, are preserved under .checkpoints/p0b-before/ (12 backups).

New receipts: P0B-RESULT.md, P0C-VERIFICATION-CHECKLIST.md, P0B-CHECKPOINT.json.
Generated: build-root/, build-pages-preview/, .react-router/, test-results/, playwright-report/ and dependency caches.
P0A dist/ and dist-pages-preview/ are preserved historical outputs; do not use them for P0B previews.
Existing 21 ZIP/planning/review/handoff files match P0A's SHA256 baseline: **21/21 unchanged**.
P0A receipts remain preserved. No .git, AGENTS.md, workflow, remote, repository or deployment was created.

## 3. Dependencies added / changed

| Action | Dependency | Exact version | Role |
|---|---|---|---|
| Add runtime | react-router | 8.3.1 | Routing/hydration and route metadata |
| Add runtime | isbot | 5.2.2 | Required by the official default build-time server entry |
| Add dev | @react-router/dev | 8.3.1 | Vite framework integration, build/prerender/typegen |
| Add dev | @react-router/node | 8.3.1 | Official default server-entry adapter used during build |
| Add dev | @playwright/test | 1.63.0 | Static/browser verification via installed Edge |
| Remove dev | @vitejs/plugin-react | previously 6.1.1 | Replaced by the official Router Vite plugin |

React/react-dom 19.2.8, TypeScript 6.0.3 and Vite 8.2.2 remain unchanged. No browser binary was downloaded.
Node 24.15.0 / npm 11.12.1. Final install audited 184 packages; npm ls succeeded; npm audit: 0 vulnerabilities.
The pinned combination meets installed packages' Node/React/Vite/TypeScript peer ranges.

Initial build failure: the Router CLI automatically added missing isbot and ran npm under its production build
environment, removing dev dependencies; Windows also emitted an EPERM cleanup warning for the loaded native module.
Resolved by explicitly pinning isbot and installing with --include=dev outside the build. Both later builds passed
without dependency mutation. No dependency code was patched. The explicit official plugin replacement follows
[React Router framework adoption](https://reactrouter.com/upgrading/component-routes).

## 4. Routing spike structure

| Locale | Logical test paths |
|---|---|
| KO | /, /works, /albums, /performances, /album/test-album, /performance/test-performance, /media, /about, /contact |
| EN | /en, /en/works, /en/album/test-album, /en/performance/test-performance |

All routes share a disposable shell. Album/performance route patterns actually use :id; only the named test slugs
are valid fixtures. Missing slugs show the 404 client view. The wildcard handles other unknown paths.
This fixture registry is not the future production content schema or full translation catalog.

Links use logical paths; React Router adds basename once. Canonical/link candidates use directory-style trailing
slashes while slashless direct requests are also tested. Public assets use Vite BASE_URL. The CSS file only sets
--p0b-css-loaded; the browser keeps its default styling. Route discovery is initial, avoiding a runtime manifest endpoint.

## 5. Static prerender result

Official ssr:false + explicit prerender paths generated **13 independent route HTML files per target**.
All 26 documents render the correct heading/metadata with JavaScript disabled. The required four examples are:

| Logical route | Relative path inside each static/ artifact |
|---|---|
| / | index.html |
| /works | works/index.html |
| /album/test-album | album/test-album/index.html |
| /en/works | en/works/index.html |

The HTML comes directly from the official renderer; packaging leaves its content identical. There are no route
loaders/actions in this spike, so no per-route .data files were emitted. Future loader/data behavior has not been proven.
The build also produces a fallback document; it is preserved as __spa-fallback.html and is not configured as a host rewrite.
server/index.js is a build-time intermediate, excluded from static/; no runtime server is required for these fixtures.
This matches the documented static prerender model. [React Router pre-rendering](https://reactrouter.com/how-to/pre-rendering)

## 6. Root vs Project Pages base result

| Check | Root / | Project /cho-youn-kyoung-v2/ |
|---|---|---|
| Official build | PASS | PASS |
| Raw client/ as a Pages publish root | Layout already aligned | NOT directly suitable: nested route HTML vs root assets |
| Assembled static/ artifact | PASS, 24 files | PASS, 24 files |
| Route HTML | 13 | 13 |
| JS/CSS/public SVG/link paths | PASS | PASS, prefix once |
| Direct static access and hydrated navigation | PASS locally | PASS locally |
| Actual GitHub Pages | NOT TESTED | NOT TESTED |

Observed 8.3.1 raw output: client/cho-youn-kyoung-v2/works/index.html, but client/assets/*.js and client/spike/path-check.svg.
The subpath fallback is initially client/index.html. Publishing raw client/ under the project prefix would put route
HTML one directory too deep; publishing only its nested folder would omit assets.

scripts/package-static.mjs therefore strips the configured prefix from generated document paths, copies the assets
and public fixtures alongside them, and preserves the fallback under its descriptive filename. Root output uses the
same artifact step without stripping a prefix. Unknown output layouts, collisions and missing fixture HTML cause failure.
The script copies bytes, with no HTML regex rewriting, browser snapshot renderer, dependency patch or unofficial flag.
**This is project-owned packaging code, not an officially supplied Pages adapter.** Its maintenance cost matters.
The upstream basename/output discussion is supporting context; the installed build and filesystem are our evidence.
[React Router upstream discussion](https://github.com/remix-run/react-router/discussions/15000)

## 7. Metadata spike result

| Example | Title | Description | lang | Root canonical candidate |
|---|---|---|---|---|
| /works | WORKS (ko) \| P0B | Routing spike: /works [ko]. Test metadata only. | ko | https://site.example.invalid/works/ |
| /en/works | WORKS (en) \| P0B | Routing spike: /en/works [en]. Test metadata only. | en | https://site.example.invalid/en/works/ |

Project target changes the candidate origin to https://pages.example.invalid and adds the central base.
All 13 routes were checked both in static HTML and during hydrated navigation, including KO↔EN lang changes.
Query/hash are excluded from canonical candidates. Unknown routes omit canonical and use 404 metadata.
No real SEO copy, live domain claim, full hreflang, OG or translation implementation; fixtures stay noindex/nofollow.

## 8. 404 / direct refresh findings

| Scenario | Locally observed result | Limit |
|---|---|---|
| Known /works | Directory 301 → /works/ → static HTML HTTP 200 | Exact Pages redirect still unverified |
| Known deep-route refresh | HTTP 200 and matching prerendered document | Pages CDN/host behavior still unverified |
| Unknown direct path/slug | HTTP 404, plain Not Found body | Local test host response, not Pages custom 404 |
| Unknown client Link | 404 UI/title, no canonical | Client navigation has no new document HTTP status |
| Reload that unknown client path | HTTP 404 | Confirms no SPA rewrite in local test host |
| Query and fragment | Retained on sample redirect; canonical omits both | Must recheck actual host |
| Unprefixed /works/ on project host | HTTP 404 locally | Outside the selected app mount |

The local server deliberately has no Vite fallback or universal 200 rewrite. It is a test harness, not a Pages emulator.
No 404.html was authored in P0B. GitHub documents custom 404.html support; it does not make the generated fallback
an automatic clean-URL rewrite. Actual status/body must be observed there.
[GitHub custom 404 documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-custom-404-page-for-your-github-pages-site)

## 9. Tests performed

Microsoft Edge 152.0.4191.62, headless Windows, Playwright 1.63.0: **34 tests passed in 16.9s, no retries**.
26 JavaScript-disabled direct-route cases check independent HTML, metadata, locale, every fixture link and JS/CSS/image
HTTP responses. Each assembled route HTML is compared with its original generated HTML.
Eight other cases (four per target) cover all hydrated links without document reload, back/forward, a deep refresh,
loaded SVG/CSS marker, unknown direct routes/slugs/assets, client 404 behavior and query/hash/slash handling.
Hydrated normal navigation produced no captured console/page errors or HTTP errors.

Reports: playwright-report/index.html, test-results/.last-run.json.
Screenshots: test-results/root-neutral-shell.png and test-results/pagesPreview-neutral-shell.png.
The project screenshot was visually inspected and remains a browser-default neutral shell.
Preview commands: npm.cmd run preview (4173), npm.cmd run preview:pages-preview (4174).
Test-owned servers were stopped at completion; these addresses require starting the command again.

## 10. Build / lint / type-check results

| Check | Final result |
|---|---|
| npm install / npm ls | PASS, dependencies resolved |
| npm audit --audit-level=low | PASS, 0 vulnerabilities |
| npm run type-check | PASS, framework typegen + tsc -b |
| npm run lint | PASS, 0 warnings/errors |
| npm run build | PASS, root production build + static assembly |
| npm run build:pages-preview | PASS, project production build + static assembly |
| npm run test:spike | PASS, 34/34 |
| Protected document SHA256 | PASS, 21/21 unchanged |

An initial test-code type check lacked DOM types for browser evaluate callbacks; a test-local DOM lib reference fixed it.
Playwright emitted terminal NO_COLOR/FORCE_COLOR warnings; they do not indicate browser errors or test failure.
No broad unit-test framework, coverage suite or visual-design approval was introduced.

## 11. Architecture comparison

A is implemented/tested here. B and C are documentation-based alternatives, not installed or benchmarked in this task.

| Criterion | A. React Router + static prerender | B. SPA + Pages fallback | C. Astro static + React islands |
|---|---|---|---|
| Clean URL | Yes, explicit route HTML + client routing | Client navigation yes; direct access needs recovery | Static file routes |
| Pages compatibility | Local artifact passes; needs packaging and real host proof | 404 recovery is not a valid-route HTTP 200 guarantee | Official Pages deployment guide available |
| SEO | Route-specific initial HTML/metadata proven | Generic initial HTML; depends on client rendering/recovery | Initial static HTML and metadata |
| KO/EN growth | Four EN examples and lang transitions proven; complete map pending | Paths possible; initial metadata limitation remains | Locale paths from static routing; integration work needed |
| Direct refresh | Existing artifact paths pass locally | Host fallback/redirect dependency | Existing static route files |
| Custom domain | Switch central root target and origin, rebuild | Change basename/assets plus fallback assumptions | Change site/base and rebuild |
| Maintainability | One React routing/rendering system; packaging adapter needs ownership | Small initial bundle setup, host-recovery edge cases grow | Strong static authoring; adds Astro syntax/island boundary |
| Build complexity | Client + build-time server + prerender + assembly | Lowest build complexity | Static build plus React integration; not measured here |
| Content growth | Enumerate valid slugs, rebuild; future data output needs tests | Fewer HTML outputs, weaker direct HTML guarantees | Enumerate dynamic static paths; rebuild |

Astro's file routing, dynamic static path enumeration and Pages instructions support C's technical plausibility.
For this project, adding an Astro/React boundary before the planned interactive React subsystems is a tradeoff,
not a demonstrated improvement. That fit judgment is an inference, not a completed Astro spike.
[Astro routing](https://docs.astro.build/en/guides/routing/),
[Astro GitHub Pages guide](https://docs.astro.build/en/guides/deploy/github/)

## 12. Recommended routing architecture

**Conditionally recommend A: React Router Framework + ssr:false + explicit static prerender of every valid public path.**
The reason is the actual 26 route documents, both working bases and client navigation within the current React stack.
Keep the packaging step explicit and tested; do not claim raw framework output is turnkey Project Pages support.
Use real static HTML for valid paths and a genuine host 404 for missing paths, without a site-wide SPA recovery dependency.

Final adoption still requires actual Pages verification, complete locale/SEO contracts and user review. Do not freeze
architecture or begin product pages based on this local PASS alone. If packaging ownership is unacceptable, C deserves
a separately approved bounded spike. B is not recommended for the archive's initial-HTML/direct-access requirements.
No HashRouter fallback was used or proposed.

## 13. Known risks / unresolved items

- Actual Pages upload, CDN MIME/cache/redirect/status behavior has not been tested.
- Raw basename output needs the project-owned packaging adapter; upgrades must rerun artifact checks.
- Canonical origins are placeholders; trailing slash is a tested candidate, not the final URL policy.
- All future valid content slugs must be enumerated; missing prerender paths cannot rely on Pages SSR.
- Future loaders/.data, full EN catalog, hreflang, final metadata and content growth/build cost are untested.
- Current neutral route catalog is disposable; repeated content entries will need separate route-pattern and slug inventory ownership.
- Browser verification is Windows Edge only. Safari/mobile and future browser-only 3D/audio imports are not evaluated.
- Custom 404 body/return navigation remains a later scoped decision; client 404 does not prove HTTP status.
- No actual custom-domain routing/DNS/HTTPS or legacy-host interaction occurred.

## 14. Exact items requiring real GitHub Pages verification

See [P0C-VERIFICATION-CHECKLIST.md](P0C-VERIFICATION-CHECKLIST.md): exact destination/artifact root; all 13 direct/refresh/JS-off
routes; original and final status; base-root/slash/query/hash redirects; all asset MIME/path responses; unknown KO/EN paths
and slugs; default/custom 404 status; case/encoded/index.html URLs; browser history/hydration and cache behavior.
Every item is explicitly NOT TESTED on Pages. The checklist does not authorize deployment or repository creation.

## 15. Recommended P0C task

One bounded task: verify this neutral artifact on an explicitly approved isolated Project Pages destination and record
clean URL/direct refresh/404 evidence. No product pages or automatic P0D. If no destination exists, approval must separately
cover the exact required setup; do not infer repository/remote authorization from the P0B result.

Rollback: use P0B-CHECKPOINT.json and .checkpoints/p0b-before/ to restore only the listed P0A files and remove only the listed
P0B additions after checking for later edits; reinstall the restored lockfile. Keep original planning and receipts intact.
No rollback has been executed.

**STOP. P0B is complete; wait for explicit user approval before P0C or any other implementation unit.**
