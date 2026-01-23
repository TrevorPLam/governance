# Layer Model Architecture

**Document Type:** Architecture  
**Audience:** Architects, Senior Developers  
**Last Updated:** 2026-01-22

---

## Table of Contents

1. [Overview](#overview)
2. [Layer Hierarchy](#layer-hierarchy)
3. [Layer Responsibilities](#layer-responsibilities)
4. [Dependency Rules](#dependency-rules)
5. [Boundary Enforcement](#boundary-enforcement)
6. [Common Patterns](#common-patterns)
7. [Anti-Patterns](#anti-patterns)
8. [Practical Examples](#practical-examples)

---

## Overview

The Layer Model defines the architectural boundaries for code organization in governed repositories. It enforces a clear separation of concerns and prevents problematic dependencies that lead to tangled, unmaintainable codebases.

### Model Type: Hybrid Domain-Feature-Layer

The governance framework uses a **hybrid domain-feature-layer** model that combines:
- **Domain**: High-level business domains (e.g., sales, inventory, user-management)
- **Feature**: Specific features within domains (e.g., checkout, product-catalog)
- **Layer**: Technical layers within features (e.g., ui, domain, data, platform)

### Directory Structure

```
src/
├── <domain>/
│   ├── <feature>/
│   │   ├── ui/           # User Interface layer
│   │   ├── domain/       # Business Logic layer
│   │   ├── data/         # Data Access layer
│   │   └── README.md     # Feature documentation
│   └── ...
├── platform/             # Shared platform utilities
│   ├── logging/
│   ├── config/
│   ├── http/
│   └── ...
└── ...
```

**Example:**
```
src/
├── sales/
│   ├── checkout/
│   │   ├── ui/
│   │   │   ├── CheckoutButton.tsx
│   │   │   └── PaymentForm.tsx
│   │   ├── domain/
│   │   │   ├── CheckoutService.ts
│   │   │   └── PaymentValidator.ts
│   │   └── data/
│   │       ├── CheckoutRepository.ts
│   │       └── PaymentGateway.ts
│   └── cart/
│       ├── ui/
│       ├── domain/
│       └── data/
├── inventory/
│   └── catalog/
│       ├── ui/
│       ├── domain/
│       └── data/
└── platform/
    ├── logging/
    │   └── Logger.ts
    ├── http/
    │   └── HttpClient.ts
    └── config/
        └── Config.ts
```

---

## Layer Hierarchy

### The Four Layers

```
┌─────────────────────────────────────┐
│            UI Layer                 │  ← User Interface
│  (Components, Views, Controllers)   │
└─────────────────────────────────────┘
              ▼ depends on
┌─────────────────────────────────────┐
│          Domain Layer               │  ← Business Logic
│  (Services, Validators, Models)     │
└─────────────────────────────────────┘
              ▼ depends on
┌─────────────────────────────────────┐
│           Data Layer                │  ← Data Access
│  (Repositories, Gateways, DAOs)     │
└─────────────────────────────────────┘
              ▼ depends on
┌─────────────────────────────────────┐
│         Platform Layer              │  ← Shared Utilities
│  (Logging, Config, HTTP, Utils)     │
└─────────────────────────────────────┘
              ▼
           (No dependencies)
```

### Layer Order (Top to Bottom)

**Direction of Dependencies: ui → domain → data → platform**

Each layer can only depend on layers below it. Dependencies never flow upward.

---

## Layer Responsibilities

### UI Layer

**Purpose**: Handles user interface and user interaction

**Responsibilities:**
- Rendering user interfaces
- Handling user input
- Displaying data from domain layer
- Routing and navigation
- UI state management
- Presentation logic only

**Technology Examples:**
- React/Vue/Angular components
- HTML templates
- CSS/styling
- UI controllers
- View models

**What UI Layer CANNOT Do:**
- Direct database access
- Business logic calculations
- Data validation (beyond basic input validation)
- Direct external API calls (should use domain layer)

**Example:**
```typescript
// ✓ ALLOWED: UI component using domain service
import { CheckoutService } from '../domain/CheckoutService';

export function CheckoutButton() {
  const service = new CheckoutService();
  
  const handleCheckout = async () => {
    await service.processCheckout(cart);
  };
  
  return <button onClick={handleCheckout}>Checkout</button>;
}
```

---

### Domain Layer

**Purpose**: Contains business logic and rules

**Responsibilities:**
- Business rule enforcement
- Domain model definitions
- Business calculations
- Validation logic
- Orchestration of data operations
- Domain events

**Technology Examples:**
- Service classes
- Domain models
- Validators
- Business rule engines
- State machines

**What Domain Layer CANNOT Do:**
- UI rendering or presentation logic
- Direct database queries (should use data layer)
- File system operations (unless business critical)
- HTTP request handling (should delegate to data layer)

**Example:**
```typescript
// ✓ ALLOWED: Domain service orchestrating data access
import { CheckoutRepository } from '../data/CheckoutRepository';
import { PaymentGateway } from '../data/PaymentGateway';

export class CheckoutService {
  private repo = new CheckoutRepository();
  private payment = new PaymentGateway();
  
  async processCheckout(cart: Cart): Promise<Order> {
    // Business logic
    this.validateCart(cart);
    const total = this.calculateTotal(cart);
    
    // Orchestrate data operations
    const payment = await this.payment.charge(total);
    const order = await this.repo.createOrder(cart, payment);
    
    return order;
  }
}
```

---

### Data Layer

**Purpose**: Handles data access and external integrations

**Responsibilities:**
- Database operations (CRUD)
- External API calls
- File system operations
- Cache management
- Data transformation (database ↔ domain models)
- Connection management

**Technology Examples:**
- Repository pattern implementations
- DAO (Data Access Objects)
- API clients
- Database query builders
- ORM usage

**What Data Layer CANNOT Do:**
- Business logic or validation
- UI rendering
- Direct user interaction handling

**Example:**
```typescript
// ✓ ALLOWED: Data repository accessing database
import { Logger } from '../../platform/logging/Logger';
import { HttpClient } from '../../platform/http/HttpClient';

export class CheckoutRepository {
  private logger = Logger.getInstance();
  private http = new HttpClient();
  
  async createOrder(cart: Cart, payment: Payment): Promise<Order> {
    this.logger.info('Creating order');
    const response = await this.http.post('/orders', { cart, payment });
    return response.data;
  }
}
```

---

### Platform Layer

**Purpose**: Provides shared utilities and infrastructure

**Responsibilities:**
- Logging utilities
- Configuration management
- HTTP/network utilities
- Common data structures
- Helper functions
- Framework integrations

**Technology Examples:**
- Logger implementations
- Config loaders
- HTTP clients
- Utility functions
- Common types/interfaces

**What Platform Layer CANNOT Do:**
- Business logic
- Feature-specific code
- Direct database access
- UI components

**Rules:**
- Platform depends on NOTHING else in src/
- Platform is shared across all features
- No business logic in platform
- Keep platform generic and reusable

**Example:**
```typescript
// ✓ ALLOWED: Generic platform utility
export class Logger {
  private static instance: Logger;
  
  log(level: string, message: string): void {
    console.log(`[${level}] ${message}`);
  }
  
  info(message: string): void {
    this.log('INFO', message);
  }
  
  error(message: string): void {
    this.log('ERROR', message);
  }
}
```

---

## Dependency Rules

### The Golden Rule

**Dependencies flow in ONE direction: ui → domain → data → platform**

```
┌──────┐     ┌────────┐     ┌──────┐     ┌──────────┐
│  UI  │ ──► │ Domain │ ──► │ Data │ ──► │ Platform │
└──────┘     └────────┘     └──────┘     └──────────┘
   ▲            ▲             ▲               ▲
   │            │             │               │
   └─ Can depend on all layers below ─────────┘
```

### Allowed Dependencies

| From Layer | Can Import From |
|-----------|-----------------|
| UI | Domain, Data, Platform |
| Domain | Data, Platform |
| Data | Platform |
| Platform | Nothing (external libraries only) |

### Forbidden Dependencies

| From Layer | CANNOT Import From |
|-----------|-------------------|
| Platform | Anything in src/ |
| Data | Domain, UI |
| Domain | UI |
| UI | Nothing forbidden (can import all layers) |

### Cross-Feature Dependencies

**Rule**: Cross-feature imports require an ADR (Architecture Decision Record)

**Why?** Cross-feature dependencies create coupling that can:
- Make features harder to understand
- Complicate refactoring
- Create circular dependencies
- Reduce modularity

**Example:**
```typescript
// ❌ FORBIDDEN: Cross-feature import without ADR
import { CartService } from '../../cart/domain/CartService';

// ✓ ALLOWED: Same-feature import
import { CheckoutValidator } from '../domain/CheckoutValidator';

// ✓ ALLOWED: Platform import (shared across features)
import { Logger } from '../../../platform/logging/Logger';
```

**When Cross-Feature is Needed:**
1. Document in ADR why coupling is necessary
2. Add explicit edge in `repo.manifest.yaml`
3. Consider if shared logic should move to platform

---

## Boundary Enforcement

### Enforcement Methods

The governance system uses **hybrid_static_checker_plus_manifest** enforcement:

1. **Static Checker**: Analyzes import statements
2. **Manifest Validation**: Checks against explicit rules in `repo.manifest.yaml`

### Violation Handling

**Severity**: `waiver_plus_auto_task`

When a boundary violation is detected:
1. **PR is blocked** until violation is resolved or waived
2. If **waived**:
   - Waiver must be approved by maintainer
   - Auto-task created in TODO files with remediation plan
   - Waiver expires after set period (default: 3 months)
3. If **fixed**:
   - Refactor code to follow layer rules
   - Update imports to respect boundaries

### Configuration in Manifest

```yaml
# repo.manifest.yaml
boundaries:
  layers:
    ui: ["domain", "data", "platform"]
    domain: ["data", "platform"]
    data: ["platform"]
    platform: []
  
  features:
    - sales/checkout
    - sales/cart
    - inventory/catalog
  
  exceptions:
    # Explicit cross-feature edge (requires ADR)
    - from: "sales/checkout/domain"
      to: "sales/cart/domain"
      reason: "Checkout needs cart total calculation"
      adr: "docs/adr/0015-checkout-cart-coupling.md"
```

---

## Common Patterns

### Pattern 1: Service Layer Orchestration

**Use Case**: Domain service coordinating multiple data operations

```typescript
// domain/CheckoutService.ts
import { CartRepository } from '../data/CartRepository';
import { PaymentGateway } from '../data/PaymentGateway';
import { OrderRepository } from '../data/OrderRepository';

export class CheckoutService {
  async processCheckout(userId: string, cartId: string): Promise<Order> {
    // Orchestrate multiple data operations
    const cart = await new CartRepository().getCart(cartId);
    const payment = await new PaymentGateway().charge(cart.total);
    const order = await new OrderRepository().createOrder(cart, payment);
    
    // Business logic
    await this.sendConfirmationEmail(order);
    
    return order;
  }
}
```

### Pattern 2: Repository Pattern

**Use Case**: Data layer abstracting database access

```typescript
// data/OrderRepository.ts
import { Database } from '../../platform/database/Database';

export class OrderRepository {
  private db = Database.getInstance();
  
  async createOrder(cart: Cart, payment: Payment): Promise<Order> {
    const order = {
      userId: cart.userId,
      items: cart.items,
      total: cart.total,
      paymentId: payment.id,
      status: 'confirmed',
    };
    
    return await this.db.orders.insert(order);
  }
  
  async getOrder(orderId: string): Promise<Order> {
    return await this.db.orders.findById(orderId);
  }
}
```

### Pattern 3: Platform Utilities

**Use Case**: Shared logging across all features

```typescript
// platform/logging/Logger.ts
export class Logger {
  static getInstance(): Logger {
    // Singleton pattern
  }
  
  info(message: string, context?: any): void {
    console.log(`[INFO] ${message}`, context);
  }
  
  error(message: string, error?: Error): void {
    console.error(`[ERROR] ${message}`, error);
  }
}

// Used anywhere in codebase:
import { Logger } from '../../../platform/logging/Logger';
const logger = Logger.getInstance();
logger.info('Processing checkout');
```

### Pattern 4: Dependency Injection

**Use Case**: Testable domain services

```typescript
// domain/CheckoutService.ts
export class CheckoutService {
  constructor(
    private cartRepo: CartRepository = new CartRepository(),
    private paymentGateway: PaymentGateway = new PaymentGateway()
  ) {}
  
  async processCheckout(cartId: string): Promise<Order> {
    const cart = await this.cartRepo.getCart(cartId);
    const payment = await this.paymentGateway.charge(cart.total);
    // ...
  }
}

// In tests, inject mocks:
const service = new CheckoutService(mockCartRepo, mockPaymentGateway);
```

---

## Anti-Patterns

### Anti-Pattern 1: Reverse Dependencies ❌

**Problem**: Lower layers depending on higher layers

```typescript
// ❌ FORBIDDEN: Data layer importing from Domain layer
// data/OrderRepository.ts
import { OrderValidator } from '../domain/OrderValidator'; // WRONG!

export class OrderRepository {
  async createOrder(order: Order): Promise<Order> {
    OrderValidator.validate(order); // Validation should be in domain
    return await this.db.orders.insert(order);
  }
}
```

**Solution**: Keep validation in domain layer

```typescript
// ✓ CORRECT: Domain layer validates before calling data layer
// domain/OrderService.ts
import { OrderRepository } from '../data/OrderRepository';

export class OrderService {
  async createOrder(order: Order): Promise<Order> {
    this.validateOrder(order); // Validation in domain
    return await new OrderRepository().createOrder(order);
  }
}
```

### Anti-Pattern 2: UI with Business Logic ❌

**Problem**: UI layer containing business rules

```typescript
// ❌ FORBIDDEN: Business logic in UI component
// ui/CheckoutButton.tsx
export function CheckoutButton({ cart }: Props) {
  const handleClick = async () => {
    // Business logic in UI - WRONG!
    if (cart.items.length === 0) {
      alert('Cart is empty');
      return;
    }
    
    const total = cart.items.reduce((sum, item) => sum + item.price, 0);
    if (total < 0) {
      alert('Invalid total');
      return;
    }
    
    // Direct API call from UI - WRONG!
    await fetch('/api/checkout', { method: 'POST', body: JSON.stringify(cart) });
  };
}
```

**Solution**: Move logic to domain layer

```typescript
// ✓ CORRECT: UI delegates to domain service
// ui/CheckoutButton.tsx
import { CheckoutService } from '../domain/CheckoutService';

export function CheckoutButton({ cart }: Props) {
  const service = new CheckoutService();
  
  const handleClick = async () => {
    try {
      await service.processCheckout(cart);
      // UI only handles success/failure display
    } catch (error) {
      alert(error.message);
    }
  };
}
```

### Anti-Pattern 3: Circular Dependencies ❌

**Problem**: Two layers depending on each other

```typescript
// ❌ FORBIDDEN: Circular dependency
// domain/OrderService.ts
import { OrderRepository } from '../data/OrderRepository';

export class OrderService {
  // ...
}

// data/OrderRepository.ts
import { OrderService } from '../domain/OrderService'; // CIRCULAR!
```

**Solution**: Use dependency injection or events

```typescript
// ✓ CORRECT: Data layer emits events, domain layer subscribes
// data/OrderRepository.ts
export class OrderRepository {
  async createOrder(order: Order): Promise<Order> {
    const created = await this.db.orders.insert(order);
    EventBus.emit('order.created', created); // Emit event
    return created;
  }
}

// domain/OrderService.ts
EventBus.on('order.created', (order) => {
  // React to event without circular dependency
});
```

### Anti-Pattern 4: Feature-to-Feature Coupling ❌

**Problem**: Direct imports between features without ADR

```typescript
// ❌ FORBIDDEN: Cross-feature import without ADR
// sales/checkout/domain/CheckoutService.ts
import { CartService } from '../../cart/domain/CartService'; // WRONG!
```

**Solution**: Use ADR or move to platform

```typescript
// ✓ OPTION 1: Document with ADR
// sales/checkout/domain/CheckoutService.ts
import { CartService } from '../../cart/domain/CartService'; // OK with ADR

// ✓ OPTION 2: Move shared logic to platform
// platform/cart/CartUtils.ts
export class CartUtils {
  static calculateTotal(cart: Cart): number {
    // Shared logic
  }
}

// Both features use platform
import { CartUtils } from '../../../platform/cart/CartUtils';
```

---

## Practical Examples

### Example 1: E-commerce Checkout Flow

```
src/sales/checkout/
├── ui/
│   ├── CheckoutPage.tsx          # UI Layer
│   └── PaymentForm.tsx
├── domain/
│   ├── CheckoutService.ts        # Business Logic
│   ├── PaymentValidator.ts
│   └── OrderCalculator.ts
└── data/
    ├── CheckoutRepository.ts     # Data Access
    └── PaymentGateway.ts

Dependencies:
- CheckoutPage imports CheckoutService (ui → domain)
- CheckoutService imports CheckoutRepository (domain → data)
- CheckoutRepository imports Logger from platform (data → platform)
```

### Example 2: User Authentication

```
src/user-management/auth/
├── ui/
│   ├── LoginForm.tsx             # UI Layer
│   └── SignupForm.tsx
├── domain/
│   ├── AuthService.ts            # Business Logic
│   ├── PasswordValidator.ts
│   └── TokenManager.ts
└── data/
    ├── UserRepository.ts         # Data Access
    └── SessionStore.ts

Dependencies:
- LoginForm imports AuthService (ui → domain)
- AuthService imports UserRepository (domain → data)
- UserRepository imports HttpClient from platform (data → platform)
```

### Example 3: Inventory Management

```
src/inventory/catalog/
├── ui/
│   ├── ProductList.tsx           # UI Layer
│   └── ProductDetail.tsx
├── domain/
│   ├── CatalogService.ts         # Business Logic
│   ├── ProductSearch.ts
│   └── PriceCalculator.ts
└── data/
    ├── ProductRepository.ts      # Data Access
    └── InventoryClient.ts

Dependencies:
- ProductList imports CatalogService (ui → domain)
- CatalogService imports ProductRepository (domain → data)
- ProductRepository imports Cache from platform (data → platform)
```

---

## See Also

- [Architecture Overview](./ARCHITECTURE_OVERVIEW.md) - System architecture
- [Boundaries Policy](../../templates/.repo/policy/BOUNDARIES.md) - Boundary rules
- [Agent Architecture](./AGENT_ARCHITECTURE.md) - Agent execution model
- [Principles Reference](../reference/PRINCIPLES_REFERENCE.md) - Architectural principles

---

**Version:** 1.0.0  
**Last Updated:** 2026-01-22  
**Maintainer:** TrevorPLam/governance
