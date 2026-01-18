import { lazy } from 'react';

import type { RouteConfig } from '@/config/routes';

// Define auth route link constantan
export const DEMO_LINKS = {
  ERROR_DEMO: '/error-demo',
};

// Define auth routes
export const DEMO_ROUTES: RouteConfig[] = [
  {
    path: DEMO_LINKS.ERROR_DEMO,
    component: lazy(() =>
      import('@/features/demo/pages/ErrorHandlingDemo').then((module) => ({
        default: module.ErrorHandlingDemo,
      }))
    ),
    name: 'ErrorHandlingDemo',
    isPrivate: true,
  },
];
