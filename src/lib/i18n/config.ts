/**
 * i18n Configuration
 * Initializes i18next with dynamic loading, language detection, and RTL support
 *
 * Missing key handling:
 * In development mode, missing translation keys are logged to the console.
 * Developers should add missing keys to the locale files manually.
 * Feature-specific translations: src/features/{feature}/locales/{lang}.json
 * Shared translations: src/lib/i18n/locales/{lang}/{namespace}.json
 */

import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import { DEFAULT_LANGUAGE, getDirection, getNamespacePath, type Namespace } from './locales';
import { DEFAULT_NAMESPACE } from './namespace-config';

/**
 * Custom backend plugin for lazy loading translation files
 * This provides dynamic loading without including all translations in the initial bundle
 */
const customBackend = {
  type: 'backend' as const,
  init: function (
    _services: unknown,
    _backendOptions: Record<string, unknown>,
    _i18nextOptions: unknown
  ) {
    // Initialization handled by i18next
  },
  read: function (
    language: string,
    namespace: string,
    callback: (error: Error | null, resources?: Record<string, unknown>) => void
  ) {
    // Dynamic import of translation JSON files by namespace
    // Feature namespaces use flat JSON: /src/features/{feature}/locales/{lang}.json
    // Shared namespaces: /src/lib/i18n/locales/{lang}/{namespace}.json
    const basePath = getNamespacePath(namespace as Namespace);
    const isFeatureNamespace = basePath.includes('/features/');

    // Build import path based on namespace type
    const importPath = isFeatureNamespace
      ? `${basePath}/${language}.json` // Flat file: en.json, ar.json
      : `${basePath}/${language}/${namespace}.json`; // Nested: en/common.json

    import(importPath)
      .then((resources) => {
        // Access .default for ES module default export
        callback(null, resources.default);
      })
      .catch((error) => {
        // If language file not found, try fallback to default language
        if (language !== DEFAULT_LANGUAGE) {
          const fallbackPath = isFeatureNamespace
            ? `${basePath}/${DEFAULT_LANGUAGE}.json`
            : `${basePath}/${DEFAULT_LANGUAGE}/${namespace}.json`;

          import(fallbackPath)
            .then((resources) => {
              callback(null, resources.default);
            })
            .catch(() => {
              callback(error as Error, undefined);
            });
        } else {
          callback(error as Error, undefined);
        }
      });
  },
  // Optional: Save translations (for backend integration)
  write: function (_language: string, _namespace: string, _data: unknown): void {
    // No-op for client-side only
  },
};

// i18next configuration options
const i18nextOptions = {
  // Default language
  // fallbackLng: DEFAULT_LANGUAGE,
  fallbackLng: false as const,

  // Disable fallback - only load the selected language
  // This prevents loading en when page reloads with saved language
  // fallbackLng: false as const,

  // Debug mode in development only
  debug: import.meta.env.DEV,

  // Namespace configuration - only load default namespace initially
  // Namespaces will be loaded on-demand when accessed
  ns: DEFAULT_NAMESPACE,
  //  ns: [...NAMESPACES], // Load all namespaces at startup (not recommended for large apps)
  defaultNS: DEFAULT_NAMESPACE,

  // Allow loading languages/namespaces on-demand (lazy loading)
  // This prevents loading all namespaces at startup
  partialBundledLanguages: true,

  // Language detector configuration
  detection: {
    // Order of language detection
    order: ['localStorage', 'navigator', 'htmlTag'],
    // Cache user language preference
    caches: ['localStorage'],
    // LocalStorage key for storing language
    lookupLocalStorage: 'i18nextLng',
  },

  // Backend configuration for dynamic loading
  backend: {
    // Path to load translations from - uses namespace folders
    // e.g., /locales/en/auth.json, /locales/ar/dashboard.json
    loadPath: '/locales/{{lng}}/{{ns}}.json',
  },

  // Interpolation configuration
  interpolation: {
    // React already safely escapes values
    escapeValue: false,
  },

  // Missing key handling - logs warnings in development mode
  // Feature translations: /src/features/{feature}/locales/en.json
  // Shared translations: /src/lib/i18n/locales/en/{namespace}.json
  missingKeyHandler: (lngs: readonly string[], ns: string, key: string, _fallbackValue: string) => {
    if (import.meta.env.DEV) {
      console.warn(
        `[i18n] Missing translation key => "${key}" in "${lngs.join(', ')}" namespace: "${ns}"`
      );
    }
  },

  // React i18next configuration
  react: {
    // Use Suspense for async loading
    useSuspense: true,
    // Bind i18n instance to components
    bindI18n: 'languageChanged loaded',
    // Bind store for re-render
    bindStore: true,
  },
};

// Initialize i18next
i18n
  // Language detector plugin
  .use(LanguageDetector)
  // Custom backend for dynamic loading
  .use(customBackend)
  // React i18next initialization
  .use(initReactI18next)
  // Initialize with options
  .init(i18nextOptions);

/**
 * Update document direction based on current language
 */
export function updateDocumentDirection(language: string): void {
  const direction = getDirection(language) || getDirection(DEFAULT_LANGUAGE);
  const htmlElement = document.documentElement;

  htmlElement.setAttribute('dir', direction);
  htmlElement.setAttribute('lang', language);

  // Update body class for CSS-based RTL handling
  if (direction === 'rtl') {
    document.body.classList.add('rtl');
    document.body.classList.remove('ltr');
  } else {
    document.body.classList.add('ltr');
    document.body.classList.remove('rtl');
  }
}

// Listen for language changes to update document direction
i18n.on('languageChanged', (lng) => {
  updateDocumentDirection(lng);
});

// Initial direction update
if (typeof document !== 'undefined') {
  updateDocumentDirection(i18n.language || DEFAULT_LANGUAGE);
}

export default i18n;
export { i18n };
