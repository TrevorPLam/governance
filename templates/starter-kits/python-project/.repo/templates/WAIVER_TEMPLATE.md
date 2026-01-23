# Waiver Request Template
<!-- GOVERNANCE_VERSION: 1.0.0 -->
<!-- GOVERNANCE: UPDATEABLE - Layer 3 -->

This template defines the structure for policy waiver requests. Waivers allow temporary exceptions to governance policies when justified.

## Waiver Request JSON Structure

```json
{
  "waiver_id": "WAIVER-XXX",
  "created_date": "YYYY-MM-DD",
  "requested_by": "Agent role or human name",
  "status": "pending|approved|denied|expired|revoked",
  
  "waives": {
    "policy": "Which policy is being waived",
    "specific_rule": "Which specific rule within policy",
    "gate": "Which quality gate failed (if applicable)"
  },
  
  "justification": {
    "why_needed": "Clear explanation of why waiver is necessary",
    "why_now": "Why it can't be fixed immediately",
    "alternatives_considered": [
      "Alternative 1 and why it won't work",
      "Alternative 2 and why it won't work"
    ],
    "business_impact": "What happens if waiver is not granted"
  },
  
  "scope": {
    "affected_files": ["List", "of", "affected", "files"],
    "affected_modules": ["List", "of", "affected", "modules"],
    "limited_to": "How scope is limited"
  },
  
  "expiration": {
    "expiration_date": "YYYY-MM-DD",
    "reason_for_duration": "Why this expiration date",
    "review_before": "YYYY-MM-DD (1 week before expiration)"
  },
  
  "remediation_plan": {
    "steps": [
      "Step 1: What will be done to fix",
      "Step 2: What will be done to fix",
      "Step 3: What will be done to fix"
    ],
    "owner": "Who is responsible for remediation",
    "target_date": "YYYY-MM-DD",
    "blockers": ["Any blockers to remediation"]
  },
  
  "risk_assessment": {
    "security_risk": "none|low|medium|high",
    "quality_risk": "none|low|medium|high",
    "operational_risk": "none|low|medium|high",
    "mitigation": "How risks are mitigated"
  },
  
  "approval": {
    "reviewer": "Reviewer name",
    "decision": "approved|denied",
    "decision_date": "YYYY-MM-DD",
    "conditions": ["Any conditions for approval"],
    "notes": "Reviewer notes"
  },
  
  "tracking": {
    "pr_link": "Link to PR where waiver applies",
    "task_id": "Related task ID",
    "related_waivers": ["Related waiver IDs"],
    "follow_up_task": "Task ID for remediation"
  },
  
  "notes": "Auto-generated waivers allowed for gate failures only. Security gates cannot be waived."
}
```

## Waiver Types

### 1. Quality Gate Waivers
For failing quality gates (coverage, linting, etc.):
- **Auto-Generated:** Agent can create but reviewer must approve
- **Requirements:** Clear remediation plan, short duration
- **Max Duration:** 2 weeks

### 2. Policy Waivers
For policy violations (boundaries, principles, etc.):
- **Human-Requested:** Only humans can request
- **Requirements:** Strong justification, alternatives explored
- **Max Duration:** 1 month

### 3. Hard Gates (CANNOT BE WAIVED)
These gates can never be waived:
- ❌ Security scan failures
- ❌ Boundary violations (reverse dependencies)
- ❌ Forbidden security patterns
- ❌ Missing filepaths
- ❌ Guessing/no UNKNOWN declared

## Waiver Lifecycle

1. **Request:** Agent or human creates waiver request
2. **Review:** Reviewer evaluates justification
3. **Approval/Denial:** Reviewer makes decision
4. **Active:** Waiver is in effect
5. **Remediation:** Work to fix underlying issue
6. **Review:** Check progress before expiration
7. **Expiration:** Waiver expires, must be fixed
8. **Archive:** Waiver is archived after completion

## Example Waiver Request

