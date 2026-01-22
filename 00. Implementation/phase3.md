# PHASE-3: Manifest (Fillable) + Command Resolution Standard

- Phase ID: PHASE-3

## Files
### `/.repo/repo.manifest.yaml` (yaml)
```yaml
# /.repo/repo.manifest.yaml
# SOURCE OF TRUTH for executable commands + verification profiles.
# RULE: Agents MUST NOT guess commands. If unknown, set <UNKNOWN> and open HITL.

repo:
  ships: true
  ship_kind: user_facing_app
  release_protects: [app_stability, login_security, money_flows]

prerequisites:
  package_manager: npm
  runtime_pinned: true
  platform_tools_required_for_release: true

# Canonical commands (names are fixed). Fill values by following /.repo/docs/standards/manifest.md
# Placeholders:
# - <UNKNOWN> = cannot determine from repo contents. Must create HITL item and stop on that portion.
# - <FILL_FROM_REPO> = deterministically discoverable from repo; fill before merge (or waiver if allowed).
commands:
  install: "<FILL_FROM_REPO>"
  check:quick: "<FILL_FROM_REPO>"        # MUST include a fast build for the app
  check:ci: "<FILL_FROM_REPO>"           # quick + required tests + full build
  check:release: "<FILL_FROM_REPO>"      # ci + security + budgets
  check:governance: "<FILL_FROM_REPO>"   # governance-verify (repo local or via node script)
  check:boundaries: "<FILL_FROM_REPO>"   # boundary checker (hybrid)
  check:security: "<FILL_FROM_REPO>"     # dep scan + secrets scan + forbidden patterns

verify_profiles:
  quick: [check:quick]
  ci: [check:ci]
  release: [check:release]
  governance: [check:governance]

tests:
  required_level: unit+integration

budgets:
  mode: both               # bundle + runtime
  enforcement: hard_fail_with_waiver
  fallback_to_default: true
  # defaults live in: /.repo/policy/QUALITY_GATES.md (if repo-specific budgets missing)

security:
  every_pr: true
  release_includes_security: true
  dependency_vulns_always_hitl: true
  secrets_absolute_prohibition: true
  forbidden_patterns_source: "/.repo/policy/SECURITY_BASELINE.md"

boundaries:
  enforcement: hybrid_checker_plus_manifest_edges
  edges_model: layered_allow_list
  # Explicit edges represent allowed exceptions beyond the default import direction.
  # Format: from -> to, with reason + required ADR if cross-feature.
  edges: []
```

### `/.repo/docs/standards/manifest.md` (markdown)
```markdown
# /.repo/docs/standards/manifest.md
This file explains, in plain English, how to fill `/.repo/repo.manifest.yaml` **without guessing**.

## What the manifest is
The manifest is the repo’s **instruction card** for running checks. Agents must run commands exactly as written here.

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
```

## Acceptance criteria
- Manifest exists and includes canonical command names and verify_profiles.
- manifest.md provides a deterministic command resolution process and UNKNOWN handling.

## Handoff notes
- Agents must not guess; use manifest.md resolution steps.
- If multiple commands exist or CI is unclear: set `<UNKNOWN>`, create HITL item, stop on that portion.