# AGENT.md - Web App Package

## Purpose of this folder
Frontend web application that uses UI components and connects to the API. This is the main user-facing application.

## Layer
**Application Layer**

## What agents may do here
- Create new React components and pages
- Modify existing application code
- Add routing logic
- Implement state management
- Add application-level tests
- Update application configuration
- Integrate UI components
- Call API endpoints

## What agents may NOT do
- Import from `@governance-example/api` backend code (use API calls instead)
- Make direct database calls
- Implement backend logic in frontend
- Bypass security policies
- Create circular dependencies

## Allowed imports
- ✅ `@governance-example/ui` - UI component library (presentation layer)
- ✅ `@governance-example/utils` - Shared utilities (platform layer)
- ✅ `react`, `react-dom` - React libraries
- ✅ HTTP clients (fetch, axios) for API calls
- ✅ State management libraries (Redux, Context API)
- ✅ Routing libraries (react-router)

## Forbidden imports
- ❌ `@governance-example/api` server code - Must use HTTP API instead
- ❌ Direct database libraries
- ❌ Backend-only utilities

## Examples

### ✅ ALLOWED: Using UI components
```typescript
import React from 'react';
import { Button } from '@governance-example/ui';
import { isValidEmail } from '@governance-example/utils';

function LoginForm() {
  const [email, setEmail] = React.useState('');
  return (
    <div>
      <input value={email} onChange={e => setEmail(e.target.value)} />
      <Button label="Login" onClick={() => handleLogin(email)} />
    </div>
  );
}
```

### ✅ ALLOWED: Calling API
```typescript
async function fetchUsers() {
  const response = await fetch('http://localhost:3001/api/users');
  return response.json();
}
```

### ❌ FORBIDDEN: Importing backend code
```typescript
// This violates layer architecture!
import { getUserFromDatabase } from '@governance-example/api';
```

### ❌ FORBIDDEN: Direct database access
```typescript
// Frontend should never access database directly!
import { Pool } from 'pg';
const db = new Pool({ connectionString: '...' });
```

## Required links
- Policy: [/.repo/policy/BOUNDARIES.md](../../.repo/policy/BOUNDARIES.md)
- Architecture: [Layer Model](../../../docs/architecture/LAYER_MODEL.md)
- Principles: P7 (Separation of Concerns), P18 (Security by Default)

## Quality Requirements
- All pages must have tests
- API calls must handle errors
- Loading states must be shown
- Follow accessibility guidelines (WCAG)
- Implement proper error boundaries

## Security Requirements
- Sanitize all user input
- Never expose API keys in frontend
- Implement CSRF protection
- Follow security baseline in `/.repo/policy/SECURITY_BASELINE.md`

## When in doubt
- Check boundary rules in `/.repo/policy/BOUNDARIES.md`
- Create HITL item for unclear cases
- Follow three-pass process (Plan → Change → Verify)
