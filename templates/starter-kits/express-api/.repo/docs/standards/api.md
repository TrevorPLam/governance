# API Documentation Standards
<!-- GOVERNANCE_VERSION: 1.0.0 -->
<!-- GOVERNANCE: UPDATEABLE - Layer 2 -->

API documentation must be clear, complete, and accurate. These standards ensure APIs are usable and maintainable.

## Core Requirements

All public APIs must document:
1. **Purpose:** What does it do?
2. **Input:** What parameters/data does it accept?
3. **Output:** What does it return?
4. **Errors:** What errors can occur?
5. **Examples:** How to use it?
6. **Edge Cases:** What are the gotchas?

## API Types

### REST APIs

#### Endpoint Documentation

**Required:**
```markdown
## POST /api/auth/login

Authenticate user with username and password.

**Request:**
```json
{
  "username": "string (required) - Email or username",
  "password": "string (required) - User password"
}
```

**Response:** 200 OK
```json
{
  "jwt": "string - JWT token valid for 1 hour",
  "refreshToken": "string - Refresh token valid for 30 days",
  "expiresAt": "string - ISO-8601 timestamp"
}
```

**Errors:**
- 401 Unauthorized: Invalid credentials
- 429 Too Many Requests: Rate limit exceeded (max 5/minute)
- 500 Internal Server Error: Server error

**Example:**
```bash
curl -X POST https://api.example.com/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"user@example.com","password":"secret"}'
```

**Notes:**
- Tokens stored in httpOnly cookies for web clients
- Rate limited to prevent brute force
- See ADR-0015 for authentication design
```

#### OpenAPI/Swagger

Use OpenAPI spec for REST APIs:
```yaml
/auth/login:
  post:
    summary: Authenticate user
    description: Returns JWT token for authenticated user
    requestBody:
      required: true
      content:
        application/json:
          schema:
            type: object
            required: [username, password]
            properties:
              username:
                type: string
                description: Email or username
              password:
                type: string
                format: password
    responses:
      '200':
        description: Successful authentication
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/AuthToken'
      '401':
        description: Invalid credentials
      '429':
        description: Rate limit exceeded
```

### Function/Method APIs

#### JSDoc/TSDoc Format

```typescript
/**
 * Authenticate user with username and password.
 *
 * Validates credentials against database and returns JWT token
 * if successful. Token is valid for 1 hour and must be refreshed
 * before expiry.
 *
 * @param username - User's email or username
 * @param password - User's password (will be hashed before validation)
 * @returns Promise resolving to auth token with JWT and refresh token
 * @throws {AuthenticationError} When credentials are invalid
 * @throws {RateLimitError} When too many attempts (>5/minute)
 * @throws {DatabaseError} When database is unavailable
 *
 * @example
 * ```typescript
 * const token = await authenticate('user@example.com', 'password123');
 * console.log(token.jwt); // "eyJhbGc..."
 * ```
 *
 * @example Error handling
 * ```typescript
 * try {
 *   const token = await authenticate(username, password);
 * } catch (error) {
 *   if (error instanceof AuthenticationError) {
 *     console.log('Invalid credentials');
 *   }
 * }
 * ```
 *
 * @see src/domain/auth/services/token.service.ts for token generation
 * @see ADR-0015 for authentication design decisions
 * @since 1.2.0
 */
export async function authenticate(
  username: string,
  password: string
): Promise<AuthToken> {
  // Implementation...
}
```

### GraphQL APIs

#### Schema Documentation

```graphql
"""
User authentication type containing JWT and refresh tokens.
Tokens expire after 1 hour and must be refreshed.
"""
type AuthToken {
  """JWT token for API authentication"""
  jwt: String!
  
  """Refresh token to get new JWT before expiry"""
  refreshToken: String!
  
  """ISO-8601 timestamp when token expires"""
  expiresAt: String!
}

"""
Authenticate user with credentials.
Returns AuthToken if successful.

Example:
mutation {
  login(username: "user@example.com", password: "secret") {
    jwt
    expiresAt
  }
}
"""
type Mutation {
  login(
    """User's email or username"""
    username: String!
    
    """User's password"""
    password: String!
  ): AuthToken!
}
```

## API Documentation Requirements

### Input Documentation

For each parameter, document:
- **Name:** Parameter name
- **Type:** Data type
- **Required:** Is it required or optional?
- **Default:** Default value if optional
- **Constraints:** Valid values, ranges, formats
- **Description:** What it represents

**Example:**
```typescript
/**
 * @param options - Configuration options
 * @param options.timeout - Request timeout in milliseconds (default: 5000, range: 1000-30000)
 * @param options.retries - Number of retries on failure (default: 3, range: 0-10)
 * @param options.headers - Custom HTTP headers (optional)
 */
```

### Output Documentation

For return values, document:
- **Type:** Return type
- **Structure:** Shape of returned data
- **Meaning:** What each field means
- **Null handling:** When can it be null?
- **Side effects:** Any side effects

