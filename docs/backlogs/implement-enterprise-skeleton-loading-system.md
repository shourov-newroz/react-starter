# Sprint Backlog — Implement Enterprise Skeleton Loading System

> **Generated:** 2026-03-13  
> **Requirement source:** `docs/requirements/Implement Enterprise Skeleton Loading System.md`  
> **Target project:** Travluence — Feature-based React/TypeScript/Vite/TailwindCSS v4/SWR/Zustand

---

## 📋 Codebase Gap Analysis

### What Already Exists ✅

| Item                      | Location                                                                  | Status                                                                            |
| ------------------------- | ------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| Base `Skeleton` primitive | `src/components/ui/skeleton.tsx`                                          | ✅ Ready — uses `animate-pulse rounded-md bg-accent`                              |
| Skeleton folder           | `src/components/skeleton/`                                                | ✅ Exists but **should be removed** (skeletons will live in `src/components/ui/`) |
| UI primitives             | `src/components/ui/` — `button.tsx`, `card.tsx`, `input.tsx`, `label.tsx` | ✅ Exist, no skeleton variants                                                    |
| Route config system       | `src/config/routes.ts` + feature `.routes.ts` files                       | ✅ Exists — missing `fallback` field                                              |
| React.lazy + Suspense     | Used in all route files, wrapped in `App.tsx`                             | ✅ Wiring exists                                                                  |
| Feature pages             | `DashboardPage`, `ProfilePage`, `LoginPage`, `ErrorHandlingDemo`          | ✅ Exist — no skeleton equivalents                                                |
| Layouts                   | `DashboardLayout`                                                         | ✅ Exists — no skeleton equivalent                                                |

### Critical Gaps / Anti-Patterns ❌

| Gap                                                                              | File                                                 | Severity                                                              |
| -------------------------------------------------------------------------------- | ---------------------------------------------------- | --------------------------------------------------------------------- |
| **Spinner is used as Suspense fallback**                                         | `src/components/LoadingFallback.tsx:14`              | 🔴 HIGH — direct requirement anti-pattern                             |
| **`route.types.ts` missing `fallback` field**                                    | `src/types/route.types.ts`                           | 🔴 HIGH — breaks route-level skeleton pattern                         |
| **No skeleton variants for any UI components**                                   | `src/components/ui/`                                 | 🔴 HIGH — no skeleton companions exist alongside UI primitives        |
| **Inline ad-hoc pulse skeleton in ProfilePage**                                  | `src/features/dashboard/pages/ProfilePage.tsx:42–46` | 🔴 HIGH — bypasses Skeleton primitive, not a reusable component       |
| **No page-level skeletons exist**                                                | All `features/*/pages/` dirs                         | 🔴 HIGH                                                               |
| **No layout-level skeleton exists**                                              | `src/features/dashboard/layouts/`                    | 🟠 MEDIUM                                                             |
| **No typography skeleton components**                                            | `src/components/ui/`                                 | 🟠 MEDIUM — req asks for `HeadingSkeleton`, `ParagraphSkeleton`, etc. |
| **`App.tsx` uses static `<LoadingFallback/>` instead of route-level fallback**   | `src/app/App.tsx:28,48`                              | 🔴 HIGH                                                               |
| **`skeleton-loading-rules.md` does not exist**                                   | `.kilocode/rules/`                                   | 🟠 MEDIUM                                                             |
| **5 existing AI rule files have no skeleton enforcement**                        | `.kilocode/rules/*.md`                               | 🟠 MEDIUM                                                             |
| **`docs/ARCHITECTURE.md` has no skeleton architecture section**                  | `docs/ARCHITECTURE.md`                               | 🟡 LOW                                                                |
| **`docs/CONTRIBUTING.md` has no skeleton developer rules**                       | `docs/CONTRIBUTING.md`                               | 🟡 LOW                                                                |
| **`performance-rules.md` still documents `<LoadingFallback/>` for Suspense**     | `.kilocode/rules/performance-rules.md:16`            | 🟠 MEDIUM                                                             |
| **`component-architecture.md` still references spinner pattern for Suspense**    | `.kilocode/rules/component-architecture.md:98`       | 🟠 MEDIUM                                                             |
| **`folder-structure-rules.md` lists `LoadingFallback.tsx` without skeleton dir** | `.kilocode/rules/folder-structure-rules.md:80`       | 🟡 LOW                                                                |
| **No tests exist for any skeleton components**                                   | Global                                               | 🟠 MEDIUM                                                             |

