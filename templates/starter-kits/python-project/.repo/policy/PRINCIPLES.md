<!-- GOVERNANCE_VERSION: 1.0.0 -->
<!-- GOVERNANCE: UPDATEABLE - Layer 2 -->

# /.repo/policy/PRINCIPLES.md
These are the operating principles that sit below the Constitution.

## Global rule
Filepaths are required everywhere: PRs, Task Packets, logs, ADRs, waivers, and inline commentary.

## P3 One Change Type Per PR
A PR declares exactly one change type. If you need multiple types, split the work.

## P4 Make It Shippable
Each PR should be safe to merge and ship (or clearly blocked by HITL/waivers).

## P5 Don't Break Surprises
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
Prefer checks, tooling, and automation over "trust me".

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
