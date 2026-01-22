# AGENT.md - .repo/ Folder Guide
<!-- GOVERNANCE_VERSION: 1.0.0 -->
<!-- GOVERNANCE: UPDATEABLE - Layer 2 -->

This guide explains the purpose of the `.repo/` folder and what agents may and may not do here.

## Purpose of This Folder

The `.repo/` folder contains the **governance framework** for this repository:

- **Policies:** Binding rules that govern all operations
- **Agent Framework:** How AI agents operate
- **Templates:** Standard document templates
- **Documentation:** Standards and guides

**This folder defines HOW the repository operates.**

## What Agents May Do

### Reading & Understanding
- ✅ Read all policy documents
- ✅ Read agent rules and capabilities
- ✅ Read templates and standards
- ✅ Read documentation
- ✅ Reference policies in decisions

### Using Templates
- ✅ Use templates when creating documents
- ✅ Follow template structure
- ✅ Customize Layer 1 templates (task packets, prompts)
- ✅ Create ADRs using template
- ✅ Create logs using template

### Following Policies
- ✅ Follow Constitution articles
- ✅ Apply Principles (P3-P25)
- ✅ Respect quality gates
- ✅ Honor security baseline
- ✅ Maintain boundaries
- ✅ Use HITL process
- ✅ Request waivers when needed

### Creating Documents
- ✅ Create ADRs in `docs/adr/`
- ✅ Create agent logs (outside .repo/)
- ✅ Create HITL items in `policy/HITL.md`
- ✅ Request waivers in `policy/WAIVERS.md`

## What Agents May NOT Do

### Forbidden Modifications
- ❌ Modify Constitution
- ❌ Modify Principles
- ❌ Modify Quality Gates (hard gates)
- ❌ Modify Security Baseline
- ❌ Modify Boundaries policy
- ❌ Modify agent rules (AGENTS.md)
- ❌ Modify Layer 2/3 templates

### Forbidden Operations
- ❌ Delete policy files
- ❌ Rename policy files
- ❌ Move .repo/ folder
- ❌ Change VERSION without approval
- ❌ Bypass governance rules
- ❌ Remove governance markers

### Forbidden Interpretations
- ❌ Interpret policies loosely
- ❌ Find loopholes in rules
- ❌ Ignore policies
- ❌ Make up rules
- ❌ Override governance

## Layer System

Files in `.repo/` have different update policies:

### Layer 1: CUSTOM (Can Be Modified)
Files that agents/humans can customize:
- ✅ `policy/HITL.md` - Add your HITL items
- ✅ `policy/WAIVERS.md` - Add your waiver requests
- ✅ `agents/prompts/` - Customize task packets, PR templates
- ✅ `docs/adr/` - Add your ADRs

**Marker:** `<!-- GOVERNANCE: CUSTOM - Layer 1 -->`

### Layer 2: UPDATEABLE (Can Update From Governance Repo)
Files that can be updated from governance repository:
- 📝 Most policy files (Constitution, Principles, etc.)
- 📝 Agent framework files
- 📝 Standards and documentation
- 📝 Some templates

**Marker:** `<!-- GOVERNANCE: UPDATEABLE - Layer 2 -->`

**Warning:** Local modifications will be overwritten on update.

### Layer 3: IMMUTABLE (Never Modify)
Files that should never be modified:
- 🔒 Core agent rules
- 🔒 Quality gate definitions
- 🔒 Security baseline
- 🔒 Some templates

**Marker:** `<!-- GOVERNANCE: UPDATEABLE - Layer 3 -->`

**Rule:** If you need changes, propose via RFC, don't modify directly.

## Required Links

### Essential Policies
- [CONSTITUTION.md](policy/CONSTITUTION.md) - 8 fundamental articles
- [PRINCIPLES.md](policy/PRINCIPLES.md) - 23 operating principles
- [BOUNDARIES.md](policy/BOUNDARIES.md) - Architectural boundaries
- [QUALITY_GATES.md](policy/QUALITY_GATES.md) - Quality standards
- [SECURITY_BASELINE.md](policy/SECURITY_BASELINE.md) - Security requirements

### Agent Framework
- [AGENTS.md](agents/AGENTS.md) - Agent operating rules
- [Capabilities](agents/capabilities.md) - What agents can do
- [Roles](agents/roles/) - Agent role definitions

### Documentation
- [DOCS_INDEX.md](docs/DOCS_INDEX.md) - Complete documentation index
- [Standards](docs/standards/) - Documentation standards

## Common Operations

### Creating an ADR
1. Copy template: `templates/ADR_TEMPLATE.md`
2. Save to: `docs/adr/XXXX-title.md`
3. Fill all sections
4. Get team review
5. Mark as "Accepted"
6. Reference from code

### Requesting a Waiver
1. Use template: `templates/WAIVER_TEMPLATE.md`
2. Fill justification and remediation plan
3. Add to `policy/WAIVERS.md`
4. Submit for reviewer approval
5. Track until expired or remediated

### Creating HITL Item
1. Identify UNKNOWN or decision needed
2. Add to `policy/HITL.md` Active table
3. Document what's unknown and why
4. Wait for human resolution
5. Move to Archived when resolved

### Updating Governance
1. Check VERSION file for current version
2. Pull updates from governance repository
3. Review changes
4. Test in your project
5. Update VERSION after successful update

## Boundary Rules

The `.repo/` folder has special boundary rules:

### No Dependencies From .repo/
- ❌ Code outside .repo/ cannot import from .repo/
- ❌ Tests cannot depend on .repo/ (except reading config)
- ❌ Build cannot depend on .repo/ (except reading config)

**Reason:** Governance is metadata, not code.

### .repo/ Depends On Nothing
- ✅ .repo/ is self-contained
- ✅ .repo/ has no dependencies
- ✅ .repo/ is pure documentation

**Reason:** Governance should work in any repository.

## Governance Updates

### Checking for Updates
```bash
# Check current version
cat .repo/VERSION

# Check governance repository for updates
# (process depends on how you installed governance)
```

### Applying Updates
1. **Backup customizations** (Layer 1 files)
2. **Pull updates** from governance repository
3. **Review changes** in Layer 2 files
4. **Test** that governance still works
5. **Restore customizations** if overwritten
6. **Update VERSION** file

### Handling Conflicts
- Layer 1 files: Your changes win (customizations preserved)
- Layer 2 files: Governance changes win (updates applied)
- Layer 3 files: Never modified locally
- Manifest: Merge carefully (customizations + updates)

## Questions?

### About Policies
Read the specific policy document. If still unclear, create HITL item.

### About Agent Operations
Read [AGENTS.md](agents/AGENTS.md) and [capabilities.md](agents/capabilities.md). Check role definitions in [agents/roles/](agents/roles/).

### About Templates
Check [templates/](templates/) folder. Read template header for usage instructions.

### About Standards
Read relevant standard in [docs/standards/](docs/standards/).

### Still Unclear?
Create HITL item in [policy/HITL.md](policy/HITL.md) and a human will help.

## Summary

**DO:**
- ✅ Read and follow all policies
- ✅ Use templates
- ✅ Create ADRs, logs, HITL items
- ✅ Request waivers when needed
- ✅ Customize Layer 1 files

**DON'T:**
- ❌ Modify Layer 2/3 files without approval
- ❌ Delete or rename policy files
- ❌ Bypass governance rules
- ❌ Ignore policies
- ❌ Interpret policies loosely

**When in doubt, create HITL item and ask a human.**

---

**This folder is the foundation of repository governance. Respect it.**
