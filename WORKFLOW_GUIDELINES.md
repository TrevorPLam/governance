# Workflow Guidelines
## Sequential Task Execution and Plan Adherence

**Purpose:** Establish strict guidelines for working on this governance repository  
**Status:** Active  
**Last Updated:** 2026-01-22

---

## Core Principles

### 1. Sequential Task Execution (MANDATORY)

**Rule:** You MUST work on open tasks in sequential order.

**Implementation:**
- Tasks are defined in phase documents (PHASE_1 through PHASE_6)
- Tasks within each phase must be completed in order from top to bottom
- You cannot start a task until all preceding tasks are completed
- Use checkboxes in phase documents to track completion

**Example:**
```
✅ Phase 1, Task 1.1 - COMPLETED
✅ Phase 1, Task 1.2 - COMPLETED  
🔄 Phase 1, Task 1.3 - IN PROGRESS (current work)
⏸️ Phase 1, Task 1.4 - BLOCKED (cannot start yet)
⏸️ Phase 2, Task 2.1 - BLOCKED (cannot start yet)
```

**Rationale:**
- Ensures dependencies are respected
- Prevents conflicts and rework
- Maintains system integrity
- Enables predictable progress tracking

---

### 2. No Deviation from Plan (MANDATORY)

**Rule:** You MUST NOT deviate from the established plan without explicit approval.

**What Counts as Deviation:**
- Skipping tasks
- Reordering tasks
- Adding new tasks not in the plan
- Changing task scope or deliverables
- Modifying success criteria
- Changing implementation approach

**What Does NOT Count as Deviation:**
- Minor adjustments to file names/paths
- Adding clarifying comments
- Fixing typos in documentation
- Improving code quality within task scope
- Adding tests for implemented features

**Process:**
1. If deviation seems necessary, STOP work immediately
2. Document why deviation is needed
3. Propose alternative approach
4. Request approval before proceeding
5. Update plan documents after approval

---

### 3. Pre-Execution Assessment (MANDATORY)

**Rule:** Assess entire repository before executing tasks to determine if task is sound, or if a different approach is more logical.

**Before Starting ANY Task:**

#### Step 1: Review Entire Repository Context
- [ ] Read relevant phase document completely
- [ ] Review related files in `00. Implementation/`
- [ ] Check dependencies on other tasks/phases
- [ ] Review success criteria for this task
- [ ] Understand how this task fits in overall plan

#### Step 2: Validate Task Soundness
Ask yourself:
- Does this task make sense given current state?
- Are prerequisites actually completed?
- Will this approach work with existing code/docs?
- Are there better ways to achieve the goal?
- Will this create technical debt?

#### Step 3: Decision Point
- **If task is sound:** Proceed with execution
- **If task needs adjustment:** Follow deviation approval process (Rule 2)
- **If task is blocked:** Document blockers and skip to next unblocked task

#### Step 4: Document Assessment
Before executing, document:
```markdown
## Pre-Execution Assessment: [Task Name]

**Task:** [Task identifier from phase document]
**Assessment Date:** [Date]

### Repository State
- Current phase: [Phase number]
- Completed tasks: [Count]
- Relevant files reviewed: [List]

### Task Soundness Evaluation
- Prerequisites met: [Yes/No with details]
- Approach validated: [Yes/No with details]
- Dependencies clear: [Yes/No with details]
- Success criteria understood: [Yes/No with details]

### Decision
- [ ] Proceed as planned
- [ ] Request modification (see deviation request below)
- [ ] Blocked (see blockers below)

### Notes
[Any additional context or concerns]
```

---

### 4. Deviation Approval Required (MANDATORY)

**Rule:** ALL deviations from existing plans must be approved before implementation.

**Approval Process:**

#### Step 1: Create Deviation Request
Document in a new file: `deviation-requests/YYYY-MM-DD-[task-name].md`

```markdown
# Deviation Request: [Task Name]

**Date:** [Date]
**Task:** [Task identifier]
**Requested by:** [Name/Agent]

## Current Plan
[What the current plan says to do]

## Proposed Change
[What you want to do instead]

## Justification
[Why the deviation is necessary]

### Problems with Current Plan
1. [Specific issue 1]
2. [Specific issue 2]

### Benefits of Proposed Approach
1. [Benefit 1]
2. [Benefit 2]

## Impact Analysis
- Affected tasks: [List]
- Affected files: [List]
- Timeline impact: [Estimate]
- Risk level: [Low/Medium/High]

## Alternatives Considered
1. [Alternative 1] - Rejected because [reason]
2. [Alternative 2] - Rejected because [reason]

## Recommendation
[Your recommendation and reasoning]
```

#### Step 2: Get Approval
- Create GitHub issue with deviation request
- Tag repository owner/maintainer
- Wait for approval before proceeding
- Update plan documents after approval

