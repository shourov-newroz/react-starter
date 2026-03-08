/**
 * Dashboard Feature Translation Hook
 * Provides type-safe translation for the dashboard feature
 */

import { type UseTranslationResponse } from 'react-i18next';

import { useTranslation } from '@/lib/i18n/useAppTranslation';

/**
 * Typed translation hook for dashboard namespace
 */
export function useDashboardTranslation(): UseTranslationResponse<'dashboard', undefined> {
  return useTranslation('dashboard');
}

/**
 * Shorthand hook that returns just the t function for dashboard namespace
 */
export function useDashboardT(): ReturnType<typeof useTranslation<'dashboard'>>['t'] {
  const { t } = useDashboardTranslation();
  return t;
}
