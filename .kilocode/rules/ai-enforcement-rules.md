# AI Architecture Enforcement Rules

These meta-rules define what the AI Code Assistant must validate before generating any code.

---

## Pre-Generation Checklist

Before writing ANY code, the AI MUST:

1. **Analyze project structure** — Understand the feature-based architecture
2. **Identify existing patterns** — Match code style to established conventions
3. **Check for reusable utilities** — Search `src/lib/`, `src/services/`, `src/components/`, `src/hooks/` for existing code
4. **Verify import paths** — Use correct `@/*` aliases
5. **Confirm naming conventions** — Follow all naming rules exactly
6. **Check type definitions** — Reuse existing types from `src/types/` before creating new ones

---

## Reuse Mandate

AI MUST check for and reuse existing code before creating new:

| Check | Location |
|---|---|
| UI components | `src/components/ui/` (shadcn/ui primitives) |
| Skeleton primitive | `src/components/ui/skeleton.tsx` (`Skeleton`) |
| Skeleton components | `src/components/ui/` (skeleton variants) |
| Error handling | `src/lib/error.ts` (`normalizeError`) |
| Logging | `src/lib/logger.ts` (`logger`) |
| API client as SWR utility function | `src/services/api-client.ts` (`apiClient`) |
| Translations | `src/lib/i18n/` hooks |
| CSS utilities | `src/lib/utils.ts` (`cn()` function) |
| Test utilities | `src/tests/test-utils.tsx` |
| Type definitions | `src/types/` (all `.types.ts` files) |
| Store base types | `src/types/store.types.ts` (`BaseStore`, `StoreSelector`) |

---

## Architecture Violation Refusal

AI MUST refuse to generate code that:

### Type Safety Violations

- ❌ Uses `any` type — enforced by `@typescript-eslint/no-explicit-any: error`
- ❌ Skips return type annotations — enforced by `explicit-function-return-type: warn`
- ❌ Uses `@ts-ignore` without documented justification

### Structural Violations

- ❌ Places feature code in global directories
- ❌ Creates cross-feature direct imports (must use barrel exports)
- ❌ Creates files outside the defined folder structure
- ❌ Skips barrel exports for new modules

### Pattern Violations

- ❌ Uses raw `axios` or `fetch` instead of `SWR Hooks with apiClient as utility function`
- ❌ Uses `console.log/warn/error` instead of `logger`
- ❌ Hardcodes user-facing strings instead of using i18n translations
- ❌ Skips `ErrorBoundary` / `Suspense` wrapping for pages
- ❌ Creates Zustand stores without `BaseStore._reset()` implementation
- ❌ Creates Zustand stores without `devtools()` wrapper
- ❌ Uses `localStorage`/`sessionStorage` directly instead of Zustand `persist`
- ❌ Hardcodes API URLs or config values
- ❌ Creates async UI components without skeleton loading states
- ❌ Updates data components UI or styles without the companion skeleton update
- ❌ Creates page components without a companion `*Skeleton` page
- ❌ Creates atomic UI components without a companion skeleton variant
- ❌ Uses spinner (`animate-spin`) as Suspense fallback instead of skeleton
- ❌ Uses base skeleton component instead of using corresponding skeleton component of UI components in skeleton pages and layouts

### Quality Violations

- ❌ Creates untested modules (every module must have tests)
- ❌ Leaves commented-out code in production files
- ❌ Creates duplicate types already defined in `src/types/`
- ❌ Skips JSDoc on public exports

---

## Duplicate Prevention

Before creating any new:

| Entity | Check Location |
|---|---|
| Type/Interface | `src/types/*.types.ts` and `src/features/{feature}/{feature}.types.ts` |
| Utility function | `src/lib/*.ts` |
| UI component | `src/components/` and `src/components/ui/` |
| Hook | `src/hooks/` and `src/features/{feature}/hooks/` |
| Service | `src/services/`

If a similar entity exists, extend or reuse it — do NOT create a duplicate.

---

## Test-First Mindset

- When creating a new module, generate the test file alongside the implementation
- Test file must cover: happy path, error states, loading states, edge cases
- New stores must have tests for: initial state, actions, reset, persistence

---

## Commit Message Format

Follow conventional commits (enforced by commitlint):

```
<type>: <description>

Types: feat, fix, docs, style, refactor, perf, test, chore, revert, ci, build
```

Examples:

- `feat: add user profile settings page`
- `fix: correct token refresh race condition`
- `docs: update API integration guide`
- `test: add unit tests for auth store`
- `refactor: extract shared form validation logic`

---

## Code Quality Standards

### TypeScript Strict Mode

The project uses maximum TypeScript strictness (`tsconfig.app.json`):

- `strict: true`
- `noImplicitAny: true`
- `strictNullChecks: true`
- `strictFunctionTypes: true`
- `noUnusedLocals: true`
- `noUnusedParameters: true`
- `noImplicitReturns: true`
- `noFallthroughCasesInSwitch: true`
- `noUncheckedIndexedAccess: true`

AI-generated code MUST compile cleanly against these settings.

### Prettier Formatting

All code is formatted by Prettier:

- Single quotes (`singleQuote: true`)
- Print width: 100 characters
- Trailing commas: ES5
- Semicolons: always
- Tab width: 2 spaces
- Arrow parens: always

---

## When in Doubt

If the AI is unsure about a pattern:

1. Look at the **feature** (`src/features/`) — it is the reference implementation
2. Follow the patterns established there exactly
3. Ask the developer for clarification before guessing
