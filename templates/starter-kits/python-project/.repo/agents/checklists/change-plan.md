# Change Plan Checklist
<!-- GOVERNANCE_VERSION: 1.0.0 -->
<!-- GOVERNANCE: UPDATEABLE - Layer 3 -->

Use this checklist during Pass 1 (Planning) of the three-pass code generation process.

## Planning Phase Checklist

### 1. Understand the Task
- [ ] Read and understand task packet completely
- [ ] Identify objective and success criteria
- [ ] Understand context and background
- [ ] Review constraints and boundaries
- [ ] Note any unknowns or uncertainties

### 2. Review Governance
- [ ] Review relevant policy documents
- [ ] Check CONSTITUTION for applicable articles
- [ ] Review PRINCIPLES for relevant guidance
- [ ] Check BOUNDARIES for layer/module restrictions
- [ ] Review SECURITY_BASELINE for security implications
- [ ] Check QUALITY_GATES for requirements

### 3. Check Dependencies
- [ ] Review manifest for canonical commands
- [ ] Identify any new dependencies needed
- [ ] Check if dependencies require ADR
- [ ] Verify dependency boundaries
- [ ] Check for dependency conflicts

### 4. Architecture Planning
- [ ] Identify which layers will be modified
- [ ] Verify no reverse dependencies will be created
- [ ] Check for cross-feature imports (require ADR)
- [ ] Plan boundary compliance
- [ ] Identify abstraction points

### 5. File Planning
- [ ] List all files to be created (with full paths)
- [ ] List all files to be modified (with full paths)
- [ ] List all files to be deleted (with full paths)
- [ ] Identify configuration files to update
- [ ] Plan test files to create/modify

### 6. Change Strategy
- [ ] Determine change type (feature, fix, refactor, etc.)
- [ ] Plan incremental approach (can it be broken down?)
- [ ] Identify breaking changes
- [ ] Plan backward compatibility
- [ ] Consider rollback strategy

### 7. Testing Strategy
- [ ] Plan unit tests needed
- [ ] Plan integration tests needed
- [ ] Plan E2E tests needed
- [ ] Identify edge cases to test
- [ ] Plan manual testing steps
- [ ] Determine verification profiles to run

### 8. Documentation Planning
- [ ] Identify docs to create/update
- [ ] Plan API documentation updates
- [ ] Plan README updates
- [ ] Plan inline comment updates
- [ ] Determine if ADR is required

### 9. Security Assessment
- [ ] Review security review triggers
- [ ] Identify security implications
- [ ] Plan security testing
- [ ] Determine if HITL required
- [ ] Check for sensitive data handling

### 10. Risk Assessment
- [ ] Identify technical risks
- [ ] Identify security risks
- [ ] Identify performance risks
- [ ] Identify compatibility risks
- [ ] Plan risk mitigation

### 11. UNKNOWN Management
- [ ] List all UNKNOWNs
- [ ] Document why each is unknown
- [ ] Determine resolution path for each
- [ ] Create HITL items if needed
- [ ] Decide if work can proceed or must wait

### 12. ADR Requirements
Check if ADR required for:
- [ ] Adding/changing dependencies
- [ ] Changing API contracts
- [ ] Changing schemas
- [ ] Security-related changes
- [ ] Architectural changes
- [ ] Cross-boundary imports

### 13. Quality Gate Planning
- [ ] Review quality gates to meet
- [ ] Plan how to meet each gate
- [ ] Identify potential gate failures
- [ ] Consider waiver requests if needed
- [ ] Plan evidence collection

### 14. Evidence Planning
- [ ] Plan what evidence to collect
- [ ] Determine where to store logs
- [ ] Plan trace structure
- [ ] Identify metrics to measure
- [ ] Plan screenshot/output capture

### 15. Approval
- [ ] Document complete plan
- [ ] Share with reviewer if required
- [ ] Get approval to proceed
- [ ] Address any feedback
- [ ] Update plan if needed

## Plan Document Structure

The planning output should include:

### Overview
- Task summary
- Objective
- Success criteria

### Scope
- In scope
- Out of scope
- Boundaries

### Architecture
- Layers involved
- Modules modified
- Dependencies

### Files
- Files to create
- Files to modify
- Files to delete

### Changes
- Change type
- Breaking changes
- Compatibility plan

### Testing
- Test strategy
- Verification profiles
- Manual tests

### Documentation
- Docs to update
- ADRs to create

### Security
- Security impact
- HITL requirements

### Risks
- Identified risks
- Mitigation plans

### UNKNOWNs
- What is unknown
- Resolution plan

### Timeline
- Estimated effort
- Dependencies
- Milestones

## Planning Anti-Patterns

Avoid these common planning mistakes:

❌ **Skipping planning** - Never skip Pass 1
❌ **Vague plans** - Be specific with filepaths
❌ **Ignoring UNKNOWNs** - Document all uncertainties
❌ **Skipping governance check** - Always review policies
❌ **No risk assessment** - Always identify risks
❌ **Missing ADR check** - Always verify ADR requirements
❌ **No testing plan** - Always plan verification
❌ **Forgetting documentation** - Always plan doc updates

## Approval Process

Plans must be approved before proceeding to Pass 2 when:
- Security impact is high
- Architecture changes
- Breaking changes
- Multiple modules affected
- High risk identified

## After Planning

Once planning is complete:
1. **Document the plan** in structured format
2. **Get approval** if required
3. **Proceed to Pass 2** (implementation)
4. **Reference plan** during implementation
5. **Update plan** if changes discovered

## References

- Three-Pass Process: /.repo/agents/AGENTS.md
- Policy Documents: /.repo/policy/
- Manifest: /.repo/repo.manifest.yaml
- ADR Template: /.repo/templates/ADR_TEMPLATE.md
