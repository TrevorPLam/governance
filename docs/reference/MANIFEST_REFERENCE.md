# Manifest Reference

**Document Type:** Reference  
**Audience:** Developers, DevOps Engineers  
**Last Updated:** 2026-01-22

---

## Overview

The `repo.manifest.yaml` file is the **source of truth** for all executable commands and verification profiles in a governed repository. It defines how to build, test, verify, and release your code in a deterministic way.

**Location:** `/.repo/repo.manifest.yaml`

**Purpose:**
- Define canonical commands for all verification steps
- Prevent command guessing by agents
- Enable deterministic CI/CD execution
- Configure governance policies and enforcement

---

## Complete Schema Reference

### Top-Level Structure

```yaml
repo:
  # Repository shipping configuration
  
prerequisites:
  # Required tools and dependencies
  
commands:
  # Canonical command definitions
  
verify_profiles:
  # Named verification workflows
  
tests:
  # Test requirements
  
budgets:
  # Performance and bundle size limits
  
security:
  # Security enforcement configuration
  
boundaries:
  # Architectural boundary enforcement
```

---

## Section: `repo`

Defines what the repository produces and what it protects.

### Fields

#### `ships` (required)
- **Type:** Boolean
- **Description:** Whether this repository ships a product to users
- **Values:**
  - `true` - Repository produces a deployable product
  - `false` - Internal library, tool, or non-shipping code
- **Example:**
  ```yaml
  repo:
    ships: true
  ```

#### `ship_kind` (required if `ships: true`)
- **Type:** String
- **Description:** Type of product being shipped
- **Values:**
  - `user_facing_app` - Application with user interface
  - `api_service` - Backend API or service
  - `library` - Shared library or package
  - `cli_tool` - Command-line tool
  - `infrastructure` - Infrastructure as code
- **Example:**
  ```yaml
  repo:
    ships: true
    ship_kind: user_facing_app
  ```

#### `release_protects` (required if `ships: true`)
- **Type:** Array of strings
- **Description:** Critical user protections this release must maintain
- **Common Values:**
  - `app_stability` - Application must remain stable
  - `login_security` - Authentication security is critical
  - `money_flows` - Financial transactions are involved
  - `user_data` - Personal user data is handled
  - `system_availability` - Service uptime is critical
- **Example:**
  ```yaml
  repo:
    ships: true
    ship_kind: user_facing_app
    release_protects: [app_stability, login_security, money_flows]
  ```

---

## Section: `prerequisites`

Defines required tools and environment setup.

### Fields

#### `package_manager` (required)
- **Type:** String
- **Description:** Package manager used by the repository
- **Values:** `npm`, `yarn`, `pnpm`, `pip`, `poetry`, `maven`, `gradle`, `cargo`, `go mod`, etc.
- **Example:**
  ```yaml
  prerequisites:
    package_manager: npm
  ```

#### `runtime_pinned` (optional)
- **Type:** Boolean
- **Description:** Whether runtime version is pinned (e.g., Node.js version in `.nvmrc`)
- **Default:** `false`
- **Example:**
  ```yaml
  prerequisites:
    runtime_pinned: true
  ```

#### `platform_tools_required_for_release` (optional)
- **Type:** Boolean
- **Description:** Whether platform-specific tools are required for release builds
- **Default:** `false`
- **Example:**
  ```yaml
  prerequisites:
    platform_tools_required_for_release: true
  ```

---

## Section: `commands`

Defines canonical commands that agents and CI/CD must execute. These names are **fixed** and **non-negotiable**.

### Command Names (Fixed)

All command names are predefined. You fill in the **values**, not the names.

#### `install` (required)
- **Type:** String
- **Description:** Installs dependencies and performs required setup
- **Must Accomplish:**
  - Install all dependencies
  - Run any necessary setup scripts
  - Prepare environment for running checks
- **Placeholders:**
  - `<FILL_FROM_REPO>` - Must be replaced before merge
  - `<UNKNOWN>` - Cannot determine; requires HITL
