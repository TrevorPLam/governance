# Governance CLI Reference
## Complete Command-Line Interface Documentation

**Purpose:** Complete reference documentation for the Governance CLI tool - your command-line interface for AI-Native repository governance automation.

**Last Updated:** 2026-01-22  
**Version:** 1.0.0

---

## Table of Contents

1. [Overview](#overview)
2. [Installation](#installation)
3. [Global Options](#global-options)
4. [Commands](#commands)
   - [governance init](#governance-init)
   - [governance validate](#governance-validate)
   - [governance verify](#governance-verify)
   - [governance check-updates](#governance-check-updates)
   - [governance update](#governance-update)
   - [governance migrate](#governance-migrate)
   - [governance lint](#governance-lint)
   - [governance hitl](#governance-hitl)
   - [governance waiver](#governance-waiver)
   - [governance metrics](#governance-metrics)
   - [governance maturity-check](#governance-maturity-check)
5. [Exit Codes](#exit-codes)
6. [Configuration](#configuration)
7. [Environment Variables](#environment-variables)
8. [Examples](#examples)
9. [Troubleshooting](#troubleshooting)
10. [Advanced Usage](#advanced-usage)

---

## Overview

The Governance CLI is a command-line tool that automates the injection, validation, and verification of AI-Native governance frameworks into your repositories. It provides a consistent, automated way to:

- Initialize governance structures in repositories
- Validate configuration and manifest files
- Run verification checks against governance policies
- Update governance frameworks to latest versions
- Manage governance lifecycle

### Key Features

- **🚀 Quick Setup**: Initialize governance in seconds with `governance init`
- **🔍 Smart Validation**: Detect configuration issues and missing files
- **✓ Automated Verification**: Run checks with different profiles (quick, ci, release)
- **🔄 Version Management**: Update governance frameworks while preserving customizations
- **🎯 Auto-Detection**: Automatically detects project type and fills common commands
- **📦 Tiered Approach**: Choose minimal, standard, or complete governance tiers

### Architecture

```
┌─────────────────────────────────────────────┐
│         Governance CLI Tool                 │
├─────────────────────────────────────────────┤
│                                             │
│  Commands:                                  │
│  ├─ init          → Initialize governance   │
│  ├─ validate      → Validate configuration  │
│  ├─ verify        → Run verification checks │
│  ├─ check-updates → Check for updates       │
│  ├─ update        → Update framework        │
│  └─ maturity-check→ Assess maturity level   │
│                                             │
│  Features:                                  │
│  ├─ Auto-detection (npm, pip, maven, etc.) │
│  ├─ 3-layer version system                 │
│  ├─ Template injection                      │
│  └─ Backup & recovery                       │
│                                             │
└─────────────────────────────────────────────┘
```

---

## Installation

### From NPM (Global Installation)

When the package is published:

```bash
npm install -g @trevorplam/governance-cli
```

Verify installation:

```bash
governance --version
```

### Local Development Installation

For contributors or testing:

```bash
# Clone the repository
git clone https://github.com/yourusername/governance.git
cd governance/tools/governance-cli

# Install dependencies
npm install

# Build the CLI
npm run build

# Link globally for local testing
npm link

# Verify it's working
governance --version
```

### Prerequisites

- **Node.js**: Version 14.x or higher
- **npm**: Version 6.x or higher
- **Git**: Required for version detection and .gitignore updates

---

## Global Options

These options work with all commands:

### `--help`, `-h`

Display help information for the CLI or specific command.

```bash
governance --help                 # Show all commands
governance init --help            # Show init command help
```

### `--version`, `-V`

Display the CLI version.

```bash
governance --version
```

**Output:**
```
1.0.0
```

---

## Commands

### `governance init`

Initialize governance framework in the current repository.

#### Synopsis

```bash
governance init [options]
```

#### Description

Creates the `.repo/` directory structure, copies governance templates, initializes the manifest file, and sets up tracking folders. This is the first command you run to add governance to a project.

#### Options

| Option | Alias | Type | Default | Description |
|--------|-------|------|---------|-------------|
| `--name <name>` | `-n` | string | auto-detected | Project name for manifest |
| `--tier <tier>` | `-t` | string | `standard` | Governance tier: `minimal`, `standard`, `complete` |
| `--no-auto-fill` | | boolean | | Disable automatic manifest filling |
| `--no-interactive` | | boolean | | Run in non-interactive mode |

#### Governance Tiers

**Minimal (Tier 1)** - ~10 files
- Core policies (7 files)
- Manifest template
- Entry point documentation
- Best for: Small projects, proof-of-concepts

**Standard (Tier 2)** - ~45 files ⭐ Recommended
- Everything in Minimal
- Agent framework (11 files)
- Document templates (7 files)
- Documentation structure
- Best for: Most production projects

**Complete (Tier 3)** - ~55+ files
- Everything in Standard
- Automation scripts
- CI/CD templates
- Advanced tooling
- Best for: Enterprise projects, full automation

#### What Gets Created

```
your-project/
├── .repo/
│   ├── GOVERNANCE.md              # Entry point
│   ├── VERSION                    # Governance version
│   ├── repo.manifest.yaml         # Command manifest
│   ├── policy/                    # 7 policy files
│   │   ├── CONSTITUTION.md
│   │   ├── PRINCIPLES.md
│   │   ├── QUALITY_GATES.md
│   │   ├── SECURITY_BASELINE.md
│   │   ├── BOUNDARIES.md
│   │   ├── HITL.md
│   │   └── WAIVERS.md
│   ├── agents/                    # Agent framework (Standard+)
│   ├── templates/                 # Document templates (Standard+)
│   ├── docs/                      # Documentation (Standard+)
│   ├── automation/                # Scripts (Complete)
│   ├── metrics/                   # Metrics config + reports
│   ├── hitl/                      # HITL tracking
│   ├── waivers/                   # Waiver tracking
│   ├── audit/                     # Audit trail
│   └── archive/                   # Backups
├── P0TODO.md                      # Priority 0 tasks
├── P1TODO.md                      # Priority 1 tasks
├── P2TODO.md                      # Priority 2 tasks
└── COMPLETEDTODO.md               # Completed tasks
```

#### Auto-Fill Detection

The CLI automatically detects your project type and fills common commands:

| Project Type | Detection | Commands Filled |
|--------------|-----------|-----------------|
| **Node.js** | `package.json` | `npm install`, `npm test`, `npm run build` |
| **Yarn** | `yarn.lock` | `yarn install`, `yarn test`, `yarn build` |
| **Python** | `pyproject.toml` or `requirements.txt` | `pip install`, `pytest`, `python -m build` |
| **Maven** | `pom.xml` | `mvn clean install`, `mvn test`, `mvn package` |
| **Gradle** | `build.gradle` or `build.gradle.kts` | `gradle build`, `gradle test`, `gradle assemble` |

#### Exit Codes

| Code | Meaning |
|------|---------|
| 0 | Success - governance initialized |
| 1 | Error - initialization failed |

#### Examples

**Basic initialization with default settings:**

```bash
cd /path/to/your/project
governance init
```

**Initialize with specific tier:**

```bash
governance init --tier=minimal
```

**Non-interactive initialization for CI/CD:**

```bash
governance init --no-interactive --tier=standard --name="my-project"
```

**Initialize without auto-fill (manual configuration):**

```bash
governance init --no-auto-fill
```

**Reinitialize existing governance:**

```bash
governance init
# Will prompt: "Do you want to reinitialize?"
```

#### Interactive Prompts

When run in interactive mode (default), you'll be prompted for:

1. **Project name** (if not provided via `--name`)
   - Default: Detected from package.json, pyproject.toml, or directory name
   
2. **Governance tier** (if not provided via `--tier`)
   - Options: Minimal, Standard, Complete
   - Recommendation displayed for each tier

3. **Overwrite confirmation** (if governance already exists)
   - Default: No

#### Common Issues

**"Templates not found"**
- The CLI expects templates at `../../templates/` relative to the built CLI
- Ensure you have the complete governance repository structure
- Run from the project root, not the CLI directory

**"Permission denied"**
- Ensure you have write permissions in the project directory
- On Unix systems, check file ownership: `ls -la`

---

### `governance validate`

Validate governance configuration, manifest, and policy files.

#### Synopsis

```bash
governance validate [options]
```

#### Description

Performs comprehensive validation of your governance setup:
- Checks for required files and folders
- Validates manifest syntax and configuration
- Verifies policy files are present and have content
- Detects placeholders that need to be filled
- Reports errors and warnings

#### Options

| Option | Alias | Type | Default | Description |
|--------|-------|------|---------|-------------|
| `--verbose` | `-v` | boolean | false | Show detailed validation output |

#### Validation Checks

**Structure Validation:**
- ✓ `.repo/GOVERNANCE.md` exists
- ✓ `.repo/VERSION` exists
- ✓ `.repo/repo.manifest.yaml` exists
- ✓ All required policy files exist
- ⚠ Recommended folders exist (hitl/, waivers/, archive/)

**Manifest Validation:**
- ✓ Manifest is valid YAML
- ✓ Governance version is set
- ✓ Required commands are configured
- ⚠ Placeholder commands detected
- ⚠ Optional commands not configured

**Policy Validation:**
- ✓ Policy files exist
- ✓ Policy files have content (>100 characters)
- ⚠ Policy files have version markers
- ⚠ Policy files follow naming conventions

#### Exit Codes

| Code | Meaning |
|------|---------|
| 0 | Success - all checks passed (warnings allowed) |
| 1 | Error - validation failed with errors |

#### Examples

**Basic validation:**

```bash
governance validate
```

**Output (Success):**
```
🔍 Governance CLI - Validate

Project root: /path/to/project

Validating governance configuration...

✓ Structure validation complete
✓ Manifest validation complete
✓ Policy validation complete

✅ All validation checks passed!
```

**Verbose validation:**

```bash
governance validate --verbose
```

**Output (With Warnings):**
```
🔍 Governance CLI - Validate

Project root: /path/to/project

Validating governance configuration...

✓ Structure validation complete
✓ Manifest validation complete
✓ Policy validation complete

⚠️  3 Warning(s) Found:

  • Manifest has 2 placeholder(s): test:unit, lint:fix
    File: .repo/repo.manifest.yaml

  • Recommended folder missing: .repo/archive/
    File: archive

  • Policy file missing version marker: BOUNDARIES.md
    File: policy/BOUNDARIES.md

✅ Validation passed with 3 warning(s)
```

**Output (With Errors):**
```
🔍 Governance CLI - Validate

Project root: /path/to/project

Validating governance configuration...

✓ Structure validation complete
✓ Manifest validation complete
✓ Policy validation complete

❌ 2 Error(s) Found:

  • Required file missing: .repo/policy/CONSTITUTION.md
    File: CONSTITUTION.md
    Suggestion: Run "governance init" to recreate missing files

  • Required command not configured: install
    File: .repo/repo.manifest.yaml
    Suggestion: Fill in the 'install' command in repo.manifest.yaml

❌ Validation failed with 2 error(s)
```

#### Error Types

| Type | Severity | Description |
|------|----------|-------------|
| `MISSING_FILE` | Error | Required file not found |
| `MISSING_MANIFEST` | Error | Manifest file missing or invalid |
| `MISSING_COMMAND` | Error | Required command not configured |
| `MISSING_FOLDER` | Warning | Recommended folder not found |
| `HAS_PLACEHOLDERS` | Warning | Placeholder commands detected |
| `MISSING_VERSION` | Warning | Version information missing |
| `MISSING_MARKER` | Warning | Policy missing version marker |
| `EMPTY_POLICY` | Warning | Policy file too short or empty |

#### Integration with CI/CD

```yaml
# GitHub Actions example
- name: Validate Governance
  run: governance validate --verbose
```

```yaml
# GitLab CI example
validate-governance:
  script:
    - governance validate --verbose
  allow_failure: false
```

---

### `governance verify`

Run governance verification checks against policies and quality gates.

#### Synopsis

```bash
governance verify [options]
```

#### Description

Executes a suite of verification checks based on the selected profile. Different profiles run different sets of checks suitable for various stages of development (quick feedback, CI builds, releases).

#### Options

| Option | Alias | Type | Default | Description |
|--------|-------|------|---------|-------------|
| `--profile <profile>` | `-p` | string | `quick` | Verification profile: `quick`, `ci`, `release` |
| `--verbose` | `-v` | boolean | false | Show detailed verification output |

#### Verification Profiles

**Quick Profile** (Development)
- ✓ Manifest validation
- ✓ Structure validation
- **Duration:** ~5 seconds
- **Use case:** Local development, pre-commit hooks

**CI Profile** (Continuous Integration)
- ✓ Manifest validation
- ✓ Structure validation
- ✓ Policy validation
- **Duration:** ~10-15 seconds
- **Use case:** Pull requests, CI builds

**Release Profile** (Production)
- ✓ Manifest validation
- ✓ Structure validation
- ✓ Policy validation
- ✓ Security validation
- **Duration:** ~20-30 seconds
- **Use case:** Release builds, production deployments

#### Verification Checks

**Manifest Check:**
- ✓ Manifest exists and is valid
- ✓ Required commands configured (install, check:quick, check:ci)

**Structure Check:**
- ✓ Required files present (GOVERNANCE.md, VERSION, etc.)
- ✓ Core policy files exist

**Policy Check:**
- ✓ All policy files present
- ✓ Policy files have sufficient content (>100 chars)

**Security Check:**
- ✓ Security baseline policy configured
- ✓ Security requirements documented

#### Exit Codes

| Code | Meaning |
|------|---------|
| 0 | Success - all checks passed |
| 1 | Error - verification failed |

#### Examples

**Quick verification (default):**

```bash
governance verify
```

**Output:**
```
✓ Governance CLI - Verify

Project root: /path/to/project
Profile: quick

Running verification checks...

✓ Manifest exists
✓ Required commands configured
✓ Required files present

Summary:
  Total checks: 3
  Passed: 3

✅ All verification checks passed!
```

**CI verification:**

```bash
governance verify --profile=ci
```

**Release verification with verbose output:**

```bash
governance verify --profile=release --verbose
```

**Output (Verbose):**
```
✓ Governance CLI - Verify

Project root: /path/to/project
Profile: release

Running verification checks...

✓ Manifest exists
  Manifest file found and valid
✓ Required commands configured
  All required commands are configured
✓ Required files present
  All required governance files are present
✓ Policy files valid
  All policy files are present and valid
✓ Security baseline configured
  Security baseline policy is configured

Summary:
  Total checks: 5
  Passed: 5

✅ All verification checks passed!
```

**Verification failure:**

```bash
governance verify --profile=ci
```

**Output (Failed):**
```
✓ Governance CLI - Verify

Project root: /path/to/project
Profile: ci

Running verification checks...

✓ Manifest exists
  Manifest file found and valid
✗ Required commands configured
  Missing commands: install, check:ci
✓ Required files present
  All required governance files are present
✗ Policy files valid
  Invalid or missing policies: SECURITY_BASELINE.md

Summary:
  Total checks: 4
  Passed: 2
  Failed: 2

❌ Verification failed with 2 failed check(s)
```

#### Customizing Profiles

You can customize verification profiles in `.repo/repo.manifest.yaml`:

```yaml
governance:
  version: "1.0.0"
  framework: "ai-native-governance"

verify_profiles:
  quick:
    - manifest
    - structure
  ci:
    - manifest
    - structure
    - policies
  release:
    - manifest
    - structure
    - policies
    - security
  custom:
    - manifest
    - policies
    - boundaries  # Custom check
```

Then use your custom profile:

```bash
governance verify --profile=custom
```

#### Integration with CI/CD

**GitHub Actions:**
```yaml
- name: Governance Verification
  run: governance verify --profile=ci --verbose
  
- name: Pre-Release Verification
  if: github.ref == 'refs/heads/main'
  run: governance verify --profile=release --verbose
```

**GitLab CI:**
```yaml
verify-governance:
  stage: test
  script:
    - governance verify --profile=ci --verbose
  only:
    - merge_requests
    - main

release-verification:
  stage: deploy
  script:
    - governance verify --profile=release --verbose
  only:
    - tags
```

**Pre-commit Hook:**
```bash
#!/bin/bash
# .git/hooks/pre-commit
governance verify --profile=quick || exit 1
```

---

### `governance check-updates`

Check if governance framework updates are available.

#### Synopsis

```bash
governance check-updates
```

#### Description

Compares your currently installed governance version with the latest available version. Provides information about the type of update (major, minor, patch) and suggests running the update command if a newer version is available.

#### Options

No options available for this command.

#### Exit Codes

| Code | Meaning |
|------|---------|
| 0 | Success - check completed |
| 1 | Error - check failed (e.g., governance not initialized) |

#### Examples

**Check for updates:**

```bash
governance check-updates
```

**Output (Up to date):**
```
🔄 Governance CLI - Check Updates

Project root: /path/to/project

Version Information:

  Current version:  1.2.3
  Latest version:   1.2.3

✅ You are using the latest version!
```

**Output (Update available - patch):**
```
🔄 Governance CLI - Check Updates

Project root: /path/to/project

Version Information:

  Current version:  1.2.3
  Latest version:   1.2.4

📦 Update available!

Run governance update to upgrade to version 1.2.4

  🐛 Patch version update - bug fixes and improvements
```

**Output (Update available - minor):**
```
🔄 Governance CLI - Check Updates

Project root: /path/to/project

Version Information:

  Current version:  1.2.3
  Latest version:   1.3.0

📦 Update available!

Run governance update to upgrade to version 1.3.0

  📝 Minor version update - new features available
```

**Output (Update available - major):**
```
🔄 Governance CLI - Check Updates

Project root: /path/to/project

Version Information:

  Current version:  1.2.3
  Latest version:   2.0.0

📦 Update available!

Run governance update to upgrade to version 2.0.0

  ⚠️  Major version update - may include breaking changes
```

#### Version Detection

The CLI reads the version from `.repo/VERSION` file:

```bash
cat .repo/VERSION
# Output: 1.2.3
```

If the version cannot be determined:

```
⚠️  Could not determine installed version
Consider running "governance update" to ensure you have the latest version
```

#### Automated Checks

You can automate update checks in your CI/CD:

```yaml
# GitHub Actions - Weekly update check
name: Check Governance Updates

on:
  schedule:
    - cron: '0 0 * * 1'  # Every Monday at midnight

jobs:
  check-updates:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Install Governance CLI
        run: npm install -g @trevorplam/governance-cli
      - name: Check for Updates
        run: governance check-updates
```

---

### `governance update`

Update governance framework to the latest version.

#### Synopsis

```bash
governance update [options]
```

#### Description

Updates the governance framework to the latest version while preserving your customizations. The update process follows a 3-layer version system:

- **Layer 1 (Custom)**: Your customizations - PRESERVED
  - Manifest (`repo.manifest.yaml`)
  - HITL items (`hitl/`)
  - Waivers (`waivers/`)
  - ADRs (`docs/adr/`)

- **Layer 2 (Updateable)**: Policies and standards - UPDATED
  - Policy files (`policy/*.md`)
  - Documentation standards (`docs/standards/`)

- **Layer 3 (Immutable)**: Templates and automation - UPDATED
  - Templates (`templates/`)
  - Automation scripts (`automation/`)

#### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `--dry-run` | boolean | false | Show what would be updated without applying changes |
| `--force` | boolean | false | Force update even if already on latest version |
| `--no-backup` | boolean | | Skip creating backup before update |

#### Exit Codes

| Code | Meaning |
|------|---------|
| 0 | Success - update completed or no update needed |
| 1 | Error - update failed |

#### Examples

**Check what would be updated (dry run):**

```bash
governance update --dry-run
```

**Output:**
```
🔄 Governance CLI - Update

Project root: /path/to/project

Version Information:

  Current version:  1.2.3
  Latest version:   1.3.0

🔍 Dry Run Mode - No changes will be made

Files that would be updated:

  • .repo/policy/ (Layer 2 files - updateable)
  • .repo/templates/ (Layer 3 files - updateable)
  • .repo/docs/standards/ (Layer 2 files - updateable)
  • .repo/VERSION (updated to new version)

Files that would be preserved:

  • .repo/repo.manifest.yaml (Layer 1 - custom)
  • .repo/hitl/ (Layer 1 - custom)
  • .repo/waivers/ (Layer 1 - custom)
  • .repo/docs/adr/ (Layer 1 - custom)
```

**Perform update with backup (default):**

```bash
governance update
```

**Interactive confirmation:**
```
🔄 Governance CLI - Update

Project root: /path/to/project

Version Information:

  Current version:  1.2.3
  Latest version:   1.3.0

? Update governance from 1.2.3 to 1.3.0? (Y/n)
```

After confirmation:
```
📦 Creating backup...

✓ Backup created at .repo/archive/pre-update-1.2.3/

📝 Updating Layer 2 files (policies and standards)...

✓ Updated policy files
✓ Updated documentation standards

📝 Updating Layer 3 files (templates)...

✓ Updated templates
✓ Updated VERSION file
✓ Preserved custom manifest with updated version

✅ Update completed successfully!

What was updated:

  ✓ Policy files (Layer 2)
  ✓ Documentation standards (Layer 2)
  ✓ Templates (Layer 3)
  ✓ VERSION file

What was preserved:

  ✓ Your manifest customizations (Layer 1)
  ✓ HITL items (Layer 1)
  ✓ Waivers (Layer 1)
  ✓ ADRs (Layer 1)

Next steps:

  1. Run governance validate to check the updated configuration
  2. Review changes and test your project
  3. Backup is available at .repo/archive/pre-update-1.2.3/
```

**Force update (even if on latest version):**

```bash
governance update --force
```

**Update without backup (not recommended):**

```bash
governance update --no-backup
```

**Non-interactive update for CI/CD:**

```bash
# Set environment or use --force with confirmation bypass
echo "Y" | governance update
```

#### Backup and Recovery

**Automatic Backups:**

By default, `governance update` creates a backup at:
```
.repo/archive/pre-update-<version>/
```

**Manual Backup:**

Before updating, you can create a manual backup:

```bash
# Create timestamped backup
cp -r .repo .repo.backup-$(date +%Y%m%d-%H%M%S)

# Or create a git commit
git add .repo
git commit -m "Backup before governance update"
```

**Restore from Backup:**

If something goes wrong:

```bash
# Option 1: Restore from backup
rm -rf .repo
cp -r .repo/archive/pre-update-1.2.3 .repo

# Option 2: Restore from git
git checkout HEAD -- .repo
```

#### Update Workflow

Recommended workflow for updates:

```bash
# 1. Check for updates
governance check-updates

# 2. Review what will be updated
governance update --dry-run

# 3. Commit current state (optional but recommended)
git add .repo
git commit -m "Pre-update checkpoint"

# 4. Perform update
governance update

# 5. Validate updated configuration
governance validate --verbose

# 6. Run verification
governance verify --profile=ci

# 7. Test your project
npm test  # or your test command

# 8. Commit updated governance
git add .repo
git commit -m "Update governance to v1.3.0"
```

#### Troubleshooting Updates

**"Already using the latest version"**
- Use `--force` if you need to reinstall
- Check `.repo/VERSION` matches your expectation

**Update fails midway**
- Restore from backup: `.repo/archive/pre-update-<version>/`
- Check disk space: `df -h`
- Ensure write permissions: `ls -la .repo`

**Customizations lost after update**
- Layer 1 files should never be overwritten
- Check backup: `.repo/archive/pre-update-<version>/`
- Report issue if Layer 1 files were modified

---

### `governance migrate`

Apply governance migrations to enable new framework features.

#### Synopsis

```bash
governance migrate [--dry-run]
```

#### Options

| Option | Description |
|--------|-------------|
| `--dry-run` | Show pending migrations without changes |

#### Examples

```bash
governance migrate --dry-run
governance migrate
```

---

### `governance lint`

Run policy validators and governance linters.

#### Synopsis

```bash
governance lint [options]
```

#### Options

| Option | Description |
|--------|-------------|
| `--schema` | Run JSON schema validators |
| `--regex` | Run regex-based linters |
| `--opa` | Run OPA policy validators |
| `--all` | Run all validators (default if no option provided) |
| `--verbose` | Show detailed output |

#### Examples

```bash
governance lint
governance lint --schema
governance lint --regex
governance lint --opa
governance lint --all --verbose
```

---

### `governance hitl`

Manage Human-in-the-Loop (HITL) items.

#### Synopsis

```bash
governance hitl <command> [options]
```

#### Subcommands

```bash
governance hitl list
governance hitl create --summary "Review auth flow" --risk high
governance hitl assign --id HITL-001 --owner "security-team"
governance hitl resolve --id HITL-001 --resolution "Approved"
governance hitl report --format markdown --output ./hitl-report.md
```

---

### `governance waiver`

Manage governance waivers.

#### Synopsis

```bash
governance waiver <command> [options]
```

#### Subcommands

```bash
governance waiver request --policy SECURITY_BASELINE --reason "Legacy integration" --expires-at 2026-06-01T00:00:00Z
governance waiver approve --id WVR-001 --approver "security-lead"
governance waiver reject --id WVR-001 --reason "Insufficient justification"
governance waiver extend --id WVR-001 --expires-at 2026-09-01T00:00:00Z
governance waiver analytics
governance waiver export --format json --output ./waivers.json
```

---

### `governance metrics`

Collect and report governance metrics.

#### Synopsis

```bash
governance metrics <command> [options]
```

#### Subcommands

**Collect metrics**
```bash
governance metrics collect [--verbose]
```

**Report metrics**
```bash
governance metrics report [--format text|json|markdown]
```

**Run local dashboard**
```bash
governance metrics dashboard [--port 3579]
```

#### Options

| Command | Option | Alias | Description |
|---------|--------|-------|-------------|
| collect | `--verbose` | `-v` | Show detailed metrics output |
| report | `--format <format>` | `-f` | Output format: text, json, markdown |
| dashboard | `--port <port>` | `-p` | Dashboard port (default 3579) |

---

### `governance maturity-check`

Assess governance maturity level for the current repository.

#### Synopsis

```bash
governance maturity-check [options]
```

#### Description

Evaluates maturity criteria and reports the current level, gaps, and next-level requirements.

#### Options

| Option | Alias | Type | Default | Description |
|--------|-------|------|---------|-------------|
| `--json` | | boolean | false | Output report as JSON |
| `--report <path>` | `-r` | string | | Write JSON report to a file |
| `--verbose` | `-v` | boolean | false | Show detailed criteria results |

#### Examples

```bash
governance maturity-check
governance maturity-check --verbose
governance maturity-check --report ./maturity-report.json
governance maturity-check --json
```

#### Output (Summary)

```
📊 Governance CLI - Maturity Check

Project root: /path/to/project
Criteria version: 1.0.0
Current maturity: Level 2 - Managed
Next target: Level 3 - Defined

Summary: 6 passed, 2 failed
```

---

## Exit Codes

All CLI commands follow standard Unix exit code conventions:

| Code | Meaning | When It Occurs |
|------|---------|----------------|
| 0 | Success | Command completed successfully |
| 1 | Error | Command failed (validation errors, missing files, etc.) |
| 130 | Interrupted | User cancelled with Ctrl+C |

### Exit Code Examples

```bash
# Check exit code in bash
governance validate
echo $?  # Output: 0 (success) or 1 (failure)

# Use exit code in scripts
if governance verify --profile=ci; then
    echo "Verification passed"
    npm run deploy
else
    echo "Verification failed"
    exit 1
fi

# CI/CD example (GitHub Actions)
- name: Verify Governance
  run: |
    governance verify --profile=ci || exit 1
```

---

## Configuration

### Manifest File

The primary configuration file is `.repo/repo.manifest.yaml`:

```yaml
governance:
  version: "1.0.0"
  framework: "ai-native-governance"

commands:
  install: "npm install"
  check:quick: "npm run lint && npm test"
  check:ci: "npm run lint && npm test && npm run build"
  test:all: "npm test"
  test:unit: "npm run test:unit"
  test:integration: "npm run test:integration"
  lint:check: "npm run lint"
  lint:fix: "npm run lint:fix"
  build: "npm run build"
  build:prod: "npm run build:prod"
  dev: "npm run dev"

verify_profiles:
  quick:
    - manifest
    - structure
  ci:
    - manifest
    - structure
    - policies
  release:
    - manifest
    - structure
    - policies
    - security

boundaries:
  layers:
    presentation:
      - "src/components/**"
      - "src/pages/**"
    business:
      - "src/services/**"
      - "src/models/**"
    data:
      - "src/repositories/**"
      - "src/db/**"
  features:
    - "src/features/auth/**"
    - "src/features/user/**"

security:
  hitl_triggers:
    - "authentication"
    - "authorization"
    - "encryption"
    - "payment"
  forbidden_patterns:
    - "eval("
    - "Function("
    - "dangerouslySetInnerHTML"
```

### Command Placeholders

If auto-fill doesn't detect your commands, you'll see placeholders:

- `<FILL_FROM_REPO>` - Should be filled from your repository
- `<UNKNOWN>` - Not detected, fill if applicable
- `<NOT_APPLICABLE>` - Intentionally not used in this project

### Policy Files

Policy files in `.repo/policy/` control governance behavior:

| File | Purpose | Customizable |
|------|---------|--------------|
| `CONSTITUTION.md` | Core principles and non-negotiables | Layer 2 - Updated |
| `PRINCIPLES.md` | Development principles | Layer 2 - Updated |
| `QUALITY_GATES.md` | Quality requirements | Layer 2 - Updated |
| `SECURITY_BASELINE.md` | Security standards | Layer 2 - Updated |
| `BOUNDARIES.md` | Architectural boundaries | Layer 2 - Updated |
| `HITL.md` | Human-in-the-loop policy | Layer 2 - Updated |
| `WAIVERS.md` | Waiver process | Layer 2 - Updated |

---

## Environment Variables

The CLI respects the following environment variables:

| Variable | Default | Description |
|----------|---------|-------------|
| `GOVERNANCE_SKIP_INTERACTIVE` | `false` | Skip interactive prompts (use defaults) |
| `GOVERNANCE_TIER` | `standard` | Default tier for initialization |
| `GOVERNANCE_AUTO_FILL` | `true` | Enable auto-fill of manifest commands |
| `NODE_ENV` | | Affects behavior in `production` vs `development` |

### Examples

```bash
# Non-interactive initialization in CI/CD
GOVERNANCE_SKIP_INTERACTIVE=true governance init

# Initialize with minimal tier by default
GOVERNANCE_TIER=minimal governance init

# Disable auto-fill
GOVERNANCE_AUTO_FILL=false governance init
```

---

## Examples

### Quick Start

```bash
# Initialize governance in your project
cd /path/to/your/project
governance init

# Review generated files
ls -la .repo/

# Validate configuration
governance validate

# Run quick verification
governance verify
```

### CI/CD Integration

**GitHub Actions Complete Example:**

```yaml
name: Governance Checks

on:
  pull_request:
    branches: [main, develop]
  push:
    branches: [main]

jobs:
  governance:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout Code
        uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install Governance CLI
        run: npm install -g @trevorplam/governance-cli
      
      - name: Validate Governance
        run: governance validate --verbose
      
      - name: Verify Governance (PR)
        if: github.event_name == 'pull_request'
        run: governance verify --profile=ci --verbose
      
      - name: Verify Governance (Release)
        if: github.event_name == 'push' && github.ref == 'refs/heads/main'
        run: governance verify --profile=release --verbose
      
      - name: Check for Updates
        run: governance check-updates
```

**GitLab CI Complete Example:**

```yaml
stages:
  - validate
  - verify
  - check

variables:
  GOVERNANCE_CLI_VERSION: "latest"

before_script:
  - npm install -g @trevorplam/governance-cli@${GOVERNANCE_CLI_VERSION}

validate-governance:
  stage: validate
  script:
    - governance validate --verbose
  only:
    - merge_requests
    - main

verify-ci:
  stage: verify
  script:
    - governance verify --profile=ci --verbose
  only:
    - merge_requests

verify-release:
  stage: verify
  script:
    - governance verify --profile=release --verbose
  only:
    - main
    - tags

check-updates:
  stage: check
  script:
    - governance check-updates
  only:
    - schedules
```

### Git Hooks

**Pre-commit Hook:**

```bash
#!/bin/bash
# .git/hooks/pre-commit

echo "Running governance verification..."

if ! governance verify --profile=quick; then
    echo "❌ Governance verification failed!"
    echo "Fix the issues or use 'git commit --no-verify' to skip (not recommended)"
    exit 1
fi

echo "✅ Governance verification passed!"
```

**Pre-push Hook:**

```bash
#!/bin/bash
# .git/hooks/pre-push

echo "Running comprehensive governance checks..."

# Validate
if ! governance validate; then
    echo "❌ Governance validation failed!"
    exit 1
fi

# Verify
if ! governance verify --profile=ci; then
    echo "❌ Governance verification failed!"
    exit 1
fi

echo "✅ All governance checks passed!"
```

### Makefile Integration

```makefile
.PHONY: governance-init governance-validate governance-verify governance-update

governance-init:
	@echo "Initializing governance..."
	governance init --tier=standard

governance-validate:
	@echo "Validating governance..."
	governance validate --verbose

governance-verify:
	@echo "Running governance verification..."
	governance verify --profile=ci --verbose

governance-verify-release:
	@echo "Running release verification..."
	governance verify --profile=release --verbose

governance-update:
	@echo "Checking for updates..."
	governance check-updates
	@echo "Updating governance..."
	governance update --dry-run
	@read -p "Proceed with update? (y/n) " -n 1 -r; \
	echo; \
	if [[ $$REPLY =~ ^[Yy]$$ ]]; then \
		governance update; \
	fi

# Include in CI target
ci: governance-validate governance-verify test build

# Include in release target
release: governance-validate governance-verify-release test build
```

### NPM Scripts Integration

```json
{
  "scripts": {
    "governance:init": "governance init",
    "governance:validate": "governance validate --verbose",
    "governance:verify": "governance verify --profile=ci",
    "governance:verify:quick": "governance verify --profile=quick",
    "governance:verify:release": "governance verify --profile=release",
    "governance:update": "governance check-updates && governance update --dry-run",
    "pretest": "npm run governance:validate",
    "prepush": "npm run governance:verify",
    "prerelease": "npm run governance:verify:release"
  }
}
```

Then use:

```bash
npm run governance:validate
npm run governance:verify
npm run governance:update
```

---

## Troubleshooting

### Common Issues

#### "Command not found: governance"

**Cause:** CLI not installed or not in PATH

**Solutions:**
```bash
# Check if installed
npm list -g @trevorplam/governance-cli

# Install globally
npm install -g @trevorplam/governance-cli

# For local development
cd tools/governance-cli
npm link

# Check PATH
echo $PATH
which governance

# Manually add to PATH if needed
export PATH="$PATH:/usr/local/bin"
```

#### "Governance not initialized"

**Cause:** Running commands before `governance init`

**Solution:**
```bash
# Initialize first
governance init

# Then run other commands
governance validate
```

#### "Templates not found"

**Cause:** CLI can't locate template files

**Solutions:**
```bash
# Ensure you have the complete repository
ls -la ../../templates/

# Run from project root, not CLI directory
cd /path/to/your/project  # NOT /path/to/governance/tools/governance-cli
governance init

# Reinstall CLI
npm uninstall -g @trevorplam/governance-cli
npm install -g @trevorplam/governance-cli
```

#### "Permission denied"

**Cause:** Insufficient file permissions

**Solutions:**
```bash
# Check permissions
ls -la .repo/

# Fix ownership
sudo chown -R $USER:$USER .repo/

# Fix permissions
chmod -R u+rw .repo/

# On Unix, ensure bin is executable
chmod +x /usr/local/lib/node_modules/@trevorplam/governance-cli/bin/governance
```

#### "YAML parsing error"

**Cause:** Invalid YAML syntax in manifest

**Solutions:**
```bash
# Validate YAML syntax
cat .repo/repo.manifest.yaml | yaml-validator

# Check for common issues:
# - Incorrect indentation (use spaces, not tabs)
# - Missing colons
# - Unquoted special characters

# Example of fixing:
# Wrong:
commands:
install:npm install  # Missing space after colon

# Correct:
commands:
  install: "npm install"
```

#### Auto-fill not working

**Cause:** Project type not detected

**Solutions:**
```bash
# Check if project files exist
ls -la package.json pyproject.toml pom.xml build.gradle

# Manually fill manifest
vim .repo/repo.manifest.yaml

# Disable auto-fill and use manual configuration
governance init --no-auto-fill
```

#### Validation warnings persist

**Cause:** Placeholders or missing configuration

**Solutions:**
```bash
# Check which commands need filling
governance validate --verbose

# Edit manifest
vim .repo/repo.manifest.yaml

# Replace placeholders
# <FILL_FROM_REPO> → actual command
# <UNKNOWN> → actual command or <NOT_APPLICABLE>

# Re-validate
governance validate
```

#### Update fails midway

**Cause:** Disk space, permissions, or network issues

**Solutions:**
```bash
# Check disk space
df -h

# Restore from backup
cp -r .repo/archive/pre-update-1.2.3 .repo-restored
mv .repo .repo-failed
mv .repo-restored .repo

# Or restore from git
git checkout HEAD -- .repo

# Check for write permissions
ls -la .repo/
```

#### CLI version mismatch

**Cause:** Multiple versions installed

**Solutions:**
```bash
# Check all installed versions
npm list -g @trevorplam/governance-cli

# Uninstall all
npm uninstall -g @trevorplam/governance-cli

# Remove npm link (if used)
npm unlink -g @trevorplam/governance-cli

# Clean npm cache
npm cache clean --force

# Reinstall specific version
npm install -g @trevorplam/governance-cli@1.0.0
```

### Debug Mode

Enable verbose output for debugging:

```bash
# Set debug environment variable
DEBUG=governance:* governance init

# Or use verbose flag
governance validate --verbose
governance verify --profile=ci --verbose
```

### Getting Help

```bash
# Show help for all commands
governance --help

# Show help for specific command
governance init --help
governance validate --help
governance verify --help
governance update --help

# Check version
governance --version

# Check installation
which governance
npm list -g @trevorplam/governance-cli
```

### Log Files

The CLI doesn't create log files by default, but you can capture output:

```bash
# Capture stdout and stderr
governance verify --verbose > governance.log 2>&1

# Capture only errors
governance verify 2> governance-errors.log

# Capture with timestamp
governance verify 2>&1 | while IFS= read -r line; do echo "$(date '+%Y-%m-%d %H:%M:%S') $line"; done > governance.log
```

---

## Advanced Usage

### Scripting with the CLI

**Bash Script Example:**

```bash
#!/bin/bash
# deploy.sh - Deployment script with governance checks

set -e  # Exit on error

echo "=== Pre-Deployment Governance Checks ==="

# Validate configuration
echo "Validating governance configuration..."
if ! governance validate; then
    echo "❌ Governance validation failed!"
    exit 1
fi

# Run release verification
echo "Running release verification..."
if ! governance verify --profile=release; then
    echo "❌ Governance verification failed!"
    exit 1
fi

# Check for updates
echo "Checking for governance updates..."
governance check-updates

echo "✅ All governance checks passed!"
echo "=== Proceeding with Deployment ==="

# Continue with deployment...
npm run build
npm run deploy
```

**Python Script Example:**

```python
#!/usr/bin/env python3
import subprocess
import sys

def run_governance_check(command):
    """Run governance CLI command and handle errors."""
    try:
        result = subprocess.run(
            command,
            shell=True,
            check=True,
            capture_output=True,
            text=True
        )
        print(result.stdout)
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ Command failed: {command}", file=sys.stderr)
        print(e.stderr, file=sys.stderr)
        return False

def main():
    print("=== Running Governance Checks ===")
    
    # Validate
    if not run_governance_check("governance validate --verbose"):
        sys.exit(1)
    
    # Verify
    if not run_governance_check("governance verify --profile=ci --verbose"):
        sys.exit(1)
    
    print("✅ All checks passed!")

if __name__ == "__main__":
    main()
```

### Parsing CLI Output

**Extract Exit Code:**

```bash
#!/bin/bash
governance verify --profile=ci
EXIT_CODE=$?

if [ $EXIT_CODE -eq 0 ]; then
    echo "Success!"
elif [ $EXIT_CODE -eq 1 ]; then
    echo "Failed!"
else
    echo "Unknown error"
fi
```

**Parse JSON Output (Future Enhancement):**

```bash
# Note: JSON output not currently supported, but planned
# governance verify --profile=ci --format=json > results.json
# jq '.summary.passed' results.json
```

### Custom Verification Profiles

Create custom verification profiles for specific scenarios:

```yaml
# .repo/repo.manifest.yaml
verify_profiles:
  # Standard profiles
  quick: [manifest, structure]
  ci: [manifest, structure, policies]
  release: [manifest, structure, policies, security]
  
  # Custom profiles
  security-only:
    - security
  
  pre-commit:
    - manifest
    - structure
  
  full-audit:
    - manifest
    - structure
    - policies
    - security
    - boundaries
  
  hotfix:
    - manifest
```

Use custom profiles:

```bash
governance verify --profile=security-only
governance verify --profile=pre-commit
governance verify --profile=full-audit
```

### Batch Operations

**Update multiple projects:**

```bash
#!/bin/bash
# update-all-projects.sh

PROJECTS=(
    "/path/to/project1"
    "/path/to/project2"
    "/path/to/project3"
)

for project in "${PROJECTS[@]}"; do
    echo "=== Updating $project ==="
    cd "$project" || continue
    
    # Check for updates
    governance check-updates
    
    # Update with dry-run first
    governance update --dry-run
    
    # Prompt for confirmation
    read -p "Update $project? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        governance update
        governance validate
    fi
done
```

### Docker Integration

**Dockerfile:**

```dockerfile
FROM node:18-alpine

# Install Governance CLI
RUN npm install -g @trevorplam/governance-cli

# Copy project
WORKDIR /app
COPY . .

# Verify governance
RUN governance validate && \
    governance verify --profile=ci

# Continue with app setup...
RUN npm install
RUN npm run build

CMD ["npm", "start"]
```

**Docker Compose:**

```yaml
version: '3.8'

services:
  app:
    build: .
    volumes:
      - .:/app
    command: |
      sh -c "
        governance validate &&
        governance verify --profile=ci &&
        npm run dev
      "
```

### Monitoring and Alerting

**Slack Notification Example:**

```bash
#!/bin/bash
# notify-governance-status.sh

SLACK_WEBHOOK_URL="https://hooks.slack.com/services/YOUR/WEBHOOK/URL"

# Run verification
if governance verify --profile=ci > /tmp/governance-output.txt 2>&1; then
    STATUS="success"
    COLOR="good"
    MESSAGE="✅ Governance verification passed"
else
    STATUS="failure"
    COLOR="danger"
    MESSAGE="❌ Governance verification failed"
fi

# Send to Slack
curl -X POST "$SLACK_WEBHOOK_URL" \
  -H "Content-Type: application/json" \
  -d "{
    \"attachments\": [{
      \"color\": \"$COLOR\",
      \"title\": \"Governance Check\",
      \"text\": \"$MESSAGE\",
      \"fields\": [{
        \"title\": \"Project\",
        \"value\": \"$(basename $(pwd))\",
        \"short\": true
      }, {
        \"title\": \"Status\",
        \"value\": \"$STATUS\",
        \"short\": true
      }]
    }]
  }"
```

---

## Additional Commands (Future Enhancements)

The following commands are planned for future releases:

### `governance security` (Planned)

Run security checks and scans.

```bash
# Run security scan
governance security scan

# Check security baseline
governance security check

# Generate security report
governance security report
```

### `governance check-boundaries` (Planned)

Validate architectural boundaries.

```bash
# Check all boundaries
governance check-boundaries

# Check specific layer
governance check-boundaries --layer=business

# Generate boundary violations report
governance check-boundaries --report
```

---

## Related Documentation

- **[Governance Framework Overview](../.repo/GOVERNANCE.md)** - Understanding governance concepts
- **[How To: Configure Manifest](../guides/HOW_TO_CONFIGURE_MANIFEST.md)** - Detailed manifest configuration
- **[How To: Customize Policies](../guides/HOW_TO_CUSTOMIZE_POLICIES.md)** - Customizing policy files
- **[How To: Define Boundaries](../guides/HOW_TO_DEFINE_BOUNDARIES.md)** - Setting up architectural boundaries
- **[How To: Integrate CI/CD](../guides/HOW_TO_INTEGRATE_CI_CD.md)** - CI/CD integration guide
- **[How To: Manage Waivers](../guides/HOW_TO_MANAGE_WAIVERS.md)** - Policy waiver management
- **[Contributing Guide](../../CONTRIBUTING.md)** - Contributing to the project

---

## Support

### Getting Help

- **Documentation**: Check the guides in `docs/guides/`
- **Issues**: Report bugs or request features on GitHub Issues
- **Discussions**: Ask questions in GitHub Discussions
- **CLI Help**: Run `governance --help` or `governance <command> --help`

### Reporting Issues

When reporting issues, include:

1. **CLI Version**: `governance --version`
2. **Node Version**: `node --version`
3. **Operating System**: `uname -a` (Unix) or `ver` (Windows)
4. **Command Used**: Full command that failed
5. **Error Output**: Complete error message and stack trace
6. **Project Context**: Project type (Node.js, Python, etc.)

Example issue template:

```markdown
**CLI Version:** 1.0.0
**Node Version:** 18.17.0
**OS:** Ubuntu 22.04 LTS

**Command:**
governance verify --profile=ci

**Error:**
Error during verification:
ENOENT: no such file or directory, open '.repo/VERSION'

**Context:**
Running in a Node.js project with npm
Governance was initialized with: governance init --tier=standard
```

---

## Appendix

### Command Summary Table

| Command | Purpose | Time | Exit Codes |
|---------|---------|------|------------|
| `governance init` | Initialize governance | 5-10s | 0, 1 |
| `governance validate` | Validate configuration | 2-5s | 0, 1 |
| `governance verify` | Run verification checks | 5-30s | 0, 1 |
| `governance check-updates` | Check for updates | 2-3s | 0, 1 |
| `governance update` | Update framework | 10-20s | 0, 1 |
| `governance migrate` | Apply governance migrations | 5-15s | 0, 1 |
| `governance lint` | Run policy validators | 2-5s | 0, 1 |
| `governance hitl` | Manage HITL items | 1-3s | 0, 1 |
| `governance waiver` | Manage waivers | 1-3s | 0, 1 |
| `governance metrics collect` | Collect governance metrics | 2-5s | 0, 1 |
| `governance metrics report` | Report governance metrics | 1-2s | 0, 1 |
| `governance metrics dashboard` | Run local metrics dashboard | 1-2s | 0, 1 |
| `governance maturity-check` | Assess maturity level | 2-5s | 0, 1 |

### File Structure Reference

```
.repo/
├── GOVERNANCE.md              # Entry point and overview
├── VERSION                    # Current governance version
├── repo.manifest.yaml         # Configuration and commands
├── policy/                    # Governance policies (Layer 2)
│   ├── CONSTITUTION.md
│   ├── PRINCIPLES.md
│   ├── QUALITY_GATES.md
│   ├── SECURITY_BASELINE.md
│   ├── BOUNDARIES.md
│   ├── HITL.md
│   └── WAIVERS.md
├── agents/                    # AI agent framework (Standard+)
│   ├── README.md
│   └── ... (11 files)
├── templates/                 # Document templates (Standard+)
│   ├── ADR_TEMPLATE.md
│   └── ... (7 files)
├── docs/                      # Documentation (Standard+)
│   ├── standards/
│   └── adr/
├── automation/                # Automation scripts (Complete)
├── metrics/                   # Metrics config + reports (Layer 1)
├── hitl/                      # Human-in-the-loop tracking (Layer 1)
├── waivers/                   # Policy waivers (Layer 1)
├── audit/                     # Audit trail (Layer 1)
└── archive/                   # Backups and archives
```

### Version System

| Layer | Files | Update Behavior |
|-------|-------|-----------------|
| **Layer 1** (Custom) | Manifest, HITL, Waivers, Metrics, Audit, ADRs | Always preserved |
| **Layer 2** (Updateable) | Policies, Standards | Updated on `governance update` |
| **Layer 3** (Immutable) | Templates, Automation | Updated on `governance update` |

### Glossary

- **ADR**: Architecture Decision Record
- **CI/CD**: Continuous Integration / Continuous Deployment
- **HITL**: Human-in-the-Loop - decisions requiring human review
- **Manifest**: Configuration file (repo.manifest.yaml)
- **Policy**: Governance rules and standards
- **Tier**: Level of governance (Minimal, Standard, Complete)
- **Verification Profile**: Set of checks to run (quick, ci, release)
- **Waiver**: Temporary exception to a policy

---

**Document Version:** 1.0.0  
**Last Updated:** 2026-01-22  
**Maintained By:** Governance Framework Team
