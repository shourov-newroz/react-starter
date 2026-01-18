# Enterprise React + Vite + TypeScript Frontend Setup - Sprint Backlog

## 📋 Executive Summary

### Project Scope

This is a **greenfield project** to build a production-grade React frontend foundation from scratch with enterprise-ready architecture, strict quality gates, and modular scalability.

### Current State

- ❌ No existing codebase
- ❌ No infrastructure
- ❌ No tooling configured

### Implementation Scope

- ✅ Complete project scaffolding with React 18+ Vite 6+ TypeScript 5+
- ✅ Strict linting, formatting, and git hooks
- ✅ Zustand + SWR + Axios data layer
- ✅ Tailwind CSS + shadcn/ui design system
- ✅ Feature-based modular architecture
- ✅ Vitest + Testing Library + MSW testing infrastructure
- ✅ Observability and error handling foundation
- ✅ CI-ready scripts and configuration
- ✅ Comprehensive documentation

### Estimated Effort

- **Total Stories**: 8 major stories
- **Estimated Points**: 40-50 story points
- **Recommended Team Size**: 2-3 frontend engineers
- **Duration**: 2-3 sprints (4-6 weeks)

---

## 📦 Story 0: Project Initialization & Scaffolding

**Goal**: Bootstrap the project with latest stable versions of React, Vite, and TypeScript.

**Acceptance Criteria**:

- Project runs locally with `npm run dev`
- TypeScript compiles without errors
- Strict mode enabled
- Clean folder structure established

### Tasks

- [x] **Initialize Vite project with React + TypeScript template**
  - Run: `npm create vite@latest . -- --template react-ts`
  - Verify Node.js LTS version (18.x or 20.x)
  - Commit initial scaffold

- [x] **Configure package.json with project metadata**
  - Set project name, version, description
  - Add `"type": "module"` for ES modules
  - Set `"private": true`
  - Add author and license information

- [x] **Update to latest stable dependencies**
  - Update React to latest stable (19.2.x)
  - Update Vite to latest stable (7.x)
  - Update TypeScript to latest stable (5.x)
  - Update all peer dependencies
  - Run `npm install` and verify no vulnerabilities

- [x] **Create base folder structure**

  ```
  src/
  ├── app/
  ├── features/
  ├── components/
  ├── hooks/
  ├── services/
  ├── stores/
  ├── lib/
  ├── styles/
  ├── types/
  ├── config/
  └── tests/
  ```

  - Create empty `.gitkeep` files in each directory
  - Update `.gitignore` with common exclusions

- [x] **Verify development server works**
  - Run `npm run dev`
  - Open browser to localhost
  - Confirm hot module replacement works
  - Test TypeScript compilation

---

## 📦 Story 1: TypeScript Strict Configuration

**Goal**: Enforce strict TypeScript configuration for maximum type safety.

**Acceptance Criteria**:

- `tsconfig.json` has `"strict": true`
- No implicit `any` allowed
- Path aliases configured
- IDE autocomplete works

### Tasks

- [x] **Configure strict TypeScript in tsconfig.json**

  ```json
  {
    "compilerOptions": {
      "strict": true,
      "noImplicitAny": true,
      "strictNullChecks": true,
      "strictFunctionTypes": true,
      "strictBindCallApply": true,
      "strictPropertyInitialization": true,
      "noImplicitThis": true,
      "alwaysStrict": true,
      "noUnusedLocals": true,
      "noUnusedParameters": true,
      "noImplicitReturns": true,
      "noFallthroughCasesInSwitch": true,
      "noUncheckedIndexedAccess": true
    }
  }
  ```

  - Commit configuration
  - Verify project still compiles

- [x] **Configure path aliases**
  - Add to `tsconfig.json`:
    ```json
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@/app/*": ["src/app/*"],
      "@/features/*": ["src/features/*"],
      "@/components/*": ["src/components/*"],
      "@/hooks/*": ["src/hooks/*"],
      "@/services/*": ["src/services/*"],
      "@/stores/*": ["src/stores/*"],
      "@/lib/*": ["src/lib/*"],
      "@/styles/*": ["src/styles/*"],
      "@/types/*": ["src/types/*"],
      "@/config/*": ["src/config/*"],
      "@/tests/*": ["src/tests/*"]
    }
    ```

- [x] **Configure Vite to recognize path aliases**
  - Install `@types/node`: `npm install -D @types/node`
  - Update `vite.config.ts`:

    ```typescript
    import { defineConfig } from 'vite';
    import react from '@vitejs/plugin-react';
    import path from 'path';

    export default defineConfig({
      plugins: [react()],
      resolve: {
        alias: {
          '@': path.resolve(__dirname, './src'),
          '@/app': path.resolve(__dirname, './src/app'),
          // ... other aliases
        },
      },
    });
    ```

- [x] **Create global type definitions**
  - Create `src/types/global.d.ts`
  - Create `src/types/env.d.ts` for environment variables
  - Export from `src/types/index.ts`

- [x] **Test path aliases**
  - Create test import using `@/` alias
  - Verify IDE autocomplete works
  - Verify build works with aliases

