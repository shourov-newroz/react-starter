# 📘 STORY REQUIREMENT DOCUMENT (SRD)

### 🏷️ Requirement ID:

SRD-2025-001

### 🎯 Story Title:

Implement Feature-Based Modular Locales Architecture

---

## 🧩 1. Story Background / Context

Currently, all translation namespace files are centralized in `src/lib/i18n/locales/`. This monolithic structure creates coupling between the i18n core configuration and feature-specific translations. As the application grows, this approach leads to:

- Difficulty in maintaining feature-specific translations
- No clear ownership boundaries between features
- Harder to remove or modify features without affecting the i18n system
- Reduced code modularity and reusability

The goal is to adopt a **feature-based modular locales** approach, similar to how routing is organized in the codebase, where each feature owns its translation namespaces.

---

## 🧠 2. Codebase Analysis Summary

### 🔍 Files / Modules Involved:

| Category                | Current Location                              | Proposed Location                                            |
| ----------------------- | --------------------------------------------- | ------------------------------------------------------------ |
| Core i18n Config        | `src/lib/i18n/config.ts`                      | `src/lib/i18n/config.ts` (unchanged)                         |
| i18n Types              | `src/lib/i18n/types.ts`                       | `src/lib/i18n/types.ts` (unchanged)                          |
| Locales Config          | `src/lib/i18n/locales.ts`                     | `src/lib/i18n/locales.ts` (modified)                         |
| Translation Hooks       | `src/lib/i18n/useAppTranslation.ts`           | `src/lib/i18n/useAppTranslation.ts` (modified)               |
| Auth Translations       | `src/lib/i18n/locales/{lang}/auth.json`       | `src/features/auth/locales/{lang}/auth.json`                 |
| Dashboard Translations  | `src/lib/i18n/locales/{lang}/dashboard.json`  | `src/features/dashboard/locales/{lang}/dashboard.json`       |
| Common Translations     | `src/lib/i18n/locales/{lang}/common.json`     | Remain in `src/lib/i18n/locales/{lang}/common.json` (shared) |
| Navigation Translations | `src/lib/i18n/locales/{lang}/navigation.json` | `src/features/navigation/locales/{lang}/navigation.json`     |
| Language Translations   | `src/lib/i18n/locales/{lang}/language.json`   | `src/features/language/locales/{lang}/language.json`         |

### 🧩 Existing Implementation Observations:

- **Current Loading Pattern**: Dynamic imports in `src/lib/i18n/config.ts` (lines 36-55) load translations from `./locales/${language}/${namespace}.json`
- **Namespace Definition**: Defined in `src/lib/i18n/locales.ts` line 20
- **Hook Pattern**: Feature-specific hooks like `useAuthTranslation()`, `useDashboardTranslation()` are already implemented in `src/lib/i18n/useAppTranslation.ts`
- **Routing Reference**: Features follow modular structure at `src/features/{featureName}/routes/{featureName}.routes.ts`

### ⚙️ Dependencies Identified:

- `i18next`: ^23.x (translation framework)
- `react-i18next`: ^14.x (React bindings)
- `i18next-browser-languagedetector`: Language detection
- Vite: For dynamic imports and build optimization

---

## 💡 3. The Change / Solution Narrative

The transformation involves migrating feature-specific translation namespaces from the central `src/lib/i18n/locales/` directory to their respective feature folders.

**Key Changes:**

1. **Directory Restructuring**: Create `locales/` subdirectories within each feature folder
2. **Dynamic Loading Update**: Modify the backend loader in `config.ts` to resolve feature-specific paths
3. **Namespace Registry Update**: Update `locales.ts` to include feature-specific namespace paths
4. **Backward Compatibility**: Ensure shared namespaces (common) remain accessible from the core location

This follows the same pattern as the routing system where each feature owns its route definitions and related resources.

---

## 📈 4. Expected Impact / Business Value

| Metric                           | Before               | After                | Goal                  |
| -------------------------------- | -------------------- | -------------------- | --------------------- |
| Feature LOC count in i18n folder | ~500+                | ~100                 | 80% reduction         |
| Feature autonomy                 | Low (centralized)    | High (modular)       | Clear ownership       |
| Translation file discoverability | Poor                 | Excellent            | By feature folder     |
| Bundle splitting                 | Not feature-specific | Feature-based        | Improved lazy loading |
| Remove feature complexity        | High (shared files)  | Low (isolated files) | Easier maintenance    |

---

## 🧱 5. Functional Requirement Details

1. **Create Feature Locale Directories**
   - [ ] Create `src/features/auth/locales/{en,ar,ku}/auth.json`
   - [ ] Create `src/features/dashboard/locales/{en,ar,ku}/dashboard.json`
   - [ ] Create `src/features/navigation/locales/{en,ar,ku}/navigation.json`
   - [ ] Create `src/features/language/locales/{en,ar,ku}/language.json`

2. **Update i18n Configuration**
   - [ ] Modify `src/lib/i18n/config.ts` customBackend.read() to resolve feature paths
   - [ ] Add path resolution logic for feature-based namespaces

3. **Update Namespace Registry**
   - [ ] Modify `src/lib/i18n/locales.ts` to include path metadata for each namespace
   - [ ] Implement `getNamespacePath()` function

4. **Migrate Translation Files**
   - [ ] Copy auth.json from `src/lib/i18n/locales/{lang}/` to `src/features/auth/locales/{lang}/`
   - [ ] Copy dashboard.json, navigation.json, language.json similarly
   - [ ] Keep common.json in core location (shared namespace)

