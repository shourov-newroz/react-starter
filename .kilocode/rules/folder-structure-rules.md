# Folder Structure Rules

These rules define how files and directories must be organized in the project.

---

## Top-Level `src/` Structure

```
src/
├── app/            # App shell: App.tsx, providers.tsx, route guards
├── assets/         # Static assets (images, fonts)
├── components/     # Shared components + ui/ primitives (shadcn/ui)
├── config/         # App config, env validation, route registry
├── features/       # Feature modules (auth, dashboard, demo, etc.)
├── hooks/          # Shared custom hooks (cross-feature)
├── lib/            # Utility libraries (error, logger, i18n, swr-config)
├── services/       # Global services (api-client, axios instance)
├── stores/         # Global Zustand stores (cross-feature)
├── styles/         # Global styles (index.css with Tailwind imports)
├── tests/          # Test infrastructure (setup, utils, mocks, providers)
├── types/          # Global type definitions
└── main.tsx        # App entry point
```

---

## Feature Module Structure

Every feature MUST follow this structure:

```
src/features/{feature}/
├── components/           # Feature-specific UI components
│   ├── index.ts          # Barrel export
│   ├── ComponentName.tsx
│   └── __snapshots__/    # Optional: snapshot test outputs
├── config/               # Feature API endpoint and others configuration
│   └── {feature}.config.ts
├── guards/               # Route guards (if applicable)
│   ├── GuardName.tsx
│   └── GuardName.test.tsx
├── hooks/                # Feature-specific custom hooks
│   ├── index.ts          # Barrel export
│   ├── use-feature.ts    # Primary feature hook
│   └── useTranslation.ts # Feature i18n hook
├── locales/              # Translation files
│   ├── README.md         # Locale documentation
│   ├── en.json           # English translations
│   ├── ar.json           # Arabic translations
│   └── ku.json           # Kurdish translations
├── pages/                # Page components (lazy-loaded via React.lazy)
│   └── FeaturePage.tsx
├── routes/               # Route configuration
│   └── {feature}.routes.ts
├── services/             # API service layer
│   ├── index.ts          # Barrel export
│   └── {feature}.service.ts
├── store/                # Zustand state store
│   ├── index.ts          # Barrel export
│   ├── {feature}.store.ts
│   └── {feature}.store.test.ts
├── {feature}.types.ts    # Feature type definitions
└── index.ts              # Public API barrel export (MANDATORY)
```

---

## Shared Components Structure

```
src/components/
├── ui/                   # shadcn/ui primitives and skeletons
│   ├── button.tsx
│   ├── button-skeleton.tsx
│   ├── card.tsx
│   ├── card-skeleton.tsx
│   ├── input.tsx
│   ├── input-skeleton.tsx
│   ├── label.tsx
│   ├── label-skeleton.tsx
│   ├── skeleton.tsx         # Base skeleton primitive
│   ├── generic-page-skeleton.tsx
│   ├── typography.tsx
│   └── typography-skeleton.tsx
├── ErrorBoundary.tsx      # Global error boundary
├── ErrorBoundary.test.tsx
├── LoadingFallback.tsx     # Deprecated: use route-specific skeleton fallback
└── LanguageSwitcher.tsx   # Language switching UI
```

---

## Library Structure

```
src/lib/
├── i18n/                 # Internationalization
│   ├── config.ts         # i18next configuration
│   ├── index.ts          # Barrel export
│   ├── locales/          # Shared locale files
│   ├── locales.ts        # Locale registry
│   ├── namespace-config.ts # Namespace mapping
│   └── useAppTranslation.ts # Shared translation hooks
├── error.ts              # Error normalization (normalizeError)
├── logger.ts             # Logger singleton
├── serverErrorHandler.ts # SWR error handler
├── swr-config.ts         # SWR global configuration
└── utils.ts              # Utility functions (cn)
```

---

## Test Infrastructure Structure

```
src/tests/
├── AllProviders.tsx       # Test provider wrapper
├── mocks/                # MSW mock handlers
├── setup.ts              # Vitest setup (matchers, cleanup)
└── test-utils.tsx         # Custom render, re-exports
```

---

## Type Definitions Structure

```
src/types/
├── api.types.ts          # API response/error types
├── env.d.ts              # Vite environment type augmentation
├── error.types.ts        # AppError, ErrorType enum
├── global.d.ts           # Global type declarations
├── index.ts              # Barrel export
├── route.types.ts        # RouteConfig, AuthRequirement
└── store.types.ts        # BaseStore, StoreSelector, StoreState
```

---

## Configuration Structure

```
src/config/
├── env.ts                # Zod-validated environment variables
├── index.ts              # Typed config object (as const)
└── routes.ts             # Centralized route registry
```

---

## Rules for File Placement

### Feature-Specific Code

- MUST live inside `src/features/{feature}/`
- NEVER place feature code in global directories (`src/lib/`, `src/services/`, etc.)

### Shared / Global Code

- Code used by 2+ features belongs in shared directories
- NEVER place shared utilities inside feature directories

### New Feature Scaffolding

When AI creates a new feature, it MUST scaffold ALL subdirectories:

1. Create `src/features/{feature}/` with all standard subdirectories
2. Create barrel exports (`index.ts`) at feature root and in components, hooks, services, store
3. Create type definition file (`{feature}.types.ts`)
4. Create route file (`routes/{feature}.routes.ts`)
5. Register routes in `src/config/routes.ts`
6. Create locale files
7. Add namespace to `src/lib/i18n/namespace-config.ts`

---

## Prohibitions

- NEVER create files outside the defined structure
- NEVER create circular dependencies between features
- NEVER place test files in `src/tests/` (they are co-located) — `src/tests/` is only for test infrastructure
- NEVER create duplicate utility files across features
