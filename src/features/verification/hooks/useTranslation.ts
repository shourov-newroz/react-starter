import type { TFunction } from 'i18next';
import { useTranslation } from 'react-i18next';

/**
 * Custom hook for verification feature translations
 * Uses the verification namespace for all translation keys
 */
export function useVerificationT(): TFunction {
  const { t } = useTranslation('verification');

  return t;
}
