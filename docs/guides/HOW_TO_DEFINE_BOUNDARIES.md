# How To: Define Boundaries
## Step-by-Step Guide to Setting Up Module Boundaries

**Purpose:** Learn how to define, configure, and enforce architectural boundaries in your repository to maintain clean separation of concerns.

**Time Required:** 45-90 minutes  
**Skill Level:** Intermediate to Advanced

---

## Table of Contents

1. [Understanding Boundaries](#understanding-boundaries)
2. [Layer Architecture Setup](#layer-architecture-setup)
3. [Defining Layers](#defining-layers)
4. [Setting Import Rules](#setting-import-rules)
5. [Testing Boundaries](#testing-boundaries)
6. [Common Patterns](#common-patterns)
7. [Troubleshooting](#troubleshooting)

---

## Understanding Boundaries

### What Are Boundaries?

Boundaries define **allowed and forbidden dependencies** between different parts of your codebase. They prevent architectural decay by:

- **Enforcing layer separation** (UI → Domain → Data)
- **Preventing circular dependencies**
- **Maintaining feature isolation**
- **Protecting core abstractions**

### Why Boundaries Matter

```
WITHOUT BOUNDARIES          WITH BOUNDARIES
┌────────────────┐         ┌────────────────┐
│  Spaghetti     │         │  Clean Layers  │
│  Code Mess     │         │  ✓ UI Layer    │
│  Everything    │         │  ✓ Domain      │
│  Depends on    │         │  ✓ Data        │
│  Everything    │         │  ✓ Platform    │
└────────────────┘         └────────────────┘
```

**Benefits:**
- ✅ Easier to understand
- ✅ Easier to test
- ✅ Easier to refactor
- ✅ Prevents bugs from layer violations
- ✅ Enables parallel development

---

## Layer Architecture Setup

### Step 1: Choose Your Boundary Model

The governance framework supports multiple boundary models:

#### Model 1: Hybrid Domain-Feature-Layer (RECOMMENDED)
```
src/
├── <domain>/
│   └── <feature>/
│       ├── ui/
│       ├── domain/
│       └── data/
└── platform/          # shared utilities
```

**Best for:** Most applications, especially web apps and APIs

**Example:**
```
src/
├── sales/
│   ├── checkout/
│   │   ├── ui/          # React components
│   │   ├── domain/      # Business logic
│   │   └── data/        # API calls
│   └── cart/
│       ├── ui/
│       ├── domain/
│       └── data/
└── platform/
    ├── logging/
    └── http/
```

#### Model 2: Clean Architecture Layers
```
src/
├── presentation/      # UI layer
├── application/       # Use cases
├── domain/            # Business logic
└── infrastructure/    # External concerns
```

**Best for:** Domain-driven design (DDD) projects

#### Model 3: Feature-Based with Layers
```
src/
├── features/
│   ├── feature-a/
│   │   ├── components/
│   │   ├── services/
│   │   └── models/
│   └── feature-b/
└── shared/
```

**Best for:** Smaller apps, rapid prototypes

### Step 2: Configure in BOUNDARIES.md

Open `.repo/policy/BOUNDARIES.md` and set your model:

```markdown
## Model
hybrid_domain_feature_layer

## Directory pattern
src/<domain>/<feature>/<layer>/
Shared platform directory: src/platform/
```

**Replace** `hybrid_domain_feature_layer` with your chosen model:
- `hybrid_domain_feature_layer`
- `clean_architecture`
- `feature_based_layers`
- `custom` (requires additional documentation)

---

## Defining Layers

### Step 3: Define Layer Dependencies

Specify **allowed import direction** in plain English:

```markdown
## Default allowed import direction (Plain English)
- UI layer may depend on Domain layer
- Domain layer may depend on Data layer
- Data layer may depend on Platform (shared) layer
- Platform depends on nothing
```

**Machine-readable form:**
```
ui → domain → data → platform
```

### Step 4: Layer Responsibilities

Document what each layer **should** and **should not** contain:

#### UI Layer (`ui/`)
**Should contain:**
- React/Vue/Angular components
- UI state management
- Form validation
- Styling and CSS

**Should NOT contain:**
- API calls (use Domain layer)
- Business logic (use Domain layer)
- Database queries

#### Domain Layer (`domain/`)
**Should contain:**
- Business logic
- Use cases
- Domain models
- State machines
- Validation rules

**Should NOT contain:**
- UI code
- HTTP clients
- Database queries

#### Data Layer (`data/`)
**Should contain:**
- API clients
- Database queries
- External service integrations
- Data transformations

**Should NOT contain:**
- Business logic
- UI code

#### Platform Layer (`platform/`)
**Should contain:**
- Logging utilities
- HTTP client configuration
- Error handling
- Common utilities

**Should NOT contain:**
- Feature-specific code
- Business logic

---

## Setting Import Rules

### Step 5: Define Cross-Feature Rules

Specify how features can interact:

```markdown
## Cross-feature rule
Cross-feature imports require an ADR.
```

**Options:**
- `require_adr` - Requires Architecture Decision Record
- `forbidden` - Never allowed
- `allowed_with_justification` - Requires inline comment
- `allowed` - No restrictions

### Step 6: Configure Enforcement

Choose how boundaries are enforced:

```markdown
## Enforcement method
hybrid_static_checker_plus_manifest

Meaning: a static boundary checker runs AND the manifest 
contains explicit edges for allowed exceptions.
```

**Enforcement options:**
- `hybrid_static_checker_plus_manifest` - Automated + documented exceptions
- `static_checker_only` - Automated checks only
- `manual_review` - Code review only
- `none` - No enforcement (not recommended)

### Step 7: Define Exceptions

Sometimes you **need** to violate boundaries. Define how:

```markdown
## Exceptions
- Small exception: allowed only with explicit Task Packet justification + filepaths.
- Large exception: requires ADR.
All exceptions must be represented as explicit edges in /.repo/repo.manifest.yaml.
```

**Exception workflow:**
1. Identify the boundary violation
2. Document the reason (Task Packet or ADR)
3. Add explicit edge to manifest
4. Get approval via PR review
5. Create remediation task (if temporary)

### Step 8: Set Violation Severity

Define what happens when boundaries are violated:

```markdown
## Violation severity
waiver_plus_auto_task

Meaning: if boundaries are violated:
- PR is blocked unless fixed or waived
- if waived, an auto-task is created in TODOs with remediation plan
```

**Severity options:**
- `block_hard` - Cannot merge without fixing
- `waiver_plus_auto_task` - Can waive but creates TODO
- `warning_only` - Shows warning, doesn't block
- `info_only` - Informational only

---

## Testing Boundaries

### Step 9: Configure Boundary Checker

Add boundary checking to your manifest:

Open `.repo/repo.manifest.yaml`:

```yaml
commands:
  check:boundaries: "npm run check:boundaries"  # or your command

boundaries:
  enforcement: hybrid_checker_plus_manifest_edges
  edges_model: layered_allow_list
  edges: []
```

### Step 10: Add Boundary Check Script

Create a script to check boundaries:

**Option A: Using governance CLI**
```json
// package.json
{
  "scripts": {
    "check:boundaries": "governance-cli check-boundaries"
  }
}
```

**Option B: Custom script**
```json
// package.json
{
  "scripts": {
    "check:boundaries": "node scripts/check-boundaries.js"
  }
}
```

**Example boundary checker script:**
```javascript
// scripts/check-boundaries.js
const fs = require('fs');
const path = require('path');

const RULES = {
  'ui': ['domain'],
  'domain': ['data'],
  'data': ['platform'],
  'platform': []
};

function checkFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const layer = getLayer(filePath);
  const imports = extractImports(content);
  
  for (const imp of imports) {
    if (violatesRule(layer, imp)) {
      console.error(`❌ Boundary violation in ${filePath}`);
      console.error(`   ${layer} cannot import from ${getLayer(imp)}`);
      process.exit(1);
    }
  }
}

function getLayer(filePath) {
  if (filePath.includes('/ui/')) return 'ui';
  if (filePath.includes('/domain/')) return 'domain';
  if (filePath.includes('/data/')) return 'data';
  if (filePath.includes('/platform/')) return 'platform';
  return 'unknown';
}

function extractImports(content) {
  const regex = /import .* from ['"](.*)['"];?/g;
  const matches = [...content.matchAll(regex)];
  return matches.map(m => m[1]);
}

function violatesRule(fromLayer, importPath) {
  const toLayer = getLayer(importPath);
  if (toLayer === 'unknown') return false;
  
  const allowedLayers = RULES[fromLayer] || [];
  return !allowedLayers.includes(toLayer) && fromLayer !== toLayer;
}

// Run checker
const srcFiles = getFilesRecursive('./src');
srcFiles.filter(f => f.endsWith('.js') || f.endsWith('.ts'))
  .forEach(checkFile);

console.log('✅ All boundary checks passed');
```

### Step 11: Test the Boundary Checker

```bash
# Run boundary check
npm run check:boundaries

# Should output:
✅ All boundary checks passed
```

**Create a test violation:**
```typescript
// src/sales/checkout/ui/CheckoutButton.tsx
// ❌ BAD: UI importing from Data layer directly
import { fetchOrder } from '../../data/orderApi';

// ✅ GOOD: UI importing from Domain layer
import { getOrder } from '../../domain/orderService';
```

Run again:
```bash
npm run check:boundaries

# Should output:
❌ Boundary violation in src/sales/checkout/ui/CheckoutButton.tsx
   ui cannot import from data
```

---

## Common Patterns

### Pattern 1: Shared Utilities

**Question:** Where do shared utilities go?

**Answer:** In the `platform/` layer:

```
src/
└── platform/
    ├── logging/
    │   └── logger.ts
    ├── http/
    │   └── httpClient.ts
    └── validation/
        └── validators.ts
```

**Usage:**
```typescript
// ✅ Any layer can import from platform
import { logger } from '@/platform/logging/logger';
```

### Pattern 2: Cross-Feature Communication

**Question:** How do features communicate?

**Option A: Event Bus (Recommended)**
```typescript
// src/platform/events/eventBus.ts
export const eventBus = new EventEmitter();

// Feature A emits
eventBus.emit('order.placed', { orderId: '123' });

// Feature B listens
eventBus.on('order.placed', handleOrder);
```

**Option B: Shared Domain Models**
```typescript
// src/shared/models/Order.ts
export interface Order { /* ... */ }

// Both features import the shared model
import { Order } from '@/shared/models/Order';
```

**Option C: ADR-Approved Direct Import**
```yaml
# .repo/repo.manifest.yaml
boundaries:
  edges:
    - from: "src/sales/cart"
      to: "src/sales/checkout"
      reason: "Cart needs to trigger checkout flow"
      adr: "ADR-003-cart-checkout-integration"
```

### Pattern 3: Dependency Injection

**Question:** How do I inject dependencies across layers?

**Answer:** Use dependency injection at layer boundaries:

```typescript
// domain/orderService.ts
export class OrderService {
  constructor(
    private orderRepository: IOrderRepository  // Interface, not concrete
  ) {}
  
  async createOrder(data: OrderData) {
    // Business logic here
    return this.orderRepository.save(order);
  }
}

// data/orderRepository.ts
export class OrderRepository implements IOrderRepository {
  async save(order: Order) {
    // API call here
  }
}

// ui/CheckoutPage.tsx
const orderService = new OrderService(
  new OrderRepository()  // Inject at UI layer
);
```

### Pattern 4: Testing with Boundaries

**Question:** How do I test across layers?

**Answer:** Mock dependencies at layer boundaries:

```typescript
// domain/__tests__/orderService.test.ts
describe('OrderService', () => {
  it('creates order', async () => {
    const mockRepo = {
      save: jest.fn().mockResolvedValue({ id: '123' })
    };
    
    const service = new OrderService(mockRepo);
    const order = await service.createOrder(data);
    
    expect(mockRepo.save).toHaveBeenCalled();
    expect(order.id).toBe('123');
  });
});
```

### Pattern 5: Monorepo Boundaries

**Question:** How do boundaries work in monorepos?

**Answer:** Define boundaries per package:

```
packages/
├── frontend/
│   └── .repo/
│       └── policy/
│           └── BOUNDARIES.md  # UI-specific boundaries
├── backend/
│   └── .repo/
│       └── policy/
│           └── BOUNDARIES.md  # API-specific boundaries
└── shared/
    └── types/  # Shared across packages
```

---

## Troubleshooting

### Issue 1: Boundary Checker Not Running

**Symptom:** `check:boundaries` command not found

**Solutions:**

1. **Check manifest configuration:**
```yaml
# .repo/repo.manifest.yaml
commands:
  check:boundaries: "npm run check:boundaries"  # or your command
```

2. **Check package.json:**
```json
{
  "scripts": {
    "check:boundaries": "governance-cli check-boundaries"
  }
}
```

3. **Install governance CLI:**
```bash
npm install -g governance-cli
# or
npm install --save-dev governance-cli
```

### Issue 2: False Positives

**Symptom:** Boundary checker reports violations that should be allowed

**Solutions:**

1. **Add exception to manifest:**
```yaml
# .repo/repo.manifest.yaml
boundaries:
  edges:
    - from: "src/sales/checkout/ui"
      to: "src/sales/cart/domain"
      reason: "Checkout needs to access cart state"
      approved_by: "tech-lead"
      date: "2026-01-22"
```

2. **Use inline justification:**
```typescript
// src/sales/checkout/ui/CheckoutButton.tsx
// BOUNDARY_EXCEPTION: Need direct access for performance
// Approved in Task Packet #123
import { getCartItems } from '../../cart/domain/cartService';
```

### Issue 3: Circular Dependencies

**Symptom:** Features depend on each other

**Solution:** Extract shared code to platform or create interface layer:

**Before (circular):**
```
Feature A → Feature B
Feature B → Feature A  ❌
```

**After (fixed):**
```
Feature A → Platform
Feature B → Platform
Platform has shared code  ✅
```

### Issue 4: Too Many Exceptions

**Symptom:** Many boundary violations require exceptions

**Solutions:**

1. **Re-evaluate layer design** - Layers may be incorrect
2. **Extract shared code** - Create platform utilities
3. **Relax cross-feature rules** - Allow some cross-feature imports
4. **Use event bus** - Decouple features

### Issue 5: Performance Issues

**Symptom:** Boundary checker is slow

**Solutions:**

1. **Cache results:**
```javascript
const cache = new Map();
function checkFile(filePath) {
  if (cache.has(filePath)) return cache.get(filePath);
  // ... check logic
  cache.set(filePath, result);
}
```

2. **Check only changed files:**
```bash
# In CI
git diff --name-only origin/main | grep '\\.ts$' | xargs node scripts/check-boundaries.js
```

3. **Parallelize checks:**
```javascript
const files = getFilesRecursive('./src');
await Promise.all(files.map(checkFile));
```

### Issue 6: Unclear Layer Boundaries

**Symptom:** Developers unsure where code belongs

**Solution:** Create decision tree:

```
Is it UI code?
├─ Yes → ui/
└─ No
   └─ Is it business logic?
      ├─ Yes → domain/
      └─ No
         └─ Is it external integration?
            ├─ Yes → data/
            └─ No → platform/
```

---

## Next Steps

After setting up boundaries:

1. **✅ Document your architecture** - Create ADR for boundary decisions
2. **✅ Add to CI/CD** - Enforce boundaries in pull requests
3. **✅ Train team** - Ensure everyone understands the rules
4. **✅ Monitor violations** - Track and address boundary issues
5. **✅ Iterate** - Adjust boundaries based on team feedback

## Related Guides

- [How To: Configure Manifest](./HOW_TO_CONFIGURE_MANIFEST.md) - Configure boundary settings
- [How To: Manage Waivers](./HOW_TO_MANAGE_WAIVERS.md) - Handle boundary violations
- [How To: Work With Agents](./HOW_TO_WORK_WITH_AGENTS.md) - Agent boundary checks

## Additional Resources

- `.repo/policy/BOUNDARIES.md` - Your boundary configuration
- `.repo/repo.manifest.yaml` - Boundary enforcement settings
- Phase 2 Documentation - Architectural patterns
- ADR Templates - Document boundary decisions

---

**Status:** Ready to use  
**Last Updated:** 2026-01-22  
**Version:** 1.0.0
