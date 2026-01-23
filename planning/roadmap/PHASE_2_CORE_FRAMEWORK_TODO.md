# Phase 2: Standard Framework - Add Agent System & Templates (Weeks 3-4)
## Priority: 🟡 Medium | Timeline: 2 weeks | Effort: Medium

---

## Overview
Expand the injectable template from Phase 1 (Tier 1: Minimal) to Tier 2 (Standard) by adding the agent framework, document templates, and documentation structure. This phase makes governance more powerful while still keeping manual injection possible.

**Prerequisites:** Phase 1 complete (Tier 1 template working)

**🎯 MILESTONE:** After completing this phase, you have a "Standard" governance package that includes agent guidelines, templates for ADRs/waivers, and complete documentation structure.

---

## 📋 Tasks

### 1. Build Agent Framework (From Phase 4 Specs)
**Goal:** Add agent operation guidelines and roles

- [x] Create `templates/.repo/agents/AGENTS.md`:
  - [x] Copy core rules from `00. Implementation/phase4.md`
  - [x] Add VERSION marker: `<!-- GOVERNANCE: UPDATEABLE - Layer 2 -->`
  - [x] Document three-pass code generation
  - [x] Explain UNKNOWN workflow
  - [x] Include filepath requirements
  - [x] Add boundary enforcement rules

- [x] Create `templates/.repo/agents/capabilities.md`:
  - [x] List standard capabilities (create_feature, modify_existing, etc.)
  - [x] Add VERSION marker: `<!-- GOVERNANCE: UPDATEABLE - Layer 2 -->`
  - [x] Document capability levels
  - [x] Include restrictions

- [x] Create agent role files in `templates/.repo/agents/roles/`:
  - [x] Create `primary.md`:
    - [x] Define primary agent permissions
    - [x] List allowed operations
    - [x] Document restrictions
  - [x] Create `secondary.md`:
    - [x] Define secondary agent permissions
    - [x] Document escalation rules
  - [x] Create `reviewer.md`:
    - [x] Define human reviewer role
    - [x] List review responsibilities
  - [x] Create `release.md`:
    - [x] Define release manager role
    - [x] Document deployment authority

- [x] Create agent prompts in `templates/.repo/agents/prompts/`:
  - [x] Create `task_packet.md`:
    - [x] Add VERSION marker: `<!-- GOVERNANCE: CUSTOM - Layer 1 -->`
    - [x] Include JSON template structure
    - [x] Document required fields
  - [x] Create `pr_template.md`:
    - [x] Add VERSION marker: `<!-- GOVERNANCE: CUSTOM - Layer 1 -->`
    - [x] Include PR structure template
    - [x] Document evidence requirements

- [x] Create checklists in `templates/.repo/agents/checklists/`:
  - [x] Create `change-plan.md`:
    - [x] Add VERSION marker: `<!-- GOVERNANCE: UPDATEABLE - Layer 3 -->`
    - [x] List planning checklist items
  - [x] Create `pr-review.md`:
    - [x] List review checklist items
  - [x] Create `incident.md`:
    - [x] List incident response checklist

### 2. Build Document Templates (From Phase 6 Specs)
**Goal:** Create templates for ADRs, waivers, logs, etc.

- [x] Create `templates/.repo/templates/AGENT_LOG_TEMPLATE.md`:
  - [x] Copy structure from `00. Implementation/phase6.md`
  - [x] Add VERSION marker: `<!-- GOVERNANCE: UPDATEABLE - Layer 3 -->`
  - [x] Include JSON template format
  - [x] Document required fields

- [x] Create `templates/.repo/templates/AGENT_TRACE_SCHEMA.json`:
  - [x] Copy schema from phase6.md
  - [x] Add version field
  - [x] Include validation rules

- [x] Create `templates/.repo/templates/WAIVER_TEMPLATE.md`:
  - [x] Include waiver structure
  - [x] Add VERSION marker: `<!-- GOVERNANCE: UPDATEABLE - Layer 3 -->`
  - [x] Document expiration field
  - [x] Include remediation plan section

- [x] Create `templates/.repo/templates/ADR_TEMPLATE.md`:
  - [x] Include ADR structure (context, decision, consequences)
  - [x] Add VERSION marker
  - [x] Document when to use

- [x] Create `templates/.repo/templates/RUNBOOK_TEMPLATE.md`:
  - [x] Include operational procedure structure
  - [x] Add rollback section
  - [x] Document verification steps

