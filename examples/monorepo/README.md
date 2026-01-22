# Monorepo Example
## Governance configuration in a workspace layout

This example shows a realistic monorepo structure with governance enabled.

**Highlights:**
- Multiple packages in `packages/`
- Shared platform utilities
- Manifest-driven commands
- Boundary model for layers
- CI workflow using governance checks

---

## Structure

```
examples/monorepo/
├── .repo/                       # Governance framework (example)
├── .github/workflows/           # CI workflows
├── packages/
│   ├── web/                     # UI package
│   ├── api/                     # API package
│   └── shared/                  # Shared platform utilities
├── scripts/                     # Helper scripts
└── package.json                 # Workspace root
```

---

## Governance Setup

1. Review `/.repo/GOVERNANCE.md`.
2. Update `/.repo/repo.manifest.yaml` if commands change.
3. Run:
   - `governance validate`
   - `governance verify --profile=ci`

---

## Boundary Model

This example uses the layered model:
```
ui -> domain -> data -> platform
```

See `/.repo/policy/BOUNDARIES.md` and the manifest `boundaries:` section.

---

## CI Workflow

The workflow in `.github/workflows/governance.yml` runs:
- `governance validate`
- `governance verify --profile=ci`

---

## Troubleshooting

See `TROUBLESHOOTING.md` in this folder.

