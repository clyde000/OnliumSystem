import apiClient from "./apiClient";
import {
  API_ENDPOINTS,
  STORAGE_KEYS,
  ERROR_MESSAGES,
} from "../constants/apiConstants";

/**
 * Authentication Service
 * Handles all authentication-related API calls
 */

export const authService = {
  /**
   * Login user with email and password
   */
  login: async (email, password) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.AUTH.LOGIN, {
        email,
        password,
      });

      const { accessToken, refreshToken, user } = response.data;

      // Store tokens and user data
      localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
      localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
      localStorage.setItem(STORAGE_KEYS.USER_ROLE, user.role);

      return { success: true, user };
    } catch (error) {
      const message =
        error.response?.data?.message || ERROR_MESSAGES.INVALID_CREDENTIALS;
      return { success: false, error: message };
    }
  },

  /**
   * Register new user
   */
  register: async (userData) => {
    try {
      const response = await apiClient.post(
        API_ENDPOINTS.AUTH.REGISTER,
        userData,
      );
      return { success: true, user: response.data.user };
    } catch (error) {
      const message =
        error.response?.data?.message || ERROR_MESSAGES.SOMETHING_WENT_WRONG;
      return { success: false, error: message };
    }
  },

  /**
   * Logout user
   */
  logout: async () => {
    try {
      await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Clear auth data regardless of API response
      localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
      localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
      localStorage.removeItem(STORAGE_KEYS.USER);
      localStorage.removeItem(STORAGE_KEYS.USER_ROLE);
    }
  },

  /**
   * Get current user
   */
  getCurrentUser: () => {
    const userJson = localStorage.getItem(STORAGE_KEYS.USER);
    return userJson ? JSON.parse(userJson) : null;
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated: () => {
    return !!localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  },

  /**
   * Get user role
   */
  getUserRole: () => {
    return localStorage.getItem(STORAGE_KEYS.USER_ROLE);
  },

  /**
   * Verify email token
   */
  verifyEmail: async (token) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.AUTH.VERIFY_EMAIL, {
        token,
      });
      return { success: true, message: response.data.message };
    } catch (error) {
      const message =
        error.response?.data?.message || ERROR_MESSAGES.SOMETHING_WENT_WRONG;
      return { success: false, error: message };
    }
  },

  /**
   * Change password
   */
  changePassword: async (currentPassword, newPassword) => {
    try {
      const response = await apiClient.post(
        API_ENDPOINTS.USER.CHANGE_PASSWORD,
        {
          currentPassword,
          newPassword,
        },
      );
      return { success: true, message: response.data.message };
    } catch (error) {
      const message =
        error.response?.data?.message || ERROR_MESSAGES.SOMETHING_WENT_WRONG;
      return { success: false, error: message };
    }
  },
};

export default authService;
