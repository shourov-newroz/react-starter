/**
 * Auth Feature Translation Hook
 * Provides type-safe translation for the auth feature
 */

import { type UseTranslationResponse } from 'react-i18next';

import { useTranslation } from '@/lib/i18n/useAppTranslation';

/**
 * Typed translation hook for auth namespace
 */
export function useAuthTranslation(): UseTranslationResponse<'auth', undefined> {
  return useTranslation('auth');
}

/**
 * Shorthand hook that returns just the t function for auth namespace
 */
export function useAuthT(): ReturnType<typeof useTranslation<'auth'>>['t'] {
  const { t } = useAuthTranslation();
  return t;
}