---

## 📦 Story 2: ESLint + Prettier + Code Quality

**Goal**: Set up strict linting, formatting, and automated quality checks.

**Acceptance Criteria**:

- ESLint catches TypeScript and React violations
- Prettier formats on save
- No linting or formatting errors
- Configuration is shareable and consistent

### Tasks

- [x] **Install ESLint dependencies**

  ```bash
  npm install -D eslint @eslint/js @types/eslint__js typescript-eslint
  npm install -D eslint-plugin-react eslint-plugin-react-hooks
  npm install -D eslint-plugin-react-refresh eslint-plugin-jsx-a11y
  npm install -D eslint-plugin-import
  ```

- [x] **Create eslint.config.js (flat config)**
  - Use new ESLint flat config format
  - Enable TypeScript strict rules
  - Enable React and React Hooks rules
  - Enable accessibility rules (jsx-a11y)
  - Enable import sorting and validation
  - Disable rules that conflict with Prettier
  - Add custom rules:
    - No `any` types
    - No unused variables
    - No console.log in production
    - Enforce explicit function return types for exported functions

- [x] **Install Prettier**

  ```bash
  npm install -D prettier eslint-config-prettier eslint-plugin-prettier
  ```

- [x] **Create .prettierrc.json**

  ```json
  {
    "semi": true,
    "trailingComma": "es5",
    "singleQuote": true,
    "printWidth": 100,
    "tabWidth": 2,
    "useTabs": false,
    "arrowParens": "always",
    "endOfLine": "lf"
  }
  ```

- [x] **Create .prettierignore**
  - Add build directories
  - Add node_modules
  - Add coverage reports
  - Add .env files

- [x] **Add lint and format scripts to package.json**

  ```json
  {
    "scripts": {
      "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
      "lint:fix": "eslint . --ext ts,tsx --fix",
      "format": "prettier --write \"src/**/*.{ts,tsx,json,css,md}\"",
      "format:check": "prettier --check \"src/**/*.{ts,tsx,json,css,md}\""
    }
  }
  ```

- [x] **Run and fix initial linting errors**
  - Run `npm run lint`
  - Fix all errors and warnings
  - Run `npm run format`
  - Commit clean codebase

- [x] **Configure VS Code settings (optional)**
  - Create `.vscode/settings.json`
  - Enable format on save
  - Set Prettier as default formatter
  - Enable ESLint auto-fix on save

---

## 📦 Story 3: Git Hooks & Commit Quality Gates

**Goal**: Prevent bad code from being committed using Husky, lint-staged, and commitlint.

**Acceptance Criteria**:

- Pre-commit hook runs linting and formatting
- Commit messages follow Conventional Commits
- Bad commits are blocked
- CI pipeline ready

### Tasks

- [x] **Install Husky**

  ```bash
  npm install -D husky
  npx husky init
  ```

- [x] **Install lint-staged**

  ```bash
  npm install -D lint-staged
  ```

- [x] **Configure lint-staged in package.json**

  ```json
  {
    "lint-staged": {
      "*.{ts,tsx}": ["eslint --fix", "prettier --write"],
      "*.{json,css,md}": ["prettier --write"]
    }
  }
  ```

- [x] **Create pre-commit hook**
  - Edit `.husky/pre-commit`:

    ```bash
    #!/usr/bin/env sh
    . "$(dirname -- "$0")/_/husky.sh"

    npx lint-staged
    ```

  - Make executable: `chmod +x .husky/pre-commit`

- [x] **Install commitlint**

  ```bash
  npm install -D @commitlint/cli @commitlint/config-conventional
  ```

- [x] **Create commitlint.config.js**

  ```javascript
  export default {
    extends: ['@commitlint/config-conventional'],
    rules: {
      'type-enum': [
        2,
        'always',
        [
          'feat',
          'fix',
          'docs',
          'style',
          'refactor',
          'perf',
          'test',
          'chore',
          'revert',
          'ci',
          'build',
        ],
      ],
    },
  };
  ```

- [x] **Create commit-msg hook**
  - Edit `.husky/commit-msg`:

    ```bash
    #!/usr/bin/env sh
    . "$(dirname -- "$0")/_/husky.sh"

    npx --no -- commitlint --edit $1
    ```

  - Make executable: `chmod +x .husky/commit-msg`

- [x] **Test hooks**
  - Make a small change
  - Try committing with bad message → should fail
  - Try committing with bad code → should fail
  - Commit with proper format → should succeed

- [x] **Document commit conventions**
  - Add section to README about commit message format
  - Provide examples:
    - `feat: add user authentication`
    - `fix: resolve header alignment issue`
    - `docs: update API documentation`

---

## 📦 Story 4: Tailwind CSS + shadcn/ui Setup

**Goal**: Set up Tailwind CSS with shadcn/ui component library and design system foundation.

**Acceptance Criteria**:

- Tailwind CSS works with Vite
- shadcn/ui components can be added
- Theme configuration established
- Debug screens enabled in dev

### Tasks

- [x] **Install Tailwind CSS**

  ```bash
  npm install -D tailwindcss postcss autoprefixer
  npx tailwindcss init -p
  ```

