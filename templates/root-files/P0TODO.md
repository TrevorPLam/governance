# P0 TODO - Critical/Urgent Tasks

**Priority Level:** P0 (Critical - Must Do Now)  
**Purpose:** Track blocking, urgent, or critical tasks that must be completed immediately.

---

## Instructions

- **Use P0 for**: Tasks that block progress, critical bugs, security issues, or urgent deadlines
- **Format**: Use markdown checkboxes with clear descriptions
- **Include**: Task description, context/justification, and verification steps
- **Archive**: Move completed tasks to `COMPLETEDTODO.md` with completion date
- **Traceability**: Link to issues, PRs, or other documents as needed

---

## Active P0 Tasks

### Example Format
- [ ] **[Task Name]** - Brief description
  - **Context**: Why this is P0 critical
  - **Verify**: How to confirm completion
  - **Due**: Target date (if applicable)
  - **Related**: Links to issues, PRs, docs

---

### Current Tasks

<!-- Add your P0 tasks below this line -->

- [ ] **Fill repo.manifest.yaml** - Complete manifest with actual commands
  - **Context**: Required before governance framework can function
  - **Verify**: Run `npm run check:quick` successfully (or equivalent from manifest)
  - **Related**: See `/.repo/docs/standards/manifest.md` for guidance

---

## Notes

- P0 tasks should be rare and truly urgent
- If you have many P0 tasks, consider if some should be P1
- Review P0 list daily to ensure active progress
- When tasks are completed, move to `COMPLETEDTODO.md` for tracking
