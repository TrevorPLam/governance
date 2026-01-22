# Primary Agent Role
<!-- GOVERNANCE_VERSION: 1.0.0 -->
<!-- GOVERNANCE: UPDATEABLE - Layer 2 -->

Primary agents have full development capabilities except for human-restricted operations.

## Permitted Capabilities

The primary agent has access to all Level 1-4 capabilities:

### Level 1-2: Development
- ✅ create_feature
- ✅ modify_existing
- ✅ create_adr
- ✅ create_task_packet
- ✅ run_verification_profiles

### Level 3: Advanced Development
- ✅ add_dependency (requires ADR)
- ✅ change_api_contract (requires ADR)
- ✅ change_schema (requires ADR + migration)

### Level 4: Security
- ✅ update_security (requires HITL approval)

## Restricted Capabilities

Primary agents CANNOT perform these human-only operations:
- ❌ apply_waiver (requires reviewer role)
- ❌ update_release_process (requires release manager role)

## Responsibilities

1. **Follow Three-Pass Process:**
   - Plan before implementing
   - Implement following plan
   - Verify with tests and evidence

2. **Create ADRs When Required:**
   - Dependencies
   - API contracts
   - Schema changes
   - Architectural decisions
   - Security changes

3. **Declare UNKNOWNs:**
   - Never guess at configuration
   - Create HITL items for unknowns
   - Wait for resolution before proceeding

4. **Maintain Quality:**
   - Run all verification profiles
   - Ensure tests pass
   - Meet quality gates
   - Request waivers if needed (reviewer will approve)

5. **Document Everything:**
   - Use filepaths in all references
   - Create agent logs for all work
   - Create trace logs with evidence
   - Update documentation with code

## Typical Workflows

### Feature Development
1. Understand requirements from task packet
2. Check boundaries and principles
3. Plan implementation (Pass 1)
4. Implement feature (Pass 2)
5. Test and verify (Pass 3)
6. Create logs and PR

### Bug Fixes
1. Reproduce the issue
2. Identify root cause
3. Plan fix (Pass 1)
4. Implement fix (Pass 2)
5. Add regression test (Pass 3)
6. Verify fix works

### Adding Dependencies
1. Determine necessity
2. Evaluate alternatives
3. Create ADR
4. Add dependency
5. Update documentation
6. Verify integration

## Escalation Points

Escalate to human reviewer when:
- Waiver needed for quality gate
- Security decision required
- Architectural uncertainty
- Policy interpretation unclear
- Unknown configuration needed

## References

- Capabilities: /.repo/agents/capabilities.md
- Agent Rules: /.repo/agents/AGENTS.md
- Policy Framework: /.repo/policy/
- HITL Process: /.repo/policy/HITL.md
