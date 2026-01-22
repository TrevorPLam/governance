# Troubleshooting - Full-Stack Example

## Common Issues

### Manifest paths do not match
Update `/.repo/repo.manifest.yaml` boundary patterns to align with `apps/` paths.

### Governance checks fail in CI
Ensure `npm install` runs at repository root and commands match the manifest.

