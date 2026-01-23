<!-- GOVERNANCE_VERSION: 1.0.0 -->
<!-- GOVERNANCE: CUSTOM - Layer 1 -->

# /.repo/policy/HITL.md
HITL = Human-In-The-Loop. This is the single binding place for human-required actions.

## Storage model
Split, same folder:
- Index (this file): /.repo/policy/HITL.md
- Items: /.repo/hitl/HITL-XXXX.md

## Rule: minimal human effort
The human does the smallest action possible (usually: set Status + add Evidence line).
Agents do all mechanical work: syncing PR body, archiving, and governance-verify reruns.

## Categories
- External Integration
- Clarification
- Risk
- Feedback
- Vendor

## Statuses
Pending | In Progress | Blocked | Completed | Superseded

## Merge blocking rule
If a PR has any required HITL item not in Completed status (or not validly waived), merge is blocked.

## Who can do what
- Agents may create HITL items and propose wording.
- Only the human may mark HITL items Completed.
- Agents must auto-sync HITL status changes into PR body and archive when completed.

## External systems detection (how to trigger HITL)
Detection is keywords + manifest + change type:
- If the change type implies external systems (security, release, schema), HITL is required.
- If the manifest command involves external credentials/dashboards, HITL is required.
- If keywords appear (credentials, token, billing, app store, vendor dashboard, prod deploy, payment, oauth), HITL is required.

## HITL item file format (HITL-XXXX.md)
Required fields:
- ID (HITL-XXXX)
- Category
- Required For (change types)
- Owner (human)
- Reviewer (human)
- Status
- Date Required
- Date Completed
- Summary
- Required Human Action steps
- Evidence of completion (filepaths or notes; no secrets)
- Related artifacts (filepaths): PR, ADR, Waiver, Task Packet

## Index tables
### Active
|ID|Category|Status|Summary|Filepath|
|---|---|---|---|---|

### Archived
|ID|Category|Status|Summary|Filepath|
|---|---|---|---|---|

## Archiving
When an item becomes Completed or Superseded:
- Agent moves it from Active to Archived table
- Agent adds Archived On: YYYY-MM-DD in the item file
- Agent updates PR body HITL section to reflect completion
