# Security Architecture
## Security model, triggers, and enforcement

**Purpose:** Describe the security baseline, threat assumptions, and enforcement mechanisms.

**Last Updated:** 2026-01-22  
**Version:** 1.0

---

## Overview

Security is enforced through the policy baseline, mandatory HITL triggers, and required verification. The source of truth is `/.repo/policy/SECURITY_BASELINE.md`.

---

## Security Model

Core tenets:
- Secrets are never committed or logged.
- Vulnerability findings require HITL before merge.
- Security checks run on every PR.
- Risky changes require explicit human approval.

---

## Threat Assumptions

The framework assumes risk in:
- Authentication and authorization changes.
- Payment and money flow changes.
- External service integrations.
- Production configuration and secrets.
- Cryptography and security control changes.
- Dependency and supply-chain changes.

These are reflected in the security trigger IDs.

---

## Security Triggers (HITL)

Security trigger IDs are defined in `SECURITY_BASELINE.md`.  
When a trigger applies, the change must be routed to HITL and cannot be merged until completed.

---

## Security Checks

Security verification is split into command-based checks:
- `check:security` (dependency scan, secrets scan, forbidden patterns)
- `check:release` (includes security plus budgets)

Commands are defined in `/.repo/repo.manifest.yaml`.

---

## Forbidden Patterns

Forbidden pattern lists live in `SECURITY_BASELINE.md` and are enforced by `check:security`.  
Unknown patterns must be marked as UNKNOWN and escalated to HITL.

---

## Evidence and Auditability

Required evidence includes:
- Security scan outputs.
- HITL completion evidence for triggered items.
- Trace logs compliant with `AGENT_TRACE_SCHEMA.json`.

Auditability is maintained through:
- Agent logs.
- Trace logs.
- HITL and waiver records.

---

## Secret Management

- Secrets must not be committed to the repository.
- Any detection triggers immediate HITL and blocks merge.
- Remediation should include secret rotation and audit trail.

---

## Related Documentation

- `templates/.repo/policy/SECURITY_BASELINE.md`
- `templates/.repo/policy/QUALITY_GATES.md`
- `docs/reference/MANIFEST_REFERENCE.md`
- `docs/architecture/ARCHITECTURE_OVERVIEW.md`

