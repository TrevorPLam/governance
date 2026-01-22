# Onboarding Playbook
## Team onboarding for governance adoption

**Owner:** Governance Lead  
**Last Updated:** 2026-01-22  
**Version:** 1.0

---

## Purpose

Provide a repeatable process for onboarding teams to the governance framework.

---

## When to Use

- New team adoption of governance.
- New repository onboarding.
- Major governance version updates.

---

## Prerequisites

- Governance framework available (`/.repo/` template).
- Project owner and approver identified.
- CI/CD access for governance checks.

---

## Onboarding Steps

### 1) Orientation and Access
- Identify owners, reviewers, and approvers.
- Share `README.md`, `docs/getting-started/QUICK_START.md`, and `/.repo/GOVERNANCE.md`.
- Confirm access to CI/CD and repository settings.

### 2) Install Governance
- Run `governance init` in the repository.
- Verify `/.repo/` structure is present.
- Commit the initial governance setup.

### 3) Configure Manifest
- Open `/.repo/repo.manifest.yaml`.
- Fill all required commands using `/.repo/docs/standards/manifest.md`.
- Replace `<FILL_FROM_REPO>` placeholders.
- For `<UNKNOWN>` items, create HITL in `/.repo/policy/HITL.md`.

### 4) Validate and Verify
- Run `governance validate`.
- Run `governance verify --profile=quick`.
- Fix issues and re-run until clean.

### 5) Train the Team
- Review policies: `/.repo/policy/CONSTITUTION.md`, `PRINCIPLES.md`.
- Walk through HITL and waiver processes.
- Demonstrate a sample PR and evidence collection.

### 6) First Governed PR
- Use `docs/getting-started/YOUR_FIRST_PR.md` as the workflow.
- Require evidence and trace logs.
- Review against quality gates.

---

## Success Metrics

- Manifest commands are fully populated.
- Governance validation and verification pass.
- First PR includes required evidence.
- Team can explain HITL and waiver flow.

---

## Timeline (Typical)

- Day 1: Orientation, install, manifest setup.
- Day 2: Validation, verification, training.
- Day 3: First governed PR.

---

## References

- `docs/getting-started/QUICK_START.md`
- `docs/getting-started/YOUR_FIRST_PR.md`
- `docs/reference/CLI_REFERENCE.md`
- `docs/reference/MANIFEST_REFERENCE.md`