- [x] **Configure Tailwind in tailwind.config.js**

  ```javascript
  /** @type {import('tailwindcss').Config} */
  export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
      extend: {
        colors: {
          // Add design tokens
        },
        spacing: {
          // Add custom spacing
        },
        typography: {
          // Add typography tokens
        },
      },
    },
    plugins: [],
  };
  ```

- [x] **Create global CSS file**
  - Create `src/styles/index.css`:

    ```css
    @tailwind base;
    @tailwind components;
    @tailwind utilities;

    @layer base {
      :root {
        /* CSS variables for theming */
      }
    }
    ```

  - Import in `src/app/main.tsx`

- [x] **Install shadcn/ui CLI**

  ```bash
  npx shadcn@latest init
  ```

  - Choose TypeScript
  - Choose appropriate style (default/new-york)
  - Set up components directory: `src/components/ui`
  - Configure path aliases for components

- [x] **Update tailwind.config.js for shadcn**
  - Add theme variables
  - Add CSS variable support
  - Configure dark mode (class strategy)

- [x] **Install tailwindcss-debug-screens**

  ```bash
  npm install -D tailwindcss-debug-screens
  ```

  - Add to plugins in `tailwind.config.js` (dev only)
  - Configure to show only in development

- [x] **Add first shadcn component as example**

  ```bash
  npx shadcn@latest add button
  ```

  - Create test component using Button
  - Verify styling works
  - Verify dark mode toggle works

- [x] **Create design token documentation**
  - Document color palette
  - Document spacing scale
  - Document typography system
  - Create example component showcasing tokens

---

## 📦 Story 5: Environment Configuration & Validation

**Goal**: Set up environment variable management with runtime validation using Zod.

**Acceptance Criteria**:

- `.env` files properly configured
- Environment variables validated at runtime
- Type-safe access to config
- Build vs runtime config separated

### Tasks

- [x] **Install Zod**

  ```bash
  npm install zod
  ```

- [x] **Create .env.example**

  ```bash
  # API Configuration
  VITE_API_BASE_URL=http://localhost:3000/api
  VITE_API_TIMEOUT=30000

  # Feature Flags
  VITE_ENABLE_ANALYTICS=false
  VITE_ENABLE_SENTRY=false

  # Environment
  VITE_APP_ENV=development
  ```

- [x] **Create environment schema**
  - Create `src/config/env.ts`:

    ```typescript
    import { z } from 'zod';

    const envSchema = z.object({
      VITE_API_BASE_URL: z.string().url(),
      VITE_API_TIMEOUT: z.coerce.number().positive(),
      VITE_ENABLE_ANALYTICS: z.coerce.boolean(),
      VITE_ENABLE_SENTRY: z.coerce.boolean(),
      VITE_APP_ENV: z.enum(['development', 'staging', 'production']),
    });

    export type Env = z.infer<typeof envSchema>;

    function validateEnv(): Env {
      const parsed = envSchema.safeParse(import.meta.env);

      if (!parsed.success) {
        console.error('Invalid environment variables:', parsed.error.format());
        throw new Error('Invalid environment variables');
      }

      return parsed.data;
    }

    export const env = validateEnv();
    ```

- [x] **Create config module**
  - Create `src/config/index.ts`:

    ```typescript
    import { env } from './env';

    export const config = {
      api: {
        baseURL: env.VITE_API_BASE_URL,
        timeout: env.VITE_API_TIMEOUT,
      },
      features: {
        analytics: env.VITE_ENABLE_ANALYTICS,
        sentry: env.VITE_ENABLE_SENTRY,
      },
      environment: env.VITE_APP_ENV,
      isDevelopment: env.VITE_APP_ENV === 'development',
      isProduction: env.VITE_APP_ENV === 'production',
    } as const;

    export { env };
    ```

- [x] **Create .env for local development**
  - Copy from `.env.example`
  - Add to `.gitignore`
  - Set appropriate local values

- [x] **Test environment validation**
  - Remove required env var → should throw error
  - Set invalid value → should throw error
  - Import config in component → should have full type support

- [x] **Document environment setup**
  - Add to README
  - List all required variables
  - Explain validation behavior
  - Provide setup instructions for different environments

---

## 📦 Story 6: Axios + SWR Configuration

**Goal**: Set up centralized Axios instance with interceptors and SWR global configuration.

**Acceptance Criteria**:

- Single Axios instance with base config
- Request/response interceptors implemented
- SWR configured globally
- Typed API responses
- Error normalization working

### Tasks

- [x] **Install Axios and SWR**

  ```bash
  npm install axios swr
  ```

- [x] **Create API error types**
  - Create `src/types/api.types.ts`:

    ```typescript
    export interface ApiError {
      message: string;
      code: string;
      status: number;
      details?: Record<string, unknown>;
    }

    export interface ApiResponse<T = unknown> {
      data: T;
      message?: string;
      success: boolean;
    }
    ```

