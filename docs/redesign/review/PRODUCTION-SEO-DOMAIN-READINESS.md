# Phase 5A — Production SEO and domain readiness

2026-09-13 · IMPLEMENTED LOCALLY / REVIEW READY. No DNS, Pages settings, repository variables,
Search Console or Naver Search Advisor changes. No production launch or indexing result claimed.

## Prior delivery

Phase 4 was merged in [PR36](https://github.com/cij5484/cho-youn-kyoung-v2/pull/36), main
`ceeaa711b59b9e6d416cf35e646f7d90bdaf2186`. Both Fast CI runs passed. Automatic Pages
[run34702442974](https://github.com/cij5484/cho-youn-kyoung-v2/actions/runs/34702442974) passed Fast/build/deploy/public verification;
public build-info returned the same SHA. Phase 5A begins from that revision and is not deployed.

## Page-head and indexing policy

`config/public-site.ts` is the final origin/base owner: `https://choyounkyoung.com`, `/`.
Neutral `config/build.ts` targets retain the invalid test origin and Project Pages base.
`src/seo/content.ts` is a compact factual projection of actual presented records; tests compare Event
facts to owning JSON and album dates to the current catalog. No private server-record import,
fictional promotions, assumed event end times/ticket availability, new translations or new images.

- Every actual public page has title, description, OG and Twitter/X tags in its **initial static HTML**.
  Client navigation updates the same head owner, including Classic iframe message/history navigation.
  The page-local title side effects are removed to prevent stale metadata after lazy route changes.
- Production public pages: `index, follow`. Default Project Pages Preview: `noindex, nofollow`.
- Development Labs and fixtures are absent from production output; unknown URLs use genuine host404.
- Internal `/classic-app/` HTML: `noindex, nofollow`, no primary canonical, absent from sitemap.
  robots excludes direct app paths while allowing rendering CSS/JS/font/image resources.
- Public `/classic/` duplicates remain crawlable so their canonical can be read; do not robots-block
  them or use noindex as a substitute for canonical consolidation.
- Only authored KO is enumerated. `ko` and `x-default` point to the same clean Korean canonical;
  no fictitious English counterpart or hreflang is emitted.
- Existing actual profile JPG, album covers and posters are copied unchanged under `/assets/social/`.
  The social path is independent of JS execution; images are not synthesized or cropped by this pass.
- JSON-LD: Person (individual performer), WebSite on ENTRY, Event on three performances,
  MusicAlbum on four albums. Person references include actual artist identity. No MusicGroup is invented.

Metadata and JSON-LD are static; existing visual body content still renders through the current React
app. This pass does not replace that application with SSR or claim search-engine rendering/indexing
approval. Post-cutover inspection of rendered pages and rich-result tools remains a launch QA step.

## Canonical / sitemap

| Route | Policy |
|---|---|
| `/` | ENTRY self-canonical |
| `/immersive/` | Immersive HOME self-canonical |
| `/immersive/works/`, `/about/`, `/media/`, `/contact/` within Immersive | Distinct public self-canonicals |
| `/immersive/album/:known-id/` (4), `/immersive/performance/:known-id/` (3) | Actual record self-canonicals |
| Matching `/classic/...` | Canonical to the same Immersive record, not all to HOME |
| Existing unprefixed clean aliases | Matching Immersive canonical and the existing client normalization |
| `/performance/`, `/classic/performance/` | WORKS counterpart (the real V1 collection alias) |
| Unknown/test/draft/internal/unauthored EN | No sitemap entry or invented canonical |

Sitemap includes **13** primary URLs: ENTRY + Immersive HOME/WORKS/ABOUT/MEDIA/CONTACT + 4 albums +
3 performances. No Classic duplicates, bare aliases, previews, fixtures, internal app or query/hash URLs.
No fabricated lastmod. Primary URL tags, canonical and OG URL agree. robots declares the production sitemap.

## Existing URLs and limits

Read-only live audit: V1 robots200 allows crawling; its sitemap200 contains root only. V1 uses HashRouter:
`/#/works`, `/#/performance` (WORKS alias), `/#/about`, `/#/media`, `/#/contact`, and seven detail IDs.
Clean `/works/` and `/performance/` returned404 on V1. This is a source/HTTP inventory, **not a Search Console
indexed-URL export**. Unknown historic inbound URLs cannot be claimed preserved.

Known `/#/...` bookmarks now resolve to their exact Immersive counterpart using a one-time browser URL
normalization, sharing the existing clean-bookmark behavior. Unknown fragments and scene anchors are left
alone. Fragments never reach the HTTP server; this is **not a301**. No meta-refresh, fabricated server
redirect, wildcard200 fallback or catch-all copied index is added. GitHub Pages does directory/slash redirects,
but arbitrary old-route301 rules require a separately chosen redirect-capable host/proxy later.

Six V1 poster/leaflet PDFs retain their exact root `/assets/performances/{slug}/downloads/{poster|leaflet}.pdf`
paths in production. They are copied from the already-pinned Classic build, byte-identical, so the restored
absolute download links remain valid after domain transfer. This does not copy the entire legacy assets tree
to the new public root. Internal Classic still uses its own `/classic-app/` files.

## Build and workflow

- `npm run build:production`: builds `build-production/` at root base, using the existing pinned Classic checkout.
- `npm run test:production-artifact`: checks actual generated HTML, social resources, sitemap, exclusions and PDF hashes.
- `npm run preview:production`: strict local directory/file server at `http://127.0.0.1:4185/`, without SPA fallback.
- `npm run build:development-preview`: remains Project Pages Preview and noindex.
- `production-readiness.yml`: manual exact-SHA Fast + production build + artifact checks; retains an artifact,
  **does not deploy or change domain settings**.
- `pages.yml`: default repository variable `PAGES_SITE_MODE` is absent/`preview`. Future explicit `production`
  selection builds/uploads production instead. Read-only preflight must match the existing Pages custom-domain
  setting to the chosen mode; mismatches stop before artifact deployment. Main automation otherwise retains Fast.
- `release.yml`: manual Full Release Gate unchanged. Readiness success is not a replacement for that release gate.
- Mode switches only extend existing product-runtime availability checks for details/audio/transitions;
  no timings, design, visible page content, Three.js/motion parameters or Phase 2 loading strategy were changed.

## Human cutover — separately approved later

1. Approve this revision, deliver the readiness code and obtain the intended exact-SHA release/launch checks.
   Preserve the last verified Preview and legacy source revision for rollback.
2. Confirm domain ownership and coordinate the existing Pages domain assignment: legacy repository currently
   owns `choyounkyoung.com`; V2 has `cname:null`. Remove/transfer that Pages assignment to V2 in the planned cutover
   window. Inspect apex/www DNS first; both repositories use the same GitHub account, so do not assume DNS changes
   are required. Verify HTTPS/certificate and preferred apex/www behavior.
3. Set V2 repository variable `PAGES_SITE_MODE=production` together with the domain assignment, then dispatch
   `pages.yml` on the approved main revision. The consistency check deliberately prevents deploying the wrong
   base in either direction. This cannot be made an atomic DNS/Pages switch by a local code change.
4. Confirm build-info SHA/mode, ENTRY, both Editions, direct detail refresh, audio/images/PDFs, robots, sitemap,
   canonical/social tags and actual missing404 on the live domain. Then perform external search registration
   and rendered URL/rich-result inspection as a separately authorized task.

A repository **CNAME file is not the switch**: GitHub Actions Pages publishing ignores it. Domain assignment
lives in Settings → Pages; no CNAME file/settings were changed here. After transfer one repository cannot keep
separate custom-domain and Project Pages artifacts simultaneously: the default GitHub Pages address routes to
its custom domain. Continued independent noindex preview hosting would need another deployment destination.
Rollback must coordinate domain assignment and `PAGES_SITE_MODE`, not merely replace one HTML file.

## Verification

- Local Fast Gate passed, including existing fixture/content/locale checks and ten new SEO contracts.
- Type-check, lint and actionlint passed; no Full browser suite requested/run for this preparation task.
- Production artifact checks: five tests passed (13primary pages, all aliases, actual assets/PDFs, real404/internal policy).
- Production and Project Pages Preview build checked separately. Existing large-chunk warning retained;
  no thresholds or tests weakened. Production artifact approximately743MiB, below Pages'1GB published-site limit.
- Browser: real root-base performance render; Immersive page-to-page head updates; Classic same-origin iframe
  route-to-head update; known V1 hash-to-WORKS bookmark verified. Native Safari/physical devices not claimed.

## Primary references

- [Google canonical guidance](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
- [Google JavaScript SEO](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics)
- [Google site moves](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes)
- [GitHub custom domains and Actions CNAME behavior](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
- [GitHub Pages limits](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits)
- [Schema.org Person](https://schema.org/Person), [MusicAlbum](https://schema.org/MusicAlbum), [Google Event](https://developers.google.com/search/docs/appearance/structured-data/event)

STOP after Phase5A report; no domain switch, external registrations or automatic next task.
