# AGENT.md - API Package

## Purpose of this folder
Backend REST API server using Express. Handles business logic, data access, and API endpoints.

## Layer
**Domain/Data Layer**

## What agents may do here
- Create new API endpoints
- Modify existing endpoints
- Implement business logic
- Add data access layer
- Add API tests
- Update middleware
- Configure security
- Add authentication/authorization

## What agents may NOT do
- Import from `@governance-example/ui` (frontend components)
- Import from `@governance-example/web-app` (frontend app)
- Include frontend code in backend
- Expose sensitive data without authorization
- Create circular dependencies

## Allowed imports
- ✅ `@governance-example/utils` - Shared utilities (platform layer)
- ✅ `express` - Web framework
- ✅ Backend libraries (cors, helmet, etc.)
- ✅ Database libraries
- ✅ Authentication libraries
- ✅ Validation libraries

## Forbidden imports
- ❌ `@governance-example/ui` - Frontend components
- ❌ `@governance-example/web-app` - Frontend application
- ❌ `react`, `react-dom` - Frontend libraries

## Examples

### ✅ ALLOWED: Creating API endpoint
```typescript
import express from 'express';
import { isValidEmail } from '@governance-example/utils';

app.post('/api/users', (req, res) => {
  const { email } = req.body;
  
  if (!isValidEmail(email)) {
    return res.status(400).json({ error: 'Invalid email' });
  }
  
  // Save user logic
  res.json({ success: true });
});
```

### ✅ ALLOWED: Using validation utilities
```typescript
import { sanitizeInput } from '@governance-example/utils';

function processUserInput(input: string) {
  return sanitizeInput(input);
}
```

### ❌ FORBIDDEN: Importing frontend code
```typescript
// This violates layer architecture!
import { Button } from '@governance-example/ui';
```

### ❌ FORBIDDEN: Using React in backend
```typescript
// Backend should not use frontend libraries!
import React from 'react';
```

## Required links
- Policy: [/.repo/policy/BOUNDARIES.md](../../.repo/policy/BOUNDARIES.md)
- Architecture: [Layer Model](../../../docs/architecture/LAYER_MODEL.md)
- Security: [/.repo/policy/SECURITY_BASELINE.md](../../.repo/policy/SECURITY_BASELINE.md)
- Principles: P18 (Security by Default), P20 (Defense in Depth)

## Quality Requirements
- All endpoints must have tests
- All endpoints must have error handling
- All inputs must be validated
- All responses must follow API standards
- Authentication required for protected endpoints

## Security Requirements (CRITICAL)
- Validate and sanitize ALL inputs
- Use helmet middleware for security headers
- Implement rate limiting
- Never log sensitive data
- Use parameterized queries (prevent SQL injection)
- Implement proper CORS policies
- Follow OWASP security guidelines

## When in doubt
- Check boundary rules in `/.repo/policy/BOUNDARIES.md`
- Review security baseline in `/.repo/policy/SECURITY_BASELINE.md`
- Create HITL item for security-related questions
- Follow three-pass process (Plan → Change → Verify)
