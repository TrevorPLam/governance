```json
{
  "phase_id": "PHASE-5",
  "phase_name": "PR Operating System",
  "files": [
    {
      "path": "/.repo/agents/prompts/task_packet.md",
      "type": "markdown",
      "content": "# /.repo/agents/prompts/task_packet.md\n{\n  \"goal\": \"\",\n  \"non_goals\": [],\n  \"acceptance_criteria\": [],\n  \"approach\": \"\",\n  \"files_touched\": [],\n  \"verification_plan\": [],\n  \"risks\": [],\n  \"rollback_plan\": \"\",\n  \"hitl_requirements\": [],\n  \"notes\": \"Filepaths required. No guessing. UNKNOWN \u2192 HITL.\"\n}\n"
    },
    {
      "path": "/.repo/agents/prompts/pr_template.md",
      "type": "markdown",
      "content": "# /.repo/agents/prompts/pr_template.md\n{\n  \"change_type\": \"\",\n  \"summary\": \"\",\n  \"task_packet\": \"<embed-or-link>\",\n  \"filepath_changes\": [],\n  \"verification_commands_run\": [],\n  \"evidence\": [],\n  \"risks\": [],\n  \"rollback\": \"\",\n  \"hitl\": [],\n  \"notes\": \"One change type per PR. Evidence over vibes.\"\n}\n"
    },
    {
      "path": "/.repo/agents/checklists/change-plan.md",
      "type": "markdown",
      "content": "# /.repo/agents/checklists/change-plan.md\n- Identify change type.\n- Read relevant policy files.\n- Declare UNKNOWNs.\n- Create HITL items if needed.\n- List filepaths.\n- Outline approach.\n- Prepare verification plan.\n"
    },
    {
      "path": "/.repo/agents/checklists/pr-review.md",
      "type": "markdown",
      "content": "# /.repo/agents/checklists/pr-review.md\n- One change type?\n- Task packet complete?\n- Evidence present?\n- Logs + Trace included?\n- Boundaries respected?\n- HITL satisfied?\n- Waivers valid?\n"
    },
    {
      "path": "/.repo/agents/checklists/incident.md",
      "type": "markdown",
      "content": "# /.repo/agents/checklists/incident.md\n- Describe issue.\n- Identify impacted files.\n- Assess risk.\n- Determine HITL needs.\n- Document fix plan.\n- Provide verification steps.\n"
    },
    {
      "path": "/.repo/templates/PR_TEMPLATE.md",
      "type": "markdown",
      "content": "# /.repo/templates/PR_TEMPLATE.md\n{\n  \"title\": \"\",\n  \"change_type\": \"\",\n  \"task_packet\": \"\",\n  \"changes\": [],\n  \"evidence\": [],\n  \"verification_commands_run\": [],\n  \"hitl\": [],\n  \"waivers\": [],\n  \"notes\": \"Strict structure. No secrets.\"\n}\n"
    }
  ]
}
```