### Partial Implementations ⚠️

| Item                                        | Note                                                                                          |
| ------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `ProfilePage` inline skeleton (lines 42–46) | Raw `animate-pulse` divs — must be replaced with `<ProfilePageSkeleton/>`                     |
| `src/components/skeleton/` directory        | Directory exists but is empty — can be removed since skeletons will live alongside components |

---

## Button Size Variant Reference (for Skeleton Sizing)

| Component | Sizes to support                                                                    |
| --------- | ----------------------------------------------------------------------------------- |
| `Button`  | `default` (`h-10`), `sm` (`h-9`), `lg` (`h-11`), `icon` (`h-10 w-10`)               |
| `Input`   | Single fixed size: `h-9 w-full`                                                     |
| `Label`   | Single fixed size: small inline text height                                         |
| `Card`    | Single size (full-width block) — expose `header`, `content`, `footer` sub-skeletons |

---

## 🧱 Story 1 — Skeleton Variants for All UI Components

**Theme:** UI Components  
**Goal:** Every `src/components/ui/` component gets a typed, size-matched skeleton variant that composes the Skeleton primitive in the SAME directory.  
**Location:** `src/components/ui/` (alongside the real component)

### Task 1.1 — `ButtonSkeleton`

- [x] Create `src/components/ui/button-skeleton.tsx`
- [x] Import `Skeleton` from `@/components/ui/skeleton`
- [x] Define `ButtonSkeletonProps` interface with `size?: 'default' | 'sm' | 'lg' | 'icon'`
- [x] Map each size to the exact pixel dimensions from `buttonVariants` (`h-10 px-4`, `h-9 px-3`, `h-11 px-8`, `h-10 w-10`)
- [x] Use `inline-flex` container to match `Button` layout
- [x] Export named: `export function ButtonSkeleton(...): React.ReactElement`
- [x] Add to barrel export `src/components/ui/index.ts` (if exists) or export from component
- [ ] Write test: `button-skeleton.test.tsx` — render each size, assert correct `className` dimensions

### Task 1.2 — `InputSkeleton`

- [x] Create `src/components/ui/input-skeleton.tsx`
- [x] Match `Input` geometry: `h-9 w-full rounded-md`
- [x] Export named: `export function InputSkeleton(...): React.ReactElement`
- [x] Add to barrel export
- [ ] Write test: render, assert `h-9 w-full` class presence

### Task 1.3 — `LabelSkeleton`

- [x] Create `src/components/ui/label-skeleton.tsx`
- [x] Match `Label` geometry: `h-4 w-24 rounded` (inline text approximation)
- [x] Export named: `export function LabelSkeleton(...): React.ReactElement`
- [x] Add to barrel export
- [ ] Write test

### Task 1.4 — `CardSkeleton`

- [x] Create `src/components/ui/card-skeleton.tsx`
- [x] Replicate `Card` structure: outer card shell, a `CardHeader` skeleton (title line + description line), `CardContent` skeleton block, `CardFooter` skeleton
- [x] Use `Skeleton` primitive for all inner blocks
- [x] Export named sub-components: `CardSkeleton`, `CardHeaderSkeleton`, `CardContentSkeleton`
- [x] Add to barrel export
- [ ] Write test: assert all structural sub-elements render

### Task 1.5 — Clean up Empty Skeleton Directory

- [x] Remove `src/components/skeleton/` directory as it is no longer used

---

---

## 🧠 Story 3 — Layout-Level Skeleton

**Theme:** Layout  
**Goal:** Create a `DashboardLayoutSkeleton` that mirrors `DashboardLayout` exactly (header, main area) and is non-scrollable.

