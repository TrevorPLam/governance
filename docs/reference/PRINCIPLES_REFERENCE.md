# Principles Reference (P3-P25)

**Document Type:** Reference  
**Audience:** All Team Members  
**Last Updated:** 2026-01-22

---

## Overview

This reference provides detailed explanations, examples, and practical guidance for all 23 operating principles (P3-P25) that govern development practices. These principles sit below the Constitution and provide actionable guidelines for day-to-day work.

**Source:** `/.repo/policy/PRINCIPLES.md`  
**Status:** Updateable (Layer 2)  
**Count:** 23 principles + 1 global rule

---

## Quick Reference Table

| ID | Principle | Category | Key Action |
|----|-----------|----------|------------|
| **Global** | Filepaths Required | Documentation | Always include specific paths |
| **P3** | One Change Type Per PR | PR Management | Split mixed PRs |
| **P4** | Make It Shippable | PR Management | Ready to merge or blocked |
| **P5** | Don't Break Surprises | Safety | Call out impacts + tests |
| **P6** | Evidence Over Vibes | Verification | Show proof |
| **P7** | UNKNOWN Is First-Class | Clarity | Mark explicitly |
| **P8** | Read Repo First | Research | Check docs before deciding |
| **P9** | Assumptions Declared | Transparency | Write down assumptions |
| **P10** | Risk Triggers Stop | Safety | STOP → HITL → VERIFY |
| **P11** | Guardrails Over Heroics | Automation | Use tools, not trust |
| **P12** | Rollback Thinking | Safety | Plan undo strategy |
| **P13** | Respect Boundaries | Architecture | Don't cross modules |
| **P14** | Localize Complexity | Design | Contain complexity |
| **P15** | Consistency Beats Novelty | Patterns | Prefer existing patterns |
| **P16** | Decisions Written Down | Documentation | Record in smallest place |
| **P17** | PR Narration | Communication | Explain what/why/how |
| **P18** | No Silent Scope Creep | Project Management | Update Task Packet |
| **P19** | Docs Age With Code | Maintenance | Update docs with code |
| **P20** | Examples Are Contracts | Documentation | Keep examples current |
| **P21** | Naming Matters | Code Quality | Use clear names |
| **P22** | Waivers Rare + Temporary | Process | Expire waivers |
| **P23** | ADR Required When Triggered | Documentation | Create ADR for triggers |
| **P24** | Logs Required for Non-Docs | Traceability | Include logs |
| **P25** | Token-Optimized TODOs | Efficiency | Use P0/P1/P2 system |

---

## Global Rule: Filepaths Required Everywhere

**Rule:** Filepaths are required everywhere: PRs, Task Packets, logs, ADRs, waivers, and inline commentary.

### Purpose
- Enable quick navigation
- Provide precise references
- Support verification
- Improve traceability

### Requirements

**Must Include Filepaths In:**
- Pull request descriptions
- Task packets
- Agent logs
- ADRs
- Waiver requests
- Code comments (when referencing other files)
- HITL items

### Format

**Absolute Paths:**
```markdown
src/features/auth/login.ts
```

**Relative Paths (when clear):**
```markdown
../domain/user-service.ts
```

**With Line Numbers:**
```markdown
src/features/auth/login.ts (lines 45-67)
```

**Multiple Files:**
```markdown
Modified:
- src/features/auth/login.ts (lines 34-50)
- src/features/auth/session.ts (lines 12-28)
- src/features/auth/types.ts (added UserSession interface)
```

### Examples

#### ❌ Bad (No Filepaths)
```markdown
## What Changed
Updated the authentication logic to fix the session bug.

## Files Modified
- Login component
- Session manager
- Types file
```

#### ✅ Good (With Filepaths)
```markdown
## What Changed
Updated authentication logic in:
- src/features/auth/login.ts (lines 34-50): Fixed session initialization
- src/features/auth/session.ts (lines 12-28): Added timeout handling
- src/features/auth/types.ts: Added UserSession interface

## Verification
Tests added in src/features/auth/__tests__/login.test.ts (lines 89-120)
```

