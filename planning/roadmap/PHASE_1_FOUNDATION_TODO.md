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

- [x] Create template folder structure:
  - [x] Create `templates/` folder in repository root
  - [x] Create `templates/.repo/` folder
  - [x] Create `templates/.repo/policy/` folder (for 7 policy files)
  - [x] Create `templates/.repo/agents/` folder (for agent framework)
  - [x] Create `templates/.repo/agents/roles/` folder
  - [x] Create `templates/.repo/agents/prompts/` folder
  - [x] Create `templates/.repo/agents/checklists/` folder
  - [x] Create `templates/.repo/templates/` folder (for document templates)
  - [x] Create `templates/.repo/docs/` folder
  - [x] Create `templates/.repo/docs/standards/` folder
  - [x] Create `templates/.repo/docs/adr/` folder
  - [x] Create `templates/.repo/automation/` folder
  - [x] Create `templates/.repo/automation/ci/` folder
  - [x] Create `templates/.repo/automation/scripts/` folder
  - [x] Create `templates/root-files/` folder (for TODO templates)

### 2. Build Policy Files (From Phase 2 Specs)
**Goal:** Convert phase2.md specifications into actual policy files

- [x] Create `templates/.repo/policy/CONSTITUTION.md`:
  - [x] Copy content from `00. Implementation/phase2.md` (lines 6-41)
  - [x] Add VERSION marker at top: `<!-- GOVERNANCE_VERSION: 1.0.0 -->`
  - [x] Add update marker: `<!-- GOVERNANCE: UPDATEABLE - Layer 2 -->`
  - [x] Verify all 8 articles are present
  - [x] Ensure plain English throughout

- [x] Create `templates/.repo/policy/PRINCIPLES.md`:
  - [x] Copy content from `00. Implementation/phase2.md` (lines 43-119)
  - [x] Add VERSION and UPDATEABLE markers
  - [x] Verify all P3-P25 principles are present
  - [x] Ensure examples are clear
  - [x] Add filepath requirement note

- [x] Create `templates/.repo/policy/QUALITY_GATES.md`:
  - [x] Copy content from `00. Implementation/phase2.md` (lines 121-163)
  - [x] Add VERSION and UPDATEABLE markers
  - [x] Document hard gates vs waiverable gates
  - [x] Include coverage ratchet strategy
  - [x] Add performance budget defaults

- [x] Create `templates/.repo/policy/SECURITY_BASELINE.md`:
  - [x] Copy content from `00. Implementation/phase2.md` (lines 165-215)
  - [x] Add VERSION and UPDATEABLE markers
  - [x] List all 10 security review triggers
  - [x] Document 8 mandatory HITL actions
  - [x] Include forbidden patterns list

- [x] Create `templates/.repo/policy/BOUNDARIES.md`:
  - [x] Copy content from `00. Implementation/phase2.md` (lines 217-266)
  - [x] Add VERSION and UPDATEABLE markers
  - [x] Document layer model (ui → domain → data → platform)
  - [x] Include cross-feature rules
  - [x] Add practical examples

- [x] Create `templates/.repo/policy/HITL.md`:
  - [x] Copy content from `00. Implementation/phase2.md` (lines 268-336)
  - [x] Add VERSION marker: `<!-- GOVERNANCE: CUSTOM - Layer 1 -->`
  - [x] Include empty Active and Archived tables
  - [x] Add HITL item template structure
  - [x] Document statuses and workflows

- [x] Create `templates/.repo/policy/WAIVERS.md`:
  - [x] Create basic waiver structure
  - [x] Add VERSION marker: `<!-- GOVERNANCE: CUSTOM - Layer 1 -->`
  - [x] Include waiver template
  - [x] Document expiration rules
  - [x] Add tracking tables (Active/Historical)

### 3. Build Manifest Template (From Phase 3 Specs)
**Goal:** Create customizable repo.manifest.yaml template

