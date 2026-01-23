# Code Style Standards
<!-- GOVERNANCE_VERSION: 1.0.0 -->
<!-- GOVERNANCE: UPDATEABLE - Layer 2 -->

Code style standards ensure consistency and clarity across the codebase. These standards prioritize readability and maintainability.

## Core Principles

### 1. Clarity Over Cleverness (P6)
**Rule:** Write code that is obvious, not clever.

**Why:** Code is read 10x more than written. Optimize for readers.

**Examples:**
```typescript
// ❌ BAD: Clever but unclear
const r = d.filter(x => x.a && x.b > 5).map(x => x.c);

// ✅ GOOD: Clear and obvious
const activeUsers = users
  .filter(user => user.isActive && user.loginCount > 5)
  .map(user => user.email);
```

### 2. Consistency Beats Novelty (P15)
**Rule:** Follow existing patterns. Don't introduce new patterns without reason.

**Why:** Consistency reduces cognitive load. Developers know what to expect.

**Examples:**
```typescript
// ❌ BAD: Introducing new pattern
// Codebase uses async/await, you use .then()
fetchUser(id).then(user => processUser(user));

// ✅ GOOD: Follow existing pattern
// Codebase uses async/await, you use async/await
const user = await fetchUser(id);
await processUser(user);
```

### 3. Functions Do One Thing
**Rule:** Each function should have a single, clear purpose.

**Why:** Small, focused functions are easier to test, understand, and maintain.

**Examples:**
```typescript
// ❌ BAD: Function does multiple things
function processOrder(order) {
  validateOrder(order);
  chargePayment(order.payment);
  reserveInventory(order.items);
  sendConfirmation(order.email);
  updateAnalytics(order);
}

// ✅ GOOD: Functions do one thing
function processOrder(order) {
  const validOrder = validateOrder(order);
  const payment = await processPayment(validOrder);
  const inventory = await reserveInventory(validOrder);
  return completeOrder(validOrder, payment, inventory);
}
```

## Naming

### Variables

**Rules:**
- Use descriptive names
- Use camelCase for variables
- Boolean variables start with is/has/can
- Avoid abbreviations (except common ones)

**Examples:**
```typescript
// ❌ BAD
const usr = {...};
const a = 5;
const temp = getData();
const flag = true;

// ✅ GOOD
const currentUser = {...};
const maxRetries = 5;
const activeUsers = await getActiveUsers();
const isAuthenticated = true;
```

### Functions

**Rules:**
- Use verbs for action functions
- Use get/set for accessors
- Use is/has/can for predicates
- Be specific and descriptive

**Examples:**
```typescript
// ❌ BAD
function data() { }
function go() { }
function check() { }
function thing() { }

// ✅ GOOD
function getUserData() { }
function processPayment() { }
function isAuthenticated() { }
function validateEmail() { }
```

### Classes

**Rules:**
- Use PascalCase
- Use nouns for classes
- Be specific about purpose
- Avoid generic names

**Examples:**
```typescript
// ❌ BAD
class Manager { }
class Helper { }
class Utils { }
class Data { }

// ✅ GOOD
class UserAuthenticator { }
class PaymentProcessor { }
class EmailValidator { }
class OrderRepository { }
```

### Constants

**Rules:**
- Use UPPER_SNAKE_CASE for true constants
- Use camelCase for config objects
- Be descriptive

**Examples:**
```typescript
// ❌ BAD
const TIMEOUT = 5000;
const max = 100;

// ✅ GOOD
const DEFAULT_REQUEST_TIMEOUT_MS = 5000;
const MAX_RETRY_ATTEMPTS = 100;

// ✅ GOOD for config
const authConfig = {
  tokenExpiry: '1h',
  refreshExpiry: '30d'
};
```

### Files

**Rules:**
- Use kebab-case for files
- Match filename to main export
- Use .service, .controller, .repository suffixes
- Be specific

