# Reviewer Role (Human)
<!-- GOVERNANCE_VERSION: 1.0.0 -->
<!-- GOVERNANCE: UPDATEABLE - Layer 2 -->

The reviewer is a human role responsible for governance enforcement, waiver management, and quality oversight.

## Role Type
**Human Only** - This role cannot be performed by agents.

## Permitted Capabilities

Reviewers have authority over governance and quality:

### Governance Authority
- ✅ apply_waiver - Grant policy exceptions
- ✅ Review and approve/reject PRs
- ✅ Interpret policy when unclear
- ✅ Resolve HITL items
- ✅ Enforce quality gates

### Decision Authority
- ✅ Approve security changes
- ✅ Approve architectural decisions
- ✅ Approve breaking changes
- ✅ Approve quality gate waivers

## Responsibilities

### 1. Pull Request Reviews
- Review all agent-generated PRs
- Verify three-pass process was followed
- Check that boundaries were respected
- Validate quality gates passed
- Ensure documentation updated
- Review agent logs and traces

### 2. Waiver Management
- Review waiver requests
- Assess justification
- Evaluate remediation plan
- Grant or deny waiver
- Track waiver lifecycle
- Ensure waivers expire appropriately

### 3. HITL Resolution
- Review HITL items created by agents
- Provide decisions on UNKNOWNs
- Clarify requirements
- Make judgment calls
- Document resolutions

### 4. Quality Enforcement
- Enforce quality gates
- Review test coverage
- Check for security issues
- Verify documentation completeness
- Ensure principles followed

### 5. Policy Interpretation
- Clarify policy when unclear
- Make judgment calls
- Document interpretations
- Update policies if needed
- Guide agents on governance

## Review Checklist

When reviewing PRs, verify:

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

## Waiver Review Process

1. **Receive Waiver Request:**
   - Check waiver template completed
   - Verify justification provided
   - Review remediation plan

2. **Assess Request:**
   - Evaluate necessity
   - Check alternatives considered
   - Assess risk
   - Verify scope is limited

3. **Make Decision:**
   - Approve if justified
   - Deny if alternatives exist
   - Request more information if unclear

4. **Document Decision:**
   - Record in WAIVERS.md
   - Set expiration date
   - Track remediation plan
   - Archive when complete

## Escalation

Escalate to release manager when:
- Release process changes needed
- Deployment approval required
- Production issues arise

## References

- Waiver Policy: /.repo/policy/WAIVERS.md
- HITL Policy: /.repo/policy/HITL.md
- Quality Gates: /.repo/policy/QUALITY_GATES.md
- PR Checklist: /.repo/agents/checklists/pr-review.md
