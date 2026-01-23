# Testing Strategy

**Purpose:** Define testing scope and quality targets for the governance framework.

**Last Updated:** 2026-01-22  
**Version:** 1.0.0

---

## Goals

- Reach 90%+ coverage for CLI core paths
- Validate all templates and generated files
- Ensure cross-platform compatibility (Windows/macOS/Linux)
- Keep verification runtime under 5 seconds for typical repos

---

## Test Layers

### Unit Tests
- CLI utilities (file utils, validators, metrics)
- Schema validations
- Migration logic

### Integration Tests
- End-to-end CLI flows (`init → validate → verify → update`)
- Metrics collection and report generation
- HITL and waiver workflows

### System Tests
- Full template injection into a sample repo
- Governance verification in CI/CD examples

---

## Coverage Targets

- **CLI Commands:** 90%+
- **Utilities:** 90%+
- **Templates:** 100% presence checks

---

## Recommended Runs

```bash
cd tools/governance-cli
npm test
npm run test:coverage
```

---

## Maintenance

- Add tests for new commands and templates
- Update fixtures when template structure changes
- Track regressions in CI