- [x] **Create Axios instance**
  - Create `src/services/axios.ts`:

    ```typescript
    import axios, { AxiosError, AxiosResponse } from 'axios';
    import { config } from '@/config';
    import type { ApiError, ApiResponse } from '@/types/api.types';

    export const axiosInstance = axios.create({
      baseURL: config.api.baseURL,
      timeout: config.api.timeout,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor
    axiosInstance.interceptors.request.use(
      (config) => {
        // Add auth token if exists
        const token = localStorage.getItem('auth_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        // Add request tracing
        config.headers['X-Request-ID'] = crypto.randomUUID();

        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor
    axiosInstance.interceptors.response.use(
      (response: AxiosResponse<ApiResponse>) => response,
      (error: AxiosError<ApiError>) => {
        const normalizedError: ApiError = {
          message: error.response?.data?.message || error.message,
          code: error.response?.data?.code || 'UNKNOWN_ERROR',
          status: error.response?.status || 500,
          details: error.response?.data?.details,
        };

        return Promise.reject(normalizedError);
      }
    );

    export default axiosInstance;
    ```

- [x] **Create API client wrapper**
  - Create `src/services/api-client.ts`:

    ```typescript
    import axiosInstance from './axios';
    import type { ApiResponse } from '@/types/api.types';

    export const apiClient = {
      get: <T>(url: string, config = {}) => axiosInstance.get<ApiResponse<T>>(url, config),

      post: <T>(url: string, data?: unknown, config = {}) =>
        axiosInstance.post<ApiResponse<T>>(url, data, config),

      put: <T>(url: string, data?: unknown, config = {}) =>
        axiosInstance.put<ApiResponse<T>>(url, data, config),

      patch: <T>(url: string, data?: unknown, config = {}) =>
        axiosInstance.patch<ApiResponse<T>>(url, data, config),

      delete: <T>(url: string, config = {}) => axiosInstance.delete<ApiResponse<T>>(url, config),
    };
    ```

- [x] **Configure SWR globally**
  - Create `src/lib/swr-config.ts`:

    ```typescript
    import type { SWRConfiguration } from 'swr';
    import { apiClient } from '@/services/api-client';

    export const swrConfig: SWRConfiguration = {
      fetcher: (url: string) => apiClient.get(url).then((res) => res.data.data),
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      shouldRetryOnError: true,
      errorRetryCount: 3,
      dedupingInterval: 2000,
      focusThrottleInterval: 5000,
      onError: (error) => {
        console.error('SWR Error:', error);
        // Could add error tracking here
      },
    };
    ```

- [x] **Add SWRConfig to providers**
  - Update `src/app/providers.tsx`:

    ```typescript
    import { SWRConfig } from 'swr';
    import { swrConfig } from '@/lib/swr-config';

    export function Providers({ children }: { children: React.ReactNode }) {
      return <SWRConfig value={swrConfig}>{children}</SWRConfig>;
    }
    ```

- [x] **Create example API service**
  - Create `src/services/example.service.ts` with typed methods
  - Show proper typing with generics
  - Document usage pattern

- [x] **Test API setup**
  - Create test component that fetches data with SWR
  - Verify error handling
  - Verify request interceptors
  - Verify response normalization

---

## 📦 Story 7: Zustand Store Architecture

**Goal**: Implement feature-scoped Zustand stores with proper typing and selectors.

**Acceptance Criteria**:

- Example store created
- Selectors properly typed
- Store logic isolated
- No mutable state
- Devtools integrated

### Tasks

- [x] **Install Zustand**

  ```bash
  npm install zustand
  ```

- [x] **Create store types**
  - Create `src/types/store.types.ts`:

    ```typescript
    export type StoreSelector<T, U> = (state: T) => U;

    export interface BaseStore {
      _reset: () => void;
    }
    ```

- [x] **Create example auth store**
  - Create `src/features/auth/store/auth.store.ts`:

    ```typescript
    import { create } from 'zustand';
    import { devtools, persist } from 'zustand/middleware';
    import type { BaseStore } from '@/types/store.types';

    interface User {
      id: string;
      email: string;
      name: string;
    }

    interface AuthState extends BaseStore {
      user: User | null;
      isAuthenticated: boolean;
      isLoading: boolean;
      error: string | null;

      // Actions
      setUser: (user: User) => void;
      clearUser: () => void;
      setLoading: (isLoading: boolean) => void;
      setError: (error: string | null) => void;
    }

    const initialState = {
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    };

    export const useAuthStore = create<AuthState>()(
      devtools(
        persist(
          (set) => ({
            ...initialState,

            setUser: (user) => set({ user, isAuthenticated: true, error: null }),

            clearUser: () => set({ user: null, isAuthenticated: false }),

            setLoading: (isLoading) => set({ isLoading }),

            setError: (error) => set({ error, isLoading: false }),

            _reset: () => set(initialState),
          }),
          {
            name: 'auth-storage',
            partialize: (state) => ({
              user: state.user,
              isAuthenticated: state.isAuthenticated,
            }),
          }
        ),
        { name: 'AuthStore' }
      )
    );

    // Typed selectors
    export const authSelectors = {
      user: (state: AuthState) => state.user,
      isAuthenticated: (state: AuthState) => state.isAuthenticated,
      isLoading: (state: AuthState) => state.isLoading,
      error: (state: AuthState) => state.error,
    };
    ```

