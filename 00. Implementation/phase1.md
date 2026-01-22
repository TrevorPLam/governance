# PHASE-1: Master Handoff Skeleton + Locked Decisions

- Phase ID: PHASE-1

## Handoff

- Name: Textbook Codebase Standard v2.2 (Solo Founder) — Agent-Ready Handoff
- Source of truth: This JSON + generated files under `/.repo/` are authoritative in repos that adopt it.
- Non-coder: All docs must be plain English. No guessing. UNKNOWN is allowed and must route to HITL.
- Filepaths everywhere: true
- Deliver small increments: true

## Locked decisions

### Authority chain

Manifest above Agents for execution/commands. Policy > Agents > Manifest > Standards > Product.

### Principles

- Depth: short
- Selected:
  - P3 One Change Type Per PR
  - P4 Make It Shippable
  - P5 Don’t Break Surprises
  - P6 Evidence Over Vibes
  - P7 UNKNOWN Is a First-Class State
  - P8 Read Repo First
  - P9 Assumptions Must Be Declared
  - P10 Risk Triggers a Stop
  - P11 Prefer Guardrails Over Heroics
  - P12 Rollback Thinking
  - P13 Respect Boundaries by Default
  - P14 Localize Complexity (Option B)
  - P15 Consistency Beats Novelty
  - P16 Decisions Written Down (Token-Optimized)
  - P17 PR Narration
  - P18 No Silent Scope Creep
  - P19 Docs Age With Code
  - P20 Examples Are Contracts
  - P21 Naming Matters
  - P22 Waivers Rare + Temporary
  - P23 ADR Required When Triggered
  - P24 Logs Required for Non-Docs
  - P25 Token-Optimized TODO Discipline

### Quality gates

- Merge policy: soft_block_with_auto_generated_waivers
- Coverage strategy: gradual_ratchet
- Performance budgets: strict_with_fallback_to_default
- Warnings: zero_warnings
- PR size policy: no_limits
- Governance verify checks: all

### Waivers

- All failures require waiver: true
- Auto-generate waivers: true
- Lifecycle: full_history
- Historical location: `/waivers/historical/`

### Security baseline

- Dependency vulnerabilities: always_hitl
- Secrets handling: absolute_prohibition
- Security review triggers: [1, 2, 4, 5, 6, 8, 9, 10]
- Forbidden patterns: [A, B, C, D, E, F, G, H]
- Security check frequency: every_pr
- Evidence requirements: standard
- Mandatory HITL actions: [1, 2, 3, 4, 5, 6, 7, 8]

### Boundaries

- Model: hybrid_domain_feature_layer
- Allowed import direction:
  - ui: [domain]
  - domain: [data]
  - data: [shared_platform]
  - shared_platform: []
- Cross-feature rule: adr_required
- Shared platform directory: `src/platform/`
- Structure pattern: `src/<domain>/<feature>/<layer>/`
- Enforcement method: hybrid_static_checker_plus_manifest
- Exception process: task_packet_for_small_exceptions_adr_for_large
- Violation severity: waiver_plus_auto_task
- Boundary visibility: inline_comments_plus_summary
- Exception evidence: standard
- Exception representation: explicit_edges_in_manifest

### Enhancements

- Location anchors:
  - require_file_header: true
  - require_filepaths_in_prs: true
  - require_filepaths_in_task_packets: true
  - require_filepaths_in_commentary: true
  - require_filepaths_in_adrs_and_waivers: true
- Code anchors:
  - region_comments_required: true
  - critical_code_excerpts_in_pr: true
  - named_function_anchors: true
- Navigation aids:
  - domain_index_files: true
  - feature_index_files: true
  - directory_readmes_with_boundaries: true
  - full_path_imports_optional: true
- Safety heuristics:
  - impact_summary_required: true
  - explicit_unknowns_required: true
  - rollback_plan_required: true
- Iteration accelerators:
  - pattern_reference_required: true
  - verification_commands_required: true
  - file_touch_reason_required: true
  - todo_archive_references_optional: true

### HITL

- Storage: split_same_folder
- Index: `/.repo/policy/HITL.md`
- Items dir: `/.repo/hitl/`
- Sync model: auto_sync_pr_and_hitl
- External system detection: keywords_plus_manifest_plus_change_type
- Human effort goal: minimal; agent does mechanical sync

### Governance contract

- Style: concise_contract
- Tone: legal_contract
- Sections: strict_minimal
- Merge blocking: strict_slightly_elaborated
- Logging clause: expanded_clarification_still_concise
- Boundaries clause: minimal_reference
- Manifest clause: single_binding_sentence
- Governance verify clause: manifest_is_source_of_truth
- Misc clause: single_compact_clause

### Manifest defaults

- Ships: true
- Ship kind: user_facing_app
- Release protects: [app_stability, login_security, money_flows]
- Content level: minimal_but_complete
- Command names: pattern_A
- Quick includes fast build: true
- Prereqs:
  - package_manager: npm
  - runtime_pinned: true
  - platform_tools_required_for_release: true
- Tests: unit+integration
- Budgets:
  - mode: both
  - enforcement: hard_fail_with_waiver
  - fallback_to_default: true
- Security:
  - check_every_pr: true
  - release_includes_security: true
- Boundaries edges model: layered_allow_list

## Agent execution order

1. Create `/.repo` structure.
2. Apply policy files under `/.repo/policy/` (PHASE-2).
3. Apply governance contract + mirror (future phase; not yet generated here).
4. Apply manifest template + resolve commands (PHASE-3 already exists).
5. Apply agents kit + templates + checklists (PHASE-4..6).
6. Wire automation stubs (PHASE-7).
7. Add docs glue + root scaffolds (PHASE-8..9).

## Note

Phases 3–9 already produced. This Phase 1 replaces placeholder with locked decisions and execution order.
