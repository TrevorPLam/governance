# Phase 2: Core Framework TODO (Weeks 3-4)
## Priority: 🔴 High | Timeline: 2 weeks | Effort: Medium

---

## Overview
Build the complete `.repo/` framework that will be used by target repositories. This phase implements the governance policies, agent framework, templates, and manifest system that forms the core of the AI-Native governance system.

---

## 📋 Tasks

### 1. Create .repo/ Policy Framework
**Goal:** Establish authoritative governance rules

- [ ] Create .repo/policy/ folder structure
- [ ] Create CONSTITUTION.md:
  - [ ] Define immutable core principles
  - [ ] Establish authority chain
  - [ ] Document amendment process
  - [ ] Define scope and boundaries
  - [ ] Include enforcement mechanisms

- [ ] Create PRINCIPLES.md:
  - [ ] Document all 25 operating principles (P1-P25)
  - [ ] Add detailed explanations for each
  - [ ] Include examples for each principle
  - [ ] Add rationale for each principle
  - [ ] Cross-reference related principles
  - [ ] Include violation examples

- [ ] Create QUALITY_GATES.md:
  - [ ] Define merge policies
  - [ ] Document coverage requirements
  - [ ] Establish code quality standards
  - [ ] Define review requirements
  - [ ] Document budget constraints (token, time, complexity)
  - [ ] Add escalation procedures

- [ ] Create SECURITY_BASELINE.md:
  - [ ] List security requirements
  - [ ] Document forbidden patterns
  - [ ] Define secure coding standards
  - [ ] Include vulnerability management process
  - [ ] Add security testing requirements
  - [ ] Document secret management rules
  - [ ] Define dependency security policies

- [ ] Create BOUNDARIES.md:
  - [ ] Define layer model architecture
  - [ ] Document import rules by layer
  - [ ] Establish dependency boundaries
  - [ ] Include architectural patterns
  - [ ] Add boundary violation examples
  - [ ] Define cross-layer communication rules

- [ ] Create HITL.md:
  - [ ] Document human-in-the-loop triggers
  - [ ] Define escalation criteria
  - [ ] Establish notification procedures
  - [ ] Include decision authority matrix
  - [ ] Add HITL log template
  - [ ] Document resolution tracking

- [ ] Create WAIVERS.md:
  - [ ] Define waiver governance rules
  - [ ] Document approval process
  - [ ] Establish temporary vs. permanent waivers
  - [ ] Include waiver template
  - [ ] Add tracking and expiration rules
  - [ ] Define review cadence

### 2. Create repo.manifest.yaml Template
**Goal:** Source of truth for command resolution

- [ ] Design manifest structure:
  - [ ] Define metadata section (name, version, owner)
  - [ ] Create commands section with examples
  - [ ] Add boundaries section
  - [ ] Include quality_gates section
  - [ ] Define agents section
  - [ ] Add integrations section
  - [ ] Include custom_rules section

- [ ] Create comprehensive example manifest:
  - [ ] Add realistic project metadata
  - [ ] Include common commands (build, test, lint, deploy)
  - [ ] Define layer boundaries
  - [ ] Set quality gate thresholds
  - [ ] Configure agent roles
  - [ ] Add integration configurations

- [ ] Document manifest schema:
  - [ ] Create JSON schema for validation
  - [ ] Document all required fields
  - [ ] Document optional fields
  - [ ] Include field descriptions
  - [ ] Add validation rules
  - [ ] Provide examples for each section

- [ ] Create manifest documentation:
  - [ ] Write .repo/docs/MANIFEST_GUIDE.md
  - [ ] Explain manifest purpose
  - [ ] Document how to customize
  - [ ] Include migration guide
  - [ ] Add troubleshooting section

### 3. Create Agent Framework
**Goal:** Define agent roles and capabilities

- [ ] Create .repo/agents/ folder structure
- [ ] Create AGENTS.md:
  - [ ] Define core agent rules
  - [ ] Document agent execution model (three-pass)
  - [ ] Establish agent boundaries
  - [ ] Define agent success criteria
  - [ ] Include agent logging requirements
  - [ ] Add escalation procedures

- [ ] Create capabilities.md:
  - [ ] Document agent capability taxonomy
  - [ ] Define capability levels (read, write, execute, review)
  - [ ] List standard capabilities
  - [ ] Include capability restrictions
  - [ ] Add capability request process

- [ ] Create role definitions:
  - [ ] Create roles/primary.md:
    - [ ] Define primary agent permissions
    - [ ] List allowed operations
    - [ ] Document restrictions
    - [ ] Include examples
  
  - [ ] Create roles/secondary.md:
    - [ ] Define secondary agent permissions
    - [ ] List allowed operations
    - [ ] Document restrictions
    - [ ] Include escalation rules
  
  - [ ] Create roles/reviewer.md:
    - [ ] Define human reviewer role
    - [ ] List review responsibilities
    - [ ] Document approval authority
    - [ ] Include review checklist
  
  - [ ] Create roles/release.md:
    - [ ] Define release manager role
    - [ ] List release responsibilities
    - [ ] Document deployment authority
    - [ ] Include release checklist

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
