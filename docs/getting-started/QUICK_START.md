# Quick Start Guide
## Get Governance Running in 5 Minutes

**Goal:** Get the AI-Native Governance Framework set up in your repository quickly.

**Time Required:** 5-10 minutes  
**Prerequisites:** Git, Node.js (optional for CLI)

---

## Step 1: Check Prerequisites ✅

Before starting, ensure you have:
- [ ] Git installed and working
- [ ] Access to your target repository
- [ ] Node.js 16+ installed (optional, for CLI automation)
- [ ] Basic understanding of your project's build commands

---

## Step 2: Choose Your Installation Method

### Option A: CLI Installation (Recommended - 5 minutes)

If you have Node.js installed:

```bash
# Install the governance CLI globally
npm install -g @trevorplam/governance-cli

# Navigate to your repository
cd /path/to/your/repo

# Initialize governance
governance-cli init

# Follow the interactive prompts
# The CLI will automatically detect your package.json and fill the manifest
```

### Option B: Manual Installation (10 minutes)

If you prefer manual setup or don't have Node.js:

```bash
# Clone the governance repository
git clone https://github.com/TrevorPLam/governance.git /tmp/governance

# Copy the template to your repository
cp -r /tmp/governance/templates/.repo /path/to/your/repo/
cp /tmp/governance/templates/root-files/*.md /path/to/your/repo/

# Open and fill the manifest
cd /path/to/your/repo
nano .repo/repo.manifest.yaml
```

See [INSTALLATION.md](INSTALLATION.md) for detailed manual setup instructions.

---

## Step 3: Configure Your Manifest

The `repo.manifest.yaml` file tells governance how to work with your repository.

### Key Sections to Fill:

```yaml
# 1. Repository Info (auto-filled by CLI)
name: "your-project-name"
type: "node"  # or python, go, etc.

# 2. Commands (auto-detected by CLI)
commands:
  install: "npm install"      # Your dependency install command
  build: "npm run build"      # Your build command
  test: "npm test"           # Your test command
  lint: "npm run lint"       # Your lint command

# 3. Boundaries (customize for your architecture)
boundaries:
  layers:
    - ui
    - domain
    - data
    - platform

# 4. Quality Gates (adjust thresholds as needed)
quality_gates:
  coverage:
    minimum: 70
    target: 80
```

**Note:** Use `<UNKNOWN>` for any command you're unsure about - governance will prompt for clarification when needed.

---

## Step 4: Verify Your Setup

Run validation to ensure everything is configured correctly:

### Using CLI:
```bash
governance-cli validate
```

### Manual Verification:
```bash
# Check that all files exist
ls -la .repo/
ls -la .repo/policy/
ls -la P0TODO.md P1TODO.md P2TODO.md

# Verify manifest is valid YAML
cat .repo/repo.manifest.yaml
```

Expected output:
```
✓ .repo/ directory exists
✓ All 7 policy files present
✓ Manifest is valid YAML
✓ Commands are defined
✓ All required sections present
```

---

## Step 5: Commit Your Setup

Add governance to your repository:

```bash
# Stage the governance files
git add .repo/ P0TODO.md P1TODO.md P2TODO.md COMPLETEDTODO.md

# Commit with a clear message
git commit -m "Add AI-Native Governance Framework"

# Push to your repository
git push origin main
```

---

## Step 6: Start Using Governance

You're now ready to use governance! Here's what you can do:

### 1. Create Your First Task
Open `P0TODO.md` and add a high-priority task:
```markdown
## 🔥 Critical Tasks

- [ ] **Task 1:** Improve test coverage for authentication module
  - **Why:** Security critical code needs better testing
  - **Definition of Done:** Coverage >80% for auth module
```

### 2. Review Policies
Open `.repo/policy/CONSTITUTION.md` to understand the governance rules:
- 8 fundamental articles
- Clear guidance for agents and humans
- Authority chain and escalation paths

### 3. Check Boundaries
Review `.repo/policy/BOUNDARIES.md`:
- Layer architecture (ui → domain → data → platform)
- Import rules and restrictions
- Common patterns

### 4. Run Verification (if using CLI)
```bash
# Run quick checks
governance-cli verify --profile=quick

# Run full verification
governance-cli verify --profile=thorough
```

---

## Next Steps

Now that governance is set up, explore these resources:

1. **[YOUR_FIRST_PR.md](YOUR_FIRST_PR.md)** - Walkthrough of creating a governed PR
2. **[CONCEPTS_OVERVIEW.md](CONCEPTS_OVERVIEW.md)** - Understand key governance concepts
3. **[HOW_TO_CUSTOMIZE_POLICIES.md](../guides/HOW_TO_CUSTOMIZE_POLICIES.md)** - Customize for your team
4. **[CLI_REFERENCE.md](../reference/CLI_REFERENCE.md)** - Full CLI command reference

---

## Common Issues

### Issue: "Command not found: governance-cli"
**Solution:** Install the CLI globally:
```bash
npm install -g @trevorplam/governance-cli
# Or use npx to run without installing
npx @trevorplam/governance-cli init
```

### Issue: "Manifest validation failed"
**Solution:** Check your YAML syntax:
```bash
# Validate YAML syntax
cat .repo/repo.manifest.yaml | python -c 'import yaml,sys;yaml.safe_load(sys.stdin)'
```

### Issue: "Cannot detect project type"
**Solution:** Manually specify in manifest:
```yaml
repository:
  type: "node"  # or python, go, java, etc.
```

### Issue: "Missing policy files"
**Solution:** Copy templates again:
```bash
cp -r /path/to/governance/templates/.repo/policy /your/repo/.repo/
```

---

## Getting Help

- **Documentation:** Browse all docs in `docs/` directory
- **Examples:** See working examples (coming in Phase 4)
- **Issues:** Open an issue in the governance repository
- **Community:** Join discussions (coming in Phase 6)

---

## Summary Checklist

After completing this guide, you should have:

- [x] Governance framework installed in your repository
- [x] Manifest configured with your project details
- [x] Validation passing
- [x] Changes committed to your repository
- [x] Understanding of basic governance concepts
- [x] TODO files ready to use

**Congratulations! Your repository is now governed! 🎉**

Time to create your first governed PR - see [YOUR_FIRST_PR.md](YOUR_FIRST_PR.md)

---

**Guide Version:** 1.0  
**Last Updated:** 2026-01-22  
**Related:** [INSTALLATION.md](INSTALLATION.md), [CONCEPTS_OVERVIEW.md](CONCEPTS_OVERVIEW.md)
