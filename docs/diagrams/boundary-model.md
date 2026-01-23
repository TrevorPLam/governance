# Boundary Model Diagram

## Overview

This diagram illustrates the layer architecture and boundary enforcement model used in the governance system. It shows how code is organized into layers, what dependencies are allowed, and how boundaries are enforced.

## Four-Layer Architecture

```mermaid
graph TD
    subgraph "Layer 1: UI/Presentation"
        UI[UI Components]
        VIEWS[Views]
        CONTROLLERS[Controllers]
    end

    subgraph "Layer 2: Domain/Business Logic"
        DOMAIN[Domain Models]
        SERVICES[Business Services]
        LOGIC[Business Rules]
    end

    subgraph "Layer 3: Data/Persistence"
        REPOS[Repositories]
        DATA_ACCESS[Data Access]
        MODELS[Data Models]
    end

    subgraph "Layer 4: Platform/Infrastructure"
        PLATFORM[Platform Services]
        UTILS[Utilities]
        LIBS[Third-party Libraries]
    end

    %% Allowed dependencies (downward only)
    UI --> DOMAIN
    UI --> PLATFORM
    DOMAIN --> DATA
    DOMAIN --> PLATFORM
    DATA --> PLATFORM

    %% Styling
    style UI fill:#e3f2fd
    style DOMAIN fill:#e8f5e9
    style DATA fill:#fff3e0
    style PLATFORM fill:#f3e5f5
```

## Dependency Rules

```mermaid
graph LR
    subgraph "Allowed Dependencies"
        A1[ui/] -->|✅ Can Import| B1[domain/]
        A1 -->|✅ Can Import| D1[platform/]
        B1 -->|✅ Can Import| C1[data/]
        B1 -->|✅ Can Import| D1
        C1 -->|✅ Can Import| D1
    end

    subgraph "Forbidden Dependencies"
        B2[domain/] -.->|❌ Cannot Import| A2[ui/]
        C2[data/] -.->|❌ Cannot Import| A2
        C2 -.->|❌ Cannot Import| B2[domain/]
        D2[platform/] -.->|❌ Cannot Import| A2
        D2 -.->|❌ Cannot Import| B2
        D2 -.->|❌ Cannot Import| C2[data/]
    end

    style A1 fill:#e3f2fd
    style B1 fill:#e8f5e9
    style C1 fill:#fff3e0
    style D1 fill:#f3e5f5
    
    style A2 fill:#e3f2fd
    style B2 fill:#e8f5e9
    style C2 fill:#fff3e0
    style D2 fill:#f3e5f5
```

## Boundary Checking Flow

```mermaid
graph TD
    START[Code Change] --> EXTRACT[Extract Imports]
    EXTRACT --> LOAD_BOUND[Load BOUNDARIES.md]
    LOAD_BOUND --> LOAD_MAN[Load Manifest Boundaries]
    LOAD_MAN --> CHECK_LAYER{Determine<br/>Source Layer}
    
    CHECK_LAYER --> LAYER_UI[UI Layer]
    CHECK_LAYER --> LAYER_DOMAIN[Domain Layer]
    CHECK_LAYER --> LAYER_DATA[Data Layer]
    CHECK_LAYER --> LAYER_PLATFORM[Platform Layer]
    
    LAYER_UI --> CHECK_UI{Check UI<br/>Imports}
    LAYER_DOMAIN --> CHECK_DOMAIN{Check Domain<br/>Imports}
    LAYER_DATA --> CHECK_DATA{Check Data<br/>Imports}
    LAYER_PLATFORM --> CHECK_PLATFORM{Check Platform<br/>Imports}
    
    CHECK_UI -->|Valid| PASS1[✅ Pass]
    CHECK_UI -->|Invalid| VIOLATION1[❌ Boundary Violation]
    
    CHECK_DOMAIN -->|Valid| PASS2[✅ Pass]
    CHECK_DOMAIN -->|Invalid| VIOLATION2[❌ Boundary Violation]
    
    CHECK_DATA -->|Valid| PASS3[✅ Pass]
    CHECK_DATA -->|Invalid| VIOLATION3[❌ Boundary Violation]
    
    CHECK_PLATFORM -->|Valid| PASS4[✅ Pass]
    CHECK_PLATFORM -->|Invalid| VIOLATION4[❌ Boundary Violation]
    
    VIOLATION1 --> CHECK_HITL{HITL<br/>Approved?}
    VIOLATION2 --> CHECK_HITL
    VIOLATION3 --> CHECK_HITL
    VIOLATION4 --> CHECK_HITL
    
    CHECK_HITL -->|Yes| PASS_HITL[✅ Pass with HITL]
    CHECK_HITL -->|No| REJECT[❌ Reject]
    
    style PASS1 fill:#e8f5e9
    style PASS2 fill:#e8f5e9
    style PASS3 fill:#e8f5e9
    style PASS4 fill:#e8f5e9
    style PASS_HITL fill:#fff3e0
    style REJECT fill:#ffebee
```

## Practical Examples

### Example 1: Simple Web App

