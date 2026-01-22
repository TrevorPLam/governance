# Agent Execution Flow

## Overview

The Agent Execution Flow diagram illustrates the three-pass execution process that AI agents follow when making changes in the governance framework. This systematic approach ensures that agents plan thoroughly, execute precisely, and verify comprehensively, with multiple quality gates and Human-in-the-Loop (HITL) escalation points throughout the process.

The three-pass model—Plan, Change, Verify—provides a structured approach that balances automation efficiency with safety and compliance. Each pass has distinct objectives, decision points, and escalation paths to ensure that changes meet quality standards, stay within defined boundaries, and comply with security requirements.

## Three-Pass Execution Model

```mermaid
graph TB
    Start([Agent Task Received]) --> Pass1[Pass 1: Plan]
    
    Pass1 --> P1_Analyze[Analyze Requirements]
    P1_Analyze --> P1_Boundary{Within<br/>Boundaries?}
    
    P1_Boundary -->|No| P1_Escalate1[HITL: Boundary Violation]
    P1_Escalate1 --> P1_Human1{Human<br/>Decision}
    P1_Human1 -->|Approve| P1_CreatePlan
    P1_Human1 -->|Reject| End1([Task Rejected])
    
    P1_Boundary -->|Yes| P1_CreatePlan[Create Execution Plan]
    P1_CreatePlan --> P1_Risk{Risk<br/>Assessment}
    
    P1_Risk -->|High Risk| P1_Escalate2[HITL: High Risk Review]
    P1_Escalate2 --> P1_Human2{Human<br/>Decision}
    P1_Human2 -->|Approve| P1_Gate
    P1_Human2 -->|Reject| End2([Task Rejected])
    
    P1_Risk -->|Low/Medium| P1_Gate{Pass 1<br/>Quality Gate}
    P1_Gate -->|Fail| P1_Retry{Retry<br/>Count}
    P1_Retry -->|< Max| Pass1
    P1_Retry -->|>= Max| P1_Escalate3[HITL: Planning Failed]
    P1_Escalate3 --> End3([Task Failed])
    
    P1_Gate -->|Pass| Pass2[Pass 2: Change]
    
    Pass2 --> P2_Execute[Execute Planned Changes]
    P2_Execute --> P2_Monitor[Monitor Execution]
    P2_Monitor --> P2_Boundary{Boundary<br/>Check}
    
    P2_Boundary -->|Violation| P2_Rollback[Rollback Changes]
    P2_Rollback --> P2_Escalate1[HITL: Execution Boundary Violation]
    P2_Escalate1 --> End4([Task Failed])
    
    P2_Boundary -->|OK| P2_Quality{Quality<br/>Checks}
    P2_Quality -->|Fail| P2_Retry{Retry<br/>Count}
    P2_Retry -->|< Max| P2_Execute
    P2_Retry -->|>= Max| P2_Escalate2[HITL: Quality Failed]
    P2_Escalate2 --> End5([Task Failed])
    
    P2_Quality -->|Pass| P2_Security{Security<br/>Scan}
    P2_Security -->|Vulnerabilities| P2_Escalate3[HITL: Security Issues]
    P2_Escalate3 --> P2_Human3{Human<br/>Decision}
    P2_Human3 -->|Fix| P2_Execute
    P2_Human3 -->|Waiver| Pass3
    P2_Human3 -->|Reject| End6([Task Failed])
    
    P2_Security -->|Clean| Pass3[Pass 3: Verify]
    
    Pass3 --> P3_Test[Run Test Suite]
    P3_Test --> P3_Results{Tests<br/>Pass?}
    
    P3_Results -->|Fail| P3_Analyze[Analyze Failures]
    P3_Analyze --> P3_Fixable{Auto-<br/>Fixable?}
    P3_Fixable -->|Yes| P2_Execute
    P3_Fixable -->|No| P3_Escalate1[HITL: Test Failures]
    P3_Escalate1 --> End7([Task Failed])
    
    P3_Results -->|Pass| P3_Integrate[Integration Check]
    P3_Integrate --> P3_IntResult{Integration<br/>OK?}
    
    P3_IntResult -->|Fail| P3_Escalate2[HITL: Integration Failed]
    P3_Escalate2 --> End8([Task Failed])
    
    P3_IntResult -->|Pass| P3_Evidence[Generate Evidence]
    P3_Evidence --> P3_Final{Final<br/>Quality Gate}
    
    P3_Final -->|Fail| P3_Escalate3[HITL: Final Review]
    P3_Escalate3 --> End9([Task Failed])
    
    P3_Final -->|Pass| Success([Task Completed])
    
    style Pass1 fill:#e1f5ff
    style Pass2 fill:#fff4e1
    style Pass3 fill:#e8f5e9
    style Success fill:#4caf50,color:#fff
    style End1 fill:#ffebee
    style End2 fill:#ffebee
    style End3 fill:#ffebee
    style End4 fill:#ffebee
    style End5 fill:#ffebee
    style End6 fill:#ffebee
    style End7 fill:#ffebee
    style End8 fill:#ffebee
    style End9 fill:#ffebee
```

