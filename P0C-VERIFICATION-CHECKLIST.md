# P0C proposal — actual GitHub Pages verification

2026-09-05 · **P0C COMPLETE / architecture APPROVE**.
This checklist originated in P0B. The subsequent explicit P0C approval authorized the named V2 repository and real Pages deployment.
All 13 required routes passed in CI Chromium and Windows Edge. See [P0C result](P0C-RESULT.md) and [curated evidence](evidence/p0c/README.md).
Unchecked supplemental items below were not required to widen the latest P0C scope and remain explicitly unverified.

## One proposed objective and approval boundary

Prove the existing P0B static artifact's direct request, refresh and unknown-route behavior on actual Project Pages.
Keep the same neutral fixtures. No real page construction, i18n completion, production-domain change or P0D.

The actual P0C approval named cij5484/cho-youn-kyoung-v2 and explicitly authorized repository creation/connection and Pages deployment.
That setup and verification are now complete. No custom domain or production legacy repository was changed. No next task is authorized.

Expected file scope: fixture test runner/evidence, and only the minimum Pages artifact configuration specifically approved.
Do not automatically turn this into the P0E production workflow. Never touch legacy hosting or production DNS.
Rollback: retain the P0B artifact/checkpoint and revert only newly approved test-host changes.

## Record before testing

- [x] Exact destination/revision/runtime recorded in P0C-RESULT.md and evidence/p0c/.
- [x] CI uploads the contents of build-pages-preview/static/, with index.html at artifact root.
- [x] All 23 published HTML/asset files match the deployed manifest's hashes; no doubled base.
- [x] Official Actions artifact deployment used; all manifest files verified remotely.
- [x] Preview remains noindex; canonical uses actual Pages origin. Root origin stays a placeholder.

## Every route must be tested directly on Pages

Use prefix /cho-youn-kyoung-v2 for every logical path below. Test a new tab/direct URL and browser refresh,
with JavaScript enabled and with JavaScript disabled. Record the original status/redirect chain, final URL,
final HTTP status, visible route name and view-source title/description/canonical/lang.

| Logical path | Direct / refresh / JS-off / metadata |
|---|---|
| / | PASS: both browser environments, HTTP 200, JS on/off, metadata/lang |
| /works | PASS: both browser environments, HTTP 200, JS on/off, metadata/lang |
| /albums | PASS: both browser environments, HTTP 200, JS on/off, metadata/lang |
| /performances | PASS: both browser environments, HTTP 200, JS on/off, metadata/lang |
| /album/test-album | PASS: both browser environments, HTTP 200, JS on/off, metadata/lang |
| /performance/test-performance | PASS: both browser environments, HTTP 200, JS on/off, metadata/lang |
| /media | PASS: both browser environments, HTTP 200, JS on/off, metadata/lang |
| /about | PASS: both browser environments, HTTP 200, JS on/off, metadata/lang |
| /contact | PASS: both browser environments, HTTP 200, JS on/off, metadata/lang |
| /en | PASS: both browser environments, HTTP 200, JS on/off, metadata/lang |
| /en/works | PASS: both browser environments, HTTP 200, JS on/off, metadata/lang |
| /en/album/test-album | PASS: both browser environments, HTTP 200, JS on/off, metadata/lang |
| /en/performance/test-performance | PASS: both browser environments, HTTP 200, JS on/off, metadata/lang |

## Host-specific acceptance cases

- [x] All 13 existing routes end at HTTP 200 from actual static HTML with JS on/off.
- [ ] /cho-youn-kyoung-v2 and /cho-youn-kyoung-v2/ resolve consistently. Record actual status and Location.
- [x] /works returns one 301 to /works/, then HTTP 200; slash form returns 200.
- [x] Tested latest user variants /works?test=1, /works#test and /works?test=1#test; preserved.
- [ ] If /works/index.html is publicly reachable, assess duplicate URL/canonical handling.
- [x] Latest required /not-a-real-page returns HTTP 404 with JS on/off; client /missing-route/ refresh also returns 404.
- [ ] Unknown KO/EN album and performance slugs return HTTP 404; no fallback that impersonates a valid page.
- [x] Default Pages 404 body/title and JS-disabled screenshot saved. No custom 404 created.
- [x] No rewrite; generated SPA fallback excluded from published artifact.
- [ ] Exact case/encoded-path behavior: /Works, /album/TEST-ALBUM and malformed/encoded paths. Do not assume Windows case behavior matches Pages.
- [x] All manifest assets return 200, correct MIME and exact hashes; browser navigation loads route chunks successfully.
- [x] Every route has working base-aware links; direct JS-off documents and hydrated per-route links/back/forward pass.
- [x] No captured browser/page/HTTP errors during valid-route navigation; deployed file hashes match.
- [ ] Test an updated artifact for stale-cache behavior; record cache headers and any limitations without adding a broad cache subsystem.
- [x] All current 13 fixtures are explicitly enumerated; future production slugs must extend that inventory.

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
