# Manifest Reference
## `.repo/repo.manifest.yaml` schema, fields, and usage

**Purpose:** Define the canonical command and governance configuration source of truth for a repository.

**Last Updated:** 2026-01-22  
**Version:** 1.0

---

## Overview

The manifest is the authoritative instruction card for running checks. Agents and CI must execute commands exactly as defined here. If a command cannot be proven from the repo, mark it as `<UNKNOWN>` and open a HITL item.

**Location:** `/.repo/repo.manifest.yaml`  
**Policy reference:** `/.repo/docs/standards/manifest.md`

---

## Top-Level Schema

| Section | Required | Purpose |
| --- | --- | --- |
| `repo` | Yes | Release constraints and shipping context |
| `prerequisites` | Yes | Required runtime/platform assumptions |
| `commands` | Yes | Canonical commands used by verification |
| `verify_profiles` | Yes | Named verification bundles |
| `tests` | Yes | Required test level |
| `budgets` | Yes | Performance/bundle budget policy |
| `security` | Yes | Security execution expectations |
| `boundaries` | Yes | Boundary enforcement mode and exceptions |

Note: The CLI currently validates a subset of fields but the manifest is the full governance source of truth.

---

## `repo`

Describes the shipping posture and the categories of release risk that must be protected.

```yaml
repo:
  ships: true
  ship_kind: user_facing_app
  release_protects: [app_stability, login_security, money_flows]
```

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ships` | boolean | Yes | Whether the repo ships deployable artifacts |
| `ship_kind` | string | Yes | Repository type (`user_facing_app`, `library`, etc.) |
| `release_protects` | string[] | Yes | Risk categories that release must protect |

---

## `prerequisites`

Defines platform and tooling constraints required to run checks.

```yaml
prerequisites:
  package_manager: npm
  runtime_pinned: true
  platform_tools_required_for_release: true
```

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `package_manager` | string | Yes | `npm`, `yarn`, `pip`, `mvn`, `gradle`, etc. |
| `runtime_pinned` | boolean | Yes | Whether runtime versions are pinned |
| `platform_tools_required_for_release` | boolean | Yes | Whether external tools are required for release |

---

## `commands`

Canonical command map used by governance checks. Values must be executable shell strings.

```yaml
commands:
  install: "<FILL_FROM_REPO>"
  check:quick: "<FILL_FROM_REPO>"
  check:ci: "<FILL_FROM_REPO>"
  check:release: "<FILL_FROM_REPO>"
  check:governance: "<FILL_FROM_REPO>"
  check:boundaries: "<FILL_FROM_REPO>"
  check:security: "<FILL_FROM_REPO>"
```

**Required command semantics:**
- `install`: installs dependencies and setup required to run checks.
- `check:quick`: fast sanity check plus a fast build.
- `check:ci`: full correctness check (quick + required tests + full build).
- `check:release`: `check:ci` + security + budgets.
- `check:governance`: governance verification (structure + artifacts + trace schema).
- `check:boundaries`: boundary enforcement.
- `check:security`: dependency + secrets + forbidden patterns.

**Placeholders:**
- `<FILL_FROM_REPO>`: deterministically discoverable; must be replaced before merge.
- `<UNKNOWN>`: only if repo evidence is insufficient; requires HITL and stop.

---

## `verify_profiles`

Named bundles of commands for verification modes.

```yaml
verify_profiles:
  quick: [check:quick]
  ci: [check:ci]
  release: [check:release]
  governance: [check:governance]
```

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `quick` | string[] | Yes | Fast feedback profile |
| `ci` | string[] | Yes | CI-quality profile |
| `release` | string[] | Yes | Release gating profile |
| `governance` | string[] | Yes | Governance integrity profile |

---

## `tests`

Defines the minimum test level required for change acceptance.

```yaml
tests:
  required_level: unit+integration
```

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `required_level` | string | Yes | `unit`, `integration`, `unit+integration`, etc. |

---

## `budgets`

Specifies performance/bundle budget enforcement behavior.

```yaml
budgets:
  mode: both
  enforcement: hard_fail_with_waiver
  fallback_to_default: true
```

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `mode` | string | Yes | `bundle`, `runtime`, or `both` |
| `enforcement` | string | Yes | `hard_fail_with_waiver` or similar policy |
| `fallback_to_default` | boolean | Yes | Use defaults from `QUALITY_GATES.md` if missing |

---

## `security`

Defines security execution policy and its inputs.

```yaml
security:
  every_pr: true
  release_includes_security: true
  dependency_vulns_always_hitl: true
  secrets_absolute_prohibition: true
  forbidden_patterns_source: "/.repo/policy/SECURITY_BASELINE.md"
```

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `every_pr` | boolean | Yes | Run security checks on every PR |
| `release_includes_security` | boolean | Yes | Require security checks on release |
| `dependency_vulns_always_hitl` | boolean | Yes | Create HITL on vulns |
| `secrets_absolute_prohibition` | boolean | Yes | Block on secrets |
| `forbidden_patterns_source` | string | Yes | Source file for patterns |

---

## `boundaries`

Defines the boundary model and explicit exception edges.

```yaml
boundaries:
  enforcement: hybrid_checker_plus_manifest_edges
  edges_model: layered_allow_list
  edges: []
```

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `enforcement` | string | Yes | Boundary enforcement method |
| `edges_model` | string | Yes | Allowed-edge model |
| `edges` | array | Yes | Explicit exception edges with reasons |

**Edge format (recommended):**
```yaml
edges:
  - from: "src/sales/checkout/ui"
    to: "src/sales/checkout/domain"
    reason: "UI needs domain types"
    adr: "docs/adr/0002-checkout-boundary.md"
```

---

## Validation Rules (Human Guidance)

These are policy-level expectations even if not enforced by the CLI yet:

- No required command may remain `<UNKNOWN>` without a completed HITL item.
- Commands must do what their names promise (no misleading shortcuts).
- Boundary exceptions must be explicit edges.
- Security rules in `SECURITY_BASELINE.md` must align with security settings here.

---

## Example Minimal Filled Manifest

```yaml
repo:
  ships: true
  ship_kind: user_facing_app
  release_protects: [app_stability, login_security]

prerequisites:
  package_manager: npm
  runtime_pinned: true
  platform_tools_required_for_release: false

commands:
  install: "npm install"
  check:quick: "npm run lint && npm test"
  check:ci: "npm run lint && npm test && npm run build"
  check:release: "npm run lint && npm test && npm run build && npm run security:scan"
  check:governance: "node scripts/governance-verify.js"
  check:boundaries: "node scripts/check-boundaries.js"
  check:security: "npm run security:scan"

verify_profiles:
  quick: [check:quick]
  ci: [check:ci]
  release: [check:release]
  governance: [check:governance]

tests:
  required_level: unit+integration

budgets:
  mode: both
  enforcement: hard_fail_with_waiver
  fallback_to_default: true

security:
  every_pr: true
  release_includes_security: true
  dependency_vulns_always_hitl: true
  secrets_absolute_prohibition: true
  forbidden_patterns_source: "/.repo/policy/SECURITY_BASELINE.md"

boundaries:
  enforcement: hybrid_checker_plus_manifest_edges
  edges_model: layered_allow_list
  edges: []
```

---

## Related Documentation

- `docs/reference/CLI_REFERENCE.md`
- `docs/reference/POLICY_REFERENCE.md`
- `docs/reference/PRINCIPLES_REFERENCE.md`
- `templates/.repo/docs/standards/manifest.md`

