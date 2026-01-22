# /.repo/agents/capabilities.md
<!-- GOVERNANCE_VERSION: 1.0.0 -->
<!-- GOVERNANCE: UPDATEABLE - Layer 2 -->

This document defines all capabilities that agents can perform. Each role has different access to these capabilities.

## Available Capabilities

### create_feature
Create new features, components, or modules.
- **Requires:** Planning pass, boundary check, ADR for cross-feature dependencies
- **Restrictions:** Must follow boundaries and principles

### modify_existing
Modify existing code, refactor, or fix bugs.
- **Requires:** Understanding existing code, regression testing
- **Restrictions:** Must maintain backward compatibility unless ADR approves breaking change

### add_dependency
Add new external dependencies to the project.
- **Requires:** ADR documenting why, alternatives considered, security check
- **Restrictions:** Must align with approved dependency boundaries

### change_api_contract
Modify public APIs, contracts, or interfaces.
- **Requires:** ADR, API documentation update, backward compatibility plan
- **Restrictions:** Breaking changes require HITL approval

### change_schema
Modify database schemas, configuration schemas, or data structures.
- **Requires:** ADR, migration plan, rollback strategy
- **Restrictions:** Must be backward compatible or include migration path

### update_security
Make security-related changes.
- **Requires:** Security review, HITL approval, comprehensive testing
- **Restrictions:** All security changes require human review

### update_release_process
Modify release, deployment, or CI/CD processes.
- **Requires:** HITL approval from release manager
- **Restrictions:** Human-only capability

### apply_waiver
Grant policy waivers or exceptions.
- **Requires:** HITL approval from reviewer
- **Restrictions:** Human-only capability

### create_adr
Create Architecture Decision Records.
- **Requires:** Proper documentation of context, decision, consequences
- **Restrictions:** Must follow ADR template

### create_task_packet
Create structured task packets for agents.
- **Requires:** Clear objective, context, constraints, success criteria
- **Restrictions:** Must follow task packet template

### run_verification_profiles
Execute verification profiles from manifest.
- **Requires:** Manifest defines profiles
- **Restrictions:** Must report failures as HITL items

## Capability Levels

### Level 1: Basic
- modify_existing (within boundaries)
- create_adr
- create_task_packet

### Level 2: Standard
- Level 1 capabilities
- create_feature
- run_verification_profiles

### Level 3: Advanced
- Level 2 capabilities
- add_dependency
- change_api_contract
- change_schema

### Level 4: Security
- Level 3 capabilities
- update_security (with HITL)

### Level 5: Release (Human Only)
- update_release_process
- apply_waiver

## Usage Notes

- Agents must declare their role in every operation.
- Capabilities not in agent's role require HITL escalation.
- All capability usage must be logged in agent trace.
- Security capabilities always require additional scrutiny.

## References

- Agent Roles: /.repo/agents/roles/
- Policy Framework: /.repo/policy/
- HITL Process: /.repo/policy/HITL.md
- Waiver Process: /.repo/policy/WAIVERS.md
