# P0E — CI Quality Gates + Delivery Contract

2026-09-05 · COMPLETE: local Full, actual Fast/Full CI, preview deployment and live verification passed.
Only V2 foundation delivery is in scope. P0F and HOME/product implementation are not started.

## 1. What was changed

Connected the existing P0C/P0D contracts to shared Fast and Full gates. Push/PR runs Fast; preview
deployment is now explicit, defaults off, requires an exact reviewed SHA and successful Full gate.
Architecture, application source, locale/metadata semantics and deterministic placement are unchanged.

## 2. Files changed

- .github/workflows/ci.yml — new Fast push/PR entry point.
- .github/workflows/quality-gates.yml — new shared gate implementation, workflow validation and conditional artifact upload.
- .github/workflows/pages.yml — manual Full/preview delivery, SHA/ref guard, dependency-gated deploy and live verification.
- package.json — gate:fast and gate:full commands; dependencies/lockfile unchanged.
- playwright.config.ts — Linux Chromium/local Edge selection and persisted JSON report; assertions unchanged.
- README.md, CODEX-HANDOFF.md, docs/redesign/review/IMPLEMENTATION-TASK-PROTOCOL.md,
  V2-IMPLEMENTATION-PLAN.md and PLANNING-REVISION-LOG.md — current delivery policy/status.
- P0E-RESULT.md and evidence/p0e/ — result and compact evidence.

Approved HOME V2.1 documentation is preserved in a separate commit, bb8460e. P0D was already merged
in cb7605f via PR #1; it was not duplicated as a new local-only change. No legacy files were touched.

## 3. CI gate structure

ci.yml → reusable quality-gates.yml (Fast).
pages.yml request guard → reusable quality-gates.yml (Full) → optional deploy → live verification.
Workflows use pinned action commits, Ubuntu 24.04, Node 24.15.0, npm 11.12.1 and npm ci --include=dev.
Actionlint 1.7.12 is downloaded from its official release with a pinned archive SHA-256 check.

## 4. Fast gate

Every push and PR: workflow syntax/config validation, type-check, lint, 8 locale/metadata contract
tests, 3 placement tests and root production build/prerender/placement. No browser installation or
deployment. Documentation pushes also receive this small gate, avoiding missing required status checks.

## 5. Full/deployment gate

Explicit workflow_dispatch: exact-SHA guard, Fast, project build/placement and all 80 existing browser
tests across both static bases. deploy=false retains reports only. deploy=true additionally uploads
the tested static artifact, deploys from main, then runs the real Pages suite (52 cases for 18 routes).
No continue-on-error, weakened assertions or retries were added. A failed predeploy gate blocks artifact
publication/deployment. Live failure after deployment is reported separately and does not disappear.

## 6. Locale/metadata integration

test:locale checks KO/EN pairing, same-content switch/fallback, self-canonical, reciprocal hreflang,
x-default, unknown paths and future root origin. Both-build browser tests check emitted/hydrated lang,
title/description/canonical/hreflang/OG, direct/refresh/history, assets and real static 404 semantics.
Existing placement code still requires every prerender entry and rejects collisions/unsafe output/maps.

## 7. Delivery contract

WORKING → VALIDATED LOCALLY → REVIEW READY → APPROVED → COMMITTED → PUSHED → optional DEPLOYED.
Each state has explicit evidence and authority in the existing [Task Protocol](docs/redesign/review/IMPLEMENTATION-TASK-PROTOCOL.md).
Already explicit publication/deployment permission can cover the current bounded task. Green checks
never authorize the next task. Skipped validation is labeled skipped, and deployed is distinct from live-verified.

## 8. Commit / push policy

Read status/remote/ref/HEAD and scope; preserve user work; commit related logical changes separately.
The current P0E request explicitly allows necessary commits/push and a justified preview deployment.
HOME documents are one approved commit; CI/delivery is another. Generated reports/builds/caches/secrets
stay ignored. Future tasks follow their actual authorized commit/push/merge scope, not automatic delivery.

## 9. Preview deployment policy

