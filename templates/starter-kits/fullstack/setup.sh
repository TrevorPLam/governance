#!/bin/bash
set -e
echo "================================================"
echo "  Full-Stack App with Governance - Setup"
echo "================================================"
echo ""
read -p "Enter project name: " PROJECT_NAME
read -p "Enter repository URL: " REPO_URL
read -p "Enter team name: " TEAM_NAME
echo ""
if [ -f "package.json" ]; then
  sed -i "s|\"name\": \".*\"|\"name\": \"$PROJECT_NAME\"|g" package.json
fi
if [ -f ".repo/repo.manifest.yaml" ]; then
  sed -i "s|repository: .*|repository: $REPO_URL|g" .repo/repo.manifest.yaml
  sed -i "s|name: .*|name: $PROJECT_NAME|g" .repo/repo.manifest.yaml
  sed -i "s|team: .*|team: $TEAM_NAME|g" .repo/repo.manifest.yaml
  echo "✓ Updated .repo/repo.manifest.yaml"
fi
cp client/.env.example client/.env 2>/dev/null || true
cp server/.env.example server/.env 2>/dev/null || true
echo ""
echo "Installing dependencies..."
if command -v npm &> /dev/null; then
  npm install
  echo "✓ Root dependencies installed"
  cd client && npm install && cd ..
  echo "✓ Client dependencies installed"
  cd server && npm install && cd ..
  echo "✓ Server dependencies installed"
fi
echo ""
echo "================================================"
echo "✅ Setup complete!"
echo "================================================"
echo ""
echo "Next steps:"
echo "  1. npm run dev       - Start both servers"
echo "  2. Client: http://localhost:3000"
echo "  3. Server: http://localhost:3001"
echo "  4. Review P0TODO.md"
echo ""
