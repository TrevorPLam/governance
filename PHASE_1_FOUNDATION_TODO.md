# Phase 1: Foundation - Build Injectable Templates (Weeks 1-2)
## Priority: 🔴 Immediate | Timeline: 2 weeks | Effort: Low-Medium

---

## Overview
Build the foundational `.repo/` template structure that can be injected into external repositories. This phase focuses on creating the actual governance files (not just specs) that external repos will copy and use. By the end of this phase, you'll have a working template ready to inject manually into your first external repo.

**🎯 MILESTONE:** After completing this phase, you can manually inject governance into your other repos (copy-paste process, ~30 minutes per repo).

---

## 📋 Tasks

### 1. Create Injectable Template Structure
**Goal:** Build `templates/.repo/` folder with ready-to-copy governance files

- [ ] Create template folder structure:
  - [ ] Create `templates/` folder in repository root
  - [ ] Create `templates/.repo/` folder
  - [ ] Create `templates/.repo/policy/` folder (for 7 policy files)
  - [ ] Create `templates/.repo/agents/` folder (for agent framework)
  - [ ] Create `templates/.repo/agents/roles/` folder
  - [ ] Create `templates/.repo/agents/prompts/` folder
  - [ ] Create `templates/.repo/agents/checklists/` folder
  - [ ] Create `templates/.repo/templates/` folder (for document templates)
  - [ ] Create `templates/.repo/docs/` folder
  - [ ] Create `templates/.repo/docs/standards/` folder
  - [ ] Create `templates/.repo/docs/adr/` folder
  - [ ] Create `templates/.repo/automation/` folder
  - [ ] Create `templates/.repo/automation/ci/` folder
  - [ ] Create `templates/.repo/automation/scripts/` folder
  - [ ] Create `templates/root-files/` folder (for TODO templates)

### 2. Build Policy Files (From Phase 2 Specs)
**Goal:** Convert phase2.md specifications into actual policy files

- [ ] Create `templates/.repo/policy/CONSTITUTION.md`:
  - [ ] Copy content from `00. Implementation/phase2.md` (lines 6-41)
  - [ ] Add VERSION marker at top: `<!-- GOVERNANCE_VERSION: 1.0.0 -->`
  - [ ] Add update marker: `<!-- GOVERNANCE: UPDATEABLE - Layer 2 -->`
  - [ ] Verify all 8 articles are present
  - [ ] Ensure plain English throughout

- [ ] Create `templates/.repo/policy/PRINCIPLES.md`:
  - [ ] Copy content from `00. Implementation/phase2.md` (lines 43-119)
  - [ ] Add VERSION and UPDATEABLE markers
  - [ ] Verify all P3-P25 principles are present
  - [ ] Ensure examples are clear
  - [ ] Add filepath requirement note

- [ ] Create `templates/.repo/policy/QUALITY_GATES.md`:
  - [ ] Copy content from `00. Implementation/phase2.md` (lines 121-163)
  - [ ] Add VERSION and UPDATEABLE markers
  - [ ] Document hard gates vs waiverable gates
  - [ ] Include coverage ratchet strategy
  - [ ] Add performance budget defaults

- [ ] Create `templates/.repo/policy/SECURITY_BASELINE.md`:
  - [ ] Copy content from `00. Implementation/phase2.md` (lines 165-215)
  - [ ] Add VERSION and UPDATEABLE markers
  - [ ] List all 10 security review triggers
  - [ ] Document 8 mandatory HITL actions
  - [ ] Include forbidden patterns list

- [ ] Create `templates/.repo/policy/BOUNDARIES.md`:
  - [ ] Copy content from `00. Implementation/phase2.md` (lines 217-266)
  - [ ] Add VERSION and UPDATEABLE markers
  - [ ] Document layer model (ui → domain → data → platform)
  - [ ] Include cross-feature rules
  - [ ] Add practical examples

- [ ] Create `templates/.repo/policy/HITL.md`:
  - [ ] Copy content from `00. Implementation/phase2.md` (lines 268-336)
  - [ ] Add VERSION marker: `<!-- GOVERNANCE: CUSTOM - Layer 1 -->`
  - [ ] Include empty Active and Archived tables
  - [ ] Add HITL item template structure
  - [ ] Document statuses and workflows

- [ ] Create `templates/.repo/policy/WAIVERS.md`:
  - [ ] Create basic waiver structure
  - [ ] Add VERSION marker: `<!-- GOVERNANCE: CUSTOM - Layer 1 -->`
  - [ ] Include waiver template
  - [ ] Document expiration rules
  - [ ] Add tracking tables (Active/Historical)

### 3. Build Manifest Template (From Phase 3 Specs)
**Goal:** Create customizable repo.manifest.yaml template

- [ ] Create `templates/.repo/repo.manifest.yaml`:
  - [ ] Copy structure from `00. Implementation/phase3.md` (lines 7-63)
  - [ ] Add VERSION marker: `<!-- GOVERNANCE: CUSTOM - Layer 1 -->`
  - [ ] Keep `<FILL_FROM_REPO>` placeholders for commands
  - [ ] Include all canonical command sections
  - [ ] Add verify_profiles section
  - [ ] Document boundaries and security settings

- [ ] Create `templates/.repo/docs/standards/manifest.md`:
  - [ ] Copy from `00. Implementation/phase3.md` (lines 67-110)
  - [ ] Add plain English explanation
  - [ ] Include command resolution process
  - [ ] Document `<UNKNOWN>` handling
  - [ ] Provide common examples (npm, yarn, pip, etc.)

