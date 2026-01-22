# Principles Reference
## Detailed explanations, examples, and best practices (P3-P25)

**Purpose:** Provide a complete, practical reference for the governance principles.

**Last Updated:** 2026-01-22  
**Version:** 1.0

---

## Overview

Principles P3-P25 define the operating behavior of the governance system. P1-P2 are reserved by the Constitution and are not listed in the principles file.

**Source:** `templates/.repo/policy/PRINCIPLES.md`

---

## Global Rule

**Filepaths are required everywhere** (PRs, Task Packets, logs, ADRs, waivers, inline commentary). If you reference a change, include the filepath.

---

## Principles (P1-P25)

### P1 Final Authority
- **Summary:** Final authority resides with the solo founder.
- **Example:** Escalate ambiguity to HITL for final decision.
- **Common violation:** Proceeding on disputed interpretation without approval.
- **Best practice:** Record the escalation and decision trail.

### P2 Verifiable Over Persuasive
- **Summary:** Evidence is required for completion claims.
- **Example:** Provide command output and artifact links for verification.
- **Common violation:** Approving changes without proof.
- **Best practice:** Attach test outputs and trace logs.

### P3 One Change Type Per PR
- **Summary:** A PR declares exactly one change type; split work if multiple types are needed.
- **Example:** Split a refactor + new feature into two PRs.
- **Common violation:** Mixing bug fix and feature in a single PR.
- **Best practice:** Use a Task Packet to define the single change type.

### P4 Make It Shippable
- **Summary:** Each PR should be safe to merge and ship.
- **Example:** Feature flag risky changes and include rollback steps.
- **Common violation:** Landing partial work that breaks deploys.
- **Best practice:** Keep each PR production-safe or clearly blocked by HITL.

### P5 Don't Break Surprises
- **Summary:** Call out and mitigate changes that affect users, security, money, or prod behavior.
- **Example:** Add tests and rollback plan for auth changes.
- **Common violation:** Silent behavior changes without tests.
- **Best practice:** Highlight risk in PR narration and add verification evidence.

### P6 Evidence Over Vibes
- **Summary:** Provide proof for claims (commands, outputs, artifacts).
- **Example:** Link `test-results/unit.json` after running tests.
- **Common violation:** "Tests passed" without evidence.
- **Best practice:** Include command outputs and filepaths.

### P7 UNKNOWN Is a First-Class State
- **Summary:** Mark unknowns explicitly and route to HITL.
- **Example:** Set `<UNKNOWN>` in manifest and create HITL item.
- **Common violation:** Guessing commands or configurations.
- **Best practice:** Stop and escalate when uncertain.

### P8 Read Repo First
- **Summary:** Use `.repo` docs and manifest before deciding anything.
- **Example:** Follow `/.repo/docs/standards/manifest.md` to fill commands.
- **Common violation:** Using assumed commands without checking repo.
- **Best practice:** Start with manifest and policy files.

### P9 Assumptions Must Be Declared
- **Summary:** Assumptions must be stated and labeled.
- **Example:** "Assumption: `npm test` covers integration tests."
- **Common violation:** Acting on implicit assumptions.
- **Best practice:** Record assumptions in Task Packets or PR notes.

### P10 Risk Triggers a Stop
- **Summary:** Non-trivial risk requires HITL before proceeding.
- **Example:** Security-related changes trigger HITL.
- **Common violation:** Proceeding with risky work without review.
- **Best practice:** Use HITL early; include evidence requirements.

### P11 Prefer Guardrails Over Heroics
- **Summary:** Favor automation and checks over manual trust.
- **Example:** Add a CI check instead of manual review steps.
- **Common violation:** "We'll remember to do it" processes.
- **Best practice:** Turn repeated checks into scripts.

### P12 Rollback Thinking
- **Summary:** Risky changes must include rollback thinking.
- **Example:** Document how to revert a migration safely.
- **Common violation:** No rollback guidance for risky changes.
- **Best practice:** Add rollback plan to PR narration.

