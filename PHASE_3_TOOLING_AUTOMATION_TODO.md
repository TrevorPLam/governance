# Phase 3: Automation - Build CLI Tool (Weeks 5-8)
## Priority: 🔴 High | Timeline: 4 weeks | Effort: High

---

## Overview
Build the `governance-cli` tool that automates template injection, validation, and verification. This phase transforms the manual copy-paste process (30 minutes) into a 5-minute automated process. After this phase, governance becomes truly easy to adopt at scale.

**Prerequisites:** Phase 2 complete (Tier 2 template working)

**🎯 MILESTONE:** After completing this phase, you can inject governance into repos in 5 minutes using `governance-cli init`. You can update all your governed repos with `governance-cli update`.

---

## 📋 Tasks

### 1. CLI Infrastructure Setup
**Goal:** Create Node.js CLI project structure

#### 1.1 Initialize Project
- [ ] Create `tools/governance-cli/` folder
- [ ] Initialize package.json:
  - [ ] Set name: `@trevorplam/governance-cli`
  - [ ] Set version: `1.0.0`
  - [ ] Add description
  - [ ] Define bin entry point
  - [ ] Add keywords for npm
  
- [ ] Configure TypeScript:
  - [ ] Create tsconfig.json
  - [ ] Enable strict mode
  - [ ] Set up module resolution
  - [ ] Configure output directory

- [ ] Set up dependencies:
  - [ ] Add commander (CLI framework)
  - [ ] Add inquirer (interactive prompts)
  - [ ] Add chalk (colored output)
  - [ ] Add ajv (JSON schema validation)
  - [ ] Add js-yaml (YAML parsing)
  - [ ] Add fs-extra (file operations)

- [ ] Set up development:
  - [ ] Add TypeScript
  - [ ] Add ESLint + Prettier
  - [ ] Add Jest for testing
  - [ ] Create build script
  - [ ] Create dev script with watch mode

#### 1.2 Create Project Structure
- [ ] Create folder structure:
  ```
  tools/governance-cli/
  ├── src/
  │   ├── commands/
  │   │   ├── init.ts
  │   │   ├── validate.ts
  │   │   ├── verify.ts
  │   │   ├── update.ts
  │   │   ├── waiver.ts
  │   │   ├── hitl.ts
  │   │   └── migrate.ts
  │   ├── utils/
  │   │   ├── files.ts
  │   │   ├── manifest.ts
  │   │   ├── templates.ts
  │   │   └── git.ts
  │   ├── validators/
  │   │   ├── manifest-validator.ts
  │   │   └── schema-validator.ts
  │   ├── types/
  │   │   └── index.ts
  │   └── cli.ts (main entry point)
  ├── bin/
  │   └── governance (executable)
  ├── templates/ (symlink to ../../templates/)
  └── package.json
  ```

### 2. Implement Core Commands

#### 2.1 `governance-cli init` Command
**Goal:** Automate template injection (replaces manual copy-paste)

- [ ] Implement interactive wizard:
  - [ ] Detect project type (npm, yarn, pip, etc.)
  - [ ] Prompt for project name
  - [ ] Prompt for tier (Minimal/Standard/Complete)
  - [ ] Confirm injection

- [ ] Implement file copying:
  - [ ] Copy templates/.repo/ to target project
  - [ ] Copy TODO files (P0/P1/P2/COMPLETED)
  - [ ] Create .repo/hitl/ folder
  - [ ] Create .repo/waivers/ folders
  - [ ] Create .repo/archive/ folder

- [ ] Implement auto-fill manifest:
  - [ ] Detect package.json and extract scripts
  - [ ] Auto-fill `install` command
  - [ ] Auto-fill `check:quick` command
  - [ ] Auto-fill `check:ci` command
  - [ ] Mark unclear items as `<FILL_FROM_REPO>`
  - [ ] Preserve `<UNKNOWN>` for truly unknowable items

- [ ] Add .gitignore entries:
  - [ ] Add .repo/archive/
  - [ ] Add temporary governance files

- [ ] Create success message:
  - [ ] Show what was created
  - [ ] Show next steps
  - [ ] Explain how to fill remaining manifest fields

#### 2.2 `governance-cli validate` Command
**Goal:** Check manifest completeness and validity

