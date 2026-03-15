# Naming Conventions

These rules define strict naming conventions for all code entities. AI must follow these patterns exactly.

---

## Entity Naming Rules

| Entity | Convention | Example |
|---|---|---|
| React components | `PascalCase` | `LoginForm`, `ErrorBoundary`, `PrivateRouteGuard` |
| Custom hooks | `useCamelCase` | `useAuth`, `useAuthT`, `useAuthTranslation` |
| Variables | `camelCase` | `renderRouteElement`, `isAuthenticated` |
| Functions | `camelCase` | `normalizeError`, `mapStatusToErrorType` |
| Constants | `UPPER_SNAKE_CASE` | `AUTH_LINKS`, `DASHBOARD_ROUTES`, `NAMESPACES` |
| Types | `PascalCase` | `RouteConfig`, `ApiResponse`, `AuthState` |
| Interfaces | `PascalCase` (no `I` prefix) | `LoginCredentials`, `BaseStore`, `AppError` |
| Enums | `PascalCase` (values: `UPPER_SNAKE_CASE`) | `ErrorType.NETWORK`, `ErrorType.AUTH` |
| Environment variables | `VITE_UPPER_SNAKE_CASE` | `VITE_API_BASE_URL`, `VITE_APP_ENV` |

---

## File Naming Rules

| File Type | Convention | Example |
|---|---|---|
| Components (`.tsx`) | `PascalCase` | `LoginForm.tsx`, `ErrorBoundary.tsx` |
| Hooks | `useCamelCase` | `useAuth.ts`, `useTranslation.ts` |
| Services | `{feature}.service.ts` | `auth.service.ts` |
| Stores | `{feature}.store.ts` | `auth.store.ts` |
| Types | `{name}.types.ts` | `api.types.ts`, `auth.types.ts`, `route.types.ts` |
| Routes | `{feature}.routes.ts` | `auth.routes.ts`, `dashboard.routes.ts` |
| Tests | `{name}.test.ts` or `{name}.test.tsx` | `auth.store.test.ts`, `ErrorBoundary.test.tsx` |
| Utilities | `kebab-case` | `api-client.ts`, `swr-config.ts` |
| Config | `kebab-case` | `env.ts`, `index.ts` |
| Barrel exports | `index.ts` | always `index.ts` |

---

## Directory Naming

- All directories use **`kebab-case`** (lowercase with hyphens)
- Examples: `auth`, `dashboard`, `error-handling`, `ui`
- Feature directories match the feature name exactly

---

## Selector Naming

- Store selectors are exported as a `const` object named `{feature}Selectors`
- Example: `authSelectors`

```typescript
export const authSelectors = {
  user: (state: AuthState) => state.user,
  isAuthenticated: (state: AuthState) => state.isAuthenticated,
  isLoading: (state: AuthState) => state.isLoading,
  error: (state: AuthState) => state.error,
} as const;
```

---

## Route Constants

- Route link objects use `UPPER_SNAKE_CASE` with `_LINKS` suffix: `AUTH_LINKS`, `DASHBOARD_LINKS`
- Route config arrays use `UPPER_SNAKE_CASE` with `_ROUTES` suffix: `AUTH_ROUTES`, `DASHBOARD_ROUTES`

---

## Prohibitions

AI must NEVER:

- Use abbreviations in names (e.g., `btn` instead of `button`, `msg` instead of `message`)
- Use Hungarian notation (e.g., `strName`, `boolIsActive`)
- Prefix interfaces with `I` (e.g., ❌ `IUser` → ✅ `User`)
- Use the `any` type — enforced by ESLint `@typescript-eslint/no-explicit-any: error`
- Use ambiguous or generic names (e.g., `data`, `info`, `temp`, `handler`)
