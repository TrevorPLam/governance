# Agent Architecture
## Execution model, roles, and decision flow

**Purpose:** Describe how agents operate within governance policies and how decisions are handled.

**Last Updated:** 2026-01-22  
**Version:** 1.0

---

## Overview

Agents operate under strict policy constraints and must follow the manifest for all executable commands. The authoritative rules live in `/.repo/agents/AGENTS.md` and `/.repo/policy/`.

---

## Agent Roles

Defined in `/.repo/agents/roles/`:
- **Primary Agent:** Main development work.
- **Secondary Agent:** Specialized tasks.
- **Reviewer Agent:** Reviews and quality checks.
- **Release Agent:** Release and deployment tasks.

Each role has explicit permissions and capabilities.

---

## Three-Pass Execution Model

Agents must use a three-pass workflow:

1. **Plan**
   - List planned actions and files.
   - Identify risks and UNKNOWNs.
   - Get approval before proceeding.
2. **Change**
   - Apply planned edits only.
   - Follow boundaries and policies.
   - Log all changes.
3. **Verify**
   - Run required checks.
   - Collect evidence and trace logs.
   - Confirm quality gates.

---

## Decision Flow

**If anything is unknown:**
1. Mark UNKNOWN.
2. Create HITL item.
3. Stop the affected portion until resolved.

**If risk is non-trivial:**
1. Trigger HITL.
2. Gather evidence.
3. Proceed only after human completion.

---

## Required Artifacts

Agents must produce or update:
- Task packets (as required by change type).
- Agent logs (`/.repo/templates/AGENT_LOG_TEMPLATE.md`).
- Trace logs (`/.repo/templates/AGENT_TRACE_SCHEMA.json`).
- ADRs when triggered.
- HITL items and waiver records when required.

---

## Communication and Traceability

Agents must:
- Cite filepaths in all references.
- Provide evidence of commands and outcomes.
- Keep PR narration aligned with policies.

---

## Enforcement

Agent behavior is enforced via:
- Governance policies (`/.repo/policy/`).
- Manifest command constraints.
- Quality gates and security baselines.
- HITL and waiver requirements.

---

## Related Documentation

- `templates/.repo/agents/AGENTS.md`
- `templates/.repo/agents/roles/`
- `templates/.repo/templates/AGENT_LOG_TEMPLATE.md`
- `templates/.repo/templates/AGENT_TRACE_SCHEMA.json`
- `docs/reference/CLI_REFERENCE.md`

