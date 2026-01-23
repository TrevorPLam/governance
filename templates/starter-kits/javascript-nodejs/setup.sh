#!/bin/bash

# Node.js Starter Kit Setup Script
# Interactive setup for a new Node.js project with governance

set -e

echo "================================================"
echo "  Node.js Project with Governance - Setup"
echo "================================================"
echo ""

# Prompt for project information
read -p "Enter project name (e.g., my-awesome-app): " PROJECT_NAME
read -p "Enter repository URL (e.g., https://github.com/user/repo): " REPO_URL
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
  # Use Node.js to update package.json
  node << EOF
const fs = require('fs');
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
pkg.name = '$PROJECT_NAME';
pkg.description = '$PROJECT_DESC';
pkg.author = '$TEAM_NAME';
pkg.repository = {
  type: 'git',
  url: '$REPO_URL'
};
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

# Install dependencies
echo ""
echo "Installing dependencies..."
if command -v npm &> /dev/null; then
  npm install
  echo "✓ Dependencies installed"
else
  echo "⚠ npm not found. Please install Node.js and run 'npm install'"
fi

# Run initial validation
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
echo "  1. Review and customize the code in src/"
echo "  2. Run 'npm test' to ensure tests pass"
echo "  3. Run 'npm run lint' to check code style"
echo "  4. Review P0TODO.md for critical tasks"
echo "  5. Commit your changes and push to: $REPO_URL"
echo ""
echo "Available commands:"
echo "  npm start              - Run the application"
echo "  npm test               - Run tests"
echo "  npm run lint           - Lint code"
echo "  npm run governance:verify - Full governance check"
echo ""
