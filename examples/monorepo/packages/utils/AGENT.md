# AGENT.md - Utils Package

## Purpose of this folder
Shared utilities and helper functions used across all packages. This is the foundation layer with no dependencies on other packages.

## Layer
**Platform Layer** (lowest level)

## What agents may do here
- Create utility functions
- Add helper functions
- Implement common algorithms
- Add validation logic
- Create type definitions
- Add tests for utilities

## What agents may NOT do
- Import from ANY other packages in this monorepo
- Include package-specific logic
- Make HTTP calls
- Access external services
- Create framework-specific code

## Allowed imports
- ✅ Standard JavaScript/TypeScript utilities
- ✅ Node.js built-in modules
- ✅ External NPM packages (with caution)
- ✅ Type definitions

## Forbidden imports
- ❌ `@governance-example/ui` - Violates layer architecture
- ❌ `@governance-example/web-app` - Violates layer architecture
- ❌ `@governance-example/api` - Violates layer architecture
- ❌ ANY framework-specific code (React, Express)

## Examples

### ✅ ALLOWED: Pure utility function
```typescript
export function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}
```

### ✅ ALLOWED: Validation helper
```typescript
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
```

### ✅ ALLOWED: Using Node.js built-ins
```typescript
import { URL } from 'url';

export function parseUrl(urlString: string): URL {
  return new URL(urlString);
}
```

### ❌ FORBIDDEN: Importing other packages
```typescript
// This violates layer architecture!
import { Button } from '@governance-example/ui';
```

### ❌ FORBIDDEN: Framework-specific code
```typescript
// Utilities should be framework-agnostic!
import React from 'react';
export const useCustomHook = () => { /* ... */ };
```

### ❌ FORBIDDEN: Making HTTP calls
```typescript
// Utilities should not make external calls!
import axios from 'axios';
export async function fetchData() {
  return axios.get('/api/data');
}
```

## Required links
- Policy: [/.repo/policy/BOUNDARIES.md](../../.repo/policy/BOUNDARIES.md)
- Architecture: [Layer Model](../../../docs/architecture/LAYER_MODEL.md)
- Principles: P9 (Single Responsibility), P12 (Testability)

## Quality Requirements
- All functions must be pure (no side effects)
- All functions must have TypeScript types
- All functions must have unit tests
- Functions should be small and focused
- No external dependencies unless necessary

## Design Principles for Utils
1. **Pure functions**: No side effects, deterministic output
2. **Framework-agnostic**: Can be used in any JavaScript environment
3. **Well-tested**: 100% test coverage
4. **Type-safe**: Full TypeScript support
5. **Documented**: Clear JSDoc comments

## When in doubt
- Keep it simple and pure
- If it needs framework-specific code, it doesn't belong here
- If it needs to import other packages, it belongs in those packages
- Create HITL item if unclear
- Follow three-pass process (Plan → Change → Verify)
