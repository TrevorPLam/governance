# Layer Model
## Boundary architecture and dependency rules

**Purpose:** Explain the boundary model and how layers are enforced.

**Last Updated:** 2026-01-22  
**Version:** 1.0

---

## Overview

The governance framework enforces a layered architecture to prevent unsafe dependencies and reduce coupling. The default model is defined in `/.repo/policy/BOUNDARIES.md`.

---

## Directory Pattern

Recommended layout:

```
src/<domain>/<feature>/<layer>/
```

Shared platform code lives in:

```
src/platform/
```

---

## Default Layer Flow

**Allowed dependency direction (plain English):**
- UI layer may depend on Domain layer.
- Domain layer may depend on Data layer.
- Data layer may depend on Platform layer.
- Platform layer depends on nothing.

**Machine form:**
```
ui -> domain -> data -> shared_platform
```

---

## Cross-Feature Rules

Cross-feature imports are not allowed by default.  
If a cross-feature import is required:
- Create an ADR documenting the decision.
- Add an explicit exception edge in `repo.manifest.yaml`.

---

## Exception Handling

Exceptions are represented as explicit edges:

```yaml
boundaries:
  edges:
    - from: "src/sales/checkout/ui"
      to: "src/sales/shared/domain"
      reason: "Shared domain types required"
      adr: "docs/adr/0003-shared-domain-types.md"
```

---

## Enforcement Model

The framework uses a **hybrid enforcement model**:
- Static boundary checker (tooling).
- Manifest edge allow-list for explicit exceptions.

Violations are treated as:
- **Waiver required** (if allowed by policy).
- **Automatic remediation task** creation when waived.

---

## Common Patterns

- **Feature-first modules:** Keep all feature components within the feature tree.
- **Shared platform utilities:** Place shared infrastructure in `src/platform/`.
- **Layered services:** UI calls domain services, domain uses data access.

---

## Anti-Patterns

- UI importing data layer directly.
- Cross-feature imports without ADR and manifest edges.
- Platform utilities re-exported across features as shortcuts.
- Circular dependencies across layers.

---

## Related Documentation

- `templates/.repo/policy/BOUNDARIES.md`
- `docs/reference/MANIFEST_REFERENCE.md`
- `docs/architecture/ARCHITECTURE_OVERVIEW.md`

