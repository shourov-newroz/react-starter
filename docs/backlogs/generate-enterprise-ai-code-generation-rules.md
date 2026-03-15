# Generate Enterprise AI Code Generation Rules — Sprint Backlog

## Codebase Analysis Summary

### Technology Stack Identified

| Layer | Technology | Version |
|---|---|---|
| Framework | React | 19.2 |
| Build | Vite | 7.3 |
| Language | TypeScript | 5.9 (strict mode) |
| Styling | TailwindCSS v4 + shadcn/ui (CVA + Radix) | 4.2 |
| State | Zustand (devtools + persist) | 5.0 |
| Data fetching | SWR | 2.4 |
| HTTP | Axios (with interceptors) | 1.13 |
| i18n | i18next + react-i18next | 25.8 / 16.5 |
| Routing | React Router | 7.13 |
| Validation | Zod | 4.3 |
| Testing | Vitest + Testing Library + MSW | 4.0 / 16.3 / 2.12 |
| Linting | ESLint (flat config) + Prettier | 9.39 / 3.8 |
| Git hooks | Husky + lint-staged + commitlint | — |

### Architecture Patterns Extracted

- **Feature-based modular architecture** — `src/features/{auth,dashboard,demo}` each with: `components/`, `hooks/`, `services/`, `store/`, `routes/`, `pages/`, `locales/`, `guards/`
- **Barrel exports** via `index.ts` at feature root
- **Zustand stores** use `create<State>()(devtools(persist(...)))` pattern with `BaseStore._reset()`, typed selectors as `const` objects, `initialState` const
- **Services** as typed object literals with JSDoc, calling `apiClient.get/post/put/patch/delete<T>()`
- **API client** wraps Axios with typed generic `ApiResponse<T>`, request/response interceptors, X-Request-ID tracing, error normalization via `normalizeError()`
- **Custom hooks** wrap store selectors + derived business logic, use `useCallback` for memoization, define explicit return type interfaces
- **Routes** use `React.lazy()` for code splitting, centralized in `src/config/routes.ts`, feature-scoped `*_LINKS` and `*_ROUTES` constants
- **i18n** uses per-feature namespace config, `useAuthT()` / `useCommonT()` shorthand hooks, flat JSON locale files
- **Error handling** — `ErrorBoundary` (class component), `AppError` type with `ErrorType` enum, `normalizeError()`, `serverErrorHandler`
- **Logging** — Singleton `Logger` class with level-based methods, dev/prod behavior split
- **Config** — `env.ts` (Zod schema validation), `config/index.ts` (typed config object `as const`)
- **Test infra** — Custom `render()` / `renderWithProviders()`, `AllProviders` wrapper, `mockMatchMedia()` helper, MSW mocks dir
- **Path aliases** — `@/*` mapping to `src/*` (11 specific aliases in both vite.config.ts and tsconfig)
- **Import ordering** — ESLint enforced: `builtin → external → internal → parent → sibling → index → object`, alphabetized, newlines between groups
- **ESLint rules** — `no-explicit-any: error`, `explicit-function-return-type: warn` (off in `.tsx` files), `i18next/no-literal-string: error`, jsx-a11y rules, prettier enforcement
- **Prettier** — `singleQuote`, `printWidth: 100`, `trailingComma: es5`, `semi`, `tabWidth: 2`

### Gap Analysis

| Area | Current State | Gap |
|---|---|---|
| `.ai-rules/` or `.kilocode/rules/` | **Does not exist** | Entire directory + 12 rule files need creation |
| AI code generation rules | **None defined** | Full rule system must be authored from scratch |
| Global stores dir | `src/stores/` has only `.gitkeep` | Rule should document pattern but acknowledge empty state |
| Global hooks dir | `src/hooks/` has only `.gitkeep` | Same as above |
| Auth `useAuth` hook | Uses mock/simulated API calls, not real `authService` | Rule should reference the service pattern, not the mock |
| `serverErrorHandler.ts` | Contains `console.log` debug statements | Rules should enforce logger usage, not console |
| `User` type duplication | Defined in both `auth.types.ts` and `auth.store.ts` | Rules should enforce single source of truth |
| Commented-out code | `axios.ts` has commented-out error normalization block | Rules should prohibit commented-out code |

