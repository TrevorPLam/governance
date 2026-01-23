# Agent Architecture

**Document Type:** Architecture  
**Audience:** Agent Developers, AI Engineers, Technical Leaders  
**Last Updated:** 2026-01-22

---

## Table of Contents

1. [Overview](#overview)
2. [Agent Execution Model](#agent-execution-model)
3. [Three-Pass System](#three-pass-system)
4. [Decision Tree](#decision-tree)
5. [HITL Integration](#hitl-integration)
6. [Agent Communication](#agent-communication)
7. [Agent Roles](#agent-roles)
8. [Agent Capabilities](#agent-capabilities)
9. [Logging and Traceability](#logging-and-traceability)
10. [Security Model](#security-model)

---

## Overview

The Agent Architecture defines how AI agents operate within the governance framework. It provides a structured approach to agent-assisted development that maintains human oversight while enabling automation at scale.

### Core Principles

1. **Policy-Constrained**: Agents operate within explicit policy boundaries
2. **Human-in-the-Loop**: Critical decisions require human approval
3. **No Guessing**: Unknown information triggers HITL escalation
4. **Traceable**: All agent actions are logged and auditable
5. **Three-Pass Execution**: Plan, Execute, Verify pattern for safety
6. **Role-Based Permissions**: Agents have different capabilities based on role

### Key Concepts

**Agent**: An AI system that performs tasks within governance constraints  
**HITL (Human-in-the-Loop)**: Human oversight for critical decisions  
**Task Packet**: Structured input that defines an agent's task  
**Agent Log**: Record of agent actions and decisions  
**Agent Trace**: Detailed execution trace for audit and debugging  
**UNKNOWN**: Marker for information that agent cannot determine

---

## Agent Execution Model

### High-Level Flow

```
┌────────────────┐
│  Task Packet   │  ← Input: Structured task description
└────────────────┘
        │
        ▼
┌────────────────┐
│  Read Policies │  ← Load governance rules
│  Read Manifest │
└────────────────┘
        │
        ▼
┌────────────────┐
│   Pass 1:      │  ← Plan the work
│   PLAN         │
└────────────────┘
        │
        ▼
┌────────────────┐
│   Human        │  ← Review plan (if needed)
│   Review?      │
└────────────────┘
        │
        ▼
┌────────────────┐
│   Pass 2:      │  ← Execute the plan
│   EXECUTE      │
└────────────────┘
        │
        ▼
┌────────────────┐
│   Pass 3:      │  ← Verify results
│   VERIFY       │
└────────────────┘
        │
        ▼
┌────────────────┐
│  Create Logs   │  ← Document everything
│  Create Trace  │
└────────────────┘
        │
        ▼
┌────────────────┐
│  Submit PR     │  ← Output: Pull request with evidence
│  with Evidence │
└────────────────┘
```

### Execution Context

Every agent execution operates within a context that includes:

1. **Governance Policies**: Rules from `.repo/policy/`
2. **Manifest Commands**: Canonical commands from `repo.manifest.yaml`
3. **Agent Role**: Permissions and capabilities
4. **Boundaries**: Architectural constraints
5. **Quality Gates**: Required checks
6. **Security Baseline**: Security requirements

### Agent Lifecycle

```
1. Initialization
   ├─ Load governance configuration
   ├─ Validate agent role
   └─ Set up logging

2. Task Acceptance
   ├─ Receive task packet
   ├─ Validate task is within capabilities
   └─ Declare UNKNOWNs if any

3. Planning Phase (Pass 1)
   ├─ Analyze requirements
   ├─ Check boundaries
   ├─ Identify risks
   └─ Generate plan

4. Execution Phase (Pass 2)
   ├─ Apply planned changes
   ├─ Follow boundaries and principles
   └─ Log all modifications

5. Verification Phase (Pass 3)
   ├─ Run tests
   ├─ Validate quality gates
   ├─ Collect evidence
   └─ Generate trace

6. Documentation
   ├─ Create agent log
   ├─ Generate trace file
   └─ Update ADRs if needed

7. Submission
   ├─ Create pull request
   ├─ Attach evidence
   └─ Request review
```

---

## Three-Pass System

The Three-Pass System ensures safe, deliberate code changes by requiring planning, execution, and verification as separate steps.

### Pass 1: PLAN

**Purpose**: Think before acting

**Activities:**
- Analyze the task requirements
- List all files to be modified
- Identify potential risks
- Check boundary constraints
- Declare UNKNOWNs
- Generate detailed plan

**Outputs:**
- List of planned actions
- Files to be modified
- Risk assessment
- UNKNOWN items (if any)
- Request for approval (if needed)

**Example Plan:**
```markdown
## Pass 1: Plan

### Objective
Add user authentication to the checkout flow

### Files to Modify
1. src/sales/checkout/ui/CheckoutPage.tsx
2. src/sales/checkout/domain/CheckoutService.ts
3. src/user-management/auth/domain/AuthService.ts

### Risks
- Cross-feature dependency (checkout → auth) requires ADR
- Breaking change to CheckoutService API

### UNKNOWNs
- None

### Plan
1. Create ADR for checkout-auth coupling
2. Update CheckoutService to validate auth token
3. Modify CheckoutPage to show login prompt
4. Add integration tests
```

**Review Point**: Complex plans may require human review before proceeding to Pass 2.

---

### Pass 2: EXECUTE

**Purpose**: Apply planned changes systematically

**Activities:**
- Follow the plan from Pass 1
- Apply code changes
- Respect boundaries and principles
- Log each modification
- Reference plan for each change

**Requirements:**
- Changes must match the plan
- No ad-hoc modifications
- All changes logged with filepaths
- Boundaries respected

**Outputs:**
- Modified source files
- Updated tests
- Documentation updates
- Change log

**Example Execution:**
```markdown
## Pass 2: Execute

### Changes Made

1. Created ADR: docs/adr/0023-checkout-auth-integration.md
   - Documented necessity of coupling
   - Listed alternatives considered
   - Justified decision

2. Modified: src/sales/checkout/domain/CheckoutService.ts
   - Added auth token validation
   - Lines changed: 45-52
   - Added error handling for invalid tokens

3. Modified: src/sales/checkout/ui/CheckoutPage.tsx
   - Added login prompt component
   - Lines changed: 78-95
   - Maintains existing UI flow

4. Added: src/sales/checkout/domain/CheckoutService.test.ts
   - Test auth validation
   - Test error handling
   - 95% coverage maintained
```

---

### Pass 3: VERIFY

**Purpose**: Confirm changes work correctly

**Activities:**
- Run all tests
- Execute quality gates
- Validate boundaries
- Check security requirements
- Collect evidence
- Generate trace

**Requirements:**
- All tests must pass
- Quality gates satisfied
- No boundary violations
- Security checks passed

**Outputs:**
- Test results
- Quality gate report
- Boundary check results
- Security scan results
- Agent trace file

**Example Verification:**
```markdown
## Pass 3: Verify

### Test Results
✓ Unit tests: 247 passed, 0 failed
✓ Integration tests: 18 passed, 0 failed
✓ E2E tests: 12 passed, 0 failed

### Quality Gates
✓ Code coverage: 95.2% (≥95%)
✓ Linting: 0 errors, 0 warnings
✓ Type checking: No errors
✓ Build: Success

### Boundary Check
✓ No reverse dependencies
✓ Cross-feature dependency documented in ADR
✓ Layer architecture respected

### Security Scan
✓ No vulnerabilities found
✓ No secrets in code
✓ No forbidden patterns

### Evidence
- Test output: artifacts/test-results.json
- Coverage report: artifacts/coverage.html
- Build log: artifacts/build.log
- Agent trace: .repo/archive/traces/trace-2026-01-22-checkout-auth.json
```

---

## Decision Tree

### Agent Decision Flow

```
┌─────────────────────────────────┐
│    Receive Task                 │
└─────────────────────────────────┘
              │
              ▼
       Is task clear?
              │
        ┌─────┴─────┐
       No           Yes
        │             │
        ▼             ▼
  ┌──────────┐  ┌──────────┐
  │ Declare  │  │ Analyze  │
  │ UNKNOWN  │  │ Policies │
  │ + HITL   │  └──────────┘
  └──────────┘        │
                      ▼
              Within capabilities?
                      │
              ┌───────┴───────┐
             No              Yes
              │                │
              ▼                ▼
        ┌──────────┐    ┌──────────┐
        │ Escalate │    │ Check    │
        │ to HITL  │    │Boundaries│
        └──────────┘    └──────────┘
                              │
                              ▼
                    Boundaries satisfied?
                              │
                      ┌───────┴───────┐
                     No              Yes
                      │                │
                      ▼                ▼
              ┌──────────┐      ┌──────────┐
              │ Request  │      │ Execute  │
              │ ADR or   │      │Three-Pass│
              │ Waiver   │      │ System   │
              └──────────┘      └──────────┘
                                      │
                                      ▼
                            All checks passed?
                                      │
                              ┌───────┴───────┐
                             No              Yes
                              │                │
                              ▼                ▼
                      ┌──────────┐      ┌──────────┐
                      │ Report   │      │ Submit   │
                      │ Failure  │      │ PR with  │
                      │ + HITL   │      │ Evidence │
                      └──────────┘      └──────────┘
```

### Key Decision Points

#### 1. Clarity Check
**Question**: Do I understand all requirements?  
**If NO**: Declare UNKNOWN and create HITL item  
**If YES**: Proceed to policy analysis

#### 2. Capability Check
**Question**: Is this task within my role's capabilities?  
**If NO**: Escalate to HITL (human or higher-privileged agent)  
**If YES**: Proceed to boundary check

#### 3. Boundary Check
**Question**: Do my planned changes respect boundaries?  
**If NO**: Request ADR or waiver  
**If YES**: Proceed to execution

#### 4. Verification Check
**Question**: Did all quality gates pass?  
**If NO**: Report failure, request guidance  
**If YES**: Submit PR

---

## HITL Integration

### When HITL is Required

**Mandatory HITL Situations:**
1. **UNKNOWN Information**: Agent cannot determine required information
2. **Security Changes**: Any security-related modifications
3. **Breaking Changes**: API contract changes that break compatibility
4. **Cross-Feature Dependencies**: New dependencies between features
5. **Boundary Violations**: When rules cannot be automatically satisfied
6. **Policy Waivers**: Requesting exception to governance policies
7. **Schema Changes**: Database or critical data structure modifications
8. **Release Operations**: Deployment and release process changes

**Optional HITL Situations:**
- Complex refactorings (agent discretion)
- Ambiguous requirements (agent discretion)
- Risk mitigation (agent discretion)

### HITL Process

```
Agent encounters HITL trigger
        │
        ▼
Create HITL item in .repo/hitl/
        │
        ├─ ID: Unique identifier
        ├─ Type: Category of decision
        ├─ Description: Clear explanation
        ├─ Context: Relevant information
        ├─ Options: Possible solutions
        ├─ Recommendation: Agent's suggestion
        └─ Urgency: Priority level
        │
        ▼
Notify human reviewer
        │
        ▼
Wait for human decision
        │
        ▼
Receive decision + rationale
        │
        ▼
Log decision in HITL item
        │
        ▼
Continue execution with guidance
```

### HITL Item Template

```markdown
# HITL Item: <ID>

**Status**: Pending  
**Type**: <security|boundary|unknown|breaking-change|etc>  
**Priority**: <P0|P1|P2>  
**Created**: 2026-01-22 14:30:00  
**Agent**: primary-agent  

## Description
Clear explanation of what decision is needed

## Context
- Current state
- Attempted solutions
- Constraints

## Options
1. Option A: Description, pros, cons
2. Option B: Description, pros, cons
3. Option C: Description, pros, cons

## Agent Recommendation
Option B because...

## Human Decision
(To be filled by human reviewer)

## Rationale
(Human's reasoning)

## Resolution
(How this was implemented)
```

---

## Agent Communication

### Communication Channels

1. **Task Packets**: Structured input to agents
2. **Agent Logs**: Output from agents
3. **HITL Items**: Agent-to-human communication
4. **Pull Requests**: Agent-to-team communication
5. **Comments**: In-code documentation
6. **Traces**: Detailed execution logs

### Task Packet Format

```json
{
  "id": "TASK-2026-01-22-001",
  "title": "Add user authentication to checkout",
  "objective": "Implement auth token validation in checkout flow",
  "context": {
    "repository": "myapp",
    "feature": "sales/checkout",
    "related_tickets": ["JIRA-1234"]
  },
  "requirements": [
    "Validate auth token before checkout",
    "Show login prompt if not authenticated",
    "Maintain existing checkout UX"
  ],
  "constraints": [
    "Must respect layer boundaries",
    "No breaking API changes",
    "95% test coverage"
  ],
  "success_criteria": [
    "All tests pass",
    "Security scan clean",
    "ADR created for cross-feature dependency"
  ],
  "assigned_to": "primary-agent",
  "priority": "P1",
  "deadline": "2026-01-24"
}
```

### Agent Log Format

```markdown
# Agent Log: TASK-2026-01-22-001

**Task**: Add user authentication to checkout  
**Agent**: primary-agent  
**Date**: 2026-01-22  
**Status**: Completed

## Summary
Successfully added auth token validation to checkout flow with cross-feature coupling documented in ADR.

## Pass 1: Plan
(Plan details...)

## Pass 2: Execute
(Execution details...)

## Pass 3: Verify
(Verification results...)

## Files Modified
- src/sales/checkout/domain/CheckoutService.ts
- src/sales/checkout/ui/CheckoutPage.tsx
- docs/adr/0023-checkout-auth-integration.md

## ADRs Created
- ADR-0023: Checkout-Auth Integration

## HITL Items
- None

## Evidence
- Test results: attached
- Coverage report: attached
- Security scan: passed
```

---

## Agent Roles

The governance system defines four standard agent roles with different capabilities.

### Primary Agent

**Purpose**: Day-to-day development tasks  
**Capability Level**: 2 (Standard)

**Can Do:**
- Create and modify features
- Refactor code
- Fix bugs
- Create ADRs
- Run verification profiles

**Cannot Do:**
- Add dependencies (requires escalation)
- Modify security code (requires escalation)
- Apply waivers (human only)
- Update release process (human only)

**Configuration**: `.repo/agents/roles/primary.md`

---

### Secondary Agent

**Purpose**: Support and specialized tasks  
**Capability Level**: 1 (Basic)

**Can Do:**
- Modify existing code (within boundaries)
- Create documentation
- Create ADRs
- Create task packets

**Cannot Do:**
- Create new features (requires escalation)
- Add dependencies (requires escalation)
- Modify schemas (requires escalation)

**Configuration**: `.repo/agents/roles/secondary.md`

---

### Reviewer Agent

**Purpose**: Code review and validation  
**Capability Level**: 3 (Advanced)

**Can Do:**
- All Primary Agent capabilities
- Add dependencies (with ADR)
- Change API contracts (with ADR)
- Approve waivers (with documentation)

**Cannot Do:**
- Security changes (requires human)
- Release operations (human only)

**Configuration**: `.repo/agents/roles/reviewer.md`

---

### Release Manager (Human Only)

**Purpose**: Release and deployment  
**Capability Level**: 5 (Release)

**Can Do:**
- All capabilities
- Update release process
- Apply policy waivers
- Override quality gates (with documentation)

**Requirements:**
- Must be human
- Requires elevated permissions
- All actions logged

**Configuration**: `.repo/agents/roles/release.md`

---

## Agent Capabilities

See [capabilities.md](../../templates/.repo/agents/capabilities.md) for full list.

### Capability Hierarchy

```
Level 5: Release (Human Only)
├─ update_release_process
└─ apply_waiver

Level 4: Security
├─ Level 3 capabilities
└─ update_security (with HITL)

Level 3: Advanced
├─ Level 2 capabilities
├─ add_dependency
├─ change_api_contract
└─ change_schema

Level 2: Standard
├─ Level 1 capabilities
├─ create_feature
└─ run_verification_profiles

Level 1: Basic
├─ modify_existing
├─ create_adr
└─ create_task_packet
```

### Capability Enforcement

Capabilities are enforced through:
1. **Role Check**: Agent declares role at start
2. **Policy Validation**: Actions checked against role permissions
3. **HITL Escalation**: Unauthorized actions trigger HITL
4. **Audit Trail**: All capability usage logged

---

## Logging and Traceability

### Agent Log

**Purpose**: Human-readable record of agent actions  
**Location**: `.repo/archive/logs/`  
**Format**: Markdown  
**Template**: `.repo/templates/AGENT_LOG_TEMPLATE.md`

### Agent Trace

**Purpose**: Machine-readable execution details  
**Location**: `.repo/archive/traces/`  
**Format**: JSON  
**Schema**: `.repo/templates/AGENT_TRACE_SCHEMA.json`

**Example Trace:**
```json
{
  "trace_id": "TRACE-2026-01-22-001",
  "task_id": "TASK-2026-01-22-001",
  "agent_role": "primary",
  "timestamp_start": "2026-01-22T14:30:00Z",
  "timestamp_end": "2026-01-22T14:45:00Z",
  "passes": {
    "plan": {
      "duration_seconds": 120,
      "files_planned": 3,
      "risks_identified": 1,
      "unknowns": 0
    },
    "execute": {
      "duration_seconds": 300,
      "files_modified": 3,
      "lines_added": 45,
      "lines_removed": 12
    },
    "verify": {
      "duration_seconds": 180,
      "tests_run": 277,
      "tests_passed": 277,
      "tests_failed": 0,
      "quality_gates_passed": true
    }
  },
  "hitl_items": [],
  "adrs_created": ["0023"],
  "result": "success"
}
```

### Log Retention

- **Active Logs**: Kept in `.repo/archive/logs/` indefinitely
- **Traces**: Kept in `.repo/archive/traces/` for audit
- **Sensitive Data**: Never logged (see Security Model)

---

## Security Model

### Security Principles

1. **No Secrets in Logs**: Credentials, tokens, keys never logged
2. **Least Privilege**: Agents have minimal required permissions
3. **Human Oversight**: Security changes require human approval
4. **Audit Trail**: All security-relevant actions logged
5. **Fail Secure**: Unknown situations default to HITL

### Security Constraints

**Agents CANNOT:**
- Bypass security checks
- Disable security scans
- Commit secrets
- Modify security policies without HITL
- Access production systems directly

**Agents MUST:**
- Validate all inputs
- Sanitize all outputs
- Follow security baseline
- Request HITL for security changes
- Document security decisions

### Security Review Triggers

From `.repo/policy/SECURITY_BASELINE.md`:
1. Adding/changing dependencies
2. Modifying authentication/authorization
3. Changing cryptographic code
4. Updating sensitive data handling
5. Modifying security configurations
6. Changing API endpoints
7. Updating deployment configurations
8. Modifying secrets management
9. Changing CORS/CSP policies
10. Updating security-related dependencies

All triggers require HITL and human security review.

---

## See Also

- [Architecture Overview](./ARCHITECTURE_OVERVIEW.md) - System architecture
- [Security Architecture](./SECURITY_ARCHITECTURE.md) - Security design
- [Agents Policy](../../templates/.repo/agents/AGENTS.md) - Agent rules
- [HITL Policy](../../templates/.repo/policy/HITL.md) - HITL process
- [Capabilities Reference](../../templates/.repo/agents/capabilities.md) - All capabilities

---

**Version:** 1.0.0  
**Last Updated:** 2026-01-22  
**Maintainer:** TrevorPLam/governance
