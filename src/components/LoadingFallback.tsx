import React from 'react';

import { GenericPageSkeleton } from '@/components/ui/generic-page-skeleton';

/**
 * Generic loading fallback component for Suspense boundaries
 * Uses GenericPageSkeleton for consistent skeleton loading experience
 * @deprecated Use route-specific skeleton fallback instead (via route.fallback)
 */
export const LoadingFallback: React.FC = () => {
  return <GenericPageSkeleton />;
};