## Agent-to-Human Interaction Sequence

```mermaid
sequenceDiagram
    participant Agent
    participant Framework
    participant BoundaryCheck
    participant SecurityScan
    participant QualityGate
    participant Human
    participant AuditLog
    
    Agent->>Framework: Task Request
    Framework->>AuditLog: Log Task Start
    
    rect rgb(225, 245, 255)
        Note over Agent,QualityGate: Pass 1: Plan
        Agent->>Agent: Analyze Requirements
        Agent->>BoundaryCheck: Validate Scope
        
        alt Within Boundaries
            BoundaryCheck-->>Agent: Approved
            Agent->>Agent: Create Execution Plan
            Agent->>Framework: Submit Plan
            Framework->>QualityGate: Evaluate Plan
            
            alt High Risk Detected
                QualityGate->>Human: HITL: Review High Risk Plan
                Human-->>QualityGate: Approve/Reject
                QualityGate-->>Agent: Decision
            else Low/Medium Risk
                QualityGate-->>Agent: Auto-Approved
            end
        else Boundary Violation
            BoundaryCheck->>Human: HITL: Boundary Exception Request
            Human-->>BoundaryCheck: Approve/Reject
            BoundaryCheck-->>Agent: Decision
        end
        
        Agent->>AuditLog: Log Pass 1 Complete
    end
    
    rect rgb(255, 244, 225)
        Note over Agent,QualityGate: Pass 2: Change
        Agent->>Agent: Execute Changes
        Agent->>BoundaryCheck: Runtime Validation
        
        alt Boundary Violation Detected
            BoundaryCheck->>Agent: Rollback Changes
            BoundaryCheck->>Human: HITL: Runtime Violation
            Human-->>Framework: Investigation Required
        else Boundaries Maintained
            BoundaryCheck-->>Agent: Proceed
            Agent->>QualityGate: Submit Changes
            QualityGate->>SecurityScan: Scan for Vulnerabilities
            
            alt Vulnerabilities Found
                SecurityScan->>Human: HITL: Security Issues Detected
                Human-->>SecurityScan: Fix/Waiver/Reject
                
                alt Fix Required
                    SecurityScan-->>Agent: Remediate
                    Agent->>Agent: Apply Fixes
                else Waiver Granted
                    SecurityScan-->>Agent: Continue with Waiver
                else Rejected
                    SecurityScan-->>Agent: Abort
                end
            else Clean Scan
                SecurityScan-->>Agent: Approved
            end
        end
        
        Agent->>AuditLog: Log Pass 2 Complete
    end
    
    rect rgb(232, 245, 233)
        Note over Agent,QualityGate: Pass 3: Verify
        Agent->>Agent: Run Test Suite
        
        alt Tests Pass
            Agent->>Framework: Integration Check
            Framework->>QualityGate: Final Validation
            
            alt Final Gate Pass
                QualityGate-->>Agent: Approved
                Agent->>Agent: Generate Evidence
                Agent->>Framework: Submit Completion
                Framework->>AuditLog: Log Success
            else Final Gate Fail
                QualityGate->>Human: HITL: Final Review Required
                Human-->>Framework: Manual Resolution
            end
        else Tests Fail
            Agent->>Agent: Analyze Failures
            
            alt Auto-Fixable
                Agent->>Agent: Apply Fixes
                Agent->>Agent: Retry Tests
            else Not Auto-Fixable
                Agent->>Human: HITL: Test Failures
                Human-->>Framework: Manual Intervention
            end
        end
    end
```

