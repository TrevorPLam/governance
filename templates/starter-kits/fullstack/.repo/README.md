# .repo/ - Injectable Governance Framework

This is the core governance framework directory that external repositories copy to gain AI-native governance capabilities.

## Purpose

The `.repo/` folder contains all the governance policies, agent configurations, templates, and automation needed to run a governed repository. It's designed to be:

- **Injectable:** Copy this folder into any repository
- **Self-contained:** Everything needed for governance in one place
- **Updateable:** Can pull updates from the governance repository
- **Customizable:** Certain files can be customized per repository

## Contents

### `policy/` - Policy Documents
Contains the 7 core policy documents that define governance rules:
- CONSTITUTION.md - Core unchangeable rules
- PRINCIPLES.md - Operating principles (P3-P25)
- QUALITY_GATES.md - Merge requirements and quality standards
- SECURITY_BASELINE.md - Security requirements and review triggers
- BOUNDARIES.md - Architectural constraints and layer rules
- HITL.md - Human-in-the-loop escalation process
- WAIVERS.md - Waiver request and tracking system

### `agents/` - Agent Framework
AI agent configurations for automated governance:
- `roles/` - Agent role definitions (primary, secondary, reviewer, release)
- `prompts/` - Agent instruction prompts
- `checklists/` - Agent verification checklists

### `templates/` - Document Templates
Standard templates for project documents:
- README templates
- Pull request templates
- Issue templates
- Architecture Decision Records (ADRs)
- Design documents
- And more...

### `docs/` - Documentation Framework
Documentation standards and structures:
- `standards/` - Documentation standards and guidelines
- `adr/` - Architecture Decision Record templates and index

### `automation/` - Automation Scripts
CI/CD and automation tools:
- `ci/` - GitHub Actions and other CI/CD workflows
- `scripts/` - Helper scripts for governance enforcement

### `repo.manifest.yaml` - Configuration
The manifest file that customizes governance for each repository. Contains:
- Build and test commands
- Verification profiles
- Boundary definitions
- Security settings
- Agent configurations

## Update Layers

The framework uses a 3-layer update model:

1. **Layer 3 (Policies):** Never updated locally, pull from governance repo
2. **Layer 2 (Updateable):** Can be updated from governance repo, merges safely
3. **Layer 1 (Custom):** Fully customized per repository, never overwritten

Each file indicates its layer in its header comment.

## Version
**Framework Version:** 1.0.0

---

**This directory should be copied as-is into external repositories for governance injection.**
