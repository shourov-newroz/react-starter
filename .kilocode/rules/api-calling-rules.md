# API Calling Rules

These rules define how the application communicates with backend APIs using SWR hooks.

---

## Core Principle: SWR-First Architecture

**SWR is the PRIMARY and RECOMMENDED method for all API interactions in this application.**
All HTTP requests (GET, POST, PUT, PATCH, DELETE) MUST be made using SWR hooks directly within React components.

### Why SWR?

- **Automatic caching and revalidation** — No manual cache management needed
- **Optimistic updates** — Instant UI feedback before server confirmation
- **Error retry** — Built-in error handling with automatic retries
- **Loading states** — Built-in loading indicators
- **TypeScript support** — Full type inference out of the box

---

## Prohibited Patterns

The following patterns are **STRICTLY PROHIBITED**:

### ❌ Never use apiClient directly

```typescript
// ❌ FORBIDDEN — Do NOT use apiClient in components
const response = await apiClient.get<User>('/users');
const response = await apiClient.post<User>('/users', data);
```

### ❌ Never use service layer pattern

```typescript
// ❌ FORBIDDEN — Do NOT create service files
export const userService = {
  getUsers: () => apiClient.get('/users'),
  createUser: (data) => apiClient.post('/users', data),
};
```

### ❌ Never use raw axios or fetch

```typescript
// ❌ FORBIDDEN
axios.get('/api/users');
fetch('/api/users');
```

---

## Allowed: SWR Hooks Only

All API calls MUST use SWR hooks directly within components:

```typescript
// ✅ CORRECT — Use SWR hooks directly
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
```

---

## API Endpoint Configuration

All API endpoints MUST be centralized in feature configuration files. Never hardcode URL strings in components.

### Creating API Endpoint Configuration

Create a `{feature}.config.ts` file in each feature's config directory:

```typescript
export const DASHBOARD_API_ENDPOINTS = {
  USER_PROFILE: '/api/users/me',
  // Dynamic endpoints with parameters
  GET_DATA: (id: string) => `/api/dashboard/activities/${id}`,
  GET_WITH_QUERY: (query: string) => `/api/dashboard/activities?${query}`,
} as const;

```

### Using Endpoint Configuration in Components

```typescript
import { DASHBOARD_API_ENDPOINTS } from '../config/dashboard.config';

function ProfilePage(): ReactElement {
  const { data, error, isLoading } = useSWR<ProfileResponse>(
    DASHBOARD_API_ENDPOINTS.USER_PROFILE
  );
  // ... rest of component
}
```

### ❌ Never Hardcode URLs

```typescript
// ❌ FORBIDDEN — Hardcoded URL
const { data } = useSWR('/api/users/me');

// ✅ CORRECT — Use centralized configuration
const { data } = useSWR(DASHBOARD_API_ENDPOINTS.USER_PROFILE);
```

---

## Type Definitions

All API responses follow these TypeScript interfaces:

```typescript
interface ApiResponse<T = unknown> {
  data: T;
  message?: string;
  success: boolean;
}

interface ApiError {
  message: string;
  code: string;
  status: number;
  details?: Record<string, unknown>;
}
```

---

## GET Requests: useSWR

Use `useSWR` for fetching data with automatic caching.

### Basic GET Request

```typescript
function UserList(): ReactElement {
  const { data, error, isLoading } = useSWR<UsersResponse>(
    DASHBOARD_API_ENDPOINTS.USER_PROFILE
  );

  if (isLoading) return <UserListSkeleton />;
  if (error) return <ErrorDisplay error={error} />;

  return <ul>{data?.users.map((user) => <li key={user.id}>{user.name}</li>)}</ul>;
}
```

### GET with Dynamic URL

```typescript
function UserProfile({ userId }: { userId: string }): ReactElement {
  const { data, error, isLoading } = useSWR<User>(
    userId ? ENDPOINT(userId) : null
  );

  if (isLoading) return <Skeleton />;
  return <div>{data?.name}</div>;
}
```

