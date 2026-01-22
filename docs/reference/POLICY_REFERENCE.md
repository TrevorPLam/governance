# Policy Reference

**Document Type:** Reference  
**Audience:** All Team Members  
**Last Updated:** 2026-01-22

---

## Overview

This reference document provides a comprehensive guide to all governance policies in the `.repo/policy/` directory. These policies form the authoritative rules that govern repository operations, development practices, and decision-making.

**Policy Location:** `/.repo/policy/`

**Policy Hierarchy:**
1. **CONSTITUTION** - Fundamental, immutable principles
2. **PRINCIPLES** - Operating guidelines derived from Constitution
3. **Specific Policies** - Domain-specific rules (Quality, Security, Boundaries)
4. **Process Documents** - HITL and Waivers implementation

---

## Table of Contents

1. [CONSTITUTION.md](#constitution) - Fundamental Articles
2. [PRINCIPLES.md](#principles) - Operating Principles (P3-P25)
3. [QUALITY_GATES.md](#quality-gates) - Merge and Quality Requirements
4. [SECURITY_BASELINE.md](#security-baseline) - Security Standards
5. [BOUNDARIES.md](#boundaries) - Architectural Constraints
6. [HITL.md](#hitl) - Human-In-The-Loop Process
7. [WAIVERS.md](#waivers) - Waiver System

---

## CONSTITUTION

**File:** `/.repo/policy/CONSTITUTION.md`  
**Status:** Immutable (requires founder approval to change)  
**Layer:** Layer 3 (Governance Core)

The Constitution defines the fundamental, non-negotiable principles of repository governance. All other policies and practices derive from these articles.

### Article 1: Final Authority

**Rule:** The solo founder is the final authority for any ambiguity, conflict, or decision.

**Implications:**
- Single decision-maker for disputes
- Founder can override any rule with explicit approval
- Clear escalation path: Agent → HITL → Founder

**Example:**
```
Conflict: Two team members disagree on architecture approach
Resolution: Escalate to founder for final decision
```

---

### Article 2: Verifiable over Persuasive

**Rule:** Work is not "done" without verification evidence. Proof beats persuasion.

**Requirements:**
- All PRs must include verification proof
- Test results must be documented
- Manual verification must be logged
- "Trust me" is not acceptable

**Example:**
```
❌ Bad: "I tested this locally and it works"
✅ Good: "Tests pass: `npm test` output attached. Manual verification: screenshot of working feature"
```

---

### Article 3: No Guessing

**Rule:** If something is not explicitly known from repo docs, manifest, or code: mark it as UNKNOWN, route to HITL, do not proceed on that uncertain portion.

**Process:**
1. Check repo documentation
2. Check manifest
3. Check code and comments
4. If still unclear → Mark `<UNKNOWN>`
5. Create HITL item
6. STOP on uncertain portion

**Example:**
```yaml
# In manifest
commands:
  check:security: "<UNKNOWN>"  # Not clear from repo

# With HITL item: HITL-0012 - Determine security scan command
```

---

### Article 4: Incremental Delivery

**Rule:** Ship small, reviewable, testable increments. Large tasks must be decomposed into smaller tasks. No mega-PRs without explicit approval.

**Guidelines:**
- PRs should be < 500 lines of code (guideline, not hard limit)
- Each PR should have one clear purpose
- Large features split into phases
- Each increment must be shippable

**Example:**
```
Large Feature: User Authentication
Split into:
1. PR #1: Basic login UI
2. PR #2: Backend authentication
3. PR #3: Session management
4. PR #4: Password reset
```

---

### Article 5: Strict Traceability

**Rule:** Every meaningful change must be traceable to an explicit task definition and include verification proof. Completed tasks must be archived to preserve a compact history.

**Requirements:**
- Every PR links to Task Packet
- Task Packet includes acceptance criteria
- Verification proof included
- Completed tasks archived to COMPLETEDTODO.md

**Example:**
```markdown
# PR Description
**Task:** P0TODO.md - Task 3: Add user authentication
**Verification:** Tests pass, manual login verified
**Related:** HITL-0005 (security review completed)
```

---

### Article 6: Safety Before Speed

**Rule:** If a change could break logins, money flows, user data, privacy, security, external services, or production behavior: SAFETY WINS. For risky/uncertain changes: STOP → ASK (HITL) → VERIFY → THEN PROCEED.

**Critical Systems:**
- Authentication/login
- Financial transactions
- User data handling
- Privacy controls
- Security mechanisms
- External integrations
- Production deployments

**Process for Risky Changes:**
1. **STOP** - Pause before implementation
2. **ASK** - Create HITL item for review
3. **VERIFY** - Test thoroughly with proof
4. **PROCEED** - Only after approval

**Example:**
```
Change: Modify payment processing logic
Required:
- HITL item for review
- Comprehensive test suite
- Rollback plan documented
- Human approval before merge
```

---

### Article 7: Per-Repo Variation Allowed

**Rule:** Governance structure is consistent, but per-repo workflow/execution may vary via manifest, packs, and repo checks.

**What's Consistent:**
- Policy structure (CONSTITUTION, PRINCIPLES, etc.)
- Required documents
- HITL and waiver processes

**What Varies:**
- Specific commands (via manifest)
- Quality thresholds
- Boundary definitions
- Test requirements

**Example:**
```yaml
# Repo A (Node.js)
commands:
  check:ci: "npm test"

# Repo B (Python)
commands:
  check:ci: "pytest"
```

---

### Article 8: HITL for External Systems

**Rule:** Anything involving credentials, vendor dashboards, production systems, billing, legal/compliance, or irreversible changes is HITL-gated.

**Always HITL:**
- Production deployments
- Credential changes
- Billing/payment changes
- External service integrations
- Legal/compliance matters
- Database migrations
- Irreversible operations

**Example:**
```
Change: Add new payment provider
Required:
- HITL-0023: Review payment provider integration
- Human approves credentials handling
- Human approves contract/billing changes
- Human approves production deployment
```

---

## PRINCIPLES

**File:** `/.repo/policy/PRINCIPLES.md`  
**Status:** Updateable with care (Layer 2)  
**Count:** 23 principles (P3-P25)

Operating principles that guide day-to-day development. All principles derive from the Constitution.

### Global Rule

**Filepaths Required Everywhere:** PRs, Task Packets, logs, ADRs, waivers, and inline commentary must include specific file paths.

**Example:**
```markdown
❌ Bad: "Updated the authentication logic"
✅ Good: "Updated authentication logic in `src/auth/login.ts` (lines 45-67)"
```

---

### P3: One Change Type Per PR

**Rule:** No mixing types; split work if needed.

**Change Types:**
- Feature addition
- Bug fix
- Refactoring
- Documentation
- Configuration

**Example:**
```
❌ Bad: PR includes new feature + unrelated bug fix + docs update
✅ Good: Separate PRs for feature, bug fix, and docs
```

---

### P4: Make It Shippable

**Rule:** PR must be safe to merge/ship or clearly blocked.

**States:**
- ✅ Ready to ship - All checks pass, no known issues
- ⚠️ Blocked - Clear reason (HITL pending, waiver needed)
- ❌ Not shippable - Don't create PR yet

---

### P5: Don't Break Surprises

**Rule:** Call out user/security/money/production impacts; add tests + rollback.

**Required for Breaking Changes:**
- Impact assessment
- Migration guide
- Rollback procedure
- Comprehensive tests
- HITL review (if critical)

**Example:**
```markdown
## Breaking Change
**Impact:** Login flow changes require users to re-authenticate
**Migration:** Handled automatically on first login
**Rollback:** Revert PR #456, run migration script
**Tests:** Added integration tests for new flow
```

---

### P6: Evidence Over Vibes

**Rule:** Show proof: commands, outputs, test results, artifact links.

**Required Evidence:**
- Test output
- Build logs
- Manual testing screenshots
- Performance metrics
- Coverage reports

**Example:**
```markdown
## Verification
```bash
$ npm test
All tests passed (47/47)
Coverage: 94.2%
```

Manual testing: [screenshot.png]
```

---

### P7: UNKNOWN Is First-Class

**Rule:** Mark explicitly and route to HITL.

**Usage:**
```yaml
commands:
  check:boundaries: "<UNKNOWN>"  # See HITL-0015
```

**Not an Error:** UNKNOWN is a valid, explicit state indicating need for clarification.

---

### P8: Read Repo First

**Rule:** Use `/.repo` docs + `repo.manifest.yaml` before deciding.

**Research Order:**
1. Check `/.repo/policy/*`
2. Check `repo.manifest.yaml`
3. Check `/.repo/docs/standards/*`
4. Check repo-specific docs
5. If still unclear → UNKNOWN + HITL

---

### P9: Declare Assumptions

**Rule:** Write assumptions down and label them clearly.

**Example:**
```markdown
## Assumptions
- Assumption #1: Database connection pool size remains at 20
- Assumption #2: API rate limit is 1000 req/min
- Assumption #3: User sessions timeout after 30 minutes
```

---

### P10: Risk Triggers a Stop

**Rule:** STOP → HITL → VERIFY for non-trivial risk.

**Risk Indicators:**
- Could affect production
- Could break user experience
- Involves money/security/data
- Irreversible operation
- External system integration

---

### P11: Prefer Guardrails Over Heroics

**Rule:** Tooling/automation > "trust me".

**Examples:**
- Automated tests > manual testing promises
- Linters > code review for style
- Static analysis > manual review for security
- CI/CD > manual deployment

---

### P12: Rollback Thinking

**Rule:** Risky changes need undo strategy.

**Required for Risky Changes:**
- Documented rollback procedure
- Tested rollback (if possible)
- Data migration reversibility
- Feature flag consideration

---

### P13: Respect Boundaries by Default

**Rule:** Don't cross module boundaries unless rules allow.

**See:** [BOUNDARIES.md](#boundaries) for details

**Example:**
```javascript
// ❌ Bad: UI imports Data directly
import { getUser } from '../data/users';

// ✅ Good: UI imports through Domain
import { getUser } from '../domain/user-service';
```

---

### P14: Localize Complexity

**Rule:** Put complexity where it belongs; keep contained.

**Guidelines:**
- Complex logic in domain layer
- Simple, clear interfaces
- Hide implementation details
- Don't spread complexity

---

### P15: Consistency Beats Novelty

**Rule:** Prefer existing patterns; justify novelty.

**Process:**
1. Check for existing patterns
2. Reuse if appropriate
3. If new pattern needed → document why
4. Create ADR if significant

---

### P16: Decisions Written Down

**Rule:** Record in smallest durable place (ADR only when triggered).

**Decision Recording:**
- Small decisions: PR description or code comments
- Medium decisions: Task Packet or HITL item
- Large decisions: ADR (when triggered)

**ADR Triggers:** See PRINCIPLES.md for specific triggers

---

### P17: PR Narration

**Rule:** Explain: what, why, filepaths, how verified, risks, rollback.

**Required Sections:**
- What changed (with filepaths)
- Why the change is needed
- How it was verified
- Known risks
- Rollback procedure (if applicable)

**Template:**
```markdown
## What
Modified user authentication in `src/auth/login.ts` (lines 34-89)

## Why
Fix security vulnerability (CVE-2024-1234)

## Verification
- Unit tests pass
- Manual security audit completed
- Penetration test passed

## Risks
Low - change is isolated to auth module

## Rollback
Revert this PR, no data migration needed
```

---

### P18: No Silent Scope Creep

**Rule:** Update Task Packet and call out scope expansion.

**Process:**
1. Notice scope expanding
2. Update Task Packet
3. Call out in PR
4. Get approval if significant

---

### P19: Docs Age With Code

**Rule:** Update docs when code behavior changes.

**Requirements:**
- API changes → update API docs
- Behavior changes → update user docs
- New features → add documentation
- Deprecated features → mark in docs

---

### P20: Examples Are Contracts

**Rule:** Examples define behavior; keep aligned.

**Requirements:**
- Examples must work (tested)
- Examples must be current
- Examples must match actual behavior
- Update examples with code changes

---

### P21: Naming Matters

**Rule:** Be clear; avoid confusing abbreviations.

**Guidelines:**
- Use descriptive names
- Avoid ambiguous abbreviations
- Prefer clarity over brevity
- Use domain terminology

**Examples:**
```javascript
// ❌ Bad
function proc(u) { }

// ✅ Good
function processUser(user) { }
```

---

### P22: Waivers Rare + Temporary

**Rule:** Waivers expire and need remediation plan.

**See:** [WAIVERS.md](#waivers) for details

**Guidelines:**
- Use waivers sparingly
- Always include expiration
- Always include remediation plan
- Maximum 90 days

---

### P23: ADR Required When Triggered

**Rule:** If trigger met, create ADR (no exceptions).

**ADR Triggers:**
- New architectural pattern
- Technology choice
- Significant refactoring
- Cross-feature boundary exception
- Performance trade-off
- Security model change

---

### P24: Logs Required for Non-Docs

**Rule:** Non-doc changes need agent logs + trace logs + reasoning.

**Required Logs:**
- Agent execution logs
- Trace logs (per schema)
- Reasoning/decision logs
- Verification logs

---

### P25: Token-Optimized TODO Discipline

**Rule:** Use P0/P1/P2 files + archive to keep context compact.

**TODO System:**
- `P0TODO.md` - Urgent/blocking tasks
- `P1TODO.md` - High priority tasks
- `P2TODO.md` - Normal priority tasks
- `COMPLETEDTODO.md` - Archive of completed tasks

**Benefits:**
- Compact context
- Clear priorities
- Historical record
- Token-efficient

---

## QUALITY_GATES

**File:** `/.repo/policy/QUALITY_GATES.md`  
**Status:** Updateable (Layer 2)  
**Purpose:** Define merge requirements and quality standards

### Merge Policy

**Default:** Soft block with auto-generated waivers for waiverable gate failures

**Process:**
1. Gate fails
2. If waiverable → auto-generate waiver
3. If not waiverable → hard block

---

### Hard Gates (Not Waiverable)

These gates **must pass** - no waivers allowed:

1. **Required Artifacts Missing**
   - Task Packet missing for declared change type
   - Agent logs missing
   - Trace log missing
   - ADR missing when triggered
   - HITL missing when required

2. **Trace Log Invalid**
   - Doesn't match AGENT_TRACE_SCHEMA.json
   - Missing required fields
   - Invalid structure

3. **Required HITL Not Completed**
   - HITL item status is not "Completed"
   - No valid waiver exists

4. **Referenced Waiver Issues**
   - Waiver missing
   - Waiver expired
   - Waiver revoked

5. **Governance Verification Fails**
   - `governance-verify` command fails
   - Structure violations
   - Policy violations

---

### Waiverable Gates

These gates can be waived with justification:

#### Coverage Targets

**Strategy:** Gradual ratchet (never decrease)

**Enforcement:**
- New code must meet coverage target
- Overall coverage cannot decrease
- Waiver allowed for exceptional cases

**Example:**
```
Current coverage: 87%
Target: 90%
PR decreases to 86% → Waiverable with justification
```

#### Performance Budgets

**Enforcement:** Strict with fallback defaults

**Budget Types:**
- Bundle size budgets
- Runtime performance budgets
- Memory budgets

**Defaults:** Defined in QUALITY_GATES.md

**Example:**
```yaml
budgets:
  bundle_limits:
    main: 250kb  # Current: 248kb ✅
    vendor: 500kb  # Current: 520kb ⚠️ (waiver needed)
```

#### Warning Budgets

**Policy:** Zero warnings

**Enforcement:**
- All warnings must be fixed
- Waiver required if warnings remain
- Waiver must include remediation plan

---

### PR Size Policy

**Rule:** No hard limits

**Guidance:**
- Constitution Article 4 still applies (incremental delivery)
- Large PRs require decomposition justification
- Founder can reject mega-PRs

---

### Required Checks

**Setting:** `governance_verify_checks: all`

**Checks:**
- All quality gates
- All security checks
- All boundary checks
- Governance verification

---

## SECURITY_BASELINE

**File:** `/.repo/policy/SECURITY_BASELINE.md`  
**Status:** Updateable (Layer 2)  
**Purpose:** Define security standards and requirements

### Absolute Prohibitions

#### No Secrets in Code or Logs

**Rule:** Secrets/tokens/keys must never be committed or logged

**Enforcement:** Hard fail, no waivers

**Examples of Secrets:**
- API keys
- Access tokens
- Private keys
- Passwords
- Connection strings with credentials
- OAuth secrets

**Detection:**
- Pre-commit hooks
- CI secret scanning
- Code review
- Automated tools

---

### Dependency Vulnerabilities

**Policy:** Always create HITL items

**Process:**
1. Vulnerability detected
2. Auto-create HITL item
3. Human reviews vulnerability
4. Options:
   - Fix immediately
   - Waive with expiration
   - Accept risk (rare)
5. Cannot merge until HITL Completed or waived

**Severity Levels:**
- **Critical:** Immediate action required
- **High:** Fix within 7 days
- **Medium:** Fix within 30 days
- **Low:** Fix when convenient

---

### Security Check Frequency

**Rule:** Every PR

**Checks:**
- Dependency scanning
- Secret scanning
- Forbidden pattern scanning
- Static analysis

---

### Security Review Triggers

These changes **require security review** (HITL):

1. **Auth/Login Behavior Change**
   - Authentication flow modifications
   - Authorization changes
   - Session management changes

2. **Money/Payment Flow Change**
   - Payment processing
   - Billing logic
   - Financial calculations

3. **External Service Integration Change**
   - New third-party integrations
   - API endpoint changes
   - Webhook modifications

4. **Sensitive Data Handling Change**
   - PII processing
   - Data encryption
   - Data storage changes

5. **Permission/Privacy Change**
   - Access control modifications
   - Privacy settings changes
   - Data sharing changes

6. **Production Config/Keys Change**
   - Environment variables
   - Configuration files
   - Credential management

7. **Cryptography/Security Control Change**
   - Encryption algorithms
   - Hashing functions
   - Security libraries

8. **Dependency/Supply-Chain Risk Change**
   - New dependencies
   - Dependency updates (major versions)
   - Vendor changes

---

### Mandatory HITL Actions

For security-triggered HITL items, humans must:

1. **Approve Security Risk Assessment**
   - Review risk analysis
   - Approve or reject change

2. **Confirm No Secrets Exposed**
   - Verify no secrets in code
   - Verify no secrets in logs
   - Verify no secrets in configuration

3. **Review Dependency Vulnerability Report**
   - Assess vulnerability impact
   - Approve remediation plan

4. **Confirm Login/Security Test Evidence**
   - Verify security tests exist
   - Review test coverage
   - Verify tests pass

5. **Confirm Money-Flow Test Evidence**
   - Verify financial tests exist
   - Review test coverage
   - Verify correctness

6. **Approve Waiver (if needed) with Expiration**
   - Review waiver justification
   - Set expiration date
   - Approve remediation plan

7. **Confirm Rollback Plan**
   - Verify rollback documented
   - Verify rollback tested (if possible)
   - Approve rollback procedure

8. **Confirm External System Steps Completed**
   - Verify external changes documented
   - Verify credentials secured
   - Verify integration tested

---

### Forbidden Patterns

**Source:** Defined in SECURITY_BASELINE.md

**Examples:**
- `eval()` without justification
- SQL string concatenation
- Insecure random number generation
- Weak cryptographic algorithms
- Hardcoded credentials
- Debug code in production

---

## BOUNDARIES

**File:** `/.repo/policy/BOUNDARIES.md`  
**Status:** Updateable (Layer 2)  
**Purpose:** Define architectural constraints

### Boundary Model

**Type:** `hybrid_domain_feature_layer`

**Structure:**
```
src/
├── <domain>/
│   ├── <feature>/
│   │   ├── ui/
│   │   ├── domain/
│   │   └── data/
│   └── ...
└── platform/  (shared utilities)
```

---

### Default Import Direction

**Rule:** Import flows downward through layers

```
UI → Domain → Data → Platform
```

**Allowed:**
- UI imports Domain
- Domain imports Data
- Data imports Platform
- Any layer imports Platform

**Forbidden:**
- Data imports UI
- Domain imports UI
- Layer skipping (UI → Data directly)

---

### Cross-Feature Rule

**Rule:** Requires ADR

**Process:**
1. Identify cross-feature dependency
2. Create ADR documenting:
   - Reason for dependency
   - Alternatives considered
   - Impact assessment
   - Future implications
3. Add explicit edge to manifest

**Example:**
```yaml
boundaries:
  edges:
    - from: "features/checkout/ui"
      to: "features/cart/domain"
      reason: "Checkout needs cart total for display"
      adr: "docs/adr/0008-checkout-cart-dependency.md"
```

---

### Exception Rules

#### Small Exceptions

**Criteria:** Minor, localized violations

**Process:**
- Justify in Task Packet
- Include filepaths
- Explain why needed
- No ADR required

#### Large Exceptions

**Criteria:** Significant, widespread violations

**Process:**
- Create ADR
- Document thoroughly
- Add to manifest edges
- Review and approve

---

### Enforcement Method

**Type:** Hybrid (static checker + manifest)

**Tools:**
- Static analysis tool (boundary-check)
- Manifest explicit edges
- CI/CD integration

**Process:**
1. Run boundary checker
2. Check against manifest edges
3. Fail if violation found
4. Require ADR or waiver

---

### Violation Severity

**Treatment:** Waiverable with auto-task for remediation

**Process:**
1. Boundary violation detected
2. Waiver can be requested
3. If approved:
   - Waiver granted with expiration
   - Auto-create remediation task
   - Add to P1TODO.md
4. Remediation must complete before expiration

---

## HITL

**File:** `/.repo/policy/HITL.md`  
**Status:** Custom per repo (Layer 1)  
**Purpose:** Human-In-The-Loop escalation process

### Storage

**Index:** `/.repo/policy/HITL.md`  
**Items:** `/.repo/hitl/HITL-XXXX.md`

**Structure:**
- Active items tracked in HITL.md
- Archived items moved to Archived table
- Individual items in hitl/ directory

---

### Minimal Effort Rule

**Principle:** Human sets Status + adds Evidence; agents do mechanical work

**Human Responsibilities:**
- Review escalation
- Make decision
- Provide evidence/justification
- Update status

**Agent Responsibilities:**
- Create HITL items
- Gather context
- Implement decision
- Update tracking

---

### Categories

1. **External Integration**
   - Third-party services
   - External APIs
   - Vendor systems

2. **Clarification**
   - Ambiguous requirements
   - Unknown commands
   - Unclear specifications

3. **Risk**
   - Security concerns
   - Financial risks
   - Production impacts

4. **Feedback**
   - Review requested
   - Approval needed
   - Input required

5. **Vendor**
   - Vendor decisions
   - Contract matters
   - Billing issues

---

### Statuses

- **Pending** - Awaiting human review
- **In Progress** - Human is working on it
- **Blocked** - Waiting on external dependency
- **Completed** - Resolved
- **Superseded** - No longer relevant

---

### Merge Blocking

**Rule:** Required HITL items not Completed (or waived) = blocked

**Process:**
1. PR requires HITL item
2. HITL item created
3. PR cannot merge until:
   - HITL status is "Completed" OR
   - Valid waiver exists

---

### HITL Item Fields

**Required Fields:**
- **ID:** HITL-XXXX
- **Category:** External Integration, Clarification, Risk, etc.
- **Required For:** PR or task requiring resolution
- **Owner:** Person responsible
- **Status:** Current status
- **Summary:** Brief description
- **Required Actions:** What needs to be done

**Optional Fields:**
- **Reviewer:** Additional reviewer
- **Blocked By:** External dependency
- **Evidence:** Proof of completion
- **Related Artifacts:** Links to PRs, docs, etc.

---

### External System Detection Triggers

HITL automatically created when:

**Change Type Implies Externals:**
- Security review trigger
- Release involving external systems
- Schema changes affecting external systems

**Manifest Involves External Credentials:**
- Credentials mentioned
- Dashboards referenced
- External services configured

**Keywords Detected:**
- credentials, token, billing
- app store, vendor dashboard
- prod deploy, payment
- oauth, external API

---

### Archiving

**Process:**
1. HITL item reaches Completed or Superseded
2. Move to Archived table in HITL.md
3. Add "Archived On" date
4. Keep individual file for historical record

**Archived Table Columns:**
- ID
- Summary
- Status
- Completed/Superseded Date
- Archived On

---

## WAIVERS

**File:** `/.repo/policy/WAIVERS.md`  
**Status:** Custom per repo (Layer 1)  
**Purpose:** Temporary policy exceptions

### Core Principles

From Principle P22:
- **Rare** - Use sparingly
- **Temporary** - Always have expiration
- **Remediation** - Always have plan to fix
- **Blocking** - Expired waivers block merges

---

### Waiver Structure

**Required Fields:**
- **ID:** WAIVER-XXXX
- **Rule:** Policy being waived
- **Justification:** Why waiver is needed
- **Risk Assessment:** Risks of granting waiver
- **Remediation Plan:** How to fix properly
- **Expiration Date:** When waiver expires
- **Approved By:** Who approved
- **Approved On:** When approved
- **Status:** Active/Expired/Remediated
- **Related:** PRs, tasks, HITL items

---

### Storage

**Index:** `/.repo/policy/WAIVERS.md`  
**Items:** `/.repo/waivers/WAIVER-XXXX.md`

**Tracking Tables:**
- Active Waivers
- Historical Waivers (archived)

---

### Expiration Rules

**Default:** 30 days from approval  
**Maximum:** 90 days  
**Extensions:** Require new approval

**Monitoring:**
- Agents check expiration daily
- Warnings at 7 days before expiration
- Auto-create remediation task when expired

---

### Waiverable Gates

From QUALITY_GATES.md:

1. **Coverage Targets**
   - Can waive if exceptional circumstance
   - Must include plan to reach target

2. **Performance/Bundle Budgets**
   - Can waive if temporary issue
   - Must include optimization plan

3. **Warning Budgets**
   - Can waive warnings
   - Must include fix plan

**Not Waiverable:**
- Hard gates (required artifacts, valid trace, HITL completion)
- Secrets in code
- Critical security vulnerabilities
- Governance structure violations

---

### Approval Process

1. **Detection**
   - Agent detects gate failure
   - Agent proposes waiver

2. **Review**
   - Human reviews waiver request
   - Assesses risk
   - Reviews remediation plan

3. **Decision**
   - Approve: Grant waiver with expiration
   - Reject: Block until fixed
   - Defer: Request more information

4. **Tracking**
   - Add to Active Waivers table
   - Create remediation task
   - Add to P1TODO.md

5. **Remediation**
   - Work on fix
   - Complete before expiration
   - Move to Historical table

---

### Approvers

**Primary:** Solo founder (per Constitution Article 1)

**Delegated:** Can designate approvers in manifest

```yaml
waivers:
  approvers:
    - role: "tech_lead"
      scope: ["coverage", "performance"]
    - role: "security_lead"
      scope: ["security"]
```

---

### Monitoring

**Agent Responsibilities:**
- Check expiration daily
- Warn at 7 days before expiration
- Auto-create remediation task at expiration
- Block merges with expired waivers

**Human Responsibilities:**
- Review waiver requests promptly
- Monitor active waivers
- Ensure remediation work progresses
- Approve extensions if justified

---

### Waiver Abuse Prevention

**Red Flags:**
- Too many active waivers
- Repeated waivers for same issue
- Waivers regularly expiring without remediation
- Waivers used to bypass important checks

**Response:**
- Review waiver process
- Tighten approval criteria
- Reduce expiration times
- Escalate to founder

---

## Policy Updates

### Update Process

1. **Propose Change**
   - Document reason for change
   - Assess impact
   - Create ADR if significant

2. **Review**
   - Founder reviews proposal
   - Team provides feedback
   - Risk assessment performed

3. **Approve**
   - Founder approves change
   - Update policy file
   - Increment version

4. **Communicate**
   - Announce changes to team
   - Update related documentation
   - Train team if needed

---

### Version Control

**Policy Files Include Version Markers:**
```markdown
<!-- GOVERNANCE_VERSION: 1.0.0 -->
<!-- GOVERNANCE: UPDATEABLE - Layer 2 -->
```

**Version Format:** Semantic versioning (MAJOR.MINOR.PATCH)
- MAJOR: Breaking changes
- MINOR: New rules added
- PATCH: Clarifications, fixes

---

## Related Documents

- [Getting Started - Concepts Overview](../getting-started/CONCEPTS_OVERVIEW.md) - Introduction to policies
- [How-To: Customize Policies](../guides/HOW_TO_CUSTOMIZE_POLICIES.md) - Customization guide
- [How-To: Manage Waivers](../guides/HOW_TO_MANAGE_WAIVERS.md) - Waiver management
- [Manifest Reference](MANIFEST_REFERENCE.md) - Manifest configuration
- [CLI Reference](CLI_REFERENCE.md) - CLI commands for policy checks

---

**Document Status:** Complete  
**Last Reviewed:** 2026-01-22  
**Next Review:** Phase 6 (Polish & Scale)
