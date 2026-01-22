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

- [ ] Create `templates/.repo/agents/AGENTS.md`:
  - [ ] Copy core rules from `00. Implementation/phase4.md`
  - [ ] Add VERSION marker: `<!-- GOVERNANCE: UPDATEABLE - Layer 2 -->`
  - [ ] Document three-pass code generation
  - [ ] Explain UNKNOWN workflow
  - [ ] Include filepath requirements
  - [ ] Add boundary enforcement rules

- [ ] Create `templates/.repo/agents/capabilities.md`:
  - [ ] List standard capabilities (create_feature, modify_existing, etc.)
  - [ ] Add VERSION marker: `<!-- GOVERNANCE: UPDATEABLE - Layer 2 -->`
  - [ ] Document capability levels
  - [ ] Include restrictions

- [ ] Create agent role files in `templates/.repo/agents/roles/`:
  - [ ] Create `primary.md`:
    - [ ] Define primary agent permissions
    - [ ] List allowed operations
    - [ ] Document restrictions
  - [ ] Create `secondary.md`:
    - [ ] Define secondary agent permissions
    - [ ] Document escalation rules
  - [ ] Create `reviewer.md`:
    - [ ] Define human reviewer role
    - [ ] List review responsibilities
  - [ ] Create `release.md`:
    - [ ] Define release manager role
    - [ ] Document deployment authority

- [ ] Create agent prompts in `templates/.repo/agents/prompts/`:
  - [ ] Create `task_packet.md`:
    - [ ] Add VERSION marker: `<!-- GOVERNANCE: CUSTOM - Layer 1 -->`
    - [ ] Include JSON template structure
    - [ ] Document required fields
  - [ ] Create `pr_template.md`:
    - [ ] Add VERSION marker: `<!-- GOVERNANCE: CUSTOM - Layer 1 -->`
    - [ ] Include PR structure template
    - [ ] Document evidence requirements

- [ ] Create checklists in `templates/.repo/agents/checklists/`:
  - [ ] Create `change-plan.md`:
    - [ ] Add VERSION marker: `<!-- GOVERNANCE: UPDATEABLE - Layer 3 -->`
    - [ ] List planning checklist items
  - [ ] Create `pr-review.md`:
    - [ ] List review checklist items
  - [ ] Create `incident.md`:
    - [ ] List incident response checklist

### 2. Build Document Templates (From Phase 6 Specs)
**Goal:** Create templates for ADRs, waivers, logs, etc.

- [ ] Create `templates/.repo/templates/AGENT_LOG_TEMPLATE.md`:
  - [ ] Copy structure from `00. Implementation/phase6.md`
  - [ ] Add VERSION marker: `<!-- GOVERNANCE: UPDATEABLE - Layer 3 -->`
  - [ ] Include JSON template format
  - [ ] Document required fields

- [ ] Create `templates/.repo/templates/AGENT_TRACE_SCHEMA.json`:
  - [ ] Copy schema from phase6.md
  - [ ] Add version field
  - [ ] Include validation rules

- [ ] Create `templates/.repo/templates/WAIVER_TEMPLATE.md`:
  - [ ] Include waiver structure
  - [ ] Add VERSION marker: `<!-- GOVERNANCE: UPDATEABLE - Layer 3 -->`
  - [ ] Document expiration field
  - [ ] Include remediation plan section

- [ ] Create `templates/.repo/templates/ADR_TEMPLATE.md`:
  - [ ] Include ADR structure (context, decision, consequences)
  - [ ] Add VERSION marker
  - [ ] Document when to use

- [ ] Create `templates/.repo/templates/RUNBOOK_TEMPLATE.md`:
  - [ ] Include operational procedure structure
  - [ ] Add rollback section
  - [ ] Document verification steps

- [ ] Create `templates/.repo/templates/RFC_TEMPLATE.md`:
  - [ ] Include proposal structure
  - [ ] Add alternatives section
  - [ ] Document impact assessment

- [ ] Create `templates/.repo/templates/PR_TEMPLATE.md`:
  - [ ] Include PR structure
  - [ ] Add evidence section
  - [ ] Document HITL requirements
### 3. Build Documentation Structure (From Phase 8 Specs)
**Goal:** Create documentation framework

- [ ] Create `templates/.repo/docs/DOCS_INDEX.md`:
  - [ ] List all documentation in .repo/
  - [ ] Add VERSION marker: `<!-- GOVERNANCE: UPDATEABLE - Layer 2 -->`
  - [ ] Organize by category (Start Here, Standards, ADR History)
  - [ ] Include navigation guidance

