# Documentation Standards
<!-- GOVERNANCE_VERSION: 1.0.0 -->
<!-- GOVERNANCE: UPDATEABLE - Layer 2 -->

Documentation must be clear, accurate, and up-to-date. These standards ensure documentation serves its purpose: helping humans and agents understand the codebase.

## Core Principles

### 1. Docs Age With Code (P11)
**Rule:** Documentation updates when code updates.

**Why:** Outdated docs are worse than no docs. They mislead and cause bugs.

**How:**
- Update docs in the same PR as code changes
- Review docs during code review
- Treat outdated docs as bugs

**Examples:**
```markdown
❌ BAD: Update code, forget to update docs
❌ BAD: Create separate "docs update" PR later
✅ GOOD: Update docs in same PR as code change
✅ GOOD: Reviewer checks docs are current
```

### 2. Filepaths Required (P4)
**Rule:** All code references must include full filepaths.

**Why:** Makes documentation unambiguous and easy to verify.

**How:**
- Use full paths from repository root
- Include file extensions
- Use actual paths, not placeholders

**Examples:**
```markdown
❌ BAD: "See the config file"
❌ BAD: "Check src/utils"
❌ BAD: "Look in the auth module"
✅ GOOD: "See src/config/app.config.ts"
✅ GOOD: "Check src/domain/auth/services/auth.service.ts"
✅ GOOD: "Look in tests/integration/auth.test.ts"
```

### 3. Examples Are Contracts (P8)
**Rule:** All code examples must be tested and work.

**Why:** Broken examples break trust. Users assume examples work.

**How:**
- Test examples as part of test suite
- Extract examples from actual working code
- Update examples when behavior changes

**Examples:**
```markdown
❌ BAD: Untested example code
❌ BAD: Example with syntax errors
❌ BAD: Example using deprecated API
✅ GOOD: Example extracted from passing test
✅ GOOD: Example automatically validated
✅ GOOD: Example matches current API
```

## Documentation Types

### Code Comments

**Purpose:** Explain WHY, not WHAT

**When to Use:**
- Complex algorithms
- Non-obvious decisions
- Workarounds
- Security considerations
- Performance optimizations

**When NOT to Use:**
- Obvious code (code is self-documenting)
- What the code does (visible in code)
- Change history (use git)

**Format:**
```typescript
// ❌ BAD: Obvious
// Loop through users
for (const user of users) { ... }

// ✅ GOOD: Explains why
// Check all users because permissions can be granted at user level,
// not just group level. See ADR-042 for security model.
for (const user of users) { ... }

// ✅ GOOD: Explains workaround
// WORKAROUND: Parse manually because JSON.parse fails on dates.
// Remove when library upgraded to v3.2+ (issue #123)
const data = manualDateParser(response);
```

### API Documentation

**Purpose:** Explain public APIs for consumers

**Required For:**
- Public functions
- Public classes
- Exported modules
- REST endpoints
- Library interfaces

**Format:**
```typescript
/**
 * Authenticate user with username and password.
 * 
 * Returns JWT token valid for 1 hour. Use refresh endpoint
 * to get new token before expiry.
 * 
 * @param username - User's email or username
 * @param password - User's password (will be hashed)
 * @returns JWT token and expiry timestamp
 * @throws AuthenticationError if credentials invalid
 * @throws RateLimitError if too many attempts
 * 
 * @example
 * ```typescript
 * const token = await authenticate('user@example.com', 'password123');
 * console.log(token.jwt); // "eyJhbGc..."
 * ```
 * 
 * @see src/domain/auth/services/token.service.ts
 * @see docs/api/authentication.md
 */
export async function authenticate(
  username: string,
  password: string
): Promise<AuthToken> {
  // Implementation...
}
```

### README Files

**Purpose:** Explain what, why, and how for a module or project

**Required In:**
- Repository root
- Each major module
- Each package (in monorepo)

**Sections:**
```markdown
# Module Name

## Purpose
What this module does and why it exists.

## Usage
How to use this module (with examples).

## Architecture
High-level structure (link to ADRs).

## Dependencies
What this module depends on.

## Testing
How to run tests for this module.

## References
- Link to detailed docs
- Link to ADRs
- Link to related modules
```

### Architecture Documentation

**Purpose:** Explain system structure and decisions

**Required For:**
- System architecture
- Major subsystems
- Data models
- API contracts

**Tools:**
- ADRs for decisions
- Diagrams for structure
- Examples for usage
- Runbooks for operations

