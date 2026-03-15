# Implement Feature-Based Modular Locales Architecture - Sprint Backlog

## 📋 Gap Analysis Summary

### Current State vs. Requirement

| Aspect               | Current Implementation                     | Required                   | Gap          |
| -------------------- | ------------------------------------------ | -------------------------- | ------------ |
| Locale File Location | All in `src/lib/i18n/locales/{lang}/`      | Feature-specific folders   | **CRITICAL** |
| Path Resolution      | Hardcoded `./locales/${lang}/${ns}.json`   | Dynamic based on namespace | **CRITICAL** |
| Namespace Metadata   | Only names in `locales.ts`                 | Path + ownership info      | **HIGH**     |
| Type Definitions     | All in `src/lib/i18n/types.ts`             | Feature-specific folders   | **HIGH**     |
| Translation Hooks    | All in `src/lib/i18n/useAppTranslation.ts` | Feature-specific folders   | **HIGH**     |

### Existing Assets (Can Reuse)

- ✅ Feature-specific hooks: `useAuthTranslation()`, `useDashboardTranslation()`, etc.
- ✅ Vite alias: `@/features` resolves to `src/features`
- ✅ Routing pattern: Each feature owns its routes in `src/features/{name}/routes/`
- ✅ Supported languages: en, ar, ku already configured
- ✅ RTL support: Built into `locales.ts`

### Technical Debt Identified

1. **Hardcoded import paths** in `config.ts` (lines 37, 45) - must become dynamic
2. **No namespace ownership tracking** - can't tell which feature owns which namespace
3. **Backend config unused** - `loadPath` in `i18nextOptions.backend` is never used (customBackend overrides)
4. **Centralized type definitions** - types.ts should be distributed to feature folders
5. **Centralized hooks** - useAppTranslation.ts should be distributed to feature folders

---

## 🎯 Stories and Tasks

### Story 1: Create Feature Locale Directory Structure

**Description**: Create locale directories in each feature folder with flat JSON files (no nested language folders)

**Location**: `src/features/{feature}/locales/{lang}.json`

- [x] **Task 1.1**: Create auth locale directory
  - [x] Create `src/features/auth/locales/` directory

- [x] **Task 1.2**: Create dashboard locale directory
  - [x] Create `src/features/dashboard/locales/` directory

- [x] **Task 1.3**: Verify/create navigation locale directory (if feature exists)
  - [x] Check if navigation is a feature module or shared component (NOT A FEATURE - skip)
  - [x] N/A - navigation is not a feature

- [x] **Task 1.4**: Verify/create language locale directory (if feature exists)
  - [x] Check if language switching is a standalone feature (NOT A FEATURE - skip)
  - [x] N/A - language switching is not a feature

**Verification**: Directory structure matches `src/features/{feature}/routes/` pattern

- [x] Directory structure created for auth feature
- [x] Directory structure created for dashboard feature
- [x] Build passes without errors
- [x] Lint passes without errors

---

### Story 2: Migrate Translation Files to Feature Folders

**Description**: Copy existing translation JSON files from central location to feature folders as flat files

**Location**: Source: `src/lib/i18n/locales/{lang}/{namespace}.json` → Target: `src/features/{feature}/locales/{lang}.json`

- [x] **Task 2.1**: Migrate auth translations
  - [x] Copy `src/lib/i18n/locales/en/auth.json` → `src/features/auth/locales/en.json`
  - [x] Copy `src/lib/i18n/locales/ar/auth.json` → `src/features/auth/locales/ar.json`
  - [x] Copy `src/lib/i18n/locales/ku/auth.json` → `src/features/auth/locales/ku.json`
  - [x] Verify JSON validity in new location

- [x] **Task 2.2**: Migrate dashboard translations
  - [x] Copy `src/lib/i18n/locales/en/dashboard.json` → `src/features/dashboard/locales/en.json`
  - [x] Copy `src/lib/i18n/locales/ar/dashboard.json` → `src/features/dashboard/locales/ar.json`
  - [x] Copy `src/lib/i18n/locales/ku/dashboard.json` → `src/features/dashboard/locales/ku.json`

