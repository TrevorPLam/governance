# Release Manager Role (Human)
<!-- GOVERNANCE_VERSION: 1.0.0 -->
<!-- GOVERNANCE: UPDATEABLE - Layer 2 -->

The release manager is a human role responsible for release processes, deployment, and production operations.

## Role Type
**Human Only** - This role cannot be performed by agents.

## Permitted Capabilities

Release managers have authority over releases and deployments:

### Release Authority
- ✅ update_release_process - Modify CI/CD and deployment
- ✅ Approve production deployments
- ✅ Control release schedule
- ✅ Manage release branches
- ✅ Tag releases

### Deployment Authority
- ✅ Deploy to production
- ✅ Rollback deployments
- ✅ Manage production configuration
- ✅ Control feature flags
- ✅ Approve hotfixes

## Responsibilities

### 1. Release Planning
- Plan release schedule
- Coordinate with teams
- Manage release branches
- Create release notes
- Communicate timeline

### 2. Release Execution
- Review release candidates
- Execute deployment
- Monitor deployment health
- Verify success
- Document release

### 3. Process Management
- Maintain CI/CD pipelines
- Update deployment procedures
- Manage infrastructure as code
- Optimize build processes
- Ensure automation works

### 4. Production Oversight
- Monitor production health
- Respond to incidents
- Execute rollbacks if needed
- Manage configuration changes
- Control feature flags

### 5. Quality Assurance
- Verify all tests passed
- Review quality gates
- Check security scans
- Validate documentation
- Ensure compliance

## Release Checklist

Before releasing, verify:

- [ ] All PRs merged and reviewed
- [ ] All tests passing
- [ ] Quality gates passed
- [ ] Security scans clean
- [ ] Documentation updated
- [ ] Release notes prepared
- [ ] Rollback plan ready
- [ ] Monitoring configured
- [ ] Team notified
- [ ] Stakeholders informed

## Deployment Process

1. **Pre-Deployment:**
   - Review release candidate
   - Check quality gates
   - Verify test coverage
   - Review release notes

2. **Deployment:**
   - Execute deployment procedure
   - Monitor progress
   - Verify success
   - Run smoke tests

3. **Post-Deployment:**
   - Monitor application health
   - Check error rates
   - Verify functionality
   - Document completion

4. **Rollback (if needed):**
   - Detect issues quickly
   - Execute rollback procedure
   - Verify rollback success
   - Investigate root cause

## Incident Response

When incidents occur:

1. **Assess Severity:**
   - Determine impact
   - Check affected users
   - Evaluate urgency

2. **Take Action:**
   - Rollback if necessary
   - Apply hotfix if possible
   - Mitigate damage
   - Restore service

3. **Communicate:**
   - Notify stakeholders
   - Update status page
   - Provide timeline
   - Document resolution

4. **Post-Mortem:**
   - Analyze root cause
   - Document lessons learned
   - Update procedures
   - Prevent recurrence

## CI/CD Ownership

Release managers own:
- Build pipelines
- Test automation
- Deployment scripts
- Infrastructure as code
- Monitoring and alerting
- Feature flag systems

## Escalation

Escalate to leadership when:
- Major production incident
- Security breach detected
- Data loss occurred
- Regulatory compliance issue

## References

- Quality Gates: /.repo/policy/QUALITY_GATES.md
- Security Baseline: /.repo/policy/SECURITY_BASELINE.md
- Incident Checklist: /.repo/agents/checklists/incident.md
- Runbook Template: /.repo/templates/RUNBOOK_TEMPLATE.md