- [x] Create `templates/.repo/templates/RFC_TEMPLATE.md`:
  - [x] Include proposal structure
  - [x] Add alternatives section
  - [x] Document impact assessment

- [x] Create `templates/.repo/templates/PR_TEMPLATE.md`:
  - [x] Include PR structure
  - [x] Add evidence section
  - [x] Document HITL requirements
### 3. Build Documentation Structure (From Phase 8 Specs)
**Goal:** Create documentation framework

- [x] Create `templates/.repo/docs/DOCS_INDEX.md`:
  - [x] List all documentation in .repo/
  - [x] Add VERSION marker: `<!-- GOVERNANCE: UPDATEABLE - Layer 2 -->`
  - [x] Organize by category (Start Here, Standards, ADR History)
  - [x] Include navigation guidance

- [x] Create standards in `templates/.repo/docs/standards/`:
  - [x] Create `documentation.md`:
    - [x] Document docs-age-with-code principle
    - [x] Add VERSION marker: `<!-- GOVERNANCE: UPDATEABLE - Layer 2 -->`
    - [x] Include filepath requirements
  - [x] Create `adr.md`:
    - [x] Document when ADRs are required
    - [x] Reference ADR_TEMPLATE
    - [x] List triggers (dependencies, api-contract, schema, etc.)
  - [x] Create `api.md`:
    - [x] Document API documentation requirements
    - [x] Include contract change rules
  - [x] Create `style.md`:
    - [x] Document naming conventions
    - [x] Include clarity requirements
    - [x] Reference P15: Consistency Beats Novelty

- [x] Create ADR scaffold in `templates/.repo/docs/adr/`:
  - [x] Create `README.md`:
    - [x] Explain ADR system
    - [x] Add VERSION marker: `<!-- GOVERNANCE: CUSTOM - Layer 1 -->`
    - [x] Include sequential numbering guidance
  - [x] Create `0001-example.md`:
    - [x] Provide example ADR
    - [x] Show proper format
    - [x] Include all required sections

### 4. Add Folder-Level AGENT.md Guides (From Phase 4 Specs)
**Goal:** Place governance guides in key folders

- [x] Create `templates/.repo/AGENT.md`:
  - [x] Explain purpose of .repo/ folder
  - [x] Add VERSION marker: `<!-- GOVERNANCE: UPDATEABLE - Layer 2 -->`
  - [x] List what agents may/may not do
  - [x] Link to policy files

- [x] Create folder guide templates:
  - [x] Create `templates/sample-AGENT.md-for-src`:
    - [x] Template for src/ folder
    - [x] Include boundary rules
    - [x] Add allowed/forbidden sections
  - [x] Create `templates/sample-AGENT.md-for-tests`:
    - [x] Template for tests/ folder
    - [x] Include testing guidelines
  - [x] Create `templates/sample-AGENT.md-for-docs`:
    - [x] Template for docs/ folder
    - [x] Include documentation requirements

### 5. Test Tier 2 Template
**Goal:** Validate enhanced template works

- [x] Update test project from Phase 1
- [x] Copy new agent framework files
- [x] Copy new template files
- [x] Copy documentation structure
- [x] Verify all links work
- [x] Test creating a sample ADR
- [x] Test using task packet template
- [x] Document any issues

### 6. Update Injection Guide
**Goal:** Extend guide for Tier 2 features

- [x] Update `docs/injection-guide-manual.md`:
  - [x] Add section on agent framework
  - [x] Explain when to use templates
  - [x] Document ADR creation process
  - [x] Add HITL and waiver workflows
  - [x] Include folder-level AGENT.md setup
  - [x] Provide examples of customizing prompts

---

## 🎉 Phase 2 Complete - Milestone Reached!

### ✅ Success Criteria
- [x] All agent framework files exist (10 files)
- [x] All 7 templates exist
- [x] Documentation structure is complete
- [x] Folder-level guides are ready
- [x] Successfully tested on sample project
- [x] Injection guide updated for Tier 2

### 🚀 YOU NOW HAVE STANDARD GOVERNANCE PACKAGE!

**What changed from Phase 1:**
- **Phase 1 (Tier 1):** Just policies + manifest (10 files)
- **Phase 2 (Tier 2):** + Agent framework + Templates + Docs (25 files)