- [x] **Create store best practices guide**
  - Document selector patterns
  - Document action patterns
  - Show examples of computed values
  - Explain state normalization

- [x] **Create custom hooks for store**
  - Create `src/features/auth/hooks/use-auth.ts`:

    ```typescript
    import { useCallback } from 'react';
    import { useAuthStore, authSelectors } from '../store/auth.store';
    import type { User } from '../auth.types';

    export function useAuth() {
      const user = useAuthStore(authSelectors.user);
      const isAuthenticated = useAuthStore(authSelectors.isAuthenticated);
      const isLoading = useAuthStore(authSelectors.isLoading);
      const error = useAuthStore(authSelectors.error);

      const setUser = useAuthStore((state) => state.setUser);
      const clearUser = useAuthStore((state) => state.clearUser);
      const setLoading = useAuthStore((state) => state.setLoading);

      const login = useCallback(
        async (email: string, password: string) => {
          setLoading(true);
          try {
            // API call here
            const user: User = { id: '1', email, name: 'Test' };
            setUser(user);
          } catch (error) {
            useAuthStore.getState().setError('Login failed');
          }
        },
        [setUser, setLoading]
      );

      const logout = useCallback(() => {
        clearUser();
        localStorage.removeItem('auth_token');
      }, [clearUser]);

      return {
        user,
        isAuthenticated,
        isLoading,
        error,
        login,
        logout,
      };
    }
    ```

- [x] **Test store**
  - Create component using store
  - Verify state updates
  - Verify persistence works
  - Verify devtools integration
  - Check for unnecessary re-renders

- [x] **Document Zustand patterns**
  - Add to README
  - Explain store structure
  - Show selector optimization
  - Provide anti-patterns to avoid

---

## 📦 Story 8: Feature Module Example (Auth)

**Goal**: Create a complete feature module example with all architectural patterns.

**Acceptance Criteria**:

- Feature has its own components, hooks, services, store
- Tests included
- Follows modular architecture
- Can be used as template

### Tasks

- [x] **Create auth feature structure**

  ```
  src/features/auth/
  ├── components/
  │   ├── LoginForm.tsx
  │   ├── LoginForm.test.tsx
  │   └── index.ts
  ├── hooks/
  │   ├── use-auth.ts
  │   ├── use-auth.test.ts
  │   └── index.ts
  ├── services/
  │   ├── auth.service.ts
  │   ├── auth.service.test.ts
  │   └── index.ts
  ├── store/
  │   ├── auth.store.ts
  │   ├── auth.store.test.ts
  │   └── index.ts
  ├── auth.types.ts
  └── index.ts
  ```

- [x] **Create auth types**
  - Create `src/features/auth/auth.types.ts`:

    ```typescript
    export interface User {
      id: string;
      email: string;
      name: string;
      role: 'admin' | 'user';
    }

    export interface LoginCredentials {
      email: string;
      password: string;
    }

    export interface AuthResponse {
      user: User;
      token: string;
    }
    ```

- [x] **Create auth service**
  - Create `src/features/auth/services/auth.service.ts`:

    ```typescript
    import { apiClient } from '@/services/api-client';
    import type { LoginCredentials, AuthResponse } from '../auth.types';

    export const authService = {
      login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
        const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
        return response.data.data;
      },

      logout: async (): Promise<void> => {
        await apiClient.post('/auth/logout');
      },

      getCurrentUser: async () => {
        const response = await apiClient.get('/auth/me');
        return response.data.data;
      },
    };
    ```

- [x] **Create LoginForm component**
  - Create `src/features/auth/components/LoginForm.tsx`
  - Use shadcn/ui Button and Input
  - Integrate with auth hook
  - Add form validation
  - Add loading and error states

- [x] **Create barrel exports**
  - Export from each subdirectory index.ts
  - Export from feature root index.ts
  - Ensure clean public API

- [x] **Add auth route example**
  - Show how feature integrates with routing
  - Demonstrate protected route pattern
  - Document navigation patterns

---

## 📦 Story 9: Testing Infrastructure (Vitest + Testing Library)

**Goal**: Set up comprehensive testing infrastructure with Vitest, Testing Library, and MSW.

**Acceptance Criteria**:

- Vitest configured and working
- Testing Library integrated
- MSW for API mocking
- Test utilities created
- Example tests written
- Coverage thresholds set

### Tasks

- [x] **Install testing dependencies**

  ```bash
  npm install -D vitest @vitest/ui @vitest/coverage-v8
  npm install -D @testing-library/react @testing-library/jest-dom
  npm install -D @testing-library/user-event
  npm install -D jsdom
  npm install -D msw
  ```