- **Examples:**
  ```yaml
  commands:
    install: "npm ci"
  ```
  ```yaml
  commands:
    install: "yarn install --frozen-lockfile"
  ```
  ```yaml
  commands:
    install: "pip install -r requirements.txt"
  ```

#### `check:quick` (required)
- **Type:** String
- **Description:** Fast sanity check **including a fast build** of the app
- **Must Accomplish:**
  - Run fast linters
  - Perform type checking
  - Execute a fast build to verify code compiles
- **Typical Duration:** < 2 minutes
- **Examples:**
  ```yaml
  commands:
    check:quick: "npm run lint && npm run typecheck && npm run build:fast"
  ```
  ```yaml
  commands:
    check:quick: "make quick-check"
  ```

#### `check:ci` (required)
- **Type:** String
- **Description:** Full correctness check = quick + required tests + full build
- **Must Accomplish:**
  - Everything in `check:quick`
  - Run all required tests (unit + integration)
  - Execute full production build
- **Typical Duration:** 5-15 minutes
- **Examples:**
  ```yaml
  commands:
    check:ci: "npm run lint && npm run typecheck && npm test && npm run build"
  ```
  ```yaml
  commands:
    check:ci: "make ci"
  ```

#### `check:release` (required)
- **Type:** String
- **Description:** ci + security + budgets. Protects users, security, and critical flows
- **Must Accomplish:**
  - Everything in `check:ci`
  - Everything in `check:security`
  - Verify performance budgets
  - Verify bundle size budgets
- **Typical Duration:** 10-30 minutes
- **Examples:**
  ```yaml
  commands:
    check:release: "npm run ci && npm run security-scan && npm run check-budgets"
  ```

#### `check:governance` (required)
- **Type:** String
- **Description:** Runs governance verification
- **Must Accomplish:**
  - Verify governance structure exists
  - Check required artifacts are present
  - Validate HITL/waiver states
  - Verify logs/trace schema compliance
- **Examples:**
  ```yaml
  commands:
    check:governance: "governance-verify"
  ```
  ```yaml
  commands:
    check:governance: "node scripts/verify-governance.js"
  ```

#### `check:boundaries` (required)
- **Type:** String
- **Description:** Runs architectural boundary enforcement
- **Must Accomplish:**
  - Check layer violations
  - Verify import rules
  - Validate cross-feature dependencies
  - Fail on violations unless ADR/waiver exists
- **Examples:**
  ```yaml
  commands:
    check:boundaries: "boundary-check"
  ```
  ```yaml
  commands:
    check:boundaries: "npm run boundaries"
  ```

#### `check:security` (required)
- **Type:** String
- **Description:** Runs security scans
- **Must Accomplish:**
  - Dependency vulnerability scan
  - Secrets scan
  - Forbidden pattern scan
  - Fail on critical issues
- **Examples:**
  ```yaml
  commands:
    check:security: "npm audit && npm run scan-secrets && npm run check-patterns"
  ```
  ```yaml
  commands:
    check:security: "make security-check"
  ```

### Command Resolution Rules

When filling commands, follow this process **in order**:

1. **Look for package.json scripts** (or equivalent)
   - Prefer scripts named: `install`, `setup`, `lint`, `typecheck`, `test`, `build`, `verify`, `security`, `audit`

2. **Look for Makefile, Taskfile, or scripts/ folder**
   - Check for command wrappers that match the canonical names

3. **Look at existing CI config**
   - GitHub Actions, GitLab CI, etc.
   - Use what CI already runs (most authoritative)

4. **Look at README or docs**
   - Installation and testing instructions

5. **If multiple candidates exist:**
   - Choose the one used in CI (most authoritative)
   - If CI is inconsistent or unclear → `<UNKNOWN>` + HITL

6. **If no candidate exists:**
   - Set `<UNKNOWN>`
   - Create HITL item
   - Stop on that portion

### Placeholders

