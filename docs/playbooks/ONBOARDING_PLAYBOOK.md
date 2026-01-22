# Team Onboarding Playbook

**Document Type:** Operational Playbook  
**Audience:** Team Leads, Engineering Managers, DevOps  
**Last Updated:** 2026-01-22

---

## Table of Contents

1. [Overview](#overview)
2. [Pre-Onboarding Preparation](#pre-onboarding-preparation)
3. [Day 1: Introduction](#day-1-introduction)
4. [Week 1: Setup and Learning](#week-1-setup-and-learning)
5. [Week 2-4: Hands-On Practice](#week-2-4-hands-on-practice)
6. [Success Metrics](#success-metrics)
7. [Common Challenges](#common-challenges)
8. [Resources](#resources)

---

## Overview

This playbook guides team leads and managers through onboarding new team members to the AI-Native Governance System. It provides a structured approach to ensure new team members understand governance concepts, tools, and workflows.

### Onboarding Goals

By the end of onboarding, new team members should be able to:
- Understand core governance concepts and principles
- Set up governance in a new repository
- Create governed pull requests
- Navigate policies and manifests
- Use the governance CLI effectively
- Request waivers and escalate to HITL when needed

### Timeline

- **Week 1**: Introduction, setup, and learning
- **Week 2-4**: Hands-on practice with support
- **Ongoing**: Independent work with occasional guidance

---

## Pre-Onboarding Preparation

### For Team Leads/Managers

#### 1-2 Weeks Before Start Date

- [ ] **Review Governance Documentation**
  - Read [EXECUTIVE_SUMMARY.md](/EXECUTIVE_SUMMARY.md)
  - Review [Getting Started guides](/docs/getting-started/)
  - Familiarize with [Architecture docs](/docs/architecture/)

- [ ] **Prepare Access and Accounts**
  - GitHub/GitLab account created
  - Added to relevant teams and repositories
  - CI/CD access configured
  - Communication channels (Slack, Teams) access

- [ ] **Set Up Training Repository**
  - Create sandbox repository for practice
  - Initialize governance with `governance init`
  - Add sample code for practice PRs
  - Configure CI/CD for testing

- [ ] **Assign Onboarding Buddy**
  - Select experienced team member as buddy
  - Brief buddy on onboarding schedule
  - Set up regular check-in meetings

- [ ] **Prepare Training Materials**
  - Print/share key documentation
  - Prepare example PRs to review
  - Gather common HITL scenarios
  - Create checklist of learning objectives

### For New Team Members

#### Before Start Date (Optional)

- [ ] **Review Public Documentation**
  - Read repository README
  - Browse public documentation
  - Familiarize with Git workflows

- [ ] **Set Up Development Environment**
  - Install Node.js (v16+)
  - Install Git
  - Set up code editor (VS Code recommended)
  - Install governance CLI (if published)

---

## Day 1: Introduction

### Morning Session (2-3 hours)

#### Welcome and Overview (30 min)

- [ ] **Team Introduction**
  - Meet team members and roles
  - Understand team structure
  - Review communication channels

- [ ] **Governance Overview**
  - What is AI-Native Governance?
  - Why does our team use it?
  - High-level architecture tour

**Resources:**
- [EXECUTIVE_SUMMARY.md](/EXECUTIVE_SUMMARY.md)
- [CONCEPTS_OVERVIEW.md](/docs/getting-started/CONCEPTS_OVERVIEW.md)

#### System Architecture (1 hour)

- [ ] **Core Concepts**
  - `.repo/` structure
  - Policies vs. Manifest
  - Agent roles and capabilities
  - HITL process
  - Waiver system

- [ ] **Live Demo**
  - Show governed repository
  - Walk through `.repo/` folder
  - Demonstrate CLI commands
  - Show example PR with governance checks

**Resources:**
- [ARCHITECTURE_OVERVIEW.md](/docs/architecture/ARCHITECTURE_OVERVIEW.md)

#### Repository Tour (1 hour)

- [ ] **Explore Governance Structure**
  - Policy files in `.repo/policy/`
  - Manifest file `repo.manifest.yaml`
  - Agent configuration
  - Templates and documentation

- [ ] **Review Policies**
  - CONSTITUTION.md - Core rules
  - PRINCIPLES.md - Coding principles
  - BOUNDARIES.md - Architectural boundaries
  - SECURITY_BASELINE.md - Security requirements

**Activity:** Read through one policy file together and discuss

### Afternoon Session (2-3 hours)

#### CLI Tool Training (1.5 hours)

- [ ] **Install Governance CLI**
  ```bash
  npm install -g @trevorplam/governance-cli
  governance --version
  ```

- [ ] **Practice Commands**
  ```bash
  # Initialize governance
  governance init
  
  # Validate configuration
  governance validate
  
  # Run verification
  governance verify --profile=quick
  
  # Check for updates
  governance check-updates
  ```

- [ ] **Review Command Output**
  - Understand validation errors
  - Read verification results
  - Interpret exit codes

**Resources:**
- [INSTALLATION.md](/docs/getting-started/INSTALLATION.md)
- [CLI_REFERENCE.md](/docs/reference/CLI_REFERENCE.md)

#### First Governed PR (1 hour)

- [ ] **Review Example PR**
  - Walk through existing governed PR
  - Examine PR description and evidence
  - Review CI/CD checks
  - Understand approval process

- [ ] **Understand Quality Gates**
  - What checks run?
  - Why do they matter?
  - When can they be waived?
  - How to fix common failures?

**Resources:**
- [YOUR_FIRST_PR.md](/docs/getting-started/YOUR_FIRST_PR.md)
- [QUALITY_GATES policy](/templates/.repo/policy/QUALITY_GATES.md)

#### End of Day Debrief (30 min)

- [ ] **Q&A Session**
  - Answer questions
  - Clarify confusing concepts
  - Address concerns

- [ ] **Homework Assignment**
  - Read specific documentation
  - Set up personal development environment
  - Review tomorrow's agenda

---

## Week 1: Setup and Learning

### Day 2: Policies and Principles

**Morning (2 hours)**

- [ ] **Deep Dive: Policies**
  - Review each policy file
  - Understand enforcement mechanisms
  - Discuss real-world examples
  - Learn about waivers and exceptions

- [ ] **Activity: Policy Quiz**
  - Scenario-based questions
  - "Would this require HITL?"
  - "Which principle does this violate?"

**Afternoon (2 hours)**

- [ ] **Deep Dive: Boundaries**
  - Layer model architecture
  - Dependency rules
  - Cross-feature constraints
  - ADR requirements

- [ ] **Activity: Code Review**
  - Review sample code
  - Identify boundary violations
  - Discuss refactoring strategies

**Resources:**
- [LAYER_MODEL.md](/docs/architecture/LAYER_MODEL.md)
- [HOW_TO_DEFINE_BOUNDARIES.md](/docs/guides/HOW_TO_DEFINE_BOUNDARIES.md)

### Day 3: Manifest and Configuration

**Morning (2 hours)**

- [ ] **Manifest Deep Dive**
  - Structure and sections
  - Canonical commands
  - Verification profiles
  - Boundary configuration

- [ ] **Hands-On: Edit Manifest**
  - Add new command
  - Configure verification profile
  - Define boundary rule
  - Validate changes

**Afternoon (2 hours)**

- [ ] **CI/CD Integration**
  - Review GitHub Actions workflows
  - Understand governance checks
  - Examine job logs
  - Debug failed checks

- [ ] **Activity: Fix Failed CI**
  - Given intentionally broken workflow
  - Identify issues
  - Fix and verify

**Resources:**
- [MANIFEST_REFERENCE.md](/docs/reference/MANIFEST_REFERENCE.md)
- [HOW_TO_INTEGRATE_CI_CD.md](/docs/guides/HOW_TO_INTEGRATE_CI_CD.md)

### Day 4: Agents and HITL

**Morning (2 hours)**

- [ ] **Agent Architecture**
  - Three-pass system
  - Agent roles and capabilities
  - Decision tree
  - Logging requirements

- [ ] **HITL Process**
  - When to escalate
  - How to create HITL item
  - Resolution workflow
  - Tracking and follow-up

**Afternoon (2 hours)**

- [ ] **Waivers and Exceptions**
  - Waiver request process
  - Approval workflow
  - Expiration and tracking
  - Best practices

- [ ] **Activity: HITL Scenarios**
  - Review real HITL items
  - Practice writing HITL descriptions
  - Discuss resolution strategies

**Resources:**
- [AGENT_ARCHITECTURE.md](/docs/architecture/AGENT_ARCHITECTURE.md)
- [HOW_TO_MANAGE_WAIVERS.md](/docs/guides/HOW_TO_MANAGE_WAIVERS.md)

### Day 5: Practice and Review

**Morning (2 hours)**

- [ ] **Create First PR**
  - In training repository
  - Make small code change
  - Run governance checks
  - Submit for review

- [ ] **Review Feedback**
  - Address reviewer comments
  - Fix validation errors
  - Update PR based on feedback

**Afternoon (2 hours)**

- [ ] **Week 1 Review**
  - Q&A session
  - Review learning objectives
  - Identify knowledge gaps
  - Plan Week 2 activities

- [ ] **Week 1 Assessment**
  - Quiz on key concepts
  - Practical exercises
  - Discussion of scenarios

---

## Week 2-4: Hands-On Practice

### Week 2: Supervised Practice

**Objectives:**
- Create 2-3 governed PRs with guidance
- Participate in code reviews
- Practice using CLI tools
- Handle simple HITL scenarios

**Daily Activities:**

- [ ] **Morning Standup with Buddy**
  - Review yesterday's work
  - Plan today's tasks
  - Ask questions

- [ ] **Development Work**
  - Pick beginner-friendly tasks
  - Create governed PRs
  - Respond to review feedback
  - Fix CI/CD failures

- [ ] **Afternoon Review**
  - Review PR progress
  - Discuss challenges
  - Learn from mistakes

**Success Criteria:**
- [ ] Created 3 governed PRs
- [ ] All PRs passed governance checks
- [ ] Participated in 5+ code reviews
- [ ] Successfully resolved 1 waiver request

### Week 3: Independent Practice

**Objectives:**
- Work more independently
- Handle complex scenarios
- Create ADRs when needed
- Mentor newer team members

**Weekly Tasks:**

- [ ] **Create 4-5 Governed PRs**
  - Mix of features and fixes
  - Practice different scenarios
  - Handle various quality gates

- [ ] **Participate in Governance**
  - Review others' PRs
  - Approve/request changes
  - Create HITL items when needed

- [ ] **Documentation**
  - Create 1-2 ADRs
  - Update documentation
  - Improve clarity

**Check-In Points:**
- Monday: Weekly planning
- Wednesday: Mid-week review
- Friday: Week retrospective

### Week 4: Advanced Topics

**Objectives:**
- Master advanced features
- Customize governance
- Help onboard others
- Contribute improvements

**Advanced Activities:**

- [ ] **Customize Policies**
  - Propose policy changes
  - Create ADR for changes
  - Implement with approval

- [ ] **Improve Workflows**
  - Optimize CI/CD
  - Add custom checks
  - Enhance automation

- [ ] **Help Others**
  - Answer questions in chat
  - Review complex PRs
  - Share learnings

**End of Week 4:**
- [ ] Final assessment
- [ ] Feedback session
- [ ] Transition to full independence

---

## Success Metrics

### Week 1 Metrics

- [ ] Completed all Day 1-5 activities
- [ ] Read all required documentation
- [ ] Passed Week 1 assessment (80%+)
- [ ] Created first governed PR

### Week 2 Metrics

- [ ] Created 3+ governed PRs
- [ ] 100% PR pass rate (after fixes)
- [ ] Participated in 5+ code reviews
- [ ] Resolved 1+ waiver request

### Week 3 Metrics

- [ ] Created 4-5 governed PRs
- [ ] Average PR review time <2 hours
- [ ] Created 1-2 ADRs
- [ ] 90%+ CI/CD success rate

### Week 4 Metrics

- [ ] Working independently
- [ ] Helping newer team members
- [ ] Contributing to improvements
- [ ] Zero unresolved questions

### Overall Success Indicators

- **Knowledge**: Can explain governance concepts
- **Skills**: Can create governed PRs independently
- **Problem-Solving**: Can debug and fix issues
- **Collaboration**: Can review others' work
- **Autonomy**: Works independently with minimal guidance

---

## Common Challenges

### Challenge 1: Information Overload

**Symptoms:**
- Feeling overwhelmed by documentation
- Struggling to remember all rules
- Paralyzed by fear of making mistakes

**Solutions:**
- Focus on core concepts first
- Use checklists and references
- Remember: governance helps prevent mistakes
- Ask buddy for clarification
- Practice with simple tasks first

### Challenge 2: Tool Confusion

**Symptoms:**
- Unsure which CLI command to use
- Confused by validation errors
- Don't understand CI/CD failures

**Solutions:**
- Keep CLI reference handy
- Practice commands in sandbox
- Review examples in documentation
- Ask for help debugging errors
- Pair with experienced developer

### Challenge 3: Fear of HITL/Waivers

**Symptoms:**
- Avoiding situations requiring HITL
- Hesitant to request waivers
- Worried about doing it wrong

**Solutions:**
- HITL is normal and expected
- Waivers are valid when justified
- Team is supportive and helpful
- Practice writing HITL items
- Review examples of good requests

### Challenge 4: Boundary Confusion

**Symptoms:**
- Unsure if import is allowed
- Confused about layer dependencies
- Don't know when ADR is needed

**Solutions:**
- Review layer model diagram
- Check boundary policy
- Ask before making cross-feature imports
- When in doubt, create ADR
- Learn from code review feedback

### Challenge 5: Slow PR Process

**Symptoms:**
- PRs take long time to merge
- Frustrated by multiple review cycles
- CI/CD keeps failing

**Solutions:**
- Run checks locally before pushing
- Address all feedback at once
- Break large PRs into smaller ones
- Ask for help with persistent failures
- Use `governance verify` before submitting

---

## Resources

### Essential Reading

**Week 1:**
- [EXECUTIVE_SUMMARY.md](/EXECUTIVE_SUMMARY.md)
- [CONCEPTS_OVERVIEW.md](/docs/getting-started/CONCEPTS_OVERVIEW.md)
- [QUICK_START.md](/docs/getting-started/QUICK_START.md)
- [YOUR_FIRST_PR.md](/docs/getting-started/YOUR_FIRST_PR.md)

**Week 2:**
- [ARCHITECTURE_OVERVIEW.md](/docs/architecture/ARCHITECTURE_OVERVIEW.md)
- [LAYER_MODEL.md](/docs/architecture/LAYER_MODEL.md)
- [All Policy files](/templates/.repo/policy/)

**Week 3:**
- [AGENT_ARCHITECTURE.md](/docs/architecture/AGENT_ARCHITECTURE.md)
- [SECURITY_ARCHITECTURE.md](/docs/architecture/SECURITY_ARCHITECTURE.md)
- [All How-To Guides](/docs/guides/)

**Week 4:**
- [API_REFERENCE.md](/docs/reference/API_REFERENCE.md)
- [Advanced guides and references](/docs/reference/)

### Quick References

- [CLI Reference](/docs/reference/CLI_REFERENCE.md) - All CLI commands
- [Manifest Reference](/docs/reference/MANIFEST_REFERENCE.md) - Manifest format
- [Policy Reference](/docs/reference/POLICY_REFERENCE.md) - All policies
- [Principles Reference](/docs/reference/PRINCIPLES_REFERENCE.md) - All principles

### Tools and Links

- Governance CLI: `npm install -g @trevorplam/governance-cli`
- Repository: https://github.com/TrevorPLam/governance
- Team Chat: [Insert link]
- Support Email: [Insert email]

### Training Materials

- Training Repository: [Insert link]
- Example PRs: [Insert links]
- Video Tutorials: [Insert links]
- Office Hours: [Insert schedule]

---

## Appendix: Checklists

### New Team Member Checklist

**Pre-Start:**
- [ ] Accounts created
- [ ] Access granted
- [ ] Documentation shared
- [ ] Buddy assigned

**Day 1:**
- [ ] Welcome and introduction
- [ ] Governance overview
- [ ] Repository tour
- [ ] CLI installation
- [ ] First PR review

**Week 1:**
- [ ] All policies reviewed
- [ ] Manifest training complete
- [ ] CI/CD understanding
- [ ] HITL process learned
- [ ] First PR created

**Week 2:**
- [ ] 3+ PRs created
- [ ] Code reviews participated
- [ ] Waiver requested
- [ ] Working with buddy

**Week 3:**
- [ ] 4-5 PRs created
- [ ] Working independently
- [ ] ADRs created
- [ ] Helping others

**Week 4:**
- [ ] Advanced topics covered
- [ ] Customizations attempted
- [ ] Mentoring started
- [ ] Assessment passed

### Onboarding Lead Checklist

**2 Weeks Before:**
- [ ] Training repo prepared
- [ ] Access configured
- [ ] Buddy assigned
- [ ] Materials ready

**Week Before:**
- [ ] Welcome email sent
- [ ] Schedule planned
- [ ] Tools installed
- [ ] Team notified

**Day 1:**
- [ ] Welcome session delivered
- [ ] Demo completed
- [ ] CLI setup verified
- [ ] Homework assigned

**Weekly:**
- [ ] Check-ins scheduled
- [ ] Progress tracked
- [ ] Feedback collected
- [ ] Adjustments made

**End of Onboarding:**
- [ ] Assessment completed
- [ ] Feedback session held
- [ ] Documentation updated
- [ ] Next steps defined

---

## Feedback and Improvement

### Collecting Feedback

**After Week 1:**
- What was most helpful?
- What was confusing?
- What should we add/remove?
- How can we improve?

**After Week 4:**
- Overall experience rating
- Suggestions for improvement
- Missing resources
- Best practices learned

### Iterating the Playbook

- Review feedback quarterly
- Update based on common issues
- Add new scenarios and examples
- Improve clarity and structure
- Keep materials current

### Contact

For questions or suggestions about this playbook:
- Create issue in governance repository
- Email team lead
- Discuss in team meetings
- Update documentation directly

---

**Version:** 1.0.0  
**Last Updated:** 2026-01-22  
**Maintainer:** TrevorPLam/governance
