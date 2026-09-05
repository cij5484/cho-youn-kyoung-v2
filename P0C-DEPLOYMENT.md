# P0C deployment and static placement contract

Only cij5484/cho-youn-kyoung-v2 and its neutral preview artifact are authorized here.
The production legacy repository and choyounkyoung.com are outside this task.

## Reproducible pipeline

.github/workflows/pages.yml uses pinned action commits, Ubuntu 24.04, Node 24.15.0 and npm 11.12.1.
It installs from package-lock.json with dev dependencies, runs type-check/lint/placement contracts,
builds root and project targets, uploads only build-pages-preview/static/, and deploys via the official
GitHub Pages actions. A separate job runs live Playwright checks against the configured Pages origin.
HTML/JSON evidence is retained as a GitHub Actions artifact for 14 days; curated P0C evidence is kept in the repository.

The workflow follows [GitHub custom Pages workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).
Documentation-only commits do not redeploy; the deployed code SHA may therefore differ from main's latest report commit.
There is no gh-pages branch, manual file move, universal SPA rewrite, production CNAME or server deployment.

## Why placement is necessary

React Router 8.3.1 officially prerenders each request under basename, producing a raw layout such as:

| Raw client/ path | Assembled static/ path |
|---|---|
| cho-youn-kyoung-v2/index.html | index.html |
| cho-youn-kyoung-v2/works/index.html | works/index.html |
| cho-youn-kyoung-v2/album/test-album/index.html | album/test-album/index.html |
| cho-youn-kyoung-v2/en/album/test-album/index.html | en/album/test-album/index.html |
| assets/*.js or *.css | assets/*.js or *.css |
| spike/path-check.svg | spike/path-check.svg |
| .vite/manifest.json, .gitkeep | Excluded |
| index.html serving as subpath SPA fallback | Excluded; raw evidence stays in client/ |

GitHub mounts the artifact root at the repository prefix. Publishing the raw client/ folder adds that prefix
twice to HTML paths, while publishing only the nested folder loses assets. The placement step reconciles these
two output roots. It does not edit HTML, duplicate a homepage, monkey-patch a renderer or use an unofficial flag.
The official renderer remains responsible for document content. P0B observed this behavior and the upstream
[basename output discussion](https://github.com/remix-run/react-router/discussions/15000) describes the same layout concern.

## Mapping and failure rules

scripts/router.mjs invokes the official build, then package-static.mjs. static-layout.mjs maps sorted source paths:
strip exactly the configured basename from prefixed route output; retain generated assets/public files.
The same deterministic mapping runs on Windows and Linux. Identical input and commit produce the same manifest,
without timestamps or machine-local paths. File content is copied byte-for-byte.

Fail before replacing the previous static artifact if a route document is missing, paths collide, paths escape
their namespace, unexpected unprefixed output appears, or a source map would be exposed. Reject symlinks in source
enumeration. Output replacement is limited to the selected workspace build/static directory.
build-info.json records full commit, target, base, route inventory and every published file's size/SHA256.
The live test compares these against the actual remote responses, so a cached 200 is insufficient evidence.

The synthetic placement contracts add previously unseen KO/EN nested slugs without changing mapping code,
reverse input order to verify stable mapping, test both bases, and reject collision/missing/unsafe layouts.
Future route depth/count does not require a hand-maintained copy list. Every valid slug still must enter the
prerender inventory. When production data supports multiple slugs per route pattern, route definitions must be
deduplicated separately from the content inventory; that schema is not implemented by this deployment task.
Future loaders/.data and resource routes must add a representative build/remote contract before adoption.

## Root/custom domain migration

The central root target uses base /. Its route output is already aligned, so the same packager performs no prefix
stripping. Asset paths and canonical origin come from config/build.ts. The root build remains part of CI.
Changing the actual domain requires the later explicitly approved domain task; P0C changes no DNS/CNAME/HTTPS setting.
The packager can stay as an artifact-validation boundary at root. If an upstream version later emits flat subpath
HTML, the current unknown/missing checks should fail; review and simplify mapping after rerunning its contracts.

## Cache and verification usage

For an exact deployment SHA, PowerShell:

```powershell
$env:EXPECTED_DEPLOY_SHA = '<full deployed commit SHA>'
npm.cmd run test:pages
```

This reads https://cij5484.github.io/cho-youn-kyoung-v2/ and starts no local server.
The live suite first polls build-info.json with no-cache and a commit query, then verifies the canonical URL and
every deployed file's hash/MIME/cache headers. Hard refresh cases disable browser cache through Chromium's CDP.
An obsolete/mixed deployment fails identity/hash checks. Cache-Control, ETag, Age and Last-Modified observations
are saved in the test attachments; their actual Pages values belong in the P0C result report.

Local regression tests remain separate: npm run build, npm run build:pages-preview, npm run test:spike.
Do not pass a local HTTP success off as actual Pages proof. Site test fixtures remain noindex/nofollow.
Source maps, test reports, source files, planning documents, node_modules and raw server output are not Pages artifacts.

## Status and rollback

Architecture decision: APPROVE. The real-host gate passed in Linux Chromium (42/42) and Windows Edge (42/42).
Verified deployment: 137b3420fda15b9670e109989da54230d959966e. See P0C-RESULT.md and the planning ADR for evidence and remaining product/locale gates.
Checkpoint f71924f preserves the approved P0B source/planning baseline. Any rollback must stay within the V2
repository/environment and preserve evidence; it must not affect the legacy production repository.
P0D and later tasks require new explicit user approval. STOP after P0C reporting.