#### `<FILL_FROM_REPO>`
- **Meaning:** Command is determinable from repository contents
- **Action:** Must be replaced before merge
- **Usage:** Temporary placeholder during initial setup

#### `<UNKNOWN>`
- **Meaning:** Cannot determine correct command from repository
- **Action:** Create HITL item and stop
- **Usage:** When repository lacks sufficient information
- **Merge Blocking:** PR cannot merge with `<UNKNOWN>` without completed HITL or waiver

---

## Section: `verify_profiles`

Defines named verification workflows that combine multiple checks.

### Purpose
- Group related checks into profiles
- Enable different verification levels
- Support fast feedback loops

### Standard Profiles

#### `quick`
- **Type:** Array of command names
- **Description:** Fast feedback loop
- **Typical Commands:** `[check:quick]`
- **Use Case:** Pre-commit, local development
- **Example:**
  ```yaml
  verify_profiles:
    quick: [check:quick]
  ```

#### `ci`
- **Type:** Array of command names
- **Description:** Full correctness check
- **Typical Commands:** `[check:ci]`
- **Use Case:** Pull request validation
- **Example:**
  ```yaml
  verify_profiles:
    ci: [check:ci]
  ```

#### `release`
- **Type:** Array of command names
- **Description:** Complete release validation
- **Typical Commands:** `[check:release]`
- **Use Case:** Release branches, deployment
- **Example:**
  ```yaml
  verify_profiles:
    release: [check:release]
  ```

#### `governance`
- **Type:** Array of command names
- **Description:** Governance compliance check
- **Typical Commands:** `[check:governance]`
- **Use Case:** Governance audits
- **Example:**
  ```yaml
  verify_profiles:
    governance: [check:governance]
  ```

### Custom Profiles

You can define additional profiles:

```yaml
verify_profiles:
  quick: [check:quick]
  ci: [check:ci]
  release: [check:release]
  governance: [check:governance]
  security-only: [check:security]
  full: [check:ci, check:security, check:boundaries, check:governance]
```

---

## Section: `tests`

Defines test requirements and expectations.

### Fields

#### `required_level` (required)
- **Type:** String
- **Description:** Minimum required testing level
- **Values:**
  - `unit` - Unit tests only
  - `unit+integration` - Unit and integration tests
  - `unit+integration+e2e` - Full test pyramid
- **Example:**
  ```yaml
  tests:
    required_level: unit+integration
  ```

---

## Section: `budgets`

Defines performance and bundle size limits.

### Fields

#### `mode` (required)
- **Type:** String
- **Description:** What budgets to enforce
- **Values:**
  - `bundle` - Bundle size only
  - `runtime` - Runtime performance only
  - `both` - Both bundle and runtime
  - `none` - No budget enforcement
- **Example:**
  ```yaml
  budgets:
    mode: both
  ```

#### `enforcement` (required)
- **Type:** String
- **Description:** How to enforce budget violations
- **Values:**
  - `hard_fail` - Budget violation blocks merge (no waivers)
  - `hard_fail_with_waiver` - Blocks merge, but waiver allowed
  - `warning` - Log warning but don't block
- **Example:**
  ```yaml
  budgets:
    enforcement: hard_fail_with_waiver
  ```

#### `fallback_to_default` (optional)
- **Type:** Boolean
- **Description:** Use default budgets if repo-specific budgets missing
- **Default:** `true`
- **Note:** Defaults are defined in `/.repo/policy/QUALITY_GATES.md`
- **Example:**
  ```yaml
  budgets:
    fallback_to_default: true
  ```

#### `bundle_limits` (optional)
- **Type:** Object
- **Description:** Custom bundle size limits
- **Example:**
  ```yaml
  budgets:
    mode: both
    enforcement: hard_fail_with_waiver
    bundle_limits:
      main: 250kb
      vendor: 500kb
      total: 750kb
  ```

