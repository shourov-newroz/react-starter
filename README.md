# Enterprise React + Vite + TypeScript Frontend Starter

A production-grade React frontend foundation from scratch with enterprise-ready architecture, strict quality gates, and modular scalability.

## 🚀 Tech Stack

- **React 19** - Latest React with concurrent features
- **Vite 7** - Fast build tool and dev server
- **TypeScript 5** - Strict type safety
- **Tailwind CSS 4** - Utility-first CSS with shadcn/ui
- **Zustand 5** - Lightweight state management
- **SWR 2** - Data fetching and caching
- **Axios** - HTTP client with interceptors
- **Vitest** - Fast unit testing
- **Testing Library** - Component testing
- **MSW** - API mocking
- **React Router 7** - Client-side routing
- **Zod** - Environment validation
- **ESLint + Prettier** - Code quality and formatting
- **Husky + lint-staged** - Git hooks
- **commitlint** - Conventional commits

## 📦 Features

### Architecture

- Feature-based modular architecture
- Clean separation of concerns
- Path aliases for clean imports
- Strict TypeScript configuration
- Environment validation with Zod
- Auth-based routing system with clear access controls
- **Internationalization (i18n) with lazy-loaded translations and RTL support**

### Data Layer

- Centralized Axios instance with interceptors
- Request/response logging and error handling
- SWR global configuration for data fetching
- Typed API responses

### State Management

- Zustand stores with persistence
- Typed selectors for optimal performance
- Feature-scoped store architecture
- DevTools integration

### UI/UX

- Tailwind CSS with design tokens
- shadcn/ui component library
- Dark mode support
- Responsive design
- Loading states and error boundaries

### Testing

- Vitest with coverage thresholds
- Testing Library for components
- MSW for API mocking
- Test utilities and helpers

### Quality Assurance

- Strict ESLint rules
- Prettier formatting
- Husky pre-commit hooks
- Conventional commit messages

### Performance

- Route-based code splitting
- Lazy loading with Suspense
- Bundle analyzer
- Vendor chunk optimization

## 🌍 Internationalization (i18n)

