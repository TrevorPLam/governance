<!-- GOVERNANCE_VERSION: 1.0.0 -->
<!-- GOVERNANCE: UPDATEABLE - Layer 2 -->

# /.repo/policy/CONSTITUTION.md
This file is immutable unless the solo founder explicitly approves changes.

## Article 1: Final Authority
The solo founder is the final authority for any ambiguity, conflict, or decision.

## Article 2: Verifiable over Persuasive
Work is not "done" without verification evidence. Proof beats persuasion.

## Article 3: No Guessing
If something is not explicitly known from repo docs, manifest, or code:
- mark it as UNKNOWN
- route to HITL (or explicit questions)
- do not proceed on that uncertain portion

## Article 4: Incremental Delivery
Ship small, reviewable, testable increments.
Large tasks must be decomposed into smaller tasks. No mega-PRs without explicit approval.

## Article 5: Strict Traceability
Every meaningful change must be traceable to an explicit task definition and include verification proof.
Completed tasks must be archived to preserve a compact history of what changed, why, and how it was verified.

## Article 6: Safety Before Speed (Non-Coder Plain English)
If a change could break logins, money flows, user data, privacy, security, external services, or production behavior:
SAFETY WINS.
For risky/uncertain changes: STOP → ASK (HITL) → VERIFY → THEN PROCEED.

## Article 7: Per-Repo Variation Allowed
Governance structure is consistent, but per-repo workflow/execution may vary via manifest, packs, and repo checks.

## Article 8: HITL for External Systems
Anything involving credentials, vendor dashboards, production systems, billing, legal/compliance, or irreversible changes is HITL-gated.
