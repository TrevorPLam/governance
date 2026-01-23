# Documentation Index
<!-- GOVERNANCE_VERSION: 1.0.0 -->
<!-- GOVERNANCE: UPDATEABLE - Layer 2 -->

Welcome to the AI-Native Governance Framework documentation. This index helps you navigate all governance documentation.

## 🚀 Start Here

### Essential Reading (Read First)
1. **[GOVERNANCE.md](../GOVERNANCE.md)** - Overview of governance system
2. **[CONSTITUTION.md](../policy/CONSTITUTION.md)** - 8 fundamental governance articles
3. **[PRINCIPLES.md](../policy/PRINCIPLES.md)** - 23 operating principles (P3-P25)

### Quick Reference
- **[Quick Start Guide](../../../docs/injection-guide-manual.md)** - How to inject governance into your project
- **[Manifest Guide](standards/manifest.md)** - How to configure repo.manifest.yaml
- **[Agent Guide](../agents/AGENTS.md)** - How agents operate

## 📋 Policy Documents

Core governance policies that define how the repository operates:

### Foundation Policies
- **[CONSTITUTION.md](../policy/CONSTITUTION.md)** - Fundamental governance structure
  - 8 articles defining the governance framework
  - Binding contract for all repository operations

- **[PRINCIPLES.md](../policy/PRINCIPLES.md)** - Operating principles
  - 23 principles (P3-P25) guiding all decisions
  - Plain English, actionable guidance

### Quality & Security Policies
- **[QUALITY_GATES.md](../policy/QUALITY_GATES.md)** - Quality standards
  - Hard gates vs. waiverable gates
  - Coverage ratchet strategy
  - Performance budgets

- **[SECURITY_BASELINE.md](../policy/SECURITY_BASELINE.md)** - Security requirements
  - 10 security review triggers
  - 8 mandatory HITL actions
  - Forbidden patterns list

### Architecture & Process Policies
- **[BOUNDARIES.md](../policy/BOUNDARIES.md)** - Architectural boundaries
  - Layer model: ui → domain → data → platform
  - Cross-feature rules
  - Dependency direction

- **[HITL.md](../policy/HITL.md)** - Human-in-the-Loop process
  - When to escalate to humans
  - HITL tracking and workflow
  - Active and archived HITL items

- **[WAIVERS.md](../policy/WAIVERS.md)** - Policy exception process
  - Waiver request process
  - Expiration rules
  - Tracking and lifecycle

## 🤖 Agent Framework

Documentation for AI agents operating in this repository:

### Agent Core
- **[AGENTS.md](../agents/AGENTS.md)** - Core agent rules
  - UNKNOWN workflow
  - Three-pass code generation
  - Logging requirements
  - Boundary enforcement

- **[Capabilities](../agents/capabilities.md)** - Agent capabilities
  - All available capabilities
  - Capability levels
  - Usage restrictions

### Agent Roles
- **[Primary Agent](../agents/roles/primary.md)** - Full development capabilities
- **[Secondary Agent](../agents/roles/secondary.md)** - Limited refactoring capabilities
- **[Reviewer](../agents/roles/reviewer.md)** - Human role for governance enforcement
- **[Release Manager](../agents/roles/release.md)** - Human role for deployments

### Agent Prompts
- **[Task Packet Template](../agents/prompts/task_packet.md)** - How to structure task packets
- **[PR Template](../agents/prompts/pr_template.md)** - How to structure pull requests

### Agent Checklists
- **[Change Plan Checklist](../agents/checklists/change-plan.md)** - Planning phase checklist
- **[PR Review Checklist](../agents/checklists/pr-review.md)** - Pull request review checklist
- **[Incident Response Checklist](../agents/checklists/incident.md)** - Incident handling checklist

## 📝 Document Templates

Standard templates for project documents:

### Agent Templates
- **[Agent Log Template](../templates/AGENT_LOG_TEMPLATE.md)** - Human-readable agent logs
- **[Agent Trace Schema](../templates/AGENT_TRACE_SCHEMA.json)** - Machine-readable trace logs

### Decision & Design Templates
- **[ADR Template](../templates/ADR_TEMPLATE.md)** - Architecture Decision Records
- **[RFC Template](../templates/RFC_TEMPLATE.md)** - Request for Comments
- **[Waiver Template](../templates/WAIVER_TEMPLATE.md)** - Policy waiver requests

### Operations Templates
- **[Runbook Template](../templates/RUNBOOK_TEMPLATE.md)** - Operational procedures
- **[PR Template](../templates/PR_TEMPLATE.md)** - Pull request structure

## 📚 Standards

Detailed standards for specific areas:

### Documentation Standards
- **[Documentation](standards/documentation.md)** - Documentation requirements
  - Docs-age-with-code principle
  - Filepath requirements
  - Examples as contracts

### Architecture Standards
- **[ADR](standards/adr.md)** - When and how to create ADRs
  - Required triggers (dependencies, API changes, etc.)
  - ADR template usage
  - Sequential numbering

