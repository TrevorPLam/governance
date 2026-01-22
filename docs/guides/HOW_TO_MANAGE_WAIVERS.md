# How To: Manage Waivers
## Step-by-Step Guide to Handling Governance Exceptions

**Purpose:** Learn how to create, approve, track, and expire governance waivers safely and effectively.

**Time Required:** 20-40 minutes  
**Skill Level:** Beginner to Intermediate

---

## Table of Contents

1. [Understanding Waivers](#understanding-waivers)
2. [Creating Waiver Requests](#creating-waiver-requests)
3. [Approval Process](#approval-process)
4. [Tracking Waivers](#tracking-waivers)
5. [Expiring Waivers](#expiring-waivers)
6. [Best Practices](#best-practices)
7. [Waiver Abuse Prevention](#waiver-abuse-prevention)

---

## Understanding Waivers

### What Are Waivers?

Waivers are **temporary, documented exceptions** to governance rules. They allow you to:

- **Merge urgent fixes** that don't meet all quality gates
- **Ship features** with known technical debt
- **Handle legacy code** that needs gradual improvement
- **Work around blockers** while planning proper fixes

### Why Waivers Matter

```
WITHOUT WAIVERS              WITH WAIVERS
┌──────────────────┐        ┌──────────────────┐
│ Blocked PRs      │        │ Unblock + Track  │
│ Can't ship       │        │ Ship safely      │
│ Emergency hacks  │        │ Plan remediation │
│ No tracking      │        │ Full visibility  │
└──────────────────┘        └──────────────────┘
```

**Key Principles:**
- ✅ Waivers are **rare and temporary**
- ✅ Every waiver **must expire**
- ✅ Every waiver **needs remediation plan**
- ✅ Expired waivers **block merges**
- ✅ Waivers are **tracked and reviewed**

---

## Creating Waiver Requests

### Step 1: Identify the Need

Waivers are needed when:

- ✅ **Emergency production fix** needs immediate deployment
- ✅ **Technical debt** from legacy code
- ✅ **External dependency** causing test failures
- ✅ **Gradual migration** in progress
- ✅ **Performance optimization** temporarily reduces coverage

Waivers are **NOT** for:

- ❌ Avoiding writing tests
- ❌ Skipping code review
- ❌ Hiding poor code quality
- ❌ Regular workflow shortcuts
- ❌ Permanent exceptions

### Step 2: Understand Waiverable Gates

Not all rules can be waived. Check what's waiverable:

**Waiverable (with justification):**
- Coverage targets (temporary)
- Performance budgets (with plan)
- Warning budgets (with remediation)
- Non-critical quality gates

**NOT Waiverable (ever):**
- Security vulnerabilities
- Secrets in code
- Critical security policies
- Constitutional principles
- Data loss risks

### Step 3: Create Waiver File

Create a new waiver file:

```bash
# Create waiver directory if it doesn't exist
mkdir -p .repo/waivers

# Create waiver file (use next available number)
touch .repo/waivers/WAIVER-0001.md
```

### Step 4: Fill Waiver Template

Use the standard waiver template:

```markdown
<!-- /.repo/waivers/WAIVER-0001.md -->

# Waiver Request: WAIVER-0001

## Summary
**Rule Waived:** Coverage minimum (80% → 75%)  
**Requestor:** @developer-name  
**Date Requested:** 2026-01-22  
**Status:** PENDING

---

## Details

### Rule Being Waived
**Policy:** QUALITY_GATES.md - Test Coverage  
**Current Requirement:** 80% minimum coverage  
**Requested Exception:** Allow 75% coverage for this PR

### Justification
**Why is this waiver necessary?**

We are refactoring the authentication module from legacy passport.js 
to our new auth system. The old auth code has 0% coverage (legacy), 
and we're adding tests as we migrate.

This PR migrates 40% of auth flows with 75% coverage on new code. 
Blocking on 80% would delay critical security updates by 2 weeks.

**What is the impact of NOT waiving?**
- Delays security patch deployment
- Blocks 3 dependent feature teams
- Forces us to write tests for code we're deleting next sprint

### Risk Assessment
**What could go wrong?**

Potential risks:
1. **Untested edge cases** in migrated auth flows
2. **Regression bugs** in authentication
3. **Security vulnerabilities** not caught by tests

**Mitigation:**
1. Manual testing of all auth flows (QA team assigned)
2. Staged rollout with monitoring
3. Security review by @security-team
4. Canary deployment to 5% of users first

**Risk Level:** MEDIUM (security-adjacent but mitigated)

### Remediation Plan
**How will this be fixed?**

**Short-term (this PR):**
- ✅ 75% coverage on new code
- ✅ Manual testing checklist completed
- ✅ Security review completed

**Long-term (next 2 sprints):**
- Sprint 1: Migrate remaining 60% of auth code + tests → 80% coverage
- Sprint 2: Add integration tests → 85% coverage
- Sprint 3: Complete migration, remove legacy code

**Tracking:**
- Created P1TODO task: "Complete auth migration tests"
- Sprint 1 scheduled: 2026-02-01
- Target completion: 2026-02-28

### Expiration
**Expiration Date:** 2026-03-01 (37 days)  
**Maximum Extension:** 2026-03-15 (23 additional days)

After expiration, PRs will be blocked until:
- Coverage reaches 80%, OR
- Waiver is renewed with updated justification

### Related Items
- **PR:** #234 (Auth Migration Phase 1)
- **Issue:** #189 (Modernize Authentication)
- **Task Packet:** TP-045 (Auth System Overhaul)
- **ADR:** ADR-012 (Auth Migration Strategy)

---

## Approval

**Approved By:** [PENDING]  
**Approved On:** [PENDING]  
**Approval Comments:**

[Space for approver comments]

---

## Tracking

**Status:** PENDING  
**Created:** 2026-01-22  
**Last Updated:** 2026-01-22  
**Completion:** 0% (Sprint 0 of 3)

**Checklist:**
- [ ] Sprint 1: Migrate remaining auth code
- [ ] Sprint 2: Add integration tests
- [ ] Sprint 3: Remove legacy code
- [ ] Final coverage: 85%+
```

---

## Approval Process

### Step 5: Submit for Approval

Add waiver to tracking table in `.repo/policy/WAIVERS.md`:

```markdown
### Active Waivers
|ID|Rule|Expiration|Status|Filepath|
|---|---|---|---|---|
|WAIVER-0001|Coverage 80%→75%|2026-03-01|PENDING|.repo/waivers/WAIVER-0001.md|
```

### Step 6: Agent Detection (Automated)

When a governance check fails, the agent will:

1. **Detect the failure** (e.g., coverage below 80%)
2. **Check for existing waiver** in WAIVERS.md
3. **Prompt for waiver creation** if none exists
4. **Generate waiver template** with pre-filled details

**Example agent flow:**
```
🤖 Agent: Coverage check failed (75% < 80%)
🤖 Would you like to create a waiver? [Y/n]: Y

🤖 Generating waiver template...
✅ Created: .repo/waivers/WAIVER-0001.md

📝 Please fill in:
   - Justification
   - Risk Assessment
   - Remediation Plan

🔍 Then request approval from: @tech-lead
```

### Step 7: Human Review

The approver reviews:

**Checklist for Approvers:**
- [ ] **Is justification valid?** (not just convenience)
- [ ] **Are risks identified?** (complete risk assessment)
- [ ] **Is mitigation plan sound?** (reduces risks adequately)
- [ ] **Is remediation plan concrete?** (specific tasks, dates)
- [ ] **Is expiration reasonable?** (not too long)
- [ ] **Are tracking items created?** (TODOs, tasks)

**Approval Options:**

**Option A: Approve**
```markdown
**Approved By:** @tech-lead  
**Approved On:** 2026-01-22  
**Approval Comments:**

Approved. Auth migration is critical for Q1 security goals.
75% coverage is acceptable given:
- Manual testing by QA team
- Security review completed
- Clear remediation plan

Monitor canary deployment closely.
```

**Option B: Conditional Approval**
```markdown
**Approved By:** @tech-lead  
**Approved On:** 2026-01-22  
**Approval Comments:**

Approved with conditions:
1. Increase manual testing coverage
2. Add security team to PR review
3. Shorten expiration to 2026-02-15

Waiver expires in 3 weeks, not 5.
```

**Option C: Reject**
```markdown
**Status:** REJECTED  
**Rejected By:** @tech-lead  
**Rejected On:** 2026-01-22  
**Rejection Reason:**

Cannot approve. Risks are too high for authentication.

Instead:
1. Write minimal tests for migrated code (target 80%)
2. Deploy behind feature flag
3. Complete migration before enabling

This approach is safer and only adds 2 days.
```

### Step 8: Update Tracking

After approval, update status:

```markdown
### Active Waivers
|ID|Rule|Expiration|Status|Filepath|
|---|---|---|---|---|
|WAIVER-0001|Coverage 80%→75%|2026-03-01|**ACTIVE**|.repo/waivers/WAIVER-0001.md|
```

And create remediation task:

```markdown
<!-- P1TODO.md -->
## Auth Migration Test Coverage [WAIVER-0001]

**Priority:** P1 (waiver remediation)  
**Due:** 2026-03-01  
**Owner:** @auth-team

**Task:**
Increase auth module test coverage from 75% to 80%+

**Subtasks:**
- [ ] Sprint 1: Complete migration (60% remaining) - Due: 2026-02-07
- [ ] Sprint 2: Add integration tests - Due: 2026-02-21
- [ ] Sprint 3: Remove legacy code - Due: 2026-02-28

**Related:**
- Waiver: .repo/waivers/WAIVER-0001.md
- PR: #234
```

---

## Tracking Waivers

### Step 9: Monitor Active Waivers

Use the waiver tracking dashboard:

```bash
# Check active waivers
governance-cli waiver list

# Output:
╔════════════╤══════════════════╤═════════════╤══════════╗
║ ID         │ Rule             │ Expiration  │ Status   ║
╟────────────┼──────────────────┼─────────────┼──────────╢
║ WAIVER-001 │ Coverage 75%     │ 2026-03-01  │ ACTIVE   ║
║ WAIVER-002 │ Bundle size +10% │ 2026-02-15  │ ACTIVE   ║
║ WAIVER-003 │ Warnings x5      │ 2026-01-30  │ EXPIRING ║
╚════════════╧══════════════════╧═════════════╧══════════╝

⚠️  WAIVER-003 expires in 8 days!
```

### Step 10: Update Waiver Progress

As remediation work progresses, update the waiver:

```markdown
<!-- /.repo/waivers/WAIVER-0001.md -->

**Status:** ACTIVE  
**Completion:** 33% (Sprint 1 of 3) ← Update this
**Last Updated:** 2026-01-29 ← Update this

**Checklist:**
- [x] Sprint 1: Migrate remaining auth code ← Check completed items
- [ ] Sprint 2: Add integration tests
- [ ] Sprint 3: Remove legacy code
```

### Step 11: Waiver Reviews

Conduct regular waiver reviews (weekly or bi-weekly):

**Review Meeting Agenda:**
1. **Active Waivers** - Progress check
2. **Expiring Soon** - Can we complete in time?
3. **Extension Requests** - Any blockers?
4. **Historical Analysis** - Trends and patterns

**Example Review:**
```
Weekly Waiver Review - 2026-01-22

Active: 3 waivers
Expiring (7 days): 1 waiver (WAIVER-003)
Completed this week: 2 waivers

Actions:
- WAIVER-001: On track, 33% complete
- WAIVER-002: Blocked by vendor, request extension
- WAIVER-003: Rush completion, assign 2nd developer

Trends:
- Coverage waivers down 40% (good!)
- Performance waivers up 20% (investigate)
```

---

## Expiring Waivers

### Step 12: Expiration Warnings

Agents automatically warn about expiring waivers:

**7 Days Before:**
```
⚠️  WAIVER-001 expires in 7 days (2026-03-01)
📋 Remediation: 67% complete
❗ Action: Sprint 2 in progress, on track
```

**3 Days Before:**
```
🚨 WAIVER-001 expires in 3 days (2026-03-01)
📋 Remediation: 85% complete
✅ Likely to complete on time
```

**Expiration Day:**
```
🛑 WAIVER-001 expired today!
📋 Remediation: 95% complete
⚠️  New PRs blocked until completed or renewed
```

### Step 13: Handling Expired Waivers

When a waiver expires, you have 3 options:

**Option A: Complete Remediation**
```markdown
**Status:** COMPLETED  
**Completed On:** 2026-02-28  
**Final Coverage:** 85% (exceeded target!)

Move to historical tracking:

### Historical Waivers
|ID|Rule|Granted|Completed|Outcome|Filepath|
|---|---|---|---|---|---|
|WAIVER-001|Coverage 75%|2026-01-22|2026-02-28|✅ Completed ahead of schedule|.repo/waivers/WAIVER-0001.md|
```

**Option B: Request Extension**
```markdown
# Extension Request for WAIVER-0001

**Original Expiration:** 2026-03-01  
**Requested Extension:** 2026-03-15 (+14 days)

**Reason for Extension:**
External auth library delayed security patch release.
Our migration depends on this patch.

**Updated Remediation Plan:**
- Week 1: Wait for patch release (expected 2026-03-05)
- Week 2: Complete migration with patch
- Week 3: Final testing and deployment

**Updated Risk Assessment:**
Risk remains MEDIUM. No new risks introduced.

**Approval Required:** @tech-lead
```

**Option C: Let It Expire**
```markdown
**Status:** EXPIRED  
**Expired On:** 2026-03-01  
**Remediation:** Incomplete (85% done)

**Impact:**
- PRs in this module are blocked
- Must complete remediation OR request new waiver
- Blocks: PRs #245, #246, #247

**Next Steps:**
- Complete remaining 15% of work (2 days)
- Do NOT request extension without completing
```

### Step 14: Post-Expiration Actions

After waiver expires:

1. **If Completed:**
   - Mark waiver as COMPLETED
   - Move to historical tracking
   - Close related TODO items
   - Celebrate success! 🎉

2. **If Extended:**
   - Update expiration date
   - Update remediation plan
   - Re-approve with new date
   - Continue tracking

3. **If Expired:**
   - Mark waiver as EXPIRED
   - Block related PRs
   - Escalate to team lead
   - Create incident if critical

---

## Best Practices

### Do's ✅

1. **Create waivers early** - Don't wait until PR is blocked
2. **Be specific** - Clear justification, concrete plans
3. **Set realistic expirations** - Not too short, not too long
4. **Track remediation** - Update progress regularly
5. **Learn from waivers** - Analyze patterns, adjust policies
6. **Communicate** - Share waiver status with team
7. **Close completed waivers** - Keep tracking table clean

### Don'ts ❌

1. **Don't waive security issues** - Fix them properly
2. **Don't create permanent waivers** - Always temporary
3. **Don't skip risk assessment** - Think through consequences
4. **Don't ignore expiration** - Plan completion timeline
5. **Don't abuse waivers** - They're exceptions, not process
6. **Don't hide waivers** - Full transparency required
7. **Don't extend repeatedly** - Fix the underlying issue

### Waiver Anti-Patterns

**❌ Anti-Pattern 1: Serial Waiver Extensions**
```
WAIVER-001: Expires 2026-02-01 → Extended to 2026-03-01
WAIVER-001: Expires 2026-03-01 → Extended to 2026-04-01
WAIVER-001: Expires 2026-04-01 → Extended to 2026-05-01
```
**Problem:** This is a permanent exception disguised as temporary  
**Solution:** Either fix properly or change the policy

**❌ Anti-Pattern 2: Waiver-Driven Development**
```
Every PR has a waiver
Waivers become normal workflow
Team expects waivers
```
**Problem:** Governance rules are wrong, not code  
**Solution:** Adjust policies to match team reality

**❌ Anti-Pattern 3: Vague Remediation**
```
Remediation Plan: "Fix this later"
Expiration: "Sometime next quarter"
Tracking: "We'll get to it"
```
**Problem:** No accountability, won't get fixed  
**Solution:** Concrete tasks, dates, and owners

---

## Waiver Abuse Prevention

### Warning Signs of Waiver Abuse

**High Waiver Rate:**
```
Waiver Rate: 40% of PRs (too high!)
Target: <5% of PRs
```

**Action:** Review and adjust policies

**Repeated Waivers for Same Issue:**
```
Coverage waivers: 12 this month
All for same module
```

**Action:** Fix the module or change the policy

**Long-Running Waivers:**
```
WAIVER-001: Active for 6 months
Extended 4 times
No real progress
```

**Action:** Force completion or change policy

### Prevention Strategies

**Strategy 1: Waiver Limits**
```yaml
# .repo/repo.manifest.yaml
waivers:
  max_active: 5
  max_per_module: 2
  max_extensions: 2
  default_expiration_days: 30
  max_expiration_days: 90
```

**Strategy 2: Waiver Reviews**
```
Weekly: Review all active waivers
Monthly: Analyze waiver trends
Quarterly: Adjust policies based on data
```

**Strategy 3: Escalation for Repeated Waivers**
```
1st waiver: Developer + Team Lead approval
2nd waiver (same issue): Tech Lead + VP Eng approval
3rd waiver: Automatic policy review triggered
```

**Strategy 4: Waiver Metrics**
```
Track:
- Waiver rate (% of PRs)
- Average waiver duration
- Completion rate
- Extension rate
- Top waivered rules

Alert if:
- Waiver rate > 10%
- Avg duration > 60 days
- Completion rate < 80%
```

---

## Next Steps

After setting up waiver management:

1. **✅ Create waiver template** - Standardize process
2. **✅ Add to CI/CD** - Automate expiration checks
3. **✅ Train team** - Ensure understanding
4. **✅ Set up tracking** - Monitor active waivers
5. **✅ Schedule reviews** - Regular waiver meetings
6. **✅ Analyze trends** - Adjust policies accordingly

## Related Guides

- [How To: Configure Manifest](./HOW_TO_CONFIGURE_MANIFEST.md) - Configure waiver settings
- [How To: Define Boundaries](./HOW_TO_DEFINE_BOUNDARIES.md) - Understand boundary waivers
- [How To: Work With Agents](./HOW_TO_WORK_WITH_AGENTS.md) - Agent waiver handling

## Additional Resources

- `.repo/policy/WAIVERS.md` - Waiver policy
- `.repo/templates/WAIVER_TEMPLATE.md` - Standard template
- `.repo/waivers/` - Active waiver directory
- Phase 2 Documentation - Waiver framework

---

**Status:** Ready to use  
**Last Updated:** 2026-01-22  
**Version:** 1.0.0