- [x] Create `templates/.repo/repo.manifest.yaml`:
  - [x] Copy structure from `00. Implementation/phase3.md` (lines 7-63)
  - [x] Add VERSION marker: `<!-- GOVERNANCE: CUSTOM - Layer 1 -->`
  - [x] Keep `<FILL_FROM_REPO>` placeholders for commands
  - [x] Include all canonical command sections
  - [x] Add verify_profiles section
  - [x] Document boundaries and security settings

- [x] Create `templates/.repo/docs/standards/manifest.md`:
  - [x] Copy from `00. Implementation/phase3.md` (lines 67-110)
  - [x] Add plain English explanation
  - [x] Include command resolution process
  - [x] Document `<UNKNOWN>` handling
  - [x] Provide common examples (npm, yarn, pip, etc.)

### 4. Build Entry Point Documents
**Goal:** Create governance entry point and version tracking

- [x] Create `templates/.repo/GOVERNANCE.md`:
  - [x] Write plain English explanation of governance system
  - [x] Link to CONSTITUTION and PRINCIPLES
  - [x] Explain how to use the .repo/ folder
  - [x] Add quick start guide
  - [x] Include "read this first" section
  - [x] Link to DOCS_INDEX

- [x] Create `templates/.repo/VERSION`:
  - [x] Add version number: `1.0.0`
  - [x] Add creation date
  - [x] Document version format (semver)

### 5. Build Root Scaffold Files (From Phase 9 Specs)
**Goal:** Create TODO templates for project root

- [x] Create `templates/root-files/P0TODO.md`:
  - [x] Add template header explaining P0 (urgent/blocking)
  - [x] Include format guidance
  - [x] Add example task

- [x] Create `templates/root-files/P1TODO.md`:
  - [x] Add template header explaining P1 (high priority)
  - [x] Include format guidance
  - [x] Add example task

- [x] Create `templates/root-files/P2TODO.md`:
  - [x] Add template header explaining P2 (normal priority)
  - [x] Include format guidance
  - [x] Add example task

- [x] Create `templates/root-files/COMPLETEDTODO.md`:
  - [x] Add archive header
  - [x] Include archiving instructions
  - [x] Add example completed task

### 6. Test Template on Sample Project
**Goal:** Validate templates work before Phase 2

- [x] Create test project folder outside this repo
- [x] Copy `templates/.repo/` to test project
- [x] Copy `templates/root-files/*.md` to test project root
- [x] Verify all files are present and readable
- [x] Check for broken links or references
- [x] Attempt to fill manifest manually
- [x] Document any issues found

### 7. Write Basic Injection Guide
**Goal:** Enable manual injection before CLI exists

- [x] Create `docs/injection-guide-manual.md`:
  - [x] Step 1: Copy .repo/ folder to your project
  - [x] Step 2: Copy TODO files to project root
  - [x] Step 3: Open repo.manifest.yaml
  - [x] Step 4: Find your package.json (or equivalent)
  - [x] Step 5: Fill manifest commands section
  - [x] Step 6: Set `<UNKNOWN>` for unclear items
  - [x] Step 7: Commit the new files
  - [x] Include screenshots or examples
  - [x] Add troubleshooting section

---

## 🎉 Phase 1 Complete - Milestone Reached!

### ✅ Success Criteria
- [x] All 7 policy files exist in `templates/.repo/policy/`
- [x] Manifest template exists with proper placeholders
- [x] Entry point (GOVERNANCE.md) is clear and helpful
- [x] TODO templates are ready to use
- [x] Successfully copied template to test project
- [x] Manual injection guide is complete and tested

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

- [x] All 7 policy files exist in `templates/.repo/policy/`
- [x] Manifest template exists with proper placeholders
- [x] Entry point (GOVERNANCE.md) is clear and helpful
- [x] TODO templates are ready to use
- [x] Successfully copied template to test project
- [x] Manual injection guide is complete and tested

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
