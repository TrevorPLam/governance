# Policy Reference
## Governance policy documents and enforcement rules

**Purpose:** Describe all policy files under `/.repo/policy/` and how they are enforced.

**Last Updated:** 2026-01-22  
**Version:** 1.0

---

## Overview

The governance framework ships with seven policy documents. These are copied into target repositories by the CLI and are the primary enforcement sources for quality gates, security, boundaries, HITL, and waivers.

**Policy location:** `/.repo/policy/`  
**Template source:** `templates/.repo/policy/`

---

## Policy Files

### `CONSTITUTION.md`

**Purpose:** Immutable rules and final authority definition.  
**Key rules:**
- Final authority resides with the solo founder.
- No guessing; UNKNOWN requires HITL.
- Incremental delivery and strict traceability.
- Safety before speed for risky changes.
- HITL required for external systems.

**Enforcement:** Violations block merge via governance verification and HITL gating.  
**Common violations:** Proceeding without evidence, merging risky changes without HITL.

---

### `PRINCIPLES.md`

**Purpose:** Operating principles (P3-P25).  
**Key rules:**
- Filepaths required everywhere.
- One change type per PR.
- Evidence-first and explicit assumptions.
- Respect boundaries, avoid scope creep, document decisions.

**Enforcement:** Reviewed in PR narration and audit logs; violations trigger HITL or rework.  
**Common violations:** Missing filepaths, silent scope expansion, unverified claims.

---

### `QUALITY_GATES.md`

**Purpose:** Defines merge gates and waiver policy.  
**Key rules:**
- Hard gates must pass: required artifacts, trace logs, governance-verify, HITL completion.
- Waiverable gates: coverage, budgets, warnings.
- Warnings are treated as failures unless waived.

**Enforcement:** Governance verification (hard fail on hard gates, waiver required otherwise).  
**Common violations:** Missing trace logs, expired waivers, untracked warnings.

---

### `SECURITY_BASELINE.md`

**Purpose:** Minimum security requirements and triggers.  
**Key rules:**
- Absolute prohibition on secrets in code or logs.
- Vulnerabilities require HITL and block merges unless waived.
- Security checks run every PR.
- Trigger IDs define required security reviews.

**Enforcement:** Security checks in `check:security` and HITL requirements.  
**Common violations:** Unreviewed vulnerability findings, missing security evidence.

---

### `BOUNDARIES.md`

**Purpose:** Architectural boundaries and import rules.  
**Key rules:**
- Default layer flow: `ui → domain → data → shared_platform`.
- Cross-feature imports require ADRs.
- Exceptions require explicit manifest edges.

**Enforcement:** Hybrid boundary checker plus manifest edge validation.  
**Common violations:** Cross-feature imports without ADR, missing exception edges.

---

### `HITL.md`

**Purpose:** Human-in-the-loop requirements and workflow.  
**Key rules:**
- HITL items live under `/.repo/hitl/` and are indexed here.
- Only humans can mark HITL items Completed.
- Required HITL items block merge until completed.

**Enforcement:** Governance verification checks HITL status and linkage.  
**Common violations:** Missing HITL item for external systems or risky changes.

---

### `WAIVERS.md`

**Purpose:** Waiver process, tracking, and expiration rules.  
**Key rules:**
- Waivers are rare, temporary, and require remediation.
- Default expiration is 30 days; max 90 days.
- Expired waivers block merges.

**Enforcement:** Governance verification checks waiver presence and expiry.  
**Common violations:** Missing remediation plan, expired waiver referenced in PR.

---

## Enforcement Summary Matrix

| Policy | Enforcement Mechanism | Typical Failure Mode |
| --- | --- | --- |
| CONSTITUTION | Governance verification + HITL | Unknowns without HITL |
| PRINCIPLES | PR narration review + audit | Missing filepaths, assumptions |
| QUALITY_GATES | governance-verify | Missing artifacts, invalid trace |
| SECURITY_BASELINE | `check:security` + HITL | Unreviewed vulnerability |
| BOUNDARIES | Boundary checker + manifest edges | Cross-boundary import |
| HITL | HITL index + item status | Required HITL pending |
| WAIVERS | Waiver index + expiry | Expired or missing waiver |

---

## Layering and Update Policy

Policy files carry version markers and layer tags:
- `<!-- GOVERNANCE_VERSION: X.X.X -->`
- `<!-- GOVERNANCE: UPDATEABLE - Layer 2 -->`
- `<!-- GOVERNANCE: CUSTOM - Layer 1 -->`

**Guidance:**
- Layer 2 policies are updated from the governance repository.
- Layer 1 policies (`HITL.md`, `WAIVERS.md`) can be customized by a repo.

---

## Related Documentation

- `docs/reference/PRINCIPLES_REFERENCE.md`
- `docs/reference/MANIFEST_REFERENCE.md`
- `docs/reference/CLI_REFERENCE.md`
- `templates/.repo/policy/README.md`

