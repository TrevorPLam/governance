# Python Project Starter Kit with Governance

Complete Python project with governance framework, pytest testing, and CI/CD.

## Quick Start

```bash
./setup.sh
source venv/bin/activate
pytest
```

## Features

- 🐍 Python 3.9+
- 🧪 pytest with coverage
- 📏 pylint + black + mypy
- 📦 Modern pyproject.toml
- 🏛️ Complete governance framework
- 🔄 CI/CD ready

## Structure

```
src/                # Source code
├── __init__.py
├── main.py         # Main entry
└── utils.py        # Utilities
tests/              # Test files
├── test_main.py
└── test_utils.py
.repo/              # Governance
scripts/            # Build scripts
```

## Available Commands

```bash
# Run application
python -m src.main

# Run tests
pytest                      # Run once
pytest --cov               # With coverage
pytest -v                  # Verbose

# Code quality
pylint src tests           # Lint
black src tests            # Format
mypy src                   # Type check

# Governance
python scripts/validate-governance.py
```

## Development

### Virtual Environment

```bash
python3 -m venv venv
source venv/bin/activate   # Linux/Mac
venv\Scripts\activate      # Windows
pip install -e ".[dev]"
```

### Running Tests

```bash
pytest                     # All tests
pytest tests/test_utils.py # Specific file
pytest -k "test_add"       # Match pattern
pytest --cov-report=html   # HTML coverage
```

### Code Style

```bash
black .                    # Format code
pylint src tests           # Lint
mypy src                   # Type check
```

## Project Configuration

All configuration in `pyproject.toml`:
- Dependencies
- pytest settings
- Coverage thresholds
- black/pylint/mypy config

## Governance Compliance

See `.repo/` directory for:
- Documentation standards
- Architecture decisions
- Coding guidelines
- Security policies

## Deployment

```bash
pip install build
python -m build
# Distributable in dist/
```

## License

MIT