### Task 3.1 — `DashboardLayoutSkeleton`

- [ ] Create `src/features/dashboard/layouts/DashboardLayoutSkeleton.tsx`
- [ ] Divide into three zones matching `DashboardLayout`: `<header>`, `<main>`, `<footer>`
- [ ] Header zone: `Skeleton` for the title text (`h-7 w-40`) + placeholder for `LanguageSwitcher` (`h-8 w-20`)
- [ ] Main zone: placeholder content blocks (3–4 skeleton rows)
- [ ] Footer zone: `Skeleton` text line (`h-4 w-64 mx-auto`)
- [ ] Wrap in `min-h-screen` container; apply `overflow-hidden` to prevent scrolling
- [ ] **Do NOT** add scrollable overflow
- [ ] Return type: `React.ReactElement`
- [ ] Export: named `DashboardLayoutSkeleton` + `export default DashboardLayoutSkeleton`
- [ ] Write test: assert non-scroll container renders, assert header/main/footer zones

---

## 🗂️ Story 4 — Page-Level Skeletons

**Theme:** Pages  
**Goal:** Every page gets a `*Skeleton` companion component matching its layout grid. Must be non-scrollable.

### Task 4.1 — `DashboardPageSkeleton`

- [ ] Create `src/features/dashboard/pages/DashboardPageSkeleton.tsx`
- [ ] Match `DashboardPage` layout: `p-8` container, `h1` heading area, `p` subtext, action button strip
- [ ] Use `HeadingSkeleton size="h1"`, `TextSkeleton`, `ButtonSkeleton size="default"`
- [ ] Apply `overflow-hidden` on root; no scrolling
- [ ] Export: named + default
- [ ] Write test: assert all skeleton sections render

### Task 4.2 — `ProfilePageSkeleton`

- [ ] Create `src/features/dashboard/pages/ProfilePageSkeleton.tsx`
- [ ] Match `ProfilePage` layout exactly: `p-8`, avatar circle (`h-24 w-24 rounded-full`), name line, email line, bio section, location section, joined section
- [ ] Replace the existing **ad-hoc inline pulse skeleton** in `ProfilePage` (`if (isLoading)` block, lines 38–49) with `<ProfilePageSkeleton />`
- [ ] Use `Skeleton` primitive for the avatar circle, `HeadingSkeleton size="h2"` for name, `TextSkeleton` for other fields
- [ ] Apply `overflow-hidden` on root
- [ ] Export: named + default
- [ ] Write test: assert skeleton renders with correct structural sections

### Task 4.3 — Refactor `ProfilePage` to Use `ProfilePageSkeleton`

- [ ] Open `src/features/dashboard/pages/ProfilePage.tsx`
- [ ] Import `ProfilePageSkeleton` (same directory, named import)
- [ ] Replace the entire `if (isLoading) { return (...) }` block (lines 38–49) with `if (isLoading) return <ProfilePageSkeleton />;`
- [ ] Verify TypeScript strict-mode compiles cleanly (no `any`, no implicit returns)
- [ ] Write regression test: mock SWR loading state → assert `<ProfilePageSkeleton>` renders

### Task 4.4 — `LoginPageSkeleton`

- [ ] Create `src/features/auth/pages/LoginPageSkeleton.tsx`
- [ ] Match `LoginPage` layout: `min-h-screen flex items-center justify-center`, centered card with title skeleton, subtitle skeleton, form skeleton (2 input skeletons + button skeleton)
- [ ] Use `HeadingSkeleton`, `TextSkeleton`, `InputSkeleton`, `ButtonSkeleton`
- [ ] Apply `overflow-hidden`; fit within viewport
- [ ] Export: named + default
- [ ] Write test

### Task 4.5 — `ErrorHandlingDemoPageSkeleton` (demo feature)

- [ ] Create `src/features/demo/pages/ErrorHandlingDemoSkeleton.tsx`
- [ ] Simple skeleton: heading, 2–3 text lines, 2 button skeletons
- [ ] Export: named + default
- [ ] Write test

