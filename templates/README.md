# Injectable Governance Templates

This directory contains the complete injectable governance framework that can be copied into any external repository to enable AI-native governance.

## Structure

### `.repo/` - Core Governance Framework
The main governance directory that gets injected into external repositories.

**Contents:**
- `policy/` - Policy documents (CONSTITUTION, PRINCIPLES, QUALITY_GATES, etc.)
- `agents/` - AI agent framework (roles, prompts, checklists)
- `templates/` - Document templates for consistent project structure
- `docs/` - Documentation standards and ADR templates
- `automation/` - CI/CD and automation scripts

### `root-files/` - Root-Level Templates
Templates for files that go in the repository root (P0TODO.md, P1TODO.md, P2TODO.md, etc.)

## Usage

### Manual Injection
1. Copy the `.repo/` folder to your project root
2. Copy desired files from `root-files/` to your project root
3. Customize `repo.manifest.yaml` with your project settings
4. Follow the injection guide in the documentation

### CLI Tool (Future)
```bash
governance-cli init
```

## Version
**Template Version:** 1.0.0

## Documentation
See the main repository documentation for complete usage instructions and guides.

---

**Note:** These are templates. External repositories should copy and customize them according to their needs while respecting the updateable vs. custom layers.