### 4. Build Entry Point Documents
**Goal:** Create governance entry point and version tracking

- [ ] Create `templates/.repo/GOVERNANCE.md`:
  - [ ] Write plain English explanation of governance system
  - [ ] Link to CONSTITUTION and PRINCIPLES
  - [ ] Explain how to use the .repo/ folder
  - [ ] Add quick start guide
  - [ ] Include "read this first" section
  - [ ] Link to DOCS_INDEX

- [ ] Create `templates/.repo/VERSION`:
  - [ ] Add version number: `1.0.0`
  - [ ] Add creation date
  - [ ] Document version format (semver)

### 5. Build Root Scaffold Files (From Phase 9 Specs)
**Goal:** Create TODO templates for project root

- [ ] Create `templates/root-files/P0TODO.md`:
  - [ ] Add template header explaining P0 (urgent/blocking)
  - [ ] Include format guidance
  - [ ] Add example task

- [ ] Create `templates/root-files/P1TODO.md`:
  - [ ] Add template header explaining P1 (high priority)
  - [ ] Include format guidance
  - [ ] Add example task

- [ ] Create `templates/root-files/P2TODO.md`:
  - [ ] Add template header explaining P2 (normal priority)
  - [ ] Include format guidance
  - [ ] Add example task

- [ ] Create `templates/root-files/COMPLETEDTODO.md`:
  - [ ] Add archive header
  - [ ] Include archiving instructions
  - [ ] Add example completed task

### 6. Test Template on Sample Project
**Goal:** Validate templates work before Phase 2

- [ ] Create test project folder outside this repo
- [ ] Copy `templates/.repo/` to test project
- [ ] Copy `templates/root-files/*.md` to test project root
- [ ] Verify all files are present and readable
- [ ] Check for broken links or references
- [ ] Attempt to fill manifest manually
- [ ] Document any issues found

### 7. Write Basic Injection Guide
**Goal:** Enable manual injection before CLI exists

- [ ] Create `docs/injection-guide-manual.md`:
  - [ ] Step 1: Copy .repo/ folder to your project
  - [ ] Step 2: Copy TODO files to project root
  - [ ] Step 3: Open repo.manifest.yaml
  - [ ] Step 4: Find your package.json (or equivalent)
  - [ ] Step 5: Fill manifest commands section
  - [ ] Step 6: Set `<UNKNOWN>` for unclear items
  - [ ] Step 7: Commit the new files
  - [ ] Include screenshots or examples
  - [ ] Add troubleshooting section

---

## 🎉 Phase 1 Complete - Milestone Reached!

### ✅ Success Criteria
- [ ] All 7 policy files exist in `templates/.repo/policy/`
- [ ] Manifest template exists with proper placeholders
- [ ] Entry point (GOVERNANCE.md) is clear and helpful
- [ ] TODO templates are ready to use
- [ ] Successfully copied template to test project
- [ ] Manual injection guide is complete and tested

### 🚀 YOU CAN NOW INJECT GOVERNANCE INTO YOUR OTHER REPOS!

**How to inject (Manual Process):**
1. Copy `templates/.repo/` folder to your project root
2. Copy `templates/root-files/*.md` to your project root
3. Follow `docs/injection-guide-manual.md` to fill the manifest
4. Commit and start using governance

**Time per injection:** ~30 minutes  
**What you get:** Full governance framework in any repo  
**Next:** Phase 2 adds agent framework, templates, and docs (optional but recommended)

---

## 📊 Success Criteria

- [ ] All 7 policy files exist in `templates/.repo/policy/`
- [ ] Manifest template exists with proper placeholders
- [ ] Entry point (GOVERNANCE.md) is clear and helpful
- [ ] TODO templates are ready to use
- [ ] Successfully copied template to test project
- [ ] Manual injection guide is complete and tested

---

## 📈 Key Deliverables

1. **Injectable .repo/ Template** - 10 core governance files ready to copy
2. **Manifest Template** - repo.manifest.yaml with fill-in placeholders
3. **Manual Injection Guide** - Step-by-step instructions for non-coders
4. **TODO Templates** - P0/P1/P2/COMPLETED task management files
5. **Entry Point** - GOVERNANCE.md explaining the system
6. **Working Test** - Validated on sample project

---

## 🔗 Dependencies

**Prerequisites:**
- Understanding of 9 implementation phases (from `00. Implementation/`)
- Planning documents (INJECTABLE_FRAMEWORK_PLANNING_GUIDE.md, etc.)

**Enables:**
- Manual governance injection into any repo
- Phase 2: Adding agent framework and templates
- Testing governance in real projects

---

## ⚠️ Notes

- Focus on MINIMAL viable template (Tier 1: 10 files)
- All files must have clear layer markers (Layer 1/2/3)
- Keep `<FILL_FROM_REPO>` placeholders where customization is needed
- Test on real project before considering complete
- This creates "Manual Path" - CLI comes in Phase 3

---

## 📅 Timeline Breakdown

**Week 1:**
- Days 1-2: Create folder structure + 7 policy files
- Days 3-4: Build manifest template + standards doc
- Day 5: Entry point docs + TODO templates

**Week 2:**
- Days 1-2: Write manual injection guide
- Days 3: Test on sample project
- Days 4-5: Fix issues, polish, document learnings

---

**Status:** ✅ COMPLETE  
**Last Updated:** 2026-01-22  
**Completed:** 2026-01-22