No automatic deployment on push/merge. pages.yml defaults deploy=false, checks expected_sha, and allows
deploy=true only from main. Only the deploy job has Pages/OIDC write access. This is the existing V2
preview URL only; no production CNAME/domain or legacy change. The completed P0E preview run proves
fresh Linux installation, P0D metadata, full static checks, artifact delivery and real-host verification
work together; it is not a deployment for HOME document appearance.

## 10. Tests performed

- Local gate:full: type-check/lint, locale 8/8, placement 3/3, root/project build and browser 80/80 passed.
- Browser: Edge 152.0.4191.62, Windows/Node 24.15.0; 57.4 seconds, no retries or skips.
- actionlint 1.7.12: workflow syntax/config passed locally; Linux embedded-shell checks belong to CI.
- Isolated negative probes: changed expected locale path → exit 1; invalid workflow step → exit 1.
  Originals were untouched; invalid fixtures/logs stay in ignored .checkpoints/p0e-negative/.

## 11. CI result

- Code/deployed SHA: `ea146f629cc2f0de89ed540b0b0747757f4a8011`, pushed to V2 main.
- [Fast CI 33960545431](https://github.com/cij5484/cho-youn-kyoung-v2/actions/runs/33960545431): SUCCESS; quality job 28 seconds, Fast command 7 seconds. No deployment.
- [Full/delivery 33960594951](https://github.com/cij5484/cho-youn-kyoung-v2/actions/runs/33960594951): SUCCESS; guard 3s, Full 96s, deploy 9s, live verification job 64s.
- Linux Chromium: both-base browser 80/80 (44.1s), actual Pages 52/52 (28.4s), zero failed/skipped/flaky tests. Workflow syntax and embedded shell validation passed in CI.
- [V2 preview](https://cij5484.github.io/cho-youn-kyoung-v2/): 18 fixture routes, 28 public files; fetched manifest matches the uploaded manifest and exact SHA. Live suite verified file hashes/MIME and true HTTP 404.
- Pages remains workflow-based with `cname: null`. Evidence is retained in [evidence/p0e](evidence/p0e/README.md).

Approved HOME documentation is commit `bb8460e`; P0D was already merged in `cb7605f` via PR #1.
This result/evidence is a following documentation-only commit. The newer main documentation revision
does not replace deployed `ea146f6`; its push runs Fast only. No second deployment is needed.

## 12. Build / lint / type-check results

Local and actual Linux CI: all passed, including root and project production builds, type-check and lint.
No new npm or runtime/visual dependencies were installed. Actionlint is a checksum-pinned CI validation tool.

## 13. P0C/P0D regression result

Local and Linux CI 80-case suites, original 8+3 contract tests and live Pages 52 cases pass unchanged. Routing/locale source, React Router
config, Vite base config, public assets and static packager are untouched. Core browser test content
is unchanged; only the runner selects Chromium on Linux and stores JSON evidence.

## 14. Known risks

- No branch protection existed at preparation: CI failures are visible but cannot technically prevent direct merges/pushes.
- Manual deploy=true is a technical opt-in, not a substitute for recorded user approval.
- Concurrent branch push and PR can each run Fast; Full remains explicit. External runner/tool download or cache propagation can fail visibly.
- Evidence artifacts expire after 14 days; curated summaries persist. Dirty local manifest HEAD is not a clean source revision.
- Official configure-pages/deploy-pages and upload-pages-artifact's transitive upload-artifact produced Node 20 deprecation annotations while the runner forced Node 24. All jobs succeeded; retain this upstream maintenance issue for a separate bounded update.
- Safari/mobile product visuals, actual content, audio/3D and production custom domain remain outside P0E.

## 15. Documentation updated

The existing Task Protocol is the single current delivery guide; README links commands/state/evidence.
HANDOFF/Plan/Revision Log distinguish P0E from P0F. Historical P0A–D and HOME V2.1 reports remain historical.
No AGENTS.md was created or finalized. This report and compact evidence record actual completed runs,
deployment identity and timing; raw generated reports remain ignored locally and in CI artifacts.

## 16. Recommended next bounded task

P0F — AGENTS.md/documentation wiring for the now-proven foundation, only after explicit user approval.
No implementation of P0F or subsequent phases is authorized by successful delivery. **STOP after P0E report.**
