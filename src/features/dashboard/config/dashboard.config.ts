/**
 * Dashboard Feature API Endpoints Configuration
 * Centralizes all API endpoint URLs for the dashboard feature
 */

export const DASHBOARD_API_ENDPOINTS = {
  /** User profile endpoint */
  USER_PROFILE: '/api/users/me',

  /** Dashboard stats endpoint */
  DASHBOARD_STATS: '/api/dashboard/stats',

  /** Recent activities endpoint */
  RECENT_ACTIVITIES: '/api/dashboard/activities',

  GET_DATA: (id: string) => `/api/dashboard/activities/${id}`,
  GET_WITH_QUERY: (query: string) => `/api/dashboard/activities?${query}`,
} as const;