#### Step 3: Document Approval
Add to deviation request file:
```markdown
## Approval Decision

**Decision:** [Approved/Rejected/Modified]
**Date:** [Date]
**Approver:** [Name]
**Notes:** [Any conditions or modifications]
```

---

## Task Execution Workflow

### Standard Process for Every Task

```
1. PRE-EXECUTION
   ├─ Review repository state
   ├─ Read task requirements
   ├─ Validate prerequisites
   ├─ Assess task soundness
   └─ Document assessment
   
2. DECISION POINT
   ├─ Task sound? → Continue to Step 3
   ├─ Need deviation? → Request approval, WAIT
   └─ Blocked? → Document, skip task
   
3. EXECUTION
   ├─ Follow task checklist exactly
   ├─ Update checkboxes as you go
   ├─ Stay within defined scope
   └─ Document any issues
   
4. VALIDATION
   ├─ Verify success criteria met
   ├─ Test deliverables
   ├─ Review for quality
   └─ Ensure no regressions
   
5. COMPLETION
   ├─ Mark task complete
   ├─ Commit changes
   ├─ Update progress tracking
   └─ Move to next task
```

---

## Progress Tracking

### Required Documentation

1. **Task Completion Status**
   - Update checkboxes in phase documents
   - Use consistent markers: `[x]` for complete, `[ ]` for incomplete

2. **Assessment Records**
   - Keep assessment documents in `assessments/` folder
   - One file per task: `assessments/phase-[N]-task-[N.N].md`

3. **Deviation Requests**
   - Keep in `deviation-requests/` folder
   - Include approval status

4. **Progress Reports**
   - Weekly summary of completed tasks
   - Blockers and risks
   - Upcoming tasks

---

## Enforcement

### How These Guidelines Are Enforced

1. **Manual Review**
   - Repository maintainers review PRs for compliance
   - Reject PRs that violate guidelines

2. **Documentation Requirements**
   - PRs must include assessment documentation
   - Deviations require approval evidence

3. **Checkpoint Reviews**
   - End of each phase requires full review
   - Cannot proceed to next phase without approval

---

## Examples

### Example 1: Following Guidelines Correctly

**Scenario:** Starting Phase 1, Task 1.1

✅ **Correct Approach:**
1. Read PHASE_1_FOUNDATION_TODO.md completely
2. Review related files in `00. Implementation/`
3. Document pre-execution assessment
4. Verify prerequisites (none for first task)
5. Execute task as written
6. Mark checkbox as complete
7. Move to Task 1.2

### Example 2: Handling Needed Deviation

**Scenario:** Task 2.3 specifies using YAML, but JSON would be better

✅ **Correct Approach:**
1. STOP before starting Task 2.3
2. Create deviation request documenting:
   - Current plan (use YAML)
   - Proposed change (use JSON)
   - Justification (better tooling, existing patterns)
   - Impact analysis
3. Create GitHub issue requesting approval
4. WAIT for approval
5. If approved, update plan and proceed
6. If rejected, follow original plan

❌ **Incorrect Approach:**
1. ~~Decide JSON is better~~
2. ~~Implement with JSON~~
3. ~~Update docs later~~
4. ~~Hope no one notices~~

### Example 3: Identifying Unsound Task

**Scenario:** Task 3.5 depends on Task 2.8, but Task 2.8 wasn't completed

✅ **Correct Approach:**
1. During pre-execution assessment, identify missing prerequisite
2. Document the blocker
3. Go back and complete Task 2.8 first
4. Return to Task 3.5 after prerequisite is met

---

## Benefits of This Workflow

1. **Predictability:** Know exactly what's being worked on
2. **Quality:** Thorough assessment prevents mistakes
3. **Traceability:** Clear documentation of decisions
4. **Coordination:** Multiple contributors can work together
5. **Risk Management:** Deviations are controlled and approved
6. **Efficiency:** Prevents rework from incorrect assumptions

---

## Common Questions

### Q: What if I find a bug while working on a task?
**A:** If the bug is in code you're currently modifying, fix it as part of the task. If it's elsewhere, create an issue but don't fix it unless it's blocking your task.

### Q: What if the plan is clearly wrong?
**A:** Follow the deviation approval process. Document why it's wrong and propose a better approach. Get approval before changing course.

### Q: Can I work on multiple tasks in parallel?
**A:** No. Complete one task fully before starting the next. This ensures clean commits and prevents conflicts.

### Q: What if a task would take weeks?
**A:** Break it into subtasks in your working notes, but complete the full task before marking it done. The task boundaries are designed to be reasonable.

### Q: What if I'm blocked on a task?
**A:** Document the blocker clearly. If there's another unblocked task you can work on sequentially, do that. Otherwise, wait for the blocker to be resolved.

---

## Version History

- **v1.0** (2026-01-22): Initial workflow guidelines established

---

**Status:** Active and required for all work on this repository  
**Exceptions:** None without explicit approval from repository owner
