# GitHub Actions Workflow Templates

This directory contains ready-to-use GitHub Actions workflow templates for governance automation.

## Available Workflows

### 1. Governance Check (`governance-check.yml`)
Validates governance compliance on pull requests.

**Features:**
- Validates governance configuration
- Checks architectural boundaries
- Verifies manifest correctness
- Runs full governance verification
- Posts results as PR comments
- Blocks merge on failures (configurable)

**Usage:**
```bash
cp .github/workflows/templates/governance-check.yml .github/workflows/
```

### 2. Quality Gates (`quality-gates.yml`)
Enforces code quality standards.

**Features:**
- Runs linting checks
- Executes tests with coverage
- Checks coverage thresholds
- Builds the project
- Verifies documentation
- Posts quality report

**Configuration:**
- Set `MINIMUM_COVERAGE` environment variable (default: 70%)
- Customize npm scripts in package.json

**Usage:**
```bash
cp .github/workflows/templates/quality-gates.yml .github/workflows/
```

### 3. Security Scan (`security-scan.yml`)
Performs comprehensive security scanning.

**Features:**
- Dependency vulnerability scanning (npm audit)
- Secret detection (TruffleHog)
- Static application security testing (Semgrep)
- Container scanning (Trivy, if Dockerfile present)
- Blocks on critical vulnerabilities

**Configuration:**
- Runs daily at 2 AM UTC (configurable)
- Adjust `audit-level` for different thresholds
- Add/remove scanning tools as needed

**Usage:**
```bash
cp .github/workflows/templates/security-scan.yml .github/workflows/
```

### 4. Release (`release.yml`)
Automates release creation and publishing.

**Features:**
- Validates release readiness
- Runs all quality gates
- Checks documentation updates
- Generates release notes
- Creates GitHub releases
- Publishes to NPM (optional)

**Prerequisites:**
- Set `NPM_TOKEN` secret for npm publishing
- Tag commits with version (e.g., `v1.0.0`)

**Usage:**
```bash
cp .github/workflows/templates/release.yml .github/workflows/
```

## Composite Actions

### Governance Setup Action
Sets up governance CLI in workflows.

**Location:** `.github/actions/governance-setup/`

**Usage:**
```yaml
- uses: ./.github/actions/governance-setup
  with:
    version: 'latest'
```

### Boundary Check Action
Validates architectural boundaries.

**Location:** `.github/actions/boundary-check/`

**Usage:**
```yaml
- uses: ./.github/actions/boundary-check
```

### Quality Check Action
Runs quality checks (lint, test, build).

**Location:** `.github/actions/quality-check/`

**Usage:**
```yaml
- uses: ./.github/actions/quality-check
  with:
    minimum-coverage: '80'
```

### Security Check Action
Performs security scans.

**Location:** `.github/actions/security-check/`

**Usage:**
```yaml
- uses: ./.github/actions/security-check
  with:
    block-on-critical: 'true'
```

## Quick Start

### Basic Setup (Governance + Quality)
```bash
# Copy essential workflows
cp .github/workflows/templates/governance-check.yml .github/workflows/
cp .github/workflows/templates/quality-gates.yml .github/workflows/

# Commit and push
git add .github/workflows/
git commit -m "Add governance and quality workflows"
git push
```

### Full Setup (All Workflows)
```bash
# Copy all workflows
cp .github/workflows/templates/*.yml .github/workflows/

# Configure secrets (for release workflow)
# GitHub UI: Settings > Secrets > Actions > New repository secret
# Add: NPM_TOKEN (if publishing to npm)

# Commit and push
git add .github/workflows/
git commit -m "Add complete governance automation"
git push
```

## Customization

### Adjusting Quality Thresholds
Edit `quality-gates.yml`:
```yaml
env:
  MINIMUM_COVERAGE: 80  # Change from default 70%
```

### Changing Branches
Modify the `on` section in any workflow:
```yaml
on:
  pull_request:
    branches:
      - main
      - develop
      - staging  # Add more branches
```

### Disabling Merge Blocking
Remove or modify the final step in workflows:
```yaml
# Remove this step to allow merge even on failure:
- name: Block Merge on Failure
  if: failure()
  run: exit 1
```

### Adding Custom Checks
Add steps to existing workflows:
```yaml
- name: Custom Check
  run: |
    # Your custom validation
    ./scripts/custom-check.sh
```

## Integration with Other CI/CD

See templates for other platforms:
- GitLab CI: `templates/gitlab-ci.yml`
- CircleCI: `templates/circleci-config.yml`
- Jenkins: `templates/Jenkinsfile`
- Azure Pipelines: `templates/azure-pipelines.yml`

## Troubleshooting

### Workflow Not Running
- Check branch names match in `on` configuration
- Verify `.github/workflows/` path is correct
- Check workflow syntax with GitHub Actions validator

### npm audit Failing
- Update dependencies: `npm update`
- Or request waiver for known issues
- Adjust `audit-level` if needed

### Coverage Below Threshold
- Write more tests
- Or adjust `MINIMUM_COVERAGE` if reasonable
- Or request temporary waiver

### Secret Detection False Positives
- Add exceptions to `.trufflehogignore`
- Review and rotate any actual secrets found

## Best Practices

1. **Start Simple:** Begin with `governance-check.yml` and `quality-gates.yml`
2. **Test Locally:** Run commands locally before relying on CI
3. **Monitor Performance:** Optimize slow workflows
4. **Review Reports:** Check artifacts and summaries regularly
5. **Keep Updated:** Update actions versions periodically

## Support

- **Documentation:** See main governance docs
- **Issues:** Report workflow issues in governance repository
- **Examples:** Check real-world usage in example repositories

---

**Last Updated:** 2026-01-22  
**Version:** 1.0
