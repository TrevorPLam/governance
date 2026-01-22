```json
{
  "phase_id": "PHASE-7",
  "phase_name": "Automation Stubs",
  "files": [
    {
      "path": "/.repo/automation/ci/governance-verify.yml",
      "type": "yaml",
      "content": "# /.repo/automation/ci/governance-verify.yml\n# Template CI job calling manifest-defined command.\njobs:\n  governance_verify:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v3\n      - name: Install deps\n        run: <FILL_FROM_REPO_INSTALL>\n      - name: Governance Verify\n        run: <FILL_FROM_REPO_GOVERNANCE>\n"
    },
    {
      "path": "/.repo/automation/scripts/governance-verify.js",
      "type": "javascript",
      "content": "// /.repo/automation/scripts/governance-verify.js\n// Spec-first stub. Enforce structure, required artifacts, logs, trace schema, HITL/waivers.\nconsole.log(\"SPEC-ONLY: implement per governance.json\");\n"
    },
    {
      "path": "/.repo/automation/scripts/validate-agent-trace.js",
      "type": "javascript",
      "content": "// /.repo/automation/scripts/validate-agent-trace.js\n// Validate trace logs against AGENT_TRACE_SCHEMA.json\nconsole.log(\"SPEC-ONLY: implement JSON schema validation\");\n"
    }
  ]
}
```