- [x] **Task 2.3**: Keep common namespace centralized (shared)
  - [x] Verify `src/lib/i18n/locales/{lang}/common.json` remains unchanged
  - [x] Document this is the fallback/shared namespace

- [x] **Task 2.4**: Handle navigation and language namespaces
  - [x] Determine ownership: keep in core or migrate to features (NOT A FEATURE - skip)
  - [x] N/A - these are shared namespaces

**Verification**:

- [x] All feature translation files exist in new locations
- [x] Original files in `src/lib/i18n/locales/` still exist for backward compatibility testing
- [x] Build passes without errors
- [x] Lint passes without errors

---

### Story 3: Update i18n Configuration with Path Resolution

**Description**: Modify config.ts to resolve feature-specific paths dynamically

**File**: `src/lib/i18n/config.ts`

- [x] **Task 3.1**: Add namespace-to-path mapping
  - [x] Create `NAMESPACE_PATHS` constant mapping namespace → feature path
  - [x] Include fallback to `@/lib/i18n/locales` for common/shared namespace
  - [x] Type: `Record<Namespace, string>`

- [x] **Task 3.2**: Implement path resolution function
  - [x] Create `getNamespacePath(namespace: string): string` function
  - [x] Return Vite-compatible alias path (e.g., `@/features/auth/locales`)

- [x] **Task 3.3**: Update customBackend.read() method
  - [x] Replace hardcoded `./locales/${language}/${namespace}.json` with dynamic path
  - [x] Use `getNamespacePath(namespace)` to resolve correct feature folder
  - [x] Import flat JSON file: `${getNamespacePath(namespace)}/${language}.json`
  - [x] Maintain fallback logic for missing translations

- [x] **Task 3.4**: Test dynamic imports work with new paths
  - [x] Verify Vite can resolve `@/features/*/locales` paths
  - [x] Check fallback to DEFAULT_LANGUAGE still works

**Code Reference** (lines to modify in config.ts):

```typescript
// Line 37: Replace hardcoded path with flat JSON file
import(`${getNamespacePath(namespace)}/${language}.json`);
```

**Verification**:

- [x] Translations load from feature folders when app runs
- [x] Fallback to default language works
- [x] No console errors on load

---

### Story 4: Add Namespace Path Metadata to locales.ts

**Description**: Extend namespace registry with ownership and path information

**File**: `src/lib/i18n/locales.ts`

- [x] **Task 4.1**: Define namespace ownership type
  - [x] Create `NamespaceConfig` interface with: `name`, `feature`, `path`, `isShared`
  - [x] Add to existing types

- [x] **Task 4.2**: Create namespace registry
  - [x] Create `NAMESPACE_CONFIG` object with all namespaces
  - [x] Include: auth (feature: auth), dashboard (feature: dashboard), common (feature: core, isShared: true)
  - [x] Add path to feature-specific types: `auth: '@/features/auth/i18n/types'`

- [x] **Task 4.3**: Export helper functions
  - [x] `getNamespaceFeature(namespace: string): string` - returns feature name
  - [x] `getNamespacePath(namespace: string): string` - returns import path
  - [x] `isSharedNamespace(namespace: string): boolean` - checks if common/shared

**Verification**:

- [x] TypeScript compiles without errors
- [x] Helper functions return correct values for each namespace

---

### Story 5: Move Translation Hooks to Feature Folders

**Description**: Create feature-specific translation hooks in each feature folder, removing dependency on centralized useAppTranslation.ts

**Files**: Create in `src/features/{feature}/hooks/` or `src/features/{feature}/i18n/`

- [x] **Task 5.1**: Create auth translation hook
  - [x] Create `src/features/auth/hooks/useTranslation.ts` (or `src/features/auth/i18n/useAuthTranslation.ts`)
  - [x] Export `useAuthTranslation()` hook
  - [x] Use namespace 'auth' for i18next

- [x] **Task 5.2**: Create dashboard translation hook
  - [x] Create `src/features/dashboard/hooks/useTranslation.ts` (or `src/features/dashboard/i18n/useDashboardTranslation.ts`)
  - [x] Export `useDashboardTranslation()` hook
  - [x] Use namespace 'dashboard' for i18next

