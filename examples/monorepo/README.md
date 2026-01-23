# Monorepo Governance Example

**Purpose:** Demonstrate AI-Native Governance in a realistic monorepo with multiple packages.

## Overview

This example shows a monorepo containing:
- A shared UI component library (`packages/ui`)
- A web application (`packages/web-app`)
- A REST API (`packages/api`)
- Shared utilities (`packages/utils`)

Each package has governance configured with:
- Clear boundaries between packages
- Quality gates and security policies
- Agent guides for each directory
- CI/CD integration

## Structure

```
monorepo/
├── .repo/                        # Governance framework
│   ├── policy/                   # Governance policies
│   ├── agents/                   # Agent configurations
│   ├── docs/                     # Documentation
│   └── repo.manifest.yaml        # Command manifest
├── packages/
│   ├── ui/                       # Component library
│   ├── web-app/                  # Frontend application
│   ├── api/                      # Backend API
│   └── utils/                    # Shared utilities
├── P0TODO.md                     # Critical tasks
├── P1TODO.md                     # High priority tasks
├── P2TODO.md                     # Normal priority tasks
└── package.json                  # Root package.json with workspaces
```

## Key Features Demonstrated

### 1. Package Boundaries
- Each package has clear dependencies
- No circular dependencies allowed
- Import rules enforced by boundary checker
- Cross-package imports require justification

### 2. Governance Policies
- **CONSTITUTION**: Core governance principles
- **PRINCIPLES**: 25 development principles
- **BOUNDARIES**: Layer architecture and import rules
- **QUALITY_GATES**: Performance and size budgets
- **SECURITY_BASELINE**: Security requirements
- **HITL**: Human-in-the-loop escalation rules
- **WAIVERS**: Exception handling process

### 3. Agent Framework
- Primary agent: Full development capabilities
- Secondary agent: Refactoring and maintenance
- Reviewer: Human approval for waivers
- Release: Human control of deployments

### 4. CI/CD Integration
- Automated governance checks on every PR
- Boundary validation
- Security scanning
- Quality gate enforcement
- Release automation

## Quick Start

### 1. Prerequisites
- Node.js 18+ and npm 9+
- Git

### 2. Installation

```bash
# Clone or copy this example
cd examples/monorepo

# Install dependencies for all packages
npm install

# Verify governance setup
npm run check:governance
```

### 3. Try It Out

```bash
# Run all tests
npm test

# Build all packages
npm run build

# Run the web app
npm run dev:web

# Run the API
npm run dev:api
```

### 4. Governance Verification

```bash
# Check boundaries
npm run check:boundaries

# Run security checks
npm run check:security

# Full CI checks
npm run check:ci
```

## Learning Path

Follow these guides in order:

1. **[Getting Started](../../docs/getting-started/QUICK_START.md)** - Understand the basics
2. **[Manifest Configuration](.repo/repo.manifest.yaml)** - See how commands are configured
3. **[Policy Files](.repo/policy/)** - Review governance policies
4. **[Agent Guides](.repo/agents/)** - Understand agent capabilities
5. **[Boundary Rules](.repo/policy/BOUNDARIES.md)** - Learn layer architecture

## Scenarios Demonstrated

### Scenario 1: Adding a New Feature
Located in: `examples/monorepo/scenarios/add-feature.md`

Shows:
- Creating a new component in `packages/ui`
- Using it in `packages/web-app`
- Following agent three-pass process
- Generating agent logs

### Scenario 2: Cross-Package Refactoring
Located in: `examples/monorepo/scenarios/cross-package-refactor.md`

Shows:
- Moving shared code to `packages/utils`
- Updating imports in multiple packages
- Boundary validation
- ADR creation for cross-package changes

### Scenario 3: Security Update
Located in: `examples/monorepo/scenarios/security-update.md`

Shows:
- Responding to security vulnerability
- Emergency waiver process
- Fast-track deployment
- Post-fix remediation

### Scenario 4: Breaking Change
Located in: `examples/monorepo/scenarios/breaking-change.md`

Shows:
- Making a breaking change to API contract
- Versioning strategy
- HITL escalation
- Migration plan

## Package Details

### packages/ui
Component library with reusable React components.