This project includes a full-featured internationalization system built with [i18next](https://www.i18next.com/) and [react-i18next](https://react.i18next.com/). It supports multiple languages with lazy-loaded translations, automatic language detection, and RTL (right-to-left) support.

### Architecture

The i18n system uses a namespace-based architecture with lazy loading:

```
src/
├── lib/i18n/                    # Core i18n configuration
│   ├── config.ts               # i18next initialization
│   ├── locales.ts             # Language configuration
│   ├── namespace-config.ts    # Namespace definitions
│   ├── useAppTranslation.ts  # Translation hooks
│   └── locales/               # Shared translation files
│       ├── en/
│       │   ├── common.json
│       │   ├── navigation.json
│       │   └── language.json
│       ├── ar/
│       └── ku/
└── features/                    # Feature-specific translations
    ├── auth/locales/
    │   ├── en.json
    │   ├── ar.json
    │   └── ku.json
    └── dashboard/locales/
        ├── en.json
        ├── ar.json
        └── ku.json
```

**Key Features:**

- **Lazy Loading**: Translations are loaded on-demand, not bundled with the initial app load
- **Language Detection**: Automatically detects user preference from localStorage, browser settings, or HTML lang attribute
- **RTL Support**: Automatic direction switching for RTL languages (Arabic, Kurdish)
- **Feature Namespaces**: Translations organized by feature for better maintainability
- **Type Safety**: Typed translation hooks with namespace support

### Supported Languages

| Code | Language | Native Name | Direction |
| ---- | -------- | ----------- | --------- |
| `en` | English  | English     | LTR       |
| `ar` | Arabic   | العربية     | RTL       |
| `ku` | Kurdish  | کوردی       | RTL       |

### Namespaces

The system uses two types of namespaces:

| Namespace    | Type    | Location                          |
| ------------ | ------- | --------------------------------- |
| `auth`       | Feature | `src/features/auth/locales/`      |
| `dashboard`  | Feature | `src/features/dashboard/locales/` |
| `common`     | Shared  | `src/lib/i18n/locales/`           |
| `navigation` | Shared  | `src/lib/i18n/locales/`           |
| `language`   | Shared  | `src/lib/i18n/locales/`           |

### Changing the Default Language

To change the default language, modify the `DEFAULT_LANGUAGE` constant in [`src/lib/i18n/locales.ts`](src/lib/i18n/locales.ts:69):

```typescript
// src/lib/i18n/locales.ts
export const DEFAULT_LANGUAGE: LanguageCode = 'en'; // Change to 'ar', 'ku', etc.
```

You may also need to update the fallback configuration in [`src/lib/i18n/config.ts`](src/lib/i18n/config.ts:80-86) if needed.

### Adding New Translations

#### Adding a New Language

1. Add the language to `SUPPORTED_LANGUAGES` in [`src/lib/i18n/locales.ts`](src/lib/i18n/locales.ts:27):

```typescript
export const SUPPORTED_LANGUAGES: LanguageConfig[] = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    direction: 'ltr',
  },
  // Add new language here
];
```

1. Add direction mapping in `LANGUAGE_DIRECTION`:

```typescript
export const LANGUAGE_DIRECTION: Record<LanguageCode, Direction> = {
  en: 'ltr',
  ar: 'rtl',
  ku: 'rtl',
  // Add new language direction
};
```

1. Add language name in `LANGUAGE_NAMES`:

```typescript
export const LANGUAGE_NAMES: Record<LanguageCode, string> = {
  en: 'English',
  ar: 'العربية',
  ku: 'کوردی',
  // Add new language name
};
```

1. Create translation files for each namespace:
   - Feature namespaces: `src/features/{feature}/locales/{lang}.json`
   - Shared namespaces: `src/lib/i18n/locales/{lang}/{namespace}.json`

#### Adding New Translation Keys

**For feature-specific translations:**
Add keys to the feature's locale file (e.g., [`src/features/auth/locales/en.json`](src/features/auth/locales/en.json)):

```json
{
  "Login": "Login",
  "New Key": "Translation"
}
```

**For shared translations:**
Add keys to the appropriate shared locale file (e.g., [`src/lib/i18n/locales/en/common.json`](src/lib/i18n/locales/en/common.json)):

```json
{
  "Loading": "Loading",
  "New Key": "Translation"
}
```

**Important:** Keys must be consistent across all language files for the same namespace.

### Adding a New Namespace

1. Add the namespace to `NAMESPACES` in [`src/lib/i18n/namespace-config.ts`](src/lib/i18n/namespace-config.ts:10):

```typescript
export const NAMESPACES = [
  'auth',
  'common',
  'dashboard',
  'navigation',
  'language',
  'newNamespace',
] as const;
```

1. Configure the namespace path in `NAMESPACE_CONFIG`:

```typescript
export const NAMESPACE_CONFIG: Record<Namespace, NamespaceConfig> = {
  // ... existing namespaces
  newNamespace: {
    name: 'newNamespace',
    feature: 'newFeature', // or 'core' for shared
    path: '/src/features/newFeature/locales', // or '/src/lib/i18n/locales'
    isShared: false, // or true for shared
  },
};
```

1. Create translation files at the configured path.

### Usage Examples

#### Using the Translation Hook

```tsx
import { useTranslation } from '@/lib/i18n/useAppTranslation';

// For a specific namespace
const { t, i18n } = useTranslation('auth');

// Translate a key
return <h1>{t('Login')}</h1>;

// With interpolation
return <p>{t('Welcome {{name}}', { name: 'John' })}</p>;

// With pluralization
return <p>{t('item', { count: 5 })}</p>;
```

#### Using Shorthand Hooks

The project provides convenience hooks for common namespaces:

```tsx
import { useT, useCommonT, useNavigationT, useLanguageT } from '@/lib/i18n/useAppTranslation';

// Common namespace (default)
const t = useCommonT();

// Navigation namespace
const navT = useNavigationT();

// Language namespace
const langT = useLanguageT();
```

#### Feature-Specific Hooks

Each feature can provide its own translation hook:

```tsx
// In src/features/auth/hooks/useTranslation.ts
export function useAuthTranslation() {
  return useTranslation('auth');
}

// Usage in auth components
const { t } = useAuthTranslation();
```

#### Switching Languages

```tsx
import { useChangeLanguage } from '@/lib/i18n/useAppTranslation';

const changeLanguage = useChangeLanguage();

// Switch to Arabic
await changeLanguage('ar');
```

#### Using the LanguageSwitcher Component

```tsx
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

// Simple usage
<LanguageSwitcher />

// With callback
<LanguageSwitcher onLanguageChange={(lang) => console.log(lang)} />
```

#### Using Namespace-Prefixed Keys

You can use keys from different namespaces without changing the namespace:

```tsx
const { t } = useTranslation('common');

// Use auth namespace key
t('auth:Login');

// Use navigation namespace key
t('navigation:Dashboard');
```

### Configuration

The i18n system is configured in [`src/lib/i18n/config.ts`](src/lib/i18n/config.ts). Key settings:

- **Language Detection Order**: localStorage → navigator → HTML lang attribute
- **Caching**: User preference stored in localStorage under `i18nextLng`
- **Missing Keys**: Warnings logged in development mode
- **Suspense**: Enabled for async loading

### Best Practices

1. **Feature Ownership**: Each feature owns its translations in `src/features/{feature}/locales/`
2. **Shared Translations**: Common strings (buttons, labels, errors) go in shared namespaces
3. **Key Consistency**: Use identical keys across all language files
4. **Interpolation**: Use `{{variable}}` syntax for dynamic values
5. **Plurals**: Use the `count` option for plural forms
6. **Context**: Use `_context` suffix for context-specific translations (e.g., `user_female`, `user_male`)

## 🛠️ Getting Started

### Prerequisites

- Node.js 18.x or 20.x (LTS)
- npm 10.x or later

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd react-starter

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Start development server
npm run dev
```

### Available Scripts

| Command                 | Description               |
| ----------------------- | ------------------------- |
| `npm run dev`           | Start development server  |
| `npm run build`         | Build for production      |
| `npm run lint`          | Run ESLint                |
| `npm run lint:fix`      | Fix ESLint errors         |
| `npm run format`        | Format code with Prettier |
| `npm run format:check`  | Check formatting          |
| `npm run preview`       | Preview production build  |
| `npm run test`          | Run tests in watch mode   |
| `npm run test:ui`       | Run tests with UI         |
| `npm run test:run`      | Run tests in CI mode      |
| `npm run test:coverage` | Run tests with coverage   |
| `npm run prepare`       | Set up Husky git hooks    |

## 📁 Project Structure

```
src/
├── app/                    # Application entry point
│   ├── App.tsx            # Root component with routing
│   ├── AuthGuard.tsx      # Authentication guard component
│   ├── providers.tsx      # Context providers
│   ├── UnauthorizedRoute.tsx # Unauthorized route handler
│   └── main.tsx           # Entry point
├── assets/                # Static assets
├── components/            # Shared components
│   ├── ui/               # shadcn/ui components
│   ├── ErrorBoundary.tsx     # Error boundary
│   ├── ErrorBoundary.test.tsx
│   ├── LoadingFallback.tsx   # Loading fallback component
│   └── LanguageSwitcher.tsx  # Language switcher component
├── config/                # Configuration
│   ├── env.ts            # Environment validation
│   ├── index.ts          # Config exports
│   └── routes.ts         # Route configuration
├── features/              # Feature modules
│   ├── auth/             # Auth feature
│   │   ├── components/   # Feature components
│   │   ├── config/       # Feature API endpoint and other configuration
│   │   ├── hooks/        # Feature hooks
│   │   ├── locales/      # Feature translations
│   │   ├── pages/        # Feature pages
│   │   ├── routes/       # Feature routes
│   │   ├── services/     # API services
│   │   ├── store/        # Zustand store
│   │   └── auth.types.ts # Feature types
│   ├── dashboard/        # Dashboard feature
│   │   ├── config/       # Feature API endpoint and other configuration
│   │   ├── hooks/
│   │   ├── layouts/
│   │   ├── locales/      # Feature translations
│   │   ├── pages/
│   │   └── routes/
│   └── demo/             # Demo feature
├── hooks/                # Shared hooks
├── lib/                  # Utilities
│   ├── error.ts          # Error handling
│   ├── i18n/             # Internationalization (i18n)
│   │   ├── config.ts     # i18next configuration
│   │   ├── locales.ts    # Language configuration
│   │   ├── namespace-config.ts  # Namespace definitions
│   │   ├── useAppTranslation.ts # Translation hooks
│   │   └── locales/      # Shared translations
│   ├── logger.ts         # Logging utility
│   ├── serverErrorHandler.ts # Server error handler
│   ├── swr-config.ts     # SWR configuration
│   └── utils.ts          # Helper functions
├── services/             # API services
│   ├── api-client.ts     # API client wrapper
│   └── axios.ts          # Axios instance
├── stores/               # Global stores
├── styles/               # Global styles
│   └── index.css         # Tailwind imports
├── tests/                # Test setup
│   ├── mocks/            # MSW handlers
│   ├── setup.ts          # Test setup
│   └── test-utils.tsx    # Test utilities
└── types/                # TypeScript types
    ├── api.types.ts      # API types
    ├── env.d.ts          # Environment types
    ├── error.types.ts    # Error types
    ├── global.d.ts       # Global declarations
    ├── index.ts          # Type exports
    ├── route.types.ts    # Route types
    └── store.types.ts    # Store types
```

## 🔧 Configuration

### TypeScript

The project uses strict TypeScript configuration with the following settings:

- `strict: true` - Enable all strict type checking options
- `noImplicitAny: true` - Disallow implicit `any` types
- `strictNullChecks: true` - Enable strict null checks
- `noUnusedLocals: true` - Report unused local variables
- `noUnusedParameters: true` - Report unused parameters

### Path Aliases

The project uses path aliases for clean imports:

| Alias          | Path              |
| -------------- | ----------------- |
| `@`            | `src/`            |
| `@/app`        | `src/app/`        |
| `@/features`   | `src/features/`   |
| `@/components` | `src/components/` |
| `@/hooks`      | `src/hooks/`      |
| `@/services`   | `src/services/`   |
| `@/stores`     | `src/stores/`     |
| `@/lib`        | `src/lib/`        |
| `@/styles`     | `src/styles/`     |
| `@/types`      | `src/types/`      |
| `@/config`     | `src/config/`     |
| `@/tests`      | `src/tests/`      |

### Environment Variables

Required environment variables are validated at runtime using Zod:

```typescript
// .env.example
VITE_API_BASE_URL=http://localhost:3000/api
VITE_API_TIMEOUT=30000
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_SENTRY=false
VITE_APP_ENV=development
```

## 📚 Documentation

- [Architecture](docs/ARCHITECTURE.md) - Detailed architecture documentation
- [Testing](docs/TESTING.md) - Testing guide and patterns
- [Contributing](docs/CONTRIBUTING.md) - Contribution guidelines

## 🔒 Commit Conventions

This project follows [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Types

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code (white-space, formatting, etc)
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools
- `revert`: Reverts a previous commit
- `ci`: Changes to CI configuration
- `build`: Changes that affect the build system

## 🧪 Testing

### Writing Tests

```typescript
// Example component test
import { render, screen } from '@/tests/test-utils';
import { LoginForm } from './LoginForm';

describe('LoginForm', () => {
  it('renders login form', () => {
    render(<LoginForm />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  });
});
```

### Running Tests

```bash
# Run tests with UI
npm run test:ui

# Run tests in CI mode
npm run test:run

# Run with coverage
npm run test:coverage
```

## 📈 Performance

### Bundle Analysis

Generate a bundle report to analyze chunk sizes:

```bash
npm run build
# Open dist/bundle-report.html
```

### Code Splitting

Routes are automatically code-split using React.lazy:

```typescript
const LoginPage = React.lazy(() => import('@/features/auth/pages/LoginPage'));
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/my-feature`
3. Commit your changes: `git commit -am 'feat: add my feature'`
4. Push to the branch: `git push origin feat/my-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Vite](https://vitejs.dev/) - Next generation frontend tooling
- [React](https://react.dev/) - The library for web and native user interfaces
- [shadcn/ui](https://ui.shadcn.com/) - Beautifully designed components
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Zustand](https://github.com/pmndrs/zustand) - Bear necessities for state management
