# Error Handling Rules

These rules define how errors must be handled across the application.

---

## Error Type System

All application errors MUST conform to `AppError` from `@/types/error.types.ts`:

```typescript
interface AppError extends Error {
  type: ErrorType;
  code?: string;
  statusCode?: number;
  details?: Record<string, unknown>;
  timestamp: string;
}
```

### Error Type Enum

Use `ErrorType` from `@/types/error.types.ts` for categorization:

```typescript
enum ErrorType {
  NETWORK = 'NETWORK_ERROR',
  VALIDATION = 'VALIDATION_ERROR',
  AUTH = 'AUTH_ERROR',
  NOT_FOUND = 'NOT_FOUND',
  SERVER = 'SERVER_ERROR',
  UNKNOWN = 'UNKNOWN_ERROR',
}
```

---

## Error Normalization

- All unknown errors MUST pass through `normalizeError()` from `@/lib/error.ts`
- This function converts any error into a structured `AppError`
- Handles:
  - API errors (with `message`, `code`, `status`) → mapped to appropriate `ErrorType`
  - Standard `Error` instances → `ErrorType.UNKNOWN`
  - Unknown values → generic `AppError` with `UNKNOWN_ERROR`

---

## Error Boundaries

### Global ErrorBoundary

- Located at `@/components/ErrorBoundary.tsx`
- Class component (required by React for `getDerivedStateFromError`)
- Wraps every route in `App.tsx`
- Logs errors via `logger.error()` with component stack
- Supports custom fallback via `fallback` prop
- Default fallback shows:
  - Translated error title
  - Error message
  - Reload button

### Usage Pattern

```tsx
<ErrorBoundary>
  <Suspense fallback={<LoadingFallback />}>
    {element}
  </Suspense>
</ErrorBoundary>
```

---

## Suspense Boundaries

- Every lazy-loaded page MUST have `<Suspense fallback={<LoadingFallback />}>`
- `LoadingFallback` is from `@/components/LoadingFallback.tsx`
- Applied automatically in `App.tsx` route rendering

---

## Logging

### Logger Usage

- Use `logger` from `@/lib/logger.ts` for ALL logging
- **NEVER use `console.log`, `console.warn`, or `console.error` directly**

### Logger Methods

| Method | Purpose | Production Behavior |
|---|---|---|
| `logger.debug(message, context?)` | Debug information | Suppressed (not logged) |
| `logger.info(message, context?)` | Informational logs | Sent to monitoring |
| `logger.warn(message, context?)` | Warnings | Sent to monitoring |
| `logger.error(message, error?, context?)` | Error logs | Sent to monitoring |

### Logger Context

- Always include relevant context as the second/third argument:

```typescript
logger.error('API Error', error as Error, {
  method: error.config?.method?.toUpperCase(),
  url: error.config?.url,
  status: error.response?.status,
  requestId,
});
```

---

## API Error Handling

The application uses **SWR-based error handling** with two levels of coverage:

### Global Error Handling

- SWR's global configuration in `@/lib/swr-config.ts` automatically handles all API errors
- The `onError` callback invokes `serverErrorHandler` from `@/lib/serverErrorHandler.ts`
- `serverErrorHandler`:
  - Logs errors via `logger` for monitoring
  - Handles server-side validation errors automatically
- Error retry logic is configured in `onErrorRetry`:
  - Never retries on 404 errors
  - Retries up to 3 times with 5-second delays

### Component-Level Error Handling

For custom error handling in components, use the `onError` option in SWR hooks:

```typescript
const { data, error } = useSWR<User>(ENDPOINT, {
  onError: (error) => {
    // Custom error handling
  }
});
```

For mutations:

```typescript
const { trigger } = useSWRMutation(ENDPOINT, apiClient.sendPostRequest, {
  onError: (error) => {
    // Custom error handling
  }
});
```

### Error Retry Configuration

SWR automatically retries failed requests with configurable behavior:

| Option | Default | Description |
|--------|---------|-------------|
| `shouldRetryOnError` | `true` | Enable/disable auto-retry |
| `errorRetryCount` | `3` | Maximum retry attempts |
| Custom `onErrorRetry` | See below | Override retry behavior |

The default retry behavior:

- Does NOT retry on 404 (Not Found) errors
- Retries up to 3 times
- Waits 5 seconds between retries

---

## Component-Level Error Handling

- Display errors via component state (from hooks/stores)
- NEVER expose raw error messages to users
- Use `role="alert"` for accessibility:

```tsx
{error && (
  <p className="text-sm text-destructive" role="alert">
    {error}
  </p>
)}
```

---

## Async Error Pattern

Always use `try/catch/finally` for async operations:

```typescript
const performAction = async (): Promise<void> => {
  setLoading(true);
  setError(null);

  try {
    const result = await someAsyncOperation();
    setData(result);
  } catch {
    const errorMessage = 'Operation failed. Please try again.';
    setError(errorMessage);
    throw new Error(errorMessage);
  } finally {
    setLoading(false); // ALWAYS in finally block
  }
};
```

---

## Prohibitions

- NEVER use `console.log/warn/error` — use `logger`
- NEVER expose raw error details to users
- NEVER swallow errors silently (always log or re-throw)
- NEVER skip `finally` block for loading state cleanup
