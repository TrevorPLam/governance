# Simple PR Workflow Example

## Scenario
Agent needs to add a new Button variant to the UI component library.

## Step-by-Step Workflow

### 1. Agent Planning (Three-Pass: Plan)

**Agent analyzes task:**
```
Task: Add "outlined" variant to Button component
Location: packages/ui/src/Button.tsx
Layer: Presentation
```

**Agent creates plan:**
```markdown
## Implementation Plan

### Files to Modify
- packages/ui/src/Button.tsx (add outlined variant)
- packages/ui/src/Button.test.tsx (add tests)
- packages/ui/src/Button.css (add styles)

### Boundary Check
- ✅ UI layer - allowed to modify presentation components
- ✅ No cross-layer imports needed
- ✅ Following existing patterns

### Risks
- None identified (low-risk change)

### Unknown Items
- None
```

### 2. Agent Implementation (Three-Pass: Change)

**Agent makes changes:**

```typescript
// packages/ui/src/Button.tsx
export interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'outlined';  // Added 'outlined'
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  variant = 'primary',
  disabled = false,
}) => {
  const className = `btn btn-${variant}`;
  // ... rest of implementation
};
```

**Agent adds tests:**
```typescript
// packages/ui/src/Button.test.tsx
describe('Button', () => {
  it('renders outlined variant', () => {
    const { container } = render(
      <Button label="Click" onClick={() => {}} variant="outlined" />
    );
    expect(container.querySelector('.btn-outlined')).toBeInTheDocument();
  });
});
```

### 3. Agent Verification (Three-Pass: Verify)

**Agent runs checks:**
```bash
# Run tests
$ npm test -- Button.test.tsx
✅ All tests pass (12/12)

# Check boundaries
$ npm run check:boundaries
✅ No boundary violations

# Check governance
$ npm run check:governance
✅ Governance rules followed

# Lint
$ npm run lint
✅ No linting issues
```

**Agent generates evidence log:**
```markdown
# AGENT_LOG.md

## Change Summary
Added 'outlined' variant to Button component

## Three-Pass Process

### Pass 1: Plan
- Identified files to modify
- Checked boundaries (no violations)
- No unknown items

### Pass 2: Change
- Updated Button.tsx
- Added tests
- Added styles

### Pass 3: Verify
- Tests: 12/12 passed ✅
- Boundaries: No violations ✅
- Governance: Compliant ✅
- Lint: Clean ✅

## Evidence
- Test results: All passing
- Boundary check: Clean
- No breaking changes
```

### 4. Create Pull Request

**Agent creates PR with:**
- Clear title: "feat(ui): Add outlined button variant"
- Description with context
- Links to AGENT_LOG.md
- Checklist completed

**PR Description:**
```markdown
## Description
Adds "outlined" variant to Button component for use in secondary CTAs.

## Changes
- Added 'outlined' to ButtonProps variant type
- Implemented outlined button styles
- Added tests for outlined variant

## Governance
- [x] Three-pass process completed
- [x] Tests added and passing
- [x] Boundaries checked (no violations)
- [x] AGENT_LOG.md included
- [x] No breaking changes

## Evidence
See AGENT_LOG.md for full verification details.
```

### 5. Automated Checks Run

**CI/CD pipeline:**
```
✅ Lint passed
✅ Tests passed (12/12)
✅ Type check passed
✅ Boundary check passed
✅ Governance verification passed
✅ Security scan passed
```

### 6. Human Review

**Reviewer checks:**
- [x] Code quality is good
- [x] Tests cover the changes
- [x] Documentation is clear
- [x] Follows governance
- [x] No security concerns

**Reviewer approves:**
```
LGTM! ✅

Outlined variant looks good and tests are comprehensive.
No governance issues. Approved for merge.
```

### 7. Merge

**Agent or human merges PR:**
- Squash commits
- Update changelog
- Delete feature branch

**Result: Feature successfully delivered!** 🎉

## Key Takeaways

1. **Planning first** - Agent analyzed before coding
2. **Boundary awareness** - Checked allowed operations
3. **Comprehensive testing** - Tests added with code
4. **Evidence generation** - AGENT_LOG.md documents process
5. **Automated checks** - CI/CD validates everything
6. **Human oversight** - Final approval from reviewer

## Time Breakdown

- Planning: 2 minutes
- Implementation: 10 minutes
- Verification: 3 minutes
- PR creation: 2 minutes
- CI/CD checks: 5 minutes
- Human review: 5 minutes
- **Total: ~27 minutes**

## What Made This Smooth

✅ Clear task definition
✅ Well-defined boundaries
✅ Automated checks
✅ Good test coverage
✅ Comprehensive logging

## Common Variations

### If Tests Failed
Agent would:
1. Analyze test failure
2. Fix the issue
3. Re-run verification
4. Update AGENT_LOG.md

### If Boundary Violation
Agent would:
1. Stop implementation
2. Document the issue
3. Create HITL escalation
4. Wait for guidance

### If Breaking Change
Agent would:
1. Flag as breaking change
2. Require HITL approval
3. Update major version
4. Create migration guide

---

**Next:** Try [Complex Refactoring](./complex-refactoring.md) for a more challenging scenario.
