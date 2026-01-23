#!/bin/bash
set -e
echo "================================================"
echo "  Express API with Governance - Setup"
echo "================================================"
echo ""
read -p "Enter project name: " PROJECT_NAME
read -p "Enter repository URL: " REPO_URL
read -p "Enter team/organization name: " TEAM_NAME
read -p "Enter project description: " PROJECT_DESC
echo ""
if [ -f "package.json" ]; then
  node << EOF
const fs = require('fs');
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
pkg.name = '$PROJECT_NAME';
pkg.description = '$PROJECT_DESC';
pkg.author = '$TEAM_NAME';
pkg.repository = { type: 'git', url: '$REPO_URL' };
fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2) + '\n');
console.log('✓ Updated package.json');
EOF
fi
if [ -f ".repo/repo.manifest.yaml" ]; then
  sed -i "s|repository: .*|repository: $REPO_URL|g" .repo/repo.manifest.yaml
  sed -i "s|name: .*|name: $PROJECT_NAME|g" .repo/repo.manifest.yaml
  sed -i "s|team: .*|team: $TEAM_NAME|g" .repo/repo.manifest.yaml
  echo "✓ Updated .repo/repo.manifest.yaml"
fi
cp .env.example .env 2>/dev/null || true
echo ""
echo "Installing dependencies..."
if command -v npm &> /dev/null; then
  npm install
  echo "✓ Dependencies installed"
fi
echo ""
echo "Running initial validation..."
npm run governance:validate 2>/dev/null || true
echo ""
echo "================================================"
echo "✅ Setup complete!"
echo "================================================"
echo ""
echo "Next steps:"
echo "  1. Review and customize .env"
echo "  2. Run 'npm run dev' to start server"
echo "  3. Run 'npm test' to verify tests"
echo "  4. Review P0TODO.md"
echo ""
