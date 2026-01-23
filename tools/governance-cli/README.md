# Governance CLI

CLI tool for AI-Native repository governance - automates governance injection, validation, and verification.

## Installation

### From NPM (when published)
```bash
npm install -g @trevorplam/governance-cli
```

### Local Development
```bash
cd tools/governance-cli
npm install
npm run build
npm link
```

## Quick Start

Initialize governance in your project:
```bash
cd /path/to/your/project
governance init
```

Validate your configuration:
```bash
governance validate
```

Run verification checks:
```bash
governance verify --profile=ci
```

## Commands

### `governance init`
Initialize governance in the current repository.

**Options:**
- `-n, --name <name>` - Project name (auto-detected if not provided)
- `-t, --tier <tier>` - Governance tier: minimal, standard, complete (default: standard)
- `--no-auto-fill` - Disable automatic manifest filling
- `--no-interactive` - Run in non-interactive mode

**Example:**
```bash
governance init --tier=standard
```

### `governance validate`
Validate governance configuration and manifest.

**Options:**
- `-v, --verbose` - Show detailed validation output

**Example:**
```bash
governance validate --verbose
```

### `governance verify`
Run governance verification checks.

**Options:**
- `-p, --profile <profile>` - Verification profile: quick, ci, release (default: quick)
- `-v, --verbose` - Show detailed verification output

**Example:**
```bash
governance verify --profile=ci
```

### `governance lint`
Run policy validators and governance linters.

**Examples:**
```bash
governance lint
governance lint --schema
governance lint --regex
```

### `governance hitl`
Manage Human-in-the-Loop items.

**Examples:**
```bash
governance hitl list
governance hitl create --summary "Review auth flow" --risk high
governance hitl resolve --id HITL-001 --resolution "Approved"
```

### `governance waiver`
Manage governance waivers.

**Examples:**
```bash
governance waiver request --policy SECURITY_BASELINE --reason "Legacy integration" --expires-at 2026-06-01T00:00:00Z
governance waiver approve --id WVR-001 --approver "security-lead"
governance waiver analytics
```

### `governance metrics`
Collect and report governance metrics.

**Examples:**
```bash
governance metrics collect
governance metrics report --format json
governance metrics dashboard --port 3579
```

### `governance check-updates`
Check for governance framework updates.

**Example:**
```bash
governance check-updates
```

### `governance update`
Update governance framework to latest version.

**Options:**
- `--dry-run` - Show what would be updated without applying changes
- `--force` - Force update even if already on latest version
- `--no-backup` - Skip creating backup before update

**Example:**
```bash
governance update --dry-run
governance update
```

### `governance migrate`
Apply governance migrations for new framework features.

**Example:**
```bash
governance migrate --dry-run
```

### `governance maturity-check`
Assess governance maturity level for the current repository.

**Options:**
- `--json` - Output report as JSON
- `-r, --report <path>` - Write JSON report to a file
- `-v, --verbose` - Show detailed criteria results

**Example:**
```bash
governance maturity-check --verbose
```

## Governance Tiers

### Minimal (Tier 1)
- Core policies only (7 files)
- Manifest template
- Entry point documentation
- ~10 files total

### Standard (Tier 2) - Recommended
- Everything in Minimal
- Agent framework (11 files)
- Document templates (7 files)
- Documentation structure
- ~45 files total

### Complete (Tier 3)
- Everything in Standard
- Automation scripts
- CI/CD templates
- Advanced tooling
- ~55+ files total

## What Gets Injected

When you run `governance init`, the following files are copied to your project:

```
your-project/
├── .repo/
│   ├── GOVERNANCE.md          # Entry point
│   ├── VERSION                # Governance version
│   ├── repo.manifest.yaml     # Command manifest
│   ├── policy/                # 7 policy files
│   ├── agents/                # Agent framework (Standard+)
│   ├── templates/             # Document templates (Standard+)
│   ├── docs/                  # Documentation (Standard+)
│   ├── automation/            # Scripts (Complete)
│   ├── hitl/                  # HITL tracking
│   ├── waivers/               # Waiver tracking
│   └── archive/               # Backups
├── P0TODO.md
├── P1TODO.md
├── P2TODO.md
└── COMPLETEDTODO.md
```

## Auto-Fill Feature

The CLI automatically detects your project type and fills in common commands:

- **Node.js** (package.json detected) - Fills npm/yarn commands
- **Python** (pyproject.toml detected) - Fills pip/pytest commands
- **Maven** (pom.xml detected) - Fills mvn commands
- **Gradle** (build.gradle detected) - Fills gradle commands

## Version Management

Governance uses a 3-layer version system:

- **Layer 1 (Custom)** - Your customizations (manifest, ADRs, waivers, HITL items)
- **Layer 2 (Updateable)** - Policies and standards (safe to update)
- **Layer 3 (Immutable)** - Templates and automation (safe to update)

When you run `governance update`:
- Layer 1 files are **preserved**
- Layer 2 files are **updated**
- Layer 3 files are **updated**

## Development

### Build
```bash
npm run build
```

### Watch Mode
```bash
npm run dev
```

### Test
```bash
npm test
npm run test:coverage
```

### Lint
```bash
npm run lint
npm run lint:fix
```

## Troubleshooting

### "Governance not initialized"
Run `governance init` in your project directory first.

### "Command not found: governance"
Make sure the package is installed globally or run `npm link` in development.

### "Permission denied"
The bin file needs to be executable. Run `chmod +x bin/governance`.

### Templates not found
The CLI expects templates to be in `../../templates/` relative to the built CLI. Ensure the governance repository structure is intact.

## Contributing

See [CONTRIBUTING.md](../../CONTRIBUTING.md) in the main repository.

## License

MIT