- [x] **Task 5.3**: Create navigation translation hook (if feature exists)
  - [x] N/A - navigation is not a feature

- [x] **Task 5.4**: Create language translation hook (if feature exists)
  - [x] N/A - language is not a feature

- [x] **Task 5.5**: Create common translation hook (shared)
  - [x] Create `src/lib/i18n/hooks/useCommonTranslation.ts` or keep in core
  - [x] Export `useCommonTranslation()` hook

- [x] **Task 5.6**: Update feature index exports
  - [x] Export new hooks from `src/features/auth/index.ts`
  - [x] Export new hooks from `src/features/dashboard/index.ts`
  - [x] Export new hooks from other feature indexes

- [x] **Task 5.7**: Update consumers to use feature-specific hooks
  - [x] Update LoginForm.tsx to import from `@/features/auth/hooks`
  - [x] Update DashboardPage.tsx to import from `@/features/dashboard/hooks`
  - [x] Updated auth and dashboard consumers

- [x] **Task 5.8**: Update core hooks to delegate or deprecate
  - [x] Mark `src/lib/i18n/useAppTranslation.ts` hooks as deprecated (optional)
  - [x] Add comments pointing to feature-specific hooks
  - [x] Keep backward-compatible exports for existing consumers

**Code Template**:

```typescript
// src/features/auth/hooks/useTranslation.ts
import { useTranslation as useI18nextTranslation } from 'react-i18next';

export function useAuthTranslation() {
  const { t } = useI18nextTranslation('auth');
  return t;
}
```

**Verification**:

- [x] Feature hooks import and return translation function correctly
- [x] Login page uses auth hook from feature folder
- [x] Dashboard page uses dashboard hook from feature folder
- [x] Core hooks still work for backward compatibility

---

### Story 6: Move Type Definitions to Feature Folders

**Description**: Create feature-specific TypeScript type definitions for translations

**Files**: Create in `src/features/{feature}/types/` or `src/features/{feature}/i18n/types.ts`

- [x] **Task 6.1**: Create auth translation types
  - [x] Create `src/features/auth/types/translation.types.ts`
  - [x] Define `AuthTranslations` interface with all auth keys
  - [x] Export type for use in feature

- [x] **Task 6.2**: Create dashboard translation types
  - [x] Create `src/features/dashboard/types/translation.types.ts`
  - [x] Define `DashboardTranslations` interface
  - [x] Export type for use in feature

- [x] **Task 6.3**: Create common translation types (shared)
  - [x] Keep in `src/lib/i18n/types.ts` as shared
  - [x] Or create `src/features/shared/types/common.translations.ts`

- [x] **Task 6.4**: Create navigation translation types (if feature exists)
  - [x] N/A - navigation is not a feature

- [x] **Task 6.5**: Create language translation types (if feature exists)
  - [x] N/A - language is not a feature

- [x] **Task 6.6**: Update core types.ts
  - [x] Import feature types from feature folders
  - [x] Re-export combined `TranslationResources` type
  - [x] Remove duplicate type definitions (or mark as deprecated)

**Type Definition Template**:

```typescript
// src/features/auth/types/translation.types.ts
export interface AuthTranslations {
  Login: string;
  Email: string;
  Password: string;
  // ... all auth-specific keys
}
```

**Verification**:

- [x] TypeScript compiles without errors
- [x] Feature types are importable
- [x] IDE autocomplete works for translation keys

---

### Story 7: Backward Compatibility & Testing

**Description**: Ensure existing functionality works and add tests

- [x] **Task 7.1**: Test all feature translations load correctly
  - [x] Login page: auth namespace loads from feature folder
  - [x] Dashboard: dashboard namespace loads from feature folder

- [x] **Task 7.2**: Test shared namespace fallback
  - [x] Common namespace loads from core location
  - [x] Error boundaries, loading states work

- [x] **Task 7.3**: Test language switching
  - [x] Switch to Arabic - verify feature translations update
  - [x] Switch to Kurdish - verify feature translations update

- [x] **Task 7.4**: Test RTL support
  - [x] Arabic: document direction = rtl
  - [x] Kurdish: document direction = rtl

