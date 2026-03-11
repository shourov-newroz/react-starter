/**
 * Auth Feature API Endpoints Configuration
 * Centralizes all API endpoint URLs for the auth feature
 */

export const AUTH_API_ENDPOINTS = {
  /** Login endpoint */
  LOGIN: '/auth/login',

  /** Register endpoint */
  REGISTER: '/auth/register',

  /** Logout endpoint */
  LOGOUT: '/auth/logout',

  /** Get current user endpoint */
  GET_CURRENT_USER: '/auth/me',

  /** Password reset request endpoint */
  PASSWORD_RESET_REQUEST: '/auth/password-reset',

  /** Password reset with token endpoint */
  PASSWORD_RESET: '/auth/reset-password',

  /** Token refresh endpoint */
  REFRESH_TOKEN: '/auth/refresh',
} as const;
