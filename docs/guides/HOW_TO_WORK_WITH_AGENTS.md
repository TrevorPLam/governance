# How To: Work With Agents
## Step-by-Step Guide to AI Agent Collaboration

**Purpose:** Learn how to effectively work with AI agents, configure agent roles, manage permissions, monitor actions, handle HITL escalations, and troubleshoot agent issues.

**Time Required:** 30-60 minutes  
**Skill Level:** Intermediate

---

## Table of Contents

1. [Understanding Agents](#understanding-agents)
2. [Agent Setup](#agent-setup)
3. [Defining Agent Roles](#defining-agent-roles)
4. [Agent Permissions](#agent-permissions)
5. [Monitoring Agent Actions](#monitoring-agent-actions)
6. [HITL Escalation](#hitl-escalation)
7. [Troubleshooting Agents](#troubleshooting-agents)

---

## Understanding Agents

### What Are Agents?

Agents are **AI assistants that follow governance rules** to perform repository tasks:

- **Primary Agent** - Creates features, fixes bugs, implements changes
- **Secondary Agent** - Reviews code, checks quality, enforces rules
- **Reviewer Agent** - Approves/rejects PRs, manages waivers
- **Release Agent** - Handles deployments, manages releases

### How Agents Work

```
┌─────────────────────────────────────────────┐
│  Agent Execution Flow                       │
├─────────────────────────────────────────────┤
│                                             │
│  1. Read Policies (.repo/policy/)          │
│     ↓                                       │
│  2. Check Capabilities (agents/roles/)     │
│     ↓                                       │
│  3. Execute in 3 Passes:                   │
│     • Pass 1: Plan                         │
│     • Pass 2: Change                       │
│     • Pass 3: Verify                       │
│     ↓                                       │
│  4. Create Logs & Evidence                 │
│     ↓                                       │
│  5. Escalate to HITL if needed             │
│                                             │
└─────────────────────────────────────────────┘
```

### Key Principles

**Agents follow strict rules:**
- ✅ **No guessing** - If unsure, create HITL item
- ✅ **Always cite filepaths** - All references include full paths
- ✅ **Three-pass process** - Plan → Change → Verify
- ✅ **Log everything** - Full audit trail
- ✅ **Enforce boundaries** - Follow architectural rules
- ✅ **Require ADRs** - Document important decisions
- ✅ **Respect quality gates** - Meet or request waiver

---

## Agent Setup

### Step 1: Understand Agent Roles

Check available agent roles:

```bash
# View agent roles
ls .repo/agents/roles/

# Output:
primary.md    # Creates features and fixes bugs
secondary.md  # Reviews and validates changes
reviewer.md   # Approves PRs and manages waivers
release.md    # Handles deployments
```

### Step 2: Review Agent Capabilities

Open `.repo/agents/capabilities.md` to see what agents can do:

**Capability Levels:**

**Level 1: Basic**
- Modify existing code (within boundaries)
- Create ADRs
- Create task packets

**Level 2: Standard**
- Level 1 capabilities
- Create new features
- Run verification profiles

**Level 3: Advanced**
- Level 2 capabilities
- Add dependencies (with ADR)
- Change API contracts (with ADR)
- Modify schemas (with migration plan)

**Level 4: Security**
- Level 3 capabilities
- Update security (with HITL)

**Level 5: Release (Human Only)**
- Update release process
- Apply waivers

### Step 3: Configure Agent in Manifest

Open `.repo/repo.manifest.yaml` and configure agent settings:

```yaml
# Agent configuration
agents:
  primary:
    role: "primary"
    capabilities: ["create_feature", "modify_existing", "create_adr"]
    restrictions:
      - "Must create ADR for cross-feature dependencies"
      - "Cannot modify security-critical code without HITL"
      - "Must follow three-pass process"
  
  reviewer:
    role: "reviewer"
    capabilities: ["approve_pr", "request_changes", "manage_waivers"]
    restrictions:
      - "Must verify all quality gates passed"
      - "Cannot approve own changes"
      - "Must escalate security issues to HITL"

# HITL configuration
hitl:
  required_for:
    - "security_changes"
    - "schema_migrations"
    - "api_breaking_changes"
    - "external_integrations"
  escalation_keywords:
    - "credentials"
    - "token"
    - "billing"
    - "payment"
    - "oauth"
    - "production deploy"
```

### Step 4: Create Agent Prompts

Customize agent prompts in `.repo/agents/prompts/`:

**Example: Task Packet Template**
```markdown
<!-- .repo/agents/prompts/task-packet-template.md -->

# Task Packet: [TASK_ID]

## Objective
[Clear, specific goal]

## Context
**Related Files:**
- [filepath 1]
- [filepath 2]

**Dependencies:**
- [dependency 1]
- [dependency 2]

**Constraints:**
- Must maintain backward compatibility
- Must follow boundary rules
- Must add tests

## Success Criteria
- [ ] Feature works as specified
- [ ] Tests pass (coverage ≥ 80%)
- [ ] No boundary violations
- [ ] Documentation updated
- [ ] ADR created (if needed)

## Risks
- Risk 1: [description and mitigation]
- Risk 2: [description and mitigation]

## Agent Instructions
1. Read related files thoroughly
2. Plan changes (Pass 1)
3. Implement changes (Pass 2)
4. Verify and test (Pass 3)
5. Create agent log
6. Submit PR
```

---

## Defining Agent Roles

### Step 5: Customize Primary Agent Role

Edit `.repo/agents/roles/primary.md`:

```markdown
# Primary Agent Role

## Responsibilities
- Create new features
- Fix bugs
- Refactor code
- Write tests
- Update documentation

## Capabilities
- create_feature
- modify_existing
- create_adr
- create_task_packet
- run_verification_profiles

## Restrictions
- Cannot modify .repo/policy/ files
- Cannot bypass quality gates
- Cannot merge without review
- Must create HITL for UNKNOWNs
- Must follow three-pass process

## Required Actions
- **Pass 1: Plan**
  - List all files to modify
  - Identify risks
  - Check boundaries
  - Declare UNKNOWNs

- **Pass 2: Change**
  - Apply planned edits
  - Follow principles
  - Log changes

- **Pass 3: Verify**
  - Run tests
  - Collect evidence
  - Create logs

## Workflow Example
1. Receive task packet
2. Read related code
3. Plan changes (Pass 1)
4. Get approval for plan
5. Implement changes (Pass 2)
6. Run tests (Pass 3)
7. Create agent log
8. Submit PR for review
```

### Step 6: Customize Reviewer Agent Role

Edit `.repo/agents/roles/reviewer.md`:

```markdown
# Reviewer Agent Role

## Responsibilities
- Review PRs
- Approve or request changes
- Manage waivers
- Enforce quality gates
- Escalate to HITL

## Capabilities
- Review code
- Check quality gates
- Request waivers
- Approve PRs (if gates pass)
- Create HITL items

## Review Checklist
- [ ] All tests pass
- [ ] Coverage meets threshold
- [ ] No boundary violations
- [ ] ADR created (if required)
- [ ] Security check passed
- [ ] Documentation updated
- [ ] Agent log present
- [ ] No UNKNOWN markers

## Decision Tree
```
Are all quality gates passed?
├─ Yes
│  └─ Is ADR needed?
│     ├─ Yes
│     │  └─ Does ADR exist?
│     │     ├─ Yes → APPROVE
│     │     └─ No → REQUEST CHANGES
│     └─ No → APPROVE
└─ No
   └─ Can be waived?
      ├─ Yes → REQUEST WAIVER
      └─ No → REQUEST CHANGES
```

## Escalation Rules
Escalate to HITL if:
- Security vulnerabilities found
- External integration changes
- Breaking API changes
- Schema migrations
- Risk level HIGH
```

---

## Agent Permissions

### Step 7: Configure Layer Access

Agents have different access to layers:

**Layer 1: CUSTOM** (Full Access)
- ✅ Agents can modify
- Files: `HITL.md`, `WAIVERS.md`, prompts, ADRs

**Layer 2: UPDATEABLE** (Read Only)
- ❌ Agents cannot modify
- Files: Most policy files, agent framework
- Updates come from governance repository

**Layer 3: REFERENCE** (Read Only)
- ❌ Agents cannot modify
- Files: Templates, standards

**Configure in manifest:**
```yaml
agents:
  primary:
    layer_access:
      layer1: "read_write"  # Can modify custom files
      layer2: "read_only"   # Can read policies
      layer3: "read_only"   # Can read templates
    forbidden_paths:
      - ".repo/policy/CONSTITUTION.md"
      - ".repo/policy/PRINCIPLES.md"
      - ".repo/policy/QUALITY_GATES.md"
      - ".repo/policy/SECURITY_BASELINE.md"
```

### Step 8: Define Capability Matrix

Create capability matrix for your team:

| Capability | Primary | Secondary | Reviewer | Release | Human |
|-----------|---------|-----------|----------|---------|-------|
| create_feature | ✅ | ❌ | ❌ | ❌ | ✅ |
| modify_existing | ✅ | ✅ | ❌ | ❌ | ✅ |
| add_dependency | ✅ (with ADR) | ❌ | ❌ | ❌ | ✅ |
| change_api | ✅ (with ADR) | ❌ | ❌ | ❌ | ✅ |
| change_schema | ✅ (with ADR) | ❌ | ❌ | ❌ | ✅ |
| update_security | HITL | ❌ | ❌ | ❌ | ✅ |
| approve_pr | ❌ | ✅ | ✅ | ❌ | ✅ |
| apply_waiver | ❌ | ❌ | HITL | ❌ | ✅ |
| release | ❌ | ❌ | ❌ | HITL | ✅ |

---

## Monitoring Agent Actions

### Step 9: Review Agent Logs

Agents create detailed logs of all actions:

**Agent Log Location:**
```
docs/agent-logs/
├── AGENT_LOG_2026-01-22_feature-auth.md
├── AGENT_LOG_2026-01-22_fix-bug-123.md
└── AGENT_TRACE_2026-01-22_pr-234.json
```

**Agent Log Format:**
```markdown
<!-- docs/agent-logs/AGENT_LOG_2026-01-22_feature-auth.md -->

# Agent Log: Add Authentication Feature

**Agent Role:** Primary  
**Task ID:** TASK-045  
**Date:** 2026-01-22  
**Status:** Completed

## Pass 1: Plan
**Planned Actions:**
1. Create auth service: `src/auth/domain/authService.ts`
2. Create auth API: `src/auth/data/authApi.ts`
3. Add tests: `src/auth/__tests__/authService.test.ts`
4. Update manifest commands

**Risks Identified:**
- Risk: Password storage security
- Mitigation: Use bcrypt with salt rounds ≥ 12

**UNKNOWNs Declared:**
- None

**Boundary Check:**
- auth/domain → auth/data ✅
- auth/data → platform/http ✅
- No violations

## Pass 2: Change
**Files Modified:**
- Created: `src/auth/domain/authService.ts` (145 lines)
- Created: `src/auth/data/authApi.ts` (89 lines)
- Created: `src/auth/__tests__/authService.test.ts` (234 lines)
- Modified: `.repo/repo.manifest.yaml` (added auth:check command)

**Changes Summary:**
- Implemented JWT-based authentication
- Added password hashing with bcrypt
- Created login/logout/refresh endpoints
- Added comprehensive test coverage

## Pass 3: Verify
**Tests Run:**
```
✓ Auth service tests (18 tests)
✓ Auth API tests (12 tests)
✓ Integration tests (5 tests)

Coverage: 87% (target: 80%) ✅
```

**Quality Gates:**
- [x] Tests pass
- [x] Coverage ≥ 80%
- [x] No boundary violations
- [x] No security issues
- [x] Documentation updated

## Evidence
- Test results: `docs/test-results/auth-tests-2026-01-22.txt`
- Coverage report: `coverage/lcov-report/index.html`
- ADR: `docs/adr/0012-jwt-authentication.md`

## Related Items
- Task Packet: `TASK-045`
- PR: `#234`
- ADR: `ADR-0012`
```

### Step 10: Check Agent Traces

Agent traces provide machine-readable audit trail:

```json
// docs/agent-logs/AGENT_TRACE_2026-01-22_pr-234.json
{
  "agent_role": "primary",
  "task_id": "TASK-045",
  "timestamp": "2026-01-22T10:30:00Z",
  "pass_1_plan": {
    "planned_files": [
      "src/auth/domain/authService.ts",
      "src/auth/data/authApi.ts",
      "src/auth/__tests__/authService.test.ts"
    ],
    "risks": [
      {
        "risk": "Password storage security",
        "mitigation": "Use bcrypt with salt rounds ≥ 12"
      }
    ],
    "unknowns": [],
    "boundary_violations": []
  },
  "pass_2_changes": {
    "files_created": 3,
    "files_modified": 1,
    "lines_added": 468,
    "lines_deleted": 0
  },
  "pass_3_verify": {
    "tests_run": 35,
    "tests_passed": 35,
    "coverage": 87,
    "quality_gates_passed": true
  }
}
```

### Step 11: Monitor Agent Dashboard

Use CLI to monitor agent activity:

```bash
# View recent agent activity
governance-cli agent list

# Output:
╔══════════════╤═══════════╤═════════════╤════════════╗
║ Agent        │ Task ID   │ Status      │ Date       ║
╟──────────────┼───────────┼─────────────┼────────────╢
║ Primary      │ TASK-045  │ Completed   │ 2026-01-22 ║
║ Reviewer     │ PR-234    │ Approved    │ 2026-01-22 ║
║ Primary      │ TASK-046  │ In Progress │ 2026-01-22 ║
╚══════════════╧═══════════╧═════════════╧════════════╝

# View agent statistics
governance-cli agent stats

# Output:
Agent Performance (Last 30 Days)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Tasks Completed:        47
Success Rate:          94%
HITL Escalations:       3
Waiver Requests:        2
Average Time:         2.5h
Quality Gate Pass:     96%
```

---

## HITL Escalation

### Step 12: Understanding HITL

HITL (Human-In-The-Loop) escalations happen when agents need human decisions:

**When Agents Escalate:**
- ❓ **UNKNOWN** - Cannot determine something (command, config, etc.)
- 🔒 **Security** - Security-related changes detected
- 🚨 **High Risk** - Risk level HIGH or above
- 🔌 **External** - External system integration
- ⚠️ **Breaking Change** - API breaking change
- 📊 **Schema** - Database schema migration

### Step 13: Handle HITL Items

When agent creates HITL item:

**1. Agent Creates HITL:**
```markdown
<!-- .repo/hitl/HITL-0001.md -->

# HITL Item: HITL-0001

**Category:** External Integration  
**Status:** PENDING  
**Created:** 2026-01-22  
**Owner:** @tech-lead

## Summary
Need to configure AWS S3 credentials for file upload feature

## Context
Implementing file upload feature in Task TASK-046.
Cannot determine AWS credentials from repository.

## Required Human Action
1. Create AWS S3 bucket
2. Generate access key and secret
3. Add credentials to environment variables:
   - `AWS_S3_BUCKET`
   - `AWS_ACCESS_KEY_ID`
   - `AWS_SECRET_ACCESS_KEY`
4. Update `.env.example` with placeholder values

## Why Agent Cannot Proceed
- External credentials required
- Security-sensitive operation
- Cannot guess or generate credentials

## What Agent Will Do After Resolution
1. Update manifest with S3 configuration
2. Create S3 upload service
3. Add tests (with mocked S3)
4. Complete feature implementation

## Related
- Task: TASK-046
- PR: #235 (blocked)
```

**2. Human Resolves:**
```markdown
**Status:** COMPLETED  
**Completed:** 2026-01-22  
**Completed By:** @tech-lead

## Evidence of Completion
- [x] Created S3 bucket: `myapp-uploads-prod`
- [x] Generated access key: `AKIA...` (stored in secrets manager)
- [x] Updated `.env` with credentials
- [x] Updated `.env.example` with placeholders

## Notes for Agent
- Bucket is in `us-east-1` region
- Use `AWS_REGION=us-east-1`
- Bucket has CORS configured for `https://myapp.com`
- Max file size: 10MB
```

**3. Agent Continues:**
```markdown
# Agent Log (Continued)

## HITL Resolution
**HITL-0001:** Resolved by @tech-lead on 2026-01-22

**Actions Taken After Resolution:**
1. ✅ Updated manifest with S3 config
2. ✅ Created S3 upload service
3. ✅ Added tests with mocked S3
4. ✅ Feature completed

**PR Updated:** #235 (unblocked, ready for review)
```

### Step 14: HITL Best Practices

**Do's ✅:**
- Resolve HITL items quickly (agents are blocked)
- Provide complete information
- Document evidence
- Update related items
- Communicate with agent

**Don'ts ❌:**
- Don't ignore HITL items (blocks progress)
- Don't provide partial information
- Don't skip evidence documentation
- Don't forget to update status

---

## Troubleshooting Agents

### Issue 1: Agent Not Following Rules

**Symptom:** Agent violates policies or ignores rules

**Diagnosis:**
```bash
# Check agent configuration
cat .repo/repo.manifest.yaml | grep -A 10 "agents:"

# Check agent logs
cat docs/agent-logs/latest.md
```

**Solutions:**

1. **Update agent role definition:**
```markdown
# .repo/agents/roles/primary.md
## Restrictions (REQUIRED)
- MUST follow three-pass process
- MUST create HITL for UNKNOWNs
- MUST respect boundaries
- CANNOT bypass quality gates
```

2. **Add explicit constraints:**
```yaml
# .repo/repo.manifest.yaml
agents:
  primary:
    strict_mode: true  # Enforce all rules strictly
    auto_fail_on_violation: true
```

### Issue 2: Too Many HITL Escalations

**Symptom:** Agent escalates everything to HITL

**Diagnosis:**
```bash
# Check HITL rate
governance-cli agent stats

# If HITL rate > 20%, investigate
```

**Solutions:**

1. **Provide more context in manifest:**
```yaml
commands:
  install: "npm install"  # Was: <UNKNOWN>
  check:quick: "npm run test:unit"  # Was: <UNKNOWN>
```

2. **Add clarifications in policies:**
```markdown
<!-- .repo/policy/BOUNDARIES.md -->
## Exceptions (CLARIFIED)
- Testing utilities may import from any layer
- Platform utilities have no restrictions
- Config files are not subject to boundaries
```

3. **Update agent prompts:**
```markdown
<!-- .repo/agents/prompts/clarifications.md -->
# Common Clarifications

## When NOT to create HITL:
- Test files can import anything (for testing purposes)
- Configuration files are not code boundaries
- Build scripts can access any file
```

### Issue 3: Agent Creates Low-Quality Code

**Symptom:** Agent code doesn't meet standards

**Diagnosis:**
```bash
# Check quality gates
npm run check:ci

# Review agent logs
cat docs/agent-logs/latest.md
```

**Solutions:**

1. **Strengthen quality gates:**
```markdown
<!-- .repo/policy/QUALITY_GATES.md -->
## Code Quality (UPDATED)
- Coverage: 80% minimum (was 70%)
- Complexity: 10 max (was 15)
- Test quality: Must test edge cases
```

2. **Add code review checklist:**
```markdown
<!-- .repo/agents/checklists/pr-review.md -->
## Code Quality Checklist
- [ ] Tests cover happy path AND edge cases
- [ ] Error handling is comprehensive
- [ ] Code follows naming conventions
- [ ] Comments explain WHY, not WHAT
- [ ] No magic numbers or strings
```

3. **Provide examples:**
```markdown
<!-- .repo/agents/prompts/code-quality-examples.md -->
# Good Code Examples

## Error Handling ✅
```typescript
try {
  const result = await api.call();
  return result;
} catch (error) {
  if (error instanceof NetworkError) {
    logger.error('Network error:', error);
    throw new RetryableError(error);
  }
  throw error;
}
```
```

### Issue 4: Agent Logs Missing Information

**Symptom:** Agent logs incomplete or unhelpful

**Solutions:**

1. **Enforce log template:**
```yaml
# .repo/repo.manifest.yaml
agents:
  logging:
    template: ".repo/templates/AGENT_LOG_TEMPLATE.md"
    required_sections:
      - "pass_1_plan"
      - "pass_2_changes"
      - "pass_3_verify"
      - "evidence"
    validation: "strict"
```

2. **Add log validation:**
```bash
# In CI pipeline
governance-cli validate-logs docs/agent-logs/
```

### Issue 5: Agent Performance Issues

**Symptom:** Agent takes too long to complete tasks

**Diagnosis:**
```bash
# Check agent stats
governance-cli agent stats

# Look at average time per task
```

**Solutions:**

1. **Optimize verification:**
```yaml
# .repo/repo.manifest.yaml
verify_profiles:
  quick: [check:quick]  # Use quick checks in development
  ci: [check:ci]        # Full checks in CI only
```

2. **Cache results:**
```yaml
agents:
  caching:
    enabled: true
    cache_boundary_checks: true
    cache_test_results: true
```

3. **Parallelize tasks:**
```yaml
agents:
  execution:
    parallel_tests: true
    parallel_lints: true
```

---

## Next Steps

After setting up agents:

1. **✅ Test agent workflow** - Create test task, monitor execution
2. **✅ Review agent logs** - Ensure quality and completeness
3. **✅ Train team** - Explain agent roles and HITL process
4. **✅ Monitor metrics** - Track success rate, HITL rate
5. **✅ Iterate** - Adjust agent configuration based on results
6. **✅ Document learnings** - Share agent best practices

## Related Guides

- [How To: Configure Manifest](./HOW_TO_CONFIGURE_MANIFEST.md) - Configure agent settings
- [How To: Manage Waivers](./HOW_TO_MANAGE_WAIVERS.md) - Agent waiver requests
- [How To: Define Boundaries](./HOW_TO_DEFINE_BOUNDARIES.md) - Agent boundary enforcement
- [Your First PR](../getting-started/YOUR_FIRST_PR.md) - Agent-assisted PR workflow

## Additional Resources

- `.repo/agents/AGENTS.md` - Agent rules
- `.repo/agents/capabilities.md` - Agent capabilities
- `.repo/agents/roles/` - Agent role definitions
- `.repo/policy/HITL.md` - HITL process
- Phase 2 Documentation - Agent framework

---

**Status:** Ready to use  
**Last Updated:** 2026-01-22  
**Version:** 1.0.0
