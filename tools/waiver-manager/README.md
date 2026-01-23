# Waiver Manager

Manages governance waivers stored in `.repo/waivers/`.

## CLI
```bash
governance waiver request --policy SECURITY_BASELINE --reason "Legacy integration" --expires-at 2026-06-01T00:00:00Z
governance waiver approve --id WVR-001 --approver "security-lead"
governance waiver extend --id WVR-001 --expires-at 2026-09-01T00:00:00Z
governance waiver analytics
governance waiver export --format json
```
