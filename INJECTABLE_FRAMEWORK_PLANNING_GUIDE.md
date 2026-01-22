# Injectable Framework Planning Guide
## Strategic Roadmap for Deploying Governance to External Repositories

**Document Purpose:** Planning document for non-technical user to understand how to inject the governance framework into external repositories with minimal friction for future updates.

**Status:** PLANNING ONLY - No existing documents modified  
**Created:** 2026-01-22  
**Audience:** Non-coder solo founder deploying governance to existing repos

---

## Executive Summary: What You Have & What You Need

### Current State Analysis

**What Exists in `00. Implementation/` (9 phases):**
1. ✅ **Phase 1:** Master handoff skeleton with locked decisions (authority chain, principles P3-P25, quality gates, security baseline, boundaries)
2. ✅ **Phase 2:** Complete policy corpus (7 policy files: CONSTITUTION, PRINCIPLES, QUALITY_GATES, SECURITY_BASELINE, BOUNDARIES, HITL, WAIVERS)
3. ✅ **Phase 3:** Manifest structure + command resolution standard
4. ✅ **Phase 4:** Agent framework + folder-level guides (AGENT.md files)
5. ✅ **Phase 5:** PR operating system (task packets, PR templates, checklists)
6. ✅ **Phase 6:** Templates (logs, trace schema, waivers, ADRs, runbooks, RFCs)
7. ✅ **Phase 7:** Automation stubs (CI templates, governance-verify script, trace validator)
8. ✅ **Phase 8:** Documentation index and standards
9. ✅ **Phase 9:** Root scaffold files (README, SECURITY, CODEOWNERS, TODO files)

**What Exists in `02. Assets/`:**
- ✅ Extensive research from 4 AI platforms (ChatGPT, CoPilot, Gemini, Perplexity)
- ✅ 172 feature recommendations for diamond-level repository standards
- ✅ Synthesis document with comprehensive best practices
- ✅ Comparison analyses across platforms

**What Exists in Root TODO Files:**
- ✅ 6 Phase TODO documents (PHASE_1-6_TODO.md) with detailed implementation tasks
- ✅ Master implementation roadmap with 20-week timeline
- ✅ Analysis documents (EXECUTIVE_SUMMARY, REPOSITORY_ANALYSIS, VISUAL_STRUCTURE)

### The Gap: What's Missing for Easy Injection

**Critical Missing Components:**
1. ❌ **Packaged `.repo/` folder** - The 9 implementation phases define the structure but files don't exist in a ready-to-copy format
2. ❌ **CLI tool** - No automation for `init`, `validate`, `verify`, `check` commands
3. ❌ **Starter kits** - No pre-configured templates for different project types
4. ❌ **Injection guide** - No step-by-step instructions for adding governance to an existing repo
5. ❌ **Version management** - No strategy for updating governance across repos when this repo evolves
6. ❌ **Minimal viable subset** - No "starter" version for quick adoption

---

## Injectable Framework Architecture

### Core Concept: Two-Part System

