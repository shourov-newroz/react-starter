/**
 * Language metadata configuration
 * Maps language codes to their display names and direction (LTR/RTL)
 */

export type LanguageCode = 'en' | 'ar' | 'ku';
export type Direction = 'ltr' | 'rtl';

export interface LanguageConfig {
  code: LanguageCode;
  name: string;
  nativeName: string;
  direction: Direction;
}

// Re-export namespace configuration from separate module
export {
  getNamespaceFeature,
  getNamespacePath,
  isSharedNamespace,
  NAMESPACE_CONFIG,
  NAMESPACES,
  type Namespace,
  type NamespaceConfig,
} from './namespace-config';

export const SUPPORTED_LANGUAGES: LanguageConfig[] = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    direction: 'ltr',
  },
  {
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    direction: 'rtl',
  },
  {
    code: 'ku',
    name: 'Kurdish',
    nativeName: 'کوردی',
    direction: 'rtl',
  },
];

/**
 * Map of language codes to their text direction
 */
export const LANGUAGE_DIRECTION: Record<LanguageCode, Direction> = {
  en: 'ltr',
  ar: 'rtl',
  ku: 'rtl',
};

/**
 * Map of language codes to their display names
 */
export const LANGUAGE_NAMES: Record<LanguageCode, string> = {
  en: 'English',
  ar: 'العربية',
  ku: 'کوردی',
};

/**
 * Default language
 */
export const DEFAULT_LANGUAGE: LanguageCode = 'en';

/**
 * Get language configuration by code
 */
export function getLanguageConfig(code: string): LanguageConfig | undefined {
  return SUPPORTED_LANGUAGES.find((lang) => lang.code === code);
}

/**
 * Get language configuration by code with fallback to default
 */
export function getLanguageConfigWithDefault(code: string): LanguageConfig {
  const found = SUPPORTED_LANGUAGES.find((lang) => lang.code === code);
  if (found) return found;
  // Use the first language as default (guaranteed to exist)
  return SUPPORTED_LANGUAGES.find((lang) => lang.code === DEFAULT_LANGUAGE)!;
}

/**
 * Get direction for a given language code
 */
export function getDirection(code: string): Direction {
  return LANGUAGE_DIRECTION[code as LanguageCode] || LANGUAGE_DIRECTION[DEFAULT_LANGUAGE];
}

// /**
//  * Hook that returns the current text direction based on the active language
//  * and updates document attributes when language changes
//  */
// export function useDirection(): Direction {
//   const currentLanguage = useCurrentLanguage() as LanguageCode;
//   const direction = getDirection(currentLanguage) || getDirection(DEFAULT_LANGUAGE);

//   useEffect(() => {
//     // Update document direction and language attributes
//     const htmlElement = document.documentElement;
//     htmlElement.setAttribute('dir', direction);
//     htmlElement.setAttribute('lang', currentLanguage || DEFAULT_LANGUAGE);

//     // Update body classes for CSS-based RTL handling
//     if (direction === 'rtl') {
//       document.body.classList.add('rtl');
//       document.body.classList.remove('ltr');
//     } else {
//       document.body.classList.add('ltr');
//       document.body.classList.remove('rtl');
//     }
//   }, [currentLanguage, direction]);

//   return direction;
// }

// /**
//  * Hook that returns whether the current direction is RTL
//  */
// export function useIsRTL(): boolean {
//   const direction = useDirection();
//   return direction === 'rtl';
// }

// export default useDirection;
