# Import Structure Rules

These rules define import ordering, path alias usage, and dependency boundaries.

---

## Import Ordering

Imports MUST follow this group order (enforced by ESLint `import/order`):

1. **Built-in / Node modules** (e.g., `path`, `fs`)
2. **External libraries** (e.g., `react`, `zustand`, `axios`, `zod`)
3. **Internal** (`@/` aliased imports)
4. **Parent** (`../`)
5. **Sibling** (`./`)
6. **Index**
7. **Object**

### Rules

- **Alphabetized** within each group (case-insensitive)
- **Blank line** between each import group
- **Auto-fixable** via ESLint `--fix`

### Example

```typescript
// 1. External libraries
import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

// 2. Internal (@/ aliases)
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { LoadingFallback } from '@/components/LoadingFallback';
import { routes } from '@/config/routes';
import { useAuth } from '@/features/auth';
import type { RouteConfig } from '@/types/route.types';

// 3. Parent / Sibling
import AuthGuard from './AuthGuard';
import { Providers } from './providers';
```

---

## Path Aliases

Always use `@/*` path aliases for imports outside the immediate directory.

### Available Aliases

| Alias | Maps To |
|---|---|
| `@/*` | `src/*` |
| `@/app/*` | `src/app/*` |
| `@/features/*` | `src/features/*` |
| `@/components/*` | `src/components/*` |
| `@/hooks/*` | `src/hooks/*` |
| `@/services/*` | `src/services/*` |
| `@/stores/*` | `src/stores/*` |
| `@/lib/*` | `src/lib/*` |
| `@/styles/*` | `src/styles/*` |
| `@/types/*` | `src/types/*` |
| `@/config/*` | `src/config/*` |
| `@/tests/*` | `src/tests/*` |

### Rules

- ✅ Use aliases for any import crossing directory boundaries
- ❌ NEVER use relative paths going up more than one level (`../../`)
- ✅ Relative imports are OK for sibling files (`./`) and one-level parent (`../`)

---

## Type-Only Imports

- Use `import type { X }` for type-only imports
- Enforced by `verbatimModuleSyntax: true` in tsconfig
- Example:

```typescript
import type { RouteConfig } from '@/types/route.types';
import type { ApiResponse } from '@/types/api.types';
import type { BaseStore } from '@/types/store.types';
```

---

## ESLint Import Rules

| Rule | Setting | Description |
|---|---|---|
| `import/order` | `error` | Enforces group ordering and alphabetization |
| `import/no-unresolved` | `error` | Prevents imports that can't be resolved |
| `import/no-duplicates` | `error` | Prevents duplicate imports from same module |
| `import/extensions` | `error` | No `.ts`/`.tsx` extensions in imports |

---

## Dependency Boundaries

### Features Can Import From

- ✅ `@/components/*` — Shared components
- ✅ `@/hooks/*` — Shared hooks
- ✅ `@/lib/*` — Utility libraries
- ✅ `@/services/*` — Global services
- ✅ `@/types/*` — Global types
- ✅ `@/config/*` — Configuration
- ✅ Other features' **barrel exports only** (`@/features/{feature}`)

### Features Must NOT Import From

- ❌ Another feature's internal modules (`@/features/{feature}/hooks/...`)
- ❌ `src/app/` internals (except via established patterns)
- ❌ `src/tests/` in production code

### Shared Code Must NOT Import From

- ❌ `src/lib/`, `src/services/`, `src/types/` must NEVER import from feature modules
- This maintains the dependency direction: features depend on shared code, never the reverse

---

## Circular Dependency Prevention

- AI must verify no circular import chains are introduced
- Follow the dependency direction: `features → shared → types`
- If a circular dependency is detected, refactor by extracting shared logic to `src/lib/` or `src/types/`
