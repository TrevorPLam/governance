# System Architecture Diagram

## Overview

This diagram shows the complete architecture of the AI-Native Governance System, including all major components, their relationships, data flow, and integration points.

## High-Level System Architecture

```mermaid
graph TB
    subgraph "External Repos"
        REPO[Repository]
        REPO_FILES[Source Code]
        REPO_GOV[.repo/ Governance]
        REPO --> REPO_FILES
        REPO --> REPO_GOV
    end

    subgraph "Governance Framework"
        POLICIES[Policy Files]
        MANIFEST[repo.manifest.yaml]
        AGENTS[Agent Framework]
        TEMPLATES[Templates]
        
        POLICIES --> CONST[CONSTITUTION]
        POLICIES --> PRINC[PRINCIPLES]
        POLICIES --> QG[QUALITY_GATES]
        POLICIES --> SEC[SECURITY_BASELINE]
        POLICIES --> BOUND[BOUNDARIES]
        POLICIES --> HITL[HITL]
        POLICIES --> WAIVE[WAIVERS]
    end

    subgraph "CLI Tools"
        CLI[governance-cli]
        CLI --> INIT[init]
        CLI --> VAL[validate]
        CLI --> VER[verify]
        CLI --> UPDATE[update]
        CLI --> CHECK[check-updates]
    end

    subgraph "CI/CD Integration"
        CICD[CI/CD Pipeline]
        CICD --> BUILD[Build Stage]
        CICD --> TEST[Test Stage]
        CICD --> GOV_CHECK[Governance Stage]
        CICD --> SEC_SCAN[Security Stage]
        CICD --> DEPLOY[Deploy Stage]
    end

    subgraph "Agent System"
        AGENT_EXEC[Agent Executor]
        AGENT_EXEC --> PASS1[Pass 1: Plan]
        AGENT_EXEC --> PASS2[Pass 2: Change]
        AGENT_EXEC --> PASS3[Pass 3: Verify]
        
        PASS3 --> BOUND_CHECK[Boundary Checker]
        PASS3 --> QG_CHECK[Quality Gate Checker]
        PASS3 --> SEC_CHECK[Security Checker]
    end

    subgraph "Human-in-the-Loop"
        HUMAN[Human Reviewer]
        HITL_SYS[HITL System]
        WAIVER_SYS[Waiver System]
        
        HITL_SYS --> HUMAN
        WAIVER_SYS --> HUMAN
    end

    subgraph "Validation & Enforcement"
        VALIDATOR[Schema Validator]
        BOUNDARY_TOOL[Boundary Analyzer]
        QUALITY_TOOL[Quality Analyzer]
        SECURITY_TOOL[Security Scanner]
    end

    %% Connections
    REPO_GOV --> POLICIES
    REPO_GOV --> MANIFEST
    REPO_GOV --> AGENTS
    
    CLI --> REPO_GOV
    CLI --> VALIDATOR
    
    CICD --> CLI
    CICD --> AGENT_EXEC
    CICD --> VALIDATOR
    
    AGENT_EXEC --> POLICIES
    AGENT_EXEC --> MANIFEST
    AGENT_EXEC --> HITL_SYS
    
    BOUND_CHECK --> BOUNDARY_TOOL
    QG_CHECK --> QUALITY_TOOL
    SEC_CHECK --> SECURITY_TOOL
    
    VALIDATOR --> MANIFEST
    BOUNDARY_TOOL --> BOUND
    QUALITY_TOOL --> QG
    SECURITY_TOOL --> SEC
    
    PASS3 --> HITL_SYS
    HITL_SYS --> WAIVER_SYS
    
    style POLICIES fill:#e1f5ff
    style AGENT_EXEC fill:#fff3e0
    style HUMAN fill:#f3e5f5
    style VALIDATOR fill:#e8f5e9
```

## Detailed Component Architecture

