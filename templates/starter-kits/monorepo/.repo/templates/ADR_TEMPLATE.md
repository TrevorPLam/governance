# Architecture Decision Record Template
<!-- GOVERNANCE_VERSION: 1.0.0 -->
<!-- GOVERNANCE: UPDATEABLE - Layer 3 -->

This template defines the structure for Architecture Decision Records (ADRs). ADRs document significant architectural decisions and their context.

## ADR Structure

```markdown
# ADR-XXXX: [Title of Decision]

**Status:** [Proposed | Accepted | Deprecated | Superseded]  
**Date:** YYYY-MM-DD  
**Decision Makers:** [List of people involved]  
**Technical Story:** [Link to task/issue if applicable]

## Context

### Problem Statement
[Describe the problem or opportunity that requires a decision]

### Background
[Provide relevant background information, constraints, and requirements]

### Current State
[Describe the current situation if modifying existing architecture]

### Forces
[List the key factors, concerns, and constraints that influence the decision]
- Force 1: [Description]
- Force 2: [Description]
- Force 3: [Description]

## Decision Drivers

What drives this decision:
1. [Driver 1]
2. [Driver 2]
3. [Driver 3]

## Options Considered

### Option 1: [Name]
**Description:** [Detailed description of option]

**Pros:**
- ✅ Pro 1
- ✅ Pro 2
- ✅ Pro 3

**Cons:**
- ❌ Con 1
- ❌ Con 2
- ❌ Con 3

**Cost:** [Time, complexity, resources]  
**Risk:** [Low | Medium | High]

### Option 2: [Name]
[Same structure as Option 1]

### Option 3: [Name]
[Same structure as Option 1]

## Decision

**Chosen Option:** Option [X] - [Name]

**Rationale:** [Explain why this option was chosen over others]

### Decision Statement
[Clear, concise statement of the decision made]

### Justification
[Detailed explanation of why this decision is best given the context]

## Consequences

### Positive Consequences
- ✅ Consequence 1
- ✅ Consequence 2
- ✅ Consequence 3

### Negative Consequences
- ❌ Consequence 1
- ❌ Consequence 2
- ❌ Consequence 3

### Neutral Consequences
- ℹ️ Consequence 1
- ℹ️ Consequence 2

### Trade-offs Accepted
[List trade-offs explicitly accepted as part of decision]

## Implementation

### Affected Components
[List modules, layers, or components affected]

### Implementation Steps
1. Step 1
2. Step 2
3. Step 3

### Migration Path
[If applicable, describe how to migrate from old to new]

### Rollback Plan
[How to rollback if decision proves wrong]

## Technical Details

### Dependencies
**New Dependencies:**
- Dependency 1 (version X.Y.Z) - [Why needed]
- Dependency 2 (version X.Y.Z) - [Why needed]

**Removed Dependencies:**
- Dependency 3 - [Why removed]

### API Changes
[Describe any API contract changes]

### Schema Changes
[Describe any database or config schema changes]

### Configuration
[Any new configuration required]

### Boundary Impact
[How does this affect boundaries between layers/modules]

**Layers Affected:** [ui | domain | data | platform]  
**Cross-Boundary Imports:** [List any, with justification]  
**Boundary Rules Updated:** [Yes/No - describe if yes]

## Verification

### Success Criteria
How we'll know the decision was correct:
1. Criterion 1
2. Criterion 2
3. Criterion 3

### Testing Strategy
[How to test the implementation]

### Monitoring
[What to monitor after implementation]

### Review Schedule
[When to review this decision]
- 1 month after implementation
- 3 months after implementation
- 6 months after implementation

## Compliance

### Security Review
**Required:** [Yes | No]  
**Completed:** [Yes | No | N/A]  
**HITL ID:** [Reference if applicable]

### Quality Gates
[Which quality gates apply and status]

### Principles Alignment
[Which principles from PRINCIPLES.md this aligns with or conflicts with]

## Related Decisions

### Supersedes
- [ADR-XXX] - [Brief description]

### Superseded By
- [Will be updated if this ADR is superseded]

### Related To
- [ADR-XXX] - [How related]
- [ADR-XXX] - [How related]

### Depends On
- [ADR-XXX] - [What dependency]

## References

### Documentation
- [Link to relevant documentation]
- [Link to external resources]

### Discussions
- [Link to design discussion]
- [Link to team decision meeting notes]

### Prior Art
- [Link to similar implementations]
- [Link to industry best practices]

## Notes

[Any additional notes, caveats, or context]

---

**Last Updated:** YYYY-MM-DD  
**Author:** [Name]  
**Reviewers:** [Names]
```

