# Policy Documents

This directory contains the 7 core policy documents that define the governance framework.

## Documents

1. **CONSTITUTION.md** - Core unchangeable rules (Articles 1-8)
2. **PRINCIPLES.md** - Operating principles (P3-P25) with examples
3. **QUALITY_GATES.md** - PR merge requirements and quality standards
4. **SECURITY_BASELINE.md** - Security requirements and review triggers
5. **BOUNDARIES.md** - Architectural constraints and layer model
6. **HITL.md** - Human-in-the-loop escalation process
7. **WAIVERS.md** - Waiver request and tracking system

## Update Policy

**Layer 3 - Never customize locally**

These policy files should NEVER be edited in external repositories. They are maintained in the governance repository and updated by pulling new versions.

Markers in each file:
- `<!-- GOVERNANCE_VERSION: X.X.X -->` - Version number
- `<!-- GOVERNANCE: UPDATEABLE - Layer 2 -->` or `<!-- GOVERNANCE: CUSTOM - Layer 1 -->`

## Usage

External repositories:
1. Copy these files as-is
2. Do NOT modify (except HITL.md and WAIVERS.md which are Layer 1)
3. Pull updates from governance repo when available
4. Use waivers if exceptions are needed

---

**Status:** Templates to be created in Phase 1, Task 2
