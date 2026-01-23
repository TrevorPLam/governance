# Monorepo Starter Kit with Governance

Complete npm workspaces monorepo with governance framework.

## Quick Start

```bash
./setup.sh
npm install
npm run build
```

## Features

- 📦 npm workspaces
- 🎯 TypeScript monorepo
- 🧪 Jest testing per package
- 📏 Shared ESLint config
- 🏛️ Complete governance
- 🔄 CI/CD ready

## Structure

```
packages/
├── app/          # Main application
├── lib/          # Shared library
└── utils/        # Utility functions
.repo/            # Governance framework
```

## Package Boundaries

Defined in `.repo/docs/`:
- **app** - Depends on lib, utils
- **lib** - Depends on utils
- **utils** - No dependencies

## Available Commands

```bash
# Root level
npm run build              # Build all packages
npm test                   # Test all packages
npm run lint               # Lint all packages
npm run governance:verify  # Full check

# Per package
npm run build -w @myorg/app
npm test -w @myorg/lib
```

## Adding New Packages

```bash
mkdir packages/new-package
cd packages/new-package
npm init -y
# Add to workspaces in root package.json
```

## Governance Compliance

Package boundaries documented in `.repo/docs/`:
- Dependency rules
- Import restrictions
- Shared code guidelines

## License

MIT
