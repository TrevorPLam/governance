# /.repo/docs/standards/manifest.md
This file explains, in plain English, how to fill `/.repo/repo.manifest.yaml` **without guessing**.

## What the manifest is
The manifest is the repo's **instruction card** for running checks. Agents must run commands exactly as written here.

## Non-negotiable rule
If you cannot prove the correct command from the repo itself, set the value to `<UNKNOWN>`, create a HITL item, and stop on that portion.

## Command Resolution Process (do this in order)
For each command in `commands:` (install, check:quick, check:ci, check:release, check:governance, check:boundaries, check:security):

1) Look for `package.json` scripts that already do the job.
   - Prefer scripts named like: install/setup, lint, typecheck, test, build, verify, security, audit.
2) Look for a Makefile, Taskfile, or `scripts/` folder command wrappers.
3) Look at existing CI config (GitHub Actions, etc.) to see what it runs.
4) Look at README or /docs instructions.
5) If more than one candidate exists:
   - Choose the one used in CI (most authoritative).
   - If CI is inconsistent or unclear → `<UNKNOWN>` + HITL.

## What each command must accomplish (plain English)
- `install`: installs dependencies and any required setup steps to run checks.
- `check:quick`: fast sanity check **plus a fast build** of the app.
- `check:ci`: full correctness check = quick + required tests + full build.
- `check:security`: runs dependency scan + secrets scan + forbidden pattern scan.
- `check:release`: ci + security + budgets (bundle/perf). This protects users, login/security, and money flows.
- `check:boundaries`: runs boundary enforcement (hybrid checker) and fails on violations unless ADR/waiver rules apply.
- `check:governance`: runs governance verification (structure + required artifacts + logs/trace schema + HITL/waivers).

## Placeholders
- `<FILL_FROM_REPO>`: you must replace it before merging governance adoption PR.
- `<UNKNOWN>`: allowed only when the repo does not contain enough information. Must open HITL and stop.

## What blocks merge
- Any PR that claims compliance but leaves required commands as `<UNKNOWN>` without a completed HITL item (or a valid waiver, if policy allows).
- Any command that is present but does not do what the manifest promises.

## Minimal acceptance check after filling the manifest
- Running the manifest commands locally (or in CI) succeeds for quick/ci/governance.
- release succeeds or fails with a clear waiverable reason (budgets) or HITL reason (security vulnerabilities).