#### `runtime_limits` (optional)
- **Type:** Object
- **Description:** Custom runtime performance limits
- **Example:**
  ```yaml
  budgets:
    mode: both
    enforcement: hard_fail_with_waiver
    runtime_limits:
      first_contentful_paint: 1.5s
      time_to_interactive: 3.0s
      largest_contentful_paint: 2.5s
  ```

---

## Section: `security`

Defines security enforcement configuration.

### Fields

#### `every_pr` (required)
- **Type:** Boolean
- **Description:** Run security checks on every PR
- **Recommended:** `true`
- **Example:**
  ```yaml
  security:
    every_pr: true
  ```

#### `release_includes_security` (required)
- **Type:** Boolean
- **Description:** Include security checks in release validation
- **Recommended:** `true`
- **Example:**
  ```yaml
  security:
    release_includes_security: true
  ```

#### `dependency_vulns_always_hitl` (required)
- **Type:** Boolean
- **Description:** Always escalate dependency vulnerabilities to HITL
- **Recommended:** `true` (no auto-merge of vulnerable dependencies)
- **Example:**
  ```yaml
  security:
    dependency_vulns_always_hitl: true
  ```

#### `secrets_absolute_prohibition` (required)
- **Type:** Boolean
- **Description:** Absolutely prohibit secrets in code (no waivers)
- **Recommended:** `true`
- **Example:**
  ```yaml
  security:
    secrets_absolute_prohibition: true
  ```

#### `forbidden_patterns_source` (required)
- **Type:** String
- **Description:** Path to file defining forbidden code patterns
- **Default:** `/.repo/policy/SECURITY_BASELINE.md`
- **Example:**
  ```yaml
  security:
    forbidden_patterns_source: "/.repo/policy/SECURITY_BASELINE.md"
  ```

---

## Section: `boundaries`

Defines architectural boundary enforcement configuration.

### Fields

#### `enforcement` (required)
- **Type:** String
- **Description:** Boundary enforcement mechanism
- **Values:**
  - `hybrid_checker_plus_manifest_edges` - Tool + manifest exceptions
  - `manifest_only` - Only enforce manifest rules
  - `checker_only` - Only enforce tool rules
- **Recommended:** `hybrid_checker_plus_manifest_edges`
- **Example:**
  ```yaml
  boundaries:
    enforcement: hybrid_checker_plus_manifest_edges
  ```

#### `edges_model` (required)
- **Type:** String
- **Description:** How to model allowed dependencies
- **Values:**
  - `layered_allow_list` - Layer-based with explicit exceptions
  - `deny_list` - Everything allowed except explicit denials
- **Recommended:** `layered_allow_list`
- **Example:**
  ```yaml
  boundaries:
    edges_model: layered_allow_list
  ```

#### `edges` (optional)
- **Type:** Array of objects
- **Description:** Explicit boundary exceptions
- **Format:**
  ```yaml
  boundaries:
    edges:
      - from: "feature-A/ui"
        to: "feature-B/domain"
        reason: "Shared business logic"
        adr: "docs/adr/0005-shared-logic.md"
  ```

### Edge Object Fields

- **`from`** (required): Source module/layer
- **`to`** (required): Target module/layer
- **`reason`** (required): Justification for exception
- **`adr`** (required for cross-feature): Architecture Decision Record path

---

## Complete Example

