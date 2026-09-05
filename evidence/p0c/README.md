# P0C curated verification evidence

Verified deployment: **137b3420fda15b9670e109989da54230d959966e**.
Actual origin: https://cij5484.github.io/cho-youn-kyoung-v2/.

| File | Source and scope |
|---|---|
| github-actions.json | GitHub API snapshot of run 33955594780; successful build/deploy/verify and job times |
| linux-ci-chromium.json | All 42 test results and JSON attachments extracted from that run's downloaded Playwright report |
| windows-edge.json | All 42 test results and JSON attachments from the separate local Edge run against real Pages |
| real-pages-neutral.png | Actual live neutral WORKS screen after internal navigation/history |
| github-404-js-disabled.png | Actual GitHub Pages 404 body with JavaScript disabled |

The JSON attachments include each route's direct/refresh/metadata results, URL-variant redirects, unknown HTTP status,
and the deployed build manifest plus every file's observed status, MIME, ETag, Cache-Control, Age and Last-Modified.
They omit local temporary paths. These are curated review records, not the temporary Playwright output directories.

Full CI HTML/JSON report is available in the
[Actions artifact](https://github.com/cij5484/cho-youn-kyoung-v2/actions/runs/33955594780)
named pages-verification-137b3420fda15b9670e109989da54230d959966e, retained for 14 days.
The full downloaded copy remains locally under .checkpoints/p0c-ci/ and is excluded from Git.
Local HTML report: playwright-pages-report/index.html (also excluded from Git and Pages).

None of these reports/screenshots is uploaded as website content. The published artifact contains only 23 unchanged
prerender/asset files plus build-info.json. The small public SVG and neutral navigation are intentional spike fixtures.
