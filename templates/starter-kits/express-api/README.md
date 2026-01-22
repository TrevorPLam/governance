# Express API Starter Kit with Governance

Complete Express + TypeScript REST API with governance framework.

## Quick Start

```bash
./setup.sh
npm run dev
```

Visit: http://localhost:3000/health

## Features

- ⚡ Express 4 + TypeScript
- 🛡️ Security (Helmet, CORS)
- 🧪 Jest + Supertest testing
- 📏 ESLint + TypeScript
- 🏛️ Complete governance framework
- 🔄 CI/CD ready

## Structure

```
src/
├── server.ts           # Main server
├── routes/             # API routes
├── controllers/        # Request handlers
└── middleware/         # Custom middleware
tests/                  # API tests
.repo/                  # Governance
```

## Available Scripts

- `npm run dev` - Start dev server
- `npm run build` - Build for production
- `npm start` - Run production build
- `npm test` - Run tests
- `npm run lint` - Lint code
- `npm run governance:verify` - Full check

## API Endpoints

### Health Check
```
GET /health
```

### Users API
```
GET    /api/users      - Get all users
GET    /api/users/:id  - Get user by ID
POST   /api/users      - Create user
```

## Testing

```bash
npm test                # Run once
npm run test:watch      # Watch mode
npm run test:coverage   # With coverage
```

## Environment Variables

Copy `.env.example` to `.env`:
```bash
PORT=3000
NODE_ENV=development
```

## API Layer Boundaries

Documented in `.repo/docs/`:
- Routes → Controllers → Services pattern
- Request validation rules
- Error handling standards
- Security policies

## Deployment

```bash
npm run build
npm start
```

## License

MIT
