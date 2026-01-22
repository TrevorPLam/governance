# Agent Workflow Examples

This directory contains examples of agent workflows demonstrating the governance framework in action.

## Available Examples

### 1. [Simple PR Workflow](./simple-pr-workflow.md)
Demonstrates a straightforward pull request workflow:
- Agent creates feature branch
- Implements changes following three-pass process
- Runs governance checks
- Creates PR with evidence
- Human reviewer approves
- Merge to main

### 2. [Complex Refactoring](./complex-refactoring.md)
Shows handling of a complex refactoring:
- Multi-step refactoring plan
- HITL escalation for architectural decision
- Breaking changes across packages
- ADR creation
- Staged implementation

### 3. [Emergency Fix](./emergency-fix.md)
Demonstrates fast-track process:
- Critical bug identified
- Emergency waiver requested
- Fast-track deployment
- Post-fix remediation plan
- Incident documentation

## Common Elements

All workflows demonstrate:
- **Three-Pass Process** - Plan, Change, Verify
- **Governance Checks** - Boundaries, policies, quality gates
- **HITL Escalation** - When to involve humans
- **Evidence Generation** - Logs, tests, verification
- **Waiver Management** - Exception handling

## How to Use These Examples

1. **Read the workflow** - Understand the scenario
2. **Follow along** - Try implementing in your repository
3. **Adapt** - Customize for your team's process
4. **Practice** - Use as training material

## Related Documentation

- [Agent Architecture](../../docs/architecture/AGENT_ARCHITECTURE.md)
- [How to Work with Agents](../../docs/guides/HOW_TO_WORK_WITH_AGENTS.md)
- [HITL Policy](../../templates/.repo/policy/HITL.md)
