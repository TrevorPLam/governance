# Common Patterns and Best Practices

**Architectural patterns, governance patterns, and anti-patterns for the AI-Native Governance Framework**

---

## Table of Contents

1. [Architectural Patterns](#architectural-patterns)
2. [Governance Patterns](#governance-patterns)
3. [CI/CD Patterns](#cicd-patterns)
4. [Project Type Patterns](#project-type-patterns)
5. [Anti-Patterns to Avoid](#anti-patterns-to-avoid)
6. [Code Organization Patterns](#code-organization-patterns)
7. [Boundary Definition Patterns](#boundary-definition-patterns)
8. [Quality Gate Patterns](#quality-gate-patterns)
9. [Security Patterns](#security-patterns)
10. [Testing Patterns](#testing-patterns)
11. [Documentation Patterns](#documentation-patterns)
12. [Agent Interaction Patterns](#agent-interaction-patterns)

---

## Architectural Patterns

### Pattern 1: Layered Architecture with Boundaries

**Context:** Organizing code into clear layers with enforced boundaries

**Problem:** Code becomes tangled with unclear dependencies

**Solution:** Define explicit layers with governance boundaries

**Implementation:**

```yaml
# repo.manifest.yaml
boundaries:
  # Layer 1: Presentation
  - name: ui
    path: src/ui
    description: "User interface components"
    allowed_dependencies:
      - name: application
        via: hooks_and_contexts
    forbidden_imports:
      - src/domain/**
      - src/infrastructure/**
  
  # Layer 2: Application
  - name: application
    path: src/application
    description: "Use cases and application logic"
    allowed_dependencies:
      - name: domain
        via: all
    forbidden_imports:
      - src/ui/**
      - src/infrastructure/**
  
  # Layer 3: Domain
  - name: domain
    path: src/domain
    description: "Business logic and entities"
    allowed_dependencies: []  # No dependencies!
    forbidden_imports:
      - src/**
  
  # Layer 4: Infrastructure
  - name: infrastructure
    path: src/infrastructure
    description: "External services and persistence"
    allowed_dependencies:
      - name: domain
        via: interfaces
```

**Directory Structure:**

```
src/
├── ui/                    # Layer 1
│   ├── components/
│   ├── pages/
│   └── hooks/
├── application/           # Layer 2
│   ├── use-cases/
│   ├── services/
│   └── dto/
├── domain/                # Layer 3
│   ├── entities/
│   ├── value-objects/
│   └── interfaces/
└── infrastructure/        # Layer 4
    ├── repositories/
    ├── api/
    └── database/
```

**Benefits:**
- ✅ Clear separation of concerns
- ✅ Enforced dependency direction
- ✅ Easy to test each layer
- ✅ Domain logic protected from framework changes

**When to use:** Medium to large applications requiring maintainability

**See also:** Clean Architecture, Hexagonal Architecture

---

### Pattern 2: Shared Kernel for Common Code

**Context:** Multiple boundaries need to share common types and utilities

**Problem:** Code duplication or inappropriate cross-boundary dependencies

**Solution:** Create explicit shared kernel boundary

**Implementation:**

```yaml
# repo.manifest.yaml
boundaries:
  - name: shared-kernel
    path: src/shared
    description: "Shared types, utilities, and interfaces"
    access: public
    exports:
      - types/**
      - utils/**
      - interfaces/**
    
  - name: frontend
    path: src/frontend
    allowed_dependencies:
      - name: shared-kernel
        imports: all
    
  - name: backend
    path: src/backend
    allowed_dependencies:
      - name: shared-kernel
        imports: all
```

**Directory Structure:**

```
src/
├── shared/                # Shared kernel
│   ├── types/
│   │   ├── User.ts
│   │   ├── Product.ts
│   │   └── ApiResponse.ts
│   ├── utils/
│   │   ├── validation.ts
│   │   └── formatting.ts
│   └── interfaces/
│       ├── IRepository.ts
│       └── IService.ts
├── frontend/
│   └── uses: shared types
└── backend/
    └── uses: shared types
```

**Example:**

```typescript
// src/shared/types/User.ts
export interface User {
  id: string;
  email: string;
  name: string;
}

// src/frontend/components/UserProfile.tsx
import { User } from '@shared/types/User';

// src/backend/services/UserService.ts
import { User } from '@shared/types/User';
```

**Benefits:**
- ✅ Single source of truth for shared code
- ✅ No duplication
- ✅ Type safety across boundaries
- ✅ Clear what's shared vs private

**When to use:** Projects with multiple boundaries needing common code

---

### Pattern 3: Plugin Architecture

**Context:** Need extensibility without modifying core code

**Problem:** Core code becomes bloated with features

**Solution:** Plugin-based architecture with clear interfaces

**Implementation:**

```yaml
# repo.manifest.yaml
boundaries:
  - name: core
    path: src/core
    description: "Core framework, never modified"
    exports:
      - interfaces/**
      - base-classes/**
    
  - name: plugins
    path: src/plugins
    description: "Extension plugins"
    allowed_dependencies:
      - name: core
        via: interfaces
    
    # Each plugin is isolated
    sub_boundaries:
      - name: auth-plugin
        path: src/plugins/auth
      - name: analytics-plugin
        path: src/plugins/analytics
```

**Directory Structure:**

```
src/
├── core/
│   ├── interfaces/
│   │   └── IPlugin.ts
│   ├── PluginManager.ts
│   └── Application.ts
└── plugins/
    ├── auth/
    │   ├── AuthPlugin.ts
    │   └── strategies/
    └── analytics/
        └── AnalyticsPlugin.ts
```

**Example:**

```typescript
// src/core/interfaces/IPlugin.ts
export interface IPlugin {
  name: string;
  version: string;
  initialize(): Promise<void>;
  execute(context: Context): Promise<Result>;
}

// src/plugins/auth/AuthPlugin.ts
export class AuthPlugin implements IPlugin {
  name = 'auth';
  version = '1.0.0';
  
  async initialize() {
    // Setup auth
  }
  
  async execute(context: Context) {
    // Handle auth
  }
}

// src/core/PluginManager.ts
export class PluginManager {
  private plugins: Map<string, IPlugin> = new Map();
  
  register(plugin: IPlugin) {
    this.plugins.set(plugin.name, plugin);
  }
}
```

**Benefits:**
- ✅ Core remains stable
- ✅ Easy to add/remove features
- ✅ Plugins are isolated
- ✅ Third-party extensions possible

**When to use:** Applications requiring extensibility

---

## Governance Patterns

### Pattern 4: Progressive Maturity Adoption

**Context:** Adopting governance framework incrementally

**Problem:** Overwhelming to adopt all governance at once

**Solution:** Start at Level 1, progress gradually

**Implementation:**

```yaml
# Phase 1: Level 1 - Basic (Week 1)
# repo.manifest.yaml
project:
  name: my-app
  maturity_level: 1

governance:
  version: "1.0.0"
  policies:
    enabled:
      - constitution  # Basic rules only

quality_gates:
  coverage_threshold: 60  # Low threshold to start
```

```yaml
# Phase 2: Level 2 - Managed (Month 2)
project:
  maturity_level: 2

governance:
  policies:
    enabled:
      - constitution
      - principles      # Add principles
      - quality_gates   # Add quality gates

quality_gates:
  coverage_threshold: 70  # Increase gradually
```

```yaml
# Phase 3: Level 3 - Defined (Month 4)
project:
  maturity_level: 3

governance:
  policies:
    enabled:
      - constitution
      - principles
      - quality_gates
      - security_baseline  # Add security

boundaries:  # Add boundaries
  - name: frontend
    path: src/frontend
  - name: backend
    path: src/backend
```

**Migration Path:**

```
Level 0 (Ad-hoc)
    ↓ Add basic policies
Level 1 (Basic)
    ↓ Add quality gates & testing
Level 2 (Managed)
    ↓ Add security & boundaries
Level 3 (Defined)
    ↓ Add optimization & automation
Level 4 (Optimizing)
```

**Benefits:**
- ✅ Not overwhelming
- ✅ Team learns gradually
- ✅ Time to adapt processes
- ✅ Incremental value delivery

**When to use:** All new governance adoptions

---

### Pattern 5: Waiver Lifecycle Management

**Context:** Managing temporary policy exceptions

**Problem:** Waivers accumulate and never get resolved

**Solution:** Structured waiver lifecycle with expiration

**Implementation:**

```yaml
# repo.manifest.yaml
waivers:
  max_duration_days: 90  # No waiver longer than 90 days
  
  approval_required:
    quality: ["tech-lead@company.com"]
    security: ["security-team@company.com", "manager@company.com"]
    architecture: ["architect@company.com"]
  
  notifications:
    warning_before_expiry_days: 14
    notify_on_creation: true
    notify_on_expiry: true
  
  auto_actions:
    on_expiry: block_ci
    on_overdue: create_hitl_issue
```

**Waiver Process:**

```bash
# 1. Create waiver
governance-cli waiver create \
  --file "src/legacy/old-code.js" \
  --policy "code-coverage" \
  --reason "Legacy code, refactoring planned for Q2" \
  --expires "2024-06-30" \
  --owner "john.doe@company.com" \
  --issue-link "https://jira.company.com/PROJ-123"

# 2. Approval (automatic notification sent)
governance-cli waiver approve W-2024-001 \
  --approver "tech-lead@company.com"

# 3. Monitoring (automated)
# - 14 days before expiry: Warning email
# - On expiry: Block CI/CD
# - Create HITL issue

# 4. Resolution
governance-cli waiver resolve W-2024-001 \
  --resolution "Code refactored, now compliant" \
  --commit "abc123def"

# Or extend if needed
governance-cli waiver extend W-2024-001 \
  --expires "2024-09-30" \
  --reason "Refactoring taking longer than expected"
```

**Waiver Dashboard:**

```bash
# Generate waiver report
governance-cli report --waivers

# Output:
# Active Waivers: 5
# Expiring Soon: 2
# Overdue: 0
# 
# W-2024-001: src/legacy/old-code.js (expires in 12 days)
# W-2024-003: tests/integration/old-test.js (expires in 45 days)
```

**Benefits:**
- ✅ Prevents waiver accumulation
- ✅ Forces resolution
- ✅ Clear accountability
- ✅ Automated tracking

**When to use:** Always use for policy exceptions

---

### Pattern 6: HITL Escalation Patterns

**Context:** Agents need human input for critical decisions

**Problem:** Agents stuck waiting or make wrong decisions

**Solution:** Clear HITL escalation patterns

**Implementation:**

```yaml
# repo.manifest.yaml
hitl:
  # Define what requires HITL
  required_for:
    - boundary_violation
    - architecture_change
    - security_policy_change
    - production_deployment
    - data_migration
  
  # Define approvers
  approvers:
    boundary_violation: ["architect@company.com"]
    architecture_change: ["architect@company.com", "tech-lead@company.com"]
    security_policy_change: ["security-team@company.com"]
    production_deployment: ["ops-lead@company.com", "manager@company.com"]
  
  # Escalation ladder
  escalation:
    - level: 1
      approvers: ["tech-lead@company.com"]
      timeout_hours: 4
    - level: 2
      approvers: ["manager@company.com"]
      timeout_hours: 8
    - level: 3
      approvers: ["director@company.com"]
      timeout_hours: 24
  
  # SLA
  sla:
    response_time_hours: 4
    resolution_time_hours: 24
```

**Example Escalation:**

```bash
# Agent detects need for HITL
governance-cli hitl escalate \
  --type boundary_violation \
  --agent code-assistant \
  --context "Attempting to refactor auth system" \
  --impact "Breaks current boundary definitions" \
  --options '["Allow refactoring", "Adjust boundaries", "Use different approach"]'

# Creates HITL issue
# H-2024-042: Boundary violation - Auth refactoring
# Agent: code-assistant
# Assigned to: architect@company.com
# SLA: 4 hours

# Human reviews and responds
governance-cli hitl resolve H-2024-042 \
  --decision "Adjust boundaries" \
  --rationale "Auth is becoming a shared service" \
  --action "Update boundary definitions to allow"

# Agent proceeds with updated boundaries
```

**Benefits:**
- ✅ Clear escalation path
- ✅ Defined SLAs
- ✅ Accountability
- ✅ Prevents bottlenecks

**When to use:** All agent-driven development

---

## CI/CD Patterns

### Pattern 7: Multi-Stage Governance Pipeline

**Context:** Balance speed with thoroughness in CI/CD

**Problem:** All checks in one stage is slow; skipping checks is risky

**Solution:** Multi-stage pipeline with progressive checks

**Implementation:**

```yaml
# .github/workflows/governance.yml
name: Governance Pipeline

on: [push, pull_request]

jobs:
  # Stage 1: Fast Checks (< 2 minutes)
  quick-validation:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Quick Validation
        run: |
          governance-cli validate --fast
          governance-cli verify --policies-only
  
  # Stage 2: Standard Checks (< 10 minutes)
  # Only if Stage 1 passes
  standard-verification:
    needs: quick-validation
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Standard Verification
        run: |
          governance-cli verify --boundaries
          governance-cli verify --quality-gates
  
  # Stage 3: Security Checks (< 15 minutes)
  # Parallel with Stage 2
  security-scan:
    needs: quick-validation
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Security Scan
        run: |
          governance-cli verify --security
          governance-cli verify --secrets
  
  # Stage 4: Full Verification (only on main)
  full-verification:
    needs: [standard-verification, security-scan]
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Full Verification
        run: |
          governance-cli verify --full
          governance-cli report --generate
```

**Pipeline Flow:**

```
┌─────────────────────┐
│  Quick Validation   │  ← 2 min (always)
│  - Manifest         │
│  - Policies         │
└──────────┬──────────┘
           │
           ├─────────────────────┬──────────────────────┐
           ▼                     ▼                      ▼
┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│   Standard       │  │   Security       │  │   Performance    │
│   - Boundaries   │  │   - Vulns        │  │   - Benchmarks   │
│   - Quality      │  │   - Secrets      │  │   - Coverage     │
└────────┬─────────┘  └────────┬─────────┘  └────────┬─────────┘
         │                     │                      │
         └─────────────────────┴──────────────────────┘
                               │
                               ▼
                    ┌──────────────────┐
                    │ Full Verification│  ← Only on main
                    │ - Complete audit │
                    │ - Generate report│
                    └──────────────────┘
```

**Benefits:**
- ✅ Fast feedback (2 minutes)
- ✅ Parallel execution
- ✅ Progressive depth
- ✅ Resource efficient

**When to use:** All CI/CD pipelines

---

### Pattern 8: Environment-Specific Governance

**Context:** Different requirements for different environments

**Problem:** Same rules for dev/staging/prod is too rigid or too loose

**Solution:** Environment-specific manifests

**Implementation:**

```yaml
# repo.manifest.yaml (base)
project:
  name: my-app
  type: fullstack

governance:
  version: "1.0.0"

# Defaults for all environments
quality_gates:
  coverage_threshold: 80
```

```yaml
# repo.manifest.dev.yaml
extends: repo.manifest.yaml

# Relaxed for development
quality_gates:
  coverage_threshold: 70
  
security:
  scan_level: basic
  
hitl:
  required_for:
    - architecture_change  # Only architecture needs HITL
```

```yaml
# repo.manifest.staging.yaml
extends: repo.manifest.yaml

# Standard checks
quality_gates:
  coverage_threshold: 80
  
security:
  scan_level: standard
```

```yaml
# repo.manifest.prod.yaml
extends: repo.manifest.yaml

# Strict for production
quality_gates:
  coverage_threshold: 90
  strict: true

security:
  scan_level: strict
  
hitl:
  required_for:
    - boundary_violation
    - architecture_change
    - security_policy_change
    - production_deployment  # All critical actions

deployment:
  approval_required: true
  approvers:
    - ops-lead@company.com
    - manager@company.com
```

**CI/CD Usage:**

```yaml
# .github/workflows/deploy.yml
jobs:
  deploy-dev:
    runs-on: ubuntu-latest
    steps:
      - run: governance-cli verify --manifest repo.manifest.dev.yaml
      - run: ./deploy.sh dev
  
  deploy-staging:
    runs-on: ubuntu-latest
    steps:
      - run: governance-cli verify --manifest repo.manifest.staging.yaml
      - run: ./deploy.sh staging
  
  deploy-prod:
    runs-on: ubuntu-latest
    steps:
      - run: governance-cli verify --manifest repo.manifest.prod.yaml
      - run: ./deploy.sh prod
```

**Benefits:**
- ✅ Appropriate rigor per environment
- ✅ Fast development iteration
- ✅ Strict production safeguards
- ✅ Clear expectations

**When to use:** Multi-environment deployments

---

### Pattern 9: Automated Waiver Cleanup

**Context:** Waivers accumulate over time

**Problem:** Expired/unnecessary waivers clutter system

**Solution:** Automated waiver lifecycle management

**Implementation:**

```yaml
# .github/workflows/waiver-cleanup.yml
name: Waiver Cleanup

on:
  schedule:
    - cron: '0 9 * * 1'  # Every Monday at 9am

jobs:
  cleanup:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Check Expiring Waivers
        run: |
          # List waivers expiring in 14 days
          governance-cli waiver list --expiring-within 14
      
      - name: Notify Owners
        run: |
          # Send reminder emails
          governance-cli waiver notify-expiring
      
      - name: Close Resolved Waivers
        run: |
          # Auto-close if issue is resolved
          governance-cli waiver auto-close --check-linked-issues
      
      - name: Generate Report
        run: |
          governance-cli report --waivers > waiver-report.md
      
      - name: Create Issue
        if: steps.cleanup.outputs.expiring_count > 0
        uses: actions/github-script@v6
        with:
          script: |
            github.rest.issues.create({
              owner: context.repo.owner,
              repo: context.repo.repo,
              title: 'Waivers Expiring Soon',
              body: fs.readFileSync('waiver-report.md', 'utf8')
            })
```

**Benefits:**
- ✅ Automatic cleanup
- ✅ No manual tracking needed
- ✅ Clear visibility
- ✅ Reduces technical debt

**When to use:** Projects using waivers

---

## Project Type Patterns

### Pattern 10: Monorepo Governance

**Context:** Managing governance in monorepo with multiple packages

**Problem:** Different packages have different needs

**Solution:** Root governance with package-specific overrides

**Implementation:**

```yaml
# Root: repo.manifest.yaml
project:
  name: my-monorepo
  type: monorepo

governance:
  version: "1.0.0"
  
  # Default for all packages
  policies:
    enabled:
      - constitution
      - principles

boundaries:
  # Each package is a boundary
  - name: package-a
    path: packages/package-a
    type: library
    
  - name: package-b
    path: packages/package-b
    type: application
    allowed_dependencies:
      - name: package-a
  
  - name: shared
    path: packages/shared
    type: library
    access: public
```

```yaml
# Package A: packages/package-a/repo.manifest.yaml
extends: ../../repo.manifest.yaml

project:
  name: package-a
  type: library

# Override for library
quality_gates:
  coverage_threshold: 90  # Higher for libraries
  documentation_required: true
```

```yaml
# Package B: packages/package-b/repo.manifest.yaml
extends: ../../repo.manifest.yaml

project:
  name: package-b
  type: application

# Override for application
quality_gates:
  coverage_threshold: 80
```

**Directory Structure:**

```
monorepo/
├── repo.manifest.yaml         # Root governance
├── packages/
│   ├── package-a/
│   │   ├── repo.manifest.yaml # Package-specific
│   │   └── src/
│   ├── package-b/
│   │   ├── repo.manifest.yaml # Package-specific
│   │   └── src/
│   └── shared/
│       └── src/
├── .github/
│   └── workflows/
│       └── governance.yml
```

**Validation:**

```bash
# Validate entire monorepo
governance-cli validate --root

# Validate specific package
governance-cli validate --package packages/package-a

# Check cross-package boundaries
governance-cli verify --boundaries --scope monorepo
```

**Benefits:**
- ✅ Consistent governance across packages
- ✅ Package-specific customization
- ✅ Cross-package boundary enforcement
- ✅ Simplified dependency management

**When to use:** Monorepo projects

---

### Pattern 11: Microservices Governance

**Context:** Multiple services with consistent governance

**Problem:** Governance drift across services

**Solution:** Shared governance config with service-specific overrides

**Implementation:**

```yaml
# Shared config: .governance/shared.yaml
governance:
  version: "1.0.0"
  policies:
    enabled:
      - constitution
      - principles
      - security_baseline

quality_gates:
  coverage_threshold: 80
  
security:
  scan_level: strict

api:
  documentation_required: true
  versioning_required: true
```

```yaml
# Service A: services/auth/repo.manifest.yaml
extends: ../../.governance/shared.yaml

project:
  name: auth-service
  type: microservice

boundaries:
  - name: api
    path: src/api
  - name: domain
    path: src/domain
  - name: infrastructure
    path: src/infrastructure

# Service-specific overrides
security:
  scan_level: maximum  # Auth requires maximum security
  additional_checks:
    - jwt_validation
    - password_strength
```

```yaml
# Service B: services/product/repo.manifest.yaml
extends: ../../.governance/shared.yaml

project:
  name: product-service
  type: microservice

# Service-specific boundaries
boundaries:
  - name: api
    path: src/api
  - name: domain
    path: src/domain
```

**Cross-Service Validation:**

```bash
# Validate all services
for service in services/*; do
  governance-cli validate --service $service
done

# Check service boundaries
governance-cli verify --boundaries --cross-service

# Ensure consistent APIs
governance-cli verify --api-contracts
```

**Benefits:**
- ✅ Consistent governance across services
- ✅ Service-specific flexibility
- ✅ Enforced API contracts
- ✅ Independent deployability

**When to use:** Microservices architecture

---

### Pattern 12: Full-Stack Governance

**Context:** Frontend + Backend in same repo

**Problem:** Different requirements for frontend vs backend

**Solution:** Boundary-based separation with shared governance

**Implementation:**

```yaml
# repo.manifest.yaml
project:
  name: my-fullstack-app
  type: fullstack

boundaries:
  # Frontend boundary
  - name: frontend
    path: src/frontend
    type: spa
    tech_stack: [react, typescript]
    
    quality_gates:
      coverage_threshold: 85
      
    specific_checks:
      - accessibility
      - performance
      - bundle_size
    
    allowed_dependencies:
      - name: shared
      - name: backend
        via: api_only  # Only API calls
    
  # Backend boundary
  - name: backend
    path: src/backend
    type: api
    tech_stack: [node, express, typescript]
    
    quality_gates:
      coverage_threshold: 90  # Higher for backend
      
    specific_checks:
      - api_documentation
      - error_handling
      - rate_limiting
    
    allowed_dependencies:
      - name: shared
      - name: database
    
  # Shared boundary
  - name: shared
    path: src/shared
    type: library
    access: public
    
    exports:
      - types/**
      - utils/**
      - constants/**
    
  # Database boundary
  - name: database
    path: src/database
    type: data
    
    specific_checks:
      - migration_safety
      - query_performance
    
    allowed_dependencies: []  # No dependencies
```

**Directory Structure:**

```
src/
├── frontend/
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   └── api/          # API client (only way to access backend)
├── backend/
│   ├── routes/
│   ├── controllers/
│   ├── services/
│   └── middleware/
├── shared/
│   ├── types/
│   ├── utils/
│   └── constants/
└── database/
    ├── migrations/
    ├── models/
    └── seeds/
```

**Benefits:**
- ✅ Clear frontend/backend separation
- ✅ Appropriate checks per stack
- ✅ Shared code management
- ✅ Type safety across boundaries

**When to use:** Full-stack applications

---

## Anti-Patterns to Avoid

### Anti-Pattern 1: ❌ God Boundary

**Problem:** One boundary contains everything

**Bad Example:**

```yaml
boundaries:
  - name: application
    path: src/**  # Everything!
    description: "All application code"
```

**Why it's bad:**
- No separation of concerns
- Cannot enforce architecture
- Governance becomes meaningless
- Technical debt accumulates

**Good Alternative:**

```yaml
boundaries:
  - name: ui
    path: src/ui
  - name: business-logic
    path: src/domain
  - name: data-access
    path: src/data
```

---

### Anti-Pattern 2: ❌ Waiver as Default

**Problem:** Creating waivers instead of fixing issues

**Bad Example:**

```bash
# Every failing check gets a waiver
governance-cli waiver create --file src/module.ts --policy code-coverage
governance-cli waiver create --file src/utils.ts --policy code-coverage
governance-cli waiver create --file src/service.ts --policy code-coverage
# ... 50 more waivers
```

**Why it's bad:**
- Defeats purpose of governance
- Accumulates technical debt
- Creates false sense of compliance
- No actual quality improvement

**Good Alternative:**

```bash
# Fix the issues
npm test -- --coverage

# Only waive truly exceptional cases
governance-cli waiver create \
  --file "src/legacy/old-module.js" \
  --policy "code-coverage" \
  --reason "Legacy code, rewrite scheduled Q2" \
  --expires "2024-06-30"
```

---

### Anti-Pattern 3: ❌ Ignoring Agent Escalations

**Problem:** Agents escalate but humans ignore

**Bad Example:**

```bash
# Agent escalates
Agent: "Need human review for boundary violation"

# Human ignores for days
# Agent stuck waiting
# Development blocked
```

**Why it's bad:**
- Blocks development
- Agents learn to avoid escalation
- Defeats purpose of HITL
- Creates bottlenecks

**Good Alternative:**

```yaml
# Set up SLAs
hitl:
  sla:
    response_time_hours: 4
    resolution_time_hours: 24
  
  notifications:
    channels: [slack, email]
    escalation:
      - timeout_hours: 4
        notify: ["tech-lead@company.com"]
      - timeout_hours: 8
        notify: ["manager@company.com"]

# Monitor and respond
governance-cli hitl list --status pending --sla-breach
```

---

### Anti-Pattern 4: ❌ Copy-Paste Policy Customization

**Problem:** Copying policies without understanding

**Bad Example:**

```yaml
# Just copied from example without reading
governance:
  policies:
    enabled:
      - constitution
      - principles
      - custom/java-spring-boot-policies  # We use Node.js!
      - custom/android-mobile-policies    # We're a web app!
```

**Why it's bad:**
- Irrelevant rules
- Confuses team
- Wrong checks run
- Wastes CI/CD time

**Good Alternative:**

```yaml
# Only relevant policies
governance:
  policies:
    enabled:
      - constitution
      - principles
      - custom/nodejs-api-policies
      - custom/react-frontend-policies

# Understand each policy
governance-cli policies show nodejs-api-policies
```

---

### Anti-Pattern 5: ❌ No Boundary Documentation

**Problem:** Boundaries exist but no one knows why

**Bad Example:**

```yaml
boundaries:
  - name: a
    path: src/a
  - name: b
    path: src/b
  # No descriptions or rationale
```

**Why it's bad:**
- No understanding of architecture
- Violations unclear
- Cannot reason about changes
- New developers confused

**Good Alternative:**

```yaml
boundaries:
  - name: presentation
    path: src/ui
    description: "User interface components and pages"
    rationale: |
      UI layer should only depend on application layer
      via hooks and contexts. Direct access to domain
      or infrastructure creates coupling and makes
      testing difficult.
    
    examples:
      good: "Using useUser() hook to access user data"
      bad: "Directly importing UserRepository"
    
  - name: application
    path: src/application
    description: "Use cases and application services"
    rationale: |
      Application layer orchestrates domain logic
      and infrastructure. Contains no business logic
      itself, only coordination.
```

---

### Anti-Pattern 6: ❌ All-or-Nothing Quality Gates

**Problem:** Same strict rules for all code

**Bad Example:**

```yaml
quality_gates:
  coverage_threshold: 95  # For everything!
  complexity_max: 5       # For everything!
  duplication_max: 0      # For everything!
```

**Why it's bad:**
- Unrealistic for legacy code
- Blocks all progress
- Forces wasteful waivers
- Ignores context

**Good Alternative:**

```yaml
quality_gates:
  # Reasonable global defaults
  coverage_threshold: 80
  
boundaries:
  - name: new-feature
    path: src/features/new
    quality_gates:
      coverage_threshold: 95  # Strict for new code
  
  - name: legacy
    path: src/legacy
    quality_gates:
      coverage_threshold: 60  # Realistic for legacy
      
    waiver:
      reason: "Legacy code being gradually improved"
      plan: "Increase 5% per quarter"
```

---

### Anti-Pattern 7: ❌ Skipping CI Checks Locally

**Problem:** Always using `--no-verify` or skipping hooks

**Bad Example:**

```bash
# Always skipping checks
git commit --no-verify
git push --no-verify

# Disabling hooks
governance-cli hooks disable
# Never re-enabling
```

**Why it's bad:**
- Late feedback (only in CI)
- Wastes CI resources
- More iterations needed
- Slows down development

**Good Alternative:**

```bash
# Keep hooks enabled
governance-cli hooks enable

# Use fast mode for development
governance-cli configure-hooks --mode fast

# Only skip in true emergencies
git commit --no-verify  # Rarely!

# Always re-enable
governance-cli hooks enable
```

---

### Anti-Pattern 8: ❌ Mega-Manifest

**Problem:** Single manifest file with thousands of lines

**Bad Example:**

```yaml
# repo.manifest.yaml (5000 lines!)
project:
  # ...

boundaries:
  # 50 boundaries defined here...
  
quality_gates:
  # 100 custom rules...
  
security:
  # 200 security rules...
  
# etc...
```

**Why it's bad:**
- Hard to maintain
- Difficult to understand
- Merge conflicts
- Cannot reuse

**Good Alternative:**

```yaml
# repo.manifest.yaml (main)
project:
  name: my-app

governance:
  version: "1.0.0"

# Import modular configs
imports:
  - .governance/boundaries.yaml
  - .governance/quality-gates.yaml
  - .governance/security.yaml
```

```yaml
# .governance/boundaries.yaml
boundaries:
  - name: ui
    path: src/ui
    import: .governance/boundaries/ui.yaml
```

---

## Code Organization Patterns

### Pattern 13: Feature-Based Organization

**Context:** Organizing code by features rather than technical layers

**Implementation:**

```yaml
# repo.manifest.yaml
boundaries:
  # Each feature is a boundary
  - name: user-management
    path: src/features/user-management
    exports:
      - api/**
      - types/**
    
  - name: order-processing
    path: src/features/order-processing
    exports:
      - api/**
      - types/**
    
  - name: payment
    path: src/features/payment
    exports:
      - api/**
      - types/**
    allowed_dependencies:
      - name: order-processing
        via: api
```

**Directory Structure:**

```
src/
├── features/
│   ├── user-management/
│   │   ├── api/
│   │   ├── domain/
│   │   ├── ui/
│   │   └── data/
│   ├── order-processing/
│   │   ├── api/
│   │   ├── domain/
│   │   ├── ui/
│   │   └── data/
│   └── payment/
│       ├── api/
│       ├── domain/
│       └── data/
└── shared/
    ├── components/
    └── utils/
```

**Benefits:**
- ✅ Features are self-contained
- ✅ Easy to find related code
- ✅ Clear feature boundaries
- ✅ Easy to remove features

**When to use:** Medium to large applications with distinct features

---

### Pattern 14: Shared Utilities Organization

**Context:** Organizing shared utilities and helpers

**Implementation:**

```
src/
├── shared/
│   ├── utils/
│   │   ├── string/
│   │   │   ├── capitalize.ts
│   │   │   ├── slugify.ts
│   │   │   └── index.ts
│   │   ├── date/
│   │   │   ├── format.ts
│   │   │   ├── parse.ts
│   │   │   └── index.ts
│   │   └── validation/
│   │       ├── email.ts
│   │       ├── phone.ts
│   │       └── index.ts
│   ├── types/
│   │   ├── common.ts
│   │   ├── api.ts
│   │   └── domain.ts
│   └── constants/
│       ├── config.ts
│       └── enums.ts
```

**Governance:**

```yaml
boundaries:
  - name: shared-utils
    path: src/shared
    
    # Must be pure functions
    rules:
      - no_side_effects
      - no_external_dependencies
      - must_have_tests
      - must_have_docs
    
    quality_gates:
      coverage_threshold: 95  # High for utilities
```

---

## Boundary Definition Patterns

### Pattern 15: API Gateway Pattern

**Context:** External clients accessing internal services

**Implementation:**

```yaml
boundaries:
  - name: api-gateway
    path: src/api-gateway
    description: "Single entry point for external clients"
    access: public
    
    allowed_dependencies:
      - name: user-service
        via: api
      - name: order-service
        via: api
      - name: payment-service
        via: api
    
    responsibilities:
      - authentication
      - rate_limiting
      - request_routing
      - response_aggregation
  
  - name: user-service
    path: src/services/user
    access: internal  # Not directly accessible
    
  - name: order-service
    path: src/services/order
    access: internal
  
  - name: payment-service
    path: src/services/payment
    access: internal
```

---

### Pattern 16: Backend for Frontend (BFF) Pattern

**Context:** Different frontends need different API shapes

**Implementation:**

```yaml
boundaries:
  - name: web-bff
    path: src/bff/web
    description: "Backend for web frontend"
    serves: web-frontend
    allowed_dependencies:
      - user-service
      - product-service
  
  - name: mobile-bff
    path: src/bff/mobile
    description: "Backend for mobile apps"
    serves: mobile-app
    allowed_dependencies:
      - user-service
      - product-service
  
  - name: web-frontend
    path: src/frontend/web
    allowed_dependencies:
      - name: web-bff
        via: api_only
  
  - name: mobile-app
    path: src/mobile
    allowed_dependencies:
      - name: mobile-bff
        via: api_only
```

---

## Quality Gate Patterns

### Pattern 17: Progressive Quality Gates

**Context:** Increasing quality over time

**Implementation:**

```yaml
# Quarter 1
quality_gates:
  coverage_threshold: 70
  
# Quarter 2
quality_gates:
  coverage_threshold: 75
  
# Quarter 3
quality_gates:
  coverage_threshold: 80

# Set roadmap
quality_roadmap:
  - date: "2024-01-01"
    coverage_threshold: 70
  - date: "2024-04-01"
    coverage_threshold: 75
  - date: "2024-07-01"
    coverage_threshold: 80
  - date: "2024-10-01"
    coverage_threshold: 85
```

---

### Pattern 18: Context-Specific Quality Gates

**Context:** Different quality requirements for different code

**Implementation:**

```yaml
quality_gates:
  # Critical infrastructure
  - name: critical
    paths:
      - src/auth/**
      - src/payment/**
      - src/security/**
    requirements:
      coverage_threshold: 95
      complexity_max: 5
      security_scan: maximum
      review_required: 2  # Two reviewers
  
  # Standard application code
  - name: standard
    paths:
      - src/features/**
    requirements:
      coverage_threshold: 80
      complexity_max: 10
      security_scan: standard
      review_required: 1
  
  # UI components
  - name: ui
    paths:
      - src/components/**
    requirements:
      coverage_threshold: 70
      accessibility_required: true
      visual_regression_tests: true
```

---

## Security Patterns

### Pattern 19: Defense in Depth

**Context:** Multiple layers of security

**Implementation:**

```yaml
security:
  layers:
    # Layer 1: Pre-commit
    - name: local
      checks:
        - secret_detection
        - basic_linting
    
    # Layer 2: CI/CD
    - name: ci
      checks:
        - dependency_scanning
        - static_analysis
        - secret_scanning
    
    # Layer 3: Security review
    - name: security_review
      required_for:
        - paths: ["src/auth/**", "src/payment/**"]
        - changes: ["crypto", "password", "token"]
    
    # Layer 4: Production
    - name: runtime
      checks:
        - runtime_monitoring
        - anomaly_detection
```

---

### Pattern 20: Secret Management Pattern

**Context:** Never commit secrets, always use secure storage

**Implementation:**

```yaml
security:
  secrets:
    # Detect secrets in code
    detection:
      enabled: true
      patterns:
        - api_key
        - password
        - token
        - private_key
    
    # Require environment variables
    storage:
      allowed:
        - environment_variables
        - secret_manager
        - key_vault
      forbidden:
        - hardcoded
        - config_files
        - .env_committed
    
    # Validation
    validation:
      require_rotation: true
      rotation_days: 90
      require_expiry: true
```

**Code Pattern:**

```typescript
// ❌ Bad
const API_KEY = "sk_live_1234567890abcdef";

// ✅ Good
const API_KEY = process.env.API_KEY;
if (!API_KEY) {
  throw new Error('API_KEY environment variable is required');
}
```

---

## Testing Patterns

### Pattern 21: Test Pyramid Pattern

**Context:** Balanced test suite with appropriate test types

**Implementation:**

```yaml
testing:
  pyramid:
    # Base: Unit tests (70%)
    - type: unit
      target_percentage: 70
      requirements:
        coverage_threshold: 90
        performance: fast
        isolation: true
    
    # Middle: Integration tests (20%)
    - type: integration
      target_percentage: 20
      requirements:
        coverage_threshold: 70
        performance: medium
        isolation: false
    
    # Top: E2E tests (10%)
    - type: e2e
      target_percentage: 10
      requirements:
        coverage_threshold: 50
        performance: slow
        critical_paths_only: true
```

---

### Pattern 22: Test Organization Pattern

**Context:** Organizing tests to mirror source structure

**Implementation:**

```
src/
├── features/
│   └── user-management/
│       ├── domain/
│       │   └── User.ts
│       └── services/
│           └── UserService.ts
└── shared/
    └── utils/
        └── validation.ts

tests/
├── unit/
│   ├── features/
│   │   └── user-management/
│   │       ├── domain/
│   │       │   └── User.test.ts
│   │       └── services/
│   │           └── UserService.test.ts
│   └── shared/
│       └── utils/
│           └── validation.test.ts
├── integration/
│   └── features/
│       └── user-management/
│           └── user-api.integration.test.ts
└── e2e/
    └── user-flows.e2e.test.ts
```

---

## Documentation Patterns

### Pattern 23: Living Documentation

**Context:** Documentation that stays in sync with code

**Implementation:**

```yaml
documentation:
  # Generate from code
  auto_generated:
    - api_docs:
        source: src/**/*.ts
        format: openapi
        output: docs/api.yaml
    
    - type_docs:
        source: src/**/*.ts
        format: markdown
        output: docs/types.md
  
  # Require documentation
  required_for:
    - public_api: true
    - exported_functions: true
    - complex_logic: true
  
  # Validation
  validation:
    check_outdated: true
    check_broken_links: true
    check_examples: true
```

---

### Pattern 24: ADR (Architecture Decision Records)

**Context:** Documenting architectural decisions

**Implementation:**

```
docs/
└── architecture/
    └── decisions/
        ├── 0001-use-microservices.md
        ├── 0002-choose-postgres.md
        ├── 0003-api-versioning.md
        └── template.md
```

**Template:**

```markdown
# ADR-0001: Use Microservices Architecture

## Status
Accepted

## Context
We need to scale our application independently...

## Decision
We will use microservices architecture...

## Consequences
### Positive
- Independent scaling
- Technology flexibility

### Negative
- Increased complexity
- Need service mesh

## Governance Impact
- New boundaries per service
- Cross-service testing required
- API versioning mandatory
```

---

## Agent Interaction Patterns

### Pattern 25: Guided Agent Workflow

**Context:** Agents working within defined workflows

**Implementation:**

```yaml
agents:
  workflows:
    - name: feature-development
      steps:
        1. agent: code-assistant
           action: understand-requirements
           approval: auto
        
        2. agent: code-assistant
           action: write-tests
           approval: auto
        
        3. agent: code-assistant
           action: implement-feature
           approval: auto
        
        4. agent: review-bot
           action: code-review
           approval: hitl_if_issues
        
        5. agent: deploy-bot
           action: deploy-staging
           approval: auto
        
        6. human: tech-lead
           action: review-staging
           approval: required
        
        7. agent: deploy-bot
           action: deploy-production
           approval: auto
```

---

### Pattern 26: Agent Learning Loop

**Context:** Agents learning from human feedback

**Implementation:**

```yaml
agents:
  learning:
    enabled: true
    
    feedback_sources:
      - code_reviews
      - hitl_decisions
      - waiver_approvals
      - test_results
    
    improvements:
      - better_code_generation
      - fewer_boundary_violations
      - improved_test_coverage
      - better_escalation_judgment
    
    metrics:
      - approval_rate
      - iteration_count
      - hitl_escalation_rate
      - code_quality_score
```

---

## Related Documentation

- [FAQ](FAQ.md) - Frequently asked questions
- [Troubleshooting Guide](TROUBLESHOOTING.md) - Problem-solving
- [Getting Started](getting-started/QUICK_START.md) - Installation and setup
- [How-To Guides](guides/) - Step-by-step guides
- [Architecture Documentation](architecture/) - System architecture
- [Reference Documentation](reference/) - Complete reference

---

**Last Updated:** 2026-01-22  
**Version:** 1.0.0  
**Feedback:** [Open an issue](https://github.com/your-org/governance/issues) or [contribute](../CONTRIBUTING.md)
