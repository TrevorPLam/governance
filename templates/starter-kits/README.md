# Governance Starter Kits

Ready-to-use project templates with built-in governance framework. Each kit is production-ready with complete code, tests, documentation, and CI/CD.

## ✨ What's Included in Every Kit

- ✅ **Complete working code** with realistic examples
- ✅ **Test suite** with 70%+ coverage targets
- ✅ **Full governance framework** (`.repo/` with 45+ files)
- ✅ **CI/CD pipeline** (.github/workflows/)
- ✅ **Interactive setup** script with prompts
- ✅ **Comprehensive docs** including troubleshooting
- ✅ **TODO system** (P0/P1/P2 priority tracking)
- ✅ **Linting & formatting** pre-configured

## 📦 Available Starter Kits

### 1. JavaScript/Node.js
**Path:** `javascript-nodejs/`  
**Stack:** Node.js, Jest, ESLint  
**Best For:** CLI tools, utility libraries, simple apps  
**Files:** 15+ files | **Setup:** ~5 min

### 2. React Application
**Path:** `react-app/`  
**Stack:** React 18, TypeScript, Vite, Vitest  
**Best For:** SPAs, dashboards, interactive UIs  
**Files:** 20+ files | **Setup:** ~5 min

### 3. Express API
**Path:** `express-api/`  
**Stack:** Express, TypeScript, Jest, Helmet, CORS  
**Best For:** REST APIs, backend services, microservices  
**Files:** 18+ files | **Setup:** ~5 min

### 4. Python Project
**Path:** `python-project/`  
**Stack:** Python 3.9+, pytest, pylint, black, mypy  
**Best For:** Python apps, data processing, automation  
**Files:** 15+ files | **Setup:** ~5 min

### 5. Monorepo
**Path:** `monorepo/`  
**Stack:** TypeScript, npm workspaces, Jest  
**Best For:** Multiple packages, shared libraries  
**Files:** 25+ files across 3 packages | **Setup:** ~10 min

### 6. Full-Stack
**Path:** `fullstack/`  
**Stack:** React 18 + Express, TypeScript, Vite  
**Best For:** Web applications, complete products  
**Files:** 30+ files (client + server) | **Setup:** ~10 min

## 🚀 Quick Start

```bash
# 1. Copy your chosen kit
cp -r templates/starter-kits/[kit-name] /path/to/new-project
cd /path/to/new-project

# 2. Run interactive setup (configures name, repo, team)
./setup.sh

# 3. Start developing
npm run dev  # or: npm start, npm test, python -m src.main
```

## 📊 Kit Comparison

| Feature | JS/Node | React | Express | Python | Monorepo | Fullstack |
|---------|---------|-------|---------|--------|----------|-----------|
| Frontend | ❌ | ✅ | ❌ | ❌ | ✅ | ✅ |
| Backend | ✅ | ❌ | ✅ | ✅ | ✅ | ✅ |
| TypeScript | ❌ | ✅ | ✅ | ❌ | ✅ | ✅ |
| Multi-package | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ |
| Complexity | Low | Medium | Medium | Low | High | High |
| Setup Time | 5min | 5min | 5min | 5min | 10min | 10min |

## 🏛️ Governance Framework Included

Every kit includes `.repo/` directory (45 files):

```
.repo/
├── repo.manifest.yaml    # Project metadata & commands
├── docs/                 # Standards, ADRs, guidelines
│   ├── standards/       # Coding standards
│   └── adr/            # Architecture Decision Records
├── agents/              # AI assistant guides
│   ├── roles/          # Agent role definitions
│   └── checklists/     # Workflow checklists
├── policy/              # Security & compliance policies
├── automation/          # CI/CD scripts
└── templates/           # Document templates
```

## 🔧 Setup Script Features

Each `setup.sh` prompts for:
- ✏️ Project name
- 🔗 Repository URL
- 👥 Team/organization name
- 📝 Project description

Then automatically:
- Updates package.json/pyproject.toml
- Configures .repo/repo.manifest.yaml
- Installs dependencies
- Runs initial validation
- Shows next steps

## ✅ Validation & Quality

All kits include governance validation:

```bash
# Node.js/TypeScript kits
npm run governance:validate      # Quick check
npm run governance:verify        # Full: lint + test + validate

# Python kit
python scripts/validate-governance.py
```

