import { apiClient } from '@/services/api-client';

import type { AuthResponse, LoginCredentials, RegisterRequest, User } from '../auth.types';
import { AUTH_API_ENDPOINTS } from '../config/auth.config';

/**
 * Authentication service for API calls
 * Provides typed methods for all authentication operations
 */
export const authService = {
  /**
   * Login with email and password
   */
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>(AUTH_API_ENDPOINTS.LOGIN, credentials);
    return response.data.data;
  },

  /**
   * Register a new user
   */
  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>(AUTH_API_ENDPOINTS.REGISTER, data);
    return response.data.data;
  },

  /**
   * Logout the current user
   */
  logout: async (): Promise<void> => {
    await apiClient.post(AUTH_API_ENDPOINTS.LOGOUT);
  },

  /**
   * Get the current authenticated user
   */
  getCurrentUser: async (): Promise<User> => {
    const response = await apiClient.sendGetRequest<User>(AUTH_API_ENDPOINTS.GET_CURRENT_USER);
    return response;
  },

  /**
   * Request a password reset email
   */
  requestPasswordReset: async (email: string): Promise<void> => {
    await apiClient.post(AUTH_API_ENDPOINTS.PASSWORD_RESET_REQUEST, { email });
  },

  /**
   * Reset password with token
   */
  resetPassword: async (token: string, newPassword: string): Promise<void> => {
    await apiClient.post(AUTH_API_ENDPOINTS.PASSWORD_RESET, { token, newPassword });
  },

  /**
   * Refresh the authentication token
   */
  refreshToken: async (): Promise<{ token: string }> => {
    const response = await apiClient.post<{ token: string }>(AUTH_API_ENDPOINTS.REFRESH_TOKEN);
    return response.data.data;
  },
};
