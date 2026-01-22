# PHASE-4: Agents Framework + Folder-Level Guides

- Phase ID: PHASE-4

## Files
### `/.repo/agents/AGENTS.md` (markdown)
```markdown
# /.repo/agents/AGENTS.md
Agents operate ONLY within the rules defined in /.repo/policy/*.md and /.repo/GOVERNANCE.md.

## Core Rules (Plain English)
- No guessing. If something is not explicitly known, declare UNKNOWN and create a HITL item.
- Filepaths required everywhere.
- Three-pass code generation required:
  1) Plan (list actions, risks, files, UNKNOWNs)
  2) Change (apply edits)
  3) Verify (tests, evidence, logs, trace)
- All logs must follow /.repo/templates/AGENT_LOG_TEMPLATE.md.
- All trace logs must follow /.repo/templates/AGENT_TRACE_SCHEMA.json.
- Cross-feature imports require ADR.
- Boundary model enforced: ui → domain → data → platform.
```

### `/.repo/agents/capabilities.md` (markdown)
```markdown
# /.repo/agents/capabilities.md

create_feature
modify_existing
add_dependency
change_api_contract
change_schema
update_security
update_release_process
apply_waiver
create_adr
create_task_packet
run_verification_profiles
```

### `/.repo/agents/roles/primary.md` (markdown)
```markdown
# Primary agent: full capabilities except apply_waiver and update_release_process.
```

### `/.repo/agents/roles/secondary.md` (markdown)
```markdown
# Secondary agent: modify_existing, refactor/port within boundaries only.
```

### `/.repo/agents/roles/reviewer.md` (markdown)
```markdown
# Reviewer: human. Controls waivers + enforcement.
```

### `/.repo/agents/roles/release.md` (markdown)
```markdown
# Release: human. Controls update_release_process and deploy.
```

### `/.repo/AGENT.md` (markdown)
```markdown
# AGENT.md (Folder-Level Guide)

## Purpose of this folder
Explain what this folder contains.

## What agents may do here
- Allowed operations (plain English)

## What agents may NOT do
- Forbidden patterns (boundaries, layer rules)

## Required links
- Refer to higher-level policy: e.g. /.repo/policy/BOUNDARIES.md
```

### `/src/AGENT.md` (markdown)
```markdown
# AGENT.md (Folder-Level Guide)

## Purpose of this folder
Explain what this folder contains.

## What agents may do here
- Allowed operations (plain English)

## What agents may NOT do
- Forbidden patterns (boundaries, layer rules)

## Required links
- Refer to higher-level policy: e.g. /.repo/policy/BOUNDARIES.md
```

### `/src/platform/AGENT.md` (markdown)
```markdown
# AGENT.md (Folder-Level Guide)

## Purpose of this folder
Explain what this folder contains.

## What agents may do here
- Allowed operations (plain English)

## What agents may NOT do
- Forbidden patterns (boundaries, layer rules)

## Required links
- Refer to higher-level policy: e.g. /.repo/policy/BOUNDARIES.md
```

### `/tests/AGENT.md` (markdown)
```markdown
# AGENT.md (Folder-Level Guide)

## Purpose of this folder
Explain what this folder contains.

## What agents may do here
- Allowed operations (plain English)

## What agents may NOT do
- Forbidden patterns (boundaries, layer rules)

## Required links
- Refer to higher-level policy: e.g. /.repo/policy/BOUNDARIES.md
```

### `/docs/AGENT.md` (markdown)
```markdown
# AGENT.md (Folder-Level Guide)

## Purpose of this folder
Explain what this folder contains.

## What agents may do here
- Allowed operations (plain English)

## What agents may NOT do
- Forbidden patterns (boundaries, layer rules)

## Required links
- Refer to higher-level policy: e.g. /.repo/policy/BOUNDARIES.md
```

### `/scripts/AGENT.md` (markdown)
```markdown
# AGENT.md (Folder-Level Guide)

## Purpose of this folder
Explain what this folder contains.

## What agents may do here
- Allowed operations (plain English)

## What agents may NOT do
- Forbidden patterns (boundaries, layer rules)

## Required links
- Refer to higher-level policy: e.g. /.repo/policy/BOUNDARIES.md
```

## Acceptance criteria
- Agents.md describes UNKNOWN workflow + 3-pass code generation.
- Folder-level guides exist with purpose/allowed/forbidden + links.