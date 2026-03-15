# Documentation Rules

These rules define documentation standards for all code in the project.

---

## JSDoc Requirements

### Public Exports

All public exports MUST have JSDoc documentation:

```typescript
/**
 * Auth store using Zustand with devtools and persistence
 * Provides state management for user authentication
 */
export const useAuthStore = create<AuthState>()(/* ... */);
```

### Functions and Methods

Document with description, parameters (when non-obvious), and return type:

```typescript
/**
 * Login with email and password
 */
login: async (credentials: LoginCredentials): Promise<AuthResponse> => { /* ... */ }
```

### Interfaces and Types

Include `@example` when usage is complex:

```typescript
/**
 * Generic type for store selectors
 * @example
 * const selectUser = (state: AuthState) => state.user;
 */
export type StoreSelector<T, U> = (state: T) => U;
```

---

## Component Documentation

- JSDoc block above component function
- Describe purpose, usage context, and feature relationship:

```typescript
/**
 * Login form component
 * Demonstrates integration with auth hook and shadcn/ui components
 */
export function LoginForm(): ReactElement { /* ... */ }
```

---

## Store Documentation

Document the following:

1. **Store interface** — overall purpose
2. **State fields** — what each field represents
3. **Actions** — what they do and when to use them
4. **Selectors** — JSDoc on each selector

```typescript
/**
 * AuthState interface defining the shape of the authentication store
 */
export interface AuthState extends BaseStore {
  /* ... */
}

/**
 * Typed selectors for the auth store
 * Use these to avoid type inference issues and improve performance
 */
export const authSelectors = {
  /** Select the current user */
  user: (state: AuthState) => state.user,
};
```

---

## Hook Return Types

- Always define and export an explicit return type interface:

```typescript
/**
 * Return type for the useAuth hook
 */
interface UseAuthReturn {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<User>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
}

/**
 * Custom hook for authentication operations
 * Provides a clean API for accessing auth state and actions
 */
export function useAuth(): UseAuthReturn { /* ... */ }
```

---

## Inline Comments

- Use inline comments only for **non-obvious logic** — explain "why", not "what"
- Good: `// Only retry up to 10 times.`
- Bad: `// Set loading to true` (obvious from code)

---

## File-Level Comments

- Only add when the file's purpose is non-obvious
- Most barrel exports (`index.ts`) do NOT need file-level comments
- Config files and complex utilities benefit from brief explanations

---

## README Standards

The project `README.md` must include:

- Project description and tech stack
- Getting started instructions
- Available scripts
- Architecture overview
- Configuration guide

---

## Prohibitions

- NEVER leave TODO comments without a tracking issue reference
- NEVER use `@ts-ignore` or `@ts-expect-error` without explanation
- NEVER skip JSDoc on public APIs