### Common Mistakes
- ❌ "Updated the config file" → Which config file? Full path needed
- ❌ "Modified authentication" → Which files? Specific paths needed
- ❌ "Fixed bug in utils" → Which util file? Path needed

---

## P3: One Change Type Per PR

**Rule:** A PR declares exactly one change type. If you need multiple types, split the work.

### Change Types

1. **Feature** - New functionality
2. **Bug Fix** - Correcting defects
3. **Refactoring** - Code improvements without behavior change
4. **Documentation** - Docs-only changes
5. **Configuration** - Config/tooling changes
6. **Performance** - Performance optimizations
7. **Security** - Security fixes/improvements
8. **Test** - Test-only changes

### Why This Matters

**Problems with Mixed PRs:**
- Harder to review
- Harder to rollback
- Confused purpose
- Unclear impact
- Difficult to test

**Benefits of Single Type:**
- Clear purpose
- Easier review
- Safe rollback
- Focused testing
- Better history

### How to Apply

#### Decision Tree

```
Is your PR doing more than one thing?
├─ No → Great! Continue
└─ Yes → Split into multiple PRs
    ├─ Feature + Bug Fix → 2 PRs
    ├─ Feature + Refactor → 2 PRs (refactor first)
    └─ Bug Fix + Docs → Usually OK (docs explain fix)
```

#### Exception: Related Docs

**Allowed:** Docs that explain the change in same PR

```markdown
## PR #123: Feature - Add user export
Files:
- src/features/export/user-export.ts (new feature)
- docs/features/user-export.md (explains new feature) ✅
```

### Examples

#### ❌ Bad: Mixed Change Types
```markdown
## PR #456: Fix login bug and add password reset feature
Changes:
- Fixed session timeout bug (Bug Fix)
- Added password reset feature (Feature)
- Refactored auth module (Refactoring)
- Updated tests (Test)

Problem: 4 different change types!
```

#### ✅ Good: Split into Separate PRs
```markdown
## PR #456: Bug Fix - Fix session timeout
Changes:
- src/features/auth/session.ts: Fixed timeout calculation
- src/features/auth/__tests__/session.test.ts: Added timeout test

## PR #457: Refactoring - Refactor auth module
Changes:
- src/features/auth/login.ts: Extract validation logic
- src/features/auth/validators.ts: New validation module

## PR #458: Feature - Add password reset
Changes:
- src/features/auth/password-reset.ts: New password reset feature
- src/features/auth/__tests__/password-reset.test.ts: Tests
- docs/features/password-reset.md: Documentation
```

### Special Cases

**Emergency Fixes:**
- May combine bug fix + minimal refactoring if needed
- Document why in PR description
- Get explicit approval

**Preparation PRs:**
- "Prep for feature X" can include refactoring + tests
- Must be clearly labeled
- No actual feature implementation

---

## P4: Make It Shippable

**Rule:** Each PR should be safe to merge and ship (or clearly blocked by HITL/waivers).

### States

#### ✅ Ready to Ship
- All tests pass
- All checks pass
- No known issues
- Reviewed and approved
- Can merge immediately

#### ⚠️ Blocked (Clear Reason)
- HITL item pending
- Waiver needed
- External dependency
- **Must document why blocked**

#### ❌ Not Shippable (Don't Create PR)
- Tests failing
- Incomplete implementation
- Known breaking changes
- Work in progress

### Requirements for Shippable

1. **Functional**
   - Feature works as intended
   - No regressions
   - Edge cases handled

2. **Tested**
   - Unit tests added/updated
   - Integration tests if needed
   - Manual testing completed

3. **Documented**
   - Code comments where needed
   - API docs updated
   - User docs updated if needed

4. **Safe**
   - No security vulnerabilities
   - No breaking changes (or properly handled)
   - Rollback plan if risky

5. **Complete**
   - No TODO comments without tickets
   - No commented-out code
   - No debug logging

### Examples