## Pass 1: Plan - Detailed Flow

```mermaid
graph TB
    P1Start([Pass 1 Start]) --> Analyze[Analyze Task Requirements]
    
    Analyze --> ParseReq[Parse Requirements]
    ParseReq --> IdentDeps[Identify Dependencies]
    IdentDeps --> AssessScope[Assess Scope]
    
    AssessScope --> BoundaryCheck{Boundary<br/>Validation}
    
    BoundaryCheck -->|File Access| FileCheck[Check File Permissions]
    BoundaryCheck -->|API Calls| APICheck[Check API Boundaries]
    BoundaryCheck -->|Resource Usage| ResourceCheck[Check Resource Limits]
    
    FileCheck --> Aggregate1[Aggregate Results]
    APICheck --> Aggregate1
    ResourceCheck --> Aggregate1
    
    Aggregate1 --> BoundaryResult{All<br/>Checks Pass?}
    
    BoundaryResult -->|No| BoundaryEscalate[HITL Escalation]
    BoundaryEscalate --> BoundaryDoc[Document Violation]
    BoundaryDoc --> BoundaryHuman{Human<br/>Review}
    
    BoundaryHuman -->|Approve with Waiver| CreateWaiver[Create Waiver Record]
    CreateWaiver --> RiskAssess
    BoundaryHuman -->|Reject| P1Fail([Pass 1 Failed])
    
    BoundaryResult -->|Yes| RiskAssess[Risk Assessment]
    
    RiskAssess --> CalcRisk[Calculate Risk Score]
    CalcRisk --> RiskFactors[Evaluate Risk Factors:<br/>- Change Impact<br/>- Security Implications<br/>- Rollback Complexity<br/>- Affected Systems]
    
    RiskFactors --> RiskLevel{Risk<br/>Level?}
    
    RiskLevel -->|Critical| CriticalEscalate[Mandatory HITL Review]
    CriticalEscalate --> CriticalDoc[Document Critical Factors]
    CriticalDoc --> CriticalHuman{Human<br/>Approval}
    CriticalHuman -->|Reject| P1Fail
    CriticalHuman -->|Approve| CreatePlan
    
    RiskLevel -->|High| HighEscalate[HITL Review Recommended]
    HighEscalate --> HighDoc[Document High Risk Factors]
    HighDoc --> HighHuman{Human<br/>Review}
    HighHuman -->|Reject| P1Fail
    HighHuman -->|Approve| CreatePlan
    
    RiskLevel -->|Medium/Low| CreatePlan[Create Execution Plan]
    
    CreatePlan --> PlanSteps[Define Steps]
    PlanSteps --> PlanSequence[Determine Sequence]
    PlanSequence --> PlanRollback[Plan Rollback Strategy]
    PlanRollback --> PlanCheck[Validate Checkpoints]
    
    PlanCheck --> QualityGate[Pass 1 Quality Gate]
    
    QualityGate --> QG1[Completeness Check]
    QualityGate --> QG2[Consistency Check]
    QualityGate --> QG3[Feasibility Check]
    
    QG1 --> QGAggregate[Aggregate Gate Results]
    QG2 --> QGAggregate
    QG3 --> QGAggregate
    
    QGAggregate --> QGResult{Gate<br/>Pass?}
    
    QGResult -->|No| QGRetry{Retry<br/>Attempts<br/>< 3?}
    QGRetry -->|Yes| Analyze
    QGRetry -->|No| QGEscalate[HITL: Planning Failed]
    QGEscalate --> P1Fail
    
    QGResult -->|Yes| P1Success([Pass 1 Complete<br/>Proceed to Pass 2])
    
    style P1Start fill:#e1f5ff
    style P1Success fill:#4caf50,color:#fff
    style P1Fail fill:#f44336,color:#fff
    style BoundaryEscalate fill:#ff9800
    style CriticalEscalate fill:#ff5722
    style HighEscalate fill:#ff9800
    style QGEscalate fill:#ff9800
```

## Pass 2: Change - Detailed Flow

