# Manual Injection Guide - Governance Framework

**Purpose:** Step-by-step guide for manually injecting the governance framework into an external repository.

**Estimated Time:** 30-45 minutes per repository

**Prerequisites:**
- Access to the target repository
- Basic understanding of your project's build/test commands
- Text editor or IDE

---

## Overview

This guide walks you through copying the governance framework templates into your project and customizing them for your specific repository. Once complete, your repository will have:

- Complete policy framework (CONSTITUTION, PRINCIPLES, QUALITY_GATES, etc.)
- Configured manifest with your actual build/test commands
- Task management system (P0/P1/P2 TODO files)
- Clear governance entry point

---

## Step 1: Copy the Template Files

### 1.1. Copy the `.repo/` Folder

From this governance repository, copy the entire `.repo/` folder to your project root:

```bash
# From your target project directory
cp -r /path/to/governance/templates/.repo ./
```

**Result:** Your project now has `your-project/.repo/` with all governance files.

### 1.2. Copy the Root TODO Files (Optional but Recommended)

Copy the TODO management files to your project root:

```bash
# From your target project directory
cp /path/to/governance/templates/root-files/P0TODO.md ./
cp /path/to/governance/templates/root-files/P1TODO.md ./
cp /path/to/governance/templates/root-files/P2TODO.md ./
cp /path/to/governance/templates/root-files/COMPLETEDTODO.md ./
```

**Result:** Your project now has task management files in the root.

---

## Step 2: Understand Your Repository Commands

Before filling the manifest, identify your repository's actual commands. Answer these questions:

### 2.1. Package Manager & Installation
- **What package manager do you use?** (npm, yarn, pnpm, pip, etc.)
- **How do you install dependencies?** (Look for installation command)
  - Common: `npm install`, `yarn install`, `pip install -r requirements.txt`

### 2.2. Build Commands
- **How do you build your application?** (Look in package.json scripts or Makefile)
  - Common: `npm run build`, `yarn build`, `make build`

### 2.3. Test Commands
- **How do you run tests?** (Look in package.json scripts or test documentation)
  - Common: `npm test`, `yarn test`, `pytest`, `make test`

### 2.4. Lint/Quality Check Commands
- **How do you check code quality?** (Look for lint, typecheck, format commands)
  - Common: `npm run lint`, `npm run typecheck`, `eslint .`

### 2.5. CI/CD Commands
- **What does your CI run?** (Check `.github/workflows/`, `.gitlab-ci.yml`, etc.)
  - This is the most authoritative source for commands

---

## Step 3: Fill the Manifest File

Open `.repo/repo.manifest.yaml` in your text editor.

### 3.1. Update Repository Metadata

```yaml
repo:
  ships: true  # or false if library/internal
  ship_kind: user_facing_app  # or: library, internal_tool, service
  release_protects: [app_stability, login_security, money_flows]  # adjust as needed

prerequisites:
  package_manager: npm  # Change to your package manager
  runtime_pinned: true
  platform_tools_required_for_release: true
```

### 3.2. Fill Commands (Most Important Step)

For each command, follow the **Command Resolution Process** from `.repo/docs/standards/manifest.md`:

1. Look in `package.json` scripts
2. Look in Makefile or task files
3. Check CI configuration
4. Check README/docs

**Replace each `<FILL_FROM_REPO>` with your actual command:**

```yaml
commands:
  install: "npm install"  # Your installation command

  check:quick: "npm run lint && npm run build"  # Fast check + fast build
  
  check:ci: "npm run lint && npm run typecheck && npm test && npm run build"  # Full check
  
  check:release: "npm run check:ci && npm run audit && npm run check:budgets"  # CI + security + budgets
  
  check:governance: "node scripts/verify-governance.js"  # Governance verification (or <UNKNOWN>)
  
  check:boundaries: "node scripts/check-boundaries.js"  # Boundary checker (or <UNKNOWN>)
  
  check:security: "npm audit && npm run check:secrets"  # Security checks
```

### 3.3. Handle Unknown Commands

If you **cannot determine** a command from your repository:

1. Set the value to `<UNKNOWN>` (keep the angle brackets)
2. Create a HITL item in `.repo/policy/HITL.md`
3. Continue with other commands

**Example:**

```yaml
commands:
  check:boundaries: "<UNKNOWN>"  # Boundary checker doesn't exist yet
```

Then add to `.repo/policy/HITL.md`:

```markdown
## Active HITL Items

| ID | Created | Type | Summary | Status | Resolution |
|----|---------|------|---------|--------|------------|
| HITL-001 | 2026-01-22 | Command Missing | Boundary checker tool not implemented | Open | Need to implement or waive |
```

---

## Step 4: Verify Your Configuration

### 4.1. Test Commands Locally

Run each command you added to verify it works:

```bash
# Test install
npm install  # (or your install command)

# Test quick check
npm run lint && npm run build  # (or your check:quick command)

# Test CI check
npm run lint && npm run typecheck && npm test && npm run build  # (or your check:ci)
```

