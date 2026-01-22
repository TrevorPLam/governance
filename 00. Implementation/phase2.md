# PHASE-2: Policy Corpus (Authoritative Rules)

- Phase ID: PHASE-2

## Files
### `/.repo/policy/CONSTITUTION.md` (markdown)
```markdown
# /.repo/policy/CONSTITUTION.md
This file is immutable unless the solo founder explicitly approves changes.

## Article 1: Final Authority
The solo founder is the final authority for any ambiguity, conflict, or decision.

## Article 2: Verifiable over Persuasive
Work is not “done” without verification evidence. Proof beats persuasion.

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
```

### `/.repo/policy/PRINCIPLES.md` (markdown)
```markdown
# /.repo/policy/PRINCIPLES.md
These are the operating principles that sit below the Constitution.

## Global rule
Filepaths are required everywhere: PRs, Task Packets, logs, ADRs, waivers, and inline commentary.

## P3 One Change Type Per PR
A PR declares exactly one change type. If you need multiple types, split the work.

## P4 Make It Shippable
Each PR should be safe to merge and ship (or clearly blocked by HITL/waivers).

## P5 Don’t Break Surprises
If users, security, money, or production behavior could change: call it out, add tests, add rollback plan, use HITL.

## P6 Evidence Over Vibes
Show proof: commands run, outputs, test results, links to artifacts (filepaths).

## P7 UNKNOWN Is a First-Class State
UNKNOWN is allowed and required. Mark it explicitly and route to HITL.

## P8 Read Repo First
Use /.repo docs + repo.manifest.yaml before deciding anything.

## P9 Assumptions Must Be Declared
Any assumption must be written down and labeled as an assumption.

## P10 Risk Triggers a Stop
If risk is non-trivial: STOP → HITL → VERIFY.

## P11 Prefer Guardrails Over Heroics
Prefer checks, tooling, and automation over “trust me”.

## P12 Rollback Thinking
Every risky change must have rollback thinking (how to undo safely).

## P13 Respect Boundaries by Default
Do not cross module boundaries unless rules allow.

## P14 Localize Complexity (Option B)
Put complexity where it belongs. Keep it contained. Avoid spreading special cases.

## P15 Consistency Beats Novelty
Prefer existing patterns and names. Novelty requires justification.

## P16 Decisions Written Down (Token-Optimized)
Record decisions in the smallest durable place (ADR only when triggered).

## P17 PR Narration
PR must explain: what, why, filepaths, how verified, risks, rollback.

## P18 No Silent Scope Creep
Do not expand scope without updating Task Packet and calling it out.

## P19 Docs Age With Code
When code changes, docs must change too if they describe behavior.

## P20 Examples Are Contracts
Examples define expected behavior. If code changes, examples must be updated.

## P21 Naming Matters
Names must be clear. Avoid confusing abbreviations.

## P22 Waivers Rare + Temporary
Waivers are not permanent. They expire. They require a plan.

## P23 ADR Required When Triggered
If an ADR trigger is met, create an ADR. No exceptions.

## P24 Logs Required for Non-Docs
Non-doc-only changes require agent logs + trace logs + reasoning summary.

## P25 Token-Optimized TODO Discipline
Use P0/P1/P2 TODO files + archive completed work to keep active context compact.
```

### `/.repo/policy/QUALITY_GATES.md` (markdown)
```markdown
# /.repo/policy/QUALITY_GATES.md
Quality Gates are the merge rules. governance-verify enforces them.

## Merge policy
Policy: soft block with auto-generated waivers for waiverable gate failures.
Meaning: if a waiverable gate fails, a waiver is generated and must be approved/expired rules apply.

## Hard gates (must pass; not waiverable)
These are “governance integrity” gates. If these fail, the repo is not self-governing.
- Required artifacts are missing for the declared change type (Task Packet, required logs, trace, ADR/HITL when triggered).
- Trace log is missing or invalid against /.repo/templates/AGENT_TRACE_SCHEMA.json.
- Required HITL items are not Completed (or validly waived where policy allows).
- Waiver referenced is missing or expired.
- governance-verify fails.

## Waiverable gates (waiver required when failing)
- Coverage targets (gradual ratchet).
- Performance/bundle budgets (strict with fallback to default).
- Warning budgets (zero warnings; waiver required if warnings exist).
Note: waivers must be rare + temporary.

## Coverage strategy: gradual ratchet
- Do not require perfection immediately.
- Each change should improve coverage or keep it from regressing.
- Over time, the minimum bar rises.

## Performance budgets: strict with fallback to default
- Repo may define explicit budgets.
- If missing, use the default budgets described in this file (or referenced standard).
- If budgets are exceeded: fail + require waiver + remediation plan.

## Warnings: zero warnings
Warnings are treated as failures. If a warning exists, it must be fixed or waived.

## PR size policy: no limits
No hard PR size limits. Constitution still requires decomposition into shippable increments.

## Required checks
governance_verify_checks: all
Meaning: governance-verify checks everything it knows how to check for this repo type.
```

### `/.repo/policy/SECURITY_BASELINE.md` (markdown)
```markdown
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
```

### `/.repo/policy/BOUNDARIES.md` (markdown)
```markdown
# /.repo/policy/BOUNDARIES.md
This file defines module boundaries. Boundaries are enforced.

## Model
hybrid_domain_feature_layer

## Directory pattern
src/<domain>/<feature>/<layer>/
Shared platform directory: src/platform/

## Default allowed import direction (Plain English)
- UI layer may depend on Domain layer
- Domain layer may depend on Data layer
- Data layer may depend on Platform (shared) layer
- Platform depends on nothing

Machine form:
ui → domain → data → shared_platform

## Cross-feature rule
Cross-feature imports require an ADR.

## Enforcement method
hybrid_static_checker_plus_manifest
Meaning: a static boundary checker runs AND the manifest contains explicit edges for allowed exceptions.

## Exceptions
- Small exception: allowed only with explicit Task Packet justification + filepaths.
- Large exception: requires ADR.
All exceptions must be represented as explicit edges in /.repo/repo.manifest.yaml.

## Violation severity
waiver_plus_auto_task
Meaning: if boundaries are violated:
- PR is blocked unless fixed or waived
- if waived, an auto-task is created in TODOs with remediation plan

## Boundary visibility
inline_comments_plus_summary
Meaning: boundary-related decisions must be visible in code comments where relevant and summarized in PR narration.

## Practical examples (Plain English)
Allowed:
- src/sales/checkout/ui/* imports src/sales/checkout/domain/*
Forbidden:
- UI imports Data directly
- Any layer imports another feature in a different feature folder without ADR
- Anything imports Platform and then re-exports it as a shortcut across features
```

### `/.repo/policy/HITL.md` (markdown)
```markdown
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
```

## Acceptance criteria
- All files exist at the specified filepaths.
- Plain English rules are present: no guessing, UNKNOWN, evidence, merge blocking.
- Boundaries and security rules match locked decisions.

## Notes
This Phase 2 replaces the placeholder and bakes in all locked decisions from this chat.