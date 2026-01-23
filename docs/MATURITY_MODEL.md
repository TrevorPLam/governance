# Governance Maturity Model

**Purpose:** Define how governance maturity is measured and how teams progress from basic to optimizing.

**Last Updated:** 2026-01-22  
**Version:** 1.0.0

---

## Overview

The maturity model tracks governance adoption across five levels. Each level has measurable criteria tied to governance artifacts, automation, and operational practices.

Use `governance maturity-check` to assess the current repository and see gaps to the next level.

---

## Levels

### Level 0 — Ad-Hoc
**Definition:** No governance artifacts detected.

**Typical State:**
- No `.repo/` folder
- No policy framework
- No manifest or governance workflows

---

### Level 1 — Basic
**Definition:** Core governance framework exists and is usable.

**Required Artifacts:**
- `.repo/` folder present
- Policy files present (Constitution, Principles, Quality Gates, Security, Boundaries, HITL, Waivers)
- `repo.manifest.yaml`, `GOVERNANCE.md`, `VERSION`
- Root TODO files (`P0TODO.md`, `P1TODO.md`, `P2TODO.md`, `COMPLETEDTODO.md`)

---

### Level 2 — Managed
**Definition:** Governance is consistently structured with agent and documentation standards.

**Required Capabilities:**
- Agent framework (`.repo/agents/*`)
- Document templates and schemas (`.repo/templates/*`)
- Documentation standards and ADR example (`.repo/docs/*`)
- Automation folder structure (`.repo/automation/*`)

---

### Level 3 — Defined
**Definition:** Governance is fully configured and verified for automation.

**Required Capabilities:**
- Manifest filled (no `<FILL_FROM_REPO>` or `<UNKNOWN>` placeholders)
- CI and automation scripts present in `.repo/automation/`
- Governance checks wired to CI/CD

---

### Level 4 — Optimizing
**Definition:** Enterprise-grade governance with metrics, HITL, waivers, and auditability.

**Required Capabilities:**
- Metrics configuration and data collection enabled
- Structured HITL tracking in `.repo/hitl/`
- Waiver lifecycle tracking in `.repo/waivers/`
- Audit trail storage in `.repo/audit/`

---

## How to Assess Maturity

Run:

```
governance maturity-check
```

Optional flags:
- `--report` to save results
- `--json` for machine-readable output
- `--verbose` for detailed evidence per criterion

---

## Progression Guidance

### Move from Level 0 → 1
- Inject the core governance template
- Fill in manifest basics

### Move from Level 1 → 2
- Add agent framework and templates
- Add documentation standards
- Create automation folder structure

### Move from Level 2 → 3
- Fully fill manifest commands
- Add CI/CD workflows and governance scripts

### Move from Level 3 → 4
- Enable metrics collection and reporting
- Operationalize HITL and waiver workflows
- Add audit trail and review cadence

---

## Related Documentation
- [CLI Reference](reference/CLI_REFERENCE.md)
- [HOW_TO_CONFIGURE_MANIFEST.md](guides/HOW_TO_CONFIGURE_MANIFEST.md)
- [HOW_TO_MANAGE_WAIVERS.md](guides/HOW_TO_MANAGE_WAIVERS.md)
