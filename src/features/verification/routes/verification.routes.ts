import React from 'react';

import type { RouteConfig } from '@/types/route.types';

import ComponentVerificationPageSkeleton from '../pages/ComponentVerificationPageSkeleton';
import LayoutVerificationPageSkeleton from '../pages/LayoutVerificationPageSkeleton';
import PageVerificationPageSkeleton from '../pages/PageVerificationPageSkeleton';

// Define verification route link constants
export const VERIFICATION_LINKS = {
  COMPONENTS: '/verification/components',
  LAYOUTS: '/verification/layouts',
  PAGES: '/verification/pages',
};

// Define verification routes
export const VERIFICATION_ROUTES: RouteConfig[] = [
  {
    path: VERIFICATION_LINKS.COMPONENTS,
    element: React.lazy(() => import('../pages/ComponentVerificationPage')),
    name: 'ComponentVerification',
    auth: 'public',
    fallback: ComponentVerificationPageSkeleton,
  },
  {
    path: VERIFICATION_LINKS.LAYOUTS,
    element: React.lazy(() => import('../pages/LayoutVerificationPage')),
    name: 'LayoutVerification',
    auth: 'public',
    fallback: LayoutVerificationPageSkeleton,
  },
  {
    path: VERIFICATION_LINKS.PAGES,
    element: React.lazy(() => import('../pages/PageVerificationPage')),
    name: 'PageVerification',
    auth: 'public',
    fallback: PageVerificationPageSkeleton,
  },
];