### GET with Query Parameters

```typescript
function SearchResults({ searchTerm, page }: SearchParams): ReactElement {
  const query = queryString({ q: searchTerm, page });
  const { data, isLoading } = useSWR<SearchResultsResponse>(ENDPOINT(query) );
  return <ResultsList results={data?.results} isLoading={isLoading} />;
}
```

---

## Mutation Requests: useSWRMutation

Use `useSWRMutation` for POST, PUT, PATCH, and DELETE operations. The pattern is consistent across all mutation types.

### Basic Mutation Pattern

```typescript
// POST - Create
const { trigger, isMutating } = useSWRMutation<CreateResponse, AxiosError<ApiError>, string, Payload>(
  ENDPOINT,
  apiClient.sendPostRequest,
  {
    onSuccess: () => { successToast('Created successfully'); }, 
    onError: (error) => { /* custom handling */ },
  }
);

// PUT - Update
const { trigger, isMutating } = useSWRMutation<User, AxiosError<ApiError>, string, Payload>(
  ENDPOINT(user.id),
  apiClient.sendPutRequest,
  { onSuccess: () => { successToast('Updated successfully'); } }
);

// PATCH - Partial Update
const { trigger, isMutating } = useSWRMutation<User, AxiosError<ApiError>, string, Partial<Payload>>(
  ENDPOINT(userId),
  apiClient.sendPatchRequest,
  { onSuccess: () => { successToast('Updated successfully'); } }
);

// DELETE - Remove
const { trigger, isMutating } = useSWRMutation<DeleteResponse, AxiosError<ApiError>, string, void>(
  ENDPOINT(userId),
  apiClient.sendDeleteRequest,
  { onSuccess: () => { successToast('Deleted successfully'); } }
);
```

---

## Cache Updates with mutate

Use the `mutate` function to update cached data after mutations.

### Revalidate After Mutation

```typescript
function CreateUserForm(): ReactElement {
  const { trigger } = useSWRMutation</* ... */>(ENDPOINT, apiClient.sendPostRequest, {
    onSuccess: () => {
      mutate(ENDPOINT); // Revalidate cache
      successToast('Created successfully');
    },
  });
  // ...
}
```

### Optimistic Updates

```typescript
function UpdateUserName({ userId }: { userId: string }): ReactElement {
  const { trigger } = useSWRMutation</* ... */>(ENDPOINT(userId), apiClient.sendPutRequest, {
    onSuccess: (data) => {
      mutate(ENDPOINT(userId), data, false);
    },
  });

  // Optimistic update before mutation
  const handleUpdate = async (newName: string): Promise<void> => {
    setName(newName);

    // Optimistically update the cache
    mutate(
      ENDPOINT(userId),
      (current: User | undefined) => ({ ...current, name: newName }),
      false
    );

    await trigger({ name: newName });
  };
  // ...
}
```

---

## Error Handling

SWR provides **two levels** of error handling: global and component-level.

### Global Error Handling (Automatic)

All errors are automatically handled through SWR's built-in error retry mechanism. The global `onError` callback in `@/lib/swr-config.ts` invokes `serverErrorHandler`, which:

- Logs errors via the `logger` for monitoring
- Shows toast notifications automatically for server-side validation errors

**This happens automatically - you don't need to do anything extra.**

### Component-Level Error Handling (Optional)

Component-level error handling is **OPTIONAL** and should only be used when you need to:

1. Display error messages inline in the UI
2. Perform component-specific error recovery actions
3. Show user-specific error messages based on context

If you don't need any of the above, you can rely entirely on global error handling.

#### When to Use Component-Level Error Handling

- **Display inline errors**: Show error message next to form fields
- **Custom error recovery**: Perform specific actions on error (e.g., redirect, reset form)
- **Different error messages**: Show context-specific messages

