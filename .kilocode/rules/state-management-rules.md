# State Management Rules

These rules define how application state must be managed using Zustand.

---

## Framework

- **Zustand v5** is the only state management library in this project
- Do NOT use React Context for state management (except i18n providers)
- Do NOT use Redux, MobX, Jotai, or any other state library

---

## Store Creation Pattern

All stores MUST follow this exact pattern:

```typescript
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { BaseStore } from '@/types/store.types';

// 1. Define state interface (extends BaseStore)
export interface FeatureState extends BaseStore {
  // State fields
  data: DataType | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  setData: (data: DataType) => void;
  clearData: () => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}

// 2. Define initial state (immutable)
const initialState = {
  data: null,
  isLoading: false,
  error: null,
} as const;

// 3. Create store with devtools + persist
export const useFeatureStore = create<FeatureState>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,

        setData: (data: DataType) =>
          set({ data, error: null }, false, 'setData'),

        clearData: () =>
          set({ data: null }, false, 'clearData'),

        setLoading: (isLoading: boolean) =>
          set({ isLoading }, false, 'setLoading'),

        setError: (error: string | null) =>
          set({ error, isLoading: false }, false, 'setError'),

        _reset: () => set(initialState, false, '_reset'),
      }),
      {
        name: 'feature-storage',
        partialize: (state) => ({
          data: state.data,
          // NEVER persist: isLoading, error
        }),
      }
    ),
    { name: 'FeatureStore' }
  )
);
```

---

## State Interface Requirements

- MUST extend `BaseStore` from `@/types/store.types.ts`
- `BaseStore` provides the `_reset()` method signature
- State fields and actions are defined together in the interface
- Use union types for state fields when appropriate

---

## Initial State

- Define as a separate `const initialState = {...} as const`
- MUST be immutable (`as const`)
- Used by both store creation and `_reset()` method
- NEVER include action methods in `initialState`

---

## Devtools Integration

- Every store MUST be wrapped with `devtools()` middleware
- Provide a descriptive `name` option: `{ name: 'StoreName' }`
- Every `set()` call MUST include a label as the third argument:

```typescript
set({ user, isAuthenticated: true }, false, 'setUser')
//                                    ^      ^
//                                    |      action label for devtools
//                                    replace: false (merge, don't replace)
```

---

## Persistence

- Use `persist()` middleware for state that should survive page reloads
- ALWAYS use `partialize` to select which fields to persist
- NEVER persist transient state: `isLoading`, `error`, `isFetching`
- Storage key naming: `'{feature}-storage'` (kebab-case)

---

## Typed Selectors

- Export a `const {feature}Selectors = {...} as const` object
- Each selector is a pure function: `(state: StateType) => value`
- Use selectors for all store reads in components:

```typescript
export const authSelectors = {
  user: (state: AuthState) => state.user,
  isAuthenticated: (state: AuthState) => state.isAuthenticated,
  isLoading: (state: AuthState) => state.isLoading,
  error: (state: AuthState) => state.error,
} as const;

// Usage in hooks/components:
const user = useAuthStore(authSelectors.user);
```

---

## Hook Encapsulation

- Stores must be consumed via custom hooks (e.g., `useAuth()`)
- Never expose the raw store directly in components
- Hooks combine store selectors with business logic:

```typescript
export function useAuth(): UseAuthReturn {
  const user = useAuthStore(authSelectors.user);
  const isAuthenticated = useAuthStore(authSelectors.isAuthenticated);
  // ... combine with useCallback for actions
  return { user, isAuthenticated, login, logout };
}
```

---

## Store Placement

| Scope | Location |
|---|---|
| Feature-specific stores | `src/features/{feature}/store/{feature}.store.ts` |
| Global/shared stores | `src/stores/` |

---

## Reset Pattern

- Every store MUST implement `_reset()` method
- `_reset()` restores the store to `initialState`
- Used in:
  - Test setup/teardown (`beforeEach`/`afterEach`)
  - Logout flows
  - Global state cleanup

---

## Action Naming

- Use imperative verbs: `set`, `clear`, `update`, `toggle`, `add`, `remove`
- Examples: `setUser`, `clearUser`, `setLoading`, `setError`
- Private/internal actions prefix with `_` (e.g., `_reset`)

---

## Prohibitions

- NEVER use `localStorage` or `sessionStorage` directly — use Zustand `persist`
- NEVER mutate state directly — always use `set()` from Zustand
- NEVER create stores without `devtools()` wrapper
- NEVER skip the `_reset()` implementation
