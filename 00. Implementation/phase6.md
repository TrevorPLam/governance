# PHASE-6: Logging + Trace + Waiver + ADR Templates

- Phase ID: PHASE-6

## Files
### `/.repo/templates/AGENT_LOG_TEMPLATE.md` (markdown)
```markdown
# /.repo/templates/AGENT_LOG_TEMPLATE.md
{
  "intent": "",
  "plan": [],
  "actions": [],
  "evidence": [],
  "decisions": [],
  "risks": [],
  "follow_ups": [],
  "reasoning_summary": "",
  "notes": "No secrets. No private data. No raw chain-of-thought."
}
```

### `/.repo/templates/AGENT_TRACE_SCHEMA.json` (json)
```json
# /.repo/templates/AGENT_TRACE_SCHEMA.json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "required": ["intent", "files", "commands", "evidence", "hitl", "unknowns"],
  "properties": {
    "intent": { "type": "string" },
    "files": { "type": "array", "items": { "type": "string" } },
    "commands": { "type": "array", "items": { "type": "string" } },
    "evidence": { "type": "array", "items": { "type": "string" } },
    "hitl": { "type": "array", "items": { "type": "string" } },
    "unknowns": { "type": "array", "items": { "type": "string" } }
  }
}
```

### `/.repo/templates/WAIVER_TEMPLATE.md` (markdown)
```markdown
# /.repo/templates/WAIVER_TEMPLATE.md
{
  "waives": "",
  "why": "",
  "scope": "",
  "owner": "",
  "expiration": "",
  "remediation_plan": "",
  "link": "",
  "notes": "Auto-generated waivers allowed for gate failures only."
}
```

### `/.repo/templates/ADR_TEMPLATE.md` (markdown)
```markdown
# /.repo/templates/ADR_TEMPLATE.md
{
  "context": "",
  "decision_drivers": [],
  "options": [],
  "decision": "",
  "consequences": [],
  "modules": [],
  "commands": [],
  "migration": [],
  "boundary_impact": "",
  "hitl": []
}
```

### `/.repo/templates/RUNBOOK_TEMPLATE.md` (markdown)
```markdown
# /.repo/templates/RUNBOOK_TEMPLATE.md
{
  "title": "",
  "summary": "",
  "steps": [],
  "rollback": "",
  "verification": [],
  "notes": ""
}
```

### `/.repo/templates/RFC_TEMPLATE.md` (markdown)
```markdown
# /.repo/templates/RFC_TEMPLATE.md
{
  "title": "",
  "problem": "",
  "proposed_solution": "",
  "alternatives": [],
  "impact": [],
  "risks": [],
  "notes": ""
}
```