#### ✅ Shippable PR
```markdown
## PR #789: Feature - Add user search

**Status:** ✅ Ready to Ship

**Completed:**
- Feature fully implemented
- All tests passing (97% coverage)
- Documentation updated
- Security review completed
- Performance tested (meets budgets)

**Verification:**
- Unit tests: 15 added, all pass
- Integration tests: 3 added, all pass
- Manual testing: [screenshot]
- Performance: Search < 200ms (budget: 500ms)

**Can merge immediately**
```

#### ⚠️ Blocked But Valid
```markdown
## PR #790: Feature - Payment provider integration

**Status:** ⚠️ Blocked - HITL Required

**Blocking Items:**
- HITL-0045: Review payment provider credentials (Pending)
- HITL-0046: Approve production deployment plan (Pending)

**When Unblocked:** All technical work complete, tests pass, ready to merge

**Remaining:** Human approval of external integration
```

#### ❌ Not Shippable (Should Not Exist)
```markdown
## PR #791: WIP - User search (don't merge!)

**Status:** ❌ Work in Progress

Problems:
- Tests failing (3/18 fail)
- TODO: implement pagination
- TODO: add error handling
- Not ready for review

**This should be a draft PR or branch, not a real PR**
```

### How to Check

**Before Creating PR:**
```bash
# Run full check suite
npm run check:ci

# Verify tests pass
npm test

# Check coverage
npm run coverage

# Run governance check
governance-verify

# Review changes yourself
git diff main...your-branch
```

**Checklist:**
- [ ] All tests pass locally
- [ ] Code builds successfully
- [ ] No linter errors
- [ ] Documentation updated
- [ ] Verified manually
- [ ] No known issues
- [ ] Safe to merge OR clear blocker documented

---

## P5: Don't Break Surprises

**Rule:** If users, security, money, or production behavior could change: call it out, add tests, add rollback plan, use HITL.

### Critical Areas

**Always Call Out Changes To:**
1. **User Experience**
   - UI changes
   - Feature behavior changes
   - Performance changes users notice

2. **Security**
   - Authentication/authorization
   - Data access
   - Permissions

3. **Money Flows**
   - Payment processing
   - Billing logic
   - Financial calculations
   - Pricing display

4. **Production Behavior**
   - API contracts
   - Data formats
   - External integrations
   - Performance characteristics

### Requirements for Potentially Breaking Changes

#### 1. Call It Out Clearly

```markdown
## ⚠️ BREAKING CHANGE

**What Breaks:** User login flow requires email verification

**Impact:** 
- All existing users will need to verify email on next login
- ~10,000 users affected
- Expected duration: 2-3 days for full rollout

**Migration:** Automatic on first login after deploy
```

#### 2. Add Comprehensive Tests

```markdown
## Tests Added

**Unit Tests:**
- Email verification flow (15 tests)
- Existing user migration (8 tests)
- Error handling (6 tests)

**Integration Tests:**
- Full login flow with verification (3 scenarios)
- Email sending integration (2 scenarios)

**Coverage:** 96% of changed code
```

#### 3. Document Rollback Plan

```markdown
## Rollback Plan

**If Issues Detected:**
1. Revert PR #456
2. Run rollback migration: `npm run migrate:rollback-email-verification`
3. Deploy previous version
4. Monitor for 24 hours

**Rollback Time:** ~15 minutes
**Data Loss:** None (verification data preserved)
**User Impact:** Users return to previous flow
```

#### 4. Use HITL for High-Risk Changes

```markdown
## HITL Items

**HITL-0067:** Review user impact of login changes (Completed)
- Reviewed user communication plan
- Approved migration strategy
- Confirmed rollback plan

**HITL-0068:** Security review of email verification (Completed)
- Verified secure token generation
- Reviewed rate limiting
- Approved implementation
```

### Examples

#### ❌ Bad: Hidden Breaking Change
```markdown
## PR #234: Refactoring - Clean up auth code

Changes:
- Refactored authentication module
- Simplified session management
- Updated tests

(Hides the fact that session timeout changed from 30 minutes to 15 minutes!)
```