```mermaid
graph TD
    subgraph "src/ui/"
        BUTTON[Button.tsx]
        FORM[UserForm.tsx]
        PAGE[HomePage.tsx]
    end

    subgraph "src/domain/"
        USER_SVC[UserService.ts]
        AUTH_SVC[AuthService.ts]
        VALIDATOR[Validator.ts]
    end

    subgraph "src/data/"
        USER_REPO[UserRepository.ts]
        DB[DatabaseClient.ts]
    end

    subgraph "src/platform/"
        LOGGER[Logger.ts]
        CONFIG[Config.ts]
        HTTP[HttpClient.ts]
    end

    %% Allowed dependencies
    FORM --> USER_SVC
    FORM --> LOGGER
    PAGE --> AUTH_SVC
    PAGE --> CONFIG
    
    USER_SVC --> USER_REPO
    USER_SVC --> VALIDATOR
    USER_SVC --> LOGGER
    
    AUTH_SVC --> USER_REPO
    AUTH_SVC --> HTTP
    
    USER_REPO --> DB
    USER_REPO --> LOGGER
    
    DB --> CONFIG
    
    style BUTTON fill:#e3f2fd
    style FORM fill:#e3f2fd
    style PAGE fill:#e3f2fd
    style USER_SVC fill:#e8f5e9
    style AUTH_SVC fill:#e8f5e9
    style VALIDATOR fill:#e8f5e9
    style USER_REPO fill:#fff3e0
    style DB fill:#fff3e0
    style LOGGER fill:#f3e5f5
    style CONFIG fill:#f3e5f5
    style HTTP fill:#f3e5f5
```

### Example 2: Boundary Violation

```mermaid
graph TD
    FILE[data/UserRepository.ts]
    
    FILE -->|❌ VIOLATION| UI_IMPORT[Import from ui/Button]
    FILE -->|✅ ALLOWED| PLATFORM_IMPORT[Import from platform/Logger]
    
    UI_IMPORT --> ERROR[Boundary Error:<br/>Data layer cannot import UI layer]
    PLATFORM_IMPORT --> SUCCESS[Valid Import]
    
    ERROR --> ESCALATE[Escalate to HITL]
    ESCALATE --> HUMAN{Human<br/>Review}
    HUMAN -->|Approve| HITL_DOC[Document in HITL.md]
    HUMAN -->|Reject| FIX[Fix Code]
    
    style FILE fill:#fff3e0
    style ERROR fill:#ffebee
    style SUCCESS fill:#e8f5e9
    style HUMAN fill:#f3e5f5
```

## Cross-Feature Boundaries

```mermaid
graph LR
    subgraph "Feature: Authentication"
        AUTH_UI[auth/ui/]
        AUTH_DOMAIN[auth/domain/]
        AUTH_DATA[auth/data/]
    end

    subgraph "Feature: User Management"
        USER_UI[user/ui/]
        USER_DOMAIN[user/domain/]
        USER_DATA[user/data/]
    end

    subgraph "Feature: Billing"
        BILL_UI[billing/ui/]
        BILL_DOMAIN[billing/domain/]
        BILL_DATA[billing/data/]
    end

    %% Allowed cross-feature dependencies (same layer or lower)
    USER_DOMAIN -->|✅ Can Use| AUTH_DOMAIN
    BILL_DOMAIN -->|✅ Can Use| AUTH_DOMAIN
    BILL_DOMAIN -->|✅ Can Use| USER_DOMAIN
    
    %% Forbidden cross-feature dependencies
    AUTH_DOMAIN -.->|❌ Cannot Import| USER_DOMAIN
    USER_DATA -.->|❌ Cannot Import| AUTH_DATA
    
    style AUTH_UI fill:#e3f2fd
    style AUTH_DOMAIN fill:#e8f5e9
    style AUTH_DATA fill:#fff3e0
    style USER_UI fill:#e3f2fd
    style USER_DOMAIN fill:#e8f5e9
    style USER_DATA fill:#fff3e0
    style BILL_UI fill:#e3f2fd
    style BILL_DOMAIN fill:#e8f5e9
    style BILL_DATA fill:#fff3e0
```

## Monorepo Package Boundaries

```mermaid
graph TD
    subgraph "Package: @myapp/ui"
        UI_PKG[Public API]
        UI_INTERNAL[Internal Components]
    end

    subgraph "Package: @myapp/api"
        API_PKG[Public API]
        API_INTERNAL[Internal Services]
    end

    subgraph "Package: @myapp/utils"
        UTILS_PKG[Public Utilities]
        UTILS_INTERNAL[Internal Helpers]
    end

    subgraph "Package: @myapp/models"
        MODELS_PKG[Shared Models]
    end

    %% Allowed package dependencies
    UI_PKG -->|✅ Can Import| MODELS_PKG
    UI_PKG -->|✅ Can Import| UTILS_PKG
    API_PKG -->|✅ Can Import| MODELS_PKG
    API_PKG -->|✅ Can Import| UTILS_PKG
    
    %% Forbidden: accessing internal implementations
    UI_PKG -.->|❌ Cannot Import| API_INTERNAL
    API_PKG -.->|❌ Cannot Import| UI_INTERNAL
    
    %% Forbidden: direct internal access
    UI_PKG -.->|❌ Cannot Import| UTILS_INTERNAL
    
    style UI_PKG fill:#e3f2fd
    style API_PKG fill:#e8f5e9
    style UTILS_PKG fill:#f3e5f5
    style MODELS_PKG fill:#fff3e0
```