- [ ] Implement manifest validation:
  - [ ] Check for `<FILL_FROM_REPO>` placeholders
  - [ ] Verify commands exist (attempt to run with --help)
  - [ ] Validate YAML syntax
  - [ ] Check required sections present
  - [ ] Validate against JSON schema

- [ ] Implement policy validation:
  - [ ] Check all 7 policy files exist
  - [ ] Verify VERSION markers present
  - [ ] Check for Layer markers
  - [ ] Validate no accidental edits to Layer 2 files

- [ ] Implement structure validation:
  - [ ] Check folder structure correct
  - [ ] Verify template files present
  - [ ] Check documentation structure

- [ ] Generate validation report:
  - [ ] List all issues found
  - [ ] Provide fix suggestions
  - [ ] Exit with error code if invalid

#### 2.3 `governance-cli verify` Command
**Goal:** Run governance checks (for CI/CD)

- [ ] Implement basic verification:
  - [ ] Run manifest validation
  - [ ] Check policy compliance
  - [ ] Verify agent logs present (if configured)
  - [ ] Check for required artifacts

- [ ] Support verification profiles:
  - [ ] `--profile=quick`: Fast checks
  - [ ] `--profile=ci`: Full CI checks
  - [ ] `--profile=release`: Pre-release checks

- [ ] Generate verification report:
  - [ ] List passed checks
  - [ ] List failed checks
  - [ ] List waivers needed
  - [ ] Exit with proper status code

#### 2.4 `governance-cli check-updates` Command
**Goal:** Check for newer governance versions

- [ ] Implement version checking:
  - [ ] Read local .repo/VERSION file
  - [ ] Check latest version from templates/
  - [ ] Compare versions (semver)
  - [ ] List changes available

- [ ] Show update information:
  - [ ] Current version
  - [ ] Latest version
  - [ ] Breaking changes (if any)
  - [ ] New features
  - [ ] Bug fixes

#### 2.5 `governance-cli update` Command  
**Goal:** Apply updates preserving customizations

- [ ] Implement update logic:
  - [ ] Create backup in .repo/archive/pre-update-vX.Y.Z/
  - [ ] Update Layer 2 files (policies)
  - [ ] Update Layer 3 files (templates, scripts)
  - [ ] Preserve Layer 1 files (manifest, prompts, ADRs, waivers)

- [ ] Support dry-run mode:
  - [ ] `--dry-run`: Show what would change
  - [ ] Display diff for each file
  - [ ] Don't actually modify anything

- [ ] Implement conflict detection:
  - [ ] Check for Layer 2 modifications
  - [ ] Warn if customizations found
  - [ ] Provide merge options

- [ ] Validate after update:
  - [ ] Run validate command
  - [ ] If validation fails, offer rollback
  - [ ] Show success message
#### 2.6 Helper Commands
**Goal:** Useful utility commands

- [ ] Implement `governance-cli waiver`:
  - [ ] `create`: Create waiver file from template
  - [ ] `list`: Show active waivers
  - [ ] `expire`: Mark waiver as expired

- [ ] Implement `governance-cli hitl`:
  - [ ] `create`: Create HITL item
  - [ ] `list`: Show HITL items
  - [ ] `complete`: Mark HITL complete

- [ ] Implement `governance-cli doctor`:
  - [ ] Check CLI installation
  - [ ] Verify templates accessible
  - [ ] Test git availability
  - [ ] Validate environment

### 3. CLI Testing & Packaging
**Goal:** Ensure CLI works reliably

- [ ] Write tests:
  - [ ] Unit tests for each command
  - [ ] Integration tests for workflows
  - [ ] Test auto-fill logic
  - [ ] Test update logic
  - [ ] Test error scenarios

- [ ] Test on real projects:
  - [ ] Test init on empty project
  - [ ] Test init on existing project
  - [ ] Test validate on good manifest
  - [ ] Test validate on bad manifest
  - [ ] Test update scenario

- [ ] Package CLI:
  - [ ] Build TypeScript to JavaScript
  - [ ] Create executable
  - [ ] Test installation locally
  - [ ] Write CLI documentation
  - [ ] Create README for CLI

### 4. NPM Publishing (Optional)
**Goal:** Distribute CLI via NPM

