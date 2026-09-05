# P0E evidence — 2026-09-05

Validated/deployed code: `ea146f629cc2f0de89ed540b0b0747757f4a8011`.
See [P0E result](../../P0E-RESULT.md) and the canonical [Task Protocol](../../docs/redesign/review/IMPLEMENTATION-TASK-PROTOCOL.md).

| Evidence | Result |
|---|---|
| [local.json](local.json) | Windows Edge Full: 80 browser + 8 locale + 3 placement; type/lint/root/project passed; isolated negative probes failed as expected |
| [fast-ci.json](fast-ci.json) | [Fast run 33960545431](https://github.com/cij5484/cho-youn-kyoung-v2/actions/runs/33960545431), SUCCESS; no deploy |
| [full-delivery-ci.json](full-delivery-ci.json) | [Full/delivery run 33960594951](https://github.com/cij5484/cho-youn-kyoung-v2/actions/runs/33960594951), all four jobs SUCCESS |
| [ci-results.json](ci-results.json) | Downloaded report stats: Linux Chromium 80/80 and live Pages 52/52; timings/artifact names and upstream annotations |
| [deployed-manifest.json](deployed-manifest.json) | Public manifest fetched after the run: same SHA, 18 routes, 28 files; equals uploaded project manifest |

Full and live reports are separate SHA-named GitHub artifacts, retained 14 days. Local copies are under
ignored `.checkpoints/p0e-ci/full/` and `.checkpoints/p0e-ci/live/`; HTML reports are in the respective
`playwright-report/` and `playwright-pages-report/` directories. Their JSON files are the source of
ci-results.json, not a rerun or a reuse of old P0C/P0D results.

Actual preview: https://cij5484.github.io/cho-youn-kyoung-v2/ . No production custom domain is connected.
Subsequent documentation-only main commits run Fast but do not change this deployed code SHA.
