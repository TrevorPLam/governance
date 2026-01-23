# Contributing to AI-Native Governance Framework

Thank you for your interest in contributing to the AI-Native Governance Framework!

## 🚨 IMPORTANT: Workflow Requirements

**Before making any contributions, you MUST read and follow:**

→ **[WORKFLOW_GUIDELINES.md](WORKFLOW_GUIDELINES.md)** ←

This repository has **strict workflow requirements** that all contributors must follow:

1. **Sequential Task Execution:** Work on tasks in order, no skipping
2. **No Plan Deviations:** Cannot change the plan without approval
3. **Pre-Execution Assessment:** Must assess repository state before starting any task
4. **Deviation Approval Required:** All changes to the plan require documented approval

**Non-compliance with these guidelines will result in PRs being rejected.**

---

## Quick Start for Contributors

### Step 1: Read the Planning Documents

Before contributing, understand the project:

1. **Start Here:** [planning/PLANNING_START_HERE.md](planning/PLANNING_START_HERE.md)
2. **Review Roadmap:** [planning/roadmap/MASTER_IMPLEMENTATION_ROADMAP_TODO.md](planning/roadmap/MASTER_IMPLEMENTATION_ROADMAP_TODO.md)
3. **Understand Current Phase:** Check which phase is currently being worked on

### Step 2: Read Workflow Guidelines

**Required reading:** [WORKFLOW_GUIDELINES.md](WORKFLOW_GUIDELINES.md)

This document explains:
- How to work on tasks sequentially
- How to assess tasks before starting
- How to request deviations from the plan
- How to document your work

### Step 3: Find Your Task

1. Check the current phase document (e.g., `planning/roadmap/PHASE_1_FOUNDATION_TODO.md`)
2. Find the next uncompleted task (first `[ ]` checkbox)
3. Verify prerequisites are met
4. Ensure no one else is working on it

### Step 4: Complete Pre-Execution Assessment

**Required before starting work:**

1. Create assessment document in `assessments/` folder
2. Follow template in WORKFLOW_GUIDELINES.md
3. Document your findings
4. Decide if task can proceed as planned

### Step 5: Do the Work

1. Follow the task checklist exactly
2. Stay within the defined scope
3. Update checkboxes as you complete subtasks
4. Commit frequently with clear messages

### Step 6: Submit Pull Request

Your PR must include:
- [ ] Task completion (checkboxes marked)
- [ ] Pre-execution assessment document
- [ ] Tests (if applicable)
- [ ] Documentation updates
- [ ] Reference to phase and task number

**PR Title Format:** `[Phase N.N] Task description`

**Example:** `[Phase 1.2] Create policy files`

---

## Types of Contributions

### 1. Implementation Tasks

**Most Common:** Following the phase documents to build the framework

**Process:**
1. Read WORKFLOW_GUIDELINES.md
2. Find next task in phase document
3. Complete assessment
4. Implement task
5. Submit PR

### 2. Documentation Improvements

**Examples:** Fixing typos, clarifying instructions, improving examples

**Process:**
- Minor fixes: Submit PR directly
- Major changes: Follow deviation process

### 3. Bug Fixes

**For bugs in existing code:**

**Process:**
1. Create issue describing bug
2. If urgent and blocking: Proceed with fix
3. If not blocking: Add to appropriate phase document
4. Submit PR with issue reference

### 4. Feature Requests

**For new features not in the plan:**

**Process:**
1. Create deviation request in `deviation-requests/`
2. Create GitHub issue
3. Wait for approval
4. If approved, add to appropriate phase
5. Implement following sequential order

---

## Development Setup

This is primarily a documentation and template repository. No special setup required.

**Recommended tools:**
- Markdown editor with preview (VS Code, Typora, or similar)
- Git client (Git 2.0+)
- Text editor with YAML/JSON support (VS Code, Sublime Text, or similar)
- Optional: Node.js 14+ (for future CLI tool development)

---

## Code Style and Standards

### Markdown

- Use consistent heading levels
- Include table of contents for long documents
- Use code blocks with language specification
- Keep line length reasonable (~100 chars)

### YAML/JSON

- Use 2-space indentation
- Include comments explaining purpose
- Validate against schemas when available

### File Organization

- Follow existing directory structure
- Use semantic, descriptive names
- Include README.md in each directory
- Keep related files together

---

## Pull Request Process

### Before Submitting

- [ ] Read WORKFLOW_GUIDELINES.md
- [ ] Complete pre-execution assessment
- [ ] All checkboxes updated in phase document
- [ ] Tests pass (if applicable)
- [ ] Documentation updated
- [ ] Commit messages are clear
- [ ] No deviations without approval

### PR Template

