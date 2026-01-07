**Act as a Principal Frontend Architect, DX Lead, and Platform Engineer.**

Your task is to **design and generate a comprehensive, enterprise-ready frontend project setup** using **React.js, Vite, and TypeScript**, enforcing **strict best practices, modular architecture, and automated quality gates**.

This is a **fresh project**, not a refactor.

---

## 🎯 OBJECTIVE

Create a **production-grade React frontend foundation** that:

- Uses **latest stable versions**

- Enforces **strict TypeScript and linting**

- Uses **Zustand for client state**

- Uses **SWR + Axios with global configuration**

- Uses **Tailwind CSS + shadcn/ui**

- Supports **feature-based modular scaling**

- Includes **testing, observability, and CI readiness**

- Provides **high developer confidence**

---

## 🧱 CORE STACK (MANDATORY)

### Framework & Tooling

- **React.js (latest stable)**

- **Vite (latest stable)**

- **TypeScript (strict: true)**

- **Node.js LTS**

---

## 🧠 STATE & DATA LAYER

### Client State Management

- **Zustand**

- Feature-scoped stores

- Fully typed selectors

- No monolithic global store

- No mutable state

- Store logic isolated per domain

### Server State & Data Fetching

- **SWR**

- Global configuration using `SWRConfig`

- Cache, deduping, revalidation policies

- **Axios**

- Centralized Axios instance

- Request & response interceptors

- Typed API responses

- Environment-based base URLs

- Error normalization layer

---

## 🎨 STYLING & DESIGN SYSTEM

### Styling Stack

- **Tailwind CSS**

- **shadcn/ui**

- **tailwindcss-debug-screens** (enabled in dev only)

- PostCSS + autoprefixer

### Design System Rules

- Token-based design (spacing, color, typography)

- Accessible components (WCAG-aligned)

- Theme-ready (light/dark)

- Composition over overrides

- No inline styles

- No uncontrolled Tailwind class sprawl

---

## 🧼 CODE QUALITY & GOVERNANCE (STRICT)

### Enforced Tooling

- ESLint (React + TypeScript strict)

- Prettier

- Husky + lint-staged

- Commitlint (Conventional Commits)

- Absolute imports with path aliases

### Rules

- ❌ No `any`

- ❌ No unused exports

- ❌ No implicit `any`

- ❌ No circular dependencies

- ✅ Linting, formatting, and tests must block commits

---

## 🧱 MODULAR PROJECT STRUCTURE (MANDATORY)

Design a **feature-based, domain-driven architecture**:

```

src/

├── app/ # App bootstrap & providers

│ ├── main.tsx

│ ├── App.tsx

│ └── providers.tsx

│

├── features/ # Domain modules

│ ├── auth/

│ │ ├── components/

│ │ ├── hooks/

│ │ ├── store/

│ │ ├── services/

│ │ ├── auth.types.ts

│ │ ├── auth.test.ts

│ │ └── index.ts

│ └── dashboard/

│

├── components/ # Shared UI components

│

├── hooks/ # Shared hooks

│

├── services/ # API & external services

│ ├── axios.ts

│ └── api-client.ts

│

├── stores/ # Cross-feature stores (if needed)

│

├── lib/ # Utilities & helpers

│

├── styles/ # Tailwind & global styles

│

├── types/ # Global types

│

├── config/ # Env & constants

│

└── tests/ # Shared test utilities

```

### Architecture Rules

- Feature owns its UI, state, services, and tests

- Tests live **beside implementation files**

- No cross-feature imports without explicit contracts

- Shared logic must live outside `features/`

---

## ⚙️ ENVIRONMENT & CONFIGURATION

- Environment validation using `zod`

- Runtime vs build-time config separation

- No hardcoded values

- `.env.example` required

---

## 🧪 TESTING STRATEGY (MANDATORY)

### Testing Framework

- **Vitest**

- **@testing-library/react**

- **MSW** for API mocking

### Rules

- Test files live next to source files

- Store logic must be unit tested

- Components must have interaction tests

- Coverage thresholds enforced

---

## 📡 OBSERVABILITY & ERROR HANDLING

Include:

- Centralized logging utility

- Error boundaries

- SWR error normalization

- Request tracing headers

- Ready hooks for:

- Sentry

- OpenTelemetry

- Datadog

---

## ⚡ PERFORMANCE BEST PRACTICES

- Memoized selectors

- Code-splitting by feature

- Lazy loading where appropriate

- Optimized Zustand subscriptions

- SWR cache discipline

---

## 📘 DOCUMENTATION (REQUIRED)

Provide:

1. **README.md**

2. Folder structure explanation

3. State & data flow architecture

4. Styling & design system usage

5. Testing strategy & examples

6. Observability & error handling guide

---

## 📦 OUTPUT REQUIREMENTS

Your response **must include**:

1. Full folder structure

2. Dependency list with reasoning

3. Vite configuration

4. Tailwind + shadcn setup

5. Zustand feature store example

6. SWR + Axios global configuration

7. Typed API service example

8. shadcn component example

9. Vitest test example

10. CI-ready scripts

---

## 🔐 NON-NEGOTIABLE RULES

- Strict TypeScript

- No global mutable state

- No hidden coupling

- All business logic testable

- Quality gates must fail builds on violations

---

## ▶️ START INSTRUCTION

Create a **complete, enterprise-ready React + Vite frontend project setup** that satisfies **all requirements above**, using **latest stable packages**, and clearly explain **architectural decisions**.

Do **not** return partial or conceptual output.

Treat this as a **long-term production foundation**.

---
