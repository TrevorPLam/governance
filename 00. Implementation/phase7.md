# PHASE-7: Automation Stubs

- Phase ID: PHASE-7

## Files
### `/.repo/automation/ci/governance-verify.yml` (yaml)
```yaml
# /.repo/automation/ci/governance-verify.yml
# Template CI job calling manifest-defined command.
jobs:
  governance_verify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Install deps
        run: <FILL_FROM_REPO_INSTALL>
      - name: Governance Verify
        run: <FILL_FROM_REPO_GOVERNANCE>
```

### `/.repo/automation/scripts/governance-verify.js` (javascript)
```javascript
// /.repo/automation/scripts/governance-verify.js
// Spec-first stub. Enforce structure, required artifacts, logs, trace schema, HITL/waivers.
console.log("SPEC-ONLY: implement per governance.json");
```

### `/.repo/automation/scripts/validate-agent-trace.js` (javascript)
```javascript
// /.repo/automation/scripts/validate-agent-trace.js
// Validate trace logs against AGENT_TRACE_SCHEMA.json
console.log("SPEC-ONLY: implement JSON schema validation");
```