5. **Update Translation Hooks**
   - [ ] Verify `src/lib/i18n/useAppTranslation.ts` paths work with new structure

---

## ✅ 6. Acceptance Criteria (Gherkin Format)

```
Feature: Feature-Based Modular Locales

  Scenario: Auth feature loads translations from feature folder
    Given the i18n system is initialized
    When the user switches to English language
    And the user navigates to login page
    Then the auth translations should load from "src/features/auth/locales/en/auth.json"

  Scenario: Dashboard feature loads translations from feature folder
    Given the i18n system is initialized
    When the user is authenticated
    And the user navigates to dashboard
    Then the dashboard translations should load from "src/features/dashboard/locales/en/dashboard.json"

  Scenario: Fallback to core locales for shared namespaces
    Given the i18n system is initialized
    When a translation key is requested from common namespace
    Then it should load from "src/lib/i18n/locales/{lang}/common.json"

  Scenario: RTL language support maintained
    Given the user selects Arabic language
    When translations load for any feature
    Then the document direction should be "rtl"

  Scenario: Language switching works across all features
    Given the user is on any page
    When the user changes language from English to Arabic
    Then all feature translations should update accordingly
```

---

## ⚙️ 7. Constraints & Dependencies

- **Vite Dynamic Imports**: Must maintain Vite-compatible dynamic import patterns (no string concatenation for paths)
- **i18next Version**: Requires i18next v23+ for custom backend flexibility
- **Backward Compatibility**: Existing API in `src/lib/i18n/index.ts` must remain unchanged
- **Build Performance**: Feature-based code splitting should not increase initial bundle size
- **TypeScript Strict Mode**: All new paths must be type-safe

---

## 🧪 8. Non-Functional Requirements

- **Performance**: Translation lazy loading should add <50ms latency per namespace
- **Bundle Size**: No increase in initial bundle; feature translations load on-demand
- **Developer Experience**: IDE autocomplete should continue working for translation keys
- **Testing**: Each feature's translations should be testable in isolation
- **Accessibility**: All translated content must maintain proper ARIA labels and lang attributes

---

## 🧭 9. Risks & Assumptions

| Risk                                   | Impact | Mitigation                                               |
| -------------------------------------- | ------ | -------------------------------------------------------- |
| Breaking existing translation API      | High   | Maintain backward-compatible exports in `index.ts`       |
| Build path resolution issues           | Medium | Test with Vite dev and prod builds                       |
| Missing translations during migration  | Medium | Create migration script with validation                  |
| Circular dependencies between features | Low    | Ensure no feature imports from another feature's locales |
| Performance regression in lazy loading | Medium | Benchmark before/after with Lighthouse                   |

---

## 🧰 10. Implementation Notes

### Directory Structure After Migration:

```
src/
├── lib/
│   └── i18n/
│       ├── config.ts           # Core i18next config (modified)
│       ├── locales/
│       │   └── {en,ar,ku}/
│       │       └── common.json # Shared translations only
│       ├── locales.ts         # Updated with path metadata
│       └── useAppTranslation.ts
├── features/
│   ├── auth/
│   │   ├── locales/
│   │   │   └── {en,ar,ku}/
│   │   │       └── auth.json
│   │   └── ...
│   ├── dashboard/
│   │   ├── locales/
│   │   │   └── {en,ar,ku}/
│   │   │       └── dashboard.json
│   │   └── ...
│   ├── navigation/
│   │   ├── locales/
│   │   │   └── {en,ar,ku}/
│   │   │       └── navigation.json
│   │   └── ...
│   └── language/
│       ├── locales/
│       │   └── {en,ar,ku}/
│       │       └── language.json
│       └── ...
```

### Key Code Changes:

**config.ts - Custom Backend Update:**

```typescript
// New path resolution logic
const getFeaturePath = (namespace: string): string => {
  const featureMap: Record<string, string> = {
    auth: '@/features/auth/locales',
    dashboard: '@/features/dashboard/locales',
    navigation: '@/features/navigation/locales',
    language: '@/features/language/locales',
    common: '@/lib/i18n/locales', // fallback
  };
  return featureMap[namespace] || featureMap.common;
};
```

---

## 🧾 11. Story Summary (for Sprint Demo)

This refactoring implements a **feature-based modular locales architecture** that mirrors the existing routing system organization. Each feature will own its translation files, enabling:

- Better code ownership and maintainability
- Easier feature removal/modification
- Improved lazy loading and bundle optimization
- Clearer translation discoverability for developers

The core i18n configuration remains in `src/lib/i18n/` while feature-specific translations migrate to their respective feature folders, following the same pattern as `src/features/{feature}/routes/`.

---

## 🧩 12. Verification Checklist (Post-Implementation)

- [ ] All feature translations load from new locations
- [ ] Common namespace still loads from core location
- [ ] Language switching works across all features
- [ ] RTL support maintained for Arabic/Kurdish
- [ ] No TypeScript errors in i18n modules
- [ ] Build succeeds with Vite
- [ ] Bundle analysis shows feature-based code splitting
- [ ] Developer documentation updated
- [ ] Existing tests pass (if any)

---

## 📘 13. Document Meta

| Field            | Value                        |
| ---------------- | ---------------------------- |
| Author           | Technical Product Team       |
| Created On       | 2025-03-05                   |
| Related Ticket   | TBD                          |
| Reviewers        | Engineering Lead, i18n Owner |
| Priority         | High                         |
| Estimated Effort | 3-5 days                     |
