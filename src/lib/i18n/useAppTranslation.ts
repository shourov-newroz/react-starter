/**
 * Typed Translation Hook
 * Provides type-safe translation with autocomplete support for English keys
 * Supports multiple namespaces (auth, common, dashboard, navigation, language)
 */

import { useTranslation as useI18nTranslation, type UseTranslationResponse } from 'react-i18next';

import { type Namespace } from './locales';

/**
 * Extended translation function type with key suggestions
 * Supports namespace-prefixed keys like 'dashboard:welcome', 'auth:login'
 */
export interface AppTranslationFunction {
  (key: string, options?: object | undefined): string;
}

/**
 * Typed translation hook for a specific namespace
 * @param namespace - The namespace to use (auth, common, dashboard, navigation, language)
 */
export function useTranslation<const N extends Namespace>(
  namespace: N
): UseTranslationResponse<N, undefined> {
  return useI18nTranslation(namespace);
}
/**
 * Shorthand hook for just the t function with type safety
 * Use this when you only need the translation function
 * Supports namespace-prefixed keys like 'dashboard:welcome'
 */
export function useT(): AppTranslationFunction {
  // Use default namespace - i18next will resolve namespace-prefixed keys automatically
  const { t } = useI18nTranslation();
  return t as AppTranslationFunction;
}

/**
 * Shorthand hook for common namespace translations
 */
export function useCommonT(): AppTranslationFunction {
  const { t } = useTranslation('common');
  return t as AppTranslationFunction;
}

/**
 * Shorthand hook for navigation namespace translations
 */
export function useNavigationT(): AppTranslationFunction {
  const { t } = useTranslation('navigation');
  return t as AppTranslationFunction;
}

/**
 * Shorthand hook for language namespace translations
 */
export function useLanguageT(): AppTranslationFunction {
  const { t } = useTranslation('language');
  return t as AppTranslationFunction;
}

/**
 * Hook that returns the current language
 */
export function useCurrentLanguage(): string {
  const { i18n } = useI18nTranslation();
  return i18n.language;
}

/**
 * Hook for changing the current language
 */
export function useChangeLanguage(): (language: string) => Promise<void> {
  const { i18n } = useI18nTranslation();

  const changeLanguage = async (language: string): Promise<void> => {
    await i18n.changeLanguage(language);
  };

  return changeLanguage;
}