- [ ] Prepare for publishing:
  - [ ] Add .npmignore
  - [ ] Update package.json metadata
  - [ ] Add keywords for discoverability
  - [ ] Write comprehensive README
  - [ ] Add LICENSE file

- [ ] Test installation:
  - [ ] Test `npm install -g`
  - [ ] Test commands work globally
  - [ ] Test on different OS (Mac, Linux, Windows)

- [ ] Publish to NPM:
  - [ ] Create NPM account (if needed)
  - [ ] Run `npm publish`
  - [ ] Test installation from NPM
  - [ ] Share installation instructions

---

## 🎉 Phase 3 Complete - Major Milestone Reached!

### ✅ Success Criteria
- [ ] CLI tool built and packaged
- [ ] All 5 core commands working (init, validate, verify, check-updates, update)
- [ ] Auto-fill manifest logic works
- [ ] Update preserves customizations
- [ ] Tested on 3+ real projects
- [ ] Installation instructions clear

### 🚀 YOU CAN NOW INJECT GOVERNANCE IN 5 MINUTES!

**What changed from Phase 2:**
- **Phase 2 (Manual):** Copy-paste process, ~40 minutes per repo
- **Phase 3 (Automated):** CLI commands, ~5 minutes per repo

**How to inject (Now Automated):**
```bash
# Install CLI globally
npm install -g @trevorplam/governance-cli

# Navigate to your project
cd /path/to/your/project

# Inject governance
governance-cli init

# Answer a few questions (project name, tier)
# CLI auto-fills manifest from package.json
# Done!

# Validate setup
governance-cli validate

# Run governance checks
governance-cli verify --profile=quick
```

**Time per injection:** ~5 minutes (8x faster than manual!)  
**What you get:** Same governance framework, but automated  
**Bonus:** Can update all repos easily with `governance-cli update`

### 📊 Impact Metrics

**Manual Process (Phase 1-2):**
- Time: 30-40 min per repo
- 10 repos = 5-7 hours
- Error-prone (manual copy)
- Updates: Very hard

**Automated Process (Phase 3):**
- Time: 5 min per repo
- 10 repos = 50 minutes
- Consistent (automated)
- Updates: One command

**You can now inject governance into ALL your repos! 🎯**

Next steps:
- Phase 4: Documentation & examples (optional)
- Phase 5: Advanced features (optional)
- **OR**: Start injecting into your repos now!

---

## 📊 Success Criteria

- [ ] CLI commands all working
- [ ] Auto-fill logic implemented
- [ ] Update system preserves customizations
- [ ] Tested on real projects
- [ ] Installation documented
- [ ] Published to NPM (optional)

---

## 📈 Key Deliverables

1. **governance-cli Tool** - Complete CLI with 5+ commands
2. **Auto-fill Logic** - Detects package.json and fills manifest
3. **Update System** - Safe updates preserving Layer 1
4. **CLI Documentation** - README and help system
5. **NPM Package** - Installable via `npm install -g` (optional)
6. **Test Suite** - Comprehensive testing

---

## 🔗 Dependencies

**Prerequisites:**
- Phase 2 complete (Tier 2 template working)
- Node.js and TypeScript knowledge

**Enables:**
- Rapid governance injection (5 min vs 40 min)
- Easy updates across all repos
- Scalable to many repositories
- Phase 4-6 (optional enhancements)

---

## ⚠️ Notes

- TypeScript/Node.js required - hire developer if needed
- Can skip NPM publishing for private use
- Focus on init/validate/update commands first
- Test thoroughly on diverse projects
- Waiver/HITL commands can be Phase 5

---

## 📅 Timeline Breakdown

**Week 5:**
- Days 1-2: CLI infrastructure setup
- Days 3-4: Implement init command
- Day 5: Implement validate command

**Week 6:**
- Days 1-2: Implement verify command
- Days 3-4: Implement check-updates and update commands
- Day 5: Helper commands (waiver, hitl, doctor)

**Week 7:**
- Days 1-3: Write tests
- Days 4-5: Test on real projects

**Week 8:**
- Days 1-2: Fix bugs, polish
- Days 3-4: Package and documentation
- Day 5: NPM publishing (optional)

---

