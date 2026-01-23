<!-- GOVERNANCE_VERSION: 1.0.0 -->
<!-- GOVERNANCE: UPDATEABLE - Layer 2 -->

# /.repo/policy/QUALITY_GATES.md
Quality Gates are the merge rules. governance-verify enforces them.

## Merge policy
Policy: soft block with auto-generated waivers for waiverable gate failures.
Meaning: if a waiverable gate fails, a waiver is generated and must be approved/expired rules apply.

## Hard gates (must pass; not waiverable)
These are "governance integrity" gates. If these fail, the repo is not self-governing.
- Required artifacts are missing for the declared change type (Task Packet, required logs, trace, ADR/HITL when triggered).
- Trace log is missing or invalid against /.repo/templates/AGENT_TRACE_SCHEMA.json.
- Required HITL items are not Completed (or validly waived where policy allows).
- Waiver referenced is missing or expired.
- governance-verify fails.

## Waiverable gates (waiver required when failing)
- Coverage targets (gradual ratchet).
- Performance/bundle budgets (strict with fallback to default).
- Warning budgets (zero warnings; waiver required if warnings exist).
Note: waivers must be rare + temporary.

## Coverage strategy: gradual ratchet
- Do not require perfection immediately.
- Each change should improve coverage or keep it from regressing.
- Over time, the minimum bar rises.

## Performance budgets: strict with fallback to default
- Repo may define explicit budgets.
- If missing, use the default budgets described in this file (or referenced standard).
- If budgets are exceeded: fail + require waiver + remediation plan.

## Warnings: zero warnings
Warnings are treated as failures. If a warning exists, it must be fixed or waived.

## PR size policy: no limits
No hard PR size limits. Constitution still requires decomposition into shippable increments.

## Required checks
governance_verify_checks: all
Meaning: governance-verify checks everything it knows how to check for this repo type.
