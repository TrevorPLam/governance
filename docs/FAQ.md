# Frequently Asked Questions (FAQ)

**Comprehensive answers to common questions about the AI-Native Governance Framework**

---

## Table of Contents

1. [General Questions](#general-questions)
2. [Getting Started](#getting-started)
3. [Policy Questions](#policy-questions)
4. [Tool Questions](#tool-questions)
5. [CI/CD Questions](#cicd-questions)
6. [Agent Questions](#agent-questions)
7. [Manifest Questions](#manifest-questions)
8. [Waiver Questions](#waiver-questions)
9. [Security Questions](#security-questions)
10. [Customization Questions](#customization-questions)
11. [Troubleshooting Questions](#troubleshooting-questions)
12. [Performance Questions](#performance-questions)
13. [Advanced Topics](#advanced-topics)

---

## General Questions

### Q1: What is the AI-Native Governance Framework?

**A:** The AI-Native Governance Framework is a comprehensive, injectable repository governance system designed specifically for AI-assisted development. It provides:

- **Policy-based development** with clear, documented rules and boundaries
- **AI-native workflows** purpose-built for AI agents
- **Human-in-the-loop (HITL) oversight** balancing automation with human judgment
- **Security by default** with enforced security baselines
- **Quality gates** for automated quality enforcement
- **Boundary enforcement** with clear separation of concerns
- **Maturity scaling** from basic to optimizing (Levels 0-4)

The framework can be injected into any software repository to enable structured, governed development.

**See also:** [CONCEPTS_OVERVIEW.md](getting-started/CONCEPTS_OVERVIEW.md)

---

### Q2: Who is this framework for?

**A:** The governance framework is designed for:

- **Development teams** working with AI assistants (GitHub Copilot, ChatGPT, Claude, etc.)
- **Engineering managers** who need to ensure code quality and compliance
- **DevOps teams** implementing CI/CD pipelines with governance checks
- **Security teams** requiring enforceable security policies
- **Open source maintainers** managing contributions at scale
- **Enterprise organizations** with compliance and audit requirements
- **Solo developers** who want structure and best practices

Whether you're a startup or enterprise, working solo or in a large team, the framework scales to your needs.

**See also:** [QUICK_START.md](getting-started/QUICK_START.md)

---

### Q3: How does the governance framework work?

**A:** The framework operates on three pillars:

**1. Policies (What's allowed)**
- Constitution - Fundamental governance rules
- Principles - 23 operating principles
- Quality Gates - Hard gates vs soft guidelines
- Security Baseline - Non-negotiable security requirements
- Boundaries - Architectural constraints

**2. Automation (Enforcement)**
- CLI tool for validation and verification
- CI/CD integration for automated checks
- Pre-commit hooks and quality gates
- Automated reporting and tracking

**3. Humans (Oversight)**
- Human-in-the-Loop (HITL) for critical decisions
- Code review requirements
- Waiver approval process
- Security review gates

The system uses a 3-layer model where custom configurations (Layer 1) are never overwritten, framework policies (Layer 2) can be updated with merge protection, and reference templates (Layer 3) can be freely customized.

**See also:** [CONCEPTS_OVERVIEW.md](getting-started/CONCEPTS_OVERVIEW.md), [ARCHITECTURE.md](architecture/)

---

### Q4: What makes it "AI-Native"?

**A:** The framework is AI-Native because:

- **Agent-aware policies** - Policies are written for both humans and AI agents to understand
- **Structured prompts** - Agent prompts are embedded in the governance structure
- **Boundary definitions** - Clear constraints help agents work within safe limits
- **HITL escalation** - Agents know when to ask for human help
- **Machine-readable rules** - Policies are structured for automated enforcement
- **Context injection** - Governance context is injected into agent workflows
- **Agent roles** - Different agents have different permissions and capabilities

Traditional governance systems assume human developers. This framework assumes AI agents are first-class citizens.

**See also:** [HOW_TO_WORK_WITH_AGENTS.md](guides/HOW_TO_WORK_WITH_AGENTS.md)

---

### Q5: Is this framework opinionated?

**A:** Yes, but flexibly so:

**Opinionated about:**
- Security must come first (non-negotiable)
- Testing is mandatory (every feature needs tests)
- Documentation is required (code without docs is incomplete)
- Small, focused changes (atomic PRs)
- Quality gates must be enforced

**Flexible about:**
- Programming languages and frameworks
- Project structure and organization
- Specific tools and technologies
- Team workflows and processes
- Customization of policies

You can customize most aspects while maintaining the core governance principles.

**See also:** [HOW_TO_CUSTOMIZE_POLICIES.md](guides/HOW_TO_CUSTOMIZE_POLICIES.md)

---

### Q6: Can I use this with existing projects?

**A:** Absolutely! The framework is designed to be **injectable** into existing repositories:

**Migration approach:**
1. Run `governance-cli init` to inject the framework
2. Start with maturity Level 1 (basic governance)
3. Gradually adopt policies at your own pace
4. Request waivers for legacy code that doesn't comply
5. Incrementally improve to higher maturity levels

You don't need to rewrite your entire codebase. The framework adapts to your current state and helps you improve over time.

**See also:** [INSTALLATION.md](getting-started/INSTALLATION.md), Migration Guide

---

### Q7: What's the difference between this and linters/formatters?

**A:** Linters and formatters focus on code style and syntax. Governance frameworks focus on:

| Aspect | Linters/Formatters | Governance Framework |
|--------|-------------------|---------------------|
| **Scope** | Code style, syntax | Architecture, policies, security, quality |
| **Rules** | Static analysis | Policies, boundaries, quality gates |
| **Enforcement** | Pre-commit | CI/CD, HITL, waivers |
| **Flexibility** | Fixed rules | Waiver system for exceptions |
| **AI Integration** | None | Native AI agent support |
| **Security** | Limited | Comprehensive security baseline |

The governance framework **includes** linters/formatters but adds much more.

---

### Q8: How much does it cost?

**A:** The AI-Native Governance Framework is:

- **Open source** - MIT licensed
- **Free to use** - No licensing fees
- **Self-hosted** - No cloud services required
- **No vendor lock-in** - Works with any tools

The only costs are:
- Developer time for setup and customization
- CI/CD compute resources (same as current usage)
- Optional: AI assistant API costs (if using paid AI services)

**See also:** [LICENSE](../LICENSE)

---

## Getting Started

### Q9: How do I install the governance framework?

**A:** Installation is simple:

```bash
# Using npm (recommended)
npm install -g @governance/cli

# Using yarn
yarn global add @governance/cli

# Using pip (Python projects)
pip install governance-cli

# From source
git clone https://github.com/your-org/governance.git
cd governance
npm install
npm link
```

**Verify installation:**
```bash
governance-cli --version
```

**See also:** [INSTALLATION.md](getting-started/INSTALLATION.md)

---

### Q10: What are the prerequisites?

**A:** Minimum requirements:

- **Node.js** 16+ (for JavaScript/TypeScript projects)
- **Python** 3.8+ (for Python projects)
- **Git** 2.20+
- **Operating System:** Linux, macOS, or Windows with WSL

**Optional but recommended:**
- Docker (for containerized validation)
- CI/CD system (GitHub Actions, GitLab CI, Jenkins, etc.)
- AI assistant (GitHub Copilot, ChatGPT, Claude, etc.)

**See also:** [INSTALLATION.md](getting-started/INSTALLATION.md)

---

### Q11: How long does setup take?

**A:** Setup time varies by project size and maturity level:

| Project Type | Maturity Level | Setup Time |
|--------------|---------------|------------|
| New project | Level 1 | 15-30 minutes |
| Small existing project | Level 1 | 1-2 hours |
| Medium project | Level 1-2 | 4-8 hours |
| Large project | Level 2-3 | 1-3 days |
| Enterprise project | Level 3-4 | 1-2 weeks |

**Quick start (Level 1):**
```bash
cd your-project
governance-cli init --maturity-level 1
governance-cli validate
```

**See also:** [QUICK_START.md](getting-started/QUICK_START.md)

---

### Q12: What happens when I run `governance-cli init`?

**A:** The `init` command:

1. **Creates folder structure:**
   - `.repo/policy/` - Governance policies
   - `.repo/agents/` - Agent configurations
   - `.repo/tracking/` - HITL and waiver tracking

2. **Injects default policies:**
   - CONSTITUTION.md
   - PRINCIPLES.md
   - QUALITY_GATES.md
   - SECURITY_BASELINE.md

3. **Creates manifest:**
   - `repo.manifest.yaml` - Project configuration

4. **Sets up CI/CD:**
   - GitHub Actions workflow (if using GitHub)
   - GitLab CI config (if using GitLab)
   - Pre-commit hooks

5. **Generates documentation:**
   - CONTRIBUTING.md
   - CODE_OF_CONDUCT.md (optional)

**See also:** [QUICK_START.md](getting-started/QUICK_START.md)

---

### Q13: Can I try it without committing to my repository?

**A:** Yes! Use dry-run mode:

```bash
# Preview what will be created
governance-cli init --dry-run

# Create in a temporary directory
governance-cli init --output-dir ./governance-preview

# Validate existing files without making changes
governance-cli validate --dry-run
```

You can also clone a starter kit to experiment:

```bash
git clone https://github.com/governance/starter-kit-javascript.git
cd starter-kit-javascript
governance-cli validate
```

**See also:** Starter Kits, Examples

---

### Q14: What starter kits are available?

**A:** We provide 6 ready-to-use starter kits:

1. **JavaScript/Node.js** - Express, React, testing
2. **TypeScript** - Type-safe with strict quality gates
3. **Python** - Flask/FastAPI with pytest
4. **Monorepo** - Multi-package with shared governance
5. **Full-Stack** - Frontend + Backend + Database
6. **Microservices** - Distributed services with API gateway

Each starter kit includes:
- Pre-configured governance policies
- Working examples
- CI/CD pipelines
- Test suites
- Documentation

**See also:** [templates/](../templates/), Examples

---

## Policy Questions

### Q15: What is the Constitution?

**A:** The Constitution (`.repo/policy/CONSTITUTION.md`) is the **supreme governance document** that contains fundamental rules that override everything else.

**8 Articles:**
1. **Agent Authority** - What agents can and cannot do
2. **Quality Standards** - Hard gates vs soft guidelines
3. **Security First** - Security overrides all priorities
4. **Human Override** - Humans have final authority
5. **Boundaries** - Architectural constraints
6. **Documentation** - Everything must be documented
7. **Waivers** - Exception process
8. **Emergency Protocol** - Crisis procedures

**Key principle:** Constitution = Law, Principles = Guidelines

**Example:**
```markdown
Article 3: Security First
- Security vulnerabilities must be fixed immediately
- Security issues override all other priorities
- Security review required for: auth, crypto, PII, API keys
```

**See also:** [CONCEPTS_OVERVIEW.md](getting-started/CONCEPTS_OVERVIEW.md)

---

### Q16: What are the 23 Principles?

**A:** The Principles (`.repo/policy/PRINCIPLES.md`) are 23 operating guidelines organized in categories:

**Planning & Understanding (P3-P7):**
- P3: Understand First
- P4: Document Intent
- P5: Plan Before Coding

**Testing & Quality (P8-P12):**
- P8: Test Everything
- P9: Automate Tests
- P10: Code Coverage Minimums

**Security & Safety (P13-P17):**
- P14: Security Paranoia
- P15: Defense in Depth
- P16: Least Privilege

**Development Practices (P18-P22):**
- P19: Small Changes
- P20: Meaningful Commits
- P21: Code Review Required

**Operations (P23-P25):**
- P23: Monitor Everything
- P24: Plan for Failure
- P25: Document Operations

**See also:** [CONCEPTS_OVERVIEW.md](getting-started/CONCEPTS_OVERVIEW.md)

---

### Q17: Can I modify the policies?

**A:** It depends on which policies:

**Immutable (Cannot change):**
- Constitution Article 3 (Security First)
- Security Baseline core requirements
- HITL escalation requirements

**Customizable (Can modify):**
- Specific quality gate thresholds
- Boundary definitions for your architecture
- Agent role definitions
- Waiver approval workflows
- Documentation requirements

**How to customize:**
```bash
# Edit policies
vi .repo/policy/PRINCIPLES.md

# Validate changes
governance-cli validate --policies

# Test with dry-run
governance-cli verify --dry-run
```

**See also:** [HOW_TO_CUSTOMIZE_POLICIES.md](guides/HOW_TO_CUSTOMIZE_POLICIES.md)

---

### Q18: What's the difference between hard gates and soft guidelines?

**A:** Quality gates come in two types:

**Hard Gates (MUST pass):**
- ❌ Build must succeed
- ❌ All tests must pass
- ❌ Security scans must pass
- ❌ No critical vulnerabilities
- ❌ Code coverage > threshold

**Soft Guidelines (SHOULD pass):**
- ⚠️ Code coverage > 80% (recommended)
- ⚠️ No linting warnings
- ⚠️ Documentation completeness
- ⚠️ Performance benchmarks

**Failed hard gate = Blocked**  
**Failed soft guideline = Warning + Human review**

You can request waivers for hard gates in exceptional circumstances.

**See also:** Quality Gates, [HOW_TO_MANAGE_WAIVERS.md](guides/HOW_TO_MANAGE_WAIVERS.md)

---

### Q19: How do I know which policies apply to my project?

**A:** Check your `repo.manifest.yaml`:

```yaml
governance:
  maturity_level: 2
  policies:
    enabled:
      - constitution
      - principles
      - quality_gates
      - security_baseline
    custom:
      - ./custom-policies/api-design.md
```

**View active policies:**
```bash
governance-cli policies list
governance-cli policies validate
```

The framework only enforces policies listed in your manifest.

**See also:** [HOW_TO_CONFIGURE_MANIFEST.md](guides/HOW_TO_CONFIGURE_MANIFEST.md)

---

### Q20: Can I have different policies for different parts of the repository?

**A:** Yes! Use boundary-specific policies:

```yaml
boundaries:
  - name: frontend
    path: src/frontend
    policies:
      - react-best-practices
      - accessibility-required
    
  - name: backend
    path: src/backend
    policies:
      - api-security
      - database-constraints
```

**Example:**
```bash
# Validate specific boundary
governance-cli validate --boundary frontend

# Different thresholds per boundary
governance-cli verify --boundary backend --coverage 90
```

**See also:** [HOW_TO_DEFINE_BOUNDARIES.md](guides/HOW_TO_DEFINE_BOUNDARIES.md)

---

## Tool Questions

### Q21: What commands does the CLI provide?

**A:** The governance CLI provides these commands:

**Core Commands:**
```bash
governance-cli init          # Initialize governance
governance-cli validate      # Validate policies and config
governance-cli verify        # Verify compliance
governance-cli check         # Run all checks
```

**Management Commands:**
```bash
governance-cli waiver create    # Create waiver request
governance-cli waiver approve   # Approve waiver
governance-cli hitl escalate    # Escalate to human
governance-cli hitl resolve     # Resolve HITL issue
```

**Reporting Commands:**
```bash
governance-cli report           # Generate compliance report
governance-cli status           # Show governance status
governance-cli audit            # Generate audit trail
```

**Utility Commands:**
```bash
governance-cli migrate          # Migrate to new version
governance-cli update           # Update governance framework
governance-cli export           # Export configuration
```

**See also:** CLI Reference, [QUICK_START.md](getting-started/QUICK_START.md)

---

### Q22: How do I validate my configuration?

**A:** Use the validate command:

```bash
# Validate everything
governance-cli validate

# Validate specific components
governance-cli validate --policies
governance-cli validate --manifest
governance-cli validate --boundaries

# Validate with detailed output
governance-cli validate --verbose

# Validate in CI/CD
governance-cli validate --ci --format junit
```

**Output shows:**
- ✅ Valid policies and configuration
- ❌ Errors that must be fixed
- ⚠️ Warnings to consider

**See also:** [TROUBLESHOOTING.md](TROUBLESHOOTING.md)

---

### Q23: What does `governance-cli verify` check?

**A:** The verify command checks compliance:

**Code Quality:**
- Tests pass
- Code coverage meets threshold
- Linting passes
- No TODOs in production code

**Security:**
- No known vulnerabilities
- No secrets in code
- Dependencies up to date
- Security baselines met

**Architecture:**
- Boundaries not violated
- Dependencies follow rules
- No circular dependencies

**Documentation:**
- README exists
- API documentation complete
- Code comments present

**Process:**
- Required approvals received
- HITL issues resolved
- Waivers properly documented

**See also:** Verification Guide

---

### Q24: How do I run checks in CI/CD?

**A:** Integrate with your CI/CD system:

**GitHub Actions:**
```yaml
# .github/workflows/governance.yml
name: Governance Checks
on: [push, pull_request]

jobs:
  governance:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Install Governance CLI
        run: npm install -g @governance/cli
      
      - name: Validate
        run: governance-cli validate --ci
      
      - name: Verify
        run: governance-cli verify --ci
```

**GitLab CI:**
```yaml
# .gitlab-ci.yml
governance:
  stage: test
  script:
    - npm install -g @governance/cli
    - governance-cli validate --ci
    - governance-cli verify --ci
```

**See also:** [HOW_TO_INTEGRATE_CI_CD.md](guides/HOW_TO_INTEGRATE_CI_CD.md)

---

### Q25: Can I run governance checks locally before pushing?

**A:** Yes! Set up pre-commit hooks:

```bash
# Install hooks
governance-cli install-hooks

# Or manually add to .git/hooks/pre-commit
#!/bin/bash
governance-cli validate --fast || exit 1
```

**What gets checked:**
- Policy compliance
- Basic security scans
- File structure
- Manifest validity

Heavy checks (full tests, security scans) run in CI/CD to keep local checks fast.

**See also:** Developer Workflow

---

## CI/CD Questions

### Q26: Which CI/CD platforms are supported?

**A:** The governance framework supports:

**Fully Supported:**
- GitHub Actions ✅
- GitLab CI/CD ✅
- Jenkins ✅
- CircleCI ✅
- Azure Pipelines ✅

**Community Supported:**
- Travis CI
- Bitbucket Pipelines
- AWS CodePipeline
- Google Cloud Build

**Self-hosted:**
- Drone
- TeamCity
- Bamboo

Any CI/CD system that can run shell commands can use the governance CLI.

**See also:** [HOW_TO_INTEGRATE_CI_CD.md](guides/HOW_TO_INTEGRATE_CI_CD.md)

---

### Q27: How do I handle governance check failures in CI/CD?

**A:** Failures are reported with clear actions:

**1. View failure details:**
```bash
# In CI logs
governance-cli verify --ci --verbose
```

**2. Failure types:**
- **Hard gate failure** → PR blocked, must fix
- **Soft guideline failure** → Warning, review required
- **Waiverable failure** → Can request waiver

**3. Resolution options:**
```bash
# Option A: Fix the issue
# (recommended)

# Option B: Request waiver
governance-cli waiver create \
  --reason "Legacy code, will fix in Q2" \
  --expires "2026-06-30"

# Option C: HITL escalation
governance-cli hitl escalate \
  --issue "boundary-violation" \
  --context "Refactoring in progress"
```

**See also:** [TROUBLESHOOTING.md](TROUBLESHOOTING.md), [HOW_TO_MANAGE_WAIVERS.md](guides/HOW_TO_MANAGE_WAIVERS.md)

---

### Q28: Can I skip governance checks in emergencies?

**A:** Yes, using emergency protocol:

```bash
# Emergency bypass (requires justification)
governance-cli verify --emergency \
  --reason "Production outage, security patch" \
  --approver "john.doe@company.com"
```

**Emergency bypass:**
- ⚠️ Creates audit trail
- ⚠️ Requires human approval
- ⚠️ Must be resolved within 48 hours
- ⚠️ Generates follow-up HITL issue

**Constitution Article 8** defines when emergency protocol is allowed.

**See also:** Emergency Protocol, [TROUBLESHOOTING.md](TROUBLESHOOTING.md)

---

### Q29: How do I run governance checks in parallel with other CI jobs?

**A:** Configure parallel execution:

```yaml
# GitHub Actions
jobs:
  governance-fast:
    runs-on: ubuntu-latest
    steps:
      - run: governance-cli validate --fast
  
  governance-full:
    runs-on: ubuntu-latest
    steps:
      - run: governance-cli verify --full
  
  tests:
    runs-on: ubuntu-latest
    steps:
      - run: npm test
  
  # All must pass
  required-checks:
    needs: [governance-fast, governance-full, tests]
    runs-on: ubuntu-latest
    steps:
      - run: echo "All checks passed"
```

**See also:** [HOW_TO_INTEGRATE_CI_CD.md](guides/HOW_TO_INTEGRATE_CI_CD.md)

---

### Q30: What happens if governance checks timeout?

**A:** Configure timeout handling:

```yaml
# GitHub Actions - with timeout
- name: Governance Checks
  timeout-minutes: 10
  run: governance-cli verify
  
  # Fallback on timeout
  continue-on-error: false
```

**Troubleshooting timeouts:**
```bash
# Run faster checks
governance-cli verify --fast --skip security-scan

# Increase timeout
governance-cli verify --timeout 600

# Run specific checks only
governance-cli verify --only quality-gates
```

**See also:** [TROUBLESHOOTING.md](TROUBLESHOOTING.md), Performance Questions

---

## Agent Questions

### Q31: What are agent roles?

**A:** Agents have different roles with different permissions:

**Read-Only Agents:**
- Can read code and documentation
- Can analyze and suggest
- Cannot modify anything

**Development Agents:**
- Can create/modify code
- Must follow boundaries
- Require HITL for architecture changes

**Review Agents:**
- Can review PRs
- Can suggest improvements
- Can approve within limits

**Ops Agents:**
- Can deploy to staging
- Can run migrations
- Cannot deploy to production (HITL required)

**Admin Agents:**
- Can modify policies (with HITL)
- Can approve waivers
- Full access with audit trail

**See also:** [HOW_TO_WORK_WITH_AGENTS.md](guides/HOW_TO_WORK_WITH_AGENTS.md)

---

### Q32: How do agents know when to escalate to humans?

**A:** HITL escalation is triggered by:

**Automatic triggers:**
- Boundary violation attempts
- Security policy changes
- Production deployments
- Architecture changes
- Policy modifications

**Manual triggers:**
```bash
# Agent escalates
governance-cli hitl escalate \
  --reason "Unable to resolve circular dependency" \
  --context "Refactoring auth module"
```

**Escalation workflow:**
1. Agent detects issue requiring human input
2. Creates HITL issue with context
3. Notifies designated humans
4. Blocks further action until resolved
5. Human reviews and resolves
6. Agent continues or adjusts approach

**See also:** [HOW_TO_WORK_WITH_AGENTS.md](guides/HOW_TO_WORK_WITH_AGENTS.md), HITL Guide

---

### Q33: Can agents request waivers?

**A:** Yes, but with human approval:

**Agent workflow:**
```bash
# Agent requests waiver
governance-cli waiver create \
  --requested-by "agent:code-assistant" \
  --reason "Test code doesn't need coverage" \
  --file "tests/legacy-test.js" \
  --pending-human-approval
```

**Human workflow:**
```bash
# Human reviews and approves/rejects
governance-cli waiver review W-2024-001
governance-cli waiver approve W-2024-001 \
  --approver "jane.doe@company.com"
```

**See also:** [HOW_TO_MANAGE_WAIVERS.md](guides/HOW_TO_MANAGE_WAIVERS.md)

---

### Q34: How do I configure agent permissions?

**A:** Edit `.repo/agents/agent-config.yaml`:

```yaml
agents:
  - name: github-copilot
    role: development
    permissions:
      read: all
      write: ["src/**", "tests/**"]
      forbidden: [".repo/policy/**", "package.json"]
    
  - name: code-review-bot
    role: review
    permissions:
      read: all
      write: ["PULL_REQUEST_COMMENTS"]
      approve: true
      approve_limit: "non-critical"
    
  - name: deploy-bot
    role: ops
    permissions:
      deploy: ["staging"]
      hitl_required: ["production"]
```

**See also:** [HOW_TO_WORK_WITH_AGENTS.md](guides/HOW_TO_WORK_WITH_AGENTS.md)

---

### Q35: What happens if an agent violates a boundary?

**A:** Boundary violations are handled automatically:

**1. Detection:**
```bash
# Agent attempts boundary violation
# System detects and blocks
```

**2. Response:**
- ❌ Action blocked immediately
- 📝 Violation logged to audit trail
- 🚨 HITL issue created
- 👤 Designated human notified

**3. Resolution:**
```bash
# Human reviews
governance-cli hitl review H-2024-042

# Options:
# A) Reject: Explain why violation is not allowed
# B) Approve: Grant one-time exception
# C) Modify: Adjust boundaries to allow
```

**See also:** [HOW_TO_DEFINE_BOUNDARIES.md](guides/HOW_TO_DEFINE_BOUNDARIES.md), [TROUBLESHOOTING.md](TROUBLESHOOTING.md)

---

## Manifest Questions

### Q36: What is repo.manifest.yaml?

**A:** The manifest is your project's governance configuration file:

```yaml
# repo.manifest.yaml
project:
  name: my-awesome-app
  type: fullstack
  maturity_level: 2

governance:
  version: "1.0.0"
  policies:
    enabled: [constitution, principles, quality_gates]
  
boundaries:
  - name: frontend
    path: src/frontend
  - name: backend
    path: src/backend

quality_gates:
  coverage_threshold: 80
  security_scan: required

agents:
  enabled: true
  roles: [development, review]
```

**See also:** [HOW_TO_CONFIGURE_MANIFEST.md](guides/HOW_TO_CONFIGURE_MANIFEST.md)

---

### Q37: What commands are available in the manifest?

**A:** Manifests can define custom commands:

```yaml
commands:
  validate:
    run: npm test && npm run lint
    description: "Run tests and linting"
  
  deploy-staging:
    run: ./scripts/deploy.sh staging
    requires_hitl: false
  
  deploy-production:
    run: ./scripts/deploy.sh production
    requires_hitl: true
    approvers: ["john@company.com", "jane@company.com"]
```

**Usage:**
```bash
governance-cli exec validate
governance-cli exec deploy-staging
governance-cli exec deploy-production  # Requires HITL approval
```

**See also:** [HOW_TO_CONFIGURE_MANIFEST.md](guides/HOW_TO_CONFIGURE_MANIFEST.md)

---

### Q38: How do I validate my manifest?

**A:** Use validation tools:

```bash
# Validate syntax and structure
governance-cli validate --manifest

# Check for conflicts
governance-cli validate --manifest --strict

# Validate with schema
governance-cli validate --manifest --schema
```

**Common errors:**
- Invalid YAML syntax
- Missing required fields
- Conflicting boundary definitions
- Invalid maturity level
- Unknown policy references

**See also:** [TROUBLESHOOTING.md](TROUBLESHOOTING.md)

---

### Q39: Can I have environment-specific manifests?

**A:** Yes! Use manifest inheritance:

```yaml
# repo.manifest.yaml (base)
project:
  name: my-app
  
# repo.manifest.dev.yaml (development)
extends: repo.manifest.yaml
quality_gates:
  coverage_threshold: 70  # Lower for dev

# repo.manifest.prod.yaml (production)
extends: repo.manifest.yaml
quality_gates:
  coverage_threshold: 90  # Higher for prod
  security_scan: strict
```

**Usage:**
```bash
# Development
governance-cli verify --manifest repo.manifest.dev.yaml

# Production
governance-cli verify --manifest repo.manifest.prod.yaml
```

**See also:** [HOW_TO_CONFIGURE_MANIFEST.md](guides/HOW_TO_CONFIGURE_MANIFEST.md)

---

### Q40: How do boundaries work?

**A:** Boundaries define architectural constraints:

```yaml
boundaries:
  - name: frontend
    path: src/frontend
    allowed_dependencies:
      - name: backend
        via: api_only
    forbidden_imports:
      - src/backend/database/**
  
  - name: backend
    path: src/backend
    allowed_dependencies:
      - name: database
        via: orm_only
```

**Enforcement:**
```bash
# Check boundary violations
governance-cli verify --boundaries

# Shows violations like:
# ❌ frontend imports backend/database/user.model.ts
# ✅ frontend calls backend via API
```

**See also:** [HOW_TO_DEFINE_BOUNDARIES.md](guides/HOW_TO_DEFINE_BOUNDARIES.md)

---

## Waiver Questions

### Q41: What is a waiver?

**A:** A waiver is a temporary exception to governance policies:

**When to use:**
- Legacy code that doesn't meet current standards
- Time-sensitive fixes that bypass normal process
- Experimental features not ready for full compliance
- Technical debt with planned resolution

**Waiver properties:**
- **Temporary** - Has expiration date
- **Documented** - Requires justification
- **Tracked** - Appears in compliance reports
- **Revocable** - Can be revoked if abused

**See also:** [HOW_TO_MANAGE_WAIVERS.md](guides/HOW_TO_MANAGE_WAIVERS.md)

---

### Q42: How do I request a waiver?

**A:** Create a waiver request:

```bash
governance-cli waiver create \
  --file "src/legacy/old-module.js" \
  --policy "code-coverage" \
  --reason "Legacy code, refactoring planned for Q2 2024" \
  --expires "2024-06-30" \
  --owner "john.doe@company.com"
```

**Waiver request includes:**
- What policy to waive
- Why waiver is needed
- How long waiver should last
- Who owns the waived code
- Plan to resolve

**See also:** [HOW_TO_MANAGE_WAIVERS.md](guides/HOW_TO_MANAGE_WAIVERS.md)

---

### Q43: Who can approve waivers?

**A:** Waiver approval depends on policy type:

**Code Quality Waivers:**
- Approved by: Tech Lead or Engineering Manager
- Examples: Coverage thresholds, linting rules

**Security Waivers:**
- Approved by: Security Team + Engineering Manager
- Examples: Dependency vulnerabilities, security scans

**Architecture Waivers:**
- Approved by: Principal Engineer or Architect
- Examples: Boundary violations, design patterns

**Emergency Waivers:**
- Approved by: Any two approvers
- Must be resolved within 48 hours

Configure approvers in `repo.manifest.yaml`:

```yaml
waivers:
  approvers:
    quality: ["tech-lead@company.com"]
    security: ["security-team@company.com"]
    architecture: ["architect@company.com"]
```

**See also:** [HOW_TO_MANAGE_WAIVERS.md](guides/HOW_TO_MANAGE_WAIVERS.md)

---

### Q44: What happens when a waiver expires?

**A:** Expired waivers trigger automatic actions:

**1 week before expiration:**
- 📧 Warning email sent to owner
- ⚠️ CI/CD shows warning

**On expiration date:**
- ❌ Waiver becomes invalid
- 🚫 CI/CD checks fail
- 📝 HITL issue created

**Options:**
```bash
# Extend waiver (requires re-approval)
governance-cli waiver extend W-2024-001 \
  --expires "2024-09-30" \
  --reason "Still working on refactor"

# Resolve and close
governance-cli waiver resolve W-2024-001 \
  --resolution "Code refactored, now compliant"

# Convert to permanent exception (rare)
governance-cli waiver convert-to-exception W-2024-001 \
  --requires-principal-approval
```

**See also:** [HOW_TO_MANAGE_WAIVERS.md](guides/HOW_TO_MANAGE_WAIVERS.md)

---

### Q45: Can I see all active waivers?

**A:** Yes, use reporting commands:

```bash
# List all waivers
governance-cli waiver list

# Show waiver details
governance-cli waiver show W-2024-001

# Generate waiver report
governance-cli report --waivers

# Export to CSV
governance-cli waiver export --format csv > waivers.csv

# Find expiring waivers
governance-cli waiver list --expiring-soon
```

**See also:** [HOW_TO_MANAGE_WAIVERS.md](guides/HOW_TO_MANAGE_WAIVERS.md), Reporting

---

## Security Questions

### Q46: How does the framework handle security vulnerabilities?

**A:** Multi-layered security approach:

**1. Prevention:**
- Security baseline policies
- Dependency scanning
- Secret detection
- Code analysis

**2. Detection:**
```bash
# Automatic scanning
governance-cli verify --security

# Shows vulnerabilities with severity
# 🔴 Critical: CVE-2024-1234 in lodash@4.17.0
# 🟡 Medium: CVE-2024-5678 in axios@0.21.0
```

**3. Response:**
- Critical vulnerabilities → Block CI/CD
- High vulnerabilities → Require HITL
- Medium/Low vulnerabilities → Warning + tracking

**4. Tracking:**
```bash
# Create security issue
governance-cli security track CVE-2024-1234

# Monitor until resolved
governance-cli security status
```

**See also:** Security Baseline, [TROUBLESHOOTING.md](TROUBLESHOOTING.md)

---

### Q47: How are secrets detected and prevented?

**A:** Multi-stage secret detection:

**Pre-commit:**
```bash
# Git hooks scan for secrets
governance-cli scan-secrets --pre-commit
```

**CI/CD:**
```bash
# Full secret scan
governance-cli verify --secrets
```

**Detected patterns:**
- API keys
- AWS credentials
- Database passwords
- Private keys
- OAuth tokens
- JWT secrets

**Response to detected secrets:**
1. ❌ Commit/PR blocked immediately
2. 🚨 Security team notified
3. 🔄 Require secret rotation
4. 📝 Audit trail created

**See also:** Security Best Practices

---

### Q48: What security scans are included?

**A:** Comprehensive security scanning:

**Dependency Scanning:**
- npm audit
- Snyk
- OWASP Dependency Check
- GitHub Dependabot

**Static Analysis:**
- SonarQube
- Semgrep
- CodeQL
- Bandit (Python)
- ESLint security plugins

**Secret Detection:**
- git-secrets
- TruffleHog
- detect-secrets

**Container Scanning (if applicable):**
- Trivy
- Clair
- Docker Scout

Configure in manifest:
```yaml
security:
  scans:
    - type: dependencies
      tool: npm-audit
    - type: secrets
      tool: trufflehog
```

**See also:** Security Baseline

---

### Q49: Can I customize security policies?

**A:** Security baseline is mostly immutable, but you can:

**Cannot customize:**
- No secrets in code
- No critical vulnerabilities
- Security review for auth/crypto

**Can customize:**
- Acceptable risk levels (medium/low)
- Scanning tools used
- Exemptions (with security team approval)
- Custom security rules

**Example:**
```yaml
security:
  baseline: strict  # strict, standard, relaxed
  
  custom_rules:
    - pattern: "eval\\("
      severity: critical
      message: "eval() is forbidden"
  
  exemptions:
    - cve: CVE-2024-1234
      reason: "False positive, not exploitable"
      approved_by: "security-team@company.com"
```

**See also:** [HOW_TO_CUSTOMIZE_POLICIES.md](guides/HOW_TO_CUSTOMIZE_POLICIES.md)

---

### Q50: How do I audit security compliance?

**A:** Generate security reports:

```bash
# Security status
governance-cli security status

# Full security audit
governance-cli audit --security

# Export for compliance
governance-cli audit --security --format pdf > security-audit.pdf

# Continuous monitoring
governance-cli security monitor --continuous
```

**Report includes:**
- Active vulnerabilities
- Resolved vulnerabilities
- Security waivers
- Secret detections
- Compliance status
- Audit trail

**See also:** Audit Guide, Compliance

---

## Customization Questions

### Q51: What can I customize?

**A:** Extensive customization options:

**Can Customize:**
- ✅ Quality gate thresholds
- ✅ Boundary definitions
- ✅ Agent roles and permissions
- ✅ Waiver approval workflows
- ✅ CI/CD integration
- ✅ Custom policies (additions)
- ✅ Documentation requirements
- ✅ Maturity level progression
- ✅ Tool selections

**Cannot Customize:**
- ❌ Core security requirements
- ❌ Constitution Article 3 (Security First)
- ❌ HITL escalation for critical changes
- ❌ Audit trail requirements

**See also:** [HOW_TO_CUSTOMIZE_POLICIES.md](guides/HOW_TO_CUSTOMIZE_POLICIES.md)

---

### Q52: How do I add custom policies?

**A:** Create custom policy files:

```bash
# Create custom policy
cat > .repo/policy/custom/api-design.md << 'EOF'
# API Design Policy

## Requirements
1. All APIs must use RESTful design
2. All endpoints must have OpenAPI documentation
3. All responses must include rate limit headers
4. All errors must follow RFC 7807 format

## Validation
Run: governance-cli verify --policy api-design
EOF

# Register in manifest
```

```yaml
# repo.manifest.yaml
governance:
  policies:
    enabled:
      - constitution
      - principles
      - custom/api-design
```

**See also:** [HOW_TO_CUSTOMIZE_POLICIES.md](guides/HOW_TO_CUSTOMIZE_POLICIES.md)

---

### Q53: Can I change quality gate thresholds?

**A:** Yes, configure in manifest:

```yaml
quality_gates:
  code_coverage:
    threshold: 85  # Default: 80
    strict: true
  
  complexity:
    max_cyclomatic: 10  # Default: 15
    max_cognitive: 15   # Default: 20
  
  duplication:
    max_percent: 3  # Default: 5
  
  documentation:
    required_for: [public_api, exported]
```

**See also:** Quality Gates, [HOW_TO_CONFIGURE_MANIFEST.md](guides/HOW_TO_CONFIGURE_MANIFEST.md)

---

## Troubleshooting Questions

### Q54: Where do I find error logs?

**A:** Logs are stored in multiple locations:

```bash
# CLI logs
~/.governance/logs/governance-cli.log

# CI/CD logs
# (Check your CI/CD platform)

# Audit trail
.repo/tracking/audit-trail.log

# View recent errors
governance-cli logs --errors --tail 50

# Debug mode
governance-cli verify --debug
```

**See also:** [TROUBLESHOOTING.md](TROUBLESHOOTING.md)

---

### Q55: What do I do if validation fails?

**A:** Follow this troubleshooting process:

**1. Identify the failure:**
```bash
governance-cli validate --verbose
```

**2. Check common causes:**
- Invalid YAML syntax
- Missing required fields
- Policy conflicts
- File permission issues

**3. Fix and retry:**
```bash
# Fix the issue
vi repo.manifest.yaml

# Validate again
governance-cli validate --manifest
```

**4. If stuck:**
```bash
# Get help
governance-cli validate --explain
governance-cli doctor  # Run diagnostics
```

**See also:** [TROUBLESHOOTING.md](TROUBLESHOOTING.md)

---

### Q56: How do I debug boundary violations?

**A:** Use boundary debugging tools:

```bash
# Check boundary violations
governance-cli verify --boundaries --verbose

# Show dependency graph
governance-cli boundaries graph --output deps.svg

# Trace specific violation
governance-cli boundaries trace \
  --from src/frontend/App.tsx \
  --to src/backend/database/user.model.ts

# Show all cross-boundary imports
governance-cli boundaries violations --list
```

**See also:** [TROUBLESHOOTING.md](TROUBLESHOOTING.md), [HOW_TO_DEFINE_BOUNDARIES.md](guides/HOW_TO_DEFINE_BOUNDARIES.md)

---

## Performance Questions

### Q57: Is governance checking slow?

**A:** Performance varies by project size:

| Project Size | Validation Time | Verification Time |
|--------------|----------------|-------------------|
| Small (<1000 files) | <5 seconds | 30-60 seconds |
| Medium (1000-5000) | 5-15 seconds | 1-3 minutes |
| Large (5000-20000) | 15-30 seconds | 3-8 minutes |
| Very Large (20000+) | 30-60 seconds | 8-15 minutes |

**Fast mode:**
```bash
# Skip heavy checks
governance-cli verify --fast
```

**See also:** Performance Optimization

---

### Q58: How can I speed up governance checks?

**A:** Several optimization strategies:

**1. Use caching:**
```bash
# Enable caching
governance-cli verify --cache
```

**2. Run incremental checks:**
```bash
# Only check changed files
governance-cli verify --incremental
```

**3. Parallelize in CI:**
```yaml
jobs:
  validate:
    steps:
      - run: governance-cli validate  # Fast
  
  verify:
    steps:
      - run: governance-cli verify   # Slower, runs in parallel
```

**4. Skip non-critical checks locally:**
```bash
# Local development
governance-cli verify --skip security-scan

# CI runs full checks
```

**See also:** Performance Optimization

---

## Advanced Topics

### Q59: Can I extend the governance framework?

**A:** Yes, through multiple extension points:

**Custom Validators:**
```javascript
// .repo/validators/custom-validator.js
module.exports = {
  name: 'check-api-design',
  validate: async (context) => {
    // Your custom validation logic
  }
};
```

**Custom Reporters:**
```javascript
// .repo/reporters/custom-reporter.js
module.exports = {
  name: 'slack-reporter',
  report: async (results) => {
    // Send results to Slack
  }
};
```

**Plugins:**
```yaml
# repo.manifest.yaml
plugins:
  - name: governance-plugin-jira
    config:
      server: https://jira.company.com
```

**See also:** Extension Guide, Plugin Development

---

### Q60: How do I integrate with JIRA/Linear/etc?

**A:** Use integration plugins:

```yaml
# repo.manifest.yaml
integrations:
  jira:
    enabled: true
    server: https://jira.company.com
    project: PROJ
    # Auto-create tickets for HITL issues
    auto_create_issues: true
  
  slack:
    enabled: true
    webhook: ${SLACK_WEBHOOK}
    # Notify on governance failures
    notify_on: [failure, hitl_escalation]
```

**See also:** Integrations Guide

---

### Q61: Can I use the framework programmatically?

**A:** Yes, through the JavaScript/Python API:

**JavaScript:**
```javascript
const { Governance } = require('@governance/core');

const gov = new Governance({
  manifestPath: './repo.manifest.yaml'
});

// Validate
const result = await gov.validate();

// Verify
const compliance = await gov.verify();

// Custom checks
const boundaries = await gov.boundaries.check();
```

**Python:**
```python
from governance import Governance

gov = Governance(manifest_path='./repo.manifest.yaml')

# Validate
result = gov.validate()

# Verify
compliance = gov.verify()
```

**See also:** API Reference

---

## Related Documentation

- [Getting Started Guide](getting-started/QUICK_START.md)
- [Concepts Overview](getting-started/CONCEPTS_OVERVIEW.md)
- [Troubleshooting Guide](TROUBLESHOOTING.md)
- [Common Patterns](COMMON_PATTERNS.md)
- [Installation Guide](getting-started/INSTALLATION.md)
- [How-To Guides](guides/)
- [CLI Reference](reference/CLI_REFERENCE.md)
- [API Documentation](reference/API_REFERENCE.md)

---

**Last Updated:** 2026-01-22  
**Version:** 1.0.0  
**Feedback:** [Open an issue](https://github.com/your-org/governance/issues) or [contribute](../CONTRIBUTING.md)
