<!-- GOVERNANCE_VERSION: 1.0.0 -->
<!-- GOVERNANCE: UPDATEABLE - Layer 2 -->

# /.repo/policy/SECURITY_BASELINE.md
This file defines the minimum security rules.

## Absolute prohibitions
- Secrets/tokens/keys must never be committed or logged (absolute prohibition).

## Dependency vulnerabilities
If dependency vulnerabilities are detected:
- ALWAYS create HITL item(s)
- do not merge until HITL is Completed (or explicitly waived by human with expiration)

## Security check frequency
Security checks run on every PR.

## Security review triggers
Trigger IDs: [1,2,4,5,6,8,9,10]
These IDs are a stable registry for this standard.
Default meanings (editable only by human in this file if needed):
1) Auth/login behavior change
2) Money/payment flow change
4) External service integration change
5) Sensitive data handling change
6) Permission/privacy change
8) Production config/keys change
9) Cryptography/security control change
10) Dependency / supply-chain risk change

## Forbidden patterns
Forbidden patterns list: ["A","B","C","D","E","F","G","H"]
These are placeholders for repo-specific patterns (strings/regex rules) enforced by check:security.
If a pattern is unknown, mark UNKNOWN and create HITL.

## Mandatory HITL actions
Mandatory HITL action IDs: [1,2,3,4,5,6,7,8]
Default meanings (editable only by human if needed):
1) Human approves security risk assessment
2) Human confirms no secrets exposed
3) Human reviews dependency vulnerability report (if any)
4) Human confirms login/security test evidence for risky changes
5) Human confirms money-flow test evidence for risky changes
6) Human approves waiver (if needed) with expiration
7) Human confirms rollback plan for risky changes
8) Human confirms external system steps completed (if any)

## Evidence requirements
Evidence requirements: standard
Meaning: show what was run and the results (filepaths + command outputs summarized).