```mermaid
graph LR
    subgraph "Repository Layer"
        A[External Repository]
        B[.repo/ Directory]
        C[Source Code]
    end

    subgraph "Policy Layer"
        D[CONSTITUTION]
        E[PRINCIPLES]
        F[QUALITY_GATES]
        G[SECURITY_BASELINE]
        H[BOUNDARIES]
        I[HITL Policies]
        J[WAIVER Policies]
    end

    subgraph "Configuration Layer"
        K[repo.manifest.yaml]
        L[Agent Roles]
        M[Standards]
    end

    subgraph "Execution Layer"
        N[CLI Tool]
        O[CI/CD Pipeline]
        P[Agent Executor]
    end

    subgraph "Validation Layer"
        Q[JSON Schema Validator]
        R[Boundary Checker]
        S[Quality Gate Checker]
        T[Security Scanner]
    end

    subgraph "Decision Layer"
        U[Automated Decisions]
        V[HITL Escalation]
        W[Human Approval]
    end

    A --> B
    A --> C
    B --> D
    B --> E
    B --> F
    B --> G
    B --> H
    B --> I
    B --> J
    B --> K
    B --> L
    B --> M

    K --> N
    K --> O
    K --> P

    N --> Q
    O --> P
    P --> R
    P --> S
    P --> T

    R --> U
    S --> U
    T --> U

    U --> V
    V --> W
    W --> U

    style D fill:#ffebee
    style E fill:#ffebee
    style F fill:#ffebee
    style G fill:#ffebee
    style H fill:#ffebee
    style U fill:#e8f5e9
    style V fill:#fff3e0
    style W fill:#f3e5f5
```

## Data Flow Architecture

```mermaid
sequenceDiagram
    participant Dev as Developer
    participant Repo as Repository
    participant CI as CI/CD
    participant Agent as Agent System
    participant Policy as Policy Engine
    participant HITL as HITL System
    participant Human as Human Reviewer

    Dev->>Repo: Push code changes
    Repo->>CI: Trigger pipeline
    CI->>Agent: Execute governance checks
    Agent->>Policy: Load policies
    Policy-->>Agent: Return policy rules
    Agent->>Agent: Pass 1 - Plan changes
    Agent->>Agent: Pass 2 - Execute changes
    Agent->>Agent: Pass 3 - Verify compliance
    
    alt Automated approval possible
        Agent->>CI: ✅ Approved
        CI->>Repo: Merge changes
    else Requires human review
        Agent->>HITL: Escalate for review
        HITL->>Human: Request approval
        Human->>HITL: Approve/Reject
        HITL->>Agent: Return decision
        Agent->>CI: ✅/❌ Result
    end
```

## Technology Stack

```mermaid
graph TD
    subgraph "Language & Runtime"
        TS[TypeScript/JavaScript]
        NODE[Node.js 16+]
        PYTHON[Python 3.8+]
    end

    subgraph "CLI Framework"
        CMD[Commander.js]
        INQ[Inquirer.js]
        CHALK[Chalk]
        CLI_TABLE[CLI-Table3]
    end

    subgraph "Validation"
        AJV[Ajv - JSON Schema]
        ESLINT[ESLint]
        CUSTOM[Custom Validators]
    end

    subgraph "CI/CD Platforms"
        GHA[GitHub Actions]
        GITLAB[GitLab CI]
        CIRCLE[CircleCI]
        JENKINS[Jenkins]
        AZURE[Azure Pipelines]
    end

    subgraph "Documentation"
        MD[Markdown]
        MERMAID[Mermaid.js]
        YAML[YAML]
        JSON[JSON Schema]
    end

    subgraph "Testing"
        JEST[Jest]
        PYTEST[pytest]
        SUPERTEST[SuperTest]
    end

    TS --> NODE
    PYTHON --> PYTEST
    
    NODE --> CMD
    NODE --> INQ
    NODE --> CHALK
    NODE --> CLI_TABLE
    
    NODE --> AJV
    NODE --> ESLINT
    NODE --> CUSTOM
    
    NODE --> JEST
    NODE --> SUPERTEST
    
    CMD --> GHA
    CMD --> GITLAB
    CMD --> CIRCLE
    CMD --> JENKINS
    CMD --> AZURE
    
    style TS fill:#3178c6,color:#fff
    style NODE fill:#339933,color:#fff
    style PYTHON fill:#3776ab,color:#fff
```

## Deployment Model