```mermaid
graph TB
    P2Start([Pass 2 Start<br/>Plan Approved]) --> LoadPlan[Load Execution Plan]
    
    LoadPlan --> InitEnv[Initialize Environment]
    InitEnv --> SetCheckpoint1[Set Checkpoint 1]
    
    SetCheckpoint1 --> ExecLoop[Execute Plan Steps]
    
    ExecLoop --> Step[Execute Step N]
    Step --> Monitor[Monitor Execution]
    
    Monitor --> RuntimeBoundary{Runtime<br/>Boundary<br/>Check}
    
    RuntimeBoundary -->|Violation| RB_Detect[Detect Violation Type]
    RB_Detect --> RB_Log[Log Violation]
    RB_Log --> RB_Rollback[Immediate Rollback]
    RB_Rollback --> RB_Escalate[HITL: Runtime Violation]
    RB_Escalate --> P2Fail([Pass 2 Failed])
    
    RuntimeBoundary -->|OK| StepComplete{Step<br/>Complete?}
    
    StepComplete -->|Error| StepError[Handle Error]
    StepError --> ErrorType{Error<br/>Type}
    
    ErrorType -->|Transient| Retry{Retry<br/>Count<br/>< 3?}
    Retry -->|Yes| Step
    Retry -->|No| RetryEscalate[HITL: Retry Exceeded]
    RetryEscalate --> P2Fail
    
    ErrorType -->|Fatal| FatalEscalate[HITL: Fatal Error]
    FatalEscalate --> P2Fail
    
    StepComplete -->|Success| SetCheckpoint2[Set Checkpoint N]
    SetCheckpoint2 --> MoreSteps{More<br/>Steps?}
    
    MoreSteps -->|Yes| ExecLoop
    MoreSteps -->|No| QualityChecks[Quality Checks]
    
    QualityChecks --> QC_Lint[Linting]
    QualityChecks --> QC_Format[Formatting]
    QualityChecks --> QC_Style[Style Guide]
    
    QC_Lint --> QC_Aggregate[Aggregate Results]
    QC_Format --> QC_Aggregate
    QC_Style --> QC_Aggregate
    
    QC_Aggregate --> QC_Result{Quality<br/>Pass?}
    
    QC_Result -->|Fail| QC_AutoFix{Auto-<br/>Fixable?}
    
    QC_AutoFix -->|Yes| QC_ApplyFix[Apply Fixes]
    QC_ApplyFix --> QC_Verify[Verify Fixes]
    QC_Verify --> QC_VerifyResult{Fixes<br/>OK?}
    QC_VerifyResult -->|Yes| SecurityScan
    QC_VerifyResult -->|No| QC_Escalate[HITL: Quality Issues]
    QC_Escalate --> P2Fail
    
    QC_AutoFix -->|No| QC_Escalate
    
    QC_Result -->|Pass| SecurityScan[Security Scan]
    
    SecurityScan --> SS_SAST[SAST Analysis]
    SecurityScan --> SS_Deps[Dependency Check]
    SecurityScan --> SS_Secrets[Secret Detection]
    
    SS_SAST --> SS_Aggregate[Aggregate Results]
    SS_Deps --> SS_Aggregate
    SS_Secrets --> SS_Aggregate
    
    SS_Aggregate --> SS_Result{Security<br/>Issues?}
    
    SS_Result -->|Critical| SS_CritEscalate[Mandatory HITL Review]
    SS_CritEscalate --> SS_CritHuman{Human<br/>Decision}
    SS_CritHuman -->|Fix| Step
    SS_CritHuman -->|Waiver| CreateSecWaiver[Create Security Waiver]
    CreateSecWaiver --> P2Complete
    SS_CritHuman -->|Reject| P2Fail
    
    SS_Result -->|High| SS_HighEscalate[HITL Review]
    SS_HighEscalate --> SS_HighHuman{Human<br/>Decision}
    SS_HighHuman -->|Fix| Step
    SS_HighHuman -->|Waiver| CreateSecWaiver
    SS_HighHuman -->|Reject| P2Fail
    
    SS_Result -->|Low/None| P2Complete([Pass 2 Complete<br/>Proceed to Pass 3])
    
    style P2Start fill:#fff4e1
    style P2Complete fill:#4caf50,color:#fff
    style P2Fail fill:#f44336,color:#fff
    style RB_Escalate fill:#ff5722
    style RetryEscalate fill:#ff9800
    style FatalEscalate fill:#ff5722
    style QC_Escalate fill:#ff9800
    style SS_CritEscalate fill:#ff5722
    style SS_HighEscalate fill:#ff9800
```

