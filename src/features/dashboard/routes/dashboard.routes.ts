import React, { lazy } from 'react';

import type { RouteConfig } from '@/types/route.types';

import DashboardLayout from '../layouts/DashboardLayout';

// Define dashboard route link constants
export const DASHBOARD_LINKS = {
  DASHBOARD: '/',
  PROFILE: '/profile',
};

export const DASHBOARD_ROUTES: RouteConfig[] = [
  {
    element: React.createElement(DashboardLayout),
    isLayout: true,
    isPublic: true,
    path: DASHBOARD_LINKS.DASHBOARD,
    children: [
      {
        index: true,
        element: React.createElement(lazy(() => import('../pages/DashboardPage'))),
        name: 'Dashboard',
        isPublic: true,
      },
      {
        path: DASHBOARD_LINKS.PROFILE,
        element: React.createElement(lazy(() => import('../pages/ProfilePage'))),
        name: 'Profile',
      },
    ],
  },
];
