# AGENT.md - tests/ Folder Guide (Sample)
<!-- This is a SAMPLE - Copy to your tests/ folder and customize -->

This guide explains what agents may and may not do in the `tests/` folder.

## Purpose of This Folder

The `tests/` folder contains **test code** that validates application functionality.

## What Agents May Do

- ✅ Create new tests for features
- ✅ Update tests when code changes
- ✅ Add test utilities and helpers
- ✅ Create test fixtures and mocks
- ✅ Improve test coverage

## What Agents May NOT Do

- ❌ Delete tests without understanding impact
- ❌ Disable tests to make builds pass
- ❌ Skip adding tests for new code
- ❌ Write tests that don't actually test
- ❌ Test implementation details (test behavior)

## Testing Standards

### Test Structure
- ✅ Arrange-Act-Assert pattern
- ✅ One assertion per test (when possible)
- ✅ Clear test names describing what is tested
- ✅ Isolated tests (no dependencies between tests)

### Test Coverage
- ✅ Minimum 80% coverage required
- ✅ All public functions tested
- ✅ Edge cases covered
- ✅ Error cases tested

### Test Types
- **Unit Tests:** Test individual functions/classes
- **Integration Tests:** Test module interactions
- **E2E Tests:** Test complete workflows

## Required Links

- **Quality Gates:** [/.repo/policy/QUALITY_GATES.md](../.repo/policy/QUALITY_GATES.md)
- **Principles P10:** Testing required - [/.repo/policy/PRINCIPLES.md](../.repo/policy/PRINCIPLES.md)

**When in doubt, create HITL item and ask a human.**
