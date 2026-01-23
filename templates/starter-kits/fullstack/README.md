# Full-Stack Starter Kit with Governance

Complete React + Express full-stack app with governance framework.

## Quick Start

```bash
./setup.sh
npm run dev
```

- Frontend: http://localhost:3000
- Backend: http://localhost:3001

## Features

- ⚛️ React 18 + TypeScript (Frontend)
- ⚡ Express + TypeScript (Backend)
- 🔄 Concurrent dev servers
- 🧪 Testing both layers
- 🏛️ Complete governance
- 🔐 CORS configured

## Structure

```
client/           # React frontend
├── src/
│   ├── App.tsx
│   └── main.tsx
└── vite.config.ts

server/           # Express backend
├── src/
│   └── server.ts
└── tsconfig.json

.repo/            # Governance
```

## Layer Boundaries

Frontend/Backend boundaries documented in `.repo/docs/`:
- API contract definition
- Data flow patterns
- Authentication/authorization
- Error handling strategy

## Available Commands

```bash
# Development
npm run dev              # Start both servers
npm run dev:client       # Frontend only
npm run dev:server       # Backend only

# Building
npm run build            # Build both
npm run build:client     # Frontend only
npm run build:server     # Backend only

# Testing & Quality
npm test                 # Test both
npm run lint             # Lint both
npm run governance:verify # Full check
```

## API Endpoints

### Backend (Port 3001)

```
GET /api              - API status
GET /api/items        - Get all items
GET /api/items/:id    - Get item by ID
```

## Environment Variables

### Client (.env)
```
VITE_API_URL=http://localhost:3001
```

### Server (.env)
```
PORT=3001
NODE_ENV=development
```

## Development Workflow

1. Start dev servers: `npm run dev`
2. Edit frontend: `client/src/`
3. Edit backend: `server/src/`
4. Changes auto-reload
5. Run tests: `npm test`

## Production Build

```bash
npm run build
# Frontend: client/dist/
# Backend: server/dist/

cd server && npm start  # Run backend
# Serve client/dist/ with your web server
```

## Deployment

See `.repo/docs/` for deployment guides:
- Frontend deployment (Vercel, Netlify, etc.)
- Backend deployment (Heroku, Railway, etc.)
- Database setup
- Environment configuration

## License

MIT