- [x] **Task 7.5**: Run existing test suite
  - [x] `npm test -- --run` passes
  - [x] No regressions in auth tests

**Verification**: All acceptance criteria from SRD pass

---

### Story 8: Build & Performance Validation

**Description**: Verify build succeeds and analyze bundle impact

- [x] **Task 8.1**: Run production build
  - [x] `npm run build` succeeds
  - [x] No TypeScript errors

- [x] **Task 8.2**: Verify code splitting
  - [x] Feature-specific locale files use dynamic imports
  - [x] Verified lazy loading in config.ts

- [x] **Task 8.3**: Bundle size analysis
  - [x] Feature translations are lazy-loaded
  - [x] Build succeeds with optimized chunks

**Verification**: Build succeeds with optimized chunks

---

### Story 9: Documentation Update

**Description**: Update developer documentation

- [x] **Task 9.1**: Update ARCHITECTURE.md
  - [x] Document new locale folder structure
  - [x] Add section on feature-based translations

- [x] **Task 9.2**: Update CONTRIBUTING.md
  - [x] Add instructions for adding new translations
  - [x] Explain feature ownership model

- [x] **Task 9.3**: Add README to locale folders
  - [x] Create `src/features/auth/locales/README.md` as template
  - [x] Document expected file structure (e.g., `en.json`, `ar.json`, `ku.json`)

**Verification**: Documentation reflects new architecture

---

### Story 10: Update Missing Key Handler References

**Description**: Update comments that point developers to correct location for new translations

**Files**: `src/lib/i18n/config.ts`, `src/lib/i18n/index.ts`

- [x] **Task 10.1**: Update missingKeyHandler message in config.ts
  - [x] Update comment to mention feature locations
  - [x] Example: `src/features/{feature}/locales/{lang}.json`

- [x] **Task 10.2**: Add documentation in index.ts
  - [x] Document new folder structure in module exports file

**Verification**: Comments guide developers to correct file locations

---

## 📦 Dependencies & Blockers

### Dependencies

- Story 1 → Story 2 (directories must exist before migration)
- Story 2 → Story 3 (files must be in place for import resolution)
- Story 3 → Story 7 (path resolution enables testing)
- Story 4 → Story 3 (metadata needed for resolution)
- Story 5 → Story 7 (hooks must exist before updating consumers)
- Story 6 → Story 7 (types needed for TypeScript)

### Blockers

- **None identified** - all required code patterns already exist in codebase

---

## ⚠️ Risks & Mitigation

| Risk                                 | Impact | Mitigation                                     |
| ------------------------------------ | ------ | ---------------------------------------------- |
| Vite dynamic import fails with alias | HIGH   | Test import paths early; use relative fallback |
| Translation keys break after move    | HIGH   | Keep original files until verified working     |
| TypeScript path resolution fails     | MEDIUM | Add explicit types for namespace paths         |
| Bundle size increases                | MEDIUM | Verify lazy loading; run build analysis        |

---

## ✅ Definition of Done

Each story is complete when:

- [ ] Code changes implemented
- [ ] TypeScript compiles without errors
- [ ] Tests pass (where applicable)
- [ ] Manual verification completed

**Final DoD for Epic**:

- [x] All 10 stories complete
- [x] Pre-commit hooks pass (`npm run pre-commit`)
- [x] Production build succeeds
- [x] Documentation updated

---

## 📊 Estimated Story Points

| Story                  | Points | Notes                         |
| ---------------------- | ------ | ----------------------------- |
| 1. Directory Structure | 1      | Simple mkdir operations       |
| 2. Migrate Files       | 2      | Copy + validate JSON          |
| 3. Path Resolution     | 3      | Core logic changes            |
| 4. Metadata            | 2      | Type definitions + helpers    |
| 5. Move Hooks          | 3      | Create feature-specific hooks |
| 6. Move Types          | 3      | Create feature-specific types |
| 7. Testing             | 3      | Manual + automated            |
| 8. Build               | 2      | Validation                    |
| 9. Docs                | 1      | Writing                       |

**Total: ~22 points**
