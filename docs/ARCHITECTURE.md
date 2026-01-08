# Architecture Documentation

This document provides a detailed overview of the architecture and design decisions for this enterprise React frontend starter.

## Table of Contents

1. [High-Level Architecture](#high-level-architecture)
2. [Folder Structure](#folder-structure)
3. [State Management](#state-management)
4. [Data Layer](#data-layer)
5. [Component Architecture](#component-architecture)
6. [Error Handling](#error-handling)
7. [Performance Considerations](#performance-considerations)
8. [Security](#security)

---

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         Presentation Layer                       │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐  │
│  │   Pages     │  │ Components  │  │     Feature Modules     │  │
│  └──────┬──────┘  └──────┬──────┘  └───────────┬─────────────┘  │
│         │                │                      │                │
│         └────────────────┼──────────────────────┘                │
│                          │                                       │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │                    Application Layer                         ││
│  │  ┌───────────┐  ┌───────────┐  ┌─────────────────────────┐  ││
│  │  │  Hooks    │  │  Stores   │  │     Providers           │  ││
│  │  └─────┬─────┘  └─────┬─────┘  └───────────┬─────────────┘  ││
│  │        │              │                      │                ││
│  └────────┼──────────────┼──────────────────────┘                ││
│           │              │                                       │
│  ┌────────┴──────────────┴─────────────────────────────────────┐│
│  │                        Data Layer                            ││
│  │  ┌───────────┐  ┌───────────┐  ┌─────────────────────────┐  ││
│  │  │    SWR    │  │   Axios   │  │     Services            │  ││
│  │  └─────┬─────┘  └─────┬─────┘  └───────────┬─────────────┘  ││
│  │        │              │                      │                ││
│  └────────┴──────────────┴──────────────────────┘                ││
│                          │                                       │
│  ┌───────────────────────┴─────────────────────────────────────┐│
│  │                   Infrastructure Layer                       ││
│  │  ┌───────────┐  ┌───────────┐  ┌─────────────────────────┐  ││
│  │  │  Config   │  │   Types   │  │     Utilities           │  ││
│  │  └───────────┘  └───────────┘  └─────────────────────────┘  ││
│  └─────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────┘
```

---

## Folder Structure

### Feature-Based Architecture

This project uses a feature-based architecture where each feature is self-contained with its own components, hooks, services, and store.

```
src/features/
└── auth/
    ├── components/        # Feature-specific components
    │   ├── LoginForm.tsx
    │   └── index.ts
    ├── hooks/             # Feature-specific hooks
    │   ├── use-auth.ts
    │   └── index.ts
    ├── pages/             # Feature pages/routes
    │   └── LoginPage.tsx
    ├── services/          # API services for the feature
    │   ├── auth.service.ts
    │   └── index.ts
    ├── store/             # Feature state management
    │   ├── auth.store.ts
    │   └── index.ts
    ├── auth.types.ts      # Feature-specific types
    └── index.ts           # Public API exports
```

### Shared Components

Components that are used across multiple features live in the shared components directory:

```
src/components/
├── ui/                    # shadcn/ui base components
│   ├── button.tsx
│   ├── input.tsx
│   └── ...
├── ErrorBoundary.tsx      # Global error boundary
└── Loading.tsx            # Global loading component
```

---

## State Management

### Zustand Store Pattern

We use Zustand for state management with the following patterns:

1. **Feature-Scoped Stores**: Each feature has its own store
2. **Typed Selectors**: Selectors are typed for autocomplete
3. **Persistence**: Stores can persist to localStorage
4. **DevTools**: Stores integrate with Redux DevTools

```typescript
// Example store structure
interface AuthState extends BaseStore {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  clearUser: () => void;
}

// Typed selectors
export const authSelectors = {
  user: (state: AuthState) => state.user,
  isAuthenticated: (state: AuthState) => state.isAuthenticated,
};
```

### Store Best Practices

- Keep stores flat and normalized
- Use actions for all state updates
- Include a `_reset` method for testing
- Use `devtools` middleware in development
- Use `persist` middleware for localStorage

---

## Data Layer

### Axios Configuration

The axios instance is configured with:

1. **Base URL**: From environment config
2. **Timeout**: Configurable timeout
3. **Content-Type**: JSON by default
4. **Request Interceptor**: Adds auth token and request ID
5. **Response Interceptor**: Normalizes errors

```typescript
// Request interceptor
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  config.headers['X-Request-ID'] = crypto.randomUUID();
  return config;
});
```

### SWR Configuration

SWR is configured globally with:

- `revalidateOnFocus: false` - Disable focus revalidation
- `dedupingInterval: 2000` - Deduplicate requests
- `errorRetryCount: 3` - Retry failed requests
- Global error handler

---

## Component Architecture

### Component Categories

1. **Pages**: Route-level components
2. **Features**: Feature-specific components
3. **UI**: Reusable base components (shadcn/ui)
4. **Layout**: Layout wrapper components

### Component Patterns

```typescript
// Functional component with proper typing
function LoginForm(): React.ReactElement {
  const { login, isLoading } = useAuth();

  return (
    <form onSubmit={handleSubmit}>
      <Input label="Email" {...register('email')} />
      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Logging in...' : 'Login'}
      </Button>
    </form>
  );
}
```

### Error Boundaries

Error boundaries catch JavaScript errors anywhere in the component tree:

```typescript
<ErrorBoundary fallback={<ErrorPage />}>
  <AppRoutes />
</ErrorBoundary>
```

---

## Error Handling

### Error Types

- **Network Errors**: API connectivity issues
- **Validation Errors**: Invalid input data
- **Auth Errors**: Authentication/authorization failures
- **Server Errors**: Backend errors
- **Unknown Errors**: Unexpected errors

### Error Flow

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Error     │───▶│   Logger    │───▶│  Monitoring │
│   Occurs    │    │   Utility   │    │   Service   │
└─────────────┘    └─────────────┘    └─────────────┘
                        │
                        ▼
               ┌─────────────┐
               │   Error     │
               │  Boundary   │
               └─────────────┘
                        │
                        ▼
               ┌─────────────┐
               │  User       │
               │  Feedback   │
               └─────────────┘
```

---

## Performance Considerations

### Code Splitting

Routes are automatically code-split using React.lazy:

```typescript
const LoginPage = lazy(() =>
  import('@/features/auth/pages/LoginPage').then((module) => ({
    default: module.LoginPage,
  }))
);
```

### Bundle Optimization

Vendor libraries are chunked into separate files:

- `react-vendor.js`: React, ReactDOM, React Router
- `ui-vendor.js`: Zustand, SWR, Axios, utility libraries
- `radix-ui.js`: Radix UI components

### Performance Best Practices

1. Use typed selectors to prevent re-renders
2. Memoize expensive computations with useMemo
3. Use useCallback for event handlers
4. Lazy load non-critical components
5. Monitor bundle size with bundle analyzer

---

## Security

### Authentication

- Tokens stored in localStorage (can be moved to HttpOnly cookies)
- Authorization header added to API requests
- Session expiration handled by the store

### Environment Variables

- All environment variables are validated at runtime
- Sensitive variables are prefixed with `VITE_`
- Build-time validation prevents missing variables

### API Security

- Request tracing with X-Request-ID
- Error normalization prevents leaking sensitive data
- CORS configured on the backend

---

## Development Workflow

### Code Quality

1. **ESLint**: Enforces code quality rules
2. **Prettier**: Ensures consistent formatting
3. **Husky**: Runs pre-commit checks
4. **commitlint**: Enforces commit message format

### Testing Strategy

1. **Unit Tests**: Individual functions and hooks
2. **Component Tests**: React components with Testing Library
3. **Integration Tests**: Feature-level workflows
4. **E2E Tests**: (Not included, recommend Cypress/Playwright)

### CI/CD Pipeline

```yaml
# Typical CI pipeline stages
1. Install dependencies
2. Run linting
3. Run formatting check
4. Run tests
5. Build production bundle
6. (Optional) Deploy
```
