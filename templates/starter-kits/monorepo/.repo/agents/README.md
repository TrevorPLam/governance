# Agent Framework

This directory contains the AI agent framework for automated governance.

## Structure

### `roles/` - Agent Role Definitions
Defines the 4 main agent roles:
- **Primary Agent** - Main development work
- **Secondary Agent** - Specialized tasks
- **Reviewer Agent** - Code reviews and quality checks
- **Release Agent** - Production deployments

### `prompts/` - Agent Instruction Prompts
Contains the instruction prompts for each agent role that define:
- Responsibilities
- Authority boundaries
- Decision-making rules
- Escalation criteria
- Communication patterns

### `checklists/` - Agent Verification Checklists
Checklists that agents follow for common tasks:
- PR review checklist
- Pre-merge verification
- Security review checklist
- Release readiness checklist
- HITL escalation criteria

## Update Policy

**Layer 2 - Updateable with safe merging**

These files can be updated from the governance repository. Custom additions are preserved during updates.

## Usage

1. Copy all files as-is for standard agent behavior
2. Customize prompts in repo.manifest.yaml if needed
3. Pull updates periodically to get improvements
4. Add custom checklists as needed

---

**Status:** Templates to be created in Phase 1, Tasks 4-5