**Boundaries:**
- Can import: `packages/utils`
- Cannot import: `packages/web-app`, `packages/api`
- Layer: Presentation

**Key Files:**
- `src/Button/Button.tsx` - Example component
- `AGENT.md` - Agent guide for UI package

### packages/web-app
Frontend web application using React.

**Boundaries:**
- Can import: `packages/ui`, `packages/utils`
- Cannot import: `packages/api` (backend)
- Layer: Application

**Key Files:**
- `src/App.tsx` - Main application
- `AGENT.md` - Agent guide for web app

### packages/api
REST API using Express.

**Boundaries:**
- Can import: `packages/utils`
- Cannot import: `packages/ui`, `packages/web-app`
- Layer: Domain/Data

**Key Files:**
- `src/server.ts` - Express server
- `AGENT.md` - Agent guide for API

### packages/utils
Shared utilities and helpers.

**Boundaries:**
- Cannot import any other packages
- Layer: Platform

**Key Files:**
- `src/validation.ts` - Validation utilities
- `AGENT.md` - Agent guide for utils

## Governance in Action

### Example PR Workflow

1. **Agent creates PR** with new feature
2. **Automated checks run:**
   - Boundary checker validates imports
   - Security scanner checks for vulnerabilities
   - Quality gates check bundle size
   - Tests run
3. **Agent provides evidence:**
   - AGENT_LOG.md with three-pass process
   - Test results
   - Boundary verification
4. **Human reviewer:**
   - Reviews changes
   - Approves or requests changes
   - Can grant waivers if needed
5. **Merge** when all checks pass

### Example Waiver Request

```yaml
# From .repo/waivers/2026-01-22-bundle-size.yaml
waiver_id: W-2026-01-22-001
policy: QUALITY_GATES
violation: Bundle size 151KB (exceeds 150KB limit)
justification: |
  New charting library adds 3KB. Provides critical business value.
  Will be optimized in next sprint.
approved_by: tech-lead
expires: 2026-02-22
remediation_plan: |
  - Sprint 42: Implement code splitting
  - Sprint 43: Lazy load chart components
  - Expected result: 135KB bundle size
```

## Troubleshooting

### Issue: Boundary check fails
**Solution:** Review `.repo/policy/BOUNDARIES.md` and ensure imports follow layer rules.

### Issue: Commands not found
**Solution:** Run `npm install` at root to install all dependencies.

### Issue: Governance check fails
**Solution:** Ensure `.repo/repo.manifest.yaml` has all commands filled in (no `<UNKNOWN>`).

## Common Questions

### Q: Can I customize policies?
**A:** Yes! Edit files in `.repo/policy/` but maintain the structure. See [HOW_TO_CUSTOMIZE_POLICIES.md](../../docs/guides/HOW_TO_CUSTOMIZE_POLICIES.md).

### Q: How do I add a new package?
**A:** 
1. Create package in `packages/`
2. Add AGENT.md to the package
3. Update boundary rules in `.repo/policy/BOUNDARIES.md`
4. Add to root `package.json` workspaces

### Q: How strict are the boundaries?
**A:** Boundaries are enforced but can be waived with justification. Follow the waiver process in `.repo/policy/WAIVERS.md`.

### Q: Can I use a different package manager?
**A:** Yes! Update `.repo/repo.manifest.yaml` to use your package manager (yarn, pnpm, etc.).

## Next Steps

1. **Explore the code** - Look at each package and AGENT.md files
2. **Review policies** - Read `.repo/policy/` files
3. **Try scenarios** - Follow the example scenarios
4. **Adapt to your project** - Copy structure to your monorepo
5. **Customize** - Modify policies and boundaries for your needs

## Related Examples

- [Polyrepo Example](../polyrepo/) - Multiple repositories with governance
- [Full-Stack Example](../fullstack/) - Complete application with governance
- [Microservices Example](../microservices/) - Microservices architecture with governance

## Support

For questions or issues:
- See [FAQ](../../docs/FAQ.md)
- Check [Troubleshooting Guide](../../docs/TROUBLESHOOTING.md)
- Review [Documentation](../../docs/)

---

**Status:** Complete working example  
**Complexity:** Medium  
**Best For:** Teams with multiple related packages in one repository  
**Time to Setup:** 30 minutes
