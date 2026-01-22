# Governance Framework Examples

This directory contains working examples demonstrating the AI-Native Governance Framework in various architectural patterns and scenarios.

## Available Examples

### 1. [Monorepo Example](./monorepo/)
**Complexity:** Medium | **Setup Time:** 30 minutes

Demonstrates governance in a monorepo with multiple packages:
- 4 packages (UI, Web App, API, Utils)
- Layer architecture boundaries
- Package-level governance
- Shared governance policies

**Best For:** Teams managing multiple related packages in one repository

**Key Learnings:**
- How to define package boundaries
- Layer architecture enforcement
- Shared governance configuration
- Package dependency management

---

### 2. [Polyrepo Example](./polyrepo/)
**Complexity:** Medium-High | **Setup Time:** 45 minutes

Demonstrates governance across multiple independent repositories:
- 3 independent repos (Frontend, Backend, Shared Library)
- Cross-repo coordination
- Version management
- Breaking change workflows

**Best For:** Teams with independent repositories that need coordination

**Key Learnings:**
- Repository-level governance
- Cross-repo dependency management
- Coordinated releases
- Breaking change handling

---

### 3. [Full-Stack Example](./fullstack/)
**Complexity:** High | **Setup Time:** 60 minutes

Complete full-stack application with governance:
- React frontend + Node.js backend + PostgreSQL
- Authentication and authorization
- Security implementation
- Complete CI/CD pipeline

**Best For:** Full-stack applications with frontend, backend, and database

**Key Learnings:**
- Complete layer architecture implementation
- Security policies in practice
- Quality gates enforcement
- End-to-end governance

---

### 4. [Microservices Example](./microservices/)
**Complexity:** Very High | **Setup Time:** 90 minutes

Microservices architecture with governance:
- 4 microservices + API Gateway
- Service boundaries
- Distributed patterns
- Service-level governance

**Best For:** Large-scale distributed systems

**Key Learnings:**
- Service boundary enforcement
- Distributed governance
- Inter-service communication rules
- Microservices patterns

---

## Quick Start Guide

### Choose Your Example

**New to governance?** → Start with [Monorepo Example](./monorepo/)

**Using multiple repos?** → Try [Polyrepo Example](./polyrepo/)

**Building a web app?** → Check out [Full-Stack Example](./fullstack/)

**Working with microservices?** → Explore [Microservices Example](./microservices/)

### Common Setup Steps