```yaml
# /.repo/repo.manifest.yaml
# SOURCE OF TRUTH for executable commands + verification profiles.

repo:
  ships: true
  ship_kind: user_facing_app
  release_protects: [app_stability, login_security, money_flows]

prerequisites:
  package_manager: npm
  runtime_pinned: true
  platform_tools_required_for_release: true

commands:
  install: "npm ci"
  check:quick: "npm run lint && npm run typecheck && npm run build:fast"
  check:ci: "npm run lint && npm run typecheck && npm test && npm run build"
  check:release: "npm run ci && npm run security && npm run check-budgets"
  check:governance: "governance-verify"
  check:boundaries: "boundary-check"
  check:security: "npm audit && npm run scan-secrets && npm run check-patterns"

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
  bundle_limits:
    main: 250kb
    vendor: 500kb
    total: 750kb
  runtime_limits:
    first_contentful_paint: 1.5s
    time_to_interactive: 3.0s

security:
  every_pr: true
  release_includes_security: true
  dependency_vulns_always_hitl: true
  secrets_absolute_prohibition: true
  forbidden_patterns_source: "/.repo/policy/SECURITY_BASELINE.md"

boundaries:
  enforcement: hybrid_checker_plus_manifest_edges
  edges_model: layered_allow_list
  edges:
    - from: "features/checkout/ui"
      to: "features/cart/domain"
      reason: "Checkout needs cart total for display"
      adr: "docs/adr/0008-checkout-cart-dependency.md"
```

---

## Validation

After filling the manifest, validate it:

1. **Syntax Check:**
   ```bash
   governance-cli validate manifest
   ```

2. **Command Verification:**
   - Run each command locally
   - Verify they accomplish stated goals
   - Check exit codes (0 = success)

3. **Integration Test:**
   - Run verify profiles
   - Ensure profiles execute correctly
   - Verify enforcement works

---

## Common Patterns

### Node.js Projects

```yaml
prerequisites:
  package_manager: npm

commands:
  install: "npm ci"
  check:quick: "npm run lint && npm run build"
  check:ci: "npm run lint && npm test && npm run build"
  check:security: "npm audit"
```

### Python Projects

```yaml
prerequisites:
  package_manager: pip

commands:
  install: "pip install -r requirements.txt"
  check:quick: "flake8 src/ && mypy src/"
  check:ci: "flake8 src/ && mypy src/ && pytest"
  check:security: "safety check"
```

### Go Projects

```yaml
prerequisites:
  package_manager: go mod

commands:
  install: "go mod download"
  check:quick: "go vet ./... && go build ./..."
  check:ci: "go vet ./... && go test ./... && go build ./..."
  check:security: "gosec ./..."
```

### Monorepo

```yaml
prerequisites:
  package_manager: npm

commands:
  install: "npm ci"
  check:quick: "npm run lint:all && npm run build:fast"
  check:ci: "npm run lint:all && npm run test:all && npm run build:all"
  check:boundaries: "boundary-check --monorepo"
```

---

## Troubleshooting

### Problem: Cannot Determine Command

**Symptom:** Multiple possible commands, unclear which to use

**Solution:**
1. Check CI configuration (most authoritative)
2. If CI is unclear, use `<UNKNOWN>` and create HITL
3. Document the ambiguity in HITL

### Problem: Command Varies by Environment

**Symptom:** Different commands for dev vs. CI

**Solution:**
- Use the CI command (more strict)
- Add environment detection in wrapper script if needed
- Document environment-specific behavior

### Problem: No Security Command Exists

**Symptom:** Repository lacks security scanning

**Solution:**
1. Set `check:security: "<UNKNOWN>"`
2. Create HITL to add security scanning
3. Use waiver if security scanning not immediately available

### Problem: Budget Limits Unknown

**Symptom:** Don't know appropriate budget values

**Solution:**
- Use `fallback_to_default: true`
- Defaults from QUALITY_GATES.md will apply
- Measure current metrics and adjust later

---

## Related Documents

- [Manifest Configuration Guide](../guides/HOW_TO_CONFIGURE_MANIFEST.md) - Step-by-step manifest setup
- [Command Resolution Standard](../../templates/.repo/docs/standards/manifest.md) - Detailed resolution rules
- [Quality Gates Policy](../../templates/.repo/policy/QUALITY_GATES.md) - Default budgets
- [Security Baseline](../../templates/.repo/policy/SECURITY_BASELINE.md) - Security requirements
- [CLI Reference](CLI_REFERENCE.md) - CLI commands for validation

---

**Document Status:** Complete  
**Last Reviewed:** 2026-01-22  
**Next Review:** Phase 6 (Polish & Scale)
