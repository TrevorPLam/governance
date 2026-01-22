# Governance Concepts Overview
## Understanding the AI-Native Governance Framework

**Purpose:** Explain core concepts, terminology, and how the governance system works.

**Audience:** Developers, team leads, and anyone using the governance framework.

---

## Table of Contents

1. [Core Concepts](#core-concepts)
2. [Governance Hierarchy](#governance-hierarchy)
3. [Key Components](#key-components)
4. [Authority Chain](#authority-chain)
5. [Agent Execution Model](#agent-execution-model)
6. [Update Strategy](#update-strategy)
7. [Glossary](#glossary)

---

## Core Concepts

### What is AI-Native Governance?

AI-Native Governance is a framework that enables both humans and AI agents to work together effectively within defined boundaries and policies. It provides:

- **Clear Rules:** Written policies that both humans and agents understand
- **Automated Enforcement:** Tools that check compliance automatically
- **Human Oversight:** Points where human judgment is required
- **Flexibility:** Waiver system for legitimate exceptions

### Three Pillars

```
┌─────────────────────────────────────────┐
│  1. POLICIES (What's allowed)           │
│     - Constitution                      │
│     - Principles                        │
│     - Quality Gates                     │
│     - Security Baseline                 │
│     - Boundaries                        │
└─────────────────────────────────────────┘
           ↓
┌─────────────────────────────────────────┐
│  2. AUTOMATION (Enforcement)            │
│     - CLI tool                          │
│     - Validation                        │
│     - Verification                      │
│     - CI/CD integration                 │
└─────────────────────────────────────────┘
           ↓
┌─────────────────────────────────────────┐
│  3. HUMANS (Oversight)                  │
│     - HITL (Human-in-the-Loop)         │
│     - Code review                       │
│     - Waiver approval                   │
│     - Security review                   │
└─────────────────────────────────────────┘
```

---

## Governance Hierarchy

### Layer Model

The governance system uses a 3-layer model:

```
┌────────────────────────────────────────┐
│  Layer 1: CUSTOM (Your Project)        │
│  - repo.manifest.yaml                  │
│  - Custom prompts                      │
│  - HITL tracking                       │
│  - Waiver tracking                     │
│  - Never overwritten by updates        │
└────────────────────────────────────────┘
            ↓
┌────────────────────────────────────────┐
│  Layer 2: UPDATEABLE (Framework)       │
│  - Policies (CONSTITUTION, etc.)       │
│  - Agent framework                     │
│  - Standards                           │
│  - Can be updated, preserves custom    │
└────────────────────────────────────────┘
            ↓
┌────────────────────────────────────────┐
│  Layer 3: REFERENCE (Templates)        │
│  - Document templates                  │
│  - Checklists                          │
│  - Examples                            │
│  - Can be customized freely            │
└────────────────────────────────────────┘
```

**Update Safety:**
- Layer 1 files: Never touched by updates
- Layer 2 files: Updated with merge conflict protection
- Layer 3 files: Updated freely (local changes preserved if marked)

---

## Key Components

### 1. The Constitution (`.repo/policy/CONSTITUTION.md`)

**Purpose:** Fundamental governance rules that override everything else

**8 Articles:**
1. **Agent Authority** - What agents can do
2. **Quality Standards** - Hard gates vs soft guidelines
3. **Security** - Security overrides everything
4. **Human Override** - Humans have final say
5. **Boundaries** - Architectural constraints
6. **Documentation** - Everything must be documented
7. **Waivers** - How to get exceptions
8. **Emergency Protocol** - What to do in emergencies

**Key Principle:** Constitution = Law, everything else = Guidelines

**Example:**
```markdown
Article 3: Security First
- Security issues override all other priorities
- Security vulnerabilities must be fixed immediately
- Security review required for auth, crypto, etc.
```

### 2. Principles (`.repo/policy/PRINCIPLES.md`)

**Purpose:** 23 operating principles for development

**Categories:**
- **P3-P7:** Planning and understanding
- **P8-P12:** Testing and quality
- **P13-P17:** Security and safety
- **P18-P22:** Development practices
- **P23-P25:** Operations

**Key Principles:**
- **P3:** Understand First (don't code what you don't understand)
- **P8:** Test Everything (no code without tests)
- **P14:** Security Paranoia (assume everything is hostile)
- **P19:** Small Changes (atomic, focused PRs)

**Example:**
```markdown
P8: Test Everything
- Every new function must have tests
- Tests must cover edge cases
- Coverage must meet minimum threshold
- Example: Adding auth? Test success, failure, edge cases
```

### 3. Quality Gates (`.repo/policy/QUALITY_GATES.md`)

**Purpose:** Define what "good enough" means

**Types of Gates:**

**Hard Gates (Cannot bypass):**
- Build must succeed
- Security scans must pass
- Critical tests must pass

**Soft Gates (Can waive with approval):**
- Code coverage minimum
- Performance budgets
- Style guidelines

**Coverage Ratchet:**
```
Current coverage: 75%
Minimum allowed: 70% (can't decrease)
Target: 80% (aspirational)

New code must maintain or improve coverage
```

### 4. Security Baseline (`.repo/policy/SECURITY_BASELINE.md`)

**Purpose:** Security requirements and review triggers

**10 Security Review Triggers:**
1. Authentication or authorization changes
2. Cryptography usage
3. Input validation
4. Data access patterns
5. Network communication
6. File system access
7. Dependency changes (security impact)
8. Environment variables
9. Sensitive data handling
10. Third-party integrations

**8 Mandatory HITL Actions:**
1. Production deployments
2. Security-sensitive changes
3. Cryptographic operations
4. Major refactors
5. Infrastructure changes
6. Dependency updates (major)
7. Configuration changes
8. Emergency fixes

### 5. Boundaries (`.repo/policy/BOUNDARIES.md`)

**Purpose:** Enforce architectural constraints

**Layer Architecture:**
```
┌─────────────────────────────────────┐
│  UI Layer                           │
│  - React components                 │
│  - UI logic                         │
│  Can import: domain, platform       │
└─────────────────────────────────────┘
            ↓
┌─────────────────────────────────────┐
│  Domain Layer                       │
│  - Business logic                   │
│  - Services                         │
│  Can import: data, platform         │
└─────────────────────────────────────┘
            ↓
┌─────────────────────────────────────┐
│  Data Layer                         │
│  - Data access                      │
│  - Repositories                     │
│  Can import: platform               │
└─────────────────────────────────────┘
            ↓
┌─────────────────────────────────────┐
│  Platform Layer                     │
│  - Utilities                        │
│  - Infrastructure                   │
│  Can import: nothing                │
└─────────────────────────────────────┘
```

**Rules:**
- ✓ Downward imports allowed
- ✗ Upward imports forbidden
- ✗ Cross-feature imports forbidden (except through domain)
- ✓ Platform can be imported by all

### 6. Manifest (`.repo/repo.manifest.yaml`)

**Purpose:** Configure governance for your project

**Key Sections:**

```yaml
# 1. Project metadata
repository:
  name: "my-project"
  type: "node"

# 2. Build commands
commands:
  install: "npm install"
  build: "npm run build"
  test: "npm test"
  lint: "npm run lint"

# 3. Boundaries
boundaries:
  layers:
    - ui
    - domain
    - data
    - platform

# 4. Quality gates
quality_gates:
  coverage:
    minimum: 70
    target: 80
  performance:
    build_time_seconds: 300

# 5. Agent configuration
agents:
  primary:
    enabled: true
    permissions:
      - create_feature
      - modify_existing
```

### 7. HITL - Human-in-the-Loop (`.repo/policy/HITL.md`)

**Purpose:** Track decisions requiring human judgment

**When to Use:**
- Security-sensitive changes
- Architectural decisions
- Production deployments
- Policy waivers
- Emergency situations

**HITL Entry Structure:**
```markdown
| ID | Date | Type | Description | Status | Approver | Resolution |
|----|------|------|-------------|--------|----------|------------|
| H1 | 2026-01-22 | Security | Auth refactor | Approved | @security-lead | Reviewed and approved |
```

**Statuses:**
- **Pending:** Awaiting human decision
- **Approved:** Human approved
- **Rejected:** Human rejected
- **Escalated:** Needs higher authority

### 8. Waivers (`.repo/policy/WAIVERS.md`)

**Purpose:** Track temporary policy exceptions

**When to Use:**
- Emergency hotfixes
- Legacy code incremental improvement
- Technical debt with plan
- Resource constraints (temporary)

**Waiver Structure:**
```markdown
| ID | Date | Gate | Reason | Expires | Remediation | Status |
|----|------|------|--------|---------|-------------|--------|
| W1 | 2026-01-22 | Coverage | Legacy refactor | 2026-02-15 | JIRA-123 | Active |
```

**Requirements:**
- Valid business reason
- Expiration date (max 30 days)
- Remediation plan
- Approver signature

---

## Authority Chain

### Decision Hierarchy

```
┌────────────────────────────────────────┐
│  Level 1: Constitution                 │
│  - Overrides everything                │
│  - Cannot be waived                    │
│  - Example: Security first             │
└────────────────────────────────────────┘
            ↓
┌────────────────────────────────────────┐
│  Level 2: Hard Gates                   │
│  - Must pass                           │
│  - Cannot be waived                    │
│  - Example: Build must succeed         │
└────────────────────────────────────────┘
            ↓
┌────────────────────────────────────────┐
│  Level 3: Soft Gates                   │
│  - Should pass                         │
│  - Can be waived with approval         │
│  - Example: Coverage minimum           │
└────────────────────────────────────────┘
            ↓
┌────────────────────────────────────────┐
│  Level 4: Guidelines                   │
│  - Best practices                      │
│  - Flexible                            │
│  - Example: Commit message format      │
└────────────────────────────────────────┘
```

### Example: Coverage Check

```
New PR reduces coverage from 80% to 65%

1. Check Constitution: No coverage rule → Continue
2. Check Hard Gates: No hard gate on coverage → Continue
3. Check Soft Gates: Coverage minimum is 70% → FAIL
4. Options:
   a. Add tests to reach 70% (preferred)
   b. Request waiver with justification
```

---

## Agent Execution Model

### How Agents Work

```
┌──────────────────────────────────────┐
│  1. Agent Receives Task              │
│     "Add logging to auth service"    │
└──────────────────────────────────────┘
            ↓
┌──────────────────────────────────────┐
│  2. Agent Reads Policies             │
│     - Constitution                   │
│     - Principles (P3, P8, P14)       │
│     - Security baseline              │
│     - Boundaries                     │
└──────────────────────────────────────┘
            ↓
┌──────────────────────────────────────┐
│  3. Agent Plans Change               │
│     - Respects boundaries            │
│     - Plans tests                    │
│     - Considers security             │
└──────────────────────────────────────┘
            ↓
┌──────────────────────────────────────┐
│  4. Agent Implements                 │
│     - Writes code                    │
│     - Writes tests                   │
│     - Runs quality gates             │
└──────────────────────────────────────┘
            ↓
┌──────────────────────────────────────┐
│  5. Agent Checks for HITL            │
│     Auth change = Security review    │
│     → Escalate to human              │
└──────────────────────────────────────┘
            ↓
┌──────────────────────────────────────┐
│  6. Human Review                     │
│     - Reviews code                   │
│     - Approves or requests changes   │
└──────────────────────────────────────┘
```

### Agent Roles

**Primary Agent:**
- Full development permissions
- Can create features
- Can modify existing code
- Must follow all policies
- Must escalate HITL items

**Secondary Agent:**
- Limited permissions
- Can refactor existing code
- Cannot create new features
- Cannot modify security code
- More restricted

**Reviewer (Human):**
- Enforces governance
- Approves waivers
- Security review
- Final authority

**Release Agent:**
- Deployment permissions
- Production access
- Requires HITL approval

---

## Update Strategy

### How Updates Work

**Scenario:** Governance framework releases v1.1 with updated policies

```
┌────────────────────────────────────┐
│  Your Repository                   │
│  .repo/ (v1.0 + customizations)    │
└────────────────────────────────────┘
            ↓
     governance-cli update
            ↓
┌────────────────────────────────────┐
│  Update Process                    │
│  1. Backup current .repo/          │
│  2. Update Layer 2 files           │
│  3. Preserve Layer 1 customizations│
│  4. Merge conflicts if needed      │
└────────────────────────────────────┘
            ↓
┌────────────────────────────────────┐
│  Result                            │
│  .repo/ (v1.1 + customizations)    │
│  Your changes preserved ✓          │
└────────────────────────────────────┘
```

**Safe Updates:**
- Layer 1 (custom): Never touched
- Layer 2 (policies): Smart merge
- Layer 3 (templates): Updated with conflict detection

---

## Glossary

### A

**Agent** - AI system that writes code following governance policies

**Authority Chain** - Hierarchy of decision-making (Constitution → Hard Gates → Soft Gates → Guidelines)

### B

**Boundaries** - Architectural constraints (layer rules, import restrictions)

### C

**Constitution** - Fundamental governance rules that override everything

**Coverage Ratchet** - Policy that prevents coverage from decreasing

### D

**Definition of Done** - Criteria that must be met for work to be complete

### G

**Governance** - System of policies, automation, and oversight

### H

**Hard Gate** - Quality check that cannot be bypassed

**HITL (Human-in-the-Loop)** - Points requiring human judgment

### L

**Layer** - Architectural level (ui, domain, data, platform)

### M

**Manifest** - Configuration file (repo.manifest.yaml) for your project

### P

**Principles** - 23 operating guidelines (P3-P25)

### Q

**Quality Gates** - Checks that must pass before merging

### S

**Soft Gate** - Quality check that can be waived with approval

**Security Baseline** - Minimum security requirements

### W

**Waiver** - Temporary exception to a policy requirement

---

## Visual Reference

### Complete System Architecture

```
┌─────────────────────────────────────────────────────────┐
│  Governance Repository (Source of Truth)                │
│  └── templates/                                         │
│      ├── .repo/ (Framework)                             │
│      ├── root-files/ (TODO templates)                   │
│      └── starter-kits/ (Pre-configured setups)          │
└─────────────────────────────────────────────────────────┘
            ↓ Copy/Update
┌─────────────────────────────────────────────────────────┐
│  Your Repository (Working Copy)                         │
│  ├── .repo/ (Layer 1 + 2 + 3)                          │
│  ├── P0TODO.md, P1TODO.md, P2TODO.md                   │
│  ├── src/ (your code)                                   │
│  └── package.json (your config)                         │
└─────────────────────────────────────────────────────────┘
            ↓ Enforce
┌─────────────────────────────────────────────────────────┐
│  Development Workflow                                    │
│  1. Plan (TODO files)                                   │
│  2. Code (following policies)                           │
│  3. Test (P8: Test Everything)                          │
│  4. Verify (governance-cli verify)                      │
│  5. Review (human or agent)                             │
│  6. Merge (if gates pass)                               │
└─────────────────────────────────────────────────────────┘
```

---

## Next Steps

- **Quick Start:** [QUICK_START.md](QUICK_START.md)
- **Your First PR:** [YOUR_FIRST_PR.md](YOUR_FIRST_PR.md)
- **Customization:** [HOW_TO_CUSTOMIZE_POLICIES.md](../guides/HOW_TO_CUSTOMIZE_POLICIES.md)
- **CLI Reference:** [CLI_REFERENCE.md](../reference/CLI_REFERENCE.md)

---

**Guide Version:** 1.0  
**Last Updated:** 2026-01-22  
**Status:** Complete