**Examples:**
```bash
# ❌ BAD
UserStuff.ts
utilities.ts
helper.ts

# ✅ GOOD
user-authenticator.service.ts
payment-processor.service.ts
order.repository.ts
email-validator.ts
```

## Comments

### When to Comment

**Comment WHY, not WHAT:**
```typescript
// ❌ BAD: Explaining WHAT (code already shows this)
// Loop through users
for (const user of users) {
  // Add user to list
  list.push(user);
}

// ✅ GOOD: Explaining WHY
// Check all users because permissions can be granted at user level,
// not just group level. See ADR-042 for permission model.
for (const user of users) {
  if (hasPermission(user, resource)) {
    grantAccess(user);
  }
}
```

**Comment for:**
- Complex algorithms
- Non-obvious decisions
- Workarounds and hacks
- Security considerations
- Performance optimizations
- Links to ADRs or external docs

**Don't comment for:**
- Obvious code
- What code does (visible in code)
- Change history (use git)
- Commented-out code (delete it)

### Comment Style

```typescript
// Single-line comments for brief notes
// Use proper grammar and punctuation.

/**
 * Multi-line comments for longer explanations.
 * 
 * Break into paragraphs for readability. Link to
 * relevant docs or ADRs for more context.
 * 
 * @see src/domain/auth/security.ts
 * @see ADR-0015 for authentication design
 */

// TODO: Add error handling for edge case (issue #123)
// FIXME: Memory leak when processing large files (issue #456)
// HACK: Workaround for library bug, remove when v2.0 released
// NOTE: This must run before database migration
```

## Code Structure

### File Organization

```typescript
// 1. Imports (grouped)
import { external } from 'external-library';  // External
import { internal } from '@/internal';        // Internal
import { local } from './local';              // Local

// 2. Types/Interfaces
interface User {
  id: string;
  email: string;
}

// 3. Constants
const MAX_RETRIES = 3;

// 4. Main code
export class UserService {
  // Class implementation
}

// 5. Helper functions (private/internal)
function validateEmail(email: string): boolean {
  // Implementation
}
```

### Function Structure

```typescript
function processPayment(order: Order): Promise<Payment> {
  // 1. Validate input
  if (!order.payment) {
    throw new ValidationError('Payment required');
  }
  
  // 2. Early returns for edge cases
  if (order.total === 0) {
    return Promise.resolve(createFreePayment());
  }
  
  // 3. Main logic
  const paymentResult = await chargeCard(order.payment);
  
  // 4. Handle result
  if (paymentResult.success) {
    return createPayment(paymentResult);
  } else {
    throw new PaymentError(paymentResult.error);
  }
}
```

### Class Structure

```typescript
export class UserAuthenticator {
  // 1. Private fields
  private readonly userRepository: UserRepository;
  private readonly tokenService: TokenService;
  
  // 2. Constructor
  constructor(userRepository: UserRepository, tokenService: TokenService) {
    this.userRepository = userRepository;
    this.tokenService = tokenService;
  }
  
  // 3. Public methods (alphabetical or by importance)
  async authenticate(username: string, password: string): Promise<AuthToken> {
    // Implementation
  }
  
  async logout(token: string): Promise<void> {
    // Implementation
  }
  
  // 4. Private methods (alphabetical or by usage)
  private async validateCredentials(user: User, password: string): Promise<boolean> {
    // Implementation
  }
  
  private createToken(user: User): string {
    // Implementation
  }
}
```

## Code Quality

### Avoid Duplication

**Rule:** Don't repeat yourself (DRY)

```typescript
// ❌ BAD: Duplicated logic
function processUserOrder(user, order) {
  if (!user.email || user.email.length === 0) throw new Error('Invalid email');
  // Process order...
}

function processAdminOrder(admin, order) {
  if (!admin.email || admin.email.length === 0) throw new Error('Invalid email');
  // Process order...
}

// ✅ GOOD: Extracted common logic
function validateEmail(email: string): void {
  if (!email || email.length === 0) {
    throw new ValidationError('Invalid email');
  }
}

function processUserOrder(user, order) {
  validateEmail(user.email);
  // Process order...
}

function processAdminOrder(admin, order) {
  validateEmail(admin.email);
  // Process order...
}
```