**Validates:**
- ✓ Required files exist
- ✓ Required scripts defined
- ✓ Configuration valid
- ✓ Governance standards met

## 📝 TODO Priority System

Every kit includes prioritized task tracking:

- **P0TODO.md** - Critical (must fix immediately)
  - Security configuration
  - Essential documentation
  - Testing coverage
  
- **P1TODO.md** - High priority (fix soon)
  - Code quality improvements
  - Enhanced testing
  - Additional documentation
  
- **P2TODO.md** - Normal priority (when convenient)
  - Developer experience
  - Performance optimizations
  - Future enhancements

## 🔄 CI/CD Pipeline

`.github/workflows/governance.yml` in every kit:

```yaml
Steps:
1. Checkout code
2. Setup language runtime
3. Install dependencies
4. Run type checking (TypeScript kits)
5. Run linting
6. Run tests with coverage
7. Build (if applicable)
8. Validate governance
9. Upload coverage reports
```

## 📖 Documentation in Every Kit

- **README.md** - Complete guide with:
  - Quick start
  - Project structure
  - Available scripts
  - Customization guide
  - Troubleshooting
  - Contributing guidelines

## 🎯 Best Practices

### Starting a Project
1. ✅ Choose kit matching your technology stack
2. ✅ Run `./setup.sh` for configuration
3. ✅ Review `P0TODO.md` immediately
4. ✅ Update `.repo/repo.manifest.yaml` with project details
5. ✅ Initialize git and make first commit
6. ✅ Run `npm run governance:verify` (or equivalent)
7. ✅ Start development

### Maintaining Governance
- 📅 Review TODO files weekly
- 📝 Document decisions in `.repo/docs/adr/`
- 🔄 Keep dependencies updated
- ✅ Run validation before committing
- 📊 Monitor test coverage metrics
- 🔒 Review security policies regularly

## 🛠️ Customization

### Adding Dependencies

**Node.js:**
```bash
npm install <package>
```

**Python:**
```bash
pip install <package>
# Then add to pyproject.toml [project.dependencies]
```

### Modifying Structure
- Add new source files
- Create corresponding tests  
- Update configurations
- Extend examples
- Document in .repo/docs/

### Configuring CI/CD
Edit `.github/workflows/governance.yml`:
- Add deployment steps
- Configure secrets
- Set up environments
- Add quality gates

## 📚 Kit-Specific Details

### JavaScript/Node.js Kit
- CommonJS modules
- Jest with coverage
- ESLint rules
- Example utils & tests

### React Kit
- React 18 + TypeScript
- Vite for fast HMR
- Component examples (Counter, Greeting)
- Vitest + Testing Library
- Component boundaries documented

### Express API Kit
- REST API patterns
- Request validation
- Error handling middleware
- Security headers (Helmet)
- API testing with Supertest
- API layer boundaries

### Python Kit
- Modern pyproject.toml
- Type hints throughout
- pytest with fixtures
- pylint + black + mypy
- Virtual environment setup

### Monorepo Kit
- 3 packages: app, lib, utils
- npm workspaces
- Shared configs
- Package boundaries defined
- Cross-package imports

### Full-Stack Kit
- React frontend (port 3000)
- Express backend (port 3001)
- Concurrent dev servers
- Proxy configuration
- Frontend/backend boundaries
- API integration examples

## 🐛 Troubleshooting

**Dependencies won't install:**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Tests failing:**
```bash
npm test -- --verbose
```

**Linting errors:**
```bash
npm run lint:fix  # Auto-fix
```

**Validation fails:**
- Check all required files exist
- Verify .repo/repo.manifest.yaml syntax
- Ensure scripts in package.json

**Python venv issues:**
```bash
python3 -m venv venv
source venv/bin/activate
pip install -e ".[dev]"
```

## 📄 License

All starter kits: **MIT License**

## 🤝 Contributing

To improve kits:
1. Test changes thoroughly
2. Update documentation
3. Ensure validation passes
4. Follow governance standards
5. Submit pull request

---

**Phase 4, Task 3 Complete**  
**Total Kits:** 6  
**Total Files:** 150+  
**Coverage Target:** 70%+  
**Status:** ✅ Production Ready

For detailed information, see each kit's individual README.