**Status:** NOT STARTED  
**Last Updated:** 2026-01-22

- [ ] Implement waiver checker:
  - [ ] Validate active waivers
  - [ ] Check expiration dates
  - [ ] Verify waiver approvals
  - [ ] Detect waiver abuse
  - [ ] Generate waiver reports

### 4. CI/CD Templates and Integrations
**Goal:** Ready-to-use CI/CD configurations

#### 4.1 GitHub Actions Workflows
- [ ] Create .github/workflows/templates/ folder
- [ ] Create governance-check.yml:
  - [ ] Run on PR creation/update
  - [ ] Execute governance verify
  - [ ] Check boundaries
  - [ ] Validate manifest
  - [ ] Post results as comments
  - [ ] Block merge on failures (configurable)

- [ ] Create quality-gates.yml:
  - [ ] Run tests with coverage
  - [ ] Check coverage thresholds
  - [ ] Run linters
  - [ ] Verify build succeeds
  - [ ] Check documentation
  - [ ] Generate quality report

- [ ] Create security-scan.yml:
  - [ ] Dependency vulnerability scan
  - [ ] Secret scanning
  - [ ] SAST scanning
  - [ ] Container scanning (if applicable)
  - [ ] Generate security report
  - [ ] Block on critical issues

- [ ] Create release.yml:
  - [ ] Validate release readiness
  - [ ] Check all quality gates
  - [ ] Verify documentation updated
  - [ ] Generate release notes
  - [ ] Create GitHub release
  - [ ] Deploy artifacts

#### 4.2 Reusable Workflow Components
- [ ] Create composite actions:
  - [ ] governance-setup action
  - [ ] boundary-check action
  - [ ] quality-check action
  - [ ] security-check action
  - [ ] report-upload action

- [ ] Document workflow usage:
  - [ ] Create workflow guide
  - [ ] Include configuration examples
  - [ ] Document customization options
  - [ ] Add troubleshooting section

#### 4.3 Other CI/CD Platforms
- [ ] Create templates for other platforms:
  - [ ] GitLab CI (.gitlab-ci.yml)
  - [ ] CircleCI (config.yml)
  - [ ] Jenkins (Jenkinsfile)
  - [ ] Azure Pipelines (azure-pipelines.yml)

- [ ] Document platform-specific setup:
  - [ ] Installation instructions
  - [ ] Configuration guide
  - [ ] Example pipelines
  - [ ] Migration guide

### 5. Validation Tools
**Goal:** Standalone validators for specific aspects

- [ ] Create tools/validators/ folder
- [ ] Implement manifest validator:
  - [ ] JSON schema validation
  - [ ] Required field checking
  - [ ] Type validation
  - [ ] Cross-reference validation
  - [ ] Generate validation report

- [ ] Implement policy validator:
  - [ ] Check policy completeness
  - [ ] Verify policy consistency
  - [ ] Validate policy references
  - [ ] Check for conflicts
  - [ ] Generate policy report

- [ ] Implement template validator:
  - [ ] Verify all templates exist
  - [ ] Check template structure
  - [ ] Validate template variables
  - [ ] Test template rendering
  - [ ] Generate template report

- [ ] Implement agent log validator:
  - [ ] Parse agent logs
  - [ ] Verify log structure
  - [ ] Check required fields
  - [ ] Validate decision trail
  - [ ] Generate log analysis

### 6. Automation Scripts
**Goal:** Helpful scripts for common tasks

- [ ] Create tools/scripts/ folder
- [ ] Create setup scripts:
  - [ ] install-dependencies.sh
  - [ ] setup-dev-environment.sh
  - [ ] configure-git-hooks.sh

- [ ] Create maintenance scripts:
  - [ ] update-policies.sh
  - [ ] archive-old-waivers.sh
  - [ ] cleanup-logs.sh
  - [ ] backup-governance.sh

- [ ] Create reporting scripts:
  - [ ] generate-compliance-report.sh
  - [ ] generate-metrics-dashboard.sh
  - [ ] export-audit-log.sh

- [ ] Create migration scripts:
  - [ ] migrate-to-v2.sh
  - [ ] update-manifest-schema.sh
  - [ ] convert-old-waivers.sh

### 7. Testing and Quality Assurance
**Goal:** Ensure tool reliability

