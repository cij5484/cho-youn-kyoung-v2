# P0D saved evidence

2026-09-05 · Local working-tree verification on baseline `2be1162`.

- [verification.json](verification.json): 80 browser case outcomes, source SHA-256 hashes, runtime/check results,
  and the extracted lang/head metadata of all 36 static documents (18 per base).
- [Root neutral shell](root-neutral-shell.png), [Project-base neutral shell](pagesPreview-neutral-shell.png):
  screenshots from the passing hydrated navigation tests. These are test labels, not approved page design.
- Full generated browser report: `C:/choyounkyoung-v2/playwright-report/index.html`.
- Full generated JSON: `C:/choyounkyoung-v2/test-results/p0d-results.json`.

Edge 152.0.4191.62, Node 24.15.0, Windows. Browser run: 80 passed, 0 failed/skipped/flaky, no retries,
55.7 seconds. Locale tests 8/8 and original placement tests 3/3 passed; type-check/lint/both builds passed.
Build outputs are ignored, and the curated evidence is kept separately from temporary reports.

This is not real GitHub Pages evidence. No new deployment or CI run was performed. Existing P0C live
results remain historical under `evidence/p0c/`; they do not prove the new P0D artifact is deployed.
The dirty local build manifest records the baseline HEAD, so use these source hashes to identify the
tested working-tree code. Never use that baseline value as an EXPECTED_DEPLOY_SHA for a P0D deployment.
