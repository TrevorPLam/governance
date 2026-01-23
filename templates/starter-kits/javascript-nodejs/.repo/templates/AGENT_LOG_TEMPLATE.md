# Agent Log Template
<!-- GOVERNANCE_VERSION: 1.0.0 -->
<!-- GOVERNANCE: UPDATEABLE - Layer 3 -->

This template defines the structure for agent activity logs. Agent logs provide a human-readable record of agent actions, decisions, and reasoning.

## Agent Log JSON Structure

```json
{
  "log_version": "1.0.0",
  "agent_info": {
    "agent_role": "primary|secondary",
    "agent_id": "unique-identifier",
    "timestamp": "ISO-8601 timestamp"
  },
  "task": {
    "task_id": "reference to task packet",
    "title": "brief task title",
    "priority": "P0|P1|P2"
  },
  "intent": "What the agent intended to accomplish",
  "plan": [
    "Step 1: What was planned",
    "Step 2: What was planned",
    "Step 3: What was planned"
  ],
  "actions": [
    {
      "action": "Description of action taken",
      "files": ["list", "of", "files", "affected"],
      "timestamp": "When action was taken",
      "result": "success|failure|partial"
    }
  ],
  "evidence": [
    {
      "type": "test|build|lint|security|coverage",
      "description": "What evidence was collected",
      "location": "Path to evidence file or output",
      "result": "pass|fail",
      "details": "Additional details"
    }
  ],
  "decisions": [
    {
      "decision": "What decision was made",
      "rationale": "Why this decision was made",
      "alternatives": ["Other options considered"],
      "impact": "Expected impact of decision"
    }
  ],
  "risks": [
    {
      "risk": "Description of risk identified",
      "severity": "low|medium|high|critical",
      "mitigation": "How risk was mitigated",
      "remaining_risk": "Any remaining risk"
    }
  ],
  "unknowns": [
    {
      "unknown": "What was unknown",
      "impact": "Why it matters",
      "resolution": "How it was resolved or HITL created"
    }
  ],
  "hitl_items": [
    {
      "hitl_id": "HITL item reference",
      "description": "What required human decision",
      "status": "pending|resolved",
      "resolution": "How it was resolved"
    }
  ],
  "quality_gates": {
    "linting": "pass|fail|waived",
    "type_checking": "pass|fail|waived",
    "unit_tests": "pass|fail|waived",
    "integration_tests": "pass|fail|waived",
    "security_scan": "pass|fail|waived",
    "coverage": "92%",
    "waivers": ["List of waivers granted"]
  },
  "boundaries": {
    "layers_modified": ["ui", "domain", "data", "platform"],
    "modules_modified": ["List of modules"],
    "cross_boundary_imports": ["List with ADR references"],
    "boundary_violations": []
  },
  "documentation": {
    "docs_updated": ["List of docs updated"],
    "adrs_created": ["List of ADRs created"],
    "inline_comments": "adequate|needs_improvement"
  },
  "follow_ups": [
    "Action item 1",
    "Action item 2",
    "Action item 3"
  ],
  "reasoning_summary": "High-level summary of reasoning process and key insights",
  "performance": {
    "execution_time": "How long the task took",
    "complexity": "low|medium|high",
    "challenges": ["List of challenges encountered"]
  },
  "notes": "No secrets. No private data. No raw chain-of-thought. Human-readable summary only."
}
```

## Required Fields

Every agent log must include:
- **log_version**: Version of log format (for compatibility)
- **agent_info**: Agent identification and timestamp
- **task**: Task reference
- **intent**: What was being accomplished
- **actions**: What was actually done
- **evidence**: Test results, build outputs, etc.
- **notes**: Privacy and security notice

## Optional Fields

The following are optional but recommended:
- **plan**: Original plan (from Pass 1)
- **decisions**: Key decisions made
- **risks**: Risks identified and mitigated
- **unknowns**: UNKNOWNs encountered
- **hitl_items**: Human escalations
- **quality_gates**: Quality check results
- **boundaries**: Boundary compliance
- **documentation**: Documentation updates
- **follow_ups**: Future work items
- **reasoning_summary**: High-level summary
- **performance**: Execution metrics

## Privacy and Security

Agent logs must NEVER contain:
- ❌ Secrets (API keys, passwords, tokens)
- ❌ Private data (PII, customer data)
- ❌ Raw chain-of-thought (internal reasoning)
- ❌ Sensitive business information
- ❌ Credential information

Agent logs MUST:
- ✅ Be human-readable
- ✅ Be auditable
- ✅ Reference files with full paths
- ✅ Include timestamps
- ✅ Document decisions and rationale

## Example Agent Log