- [ ] Write unit tests:
  - [ ] CLI command tests
  - [ ] Validator tests
  - [ ] Boundary checker tests
  - [ ] Verifier tests
  - [ ] Utility function tests
  - [ ] Achieve 80%+ coverage

- [ ] Write integration tests:
  - [ ] End-to-end CLI tests
  - [ ] Workflow integration tests
  - [ ] Multi-tool integration tests
  - [ ] Real repository tests

- [ ] Perform manual testing:
  - [ ] Test all CLI commands
  - [ ] Test in different environments
  - [ ] Test error scenarios
  - [ ] Test edge cases
  - [ ] Test performance

- [ ] Create test fixtures:
  - [ ] Sample repositories
  - [ ] Sample manifests
  - [ ] Sample policies
  - [ ] Sample violations
  - [ ] Sample reports

### 8. Documentation and Distribution
**Goal:** Make tools easy to use and distribute

- [ ] Create tool documentation:
  - [ ] tools/cli/README.md
  - [ ] tools/boundary-checker/README.md
  - [ ] tools/governance-verifier/README.md
  - [ ] tools/validators/README.md
  - [ ] tools/scripts/README.md

- [ ] Create user guides:
  - [ ] docs/guides/CLI_USAGE.md
  - [ ] docs/guides/CI_CD_INTEGRATION.md
  - [ ] docs/guides/AUTOMATION.md
  - [ ] docs/guides/TROUBLESHOOTING_TOOLS.md

- [ ] Prepare for distribution:
  - [ ] Configure npm package
  - [ ] Create binary distribution
  - [ ] Set up GitHub releases
  - [ ] Create installation guide
  - [ ] Document version compatibility

---

## 📊 Success Criteria

- [ ] CLI tool has all 8 core commands working
- [ ] Boundary checker detects violations accurately
- [ ] Governance verifier validates all policies
- [ ] CI/CD templates work on GitHub Actions
- [ ] All validators function correctly
- [ ] Automation scripts are tested
- [ ] 80%+ test coverage achieved
- [ ] Documentation is comprehensive
- [ ] Tools are ready for distribution
- [ ] Integration tests pass

---

## 📈 Key Deliverables

1. **CLI Tool** - Full-featured governance CLI with 8 commands
2. **Boundary Checker** - Automated dependency validation
3. **Governance Verifier** - Comprehensive compliance checker
4. **CI/CD Templates** - Ready-to-use workflows (GitHub Actions + others)
5. **Validation Tools** - Standalone validators for manifest, policies, etc.
6. **Automation Scripts** - Common task automation
7. **Test Suite** - Comprehensive unit and integration tests
8. **Tool Documentation** - Complete usage guides

---

## 🔗 Dependencies

**Prerequisites:**
- Phase 1 complete (folder structure)
- Phase 2 complete (framework defined)
- Node.js and npm installed
- TypeScript configured

**Enables:**
- Phase 4: Examples use these tools
- Phase 5: Advanced features build on tools
- All future governance automation

---

## ⚠️ Notes

- Focus on CLI UX - make it intuitive and helpful
- Ensure all tools are well-tested and reliable
- Performance matters - tools should be fast
- Error messages should be actionable
- Support both interactive and CI/CD modes
- Consider Windows, Mac, Linux compatibility
- Plan for future extensions and plugins
- Keep tools modular and composable

---

## 📅 Timeline Breakdown

**Week 5:**
- Days 1-2: CLI infrastructure setup
- Days 3-4: Implement init, validate, verify commands
- Day 5: Implement check and report commands

**Week 6:**
- Days 1-2: Implement waiver, hitl, migrate commands
- Days 3-4: Build boundary checker
- Day 5: Build governance verifier

**Week 7:**
- Days 1-2: Create CI/CD templates (GitHub Actions)
- Days 3-4: Build validation tools
- Day 5: Create automation scripts

**Week 8:**
- Days 1-2: Write comprehensive tests
- Days 3-4: Create documentation
- Day 5: Final testing and distribution preparation

---

**Status:** NOT STARTED  
**Last Updated:** 2026-01-22  
**Depends On:** PHASE_1_FOUNDATION_TODO.md, PHASE_2_CORE_FRAMEWORK_TODO.md
