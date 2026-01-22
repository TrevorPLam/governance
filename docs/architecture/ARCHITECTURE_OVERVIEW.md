# Architecture Overview
## AI-Native Governance System

**Purpose:** Describe the system architecture, components, and data flow for the governance framework.

**Last Updated:** 2026-01-22  
**Version:** 1.0

---

## System Goals

- Enforce governance policies consistently across repositories.
- Provide a single source of truth for commands and verification.
- Enable human-in-the-loop (HITL) decisions for high-risk work.
- Maintain traceability with logs and evidence.

---

## Core Components

### Policy Framework

Policies define the rules and enforcement criteria:
- `/.repo/policy/CONSTITUTION.md`
- `/.repo/policy/PRINCIPLES.md`
- `/.repo/policy/QUALITY_GATES.md`
- `/.repo/policy/SECURITY_BASELINE.md`
- `/.repo/policy/BOUNDARIES.md`
- `/.repo/policy/HITL.md`
- `/.repo/policy/WAIVERS.md`

### Manifest (Command Source of Truth)

`/.repo/repo.manifest.yaml` defines all required commands and verification profiles.  
Agents and CI must use manifest commands and must not guess.

### CLI Tooling

The Governance CLI provides operational commands:
- `governance init`
- `governance validate`
- `governance verify`
- `governance check-updates`
- `governance update`

### Agent Framework

Agent behavior is defined in:
- `/.repo/agents/AGENTS.md`
- `/.repo/agents/roles/*.md`
- `/.repo/agents/prompts/`
- `/.repo/agents/checklists/`

### Documentation and Templates

Standard templates and documentation rules live under:
- `/.repo/templates/`
- `/.repo/docs/standards/`
- `/.repo/docs/adr/`

### Automation

CI/CD templates and scripts live under:
- `/.repo/automation/`
- `templates/ci-cd/`

---

## Data Flow (High-Level)

1. **Policy definition** in `.repo/policy/`.
2. **Execution rules** defined in `.repo/repo.manifest.yaml`.
3. **Work performed** by humans/agents using manifest commands.
4. **Verification** via `governance validate` and `governance verify`.
5. **Evidence and trace** captured via logs and trace schema.
6. **HITL and waivers** used when policy requires escalation.

---

## Integration Points

- **CI/CD**: Use manifest commands and CLI verification.
- **HITL**: Required for risky or unknown items.
- **Waivers**: Temporary exceptions to waiverable gates.
- **ADRs**: Required for architecture changes or boundary exceptions.

---

## Technology Stack

- **Language:** TypeScript/JavaScript (CLI)
- **Docs:** Markdown (Mermaid-compatible diagrams)
- **Config:** YAML (manifest), JSON Schema (trace)
- **Validation:** CLI checks + policy requirements

---

## Architecture Principles

- Policies are source of truth; tooling enforces them.
- The manifest is the only authority for executable commands.
- Evidence is required to claim completion.
- Risk triggers HITL before proceeding.

---

## Related Documentation

- `docs/reference/MANIFEST_REFERENCE.md`
- `docs/reference/POLICY_REFERENCE.md`
- `docs/architecture/LAYER_MODEL.md`
- `docs/architecture/AGENT_ARCHITECTURE.md`
- `docs/architecture/SECURITY_ARCHITECTURE.md`

