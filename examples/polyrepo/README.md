# Polyrepo Governance Example

**Purpose:** Demonstrate AI-Native Governance across multiple independent repositories.

## Overview

This example shows governance applied to a polyrepo setup with:
- A frontend repository (`frontend-app/`)
- A backend API repository (`backend-api/`)
- A shared library repository (`shared-lib/`)

Each repository is independent but follows the same governance framework with coordination between them.

## Structure

```
polyrepo/
├── frontend-app/              # Frontend repository
│   ├── .repo/                 # Governance framework
│   ├── src/
│   └── package.json
├── backend-api/               # Backend repository
│   ├── .repo/                 # Governance framework
│   ├── src/
│   └── package.json
└── shared-lib/                # Shared library repository
    ├── .repo/                 # Governance framework
    ├── src/
    └── package.json
```

## Key Features Demonstrated

### 1. Independent Repositories
- Each repo has its own `.repo/` governance folder
- Each repo can be cloned and developed independently
- Each repo has its own CI/CD pipeline
- Version management between repos

### 2. Cross-Repo Coordination
- Shared governance principles
- Coordinated releases
- Dependency management between repos
- Breaking change notifications

### 3. Governance Per Repository
- Same policy files but customized per repo
- Boundaries specific to each repo type
- Agent guides for each repository
- Independent waiver management

### 4. CI/CD Integration
- Each repo has its own workflows
- Cross-repo integration tests
- Coordinated deployments
- Version compatibility checks

## Quick Start

### 1. Prerequisites
- Node.js 18+ and npm 9+
- Git

### 2. Clone Repositories

```bash
# In polyrepo example directory
cd examples/polyrepo

# Each subdirectory represents an independent repository
cd shared-lib && npm install
cd ../backend-api && npm install
cd ../frontend-app && npm install
```

### 3. Develop

```bash
# Shared library
cd shared-lib
npm run build
npm test

# Backend API
cd ../backend-api
npm run dev

# Frontend app
cd ../frontend-app
npm run dev
```

## Repository Details

### shared-lib
Common utilities and types shared across frontend and backend.

**Governance Focus:**
- Strict semantic versioning
- Breaking change detection
- Comprehensive tests
- Clear upgrade guides

### backend-api
REST API server that uses shared-lib.

**Governance Focus:**
- API contract management
- Security policies
- Performance budgets
- Deployment safety

### frontend-app
Web application that calls backend-api and uses shared-lib.

**Governance Focus:**
- Bundle size limits
- Dependency updates
- Cross-browser testing
- Accessibility compliance

## Cross-Repo Workflow

### Scenario: Update Shared Library

1. **Make changes in shared-lib**
   - Update code
   - Run tests
   - Increment version (semantic versioning)
   - Create release

2. **Update backend-api**
   - Update shared-lib dependency
   - Test integration
   - Deploy if compatible

3. **Update frontend-app**
   - Update shared-lib dependency
   - Test integration
   - Deploy if compatible

### Breaking Changes

When shared-lib has breaking changes:

1. **Shared-lib creates migration guide**
2. **Backend-api and frontend-app coordinate updates**
3. **Staged rollout** - one repo at a time
4. **HITL approval** required for breaking changes

## Governance Differences from Monorepo

| Aspect | Monorepo | Polyrepo |
|--------|----------|----------|
| **Governance location** | One .repo/ for all | .repo/ per repository |
| **Boundaries** | Package-level | Repository-level |
| **Versioning** | Internal workspaces | Semantic versioning |
| **CI/CD** | Single pipeline | Pipeline per repo |
| **Coordination** | Automatic | Manual with checks |
| **Dependencies** | Workspace links | NPM dependencies |

## Best Practices

### 1. Version Management
- Use semantic versioning strictly
- Document all breaking changes
- Provide migration guides
- Use dependency lock files

### 2. Release Coordination
- Tag all releases
- Create release notes
- Test cross-repo compatibility
- Coordinate major version bumps

### 3. Communication
- Use GitHub releases for announcements
- Document API changes in ADRs
- Notify dependent teams of changes
- Maintain changelog per repo

### 4. Testing
- Test each repo independently
- Add cross-repo integration tests
- Verify version compatibility
- Test upgrade paths

## Troubleshooting

### Issue: Version mismatch between repos
**Solution:** Check dependency versions and ensure compatibility matrix is up to date.

### Issue: Breaking change in shared-lib
**Solution:** Follow breaking change process with migration guide and coordinated updates.

### Issue: Circular dependencies
**Solution:** Review architecture - shared-lib should not depend on frontend or backend.

## Next Steps

1. **Review each repository** - Understand structure and governance
2. **Make a change** - Try updating shared-lib and propagating changes
3. **Test coordination** - Practice breaking change workflow
4. **Adapt** - Copy structure to your polyrepo setup

## Related Examples

- [Monorepo Example](../monorepo/) - Single repository approach
- [Full-Stack Example](../fullstack/) - Complete application
- [Microservices Example](../microservices/) - Service-oriented architecture

---

**Status:** Complete working example  
**Complexity:** Medium-High  
**Best For:** Teams with independent repositories that need coordination  
**Time to Setup:** 45 minutes
