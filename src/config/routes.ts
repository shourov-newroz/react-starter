import { lazy } from 'react';

import { AUTH_ROUTES } from '@/features/auth';
import { DEMO_ROUTES } from '@/features/demo';

// Define types for route configurations
export interface RouteConfig {
  path: string;
  component: React.LazyExoticComponent<React.ComponentType>;
  isPrivate?: boolean;
  name: string;
}

// Define all routes in a centralized configuration
export const routes: RouteConfig[] = [
  {
    path: '/',
    component: lazy(() => import('@/app/App').then((module) => ({ default: module.HomePage }))),
    name: 'Home',
  },
  ...AUTH_ROUTES,
  ...DEMO_ROUTES,
  {
    path: '*',
    component: lazy(() => import('@/app/App').then((module) => ({ default: module.NotFoundPage }))),
    name: 'NotFound',
  },
];

// Export route configurations for use in the application
export default routes;