```
┌─────────────────────────────────────────────────────────────┐
│                     THIS REPOSITORY                          │
│  TrevorPLam/governance (SOURCE OF TRUTH)                    │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  1. Template Storage                                         │
│     └── templates/                                           │
│         ├── .repo/ (COMPLETE governance framework)           │
│         ├── starter-kits/ (6 project types)                  │
│         └── integration-examples/ (working demos)            │
│                                                              │
│  2. Tooling (CLI)                                           │
│     └── tools/governance-cli/                               │
│         ├── init (inject .repo/ into target)                │
│         ├── validate (check manifest completeness)          │
│         ├── verify (run governance checks)                  │
│         ├── update (sync changes from source)               │
│         └── migrate (version upgrades)                      │
│                                                              │
│  3. Documentation                                           │
│     └── docs/                                               │
│         ├── injection-guide.md                              │
│         ├── customization-guide.md                          │
│         ├── update-strategy.md                              │
│         └── troubleshooting.md                              │
│                                                              │
└─────────────────────────────────────────────────────────────┘
                            ↓
                    ↓ inject ↓ update
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                   EXTERNAL REPOSITORY                        │
│  YourOrg/your-project (TARGET)                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  .repo/ (injected, rarely edited)                           │
│  ├── policy/ (7 files - modify only via PR to source)       │
│  ├── agents/ (roles + capabilities)                         │
│  ├── templates/ (ADRs, waivers, logs)                       │
│  ├── docs/ (standards + index)                              │
│  ├── automation/ (CI scripts)                               │
│  ├── repo.manifest.yaml (CUSTOMIZE per project)             │
│  └── GOVERNANCE.md (entry point)                            │
│                                                              │
│  Your existing code (unchanged)                             │
│  ├── src/                                                   │
│  ├── tests/                                                 │
│  └── package.json                                           │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### The Injection Model

**Three injection tiers for flexibility:**

#### Tier 1: Minimal (Weeks 1-2 of adoption)
**What gets injected:**
- `.repo/policy/` (7 files - read-only)
- `.repo/repo.manifest.yaml` (template with `<FILL_FROM_REPO>` placeholders)
- `.repo/GOVERNANCE.md` (entry point)
- `P0TODO.md`, `P1TODO.md`, `P2TODO.md` (task management)

**User action required:**
- Fill manifest commands from package.json scripts
- Set `<UNKNOWN>` for anything unclear
- Run first governance check

**Benefits:**
- ✅ Policy framework established
- ✅ Task structure in place
- ✅ Minimal disruption

#### Tier 2: Standard (Weeks 3-4 of adoption)
**Adds to Tier 1:**
- `.repo/agents/` (roles, capabilities, prompts, checklists)
- `.repo/templates/` (all 6 templates)
- `.repo/docs/` (standards + ADR scaffold)
- `.repo/automation/` (CI templates)
- AGENT.md files in key folders

**User action required:**
- Customize agent prompts if needed
- Set up CI integration
- Create first ADR

**Benefits:**
- ✅ Full agent framework
- ✅ Automation enabled
- ✅ CI/CD integration

#### Tier 3: Complete (Weeks 5-8 of adoption)
**Adds to Tier 2:**
- Boundary checker implementation
- Governance-verify script (working)
- HITL management system
- Waiver tracking
- Metrics collection

**User action required:**
- Configure boundary rules for codebase
- Set up HITL notifications
- Establish waiver review cadence

**Benefits:**
- ✅ Full governance enforcement
- ✅ Human-in-loop workflows
- ✅ Compliance tracking

---

## The Update Problem & Solution

### Challenge: Keeping External Repos in Sync

**The Problem:**
1. This repo (TrevorPLam/governance) will evolve
2. External repos have injected `.repo/` folders
3. Updates to source should propagate with minimal friction
4. But external repos may have customizations

**The Solution: Layered Update Strategy**

#### Layer 1: Never Update (Customized by external repo)
```
.repo/repo.manifest.yaml      ← Per-project commands
.repo/agents/prompts/*.md      ← Custom prompts
.repo/docs/adr/*.md            ← Project decisions
.repo/policy/WAIVERS.md        ← Active waivers
.repo/policy/HITL.md           ← HITL items
```

#### Layer 2: Safe to Update (Read-only policy)
```
.repo/policy/CONSTITUTION.md   ← Core principles
.repo/policy/PRINCIPLES.md     ← Operating rules
.repo/policy/QUALITY_GATES.md  ← Merge rules
.repo/policy/SECURITY_BASELINE.md
.repo/policy/BOUNDARIES.md
```

#### Layer 3: Update with Merge (Evolvable)
```
.repo/templates/*.md           ← Template improvements
.repo/automation/scripts/*.js  ← Script enhancements
.repo/docs/standards/*.md      ← Standard clarifications
```

### Version Management Strategy

**Semantic Versioning for Governance:**
- **v1.0.0** = Initial complete framework
- **v1.1.0** = New templates or scripts (backward compatible)
- **v1.0.1** = Bug fixes or clarifications
- **v2.0.0** = Breaking changes (require migration)

**Update Command Design:**
```bash
# Check for updates from source
$ governance-cli check-updates
→ "New version available: v1.2.0 (your version: v1.0.0)"
→ "Changes: 3 new templates, 1 script fix, 2 doc improvements"

# Preview changes before applying
$ governance-cli update --dry-run
→ Shows diff of what would change
→ Highlights potential conflicts with customizations

# Apply updates (Layer 2 + 3 only, preserves Layer 1)
$ governance-cli update
→ Updates read-only policies
→ Merges template improvements
→ Preserves manifest + custom prompts
→ Creates backup in .repo/archive/pre-update-v1.0.0/

# Handle breaking changes (major version)
$ governance-cli migrate --to=v2.0.0
→ Interactive migration wizard
→ Asks questions about customizations
→ Applies transformations
→ Validates after migration
```

---

## Restructuring the TODO System

### Current TODO Structure (in this repo)

**Root-level TODOs:**
- `MASTER_IMPLEMENTATION_ROADMAP_TODO.md` (20-week plan)
- `PHASE_1_FOUNDATION_TODO.md` through `PHASE_6_POLISH_SCALE_TODO.md`

**Problem:** These are for building THIS repo, not for injecting into external repos.

### Proposed TODO Structure

#### For THIS Repository (governance source)

```
/implementation/
├── roadmap.md (overall plan)
├── phases/
│   ├── phase1-9.md (existing implementation phases)
│   └── status.md (current completion status)
└── todos/
    ├── BUILD_TEMPLATES.md (create ready-to-inject .repo/)
    ├── BUILD_CLI.md (create governance-cli tool)
    ├── BUILD_STARTER_KITS.md (6 project templates)
    └── BUILD_DOCS.md (injection guides)
```

#### For EXTERNAL Repositories (after injection)

```
/P0TODO.md (urgent - blocking work)
/P1TODO.md (high priority - this week)
/P2TODO.md (normal priority - this month)
/COMPLETEDTODO.md (archive of done tasks)

/.repo/archive/todo/ (historical snapshots)
```

**Key Insight:** Separate "building governance" TODOs from "using governance" TODOs.

---

## Implementation Phases for Injectable System

### Phase A: Template Creation (Weeks 1-2)
**Goal:** Create ready-to-inject `.repo/` folder structure

**Tasks:**
1. Create `/templates/.repo/` folder in this repo
2. Convert Phase 1-9 specifications into actual files:
   ```
   templates/.repo/
   ├── policy/
   │   ├── CONSTITUTION.md
   │   ├── PRINCIPLES.md
   │   ├── QUALITY_GATES.md
   │   ├── SECURITY_BASELINE.md
   │   ├── BOUNDARIES.md
   │   ├── HITL.md
   │   └── WAIVERS.md
   ├── agents/
   │   ├── AGENTS.md
   │   ├── capabilities.md
   │   ├── roles/ (4 files)
   │   ├── prompts/ (2 files)
   │   └── checklists/ (3 files)
   ├── templates/
   │   ├── AGENT_LOG_TEMPLATE.md
   │   ├── AGENT_TRACE_SCHEMA.json
   │   ├── WAIVER_TEMPLATE.md
   │   ├── ADR_TEMPLATE.md
   │   ├── RUNBOOK_TEMPLATE.md
   │   ├── RFC_TEMPLATE.md
   │   └── PR_TEMPLATE.md
   ├── docs/
   │   ├── DOCS_INDEX.md
   │   ├── standards/ (4 files)
   │   └── adr/ (scaffold)
   ├── automation/
   │   ├── ci/ (templates)
   │   └── scripts/ (3 scripts)
   ├── repo.manifest.yaml (template)
   ├── GOVERNANCE.md (entry point)
   └── VERSION (version file)
   ```

3. Add placeholders where customization is needed:
   - `<FILL_FROM_REPO>` for manifest commands
   - `<CUSTOMIZE>` for project-specific rules
   - `<UNKNOWN>` examples for teaching

**Acceptance:** Can copy entire `templates/.repo/` to any project

---

### Phase B: CLI Tool (Weeks 3-6)
**Goal:** Build `governance-cli` for automation

**Core Commands:**
```bash
# Initialize governance in a repo
governance-cli init [--tier=minimal|standard|complete]
  → Copies .repo/ folder
  → Auto-fills some manifest fields from package.json
  → Creates TODO files
  → Runs initial validation

# Validate manifest completeness
governance-cli validate
  → Checks for <FILL_FROM_REPO> placeholders
  → Verifies commands actually exist
  → Reports what needs filling

# Run governance checks
governance-cli verify [--profile=quick|ci|release]
  → Runs commands from manifest
  → Validates trace logs against schema
  → Checks HITL status
  → Reports pass/fail + waivers needed

# Check for updates
governance-cli check-updates
  → Compares local version to source
  → Reports available updates

# Apply updates
governance-cli update [--dry-run]
  → Updates Layer 2 & 3 files
  → Preserves customizations
  → Creates backup

# Request waiver
governance-cli waiver create --gate=coverage --reason="..."
  → Creates waiver file
  → Sets expiration
  → Logs for review

# Manage HITL
governance-cli hitl list
governance-cli hitl create --category=risk --summary="..."
governance-cli hitl complete --id=HITL-0001

# Migrate to new version
governance-cli migrate --to=v2.0.0
  → Interactive wizard
  → Handles breaking changes
```

**Technology Stack:**
- Node.js + TypeScript
- Commander.js (CLI framework)
- Inquirer.js (interactive prompts)
- Chalk (colored output)
- Ajv (JSON schema validation)
- js-yaml (YAML parsing)

**Acceptance:** Can inject and manage governance without manual file copying

---

### Phase C: Starter Kits (Weeks 7-10)
**Goal:** Pre-configured templates for common project types

**Six Starter Kits:**

1. **JavaScript/Node.js Backend**
   - Express server example
   - Manifest with npm scripts
   - CI/CD with GitHub Actions
   - Security scan configs

2. **React Frontend**
   - Create-react-app based
   - Bundle size budgets
   - Component boundaries
   - Storybook integration

3. **TypeScript Library**
   - NPM package template
   - Versioning rules
   - Breaking change detection
   - API documentation

4. **Python Service**
   - Poetry or pip-tools
   - pytest integration
   - Type checking with mypy
   - Security with bandit

5. **Monorepo**
   - Nx or Turborepo setup
   - Workspace boundaries
   - Selective testing
   - Release coordination

6. **Full-Stack Template**
   - Frontend + Backend + Shared
   - Cross-layer rules
   - End-to-end testing
   - Deployment coordination

**Structure:**
```
templates/starter-kits/
├── javascript-backend/
│   ├── .repo/ (pre-filled manifest)
│   ├── src/ (sample app)
│   ├── tests/ (sample tests)
│   ├── package.json (with scripts)
│   └── README.md (setup guide)
├── react-frontend/
├── typescript-library/
├── python-service/
├── monorepo/
└── fullstack/
```

**Usage:**
```bash
governance-cli init --from=starter-kit --type=react-frontend
→ Clones starter kit
→ Customizes for project name
→ Validates setup
→ Ready to use immediately
```

**Acceptance:** Non-coder can spin up new governed project in <5 minutes

---

### Phase D: Documentation (Weeks 11-12)
**Goal:** Comprehensive guides for non-technical users

**Key Documents:**

1. **Injection Guide** (`docs/injection-guide.md`)
   - Step-by-step instructions
   - Screenshots/diagrams
   - Common issues
   - What success looks like

2. **Manifest Filling Guide** (`docs/manifest-guide.md`)
   - How to find commands in existing project
   - Common package.json patterns
   - When to use `<UNKNOWN>`
   - Testing filled manifest

3. **Customization Guide** (`docs/customization-guide.md`)
   - What you should customize
   - What you shouldn't change
   - How to add project rules
   - Layer 1 vs Layer 2 vs Layer 3

4. **Update Strategy Guide** (`docs/update-strategy.md`)
   - When to update
   - How to test updates
   - Handling conflicts
   - Rollback procedures

5. **Troubleshooting Guide** (`docs/troubleshooting.md`)
   - Common errors
   - Debug checklist
   - How to get help
   - FAQ

**Format:** Plain English, no technical jargon, lots of examples

**Acceptance:** Non-coder can inject, customize, and maintain governance independently

---

### Phase E: Integration Examples (Weeks 13-14)
**Goal:** Working demonstrations

**Four Examples:**

1. **Minimal Integration** (simple Node.js app)
   - Shows Tier 1 adoption
   - Manifest filled
   - Basic TODO usage
   - First governance check

2. **Standard Integration** (React app)
   - Shows Tier 2 adoption
   - CI/CD integration
   - Agent prompts in use
   - First ADR created

3. **Complete Integration** (Full-stack)
   - Shows Tier 3 adoption
   - Boundary enforcement
   - HITL workflow
   - Waiver management
   - Metrics collection

4. **Migration Example** (legacy project)
   - Before/after comparison
   - Step-by-step adoption
   - Progressive compliance
   - Handling existing tech debt

**Location:** `examples/` in this repo

**Acceptance:** Can see governance in action, learn by copying patterns

---

## Prioritized Action Plan

### Immediate Priorities (Next 2 Weeks)

**Priority 1: Create Injectable Template** ⭐⭐⭐
- [ ] Create `templates/.repo/` folder structure
- [ ] Convert Phase 2-9 specs into actual files
- [ ] Add VERSION file
- [ ] Test by manually copying to a sample project
- [ ] Validate all file paths are correct

**Priority 2: Write Injection Guide** ⭐⭐⭐
- [ ] Create `docs/injection-guide.md`
- [ ] Step-by-step for manual injection (before CLI exists)
- [ ] Manifest filling instructions
- [ ] First governance check instructions
- [ ] Plain English, no jargon

**Priority 3: Create Minimal Starter Kit** ⭐⭐
- [ ] Build `templates/starter-kits/javascript-backend/`
- [ ] Simple Express server with pre-filled manifest
- [ ] README with "Quick Start in 5 Minutes"
- [ ] Test with fresh project

### Short-term (Weeks 3-6)

**Priority 4: Build CLI Tool** ⭐⭐⭐
- [ ] Implement `init` command (copy template)
- [ ] Implement `validate` command (check manifest)
- [ ] Implement `verify` command (run checks)
- [ ] Package as npm global install
- [ ] Write CLI documentation

**Priority 5: Build Remaining Starter Kits** ⭐⭐
- [ ] React frontend
- [ ] TypeScript library
- [ ] Python service
- [ ] Monorepo
- [ ] Full-stack

### Medium-term (Weeks 7-12)

**Priority 6: Update System** ⭐⭐
- [ ] Implement `check-updates` command
- [ ] Implement `update` command with backup
- [ ] Create migration guide
- [ ] Test update on example project

**Priority 7: Complete Documentation** ⭐⭐
- [ ] Customization guide
- [ ] Update strategy guide
- [ ] Troubleshooting guide
- [ ] Video walkthrough (optional)

**Priority 8: Build Examples** ⭐
- [ ] Minimal integration example
- [ ] Standard integration example
- [ ] Complete integration example
- [ ] Migration example

---

## The "Minimal Friction" Update Strategy

### Design Principle: Separate Concerns

**What Changes Frequently (in this repo):**
- Policy clarifications
- Template improvements
- Script bug fixes
- Documentation enhancements

**What Changes Rarely (in external repos):**
- Project-specific manifest commands
- Custom agent prompts
- ADR history
- Active waivers/HITL items

**The Friction-Free Approach:**

1. **Namespace Separation**
   ```yaml
   # In .repo/repo.manifest.yaml
   governance_version: "1.2.0"  # Tracks source version
   project_customizations:
     last_updated: "2026-01-15"
     custom_commands:
       - check:e2e
       - deploy:staging
   ```

2. **Update Markers**
   ```markdown
   <!-- GOVERNANCE: UPDATEABLE -->
   This section will be overwritten on updates.
   
   <!-- GOVERNANCE: CUSTOM -->
   This section is preserved across updates.
   ```

3. **Backup Strategy**
   - Every update creates `.repo/archive/pre-update-vX.Y.Z/`
   - Can rollback with `governance-cli rollback --to=v1.0.0`
   - Archive includes diff report

4. **Conflict Resolution**
   ```bash
   $ governance-cli update
   → Analyzing changes...
   → Conflict detected in .repo/policy/PRINCIPLES.md
   → Your version has custom P26
   → Source version updated P20
   → Action: [K]eep yours, [A]ccept theirs, [M]erge both, [S]kip
   ```

5. **Testing Updates**
   ```bash
   # Always test before applying
   $ governance-cli update --dry-run
   → Shows exactly what would change
   → No modifications made
   → Safe to review
   
   # Apply with validation
   $ governance-cli update
   → Creates backup
   → Applies changes
   → Runs validation
   → If validation fails, auto-rollback
   ```

---

## Success Metrics: How to Know It's Working

### For THIS Repository

**Template Quality:**
- [ ] .repo/ folder is complete (all 30+ files)
- [ ] Can copy to empty project and it works
- [ ] All placeholders are documented
- [ ] Version tracking in place

**CLI Functionality:**
- [ ] `init` command works on fresh project
- [ ] `validate` catches missing manifest fields
- [ ] `verify` runs checks correctly
- [ ] `update` preserves customizations

**Documentation Clarity:**
- [ ] Non-coder can follow injection guide
- [ ] Common questions answered in troubleshooting
- [ ] Examples demonstrate all features

### For EXTERNAL Repositories (after injection)

**Adoption Success:**
- [ ] Can inject in <30 minutes
- [ ] Manifest filled without confusion
- [ ] First governance check passes
- [ ] Team understands TODO system

**Ongoing Use:**
- [ ] Governance checks in CI
- [ ] ADRs created for decisions
- [ ] Waivers managed properly
- [ ] HITL items tracked

**Update Success:**
- [ ] Can update from v1.0 → v1.1 without breaking
- [ ] Customizations preserved
- [ ] New features adopted smoothly
- [ ] Rollback works if needed

---

## Risk Assessment & Mitigation

### Risk 1: Complexity Overload
**Threat:** Non-coder overwhelmed by 30+ files in .repo/

**Mitigation:**
- Start with Tier 1 (minimal) - only 10 files
- Clear injection guide with "don't worry about these yet"
- Starter kits pre-configure everything
- CLI automates most tasks

### Risk 2: Version Drift
**Threat:** External repos get out of sync, become un-updatable

**Mitigation:**
- Strong versioning with semver
- `check-updates` reminds about new versions
- Automated update with conflict detection
- Backup before every update

### Risk 3: Customization Chaos
**Threat:** Users edit Layer 2 files, break updates

**Mitigation:**
- Clear markers: `<!-- GOVERNANCE: UPDATEABLE -->`
- CLI warns when attempting to edit Layer 2
- Validation checks flag unexpected changes
- Documentation emphasizes Layer 1 only

### Risk 4: CLI Tool Breakage
**Threat:** CLI doesn't work across environments

**Mitigation:**
- Test on Windows, Mac, Linux
- Minimal dependencies
- Fallback to manual steps if CLI fails
- Good error messages

### Risk 5: Manifest Confusion
**Threat:** Users can't figure out what commands to use

**Mitigation:**
- `validate` command checks and suggests
- Auto-detection from package.json
- Clear examples in each starter kit
- FAQ for common package managers

---

## Next Steps: Decision Points

### Decision 1: Build Order
**Option A:** Template first, then CLI, then docs
- Pro: Can test manually before automation
- Con: Delayed full value

**Option B:** CLI first, then template, then docs
- Pro: Automation available sooner
- Con: No template to test CLI against

**Recommendation:** Option A (template first) - gives something tangible immediately

### Decision 2: CLI Distribution
**Option A:** NPM global package (`npm install -g @trevorplam/governance-cli`)
- Pro: Standard, easy updates
- Con: Requires Node.js

**Option B:** Standalone binaries (pkg or similar)
- Pro: Works without Node.js
- Con: Harder to update

**Recommendation:** Option A (NPM) - aligns with target audience (JavaScript projects)

### Decision 3: Starter Kit Scope
**Option A:** 6 comprehensive starter kits
- Pro: Covers most use cases
- Con: 10+ weeks to build all

**Option B:** 1 minimal starter kit
- Pro: Ships fast
- Con: Limited applicability

**Recommendation:** Start with 2 (JavaScript backend + React frontend), expand later

### Decision 4: Update Frequency
**Option A:** Frequent updates (v1.1, v1.2, v1.3...)
- Pro: Continuous improvement
- Con: Update fatigue

**Option B:** Infrequent updates (v1.0, v2.0, v3.0...)
- Pro: Stability
- Con: Slow to improve

**Recommendation:** Quarterly minor versions (v1.1, v1.2), annual major (v2.0)

---

## Appendix A: File Manifest

### Complete .repo/ Structure (All Tiers)

```
.repo/
├── VERSION                           # Tracks governance version
├── GOVERNANCE.md                     # Entry point document
├── repo.manifest.yaml                # Project configuration (Layer 1)
│
├── policy/                           # Core policies (Layer 2)
│   ├── CONSTITUTION.md
│   ├── PRINCIPLES.md
│   ├── QUALITY_GATES.md
│   ├── SECURITY_BASELINE.md
│   ├── BOUNDARIES.md
│   ├── HITL.md                       # Layer 1 (active items)
│   └── WAIVERS.md                    # Layer 1 (active waivers)
│
├── agents/                           # Agent framework
│   ├── AGENTS.md                     # Core rules (Layer 2)
│   ├── capabilities.md               # Capability list (Layer 2)
│   ├── roles/                        # Role definitions (Layer 2)
│   │   ├── primary.md
│   │   ├── secondary.md
│   │   ├── reviewer.md
│   │   └── release.md
│   ├── prompts/                      # Agent prompts (Layer 1)
│   │   ├── task_packet.md
│   │   └── pr_template.md
│   └── checklists/                   # Checklists (Layer 3)
│       ├── change-plan.md
│       ├── pr-review.md
│       └── incident.md
│
├── templates/                        # Document templates (Layer 3)
│   ├── AGENT_LOG_TEMPLATE.md
│   ├── AGENT_TRACE_SCHEMA.json
│   ├── WAIVER_TEMPLATE.md
│   ├── ADR_TEMPLATE.md
│   ├── RUNBOOK_TEMPLATE.md
│   ├── RFC_TEMPLATE.md
│   └── PR_TEMPLATE.md
│
├── docs/                             # Documentation
│   ├── DOCS_INDEX.md                 # Index (Layer 2)
│   ├── standards/                    # Standards (Layer 2/3)
│   │   ├── manifest.md
│   │   ├── documentation.md
│   │   ├── adr.md
│   │   ├── api.md
│   │   └── style.md
│   └── adr/                          # ADR history (Layer 1)
│       ├── README.md
│       └── 0001-example.md
│
├── automation/                       # Automation (Layer 3)
│   ├── ci/
│   │   └── governance-verify.yml
│   └── scripts/
│       ├── governance-verify.js
│       └── validate-agent-trace.js
│
├── hitl/                             # HITL items (Layer 1)
│   └── HITL-XXXX.md
│
├── waivers/                          # Waiver files (Layer 1)
│   ├── active/
│   │   └── WAIVER-XXXX.md
│   └── historical/
│       └── archived-waivers/
│
└── archive/                          # Archives (Layer 1)
    ├── todo/                         # TODO snapshots
    └── pre-update-v1.0.0/            # Update backups
```

**File Count:** ~35 files total
- **Tier 1 (Minimal):** 10 files
- **Tier 2 (Standard):** 25 files
- **Tier 3 (Complete):** 35 files

---

## Appendix B: Command Reference

### CLI Commands Summary

```bash
# Initialization
governance-cli init [options]
  --tier=minimal|standard|complete    # Default: minimal
  --from=starter-kit                  # Use starter kit
  --type=javascript-backend|react...  # Kit type
  --dry-run                           # Preview only

# Validation
governance-cli validate [options]
  --manifest                          # Check manifest only
  --policies                          # Check policies
  --structure                         # Check folder structure
  --verbose                           # Detailed output

# Verification
governance-cli verify [options]
  --profile=quick|ci|release          # Verification profile
  --skip-security                     # Skip security checks
  --skip-boundaries                   # Skip boundary checks
  --fail-fast                         # Stop on first error

# Updates
governance-cli check-updates          # Check for updates
governance-cli update [options]
  --dry-run                           # Preview changes
  --backup                            # Force backup (default: true)
  --auto-resolve                      # Auto-resolve simple conflicts

governance-cli migrate [options]
  --to=vX.Y.Z                         # Target version
  --interactive                       # Step-by-step wizard
  --force                             # Skip safety checks

governance-cli rollback [options]
  --to=vX.Y.Z                         # Rollback to version
  --list                              # List available backups

# Waiver Management
governance-cli waiver create [options]
  --gate=coverage|performance|warnings
  --reason="..."                      # Required
  --expires=YYYY-MM-DD                # Default: 30 days

governance-cli waiver list            # List active waivers
governance-cli waiver review --id=... # Review waiver
governance-cli waiver expire --id=... # Expire waiver

# HITL Management
governance-cli hitl create [options]
  --category=risk|external|clarification
  --summary="..."                     # Required
  --owner=@username                   # Default: current user

governance-cli hitl list              # List HITL items
governance-cli hitl complete --id=... # Mark complete
governance-cli hitl status            # Status summary

# Reporting
governance-cli report [options]
  --format=text|json|html             # Output format
  --output=file.html                  # Save to file
  --open                              # Open in browser

# Utilities
governance-cli version                # Show version info
governance-cli config                 # Show configuration
governance-cli doctor                 # Check setup health
governance-cli help [command]         # Get help
```

---

## Appendix C: Timeline Summary

### 14-Week Implementation Plan

**Weeks 1-2: Template Creation** ✅
- Build complete .repo/ structure
- Convert specs to files
- Create VERSION tracking
- Test manual injection

**Weeks 3-4: Injection Guide** ✅
- Write step-by-step guide
- Create manifest filling guide
- Build troubleshooting FAQ
- Test with non-technical user

**Weeks 5-6: Basic CLI** 🔧
- `init` command
- `validate` command
- `verify` command
- NPM packaging

**Weeks 7-8: Starter Kits (1-2)** 🎁
- JavaScript backend kit
- React frontend kit
- Test both thoroughly

**Weeks 9-10: Update System** 🔄
- `check-updates` command
- `update` command with backup
- Conflict resolution
- Testing

**Weeks 11-12: Documentation** 📚
- Customization guide
- Update strategy guide
- Complete CLI docs
- Video walkthrough (optional)

**Weeks 13-14: Examples & Polish** ✨
- Minimal integration example
- Standard integration example
- Polish CLI errors/messages
- Release v1.0.0

---

## Conclusion: Your Path Forward

### Immediate Actions (This Week)

1. **Review this plan** - Understand the two-part system (source + injected)
2. **Prioritize** - Decide which phases to do first
3. **Set up template folder** - Start building `templates/.repo/`
4. **Write injection guide** - Document manual steps before CLI exists

### Success Looks Like

**In 2 Weeks:**
- ✅ Can manually copy .repo/ to any project
- ✅ Non-technical person can follow injection guide
- ✅ Minimal starter kit works

**In 6 Weeks:**
- ✅ CLI tool automates injection
- ✅ 2 starter kits available
- ✅ Validation catches errors
- ✅ Verification runs checks

**In 14 Weeks:**
- ✅ Complete CLI with all commands
- ✅ Update system preserves customizations
- ✅ Multiple working examples
- ✅ Comprehensive documentation
- ✅ v1.0.0 released

### The Key Insight

**This repo contains TWO products:**
1. **The Governance Framework** (policies, templates, standards)
2. **The Injection System** (CLI, starter kits, guides)

Building Product #1 is mostly done (Phases 1-9 define it).
Building Product #2 is the work ahead (Phases A-E in this guide).

Focus on making Product #2 so good that injecting governance is easier than not having governance.

---

**Status:** PLANNING COMPLETE - Ready for Implementation  
**Next Step:** Create `templates/.repo/` folder and start Phase A  
**Questions?** See `docs/troubleshooting.md` (to be created)
