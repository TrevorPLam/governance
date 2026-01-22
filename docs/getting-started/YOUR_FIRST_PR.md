# Your First Governed Pull Request
## Walkthrough of Creating a PR with Governance

**Goal:** Learn how to create and submit a pull request that follows governance rules.

**Prerequisites:** 
- Governance framework installed in your repository
- Familiarity with git and pull requests
- Understanding of basic governance concepts

**Time Required:** 15-20 minutes

---

## Overview

This guide walks you through creating your first pull request (PR) in a governed repository. You'll learn:
- How to plan changes using TODO files
- How to follow governance principles
- How to pass quality gates
- How to handle waivers (if needed)
- How to get your PR approved

---

## Step 1: Plan Your Change

Before writing code, plan your work in the TODO system.

### Choose Priority Level

- **P0TODO.md** - Critical/blocking issues (security, production bugs)
- **P1TODO.md** - High priority features or improvements
- **P2TODO.md** - Normal priority tasks and enhancements

### Add Your Task

Open `P1TODO.md` and add your task:

```markdown
## High Priority Tasks

- [ ] **Add user authentication logging**
  - **Why:** Need audit trail for security compliance
  - **Scope:** Add logging to all auth endpoints
  - **Estimate:** 2-3 hours
  - **Definition of Done:**
    - All auth endpoints log attempts
    - Log includes user ID, timestamp, IP
    - Tests cover logging functionality
    - Documentation updated
  - **Dependencies:** None
  - **Risk:** Low - additive change only
```

**Commit the TODO:**
```bash
git add P1TODO.md
git commit -m "Plan: Add user authentication logging"
git push origin main
```

---

## Step 2: Create Feature Branch

Create a branch following your team's naming convention:

```bash
# Create and switch to feature branch
git checkout -b feature/auth-logging

# Or if using trunk-based development
git checkout -b auth-logging
```

**Branch Naming Best Practices:**
- Use descriptive names: `feature/auth-logging` not `fix`
- Include ticket number if applicable: `feature/JIRA-123-auth-logging`
- Keep it short but clear

---

## Step 3: Check Governance Policies

Before coding, review relevant policies:

### Review PRINCIPLES.md

Open `.repo/policy/PRINCIPLES.md` and note:

**P3 (Understand First)** - Do you understand the auth system?
- ✓ Yes: Proceed
- ✗ No: Read code, ask questions first

**P8 (Test Everything)** - Plan your tests
- Unit tests for logging functions
- Integration tests for auth endpoints
- Edge cases (failed auth, missing data)

**P14 (Security Paranoia)** - Security considerations
- Don't log sensitive data (passwords, tokens)
- Sanitize user input before logging
- Consider log injection attacks

### Review SECURITY_BASELINE.md

Check if your change triggers security review:

```markdown
Security Review Triggers:
- [x] Authentication or authorization logic (YOUR CHANGE)
- [ ] Cryptography
- [ ] Input validation
...
```

**Your change triggers security review** - You'll need a reviewer to approve.

### Review BOUNDARIES.md

Check layer architecture rules:

```markdown
Layer Rules:
- ui → domain ✓ (can call)
- domain → data ✓ (can call)
- data → platform ✓ (can call)
- NO circular dependencies ✗
```

Make sure your logging code respects these boundaries.

---

## Step 4: Implement Your Change

Write your code following governance principles:

### Example: Adding Auth Logging

```typescript
// src/domain/auth/auth-service.ts

import { Logger } from '@platform/logger'; // OK: domain → platform
import { sanitize } from '@platform/security';

class AuthService {
  private logger = new Logger('AuthService');

  async login(username: string, password: string, ip: string): Promise<User> {
    try {
      const user = await this.validateCredentials(username, password);
      
      // Log successful auth (P14: Don't log password!)
      this.logger.info('Auth success', {
        userId: user.id,
        username: sanitize(username),
        ip: sanitize(ip),
        timestamp: new Date().toISOString()
      });
      
      return user;
    } catch (error) {
      // Log failed auth
      this.logger.warn('Auth failed', {
        username: sanitize(username),
        ip: sanitize(ip),
        timestamp: new Date().toISOString(),
        reason: error.message
      });
      throw error;
    }
  }
}
```

