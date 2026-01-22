# API Reference
## Tool interfaces, validation contracts, and extension points

**Purpose:** Document the public interfaces for programmatic integration with the governance framework.

**Last Updated:** 2026-01-22  
**Version:** 1.0

---

## Overview

The governance system exposes three primary integration surfaces:
1. **CLI commands** (human and automation entrypoints).
2. **File-based contracts** (manifest, policies, templates, trace schema).
3. **Exit codes and standard output** (automation signals).

There is currently no supported JavaScript or HTTP API; integrations should use the CLI or the file-based contracts.

---

## CLI Interfaces

The CLI is the canonical execution surface:
- `governance init`
- `governance validate`
- `governance verify`
- `governance check-updates`
- `governance update`

**Reference:** `docs/reference/CLI_REFERENCE.md`  
**Exit codes:** `0` for success, `1` for failure, `130` for interrupted.

---

## File-Based Contracts

These files are stable inputs/outputs for automation and tooling.

### Manifest

**Path:** `/.repo/repo.manifest.yaml`  
**Purpose:** Canonical command and verification configuration.  
**Reference:** `docs/reference/MANIFEST_REFERENCE.md`

### Policies

**Path:** `/.repo/policy/*.md`  
**Purpose:** Governance rules and enforcement logic.  
**Reference:** `docs/reference/POLICY_REFERENCE.md`

### Agent Trace Schema

**Path:** `/.repo/templates/AGENT_TRACE_SCHEMA.json`  
**Purpose:** JSON schema for structured trace logs.  
**Notes:** Validate trace logs with `ajv` or equivalent tools.

### Templates

**Paths:**
- `/.repo/templates/ADR_TEMPLATE.md`
- `/.repo/templates/WAIVER_TEMPLATE.md`
- `/.repo/templates/AGENT_LOG_TEMPLATE.md`
- `/.repo/agents/prompts/`

**Purpose:** Standardize artifacts and allow automation to generate consistent outputs.

---

## Validation Interfaces

### Governance Validation

**Command:** `governance validate`  
**Signals:**
- Exit code indicates pass/fail.
- Output lists errors and warnings.
- Placeholders `<FILL_FROM_REPO>` and `<UNKNOWN>` are flagged.

**Automation Guidance:**
- Treat non-zero exit codes as blockers.
- Parse output only if you must; prefer exit codes.

### Governance Verification

**Command:** `governance verify --profile=<profile>`  
**Profiles:** `quick`, `ci`, `release`, `governance` (from manifest).  
**Signals:** Exit code and printed summary.

---

## Extension Points

### Custom Commands

Define project-specific commands in `commands:` and point `verify_profiles` to them.

```yaml
commands:
  check:security: "npm run security:scan"
verify_profiles:
  security: [check:security]
```

### Boundary Enforcement

Use the manifest `boundaries.edges` to declare allowed exceptions with ADR references.

### Security Patterns

Update forbidden patterns and HITL triggers in `SECURITY_BASELINE.md` and reference it from the manifest.

### Templates and Artifacts

Customize Layer 1 templates only if allowed (e.g., HITL and waiver indexes), and keep Layer 2/3 artifacts aligned with updates.

---

## Versioning and Stability

Version markers are embedded in policy and template files:
- `<!-- GOVERNANCE_VERSION: X.X.X -->`
- `<!-- GOVERNANCE: UPDATEABLE - Layer 2 -->`
- `<!-- GOVERNANCE: CUSTOM - Layer 1 -->`

For automation, prefer stable filepaths and exit codes over parsing text output.

---

## Related Documentation

- `docs/reference/CLI_REFERENCE.md`
- `docs/reference/MANIFEST_REFERENCE.md`
- `docs/reference/POLICY_REFERENCE.md`
- `templates/.repo/templates/AGENT_TRACE_SCHEMA.json`

