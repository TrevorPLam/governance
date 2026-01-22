# PHASE-5: PR Operating System

- Phase ID: PHASE-5

## Files
### `/.repo/agents/prompts/task_packet.md` (markdown)
```markdown
# /.repo/agents/prompts/task_packet.md
{
  "goal": "",
  "non_goals": [],
  "acceptance_criteria": [],
  "approach": "",
  "files_touched": [],
  "verification_plan": [],
  "risks": [],
  "rollback_plan": "",
  "hitl_requirements": [],
  "notes": "Filepaths required. No guessing. UNKNOWN → HITL."
}
```

### `/.repo/agents/prompts/pr_template.md` (markdown)
```markdown
# /.repo/agents/prompts/pr_template.md
{
  "change_type": "",
  "summary": "",
  "task_packet": "<embed-or-link>",
  "filepath_changes": [],
  "verification_commands_run": [],
  "evidence": [],
  "risks": [],
  "rollback": "",
  "hitl": [],
  "notes": "One change type per PR. Evidence over vibes."
}
```

### `/.repo/agents/checklists/change-plan.md` (markdown)
```markdown
# /.repo/agents/checklists/change-plan.md
- Identify change type.
- Read relevant policy files.
- Declare UNKNOWNs.
- Create HITL items if needed.
- List filepaths.
- Outline approach.
- Prepare verification plan.
```

### `/.repo/agents/checklists/pr-review.md` (markdown)
```markdown
# /.repo/agents/checklists/pr-review.md
- One change type?
- Task packet complete?
- Evidence present?
- Logs + Trace included?
- Boundaries respected?
- HITL satisfied?
- Waivers valid?
```

### `/.repo/agents/checklists/incident.md` (markdown)
```markdown
# /.repo/agents/checklists/incident.md
- Describe issue.
- Identify impacted files.
- Assess risk.
- Determine HITL needs.
- Document fix plan.
- Provide verification steps.
```

### `/.repo/templates/PR_TEMPLATE.md` (markdown)
```markdown
# /.repo/templates/PR_TEMPLATE.md
{
  "title": "",
  "change_type": "",
  "task_packet": "",
  "changes": [],
  "evidence": [],
  "verification_commands_run": [],
  "hitl": [],
  "waivers": [],
  "notes": "Strict structure. No secrets."
}
```