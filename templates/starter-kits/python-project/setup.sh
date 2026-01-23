#!/bin/bash
set -e
echo "================================================"
echo "  Python Project with Governance - Setup"
echo "================================================"
echo ""
read -p "Enter project name: " PROJECT_NAME
read -p "Enter repository URL: " REPO_URL
read -p "Enter team/organization name: " TEAM_NAME
read -p "Enter project description: " PROJECT_DESC
echo ""
if [ -f "pyproject.toml" ]; then
  sed -i "s|name = \".*\"|name = \"$PROJECT_NAME\"|g" pyproject.toml
  sed -i "s|description = \".*\"|description = \"$PROJECT_DESC\"|g" pyproject.toml
  echo "✓ Updated pyproject.toml"
fi
if [ -f ".repo/repo.manifest.yaml" ]; then
  sed -i "s|repository: .*|repository: $REPO_URL|g" .repo/repo.manifest.yaml
  sed -i "s|name: .*|name: $PROJECT_NAME|g" .repo/repo.manifest.yaml
  sed -i "s|team: .*|team: $TEAM_NAME|g" .repo/repo.manifest.yaml
  echo "✓ Updated .repo/repo.manifest.yaml"
fi
echo ""
echo "Creating virtual environment..."
if command -v python3 &> /dev/null; then
  python3 -m venv venv
  source venv/bin/activate
  pip install --upgrade pip
  pip install -e ".[dev]"
  echo "✓ Virtual environment created and dependencies installed"
fi
echo ""
echo "Running initial validation..."
python scripts/validate-governance.py 2>/dev/null || true
echo ""
echo "================================================"
echo "✅ Setup complete!"
echo "================================================"
echo ""
echo "Next steps:"
echo "  1. Activate virtual environment: source venv/bin/activate"
echo "  2. Run tests: pytest"
echo "  3. Run linting: pylint src tests"
echo "  4. Review P0TODO.md"
echo ""
