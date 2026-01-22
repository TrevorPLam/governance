# Full-Stack Governance Example

**Purpose:** Demonstrate AI-Native Governance in a complete full-stack application.

## Overview

This example shows governance in a real-world full-stack application with:
- React frontend with TypeScript
- Node.js/Express backend
- PostgreSQL database
- Authentication and authorization
- Complete CI/CD pipeline

## Structure

```
fullstack/
├── .repo/                     # Governance framework
├── frontend/                  # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── utils/
│   └── package.json
├── backend/                   # Express backend
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── services/
│   └── package.json
├── database/                  # Database migrations and seeds
│   ├── migrations/
│   └── seeds/
├── shared/                    # Shared types and utilities
│   └── types/
└── docker-compose.yml         # Local development setup
```

## Key Features Demonstrated

### 1. Layer Architecture
Full implementation of the layer model:
- **UI Layer** (frontend/src/components)
- **Application Layer** (frontend/src/pages, backend/src/controllers)
- **Domain Layer** (backend/src/services)
- **Data Layer** (backend/src/models, database)
- **Platform Layer** (shared utilities)

### 2. Security Implementation
- Authentication with JWT
- Authorization middleware
- Input validation and sanitization
- SQL injection prevention
- CSRF protection
- Security headers (Helmet)
- Rate limiting

### 3. Quality Gates
- Bundle size limits (frontend)
- API response time limits (backend)
- Database query performance
- Test coverage requirements
- Code quality metrics

### 4. Complete CI/CD
- Automated testing
- Security scanning
- Governance checks
- Staged deployments
- Rollback procedures

## Quick Start

### 1. Prerequisites
- Node.js 18+
- PostgreSQL 14+
- Docker (optional, for easy setup)

### 2. Setup with Docker

```bash
cd examples/fullstack

# Start all services
docker-compose up -d

# Run migrations
npm run db:migrate

# Access the app
# Frontend: http://localhost:3000
# Backend: http://localhost:3001
```

### 3. Setup without Docker

```bash
# Install dependencies
npm install

# Set up database
createdb fullstack_example
npm run db:migrate

# Start backend
npm run dev:backend

# Start frontend (in another terminal)
npm run dev:frontend
```

## Features Demonstrated

### Authentication & Authorization
- User registration and login
- JWT-based authentication
- Role-based access control (RBAC)
- Protected routes
- Session management

### Frontend Features
- React with TypeScript
- State management
- Form validation
- Error boundaries
- Loading states
- Responsive design

### Backend Features
- RESTful API design
- Request validation
- Error handling middleware
- Database transactions
- Query optimization
- API documentation

### Database
- Migrations for schema versioning
- Seed data for development
- Indexes for performance
- Foreign key constraints
- Audit logging

## Governance in Action

### Example: Adding a New Feature

1. **Agent Plans** (Three-pass: Plan)
   ```
   Feature: User profile page
   
   Files to modify:
   - frontend/src/pages/Profile.tsx (new)
   - frontend/src/services/user.service.ts (update)
   - backend/src/routes/users.ts (new endpoint)
   - backend/src/controllers/users.controller.ts (new method)
   
   Boundaries checked:
   - Frontend can call backend API ✓
   - No direct database access from frontend ✓
   - Proper layer separation ✓
   ```

2. **Agent Implements** (Three-pass: Change)
   - Creates files following layer architecture
   - Adds proper validation
   - Includes error handling
   - Writes tests

3. **Agent Verifies** (Three-pass: Verify)
   ```
   Tests: 12 passed
   Boundaries: No violations
   Security: No vulnerabilities
   Performance: Within budgets
   ```

### Security Policies

#### Input Validation Example
```typescript
// backend/src/middleware/validation.ts
import { sanitizeInput } from '@governance-example/utils';

export const validateUserInput = (req, res, next) => {
  const { username, email } = req.body;
  
  // Validate and sanitize
  if (!isValidEmail(email)) {
    return res.status(400).json({ error: 'Invalid email' });
  }
  
  req.body.username = sanitizeInput(username);
  req.body.email = sanitizeInput(email);
  
  next();
};
```

#### SQL Injection Prevention
```typescript
// backend/src/models/user.model.ts
// ✅ CORRECT: Using parameterized queries
const user = await db.query(
  'SELECT * FROM users WHERE email = $1',
  [email]
);

// ❌ WRONG: String concatenation (SQL injection risk)
// const user = await db.query(
//   `SELECT * FROM users WHERE email = '${email}'`
// );
```

### Quality Gates

```yaml
# From .repo/repo.manifest.yaml
budgets:
  frontend:
    bundle_size: 250KB  # gzipped
    initial_load: 2s
    time_to_interactive: 3s
  
  backend:
    api_response: 200ms  # p95
    database_query: 100ms  # p95
  
  tests:
    coverage: 80%
    unit_tests: required
    integration_tests: required
```

## Deployment

### Staging Deployment
```bash
# Run full check suite
npm run check:release

# Deploy to staging
npm run deploy:staging

# Run smoke tests
npm run test:smoke staging
```

### Production Deployment
```bash
# Requires HITL approval
# Create release tag
git tag -a v1.0.0 -m "Release v1.0.0"

# Deploy with waiver (if needed)
npm run deploy:production

# Monitor rollout
npm run monitor:production
```

## Layer Architecture Details

### Frontend Layers

```
UI Components (Presentation)
    ↓ (can use)
Pages (Application)
    ↓ (can use)
Services (Domain)
    ↓ (can use)
API Client (Data)
    ↓ (can use)
Utilities (Platform)
```

### Backend Layers

```
Routes (Application)
    ↓ (can use)
Controllers (Application)
    ↓ (can use)
Services (Domain)
    ↓ (can use)
Models (Data)
    ↓ (can use)
Database (Data)
    ↓ (can use)
Utilities (Platform)
```

## Common Patterns

### Error Handling
```typescript
// Centralized error handling
class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public isOperational: boolean = true
  ) {
    super(message);
  }
}

// Usage
if (!user) {
  throw new AppError(404, 'User not found');
}
```

### API Response Format
```typescript
// Success response
{
  success: true,
  data: { /* payload */ }
}

// Error response
{
  success: false,
  error: {
    message: "Error description",
    code: "ERROR_CODE"
  }
}
```

## Troubleshooting

### Database Connection Issues
Check `DATABASE_URL` environment variable and ensure PostgreSQL is running.

### CORS Errors
Configure CORS in `backend/src/server.ts` to allow frontend origin.

### Bundle Size Exceeds Limit
Use code splitting and lazy loading. Review dependencies.

## Next Steps

1. **Explore the code** - Review frontend and backend structure
2. **Try the features** - Use authentication, create users, etc.
3. **Make changes** - Add a new feature following governance
4. **Run checks** - Verify governance, boundaries, security
5. **Adapt** - Use this as template for your full-stack app

## Related Examples

- [Monorepo Example](../monorepo/) - Package organization
- [Polyrepo Example](../polyrepo/) - Multiple repositories
- [Microservices Example](../microservices/) - Service architecture

---

**Status:** Complete working example  
**Complexity:** High  
**Best For:** Full-stack applications with frontend, backend, and database  
**Time to Setup:** 60 minutes