- [ ] Create standards in `templates/.repo/docs/standards/`:
  - [ ] Create `documentation.md`:
    - [ ] Document docs-age-with-code principle
    - [ ] Add VERSION marker: `<!-- GOVERNANCE: UPDATEABLE - Layer 2 -->`
    - [ ] Include filepath requirements
  - [ ] Create `adr.md`:
    - [ ] Document when ADRs are required
    - [ ] Reference ADR_TEMPLATE
    - [ ] List triggers (dependencies, api-contract, schema, etc.)
  - [ ] Create `api.md`:
    - [ ] Document API documentation requirements
    - [ ] Include contract change rules
  - [ ] Create `style.md`:
    - [ ] Document naming conventions
    - [ ] Include clarity requirements
    - [ ] Reference P15: Consistency Beats Novelty

- [ ] Create ADR scaffold in `templates/.repo/docs/adr/`:
  - [ ] Create `README.md`:
    - [ ] Explain ADR system
    - [ ] Add VERSION marker: `<!-- GOVERNANCE: CUSTOM - Layer 1 -->`
    - [ ] Include sequential numbering guidance
  - [ ] Create `0001-example.md`:
    - [ ] Provide example ADR
    - [ ] Show proper format
    - [ ] Include all required sections

### 4. Add Folder-Level AGENT.md Guides (From Phase 4 Specs)
**Goal:** Place governance guides in key folders

- [ ] Create `templates/.repo/AGENT.md`:
  - [ ] Explain purpose of .repo/ folder
  - [ ] Add VERSION marker: `<!-- GOVERNANCE: UPDATEABLE - Layer 2 -->`
  - [ ] List what agents may/may not do
  - [ ] Link to policy files

- [ ] Create folder guide templates:
  - [ ] Create `templates/sample-AGENT.md-for-src`:
    - [ ] Template for src/ folder
    - [ ] Include boundary rules
    - [ ] Add allowed/forbidden sections
  - [ ] Create `templates/sample-AGENT.md-for-tests`:
    - [ ] Template for tests/ folder
    - [ ] Include testing guidelines
  - [ ] Create `templates/sample-AGENT.md-for-docs`:
    - [ ] Template for docs/ folder
    - [ ] Include documentation requirements

### 5. Test Tier 2 Template
**Goal:** Validate enhanced template works

- [ ] Update test project from Phase 1
- [ ] Copy new agent framework files
- [ ] Copy new template files
- [ ] Copy documentation structure
- [ ] Verify all links work
- [ ] Test creating a sample ADR
- [ ] Test using task packet template
- [ ] Document any issues

### 6. Update Injection Guide
**Goal:** Extend guide for Tier 2 features

- [ ] Update `docs/injection-guide-manual.md`:
  - [ ] Add section on agent framework
  - [ ] Explain when to use templates
  - [ ] Document ADR creation process
  - [ ] Add HITL and waiver workflows
  - [ ] Include folder-level AGENT.md setup
  - [ ] Provide examples of customizing prompts

---

## 🎉 Phase 2 Complete - Milestone Reached!

### ✅ Success Criteria
- [ ] All agent framework files exist (10 files)
- [ ] All 7 templates exist
- [ ] Documentation structure is complete
- [ ] Folder-level guides are ready
- [ ] Successfully tested on sample project
- [ ] Injection guide updated for Tier 2

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

- [ ] 10 agent framework files created
- [ ] 7 document templates created
- [ ] Documentation structure complete
- [ ] Folder guides ready
- [ ] Test project validated
- [ ] Injection guide updated

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

**Status:** NOT STARTED  
**Last Updated:** 2026-01-22

### 4. Create Document Templates
**Goal:** Standardized templates for all document types

- [ ] Create .repo/templates/ folder structure
- [ ] Create AGENT_LOG_TEMPLATE.md:
  - [ ] Define log structure
  - [ ] Include required fields
  - [ ] Add example log entries
  - [ ] Document usage guidelines

- [ ] Create AGENT_TRACE_SCHEMA.json:
  - [ ] Define structured trace format
  - [ ] Include all trace fields
  - [ ] Add validation rules
  - [ ] Provide example traces

- [ ] Create ADR_TEMPLATE.md:
  - [ ] Define Architecture Decision Record structure
  - [ ] Include status, context, decision sections
  - [ ] Add consequences section
  - [ ] Include metadata fields
  - [ ] Provide example ADR