**Example:**
```typescript
/**
 * @returns {Promise<User | null>} User object if found, null if not found
 * @returns {User.id} - Unique user identifier (UUID v4)
 * @returns {User.email} - User's email address (validated)
 * @returns {User.role} - User role (admin | user | guest)
 * @returns {User.createdAt} - Account creation timestamp (ISO-8601)
 */
```

### Error Documentation

For each error, document:
- **Type:** Error class/code
- **Condition:** When it occurs
- **Message:** Error message format
- **Recovery:** How to handle/recover

**Example:**
```typescript
/**
 * @throws {ValidationError} When input fails validation
 *   - message: "Invalid email format"
 *   - field: Name of invalid field
 *   - recovery: Fix input and retry
 *
 * @throws {NotFoundError} When user doesn't exist
 *   - message: "User not found"
 *   - userId: The requested user ID
 *   - recovery: Check user ID is correct
 *
 * @throws {DatabaseError} When database is unavailable
 *   - message: "Database connection failed"
 *   - recovery: Retry after delay, escalate if persists
 */
```

### Examples Documentation

Provide examples for:
- **Happy path:** Normal successful usage
- **Edge cases:** Unusual but valid usage
- **Error cases:** How to handle errors
- **Complex usage:** Advanced scenarios

All examples must:
- ✅ Be tested and work
- ✅ Be complete (not pseudocode)
- ✅ Include imports
- ✅ Show actual output
- ✅ Be updated with code

## API Contract Changes

### Change Types

**Non-Breaking Changes:** (Safe)
- Adding new optional parameters
- Adding new fields to response
- Adding new endpoints
- Adding new error codes (if handled generically)

**Breaking Changes:** (Require ADR + migration)
- Removing parameters
- Changing parameter types
- Removing response fields
- Changing response structure
- Removing endpoints
- Changing behavior

### Change Process

For breaking changes:
1. **Create ADR** documenting:
   - Why change is needed
   - What will break
   - Migration path
   - Timeline
2. **Version API:**
   - Increment major version
   - Or create new endpoint (/v2/)
3. **Deprecation Period:**
   - Mark old API deprecated
   - Document migration
   - Provide warnings
4. **Migration Support:**
   - Provide migration tools
   - Update all internal usage
   - Help external users migrate
5. **Remove Old API:**
   - After deprecation period
   - With final warning

**Example:**
```markdown
## DEPRECATED: POST /api/auth/login

⚠️ This endpoint is deprecated as of v2.0 and will be removed in v3.0.

**Migration:** Use POST /api/v2/auth/login instead.

**Changes:**
- Response field `token` renamed to `jwt`
- Response includes `refreshToken`
- Rate limiting now applied

**Migration Guide:** See docs/migration/v2-auth.md
```

## API Versioning

### Versioning Strategy

Choose one:
1. **URL Versioning:** `/api/v1/`, `/api/v2/`
2. **Header Versioning:** `Accept: application/vnd.api+json;version=2`
3. **Parameter Versioning:** `/api/users?version=2`

Document in ADR and be consistent.

### Version Support

**Policy:**
- Support current + previous major version
- Deprecate old versions with 6-month notice
- Document version compatibility
- Test version compatibility

**Example:**
```markdown
## API Versions

- **v2 (current):** Full support
- **v1 (deprecated):** Supported until 2026-07-01
- **v0 (removed):** No longer available

Migration guides:
- v0 → v1: docs/migration/v0-to-v1.md
- v1 → v2: docs/migration/v1-to-v2.md
```

## API Testing

### Test Documentation

Document how to test:
```markdown
## Testing

### Unit Tests
```bash
npm test src/api/auth.test.ts
```

### Integration Tests
```bash
npm run test:integration auth
```

### Manual Testing
```bash
# Get token
TOKEN=$(curl -X POST http://localhost:3000/api/auth/login \
  -d '{"username":"test","password":"test"}' | jq -r '.jwt')

# Use token
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:3000/api/users/me
```

### Automated API Tests
See `tests/api/` for complete API test suite.
```

## API Reference Structure

### Complete API Reference

Organize by:
```
docs/api/
├── README.md              (Overview)
├── authentication.md      (Auth endpoints)
├── users.md              (User endpoints)
├── orders.md             (Order endpoints)
├── errors.md             (Error codes)
├── rate-limiting.md      (Rate limits)
└── changelog.md          (API changes)
```

### README.md

```markdown
# API Reference

## Base URL
`https://api.example.com`

## Authentication
All endpoints require JWT token in Authorization header.
See [Authentication](authentication.md) for details.

## Rate Limiting
- 1000 requests/hour per token
- See [Rate Limiting](rate-limiting.md) for details

## Endpoints
- [Authentication](authentication.md)
- [Users](users.md)
- [Orders](orders.md)

## Errors
See [Error Codes](errors.md)

## Versioning
Current version: v2
See [Changelog](changelog.md) for changes
```

## References

- Documentation Standards: /.repo/docs/standards/documentation.md
- ADR Standards: /.repo/docs/standards/adr.md
- Examples Are Contracts (P8): /.repo/policy/PRINCIPLES.md
