# Architecture Decision Records (ADRs)
<!-- GOVERNANCE_VERSION: 1.0.0 -->
<!-- GOVERNANCE: CUSTOM - Layer 1 -->

This directory contains Architecture Decision Records (ADRs) that document significant architectural decisions made in this project.

## What is an ADR?

An Architecture Decision Record (ADR) is a document that captures an important architectural decision along with its context and consequences.

**Purpose:**
- Document why decisions were made
- Provide context for future developers
- Track architectural evolution
- Enable informed decision-making

## When to Create an ADR

Create an ADR for decisions about:
- ✅ Dependencies (adding, upgrading, removing)
- ✅ API contracts (creating, changing, deprecating)
- ✅ Schemas (database, configuration, data formats)
- ✅ Security (authentication, authorization, encryption)
- ✅ Boundaries (layers, modules, services)
- ✅ Architecture (patterns, technologies, infrastructure)

See [ADR Standards](../standards/adr.md) for complete guidelines.

## How to Create an ADR

### 1. Copy Template
```bash
cp ../../templates/ADR_TEMPLATE.md XXXX-brief-description.md
```

### 2. Number Sequentially
- Use next available number (e.g., 0001, 0002, 0003)
- Never reuse numbers
- Keep chronological order

### 3. Fill Template
- **Context:** What problem are we solving?
- **Options:** What alternatives did we consider?
- **Decision:** What did we decide and why?
- **Consequences:** What are the results?

### 4. Review and Finalize
- Get team feedback
- Address concerns
- Mark as "Accepted"
- Commit to repository

## ADR Index

### Active ADRs

Currently active architecture decisions:

- [ADR-0001: Example ADR](0001-example.md) - Example ADR format (example only)

### Superseded ADRs

Decisions that have been replaced:

_None yet_

### Deprecated ADRs

Decisions that are no longer relevant:

_None yet_

## ADR Template

Location: `../../templates/ADR_TEMPLATE.md`

The template includes:
- Status and metadata
- Context and background
- Options considered (with pros/cons)
- Decision and rationale
- Consequences (positive, negative, trade-offs)
- Implementation details
- Verification strategy

## Numbering System

**Format:** `XXXX-brief-description.md`

**Examples:**
- `0001-example.md`
- `0015-jwt-authentication.md`
- `0042-event-driven-architecture.md`
- `0103-graphql-api.md`

**Finding Next Number:**
```bash
# List existing ADRs
ls *.md | sort

# Next number is one higher than last
```

## ADR Status Values

- **Proposed:** Under discussion, not yet decided
- **Accepted:** Approved and currently in effect
- **Deprecated:** No longer relevant
- **Superseded:** Replaced by a newer ADR

## Linking to ADRs

### From Code
```typescript
// Implementation follows ADR-0015: JWT Authentication
// See .repo/docs/adr/0015-jwt-authentication.md
export class AuthService {
  // ...
}
```

### From Documentation
```markdown
Authentication uses JWT tokens. See [ADR-0015](../.repo/docs/adr/0015-jwt-authentication.md)
for the decision rationale.
```

### From Other ADRs
```markdown
## Related Decisions
- [ADR-0003: API Design](0003-api-design.md) - Foundation for this decision
- Supersedes [ADR-0001: Session Auth](0001-session-auth.md)
```

## Best Practices

### Writing ADRs

**Do:**
- ✅ Be clear and concise
- ✅ Consider multiple options
- ✅ Explain rationale
- ✅ Document consequences
- ✅ Include context
- ✅ Link to related docs

**Don't:**
- ❌ Document implementation details
- ❌ Include sensitive information
- ❌ Skip alternatives analysis
- ❌ Be vague or ambiguous
- ❌ Assume too much context

### Maintaining ADRs

**Do:**
- ✅ Keep ADRs up to date (status changes)
- ✅ Create new ADRs when superseding
- ✅ Link from code and docs
- ✅ Review periodically
- ✅ Archive when deprecated

**Don't:**
- ❌ Edit decision after acceptance
- ❌ Delete ADRs (mark deprecated instead)
- ❌ Reuse ADR numbers
- ❌ Skip ADR review process

## Example ADR

See [ADR-0001: Example](0001-example.md) for a complete example following the template.

## Quick Reference

**Create new ADR:**
1. Copy template
2. Name it `XXXX-title.md` (next sequential number)
3. Fill all sections
4. Get team review
5. Mark "Accepted"
6. Commit

**Supersede existing ADR:**
1. Create new ADR
2. Mark old ADR "Superseded by ADR-XXXX"
3. Link new ADR to old one
4. Update index

**Deprecate ADR:**
1. Mark status "Deprecated"
2. Add deprecation reason
3. Update index
4. Keep for historical reference

## Resources

- **ADR Template:** [../../templates/ADR_TEMPLATE.md](../../templates/ADR_TEMPLATE.md)
- **ADR Standards:** [../standards/adr.md](../standards/adr.md)
- **Documentation Standards:** [../standards/documentation.md](../standards/documentation.md)

## Questions?

If you have questions about ADRs:
1. Read [ADR Standards](../standards/adr.md)
2. Check [ADR Template](../../templates/ADR_TEMPLATE.md)
3. Review [Example ADR](0001-example.md)
4. Ask team via HITL process

---

**Last Updated:** 2026-01-22  
**ADR Count:** 1 (example only)  
**Latest ADR:** 0001