#### When to Skip Component-Level Error Handling

- Simple data fetching where errors are rare
- When global toast notifications are sufficient
- When you only need retry functionality

### Error Handling Pattern

```typescript
// With component-level error handling
function CreateUserForm(): ReactElement {
  const { trigger, error } = useSWRMutation</* ... */>(ENDPOINT, apiClient.sendPostRequest, {
    onSuccess: () => { successToast('Created'); },
      // Optional: Component-level error handling
      // Only needed if you want to show inline errors or custom handling
        // Global handler shows toast if error not handel on component level
    onError: (error) => { /* custom handling */ },
  });

  return (
    <form>
      {error && <p role="alert">{error.response?.data?.message}</p>}
    </form>
  );
}

// Without component-level error handling (relies on global)
function UserList(): ReactElement {
  const { data, error, isLoading } = useSWR<UsersResponse>(ENDPOINT);

  if (isLoading) return <LoadingSpinner />;
  if (error) {
    return (
      <div role="alert">
        <p>Failed to load users</p>
        <Button onClick={() => mutate(ENDPOINT)}>Retry</Button>
      </div>
    );
  }
  return <ul>{/* ... */}</ul>;
}
```

---

## Loading States

SWR provides built-in loading states:

| State | Description | Usage |
|-------|-------------|-------|
| `isLoading` | True while fetching for the first time | Show initial loading skeleton |
| `isValidating` | True while fetching or revalidating | Show updating indicator |
| `isMutating` | True during mutation (useSWRMutation) | Disable form buttons |

```typescript
function UserList(): ReactElement {
  const { data, isLoading, isValidating } = useSWR<UsersResponse>(ENDPOINT);

  return (
    <div>
      {isLoading ? <SkeletonList /> : <UserListComponent users={data?.users} />}
      {isValidating && !isLoading && <LoadingOverlay />}
    </div>
  );
}
```

---

## Authentication

Auth tokens are automatically injected via Axios interceptors. DO NOT pass tokens manually:

```typescript
// ❌ WRONG — Don't pass tokens manually
const { trigger } = useSWRMutation(ENDPOINT, async (url, { arg }) => {
  const response = await apiClient.post(url, arg, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data.data;
});

// ✅ CORRECT — Tokens handled by interceptors
const { trigger } = useSWRMutation(ENDPOINT, apiClient.sendPostRequest);
```

---

## SWR Configuration Reference

### useSWR Options

```typescript
const { data, error, isLoading, mutate } = useSWR<T>(
  key,           // URL or key
  fetcher,       // Optional: custom fetcher (uses default from swr-config)
  options        // SWR configuration options
);
```

### useSWRMutation Options

```typescript
const { trigger, isMutating } = useSWRMutation<T, E, K, P>(
  key,           // URL or key
  fetcher,       // Mutation function
  options        // Mutation options
);
```

### Common Options

| Option | Type | Description |
|--------|------|-------------|
| `onSuccess` | `(data) => void` | Callback on successful request |
| `onError` | `(error) => void` | Callback on error |
| `populateCache` | `(result, current) => newData` | Update cache with result |
| `revalidate` | `boolean` | Revalidate after mutation (default: true) |
| `onErrorRetry` | `(error, key, config, revalidate, opts) => void` | Custom error retry |

---

## Best Practices

1. **Always type your responses** — Use TypeScript generics: `useSWR<User[]>`
2. **Handle loading states** — Show appropriate UI for `isLoading` and `isMutating`
3. **Display errors clearly** — Use `role="alert"` for error messages
4. **Use optimistic updates** — Update UI immediately for better UX
5. **Revalidate after mutations** — Call `mutate(key)` to refresh cached data
6. **Disable forms during submission** — Use `isMutating` to prevent double submits
7. **Show toast notifications** — Provide feedback for all user actions
8. **Never use apiClient directly** — Always use SWR hooks for API calls
