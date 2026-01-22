# P1 TODO - High Priority Tasks

**Priority Level:** P1 (High Priority)  
**Purpose:** Track important tasks that should be completed soon but aren't blocking.

---

## Instructions

- **Use P1 for**: Important features, improvements, or fixes that should be done soon
- **Format**: Use markdown checkboxes with clear descriptions
- **Include**: Task description, context, and verification steps
- **Archive**: Move completed tasks to `COMPLETEDTODO.md` with completion date
- **Traceability**: Link to issues, PRs, or other documents as needed

---

## Active P1 Tasks

### Example Format
- [ ] **[Task Name]** - Brief description
  - **Context**: Why this matters
  - **Verify**: How to confirm completion
  - **Related**: Links to issues, PRs, docs

---

### Current Tasks

<!-- Add your P1 tasks below this line -->

- [ ] **Add unit tests for core module** - Increase test coverage
  - **Context**: Currently at 60% coverage, target is 80%
  - **Verify**: Run `npm test -- --coverage` and check report
  - **Related**: See `/.repo/policy/QUALITY_GATES.md` for coverage requirements

- [ ] **Update documentation for new API** - Document changes from last sprint
  - **Context**: New endpoints added in v2.0 release
  - **Verify**: Review docs match actual API behavior
  - **Related**: PR #123

---

## Notes

- P1 tasks are important but don't block immediate progress
- Review P1 list weekly to prioritize and schedule work
- Consider dependencies between P1 tasks
- Promote to P0 if urgency increases
- When tasks are completed, move to `COMPLETEDTODO.md` for tracking