## Pass 3: Verify - Detailed Flow

```mermaid
graph TB
    P3Start([Pass 3 Start<br/>Changes Applied]) --> PrepTest[Prepare Test Environment]
    
    PrepTest --> LoadTests[Load Test Suite]
    LoadTests --> TestCategories[Categorize Tests]
    
    TestCategories --> Unit[Unit Tests]
    TestCategories --> Integration[Integration Tests]
    TestCategories --> E2E[End-to-End Tests]
    
    Unit --> UnitRun[Run Unit Tests]
    UnitRun --> UnitResult{Unit<br/>Pass?}
    
    UnitResult -->|Fail| UnitAnalyze[Analyze Failures]
    UnitAnalyze --> UnitFixable{Auto-<br/>Fixable?}
    UnitFixable -->|Yes| UnitFix[Apply Fix]
    UnitFix --> UnitRerun[Rerun Tests]
    UnitRerun --> UnitResult
    UnitFixable -->|No| UnitEscalate[HITL: Unit Test Failures]
    UnitEscalate --> P3Fail([Pass 3 Failed])
    
    UnitResult -->|Pass| Integration
    
    Integration --> IntRun[Run Integration Tests]
    IntRun --> IntResult{Integration<br/>Pass?}
    
    IntResult -->|Fail| IntAnalyze[Analyze Failures]
    IntAnalyze --> IntType{Failure<br/>Type}
    
    IntType -->|Config Issue| IntConfigFix[Fix Configuration]
    IntConfigFix --> IntRun
    
    IntType -->|Integration Bug| IntBugCheck{Auto-<br/>Fixable?}
    IntBugCheck -->|Yes| IntFix[Apply Fix]
    IntFix --> IntRun
    IntBugCheck -->|No| IntEscalate[HITL: Integration Failures]
    IntEscalate --> P3Fail
    
    IntType -->|Environment| IntEnvEscalate[HITL: Environment Issue]
    IntEnvEscalate --> P3Fail
    
    IntResult -->|Pass| E2E
    
    E2E --> E2ERun[Run E2E Tests]
    E2ERun --> E2EResult{E2E<br/>Pass?}
    
    E2EResult -->|Fail| E2EAnalyze[Analyze Failures]
    E2EAnalyze --> E2ECritical{Critical<br/>Path<br/>Failure?}
    
    E2ECritical -->|Yes| E2ECritEscalate[Mandatory HITL Review]
    E2ECritEscalate --> P3Fail
    
    E2ECritical -->|No| E2EMinor[Document Minor Issues]
    E2EMinor --> E2EDecision{Block<br/>Deployment?}
    E2EDecision -->|Yes| E2EEscalate[HITL: E2E Issues]
    E2EEscalate --> P3Fail
    E2EDecision -->|No| IntegrationCheck
    
    E2EResult -->|Pass| IntegrationCheck[System Integration Check]
    
    IntegrationCheck --> IC_APIs[API Compatibility]
    IntegrationCheck --> IC_Data[Data Integrity]
    IntegrationCheck --> IC_Perf[Performance Baseline]
    
    IC_APIs --> IC_Aggregate[Aggregate Results]
    IC_Data --> IC_Aggregate
    IC_Perf --> IC_Aggregate
    
    IC_Aggregate --> IC_Result{Integration<br/>OK?}
    
    IC_Result -->|Fail| IC_Impact{Impact<br/>Assessment}
    
    IC_Impact -->|High Impact| IC_HighEscalate[HITL: High Impact Issue]
    IC_HighEscalate --> P3Fail
    
    IC_Impact -->|Medium Impact| IC_MedEscalate[HITL: Review Required]
    IC_MedEscalate --> IC_Human{Human<br/>Decision}
    IC_Human -->|Fix| PrepTest
    IC_Human -->|Accept| Evidence
    IC_Human -->|Reject| P3Fail
    
    IC_Impact -->|Low Impact| Evidence[Generate Evidence]
    IC_Result -->|Pass| Evidence
    
    Evidence --> EV_Coverage[Test Coverage Report]
    Evidence --> EV_Quality[Quality Metrics]
    Evidence --> EV_Security[Security Scan Results]
    Evidence --> EV_Compliance[Compliance Check]
    
    EV_Coverage --> EV_Aggregate[Aggregate Evidence]
    EV_Quality --> EV_Aggregate
    EV_Security --> EV_Aggregate
    EV_Compliance --> EV_Aggregate
    
    EV_Aggregate --> FinalGate[Final Quality Gate]
    
    FinalGate --> FG_Complete{Completeness}
    FinalGate --> FG_Quality{Quality Threshold}
    FinalGate --> FG_Security{Security Baseline}
    
    FG_Complete --> FG_Aggregate[Final Decision]
    FG_Quality --> FG_Aggregate
    FG_Security --> FG_Aggregate
    
    FG_Aggregate --> FG_Result{Final<br/>Gate<br/>Pass?}
    
    FG_Result -->|Fail| FG_Escalate[HITL: Final Gate Failed]
    FG_Escalate --> FG_Human{Human<br/>Review}
    FG_Human -->|Fix| PrepTest
    FG_Human -->|Waiver| CreateFinalWaiver[Create Final Waiver]
    CreateFinalWaiver --> P3Success
    FG_Human -->|Reject| P3Fail
    
    FG_Result -->|Pass| P3Success([Pass 3 Complete<br/>Task Successful])
    
    style P3Start fill:#e8f5e9
    style P3Success fill:#4caf50,color:#fff
    style P3Fail fill:#f44336,color:#fff
    style UnitEscalate fill:#ff9800
    style IntEscalate fill:#ff9800
    style IntEnvEscalate fill:#ff9800
    style E2ECritEscalate fill:#ff5722
    style E2EEscalate fill:#ff9800
    style IC_HighEscalate fill:#ff5722
    style IC_MedEscalate fill:#ff9800
    style FG_Escalate fill:#ff9800
```

