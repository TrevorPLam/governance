<!-- GOVERNANCE_VERSION: 1.0.0 -->
<!-- GOVERNANCE: CUSTOM - Layer 1 -->

# /.repo/policy/WAIVERS.md
Waivers allow temporary exceptions to governance rules when necessary.

## Core principles
- Waivers are rare + temporary (per Principle P22)
- Every waiver must have an expiration date
- Every waiver must include a remediation plan
- Expired waivers block merges

## Waiver structure
Each waiver must include:
- **ID:** Unique identifier (WAIVER-XXXX)
- **Rule:** Which rule/gate is being waived
- **Justification:** Why the waiver is necessary
- **Risk Assessment:** What could go wrong
- **Remediation Plan:** How this will be fixed
- **Expiration Date:** When waiver expires (required)
- **Approved By:** Human approver
- **Approved On:** Approval date
- **Status:** Active | Expired | Completed
- **Related:** Links to PR, Issue, Task Packet

## Storage model
- Index (this file): /.repo/policy/WAIVERS.md
- Items: /.repo/waivers/WAIVER-XXXX.md

## Expiration rules
- Default expiration: 30 days from approval
- Maximum expiration: 90 days
- Extensions require new approval with updated justification
- Expired waivers automatically block merges

## Waiverable gates
From QUALITY_GATES.md:
- Coverage targets (gradual ratchet)
- Performance/bundle budgets
- Warning budgets (zero warnings policy)

## Approval process
1. Agent detects gate failure and proposes waiver
2. Human reviews justification and remediation plan
3. Human approves with expiration date OR rejects
4. If approved, waiver is added to Active tracking
5. Remediation work is added to TODOs

## Who can approve
- Solo founder (final authority per Constitution Article 1)
- Designated approvers (if specified in repo.manifest.yaml)

## Tracking tables
### Active Waivers
|ID|Rule|Expiration|Status|Filepath|
|---|---|---|---|---|

### Historical Waivers
|ID|Rule|Granted|Expired/Completed|Outcome|Filepath|
|---|---|---|---|---|---|

## Waiver template
See /.repo/templates/WAIVER_TEMPLATE.md for standard waiver structure.

## Monitoring
- Agents check expiration dates on every PR
- Expired waivers trigger automatic remediation task creation
- Monthly waiver report generated (if enabled in manifest)

## Notes
Waivers are a safety valve, not a regular workflow. High waiver rates indicate governance rules that need adjustment.
