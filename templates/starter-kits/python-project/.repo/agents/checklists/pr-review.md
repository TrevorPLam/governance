# Pull Request Review Checklist
<!-- GOVERNANCE_VERSION: 1.0.0 -->
<!-- GOVERNANCE: UPDATEABLE - Layer 3 -->

Use this checklist when reviewing agent-generated pull requests.

## PR Review Checklist

### 1. Basic Information
- [ ] PR title is clear and descriptive
- [ ] PR description is complete
- [ ] Task reference is included
- [ ] Priority is indicated
- [ ] All required sections present

### 2. Three-Pass Process
- [ ] Pass 1 (Plan) is documented
- [ ] Pass 2 (Change) is documented
- [ ] Pass 3 (Verify) is documented
- [ ] Process was followed in order
- [ ] Each pass has evidence

### 3. Files and Changes
- [ ] All files modified are listed with full paths
- [ ] Changes are explained with reasons
- [ ] No unexpected files modified
- [ ] No unrelated changes included
- [ ] Change size is reasonable

### 4. Tests
- [ ] All tests pass
- [ ] Unit tests added/updated
- [ ] Integration tests added if needed
- [ ] E2E tests added if needed
- [ ] Coverage meets threshold (>80%)
- [ ] Edge cases are tested
- [ ] No tests were disabled/removed without justification

### 5. Quality Gates
- [ ] Linting passed
- [ ] Type checking passed
- [ ] Security scan passed
- [ ] Build successful
- [ ] Coverage threshold met
- [ ] Performance acceptable
- [ ] All gates passed OR waiver granted

### 6. Documentation
- [ ] API documentation updated
- [ ] README updated if needed
- [ ] Inline comments adequate
- [ ] User guide updated if needed
- [ ] Examples updated if needed
- [ ] Documentation matches implementation

### 7. ADRs
- [ ] ADR created for dependencies (if added)
- [ ] ADR created for API changes (if applicable)
- [ ] ADR created for schema changes (if applicable)
- [ ] ADR created for security changes (if applicable)
- [ ] ADR created for architecture changes (if applicable)
- [ ] ADR created for cross-boundary imports (if applicable)
- [ ] OR confirmed no ADR required

### 8. Boundaries
- [ ] No reverse dependencies introduced
- [ ] Layer model followed: ui → domain → data → platform
- [ ] No cross-feature imports without ADR
- [ ] Module boundaries respected
- [ ] Folder structure followed

### 9. Principles Compliance
Review against key principles:
- [ ] P3: No guessing (UNKNOWNs handled properly)
- [ ] P4: Filepaths used everywhere
- [ ] P6: Behavior over novelty (follows existing patterns)
- [ ] P8: Examples are contracts (if examples updated, they work)
- [ ] P10: Testing required (tests are comprehensive)
- [ ] P15: Consistency beats novelty (doesn't introduce new patterns unnecessarily)
- [ ] P17: Humans decide edge cases (HITL used appropriately)
- [ ] P23: Logs = evidence (logs are complete)

### 10. Security Review
- [ ] Security impact assessed
- [ ] Security review triggers checked
- [ ] HITL completed if required
- [ ] No secrets in code
- [ ] No sensitive data logged
- [ ] Security patterns followed
- [ ] Forbidden patterns avoided
- [ ] Input validation present
- [ ] Output sanitization present

### 11. Dependencies
- [ ] No new dependencies OR justified with ADR
- [ ] Dependency versions specified
- [ ] Dependencies within approved boundaries
- [ ] No security vulnerabilities in dependencies
- [ ] License compatibility verified

### 12. Performance
- [ ] No obvious performance issues
- [ ] Efficient algorithms used
- [ ] No N+1 queries
- [ ] Caching used appropriately
- [ ] Resource cleanup present

### 13. Error Handling
- [ ] Errors are caught appropriately
- [ ] Error messages are clear
- [ ] Errors are logged
- [ ] Recovery paths exist
- [ ] User-facing errors are helpful

### 14. Configuration
- [ ] Configuration changes documented
- [ ] Environment variables listed
- [ ] Default values provided
- [ ] Configuration validated
- [ ] Migration path provided

### 15. UNKNOWNs
- [ ] All UNKNOWNs identified
- [ ] HITL items created for UNKNOWNs
- [ ] UNKNOWNs resolved before proceeding
- [ ] OR confirmed no UNKNOWNs

### 16. Waivers
- [ ] Waiver requests justified
- [ ] Remediation plan provided
- [ ] Expiration date set
- [ ] Scope is limited
- [ ] Risk is acceptable
- [ ] OR confirmed no waivers needed

### 17. Agent Log
- [ ] Agent log is present
- [ ] Log follows template
- [ ] Intent is clear
- [ ] Actions are documented
- [ ] Evidence is included
- [ ] Decisions are explained
- [ ] Risks are noted

### 18. Agent Trace
- [ ] Trace follows schema
- [ ] Files list is complete
- [ ] Commands list is complete
- [ ] Evidence is linked
- [ ] HITL items documented
- [ ] UNKNOWNs documented

### 19. Rollback Plan
- [ ] Rollback strategy documented
- [ ] Rollback steps are clear
- [ ] Rollback can be verified
- [ ] Breaking changes have migration path

### 20. Manual Verification
- [ ] Manually tested key scenarios
- [ ] Verified no regressions
- [ ] Checked error cases
- [ ] Tested edge cases
- [ ] Verified documentation accuracy

## Review Decision

After completing checklist:

### ✅ APPROVE if:
- All required items checked
- Quality standards met
- No blocking issues
- Ready to merge

### 🔄 REQUEST CHANGES if:
- Required items missing
- Quality issues found
- Documentation incomplete
- Tests insufficient
- Security concerns

### ❌ REJECT if:
- Critical issues present
- Security vulnerabilities
- Boundaries violated
- Governance violated
- Fundamentally wrong approach

## Review Comments

Provide feedback on:

### What Went Well
- Acknowledge good practices
- Highlight excellent work
- Note improvements

### What Needs Improvement
- Specific issues found
- Actionable feedback
- Link to policies/principles

### Security Concerns
- Any security issues
- Mitigation suggestions
- Required changes

### Questions
- Clarifications needed
- Alternative approaches
- Trade-off discussions

## Follow-Up Actions

After review:
- [ ] Update waiver tracking if applicable
- [ ] Update HITL log if applicable
- [ ] Archive agent logs
- [ ] Document lessons learned
- [ ] Update policies if patterns emerge

## Review Anti-Patterns

Avoid these review mistakes:

❌ **Rubber stamping** - Actually review, don't just approve
❌ **Nitpicking style** - Focus on substance, not style
❌ **Missing security** - Always check security implications
❌ **Ignoring tests** - Tests are as important as code
❌ **Skipping documentation** - Verify docs are updated
❌ **Forgetting principles** - Check principles compliance
❌ **No feedback** - Provide constructive feedback

## References

- PR Template: /.repo/agents/prompts/pr_template.md
- Agent Rules: /.repo/agents/AGENTS.md
- Quality Gates: /.repo/policy/QUALITY_GATES.md
- Security Baseline: /.repo/policy/SECURITY_BASELINE.md
- Principles: /.repo/policy/PRINCIPLES.md