**How to inject (Still Manual):**
1. Copy entire `templates/.repo/` folder (now 25 files)
2. Copy TODO files
3. Fill manifest as before
4. Optionally customize agent prompts
5. Use templates for ADRs, waivers, etc.

**Time per injection:** ~40 minutes (10 min more than Tier 1)  
**What you get:** Full governance with agent guidelines and templates  
**Next:** Phase 3 builds CLI tool to automate injection (reduces to 5 minutes)

---

## 📊 Success Criteria

- [x] 10 agent framework files created
- [x] 7 document templates created
- [x] Documentation structure complete
- [x] Folder guides ready
- [x] Test project validated
- [x] Injection guide updated

---

## 📈 Key Deliverables

1. **Agent Framework** - 10 files defining agent operations
2. **Document Templates** - 7 templates (ADR, waiver, logs, etc.)
3. **Documentation Structure** - Standards and ADR scaffold
4. **Folder Guides** - AGENT.md templates for different folders
5. **Updated Injection Guide** - Instructions for Tier 2 features
6. **Working Tier 2 Test** - Validated on sample project

---

## 🔗 Dependencies

**Prerequisites:**
- Phase 1 complete (Tier 1 template working)
- Test project from Phase 1

**Enables:**
- Phase 3: CLI automation
- Richer governance in injected repos
- ADR and waiver workflows

---

## ⚠️ Notes

- Focus on Tier 2 (Standard) - 25 total files
- Agent prompts are Layer 1 (customizable per project)
- Templates are Layer 3 (can be updated safely)
- Test thoroughly before moving to Phase 3
- CLI in Phase 3 will automate this injection

---

## 📅 Timeline Breakdown

**Week 3:**
- Days 1-2: Build agent framework (10 files)
- Days 3-4: Create document templates (7 files)
- Day 5: Documentation structure

**Week 4:**
- Days 1-2: Folder-level guides + testing
- Day 3: Update injection guide
- Days 4-5: Validate, fix issues, polish

---

**Status:** ✅ COMPLETE  
**Last Updated:** 2026-01-22  
**Completed:** 2026-01-22

### 4. Create Document Templates
**Goal:** Standardized templates for all document types

- [x] Create .repo/templates/ folder structure
- [x] Create AGENT_LOG_TEMPLATE.md:
  - [x] Define log structure
  - [x] Include required fields
  - [x] Add example log entries
  - [x] Document usage guidelines

- [x] Create AGENT_TRACE_SCHEMA.json:
  - [x] Define structured trace format
  - [x] Include all trace fields
  - [x] Add validation rules
  - [x] Provide example traces

- [x] Create ADR_TEMPLATE.md:
  - [x] Define Architecture Decision Record structure
  - [x] Include status, context, decision sections
  - [x] Add consequences section
  - [x] Include metadata fields
  - [x] Provide example ADR

- [x] Create TASK_PACKET_TEMPLATE.md:
  - [x] Define task packet structure
  - [x] Include objective, context, constraints
  - [x] Add success criteria section
  - [x] Document deliverables section
  - [x] Include example task packet

- [x] Create WAIVER_REQUEST_TEMPLATE.md:
  - [x] Define waiver request structure
  - [x] Include policy being waived
  - [x] Add justification section
  - [x] Include expiration date
  - [x] Document approval process

- [x] Create PR_CHECKLIST_TEMPLATE.md:
  - [x] Define PR checklist items
  - [x] Include testing requirements
  - [x] Add documentation updates
  - [x] Include security review items
  - [x] Add quality gate checks

- [x] Create RELEASE_NOTES_TEMPLATE.md:
  - [x] Define release notes structure
  - [x] Include version and date
  - [x] Add changes section (features, fixes, breaking)
  - [x] Include upgrade instructions
  - [x] Document known issues

### 5. Create GOVERNANCE.md Contract
**Goal:** Binding governance contract for repositories

- [x] Create .repo/GOVERNANCE.md:
  - [x] Define governance scope
  - [x] List all policies and their authority
  - [x] Document enforcement mechanisms
  - [x] Include waiver process
  - [x] Add amendment procedures
  - [x] Define stakeholder roles
  - [x] Include acceptance criteria

- [x] Document governance principles:
  - [x] Transparency requirements
  - [x] Decision-making process
  - [x] Conflict resolution
  - [x] Escalation paths

