# Skeleton Loading Rules

These rules define the skeleton loading system architecture for the Travluence project. All skeleton components must follow these guidelines to ensure consistent, performant loading experiences.

---

## Core Principles

### Skeleton Required for Async UI

Every SWR `isLoading` branch MUST render a named skeleton component, NOT a spinner or raw `animate-pulse` div.

```typescript
// ✅ CORRECT — Use named skeleton component
if (isLoading) {
  return <ProfilePageSkeleton />;
}

// ❌ FORBIDDEN — Spinner for async data loading
if (isLoading) {
  return <LoadingSpinner />;
}

// ❌ FORBIDDEN — Raw animate-pulse div
if (isLoading) {
  return <div className="animate-pulse">...</div>;
}
```

### Skeleton Required for Pages

Every page component in `src/features/*/pages/` MUST have a `*Skeleton` companion in the same directory.

- `DashboardPage.tsx` → `DashboardPageSkeleton.tsx`
- `ProfilePage.tsx` → `ProfilePageSkeleton.tsx`
- `LoginPage.tsx` → `LoginPageSkeleton.tsx`

### Skeleton Required for Layouts

Every layout in `src/features/*/layouts/` MUST have a `*Skeleton` companion in the same directory.

- `DashboardLayout.tsx` → `DashboardLayoutSkeleton.tsx`

### Skeleton Required for Atomic Components

Every component in `src/components/ui/` MUST have a `*Skeleton` companion in the same directory and use corresponding skeleton component of UI components in skeleton pages and layouts.

- `button.tsx` → `button-skeleton.tsx`
- `input.tsx` → `input-skeleton.tsx`
- `label.tsx` → `label-skeleton.tsx`
- `card.tsx` → `card-skeleton.tsx`

---

## Skeleton Component Standards

### Size Variants Only

