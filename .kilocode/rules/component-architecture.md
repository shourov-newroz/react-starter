# Component Architecture Rules

These rules define how React components must be built in this project.

---

## Component Hierarchy

```
Pages → Feature Components → Shared Components → UI Primitives (shadcn/ui)
```

| Layer | Location | Description |
|---|---|---|
| Pages | `src/features/{feature}/pages/` | Page-level components, lazy-loaded |
| Feature Components | `src/features/{feature}/components/` | Feature-specific UI |
| Shared Components | `src/components/` | Cross-feature reusable components |
| UI Primitives | `src/components/ui/` | shadcn/ui primitives (Button, Card, Input, Label) |

---

## shadcn/ui Usage

- UI primitives live in `src/components/ui/` — currently: `button.tsx`, `card.tsx`, `input.tsx`, `label.tsx`
- Built with: **Radix UI** + **Class Variance Authority (CVA)** + **TailwindCSS** + `cn()` utility
- AI must **ALWAYS reuse existing UI primitives** — never create competing components
- To add new shadcn/ui components: follow the existing CVA + Radix pattern in `src/components/ui/`

---

## Props Typing

- All component props MUST be defined as TypeScript interfaces
- Use `interface` (not `type`) for prop definitions
- Example:

```typescript
interface ProvidersProps {
  children: ReactNode;
}

interface PrivateRouteGuardProps {
  children: ReactNode;
}
```

---

## Return Type Annotations

- Components MUST specify return type: `ReactElement`, `ReactNode`, or `React.ReactElement`
- ESLint enforces `@typescript-eslint/explicit-function-return-type: warn` (relaxed for `.tsx`)
- Examples from codebase:

```typescript
export function LoginForm(): ReactElement { ... }
export function PrivateRouteGuard({ children }: PrivateRouteGuardProps): ReactNode { ... }
function LoginPage(): React.ReactElement { ... }
```

---

## Component File Layout

Files MUST follow this order:

1. **Imports** (ordered per import-structure-rules)
2. **Type / Interface definitions** (props, local types)
3. **Component function** (named export preferred: `export function ComponentName()`)
4. **Default export** (only when needed for `React.lazy()` loading)

Example:

```typescript
// 1. Imports
import { useState, type ReactElement } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '../hooks/use-auth';

// 2. Types
// (props interface if needed)

// 3. Component
export function LoginForm(): ReactElement {
  // ...
}

// 4. Default export (for lazy loading)
export default LoginForm;
```

---

## Composition Patterns

- Use **React composition** (children, render props, compound components) — not inheritance
- **Never use class components** except for `ErrorBoundary` (React requires it for `getDerivedStateFromError`)
- Use `<Suspense>` wrappers with route-specific skeleton fallback for async boundaries
- Wrap pages in `<ErrorBoundary>` for error containment

---

## Feature Isolation

- Components within a feature may import from:
  - ✅ Same feature's internal modules (`../hooks`, `../store`)
  - ✅ Shared modules (`@/components/`, `@/lib/`, `@/hooks/`)
- Components must NEVER import from:
  - ❌ Another feature's internal modules
  - ❌ Always use barrel exports: `@/features/{feature}`

---

## Internationalization (i18n)

- **ALL user-facing strings** must use translation hooks — never hardcode text
- Enforced by ESLint: `i18next/no-literal-string: error`
- Each feature has its own translation hook:
  - `useAuthT()` for auth feature
  - `useCommonT()` for shared/common translations
- Pattern:

```typescript
const t = useAuthT();
return <CardTitle>{t('Login')}</CardTitle>;
```

---

## Error Handling in Components

- Every page route is wrapped in `<ErrorBoundary>` and `<Suspense>` in `App.tsx`
- Components must handle error states from hooks (e.g., display `error` from `useAuth()`)
- Use `role="alert"` for error messages for accessibility:

```tsx
{error && <p className="text-sm text-destructive" role="alert">{error}</p>}
```

---

## Skeleton Companion Components

- Every atomic UI component must have a `*Skeleton` companion in the same directory (`src/components/ui/`)
- Skeleton variants use size props only (no color props)
- All skeletons must compose the `Skeleton` primitive from `@/components/ui/skeleton`
- Skeleton root elements must use `overflow-hidden` to prevent scrolling

---

## Accessibility (jsx-a11y)

AI must follow these accessibility rules (ESLint enforced):

- `alt-text`: All images must have alt text
- `anchor-has-content`: All links must have text content
- `click-events-have-key-events`: Clickable elements must have keyboard handlers
- `no-noninteractive-element-interactions`: Non-interactive elements should not have click handlers