### P13 Respect Boundaries by Default
- **Summary:** Do not cross module boundaries unless allowed.
- **Example:** UI only imports domain layer.
- **Common violation:** UI importing data layer directly.
- **Best practice:** Use boundary checks and ADRs for exceptions.

### P14 Localize Complexity (Option B)
- **Summary:** Keep complexity where it belongs; avoid spreading special cases.
- **Example:** Contain edge-case logic in a single module.
- **Common violation:** Scattered conditionals across layers.
- **Best practice:** Introduce a focused helper or module.

### P15 Consistency Beats Novelty
- **Summary:** Prefer existing patterns unless there is a clear justification.
- **Example:** Use existing logging utilities instead of a new one.
- **Common violation:** Introducing new frameworks without need.
- **Best practice:** Document justification for deviations.

### P16 Decisions Written Down (Token-Optimized)
- **Summary:** Record decisions in the smallest durable place.
- **Example:** Use PR narration or Task Packet; ADR only when triggered.
- **Common violation:** Verbal-only decisions with no record.
- **Best practice:** Write brief decision notes with filepaths.

### P17 PR Narration
- **Summary:** PRs must explain what, why, filepaths, verification, risks, rollback.
- **Example:** Include a structured PR description template.
- **Common violation:** PRs with no context or verification steps.
- **Best practice:** Use `/.repo/agents/prompts/pr_template.md`.

### P18 No Silent Scope Creep
- **Summary:** Scope changes require explicit updates to the Task Packet.
- **Example:** Update task scope when new work appears.
- **Common violation:** Adding extra changes without mention.
- **Best practice:** Call out scope changes early.

### P19 Docs Age With Code
- **Summary:** Update docs when behavior changes.
- **Example:** Update `docs/` after API changes.
- **Common violation:** Code updated but docs left stale.
- **Best practice:** Include doc updates in the same PR.

### P20 Examples Are Contracts
- **Summary:** Examples define expected behavior and must be maintained.
- **Example:** Update example config when defaults change.
- **Common violation:** Examples no longer compile or run.
- **Best practice:** Treat examples as tests.

### P21 Naming Matters
- **Summary:** Names must be clear; avoid confusing abbreviations.
- **Example:** `checkoutTotal` over `ct`.
- **Common violation:** Ambiguous or inconsistent naming.
- **Best practice:** Follow existing naming conventions.

### P22 Waivers Rare + Temporary
- **Summary:** Waivers expire and require remediation.
- **Example:** Set a 30-day waiver with a clear fix plan.
- **Common violation:** Indefinite waiver without follow-up.
- **Best practice:** Track waiver expiry in TODOs.

### P23 ADR Required When Triggered
- **Summary:** If an ADR trigger is met, create an ADR.
- **Example:** Cross-feature boundary exception requires ADR.
- **Common violation:** Large decisions with no ADR.
- **Best practice:** Use `/.repo/templates/ADR_TEMPLATE.md`.

### P24 Logs Required for Non-Docs
- **Summary:** Non-doc-only changes require agent logs and trace logs.
- **Example:** Include trace log compliant with `AGENT_TRACE_SCHEMA.json`.
- **Common violation:** Code changes without trace evidence.
- **Best practice:** Always attach trace and reasoning summary.

### P25 Token-Optimized TODO Discipline
- **Summary:** Use P0/P1/P2 TODO files; archive completed work.
- **Example:** Move finished tasks to `COMPLETEDTODO.md`.
- **Common violation:** Unbounded TODO lists.
- **Best practice:** Keep active TODOs short and focused.

---

## Related Documentation

- `docs/reference/POLICY_REFERENCE.md`
- `docs/reference/MANIFEST_REFERENCE.md`
- `templates/.repo/agents/prompts/pr_template.md`

