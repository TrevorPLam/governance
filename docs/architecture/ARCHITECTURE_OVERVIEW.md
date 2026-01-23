# Architecture Overview

**Document Type:** Architecture  
**Audience:** Architects, Senior Developers, Technical Leaders  
**Last Updated:** 2026-01-22

---

## Table of Contents

1. [Overview](#overview)
2. [System Architecture](#system-architecture)
3. [Component Diagram](#component-diagram)
4. [Data Flow](#data-flow)
5. [Integration Points](#integration-points)
6. [Technology Stack](#technology-stack)
7. [Deployment Model](#deployment-model)
8. [Security Architecture](#security-architecture)
9. [Scalability Considerations](#scalability-considerations)

---

## Overview

The AI-Native Governance System is a framework for managing repository governance through automated policies, agent workflows, and human-in-the-loop decision-making. It provides a structured approach to repository management that scales from solo developers to large organizations.

### Key Architectural Principles

1. **Policy-Driven**: All governance rules are explicitly defined in `.repo/policy/` files
2. **Manifest as Source of Truth**: `repo.manifest.yaml` is the single source of truth for commands
3. **Layer-Based Architecture**: Clear separation of concerns through layer boundaries
4. **Agent-Assisted**: AI agents operate within defined boundaries and policies
5. **Human-in-the-Loop**: Critical decisions always involve human oversight
6. **Automated Verification**: CI/CD pipelines enforce policies automatically
7. **Audit Trail**: All decisions and changes are logged and traceable

### System Goals

- **Consistency**: Ensure consistent practices across all repositories
- **Automation**: Reduce manual governance overhead through automation
- **Transparency**: Make all governance decisions visible and auditable
- **Flexibility**: Support different project types and organizational needs
- **Scalability**: Scale from single repositories to hundreds of projects

---

## System Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Repository Layer                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  Source Code │  │     Tests    │  │     Docs     │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                   Governance Layer (.repo/)                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │ Policies │  │ Manifest │  │  Agents  │  │Templates │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                    Tooling Layer                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │   CLI    │  │Validators│  │ CI/CD    │  │  Agents  │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                  Integration Layer                           │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │  GitHub  │  │  GitLab  │  │ Jenkins  │  │  Other   │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### Layer Responsibilities

#### Repository Layer
- **Purpose**: Contains actual project code and artifacts
- **Components**: Source code, tests, documentation, configuration
- **Governed By**: `.repo/` framework

#### Governance Layer
- **Purpose**: Defines and stores governance rules and metadata
- **Location**: `.repo/` directory in each repository
- **Components**:
  - **Policies**: Constitution, principles, quality gates, security baseline, boundaries
  - **Manifest**: Canonical commands, verification profiles, boundaries
  - **Agents**: Agent roles, prompts, checklists
  - **Templates**: Document templates (ADRs, waivers, logs)
  - **Tracking**: HITL items, waivers, archive

#### Tooling Layer
- **Purpose**: Enforces governance through automation
- **Components**:
  - **CLI Tool**: `governance-cli` for initialization, validation, updates
  - **Validators**: Manifest validator, policy validator, boundary checker
  - **CI/CD Templates**: Workflow templates for multiple platforms
  - **Agent Frameworks**: Rules and workflows for AI agents

#### Integration Layer
- **Purpose**: Connects governance to development platforms
- **Components**:
  - **Version Control**: GitHub, GitLab, Bitbucket integration
  - **CI/CD Systems**: GitHub Actions, GitLab CI, Jenkins, CircleCI, Azure Pipelines
  - **Monitoring**: Metrics collection, audit logging
  - **Communication**: Slack, Teams, email notifications

---

## Component Diagram

### Core Components

```
┌───────────────────────────────────────────────────────────────┐
│                         .repo/ Structure                       │
├───────────────────────────────────────────────────────────────┤
│                                                                │
│  ┌─────────────────┐                                          │
│  │     policy/     │  ◄─── Defines governance rules           │
│  │  - CONSTITUTION │                                           │
│  │  - PRINCIPLES   │                                           │
│  │  - QUALITY_GATES│                                           │
│  │  - SECURITY     │                                           │
│  │  - BOUNDARIES   │                                           │
│  │  - HITL         │                                           │
│  │  - WAIVERS      │                                           │
│  └─────────────────┘                                          │
│          │                                                     │
│          │ Enforced by                                        │
│          ▼                                                     │
│  ┌─────────────────┐                                          │
│  │ repo.manifest   │  ◄─── Source of truth for commands      │
│  │     .yaml       │                                           │
│  │  - commands     │                                           │
│  │  - verify_      │                                           │
│  │    profiles     │                                           │
│  │  - boundaries   │                                           │
│  └─────────────────┘                                          │
│          │                                                     │
│          │ Read by                                            │
│          ▼                                                     │
│  ┌─────────────────┐       ┌─────────────────┐              │
│  │    agents/      │       │   templates/    │              │
│  │  - AGENTS.md    │       │  - ADR          │              │
│  │  - capabilities │       │  - WAIVER       │              │
│  │  - roles/       │       │  - LOG          │              │
│  │  - prompts/     │       │  - TRACE        │              │
│  │  - checklists/  │       │  - PR_TEMPLATE  │              │
│  └─────────────────┘       └─────────────────┘              │
│          │                          │                         │
│          └──────────┬───────────────┘                         │
│                     ▼                                         │
│  ┌─────────────────────────────────────┐                     │
│  │        Runtime Tracking              │                     │
│  │  - hitl/       (pending decisions)   │                     │
│  │  - waivers/    (active exceptions)   │                     │
│  │  - archive/    (historical records)  │                     │
│  └─────────────────────────────────────┘                     │
└───────────────────────────────────────────────────────────────┘
```

### Tooling Components

```
┌────────────────────────────────────────────────────────────┐
│                    governance-cli                           │
├────────────────────────────────────────────────────────────┤
│                                                             │
│  Commands:                     Utils:                      │
│  ┌──────────────┐             ┌──────────────┐           │
│  │ init         │             │ manifest     │           │
│  │ validate     │             │ files        │           │
│  │ verify       │             │ templates    │           │
│  │ check-updates│             │ git          │           │
│  │ update       │             └──────────────┘           │
│  └──────────────┘                                         │
│                                                             │
│  Types:                        Validators:                 │
│  ┌──────────────┐             ┌──────────────┐           │
│  │ RepoManifest │             │ Structure    │           │
│  │ ProjectInfo  │             │ Manifest     │           │
│  │ Validation   │             │ Policy       │           │
│  │ Verification │             └──────────────┘           │
│  └──────────────┘                                         │
└────────────────────────────────────────────────────────────┘
```

---

## Data Flow

### Initialization Flow

```
Developer runs:        CLI Tool:               Result:
governance init   ──►  1. Detect project   ──►  .repo/ created
                       2. Copy templates
                       3. Auto-fill manifest
                       4. Create folders     ──►  TODO files created
```

### Validation Flow

```
Developer/CI runs:     CLI Tool:               Result:
governance validate ──► 1. Check structure  ──►  Validation report
                        2. Validate manifest
                        3. Check policies
                        4. Generate report   ──►  Exit code (0/1)
```

### Verification Flow

```
CI Pipeline runs:      CLI Tool:               Result:
governance verify  ──►  1. Read manifest    ──►  Verification report
  --profile=ci         2. Run commands
                       3. Check boundaries
                       4. Validate results  ──►  Pass/Fail status
```

### Update Flow

```
Developer runs:        CLI Tool:               Result:
governance update  ──►  1. Backup current   ──►  Updated governance
  [--dry-run]          2. Update Layer 2
                       3. Preserve Layer 1
                       4. Validate result   ──►  Version updated
```

### Agent Workflow

```
Agent receives task:   Agent Actions:          Result:
Task Packet        ──► 1. Read policies     ──► Pass 1: Plan
                       2. Check manifest
                       3. Plan changes      ──► Pass 2: Execute
                       4. Apply edits
                       5. Run verification  ──► Pass 3: Verify
                       6. Create logs
                       7. Generate PR       ──► PR with evidence
```

---

## Integration Points

### Version Control Integration

**GitHub:**
- Uses `.github/workflows/` for CI/CD
- Integrates with GitHub Actions
- Uses composite actions for reusability
- Supports PR comments and status checks

**GitLab:**
- Uses `.gitlab-ci.yml` for pipelines
- Integrates with GitLab CI/CD
- Supports merge request integration
- Uses job artifacts for reports

**Bitbucket:**
- Uses `bitbucket-pipelines.yml`
- Integrates with Bitbucket Pipelines
- Supports pull request integration

### CI/CD Integration

**Supported Platforms:**
1. GitHub Actions (primary)
2. GitLab CI
3. CircleCI
4. Jenkins
5. Azure Pipelines

**Integration Pattern:**
```yaml
# Example GitHub Actions integration
- name: Setup Governance
  uses: ./.github/actions/governance-setup

- name: Validate Governance
  run: governance validate

- name: Run Verification
  run: governance verify --profile=ci
```

### Tool Integration

**Package Managers:**
- npm/yarn (Node.js)
- pip (Python)
- Maven/Gradle (Java)
- Cargo (Rust)
- Go modules

**Test Frameworks:**
- Jest, Mocha (JavaScript)
- pytest (Python)
- JUnit (Java)
- RSpec (Ruby)

**Linters:**
- ESLint (JavaScript)
- Ruff/Flake8 (Python)
- Checkstyle (Java)
- RuboCop (Ruby)

---

## Technology Stack

### Core Technologies

**CLI Tool:**
- Language: TypeScript/JavaScript
- Runtime: Node.js v16+
- CLI Framework: Commander.js
- Prompts: Inquirer.js
- Output: Chalk (colors), CLI-Table3 (tables)

**Configuration:**
- Format: YAML (manifest), Markdown (policies)
- Parsing: js-yaml
- Validation: Ajv (JSON Schema)

**File Operations:**
- Library: fs-extra
- Path handling: path (Node.js)

**Testing:**
- Framework: Jest
- Coverage: 80%+ target

**Code Quality:**
- Linting: ESLint
- Formatting: Prettier
- Type Checking: TypeScript strict mode

### Documentation

**Formats:**
- Markdown for all documentation
- Mermaid.js for diagrams
- JSON Schema for manifest validation

**Tools:**
- Markdown processors
- Diagram generators
- Schema validators

### CI/CD

**Workflow Languages:**
- YAML (GitHub Actions, GitLab CI, Azure Pipelines)
- Groovy (Jenkins)

**Platforms:**
- GitHub Actions (primary)
- GitLab CI
- CircleCI
- Jenkins
- Azure Pipelines

---

## Deployment Model

### Repository Deployment

**Model**: Embedded Framework
- Governance files live in `.repo/` within each repository
- No external services required
- Fully portable and version-controlled

**Advantages:**
- No infrastructure dependencies
- Works offline
- Easy to backup and restore
- Version controlled with code

### CLI Tool Deployment

**Distribution Methods:**

1. **NPM Package** (recommended):
   ```bash
   npm install -g @trevorplam/governance-cli
   ```

2. **Local Installation**:
   ```bash
   cd tools/governance-cli
   npm install
   npm run build
   npm link
   ```

3. **CI/CD Integration**:
   ```bash
   npm install --save-dev @trevorplam/governance-cli
   npx governance verify --profile=ci
   ```

### Template Deployment

**Location**: Embedded in CLI package
- Templates live in `templates/` directory
- Copied to repositories during `init`
- Updated through `governance update` command

---

## Security Architecture

### Security Layers

1. **Policy Layer**: Defined in `.repo/policy/SECURITY_BASELINE.md`
2. **Enforcement Layer**: Validated by CLI and CI/CD
3. **Audit Layer**: Tracked in logs and archives

### Security Features

**Secret Protection:**
- No secrets in logs or traces
- Redaction of sensitive data
- Environment variable protection

**Access Control:**
- Agent permissions defined by roles
- HITL required for sensitive operations
- Waiver approval required for security policy exceptions

**Audit Trail:**
- All governance actions logged
- Decision history preserved
- Waiver and HITL tracking

For detailed security architecture, see [SECURITY_ARCHITECTURE.md](./SECURITY_ARCHITECTURE.md).

---

## Scalability Considerations

### Repository Scale

**Single Repository:**
- Minimal overhead (~1-5 MB for `.repo/`)
- Fast validation (<1 second)
- Quick updates (<5 seconds)

**Organization Scale (10-100 repos):**
- Centralized template management
- Bulk update capabilities
- Consistent governance across all repos

**Enterprise Scale (100+ repos):**
- Automated monitoring and reporting
- Dashboard for compliance tracking
- Integration with enterprise systems

### Performance Characteristics

**CLI Performance:**
- Init: ~5 seconds for Standard tier
- Validate: <1 second for typical repo
- Verify: Depends on test suite (1-10 minutes)
- Update: ~10 seconds with backup

**CI/CD Performance:**
- Governance checks: +1-2 minutes to pipeline
- Caching recommended for dependencies
- Parallel execution supported

### Resource Requirements

**Development Machine:**
- Disk: ~100 MB for CLI + templates
- Memory: ~50 MB during execution
- CPU: Minimal (single-threaded)

**CI/CD Environment:**
- Disk: ~100 MB per repository
- Memory: ~256 MB per pipeline
- Network: Minimal (no external calls)

---

## Related Documents

- [Layer Model](./LAYER_MODEL.md) - Detailed layer architecture
- [Agent Architecture](./AGENT_ARCHITECTURE.md) - Agent execution model
- [Security Architecture](./SECURITY_ARCHITECTURE.md) - Security design
- [CLI Reference](../reference/CLI_REFERENCE.md) - CLI tool documentation
- [Manifest Reference](../reference/MANIFEST_REFERENCE.md) - Manifest format

---

**Version:** 1.0.0  
**Last Updated:** 2026-01-22  
**Maintainer:** TrevorPLam/governance