- [ ] Create TASK_PACKET_TEMPLATE.md:
  - [ ] Define task packet structure
  - [ ] Include objective, context, constraints
  - [ ] Add success criteria section
  - [ ] Document deliverables section
  - [ ] Include example task packet

- [ ] Create WAIVER_REQUEST_TEMPLATE.md:
  - [ ] Define waiver request structure
  - [ ] Include policy being waived
  - [ ] Add justification section
  - [ ] Include expiration date
  - [ ] Document approval process

- [ ] Create PR_CHECKLIST_TEMPLATE.md:
  - [ ] Define PR checklist items
  - [ ] Include testing requirements
  - [ ] Add documentation updates
  - [ ] Include security review items
  - [ ] Add quality gate checks

- [ ] Create RELEASE_NOTES_TEMPLATE.md:
  - [ ] Define release notes structure
  - [ ] Include version and date
  - [ ] Add changes section (features, fixes, breaking)
  - [ ] Include upgrade instructions
  - [ ] Document known issues

### 5. Create GOVERNANCE.md Contract
**Goal:** Binding governance contract for repositories

- [ ] Create .repo/GOVERNANCE.md:
  - [ ] Define governance scope
  - [ ] List all policies and their authority
  - [ ] Document enforcement mechanisms
  - [ ] Include waiver process
  - [ ] Add amendment procedures
  - [ ] Define stakeholder roles
  - [ ] Include acceptance criteria

- [ ] Document governance principles:
  - [ ] Transparency requirements
  - [ ] Decision-making process
  - [ ] Conflict resolution
  - [ ] Escalation paths

### 6. Create DOCS_INDEX.md for .repo/
**Goal:** Central hub for all .repo/ documentation

- [ ] Create .repo/DOCS_INDEX.md:
  - [ ] List all policy documents
  - [ ] Organize by category
  - [ ] Include brief descriptions
  - [ ] Add navigation links
  - [ ] Include reading recommendations
  - [ ] Add FAQ section

### 7. Create Implementation Guides
**Goal:** Help teams adopt the framework

- [ ] Create .repo/docs/ folder structure
- [ ] Create GETTING_STARTED.md:
  - [ ] Document adoption process
  - [ ] Include prerequisites
  - [ ] Provide step-by-step setup
  - [ ] Add initial configuration
  - [ ] Include first PR workflow

- [ ] Create CUSTOMIZATION_GUIDE.md:
  - [ ] Document how to customize policies
  - [ ] Explain manifest customization
  - [ ] Include template customization
  - [ ] Add boundary customization
  - [ ] Document agent role customization

- [ ] Create TROUBLESHOOTING.md:
  - [ ] List common issues
  - [ ] Provide solutions
  - [ ] Include diagnostic steps
  - [ ] Add contact information
  - [ ] Document escalation process

### 8. Create Supporting Infrastructure
**Goal:** Enable framework operation

- [ ] Create .repo/automation/ folder structure:
  - [ ] Create automation/README.md
  - [ ] Document automation philosophy
  - [ ] List planned automations
  - [ ] Include integration points

- [ ] Create .repo/hitl/ folder structure:
  - [ ] Create hitl/README.md
  - [ ] Document HITL tracking process
  - [ ] Create HITL log template
  - [ ] Include resolution workflow

- [ ] Create .repo/waivers/ folder structure:
  - [ ] Create waivers/README.md
  - [ ] Document waiver management
  - [ ] Create waiver log format
  - [ ] Include approval workflow

- [ ] Create .repo/archive/ folder structure:
  - [ ] Create archive/README.md
  - [ ] Document archival policy
  - [ ] Define retention periods
  - [ ] Include retrieval process

---

## 📊 Success Criteria

- [ ] All policy files exist and are comprehensive
- [ ] repo.manifest.yaml template is complete and well-documented
- [ ] All agent roles are clearly defined
- [ ] All document templates are ready to use
- [ ] GOVERNANCE.md establishes clear contract
- [ ] DOCS_INDEX.md provides easy navigation
- [ ] Implementation guides enable adoption
- [ ] Supporting infrastructure is in place
- [ ] All documents cross-reference appropriately
- [ ] Examples are provided for all templates

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

**Status:** NOT STARTED  
**Last Updated:** 2026-01-22  
**Depends On:** PHASE_1_FOUNDATION_TODO.md
