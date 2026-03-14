import React from 'react';

import type { RouteConfig } from '@/types/route.types';

import LoginPageSkeleton from '../pages/LoginPageSkeleton';

// Define auth route link constantan
export const AUTH_LINKS = {
  LOGIN: '/login',
};

// Define auth routes
export const AUTH_ROUTES: RouteConfig[] = [
  {
    name: 'Login',
    path: AUTH_LINKS.LOGIN,
    element: React.lazy(() => import('@/features/auth/pages/LoginPage')),
    auth: 'guest',
    fallback: LoginPageSkeleton,
  },
];
