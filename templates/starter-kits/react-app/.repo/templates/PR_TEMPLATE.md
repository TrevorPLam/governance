# Pull Request Template (GitHub)
<!-- GOVERNANCE_VERSION: 1.0.0 -->
<!-- GOVERNANCE: UPDATEABLE - Layer 3 -->

This is a simplified PR template for GitHub's `.github/PULL_REQUEST_TEMPLATE.md` file. For the full agent PR template, see `/.repo/agents/prompts/pr_template.md`.

## GitHub PR Template

```markdown
## Summary
<!-- Brief description of what changed and why -->

## Type of Change
<!-- Check all that apply -->
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Refactoring (no functional changes)
- [ ] Documentation update
- [ ] Configuration change
- [ ] Performance improvement
- [ ] Security update

## Task Reference
<!-- Link to task, issue, or ticket -->
- Task ID:
- Related Issues:

## Changes Made
<!-- List key changes with filepaths -->
- `path/to/file1.ts` - What changed and why
- `path/to/file2.ts` - What changed and why

## Testing
<!-- How was this tested? -->
- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] E2E tests added/updated
- [ ] Manual testing completed
- [ ] All tests passing locally

**Test Coverage:** [percentage or N/A]

## Documentation
<!-- What documentation was updated? -->
- [ ] Code comments updated
- [ ] API documentation updated
- [ ] README updated
- [ ] User guide updated
- [ ] ADR created (if required)
- [ ] No documentation needed

## Quality Gates
<!-- Verify all quality gates -->
- [ ] Linting passed
- [ ] Type checking passed
- [ ] Tests passed
- [ ] Security scan passed
- [ ] Code coverage meets threshold
- [ ] Build successful

## Governance Compliance
<!-- Verify governance requirements -->
- [ ] Boundaries respected (no reverse dependencies)
- [ ] Principles followed
- [ ] Security reviewed (if applicable)
- [ ] ADR created (if required for dependencies, API changes, schema changes)
- [ ] UNKNOWNs resolved
- [ ] HITL completed (if required)

## Breaking Changes
<!-- List any breaking changes -->
- None
<!-- OR -->
- Breaking change 1: [description and migration path]
- Breaking change 2: [description and migration path]

## Rollback Plan
<!-- How to rollback if issues arise -->
[Describe rollback strategy]

## Screenshots/Evidence
<!-- For UI changes or significant features -->
[Add screenshots, logs, or other evidence]

## Reviewer Checklist
<!-- For reviewer to verify -->
- [ ] Code follows project conventions
- [ ] Changes are well-documented
- [ ] Tests are comprehensive
- [ ] No obvious bugs or issues
- [ ] Security implications considered
- [ ] Performance impact acceptable
- [ ] Ready to merge

## Additional Notes
<!-- Any other context or information -->
[Add notes here]

---

**Agent Log:** [Link to agent log if applicable]  
**Agent Role:** [primary | secondary | N/A]
```

## Usage

### For GitHub Repository

1. Create `.github/PULL_REQUEST_TEMPLATE.md` in repository root
2. Copy the template above
3. Customize for your project needs
4. GitHub will automatically use it for new PRs

### For Multiple PR Templates

Create `.github/PULL_REQUEST_TEMPLATE/`:
- `bug_fix.md` - For bug fixes
- `feature.md` - For new features
- `hotfix.md` - For urgent hotfixes

### Example Filled PR

```markdown
## Summary
Added JWT authentication to REST API endpoints with token validation and refresh capabilities.

## Type of Change
- [x] New feature (non-breaking change which adds functionality)
- [x] Security update

## Task Reference
- Task ID: FEAT-123
- Related Issues: #45, #67

## Changes Made
- `src/domain/auth/middleware/auth.middleware.ts` - Created JWT validation middleware
- `src/domain/auth/controllers/auth.controller.ts` - Added login and refresh endpoints
- `src/domain/auth/services/token.service.ts` - Added token generation and validation
- `tests/domain/auth/auth.test.ts` - Added comprehensive test suite

## Testing
- [x] Unit tests added/updated
- [x] Integration tests added/updated
- [x] E2E tests added/updated
- [x] Manual testing completed
- [x] All tests passing locally

**Test Coverage:** 92%

## Documentation
- [x] Code comments updated
- [x] API documentation updated
- [x] README updated
- [ ] User guide updated (will update after merge)
- [ ] ADR created (ADR-015 already exists)
- [ ] No documentation needed

## Quality Gates
- [x] Linting passed
- [x] Type checking passed
- [x] Tests passed (43 unit + 8 integration + 3 E2E)
- [x] Security scan passed
- [x] Code coverage meets threshold (92% > 80%)
- [x] Build successful

## Governance Compliance
- [x] Boundaries respected (no reverse dependencies)
- [x] Principles followed (P10: Tests required, P17: Security HITL)
- [x] Security reviewed (HITL-047 completed)
- [x] ADR created (ADR-015 already documented JWT decision)
- [x] UNKNOWNs resolved (none encountered)
- [x] HITL completed (HITL-047 - Security review approved)

## Breaking Changes
- None - New endpoints added, existing endpoints unchanged

## Rollback Plan
Revert this commit and restart services. Authentication falls back to no-op (returns 200) for graceful degradation.

## Screenshots/Evidence
Test results:
```
✓ Unit tests: 43/43 passed
✓ Integration tests: 8/8 passed
✓ E2E tests: 3/3 passed
✓ Coverage: 92%
✓ Security scan: No vulnerabilities
```

## Reviewer Checklist
- [x] Code follows project conventions
- [x] Changes are well-documented
- [x] Tests are comprehensive
- [x] No obvious bugs or issues
- [x] Security implications considered
- [x] Performance impact acceptable (token validation <10ms)
- [ ] Ready to merge (pending review)

## Additional Notes
- Token secret must be configured in environment variables
- Refresh tokens stored in database (consider Redis in future for performance)
- Consider adding rate limiting to login endpoint in follow-up task

---

**Agent Log:** logs/agent/FEAT-123.json  
**Agent Role:** primary
```

## Customization

### Simplify for Small Projects
Remove sections not needed:
- Governance Compliance
- Agent Log
- HITL references

### Enhance for Large Projects
Add sections:
- Performance impact
- Database migrations
- Deployment notes
- Monitoring changes
- Feature flag configuration

### Project-Specific Checks
Add custom checklist items:
- [ ] Translations added (for i18n projects)
- [ ] Mobile tested (for mobile apps)
- [ ] Accessibility checked (for web apps)
- [ ] Analytics events added (for product features)

## Best Practices

### Writing PR Descriptions
- ✅ Be clear and concise
- ✅ Explain the "why" not just "what"
- ✅ Link to related issues/tasks
- ✅ Include evidence (test results, screenshots)
- ✅ List breaking changes prominently
- ✅ Provide rollback plan

### Reviewing PRs
- ✅ Read description first
- ✅ Check all checklist items
- ✅ Verify tests are comprehensive
- ✅ Look for security issues
- ✅ Check boundary compliance
- ✅ Verify documentation updated
- ✅ Test locally if needed

### Merging PRs
- ✅ All checks passed
- ✅ All reviewers approved
- ✅ No unresolved comments
- ✅ Up to date with base branch
- ✅ CI/CD green
- ✅ Ready for deployment

## References

- Agent PR Template: /.repo/agents/prompts/pr_template.md (more detailed version)
- PR Review Checklist: /.repo/agents/checklists/pr-review.md
- Quality Gates: /.repo/policy/QUALITY_GATES.md
- Principles: /.repo/policy/PRINCIPLES.md