**Governance Principles Followed:**
- ✓ P8: Tests planned (next step)
- ✓ P14: Passwords not logged
- ✓ P14: Input sanitized
- ✓ Boundaries: domain → platform only

---

## Step 5: Write Tests

Add comprehensive tests (P8: Test Everything):

```typescript
// src/domain/auth/auth-service.test.ts

describe('AuthService logging', () => {
  it('should log successful authentication', async () => {
    const logger = mockLogger();
    const service = new AuthService(logger);
    
    await service.login('user@test.com', 'password', '192.168.1.1');
    
    expect(logger.info).toHaveBeenCalledWith('Auth success', 
      expect.objectContaining({
        username: 'user@test.com',
        ip: '192.168.1.1'
      })
    );
    
    // P14: Ensure password not logged
    expect(logger.info).not.toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ password: expect.anything() })
    );
  });

  it('should log failed authentication', async () => {
    // ... test failed auth logging
  });

  it('should sanitize inputs in logs', async () => {
    // ... test injection prevention
  });
});
```

---

## Step 6: Run Quality Gates

Run all quality gates before committing:

### Using CLI:
```bash
# Run all checks
governance-cli verify --profile=quick

# Output shows:
# ✓ Linting passed
# ✓ Tests passed (coverage: 85%)
# ✓ Build successful
# ✓ No boundary violations
# ✓ Security checks passed
```

### Manual Checks:
```bash
# 1. Lint your code
npm run lint

# 2. Run tests
npm test

# 3. Check coverage
npm run test:coverage
# Ensure coverage meets minimum (70%+)

# 4. Build
npm run build

# 5. Run security scan (if available)
npm audit
```

---

## Step 7: Handle Quality Gate Failures

If a quality gate fails, you have options:

### Option A: Fix the Issue (Preferred)

```bash
# Example: Coverage too low (65% vs 70% minimum)
# Write more tests until coverage >= 70%
npm run test:coverage

# Re-run verification
governance-cli verify --profile=quick
```

### Option B: Request a Waiver (If Justified)

If you can't meet a gate and have a good reason:

```bash
# Create waiver request
governance-cli waiver create \
  --gate="coverage" \
  --reason="Legacy code refactor, tests added in follow-up" \
  --duration="2 weeks" \
  --remediation="JIRA-456: Add tests by 2026-02-05"
```

**Waiver Requirements:**
- Valid business reason
- Remediation plan
- Expiration date
- Reviewer approval

**When to Use Waivers:**
- Emergency hotfixes
- Legacy code incremental improvement
- Technical debt with planned resolution

**When NOT to Use Waivers:**
- Avoiding work
- Skipping tests for convenience
- Security issues

---

## Step 8: Commit Your Changes

Follow commit message conventions:

```bash
# Stage files
git add src/domain/auth/
git add src/domain/auth/*.test.ts

# Commit with clear message
git commit -m "feat(auth): Add authentication logging

- Log successful and failed auth attempts
- Include user ID, timestamp, and IP
- Sanitize inputs to prevent log injection
- Add comprehensive test coverage (85%)

Closes: #123
Refs: P1TODO.md - Add user authentication logging"

# Push to remote
git push origin feature/auth-logging
```

**Commit Message Format:**
```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:** feat, fix, docs, style, refactor, test, chore

---

## Step 9: Create Pull Request

### PR Title
```
feat(auth): Add authentication logging
```

### PR Description Template

Use the template from `.repo/agents/prompts/pr_template.md`:

```markdown
## Summary
Add logging for all authentication attempts to support security auditing.

## Changes Made
- Added logging to AuthService.login()
- Logs successful and failed auth attempts
- Sanitizes inputs to prevent log injection
- Added 12 new tests (coverage: 85%)

## Governance Checklist
- [x] Follows PRINCIPLES (P3, P8, P14)
- [x] Passes all quality gates
- [x] Security review required (auth changes)
- [x] Boundaries respected
- [x] Tests added and passing
- [x] Documentation updated
- [ ] Reviewer approval pending

## Testing Evidence
```
npm test
  ✓ 234 tests passed
  Coverage: 85% (target: 80%)
```

## Security Considerations
- Passwords NOT logged ✓
- Inputs sanitized ✓
- No sensitive data exposed ✓
- Follows security baseline ✓

## Breaking Changes
None - additive change only

