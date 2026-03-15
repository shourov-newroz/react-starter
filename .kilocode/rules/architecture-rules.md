# Architecture Rules

These rules define the foundational architecture of this React application. AI must follow these patterns when generating, modifying, or reviewing code.

---

## Feature-Based Modular Architecture

- The application uses a **feature-based modular architecture**
- Each feature is self-contained in `src/features/{feature-name}/`

### Feature Module Structure

Every feature module MUST contain the following subdirectories (create if missing):

```
src/features/{feature}/
├── components/       # Feature-specific UI components
│   └── index.ts      # Barrel export
├── config/           # Feature API endpoint and other configuration
│   └── {feature}.config.ts
├── hooks/            # Feature-specific custom hooks
│   └── index.ts      # Barrel export
├── layouts/          # Feature-specific layouts({Feature}Layout.tsx)
├── locales/          # Translation files (en.json, ar.json, ku.json)
├── pages/            # Page-level components (lazy-loaded)
├── routes/           # Route configuration ({feature}.routes.ts)
├── services/         # API services ({feature}.service.ts)
│   └── index.ts      # Barrel export
├── store/            # Zustand store ({feature}.store.ts)
│   └── index.ts      # Barrel export
├── {feature}.types.ts  # Feature type definitions
└── index.ts          # Public API barrel export (MANDATORY)
```

---

## Barrel Exports

- Every feature MUST export its public API via `src/features/{feature}/index.ts`
- Only public APIs are exported — internal implementation details must NOT be exported
- Example from `src/features/auth/index.ts`:

```typescript
// Store exports
export * from './store';

// Hook exports
export * from './hooks';

// Route exports
export { AUTH_LINKS, AUTH_ROUTES } from './routes/auth.routes';
```

---

## Cross-Feature Import Rules

- **NEVER** import directly from another feature's internal modules
- **ALWAYS** import from the feature's barrel export: `@/features/{feature}`
- Example:
  - ✅ `import { useAuth } from '@/features/auth';`
  - ❌ `import { useAuth } from '@/features/auth/hooks/use-auth';`

---

## Shared Code Placement

Code that is reusable across multiple features belongs in these global directories:

| Directory | Purpose |
|---|---|
| `src/components/` | Shared UI components + `ui/` primitives (shadcn/ui) |
| `src/hooks/` | Shared custom hooks |
| `src/lib/` | Utility libraries (error handling, logger, i18n, SWR config) |
| `src/services/` | Global services (API client, Axios instance) |
| `src/types/` | Global type definitions (`api.types.ts`, `error.types.ts`, etc.) |
| `src/config/` | App configuration, env validation, route registry |
| `src/stores/` | Global Zustand stores (shared across features) |

---

## Separation of Concerns

| Layer | Responsibility |
|---|---|
| **Pages** | Compose components, minimal logic, page-level layout |
| **Components** | Presentational UI, accept props, emit events |
| **Hooks** | Business logic, state access, side effects |
| **Services** | API communication, data transformation |
| **Stores** | State management (Zustand) |
| **Types** | TypeScript interfaces, types, enums |

---

## Application Shell

The `src/app/` directory contains only:

- `App.tsx` — Root component with route rendering
- `providers.tsx` — Provider composition wrapper
- `AuthGuard.tsx` — Authenticated route guard
- `UnauthorizedRoute.tsx` — Guest-only route guard

**Do NOT add feature-level code to `src/app/`.**

---

## Configuration Centralization

All configuration MUST live in `src/config/`:

- `env.ts` — Zod-validated environment variables
- `index.ts` — Typed configuration object (`as const`)
- `routes.ts` — Centralized route registry (aggregates feature routes)

**NEVER hardcode configuration values in components or services.**

---

## Lazy Loading

- All page-level components MUST use `React.lazy()` for code splitting
- Route definitions use lazy imports:

```typescript
element: React.lazy(() => import('@/features/auth/pages/LoginPage'))
```

---

## Provider Composition Order

Root providers in `providers.tsx` MUST wrap in this exact order:

```
I18nextProvider → ErrorBoundary → SWRConfig → BrowserRouter → Suspense
```

**Do NOT rearrange or skip providers.**

---

## Skeleton Architecture

The application uses a comprehensive skeleton loading system for async UI states. This ensures consistent, performant loading experiences without layout shifts.

### Global Skeleton Primitive

- Located at `src/components/ui/skeleton.tsx`
- Provides the base `Skeleton` component using `animate-pulse`
- All skeleton variants MUST compose this primitive

### Atomic Skeleton Variants

- Located in `src/components/ui/` alongside the real components
- Each UI primitive has a corresponding `*-skeleton.tsx` file
- Naming convention: `{component}-skeleton.tsx`
- Size variants only (matching the component's size props)

Examples:
- `button-skeleton.tsx` - matches `button.tsx` sizes
- `input-skeleton.tsx` - matches `input.tsx` dimensions
- `card-skeleton.tsx` - includes header, content, footer variants

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

- The `fallback` field in `RouteConfig` accepts a skeleton component
- `App.tsx` uses route-specific fallback or `GenericPageSkeleton` as default
- Every route MUST define a `fallback` for Suspense boundaries
