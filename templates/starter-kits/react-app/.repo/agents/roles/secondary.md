# Secondary Agent Role
<!-- GOVERNANCE_VERSION: 1.0.0 -->
<!-- GOVERNANCE: UPDATEABLE - Layer 2 -->

Secondary agents have limited capabilities focused on safe refactoring and porting work within established boundaries.

## Permitted Capabilities

The secondary agent has access to basic capabilities only:

### Level 1: Basic Operations
- ✅ modify_existing (within boundaries only)
- ✅ create_adr (when needed)
- ✅ create_task_packet

## Restricted Capabilities

Secondary agents CANNOT perform:
- ❌ create_feature (requires primary agent)
- ❌ add_dependency (requires primary agent)
- ❌ change_api_contract (requires primary agent)
- ❌ change_schema (requires primary agent)
- ❌ update_security (requires primary agent + HITL)
- ❌ update_release_process (requires release manager)
- ❌ apply_waiver (requires reviewer)
- ❌ run_verification_profiles (requires primary agent)

## Use Cases

Secondary agents are appropriate for:

1. **Refactoring Within Boundaries:**
   - Extract functions or classes
   - Rename for clarity
   - Reorganize within same module
   - No changes to dependencies or APIs

2. **Porting Code:**
   - Port implementation from one module to similar module
   - Maintain same patterns
   - Stay within architectural boundaries
   - No new dependencies

3. **Code Cleanup:**
   - Remove dead code
   - Update comments
   - Format code
   - Fix linting issues

4. **Documentation Updates:**
   - Update comments
   - Fix typos
   - Improve clarity
   - No structural changes

## Responsibilities

1. **Stay Within Boundaries:**
   - Never cross feature boundaries
   - Never cross layer boundaries
   - Never add dependencies
   - Never change APIs

2. **Follow Established Patterns:**
   - Copy existing patterns
   - Maintain consistency
   - Don't introduce novelty
   - Reference principle P15

3. **Limited Scope:**
   - Small, isolated changes only
   - No architectural decisions
   - No new abstractions
   - No complexity increases

4. **Create ADRs When Needed:**
   - Even small changes may need documentation
   - Document reasoning for refactoring
   - Explain why pattern was chosen

## When to Escalate

Escalate to primary agent when:
- New feature needed
- Dependency required
- API contract change needed
- Schema change needed
- Cross-boundary work required
- Uncertainty about scope

## Typical Workflows

### Refactoring
1. Identify refactoring target
2. Check boundaries
3. Plan refactoring (stays within module)
4. Apply refactoring
5. Verify tests still pass
6. Document change

### Porting Code
1. Identify source and target
2. Verify both in same layer
3. Copy pattern
4. Adapt to target context
5. Test thoroughly
6. Document adaptation

## References

- Capabilities: /.repo/agents/capabilities.md
- Agent Rules: /.repo/agents/AGENTS.md
- Boundaries Policy: /.repo/policy/BOUNDARIES.md
- Principle P15: /.repo/policy/PRINCIPLES.md
