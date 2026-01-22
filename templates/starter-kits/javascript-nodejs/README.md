# Node.js Starter Kit with Governance

A complete Node.js project template with built-in governance framework, testing, and CI/CD.

## Quick Start

1. **Run the setup script:**
   ```bash
   ./setup.sh
   ```

2. **Start developing:**
   ```bash
   npm start
   ```

3. **Run tests:**
   ```bash
   npm test
   ```

## Project Structure

```
.
├── src/                    # Source code
│   ├── index.js           # Main entry point
│   └── utils.js           # Utility functions
├── tests/                  # Test files
│   └── example.test.js    # Example tests
├── scripts/               # Project scripts
│   └── validate-governance.js
├── .repo/                 # Governance framework
│   ├── repo.manifest.yaml # Repository manifest
│   ├── agents/            # AI agent guides
│   ├── automation/        # Automation scripts
│   ├── docs/              # Documentation
│   ├── policy/            # Policies
│   └── templates/         # Document templates
├── .github/               # GitHub configuration
│   └── workflows/         # CI/CD workflows
├── package.json           # Project configuration
├── jest.config.js         # Jest configuration
├── .eslintrc.json         # ESLint configuration
├── .gitignore            # Git ignore rules
├── P0TODO.md             # Critical tasks (P0)
├── P1TODO.md             # High priority tasks (P1)
└── P2TODO.md             # Normal priority tasks (P2)
```

## Available Scripts

- **`npm start`** - Run the application
- **`npm test`** - Run test suite
- **`npm run test:watch`** - Run tests in watch mode
- **`npm run test:coverage`** - Generate coverage report
- **`npm run lint`** - Lint source code
- **`npm run lint:fix`** - Auto-fix lint issues
- **`npm run governance:validate`** - Validate governance compliance
- **`npm run governance:verify`** - Full verification (lint + test + governance)

## Customization Guide

### Adding New Dependencies

```bash
npm install <package-name>
```

### Adding New Source Files

1. Create file in `src/` directory
2. Add corresponding tests in `tests/`
3. Import and use in `src/index.js`

### Modifying Tests

Tests are located in the `tests/` directory and use Jest. Example:

```javascript
describe('myFunction', () => {
  it('should do something', () => {
    expect(myFunction()).toBe(expectedValue);
  });
});
```

### Configuring ESLint

Edit `.eslintrc.json` to customize linting rules:

```json
{
  "rules": {
    "your-rule": "error"
  }
}
```

## Governance Compliance

This project includes a complete governance framework in the `.repo/` directory:

### Key Components

1. **Repository Manifest** (`.repo/repo.manifest.yaml`)
   - Project metadata and configuration
   - Technology stack declarations
   - Governance commands

2. **Documentation** (`.repo/docs/`)
   - Architecture Decision Records (ADRs)
   - Standards and guidelines
   - API documentation templates

3. **AI Agent Guides** (`.repo/agents/`)
   - Role definitions for AI assistants
   - Checklists and workflows
   - Governance helpers

4. **Policies** (`.repo/policy/`)
   - Security policies
   - Code review requirements
   - Compliance standards

### Validation

Run governance validation at any time:

```bash
npm run governance:validate
```

This checks:
- ✓ Required files exist
- ✓ Required scripts are defined
- ✓ Manifest is properly configured

## CI/CD Pipeline

The `.github/workflows/governance.yml` workflow runs automatically on:
- Push to main branch
- Pull requests
- Manual trigger

The workflow:
1. Installs dependencies
2. Runs linting
3. Runs tests with coverage
4. Validates governance compliance

## TODO System

This project uses prioritized TODO files:

- **P0TODO.md** - Critical, blocking issues (must fix immediately)
- **P1TODO.md** - High priority (fix soon)
- **P2TODO.md** - Normal priority (fix when convenient)

Review these files regularly and keep them updated.

## Troubleshooting

### Tests Failing

```bash
# Run tests in verbose mode
npm test -- --verbose

# Run specific test file
npm test -- tests/example.test.js
```

### Linting Errors

```bash
# Auto-fix common issues
npm run lint:fix

# Check specific files
npx eslint src/index.js
```

### Governance Validation Errors

Check that all required files exist:
```bash
ls -la .repo/repo.manifest.yaml
ls -la README.md
```

## Contributing

1. Review `.repo/docs/standards/` for coding standards
2. Create feature branch from `main`
3. Make changes and add tests
4. Run `npm run governance:verify`
5. Submit pull request

## License

MIT

## Support

For questions or issues:
1. Check `.repo/docs/` for documentation
2. Review existing issues in the repository
3. Create a new issue with details

---

**Generated from:** Node.js Starter Kit with Governance Framework
