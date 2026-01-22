# CI/CD Examples for Governance Framework

This directory contains practical CI/CD examples demonstrating governance integration across different platforms.

## Available Examples

### 1. [GitHub Actions](./github-actions-complete.yml)
Complete GitHub Actions workflow with governance checks, boundary validation, security scanning, and automated deployments.

### 2. [GitLab CI](./gitlab-ci-complete.yml)
GitLab CI pipeline with multi-stage governance verification and parallel test execution.

### 3. [Multi-Stage Pipeline](./multi-stage-pipeline.yml)
Generic multi-stage pipeline demonstrating build, test, security, governance, and deploy stages.

## Quick Start

### Using GitHub Actions

1. Copy `github-actions-complete.yml` to `.github/workflows/governance.yml`
2. Customize for your repository
3. Commit and push - workflow runs automatically on PR

### Using GitLab CI

1. Copy `gitlab-ci-complete.yml` to `.gitlab-ci.yml`
2. Customize variables and stages
3. Commit and push - pipeline runs automatically

## What Gets Checked

### Every Pull Request
- ✅ Linting and formatting
- ✅ Unit tests  
- ✅ Boundary validation
- ✅ Governance verification
- ✅ Security scanning
- ✅ Quality gates

### Release Builds
All PR checks plus:
- ✅ Integration tests
- ✅ E2E tests
- ✅ Comprehensive security scan
- ✅ Performance benchmarks

## Key Features

- **Fast Feedback** - Fail fast, parallel execution, caching
- **Comprehensive Checks** - Quality, tests, security, governance
- **Clear Reporting** - PR comments, coverage reports, metrics
- **Deployment Safety** - Staging first, smoke tests, rollback

## Integration with Governance

### Boundary Checker
```bash
npm run check:boundaries
```

### Governance Verifier
```bash
npm run check:governance
```

### Quality Gates
```bash
npm run check:quality
```

## Related Documentation

- [CI/CD Integration Guide](../../docs/guides/HOW_TO_INTEGRATE_CI_CD.md)
- [Security Baseline](../../templates/.repo/policy/SECURITY_BASELINE.md)
