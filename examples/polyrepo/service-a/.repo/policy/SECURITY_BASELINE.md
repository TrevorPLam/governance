<!-- GOVERNANCE_VERSION: 1.0.0 -->
<!-- GOVERNANCE: UPDATEABLE - Layer 2 -->

# /.repo/policy/SECURITY_BASELINE.md
Security checks run on every PR. Secrets must never be committed. Dependency vulnerabilities and risky changes trigger HITL and block merges until resolved. Forbidden patterns are enforced via `check:security`. Evidence of security checks is required for verification.
