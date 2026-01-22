# Installation Guide
## Comprehensive Installation Instructions for All Platforms

**Purpose:** Detailed installation instructions for the AI-Native Governance Framework on all platforms and environments.

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [CLI Installation](#cli-installation)
3. [Manual Installation](#manual-installation)
4. [CI/CD Setup](#cicd-setup)
5. [Verification](#verification)
6. [Troubleshooting](#troubleshooting)
7. [Uninstallation](#uninstallation)

---

## Prerequisites

### Required
- **Git:** Version 2.0 or higher
  ```bash
  git --version
  ```
- **Text Editor:** Any editor (VS Code, Vim, nano, etc.)
- **Terminal Access:** Command line access to your repository

### Optional (for CLI)
- **Node.js:** Version 16 or higher
  ```bash
  node --version
  npm --version
  ```

### Repository Requirements
- Git repository initialized
- Write access to the repository
- Ability to commit and push changes

---

## CLI Installation

### Method 1: Global Installation (Recommended)

Install the governance CLI globally for use in any project:

```bash
# Install globally using npm
npm install -g @trevorplam/governance-cli

# Verify installation
governance-cli --version

# Check available commands
governance-cli --help
```

**Advantages:**
- ✅ Available in any project
- ✅ Simple to use
- ✅ Automatic updates via npm

**Disadvantages:**
- ❌ Requires Node.js
- ❌ May require sudo on some systems

### Method 2: Project-Local Installation

Install the CLI as a dev dependency in your project:

```bash
# Navigate to your project
cd /path/to/your/project

# Install as dev dependency
npm install --save-dev @trevorplam/governance-cli

# Add npm script to package.json
cat >> package.json << 'EOF'
  "scripts": {
    "governance": "governance-cli"
  }
EOF

# Use via npm
npm run governance -- --help
```

**Advantages:**
- ✅ Version locked to your project
- ✅ No global installation needed
- ✅ Works in CI/CD easily

**Disadvantages:**
- ❌ Longer command syntax
- ❌ Must be in project directory

### Method 3: Using npx (No Installation)

Run without installing:

```bash
# Run directly with npx
npx @trevorplam/governance-cli init

# Always uses latest version
npx @trevorplam/governance-cli validate
```

**Advantages:**
- ✅ No installation needed
- ✅ Always latest version
- ✅ Quick for one-time use

**Disadvantages:**
- ❌ Slower (downloads each time)
- ❌ Requires internet connection
- ❌ Not suitable for offline use

---

## Manual Installation

For environments without Node.js or when you prefer manual setup:

### Step 1: Clone the Governance Repository

```bash
# Clone to a temporary location
git clone https://github.com/TrevorPLam/governance.git /tmp/governance

# Or download and extract ZIP
curl -L https://github.com/TrevorPLam/governance/archive/main.zip -o /tmp/governance.zip
unzip /tmp/governance.zip -d /tmp/governance
```

### Step 2: Copy Templates to Your Repository

```bash
# Navigate to your project
cd /path/to/your/project

# Copy the .repo/ directory
cp -r /tmp/governance/templates/.repo .

# Copy root TODO files
cp /tmp/governance/templates/root-files/P0TODO.md .
cp /tmp/governance/templates/root-files/P1TODO.md .
cp /tmp/governance/templates/root-files/P2TODO.md .
cp /tmp/governance/templates/root-files/COMPLETEDTODO.md .

# Verify files were copied
ls -la .repo/
ls -la P0TODO.md P1TODO.md P2TODO.md
```

### Step 3: Configure the Manifest

Open `.repo/repo.manifest.yaml` and fill in your project details:

```bash
# Open with your preferred editor
nano .repo/repo.manifest.yaml
# or
vim .repo/repo.manifest.yaml
# or
code .repo/repo.manifest.yaml
```

**Key sections to configure:**

```yaml
# 1. Repository information
repository:
  name: "your-project-name"
  type: "node"  # Change to your project type

# 2. Command definitions
commands:
  install: "npm install"       # YOUR install command
  build: "npm run build"       # YOUR build command
  test: "npm test"            # YOUR test command
  lint: "npm run lint"        # YOUR lint command
  format: "npm run format"    # YOUR format command

# 3. Boundaries (optional)
boundaries:
  layers:
    - ui
    - domain
    - data
    - platform

# 4. Quality gates
quality_gates:
  coverage:
    minimum: 70
    target: 80
```

See [HOW_TO_CONFIGURE_MANIFEST.md](../guides/HOW_TO_CONFIGURE_MANIFEST.md) for detailed configuration guide.

### Step 4: Verify Setup

```bash
# Check all files exist
find .repo -type f | wc -l
# Should show 45+ files

# Verify YAML is valid
python -m yaml .repo/repo.manifest.yaml
# or
ruby -ryaml -e "YAML.load_file('.repo/repo.manifest.yaml')"
```

---

## CI/CD Setup

### GitHub Actions

Add governance verification to your GitHub Actions workflow:

```yaml
# .github/workflows/governance.yml
name: Governance Check

on: [push, pull_request]

jobs:
  governance:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install Governance CLI
        run: npm install -g @trevorplam/governance-cli
      
      - name: Validate Governance Setup
        run: governance-cli validate
      
      - name: Verify Governance Compliance
        run: governance-cli verify --profile=ci
```

### GitLab CI

Add to `.gitlab-ci.yml`:

```yaml
governance:
  stage: test
  image: node:18
  script:
    - npm install -g @trevorplam/governance-cli
    - governance-cli validate
    - governance-cli verify --profile=ci
  rules:
    - if: '$CI_PIPELINE_SOURCE == "merge_request_event"'
    - if: '$CI_COMMIT_BRANCH == "main"'
```

### CircleCI

Add to `.circleci/config.yml`:

```yaml
version: 2.1
jobs:
  governance:
    docker:
      - image: cimg/node:18.0
    steps:
      - checkout
      - run: npm install -g @trevorplam/governance-cli
      - run: governance-cli validate
      - run: governance-cli verify --profile=ci
workflows:
  version: 2
  build:
    jobs:
      - governance
```

---

## Verification

After installation, verify everything is working:

### Using CLI

```bash
# Check CLI is installed
governance-cli --version

# Validate installation
governance-cli validate

# Expected output:
# ✓ .repo/ directory exists
# ✓ All policy files present (7/7)
# ✓ Manifest is valid
# ✓ Commands are defined
# ✓ Setup complete
```

### Manual Verification

```bash
# Check directory structure
ls -la .repo/

# Should contain:
# - policy/ (7 files)
# - agents/ (12+ files)
# - templates/ (8 files)
# - docs/ (10+ files)
# - automation/
# - repo.manifest.yaml
# - GOVERNANCE.md
# - VERSION

# Check policy files
ls -la .repo/policy/
# Should show:
# CONSTITUTION.md
# PRINCIPLES.md
# QUALITY_GATES.md
# SECURITY_BASELINE.md
# BOUNDARIES.md
# HITL.md
# WAIVERS.md

# Verify manifest syntax
cat .repo/repo.manifest.yaml
```

---

## Troubleshooting

### Issue: "npm: command not found"

**Problem:** Node.js/npm is not installed

**Solution:**
1. Install Node.js from [nodejs.org](https://nodejs.org)
2. Or use manual installation method (no Node.js required)

### Issue: "Permission denied" when installing globally

**Problem:** Need admin rights for global installation

**Solution:**
```bash
# Option 1: Use sudo (Linux/Mac)
sudo npm install -g @trevorplam/governance-cli

# Option 2: Configure npm to use local directory
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.profile
source ~/.profile
npm install -g @trevorplam/governance-cli

# Option 3: Use npx instead
npx @trevorplam/governance-cli init
```

### Issue: ".repo/ directory already exists"

**Problem:** Previous governance installation or naming conflict

**Solution:**
```bash
# Backup existing directory
mv .repo .repo.backup

# Try installation again
governance-cli init

# Compare and merge if needed
diff -r .repo .repo.backup
```

### Issue: "Manifest validation failed"

**Problem:** YAML syntax error in manifest

**Solution:**
```bash
# Check YAML syntax
python -c "import yaml; yaml.safe_load(open('.repo/repo.manifest.yaml'))"

# Common issues:
# - Incorrect indentation (use 2 spaces)
# - Missing colons
# - Unquoted special characters
# - Mixing tabs and spaces
```

### Issue: "Command not found" errors in manifest

**Problem:** Commands don't exist in your project

**Solution:**
```yaml
# Use <UNKNOWN> for missing commands
commands:
  install: "npm install"
  build: "npm run build"
  test: "<UNKNOWN>"      # Will prompt when needed
  lint: "<UNKNOWN>"      # Will prompt when needed
```

### Issue: "Git not initialized"

**Problem:** Directory is not a git repository

**Solution:**
```bash
# Initialize git if needed
git init

# Add remote if needed
git remote add origin https://github.com/your/repo.git
```

---

## Uninstallation

### Removing CLI

```bash
# Global uninstall
npm uninstall -g @trevorplam/governance-cli

# Verify removal
governance-cli --version
# Should show: command not found
```

### Removing Governance from Repository

```bash
# Remove governance files
rm -rf .repo/
rm P0TODO.md P1TODO.md P2TODO.md COMPLETEDTODO.md

# Remove from git
git rm -r .repo/
git rm P0TODO.md P1TODO.md P2TODO.md COMPLETEDTODO.md
git commit -m "Remove governance framework"
git push
```

**Warning:** This will remove all governance configuration and history. Consider backing up first.

---

## Platform-Specific Notes

### macOS

```bash
# Install using Homebrew (if available)
brew install node
npm install -g @trevorplam/governance-cli

# Common issue: Xcode tools needed
xcode-select --install
```

### Linux

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install nodejs npm
npm install -g @trevorplam/governance-cli

# CentOS/RHEL
sudo yum install nodejs npm
npm install -g @trevorplam/governance-cli
```

### Windows

```powershell
# Using Node.js installer from nodejs.org
# Then in PowerShell or CMD:
npm install -g @trevorplam/governance-cli

# Or using Chocolatey
choco install nodejs
npm install -g @trevorplam/governance-cli
```

---

## Next Steps

After successful installation:

1. **Quick Start:** Follow [QUICK_START.md](QUICK_START.md) for 5-minute setup
2. **Configure:** Read [HOW_TO_CONFIGURE_MANIFEST.md](../guides/HOW_TO_CONFIGURE_MANIFEST.md)
3. **First PR:** Try [YOUR_FIRST_PR.md](YOUR_FIRST_PR.md)
4. **Learn Concepts:** Read [CONCEPTS_OVERVIEW.md](CONCEPTS_OVERVIEW.md)

---

**Guide Version:** 1.0  
**Last Updated:** 2026-01-22  
**Supported Platforms:** Linux, macOS, Windows  
**Node.js Version:** 16+