**Expected Result:** Commands should run successfully (or fail with expected errors you can address).

### 4.2. Review Policy Files

Quickly scan these files to understand the governance rules:

1. **`.repo/GOVERNANCE.md`** - Start here (entry point)
2. **`.repo/policy/CONSTITUTION.md`** - 8 fundamental articles
3. **`.repo/policy/PRINCIPLES.md`** - Operating principles
4. **`.repo/policy/QUALITY_GATES.md`** - Quality standards

---

## Step 5: Customize HITL and Waivers (Optional)

### 5.1. Initialize HITL Tracking

If you have any `<UNKNOWN>` commands or open questions, add them to `.repo/policy/HITL.md`:

```markdown
## Active HITL Items

| ID | Created | Type | Summary | Status | Resolution |
|----|---------|------|---------|--------|------------|
| HITL-001 | 2026-01-22 | Command Unknown | Governance verification command needs implementation | Open | TBD |
```

### 5.2. Review Waivers Structure

Check `.repo/policy/WAIVERS.md` to understand the waiver process. You don't need to add waivers now, but review the structure.

---

## Step 6: Commit the Governance Framework

### 6.1. Stage All Files

```bash
git add .repo/
git add P0TODO.md P1TODO.md P2TODO.md COMPLETEDTODO.md
```

### 6.2. Commit with Clear Message

```bash
git commit -m "Add AI-Native Governance Framework

- Injected .repo/ governance structure
- Configured repo.manifest.yaml with project commands
- Added P0/P1/P2 TODO task management
- Established CONSTITUTION, PRINCIPLES, and policy framework

All commands verified and working locally."
```

### 6.3. Push to Repository

```bash
git push origin main  # (or your branch name)
```

---

## Step 7: Start Using the Framework

### 7.1. Create Your First Task

Add a task to `P1TODO.md`:

```markdown
- [ ] **Review governance policies** - Familiarize team with new framework
  - **Context**: Ensure everyone understands CONSTITUTION and PRINCIPLES
  - **Verify**: Team meeting completed, questions addressed
```

### 7.2. Run Your First Check

Test the governance by running a check:

```bash
# From repo.manifest.yaml, use your check:quick command
npm run lint && npm run build  # (example)
```

### 7.3. Update Documentation

Consider adding to your main README.md:

```markdown
## Governance

This repository uses an AI-Native Governance Framework. See `.repo/GOVERNANCE.md` for details.

### Key Commands (from `.repo/repo.manifest.yaml`)
- Install: `npm install`
- Quick Check: `npm run lint && npm run build`
- Full CI Check: `npm run lint && npm run typecheck && npm test && npm run build`
```

---

## Troubleshooting

### Issue: Can't find the right command

**Solution:** 
1. Check your CI configuration (most reliable)
2. Look at package.json scripts
3. If still unclear, set to `<UNKNOWN>` and create HITL item

### Issue: Command fails when I test it

**Solution:** 
1. Fix the underlying issue (missing dependency, etc.)
2. Update the command in manifest if needed
3. Or create a waiver if the failure is expected/acceptable

### Issue: Too many `<UNKNOWN>` placeholders

**Solution:** That's okay! The framework expects this. Document each in HITL.md and address them incrementally.

### Issue: Commands are complex (chains, scripts)

**Solution:** 
- Use `&&` to chain commands: `npm run lint && npm test`
- Or create a script and reference it: `npm run check:all`
- Document in manifest comments what the command does

---

## Success Criteria

You've successfully injected governance when:

- [x] `.repo/` folder exists in your project root
- [x] `repo.manifest.yaml` has real commands (or documented `<UNKNOWN>`)
- [x] All commands in manifest work when run locally (or have HITL items)
- [x] TODO files exist and are ready to use
- [x] You've committed and pushed the changes
- [x] Team knows where to find governance docs (`.repo/GOVERNANCE.md`)

---

## Next Steps After Injection

1. **Educate the Team**: Have everyone read `.repo/GOVERNANCE.md` and the CONSTITUTION
2. **Start Using TODOs**: Begin tracking work in P0/P1/P2 TODO files
3. **Integrate with CI**: Add manifest commands to your CI/CD pipelines (Phase 3)
4. **Review Periodically**: Monthly review of HITL items and waivers
5. **Consider Automation**: When ready, explore the CLI tool (Phase 3) for easier management

---

## Getting Help

- **Questions about manifest?** → See `.repo/docs/standards/manifest.md`
- **Questions about policies?** → Read `.repo/policy/CONSTITUTION.md` and `.repo/policy/PRINCIPLES.md`
- **Need to deviate from policy?** → Follow waiver process in `.repo/policy/WAIVERS.md`
- **Uncertain about something?** → Create HITL item, don't guess

---

## Feedback

This is a template process. If you find issues or have suggestions for improving this guide, please document them for future iterations.

**Remember:** The goal is safe, effective governance, not perfection. Start simple, iterate, and improve over time.