#### ✅ Good: Clear Breaking Change
```markdown
## PR #234: Configuration - Reduce session timeout

⚠️ **BREAKING CHANGE - User Impact**

**Change:** Session timeout reduced from 30 minutes to 15 minutes

**User Impact:**
- Users will be logged out more frequently
- May require more frequent logins
- Improves security posture

**Justification:** Security requirement (HITL-0055)

**Tests Added:**
- Session timeout tests (src/auth/__tests__/session.test.ts)
- Verified 15-minute timeout works correctly
- Verified logout notification displayed

**Rollback:** Revert this PR and deploy previous version (~5 minutes)

**Monitoring:** Track login frequency for 7 days after deploy
```

### Non-Breaking Changes That Still Need Callouts

**Performance Changes:**
```markdown
## Performance Impact

**Change:** Optimized user search query

**Before:** Average 800ms response time
**After:** Average 150ms response time

**User Impact:** ✅ Positive - Faster search results

**Monitoring:** Track search response times for 48 hours
```

**Data Format Changes:**
```markdown
## Data Format Change

**Change:** User timestamps now include timezone

**Before:** `"2024-01-22 10:00:00"`
**After:** `"2024-01-22T10:00:00-05:00"`

**Backward Compatibility:** ✅ Old format still parsed correctly

**Migration:** Automatic (lazy migration on read)

**Impact:** API responses include timezone info
```

---

## P6: Evidence Over Vibes

**Rule:** Show proof: commands run, outputs, test results, links to artifacts (filepaths).

### What Counts as Evidence

#### ✅ Good Evidence

**Test Output:**
```markdown
## Test Results
```bash
$ npm test
 PASS  src/auth/__tests__/login.test.ts
 PASS  src/auth/__tests__/session.test.ts
 PASS  src/auth/__tests__/password-reset.test.ts

Test Suites: 3 passed, 3 total
Tests:       47 passed, 47 total
Coverage:    95.8%
```
```

**Build Output:**
```markdown
## Build Verification
```bash
$ npm run build
✓ TypeScript compilation successful
✓ Bundle size: 245kb (under 250kb budget)
✓ No linter errors
✓ Build completed in 12.3s
```
```

**Manual Testing:**
```markdown
## Manual Verification

**Test Environment:** Staging
**Date:** 2024-01-22
**Tester:** @username

**Scenarios Tested:**
1. ✅ User login with valid credentials
   - Screenshot: [login-success.png]
2. ✅ User login with invalid credentials
   - Screenshot: [login-error.png]
3. ✅ Password reset flow
   - Screenshot: [password-reset.png]

**Issues:** None found
```

**Performance Metrics:**
```markdown
## Performance Verification

**Tool:** Lighthouse CI

**Results:**
- First Contentful Paint: 1.2s (target: 1.5s) ✅
- Time to Interactive: 2.8s (target: 3.0s) ✅
- Largest Contentful Paint: 2.1s (target: 2.5s) ✅

**Report:** [lighthouse-report.html]
```

#### ❌ Bad "Evidence" (Not Acceptable)

**Vague Claims:**
```markdown
❌ "I tested this and it works"
❌ "Looks good to me"
❌ "Should be fine"
❌ "Tested locally"
❌ "Trust me, it's working"
```

**Missing Details:**
```markdown
❌ "All tests pass" (show the output!)
❌ "Performance is better" (show the metrics!)
❌ "No bugs found" (show the test cases!)
```

### How to Provide Evidence

#### For Code Changes

```markdown
## Verification Evidence

**1. Unit Tests**
```bash
$ npm run test:unit
✓ All 23 unit tests passing
Coverage: 94.2% (+2.1% from baseline)
```

**2. Integration Tests**
```bash
$ npm run test:integration
✓ All 8 integration tests passing
Duration: 45.3s
```

**3. Manual Testing**
- Login flow: [screenshot-login.png]
- Error handling: [screenshot-error.png]
- Edge cases tested:
  - Empty email: ✅ Proper error shown
  - Invalid format: ✅ Validation works
  - Network timeout: ✅ Retry logic works

**4. Code Review**
Self-review completed:
- No console.log statements
- No commented code
- Error handling comprehensive
- Type safety verified
```