## Escalation Decision Matrix

```mermaid
graph LR
    subgraph "Automatic Approval"
        A1[Low Risk] --> A2[Within Boundaries]
        A2 --> A3[Quality Pass]
        A3 --> A4[Security Clean]
        A4 --> Auto([Auto-Approve])
    end
    
    subgraph "HITL Required"
        H1[High/Critical Risk] --> HITL1([Mandatory HITL])
        H2[Boundary Violation] --> HITL2([Mandatory HITL])
        H3[Security Issues] --> HITL3([Mandatory HITL])
        H4[Quality Failures] --> HITL4([HITL Review])
        H5[Test Failures] --> HITL5([HITL Review])
    end
    
    subgraph "Conditional Escalation"
        C1[Medium Risk] --> C2{Complexity}
        C2 -->|High| HITL6([HITL Review])
        C2 -->|Low| Auto
        
        C3[Minor Issues] --> C4{Count}
        C4 -->|Many| HITL7([HITL Review])
        C4 -->|Few| Auto
    end
    
    style Auto fill:#4caf50,color:#fff
    style HITL1 fill:#ff5722,color:#fff
    style HITL2 fill:#ff5722,color:#fff
    style HITL3 fill:#ff5722,color:#fff
    style HITL4 fill:#ff9800
    style HITL5 fill:#ff9800
    style HITL6 fill:#ff9800
    style HITL7 fill:#ff9800
```

## Key Principles

### 1. Progressive Validation
Each pass builds upon the previous one, with increasing levels of validation and verification. Pass 1 ensures the plan is sound, Pass 2 ensures the implementation is correct, and Pass 3 ensures the result is functional and integrates properly.

### 2. Defense in Depth
Multiple quality gates at each pass provide layered security and quality assurance. If one check misses an issue, subsequent checks will catch it.

### 3. Fail Fast
Issues are detected and escalated as early as possible. Boundary violations stop execution immediately, preventing wasted effort on changes that cannot be completed.

### 4. Human-in-the-Loop Escalation
Complex decisions, high-risk changes, and failures are escalated to humans. The system knows its limitations and requests help when needed.

### 5. Comprehensive Evidence Generation
Every step is logged, and evidence is generated to support audit and compliance requirements. Success and failure paths are both documented.

### 6. Graceful Degradation
When automated fixes are not possible, the system escalates rather than proceeding with potentially incorrect changes.

