import { lazy } from 'react';

import type { RouteConfig } from '@/config/routes';

// Define auth route link constantan
export const AUTH_LINKS = {
  LOGIN: '/login',
};

// Define auth routes
export const AUTH_ROUTES: RouteConfig[] = [
  {
    path: AUTH_LINKS.LOGIN,
    component: lazy(() =>
      import('@/features/auth/pages/LoginPage').then((module) => ({ default: module.LoginPage }))
    ),
    name: 'Login',
  },
];
