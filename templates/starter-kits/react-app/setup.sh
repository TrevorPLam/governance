#!/bin/bash

set -e

echo "================================================"
echo "  React App with Governance - Setup"
echo "================================================"
echo ""

read -p "Enter project name (e.g., my-react-app): " PROJECT_NAME
read -p "Enter repository URL: " REPO_URL
read -p "Enter team/organization name: " TEAM_NAME
read -p "Enter project description: " PROJECT_DESC

echo ""
echo "Setting up project with:"
echo "  Name: $PROJECT_NAME"
echo "  Repository: $REPO_URL"
echo "  Team: $TEAM_NAME"
echo ""

# Update package.json
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

# Update repo.manifest.yaml
if [ -f ".repo/repo.manifest.yaml" ]; then
  sed -i "s|repository: .*|repository: $REPO_URL|g" .repo/repo.manifest.yaml
  sed -i "s|name: .*|name: $PROJECT_NAME|g" .repo/repo.manifest.yaml
  sed -i "s|team: .*|team: $TEAM_NAME|g" .repo/repo.manifest.yaml
  echo "✓ Updated .repo/repo.manifest.yaml"
fi

# Update index.html title
if [ -f "index.html" ]; then
  sed -i "s|<title>.*</title>|<title>$PROJECT_NAME</title>|g" index.html
  echo "✓ Updated index.html"
fi

echo ""
echo "Installing dependencies..."
if command -v npm &> /dev/null; then
  npm install
  echo "✓ Dependencies installed"
else
  echo "⚠ npm not found. Please install Node.js and run 'npm install'"
fi

echo ""
echo "Running initial validation..."
if command -v npm &> /dev/null; then
  npm run governance:validate || true
fi

echo ""
echo "================================================"
echo "✅ Setup complete!"
echo "================================================"
echo ""
echo "Next steps:"
echo "  1. Run 'npm run dev' to start development server"
echo "  2. Open http://localhost:3000 in your browser"
echo "  3. Edit src/App.tsx to customize your app"
echo "  4. Run 'npm test' to ensure tests pass"
echo "  5. Review P0TODO.md for critical tasks"
echo ""
echo "Available commands:"
echo "  npm run dev        - Start dev server"
echo "  npm run build      - Build for production"
echo "  npm test           - Run tests"
echo "  npm run lint       - Lint code"
echo "  npm run governance:verify - Full check"
echo ""
