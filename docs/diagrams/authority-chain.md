# Authority Chain Diagram

## Overview

This diagram illustrates the hierarchical authority chain in the governance system, showing how policies, agents, manifests, and standards interact to make governance decisions.

## Authority Hierarchy

```mermaid
graph TD
    subgraph "Level 1: Constitutional Authority"
        CONST[CONSTITUTION<br/>Immutable Rules]
        PRINC[PRINCIPLES<br/>Core Values]
    end

    subgraph "Level 2: Policy Authority"
        QG[QUALITY_GATES<br/>Quality Standards]
        SEC[SECURITY_BASELINE<br/>Security Requirements]
        BOUND[BOUNDARIES<br/>Architectural Rules]
    end

    subgraph "Level 3: Configuration Authority"
        MANIFEST[repo.manifest.yaml<br/>Project Configuration]
        AGENTS[Agent Roles<br/>Permissions & Capabilities]
    end

    subgraph "Level 4: Implementation Authority"
        STANDARDS[Standards Docs<br/>How-To Guides]
        TEMPLATES[Templates<br/>Boilerplate]
        EXAMPLES[Examples<br/>Reference Implementations]
    end

    subgraph "Level 5: Local Authority"
        HITL_ACTIVE[Active HITL Items<br/>Current Exceptions]
        WAIVERS[Active Waivers<br/>Approved Deviations]
    end

    %% Authority flow
    CONST --> QG
    CONST --> SEC
    CONST --> BOUND
    PRINC --> QG
    PRINC --> SEC
    PRINC --> BOUND

    QG --> MANIFEST
    SEC --> MANIFEST
    BOUND --> MANIFEST

    MANIFEST --> AGENTS
    MANIFEST --> STANDARDS

    STANDARDS --> TEMPLATES
    STANDARDS --> EXAMPLES

    %% Override paths
    HITL_ACTIVE -.Override.-> QG
    HITL_ACTIVE -.Override.-> BOUND
    WAIVERS -.Override.-> QG
    WAIVERS -.Override.-> SEC

    %% Styling
    style CONST fill:#ffebee
    style PRINC fill:#ffebee
    style MANIFEST fill:#e3f2fd
    style HITL_ACTIVE fill:#fff3e0
    style WAIVERS fill:#fff3e0
```

## Decision Flow

```mermaid
graph LR
    START[Code Change] --> LOAD_POL[Load Policies]
    LOAD_POL --> LOAD_MAN[Load Manifest]
    LOAD_MAN --> CHECK_CONST{Check CONSTITUTION}
    
    CHECK_CONST -->|Violates| REJECT1[❌ Reject]
    CHECK_CONST -->|Complies| CHECK_PRINC{Check PRINCIPLES}
    
    CHECK_PRINC -->|Violates| CHECK_WAIVER1{Has Waiver?}
    CHECK_PRINC -->|Complies| CHECK_BOUND{Check BOUNDARIES}
    
    CHECK_WAIVER1 -->|Yes| CHECK_BOUND
    CHECK_WAIVER1 -->|No| REJECT2[❌ Reject]
    
    CHECK_BOUND -->|Violates| CHECK_HITL1{Has HITL Approval?}
    CHECK_BOUND -->|Complies| CHECK_QG{Check QUALITY_GATES}
    
    CHECK_HITL1 -->|Yes| CHECK_QG
    CHECK_HITL1 -->|No| ESC_HITL1[Escalate to HITL]
    
    CHECK_QG -->|Violates| CHECK_WAIVER2{Has Waiver?}
    CHECK_QG -->|Complies| CHECK_SEC{Check SECURITY}
    
    CHECK_WAIVER2 -->|Yes| CHECK_SEC
    CHECK_WAIVER2 -->|No| CHECK_HITL2{Can Request Waiver?}
    
    CHECK_HITL2 -->|Yes| ESC_WAIVER[Request Waiver]
    CHECK_HITL2 -->|No| REJECT3[❌ Reject]
    
    CHECK_SEC -->|Violates| ESC_SEC[❌ Security Violation]
    CHECK_SEC -->|Complies| APPROVE[✅ Approve]
    
    ESC_HITL1 -.Human Review.-> HUMAN1[Human Decision]
    ESC_WAIVER -.Human Review.-> HUMAN2[Human Decision]
    
    HUMAN1 -->|Approve| CHECK_QG
    HUMAN1 -->|Reject| REJECT4[❌ Reject]
    
    HUMAN2 -->|Approve| CHECK_SEC
    HUMAN2 -->|Reject| REJECT5[❌ Reject]

    style APPROVE fill:#e8f5e9
    style REJECT1 fill:#ffebee
    style REJECT2 fill:#ffebee
    style REJECT3 fill:#ffebee
    style REJECT4 fill:#ffebee
    style REJECT5 fill:#ffebee
    style ESC_SEC fill:#ffebee
    style HUMAN1 fill:#f3e5f5
    style HUMAN2 fill:#f3e5f5
```

