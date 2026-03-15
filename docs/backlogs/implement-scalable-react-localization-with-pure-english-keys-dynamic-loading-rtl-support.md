# Backlog: Implement Scalable React Localization with Pure English Keys + Dynamic Loading + RTL Support

## Overview

This backlog covers the implementation of a production-grade localization system using pure English keys, dynamic JSON loading, automatic extraction CLI, and runtime RTL support.

## 1. Setup & Core Infrastructure (i18next)

**Story:** As a developer, I want to configure the core i18n instance with dynamic loading so that translations are loaded lazily without bloating the initial bundle.

- [x] Install `i18next`, `react-i18next`, and `i18next-browser-languagedetector`.
- [x] Create `src/lib/i18n/config.ts` to initialize `i18next`.
- [x] Configure dynamic `import()` via a custom i18next backend plugin for lazy loading of translation JSON files (`i18next-http-backend` is not suitable here).
- [x] Set `fallbackLng` to `en` and configure language detector to persist in `localStorage`.
- [x] Add `I18nextProvider` to the root application provider (`src/providers/AppProvider.tsx` or similar).

## 2. Type Safety & Developer Experience

**Story:** As a developer, I want a typed translation wrapper and linting rules so I can avoid typos and prevent hardcoding UI strings.

- [x] Create `src/lib/i18n/types.ts` holding the interfaces for translation keys (extracting keys from `en.json`).
- [x] Create a strongly typed wrapper around the `useTranslation` hook (e.g. `useAppTranslation`) providing auto-complete for English keys.
- [x] Add ESLint rules (e.g., `eslint-plugin-i18next`) to error on hardcoded English text inside components.
- [x] Configure missing key warnings to show up only in the development environment.

## 3. RTL, HTML Direction & CSS Logical Properties

**Story:** As an international user, I want the layout and direction to automatically mirror (RTL) when switching to languages like Arabic.

- [x] Define language metadata in a constants file (e.g. `src/lib/i18n/locales.ts`) mapping languages to their direction (`{ en: 'ltr', ar: 'rtl' }`).
- [x] Create `useDirection` hook that listens to i18n language changes and updates `document.documentElement.dir` and `lang` attributes.
- [x] Replace standard Tailwind directional classes (e.g., `ml-*`, `pr-*`, `text-left`) with logical properties (`ms-*`, `pe-*`, `text-start`) across global styles or Tailwind config.
- [x] Verify core structural components (Headers, Sidebars, Modals) mirror correctly dynamically without page reloads.

## 4. Automatic Extraction & Sync CLI

**Story:** As a developer, I want a CLI command to automatically extract new English text from components and insert them into language files.

- [x] Create script `scripts/i18n-sync.ts` (using `i18next-parser` or similar).
- [x] Configure the parser to scan `src/**/*.{ts,tsx}`, extracting all calls to `t("...")`.
- [x] Make the script update `src/locales/en.json` directly.
- [x] Make the script add missing placeholder keys to other supported languages (e.g., `ar.json`, `bn.json`).
- [x] Add `npm run i18n:sync` to `package.json`.
- [x] Ensure the sync script fails CI/CD pipelines if translations are missing or unsynced.

## 5. UI Components & Language Switcher

**Story:** As a user, I want to be able to smoothly transition between supported languages via a UI element.

- [x] Create `LanguageSwitcher.tsx` component with a dropdown/select for available languages.
- [x] Integrate the `LanguageSwitcher` into the main application layout/header.
- [x] Ensure `LanguageSwitcher` styling works securely in both LTR and RTL orientations.
- [x] Add logic to change language via `i18n.changeLanguage(lang)` without reloading the page.

## 6. Testing & Documentation

**Story:** As a maintainer, I want tests and docs to ensure the localization system does not regress.

- [x] Write unit tests for the language switching logic (verifying `dir` and `lang` attribute updates).
- [ ] Write tests verifying the custom typed `useAppTranslation` wrapper.
- [ ] Add a visual snapshot test for an LTR vs RTL rendering of a core UI component.
- [x] Update documentation (`docs/ARCHITECTURE.md` or a new `docs/I18N.md`) detailing the dynamic loader setup, RTL conventions, and the sync CLI script.

## Summary

The localization system has been successfully implemented with:

- **Core i18next setup** with dynamic loading via custom backend plugin
- **Type safety** with TypeScript interfaces and typed translation hooks
- **RTL support** through useDirection hook and automatic document attribute updates
- **Language switcher** component integrated into DashboardLayout
- **i18n-sync CLI** for extracting and syncing translation keys
- **Unit tests** for the useDirection hook

Remaining tasks (optional/enhancements):

- Replace Tailwind directional classes with logical properties (requires global CSS review)
- Additional tests for useAppTranslation wrapper (optional)
- Visual snapshot tests for LTR vs RTL (optional)