- **[API](standards/api.md)** - API documentation standards
  - API shape, input, output documentation
  - Contract change requirements

### Code Standards
- **[Style](standards/style.md)** - Code style standards
  - Naming conventions
  - Clarity requirements
  - Consistency over novelty

## 📖 ADR History

All Architecture Decision Records, documenting significant decisions:

- **[ADR README](adr/README.md)** - About ADRs and how to use them
- **[ADR-0001: Example](adr/0001-example.md)** - Example ADR format
- _Additional ADRs will be added as decisions are made_

## 🔧 Configuration

Key configuration files:

- **[repo.manifest.yaml](../repo.manifest.yaml)** - Repository configuration
  - Canonical commands
  - Verification profiles
  - Boundaries and security settings

- **[VERSION](../VERSION)** - Governance framework version

## 📊 Getting Started Guides

### For Developers
1. Read [CONSTITUTION.md](../policy/CONSTITUTION.md) and [PRINCIPLES.md](../policy/PRINCIPLES.md)
2. Review [AGENTS.md](../agents/AGENTS.md) to understand agent operations
3. Check [BOUNDARIES.md](../policy/BOUNDARIES.md) for architectural rules
4. Review [QUALITY_GATES.md](../policy/QUALITY_GATES.md) for quality standards
5. Refer to templates when creating documents

### For Reviewers
1. Read all policy documents
2. Review [Reviewer Role](../agents/roles/reviewer.md)
3. Use [PR Review Checklist](../agents/checklists/pr-review.md)
4. Understand waiver and HITL processes

### For Release Managers
1. Read [Release Manager Role](../agents/roles/release.md)
2. Review [Runbook Template](../templates/RUNBOOK_TEMPLATE.md)
3. Use [Incident Response Checklist](../agents/checklists/incident.md)
4. Understand quality gates and waivers

### For Newcomers
1. Start with [GOVERNANCE.md](../GOVERNANCE.md)
2. Read [Injection Guide](../../../docs/injection-guide-manual.md)
3. Follow [Manifest Guide](standards/manifest.md)
4. Ask questions via HITL process

## 🔍 Finding Information

### By Topic

**Quality Assurance:**
- Quality Gates policy
- Quality gate requirements
- Waiver process
- Testing standards

**Security:**
- Security baseline policy
- Security review triggers
- HITL requirements
- Forbidden patterns

**Architecture:**
- Boundaries policy
- ADR standards
- Layer model
- Cross-feature rules

**Development:**
- Agent rules
- Three-pass process
- Principles
- Code standards

**Operations:**
- Runbook template
- Incident response
- Release manager role
- Deployment procedures

### By Role

**Agents:**
- AGENTS.md
- Capabilities
- Role definitions
- Checklists

**Humans:**
- Reviewer role
- Release manager role
- HITL process
- Waiver management

**Everyone:**
- Constitution
- Principles
- Governance overview
- Documentation standards

## 📞 Getting Help

### Questions About Governance
1. Check this index for relevant documents
2. Read the specific policy or standard
3. If unclear, create HITL item

### Questions About Processes
1. Check relevant checklist
2. Review role definitions
3. Consult templates
4. Ask human reviewer

### Reporting Issues
1. Document the issue
2. Check if waiver needed
3. Create HITL item if appropriate
4. Escalate if urgent

## 🔄 Updates

This documentation is version-controlled:

- **Current Version:** 1.0.0
- **Last Updated:** See VERSION file
- **Update Policy:** Layer 2 (Updateable)

### How to Update
1. Propose changes via RFC or ADR
2. Get approval from governance lead
3. Update documentation
4. Increment VERSION if needed
5. Communicate changes to team

### Staying Current
- Documentation updates with each governance version
- Check VERSION file for current version
- Review CHANGELOG for recent changes
- Subscribe to governance updates

## 📋 Checklist for New Projects

When adopting this governance framework:

- [ ] Copy .repo/ folder to project
- [ ] Fill repo.manifest.yaml with project commands
- [ ] Read Constitution and Principles
- [ ] Understand boundary model
- [ ] Review quality gates
- [ ] Set up verification profiles
- [ ] Configure security scanning
- [ ] Create initial ADR if needed
- [ ] Train team on governance
- [ ] Set up HITL process

## 🎯 Key Principles to Remember

From PRINCIPLES.md, the most critical:

- **P3:** Never guess, use UNKNOWN
- **P4:** Filepaths required everywhere
- **P6:** Behavior over novelty
- **P8:** Examples are contracts
- **P10:** Testing is required
- **P15:** Consistency beats novelty
- **P17:** Humans decide edge cases
- **P23:** Logs = evidence

---

**This index is your map to governance.** Bookmark it and refer back often.

For more information, start with [GOVERNANCE.md](../GOVERNANCE.md) or consult your human reviewer.
