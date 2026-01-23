# ADR (Architecture Decision Record) Standards
<!-- GOVERNANCE_VERSION: 1.0.0 -->
<!-- GOVERNANCE: UPDATEABLE - Layer 2 -->

Architecture Decision Records (ADRs) document significant architectural decisions. This standard defines when and how to create ADRs.

## What is an ADR?

An ADR documents:
- **Context:** What problem are we solving?
- **Decision:** What did we decide?
- **Consequences:** What are the results?

ADRs create a historical record of architectural choices, helping current and future team members understand why the system is designed the way it is.

## When to Create an ADR

### Always Required

Create an ADR when making decisions about:

1. **Dependencies**
   - Adding new external dependencies
   - Upgrading major dependencies
   - Removing dependencies
   - Changing dependency strategy

2. **API Contracts**
   - Creating new public APIs
   - Changing existing public APIs
   - Deprecating APIs
   - Versioning strategy

3. **Schemas**
   - Database schema changes
   - Configuration schema changes
   - Data format changes
   - Migration strategies

4. **Security**
   - Authentication mechanisms
   - Authorization models
   - Encryption strategies
   - Security boundaries

5. **Boundaries**
   - Layer model changes
   - Module boundaries
   - Service boundaries
   - Integration patterns

6. **Architecture**
   - System architecture
   - Design patterns
   - Technology choices
   - Infrastructure decisions

### Often Recommended

Consider creating an ADR for:
- Performance optimizations with tradeoffs
- Build/deployment strategies
- Testing strategies
- Development workflow changes
- Tool selections
- Framework choices

### Not Required

Don't create ADRs for:
- Bug fixes (unless they change architecture)
- UI styling changes
- Documentation updates
- Minor configuration changes
- Refactoring within boundaries
- Implementation details

## ADR Creation Process

### 1. Identify Need
Recognize when a decision requires documentation:
- Does it affect system architecture?
- Will future developers need to understand this?
- Does it have long-term consequences?
- Does governance require it? (dependencies, APIs, schemas, security, boundaries, architecture)

### 2. Draft ADR
Use the ADR template:
```bash
cp .repo/templates/ADR_TEMPLATE.md .repo/docs/adr/XXXX-title.md
```

Replace XXXX with next sequential number.

### 3. Fill Template
Complete all sections:
- Context (problem, background, forces)
- Options considered (at least 2-3)
- Decision (what was chosen and why)
- Consequences (positive, negative, trade-offs)
- Implementation details
- Verification strategy

### 4. Review
Get feedback:
- Share with team
- Discuss tradeoffs
- Address concerns
- Refine decision

### 5. Finalize
Mark as accepted:
- Set status to "Accepted"
- Update decision date
- Link from related docs
- Commit to repository

## ADR Numbering

### Sequential Numbering
- Use 4-digit sequential numbers: 0001, 0002, 0003...
- Never reuse numbers (even if ADR is superseded)
- Maintain chronological order
- Start from 0001 or 0000 (your choice)

### Filename Format
```
XXXX-brief-description.md

Examples:
0001-use-typescript.md
0015-jwt-authentication.md
0042-event-driven-orders.md
```

### Finding Next Number
```bash
# List existing ADRs
ls .repo/docs/adr/*.md

# Next number is one higher than highest
```

## ADR Structure

### Required Sections

Every ADR must include:

1. **Header**
   - Status (Proposed, Accepted, Deprecated, Superseded)
   - Date
   - Decision makers
   - Technical story reference

2. **Context**
   - Problem statement
   - Background
   - Current state
   - Forces/constraints

3. **Decision Drivers**
   - What factors influence the decision
   - What's most important

4. **Options Considered**
   - At least 2-3 alternatives
   - Pros and cons for each
   - Why each was/wasn't chosen

5. **Decision**
   - What was chosen
   - Why it was chosen
   - Clear decision statement

6. **Consequences**
   - Positive outcomes
   - Negative outcomes
   - Trade-offs accepted

### Recommended Sections

Include when applicable:

- **Implementation details:** How to implement
- **Migration path:** How to migrate from old to new
- **Verification:** How to verify success
- **Boundary impact:** How it affects boundaries
- **Security review:** Security implications
- **Related decisions:** Links to other ADRs

## ADR Status

### Status Values

- **Proposed:** Decision under discussion
- **Accepted:** Decision approved and active
- **Deprecated:** Decision no longer relevant
- **Superseded:** Replaced by newer decision

### Status Transitions

```
Proposed → Accepted: Team approves
Accepted → Deprecated: No longer relevant
Accepted → Superseded: Replaced by newer ADR (link to new one)
Proposed → (deleted): Not approved, rarely used
```

### Updating Status

When superseding:
```markdown
**Status:** Superseded by [ADR-0123]  
**Date:** 2026-01-22

## Superseded By
This decision has been replaced by [ADR-0123: New Authentication Method](0123-new-auth.md).
```