Skeleton props MUST use `size` (matching the component's size variants); color variants MUST NOT create separate skeleton variants.

```typescript
// ✅ CORRECT — Size-based skeleton variants
interface ButtonSkeletonProps {
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

// ❌ FORBIDDEN — Color-based skeleton variants
interface ButtonSkeletonProps {
  variant?: 'primary' | 'secondary' | 'destructive';
}
```

### Skeleton Layouts Must Not Scroll

Root element of every skeleton MUST use `overflow-hidden`; never `overflow-y-auto` or `overflow-y-scroll`.

```typescript
// ✅ CORRECT — Non-scrollable skeleton
export function DashboardPageSkeleton(): React.ReactElement {
  return (
    <div className="p-8 overflow-hidden">
      {/* skeleton content */}
    </div>
  );
}

// ❌ FORBIDDEN — Scrollable skeleton
export function DashboardPageSkeleton(): React.ReactElement {
  return (
    <div className="p-8 overflow-y-auto">
      {/* skeleton content */}
    </div>
  );
}
```

### Use Base Primitive

All skeletons MUST compose `Skeleton` from `@/components/ui/skeleton` — no new skeleton libraries.

```typescript
// ✅ CORRECT — Compose Skeleton primitive
import { Skeleton } from '@/components/ui/skeleton';

export function ButtonSkeleton({ size = 'default' }: ButtonSkeletonProps): React.ReactElement {
  return <Skeleton className={sizeClasses[size]} />;
}

// ❌ FORBIDDEN — Custom skeleton implementation
export function ButtonSkeleton(): React.ReactElement {
  return <div className="animate-pulse bg-muted rounded-md h-10"></div>;
}
```

---

## Route Fallback Integration

### Fallback Field in RouteConfig

All routes MUST define a `fallback` component in the route configuration for Suspense boundaries.

```typescript
export const DASHBOARD_ROUTES: RouteConfig[] = [
  {
    element: DashboardLayout,
    isLayout: true,
    path: '/',
    auth: 'authenticated',
    fallback: DashboardLayoutSkeleton, // ✅ Required
    children: [
      {
        index: true,
        element: React.lazy(() => import('../pages/DashboardPage')),
        name: 'Dashboard',
        auth: 'authenticated',
        fallback: DashboardPageSkeleton, // ✅ Required
      },
    ],
  },
];
```

### Generic Fallback

For routes without a specific skeleton, use `GenericPageSkeleton` from `@/components/ui/generic-page-skeleton`.

```typescript
const fallback = route.fallback 
  ? React.createElement(route.fallback) 
  : <GenericPageSkeleton />;
```

---

## Anti-Patterns

The following patterns are STRICTLY PROHIBITED:

| Anti-Pattern | Example | Reason |
|---|---|---|
| Spinner for async loading | `<div className="animate-spin">` | Not a skeleton; causes layout shift |
| Raw animate-pulse div | `<div className="animate-pulse">` | Not reusable; inconsistent styling |
| Scrollable skeleton | `overflow-y-auto` | Causes layout shift during load |
| Color-variant skeleton | `variant="primary"` | Unnecessary complexity |
| Base skeleton without composition | Custom pulse implementation | Not following the primitive pattern |
| Missing page skeleton | No `*Skeleton` component | Inconsistent loading experience |
| Missing layout skeleton | No `*LayoutSkeleton` component | Layout shift on navigation |
| Missing UI skeleton | No `*Skeleton` for UI component | Inconsistent atomic loading |

---

## File Naming Conventions

| Entity | Convention | Example |
|---|---|---|
| UI skeleton | `{component}-skeleton.tsx` | `button-skeleton.tsx`, `card-skeleton.tsx` |
| Page skeleton | `{Page}Skeleton.tsx` | `DashboardPageSkeleton.tsx` |
| Layout skeleton | `{Layout}Skeleton.tsx` | `DashboardLayoutSkeleton.tsx` |
| Generic skeleton | `generic-page-skeleton.tsx` | `generic-page-skeleton.tsx` |

---

## Testing Requirements

Every skeleton component MUST have tests covering:

1. **Rendering** — Component renders without errors
2. **Size variants** — All size props apply correct dimensions
3. **Non-scrollable** — Root element has `overflow-hidden`
4. **Structure** — All sub-components render correctly (for compound skeletons)

---

## Implementation Checklist

When creating a new feature, verify:

- [ ] UI primitive has a `*Skeleton` companion in `src/components/ui/`
- [ ] Page has a `*Skeleton` companion in `src/features/{feature}/pages/`
- [ ] Layout has a `*Skeleton` companion in `src/features/{feature}/layouts/`
- [ ] Route has `fallback` defined using the skeleton component
- [ ] All skeleton root elements use `overflow-hidden`
- [ ] All skeleton components compose the `Skeleton` primitive
- [ ] Tests exist for all skeleton components

---

## Verification Integration

Whenever a new skeleton component is added to the codebase, corresponding verification logic MUST be implemented in the `src/features/verification` feature to enable side-by-side verification between the skeleton state and the actual loaded content.

### Verification Pages

The verification feature provides three dedicated pages for skeleton validation:

| Skeleton Type | Verification Page | Location |
|---|---|---|
| UI Component Skeletons | Component Verification | `/verification/components` |
| Layout Skeletons | Layout Verification | `/verification/layouts` |
| Page Skeletons | Page Verification | `/verification/pages` |

### Implementation Requirements

When adding a new skeleton component, developers MUST:

1. **UI Component Skeletons** — Add verification entry to [`ComponentVerificationPage.tsx`](src/features/verification/pages/ComponentVerificationPage.tsx) using the `SideBySide` component:

   ```typescript
   <SideBySide
     label={t('componentName')}
     actual={<ActualComponent />}
     skeleton={<ComponentSkeleton />}
   />
   ```

2. **Layout Skeletons** — Add verification entry to [`LayoutVerificationPage.tsx`](src/features/verification/pages/LayoutVerificationPage.tsx)

3. **Page Skeletons** — Add verification entry to [`PageVerificationPage.tsx`](src/features/verification/pages/PageVerificationPage.tsx)

### Verification Component

Use the `SideBySide` component from [`src/features/verification/components/SideBySide.tsx`](src/features/verification/components/SideBySide.tsx) to render the actual component and skeleton side by side:

```typescript
import SideBySide from '@/features/verification/components/SideBySide';

// For verifying skeleton matches actual component
<SideBySide
  label="Component Label"
  actual={<ActualComponent variant="example" />}
  skeleton={<ComponentSkeleton variant="example" />}
  showOverlay={false}
/>
```

### Why Verification Matters

- Ensures skeleton dimensions match actual component dimensions
- Validates layout structure consistency between loading and loaded states
- Provides visual regression testing for skeleton implementations
- Helps catch sizing discrepancies before production

---

## References

- Global Skeleton Primitive: `src/components/ui/skeleton.tsx`
- Generic Page Skeleton: `src/components/ui/generic-page-skeleton.tsx`
- Typography Skeletons: `src/components/ui/typography-skeleton.tsx`
- Route Types: `src/types/route.types.ts`
- App Integration: `src/app/App.tsx`