## Policy Override Hierarchy

```mermaid
graph TD
    subgraph "Cannot Override"
        CONST_RULE[CONSTITUTION Rules]
        SEC_RULE[Security Hard Gates]
    end

    subgraph "Can Override with HITL"
        BOUND_RULE[Boundary Violations]
        PRINC_RULE[Principle Deviations]
    end

    subgraph "Can Override with Waiver"
        QG_RULE[Quality Gate Failures]
        COVERAGE[Coverage Targets]
        PERF[Performance Targets]
    end

    subgraph "Can Override Locally"
        STANDARD[Standard Deviations]
        TEMPLATE[Template Modifications]
        EXAMPLE[Example Variations]
    end

    CONST_RULE -.Cannot Override.-> REJECT[Automatic Rejection]
    SEC_RULE -.Cannot Override.-> REJECT

    BOUND_RULE --> HITL_REQ[HITL Request]
    PRINC_RULE --> HITL_REQ
    
    QG_RULE --> WAIVER_REQ[Waiver Request]
    COVERAGE --> WAIVER_REQ
    PERF --> WAIVER_REQ

    STANDARD --> LOCAL_DECISION[Local Team Decision]
    TEMPLATE --> LOCAL_DECISION
    EXAMPLE --> LOCAL_DECISION

    HITL_REQ --> HUMAN_REVIEW[Human Review]
    WAIVER_REQ --> HUMAN_REVIEW
    
    HUMAN_REVIEW -->|Approve| TEMP_OVERRIDE[Temporary Override]
    HUMAN_REVIEW -->|Reject| REJECT2[Rejection]

    style REJECT fill:#ffebee
    style REJECT2 fill:#ffebee
    style TEMP_OVERRIDE fill:#fff3e0
    style LOCAL_DECISION fill:#e8f5e9
    style HUMAN_REVIEW fill:#f3e5f5
```

## Agent Authority Model

```mermaid
graph LR
    subgraph "Agent Roles"
        PRIMARY[Primary Agent<br/>Full Authority]
        SECONDARY[Secondary Agent<br/>Limited Authority]
        REVIEWER[Reviewer Agent<br/>Review Only]
        RELEASE[Release Agent<br/>Deploy Authority]
    end

    subgraph "Permissions"
        AUTO_APPROVE[Auto-Approve Changes]
        ESCALATE[Escalate to HITL]
        REVIEW[Review Changes]
        DEPLOY[Deploy to Production]
    end

    subgraph "Constraints"
        POLICY_BOUNDS[Policy Boundaries]
        SECURITY_BOUNDS[Security Boundaries]
        QUALITY_BOUNDS[Quality Boundaries]
    end

    PRIMARY --> AUTO_APPROVE
    PRIMARY --> ESCALATE
    PRIMARY --> REVIEW
    
    SECONDARY --> ESCALATE
    SECONDARY --> REVIEW
    
    REVIEWER --> REVIEW
    
    RELEASE --> DEPLOY
    RELEASE --> REVIEW

    AUTO_APPROVE -.Constrained By.-> POLICY_BOUNDS
    AUTO_APPROVE -.Constrained By.-> SECURITY_BOUNDS
    AUTO_APPROVE -.Constrained By.-> QUALITY_BOUNDS
    
    DEPLOY -.Constrained By.-> SECURITY_BOUNDS
    DEPLOY -.Constrained By.-> QUALITY_BOUNDS

    style PRIMARY fill:#4caf50,color:#fff
    style SECONDARY fill:#2196f3,color:#fff
    style REVIEWER fill:#ff9800,color:#fff
    style RELEASE fill:#9c27b0,color:#fff
```

## Configuration Precedence