## Practical Examples

### Example 1: Successful Low-Risk Change

```
Task: Update a configuration file value
- Pass 1: Plan created, low risk, within boundaries → Auto-approved
- Pass 2: Change applied, quality checks pass, no security issues → Proceed
- Pass 3: Tests pass, integration OK, evidence generated → Success
Duration: ~2 minutes
Human Involvement: None
```

### Example 2: High-Risk Change Requiring Review

```
Task: Modify authentication logic
- Pass 1: Plan created, HIGH RISK detected → HITL escalation
  - Human reviews plan, approves with conditions
- Pass 2: Changes applied, security scan finds potential issue → HITL escalation
  - Human reviews, requests fix
  - Agent applies fix, rescan clean → Proceed
- Pass 3: All tests pass, evidence generated → Success
Duration: ~15 minutes + human review time
Human Involvement: 2 reviews (plan + security)
```

### Example 3: Boundary Violation

```
Task: Modify file outside allowed scope
- Pass 1: Boundary check FAILS → HITL escalation
  - Human reviews, rejects request
- Result: Task rejected, no changes made
Duration: < 1 minute + human review time
Human Involvement: 1 review (boundary exception)
```

### Example 4: Test Failure Requiring Manual Fix

```
Task: Add new API endpoint
- Pass 1: Plan approved, medium risk → Proceed
- Pass 2: Implementation complete, security clean → Proceed
- Pass 3: Integration tests FAIL → Analysis
  - Failure not auto-fixable → HITL escalation
  - Human investigates, finds environment issue
  - Environment fixed, tests rerun → Success
Duration: ~10 minutes + troubleshooting time
Human Involvement: 1 intervention (test failure investigation)
```

## Success Metrics

### Pass 1 (Plan) Metrics
- **Planning Time**: Average time to create and approve plan
- **Boundary Violations**: Count of boundary check failures
- **Risk Escalations**: Count of high/critical risk reviews
- **Plan Quality**: Percentage of plans passing quality gate first time

### Pass 2 (Change) Metrics
- **Execution Time**: Average time to apply changes
- **Runtime Violations**: Count of runtime boundary violations
- **Quality Issues**: Count of quality check failures
- **Security Findings**: Count and severity of security issues
- **Rollback Rate**: Percentage of executions requiring rollback

### Pass 3 (Verify) Metrics
- **Test Pass Rate**: Percentage of test suites passing first time
- **Test Coverage**: Code coverage achieved
- **Integration Success**: Percentage of successful integrations
- **Final Gate Pass Rate**: Percentage passing final quality gate
- **Evidence Completeness**: Percentage of complete evidence packages

### Overall Metrics
- **End-to-End Success Rate**: Percentage of tasks completing all three passes
- **HITL Escalation Rate**: Percentage of tasks requiring human intervention
- **Average Completion Time**: Mean time for successful task completion
- **Retry Rate**: Average number of retries per pass

## Error Handling and Recovery

### Automatic Recovery
- **Transient Errors**: Retry up to 3 times with exponential backoff
- **Quality Issues**: Auto-fix when possible (formatting, linting)
- **Configuration Problems**: Attempt automatic remediation

### Manual Intervention Required
- **Boundary Violations**: Human approval for exceptions
- **Security Issues**: Human review for critical/high severity
- **Logic Errors**: Human debugging and resolution
- **Environmental Issues**: Human environment troubleshooting

### Rollback Procedures
- **Checkpoint-Based Rollback**: Restore to last known good state
- **Complete Rollback**: Revert all changes if unrecoverable
- **Partial Rollback**: Revert specific problematic changes

## Related Documentation

- [Boundary Model](./boundary-model.md) - Detailed boundary definitions and enforcement
- [Security Architecture](./security-architecture.md) - Security scanning and threat protection
- [PR Workflow](./pr-workflow.md) - Integration with pull request process
- [System Architecture](./system-architecture.md) - Overall system design
- [Authority Chain](./authority-chain.md) - Decision authority and escalation paths
- `docs/guides/agent-development.md` - Agent development guidelines
- `docs/policies/quality-standards.md` - Quality gate requirements
- `docs/policies/security-requirements.md` - Security baseline standards

---

**Last Updated:** 2026-01-22  
**Version:** 1.0.0