> **⚠️ Directory path clarification needed**: The requirement specifies `.ai-rules/` but Kilo AI documentation uses `.kilocode/rules/`. This backlog uses `.kilocode/rules/` (per official Kilo AI docs). If you prefer `.ai-rules/`, all path references will be adjusted.

---

## Stories and Checklists

---

### Story 1: Project Setup — Create Rules Directory and Index

**Theme**: Infrastructure  
**Points**: 1  
**Description**: Set up the `.kilocode/rules/` directory and create a README explaining the rules system.

#### Tasks

- [ ] Create `.kilocode/rules/` directory in project root
- [ ] Create `.kilocode/rules/README.md` with:
  - [ ] Purpose of the AI rules system
  - [ ] How to add/modify rules
  - [ ] Link to Kilo AI docs: `https://kilo.ai/docs/customize/custom-rules`
  - [ ] List of all rule files with one-line descriptions
- [ ] Add `.kilocode/` to `.prettierignore` (rules are hand-formatted markdown, shouldn't be auto-formatted)
- [ ] Verify: Confirm the directory is created and accessible by Kilo AI

---

### Story 2: Architecture Rules

**Theme**: Architecture  
**Points**: 1  
**Description**: Codify the feature-based modular architecture.

#### File: `.kilocode/rules/architecture-rules.md`

#### Tasks — Content to include

- [ ] **Feature modularization pattern**: Each feature lives in `src/features/{feature-name}/` with subdirectories: `components/`, `hooks/`, `services/`, `store/`, `routes/`, `pages/`, `locales/`, `guards/`
- [ ] **Barrel export requirement**: Every feature must export its public API via `src/features/{feature}/index.ts`
- [ ] **Cross-feature import ban**: Features must never directly import from another feature's internal modules — only from its barrel export (`@/features/{feature}`)
- [ ] **Shared code placement**: Reusable non-feature code goes in `src/lib/`, `src/services/`, `src/components/`, `src/hooks/`, `src/types/`
- [ ] **Separation of concerns**: Pages compose components, components are presentational, hooks encapsulate logic, services handle API communication, stores manage state
- [ ] **Application shell**: `src/app/` contains only `App.tsx`, `providers.tsx`, route guards (`AuthGuard.tsx`, `UnauthorizedRoute.tsx`)
- [ ] **Config centralization**: All configuration in `src/config/` — `env.ts` (Zod-validated), `index.ts` (typed config object `as const`), `routes.ts` (centralized route registry)
- [ ] **Lazy loading mandate**: All page-level components must use `React.lazy()` for code splitting
- [ ] **Provider composition**: Root providers in `providers.tsx` wrap in order: `I18nextProvider → ErrorBoundary → SWRConfig → BrowserRouter → Suspense`

#### Verification

- [ ] Review that every rule references actual file paths from the codebase
- [ ] Cross-check with `src/features/auth/` as the reference implementation

---

### Story 3: Naming Conventions

**Theme**: Standards  
**Points**: 1  
**Description**: Define strict naming conventions grounded in codebase patterns.

#### File: `.kilocode/rules/naming-conventions.md`

#### Tasks — Content to include

- [ ] **React components** → `PascalCase` (e.g., `LoginForm`, `ErrorBoundary`, `PrivateRouteGuard`)
- [ ] **Custom hooks** → `useCamelCase` (e.g., `useAuth`, `useAuthT`, `useAuthTranslation`)
- [ ] **Variables and functions** → `camelCase` (e.g., `renderRouteElement`, `normalizeError`)
- [ ] **Constants** → `UPPER_SNAKE_CASE` (e.g., `AUTH_LINKS`, `DASHBOARD_ROUTES`, `NAMESPACES`, `DEFAULT_NAMESPACE`)
- [ ] **Types** → `PascalCase` (e.g., `RouteConfig`, `ApiResponse`, `AuthState`)
- [ ] **Interfaces** → `PascalCase`, no `I` prefix (e.g., `LoginCredentials`, `BaseStore`, `AppError`)
- [ ] **Files** → `kebab-case` for utilities, `PascalCase` for components (e.g., `api-client.ts`, `use-auth.ts`, `LoginForm.tsx`, `ErrorBoundary.tsx`)
- [ ] **Directories** → `kebab-case` (e.g., `auth`, `dashboard`, `error-handling`)
- [ ] **Type files** → `{name}.types.ts` suffix (e.g., `api.types.ts`, `auth.types.ts`, `route.types.ts`)
- [ ] **Store files** → `{feature}.store.ts` suffix (e.g., `auth.store.ts`)
- [ ] **Service files** → `{feature}.service.ts` suffix (e.g., `auth.service.ts`)
- [ ] **Route files** → `{feature}.routes.ts` suffix (e.g., `auth.routes.ts`, `dashboard.routes.ts`)
- [ ] **Test files** → Co-located, `{name}.test.ts` or `{name}.test.tsx` suffix
- [ ] **Environment variables** → `VITE_` prefix, `UPPER_SNAKE_CASE` (e.g., `VITE_API_BASE_URL`)
- [ ] **Selectors** → `{feature}Selectors` object (e.g., `authSelectors`)
- [ ] **Prohibitions**: No abbreviations, no Hungarian notation, no `I` prefix for interfaces, no `any` type

#### Verification

- [ ] Validate each naming example actually exists in the codebase
- [ ] Cross-check against ESLint rules in `eslint.config.js`

---

### Story 4: Component Architecture Rules

**Theme**: UI  
**Points**: 1  
**Description**: Define how components must be built.

#### File: `.kilocode/rules/component-architecture.md`

#### Tasks — Content to include

- [ ] **Component hierarchy**: Pages → Features → Shared components → UI primitives (shadcn/ui)
- [ ] **shadcn/ui usage**: UI primitives in `src/components/ui/` (Button, Card, Input, Label) — AI must reuse these, never create competing primitives
- [ ] **Props typing**: All props must use TypeScript interfaces (e.g., `interface ProvidersProps { children: ReactNode }`)
- [ ] **Return type**: Components must specify return type annotation (`ReactElement`, `ReactNode`) — enforced by ESLint `explicit-function-return-type` (warn for `.tsx`)
- [ ] **Component file layout** (order):
  1. Imports (ordered per import rules)
  2. Type/interface definitions
  3. Component function (exported, named export preferred with `export function ComponentName()`)
  4. Default export if needed for lazy loading
- [ ] **Composition over inheritance**: Use React composition patterns, never class components (except `ErrorBoundary` which requires it)
- [ ] **Feature isolation**: Components within a feature import from within the feature or from shared — never directly from another feature
- [ ] **i18n enforcement**: All user-facing strings must use translation hooks (`useAuthT()`, `useCommonT()`, etc.) — enforced by `i18next/no-literal-string` ESLint rule
- [ ] **Error handling**: Every page must be wrapped in `<ErrorBoundary>` and `<Suspense fallback={<LoadingFallback />}>`
- [ ] **Accessibility**: Follow jsx-a11y rules — `alt-text`, `anchor-has-content`, `click-events-have-key-events`

#### Verification

- [ ] Review against `LoginForm.tsx`, `LoginPage.tsx`, `ErrorBoundary.tsx` as reference implementations

---

### Story 5: State Management Rules

**Theme**: State Management  
**Points**: 1  
**Description**: Define Zustand state management standards.

#### File: `.kilocode/rules/state-management-rules.md`

#### Tasks — Content to include

- [ ] **Store framework**: Zustand v5 — all state must use Zustand stores
- [ ] **Store creation pattern**: `create<StateInterface>()(devtools(persist((set) => ({...}), persistConfig), { name: 'StoreName' }))` — always wrap with `devtools` and optionally `persist`
- [ ] **State interface**: Must extend `BaseStore` from `@/types/store.types.ts` (provides `_reset()` method)
- [ ] **Initial state**: Define as a separate `const initialState = {...} as const` — always immutable, always typed
- [ ] **Action naming**: Use imperative verbs (e.g., `setUser`, `clearUser`, `setLoading`, `setError`)
- [ ] **Devtools labels**: Every `set()` call must include a label as third argument: `set({...}, false, 'actionName')`
- [ ] **Persistence config**: Use `partialize` to persist only essential fields (never persist loading/error state)
- [ ] **Typed selectors**: Export a `const {feature}Selectors = {...} as const` object with reusable selector functions (e.g., `authSelectors.user`, `authSelectors.isAuthenticated`)
- [ ] **Hook pattern**: Consume stores via custom hooks (e.g., `useAuth`) — never expose raw store in components
- [ ] **Selector usage**: Use selectors via `useStore(selector)` pattern for render optimization (e.g., `useAuthStore(authSelectors.user)`)
- [ ] **Store placement**: Feature stores in `src/features/{feature}/store/`, exported via barrel. Global stores in `src/stores/`
- [ ] **Reset pattern**: Every store must implement `_reset()` that restores `initialState` — used in tests and logout flows
- [ ] **No direct localStorage/sessionStorage**: Use Zustand `persist` middleware instead

#### Verification

- [ ] Validate against `auth.store.ts` as the canonical example
- [ ] Confirm `BaseStore` interface and `StoreSelector` type from `store.types.ts`

---

### Story 6: API Calling Rules

**Theme**: API Integration  
**Points**: 1  
**Description**: Define API communication standards.

#### File: `.kilocode/rules/api-calling-rules.md`

#### Tasks — Content to include

- [ ] **API client usage**: All HTTP requests must go through `apiClient` from `@/services/api-client.ts` — never use raw `axios` directly
- [ ] **Typed responses**: All API calls must specify generic type: `apiClient.get<ResponseType>(url)`, `apiClient.post<ResponseType>(url, data)`
- [ ] **Response shape**: All API responses follow `ApiResponse<T>` from `@/types/api.types.ts`: `{ data: T, message?: string, success: boolean }`
- [ ] **Service layer**: Feature-specific API calls must be encapsulated in service objects in `src/features/{feature}/services/{feature}.service.ts`
- [ ] **Service pattern**: Services are object literals with JSDoc-documented async methods that return unwrapped data (e.g., `return response.data.data`)
- [ ] **Axios interceptors**: Request interceptor adds `X-Request-ID` (UUID) and logs. Response interceptor logs and normalizes errors via `normalizeError()`. **Do not modify interceptors without architect approval**
- [ ] **Error normalization**: All API errors must be normalized to `AppError` type via `normalizeError()` from `@/lib/error.ts`
- [ ] **SWR for data fetching**: Use SWR hooks for GET requests with automatic caching/revalidation. SWR config in `@/lib/swr-config.ts`
- [ ] **SWR fetcher**: Default fetcher uses `apiClient.get(url).then(res => res.data.data)` — data is pre-unwrapped
- [ ] **Retry configuration**: SWR retries up to 3 times, never retries 404s, uses 5s interval. Errors handled via `serverErrorHandler`
- [ ] **Base URL / timeout**: Configured via Zod-validated env vars `VITE_API_BASE_URL` and `VITE_API_TIMEOUT` in `src/config/env.ts`
- [ ] **Token injection**: Auth tokens must be injected via Axios request interceptors (not per-call headers)
- [ ] **Request cancellation**: Use `AbortController` via Axios `signal` config for cancellable requests

#### Verification

- [ ] Validate against `api-client.ts`, `axios.ts`, `auth.service.ts`, `swr-config.ts`

---

### Story 7: Error Handling Rules

**Theme**: Reliability  
**Points**: 1  
**Description**: Define error handling patterns.

#### File: `.kilocode/rules/error-handling-rules.md`

#### Tasks — Content to include

- [ ] **Error type system**: All application errors must conform to `AppError` interface from `@/types/error.types.ts` — extends `Error` with `type`, `code`, `statusCode`, `details`, `timestamp`
- [ ] **Error type enum**: Use `ErrorType` enum: `NETWORK`, `VALIDATION`, `AUTH`, `NOT_FOUND`, `SERVER`, `UNKNOWN`
- [ ] **Error normalization**: All unknown errors must pass through `normalizeError()` from `@/lib/error.ts`
- [ ] **Global ErrorBoundary**: Every route is wrapped in `<ErrorBoundary>` in `App.tsx`. Custom fallback UI supported via `fallback` prop
- [ ] **Suspense boundaries**: Every lazy-loaded page must have `<Suspense fallback={<LoadingFallback />}>`
- [ ] **Logging**: Use `logger` from `@/lib/logger.ts` — never use `console.log/warn/error` directly
- [ ] **Logger methods**: `logger.debug()`, `logger.info()`, `logger.warn()`, `logger.error()` — debug is suppressed in production
- [ ] **API error handling**: Axios response interceptor automatically normalizes errors. Services can add business-specific error handling on top
- [ ] **User-facing errors**: Show via component state (e.g., `error` in store / hook return), never expose raw error messages to users
- [ ] **Async error handling**: Use `try/catch/finally` pattern — always set loading state in `finally` block

#### Verification

- [ ] Cross-check against `error.ts`, `error.types.ts`, `ErrorBoundary.tsx`, `logger.ts`, `axios.ts`

---

### Story 8: Testing Rules

**Theme**: Quality  
**Points**: 1  
**Description**: Define AI automatic test coverage requirements.

#### File: `.kilocode/rules/testing-rules.md`

#### Tasks — Content to include

- [ ] **Testing framework**: Vitest (v4) + Testing Library React + MSW for API mocking
- [ ] **Test file placement**: Co-located with source files, suffix `.test.ts` or `.test.tsx` (e.g., `auth.store.test.ts` next to `auth.store.ts`)
- [ ] **Test naming**: `describe('{ModuleName}', () => { it('should {expected behavior} when {condition}', ...) })`
- [ ] **Rendering**: Use custom `render()` / `renderWithProviders()` from `@/tests/test-utils.tsx` — wraps with `AllProviders` (I18n, SWR, Router)
- [ ] **Setup file**: `src/tests/setup.ts` — extends Vitest expect with jest-dom matchers, cleanup after each test
- [ ] **Globals**: Vitest runs with `globals: true` — `describe`, `it`, `expect`, `vi`, `beforeEach`, `afterEach` are globally available
- [ ] **MSW mocks**: API mocks in `src/tests/mocks/`. Use MSW handlers for API simulation
- [ ] **Store testing**: Reset Zustand stores with `_reset()` method in `beforeEach`/`afterEach`
- [ ] **Coverage requirements**: Every new module must have tests for: happy path, error states, loading states, edge cases
- [ ] **What to test**:
  - Components: rendering, user interactions, conditional rendering, error/loading states
  - Hooks: return values, state changes, side effects
  - Services: API call parameters, response transformation, error propagation
  - Stores: initial state, action effects, persistence, reset
  - Utilities: pure function input/output, edge cases
- [ ] **ESLint relaxation in tests**: `@typescript-eslint/no-explicit-any` is `warn` (not `error`), `i18next/no-literal-string` is `off`
- [ ] **Async testing**: Use `waitFor` from Testing Library for async assertions
- [ ] **No feature MUST be created without tests**

#### Verification

- [ ] Cross-check against `setup.ts`, `test-utils.tsx`, `AllProviders.tsx`, `auth.store.test.ts`, `PrivateRouteGuard.test.tsx`, `ErrorBoundary.test.tsx`

---

### Story 9: Documentation Rules

**Theme**: Documentation  
**Points**: 1  
**Description**: Define documentation standards.

#### File: `.kilocode/rules/documentation-rules.md`

#### Tasks — Content to include

- [ ] **JSDoc on all public exports**: Functions, classes, interfaces, types, constants — minimum `/** description */`, parameters when non-obvious
- [ ] **Component documentation**: JSDoc block above component function describing purpose, usage context, and relationship to feature
- [ ] **Store documentation**: JSDoc on store interface (purpose), actions (what they do + when to use), and selectors
- [ ] **Service documentation**: JSDoc on each method with `@param` and `@returns` descriptions
- [ ] **Hook return type interfaces**: Always define and export an explicit return type interface (e.g., `interface UseAuthReturn {...}`)
- [ ] **README per feature**: `locales/README.md` pattern — document locale file structure and translation workflow
- [ ] **File-level comments**: Only when the file purpose is non-obvious (most barrel exports don't need them)
- [ ] **Inline comments**: Only for non-obvious logic — "why", not "what"
- [ ] **Type documentation**: Interfaces and types with `@example` JSDoc when the usage pattern is complex (see `StoreSelector` type)
- [ ] **i18n locale documentation**: Each feature with locales should have a README explaining translation keys

#### Verification

- [ ] Validate JSDoc patterns against `auth.store.ts`, `auth.service.ts`, `store.types.ts`

---

### Story 10: Import Structure Rules

**Theme**: Standards  
**Points**: 1  
**Description**: Define import ordering and dependency boundaries.

#### File: `.kilocode/rules/import-structure-rules.md`

#### Tasks — Content to include

- [ ] **Import ordering** (ESLint-enforced, auto-fixable):
  1. Built-in / Node modules
  2. External libraries (react, zustand, axios, etc.)
  3. Internal (`@/` aliased imports)
  4. Parent (`../`)
  5. Sibling (`./`)
  6. Index
  7. Object
- [ ] **Alphabetization**: Within each group, imports are alphabetized (case-insensitive) — enforced by ESLint
- [ ] **Newlines**: Blank line between each import group — enforced by ESLint
- [ ] **Path aliases**: Always use `@/*` aliases for imports outside the current directory — never use relative paths going up more than one level
- [ ] **Available aliases**: `@/app`, `@/features`, `@/components`, `@/hooks`, `@/services`, `@/stores`, `@/lib`, `@/styles`, `@/types`, `@/config`, `@/tests`
- [ ] **Type imports**: Use `import type { X }` for type-only imports — enforced by `verbatimModuleSyntax: true` in tsconfig
- [ ] **No duplicate imports**: `import/no-duplicates: error`
- [ ] **No unresolved imports**: `import/no-unresolved: error`
- [ ] **Dependency boundaries**:
  - Features can import from `@/components`, `@/hooks`, `@/lib`, `@/services`, `@/types`, `@/config`
  - Features must NOT import from other features' internal paths — only from their barrel exports
  - `src/lib/`, `src/services/`, `src/types/` must NOT import from features

#### Verification

- [ ] Validate against existing ESLint `import/order` config in `eslint.config.js`
- [ ] Cross-check alias list with `vite.config.ts` and `tsconfig.app.json`

---

### Story 11: Folder Structure Rules

**Theme**: Architecture  
**Points**: 1  
**Description**: Define file organization rules.

#### File: `.kilocode/rules/folder-structure-rules.md`

#### Tasks — Content to include

- [ ] **Top-level `src/` structure**:

  ```
  src/
  ├── app/          # App shell: App.tsx, providers.tsx, route guards
  ├── assets/       # Static assets (images, fonts)
  ├── components/   # Shared components + ui/ primitives
  ├── config/       # App config, env validation, route registry
  ├── features/     # Feature modules (auth, dashboard, etc.)
  ├── hooks/        # Shared custom hooks
  ├── lib/          # Utility libraries (error, logger, i18n, swr-config)
  ├── services/     # Global services (api-client, axios instance)
  ├── stores/       # Global Zustand stores
  ├── styles/       # Global styles (index.css)
  ├── tests/        # Test infrastructure (setup, utils, mocks, providers)
  ├── types/        # Global type definitions
  └── main.tsx      # App entry point
  ```

- [ ] **Feature module structure**:

  ```
  src/features/{feature}/
  ├── components/    # Feature-specific components
  │   ├── index.ts   # Barrel export
  │   └── *.tsx
  ├── guards/        # Route guards
  ├── hooks/         # Feature hooks
  │   ├── index.ts
  │   └── *.ts
  ├── locales/       # Translation files (en.json, ar.json, ku.json)
  │   └── README.md
  ├── pages/         # Page components (lazy-loaded)
  ├── routes/        # Route config ({feature}.routes.ts)
  ├── services/      # API service ({feature}.service.ts)
  ├── store/         # Zustand store ({feature}.store.ts + test)
  ├── {feature}.types.ts  # Feature type definitions
  └── index.ts       # Public API barrel export
  ```

- [ ] **Prevent misplacement**: Feature-specific code must never be in global directories. Global utilities must never be in feature directories
- [ ] **No circular dependencies** across features
- [ ] **New feature checklist**: When AI creates a new feature, it must scaffold ALL required subdirectories and barrel exports

#### Verification

- [ ] Validate structure against `src/features/auth/` (most complete feature)

---

### Story 12: AI Architecture Enforcement Rules

**Theme**: AI Governance  
**Points**: 1  
**Description**: Define meta-rules that force AI to validate before generating.

#### File: `.kilocode/rules/ai-enforcement-rules.md`

#### Tasks — Content to include

- [ ] **Pre-generation checklist**: Before writing any code, AI must:
  1. Analyze project structure
  2. Identify existing patterns
  3. Check for reusable utilities
  4. Verify import paths
  5. Confirm naming conventions
- [ ] **Reuse mandate**: AI must check `src/lib/`, `src/services/`, `src/components/`, `src/hooks/` for existing utilities before creating new ones
- [ ] **Architecture violation refusal**: AI must refuse to:
  - Place feature code in global directories
  - Create cross-feature direct imports
  - Use `any` type (enforced by ESLint `no-explicit-any: error`)
  - Bypass the `apiClient` abstraction
  - Create raw `console.log` statements (use `logger` instead)
  - Hardcode user-facing strings (use i18n translations)
  - Skip `ErrorBoundary` / `Suspense` wrapping
  - Create stores without `BaseStore._reset()` implementation
  - Create untested modules
- [ ] **Commented-out code ban**: Never leave commented-out code in production files
- [ ] **Duplicate type prevention**: Check existing type files before defining new types — especially `api.types.ts`, `error.types.ts`, `route.types.ts`, `store.types.ts`
- [ ] **Test-first mindset**: When creating a new module, AI should generate the test file alongside the implementation
- [ ] **Commit message format**: Follow conventional commits (commitlint enforced): `feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `perf:`, `test:`, `chore:`, `revert:`, `ci:`, `build:`

#### Verification

- [ ] Validate rules against ESLint config, tsconfig strict settings, and commitlint config

---

### Story 13: Performance Rules

**Theme**: Performance  
**Points**: 1  
**Description**: Define performance optimization standards.

#### File: `.kilocode/rules/performance-rules.md`

#### Tasks — Content to include

- [ ] **Code splitting**: All page components must use `React.lazy()` — enforced by route pattern
- [ ] **Memoization**: Use `useCallback` for function props, `useMemo` for expensive computations — but only when justified (don't prematurely optimize)
- [ ] **Zustand selector optimization**: Always use individual selectors via `useStore(selector)` — never use `useStore()` without selector (causes full re-render)
- [ ] **Bundle splitting**: Production build uses manual chunks (`vite.config.ts`): `react-vendor`, `ui-vendor`, `radix-ui`. New vendor groups should be added for significant new dependencies
- [ ] **Chunk size limit**: Warning at 1000KB per chunk (`chunkSizeWarningLimit: 1000`)
- [ ] **Bundle reporting**: Production builds generate `dist/bundle-report.html` via rollup-plugin-visualizer
- [ ] **SWR deduplication**: SWR config deduplicates requests within 2000ms interval — don't add manual deduplication
- [ ] **Image optimization**: Use optimized formats (WebP/AVIF), lazy load below-the-fold images
- [ ] **CSS**: TailwindCSS v4 handles tree-shaking automatically — avoid custom CSS unless necessary
- [ ] **Re-render prevention**: Avoid inline object/array literals in JSX props (creates new references each render)

#### Verification

- [ ] Validate against `vite.config.ts` build config and `swr-config.ts`

---

## QA / Validation Stories

---

### Story 14: Rule Completeness & Consistency Audit

**Theme**: QA  
**Points**: 1  
**Description**: Verify all rule files are complete, internally consistent, and reference actual codebase patterns.

#### Tasks

- [ ] Cross-reference every code example / file path in rules against actual codebase
- [ ] Verify no contradictions between rule files
- [ ] Confirm all 12 rule files are created and non-empty
- [ ] Verify all rule files follow Kilo AI markdown format (headers, lists, code blocks)
- [ ] Spell-check and grammar review
- [ ] Test that Kilo AI loads and applies the rules (manual verification — open a new AI session and confirm rules appear in context)

---

### Story 15: Team Handoff Documentation

**Theme**: Documentation  
**Points**: 1  
**Description**: Update project README and create a handoff document.

#### Tasks

- [ ] Add "AI Code Generation Rules" section to project `README.md`:
  - [ ] Explain the `.kilocode/rules/` directory purpose
  - [ ] Link to Kilo AI docs
  - [ ] Summarize what the rules enforce
- [ ] Create `docs/ai-rules-guide.md` explaining:
  - [ ] How to modify existing rules
  - [ ] How to add new rules
  - [ ] How rules relate to ESLint/Prettier/tsconfig enforced patterns
  - [ ] Governance: who owns the rules, PR review process for changes

#### Verification

- [ ] Review README changes are accurate and concise
- [ ] Confirm docs file is accessible and developer-friendly

---

## Summary

| # | Story | Theme | Status |
|---|---|---|---|
| 1 | Project Setup | Infrastructure | `[ ]` |
| 2 | Architecture Rules | Architecture | `[ ]` |
| 3 | Naming Conventions | Standards | `[ ]` |
| 4 | Component Architecture | UI | `[ ]` |
| 5 | State Management Rules | State Management | `[ ]` |
| 6 | API Calling Rules | API Integration | `[ ]` |
| 7 | Error Handling Rules | Reliability | `[ ]` |
| 8 | Testing Rules | Quality | `[ ]` |
| 9 | Documentation Rules | Documentation | `[ ]` |
| 10 | Import Structure Rules | Standards | `[ ]` |
| 11 | Folder Structure Rules | Architecture | `[ ]` |
| 12 | AI Enforcement Rules | AI Governance | `[ ]` |
| 13 | Performance Rules | Performance | `[ ]` |
| 14 | Completeness Audit | QA | `[ ]` |
| 15 | Team Handoff Docs | Documentation | `[ ]` |

**Total: 15 stories, ~15 points**
