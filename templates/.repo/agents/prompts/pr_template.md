# Pull Request Template
<!-- GOVERNANCE_VERSION: 1.0.0 -->
<!-- GOVERNANCE: CUSTOM - Layer 1 -->

This template defines the structure for agent-generated pull requests. All PRs must include sufficient evidence and documentation for reviewer approval.

## PR Template Structure

```markdown
## Summary
Brief description of what changed and why.

## Task Reference
- Task ID: [link to task packet or issue]
- Priority: P0|P1|P2

## Changes Made

### Files Modified
List all files changed with brief description:
- `path/to/file1.ts` - What changed and why
- `path/to/file2.ts` - What changed and why

### Three-Pass Process

#### Pass 1: Plan
- [x] Identified all files to modify
- [x] Documented risks
- [x] Declared UNKNOWNs
- [x] Got approval to proceed

**Plan Summary:**
[Describe the plan that was followed]

#### Pass 2: Change
- [x] Applied planned changes
- [x] Followed boundaries
- [x] Respected principles
- [x] Logged all changes

**Change Summary:**
[Describe what was implemented]

#### Pass 3: Verify
- [x] Ran tests
- [x] Collected evidence
- [x] Created logs
- [x] Created trace
- [x] Verified quality gates

**Verification Summary:**
[Describe verification results]

## Evidence

### Tests
- Unit tests: [pass/fail count]
- Integration tests: [pass/fail count]
- E2E tests: [pass/fail count]
- Coverage: [percentage]

### Quality Gates
- [x] Linting passed
- [x] Type checking passed
- [x] Security scan passed
- [x] Build successful
- [x] Coverage threshold met

### Waivers (if any)
[List any quality gate waivers requested with justification]

## Documentation

### Updated Documentation
- [x] API documentation
- [x] README updates
- [x] Inline comments
- [x] User guide updates

### ADRs Created
[List any ADRs created for this change]

## Security Review

### Security Impact
[None | Low | Medium | High]

### Security Changes
[Describe any security-related changes]

### HITL Required
- [ ] Yes - Security review required
- [x] No - No security impact

## Boundaries

### Boundaries Respected
- [x] No reverse dependencies
- [x] No cross-feature imports without ADR
- [x] Layer model followed: ui → domain → data → platform

### Boundary Changes
[Describe any boundary changes or ADRs created]

## Dependencies

### New Dependencies
[List any new dependencies added]

### Dependency ADRs
[Link to ADRs documenting dependency decisions]

## UNKNOWNs

### UNKNOWNs Encountered
[List any UNKNOWNs encountered during implementation]

### HITL Items Created
[List any HITL items created and their resolution]

## Agent Log

### Agent Role
[primary | secondary]

### Log Location
[Link to agent log file]

### Trace Location
[Link to agent trace file]

### Key Decisions
[List important decisions made during implementation]

### Risks Identified
[List any risks identified and mitigation]

## Testing

### Test Strategy
[Describe how changes were tested]

### Manual Testing
[Describe any manual testing performed]

### Regression Testing
[Confirm no regressions introduced]

## Rollback Plan

### Rollback Strategy
[Describe how to rollback if issues arise]

### Rollback Verification
[How to verify rollback worked]

## Reviewer Checklist

For reviewer to verify:

- [ ] Three-pass process documented
- [ ] All tests pass
- [ ] Quality gates pass or waiver granted
- [ ] ADRs created when required
- [ ] Boundaries respected
- [ ] Security reviewed if applicable
- [ ] Documentation updated
- [ ] Agent logs present
- [ ] Evidence provided
- [ ] UNKNOWNs resolved
- [ ] Filepaths used in all references

## References

- Task Packet: [link]
- Related PRs: [links]
- ADRs: [links]
- Policies: [links to relevant policy docs]
```

## Example PR Description