**See:** [ADR Standards](adr.md)

## Documentation Locations

### Where to Put Docs

**Code-Level:**
- Inline comments: In source files
- API docs: In source files (JSDoc, etc.)
- Module README: In module root

**Project-Level:**
- README.md: Repository root
- docs/: Repository root
- ADRs: .repo/docs/adr/
- Architecture: docs/architecture/
- API: docs/api/
- User guides: docs/guides/

**Governance:**
- Policies: .repo/policy/
- Standards: .repo/docs/standards/
- Templates: .repo/templates/

### File Naming

```
✅ GOOD:
- README.md
- authentication.md
- api-overview.md
- 0042-jwt-authentication.md (ADR)

❌ BAD:
- readme.txt
- Auth Documentation.docx
- api_docs_final_v2.md
```

## Documentation Requirements

### When Documentation Is Required

**Always Required:**
- Public APIs
- Breaking changes
- Security changes
- Architecture changes
- New features (user-facing)

**Often Required:**
- Complex algorithms
- Non-obvious code
- Workarounds
- Performance optimizations
- Integration points

**Rarely Required:**
- Simple refactoring
- Bug fixes (unless tricky)
- Internal implementation details
- Test code (unless complex)

### Documentation Checklist

For each PR, verify:
- [ ] All public APIs documented
- [ ] Examples work and are tested
- [ ] Filepaths used in all references
- [ ] README updated if behavior changed
- [ ] ADR created if required (see [ADR Standards](adr.md))
- [ ] Comments explain WHY, not WHAT
- [ ] No broken links
- [ ] No outdated information

## Documentation Quality

### Good Documentation

**Characteristics:**
- ✅ Clear and concise
- ✅ Accurate and current
- ✅ Includes examples
- ✅ Uses filepaths
- ✅ Explains WHY
- ✅ Tested (examples work)

**Example:**
```markdown
# User Authentication

Authenticate users with JWT tokens. See ADR-015 for design decisions.

## Usage

```typescript
import { authenticate } from 'src/domain/auth/services/auth.service.ts';

// Authenticate with username and password
const token = await authenticate('user@example.com', 'password');

// Use token in requests
const response = await fetch('/api/users/me', {
  headers: { Authorization: `Bearer ${token.jwt}` }
});
```

## Token Expiry

Tokens expire after 1 hour. Use refresh endpoint to get new token:

```typescript
import { refreshToken } from 'src/domain/auth/services/token.service.ts';

const newToken = await refreshToken(oldToken.refreshToken);
```

## Security

- Tokens stored in httpOnly cookies (XSS protection)
- Refresh tokens rotated on use (theft protection)
- Rate limiting on login endpoint (brute force protection)

See src/domain/auth/security/ for implementation details.
```

### Bad Documentation

**Anti-patterns:**
- ❌ Vague or ambiguous
- ❌ Outdated or wrong
- ❌ No examples
- ❌ Broken examples
- ❌ No filepaths
- ❌ Explains WHAT not WHY
- ❌ Copy-pasted without updating

**Example:**
```markdown
# Authentication

Use the auth module for authentication.

## Usage

See the code for examples.

## Notes

Updated last year. Some stuff might have changed.
```

## Maintenance

### Keeping Docs Current

**Process:**
1. Update docs with code changes (same PR)
2. Review docs during code review
3. Test examples as part of test suite
4. Periodically audit documentation
5. Mark outdated docs as such or delete

**Red Flags:**
- Docs not updated in 6+ months
- Examples don't run
- References to deleted code
- Broken links
- Comments about "old version"

### Documentation Debt

**Prevention:**
- Update docs with code (always)
- Require docs in PR reviews
- Test examples automatically
- Make docs easy to find and update

**Remediation:**
- Identify outdated docs
- Update or delete
- Add missing docs
- Fix broken examples
- Improve findability

## Tools

### Recommended Tools

**Documentation:**
- Markdown for docs
- JSDoc/TSDoc for API docs
- Mermaid for diagrams
- Swagger/OpenAPI for REST APIs

**Validation:**
- Link checkers
- Example extractors
- Doc generators
- Spell checkers

**Organization:**
- Folder structure (docs/, .repo/docs/)
- Index files (DOCS_INDEX.md)
- Tags and labels
- Search functionality

## References

- Principle P11: Docs age with code
- Principle P4: Filepaths required
- Principle P8: Examples are contracts
- [ADR Standards](adr.md)
- [API Standards](api.md)
- [Style Standards](style.md)