#### For Documentation Changes

```markdown
## Verification Evidence

**1. Spelling/Grammar**
```bash
$ npm run docs:lint
✓ No errors found
```

**2. Links Checked**
```bash
$ npm run docs:check-links
✓ All 47 links valid
```

**3. Examples Tested**
All code examples executed and verified:
- Example 1 (login.ts): ✅ Compiles and runs
- Example 2 (session.ts): ✅ Compiles and runs
- Example 3 (password-reset.ts): ✅ Compiles and runs

**4. Readability**
- Read through 2x for clarity
- Technical accuracy verified
- Formatting consistent
```

#### For Performance Changes

```markdown
## Performance Evidence

**Benchmark Results:**
```bash
$ npm run benchmark

Before optimization:
- Function A: 850ms avg (1000 iterations)
- Function B: 420ms avg (1000 iterations)

After optimization:
- Function A: 120ms avg (1000 iterations) [85.9% faster]
- Function B: 380ms avg (1000 iterations) [9.5% faster]
```

**Profiling:**
- Flame graph: [flamegraph.svg]
- Hotspots eliminated in function A
- Memory usage stable

**Load Testing:**
```bash
$ npm run load-test
Requests: 10,000
Success rate: 100%
p95 latency: 145ms (previous: 890ms)
p99 latency: 180ms (previous: 1200ms)
```
```

### Evidence Storage

**Where to Put Evidence:**

1. **In PR Description** - Summary and key results
2. **In PR Comments** - Detailed outputs
3. **In Repository** - Long-term artifacts
   ```
   .github/verification/
   ├── pr-123-test-output.txt
   ├── pr-123-performance.json
   └── pr-123-manual-testing/
       ├── screenshot-1.png
       └── screenshot-2.png
   ```

---

## P7: UNKNOWN Is a First-Class State

**Rule:** UNKNOWN is allowed and required. Mark it explicitly and route to HITL.

### When to Use UNKNOWN

**Valid Situations:**
1. Cannot determine command from repository
2. Ambiguous requirements
3. Missing documentation
4. Conflicting information
5. Requires external knowledge
6. Needs human decision

### How to Mark UNKNOWN

#### In Manifest

```yaml
commands:
  install: "npm ci"
  check:quick: "npm run lint && npm run build"
  check:security: "<UNKNOWN>"  # See HITL-0023
```

#### With HITL Reference

```markdown
## HITL-0023: Determine Security Scan Command

**Category:** Clarification
**Status:** Pending

**Context:**
Repository has no existing security scan command. Multiple options available:
1. npm audit
2. snyk test
3. OWASP dependency-check

**Required Decision:**
Which security scanning tool should be used?

**Options:**
- Option A: npm audit (built-in, free)
- Option B: Snyk (requires account, more features)
- Option C: OWASP (heavyweight but comprehensive)

**Recommendation:** npm audit for simplicity

**Owner:** @founder
```

### NOT An Error

**UNKNOWN is correct when:**
- Information genuinely missing
- Requires human judgment
- Multiple valid options exist
- External dependency needed

**UNKNOWN is documentation that:**
- Agent did its job (checked thoroughly)
- Found a gap in knowledge
- Properly escalated
- Stopped instead of guessing

### Examples

#### ❌ Bad: Guessing Instead of UNKNOWN

```yaml
# Agent guessed because no tests found
commands:
  check:ci: "npm run test"  # WRONG - no test script exists!
```

#### ✅ Good: Using UNKNOWN Properly

```yaml
commands:
  check:ci: "<UNKNOWN>"  # See HITL-0024
```

```markdown
## HITL-0024: Determine CI Test Command

**Context:**
- No package.json test script found
- No Makefile with test target
- No CI configuration found
- No test documentation in README

**Searched:**
- package.json scripts ✗
- Makefile ✗
- .github/workflows ✗
- README.md ✗
- docs/ ✗

**Required:** Human to clarify testing strategy
```

### Process After UNKNOWN