```mermaid
graph TD
    subgraph "Source Repository"
        SRC[Governance Repo]
        SRC --> TEMPLATES[templates/]
        SRC --> TOOLS[tools/]
        SRC --> DOCS[docs/]
        SRC --> EXAMPLES[examples/]
    end

    subgraph "Distribution"
        NPM[npm Registry]
        PYPI[PyPI]
        GIT[Git Clone]
        DOWNLOAD[Direct Download]
    end

    subgraph "Target Repository"
        TARGET[Project Repository]
        TARGET --> DOT_REPO[.repo/]
        TARGET --> SRC_CODE[src/]
        TARGET --> TESTS[tests/]
    end

    subgraph "Installation Methods"
        CLI_INSTALL[CLI Installation]
        MANUAL[Manual Copy]
        STARTER[Starter Kit]
    end

    TEMPLATES --> CLI_INSTALL
    TEMPLATES --> MANUAL
    TEMPLATES --> STARTER
    
    TOOLS --> NPM
    TOOLS --> PYPI
    
    CLI_INSTALL --> TARGET
    MANUAL --> TARGET
    STARTER --> TARGET
    
    NPM --> CLI_INSTALL
    PYPI --> CLI_INSTALL
    GIT --> MANUAL
    DOWNLOAD --> MANUAL
    
    SRC --> EXAMPLES
    EXAMPLES --> STARTER

    style SRC fill:#e1f5ff
    style TARGET fill:#e8f5e9
    style NPM fill:#cc0000,color:#fff
    style PYPI fill:#3776ab,color:#fff
```

## Key Components

### Policy Files
- **CONSTITUTION**: Core governance rules (immutable)
- **PRINCIPLES**: Development principles (P3-P25)
- **QUALITY_GATES**: Quality thresholds and gates
- **SECURITY_BASELINE**: Security requirements
- **BOUNDARIES**: Architectural boundaries
- **HITL**: Human-in-the-loop policies
- **WAIVERS**: Waiver management

### Configuration
- **repo.manifest.yaml**: Project-specific configuration
- **Agent Roles**: Role definitions and permissions
- **Standards**: Documentation and coding standards

### Tools
- **CLI**: Command-line interface for governance operations
- **Validators**: Schema and policy validators
- **Analyzers**: Boundary and quality analyzers
- **Scanners**: Security and vulnerability scanners

### Workflows
- **Agent Execution**: Three-pass automated workflow
- **CI/CD Integration**: Pipeline integration
- **HITL System**: Human review and approval
- **Waiver Management**: Exception tracking

## Integration Points

1. **Version Control**: Git integration for tracking changes
2. **CI/CD Platforms**: GitHub Actions, GitLab CI, CircleCI, Jenkins, Azure
3. **Code Analysis**: ESLint, pylint, custom analyzers
4. **Security Scanning**: Dependency scanners, SAST tools
5. **Communication**: Slack, Teams, email notifications
6. **Issue Tracking**: GitHub Issues, Jira, Linear
7. **Documentation**: Markdown, wikis, documentation sites

## Scalability Considerations

### Horizontal Scaling
- CLI tools are stateless
- CI/CD jobs run in parallel
- Multiple agents can execute independently

### Vertical Scaling
- Policy evaluation is cached
- Incremental validation
- Lazy loading of governance files

### Performance Targets
- CLI init: < 5 seconds
- Validation: < 10 seconds
- Full verification: < 60 seconds
- Agent execution: < 5 minutes per pass

## Security Architecture

```mermaid
graph TD
    subgraph "Security Layers"
        L1[Policy Layer]
        L2[Validation Layer]
        L3[Execution Layer]
        L4[Audit Layer]
    end

    L1 --> SEC_POL[Security Policies]
    L1 --> SEC_BASE[Security Baseline]
    
    L2 --> SCHEMA[Schema Validation]
    L2 --> SEC_SCAN[Security Scanning]
    L2 --> DEP_CHECK[Dependency Check]
    
    L3 --> SANDBOXED[Sandboxed Execution]
    L3 --> LEAST_PRIV[Least Privilege]
    L3 --> AUDIT_LOG[Audit Logging]
    
    L4 --> LOG_STORE[Log Storage]
    L4 --> ALERT[Alerting]
    L4 --> REPORT[Reporting]

    style SEC_POL fill:#ffebee
    style SEC_SCAN fill:#ffebee
    style AUDIT_LOG fill:#fff3e0
```

## Related Documentation

- **Architecture Overview**: `/docs/architecture/ARCHITECTURE_OVERVIEW.md`
- **Agent Architecture**: `/docs/architecture/AGENT_ARCHITECTURE.md`
- **Security Architecture**: `/docs/architecture/SECURITY_ARCHITECTURE.md`
- **CLI Reference**: `/docs/reference/CLI_REFERENCE.md`

---

**Last Updated:** 2026-01-22  
**Version:** 1.0.0
