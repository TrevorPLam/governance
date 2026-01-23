# /.repo/agents/AGENTS.md
<!-- GOVERNANCE_VERSION: 1.0.0 -->
<!-- GOVERNANCE: UPDATEABLE - Layer 2 -->

Agents operate ONLY within the rules defined in /.repo/policy/*.md and /.repo/GOVERNANCE.md.

## Core Rules (Plain English)

### 1. No Guessing - UNKNOWN Workflow
- If something is not explicitly known, declare UNKNOWN and create a HITL item.
- Never guess at commands, dependencies, or configuration.
- Use `<UNKNOWN>` marker in manifest when unclear.
- HITL items must include: what's unknown, why it matters, how to resolve.

### 2. Filepaths Required Everywhere
- All references to code must include full filepaths.
- All evidence must cite specific files and line numbers.
- All logs must document which files were touched.
- No vague references like "the config file" - must be "src/config/app.config.ts".

### 3. Three-Pass Code Generation Required
All code changes must follow this process:

#### Pass 1: Plan
- List all planned actions
- Identify all files to be modified
- Document all risks
- Declare all UNKNOWNs
- Get approval before proceeding

#### Pass 2: Change
- Apply planned edits
- Follow boundaries and principles
- Log all changes made
- Reference plan from Pass 1

#### Pass 3: Verify
- Run tests
- Collect evidence
- Create logs
- Create trace
- Verify quality gates passed

### 4. Logging Requirements
- All logs must follow /.repo/templates/AGENT_LOG_TEMPLATE.md.
- All trace logs must follow /.repo/templates/AGENT_TRACE_SCHEMA.json.
- No secrets, no private data, no raw chain-of-thought in logs.
- Logs must be human-readable and auditable.

### 5. Boundary Enforcement
- Boundary model enforced: ui → domain → data → platform.
- No reverse dependencies allowed.
- Cross-feature imports require ADR.
- See /.repo/policy/BOUNDARIES.md for details.

### 6. ADR Requirements
ADRs are required for:
- Adding or changing dependencies
- Changing API contracts
- Changing schemas (database, config, etc.)
- Security-related changes
- Architectural changes
- Cross-boundary imports

### 7. Quality Gates
- All quality gates must pass before PR approval.
- Waivers may be requested for gate failures.
- Hard gates (security, architecture) cannot be waived.
- See /.repo/policy/QUALITY_GATES.md for details.

### 8. Security Baseline
- Follow all security requirements in /.repo/policy/SECURITY_BASELINE.md.
- HITL required for all security review triggers.
- Never bypass security checks.
- Document all security decisions.

## Agent Capabilities

Agents can perform specific capabilities based on their role. See:
- /.repo/agents/capabilities.md - List of all capabilities
- /.repo/agents/roles/*.md - Role-specific permissions

## Agent Workflows

### Creating a Feature
1. Check manifest for canonical commands
2. Plan the feature (Pass 1)
3. Implement the feature (Pass 2)
4. Verify and test (Pass 3)
5. Create agent log
6. Submit PR with evidence

### Modifying Existing Code
1. Understand current implementation
2. Check boundaries and principles
3. Plan changes (Pass 1)
4. Apply changes (Pass 2)
5. Verify no regressions (Pass 3)
6. Document reasoning

### Handling UNKNOWNs
1. Identify what is unknown
2. Document why it matters
3. Create HITL item
4. Stop work until resolved
5. Resume after HITL resolution

### Requesting Waivers
1. Identify gate failure
2. Document justification
3. Propose remediation plan
4. Submit waiver request
5. Wait for reviewer approval

## References

- Policy Framework: /.repo/policy/
- Document Templates: /.repo/templates/
- Documentation Standards: /.repo/docs/standards/
- Governance Contract: /.repo/GOVERNANCE.md