```json
{
  "waiver_id": "WAIVER-042",
  "created_date": "2026-01-22",
  "requested_by": "agent-primary-001",
  "status": "approved",
  
  "waives": {
    "policy": "QUALITY_GATES.md",
    "specific_rule": "Code coverage must be >80%",
    "gate": "coverage_threshold"
  },
  
  "justification": {
    "why_needed": "New authentication module has 75% coverage. Complex edge cases need more time to test properly.",
    "why_now": "Need to deploy auth feature urgently for security. Full test suite will take 2 more days.",
    "alternatives_considered": [
      "Wait 2 days - Blocks critical security feature deployment",
      "Deploy without auth - Not acceptable, security risk",
      "Write quick tests - Would be low quality, not worth it"
    ],
    "business_impact": "Delaying authentication delays product launch"
  },
  
  "scope": {
    "affected_files": [
      "src/domain/auth/middleware/auth.middleware.ts",
      "src/domain/auth/controllers/auth.controller.ts"
    ],
    "affected_modules": ["auth"],
    "limited_to": "Only auth module, other modules meet coverage"
  },
  
  "expiration": {
    "expiration_date": "2026-02-05",
    "reason_for_duration": "2 weeks to write comprehensive edge case tests",
    "review_before": "2026-01-29"
  },
  
  "remediation_plan": {
    "steps": [
      "Step 1: Deploy auth with current 75% coverage",
      "Step 2: Document untested edge cases (by 2026-01-24)",
      "Step 3: Write tests for edge cases (by 2026-02-01)",
      "Step 4: Verify >80% coverage achieved (by 2026-02-05)"
    ],
    "owner": "agent-primary-001",
    "target_date": "2026-02-05",
    "blockers": []
  },
  
  "risk_assessment": {
    "security_risk": "low",
    "quality_risk": "medium",
    "operational_risk": "low",
    "mitigation": "Core auth paths are tested (90% coverage). Edge cases are tested manually. Monitoring in place."
  },
  
  "approval": {
    "reviewer": "tech-lead",
    "decision": "approved",
    "decision_date": "2026-01-22",
    "conditions": [
      "Must reach 80% coverage by Feb 5",
      "Must add monitoring for edge cases",
      "Must document untested scenarios"
    ],
    "notes": "Approved given business priority. Core paths are well tested. Edge cases can wait."
  },
  
  "tracking": {
    "pr_link": "https://github.com/org/repo/pull/123",
    "task_id": "FEAT-123",
    "related_waivers": [],
    "follow_up_task": "TASK-124 - Complete auth test coverage"
  },
  
  "notes": "Auto-generated waiver for quality gate failure. Requires reviewer approval."
}
```

## Waiver Review Checklist

Reviewers should verify:

- [ ] Justification is clear and valid
- [ ] Alternatives were considered
- [ ] Scope is limited
- [ ] Duration is reasonable
- [ ] Remediation plan exists
- [ ] Owner assigned
- [ ] Risks assessed
- [ ] Not a hard gate (security, architecture)
- [ ] Business justification provided
- [ ] Follow-up task created

## Approval Criteria

### Approve If:
- ✅ Strong business justification
- ✅ Alternatives truly not viable
- ✅ Limited scope
- ✅ Clear remediation plan
- ✅ Acceptable risk level
- ✅ Short duration
- ✅ Not a hard gate

### Deny If:
- ❌ Weak justification
- ❌ Alternatives not explored
- ❌ Broad scope
- ❌ No remediation plan
- ❌ High risk
- ❌ Long duration requested
- ❌ Hard gate violation

## Tracking

### Active Waivers
Track in /.repo/policy/WAIVERS.md:

| ID | Policy | Scope | Owner | Expires | Status |
|----|--------|-------|-------|---------|--------|
| WAIVER-042 | Coverage | auth module | agent-001 | 2026-02-05 | Active |

### Historical Waivers
Archive completed waivers:

| ID | Policy | Granted | Completed | Outcome |
|----|--------|---------|-----------|---------|
| WAIVER-041 | Coverage | 2026-01-15 | 2026-01-22 | Fixed |

## Auto-Generation Rules

Agents can auto-generate waivers for:
- Coverage threshold failures (with plan)
- Linting errors (with plan to fix)
- Performance warnings (with mitigation)

Agents CANNOT auto-generate waivers for:
- Security issues
- Boundary violations
- Architecture violations
- Missing filepaths
- Guessing/UNKNOWNs

## References

- Waiver Policy: /.repo/policy/WAIVERS.md
- Quality Gates: /.repo/policy/QUALITY_GATES.md
- Reviewer Role: /.repo/agents/roles/reviewer.md
- HITL Process: /.repo/policy/HITL.md
