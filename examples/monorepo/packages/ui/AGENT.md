# AGENT.md - UI Package

## Purpose of this folder
Contains reusable UI components for the application. This is a shared component library used across the web application and potentially other frontend projects.

## Layer
**Presentation Layer**

## What agents may do here
- Create new React components
- Modify existing components
- Add component tests
- Update component documentation
- Add TypeScript types and interfaces
- Refactor component code within boundaries
- Add styling (CSS/CSS-in-JS)

## What agents may NOT do
- Import from `@governance-example/web-app` (application layer)
- Import from `@governance-example/api` (backend layer)
- Make direct API calls
- Access browser APIs beyond React's scope
- Include business logic (belongs in domain layer)
- Create circular dependencies with other packages

## Allowed imports
- ✅ `@governance-example/utils` - Shared utilities (platform layer)
- ✅ `react` - React library
- ✅ Standard TypeScript/JavaScript utilities

## Forbidden imports
- ❌ `@governance-example/web-app` - Violates layer architecture
- ❌ `@governance-example/api` - Violates layer architecture
- ❌ Direct HTTP libraries (axios, fetch wrappers)

## Examples

### ✅ ALLOWED: Creating a new component
```typescript
import React from 'react';
import { sanitizeInput } from '@governance-example/utils';

export const Input: React.FC<InputProps> = ({ value, onChange }) => {
  const safeValue = sanitizeInput(value);
  return <input value={safeValue} onChange={onChange} />;
};
```

### ❌ FORBIDDEN: Importing from web-app
```typescript
// This violates layer architecture!
import { UserContext } from '@governance-example/web-app';
```

### ❌ FORBIDDEN: Making API calls
```typescript
// Components should not make API calls directly!
import axios from 'axios';
const data = await axios.get('/api/users');
```

## Required links
- Policy: [/.repo/policy/BOUNDARIES.md](../../.repo/policy/BOUNDARIES.md)
- Architecture: [Layer Model](../../../docs/architecture/LAYER_MODEL.md)
- Principles: P7 (Separation of Concerns), P12 (Testability)

## Quality Requirements
- All components must have TypeScript types
- All props must be documented
- Each component should have unit tests
- Components should be pure (no side effects)
- Follow React best practices

## When in doubt
- Check boundary rules in `/.repo/policy/BOUNDARIES.md`
- Create HITL item for unclear cases
- Follow three-pass process (Plan → Change → Verify)
