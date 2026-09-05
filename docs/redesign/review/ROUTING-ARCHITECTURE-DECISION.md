# Routing Architecture Decision — P0C

2026-09-05 · **APPROVE — React Router + Static Prerender**

P0D update: the user explicitly confirmed this final architecture decision. The [locale/metadata contract](LOCALE-METADATA-CONTRACT.md) now passes 18-route local verification at both bases. P0C evidence below is historical real-host proof; no P0D deployment occurred.

## Decision and authority

The latest explicit P0C user instruction authorized the architecture decision after its real GitHub Pages gate.
That gate passed. Adopt React Router Framework with ssr:false, explicit valid-path prerendering, central base/origin
configuration, and the tested deterministic static artifact packager. No HashRouter or universal SPA recovery.
This decision replaces the earlier conditional architecture state; it does not approve another implementation task.

## Evidence

- Independent public repository: [cij5484/cho-youn-kyoung-v2](https://github.com/cij5484/cho-youn-kyoung-v2).
- Deployment: [V2 Project Pages](https://cij5484.github.io/cho-youn-kyoung-v2/).
- Verified code SHA: 137b3420fda15b9670e109989da54230d959966e.
- [Actions run 33955594780](https://github.com/cij5484/cho-youn-kyoung-v2/actions/runs/33955594780): build, deploy and live verification succeeded.
- Linux CI Chromium 42/42, Windows Edge 42/42; no retries/failures. Local regression 34/34 and placement contracts 3/3.
- [P0C result](../../../P0C-RESULT.md), [curated evidence](../../../evidence/p0c/README.md), [placement/CI contract](../../../P0C-DEPLOYMENT.md).

## Gate assessment

| Criterion | Finding |
|---|---|
| Clean URL | All 13 requested logical routes work at the project prefix; directory-style canonical/link URLs |
| Direct refresh | Every route passed direct and cache-disabled reload in real browsers; final HTTP 200 |
| Real 404 | Four requested unknown paths return HTTP 404 with JS on/off and the host 404 body |
| Project subpath | Correct prefix once in links/assets/metadata; no runtime server or rewrite |
| Static HTML | All route documents render their own heading and metadata with JS disabled |
| SEO foundation | Route title, description, canonical and lang work before/after hydration; preview intentionally noindex |
| KO/EN expansion | KO/EN index/detail samples and locale transitions proven; P0D adds the complete neutral 18-route locale catalog locally; authored translations remain a release gate |
| Maintainability | Official renderer, pinned compatible dependencies; owned packager has deterministic mapping and failure checks |
| CI reproducibility | Fresh Linux lockfile install → checks → both builds → artifact → Pages → remote hash verification succeeded |
| Custom domain migration | Central root base works locally and builds in CI; no-prefix mapping is tested. Real domain/HTTPS cutover is still P14 |
| Future route growth | Placement handles new/deeper paths without per-route copy commands; valid content slugs must be enumerated and rebuilt |

## File placement is an explicit adapter, not a hidden renderer patch

React Router 8.3.1 raw subpath HTML includes basename in its output directory while assets/public files use the client
root. The packager removes that prefix only from the corresponding paths, retains assets/public files, and copies bytes.
It excludes raw fallback, private build manifest, placeholders and source maps. It then records public file hashes and SHA.
Windows contracts and an actual fresh Linux build verified the mapping; the deployed bytes matched every manifest entry.

This is project-owned deployment code, not an officially supplied Pages adapter. It is acceptable here because it is small,
version-pinned, independent of route count/depth, deterministic, tested, and fails when the output contract changes. No
HTML regex edits, manual copies, private dependency APIs, unofficial flags or broad 200 fallback are involved.
Future framework upgrades must rerun these contracts. If they introduce an output shape that cannot be mapped clearly,
STOP and review the architecture instead of layering more recovery logic.

## Remaining boundaries

P0D completes the neutral hreflang/metadata/OG contract locally. The adopted architecture does not complete actual i18n content, final SEO copy/images, production content schemas, audio, 3D,
mobile/Safari testing, custom 404 design, or production domain migration. Every new slug must have a static document.
Separate route-pattern definitions from multiple content slugs when that schema is implemented; the current fixtures are
a spike catalog. Future loaders/.data/resource routes need a representative build/remote test before introduction.
Explicit index.html alias hydration and exhaustive case/malformed-encoding policy were not part of the latest required
gate; links/canonical use clean directory URLs. No support for those aliases is claimed.

P0D was separately approved and completed locally. Recommended next: P0E delivery-check wiring only after explicit approval. **STOP after P0D.**
