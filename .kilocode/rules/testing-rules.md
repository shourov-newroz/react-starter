# Testing Rules

These rules define test coverage requirements and testing patterns for all AI-generated code.

---

## Framework

| Tool | Purpose |
|---|---|
| **Vitest** (v4) | Test runner, assertions, mocking |
| **Testing Library React** | Component rendering, DOM queries, user events |
| **MSW** (Mock Service Worker) | API mocking for integration tests |
| **jsdom** | DOM environment for tests |

---

## Test Coverage Mandate

**No feature may be created without tests.**

Every new module MUST have tests covering:

- ✅ Happy path (expected behavior)
- ✅ Error states (failure scenarios)
- ✅ Loading states (async operations)
- ✅ Edge cases (empty data, null values, boundary conditions)

---

## Test File Placement

- Tests are **co-located** with their source files
- Suffix: `.test.ts` or `.test.tsx`
- Examples:
  - `auth.store.ts` → `auth.store.test.ts` (same directory)
  - `ErrorBoundary.tsx` → `ErrorBoundary.test.tsx` (same directory)
  - `PrivateRouteGuard.tsx` → `PrivateRouteGuard.test.tsx` (same directory)

---

## Test Naming Convention

```typescript
describe('ModuleName', () => {
  it('should {expected behavior} when {condition}', () => {
    // ...
  });
});
```

Examples:

- `'should return the current user when authenticated'`
- `'should redirect to login when user is not authenticated'`
- `'should display error message when login fails'`

---

## Rendering Components

- Use custom `render()` from `@/tests/test-utils.tsx`
- This wraps components with `AllProviders` (I18n, SWR, Router)
- Options:

```typescript
import { render, screen } from '@/tests/test-utils';

// Default: with all providers
render(<MyComponent />);

// Without providers (isolated tests)
render(<MyComponent />, { withProviders: false });

// With custom SWR config
render(<MyComponent />, { swrConfig: { /* ... */ } });
```

---

## Vitest Globals

Vitest runs with `globals: true` — these are available without import:

- `describe`, `it`, `expect`, `test`
- `vi` (mock utilities)
- `beforeEach`, `afterEach`, `beforeAll`, `afterAll`

---

## Store Testing

- Reset Zustand stores in test setup/teardown:

```typescript
import { useAuthStore } from '@/features/auth';

afterEach(() => {
  useAuthStore.getState()._reset();
});
```

- Test initial state, action effects, and persistence behavior

---

## API Mocking (MSW)

- API mocks live in `src/tests/mocks/`
- Use MSW handlers for API simulation
- Pattern:

```typescript
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  http.get('/api/auth/me', () => {
    return HttpResponse.json({ data: mockUser, success: true });
  })
);
```

---

## What NOT to Test

**UI components are NOT tested directly.** Testing UI leads to brittle tests that break with every design change.

- ❌ Do NOT test UI components (buttons, cards, inputs)
- ✅ Test the functionality that uses these components

### What to Test Instead

| Instead of testing... | Test... |
|---|---|
| Button clicks | The action/mutation triggered by the click |
| Form rendering | Form validation logic in hooks |
| Card display | Data transformation and store state |
| Input fields | Input handling and state updates |

---

## What to Test by Module Type

### Components

- Renders correctly with expected props
- User interactions (clicks, inputs, form submissions)
- Conditional rendering (loading, error, empty states)
- Accessibility attributes (`role`, `aria-*`)
- Translation keys are rendered (not raw strings)

### Hooks

- Return values match expected shape
- State changes on action calls
- Side effects (API calls, localStorage)
- Cleanup on unmount

### Api Calls

- Correct API endpoint and method
- Request payload formatting
- Response data transformation
- Error propagation

### Stores

- Initial state matches `initialState`
- Actions update state correctly
- `_reset()` restores initial state
- Persistence configuration (partialize)

### Utilities

- Pure function input/output
- Edge cases (null, undefined, empty)
- Error handling

---

## ESLint Relaxation in Tests

These rules are relaxed in test files (`*.test.ts`, `*.test.tsx`):

- `@typescript-eslint/no-explicit-any` → `warn` (not `error`)
- `i18next/no-literal-string` → `off`

---

## Async Testing

- Use `waitFor` for async assertions:

```typescript
import { waitFor } from '@/tests/test-utils';

await waitFor(() => {
  expect(screen.getByText('Success')).toBeInTheDocument();
});
```

- Use `waitForNextTick()` helper for micro-task-based async:

```typescript
import { waitForNextTick } from '@/tests/test-utils';

await waitForNextTick();
expect(result).toBe(expected);
```

---

## User Event Testing

- Use `userEvent` for realistic user interactions:

```typescript
import { userEvent } from '@/tests/test-utils';

const user = userEvent.setup();
await user.click(screen.getByRole('button'));
await user.type(screen.getByLabelText('Email'), 'test@example.com');
```

---

## Test Utilities Available

From `@/tests/test-utils.tsx`:

| Utility | Purpose |
|---|---|
| `render(ui, options?)` | Render with providers |
| `renderWithProviders(ui, options?)` | Explicit provider wrapping |
| `screen` | DOM queries |
| `fireEvent` | DOM events |
| `waitFor` | Async assertions |
| `within` | Scoped queries |
| `userEvent` | Realistic user interactions |
| `waitForNextTick()` | Wait for micro-task queue |
| `mockMatchMedia()` | Mock `window.matchMedia` |