---

## ⚡ Story 5 — Route Type & Route Config Update

**Theme:** Types & Routing  
**Goal:** Add the `fallback` field to `BaseRoute` and wire per-route skeleton fallbacks throughout all route files.

### Task 5.1 — Update `route.types.ts`

- [ ] Open `src/types/route.types.ts`
- [ ] Add `fallback?: React.ComponentType` field to `BaseRoute`
- [ ] Ensure the field is **optional** (not all routes may have a specific skeleton yet — defaults to global)
- [ ] Re-export from `src/types/index.ts` if not already covered
- [ ] Run TypeScript compile check: `npx tsc --noEmit`

### Task 5.2 — Update `App.tsx` to Use Per-Route Fallback

- [ ] Open `src/app/App.tsx`
- [ ] In `renderRouteElement`, when `route.fallback` is defined, use it as the Suspense fallback: `<Suspense fallback={route.fallback ? React.createElement(route.fallback) : <GenericPageSkeleton />}>`
- [ ] Replace the two hardcoded `<LoadingFallback />` usages (lines 28 and 48) with this dynamic fallback logic
- [ ] For `isLoading` state (auth loading), use `<DashboardLayoutSkeleton />` or a `GenericPageSkeleton` instead of spinner
- [ ] Keep `<ErrorBoundary>` wrapping intact
- [ ] Verify no TypeScript errors

### Task 5.3 — Update Dashboard Routes to Add `fallback`

- [ ] Open `src/features/dashboard/routes/dashboard.routes.ts`
- [ ] Import `DashboardPageSkeleton` and `ProfilePageSkeleton`
- [ ] Add `fallback: DashboardPageSkeleton` to the dashboard index route
- [ ] Add `fallback: ProfilePageSkeleton` to the profile route
- [ ] Ensure the layout route itself has `fallback: DashboardLayoutSkeleton`

### Task 5.4 — Update Auth Routes to Add `fallback`

- [ ] Open `src/features/auth/routes/auth.routes.ts`
- [ ] Import `LoginPageSkeleton`
- [ ] Add `fallback: LoginPageSkeleton` to the login route

### Task 5.5 — Update Demo Routes to Add `fallback`

- [ ] Open `src/features/demo/routes/demo.routes.ts`
- [ ] Import `ErrorHandlingDemoSkeleton`
- [ ] Add `fallback: ErrorHandlingDemoSkeleton` to the demo route

---

## 🚫 Story 6 — Replace Spinner Anti-Pattern

**Theme:** Anti-Pattern Elimination  
**Goal:** Remove all spinner usage from async/Suspense contexts and ensure it cannot be re-introduced.

### Task 6.1 — Convert or Deprecate `LoadingFallback.tsx`

- [ ] Replace the spinner inside `LoadingFallback.tsx` with a generic `GenericPageSkeleton` — keep the file for any non-route-specific uses
- [ ] Confirm: no remaining `<LoadingFallback />` in `App.tsx` or any route file
- [ ] Update `folder-structure-rules.md` to reflect removal/change of `LoadingFallback.tsx`

### Task 6.2 — Create `GenericPageSkeleton` (Global Fallback)

- [ ] Create `src/components/ui/generic-page-skeleton.tsx`
- [ ] Simple full-viewport non-scrollable skeleton: `min-h-screen overflow-hidden` container with a header bar skeleton + 3 content block skeletons
- [ ] Used as fallback in `App.tsx` for routes that don't yet define a `fallback`
- [ ] Export named + add to barrel
- [ ] Write test

---

## 🔄 Story 7 — Update `route.types.ts` Exports & Barrel

**Theme:** Types  
**Goal:** Ensure all new types and the updated `RouteConfig` are cleanly accessible from barrel exports.

### Task 7.1 — Verify `src/types/index.ts` Exports

- [ ] Open `src/types/index.ts`
- [ ] Confirm `RouteConfig` and `AuthRequirement` are exported (they likely exist — just validate)
- [ ] Run `npx tsc --noEmit` to confirm no type regressions