```json
{
  "log_version": "1.0.0",
  "agent_info": {
    "agent_role": "primary",
    "agent_id": "agent-primary-001",
    "timestamp": "2026-01-22T10:30:00Z"
  },
  "task": {
    "task_id": "FEAT-123",
    "title": "Add JWT authentication to API",
    "priority": "P0"
  },
  "intent": "Implement JWT-based authentication for REST API endpoints with token validation and refresh capabilities",
  "plan": [
    "Step 1: Review ADR-015 for JWT implementation details",
    "Step 2: Create authentication middleware in domain/auth",
    "Step 3: Implement login and refresh endpoints",
    "Step 4: Add token validation logic",
    "Step 5: Write comprehensive tests",
    "Step 6: Update API documentation"
  ],
  "actions": [
    {
      "action": "Created authentication middleware",
      "files": ["src/domain/auth/middleware/auth.middleware.ts"],
      "timestamp": "2026-01-22T10:35:00Z",
      "result": "success"
    },
    {
      "action": "Implemented auth controller with login and refresh endpoints",
      "files": ["src/domain/auth/controllers/auth.controller.ts"],
      "timestamp": "2026-01-22T10:45:00Z",
      "result": "success"
    },
    {
      "action": "Created token service for JWT operations",
      "files": ["src/domain/auth/services/token.service.ts"],
      "timestamp": "2026-01-22T10:55:00Z",
      "result": "success"
    },
    {
      "action": "Added comprehensive test suite",
      "files": [
        "tests/domain/auth/auth.test.ts",
        "tests/domain/auth/integration/auth.integration.test.ts"
      ],
      "timestamp": "2026-01-22T11:10:00Z",
      "result": "success"
    }
  ],
  "evidence": [
    {
      "type": "test",
      "description": "Unit tests",
      "location": "test-results/unit-tests.json",
      "result": "pass",
      "details": "43/43 tests passed"
    },
    {
      "type": "test",
      "description": "Integration tests",
      "location": "test-results/integration-tests.json",
      "result": "pass",
      "details": "8/8 tests passed"
    },
    {
      "type": "coverage",
      "description": "Code coverage",
      "location": "coverage/coverage-report.html",
      "result": "pass",
      "details": "92% coverage (threshold: 80%)"
    },
    {
      "type": "security",
      "description": "Security scan",
      "location": "security/scan-results.json",
      "result": "pass",
      "details": "No vulnerabilities found"
    }
  ],
  "decisions": [
    {
      "decision": "Used JWT over sessions",
      "rationale": "Per ADR-015, JWT chosen for stateless authentication",
      "alternatives": ["Session-based auth", "OAuth"],
      "impact": "Enables horizontal scaling without session store"
    },
    {
      "decision": "1 hour token expiry with refresh tokens",
      "rationale": "Balance between security and UX",
      "alternatives": ["15 min expiry", "24 hour expiry"],
      "impact": "Requires refresh token implementation"
    }
  ],
  "risks": [
    {
      "risk": "Token theft if stolen from client",
      "severity": "medium",
      "mitigation": "Short token expiry (1 hour), secure httpOnly cookies",
      "remaining_risk": "Still vulnerable if attacker has client access"
    }
  ],
  "unknowns": [],
  "hitl_items": [
    {
      "hitl_id": "HITL-047",
      "description": "Security review required for authentication implementation",
      "status": "resolved",
      "resolution": "Security review completed, approved with minor suggestions implemented"
    }
  ],
  "quality_gates": {
    "linting": "pass",
    "type_checking": "pass",
    "unit_tests": "pass",
    "integration_tests": "pass",
    "security_scan": "pass",
    "coverage": "92%",
    "waivers": []
  },
  "boundaries": {
    "layers_modified": ["domain"],
    "modules_modified": ["auth"],
    "cross_boundary_imports": [],
    "boundary_violations": []
  },
  "documentation": {
    "docs_updated": [
      "docs/api/authentication.md",
      "README.md"
    ],
    "adrs_created": [],
    "inline_comments": "adequate"
  },
  "follow_ups": [
    "Consider adding OAuth support in future",
    "Monitor token refresh patterns for abuse",
    "Add rate limiting to login endpoint"
  ],
  "reasoning_summary": "Implemented JWT authentication following ADR-015 guidelines. Chose 1-hour token expiry with refresh tokens to balance security and UX. All tests pass with 92% coverage. Security review completed successfully. No boundary violations. Documentation updated.",
  "performance": {
    "execution_time": "45 minutes",
    "complexity": "medium",
    "challenges": [
      "Token refresh rotation for security",
      "Handling expired tokens gracefully"
    ]
  },
  "notes": "No secrets. No private data. No raw chain-of-thought. Human-readable summary only."
}
```

## Usage Guidelines

### When to Create Logs
Create agent logs for:
- Feature implementation
- Bug fixes
- Refactoring work
- Security updates
- Architecture changes

### Log Storage
Store logs in:
- `logs/agent/` directory
- Named with task ID: `logs/agent/FEAT-123.json`
- Archived after task completion

### Log Retention
- Keep logs for audit trail
- Archive after PR merge
- Reference in PR description
- Link from ADRs if relevant

## References

- Agent Rules: /.repo/agents/AGENTS.md
- Trace Schema: /.repo/templates/AGENT_TRACE_SCHEMA.json
- Task Packet Template: /.repo/agents/prompts/task_packet.md
- PR Template: /.repo/agents/prompts/pr_template.md
