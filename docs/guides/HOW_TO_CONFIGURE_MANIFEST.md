# How To: Configure the Manifest
## Complete Guide to repo.manifest.yaml

**Purpose:** Learn how to configure the governance manifest for your project.

**Time Required:** 20-30 minutes  
**Skill Level:** Beginner to Intermediate

---

## Table of Contents

1. [What is the Manifest?](#what-is-the-manifest)
2. [Manifest Structure](#manifest-structure)
3. [Required Sections](#required-sections)
4. [Optional Sections](#optional-sections)
5. [Command Resolution](#command-resolution)
6. [Validation](#validation)
7. [Common Configurations](#common-configurations)
8. [Troubleshooting](#troubleshooting)

---

## What is the Manifest?

The `repo.manifest.yaml` file is the central configuration for governance in your repository.

**Purpose:**
- Tell governance how to build/test your project
- Define quality gates and thresholds
- Configure boundaries and architecture
- Set agent permissions
- Specify verification profiles

**Location:** `.repo/repo.manifest.yaml`

**Format:** YAML (YAML Ain't Markup Language)

---

## Manifest Structure

### Complete Example

```yaml
# Repository metadata
repository:
  name: "my-awesome-project"
  type: "node"
  version: "1.0.0"
  description: "E-commerce platform backend"

# Build and test commands
commands:
  install: "npm install"
  build: "npm run build"
  test: "npm test"
  lint: "npm run lint"
  format: "npm run format"
  typecheck: "npm run typecheck"
  
# Architectural boundaries
boundaries:
  enabled: true
  layers:
    - ui
    - domain
    - data
    - platform
  import_rules:
    ui: ["domain", "platform"]
    domain: ["data", "platform"]
    data: ["platform"]
    platform: []

# Quality gates and thresholds
quality_gates:
  coverage:
    enabled: true
    minimum: 70
    target: 80
  performance:
    build_time_seconds: 300
    test_time_seconds: 60
  complexity:
    max_cyclomatic: 10
    max_cognitive: 15

# Security settings
security:
  scan_dependencies: true
  block_critical: true
  block_high: false
  require_review_for:
    - authentication
    - authorization
    - cryptography
    - data_access

# Agent configuration
agents:
  primary:
    enabled: true
    permissions:
      - create_feature
      - modify_existing
      - write_tests
  secondary:
    enabled: true
    permissions:
      - refactor_only

# Verification profiles
verify_profiles:
  quick:
    - lint
    - typecheck
    - test
  thorough:
    - lint
    - typecheck
    - test
    - build
    - security_scan
  ci:
    - lint
    - typecheck
    - test
    - build
    - coverage
    - security_scan
```

---

## Required Sections

### 1. Repository

```yaml
repository:
  name: "project-name"    # REQUIRED: Project name
  type: "node"            # REQUIRED: Project type
  version: "1.0.0"        # Optional: Semantic version
  description: "..."      # Optional: Brief description
```

**Project Types:**
- `node` - Node.js/JavaScript/TypeScript
- `python` - Python
- `go` - Go/Golang
- `java` - Java
- `rust` - Rust
- `dotnet` - .NET/C#
- `ruby` - Ruby
- `php` - PHP
- `other` - Other/custom

### 2. Commands

```yaml
commands:
  install: "npm install"          # REQUIRED: Install dependencies
  build: "npm run build"          # REQUIRED: Build project
  test: "npm test"                # REQUIRED: Run tests
  lint: "npm run lint"            # Recommended: Code linting
  format: "npm run format"        # Optional: Code formatting
  typecheck: "<UNKNOWN>"          # Optional: Type checking
```

**Using `<UNKNOWN>`:**
- Use when command doesn't exist yet
- Use when unsure of correct command
- Governance will prompt when needed

**Examples:**
```yaml
# If you don't have a formatter
format: "<UNKNOWN>"

# If you don't know the command
typecheck: "<UNKNOWN>"

# If command varies by environment
test: "npm run test:ci"  # For CI
```

### 3. Quality Gates

```yaml
quality_gates:
  coverage:
    enabled: true        # Required: Enable/disable gate
    minimum: 70          # Required: Minimum threshold
    target: 80           # Optional: Target goal
```

**Standard Gates:**
- `coverage` - Code coverage
- `performance` - Build/test time
- `complexity` - Code complexity
- `security` - Security scan

---

## Optional Sections

### 1. Boundaries

```yaml
boundaries:
  enabled: true                    # Enable boundary checking
  layers:                          # Define architectural layers
    - ui
    - domain
    - data
    - platform
  import_rules:                    # Who can import from whom
    ui: ["domain", "platform"]     # ui can import domain & platform
    domain: ["data", "platform"]   # domain can import data & platform
    data: ["platform"]             # data can only import platform
    platform: []                   # platform imports nothing
```

**Disabling Boundaries:**
```yaml
boundaries:
  enabled: false  # Turns off boundary checking
```

### 2. Security Settings

```yaml
security:
  scan_dependencies: true          # Scan npm/pip/etc dependencies
  block_critical: true             # Block critical vulnerabilities
  block_high: false                # Allow high (with review)
  block_medium: false              # Allow medium
  require_review_for:              # Trigger human review for:
    - authentication               # Auth changes
    - authorization                # Authz changes
    - cryptography                 # Crypto usage
    - input_validation             # Input validation
    - data_access                  # Database queries
```

### 3. Agent Configuration

```yaml
agents:
  primary:
    enabled: true
    permissions:
      - create_feature       # Can create new features
      - modify_existing      # Can modify existing code
      - write_tests          # Can write tests
      - update_docs          # Can update docs
  secondary:
    enabled: true
    permissions:
      - refactor_only        # Only refactoring
      - write_tests          # Can write tests
```

**Permission Options:**
- `create_feature` - Create new features
- `modify_existing` - Modify existing code
- `delete_code` - Delete code
- `refactor_only` - Refactor without behavior changes
- `write_tests` - Write/modify tests
- `update_docs` - Update documentation
- `security_changes` - Make security-related changes
- `infrastructure` - Change infrastructure/config

### 4. Verification Profiles

```yaml
verify_profiles:
  # Quick checks (during development)
  quick:
    - lint
    - test
  
  # Thorough checks (before PR)
  thorough:
    - lint
    - typecheck
    - test
    - build
  
  # CI/CD checks (automated)
  ci:
    - lint
    - typecheck
    - test
    - build
    - coverage
    - security_scan
```

---

## Command Resolution

### How Commands Are Found

1. **Check manifest first**
   ```yaml
   commands:
     test: "npm test"  # Use this
   ```

2. **Auto-detect if `<UNKNOWN>`**
   ```yaml
   commands:
     test: "<UNKNOWN>"  # Try to auto-detect
   ```

3. **Common defaults by project type**
   ```
   node: npm test, npm run test, jest
   python: pytest, python -m pytest
   go: go test
   ```

### Auto-Detection Examples

**Node.js Projects:**
```yaml
# Checks in order:
# 1. package.json scripts.test
# 2. npm test
# 3. jest
# 4. mocha
# 5. Prompts user if not found
```

**Python Projects:**
```yaml
# Checks in order:
# 1. pytest
# 2. python -m pytest
# 3. python -m unittest
# 4. tox
# 5. Prompts user if not found
```

### Handling Missing Commands

**Option 1: Mark as Unknown**
```yaml
commands:
  lint: "<UNKNOWN>"  # Will prompt when needed
```

**Option 2: Provide Placeholder**
```yaml
commands:
  lint: "echo 'No linter configured'"
```

**Option 3: Skip in Profiles**
```yaml
verify_profiles:
  quick:
    - test  # Don't include lint if it doesn't exist
```

---

## Validation

### Validating Your Manifest

```bash
# Validate manifest syntax and settings
governance-cli validate

# Expected output:
# ✓ Manifest exists
# ✓ YAML is valid
# ✓ All required fields present
# ✓ Commands are valid
# ✓ No conflicts in settings
```

### Common Validation Errors

#### 1. Invalid YAML Syntax

**Error:**
```
Error: YAML parsing failed at line 15
```

**Cause:** Indentation or syntax error

**Fix:**
```yaml
# BAD (mixed spaces and tabs)
commands:
	test: "npm test"

# GOOD (2 spaces)
commands:
  test: "npm test"
```

#### 2. Missing Required Field

**Error:**
```
Error: Missing required field: repository.name
```

**Fix:**
```yaml
repository:
  name: "my-project"  # Add this
  type: "node"
```

#### 3. Invalid Project Type

**Error:**
```
Error: Invalid project type: "nodejs"
```

**Fix:**
```yaml
# Use one of: node, python, go, java, rust, dotnet, ruby, php, other
repository:
  type: "node"  # Not "nodejs"
```

#### 4. Contradictory Settings

**Error:**
```
Error: Coverage minimum (80) is greater than target (70)
```

**Fix:**
```yaml
quality_gates:
  coverage:
    minimum: 70  # Must be less than target
    target: 80
```

---

## Common Configurations

### Node.js / TypeScript Project

```yaml
repository:
  name: "my-node-app"
  type: "node"

commands:
  install: "npm install"
  build: "npm run build"
  test: "npm test"
  lint: "npm run lint"
  typecheck: "npm run typecheck"

quality_gates:
  coverage:
    minimum: 70
    target: 80
  performance:
    build_time_seconds: 180

boundaries:
  enabled: true
  layers:
    - ui
    - domain
    - data
    - platform
```

### Python Project

```yaml
repository:
  name: "my-python-app"
  type: "python"

commands:
  install: "pip install -r requirements.txt"
  build: "python -m build"
  test: "pytest"
  lint: "flake8 ."
  format: "black ."
  typecheck: "mypy ."

quality_gates:
  coverage:
    minimum: 80
    target: 90
```

### Go Project

```yaml
repository:
  name: "my-go-service"
  type: "go"

commands:
  install: "go mod download"
  build: "go build ./..."
  test: "go test ./..."
  lint: "golangci-lint run"
  format: "gofmt -w ."

quality_gates:
  coverage:
    minimum: 75
    target: 85
```

### Monorepo Configuration

```yaml
repository:
  name: "my-monorepo"
  type: "node"

commands:
  install: "npm install"
  build: "npm run build:all"
  test: "npm run test:all"
  lint: "npm run lint:all"

boundaries:
  enabled: true
  layers:
    - packages/ui
    - packages/api
    - packages/shared
  import_rules:
    packages/ui: ["packages/shared"]
    packages/api: ["packages/shared"]
    packages/shared: []
```

### Microservices Configuration

```yaml
repository:
  name: "auth-service"
  type: "node"

commands:
  install: "npm install"
  build: "npm run build"
  test: "npm test"
  lint: "npm run lint"
  
boundaries:
  enabled: true
  layers:
    - api
    - service
    - repository
    - shared

security:
  scan_dependencies: true
  block_critical: true
  require_review_for:
    - authentication
    - authorization
    - cryptography
```

### Legacy Project (Relaxed Rules)

```yaml
repository:
  name: "legacy-app"
  type: "node"

commands:
  install: "npm install"
  build: "npm run build"
  test: "npm test"
  lint: "<UNKNOWN>"

quality_gates:
  coverage:
    enabled: true
    minimum: 40        # Lower for legacy
    target: 60
  
boundaries:
  enabled: false       # Disabled for legacy

# Note: Plan to gradually increase standards
```

---

## Troubleshooting

### Issue: "Command not found" during verify

**Problem:** Command defined in manifest doesn't exist

**Solution:**
```yaml
# Check your package.json scripts
cat package.json | grep scripts

# Update manifest to match
commands:
  test: "npm run test:unit"  # Match script name
```

### Issue: Commands work locally but fail in CI

**Problem:** Environment differences

**Solution:**
```yaml
# Use CI-specific profile
verify_profiles:
  ci:
    - lint
    - test
    - build
  
# Or specify CI commands explicitly
commands:
  test: "npm run test:ci"  # Different from local
```

### Issue: Validation keeps failing

**Problem:** YAML syntax error

**Solution:**
```bash
# Validate YAML syntax
cat .repo/repo.manifest.yaml | python -c "import yaml,sys; yaml.safe_load(sys.stdin)"

# Common issues:
# - Tabs instead of spaces
# - Missing colons
# - Incorrect indentation (use 2 spaces)
# - Unquoted special characters
```

### Issue: Auto-detection picks wrong command

**Problem:** Multiple test frameworks installed

**Solution:**
```yaml
# Be explicit
commands:
  test: "jest"  # Not "npm test" which might run mocha
```

### Issue: Update overwrites my manifest

**Problem:** Manifest treated as Layer 2 instead of Layer 1

**Solution:**
```yaml
# Manifest should always have Layer 1 marker
# Add at top of file:
# <!-- GOVERNANCE: CUSTOM - Layer 1 -->
# This prevents overwrites
```

---

## Best Practices

### ✅ Do

1. **Be explicit about commands**
   ```yaml
   # Good
   commands:
     test: "npm run test:unit"
   
   # Avoid (unless intentional)
   commands:
     test: "<UNKNOWN>"
   ```

2. **Use reasonable thresholds**
   ```yaml
   # Good (achievable)
   quality_gates:
     coverage:
       minimum: 70
       target: 80
   
   # Bad (too strict to start)
   quality_gates:
     coverage:
       minimum: 95
       target: 100
   ```

3. **Document non-obvious settings**
   ```yaml
   quality_gates:
     coverage:
       minimum: 60  # Lower due to legacy code
       # Plan: Increase to 70% by Q2 2026
   ```

4. **Version your manifest**
   ```bash
   git add .repo/repo.manifest.yaml
   git commit -m "feat: Update manifest with new quality gates"
   ```

### ❌ Don't

1. **Don't use absolute paths**
   ```yaml
   # Bad
   commands:
     test: "/usr/local/bin/npm test"
   
   # Good
   commands:
     test: "npm test"
   ```

2. **Don't mix technologies**
   ```yaml
   # Bad (use type: other if needed)
   repository:
     type: "node"
   commands:
     test: "pytest"  # Python command in Node project
   ```

3. **Don't set unrealistic gates**
   ```yaml
   # Bad
   quality_gates:
     performance:
       build_time_seconds: 10  # Impossible for large project
   ```

---

## Next Steps

- **Define Boundaries:** [HOW_TO_DEFINE_BOUNDARIES.md](HOW_TO_DEFINE_BOUNDARIES.md)
- **Manage Waivers:** [HOW_TO_MANAGE_WAIVERS.md](HOW_TO_MANAGE_WAIVERS.md)
- **CLI Reference:** [CLI_REFERENCE.md](../reference/CLI_REFERENCE.md)

---

**Guide Version:** 1.0  
**Last Updated:** 2026-01-22  
**Difficulty:** Beginner to Intermediate
