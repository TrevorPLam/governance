# Troubleshooting Guide

**Comprehensive problem-solving guide for the AI-Native Governance Framework**

---

## Table of Contents

1. [Installation Issues](#installation-issues)
2. [CLI Errors](#cli-errors)
3. [CI/CD Failures](#cicd-failures)
4. [Boundary Violations](#boundary-violations)
5. [Agent Errors](#agent-errors)
6. [Performance Issues](#performance-issues)
7. [Configuration Errors](#configuration-errors)
8. [Integration Problems](#integration-problems)
9. [Security Scan Failures](#security-scan-failures)
10. [Build/Test Failures](#buildtest-failures)
11. [Update Problems](#update-problems)
12. [Getting Help](#getting-help)

---

## Installation Issues

### Issue 1: Command Not Found After Installation

**Symptoms:**
```bash
$ governance-cli --version
bash: governance-cli: command not found
```

**Possible Causes:**
- CLI not in PATH
- Installation incomplete
- Wrong installation method
- Shell cache needs refresh

**Solutions:**

**Solution A: Verify installation path**
```bash
# For npm global install
npm list -g @governance/cli

# Check PATH
echo $PATH

# Add to PATH if needed (add to ~/.bashrc or ~/.zshrc)
export PATH="$PATH:$(npm root -g)/.bin"
```

**Solution B: Reinstall with correct method**
```bash
# Uninstall first
npm uninstall -g @governance/cli

# Clear npm cache
npm cache clean --force

# Reinstall
npm install -g @governance/cli

# Verify
governance-cli --version
```

**Solution C: Use npx (temporary workaround)**
```bash
npx @governance/cli --version
```

**Prevention:**
- Use recommended installation method for your OS
- Verify PATH configuration during installation
- Test with `governance-cli --version` immediately after install

**When to ask for help:** If reinstalling doesn't work and npx also fails

---

### Issue 2: Permission Denied During Installation

**Symptoms:**
```bash
$ npm install -g @governance/cli
npm ERR! Error: EACCES: permission denied, mkdir '/usr/local/lib/node_modules/@governance'
```

**Possible Causes:**
- Insufficient permissions for global installation
- npm installed with sudo
- Incorrect npm configuration

**Solutions:**

**Solution A: Use npm without sudo (recommended)**
```bash
# Configure npm to use local directory
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'

# Add to PATH (add to ~/.bashrc or ~/.zshrc)
export PATH=~/.npm-global/bin:$PATH

# Reload shell
source ~/.bashrc

# Install without sudo
npm install -g @governance/cli
```

**Solution B: Fix npm permissions**
```bash
# Fix ownership of npm directories
sudo chown -R $(whoami) $(npm config get prefix)/{lib/node_modules,bin,share}

# Try installation again
npm install -g @governance/cli
```

**Solution C: Use sudo (not recommended)**
```bash
sudo npm install -g @governance/cli --unsafe-perm=true
```

**Prevention:**
- Never use sudo with npm
- Configure npm to use local directory
- Use nvm (Node Version Manager) for proper isolation

**When to ask for help:** If you cannot modify npm configuration due to company policies

---

### Issue 3: Version Conflicts or Incompatibilities

**Symptoms:**
```bash
$ governance-cli init
Error: Node.js version 14.x is not supported. Please upgrade to 16.x or higher.
```

**Possible Causes:**
- Node.js version too old
- Python version incompatible
- Dependency version conflicts

**Solutions:**

**Solution A: Update Node.js**
```bash
# Check current version
node --version

# Using nvm (recommended)
nvm install 18
nvm use 18
nvm alias default 18

# Verify
node --version

# Reinstall CLI
npm install -g @governance/cli
```

**Solution B: Check all prerequisites**
```bash
# Run diagnostics
governance-cli doctor

# Shows:
# ✅ Node.js 18.x (required: 16+)
# ✅ Python 3.10 (required: 3.8+)
# ✅ Git 2.35 (required: 2.20+)
# ❌ Docker not found (optional)
```

**Solution C: Use specific version**
```bash
# Install specific compatible version
npm install -g @governance/cli@1.0.0

# Pin version in project
npm install --save-dev @governance/cli@^1.0.0
```

**Prevention:**
- Keep Node.js and Python updated
- Use nvm/pyenv for version management
- Run `governance-cli doctor` before starting
- Check compatibility matrix in documentation

**When to ask for help:** If your environment has locked versions you cannot change

---

### Issue 4: Missing Dependencies During Installation

**Symptoms:**
```bash
$ governance-cli verify
Error: Cannot find module 'yaml'
```

**Possible Causes:**
- Incomplete installation
- Corrupted node_modules
- Network issues during installation

**Solutions:**

**Solution A: Reinstall dependencies**
```bash
# Uninstall
npm uninstall -g @governance/cli

# Clear cache
npm cache clean --force

# Reinstall with verbose logging
npm install -g @governance/cli --verbose
```

**Solution B: Install missing dependencies manually**
```bash
# Check what's missing
npm list -g --depth=0

# Install dependencies
npm install -g yaml
```

**Solution C: Use offline installation**
```bash
# Download tarball
npm pack @governance/cli

# Install from tarball
npm install -g governance-cli-1.0.0.tgz
```

**Prevention:**
- Ensure stable network connection during installation
- Use npm registry mirror if corporate firewall blocks registry
- Install from tarball in restricted environments

**When to ask for help:** If installation repeatedly fails at the same dependency

---

## CLI Errors

### Issue 5: Validation Failed - Invalid Manifest

**Symptoms:**
```bash
$ governance-cli validate
❌ Validation failed: Invalid manifest
Error: /project: missing required field 'name'
```

**Possible Causes:**
- Missing required fields
- Invalid YAML syntax
- Wrong file format
- Incorrect schema version

**Solutions:**

**Solution A: Check for missing fields**
```bash
# Validate with detailed output
governance-cli validate --manifest --verbose

# Shows exactly what's missing:
# ❌ project.name: required field missing
# ❌ governance.version: required field missing

# Fix manifest
vi repo.manifest.yaml
```

```yaml
# Add missing fields
project:
  name: my-project  # Add this
  type: fullstack

governance:
  version: "1.0.0"  # Add this
```

**Solution B: Validate YAML syntax**
```bash
# Check YAML syntax
yamllint repo.manifest.yaml

# Or use online validator
# https://www.yamllint.com/

# Common YAML errors:
# - Incorrect indentation
# - Missing colons
# - Unquoted special characters
```

**Solution C: Use template**
```bash
# Generate valid template
governance-cli init --template-only

# Copy and modify
cp .repo/templates/repo.manifest.yaml.template repo.manifest.yaml
```

**Prevention:**
- Use IDE with YAML validation (VSCode + YAML extension)
- Validate after every change
- Use schema validation
- Keep template as reference

**When to ask for help:** If validation fails but you cannot identify what's wrong

---

### Issue 6: Command Execution Failures

**Symptoms:**
```bash
$ governance-cli verify
Error: Command failed: npm test
npm ERR! Test suite failed to run
```

**Possible Causes:**
- Custom commands in manifest are invalid
- Dependencies not installed
- Environment variables missing
- Wrong working directory

**Solutions:**

**Solution A: Test commands manually**
```bash
# Run the failing command directly
npm test

# Check what's failing
# Fix the underlying issue first

# Then retry governance check
governance-cli verify
```

**Solution B: Check manifest commands**
```yaml
# repo.manifest.yaml
commands:
  validate:
    run: npm test  # Make sure this works
    working_dir: .  # Check working directory
    env:  # Check environment variables
      NODE_ENV: test
```

**Solution C: Use dry-run**
```bash
# See what would be executed without running
governance-cli verify --dry-run

# Shows:
# Would execute: npm test
# Working directory: /path/to/project
# Environment: NODE_ENV=test
```

**Prevention:**
- Test commands manually before adding to manifest
- Use absolute paths for scripts
- Document required environment variables
- Set up environment properly before running governance checks

**When to ask for help:** If command works manually but fails through governance CLI

---

### Issue 7: Waiver Creation Failures

**Symptoms:**
```bash
$ governance-cli waiver create --file src/legacy.js --policy code-coverage
Error: Cannot create waiver: file 'src/legacy.js' not found
```

**Possible Causes:**
- File path incorrect
- Policy name invalid
- Missing required parameters
- Insufficient permissions

**Solutions:**

**Solution A: Verify file and policy**
```bash
# Check file exists
ls -la src/legacy.js

# List available policies
governance-cli policies list

# Create waiver with correct parameters
governance-cli waiver create \
  --file "src/legacy.js" \
  --policy "code-coverage" \
  --reason "Legacy code, refactoring planned" \
  --expires "2024-12-31"
```

**Solution B: Use interactive mode**
```bash
# Interactive waiver creation
governance-cli waiver create --interactive

# Prompts for:
# - File/pattern to waive
# - Policy to waive
# - Reason
# - Expiration date
# - Owner
```

**Solution C: Check permissions**
```bash
# Verify you can create waivers
governance-cli permissions check

# Shows your permissions:
# ✅ create_waivers: true
# ✅ approve_waivers: false
```

**Prevention:**
- Use tab completion for file paths
- List policies before creating waivers
- Use interactive mode when unsure
- Document waiver process for team

**When to ask for help:** If you have correct permissions but waiver creation still fails

---

### Issue 8: HITL Escalation Not Working

**Symptoms:**
```bash
$ governance-cli hitl escalate
Error: No HITL approvers configured
```

**Possible Causes:**
- No approvers configured in manifest
- Notification system not set up
- Invalid approver email addresses
- Network issues

**Solutions:**

**Solution A: Configure approvers**
```yaml
# repo.manifest.yaml
hitl:
  approvers:
    default: ["tech-lead@company.com"]
    security: ["security-team@company.com"]
    architecture: ["architect@company.com"]
  
  notification:
    method: email  # email, slack, github
    email:
      smtp_server: smtp.company.com
      from: governance@company.com
```

**Solution B: Test notification system**
```bash
# Test notifications
governance-cli hitl test-notification \
  --to "tech-lead@company.com"

# Should send test email/message
```

**Solution C: Use manual escalation**
```bash
# Create HITL issue manually
governance-cli hitl create \
  --type boundary-violation \
  --description "Need approval for refactoring" \
  --notify-manually

# Then notify approver through other channels
```

**Prevention:**
- Configure approvers during initial setup
- Test notification system before going live
- Have fallback notification method
- Document escalation process

**When to ask for help:** If notifications are configured but not being sent

---

## CI/CD Failures

### Issue 9: Governance Checks Timeout in CI/CD

**Symptoms:**
```yaml
# GitHub Actions log
Error: The operation was canceled.
governance-cli verify timed out after 10 minutes
```

**Possible Causes:**
- Checks taking too long
- CI/CD timeout too short
- Performance regression
- Hanging process

**Solutions:**

**Solution A: Increase timeout**
```yaml
# .github/workflows/governance.yml
jobs:
  governance:
    runs-on: ubuntu-latest
    timeout-minutes: 30  # Increase from default 10
    steps:
      - name: Governance Checks
        run: governance-cli verify
        timeout-minutes: 20  # Also increase step timeout
```

**Solution B: Use fast mode**
```yaml
# .github/workflows/governance.yml
jobs:
  governance-fast:
    runs-on: ubuntu-latest
    steps:
      - name: Fast Checks
        run: governance-cli verify --fast
  
  governance-full:
    runs-on: ubuntu-latest
    # Only run on main branch
    if: github.ref == 'refs/heads/main'
    steps:
      - name: Full Checks
        run: governance-cli verify --full
```

**Solution C: Debug hanging process**
```bash
# Run with debug logging
governance-cli verify --debug --verbose

# Shows what's taking time:
# [DEBUG] Running security scan... (5m 23s)
# [DEBUG] Scanning 50,000 files...
```

**Solution D: Run checks incrementally**
```yaml
# Only check changed files in PRs
- name: Governance Checks
  run: |
    if [ "${{ github.event_name }}" == "pull_request" ]; then
      governance-cli verify --incremental
    else
      governance-cli verify --full
    fi
```

**Prevention:**
- Set reasonable timeouts (20-30 minutes)
- Use incremental checks for PRs
- Profile checks to identify bottlenecks
- Cache dependencies and scan results

**When to ask for help:** If checks consistently timeout even with increased limits

---

### Issue 10: Authentication Failures in CI/CD

**Symptoms:**
```bash
# CI/CD log
Error: Failed to authenticate with GitHub API
Error: GITHUB_TOKEN is not set
```

**Possible Causes:**
- Missing environment variables
- Expired tokens
- Insufficient token permissions
- Network/firewall issues

**Solutions:**

**Solution A: Configure secrets**
```yaml
# GitHub Actions
- name: Governance Checks
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
    GOVERNANCE_API_KEY: ${{ secrets.GOVERNANCE_API_KEY }}
  run: governance-cli verify
```

```yaml
# GitLab CI
governance:
  script:
    - governance-cli verify
  variables:
    GITLAB_TOKEN: $CI_JOB_TOKEN
```

**Solution B: Check token permissions**
```yaml
# GitHub Actions - set permissions explicitly
permissions:
  contents: read
  issues: write
  pull-requests: write
  security-events: write

jobs:
  governance:
    runs-on: ubuntu-latest
    steps:
      - run: governance-cli verify
```

**Solution C: Use service account**
```bash
# Create service account token
# Add to CI/CD secrets

# Use in workflow
env:
  GITHUB_TOKEN: ${{ secrets.GOVERNANCE_SERVICE_TOKEN }}
```

**Prevention:**
- Document required secrets
- Use service accounts for CI/CD
- Set explicit permissions
- Rotate tokens regularly
- Monitor token usage

**When to ask for help:** If authentication fails despite correct token configuration

---

### Issue 11: CI/CD Pipeline Fails But Local Checks Pass

**Symptoms:**
```bash
# Local
$ governance-cli verify
✅ All checks passed

# CI/CD
governance-cli verify
❌ Security scan failed: vulnerabilities found
```

**Possible Causes:**
- Different environment (Node version, OS, etc.)
- Missing files in CI/CD
- Different configuration
- Cached results locally

**Solutions:**

**Solution A: Reproduce CI environment locally**
```bash
# Use same Node version
nvm use 18

# Clear cache
governance-cli verify --no-cache

# Use CI mode
governance-cli verify --ci
```

**Solution B: Check what's different**
```yaml
# .github/workflows/governance.yml
- name: Debug Environment
  run: |
    node --version
    npm --version
    governance-cli --version
    governance-cli doctor
    ls -la .repo/
```

**Solution C: Fix environment differences**
```yaml
# Lock Node version
- uses: actions/setup-node@v3
  with:
    node-version: '18.x'  # Same as local

# Install same dependencies
- run: npm ci  # Not npm install
```

**Prevention:**
- Use Docker for consistent environments
- Lock dependency versions
- Document environment requirements
- Test CI/CD configuration locally
- Use act (to run GitHub Actions locally)

**When to ask for help:** If you cannot identify environment differences

---

### Issue 12: Governance Checks Block Legitimate PRs

**Symptoms:**
```bash
# CI/CD blocks PR
❌ Boundary violation detected
Error: frontend imports backend/internal/utils.ts
```

**Possible Causes:**
- Legitimate architectural need
- Boundary definitions too strict
- False positive
- Need for waiver

**Solutions:**

**Solution A: Request waiver**
```bash
# Create waiver for this PR
governance-cli waiver create \
  --file "src/frontend/App.tsx" \
  --policy "boundary-violation" \
  --reason "Temporary import for refactoring, will be removed" \
  --expires "2024-02-28" \
  --pr-number 123
```

**Solution B: Adjust boundaries**
```yaml
# repo.manifest.yaml - if change is legitimate
boundaries:
  - name: frontend
    path: src/frontend
    allowed_dependencies:
      - name: backend
        paths:
          - src/backend/shared/**  # Allow shared utilities
        forbidden:
          - src/backend/internal/**  # Keep internal private
```

**Solution C: HITL escalation**
```bash
# Escalate for human review
governance-cli hitl escalate \
  --issue boundary-violation \
  --pr-number 123 \
  --reason "Need architect review of frontend-backend interaction"
```

**Prevention:**
- Define boundaries clearly upfront
- Document architectural decisions
- Review boundary violations in design phase
- Use waivers appropriately
- Regular boundary reviews with team

**When to ask for help:** If unsure whether boundary violation is legitimate

---

## Boundary Violations

### Issue 13: False Positive Boundary Violations

**Symptoms:**
```bash
$ governance-cli verify --boundaries
❌ Boundary violation: frontend imports backend
File: src/frontend/utils/api.ts
Import: ../backend/types/api-types.ts
```

**Possible Causes:**
- Shared types should be in common location
- Boundary definitions too strict
- Import is actually legitimate
- Detection logic issue

**Solutions:**

**Solution A: Create shared boundary**
```yaml
# repo.manifest.yaml
boundaries:
  - name: shared-types
    path: src/shared/types
    exported_by: [frontend, backend]
  
  - name: frontend
    path: src/frontend
    allowed_dependencies:
      - shared-types
  
  - name: backend
    path: src/backend
    allowed_dependencies:
      - shared-types
```

**Solution B: Move shared code**
```bash
# Refactor to proper location
mkdir -p src/shared/types
mv src/backend/types/api-types.ts src/shared/types/

# Update imports
governance-cli refactor update-imports \
  --old "backend/types" \
  --new "shared/types"
```

**Solution C: Whitelist specific imports**
```yaml
# repo.manifest.yaml
boundaries:
  - name: frontend
    path: src/frontend
    allowed_imports:
      - pattern: "backend/types/**"
        reason: "Type definitions only"
```

**Prevention:**
- Establish clear architecture early
- Identify shared code upfront
- Use proper folder structure
- Document import rules
- Regular architecture reviews

**When to ask for help:** If you cannot determine proper architecture

---

### Issue 14: Circular Dependency Detection

**Symptoms:**
```bash
$ governance-cli verify --boundaries
❌ Circular dependency detected:
frontend → backend → database → frontend
```

**Possible Causes:**
- Poor separation of concerns
- Tangled dependencies
- Missing abstraction layer
- Import cycle

**Solutions:**

**Solution A: Break the cycle**
```bash
# Visualize dependencies
governance-cli boundaries graph --output deps.svg

# Identify breaking point
# Refactor to remove cycle
```

**Solution B: Add abstraction layer**
```typescript
// Before: frontend → backend → database → frontend
// After:  frontend → shared-interfaces ← backend ← database

// shared-interfaces/IUser.ts
export interface IUser {
  id: string;
  name: string;
}

// backend uses interface
// frontend uses interface
// No direct coupling
```

**Solution C: Use dependency injection**
```typescript
// Instead of direct imports, inject dependencies
class UserService {
  constructor(
    private database: IDatabase,
    private notifications: INotifications
  ) {}
}
```

**Prevention:**
- Design architecture to avoid cycles
- Use dependency inversion principle
- Define clear layers (UI → Services → Data)
- Review dependencies regularly
- Use boundaries to enforce layering

**When to ask for help:** If you need help redesigning architecture

---

### Issue 15: Cannot Determine Boundary Ownership

**Symptoms:**
```bash
$ governance-cli verify --boundaries
⚠️ Warning: File 'src/utils/helper.ts' doesn't belong to any boundary
```

**Possible Causes:**
- File in wrong location
- Missing boundary definition
- Shared utilities not properly defined
- New code without boundary assignment

**Solutions:**

**Solution A: Move to appropriate boundary**
```bash
# Determine where file should go
governance-cli boundaries suggest --file src/utils/helper.ts

# Suggests:
# This file is used by: frontend, backend
# Recommendation: Move to src/shared/utils/

# Move file
mv src/utils/helper.ts src/shared/utils/
```

**Solution B: Create boundary for utilities**
```yaml
# repo.manifest.yaml
boundaries:
  - name: shared-utils
    path: src/utils
    description: "Shared utility functions"
    access: public  # Accessible by all boundaries
```

**Solution C: Assign file to boundary**
```yaml
# repo.manifest.yaml
boundaries:
  - name: frontend
    path: src/frontend
    additional_files:
      - src/utils/helper.ts  # Assign to frontend boundary
```

**Prevention:**
- Define boundaries during initial setup
- Create boundaries for all major folders
- Use clear folder structure
- Review unassigned files regularly
- Update boundaries as code grows

**When to ask for help:** If you're unsure about proper architectural organization

---

## Agent Errors

### Issue 16: Agent Permission Denied

**Symptoms:**
```bash
# Agent log
Error: Permission denied
Agent 'code-assistant' attempted to modify '.repo/policy/CONSTITUTION.md'
Action blocked by governance framework
```

**Possible Causes:**
- Agent trying to access forbidden file
- Agent role has insufficient permissions
- Agent not properly configured
- Security policy enforcement

**Solutions:**

**Solution A: Check agent permissions**
```bash
# View agent permissions
governance-cli agents permissions show code-assistant

# Shows:
# Role: development
# Read: all
# Write: src/**, tests/**
# Forbidden: .repo/policy/**, package.json
```

**Solution B: Request HITL for protected changes**
```bash
# Agent should escalate instead of failing
governance-cli hitl escalate \
  --agent code-assistant \
  --action "modify-policy" \
  --reason "Need to update policy based on new requirements"
```

**Solution C: Adjust agent permissions (if appropriate)**
```yaml
# .repo/agents/agent-config.yaml
agents:
  - name: code-assistant
    role: development
    permissions:
      write:
        - "src/**"
        - "tests/**"
        - ".repo/policy/PRINCIPLES.md"  # Allow if appropriate
```

**Prevention:**
- Configure agent permissions during setup
- Document what agents can/cannot do
- Train agents to escalate appropriately
- Review agent actions regularly
- Use principle of least privilege

**When to ask for help:** If agent needs permissions but you're unsure if safe

---

### Issue 17: Agent HITL Escalation Failures

**Symptoms:**
```bash
# Agent attempts escalation
Error: HITL escalation failed
No response from human approvers after 24 hours
```

**Possible Causes:**
- Approvers not notified
- Notification system failure
- Approvers unavailable
- Escalation lost in queue

**Solutions:**

**Solution A: Check HITL queue**
```bash
# List pending HITL issues
governance-cli hitl list --status pending

# Shows:
# H-2024-042: Pending for 25 hours
# Approver: tech-lead@company.com
# Status: No response

# Resend notification
governance-cli hitl notify H-2024-042 --resend
```

**Solution B: Assign to different approver**
```bash
# Reassign to available approver
governance-cli hitl reassign H-2024-042 \
  --to "backup-approver@company.com"
```

**Solution C: Set up escalation ladder**
```yaml
# repo.manifest.yaml
hitl:
  escalation:
    - level: 1
      approvers: ["tech-lead@company.com"]
      timeout_hours: 8
    
    - level: 2
      approvers: ["engineering-manager@company.com"]
      timeout_hours: 16
    
    - level: 3
      approvers: ["director@company.com"]
      timeout_hours: 24
```

**Prevention:**
- Configure multiple approvers
- Set up escalation ladder
- Test notification system regularly
- Have backup approvers
- Monitor HITL queue
- Set SLAs for responses

**When to ask for help:** If HITL system is not working despite configuration

---

### Issue 18: Agent Creates Invalid Code

**Symptoms:**
```bash
# After agent makes changes
$ npm test
FAIL src/component.test.ts
 TypeError: Cannot read property 'user' of undefined
```

**Possible Causes:**
- Agent doesn't understand context
- Insufficient testing
- Agent boundaries too loose
- No pre-commit validation

**Solutions:**

**Solution A: Strengthen quality gates**
```yaml
# repo.manifest.yaml
agents:
  - name: code-assistant
    quality_gates:
      must_pass_tests: true
      must_pass_lint: true
      must_maintain_coverage: true
      
# Agent cannot commit if tests fail
```

**Solution B: Add pre-commit hooks**
```bash
# Install hooks
governance-cli install-hooks --strict

# Hooks will:
# - Run tests before commit
# - Run linter
# - Check coverage
# Block commit if any fail
```

**Solution C: Require human review**
```yaml
# repo.manifest.yaml
agents:
  - name: code-assistant
    require_review: true
    auto_merge: false
    
# All agent changes require human approval
```

**Prevention:**
- Enforce testing requirements
- Use pre-commit hooks
- Require code review for agent changes
- Give agents clear boundaries
- Train agents with examples
- Monitor agent quality metrics

**When to ask for help:** If agent consistently produces low-quality code

---

## Performance Issues

### Issue 19: Slow Validation Performance

**Symptoms:**
```bash
$ time governance-cli validate
real    5m 23s  # Way too slow!
```

**Possible Causes:**
- Large repository
- Too many files to scan
- Expensive validations
- No caching
- Inefficient configuration

**Solutions:**

**Solution A: Enable caching**
```bash
# Enable caching
governance-cli validate --cache

# Cache location
ls ~/.governance/cache/

# Clear old cache
governance-cli cache clear --older-than 7d
```

**Solution B: Use incremental validation**
```bash
# Only validate changed files
governance-cli validate --incremental

# Only validate specific parts
governance-cli validate --manifest --policies
```

**Solution C: Optimize configuration**
```yaml
# repo.manifest.yaml
performance:
  parallel_validation: true
  max_workers: 4
  
  # Skip validation for certain paths
  exclude_from_validation:
    - node_modules/**
    - dist/**
    - .next/**
    - coverage/**
```

**Solution D: Profile validation**
```bash
# See what's taking time
governance-cli validate --profile

# Shows:
# Policy validation:     2.3s
# Manifest validation:   0.5s
# Boundary analysis:    45.2s  # ← Bottleneck!
# File scanning:       195.8s  # ← Bottleneck!
```

**Prevention:**
- Enable caching from start
- Use incremental validation in development
- Exclude unnecessary paths
- Profile regularly to catch regressions
- Optimize based on profiling data

**When to ask for help:** If validation is slow even after optimization

---

### Issue 20: High Memory Usage

**Symptoms:**
```bash
# CI/CD failure
Error: JavaScript heap out of memory
FATAL ERROR: Ineffective mark-compacts near heap limit
```

**Possible Causes:**
- Large files being parsed
- Memory leaks
- Too many parallel operations
- Insufficient memory allocation

**Solutions:**

**Solution A: Increase memory limit**
```bash
# Increase Node.js memory
export NODE_OPTIONS="--max-old-space-size=4096"
governance-cli verify

# Or in package.json
{
  "scripts": {
    "governance": "NODE_OPTIONS='--max-old-space-size=4096' governance-cli verify"
  }
}
```

**Solution B: Process files in batches**
```yaml
# repo.manifest.yaml
performance:
  batch_size: 100  # Process 100 files at a time
  parallel_batches: 2
```

**Solution C: Exclude large files**
```yaml
# repo.manifest.yaml
validation:
  exclude_patterns:
    - "**/*.min.js"  # Exclude minified files
    - "**/*.bundle.js"
    - "**/*.map"
    - "**/dist/**"
  
  max_file_size: 1048576  # 1MB max
```

**Prevention:**
- Set appropriate memory limits from start
- Exclude generated/compiled files
- Process in batches for large repos
- Monitor memory usage
- Use streaming for large files

**When to ask for help:** If memory issues persist despite optimization

---

### Issue 21: Governance Checks Slow Down Development

**Symptoms:**
```bash
# Every commit takes forever
$ git commit
Running pre-commit hooks...
[governance-validate] 45 seconds
[governance-verify] 2m 30s
```

**Possible Causes:**
- Too many checks in pre-commit
- No fast mode for development
- Heavy operations running locally
- Not using incremental checks

**Solutions:**

**Solution A: Lightweight local checks**
```bash
# Configure lightweight pre-commit
governance-cli configure-hooks --mode lightweight

# Only runs:
# - Manifest validation (< 1s)
# - Policy syntax check (< 1s)
# - Changed files only (< 5s)

# Heavy checks run in CI only
```

**Solution B: Use fast mode**
```bash
# Add to .git/hooks/pre-commit
governance-cli validate --fast --incremental
```

**Solution C: Skip hooks during development**
```bash
# Skip when needed (use sparingly)
git commit --no-verify

# Or disable temporarily
governance-cli hooks disable

# Re-enable later
governance-cli hooks enable
```

**Solution D: Optimize workflow**
```yaml
# repo.manifest.yaml
development:
  pre_commit:
    # Fast checks only
    checks: [manifest-syntax, policy-syntax]
    
  pre_push:
    # More thorough checks before push
    checks: [validate, basic-verify]
  
  ci_cd:
    # Full verification in CI
    checks: [validate, verify, security-scan]
```

**Prevention:**
- Design for fast local development
- Run heavy checks in CI only
- Use incremental checking
- Provide skip options for emergencies
- Monitor check performance
- Optimize based on developer feedback

**When to ask for help:** If checks are impacting developer productivity significantly

---

## Configuration Errors

### Issue 22: Invalid YAML Syntax

**Symptoms:**
```bash
$ governance-cli validate
Error: Failed to parse repo.manifest.yaml
YAMLException: bad indentation of a mapping entry at line 15, column 3
```

**Possible Causes:**
- Incorrect indentation
- Missing colons
- Invalid characters
- Tabs instead of spaces

**Solutions:**

**Solution A: Validate YAML syntax**
```bash
# Check YAML syntax
yamllint repo.manifest.yaml

# Or use online validator
cat repo.manifest.yaml | pbcopy
# Paste into https://www.yamllint.com/

# Common issues:
# ❌ Using tabs (use spaces)
# ❌ Inconsistent indentation
# ❌ Missing colons
# ❌ Unquoted special characters
```

**Solution B: Use IDE with YAML support**
```bash
# VSCode with YAML extension
# Provides:
# - Syntax highlighting
# - Real-time validation
# - Auto-formatting
# - Schema validation
```

**Solution C: Start from template**
```bash
# Generate valid template
governance-cli init --template-only

# Copy and modify
cp .repo/templates/repo.manifest.yaml.template repo.manifest.yaml
```

**Prevention:**
- Use IDE with YAML support
- Enable YAML validation
- Use 2 spaces for indentation (not tabs)
- Validate after every edit
- Use template as starting point

**When to ask for help:** If YAML appears correct but validation fails

---

### Issue 23: Schema Validation Errors

**Symptoms:**
```bash
$ governance-cli validate --manifest
Error: Schema validation failed
Additional property 'custom_field' is not allowed at /governance
```

**Possible Causes:**
- Field doesn't exist in schema
- Typo in field name
- Using wrong schema version
- Field in wrong location

**Solutions:**

**Solution A: Check schema documentation**
```bash
# View schema
governance-cli schema show

# View available fields
governance-cli schema fields --path governance

# Shows allowed fields:
# - version (required)
# - policies (optional)
# - maturity_level (optional)
```

**Solution B: Fix typos**
```yaml
# Before (typo)
governance:
  maturity_lvl: 2  # ❌ Wrong

# After (correct)
governance:
  maturity_level: 2  # ✅ Correct
```

**Solution C: Use extension mechanism**
```yaml
# For custom fields, use extensions
governance:
  version: "1.0.0"
  
  extensions:
    custom_field: value  # ✅ Allowed in extensions
```

**Prevention:**
- Use schema-aware IDE
- Reference documentation
- Use tab completion
- Validate frequently
- Keep to standard fields when possible

**When to ask for help:** If you need a field that doesn't exist in schema

---

### Issue 24: Conflicting Configuration

**Symptoms:**
```bash
$ governance-cli validate
Error: Configuration conflict detected
quality_gates.coverage_threshold: 90 conflicts with boundaries.frontend.coverage_threshold: 70
```

**Possible Causes:**
- Multiple definitions of same setting
- Boundary-specific settings conflict with global
- Inherited settings not compatible
- Environment-specific conflicts

**Solutions:**

**Solution A: Resolve conflicts**
```yaml
# Use hierarchical configuration
quality_gates:
  coverage_threshold: 80  # Global default

boundaries:
  - name: frontend
    quality_gates:
      coverage_threshold: 85  # Override for frontend
    
  - name: backend
    quality_gates:
      coverage_threshold: 90  # Override for backend
```

**Solution B: Use explicit precedence**
```yaml
# Document precedence rules
# repo.manifest.yaml
configuration_precedence:
  - boundary_specific
  - environment_specific
  - global
```

**Solution C: Validate configuration**
```bash
# Check for conflicts
governance-cli validate --check-conflicts

# Shows:
# ⚠️ Conflict: frontend.coverage < global.coverage
# Resolution: Boundary-specific takes precedence
```

**Prevention:**
- Use consistent configuration hierarchy
- Document which settings can be overridden
- Validate after configuration changes
- Use templates for consistency
- Review conflicts with team

**When to ask for help:** If unsure how to resolve configuration conflicts

---

## Integration Problems

### Issue 25: GitHub Actions Integration Failures

**Symptoms:**
```yaml
# GitHub Actions error
Run governance-cli verify
Error: failed to download action
Unable to resolve action @governance/cli@v1
```

**Possible Causes:**
- Action not published
- Wrong action reference
- Private registry access
- Network issues

**Solutions:**

**Solution A: Use direct CLI installation**
```yaml
# .github/workflows/governance.yml
jobs:
  governance:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install Governance CLI
        run: npm install -g @governance/cli
      
      - name: Run Governance Checks
        run: governance-cli verify
```

**Solution B: Use composite action**
```yaml
# .github/workflows/governance.yml
- name: Governance Checks
  uses: governance-framework/governance-action@v1
  with:
    command: verify
    token: ${{ secrets.GITHUB_TOKEN }}
```

**Solution C: Troubleshoot action**
```yaml
- name: Debug Action
  run: |
    echo "Action version: v1"
    echo "Node version: $(node --version)"
    npm list -g @governance/cli
```

**Prevention:**
- Use stable action versions
- Pin to specific versions
- Test actions in separate repo first
- Have fallback to direct CLI
- Monitor action compatibility

**When to ask for help:** If action integration fails consistently

---

### Issue 26: GitLab CI Integration Issues

**Symptoms:**
```yaml
# GitLab CI error
governance-cli: command not found
```

**Possible Causes:**
- CLI not installed in CI image
- Wrong base image
- Installation step missing

**Solutions:**

**Solution A: Install in CI pipeline**
```yaml
# .gitlab-ci.yml
governance:
  image: node:18
  before_script:
    - npm install -g @governance/cli
  script:
    - governance-cli validate
    - governance-cli verify
```

**Solution B: Use custom Docker image**
```dockerfile
# Dockerfile
FROM node:18-alpine

RUN npm install -g @governance/cli

WORKDIR /app
```

```yaml
# .gitlab-ci.yml
governance:
  image: your-registry/governance-cli:latest
  script:
    - governance-cli verify
```

**Solution C: Cache installation**
```yaml
# .gitlab-ci.yml
governance:
  image: node:18
  cache:
    paths:
      - .npm/
  before_script:
    - npm config set cache .npm
    - npm install -g @governance/cli
  script:
    - governance-cli verify
```

**Prevention:**
- Use custom Docker image with CLI pre-installed
- Cache npm packages
- Document CI setup requirements
- Test CI configuration locally

**When to ask for help:** If GitLab CI consistently fails to find CLI

---

### Issue 27: Slack/Email Notifications Not Working

**Symptoms:**
```bash
$ governance-cli hitl escalate
✅ HITL issue created: H-2024-042
❌ Failed to send Slack notification
```

**Possible Causes:**
- Webhook URL invalid
- Network/firewall blocking
- Incorrect configuration
- Service outage

**Solutions:**

**Solution A: Test webhook**
```bash
# Test Slack webhook
curl -X POST \
  -H 'Content-type: application/json' \
  --data '{"text":"Test from governance-cli"}' \
  $SLACK_WEBHOOK_URL

# Test email
governance-cli notify test --email tech-lead@company.com
```

**Solution B: Check configuration**
```yaml
# repo.manifest.yaml
notifications:
  slack:
    enabled: true
    webhook_url: ${SLACK_WEBHOOK}  # Use env var
    channel: "#governance"
  
  email:
    enabled: true
    smtp:
      host: smtp.company.com
      port: 587
      auth:
        user: ${SMTP_USER}
        pass: ${SMTP_PASS}
```

**Solution C: Use alternative method**
```yaml
# Fallback to multiple notification methods
notifications:
  methods:
    - type: slack
      priority: 1
    - type: email
      priority: 2
    - type: github-issue
      priority: 3
```

**Prevention:**
- Test notifications during setup
- Use multiple notification methods
- Monitor notification failures
- Have fallback methods
- Document webhook/SMTP setup

**When to ask for help:** If notifications are configured but never delivered

---

## Security Scan Failures

### Issue 28: False Positive Vulnerability Detection

**Symptoms:**
```bash
$ governance-cli verify --security
❌ Critical vulnerability: CVE-2024-1234 in lodash@4.17.20
Status: False positive - lodash is only used in dev dependencies
```

**Possible Causes:**
- Vulnerability in dev dependency
- Vulnerability not exploitable in your usage
- Scanner error
- Outdated vulnerability database

**Solutions:**

**Solution A: Create security exemption**
```bash
# Create exemption with justification
governance-cli security exempt \
  --cve CVE-2024-1234 \
  --package lodash@4.17.20 \
  --reason "Dev dependency only, not in production" \
  --approved-by "security-team@company.com"
```

**Solution B: Update dependency**
```bash
# Update to patched version
npm update lodash

# Or specific version
npm install lodash@4.17.21

# Verify fix
governance-cli verify --security
```

**Solution C: Remove unused dependency**
```bash
# If not actually needed
npm uninstall lodash

# Check for alternative
npm install lodash-es  # ES module version
```

**Prevention:**
- Keep dependencies updated
- Use minimal dependencies
- Review security reports carefully
- Document legitimate exemptions
- Regular security audits

**When to ask for help:** If unsure whether vulnerability is exploitable

---

### Issue 29: Secret Detection False Positives

**Symptoms:**
```bash
$ governance-cli verify --secrets
❌ Potential secret detected in src/config.ts
Line 42: API_KEY = "sk_test_1234567890abcdef"
```

**Possible Causes:**
- Test/example credentials
- Documentation examples
- Configuration templates
- Similar patterns

**Solutions:**

**Solution A: Mark as safe**
```typescript
// src/config.ts
// governance-ignore-secret: test credential
const API_KEY = "sk_test_1234567890abcdef";
```

**Solution B: Move to proper location**
```bash
# Move test credentials to test files
mv src/config.ts tests/fixtures/test-config.ts

# Configure scanner to allow test secrets
```

```yaml
# repo.manifest.yaml
security:
  secret_scanning:
    exclude_paths:
      - tests/**
      - "**/*.test.ts"
      - "**/*.example.*"
```

**Solution C: Use better patterns**
```typescript
// Before (triggers scanner)
const API_KEY = "sk_test_1234567890abcdef";

// After (clear it's fake)
const EXAMPLE_API_KEY = "sk_test_XXXXXXXXXXXXXXXX";
// Actual key loaded from environment
const API_KEY = process.env.API_KEY;
```

**Prevention:**
- Never commit real secrets
- Use clear names for examples (EXAMPLE_, FAKE_, TEST_)
- Use environment variables
- Document secret management
- Use secret scanning ignores appropriately

**When to ask for help:** If scanner consistently flags legitimate code

---

### Issue 30: Security Scan Takes Too Long

**Symptoms:**
```bash
$ governance-cli verify --security
Running security scan...
[5 minutes later still running]
```

**Possible Causes:**
- Large dependency tree
- Slow network connection
- Inefficient scanning
- Too many files

**Solutions:**

**Solution A: Cache scan results**
```bash
# Enable caching
governance-cli verify --security --cache

# Cache valid for 24 hours by default
governance-cli config set security.cache_duration 86400
```

**Solution B: Scan incrementally**
```bash
# Only scan changed files
governance-cli verify --security --incremental

# Only scan new dependencies
governance-cli verify --security --new-deps-only
```

**Solution C: Use faster scanner**
```yaml
# repo.manifest.yaml
security:
  scanner: fast  # fast, balanced, thorough
  
  # Or specific tool
  tools:
    - name: npm-audit
      enabled: true
      fast_mode: true
```

**Prevention:**
- Enable caching from start
- Use incremental scans in development
- Run thorough scans in CI only
- Keep dependency tree small
- Use faster tools for local dev

**When to ask for help:** If scans are consistently too slow for your workflow

---

## Build/Test Failures

### Issue 31: Tests Pass Locally But Fail in Governance Check

**Symptoms:**
```bash
# Local
$ npm test
✅ All tests passed (45 tests)

# Governance check
$ governance-cli verify
❌ Tests failed: 3 failing tests
```

**Possible Causes:**
- Different test configuration
- Environment differences
- Race conditions
- Flaky tests

**Solutions:**

**Solution A: Run tests same way as governance**
```bash
# See exactly how governance runs tests
governance-cli verify --dry-run --verbose

# Shows:
# Would execute: npm test -- --ci --coverage

# Run same command
npm test -- --ci --coverage
```

**Solution B: Fix environment differences**
```yaml
# repo.manifest.yaml
commands:
  test:
    run: npm test
    env:
      NODE_ENV: test
      CI: true
    working_dir: .
```

**Solution C: Fix flaky tests**
```bash
# Identify flaky tests
npm test -- --repeat 10

# Fix:
# - Race conditions
# - Timing dependencies
# - Shared state
# - External dependencies
```

**Prevention:**
- Use same test command everywhere
- Set CI environment variable
- Fix flaky tests immediately
- Mock external dependencies
- Use deterministic tests

**When to ask for help:** If cannot reproduce governance test failures

---

### Issue 32: Coverage Threshold Not Met

**Symptoms:**
```bash
$ governance-cli verify
❌ Code coverage below threshold
Current: 75.3%, Required: 80%
Missing coverage in: src/utils/parser.ts
```

**Possible Causes:**
- New code without tests
- Tests not running
- Coverage calculation wrong
- Threshold too high

**Solutions:**

**Solution A: Add missing tests**
```bash
# Identify uncovered code
governance-cli verify --coverage --show-uncovered

# Shows:
# src/utils/parser.ts: 45% covered
#   Lines 23-45: Not covered
#   Lines 67-89: Not covered

# Add tests
vi tests/utils/parser.test.ts
```

**Solution B: Adjust threshold temporarily**
```bash
# Request waiver for coverage
governance-cli waiver create \
  --policy code-coverage \
  --reason "Refactoring in progress, will add tests" \
  --expires "2024-02-28"
```

**Solution C: Review threshold**
```yaml
# repo.manifest.yaml - if 80% is unrealistic
quality_gates:
  coverage_threshold: 75  # Adjust if reasonable
  
  # Or per-boundary
boundaries:
  - name: legacy-code
    quality_gates:
      coverage_threshold: 60  # Lower for legacy
```

**Prevention:**
- Write tests before code (TDD)
- Set realistic thresholds
- Monitor coverage trend
- Block PRs with coverage decrease
- Regular coverage reviews

**When to ask for help:** If coverage numbers seem incorrect

---

## Update Problems

### Issue 33: Merge Conflicts During Update

**Symptoms:**
```bash
$ governance-cli update
Updating governance framework...
❌ Merge conflict in .repo/policy/PRINCIPLES.md
```

**Possible Causes:**
- Local customizations conflict with updates
- Framework updated files you modified
- Complex changes in both versions

**Solutions:**

**Solution A: Review conflicts carefully**
```bash
# See conflicts
git diff .repo/policy/PRINCIPLES.md

# Shows:
# <<<<<<< HEAD (your version)
# P8: Test Everything - Coverage must be > 85%
# =======
# P8: Test Everything - Coverage must be > 80%
# >>>>>>> governance-update (new version)

# Keep your customization
# Edit file to resolve
```

**Solution B: Use update strategies**
```bash
# Prefer local customizations
governance-cli update --strategy keep-local

# Prefer framework updates
governance-cli update --strategy keep-remote

# Manual merge (recommended)
governance-cli update --strategy manual
```

**Solution C: Backup and restore customizations**
```bash
# Before update
governance-cli export-customizations > my-customizations.yaml

# Update framework
governance-cli update --force

# Restore customizations
governance-cli import-customizations < my-customizations.yaml
```

**Prevention:**
- Use Layer 1 for customizations (never overwritten)
- Document customizations
- Review update notes before updating
- Test updates in branch first
- Keep customizations minimal

**When to ask for help:** If unsure how to resolve conflicts safely

---

### Issue 34: Update Breaks Existing Configuration

**Symptoms:**
```bash
$ governance-cli update
✅ Update complete

$ governance-cli validate
❌ Configuration invalid after update
Error: Unknown field 'old_field_name'
```

**Possible Causes:**
- Breaking changes in new version
- Field renamed or removed
- Schema changes
- Deprecated features removed

**Solutions:**

**Solution A: Read migration guide**
```bash
# View changelog
governance-cli changelog --version 2.0.0

# View migration guide
governance-cli migrate --from 1.0.0 --to 2.0.0 --dry-run

# Shows:
# ⚠️ Breaking change: 'maturity_lvl' renamed to 'maturity_level'
# Migration: Rename field in repo.manifest.yaml
```

**Solution B: Run migration tool**
```bash
# Automatic migration
governance-cli migrate --from 1.0.0 --to 2.0.0

# Dry run first to see changes
governance-cli migrate --from 1.0.0 --to 2.0.0 --dry-run
```

**Solution C: Rollback and plan**
```bash
# Rollback to previous version
governance-cli update --rollback

# Or install specific version
npm install -g @governance/cli@1.0.0

# Plan migration
# Update configuration
# Test thoroughly
# Update again
```

**Prevention:**
- Read release notes before updating
- Test updates in separate branch
- Use migration tools
- Have rollback plan
- Update incrementally (don't skip versions)

**When to ask for help:** If migration tool doesn't handle your case

---

### Issue 35: Post-Update Validation Failures

**Symptoms:**
```bash
$ governance-cli update
✅ Update complete

$ governance-cli verify
❌ 15 new violations detected
```

**Possible Causes:**
- New/stricter rules in update
- Bugs fixed that detected existing issues
- New checks added
- Configuration needs updating

**Solutions:**

**Solution A: Review new violations**
```bash
# See what's new
governance-cli verify --show-new

# Shows violations introduced by update
# with explanations
```

**Solution B: Create waivers for existing violations**
```bash
# Waive violations for existing code
governance-cli waiver bulk-create \
  --reason "Pre-existing before update" \
  --expires "2024-06-30" \
  --auto-detect-violations

# Fix gradually over time
```

**Solution C: Adjust new rules**
```yaml
# repo.manifest.yaml
governance:
  version: "2.0.0"
  
  # Disable new strict rules temporarily
  rules:
    new_strict_boundary_check:
      enabled: false
      # Plan to enable after fixing violations
```

**Prevention:**
- Read release notes before updating
- Test updates in separate branch first
- Have waiver strategy for legacy code
- Plan time for fixing new violations
- Update regularly (smaller changes each time)

**When to ask for help:** If overwhelmed by number of new violations

---

## Getting Help

### When to Ask for Help

Ask for help if:

1. **Issue persists after trying documented solutions**
2. **Error messages are unclear or cryptic**
3. **Unsure if behavior is bug or feature**
4. **Need architectural guidance**
5. **Security-related questions**
6. **Data loss risk**
7. **Production system affected**

### How to Ask for Help

**Provide this information:**

```bash
# System information
governance-cli doctor > system-info.txt

# Error logs
governance-cli logs --errors --tail 100 > error-log.txt

# Configuration
cat repo.manifest.yaml > config.yaml

# Steps to reproduce
echo "1. Run governance-cli verify
2. Error appears
3. ..." > steps.txt
```

**Where to get help:**

1. **Documentation**
   - Check [FAQ](FAQ.md)
   - Review [Common Patterns](COMMON_PATTERNS.md)
   - Search [Issue Tracker](https://github.com/your-org/governance/issues)

2. **Community**
   - [GitHub Discussions](https://github.com/your-org/governance/discussions)
   - [Stack Overflow](https://stackoverflow.com/questions/tagged/governance-framework)
   - [Discord Community](https://discord.gg/governance)

3. **Support**
   - Email: support@governance-framework.io
   - Issues: https://github.com/your-org/governance/issues/new
   - Enterprise: support@governance-framework.io

### Before Opening an Issue

**Check:**
- [ ] Searched existing issues
- [ ] Checked FAQ and documentation
- [ ] Tried documented troubleshooting steps
- [ ] Can reproduce consistently
- [ ] Have minimal reproduction example

**Include:**
- System information (`governance-cli doctor`)
- Error logs
- Steps to reproduce
- Expected vs actual behavior
- Configuration files (sanitized)

---

## Related Documentation

- [FAQ](FAQ.md) - Frequently asked questions
- [Common Patterns](COMMON_PATTERNS.md) - Patterns and best practices
- [Getting Started](getting-started/QUICK_START.md) - Installation and setup
- [How-To Guides](guides/) - Step-by-step guides
- [CLI Reference](reference/CLI_REFERENCE.md) - Complete CLI documentation
- [API Reference](reference/API_REFERENCE.md) - Programmatic API

---

## Quick Reference

### Common Commands

```bash
# Diagnostics
governance-cli doctor
governance-cli logs --errors
governance-cli validate --verbose

# Fixes
governance-cli migrate
governance-cli update --rollback
governance-cli cache clear

# Waivers
governance-cli waiver create
governance-cli hitl escalate

# Help
governance-cli --help
governance-cli <command> --help
```

### Quick Fixes

| Issue | Quick Fix |
|-------|-----------|
| Command not found | `export PATH="$PATH:$(npm root -g)/.bin"` |
| Permission denied | `sudo chown -R $(whoami) $(npm config get prefix)` |
| Validation fails | `governance-cli validate --verbose` |
| Tests fail | `npm test -- --ci --coverage` |
| Timeout | `governance-cli verify --fast` |
| Memory error | `export NODE_OPTIONS="--max-old-space-size=4096"` |

---

**Last Updated:** 2026-01-22  
**Version:** 1.0.0  
**Feedback:** [Open an issue](https://github.com/your-org/governance/issues) or [contribute](../CONTRIBUTING.md)