```markdown
## Summary
Implemented JWT-based authentication for REST API endpoints with token validation and refresh capabilities.

## Task Reference
- Task ID: FEAT-123
- Priority: P0

## Changes Made

### Files Modified
- `src/domain/auth/middleware/auth.middleware.ts` - Added JWT validation middleware
- `src/domain/auth/controllers/auth.controller.ts` - Added login and refresh endpoints
- `src/domain/auth/services/token.service.ts` - Added token generation and validation
- `tests/domain/auth/auth.test.ts` - Added comprehensive auth tests

### Three-Pass Process

#### Pass 1: Plan
- [x] Identified all files to modify
- [x] Documented risks
- [x] Declared UNKNOWNs
- [x] Got approval to proceed

**Plan Summary:**
Planned to add authentication middleware in domain layer, following existing patterns from ADR-015. Identified need for token service, middleware, and controller changes. No UNKNOWNs.

#### Pass 2: Change
- [x] Applied planned changes
- [x] Followed boundaries
- [x] Respected principles
- [x] Logged all changes

**Change Summary:**
Implemented JWT authentication using jsonwebtoken library (already approved). Added middleware for token validation, endpoints for login/refresh. Followed layer model: controller → service → repository.

#### Pass 3: Verify
- [x] Ran tests
- [x] Collected evidence
- [x] Created logs
- [x] Created trace
- [x] Verified quality gates

**Verification Summary:**
All tests pass (43 new tests added). Coverage at 92%. Security scan clean. No regressions detected.

## Evidence

### Tests
- Unit tests: 43/43 passed
- Integration tests: 8/8 passed
- E2E tests: 3/3 passed
- Coverage: 92%

### Quality Gates
- [x] Linting passed
- [x] Type checking passed
- [x] Security scan passed
- [x] Build successful
- [x] Coverage threshold met (>80%)

### Waivers
None required.

## Documentation

### Updated Documentation
- [x] API documentation (docs/api/authentication.md)
- [x] README updates (added authentication section)
- [x] Inline comments
- [x] User guide updates

### ADRs Created
None - ADR-015 already covered JWT decision.

## Security Review

### Security Impact
High - Authentication is security-critical

### Security Changes
- Token-based authentication
- Password validation
- Token expiry handling
- Refresh token rotation

### HITL Required
- [x] Yes - Security review required (HITL-047 created and resolved)
- [ ] No

## Boundaries

### Boundaries Respected
- [x] No reverse dependencies
- [x] No cross-feature imports
- [x] Layer model followed: controller → service → repository

### Boundary Changes
None - stayed within domain/auth module.

## Dependencies

### New Dependencies
None - JWT library already approved in ADR-015.

## UNKNOWNs

### UNKNOWNs Encountered
None.

## Agent Log

### Agent Role
primary

### Log Location
logs/agent/FEAT-123.json

### Key Decisions
- Used JWT over sessions (per ADR-015)
- 1 hour token expiry, 30 day refresh expiry
- Implemented token refresh rotation for security

### Risks Identified
- Token theft risk - mitigated by short expiry
- Refresh token storage - documented in security section

## Testing

### Test Strategy
- Unit tests for all auth functions
- Integration tests for login flow
- E2E tests for protected endpoints
- Security tests for token validation

### Manual Testing
- Verified login with valid credentials
- Verified rejection of invalid credentials
- Verified token validation on protected routes
- Verified refresh token flow

### Regression Testing
- All existing tests still pass
- No API changes to existing endpoints

## Rollback Plan

### Rollback Strategy
- Revert this commit
- Restart services
- Authentication falls back to no-op (returns 200)

### Rollback Verification
- Verify API endpoints still accessible
- Check logs for errors

## References

- Task Packet: tasks/FEAT-123.json
- ADR: /.repo/docs/adr/0015-jwt-authentication.md
- Security Policy: /.repo/policy/SECURITY_BASELINE.md
```

## Required Evidence

Every PR must include:
1. **Three-pass process:** Documented planning, implementation, verification
2. **Test results:** Pass/fail counts and coverage
3. **Quality gates:** Status of all gates
4. **Documentation:** What was updated
5. **Agent log:** Link to structured log
6. **Security impact:** Assessment of security implications
7. **Boundary compliance:** Confirmation boundaries respected

## Customization

This template can be customized:
- Add project-specific sections
- Modify checklist items
- Adjust evidence requirements
- Adapt to team workflow

## References

- PR Review Checklist: /.repo/agents/checklists/pr-review.md
- Agent Rules: /.repo/agents/AGENTS.md
- Quality Gates: /.repo/policy/QUALITY_GATES.md