### 6. Create DOCS_INDEX.md for .repo/
**Goal:** Central hub for all .repo/ documentation

- [x] Create .repo/DOCS_INDEX.md:
  - [x] List all policy documents
  - [x] Organize by category
  - [x] Include brief descriptions
  - [x] Add navigation links
  - [x] Include reading recommendations
  - [x] Add FAQ section

### 7. Create Implementation Guides
**Goal:** Help teams adopt the framework

- [x] Create .repo/docs/ folder structure
- [x] Create GETTING_STARTED.md:
  - [x] Document adoption process
  - [x] Include prerequisites
  - [x] Provide step-by-step setup
  - [x] Add initial configuration
  - [x] Include first PR workflow

- [x] Create CUSTOMIZATION_GUIDE.md:
  - [x] Document how to customize policies
  - [x] Explain manifest customization
  - [x] Include template customization
  - [x] Add boundary customization
  - [x] Document agent role customization

- [x] Create TROUBLESHOOTING.md:
  - [x] List common issues
  - [x] Provide solutions
  - [x] Include diagnostic steps
  - [x] Add contact information
  - [x] Document escalation process

### 8. Create Supporting Infrastructure
**Goal:** Enable framework operation

- [x] Create .repo/automation/ folder structure:
  - [x] Create automation/README.md
  - [x] Document automation philosophy
  - [x] List planned automations
  - [x] Include integration points

- [x] Create .repo/hitl/ folder structure:
  - [x] Create hitl/README.md
  - [x] Document HITL tracking process
  - [x] Create HITL log template
  - [x] Include resolution workflow

- [x] Create .repo/waivers/ folder structure:
  - [x] Create waivers/README.md
  - [x] Document waiver management
  - [x] Create waiver log format
  - [x] Include approval workflow

- [x] Create .repo/archive/ folder structure:
  - [x] Create archive/README.md
  - [x] Document archival policy
  - [x] Define retention periods
  - [x] Include retrieval process

---

## 📊 Success Criteria

- [x] All policy files exist and are comprehensive
- [x] repo.manifest.yaml template is complete and well-documented
- [x] All agent roles are clearly defined
- [x] All document templates are ready to use
- [x] GOVERNANCE.md establishes clear contract
- [x] DOCS_INDEX.md provides easy navigation
- [x] Implementation guides enable adoption
- [x] Supporting infrastructure is in place
- [x] All documents cross-reference appropriately
- [x] Examples are provided for all templates

---

## 📈 Key Deliverables

1. **Complete Policy Framework** - 7 policy documents in .repo/policy/
2. **repo.manifest.yaml Template** - Comprehensive source of truth
3. **Agent Framework** - Complete agent roles and capabilities
4. **Document Templates** - 7+ ready-to-use templates
5. **Governance Contract** - Binding GOVERNANCE.md
6. **Implementation Guides** - Getting started, customization, troubleshooting
7. **Supporting Infrastructure** - HITL, waivers, automation, archive folders

---

## 🔗 Dependencies

**Prerequisites:**
- Phase 1 complete (folder structure reorganized)
- Documentation standards established
- Phase definitions reviewed

**Enables:**
- Phase 3: Tooling & Automation (validates manifest, enforces policies)
- Phase 4: Documentation & Examples (examples use this framework)
- All future adoption of governance system

---

## ⚠️ Notes

- This phase defines the core framework that target repositories will adopt
- Focus on clarity and completeness - this is the foundation
- All policies should be practical and enforceable
- Templates should be easy to use and understand
- Include plenty of examples to illustrate concepts
- Consider different project types (monorepo, polyrepo, etc.)
- Ensure consistency across all documents

---

## 📅 Timeline Breakdown

**Week 3:**
- Days 1-2: Create complete policy framework (7 policy files)
- Days 3-4: Create repo.manifest.yaml template and schema
- Day 5: Create agent framework (AGENTS.md, capabilities, roles)

**Week 4:**
- Days 1-2: Create all document templates (7+ templates)
- Day 3: Create GOVERNANCE.md and DOCS_INDEX.md
- Day 4: Create implementation guides
- Day 5: Create supporting infrastructure and final review

---

**Status:** ✅ COMPLETE  
**Last Updated:** 2026-01-22  
**Completed:** 2026-01-22  
**Depends On:** PHASE_1_FOUNDATION_TODO.md