```mermaid
graph TD
    START[Decision Required] --> CHECK1{CONSTITUTION<br/>Defines Rule?}
    
    CHECK1 -->|Yes| APPLY_CONST[Apply CONSTITUTION]
    CHECK1 -->|No| CHECK2{PRINCIPLES<br/>Guide Decision?}
    
    CHECK2 -->|Yes| APPLY_PRINC[Apply PRINCIPLES]
    CHECK2 -->|No| CHECK3{Policy<br/>Defines Rule?}
    
    CHECK3 -->|Yes| APPLY_POL[Apply Policy]
    CHECK3 -->|No| CHECK4{Manifest<br/>Configures?}
    
    CHECK4 -->|Yes| APPLY_MAN[Apply Manifest]
    CHECK4 -->|No| CHECK5{Standard<br/>Recommends?}
    
    CHECK5 -->|Yes| APPLY_STD[Apply Standard]
    CHECK5 -->|No| DEFAULT[Use Default Behavior]

    APPLY_CONST --> ENFORCE1[Enforce Without Exception]
    APPLY_PRINC --> CHECK_HITL{HITL<br/>Approved?}
    APPLY_POL --> CHECK_WAIVER{Waiver<br/>Exists?}
    APPLY_MAN --> ENFORCE2[Enforce Per Config]
    APPLY_STD --> RECOMMEND[Recommend but Allow Deviation]
    DEFAULT --> ALLOW[Allow with Warning]

    CHECK_HITL -->|Yes| ENFORCE2
    CHECK_HITL -->|No| ENFORCE1

    CHECK_WAIVER -->|Yes| ENFORCE2
    CHECK_WAIVER -->|No| ENFORCE1

    style ENFORCE1 fill:#ffebee
    style ENFORCE2 fill:#fff3e0
    style RECOMMEND fill:#e3f2fd
    style ALLOW fill:#e8f5e9
```

## Layer Update Model

```mermaid
graph LR
    subgraph "Layer 1: Custom (Project-Specific)"
        L1A[HITL.md]
        L1B[WAIVERS.md]
        L1C[repo.manifest.yaml]
    end

    subgraph "Layer 2: Updateable (Governance Source)"
        L2A[CONSTITUTION.md]
        L2B[PRINCIPLES.md]
        L2C[QUALITY_GATES.md]
        L2D[SECURITY_BASELINE.md]
        L2E[BOUNDARIES.md]
    end

    subgraph "Layer 3: Reference (Always Latest)"
        L3A[Standards]
        L3B[Templates]
        L3C[Examples]
    end

    UPDATE_SOURCE[Governance Updates] --> L2A
    UPDATE_SOURCE --> L2B
    UPDATE_SOURCE --> L2C
    UPDATE_SOURCE --> L2D
    UPDATE_SOURCE --> L2E
    UPDATE_SOURCE --> L3A
    UPDATE_SOURCE --> L3B
    UPDATE_SOURCE --> L3C

    L1A -.Never Updated.-> PRESERVE1[Preserve Local Customizations]
    L1B -.Never Updated.-> PRESERVE1
    L1C -.Never Updated.-> PRESERVE1

    L2A --> MERGE[Merge Updates]
    L2B --> MERGE
    L2C --> MERGE
    L2D --> MERGE
    L2E --> MERGE

    L3A --> REPLACE[Replace with Latest]
    L3B --> REPLACE
    L3C --> REPLACE

    style L1A fill:#fff3e0
    style L1B fill:#fff3e0
    style L1C fill:#fff3e0
    style L2A fill:#e3f2fd
    style L2B fill:#e3f2fd
    style L2C fill:#e3f2fd
    style L2D fill:#e3f2fd
    style L2E fill:#e3f2fd
    style L3A fill:#f3e5f5
    style L3B fill:#f3e5f5
    style L3C fill:#f3e5f5
```

## Key Principles

### Authority Hierarchy
1. **CONSTITUTION** - Highest authority, immutable
2. **PRINCIPLES** - Core values, guide all decisions
3. **Policies** - Enforceable rules (QG, Security, Boundaries)
4. **Configuration** - Project-specific settings (Manifest, Agents)
5. **Standards** - Recommendations and best practices
6. **Local** - Team-specific customizations (HITL, Waivers)

### Override Mechanisms
- **No Override**: CONSTITUTION, Security hard gates
- **HITL Override**: Boundaries, Principles
- **Waiver Override**: Quality gates, Performance targets
- **Local Override**: Standards, Templates

### Decision Making
1. Check CONSTITUTION (cannot violate)
2. Check PRINCIPLES (can deviate with HITL)
3. Check Policies (can waive specific rules)
4. Check Manifest (project configuration)
5. Check Standards (recommendations)
6. Default behavior (allow with warning)

### Update Strategy
- **Layer 1 (Custom)**: Never updated automatically
- **Layer 2 (Updateable)**: Merged with care, preserve local changes
- **Layer 3 (Reference)**: Always replaced with latest

## Related Documentation

- **Policy Reference**: `/docs/reference/POLICY_REFERENCE.md`
- **Manifest Reference**: `/docs/reference/MANIFEST_REFERENCE.md`
- **Agent Architecture**: `/docs/architecture/AGENT_ARCHITECTURE.md`
- **Waiver Management**: `/docs/guides/HOW_TO_MANAGE_WAIVERS.md`

---

**Last Updated:** 2026-01-22  
**Version:** 1.0.0