### Avoid Magic Numbers

```typescript
// ❌ BAD: Magic numbers
if (user.loginAttempts > 5) {
  lockAccount(user);
}

setTimeout(retryRequest, 30000);

// ✅ GOOD: Named constants
const MAX_LOGIN_ATTEMPTS = 5;
const RETRY_DELAY_MS = 30000;

if (user.loginAttempts > MAX_LOGIN_ATTEMPTS) {
  lockAccount(user);
}

setTimeout(retryRequest, RETRY_DELAY_MS);
```

### Keep Functions Short

**Guideline:** Functions should be <50 lines. If longer, consider breaking into smaller functions.

```typescript
// ❌ BAD: Long function doing many things
function processOrder(order) {
  // 100 lines of validation, payment, inventory, email, etc.
}

// ✅ GOOD: Small focused functions
function processOrder(order: Order): Promise<ProcessedOrder> {
  const validOrder = validateOrder(order);
  const payment = await processPayment(validOrder);
  const inventory = await reserveInventory(validOrder);
  await sendConfirmation(validOrder);
  return createProcessedOrder(validOrder, payment, inventory);
}
```

### Error Handling

```typescript
// ❌ BAD: Swallowing errors
try {
  await riskyOperation();
} catch (error) {
  // Silent failure
}

// ❌ BAD: Generic error handling
try {
  await operation();
} catch (error) {
  console.log('Error');
}

// ✅ GOOD: Specific error handling
try {
  await processPayment(order);
} catch (error) {
  if (error instanceof PaymentError) {
    logger.error('Payment failed', { orderId: order.id, error });
    throw new OrderProcessingError('Payment failed', { cause: error });
  } else if (error instanceof NetworkError) {
    logger.warn('Network error, will retry', { error });
    await retryPayment(order);
  } else {
    throw error;  // Unknown error, propagate
  }
}
```

## Formatting

### Indentation
- Use 2 spaces (not tabs)
- Consistent across codebase

### Line Length
- Maximum 100-120 characters
- Break long lines logically

### Braces
```typescript
// ✅ GOOD: Always use braces
if (condition) {
  doSomething();
}

// ❌ BAD: No braces for single line
if (condition) doSomething();
```

### Spacing
```typescript
// ✅ GOOD: Consistent spacing
function add(a: number, b: number): number {
  return a + b;
}

const result = add(1, 2);

// ❌ BAD: Inconsistent spacing
function add(a:number,b:number):number{return a+b;}
```

## Linting & Formatting

### Use Tools
- **ESLint:** Enforce code quality rules
- **Prettier:** Enforce formatting
- **TypeScript:** Enforce type safety

### Configure Consistently
```json
// .eslintrc.json
{
  "extends": ["eslint:recommended"],
  "rules": {
    "no-console": "warn",
    "prefer-const": "error",
    "no-var": "error"
  }
}
```

### Pre-commit Hooks
```bash
# Run linting and formatting before commit
npm run lint
npm run format
```

## Language-Specific Guidelines

### TypeScript
- Use explicit types
- Avoid `any`
- Use interfaces for objects
- Use enums for constants

### JavaScript
- Use `const` by default
- Use `let` when reassignment needed
- Never use `var`
- Use template literals

### Python
- Follow PEP 8
- Use type hints
- Use docstrings
- 4-space indentation

### Go
- Follow gofmt
- Use meaningful package names
- Error handling explicit
- Use interfaces

## References

- Principle P6: Behavior over novelty
- Principle P15: Consistency beats novelty
- Documentation Standards: /.repo/docs/standards/documentation.md
- ADR Standards: /.repo/docs/standards/adr.md