## Reviewers
@security-team (required for auth changes)
```

---

## Step 10: Address Review Feedback

### Human Review

Security team reviews and comments:

**Comment:** "Consider rate limiting log writes to prevent DoS"

**Your Response:**
```markdown
Good catch! Added rate limiting:
- Max 100 log entries per minute per user
- Excess attempts return 429 Too Many Requests
- Updated tests to cover rate limiting

Commit: abc123 "Add rate limiting to auth logging"
```

### Agent Review

If agents are enabled, they may provide automated feedback:

**Agent Feedback:** "Boundary violation detected: ui → data"

**Resolution:** Fix the violation and re-run verification

---

## Step 11: Get Approval and Merge

### Required Approvals

Check `.repo/policy/HITL.md` for approval requirements:

```markdown
Security Changes Require:
- [x] Security team approval
- [x] Tests passing
- [x] Coverage >= 70%
- [x] No critical security issues
```

### Final Checks

```bash
# Ensure everything passes
governance-cli verify --profile=thorough

# Check no merge conflicts
git fetch origin main
git merge origin/main
# Resolve any conflicts

# Push final version
git push origin feature/auth-logging
```

### Merge

Once approved:
1. Squash commits (if needed)
2. Merge to main
3. Delete feature branch
4. Update TODO

```bash
# After merge, update TODO
# In P1TODO.md, move task to COMPLETEDTODO.md:
```

Move to `COMPLETEDTODO.md`:

```markdown
## Completed Tasks - 2026-01-22

- [x] **Add user authentication logging**
  - **Completed:** 2026-01-22
  - **PR:** #234
  - **Outcome:** Successfully added logging with 85% test coverage
  - **Learnings:** Rate limiting important for log-heavy operations
```

---

## Common Issues and Solutions

### Issue: "Quality gate failed: Coverage too low"

**Solution:**
```bash
# Check which files need tests
npm run test:coverage -- --verbose

# Write tests for uncovered code
# Re-run until coverage meets minimum
```

### Issue: "Boundary violation detected"

**Solution:**
```bash
# Review BOUNDARIES.md for layer rules
# Refactor to respect boundaries
# Example: Move code to correct layer
```

### Issue: "Security review required but no reviewer available"

**Solution:**
```bash
# 1. Tag security team in PR
# 2. Post in team channel
# 3. If urgent and no response:
governance-cli hitl escalate \
  --reason="Security review needed for auth change" \
  --urgency="high"
```

### Issue: "CI/CD pipeline failing"

**Solution:**
```bash
# Run same checks locally
governance-cli verify --profile=ci

# Fix issues locally before pushing
# Ensure local and CI environments match
```

---

## Best Practices Summary

### Before Coding
- ✓ Plan in TODO files
- ✓ Review relevant policies
- ✓ Understand security implications
- ✓ Check boundaries

### While Coding
- ✓ Follow principles (especially P3, P8, P14)
- ✓ Write tests as you go
- ✓ Run checks frequently
- ✓ Commit often with clear messages

### Before PR
- ✓ Run all quality gates
- ✓ Ensure tests pass
- ✓ Check coverage meets minimum
- ✓ Review your own code first

### During Review
- ✓ Respond to feedback promptly
- ✓ Ask questions if unclear
- ✓ Make requested changes
- ✓ Keep PR scope focused

### After Merge
- ✓ Update TODO files
- ✓ Delete feature branch
- ✓ Monitor for issues
- ✓ Document learnings

---

## Next Steps

Now that you've completed your first governed PR:

1. **Learn More:** Read [CONCEPTS_OVERVIEW.md](CONCEPTS_OVERVIEW.md)
2. **Customize:** Check [HOW_TO_CUSTOMIZE_POLICIES.md](../guides/HOW_TO_CUSTOMIZE_POLICIES.md)
3. **Advanced:** Read [HOW_TO_WORK_WITH_AGENTS.md](../guides/HOW_TO_WORK_WITH_AGENTS.md)
4. **Troubleshoot:** See [Troubleshooting Guide](../troubleshooting/COMMON_ISSUES.md)

---

**Guide Version:** 1.0  
**Last Updated:** 2026-01-22  
**Related:** [QUICK_START.md](QUICK_START.md), [CONCEPTS_OVERVIEW.md](CONCEPTS_OVERVIEW.md)
