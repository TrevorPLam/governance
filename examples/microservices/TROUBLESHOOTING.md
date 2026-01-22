# Troubleshooting - Microservices Example

## Common Issues

### Boundary paths mismatch
Ensure `/.repo/repo.manifest.yaml` patterns match `services/*` paths.

### CI failures
Verify `npm install` runs at repository root and uses manifest commands.

