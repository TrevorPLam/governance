# Recommendations: Missing Features Across All Comparisons

This document aggregates every missing feature called out across the four comparison documents:
ChatGPT, Gemini, Perplexity, and CoPilot. No items are omitted; duplicates are consolidated into a
single list for clarity.

## 1. Repository Architecture and Structure
- Monorepo vs. polyrepo decision guidance and criteria
- Hybrid strategy guidance for mixed coupling
- One-version dependency policy (diamond dependency mitigation)
- Virtualized workspace or sparse checkout guidance for large repos
- Atomic refactoring workflows for cross-service changes
- Repository structure patterns and directory templates
- App vs. library organization guidance
- Monorepo tooling guidance (Nx, Bazel, Turborepo)

## 2. Branching and Code Review Governance
- Trunk-based development standard
- Branching strategy guidance (GitFlow, GitHub Flow, trunk-based)
- Branch naming conventions
- Feature branch lifecycle rules
- Branch protection rules and protection scope
- Approval SLAs / review turnaround expectations
- Review depth guidance and reviewer assignment rules
- PR size recommendations and review metrics
- Signed commits requirements
- Force-push policies
- Commit standards (Conventional Commits)
- Commit atomicity guidance
- Squash vs. merge strategy

## 3. CI/CD Pipeline Standards
- CI/CD tool recommendations
- Pipeline performance targets (e.g., <10 minutes)
- Test pyramid guidance and test type ratios
- Parallel execution strategies
- Build caching recommendations
- Selective test execution / affected-only builds
- Post-deploy verification standards
- Deployment frequency targets
- Rollback automation details
- Pipeline health metrics (flake rate, CI duration targets)

## 4. Testing Standards and Innovation
- Test coverage targets
- Flaky test handling
- Mutation testing guidance
- Property-based testing guidance
- Chaos engineering
- Production testing
- Performance testing requirements
- Security testing requirements

## 5. Deployment Practices
- Progressive delivery strategies (canary, blue-green)
- Feature flags guidance
- A/B testing
- Ring deployments
- GitOps adoption guidance

## 6. Environment and Infrastructure Management
- Infrastructure as Code (IaC) specifications
- Environment parity requirements
- Containerization standards
- Environment provisioning automation

## 7. Observability, Metrics, and Reporting
- Monitoring stack definition
- Logging standards
- Metrics collection requirements
- Alerting guidelines and alert routing
- Distributed tracing requirements
- OpenTelemetry for GenAI
- AIOps guidance
- eBPF monitoring
- DORA metrics tracking
- SPACE/DevEx metrics
- Governance metrics and compliance dashboards
- Risk scoring methodology
- Agent SLOs and reliability metrics
- Cost accounting for agentic work

## 8. Policy-as-Code and Governance Automation
- OPA/Rego policy-as-code framework and examples
- Policy ratchet mechanism (WARN → FAIL)
- Risk-based auto-merge matrix
- Break-glass protocol for emergency overrides
- Manifest validation policies enforcing declared constraints
- Per-component governance manifests (e.g., `GOVERNANCE.yaml`)
- Ownership metadata tied to governance manifests
- Boundary violation escalation rules for critical risk
- Automated graph checks for boundary enforcement
- Entropy/architecture metrics (fan-in/out, cycles, call depth)

## 9. Waiver Governance
- Waiver expiry automation and renewal limits
- Waiver frequency metrics and escalation thresholds
- Waiver debt tracking
- Ratchet logic based on recurrence

## 10. Supply Chain Security
- SBOM generation requirement
- SLSA attestation and provenance verification
- Keyless signing guidance (Sigstore/Cosign)
- Artifact signing requirements and provenance attestations
- Ephemeral builds and network-isolated build standards
- Dependency pinning policy
- Semantic versioning requirements
- Supply-chain security framework adoption (SLSA)
- Signed releases and artifact integrity checks

## 11. Security and Access Control
- MFA/2FA requirements
- RBAC definitions
- Access review cadence
- Least privilege implementation details
- Security as code
- Continuous security scanning
- Pre-commit secret scanning requirements
- Secret rotation automation

## 12. Documentation Standards
- Standard README specification
- Documentation types (tutorials, how-tos, reference, explanations)
- Documentation maintenance cadence
- API documentation requirements
- Auto-generated API docs
- Link checking
- Markdown linting
- Example validation

## 13. Automation and Workflow Enhancements
- PR automation (auto-assignment, auto-labeling, size classification, stale PR handling)
- Automated merge criteria
- Issue templates and issue automation (auto-labeling, duplicates, stale cleanup, milestones)
- Release automation (semantic versioning, changelog, release notes, publishing, tag creation)
- Automated dependency PR creation
- Auto-merge for security patches
- Code quality automation (linting tools, formatting requirements, complexity analysis, dead code detection, type checking)
- Notification systems (channels, alert routing, escalation automation)
- Automated remediation tools
- Pre-commit hook requirements

## 14. AI-Native Governance
- Change Contract template for PRs
- Risk-based gate matrix for auto-merge decisions
- AI audit metadata (prompt/model/version/temperature)
- Behavioral evidence gate for AI-generated code
- AI degradation monitoring
- Anti-entropy rules for duplication/complexity
- Explicit agent taxonomy (Coder/Reviewer/Auditor/SRE)
- Structured reasoning audit logs
- Agent failure mode controls (hallucination loops, context drift)
- Risk scoring for PRs to determine validation depth

## 15. Platform Engineering and Developer Experience
- Internal Developer Platform (IDP)
- Golden paths concept
- Service catalog
- Developer portal
- Developer productivity measurement
- Cloud development environments (Codespaces)
- Dev containers

## 16. Compliance and Auditability
- Compliance frameworks references (SOC 2, PCI-DSS, HIPAA, GDPR)
- Compliance automation strategy
- Audit schedule
- Compliance reporting
- Immutable audit trails
- Blockchain for audit logging (if desired)
