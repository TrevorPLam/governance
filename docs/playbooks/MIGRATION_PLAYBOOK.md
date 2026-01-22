# Migration Playbook

**Document Type:** Operational Playbook  
**Audience:** DevOps, Engineering Leads, Migration Teams  
**Last Updated:** 2026-01-22

---

## Table of Contents

1. [Overview](#overview)
2. [Migration from Legacy Systems](#migration-from-legacy-systems)
3. [Version Upgrades](#version-upgrades)
4. [Policy Changes](#policy-changes)
5. [Rollback Procedures](#rollback-procedures)
6. [Testing Migration](#testing-migration)
7. [Post-Migration Validation](#post-migration-validation)

---

## Overview

This playbook guides teams through various migration scenarios including migrating from legacy governance systems, upgrading to new framework versions, applying major policy changes, and handling rollbacks when needed.

### Migration Principles

1. **Plan Thoroughly**: Understand current state and target state
2. **Test First**: Always test in non-production environment
3. **Migrate Incrementally**: Start with low-risk repositories
4. **Maintain Rollback**: Always have a way back
5. **Document Everything**: Record all steps and decisions
6. **Communicate Clearly**: Keep stakeholders informed

### Migration Types

| Type | Complexity | Duration | Risk |
|------|------------|----------|------|
| **Legacy to Governance** | High | 2-4 weeks | Medium |
| **Version Upgrade (Minor)** | Low | 1-2 days | Low |
| **Version Upgrade (Major)** | Medium | 1 week | Medium |
| **Policy Change (Minor)** | Low | 1-3 days | Low |
| **Policy Change (Major)** | High | 2-4 weeks | High |
| **Multi-Repo Migration** | High | 4-12 weeks | Medium |

---

## Migration from Legacy Systems

### Pre-Migration Assessment

#### Step 1: Inventory Current State (1 week)

1. **Document Current Governance**
   - [ ] What governance exists today?
   - [ ] What policies are enforced?
   - [ ] What tools are used?
   - [ ] What processes exist?
   - [ ] Who are stakeholders?

2. **Analyze Repositories**
   ```bash
   # Create inventory
   ./scripts/inventory-repos.sh > repo-inventory.txt
   
   # For each repository, document:
   # - Size and complexity
   # - Language/tech stack
   # - CI/CD setup
   # - Existing governance
   # - Team ownership
   # - Migration priority
   ```

3. **Identify Gaps**
   - What's missing in current governance?
   - What problems need solving?
   - What can improve?
   - What must be preserved?

4. **Set Migration Goals**
   - What outcomes are desired?
   - What metrics define success?
   - What timeline is realistic?
   - What resources are needed?

#### Step 2: Planning (1-2 weeks)

1. **Create Migration Strategy**
   ```markdown
   # Migration Strategy
   
   ## Approach
   - Pilot: 2 repositories (low-risk)
   - Wave 1: 10 repositories (varied complexity)
   - Wave 2: 20 repositories
   - Wave 3: Remaining repositories
   
   ## Timeline
   - Pilot: Week 1-2
   - Wave 1: Week 3-4
   - Wave 2: Week 5-6
   - Wave 3: Week 7+
   
   ## Success Criteria
   - All repos have governance
   - CI/CD integrated
   - Team trained
   - Metrics improved
   ```

2. **Select Pilot Repositories**
   
   **Good Pilot Characteristics:**
   - Active development
   - Supportive team
   - Medium complexity
   - Representative tech stack
   - Low business risk

   **Avoid for Pilot:**
   - Critical production systems
   - Legacy/frozen codebases
   - Highly complex monoliths
   - Repositories with major deadlines

3. **Prepare Resources**
   - [ ] Training materials
   - [ ] Documentation
   - [ ] Support plan
   - [ ] Communication plan
   - [ ] Rollback procedures

#### Step 3: Pilot Migration (2 weeks)

**Week 1: First Pilot Repository**

1. **Pre-Migration Backup**
   ```bash
   # Backup current state
   git clone --mirror <repo-url> backup-<repo-name>
   
   # Document current configuration
   cp -r .github backup/.github
   cp -r .gitlab backup/.gitlab
   
   # Export current metrics
   ./scripts/export-metrics.sh > baseline-metrics.json
   ```

2. **Initialize Governance**
   ```bash
   cd <pilot-repo>
   
   # Install CLI
   npm install -g @trevorplam/governance-cli
   
   # Initialize with Standard tier
   governance init --tier=standard
   
   # Review and customize
   vim .repo/repo.manifest.yaml
   ```

3. **Configure Manifest**
   - [ ] Map existing scripts to canonical commands
   - [ ] Define verification profiles
   - [ ] Set boundary rules
   - [ ] Configure security settings

4. **Customize Policies**
   - [ ] Review CONSTITUTION.md
   - [ ] Adjust PRINCIPLES.md if needed
   - [ ] Configure QUALITY_GATES.md thresholds
   - [ ] Update SECURITY_BASELINE.md triggers
   - [ ] Define BOUNDARIES.md layers

5. **Integrate CI/CD**
   ```bash
   # Add governance workflow
   cp templates/ci-cd/github-actions/governance-check.yml \
      .github/workflows/
   
   # Test workflow
   git checkout -b test/governance-integration
   git add .
   git commit -m "Add governance framework"
   git push origin test/governance-integration
   
   # Create test PR
   gh pr create --title "Test: Governance Integration"
   ```

6. **Monitor and Adjust**
   - Watch first few PRs closely
   - Help team with issues
   - Adjust thresholds if needed
   - Document learnings

**Week 2: Second Pilot + Refinement**

1. **Apply Learnings**
   - Fix issues from first pilot
   - Update documentation
   - Refine processes
   - Improve automation

2. **Migrate Second Pilot**
   - Follow same process
   - Test refinements
   - Collect more feedback

3. **Evaluate Pilot Success**
   ```markdown
   # Pilot Evaluation
   
   ## Metrics
   - PR cycle time: [before] → [after]
   - Quality issues: [before] → [after]
   - Team satisfaction: [score/10]
   
   ## Feedback
   - What went well
   - What was challenging
   - What to improve
   
   ## Decision
   - Proceed to Wave 1? Yes/No
   - Changes needed before Wave 1
   ```

#### Step 4: Wave Migrations (4-8 weeks)

**Wave 1: Early Adopters (10 repos, 2 weeks)**

1. **Select Repositories**
   - Varied tech stacks
   - Different team sizes
   - Mix of complexity
   - Supportive teams

2. **Batch Migration**
   ```bash
   # For each repository in Wave 1
   for repo in wave1-repos.txt; do
     echo "Migrating $repo"
     cd "$repo"
     governance init --tier=standard
     # Customize as needed
     # Test and validate
     # Create PR
   done
   ```

3. **Support and Monitor**
   - Daily check-ins
   - Quick issue resolution
   - Documentation updates
   - Collect feedback

**Wave 2 & 3: Broader Rollout**

1. **Scale Proven Process**
   - Use refined playbook
   - Automate more steps
   - Reduce manual effort
   - Maintain quality

2. **Handle Special Cases**
   - Monorepos
   - Legacy systems
   - Complex integrations
   - Custom requirements

---

### Legacy System Migration Patterns

#### Pattern 1: From Custom Scripts

**Current State:**
- Bash/Python scripts for checks
- Manual code reviews
- Ad-hoc quality gates

**Migration:**
```bash
# Map scripts to manifest commands
# Before: ./scripts/run-tests.sh
# After: governance manifest commands.test:all = "npm test"

# Before: ./scripts/lint.sh
# After: governance manifest commands.lint:check = "npm run lint"

# Preserve custom scripts that are unique
# Add them to .repo/automation/scripts/
```

#### Pattern 2: From Jenkins/Legacy CI

**Current State:**
- Jenkins pipelines
- Groovy scripts
- Manual deployments

**Migration:**
```groovy
// Jenkinsfile - Add governance
pipeline {
    stages {
        stage('Governance') {
            steps {
                sh 'governance validate'
                sh 'governance verify --profile=ci'
            }
        }
        stage('Build') {
            // Existing build logic
        }
    }
}
```

#### Pattern 3: From Manual Processes

**Current State:**
- Email approval workflows
- Document-based reviews
- Spreadsheet tracking

**Migration:**
- Replace with HITL process
- Use waiver system
- Automate tracking
- Maintain audit trail

---

## Version Upgrades

### Minor Version Upgrade (1.x.y → 1.x.z)

**Risk Level:** Low  
**Duration:** 1-2 days  
**Complexity:** Simple

#### Process

1. **Check Changelog**
   ```bash
   governance check-updates
   
   # Review what's new
   # - Bug fixes
   # - Minor improvements
   # - No breaking changes
   ```

2. **Test in Sandbox**
   ```bash
   cd /tmp/test-repo
   governance init
   governance update
   governance validate
   governance verify --profile=ci
   ```

3. **Update Production**
   ```bash
   # Update globally
   npm update -g @trevorplam/governance-cli
   
   # Update in repositories
   cd <repo>
   governance update
   
   # Verify
   governance validate
   ```

4. **Monitor**
   - Watch for issues
   - Quick fixes if needed
   - Minimal disruption expected

---

### Major Version Upgrade (1.x.y → 2.0.0)

**Risk Level:** Medium  
**Duration:** 1 week  
**Complexity:** Moderate

#### Pre-Upgrade (Days 1-2)

1. **Review Breaking Changes**
   ```bash
   # Read upgrade guide
   governance check-updates --detailed
   
   # Review migration guide
   cat docs/UPGRADE_GUIDE_v2.md
   ```

2. **Assess Impact**
   - Which repositories affected?
   - What changes are required?
   - How much work is involved?
   - What's the risk?

3. **Plan Migration**
   ```markdown
   # Major Upgrade Plan
   
   ## Breaking Changes
   - Change 1: Impact + Fix
   - Change 2: Impact + Fix
   
   ## Migration Steps
   1. Backup all repositories
   2. Update CLI
   3. Test in sandbox
   4. Pilot repository upgrade
   5. Wave 1 upgrades
   6. Remaining repositories
   
   ## Rollback Plan
   - Downgrade CLI if needed
   - Restore from backup
   - Revert manifest changes
   ```

#### Upgrade (Days 3-5)

1. **Backup Everything**
   ```bash
   # Backup script
   for repo in $(cat repo-list.txt); do
     git clone --mirror "$repo" "backup-$repo"
     cd "$repo"
     cp .repo/repo.manifest.yaml "backup-manifest-$(date +%Y%m%d).yaml"
   done
   ```

2. **Update CLI**
   ```bash
   npm install -g @trevorplam/governance-cli@2.0.0
   governance --version # Verify v2.0.0
   ```

3. **Pilot Upgrade**
   ```bash
   cd <pilot-repo>
   
   # Dry run first
   governance update --dry-run
   
   # Review changes
   git diff .repo/
   
   # Apply update
   governance update
   
   # Manual adjustments if needed
   vim .repo/repo.manifest.yaml
   
   # Validate
   governance validate
   governance verify --profile=ci
   
   # Test thoroughly
   git checkout -b test/upgrade-v2
   # Make test changes
   # Create PR
   # Verify all checks pass
   ```

4. **Wave Upgrades**
   - Wave 1: 5 repositories (Day 4)
   - Wave 2: 15 repositories (Day 5)
   - Wave 3: Remaining (Days 6-7)

#### Post-Upgrade (Days 6-7)

1. **Validate All Repositories**
   ```bash
   for repo in $(cat repo-list.txt); do
     cd "$repo"
     echo "Validating $repo"
     governance validate || echo "FAIL: $repo"
   done
   ```

2. **Monitor Issues**
   - Track upgrade problems
   - Quick fixes
   - Help teams
   - Document solutions

3. **Update Documentation**
   - Update internal docs
   - Update training materials
   - Create FAQ for v2
   - Announce completion

---

## Policy Changes

### Minor Policy Change

**Examples:**
- Adjust quality gate threshold
- Add new principle
- Update example
- Clarify wording

**Process:**

1. **Create ADR**
   ```markdown
   # ADR-XXX: Update Coverage Threshold
   
   ## Context
   Current coverage threshold is 80%.
   Team consistently exceeds 90%.
   
   ## Decision
   Increase threshold to 85%.
   
   ## Consequences
   - Better quality bar
   - Reflects team capability
   - No team disruption expected
   ```

2. **Update Policy File**
   ```bash
   vim .repo/policy/QUALITY_GATES.md
   # Change: coverage: 80% → 85%
   ```

3. **Communicate**
   - Email team
   - Update docs
   - Answer questions

4. **Deploy**
   ```bash
   git commit -m "Policy: Increase coverage threshold to 85%"
   git push
   governance update  # In all repos
   ```

---

### Major Policy Change

**Examples:**
- New security requirements
- Architectural boundary changes
- New mandatory processes
- Significant threshold changes

**Process (2-4 weeks):**

#### Week 1: Proposal

1. **Draft Policy**
   - Write new policy text
   - Create examples
   - Define enforcement
   - Consider impact

2. **Create RFC**
   - Propose change formally
   - Explain rationale
   - Show examples
   - Request feedback

3. **Gather Input**
   - Team discussions
   - Stakeholder reviews
   - Security review
   - Collect concerns

#### Week 2: Refinement

1. **Incorporate Feedback**
   - Address concerns
   - Refine policy
   - Update examples
   - Improve clarity

2. **Create Migration Plan**
   - How will teams adapt?
   - What changes needed?
   - How long will it take?
   - What support provided?

3. **Get Approval**
   - Leadership approval
   - Security approval
   - Team consensus

#### Week 3-4: Rollout

1. **Prepare Teams**
   - Training sessions
   - Documentation
   - Examples
   - Support plan

2. **Phased Deployment**
   - Pilot team first
   - Early adopters
   - General rollout
   - Stragglers support

3. **Monitor Adoption**
   - Track compliance
   - Help with issues
   - Adjust if needed
   - Celebrate success

---

## Rollback Procedures

### When to Rollback

**Immediate Rollback:**
- Critical functionality broken
- Security vulnerability introduced
- Widespread failures
- Data integrity risk

**Consider Rollback:**
- Significant team disruption
- Unexpected issues
- Performance problems
- Poor team adoption

### Rollback Process

#### Step 1: Decision (15 minutes)

1. **Assess Situation**
   - What's broken?
   - How many affected?
   - Can it be fixed forward?
   - Is rollback safer?

2. **Get Approval**
   - Team lead approves
   - Stakeholders notified
   - Document decision

#### Step 2: Rollback (30-60 minutes)

**Rollback CLI Version:**
```bash
# Uninstall current version
npm uninstall -g @trevorplam/governance-cli

# Install previous version
npm install -g @trevorplam/governance-cli@1.9.0

# Verify
governance --version
```

**Rollback Repository Changes:**
```bash
cd <repo>

# Restore from backup
git checkout backup-branch

# Or restore specific files
git checkout HEAD~1 -- .repo/repo.manifest.yaml

# Or use backup file
cp backup-manifest-20260122.yaml .repo/repo.manifest.yaml

# Validate
governance validate

# Push rollback
git commit -m "Rollback: Restore previous governance config"
git push
```

**Rollback CI/CD:**
```bash
# Restore previous workflow
git checkout HEAD~1 -- .github/workflows/governance.yml
git commit -m "Rollback: Restore previous workflow"
git push
```

#### Step 3: Communicate (15 minutes)

```
ROLLBACK NOTICE

We've rolled back governance changes due to [reason].

What was rolled back:
- [Item 1]
- [Item 2]

Current state:
- [Status]

Next steps:
- [Plan]

Questions: [Contact]
```

#### Step 4: Post-Mortem (1-2 days later)

- What went wrong?
- Why wasn't it caught in testing?
- How to prevent next time?
- What's the plan forward?

---

## Testing Migration

### Test Environments

1. **Sandbox Repository**
   - Disposable test environment
   - Try changes safely
   - No impact on real work

2. **Pilot Repository**
   - Real repository
   - Low business risk
   - Supportive team
   - Representative complexity

3. **Staging Environment**
   - Mirror of production
   - Full testing
   - Integration validation

### Test Checklist

**Pre-Migration Tests:**
- [ ] Backup verified
- [ ] Rollback tested
- [ ] Documentation reviewed
- [ ] Team trained

**During Migration Tests:**
- [ ] CLI installation
- [ ] Manifest validation
- [ ] Policy enforcement
- [ ] CI/CD integration
- [ ] All commands work

**Post-Migration Tests:**
- [ ] Create test PR
- [ ] Run all checks
- [ ] Fix test issue
- [ ] Merge successfully
- [ ] Metrics collected

### Validation Script

```bash
#!/bin/bash
# validate-migration.sh

echo "🧪 Migration Validation"
echo "======================"

# Test CLI
governance --version || exit 1
echo "✅ CLI installed"

# Test manifest
governance validate || exit 1
echo "✅ Manifest valid"

# Test verification
governance verify --profile=quick || exit 1
echo "✅ Verification works"

# Test CI/CD
gh workflow run governance.yml
sleep 10
gh run list --limit 1 --json conclusion --jq '.[0].conclusion' | grep -q "success"
echo "✅ CI/CD works"

echo "======================"
echo "✅ Migration validated"
```

---

## Post-Migration Validation

### Success Metrics

**Week 1:**
- [ ] All repositories migrated
- [ ] No critical issues
- [ ] Team can work normally
- [ ] CI/CD functioning

**Week 2:**
- [ ] Quality metrics stable or improved
- [ ] No increase in PR cycle time
- [ ] Team adapting well
- [ ] Support requests declining

**Week 4:**
- [ ] Metrics showing improvement
- [ ] Team confident
- [ ] Process normalized
- [ ] Goals achieved

### Validation Checklist

**Technical Validation:**
- [ ] All repos have governance
- [ ] All CI/CD integrated
- [ ] All checks passing
- [ ] No errors in logs
- [ ] Performance acceptable

**Process Validation:**
- [ ] Teams following process
- [ ] PRs using governance
- [ ] Waivers properly requested
- [ ] HITL functioning
- [ ] Reviews happening

**Outcome Validation:**
- [ ] Quality improving
- [ ] Velocity maintained/improved
- [ ] Team satisfaction high
- [ ] Goals met

### Migration Report

```markdown
# Migration Report: [Name]

## Summary
- Start: [Date]
- End: [Date]
- Duration: [Weeks]
- Repositories: [Count]
- Teams: [Count]

## Metrics
- Success rate: [%]
- Issues encountered: [Count]
- Average migration time: [Hours/repo]
- Team satisfaction: [Score/10]

## Outcomes
- [Outcome 1]
- [Outcome 2]

## Lessons Learned
- [Lesson 1]
- [Lesson 2]

## Recommendations
- [Recommendation 1]
- [Recommendation 2]
```

---

## Quick Reference

### Migration Commands

```bash
# Pre-migration
git clone --mirror <repo> backup
governance check-updates

# Migration
governance init --tier=standard
governance validate
governance update --dry-run
governance update

# Post-migration
governance verify --profile=ci
governance report --format=summary

# Rollback
git checkout backup-branch
npm install -g @trevorplam/governance-cli@<old-version>
```

### Migration Timeline Template

| Phase | Duration | Activities |
|-------|----------|------------|
| Planning | 1-2 weeks | Assessment, strategy, preparation |
| Pilot | 2 weeks | Test with 2 repositories |
| Wave 1 | 2 weeks | 10 repositories |
| Wave 2 | 2 weeks | 20 repositories |
| Wave 3 | 2-4 weeks | Remaining repositories |
| Validation | 1 week | Testing, metrics, report |

---

**Version:** 1.0.0  
**Last Updated:** 2026-01-22  
**Maintainer:** TrevorPLam/governance