1. **Mark UNKNOWN** in manifest/code/docs
2. **Create HITL Item** with context
3. **Stop Work** on that portion
4. **Continue** with other parts if possible
5. **Wait for Resolution** from human
6. **Update** once resolved

---

## P8: Read Repo First

**Rule:** Use `/.repo` docs + `repo.manifest.yaml` before deciding anything.

### Required Reading Order

1. **`/.repo/policy/CONSTITUTION.md`** - Fundamental rules
2. **`/.repo/policy/PRINCIPLES.md`** - Operating principles
3. **`/.repo/repo.manifest.yaml`** - Repository commands and config
4. **`/.repo/docs/standards/`** - Repository-specific standards
5. **Repository README.md** - Project-specific information
6. **Repository docs/** - Detailed documentation

### What to Check Before...

#### Before Running Commands

**Check:**
1. `repo.manifest.yaml` - What commands are defined?
2. `package.json` - What scripts exist?
3. `README.md` - What installation instructions?
4. `.github/workflows/` - What does CI run?

**Example:**
```markdown
Before running tests:
✓ Checked repo.manifest.yaml: check:ci = "npm test"
✓ Checked package.json: "test": "jest"
✓ Verified command exists
→ Run: npm test
```

#### Before Making Architectural Decisions

**Check:**
1. `/.repo/policy/BOUNDARIES.md` - What are the boundary rules?
2. `/.repo/docs/standards/` - What patterns exist?
3. `docs/architecture/` - What's the current architecture?
4. Existing code - What patterns are used?

#### Before Determining Quality Requirements

**Check:**
1. `/.repo/policy/QUALITY_GATES.md` - What are the gates?
2. `repo.manifest.yaml` - What budgets are defined?
3. Existing test coverage - What's the baseline?

### Common Mistakes

#### ❌ Assuming Standard Patterns

```markdown
❌ "This is a Node.js project, so tests are `npm test`"
   → WRONG: Check repo.manifest.yaml first!

❌ "All React projects use the same structure"
   → WRONG: Check boundary rules first!

❌ "Coverage should be 80%"
   → WRONG: Check QUALITY_GATES.md first!
```

#### ✅ Checking Repository Rules

```markdown
✅ Check repo.manifest.yaml for test command
✅ Check BOUNDARIES.md for architecture rules
✅ Check QUALITY_GATES.md for coverage targets
✅ When in doubt, use <UNKNOWN> and create HITL
```

### Research Template

Use this template when researching:

```markdown
## Research: [Topic]

**1. Checked /.repo/policy/**
- CONSTITUTION.md: [relevant rules]
- PRINCIPLES.md: [relevant principles]
- [Specific policy]: [findings]

**2. Checked repo.manifest.yaml**
- Commands: [relevant commands]
- Configuration: [relevant settings]

**3. Checked /.repo/docs/standards/**
- [Standard 1]: [findings]
- [Standard 2]: [findings]

**4. Checked repository docs**
- README.md: [findings]
- docs/: [findings]

**5. Checked existing code**
- Patterns found: [list]
- Consistent approach: [description]

**Conclusion:** [What was learned]
**Decision:** [What to do based on research]
```

---

## P9: Assumptions Must Be Declared

**Rule:** Any assumption must be written down and labeled as an assumption.

### Why Declare Assumptions

**Problems with Hidden Assumptions:**
- Decisions seem arbitrary
- Hard to revisit decisions
- Can't verify assumptions
- Can't update when assumptions change

**Benefits of Declared Assumptions:**
- Transparent reasoning
- Can validate assumptions
- Can update when invalid
- Clear decision basis

### How to Declare Assumptions

#### In Task Packets

```markdown
## Task: Optimize Database Queries

**Assumptions:**
1. Database connection pool size is 20 (current production config)
2. Average query time should be < 100ms
3. 95th percentile load is 1000 req/min
4. Database has indexes on user_id and created_at columns

**If Assumptions Invalid:**
- Assumption 1 invalid → Re-calculate pool sizing
- Assumption 2 invalid → Adjust optimization targets
- Assumption 3 invalid → Re-run load tests
- Assumption 4 invalid → Add indexes before optimizing queries
```

#### In PRs

```markdown
## PR #456: Performance - Optimize user queries

**Implementation Assumptions:**
- Assumption #1: Users table has < 1 million rows
  - Basis: Current production data shows 847K users
  - Impact if wrong: Query optimization may not scale
  
- Assumption #2: Most queries filter by user_id
  - Basis: Analytics show 87% of queries include user_id
  - Impact if wrong: Index may not be optimal
  
- Assumption #3: Database is PostgreSQL 14+
  - Basis: Production environment specs
  - Impact if wrong: Query syntax may need adjustment

**Validation:**
- Verified assumption #1: Production count confirms < 1M
- Verified assumption #2: Query logs analyzed
- Verified assumption #3: Checked DB version (14.5)
```

#### In ADRs

```markdown
## ADR-0012: Use Redis for Session Storage

**Assumptions:**
1. Session data size < 1KB per user
2. 10,000 concurrent users maximum
3. Session timeout of 30 minutes acceptable
4. Redis available in production environment
5. Session data doesn't need to be durable

**Validation:**
- Measured current session data: avg 650 bytes ✓
- Current peak concurrent users: 7,200 ✓
- Discussed timeout with product: 30min approved ✓
- Confirmed Redis in prod roadmap ✓
- Acceptable to lose sessions on Redis restart ✓

**If Assumptions Change:**
- If session data > 1KB → Re-evaluate storage solution
- If > 10K users → Scale Redis cluster
- If durability needed → Add Redis persistence
```

### Types of Assumptions

#### Technical Assumptions
```markdown
**Technical Assumptions:**
- Runtime: Node.js 18+
- Database: PostgreSQL 14+
- Memory: 512MB available
- CPU: 2 cores minimum
```

#### Business Assumptions
```markdown
**Business Assumptions:**
- Feature used by < 1000 users initially
- Usage pattern: primarily during business hours
- Response time: 2 seconds acceptable
- Budget: $100/month infrastructure
```

#### Data Assumptions
```markdown
**Data Assumptions:**
- User records: < 1 million
- Average record size: 2KB
- Growth rate: 1000 users/month
- Data retention: 2 years
```

#### Environment Assumptions
```markdown
**Environment Assumptions:**
- Production: AWS us-east-1
- CDN: CloudFlare available
- External API: 99.9% uptime
- Network: < 100ms latency
```

### Validating Assumptions

**Before Implementation:**
```markdown
**Assumption Validation:**

Assumption #1: Database supports JSONB
→ Verified: PostgreSQL 14.5 ✓

Assumption #2: Average query < 100ms
→ Measured: Current avg 87ms ✓

Assumption #3: 1000 concurrent users max
→ Checked: Analytics show peak 750 users ✓
```

**After Implementation:**
```markdown
**Assumption Verification:**

Assumption #1: Optimization improves performance by 50%
→ Measured: 68% improvement ✓ (exceeded)

Assumption #2: Memory usage stays under 512MB
→ Monitored: Peak 480MB ✓

Assumption #3: No regressions in other queries
→ Tested: All queries maintain or improve ✓
```

---

## P10: Risk Triggers a Stop

**Rule:** If risk is non-trivial: STOP → HITL → VERIFY.

### Risk Assessment

#### Low Risk (Proceed)
- Documentation changes only
- Test-only changes
- Internal refactoring with comprehensive tests
- Configuration changes with rollback
- Non-critical bug fixes

#### Medium Risk (Review Carefully)
- New features with good test coverage
- Database schema changes (additive)
- API changes (backward compatible)
- Performance optimizations
- Dependency updates (minor versions)

#### High Risk (STOP → HITL)
- **Authentication/authorization changes**
- **Money/payment logic changes**
- **Production database migrations**
- **External system integrations**
- **Security-critical changes**
- **Breaking API changes**
- **Major dependency updates**

### STOP → HITL → VERIFY Process

#### 1. STOP

**Recognize Risk:**
```markdown
⚠️ **HIGH RISK DETECTED**

**Change:** Modify payment processing logic
**Risk Level:** High
**Risk Factors:**
- Affects money flows
- Could impact billing
- Production system
- 10,000+ users affected

**Action:** STOPPING for HITL review
```

#### 2. HITL

**Create HITL Item:**
```markdown
## HITL-0089: Review Payment Processing Changes

**Category:** Risk
**Risk Level:** High
**Required For:** PR #456

**Context:**
Modifying payment processing to support multiple currencies.

**Risk Factors:**
1. Could affect existing payments
2. Currency conversion accuracy critical
3. Financial reporting impact
4. Compliance considerations

**Required Actions:**
1. Human reviews implementation approach
2. Human approves currency conversion logic
3. Human confirms compliance requirements met
4. Human approves rollback plan
5. Human confirms test coverage adequate

**Proposed Approach:**
[Detailed implementation plan]

**Test Strategy:**
[Comprehensive test plan]

**Rollback Plan:**
[Detailed rollback procedure]

**Status:** Pending → In Progress → Completed
```

#### 3. VERIFY

**After HITL Approval:**
```markdown
## Verification (Post-HITL)

**HITL-0089 Status:** ✅ Completed

**Human Approvals:**
✓ Implementation approach approved by @founder
✓ Currency logic reviewed by @finance-lead
✓ Compliance confirmed by @legal
✓ Rollback plan approved

**Technical Verification:**
✓ All tests pass (156/156)
✓ Currency conversion tested with real rates
✓ Edge cases handled (zero amounts, negative, etc.)
✓ Performance tested (< 50ms per conversion)
✓ Rollback tested in staging

**Monitoring Plan:**
- Track conversion accuracy for 7 days
- Alert on any failed conversions
- Daily report of currency distribution
- Weekly review of conversion rates

**Ready to Proceed:** Yes, with monitoring
```

### Risk Indicators

**Code Patterns That Indicate Risk:**
```javascript
// ⚠️ HIGH RISK: Money calculations
const total = price * quantity * taxRate;

// ⚠️ HIGH RISK: Authentication bypass
if (req.query.skipAuth === 'true') return true;

// ⚠️ HIGH RISK: Production data modification
await db.users.updateMany({}, { subscriptionStatus: 'active' });

// ⚠️ HIGH RISK: External API with credentials
const response = await paymentProvider.charge(apiKey, amount);
```

**Commit Message Patterns That Indicate Risk:**
- "Fix payment bug"
- "Update login logic"
- "Modify security check"
- "Change database schema"
- "Update production config"

### Examples

#### ❌ Bad: Proceeding with Risk

```markdown
## PR #678: Fix payment rounding

Quick fix for payment rounding issue.

Changed:
- src/payments/calculator.ts

(No risk assessment, no HITL, just "fixing" financial logic!)
```

#### ✅ Good: Stopping for Risk

```markdown
## PR #678: Fix payment rounding

⚠️ **HIGH RISK - HITL REQUIRED**

**Issue:** Payment amounts being rounded incorrectly
**Impact:** Affects all payments (10,000+ transactions/day)
**Risk:** Financial accuracy, potential revenue impact

**HITL Item:** HITL-0091 (Status: Completed)

**Risk Assessment:**
- **Financial Impact:** Medium (max $0.01 error per transaction)
- **Volume:** High (all payments affected)
- **Reversibility:** High (can rollback)
- **Testing:** Comprehensive (see below)

**HITL Approvals:**
✓ Founder approved implementation
✓ Finance team reviewed rounding logic
✓ Compliance confirmed approach acceptable

**Verification:**
- 1000+ test cases with various amounts
- Verified against accounting standards
- Tested edge cases (negative, zero, large numbers)
- Rollback tested in staging

**Monitoring:**
- Track rounding errors for 30 days
- Daily reconciliation reports
- Alert if any discrepancies > $0.01

**Rollback Plan:** Revert PR, deploy previous version (< 5 minutes)
```

---

_[Continuing with remaining principles P11-P25 in next message due to length...]_

---

**Document Status:** In Progress (P3-P10 complete)  
**Remaining:** P11-P25  
**Last Updated:** 2026-01-22
