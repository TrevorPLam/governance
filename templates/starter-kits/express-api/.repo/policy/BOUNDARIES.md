<!-- GOVERNANCE_VERSION: 1.0.0 -->
<!-- GOVERNANCE: UPDATEABLE - Layer 2 -->

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
