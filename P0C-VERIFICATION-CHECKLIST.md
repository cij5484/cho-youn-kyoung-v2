# P0C proposal — actual GitHub Pages verification

2026-09-05 · **NOT STARTED / NOT AUTHORIZED by P0B approval**.
This is the P0B deliverable checklist, not a deployment workflow.

## One proposed objective and approval boundary

Prove the existing P0B static artifact's direct request, refresh and unknown-route behavior on actual Project Pages.
Keep the same neutral fixtures. No real page construction, i18n completion, production-domain change or P0D.

The next approval must name an existing isolated V2 repository/Pages destination and authorize a minimal test upload.
If a new repository is needed, its creation/remote connection must be explicitly included in that approval;
P0B does not authorize either. Keep this bounded: use an existing destination where possible.
If destination provisioning is substantial, propose that as its own task and STOP before route verification.

Expected file scope: fixture test runner/evidence, and only the minimum Pages artifact configuration specifically approved.
Do not automatically turn this into the P0E production workflow. Never touch legacy hosting or production DNS.
Rollback: retain the P0B artifact/checkpoint and revert only newly approved test-host changes.

## Record before testing

- [ ] Exact repository, Pages environment, test URL, uploaded revision, date, Node/npm/browser versions.
- [ ] Build root is the CONTENTS of build-pages-preview/static/, with index.html at artifact root.
- [ ] Generated route HTML, JS/CSS and public marker files match the tested artifact; no doubled base directory.
- [ ] No Jekyll processing unexpectedly removes framework/static files. Record actual publishing mechanism.
- [ ] Test metadata stays noindex; any placeholder canonical origin is recorded as a test value.

## Every route must be tested directly on Pages

Use prefix /cho-youn-kyoung-v2 for every logical path below. Test a new tab/direct URL and browser refresh,
with JavaScript enabled and with JavaScript disabled. Record the original status/redirect chain, final URL,
final HTTP status, visible route name and view-source title/description/canonical/lang.

| Logical path | Direct / refresh / JS-off / metadata |
|---|---|
| / | NOT TESTED |
| /works | NOT TESTED |
| /albums | NOT TESTED |
| /performances | NOT TESTED |
| /album/test-album | NOT TESTED |
| /performance/test-performance | NOT TESTED |
| /media | NOT TESTED |
| /about | NOT TESTED |
| /contact | NOT TESTED |
| /en | NOT TESTED |
| /en/works | NOT TESTED |
| /en/album/test-album | NOT TESTED |
| /en/performance/test-performance | NOT TESTED |

## Host-specific acceptance cases

- [ ] Existing routes end at HTTP 200 from actual static HTML; no valid-route 404 masked by JavaScript recovery.
- [ ] /cho-youn-kyoung-v2 and /cho-youn-kyoung-v2/ resolve consistently. Record actual status and Location.
- [ ] /works and /works/ under the prefix: record actual trailing-slash redirects and avoid loops.
- [ ] Query preservation: /works?p0b=1. Fragment preservation: /works?p0b=1#test.
- [ ] If /works/index.html is publicly reachable, assess duplicate URL/canonical handling.
- [ ] Unknown path /missing-route and /missing-route/ return HTTP 404, not HOME/200.
- [ ] Unknown KO/EN album and performance slugs return HTTP 404; no fallback that impersonates a valid page.
- [ ] Record default Pages 404 body. If a custom 404 is separately approved, it must retain status 404 and a valid base-aware return link.
- [ ] Do not map __spa-fallback.html to all requests or copy HOME HTML to 404.html as a recovery hack.
- [ ] Exact case/encoded-path behavior: /Works, /album/TEST-ALBUM and malformed/encoded paths. Do not assume Windows case behavior matches Pages.
- [ ] Module preload, entry JS, lazy route chunks, CSS and public SVG all return 200 with correct MIME types.
- [ ] Deep-route JS-disabled navigation keeps the prefix; hydrated navigation, KO↔EN changes, back/forward remain within the same site.
- [ ] No missing /__manifest requests, hydration errors, missing assets, or stale cached chunk imports.
- [ ] Test an updated artifact for stale-cache behavior; record cache headers and any limitations without adding a broad cache subsystem.
- [ ] Confirm all intended valid slugs are enumerated. A dynamic route pattern alone does not create arbitrary static pages.

## Explicitly outside this P0C proposal

Full EN route inventory, translation, reciprocal hreflang and final SEO are deferred to separately approved locale work.
Root output was tested locally in P0B; actual custom-domain root deployment, DNS, HTTPS and redirect migration
are later live-host checks. Do not attach the production domain to prove the local root build.
Future loader/.data resources require their own fixture test if that data architecture is introduced.

## Completion gate and STOP

Every Pages result above has actual evidence or an explicit FAIL/NOT TESTED reason. Distinguish HTTP status from
client-side 404 UI. Report architecture readiness without silently freezing unresolved contracts.
Report changed files, tests, results, issues, screenshots/URLs and one recommended next task, then **STOP**.
P0D/P0E or a different framework spike requires another explicit approval.
