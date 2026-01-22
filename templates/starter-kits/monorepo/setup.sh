#!/bin/bash
set -e
echo "================================================"
echo "  Monorepo with Governance - Setup"
echo "================================================"
echo ""
read -p "Enter project name: " PROJECT_NAME
read -p "Enter repository URL: " REPO_URL
read -p "Enter organization name: " ORG_NAME
echo ""
if [ -f "package.json" ]; then
  sed -i "s|\"name\": \".*\"|\"name\": \"$PROJECT_NAME\"|g" package.json
  echo "✓ Updated root package.json"
fi
for pkg in packages/*; do
  if [ -f "$pkg/package.json" ]; then
    sed -i "s|@myorg/|@$ORG_NAME/|g" "$pkg/package.json"
    echo "✓ Updated $pkg/package.json"
  fi
done
for src in packages/*/src/*.ts; do
  sed -i "s|@myorg/|@$ORG_NAME/|g" "$src"
done
if [ -f ".repo/repo.manifest.yaml" ]; then
  sed -i "s|repository: .*|repository: $REPO_URL|g" .repo/repo.manifest.yaml
  sed -i "s|name: .*|name: $PROJECT_NAME|g" .repo/repo.manifest.yaml
  echo "✓ Updated .repo/repo.manifest.yaml"
fi
echo ""
echo "Installing dependencies..."
if command -v npm &> /dev/null; then
  npm install
  echo "✓ Dependencies installed"
fi
echo ""
echo "================================================"
echo "✅ Setup complete!"
echo "================================================"
echo ""
echo "Next steps:"
echo "  1. Build all packages: npm run build"
echo "  2. Run tests: npm test"
echo "  3. Review P0TODO.md"
echo ""