- [x] **Configure Vitest**
  - Create `vitest.config.ts`:

    ```typescript
    import { defineConfig } from 'vitest/config';
    import react from '@vitejs/plugin-react';
    import path from 'path';

    export default defineConfig({
      plugins: [react()],
      test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './src/tests/setup.ts',
        coverage: {
          provider: 'v8',
          reporter: ['text', 'json', 'html'],
          exclude: [
            'node_modules/',
            'src/tests/',
            '**/*.d.ts',
            '**/*.config.*',
            '**/mockData/*',
            '**/*.test.*',
          ],
          thresholds: {
            lines: 80,
            functions: 80,
            branches: 80,
            statements: 80,
          },
        },
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, './src'),
        },
      },
    });
    ```

- [x] **Create test setup file**
  - Create `src/tests/setup.ts`:

    ```typescript
    import { afterEach, beforeAll, afterAll } from 'vitest';
    import { cleanup } from '@testing-library/react';
    import '@testing-library/jest-dom/vitest';
    import { server } from './mocks/server';

    // Start MSW server
    beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
    afterEach(() => {
      cleanup();
      server.resetHandlers();
    });
    afterAll(() => server.close());
    ```

- [x] **Set up MSW**
  - Create `src/tests/mocks/handlers.ts`:

    ```typescript
    import { http, HttpResponse } from 'msw';
    import { config } from '@/config';

    export const handlers = [
      http.post(`${config.api.baseURL}/auth/login`, () => {
        return HttpResponse.json({
          success: true,
          data: {
            user: {
              id: '1',
              email: 'test@example.com',
              name: 'Test User',
              role: 'user',
            },
            token: 'mock-token',
          },
        });
      }),
    ];
    ```

  - Create `src/tests/mocks/server.ts`:

    ```typescript
    import { setupServer } from 'msw/node';
    import { handlers } from './handlers';

    export const server = setupServer(...handlers);
    ```

- [x] **Create test utilities**
  - Create `src/tests/test-utils.tsx`:

    ```typescript
    import { ReactElement } from 'react';
    import { render, RenderOptions } from '@testing-library/react';
    import { SWRConfig } from 'swr';
    import { Providers } from '@/app/providers';

    interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
      withProviders?: boolean;
    }

    function AllProviders({ children }: { children: React.ReactNode }) {
      return (
        <SWRConfig value={{ provider: () => new Map() }}>
          <Providers>{children}</Providers>
        </SWRConfig>
      );
    }

    export function renderWithProviders(
      ui: ReactElement,
      options?: CustomRenderOptions
    ) {
      const { withProviders = true, ...renderOptions } = options || {};

      return render(ui, {
        wrapper: withProviders ? AllProviders : undefined,
        ...renderOptions,
      });
    }

    export * from '@testing-library/react';
    export { renderWithProviders as render };
    ```

- [x] **Write example component test**
  - Create `src/features/auth/components/LoginForm.test.tsx`:

    ```typescript
    import { describe, it, expect, vi } from 'vitest';
    import { render, screen, waitFor } from '@/tests/test-utils';
    import userEvent from '@testing-library/user-event';
    import { LoginForm } from './LoginForm';

    describe('LoginForm', () => {
      it('renders login form', () => {
        render(<LoginForm />);
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
      });

      it('submits form with valid data', async () => {
        const user = userEvent.setup();
        render(<LoginForm />);

        await user.type(screen.getByLabelText(/email/i), 'test@example.com');
        await user.type(screen.getByLabelText(/password/i), 'password123');
        await user.click(screen.getByRole('button', { name: /login/i }));

        await waitFor(() => {
          expect(screen.queryByText(/logging in/i)).not.toBeInTheDocument();
        });
      });
    });
    ```

- [x] **Write example store test**
  - Create `src/features/auth/store/auth.store.test.ts`:

    ```typescript
    import { describe, it, expect, beforeEach } from 'vitest';
    import { useAuthStore } from './auth.store';
    import type { User } from '../auth.types';

    describe('authStore', () => {
      beforeEach(() => {
        useAuthStore.getState()._reset();
      });

      it('sets user correctly', () => {
        const user: User = {
          id: '1',
          email: 'test@example.com',
          name: 'Test',
          role: 'user',
        };

        useAuthStore.getState().setUser(user);

        expect(useAuthStore.getState().user).toEqual(user);
        expect(useAuthStore.getState().isAuthenticated).toBe(true);
      });
    });
    ```

- [x] **Add test scripts to package.json**

  ```json
  {
    "scripts": {
      "test": "vitest",
      "test:ui": "vitest --ui",
      "test:run": "vitest run",
      "test:coverage": "vitest run --coverage"
    }
  }
  ```

- [x] **Document testing patterns**
  - Add testing guide to README
  - Document how to write tests
  - Explain MSW usage
  - Provide test examples

---

## 📦 Story 10: Error Handling & Observability

**Goal**: Implement centralized error handling, logging, and observability foundations.

**Acceptance Criteria**:

- Error boundaries implemented
- Centralized logging utility
- Error normalization working

### Tasks

- [x] **Create error types**
  - Create `src/types/error.types.ts`:

    ```typescript
    export enum ErrorType {
      NETWORK = 'NETWORK_ERROR',
      VALIDATION = 'VALIDATION_ERROR',
      AUTH = 'AUTH_ERROR',
      NOT_FOUND = 'NOT_FOUND',
      SERVER = 'SERVER_ERROR',
      UNKNOWN = 'UNKNOWN_ERROR',
    }

    export interface AppError extends Error {
      type: ErrorType;
      code?: string;
      statusCode?: number;
      details?: Record<string, unknown>;
      timestamp: string;
    }
    ```