```markdown
## Phase and Task

**Phase:** [e.g., Phase 1: Foundation]
**Task:** [e.g., 1.2 - Build Policy Files]
**Document:** [e.g., planning/roadmap/PHASE_1_FOUNDATION_TODO.md]

## Pre-Execution Assessment

**Assessment Document:** [Link to assessments/phase-X-task-X.X.md]
**Decision:** Proceed as planned / Deviation requested

## Changes Made

- [ ] Subtask 1
- [ ] Subtask 2
- [ ] Subtask 3

## Testing

[How changes were tested]

## Documentation

[What documentation was added/updated]

## Checklist

- [ ] Followed WORKFLOW_GUIDELINES.md
- [ ] Assessment document created
- [ ] Task completed fully
- [ ] Phase document updated
- [ ] No unapproved deviations
- [ ] Ready for review
```

### Review Process

1. **Automated checks:** PR validation (when implemented)
2. **Manual review:** Maintainer reviews for compliance
3. **Feedback:** Address any requested changes
4. **Approval:** Maintainer approves and merges
5. **Post-merge:** Update progress tracking

---

## Requesting Deviations

If you need to deviate from the plan:

### Step 1: Create Deviation Request

Create file: `deviation-requests/YYYY-MM-DD-[description].md`

Use template from WORKFLOW_GUIDELINES.md

### Step 2: Create GitHub Issue

- Title: `[Deviation Request] [Brief description]`
- Body: Link to deviation request file
- Label: `deviation-request`
- Tag: Repository maintainer

### Step 3: Wait for Decision

**Do not proceed** until deviation is:
- Approved (can implement change)
- Rejected (follow original plan)
- Modified (follow modified plan)

### Step 4: Update Documentation

If approved:
1. Update relevant phase documents
2. Update planning/roadmap/MASTER_IMPLEMENTATION_ROADMAP_TODO.md if needed
3. Note deviation in PR description

---

## Communication

### Questions

- **General questions:** Create GitHub issue with `question` label
- **Task clarification:** Comment on relevant phase document
- **Urgent issues:** Tag maintainer in issue

### Discussions

- **Design decisions:** Use GitHub Discussions
- **Implementation details:** Comment in PRs
- **Long-term planning:** Create issue for roadmap discussion

### Updates

- **Progress updates:** Update checkboxes in phase documents
- **Blockers:** Create issue with `blocked` label
- **Milestones:** Announced in GitHub releases

---

## Code of Conduct

### Our Standards

- **Be respectful:** Treat all contributors with respect
- **Be collaborative:** Work together toward common goals
- **Be constructive:** Provide helpful, actionable feedback
- **Be patient:** Understand that people have different skill levels
- **Be inclusive:** Welcome diverse perspectives and experiences

### Unacceptable Behavior

- Harassment or discrimination of any kind
- Trolling, insulting, or derogatory comments
- Publishing others' private information
- Other conduct inappropriate in a professional setting

### Enforcement

Violations will result in:
1. Warning from maintainer
2. Temporary ban from contributions
3. Permanent ban for serious or repeated violations

---

## Recognition

Contributors will be recognized in:
- CONTRIBUTORS.md file (to be created)
- Release notes
- Documentation where appropriate

Significant contributions may result in:
- Co-author credit on commits
- Maintainer status (for long-term contributors)
- Special recognition in project documentation

---

## Getting Help

### Resources

1. **Documentation:**
   - [planning/PLANNING_START_HERE.md](planning/PLANNING_START_HERE.md) - Overview and navigation
   - [WORKFLOW_GUIDELINES.md](WORKFLOW_GUIDELINES.md) - Required workflow
   - [planning/roadmap/MASTER_IMPLEMENTATION_ROADMAP_TODO.md](planning/roadmap/MASTER_IMPLEMENTATION_ROADMAP_TODO.md) - Overall plan
   - Phase documents - Specific task details

2. **Support:**
   - GitHub Issues - Questions and discussions
   - GitHub Discussions - Long-form discussions
   - README.md - Project overview

### Common Questions

**Q: Can I work on multiple tasks at once?**  
A: No. You must complete one task fully before starting the next.

**Q: What if I disagree with the plan?**  
A: Follow the deviation request process to propose changes.

**Q: Can I reorder tasks?**  
A: No, unless you get approval through the deviation process.

**Q: What if a task is unclear?**  
A: Create an issue asking for clarification before starting work.

**Q: What if I find a better way to do something?**  
A: Great! Follow the deviation request process to propose it.

---

## License

By contributing, you agree that your contributions will be licensed under the same license as this project.

---

## Thank You!

Your contributions help make this project better for everyone. We appreciate your effort, creativity, and dedication to following our processes.

**Remember:** Read [WORKFLOW_GUIDELINES.md](WORKFLOW_GUIDELINES.md) before starting any work!

---

**Questions?** Create an issue with the `question` label.

**Ready to contribute?** Start with [planning/PLANNING_START_HERE.md](planning/PLANNING_START_HERE.md)!
