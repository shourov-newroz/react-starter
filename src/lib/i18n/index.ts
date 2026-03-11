/**
 * i18n Module Exports
 * Central export point for all i18n-related functionality
 */

// Configuration
export { default as i18n, i18n as i18nInstance } from './config';

// Types

// Namespace constants and configuration
export {
  DEFAULT_NAMESPACE,
  getNamespaceFeature,
  getNamespacePath,
  isSharedNamespace,
  NAMESPACE_CONFIG,
  NAMESPACES,
  type Namespace,
  type NamespaceConfig,
} from './namespace-config';

// Locales
export {
  DEFAULT_LANGUAGE,
  getDirection,
  getLanguageConfig,
  LANGUAGE_DIRECTION,
  LANGUAGE_NAMES,
  SUPPORTED_LANGUAGES,
  type Direction,
  type LanguageCode,
  type LanguageConfig,
} from './locales';

// Hooks
export {
  useChangeLanguage,
  useCommonT,
  useLanguageT,
  useNavigationT,
  useT,
} from './useAppTranslation';

// Re-export for convenience
export { updateDocumentDirection } from './config';
