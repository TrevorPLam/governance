```json
{
  "phase_id": "PHASE-4",
  "phase_name": "Agents Framework + Folder-Level Guides",
  "files": [
    {
      "path": "/.repo/agents/AGENTS.md",
      "type": "markdown",
      "content": "# /.repo/agents/AGENTS.md\nAgents operate ONLY within the rules defined in /.repo/policy/*.md and /.repo/GOVERNANCE.md.\n\n## Core Rules (Plain English)\n- No guessing. If something is not explicitly known, declare UNKNOWN and create a HITL item.\n- Filepaths required everywhere.\n- Three-pass code generation required:\n  1) Plan (list actions, risks, files, UNKNOWNs)\n  2) Change (apply edits)\n  3) Verify (tests, evidence, logs, trace)\n- All logs must follow /.repo/templates/AGENT_LOG_TEMPLATE.md.\n- All trace logs must follow /.repo/templates/AGENT_TRACE_SCHEMA.json.\n- Cross-feature imports require ADR.\n- Boundary model enforced: ui → domain → data → platform.\n\n"
    },
    {
      "path": "/.repo/agents/capabilities.md",
      "type": "markdown",
      "content": "# /.repo/agents/capabilities.md\n\ncreate_feature\nmodify_existing\nadd_dependency\nchange_api_contract\nchange_schema\nupdate_security\nupdate_release_process\napply_waiver\ncreate_adr\ncreate_task_packet\nrun_verification_profiles\n"
    },
    {
      "path": "/.repo/agents/roles/primary.md",
      "type": "markdown",
      "content": "# Primary agent: full capabilities except apply_waiver and update_release_process.\n"
    },
    {
      "path": "/.repo/agents/roles/secondary.md",
      "type": "markdown",
      "content": "# Secondary agent: modify_existing, refactor/port within boundaries only.\n"
    },
    {
      "path": "/.repo/agents/roles/reviewer.md",
      "type": "markdown",
      "content": "# Reviewer: human. Controls waivers + enforcement.\n"
    },
    {
      "path": "/.repo/agents/roles/release.md",
      "type": "markdown",
      "content": "# Release: human. Controls update_release_process and deploy.\n"
    },
    {
      "path": "/.repo/AGENT.md",
      "type": "markdown",
      "content": "# AGENT.md (Folder-Level Guide)\n\n## Purpose of this folder\nExplain what this folder contains.\n\n## What agents may do here\n- Allowed operations (plain English)\n\n## What agents may NOT do\n- Forbidden patterns (boundaries, layer rules)\n\n## Required links\n- Refer to higher-level policy: e.g. /.repo/policy/BOUNDARIES.md\n"
    },
    {
      "path": "/src/AGENT.md",
      "type": "markdown",
      "content": "# AGENT.md (Folder-Level Guide)\n\n## Purpose of this folder\nExplain what this folder contains.\n\n## What agents may do here\n- Allowed operations (plain English)\n\n## What agents may NOT do\n- Forbidden patterns (boundaries, layer rules)\n\n## Required links\n- Refer to higher-level policy: e.g. /.repo/policy/BOUNDARIES.md\n"
    },
    {
      "path": "/src/platform/AGENT.md",
      "type": "markdown",
      "content": "# AGENT.md (Folder-Level Guide)\n\n## Purpose of this folder\nExplain what this folder contains.\n\n## What agents may do here\n- Allowed operations (plain English)\n\n## What agents may NOT do\n- Forbidden patterns (boundaries, layer rules)\n\n## Required links\n- Refer to higher-level policy: e.g. /.repo/policy/BOUNDARIES.md\n"
    },
    {
      "path": "/tests/AGENT.md",
      "type": "markdown",
      "content": "# AGENT.md (Folder-Level Guide)\n\n## Purpose of this folder\nExplain what this folder contains.\n\n## What agents may do here\n- Allowed operations (plain English)\n\n## What agents may NOT do\n- Forbidden patterns (boundaries, layer rules)\n\n## Required links\n- Refer to higher-level policy: e.g. /.repo/policy/BOUNDARIES.md\n"
    },
    {
      "path": "/docs/AGENT.md",
      "type": "markdown",
      "content": "# AGENT.md (Folder-Level Guide)\n\n## Purpose of this folder\nExplain what this folder contains.\n\n## What agents may do here\n- Allowed operations (plain English)\n\n## What agents may NOT do\n- Forbidden patterns (boundaries, layer rules)\n\n## Required links\n- Refer to higher-level policy: e.g. /.repo/policy/BOUNDARIES.md\n"
    },
    {
      "path": "/scripts/AGENT.md",
      "type": "markdown",
      "content": "# AGENT.md (Folder-Level Guide)\n\n## Purpose of this folder\nExplain what this folder contains.\n\n## What agents may do here\n- Allowed operations (plain English)\n\n## What agents may NOT do\n- Forbidden patterns (boundaries, layer rules)\n\n## Required links\n- Refer to higher-level policy: e.g. /.repo/policy/BOUNDARIES.md\n"
    }
  ],
  "acceptance_criteria": [
    "Agents.md describes UNKNOWN workflow + 3-pass code generation.",
    "Folder-level guides exist with purpose/allowed/forbidden + links."
  ]
}
```