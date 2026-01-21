```json
{
  "phase_id": "PHASE-6",
  "phase_name": "Logging + Trace + Waiver + ADR Templates",
  "files": [
    {
      "path": "/.repo/templates/AGENT_LOG_TEMPLATE.md",
      "type": "markdown",
      "content": "# /.repo/templates/AGENT_LOG_TEMPLATE.md\n{\n  \"intent\": \"\",\n  \"plan\": [],\n  \"actions\": [],\n  \"evidence\": [],\n  \"decisions\": [],\n  \"risks\": [],\n  \"follow_ups\": [],\n  \"reasoning_summary\": \"\",\n  \"notes\": \"No secrets. No private data. No raw chain-of-thought.\"\n}\n"
    },
    {
      "path": "/.repo/templates/AGENT_TRACE_SCHEMA.json",
      "type": "json",
      "content": "# /.repo/templates/AGENT_TRACE_SCHEMA.json\n{\n  \"$schema\": \"http://json-schema.org/draft-07/schema#\",\n  \"type\": \"object\",\n  \"required\": [\"intent\", \"files\", \"commands\", \"evidence\", \"hitl\", \"unknowns\"],\n  \"properties\": {\n    \"intent\": { \"type\": \"string\" },\n    \"files\": { \"type\": \"array\", \"items\": { \"type\": \"string\" } },\n    \"commands\": { \"type\": \"array\", \"items\": { \"type\": \"string\" } },\n    \"evidence\": { \"type\": \"array\", \"items\": { \"type\": \"string\" } },\n    \"hitl\": { \"type\": \"array\", \"items\": { \"type\": \"string\" } },\n    \"unknowns\": { \"type\": \"array\", \"items\": { \"type\": \"string\" } }\n  }\n}\n"
    },
    {
      "path": "/.repo/templates/WAIVER_TEMPLATE.md",
      "type": "markdown",
      "content": "# /.repo/templates/WAIVER_TEMPLATE.md\n{\n  \"waives\": \"\",\n  \"why\": \"\",\n  \"scope\": \"\",\n  \"owner\": \"\",\n  \"expiration\": \"\",\n  \"remediation_plan\": \"\",\n  \"link\": \"\",\n  \"notes\": \"Auto-generated waivers allowed for gate failures only.\"\n}\n"
    },
    {
      "path": "/.repo/templates/ADR_TEMPLATE.md",
      "type": "markdown",
      "content": "# /.repo/templates/ADR_TEMPLATE.md\n{\n  \"context\": \"\",\n  \"decision_drivers\": [],\n  \"options\": [],\n  \"decision\": \"\",\n  \"consequences\": [],\n  \"modules\": [],\n  \"commands\": [],\n  \"migration\": [],\n  \"boundary_impact\": \"\",\n  \"hitl\": []\n}\n"
    },
    {
      "path": "/.repo/templates/RUNBOOK_TEMPLATE.md",
      "type": "markdown",
      "content": "# /.repo/templates/RUNBOOK_TEMPLATE.md\n{\n  \"title\": \"\",\n  \"summary\": \"\",\n  \"steps\": [],\n  \"rollback\": \"\",\n  \"verification\": [],\n  \"notes\": \"\"\n}\n"
    },
    {
      "path": "/.repo/templates/RFC_TEMPLATE.md",
      "type": "markdown",
      "content": "# /.repo/templates/RFC_TEMPLATE.md\n{\n  \"title\": \"\",\n  \"problem\": \"\",\n  \"proposed_solution\": \"\",\n  \"alternatives\": [],\n  \"impact\": [],\n  \"risks\": [],\n  \"notes\": \"\"\n}\n"
    }
  ]
}
```