1. **Navigate to example directory**
   ```bash
   cd examples/[example-name]
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Verify governance**
   ```bash
   npm run check:governance
   ```

4. **Run the example**
   ```bash
   npm run dev
   ```

## What Each Example Demonstrates

| Feature | Monorepo | Polyrepo | Full-Stack | Microservices |
|---------|----------|----------|------------|---------------|
| **Package Boundaries** | ✅ | ⚠️ | ✅ | ✅ |
| **Layer Architecture** | ✅ | ✅ | ✅ | ✅ |
| **Security Policies** | Basic | Basic | ✅ | ✅ |
| **Quality Gates** | ✅ | ✅ | ✅ | ✅ |
| **CI/CD Integration** | ✅ | ✅ | ✅ | ✅ |
| **AGENT.md Guides** | ✅ | ✅ | ✅ | ✅ |
| **Cross-Repo Coordination** | ❌ | ✅ | ❌ | ⚠️ |
| **Service Boundaries** | ❌ | ❌ | ❌ | ✅ |
| **Distributed Patterns** | ❌ | ❌ | ❌ | ✅ |
| **Database Integration** | ❌ | ❌ | ✅ | ✅ |
| **Authentication** | ❌ | ❌ | ✅ | ✅ |

✅ = Fully demonstrated | ⚠️ = Partially demonstrated | ❌ = Not applicable

## Additional Example Resources

### CI/CD Examples
Located in [ci-cd/](./ci-cd/) directory:
- GitHub Actions workflows
- GitLab CI configurations
- Multi-stage pipelines
- Deployment strategies

### Agent Workflows
Located in [agent-workflows/](./agent-workflows/) directory:
- Simple PR workflow
- Complex refactoring workflow
- Emergency fix workflow

## Learning Path

We recommend following this progression:

### Week 1: Foundations
1. Read [Getting Started Guide](../docs/getting-started/QUICK_START.md)
2. Review [Concepts Overview](../docs/getting-started/CONCEPTS_OVERVIEW.md)
3. Explore [Monorepo Example](./monorepo/)
4. Try making a change in the monorepo

### Week 2: Advanced Patterns
1. Review [Layer Model](../docs/architecture/LAYER_MODEL.md)
2. Explore [Full-Stack Example](./fullstack/)
3. Implement a feature following governance
4. Run all governance checks

### Week 3: Real-World Scenarios
1. Choose example matching your architecture
2. Adapt to your project
3. Customize policies
4. Set up CI/CD

### Week 4: Adoption
1. Onboard your team
2. Document customizations
3. Train on governance process
4. Monitor adoption metrics

## Common Patterns Across Examples

### 1. Three-Pass Process
All examples demonstrate the agent three-pass process:
1. **Plan** - List actions, identify risks, check boundaries
2. **Change** - Implement changes following governance
3. **Verify** - Test, validate boundaries, generate evidence

### 2. AGENT.md Files
Each package/service/directory has an AGENT.md file specifying:
- Purpose of the folder
- What agents may do
- What agents may NOT do
- Allowed/forbidden imports
- Links to policies

### 3. Boundary Enforcement
All examples show how boundaries are:
- Defined in BOUNDARIES.md policy
- Documented in AGENT.md files
- Checked by boundary checker scripts
- Enforced in CI/CD

### 4. Quality Gates
Examples demonstrate:
- Performance budgets (bundle size, response time)
- Test coverage requirements
- Security baselines
- Linting and formatting rules

### 5. Waiver Management
When governance checks fail:
- Document justification
- Request approval (HITL)
- Set expiration date
- Plan remediation

## Testing the Examples

### Verify Governance Setup
```bash
npm run check:governance
```

### Check Boundaries
```bash
npm run check:boundaries
```

### Run Security Scan
```bash
npm run check:security
```

### Full CI Check
```bash
npm run check:ci
```

## Customizing for Your Project

### Step 1: Choose Base Example
Pick the example that most closely matches your architecture.

### Step 2: Copy Structure
Copy the `.repo/` folder and governance files to your project.

### Step 3: Customize Policies
Edit `.repo/policy/*.md` files to match your requirements.

### Step 4: Update Manifest
Fill in commands in `.repo/repo.manifest.yaml`.

### Step 5: Create AGENT.md Files
Add AGENT.md files to your directories with specific rules.

### Step 6: Test
Run governance checks and fix any issues.

## Troubleshooting

### Governance check fails
→ Review error messages and check `.repo/repo.manifest.yaml` for `<UNKNOWN>` placeholders.

### Boundary violations
→ Check AGENT.md files and `.repo/policy/BOUNDARIES.md` for allowed imports.

### Scripts don't run
→ Ensure Node.js 18+ is installed and run `npm install`.

### Can't find documentation
→ All docs are in `../docs/` directory, linked from examples.

## Contributing

Found an issue or want to improve an example?

1. Check existing issues
2. Create an issue describing the problem
3. Submit a PR with your fix
4. Update documentation if needed

## Support

- **Documentation:** [../docs/](../docs/)
- **FAQ:** [../docs/FAQ.md](../docs/FAQ.md)
- **Troubleshooting:** [../docs/TROUBLESHOOTING.md](../docs/TROUBLESHOOTING.md)
- **How-To Guides:** [../docs/guides/](../docs/guides/)

---

**Remember:** These examples are starting points. Customize them to fit your team's needs and processes. Governance should enable your team, not constrain it.

**Next Step:** Pick an example and dive in! Start with the README in each example directory.