## When to Create an ADR

Create an ADR when making decisions about:

### Required ADRs
- ✅ **Dependencies:** Adding, removing, or upgrading major dependencies
- ✅ **API Contracts:** Changing public APIs or contracts
- ✅ **Schemas:** Modifying database schemas or configuration schemas
- ✅ **Security:** Any security-related architectural changes
- ✅ **Boundaries:** Changes to architectural boundaries or layers
- ✅ **Architecture:** Significant architectural patterns or approaches

### Optional but Recommended ADRs
- Technology choices
- Build/deployment strategies
- Testing strategies
- Performance optimizations
- Refactoring approaches

### Not Required
- Bug fixes (unless they change architecture)
- UI styling changes
- Documentation updates
- Minor configuration changes

## Example ADR

```markdown
# ADR-0015: Use JWT for API Authentication

**Status:** Accepted  
**Date:** 2026-01-15  
**Decision Makers:** Tech Lead, Security Team, Backend Team  
**Technical Story:** FEAT-123

## Context

### Problem Statement
The REST API currently has no authentication. We need a secure authentication mechanism before public launch.

### Background
- API serves mobile and web clients
- Microservices architecture
- Need horizontal scalability
- Multiple services need to validate tokens

### Current State
No authentication exists. All endpoints are public.

### Forces
- Need stateless authentication for scalability
- Mobile apps need long-lived sessions
- Web apps need security
- Multiple services need to validate tokens
- Low latency required (<10ms validation)

## Decision Drivers

1. Scalability - Must work with horizontal scaling
2. Security - Industry standard security
3. Developer Experience - Easy for clients to use
4. Performance - Fast token validation

## Options Considered

### Option 1: Session-Based Authentication
**Description:** Traditional server-side sessions with session store

**Pros:**
- ✅ Well-understood pattern
- ✅ Easy to revoke sessions
- ✅ Simple to implement

**Cons:**
- ❌ Requires session store (Redis/database)
- ❌ Not stateless - hurts scalability
- ❌ Session store becomes bottleneck
- ❌ Complexity in distributed system

**Cost:** Medium (session store infrastructure)  
**Risk:** Medium (session store availability)

### Option 2: JWT Tokens
**Description:** JSON Web Tokens for stateless authentication

**Pros:**
- ✅ Stateless - no session store needed
- ✅ Scales horizontally easily
- ✅ Industry standard
- ✅ Self-contained (includes claims)
- ✅ Fast validation (just verify signature)

**Cons:**
- ❌ Can't easily revoke tokens
- ❌ Token size larger than session ID
- ❌ Need refresh token mechanism

**Cost:** Low (just signing library)  
**Risk:** Low (mature libraries available)

### Option 3: OAuth 2.0
**Description:** Full OAuth 2.0 flow with external provider

**Pros:**
- ✅ Industry standard
- ✅ Delegates authentication
- ✅ Social login possible

**Cons:**
- ❌ Overkill for our needs
- ❌ Adds external dependency
- ❌ More complex
- ❌ Vendor lock-in potential

**Cost:** High (integration complexity)  
**Risk:** Medium (external dependency)

## Decision

**Chosen Option:** Option 2 - JWT Tokens

**Rationale:** JWT provides the statelessness we need for horizontal scaling while maintaining security. The inability to revoke tokens is mitigated by short expiry (1 hour) with refresh tokens.

### Decision Statement
Use JWT (JSON Web Tokens) for API authentication with 1-hour access tokens and 30-day refresh tokens.

### Justification
- Stateless design allows horizontal scaling without session store
- Short token expiry (1 hour) mitigates token theft risk
- Refresh token rotation provides additional security
- Industry standard with mature libraries available
- Fast validation (no database lookup)

## Consequences

### Positive Consequences
- ✅ Horizontal scaling without session store
- ✅ Fast authentication (<10ms)
- ✅ No single point of failure
- ✅ Stateless architecture
- ✅ Lower infrastructure costs

### Negative Consequences
- ❌ Can't immediately revoke tokens (must wait for expiry)
- ❌ Larger token size than session ID
- ❌ Need refresh token mechanism

### Neutral Consequences
- ℹ️ Need to store refresh tokens (same as sessions)
- ℹ️ Token validation logic in each service

### Trade-offs Accepted
- Accept inability to immediately revoke tokens in exchange for stateless scalability
- Accept larger payload size in exchange for self-contained tokens

## Implementation

### Affected Components
- domain/auth/middleware (JWT validation)
- domain/auth/services (Token generation)
- domain/auth/controllers (Login, refresh endpoints)

### Implementation Steps
1. Install jsonwebtoken library
2. Create token service (generate, validate, refresh)
3. Create authentication middleware
4. Add login endpoint
5. Add refresh endpoint
6. Protect existing endpoints with middleware

### Migration Path
N/A - New feature

### Rollback Plan
Remove middleware from routes, revert to no authentication temporarily

## Technical Details

### Dependencies
**New Dependencies:**
- jsonwebtoken (9.0.0) - Industry standard JWT library
- bcryptjs (2.4.3) - Password hashing

### API Changes
**New Endpoints:**
- POST /auth/login - Get access token
- POST /auth/refresh - Refresh access token
- POST /auth/logout - Clear refresh token

**Protected Endpoints:**
- All existing endpoints now require Authorization header

### Configuration
```yaml
JWT_SECRET: <secret key>
JWT_EXPIRY: 1h
REFRESH_TOKEN_EXPIRY: 30d
```

### Boundary Impact
**Layers Affected:** domain  
**Cross-Boundary Imports:** None  
**Boundary Rules Updated:** No

## Verification

### Success Criteria
1. Tokens generated successfully
2. Tokens validate correctly
3. Expired tokens rejected
4. Invalid tokens rejected
5. Protected endpoints require auth
6. Refresh flow works

### Testing Strategy
- Unit tests for token service
- Integration tests for auth flow
- Security tests for validation
- Load tests for performance

### Monitoring
- Token generation rate
- Token validation failures
- Token expiry rate
- Refresh token usage

### Review Schedule
- 1 month: Check token theft incidents
- 3 months: Review token expiry strategy
- 6 months: Consider token revocation if needed

## Compliance

### Security Review
**Required:** Yes  
**Completed:** Yes  
**HITL ID:** HITL-047

### Quality Gates
- All tests pass
- Security scan clean
- Coverage >80%

### Principles Alignment
- P10: Tests required ✅
- P17: Security requires HITL ✅
- P22: Dependencies require ADR ✅

## Related Decisions

### Supersedes
- None (new feature)

### Related To
- ADR-0003: API Design Principles
- ADR-0012: Security Baseline

## References

### Documentation
- JWT RFC 7519: https://tools.ietf.org/html/rfc7519
- jsonwebtoken library: https://github.com/auth0/node-jsonwebtoken

### Discussions
- Security team review: 2026-01-10
- Team decision meeting: 2026-01-12

### Prior Art
- Auth0 JWT implementation
- Industry standard practices

## Notes

Token secret must be rotated quarterly. Consider adding token revocation list if abuse detected.

---

**Last Updated:** 2026-01-15  
**Author:** Tech Lead  
**Reviewers:** Security Team, Backend Team
```

## ADR Numbering

- Use sequential numbering: 0001, 0002, 0003...
- Never reuse numbers
- Store in /.repo/docs/adr/
- Filename format: XXXX-title-with-dashes.md

## ADR Status Transitions

- **Proposed** → **Accepted**: Decision approved
- **Accepted** → **Deprecated**: Decision no longer relevant
- **Accepted** → **Superseded**: Replaced by newer decision
- **Proposed** → **Rejected**: Decision not approved (rare, usually just don't create ADR)

## References

- ADR Standard: /.repo/docs/standards/adr.md
- Policy Principles: /.repo/policy/PRINCIPLES.md
- Agent Rules: /.repo/agents/AGENTS.md
