# How To: Customize Policies
## Step-by-Step Guide to Adapting Governance for Your Team

**Purpose:** Learn how to safely customize governance policies to fit your team's needs while maintaining framework integrity.

**Time Required:** 30-60 minutes  
**Skill Level:** Intermediate

---

## Table of Contents

1. [Understanding Policy Layers](#understanding-policy-layers)
2. [What You Can Customize](#what-you-can-customize)
3. [What You Should NOT Customize](#what-you-should-not-customize)
4. [Customization Process](#customization-process)
5. [Common Customizations](#common-customizations)
6. [Validation](#validation)
7. [Rollback](#rollback)

---

## Understanding Policy Layers

Before customizing, understand the 3-layer model:

```
Layer 1: CUSTOM (Your Project)
├── repo.manifest.yaml ← SAFE to customize
├── HITL.md            ← SAFE to customize
└── WAIVERS.md         ← SAFE to customize

Layer 2: UPDATEABLE (Framework)
├── CONSTITUTION.md    ← Customize with caution
├── PRINCIPLES.md      ← Customize with caution
├── QUALITY_GATES.md   ← Customize with caution
├── SECURITY_BASELINE.md ← Customize with caution
└── BOUNDARIES.md      ← Customize with caution

Layer 3: REFERENCE (Templates)
├── Templates/         ← SAFE to customize
└── Checklists/        ← SAFE to customize
```

**Key Points:**
- Layer 1: Fully customizable, never overwritten
- Layer 2: Customizable but receives updates
- Layer 3: Templates for your use

---

## What You Can Customize

### ✅ Safe Customizations

#### 1. Manifest Configuration (Layer 1)
**File:** `.repo/repo.manifest.yaml`

**What to customize:**
- Commands (build, test, lint)
- Quality gate thresholds
- Boundary definitions
- Agent permissions
- Project-specific settings

**Example:**
```yaml
quality_gates:
  coverage:
    minimum: 80  # Changed from 70
    target: 90   # Changed from 80
  performance:
    build_time_seconds: 120  # Added custom metric
```

#### 2. Document Templates (Layer 3)
**Location:** `.repo/templates/`

**What to customize:**
- Add custom fields
- Change format
- Add team-specific sections
- Modify examples

**Example:** Customize ADR template
```markdown
<!-- Add team-specific field -->
## Team Impact
**Teams Affected:** [List teams]
**Migration Required:** [Yes/No]
```

#### 3. Quality Gate Thresholds (Layer 2)
**File:** `.repo/policy/QUALITY_GATES.md`

**What to customize:**
- Coverage minimums
- Performance budgets
- Complexity limits
- Code style rules

**Example:**
```markdown
<!-- Original -->
minimum_coverage: 70%

<!-- Customized for strict team -->
minimum_coverage: 85%
reason: Medical device software requires higher coverage
```

#### 4. Boundary Layers (Layer 2)
**File:** `.repo/policy/BOUNDARIES.md`

**What to customize:**
- Layer names (to match your architecture)
- Import rules (to match your patterns)
- Cross-feature rules

**Example:**
```markdown
<!-- Original -->
layers:
  - ui
  - domain
  - data
  - platform

<!-- Customized for your architecture -->
layers:
  - presentation
  - application
  - infrastructure
  - shared
```

---

## What You Should NOT Customize

### ❌ Dangerous Customizations

#### 1. Constitution Articles
**File:** `.repo/policy/CONSTITUTION.md`

**Do NOT change:**
- Article structure
- Authority hierarchy
- Security-first principle
- Human override rules

**Why:** These are fundamental to governance integrity

**Exception:** You can ADD articles but don't remove existing ones

#### 2. Hard Gates
**File:** `.repo/policy/QUALITY_GATES.md`

**Do NOT remove:**
- Build must succeed
- Security scans must pass
- Tests must pass

**Why:** These gates prevent broken code from being merged

#### 3. Security Review Triggers
**File:** `.repo/policy/SECURITY_BASELINE.md`

**Do NOT remove:**
- Authentication changes
- Cryptography usage
- Input validation
- Sensitive data handling

**Why:** These protect against security vulnerabilities

**Exception:** You can ADD triggers but don't remove existing ones

#### 4. HITL Requirements
**File:** `.repo/policy/HITL.md` (structure)

**Do NOT remove:**
- Security review requirements
- Production deployment approval
- Emergency fix oversight

**Why:** These ensure human oversight of critical actions

---

## Customization Process

### Step 1: Backup Current Policies

```bash
# Create backup
cp -r .repo/policy .repo/policy.backup

# Or use git
git checkout -b policy-customization
git add .repo/policy/
git commit -m "Backup before policy customization"
```

### Step 2: Identify What to Change

Ask these questions:

1. **Why do we need this change?**
   - Document the reason
   - Get team agreement

2. **Is it safe to change?**
   - Check layer model
   - Review "Do NOT Customize" list

3. **Will it affect governance integrity?**
   - Does it weaken security?
   - Does it bypass quality controls?
   - Does it reduce human oversight?

### Step 3: Make Changes

#### Example: Increase Coverage Requirement

**File:** `.repo/policy/QUALITY_GATES.md`

```markdown
<!-- BEFORE -->
## Code Coverage
Minimum: 70%
Target: 80%

<!-- AFTER -->
## Code Coverage
Minimum: 80%
Target: 90%
Reason: Financial software requires higher quality standards
Approved by: @tech-lead
Date: 2026-01-22
```

**Always document:**
- What changed
- Why it changed
- Who approved it
- When it changed

### Step 4: Update Version Comments

Add version markers to track changes:

```markdown
<!-- GOVERNANCE_VERSION: 1.0.0 -->
<!-- CUSTOM_VERSION: 1.0.1 -->
<!-- LAST_MODIFIED: 2026-01-22 -->
<!-- MODIFIED_BY: @your-username -->

<!-- CUSTOMIZATION START -->
Your custom changes here
<!-- CUSTOMIZATION END -->
```

This helps during updates.

### Step 5: Validate Changes

```bash
# Validate YAML syntax (if changed manifest)
governance-cli validate

# Check policies are still readable
cat .repo/policy/QUALITY_GATES.md

# Verify no syntax errors
markdown-lint .repo/policy/*.md
```

### Step 6: Test on Sample Project

```bash
# Create test branch
git checkout -b test-policies

# Try building with new policies
npm run build
npm test

# Verify gates work as expected
governance-cli verify --profile=thorough
```

### Step 7: Get Team Approval

Before finalizing:

1. Share changes with team
2. Explain rationale
3. Get consensus
4. Document in PR

### Step 8: Commit and Deploy

```bash
# Commit changes
git add .repo/policy/
git commit -m "feat(policy): Increase coverage requirement to 80%

- Raised minimum coverage from 70% to 80%
- Raised target from 80% to 90%
- Reason: Financial software quality standards
- Approved by: @tech-lead

BREAKING CHANGE: Projects below 80% coverage will now fail gates"

# Merge to main
git push origin policy-customization
# Create PR and merge
```

---

## Common Customizations

### 1. Adjust Coverage Thresholds

**Use Case:** Different teams/projects need different standards

**File:** `.repo/policy/QUALITY_GATES.md`

```markdown
<!-- Conservative (default) -->
minimum_coverage: 70%
target: 80%

<!-- Strict (financial, medical) -->
minimum_coverage: 85%
target: 95%

<!-- Lenient (prototypes, POCs) -->
minimum_coverage: 50%
target: 70%
note: "Temporary for POC phase, will increase to 70% for production"
```

### 2. Add Custom Quality Gates

**Use Case:** Team-specific requirements

**File:** `.repo/policy/QUALITY_GATES.md`

```markdown
## Custom Gates

### Bundle Size
- Maximum: 250 KB (gzipped)
- Rationale: Mobile performance
- Waiverable: No (hard gate)

### API Response Time
- Maximum: 200ms (p95)
- Rationale: User experience
- Waiverable: Yes (with performance plan)

### Documentation Coverage
- Minimum: 100% of public APIs
- Rationale: External consumption
- Waiverable: No
```

### 3. Customize Layer Architecture

**Use Case:** Match your project structure

**File:** `.repo/policy/BOUNDARIES.md`

**Original:**
```markdown
layers:
  - ui
  - domain
  - data
  - platform
```

**Microservices:**
```markdown
layers:
  - api
  - service
  - repository
  - shared
```

**Clean Architecture:**
```markdown
layers:
  - presentation
  - application
  - domain
  - infrastructure
```

### 4. Add Team-Specific Principles

**Use Case:** Complement existing principles

**File:** `.repo/policy/PRINCIPLES.md`

```markdown
<!-- Add after P25 -->

## P26: Team-Specific Practices

### P26-A: Use TypeScript Strict Mode
- All new code must use strict TypeScript
- Rationale: Type safety reduces bugs
- Exception: None

### P26-B: Performance Budget
- All pages must load in <3 seconds on 3G
- Rationale: User experience
- Exception: Admin pages (with justification)

### P26-C: Accessibility First
- All UI must meet WCAG 2.1 AA
- Rationale: Inclusivity requirement
- Exception: None
```

### 5. Modify Waiver Expiration

**Use Case:** Different project needs

**File:** `.repo/repo.manifest.yaml`

```yaml
# Original
waivers:
  max_duration_days: 30

# Short-lived project (rapid iteration)
waivers:
  max_duration_days: 7

# Long-term technical debt
waivers:
  max_duration_days: 90
  require_monthly_review: true
```

### 6. Configure Agent Permissions

**Use Case:** Control what agents can do

**File:** `.repo/repo.manifest.yaml`

```yaml
agents:
  primary:
    enabled: true
    permissions:
      - create_feature      # ✓ Allow
      - modify_existing     # ✓ Allow
      - delete_code         # ✗ Disable
      - security_changes    # ✗ Disable (require human)
    
  secondary:
    enabled: true
    permissions:
      - refactor_only       # ✓ Allow
      - tests_only          # ✓ Allow
```

---

## Validation

After customization, validate:

### 1. Syntax Validation

```bash
# Validate manifest YAML
governance-cli validate

# Check markdown syntax
markdownlint .repo/policy/*.md

# Verify no broken links
markdown-link-check .repo/policy/*.md
```

### 2. Logical Validation

Check for contradictions:

```
❌ BAD: Coverage minimum (80%) > target (70%)
✅ GOOD: Coverage minimum (70%) < target (80%)

❌ BAD: Layer ui can import from data (skipping domain)
✅ GOOD: Layer ui only imports from domain

❌ BAD: Security gate is waiverable
✅ GOOD: Security gate is hard (cannot waive)
```

### 3. Team Validation

- Share with team
- Get feedback
- Make adjustments
- Document decisions

### 4. Trial Period

```bash
# Use on test project first
# Monitor for issues
# Adjust based on learnings
# Roll out to all projects
```

---

## Rollback

If customization causes problems:

### Option 1: Git Revert

```bash
# Revert specific commit
git revert <commit-hash>

# Or reset to backup
git checkout policy-customization
git reset --hard backup-tag
```

### Option 2: Restore from Backup

```bash
# Restore backed up policies
rm -rf .repo/policy/
cp -r .repo/policy.backup .repo/policy/

# Commit restoration
git add .repo/policy/
git commit -m "Restore policies from backup"
```

### Option 3: Re-initialize from Template

```bash
# Backup current (in case)
mv .repo/policy .repo/policy.custom

# Copy clean template
cp -r /path/to/governance/templates/.repo/policy .repo/

# Manually merge back safe customizations
# Compare and merge
diff -r .repo/policy .repo/policy.custom
```

---

## Best Practices

### ✅ Do

1. **Document everything**
   - Why the change was made
   - Who approved it
   - When it was made

2. **Version your customizations**
   - Use version comments
   - Track in git
   - Maintain changelog

3. **Test thoroughly**
   - Test on sample project
   - Verify gates work
   - Check CI/CD integration

4. **Get team buy-in**
   - Discuss changes
   - Get consensus
   - Train team on new policies

5. **Review regularly**
   - Quarterly policy review
   - Adjust based on learnings
   - Keep policies relevant

### ❌ Don't

1. **Remove security gates**
   - Never weaken security
   - Add triggers, don't remove

2. **Skip validation**
   - Always validate changes
   - Test before deploying

3. **Change without approval**
   - Get team agreement
   - Document in HITL

4. **Ignore update conflicts**
   - Merge updates carefully
   - Don't blindly override

5. **Forget rollback plan**
   - Always have backup
   - Know how to revert

---

## Troubleshooting

### Issue: Update Overwrites My Changes

**Cause:** Layer 2 file updated without custom markers

**Solution:**
```markdown
<!-- Add these markers around customizations -->
<!-- CUSTOM START -->
Your customizations here
<!-- CUSTOM END -->

# Update command will preserve these sections
governance-cli update --preserve-custom
```

### Issue: Validation Fails After Customization

**Cause:** Invalid YAML or contradictory settings

**Solution:**
```bash
# Check specific error
governance-cli validate --verbose

# Common fixes:
# - Fix YAML indentation
# - Resolve contradictory settings
# - Restore backup if needed
```

### Issue: Team Doesn't Follow New Policies

**Cause:** Lack of communication or training

**Solution:**
1. Announce changes in team meeting
2. Update documentation
3. Provide examples
4. Answer questions
5. Monitor compliance

---

## Next Steps

- **Configure Manifest:** [HOW_TO_CONFIGURE_MANIFEST.md](HOW_TO_CONFIGURE_MANIFEST.md)
- **Define Boundaries:** [HOW_TO_DEFINE_BOUNDARIES.md](HOW_TO_DEFINE_BOUNDARIES.md)
- **CLI Reference:** [CLI_REFERENCE.md](../reference/CLI_REFERENCE.md)

---

**Guide Version:** 1.0  
**Last Updated:** 2026-01-22  
**Difficulty:** Intermediate
