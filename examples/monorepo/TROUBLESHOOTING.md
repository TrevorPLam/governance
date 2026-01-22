# Troubleshooting - Monorepo Example

## Common Issues

### Governance validate fails

**Symptoms:**
- Missing `.repo` files
- Placeholder commands in `repo.manifest.yaml`

**Fix:**
- Ensure `.repo` exists and includes policy files.
- Replace any placeholder commands.
- Re-run `governance validate`.

### Governance verify fails

**Symptoms:**
- Required commands missing
- Boundary violations

**Fix:**
- Check `repo.manifest.yaml` command definitions.
- Ensure layer boundaries are respected.
- Re-run `governance verify --profile=ci`.

### CI workflow fails

**Symptoms:**
- Missing dependencies
- Incorrect Node version

**Fix:**
- Confirm Node version in workflow.
- Run `npm install` at root.