## Boundary Enforcement Mechanisms

```mermaid
graph TD
    subgraph "Static Analysis"
        ESLINT[ESLint Plugin]
        TS_PATHS[TypeScript Paths]
        CUSTOM[Custom Linter]
    end

    subgraph "Runtime Checks"
        CLI_VERIFY[CLI Verify Command]
        UNIT_TESTS[Unit Tests]
    end

    subgraph "CI/CD Checks"
        BOUNDARY_GATE[Boundary Gate]
        AUTOMATED[Automated Enforcement]
    end

    subgraph "Manual Review"
        CODE_REVIEW[Code Review]
        HITL_REVIEW[HITL Review]
    end

    CODE_CHANGE[Code Change] --> ESLINT
    CODE_CHANGE --> TS_PATHS
    CODE_CHANGE --> CUSTOM
    
    ESLINT --> CLI_VERIFY
    TS_PATHS --> CLI_VERIFY
    CUSTOM --> CLI_VERIFY
    
    CLI_VERIFY --> UNIT_TESTS
    UNIT_TESTS --> BOUNDARY_GATE
    
    BOUNDARY_GATE -->|Pass| APPROVED[✅ Approved]
    BOUNDARY_GATE -->|Fail| CODE_REVIEW
    
    CODE_REVIEW -->|Minor| FIX[Fix Code]
    CODE_REVIEW -->|Major| HITL_REVIEW
    
    HITL_REVIEW -->|Approve| APPROVED
    HITL_REVIEW -->|Reject| FIX
    
    FIX --> CODE_CHANGE
    
    style APPROVED fill:#e8f5e9
    style FIX fill:#fff3e0
```

## Configuration in repo.manifest.yaml

```yaml
boundaries:
  layer_model:
    ui:
      can_import:
        - domain
        - platform
      cannot_import:
        - data
    
    domain:
      can_import:
        - data
        - platform
      cannot_import:
        - ui
    
    data:
      can_import:
        - platform
      cannot_import:
        - ui
        - domain
    
    platform:
      can_import: []
      cannot_import:
        - ui
        - domain
        - data
  
  cross_feature:
    auth:
      can_be_imported_by:
        - "*"  # All features can use auth
    
    user:
      can_be_imported_by:
        - billing
        - admin
    
    billing:
      can_be_imported_by: []  # No one imports billing
```

## Boundary Violation Examples

### Violation 1: Upward Import
```typescript
// ❌ BAD: Domain importing from UI
// src/domain/UserService.ts
import { Button } from '../ui/Button';  // VIOLATION!
```

### Violation 2: Cross-Feature Data Access
```typescript
// ❌ BAD: Direct data layer access across features
// src/auth/data/AuthRepository.ts
import { UserData } from '../../user/data/UserRepository';  // VIOLATION!
```

### Violation 3: Platform Importing Business Logic
```typescript
// ❌ BAD: Platform importing domain
// src/platform/Logger.ts
import { UserService } from '../domain/UserService';  // VIOLATION!
```

### Valid Example: Proper Layering
```typescript
// ✅ GOOD: UI importing from domain and platform
// src/ui/UserForm.tsx
import { UserService } from '../domain/UserService';  // OK
import { Logger } from '../platform/Logger';  // OK
```

## Key Principles

### Layer Responsibilities
1. **UI Layer**: User interface, presentation logic
2. **Domain Layer**: Business logic, rules, services
3. **Data Layer**: Persistence, repositories, data access
4. **Platform Layer**: Infrastructure, utilities, third-party integrations

### Dependency Rules
- Dependencies flow **downward only** (UI → Domain → Data → Platform)
- **No upward** dependencies allowed
- **No circular** dependencies allowed
- **Cross-layer** skipping is allowed (e.g., UI → Platform)

### Enforcement
- **Static Analysis**: ESLint, TypeScript, custom linters
- **Runtime Checks**: CLI verify, unit tests
- **CI/CD Gates**: Automated enforcement in pipeline
- **HITL Review**: Human approval for justified violations

### Benefits
- **Maintainability**: Clear separation of concerns
- **Testability**: Easy to mock and test layers independently
- **Scalability**: Add features without affecting others
- **Flexibility**: Change implementations without breaking dependents

## Related Documentation

- **Boundary Policy**: `/.repo/policy/BOUNDARIES.md`
- **Architecture Overview**: `/docs/architecture/ARCHITECTURE_OVERVIEW.md`
- **Layer Model**: `/docs/architecture/LAYER_MODEL.md`
- **How to Define Boundaries**: `/docs/guides/HOW_TO_DEFINE_BOUNDARIES.md`

---

**Last Updated:** 2026-01-22  
**Version:** 1.0.0
