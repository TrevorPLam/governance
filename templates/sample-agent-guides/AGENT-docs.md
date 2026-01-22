# AGENT.md - docs/ Folder Guide (Sample)
<!-- This is a SAMPLE - Copy to your docs/ folder and customize -->

This guide explains what agents may and may not do in the `docs/` folder.

## Purpose of This Folder

The `docs/` folder contains **project documentation** for users and developers.

## What Agents May Do

- ✅ Update docs when code changes (P11: docs age with code)
- ✅ Add new documentation
- ✅ Fix typos and errors
- ✅ Improve clarity
- ✅ Add examples (must be tested - P8)

## What Agents May NOT Do

- ❌ Leave docs outdated after code changes
- ❌ Add untested examples
- ❌ Use vague references (use filepaths - P4)
- ❌ Document what code does (document why)
- ❌ Create docs without structure

## Documentation Standards

### Requirements
- ✅ Use full filepaths in all code references
- ✅ Test all code examples
- ✅ Update docs in same PR as code changes
- ✅ Explain WHY, not WHAT
- ✅ Include context and background

### Structure
```
docs/
├── README.md           # Overview
├── getting-started.md  # Quick start
├── api/                # API documentation
├── guides/             # How-to guides
└── architecture/       # Architecture docs
```

## Required Links

- **Documentation Standards:** [/.repo/docs/standards/documentation.md](../.repo/docs/standards/documentation.md)
- **Principles P4, P8, P11:** [/.repo/policy/PRINCIPLES.md](../.repo/policy/PRINCIPLES.md)

**When in doubt, create HITL item and ask a human.**