---

## 📜 Story 8 — Create New AI Rule: `skeleton-loading-rules.md`

**Theme:** Governance / Documentation  
**Goal:** Establish the permanent rule file that enforces the skeleton system for all future development.

### Task 8.1 — Create `.kilocode/rules/skeleton-loading-rules.md`

- [ ] Create `.kilocode/rules/skeleton-loading-rules.md`
- [ ] Include sections:
  - **Skeleton Required for Async UI**: Every SWR `isLoading` branch must render a named skeleton component, NOT a spinner or raw `animate-pulse` div
  - **Skeleton Required for Pages**: Every page component in `src/features/*/pages/` must have a `*Skeleton` companion in the same directory
  - **Skeleton Required for Layouts**: Every layout in `src/features/*/layouts/` must have a `*Skeleton` companion
  - **Skeleton Required for Atomic Components**: Every component in `src/components/ui/` must have a `*Skeleton` companion in the same directory and use Corresponding skeleton component of UI components in skeleton pages and layouts
  - **Skeleton Must Support Size Variants Only**: Skeleton props must use `size` (matching the component's size variants); color variants must NOT create separate skeleton variants
  - **Skeleton Layouts Must Not Scroll**: Root element of every skeleton must use `overflow-hidden`; never `overflow-y-auto` or `overflow-y-scroll`
  - **Use Base Primitive**: All skeletons must compose `Skeleton` from `@/components/ui/skeleton` — no new skeleton libraries
  - **Anti-Patterns**: List spinner, ad-hoc `animate-pulse` divs, scrollable skeletons, and color-variant skeletons as forbidden

---

## 🔄 Story 9 — Update Existing AI Rule Files

**Theme:** Governance  
**Goal:** All existing rules must reference and enforce the skeleton system.

### Task 9.1 — Update `ai-enforcement-rules.md`

- [ ] Open `.kilocode/rules/ai-enforcement-rules.md`
- [ ] Add to **Architecture Violation Refusal / Pattern Violations** section:
  - `❌ Creates async UI components without skeleton loading states`
  - `❌ update data components ui or styles without skeleton loading update`
  - `❌ Creates page components without a companion *Skeleton page`
  - `❌ Creates atomic UI components without a companion skeleton variant`
  - `❌ Uses spinner (animate-spin) as Suspense fallback instead of skeleton`
  - `❌ Uses base skeleton component instead of using Corresponding skeleton component of UI components in skeleton pages and layouts`
- [ ] Add to **Reuse Mandate** table: `Skeleton primitive | src/components/ui/skeleton.tsx (Skeleton)`
- [ ] Add `Skeleton components | src/components/ui/` to reuse mandate

### Task 9.2 — Update `architecture-rules.md`

- [ ] Open `.kilocode/rules/architecture-rules.md`
- [ ] Add new section **## Skeleton Architecture**:
  - Global skeleton primitive: `src/components/ui/skeleton.tsx`
  - Atomic skeleton variants: `src/components/ui/` (alongside primitives)
  - Layout skeleton companions: `src/features/{feature}/layouts/`
  - Page skeleton companions: `src/features/{feature}/pages/`
  - Route fallback wiring: `fallback` field in `RouteConfig`

### Task 9.3 — Update `component-architecture.md`

- [ ] Open `.kilocode/rules/component-architecture.md`
- [ ] Line 98: Replace `<LoadingFallback />` reference with: `Use <Suspense fallback={<RouteSpecificSkeleton />}> for async boundaries`
- [ ] Add new section: **## Skeleton Companion Components**
  - Every atomic UI component must have a `*Skeleton` companion in the same directory (`src/components/ui/`)
  - Skeleton variants use size props only (no color props)

### Task 9.4 — Update `performance-rules.md`

- [ ] Open `.kilocode/rules/performance-rules.md`
- [ ] Line 16: Replace `<LoadingFallback />` reference with `<RouteSpecificSkeleton />` or `<GenericPageSkeleton />`
- [ ] Add subsection: **## Skeleton Loading Performance**
  - Skeleton renders synchronously — no delay, no spinner
  - Skeleton must not cause layout shift (CLS = 0)
  - Skeleton must not introduce scrolling

### Task 9.5 — Update `folder-structure-rules.md`

- [ ] Open `.kilocode/rules/folder-structure-rules.md`
- [ ] Update **Shared Components Structure** block to include skeleton variants in `ui/`:
  ```
  src/components/
  ├── ui/                   # shadcn/ui primitives and skeletons
  │   ├── button.tsx
  │   ├── button-skeleton.tsx
  │   ├── card.tsx
  │   ├── card-skeleton.tsx
  │   ├── ...
  ...
  ```
- [ ] Update `LoadingFallback.tsx` entry to reflect its deprecation or replacement

---

## 📘 Story 10 — Update Project Documentation

**Theme:** Documentation  
**Goal:** Official docs reflect the skeleton architecture so new developers know the system without consulting rule files.

### Task 10.1 — Update `docs/ARCHITECTURE.md`

- [ ] Open `docs/ARCHITECTURE.md`
- [ ] Add a new top-level section: **## Skeleton Loading Architecture**
  - Sub-section: _Global Skeleton Primitive_ — describes `src/components/ui/skeleton.tsx`, the `Skeleton` component, how it works
  - Sub-section: _Atomic Skeleton Variants_ — describes UI skeletons in `src/components/ui/`, naming convention, size-only props
  - Sub-section: _Layout Skeletons_ — location, non-scrollable rule
  - Sub-section: _Page Skeletons_ — location, companion naming pattern
  - Sub-section: _Route Fallback Integration_ — the `fallback` field in `RouteConfig`, how `App.tsx` uses it

### Task 10.2 — Update `docs/CONTRIBUTING.md`

- [ ] Open `docs/CONTRIBUTING.md`
- [ ] Add a new section: **## Skeleton Loading Developer Rules**
  - Rule 1: All async UI must provide a named skeleton loading state (no spinners)
  - Rule 2: All pages must have a `*PageSkeleton` companion component in the same directory
  - Rule 3: All layouts must have a `*LayoutSkeleton` companion component in the same directory
  - Rule 4: Every component in `src/components/ui/` must have a `*Skeleton` companion in the same directory
  - Rule 5: Skeleton variants must support size props matching the component — no color-variant skeletons
  - Rule 6: Skeleton root containers must use `overflow-hidden`; scrolling is forbidden
  - Rule 7: Always compose the `Skeleton` primitive; never use raw `animate-pulse`

---

## 🧪 Story 11 — Testing

**Theme:** QA / Testing  
**Goal:** Verify skeleton behavior: visibility during loading, invisibility after load, layout size parity, non-scrollability.

### Task 11.1 — Unit Tests for All Skeleton Components

> **Note:** Individual component tests are already listed in each Task above. This story covers integration/behavior tests.

### Task 11.2 — Behavior Test: Skeleton Shows During SWR Loading

- [ ] Create `src/features/dashboard/pages/ProfilePage.test.tsx` (if not exists)
- [ ] Mock SWR with `isLoading: true` using `src/tests/test-utils.tsx`
- [ ] Assert `<ProfilePageSkeleton>` root element is in the DOM
- [ ] Assert `<ProfilePage>` real content is NOT in the DOM

### Task 11.3 — Behavior Test: Skeleton Disappears After Data Loads

- [ ] In `ProfilePage.test.tsx`, mock SWR with resolved `data`
- [ ] Assert skeleton is NOT in the DOM
- [ ] Assert real profile content renders correctly

### Task 11.4 — Layout Parity Test: Skeleton vs Real UI Size

- [ ] In `ProfilePage.test.tsx`, render skeleton and real page, assert root container class includes `p-8` in both
- [ ] Check that `DashboardLayoutSkeleton` has same height classes as `DashboardLayout` (both use `min-h-screen`)

### Task 11.5 — Non-Scrollability Test

- [ ] In each `*Skeleton.test.tsx`, assert root element includes `overflow-hidden` class
- [ ] Assert root element does NOT include `overflow-y-auto` or `overflow-y-scroll`

### Task 11.6 — Suspense + Route Fallback Integration Test

- [ ] In `src/app/App.test.tsx` (or create it):
  - Mock `React.lazy` to delay component resolution
  - Assert route-specific skeleton renders during lazy load delay
  - Assert real page renders after lazy load resolves

### Task 11.7 — Visual Regression (Manual QA Checklist)

- [ ] Open `/` (Dashboard) — verify `DashboardPageSkeleton` shows for the lazy-load flash
- [ ] Open `/profile` — verify `ProfilePageSkeleton` shows during data fetching (throttle API in DevTools)
- [ ] Open `/login` (logged out) — verify `LoginPageSkeleton` shows during lazy load
- [ ] Resize browser to mobile (`375px`) — verify skeletons do not overflow or scroll
- [ ] Confirm zero layout shift on content load (use Chrome DevTools Performance > CLS score)
- [ ] Confirm all skeleton pages have `overflow: hidden` applied (Browser DevTools > Computed Styles)

---

## 🏁 Implementation Order (Recommended Offshore Sequence)

| Sprint Day | Story                                 | Dependency    |
| ---------- | ------------------------------------- | ------------- |
| Day 1      | Story 1 — UI Skeleton Variants        | None          |
| Day 1      | Story 2 — Typography Skeletons        | Story 1       |
| Day 2      | Story 3 — Layout Skeleton             | Story 1, 2    |
| Day 2      | Story 4 — Page Skeletons (4.1–4.5)    | Story 1, 2, 3 |
| Day 3      | Story 4.3 — Refactor ProfilePage      | Story 4.2     |
| Day 3      | Story 5 — Route Type + App.tsx        | Story 4, 6.2  |
| Day 3      | Story 6 — Remove Spinner Anti-Pattern | Story 5       |
| Day 4      | Story 7 — Barrel Export Verification  | Story 1, 2, 5 |
| Day 4      | Story 8 — Create Skeleton Rule        | None (docs)   |
| Day 4      | Story 9 — Update Existing Rules       | Story 8       |
| Day 5      | Story 10 — Update Docs                | Story 8, 9    |
| Day 5      | Story 11 — Tests + QA                 | All Stories   |

---

## ⚠️ Breaking Change Warnings

> [!CAUTION]
> **`route.types.ts` change (Story 5.1):** Adding the `fallback` field to `BaseRoute` is backward-compatible because it is optional. No existing route will break. However, TypeScript strict-mode may surface implicit `undefined` — ensure all `React.createElement(route.fallback)` calls guard for undefined.

> [!CAUTION]
> **`App.tsx` Suspense fallback change (Story 5.2):** Removing the hardcoded `<LoadingFallback />` and switching to dynamic per-route fallback changes the loading UX for ALL routes. Must be tested across all three route groups (auth, dashboard, demo) before merging.

> [!CAUTION]
> **`ProfilePage.tsx` inline skeleton removal (Story 4.3):** The `if (isLoading)` block is real production loading state. Replacing it with `<ProfilePageSkeleton />` must be pixel-perfect to avoid perceived layout shift. Visual QA required.

---

## 📏 Code Standards Reminder (Project-Wide)

All new files must follow these rules enforced by the existing kilocode rules:

- **TypeScript:** No `any`; all props as `interface`; explicit return types (`React.ReactElement`)
- **Styling:** Use `cn()` from `@/lib/utils`; Tailwind utility classes only
- **Naming:** Component files in `PascalCase.tsx`; hooks in `camelCase.ts` with `use` prefix
- **Imports:** `@/` alias always; group: React → third-party → `@/` → relative
- **i18n:** No hardcoded user-facing strings; use translation hooks (skeleton UI has no user-facing text — no i18n needed)
- **Exports:** Named export + default export for all lazy-loaded page components
- **Testing:** Co-located test files (`.test.tsx`) alongside source files
- **JSDoc:** Required on all exported public functions
