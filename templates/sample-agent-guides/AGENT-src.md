# AGENT.md - src/ Folder Guide (Sample)
<!-- This is a SAMPLE - Copy to your src/ folder and customize -->

This guide explains what agents may and may not do in the `src/` folder.

## Purpose of This Folder

The `src/` folder contains the **application source code**.

## What Agents May Do

- ✅ Create new features following boundaries
- ✅ Fix bugs within modules
- ✅ Refactor within boundaries
- ✅ Add tests
- ✅ Update documentation

## What Agents May NOT Do

- ❌ Create reverse dependencies (data → domain)
- ❌ Cross feature boundaries without ADR
- ❌ Add dependencies without ADR
- ❌ Skip tests
- ❌ Hardcode secrets

## Boundary Rules

Layer model: ui → domain → data → platform

See [/.repo/policy/BOUNDARIES.md](../.repo/policy/BOUNDARIES.md) for complete rules.

**When in doubt, create HITL item and ask a human.**
