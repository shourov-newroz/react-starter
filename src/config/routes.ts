import { lazy } from 'react';

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
  {
    path: '/login',
    component: lazy(() =>
      import('@/features/auth/pages/LoginPage').then((module) => ({ default: module.LoginPage }))
    ),
    name: 'Login',
  },
  {
    path: '/error-demo',
    component: lazy(() =>
      import('@/features/demo/pages/ErrorHandlingDemo').then((module) => ({
        default: module.ErrorHandlingDemo,
      }))
    ),
    name: 'ErrorHandlingDemo',
    isPrivate: true,
  },
  {
    path: '*',
    component: lazy(() => import('@/app/App').then((module) => ({ default: module.NotFoundPage }))),
    name: 'NotFound',
  },
];

// Export route configurations for use in the application
export default routes;