- [x] **Create error utility**
  - Create `src/lib/error.ts`:

    ```typescript
    import { ApiError } from '@/types/api.types';
    import { AppError, ErrorType } from '@/types/error.types';

    export function normalizeError(error: unknown): AppError {
      const timestamp = new Date().toISOString();

      // Handle API errors
      if (isApiError(error)) {
        return {
          name: 'AppError',
          message: error.message,
          type: mapStatusToErrorType(error.status),
          code: error.code,
          statusCode: error.status,
          details: error.details,
          timestamp,
        };
      }

      // Handle standard errors
      if (error instanceof Error) {
        return {
          name: 'AppError',
          message: error.message,
          type: ErrorType.UNKNOWN,
          timestamp,
        };
      }

      // Handle unknown errors
      return {
        name: 'AppError',
        message: 'An unknown error occurred',
        type: ErrorType.UNKNOWN,
        timestamp,
      };
    }

    function isApiError(error: unknown): error is ApiError {
      return (
        typeof error === 'object' &&
        error !== null &&
        'message' in error &&
        'code' in error &&
        'status' in error
      );
    }

    function mapStatusToErrorType(status: number): ErrorType {
      if (status >= 400 && status < 500) {
        if (status === 401 || status === 403) return ErrorType.AUTH;
        if (status === 404) return ErrorType.NOT_FOUND;
        return ErrorType.VALIDATION;
      }
      if (status >= 500) return ErrorType.SERVER;
      return ErrorType.NETWORK;
    }
    ```

- [x] **Create logger utility**
  - Create `src/lib/logger.ts`:

    ```typescript
    import { config } from '@/config';

    type LogLevel = 'debug' | 'info' | 'warn' | 'error';

    interface LogContext {
      [key: string]: unknown;
    }

    class Logger {
      private isDevelopment = config.isDevelopment;

      private log(level: LogLevel, message: string, context?: LogContext) {
        if (!this.isDevelopment && level === 'debug') return;

        const timestamp = new Date().toISOString();
        const logEntry = {
          timestamp,
          level,
          message,
          ...context,
        };

        // In production, send to monitoring service
        if (config.isProduction) {
          // Send to Sentry/Datadog/etc
          this.sendToMonitoring(logEntry);
        } else {
          // Console log in development
          console[level === 'debug' ? 'log' : level](
            `[${timestamp}] ${level.toUpperCase()}: ${message}`,
            context
          );
        }
      }

      private sendToMonitoring(logEntry: unknown) {
        // TODO: Implement Sentry/monitoring integration
        console.log('Would send to monitoring:', logEntry);
      }

      debug(message: string, context?: LogContext) {
        this.log('debug', message, context);
      }

      info(message: string, context?: LogContext) {
        this.log('info', message, context);
      }

      warn(message: string, context?: LogContext) {
        this.log('warn', message, context);
      }

      error(message: string, error?: Error, context?: LogContext) {
        this.log('error', message, {
          ...context,
          error: error?.message,
          stack: error?.stack,
        });
      }
    }

    export const logger = new Logger();
    ```

- [x] **Create ErrorBoundary component**
  - Create `src/components/ErrorBoundary.tsx`:

    ```typescript
    import { Component, ReactNode } from 'react';
    import { logger } from '@/lib/logger';

    interface Props {
      children: ReactNode;
      fallback?: ReactNode;
    }

    interface State {
      hasError: boolean;
      error: Error | null;
    }

    export class ErrorBoundary extends Component<Props, State> {
      constructor(props: Props) {
        super(props);
        this.state = { hasError: false, error: null };
      }

      static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
      }

      componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        logger.error('ErrorBoundary caught error', error, {
          componentStack: errorInfo.componentStack,
        });
      }

      render() {
        if (this.state.hasError) {
          return (
            this.props.fallback || (
              <div className='flex min-h-screen items-center justify-center'>
                <div className='text-center'>
                  <h1 className='text-2xl font-bold'>Something went wrong</h1>
                  <p className='mt-2 text-muted-foreground'>
                    {this.state.error?.message}
                  </p>
                  <button
                    onClick={() => window.location.reload()}
                    className='mt-4 rounded bg-primary px-4 py-2 text-white'
                  >
                    Reload Page
                  </button>
                </div>
              </div>
            )
          );
        }

        return this.props.children;
      }
    }
    ```

- [x] **Add ErrorBoundary to app**
  - Wrap app in ErrorBoundary in `src/app/App.tsx`
  - Add feature-level error boundaries where needed

- [x] **Update Axios interceptor to use logger**
  - Log all API errors
  - Add request tracing
  - Log performance metrics

- [x] **Test error handling**
  - Trigger different error types
  - Verify logging works
  - Verify error boundaries catch errors
  - Verify user sees appropriate messages

---

## 📦 Story 11: App Bootstrap & Providers