When deprecating:
```markdown
**Status:** Deprecated  
**Date:** 2026-01-22

## Deprecated Reason
This approach is no longer used as of v2.0. Feature removed.
```

## ADR Quality

### Good ADRs

**Characteristics:**
- ✅ Clear problem statement
- ✅ Multiple options considered
- ✅ Explicit decision rationale
- ✅ Consequences documented
- ✅ Context is sufficient
- ✅ Self-contained (can understand without external context)

**Example:**
```markdown
# ADR-0015: Use JWT for API Authentication

**Status:** Accepted  
**Date:** 2026-01-15

## Context

Our REST API needs authentication. We have 500K+ users and need
to scale horizontally. Current options are sessions (with Redis)
or JWT tokens.

## Decision Drivers
1. Horizontal scalability (no single point of failure)
2. Performance (<10ms token validation)
3. Security (industry standard)

## Options Considered

### Option 1: Session-Based with Redis
Pros: Easy revocation, familiar pattern
Cons: Redis becomes bottleneck, not stateless
Cost: Medium, Risk: Medium

### Option 2: JWT Tokens
Pros: Stateless, scales horizontally, fast validation
Cons: Can't revoke immediately, larger payload
Cost: Low, Risk: Low

## Decision

Use JWT with 1-hour expiry and refresh tokens.

Rationale: Statelessness is critical for our scale. 
Can't revoke is mitigated by short expiry.

## Consequences

Positive:
- Horizontal scaling without session store
- Fast validation (<10ms)
- Lower infrastructure cost

Negative:
- Can't immediately revoke tokens (wait 1 hour)
- Need refresh token mechanism

Trade-off: Accept non-revokable tokens for stateless scale.
```

### Bad ADRs

**Anti-patterns:**
- ❌ No problem statement
- ❌ Only one option considered
- ❌ No rationale for decision
- ❌ Missing consequences
- ❌ Too vague or abstract
- ❌ Assumes too much context

**Example:**
```markdown
# ADR-0015: Authentication

**Status:** Accepted

## Decision

We'll use JWT.

## Consequences

It's good for APIs.
```

## ADR Organization

### File Location
```
.repo/docs/adr/
├── README.md              (About ADRs)
├── 0001-example.md        (Example ADR)
├── 0015-jwt-auth.md       (Real ADR)
├── 0042-event-driven.md   (Real ADR)
└── 0103-graphql-api.md    (Real ADR)
```

### ADR Index

Maintain index in `adr/README.md`:
```markdown
# Architecture Decision Records

## Active ADRs
- [ADR-0015: JWT Authentication](0015-jwt-auth.md)
- [ADR-0042: Event-Driven Orders](0042-event-driven.md)

## Superseded ADRs
- [ADR-0003: Session Auth](0003-session-auth.md) - Superseded by ADR-0015

## Deprecated ADRs
- [ADR-0001: Example](0001-example.md) - Example only
```

### Linking ADRs

Link from code:
```typescript
// Implementation follows ADR-0015: JWT Authentication
// See .repo/docs/adr/0015-jwt-auth.md
export class AuthService {
  // ...
}
```

Link from docs:
```markdown
Authentication uses JWT tokens. See [ADR-0015](../.repo/docs/adr/0015-jwt-auth.md)
for the decision rationale.
```

## ADR Maintenance

### Review Cycle

Review ADRs periodically:
- **Quarterly:** Check if still relevant
- **Major releases:** Verify alignment
- **Team changes:** Ensure understanding

### Updating ADRs

ADRs are immutable records. Don't edit decisions.

**If decision changes:**
- Create new ADR superseding old one
- Link from old to new
- Update index

**If implementation changes:**
- Add addendum section
- Or create new ADR

**If deprecated:**
- Mark as deprecated
- Explain why
- Keep for historical record

### ADR Debt

Identify missing ADRs:
- Major dependencies without ADRs
- API changes without ADRs
- Schema changes without ADRs
- Review git history for undocumented decisions

Create retroactive ADRs if needed:
- Mark date as when decided, not when documented
- Note that it's retroactive
- Better late than never

## Tools

### ADR Tools

**Creation:**
- ADR template (.repo/templates/ADR_TEMPLATE.md)
- Sequential numbering script
- ADR generators (adr-tools, log4brains)

**Management:**
- ADR index (adr/README.md)
- Links in code and docs
- Search functionality

**Visualization:**
- ADR dependency graphs
- Decision timeline
- ADR dashboards

## References

- ADR Template: /.repo/templates/ADR_TEMPLATE.md
- Example ADR: /.repo/docs/adr/0001-example.md
- Documentation Standards: /.repo/docs/standards/documentation.md
- Principles P22: Dependencies require ADR
