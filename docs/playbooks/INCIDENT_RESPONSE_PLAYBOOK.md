# Incident Response Playbook

**Document Type:** Operational Playbook  
**Audience:** Security Team, DevOps, Engineering Leads  
**Last Updated:** 2026-01-22

---

## Table of Contents

1. [Overview](#overview)
2. [Incident Types](#incident-types)
3. [Security Incidents](#security-incidents)
4. [Policy Violations](#policy-violations)
5. [System Outages](#system-outages)
6. [Escalation Procedures](#escalation-procedures)
7. [Post-Mortem Process](#post-mortem-process)
8. [Prevention and Learning](#prevention-and-learning)

---

## Overview

This playbook defines how to respond to governance-related incidents, including security breaches, policy violations, and system outages. It provides clear procedures to minimize impact and restore normal operations quickly.

### Incident Definition

An **incident** is any event that:
- Compromises security or data integrity
- Violates governance policies
- Disrupts normal development operations
- Requires immediate attention and response

### Response Principles

1. **Safety First**: Protect users, data, and systems
2. **Act Quickly**: Respond immediately to contain damage
3. **Communicate Clearly**: Keep stakeholders informed
4. **Document Everything**: Record all actions and decisions
5. **Learn and Improve**: Conduct post-mortems and prevent recurrence

### Severity Levels

| Severity | Impact | Response Time | Escalation |
|----------|--------|---------------|------------|
| **P0 - Critical** | Production down, data breach, active security threat | Immediate (< 15 min) | All hands, leadership notified |
| **P1 - High** | Major feature broken, significant vulnerability | < 1 hour | Team lead, on-call engineer |
| **P2 - Medium** | Policy violation, partial degradation | < 4 hours | Team lead |
| **P3 - Low** | Minor issue, no immediate impact | < 24 hours | Standard process |

---

## Incident Types

### Type 1: Security Incidents

**Examples:**
- Secret committed to repository
- Vulnerability exploited
- Unauthorized access detected
- Data breach or exposure
- Malicious code introduced

**Response:** See [Security Incidents](#security-incidents)

### Type 2: Policy Violations

**Examples:**
- Governance checks bypassed
- Boundaries violated without ADR
- Unapproved waiver used
- Security baseline ignored
- Mandatory HITL skipped

**Response:** See [Policy Violations](#policy-violations)

### Type 3: System Outages

**Examples:**
- CI/CD pipeline down
- Governance CLI unavailable
- Repository access issues
- Automation failures
- Dependency issues

**Response:** See [System Outages](#system-outages)

### Type 4: Process Failures

**Examples:**
- Agent malfunction
- Bad deployment
- Data corruption
- Build system failure
- Integration breakage

**Response:** Follow standard incident response, adapt as needed

---

## Security Incidents

### Phase 1: Detection and Triage (0-15 minutes)

#### Immediate Actions

1. **Confirm Incident**
   - [ ] Verify incident is real (not false positive)
   - [ ] Assess initial severity (P0/P1/P2/P3)
   - [ ] Note detection time and method

2. **Activate Response Team**
   ```
   Team Lead: [Name]
   Security Lead: [Name]
   On-Call Engineer: [Name]
   DevOps Lead: [Name]
   ```

3. **Create Incident Channel**
   - [ ] Create dedicated Slack/Teams channel
   - [ ] Invite response team
   - [ ] Pin incident details
   - [ ] Start incident log

4. **Initial Communication**
   ```
   SECURITY INCIDENT - P[0/1/2/3]
   
   Time: [Timestamp]
   Type: [Secret exposure/Vulnerability/Access/etc]
   Severity: [P0/P1/P2/P3]
   Status: INVESTIGATING
   Lead: [Name]
   ```

### Phase 2: Containment (15-60 minutes)

#### Secret Exposure Response

If secret committed to repository:

1. **Immediate Containment**
   - [ ] Rotate/revoke exposed secret immediately
   - [ ] Block access using exposed secret
   - [ ] Audit logs for unauthorized access
   - [ ] Identify all systems using secret

2. **Repository Cleanup**
   - [ ] Remove secret from repository history (if possible)
   - [ ] Add secret to `.gitignore`
   - [ ] Update secret scanning rules
   - [ ] Block future commits with secrets

3. **Impact Assessment**
   - [ ] Check logs for secret usage
   - [ ] Identify affected systems
   - [ ] Determine exposure window
   - [ ] List potential data access

**Commands:**
```bash
# Rotate secret immediately
# (Platform-specific: AWS, GitHub, etc.)

# Check git history for secret
git log -S "secret-pattern" --all

# Remove from history (if safe and approved)
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch path/to/secret" \
  --prune-empty --tag-name-filter cat -- --all
```

#### Vulnerability Response

If vulnerability detected/exploited:

1. **Assess Vulnerability**
   - [ ] Identify CVE or vulnerability type
   - [ ] Determine severity (CVSS score)
   - [ ] Check if actively exploited
   - [ ] Identify affected versions

2. **Immediate Mitigation**
   - [ ] Apply patch if available
   - [ ] Implement temporary workaround
   - [ ] Block attack vectors
   - [ ] Monitor for exploitation attempts

3. **Dependency Management**
   ```bash
   # Check for vulnerable dependencies
   npm audit
   pip-audit
   
   # Update vulnerable package
   npm update package-name
   
   # Force immediate verification
   governance verify --profile=security
   ```

#### Unauthorized Access Response

If unauthorized access detected:

1. **Revoke Access**
   - [ ] Disable compromised accounts
   - [ ] Rotate all credentials
   - [ ] Review access logs
   - [ ] Enable MFA if not already

2. **Audit Activity**
   - [ ] Review what was accessed
   - [ ] Check for data exfiltration
   - [ ] Identify entry point
   - [ ] List all actions taken

3. **Secure Environment**
   - [ ] Change all passwords/tokens
   - [ ] Review permission settings
   - [ ] Enable additional monitoring
   - [ ] Update access policies

### Phase 3: Investigation (1-4 hours)

1. **Root Cause Analysis**
   - [ ] How did this happen?
   - [ ] Why wasn't it caught earlier?
   - [ ] What controls failed?
   - [ ] Timeline of events

2. **Impact Assessment**
   - [ ] Data accessed/exposed
   - [ ] Systems affected
   - [ ] Users impacted
   - [ ] Duration of exposure

3. **Document Findings**
   - Create HITL item with details
   - Update incident log
   - Collect evidence
   - Record timeline

### Phase 4: Resolution (2-8 hours)

1. **Implement Fix**
   - [ ] Apply permanent solution
   - [ ] Verify fix effectiveness
   - [ ] Test thoroughly
   - [ ] Deploy to all environments

2. **Verify Security**
   - [ ] Run security scans
   - [ ] Verify no backdoors
   - [ ] Check for persistence
   - [ ] Validate all systems clean

3. **Restore Normal Operations**
   - [ ] Re-enable affected systems
   - [ ] Monitor for issues
   - [ ] Confirm functionality
   - [ ] Update stakeholders

### Phase 5: Communication and Recovery

1. **Internal Communication**
   ```
   SECURITY INCIDENT - RESOLVED
   
   Time Resolved: [Timestamp]
   Duration: [X hours]
   Impact: [Summary]
   Fix: [Brief description]
   Next Steps: [Post-mortem scheduled]
   ```

2. **External Communication** (if required)
   - [ ] Notify affected users
   - [ ] Report to authorities (if legally required)
   - [ ] Update status page
   - [ ] Prepare public statement (if needed)

3. **Post-Incident Actions**
   - [ ] Schedule post-mortem (within 48 hours)
   - [ ] Create remediation tasks
   - [ ] Update security policies
   - [ ] Improve detection

---

## Policy Violations

### Detection

Policy violations may be detected through:
- CI/CD checks failing
- Code review observations
- Automated scanning
- Manual audits
- User reports

### Response Process

#### Step 1: Assessment (0-30 minutes)

1. **Identify Violation**
   - [ ] What policy was violated?
   - [ ] How severe is the violation?
   - [ ] Was it intentional or accidental?
   - [ ] Is system compromised?

2. **Check for Waiver**
   - [ ] Is there approved waiver?
   - [ ] Is waiver still valid?
   - [ ] Was proper process followed?

#### Step 2: Containment (30-60 minutes)

1. **Block Merge** (if in PR)
   ```bash
   # PR remains blocked until:
   # - Violation fixed, OR
   # - Waiver approved
   ```

2. **Revert Change** (if merged)
   ```bash
   # If violation already merged
   git revert <commit-hash>
   git push origin main
   
   # Create HITL item for investigation
   ```

3. **Create HITL Item**
   ```markdown
   # HITL: Policy Violation - [Policy Name]
   
   **Status**: Pending
   **Severity**: [P1/P2/P3]
   **Reporter**: [Name]
   **Date**: [Date]
   
   ## Violation Details
   - Policy: [Policy name]
   - Type: [Boundary/Security/Quality Gate/etc]
   - Location: [File paths]
   - Commit: [Commit hash]
   
   ## Impact
   [Description of impact]
   
   ## Proposed Resolution
   [How to fix]
   ```

#### Step 3: Investigation (1-4 hours)

1. **Root Cause**
   - Why did this happen?
   - How did it bypass checks?
   - Was process followed?
   - What control failed?

2. **Determine Intent**
   - Accidental mistake?
   - Lack of knowledge?
   - Intentional bypass?
   - Tooling failure?

#### Step 4: Resolution

**For Accidental Violations:**
1. **Fix the Violation**
   - Refactor code to comply
   - Update PR with corrections
   - Re-run all checks
   - Document learning

2. **Education**
   - Explain policy to developer
   - Share resources
   - Provide examples
   - Prevent recurrence

**For Intentional Bypasses:**
1. **Immediate Action**
   - Revert changes
   - Escalate to management
   - Review permissions
   - Consider disciplinary action

2. **Process Review**
   - How was bypass possible?
   - Strengthen controls
   - Update documentation
   - Improve monitoring

**For Tooling Failures:**
1. **Fix the Tool**
   - Debug detection issue
   - Update validation logic
   - Test fix thoroughly
   - Deploy update

2. **Manual Review**
   - Review recent PRs
   - Check for similar issues
   - Fix any found violations
   - Update documentation

### Common Policy Violations

#### Boundary Violation Without ADR

**Response:**
```
1. Block PR merge
2. Request ADR creation
3. Review architectural decision
4. Approve with ADR or reject
```

#### Security Review Skipped

**Response:**
```
1. Immediate security review
2. Check for vulnerabilities
3. Create HITL for approval
4. Fix any issues found
```

#### Quality Gate Bypassed

**Response:**
```
1. Revert changes
2. Run full test suite
3. Fix failing tests
4. Re-submit PR
```

---

## System Outages

### CI/CD Pipeline Failure

#### Detection
- Builds failing for all PRs
- Workflows not starting
- Actions timing out
- Deployment blocked

#### Response

1. **Check Status** (0-5 min)
   ```bash
   # Check GitHub Actions status
   gh api /repos/{owner}/{repo}/actions/runs
   
   # Check GitLab CI status
   gitlab-runner verify
   ```

2. **Identify Issue** (5-15 min)
   - [ ] Platform issue (GitHub/GitLab down)?
   - [ ] Configuration error?
   - [ ] Resource exhaustion?
   - [ ] Dependency failure?

3. **Temporary Mitigation** (15-30 min)
   - [ ] Use alternate CI if available
   - [ ] Manual verification process
   - [ ] Skip non-critical checks (with approval)
   - [ ] Communicate to team

4. **Permanent Fix** (30 min - 4 hours)
   - [ ] Fix configuration
   - [ ] Update dependencies
   - [ ] Scale resources
   - [ ] Test thoroughly

### Governance CLI Issues

#### Response

1. **Verify Issue** (0-5 min)
   ```bash
   # Test CLI
   governance --version
   governance validate
   
   # Check for updates
   governance check-updates
   ```

2. **Workaround** (5-15 min)
   - Use previous version
   - Manual validation
   - Bypass CLI temporarily (with HITL approval)

3. **Fix** (varies)
   - Report bug
   - Apply patch
   - Update to fixed version
   - Document workaround

---

## Escalation Procedures

### When to Escalate

**Immediate Escalation (P0):**
- Active security breach
- Data exposure
- Production completely down
- Legal/compliance issue

**Rapid Escalation (P1):**
- Major vulnerability
- Significant policy violation
- Critical feature broken
- Repeated failures

**Standard Escalation (P2/P3):**
- Minor issues
- Process improvements
- Enhancement requests

### Escalation Path

```
Developer/Engineer
        │
        ▼
   Team Lead
        │
        ▼
Engineering Manager
        │
        ▼
Director/VP Engineering
        │
        ▼
  CTO/Executive Team
```

### Escalation Process

1. **Notify Next Level**
   - Clear subject line
   - Severity indicated
   - Brief summary
   - Actions taken
   - Help needed

2. **Provide Context**
   - Timeline
   - Impact
   - Current status
   - Recommended action

3. **Follow Up**
   - Regular updates
   - Status changes
   - Resolution confirmation

---

## Post-Mortem Process

### When to Conduct Post-Mortem

**Required:**
- All P0 incidents
- All P1 incidents
- Security incidents
- Policy violations (P1/P2)

**Optional:**
- P2 incidents (team decision)
- P3 incidents (if valuable learning)

### Post-Mortem Timeline

- **Schedule**: Within 48 hours of resolution
- **Duration**: 60-90 minutes
- **Participants**: Response team + stakeholders
- **Facilitator**: Team lead or incident commander

### Post-Mortem Structure

#### 1. Introduction (5 min)

- Incident summary
- Timeline overview
- Participants introduction
- Ground rules (blameless)

#### 2. Timeline Review (15 min)

- Detection
- Response
- Investigation
- Resolution
- Communication

#### 3. What Went Well (10 min)

- Quick detection
- Effective response
- Good communication
- Proper procedures followed

#### 4. What Went Wrong (15 min)

- Delayed detection
- Incomplete response
- Poor communication
- Process gaps

#### 5. Root Cause Analysis (15 min)

- Why did this happen?
- Why wasn't it prevented?
- Why wasn't it detected sooner?
- Contributing factors

#### 6. Action Items (15 min)

- Immediate fixes
- Long-term improvements
- Process changes
- Training needs
- Monitoring enhancements

#### 7. Follow-Up (5 min)

- Action item ownership
- Timelines
- Next review date

### Post-Mortem Document Template

```markdown
# Post-Mortem: [Incident Name]

**Date**: [Date]
**Incident ID**: [ID]
**Severity**: [P0/P1/P2/P3]
**Duration**: [Duration]
**Impact**: [Impact summary]

## Executive Summary
[2-3 sentence summary for leadership]

## Timeline
- [Time]: Incident began
- [Time]: Detected
- [Time]: Response started
- [Time]: Contained
- [Time]: Resolved

## Root Cause
[Detailed explanation]

## Impact
- Users affected: [Number]
- Systems affected: [List]
- Data exposed: [Yes/No/Details]
- Duration: [Hours]

## Response Evaluation

### What Went Well
- [Item 1]
- [Item 2]

### What Went Wrong
- [Item 1]
- [Item 2]

## Action Items
- [ ] [Action 1] - Owner: [Name] - Due: [Date]
- [ ] [Action 2] - Owner: [Name] - Due: [Date]

## Lessons Learned
[Key takeaways]

## Prevention
[How to prevent similar incidents]
```

---

## Prevention and Learning

### Continuous Improvement

1. **Review Incidents Monthly**
   - Analyze trends
   - Identify patterns
   - Update procedures
   - Share learnings

2. **Update Documentation**
   - Refine playbooks
   - Add new scenarios
   - Improve clarity
   - Update contacts

3. **Training and Drills**
   - Quarterly incident drills
   - Tabletop exercises
   - New team member training
   - Process walkthroughs

4. **Automation**
   - Improve detection
   - Faster response
   - Reduce manual work
   - Better monitoring

### Monitoring and Alerts

**Set up alerts for:**
- Security scan failures
- Secret detection
- Policy violations
- CI/CD failures
- Unusual activity
- Quality gate bypasses

### Knowledge Base

- Document all incidents
- Share post-mortems
- Create runbooks
- Update FAQs
- Build playbook library

---

## Quick Reference

### Emergency Contacts

```
Security Team: [Email/Slack]
DevOps On-Call: [Phone]
Engineering Manager: [Phone]
Director Engineering: [Phone]
Legal/Compliance: [Email]
```

### Critical Commands

```bash
# Emergency secret rotation
[Platform-specific commands]

# Revert dangerous commit
git revert <commit-hash>
git push --force-with-lease

# Emergency governance validation
governance verify --profile=security --verbose

# Check for secrets in history
git log -S "secret-pattern" --all

# Audit recent changes
git log --since="1 day ago" --all --oneline
```

### Incident Severity Guide

| Severity | Response | Examples |
|----------|----------|----------|
| P0 | Immediate, all hands | Production down, active breach |
| P1 | < 1 hour, team lead | Major vulnerability, critical feature broken |
| P2 | < 4 hours, assigned | Policy violation, partial outage |
| P3 | < 24 hours, standard | Minor issue, no immediate impact |

---

**Version:** 1.0.0  
**Last Updated:** 2026-01-22  
**Maintainer:** TrevorPLam/governance
