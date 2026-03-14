# Architecture Documentation

This document provides a detailed overview of the architecture and design decisions for this enterprise React frontend starter.

## Table of Contents

1. [High-Level Architecture](#high-level-architecture)
2. [Folder Structure](#folder-structure)
3. [State Management](#state-management)
4. [Data Layer](#data-layer)
5. [Component Architecture](#component-architecture)
6. [Error Handling](#error-handling)
7. [Skeleton Loading Architecture](#skeleton-loading-architecture)
8. [Performance Considerations](#performance-considerations)
9. [Security](#security)

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
    ├── config/            # Feature API endpoint and other configuration
    │   └── auth.config.ts
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

## API Endpoint Configuration

### Centralized API Endpoints

All API endpoints MUST be centralized in feature configuration files. This ensures:

- **Single source of truth** for all API URLs
- **Easy maintenance** - change endpoint in one place
- **Consistency** across all features
- **Type safety** with TypeScript

### Creating API Endpoint Configuration

Create a `{feature}.config.ts` file in each feature's config directory:

```typescript
// src/features/auth/config/auth.config.ts

/**
 * Auth Feature API Endpoints Configuration
 * Centralizes all API endpoint URLs for the auth feature
 */

export const AUTH_API_ENDPOINTS = {
  LOGIN: '/auth/login',
  // Dynamic endpoints
  GET_USER: (id: string) => `/auth/users/${id}`,
  GET_WITH_QUERY: (query: string) => `/auth/search?${query}`,
} as const;
```

### Using Endpoint Configuration in Services

Import and use the centralized endpoints in your service layer:

```typescript
import { DASHBOARD_API_ENDPOINTS } from '../config/dashboard.config';

const { data, error, isLoading, mutate } = useSWR<ProfileResponse>(
  DASHBOARD_API_ENDPOINTS.USER_PROFILE
);
```

### ❌ Never Hardcode URLs

```typescript
// ❌ FORBIDDEN — Hardcoded URL
const { data } = useSWR('/api/users/me');

// ✅ CORRECT — Use centralized configuration
const { data } = useSWR(DASHBOARD_API_ENDPOINTS.USER_PROFILE);
```

### Existing API Configurations

| Feature   | Config File                                                                                              | Endpoints                                        |
| --------- | -------------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| Auth      | [`src/features/auth/config/auth.config.ts`](src/features/auth/config/auth.config.ts)                     | LOGIN, REGISTER, LOGOUT, GET_CURRENT_USER, etc.  |
| Dashboard | [`src/features/dashboard/config/dashboard.config.ts`](src/features/dashboard/config/dashboard.config.ts) | USER_PROFILE, DASHBOARD_STATS, RECENT_ACTIVITIES |

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

## Routing System

### Centralized Route Configuration

Routes are defined in a centralized configuration file `src/config/routes.ts` using the `RouteConfig` interface:

```typescript
type AuthRequirement = 'public' | 'guest' | 'authenticated';

export interface RouteConfig {
  path?: string;
  element?: React.ComponentType | React.ReactNode;
  isLayout?: boolean;
  name?: string;
  children?: RouteConfig[];
  index?: boolean;
  auth: AuthRequirement;
}
```

This approach provides:

- Centralized route management
- Type safety for route definitions
- Support for nested routes and layouts
- Easy addition of new routes
- Consistent route structure across features
- Clear authentication requirements per route

### Feature-Based Routing

Each feature maintains its own route definitions in dedicated route files:

- `src/features/auth/routes/auth.routes.ts`
- `src/features/dashboard/routes/dashboard.routes.ts`
- `src/features/demo/routes/demo.routes.ts`

Routes are exported as arrays and imported into the central configuration:

```typescript
export const routes: RouteConfig[] = [...AUTH_ROUTES, ...DASHBOARD_ROUTES, ...DEMO_ROUTES];
```

### Path Constants Convention

All route paths are defined as uppercase constants in the route files:

```typescript
export const AUTH_LINKS = {
  LOGIN: '/login',
};

export const DASHBOARD_LINKS = {
  DASHBOARD: '/',
  PROFILE: '/profile',
};
```

This ensures consistency and makes it easy to reference paths throughout the application.

### Lazy Loading Standards

All route components use React.lazy for code splitting:

```typescript
element: React.lazy(() => import('../pages/DashboardPage'));
```

- Use named imports for consistency
- All lazy-loaded routes are wrapped in Suspense with LoadingFallback
- Code splitting is verified through bundle analysis

### Route Guards

Routes are protected using authentication-based rendering in `App.tsx`:

- `'public'`: Routes accessible to all users with no authentication checks
- `'guest'`: Routes only accessible to unauthenticated users (redirects authenticated users)
- `'authenticated'`: Routes requiring user authentication (redirects to login if not authenticated)
- Automatic redirection handled by `AuthGuard` and `UnauthorizedRoute` components

### Error Boundaries in Routes

All route elements are wrapped with ErrorBoundary components for graceful error handling:

```typescript
<Suspense fallback={<LoadingFallback />}>
  <ErrorBoundary>
    {element}
  </ErrorBoundary>
</Suspense>
```

This ensures that route-level errors don't crash the entire application and provide user-friendly error messages.

### Route Rendering

Routes are rendered in `App.tsx` using React Router v6 with nested route support:

```typescript
const renderRouteElement = (route: RouteConfig): React.ReactNode => {
  // Authentication-based element wrapping
  // ...
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ErrorBoundary>{element}</ErrorBoundary>
    </Suspense>
  );
};
```

This supports complex nested routing, automatic code splitting, and consistent error handling.

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

## Skeleton Loading Architecture

This project uses a comprehensive skeleton loading system for async UI states, ensuring consistent, performant loading experiences without layout shifts.

### Global Skeleton Primitive

- Located at `src/components/ui/skeleton.tsx`
- Provides the base `Skeleton` component using `animate-pulse`
- All skeleton variants MUST compose this primitive

### Atomic Skeleton Variants

Located in `src/components/ui/` alongside the real components:

- `button-skeleton.tsx` - matches `button.tsx` sizes
- `input-skeleton.tsx` - matches `input.tsx` dimensions
- `card-skeleton.tsx` - includes header, content, footer variants
- `label-skeleton.tsx` - matches label dimensions

Each skeleton follows size-only props pattern (no color variants).

### Layout Skeletons

- Located in `src/features/{feature}/layouts/`
- Naming: `{Feature}LayoutSkeleton.tsx`
- Mirrors the real layout structure exactly
- Root element MUST use `overflow-hidden` (no scrolling)

### Page Skeletons

- Located in `src/features/{feature}/pages/`
- Naming: `{Page}Skeleton.tsx`
- Each page component MUST have a skeleton companion
- Root element MUST use `overflow-hidden` (no scrolling)

### Route Fallback Integration

The `fallback` field in `RouteConfig` accepts a skeleton component:

```typescript
export const DASHBOARD_ROUTES: RouteConfig[] = [
  {
    element: DashboardLayout,
    isLayout: true,
    path: '/',
    auth: 'authenticated',
    fallback: DashboardLayoutSkeleton,
    children: [
      {
        index: true,
        element: React.lazy(() => import('../pages/DashboardPage')),
        name: 'Dashboard',
        auth: 'authenticated',
        fallback: DashboardPageSkeleton,
      },
    ],
  },
];
```

`App.tsx` uses route-specific fallback or `GenericPageSkeleton` as default for Suspense boundaries.

### Generic Page Skeleton

For routes without a specific skeleton, use `GenericPageSkeleton` from `@/components/ui/generic-page-skeleton`.

### Skeleton Best Practices

1. All async UI must use named skeleton components (not spinners or raw animate-pulse)
2. Every page must have a `*Skeleton` companion
3. Every layout must have a `*LayoutSkeleton` companion
4. Skeleton root containers must use `overflow-hidden`
5. Always compose the `Skeleton` primitive — never use raw `animate-pulse`

---

## Performance Considerations

### Code Splitting

Routes are automatically code-split using React.lazy:

```typescript
element: React.lazy(() => import('../pages/DashboardPage'));
```

- All route components are lazy-loaded for optimal bundle sizes
- Bundle analyzer confirms separate chunks for each feature
- Vendor libraries are split into dedicated chunks (react-vendor, ui-vendor, etc.)

````

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

## Localization Architecture

This project uses a **hybrid localization architecture** that combines feature-based (decentralized) and centralized approaches.

### Namespace Configuration

The project defines namespaces in [`src/lib/i18n/locales.ts`](src/lib/i18n/locales.ts). Each namespace maps to a translation file and has an owner:

| Namespace | Location | Owner | Type |
| --------- | -------- | ----- | ---- |
| `auth` | `src/features/auth/locales/{lang}.json` | Auth Feature Team | Feature |
| `dashboard` | `src/features/dashboard/locales/{lang}.json` | Dashboard Feature Team | Feature |
| `common` | `src/lib/i18n/locales/{lang}/common.json` | Core/Platform Team | Shared |
| `navigation` | `src/lib/i18n/locales/{lang}/navigation.json` | Core/Platform Team | Shared |
| `language` | `src/lib/i18n/locales/{lang}/language.json` | Core/Platform Team | Shared |

### Ownership Decision Matrix

Use this matrix to determine which namespace to use for new translation keys:

| String Type | Namespace | Location | Owner |
| ------------ | --------- | -------- | ----- |
| Feature-specific UI labels (login form, dashboard widgets) | `auth`, `dashboard`, etc. | `src/features/{feature}/locales/` | Feature team |
| Error messages | `common` | `src/lib/i18n/locales/` | Core/Platform team |
| Navigation items | `navigation` | `src/lib/i18n/locales/` | Core/Platform team |
| Button text, form labels (reused across features) | `common` | `src/lib/i18n/locales/` | Core/Platform team |
| Validation messages | `common` | `src/lib/i18n/locales/` | Core/Platform team |
| Language selector UI | `language` | `src/lib/i18n/locales/` | Core/Platform team |

### Translation Hooks

Import translation hooks from the central i18n module:

```typescript
// For feature-specific translations
import { useAuthT, useDashboardT } from '@/lib/i18n';

// For shared/common translations
import { useCommonT, useNavigationT, useLanguageT } from '@/lib/i18n';

// For any namespace (with namespace prefix)
import { useT } from '@/lib/i18n';

// Usage with namespace prefix
const t = useT();
t('auth:Login');           // auth namespace
t('dashboard:welcome');    // dashboard namespace
t('common:Loading');       // common namespace
```

### Import Convention

**Always import translation hooks from `@/lib/i18n`** - the central module that re-exports all feature and shared hooks. This ensures:

- Consistent import patterns across the codebase
- Single source of truth for hook definitions
- Easy refactoring when moving between features

### Adding New Feature Translations

1. Create `src/features/{feature-name}/locales/` directory
2. Add translation JSON files: `en.json`, `ar.json`, `ku.json`
3. Namespace add manually to `NAMESPACE_CONFIG`
4. Import using: `import { use{Feature}T } from '@/features/{Feature}'`

### Anti-Patterns to Avoid

- ❌ Duplicating shared strings in feature namespaces
- ❌ Adding feature-specific strings to central locale files
- ❌ Using hardcoded strings instead of translation keys
- ❌ Mixing namespace usage within a single component inconsistently
- ❌ Importing from feature directories instead of `@/lib/i18n`

### Quick Reference Card

| Scenario | Use This Namespace | Import From |
| -------- | ------------------ | ------------ |
| Login form UI | `auth` | `@/features/auth` |
| Registration form | `auth` | `@/features/auth` |
| Dashboard widgets | `dashboard` | `@/features/dashboard` |
| Profile page | `dashboard` | `@/features/profile` |
| Navigation menu items | `navigation` | `@/lib/i18n` |
| Language selector | `language` | `@/lib/i18n` |
| Generic button text | `common` | `@/lib/i18n` |
| Error messages | `common` | `@/lib/i18n` |
| Validation messages | `common` | `@/lib/i18n` |
| Loading states | `common` | `@/lib/i18n` |

**Quick Decision Tree:**

```
Is this string used in multiple features?
├── YES → Use `common`, `navigation`, or `language`
└── NO → Is it specific to a feature?
    ├── YES → Use feature namespace (auth, dashboard)
    └── NO → Use `common`
```

**Import Pattern:**

```typescript
// ✅ CORRECT - Import from central module
import { useAuthT, useDashboardT, useCommonT } from '@/lib/i18n';

// ❌ WRONG - Import from feature directories
import { useAuthT } from '@/features/auth/hooks/useTranslation';
```

### RTL Support

The project supports RTL languages (Arabic and Kurdish). When adding new translations:

- Ensure text content flows correctly in RTL mode
- Test UI components in both LTR and RTL modes
- Use CSS logical properties (`margin-inline-start`(ms-1) instead of `margin-left`(ml-1))

---

## Development Workflow

### Code Quality

This project enforces strict code quality standards through pre-commit checks. All checks must pass before code can be committed:

1. **TypeScript Type Checking**: Validates type safety across the entire codebase

   ```bash
   npx tsc --noEmit
````

1. **ESLint**: Enforces code quality rules and best practices

   ```bash
   npx eslint . --ext ts,tsx
   ```

2. **Prettier**: Ensures consistent code formatting

   ```bash
   npx prettier --check "src/**/*.{ts,tsx,json,css,md}"
   ```

3. **Vitest**: Runs the full test suite

   ```bash
   npx vitest run
   ```

4. **commitlint**: Enforces Conventional Commit message format

   ```bash
   npx commitlint --edit $1
   ```

#### Pre-Commit Checks Flow

```mermaid
flowchart TD
    A[Git Commit] --> B[Run TypeScript Type Check]
    B --> C{Type Check Pass?}
    C -->|No| D[Exit with Error]
    C -->|Yes| E[Run ESLint]
    E --> F{Linting Pass?}
    F -->|No| D
    F -->|Yes| G[Check Prettier Formatting]
    G --> H{Formatting Pass?}
    H -->|No| D
    H -->|Yes| I[Run Tests]
    I --> J{Tests Pass?
    J -->|No| D
    J -->|Yes| K[Commit Accepted]
```

### Testing Strategy

1. **Unit Tests**: Individual functions and hooks
2. **Component Tests**: React components with Testing Library
3. **Integration Tests**: Feature-level workflows
4. **E2E Tests**: (Not included, recommend Cypress/Playwright)

### CI/CD Pipeline

The CI/CD pipeline runs the same quality checks as the pre-commit hooks to ensure consistency across local and remote environments:

```yaml
# CI pipeline stages - mirrors pre-commit checks
1. Install dependencies
2. Run TypeScript type checking
3. Run linting
4. Check formatting
5. Run tests
6. Build production bundle
7. (Optional) Deploy
```

> **Note**: The CI pipeline enforces the same checks as `.husky/pre-commit` to prevent any commits that would fail the pre-commit hooks from reaching the repository.
