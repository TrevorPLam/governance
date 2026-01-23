# React Starter Kit with Governance

A complete React 18 + TypeScript + Vite application template with built-in governance framework, testing, and CI/CD.

## Quick Start

1. **Run the setup script:**
   ```bash
   ./setup.sh
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Open in browser:** http://localhost:3000

## Features

- ⚛️ React 18 with TypeScript
- ⚡ Vite for lightning-fast HMR
- 🧪 Vitest + React Testing Library
- 📏 ESLint with TypeScript support
- 🎨 CSS Modules ready
- 🏛️ Complete governance framework
- 🔄 CI/CD with GitHub Actions

## Project Structure

```
.
├── src/
│   ├── components/          # React components
│   │   ├── Counter.tsx
│   │   ├── Counter.css
│   │   └── Greeting.tsx
│   ├── __tests__/          # Test files
│   │   └── App.test.tsx
│   ├── App.tsx             # Main App component
│   ├── App.css
│   ├── main.tsx            # Application entry
│   ├── index.css           # Global styles
│   └── setupTests.ts       # Test configuration
├── public/                 # Static assets
├── .repo/                  # Governance framework
├── scripts/                # Build scripts
├── index.html              # HTML template
├── vite.config.ts          # Vite configuration
├── vitest.config.ts        # Vitest configuration
├── tsconfig.json           # TypeScript config
├── .eslintrc.json          # ESLint config
└── package.json            # Dependencies & scripts
```

## Available Scripts

- **`npm run dev`** - Start development server (http://localhost:3000)
- **`npm run build`** - Build for production
- **`npm run preview`** - Preview production build
- **`npm test`** - Run tests once
- **`npm run test:watch`** - Run tests in watch mode
- **`npm run test:coverage`** - Generate coverage report
- **`npm run lint`** - Lint code
- **`npm run lint:fix`** - Auto-fix lint issues
- **`npm run type-check`** - Check TypeScript types
- **`npm run governance:validate`** - Validate governance
- **`npm run governance:verify`** - Full verification

## Component Architecture

### Component Boundaries

This project follows governance-compliant component architecture:

1. **Presentational Components** (src/components/)
   - Pure UI components
   - Accept props, render output
   - No business logic
   - Example: `Greeting.tsx`

2. **Container Components** (src/)
   - Manage state and logic
   - Compose presentational components
   - Handle side effects
   - Example: `App.tsx`

3. **Shared Components**
   - Reusable across features
   - Well-documented interfaces
   - Comprehensive tests

### Creating New Components

```bash
# Create component file
touch src/components/MyComponent.tsx

# Create corresponding styles
touch src/components/MyComponent.css

# Create tests
touch src/__tests__/MyComponent.test.tsx
```

Component template:
```typescript
import React from 'react'
import './MyComponent.css'

interface MyComponentProps {
  title: string
}

const MyComponent: React.FC<MyComponentProps> = ({ title }) => {
  return (
    <div className="my-component">
      <h2>{title}</h2>
    </div>
  )
}

export default MyComponent
```

## Testing Guide

### Running Tests

```bash
# Run all tests
npm test

# Watch mode
npm run test:watch

# With coverage
npm run test:coverage
```

### Writing Tests

```typescript
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import MyComponent from '../components/MyComponent'

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent title="Test" />)
    expect(screen.getByText('Test')).toBeInTheDocument()
  })

  it('handles user interaction', async () => {
    const user = userEvent.setup()
    render(<MyComponent />)
    
    const button = screen.getByRole('button')
    await user.click(button)
    
    // Assert expected behavior
  })
})
```

## Styling

### CSS Modules

```typescript
import styles from './MyComponent.module.css'

const MyComponent = () => (
  <div className={styles.container}>
    <h1 className={styles.title}>Hello</h1>
  </div>
)
```

### Global Styles

Edit `src/index.css` for global styles and CSS variables.

## Governance Compliance

### Repository Manifest

The `.repo/repo.manifest.yaml` defines:
- Project metadata
- Technology stack
- Build commands
- Test commands
- Linting rules

### Documentation

Located in `.repo/docs/`:
- **ADRs** - Architecture Decision Records
- **Standards** - Coding standards
- **API Docs** - Component interfaces

### Component Boundaries

Document component boundaries in `.repo/docs/`:
- Public vs. internal components
- Props interfaces
- State management patterns
- Side effect boundaries

## Build & Deployment

### Production Build

```bash
npm run build
```

Output in `dist/` directory.

### Preview Build

```bash
npm run preview
```

### Deployment

Configure deployment in `.github/workflows/` or your platform:

```yaml
- name: Build
  run: npm run build

- name: Deploy
  run: # Your deployment command
```

## Troubleshooting

### Port Already in Use

Change port in `vite.config.ts`:
```typescript
server: {
  port: 3001
}
```

### TypeScript Errors

```bash
npm run type-check
```

### Test Failures

```bash
# Run specific test
npm test -- App.test.tsx

# Debug mode
npm test -- --reporter=verbose
```

### Build Errors

Clear cache and reinstall:
```bash
rm -rf node_modules dist
npm install
npm run build
```

## Contributing

1. Review `.repo/docs/standards/`
2. Create feature branch
3. Make changes with tests
4. Run `npm run governance:verify`
5. Submit pull request

## License

MIT

---

**Generated from:** React Starter Kit with Governance Framework
