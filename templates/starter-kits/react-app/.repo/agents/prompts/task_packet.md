# Task Packet Template
<!-- GOVERNANCE_VERSION: 1.0.0 -->
<!-- GOVERNANCE: CUSTOM - Layer 1 -->

This template defines the structure for task packets given to agents. Task packets provide all context needed for an agent to complete work independently.

## Task Packet JSON Structure

```json
{
  "task_id": "unique-task-identifier",
  "title": "Brief title of the task",
  "objective": "Clear statement of what needs to be accomplished",
  "context": {
    "background": "Why this task exists and what problem it solves",
    "related_work": ["Links to related PRs, issues, or documentation"],
    "dependencies": ["Any dependencies or prerequisites"],
    "constraints": ["Any limitations or restrictions"]
  },
  "requirements": {
    "functional": ["What the code must do"],
    "non_functional": ["Performance, security, quality requirements"],
    "documentation": ["What documentation must be updated"]
  },
  "scope": {
    "in_scope": ["What is included in this task"],
    "out_of_scope": ["What is explicitly not included"],
    "boundaries": ["Which layers/modules can be modified"]
  },
  "success_criteria": [
    "Measurable criteria for completion",
    "Tests that must pass",
    "Quality gates that must be met"
  ],
  "deliverables": [
    "Code changes",
    "Tests",
    "Documentation",
    "ADRs if required",
    "Agent logs"
  ],
  "verification": {
    "profiles": ["Which verification profiles to run"],
    "manual_tests": ["Any manual verification steps"],
    "evidence_required": ["What evidence must be provided"]
  },
  "unknowns": [
    {
      "description": "What is unknown",
      "impact": "Why it matters",
      "resolution": "How to resolve (HITL, research, etc.)"
    }
  ],
  "references": {
    "policies": ["Relevant policy documents"],
    "adr": ["Related ADRs"],
    "documentation": ["Relevant docs"]
  },
  "agent_role": "primary|secondary",
  "estimated_complexity": "low|medium|high",
  "priority": "P0|P1|P2"
}
```

## Required Fields

The following fields are required in every task packet:
- `task_id`: Unique identifier
- `title`: Brief description
- `objective`: Clear goal
- `success_criteria`: How to know when done
- `deliverables`: What to produce
- `agent_role`: Which role should handle this

## Optional Fields

The following fields are optional but recommended:
- `context`: Helps agent understand background
- `requirements`: Clarifies expectations
- `scope`: Prevents scope creep
- `verification`: Defines how to test
- `unknowns`: Documents uncertainties
- `references`: Links to relevant docs

## Example Task Packet

```json
{
  "task_id": "FEAT-123",
  "title": "Add user authentication to API",
  "objective": "Implement JWT-based authentication for REST API endpoints",
  "context": {
    "background": "API is currently unprotected. Need authentication before public launch.",
    "related_work": ["ADR-015 chose JWT over sessions"],
    "dependencies": ["JWT library already approved"],
    "constraints": ["Must work with existing user database"]
  },
  "requirements": {
    "functional": [
      "Accept username/password",
      "Return JWT token on success",
      "Validate JWT on protected endpoints",
      "Support token refresh"
    ],
    "non_functional": [
      "Token expiry: 1 hour",
      "Refresh token expiry: 30 days",
      "Must pass security review"
    ],
    "documentation": [
      "Update API docs with auth endpoints",
      "Document token format",
      "Add security section to README"
    ]
  },
  "scope": {
    "in_scope": [
      "Authentication middleware",
      "Login endpoint",
      "Token validation",
      "Refresh endpoint"
    ],
    "out_of_scope": [
      "User registration (separate task)",
      "Password reset (separate task)",
      "OAuth integration (future)"
    ],
    "boundaries": [
      "domain layer: auth module",
      "data layer: user repository"
    ]
  },
  "success_criteria": [
    "All unit tests pass",
    "Integration tests pass",
    "Security scan passes",
    "Token validation works correctly",
    "Documentation complete"
  ],
  "deliverables": [
    "Authentication middleware",
    "Login endpoint implementation",
    "Token refresh endpoint",
    "Unit tests (>80% coverage)",
    "Integration tests",
    "API documentation updates",
    "ADR if architecture changed"
  ],
  "verification": {
    "profiles": ["test:unit", "test:integration", "security:scan"],
    "manual_tests": [
      "Login with valid credentials",
      "Login with invalid credentials",
      "Access protected endpoint with valid token",
      "Access protected endpoint with expired token"
    ],
    "evidence_required": [
      "Test results",
      "Coverage report",
      "Security scan results"
    ]
  },
  "unknowns": [],
  "references": {
    "policies": [
      "/.repo/policy/SECURITY_BASELINE.md",
      "/.repo/policy/BOUNDARIES.md"
    ],
    "adr": ["/.repo/docs/adr/0015-jwt-authentication.md"],
    "documentation": ["docs/api/authentication.md"]
  },
  "agent_role": "primary",
  "estimated_complexity": "medium",
  "priority": "P0"
}
```

## Usage Notes

1. **Be Specific:** Vague requirements lead to unclear implementations
2. **Include Context:** Help agent understand the "why"
3. **Define Success:** Clear criteria prevent ambiguity
4. **List UNKNOWNs:** Document uncertainties early
5. **Reference Policies:** Link to relevant governance docs
6. **Right-Size Scope:** Tasks should be completable in reasonable time

## Customization

This template can be customized per project:
- Add project-specific fields
- Adjust required vs optional fields
- Modify structure to fit workflow
- Keep the JSON schema updated

## References

- Agent Rules: /.repo/agents/AGENTS.md
- Three-Pass Process: /.repo/agents/AGENTS.md
- Task Management: P0TODO.md, P1TODO.md, P2TODO.md
