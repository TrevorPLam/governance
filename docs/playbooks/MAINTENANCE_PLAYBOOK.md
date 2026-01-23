# Maintenance Playbook

**Document Type:** Operational Playbook  
**Audience:** DevOps, Team Leads, Engineering Managers  
**Last Updated:** 2026-01-22

---

## Table of Contents

1. [Overview](#overview)
2. [Regular Maintenance Tasks](#regular-maintenance-tasks)
3. [Policy Updates](#policy-updates)
4. [Tool Updates](#tool-updates)
5. [Waiver Reviews](#waiver-reviews)
6. [Archive Procedures](#archive-procedures)
7. [Performance Optimization](#performance-optimization)
8. [Health Checks](#health-checks)

---

## Overview

This playbook defines regular maintenance activities to keep the governance system running smoothly, policies current, and technical debt under control. Regular maintenance prevents issues and ensures the governance framework remains effective.

### Maintenance Philosophy

1. **Preventive Over Reactive**: Regular maintenance prevents issues
2. **Scheduled and Predictable**: Maintenance happens on regular schedule
3. **Documented and Tracked**: All maintenance activities logged
4. **Minimal Disruption**: Maintenance doesn't block development
5. **Continuous Improvement**: Learn and optimize over time

### Maintenance Schedule

| Frequency | Tasks | Duration | Owner |
|-----------|-------|----------|-------|
| **Daily** | Quick health checks, waiver expiration alerts | 5-10 min | DevOps/Automated |
| **Weekly** | Waiver review, dependency updates, metric review | 30-60 min | Team Lead |
| **Monthly** | Policy review, tool updates, performance analysis | 2-3 hours | Engineering Manager |
| **Quarterly** | Major updates, training, comprehensive audit | 1 day | Leadership Team |
| **Annually** | Strategic review, major version upgrades | 2-3 days | Executive Team |

---

## Regular Maintenance Tasks

### Daily Maintenance

#### Morning Health Check (5 minutes)

**Automated (via script):**
```bash
#!/bin/bash
# daily-health-check.sh

echo "🔍 Daily Governance Health Check"
echo "================================"

# Check CLI is working
governance --version || echo "❌ CLI issue detected"

# Check for expiring waivers (within 7 days)
find .repo/waivers -name "*.md" -mtime -7 | while read file; do
  echo "⚠️ Waiver expiring soon: $file"
done

# Check CI/CD status
gh api /repos/{owner}/{repo}/actions/runs --jq '.workflow_runs[0] | {status, conclusion}' || echo "❌ CI/CD check failed"

# Check for secrets in recent commits
git log --since="1 day ago" -S "password\|secret\|token\|key" --all && echo "⚠️ Potential secret detected"

echo "✅ Daily health check complete"
```

**Manual Review:**
- [ ] Review overnight CI/CD failures
- [ ] Check for security alerts
- [ ] Review pending HITL items
- [ ] Monitor team chat for issues

**Output:** Brief status report in team channel

---

### Weekly Maintenance

#### Monday: Weekly Planning (30 minutes)

1. **Review Last Week**
   - [ ] Incidents and resolutions
   - [ ] Policy violations
   - [ ] Waiver usage
   - [ ] Quality metrics

2. **Plan This Week**
   - [ ] Scheduled updates
   - [ ] Policy reviews needed
   - [ ] Training sessions
   - [ ] Maintenance windows

3. **Check Metrics**
   ```bash
   # Generate weekly metrics
   governance report --period=week --format=summary
   
   # Key metrics:
   # - PR pass rate
   # - Average review time
   # - Waiver count
   # - HITL resolution time
   # - CI/CD success rate
   ```

#### Wednesday: Mid-Week Check (15 minutes)

- [ ] Review waiver expirations
- [ ] Check HITL backlog
- [ ] Monitor CI/CD performance
- [ ] Address urgent issues

#### Friday: Weekly Cleanup (60 minutes)

1. **Waiver Management** (20 min)
   ```bash
   # List active waivers
   find .repo/waivers/active -name "*.md"
   
   # Check expirations
   grep -r "Expiration:" .repo/waivers/active
   
   # Archive expired waivers
   ./scripts/archive-expired-waivers.sh
   ```

2. **HITL Review** (20 min)
   - [ ] Review pending HITL items
   - [ ] Follow up on stale items
   - [ ] Close resolved items
   - [ ] Archive completed items

3. **Dependency Updates** (20 min)
   ```bash
   # Check for updates
   npm outdated
   pip list --outdated
   
   # Update non-breaking updates
   npm update
   pip install --upgrade -r requirements.txt
   
   # Test after updates
   governance verify --profile=ci
   ```

4. **Weekly Report**
   - PR statistics
   - Quality metrics
   - Issue summary
   - Next week preview

---

### Monthly Maintenance

#### First Monday: Monthly Review (2-3 hours)

##### 1. Policy Review (45 min)

**Check Each Policy File:**

```bash
# List all policy files
ls -la .repo/policy/

# For each policy:
# - CONSTITUTION.md
# - PRINCIPLES.md
# - QUALITY_GATES.md
# - SECURITY_BASELINE.md
# - BOUNDARIES.md
# - HITL.md
# - WAIVERS.md
```

**Review Questions:**
- [ ] Is policy still relevant?
- [ ] Are examples up to date?
- [ ] Are thresholds appropriate?
- [ ] Are new rules needed?
- [ ] Are old rules obsolete?

**Update Process:**
1. Propose changes in ADR
2. Discuss with team
3. Get approval
4. Update policy files
5. Communicate changes
6. Update training materials

##### 2. Tool Updates (30 min)

**Governance CLI:**
```bash
# Check current version
governance --version

# Check for updates
governance check-updates

# Review changelog
npm view @trevorplam/governance-cli

# Plan update
# - Breaking changes?
# - New features?
# - Migration required?

# Update (in test environment first)
npm update -g @trevorplam/governance-cli

# Test thoroughly
governance init --help
governance validate
governance verify --profile=quick
```

**CI/CD Workflows:**
```bash
# Review workflow files
ls -la .github/workflows/

# Check for updates to actions
# - actions/checkout
# - actions/setup-node
# - Custom governance actions

# Update action versions
# Edit .github/workflows/*.yml
# Update version tags
# Test in feature branch
```

##### 3. Metrics Analysis (45 min)

**Generate Monthly Report:**
```bash
# PR statistics
gh pr list --state=all --json number,state,createdAt,closedAt \
  --jq 'length' # Total PRs

# Quality metrics
# - Average PR cycle time
# - Test coverage trends
# - CI/CD success rate
# - Waiver frequency
# - HITL resolution time

# Security metrics
# - Vulnerability detections
# - Secret scanning hits
# - Security reviews conducted
```

**Analyze Trends:**
- [ ] Is PR cycle time increasing?
- [ ] Is quality improving?
- [ ] Are waivers increasing?
- [ ] Are same issues recurring?
- [ ] Is team following process?

**Action Items:**
- Identify improvement opportunities
- Create tasks for issues
- Update processes if needed
- Schedule training if needed

##### 4. Waiver Audit (30 min)

**Review All Waivers:**
```bash
# List all active waivers
find .repo/waivers/active -name "*.md"

# For each waiver, check:
# - Is it still needed?
# - Has remediation started?
# - Is expiration appropriate?
# - Should it be renewed or closed?
```

**Waiver Analysis:**
- [ ] Total active waivers
- [ ] Most common waiver types
- [ ] Average waiver duration
- [ ] Remediation completion rate
- [ ] Waiver abuse indicators

**Actions:**
- Close unnecessary waivers
- Extend justified waivers
- Create remediation tasks
- Update waiver policy if needed

---

### Quarterly Maintenance

#### Comprehensive Governance Audit (1 day)

##### Morning Session (4 hours)

**1. Documentation Review** (90 min)
- [ ] All documentation current?
- [ ] Links working?
- [ ] Examples accurate?
- [ ] New topics needed?
- [ ] Outdated content removed?

**2. Policy Effectiveness** (90 min)
- [ ] Policies achieving goals?
- [ ] Violations decreasing?
- [ ] Team understanding policies?
- [ ] Policies too strict/loose?
- [ ] New policies needed?

**3. Tool Performance** (60 min)
- [ ] CLI performance acceptable?
- [ ] CI/CD pipelines fast enough?
- [ ] Automation working correctly?
- [ ] False positives/negatives?
- [ ] Tools need upgrades?

##### Afternoon Session (4 hours)

**4. Team Feedback** (90 min)
- [ ] Survey team satisfaction
- [ ] Collect improvement ideas
- [ ] Identify pain points
- [ ] Gather success stories
- [ ] Discuss challenges

**5. Training Assessment** (60 min)
- [ ] Is team well-trained?
- [ ] Knowledge gaps?
- [ ] Onboarding effective?
- [ ] Refresher training needed?
- [ ] New training topics?

**6. Strategic Planning** (90 min)
- [ ] Review goals and progress
- [ ] Plan next quarter
- [ ] Budget for improvements
- [ ] Schedule major updates
- [ ] Set new objectives

---

### Annual Maintenance

#### Year-End Comprehensive Review (2-3 days)

##### Day 1: Assessment

**Morning:**
- Year-in-review presentation
- Metrics and trends analysis
- Success and failures review
- Team retrospective

**Afternoon:**
- Policy comprehensive review
- Tool stack evaluation
- Process assessment
- Compliance check

##### Day 2: Planning

**Morning:**
- Strategic planning session
- Goals for next year
- Budget allocation
- Resource planning

**Afternoon:**
- Roadmap development
- Training plan
- Tool upgrade plan
- Process improvements

##### Day 3: Implementation Prep

**Morning:**
- Update all documentation
- Plan major upgrades
- Schedule training
- Communicate changes

**Afternoon:**
- Create action plan
- Assign ownership
- Set timelines
- Finalize budget

---

## Policy Updates

### When to Update Policies

**Required Updates:**
- Regulatory changes
- Security threats
- Major incidents
- Technology changes
- Organizational changes

**Suggested Updates:**
- Recurring violations
- Team feedback
- Better practices found
- Tool capabilities changed
- Industry standards evolved

### Update Process

#### Step 1: Proposal (1-2 days)

1. **Create ADR**
   ```markdown
   # ADR-XXXX: Update [Policy Name]
   
   ## Context
   [Why update is needed]
   
   ## Decision
   [What will change]
   
   ## Consequences
   [Impact of change]
   
   ## Alternatives Considered
   [Other options]
   ```

2. **Draft Changes**
   - Edit policy in feature branch
   - Update examples
   - Update related documentation
   - Create migration guide if needed

3. **Get Feedback**
   - Share draft with team
   - Discuss in team meeting
   - Collect comments
   - Refine based on feedback

#### Step 2: Approval (3-5 days)

1. **Create PR**
   - Include ADR
   - Include policy changes
   - Include migration guide
   - Include training plan

2. **Review Process**
   - Team lead review
   - Security review (if relevant)
   - Affected teams review
   - Final approval

3. **Communication Plan**
   - Announcement email
   - Team meeting
   - Documentation update
   - Training session

#### Step 3: Implementation (1 week)

1. **Deploy Changes**
   ```bash
   # Update policy files
   git checkout main
   git pull
   git merge feature/policy-update
   git push
   
   # Run update command in all repos
   governance update
   ```

2. **Training**
   - Hold training session
   - Update onboarding materials
   - Create quick reference
   - Answer questions

3. **Monitor Adoption**
   - Track understanding
   - Help with transition
   - Fix issues quickly
   - Collect feedback

---

## Tool Updates

### Governance CLI Updates

#### Pre-Update Checklist

- [ ] Review changelog
- [ ] Check breaking changes
- [ ] Test in sandbox environment
- [ ] Plan rollback if needed
- [ ] Schedule maintenance window
- [ ] Communicate to team

#### Update Process

**Test Environment:**
```bash
# Create test repository
mkdir -p /tmp/governance-test
cd /tmp/governance-test

# Install new version
npm install -g @trevorplam/governance-cli@next

# Test all commands
governance init
governance validate
governance verify --profile=ci
governance check-updates
governance update --dry-run

# Check backward compatibility
# Test with existing manifests
```

**Production Rollout:**
```bash
# Update globally
npm update -g @trevorplam/governance-cli

# Or update in each repository
cd /path/to/repo
npm update --save-dev @trevorplam/governance-cli

# Verify version
governance --version

# Test in each repo
governance validate
```

**Post-Update:**
- [ ] Verify all repos working
- [ ] Monitor for issues
- [ ] Help team with problems
- [ ] Document any changes
- [ ] Update documentation

### CI/CD Workflow Updates

**Update GitHub Actions:**
```yaml
# .github/workflows/governance.yml
- name: Update governance action
  uses: TrevorPLam/governance-action@v2  # Update version
```

**Test Workflow:**
1. Update in feature branch
2. Test with sample PR
3. Verify all checks pass
4. Merge to main

---

## Waiver Reviews

### Weekly Waiver Check

**Check Expirations:**
```bash
# Find waivers expiring in next 7 days
find .repo/waivers/active -name "*.md" -exec grep -l "Expiration: $(date -d '+7 days' +%Y-%m-%d)" {} \;
```

**For Each Expiring Waiver:**
1. **Review Status**
   - Is remediation complete?
   - Is issue resolved?
   - Is extension needed?

2. **Take Action**
   - Close if resolved
   - Extend if needed (with approval)
   - Create follow-up task
   - Archive if expired

### Monthly Waiver Audit

**Generate Waiver Report:**
```bash
# Waiver statistics
echo "Active Waivers: $(find .repo/waivers/active -name '*.md' | wc -l)"
echo "Expired (unarchived): $(grep -r 'Status: expired' .repo/waivers/active | wc -l)"
echo "Near expiration: $(find .repo/waivers/active -name '*.md' -mtime -7 | wc -l)"

# By type
grep -r "Type:" .repo/waivers/active | cut -d: -f3 | sort | uniq -c

# By owner
grep -r "Owner:" .repo/waivers/active | cut -d: -f3 | sort | uniq -c
```

**Analysis:**
- Are waivers increasing?
- Same issues recurring?
- Are waivers being resolved?
- Are policies too strict?
- Is waiver abuse occurring?

**Actions:**
- Follow up on stale waivers
- Review policies if needed
- Training if misunderstood
- Enforcement if abused

---

## Archive Procedures

### What to Archive

**Archive Regularly:**
- Expired waivers
- Completed HITL items
- Old agent logs (>90 days)
- Resolved incidents
- Outdated ADRs

**Keep Forever:**
- Current policies
- Active waivers
- Active HITL items
- Recent logs (<90 days)
- Current ADRs

### Archive Process

**Monthly Archive:**
```bash
#!/bin/bash
# monthly-archive.sh

DATE=$(date +%Y-%m)

# Archive expired waivers
mkdir -p .repo/archive/waivers/$DATE
find .repo/waivers/active -name "*.md" -exec grep -l "Status: expired" {} \; | \
  xargs -I {} mv {} .repo/archive/waivers/$DATE/

# Archive old logs
mkdir -p .repo/archive/logs/$DATE
find .repo/archive/logs -name "*.md" -mtime +90 -exec mv {} .repo/archive/logs/$DATE/ \;

# Archive completed HITL items
mkdir -p .repo/archive/hitl/$DATE
find .repo/hitl -name "*.md" -exec grep -l "Status: resolved" {} \; | \
  xargs -I {} mv {} .repo/archive/hitl/$DATE/

# Commit archives
git add .repo/archive
git commit -m "Archive: Monthly cleanup $DATE"
git push
```

### Storage Management

**Monitor Size:**
```bash
# Check .repo size
du -sh .repo

# Check archive size
du -sh .repo/archive

# If too large, consider:
# - Compressing old archives
# - Moving to external storage
# - Deleting very old archives (with approval)
```

---

## Performance Optimization

### Monthly Performance Review

**Measure Performance:**
```bash
# CLI performance
time governance validate
time governance verify --profile=quick
time governance verify --profile=ci

# CI/CD performance
# Check average build time
# Check queue time
# Check failure rate
```

**Optimize If Needed:**

1. **CLI Optimization**
   - Cache manifest reading
   - Parallelize checks
   - Skip unchanged files
   - Optimize validation logic

2. **CI/CD Optimization**
   - Cache dependencies
   - Parallelize jobs
   - Skip redundant checks
   - Optimize test selection

3. **Repository Optimization**
   - Clean up old branches
   - Prune git history (carefully)
   - Optimize .gitignore
   - Remove unused files

---

## Health Checks

### System Health Indicators

**Green (Healthy):**
- PR pass rate >80%
- CI/CD uptime >99%
- Average review time <2 hours
- Waiver rate <5%
- HITL resolution <24 hours

**Yellow (Warning):**
- PR pass rate 60-80%
- CI/CD uptime 95-99%
- Average review time 2-4 hours
- Waiver rate 5-10%
- HITL resolution 24-48 hours

**Red (Critical):**
- PR pass rate <60%
- CI/CD uptime <95%
- Average review time >4 hours
- Waiver rate >10%
- HITL resolution >48 hours

### Health Check Script

```bash
#!/bin/bash
# health-check.sh

echo "🏥 Governance System Health Check"
echo "=================================="

# Check CLI
governance --version >/dev/null 2>&1 && echo "✅ CLI: OK" || echo "❌ CLI: FAIL"

# Check policies
[ -f .repo/policy/CONSTITUTION.md ] && echo "✅ Policies: OK" || echo "❌ Policies: MISSING"

# Check manifest
governance validate >/dev/null 2>&1 && echo "✅ Manifest: OK" || echo "❌ Manifest: INVALID"

# Check CI/CD
gh api /repos/{owner}/{repo}/actions/runs --jq '.workflow_runs[0].conclusion' | \
  grep -q "success" && echo "✅ CI/CD: OK" || echo "⚠️ CI/CD: CHECK NEEDED"

# Check waivers
WAIVER_COUNT=$(find .repo/waivers/active -name "*.md" | wc -l)
[ $WAIVER_COUNT -lt 10 ] && echo "✅ Waivers: $WAIVER_COUNT (OK)" || echo "⚠️ Waivers: $WAIVER_COUNT (HIGH)"

echo "=================================="
echo "Health check complete"
```

---

## Maintenance Calendar

### Example Maintenance Schedule

**Week 1:**
- Monday: Weekly planning
- Wednesday: Mid-week check
- Friday: Weekly cleanup

**Week 2:**
- Monday: Weekly planning + Monthly review
- Wednesday: Policy review
- Friday: Weekly cleanup + Tool updates

**Week 3:**
- Monday: Weekly planning
- Wednesday: Mid-week check
- Friday: Weekly cleanup

**Week 4:**
- Monday: Weekly planning + Waiver audit
- Wednesday: Mid-week check
- Friday: Weekly cleanup + Month-end report

**Quarter End (Week 13):**
- Full-day comprehensive audit
- Strategic planning
- Training sessions

**Year End:**
- 3-day comprehensive review
- Annual planning
- Major updates

---

## Quick Reference

### Daily Commands

```bash
# Health check
governance validate

# Check for issues
git log --since="1 day ago" --oneline

# Check CI/CD
gh run list --limit 10
```

### Weekly Commands

```bash
# Archive expired waivers
./scripts/archive-expired-waivers.sh

# Update dependencies
npm update && governance verify

# Generate report
governance report --period=week
```

### Monthly Commands

```bash
# Check for tool updates
governance check-updates
npm outdated

# Review policies
ls .repo/policy/

# Analyze metrics
governance report --period=month --format=detailed
```

---

**Version:** 1.0.0  
**Last Updated:** 2026-01-22  
**Maintainer:** TrevorPLam/governance
