# Migration Playbook
## Legacy governance migration and version upgrades

**Owner:** Governance Lead  
**Last Updated:** 2026-01-22  
**Version:** 1.0

---

## Purpose

Provide a safe path to migrate from legacy processes or older governance versions.

---

## When to Use

- Adopting governance for the first time in an existing repo.
- Upgrading to a new governance version.
- Replacing custom governance with the standard framework.

---

## Pre-Migration Checklist

- Confirm repository owner and approvers.
- Inventory existing build/test commands.
- Identify required security and boundary checks.
- Review current CI/CD workflows.
- Create backup or tag the current repo state.

---

## Migration Steps

### 1) Install Governance Framework
- Run `governance init`.
- Commit the initial `.repo/` structure.

### 2) Fill Manifest
- Update `/.repo/repo.manifest.yaml` with existing commands.
- Replace `<FILL_FROM_REPO>` placeholders.
- For `<UNKNOWN>` items, create HITL entries.

### 3) Align Policies
- Review `/.repo/policy/` for conflicts with existing policies.
- Document any required exceptions via waivers.
- Add ADRs for boundary exceptions.

### 4) Validate and Verify
- Run `governance validate`.
- Run `governance verify --profile=ci`.
- Fix violations and rerun until clean.

### 5) Update CI/CD
- Replace direct commands with manifest commands.
- Add `governance validate` and `governance verify` steps.
- Verify CI passes on a sample PR.

---

## Version Upgrade Flow

1. Run `governance check-updates`.
2. Review changes via `governance update --dry-run`.
3. Back up `.repo/`.
4. Apply update and reconcile Layer 1 customizations.
5. Re-run validation and verification.

---

## Rollback Procedures

- Restore `.repo/` from backup.
- Revert manifest changes if needed.
- Re-run verification to confirm stability.

---

## Testing Migration

- Run all manifest commands.
- Run `governance verify --profile=release` (if applicable).
- Validate HITL and waiver indexes.

---

## References

- `docs/getting-started/INSTALLATION.md`
- `docs/reference/MANIFEST_REFERENCE.md`
- `docs/reference/POLICY_REFERENCE.md`
- `docs/reference/CLI_REFERENCE.md`