**Goal**: Set up application entry point with all providers properly configured.

**Acceptance Criteria**:

- Clean app bootstrap
- All providers configured
- Router ready
- Loading states handled

### Tasks

- [x] **Install React Router**

  ```bash
  npm install react-router-dom
  ```

- [x] **Create providers file**
  - Create `src/app/providers.tsx`:

    ```typescript
    import { ReactNode } from 'react';
    import { SWRConfig } from 'swr';
    import { BrowserRouter } from 'react-router-dom';
    import { swrConfig } from '@/lib/swr-config';
    import { ErrorBoundary } from '@/components/ErrorBoundary';

    interface ProvidersProps {
      children: ReactNode;
    }

    export function Providers({ children }: ProvidersProps) {
      return (
        <ErrorBoundary>
          <SWRConfig value={swrConfig}>
            <BrowserRouter>{children}</BrowserRouter>
          </SWRConfig>
        </ErrorBoundary>
      );
    }
    ```

- [x] **Create App.tsx**
  - Create `src/app/App.tsx`:

    ```typescript
    import { Routes, Route } from 'react-router-dom';
    import { Providers } from './providers';

    function AppRoutes() {
      return (
        <Routes>
          <Route path='/' element={<div>Home</div>} />
          <Route path='/login' element={<div>Login</div>} />
          <Route path='*' element={<div>404</div>} />
        </Routes>
      );
    }

    function App() {
      return (
        <Providers>
          <AppRoutes />
        </Providers>
      );
    }

    export default App;
    ```

- [x] **Update main.tsx**
  - Create `src/app/main.tsx`:

    ```typescript
    import { StrictMode } from 'react';
    import { createRoot } from 'react-dom/client';
    import App from './App';
    import '@/styles/index.css';

    const rootElement = document.getElementById('root');

    if (!rootElement) {
      throw new Error('Root element not found');
    }

    createRoot(rootElement).render(
      <StrictMode>
        <App />
      </StrictMode>
    );
    ```

- [x] **Update index.html**
  - Set proper title and meta tags
  - Add favicon
  - Add viewport meta
  - Ensure proper script reference

- [x] **Test app loads**
  - Start dev server
  - Verify no console errors
  - Verify routing works
  - Verify providers work

---

## 📦 Story 12: Performance Optimization

**Goal**: Implement code-splitting, lazy loading, and performance best practices.

**Acceptance Criteria**:

- Route-based code splitting
- Component lazy loading
- Memoization patterns documented
- Build size optimized

### Tasks

- [x] **Implement route-based code splitting**
  - Update `src/app/App.tsx` to use React.lazy:

    ```typescript
    import { lazy, Suspense } from 'react';
    import { Routes, Route } from 'react-router-dom';

    const HomePage = lazy(() => import('@/features/home/pages/HomePage'));
    const LoginPage = lazy(() => import('@/features/auth/pages/LoginPage'));

    function AppRoutes() {
      return (
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={<LoginPage />} />
          </Routes>
        </Suspense>
      );
    }
    ```

- [x] **Create loading component**
  - Create `src/components/Loading.tsx`
  - Use as Suspense fallback
  - Match app design system

- [x] **Configure Vite for optimal builds**
  - Update `vite.config.ts`:
    ```typescript
    export default defineConfig({
      // ... existing config
      build: {
        rollupOptions: {
          output: {
            manualChunks: {
              'react-vendor': ['react', 'react-dom', 'react-router-dom'],
              'ui-vendor': ['zustand', 'swr', 'axios'],
            },
          },
        },
        chunkSizeWarningLimit: 1000,
      },
    });
    ```

- [x] **Create memoization examples**
  - Document useMemo usage
  - Document useCallback usage
  - Show Zustand selector optimization
  - Create performance best practices doc

- [x] **Add bundle analyzer**

  ```bash
  npm install -D rollup-plugin-visualizer
  ```

  - Add to Vite config
  - Generate bundle report
  - Identify optimization opportunities

- [x] **Test build size**
  - Run production build
  - Analyze bundle size
  - Verify code splitting works
  - Check lazy loading behavior

---

## 📦 Story 13: Documentation

**Goal**: Create comprehensive documentation for the project.

**Acceptance Criteria**:

- README complete
- Architecture documented
- Contributing guide present
- All patterns explained

### Tasks

- [x] **Create comprehensive README.md**
  - Project overview
  - Tech stack list
  - Getting started guide
  - Available scripts
  - Folder structure explanation
  - Architecture overview
  - State management guide
  - Styling guide
  - Testing guide
  - Deployment guide
  - Troubleshooting section

- [x] **Create ARCHITECTURE.md**
  - Detailed architecture explanation
  - Folder structure deep dive
  - State management architecture
  - Data flow diagrams (Mermaid)
  - API integration patterns
  - Error handling strategy
  - Performance considerations

- [x] **Create CONTRIBUTING.md**
  - Code style guide
  - Commit message conventions
  - Pull request process
  - Testing requirements
  - Code review checklist

- [x] **Create TESTING.md**
  - Testing philosophy
  - How to write tests
  - Testing utilities documentation
  -
