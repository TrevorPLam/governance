# Automation

This directory contains CI/CD workflows and automation scripts.

## Structure

### `ci/` - CI/CD Workflows
GitHub Actions and other CI/CD platform configurations:
- Governance verification workflow
- Quality gate checks
- Security scanning
- Dependency boundary checking
- PR validation
- Release automation

### `scripts/` - Helper Scripts
Automation scripts for:
- Governance validation
- Boundary checking
- Manifest validation
- HITL item management
- Waiver tracking
- Metrics collection

## Update Policy

**Layer 2 - Updateable**

Automation files can be updated from the governance repository. Custom workflows can be added.

## Usage

1. Copy workflows to `.github/workflows/` (for GitHub Actions)
2. Adapt to your CI/CD platform if not using GitHub
3. Customize triggers and settings in repo.manifest.yaml
4. Add custom automation as needed
5. Pull updates to get improvements

---

**Status:** Templates to be created in Phase 1, Task 8
